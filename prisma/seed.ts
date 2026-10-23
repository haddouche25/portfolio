import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Starting database seed (Pillars, Articles & QCM)...");

  // 1. Clean existing records in correct relation order
  await prisma.qcmAnswer.deleteMany({});
  await prisma.qcmAttempt.deleteMany({});
  await prisma.student.deleteMany({});
  await prisma.qcmOption.deleteMany({});
  await prisma.qcmQuestion.deleteMany({});

  await prisma.article.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.pillar.deleteMany({});

  // 2. Pillar: Mathematics
  await prisma.pillar.create({
    data: {
      slug: "maths",
      titleEn: "Mathematics",
      titleFr: "Mathématiques",
      descriptionEn:
        "From Moroccan high school curriculum to advanced mathematical foundations of AI.",
      descriptionFr:
        "Du curriculum secondaire qualifiant aux fondements mathématiques de l'IA.",
      categories: {
        create: [
          {
            slug: "high-school",
            titleEn: "High School Curriculum",
            titleFr: "Enseignement Secondaire",
            descriptionEn:
              "National exams preparation, geometry, analysis, and problem series.",
            descriptionFr:
              "Préparation aux examens nationaux, géométrie, analyse et séries d'exercices.",
          },
          {
            slug: "didactics",
            titleEn: "Didactics & Pedagogy",
            titleFr: "Didactique & Pédagogie",
            descriptionEn:
              "Pedagogical engineering, didactic transposition, and cognitive remediation strategies.",
            descriptionFr:
              "Ingénierie didactique, transposition didactique et stratégies de remédiation cognitive.",
          },
          {
            slug: "math-for-ai",
            titleEn: "Math for AI",
            titleFr: "Mathématiques pour l'IA",
            descriptionEn:
              "Linear algebra, multivariable calculus, probability, and optimization theory.",
            descriptionFr:
              "Algèbre linéaire, calcul différentiel à plusieurs variables, probabilités et optimisation.",
          },
        ],
      },
    },
  });

  // 3. Pillar: Coding
  await prisma.pillar.create({
    data: {
      slug: "coding",
      titleEn: "Coding",
      titleFr: "Développement & Code",
      descriptionEn:
        "Algorithms, robust software architecture, and systems engineering.",
      descriptionFr:
        "Algorithmique, architectures logicielles robustes et ingénierie des systèmes.",
      categories: {
        create: [
          {
            slug: "dsa",
            titleEn: "Data Structures & Algorithms",
            titleFr: "Structures de Données & Algorithmes",
            descriptionEn:
              "Trees, graphs, dynamic programming, and asymptotic complexity analysis.",
            descriptionFr:
              "Arbres, graphes, programmation dynamique et analyse de complexité asymptotique.",
          },
          {
            slug: "python",
            titleEn: "Python Engineering",
            titleFr: "Ingénierie Python",
            descriptionEn:
              "Asyncio, automation tooling, data processing, and backend microservices.",
            descriptionFr:
              "Asyncio, scripts d'automatisation, traitement de données et architectures backend.",
          },
          {
            slug: "optimization",
            titleEn: "Code Optimization",
            titleFr: "Optimisation de Code",
            descriptionEn:
              "Memory profiling, execution benchmarks, and high-performance refactoring.",
            descriptionFr:
              "Profilage mémoire, benchmarks de performance et refactorisation haute efficacité.",
          },
        ],
      },
    },
  });

  // 4. Pillar: Computing
  await prisma.pillar.create({
    data: {
      slug: "computing",
      titleEn: "Computing",
      titleFr: "Systèmes & Technologies",
      descriptionEn:
        "Applied artificial intelligence, modern database pipelines, and system security.",
      descriptionFr:
        "Intelligence artificielle appliquée, pipelines de données et sécurité informatique.",
      categories: {
        create: [
          {
            slug: "ai",
            titleEn: "Artificial Intelligence",
            titleFr: "Intelligence Artificielle",
            descriptionEn:
              "Local LLM deployments (Ollama), autonomous agents, and RAG architectures.",
            descriptionFr:
              "Déploiements LLM locaux (Ollama), agents autonomes et architectures RAG.",
          },
          {
            slug: "data",
            titleEn: "Data & Architecture",
            titleFr: "Données & Architecture",
            descriptionEn:
              "Relational database modeling, query tuning, and distributed storage.",
            descriptionFr:
              "Modélisation relationnelle, optimisation des requêtes et stockage distribué.",
          },
          {
            slug: "cybersecurity",
            titleEn: "Cybersecurity",
            titleFr: "Cybersécurité",
            descriptionEn:
              "Network defense protocols, cryptographic implementations, and secure authentication.",
            descriptionFr:
              "Protocoles de défense réseau, implémentations cryptographiques et authentification sécurisée.",
          },
        ],
      },
    },
  });

  // 5. Seed Starter Articles (Bilingual)
  const mathForAi = await prisma.category.findUnique({
    where: { slug: "math-for-ai" },
  });

  if (mathForAi) {
    await prisma.article.create({
      data: {
        slug: "gradient-descent-derivation",
        categoryId: mathForAi.id,
        youtubeUrl: "https://www.youtube.com/watch?v=IHZwWFHWa-w",
        titleEn: "Mathematical Foundations of Gradient Descent",
        titleFr: "Fondements Mathématiques de la Descente de Gradient",
        excerptEn:
          "Multivariable calculus derivation of the gradient descent optimization rule used in neural networks.",
        excerptFr:
          "Dérivation en calcul différentiel à plusieurs variables de la règle de descente de gradient.",
        contentEn: `
### Introduction

In machine learning, we optimize parameters $\\theta$ by iteratively minimizing an objective loss function $J(\\theta)$.

The gradient vector contains all first-order partial derivatives:

$$ \\nabla J(\\theta) = \\begin{bmatrix} \\frac{\\partial J}{\\partial \\theta_0} \\\\ \\frac{\\partial J}{\\partial \\theta_1} \\\\ \\vdots \\\\ \\frac{\\partial J}{\\partial \\theta_n} \\end{bmatrix} $$

### The Update Rule

Given a learning rate $\\eta > 0$, parameter adjustments follow the steepest descent direction:

$$ \\theta_{t+1} = \\theta_t - \\eta \\nabla J(\\theta_t) $$

\`\`\`python
def gradient_descent(x_start: float, lr: float, epochs: int) -> float:
    x = x_start
    for _ in range(epochs):
        grad = 2 * x  # derivative of f(x) = x^2
        x = x - lr * grad
    return x
\`\`\`
`,
        contentFr: `
### Introduction

En apprentissage automatique, nous optimisons les paramètres $\\theta$ en minimisant de manière itérative une fonction de perte $J(\\theta)$.

Le vecteur gradient regroupe l'ensemble des dérivées partielles du premier ordre :

$$ \\nabla J(\\theta) = \\begin{bmatrix} \\frac{\\partial J}{\\partial \\theta_0} \\\\ \\frac{\\partial J}{\\partial \\theta_1} \\\\ \\vdots \\\\ \\frac{\\partial J}{\\partial \\theta_n} \\end{bmatrix} $$

### Règle de Mise à Jour

Pour un taux d'apprentissage $\\eta > 0$, l'actualisation des paramètres suit la direction de plus grande pente descendante :

$$ \\theta_{t+1} = \\theta_t - \\eta \\nabla J(\\theta_t) $$

\`\`\`python
def descente_gradient(x_depart: float, lr: float, iterations: int) -> float:
    x = x_depart
    for _ in range(iterations):
        grad = 2 * x  # dérivée de f(x) = x^2
        x = x - lr * grad
    return x
\`\`\`
`,
      },
    });
  }

  // 6. Seed French QCM Questions (Maths & Coding with KaTeX)
  await prisma.qcmQuestion.create({
    data: {
      topic: "Mathématiques",
      difficulty: "Moyen",
      question:
        "Soit la fonction $f(x) = 3x^2 - 4x + 1$ définie sur $\\mathbb{R}$. Quelle est sa dérivée première $f'(x)$ ?",
      explanation:
        "Par dérivation d'un polynôme standard : $(x^n)' = n x^{n-1}$. Dès lors, $(3x^2)' = 6x$ et $(-4x)' = -4$. On obtient donc $f'(x) = 6x - 4$.",
      options: {
        create: [
          { text: "$f'(x) = 6x - 4$", isCorrect: true },
          { text: "$f'(x) = 3x - 4$", isCorrect: false },
          { text: "$f'(x) = 6x^2 - 4$", isCorrect: false },
          { text: "$f'(x) = 6x + 1$", isCorrect: false },
        ],
      },
    },
  });

  await prisma.qcmQuestion.create({
    data: {
      topic: "Mathématiques",
      difficulty: "Difficile",
      question:
        "Quelle est la valeur exacte de l'intégrale définie $\\int_{0}^{1} (4x^3 + 2x) \\, dx$ ?",
      explanation:
        "Une primitive de $4x^3 + 2x$ est $F(x) = x^4 + x^2$. En évaluant entre $0$ et $1$ : $F(1) - F(0) = (1^4 + 1^2) - 0 = 1 + 1 = 2$.",
      options: {
        create: [
          { text: "$2$", isCorrect: true },
          { text: "$1$", isCorrect: false },
          { text: "$4$", isCorrect: false },
          { text: "$\\frac{5}{2}$", isCorrect: false },
        ],
      },
    },
  });

  await prisma.qcmQuestion.create({
    data: {
      topic: "Programmation",
      difficulty: "Facile",
      question:
        "En JavaScript / TypeScript, que renvoie l'évaluation de l'expression `typeof NaN` ?",
      explanation:
        "En spécification ECMAScript, bien que `NaN` représente « Not-a-Number », sa valeur appartient au type primitif `number`.",
      options: {
        create: [
          { text: '`"number"`', isCorrect: true },
          { text: '`"nan"`', isCorrect: false },
          { text: '`"undefined"`', isCorrect: false },
          { text: '`"object"`', isCorrect: false },
        ],
      },
    },
  });

  await prisma.qcmQuestion.create({
    data: {
      topic: "Programmation",
      difficulty: "Moyen",
      question:
        "Quelle est la complexité temporelle asymptotique au pire des cas de la recherche d'un élément dans un tableau trié de taille $n$ par recherche dichotomique (Binary Search) ?",
      explanation:
        "La recherche dichotomique divise l'intervalle de recherche par deux à chaque étape, d'où une relation de récurrence $T(n) = T(n/2) + O(1)$, ce qui donne une complexité temporelle en $\\mathcal{O}(\\log n)$.",
      options: {
        create: [
          { text: "$\\mathcal{O}(\\log n)$", isCorrect: true },
          { text: "$\\mathcal{O}(n)$", isCorrect: false },
          { text: "$\\mathcal{O}(n \\log n)$", isCorrect: false },
          { text: "$\\mathcal{O}(1)$", isCorrect: false },
        ],
      },
    },
  });

  console.log(
    "Database seeded successfully with bilingual pillars, articles, and QCM questions.",
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
