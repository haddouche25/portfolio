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
        ? "Curriculum Vitae | Portfolio"
        : "Curriculum Vitae | Profile",
    description:
      locale === "fr"
        ? "Parcours académique, enseignement des mathématiques et compétences en développement logiciel."
        : "Academic background, mathematics teaching career, and software engineering proficiencies.",
  };
}

export default async function ResumePage({ searchParams }: BasePageProps) {
  const { lang } = await searchParams;
  const locale = resolveLocale(lang);
  const isFr = locale === "fr";
  const langSuffix = isFr ? "?lang=fr" : "";

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-20 space-y-16">
      {/* En-tête profil */}
      <header className="border-b border-slate-200 dark:border-slate-800 pb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-900 dark:text-white">
            Mohamed Haddouche
          </h1>
          <p className="mt-2 text-base text-blue-600 dark:text-blue-400 font-medium">
            {isFr
              ? "Enseignant de Mathématiques & Développeur Web Full-Stack"
              : "Secondary Mathematics Educator & Full-Stack Engineer"}
          </p>
          <p className="text-xs font-mono text-slate-500 mt-1">
            Azrou / Ifrane, Maroc · C1 Français · B2 Anglais
          </p>
        </div>

        <div>
          <Link
            href={`/contact${langSuffix}`}
            className="inline-flex rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
          >
            {isFr ? "Prendre Contact" : "Get in Touch"}
          </Link>
        </div>
      </header>

      {/* Compétences techniques & Pédagogiques */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white uppercase font-mono text-sm text-blue-600 dark:text-blue-400">
          {isFr ? "Compétences & Technologies" : "Skills & Stack"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-5">
            <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-2">
              {isFr ? "Ingénierie Web & Data" : "Software Engineering"}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-mono">
              Next.js 15+, React, TypeScript, Node.js, Python, Tailwind CSS,
              Prisma ORM, MySQL/MariaDB, Docker, API REST.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-5">
            <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-2">
              {isFr ? "Didactique & IA Appliquée" : "Mathematics & AI"}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-mono">
              LaTeX (typographie mathématique avancée), modèles LLM locaux
              (Ollama / Llama 3), didactique des mathématiques, remédiation
              scolaire.
            </p>
          </div>
        </div>
      </section>

      {/* Expérience Professionnelle */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white uppercase font-mono text-sm text-blue-600 dark:text-blue-400">
          {isFr ? "Expérience Professionnelle" : "Experience"}
        </h2>

        <div className="space-y-6 border-l-2 border-slate-200 dark:border-slate-800 pl-6 ml-2">
          {/* Poste 1 */}
          <div className="relative space-y-1">
            <span className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full bg-blue-500" />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {isFr
                  ? "Professeur de Mathématiques"
                  : "Secondary Mathematics Teacher"}
              </h3>
              <span className="text-xs font-mono text-slate-500">
                2018 — Présent
              </span>
            </div>
            <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
              Ministère de l&apos;Éducation Nationale · Maroc
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300 pt-1 leading-relaxed">
              {isFr
                ? "Enseignement du programme officiel de mathématiques, conception de séries d'exercices et d'évaluations rigoureuses types concours en LaTeX, remédiation individualisée."
                : "Curriculum instruction for secondary math students, rigorous LaTeX-based examination authoring, and pedagogical analytics."}
            </p>
          </div>

          {/* Poste 2 */}
          <div className="relative space-y-1">
            <span className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full bg-slate-600" />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {isFr
                  ? "Fondateur & Concepteur Pédagogique"
                  : "Founder & EdTech Lead"}
              </h3>
              <span className="text-xs font-mono text-slate-500">
                2022 — 2026
              </span>
            </div>
            <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
              Centre de soutien Alpha Atlas
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300 pt-1 leading-relaxed">
              {isFr
                ? "Direction pédagogique, structuration de programmes d'accompagnement intensif pour collégiens et lycéens, et expérimentation de logiciels d'apprentissage assisté."
                : "Pedagogical management, study roadmap planning for baccalaureate students, and pilot testing of custom instructional software."}
            </p>
          </div>
        </div>
      </section>

      {/* Diplômes et Formations */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white uppercase font-mono text-sm text-blue-600 dark:text-blue-400">
          {isFr ? "Formation & Diplômes" : "Education & Credentials"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-5 space-y-1">
            <span className="text-xs font-mono text-slate-500">2017</span>
            <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
              {isFr
                ? "Qualification Pédagogique en Mathématiques"
                : "Teaching Qualification (Mathematics)"}
            </h3>
            <p className="text-xs text-slate-500">CRMEF Fès-Meknès</p>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-5 space-y-1">
            <span className="text-xs font-mono text-slate-500">Licence</span>
            <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
              {isFr
                ? "Mathématiques et Informatique"
                : "Mathematics & Computer Science"}
            </h3>
            <p className="text-xs text-slate-500">Faculté des Sciences</p>
          </div>
        </div>
      </section>
    </div>
  );
}
