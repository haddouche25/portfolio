import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

interface SeedQuestion {
  topic: string;
  difficulty: string;
  question: string;
  explanation: string;
  options: {
    text: string;
    isCorrect: boolean;
  }[];
}

const QUESTIONS_DATA: SeedQuestion[] = [
  // =========================================================================
  // PARTIE 1 : POLYNÔMES ET DÉNOMINATEUR DU 1ER DEGRÉ (Q1 à Q5)
  // =========================================================================
  {
    topic: "Domaine de définition - Polynômes",
    difficulty: "Facile",
    question:
      "Parmi les fonctions suivantes, laquelle est définie sur $\\mathbb{R}$ tout entier ?",
    explanation:
      "Une fonction polynôme est définie sur $\\mathbb{R}$. Ici $f(x) = x^2 - 4x + 7$ est un polynôme, alors que $\\dfrac{1}{x-1}$, $\\sqrt{x}$ et $\\dfrac{1}{x^2}$ posent des restrictions ($x \\neq 1$, $x \\ge 0$, $x \\neq 0$).",
    options: [
      { text: "$f(x) = x^2 - 4x + 7$", isCorrect: true },
      { text: "$g(x) = \\dfrac{1}{x-1}$", isCorrect: false },
      { text: "$h(x) = \\sqrt{x}$", isCorrect: false },
      { text: "$k(x) = \\dfrac{1}{x^2}$", isCorrect: false },
    ],
  },
  {
    topic: "Domaine de définition - Polynômes",
    difficulty: "Facile",
    question: "Quel est le domaine de définition de $f(x) = x^3 - 2x + 5$ ?",
    explanation:
      "$f$ est une fonction polynôme : aucune condition n'est nécessaire. Donc $D_f = \\mathbb{R}$.",
    options: [
      { text: "$\\mathbb{R}$", isCorrect: true },
      { text: "$\\mathbb{R}^*$", isCorrect: false },
      { text: "$[0, +\\infty[$", isCorrect: false },
      { text: "$\\mathbb{R} \\setminus \\{5\\}$", isCorrect: false },
    ],
  },
  {
    topic: "Domaine de définition - Dénominateur 1er degré",
    difficulty: "Facile",
    question:
      "Déterminer le domaine de définition de $f(x) = \\dfrac{1}{x - 3}$ :",
    explanation:
      "$f(x)$ existe si et seulement si $x - 3 \\neq 0$, c'est-à-dire $x \\neq 3$. Donc $D_f = \\mathbb{R} \\setminus \\{3\\}$.",
    options: [
      { text: "$\\mathbb{R} \\setminus \\{3\\}$", isCorrect: true },
      { text: "$\\mathbb{R} \\setminus \\{-3\\}$", isCorrect: false },
      { text: "$]3, +\\infty[$", isCorrect: false },
      { text: "$\\mathbb{R}$", isCorrect: false },
    ],
  },
  {
    topic: "Domaine de définition - Dénominateur 1er degré",
    difficulty: "Facile",
    question:
      "Déterminer le domaine de définition de $f(x) = \\dfrac{2x + 1}{x + 4}$ :",
    explanation:
      "Seul le dénominateur impose une condition : $x + 4 \\neq 0 \\iff x \\neq -4$. Le numérateur peut s'annuler sans problème. Donc $D_f = \\mathbb{R} \\setminus \\{-4\\}$.",
    options: [
      { text: "$\\mathbb{R} \\setminus \\{-4\\}$", isCorrect: true },
      { text: "$\\mathbb{R} \\setminus \\{4\\}$", isCorrect: false },
      {
        text: "$\\mathbb{R} \\setminus \\left\\{-\\dfrac{1}{2}\\right\\}$",
        isCorrect: false,
      },
      {
        text: "$\\mathbb{R} \\setminus \\left\\{-4, -\\dfrac{1}{2}\\right\\}$",
        isCorrect: false,
      },
    ],
  },
  {
    topic: "Domaine de définition - Dénominateur 1er degré",
    difficulty: "Facile",
    question:
      "Déterminer le domaine de définition de $f(x) = \\dfrac{x + 2}{2x - 6}$ :",
    explanation:
      "On résout $2x - 6 = 0 \\iff x = 3$. Donc $D_f = \\mathbb{R} \\setminus \\{3\\}$ (et non $6$, il faut diviser par $2$).",
    options: [
      { text: "$\\mathbb{R} \\setminus \\{3\\}$", isCorrect: true },
      { text: "$\\mathbb{R} \\setminus \\{6\\}$", isCorrect: false },
      { text: "$\\mathbb{R} \\setminus \\{-2\\}$", isCorrect: false },
      { text: "$\\mathbb{R} \\setminus \\{-2, 3\\}$", isCorrect: false },
    ],
  },

  // =========================================================================
  // PARTIE 2 : RACINE D'UN POLYNÔME DU 1ER DEGRÉ ET DÉNOMINATEUR DU 2ND DEGRÉ (Q6 à Q10)
  // =========================================================================
  {
    topic: "Domaine de définition - Racine du 1er degré",
    difficulty: "Moyen",
    question:
      "Déterminer le domaine de définition de $f(x) = \\sqrt{2x - 4}$ :",
    explanation:
      "$f(x)$ existe si et seulement si $2x - 4 \\ge 0 \\iff x \\ge 2$. Donc $D_f = [2, +\\infty[$ (le crochet est fermé en $2$ car $\\sqrt{0}$ existe).",
    options: [
      { text: "$[2, +\\infty[$", isCorrect: true },
      { text: "$]2, +\\infty[$", isCorrect: false },
      { text: "$]-\\infty, 2]$", isCorrect: false },
      { text: "$[-2, +\\infty[$", isCorrect: false },
    ],
  },
  {
    topic: "Domaine de définition - Racine du 1er degré",
    difficulty: "Moyen",
    question:
      "Déterminer le domaine de définition de $f(x) = \\sqrt{5 - 3x}$ :",
    explanation:
      "On résout $5 - 3x \\ge 0 \\iff -3x \\ge -5 \\iff x \\le \\dfrac{5}{3}$ (le sens de l'inégalité change en divisant par un nombre négatif). Donc $D_f = \\left]-\\infty, \\dfrac{5}{3}\\right]$.",
    options: [
      { text: "$\\left]-\\infty, \\dfrac{5}{3}\\right]$", isCorrect: true },
      { text: "$\\left[\\dfrac{5}{3}, +\\infty\\right[$", isCorrect: false },
      { text: "$\\left]-\\infty, \\dfrac{5}{3}\\right[$", isCorrect: false },
      { text: "$\\left]-\\infty, -\\dfrac{5}{3}\\right]$", isCorrect: false },
    ],
  },
  {
    topic: "Domaine de définition - Dénominateur 2nd degré",
    difficulty: "Moyen",
    question:
      "Déterminer le domaine de définition de $f(x) = \\dfrac{1}{x^2 - 9}$ :",
    explanation:
      "On résout $x^2 - 9 = 0 \\iff (x-3)(x+3) = 0 \\iff x = 3$ ou $x = -3$. Donc $D_f = \\mathbb{R} \\setminus \\{-3, 3\\}$.",
    options: [
      { text: "$\\mathbb{R} \\setminus \\{-3, 3\\}$", isCorrect: true },
      { text: "$\\mathbb{R} \\setminus \\{3\\}$", isCorrect: false },
      { text: "$\\mathbb{R} \\setminus \\{9\\}$", isCorrect: false },
      { text: "$]-3, 3[$", isCorrect: false },
    ],
  },
  {
    topic: "Domaine de définition - Dénominateur 2nd degré",
    difficulty: "Moyen",
    question:
      "Quel est le domaine de définition de $f(x) = \\dfrac{1}{x^2 + 4}$ ?",
    explanation:
      "Piège ! $x^2 + 4 \\ge 4 > 0$ pour tout réel $x$ : le dénominateur ne s'annule jamais (l'équation $x^2 = -4$ n'a pas de solution). Donc $D_f = \\mathbb{R}$.",
    options: [
      { text: "$\\mathbb{R}$", isCorrect: true },
      { text: "$\\mathbb{R} \\setminus \\{-2, 2\\}$", isCorrect: false },
      { text: "$\\mathbb{R} \\setminus \\{2\\}$", isCorrect: false },
      { text: "$\\mathbb{R}^*$", isCorrect: false },
    ],
  },
  {
    topic: "Domaine de définition - Dénominateur 2nd degré",
    difficulty: "Moyen",
    question:
      "Déterminer le domaine de définition de $f(x) = \\dfrac{x + 1}{x^2 - 5x + 6}$ :",
    explanation:
      "$\\Delta = 25 - 24 = 1$, donc $x_1 = \\dfrac{5 - 1}{2} = 2$ et $x_2 = \\dfrac{5 + 1}{2} = 3$. Le dénominateur s'annule en $2$ et $3$ : $D_f = \\mathbb{R} \\setminus \\{2, 3\\}$. La valeur $-1$ annule le numérateur, pas le dénominateur.",
    options: [
      { text: "$\\mathbb{R} \\setminus \\{2, 3\\}$", isCorrect: true },
      { text: "$\\mathbb{R} \\setminus \\{-1, 2, 3\\}$", isCorrect: false },
      { text: "$\\mathbb{R} \\setminus \\{-2, -3\\}$", isCorrect: false },
      { text: "$\\mathbb{R} \\setminus \\{5, 6\\}$", isCorrect: false },
    ],
  },

  // =========================================================================
  // PARTIE 3 : RACINE D'UN POLYNÔME DU 2ND DEGRÉ (Q11 à Q13)
  // =========================================================================
  {
    topic: "Domaine de définition - Racine du 2nd degré",
    difficulty: "Moyen",
    question:
      "Déterminer le domaine de définition de $f(x) = \\sqrt{x^2 - 4}$ :",
    explanation:
      "On résout $x^2 - 4 \\ge 0 \\iff (x-2)(x+2) \\ge 0$. Le trinôme est positif à l'extérieur des racines : $D_f = ]-\\infty, -2] \\cup [2, +\\infty[$.",
    options: [
      {
        text: "$]-\\infty, -2] \\cup [2, +\\infty[$",
        isCorrect: true,
      },
      { text: "$[-2, 2]$", isCorrect: false },
      {
        text: "$]-\\infty, -2[ \\cup ]2, +\\infty[$",
        isCorrect: false,
      },
      { text: "$[2, +\\infty[$", isCorrect: false },
    ],
  },
  {
    topic: "Domaine de définition - Racine du 2nd degré",
    difficulty: "Moyen",
    question:
      "Déterminer le domaine de définition de $f(x) = \\sqrt{x^2 - 3x + 2}$ :",
    explanation:
      "$x^2 - 3x + 2 = (x-1)(x-2)$ (racines $1$ et $2$). Le coefficient de $x^2$ est positif, donc le trinôme est $\\ge 0$ à l'extérieur des racines : $D_f = ]-\\infty, 1] \\cup [2, +\\infty[$.",
    options: [
      {
        text: "$]-\\infty, 1] \\cup [2, +\\infty[$",
        isCorrect: true,
      },
      { text: "$[1, 2]$", isCorrect: false },
      {
        text: "$]-\\infty, 1[ \\cup ]2, +\\infty[$",
        isCorrect: false,
      },
      { text: "$[2, +\\infty[$", isCorrect: false },
    ],
  },
  {
    topic: "Domaine de définition - Racine du 2nd degré",
    difficulty: "Moyen",
    question:
      "Quel est le domaine de définition de $f(x) = \\sqrt{x^2 + x + 1}$ ?",
    explanation:
      "$\\Delta = 1 - 4 = -3 < 0$ et le coefficient de $x^2$ est positif : $x^2 + x + 1 > 0$ pour tout réel $x$. La racine existe toujours, donc $D_f = \\mathbb{R}$.",
    options: [
      { text: "$\\mathbb{R}$", isCorrect: true },
      { text: "$[-1, +\\infty[$", isCorrect: false },
      { text: "$\\varnothing$", isCorrect: false },
      { text: "$\\mathbb{R} \\setminus \\{-1\\}$", isCorrect: false },
    ],
  },

  // =========================================================================
  // PARTIE 4 : RACINE AU DÉNOMINATEUR ET EXPRESSIONS MIXTES (Q14 à Q15)
  // =========================================================================
  {
    topic: "Domaine de définition - Racine au dénominateur",
    difficulty: "Difficile",
    question:
      "Déterminer le domaine de définition de $f(x) = \\dfrac{1}{\\sqrt{x - 1}}$ :",
    explanation:
      "La racine doit exister ($x - 1 \\ge 0$) ET le dénominateur doit être non nul ($\\sqrt{x-1} \\neq 0 \\iff x \\neq 1$). On obtient donc $x - 1 > 0$, soit $D_f = ]1, +\\infty[$ (borne ouverte).",
    options: [
      { text: "$]1, +\\infty[$", isCorrect: true },
      { text: "$[1, +\\infty[$", isCorrect: false },
      { text: "$\\mathbb{R} \\setminus \\{1\\}$", isCorrect: false },
      { text: "$]-\\infty, 1[$", isCorrect: false },
    ],
  },
  {
    topic: "Domaine de définition - Expressions mixtes",
    difficulty: "Difficile",
    question:
      "Déterminer le domaine de définition de $f(x) = \\dfrac{\\sqrt{x + 3}}{x - 1}$ :",
    explanation:
      "Deux conditions : $x + 3 \\ge 0 \\iff x \\ge -3$ (existence de la racine) et $x - 1 \\neq 0 \\iff x \\neq 1$ (dénominateur). Donc $D_f = [-3, +\\infty[ \\setminus \\{1\\} = [-3, 1[ \\cup ]1, +\\infty[$.",
    options: [
      { text: "$[-3, 1[ \\cup ]1, +\\infty[$", isCorrect: true },
      { text: "$[-3, +\\infty[$", isCorrect: false },
      { text: "$]-3, 1[ \\cup ]1, +\\infty[$", isCorrect: false },
      { text: "$\\mathbb{R} \\setminus \\{-3, 1\\}$", isCorrect: false },
    ],
  },

  // =========================================================================
  // PARTIE 5 : RACINE DE A×B ET RACINE DE A/B (Q16 à Q18)
  // =========================================================================
  {
    topic: "Domaine de définition - Racine de A×B",
    difficulty: "Difficile",
    question:
      "Déterminer le domaine de définition de $f(x) = \\sqrt{(2 - x)(x + 3)}$ :",
    explanation:
      "Il faut $(2-x)(x+3) \\ge 0$. Développé : $-x^2 - x + 6$, dont le coefficient dominant est négatif. Le trinôme est donc positif **entre** les racines $-3$ et $2$ : $D_f = [-3, 2]$.",
    options: [
      { text: "$[-3, 2]$", isCorrect: true },
      {
        text: "$]-\\infty, -3] \\cup [2, +\\infty[$",
        isCorrect: false,
      },
      { text: "$]-3, 2[$", isCorrect: false },
      { text: "$[-2, 3]$", isCorrect: false },
    ],
  },
  {
    topic: "Domaine de définition - Racine de A/B",
    difficulty: "Difficile",
    question:
      "Déterminer le domaine de définition de $f(x) = \\sqrt{\\dfrac{x - 2}{x + 1}}$ :",
    explanation:
      "Il faut $\\dfrac{x-2}{x+1} \\ge 0$ avec $x \\neq -1$. Tableau de signes : le quotient est positif pour $x < -1$ et pour $x \\ge 2$ (il s'annule en $2$). La valeur $-1$ est exclue (dénominateur nul). Donc $D_f = ]-\\infty, -1[ \\cup [2, +\\infty[$.",
    options: [
      {
        text: "$]-\\infty, -1[ \\cup [2, +\\infty[$",
        isCorrect: true,
      },
      {
        text: "$]-\\infty, -1] \\cup [2, +\\infty[$",
        isCorrect: false,
      },
      { text: "$]-1, 2]$", isCorrect: false },
      { text: "$\\mathbb{R} \\setminus \\{-1, 2\\}$", isCorrect: false },
    ],
  },
  {
    topic: "Domaine de définition - Racine de A/B",
    difficulty: "Difficile",
    question:
      "Déterminer le domaine de définition de $f(x) = \\sqrt{\\dfrac{3 - x}{x + 2}}$ :",
    explanation:
      "Il faut $\\dfrac{3-x}{x+2} \\ge 0$ avec $x \\neq -2$. Signes : pour $x < -2$, le numérateur est positif et le dénominateur négatif (quotient $< 0$) ; pour $-2 < x \\le 3$, le quotient est $\\ge 0$ ; pour $x > 3$, il est négatif. Donc $D_f = ]-2, 3]$.",
    options: [
      { text: "$]-2, 3]$", isCorrect: true },
      { text: "$[-2, 3]$", isCorrect: false },
      {
        text: "$]-\\infty, -2[ \\cup [3, +\\infty[$",
        isCorrect: false,
      },
      { text: "$]-2, 3[$", isCorrect: false },
    ],
  },

  // =========================================================================
  // PARTIE 6 : RACINES AU DÉNOMINATEUR AVEC POLYNÔME DU 2ND DEGRÉ (Q19 à Q20)
  // =========================================================================
  {
    topic: "Domaine de définition - Racine au dénominateur",
    difficulty: "Difficile",
    question:
      "Déterminer le domaine de définition de $f(x) = \\dfrac{1}{\\sqrt{x^2 - x - 6}}$ :",
    explanation:
      "Il faut $x^2 - x - 6 > 0$ (strictement, car la racine est au dénominateur). $x^2 - x - 6 = (x-3)(x+2)$ est positif à l'extérieur des racines $-2$ et $3$. Donc $D_f = ]-\\infty, -2[ \\cup ]3, +\\infty[$.",
    options: [
      {
        text: "$]-\\infty, -2[ \\cup ]3, +\\infty[$",
        isCorrect: true,
      },
      {
        text: "$]-\\infty, -2] \\cup [3, +\\infty[$",
        isCorrect: false,
      },
      { text: "$]-2, 3[$", isCorrect: false },
      { text: "$\\mathbb{R} \\setminus \\{-2, 3\\}$", isCorrect: false },
    ],
  },
  {
    topic: "Domaine de définition - Expressions mixtes",
    difficulty: "Difficile",
    question:
      "Déterminer le domaine de définition de $f(x) = \\dfrac{\\sqrt{x + 1}}{\\sqrt{4 - x^2}}$ :",
    explanation:
      "Conditions : (1) $x + 1 \\ge 0 \\iff x \\ge -1$ ; (2) $4 - x^2 > 0$ (strict, racine au dénominateur) $\\iff x \\in ]-2, 2[$. L'intersection donne $D_f = [-1, +\\infty[ \\cap ]-2, 2[ = [-1, 2[$.",
    options: [
      { text: "$[-1, 2[$", isCorrect: true },
      { text: "$]-2, 2[$", isCorrect: false },
      { text: "$[-1, 2]$", isCorrect: false },
      { text: "$[-1, +\\infty[$", isCorrect: false },
    ],
  },
];

