"use client";

import React, { useState } from "react";
import Link from "next/link";
import { getStudentHistoryByEmail } from "@/lib/actions/qcm-student";
import AttemptReviewModal from "@/components/qcm/AttemptReviewModal";

type StudentAttempt = {
  id: string;
  examTitle: string;
  examSlug: string;
  level: string;
  isCompleted: boolean;
  score: number;
  totalQuestions: number;
  percentage: number;
  answeredCount: number;
  startedAt: string;
  completedAt: string | null;
};

function tone(percentage: number) {
  if (percentage >= 75)
    return {
      bar: "bg-emerald-500",
      text: "text-emerald-600 dark:text-emerald-400",
    };
  if (percentage >= 50)
    return { bar: "bg-amber-500", text: "text-amber-600 dark:text-amber-400" };
  return { bar: "bg-brand-red", text: "text-brand-red" };
}

export default function StudentHistoryPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [studentName, setStudentName] = useState<string | null>(null);
  const [attempts, setAttempts] = useState<StudentAttempt[]>([]);
  const [reviewAttemptId, setReviewAttemptId] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    setError(null);
    try {
      const res = await getStudentHistoryByEmail(email);
      setHasSearched(true);
      if (res.found && res.student) {
        setStudentName(res.student.fullName);
        setAttempts(res.attempts);
      } else {
        setStudentName(null);
        setAttempts([]);
      }
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer dans un instant.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-ink font-sans antialiased selection:bg-brand-red selection:text-white">
      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 space-y-8">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/qcm"
            className="text-xs font-bold text-muted hover:text-brand-red flex items-center gap-1.5 transition"
          >
            &larr; Retour au catalogue QCM
          </Link>
        </div>

        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
            Mon Historique d&apos;
            <span className="np-highlight">Évaluations</span>
          </h1>
          <p className="text-muted text-sm mt-3 max-w-2xl leading-relaxed">
            Consultez vos scores et analysez vos corrections détaillées dès
            qu&apos;une épreuve est achevée.
          </p>
        </div>

        <form
          onSubmit={handleSearch}
          className="np-card p-4 sm:p-5 flex flex-col sm:flex-row gap-3 items-stretch sm:items-end"
        >
          <div className="w-full">
            <label className="np-label" htmlFor="history-email">
              Adresse email utilisée lors du test
            </label>
            <input
              id="history-email"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ex : prenom.nom@gmail.com"
              className="np-input"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="np-btn-primary shrink-0 disabled:opacity-50 disabled:pointer-events-none"
          >
            {isLoading ? "Recherche..." : "Consulter mes résultats →"}
          </button>
        </form>

        {error && (
          <div
            role="alert"
            className="p-4 rounded-xl border border-brand-red/40 bg-brand-red/10 text-brand-red text-sm font-semibold"
          >
            {error}
          </div>
        )}

        {hasSearched && (
          <section className="space-y-4">
            {studentName ? (
              <div className="text-xs text-muted flex flex-wrap items-center gap-2">
                <span>Élève identifié :</span>
                <strong className="text-ink font-black">{studentName}</strong>
                <span>•</span>
                <span>
                  {attempts.length} tentative{attempts.length > 1 ? "s" : ""}
                </span>
              </div>
            ) : (
              <div className="np-card p-10 text-center text-muted text-sm">
                Aucune tentative trouvée pour l&apos;adresse{" "}
                <strong className="text-ink">{email}</strong>.
                <div className="mt-4">
                  <Link href="/qcm" className="np-btn-primary">
                    PASSER UN TEST →
                  </Link>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {attempts.map((att) => {
                const c = tone(att.percentage);
                const progress = att.isCompleted
                  ? att.percentage
                  : att.totalQuestions > 0
                    ? Math.round((att.answeredCount / att.totalQuestions) * 100)
                    : 0;

                return (
                  <article
                    key={att.id}
                    className="np-card np-card-hover p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-5"
                  >
                    <div className="space-y-2 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-base font-black text-ink">
                          {att.examTitle}
                        </h2>
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                            att.isCompleted
                              ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30"
                              : "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              att.isCompleted
                                ? "bg-emerald-500"
                                : "bg-amber-500"
                            }`}
                          />
                          {att.isCompleted ? "Terminé" : "En cours"}
                        </span>
                      </div>

                      <div className="text-xs text-muted font-mono flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span>
                          Débuté le{" "}
                          {new Date(att.startedAt).toLocaleDateString("fr-FR")}{" "}
                          à{" "}
                          {new Date(att.startedAt).toLocaleTimeString("fr-FR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        {!att.isCompleted && (
                          <>
                            <span>•</span>
                            <span>
                              {att.answeredCount} / {att.totalQuestions}{" "}
                              questions répondues
                            </span>
                          </>
                        )}
                      </div>

                      <div
                        className="h-1.5 w-full max-w-xs rounded-full bg-surface2 border border-line overflow-hidden"
                        role="progressbar"
                        aria-valuenow={progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        <div
                          className={`h-full rounded-full ${
                            att.isCompleted ? c.bar : "bg-brand-orange"
                          }`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between lg:justify-end gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-line">
                      <div className="text-right pr-2">
                        {att.isCompleted ? (
                          <>
                            <div className={`text-xl font-black ${c.text}`}>
                              {att.score} / {att.totalQuestions}
                            </div>
                            <div className="text-[11px] text-muted font-bold">
                              {att.percentage}%
                            </div>
                          </>
                        ) : (
                          <div className="text-xs text-muted font-bold">
                            Score à la fin
                            <br />
                            de l&apos;épreuve
                          </div>
                        )}
                      </div>

                      {!att.isCompleted && (
                        <Link
                          href={`/qcm/${att.examSlug}`}
                          className="np-btn-primary !py-2.5 !px-4"
                        >
                          Reprendre →
                        </Link>
                      )}

                      {att.isCompleted ? (
                        <button
                          type="button"
                          onClick={() => setReviewAttemptId(att.id)}
                          className="px-4 py-2.5 rounded-xl border-2 border-ink text-ink hover:bg-brand-red hover:border-brand-red hover:text-white text-xs font-black uppercase tracking-wider transition"
                        >
                          Réponses &amp; correction
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled
                          title="Disponible une fois l'épreuve terminée"
                          className="px-4 py-2.5 rounded-xl border border-line bg-surface2 text-muted text-xs font-bold uppercase tracking-wider cursor-not-allowed select-none opacity-60"
                        >
                          Réponses &amp; correction
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </main>

      <AttemptReviewModal
        attemptId={reviewAttemptId}
        onClose={() => setReviewAttemptId(null)}
      />
    </div>
  );
}
