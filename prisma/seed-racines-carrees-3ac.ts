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
  // PARTIE 1 : DÉFINITION, EXISTENCE ET RELATION RACINE / CARRÉ (Q1 à Q8)
  // =========================================================================
  {
    topic: "Racines carrées - Définition",
    difficulty: "Facile",
    question:
      "Pour un réel positif $a$, la racine carrée $\\sqrt{a}$ désigne :",
    explanation:
      "Par définition, pour tout nombre réel $a \\ge 0$, $\\sqrt{a}$ est l'unique nombre réel **positif** dont le carré est égal à $a$.",
    options: [
      {
        text: "Le nombre positif dont le carré est égal à $a$",
        isCorrect: true,
      },
      {
        text: "Tout nombre relatif dont le carré est égal à $a$",
        isCorrect: false,
      },
      { text: "La moitié du nombre $a$", isCorrect: false },
      { text: "Le carré du nombre $a$", isCorrect: false },
    ],
  },
  {
    topic: "Racines carrées - Définition",
    difficulty: "Facile",
    question:
      "Parmi les écritures suivantes, laquelle n'a **aucun sens** dans $\\mathbb{R}$ ?",
    explanation:
      "Le radicande (le nombre sous le radical) doit obligatoirement être positif ou nul. Or $-16 < 0$, donc $\\sqrt{-16}$ n'existe pas.",
    options: [
      { text: "$\\sqrt{-16}$", isCorrect: true },
      { text: "$-\\sqrt{16}$", isCorrect: false },
      { text: "$\\sqrt{(-4)^2}$", isCorrect: false },
      { text: "$-\\sqrt{(-4)^2}$", isCorrect: false },
    ],
  },
  {
    topic: "Racines carrées - Définition",
    difficulty: "Facile",
    question: "Quelle est la valeur exacte de $\\sqrt{(-7)^2}$ ?",
    explanation:
      "Attention au piège ! $\\sqrt{(-7)^2} = \\sqrt{49} = 7$. Plus généralement, $\\sqrt{a^2} = |a|$ est toujours positif.",
    options: [
      { text: "$7$", isCorrect: true },
      { text: "$-7$", isCorrect: false },
      { text: "$49$", isCorrect: false },
      { text: "N'existe pas car $-7 < 0$", isCorrect: false },
    ],
  },
  {
    topic: "Racines carrées - Définition",
    difficulty: "Facile",
    question: "Calculer l'expression $A = (\\sqrt{13})^2 - \\sqrt{(-5)^2}$ :",
    explanation:
      "On a $(\\sqrt{13})^2 = 13$ et $\\sqrt{(-5)^2} = \\sqrt{25} = 5$. Ainsi, $A = 13 - 5 = 8$.",
    options: [
      { text: "$8$", isCorrect: true },
      { text: "$18$", isCorrect: false },
      { text: "$-12$", isCorrect: false },
      { text: "$\\sqrt{8}$", isCorrect: false },
    ],
  },
  {
    topic: "Racines carrées - Définition",
    difficulty: "Moyen",
    question: "Quelle est la valeur de $\\sqrt{0,09}$ ?",
    explanation:
      "$0,09 = \\dfrac{9}{100} = \\left(\\dfrac{3}{10}\\right)^2 = (0,3)^2$. Donc $\\sqrt{0,09} = 0,3$. Ne pas confondre avec $0,03$ dont le carré vaut $0,0009$.",
    options: [
      { text: "$0,3$", isCorrect: true },
      { text: "$0,03$", isCorrect: false },
      { text: "$0,9$", isCorrect: false },
      { text: "$0,003$", isCorrect: false },
    ],
  },
  {
    topic: "Racines carrées - Définition",
    difficulty: "Difficile",
    question:
      "Si $x$ est un nombre réel strictement **négatif** ($x < 0$), alors $\\sqrt{x^2}$ est égal à :",
    explanation:
      "Une racine carrée est toujours positive. Comme $x < 0$, son opposé $-x$ est positif. On a donc $\\sqrt{x^2} = |x| = -x$.",
    options: [
      { text: "$-x$", isCorrect: true },
      { text: "$x$", isCorrect: false },
      { text: "$x^2$", isCorrect: false },
      { text: "N'existe pas", isCorrect: false },
    ],
  },
  {
    topic: "Racines carrées - Définition",
    difficulty: "Difficile",
    question:
      "Sachant que $\\sqrt{3} < 2$, quelle est la valeur exacte de $\\sqrt{(\\sqrt{3} - 2)^2}$ ?",
    explanation:
      "Puisque $\\sqrt{3} \\approx 1,73 < 2$, la différence $\\sqrt{3} - 2$ est négative. Or $\\sqrt{A^2}$ donne la valeur positive correspondante, soit l'opposé : $-(\\sqrt{3} - 2) = 2 - \\sqrt{3}$.",
    options: [
      { text: "$2 - \\sqrt{3}$", isCorrect: true },
      { text: "$\\sqrt{3} - 2$", isCorrect: false },
      { text: "$\\sqrt{3} + 2$", isCorrect: false },
      { text: "$-1$", isCorrect: false },
    ],
  },
  {
    topic: "Racines carrées - Définition",
    difficulty: "Moyen",
    question: "Que vaut l'expression $\\sqrt{\\sqrt{81}}$ ?",
    explanation:
      "On calcule de l'intérieur vers l'extérieur : $\\sqrt{81} = 9$, puis $\\sqrt{9} = 3$.",
    options: [
      { text: "$3$", isCorrect: true },
      { text: "$9$", isCorrect: false },
      { text: "$\\sqrt{3}$", isCorrect: false },
      { text: "$20,25$", isCorrect: false },
    ],
  },

  // =========================================================================
  // PARTIE 2 : PIÈGES D'ADDITION ET DE SOUSTRACTION (FAUTES D'ÉLÈVES) (Q9 à Q15)
  // =========================================================================
  {
    topic: "Racines carrées - Sommes et Pièges",
    difficulty: "Facile",
    question: "Quelle est la valeur exacte de $\\sqrt{9 + 16}$ ?",
    explanation:
      "Piège classique ! La racine d'une somme n'est **jamais** égale à la somme des racines. On calcule d'abord la somme sous le radical : $\\sqrt{9 + 16} = \\sqrt{25} = 5$.",
    options: [
      { text: "$5$", isCorrect: true },
      { text: "$7$", isCorrect: false },
      { text: "$25$", isCorrect: false },
      { text: "$12$", isCorrect: false },
    ],
  },
  {
    topic: "Racines carrées - Sommes et Pièges",
    difficulty: "Facile",
    question: "Calculer $\\sqrt{100 - 36}$ :",
    explanation:
      "On effectue d'abord la soustraction sous la racine : $\\sqrt{100 - 36} = \\sqrt{64} = 8$. (Attention : $\\sqrt{100} - \\sqrt{36} = 10 - 6 = 4 \\neq 8$).",
    options: [
      { text: "$8$", isCorrect: true },
      { text: "$4$", isCorrect: false },
      { text: "$64$", isCorrect: false },
      { text: "$14$", isCorrect: false },
    ],
  },
  {
    topic: "Racines carrées - Sommes et Pièges",
    difficulty: "Moyen",
    question:
      "Parmi ces égalités, laquelle est **VRAIE** pour tous réels strictement positifs $a$ et $b$ ?",
    explanation:
      "La racine carrée est compatible avec la multiplication ($\\sqrt{a \\times b} = \\sqrt{a} \\times \\sqrt{b}$), mais jamais avec l'addition ni la soustraction.",
    options: [
      {
        text: "$\\sqrt{a \\times b} = \\sqrt{a} \\times \\sqrt{b}$",
        isCorrect: true,
      },
      { text: "$\\sqrt{a + b} = \\sqrt{a} + \\sqrt{b}$", isCorrect: false },
      { text: "$\\sqrt{a^2 + b^2} = a + b$", isCorrect: false },
      { text: "$\\sqrt{a} + \\sqrt{a} = \\sqrt{2a}$", isCorrect: false },
    ],
  },
  {
    topic: "Racines carrées - Sommes et Pièges",
    difficulty: "Facile",
    question: "Réduire la somme $S = \\sqrt{5} + \\sqrt{5}$ :",
    explanation:
      "Comme en calcul littéral ($x + x = 2x$), additionner deux fois $\\sqrt{5}$ donne $2\\sqrt{5}$, et non $\\sqrt{10}$.",
    options: [
      { text: "$2\\sqrt{5}$", isCorrect: true },
      { text: "$\\sqrt{10}$", isCorrect: false },
      { text: "$5$", isCorrect: false },
      { text: "$\\sqrt{25}$", isCorrect: false },
    ],
  },
  {
    topic: "Racines carrées - Sommes et Pièges",
    difficulty: "Moyen",
    question: "L'expression $3\\sqrt{2} + 5\\sqrt{3}$ est égale à :",
    explanation:
      "Les radicaux $\\sqrt{2}$ et $\\sqrt{3}$ ne sont pas de la même famille (comme $3x + 5y$). On ne peut pas les regrouper en un seul terme.",
    options: [
      { text: "$3\\sqrt{2} + 5\\sqrt{3}$ (irréductible)", isCorrect: true },
      { text: "$8\\sqrt{5}$", isCorrect: false },
      { text: "$8\\sqrt{6}$", isCorrect: false },
      { text: "$15\\sqrt{5}$", isCorrect: false },
    ],
  },
  {
    topic: "Racines carrées - Sommes et Pièges",
    difficulty: "Facile",
    question: "Calculer $\\sqrt{3^2 + 4^2}$ :",
    explanation:
      "Priorité au calcul sous le radical : $\\sqrt{9 + 16} = \\sqrt{25} = 5$. L'erreur fréquente est d'écrire $3 + 4 = 7$.",
    options: [
      { text: "$5$", isCorrect: true },
      { text: "$7$", isCorrect: false },
      { text: "$12$", isCorrect: false },
      { text: "$25$", isCorrect: false },
    ],
  },
  {
    topic: "Racines carrées - Sommes et Pièges",
    difficulty: "Facile",
    question: "Réduire l'expression $E = 7\\sqrt{3} - \\sqrt{3}$ :",
    explanation:
      "Attention : $-\\sqrt{3}$ signifie $-1\\sqrt{3}$. Donc $7\\sqrt{3} - 1\\sqrt{3} = (7 - 1)\\sqrt{3} = 6\\sqrt{3}$ (et non $7$).",
    options: [
      { text: "$6\\sqrt{3}$", isCorrect: true },
      { text: "$7$", isCorrect: false },
      { text: "$7\\sqrt{0}$", isCorrect: false },
      { text: "$6$", isCorrect: false },
    ],
  },

  // =========================================================================
  // PARTIE 3 : MULTIPLICATION ET DIVISION DE RACINES CARRÉES (Q16 à Q22)
  // =========================================================================
  {
    topic: "Racines carrées - Produits et Quotients",
    difficulty: "Facile",
    question: "Calculer le produit $P = \\sqrt{2} \\times \\sqrt{18}$ :",
    explanation:
      "D'après la règle du produit : $\\sqrt{2} \\times \\sqrt{18} = \\sqrt{2 \\times 18} = \\sqrt{36} = 6$.",
    options: [
      { text: "$6$", isCorrect: true },
      { text: "$\\sqrt{20}$", isCorrect: false },
      { text: "$36$", isCorrect: false },
      { text: "$9$", isCorrect: false },
    ],
  },
  {
    topic: "Racines carrées - Produits et Quotients",
    difficulty: "Moyen",
    question: "Calculer le carré $(3\\sqrt{5})^2$ :",
    explanation:
      "Le carré porte sur le $3$ ET sur $\\sqrt{5}$ : $(3\\sqrt{5})^2 = 3^2 \\times (\\sqrt{5})^2 = 9 \\times 5 = 45$.",
    options: [
      { text: "$45$", isCorrect: true },
      { text: "$15$", isCorrect: false },
      { text: "$9\\sqrt{5}$", isCorrect: false },
      { text: "$30$", isCorrect: false },
    ],
  },
  {
    topic: "Racines carrées - Produits et Quotients",
    difficulty: "Facile",
    question: "Calculer le quotient $Q = \\dfrac{\\sqrt{75}}{\\sqrt{3}}$ :",
    explanation:
      "Grâce à la propriété du quotient : $\\dfrac{\\sqrt{75}}{\\sqrt{3}} = \\sqrt{\\dfrac{75}{3}} = \\sqrt{25} = 5$.",
    options: [
      { text: "$5$", isCorrect: true },
      { text: "$25$", isCorrect: false },
      { text: "$\\sqrt{72}$", isCorrect: false },
      { text: "$15$", isCorrect: false },
    ],
  },
  {
    topic: "Racines carrées - Produits et Quotients",
    difficulty: "Facile",
    question: "Quelle est la valeur de $\\sqrt{\\dfrac{49}{64}}$ ?",
    explanation:
      "$\\sqrt{\\dfrac{49}{64}} = \\dfrac{\\sqrt{49}}{\\sqrt{64}} = \\dfrac{7}{8}$.",
    options: [
      { text: "$\\dfrac{7}{8}$", isCorrect: true },
      { text: "$\\dfrac{7}{64}$", isCorrect: false },
      { text: "$\\dfrac{49}{8}$", isCorrect: false },
      { text: "$\\dfrac{14}{16}$", isCorrect: false },
    ],
  },
  {
    topic: "Racines carrées - Produits et Quotients",
    difficulty: "Moyen",
    question: "Calculer $A = 2\\sqrt{3} \\times 5\\sqrt{3}$ :",
    explanation:
      "On multiplie les coefficients entre eux et les racines entre elles : $2 \\times 5 \\times (\\sqrt{3} \\times \\sqrt{3}) = 10 \\times 3 = 30$.",
    options: [
      { text: "$30$", isCorrect: true },
      { text: "$10\\sqrt{3}$", isCorrect: false },
      { text: "$10\\sqrt{6}$", isCorrect: false },
      { text: "$21$", isCorrect: false },
    ],
  },
  {
    topic: "Racines carrées - Produits et Quotients",
    difficulty: "Moyen",
    question:
      "Calculer le produit $B = \\sqrt{3} \\times \\sqrt{12} \\times \\sqrt{4}$ :",
    explanation:
      "On regroupe sous un même radical : $\\sqrt{3 \\times 12} \\times \\sqrt{4} = \\sqrt{36} \\times 2 = 6 \\times 2 = 12$.",
    options: [
      { text: "$12$", isCorrect: true },
      { text: "$24$", isCorrect: false },
      { text: "$\\sqrt{19}$", isCorrect: false },
      { text: "$6\\sqrt{2}$", isCorrect: false },
    ],
  },
  {
    topic: "Racines carrées - Produits et Quotients",
    difficulty: "Moyen",
    question:
      "Développer et réduire $(\\sqrt{7} - \\sqrt{2})(\\sqrt{7} + \\sqrt{2})$ :",
    explanation:
      "On reconnaît l'identité remarquable $(a - b)(a + b) = a^2 - b^2 = (\\sqrt{7})^2 - (\\sqrt{2})^2 = 7 - 2 = 5$.",
    options: [
      { text: "$5$", isCorrect: true },
      { text: "$\\sqrt{5}$", isCorrect: false },
      { text: "$9$", isCorrect: false },
      { text: "$5 - 2\\sqrt{14}$", isCorrect: false },
    ],
  },

  // =========================================================================
  // PARTIE 4 : SIMPLIFICATION D'EXPRESSIONS DE RACINES (Q23 à Q30)
  // =========================================================================
  {
    topic: "Racines carrées - Simplification",
    difficulty: "Facile",
    question:
      "Écrire $\\sqrt{8}$ sous la forme $a\\sqrt{b}$ où $b$ est le plus petit entier possible :",
    explanation:
      "$\\sqrt{8} = \\sqrt{4 \\times 2} = \\sqrt{4} \\times \\sqrt{2} = 2\\sqrt{2}$.",
    options: [
      { text: "$2\\sqrt{2}$", isCorrect: true },
      { text: "$4\\sqrt{2}$", isCorrect: false },
      { text: "$2\\sqrt{4}$", isCorrect: false },
      { text: "$4$", isCorrect: false },
    ],
  },
  {
    topic: "Racines carrées - Simplification",
    difficulty: "Facile",
    question: "Simplifier $\\sqrt{75}$ sous la forme $a\\sqrt{b}$ :",
    explanation:
      "On extrait le plus grand carré parfait diviseur de $75$, qui est $25$ : $\\sqrt{75} = \\sqrt{25 \\times 3} = \\sqrt{25}\\times\\sqrt{3} = 5\\sqrt{3}$.",
    options: [
      { text: "$5\\sqrt{3}$", isCorrect: true },
      { text: "$25\\sqrt{3}$", isCorrect: false },
      { text: "$3\\sqrt{5}$", isCorrect: false },
      { text: "$15\\sqrt{5}$", isCorrect: false },
    ],
  },
  {
    topic: "Racines carrées - Simplification",
    difficulty: "Moyen",
    question: "Simplifier l'expression $A = \\sqrt{18} + \\sqrt{50}$ :",
    explanation:
      "$\\sqrt{18} = \\sqrt{9 \\times 2} = 3\\sqrt{2}$ et $\\sqrt{50} = \\sqrt{25 \\times 2} = 5\\sqrt{2}$. Donc $A = 3\\sqrt{2} + 5\\sqrt{2} = 8\\sqrt{2}$.",
    options: [
      { text: "$8\\sqrt{2}$", isCorrect: true },
      { text: "$\\sqrt{68}$", isCorrect: false },
      { text: "$34\\sqrt{2}$", isCorrect: false },
      { text: "$15\\sqrt{2}$", isCorrect: false },
    ],
  },
  {
    topic: "Racines carrées - Simplification",
    difficulty: "Moyen",
    question:
      "Réduire l'expression $B = \\sqrt{27} - 2\\sqrt{12} + \\sqrt{3}$ :",
    explanation:
      "$\\sqrt{27} = 3\\sqrt{3}$ et $2\\sqrt{12} = 2 \\times 2\\sqrt{3} = 4\\sqrt{3}$. Ainsi $B = 3\\sqrt{3} - 4\\sqrt{3} + 1\\sqrt{3} = (3 - 4 + 1)\\sqrt{3} = 0$.",
    options: [
      { text: "$0$", isCorrect: true },
      { text: "$\\sqrt{3}$", isCorrect: false },
      { text: "$-\\sqrt{3}$", isCorrect: false },
      { text: "$2\\sqrt{3}$", isCorrect: false },
    ],
  },
  {
    topic: "Racines carrées - Simplification",
    difficulty: "Moyen",
    question: "Simplifier $C = 3\\sqrt{20} - \\sqrt{45} + \\sqrt{80}$ :",
    explanation:
      "$3\\sqrt{20} = 3 \\times 2\\sqrt{5} = 6\\sqrt{5}$ ; $\\sqrt{45} = 3\\sqrt{5}$ ; $\\sqrt{80} = \\sqrt{16 \\times 5} = 4\\sqrt{5}$. Donc $C = (6 - 3 + 4)\\sqrt{5} = 7\\sqrt{5}$.",
    options: [
      { text: "$7\\sqrt{5}$", isCorrect: true },
      { text: "$5\\sqrt{5}$", isCorrect: false },
      { text: "$6\\sqrt{5}$", isCorrect: false },
      { text: "$7\\sqrt{15}$", isCorrect: false },
    ],
  },
  {
    topic: "Racines carrées - Simplification",
    difficulty: "Moyen",
    question: "Développer et réduire $(\\sqrt{5} + \\sqrt{3})^2$ :",
    explanation:
      "Identité remarquable $(a+b)^2 = a^2 + 2ab + b^2$ : $(\\sqrt{5})^2 + 2\\times\\sqrt{5}\\times\\sqrt{3} + (\\sqrt{3})^2 = 5 + 2\\sqrt{15} + 3 = 8 + 2\\sqrt{15}$.",
    options: [
      { text: "$8 + 2\\sqrt{15}$", isCorrect: true },
      { text: "$8$", isCorrect: false },
      { text: "$8 + \\sqrt{15}$", isCorrect: false },
      { text: "$22$", isCorrect: false },
    ],
  },
  {
    topic: "Racines carrées - Simplification",
    difficulty: "Moyen",
    question: "Développer et simplifier $(\\sqrt{3} - 1)^2$ :",
    explanation:
      "Identité remarquable $(a-b)^2 = a^2 - 2ab + b^2$ : $(\\sqrt{3})^2 - 2\\sqrt{3} + 1^2 = 3 - 2\\sqrt{3} + 1 = 4 - 2\\sqrt{3}$.",
    options: [
      { text: "$4 - 2\\sqrt{3}$", isCorrect: true },
      { text: "$2$", isCorrect: false },
      { text: "$2 - 2\\sqrt{3}$", isCorrect: false },
      { text: "$4 + 2\\sqrt{3}$", isCorrect: false },
    ],
  },
  {
    topic: "Racines carrées - Simplification",
    difficulty: "Difficile",
    question: "Simplifier $D = 5\\sqrt{12} - 3\\sqrt{48} + 2\\sqrt{75}$ :",
    explanation:
      "$5\\sqrt{12} = 10\\sqrt{3}$ ; $3\\sqrt{48} = 3 \\times 4\\sqrt{3} = 12\\sqrt{3}$ ; $2\\sqrt{75} = 2 \\times 5\\sqrt{3} = 10\\sqrt{3}$. D'où $D = (10 - 12 + 10)\\sqrt{3} = 8\\sqrt{3}$.",
    options: [
      { text: "$8\\sqrt{3}$", isCorrect: true },
      { text: "$6\\sqrt{3}$", isCorrect: false },
      { text: "$12\\sqrt{3}$", isCorrect: false },
      { text: "$4\\sqrt{3}$", isCorrect: false },
    ],
  },

  // =========================================================================
  // PARTIE 5 : RENDRE RATIONNEL LE DÉNOMINATEUR (CAS 1 & CONJUGUÉ) (Q31 à Q36)
  // =========================================================================
  {
    topic: "Racines carrées - Dénominateur et Conjugué",
    difficulty: "Facile",
    question: "Écrire $\\dfrac{6}{\\sqrt{3}}$ sans radical au dénominateur :",
    explanation:
      "On multiplie le numérateur et le dénominateur par $\\sqrt{3}$ : $\\dfrac{6 \\times \\sqrt{3}}{\\sqrt{3} \\times \\sqrt{3}} = \\dfrac{6\\sqrt{3}}{3} = 2\\sqrt{3}$.",
    options: [
      { text: "$2\\sqrt{3}$", isCorrect: true },
      { text: "$6\\sqrt{3}$", isCorrect: false },
      { text: "$3\\sqrt{2}$", isCorrect: false },
      { text: "$\\dfrac{\\sqrt{3}}{2}$", isCorrect: false },
    ],
  },
  {
    topic: "Racines carrées - Dénominateur et Conjugué",
    difficulty: "Moyen",
    question: "Rendre rationnel le dénominateur de $\\dfrac{5}{2\\sqrt{5}}$ :",
    explanation:
      "On multiplie en haut et en bas par $\\sqrt{5}$ : $\\dfrac{5\\sqrt{5}}{2 \\times 5} = \\dfrac{\\sqrt{5}}{2}$.",
    options: [
      { text: "$\\dfrac{\\sqrt{5}}{2}$", isCorrect: true },
      { text: "$\\dfrac{5\\sqrt{5}}{2}$", isCorrect: false },
      { text: "$2\\sqrt{5}$", isCorrect: false },
      { text: "$\\dfrac{1}{2}$", isCorrect: false },
    ],
  },
  {
    topic: "Racines carrées - Dénominateur et Conjugué",
    difficulty: "Facile",
    question: "Quelle est l'expression conjuguée de $\\sqrt{7} - 2$ ?",
    explanation:
      "L'expression conjuguée de $a - b$ est $a + b$, ce qui permet d'utiliser $(a-b)(a+b) = a^2 - b^2$ pour éliminer la racine carrée.",
    options: [
      { text: "$\\sqrt{7} + 2$", isCorrect: true },
      { text: "$-\\sqrt{7} + 2$", isCorrect: false },
      { text: "$2 - \\sqrt{7}$", isCorrect: false },
      { text: "$7 - 4$", isCorrect: false },
    ],
  },
  {
    topic: "Racines carrées - Dénominateur et Conjugué",
    difficulty: "Difficile",
    question:
      "Écrire $\\dfrac{1}{\\sqrt{5} - 2}$ sans racine carrée au dénominateur :",
    explanation:
      "On multiplie par le conjugué $(\\sqrt{5} + 2)$ : $\\dfrac{\\sqrt{5} + 2}{(\\sqrt{5})^2 - 2^2} = \\dfrac{\\sqrt{5} + 2}{5 - 4} = \\sqrt{5} + 2$.",
    options: [
      { text: "$\\sqrt{5} + 2$", isCorrect: true },
      { text: "$\\sqrt{5} - 2$", isCorrect: false },
      { text: "$\\dfrac{\\sqrt{5} + 2}{3}$", isCorrect: false },
      { text: "$\\dfrac{\\sqrt{5} + 2}{9}$", isCorrect: false },
    ],
  },
  {
    topic: "Racines carrées - Dénominateur et Conjugué",
    difficulty: "Difficile",
    question:
      "Rendre rationnel le dénominateur de $\\dfrac{4}{\\sqrt{7} + \\sqrt{3}}$ :",
    explanation:
      "En multipliant par le conjugué $(\\sqrt{7} - \\sqrt{3})$ : $\\dfrac{4(\\sqrt{7} - \\sqrt{3})}{7 - 3} = \\dfrac{4(\\sqrt{7} - \\sqrt{3})}{4} = \\sqrt{7} - \\sqrt{3}$.",
    options: [
      { text: "$\\sqrt{7} - \\sqrt{3}$", isCorrect: true },
      { text: "$\\sqrt{7} + \\sqrt{3}$", isCorrect: false },
      { text: "$4(\\sqrt{7} - \\sqrt{3})$", isCorrect: false },
      { text: "$\\dfrac{\\sqrt{7} - \\sqrt{3}}{4}$", isCorrect: false },
    ],
  },
  {
    topic: "Racines carrées - Dénominateur et Conjugué",
    difficulty: "Difficile",
    question:
      "Écrire $\\dfrac{6}{3 - \\sqrt{3}}$ sans radical au dénominateur :",
    explanation:
      "On multiplie par le conjugué $(3 + \\sqrt{3})$ : $\\dfrac{6(3 + \\sqrt{3})}{3^2 - (\\sqrt{3})^2} = \\dfrac{6(3 + \\sqrt{3})}{9 - 3} = \\dfrac{6(3 + \\sqrt{3})}{6} = 3 + \\sqrt{3}$.",
    options: [
      { text: "$3 + \\sqrt{3}$", isCorrect: true },
      { text: "$3 - \\sqrt{3}$", isCorrect: false },
      { text: "$1 + \\sqrt{3}$", isCorrect: false },
      { text: "$2 + \\sqrt{3}$", isCorrect: false },
    ],
  },

  // =========================================================================
  // PARTIE 6 : ÉQUATIONS DU TYPE x² = a (a > 0, a = 0, a < 0) (Q37 à Q42)
  // =========================================================================
  {
    topic: "Racines carrées - Équations x² = a",
    difficulty: "Facile",
    question:
      "Quelles sont les solutions de l'équation $x^2 = 9$ dans $\\mathbb{R}$ ?",
    explanation:
      "Comme $9 > 0$, l'équation $x^2 = 9$ admet **deux** solutions opposées : $\\sqrt{9} = 3$ et $-\\sqrt{9} = -3$. Oublier $-3$ est l'erreur la plus fréquente.",
    options: [
      { text: "$3$ et $-3$", isCorrect: true },
      { text: "Uniquement $3$", isCorrect: false },
      { text: "$9$ et $-9$", isCorrect: false },
      { text: "$\\sqrt{3}$ et $-\\sqrt{3}$", isCorrect: false },
    ],
  },
  {
    topic: "Racines carrées - Équations x² = a",
    difficulty: "Facile",
    question: "Quelles sont les solutions de l'équation $x^2 = 7$ ?",
    explanation:
      "Puisque $7 > 0$, l'équation $x^2 = 7$ possède deux solutions réelles : $\\sqrt{7}$ et $-\\sqrt{7}$.",
    options: [
      { text: "$\\sqrt{7}$ et $-\\sqrt{7}$", isCorrect: true },
      { text: "Uniquement $\\sqrt{7}$", isCorrect: false },
      { text: "$3,5$ et $-3,5$", isCorrect: false },
      { text: "$49$ et $-49$", isCorrect: false },
    ],
  },
  {
    topic: "Racines carrées - Équations x² = a",
    difficulty: "Facile",
    question:
      "Combien de solutions possède l'équation $x^2 = -25$ dans $\\mathbb{R}$ ?",
    explanation:
      "Un carré est toujours positif ou nul dans $\\mathbb{R}$ ($x^2 \\ge 0$). Comme $-25 < 0$, l'équation n'admet **aucune** solution réelle.",
    options: [
      { text: "Aucune solution", isCorrect: true },
      { text: "Une seule solution : $-5$", isCorrect: false },
      { text: "Deux solutions : $5$ et $-5$", isCorrect: false },
      { text: "Une seule solution : $-\\sqrt{25}$", isCorrect: false },
    ],
  },
  {
    topic: "Racines carrées - Équations x² = a",
    difficulty: "Moyen",
    question: "Résoudre dans $\\mathbb{R}$ l'équation $x^2 + 16 = 0$ :",
    explanation:
      "L'équation équivaut à $x^2 = -16$. Comme $-16 < 0$, cette équation n'admet aucune solution dans $\\mathbb{R}$.",
    options: [
      { text: "Aucune solution ($S = \\varnothing$)", isCorrect: true },
      { text: "$4$ et $-4$", isCorrect: false },
      { text: "Uniquement $-4$", isCorrect: false },
      { text: "$-8$ et $8$", isCorrect: false },
    ],
  },
  {
    topic: "Racines carrées - Équations x² = a",
    difficulty: "Moyen",
    question: "Résoudre l'équation $3x^2 - 15 = 0$ :",
    explanation:
      "$3x^2 = 15 \\iff x^2 = \\dfrac{15}{3} \\iff x^2 = 5$. Comme $5 > 0$, les solutions sont $\\sqrt{5}$ et $-\\sqrt{5}$.",
    options: [
      { text: "$\\sqrt{5}$ et $-\\sqrt{5}$", isCorrect: true },
      { text: "$5$ et $-5$", isCorrect: false },
      { text: "Uniquement $\\sqrt{5}$", isCorrect: false },
      { text: "$\\sqrt{15}$ et $-\\sqrt{15}$", isCorrect: false },
    ],
  },
  {
    topic: "Racines carrées - Équations x² = a",
    difficulty: "Moyen",
    question: "Résoudre l'équation $(x - 1)^2 = 0$ :",
    explanation:
      "Un carré est nul si et seulement si sa base est nulle : $x - 1 = 0 \\iff x = 1$. C'est le cas $X^2 = 0$ qui donne une unique solution.",
    options: [
      { text: "Une unique solution : $1$", isCorrect: true },
      { text: "Deux solutions : $1$ et $-1$", isCorrect: false },
      { text: "Une unique solution : $0$", isCorrect: false },
      { text: "Aucune solution", isCorrect: false },
    ],
  },
];

async function main() {
  console.log(
    "Démarrage de la création de l'examen sur les Racines Carrées (3AC)...",
  );

  // 1. Créer ou mettre à jour l'Examen
  const exam = await prisma.qcmExam.upsert({
    where: { slug: "racines-carrees-3ac" },
    update: {
      title: "Les Racines Carrées (3e Année Collège)",
      description:
        "Évaluation complète sur la définition, la relation racine et carré, le produit et quotient de radicaux, les pièges sur les sommes, la forme conjuguée et les équations x² = a.",
      timeLimitMinutes: 45,
      published: true,
    },
    create: {
      slug: "racines-carrees-3ac",
      title: "Les Racines Carrées (3e Année Collège)",
      description:
        "Évaluation complète sur la définition, la relation racine et carré, le produit et quotient de radicaux, les pièges sur les sommes, la forme conjuguée et les équations x² = a.",
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
