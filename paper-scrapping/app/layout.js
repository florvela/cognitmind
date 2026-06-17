import "./globals.css";
import Link from "next/link";
import { Newsreader, IBM_Plex_Mono } from "next/font/google";
import SidebarNav from "@/components/SidebarNav";

const serif = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
  variable: "--font-serif",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
});

export const metadata = {
  title: "Paper Explainer",
  description: "arXiv papers explained in plain English by an LLM",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${serif.variable} ${mono.variable}`}>
      <body>
        <header className="site-header">
          <Link href="/" className="logo">
            Paper Explainer
          </Link>
          <span className="tagline">arXiv papers, explained in plain English</span>
        </header>
        <div className="app-shell">
          <SidebarNav />
          <div className="app-main">
            <main>{children}</main>
            <footer className="site-footer">
              Metadata &amp; full text from <a href="https://arxiv.org">arXiv</a>. Explanations are
              AI-generated and may contain errors — always check the original paper.
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
