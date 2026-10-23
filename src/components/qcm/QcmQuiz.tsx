"use client";

import React, { useState } from "react";
import Image from "next/image";
import MathText from "./MathText";
import { submitQcmAttempt } from "@/lib/actions/qcm";

type Option = {
  id: string;
  text: string;
  imageUrl?: string | null;
};

type Question = {
  id: string;
  topic: string;
  difficulty: string;
  question: string;
  imageUrl?: string | null;
  explanation?: string | null;
  options: Option[];
};

export default function QcmQuiz({ questions }: { questions: Question[] }) {
  // Student identification state
  const [student, setStudent] = useState<{
    fullName: string;
    email: string;
  } | null>(null);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");

  // Quiz navigation state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string>
  >({}); // { questionId: optionId }
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    total: number;
    percentage: number;
  } | null>(null);

  // 1. Initial screen: Registration
  if (!student) {
    return (
      <div className="max-w-md mx-auto p-8 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl text-slate-100">
        <h2 className="text-2xl font-bold mb-2 text-white">
          Identification de l&apos;élève
        </h2>
        <p className="text-sm text-slate-400 mb-6">
          Veuillez renseigner vos coordonnées avant de commencer l&apos;épreuve.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (formName.trim() && formEmail.trim()) {
              setStudent({
                fullName: formName.trim(),
                email: formEmail.trim(),
              });
            }
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Nom complet
            </label>
            <input
              type="text"
              required
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              placeholder="Ex: Youssef El Amrani"
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:border-blue-500 focus:outline-none text-white text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Adresse email
            </label>
            <input
              type="email"
              required
              value={formEmail}
              onChange={(e) => setFormEmail(e.target.value)}
              placeholder="Ex: eleve@gmail.com"
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:border-blue-500 focus:outline-none text-white text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition duration-150 shadow-lg shadow-blue-600/20"
          >
            Démarrer le QCM
          </button>
        </form>
      </div>
    );
  }

  // 2. Final Results screen
  if (result) {
    return (
      <div className="max-w-xl mx-auto p-8 bg-slate-900 border border-slate-800 rounded-3xl text-center shadow-2xl text-slate-100">
        <h2 className="text-3xl font-extrabold text-white mb-2">
          Résultats de l&apos;évaluation
        </h2>
        <p className="text-slate-400 text-sm mb-6">
          Candidat :{" "}
          <span className="text-white font-medium">{student.fullName}</span> (
          {student.email})
        </p>

        <div className="inline-flex items-center justify-center w-36 h-36 rounded-full border-4 border-blue-500/30 bg-blue-500/10 mb-6">
          <span className="text-4xl font-black text-blue-400">
            {result.percentage}%
          </span>
        </div>

        <p className="text-lg text-slate-300 font-medium mb-8">
          Note obtenue :{" "}
          <span className="text-blue-400 font-bold">{result.score}</span> /{" "}
          {result.total}
        </p>

        <p className="text-xs text-slate-500">
          Vos réponses et votre score ont été enregistrés avec succès.
        </p>
      </div>
    );
  }

  // 3. Quiz Question Flow
  const currentQ = questions[currentIndex];
  const selectedOptionId = selectedAnswers[currentQ.id];

  const handleSelectOption = (optionId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionId,
    }));
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSubmitAll = async () => {
    setIsSubmitting(true);
    try {
      const answersPayload = Object.entries(selectedAnswers).map(
        ([qId, optId]) => ({
          questionId: qId,
          selectedOptionId: optId,
        }),
      );

      const res = await submitQcmAttempt({
        fullName: student.fullName,
        email: student.email,
        answers: answersPayload,
      });

      setResult({
        score: res.score,
        total: res.totalQuestions,
        percentage: res.percentage,
      });
    } catch (err) {
      console.error(err);
      alert(
        "Une erreur est survenue lors de l'enregistrement de vos réponses.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100">
      {/* Header bar */}
      <div className="flex justify-between items-center pb-4 border-b border-slate-800 text-sm">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-blue-950 border border-blue-800 text-blue-300 rounded-full text-xs font-medium">
            {currentQ.topic}
          </span>
          <span className="px-3 py-1 bg-slate-800 text-slate-400 rounded-full text-xs">
            {currentQ.difficulty}
          </span>
        </div>
        <span className="text-slate-400 text-xs font-semibold">
          Question {currentIndex + 1} sur {questions.length}
        </span>
      </div>

      {/* Question content */}
      <div className="my-6">
        <div className="text-xl sm:text-2xl font-semibold leading-relaxed text-slate-50">
          <MathText content={currentQ.question} />
        </div>

        {currentQ.imageUrl && (
          <div className="relative w-full h-64 mt-4 rounded-xl overflow-hidden border border-slate-800">
            <Image
              src={currentQ.imageUrl}
              alt="Illustration de la question"
              fill
              className="object-contain"
            />
          </div>
        )}
      </div>

      {/* Options list */}
      <div className="space-y-3 my-6">
        {currentQ.options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleSelectOption(option.id)}
              className={`w-full text-left p-4 rounded-2xl border transition-all flex flex-col gap-2 ${
                isSelected
                  ? "border-blue-500 bg-blue-500/10 text-white ring-1 ring-blue-500"
                  : "border-slate-800 bg-slate-950/40 hover:border-slate-700 text-slate-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 flex items-center justify-center rounded-full border border-slate-700 text-xs text-slate-400">
                  {isSelected ? "●" : "○"}
                </span>
                <MathText content={option.text} className="text-base" />
              </div>

              {option.imageUrl && (
                <div className="relative w-full h-32 mt-2 rounded-lg overflow-hidden border border-slate-800">
                  <Image
                    src={option.imageUrl}
                    alt="Illustration de l'option"
                    fill
                    className="object-contain"
                  />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Navigation controls */}
      <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-800">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none text-slate-300 font-medium rounded-xl transition text-sm"
        >
          ← Précédent
        </button>

        {currentIndex + 1 < questions.length ? (
          <button
            onClick={handleNext}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition text-sm shadow-lg shadow-blue-600/20"
          >
            Suivant →
          </button>
        ) : (
          <button
            onClick={handleSubmitAll}
            disabled={isSubmitting || Object.keys(selectedAnswers).length === 0}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold rounded-xl transition text-sm shadow-lg shadow-emerald-600/20"
          >
            {isSubmitting ? "Envoi en cours..." : "Terminer et Soumettre"}
          </button>
        )}
      </div>
    </div>
  );
}
