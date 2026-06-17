# Paper Explainer

arXiv paper browser with an LLM layer: every paper gets a plain-English explanation of the topic (not just a summary), generated **on demand** by a local model via Ollama and **cached to disk** so it's never reprocessed.

## How it works

1. **Listing/search**: queries the free [arXiv API](https://info.arxiv.org/help/api/index.html) live — no bulk download, no database needed.
2. **Paper page**: fetches metadata + the paper's full text (arXiv HTML version, ar5iv fallback), sends it to your local Ollama model with a prompt that asks for a beginner-friendly *explanation of the topic* (big picture → problem → what they did → why it matters).
3. **Cache**: the result is streamed to the browser and saved to `data/explanations/<id>.json`. Next visitor gets it instantly (lazy generation, zero reprocessing).

## Setup

```bash
# 1. Install Ollama (https://ollama.com) and pull a model
ollama pull llama3.1

# 2. Install and run
npm install
npm run dev
```

Open http://localhost:3000.

To use a different model or Ollama host, copy `.env.example` to `.env.local` and edit it.

## Notes

- Full text only exists as HTML for papers from ~Dec 2023 onward; older papers fall back to ar5iv, then to abstract-only.
- Local models have limited context, so the full text is truncated to ~24k characters before sending.
- To use Claude or OpenAI instead of Ollama, only `app/api/explain/route.js` needs changing.
