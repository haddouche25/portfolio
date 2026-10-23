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
    question: "Comment définit-on un ensemble en extension ?",
    topic: "Théorie des Ensembles",
    difficulty: "Facile",
    explanation:
      "Définir un ensemble en extension consiste à énumérer exhaustivement tous ses éléments entre accolades, séparés par des virgules ou des points-virgules.",
    options: [
      {
        text: "En donnant une propriété commune à ses éléments",
        isCorrect: false,
      },
      { text: "En listant tous ses éléments entre accolades", isCorrect: true },
      { text: "En utilisant un diagramme de Venn", isCorrect: false },
      { text: "En donnant son complémentaire", isCorrect: false },
    ],
  },
  {
    question: "Comment définit-on un ensemble en compréhension ?",
    topic: "Théorie des Ensembles",
    difficulty: "Facile",
    explanation:
      "La définition en compréhension caractérise les éléments par une propriété ou un prédicat logique $P(x)$, sous la forme $\{x \\in E \\mid P(x)\}$.",
    options: [
      { text: "En listant tous ses éléments", isCorrect: false },
      {
        text: "En utilisant la notation $\{x \\in E / P(x)\}$",
        isCorrect: true,
      },
      { text: "En utilisant des intervalles", isCorrect: false },
      { text: "En faisant le produit cartésien", isCorrect: false },
    ],
  },
  {
    question:
      "L'ensemble $E = \\{n \\in \\mathbb{N} / 3 < n < 7\\}$ écrit en extension est :",
    topic: "Théorie des Ensembles",
    difficulty: "Facile",
    explanation:
      "Les inégalités étant strictes ($3 < n < 7$), les entiers naturels vérifiant cette condition sont strictement compris entre 3 et 7, soit 4, 5 et 6.",
    options: [
      { text: "$E = \\{3, 4, 5, 6, 7\\}$", isCorrect: false },
      { text: "$E = \\{4, 5, 6\\}$", isCorrect: true },
      { text: "$E = \\{3, 4, 5, 6\\}$", isCorrect: false },
      { text: "$E = \\{4, 5, 6, 7\\}$", isCorrect: false },
    ],
  },
  {
    question:
      "L'ensemble $F = \\{0, 2, 4, 6, \\dots\\}$ écrit en compréhension est :",
    topic: "Théorie des Ensembles",
    difficulty: "Facile",
    explanation:
      "Ce sont les entiers naturels pairs ($0$ inclus et positifs ou nuls), soit $\{x \\in \\mathbb{N} \\mid x \\text{ est pair}\}$ ou $\{2k \\mid k \\in \\mathbb{N}\}$.",
    options: [
      {
        text: "$\\{x \\in \\mathbb{R} / x \\text{ est pair}\\}$",
        isCorrect: false,
      },
      {
        text: "$\\{x \\in \\mathbb{N} / x \\text{ est pair}\\}$",
        isCorrect: true,
      },
      { text: "$\\{x \\in \\mathbb{N} / x \\ge 0\\}$", isCorrect: false },
      {
        text: "$\\{x \\in \\mathbb{Z} / x \\text{ est pair}\\}$",
        isCorrect: false,
      },
    ],
  },
  {
    question:
      "On dit que $A$ est inclus dans $B$ ($A \\subset B$) si et seulement si :",
    topic: "Théorie des Ensembles",
    difficulty: "Facile",
    explanation:
      "Par définition mathématique de l'inclusion : $(\\forall x) (x \\in A \\Rightarrow x \\in B)$.",
    options: [
      { text: "Tout élément de $A$ appartient à $B$", isCorrect: true },
      { text: "Tout élément de $B$ appartient à $A$", isCorrect: false },
      { text: "$A$ et $B$ ont le même nombre d'éléments", isCorrect: false },
      { text: "$A \\cap B = \\emptyset$", isCorrect: false },
    ],
  },
  {
    question:
      "Pour démontrer que deux ensembles $A$ et $B$ sont égaux, il faut montrer :",
    topic: "Théorie des Ensembles",
    difficulty: "Facile",
    explanation:
      "L'égalité ensembliste $A = B$ s'établit par double inclusion : prouver à la fois $A \\subset B$ et $B \\subset A$.",
    options: [
      { text: "$A \\subset B$", isCorrect: false },
      { text: "$B \\subset A$", isCorrect: false },
      {
        text: "$A \\subset B$ et $B \\subset A$ (double inclusion)",
        isCorrect: true,
      },
      { text: "$A \\cup B = \\emptyset$", isCorrect: false },
    ],
  },
  {
    question:
      "L'ensemble des parties d'un ensemble $E$, noté $\\mathcal{P}(E)$, est l'ensemble :",
    topic: "Théorie des Ensembles",
    difficulty: "Facile",
    explanation:
      "$\\mathcal{P}(E)$ désigne l'ensemble dont les éléments sont précisément tous les sous-ensembles (parties) possibles de $E$, y compris $\\emptyset$ et $E$.",
    options: [
      { text: "Des éléments de $E$", isCorrect: false },
      { text: "De tous les sous-ensembles de $E$", isCorrect: true },
      {
        text: "Des parties de $E$ qui contiennent un élément spécifique",
        isCorrect: false,
      },
      { text: "Des sous-ensembles stricts de $E$", isCorrect: false },
    ],
  },
  {
    question:
      "Si un ensemble $E$ possède $n$ éléments, alors le nombre d'éléments de $\\mathcal{P}(E)$ est :",
    topic: "Théorie des Ensembles",
    difficulty: "Facile",
    explanation:
      "Chaque élément de $E$ a 2 choix (appartenir ou non à un sous-ensemble donné), ce qui donne par combinatoire $2^n$ parties au total : $\\text{Card}(\\mathcal{P}(E)) = 2^n$.",
    options: [
      { text: "$n$", isCorrect: false },
      { text: "$2n$", isCorrect: false },
      { text: "$n^2$", isCorrect: false },
      { text: "$2^n$", isCorrect: true },
    ],
  },
  {
    question:
      "L'intersection de deux ensembles $A$ et $B$ ($A \\cap B$) est l'ensemble des éléments :",
    topic: "Théorie des Ensembles",
    difficulty: "Facile",
    explanation:
      "$x \\in A \\cap B \\iff (x \\in A \\land x \\in B)$. Ce sont les éléments partagés par les deux ensembles.",
    options: [
      { text: "Qui appartiennent à $A$ ou à $B$", isCorrect: false },
      {
        text: "Qui appartiennent à $A$ et à $B$ en même temps",
        isCorrect: true,
      },
      { text: "Qui appartiennent à $A$ mais pas à $B$", isCorrect: false },
      { text: "Qui n'appartiennent ni à $A$ ni à $B$", isCorrect: false },
    ],
  },
  {
    question:
      "La réunion de deux ensembles $A$ et $B$ ($A \\cup B$) est l'ensemble des éléments :",
    topic: "Théorie des Ensembles",
    difficulty: "Facile",
    explanation:
      "$x \\in A \\cup B \\iff (x \\in A \\lor x \\in B)$. L'élément doit être présent dans au moins l'un des deux ensembles.",
    options: [
      {
        text: "Qui appartiennent à $A$ et à $B$ en même temps",
        isCorrect: false,
      },
      {
        text: "Qui appartiennent à $A$ ou à $B$ (ou les deux)",
        isCorrect: true,
      },
      { text: "Qui appartiennent à $A$ mais pas à $B$", isCorrect: false },
      { text: "Qui appartiennent à l'un mais pas à l'autre", isCorrect: false },
    ],
  },
  {
    question:
      "Le complémentaire d'un ensemble $A$ dans $E$ (noté $\\overline{A}$ ou $C_E^A$) est :",
    topic: "Théorie des Ensembles",
    difficulty: "Facile",
    explanation:
      "Pour $A \\subset E$, le complémentaire regroupe les éléments de l'ensemble de référence $E$ qui n'appartiennent pas à $A$ : $C_E^A = \\{x \\in E \\mid x \\notin A\\}$.",
    options: [
      { text: "L'ensemble des éléments de $A$", isCorrect: false },
      {
        text: "L'ensemble des éléments de $E$ qui n'appartiennent pas à $A$",
        isCorrect: true,
      },
      { text: "L'ensemble vide", isCorrect: false },
      { text: "L'ensemble $E$ tout entier", isCorrect: false },
    ],
  },
  {
    question:
      "La différence de deux ensembles $A$ et $B$ ($A \\setminus B$) est :",
    topic: "Théorie des Ensembles",
    difficulty: "Facile",
    explanation:
      "La différence $A \\setminus B$ contient les éléments de $A$ privés de ceux qui figurent également dans $B$ : $A \\setminus B = \\{x \\in A \\mid x \\notin B\\} = A \\cap \\overline{B}$.",
    options: [
      {
        text: "L'ensemble des éléments de $A$ qui n'appartiennent pas à $B$",
        isCorrect: true,
      },
      {
        text: "L'ensemble des éléments de $B$ qui n'appartiennent pas à $A$",
        isCorrect: false,
      },
      { text: "L'ensemble des éléments communs", isCorrect: false },
      { text: "$A \\cap B$", isCorrect: false },
    ],
  },
  {
    question:
      "La différence symétrique de $A$ et $B$ ($A \\Delta B$) est définie par :",
    topic: "Théorie des Ensembles",
    difficulty: "Moyen",
    explanation:
      "Par définition, $A \\Delta B = (A \\setminus B) \\cup (B \\setminus A) = (A \\cup B) \\setminus (A \\cap B)$. Les deux formulations sont rigoureusement équivalentes.",
    options: [
      { text: "$(A \\cup B) \\setminus (A \\cap B)$", isCorrect: false },
      { text: "$(A \\setminus B) \\cup (B \\setminus A)$", isCorrect: false },
      { text: "Les deux réponses a et b sont correctes", isCorrect: true },
      { text: "$A \\cup B$", isCorrect: false },
    ],
  },
  {
    question:
      "Le produit cartésien $A \\times B$ est l'ensemble des couples $(x, y)$ tels que :",
    topic: "Théorie des Ensembles",
    difficulty: "Facile",
    explanation:
      "Le produit cartésien assemble des couples ordonnés dont la première coordonnée est issue de $A$ et la seconde de $B$ : $A \\times B = \\{(x, y) \\mid x \\in A \\text{ et } y \\in B\\}$.",
    options: [
      { text: "$x \\in A$ et $y \\in B$", isCorrect: true },
      { text: "$x \\in B$ et $y \\in A$", isCorrect: false },
      { text: "$x \\in A$ ou $y \\in B$", isCorrect: false },
      { text: "$x \\in A \\cap B$", isCorrect: false },
    ],
  },
  {
    question:
      "La loi de Morgan pour les ensembles s'énonce : $\\overline{A \\cup B} = $ :",
    topic: "Théorie des Ensembles",
    difficulty: "Facile",
    explanation:
      "Le complémentaire d'une union est l'intersection des complémentaires : $\\overline{A \\cup B} = \\overline{A} \\cap \\overline{B}$.",
    options: [
      { text: "$\\overline{A} \\cup \\overline{B}$", isCorrect: false },
      { text: "$\\overline{A} \\cap \\overline{B}$", isCorrect: true },
      { text: "$A \\cap B$", isCorrect: false },
      { text: "$A \\cup B$", isCorrect: false },
    ],
  },
  {
    question:
      "La loi de Morgan pour les ensembles s'énonce : $\\overline{A \\cap B} = $ :",
    topic: "Théorie des Ensembles",
    difficulty: "Facile",
    explanation:
      "Le complémentaire d'une intersection est l'union des complémentaires : $\\overline{A \\cap B} = \\overline{A} \\cup \\overline{B}$.",
    options: [
      { text: "$\\overline{A} \\cup \\overline{B}$", isCorrect: true },
      { text: "$\\overline{A} \\cap \\overline{B}$", isCorrect: false },
      { text: "$A \\cup B$", isCorrect: false },
      { text: "$A \\cap B$", isCorrect: false },
    ],
  },
  {
    question:
      "L'opération ensembliste qui correspond logiquement au connecteur « ET » ($\\land$) est :",
    topic: "Théorie des Ensembles",
    difficulty: "Facile",
    explanation:
      "L'intersection $A \\cap B$ exige la réalisation simultanée des deux conditions logiques : $x \\in A \\land x \\in B$.",
    options: [
      { text: "La réunion ($\\cup$)", isCorrect: false },
      { text: "L'intersection ($\\cap$)", isCorrect: true },
      { text: "Le complémentaire ($\\overline{A}$)", isCorrect: false },
      { text: "La différence ($\\setminus$)", isCorrect: false },
    ],
  },
  {
    question:
      "L'opération ensembliste qui correspond logiquement au connecteur « OU » ($\\lor$) est :",
    topic: "Théorie des Ensembles",
    difficulty: "Facile",
    explanation:
      "La réunion $A \\cup B$ traduit la disjonction logique inclusive : $x \\in A \\lor x \\in B$.",
    options: [
      { text: "La réunion ($\\cup$)", isCorrect: true },
      { text: "L'intersection ($\\cap$)", isCorrect: false },
      { text: "Le complémentaire ($\\overline{A}$)", isCorrect: false },
      { text: "La différence ($\\setminus$)", isCorrect: false },
    ],
  },
  {
    question: "Que vaut $A \\cap \\emptyset$ ?",
    topic: "Théorie des Ensembles",
    difficulty: "Facile",
    explanation:
      "L'ensemble vide ne contenant aucun élément, aucun élément ne peut appartenir simultanément à $A$ et à $\\emptyset$, donc $A \\cap \\emptyset = \\emptyset$.",
    options: [
      { text: "$A$", isCorrect: false },
      { text: "$\\emptyset$", isCorrect: true },
      { text: "$E$", isCorrect: false },
      { text: "$A \\cup \\emptyset$", isCorrect: false },
    ],
  },
  {
    question: "Que vaut $A \\cup \\emptyset$ ?",
    topic: "Théorie des Ensembles",
    difficulty: "Facile",
    explanation:
      "$\\emptyset$ est l'élément neutre pour l'opération de réunion ensembliste : $A \\cup \\emptyset = A$.",
    options: [
      { text: "$A$", isCorrect: true },
      { text: "$\\emptyset$", isCorrect: false },
      { text: "$E$", isCorrect: false },
      { text: "$A \\cap \\emptyset$", isCorrect: false },
    ],
  },
  {
    question:
      "L'ensemble $\\mathcal{P}(\\emptyset)$ (ensemble des parties de l'ensemble vide) est :",
    topic: "Théorie des Ensembles",
    difficulty: "Moyen",
    explanation:
      "L'ensemble vide admet un unique sous-ensemble, qui est lui-même : $\\emptyset \\subset \\emptyset$. Dès lors, $\\mathcal{P}(\\emptyset) = \\{\\emptyset\\}$, ensemble singleton contenant 1 élément ($2^0 = 1$).",
    options: [
      { text: "$\\emptyset$", isCorrect: false },
      { text: "$\\{\\emptyset\\}$", isCorrect: true },
      { text: "$\\{\\{\\emptyset\\}\\}$", isCorrect: false },
      { text: "L'ensemble infini", isCorrect: false },
    ],
  },
  {
    question: "Si $E = \\{1, 2, 3\\}$, quelles sont les parties de $E$ ?",
    topic: "Théorie des Ensembles",
    difficulty: "Moyen",
    explanation:
      "Un ensemble à 3 éléments possède $2^3 = 8$ sous-ensembles : l'ensemble vide, 3 singletons, 3 paires, et l'ensemble plein lui-même.",
    options: [
      {
        text: "$\\emptyset, \\{1\\}, \\{2\\}, \\{3\\}, \\{1,2\\}, \\{1,3\\}, \\{2,3\\}, \\{1,2,3\\}$",
        isCorrect: true,
      },
      { text: "$\\{1\\}, \\{2\\}, \\{3\\}$", isCorrect: false },
      { text: "$\\emptyset, \\{1, 2, 3\\}$", isCorrect: false },
      { text: "$\\{1,2\\}, \\{1,3\\}, \\{2,3\\}$", isCorrect: false },
    ],
  },
  {
    question:
      "L'ensemble $C = \\{p \\in \\mathbb{Z} / (p-3)(2p-5) = 0\\}$ écrit en extension est :",
    topic: "Théorie des Ensembles",
    difficulty: "Moyen",
    explanation:
      "Dans $\\mathbb{R}$, les solutions sont $p = 3$ et $p = 2.5$. Comme $p \\in \\mathbb{Z}$, seule la valeur entière $3$ est retenue. Ainsi, $C = \\{3\\}$.",
    options: [
      { text: "$C = \\{3, 2.5\\}$", isCorrect: false },
      { text: "$C = \\{3\\}$", isCorrect: true },
      { text: "$C = \\{2.5\\}$", isCorrect: false },
      { text: "$C = \\emptyset$", isCorrect: false },
    ],
  },
  {
    question:
      "Soit $A = ]-\\infty, 2]$ et $B = [0, +\\infty[$. L'ensemble $A \\cap B$ est :",
    topic: "Théorie des Ensembles",
    difficulty: "Facile",
    explanation:
      "L'intersection correspond aux réels $x$ tels que $x \\le 2$ et $x \\ge 0$, ce qui forme le segment fermé $[0, 2]$.",
    options: [
      { text: "$]-\\infty, +\\infty[$", isCorrect: false },
      { text: "$[0, 2]$", isCorrect: true },
      { text: "$]-\\infty, 0] \\cup [2, +\\infty[$", isCorrect: false },
      { text: "$\\emptyset$", isCorrect: false },
    ],
  },
  {
    question:
      "Soit $A = [-1, 3[$ et $B = [2, 5]$. L'ensemble $A \\cup B$ est :",
    topic: "Théorie des Ensembles",
    difficulty: "Facile",
    explanation:
      "Les deux intervalles se chevauchent entre 2 et 3 ($2 \\in [-1, 3[$). Leur réunion s'étend donc continûment de $-1$ (inclus) jusqu'à $5$ (inclus) : $[-1, 5]$.",
    options: [
      { text: "$[-1, 5]$", isCorrect: true },
      { text: "$[2, 3[$", isCorrect: false },
      { text: "$[-1, 2]$", isCorrect: false },
      { text: "$]3, 5]$", isCorrect: false },
    ],
  },
  {
    question: "Le complémentaire de $A = [1, 4[$ dans $\\mathbb{R}$ est :",
    topic: "Théorie des Ensembles",
    difficulty: "Moyen",
    explanation:
      "Priver $\\mathbb{R}$ de l'intervalle $[1, 4[$ laisse les nombres strictement inférieurs à 1 et les nombres supérieurs ou égaux à 4 : $]-\\infty, 1[ \\cup [4, +\\infty[$.",
    options: [
      { text: "$]-\\infty, 1] \\cup [4, +\\infty[$", isCorrect: false },
      { text: "$]-\\infty, 1[ \\cup [4, +\\infty[$", isCorrect: true },
      { text: "$]1, 4[$", isCorrect: false },
      { text: "$]-\\infty, 1] \\cup ]4, +\\infty[$", isCorrect: false },
    ],
  },
  {
    question:
      "Pour tous ensembles $A, B, C$, on a : $A \\cap (B \\cup C) = $ :",
    topic: "Théorie des Ensembles",
    difficulty: "Facile",
    explanation:
      "Il s'agit de la distributivité de l'intersection par rapport à la réunion : $A \\cap (B \\cup C) = (A \\cap B) \\cup (A \\cap C)$.",
    options: [
      { text: "$(A \\cap B) \\cup (A \\cap C)$", isCorrect: true },
      { text: "$(A \\cup B) \\cap (A \\cup C)$", isCorrect: false },
      { text: "$(A \\cap B) \\cap C$", isCorrect: false },
      { text: "$A \\cup (B \\cap C)$", isCorrect: false },
    ],
  },
  {
    question: "Si $A \\subset B$, alors $A \\cap B$ est égal à :",
    topic: "Théorie des Ensembles",
    difficulty: "Facile",
    explanation:
      "Tous les éléments de $A$ étant déjà dans $B$, la partie commune à $A$ et $B$ est l'ensemble $A$ tout entier.",
    options: [
      { text: "$B$", isCorrect: false },
      { text: "$A$", isCorrect: true },
      { text: "$\\emptyset$", isCorrect: false },
      { text: "$A \\cup B$", isCorrect: false },
    ],
  },
  {
    question: "Si $A \\subset B$, alors $A \\cup B$ est égal à :",
    topic: "Théorie des Ensembles",
    difficulty: "Facile",
    explanation:
      "L'ensemble $B$ englobant déjà la totalité des éléments de $A$, leur rassemblement n'ajoute aucun élément supplémentaire à $B$, donc $A \\cup B = B$.",
    options: [
      { text: "$B$", isCorrect: true },
      { text: "$A$", isCorrect: false },
      { text: "$\\emptyset$", isCorrect: false },
      { text: "$A \\setminus B$", isCorrect: false },
    ],
  },
  {
    question:
      "On pose $E = \\{(n, m) \\in \\mathbb{Z}^* \\times \\mathbb{Z}^* / \\frac{1}{n} + \\frac{1}{m} = \\frac{1}{5}\\}$. Cette équation est équivalente à :",
    topic: "Théorie des Ensembles",
    difficulty: "Difficile",
    explanation:
      "En réduisant au même dénominateur : $\\frac{m+n}{nm} = \\frac{1}{5} \\iff 5m + 5n = nm \\iff nm - 5n - 5m = 0$. En ajoutant $25$ des deux côtés : $n(m-5) - 5(m-5) = 25 \\iff (n-5)(m-5) = 25$.",
    options: [
      { text: "$(n-5)(m-5) = 25$", isCorrect: true },
      { text: "$(n+5)(m+5) = 25$", isCorrect: false },
      { text: "$(n-5)(m-5) = -25$", isCorrect: false },
      { text: "$(n-5)(m+5) = 25$", isCorrect: false },
    ],
  },
];

async function main() {
  console.log("Démarrage du seed pour l'examen de Théorie des Ensembles...");

  const exam = await prisma.qcmExam.upsert({
    where: { slug: "theorie-des-ensembles-1bac" },
    update: {
      title: "Théorie des Ensembles",
      description:
        "Évaluation sur les modes de définition (extension, compréhension), opérations ensemblistes (union, intersection, complémentaire, différence symétrique), ensemble des parties P(E) et produit cartésien.",
      timeLimitMinutes: 45,
      published: true,
    },
    create: {
      slug: "theorie-des-ensembles-1bac",
      title: "Théorie des Ensembles",
      description:
        "Évaluation sur les modes de définition (extension, compréhension), opérations ensemblistes (union, intersection, complémentaire, différence symétrique), ensemble des parties P(E) et produit cartésien.",
      timeLimitMinutes: 45,
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
