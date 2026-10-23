"use client";

import React, { useState } from "react";
import MathText from "@/components/qcm/MathText";
import {
  getOrCreateExamSession,
  saveQuestionAnswer,
  finalizeExamAttempt,
} from "@/lib/actions/qcm-student";

interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: string;
  question: string;
  explanation: string | null;
  options: Option[];
}

interface Props {
  examId: string;
  title: string;
  timeLimitMinutes: number | null;
  questions: Question[];
}

export default function StudentExamRunner({ examId, title, questions }: Props) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string>
  >({});
  const [loadingSession, setLoadingSession] = useState(false);
  const [savingStep, setSavingStep] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    totalQuestions: number;
    percentage: number;
  } | null>(null);

  // 1. Démarrage ou Reprise via Email
  const handleStartOrResume = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoadingSession(true);
    try {
      const session = await getOrCreateExamSession({
        examId,
        email,
        fullName,
        totalQuestions: questions.length,
      });

      setAttemptId(session.attemptId);
      if (session.fullName) setFullName(session.fullName);
      setSelectedAnswers(session.savedAnswers);

      // Si l'élève reprend la session, le positionner sur la première question sans réponse
      if (session.isResumed) {
        const firstUnansweredIndex = questions.findIndex(
          (q) => !session.savedAnswers[q.id],
        );
        setCurrentIndex(firstUnansweredIndex !== -1 ? firstUnansweredIndex : 0);
      }

      setHasStarted(true);
    } finally {
      setLoadingSession(false);
    }
  };

  const currentQ = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  // 2. Sélection d'une réponse (enregistrée immédiatement en base)
  const handleSelectOption = async (optId: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [currentQ.id]: optId }));

    if (attemptId) {
      await saveQuestionAnswer({
        attemptId,
        questionId: currentQ.id,
        selectedOptionId: optId,
      });
    }
  };

  // 3. Clic sur "Suivante" (sauvegarde l'état courant et avance)
  const handleNext = async () => {
    if (attemptId) {
      setSavingStep(true);
      try {
        await saveQuestionAnswer({
          attemptId,
          questionId: currentQ.id,
          selectedOptionId: selectedAnswers[currentQ.id] || null,
        });
      } finally {
        setSavingStep(false);
      }
    }
    setCurrentIndex((prev) => prev + 1);
  };

  // 4. Soumission finale
  const handleSubmit = async () => {
    if (!attemptId) return;

    setIsSubmitting(true);
    try {
      // Sauvegarder la dernière question
      await saveQuestionAnswer({
        attemptId,
        questionId: currentQ.id,
        selectedOptionId: selectedAnswers[currentQ.id] || null,
      });

      const finalResult = await finalizeExamAttempt(attemptId);
      setResult({
        score: finalResult.score,
        totalQuestions: finalResult.totalQuestions,
        percentage: finalResult.percentage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Écran 1 : Formulaire d'accès / Reprise ---
  if (!hasStarted) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
          <p className="text-sm text-slate-400">
            Renseignez votre email pour commencer ou reprendre votre session
            sauvegardée.
          </p>
        </div>

        <form onSubmit={handleStartOrResume} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
              Adresse Email (Identifiant de session)
            </label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="eleve@exemple.com"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
              Nom complet (Optionnel si vous avez déjà un compte)
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Ex: Mohamed Haddouche"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loadingSession}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold rounded-xl text-sm transition shadow-lg shadow-blue-600/20"
          >
            {loadingSession
              ? "Connexion à la session..."
              : "Accéder à l'épreuve →"}
          </button>
        </form>
      </div>
    );
  }

  // --- Écran 2 : Résultats finaux ---
  if (result) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl text-center space-y-6">
        <h2 className="text-3xl font-extrabold text-white">
          Résultats de l&apos;évaluation
        </h2>
        <div className="py-6">
          <div className="text-6xl font-black text-blue-400 mb-2">
            {result.score} / {result.totalQuestions}
          </div>
          <p className="text-lg font-semibold text-slate-300">
            Score obtenu : {result.percentage}%
          </p>
        </div>

        <div className="text-left space-y-4 pt-6 border-t border-slate-800">
          <h3 className="text-sm font-mono uppercase text-slate-400">
            Correction didactique :
          </h3>
          {questions.map((q, idx) => {
            const userChoiceId = selectedAnswers[q.id];
            const correctOpt = q.options.find((o) => o.isCorrect);
            const userOpt = q.options.find((o) => o.id === userChoiceId);
            const isSuccess = userOpt?.isCorrect;

            return (
              <div
                key={q.id}
                className={`p-4 rounded-2xl border text-sm ${
                  isSuccess
                    ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-200"
                    : "bg-rose-950/20 border-rose-500/30 text-rose-200"
                }`}
              >
                <div className="font-semibold mb-2">
                  Question {idx + 1} : <MathText content={q.question} />
                </div>
                <div className="text-xs space-y-1">
                  <div>
                    Votre réponse :{" "}
                    <span className="font-medium">
                      {userOpt ? (
                        <MathText content={userOpt.text} />
                      ) : (
                        "Aucune réponse"
                      )}
                    </span>
                  </div>
                  {!isSuccess && correctOpt && (
                    <div className="text-emerald-400">
                      Bonne réponse : <MathText content={correctOpt.text} />
                    </div>
                  )}
                  {q.explanation && (
                    <div className="text-slate-400 mt-2 italic pt-1 border-t border-slate-800/40">
                      Explication : <MathText content={q.explanation} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // --- Écran 3 : Déroulement de l'épreuve ---
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
      <div className="flex justify-between items-center text-xs text-slate-400 border-b border-slate-800 pb-4">
        <div>
          <span>{title}</span>
          <span className="block text-[11px] text-slate-500 font-mono mt-0.5">
            Élève : {email}
          </span>
        </div>
        <div className="text-right">
          <span className="font-mono font-semibold text-slate-300">
            Question {currentIndex + 1} sur {questions.length}
          </span>
          <span className="block text-[10px] text-emerald-400 mt-0.5">
            Progression sauvegardée
          </span>
        </div>
      </div>

      <div className="text-lg font-medium text-white leading-relaxed pt-2">
        <MathText content={currentQ.question} />
      </div>

      <div className="space-y-3 pt-2">
        {currentQ.options.map((opt) => {
          const isSelected = selectedAnswers[currentQ.id] === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleSelectOption(opt.id)}
              className={`w-full text-left p-4 rounded-xl text-sm transition flex items-center gap-3 border ${
                isSelected
                  ? "bg-blue-600/20 border-blue-500 text-white font-medium"
                  : "bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700"
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  isSelected
                    ? "border-blue-400 bg-blue-500"
                    : "border-slate-600"
                }`}
              >
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </span>
              <div className="flex-1">
                <MathText content={opt.text} />
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-slate-800">
        <button
          type="button"
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex((prev) => prev - 1)}
          className="px-4 py-2 text-sm text-slate-400 hover:text-white disabled:opacity-30"
        >
          &larr; Précédente
        </button>

        {isLast ? (
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleSubmit}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-sm transition shadow-lg shadow-emerald-600/20 disabled:opacity-50"
          >
            {isSubmitting ? "Validation finale..." : "Valider l'examen"}
          </button>
        ) : (
          <button
            type="button"
            disabled={savingStep}
            onClick={handleNext}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-sm transition disabled:opacity-50"
          >
            {savingStep ? "Sauvegarde..." : "Suivante →"}
          </button>
        )}
      </div>
    </div>
  );
}
