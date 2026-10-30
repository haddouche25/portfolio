"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const CONTENT = {
  FR: {
    badge: "Cadre Juridique & Propriété",
    title: "Conditions Générales d'Utilisation",
    lastUpdated: "Dernière mise à jour : Octobre 2026",
    intro:
      "L'accès et l'utilisation de cette plateforme éducative et technique impliquent l'acceptation sans réserve des présentes conditions d'utilisation.",
    sections: [
      {
        title: "1. Éditeur de la Plateforme",
        desc: "Cette plateforme est conçue, développée et maintenue par Mohamed Haddouche, enseignant titulaire de mathématiques au Maroc et ingénieur logiciel.",
      },
      {
        title: "2. Propriété Intellectuelle & Didactique",
        desc: "L'ensemble des contenus présents sur ce site (synthèses de cours, corrigés détaillés, banques de QCM en LaTeX/KaTeX, architecture logicielle et éléments visuels) est protégé par le droit d'auteur. Toute reproduction intégrale ou partielle sans autorisation expresse préalable est strictement interdite.",
      },
      {
        title: "3. Utilisation du Moteur d'Évaluation (QCM)",
        desc: "Les épreuves diagnostiques sont mises à disposition des élèves (notamment 2BAC SM et 3AC) pour un entraînement strictement individuel et personnel. Toute tentative d'extraction automatisée (scraping), d'injection ou de perturbation du service entraînera le blocage immédiat de l'accès.",
      },
      {
        title: "4. Disponibilité du Service",
        desc: "L'éditeur s'efforce de maintenir un accès continu 24h/24, mais ne saurait être tenu responsable des interruptions momentanées liées à la maintenance du serveur ou aux aléas des réseaux de télécommunication.",
      },
    ],
    backBtn: "← Retour à l'accueil",
  },
  EN: {
    badge: "Legal Framework & Terms",
    title: "Terms of Service",
    lastUpdated: "Last updated: October 2026",
    intro:
      "By accessing or using this educational and engineering platform, you agree to be bound by the following terms and conditions.",
    sections: [
      {
        title: "1. Platform Ownership",
        desc: "This platform is built, authored, and maintained by Mohamed Haddouche, certified mathematics teacher in Morocco and software engineer.",
      },
      {
        title: "2. Intellectual Property",
        desc: "All materials published on this website—including lesson syntheses, detailed LaTeX/KaTeX answer explanations, assessment databases, and source code—are protected by copyright. Reproduction or distribution without explicit prior authorization is prohibited.",
      },
      {
        title: "3. Use of the MCQ Assessment Engine",
        desc: "Diagnostic tests are provided for individual, non-commercial student practice. Automated scraping, reverse engineering, or intentional disruption of the grading engine will result in immediate termination of access.",
      },
      {
        title: "4. Service Availability",
        desc: "While we aim to maintain 99.9% availability on our VPS infrastructure, the publisher cannot be held liable for temporary downtime caused by server upgrades or broader network connectivity disruptions.",
      },
    ],
    backBtn: "← Back to Home",
  },
};

export default function TermsPage() {
  const { lang } = useLanguage();
  const c = CONTENT[lang] || CONTENT.FR;

  return (
    <div className="min-h-screen bg-background text-ink font-sans antialiased py-16 px-4 sm:px-6">
      <main className="max-w-4xl mx-auto space-y-10">
        <Link
          href="/"
          className="text-xs font-bold text-muted hover:text-brand-red transition inline-flex items-center gap-1"
        >
          {c.backBtn}
        </Link>

        <header className="space-y-3 border-b border-line pb-8">
          <span className="np-eyebrow">{c.badge}</span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
            {c.title}
          </h1>
          <p className="text-xs font-mono text-muted">{c.lastUpdated}</p>
          <p className="text-sm text-muted leading-relaxed pt-2">{c.intro}</p>
        </header>

        <div className="space-y-8 text-sm leading-relaxed">
          {c.sections.map((s) => (
            <section key={s.title} className="space-y-3">
              <h2 className="text-lg font-black text-ink">{s.title}</h2>
              <p className="text-muted leading-relaxed">{s.desc}</p>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
