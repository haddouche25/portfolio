import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminExamsPage() {
  const exams = await prisma.qcmExam.findMany({
    include: {
      _count: {
        select: {
          questions: true,
          attempts: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8 max-w-6xl mx-auto text-slate-100">
      {/* En-tête de la page */}
      <div className="mb-8 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Gestion des Examens
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Consultez les évaluations créées, modifiez leur structure et
            visualisez leurs questions ordonnées.
          </p>
        </div>

        <Link
          href="/admin/qcm/exams/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-sm transition shadow-lg shadow-blue-600/20 w-fit"
        >
          <span>+</span>
          <span>Créer un Examen</span>
        </Link>
      </div>

      {/* Liste des cartes d'examen */}
      {exams.length === 0 ? (
        <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-2xl text-slate-500 text-sm">
          Aucun examen n&apos;a été trouvé. Exécutez le script de seed ou
          créez-en un nouveau.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {exams.map((exam) => (
            <Link
              key={exam.id}
              href={`/admin/qcm/exams/${exam.id}`}
              className="group block p-6 bg-slate-900 border border-slate-800 rounded-2xl hover:border-blue-500/50 hover:bg-slate-900/80 transition shadow-sm relative overflow-hidden"
            >
              {/* Statuts & Durée */}
              <div className="flex justify-between items-center mb-3">
                <span
                  className={`text-[11px] font-mono uppercase font-semibold px-2.5 py-0.5 rounded-full border ${
                    exam.published
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                      : "bg-amber-500/10 border-amber-500/30 text-amber-400"
                  }`}
                >
                  {exam.published ? "Publié" : "Brouillon"}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  ⏱{" "}
                  {exam.timeLimitMinutes
                    ? `${exam.timeLimitMinutes} min`
                    : "Non chronométré"}
                </span>
              </div>

              {/* Titre & Description */}
              <h2 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                {exam.title}
              </h2>
              <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                {exam.description || "Aucune description fournie."}
              </p>

              {/* Pied de carte avec statistiques */}
              <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-4">
                  <span className="font-medium text-slate-300">
                    <strong className="text-blue-400 font-bold">
                      {exam._count.questions}
                    </strong>{" "}
                    questions
                  </span>
                  <span>•</span>
                  <span>
                    <strong className="text-slate-300">
                      {exam._count.attempts}
                    </strong>{" "}
                    passage
                    {exam._count.attempts > 1 ? "s" : ""}
                  </span>
                </div>

                <span className="text-blue-400 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Voir les questions &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
