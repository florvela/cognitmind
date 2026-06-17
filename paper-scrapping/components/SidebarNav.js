"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", label: "Papers" },
  { href: "/favorites", label: "Favorites" },
  { href: "/board", label: "Board" },
];

export default function SidebarNav() {
  const pathname = usePathname();
  return (
    <nav className="sidebar" aria-label="Sections">
      {TABS.map((t) => {
        const active = t.href === "/" ? pathname === "/" : pathname.startsWith(t.href);
        return (
          <Link
            key={t.href}
            href={t.href}
            className={`side-tab${active ? " is-active" : ""}`}
            aria-current={active ? "page" : undefined}
          >
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
