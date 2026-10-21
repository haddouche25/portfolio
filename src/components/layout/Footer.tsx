"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function FooterContent() {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") === "fr" ? "fr" : "en";
  const langSuffix = lang === "fr" ? "?lang=fr" : "";
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 transition-colors">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-3">
            <Link
              href={`/${langSuffix}`}
              className="flex items-center gap-2 font-mono font-bold text-slate-900 dark:text-slate-100 text-base"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded bg-blue-600 text-white text-xs font-semibold">
                &Sigma;
              </span>
              <span>Portfolio</span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              {lang === "fr"
                ? "Articles, leçons interactives et travaux de recherche en mathématiques, programmation et informatique."
                : "Articles, interactive lessons, and technical explorations covering mathematics, software, and computing systems."}
            </p>
          </div>

          {/* Pillars Column */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 font-mono">
              {lang === "fr" ? "Piliers" : "Pillars"}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={`/maths${langSuffix}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {lang === "fr" ? "Mathématiques" : "Mathematics"}
                </Link>
              </li>
              <li>
                <Link
                  href={`/coding${langSuffix}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {lang === "fr"
                    ? "Développement & Algorithmique"
                    : "Software & Algorithms"}
                </Link>
              </li>
              <li>
                <Link
                  href={`/computing${langSuffix}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {lang === "fr" ? "Systèmes & IA" : "Systems & Computing"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Links Column */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 font-mono">
              {lang === "fr" ? "Navigation" : "Navigation"}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={`/contact${langSuffix}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {lang === "fr" ? "Espace Admin" : "Admin Panel"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Technology Stack Tags */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 font-mono">
              Stack
            </h3>
            <div className="flex flex-wrap gap-1.5 text-xs font-mono">
              <span className="px-2 py-0.5 rounded bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                Next.js 16
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                React 19
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                Prisma 7
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                KaTeX
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="border-t border-slate-200/80 dark:border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>&copy; {currentYear} All rights reserved.</p>
          <p className="mt-2 sm:mt-0 font-mono">
            KaTeX &bull; Markdown &bull; Multilingual
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function Footer() {
  return (
    <Suspense
      fallback={
        <footer className="w-full h-32 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950" />
      }
    >
      <FooterContent />
    </Suspense>
  );
}
