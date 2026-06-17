import { PDFiumLibrary } from "@hyzyla/pdfium";
import { PNG } from "pngjs";

// PDFium (WASM) is heavy to spin up — keep one instance for the whole server.
let _lib = null;
async function getLib() {
  if (!_lib) _lib = await PDFiumLibrary.init();
  return _lib;
}

// Render the first page of a PDF (as a Buffer) to a PNG Buffer.
// scale 1 ≈ 72dpi (a US-letter page → 612px wide); 0.5 keeps thumbnails small.
export async function renderPdfFirstPage(pdfBuffer, { scale = 0.5 } = {}) {
  const lib = await getLib();
  const doc = await lib.loadDocument(pdfBuffer);
  try {
    const page = doc.getPage(0);
    const bitmap = await page.render({ scale, render: "bitmap" }); // RGBA
    const png = new PNG({ width: bitmap.width, height: bitmap.height });
    png.data = Buffer.from(bitmap.data);
    return PNG.sync.write(png);
  } finally {
    doc.destroy();
  }
}

// A neutral panel-colored placeholder, used when a PDF can't be rendered yet.
let _placeholder = null;
export function placeholderPng() {
  if (_placeholder) return _placeholder;
  const w = 200, h = 260;
  const png = new PNG({ width: w, height: h });
  for (let i = 0; i < w * h; i++) {
    const o = i * 4;
    png.data[o] = 0x22;     // R  (#221d15, matches --panel-ish)
    png.data[o + 1] = 0x1d; // G
    png.data[o + 2] = 0x15; // B
    png.data[o + 3] = 0xff; // A
  }
  _placeholder = PNG.sync.write(png);
  return _placeholder;
}
