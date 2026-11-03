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
  {
    topic: "Dérivation - Fonctions usuelles",
    difficulty: "Facile",
    question: "Quelle est la dérivée de la fonction $f(x) = x$ ?",
    explanation:
      "Pour tout réel $x$, la dérivée de $f(x) = x$ est $f'(x) = 1$. C'est le cas particulier de $x^n$ avec $n=1$ : $1x^{1-1} = 1$.",
    options: [
      { text: "$f'(x) = 1$", isCorrect: true },
      { text: "$f'(x) = 0$", isCorrect: false },
      { text: "$f'(x) = x$", isCorrect: false },
      { text: "$f'(x) = x^2$", isCorrect: false },
    ],
  },
  {
    topic: "Dérivation - Fonctions usuelles",
    difficulty: "Facile",
    question:
      "Quelle est la dérivée d'une fonction constante $f(x) = k$ (où $k \\in \\mathbb{R}$) ?",
    explanation:
      "Une fonction constante ne varie pas ; son taux d'accroissement est nul pour tout $h \\neq 0$. Ainsi, $f'(x) = 0$.",
    options: [
      { text: "$f'(x) = 0$", isCorrect: true },
      { text: "$f'(x) = k$", isCorrect: false },
      { text: "$f'(x) = 1$", isCorrect: false },
      { text: "$f'(x) = kx$", isCorrect: false },
    ],
  },
  {
    topic: "Dérivation - Fonctions usuelles",
    difficulty: "Facile",
    question:
      "Quelle est la dérivée de la fonction $f(x) = x^n$ (avec $n \\in \\mathbb{N}^*$) ?",
    explanation:
      "D'après la formule fondamentale des puissances entières, $(x^n)' = n x^{n-1}$.",
    options: [
      { text: "$f'(x) = n x^{n-1}$", isCorrect: true },
      { text: "$f'(x) = x^{n-1}$", isCorrect: false },
      { text: "$f'(x) = n x^{n+1}$", isCorrect: false },
      { text: "$f'(x) = n x^n$", isCorrect: false },
    ],
  },
  {
    topic: "Dérivation - Fonctions usuelles",
    difficulty: "Facile",
    question:
      "Quelle est la dérivée de la fonction $f(x) = \\dfrac{1}{x}$ sur $\\mathbb{R}^*$ ?",
    explanation:
      "Pour tout $x \\neq 0$, $\\left(\\dfrac{1}{x}\\right)' = -\\dfrac{1}{x^2}$. C'est aussi la règle $(x^{-1})' = -1x^{-2}$.",
    options: [
      { text: "$f'(x) = -\\dfrac{1}{x^2}$", isCorrect: true },
      { text: "$f'(x) = \\dfrac{1}{x^2}$", isCorrect: false },
      { text: "$f'(x) = -\\dfrac{1}{x}$", isCorrect: false },
      { text: "$f'(x) = \\ln(x)$", isCorrect: false },
    ],
  },
  {
    topic: "Dérivation - Fonctions usuelles",
    difficulty: "Facile",
    question:
      "Quelle est la dérivée de la fonction $f(x) = \\sqrt{x}$ sur $]0, +\\infty[$ ?",
    explanation:
      "Pour tout $x > 0$, $(\\sqrt{x})' = \\dfrac{1}{2\\sqrt{x}}$. Rappel : la fonction racine n'est pas dérivable en $0$.",
    options: [
      { text: "$f'(x) = \\dfrac{1}{2\\sqrt{x}}$", isCorrect: true },
      { text: "$f'(x) = 2\\sqrt{x}$", isCorrect: false },
      { text: "$f'(x) = \\dfrac{1}{\\sqrt{x}}$", isCorrect: false },
      { text: "$f'(x) = -\\dfrac{1}{2\\sqrt{x}}$", isCorrect: false },
    ],
  },
  {
    topic: "Dérivation - Trigonométrie",
    difficulty: "Facile",
    question: "Quelle est la dérivée de la fonction $f(x) = \\sin(x)$ ?",
    explanation:
      "La dérivée de la fonction sinus est le cosinus : $(\\sin(x))' = \\cos(x)$.",
    options: [
      { text: "$f'(x) = \\cos(x)$", isCorrect: true },
      { text: "$f'(x) = -\\cos(x)$", isCorrect: false },
      { text: "$f'(x) = \\sin(x)$", isCorrect: false },
      { text: "$f'(x) = -\\sin(x)$", isCorrect: false },
    ],
  },
  {
    topic: "Dérivation - Trigonométrie",
    difficulty: "Facile",
    question: "Quelle est la dérivée de la fonction $f(x) = \\cos(x)$ ?",
    explanation:
      "La dérivée de la fonction cosinus est l'opposée du sinus : $(\\cos(x))' = -\\sin(x)$.",
    options: [
      { text: "$f'(x) = -\\sin(x)$", isCorrect: true },
      { text: "$f'(x) = \\cos(x)$", isCorrect: false },
      { text: "$f'(x) = \\sin(x)$", isCorrect: false },
      { text: "$f'(x) = -\\cos(x)$", isCorrect: false },
    ],
  },
  {
    topic: "Dérivation - Règles de calcul",
    difficulty: "Facile",
    question:
      "Si $u$ et $v$ sont deux fonctions dérivables sur un intervalle $I$, quelle est la dérivée du produit $u \\times v$ ?",
    explanation:
      "La formule de dérivation d'un produit est : $(u \\times v)' = u'v + uv'$.",
    options: [
      { text: "$(u \\times v)' = u'v + uv'$", isCorrect: true },
      { text: "$(u \\times v)' = u'v'$", isCorrect: false },
      { text: "$(u \\times v)' = u'v - uv'$", isCorrect: false },
      { text: "$(u \\times v)' = \\dfrac{u'v - uv'}{v^2}$", isCorrect: false },
    ],
  },
  {
    topic: "Dérivation - Règles de calcul",
    difficulty: "Facile",
    question:
      "Si $u$ et $v$ sont deux fonctions dérivables avec $v(x) \\neq 0$, quelle est la dérivée du quotient $\\dfrac{u}{v}$ ?",
    explanation:
      "La formule du quotient est : $\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2}$. Attention à l'ordre des termes au numérateur.",
    options: [
      {
        text: "$\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2}$",
        isCorrect: true,
      },
      {
        text: "$\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v + uv'}{v^2}$",
        isCorrect: false,
      },
      {
        text: "$\\left(\\dfrac{u}{v}\\right)' = \\dfrac{uv' - u'v}{v^2}$",
        isCorrect: false,
      },
      {
        text: "$\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'}{v'}$",
        isCorrect: false,
      },
    ],
  },
  {
    topic: "Dérivation - Polynômes",
    difficulty: "Facile",
    question:
      "Quelle est la dérivée de la fonction $f(x) = \\dfrac{1}{5}x^5$ ?",
    explanation:
      "$f'(x) = \\dfrac{1}{5} \\times (5x^{5-1}) = \\dfrac{5}{5}x^4 = x^4$.",
    options: [
      { text: "$f'(x) = x^4$", isCorrect: true },
      { text: "$f'(x) = x^5$", isCorrect: false },
      { text: "$f'(x) = \\dfrac{1}{5}x^4$", isCorrect: false },
      { text: "$f'(x) = \\dfrac{1}{4}x^4$", isCorrect: false },
    ],
  },
  {
    topic: "Dérivation - Polynômes",
    difficulty: "Facile",
    question: "Quelle est la dérivée de la fonction $f(x) = 3x^2 - 2x + 1$ ?",
    explanation:
      "On dérive terme à terme : $(3x^2)' = 6x$, $(-2x)' = -2$ et $(1)' = 0$. Donc $f'(x) = 6x - 2$.",
    options: [
      { text: "$f'(x) = 6x - 2$", isCorrect: true },
      { text: "$f'(x) = 3x - 2$", isCorrect: false },
      { text: "$f'(x) = 6x^2 - 2x$", isCorrect: false },
      { text: "$f'(x) = 6x - 2x$", isCorrect: false },
    ],
  },
  {
    topic: "Dérivation - Interprétation géométrique",
    difficulty: "Facile",
    question: "Le nombre dérivé $f'(x_0)$ représente graphiquement :",
    explanation:
      "Par définition géométrique, $f'(x_0)$ est la pente (le coefficient directeur) de la tangente à la courbe $(C_f)$ au point d'abscisse $x_0$.",
    options: [
      {
        text: "Le coefficient directeur de la tangente à la courbe au point d'abscisse $x_0$",
        isCorrect: true,
      },
      { text: "L'ordonnée du point d'abscisse $x_0$", isCorrect: false },
      { text: "L'équation de la courbe", isCorrect: false },
      { text: "La limite de la fonction en $x_0$", isCorrect: false },
    ],
  },
  {
    topic: "Dérivation et Continuité",
    difficulty: "Facile",
    question: "Si une fonction $f$ est dérivable en un point $x_0$, alors :",
    explanation:
      "Théorème fondamental du cours : la dérivabilité en un point implique nécessairement la continuité en ce point (l'inverse étant faux).",
    options: [
      { text: "$f$ est continue en $x_0$", isCorrect: true },
      { text: "$f$ n'est pas continue en $x_0$", isCorrect: false },
      { text: "$f$ est constante en $x_0$", isCorrect: false },
      { text: "$f$ s'annule en $x_0$", isCorrect: false },
    ],
  },
  {
    topic: "Dérivation - Nombre dérivé",
    difficulty: "Moyen",
    question: "La fonction $f(x) = |x|$ est-elle dérivable en $0$ ?",
    explanation:
      "$\\lim_{h \\to 0^+} \\frac{|h|}{h} = 1$ et $\\lim_{h \\to 0^-} \\frac{|h|}{h} = -1$. Les taux d'accroissement à droite et à gauche ont des limites différentes : $f$ admet un point anguleux en $0$, elle n'est donc pas dérivable en $0$.",
    options: [
      {
        text: "Non, car la limite du taux d'accroissement à droite est différente de celle à gauche",
        isCorrect: true,
      },
      { text: "Oui, $f'(0) = 1$", isCorrect: false },
      { text: "Oui, $f'(0) = 0$", isCorrect: false },
      { text: "Non, car elle n'est pas continue en 0", isCorrect: false },
    ],
  },
  {
    topic: "Dérivation - Fonctions composées",
    difficulty: "Moyen",
    question:
      "Quelle est la dérivée de la fonction $f(x) = \\sqrt{2x + 1}$ sur $]-\\frac{1}{2}, +\\infty[$ ?",
    explanation:
      "Formule $(\\sqrt{u})' = \\dfrac{u'}{2\\sqrt{u}}$. Avec $u(x) = 2x + 1$, on a $u'(x) = 2$. Donc $f'(x) = \\dfrac{2}{2\\sqrt{2x + 1}} = \\dfrac{1}{\\sqrt{2x + 1}}$.",
    options: [
      { text: "$f'(x) = \\dfrac{1}{\\sqrt{2x + 1}}$", isCorrect: true },
      { text: "$f'(x) = \\dfrac{1}{2\\sqrt{2x + 1}}$", isCorrect: false },
      { text: "$f'(x) = \\dfrac{2}{\\sqrt{2x + 1}}$", isCorrect: false },
      { text: "$f'(x) = \\dfrac{1}{2\\sqrt{x}}$", isCorrect: false },
    ],
  },
  {
    topic: "Dérivation - Fonctions composées",
    difficulty: "Moyen",
    question: "Quelle est la dérivée de la fonction $f(x) = (x^2 + 1)^3$ ?",
    explanation:
      "Formule $(u^n)' = n u' u^{n-1}$. Avec $u(x) = x^2 + 1$ et $u'(x) = 2x$, on obtient $f'(x) = 3 \\times 2x \\times (x^2 + 1)^2 = 6x(x^2 + 1)^2$.",
    options: [
      { text: "$f'(x) = 6x(x^2 + 1)^2$", isCorrect: true },
      { text: "$f'(x) = 3(x^2 + 1)^2$", isCorrect: false },
      { text: "$f'(x) = 3x(x^2 + 1)^2$", isCorrect: false },
      { text: "$f'(x) = 2x(x^2 + 1)^2$", isCorrect: false },
    ],
  },
  {
    topic: "Dérivation - Règles de calcul",
    difficulty: "Moyen",
    question:
      "Quelle est la dérivée de la fonction $f(x) = x \\cdot \\cos(x)$ ?",
    explanation:
      "Produit $(u \\cdot v)' = u'v + uv'$ avec $u(x) = x$ ($u'=1$) et $v(x) = \\cos(x)$ ($v'=-\\sin(x)$). D'où $f'(x) = 1 \\cdot \\cos(x) + x \\cdot (-\\sin(x)) = \\cos(x) - x\\sin(x)$.",
    options: [
      { text: "$f'(x) = \\cos(x) - x\\sin(x)$", isCorrect: true },
      { text: "$f'(x) = \\cos(x) + x\\sin(x)$", isCorrect: false },
      { text: "$f'(x) = -\\sin(x)$", isCorrect: false },
      { text: "$f'(x) = x\\cos(x) - \\sin(x)$", isCorrect: false },
    ],
  },
  {
    topic: "Dérivation - Fonctions rationnelles",
    difficulty: "Moyen",
    question:
      "Quelle est la dérivée de la fonction $f(x) = \\dfrac{x}{x+1}$ sur $\\mathbb{R} \\setminus \\{-1\\}$ ?",
    explanation:
      "$f'(x) = \\dfrac{(x)'(x+1) - x(x+1)'}{(x+1)^2} = \\dfrac{1(x+1) - x(1)}{(x+1)^2} = \\dfrac{1}{(x+1)^2}$.",
    options: [
      { text: "$f'(x) = \\dfrac{1}{(x+1)^2}$", isCorrect: true },
      { text: "$f'(x) = \\dfrac{-1}{(x+1)^2}$", isCorrect: false },
      { text: "$f'(x) = \\dfrac{2x+1}{(x+1)^2}$", isCorrect: false },
      { text: "$f'(x) = \\dfrac{-2x-1}{(x+1)^2}$", isCorrect: false },
    ],
  },
  {
    topic: "Dérivation - Tangente",
    difficulty: "Facile",
    question:
      "L'équation de la tangente à la courbe de $f$ au point d'abscisse $x_0$ est :",
    explanation:
      "La formule de l'équation réduite de la tangente est $y = f'(x_0)(x - x_0) + f(x_0)$.",
    options: [
      { text: "$y = f'(x_0)(x - x_0) + f(x_0)$", isCorrect: true },
      { text: "$y = f(x_0)(x - x_0) + f'(x_0)$", isCorrect: false },
      { text: "$y = f'(x_0)x + f(x_0)$", isCorrect: false },
      { text: "$y = f(x_0)x + f'(x_0)$", isCorrect: false },
    ],
  },
  {
    topic: "Dérivation - Trigonométrie",
    difficulty: "Moyen",
    question: "Quelle est la dérivée de la fonction $f(x) = \\sin(2x + 1)$ ?",
    explanation:
      "Formule $(\\sin(ax + b))' = a\\cos(ax + b)$. Avec $a=2$, on a $f'(x) = 2\\cos(2x + 1)$.",
    options: [
      { text: "$f'(x) = 2\\cos(2x + 1)$", isCorrect: true },
      { text: "$f'(x) = \\cos(2x + 1)$", isCorrect: false },
      { text: "$f'(x) = -2\\cos(2x + 1)$", isCorrect: false },
      { text: "$f'(x) = 2\\sin(2x + 1)$", isCorrect: false },
    ],
  },
  {
    topic: "Dérivation - Trigonométrie",
    difficulty: "Moyen",
    question: "Quelle est la dérivée de la fonction $f(x) = \\cos(3x)$ ?",
    explanation:
      "Formule $(\\cos(ax + b))' = -a\\sin(ax + b)$. Avec $a=3$ et $b=0$, on obtient $f'(x) = -3\\sin(3x)$.",
    options: [
      { text: "$f'(x) = -3\\sin(3x)$", isCorrect: true },
      { text: "$f'(x) = 3\\sin(3x)$", isCorrect: false },
      { text: "$f'(x) = -\\sin(3x)$", isCorrect: false },
      { text: "$f'(x) = -3\\cos(3x)$", isCorrect: false },
    ],
  },
  {
    topic: "Dérivation - Fonctions usuelles",
    difficulty: "Moyen",
    question: "Soit $f(x) = \\dfrac{1}{x^2}$. Quelle est sa dérivée ?",
    explanation:
      "$f(x) = x^{-2}$, donc $f'(x) = -2x^{-3} = -\\dfrac{2}{x^3}$. On peut aussi appliquer $\\left(\\dfrac{1}{u}\\right)' = -\\dfrac{u'}{u^2} = -\\dfrac{2x}{x^4} = -\\dfrac{2}{x^3}$.",
    options: [
      { text: "$f'(x) = -\\dfrac{2}{x^3}$", isCorrect: true },
      { text: "$f'(x) = \\dfrac{2}{x^3}$", isCorrect: false },
      { text: "$f'(x) = -\\dfrac{1}{2x}$", isCorrect: false },
      { text: "$f'(x) = -\\dfrac{2}{x^2}$", isCorrect: false },
    ],
  },
  {
    topic: "Dérivation - Fonctions rationnelles",
    difficulty: "Moyen",
    question: "Quelle est la dérivée de $f(x) = \\dfrac{2x}{x^2 + 1}$ ?",
    explanation:
      "$f'(x) = \\dfrac{(2)(x^2 + 1) - (2x)(2x)}{(x^2 + 1)^2} = \\dfrac{2x^2 + 2 - 4x^2}{(x^2 + 1)^2} = \\dfrac{2 - 2x^2}{(x^2 + 1)^2}$.",
    options: [
      { text: "$f'(x) = \\dfrac{2 - 2x^2}{(x^2 + 1)^2}$", isCorrect: true },
      { text: "$f'(x) = \\dfrac{2x^2 - 2}{(x^2 + 1)^2}$", isCorrect: false },
      { text: "$f'(x) = \\dfrac{2}{(x^2 + 1)^2}$", isCorrect: false },
      { text: "$f'(x) = \\dfrac{4x^2}{(x^2 + 1)^2}$", isCorrect: false },
    ],
  },
  {
    topic: "Dérivation - Règles de calcul",
    difficulty: "Facile",
    question:
      "Si $f(x) = \\dfrac{u(x)}{v(x)}$, la condition pour que la fonction soit dérivable sur un intervalle $I$ est que :",
    explanation:
      "Un quotient $\\frac{u}{v}$ est dérivable sur $I$ si $u$ et $v$ sont dérivables sur $I$ et si le dénominateur ne s'annule pas sur $I$ ($v(x) \\neq 0$).",
    options: [
      {
        text: "$u$ et $v$ soient dérivables sur $I$ et $v(x) \\neq 0$ sur $I$",
        isCorrect: true,
      },
      { text: "$u$ et $v$ soient dérivables sur $I$", isCorrect: false },
      { text: "$v$ soit constante sur $I$", isCorrect: false },
      { text: "$u$ soit constante sur $I$", isCorrect: false },
    ],
  },
  {
    topic: "Dérivation - Fonctions composées",
    difficulty: "Moyen",
    question: "Quelle est la dérivée de $f(x) = \\sqrt{x^2 + 1}$ ?",
    explanation:
      "Formule $(\\sqrt{u})' = \\dfrac{u'}{2\\sqrt{u}}$. Avec $u(x) = x^2 + 1$ ($u'=2x$), on a $f'(x) = \\dfrac{2x}{2\\sqrt{x^2 + 1}} = \\dfrac{x}{\\sqrt{x^2 + 1}}$.",
    options: [
      { text: "$f'(x) = \\dfrac{x}{\\sqrt{x^2 + 1}}$", isCorrect: true },
      { text: "$f'(x) = \\dfrac{1}{2\\sqrt{x^2 + 1}}$", isCorrect: false },
      { text: "$f'(x) = \\dfrac{2x}{\\sqrt{x^2 + 1}}$", isCorrect: false },
      { text: "$f'(x) = \\dfrac{x}{2\\sqrt{x^2 + 1}}$", isCorrect: false },
    ],
  },
  {
    topic: "Dérivation - Nombre dérivé",
    difficulty: "Facile",
    question:
      "Le taux d'accroissement d'une fonction $f$ entre $x_0$ et $x_0 + h$ est :",
    explanation:
      "Par définition, le taux d'accroissement (ou taux de variation) est $\\tau(h) = \\dfrac{f(x_0 + h) - f(x_0)}{h}$ pour $h \\neq 0$.",
    options: [
      { text: "$\\dfrac{f(x_0 + h) - f(x_0)}{h}$", isCorrect: true },
      { text: "$\\dfrac{f(x_0 + h) + f(x_0)}{h}$", isCorrect: false },
      { text: "$\\dfrac{f(h) - f(x_0)}{h}$", isCorrect: false },
      { text: "$f(x_0 + h) - f(x_0)$", isCorrect: false },
    ],
  },
  {
    topic: "Dérivation - Règles de calcul",
    difficulty: "Facile",
    question: "Quelle est la dérivée de $f(x) = (2x - 1)(x^2 + 3)$ ?",
    explanation:
      "En appliquant $(uv)' = u'v + uv'$ : $u(x)=2x-1 \\Rightarrow u'=2$ et $v(x)=x^2+3 \\Rightarrow v'=2x$. Donc $f'(x) = 2(x^2 + 3) + 2x(2x - 1)$.",
    options: [
      { text: "$2(x^2 + 3) + 2x(2x - 1)$", isCorrect: true },
      { text: "$2(x^2 + 3) - 2x(2x - 1)$", isCorrect: false },
      { text: "$2(2x - 1)(x^2 + 3)$", isCorrect: false },
      { text: "$2 \\times 2x$", isCorrect: false },
    ],
  },
  {
    topic: "Dérivation - Fonctions rationnelles",
    difficulty: "Moyen",
    question:
      "Soit $f(x) = \\dfrac{x+1}{x-1}$ sur $]1, +\\infty[$. Quelle est la valeur de $f'(2)$ ?",
    explanation:
      "La dérivée est $f'(x) = \\dfrac{(1)(x-1) - (x+1)(1)}{(x-1)^2} = \\dfrac{-2}{(x-1)^2}$. En $x = 2$ : $f'(2) = \\dfrac{-2}{(2-1)^2} = -2$.",
    options: [
      { text: "$-2$", isCorrect: true },
      { text: "$2$", isCorrect: false },
      { text: "$-\\dfrac{1}{2}$", isCorrect: false },
      { text: "$\\dfrac{1}{2}$", isCorrect: false },
    ],
  },
  {
    topic: "Dérivation - Fonctions usuelles",
    difficulty: "Difficile",
    question:
      "Quelle est la dérivée de $f(x) = \\dfrac{1}{\\sqrt{x}}$ sur $]0, +\\infty[$ ?",
    explanation:
      "$f(x) = x^{-1/2} \\Rightarrow f'(x) = -\\dfrac{1}{2}x^{-3/2} = -\\dfrac{1}{2x\\sqrt{x}}$. Ou avec $\\left(\\frac{1}{u}\\right)' = -\\frac{u'}{u^2} = -\\frac{1/(2\\sqrt{x})}{x} = -\\frac{1}{2x\\sqrt{x}}$.",
    options: [
      { text: "$-\\dfrac{1}{2x\\sqrt{x}}$", isCorrect: true },
      { text: "$\\dfrac{1}{2x\\sqrt{x}}$", isCorrect: false },
      { text: "$-\\dfrac{1}{2\\sqrt{x}}$", isCorrect: false },
      { text: "$-\\dfrac{1}{\\sqrt{x}}$", isCorrect: false },
    ],
  },
  {
    topic: "Dérivation - Définition",
    difficulty: "Facile",
    question: "Une fonction $f$ est dérivable en $x_0$ si et seulement si :",
    explanation:
      "$f$ est dérivable en $x_0$ lorsque $\\lim_{h \\to 0} \\dfrac{f(x_0+h)-f(x_0)}{h}$ existe et appartient à $\\mathbb{R}$ (limite finie $l = f'(x_0)$).",
    options: [
      {
        text: "La limite du taux d'accroissement en $x_0$ est finie",
        isCorrect: true,
      },
      { text: "$f$ est continue en $x_0$", isCorrect: false },
      {
        text: "La limite du taux d'accroissement en $x_0$ est infinie",
        isCorrect: false,
      },
      { text: "$f(x_0) = 0$", isCorrect: false },
    ],
  },
  {
    topic: "Dérivation - Fonctions composées",
    difficulty: "Moyen",
    question: "Quelle est la dérivée de $f(x) = \\cos^2(x)$ ?",
    explanation:
      "Formule $(u^2)' = 2 u' u$. Avec $u(x) = \\cos(x)$ et $u'(x) = -\\sin(x)$, on obtient $f'(x) = 2(-\\sin(x))\\cos(x) = -2\\sin(x)\\cos(x)$ (qui vaut aussi $-\\sin(2x)$).",
    options: [
      { text: "$f'(x) = -2\\sin(x)\\cos(x)$", isCorrect: true },
      { text: "$f'(x) = 2\\cos(x)$", isCorrect: false },
      { text: "$f'(x) = 2\\sin(x)\\cos(x)$", isCorrect: false },
      { text: "$f'(x) = -2\\cos(x)$", isCorrect: false },
    ],
  },
  {
    topic: "Dérivation - Trigonométrie",
    difficulty: "Moyen",
    question:
      "Quelle est la dérivée de $f(x) = \\dfrac{\\sin(x)}{x}$ sur $\\mathbb{R}^*$ ?",
    explanation:
      "En appliquant la dérivée d'un quotient $\\left(\\frac{u}{v}\\right)'$ avec $u=\\sin(x)$ et $v=x$ : $f'(x) = \\dfrac{(\\cos(x))(x) - (\\sin(x))(1)}{x^2} = \\dfrac{x\\cos(x) - \\sin(x)}{x^2}$.",
    options: [
      { text: "$f'(x) = \\dfrac{x\\cos(x) - \\sin(x)}{x^2}$", isCorrect: true },
      { text: "$f'(x) = \\dfrac{\\cos(x)}{x^2}$", isCorrect: false },
      {
        text: "$f'(x) = \\dfrac{x\\sin(x) - \\cos(x)}{x^2}$",
        isCorrect: false,
      },
      {
        text: "$f'(x) = \\dfrac{x\\cos(x) + \\sin(x)}{x^2}$",
        isCorrect: false,
      },
    ],
  },
  {
    topic: "Dérivation - Règles de calcul",
    difficulty: "Facile",
    question:
      "Si $f(x) = \\dfrac{1}{u(x)}$ avec $u(x) \\neq 0$, alors sa dérivée est :",
    explanation:
      "C'est la formule usuelle de l'inverse : $\\left(\\dfrac{1}{u}\\right)' = -\\dfrac{u'}{u^2}$.",
    options: [
      { text: "$f'(x) = -\\dfrac{u'(x)}{u^2(x)}$", isCorrect: true },
      { text: "$f'(x) = \\dfrac{1}{u'(x)}$", isCorrect: false },
      { text: "$f'(x) = \\dfrac{u'(x)}{u^2(x)}$", isCorrect: false },
      { text: "$f'(x) = -\\dfrac{1}{u^2(x)}$", isCorrect: false },
    ],
  },
  {
    topic: "Dérivation - Tangente",
    difficulty: "Moyen",
    question:
      "Soit $f(x) = x^3$. L'équation de la tangente à la courbe de $f$ au point $x_0 = 1$ est :",
    explanation:
      "On a $f(1) = 1^3 = 1$ et $f'(x) = 3x^2 \\Rightarrow f'(1) = 3$. L'équation est $y = f'(1)(x - 1) + f(1) = 3(x - 1) + 1 = 3x - 3 + 1 = 3x - 2$.",
    options: [
      { text: "$y = 3x - 2$", isCorrect: true },
      { text: "$y = 3x + 2$", isCorrect: false },
      { text: "$y = x - 1$", isCorrect: false },
      { text: "$y = 3x + 1$", isCorrect: false },
    ],
  },
  {
    topic: "Dérivation et Continuité",
    difficulty: "Facile",
    question: "Parmi les affirmations suivantes, laquelle est vraie ?",
    explanation:
      "Toute fonction dérivable en un point est obligatoirement continue en ce point. En revanche, la réciproque est fausse (contre-exemple canonique : $|x|$ ou $\\sqrt{x}$ en $0$).",
    options: [
      {
        text: "Toute fonction dérivable en $x_0$ est continue en $x_0$",
        isCorrect: true,
      },
      {
        text: "Toute fonction continue en $x_0$ est dérivable en $x_0$",
        isCorrect: false,
      },
      {
        text: "La réciproque de la proposition correcte est vraie",
        isCorrect: false,
      },
      {
        text: "Une fonction peut être dérivable en $x_0$ sans être continue en $x_0$",
        isCorrect: false,
      },
    ],
  },
];

async function main() {
  console.log(
    "Démarrage de la création de l'examen de Dérivation (Partie 1)...",
  );

  // 1. Créer ou mettre à jour l'Examen
  const exam = await prisma.qcmExam.upsert({
    where: { slug: "derivation-partie-1-1bac" },
    update: {
      title: "La Dérivation (Partie 1) - 1Bac Sciences",
      description:
        "Évaluation complète sur le nombre dérivé, l'interprétation géométrique (tangente), les formules usuelles, les opérations sur dérivées et les fonctions composées.",
      timeLimitMinutes: 45,
      published: true,
    },
    create: {
      slug: "derivation-partie-1-1bac",
      title: "La Dérivation (Partie 1) - 1Bac Sciences",
      description:
        "Évaluation complète sur le nombre dérivé, l'interprétation géométrique (tangente), les formules usuelles, les opérations sur dérivées et les fonctions composées.",
      timeLimitMinutes: 45,
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
