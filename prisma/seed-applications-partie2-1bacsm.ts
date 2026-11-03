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
  // BLOC 1 : QUESTIONS DE COURS & DÉFINITIONS FORMELLES (Q1 à Q6)
  // =========================================================================
  {
    topic: "Injection - Définition de cours",
    difficulty: "Facile",
    question:
      "Soit $f : E \\to F$ une application. Dire que $f$ est **injective** équivaut à :",
    explanation:
      "Par définition, $f$ est injective si deux antécédents distincts ont toujours des images distinctes, ou de façon équivalente : $(\\forall x, x' \\in E) \\; f(x) = f(x') \\implies x = x'$[cite: 12].",
    options: [
      {
        text: "$(\\forall x, x' \\in E) \\quad f(x) = f(x') \\implies x = x'$",
        isCorrect: true,
      },
      {
        text: "$(\\forall y \\in F)(\\exists x \\in E) \\quad f(x) = y$",
        isCorrect: false,
      },
      {
        text: "$(\\forall x, x' \\in E) \\quad x = x' \\implies f(x) = f(x')$",
        isCorrect: false,
      },
      {
        text: "$(\\forall y \\in F)(\\exists! x \\in E) \\quad f(x) = y$",
        isCorrect: false,
      },
    ],
  },
  {
    topic: "Surjection - Définition de cours",
    difficulty: "Facile",
    question:
      "Soit $f : E \\to F$ une application. L'application $f$ est **surjective** si et seulement si :",
    explanation:
      "Une application est surjective si chaque élément de l'ensemble d'arrivée admet au moins un antécédent dans $E$, ce qui s'écrit logiquement : $(\\forall y \\in F)(\\exists x \\in E) \\; f(x) = y$[cite: 12].",
    options: [
      {
        text: "$(\\forall y \\in F)(\\exists x \\in E) \\quad f(x) = y$",
        isCorrect: true,
      },
      {
        text: "$(\\forall x \\in E)(\\exists y \\in F) \\quad f(x) = y$",
        isCorrect: false,
      },
      {
        text: "$(\\forall x, x' \\in E) \\quad f(x) = f(x') \\implies x = x'$",
        isCorrect: false,
      },
      { text: "$f(E) \\subsetneq F$", isCorrect: false },
    ],
  },
  {
    topic: "Bijection - Caractérisation",
    difficulty: "Facile",
    question:
      "Une application $f : E \\to F$ est dite **bijective** si et seulement si :",
    explanation:
      "Une bijection est par définition à la fois injective (au plus un antécédent) et surjective (au moins un antécédent), ce qui garantit l'existence et l'unicité de l'antécédent pour tout élément de l'arrivée[cite: 12].",
    options: [
      { text: "$f$ est à la fois injective et surjective", isCorrect: true },
      { text: "$f$ est injective ou surjective", isCorrect: false },
      {
        text: "$E = F$ et $(\\forall x \\in E) \\; f(x) = x$",
        isCorrect: false,
      },
      { text: "$f(E) = E$", isCorrect: false },
    ],
  },
  {
    topic: "Surjection - Image directe",
    difficulty: "Facile",
    question:
      "Soit $f : E \\to F$ une application. Laquelle de ces égalités ensemblistes caractérise la surjectivité de $f$ ?",
    explanation:
      "L'application $f$ est surjective si et seulement si l'ensemble des images $f(E)$ recouvre exactement la totalité de l'ensemble d'arrivée $F$, soit $f(E) = F$[cite: 12].",
    options: [
      { text: "$f(E) = F$", isCorrect: true },
      { text: "$f(F) = E$", isCorrect: false },
      { text: "$f(E) \\subset F$ avec $f(E) \\neq F$", isCorrect: false },
      { text: "$f^{-1}(F) = \\emptyset$", isCorrect: false },
    ],
  },
  {
    topic: "Bijection réciproque - Propriété",
    difficulty: "Facile",
    question:
      "Si $f : E \\to F$ est une bijection et $f^{-1}$ sa bijection réciproque, laquelle de ces propositions est vraie pour tout $y \\in F$ et $x \\in E$ ?",
    explanation:
      "La relation fondamentale qui lie une bijection à sa réciproque est l'équivalence : $f(x) = y \\iff f^{-1}(y) = x$ pour tout $x \\in E$ et $y \\in F$[cite: 12].",
    options: [
      { text: "$f(x) = y \\iff f^{-1}(y) = x$", isCorrect: true },
      { text: "$f(x) = y \\iff f^{-1}(x) = y$", isCorrect: false },
      { text: "$f^{-1}(y) = \\dfrac{1}{f(y)}$", isCorrect: false },
      {
        text: "$f \\circ f^{-1} = f^{-1} \\circ f$ même si $E \\neq F$",
        isCorrect: false,
      },
    ],
  },
  {
    topic: "Bijection - Identité",
    difficulty: "Moyen",
    question:
      "Soit $f : E \\to F$ une application bijective avec $E \\neq F$. Que valent les applications composées $f^{-1} \\circ f$ et $f \\circ f^{-1}$ ?",
    explanation:
      "Attention aux ensembles de départ et d'arrivée ! $f^{-1} \\circ f$ part de $E$ vers $E$, donc $f^{-1} \\circ f = \\text{Id}_E$. À l'inverse, $f \\circ f^{-1}$ part de $F$ vers $F$, donc $f \\circ f^{-1} = \\text{Id}_F$.",
    options: [
      {
        text: "$f^{-1} \\circ f = \\text{Id}_E$ et $f \\circ f^{-1} = \\text{Id}_F$",
        isCorrect: true,
      },
      {
        text: "$f^{-1} \\circ f = \\text{Id}_F$ et $f \\circ f^{-1} = \\text{Id}_E$",
        isCorrect: false,
      },
      {
        text: "$f^{-1} \\circ f = f \\circ f^{-1} = \\text{Id}_E$",
        isCorrect: false,
      },
      {
        text: "$f^{-1} \\circ f = 1$ (la fonction constante égale à $1$)",
        isCorrect: false,
      },
    ],
  },

  // =========================================================================
  // BLOC 2 : APPLICATIONS POLYNOMIALES, HOMOGRAPHIQUES & TRIGO (Q7 à Q16)
  // =========================================================================
  {
    topic: "Injectivité - Parabole dans R",
    difficulty: "Facile",
    question:
      "Soit $f : \\mathbb{R} \\to \\mathbb{R}$ définie par $f(x) = x^2 - 6x + 5$[cite: 19, 39]. L'application $f$ est-elle injective ?",
    explanation:
      "On a $f(1) = 0$ et $f(5) = 0$. Comme $1 \\neq 5$ alors que $f(1) = f(5)$, l'application $f$ n'est pas injective.",
    options: [
      { text: "Non, car $f(1) = f(5) = 0$ avec $1 \\neq 5$", isCorrect: true },
      {
        text: "Oui, car tout trinôme du second degré est injectif",
        isCorrect: false,
      },
      {
        text: "Non, car son discriminant est strictement négatif",
        isCorrect: false,
      },
      {
        text: "Oui, car pour tout $x$, $f(x) = (x-3)^2 - 4$",
        isCorrect: false,
      },
    ],
  },
  {
    topic: "Surjectivité - Parabole dans R",
    difficulty: "Facile",
    question:
      "Pour $f : \\mathbb{R} \\to \\mathbb{R}$ définie par $f(x) = x^2 - 6x + 5$, $f$ est-elle surjective[cite: 19, 39] ?",
    explanation:
      "$f(x) = (x-3)^2 - 4 \\ge -4$[cite: 19, 39]. Tout réel strictement inférieur à $-4$ (par exemple $-5$) n'a aucun antécédent dans $\\mathbb{R}$. Donc $f$ n'est pas surjective.",
    options: [
      {
        text: "Non, car $(\\forall x \\in \\mathbb{R}) \\; f(x) \\ge -4$, donc $-5$ n'a aucun antécédent",
        isCorrect: true,
      },
      {
        text: "Oui, car l'ensemble d'arrivée est $\\mathbb{R}$",
        isCorrect: false,
      },
      {
        text: "Oui, car l'équation $f(x) = 0$ possède deux solutions",
        isCorrect: false,
      },
      {
        text: "Non, car $f$ ne s'annule qu'en des entiers positifs",
        isCorrect: false,
      },
    ],
  },
  {
    topic: "Trigonométrie - Cosinus dans R",
    difficulty: "Facile",
    question:
      "Soit $g : \\mathbb{R} \\to \\mathbb{R}$ définie par $g(x) = \\cos(x)$[cite: 14, 16, 55, 63, 65]. Que peut-on dire de $g$[cite: 14, 16, 63, 65] ?",
    explanation:
      "D'une part $g(0) = g(2\\pi) = 1$ avec $0 \\neq 2\\pi$, donc $g$ n'est pas injective[cite: 16, 65]. D'autre part $-1 \\le \\cos(x) \\le 1$, donc les réels hors de $[-1, 1]$ (comme $2$) n'ont aucun antécédent : $g$ n'est pas surjective[cite: 16, 65].",
    options: [
      { text: "$g$ n'est ni injective ni surjective", isCorrect: true },
      { text: "$g$ est injective mais pas surjective", isCorrect: false },
      { text: "$g$ est surjective mais pas injective", isCorrect: false },
      { text: "$g$ est bijective sur $\\mathbb{R}$", isCorrect: false },
    ],
  },
  {
    topic: "Injectivité - Fonction homographique",
    difficulty: "Moyen",
    question:
      "Soit $g : ]1, +\\infty[ \\to ]2, +\\infty[$ définie par $g(x) = \\dfrac{2x+10}{x-1}$[cite: 19, 39]. L'application $g$ est-elle injective[cite: 19, 39] ?",
    explanation:
      "D'après la décomposition $g(x) = 2 + \\dfrac{12}{x-1}$[cite: 19, 39], l'égalité $g(x) = g(x')$ donne $\\dfrac{12}{x-1} = \\dfrac{12}{x'-1} \\iff x - 1 = x' - 1 \\iff x = x'$. L'application est donc injective.",
    options: [
      {
        text: "Oui, car $g(x) = g(x') \\implies \\dfrac{12}{x-1} = \\dfrac{12}{x'-1} \\implies x = x'$",
        isCorrect: true,
      },
      { text: "Non, car $x=1$ annule le dénominateur", isCorrect: false },
      { text: "Non, car $g(2) = 14$ et $g(3) = 8$", isCorrect: false },
      {
        text: "Oui, car son ensemble d'arrivée est non borné",
        isCorrect: false,
      },
    ],
  },
  {
    topic: "Surjectivité - Fonction homographique",
    difficulty: "Moyen",
    question:
      "Pour la même application $g : ]1, +\\infty[ \\to ]2, +\\infty[, x \\mapsto \\dfrac{2x+10}{x-1}$, est-elle surjective[cite: 19, 39] ?",
    explanation:
      "Soit $y > 2$. L'équation $2 + \\dfrac{12}{x-1} = y \\iff x - 1 = \\dfrac{12}{y-2} \\iff x = 1 + \\dfrac{12}{y-2}$. Comme $y > 2$, $\\dfrac{12}{y-2} > 0$, donc $x > 1$ appartient bien au domaine. Tout $y$ admet un antécédent : $g$ est surjective.",
    options: [
      {
        text: "Oui, car pour tout $y > 2$, $x = 1 + \\dfrac{12}{y-2}$ est un antécédent unique dans $]1, +\\infty[$",
        isCorrect: true,
      },
      { text: "Non, car le réel $2$ n'a pas d'antécédent", isCorrect: false },
      { text: "Non, car $x$ doit être un entier", isCorrect: false },
      { text: "Oui, car le numérateur est de degré 1", isCorrect: false },
    ],
  },
  {
    topic: "Injectivité - Parabole sur intervalle restreint",
    difficulty: "Moyen",
    question:
      "Soit $f : ]1, +\\infty[ \\to ]1, +\\infty[$ définie par $f(x) = x^2 - 2x + 2$[cite: 14, 16, 55, 63, 65]. L'application $f$ est-elle injective[cite: 14, 16, 55, 63, 65] ?",
    explanation:
      "$f(x) = f(y) \\implies (x-y)(x+y-2) = 0$[cite: 16, 65]. Comme $x > 1$ et $y > 1$, on a $x+y > 2$, d'où $x+y-2 > 0$[cite: 16, 65]. Ainsi, $x+y-2 \\neq 0$, ce qui impose $x - y = 0 \\iff x = y$[cite: 16, 65]. $f$ est injective[cite: 16, 65].",
    options: [
      {
        text: "Oui, car $(x-y)(x+y-2) = 0$ et $x+y-2 > 0$ pour tous $x, y > 1$",
        isCorrect: true,
      },
      { text: "Non, car $f(0) = f(2) = 2$", isCorrect: false },
      {
        text: "Non, car toute fonction quadratique admet un sommet",
        isCorrect: false,
      },
      {
        text: "Oui, car la dérivée ne s'annule jamais sur $\\mathbb{R}$",
        isCorrect: false,
      },
    ],
  },
  {
    topic: "Bijection réciproque - Calcul explicite",
    difficulty: "Moyen",
    question:
      "Pour $f : ]1, +\\infty[ \\to ]1, +\\infty[$ définie par $f(x) = x^2 - 2x + 2$, quelle est l'expression de sa réciproque $f^{-1}(x)$[cite: 14, 16, 63, 65] ?",
    explanation:
      "On résout $y = (x-1)^2 + 1 \\iff (x-1)^2 = y-1$[cite: 16, 65]. Comme $x > 1$, $x - 1 = \\sqrt{y-1} \\iff x = 1 + \\sqrt{y-1}$[cite: 16, 65]. Donc $f^{-1}(x) = 1 + \\sqrt{x-1}$ pour tout $x > 1$[cite: 16, 65].",
    options: [
      { text: "$f^{-1}(x) = 1 + \\sqrt{x-1}$", isCorrect: true },
      { text: "$f^{-1}(x) = 1 - \\sqrt{x-1}$", isCorrect: false },
      { text: "$f^{-1}(x) = \\sqrt{x^2 - 2x + 2}$", isCorrect: false },
      { text: "$f^{-1}(x) = \\dfrac{1}{x^2 - 2x + 2}$", isCorrect: false },
    ],
  },
  {
    topic: "Bijection réciproque - Fonction homographique",
    difficulty: "Moyen",
    question:
      "Soit $f : \\mathbb{R} \\setminus \\{1\\} \\to \\mathbb{R} \\setminus \\{2\\}$ la bijection définie par $f(x) = \\dfrac{2x+3}{x-1}$[cite: 14, 16, 17, 63, 65, 66]. Quelle est l'expression de $f^{-1}(x)$ ?",
    explanation:
      "Pour $y \\in \\mathbb{R} \\setminus \\{2\\}$, $f(x) = y \\iff 2x+3 = y(x-1) \\iff x(y-2) = y+3 \\iff x = \\dfrac{y+3}{y-2}$[cite: 17, 66]. En renommant la variable muette $x$, on obtient $f^{-1}(x) = \\dfrac{x+3}{x-2}$.",
    options: [
      { text: "$f^{-1}(x) = \\dfrac{x+3}{x-2}$", isCorrect: true },
      { text: "$f^{-1}(x) = \\dfrac{x-1}{2x+3}$", isCorrect: false },
      { text: "$f^{-1}(x) = \\dfrac{2x-3}{x+1}$", isCorrect: false },
      { text: "$f^{-1}(x) = \\dfrac{x-3}{x+2}$", isCorrect: false },
    ],
  },
  {
    topic: "Injectivité - Contre-exemple par symétrie",
    difficulty: "Moyen",
    question:
      "Soit $f : \\mathbb{R} \\to \\mathbb{R}$ vérifiant pour tout $x \\in \\mathbb{R} : f(4-x) = f(x)$[cite: 14, 16, 63, 65]. Que peut-on déduire directement sur l'injectivité de $f$[cite: 14, 16, 63, 65] ?",
    explanation:
      "En choisissant par exemple $x = 0$, on obtient $f(4) = f(0)$[cite: 16, 65]. Or $4 \\neq 0$, ce qui fournit un contre-exemple immédiat prouvant que $f$ n'est pas injective[cite: 16, 65].",
    options: [
      {
        text: "$f$ n'est pas injective car $f(4) = f(0)$ avec $4 \\neq 0$",
        isCorrect: true,
      },
      {
        text: "$f$ est injective car la fonction est symétrique",
        isCorrect: false,
      },
      {
        text: "$f$ est nécessairement surjective sur $\\mathbb{R}$",
        isCorrect: false,
      },
      {
        text: "$f$ est une bijection de $\\mathbb{R}$ dans $\\mathbb{R}$",
        isCorrect: false,
      },
    ],
  },
  {
    topic: "Invariance f(1/x) = f(x)",
    difficulty: "Moyen",
    question:
      "Soit $f : \\mathbb{R}^* \\to \\mathbb{R}$ définie par $f(x) = \\dfrac{x(1-x)^2}{(1+x^2)^2}$[cite: 14, 17, 63, 66]. Sachant que $f\\left(\\dfrac{1}{x}\\right) = f(x)$[cite: 14, 17, 63, 66], que peut-on affirmer[cite: 14, 17, 63, 66] ?",
    explanation:
      "Pour tout réel $a \\neq 1$ ($a \\neq 0$), $a \\neq \\frac{1}{a}$ mais $f(a) = f\\left(\\frac{1}{a}\\right)$ (par exemple pour $a = 2$, $f(2) = f(1/2)$ alors que $2 \\neq 1/2$)[cite: 17, 66]. Donc $f$ n'est pas injective[cite: 14, 17, 63, 66].",
    options: [
      {
        text: "$f$ n'est pas injective car $f(2) = f(1/2)$ avec $2 \\neq 1/2$",
        isCorrect: true,
      },
      {
        text: "$f$ est injective car l'inversion conserve l'injectivité",
        isCorrect: false,
      },
      {
        text: "$f$ est bijective de $\\mathbb{R}^*$ sur $\\mathbb{R}$",
        isCorrect: false,
      },
      { text: "$f$ est impaire", isCorrect: false },
    ],
  },

  // =========================================================================
  // BLOC 3 : APPLICATIONS ARITHMÉTIQUES DANS N ET Z (1BAC SM) (Q17 à Q22)
  // =========================================================================
  {
    topic: "Restriction injective sur N",
    difficulty: "Moyen",
    question:
      "Soit $g : \\mathbb{N} \\to \\mathbb{Q}$ définie par $g(n) = \\dfrac{1}{n^2 - n + 1}$ (Devoir Modèle 11)[cite: 47]. Pourquoi $g$ n'est-elle pas injective sur $\\mathbb{N}$, et quelle restriction la rend injective[cite: 47] ?",
    explanation:
      "On remarque que $g(0) = 1$ et $g(1) = 1$, donc $g$ n'est pas injective sur $\\mathbb{N}$. En revanche, pour $n, m \\ge 1$, $n^2-n+1 = m^2-m+1 \\iff (n-m)(n+m-1) = 0$. Sur $\\mathbb{N}^*$, $n+m-1 \\ge 1 > 0$, donc $n=m$ : la restriction à $\\mathbb{N}^*$ est injective.",
    options: [
      {
        text: "$g(0) = g(1) = 1$, mais sa restriction à $\\mathbb{N}^*$ est injective",
        isCorrect: true,
      },
      {
        text: "$g(1) = g(2)$, mais sa restriction aux entiers pairs est injective",
        isCorrect: false,
      },
      {
        text: "$g$ est déjà injective sur $\\mathbb{N}$ tout entier",
        isCorrect: false,
      },
      {
        text: "Aucune restriction infinie de $g$ ne peut être injective",
        isCorrect: false,
      },
    ],
  },
  {
    topic: "Applications dans N - Successeur et Double",
    difficulty: "Moyen",
    question:
      "On considère l'application $f : \\mathbb{N} \\to \\mathbb{N}$ définie par $f(n) = 2n + 1$. Laquelle des affirmations suivantes est exacte ?",
    explanation:
      "$2n+1 = 2m+1 \\implies n = m$, donc $f$ est injective. En revanche, $2n+1$ est toujours un entier impair : aucun entier pair (comme $0$ ou $2$) n'admet d'antécédent dans $\\mathbb{N}$. Donc $f$ n'est pas surjective.",
    options: [
      { text: "$f$ est injective mais n'est pas surjective", isCorrect: true },
      { text: "$f$ est surjective mais n'est pas injective", isCorrect: false },
      {
        text: "$f$ est bijective de $\\mathbb{N}$ dans $\\mathbb{N}$",
        isCorrect: false,
      },
      { text: "$f$ n'est ni injective ni surjective", isCorrect: false },
    ],
  },
  {
    topic: "Applications dans Z - Définition par parité",
    difficulty: "Difficile",
    question:
      "Soit $f : \\mathbb{N} \\to \\mathbb{Z}$ définie par $f(n) = \\dfrac{n}{2}$ si $n$ est pair, et $f(n) = -\\dfrac{n+1}{2}$ si $n$ est impair. Que peut-on dire de $f$ ?",
    explanation:
      "Les entiers pairs $2k$ ($k \\ge 0$) ont pour images tous les entiers positifs ou nuls $k \\in \\mathbb{N}$. Les entiers impairs $2k+1$ ($k \\ge 0$) ont pour images tous les entiers strictement négatifs $-(k+1) \\in \\mathbb{Z}_-^*$. Chaque entier relatif est atteint une et une seule fois : c'est la bijection canonique de $\\mathbb{N}$ sur $\\mathbb{Z}$.",
    options: [
      {
        text: "$f$ est bijective de $\\mathbb{N}$ dans $\\mathbb{Z}$",
        isCorrect: true,
      },
      {
        text: "$f$ est injective mais non surjective car $0$ n'est pas atteint",
        isCorrect: false,
      },
      {
        text: "$f$ est surjective mais non injective car $f(0) = f(1)$",
        isCorrect: false,
      },
      {
        text: "$f$ n'est pas une application car $\\dfrac{n}{2}$ n'est pas toujours entier",
        isCorrect: false,
      },
    ],
  },
  {
    topic: "Applications dans N² - Surjectivité du produit",
    difficulty: "Moyen",
    question:
      "Soit l'application $f : \\mathbb{N}^2 \\to \\mathbb{N}$ définie par $f(a, b) = a \\times b$ (Devoir Modèle 11)[cite: 47]. L'application $f$ est-elle surjective[cite: 47] ?",
    explanation:
      "Pour tout entier $n \\in \\mathbb{N}$, le couple $(n, 1) \\in \\mathbb{N}^2$ vérifie $f(n, 1) = n \\times 1 = n$. Tout entier admet donc au moins un antécédent : $f$ est surjective.",
    options: [
      {
        text: "Oui, car pour tout $n \\in \\mathbb{N}$, le couple $(n, 1) \\in \\mathbb{N}^2$ vérifie $f(n, 1) = n$",
        isCorrect: true,
      },
      {
        text: "Non, car les nombres premiers n'ont pas d'antécédents",
        isCorrect: false,
      },
      { text: "Non, car $0$ n'a aucun antécédent", isCorrect: false },
      { text: "Oui, car elle est injective", isCorrect: false },
    ],
  },
  {
    topic: "Applications dans N² - Injectivité du produit",
    difficulty: "Facile",
    question:
      "Pour cette même application $f : \\mathbb{N}^2 \\to \\mathbb{N}, (a, b) \\mapsto a \\times b$[cite: 47], pourquoi $f$ n'est-elle pas injective ?",
    explanation:
      "On a par exemple $f(1, 15) = 15$ et $f(3, 5) = 15$. Les couples $(1, 15)$ et $(3, 5)$ sont distincts dans $\\mathbb{N}^2$, donc $f$ n'est pas injective.",
    options: [
      {
        text: "Car $f(1, 15) = f(3, 5) = 15$ alors que $(1, 15) \\neq (3, 5)$",
        isCorrect: true,
      },
      { text: "Car $f(0, 0) = 0$", isCorrect: false },
      {
        text: "Car les ensembles de départ et d'arrivée sont infinis",
        isCorrect: false,
      },
      { text: "Car $a \\times b = b \\times a$", isCorrect: false },
    ],
  },
  {
    topic: "Partie entière",
    difficulty: "Moyen",
    question:
      "Soit l'application partie entière $E : \\mathbb{R} \\to \\mathbb{Z}, x \\mapsto E(x)$. Laquelle de ces affirmations est vraie ?",
    explanation:
      "Tout entier $n \\in \\mathbb{Z}$ vérifie $E(n) = n$, donc $E$ est surjective sur $\\mathbb{Z}$. En revanche, $E(1,2) = E(1,7) = 1$ avec $1,2 \\neq 1,7$, donc $E$ n'est pas injective.",
    options: [
      { text: "$E$ est surjective mais n'est pas injective", isCorrect: true },
      { text: "$E$ est injective mais n'est pas surjective", isCorrect: false },
      {
        text: "$E$ est bijective de $\\mathbb{R}$ sur $\\mathbb{Z}$",
        isCorrect: false,
      },
      { text: "$E$ n'est ni injective ni surjective", isCorrect: false },
    ],
  },

  // =========================================================================
  // BLOC 4 : RADICAUX, VALEURS ABSOLUES & SYSTÈMES (1BAC SM) (Q23 à Q29)
  // =========================================================================
  {
    topic: "Radicaux et Quantité conjuguée",
    difficulty: "Difficile",
    question:
      "On considère $f : \\mathbb{R} \\to \\mathbb{R}$ définie par $f(x) = x + \\sqrt{x^2 + 1}$ (Série 2 Exercice 10)[cite: 14, 63]. Pourquoi $f$ n'est-elle pas surjective sur $\\mathbb{R}$[cite: 14, 63] ?",
    explanation:
      "Pour tout $x \\in \\mathbb{R}$, $\\sqrt{x^2+1} > \\sqrt{x^2} = |x| \\ge -x$, d'où $x + \\sqrt{x^2+1} > 0$ (on peut aussi multiplier par le conjugué : $f(x) = \\dfrac{1}{\\sqrt{x^2+1}-x} > 0$). L'image $f(\\mathbb{R}) = ]0, +\\infty[ \\neq \\mathbb{R}$, donc $f$ n'est pas surjective[cite: 14, 63].",
    options: [
      {
        text: "Car $(\\forall x \\in \\mathbb{R}) \\; x + \\sqrt{x^2 + 1} > 0$, donc les réels négatifs ou nuls n'ont pas d'antécédent",
        isCorrect: true,
      },
      {
        text: "Car $\\sqrt{x^2 + 1}$ n'est définie que sur $[0, +\\infty[$",
        isCorrect: false,
      },
      {
        text: "Car pour tout $x \\in \\mathbb{R}$, $f(x) \\ge 1$",
        isCorrect: false,
      },
      {
        text: "Car $f(-x) = f(x)$ pour tout $x \\in \\mathbb{R}$",
        isCorrect: false,
      },
    ],
  },
  {
    topic: "Bijection réciproque avec radical",
    difficulty: "Difficile",
    question:
      "Soit $g : \\mathbb{R} \\to ]0, +\\infty[$ la bijection définie par $g(x) = x + \\sqrt{x^2 + 1}$ (Série 2 Exercice 10)[cite: 14, 63]. Quelle est sa bijection réciproque $g^{-1}(y)$ pour $y > 0$ ?",
    explanation:
      "$y = x + \\sqrt{x^2+1} \\iff y - x = \\sqrt{x^2+1}$. Comme $\\sqrt{x^2+1} > |x|$, on a $y - x > 0$. En élevant au carré : $(y-x)^2 = x^2 + 1 \\iff y^2 - 2xy + x^2 = x^2 + 1 \\iff 2xy = y^2 - 1 \\iff x = \\dfrac{y^2 - 1}{2y}$.",
    options: [
      { text: "$g^{-1}(y) = \\dfrac{y^2 - 1}{2y}$", isCorrect: true },
      { text: "$g^{-1}(y) = y - \\sqrt{y^2 - 1}$", isCorrect: false },
      { text: "$g^{-1}(y) = \\dfrac{y^2 + 1}{2y}$", isCorrect: false },
      { text: "$g^{-1}(y) = \\sqrt{y^2 - 1} - y$", isCorrect: false },
    ],
  },
  {
    topic: "Bijection avec valeur absolue",
    difficulty: "Difficile",
    question:
      "Soit $f : \\mathbb{R} \\to ]-1, 1[$ définie par $f(x) = \\dfrac{x}{1 + |x|}$. L'application $f$ est bijective ; quelle est sa bijection réciproque $f^{-1}(y)$ pour $y \\in ]-1, 1[$ ?",
    explanation:
      "On remarque que $x$ et $y = f(x)$ ont le même signe, donc $|x| = x \\cdot \\text{sgn}(y)$ et $|y| = \\dfrac{|x|}{1+|x|} \\iff |x|(1-|y|) = |y| \\iff |x| = \\dfrac{|y|}{1-|y|}$. En rétablissant le signe, $x = \\dfrac{y}{1 - |y|}$.",
    options: [
      { text: "$f^{-1}(y) = \\dfrac{y}{1 - |y|}$", isCorrect: true },
      { text: "$f^{-1}(y) = \\dfrac{y}{1 + |y|}$", isCorrect: false },
      { text: "$f^{-1}(y) = \\dfrac{1 + |y|}{y}$", isCorrect: false },
      { text: "$f^{-1}(y) = \\dfrac{y}{1 - y^2}$", isCorrect: false },
    ],
  },
  {
    topic: "Systèmes linéaires dans R²",
    difficulty: "Difficile",
    question:
      "Soit $f : \\mathbb{R}^2 \\to \\mathbb{R}^2$ définie par $f(x, y) = (x + 3y, x - y)$[cite: 14, 63]. L'application $f$ est-elle bijective[cite: 14, 63] ?",
    explanation:
      "Soit $(u, v) \\in \\mathbb{R}^2$. Le système $\\begin{cases} x+3y = u \\\\ x-y = v \\end{cases}$ a pour déterminant $\\Delta = 1(-1) - 3(1) = -4 \\neq 0$. Il admet une solution unique : $y = \\frac{u-v}{4}$ et $x = \\frac{u+3v}{4}$. L'application est donc bijective.",
    options: [
      {
        text: "Oui, c'est une bijection et $f^{-1}(u, v) = \\left(\\dfrac{u+3v}{4}, \\dfrac{u-v}{4}\\right)$",
        isCorrect: true,
      },
      {
        text: "Non, car le système admet une infinité de solutions",
        isCorrect: false,
      },
      { text: "Non, car elle n'est pas surjective", isCorrect: false },
      {
        text: "Oui, et sa réciproque est $f^{-1}(u, v) = (u-3v, u+v)$",
        isCorrect: false,
      },
    ],
  },
  {
    topic: "Injectivité - Polynôme de degré 3",
    difficulty: "Difficile",
    question:
      "Soit $f : \\mathbb{R} \\to \\mathbb{R}$ définie par $f(x) = x^3 + 2x - 3$ (Devoir Modèle 11)[cite: 47]. Pourquoi $f$ est-elle injective ?",
    explanation:
      "Pour tous $x, y \\in \\mathbb{R}$, $f(x) - f(y) = (x^3 - y^3) + 2(x - y) = (x - y)(x^2 + xy + y^2 + 2)$. Or $x^2 + xy + y^2 + 2 = \\left(x + \\frac{y}{2}\\right)^2 + \\frac{3y^2}{4} + 2 > 0$ toujours strictement positif. Donc $f(x) = f(y) \\implies x = y$.",
    options: [
      {
        text: "$f(x) - f(y) = (x - y)\\left[\\left(x + \\frac{y}{2}\\right)^2 + \\frac{3y^2}{4} + 2\\right]$, et le second facteur est strictement positif",
        isCorrect: true,
      },
      {
        text: "Car le discriminant de $x^3 + 2x - 3$ est strictement négatif",
        isCorrect: false,
      },
      { text: "Car $f(1) = 0$ est une racine évidente", isCorrect: false },
      {
        text: "Car toute fonction polynomiale de degré 3 est injective sur $\\mathbb{R}$",
        isCorrect: false,
      },
    ],
  },
  {
    topic: "Décomposition d'application",
    difficulty: "Moyen",
    question:
      "Soit $h : \\mathbb{R}^+ \\to \\mathbb{R}$ définie par $h(x) = x - 2\\sqrt{x}$. Comment peut-on décomposer $h$ sous la forme $v \\circ u$ ?",
    explanation:
      "En posant $u(x) = \\sqrt{x}$ et $v(t) = t^2 - 2t$, on a $(v \\circ u)(x) = v(\\sqrt{x}) = (\\sqrt{x})^2 - 2\\sqrt{x} = x - 2\\sqrt{x} = h(x)$ pour tout $x \\ge 0$.",
    options: [
      {
        text: "$h = v \\circ u$ avec $u(x) = \\sqrt{x}$ et $v(x) = x^2 - 2x$",
        isCorrect: true,
      },
      {
        text: "$h = v \\circ u$ avec $u(x) = x^2 - 2x$ et $v(x) = \\sqrt{x}$",
        isCorrect: false,
      },
      {
        text: "$h = v \\circ u$ avec $u(x) = 2\\sqrt{x}$ et $v(x) = x - 1$",
        isCorrect: false,
      },
      {
        text: "$h = v \\circ u$ avec $u(x) = x - 2$ et $v(x) = \\sqrt{x}$",
        isCorrect: false,
      },
    ],
  },
  {
    topic: "Non-commutativité de la composition",
    difficulty: "Facile",
    question:
      "Soient $f : \\mathbb{R} \\to \\mathbb{R}, x \\mapsto x^2 - 1$ et $g : \\mathbb{R} \\to \\mathbb{R}, x \\mapsto 3x + 1$ (Série 2 Exercice 8)[cite: 14, 63]. Que valent $(g \\circ f)(x)$ et $(f \\circ g)(x)$ ?",
    explanation:
      "$(g \\circ f)(x) = g(x^2 - 1) = 3(x^2 - 1) + 1 = 3x^2 - 2$. En revanche, $(f \\circ g)(x) = f(3x + 1) = (3x + 1)^2 - 1 = 9x^2 + 6x$. En général, $g \\circ f \\neq f \\circ g$.",
    options: [
      {
        text: "$(g \\circ f)(x) = 3x^2 - 2$ et $(f \\circ g)(x) = 9x^2 + 6x$",
        isCorrect: true,
      },
      {
        text: "$(g \\circ f)(x) = 9x^2 + 6x$ et $(f \\circ g)(x) = 3x^2 - 2$",
        isCorrect: false,
      },
      {
        text: "$(g \\circ f)(x) = (f \\circ g)(x) = 3x^3 + x^2 - 3x - 1$",
        isCorrect: false,
      },
      {
        text: "$(g \\circ f)(x) = 3x^2$ et $(f \\circ g)(x) = 9x^2$",
        isCorrect: false,
      },
    ],
  },

  // =========================================================================
  // BLOC 5 : THÉORÈMES AVANCÉS, COMPOSITION & ENSEMBLES (Q30 à Q35)
  // =========================================================================
  {
    topic: "Composition - Propriété d'injectivité",
    difficulty: "Difficile",
    question:
      "Soient deux applications $f : E \\to F$ et $g : F \\to G$[cite: 12, 14, 63]. Si la composée $g \\circ f$ est injective, alors on peut affirmer avec certitude que[cite: 14, 63] :",
    explanation:
      "Théorème fondamental de composition : soient $x, x' \\in E$. Si $f(x) = f(x')$, alors $g(f(x)) = g(f(x')) \\iff (g \\circ f)(x) = (g \\circ f)(x')$. Par injectivité de $g \\circ f$, on déduit $x = x'$. Donc $f$ est nécessairement injective.",
    options: [
      { text: "$f$ est injective", isCorrect: true },
      { text: "$g$ est injective", isCorrect: false },
      { text: "$f$ et $g$ sont toutes les deux injectives", isCorrect: false },
      { text: "$g$ est surjective", isCorrect: false },
    ],
  },
  {
    topic: "Composition - Propriété de surjectivité",
    difficulty: "Difficile",
    question:
      "Soient deux applications $f : E \\to F$ et $g : F \\to G$[cite: 12, 14, 63]. Si la composée $g \\circ f$ est surjective, alors[cite: 14, 63] :",
    explanation:
      "Pour tout $z \\in G$, il existe $x \\in E$ tel que $(g \\circ f)(x) = z$, soit $g(f(x)) = z$. En posant $y = f(x) \\in F$, on a bien trouvé un antécédent $y$ de $z$ par $g$. Donc $g$ est nécessairement surjective.",
    options: [
      { text: "$g$ est surjective", isCorrect: true },
      { text: "$f$ est surjective", isCorrect: false },
      { text: "$f$ est injective", isCorrect: false },
      { text: "$f$ et $g$ sont bijectives", isCorrect: false },
    ],
  },
  {
    topic: "Composition - Transfert d'injectivité",
    difficulty: "Difficile",
    question:
      "Soient $f : E \\to F$ et $g : F \\to G$ deux applications telles que **$g \\circ f$ est injective** ET **$f$ est surjective** (Série 2 Exercice 9)[cite: 14, 63]. Que peut-on en déduire sur $g$ ?",
    explanation:
      "Soient $y, y' \\in F$ tels que $g(y) = g(y')$. Comme $f$ est surjective, il existe $x, x' \\in E$ tels que $y = f(x)$ et $y' = f(x')$. Alors $(g \\circ f)(x) = (g \\circ f)(x')$. Or $g \\circ f$ est injective, donc $x = x'$, d'où $y = f(x) = f(x') = y'$. Ainsi, $g$ est injective[cite: 14, 63].",
    options: [
      { text: "$g$ est nécessairement injective", isCorrect: true },
      { text: "$g$ est nécessairement surjective", isCorrect: false },
      { text: "$g$ est constante", isCorrect: false },
      { text: "On ne peut rien conclure sur $g$", isCorrect: false },
    ],
  },
  {
    topic: "Bijection réciproque d'une composée",
    difficulty: "Difficile",
    question:
      "Soient $f : E \\to F$ et $g : F \\to G$ deux applications bijectives. La composée $g \\circ f : E \\to G$ est bijective et sa bijection réciproque $(g \\circ f)^{-1}$ est égale à :",
    explanation:
      "Attention à l'inversion de l'ordre lors du passage à la réciproque ! Pour défaire $g \\circ f$ (qui applique $f$ puis $g$), il faut d'abord appliquer $g^{-1}$ puis $f^{-1}$ : $(g \\circ f)^{-1} = f^{-1} \\circ g^{-1}$.",
    options: [
      { text: "$f^{-1} \\circ g^{-1}$", isCorrect: true },
      { text: "$g^{-1} \\circ f^{-1}$", isCorrect: false },
      { text: "$f \\circ g$", isCorrect: false },
      { text: "$\\dfrac{1}{g \\circ f}$", isCorrect: false },
    ],
  },
  {
    topic: "Application involutive",
    difficulty: "Difficile",
    question:
      "Soit $f : E \\to E$ une application vérifiant $f \\circ f = \\text{Id}_E$ (on dit que $f$ est une **involution**). Laquelle de ces propriétés est vraie ?",
    explanation:
      "Comme $f \\circ f = \\text{Id}_E$, $\\text{Id}_E$ étant bijective (donc injective et surjective), le théorème de composition assure que $f$ est à la fois injective et surjective. Donc $f$ est bijective et sa propre réciproque : $f^{-1} = f$.",
    options: [
      { text: "$f$ est bijective et $f^{-1} = f$", isCorrect: true },
      {
        text: "$f$ est nécessairement l'application identité $\\text{Id}_E$",
        isCorrect: false,
      },
      {
        text: "$f$ est injective mais pas nécessairement surjective",
        isCorrect: false,
      },
      {
        text: "$f$ n'est bijective que si $E = \\mathbb{R}$",
        isCorrect: false,
      },
    ],
  },
  {
    topic: "Caractérisation ensembliste de l'injectivité",
    difficulty: "Difficile",
    question:
      "Soit $f : E \\to F$ une application. Pour toutes parties $A, B \\subset E$, on sait que $f(A \\cap B) \\subset f(A) \\cap f(B)$[cite: 14, 63]. À quelle condition nécessaire et suffisante sur $f$ a-t-on l'égalité $f(A \\cap B) = f(A) \\cap f(B)$ pour toutes parties $A$ et $B$ ?",
    explanation:
      "Propriété classique de 1Bac SM : l'image directe conserve l'intersection pour toutes parties $A, B \\subset E$ si et seulement si l'application $f$ est **injective**.",
    options: [
      { text: "Si et seulement si $f$ est injective", isCorrect: true },
      { text: "Si et seulement si $f$ est surjective", isCorrect: false },
      {
        text: "Si et seulement si $A$ et $B$ sont disjoints",
        isCorrect: false,
      },
      {
        text: "L'égalité est toujours vraie pour toute application quelconque",
        isCorrect: false,
      },
    ],
  },
];

