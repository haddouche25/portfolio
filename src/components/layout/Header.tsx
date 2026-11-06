"use client";

import React, { useState } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/theme/ThemeToggle";

interface HeaderProps {
  lang: "FR" | "EN";
  onLanguageChange: (lang: "FR" | "EN") => void;
}

export default function Header({ lang, onLanguageChange }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = {
    FR: {
      alert:
        "Coach en mathématiques & Ingénieur logiciel · Penser juste, coder propre",
      talkCta: "RÉSERVER UN APPEL",
      consultation: "PRENDRE RDV",
      studentLogin: "ESPACE ÉLÈVE",
      nav: {
        coaching: "Math Coaching",
        qcm: "Moteur QCM",
        computing: "Sciences Info",
        projects: "Projets",
        certs: "Certifications",
        cv: "Parcours",
        blog: "Blog",
        contact: "Contact",
      },
    },
    EN: {
      alert: "Math Coach & Software Engineer · Think sharp, code clean",
      talkCta: "LET'S TALK",
      consultation: "BOOK A CALL",
      studentLogin: "STUDENT PORTAL",
      nav: {
        coaching: "Math Coaching",
        qcm: "MCQ Engine",
        computing: "Computing",
        projects: "Projects",
        certs: "Certifications",
        cv: "Background",
        blog: "Blog",
        contact: "Contact",
      },
    },
  }[lang];

  // Les ancres pointent vers les sections de la page d'accueil ou les pages dédiées
  const links = [
    { href: "/#coaching", label: t.nav.coaching },
    { href: "/qcm", label: t.nav.qcm },
    { href: "/#computing", label: t.nav.computing },
    { href: "/#projects", label: t.nav.projects },
    { href: "/#certs", label: t.nav.certs },
    { href: "/#parcours", label: t.nav.cv },
    { href: "/blog", label: t.nav.blog },
    { href: "/#contact", label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 w-full font-sans">
      {/* LEVEL 1: orange -> red announcement bar */}
      <div className="bg-gradient-to-r from-brand-orange via-brand-orange to-brand-red text-white py-2.5 px-4 text-xs font-bold tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 truncate">
            <span className="truncate">{t.alert}</span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/#contact"
              className="hidden sm:inline-block px-4 py-1.5 rounded-md bg-brand-blue hover:bg-blue-700 text-white text-[11px] font-black uppercase tracking-wider transition shadow-sm"
            >
              {t.talkCta}
            </Link>

            <div className="bg-white/20 hover:bg-white/30 rounded-md p-0.5 transition">
              <ThemeToggle />
            </div>

            <div className="inline-flex rounded-md bg-black/25 p-0.5 text-[11px]">
              {(["FR", "EN"] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => onLanguageChange(l)}
                  className={`px-2 py-0.5 rounded font-black transition ${
                    lang === l
                      ? "bg-white text-brand-red shadow"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* LEVEL 2: clean navigation */}
      <div className="bg-surface/95 backdrop-blur border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="font-black text-lg tracking-tight text-ink leading-none">
                MOHAMED HADDOUCHE
              </span>
              <span className="text-[10px] font-extrabold text-brand-orange tracking-wider uppercase mt-1">
                Math Coach &bull; Software Engineer
              </span>
            </div>
          </Link>

          <nav className="hidden xl:flex items-center gap-6 text-[13px] font-extrabold text-ink">
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="relative py-1 hover:text-brand-red transition after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-0 after:bg-brand-red after:transition-all hover:after:w-full"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            {/* Bouton Espace Élève */}
            <Link
              href="/connexion"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-surface2 hover:bg-brand-orange/10 text-ink hover:text-brand-orange border border-line text-xs font-black uppercase tracking-wider transition"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span>{t.studentLogin}</span>
            </Link>

            {/* Bouton Prendre RDV */}
            <Link
              href="/#contact"
              className="hidden sm:inline-block px-4 py-2 rounded-lg border-2 border-ink text-ink hover:bg-brand-red hover:border-brand-red hover:text-white text-xs font-black uppercase tracking-wider transition-all"
            >
              {t.consultation}
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg bg-surface2 text-ink border border-line"
              aria-label="Menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    mobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-surface border-b border-line px-6 py-5">
          <nav className="flex flex-col gap-3 text-sm font-bold text-ink">
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-brand-red"
              >
                {l.label}
              </Link>
            ))}

            <div className="pt-3 mt-1 border-t border-line flex flex-col gap-2.5">
              <Link
                href="/connexion"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-surface2 text-ink border border-line font-black text-xs uppercase tracking-wider"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                {t.studentLogin}
              </Link>

              <Link
                href="/#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2.5 rounded-lg bg-ink text-surface font-black text-xs uppercase tracking-wider"
              >
                {t.consultation}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
