"use client";

import Link from "next/link";
import { useState } from "react";

const COLUMNS = [
  { key: "to-read", label: "To read" },
  { key: "reading", label: "Reading" },
  { key: "read", label: "Read" },
];

export default function Board({ initialItems = [] }) {
  const [items, setItems] = useState(initialItems);
  const [overCol, setOverCol] = useState(null);
  const [dragId, setDragId] = useState(null);

  async function persist(id, status) {
    try {
      await fetch("/api/library", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
    } catch {
      // optimistic UI already applied
    }
  }

  function move(id, status) {
    setItems((prev) => {
      if (status === null) return prev.filter((it) => it.id !== id);
      return prev.map((it) => (it.id === id ? { ...it, status } : it));
    });
    persist(id, status);
  }

  function onDrop(e, colKey) {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain") || dragId;
    setOverCol(null);
    setDragId(null);
    if (id) move(id, colKey);
  }

  return (
    <div className="board">
      {COLUMNS.map((col) => {
        const cards = items.filter((it) => it.status === col.key);
        return (
          <section
            key={col.key}
            className={`board-col${overCol === col.key ? " is-over" : ""}`}
            onDragOver={(e) => {
              e.preventDefault();
              if (overCol !== col.key) setOverCol(col.key);
            }}
            onDragLeave={(e) => {
              // only clear when leaving the column, not when entering a child
              if (!e.currentTarget.contains(e.relatedTarget)) setOverCol(null);
            }}
            onDrop={(e) => onDrop(e, col.key)}
          >
            <h3 className="board-col-head">
              {col.label}
              <span className="board-count">{cards.length}</span>
            </h3>
            <div className="board-col-body">
              {cards.length === 0 && <p className="board-empty">Drag papers here</p>}
              {cards.map((it) => (
                <article
                  key={it.id}
                  className="board-card"
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData("text/plain", it.id);
                    e.dataTransfer.effectAllowed = "move";
                    setDragId(it.id);
                  }}
                  onDragEnd={() => {
                    setDragId(null);
                    setOverCol(null);
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="board-thumb"
                    src={`/api/thumb?id=${encodeURIComponent(it.id)}`}
                    alt=""
                    loading="lazy"
                    draggable={false}
                  />
                  <div className="board-card-body">
                    <Link href={`/paper/${encodeURIComponent(it.id)}`} className="board-card-title">
                      {it.title || it.id}
                    </Link>
                    <div className="board-card-meta">{it.published}</div>
                  </div>
                  <button
                    type="button"
                    className="board-remove"
                    onClick={() => move(it.id, null)}
                    title="Remove from board"
                    aria-label="Remove from board"
                  >
                    ×
                  </button>
                </article>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