async function main() {
  console.log(
    "Démarrage du seed : Applications (Partie 2 Enrichie - 35 Questions)...",
  );

  const exam = await prisma.qcmExam.upsert({
    where: { slug: "applications-partie-2-1bacsm" },
    update: {
      title:
        "Les Applications (Partie 2) : Injection, Surjection, Bijection & Composition - 1Bac SM",
      description:
        "Épreuve approfondie de 35 questions (1Bac Sciences Mathématiques) : définitions logiques, fonctions homographiques et irrationnelles, arithmétique dans N et Z, systèmes dans R², composition et involutions.",
      timeLimitMinutes: 60,
      published: true,
    },
    create: {
      slug: "applications-partie-2-1bacsm",
      title:
        "Les Applications (Partie 2) : Injection, Surjection, Bijection & Composition - 1Bac SM",
      description:
        "Épreuve approfondie de 35 questions (1Bac Sciences Mathématiques) : définitions logiques, fonctions homographiques et irrationnelles, arithmétique dans N et Z, systèmes dans R², composition et involutions.",
      timeLimitMinutes: 60,
      published: true,
    },
  });

  console.log(`Examen initialisé : ${exam.title} (ID: ${exam.id})`);

  // Nettoyer les liaisons précédentes
  await prisma.qcmExamQuestion.deleteMany({
    where: { examId: exam.id },
  });

  // Insérer les 35 questions et lier à l'examen
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
