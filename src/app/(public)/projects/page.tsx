import type { Metadata } from "next";
import Link from "next/link";
import { type BasePageProps, resolveLocale } from "@/types/content";

export async function generateMetadata({
  searchParams,
}: BasePageProps): Promise<Metadata> {
  const { lang } = await searchParams;
  const locale = resolveLocale(lang);

  return {
    title:
      locale === "fr"
        ? "Projets & Algorithmes | Portfolio"
        : "Projects & Algorithms | Portfolio",
    description:
      locale === "fr"
        ? "Applications logicielles, plateformes éducatives et implémentations algorithmiques."
        : "Software applications, educational platforms, and algorithmic implementations.",
  };
}

interface ProjectItem {
  id: string;
  titleEn: string;
  titleFr: string;
  category: "Web App" | "AI / EdTech" | "Algorithms & Math";
  descEn: string;
  descFr: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

const PROJECTS: ProjectItem[] = [
  {
    id: "mathguidia",
    titleEn: "MathGuidia - Gamified Math Platform",
    titleFr: "MathGuidia - Plateforme Mathématique Gamifiée",
    category: "AI / EdTech",
    descEn:
      "Gamified educational web platform for secondary school mathematics in Morocco featuring dynamic problem generation and interactive mastery ladders.",
    descFr:
      "Plateforme web éducative gamifiée pour les mathématiques au secondaire au Maroc, intégrant la génération dynamique d'exercices et des parcours de remédiation.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "Ollama / LLM"],
    demoUrl: "https://mathguidia.com",
    featured: true,
  },
  {
    id: "latex-parser",
    titleEn: "Mathematical Notation Engine",
    titleFr: "Moteur de Rendu Notations & Formules",
    category: "Algorithms & Math",
    descEn:
      "High-performance client-server pipeline for rendering KaTeX equations, syntax-highlighted codeblocks, and interactive geometry primitives.",
    descFr:
      "Pipeline optimisé client-serveur pour l'affichage de formules KaTeX, coloration syntaxique et primitives géométriques interactives.",
    tags: ["KaTeX", "AST", "TypeScript", "Markdown"],
    githubUrl: "https://github.com",
    featured: true,
  },
  {
    id: "guide212",
    titleEn: "Guide212 - Digital City Explorer",
    titleFr: "Guide212 - Guide Urbain Numérique",
    category: "Web App",
    descEn:
      "Modern local directory and interactive guide providing discovery tools and dynamic mapping for urban points of interest.",
    descFr:
      "Annuaire local moderne et guide interactif offrant des outils de découverte et une cartographie dynamique des points d'intérêt urbains.",
    tags: ["React", "Node.js", "MySQL", "Tailwind CSS"],
    demoUrl: "https://guide212.com",
    featured: false,
  },
];

export default async function ProjectsPage({ searchParams }: BasePageProps) {
  const { lang } = await searchParams;
  const locale = resolveLocale(lang);
  const isFr = locale === "fr";
  const langSuffix = isFr ? "?lang=fr" : "";

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20 space-y-16">
      {/* En-tête */}
      <header className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-mono font-medium text-blue-400">
          <span>&lt;/&gt;</span>
          <span>{isFr ? "Réalisations & Systèmes" : "Works & Systems"}</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl text-slate-900 dark:text-white">
          {isFr
            ? "Applications, Projets & Algorithmes"
            : "Applications, Projects & Algorithms"}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          {isFr
            ? "Sélection de projets techniques développés : applications full-stack, intégrations d'intelligence artificielle locale et outils pédagogiques pour les sciences."
            : "A curated collection of technical systems: full-stack applications, local LLM integrations, and educational technology tools."}
        </p>
      </header>

      {/* Grille des réalisations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((project) => {
          const title = isFr ? project.titleFr : project.titleEn;
          const desc = isFr ? project.descFr : project.descEn;

          return (
            <div
              key={project.id}
              className={`flex flex-col justify-between rounded-xl border p-6 transition-all hover:-translate-y-1 ${
                project.featured
                  ? "border-blue-500/40 bg-blue-950/10 dark:bg-slate-900/60"
                  : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/40"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-blue-500 dark:text-blue-400">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="rounded bg-blue-500/20 px-2 py-0.5 text-[10px] text-blue-400">
                      {isFr ? "À la une" : "Featured"}
                    </span>
                  )}
                </div>

                <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {title}
                </h2>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {desc}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 px-2 py-0.5 text-[11px] font-mono text-slate-600 dark:text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 text-xs font-semibold">
                {project.demoUrl && (
                  <Link
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {isFr ? "Accéder à l'application" : "Live Demo"} &rarr;
                  </Link>
                )}
                {project.githubUrl && (
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    Code Source
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
