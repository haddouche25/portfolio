import Link from "next/link";
import { prisma } from "@/lib/db";
import { SchoolLevel } from "@prisma/client";

export const dynamic = "force-dynamic";

// On utilise les vraies clés de l'enum SchoolLevel de Prisma
const LEVELS: { key: SchoolLevel | "ALL"; label: string }[] = [
  { key: "ALL", label: "Tous les niveaux" },
  { key: SchoolLevel.TRONC_COMMUN, label: "Tronc commun" },
  { key: SchoolLevel.BAC1_SM, label: "1bac SM" },
  { key: SchoolLevel.BAC1_S, label: "1bac S" },
  { key: SchoolLevel.BAC2_SM, label: "2bac SM" },
  { key: SchoolLevel.BAC2_S, label: "2bac S" },
  { key: SchoolLevel.COLLEGE_3AC, label: "3AC" },
];

const LEVEL_LABELS: Record<SchoolLevel, string> = {
  COLLEGE_3AC: "3AC",
  TRONC_COMMUN: "Tronc commun",
  BAC1_SM: "1bac SM",
  BAC1_S: "1bac S",
  BAC2_SM: "2bac SM",
  BAC2_S: "2bac S",
};

interface Props {
  searchParams: Promise<{ level?: string }>;
}

export default async function StudentQcmCatalogPage({ searchParams }: Props) {
  const { level } = await searchParams;

  // Validation stricte : on vérifie que la valeur reçue existe bien dans l'enum Prisma SchoolLevel
  const selectedLevel =
    level && Object.values(SchoolLevel).includes(level as SchoolLevel)
      ? (level as SchoolLevel)
      : undefined;

  const exams = await prisma.qcmExam.findMany({
    where: {
      published: true,
      ...(selectedLevel ? { level: selectedLevel } : {}),
    },
    include: {
      _count: {
        select: { questions: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f1115] text-slate-900 dark:text-slate-100 py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-200 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* ========================================================= */}
        {/* 1. EN-TÊTE : TITRE, HIGHLIGHT & HISTORIQUE                */}
        {/* ========================================================= */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-block px-3.5 py-1 rounded-full bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/60 text-[#f25c27] font-bold text-xs uppercase tracking-wider">
            Plateforme Didactique &amp; Tests Diagnostiques
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            Évaluations &amp; Tests <span className="np-highlight">QCM</span>
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Sélectionnez votre niveau scolaire pour accéder aux questionnaires
            didactiques d&apos;entraînement, bilans d&apos;acquis et épreuves
            chronométrées avec correction détaillée.
          </p>

          <div className="pt-2 flex justify-center">
            <Link
              href="/qcm/historique"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-white dark:bg-[#1a1b1e] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-[#f25c27] hover:text-[#f25c27] dark:hover:border-[#f25c27] dark:hover:text-[#f25c27] transition-all np-card-shadow group"
            >
              <svg
                className="w-4 h-4 text-[#f25c27] group-hover:scale-110 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <span>Mon historique &amp; sessions en cours</span>
              <span className="text-slate-400 group-hover:text-[#f25c27] transition-colors">
                &rarr;
              </span>
            </Link>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. FILTRES DE NIVEAU (Enum Prisma dans l'URL)             */}
        {/* ========================================================= */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {LEVELS.map((lvl) => {
            const isActive =
              lvl.key === "ALL" ? !selectedLevel : selectedLevel === lvl.key;
            const href = lvl.key === "ALL" ? "/qcm" : `/qcm?level=${lvl.key}`;

            return (
              <Link
                key={lvl.key}
                href={href}
                className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-150 ${
                  isActive
                    ? "bg-[#f25c27] text-white shadow-md shadow-orange-500/20"
                    : "bg-white dark:bg-[#1a1b1e] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-[#f25c27] hover:text-[#f25c27] np-card-shadow"
                }`}
              >
                {lvl.label}
              </Link>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* 3. GRILLE DES EXAMENS                                     */}
        {/* ========================================================= */}
        {exams.length === 0 ? (
          <div className="p-16 text-center bg-white dark:bg-[#1a1b1e] border border-slate-200 dark:border-slate-800 rounded-3xl np-card-shadow text-slate-500 dark:text-slate-400">
            <span className="text-4xl block mb-3">🔍</span>
            <p className="font-bold text-sm">
              Aucun examen disponible pour ce niveau pour le moment.
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Revenez bientôt ou sélectionnez un autre niveau dans la liste.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exams.map((exam) => (
              <div
                key={exam.id}
                className="bg-white dark:bg-[#1a1b1e] border border-slate-200 dark:border-slate-800 rounded-2xl p-7 flex flex-col justify-between hover:-translate-y-1 transition-all duration-200 np-card-shadow group"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800/60 text-[#f25c27]">
                      {LEVEL_LABELS[exam.level as SchoolLevel] || exam.level}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono font-medium flex items-center gap-1">
                      ⏱{" "}
                      {exam.timeLimitMinutes
                        ? `${exam.timeLimitMinutes} min`
                        : "Libre"}
                    </span>
                  </div>

                  <h2 className="text-lg font-black text-slate-900 dark:text-white leading-snug group-hover:text-[#f25c27] transition-colors">
                    {exam.title}
                  </h2>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {exam.description ||
                      "Évaluation didactique ciblée avec corrections et démonstrations pas à pas."}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    <strong className="text-slate-900 dark:text-slate-100 font-black">
                      {exam._count.questions}
                    </strong>{" "}
                    questions
                  </span>

                  <Link
                    href={`/qcm/${exam.slug}`}
                    className="px-5 py-2.5 bg-[#f25c27] hover:bg-[#d94f1e] text-white text-xs font-black uppercase tracking-wider rounded-xl transition shadow-md shadow-orange-500/15"
                  >
                    Démarrer le test &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
