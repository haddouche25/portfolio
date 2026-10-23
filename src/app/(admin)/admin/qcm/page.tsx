import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminQcmResultsPage() {
  const attempts = await prisma.qcmAttempt.findMany({
    include: {
      student: true,
      exam: true,
      answers: true,
    },
    orderBy: {
      startedAt: "desc",
    },
  });

  return (
    <div className="p-8 max-w-7xl mx-auto text-slate-100">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Résultats des Évaluations QCM
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Suivi en temps réel des élèves et de leurs performances.
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-950/60 border-b border-slate-800 text-slate-400 uppercase text-xs">
            <tr>
              <th className="py-4 px-6">Élève</th>
              <th className="py-4 px-6">Email</th>
              <th className="py-4 px-6">Examen</th>
              <th className="py-4 px-6">Statut</th>
              <th className="py-4 px-6">Score</th>
              <th className="py-4 px-6">Pourcentage</th>
              <th className="py-4 px-6">Date de passage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {attempts.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-500">
                  Aucune tentative enregistrée.
                </td>
              </tr>
            ) : (
              attempts.map((attempt) => {
                // Terminé uniquement si completedAt a été validé à la fin de l'épreuve
                const isCompleted = Boolean(attempt.completedAt);

                // Calcul dynamique du score en temps réel si l'épreuve est encore en cours
                const currentScore = isCompleted
                  ? attempt.score
                  : attempt.answers.filter((a) => a.isCorrect).length;

                const currentPercentage =
                  attempt.totalQuestions > 0
                    ? Math.round((currentScore / attempt.totalQuestions) * 100)
                    : 0;

                return (
                  <tr
                    key={attempt.id}
                    className="hover:bg-slate-800/30 transition"
                  >
                    <td className="py-4 px-6 font-medium text-white">
                      {attempt.student.fullName}
                    </td>
                    <td className="py-4 px-6 text-slate-400">
                      {attempt.student.email}
                    </td>
                    <td className="py-4 px-6 text-slate-200 font-medium">
                      {attempt.exam?.title ?? "Examen inconnu"}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                          isCompleted
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isCompleted ? "bg-emerald-400" : "bg-amber-400"
                          }`}
                        />
                        {isCompleted ? "Terminé" : "En cours"}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-semibold text-blue-400">
                      {currentScore} / {attempt.totalQuestions}
                      {!isCompleted && (
                        <span className="text-xs text-slate-500 font-normal ml-1.5">
                          ({attempt.answers.length} rép.)
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          currentPercentage >= 75
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : currentPercentage >= 50
                              ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                              : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                        }`}
                      >
                        {currentPercentage}%
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-400 text-xs">
                      {new Date(attempt.startedAt).toLocaleString("fr-FR")}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
