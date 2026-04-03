import "./globals.css";
import Link from "next/link";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-slate-800 bg-slate-900/60 px-6 py-4">
          <nav className="mx-auto flex max-w-6xl gap-4 text-sm">
            <Link href="/" className="font-semibold">Affiliate Autopilot</Link>
            <Link href="/keywords">Keywords</Link>
            <Link href="/analytics">Analytics</Link>
            <Link href="/blog">Blog</Link>
          </nav>
        </header>
        <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
