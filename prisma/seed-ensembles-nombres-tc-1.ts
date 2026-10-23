import "dotenv/config";
import { prisma } from "../src/lib/db";
import { SchoolLevel } from "@prisma/client";

interface RawQuestion {
  question: string;
  topic: string;
  difficulty: "Facile" | "Moyen" | "Difficile";
  explanation?: string;
  options: {
    text: string;
    isCorrect: boolean;
  }[];
}

const QUESTIONS_DATA: RawQuestion[] = [
  {
    question: "L'ensemble des entiers naturels se note :",
    topic: "Les Ensembles de Nombres",
    difficulty: "Facile",
    explanation:
      "$\\mathbb{N}$ désigne l'ensemble des entiers naturels : $\\mathbb{N} = \\{0, 1, 2, 3, \\dots\\}$.",
    options: [
      { text: "$\\mathbb{Z}$", isCorrect: false },
      { text: "$\\mathbb{N}$", isCorrect: true },
      { text: "$\\mathbb{Q}$", isCorrect: false },
      { text: "$\\mathbb{R}$", isCorrect: false },
    ],
  },
  {
    question:
      "L'ensemble des entiers relatifs ($\\mathbb{Z}$) est composé de :",
    topic: "Les Ensembles de Nombres",
    difficulty: "Facile",
    explanation:
      "$\\mathbb{Z}$ regroupe l'ensemble des entiers naturels positifs, leurs opposés négatifs, ainsi que zéro : $\\mathbb{Z} = \\{\\dots, -3, -2, -1, 0, 1, 2, 3, \\dots\\}$.",
    options: [
      { text: "Uniquement des nombres positifs", isCorrect: false },
      { text: "Uniquement des nombres négatifs", isCorrect: false },
      { text: "Des entiers positifs, négatifs et de zéro", isCorrect: true },
      { text: "Des nombres décimaux", isCorrect: false },
    ],
  },
  {
    question:
      "Un nombre décimal est un nombre qui peut s'écrire sous la forme :",
    topic: "Les Ensembles de Nombres",
    difficulty: "Facile",
    explanation:
      "Par définition de l'ensemble $\\mathbb{D}$, un nombre est décimal s'il peut s'écrire sous la forme d'une fraction décimale $\\frac{a}{10^p}$ où $a \\in \\mathbb{Z}$ et $p \\in \\mathbb{N}$.",
    options: [
      {
        text: "$\\frac{a}{b}$ avec $a, b \\in \\mathbb{Z}$ et $b \\neq 0$",
        isCorrect: false,
      },
      {
        text: "$\\frac{a}{10^p}$ avec $a \\in \\mathbb{Z}$ et $p \\in \\mathbb{N}$",
        isCorrect: true,
      },
      { text: "Uniquement sous forme d'entier", isCorrect: false },
      { text: "Une racine carrée", isCorrect: false },
    ],
  },
  {
    question: "L'ensemble des nombres rationnels se note :",
    topic: "Les Ensembles de Nombres",
    difficulty: "Facile",
    explanation:
      "La lettre $\\mathbb{Q}$ (pour Quotient) désigne l'ensemble de tous les nombres rationnels.",
    options: [
      { text: "$\\mathbb{D}$", isCorrect: false },
      { text: "$\\mathbb{Q}$", isCorrect: true },
      { text: "$\\mathbb{R}$", isCorrect: false },
      { text: "$\\mathbb{N}$", isCorrect: false },
    ],
  },
  {
    question:
      "Un nombre rationnel est un nombre qui peut s'écrire sous la forme :",
    topic: "Les Ensembles de Nombres",
    difficulty: "Facile",
    explanation:
      "Tout nombre rationnel $q \\in \\mathbb{Q}$ s'exprime comme le quotient de deux entiers relatifs : $q = \\frac{a}{b}$ avec $a \\in \\mathbb{Z}$ et $b \\in \\mathbb{Z}^*$.",
    options: [
      {
        text: "$\\frac{a}{b}$ avec $a \\in \\mathbb{N}$ et $b \\in \\mathbb{N}^*$",
        isCorrect: false,
      },
      {
        text: "$\\frac{a}{b}$ avec $a \\in \\mathbb{Z}$ et $b \\in \\mathbb{Z}^*$",
        isCorrect: true,
      },
      { text: "$\\frac{a}{10^n}$", isCorrect: false },
      { text: "Une fraction irréductible uniquement", isCorrect: false },
    ],
  },
  {
    question:
      "Quelle est la bonne chaîne d'inclusions des ensembles de nombres ?",
    topic: "Les Ensembles de Nombres",
    difficulty: "Facile",
    explanation:
      "La hiérarchie fondamentale des ensembles est : $\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{D} \\subset \\mathbb{Q} \\subset \\mathbb{R}$.",
    options: [
      {
        text: "$\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{D} \\subset \\mathbb{Q} \\subset \\mathbb{R}$",
        isCorrect: true,
      },
      {
        text: "$\\mathbb{N} \\subset \\mathbb{D} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}$",
        isCorrect: false,
      },
      {
        text: "$\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{D} \\subset \\mathbb{R}$",
        isCorrect: false,
      },
      {
        text: "$\\mathbb{Z} \\subset \\mathbb{N} \\subset \\mathbb{D} \\subset \\mathbb{Q} \\subset \\mathbb{R}$",
        isCorrect: false,
      },
    ],
  },
  {
    question: "Le nombre $\\frac{2}{3}$ est-il un nombre décimal ?",
    topic: "Les Ensembles de Nombres",
    difficulty: "Moyen",
    explanation:
      "$\\frac{2}{3} = 0{,}6666\\dots$ Le dénominateur de la fraction irréductible contient le facteur premier 3 (qui n'est ni 2 ni 5). Il ne peut donc pas s'écrire sous la forme $\\frac{a}{10^p}$, ce n'est pas un décimal.",
    options: [
      { text: "Oui, car c'est une fraction", isCorrect: false },
      {
        text: "Non, car son écriture décimale est infinie et périodique",
        isCorrect: true,
      },
      { text: "Oui, car $2$ et $3$ sont des entiers", isCorrect: false },
      { text: "Non, car il est inférieur à 1", isCorrect: false },
    ],
  },
  {
    question: "Le nombre $\\frac{3}{4}$ est-il un nombre décimal ?",
    topic: "Les Ensembles de Nombres",
    difficulty: "Facile",
    explanation:
      "$\\frac{3}{4} = \\frac{3 \\times 25}{4 \\times 25} = \\frac{75}{100} = \\frac{75}{10^2} = 0{,}75$. Son écriture décimale est finie, c'est donc bien un nombre décimal.",
    options: [
      { text: "Oui, car $\\frac{3}{4} = 0{,}75$", isCorrect: true },
      { text: "Non, car il est rationnel", isCorrect: false },
      { text: "Non, car sa division ne se termine pas", isCorrect: false },
      { text: "Oui, car c'est un nombre positif", isCorrect: false },
    ],
  },
  {
    question: "Le nombre $\\sqrt{2}$ appartient à :",
    topic: "Les Ensembles de Nombres",
    difficulty: "Facile",
    explanation:
      "$\\sqrt{2}$ est un nombre réel irrationnel (démontré par l'absurde). Il appartient à $\\mathbb{R}$ mais n'appartient pas à $\\mathbb{Q}$ ($\\\sqrt{2} \\in \\mathbb{R} \\setminus \\mathbb{Q}$).",
    options: [
      { text: "$\\mathbb{Q}$", isCorrect: false },
      { text: "$\\mathbb{D}$", isCorrect: false },
      { text: "$\\mathbb{R}$ mais pas à $\\mathbb{Q}$", isCorrect: true },
      { text: "$\\mathbb{Z}$", isCorrect: false },
    ],
  },
  {
    question: "Un nombre irrationnel est un nombre qui :",
    topic: "Les Ensembles de Nombres",
    difficulty: "Facile",
    explanation:
      "Par définition, un nombre irrationnel est un nombre réel qui ne peut pas s'écrire sous la forme d'un quotient d'entiers, c'est-à-dire qui n'appartient pas à $\\mathbb{Q}$.",
    options: [
      { text: "N'est pas entier", isCorrect: false },
      { text: "N'est pas décimal", isCorrect: false },
      { text: "N'appartient pas à $\\mathbb{Q}$", isCorrect: true },
      { text: "Est négatif", isCorrect: false },
    ],
  },
  {
    question: "Le nombre $\\pi$ est :",
    topic: "Les Ensembles de Nombres",
    difficulty: "Facile",
    explanation:
      "$\\pi$ est un nombre irrationnel (et même transcendant). Son développement décimal est infini et non périodique.",
    options: [
      { text: "Un nombre rationnel", isCorrect: false },
      { text: "Un nombre décimal", isCorrect: false },
      { text: "Un nombre irrationnel", isCorrect: true },
      { text: "Un nombre entier", isCorrect: false },
    ],
  },
  {
    question: "Tout entier relatif est-il un nombre décimal ?",
    topic: "Les Ensembles de Nombres",
    difficulty: "Facile",
    explanation:
      "Oui, car pour tout $n \\in \\mathbb{Z}$, on a $n = \\frac{n}{10^0}$, ce qui correspond bien à la définition des décimaux (d'où l'inclusion $\\mathbb{Z} \\subset \\mathbb{D}$).",
    options: [
      { text: "Oui, car $n = \\frac{n}{10^0}$", isCorrect: true },
      { text: "Non, car il n'a pas de virgule", isCorrect: false },
      { text: "Oui, car il est dans $\\mathbb{Z}$", isCorrect: false },
      { text: "Non, car il est dans $\\mathbb{N}$", isCorrect: false },
    ],
  },
  {
    question: "Tout nombre rationnel est-il un nombre décimal ?",
    topic: "Les Ensembles de Nombres",
    difficulty: "Facile",
    explanation:
      "Non, $\\mathbb{D} \\subset \\mathbb{Q}$ mais $\\mathbb{Q} \\not\\subset \\mathbb{D}$. Des rationnels comme $\\frac{1}{3}$ ou $\\frac{2}{7}$ ne sont pas des nombres décimaux.",
    options: [
      { text: "Oui, par définition", isCorrect: false },
      {
        text: "Non, par exemple $\\frac{1}{3}$ n'est pas décimal",
        isCorrect: true,
      },
      { text: "Oui, car $\\mathbb{Q} \\subset \\mathbb{D}$", isCorrect: false },
      { text: "Non, car certains sont négatifs", isCorrect: false },
    ],
  },
  {
    question: "Tout nombre décimal est-il un nombre rationnel ?",
    topic: "Les Ensembles de Nombres",
    difficulty: "Facile",
    explanation:
      "Oui, tout décimal s'écrit $\\frac{a}{10^p}$ avec $a \\in \\mathbb{Z}$ et $10^p \\in \\mathbb{Z}^*$, ce qui est un quotient d'entiers. Donc $\\mathbb{D} \\subset \\mathbb{Q}$.",
    options: [
      { text: "Oui, car $\\mathbb{D} \\subset \\mathbb{Q}$", isCorrect: true },
      { text: "Non, car certains ne sont pas des fractions", isCorrect: false },
      { text: "Oui, car $\\mathbb{Q} \\subset \\mathbb{D}$", isCorrect: false },
      {
        text: "Non, car $\\mathbb{D}$ contient des irrationnels",
        isCorrect: false,
      },
    ],
  },
  {
    question: "L'ensemble des nombres réels $\\mathbb{R}$ est constitué de :",
    topic: "Les Ensembles de Nombres",
    difficulty: "Facile",
    explanation:
      "Tout nombre réel est soit rationnel, soit irrationnel. $\\mathbb{R}$ est donc l'union disjointe de $\\mathbb{Q}$ et de l'ensemble des irrationnels.",
    options: [
      {
        text: "L'union de $\\mathbb{Q}$ et de l'ensemble des irrationnels",
        isCorrect: true,
      },
      {
        text: "L'intersection de $\\mathbb{Q}$ et de $\\mathbb{D}$",
        isCorrect: false,
      },
      { text: "Uniquement des nombres rationnels", isCorrect: false },
      { text: "Uniquement des nombres décimaux", isCorrect: false },
    ],
  },
  {
    question: "Quelle est l'écriture scientifique correcte d'un nombre ?",
    topic: "Les Ensembles de Nombres",
    difficulty: "Facile",
    explanation:
      "L'écriture scientifique d'un nombre non nul s'écrit sous la forme $a \\times 10^n$ où $1 \\le |a| < 10$ et $n \\in \\mathbb{Z}$.",
    options: [
      { text: "$a \\times 10^n$ avec $a \\in \\mathbb{Z}$", isCorrect: false },
      {
        text: "$a \\times 10^n$ avec $1 \\le |a| < 10$ et $n \\in \\mathbb{Z}$",
        isCorrect: true,
      },
      { text: "$a \\times 10^n$ avec $a > 10$", isCorrect: false },
      { text: "$a \\times 10^n$ avec $0 < a < 1$", isCorrect: false },
    ],
  },
  {
    question: "L'écriture scientifique du nombre $0{,}0045$ est :",
    topic: "Les Ensembles de Nombres",
    difficulty: "Facile",
    explanation:
      "En déplaçant la virgule de 3 rangs vers la droite pour obtenir un nombre entre 1 et 10 : $0{,}0045 = 4{,}5 \\times 10^{-3}$.",
    options: [
      { text: "$45 \\times 10^{-4}$", isCorrect: false },
      { text: "$4{,}5 \\times 10^{-3}$", isCorrect: true },
      { text: "$0{,}45 \\times 10^{-2}$", isCorrect: false },
      { text: "$4{,}5 \\times 10^3$", isCorrect: false },
    ],
  },
  {
    question: "Par convention, $10^{-n}$ est égal à :",
    topic: "Les Ensembles de Nombres",
    difficulty: "Facile",
    explanation:
      "Pour tout entier naturel $n$, l'inverse de la puissance s'écrit : $10^{-n} = \\frac{1}{10^n}$.",
    options: [
      { text: "$-10^n$", isCorrect: false },
      { text: "$\\frac{1}{10^n}$", isCorrect: true },
      { text: "$10 \\times n$", isCorrect: false },
      { text: "$0, n$", isCorrect: false },
    ],
  },
  {
    question: "L'identité remarquable $(a+b)^2$ est égale à :",
    topic: "Les Ensembles de Nombres",
    difficulty: "Facile",
    explanation:
      "En développant : $(a+b)^2 = (a+b)(a+b) = a^2 + ab + ba + b^2 = a^2 + 2ab + b^2$.",
    options: [
      { text: "$a^2 + b^2$", isCorrect: false },
      { text: "$a^2 + 2ab + b^2$", isCorrect: true },
      { text: "$a^2 - 2ab + b^2$", isCorrect: false },
      { text: "$a^2 + ab + b^2$", isCorrect: false },
    ],
  },
  {
    question: "L'identité remarquable $a^2 - b^2$ est égale à :",
    topic: "Les Ensembles de Nombres",
    difficulty: "Facile",
    explanation:
      "Il s'agit de la différence de deux carrés : $a^2 - b^2 = (a+b)(a-b)$.",
    options: [
      { text: "$(a-b)^2$", isCorrect: false },
      { text: "$(a+b)(a-b)$", isCorrect: true },
      { text: "$(a+b)^2$", isCorrect: false },
      { text: "$(a-b)(a-b)$", isCorrect: false },
    ],
  },
  {
    question: "L'identité remarquable $(a+b)^3$ est égale à :",
    topic: "Les Ensembles de Nombres",
    difficulty: "Moyen",
    explanation:
      "Formule du binôme au cube : $(a+b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$.",
    options: [
      { text: "$a^3 + b^3$", isCorrect: false },
      { text: "$a^3 + 3a^2b + 3ab^2 + b^3$", isCorrect: true },
      { text: "$a^3 - 3a^2b + 3ab^2 - b^3$", isCorrect: false },
      { text: "$a^3 + b^3 + 3ab$", isCorrect: false },
    ],
  },
  {
    question: "L'ensemble $\\mathbb{R}^*$ désigne :",
    topic: "Les Ensembles de Nombres",
    difficulty: "Facile",
    explanation:
      "L'astérisque $*$ indique l'exclusion de l'élément nul : $\\mathbb{R}^* = \\mathbb{R} \\setminus \\{0\\}$ (l'ensemble des nombres réels non nuls).",
    options: [
      { text: "L'ensemble des réels positifs", isCorrect: false },
      { text: "L'ensemble des réels non nuls", isCorrect: true },
      { text: "L'ensemble des réels négatifs", isCorrect: false },
      { text: "L'ensemble des entiers naturels non nuls", isCorrect: false },
    ],
  },
  {
    question: "L'ensemble $\\mathbb{Q}^+$ désigne :",
    topic: "Les Ensembles de Nombres",
    difficulty: "Facile",
    explanation:
      "Le signe $+$ désigne les nombres positifs ou nuls : $\\mathbb{Q}^+ = \\{x \\in \\mathbb{Q} \\mid x \\ge 0\\}$.",
    options: [
      { text: "Les rationnels négatifs", isCorrect: false },
      { text: "Les rationnels non nuls", isCorrect: false },
      { text: "Les rationnels positifs ou nuls", isCorrect: true },
      { text: "Les rationnels strictement positifs", isCorrect: false },
    ],
  },
  {
    question: "Le nombre $0{,}3333\\dots$ (périodique à l'infini) est :",
    topic: "Les Ensembles de Nombres",
    difficulty: "Facile",
    explanation:
      "Tout développement décimal infini périodique correspond à un nombre rationnel. Ici, $0{,}3333\\dots = \\frac{1}{3} \\in \\mathbb{Q}$.",
    options: [
      { text: "Un irrationnel", isCorrect: false },
      { text: "Un rationnel égal à $\\frac{1}{3}$", isCorrect: true },
      { text: "Un entier", isCorrect: false },
      { text: "Un décimal", isCorrect: false },
    ],
  },
  {
    question:
      "Si $x \\in \\mathbb{N}$ et $x \\in \\mathbb{Z}$, alors $x$ appartient à :",
    topic: "Les Ensembles de Nombres",
    difficulty: "Facile",
    explanation:
      "L'appartenance simultanée à deux ensembles correspond à leur intersection : $x \\in \\mathbb{N} \\cap \\mathbb{Z}$ (qui est égale à $\\mathbb{N}$ puisque $\\mathbb{N} \\subset \\mathbb{Z}$).",
    options: [
      { text: "$\\mathbb{N} \\cap \\mathbb{Z}$", isCorrect: true },
      { text: "$\\mathbb{N} \\cup \\mathbb{Z}$", isCorrect: false },
      { text: "$\\mathbb{Q} \\setminus \\mathbb{Z}$", isCorrect: false },
      { text: "$\\mathbb{R} \\setminus \\mathbb{Q}$", isCorrect: false },
    ],
  },
  {
    question: "La racine carrée d'un nombre réel positif $x$ est :",
    topic: "Les Ensembles de Nombres",
    difficulty: "Facile",
    explanation:
      "Par définition, pour tout réel positif $x$, $\\sqrt{x}$ est l'unique nombre réel positif ou nul dont le carré vaut $x$.",
    options: [
      { text: "Un nombre négatif", isCorrect: false },
      {
        text: "Un nombre positif ou nul dont le carré est $x$",
        isCorrect: true,
      },
      { text: "Toujours un entier", isCorrect: false },
      { text: "Toujours un irrationnel", isCorrect: false },
    ],
  },
  {
    question: "Quelle est la valeur de $10^0$ ?",
    topic: "Les Ensembles de Nombres",
    difficulty: "Facile",
    explanation:
      "Pour tout nombre réel non nul $a$, on a par convention algébrique $a^0 = 1$. En particulier, $10^0 = 1$.",
    options: [
      { text: "0", isCorrect: false },
      { text: "1", isCorrect: true },
      { text: "10", isCorrect: false },
      { text: "Indéfini", isCorrect: false },
    ],
  },
  {
    question: "Quel est le développement décimal de $\\frac{5}{8}$ ?",
    topic: "Les Ensembles de Nombres",
    difficulty: "Facile",
    explanation:
      "Comme $8 = 2^3$, on multiplie par $5^3 = 125$ : $\\frac{5 \\times 125}{8 \\times 125} = \\frac{625}{1000} = 0{,}625$.",
    options: [
      { text: "$0{,}625$", isCorrect: true },
      { text: "$0{,}58$", isCorrect: false },
      { text: "$0{,}625625\\dots$", isCorrect: false },
      { text: "$1{,}6$", isCorrect: false },
    ],
  },
  {
    question: "L'ensemble des irrationnels est souvent noté :",
    topic: "Les Ensembles de Nombres",
    difficulty: "Facile",
    explanation:
      "Les irrationnels étant tous les réels qui ne sont pas rationnels, on le note par la différence ensembliste : $\\mathbb{R} \\setminus \\mathbb{Q}$.",
    options: [
      { text: "$\\mathbb{R}^+$", isCorrect: false },
      { text: "$\\mathbb{R}^*$", isCorrect: false },
      { text: "$\\mathbb{R} \\setminus \\mathbb{Q}$", isCorrect: true },
      { text: "$\\mathbb{Q} \\setminus \\mathbb{D}$", isCorrect: false },
    ],
  },
  {
    question: "Si $a = \\sqrt{5} + 1$, alors $a^2$ est égal à :",
    topic: "Les Ensembles de Nombres",
    difficulty: "Facile",
    explanation:
      "$a^2 = (\\sqrt{5} + 1)^2 = (\\sqrt{5})^2 + 2(\\sqrt{5})(1) + 1^2 = 5 + 2\\sqrt{5} + 1 = 6 + 2\\sqrt{5}$.",
    options: [
      { text: "$6$", isCorrect: false },
      { text: "$6 + 2\\sqrt{5}$", isCorrect: true },
      { text: "$4 + 2\\sqrt{5}$", isCorrect: false },
      { text: "$5 + 2\\sqrt{5}$", isCorrect: false },
    ],
  },
];

