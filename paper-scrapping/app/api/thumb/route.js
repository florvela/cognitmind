import fs from "fs";
import path from "path";
import { renderPdfFirstPage, placeholderPng } from "@/lib/thumbnail";

export const runtime = "nodejs";

const DIR = path.join(process.cwd(), "data", "thumbs");

function fileFor(id) {
  return path.join(DIR, id.replace(/[^a-zA-Z0-9.\-]/g, "_") + ".png");
}

// de-dupe concurrent renders of the same paper (the home page asks for ~25 at once)
const inflight = new Map();

async function buildThumb(id) {
  // arXiv redirects /pdf/{id} to the actual PDF
  const url = `https://arxiv.org/pdf/${encodeURIComponent(id)}`;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 25000);
  let pdf;
  try {
    const res = await fetch(url, {
      redirect: "follow",
      signal: ctrl.signal,
      headers: { "User-Agent": "paper-explainer/1.0 (thumbnail fetch)" },
    });
    if (!res.ok) throw new Error(`arXiv PDF ${res.status}`);
    pdf = Buffer.from(await res.arrayBuffer());
  } finally {
    clearTimeout(timer);
  }
  const png = await renderPdfFirstPage(pdf, { scale: 0.5 });
  fs.mkdirSync(DIR, { recursive: true });
  fs.writeFileSync(fileFor(id), png);
  return png;
}

export async function GET(req) {
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return new Response("Missing id", { status: 400 });

  // 1. cached on disk → serve immediately
  try {
    const cached = fs.readFileSync(fileFor(id));
    return new Response(cached, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Cache": "HIT",
      },
    });
  } catch {
    // not cached yet — fall through to render
  }

  // 2. render (de-duped), or serve a placeholder on any failure
  try {
    if (!inflight.has(id)) inflight.set(id, buildThumb(id));
    const png = await inflight.get(id);
    return new Response(png, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Cache": "MISS",
      },
    });
  } catch (e) {
    console.error(`[thumb] failed for ${id}:`, e?.message || e);
    return new Response(placeholderPng(), {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "no-store", // let the browser retry later
        "X-Cache": "ERROR",
      },
    });
  } finally {
    inflight.delete(id);
  }
}
