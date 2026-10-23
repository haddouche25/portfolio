"use client";

import React, { useEffect, useState } from "react";
import MathText from "@/components/qcm/MathText";
import { getAttemptDetailsForReview } from "@/lib/actions/qcm-student";

interface Props {
  attemptId: string | null;
  onClose: () => void;
}

type AttemptReviewData = Awaited<ReturnType<typeof getAttemptDetailsForReview>>;

export default function AttemptReviewModal({ attemptId, onClose }: Props) {
  const [data, setData] = useState<AttemptReviewData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!attemptId) return;
    setLoading(true);
    getAttemptDetailsForReview(attemptId)
      .then((res) => setData(res))
      .finally(() => setLoading(false));
  }, [attemptId]);

  if (!attemptId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">
              {data?.examTitle || "Détail de l'évaluation"}
            </h2>
            {data && (
              <p className="text-xs text-slate-400 mt-1">
                Score final :{" "}
                <span className="font-bold text-blue-400">
                  {data.score} / {data.totalQuestions}
                </span>{" "}
                ({data.percentage}%)
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          {loading ? (
            <div className="p-12 text-center text-sm text-slate-400">
              Chargement des réponses...
            </div>
          ) : !data ? (
            <div className="p-12 text-center text-sm text-amber-400">
              La correction n&apos;est disponible que lorsque l&apos;épreuve est
              officiellement terminée.
            </div>
          ) : (
            data.questions.map((q) => (
              <div
                key={q.questionId}
                className={`p-5 rounded-2xl border transition-all ${
                  q.isCorrect
                    ? "bg-slate-950/40 border-emerald-500/30"
                    : "bg-slate-950/40 border-rose-500/30"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`w-7 h-7 rounded-lg text-xs font-mono font-bold flex items-center justify-center shrink-0 border ${
                      q.isCorrect
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                        : "bg-rose-500/10 border-rose-500/30 text-rose-400"
                    }`}
                  >
                    {q.order}
                  </span>

                  <div className="flex-1 space-y-3">
                    <div className="text-sm font-semibold text-white leading-relaxed">
                      <MathText content={q.questionText} />
                    </div>

                    {/* Grille des options */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {q.options.map((opt) => {
                        let style =
                          "bg-slate-900 border-slate-800 text-slate-400";
                        let badge = "○";

                        if (opt.isCorrect) {
                          // Bonne réponse : toujours en vert
                          style =
                            "bg-emerald-950/40 border-emerald-500/60 text-emerald-300 font-semibold";
                          badge = "✓ (Bonne réponse)";
                        } else if (opt.isSelected && !opt.isCorrect) {
                          // Choix de l'élève incorrect : en rouge
                          style =
                            "bg-rose-950/40 border-rose-500/60 text-rose-300 line-through";
                          badge = "✕ (Votre choix)";
                        }

                        return (
                          <div
                            key={opt.id}
                            className={`p-3 rounded-xl border text-xs flex items-center gap-2.5 ${style}`}
                          >
                            <span className="text-[11px] font-mono shrink-0">
                              {badge}
                            </span>
                            <div className="flex-1">
                              <MathText content={opt.text} />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Explication didactique */}
                    {q.explanation && (
                      <div className="text-xs text-slate-400 mt-2 pt-2 border-t border-slate-800/60 leading-relaxed italic">
                        <span className="font-semibold text-slate-500 not-italic mr-1">
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

        {/* Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/40 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl transition"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
