import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import MathText from "@/components/qcm/MathText";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ examId: string }>;
}

export default async function AdminExamQuestionsDetailPage({
  params,
}: PageProps) {
  const { examId } = await params;

  const exam = await prisma.qcmExam.findUnique({
    where: { id: examId },
    include: {
      questions: {
        orderBy: { order: "asc" },
        include: {
          question: {
            include: {
              options: true,
            },
          },
        },
      },
    },
  });

  if (!exam) {
    return notFound();
  }

  return (
    <div className="p-8 max-w-6xl mx-auto text-slate-100">
      {/* Navigation retour & En-tête de l'examen */}
      <div className="mb-8">
        <Link
          href="/admin/qcm/exams"
          className="text-xs font-mono text-slate-400 hover:text-white inline-flex items-center gap-1.5 mb-3 transition"
        >
          &larr; Retour à la liste des examens
        </Link>

        <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                {exam.title}
              </h1>
              <span
                className={`text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-full border ${
                  exam.published
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                    : "bg-amber-500/10 border-amber-500/30 text-amber-400"
                }`}
              >
                {exam.published ? "Publié" : "Brouillon"}
              </span>
            </div>

            <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
              {exam.description ||
                "Aucune description fournie pour cet examen."}
            </p>

            <div className="flex items-center gap-4 text-xs font-mono text-slate-500 mt-3">
              <span>
                Slug:{" "}
                <strong className="text-slate-300 font-normal">
                  {exam.slug}
                </strong>
              </span>
              <span>•</span>
              <span>
                Durée :{" "}
                <strong className="text-slate-300 font-normal">
                  {exam.timeLimitMinutes
                    ? `${exam.timeLimitMinutes} min`
                    : "Illimitée"}
                </strong>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="px-3.5 py-1.5 rounded-xl bg-blue-950/60 border border-blue-800 text-blue-300 text-xs font-semibold">
              {exam.questions.length} questions au total
            </span>
          </div>
        </div>
      </div>

      {/* Liste ordonnée des questions */}
      <div className="space-y-4">
        {exam.questions.length === 0 ? (
          <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-2xl text-slate-500 text-sm">
            Aucune question n&apos;est liée à cet examen pour le moment.
          </div>
        ) : (
          exam.questions.map(({ order, question: q }) => (
            <div
              key={q.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-200 transition hover:border-slate-700/80"
            >
              <div className="flex items-start gap-4">
                {/* Numéro d'ordre dans l'épreuve */}
                <span className="w-8 h-8 shrink-0 rounded-xl bg-blue-600/15 border border-blue-500/20 text-blue-400 font-mono font-bold text-sm flex items-center justify-center">
                  {order}
                </span>

                <div className="flex-1 space-y-3">
                  {/* Badges métadonnées */}
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-950 border border-blue-800 text-blue-300">
                      {q.topic}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] bg-slate-800 text-slate-400">
                      {q.difficulty}
                    </span>
                  </div>

                  {/* Énoncé avec KaTeX */}
                  <div className="text-base font-medium text-white leading-relaxed">
                    <MathText content={q.question} />
                  </div>

                  {/* Grille des propositions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                    {q.options.map((opt) => (
                      <div
                        key={opt.id}
                        className={`px-3.5 py-2.5 rounded-xl text-xs flex items-center gap-2.5 border transition-colors ${
                          opt.isCorrect
                            ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-300 font-medium"
                            : "bg-slate-950/50 border-slate-800 text-slate-400"
                        }`}
                      >
                        <span className="text-xs font-mono">
                          {opt.isCorrect ? "✓" : "○"}
                        </span>
                        <div className="flex-1">
                          <MathText content={opt.text} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Explication didactique */}
                  {q.explanation && (
                    <div className="text-xs text-slate-400 mt-3 pt-2.5 border-t border-slate-800/60 leading-relaxed">
                      <span className="text-slate-500 font-semibold font-mono not-italic mr-1">
                        Explication :
                      </span>
                      <MathText content={q.explanation} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
