import fs from "fs";
import path from "path";

export const runtime = "nodejs";

const DIR = path.join(process.cwd(), "data", "pdfs");

function fileFor(id) {
  return path.join(DIR, id.replace(/[^a-zA-Z0-9.\-]/g, "_") + ".pdf");
}

function pdfResponse(buf, cache) {
  return new Response(buf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline",
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Cache": cache,
    },
  });
}

// Proxy (and cache) the arXiv PDF from our own origin so it can be embedded in
// an <iframe> without running into arXiv's framing / CORS restrictions.
export async function GET(req) {
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return new Response("Missing id", { status: 400 });

  // 1. cached on disk
  try {
    return pdfResponse(fs.readFileSync(fileFor(id)), "HIT");
  } catch {
    // not cached yet
  }

  // 2. fetch from arXiv, cache, serve
  const url = `https://arxiv.org/pdf/${encodeURIComponent(id)}`;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 25000);
  try {
    const res = await fetch(url, {
      redirect: "follow",
      signal: ctrl.signal,
      headers: { "User-Agent": "paper-explainer/1.0 (pdf viewer)" },
    });
    if (!res.ok) throw new Error(`arXiv PDF ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    fs.mkdirSync(DIR, { recursive: true });
    fs.writeFileSync(fileFor(id), buf);
    return pdfResponse(buf, "MISS");
  } catch (e) {
    console.error(`[pdf] failed for ${id}:`, e?.message || e);
    return new Response(`Could not load PDF: ${e?.message || e}`, { status: 502 });
  } finally {
    clearTimeout(timer);
  }
}