async function main() {
  console.log(
    "Démarrage du seed pour l'examen des Ensembles de Nombres (Tronc Commun)...",
  );

  const exam = await prisma.qcmExam.upsert({
    where: { slug: "ensembles-de-nombres-tc" },
    update: {
      title: "Les Ensembles de Nombres (ℕ, ℤ, 𝔻, ℚ, ℝ)",
      description:
        "Évaluation diagnostique et de consolidation sur les inclusions d'ensembles, les nombres décimaux, rationnels, irrationnels, l'écriture scientifique et les identités remarquables pour le Tronc Commun.",
      level: SchoolLevel.TRONC_COMMUN,
      timeLimitMinutes: 45,
      published: true,
    },
    create: {
      slug: "ensembles-de-nombres-tc",
      title: "Les Ensembles de Nombres (ℕ, ℤ, 𝔻, ℚ, ℝ)",
      description:
        "Évaluation diagnostique et de consolidation sur les inclusions d'ensembles, les nombres décimaux, rationnels, irrationnels, l'écriture scientifique et les identités remarquables pour le Tronc Commun.",
      level: SchoolLevel.TRONC_COMMUN,
      timeLimitMinutes: 45,
      published: true,
    },
  });

  console.log(`Examen initialisé : ${exam.title} (ID: ${exam.id})`);

  // Nettoyage des relations existantes pour éviter les doublons
  await prisma.qcmExamQuestion.deleteMany({
    where: { examId: exam.id },
  });

  for (let i = 0; i < QUESTIONS_DATA.length; i++) {
    const qData = QUESTIONS_DATA[i];

    const question = await prisma.qcmQuestion.create({
      data: {
        topic: qData.topic,
        difficulty: qData.difficulty,
        question: qData.question,
        explanation: qData.explanation,
        // Supprimez la ligne level ici : le niveau est déjà sur l'examen (exam.level)
        options: {
          create: qData.options.map((opt) => ({
            text: opt.text,
            isCorrect: opt.isCorrect,
          })),
        },
      },
    });

    await prisma.qcmExamQuestion.create({
      data: {
        examId: exam.id,
        questionId: question.id,
        order: i + 1,
      },
    });
  }

  console.log(
    `Succès : 30 questions insérées et liées à l'examen "${exam.title}".`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
