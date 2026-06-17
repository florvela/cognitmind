import { searchPapers } from "@/lib/arxiv";
import { getLibrary } from "@/lib/library";
import PaperCard from "@/components/PaperCard";

export const dynamic = "force-dynamic";

export default async function Home({ searchParams }) {
  const { q = "" } = await searchParams;
  let papers = [];
  let error = null;
  try {
    papers = await searchPapers(q, { max: 25 });
  } catch (e) {
    error = e.message;
  }
  const lib = getLibrary();

  return (
    <div>
      <form className="search-form" action="/">
        <input
          type="text"
          name="q"
          placeholder="Search arXiv papers… (e.g. diffusion models, protein folding)"
          defaultValue={q}
        />
        <button type="submit">Search</button>
      </form>

      <div className="section-title">
        {q ? `Results for "${q}"` : "Latest in AI / ML / NLP"}
      </div>

      {error && <p className="error">Could not reach arXiv: {error}</p>}
      {!error && papers.length === 0 && <p className="status">No papers found.</p>}

      {papers.map((p) => (
        <PaperCard key={p.id} paper={p} initial={lib.items[p.id]} />
      ))}
    </div>
  );
}
