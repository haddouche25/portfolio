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
  // SECTION A : DÉFINITIONS, GRAPHE & ÉGALITÉ D'APPLICATIONS (Q1 à Q8)
  // =========================================================================
  {
    topic: "Généralités sur les applications",
    difficulty: "Facile",
    question:
      "Parmi les relations suivantes entre $E$ et $F$, laquelle définit rigoureusement une application $f : E \\to F$ ?",
    explanation:
      "Par définition, une relation de $E$ vers $F$ est une application si et seulement si tout élément de l'ensemble de départ $E$ admet un unique élément image dans l'ensemble d'arrivée $F$[cite: 12].",
    options: [
      {
        text: "Chaque élément de $E$ admet un et un seul élément image dans $F$",
        isCorrect: true,
      },
      {
        text: "Chaque élément de $F$ admet au moins un antécédent dans $E$",
        isCorrect: false,
      },
      {
        text: "Chaque élément de $E$ admet au moins une image dans $F$",
        isCorrect: false,
      },
      {
        text: "Chaque élément de $F$ admet au plus un antécédent dans $E$",
        isCorrect: false,
      },
    ],
  },
  {
    topic: "Ensemble de départ et d'arrivée",
    difficulty: "Facile",
    question:
      "On considère la relation $f : \\mathbb{R} \\to \\mathbb{R}$ définie par $f(x) = \\dfrac{2x+10}{x-1}$[cite: 19, 39]. Pourquoi $f$ n'est-elle pas une application de $\\mathbb{R}$ vers $\\mathbb{R}$ ?",
    explanation:
      "Le réel $1$ appartient à l'ensemble de départ $\\mathbb{R}$ mais n'admet aucune image car le dénominateur s'annule en $1$ ($1 \\notin D_f$). Pour en faire une application, l'ensemble de départ doit être restreint à $\\mathbb{R} \\setminus \\{1\\}$.",
    options: [
      {
        text: "L'élément $1 \\in \\mathbb{R}$ n'a pas d'image par $f$",
        isCorrect: true,
      },
      {
        text: "L'élément $2 \\in \\mathbb{R}$ n'a aucun antécédent par $f$",
        isCorrect: false,
      },
      { text: "$f(x)$ prend des valeurs négatives", isCorrect: false },
      {
        text: "L'équation $f(x) = 0$ possède deux solutions",
        isCorrect: false,
      },
    ],
  },
  {
    topic: "Ensemble d'arrivée d'une application",
    difficulty: "Moyen",
    question:
      "On considère la correspondance $g : \\mathbb{N} \\to \\mathbb{N}$ qui à tout entier $n$ associe $g(n) = n - 3$. Est-ce une application ?",
    explanation:
      "Pour $n = 0 \\in \\mathbb{N}$, l'image serait $g(0) = -3 \\notin \\mathbb{N}$. L'image de $0$ (ainsi que de $1$ et $2$) ne tombe pas dans l'ensemble d'arrivée $\\mathbb{N}$. Ce n'est donc pas une application de $\\mathbb{N}$ vers $\\mathbb{N}$.",
    options: [
      {
        text: "Non, car $g(0) = -3 \\notin \\mathbb{N}$ (l'image sort de l'ensemble d'arrivée)",
        isCorrect: true,
      },
      {
        text: "Oui, car tout entier naturel possède un unique résultat par $n - 3$",
        isCorrect: false,
      },
      { text: "Oui, et elle est même bijective", isCorrect: false },
      { text: "Non, car $3$ possède plusieurs images", isCorrect: false },
    ],
  },
  {
    topic: "Graphe d'une application",
    difficulty: "Facile",
    question:
      "Soit $f : E \\to F$ une application[cite: 12]. Comment définit-on le **graphe** $\\Gamma_f$ de l'application $f$ dans le produit cartésien $E \\times F$ ?",
    explanation:
      "Le graphe d'une application $f : E \\to F$ est la partie du produit cartésien $E \\times F$ formée des couples $(x, f(x))$ où $x$ décrit $E$ : $\\Gamma_f = \\{(x, y) \\in E \\times F \\mid y = f(x)\\}$.",
    options: [
      {
        text: "$\\Gamma_f = \\{(x, y) \\in E \\times F \\mid y = f(x)\\}$",
        isCorrect: true,
      },
      { text: "$\\Gamma_f = \\{f(x) \\mid x \\in E\\}$", isCorrect: false },
      {
        text: "$\\Gamma_f = \\{(x, y) \\in E \\times F \\mid x = f(y)\\}$",
        isCorrect: false,
      },
      { text: "$\\Gamma_f = E \\cup F$", isCorrect: false },
    ],
  },
  {
    topic: "Égalité de deux applications",
    difficulty: "Facile",
    question:
      "Soient $f : \\mathbb{R} \\to \\mathbb{R}, x \\mapsto |x|$ et $g : [0, +\\infty[ \\to \\mathbb{R}, x \\mapsto x$. Les applications $f$ et $g$ sont-elles égales ?",
    explanation:
      "Deux applications sont égales si et seulement si elles ont le même ensemble de départ, le même ensemble d'arrivée, et vérifient $f(x) = g(x)$ pour tout $x$ du départ. Ici, les ensembles de départ sont distincts ($\\mathbb{R} \\neq [0, +\\infty[$).",
    options: [
      {
        text: "Non, car leurs ensembles de départ sont distincts ($\\mathbb{R} \\neq [0, +\\infty[$)",
        isCorrect: true,
      },
      {
        text: "Oui, car pour tout $x \\ge 0$, on a $f(x) = g(x)$",
        isCorrect: false,
      },
      {
        text: "Non, car leurs ensembles d'arrivée sont distincts",
        isCorrect: false,
      },
      { text: "Oui, car $|x| = x$ sur $\\mathbb{R}^+$", isCorrect: false },
    ],
  },
  {
    topic: "Égalité de deux applications",
    difficulty: "Moyen",
    question:
      "Soient $f : \\mathbb{R} \\setminus \\{1\\} \\to \\mathbb{R}, x \\mapsto \\dfrac{x^2 - 1}{x - 1}$ et $g : \\mathbb{R} \\setminus \\{1\\} \\to \\mathbb{R}, x \\mapsto x + 1$. A-t-on $f = g$ ?",
    explanation:
      "Les deux applications ont exactement le même ensemble de départ $\\mathbb{R} \\setminus \\{1\\}$ et le même ensemble d'arrivée $\\mathbb{R}$. De plus, pour tout $x \\neq 1$, $\\dfrac{x^2-1}{x-1} = \\dfrac{(x-1)(x+1)}{x-1} = x + 1 = g(x)$. Donc $f = g$.",
    options: [
      {
        text: "Oui, car elles ont mêmes ensembles de départ/arrivée et $(\\forall x \\neq 1) \\; f(x) = g(x)$",
        isCorrect: true,
      },
      {
        text: "Non, car $g(1)$ existe alors que $f(1)$ n'existe pas",
        isCorrect: false,
      },
      {
        text: "Non, car $f$ est rationnelle et $g$ est polynomiale",
        isCorrect: false,
      },
      {
        text: "Oui, même si on remplace l'ensemble de départ de $g$ par $\\mathbb{R}$",
        isCorrect: false,
      },
    ],
  },
  {
    topic: "Restriction et Prolongement",
    difficulty: "Facile",
    question:
      "Soit $f : \\mathbb{R} \\to \\mathbb{R}$ définie par $f(x) = |x^2 - 4|$ et soit $g : [-2, 2] \\to \\mathbb{R}$ définie par $g(x) = 4 - x^2$. Quelle est la relation exacte entre $f$ et $g$ ?",
    explanation:
      "Sur $[-2, 2]$, $x^2 - 4 \\le 0$, donc $|x^2 - 4| = 4 - x^2 = g(x)$. L'application $g$ est donc la **restriction** de $f$ à l'intervalle $[-2, 2]$ (et $f$ est un **prolongement** de $g$ à $\\mathbb{R}$).",
    options: [
      {
        text: "$g$ est la restriction de $f$ à $[-2, 2]$, et $f$ est un prolongement de $g$ à $\\mathbb{R}$",
        isCorrect: true,
      },
      {
        text: "$f$ est la restriction de $g$ à $\\mathbb{R}$",
        isCorrect: false,
      },
      { text: "$f$ et $g$ sont deux applications égales", isCorrect: false },
      { text: "$g$ est la bijection réciproque de $f$", isCorrect: false },
    ],
  },
  {
    topic: "Fonction caractéristique d'une partie",
    difficulty: "Moyen",
    question:
      "Soit $A$ une partie d'un ensemble $E$[cite: 11]. On appelle fonction caractéristique (ou indicatrice) de $A$ l'application $\\chi_A : E \\to \\{0, 1\\}$ définie par $\\chi_A(x) = 1$ si $x \\in A$ et $\\chi_A(x) = 0$ si $x \\notin A$. Que vaut $\\chi_{\\overline{A}}(x)$ pour tout $x \\in E$ ?",
    explanation:
      "Si $x \\in A$, alors $x \\notin \\overline{A}$[cite: 11], donc $\\chi_{\\overline{A}}(x) = 0 = 1 - 1 = 1 - \\chi_A(x)$. Si $x \\notin A$, alors $x \\in \\overline{A}$[cite: 11], donc $\\chi_{\\overline{A}}(x) = 1 = 1 - 0 = 1 - \\chi_A(x)$. Dans tous les cas : $\\chi_{\\overline{A}} = 1 - \\chi_A$.",
    options: [
      { text: "$\\chi_{\\overline{A}}(x) = 1 - \\chi_A(x)$", isCorrect: true },
      { text: "$\\chi_{\\overline{A}}(x) = -\\chi_A(x)$", isCorrect: false },
      {
        text: "$\\chi_{\\overline{A}}(x) = \\dfrac{1}{\\chi_A(x)}$",
        isCorrect: false,
      },
      { text: "$\\chi_{\\overline{A}}(x) = \\chi_A(x)$", isCorrect: false },
    ],
  },

  // =========================================================================
  // SECTION B : CALCUL D'IMAGES ET D'ANTÉCÉDENTS (Q9 à Q15)
  // =========================================================================
  {
    topic: "Calcul d'antécédents",
    difficulty: "Facile",
    question:
      "Soit $f : \\mathbb{R} \\to \\mathbb{R}$ définie par $f(x) = x^2 - 6x + 5$[cite: 19, 39]. Quels sont les antécédents de $0$ par l'application $f$[cite: 19, 39] ?",
    explanation:
      "On résout $f(x) = 0 \\iff x^2 - 6x + 5 = 0 \\iff (x-1)(x-5) = 0$. Les antécédents de $0$ sont donc exactement $1$ et $5$.",
    options: [
      { text: "$1$ et $5$", isCorrect: true },
      { text: "$-1$ et $-5$", isCorrect: false },
      { text: "$0$ et $5$", isCorrect: false },
      { text: "Uniquement $5$", isCorrect: false },
    ],
  },
  {
    topic: "Calcul d'antécédents sur domaine restreint",
    difficulty: "Moyen",
    question:
      "Soit $f : ]1, +\\infty[ \\to ]1, +\\infty[$ définie par $f(x) = x^2 - 2x + 2$ (Devoir Modèle 12)[cite: 55]. Quels sont les antécédents de $1$ par $f$ dans son ensemble de départ $]1, +\\infty[$ ?",
    explanation:
      "Attention au piège du domaine ! Dans $\\mathbb{R}$, $f(x) = 1 \\iff (x-1)^2 + 1 = 1 \\iff x = 1$. Or $1 \\notin ]1, +\\infty[$ (ensemble de départ ouvert en $1$)[cite: 55]. Donc $1$ n'admet **aucun** antécédent dans $]1, +\\infty[$.",
    options: [
      {
        text: "Aucun antécédent (car $1 \\notin ]1, +\\infty[$)",
        isCorrect: true,
      },
      { text: "Un unique antécédent : $x = 1$", isCorrect: false },
      { text: "Deux antécédents : $x = 1$ et $x = -1$", isCorrect: false },
      { text: "Un unique antécédent : $x = 2$", isCorrect: false },
    ],
  },
  {
    topic: "Antécédents trigonométriques",
    difficulty: "Moyen",
    question:
      "Soit $g : \\mathbb{R} \\to \\mathbb{R}$ définie par $g(x) = \\cos(x)$ (Devoir Modèle 12)[cite: 55]. Quel est l'ensemble de tous les antécédents de $1$ par $g$[cite: 55] ?",
    explanation:
      "Résoudre $g(x) = 1$ dans $\\mathbb{R}$ revient à résoudre $\\cos(x) = 1 \\iff x = 2k\\pi$ avec $k \\in \\mathbb{Z}$. L'ensemble des antécédents est donc $\\{2k\\pi \\mid k \\in \\mathbb{Z}\\}$.",
    options: [
      { text: "$\\{2k\\pi \\mid k \\in \\mathbb{Z}\\}$", isCorrect: true },
      { text: "Uniquement $0$", isCorrect: false },
      { text: "$\\{k\\pi \\mid k \\in \\mathbb{Z}\\}$", isCorrect: false },
      {
        text: "$\\{\\dfrac{\\pi}{2} + k\\pi \\mid k \\in \\mathbb{Z}\\}$",
        isCorrect: false,
      },
    ],
  },
  {
    topic: "Antécédents d'une fonction homographique",
    difficulty: "Facile",
    question:
      "Soit $f : \\mathbb{R} \\setminus \\{1\\} \\to \\mathbb{R}$ définie par $f(x) = \\dfrac{2x+3}{x-1}$[cite: 14, 16, 63, 65]. Quel est l'ensemble des antécédents du réel $2$ par $f$ ?",
    explanation:
      "L'équation $f(x) = 2 \\iff \\dfrac{2x+3}{x-1} = 2 \\iff 2x + 3 = 2x - 2 \\iff 3 = -2$ (impossible). Le réel $2$ n'admet donc aucun antécédent par $f$[cite: 17, 66].",
    options: [
      { text: "$\\emptyset$ ($2$ n'a aucun antécédent)", isCorrect: true },
      { text: "$\\{1\\}$", isCorrect: false },
      { text: "$\\{-3/2\\}$", isCorrect: false },
      { text: "$\\{7\\}$", isCorrect: false },
    ],
  },
  {
    topic: "Calcul d'images pour couples",
    difficulty: "Facile",
    question:
      "Soient $f : \\mathbb{R}^2 \\to \\mathbb{R}^2, (x,y) \\mapsto (x+3y, x-y)$ et $g : \\mathbb{N}^2 \\to \\mathbb{N}, (n,p) \\mapsto n+p$ (Série 2 Exercice 6). Que valent $f((1, 0))$ et $g((0, 2))$ ?",
    explanation:
      "En remplaçant directement : $f((1, 0)) = (1 + 3(0), 1 - 0) = (1, 1)$ et $g((0, 2)) = 0 + 2 = 2$.",
    options: [
      { text: "$f((1, 0)) = (1, 1)$ et $g((0, 2)) = 2$", isCorrect: true },
      { text: "$f((1, 0)) = (4, 1)$ et $g((0, 2)) = 0$", isCorrect: false },
      { text: "$f((1, 0)) = 2$ et $g((0, 2)) = (0, 2)$", isCorrect: false },
      { text: "$f((1, 0)) = (1, -1)$ et $g((0, 2)) = 2$", isCorrect: false },
    ],
  },
  {
    topic: "Équation réciproque x + 1/x",
    difficulty: "Difficile",
    question:
      "Soit $f : \\mathbb{R}^* \\to \\mathbb{R}$ définie par $f(x) = x + \\dfrac{1}{x}$ (Devoir Modèle 8)[cite: 21, 22]. Quels sont les antécédents de $\\dfrac{17}{4}$ par l'application $f$ ?",
    explanation:
      "On remarque que $\\dfrac{17}{4} = 4 + \\dfrac{1}{4}$[cite: 23]. Or $f(a) = f(b) \\iff a = b \\text{ ou } a = \\dfrac{1}{b}$[cite: 21, 22, 23]. Ainsi $f(x) = f(4) \\iff x = 4 \\text{ ou } x = \\dfrac{1}{4}$.",
    options: [
      { text: "$4$ et $\\dfrac{1}{4}$", isCorrect: true },
      { text: "Uniquement $4$", isCorrect: false },
      { text: "$2, -2, \\dfrac{1}{2}$ et $-\\dfrac{1}{2}$", isCorrect: false },
      { text: "$\\emptyset$", isCorrect: false },
    ],
  },
  {
    topic: "Antécédents avec valeur absolue",
    difficulty: "Moyen",
    question:
      "Soit $f : \\mathbb{R} \\to \\mathbb{R}$ définie par $f(x) = |x - 2| + x$. Déterminer l'ensemble des antécédents de $2$ par $f$ :",
    explanation:
      "Si $x \\le 2$, alors $|x - 2| = 2 - x$, donc $f(x) = (2 - x) + x = 2$. Tout réel $x \\le 2$ a donc pour image $2$ ! Si $x > 2$, $f(x) = 2x - 2 > 2$. L'ensemble des antécédents de $2$ est donc l'intervalle $]-\\infty, 2]$ tout entier.",
    options: [
      { text: "L'intervalle $]-\\infty, 2]$ tout entier", isCorrect: true },
      { text: "Uniquement $x = 2$", isCorrect: false },
      { text: "$\\{0, 2\\}$", isCorrect: false },
      { text: "L'intervalle $[2, +\\infty[$", isCorrect: false },
    ],
  },

  // =========================================================================
  // SECTION C : IMAGE DIRECTE f(A) — CALCULS & PROPRIÉTÉS (Q16 à Q24)
  // =========================================================================
  {
    topic: "Image directe - Définition",
    difficulty: "Facile",
    question:
      "Soit $f : E \\to F$ une application et $A \\subset E$[cite: 12]. Quelle est la caractérisation logique exacte de la proposition « $y \\in f(A)$ »[cite: 12] ?",
    explanation:
      "Par définition de l'image directe, $y \\in f(A) \\iff (\\exists x \\in A) \\text{ tel que } y = f(x)$[cite: 12].",
    options: [
      { text: "$(\\exists x \\in A) \\quad y = f(x)$", isCorrect: true },
      { text: "$(\\forall x \\in A) \\quad y = f(x)$", isCorrect: false },
      { text: "$(\\exists x \\in E) \\quad y = f(x)$", isCorrect: false },
      { text: "$f(y) \\in A$", isCorrect: false },
    ],
  },
  {
    topic: "Image directe d'une parabole sur R",
    difficulty: "Moyen",
    question:
      "Soit $f : \\mathbb{R} \\to \\mathbb{R}$ définie par $f(x) = x^2 + 2x + 2$ (Série 2 Exercice 1)[cite: 14, 15, 63, 64]. Que vaut l'image directe $f(\\mathbb{R})$[cite: 14, 15, 63, 64] ?",
    explanation:
      "Forme canonique : $f(x) = (x+1)^2 + 1$[cite: 15, 64]. Pour tout $x \\in \\mathbb{R}$, $(x+1)^2 \\ge 0 \\iff f(x) \\ge 1$, et toute valeur $y \\ge 1$ admet au moins un antécédent $x = -1 + \\sqrt{y-1}$[cite: 15, 64]. Donc $f(\\mathbb{R}) = [1, +\\infty[$[cite: 15, 64].",
    options: [
      { text: "$[1, +\\infty[$", isCorrect: true },
      { text: "$[2, +\\infty[$", isCorrect: false },
      { text: "$[0, +\\infty[$", isCorrect: false },
      { text: "$\\mathbb{R}$", isCorrect: false },
    ],
  },
  {
    topic: "Image directe sur demi-droites",
    difficulty: "Moyen",
    question:
      "Pour la même application $f(x) = x^2 + 2x + 2 = (x+1)^2 + 1$[cite: 14, 15, 63, 64], comparer $f([-1, +\\infty[)$ et $f(]-\\infty, -1])$[cite: 14, 15, 63, 64] :",
    explanation:
      "Par symétrie de la parabole autour de l'axe $x = -1$, sur $[-1, +\\infty[$ comme sur $]-\\infty, -1]$, $(x+1)^2$ parcourt $[0, +\\infty[$, donc $f(x)$ parcourt $[1, +\\infty[$ dans les deux cas[cite: 15, 64].",
    options: [
      {
        text: "$f([-1, +\\infty[) = f(]-\\infty, -1]) = [1, +\\infty[$",
        isCorrect: true,
      },
      {
        text: "$f([-1, +\\infty[) = [1, +\\infty[$ et $f(]-\\infty, -1]) = ]-\\infty, 1]$",
        isCorrect: false,
      },
      {
        text: "$f([-1, +\\infty[) \\cap f(]-\\infty, -1]) = \\{1\\}$",
        isCorrect: false,
      },
      { text: "$f([-1, +\\infty[) = [2, +\\infty[$", isCorrect: false },
    ],
  },
  {
    topic: "Image directe d'un segment avec sommet intérieur",
    difficulty: "Moyen",
    question:
      "Soit $f : \\mathbb{R} \\to \\mathbb{R}$ définie par $f(x) = x^2$. Quelle est l'image directe de l'intervalle $A = [-2, 3]$, c'est-à-dire $f([-2, 3])$ ?",
    explanation:
      "Piège classique ! On ne prend pas $[f(-2), f(3)] = [4, 9]$ car $0 \\in [-2, 3]$ et le minimum de $x^2$ sur $[-2, 3]$ est atteint en $x = 0$ avec $f(0) = 0$, tandis que le maximum est $f(3) = 9$. Donc $f([-2, 3]) = [0, 9]$.",
    options: [
      { text: "$[0, 9]$", isCorrect: true },
      { text: "$[4, 9]$", isCorrect: false },
      { text: "$[-4, 9]$", isCorrect: false },
      { text: "$[0, 4]$", isCorrect: false },
    ],
  },
  {
    topic: "Image directe d'une fonction homographique",
    difficulty: "Moyen",
    question:
      "Soit $f : \\mathbb{R} \\setminus \\{1\\} \\to \\mathbb{R}$ définie par $f(x) = \\dfrac{2x+3}{x-1}$[cite: 14, 16, 63, 65]. Quelle est l'image directe $f(\\mathbb{R} \\setminus \\{1\\})$[cite: 14, 17, 63, 66] ?",
    explanation:
      "On a $f(x) = 2 + \\dfrac{5}{x-1}$[cite: 17, 66]. Comme $\\dfrac{5}{x-1}$ prend toutes les valeurs réelles non nulles lorsque $x$ décrit $\\mathbb{R} \\setminus \\{1\\}$, $f(x)$ prend toutes les valeurs réelles sauf $2$[cite: 17, 66]. Donc $f(\\mathbb{R} \\setminus \\{1\\}) = \\mathbb{R} \\setminus \\{2\\}$[cite: 17, 66].",
    options: [
      { text: "$\\mathbb{R} \\setminus \\{2\\}$", isCorrect: true },
      { text: "$\\mathbb{R} \\setminus \\{1\\}$", isCorrect: false },
      { text: "$\\mathbb{R} \\setminus \\{-3/2\\}$", isCorrect: false },
      { text: "$]2, +\\infty[$", isCorrect: false },
    ],
  },
  {
    topic: "Image directe d'un intervalle par fonction homographique",
    difficulty: "Difficile",
    question:
      "Pour $f : \\mathbb{R} \\setminus \\{1\\} \\to \\mathbb{R}, x \\mapsto \\dfrac{2x+3}{x-1} = 2 + \\dfrac{5}{x-1}$ (Série 2 Exercice 4)[cite: 14, 17, 63, 66], que vaut l'image directe $f(]-\\infty, 1[)$[cite: 14, 17, 63, 66] ?",
    explanation:
      "Soit $y \\in \\mathbb{R}$[cite: 17, 66]. $y = f(x)$ avec $x < 1 \\iff x = 1 + \\dfrac{5}{y-2} < 1 \\iff \\dfrac{5}{y-2} < 0 \\iff y - 2 < 0 \\iff y < 2$[cite: 17, 66]. Donc $f(]-\\infty, 1[) = ]-\\infty, 2[$[cite: 17, 66].",
    options: [
      { text: "$]-\\infty, 2[$", isCorrect: true },
      { text: "$]2, +\\infty[$", isCorrect: false },
      { text: "$]-\\infty, 1[$", isCorrect: false },
      { text: "$]-\\infty, -3[$", isCorrect: false },
    ],
  },
  {
    topic: "Propriétés ensemblistes de l'image directe",
    difficulty: "Moyen",
    question:
      "Soient $A$ et $B$ deux parties de l'ensemble de départ $E$ d'une application $f : E \\to F$[cite: 14, 63]. Laquelle des propositions suivantes est TOUJOURS vraie[cite: 14, 63] ?",
    explanation:
      "L'image directe conserve l'inclusion ($A \\subset B \\implies f(A) \\subset f(B)$) et la réunion ($f(A \\cup B) = f(A) \\cup f(B)$)[cite: 14, 63]. En revanche, pour l'intersection, on a seulement $f(A \\cap B) \\subset f(A) \\cap f(B)$[cite: 14, 63].",
    options: [
      { text: "$f(A \\cup B) = f(A) \\cup f(B)$", isCorrect: true },
      { text: "$f(A \\cap B) = f(A) \\cap f(B)$", isCorrect: false },
      { text: "$f(A \\setminus B) = f(A) \\setminus f(B)$", isCorrect: false },
      { text: "$f(E \\setminus A) = F \\setminus f(A)$", isCorrect: false },
    ],
  },
  {
    topic: "Contre-exemple f(A ∩ B) ≠ f(A) ∩ f(B)",
    difficulty: "Moyen",
    question:
      "Soit $f : \\mathbb{R} \\to \\mathbb{R}, x \\mapsto x^2$, et soient $A = [-2, 0]$ et $B = [0, 2]$. Que valent $f(A \\cap B)$ et $f(A) \\cap f(B)$ ?",
    explanation:
      "On a $A \\cap B = \\{0\\}$, donc $f(A \\cap B) = f(\\{0\\}) = \\{0\\}$. En revanche, $f(A) = [0, 4]$ et $f(B) = [0, 4]$, d'où $f(A) \\cap f(B) = [0, 4]$. C'est le contre-exemple classique montrant que $f(A \\cap B) \\subsetneq f(A) \\cap f(B)$[cite: 14, 63].",
    options: [
      {
        text: "$f(A \\cap B) = \\{0\\}$ alors que $f(A) \\cap f(B) = [0, 4]$",
        isCorrect: true,
      },
      {
        text: "$f(A \\cap B) = [0, 4]$ et $f(A) \\cap f(B) = \\{0\\}$",
        isCorrect: false,
      },
      { text: "$f(A \\cap B) = f(A) \\cap f(B) = [0, 4]$", isCorrect: false },
      { text: "$f(A \\cap B) = \\emptyset$", isCorrect: false },
    ],
  },

  // =========================================================================
  // SECTION D : IMAGE RÉCIPROQUE f⁻¹(B) — CALCULS & PROPRIÉTÉS (Q25 à Q32)
  // =========================================================================
  {
    topic: "Image réciproque - Définition",
    difficulty: "Facile",
    question:
      "Soit $f : E \\to F$ une application et $B \\subset F$[cite: 12]. Quelle est la définition rigoureuse de l'image réciproque $f^{-1}(B)$[cite: 12] ?",
    explanation:
      "Par définition, $f^{-1}(B)$ est la partie de l'ensemble de départ $E$ constituée des éléments dont l'image appartient à $B$ : $f^{-1}(B) = \\{x \\in E \\mid f(x) \\in B\\} \\subset E$[cite: 12]. Nota : cette notation a un sens même si $f$ n'est pas bijective !",
    options: [
      { text: "$\\{x \\in E \\mid f(x) \\in B\\}$", isCorrect: true },
      { text: "$\\{y \\in F \\mid f(y) \\in B\\}$", isCorrect: false },
      { text: "$\\{f(x) \\mid x \\in B\\}$", isCorrect: false },
      { text: "Elle n'existe que si $f$ est une bijection", isCorrect: false },
    ],
  },
  {
    topic: "Image réciproque d'un singleton",
    difficulty: "Moyen",
    question:
      "Soit $f : \\mathbb{R} \\to \\mathbb{R}$ définie par $f(x) = x^2 + 2x + 2$[cite: 14, 15, 63, 64]. Déterminer $f^{-1}(\\{2\\})$ et $f^{-1}([0, +\\infty[)$[cite: 14, 15, 63, 64] :",
    explanation:
      "$f(x) = 2 \\iff x(x+2) = 0 \\iff x \\in \\{-2, 0\\}$[cite: 15, 64]. Par ailleurs, pour tout $x \\in \\mathbb{R}$, $f(x) = (x+1)^2 + 1 \\ge 1 \\ge 0$ est toujours vraie, donc $f^{-1}([0, +\\infty[) = \\mathbb{R}$[cite: 15, 64].",
    options: [
      {
        text: "$f^{-1}(\\{2\\}) = \\{-2, 0\\}$ et $f^{-1}([0, +\\infty[) = \\mathbb{R}$",
        isCorrect: true,
      },
      {
        text: "$f^{-1}(\\{2\\}) = \\{0, 2\\}$ et $f^{-1}([0, +\\infty[) = [1, +\\infty[$",
        isCorrect: false,
      },
      {
        text: "$f^{-1}(\\{2\\}) = \\{-2, 0\\}$ et $f^{-1}([0, +\\infty[) = [0, +\\infty[$",
        isCorrect: false,
      },
      {
        text: "$f^{-1}(\\{2\\}) = \\{2\\}$ et $f^{-1}([0, +\\infty[) = \\emptyset$",
        isCorrect: false,
      },
    ],
  },
  {
    topic: "Image réciproque d'un segment par une parabole",
    difficulty: "Difficile",
    question:
      "Soit $f : \\mathbb{R} \\to \\mathbb{R}$ définie par $f(x) = x^2 + 2x + 2$[cite: 14, 15, 63, 64]. Déterminer l'image réciproque $f^{-1}([5, 10])$[cite: 14, 15, 63, 64] :",
    explanation:
      "$5 \\le (x+1)^2 + 1 \\le 10 \\iff 4 \\le (x+1)^2 \\le 9 \\iff 2 \\le |x+1| \\le 3$[cite: 15, 64]. Cas 1 : $2 \\le x+1 \\le 3 \\iff x \\in [1, 2]$[cite: 15, 64]. Cas 2 : $-3 \\le x+1 \\le -2 \\iff x \\in [-4, -3]$[cite: 15, 64]. Donc $f^{-1}([5, 10]) = [-4, -3] \\cup [1, 2]$[cite: 15, 64].",
    options: [
      { text: "$[-4, -3] \\cup [1, 2]$", isCorrect: true },
      { text: "$[1, 2]$", isCorrect: false },
      { text: "$[-3, 2]$", isCorrect: false },
      { text: "$[-4, 2]$", isCorrect: false },
    ],
  },
  {
    topic: "Image réciproque par une fonction homographique",
    difficulty: "Difficile",
    question:
      "Soit $f : \\mathbb{R} \\setminus \\{1\\} \\to \\mathbb{R}$ définie par $f(x) = \\dfrac{2x+3}{x-1}$ (Série 2 Exercice 4)[cite: 14, 16, 17, 63, 65, 66]. Déterminer $f^{-1}([-5, 3])$[cite: 14, 16, 17, 63, 65, 66] :",
    explanation:
      "On résout simultanément $-5 \\le \\dfrac{2x+3}{x-1} \\iff \\dfrac{7x-2}{x-1} \\ge 0 \\iff x \\in ]-\\infty, \\frac{2}{7}] \\cup ]1, +\\infty[$ et $\\dfrac{2x+3}{x-1} \\le 3 \\iff \\dfrac{-x+6}{x-1} \\le 0 \\iff x \\in ]-\\infty, 1[ \\cup [6, +\\infty[$[cite: 17, 66]. L'intersection donne $]-\\infty, \\frac{2}{7}] \\cup [6, +\\infty[$[cite: 17, 66].",
    options: [
      {
        text: "$]-\\infty, \\dfrac{2}{7}] \\cup [6, +\\infty[$",
        isCorrect: true,
      },
      { text: "$[\\dfrac{2}{7}, 6]$", isCorrect: false },
      { text: "$[\\dfrac{2}{7}, 1[ \\cup ]1, 6]$", isCorrect: false },
      { text: "$]-\\infty, 1[ \\cup [6, +\\infty[$", isCorrect: false },
    ],
  },
  {
    topic: "Image réciproque avec radical",
    difficulty: "Difficile",
    question:
      "Soit $f : \\mathbb{R} \\to \\mathbb{R}$ définie par $f(x) = x + \\sqrt{x^2 + 1}$ (Série 2 Exercice 10)[cite: 14, 63]. Déterminer l'image réciproque $f^{-1}(]-\\infty, 2])$[cite: 14, 63] :",
    explanation:
      "Comme $f(x) > 0$ pour tout $x \\in \\mathbb{R}$, $f(x) \\in ]-\\infty, 2] \\iff 0 < x + \\sqrt{x^2+1} \\le 2 \\iff \\sqrt{x^2+1} \\le 2 - x$[cite: 14, 63]. Si $x \\le 2$, $2-x \\ge 0$ et l'élévation au carré donne $x^2 + 1 \\le 4 - 4x + x^2 \\iff 4x \\le 3 \\iff x \\le \\dfrac{3}{4}$ (qui vérifie bien $x \\le 2$). Donc $f^{-1}(]-\\infty, 2]) = ]-\\infty, \\dfrac{3}{4}]$.",
    options: [
      { text: "$]-\\infty, \\dfrac{3}{4}]$", isCorrect: true },
      { text: "$]0, \\dfrac{3}{4}]$", isCorrect: false },
      { text: "$]-\\infty, 2]$", isCorrect: false },
      { text: "$[-\\dfrac{3}{4}, \\dfrac{3}{4}]$", isCorrect: false },
    ],
  },
  {
    topic: "Image réciproque dans N² (Arithmétique)",
    difficulty: "Moyen",
    question:
      "Soit $f : \\mathbb{N}^2 \\to \\mathbb{N}$ définie par $f(a, b) = a \\times b$ (Devoir Modèle 11 Exercice 5)[cite: 47]. Déterminer en extension $f^{-1}(\\{15\\})$[cite: 47] :",
    explanation:
      "On cherche tous les couples $(a, b) \\in \\mathbb{N}^2$ tels que $a \\times b = 15$[cite: 47]. Les diviseurs positifs de $15$ étant $1, 3, 5, 15$, on obtient les 4 couples ordonnés : $(1, 15), (3, 5), (5, 3)$ et $(15, 1)$. Attention à ne pas oublier les couples symétriques !",
    options: [
      { text: "$\\{(1, 15), (3, 5), (5, 3), (15, 1)\\}$", isCorrect: true },
      { text: "$\\{(1, 15), (3, 5)\\}$", isCorrect: false },
      { text: "$\\{1, 3, 5, 15\\}$", isCorrect: false },
      { text: "$\\{(3, 5), (5, 3)\\}$", isCorrect: false },
    ],
  },
  {
    topic: "Propriétés ensemblistes de l'image réciproque",
    difficulty: "Moyen",
    question:
      "Soient $C$ et $D$ deux parties de l'ensemble d'arrivée $F$ d'une application $f : E \\to F$[cite: 14, 63]. Laquelle de ces relations est **FAUSSE** ?",
    explanation:
      "Contrairement à l'image directe, l'image réciproque conserve **parfaitement** toutes les opérations ensemblistes : réunion, intersection ($f^{-1}(C \\cap D) = f^{-1}(C) \\cap f^{-1}(D)$)[cite: 14, 63] et passage au complémentaire ($f^{-1}(\\overline{C}) = \\overline{f^{-1}(C)}$). Affirmer que l'égalité d'intersection n'est pas toujours vraie est donc faux.",
    options: [
      {
        text: "$f^{-1}(C \\cap D)$ est seulement inclus dans $f^{-1}(C) \\cap f^{-1}(D)$ sans égalité générale",
        isCorrect: true,
      },
      {
        text: "$f^{-1}(C \\cap D) = f^{-1}(C) \\cap f^{-1}(D)$",
        isCorrect: false,
      },
      {
        text: "$f^{-1}(C \\cup D) = f^{-1}(C) \\cup f^{-1}(D)$",
        isCorrect: false,
      },
      {
        text: "$f^{-1}(F \\setminus C) = E \\setminus f^{-1}(C)$",
        isCorrect: false,
      },
    ],
  },
  {
    topic: "Relations croisées f(f⁻¹(B)) et f⁻¹(f(A))",
    difficulty: "Difficile",
    question:
      "Soit $f : E \\to F$ une application quelconque, $A \\subset E$ et $B \\subset F$. Quelles sont les inclusions qui sont **TOUJOURS** vraies ?",
    explanation:
      "Pour tout $x \\in A$, $f(x) \\in f(A)$, donc $x \\in f^{-1}(f(A))$, ce qui prouve $A \\subset f^{-1}(f(A))$ (avec égalité ssi $f$ est injective). Pour tout $y \\in f(f^{-1}(B))$, il existe $x \\in f^{-1}(B)$ tel que $y = f(x) \\in B$, ce qui prouve $f(f^{-1}(B)) \\subset B$ (avec égalité ssi $f$ est surjective).",
    options: [
      {
        text: "$A \\subset f^{-1}(f(A))$ et $f(f^{-1}(B)) \\subset B$",
        isCorrect: true,
      },
      {
        text: "$f^{-1}(f(A)) \\subset A$ et $B \\subset f(f^{-1}(B))$",
        isCorrect: false,
      },
      {
        text: "$f^{-1}(f(A)) = A$ et $f(f^{-1}(B)) = B$ pour toute application $f$",
        isCorrect: false,
      },
      {
        text: "$A \\subset f(f^{-1}(A))$ et $B \\subset f^{-1}(f(B))$",
        isCorrect: false,
      },
    ],
  },

  // =========================================================================
  // SECTION E : LOGIQUE DES APPLICATIONS (DEVOIR 1 SM) (Q33 à Q35)
  // =========================================================================
  {
    topic: "Logique et injectivité",
    difficulty: "Moyen",
    question:
      "Soit la proposition $(P) : « (\\forall (x, x') \\in E^2) \\; f(x) = f(x') \\implies x = x' »$[cite: 12, 19, 21, 39, 55]. Quelle est la négation exacte $(\\overline{P})$[cite: 19, 21, 22, 39, 55] ?",
    explanation:
      "La négation de l'implication $A \\implies B$ est $(A \\text{ et } \\overline{B})$[cite: 22]. Donc $(\\overline{P}) : (\\exists (x, x') \\in E^2) \\; f(x) = f(x') \\text{ et } x \\neq x'$[cite: 22].",
    options: [
      {
        text: "$(\\exists (x, x') \\in E^2) \\quad f(x) = f(x') \\text{ et } x \\neq x'$",
        isCorrect: true,
      },
      {
        text: "$(\\forall (x, x') \\in E^2) \\quad f(x) \\neq f(x') \\implies x \\neq x'$",
        isCorrect: false,
      },
      {
        text: "$(\\exists (x, x') \\in E^2) \\quad x = x' \\implies f(x) = f(x')$",
        isCorrect: false,
      },
      {
        text: "$(\\exists (x, x') \\in E^2) \\quad f(x) \\neq f(x') \\text{ et } x = x'$",
        isCorrect: false,
      },
    ],
  },
  {
    topic: "Logique et contraposée d'injectivité",
    difficulty: "Facile",
    question:
      "Quelle est la formulation par **contraposée** de la définition de l'injectivité de $f : E \\to F$ ?",
    explanation:
      "La contraposée de $f(x) = f(x') \\implies x = x'$ est $x \\neq x' \\implies f(x) \\neq f(x')$ : deux éléments distincts de $E$ ont toujours deux images distinctes dans $F$.",
    options: [
      {
        text: "$(\\forall (x, x') \\in E^2) \\quad x \\neq x' \\implies f(x) \\neq f(x')$",
        isCorrect: true,
      },
      {
        text: "$(\\forall (x, x') \\in E^2) \\quad f(x) \\neq f(x') \\implies x \\neq x'$",
        isCorrect: false,
      },
      {
        text: "$(\\exists (x, x') \\in E^2) \\quad x \\neq x' \\text{ et } f(x) = f(x')$",
        isCorrect: false,
      },
      {
        text: "$(\\forall (x, x') \\in E^2) \\quad x = x' \\implies f(x) = f(x')$",
        isCorrect: false,
      },
    ],
  },
  {
    topic: "Logique et surjectivité",
    difficulty: "Moyen",
    question:
      "Soit la proposition $(Q) : « (\\forall y \\in F) (\\exists x \\in E) \\; f(x) = y »$[cite: 12, 19, 39, 55]. Quelle est la négation exacte $(\\overline{Q})$ ?",
    explanation:
      "En inversant les quantificateurs ($\\forall$ devient $\\exists$ et $\\exists$ devient $\\forall$) et en niant l'égalité : $(\\overline{Q}) : (\\exists y \\in F) (\\forall x \\in E) \\; f(x) \\neq y$.",
    options: [
      {
        text: "$(\\exists y \\in F) (\\forall x \\in E) \\quad f(x) \\neq y$",
        isCorrect: true,
      },
      {
        text: "$(\\forall y \\in F) (\\forall x \\in E) \\quad f(x) \\neq y$",
        isCorrect: false,
      },
      {
        text: "$(\\exists y \\in F) (\\exists x \\in E) \\quad f(x) \\neq y$",
        isCorrect: false,
      },
      {
        text: "$(\\forall x \\in E) (\\exists y \\in F) \\quad f(x) \\neq y$",
        isCorrect: false,
      },
    ],
  },
];

async function main() {
  console.log(
    "Démarrage du seed : Applications (Partie 1 Enrichie - 35 Questions)...",
  );

  const exam = await prisma.qcmExam.upsert({
    where: { slug: "applications-partie-1-1bacsm" },
    update: {
      title:
        "Les Applications (Partie 1) : Fondations, Image Directe, Réciproque & Logique - 1Bac SM",
      description:
        "Épreuve complète de 35 questions (1Bac Sciences Mathématiques) : notion d'application, graphe, restriction, calcul d'antécédents, détermination de f(A) et f⁻¹(B), propriétés ensemblistes et négation logique.",
      timeLimitMinutes: 55,
      published: true,
    },
    create: {
      slug: "applications-partie-1-1bacsm",
      title:
        "Les Applications (Partie 1) : Fondations, Image Directe, Réciproque & Logique - 1Bac SM",
      description:
        "Épreuve complète de 35 questions (1Bac Sciences Mathématiques) : notion d'application, graphe, restriction, calcul d'antécédents, détermination de f(A) et f⁻¹(B), propriétés ensemblistes et négation logique.",
      timeLimitMinutes: 55,
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
