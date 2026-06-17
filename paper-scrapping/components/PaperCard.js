"use client";

import Link from "next/link";
import { useState } from "react";

const STATUS_LABEL = {
  "to-read": "To read",
  reading: "Reading",
  read: "Read",
};

function metaOf(p) {
  return {
    title: p.title,
    authors: p.authors,
    published: p.published,
    categories: p.categories,
    summary: p.summary,
    absUrl: p.absUrl,
    pdfUrl: p.pdfUrl,
  };
}

export default function PaperCard({ paper, initial }) {
  const [favorite, setFavorite] = useState(Boolean(initial?.favorite));
  const [status, setStatus] = useState(initial?.status || null);
  const href = `/paper/${encodeURIComponent(paper.id)}`;

  async function patch(body) {
    try {
      await fetch("/api/library", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: paper.id, meta: metaOf(paper), ...body }),
      });
    } catch {
      // best-effort; UI already updated optimistically
    }
  }

  function toggleFavorite() {
    const next = !favorite;
    setFavorite(next);
    patch({ favorite: next });
  }

  function toggleBoard() {
    const next = status ? null : "to-read";
    setStatus(next);
    patch({ status: next });
  }

  return (
    <article className="paper-card">
      <Link href={href} className="paper-thumb-link" aria-label={`Open ${paper.title}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="paper-thumb"
          src={`/api/thumb?id=${encodeURIComponent(paper.id)}`}
          alt=""
          loading="lazy"
        />
      </Link>
      <div className="paper-card-body">
        <h3>
          <Link href={href}>{paper.title}</Link>
        </h3>
        <div className="meta">
          {(paper.authors || []).slice(0, 4).join(", ")}
          {(paper.authors || []).length > 4 ? " et al." : ""} · {paper.published}{" "}
          {(paper.categories || []).slice(0, 3).map((c) => (
            <span key={c} className="tag">
              {c}
            </span>
          ))}
        </div>
        {paper.summary && <p>{paper.summary}</p>}
        <div className="paper-actions">
          <button
            type="button"
            className={`star-btn${favorite ? " is-on" : ""}`}
            onClick={toggleFavorite}
            aria-pressed={favorite}
            title={favorite ? "Remove from favorites" : "Add to favorites"}
          >
            <span className="star-glyph">{favorite ? "★" : "☆"}</span>
            {favorite ? "Favorited" : "Favorite"}
          </button>
          <button
            type="button"
            className={`btn btn-sm${status ? " is-on" : ""}`}
            onClick={toggleBoard}
            title={status ? "Remove from board" : "Add to board (To read)"}
          >
            {status ? `On board · ${STATUS_LABEL[status]}` : "+ To read"}
          </button>
        </div>
      </div>
    </article>
  );
}
