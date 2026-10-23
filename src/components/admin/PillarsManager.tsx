"use client";

import { useState } from "react";
import {
  createPillar,
  updatePillar,
  deletePillar,
} from "@/lib/actions/taxonomy";

interface PillarWithCounts {
  id: string;
  slug: string;
  titleEn: string;
  titleFr: string;
  descriptionEn: string | null;
  descriptionFr: string | null;
  icon: string | null;
  _count: {
    categories: number;
  };
}

export default function PillarsManager({
  initialPillars,
}: {
  initialPillars: PillarWithCounts[];
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const res = await createPillar(formData);

    if (res?.error) {
      setErrorMessage(res.error);
    } else {
      form.reset();
    }
    setIsSubmitting(false);
  };

  const handleUpdate = async (
    id: string,
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    const res = await updatePillar(id, formData);

    if (res?.error) {
      setErrorMessage(res.error);
    } else {
      setEditingId(null);
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string, slug: string) => {
    if (
      !window.confirm(`Delete pillar "${slug}"? This action cannot be undone.`)
    )
      return;

    setErrorMessage(null);
    const res = await deletePillar(id);
    if (res?.error) {
      setErrorMessage(res.error);
    }
  };

  return (
    <div className="space-y-8">
      {errorMessage && (
        <div className="rounded-xl border border-red-500/30 bg-red-950/40 p-4 text-xs font-mono text-red-300">
          <strong>Error:</strong> {errorMessage}
        </div>
      )}

      {/* Creation Form */}
      <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-6">
        <h2 className="text-base font-bold text-white mb-4">Add New Pillar</h2>
        <form
          onSubmit={handleCreate}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1">
              Slug *
            </label>
            <input
              name="slug"
              required
              placeholder="e.g. computer-science"
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-600 focus:border-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1">
              Title (EN) *
            </label>
            <input
              name="titleEn"
              required
              placeholder="Computer Science"
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-600 focus:border-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1">
              Title (FR) *
            </label>
            <input
              name="titleFr"
              required
              placeholder="Informatique"
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-600 focus:border-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1">
              Icon (Unicode/Text)
            </label>
            <input
              name="icon"
              placeholder="e.g. 💻 or ∑"
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-600 focus:border-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1">
              Desc (EN)
            </label>
            <input
              name="descriptionEn"
              placeholder="Algorithms, software & systems"
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-600 focus:border-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1">
              Desc (FR)
            </label>
            <input
              name="descriptionFr"
              placeholder="Algorithmique et systèmes"
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-600 focus:border-blue-500 outline-none"
            />
          </div>
          <div className="sm:col-span-3 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500 disabled:opacity-50 transition-colors"
            >
              {isSubmitting ? "Saving..." : "Create Pillar"}
            </button>
          </div>
        </form>
      </div>

      {/* Pillars List */}
      <div className="rounded-xl border border-slate-800 bg-slate-950/60 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-900/60 text-xs font-mono uppercase text-slate-400 border-b border-slate-800">
            <tr>
              <th className="px-6 py-4">Pillar</th>
              <th className="px-6 py-4">Slug</th>
              <th className="px-6 py-4">Categories</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-sans">
            {initialPillars.map((pillar) => {
              const isEditing = editingId === pillar.id;

              if (isEditing) {
                return (
                  <tr key={pillar.id} className="bg-slate-900/30">
                    <td colSpan={4} className="p-6">
                      <form
                        onSubmit={(e) => handleUpdate(pillar.id, e)}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                      >
                        <input
                          name="slug"
                          defaultValue={pillar.slug}
                          required
                          className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white"
                        />
                        <input
                          name="titleEn"
                          defaultValue={pillar.titleEn}
                          required
                          className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white"
                        />
                        <input
                          name="titleFr"
                          defaultValue={pillar.titleFr}
                          required
                          className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white"
                        />
                        <input
                          name="icon"
                          defaultValue={pillar.icon || ""}
                          placeholder="Icon"
                          className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white"
                        />
                        <input
                          name="descriptionEn"
                          defaultValue={pillar.descriptionEn || ""}
                          placeholder="Desc (EN)"
                          className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white"
                        />
                        <input
                          name="descriptionFr"
                          defaultValue={pillar.descriptionFr || ""}
                          placeholder="Desc (FR)"
                          className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white"
                        />
                        <div className="sm:col-span-3 flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setEditingId(null)}
                            className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-500"
                          >
                            Save Changes
                          </button>
                        </div>
                      </form>
                    </td>
                  </tr>
                );
              }

              return (
                <tr
                  key={pillar.id}
                  className="hover:bg-slate-900/40 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 font-semibold text-white">
                      <span>{pillar.icon || "✦"}</span>
                      <span>{pillar.titleEn}</span>
                      <span className="text-slate-500 font-normal">
                        / {pillar.titleFr}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-slate-400">
                    /{pillar.slug}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex rounded bg-blue-950/60 border border-blue-900/60 px-2.5 py-0.5 text-xs font-mono text-blue-300">
                      {pillar._count.categories} child categories
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-3 text-xs font-semibold">
                    <button
                      onClick={() => setEditingId(pillar.id)}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(pillar.id, pillar.slug)}
                      className="text-red-400 hover:text-red-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
