import { getPaper, fetchFullText } from "@/lib/arxiv";
import { getCachedExplanation, saveExplanation } from "@/lib/cache";

const OLLAMA_URL = process.env.OLLAMA_URL || "http://localhost:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "llama3.1";

function buildPrompt(paper, fullText) {
  return `You are a science communicator. Explain the research paper below to a curious reader who is smart but NOT an expert in this field.

IMPORTANT — this is NOT a summary. Write a friendly explanation of the topic itself:
1. Start with "## The big picture": what area of research is this, and what everyday problem or question motivates it? Explain any background concepts a newcomer needs, using analogies.
2. "## The problem": what specific gap or difficulty were the authors tackling, and why is it hard?
3. "## What they did": explain their approach in plain language. Translate jargon into intuitive terms as you go.
4. "## Why it matters": what does this enable or change, and what are the limitations?

Rules: write in English, use Markdown with those exact section headings, avoid equations, define every technical term the first time it appears, and prefer concrete analogies over abstract descriptions.

PAPER TITLE: ${paper.title}
AUTHORS: ${paper.authors.join(", ")}
ABSTRACT: ${paper.summary}
${fullText ? `\nFULL TEXT (may be truncated):\n${fullText}` : "\n(Full text unavailable — base the explanation on the abstract.)"}`;
}

export async function POST(req) {
  const { id, force = false } = await req.json();
  if (!id) return new Response("Missing paper id", { status: 400 });

  // 1. Cache hit → return instantly, no LLM call (unless force-regenerating)
  const cached = force ? null : getCachedExplanation(id);
  if (cached?.text) {
    return new Response(cached.text, {
      headers: { "Content-Type": "text/plain; charset=utf-8", "X-Cache": "HIT" },
    });
  }

  // 2. Gather paper content
  const paper = await getPaper(id);
  if (!paper) return new Response("Paper not found on arXiv", { status: 404 });
  const fullText = await fetchFullText(id);

  // 3. Stream from Ollama, caching the full result at the end
  let ollamaRes;
  try {
    ollamaRes = await fetch(`${OLLAMA_URL}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        prompt: buildPrompt(paper, fullText),
        stream: true,
        options: { num_ctx: 16384, temperature: 0.4 },
      }),
    });
  } catch {
    return new Response(
      `Could not reach Ollama at ${OLLAMA_URL}. Is it running? Try:\n  ollama serve\n  ollama pull ${OLLAMA_MODEL}`,
      { status: 502 }
    );
  }
  if (!ollamaRes.ok) {
    const err = await ollamaRes.text();
    return new Response(`Ollama error (${ollamaRes.status}): ${err}\nDo you have the model? Try: ollama pull ${OLLAMA_MODEL}`, {
      status: 502,
    });
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  let accumulated = "";
  let buffer = "";

  const stream = new ReadableStream({
    async start(controller) {
      const reader = ollamaRes.body.getReader();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop(); // keep incomplete line
          for (const line of lines) {
            if (!line.trim()) continue;
            try {
              const chunk = JSON.parse(line);
              if (chunk.response) {
                accumulated += chunk.response;
                controller.enqueue(encoder.encode(chunk.response));
              }
            } catch {
              // skip malformed line
            }
          }
        }
        if (accumulated.trim()) {
          saveExplanation(id, {
            title: paper.title,
            model: OLLAMA_MODEL,
            usedFullText: Boolean(fullText),
            text: accumulated,
          });
        }
        controller.close();
      } catch (e) {
        controller.error(e);
      }
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "X-Cache": "MISS" },
  });
}
