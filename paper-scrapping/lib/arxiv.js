const API = "https://export.arxiv.org/api/query";

function decodeEntities(s = "") {
  return s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, "&");
}

function clean(s = "") {
  return decodeEntities(s).replace(/\s+/g, " ").trim();
}

function tag(xml, name) {
  const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`));
  return m ? m[1] : "";
}

function parseEntry(xml) {
  const rawId = tag(xml, "id"); // e.g. http://arxiv.org/abs/2606.11926v1
  const idMatch = rawId.match(/abs\/(.+?)(v\d+)?$/);
  const id = idMatch ? idMatch[1] : rawId;
  const authors = [...xml.matchAll(/<author>[\s\S]*?<name>([\s\S]*?)<\/name>[\s\S]*?<\/author>/g)].map(
    (m) => clean(m[1])
  );
  const categories = [...xml.matchAll(/<category[^>]*term="([^"]+)"/g)].map((m) => m[1]);
  const pdfMatch = xml.match(/<link[^>]*title="pdf"[^>]*href="([^"]+)"/);
  return {
    id,
    title: clean(tag(xml, "title")),
    summary: clean(tag(xml, "summary")),
    authors,
    categories,
    published: tag(xml, "published").slice(0, 10),
    updated: tag(xml, "updated").slice(0, 10),
    absUrl: `https://arxiv.org/abs/${id}`,
    pdfUrl: pdfMatch ? pdfMatch[1].replace(/^http:/, "https:") : `https://arxiv.org/pdf/${id}`,
  };
}

function parseFeed(xml) {
  return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map((m) => parseEntry(m[1]));
}

export async function searchPapers(query, { start = 0, max = 20 } = {}) {
  const searchQuery = query
    ? `all:"${query.replace(/"/g, "")}"`
    : "cat:cs.AI OR cat:cs.LG OR cat:cs.CL";
  const url =
    `${API}?search_query=${encodeURIComponent(searchQuery)}` +
    `&start=${start}&max_results=${max}&sortBy=submittedDate&sortOrder=descending`;
  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) throw new Error(`arXiv API error: ${res.status}`);
  return parseFeed(await res.text());
}

export async function getPaper(id) {
  const url = `${API}?id_list=${encodeURIComponent(id)}&max_results=1`;
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`arXiv API error: ${res.status}`);
  const papers = parseFeed(await res.text());
  return papers[0] || null;
}

function stripHtml(html) {
  return decodeEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<math[\s\S]*?<\/math>/gi, " [math] ")
      .replace(/<(h\d|p|li|div|section|figcaption)[^>]*>/gi, "\n")
      .replace(/<[^>]+>/g, " ")
  )
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n+/g, "\n\n")
    .trim();
}

// Fetch the paper's full text from arXiv's HTML version (papers since ~Dec 2023),
// falling back to ar5iv. Returns null if neither exists.
export async function fetchFullText(id, maxChars = 24000) {
  const sources = [
    `https://arxiv.org/html/${id}`,
    `https://ar5iv.labs.arxiv.org/html/${id}`,
  ];
  for (const url of sources) {
    try {
      const res = await fetch(url, { redirect: "follow" });
      if (!res.ok) continue;
      const html = await res.text();
      const body = tag(html, "body") || html;
      const text = stripHtml(body);
      if (text.length < 1000) continue; // probably an error page
      return text.slice(0, maxChars);
    } catch {
      // try next source
    }
  }
  return null;
}
