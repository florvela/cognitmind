import { getLibrary, patchItem } from "@/lib/library";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(getLibrary());
}

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }
  if (!body?.id) return new Response("Missing id", { status: 400 });
  const item = patchItem(body.id, {
    meta: body.meta,
    favorite: body.favorite,
    status: body.status,
  });
  return Response.json({ item });
}
