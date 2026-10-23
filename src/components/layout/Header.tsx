"use client";

import React, { useState } from "react";
import Link from "next/link";

interface HeaderProps {
  lang: "FR" | "EN";
  onLanguageChange: (lang: "FR" | "EN") => void;
}

export default function Header({ lang, onLanguageChange }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const labels = {
    FR: {
      availability: "Disponible pour coaching didactique & projets tech",
      resume: "Curriculum Vitae",
      consultation: "Prendre RDV",
      nav: {
        mathCoaching: "Math Coaching",
        qcm: "QCM",
        computing: "Computing Sciences",
        projects: "Projects",
        certs: "Certs",
        cv: "CV & Parcours",
        blog: "Blog",
        vlog: "Vlog",
        contact: "Contact",
      },
    },
    EN: {
      availability: "Available for didactic coaching & software consulting",
      resume: "Get Resume",
      consultation: "Book Call",
      nav: {
        mathCoaching: "Math Coaching",
        qcm: "MCQ Engine",
        computing: "Computing Sciences",
        projects: "Projects",
        certs: "Certifications",
        cv: "CV & Background",
        blog: "Blog",
        vlog: "Vlog",
        contact: "Contact",
      },
    },
  }[lang];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-900 transition-all">
      {/* ========================================================= */}
      {/* NIVEAU 1 : BARRE SUPÉRIEURE (Utilitaires & Langue)         */}
      {/* ========================================================= */}
      <div className="border-b border-slate-900/80 bg-slate-950/60 text-[11px] font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-10 flex items-center justify-between">
          {/* Disponibilité & Localisation */}
          <div className="flex items-center gap-2 text-slate-400 truncate">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="truncate">{labels.availability}</span>
          </div>

          {/* Outils : Réseaux sociaux, CV & Switch FR/EN */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Réseaux directs */}
            <div className="hidden sm:flex items-center gap-2 pr-3 border-r border-slate-800 text-slate-400">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-amber-400 transition"
              >
                LinkedIn
              </a>
              <span>•</span>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-amber-400 transition"
              >
                GitHub
              </a>
              <span>•</span>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-rose-500 transition"
              >
                YouTube
              </a>
            </div>

            {/* Téléchargement CV */}
            <a
              href="/cv-mohamed-haddouche.pdf"
              download
              className="hidden md:inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition pr-2"
            >
              <svg
                className="w-3 h-3 text-amber-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              <span>{labels.resume}</span>
            </a>

            {/* Switch bilingue FR / EN */}
            <div className="inline-flex items-center rounded-lg bg-slate-900 border border-slate-800 p-0.5 shadow-inner">
              <button
                type="button"
                onClick={() => onLanguageChange("FR")}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                  lang === "FR"
                    ? "bg-amber-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                FR
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange("EN")}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                  lang === "EN"
                    ? "bg-amber-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* NIVEAU 2 : BARRE PRINCIPALE (Brand, Navigation & CTA)      */}
      {/* ========================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        {/* Identité / Monogramme */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-600 to-amber-700 text-white font-mono font-bold text-lg shadow-md shadow-amber-950 group-hover:scale-105 transition-transform">
            &Sigma;
          </span>
          <div className="flex flex-col">
            <span className="font-extrabold tracking-tight text-white text-base">
              Mohamed Haddouche
            </span>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
              Math Coach • Software Engineer
            </span>
          </div>
        </Link>

        {/* Liens de navigation (Desktop) */}
        <nav className="hidden xl:flex items-center gap-5 text-[11px] uppercase tracking-wider font-semibold text-slate-300">
          <Link
            href="#expertises"
            className="hover:text-amber-400 transition-colors"
          >
            {labels.nav.mathCoaching}
          </Link>
          <Link href="/qcm" className="hover:text-amber-400 transition-colors">
            {labels.nav.qcm}
          </Link>
          <Link
            href="#expertises"
            className="hover:text-amber-400 transition-colors"
          >
            {labels.nav.computing}
          </Link>
          <Link
            href="#projects"
            className="hover:text-amber-400 transition-colors"
          >
            {labels.nav.projects}
          </Link>
          <Link
            href="#certs"
            className="hover:text-amber-400 transition-colors"
          >
            {labels.nav.certs}
          </Link>
          <Link
            href="#parcours"
            className="hover:text-amber-400 transition-colors"
          >
            {labels.nav.cv}
          </Link>
          <Link
            href="/articles"
            className="hover:text-amber-400 transition-colors"
          >
            {labels.nav.blog}
          </Link>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-amber-400 transition-colors"
          >
            {labels.nav.vlog}
          </a>
          <Link
            href="#contact"
            className="hover:text-amber-400 transition-colors"
          >
            {labels.nav.contact}
          </Link>
        </nav>

        {/* Action Principale & Burger Mobile */}
        <div className="flex items-center gap-3">
          <Link
            href="#contact"
            className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-amber-600 hover:bg-amber-500 text-white transition shadow-lg shadow-amber-950/60"
          >
            {labels.consultation}
          </Link>

          {/* Bouton Hamburger pour écrans moyens et mobiles */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MENU DÉROULANT RESPONSIVE (Tablettes & Mobiles)            */}
      {/* ========================================================= */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-900 bg-slate-950 px-6 py-6 space-y-4">
          <nav className="flex flex-col gap-3 text-xs uppercase tracking-wider font-semibold text-slate-300">
            <Link
              href="#expertises"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-400"
            >
              {labels.nav.mathCoaching}
            </Link>
            <Link
              href="/qcm"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-400"
            >
              {labels.nav.qcm}
            </Link>
            <Link
              href="#expertises"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-400"
            >
              {labels.nav.computing}
            </Link>
            <Link
              href="#projects"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-400"
            >
              {labels.nav.projects}
            </Link>
            <Link
              href="#certs"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-400"
            >
              {labels.nav.certs}
            </Link>
            <Link
              href="#parcours"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-400"
            >
              {labels.nav.cv}
            </Link>
            <Link
              href="/articles"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-400"
            >
              {labels.nav.blog}
            </Link>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="py-1 hover:text-amber-400"
            >
              {labels.nav.vlog}
            </a>
            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-400"
            >
              {labels.nav.contact}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
