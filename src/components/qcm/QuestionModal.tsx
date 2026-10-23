"use client";

import React, { useState } from "react";
import { createQuestion } from "@/lib/actions/qcm-admin";
import MathText from "@/components/qcm/MathText";

interface QuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuestionModal({ isOpen, onClose }: QuestionModalProps) {
  const [topic, setTopic] = useState("Mathématiques");
  const [difficulty, setDifficulty] = useState("Moyen");
  const [questionText, setQuestionText] = useState("");
  const [explanation, setExplanation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [options, setOptions] = useState([
    { text: "", isCorrect: true, imageUrl: "" },
    { text: "", isCorrect: false, imageUrl: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleOptionChange = (index: number, text: string) => {
    const updated = [...options];
    updated[index].text = text;
    setOptions(updated);
  };

  const handleCorrectSelect = (index: number) => {
    const updated = options.map((opt, i) => ({
      ...opt,
      isCorrect: i === index,
    }));
    setOptions(updated);
  };

  const addOption = () => {
    if (options.length < 6) {
      setOptions([...options, { text: "", isCorrect: false, imageUrl: "" }]);
    }
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      const updated = options.filter((_, i) => i !== index);
      if (!updated.some((o) => o.isCorrect)) {
        updated[0].isCorrect = true;
      }
      setOptions(updated);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createQuestion({
        topic,
        difficulty,
        question: questionText,
        explanation,
        imageUrl: imageUrl.trim() || undefined,
        options,
      });
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl p-6 text-slate-100 shadow-2xl my-8">
        <div className="flex justify-between items-center pb-4 border-b border-slate-800">
          <h2 className="text-xl font-bold text-white">
            Ajouter une question QCM
          </h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-300 text-lg font-bold"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="my-4 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                Thématique
              </label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200"
              >
                <option value="Mathématiques">Mathématiques</option>
                <option value="Programmation">Programmation</option>
                <option value="Algorithmique">Algorithmique</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                Difficulté
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200"
              >
                <option value="Facile">Facile</option>
                <option value="Moyen">Moyen</option>
                <option value="Difficile">Difficile</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
              Énoncé (KaTeX supporté : $...$ ou $$...$$)
            </label>
            <textarea
              required
              rows={3}
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="Ex: Quelle est la dérivée de $f(x) = x^2$ ?"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:border-blue-500 font-mono"
            />
            {questionText && (
              <div className="mt-2 p-2.5 bg-slate-950/60 border border-slate-800/80 rounded-xl text-sm text-slate-300">
                <span className="text-[10px] font-mono text-slate-500 block">
                  Aperçu :
                </span>
                <MathText content={questionText} />
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
              URL Image de la question (optionnelle)
            </label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-mono text-slate-400 uppercase">
                Options de réponse (Cocher la bonne réponse)
              </label>
              {options.length < 6 && (
                <button
                  type="button"
                  onClick={addOption}
                  className="text-xs text-blue-400 hover:text-blue-300 font-medium"
                >
                  + Ajouter une option
                </button>
              )}
            </div>
            <div className="space-y-2">
              {options.map((opt, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="isCorrect"
                    checked={opt.isCorrect}
                    onChange={() => handleCorrectSelect(idx)}
                    className="w-4 h-4 text-blue-600 focus:ring-0"
                  />
                  <input
                    type="text"
                    required
                    value={opt.text}
                    onChange={(e) => handleOptionChange(idx, e.target.value)}
                    placeholder={`Option ${idx + 1} ($...$ pour LaTeX)`}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200"
                  />
                  {options.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeOption(idx)}
                      className="px-2 text-slate-500 hover:text-rose-400 text-sm"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
              Explication pédagogique (facultative)
            </label>
            <textarea
              rows={2}
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              placeholder="Explication affichée après la validation..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-slate-400 hover:text-white"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold rounded-xl text-sm transition"
            >
              {loading ? "Enregistrement..." : "Créer la question"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
