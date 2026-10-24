"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MathText from "@/components/qcm/MathText";

const content = {
  FR: {
    hero: {
      tag: "Accompagnement & Didactique de Haut Niveau",
      titleStart: "L'art de la rigueur",
      titleHighlight: "mathématique",
      titleEnd: ", la force du code.",
      desc: "J'accompagne les élèves et lycéens vers l'autonomie et l'excellence logique, tout en développant des architectures logicielles modernes et des solutions appliquées en science des données.",
      badgeTitle: "Diagnostic gratuit",
      badgeDesc: "Évaluez votre niveau en 15 minutes",
      ctaPrimary: "COMMENCER LE TEST →",
      ctaSecondary: "DÉCOUVRIR LES FORMULES DE COACHING",
    },
    metrics: {
      titleStart: "Des résultats concrets et",
      titleHighlight: "mesurables",
      subtitle:
        "L'impact d'une pédagogie clinique, de la rigueur formelle et d'une ingénierie logicielle éprouvée.",
      m1Val: "08+ Années",
      m1Label: "Pratique Didactique en Établissement",
      m1Desc:
        "Spécialisation 1ère et 2ème année Bac Sciences Mathématiques & filières d'excellence.",
      m2Val: "100%",
      m2Label: "Raisonnement & Méthodologie Formelle",
      m2Desc:
        "Remplacement du bachotage mécanique par l'analyse critique et la démonstration pure.",
      m3Val: "Full-Stack",
      m3Label: "Architecte Logiciel & Intégration IA",
      m3Desc:
        "Conception de plateformes éducatives haute performance (Next.js, MariaDB, KaTeX, IA locale).",
    },
    pillars: {
      tag: "Champs d'Intervention",
      titleStart: "Une méthode d'excellence fondée sur la",
      titleHighlight: "rigueur",
      subtitle:
        "De l'abstraction logique formelle à l'implémentation logicielle concrète.",
      cards: [
        {
          num: "01",
          tag: "Didactique",
          title: "Mathématiques Lycée & Prépa",
          desc: "Entraînement méthodique axé sur la démonstration pure, la précision du raisonnement et la préparation au Bac SM.",
        },
        {
          tag: "Algorithmique",
          num: "02",
          title: "Computing Sciences",
          desc: "Initiation et renforcement en structures de données, logique booléenne, arithmétique binaire et graphes.",
        },
        {
          tag: "Développement",
          num: "03",
          title: "Ingénierie Full-Stack",
          desc: "Conception d'applications web scalables avec Next.js, TypeScript, MariaDB et déploiement conteneurisé Docker.",
        },
        {
          tag: "Évaluation",
          num: "04",
          title: "Plateforme Didactique",
          desc: "Moteur QCM interactif avec feedback immédiat, rendu KaTeX et remédiation ciblée des lacunes.",
        },
      ],
    },
    coaching: {
      tag: "Math Coaching",
      titleStart: "Des mathématiques qui se comprennent, pas qui se",
      titleHighlight: "récitent",
      subtitle:
        "Un accompagnement fondé sur la démonstration : diagnostic, plan personnalisé, entraînement guidé et suivi transparent. En français ou en anglais.",
      levelsLabel: "Niveaux accompagnés",
      levels: [
        "3AC",
        "Tronc Commun",
        "1ère Bac SM / S",
        "2ème Bac SM / S",
        "Homeschooling",
        "Français • English",
      ],
      tabFamilies: "Familles & élèves",
      tabSchools: "Établissements",
      methodTitle: "Une méthode en 4 étapes",
      steps: [
        {
          num: "01",
          title: "Diagnostiquer",
          desc: "Un test gratuit de 15 minutes pour repérer précisément les lacunes de logique et de méthode.",
        },
        {
          num: "02",
          title: "Planifier",
          desc: "Un plan sur mesure : objectifs, rythme et priorités selon le niveau et l'échéance.",
        },
        {
          num: "03",
          title: "S'entraîner",
          desc: "Des séances guidées centrées sur la démonstration, avec retours immédiats et corrections détaillées.",
        },
        {
          num: "04",
          title: "Mesurer",
          desc: "Des bilans réguliers partagés avec l'élève et les parents pour voir les progrès concrets.",
        },
      ],
      offersTitle: "Formules d'accompagnement",
      featuredLabel: "Recommandé",
      families: {
        intro:
          "Des formats souples, en présentiel ou à distance, adaptés à votre rythme.",
        offers: [
          {
            tag: "Pour commencer",
            title: "Diagnostic gratuit",
            desc: "Évaluez le niveau réel en 15 minutes avec le moteur QCM.",
            bullets: [
              "Analyse immédiate des réponses",
              "Pièges logiques repérés",
              "Aucun engagement",
            ],
            cta: "Passer le test",
            href: "/qcm",
            featured: false,
          },
          {
            tag: "Suivi ciblé",
            title: "Coaching ciblé",
            desc: "Des séances régulières pour combler les lacunes et gagner en autonomie.",
            bullets: [
              "Plan personnalisé",
              "Séances en ligne ou en présentiel",
              "Bilan régulier aux parents",
            ],
            cta: "Réserver un appel",
            href: "#contact",
            featured: true,
          },
          {
            tag: "Scolarité à la maison",
            title: "Programme Homeschooling",
            desc: "Un cadre complet : progression, séances et évaluations tout au long de l'année.",
            bullets: [
              "Programme structuré par niveau",
              "Évaluations et corrections",
              "Français ou anglais",
            ],
            cta: "Demander un programme",
            href: "#contact",
            featured: false,
          },
          {
            tag: "Échéances",
            title: "Préparation intensive",
            desc: "Un entraînement ciblé pour les devoirs surveillés, concours et examens.",
            bullets: [
              "Sujets types et méthodologie",
              "Gestion du temps et de la rédaction",
              "Sessions intensives",
            ],
            cta: "Me contacter",
            href: "#contact",
            featured: false,
          },
        ],
      },
      schools: {
        intro:
          "Des outils et des interventions pour mesurer le niveau des classes et remédier efficacement.",
        offers: [
          {
            tag: "Évaluer",
            title: "Diagnostic de classe",
            desc: "Un test diagnostique pour une classe entière, avec synthèse des résultats.",
            bullets: [
              "Analyse par notion",
              "Rapport de synthèse",
              "Mise en place rapide",
            ],
            cta: "Demander une proposition",
            href: "#contact",
            featured: false,
          },
          {
            tag: "Remédier",
            title: "Ateliers de remédiation",
            desc: "Des interventions ciblées sur les notions où la classe décroche.",
            bullets: [
              "Groupes de besoin",
              "Démonstration et méthode",
              "Présentiel ou distanciel",
            ],
            cta: "Demander une proposition",
            href: "#contact",
            featured: true,
          },
          {
            tag: "Démarrer",
            title: "Projet pilote",
            desc: "Une classe, un trimestre : on mesure l'impact avant de s'engager plus loin.",
            bullets: [
              "Objectifs définis ensemble",
              "Suivi et bilan final",
              "Confidentialité des données élèves",
            ],
            cta: "Demander une proposition",
            href: "#contact",
            featured: false,
          },
        ],
      },
      assurance: [
        {
          title: "Suivi transparent",
          desc: "Des bilans réguliers partagés avec les parents.",
        },
        {
          title: "Bilingue FR / EN",
          desc: "Des séances dans la langue de votre choix.",
        },
        {
          title: "Présentiel & distance",
          desc: "Au Maroc ou en ligne, selon votre rythme.",
        },
      ],
      ctaTitle: "Prêt à progresser en mathématiques ?",
      ctaDesc:
        "Commencez par le diagnostic gratuit, ou parlons de votre situation.",
      ctaPrimary: "COMMENCER LE TEST →",
      ctaSecondary: "ME CONTACTER",
    },
    computing: {
      tag: "Computing Sciences",
      titleStart: "Apprendre à penser comme un",
      titleHighlight: "ingénieur",
      subtitle:
        "De la logique booléenne à l'IA et à la cybersécurité : des parcours concrets, guidés par un ingénieur en activité.",
      pathsTitle: "Parcours d'apprentissage",
      paths: [
        {
          code: "PY",
          title: "Python & Algorithmique",
          desc: "Variables, boucles, fonctions, complexité : bâtir des bases solides.",
          level: "Débutant → Avancé",
        },
        {
          code: "LOG",
          title: "Logique & Données",
          desc: "Logique booléenne, arithmétique binaire, structures de données et graphes.",
          level: "Lycée",
        },
        {
          code: "WEB",
          title: "Développement Web",
          desc: "Construire de vraies applications avec Next.js, TypeScript et bases de données.",
          level: "Intermédiaire",
        },
        {
          code: "IA",
          title: "Initiation à l'IA",
          desc: "Comprendre l'apprentissage automatique et utiliser les modèles avec esprit critique.",
          level: "Intermédiaire",
        },
        {
          code: "SEC",
          title: "Cybersécurité",
          desc: "Hygiène numérique, mots de passe, chiffrement et bons réflexes de sécurité.",
          level: "Tous niveaux",
        },
        {
          code: "PRJ",
          title: "Projet Portfolio",
          desc: "Un projet complet et présentable pour valoriser ses compétences.",
          level: "Avancé",
        },
      ],
      ladderTitle: "Une progression claire",
      ladder: [
        {
          level: "Niveau 1",
          title: "Découvrir",
          desc: "Logique, algorithmes et premiers programmes.",
        },
        {
          level: "Niveau 2",
          title: "Construire",
          desc: "Structures de données, web et bases de données.",
        },
        {
          level: "Niveau 3",
          title: "Maîtriser",
          desc: "Projet complet, IA appliquée et sécurité.",
        },
      ],
      terminalTitle: "Exemple de séance",
      edgeBadge: "Master IA & Cybersécurité (en cours)",
      edgeTitle: "Un ingénieur en activité, en formation continue",
      edgeDesc:
        "Développeur full-stack et étudiant en master IA & cybersécurité : ce que j'enseigne reste aligné sur ce que je construis et sur les pratiques actuelles.",
      schoolTitle: "Pour les établissements",
      schoolDesc:
        "Des interventions courtes et concrètes pour initier les élèves au code et à la sécurité numérique.",
      schoolItems: [
        "Ateliers d'initiation au code",
        "Club informatique / algorithmique",
        "Sensibilisation à la cybersécurité",
      ],
      schoolCta: "Demander une proposition",
      ctaPrimary: "RÉSERVER UNE SÉANCE →",
      ctaSecondary: "VOIR LE MOTEUR QCM",
    },
    projects: {
      tag: "Projets",
      titleStart: "Des plateformes réelles, de 2013 à",
      titleHighlight: "aujourd'hui",
      subtitle:
        "Du site éducatif en PHP à une plateforme d'apprentissage assistée par l'IA : plus de dix ans de projets web construits pour des usages concrets.",
      featuredBadge: "Startup • en cours depuis 2025",
      featured: {
        year: "2025",
        name: "mathguidia.com",
        href: "https://mathguidia.com",
        category: "Plateforme éducative interactive",
        desc: "Une plateforme d'apprentissage des mathématiques qui guide, mesure et suit la progression de chaque élève, avec des exercices prédéfinis et des exercices générés sur mesure par l'IA selon les besoins.",
        features: [
          "Exercices prédéfinis, organisés par niveau",
          "Exercices générés par l'IA selon les besoins de l'élève",
          "Mesure et suivi de la progression",
        ],
        stack: ["Next.js", "MariaDB", "KaTeX", "IA"],
        cta: "Visiter mathguidia.com",
      },
      mockLabels: [
        "Exercice prédéfini",
        "Exercice généré par l'IA",
        "Suivi de progression",
      ],
      timelineTitle: "Parcours en projets",
      visit: "Visiter le site",
      items: [
        {
          year: "2013",
          name: "preum.net",
          href: "https://preum.net",
          category: "Site web éducatif",
          desc: "Un site web éducatif développé en HTML, CSS et PHP.",
          stack: ["HTML", "CSS", "PHP"],
        },
        {
          year: "2017",
          name: "clubtennismeknes.com",
          href: "https://clubtennismeknes.com",
          category: "Site web de club sportif",
          desc: "Le site du Club de Tennis de Meknès, conçu en complément de la gestion infographique du club.",
          stack: ["Web", "Design graphique"],
        },
        {
          year: "2021",
          name: "segundo.com",
          href: "https://segundo.com",
          category: "Intégration API e-commerce",
          desc: "Implémentation de l'Amazon Selling Partner API (SP-API) pour la gestion d'une dizaine de boutiques.",
          stack: ["Amazon SP-API", "E-commerce", "Multi-boutiques"],
        },
      ],
      ctaTitle: "Un projet en tête ?",
      ctaDesc:
        "Plateforme éducative, site web ou intégration d'API : parlons-en.",
      ctaBtn: "DISCUTER DE MON PROJET →",
    },
    diagnostic: {
      tag: "Outil Didactique en Libre Accès",
      titleStart: "Évaluez vos fondations en",
      titleHighlight: "Mathématiques",
      desc: "Ce test diagnostique cible précisément les pièges logiques récurrents (contraposée, implication, quantificateurs, ensembles) et offre une analyse immédiate de vos réponses.",
      levelLabel: "Niveau académique",
      emailLabel: "Adresse Email (Sauvegarde de la progression)",
      btnStart: "LANCER LE TEST DIAGNOSTIQUE →",
      sampleBadge: "Extrait Didactique",
      sampleTopic: "Raisonnement Formel",
      sampleQuestion:
        "Soit $A$ et $B$ deux sous-ensembles d'un univers $E$. Quelle proposition caractérise exactement l'inclusion $A \\subset B$ ?",
    },
    certs: {
      tag: "Accréditations & Titres",
      titleStart: "Certifications & Badges",
      titleHighlight: "Professionnels",
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
      titleStart: "Retours d'Accompagnement &",
      titleHighlight: "Avis",
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
      titleStart: "Parlons de votre projet ou de vos",
      titleHighlight: "objectifs",
      subtitle:
        "Pour un diagnostic mathématique personnalisé, une proposition pour votre établissement ou une collaboration en ingénierie logicielle.",
      nameLabel: "Nom & Prénom",
      emailLabel: "Adresse Email",
      natureLabel: "Nature de la demande",
      opt1: "Coaching Didactique & Suivi Mathématiques (Lycée)",
      optSchool: "Proposition pour un établissement scolaire",
      opt2: "Projet de Développement Logiciel (Web / EdTech)",
      opt3: "Consulting Systèmes de Données & IA",
      opt4: "Autre demande",
      detailsLabel: "Précisions",
      btnSend: "ENVOYER LA DEMANDE →",
      postureTitle: "Posture Professionnelle",
      postureDesc:
        "Une démarche fondée sur l'exigence intellectuelle, le respect des objectifs scolaires et la transparence des progrès.",
      loc: "📍 Maroc • En présentiel et à distance",
      status:
        "💼 Coach en mathématiques & Ingénieur logiciel • Master IA & Cybersécurité (en cours)",
      networks: "Réseaux & Plateformes",
      copy: "Mohamed Haddouche • Didactique Mathématique & Solutions Logicielles.",
    },
  },
  EN: {
    hero: {
      tag: "Advanced Coaching & Didactics",
      titleStart: "The craft of",
      titleHighlight: "mathematical",
      titleEnd: "rigor, the power of code.",
      desc: "Empowering secondary and high school students toward genuine logical inquiry and academic autonomy, while architecting modern web platforms and applied data solutions.",
      badgeTitle: "Free Assessment",
      badgeDesc: "Evaluate your level in 15 minutes",
      ctaPrimary: "START THE TEST →",
      ctaSecondary: "EXPLORE THE COACHING PROGRAMS",
    },
    metrics: {
      titleStart: "Proven results with",
      titleHighlight: "measurable",
      subtitle:
        "The direct impact of formal clarity, systematic inquiry, and robust software craftsmanship.",
      m1Val: "08+ Years",
      m1Label: "Classroom Didactic Practice",
      m1Desc:
        "Specialized in advanced secondary curricula (Sciences Maths & Prep Tracks).",
      m2Val: "100%",
      m2Label: "Formal Reasoning & Deduction",
      m2Desc:
        "Replacing rote memorization with deductive proofs and critical thinking.",
      m3Val: "Full-Stack",
      m3Label: "Software Architect & AI Integrator",
      m3Desc:
        "Designing high-performance educational engines (Next.js, MariaDB, KaTeX, on-device AI).",
    },
    pillars: {
      tag: "Fields of Intervention",
      titleStart: "A method of excellence grounded in",
      titleHighlight: "rigor",
      subtitle:
        "Bridging formal mathematical abstraction with modern software engineering.",
      cards: [
        {
          num: "01",
          tag: "Didactics",
          title: "High School & Prep Maths",
          desc: "Methodical mentoring focusing on formal proofs, logical consistency, and rigorous exam preparation.",
        },
        {
          num: "02",
          tag: "Algorithms",
          title: "Computing Sciences",
          desc: "In-depth coaching in data structures, boolean logic, discrete mathematics, and graph algorithms.",
        },
        {
          num: "03",
          tag: "Engineering",
          title: "Full-Stack Development",
          desc: "Architecting resilient and scalable web systems using Next.js, TypeScript, MariaDB, and Docker.",
        },
        {
          num: "04",
          tag: "Evaluation",
          title: "Didactic QCM Engine",
          desc: "Interactive testing engine with real-time feedback, KaTeX typesetting, and targeted conceptual remediation.",
        },
      ],
    },
    coaching: {
      tag: "Math Coaching",
      titleStart: "Mathematics you understand, not just",
      titleHighlight: "memorize",
      subtitle:
        "Coaching built on proof: diagnostic, personalized plan, guided practice and transparent progress. In French or English.",
      levelsLabel: "Levels supported",
      levels: [
        "3AC",
        "Tronc Commun",
        "1st Bac SM / S",
        "2nd Bac SM / S",
        "Homeschooling",
        "Français • English",
      ],
      tabFamilies: "Families & students",
      tabSchools: "Schools",
      methodTitle: "A 4-step method",
      steps: [
        {
          num: "01",
          title: "Diagnose",
          desc: "A free 15-minute test that pinpoints the exact gaps in logic and method.",
        },
        {
          num: "02",
          title: "Plan",
          desc: "A tailored plan: goals, pace and priorities based on level and deadline.",
        },
        {
          num: "03",
          title: "Train",
          desc: "Guided sessions centered on proof, with instant feedback and detailed corrections.",
        },
        {
          num: "04",
          title: "Measure",
          desc: "Regular progress reports shared with the student and parents.",
        },
      ],
      offersTitle: "Coaching programs",
      featuredLabel: "Recommended",
      families: {
        intro: "Flexible formats, in person or online, adapted to your pace.",
        offers: [
          {
            tag: "Start here",
            title: "Free diagnostic",
            desc: "Measure the real level in 15 minutes with the MCQ engine.",
            bullets: [
              "Instant analysis of answers",
              "Logical pitfalls identified",
              "No commitment",
            ],
            cta: "Take the test",
            href: "/qcm",
            featured: false,
          },
          {
            tag: "Focused support",
            title: "Targeted coaching",
            desc: "Regular sessions to close gaps and build independence.",
            bullets: [
              "Personalized plan",
              "Online or in-person sessions",
              "Regular reports to parents",
            ],
            cta: "Book a call",
            href: "#contact",
            featured: true,
          },
          {
            tag: "Learning at home",
            title: "Homeschooling program",
            desc: "A complete framework: progression, sessions and assessments all year long.",
            bullets: [
              "Structured curriculum by level",
              "Assessments and corrections",
              "French or English",
            ],
            cta: "Request a program",
            href: "#contact",
            featured: false,
          },
          {
            tag: "Deadlines",
            title: "Intensive prep",
            desc: "Focused training for tests, competitive exams and finals.",
            bullets: [
              "Model problems and method",
              "Time and write-up management",
              "Intensive sessions",
            ],
            cta: "Get in touch",
            href: "#contact",
            featured: false,
          },
        ],
      },
      schools: {
        intro:
          "Tools and interventions to measure class-level performance and remediate effectively.",
        offers: [
          {
            tag: "Assess",
            title: "Class diagnostic",
            desc: "A diagnostic test for a whole class, with a summary of the results.",
            bullets: [
              "Analysis by concept",
              "Summary report",
              "Quick to set up",
            ],
            cta: "Request a proposal",
            href: "#contact",
            featured: false,
          },
          {
            tag: "Remediate",
            title: "Remediation workshops",
            desc: "Targeted interventions on the concepts where the class struggles.",
            bullets: [
              "Needs-based groups",
              "Proof and method",
              "In person or remote",
            ],
            cta: "Request a proposal",
            href: "#contact",
            featured: true,
          },
          {
            tag: "Get started",
            title: "Pilot project",
            desc: "One class, one term: measure the impact before committing further.",
            bullets: [
              "Goals set together",
              "Follow-up and final report",
              "Student data confidentiality",
            ],
            cta: "Request a proposal",
            href: "#contact",
            featured: false,
          },
        ],
      },
      assurance: [
        {
          title: "Transparent progress",
          desc: "Regular reports shared with parents.",
        },
        {
          title: "Bilingual FR / EN",
          desc: "Sessions in the language of your choice.",
        },
        {
          title: "In person & online",
          desc: "In Morocco or online, at your pace.",
        },
      ],
      ctaTitle: "Ready to level up your mathematics?",
      ctaDesc:
        "Start with the free diagnostic, or let's talk about your situation.",
      ctaPrimary: "START THE TEST →",
      ctaSecondary: "GET IN TOUCH",
    },
    computing: {
      tag: "Computing Sciences",
      titleStart: "Learn to think like an",
      titleHighlight: "engineer",
      subtitle:
        "From boolean logic to AI and cybersecurity: hands-on learning paths guided by a working engineer.",
      pathsTitle: "Learning paths",
      paths: [
        {
          code: "PY",
          title: "Python & Algorithmics",
          desc: "Variables, loops, functions, complexity: build solid foundations.",
          level: "Beginner → Advanced",
        },
        {
          code: "LOG",
          title: "Logic & Data",
          desc: "Boolean logic, binary arithmetic, data structures and graphs.",
          level: "High school",
        },
        {
          code: "WEB",
          title: "Web Development",
          desc: "Build real applications with Next.js, TypeScript and databases.",
          level: "Intermediate",
        },
        {
          code: "AI",
          title: "Intro to AI",
          desc: "Understand machine learning and use models with a critical mind.",
          level: "Intermediate",
        },
        {
          code: "SEC",
          title: "Cybersecurity",
          desc: "Digital hygiene, passwords, encryption and good security reflexes.",
          level: "All levels",
        },
        {
          code: "PRJ",
          title: "Portfolio Project",
          desc: "A complete, presentable project that showcases real skills.",
          level: "Advanced",
        },
      ],
      ladderTitle: "A clear progression",
      ladder: [
        {
          level: "Level 1",
          title: "Discover",
          desc: "Logic, algorithms and first programs.",
        },
        {
          level: "Level 2",
          title: "Build",
          desc: "Data structures, web and databases.",
        },
        {
          level: "Level 3",
          title: "Master",
          desc: "Full project, applied AI and security.",
        },
      ],
      terminalTitle: "Sample session",
      edgeBadge: "MSc candidate, AI & Cybersecurity",
      edgeTitle: "A working engineer, always learning",
      edgeDesc:
        "Full-stack developer and master's student in AI & cybersecurity: what I coach stays aligned with what I build and with current practice.",
      schoolTitle: "For schools",
      schoolDesc:
        "Short, concrete interventions to introduce students to code and digital security.",
      schoolItems: [
        "Intro-to-code workshops",
        "Computing / algorithmics club",
        "Cybersecurity awareness sessions",
      ],
      schoolCta: "Request a proposal",
      ctaPrimary: "BOOK A SESSION →",
      ctaSecondary: "SEE THE MCQ ENGINE",
    },
    projects: {
      tag: "Projects",
      titleStart: "Real platforms, from 2013 to",
      titleHighlight: "today",
      subtitle:
        "From a PHP educational website to an AI-assisted learning platform: over ten years of web projects built for real-world use.",
      featuredBadge: "Startup • ongoing since 2025",
      featured: {
        year: "2025",
        name: "mathguidia.com",
        href: "https://mathguidia.com",
        category: "Interactive educational platform",
        desc: "A math learning platform that guides, measures and tracks each student's progress, with predefined exercises and exercises generated on demand by AI to fit each student's needs.",
        features: [
          "Predefined exercises, organized by level",
          "AI-generated exercises tailored to the student's needs",
          "Progress measurement and tracking",
        ],
        stack: ["Next.js", "MariaDB", "KaTeX", "AI"],
        cta: "Visit mathguidia.com",
      },
      mockLabels: [
        "Predefined exercise",
        "AI-generated exercise",
        "Progress tracking",
      ],
      timelineTitle: "A track record in projects",
      visit: "Visit the site",
      items: [
        {
          year: "2013",
          name: "preum.net",
          href: "https://preum.net",
          category: "Educational website",
          desc: "An educational website built with HTML, CSS and PHP.",
          stack: ["HTML", "CSS", "PHP"],
        },
        {
          year: "2017",
          name: "clubtennismeknes.com",
          href: "https://clubtennismeknes.com",
          category: "Sports club website",
          desc: "The website of the Meknès Tennis Club, built alongside the club's graphic design work.",
          stack: ["Web", "Graphic design"],
        },
        {
          year: "2021",
          name: "segundo.com",
          href: "https://segundo.com",
          category: "E-commerce API integration",
          desc: "Implementation of the Amazon Selling Partner API (SP-API) to manage around ten online stores.",
          stack: ["Amazon SP-API", "E-commerce", "Multi-store"],
        },
      ],
      ctaTitle: "Got a project in mind?",
      ctaDesc: "Educational platform, website or API integration: let's talk.",
      ctaBtn: "DISCUSS MY PROJECT →",
    },
    diagnostic: {
      tag: "Open-Access Didactic Engine",
      titleStart: "Evaluate Your Foundations in",
      titleHighlight: "Mathematics",
      desc: "This diagnostic evaluation identifies deep conceptual hurdles (contrapositives, logical conditionals, quantifiers, set relations) with step-by-step reasoning.",
      levelLabel: "Academic Level",
      emailLabel: "Email Address (Progress tracking & review)",
      btnStart: "START DIAGNOSTIC TEST →",
      sampleBadge: "Didactic Sample",
      sampleTopic: "Formal Reasoning",
      sampleQuestion:
        "Let $A$ and $B$ be subsets of an ambient set $E$. Which proposition characterizes the subset relation $A \\subset B$ ?",
    },
    certs: {
      tag: "Accreditations & Badges",
      titleStart: "Professional Certifications &",
      titleHighlight: "Credentials",
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
      titleStart: "Student & Partner",
      titleHighlight: "Testimonials",
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
      titleStart: "Let's discuss your next project or",
      titleHighlight: "goals",
      subtitle:
        "Inquire about diagnostic math coaching, a proposal for your school, or a specialized software/AI project.",
      nameLabel: "Full Name",
      emailLabel: "Email Address",
      natureLabel: "Inquiry Type",
      opt1: "Math Coaching & Didactic Mentoring (High School)",
      optSchool: "School / Institution Proposal",
      opt2: "Software Engineering & EdTech Web Projects",
      opt3: "Data Systems & AI Consultation",
      opt4: "Other Inquiries",
      detailsLabel: "Details",
      btnSend: "SEND INQUIRY →",
      postureTitle: "Professional Ethos",
      postureDesc:
        "Grounded in intellectual rigor, clear educational benchmarks, and verifiable academic outcomes.",
      loc: "📍 Morocco • In-person and online nationwide",
      status:
        "💼 Math Coach & Software Engineer • MSc candidate, AI & Cybersecurity",
      networks: "Networks & Profiles",
      copy: "Mohamed Haddouche • Mathematical Didactics & Software Solutions.",
    },
  },
};

