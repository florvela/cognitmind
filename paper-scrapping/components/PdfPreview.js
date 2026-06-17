"use client";

import { useEffect, useState } from "react";

export default function PdfPreview({ id, title, absUrl, pdfUrl }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden"; // lock scroll behind the modal
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <div className="pdf-preview">
      <button
        type="button"
        className="pdf-thumb-btn"
        onClick={() => setOpen(true)}
        title="Read the PDF inside the page"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="pdf-thumb-img"
          src={`/api/thumb?id=${encodeURIComponent(id)}`}
          alt={`First page of ${title}`}
          loading="lazy"
        />
        <span className="pdf-thumb-hint">Click to read here</span>
      </button>

      <div className="pdf-links">
        <a className="btn btn-sm" href={absUrl} target="_blank" rel="noreferrer">
          arXiv ↗
        </a>
        <a className="btn btn-sm" href={pdfUrl} target="_blank" rel="noreferrer">
          PDF ↗
        </a>
      </div>

      {open && (
        <div className="pdf-modal" onClick={() => setOpen(false)} role="dialog" aria-modal="true">
          <div className="pdf-modal-inner" onClick={(e) => e.stopPropagation()}>
            <div className="pdf-modal-bar">
              <span className="pdf-modal-title">{title}</span>
              <div className="pdf-modal-actions">
                <a className="btn btn-sm" href={pdfUrl} target="_blank" rel="noreferrer">
                  Open ↗
                </a>
                <button type="button" className="btn btn-sm" onClick={() => setOpen(false)}>
                  Close ✕
                </button>
              </div>
            </div>
            <iframe
              className="pdf-frame"
              src={`/api/pdf?id=${encodeURIComponent(id)}`}
              title={`PDF: ${title}`}
            />
          </div>
        </div>
      )}
    </div>
  );
}
