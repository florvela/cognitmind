import { getLibrary } from "@/lib/library";
import PaperCard from "@/components/PaperCard";

export const dynamic = "force-dynamic";

export default function FavoritesPage() {
  const lib = getLibrary();
  const favs = Object.values(lib.items)
    .filter((i) => i.favorite)
    .sort((a, b) => (b.updatedAt || "").localeCompare(a.updatedAt || ""));

  return (
    <div>
      <div className="section-title">Favorites</div>
      {favs.length === 0 && (
        <p className="status">No favorites yet — tap the ☆ on any paper to save it here.</p>
      )}
      {favs.map((p) => (
        <PaperCard key={p.id} paper={p} initial={p} />
      ))}
    </div>
  );
}