const LEVELS = [
  { value: "Tronc commun", label: "Tronc Commun Scientifique" },
  { value: "1bac SM", label: "1ère Bac Sciences Mathématiques" },
  { value: "1bac S", label: "1ère Bac Sciences Expérimentales" },
  { value: "2bac SM", label: "2ème Bac Sciences Mathématiques" },
  { value: "2bac S", label: "2ème Bac Sciences Expérimentales" },
  { value: "3AC", label: "3ème Année Collégiale (3AC)" },
];

const PILLAR_LINKS = ["#coaching", "#computing", "#projects", "#diagnostic"];

const CERT_STYLES = [
  {
    badge: "PY",
    chip: "bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400",
    foot: "Verified Credential",
  },
  {
    badge: "Σ",
    chip: "bg-orange-500/10 border-orange-500/30 text-brand-orange",
    foot: "National Certificate",
  },
  {
    badge: "BS",
    chip: "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400",
    foot: "Academic Degree",
  },
  {
    badge: "AI",
    chip: "bg-red-500/10 border-red-500/30 text-brand-red",
    foot: "Applied Specialization",
  },
];

/* Couleurs des puces de parcours (section Computing, fond sombre) */
const PATH_STYLES = [
  "bg-blue-500/10 border-blue-500/30 text-blue-300",
  "bg-orange-500/10 border-orange-500/30 text-orange-300",
  "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
  "bg-red-500/10 border-red-500/30 text-red-300",
  "bg-purple-500/10 border-purple-500/30 text-purple-300",
  "bg-amber-500/10 border-amber-500/30 text-amber-300",
];

