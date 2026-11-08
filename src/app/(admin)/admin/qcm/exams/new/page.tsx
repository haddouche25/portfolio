"use client";

import React, { useState, useTransition } from "react";
import { importExamsFromJson } from "./actions";

export default function ImportExamsPage() {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await importExamsFromJson(formData);
      if (res.success) {
        setMessage({ type: "success", text: res.message! });
        (e.target as HTMLFormElement).reset(); // Vider le formulaire
      } else {
        setMessage({ type: "error", text: res.error! });
      }
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-6 font-sans">
      <div>
        <h1 className="text-2xl font-black text-ink uppercase tracking-tight">
          Importer des QCM (Seed)
        </h1>
        <p className="text-sm text-ink/70 mt-1 font-medium">
          Uploadez un fichier JSON contenant la structure complète de vos
          examens. Le LaTeX s&apos;écrit de manière naturelle.
        </p>
      </div>

      <div className="bg-surface border border-line rounded-lg p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-ink mb-2">
              Fichier JSON
            </label>
            <input
              type="file"
              name="file"
              accept=".json"
              required
              className="block w-full text-sm text-ink/70
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-xs file:font-black file:uppercase file:tracking-wider
                file:bg-brand-orange file:text-white
                hover:file:bg-orange-600 cursor-pointer"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-2.5 bg-ink text-surface rounded-md font-black text-xs uppercase tracking-wider disabled:opacity-50 transition"
          >
            {isPending ? "Importation en cours..." : "Lancer l'importation"}
          </button>
        </form>

        {message && (
          <div
            className={`mt-4 p-3 rounded-md text-sm font-bold ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
          >
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
}
