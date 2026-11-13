"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import MathText from "@/components/qcm/MathText";
import { updateQcmQuestionAction } from "@/actions/qcm-admin";

interface OptionItem {
  id?: string;
  text: string;
  isCorrect: boolean;
}

interface EditQuestionFormProps {
  examId: string;
  questionId: string;
  initialData: {
    topic: string;
    difficulty: string;
    question: string;
    explanation: string;
    options: OptionItem[];
  };
}

export default function EditQuestionForm({
  examId,
  questionId,
  initialData,
}: EditQuestionFormProps) {
  const [topic, setTopic] = useState(initialData.topic);
  const [difficulty, setDifficulty] = useState(initialData.difficulty);
  const [question, setQuestion] = useState(initialData.question);
  const [explanation, setExplanation] = useState(initialData.explanation);
  const [options, setOptions] = useState<OptionItem[]>(initialData.options);
  const [isPending, startTransition] = useTransition();

  const handleOptionTextChange = (index: number, value: string) => {
    setOptions((prev) =>
      prev.map((opt, i) => (i === index ? { ...opt, text: value } : opt)),
    );
  };

  const handleCorrectChange = (index: number) => {
    setOptions((prev) =>
      prev.map((opt, i) => ({ ...opt, isCorrect: i === index })),
    );
  };

  const addOption = () => {
    setOptions((prev) => [...prev, { text: "", isCorrect: false }]);
  };

  const removeOption = (index: number) => {
    if (options.length <= 2) return;
    setOptions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      await updateQcmQuestionAction(examId, questionId, {
        topic,
        difficulty,
        question,
        explanation,
        options,
      });
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Thème & Difficulté */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
            Thème / Chapitre
          </label>
          <input
            type="text"
            required
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2.5 text-sm text-white focus:border-[#eb4d16] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
            Difficulté
          </label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2.5 text-sm text-white focus:border-[#eb4d16] focus:outline-none"
          >
            <option value="Facile">Facile</option>
            <option value="Moyen">Moyen</option>
            <option value="Difficile">Difficile</option>
          </select>
        </div>
      </div>

      {/* Énoncé + Aperçu KaTeX */}
      <div className="space-y-2">
        <label className="block text-xs font-mono uppercase tracking-wider text-slate-400">
          Énoncé de la question (LaTeX supporté avec $...$)
        </label>
        <textarea
          rows={3}
          required
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2.5 text-sm text-white font-mono focus:border-[#eb4d16] focus:outline-none"
        />
        <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-3.5 text-sm text-slate-200">
          <span className="block text-[10px] font-mono uppercase text-slate-500 mb-1">
            Aperçu rendu :
          </span>
          <MathText content={question || "Aperçu de l'énoncé..."} />
        </div>
      </div>

      {/* Options / Propositions */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-mono uppercase tracking-wider text-slate-400">
            Propositions (cochez la bonne réponse)
          </label>
          <button
            type="button"
            onClick={addOption}
            className="text-xs font-semibold text-[#eb4d16] hover:underline"
          >
            + Ajouter une option
          </button>
        </div>

        <div className="space-y-3">
          {options.map((opt, idx) => (
            <div
              key={idx}
              className={`rounded-xl border p-3.5 transition ${
                opt.isCorrect
                  ? "border-emerald-500/40 bg-emerald-950/15"
                  : "border-slate-800 bg-slate-950/60"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="correctOption"
                  checked={opt.isCorrect}
                  onChange={() => handleCorrectChange(idx)}
                  className="h-4 w-4 accent-emerald-500 cursor-pointer"
                />
                <input
                  type="text"
                  required
                  value={opt.text}
                  onChange={(e) => handleOptionTextChange(idx, e.target.value)}
                  placeholder={`Option ${idx + 1}`}
                  className="flex-1 rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 font-mono text-xs text-white focus:border-[#eb4d16] focus:outline-none"
                />
                {options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeOption(idx)}
                    className="text-xs text-rose-400 hover:text-rose-300 px-2"
                  >
                    Supprimer
                  </button>
                )}
              </div>

              {opt.text && (
                <div className="mt-2 pl-7 text-xs text-slate-300">
                  <MathText content={opt.text} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Explication détaillée + Aperçu */}
      <div className="space-y-2">
        <label className="block text-xs font-mono uppercase tracking-wider text-slate-400">
          Explication / Correction détaillée
        </label>
        <textarea
          rows={3}
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
          className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2.5 text-sm text-white font-mono focus:border-[#eb4d16] focus:outline-none"
        />
        {explanation && (
          <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-3.5 text-xs text-slate-300">
            <span className="block text-[10px] font-mono uppercase text-slate-500 mb-1">
              Aperçu explication :
            </span>
            <MathText content={explanation} />
          </div>
        )}
      </div>

      {/* Boutons */}
      <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
        <Link
          href={`/admin/qcm/exams/${examId}`}
          className="px-4 py-2.5 rounded-xl border border-slate-700 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition"
        >
          Annuler
        </Link>
        <button
          type="submit"
          disabled={isPending}
          className="px-5 py-2.5 rounded-xl bg-[#eb4d16] hover:bg-[#d94310] disabled:opacity-50 text-xs font-bold uppercase tracking-wide text-white shadow-lg shadow-[#eb4d16]/20 transition"
        >
          {isPending ? "Enregistrement..." : "Enregistrer la question"}
        </button>
      </div>
    </form>
  );
}
