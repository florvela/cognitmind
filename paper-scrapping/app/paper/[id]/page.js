import Link from "next/link";
import { getPaper } from "@/lib/arxiv";
import Explanation from "./Explanation";
import BackButton from "./BackButton";
import PdfPreview from "@/components/PdfPreview";

export default async function PaperPage({ params }) {
  const { id: rawId } = await params;
  const id = decodeURIComponent(rawId);
  let paper = null;
  let error = null;
  try {
    paper = await getPaper(id);
  } catch (e) {
    error = e.message;
  }

  if (error) return <p className="error">Could not reach arXiv: {error}</p>;
  if (!paper) return <p className="error">Paper not found: {id}</p>;

  return (
    <div>
      <div className="nav-bar">
        <BackButton />
        <Link href="/" className="btn btn-sm">
          Home
        </Link>
      </div>

      <div className="paper-layout">
        <div className="paper-main">
          <div>
            {paper.categories.slice(0, 4).map((c) => (
              <span key={c} className="tag">
                {c}
              </span>
            ))}
          </div>
          <h1 className="detail-title">{paper.title}</h1>
          <div className="detail-meta">
            {paper.authors.join(", ")} · Published {paper.published}
          </div>
        </div>

        <aside className="paper-aside">
          <PdfPreview
            id={id}
            title={paper.title}
            absUrl={paper.absUrl}
            pdfUrl={paper.pdfUrl}
          />
        </aside>
      </div>

      <Explanation id={id} title={paper.title} />

      <div className="abstract">
        <h2>Original abstract</h2>
        <p>{paper.summary}</p>
      </div>
    </div>
  );
}
