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
    question: "Comment définit-on un nombre entier naturel pair ?",
    topic: "Arithmétique dans ℕ",
    difficulty: "Facile",
    explanation:
      "Par définition, un entier naturel $n$ est pair s'il est divisible par 2, c'est-à-dire qu'il existe un entier $k \\in \\mathbb{N}$ tel que $n = 2k$.",
    options: [
      { text: "$n = 2k + 1$ avec $k \\in \\mathbb{N}$", isCorrect: false },
      { text: "$n = 2k$ avec $k \\in \\mathbb{N}$", isCorrect: true },
      { text: "$n$ se termine par 1, 3, 5, 7 ou 9", isCorrect: false },
      { text: "$n$ est divisible par 4", isCorrect: false },
    ],
  },
  {
    question: "Le nombre 0 est-il un nombre pair ?",
    topic: "Arithmétique dans ℕ",
    difficulty: "Facile",
    explanation:
      "$0 = 2 \\times 0$ avec $0 \\in \\mathbb{N}$. Le reste de sa division euclidienne par 2 est nul, donc 0 est un multiple de 2 et par conséquent un nombre pair.",
    options: [
      { text: "Oui, car il est divisible par 2", isCorrect: true },
      { text: "Non, car il est nul", isCorrect: false },
      { text: "Non, car il n'est pas dans $\\mathbb{N}^*$", isCorrect: false },
      { text: "Oui, car il est multiple de 5", isCorrect: false },
    ],
  },
  {
    question: "La somme de deux nombres entiers impairs est toujours :",
    topic: "Arithmétique dans ℕ",
    difficulty: "Facile",
    explanation:
      "Soient $a = 2k + 1$ et $b = 2k' + 1$. Alors $a + b = 2(k + k' + 1) = 2K$, ce qui est toujours un nombre pair.",
    options: [
      { text: "Un nombre impair", isCorrect: false },
      { text: "Un nombre pair", isCorrect: true },
      { text: "Un nombre premier", isCorrect: false },
      { text: "Un nombre divisible par 4", isCorrect: false },
    ],
  },
  {
    question: "Le produit de deux nombres entiers impairs est toujours :",
    topic: "Arithmétique dans ℕ",
    difficulty: "Facile",
    explanation:
      "Soient $a = 2k + 1$ et $b = 2k' + 1$. Le produit s'écrit $(2k+1)(2k'+1) = 4kk' + 2k + 2k' + 1 = 2(2kk' + k + k') + 1 = 2K + 1$, ce qui est toujours impair.",
    options: [
      { text: "Un nombre pair", isCorrect: false },
      { text: "Un nombre impair", isCorrect: true },
      { text: "Un nombre premier", isCorrect: false },
      { text: "Un nombre divisible par 3", isCorrect: false },
    ],
  },
  {
    question: "La différence de deux nombres entiers impairs est toujours :",
    topic: "Arithmétique dans ℕ",
    difficulty: "Facile",
    explanation:
      "Si $a = 2k + 1$ et $b = 2k' + 1$ avec $a \\ge b$, leur différence vaut $(2k+1) - (2k'+1) = 2(k - k')$, ce qui est toujours un nombre pair.",
    options: [
      { text: "Un nombre impair", isCorrect: false },
      { text: "Un nombre pair", isCorrect: true },
      { text: "Un nombre négatif", isCorrect: false },
      { text: "Un nombre premier", isCorrect: false },
    ],
  },
  {
    question: "Un nombre entier naturel est divisible par 2 si :",
    topic: "Arithmétique dans ℕ",
    difficulty: "Facile",
    explanation:
      "Dans le système décimal, un entier est multiple de 2 si et seulement si son chiffre des unités est pair (0, 2, 4, 6 ou 8).",
    options: [
      {
        text: "La somme de ses chiffres est divisible par 2",
        isCorrect: false,
      },
      { text: "Son chiffre des unités est pair", isCorrect: true },
      { text: "Son chiffre des dizaines est pair", isCorrect: false },
      { text: "Il se termine par 0", isCorrect: false },
    ],
  },
  {
    question: "Un nombre entier naturel est divisible par 3 si :",
    topic: "Arithmétique dans ℕ",
    difficulty: "Facile",
    explanation:
      "Comme $10 \\equiv 1 \\pmod 3$, tout entier est congru à la somme de ses chiffres modulo 3. Il est donc divisible par 3 si et seulement si la somme de ses chiffres l'est.",
    options: [
      { text: "Son chiffre des unités est 3", isCorrect: false },
      { text: "La somme de ses chiffres est divisible par 3", isCorrect: true },
      { text: "Il est impair", isCorrect: false },
      { text: "Il se termine par 3 ou 6", isCorrect: false },
    ],
  },
  {
    question: "Un nombre est divisible par 4 si :",
    topic: "Arithmétique dans ℕ",
    difficulty: "Facile",
    explanation:
      "Puisque $100 = 4 \\times 25$, tout entier s'écrit $100q + r$ où $r$ est le nombre formé par ses deux derniers chiffres. Il est donc divisible par 4 si et seulement si $r$ est divisible par 4.",
    options: [
      {
        text: "La somme de ses chiffres est divisible par 4",
        isCorrect: false,
      },
      {
        text: "Le nombre formé par ses deux derniers chiffres est divisible par 4",
        isCorrect: true,
      },
      { text: "Il est pair", isCorrect: false },
      {
        text: "Le nombre formé par ses trois derniers chiffres est divisible par 4",
        isCorrect: false,
      },
    ],
  },
  {
    question: "Un nombre est divisible par 5 si :",
    topic: "Arithmétique dans ℕ",
    difficulty: "Facile",
    explanation:
      "Comme $10 = 2 \\times 5$, un nombre entier est un multiple de 5 si et seulement si son chiffre des unités est 0 ou 5.",
    options: [
      { text: "Son chiffre des unités est 0 ou 5", isCorrect: true },
      { text: "Il est impair", isCorrect: false },
      {
        text: "La somme de ses chiffres est un multiple de 5",
        isCorrect: false,
      },
      { text: "Il se termine par 5 uniquement", isCorrect: false },
    ],
  },
  {
    question: "Un nombre est divisible par 9 si :",
    topic: "Arithmétique dans ℕ",
    difficulty: "Facile",
    explanation:
      "Puisque $10^k \\equiv 1 \\pmod 9$ pour tout $k \\in \\mathbb{N}$, un entier est divisible par 9 si et seulement si la somme de ses chiffres est un multiple de 9.",
    options: [
      { text: "La somme de ses chiffres est divisible par 9", isCorrect: true },
      { text: "Il se termine par 9", isCorrect: false },
      { text: "Il est divisible par 3", isCorrect: false },
      {
        text: "La différence de ses chiffres est divisible par 9",
        isCorrect: false,
      },
    ],
  },
  {
    question: "Un nombre entier naturel $p \\ge 2$ est dit premier si :",
    topic: "Arithmétique dans ℕ",
    difficulty: "Facile",
    explanation:
      "Par définition, un nombre premier admet exactement deux diviseurs distincts dans $\\mathbb{N}$ : 1 et lui-même.",
    options: [
      { text: "Il est impair", isCorrect: false },
      {
        text: "Il admet exactement deux diviseurs positifs : 1 et lui-même",
        isCorrect: true,
      },
      { text: "Il n'est divisible par aucun nombre", isCorrect: false },
      { text: "Il est divisible par 2 et 3", isCorrect: false },
    ],
  },
  {
    question: "Quel est le seul nombre premier qui soit pair ?",
    topic: "Arithmétique dans ℕ",
    difficulty: "Facile",
    explanation:
      "2 n'est divisible que par 1 et 2, il est donc premier. Tout autre nombre pair supérieur à 2 admet au moins 1, 2 et lui-même comme diviseurs, donc il est composé.",
    options: [
      { text: "0", isCorrect: false },
      { text: "1", isCorrect: false },
      { text: "2", isCorrect: true },
      { text: "4", isCorrect: false },
    ],
  },
  {
    question: "Le nombre 1 est-il un nombre premier ?",
    topic: "Arithmétique dans ℕ",
    difficulty: "Facile",
    explanation:
      "1 n'admet qu'un seul diviseur positif dans $\\mathbb{N}$ (lui-même). La définition d'un nombre premier impose d'en avoir exactement deux distincts.",
    options: [
      { text: "Oui, car il n'est divisible que par 1", isCorrect: false },
      {
        text: "Non, car il n'admet qu'un seul diviseur positif",
        isCorrect: true,
      },
      { text: "Oui, car il est impair", isCorrect: false },
      { text: "Non, car il est pair", isCorrect: false },
    ],
  },
  {
    question:
      "Deux entiers naturels $a$ et $b$ sont dits premiers entre eux si :",
    topic: "Arithmétique dans ℕ",
    difficulty: "Facile",
    explanation:
      "Deux entiers sont premiers entre eux lorsque leur plus grand commun diviseur est égal à 1 : $\\text{PGCD}(a, b) = a \\land b = 1$.",
    options: [
      { text: "$a$ et $b$ sont premiers", isCorrect: false },
      { text: "$a \\land b = 1$ (PGCD = 1)", isCorrect: true },
      { text: "$a$ divise $b$", isCorrect: false },
      { text: "$a$ et $b$ sont impairs", isCorrect: false },
    ],
  },
  {
    question:
      "D'après le théorème fondamental de l'arithmétique, tout entier naturel $n \\ge 2$ :",
    topic: "Arithmétique dans ℕ",
    difficulty: "Moyen",
    explanation:
      "Tout entier naturel supérieur ou égal à 2 se décompose de façon unique sous forme d'un produit de facteurs premiers, à l'ordre des facteurs près.",
    options: [
      {
        text: "Peut s'écrire d'une seule manière comme produit de facteurs premiers",
        isCorrect: true,
      },
      { text: "Est un nombre premier", isCorrect: false },
      { text: "A un nombre infini de diviseurs", isCorrect: false },
      { text: "Est divisible par 2", isCorrect: false },
    ],
  },
  {
    question:
      "Si $n = p_1^{\\alpha_1} \\times p_2^{\\alpha_2}$, le nombre de diviseurs de $n$ est :",
    topic: "Arithmétique dans ℕ",
    difficulty: "Moyen",
    explanation:
      "Un diviseur s'écrit $p_1^{\\beta_1} \\times p_2^{\\beta_2}$ avec $0 \\le \\beta_1 \\le \\alpha_1$ et $0 \\le \\beta_2 \\le \\alpha_2$. Il y a $(\\alpha_1 + 1)(\\alpha_2 + 1)$ choix possibles.",
    options: [
      { text: "$\\alpha_1 + \\alpha_2$", isCorrect: false },
      { text: "$(\\alpha_1 + 1)(\\alpha_2 + 1)$", isCorrect: true },
      { text: "$p_1 \\times p_2$", isCorrect: false },
      { text: "$\\alpha_1 \\times \\alpha_2$", isCorrect: false },
    ],
  },
  {
    question:
      "Le PGCD de deux nombres $a$ et $b$ se calcule à partir de leurs décompositions en facteurs premiers en prenant :",
    topic: "Arithmétique dans ℕ",
    difficulty: "Moyen",
    explanation:
      "Pour le PGCD, on retient uniquement les facteurs premiers communs aux deux décompositions, chacun affecté de son plus petit exposant.",
    options: [
      {
        text: "Tous les facteurs communs et non communs avec le plus grand exposant",
        isCorrect: false,
      },
      {
        text: "Les facteurs communs avec le plus petit exposant",
        isCorrect: true,
      },
      {
        text: "Les facteurs communs avec le plus grand exposant",
        isCorrect: false,
      },
      {
        text: "Tous les facteurs avec le plus petit exposant",
        isCorrect: false,
      },
    ],
  },
  {
    question: "Le PPCM de deux nombres $a$ et $b$ se calcule en prenant :",
    topic: "Arithmétique dans ℕ",
    difficulty: "Moyen",
    explanation:
      "Pour le PPCM, on retient l'ensemble des facteurs premiers communs et non communs apparaissant dans au moins l'une des décompositions, chacun affecté de son plus grand exposant.",
    options: [
      {
        text: "Les facteurs communs avec le plus petit exposant",
        isCorrect: false,
      },
      {
        text: "Tous les facteurs communs et non communs avec le plus grand exposant",
        isCorrect: true,
      },
      { text: "Les facteurs non communs uniquement", isCorrect: false },
      { text: "Le produit de leurs chiffres", isCorrect: false },
    ],
  },
  {
    question:
      "La relation entre le PGCD et le PPCM de deux entiers $a$ et $b$ est :",
    topic: "Arithmétique dans ℕ",
    difficulty: "Facile",
    explanation:
      "Pour tous entiers naturels $a$ et $b$, on a la relation fondamentale : $(a \\land b) \\times (a \\lor b) = a \\times b$.",
    options: [
      { text: "$a + b = a \\land b \\times a \\lor b$", isCorrect: false },
      {
        text: "$a \\times b = (a \\land b) \\times (a \\lor b)$",
        isCorrect: true,
      },
      { text: "$a \\times b = a \\land b + a \\lor b$", isCorrect: false },
      { text: "$a / b = a \\land b / a \\lor b$", isCorrect: false },
    ],
  },
  {
    question:
      "La division euclidienne de $a$ par $b$ ($b > 0$) s'écrit $a = bq + r$. Quelle est la condition sur $r$ ?",
    topic: "Arithmétique dans ℕ",
    difficulty: "Facile",
    explanation:
      "L'unicité du quotient $q$ et du reste $r$ dans la division euclidienne est garantie par la condition stricte : $0 \\le r < b$.",
    options: [
      { text: "$0 \\le r \\le b$", isCorrect: false },
      { text: "$0 < r < b$", isCorrect: false },
      { text: "$0 \\le r < b$", isCorrect: true },
      { text: "$0 \\le r \\le 1$", isCorrect: false },
    ],
  },
  {
    question: "Que donne l'Algorithme d'Euclide ?",
    topic: "Arithmétique dans ℕ",
    difficulty: "Facile",
    explanation:
      "L'algorithme d'Euclide repose sur des divisions euclidiennes successives et fournit le PGCD de deux entiers (correspondant au dernier reste non nul).",
    options: [
      { text: "Le PPCM de deux nombres", isCorrect: false },
      { text: "La décomposition en facteurs premiers", isCorrect: false },
      { text: "Le PGCD de deux nombres", isCorrect: true },
      { text: "Le nombre de diviseurs", isCorrect: false },
    ],
  },
  {
    question: "Si un entier $d$ divise $a$ et $b$, alors $d$ divise :",
    topic: "Arithmétique dans ℕ",
    difficulty: "Facile",
    explanation:
      "Si $d \\mid a$ et $d \\mid b$, alors $d$ divise toute combinaison linéaire de $a$ et $b$, en particulier leur somme $a + b$ et leur différence $a - b$.",
    options: [
      { text: "$a \\times b$ uniquement", isCorrect: false },
      { text: "$a + b$ et $a - b$", isCorrect: true },
      { text: "$a / b$", isCorrect: false },
      { text: "$a^b$", isCorrect: false },
    ],
  },
  {
    question: "Un nombre $n$ est divisible par 25 si :",
    topic: "Arithmétique dans ℕ",
    difficulty: "Facile",
    explanation:
      "Comme $100 = 4 \\times 25$, la divisibilité par 25 ne dépend que du nombre formé par les deux derniers chiffres, qui doit être 00, 25, 50 ou 75.",
    options: [
      {
        text: "La somme de ses chiffres est un multiple de 25",
        isCorrect: false,
      },
      {
        text: "Le nombre formé par ses deux derniers chiffres est 00, 25, 50 ou 75",
        isCorrect: true,
      },
      { text: "Il est divisible par 5", isCorrect: false },
      { text: "Il se termine par 2 et 5", isCorrect: false },
    ],
  },
  {
    question:
      "Pour tout entier naturel $n$, le nombre $n^2 + n$ est toujours :",
    topic: "Arithmétique dans ℕ",
    difficulty: "Moyen",
    explanation:
      "$n^2 + n = n(n + 1)$ est le produit de deux entiers naturels consécutifs. L'un d'eux étant nécessairement pair, le résultat est obligatoirement un nombre pair.",
    options: [
      { text: "Impair", isCorrect: false },
      { text: "Pair", isCorrect: true },
      { text: "Divisible par 3", isCorrect: false },
      { text: "Premier", isCorrect: false },
    ],
  },
  {
    question: "La décomposition en facteurs premiers de 30 est :",
    topic: "Arithmétique dans ℕ",
    difficulty: "Facile",
    explanation:
      "$30 = 2 \\times 15 = 2 \\times 3 \\times 5$. Les facteurs 2, 3 et 5 sont tous des nombres premiers.",
    options: [
      { text: "$2 \\times 15$", isCorrect: false },
      { text: "$3 \\times 10$", isCorrect: false },
      { text: "$2 \\times 3 \\times 5$", isCorrect: true },
      { text: "$5 \\times 6$", isCorrect: false },
    ],
  },
  {
    question: "Combien le nombre 12 possède-t-il de diviseurs positifs ?",
    topic: "Arithmétique dans ℕ",
    difficulty: "Moyen",
    explanation:
      "$12 = 2^2 \\times 3^1$. Le nombre de diviseurs positifs est $(2 + 1)(1 + 1) = 3 \\times 2 = 6$. (Ce sont : 1, 2, 3, 4, 6 et 12).",
    options: [
      { text: "4", isCorrect: false },
      { text: "5", isCorrect: false },
      { text: "6", isCorrect: true },
      { text: "8", isCorrect: false },
    ],
  },
  {
    question: "Un nombre entier naturel est divisible par 11 si :",
    topic: "Arithmétique dans ℕ",
    difficulty: "Moyen",
    explanation:
      "Modulo 11, $10 \\equiv -1$. Un nombre est donc divisible par 11 si la différence alternée entre la somme des chiffres de rang impair et celle des rangs pairs est un multiple de 11.",
    options: [
      {
        text: "La somme de ses chiffres est divisible par 11",
        isCorrect: false,
      },
      {
        text: "La différence entre la somme des chiffres de rang impair et celle de rang pair est un multiple de 11",
        isCorrect: true,
      },
      { text: "Il se termine par 11", isCorrect: false },
      { text: "Il est impair", isCorrect: false },
    ],
  },
  {
    question: "Parmi ces nombres, lequel est premier ?",
    topic: "Arithmétique dans ℕ",
    difficulty: "Moyen",
    explanation:
      "$39 = 3 \\times 13$, $51 = 3 \\times 17$ et $57 = 3 \\times 19$ sont composés. 53 n'admet aucun diviseur premier $\\le \\sqrt{53} \\approx 7.28$, c'est donc un nombre premier.",
    options: [
      { text: "39", isCorrect: false },
      { text: "51", isCorrect: false },
      { text: "53", isCorrect: true },
      { text: "57", isCorrect: false },
    ],
  },
  {
    question: "Le PGCD de 12 et 18 est :",
    topic: "Arithmétique dans ℕ",
    difficulty: "Facile",
    explanation:
      "$12 = 2^2 \\times 3$ et $18 = 2 \\times 3^2$. Les facteurs communs munis du plus petit exposant donnent $2^1 \\times 3^1 = 6$.",
    options: [
      { text: "2", isCorrect: false },
      { text: "3", isCorrect: false },
      { text: "6", isCorrect: true },
      { text: "36", isCorrect: false },
    ],
  },
  {
    question: "Le PPCM de 4 et 6 est :",
    topic: "Arithmétique dans ℕ",
    difficulty: "Facile",
    explanation:
      "$4 = 2^2$ et $6 = 2 \\times 3$. Les facteurs avec les plus grands exposants donnent $2^2 \\times 3 = 4 \\times 3 = 12$.",
    options: [
      { text: "2", isCorrect: false },
      { text: "12", isCorrect: true },
      { text: "24", isCorrect: false },
      { text: "10", isCorrect: false },
    ],
  },
];

async function main() {
  console.log(
    "Démarrage du seed pour l'examen d'Arithmétique dans ℕ (Tronc Commun)...",
  );

  const exam = await prisma.qcmExam.upsert({
    where: { slug: "arithmetique-dans-n-tc" },
    update: {
      title: "Arithmétique dans ℕ",
      description:
        "Évaluation didactique sur la parité, les critères de divisibilité, la décomposition en facteurs premiers, le PGCD, le PPCM et l'algorithme d'Euclide pour le Tronc Commun.",
      timeLimitMinutes: 45,
      published: true,
    },
    create: {
      slug: "arithmetique-dans-n-tc",
      title: "Arithmétique dans ℕ",
      description:
        "Évaluation didactique sur la parité, les critères de divisibilité, la décomposition en facteurs premiers, le PGCD, le PPCM et l'algorithme d'Euclide pour le Tronc Commun.",
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
