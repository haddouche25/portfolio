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
    question: "Une fonction $f$ est dérivable en $x_0$ si et seulement si :",
    topic: "Dérivation et Étude de Fonctions",
    difficulty: "Facile",
    explanation:
      "Par définition du taux d'accroissement, $f$ est dérivable en $x_0$ si et seulement si le rapport $\\frac{f(x) - f(x_0)}{x - x_0}$ admet une limite finie $\\ell \\in \\mathbb{R}$ lorsque $x \\to x_0$.",
    options: [
      {
        text: "$\\lim_{x \\to x_0} \\frac{f(x) - f(x_0)}{x - x_0} = \\ell \\in \\mathbb{R}$",
        isCorrect: true,
      },
      { text: "$f$ est continue en $x_0$", isCorrect: false },
      { text: "$f$ admet une limite finie en $x_0$", isCorrect: false },
      { text: "$f'(x_0) = 0$", isCorrect: false },
    ],
  },
  {
    question: "Le nombre dérivé $f'(x_0)$ représente géométriquement :",
    topic: "Dérivation et Étude de Fonctions",
    difficulty: "Facile",
    explanation:
      "$f'(x_0)$ est la pente (ou coefficient directeur) de la droite tangente à la courbe $(C_f)$ au point d'abscisse $x_0$.",
    options: [
      {
        text: "Le coefficient directeur de la tangente à $(C_f)$ au point d'abscisse $x_0$",
        isCorrect: true,
      },
      { text: "L'ordonnée du point $A(x_0, f(x_0))$", isCorrect: false },
      { text: "La limite de $f(x)$ en $x_0$", isCorrect: false },
      { text: "L'aire sous la courbe", isCorrect: false },
    ],
  },
  {
    question:
      "L'équation de la tangente à la courbe $(C_f)$ au point d'abscisse $x_0$ est :",
    topic: "Dérivation et Étude de Fonctions",
    difficulty: "Facile",
    explanation:
      "L'équation réduite de la tangente en un point $x_0$ s'écrit $y = f'(x_0)(x - x_0) + f(x_0)$.",
    options: [
      { text: "$y = f'(x_0)(x - x_0) + f(x_0)$", isCorrect: true },
      { text: "$y = f(x_0)(x - x_0) + f'(x_0)$", isCorrect: false },
      { text: "$y = f'(x_0)x + f(x_0)$", isCorrect: false },
      { text: "$y = f(x_0)x + f'(x_0)$", isCorrect: false },
    ],
  },
  {
    question:
      "Si $f'(x_0) = 0$, alors la tangente à $(C_f)$ au point d'abscisse $x_0$ est :",
    topic: "Dérivation et Étude de Fonctions",
    difficulty: "Facile",
    explanation:
      "Un coefficient directeur nul ($f'(x_0) = 0$) donne l'équation $y = f(x_0)$, ce qui correspond à une droite horizontale parallèle à l'axe des abscisses.",
    options: [
      { text: "Parallèle à l'axe des abscisses", isCorrect: true },
      { text: "Verticale", isCorrect: false },
      { text: "Parallèle à l'axe des ordonnées", isCorrect: false },
      { text: "Confondue avec l'axe des abscisses", isCorrect: false },
    ],
  },
  {
    question:
      "Si $f$ n'est pas dérivable en $x_0$ mais $\\lim_{x \\to x_0} \\frac{f(x) - f(x_0)}{x - x_0} = \\pm\\infty$, alors la courbe admet :",
    topic: "Dérivation et Étude de Fonctions",
    difficulty: "Facile",
    explanation:
      "Une limite infinie du taux d'accroissement au point $x_0$ traduit la présence d'une tangente (ou demi-tangente) verticale.",
    options: [
      { text: "Une demi-tangente verticale", isCorrect: true },
      { text: "Une tangente horizontale", isCorrect: false },
      { text: "Une tangente oblique", isCorrect: false },
      { text: "Un point d'inflexion", isCorrect: false },
    ],
  },
  {
    question:
      "Si $\\lim_{x \\to x_0^+} \\frac{f(x) - f(x_0)}{x - x_0} \\neq \\lim_{x \\to x_0^-} \\frac{f(x) - f(x_0)}{x - x_0}$ avec des limites finies, alors le point $A(x_0, f(x_0))$ est :",
    topic: "Dérivation et Étude de Fonctions",
    difficulty: "Facile",
    explanation:
      "Lorsque les nombres dérivés à droite et à gauche existent mais sont distincts, la courbe présente deux demi-tangentes de pentes différentes : le point est dit anguleux.",
    options: [
      { text: "Un point anguleux", isCorrect: true },
      { text: "Un point d'inflexion", isCorrect: false },
      { text: "Un extremum", isCorrect: false },
      { text: "Un point de rebroussement", isCorrect: false },
    ],
  },
  {
    question:
      "La dérivée de la fonction $f(x) = x^n$ (avec $n \\in \\mathbb{N}^*$) est :",
    topic: "Dérivation et Étude de Fonctions",
    difficulty: "Facile",
    explanation:
      "La formule usuelle de dérivation d'une puissance entière naturelle est $(x^n)' = n x^{n-1}$.",
    options: [
      { text: "$nx^{n-1}$", isCorrect: true },
      { text: "$x^{n-1}$", isCorrect: false },
      { text: "$nx^n$", isCorrect: false },
      { text: "$nx^{n+1}$", isCorrect: false },
    ],
  },
  {
    question:
      "La dérivée de la fonction $f(x) = \\sqrt{x}$ sur $]0, +\\infty[$ est :",
    topic: "Dérivation et Étude de Fonctions",
    difficulty: "Facile",
    explanation:
      "La dérivée de la fonction racine carrée sur son ensemble de dérivabilité est $(\\sqrt{x})' = \\frac{1}{2\\sqrt{x}}$.",
    options: [
      { text: "$\\frac{1}{2\\sqrt{x}}$", isCorrect: true },
      { text: "$\\frac{1}{\\sqrt{x}}$", isCorrect: false },
      { text: "$2\\sqrt{x}$", isCorrect: false },
      { text: "$-\\frac{1}{2\\sqrt{x}}$", isCorrect: false },
    ],
  },
  {
    question: "La dérivée de la fonction $f(x) = \\cos(x)$ est :",
    topic: "Dérivation et Étude de Fonctions",
    difficulty: "Facile",
    explanation: "Sur $\\mathbb{R}$, $(\\cos(x))' = -\\sin(x)$.",
    options: [
      { text: "$-\\sin(x)$", isCorrect: true },
      { text: "$\\sin(x)$", isCorrect: false },
      { text: "$\\cos(x)$", isCorrect: false },
      { text: "$-\\cos(x)$", isCorrect: false },
    ],
  },
  {
    question: "La dérivée de la fonction $f(x) = \\sin(x)$ est :",
    topic: "Dérivation et Étude de Fonctions",
    difficulty: "Facile",
    explanation: "Sur $\\mathbb{R}$, $(\\sin(x))' = \\cos(x)$.",
    options: [
      { text: "$\\cos(x)$", isCorrect: true },
      { text: "$\\sin(x)$", isCorrect: false },
      { text: "$-\\sin(x)$", isCorrect: false },
      { text: "$-\\cos(x)$", isCorrect: false },
    ],
  },
  {
    question: "La dérivée de la fonction $f(x) = \\tan(x)$ est :",
    topic: "Dérivation et Étude de Fonctions",
    difficulty: "Facile",
    explanation:
      "On a $(\\tan(x))' = 1 + \\tan^2(x) = \\frac{1}{\\cos^2(x)}$. Les deux formes sont rigoureusement identiques.",
    options: [
      {
        text: "Les deux réponses précédentes sont correctes",
        isCorrect: true,
      },
      { text: "$1 + \\tan^2(x)$", isCorrect: false },
      { text: "$\\frac{1}{\\cos^2(x)}$", isCorrect: false },
      { text: "$-\\frac{1}{\\sin^2(x)}$", isCorrect: false },
    ],
  },
  {
    question:
      "Si $u$ et $v$ sont deux fonctions dérivables sur $I$, alors la dérivée de $u \\times v$ est :",
    topic: "Dérivation et Étude de Fonctions",
    difficulty: "Facile",
    explanation:
      "La règle de dérivation du produit s'écrit $(uv)' = u'v + uv'$.",
    options: [
      { text: "$u'v + uv'$", isCorrect: true },
      { text: "$u'v'$", isCorrect: false },
      { text: "$u'v - uv'$", isCorrect: false },
      { text: "$\\frac{u'v - uv'}{v^2}$", isCorrect: false },
    ],
  },
  {
    question:
      "Si $u$ et $v$ sont dérivables sur $I$ avec $v(x) \\neq 0$, alors la dérivée de $\\frac{u}{v}$ est :",
    topic: "Dérivation et Étude de Fonctions",
    difficulty: "Facile",
    explanation:
      "La formule de dérivation d'un quotient est $\\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2}$.",
    options: [
      { text: "$\\frac{u'v - uv'}{v^2}$", isCorrect: true },
      { text: "$\\frac{u'v + uv'}{v^2}$", isCorrect: false },
      { text: "$\\frac{uv' - u'v}{v^2}$", isCorrect: false },
      { text: "$\\frac{u'}{v'}$", isCorrect: false },
    ],
  },
  {
    question:
      "La dérivée de la fonction composée $g \\circ f$ est donnée par :",
    topic: "Dérivation et Étude de Fonctions",
    difficulty: "Moyen",
    explanation:
      "Par la règle de la chaîne, $(g(f(x)))' = g'(f(x)) \\times f'(x)$.",
    options: [
      { text: "$g'(f(x)) \\times f'(x)$", isCorrect: true },
      { text: "$g'(x) \\times f'(x)$", isCorrect: false },
      { text: "$g(f'(x))$", isCorrect: false },
      { text: "$f'(g(x))$", isCorrect: false },
    ],
  },
  {
    question:
      "La dérivée de la fonction $f(x) = \\sqrt{u(x)}$ (avec $u(x) > 0$) est :",
    topic: "Dérivation et Étude de Fonctions",
    difficulty: "Facile",
    explanation:
      "En appliquant la règle de dérivation des composées à la fonction racine carrée, $(\\sqrt{u})' = \\frac{u'}{2\\sqrt{u}}$.",
    options: [
      { text: "$\\frac{u'(x)}{2\\sqrt{u(x)}}$", isCorrect: true },
      { text: "$\\frac{u'(x)}{\\sqrt{u(x)}}$", isCorrect: false },
      { text: "$\\frac{1}{2\\sqrt{u(x)}}$", isCorrect: false },
      { text: "$2\\sqrt{u(x)}$", isCorrect: false },
    ],
  },
  {
    question:
      "Si la fonction dérivée $f'$ est strictement positive sur un intervalle $I$, alors la fonction $f$ est :",
    topic: "Dérivation et Étude de Fonctions",
    difficulty: "Facile",
    explanation:
      "Le signe strictement positif de la dérivée entraîne la stricte croissance de la fonction sur cet intervalle.",
    options: [
      { text: "Strictement croissante sur $I$", isCorrect: true },
      { text: "Strictement décroissante sur $I$", isCorrect: false },
      { text: "Constante sur $I$", isCorrect: false },
      { text: "Négative sur $I$", isCorrect: false },
    ],
  },
  {
    question:
      "Si la fonction dérivée $f'$ est strictement négative sur un intervalle $I$, alors la fonction $f$ est :",
    topic: "Dérivation et Étude de Fonctions",
    difficulty: "Facile",
    explanation:
      "Une dérivée strictement négative sur un intervalle implique que la fonction est strictement décroissante.",
    options: [
      { text: "Strictement décroissante sur $I$", isCorrect: true },
      { text: "Strictement croissante sur $I$", isCorrect: false },
      { text: "Constante sur $I$", isCorrect: false },
      { text: "Positive sur $I$", isCorrect: false },
    ],
  },
  {
    question:
      "Si $f'$ est identiquement nulle sur un intervalle $I$, alors $f$ est :",
    topic: "Dérivation et Étude de Fonctions",
    difficulty: "Facile",
    explanation:
      "Une fonction dont la dérivée s'annule sur tout un intervalle est une fonction constante sur cet intervalle.",
    options: [
      { text: "Constante sur $I$", isCorrect: true },
      { text: "Strictement croissante sur $I$", isCorrect: false },
      { text: "Strictement décroissante sur $I$", isCorrect: false },
      { text: "Nulle sur $I$", isCorrect: false },
    ],
  },
  {
    question:
      "Si $f$ est dérivable sur un intervalle ouvert $I$ et admet un extremum local en $a \\in I$, alors :",
    topic: "Dérivation et Étude de Fonctions",
    difficulty: "Moyen",
    explanation:
      "D'après le théorème de Fermat sur les points stationnaires, si un extremum local est atteint en un point d'un ouvert où la fonction est dérivable, sa dérivée s'y annule : $f'(a) = 0$.",
    options: [
      { text: "$f'(a) = 0$", isCorrect: true },
      { text: "$f'(a) > 0$", isCorrect: false },
      { text: "$f'(a) < 0$", isCorrect: false },
      { text: "$f'(a)$ n'existe pas", isCorrect: false },
    ],
  },
  {
    question: "La condition $f'(a) = 0$ est une condition :",
    topic: "Dérivation et Étude de Fonctions",
    difficulty: "Moyen",
    explanation:
      "C'est une condition nécessaire (sur un ouvert), mais pas suffisante : par exemple pour $f(x) = x^3$ en 0, $f'(0) = 0$ mais 0 n'est pas un extremum local.",
    options: [
      {
        text: "Nécessaire pour que $f$ admette un extremum en $a$",
        isCorrect: true,
      },
      {
        text: "Suffisante pour que $f$ admette un extremum en $a$",
        isCorrect: false,
      },
      {
        text: "Nécessaire et suffisante pour que $f$ admette un extremum en $a$",
        isCorrect: false,
      },
      { text: "Indépendante des extrema", isCorrect: false },
    ],
  },
  {
    question:
      "Si $f'(a) = 0$ et si $f'$ change de signe au voisinage de $a$, alors :",
    topic: "Dérivation et Étude de Fonctions",
    difficulty: "Facile",
    explanation:
      "L'annulation de la dérivée avec changement de signe caractérise un passage par un extremum local (maximum si $f'$ passe de $+$ à $-$, minimum si de $-$ à $+$).",
    options: [
      { text: "$f(a)$ est un extremum local de $f$", isCorrect: true },
      { text: "$f(a)$ n'est pas un extremum local", isCorrect: false },
      { text: "$f$ est constante", isCorrect: false },
      { text: "$f$ n'est pas dérivable en $a$", isCorrect: false },
    ],
  },
  {
    question:
      "Si $f''(x) > 0$ sur un intervalle $I$, alors la courbe $(C_f)$ est :",
    topic: "Dérivation et Étude de Fonctions",
    difficulty: "Facile",
    explanation:
      "Une dérivée seconde strictement positive indique que la dérivée première $f'$ est croissante, ce qui correspond géométriquement à une fonction convexe.",
    options: [
      { text: "Convexe sur $I$", isCorrect: true },
      { text: "Concave sur $I$", isCorrect: false },
      { text: "Une droite sur $I$", isCorrect: false },
      { text: "Décroissante sur $I$", isCorrect: false },
    ],
  },
  {
    question:
      "Si $f''(x) < 0$ sur un intervalle $I$, alors la courbe $(C_f)$ est :",
    topic: "Dérivation et Étude de Fonctions",
    difficulty: "Facile",
    explanation:
      "Une dérivée seconde négative correspond à une courbe située sous ses tangentes : la fonction est concave.",
    options: [
      { text: "Concave sur $I$", isCorrect: true },
      { text: "Convexe sur $I$", isCorrect: false },
      { text: "Croissante sur $I$", isCorrect: false },
      { text: "Un segment sur $I$", isCorrect: false },
    ],
  },
  {
    question:
      "Un point d'inflexion $A(x_0, f(x_0))$ sur la courbe $(C_f)$ est un point où :",
    topic: "Dérivation et Étude de Fonctions",
    difficulty: "Facile",
    explanation:
      "Un point d'inflexion est le point où la courbe traverse sa tangente, ce qui se traduit analytiquement par l'annulation de $f''$ avec changement de signe.",
    options: [
      {
        text: "$f''(x_0) = 0$ et $f''$ change de signe",
        isCorrect: true,
      },
      { text: "$f'(x_0) = 0$", isCorrect: false },
      { text: "La tangente est horizontale", isCorrect: false },
      { text: "La fonction s'annule", isCorrect: false },
    ],
  },
  {
    question: "Une asymptote verticale d'équation $x = a$ existe si :",
    topic: "Dérivation et Étude de Fonctions",
    difficulty: "Facile",
    explanation:
      "Lorsque la variable s'approche d'une valeur finie $a$ et que la fonction explose à l'infini ($\\\\lim_{x \\to a} f(x) = \\pm\\infty$), la droite d'équation $x = a$ est une asymptote verticale.",
    options: [
      { text: "$\\lim_{x \\to a} f(x) = \\pm\\infty$", isCorrect: true },
      { text: "$\\lim_{x \\to a} f(x) = 0$", isCorrect: false },
      { text: "$\\lim_{x \\to \\pm\\infty} f(x) = a$", isCorrect: false },
      { text: "$f(a) = 0$", isCorrect: false },
    ],
  },
  {
    question: "Une asymptote horizontale d'équation $y = a$ existe si :",
    topic: "Dérivation et Étude de Fonctions",
    difficulty: "Facile",
    explanation:
      "Quand $x$ tend vers $\\pm\\infty$ et que les valeurs de la fonction se stabilisent vers un réel fixe $a$, la droite horizontale $y = a$ est asymptote.",
    options: [
      { text: "$\\lim_{x \\to \\pm\\infty} f(x) = a$", isCorrect: true },
      { text: "$\\lim_{x \\to a} f(x) = \\pm\\infty$", isCorrect: false },
      {
        text: "$\\lim_{x \\to \\pm\\infty} \\frac{f(x)}{x} = a$",
        isCorrect: false,
      },
      { text: "$f(a) = 0$", isCorrect: false },
    ],
  },
  {
    question:
      "Une asymptote oblique d'équation $y = ax + b$ existe au voisinage de l'infini si :",
    topic: "Dérivation et Étude de Fonctions",
    difficulty: "Facile",
    explanation:
      "L'écart vertical entre la courbe et la droite d'équation $y = ax + b$ doit s'annuler à l'infini : $\\lim_{x \\to \\pm\\infty} [f(x) - (ax + b)] = 0$.",
    options: [
      {
        text: "$\\lim_{x \\to \\pm\\infty} [f(x) - (ax + b)] = 0$",
        isCorrect: true,
      },
      {
        text: "$\\lim_{x \\to \\pm\\infty} \\frac{f(x)}{x} = 0$",
        isCorrect: false,
      },
      {
        text: "$\\lim_{x \\to \\pm\\infty} f(x) = \\pm\\infty$",
        isCorrect: false,
      },
      { text: "$f'(x) = a$", isCorrect: false },
    ],
  },
  {
    question:
      "Pour déterminer le coefficient directeur $a$ d'une asymptote oblique au voisinage de $+\\infty$, on calcule :",
    topic: "Dérivation et Étude de Fonctions",
    difficulty: "Facile",
    explanation:
      "Le coefficient directeur $a$ s'obtient par la limite du rapport $\\frac{f(x)}{x}$ quand $x \\to +\\infty$.",
    options: [
      { text: "$\\lim_{x \\to +\\infty} \\frac{f(x)}{x}$", isCorrect: true },
      { text: "$\\lim_{x \\to +\\infty} (f(x) - x)$", isCorrect: false },
      { text: "$\\lim_{x \\to +\\infty} f(x)$", isCorrect: false },
      { text: "$\\lim_{x \\to +\\infty} f'(x)$", isCorrect: false },
    ],
  },
  {
    question:
      "Pour déterminer l'ordonnée à l'origine $b$ d'une asymptote oblique $y = ax + b$, on calcule :",
    topic: "Dérivation et Étude de Fonctions",
    difficulty: "Facile",
    explanation:
      "Une fois $a$ déterminé, on cherche la limite de la différence : $b = \\lim_{x \\to +\\infty} [f(x) - ax]$.",
    options: [
      { text: "$\\lim_{x \\to +\\infty} [f(x) - ax]$", isCorrect: true },
      { text: "$\\lim_{x \\to +\\infty} \\frac{f(x)}{x}$", isCorrect: false },
      { text: "$\\lim_{x \\to +\\infty} f(x)$", isCorrect: false },
      { text: "$f(0)$", isCorrect: false },
    ],
  },
  {
    question:
      "Si $\\lim_{x \\to +\\infty} \\frac{f(x)}{x} = \\pm\\infty$, alors la courbe $(C_f)$ admet :",
    topic: "Dérivation et Étude de Fonctions",
    difficulty: "Moyen",
    explanation:
      "La fonction croît beaucoup plus vite que la droite $y = x$ : $(C_f)$ admet une branche parabolique de direction l'axe des ordonnées $(Oy)$.",
    options: [
      {
        text: "Une branche parabolique de direction l'axe des ordonnées",
        isCorrect: true,
      },
      { text: "Une asymptote oblique", isCorrect: false },
      { text: "Une asymptote horizontale", isCorrect: false },
      {
        text: "Une branche parabolique de direction l'axe des abscisses",
        isCorrect: false,
      },
    ],
  },
  {
    question:
      "Si $\\lim_{x \\to +\\infty} \\frac{f(x)}{x} = 0$, alors la courbe $(C_f)$ admet :",
    topic: "Dérivation et Étude de Fonctions",
    difficulty: "Moyen",
    explanation:
      "La fonction croît moins vite que la variable $x$ : $(C_f)$ présente une branche parabolique de direction l'axe des abscisses $(Ox)$.",
    options: [
      {
        text: "Une branche parabolique de direction l'axe des abscisses",
        isCorrect: true,
      },
      { text: "Une asymptote horizontale", isCorrect: false },
      {
        text: "Une branche parabolique de direction l'axe des ordonnées",
        isCorrect: false,
      },
      { text: "Une asymptote verticale", isCorrect: false },
    ],
  },
  {
    question: "L'approximation affine de $f(a+h)$ au voisinage de $h=0$ est :",
    topic: "Dérivation et Étude de Fonctions",
    difficulty: "Facile",
    explanation:
      "Au premier ordre au voisinage de 0, la formule d'approximation affine tangente est $f(a+h) \\approx f(a) + hf'(a)$.",
    options: [
      { text: "$f(a) + hf'(a)$", isCorrect: true },
      { text: "$f(a) - hf'(a)$", isCorrect: false },
      { text: "$f(a) \\times hf'(a)$", isCorrect: false },
      { text: "$f(a+h) = f(a)$", isCorrect: false },
    ],
  },
  {
    question: "L'approximation affine de $(1+h)^2$ au voisinage de $0$ est :",
    topic: "Dérivation et Étude de Fonctions",
    difficulty: "Facile",
    explanation:
      "Avec $f(x) = x^2$ en $a = 1$, $f(1) = 1$ et $f'(1) = 2$, on obtient $1 + 2h$.",
    options: [
      { text: "$1 + 2h$", isCorrect: true },
      { text: "$1 + h$", isCorrect: false },
      { text: "$1 + h^2$", isCorrect: false },
      { text: "$2h$", isCorrect: false },
    ],
  },
  {
    question:
      "L'approximation affine de $\\sqrt{1+h}$ au voisinage de $0$ est :",
    topic: "Dérivation et Étude de Fonctions",
    difficulty: "Facile",
    explanation:
      "Avec $f(x) = \\sqrt{x}$ en $a = 1$, $f(1) = 1$ et $f'(1) = \\frac{1}{2}$, donc $\\sqrt{1+h} \\approx 1 + \\frac{h}{2}$.",
    options: [
      { text: "$1 + \\frac{h}{2}$", isCorrect: true },
      { text: "$1 + h$", isCorrect: false },
      { text: "$1 - \\frac{h}{2}$", isCorrect: false },
      { text: "$1 + 2h$", isCorrect: false },
    ],
  },
  {
    question:
      "L'approximation affine de $\\frac{1}{1+h}$ au voisinage de $0$ est :",
    topic: "Dérivation et Étude de Fonctions",
    difficulty: "Facile",
    explanation:
      "Avec $f(x) = \\frac{1}{x}$ en $a = 1$, $f(1) = 1$ et $f'(1) = -1$, donc $\\frac{1}{1+h} \\approx 1 - h$.",
    options: [
      { text: "$1 - h$", isCorrect: true },
      { text: "$1 + h$", isCorrect: false },
      { text: "$1 + h^2$", isCorrect: false },
      { text: "$1 - h^2$", isCorrect: false },
    ],
  },
  {
    question: "Si $f(x) = (x^2 + 1)^5$, alors sa dérivée $f'(x)$ est :",
    topic: "Dérivation et Étude de Fonctions",
    difficulty: "Moyen",
    explanation:
      "En appliquant $(u^n)' = n u' u^{n-1}$ avec $u(x) = x^2 + 1$ et $u'(x) = 2x$ : $f'(x) = 5 \\times 2x \\times (x^2 + 1)^4 = 10x(x^2 + 1)^4$.",
    options: [
      { text: "$10x(x^2 + 1)^4$", isCorrect: true },
      { text: "$5(x^2 + 1)^4$", isCorrect: false },
      { text: "$5x(x^2 + 1)^4$", isCorrect: false },
      { text: "$2x(x^2 + 1)^5$", isCorrect: false },
    ],
  },
  {
    question: "La dérivée de $\\sin(ax+b)$ (avec $a \\in \\mathbb{R}$) est :",
    topic: "Dérivation et Étude de Fonctions",
    difficulty: "Facile",
    explanation:
      "La dérivée de $\\sin(u(x))$ est $u'(x)\\cos(u(x))$. Ici $u'(x) = a$, donc la dérivée vaut $a\\cos(ax+b)$.",
    options: [
      { text: "$a\\cos(ax+b)$", isCorrect: true },
      { text: "$\\cos(ax+b)$", isCorrect: false },
      { text: "$-a\\sin(ax+b)$", isCorrect: false },
      { text: "$a\\sin(ax+b)$", isCorrect: false },
    ],
  },
  {
    question: "La fonction $f(x) = \\sqrt{x^2 - 1}$ est dérivable sur :",
    topic: "Dérivation et Étude de Fonctions",
    difficulty: "Moyen",
    explanation:
      "Une fonction $\\sqrt{u}$ est dérivable là où $u$ est dérivable et strictement positive : $x^2 - 1 > 0 \\iff x \\in ]-\\infty, -1[ \\cup ]1, +\\infty[$.",
    options: [
      { text: "$]-\\infty, -1[ \\cup ]1, +\\infty[$", isCorrect: true },
      { text: "$\\mathbb{R}$", isCorrect: false },
      { text: "$[-1, 1]$", isCorrect: false },
      { text: "$[1, +\\infty[$", isCorrect: false },
    ],
  },
  {
    question:
      "Si $f$ admet une réciproque $f^{-1}$ dérivable en $y_0 = f(x_0)$ avec $f'(x_0) \\neq 0$, alors $(f^{-1})'(y_0)$ est égale à :",
    topic: "Dérivation et Étude de Fonctions",
    difficulty: "Facile",
    explanation:
      "Théorème de la dérivation de la réciproque : $(f^{-1})'(y_0) = \\frac{1}{f'(f^{-1}(y_0))} = \\frac{1}{f'(x_0)}$.",
    options: [
      { text: "$\\frac{1}{f'(x_0)}$", isCorrect: true },
      { text: "$f'(x_0)$", isCorrect: false },
      { text: "$-f'(x_0)$", isCorrect: false },
      { text: "$\\frac{1}{f(x_0)}$", isCorrect: false },
    ],
  },
  {
    question:
      "La dérivée de la fonction $f(x) = x\\sqrt{x}$ sur $]0, +\\infty[$ est :",
    topic: "Dérivation et Étude de Fonctions",
    difficulty: "Moyen",
    explanation:
      "On peut utiliser $(uv)' = 1 \\cdot \\sqrt{x} + x \\cdot \\frac{1}{2\\sqrt{x}} = \\sqrt{x} + \\frac{\\sqrt{x}}{2} = \\frac{3}{2}\\sqrt{x}$, ou dériver sous forme de puissance : $(x^{3/2})' = \\frac{3}{2}x^{1/2} = \\frac{3}{2}\\sqrt{x}$.",
    options: [
      { text: "$\\frac{3}{2}\\sqrt{x}$", isCorrect: true },
      { text: "$\\frac{1}{2\\sqrt{x}}$", isCorrect: false },
      { text: "$\\sqrt{x} + \\frac{1}{2\\sqrt{x}}$", isCorrect: false },
      { text: "$\\frac{3}{2}x$", isCorrect: false },
    ],
  },
];

async function main() {
  console.log(
    "Démarrage du seed pour l'examen Dérivation et Étude de Fonctions (2BAC S)...",
  );

  const exam = await prisma.qcmExam.upsert({
    where: { slug: "derivation-etude-fonctions-2bac-s" },
    update: {
      title: "Dérivation et Étude de Fonctions",
      description:
        "Évaluation didactique complète sur le calcul des dérivées, les approximations affines, la convexité, les extrema, les branches infinies et la dérivation de la réciproque pour la 2ème Année Baccalauréat Scientifique.",
      timeLimitMinutes: 60,
      published: true,
    },
    create: {
      slug: "derivation-etude-fonctions-2bac-s",
      title: "Dérivation et Étude de Fonctions",
      description:
        "Évaluation didactique complète sur le calcul des dérivées, les approximations affines, la convexité, les extrema, les branches infinies et la dérivation de la réciproque pour la 2ème Année Baccalauréat Scientifique.",
      timeLimitMinutes: 60,
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
    `Succès : 40 questions insérées et liées à l'examen "${exam.title}".`,
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
