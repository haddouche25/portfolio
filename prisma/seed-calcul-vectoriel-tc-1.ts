import "dotenv/config";
import { prisma } from "../src/lib/db";
import { SchoolLevel } from "@prisma/client";

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
    question: "Un vecteur $\\vec{AB}$ est caractérisé par :",
    topic: "Calcul Vectoriel dans le Plan",
    difficulty: "Facile",
    explanation:
      "Un vecteur est géométriquement défini par trois composantes indissociables : sa direction (la droite $(AB)$ et ses parallèles), son sens (de $A$ vers $B$) et sa norme (la longueur de la translation $AB$).",
    options: [
      { text: "Sa longueur uniquement", isCorrect: false },
      { text: "Sa direction, son sens et sa norme", isCorrect: true },
      { text: "Son point d'application uniquement", isCorrect: false },
      { text: "Son abscisse et son ordonnée uniquement", isCorrect: false },
    ],
  },
  {
    question:
      "La norme du vecteur $\\vec{AB}$, notée $\\|\\vec{AB}\\|$, est égale à :",
    topic: "Calcul Vectoriel dans le Plan",
    difficulty: "Facile",
    explanation:
      "La norme d'un vecteur géométrique $\\vec{AB}$ correspond précisément à la distance euclidienne entre ses deux points d'extrémité : $\\|\\vec{AB}\\| = AB$.",
    options: [
      { text: "La distance $AB$", isCorrect: true },
      { text: "La direction de la droite $(AB)$", isCorrect: false },
      { text: "Le point $A$", isCorrect: false },
      { text: "Le double de la distance $AB$", isCorrect: false },
    ],
  },
  {
    question: "Le vecteur nul $\\vec{0}$ est un vecteur qui :",
    topic: "Calcul Vectoriel dans le Plan",
    difficulty: "Facile",
    explanation:
      "Pour tout point $A$, $\\vec{AA} = \\vec{0}$. Sa norme est nulle ($\\|\\vec{0}\\| = 0$), et il ne possède ni direction privilégiée ni sens particulier.",
    options: [
      { text: "A une direction mais pas de sens", isCorrect: false },
      { text: "N'a ni direction, ni sens, et sa norme est 0", isCorrect: true },
      { text: "A une norme de 1", isCorrect: false },
      { text: "Est égal à tout vecteur", isCorrect: false },
    ],
  },
  {
    question: "Un vecteur unitaire est un vecteur dont :",
    topic: "Calcul Vectoriel dans le Plan",
    difficulty: "Facile",
    explanation:
      "Par définition arithmétique et géométrique, un vecteur $\\vec{u}$ est dit unitaire si sa norme vaut exactement 1 : $\\|\\vec{u}\\| = 1$.",
    options: [
      { text: "La direction est connue", isCorrect: false },
      { text: "La norme est égale à 1", isCorrect: true },
      { text: "Le sens est positif", isCorrect: false },
      { text: "Les coordonnées sont nulles", isCorrect: false },
    ],
  },
  {
    question:
      "Deux vecteurs $\\vec{u}$ et $\\vec{v}$ sont égaux si et seulement si :",
    topic: "Calcul Vectoriel dans le Plan",
    difficulty: "Facile",
    explanation:
      "L'égalité vectorielle $\\vec{u} = \\vec{v}$ exige l'égalité simultanée des 3 éléments constitutifs : même direction, même sens d'orientation et même longueur (norme).",
    options: [
      { text: "Ils ont la même direction", isCorrect: false },
      { text: "Ils ont la même norme", isCorrect: false },
      {
        text: "Ils ont la même direction, le même sens et la même norme",
        isCorrect: true,
      },
      { text: "Ils ont le même point de départ", isCorrect: false },
    ],
  },
  {
    question: "La relation de Chasles s'écrit :",
    topic: "Calcul Vectoriel dans le Plan",
    difficulty: "Facile",
    explanation:
      "Pour tous points $A, B, C$ du plan, la relation fondamentale de Chasles énonce que l'enchaînement des translations se traduit par : $\\vec{AB} + \\vec{BC} = \\vec{AC}$.",
    options: [
      { text: "$\\vec{AB} + \\vec{BC} = \\vec{AC}$", isCorrect: true },
      { text: "$\\vec{AB} + \\vec{AC} = \\vec{BC}$", isCorrect: false },
      { text: "$\\vec{AB} - \\vec{BC} = \\vec{AC}$", isCorrect: false },
      { text: "$\\vec{AB} + \\vec{BC} = \\vec{CA}$", isCorrect: false },
    ],
  },
  {
    question: "L'opposé du vecteur $\\vec{AB}$ est le vecteur :",
    topic: "Calcul Vectoriel dans le Plan",
    difficulty: "Facile",
    explanation:
      "L'opposé d'un vecteur a la même direction, la même norme mais un sens contraire : $-\\vec{AB} = \\vec{BA}$, car $\\vec{AB} + \\vec{BA} = \\vec{AA} = \\vec{0}$.",
    options: [
      { text: "$\\vec{AB}$", isCorrect: false },
      { text: "$\\vec{BA}$", isCorrect: true },
      { text: "$2\\vec{AB}$", isCorrect: false },
      { text: "$\\vec{0}$", isCorrect: false },
    ],
  },
  {
    question:
      "La règle du parallélogramme stipule que si $ABCD$ est un parallélogramme, alors :",
    topic: "Calcul Vectoriel dans le Plan",
    difficulty: "Facile",
    explanation:
      "Dans un parallélogramme $ABCD$, on a $\\vec{AD} = \\vec{BC}$. En substituant dans la relation de Chasles : $\\vec{AB} + \\vec{AD} = \\vec{AB} + \\vec{BC} = \\vec{AC}$.",
    options: [
      { text: "$\\vec{AB} + \\vec{AD} = \\vec{AC}$", isCorrect: true },
      { text: "$\\vec{AB} + \\vec{AC} = \\vec{AD}$", isCorrect: false },
      { text: "$\\vec{AC} + \\vec{AD} = \\vec{AB}$", isCorrect: false },
      { text: "$\\vec{AB} + \\vec{BC} = \\vec{BD}$", isCorrect: false },
    ],
  },
  {
    question:
      "Le produit d'un vecteur $\\vec{u}$ par un réel non nul $k$ est un vecteur qui a :",
    topic: "Calcul Vectoriel dans le Plan",
    difficulty: "Facile",
    explanation:
      "La multiplication par un scalaire préserve la direction : les droites porteuses sont parallèles, $k\\vec{u}$ et $\\vec{u}$ partagent toujours la même direction.",
    options: [
      { text: "La même direction que $\\vec{u}$", isCorrect: true },
      { text: "Une direction perpendiculaire à $\\vec{u}$", isCorrect: false },
      { text: "Toujours le même sens que $\\vec{u}$", isCorrect: false },
      {
        text: "Une norme toujours égale à celle de $\\vec{u}$",
        isCorrect: false,
      },
    ],
  },
  {
    question: "Si $k > 0$, le vecteur $k\\vec{u}$ a :",
    topic: "Calcul Vectoriel dans le Plan",
    difficulty: "Facile",
    explanation:
      "Lorsque le facteur d'échelle $k$ est strictement positif, l'orientation de déplacement est conservée : $k\\vec{u}$ pointe dans le même sens que $\\vec{u}$.",
    options: [
      { text: "Le même sens que $\\vec{u}$", isCorrect: true },
      { text: "Le sens contraire de $\\vec{u}$", isCorrect: false },
      { text: "Un sens perpendiculaire", isCorrect: false },
      { text: "Aucun sens", isCorrect: false },
    ],
  },
  {
    question: "Si $k < 0$, le vecteur $k\\vec{u}$ a :",
    topic: "Calcul Vectoriel dans le Plan",
    difficulty: "Facile",
    explanation:
      "Un scalaire strictement négatif inverse le sens de parcours géométrique : $k\\vec{u}$ possède un sens opposé à celui de $\\vec{u}$.",
    options: [
      { text: "Le même sens que $\\vec{u}$", isCorrect: false },
      { text: "Le sens contraire de $\\vec{u}$", isCorrect: true },
      { text: "Un sens nul", isCorrect: false },
      { text: "Une norme nulle", isCorrect: false },
    ],
  },
  {
    question: "La norme du vecteur $k\\vec{u}$ est égale à :",
    topic: "Calcul Vectoriel dans le Plan",
    difficulty: "Facile",
    explanation:
      "La norme étant une distance toujours positive ou nulle, le scalaire sort obligatoirement en valeur absolue : $\\|k\\vec{u}\\| = |k| \\times \\|\\vec{u}\\|$. Remarque : la notation $|k|$ désigne la valeur absolue du réel $k$.",
    options: [
      { text: "$k \\|\\vec{u}\\|$", isCorrect: false },
      { text: "$|k| \\|\\vec{u}\\|$", isCorrect: true },
      { text: "$\\|\\vec{u}\\|$", isCorrect: false },
      { text: "$k + \\|\\vec{u}\\|$", isCorrect: false },
    ],
  },
  {
    question: "Pour tout vecteur $\\vec{u}$, on a :",
    topic: "Calcul Vectoriel dans le Plan",
    difficulty: "Facile",
    explanation:
      "La multiplication du vecteur par le scalaire 0 annule la longueur et donne le vecteur nul : $0 \\cdot \\vec{u} = \\vec{0}$.",
    options: [
      { text: "$0 \\cdot \\vec{u} = \\vec{0}$", isCorrect: true },
      { text: "$0 \\cdot \\vec{u} = 1$", isCorrect: false },
      { text: "$1 \\cdot \\vec{u} = \\vec{0}$", isCorrect: false },
      { text: "$-1 \\cdot \\vec{u} = \\vec{u}$", isCorrect: false },
    ],
  },
  {
    question: "Pour tout réel $k$, on a :",
    topic: "Calcul Vectoriel dans le Plan",
    difficulty: "Facile",
    explanation:
      "Multiplier le vecteur nul $\\vec{0}$ par n'importe quel coefficient réel produit toujours le vecteur nul : $k \\cdot \\vec{0} = \\vec{0}$.",
    options: [
      { text: "$k \\cdot \\vec{0} = 1$", isCorrect: false },
      { text: "$k \\cdot \\vec{0} = \\vec{0}$", isCorrect: true },
      { text: "$k \\cdot \\vec{0} = k$", isCorrect: false },
      { text: "$k \\cdot \\vec{0} = -k$", isCorrect: false },
    ],
  },
  {
    question:
      "La distributivité de la multiplication d'un vecteur par un scalaire s'écrit :",
    topic: "Calcul Vectoriel dans le Plan",
    difficulty: "Facile",
    explanation:
      "L'action d'un scalaire sur une somme vectorielle est distributive : pour tout $k \\in \\mathbb{R}$ et tous vecteurs $\\vec{u}, \\vec{v}$, $k(\\vec{u} + \\vec{v}) = k\\vec{u} + k\\vec{v}$.",
    options: [
      {
        text: "$k(\\vec{u} + \\vec{v}) = k\\vec{u} + k\\vec{v}$",
        isCorrect: true,
      },
      {
        text: "$k(\\vec{u} + \\vec{v}) = k\\vec{u} + \\vec{v}$",
        isCorrect: false,
      },
      { text: "$(k + k')\\vec{u} = k\\vec{u} + k'\\vec{v}$", isCorrect: false },
      {
        text: "$k(\\vec{u} \\times \\vec{v}) = k\\vec{u} \\times k\\vec{v}$",
        isCorrect: false,
      },
    ],
  },
  {
    question:
      "Deux vecteurs $\\vec{u}$ et $\\vec{v}$ (avec $\\vec{v} \\neq \\vec{0}$) sont colinéaires si et seulement si :",
    topic: "Calcul Vectoriel dans le Plan",
    difficulty: "Facile",
    explanation:
      "Par définition algébrique, deux vecteurs sont colinéaires s'ils ont la même direction, ce qui équivaut à l'existence d'une constante $k \\in \\mathbb{R}$ telle que $\\vec{u} = k\\vec{v}$.",
    options: [
      { text: "$\\vec{u} = \\vec{v}$", isCorrect: false },
      {
        text: "Il existe un réel $k$ tel que $\\vec{u} = k\\vec{v}$",
        isCorrect: true,
      },
      { text: "Ils ont la même norme", isCorrect: false },
      { text: "$\\vec{u} + \\vec{v} = \\vec{0}$", isCorrect: false },
    ],
  },
  {
    question:
      "Si deux vecteurs non nuls $\\vec{AB}$ et $\\vec{CD}$ sont colinéaires, alors les droites $(AB)$ et $(CD)$ sont :",
    topic: "Calcul Vectoriel dans le Plan",
    difficulty: "Facile",
    explanation:
      "La colinéarité des vecteurs signifie qu'ils ont la même direction géométrique, ce qui implique que les droites $(AB)$ et $(CD)$ sont strictement parallèles ou confondues (parallélisme géométrique).",
    options: [
      { text: "Sécantes", isCorrect: false },
      { text: "Parallèles", isCorrect: true },
      { text: "Perpendiculaires", isCorrect: false },
      { text: "Toujours sécantes", isCorrect: false },
    ],
  },
  {
    question:
      "Trois points $A, B, C$ distincts sont alignés si et seulement si :",
    topic: "Calcul Vectoriel dans le Plan",
    difficulty: "Facile",
    explanation:
      "Puisqu'ils partagent le point d'origine $A$, les points $A, B$ et $C$ appartiennent à la même droite si et seulement si les vecteurs directeurs $\\vec{AB}$ et $\\vec{AC}$ sont colinéaires.",
    options: [
      { text: "$\\vec{AB}$ et $\\vec{AC}$ sont colinéaires", isCorrect: true },
      { text: "$\\vec{AB}$ et $\\vec{BC}$ sont orthogonaux", isCorrect: false },
      { text: "$\\|\\vec{AB}\\| = \\|\\vec{AC}\\|$", isCorrect: false },
      { text: "$\\vec{AB} + \\vec{AC} = \\vec{0}$", isCorrect: false },
    ],
  },
  {
    question:
      "Le point $I$ est le milieu du segment $[AB]$ si et seulement si :",
    topic: "Calcul Vectoriel dans le Plan",
    difficulty: "Facile",
    explanation:
      "$I$ est le milieu de $[AB]$ équivaut vectoriellement à $\\vec{AI} = \\vec{IB}$, ce qui se réécrit : $\\vec{IA} + \\vec{IB} = -\\vec{AI} + \\vec{IB} = \\vec{0}$.",
    options: [
      { text: "$\\vec{IA} + \\vec{IB} = \\vec{0}$", isCorrect: true },
      { text: "$\\vec{IA} - \\vec{IB} = \\vec{0}$", isCorrect: false },
      { text: "$\\vec{IA} = \\vec{IB}$", isCorrect: false },
      { text: "$\\vec{AB} = \\vec{AI}$", isCorrect: false },
    ],
  },
  {
    question: "Si $I$ est le milieu de $[AB]$, alors :",
    topic: "Calcul Vectoriel dans le Plan",
    difficulty: "Facile",
    explanation:
      "On a $\\vec{AB} = \\vec{AI} + \\vec{IB}$. Comme $\\vec{AI} = \\vec{IB}$, il s'ensuit immédiatement que $\\vec{AB} = \\vec{AI} + \\vec{AI} = 2\\vec{AI}$.",
    options: [
      { text: "$\\vec{AB} = 2\\vec{AI}$", isCorrect: true },
      { text: "$\\vec{AB} = \\vec{AI}$", isCorrect: false },
      { text: "$\\vec{AI} = 2\\vec{AB}$", isCorrect: false },
      { text: "$\\vec{IA} = 2\\vec{AB}$", isCorrect: false },
    ],
  },
  {
    question: "Pour tous points $A$ et $B$, on a :",
    topic: "Calcul Vectoriel dans le Plan",
    difficulty: "Facile",
    explanation:
      "Changer l'ordre des extrémités inverse le sens de translation : $\\vec{AB} = -\\vec{BA}$.",
    options: [
      { text: "$\\vec{AB} = \\vec{BA}$", isCorrect: false },
      { text: "$\\vec{AB} = -\\vec{BA}$", isCorrect: true },
      { text: "$\\vec{AB} + \\vec{BA} = \\vec{AB}$", isCorrect: false },
      { text: "$\\vec{AB} - \\vec{BA} = \\vec{0}$", isCorrect: false },
    ],
  },
  {
    question: "Pour tout triangle $ABC$ et $I$ milieu de $[BC]$, on a :",
    topic: "Calcul Vectoriel dans le Plan",
    difficulty: "Moyen",
    explanation:
      "Par Chasles : $\\vec{AB} + \\vec{AC} = (\\vec{AI} + \\vec{IB}) + (\\vec{AI} + \\vec{IC}) = 2\\vec{AI} + (\\vec{IB} + \\vec{IC})$. Comme $I$ est le milieu de $[BC]$, $\\vec{IB} + \\vec{IC} = \\vec{0}$, d'où $\\vec{AB} + \\vec{AC} = 2\\vec{AI}$.",
    options: [
      { text: "$\\vec{AB} + \\vec{AC} = \\vec{AI}$", isCorrect: false },
      { text: "$\\vec{AB} + \\vec{AC} = 2\\vec{AI}$", isCorrect: true },
      { text: "$\\vec{AB} + \\vec{AC} = \\vec{BC}$", isCorrect: false },
      { text: "$\\vec{AB} + \\vec{AC} = \\vec{0}$", isCorrect: false },
    ],
  },
  {
    question: "Si $ABCD$ est un parallélogramme, alors :",
    topic: "Calcul Vectoriel dans le Plan",
    difficulty: "Facile",
    explanation:
      "Dans le quadrilatère ordonné $ABCD$, les côtés opposés ont même sens et même longueur : $\\vec{AB} = \\vec{DC}$ (et non $\\vec{CD}$ qui serait de sens inverse).",
    options: [
      { text: "$\\vec{AB} = \\vec{CD}$", isCorrect: false },
      { text: "$\\vec{AB} = \\vec{DC}$", isCorrect: true },
      { text: "$\\vec{AD} = \\vec{CB}$", isCorrect: false },
      { text: "$\\vec{AB} + \\vec{CD} = \\vec{AC}$", isCorrect: false },
    ],
  },
  {
    question: "Si $\\vec{AB} = \\vec{DC}$, alors le quadrilatère $ABCD$ est :",
    topic: "Calcul Vectoriel dans le Plan",
    difficulty: "Facile",
    explanation:
      "L'égalité vectorielle $\\vec{AB} = \\vec{DC}$ est la définition vectorielle caractéristique équivalente au parallélogramme $ABCD$.",
    options: [
      { text: "Un rectangle", isCorrect: false },
      { text: "Un parallélogramme", isCorrect: true },
      { text: "Un carré", isCorrect: false },
      { text: "Un trapèze", isCorrect: false },
    ],
  },
  {
    question: "L'addition des vecteurs est :",
    topic: "Calcul Vectoriel dans le Plan",
    difficulty: "Facile",
    explanation:
      "L'ordre des termes n'altère pas la somme vectorielle finale : $\\vec{u} + \\vec{v} = \\vec{v} + \\vec{u}$. Cette opération est commutative.",
    options: [
      {
        text: "Commutative ($\\vec{u} + \\vec{v} = \\vec{v} + \\vec{u}$)",
        isCorrect: true,
      },
      { text: "Non commutative", isCorrect: false },
      { text: "Associative uniquement", isCorrect: false },
      { text: "Distributive uniquement", isCorrect: false },
    ],
  },
  {
    question:
      "Dans un triangle $ABC$, si $I$ est le milieu de $[AB]$ et $J$ est le milieu de $[AC]$, alors :",
    topic: "Calcul Vectoriel dans le Plan",
    difficulty: "Moyen",
    explanation:
      "Par Chasles : $\\vec{IJ} = \\vec{IA} + \\vec{AJ} = -\\frac{1}{2}\\vec{AB} + \\frac{1}{2}\\vec{AC} = \\frac{1}{2}(\\vec{BA} + \\vec{AC}) = \\frac{1}{2}\\vec{BC}$. C'est la forme vectorielle du théorème des milieux.",
    options: [
      { text: "$\\vec{IJ} = 2\\vec{BC}$", isCorrect: false },
      { text: "$\\vec{IJ} = \\frac{1}{2}\\vec{BC}$", isCorrect: true },
      { text: "$\\vec{IJ} = \\vec{BC}$", isCorrect: false },
      { text: "$\\vec{IJ} = -\\vec{BC}$", isCorrect: false },
    ],
  },
  {
    question: "Pour tout vecteur $\\vec{u}$, on a :",
    topic: "Calcul Vectoriel dans le Plan",
    difficulty: "Facile",
    explanation:
      "Le vecteur nul $\\vec{0}$ est l'élément neutre de l'addition vectorielle dans le plan : $\\vec{u} + \\vec{0} = \\vec{u}$.",
    options: [
      { text: "$\\vec{u} + \\vec{0} = \\vec{0}$", isCorrect: false },
      { text: "$\\vec{u} + \\vec{0} = \\vec{u}$", isCorrect: true },
      { text: "$\\vec{u} - \\vec{0} = \\vec{0}$", isCorrect: false },
      { text: "$\\vec{u} \\times \\vec{0} = \\vec{u}$", isCorrect: false },
    ],
  },
  {
    question: "L'égalité $1 \\cdot \\vec{u} = \\vec{u}$ illustre :",
    topic: "Calcul Vectoriel dans le Plan",
    difficulty: "Facile",
    explanation:
      "Le scalaire 1 laisse le vecteur invariant en grandeur et direction. Il s'agit de l'élément neutre de la loi externe (multiplication par un scalaire).",
    options: [
      {
        text: "L'élément neutre de la multiplication scalaire",
        isCorrect: true,
      },
      { text: "La distributivité", isCorrect: false },
      { text: "L'élément absorbant", isCorrect: false },
      { text: "L'opposé d'un vecteur", isCorrect: false },
    ],
  },
  {
    question: "Si $k\\vec{u} = \\vec{0}$, alors :",
    topic: "Calcul Vectoriel dans le Plan",
    difficulty: "Facile",
    explanation:
      "Dans l'espace vectoriel, le produit d'un scalaire par un vecteur est nul si et seulement si au moins l'un des deux facteurs est nul : $k = 0$ ou $\\vec{u} = \\vec{0}$.",
    options: [
      { text: "$k \\neq 0$ et $\\vec{u} \\neq \\vec{0}$", isCorrect: false },
      { text: "$k = 0$ ou $\\vec{u} = \\vec{0}$", isCorrect: true },
      { text: "$k = 1$ et $\\vec{u} = \\vec{0}$", isCorrect: false },
      { text: "$k = -1$ et $\\vec{u} = \\vec{0}$", isCorrect: false },
    ],
  },
  {
    question:
      "Soient $A$ et $B$ deux points distincts. Le point $M$ défini par $\\vec{AM} = \\frac{1}{3}\\vec{AB}$ se trouve :",
    topic: "Calcul Vectoriel dans le Plan",
    difficulty: "Moyen",
    explanation:
      "Puisque $0 < \\frac{1}{3} < 1$, $M$ appartient à l'intérieur du segment $[AB]$. Comme la distance $AM = \\frac{1}{3}AB < \\frac{1}{2}AB$, $M$ est plus proche de l'origine $A$.",
    options: [
      { text: "À l'extérieur du segment $[AB]$", isCorrect: false },
      { text: "Sur le segment $[AB]$, plus proche de $A$", isCorrect: true },
      { text: "Sur le segment $[AB]$, plus proche de $B$", isCorrect: false },
      { text: "Au milieu de $[AB]$", isCorrect: false },
    ],
  },
];

async function main() {
  console.log(
    "Démarrage du seed pour l'examen de Calcul Vectoriel dans le Plan (Tronc Commun)...",
  );

  const exam = await prisma.qcmExam.upsert({
    where: { slug: "calcul-vectoriel-dans-le-plan-tc" },
    update: {
      title: "Calcul Vectoriel dans le Plan",
      description:
        "Évaluation didactique sur les vecteurs, la relation de Chasles, le parallélogramme, la colinéarité, le produit par un scalaire et le milieu pour le Tronc Commun.",
      level: SchoolLevel.TRONC_COMMUN,
      timeLimitMinutes: 45,
      published: true,
    },
    create: {
      slug: "calcul-vectoriel-dans-le-plan-tc",
      title: "Calcul Vectoriel dans le Plan",
      description:
        "Évaluation didactique sur les vecteurs, la relation de Chasles, le parallélogramme, la colinéarité, le produit par un scalaire et le milieu pour le Tronc Commun.",
      level: SchoolLevel.TRONC_COMMUN,
      timeLimitMinutes: 45,
      published: true,
    },
  });

  console.log(`Examen initialisé : ${exam.title} (ID: ${exam.id})`);

  // Nettoyage des liaisons existantes pour garantir l'idempotence
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
