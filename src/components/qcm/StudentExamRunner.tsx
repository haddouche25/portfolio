"use client";

import React, { useState } from "react";
import Link from "next/link";
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

/**
 * Algorithme Fisher-Yates
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function tone(percentage: number) {
  if (percentage >= 75)
    return {
      text: "text-emerald-600 dark:text-emerald-400",
      bar: "bg-emerald-500",
      label: "Excellent travail",
    };
  if (percentage >= 50)
    return {
      text: "text-amber-600 dark:text-amber-400",
      bar: "bg-amber-500",
      label: "Bonne base, à consolider",
    };
  return {
    text: "text-brand-red",
    bar: "bg-brand-red",
    label: "Des notions à retravailler",
  };
}

export default function StudentExamRunner({ examId, title, questions }: Props) {
  const [shuffledQuestions] = useState<Question[]>(() =>
    questions.map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    })),
  );

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
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    score: number;
    totalQuestions: number;
    percentage: number;
  } | null>(null);

  const handleStartOrResume = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoadingSession(true);
    setError(null);
    try {
      const session = await getOrCreateExamSession({
        examId,
        email,
        fullName,
        totalQuestions: shuffledQuestions.length,
      });

      setAttemptId(session.attemptId);
      if (session.fullName) setFullName(session.fullName);
      setSelectedAnswers(session.savedAnswers);

      if (session.isResumed) {
        const firstUnansweredIndex = shuffledQuestions.findIndex(
          (q) => !session.savedAnswers[q.id],
        );
        setCurrentIndex(firstUnansweredIndex !== -1 ? firstUnansweredIndex : 0);
      }

      setHasStarted(true);
    } catch {
      setError(
        "Impossible d'ouvrir la session. Vérifiez votre email et réessayez.",
      );
    } finally {
      setLoadingSession(false);
    }
  };

  const currentQ = shuffledQuestions[currentIndex];
  const isLast = currentIndex === shuffledQuestions.length - 1;
  const answeredCount = shuffledQuestions.filter(
    (q) => selectedAnswers[q.id],
  ).length;

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

  const handleSubmit = async () => {
    if (!attemptId) return;

    setIsSubmitting(true);
    setError(null);
    try {
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
    } catch {
      setError(
        "La validation a échoué. Vos réponses sont sauvegardées, réessayez.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!hasStarted) {
    return (
      <div className="p-6 sm:p-8 space-y-6">
        <div>
          <span className="np-eyebrow">Accès à l&apos;épreuve</span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-ink leading-tight">
            {title}
          </h1>
          <p className="text-sm text-muted mt-2 leading-relaxed">
            Renseignez votre email pour commencer ou reprendre votre session
            sauvegardée.
          </p>
          <p className="mt-3 text-xs font-semibold text-brand-red bg-brand-red/10 border border-brand-red/30 rounded-lg px-3 py-2 leading-relaxed">
            Épreuve linéaire : les questions s&apos;enchaînent dans
            l&apos;ordre, sans retour en arrière possible.
          </p>
        </div>

        <form onSubmit={handleStartOrResume} className="space-y-4">
          <div>
            <label className="np-label" htmlFor="exam-email">
              Adresse email (identifiant de session)
            </label>
            <input
              id="exam-email"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="eleve@exemple.com"
              className="np-input"
            />
          </div>

          <div>
            <label className="np-label" htmlFor="exam-name">
              Nom complet (optionnel si vous avez déjà un compte)
            </label>
            <input
              id="exam-name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Ex : Mohamed Haddouche"
              className="np-input"
            />
          </div>

          {error && (
            <div
              role="alert"
              className="p-3 rounded-xl border border-brand-red/40 bg-brand-red/10 text-brand-red text-xs font-semibold"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loadingSession}
            className="np-btn-primary w-full disabled:opacity-50 disabled:pointer-events-none"
          >
            {loadingSession
              ? "Connexion à la session..."
              : "Accéder à l'épreuve →"}
          </button>
        </form>
      </div>
    );
  }

  if (result) {
    const c = tone(result.percentage);

    return (
      <div className="space-y-6">
        <div className="p-6 sm:p-10 text-center">
          <span className="np-eyebrow">Résultats de l&apos;évaluation</span>
          <div
            className={`text-6xl sm:text-7xl font-black tracking-tight ${c.text}`}
          >
            {result.score} / {result.totalQuestions}
          </div>
          <p className="mt-2 text-lg font-bold text-ink">
            Score obtenu : {result.percentage}%
          </p>
          <p className="text-sm text-muted mt-1">{c.label}</p>

          <div
            className="mt-6 mx-auto h-2 max-w-sm rounded-full bg-surface2 border border-line overflow-hidden"
            role="progressbar"
            aria-valuenow={result.percentage}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className={`h-full rounded-full ${c.bar}`}
              style={{ width: `${result.percentage}%` }}
            />
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/qcm" className="np-btn-primary">
              AUTRES ÉPREUVES →
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl border-2 border-ink text-ink hover:bg-brand-red hover:border-brand-red hover:text-white text-xs font-black uppercase tracking-wider transition"
            >
              Parler de mes résultats
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-black text-ink flex items-center gap-3">
            <span className="h-0.5 w-6 bg-brand-red rounded" />
            Correction <span className="np-highlight">didactique</span>
          </h2>

          {shuffledQuestions.map((q, idx) => {
            const userChoiceId = selectedAnswers[q.id];
            const correctOpt = q.options.find((o) => o.isCorrect);
            const userOpt = q.options.find((o) => o.id === userChoiceId);
            const isSuccess = userOpt?.isCorrect;

            return (
              <div
                key={q.id}
                className={`np-card p-5 text-sm border-l-4 ${
                  isSuccess ? "border-l-emerald-500" : "border-l-brand-red"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`shrink-0 mt-0.5 flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-black text-white ${
                      isSuccess ? "bg-emerald-500" : "bg-brand-red"
                    }`}
                    aria-label={isSuccess ? "Correct" : "Incorrect"}
                  >
                    {isSuccess ? "✓" : "✕"}
                  </span>
                  <div className="font-bold text-ink leading-relaxed">
                    <span className="text-muted font-mono text-xs mr-2">
                      Q{idx + 1}
                    </span>
                    <MathText content={q.question} />
                  </div>
                </div>

                <div className="mt-3 pl-9 text-xs space-y-1.5">
                  <div className="text-muted">
                    Votre réponse :{" "}
                    <span
                      className={`font-bold ${
                        isSuccess
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-brand-red"
                      }`}
                    >
                      {userOpt ? (
                        <MathText content={userOpt.text} />
                      ) : (
                        "Aucune réponse"
                      )}
                    </span>
                  </div>
                  {!isSuccess && correctOpt && (
                    <div className="text-muted">
                      Bonne réponse :{" "}
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        <MathText content={correctOpt.text} />
                      </span>
                    </div>
                  )}
                  {q.explanation && (
                    <div className="mt-2 p-3 rounded-lg bg-surface2 border border-line text-muted italic leading-relaxed">
                      <span className="not-italic font-black text-brand-orange">
                        Explication :{" "}
                      </span>
                      <MathText content={q.explanation} />
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

  const progress = Math.round(
    ((currentIndex + 1) / shuffledQuestions.length) * 100,
  );

  return (
    <div className="p-5 sm:p-8 space-y-6">
      <div className="flex flex-wrap justify-between items-start gap-3 text-xs border-b border-line pb-4">
        <div className="min-w-0">
          <span className="block font-black text-ink text-sm truncate">
            {title}
          </span>
          <span className="block text-[11px] text-muted font-mono mt-0.5 truncate">
            Élève : {email}
          </span>
        </div>
        <div className="text-right">
          <span className="font-mono font-bold text-ink">
            Question {currentIndex + 1} sur {shuffledQuestions.length}
          </span>
          <span className="mt-0.5 flex items-center justify-end gap-1.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Progression sauvegardée
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <div
          className="h-1.5 w-full rounded-full bg-surface2 border border-line overflow-hidden"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-orange to-brand-red transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div
          className="flex flex-wrap items-center gap-1.5 select-none"
          aria-hidden="true"
        >
          {shuffledQuestions.map((q, i) => {
            const isCurrent = i === currentIndex;
            const isAnswered = Boolean(selectedAnswers[q.id]);
            return (
              <span
                key={q.id}
                className={`h-7 w-7 rounded-md text-[11px] font-black font-mono border flex items-center justify-center cursor-default ${
                  isCurrent
                    ? "bg-brand-red text-white border-brand-red"
                    : isAnswered
                      ? "bg-brand-orange/15 text-brand-orange border-brand-orange/40"
                      : "bg-surface2 text-muted border-line"
                }`}
              >
                {i + 1}
              </span>
            );
          })}
          <span className="ml-auto text-[11px] text-muted font-mono">
            {answeredCount}/{shuffledQuestions.length} répondues
          </span>
        </div>
      </div>

      <div className="text-lg sm:text-xl font-bold text-ink leading-relaxed pt-1">
        <MathText content={currentQ.question} />
      </div>

      <div className="space-y-3">
        {currentQ.options.map((opt, i) => {
          const isSelected = selectedAnswers[currentQ.id] === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleSelectOption(opt.id)}
              aria-pressed={isSelected}
              className={`w-full text-left p-4 rounded-xl text-sm transition flex items-center gap-3 border-2 ${
                isSelected
                  ? "bg-brand-orange/10 border-brand-orange text-ink font-semibold shadow-sm"
                  : "bg-surface2 border-line text-ink hover:border-brand-red/60"
              }`}
            >
              <span
                className={`shrink-0 flex h-7 w-7 items-center justify-center rounded-lg font-mono font-black text-xs ${
                  isSelected
                    ? "bg-gradient-to-br from-brand-orange to-brand-red text-white"
                    : "bg-surface border border-line text-muted"
                }`}
              >
                {String.fromCharCode(65 + i)}
              </span>
              <div className="flex-1">
                <MathText content={opt.text} />
              </div>
            </button>
          );
        })}
      </div>

      {error && (
        <div
          role="alert"
          className="p-3 rounded-xl border border-brand-red/40 bg-brand-red/10 text-brand-red text-xs font-semibold"
        >
          {error}
        </div>
      )}

      <div className="flex justify-between items-center gap-3 pt-5 border-t border-line">
        <p className="text-[11px] text-muted font-medium leading-snug max-w-[14rem]">
          Épreuve linéaire : une réponse validée ne peut plus être modifiée.
        </p>

        {isLast ? (
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleSubmit}
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/25 transition disabled:opacity-50 disabled:pointer-events-none"
          >
            {isSubmitting ? "Validation finale..." : "Valider l'examen ✓"}
          </button>
        ) : (
          <button
            type="button"
            disabled={savingStep}
            onClick={handleNext}
            className="np-btn-primary disabled:opacity-50 disabled:pointer-events-none"
          >
            {savingStep ? "Sauvegarde..." : "Suivante →"}
          </button>
        )}
      </div>
    </div>
  );
}
