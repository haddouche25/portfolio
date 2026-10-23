import Link from "next/link";
import { prisma } from "@/lib/db";
import { SchoolLevel } from "@prisma/client";

export const dynamic = "force-dynamic";

const LEVELS: { key: SchoolLevel | "ALL"; label: string }[] = [
  { key: "ALL", label: "Tous les niveaux" },
  { key: SchoolLevel.COLLEGE_3AC, label: "3AC" },
  { key: SchoolLevel.TRONC_COMMUN, label: "Tronc commun" },
  { key: SchoolLevel.BAC1_SM, label: "1bac SM" },
  { key: SchoolLevel.BAC1_S, label: "1bac S" },
  { key: SchoolLevel.BAC2_SM, label: "2bac SM" },
  { key: SchoolLevel.BAC2_S, label: "2bac S" },
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

  const selectedLevel =
    level && level in SchoolLevel ? (level as SchoolLevel) : undefined;

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
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Titre, Description & Bouton Historique */}
        <div className="text-center space-y-4">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">
            Plateforme d&apos;Évaluation Interactive
          </span>

          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Évaluations & Tests QCM
          </h1>

          <p className="max-w-2xl mx-auto text-slate-400 text-sm sm:text-base">
            Sélectionnez votre niveau scolaire pour accéder aux questionnaires
            d&apos;entraînement, diagnostics et épreuves chronométrées.
          </p>

          {/* Bouton vers l'historique candidat */}
          <div className="pt-2 flex justify-center">
            <Link
              href="/qcm/historique"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 hover:bg-slate-900/80 transition-all shadow-sm group"
            >
              <svg
                className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.75"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <span>Mon historique & sessions en cours</span>
              <span className="text-slate-500 group-hover:text-blue-400 transition-colors">
                &rarr;
              </span>
            </Link>
          </div>
        </div>

        {/* Sélecteur de niveau */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {LEVELS.map((lvl) => {
            const isActive =
              lvl.key === "ALL" ? !selectedLevel : selectedLevel === lvl.key;
            const href = lvl.key === "ALL" ? "/qcm" : `/qcm?level=${lvl.key}`;

            return (
              <Link
                key={lvl.key}
                href={href}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                    : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                }`}
              >
                {lvl.label}
              </Link>
            );
          })}
        </div>

        {/* Grille des examens */}
        {exams.length === 0 ? (
          <div className="p-12 text-center bg-slate-900/60 border border-slate-800 rounded-3xl text-slate-400">
            Aucun examen disponible pour ce niveau pour le moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exams.map((exam) => (
              <div
                key={exam.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-blue-950 border border-blue-800 text-blue-300">
                      {LEVEL_LABELS[exam.level]}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      ⏱{" "}
                      {exam.timeLimitMinutes
                        ? `${exam.timeLimitMinutes} min`
                        : "Libre"}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-white leading-snug">
                    {exam.title}
                  </h2>

                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                    {exam.description ||
                      "Évaluation didactique avec correction détaillée."}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    <strong className="text-slate-200">
                      {exam._count.questions}
                    </strong>{" "}
                    questions
                  </span>

                  <Link
                    href={`/qcm/${exam.slug}`}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition shadow-sm"
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
