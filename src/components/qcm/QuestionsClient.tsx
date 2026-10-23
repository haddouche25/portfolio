"use client";

import React, { useState } from "react";
import MathText from "@/components/qcm/MathText";
import QuestionModal from "./QuestionModal";
import { deleteQuestion } from "@/lib/actions/qcm-admin";

interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
  imageUrl?: string | null;
}

interface Question {
  id: string;
  topic: string;
  difficulty: string;
  question: string;
  imageUrl?: string | null;
  explanation?: string | null;
  createdAt: Date;
  options: Option[];
}

export default function QuestionsClient({
  questions,
}: {
  questions: Question[];
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string>("Tous");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredQuestions =
    selectedTopic === "Tous"
      ? questions
      : questions.filter((q) => q.topic === selectedTopic);

  const handleDelete = async (id: string) => {
    if (confirm("Voulez-vous vraiment supprimer cette question ?")) {
      setDeletingId(id);
      try {
        await deleteQuestion(id);
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          {["Tous", "Mathématiques", "Programmation", "Algorithmique"].map(
            (topic) => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${
                  selectedTopic === topic
                    ? "bg-blue-600 text-white font-semibold"
                    : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                {topic}
              </button>
            ),
          )}
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-sm transition flex items-center gap-2 shadow-lg shadow-blue-600/20"
        >
          <span>+</span>
          <span>Nouvelle Question</span>
        </button>
      </div>

      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-2xl text-slate-500 text-sm">
            Aucune question trouvée dans cette catégorie.
          </div>
        ) : (
          filteredQuestions.map((q) => (
            <div
              key={q.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-slate-200 transition hover:border-slate-700/80"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-950 border border-blue-800 text-blue-300">
                      {q.topic}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] bg-slate-800 text-slate-400">
                      {q.difficulty}
                    </span>
                  </div>

                  <div className="text-base font-medium text-white pt-1">
                    <MathText content={q.question} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                    {q.options.map((opt) => (
                      <div
                        key={opt.id}
                        className={`px-3 py-2 rounded-xl text-xs flex items-center gap-2 border ${
                          opt.isCorrect
                            ? "bg-emerald-950/30 border-emerald-500/30 text-emerald-300 font-medium"
                            : "bg-slate-950/40 border-slate-800 text-slate-400"
                        }`}
                      >
                        <span className="text-xs">
                          {opt.isCorrect ? "✓" : "○"}
                        </span>
                        <MathText content={opt.text} />
                      </div>
                    ))}
                  </div>

                  {q.explanation && (
                    <div className="text-xs text-slate-500 mt-2 italic pt-1 border-t border-slate-800/40">
                      Explication : <MathText content={q.explanation} />
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleDelete(q.id)}
                  disabled={deletingId === q.id}
                  className="text-slate-500 hover:text-rose-400 p-2 text-sm disabled:opacity-50"
                  title="Supprimer la question"
                >
                  {deletingId === q.id ? "..." : "🗑"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <QuestionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
