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
    question: "Qu'est-ce qu'une proposition en logique ?",
    topic: "Logique Mathématique",
    difficulty: "Facile",
    explanation:
      "Une proposition (ou assertion) est un énoncé mathématique qui a une valeur de vérité unique : soit vrai (V), soit faux (F).",
    options: [
      { text: "Une phrase interrogative", isCorrect: false },
      { text: "Un énoncé qui peut être vrai ou faux", isCorrect: true },
      { text: "Une fonction mathématique", isCorrect: false },
      { text: "Un ensemble de nombres", isCorrect: false },
    ],
  },
  {
    question:
      "Soit $P$ et $Q$ deux propositions. À quelle condition la proposition $(P \\land Q)$ est-elle vraie ?",
    topic: "Logique Mathématique",
    difficulty: "Facile",
    explanation:
      "La conjonction $P \\land Q$ n'est vraie que si les deux propositions composantes sont simultanément vraies.",
    options: [
      { text: "Si au moins l'une des deux est vraie", isCorrect: false },
      { text: "Si les deux sont fausses", isCorrect: false },
      { text: "Si les deux sont vraies en même temps", isCorrect: true },
      { text: "Si $P$ est vraie et $Q$ est fausse", isCorrect: false },
    ],
  },
  {
    question: "La proposition $(P \\lor Q)$ est fausse uniquement lorsque :",
    topic: "Logique Mathématique",
    difficulty: "Facile",
    explanation:
      "La disjonction $P \\lor Q$ est vraie dès qu'au moins l'une des assertions est vraie. Elle est donc fausse si et seulement si les deux sont fausses.",
    options: [
      { text: "$P$ est vraie et $Q$ est vraie", isCorrect: false },
      { text: "$P$ est fausse et $Q$ est fausse", isCorrect: true },
      { text: "$P$ est vraie et $Q$ est fausse", isCorrect: false },
      { text: "$P$ est fausse et $Q$ est vraie", isCorrect: false },
    ],
  },
  {
    question: "L'implication $(P \\Rightarrow Q)$ est fausse dans le cas où :",
    topic: "Logique Mathématique",
    difficulty: "Facile",
    explanation:
      "Par définition de la table de vérité de l'implication, $P \\Rightarrow Q$ n'est mise en défaut que lorsque l'hypothèse $P$ est vérifiée mais que la conclusion $Q$ ne l'est pas.",
    options: [
      { text: "$P$ est vraie et $Q$ est vraie", isCorrect: false },
      { text: "$P$ est fausse et $Q$ est vraie", isCorrect: false },
      { text: "$P$ est vraie et $Q$ est fausse", isCorrect: true },
      { text: "$P$ est fausse et $Q$ est fausse", isCorrect: false },
    ],
  },
  {
    question:
      "L'équivalence $(P \\Leftrightarrow Q)$ est vraie si et seulement si :",
    topic: "Logique Mathématique",
    difficulty: "Facile",
    explanation:
      "$P \\Leftrightarrow Q$ traduit le fait que $P$ et $Q$ ont exactement la même valeur de vérité (toutes deux vraies ou toutes deux fausses).",
    options: [
      { text: "$P$ et $Q$ sont toutes les deux vraies", isCorrect: false },
      { text: "$P$ et $Q$ sont toutes les deux fausses", isCorrect: false },
      { text: "$P$ et $Q$ ont la même valeur de vérité", isCorrect: true },
      {
        text: "$P$ et $Q$ ont des valeurs de vérité opposées",
        isCorrect: false,
      },
    ],
  },
  {
    question: "La négation de la proposition $(P \\land Q)$ est :",
    topic: "Logique Mathématique",
    difficulty: "Facile",
    explanation:
      "D'après la première loi de De Morgan : $\\overline{P \\land Q} \\Leftrightarrow \\bar{P} \\lor \\bar{Q}$.",
    options: [
      { text: "$\\bar{P} \\land \\bar{Q}$", isCorrect: false },
      { text: "$\\bar{P} \\lor \\bar{Q}$", isCorrect: true },
      { text: "$P \\Rightarrow \\bar{Q}$", isCorrect: false },
      { text: "$\\bar{P} \\Rightarrow Q$", isCorrect: false },
    ],
  },
  {
    question: "La négation de la proposition $(P \\lor Q)$ est :",
    topic: "Logique Mathématique",
    difficulty: "Facile",
    explanation:
      "D'après la seconde loi de De Morgan : $\\overline{P \\lor Q} \\Leftrightarrow \\bar{P} \\land \\bar{Q}$.",
    options: [
      { text: "$\\bar{P} \\land \\bar{Q}$", isCorrect: true },
      { text: "$\\bar{P} \\lor \\bar{Q}$", isCorrect: false },
      { text: "$\\bar{P} \\Rightarrow \\bar{Q}$", isCorrect: false },
      { text: "$P \\Leftrightarrow \\bar{Q}$", isCorrect: false },
    ],
  },
  {
    question: "La négation de l'implication $(P \\Rightarrow Q)$ est :",
    topic: "Logique Mathématique",
    difficulty: "Moyen",
    explanation:
      "Puisque $(P \\Rightarrow Q) \\Leftrightarrow (\\bar{P} \\lor Q)$, sa négation est $\\overline{\\bar{P} \\lor Q} \\Leftrightarrow (P \\land \\bar{Q})$.",
    options: [
      { text: "$\\bar{P} \\Rightarrow \\bar{Q}$", isCorrect: false },
      { text: "$Q \\Rightarrow P$", isCorrect: false },
      { text: "$P \\land \\bar{Q}$", isCorrect: true },
      { text: "$\\bar{P} \\land Q$", isCorrect: false },
    ],
  },
  {
    question: "La contraposée de l'implication $(P \\Rightarrow Q)$ est :",
    topic: "Logique Mathématique",
    difficulty: "Facile",
    explanation:
      "La contraposée renverse l'ordre des propositions et nie chacune d'elles : $\\bar{Q} \\Rightarrow \\bar{P}$. Elle a la même valeur de vérité que l'implication directe.",
    options: [
      { text: "$Q \\Rightarrow P$", isCorrect: false },
      { text: "$\\bar{P} \\Rightarrow \\bar{Q}$", isCorrect: false },
      { text: "$\\bar{Q} \\Rightarrow \\bar{P}$", isCorrect: true },
      { text: "$P \\lor Q$", isCorrect: false },
    ],
  },
  {
    question:
      "Dans l'implication $P \\Rightarrow Q$, on dit que $P$ est une condition :",
    topic: "Logique Mathématique",
    difficulty: "Facile",
    explanation:
      "Dans $P \\Rightarrow Q$, $P$ suffit pour entraîner $Q$ ($P$ est condition suffisante pour $Q$), tandis que $Q$ est nécessaire dès lors que $P$ est réalisé ($Q$ est condition nécessaire pour $P$).",
    options: [
      { text: "Nécessaire pour $Q$", isCorrect: false },
      { text: "Suffisante pour $Q$", isCorrect: true },
      { text: "Nécessaire et suffisante pour $Q$", isCorrect: false },
      { text: "Inutile pour $Q$", isCorrect: false },
    ],
  },
  {
    question:
      "La négation de la proposition $(\\forall x \\in \\mathbb{R}) : P(x)$ est :",
    topic: "Logique Mathématique",
    difficulty: "Facile",
    explanation:
      "Nier une propriété universelle consiste à affirmer l'existence d'au moins un élément ne la vérifiant pas : $(\\exists x \\in \\mathbb{R}) : \\bar{P}(x)$.",
    options: [
      {
        text: "$(\\forall x \\in \\mathbb{R}) : \\bar{P}(x)$",
        isCorrect: false,
      },
      { text: "$(\\exists x \\in \\mathbb{R}) : P(x)$", isCorrect: false },
      {
        text: "$(\\exists x \\in \\mathbb{R}) : \\bar{P}(x)$",
        isCorrect: true,
      },
      {
        text: "$(\\forall x \\in \\mathbb{R}) : \\bar{P}(x)$ est fausse",
        isCorrect: false,
      },
    ],
  },
  {
    question:
      "La négation de la proposition $(\\exists x \\in \\mathbb{R}) : P(x)$ est :",
    topic: "Logique Mathématique",
    difficulty: "Facile",
    explanation:
      "Nier une assertion existentielle signifie qu'aucun élément ne satisfait la propriété : $(\\forall x \\in \\mathbb{R}) : \\bar{P}(x)$.",
    options: [
      {
        text: "$(\\exists x \\in \\mathbb{R}) : \\bar{P}(x)$",
        isCorrect: false,
      },
      {
        text: "$(\\forall x \\in \\mathbb{R}) : \\bar{P}(x)$",
        isCorrect: true,
      },
      { text: "$(\\forall x \\in \\mathbb{R}) : P(x)$", isCorrect: false },
      { text: "Il n'existe aucun $x$ tel que $P(x)$", isCorrect: false },
    ],
  },
  {
    question:
      "Soit la proposition $P_1 : (\\forall x \\in \\mathbb{R})(\\exists y \\in \\mathbb{R}) : x + 2y > 0$. Quelle est sa négation ?",
    topic: "Logique Mathématique",
    difficulty: "Moyen",
    explanation:
      "La négation inverse chaque quantificateur et nie l'inégalité stricte : $\\forall \\to \\exists$, $\\exists \\to \\forall$, et $>$ devient $\\le$.",
    options: [
      {
        text: "$(\\forall x \\in \\mathbb{R})(\\forall y \\in \\mathbb{R}) : x + 2y \\le 0$",
        isCorrect: false,
      },
      {
        text: "$(\\exists x \\in \\mathbb{R})(\\forall y \\in \\mathbb{R}) : x + 2y \\le 0$",
        isCorrect: true,
      },
      {
        text: "$(\\exists x \\in \\mathbb{R})(\\exists y \\in \\mathbb{R}) : x + 2y \\le 0$",
        isCorrect: false,
      },
      {
        text: "$(\\forall x \\in \\mathbb{R})(\\exists y \\in \\mathbb{R}) : x + 2y \\le 0$",
        isCorrect: false,
      },
    ],
  },
  {
    question:
      "Quelle est la valeur de vérité de la proposition $P_2 : (\\exists y \\in \\mathbb{R})(\\forall x \\in \\mathbb{R}) : x + 2y > 0$ ?",
    topic: "Logique Mathématique",
    difficulty: "Moyen",
    explanation:
      "C'est faux : si un tel $y$ réel fixe existait, en choisissant par exemple $x = -2y - 1$, on obtiendrait $x + 2y = -1 \\le 0$, ce qui contredit la stricte positivité pour tout $x$.",
    options: [
      { text: "Vraie", isCorrect: false },
      { text: "Fausse", isCorrect: true },
      { text: "Dépend de $x$", isCorrect: false },
      { text: "Dépend de $y$", isCorrect: false },
    ],
  },
  {
    question:
      "La proposition $(\\forall x \\in \\mathbb{R}) : x^2 + x + 1 > 0$ est :",
    topic: "Logique Mathématique",
    difficulty: "Moyen",
    explanation:
      "Le trinôme $x^2 + x + 1$ admet un discriminant $\\Delta = 1^2 - 4(1)(1) = -3 < 0$. Comme le coefficient dominant $a = 1 > 0$, le trinôme est strictement positif sur tout $\\mathbb{R}$.",
    options: [
      { text: "Vraie", isCorrect: true },
      { text: "Fausse", isCorrect: false },
      { text: "Vraie pour $x > 0$ seulement", isCorrect: false },
      { text: "Fausse pour $x = 0$", isCorrect: false },
    ],
  },
  {
    question:
      "Le raisonnement par contraposée pour montrer $P \\Rightarrow Q$ consiste à montrer que :",
    topic: "Logique Mathématique",
    difficulty: "Facile",
    explanation:
      "Par équivalence logique, prouver $P \\Rightarrow Q$ revient exactement à établir $\\bar{Q} \\Rightarrow \\bar{P}$.",
    options: [
      { text: "$P \\Rightarrow \\bar{Q}$", isCorrect: false },
      { text: "$\\bar{Q} \\Rightarrow \\bar{P}$", isCorrect: true },
      { text: "$\\bar{P} \\Rightarrow Q$", isCorrect: false },
      { text: "$Q \\Rightarrow P$", isCorrect: false },
    ],
  },
  {
    question:
      "Le raisonnement par l'absurde pour montrer qu'une proposition $P$ est vraie consiste à :",
    topic: "Logique Mathématique",
    difficulty: "Facile",
    explanation:
      "On suppose la négation de la proposition vraie (c-à-d $\\bar{P}$ vraie) et on déduit par étapes logiques une contradiction mathématique flagrante.",
    options: [
      {
        text: "Supposer $P$ vraie et arriver à une contradiction",
        isCorrect: false,
      },
      {
        text: "Supposer $\\bar{P}$ vraie et arriver à une contradiction",
        isCorrect: true,
      },
      { text: "Montrer que $\\bar{P}$ est fausse", isCorrect: false },
      { text: "Utiliser un contre-exemple", isCorrect: false },
    ],
  },
  {
    question:
      "Le principe de récurrence s'applique pour démontrer des propriétés définies sur :",
    topic: "Logique Mathématique",
    difficulty: "Facile",
    explanation:
      "La récurrence s'appuie sur la structure ordonnée et discrète de l'ensemble des entiers naturels $\\mathbb{N}$ (axiome de Peano).",
    options: [
      { text: "$\\mathbb{R}$", isCorrect: false },
      { text: "$\\mathbb{Q}$", isCorrect: false },
      {
        text: "$\\mathbb{N}$ (ou une partie de $\\mathbb{N}$)",
        isCorrect: true,
      },
      { text: "$\\mathbb{C}$", isCorrect: false },
    ],
  },
  {
    question:
      "Pour une démonstration par récurrence, quelles sont les deux étapes indispensables ?",
    topic: "Logique Mathématique",
    difficulty: "Facile",
    explanation:
      "Une démonstration par récurrence simple nécessite l'initialisation (vérifier la propriété au rang initial $n_0$) et l'hérédité (démontrer que $P(n) \\Rightarrow P(n+1)$ pour tout $n \\ge n_0$).",
    options: [
      { text: "L'initialisation et l'hérédité", isCorrect: true },
      { text: "L'initialisation et la conclusion", isCorrect: false },
      { text: "L'hérédité et la contraposée", isCorrect: false },
      { text: "La disjonction de cas et l'absurde", isCorrect: false },
    ],
  },
  {
    question:
      "La négation de la proposition $(\\forall \\alpha \\in \\mathbb{R}^*_+)(\\exists \\beta \\in \\mathbb{R}^*_+)(\\forall x \\in \\mathbb{R}) : (|x| \\le \\beta \\Rightarrow x^2 \\le \\alpha)$ est :",
    topic: "Logique Mathématique",
    difficulty: "Difficile",
    explanation:
      "La négation de $(\\forall \\alpha)(\\exists \\beta)(\\forall x)(H \\Rightarrow C)$ est $(\\exists \\alpha)(\\forall \\beta)(\\exists x)(H \\land \\overline{C})$, soit $|x| \\le \\beta$ et $x^2 > \\alpha$.",
    options: [
      {
        text: "$(\\exists \\alpha \\in \\mathbb{R}^*_+)(\\forall \\beta \\in \\mathbb{R}^*_+)(\\exists x \\in \\mathbb{R}) : (|x| \\le \\beta \\text{ et } x^2 > \\alpha)$",
        isCorrect: true,
      },
      {
        text: "$(\\exists \\alpha \\in \\mathbb{R}^*_+)(\\exists \\beta \\in \\mathbb{R}^*_+)(\\forall x \\in \\mathbb{R}) : (|x| > \\beta \\text{ et } x^2 \\le \\alpha)$",
        isCorrect: false,
      },
      {
        text: "$(\\forall \\alpha \\in \\mathbb{R}^*_+)(\\exists \\beta \\in \\mathbb{R}^*_+)(\\exists x \\in \\mathbb{R}) : (|x| \\le \\beta \\Rightarrow x^2 > \\alpha)$",
        isCorrect: false,
      },
      {
        text: "$(\\exists \\alpha \\in \\mathbb{R}^*_+)(\\forall \\beta \\in \\mathbb{R}^*_+)(\\forall x \\in \\mathbb{R}) : (|x| > \\beta \\lor x^2 > \\alpha)$",
        isCorrect: false,
      },
    ],
  },
  {
    question:
      "La proposition $(\\forall x \\in \\mathbb{R}) (|x| \\le \\beta \\Rightarrow x^2 \\le \\alpha)$ (avec $\\alpha, \\beta > 0$) est vraie si on choisit :",
    topic: "Logique Mathématique",
    difficulty: "Moyen",
    explanation:
      "Par croissance de la fonction carré sur $\\mathbb{R}_+$, $|x| \\le \\beta \\iff x^2 \\le \\beta^2$. Pour assurer $x^2 \\le \\alpha$, il suffit que $\\beta^2 \\le \\alpha$, soit $\\beta = \\sqrt{\\alpha}$ (ou toute valeur strictement positive inférieure).",
    options: [
      { text: "$\\beta = \\sqrt{\\alpha}$", isCorrect: true },
      { text: "$\\beta = \\alpha^2$", isCorrect: false },
      { text: "$\\beta = \\alpha$", isCorrect: false },
      { text: "$\\beta = \\sqrt{\\alpha} / 2$", isCorrect: false },
    ],
  },
  {
    question:
      "Pour montrer que $\\sqrt{2} + \\sqrt{3} \\notin \\mathbb{Q}$, on utilise généralement :",
    topic: "Logique Mathématique",
    difficulty: "Moyen",
    explanation:
      "On suppose par l'absurde que $r = \\sqrt{2} + \\sqrt{3} \\in \\mathbb{Q}$, on isole $\\sqrt{3} = r - \\sqrt{2}$, puis on élève au carré pour aboutir au fait que $\\sqrt{2} \\in \\mathbb{Q}$, ce qui est une contradiction.",
    options: [
      { text: "Le raisonnement par récurrence", isCorrect: false },
      { text: "Le raisonnement par disjonction de cas", isCorrect: false },
      { text: "Le raisonnement par l'absurde", isCorrect: true },
      { text: "La contraposée", isCorrect: false },
    ],
  },
  {
    question:
      "La négation de $Q : [(\\forall \\alpha \\in \\mathbb{R}^*) a < b + \\alpha] \\Rightarrow (a \\le b)$ est :",
    topic: "Logique Mathématique",
    difficulty: "Difficile",
    explanation:
      "L'assertion a la forme $H \\Rightarrow C$. Sa négation est $H \\land \\bar{C}$, ce qui donne $[(\\forall \\alpha \\in \\mathbb{R}^*) a < b + \\alpha] \\text{ et } (a > b)$.",
    options: [
      {
        text: "$[(\\exists \\alpha \\in \\mathbb{R}^*) a \\ge b + \\alpha] \\text{ et } (a > b)$",
        isCorrect: false,
      },
      {
        text: "$[(\\forall \\alpha \\in \\mathbb{R}^*) a < b + \\alpha] \\text{ et } (a > b)$",
        isCorrect: true,
      },
      {
        text: "$[(\\exists \\alpha \\in \\mathbb{R}^*) a < b + \\alpha] \\text{ ou } (a \\le b)$",
        isCorrect: false,
      },
      {
        text: "$[(\\forall \\alpha \\in \\mathbb{R}^*) a < b + \\alpha] \\Rightarrow (a > b)$",
        isCorrect: false,
      },
    ],
  },
  {
    question:
      "La contraposée de la proposition $Q : [(\\forall \\alpha \\in \\mathbb{R}^*) a < b + \\alpha] \\Rightarrow (a \\le b)$ est :",
    topic: "Logique Mathématique",
    difficulty: "Difficile",
    explanation:
      "Pour $H \\Rightarrow C$, la contraposée est $\\bar{C} \\Rightarrow \\bar{H}$. Ici, $\\bar{C}$ est $(a > b)$ et $\\bar{H}$ est $[(\\exists \\alpha \\in \\mathbb{R}^*) a \\ge b + \\alpha]$.",
    options: [
      {
        text: "$(a > b) \\Rightarrow [(\\exists \\alpha \\in \\mathbb{R}^*) a \\ge b + \\alpha]$",
        isCorrect: true,
      },
      {
        text: "$(a > b) \\Rightarrow [(\\exists \\alpha \\in \\mathbb{R}^*) a < b + \\alpha]$",
        isCorrect: false,
      },
      {
        text: "$(a \\le b) \\Rightarrow [(\\forall \\alpha \\in \\mathbb{R}^*) a \\ge b + \\alpha]$",
        isCorrect: false,
      },
      {
        text: "$(a \\ge b) \\Rightarrow [(\\forall \\alpha \\in \\mathbb{R}^*) a < b + \\alpha]$",
        isCorrect: false,
      },
    ],
  },
  {
    question:
      "Dans la démonstration de $(\\forall n \\in \\mathbb{N}) 1 + 3 + \\dots + (2n + 1) = (n + 1)^2$, l'initialisation pour $n=0$ donne :",
    topic: "Logique Mathématique",
    difficulty: "Moyen",
    explanation:
      "Pour $n = 0$, le membre de gauche se réduit au premier terme $(2(0)+1) = 1$, et le membre de droite est $(0+1)^2 = 1^2 = 1$. L'égalité $1 = 1^2$ est donc vérifiée.",
    options: [
      { text: "$1 = 1^2$ (Vrai)", isCorrect: true },
      { text: "$1 + 3 = 2^2$ (Vrai)", isCorrect: false },
      { text: "$0 = 0$ (Vrai)", isCorrect: false },
      { text: "$1 + 3 + 5 = 3^2$ (Vrai)", isCorrect: false },
    ],
  },
  {
    question: "Une loi logique (tautologie) est une proposition qui est :",
    topic: "Logique Mathématique",
    difficulty: "Facile",
    explanation:
      "Une tautologie est une formule propositionnelle toujours vraie, quelle que soit la valeur de vérité attribuée à chacune de ses variables propositionnelles.",
    options: [
      { text: "Toujours fausse", isCorrect: false },
      { text: "Parfois vraie, parfois fausse", isCorrect: false },
      {
        text: "Toujours vraie, quelles que soient les valeurs de vérité de ses composants",
        isCorrect: true,
      },
      {
        text: "Vraie uniquement pour des propositions mathématiques",
        isCorrect: false,
      },
    ],
  },
  {
    question:
      "La proposition « Si $x$ est un réel, alors $x^2 \\ge 0$ » est une :",
    topic: "Logique Mathématique",
    difficulty: "Facile",
    explanation:
      "Il s'agit d'une assertion universelle formulée sous forme conditionnelle, vérifiée pour tout élément de l'ensemble $\\mathbb{R}$ : $(\\forall x \\in \\mathbb{R}) : x^2 \\ge 0$.",
    options: [
      { text: "Proposition universelle", isCorrect: true },
      { text: "Proposition existentielle", isCorrect: false },
      { text: "Fonction propositionnelle", isCorrect: false },
      { text: "Tautologie", isCorrect: false },
    ],
  },
  {
    question: "La loi de Morgan pour les propositions s'énonce :",
    topic: "Logique Mathématique",
    difficulty: "Facile",
    explanation:
      "Les lois de De Morgan s'appliquent dualement à la conjonction et à la disjonction : $\\overline{P \\land Q} \\Leftrightarrow \\bar{P} \\lor \\bar{Q}$ et $\\overline{P \\lor Q} \\Leftrightarrow \\bar{P} \\land \\bar{Q}$.",
    options: [
      {
        text: "$\\overline{P \\land Q} \\Leftrightarrow \\bar{P} \\lor \\bar{Q}$",
        isCorrect: false,
      },
      {
        text: "$\\overline{P \\lor Q} \\Leftrightarrow \\bar{P} \\land \\bar{Q}$",
        isCorrect: false,
      },
      { text: "Les deux réponses a et b sont correctes", isCorrect: true },
      { text: "Aucune des réponses ci-dessus", isCorrect: false },
    ],
  },
  {
    question:
      "Si $P \\Rightarrow Q$ et $Q \\Rightarrow R$ sont vraies, alors on peut déduire que :",
    topic: "Logique Mathématique",
    difficulty: "Facile",
    explanation:
      "Il s'agit de la propriété de transitivité de l'implication (syllogisme hypothétique) : $(P \\Rightarrow Q) \\land (Q \\Rightarrow R) \\Rightarrow (P \\Rightarrow R)$.",
    options: [
      { text: "$R \\Rightarrow P$", isCorrect: false },
      { text: "$P \\Rightarrow R$", isCorrect: true },
      { text: "$\\bar{P} \\Rightarrow \\bar{R}$", isCorrect: false },
      { text: "$R \\land P$", isCorrect: false },
    ],
  },
  {
    question:
      "Dans un raisonnement par disjonction de cas, on divise l'ensemble d'étude en :",
    topic: "Logique Mathématique",
    difficulty: "Facile",
    explanation:
      "Pour être rigoureuse, une disjonction de cas doit nécessairement recouvrir l'intégralité du domaine ou des situations possibles (la réunion des cas doit être l'ensemble total).",
    options: [
      { text: "Deux sous-ensembles disjoints", isCorrect: false },
      { text: "Une infinité de cas", isCorrect: false },
      { text: "Des cas couvrant toutes les possibilités", isCorrect: true },
      { text: "Des cas qui se chevauchent obligatoirement", isCorrect: false },
    ],
  },
];

async function main() {
  console.log("Démarrage de la création de l'examen de Logique...");

  // 1. Créer ou mettre à jour l'Examen
  const exam = await prisma.qcmExam.upsert({
    where: { slug: "notions-de-logique-1bac" },
    update: {
      title: "Notions de Logique Mathématique",
      description:
        "Évaluation complète sur les connecteurs logiques, la négation, les quantificateurs et les types de raisonnement (récurrence, absurde, contraposée, disjonction).",
      timeLimitMinutes: 45,
      published: true,
    },
    create: {
      slug: "notions-de-logique-1bac",
      title: "Notions de Logique Mathématique",
      description:
        "Évaluation complète sur les connecteurs logiques, la négation, les quantificateurs et les types de raisonnement (récurrence, absurde, contraposée, disjonction).",
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
    `Succès : 30 questions insérées et associées à l'examen "${exam.title}".`,
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
