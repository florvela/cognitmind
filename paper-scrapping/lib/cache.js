import fs from "fs";
import path from "path";

const DIR = path.join(process.cwd(), "data", "explanations");

function fileFor(id) {
  return path.join(DIR, id.replace(/[^a-zA-Z0-9.\-]/g, "_") + ".json");
}

export function getCachedExplanation(id) {
  try {
    return JSON.parse(fs.readFileSync(fileFor(id), "utf8"));
  } catch {
    return null;
  }
}

export function saveExplanation(id, data) {
  fs.mkdirSync(DIR, { recursive: true });
  fs.writeFileSync(fileFor(id), JSON.stringify({ id, ...data, createdAt: new Date().toISOString() }, null, 2));
  // Also keep a plain .md copy of the explanation
  if (data.text) {
    const md = `# ${data.title || id}\n\n> arXiv: https://arxiv.org/abs/${id} · model: ${data.model || "?"}\n\n${data.text}\n`;
    fs.writeFileSync(fileFor(id).replace(/\.json$/, ".md"), md);
  }
}