async function main() {
  console.log(
    "Démarrage de la création de l'examen sur le Domaine de Définition (2BAC S)...",
  );

  // 1. Créer ou mettre à jour l'Examen
  const exam = await prisma.qcmExam.upsert({
    where: { slug: "domaine-definition-2bac-s" },
    update: {
      title: "Domaine de Définition d'une Fonction (2BAC Sciences)",
      description:
        "Évaluation progressive sur la détermination du domaine de définition : polynômes, quotients (dénominateur du 1er et 2nd degré), racines carrées de polynômes, racine d'un produit ou d'un quotient, et expressions mixtes avec racine au dénominateur.",
      timeLimitMinutes: 40,
      published: true,
    },
    create: {
      slug: "domaine-definition-2bac-s",
      title: "Domaine de Définition d'une Fonction (2BAC Sciences)",
      description:
        "Évaluation progressive sur la détermination du domaine de définition : polynômes, quotients (dénominateur du 1er et 2nd degré), racines carrées de polynômes, racine d'un produit ou d'un quotient, et expressions mixtes avec racine au dénominateur.",
      timeLimitMinutes: 40,
      published: true,
    },
  });

  console.log(`Examen initialisé : ${exam.title} (ID: ${exam.id})`);

  // Nettoyer les liaisons de cet examen au cas où le script est relancé
  await prisma.qcmExamQuestion.deleteMany({
    where: { examId: exam.id },
  });

  // 2. Insérer les questions et les lier à l'examen avec leur ordre
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
    `Succès : ${QUESTIONS_DATA.length} questions insérées et associées à l'examen "${exam.title}".`,
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
