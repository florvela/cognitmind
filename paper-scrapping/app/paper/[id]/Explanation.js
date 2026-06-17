"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { marked } from "marked";

marked.setOptions({ gfm: true, breaks: true });

const STAGES = ["Reading full text", "Reasoning", "Writing"];

export default function Explanation({ id, title }) {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("loading"); // loading | streaming | done | cached | error
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [stage, setStage] = useState(0); // 0 Reading · 1 Reasoning · 2 Writing
  const started = useRef(false);
  const timers = useRef([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const generate = useCallback(async (force = false) => {
    setText("");
    setError("");
    setStatus("loading");
    setStage(0);
    clearTimers();
    // cosmetic staging — advance the pills on a timer while the single fetch runs
    timers.current.push(setTimeout(() => setStage(1), 2500));
    timers.current.push(setTimeout(() => setStage(2), 6000));
    try {
      const res = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, force }),
      });
      if (!res.ok) {
        clearTimers();
        setError(await res.text());
        setStatus("error");
        return;
      }
      const fromCache = res.headers.get("X-Cache") === "HIT";
      clearTimers();
      setStage(2); // text is arriving → "Writing"
      setStatus(fromCache ? "cached" : "streaming");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setText(acc);
      }
      setStatus(fromCache ? "cached" : "done");
    } catch (e) {
      clearTimers();
      setError(String(e));
      setStatus("error");
    }
  }, [id]);

  useEffect(() => {
    if (started.current) return; // avoid double-run in React strict mode
    started.current = true;
    generate(false);
    return clearTimers;
  }, [generate]);

  const busy = status === "loading" || status === "streaming";

  const downloadMd = () => {
    const blob = new Blob([text], { type: "text/markdown" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${id.replace(/[^a-zA-Z0-9.\-]/g, "_")}-explanation.md`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const copyMd = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="explanation">
      <div className="explanation-header">
        <h2>
          Plain-English explanation{" "}
          {status === "cached" && <span className="tag">cached</span>}
        </h2>
        <div className="toolbar">
          <button className="btn btn-sm" onClick={copyMd} disabled={!text}>
            {copied ? "Copied!" : "Copy .md"}
          </button>
          <button className="btn btn-sm" onClick={downloadMd} disabled={!text}>
            Download .md
          </button>
          <button className="btn btn-sm" onClick={() => generate(true)} disabled={busy}>
            ↻ Regenerate
          </button>
        </div>
      </div>
      {status === "loading" && (
        <div className="status">
          <div className="stage-row">
            {STAGES.map((label, i) => (
              <span
                key={label}
                className={`tag${i === stage ? " is-active" : ""}${
                  i < stage ? " is-done" : ""
                }`}
              >
                {label}
              </span>
            ))}
          </div>
          Reading the paper&apos;s full text and writing a plain-English explanation — ~10–20s.
          First time for a paper takes a little while; after that it&apos;s instant for everyone.
        </div>
      )}
      {status === "error" && <p className="error">{error}</p>}
      {text && (
        <div
          className="explanation-body markdown"
          dangerouslySetInnerHTML={{ __html: marked.parse(text) }}
        />
      )}
      {status === "streaming" && <span className="cursor" />}
    </div>
  );
}
