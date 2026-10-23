"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import MathText from "@/components/qcm/MathText";
import Header from "@/components/layout/Header";
// Dictionnaire bilingue FR / EN
const content = {
  FR: {
    nav: {
      mathCoaching: "Math Coaching",
      qcm: "QCM",
      computing: "Computing Sciences",
      projects: "Projects",
      certs: "Certs",
      cv: "CV",
      blog: "Blog",
      vlog: "Vlog",
      contact: "Contact",
      consultation: "Consultation",
      resumeBtn: "Curriculum Vitae",
    },
    hero: {
      tag: "Accompagnement & Didactique de Haut Niveau",
      titleStart: "L'art de la rigueur",
      titleMath: "mathématique",
      titleMid: ", la force du",
      titleCode: "code",
      desc: "J'accompagne les élèves et lycéens vers l'autonomie et l'excellence logique, tout en développant des architectures logicielles modernes et des solutions appliquées en science des données.",
      ctaPrimary: "Évaluation Diagnostique (QCM) →",
      ctaSecondary: "Réserver un Coaching Didactique",
      badgeTitle: "Didacticien & Consultant Tech",
      stat1Val: "08+ Années",
      stat1Label: "Pratique Didactique en Établissement",
      stat1Desc:
        "Spécialisation 1ère et 2ème année Bac Sciences Mathématiques & CPGE.",
      stat2Val: "100%",
      stat2Label: "Raisonnement & Méthodologie Formelle",
      stat2Desc:
        "Remplacement du bachotage par la démonstration et la déduction pure.",
      stat3Val: "Full-Stack",
      stat3Label: "Architecte Logiciel & Intégration IA",
      stat3Desc:
        "Conception d'outils éducatifs à forte valeur technologique (Next.js, SQL).",
    },
    pillars: {
      tag: "Champs d'Intervention",
      title: "Trois Piliers d'Expertise",
      subtitle:
        "De l'abstraction formelle à l'implémentation système concrète.",
      p1Tag: "01 / LOGIQUE & ABSTRACTION",
      p1Title: "Coaching Mathématique & Didactique",
      p1Desc:
        "Accompagnement individuel et méthodique pour lycéens exigeants (1Bac SM, 2Bac SM). Dépassement du calcul machinal : maîtrise des quantificateurs, démonstrations par récurrence, absurde et analyse fine.",
      p1Footer: "Logique formelle • Ensembles • Analyse",
      p2Tag: "02 / ARCHITECTURE & CODE",
      p2Title: "Ingénierie Web & EdTech",
      p2Desc:
        "Conception d'applications web interactives et plateformes d'apprentissage réactives. Spécialiste Next.js, React, MariaDB, Docker et interfaces didactiques avec rendu KaTeX en temps réel.",
      p2Footer: "Next.js • Prisma • MariaDB",
      p3Tag: "03 / INTELLIGENCE & SYSTÈMES",
      p3Title: "Computing & Science des Données",
      p3Desc:
        "Algorithmique avancée, structures de données, optimisation relationnelle et déploiement de modèles de langage (LLM) locaux pour la remédiation et la génération d'exercices didactiques sur mesure.",
      p3Footer: "Data Science • Local LLMs • Algorithmique",
    },
    diagnostic: {
      tag: "Outil Didactique en Libre Accès",
      title: "Évaluez vos fondations en Mathématiques",
      desc: "Ce test diagnostique cible précisément les pièges logiques récurrents (contraposée, implication, quantificateurs, ensembles) et offre une analyse immédiate de vos réponses.",
      levelLabel: "Niveau académique",
      emailLabel: "Adresse Email (Sauvegarde automatique de la progression)",
      btnStart: "Lancer le Test Diagnostique →",
      sampleBadge: "Extrait Didactique",
      sampleTopic: "Raisonnement Formel",
      sampleQuestion:
        "Soit $A$ et $B$ deux sous-ensembles d'un univers $E$. Quelle proposition caractérise exactement l'inclusion $A \\subset B$ ?",
    },
    certs: {
      tag: "Accréditations & Titres",
      title: "Certifications & Badges Professionnels",
      subtitle:
        "Validation officielle des acquis en sciences, programmation et pédagogie.",
      c1Org: "Cisco Networking Academy",
      c1Title: "Python Essentials 1 & Programming",
      c1Desc:
        "Structures algorithmiques, POO, modularité et programmation logicielle certifiée.",
      c2Org: "Ministère de l'Éducation Nationale / CRMEF",
      c2Title: "Certificat d'Aptitude Pédagogique (CRMEF)",
      c2Desc:
        "Formation professionnelle à la didactique des mathématiques et à l'ingénierie d'évaluation.",
      c3Org: "Université des Sciences",
      c3Title: "Licence en Mathématiques & Informatique",
      c3Desc:
        "Analyse générale, algèbre fondamentale, structures de données et modélisation formelle.",
      c4Org: "AI & Data Science Track",
      c4Title: "Applied Machine Learning & Local LLMs",
      c4Desc:
        "Intégration d'architectures d'inférence locale pour l'analyse didactique de données.",
    },
    testimonials: {
      tag: "Validation par les Résultats",
      title: "Retours d'Accompagnement",
      tabEdu: "Élèves & Parents",
      tabTech: "Partenaires & Tech",
      edu1Quote:
        "Grâce à sa méthode clinique axée sur la logique et la compréhension des axiomes, mon fils en 1ère Bac Sciences Maths a consolidé ses résultats au-dessus de 16/20 en éliminant toute hésitation dans ses démonstrations.",
      edu1Author: "Mme Alami — Parent d'élève (1Bac SM)",
      edu2Quote:
        "Les évaluations diagnostiques interactives et les bilans m'ont appris à structurer mes rédactions rigoureusement pour les concours et les devoirs surveillés.",
      edu2Author: "Yassine B. — Candidat Baccalauréat",
      tech1Quote:
        "Une alliance rare entre rigueur mathématique et architecture Next.js/MariaDB. Les systèmes développés allient robustesse de données et haute vitesse d'exécution.",
      tech1Author: "Lead Developer — Projets Partenaires",
      tech2Quote:
        "Mohamed apporte un regard méthodologique pointu sur les algorithmes d'analyse et les outils pédagogiques automatisés.",
      tech2Author: "Directeur Produit EdTech",
    },
    contact: {
      title: "Initier une prise de contact",
      subtitle:
        "Pour un diagnostic mathématique personnalisé ou une collaboration en ingénierie logicielle.",
      nameLabel: "Nom & Prénom",
      emailLabel: "Adresse Email",
      natureLabel: "Nature de la demande",
      opt1: "Coaching Didactique & Suivi Mathématiques (Lycée)",
      opt2: "Projet de Développement Logiciel (Web / EdTech)",
      opt3: "Consulting Systèmes de Données & IA",
      opt4: "Autre demande",
      detailsLabel: "Précisions",
      btnSend: "Envoyer la demande →",
      postureTitle: "Posture Professionnelle",
      postureDesc:
        "Une démarche fondée sur l'exigence intellectuelle, le respect des objectifs scolaires et la transparence des progrès.",
      loc: "📍 Maroc • En présentiel et à distance",
      status: "💼 Enseignant Titulaire & Ingénieur Logiciel",
      networks: "Réseaux & Plateformes",
      copy: "Mohamed Haddouche • Didactique Mathématique & Solutions Logicielles.",
    },
  },
  EN: {
    nav: {
      mathCoaching: "Math Coaching",
      qcm: "MCQ",
      computing: "Computing Sciences",
      projects: "Projects",
      certs: "Certs",
      cv: "CV",
      blog: "Blog",
      vlog: "Vlog",
      contact: "Contact",
      consultation: "Consultation",
      resumeBtn: "Get Resume",
    },
    hero: {
      tag: "Advanced Coaching & Didactics",
      titleStart: "The craft of",
      titleMath: "mathematical",
      titleMid: "rigor, the power of",
      titleCode: "code",
      desc: "Empowering secondary and high school students toward genuine logical inquiry and academic autonomy, while architecting modern web platforms and applied data solutions.",
      ctaPrimary: "Diagnostic Assessment (MCQ) →",
      ctaSecondary: "Book a Didactic Consultation",
      badgeTitle: "Math Didactician & Tech Consultant",
      stat1Val: "08+ Years",
      stat1Label: "Classroom Didactic Practice",
      stat1Desc:
        "Specialized in advanced secondary programs (Sciences Maths & Prep Tracks).",
      stat2Val: "100%",
      stat2Label: "Formal Reasoning & Rigor",
      stat2Desc:
        "Replacing rote memorization with conceptual inquiry and deduction.",
      stat3Val: "Full-Stack",
      stat3Label: "Software Architect & AI Integrator",
      stat3Desc:
        "Designing robust educational engines (Next.js, Prisma, MariaDB, KaTeX).",
    },
    pillars: {
      tag: "Fields of Intervention",
      title: "Three Core Pillars",
      subtitle: "Bridging formal abstraction with modern software engineering.",
      p1Tag: "01 / LOGIC & ABSTRACTION",
      p1Title: "Mathematical Coaching & Didactics",
      p1Desc:
        "One-on-one structured mentoring for ambitious students. Moving past repetitive calculation into proof writing, quantifiers, mathematical induction, and deductive clarity.",
      p1Footer: "Formal Logic • Set Theory • Analysis",
      p2Tag: "02 / ARCHITECTURE & CODE",
      p2Title: "Web Engineering & EdTech",
      p2Desc:
        "Crafting highly resilient web engines and reactive test runners using Next.js App Router, TypeScript, MariaDB and real-time KaTeX rendering.",
      p2Footer: "Next.js • Prisma • MariaDB",
      p3Tag: "03 / INTELLIGENCE & SYSTEMS",
      p3Title: "Computing & Data Sciences",
      p3Desc:
        "Algorithmic thinking, relational schema optimization, and on-premise LLM inference deployment to generate personalized remediation challenges.",
      p3Footer: "Data Science • Local LLMs • Algorithms",
    },
    diagnostic: {
      tag: "Open-Access Diagnostic Engine",
      title: "Evaluate Your Foundations in Mathematics",
      desc: "This diagnostic evaluation identifies deep conceptual hurdles (contrapositives, logical conditionals, quantifiers, set relations) with step-by-step reasoning.",
      levelLabel: "Academic Level",
      emailLabel: "Email Address (For progress persistence and review)",
      btnStart: "Start Diagnostic Test →",
      sampleBadge: "Didactic Sample",
      sampleTopic: "Formal Reasoning",
      sampleQuestion:
        "Let $A$ and $B$ be subsets of an ambient set $E$. Which proposition characterizes the subset relation $A \\subset B$ ?",
    },
    certs: {
      tag: "Accreditations & Badges",
      title: "Professional Certifications & Badges",
      subtitle:
        "Official credentials across mathematics, pedagogy, and software development.",
      c1Org: "Cisco Networking Academy",
      c1Title: "Python Essentials 1 & Programming",
      c1Desc:
        "Algorithm design, OOP principles, data structures, and certified software implementation.",
      c2Org: "Ministry of National Education / CRMEF",
      c2Title: "Pedagogical Qualification Certificate (CRMEF)",
      c2Desc:
        "Formal credential in secondary mathematics didactics, curriculum design, and assessment.",
      c3Org: "Faculty of Sciences",
      c3Title: "Bachelor's Degree in Maths & Computer Science",
      c3Desc:
        "Foundations in real analysis, abstract algebra, discrete algorithms, and formal logic.",
      c4Org: "AI & Data Science Track",
      c4Title: "Applied Machine Learning & Local LLMs",
      c4Desc:
        "Integration of on-device neural language models for automated didactic analytics.",
    },
    testimonials: {
      tag: "Proof Through Results",
      title: "Student & Client Feedback",
      tabEdu: "Students & Parents",
      tabTech: "Partners & Tech",
      edu1Quote:
        "Unlike conventional classes that demand rote learning, Mohamed helped my son structure genuine mathematical proofs. His scores consistently reached 16+/20.",
      edu1Author: "Mrs. Alami — Parent (Sciences Maths Track)",
      edu2Quote:
        "The interactive tests and detailed explanations showed me exactly where my deductions were failing. Invaluable preparation for high school exams.",
      edu2Author: "Yassine B. — High School Candidate",
      tech1Quote:
        "An uncommon blend of mathematical rigor and modern Next.js/MariaDB architecture. The resulting QCM engine is clean, fast, and remarkably robust.",
      tech1Author: "Lead Developer — Software Partner",
      tech2Quote:
        "Mohamed brings an analytical and precise mindset to algorithmic challenges and educational tools.",
      tech2Author: "EdTech Product Director",
    },
    contact: {
      title: "Start a Conversation",
      subtitle:
        "Inquire about diagnostic math coaching or discuss a specialized software/AI project.",
      nameLabel: "Full Name",
      emailLabel: "Email Address",
      natureLabel: "Inquiry Type",
      opt1: "Math Coaching & Didactic Mentoring (High School)",
      opt2: "Software Engineering & EdTech Web Projects",
      opt3: "Data Systems & AI Consultation",
      opt4: "Other Inquiries",
      detailsLabel: "Details",
      btnSend: "Send Inquiry →",
      postureTitle: "Professional Ethos",
      postureDesc:
        "Grounded in intellectual rigor, clear educational benchmarks, and verifiable academic outcomes.",
      loc: "📍 Morocco • In-person and online nationwide",
      status: "💼 Certified Mathematics Teacher & Software Engineer",
      networks: "Networks & Profiles",
      copy: "Mohamed Haddouche • Mathematical Didactics & Software Solutions.",
    },
  },
};