/* Fenêtre "terminal" décorative (identique dans les deux langues) */
const TERMINAL_LINES: { text: string; color: string }[] = [
  { text: ">>> a, b = True, False", color: "text-slate-200" },
  { text: ">>> a and not b", color: "text-slate-200" },
  { text: "True", color: "text-emerald-400" },
  { text: ">>> bin(42)", color: "text-slate-200" },
  { text: "'0b101010'", color: "text-orange-300" },
  {
    text: ">>> graph = {'A': ['B', 'C'], 'B': ['D']}",
    color: "text-slate-200",
  },
  { text: ">>> len(graph)", color: "text-slate-200" },
  { text: "2", color: "text-emerald-400" },
];

export default function ProfessionalLandingPage() {
  const router = useRouter();
  const [lang, setLang] = useState<"FR" | "EN">("FR");
  const [activeTab, setActiveTab] = useState<"education" | "tech">("education");
  const [coachingTab, setCoachingTab] = useState<"families" | "schools">(
    "families",
  );
  const [qcmEmail, setQcmEmail] = useState("");
  const [qcmLevel, setQcmLevel] = useState("Tronc commun");

  const t = content[lang];

  const certsText = t.certs as Record<string, string>;
  const certs = [1, 2, 3, 4].map((n, i) => ({
    org: certsText[`c${n}Org`],
    title: certsText[`c${n}Title`],
    desc: certsText[`c${n}Desc`],
    ...CERT_STYLES[i],
  }));

  const metricsText = t.metrics as Record<string, string>;
  const metrics = [1, 2, 3].map((n) => ({
    val: metricsText[`m${n}Val`],
    label: metricsText[`m${n}Label`],
    desc: metricsText[`m${n}Desc`],
  }));

  const testimonials =
    activeTab === "education"
      ? [
          {
            stars: "1Bac SM Track",
            quote: t.testimonials.edu1Quote,
            author: t.testimonials.edu1Author,
          },
          {
            stars: "Exam Diagnostic",
            quote: t.testimonials.edu2Quote,
            author: t.testimonials.edu2Author,
          },
        ]
      : [
          {
            stars: "EdTech Architecture",
            quote: t.testimonials.tech1Quote,
            author: t.testimonials.tech1Author,
          },
          {
            stars: "Applied Intelligence",
            quote: t.testimonials.tech2Quote,
            author: t.testimonials.tech2Author,
          },
        ];

  const audience = t.coaching[coachingTab];

  return (
    <div className="min-h-screen bg-background text-ink flex flex-col justify-between selection:bg-brand-red selection:text-white antialiased font-sans">
      {/* ========================= HERO ========================= */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[480px] opacity-60 dark:opacity-40"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 0%, rgba(242,92,39,0.18), transparent 70%), radial-gradient(40% 40% at 85% 10%, rgba(229,23,47,0.14), transparent 70%)",
          }}
        />
        <div className="relative py-20 sm:py-28 px-4 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-red/10 border border-brand-red/30 text-brand-red font-bold text-xs uppercase tracking-wider mb-6">
            {t.hero.tag}
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-ink tracking-tight leading-[1.08]">
            {t.hero.titleStart}{" "}
            <span className="np-highlight">{t.hero.titleHighlight}</span>
            {t.hero.titleEnd}
          </h1>

          <p className="mt-6 text-base sm:text-xl text-muted max-w-3xl mx-auto leading-relaxed">
            {t.hero.desc}
          </p>

          <div className="mt-10 max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-3 p-2.5 np-card">
            <div className="flex-1 px-4 py-2 text-left w-full">
              <span className="block text-[11px] font-black uppercase text-brand-red">
                {t.hero.badgeTitle}
              </span>
              <span className="text-xs sm:text-sm font-bold text-ink">
                {t.hero.badgeDesc}
              </span>
            </div>
            <Link href="/qcm" className="np-btn-primary w-full sm:w-auto">
              {t.hero.ctaPrimary}
            </Link>
          </div>

          <div className="mt-4">
            <Link
              href="#coaching"
              className="text-xs font-bold text-muted hover:text-brand-red transition underline underline-offset-4"
            >
              {t.hero.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      {/* ========================= METRICS ========================= */}
      <section
        id="parcours"
        className="py-20 bg-band text-white border-y-4 border-brand-red"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-black">
              {t.metrics.titleStart}{" "}
              <span className="text-brand-orange">
                {t.metrics.titleHighlight}
              </span>
              .
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-3 leading-relaxed">
              {t.metrics.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {metrics.map((m, i) => (
              <div
                key={i}
                className="bg-white/[0.04] p-8 rounded-2xl border border-white/10 hover:border-brand-red/60 transition"
              >
                <span className="block text-4xl sm:text-5xl font-black bg-gradient-to-r from-brand-orange to-brand-red bg-clip-text text-transparent">
                  {m.val}
                </span>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-200 mt-2">
                  {m.label}
                </p>
                <p className="text-xs text-slate-400 mt-4 leading-relaxed">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= EXPERTISE OVERVIEW ========================= */}
      <section id="expertises" className="py-20 bg-surface2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="np-eyebrow">{t.pillars.tag}</span>
            <h2 className="text-3xl sm:text-4xl font-black text-ink">
              {t.pillars.titleStart}{" "}
              <span className="np-highlight">{t.pillars.titleHighlight}</span>.
            </h2>
            <p className="mt-3 text-muted text-sm font-medium">
              {t.pillars.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.pillars.cards.map((card, idx) => (
              <Link
                key={idx}
                href={PILLAR_LINKS[idx]}
                className="np-card np-card-hover p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-orange to-brand-red text-white flex items-center justify-center font-black text-sm mb-5">
                    {card.num}
                  </div>
                  <h3 className="text-base font-black text-ink leading-snug">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-muted">
                    {card.desc}
                  </p>
                </div>
                <span className="mt-6 text-[11px] font-black tracking-wider text-brand-orange uppercase">
                  {card.tag} &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= MATH COACHING ========================= */}
      <section id="coaching" className="py-20 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Titre */}
          <div className="text-center max-w-3xl mx-auto">
            <span className="np-eyebrow">{t.coaching.tag}</span>
            <h2 className="text-3xl sm:text-5xl font-black text-ink tracking-tight leading-[1.1]">
              {t.coaching.titleStart}{" "}
              <span className="np-highlight">{t.coaching.titleHighlight}</span>.
            </h2>
            <p className="mt-5 text-sm sm:text-base text-muted leading-relaxed">
              {t.coaching.subtitle}
            </p>
          </div>

          {/* Niveaux */}
          <div className="mt-8 flex flex-col items-center gap-3">
            <span className="text-[11px] font-black uppercase tracking-widest text-muted">
              {t.coaching.levelsLabel}
            </span>
            <div className="flex flex-wrap justify-center gap-2">
              {t.coaching.levels.map((lvl) => (
                <span
                  key={lvl}
                  className="px-3.5 py-1.5 rounded-full bg-surface border border-line text-xs font-bold text-ink hover:border-brand-red transition"
                >
                  {lvl}
                </span>
              ))}
            </div>
          </div>

          {/* Méthode en 4 étapes */}
          <div className="mt-16">
            <h3 className="text-center text-xl font-black text-ink mb-10 flex items-center justify-center gap-3">
              <span className="h-0.5 w-6 bg-brand-red rounded" />
              {t.coaching.methodTitle}
              <span className="h-0.5 w-6 bg-brand-red rounded" />
            </h3>

            <div className="relative">
              <div
                aria-hidden
                className="hidden lg:block absolute top-6 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-brand-orange to-brand-red opacity-40"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {t.coaching.steps.map((s) => (
                  <div key={s.num} className="relative text-center">
                    <div className="relative z-10 mx-auto w-12 h-12 rounded-full bg-gradient-to-br from-brand-orange to-brand-red text-white font-black flex items-center justify-center shadow-lg shadow-red-500/25 ring-4 ring-background">
                      {s.num}
                    </div>
                    <h4 className="mt-4 text-base font-black text-ink">
                      {s.title}
                    </h4>
                    <p className="mt-2 text-xs text-muted leading-relaxed max-w-[16rem] mx-auto">
                      {s.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Formules : onglets Familles / Établissements */}
          <div className="mt-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
              <div>
                <span className="np-eyebrow">{t.coaching.offersTitle}</span>
                <p className="text-sm text-muted max-w-xl leading-relaxed">
                  {audience.intro}
                </p>
              </div>

              <div className="inline-flex rounded-xl bg-surface2 p-1 border border-line self-start md:self-auto">
                {(
                  [
                    ["families", t.coaching.tabFamilies],
                    ["schools", t.coaching.tabSchools],
                  ] as const
                ).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setCoachingTab(key)}
                    className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition ${
                      coachingTab === key
                        ? "bg-gradient-to-r from-brand-orange to-brand-red text-white shadow-sm"
                        : "text-muted hover:text-ink"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div
              className={`grid grid-cols-1 md:grid-cols-2 gap-6 pt-3 ${
                audience.offers.length === 4
                  ? "lg:grid-cols-4"
                  : "lg:grid-cols-3"
              }`}
            >
              {audience.offers.map((o) => (
                <div
                  key={o.title}
                  className={`np-card np-card-hover relative p-7 flex flex-col ${
                    o.featured
                      ? "border-brand-red ring-1 ring-brand-red/40"
                      : ""
                  }`}
                >
                  {o.featured && (
                    <span className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-gradient-to-r from-brand-orange to-brand-red text-white text-[10px] font-black uppercase tracking-wider shadow">
                      {t.coaching.featuredLabel}
                    </span>
                  )}
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-orange">
                    {o.tag}
                  </span>
                  <h4 className="mt-2 text-lg font-black text-ink leading-snug">
                    {o.title}
                  </h4>
                  <p className="mt-2 text-xs text-muted leading-relaxed">
                    {o.desc}
                  </p>
                  <ul className="mt-5 space-y-2 flex-1">
                    {o.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex gap-2 text-xs text-ink font-medium"
                      >
                        <span className="text-brand-red font-black">✓</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={o.href}
                    className={
                      o.featured
                        ? "np-btn-primary mt-6 w-full"
                        : "mt-6 w-full inline-flex items-center justify-center px-5 py-3 rounded-xl border-2 border-ink text-ink hover:bg-brand-red hover:border-brand-red hover:text-white text-xs font-black uppercase tracking-wider transition"
                    }
                  >
                    {o.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Engagements */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4">
            {t.coaching.assurance.map((a) => (
              <div
                key={a.title}
                className="flex items-start gap-3 p-5 rounded-2xl bg-surface2 border border-line"
              >
                <span className="shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-brand-red/10 border border-brand-red/30 text-brand-red text-xs font-black">
                  ✓
                </span>
                <div>
                  <div className="text-sm font-black text-ink">{a.title}</div>
                  <div className="text-xs text-muted mt-0.5 leading-relaxed">
                    {a.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-14 np-card border-t-4 border-t-brand-red p-8 sm:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-xl">
              <h3 className="text-2xl font-black text-ink tracking-tight">
                {t.coaching.ctaTitle}
              </h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                {t.coaching.ctaDesc}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <Link href="/qcm" className="np-btn-primary">
                {t.coaching.ctaPrimary}
              </Link>
              <Link href="#contact" className="np-btn-blue">
                {t.coaching.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================= COMPUTING SCIENCES ========================= */}
      <section
        id="computing"
        className="relative overflow-hidden py-20 bg-band text-white border-y-4 border-brand-red"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(45% 50% at 12% 0%, rgba(242,92,39,0.18), transparent 70%), radial-gradient(40% 45% at 92% 100%, rgba(229,23,47,0.16), transparent 70%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          {/* Titre */}
          <div className="text-center max-w-3xl mx-auto">
            <span className="np-eyebrow">{t.computing.tag}</span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.1]">
              {t.computing.titleStart}{" "}
              <span className="text-brand-orange">
                {t.computing.titleHighlight}
              </span>
              .
            </h2>
            <p className="mt-5 text-sm sm:text-base text-slate-400 leading-relaxed">
              {t.computing.subtitle}
            </p>
          </div>

          {/* Parcours + terminal */}
          <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7">
              <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                <span className="h-0.5 w-6 bg-brand-red rounded" />
                {t.computing.pathsTitle}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {t.computing.paths.map((p, i) => (
                  <div
                    key={p.code}
                    className="bg-white/[0.04] p-6 rounded-2xl border border-white/10 hover:border-brand-red/60 hover:-translate-y-1 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`h-10 min-w-10 px-2 rounded-xl border flex items-center justify-center font-mono font-black text-xs ${PATH_STYLES[i]}`}
                      >
                        {p.code}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                        {p.level}
                      </span>
                    </div>
                    <h4 className="mt-4 text-sm font-black">{p.title}</h4>
                    <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Terminal décoratif */}
              <div className="rounded-2xl border border-white/10 bg-black/50 overflow-hidden shadow-2xl">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/[0.03]">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="ml-3 text-[11px] font-mono text-slate-400">
                    {t.computing.terminalTitle}
                  </span>
                </div>
                <pre className="!bg-transparent !border-0 !rounded-none !p-5 text-[12px] leading-6 font-mono overflow-x-auto">
                  {TERMINAL_LINES.map((l, i) => (
                    <div key={i} className={l.color}>
                      {l.text}
                    </div>
                  ))}
                </pre>
              </div>

              {/* Atout : profil ingénieur */}
              <div className="rounded-2xl border border-brand-red/40 bg-gradient-to-br from-brand-orange/10 to-brand-red/10 p-6">
                <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-brand-orange to-brand-red text-white text-[10px] font-black uppercase tracking-wider">
                  {t.computing.edgeBadge}
                </span>
                <h4 className="mt-4 text-lg font-black leading-snug">
                  {t.computing.edgeTitle}
                </h4>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                  {t.computing.edgeDesc}
                </p>
              </div>
            </div>
          </div>

          {/* Progression */}
          <div className="mt-16">
            <h3 className="text-center text-xl font-black mb-8 flex items-center justify-center gap-3">
              <span className="h-0.5 w-6 bg-brand-red rounded" />
              {t.computing.ladderTitle}
              <span className="h-0.5 w-6 bg-brand-red rounded" />
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
              {t.computing.ladder.map((s, i) => (
                <div
                  key={s.level}
                  className="relative bg-white/[0.04] p-6 rounded-2xl border border-white/10"
                >
                  <span className="text-[10px] font-mono font-black uppercase tracking-widest text-brand-orange">
                    {s.level}
                  </span>
                  <h4 className="mt-2 text-xl font-black bg-gradient-to-r from-brand-orange to-brand-red bg-clip-text text-transparent">
                    {s.title}
                  </h4>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                    {s.desc}
                  </p>
                  <div className="mt-5 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-brand-orange to-brand-red"
                      style={{ width: `${((i + 1) / 3) * 100}%` }}
                    />
                  </div>
                  {i < 2 && (
                    <span
                      aria-hidden
                      className="hidden md:flex absolute top-1/2 -right-3.5 z-10 h-7 w-7 items-center justify-center rounded-full bg-brand-red text-white text-xs font-black"
                    >
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Établissements */}
          <div className="mt-14 rounded-3xl border border-white/10 bg-gradient-to-r from-brand-orange/10 to-brand-red/10 p-8 sm:p-10 flex flex-col lg:flex-row gap-8 lg:items-center justify-between">
            <div className="max-w-xl">
              <span className="np-eyebrow">{t.computing.schoolTitle}</span>
              <p className="text-sm text-slate-300 leading-relaxed">
                {t.computing.schoolDesc}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {t.computing.schoolItems.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-xs font-bold text-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <Link href="#contact" className="np-btn-primary shrink-0">
              {t.computing.schoolCta} →
            </Link>
          </div>

          {/* CTA final */}
          <div className="mt-12 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="#contact" className="np-btn-primary">
              {t.computing.ctaPrimary}
            </Link>
            <Link href="/qcm" className="np-btn-blue">
              {t.computing.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      {/* ========================= PROJECTS ========================= */}
      <section id="projects" className="py-20 bg-surface2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Titre */}
          <div className="text-center max-w-3xl mx-auto">
            <span className="np-eyebrow">{t.projects.tag}</span>
            <h2 className="text-3xl sm:text-5xl font-black text-ink tracking-tight leading-[1.1]">
              {t.projects.titleStart}{" "}
              <span className="np-highlight">{t.projects.titleHighlight}</span>.
            </h2>
            <p className="mt-5 text-sm sm:text-base text-muted leading-relaxed">
              {t.projects.subtitle}
            </p>
          </div>

          {/* Projet phare : mathguidia.com */}
          <div className="mt-14 np-card border-t-4 border-t-brand-red p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-5">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red/10 border border-brand-red/30 text-brand-red font-bold text-[11px] uppercase tracking-wider">
                  <span className="np-live" />
                  {t.projects.featuredBadge}
                </span>

                <div>
                  <div className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-brand-orange to-brand-red bg-clip-text text-transparent leading-none">
                    {t.projects.featured.year}
                  </div>
                  <h3 className="mt-3 text-2xl sm:text-3xl font-black text-ink tracking-tight">
                    {t.projects.featured.name}
                  </h3>
                  <p className="mt-1 text-xs font-black uppercase tracking-widest text-brand-orange">
                    {t.projects.featured.category}
                  </p>
                </div>

                <p className="text-sm text-muted leading-relaxed max-w-xl">
                  {t.projects.featured.desc}
                </p>

                <ul className="space-y-2">
                  {t.projects.featured.features.map((f) => (
                    <li
                      key={f}
                      className="flex gap-2.5 text-sm text-ink font-medium"
                    >
                      <span className="mt-0.5 shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-brand-red/10 border border-brand-red/30 text-brand-red text-[10px] font-black">
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {t.projects.featured.stack.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 rounded-md bg-surface2 border border-line text-[11px] font-mono font-bold text-ink"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <a
                  href={t.projects.featured.href}
                  target="_blank"
                  rel="noreferrer"
                  className="np-btn-primary"
                >
                  {t.projects.featured.cta} ↗
                </a>
              </div>

              {/* Aperçu décoratif de la plateforme */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-line bg-surface2 p-5 space-y-3">
                  <div className="flex items-center gap-2 pb-3 border-b border-line">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="ml-3 text-[11px] font-mono text-muted">
                      mathguidia.com
                    </span>
                  </div>

                  <div className="rounded-xl border border-line bg-surface p-4">
                    <span className="text-[10px] font-mono font-black uppercase tracking-wider text-muted">
                      {t.projects.mockLabels[0]}
                    </span>
                    <div className="mt-2 text-sm text-ink">
                      <MathText content="$\forall x \in \mathbb{R},\; x^2 \ge 0$" />
                    </div>
                  </div>

                  <div className="rounded-xl border border-brand-red/50 bg-gradient-to-br from-brand-orange/10 to-brand-red/10 p-4">
                    <span className="text-[10px] font-mono font-black uppercase tracking-wider text-brand-red">
                      ✦ {t.projects.mockLabels[1]}
                    </span>
                    <div className="mt-2 text-sm text-ink">
                      <MathText content="$\lim_{x \to 0} \dfrac{\sin x}{x} = 1$" />
                    </div>
                  </div>

                  <div className="rounded-xl border border-line bg-surface p-4">
                    <span className="text-[10px] font-mono font-black uppercase tracking-wider text-muted">
                      {t.projects.mockLabels[2]}
                    </span>
                    <div className="mt-3 h-2 w-full rounded-full bg-surface2 border border-line overflow-hidden">
                      <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-brand-orange to-brand-red" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Parcours en projets */}
          <div className="mt-16">
            <h3 className="text-center text-xl font-black text-ink mb-10 flex items-center justify-center gap-3">
              <span className="h-0.5 w-6 bg-brand-red rounded" />
              {t.projects.timelineTitle}
              <span className="h-0.5 w-6 bg-brand-red rounded" />
            </h3>

            <div className="relative">
              <div
                aria-hidden
                className="hidden md:block absolute top-4 left-[16.6%] right-[16.6%] h-0.5 bg-gradient-to-r from-brand-orange to-brand-red opacity-40"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {t.projects.items.map((item) => (
                  <div key={item.name} className="relative">
                    <div className="relative z-10 mx-auto w-fit px-4 h-8 rounded-full bg-gradient-to-r from-brand-orange to-brand-red text-white font-black text-xs flex items-center justify-center shadow-lg shadow-red-500/25 ring-4 ring-surface2">
                      {item.year}
                    </div>

                    <div className="np-card np-card-hover mt-5 p-7 flex flex-col h-[calc(100%-3.25rem)]">
                      <span className="text-[10px] font-black uppercase tracking-widest text-brand-orange">
                        {item.category}
                      </span>
                      <h4 className="mt-2 text-lg font-black text-ink break-words">
                        {item.name}
                      </h4>
                      <p className="mt-2 text-xs text-muted leading-relaxed flex-1">
                        {item.desc}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {item.stack.map((s) => (
                          <span
                            key={s}
                            className="px-2 py-0.5 rounded bg-surface2 border border-line text-[10px] font-mono font-bold text-muted"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-5 text-[11px] font-black uppercase tracking-wider text-brand-orange hover:text-brand-red transition"
                      >
                        {t.projects.visit} ↗
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-5 p-8 rounded-3xl border border-line bg-surface">
            <div>
              <h3 className="text-xl font-black text-ink">
                {t.projects.ctaTitle}
              </h3>
              <p className="mt-1 text-sm text-muted">{t.projects.ctaDesc}</p>
            </div>
            <Link href="#contact" className="np-btn-blue shrink-0">
              {t.projects.ctaBtn}
            </Link>
          </div>
        </div>
      </section>

      {/* ========================= DIAGNOSTIC ========================= */}
      <section
        id="diagnostic"
        className="max-w-7xl mx-auto px-4 sm:px-6 py-20 w-full"
      >
        <div className="np-card rounded-3xl p-8 sm:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="np-eyebrow">{t.diagnostic.tag}</span>
              <h2 className="text-2xl sm:text-3xl font-black text-ink tracking-tight">
                {t.diagnostic.titleStart}{" "}
                <span className="np-highlight">
                  {t.diagnostic.titleHighlight}
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                {t.diagnostic.desc}
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (qcmEmail.trim()) {
                    router.push(`/qcm?level=${encodeURIComponent(qcmLevel)}`);
                  }
                }}
                className="space-y-4 pt-3"
              >
                <div>
                  <label className="np-label" htmlFor="qcm-level">
                    {t.diagnostic.levelLabel}
                  </label>
                  <select
                    id="qcm-level"
                    value={qcmLevel}
                    onChange={(e) => setQcmLevel(e.target.value)}
                    className="np-input font-semibold"
                  >
                    {LEVELS.map((l) => (
                      <option key={l.value} value={l.value}>
                        {l.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="np-label" htmlFor="qcm-email">
                    {t.diagnostic.emailLabel}
                  </label>
                  <input
                    id="qcm-email"
                    required
                    type="email"
                    value={qcmEmail}
                    onChange={(e) => setQcmEmail(e.target.value)}
                    placeholder="contact.etudiant@domaine.com"
                    className="np-input"
                  />
                </div>

                <button type="submit" className="np-btn-primary w-full">
                  {t.diagnostic.btnStart}
                </button>
              </form>
            </div>

            {/* KaTeX demo */}
            <div className="lg:col-span-6 bg-surface2 border border-line rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex justify-between items-center text-xs text-muted font-mono pb-3 border-b border-line">
                <span>{t.diagnostic.sampleBadge}</span>
                <span className="text-brand-red font-bold">
                  {t.diagnostic.sampleTopic}
                </span>
              </div>

              <div className="text-sm font-bold text-ink leading-relaxed">
                <MathText content={t.diagnostic.sampleQuestion} />
              </div>

              <div className="space-y-2.5 pt-2">
                <div className="p-3.5 rounded-xl border border-line bg-surface text-xs text-muted flex items-center gap-3">
                  <span className="w-4 h-4 rounded-full border border-line shrink-0" />
                  <MathText content="$\forall x \in E, \; x \in B \implies x \in A$" />
                </div>
                <div className="p-3.5 rounded-xl border border-emerald-500/50 bg-emerald-500/10 text-xs text-emerald-700 dark:text-emerald-300 font-bold flex items-center gap-3">
                  <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-black shrink-0">
                    ✓
                  </span>
                  <MathText content="$\forall x \in E, \; x \in A \implies x \in B$" />
                </div>
                <div className="p-3.5 rounded-xl border border-line bg-surface text-xs text-muted flex items-center gap-3">
                  <span className="w-4 h-4 rounded-full border border-line shrink-0" />
                  <MathText content="$A \cap B = \emptyset$" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================= CERTIFICATIONS ========================= */}
      <section
        id="certs"
        className="max-w-7xl mx-auto px-4 sm:px-6 py-20 w-full border-t border-line"
      >
        <div className="text-center mb-14">
          <span className="np-eyebrow">{t.certs.tag}</span>
          <h2 className="text-3xl font-black text-ink">
            {t.certs.titleStart}{" "}
            <span className="np-highlight">{t.certs.titleHighlight}</span>
          </h2>
          <p className="text-xs sm:text-sm text-muted mt-2 max-w-xl mx-auto">
            {t.certs.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certs.map((c, i) => (
            <div
              key={i}
              className="np-card np-card-hover p-7 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center font-mono font-black text-xs ${c.chip}`}
                >
                  {c.badge}
                </div>
                <span className="text-[10px] font-black uppercase text-muted block">
                  {c.org}
                </span>
                <h3 className="text-sm font-black text-ink leading-snug">
                  {c.title}
                </h3>
                <p className="text-xs text-muted leading-relaxed">{c.desc}</p>
              </div>
              <div className="mt-6 pt-3 border-t border-line text-[11px] font-mono text-muted">
                {c.foot}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================= TESTIMONIALS ========================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 w-full border-t border-line">
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-10 gap-4">
          <div>
            <span className="np-eyebrow">{t.testimonials.tag}</span>
            <h2 className="text-3xl font-black text-ink">
              {t.testimonials.titleStart}{" "}
              <span className="np-highlight">
                {t.testimonials.titleHighlight}
              </span>
            </h2>
          </div>

          <div className="inline-flex rounded-xl bg-surface2 p-1 border border-line">
            {(
              [
                ["education", t.testimonials.tabEdu],
                ["tech", t.testimonials.tabTech],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTab(key)}
                className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition ${
                  activeTab === key
                    ? "bg-gradient-to-r from-brand-orange to-brand-red text-white shadow-sm"
                    : "text-muted hover:text-ink"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((x, i) => (
            <div key={i} className="np-card p-8">
              <div className="text-amber-500 text-xs mb-3 font-mono font-bold">
                ★★★★★ <span className="text-muted">• {x.stars}</span>
              </div>
              <p className="text-xs sm:text-sm text-muted italic leading-relaxed">
                &ldquo;{x.quote}&rdquo;
              </p>
              <div className="mt-5 pt-3 border-t border-line text-xs font-black text-ink">
                {x.author}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================= CONTACT ========================= */}
      <footer
        id="contact"
        className="bg-band text-white pt-20 pb-12 border-t-4 border-brand-red"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 bg-white/[0.04] border border-white/10 rounded-3xl p-8 sm:p-10">
            <h3 className="text-2xl font-black text-white mb-2">
              {t.contact.titleStart}{" "}
              <span className="text-brand-orange">
                {t.contact.titleHighlight}
              </span>
              !
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-8 leading-relaxed">
              {t.contact.subtitle}
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(
                  lang === "FR"
                    ? "Demande transmise avec succès."
                    : "Inquiry sent successfully.",
                );
              }}
              className="space-y-4 text-xs font-medium"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="np-label !text-slate-400">
                    {t.contact.nameLabel}
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Nom complet"
                    className="np-input !bg-black/30 !border-white/10 !text-slate-100"
                  />
                </div>
                <div>
                  <label className="np-label !text-slate-400">
                    {t.contact.emailLabel}
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="email@domaine.com"
                    className="np-input !bg-black/30 !border-white/10 !text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="np-label !text-slate-400">
                  {t.contact.natureLabel}
                </label>
                <select className="np-input !bg-black/30 !border-white/10 !text-slate-100">
                  <option>{t.contact.opt1}</option>
                  <option>{t.contact.optSchool}</option>
                  <option>{t.contact.opt2}</option>
                  <option>{t.contact.opt3}</option>
                  <option>{t.contact.opt4}</option>
                </select>
              </div>

              <div>
                <label className="np-label !text-slate-400">
                  {t.contact.detailsLabel}
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Précisez votre demande ou vos objectifs académiques..."
                  className="np-input !bg-black/30 !border-white/10 !text-slate-100"
                />
              </div>

              <button type="submit" className="np-btn-blue w-full !py-4">
                {t.contact.btnSend}
              </button>
            </form>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <h4 className="text-xl font-black text-white">
                {t.contact.postureTitle}
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {t.contact.postureDesc}
              </p>
              <div className="pt-3 flex flex-col gap-2.5 text-xs font-mono text-slate-300">
                <div>{t.contact.loc}</div>
                <div>{t.contact.status}</div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <div className="text-[11px] font-black uppercase text-slate-400 tracking-wider mb-3">
                {t.contact.networks}
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-400">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-brand-orange transition"
                >
                  LinkedIn
                </a>
                <span>•</span>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-brand-orange transition"
                >
                  GitHub
                </a>
                <span>•</span>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-brand-red transition"
                >
                  YouTube
                </a>
                <span>•</span>
                <Link href="/qcm" className="hover:text-white transition">
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

      {/* ========================= WHATSAPP ========================= */}
      <a
        href="https://wa.me/212600000000?text=Bonjour%20Mohamed,%20je%20souhaite%20des%20renseignements%20sur%20votre%20accompagnement."
        target="_blank"
        rel="noreferrer"
        title="WhatsApp Direct"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-3 rounded-full shadow-2xl font-black text-xs transition-all hover:scale-105 border border-emerald-400/40"
      >
        <span className="text-base">💬</span>
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
    </div>
  );
}
