import { getLibrary } from "@/lib/library";
import Board from "@/components/Board";

export const dynamic = "force-dynamic";

export default function BoardPage() {
  const lib = getLibrary();
  const items = Object.values(lib.items).filter((i) => i.status);
  return (
    <div>
      <div className="section-title">Reading board</div>
      <Board initialItems={items} />
    </div>
  );
}
