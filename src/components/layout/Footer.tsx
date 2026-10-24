"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Lang = "fr" | "en";

const T = {
  fr: {
    ctaTitle: "Prêt à progresser en mathématiques ?",
    ctaDesc:
      "Passez le diagnostic gratuit en 15 minutes, ou parlons de votre projet logiciel.",
    ctaPrimary: "COMMENCER LE TEST →",
    ctaSecondary: "ME CONTACTER",
    about:
      "Articles, leçons interactives et travaux de recherche en mathématiques, programmation et informatique. Didactique rigoureuse et ingénierie logicielle moderne.",
    cols: {
      pillars: "Piliers",
      resources: "Ressources",
      company: "Parcours",
      contact: "Contact",
    },
    pillars: [
      ["Mathématiques", "/maths"],
      ["Développement & Algorithmique", "/coding"],
      ["Systèmes & IA", "/computing"],
    ],
    resources: [
      ["Moteur QCM", "/qcm"],
      ["Blog & Articles", "/articles"],
      ["Diagnostic gratuit", "/qcm"],
    ],
    company: [
      ["Expertises", "/#expertises"],
      ["Certifications", "/#certs"],
      ["Contact", "/contact"],
      ["Espace Admin", "/admin"],
    ],
    location: "Maroc • En présentiel et à distance",
    status: "Enseignant titulaire & Ingénieur logiciel",
    whatsapp: "Écrire sur WhatsApp",
    stack: "Construit avec",
    rights: "Tous droits réservés.",
    top: "Haut de page",
    legal: "Multilingue • KaTeX • Markdown",
  },
  en: {
    ctaTitle: "Ready to level up your mathematics?",
    ctaDesc:
      "Take the free 15-minute diagnostic, or let's talk about your software project.",
    ctaPrimary: "START THE TEST →",
    ctaSecondary: "GET IN TOUCH",
    about:
      "Articles, interactive lessons, and technical explorations covering mathematics, software, and computing systems. Rigorous didactics and modern software engineering.",
    cols: {
      pillars: "Pillars",
      resources: "Resources",
      company: "Background",
      contact: "Contact",
    },
    pillars: [
      ["Mathematics", "/maths"],
      ["Software & Algorithms", "/coding"],
      ["Systems & Computing", "/computing"],
    ],
    resources: [
      ["MCQ Engine", "/qcm"],
      ["Blog & Articles", "/articles"],
      ["Free diagnostic", "/qcm"],
    ],
    company: [
      ["Expertise", "/#expertises"],
      ["Certifications", "/#certs"],
      ["Contact", "/contact"],
      ["Admin Panel", "/admin"],
    ],
    location: "Morocco • In-person and online",
    status: "Certified teacher & Software engineer",
    whatsapp: "Message on WhatsApp",
    stack: "Built with",
    rights: "All rights reserved.",
    top: "Back to top",
    legal: "Multilingual • KaTeX • Markdown",
  },
} as const;

const SOCIALS = [
  {
    label: "LinkedIn",
    short: "in",
    href: "https://linkedin.com",
    hover: "hover:bg-brand-blue",
  },
  {
    label: "GitHub",
    short: "GH",
    href: "https://github.com",
    hover: "hover:bg-slate-600",
  },
  {
    label: "YouTube",
    short: "YT",
    href: "https://youtube.com",
    hover: "hover:bg-brand-red",
  },
  {
    label: "WhatsApp",
    short: "WA",
    href: "https://wa.me/212600000000",
    hover: "hover:bg-emerald-600",
  },
];

const STACK = [
  "Next.js 16",
  "React 19",
  "TypeScript",
  "Prisma 7",
  "MariaDB",
  "KaTeX",
  "Docker",
];

function FooterContent() {
  const searchParams = useSearchParams();
  const lang: Lang = searchParams.get("lang") === "fr" ? "fr" : "en";
  const t = T[lang];
  const suffix = lang === "fr" ? "?lang=fr" : "";
  const year = new Date().getFullYear();

  // keep ?lang= on internal links, placing it before any #hash
  const href = (path: string) => {
    if (!suffix) return path;
    const [base, hash] = path.split("#");
    return `${base}${suffix}${hash ? `#${hash}` : ""}`;
  };

  const linkClass =
    "text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1.5 group";

  const column = (
    title: string,
    items: readonly (readonly [string, string])[],
  ) => (
    <div>
      <h3 className="text-[11px] font-black uppercase tracking-widest text-white mb-4 flex items-center gap-2">
        <span className="h-0.5 w-4 bg-brand-red rounded" />
        {title}
      </h3>
      <ul className="space-y-2.5 text-sm font-medium">
        {items.map(([label, path]) => (
          <li key={label}>
            <Link href={href(path)} className={linkClass}>
              <span className="text-brand-red opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all">
                ›
              </span>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className="w-full bg-band text-white border-t-4 border-brand-red font-sans">
      {/* CTA band */}
      <div className="border-b border-white/10 bg-gradient-to-r from-brand-orange/15 via-transparent to-brand-red/15">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              {t.ctaTitle}
            </h2>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              {t.ctaDesc}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <Link href={href("/qcm")} className="np-btn-primary">
              {t.ctaPrimary}
            </Link>
            <Link href={href("/contact")} className="np-btn-blue">
              {t.ctaSecondary}
            </Link>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="lg:col-span-4 space-y-5">
            <Link href={href("/")} className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-brand-orange to-brand-red text-white font-mono font-black text-2xl shadow-sm">
                &Sigma;
              </span>
              <div className="flex flex-col">
                <span className="font-black text-lg tracking-tight leading-none">
                  MOHAMED HADDOUCHE
                </span>
                <span className="text-[10px] font-extrabold text-brand-orange tracking-wider uppercase mt-1">
                  Math Coach &bull; Software Engineer
                </span>
              </div>
            </Link>

            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              {t.about}
            </p>

            <div className="flex items-center gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-xs font-black text-white transition ${s.hover}`}
                >
                  {s.short}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-2">
            {column(t.cols.pillars, t.pillars)}
          </div>
          <div className="lg:col-span-2">
            {column(t.cols.resources, t.resources)}
          </div>
          <div className="lg:col-span-2">
            {column(t.cols.company, t.company)}
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h3 className="text-[11px] font-black uppercase tracking-widest text-white mb-4 flex items-center gap-2">
              <span className="h-0.5 w-4 bg-brand-red rounded" />
              {t.cols.contact}
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex gap-2">
                <span aria-hidden>📍</span>
                <span>{t.location}</span>
              </li>
              <li className="flex gap-2">
                <span aria-hidden>💼</span>
                <span>{t.status}</span>
              </li>
              <li>
                <a
                  href="https://wa.me/212600000000"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 mt-1 px-3 py-2 rounded-lg bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs font-black transition"
                >
                  💬 {t.whatsapp}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Stack */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center gap-4">
          <span className="text-[11px] font-black uppercase tracking-widest text-slate-500">
            {t.stack}
          </span>
          <div className="flex flex-wrap gap-2">
            {STACK.map((s) => (
              <span
                key={s}
                className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300 hover:border-brand-red/60 transition"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 bg-black/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            &copy; {year} Mohamed Haddouche. {t.rights}
          </p>
          <p className="font-mono">{t.legal}</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-1.5 font-bold text-slate-400 hover:text-brand-red transition"
          >
            {t.top} <span aria-hidden>↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}

export default function Footer() {
  return (
    <Suspense
      fallback={
        <footer className="w-full h-64 bg-band border-t-4 border-brand-red" />
      }
    >
      <FooterContent />
    </Suspense>
  );
}
