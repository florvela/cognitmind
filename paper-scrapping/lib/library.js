import fs from "fs";
import path from "path";

const FILE = path.join(process.cwd(), "data", "library.json");

function read() {
  try {
    const db = JSON.parse(fs.readFileSync(FILE, "utf8"));
    if (db && typeof db === "object" && db.items) return db;
  } catch {
    // missing or corrupt → start fresh
  }
  return { items: {} };
}

function write(db) {
  fs.mkdirSync(path.dirname(FILE), { recursive: true });
  fs.writeFileSync(FILE, JSON.stringify(db, null, 2));
}

export function getLibrary() {
  return read();
}

// Upsert/patch a single paper. `meta` carries the fields needed to render the
// card later (title, authors, …). `favorite` / `status` update the tracking
// state. An item with neither favorite nor status is pruned.
export function patchItem(id, { meta, favorite, status } = {}) {
  const db = read();
  const cur = db.items[id] || { id, addedAt: new Date().toISOString() };
  if (meta && typeof meta === "object") {
    for (const k of ["title", "authors", "published", "categories", "summary", "absUrl", "pdfUrl"]) {
      if (meta[k] !== undefined) cur[k] = meta[k];
    }
  }
  if (favorite !== undefined) cur.favorite = Boolean(favorite);
  if (status !== undefined) cur.status = status || null; // "to-read" | "reading" | "read" | null
  cur.updatedAt = new Date().toISOString();

  if (!cur.favorite && !cur.status) {
    delete db.items[id];
    write(db);
    return null;
  }
  db.items[id] = cur;
  write(db);
  return cur;
}
