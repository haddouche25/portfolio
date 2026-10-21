"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import LanguageToggle from "@/components/layout/LanguageToggle";

const NAV_ITEMS = [
  {
    href: "/maths",
    labels: { en: "Maths", fr: "Maths" },
    matchPrefix: "/maths",
  },
  {
    href: "/coding",
    labels: { en: "Coding", fr: "Code" },
    matchPrefix: "/coding",
  },
  {
    href: "/computing",
    labels: { en: "Computing", fr: "Systèmes" },
    matchPrefix: "/computing",
  },
  {
    href: "/contact",
    labels: { en: "Contact", fr: "Contact" },
    matchPrefix: "/contact",
  },
];

function NavContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const lang = searchParams.get("lang") === "fr" ? "fr" : "en";
  const langSuffix = lang === "fr" ? "?lang=fr" : "";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand / Logo */}
        <Link
          href={`/${langSuffix}`}
          className="flex items-center gap-2 font-mono font-bold tracking-tight text-slate-900 dark:text-slate-100 text-lg hover:opacity-85 transition-opacity"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white text-sm font-semibold">
            &Sigma;
          </span>
          <span>Portfolio</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname.startsWith(item.matchPrefix);
            return (
              <Link
                key={item.href}
                href={`${item.href}${langSuffix}`}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900"
                }`}
              >
                {item.labels[lang]}
              </Link>
            );
          })}
        </nav>

        {/* Action Elements */}
        <div className="flex items-center gap-3">
          <LanguageToggle />

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.75"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-2 pb-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname.startsWith(item.matchPrefix);
            return (
              <Link
                key={item.href}
                href={`${item.href}${langSuffix}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? "bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900"
                }`}
              >
                {item.labels[lang]}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}

export default function Navbar() {
  return (
    <Suspense
      fallback={
        <header className="h-16 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80" />
      }
    >
      <NavContent />
    </Suspense>
  );
}
