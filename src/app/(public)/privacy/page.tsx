"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const CONTENT = {
  FR: {
    badge: "Mentions Légales & RGPD / CNDP",
    title: "Politique de Confidentialité",
    lastUpdated: "Dernière mise à jour : Octobre 2026",
    intro:
      "La présente politique détaille notre engagement concernant la protection des données personnelles recueillies sur la plateforme didactique de Mohamed Haddouche, en conformité avec la loi marocaine n° 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel.",
    sections: [
      {
        title: "1. Données collectées",
        desc: "Nous limitons la collecte aux informations strictement indispensables au bon déroulement pédagogique :",
        points: [
          "Identité et contact : Nom, prénom et adresse email lors de l'accès aux épreuves ou via le formulaire de contact.",
          "Données d'évaluation (QCM) : Réponses sélectionnées, temps de réponse, score obtenu et progression par chapitre.",
          "Données techniques : Préférences d'interface (thème clair/sombre, langue choisie) enregistrées localement.",
        ],
      },
      {
        title: "2. Finalités du traitement",
        desc: "Les données recueillies sont exploitées exclusivement pour :",
        points: [
          "Permettre la reprise fluide d'une session d'examen interrompue.",
          "Calculer et délivrer les bilans didactiques personnalisés.",
          "Répondre aux sollicitations de mentorat, cours particuliers et projets d'ingénierie.",
          "Garantir la sécurité et l'intégrité de l'infrastructure web.",
        ],
      },
      {
        title: "3. Conservation et non-divulgation",
        desc: "Vos données ne sont ni vendues, ni louées, ni transmises à des régies publicitaires tierces. Elles sont hébergées sur une infrastructure privée sécurisée et ne sont accessibles qu'à l'administrateur pédagogique.",
      },
      {
        title: "4. Vos droits (Accès, Rectification, Suppression)",
        desc: "Conformément à la loi 09-08, vous disposez d'un droit permanent d'accès, de rectification et de suppression totale de vos résultats ou informations personnelles. Pour exercer ce droit, écrivez simplement par email ou WhatsApp.",
      },
    ],
    backBtn: "← Retour à l'accueil",
  },
  EN: {
    badge: "Legal Compliance & Privacy",
    title: "Privacy Policy",
    lastUpdated: "Last updated: October 2026",
    intro:
      "This privacy policy outlines our commitment to protecting personal data collected on Mohamed Haddouche's pedagogical platform, in compliance with Moroccan Law No. 09-08 on the protection of individuals with regard to the processing of personal data.",
    sections: [
      {
        title: "1. Data Collected",
        desc: "We collect only the minimum data required to deliver educational services:",
        points: [
          "Identity & Contact: Full name and email address when starting an evaluation or sending an inquiry.",
          "Assessment Records (MCQ): Selected answers, completion timestamps, scores, and chapter diagnostics.",
          "Technical Preferences: UI configuration (dark/light theme, language selection) stored locally on your device.",
        ],
      },
      {
        title: "2. Purpose of Processing",
        desc: "The collected information is solely used to:",
        points: [
          "Enable seamless resumption of paused exam sessions.",
          "Calculate and display individualized diagnostic reports.",
          "Respond to coaching requests, tutoring inquiries, and engineering consultations.",
          "Maintain the security and uptime of our VPS infrastructure.",
        ],
      },
      {
        title: "3. Retention & Third-Party Sharing",
        desc: "Your data is never sold, rented, or transferred to advertising networks. Data is hosted securely on a private server and is only accessible by the administrator.",
      },
      {
        title: "4. Your Rights (Access, Correction, Erasure)",
        desc: "Under applicable data protection laws, you retain the right to access, update, or completely delete your assessment history and personal records at any time via email or WhatsApp.",
      },
    ],
    backBtn: "← Back to Home",
  },
};

export default function PrivacyPage() {
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
              <p className="text-muted">{s.desc}</p>
              {s.points && (
                <ul className="list-disc list-inside space-y-1.5 pl-2 text-muted">
                  {s.points.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