export default function ProfessionalLandingPage() {
  const [lang, setLang] = useState<"FR" | "EN">("FR");
  const [activeTab, setActiveTab] = useState<"education" | "tech">("education");
  const [qcmEmail, setQcmEmail] = useState("");
  const [qcmLevel, setQcmLevel] = useState("BAC1_SM");

  const t = content[lang];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-amber-600 selection:text-white antialiased">
      {/* ========================================================= */}
      {/* 1. HEADER (Menu complet, Switch Langue & Réseaux)        */}
      {/* ========================================================= */}
      {/* En-tête à deux niveaux importé */}
      <Header lang={lang} onLanguageChange={setLang} />

      {/* ========================================================= */}
      {/* 2. HERO SECTION : Composition 3 Colonnes Épurée           */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-20 lg:pt-16 lg:pb-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Colonne 1 : Titre & Propositions */}
          <div className="lg:col-span-4 space-y-6 text-center lg:text-left">
            <span className="inline-block text-xs font-mono uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
              {t.hero.tag}
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-black text-white tracking-tight leading-[1.12]">
              {t.hero.titleStart}{" "}
              <span className="text-amber-400">{t.hero.titleMath}</span>
              {t.hero.titleMid}{" "}
              <span className="text-blue-400">{t.hero.titleCode}</span>.
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed max-w-md mx-auto lg:mx-0">
              {t.hero.desc}
            </p>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 pt-2">
              <Link
                href="#diagnostic"
                className="inline-flex justify-center items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold uppercase tracking-wider transition shadow-lg shadow-amber-950"
              >
                <span>{t.hero.ctaPrimary}</span>
              </Link>
              <Link
                href="#contact"
                className="inline-flex justify-center items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-200 text-xs font-bold uppercase tracking-wider transition"
              >
                <span>{t.hero.ctaSecondary}</span>
              </Link>
            </div>
          </div>

          {/* Colonne 2 : Portrait Central Épuré */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center relative">
            <div className="relative w-72 h-88 sm:w-80 sm:h-96 rounded-t-full rounded-b-[40px] bg-gradient-to-b from-amber-600/30 via-slate-900 to-slate-900 p-1 border border-slate-850 shadow-2xl overflow-hidden flex items-end justify-center">
              <div className="relative w-full h-[95%]">
                <Image
                  src="/profile.jpg"
                  alt="Mohamed Haddouche"
                  fill
                  priority
                  className="object-cover object-top filter grayscale contrast-115 hover:grayscale-0 transition-all duration-300"
                  sizes="(max-width: 768px) 300px, 350px"
                />
              </div>
            </div>

            <div className="mt-4 px-6 py-2 rounded-full bg-slate-900 border border-slate-800 shadow-xl text-center">
              <span className="text-xs font-bold tracking-wide uppercase text-slate-100">
                {t.hero.badgeTitle}
              </span>
            </div>
          </div>

          {/* Colonne 3 : Indicateurs & Preuves */}
          <div className="lg:col-span-4 flex flex-col gap-6 lg:pl-6 text-center lg:text-left">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-850 space-y-1">
              <div className="text-3xl font-mono font-bold text-amber-400">
                {t.hero.stat1Val}
              </div>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                {t.hero.stat1Label}
              </div>
              <p className="text-xs text-slate-400 pt-1 leading-relaxed">
                {t.hero.stat1Desc}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-850 space-y-1">
              <div className="text-3xl font-mono font-bold text-white">
                {t.hero.stat2Val}
              </div>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                {t.hero.stat2Label}
              </div>
              <p className="text-xs text-slate-400 pt-1 leading-relaxed">
                {t.hero.stat2Desc}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-850 space-y-1">
              <div className="text-3xl font-mono font-bold text-blue-400">
                {t.hero.stat3Val}
              </div>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                {t.hero.stat3Label}
              </div>
              <p className="text-xs text-slate-400 pt-1 leading-relaxed">
                {t.hero.stat3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. LES 3 PILIERS D'EXPERTISE                             */}
      {/* ========================================================= */}
      <section
        id="expertises"
        className="max-w-7xl mx-auto px-6 py-16 w-full border-t border-slate-900"
      >
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-12 gap-4">
          <div>
            <span className="text-xs font-mono uppercase text-amber-400 tracking-widest font-semibold">
              {t.pillars.tag}
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-1 tracking-tight">
              {t.pillars.title}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md">
            {t.pillars.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-850 hover:border-amber-500/40 transition flex flex-col justify-between">
            <div className="space-y-3">
              <div className="text-xs font-mono text-amber-400 tracking-wider">
                {t.pillars.p1Tag}
              </div>
              <h3 className="text-lg font-bold text-white">
                {t.pillars.p1Title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t.pillars.p1Desc}
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-800 text-xs font-semibold text-slate-300">
              {t.pillars.p1Footer}
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-850 hover:border-blue-500/40 transition flex flex-col justify-between">
            <div className="space-y-3">
              <div className="text-xs font-mono text-blue-400 tracking-wider">
                {t.pillars.p2Tag}
              </div>
              <h3 className="text-lg font-bold text-white">
                {t.pillars.p2Title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t.pillars.p2Desc}
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-800 text-xs font-semibold text-slate-300">
              {t.pillars.p2Footer}
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-850 hover:border-purple-500/40 transition flex flex-col justify-between">
            <div className="space-y-3">
              <div className="text-xs font-mono text-purple-400 tracking-wider">
                {t.pillars.p3Tag}
              </div>
              <h3 className="text-lg font-bold text-white">
                {t.pillars.p3Title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t.pillars.p3Desc}
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-800 text-xs font-semibold text-slate-300">
              {t.pillars.p3Footer}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. LE LEAD MAGNET : DIAGNOSTIC QCM                       */}
      {/* ========================================================= */}
      <section id="diagnostic" className="max-w-7xl mx-auto px-6 py-16 w-full">
        <div className="rounded-3xl bg-slate-900/70 border border-slate-800 p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-mono uppercase text-amber-400 tracking-wider">
                {t.diagnostic.tag}
              </span>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                {t.diagnostic.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {t.diagnostic.desc}
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (qcmEmail.trim()) {
                    window.location.href = `/qcm?level=${qcmLevel}`;
                  }
                }}
                className="space-y-3 pt-2"
              >
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                    {t.diagnostic.levelLabel}
                  </label>
                  <select
                    value={qcmLevel}
                    onChange={(e) => setQcmLevel(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                  >
                    <option value="BAC1_SM">
                      1ère Bac Sciences Mathématiques
                    </option>
                    <option value="BAC1_S">
                      1ère Bac Sciences Expérimentales
                    </option>
                    <option value="TRONC_COMMUN">
                      Tronc Commun Scientifique
                    </option>
                    <option value="COLLEGE_3AC">
                      3ème Année Collégiale (3AC)
                    </option>
                    <option value="BAC2_SM">
                      2ème Bac Sciences Mathématiques
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                    {t.diagnostic.emailLabel}
                  </label>
                  <input
                    required
                    type="email"
                    value={qcmEmail}
                    onChange={(e) => setQcmEmail(e.target.value)}
                    placeholder="contact.etudiant@domaine.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500 placeholder:text-slate-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-md shadow-amber-950"
                >
                  {t.diagnostic.btnStart}
                </button>
              </form>
            </div>

            {/* Extrait Démonstrateur KaTeX */}
            <div className="lg:col-span-6 bg-slate-950 border border-slate-850 rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-center text-xs text-slate-500 font-mono pb-3 border-b border-slate-900">
                <span>{t.diagnostic.sampleBadge}</span>
                <span className="text-amber-400">
                  {t.diagnostic.sampleTopic}
                </span>
              </div>

              <div className="text-sm font-semibold text-white leading-relaxed">
                <MathText content={t.diagnostic.sampleQuestion} />
              </div>

              <div className="space-y-2 pt-2">
                <div className="p-3 rounded-xl border border-slate-800 bg-slate-900/40 text-xs text-slate-400 flex items-center gap-3">
                  <span className="w-3.5 h-3.5 rounded-full border border-slate-700" />
                  <MathText content="$\forall x \in E, \; x \in B \implies x \in A$" />
                </div>
                <div className="p-3 rounded-xl border border-emerald-500/40 bg-emerald-950/20 text-xs text-emerald-300 font-medium flex items-center gap-3">
                  <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-[9px] font-bold">
                    ✓
                  </span>
                  <MathText content="$\forall x \in E, \; x \in A \implies x \in B$" />
                </div>
                <div className="p-3 rounded-xl border border-slate-800 bg-slate-900/40 text-xs text-slate-400 flex items-center gap-3">
                  <span className="w-3.5 h-3.5 rounded-full border border-slate-700" />
                  <MathText content="$A \cap B = \emptyset$" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. SECTION CERTIFICATS & BADGES (Cisco, CRMEF...)         */}
      {/* ========================================================= */}
      <section
        id="certs"
        className="max-w-7xl mx-auto px-6 py-16 w-full border-t border-slate-900"
      >
        <div className="text-center mb-12">
          <span className="text-xs font-mono uppercase text-amber-400 tracking-widest font-semibold">
            {t.certs.tag}
          </span>
          <h2 className="text-3xl font-extrabold text-white mt-1">
            {t.certs.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl mx-auto">
            {t.certs.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Badge 1 : Cisco */}
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-850 hover:border-blue-500/40 transition flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-mono font-bold text-sm">
                PY
              </div>
              <span className="text-[10px] font-mono uppercase text-blue-400 font-bold block">
                {t.certs.c1Org}
              </span>
              <h3 className="text-sm font-bold text-white leading-snug">
                {t.certs.c1Title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t.certs.c1Desc}
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-500">
              Verified Credential
            </div>
          </div>

          {/* Badge 2 : CRMEF */}
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-850 hover:border-amber-500/40 transition flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-mono font-bold text-sm">
                &Sigma;
              </div>
              <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">
                {t.certs.c2Org}
              </span>
              <h3 className="text-sm font-bold text-white leading-snug">
                {t.certs.c2Title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t.certs.c2Desc}
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-500">
              National Certificate
            </div>
          </div>

          {/* Badge 3 : Licence Maths-Info */}
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-850 hover:border-emerald-500/40 transition flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-sm">
                BS
              </div>
              <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">
                {t.certs.c3Org}
              </span>
              <h3 className="text-sm font-bold text-white leading-snug">
                {t.certs.c3Title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t.certs.c3Desc}
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-500">
              Academic Degree
            </div>
          </div>

          {/* Badge 4 : IA & Data */}
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-850 hover:border-purple-500/40 transition flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center font-mono font-bold text-sm">
                AI
              </div>
              <span className="text-[10px] font-mono uppercase text-purple-400 font-bold block">
                {t.certs.c4Org}
              </span>
              <h3 className="text-sm font-bold text-white leading-snug">
                {t.certs.c4Title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t.certs.c4Desc}
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-500">
              Applied Specialization
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. TÉMOIGNAGES & RETOURS                                  */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-6 py-16 w-full border-t border-slate-900">
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-8 gap-4">
          <div>
            <span className="text-xs font-mono uppercase text-amber-400 tracking-widest font-semibold">
              {t.testimonials.tag}
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-1">
              {t.testimonials.title}
            </h2>
          </div>

          <div className="inline-flex rounded-xl bg-slate-900 border border-slate-800 p-1">
            <button
              onClick={() => setActiveTab("education")}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === "education"
                  ? "bg-amber-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {t.testimonials.tabEdu}
            </button>
            <button
              onClick={() => setActiveTab("tech")}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === "tech"
                  ? "bg-amber-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {t.testimonials.tabTech}
            </button>
          </div>
        </div>

        {activeTab === "education" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-850">
              <div className="text-amber-400 text-xs mb-3 font-mono">
                ★★★★★ • 1Bac SM Track
              </div>
              <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                &ldquo;{t.testimonials.edu1Quote}&rdquo;
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800 text-xs font-bold text-white">
                {t.testimonials.edu1Author}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-850">
              <div className="text-amber-400 text-xs mb-3 font-mono">
                ★★★★★ • Exam Diagnostic
              </div>
              <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                &ldquo;{t.testimonials.edu2Quote}&rdquo;
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800 text-xs font-bold text-white">
                {t.testimonials.edu2Author}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-850">
              <div className="text-blue-400 text-xs mb-3 font-mono">
                ★★★★★ • EdTech Architecture
              </div>
              <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                &ldquo;{t.testimonials.tech1Quote}&rdquo;
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800 text-xs font-bold text-white">
                {t.testimonials.tech1Author}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-850">
              <div className="text-blue-400 text-xs mb-3 font-mono">
                ★★★★★ • Applied Intelligence
              </div>
              <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                &ldquo;{t.testimonials.tech2Quote}&rdquo;
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800 text-xs font-bold text-white">
                {t.testimonials.tech2Author}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ========================================================= */}
      {/* 7. FORMULAIRE DE CONTACT & FOOTER                         */}
      {/* ========================================================= */}
      <footer
        id="contact"
        className="border-t border-slate-900 bg-slate-950 pt-16 pb-12"
      >
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Formulaire */}
          <div className="lg:col-span-7 bg-slate-900/60 border border-slate-850 rounded-3xl p-8">
            <h3 className="text-xl font-bold text-white mb-1">
              {t.contact.title}
            </h3>
            <p className="text-xs text-slate-400 mb-6">{t.contact.subtitle}</p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(
                  lang === "FR"
                    ? "Demande transmise avec succès."
                    : "Inquiry sent successfully.",
                );
              }}
              className="space-y-4 text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono uppercase text-slate-400 mb-1">
                    {t.contact.nameLabel}
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Nom complet"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-mono uppercase text-slate-400 mb-1">
                    {t.contact.emailLabel}
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="email@domaine.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono uppercase text-slate-400 mb-1">
                  {t.contact.natureLabel}
                </label>
                <select className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-amber-500">
                  <option>{t.contact.opt1}</option>
                  <option>{t.contact.opt2}</option>
                  <option>{t.contact.opt3}</option>
                  <option>{t.contact.opt4}</option>
                </select>
              </div>

              <div>
                <label className="block font-mono uppercase text-slate-400 mb-1">
                  {t.contact.detailsLabel}
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Précisez votre demande ou vos objectifs académiques..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-lg shadow-amber-950"
              >
                {t.contact.btnSend}
              </button>
            </form>
          </div>

          {/* Posture & Coordonnées */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-white">
                {t.contact.postureTitle}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t.contact.postureDesc}
              </p>

              <div className="pt-2 flex flex-col gap-2 text-xs font-mono text-slate-400">
                <div>{t.contact.loc}</div>
                <div>{t.contact.status}</div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-850">
              <div className="text-xs font-mono uppercase text-slate-400 mb-3">
                {t.contact.networks}
              </div>
              <div className="flex flex-wrap gap-4 text-xs font-mono">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-400 hover:text-white transition"
                >
                  LinkedIn
                </a>
                <span>•</span>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-400 hover:text-white transition"
                >
                  GitHub
                </a>
                <span>•</span>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-400 hover:text-white transition"
                >
                  YouTube
                </a>
                <span>•</span>
                <Link
                  href="/qcm"
                  className="text-slate-400 hover:text-white transition"
                >
                  Examens QCM
                </Link>
              </div>
            </div>

            <div className="text-[11px] font-mono text-slate-500">
              &copy; {new Date().getFullYear()} {t.contact.copy}
            </div>
          </div>
        </div>
      </footer>

      {/* ========================================================= */}
      {/* 8. BOUTON FLOTTANT WHATSAPP (Bas Droite)                  */}
      {/* ========================================================= */}
      <a
        href="https://wa.me/212600000000?text=Bonjour%20Mohamed,%20je%20souhaite%20des%20renseignements%20sur%20votre%20accompagnement."
        target="_blank"
        rel="noreferrer"
        title="WhatsApp Direct"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-3 rounded-full shadow-2xl shadow-emerald-950 font-bold text-xs transition-all hover:scale-105 group border border-emerald-400/30"
      >
        <span className="text-base">💬</span>
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
    </div>
  );
}
