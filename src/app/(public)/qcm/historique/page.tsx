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

export default function StudentHistoryPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [studentName, setStudentName] = useState<string | null>(null);
  const [attempts, setAttempts] = useState<StudentAttempt[]>([]);
  const [reviewAttemptId, setReviewAttemptId] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Navigation & En-tête */}
        <div className="flex items-center justify-between">
          <Link
            href="/qcm"
            className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1.5 transition"
          >
            &larr; Retour au catalogue QCM
          </Link>
          <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-blue-950/60 border border-blue-800 text-blue-300">
            Espace Candidat
          </span>
        </div>

        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Mon Historique d&apos;Évaluations
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Consultez vos scores et analysez vos corrections détaillées dès
            qu&apos;une épreuve est achevée.
          </p>
        </div>

        {/* Formulaire de recherche par email */}
        <form
          onSubmit={handleSearch}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row gap-3 items-center shadow-lg"
        >
          <div className="relative w-full">
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Saisissez votre adresse email (ex: haddouche@gmail.com)"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-semibold rounded-xl transition shrink-0"
          >
            {isLoading ? "Recherche..." : "Consulter mes résultats"}
          </button>
        </form>

        {/* Résultats */}
        {hasSearched && (
          <div className="space-y-4">
            {studentName ? (
              <div className="text-xs text-slate-400 flex items-center gap-2">
                <span>Élève identifié :</span>
                <strong className="text-white font-medium">
                  {studentName}
                </strong>
                <span>•</span>
                <span>
                  {attempts.length} tentative{attempts.length > 1 ? "s" : ""}
                </span>
              </div>
            ) : (
              <div className="p-8 text-center bg-slate-900/50 border border-slate-800 rounded-2xl text-slate-400 text-sm">
                Aucune tentative trouvée pour l&apos;adresse{" "}
                <strong className="text-slate-200">{email}</strong>.
              </div>
            )}

            <div className="space-y-3">
              {attempts.map((att) => (
                <div
                  key={att.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700/80 transition"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-white">
                        {att.examTitle}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${
                          att.isCompleted
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            att.isCompleted ? "bg-emerald-400" : "bg-amber-400"
                          }`}
                        />
                        {att.isCompleted ? "Terminé" : "En cours"}
                      </span>
                    </div>

                    <div className="text-xs text-slate-500 font-mono flex items-center gap-3">
                      <span>
                        Débuté le{" "}
                        {new Date(att.startedAt).toLocaleDateString("fr-FR")} à{" "}
                        {new Date(att.startedAt).toLocaleTimeString("fr-FR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      {!att.isCompleted && (
                        <>
                          <span>•</span>
                          <span className="text-slate-400">
                            {att.answeredCount} / {att.totalQuestions} questions
                            répondues
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-800/60">
                    <div className="text-right pr-2">
                      <div className="text-sm font-bold text-blue-400">
                        {att.score} / {att.totalQuestions}
                      </div>
                      <div className="text-[11px] text-slate-400 font-semibold">
                        {att.percentage}%
                      </div>
                    </div>

                    {/* Bouton pour reprendre le test si non terminé */}
                    {!att.isCompleted && (
                      <Link
                        href={`/qcm/${att.examSlug}`}
                        className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition shadow-md shadow-blue-600/20"
                      >
                        Reprendre →
                      </Link>
                    )}

                    {/* Bouton Consultation des réponses : actif si terminé, sinon grisé sombre et désactivé */}
                    {att.isCompleted ? (
                      <button
                        type="button"
                        onClick={() => setReviewAttemptId(att.id)}
                        className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition border border-slate-700 shadow-sm"
                      >
                        Réponses & correction
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled
                        title="Disponible une fois l'épreuve terminée"
                        className="px-3.5 py-2 bg-slate-950/80 text-slate-600 border border-slate-900 text-xs font-medium rounded-xl cursor-not-allowed select-none opacity-60"
                      >
                        Réponses & correction
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modale d'affichage des réponses et corrections */}
      <AttemptReviewModal
        attemptId={reviewAttemptId}
        onClose={() => setReviewAttemptId(null)}
      />
    </div>
  );
}
