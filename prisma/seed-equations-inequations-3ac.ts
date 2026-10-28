import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

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
    question: "Qu'est-ce qu'une équation ?",
    topic: "Équations et Inéquations",
    difficulty: "Facile",
    explanation:
      "Une équation est une égalité comportant une ou plusieurs lettres représentant des nombres inconnus.",
    options: [
      {
        text: "Une égalité contenant une ou plusieurs inconnues",
        isCorrect: true,
      },
      { text: "Une égalité qui est toujours vraie", isCorrect: false },
      { text: "Une expression mathématique sans signe égal", isCorrect: false },
      { text: "Une inégalité entre deux nombres", isCorrect: false },
    ],
  },
  {
    question: "Quelle est la solution de l'équation $x + 5 = 2$ ?",
    topic: "Équations et Inéquations",
    difficulty: "Facile",
    explanation: "En soustrayant 5 de chaque côté : $x = 2 - 5 = -3$.",
    options: [
      { text: "$x = -3$", isCorrect: true },
      { text: "$x = 7$", isCorrect: false },
      { text: "$x = 3$", isCorrect: false },
      { text: "$x = -7$", isCorrect: false },
    ],
  },
  {
    question: "Quelle est la solution de l'équation $2x = 10$ ?",
    topic: "Équations et Inéquations",
    difficulty: "Facile",
    explanation:
      "En divisant les deux membres par 2 : $x = \\frac{10}{2} = 5$.",
    options: [
      { text: "$x = 5$", isCorrect: true },
      { text: "$x = 8$", isCorrect: false },
      { text: "$x = 12$", isCorrect: false },
      { text: "$x = 20$", isCorrect: false },
    ],
  },
  {
    question: "Quelle est la solution de l'équation $-3x = 12$ ?",
    topic: "Équations et Inéquations",
    difficulty: "Facile",
    explanation: "En divisant par $-3$ : $x = \\frac{12}{-3} = -4$.",
    options: [
      { text: "$x = -4$", isCorrect: true },
      { text: "$x = 4$", isCorrect: false },
      { text: "$x = 9$", isCorrect: false },
      { text: "$x = -9$", isCorrect: false },
    ],
  },
  {
    question: "Quelle est la solution de l'équation $3(x - 2) = 0$ ?",
    topic: "Équations et Inéquations",
    difficulty: "Facile",
    explanation: "Comme $3 \\neq 0$, on a $x - 2 = 0$, soit $x = 2$.",
    options: [
      { text: "$x = 2$", isCorrect: true },
      { text: "$x = -2$", isCorrect: false },
      { text: "$x = 0$", isCorrect: false },
      { text: "$x = 6$", isCorrect: false },
    ],
  },
  {
    question: "Résoudre l'équation $2x + 3 = x - 1$ donne :",
    topic: "Équations et Inéquations",
    difficulty: "Facile",
    explanation:
      "On regroupe les termes en $x$ à gauche et les constantes à droite : $2x - x = -1 - 3$, ce qui donne $x = -4$.",
    options: [
      { text: "$x = -4$", isCorrect: true },
      { text: "$x = 2$", isCorrect: false },
      { text: "$x = 4$", isCorrect: false },
      { text: "$x = -2$", isCorrect: false },
    ],
  },
  {
    question: "La solution de l'équation $2x - 3 = -x + 15$ est :",
    topic: "Équations et Inéquations",
    difficulty: "Facile",
    explanation:
      "$2x + x = 15 + 3 \\implies 3x = 18 \\implies x = \\frac{18}{3} = 6$.",
    options: [
      { text: "$x = 6$", isCorrect: true },
      { text: "$x = 4$", isCorrect: false },
      { text: "$x = 12$", isCorrect: false },
      { text: "$x = 18$", isCorrect: false },
    ],
  },
  {
    question:
      "Résoudre l'équation $7x + 3(1 - 5x) = 4x - 4(3x - 3) - 9$ donne :",
    topic: "Équations et Inéquations",
    difficulty: "Moyen",
    explanation:
      "On développe les deux membres : $7x + 3 - 15x = 4x - 12x + 12 - 9 \\implies -8x + 3 = -8x + 3 \\implies -8x + 8x = 3 - 3 \\implies 0x = 0$. Tous les réels sont solutions (en particulier $x = 0$, mais l'égalité est vérifiée pour tout $x$).",
    options: [
      { text: "$x = 0$", isCorrect: true },
      { text: "$x = 1$", isCorrect: false },
      { text: "$x = 2$", isCorrect: false },
      { text: "$x = -1$", isCorrect: false },
    ],
  },
  {
    question: "Que signifie la propriété du « produit nul » ?",
    topic: "Équations et Inéquations",
    difficulty: "Facile",
    explanation:
      "Un produit de facteurs est nul si et seulement si l'un au moins des facteurs est égal à 0 : $A \\times B = 0 \\iff A = 0$ ou $B = 0$.",
    options: [
      {
        text: "Un produit est nul si et seulement si l'un de ses facteurs au moins est nul",
        isCorrect: true,
      },
      {
        text: "Un produit est nul si et seulement si tous ses facteurs sont nuls",
        isCorrect: false,
      },
      {
        text: "Un produit est nul si tous ses facteurs sont non nuls",
        isCorrect: false,
      },
      { text: "Un produit ne peut jamais être nul", isCorrect: false },
    ],
  },
  {
    question: "Les solutions de l'équation $(2x - 1)(3 + x) = 0$ sont :",
    topic: "Équations et Inéquations",
    difficulty: "Facile",
    explanation:
      "$(2x - 1)(3 + x) = 0 \\iff 2x - 1 = 0$ ou $3 + x = 0$, d'où $x = \\frac{1}{2}$ ou $x = -3$.",
    options: [
      { text: "$x = \\frac{1}{2}$ et $x = -3$", isCorrect: true },
      { text: "$x = -\\frac{1}{2}$ et $x = 3$", isCorrect: false },
      { text: "$x = 2$ et $x = -3$", isCorrect: false },
      { text: "$x = \\frac{1}{2}$ et $x = 3$", isCorrect: false },
    ],
  },
  {
    question:
      "En factorisant $(x + 1)(x - 3) - (x + 1)(2x - 1) = 0$, on obtient :",
    topic: "Équations et Inéquations",
    difficulty: "Moyen",
    explanation:
      "On factorise par le facteur commun $(x + 1)$ : $(x + 1)[(x - 3) - (2x - 1)] = (x + 1)(x - 3 - 2x + 1) = (x + 1)(-x - 2) = 0$.",
    options: [
      { text: "$(x + 1)(-x - 2) = 0$", isCorrect: true },
      { text: "$(x + 1)(-x - 4) = 0$", isCorrect: false },
      { text: "$(x + 1)(3x - 4) = 0$", isCorrect: false },
      { text: "$(x + 1)(x - 2) = 0$", isCorrect: false },
    ],
  },
  {
    question: "Le développement de l'identité remarquable $(x + 3)^2$ est :",
    topic: "Équations et Inéquations",
    difficulty: "Facile",
    explanation:
      "$(a + b)^2 = a^2 + 2ab + b^2$, donc $(x + 3)^2 = x^2 + 2(x)(3) + 3^2 = x^2 + 6x + 9$.",
    options: [
      { text: "$x^2 + 6x + 9$", isCorrect: true },
      { text: "$x^2 + 9$", isCorrect: false },
      { text: "$x^2 - 6x + 9$", isCorrect: false },
      { text: "$x^2 + 3x + 9$", isCorrect: false },
    ],
  },
  {
    question: "Le développement de $(2x - 1)^2$ est :",
    topic: "Équations et Inéquations",
    difficulty: "Facile",
    explanation:
      "$(a - b)^2 = a^2 - 2ab + b^2$, donc $(2x - 1)^2 = (2x)^2 - 2(2x)(1) + 1^2 = 4x^2 - 4x + 1$.",
    options: [
      { text: "$4x^2 - 4x + 1$", isCorrect: true },
      { text: "$4x^2 - 2x + 1$", isCorrect: false },
      { text: "$2x^2 - 4x + 1$", isCorrect: false },
      { text: "$4x^2 + 4x + 1$", isCorrect: false },
    ],
  },
  {
    question: "La factorisation de $x^2 - 9$ est :",
    topic: "Équations et Inéquations",
    difficulty: "Facile",
    explanation:
      "En utilisant l'identité remarquable $a^2 - b^2 = (a - b)(a + b)$, avec $9 = 3^2$ : $x^2 - 9 = (x - 3)(x + 3)$.",
    options: [
      { text: "$(x - 3)(x + 3)$", isCorrect: true },
      { text: "$(x - 3)^2$", isCorrect: false },
      { text: "$(x + 3)^2$", isCorrect: false },
      { text: "$(x - 9)(x + 1)$", isCorrect: false },
    ],
  },
  {
    question:
      "La factorisation de l'expression $A = (x - 1)(x + 1) + 4(x + 1)$ est :",
    topic: "Équations et Inéquations",
    difficulty: "Moyen",
    explanation:
      "On extrait le facteur commun $(x + 1)$ : $A = (x + 1)[(x - 1) + 4] = (x + 1)(x + 3)$.",
    options: [
      { text: "$(x + 1)(x + 3)$", isCorrect: true },
      { text: "$(x + 1)(x - 3)$", isCorrect: false },
      { text: "$(x - 1)(x + 5)$", isCorrect: false },
      { text: "$(x + 1)(x + 5)$", isCorrect: false },
    ],
  },
  {
    question: "Les solutions de l'équation $9x^2 - 36 = 0$ sont :",
    topic: "Équations et Inéquations",
    difficulty: "Moyen",
    explanation:
      "$9x^2 = 36 \\implies x^2 = \\frac{36}{9} = 4$. Comme $4 > 0$, l'équation admet deux solutions opposées : $x = 2$ ou $x = -2$.",
    options: [
      { text: "$x = 2$ et $x = -2$", isCorrect: true },
      { text: "$x = 4$ et $x = -4$", isCorrect: false },
      { text: "$x = 6$ et $x = -6$", isCorrect: false },
      { text: "$x = 3$ et $x = -3$", isCorrect: false },
    ],
  },
  {
    question: "Les solutions de l'équation $x^2 - 5 = 0$ sont :",
    topic: "Équations et Inéquations",
    difficulty: "Facile",
    explanation:
      "$x^2 = 5$. Comme $5 > 0$, les deux solutions réelles sont $x = \\sqrt{5}$ et $x = -\\sqrt{5}$.",
    options: [
      { text: "$x = \\sqrt{5}$ et $x = -\\sqrt{5}$", isCorrect: true },
      { text: "$x = 5$ et $x = -5$", isCorrect: false },
      { text: "$x = 25$ et $x = -25$", isCorrect: false },
      { text: "$x = 2\\sqrt{5}$ et $x = -2\\sqrt{5}$", isCorrect: false },
    ],
  },
  {
    question:
      "Pour résoudre une équation comportant l'inconnue au dénominateur, il faut d'abord :",
    topic: "Équations et Inéquations",
    difficulty: "Facile",
    explanation:
      "On ne peut pas diviser par zéro : il est indispensable de poser les conditions d'existence (valeurs interdites qui annulent les dénominateurs).",
    options: [
      {
        text: "Déterminer les valeurs interdites (dénominateur non nul)",
        isCorrect: true,
      },
      { text: "Multiplier par le dénominateur", isCorrect: false },
      { text: "Additionner les numérateurs", isCorrect: false },
      { text: "Simplifier les fractions", isCorrect: false },
    ],
  },
  {
    question:
      "La solution de l'équation $\\frac{x}{2} + 4 = \\frac{x}{3}$ est :",
    topic: "Équations et Inéquations",
    difficulty: "Moyen",
    explanation:
      "On met au même dénominateur (6) : $\\frac{3x}{6} + \\frac{24}{6} = \\frac{2x}{6} \\implies 3x + 24 = 2x \\implies 3x - 2x = -24 \\implies x = -24$.",
    options: [
      { text: "$x = -24$", isCorrect: true },
      { text: "$x = 24$", isCorrect: false },
      { text: "$x = -12$", isCorrect: false },
      { text: "$x = 12$", isCorrect: false },
    ],
  },
  {
    question:
      "La solution de l'équation $\\frac{3x - 5}{3} - \frac{2x}{4} = \\frac{x}{2} + \\frac{1}{12}$ est :",
    topic: "Équations et Inéquations",
    difficulty: "Difficile",
    explanation:
      "On réduit au même dénominateur commun (12) : $\\frac{4(3x - 5)}{12} - \\frac{3(2x)}{12} = \\frac{6x}{12} + \\frac{1}{12} \\implies 12x - 20 - 6x = 6x + 1 \\implies 6x - 20 = 6x + 1 \\implies 0x = 21$. Cette équation n'admet aucune solution réelle.",
    options: [
      { text: "L'équation n'admet aucune solution", isCorrect: true },
      { text: "$x = 21$", isCorrect: false },
      { text: "$x = 7$", isCorrect: false },
      { text: "$x = -7$", isCorrect: false },
    ],
  },
  {
    question: "La solution de l'équation $2x + \\sqrt{2} = 0$ est :",
    topic: "Équations et Inéquations",
    difficulty: "Facile",
    explanation: "$2x = -\\sqrt{2} \\implies x = -\\frac{\\sqrt{2}}{2}$.",
    options: [
      { text: "$x = -\\frac{\\sqrt{2}}{2}$", isCorrect: true },
      { text: "$x = \\sqrt{2}$", isCorrect: false },
      { text: "$x = -\\sqrt{2}$", isCorrect: false },
      { text: "$x = \\frac{\\sqrt{2}}{2}$", isCorrect: false },
    ],
  },
  {
    question: "La solution de l'équation $\\sqrt{2}x = x + 5$ est :",
    topic: "Équations et Inéquations",
    difficulty: "Moyen",
    explanation:
      "$\\sqrt{2}x - x = 5 \\implies x(\\sqrt{2} - 1) = 5 \\implies x = \\frac{5}{\\sqrt{2} - 1}$.",
    options: [
      { text: "$x = \\frac{5}{\\sqrt{2} - 1}$", isCorrect: true },
      { text: "$x = \\frac{5}{\\sqrt{2} + 1}$", isCorrect: false },
      { text: "$x = 5\\sqrt{2}$", isCorrect: false },
      { text: "$x = \\frac{\\sqrt{2}}{5}$", isCorrect: false },
    ],
  },
  {
    question:
      "La solution de l'équation $\\sqrt{5}x - 1 = -x + \\sqrt{5}$ est :",
    topic: "Équations et Inéquations",
    difficulty: "Moyen",
    explanation:
      "$\\sqrt{5}x + x = \\sqrt{5} + 1 \\implies x(\\sqrt{5} + 1) = \\sqrt{5} + 1$. Comme $\\sqrt{5} + 1 \\neq 0$, on simplifie par $\\sqrt{5} + 1$ : $x = 1$.",
    options: [
      { text: "$x = 1$", isCorrect: true },
      { text: "$x = -1$", isCorrect: false },
      { text: "$x = \\sqrt{5}$", isCorrect: false },
      { text: "$x = -\\sqrt{5}$", isCorrect: false },
    ],
  },
  {
    question:
      "Si on multiplie ou divise les deux membres d'une inéquation par un nombre négatif :",
    topic: "Équations et Inéquations",
    difficulty: "Facile",
    explanation:
      "Multiplier ou diviser par un nombre strictement négatif inverse toujours le sens de l'inégalité ($<$ devient $>$, et inversement).",
    options: [
      { text: "Le sens de l'inégalité change", isCorrect: true },
      { text: "Le sens de l'inégalité ne change pas", isCorrect: false },
      { text: "L'inéquation n'a plus de solution", isCorrect: false },
      { text: "L'inéquation devient une équation", isCorrect: false },
    ],
  },
  {
    question: "L'ensemble des solutions de l'inéquation $-4x + 12 > 0$ est :",
    topic: "Équations et Inéquations",
    difficulty: "Facile",
    explanation:
      "$-4x > -12$. En divisant par $-4$ (nombre négatif), le sens s'inverse : $x < \\frac{-12}{-4} \\implies x < 3$.",
    options: [
      { text: "$x < 3$", isCorrect: true },
      { text: "$x > 3$", isCorrect: false },
      { text: "$x > -3$", isCorrect: false },
      { text: "$x < -3$", isCorrect: false },
    ],
  },
  {
    question: "Les solutions de l'inéquation $2x - 5 \\ge x + 1$ sont :",
    topic: "Équations et Inéquations",
    difficulty: "Facile",
    explanation:
      "$2x - x \\ge 1 + 5 \\implies x \\ge 6$. Tous les nombres supérieurs ou égaux à 6 sont solutions.",
    options: [
      { text: "$x \\ge 6$", isCorrect: true },
      { text: "$x \\le 6$", isCorrect: false },
      { text: "$x \\ge 4$", isCorrect: false },
      { text: "$x \\le 4$", isCorrect: false },
    ],
  },
  {
    question: "Les solutions de l'inéquation $-4(x - 1) > 7$ sont :",
    topic: "Équations et Inéquations",
    difficulty: "Moyen",
    explanation:
      "$-4x + 4 > 7 \\implies -4x > 7 - 4 \\implies -4x > 3$. En divisant par $-4$ (négatif), on inverse le sens : $x < -\\frac{3}{4}$.",
    options: [
      { text: "$x < -\\frac{3}{4}$", isCorrect: true },
      { text: "$x > -\\frac{3}{4}$", isCorrect: false },
      { text: "$x < \\frac{11}{4}$", isCorrect: false },
      { text: "$x > \\frac{11}{4}$", isCorrect: false },
    ],
  },
];

async function main() {
  console.log(
    "Démarrage du seed pour l'examen Équations et Inéquations (3AC)...",
  );

  const exam = await prisma.qcmExam.upsert({
    where: { slug: "equations-inequations-3ac" },
    update: {
      title: "Équations et Inéquations",
      description:
        "Évaluation didactique complète sur la résolution des équations du premier degré, équations produit-nul, factorisation par identités remarquables et inéquations pour la 3ème Année Collégiale.",
      timeLimitMinutes: 40,
      published: true,
    },
    create: {
      slug: "equations-inequations-3ac",
      title: "Équations et Inéquations",
      description:
        "Évaluation didactique complète sur la résolution des équations du premier degré, équations produit-nul, factorisation par identités remarquables et inéquations pour la 3ème Année Collégiale.",
      timeLimitMinutes: 40,
      published: true,
    },
  });

  console.log(`Examen initialisé : ${exam.title} (ID: ${exam.id})`);

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
    `Succès : ${QUESTIONS_DATA.length} questions insérées et liées à l'examen "${exam.title}".`,
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
