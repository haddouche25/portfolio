"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

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
      ["Blog & Articles", "/blog"],
      ["Diagnostic gratuit", "/qcm"],
    ],
    company: [
      ["Expertises", "/#expertises"],
      ["Certifications", "/#certs"],
      ["Confidentialité (CNDP)", "/privacy"],
      ["Conditions Générales", "/terms"],
      ["Espace Admin", "/admin"],
    ],
    location: "Maroc • En présentiel et à distance",
    status: "Enseignant titulaire & Ingénieur logiciel",
    whatsapp: "Écrire sur WhatsApp",
    stack: "Construit avec",
    rights: "Tous droits réservés.",
    top: "Haut de page",
    privacy: "Confidentialité",
    terms: "Conditions",
    legal: "KaTeX • Markdown",
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
      ["Blog & Articles", "/blog"],
      ["Free diagnostic", "/qcm"],
    ],
    company: [
      ["Expertise", "/#expertises"],
      ["Certifications", "/#certs"],
      ["Privacy Policy", "/privacy"],
      ["Terms of Service", "/terms"],
      ["Admin Panel", "/admin"],
    ],
    location: "Morocco • In-person and online",
    status: "Certified teacher & Software engineer",
    whatsapp: "Message on WhatsApp",
    stack: "Built with",
    rights: "All rights reserved.",
    top: "Back to top",
    privacy: "Privacy",
    terms: "Terms",
    legal: "KaTeX • Markdown",
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
    hover: "hover:bg-slate-600 dark:hover:bg-slate-700",
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
    href: "https://wa.me/212669459522",
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
  const { lang: contextLang } = useLanguage();

  const urlLang = searchParams?.get("lang")?.toLowerCase();
  const activeLang: Lang =
    urlLang === "fr" || urlLang === "en"
      ? (urlLang as Lang)
      : contextLang === "EN"
        ? "en"
        : "fr";

  const t = T[activeLang];
  const suffix = activeLang === "fr" ? "?lang=fr" : "";
  const year = new Date().getFullYear();

  const href = (path: string) => {
    if (!suffix) return path;
    const [base, hash] = path.split("#");
    return `${base}${suffix}${hash ? `#${hash}` : ""}`;
  };

  const linkClass =
    "text-muted hover:text-brand-red dark:hover:text-white transition-colors inline-flex items-center gap-1.5 group";

  const column = (
    title: string,
    items: readonly (readonly [string, string])[],
  ) => (
    <div>
      <h3 className="text-[11px] font-black uppercase tracking-widest text-ink mb-4 flex items-center gap-2">
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
    <footer className="w-full bg-surface text-ink border-t-4 border-brand-red font-sans transition-colors duration-200">
      {/* CTA band */}
      <div className="border-b border-line bg-gradient-to-r from-brand-orange/10 via-surface2/40 to-brand-red/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-ink">
              {t.ctaTitle}
            </h2>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              {t.ctaDesc}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <Link href={href("/qcm")} className="np-btn-primary text-center">
              {t.ctaPrimary}
            </Link>
            <Link href={href("/contact")} className="np-btn-blue text-center">
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
                <span className="font-black text-lg tracking-tight leading-none text-ink">
                  MOHAMED HADDOUCHE
                </span>
                <span className="text-[10px] font-extrabold text-brand-orange tracking-wider uppercase mt-1">
                  Math Coach &bull; Software Engineer
                </span>
              </div>
            </Link>

            <p className="text-sm leading-relaxed text-muted max-w-sm">
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
                  className={`flex h-10 w-10 items-center justify-center rounded-lg bg-surface2 border border-line text-xs font-black text-ink hover:text-white transition ${s.hover}`}
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
            <h3 className="text-[11px] font-black uppercase tracking-widest text-ink mb-4 flex items-center gap-2">
              <span className="h-0.5 w-4 bg-brand-red rounded" />
              {t.cols.contact}
            </h3>
            <ul className="space-y-3 text-sm text-muted">
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
                  href="https://wa.me/212669459522"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 mt-1 px-3.5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black transition shadow-sm"
                >
                  <svg
                    className="w-4 h-4 fill-current shrink-0"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>{t.whatsapp}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mt-14 pt-8 border-t border-line flex flex-col md:flex-row md:items-center gap-4">
          <span className="text-[11px] font-black uppercase tracking-widest text-muted">
            {t.stack}
          </span>
          <div className="flex flex-wrap gap-2">
            {STACK.map((s) => (
              <span
                key={s}
                className="px-2.5 py-1 rounded-md bg-surface2 border border-line text-[11px] font-mono text-muted hover:border-brand-red/60 transition"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-line bg-surface2/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted">
          <p>
            &copy; {year} Mohamed Haddouche. {t.rights}
          </p>
          <div className="flex items-center gap-3 font-mono text-[11px]">
            <Link
              href={href("/privacy")}
              className="hover:text-brand-orange transition underline-offset-4 hover:underline"
            >
              {t.privacy}
            </Link>
            <span>•</span>
            <Link
              href={href("/terms")}
              className="hover:text-brand-orange transition underline-offset-4 hover:underline"
            >
              {t.terms}
            </Link>
            <span>•</span>
            <span>{t.legal}</span>
          </div>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-1.5 font-bold text-muted hover:text-brand-red transition"
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
        <footer className="w-full h-64 bg-surface border-t-4 border-brand-red animate-pulse" />
      }
    >
      <FooterContent />
    </Suspense>
  );
}
