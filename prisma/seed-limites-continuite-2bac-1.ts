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
    question:
      "Une fonction $f$ est continue au point $x_0$ si et seulement si :",
    topic: "Limites et Continuité",
    difficulty: "Facile",
    explanation:
      "Par définition fondamentale de la continuité en un point, $f$ est continue en $x_0$ si $\\lim_{x \\to x_0} f(x) = f(x_0)$.",
    options: [
      { text: "$\\lim_{x \\to x_0} f(x) = 0$", isCorrect: false },
      { text: "$\\lim_{x \\to x_0} f(x) = f(x_0)$", isCorrect: true },
      { text: "$f(x_0) = 0$", isCorrect: false },
      { text: "$f$ est dérivable en $x_0$", isCorrect: false },
    ],
  },
  {
    question:
      "Pour qu'une fonction $f$ soit continue en un point $x_0$, il faut et il suffit que :",
    topic: "Limites et Continuité",
    difficulty: "Facile",
    explanation:
      "Une fonction est continue en $x_0$ si et seulement si elle est continue à droite et à gauche en ce point : $\\lim_{x \\to x_0^+} f(x) = \\lim_{x \\to x_0^-} f(x) = f(x_0)$.",
    options: [
      { text: "La limite à droite existe", isCorrect: false },
      { text: "La limite à gauche existe", isCorrect: false },
      {
        text: "Les limites à droite et à gauche existent et soient égales à $f(x_0)$",
        isCorrect: true,
      },
      { text: "$f(x_0)$ soit définie", isCorrect: false },
    ],
  },
  {
    question: "Toute fonction polynomiale est continue sur :",
    topic: "Limites et Continuité",
    difficulty: "Facile",
    explanation:
      "Toutes les fonctions polynomiales sont définies et continues sur $\\mathbb{R}$ tout entier.",
    options: [
      { text: "$\\mathbb{R}^*$", isCorrect: false },
      { text: "$\\mathbb{R}$", isCorrect: true },
      { text: "$\\mathbb{R}^+$", isCorrect: false },
      { text: "Son domaine de définition uniquement", isCorrect: false },
    ],
  },
  {
    question: "Toute fonction rationnelle est continue sur :",
    topic: "Limites et Continuité",
    difficulty: "Facile",
    explanation:
      "Une fonction rationnelle (quotient de deux polynômes) est continue en tout point où son dénominateur ne s'annule pas, c'est-à-dire sur son domaine de définition $D_f$.",
    options: [
      { text: "$\\mathbb{R}$", isCorrect: false },
      { text: "$\\mathbb{R}^*$", isCorrect: false },
      { text: "Son domaine de définition", isCorrect: true },
      { text: "$[0, +\\infty[$", isCorrect: false },
    ],
  },
  {
    question: "La fonction $f(x) = \\sqrt{x}$ est continue sur :",
    topic: "Limites et Continuité",
    difficulty: "Facile",
    explanation:
      "La fonction racine carrée est continue sur son ensemble de définition $[0, +\\infty[$, y compris à droite en 0.",
    options: [
      { text: "$\\mathbb{R}$", isCorrect: false },
      { text: "$]0, +\\infty[$", isCorrect: false },
      { text: "$[0, +\\infty[$", isCorrect: true },
      { text: "$\\mathbb{R}^*$", isCorrect: false },
    ],
  },
  {
    question: "La fonction $f(x) = \\tan(x)$ est continue sur :",
    topic: "Limites et Continuité",
    difficulty: "Moyen",
    explanation:
      "Comme $\\tan(x) = \\frac{\\sin(x)}{\\cos(x)}$, la fonction tangente est continue pour tout $x$ où $\\cos(x) \\neq 0$, c'est-à-dire $\\mathbb{R} \\setminus \\left\\{\\frac{\\pi}{2} + k\\pi, k \\in \\mathbb{Z}\\right\\}$.",
    options: [
      { text: "$\\mathbb{R}$", isCorrect: false },
      {
        text: "$\\mathbb{R} \\setminus \\left\\{\\frac{\\pi}{2} + k\\pi, k \\in \\mathbb{Z}\\right\\}$",
        isCorrect: true,
      },
      { text: "$]-\\frac{\\pi}{2}, \\frac{\\pi}{2}[$", isCorrect: false },
      { text: "$[0, \\pi]$", isCorrect: false },
    ],
  },
  {
    question:
      "Si $f$ et $g$ sont deux fonctions continues sur un intervalle $I$, alors :",
    topic: "Limites et Continuité",
    difficulty: "Facile",
    explanation:
      "Les opérations élémentaires (somme, produit, quotient si le dénominateur ne s'annule pas) préservent la continuité sur un intervalle.",
    options: [
      { text: "$f + g$ est continue sur $I$", isCorrect: false },
      { text: "$f \\times g$ est continue sur $I$", isCorrect: false },
      {
        text: "$\\frac{f}{g}$ est continue sur $I$ si $g(x) \\neq 0$ sur $I$",
        isCorrect: false,
      },
      {
        text: "Toutes les réponses précédentes sont correctes",
        isCorrect: true,
      },
    ],
  },
  {
    question:
      "Soit $f$ continue sur $I$ et $g$ continue sur $J$ tel que $f(I) \\subset J$. La fonction $g \\circ f$ est :",
    topic: "Limites et Continuité",
    difficulty: "Facile",
    explanation:
      "D'après le théorème de composition des fonctions continues, si $f(I) \\subset J$, alors $g \\circ f$ est continue sur $I$.",
    options: [
      { text: "Continue sur $I$", isCorrect: true },
      { text: "Continue sur $J$", isCorrect: false },
      { text: "Discontinue sur $I$", isCorrect: false },
      { text: "Dérivable sur $I$", isCorrect: false },
    ],
  },
  {
    question:
      "D'après le théorème des valeurs intermédiaires (T.V.I), si $f$ est continue sur $[a,b]$ et si $k$ est un réel compris entre $f(a)$ et $f(b)$, alors :",
    topic: "Limites et Continuité",
    difficulty: "Moyen",
    explanation:
      "Sans condition de stricte monotonie, le T.V.I garantit uniquement l'existence d'au moins une solution $c \\in [a,b]$ telle que $f(c) = k$.",
    options: [
      {
        text: "Il existe au moins un $c \\in [a,b]$ tel que $f(c) = k$",
        isCorrect: true,
      },
      {
        text: "Il existe un unique $c \\in [a,b]$ tel que $f(c) = k$",
        isCorrect: false,
      },
      { text: "$f$ est strictement monotone sur $[a,b]$", isCorrect: false },
      { text: "$f(a) \\times f(b) > 0$", isCorrect: false },
    ],
  },
  {
    question:
      "Si $f$ est continue sur $[a,b]$ et si $f(a) \\times f(b) < 0$, alors l'équation $f(x) = 0$ admet :",
    topic: "Limites et Continuité",
    difficulty: "Facile",
    explanation:
      "Comme $f$ change de signe entre $a$ et $b$ et est continue, 0 est compris entre $f(a)$ et $f(b)$. L'équation $f(x) = 0$ admet donc au moins une solution dans $]a,b[$.",
    options: [
      { text: "Aucune solution dans $]a,b[$", isCorrect: false },
      { text: "Une seule solution dans $]a,b[$", isCorrect: false },
      { text: "Au moins une solution dans $]a,b[$", isCorrect: true },
      { text: "Une infinité de solutions dans $]a,b[$", isCorrect: false },
    ],
  },
  {
    question:
      "Pour garantir l'unicité de la solution de $f(x) = 0$ sur $[a,b]$ (avec $f$ continue et $f(a)f(b) < 0$), il faut ajouter la condition que $f$ est :",
    topic: "Limites et Continuité",
    difficulty: "Facile",
    explanation:
      "La stricte monotonie rend la fonction injective, assurant ainsi l'unicité de la solution dans l'intervalle.",
    options: [
      { text: "Dérivable sur $[a,b]$", isCorrect: false },
      { text: "Strictement monotone sur $[a,b]$", isCorrect: true },
      { text: "Paire sur $[a,b]$", isCorrect: false },
      { text: "Positive sur $[a,b]$", isCorrect: false },
    ],
  },
  {
    question: "L'image d'un intervalle $I$ par une fonction continue $f$ est :",
    topic: "Limites et Continuité",
    difficulty: "Facile",
    explanation:
      "La continuité préserve la connexité : l'image de tout intervalle par une application continue est toujours un intervalle.",
    options: [
      { text: "Un intervalle", isCorrect: true },
      { text: "Un segment", isCorrect: false },
      { text: "Un point", isCorrect: false },
      { text: "Un ensemble discret", isCorrect: false },
    ],
  },
  {
    question:
      "L'image d'un segment $[a,b]$ par une fonction continue $f$ est :",
    topic: "Limites et Continuité",
    difficulty: "Moyen",
    explanation:
      "D'après le théorème des bornes atteintes, toute fonction continue sur un segment est bornée et atteint ses bornes (son minimum $m$ et son maximum $M$), donc $f([a,b]) = [m, M]$.",
    options: [
      { text: "Un intervalle ouvert", isCorrect: false },
      {
        text: "Un segment $[m, M]$ où $m$ et $M$ sont le minimum et le maximum de $f$ sur $[a,b]$",
        isCorrect: true,
      },
      { text: "$\\mathbb{R}$", isCorrect: false },
      { text: "Un singleton", isCorrect: false },
    ],
  },
  {
    question:
      "Si $f$ est continue et strictement croissante sur $[a,b]$, alors $f([a,b])$ est :",
    topic: "Limites et Continuité",
    difficulty: "Facile",
    explanation:
      "Pour une fonction continue strictement croissante, l'ordre des bornes est conservé : $f([a,b]) = [f(a), f(b)]$.",
    options: [
      { text: "$[f(a), f(b)]$", isCorrect: true },
      { text: "$[f(b), f(a)]$", isCorrect: false },
      { text: "$]f(a), f(b)[$", isCorrect: false },
      { text: "$[f(a), f(b)[$", isCorrect: false },
    ],
  },
  {
    question:
      "Si $f$ est continue et strictement décroissante sur $[a,b]$, alors $f([a,b])$ est :",
    topic: "Limites et Continuité",
    difficulty: "Facile",
    explanation:
      "Pour une fonction continue strictement décroissante, l'ordre des bornes s'inverse : $f([a,b]) = [f(b), f(a)]$.",
    options: [
      { text: "$[f(a), f(b)]$", isCorrect: false },
      { text: "$[f(b), f(a)]$", isCorrect: true },
      { text: "$]f(a), f(b)[$", isCorrect: false },
      { text: "$]f(b), f(a)]$", isCorrect: false },
    ],
  },
  {
    question:
      "Pour qu'une fonction $f$ admette une fonction réciproque $f^{-1}$ sur un intervalle $I$, il faut qu'elle soit :",
    topic: "Limites et Continuité",
    difficulty: "Facile",
    explanation:
      "La continuité et la stricte monotonie sont les deux conditions qui établissent une bijection de l'intervalle $I$ sur $J = f(I)$, garantissant l'existence de $f^{-1}$.",
    options: [
      { text: "Continue sur $I$", isCorrect: false },
      { text: "Strictement monotone sur $I$", isCorrect: false },
      { text: "Continue et strictement monotone sur $I$", isCorrect: true },
      { text: "Dérivable sur $I$", isCorrect: false },
    ],
  },
  {
    question:
      "Si $f$ est continue et strictement monotone sur $I$ et que $J = f(I)$, alors la fonction réciproque $f^{-1}$ est définie sur :",
    topic: "Limites et Continuité",
    difficulty: "Facile",
    explanation:
      "L'ensemble de départ de la fonction réciproque $f^{-1}$ est l'ensemble d'arrivée de la bijection, c'est-à-dire $J = f(I)$.",
    options: [
      { text: "$I$", isCorrect: false },
      { text: "$J$", isCorrect: true },
      { text: "$\\mathbb{R}$", isCorrect: false },
      { text: "$I \\cap J$", isCorrect: false },
    ],
  },
  {
    question:
      "La fonction réciproque $f^{-1}$ d'une fonction continue et strictement croissante sur $I$ est :",
    topic: "Limites et Continuité",
    difficulty: "Facile",
    explanation:
      "La fonction réciproque $f^{-1}$ a exactement le même sens de variation que la fonction $f$.",
    options: [
      { text: "Strictement croissante sur $J$", isCorrect: true },
      { text: "Strictement décroissante sur $J$", isCorrect: false },
      { text: "Constante sur $J$", isCorrect: false },
      { text: "Discontinue sur $J$", isCorrect: false },
    ],
  },
  {
    question:
      "Les courbes $(C_f)$ et $(C_{f^{-1}})$ sont symétriques par rapport à :",
    topic: "Limites et Continuité",
    difficulty: "Facile",
    explanation:
      "Dans un repère orthonormé, comme $y = f(x) \\iff x = f^{-1}(y)$, les points $(x, y)$ et $(y, x)$ sont symétriques par rapport à la première bissectrice d'équation $y = x$.",
    options: [
      { text: "L'axe des abscisses", isCorrect: false },
      { text: "L'axe des ordonnées", isCorrect: false },
      { text: "La droite d'équation $y = x$", isCorrect: true },
      { text: "L'origine du repère", isCorrect: false },
    ],
  },
  {
    question:
      "Soit $f(x) = x^n$ avec $n \\in \\mathbb{N}^*$ définie sur $\\mathbb{R}^+$. Sa fonction réciproque s'appelle la racine $n$-ième et se note :",
    topic: "Limites et Continuité",
    difficulty: "Facile",
    explanation:
      "La notation officielle du programme pour la bijection réciproque de $x \\mapsto x^n$ sur $\\mathbb{R}^+$ est la racine $n$-ième : $f^{-1}(x) = \\sqrt[n]{x}$.",
    options: [
      { text: "$f^{-1}(x) = x^n$", isCorrect: false },
      { text: "$f^{-1}(x) = \\sqrt[n]{x}$", isCorrect: true },
      { text: "$f^{-1}(x) = \\frac{1}{x^n}$", isCorrect: false },
      { text: "$f^{-1}(x) = -x^n$", isCorrect: false },
    ],
  },
  {
    question:
      "Pour tout $a \\in \\mathbb{R}^+$ et $n \\in \\mathbb{N} \\setminus \\{0,1\\}$, on a :",
    topic: "Limites et Continuité",
    difficulty: "Moyen",
    explanation:
      "Pour tout réel positif $a$, on a à la fois $(\\sqrt[n]{a})^n = a$ et $\\sqrt[n]{a^n} = a$.",
    options: [
      { text: "$(\\sqrt[n]{a})^n = a$", isCorrect: false },
      { text: "$\\sqrt[n]{a^n} = a$", isCorrect: false },
      {
        text: "Les deux propriétés précédentes sont correctes",
        isCorrect: true,
      },
      { text: "Aucune des propriétés précédentes", isCorrect: false },
    ],
  },
  {
    question:
      "$\\lim_{x \\to +\\infty} \\sqrt[n]{x}$ avec $n \\in \\mathbb{N} \\setminus \\{0,1\\}$ est égale à :",
    topic: "Limites et Continuité",
    difficulty: "Facile",
    explanation:
      "Par propriété des limites des fonctions racines $n$-ièmes, $\\lim_{x \\to +\\infty} \\sqrt[n]{x} = +\\infty$.",
    options: [
      { text: "$0$", isCorrect: false },
      { text: "$1$", isCorrect: false },
      { text: "$+\\infty$", isCorrect: true },
      { text: "$-\\infty$", isCorrect: false },
    ],
  },
  {
    question:
      "La limite de la fonction composée $\\sqrt{f(x)}$ se calcule en utilisant :",
    topic: "Limites et Continuité",
    difficulty: "Facile",
    explanation:
      "Comme $\\sqrt{f(x)}$ est la composée de $f$ suivie de la fonction racine carrée, on applique le théorème de composition des limites.",
    options: [
      { text: "La règle de l'Hôpital", isCorrect: false },
      {
        text: "Les propriétés de la composition des limites",
        isCorrect: true,
      },
      { text: "La dérivée de $f$", isCorrect: false },
      { text: "Le taux d'accroissement", isCorrect: false },
    ],
  },
  {
    question:
      "Si $\\lim_{x \\to x_0} f(x) = \\ell \\ge 0$, alors $\\lim_{x \\to x_0} \\sqrt{f(x)}$ est égale à :",
    topic: "Limites et Continuité",
    difficulty: "Facile",
    explanation:
      "Par continuité de la fonction racine carrée en $\\ell \\ge 0$, la limite vaut $\\sqrt{\\ell}$.",
    options: [
      { text: "$0$", isCorrect: false },
      { text: "$\\sqrt{\\ell}$", isCorrect: true },
      { text: "$+\\infty$", isCorrect: false },
      { text: "$-\\infty$", isCorrect: false },
    ],
  },
  {
    question:
      "La fonction racine $n$-ième ($x \\mapsto \\sqrt[n]{x}$) est continue sur :",
    topic: "Limites et Continuité",
    difficulty: "Facile",
    explanation:
      "Par définition de la bijection réciproque de $x^n$ sur $\\mathbb{R}^+$, la racine $n$-ième est définie et continue sur $[0, +\\infty[$.",
    options: [
      { text: "$\\mathbb{R}$", isCorrect: false },
      { text: "$[0, +\\infty[$", isCorrect: true },
      { text: "$]0, +\\infty[$", isCorrect: false },
      { text: "$\\mathbb{R}^*$", isCorrect: false },
    ],
  },
  {
    question:
      "Si une fonction $f$ est continue sur $[a,b]$ et $f(a) = f(b)$, alors $f$ :",
    topic: "Limites et Continuité",
    difficulty: "Moyen",
    explanation:
      "D'après le théorème des bornes atteintes, si $f$ n'est pas constante sur $[a,b]$, son maximum ou son minimum est nécessairement atteint en un point de l'intervalle ouvert $]a,b[$.",
    options: [
      { text: "Est constante sur $[a,b]$", isCorrect: false },
      { text: "Admet un extremum sur $]a,b[$", isCorrect: true },
      { text: "N'admet pas de maximum", isCorrect: false },
      { text: "Est impaire", isCorrect: false },
    ],
  },
  {
    question: "La continuité d'une fonction en un point est une condition :",
    topic: "Limites et Continuité",
    difficulty: "Moyen",
    explanation:
      "Toute fonction dérivable en un point est continue en ce point (la continuité est nécessaire). En revanche, la continuité ne suffit pas pour être dérivable (contre-exemple : $x \\mapsto |x|$ en 0).",
    options: [
      {
        text: "Nécessaire pour sa dérivabilité en ce point",
        isCorrect: true,
      },
      {
        text: "Suffisante pour sa dérivabilité en ce point",
        isCorrect: false,
      },
      {
        text: "Nécessaire et suffisante pour sa dérivabilité en ce point",
        isCorrect: false,
      },
      { text: "Indépendante de sa dérivabilité", isCorrect: false },
    ],
  },
  {
    question:
      "Soit $f$ définie par $f(x) = \\frac{x^2 - 1}{x - 1}$ pour $x \\neq 1$. Pour que $f$ soit prolongeable par continuité en $x=1$, on doit poser $f(1) = $ :",
    topic: "Limites et Continuité",
    difficulty: "Facile",
    explanation:
      "Pour $x \\neq 1$, $\\frac{x^2 - 1}{x - 1} = \\frac{(x - 1)(x + 1)}{x - 1} = x + 1$. Quand $x \\to 1$, la limite vaut $1 + 1 = 2$. On doit donc poser $f(1) = 2$.",
    options: [
      { text: "$0$", isCorrect: false },
      { text: "$1$", isCorrect: false },
      { text: "$2$", isCorrect: true },
      { text: "$+\\infty$", isCorrect: false },
    ],
  },
  {
    question: "La fonction $f(x) = \\frac{1}{x}$ :",
    topic: "Limites et Continuité",
    difficulty: "Facile",
    explanation:
      "La fonction inverse est une fonction rationnelle, elle est donc continue sur chacun des intervalles de son domaine de définition $\\mathbb{R}^* = ]-\\infty, 0[ \\cup ]0, +\\infty[$.",
    options: [
      { text: "Est continue sur $\\mathbb{R}$", isCorrect: false },
      { text: "Est continue sur $\\mathbb{R}^*$", isCorrect: true },
      { text: "N'est pas continue sur $\\mathbb{R}^*$", isCorrect: false },
      { text: "Est continue en 0", isCorrect: false },
    ],
  },
  {
    question:
      "Si $f$ est continue et strictement monotone sur $I$, et que $y \\in J = f(I)$, alors l'équation $f(x) = y$ admet :",
    topic: "Limites et Continuité",
    difficulty: "Facile",
    explanation:
      "C'est le corollaire du théorème de la bijection (T.V.I avec stricte monotonie) : tout élément de l'intervalle image $J$ admet un unique antécédent dans $I$.",
    options: [
      { text: "Aucune solution dans $I$", isCorrect: false },
      { text: "Une infinité de solutions dans $I$", isCorrect: false },
      { text: "Une unique solution dans $I$", isCorrect: true },
      { text: "Au moins deux solutions dans $I$", isCorrect: false },
    ],
  },
];

async function main() {
  console.log(
    "Démarrage du seed pour l'examen Limites et Continuité (2BAC S)...",
  );

  const exam = await prisma.qcmExam.upsert({
    where: { slug: "limites-et-continuite-2bac-s" },
    update: {
      title: "Limites et Continuité",
      description:
        "Évaluation didactique complète sur la continuité en un point, la continuité sur un intervalle, le T.V.I, la fonction réciproque et les racines n-ièmes pour la 2ème Année Baccalauréat Scientifique.",
      timeLimitMinutes: 45,
      published: true,
    },
    create: {
      slug: "limites-et-continuite-2bac-s",
      title: "Limites et Continuité",
      description:
        "Évaluation didactique complète sur la continuité en un point, la continuité sur un intervalle, le T.V.I, la fonction réciproque et les racines n-ièmes pour la 2ème Année Baccalauréat Scientifique.",
      timeLimitMinutes: 45,
      published: true,
    },
  });

  console.log(`Examen initialisé : ${exam.title} (ID: ${exam.id})`);

  // Supprime les anciennes associations de questions pour cet examen
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
