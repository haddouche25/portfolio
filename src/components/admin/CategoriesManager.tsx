"use client";

import { useState } from "react";
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/lib/actions/taxonomy";

interface PillarOption {
  id: string;
  slug: string;
  titleEn: string;
}

interface CategoryWithRelation {
  id: string;
  slug: string;
  pillarId: string;
  titleEn: string;
  titleFr: string;
  descriptionEn: string | null;
  descriptionFr: string | null;
  pillar: {
    slug: string;
    titleEn: string;
  };
  _count: {
    articles: number;
  };
}

export default function CategoriesManager({
  initialCategories,
  pillars,
}: {
  initialCategories: CategoryWithRelation[];
  pillars: PillarOption[];
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
    const res = await createCategory(formData);

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
    const res = await updateCategory(id, formData);

    if (res?.error) {
      setErrorMessage(res.error);
    } else {
      setEditingId(null);
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string, slug: string) => {
    if (
      !window.confirm(
        `Delete category "${slug}"? This action cannot be undone.`,
      )
    )
      return;

    setErrorMessage(null);
    const res = await deleteCategory(id);
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

      {/* Add New Category */}
      <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-6">
        <h2 className="text-base font-bold text-white mb-4">
          Add New Category
        </h2>
        <form
          onSubmit={handleCreate}
          className="grid grid-cols-1 sm:grid-cols-4 gap-4"
        >
          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1">
              Parent Pillar *
            </label>
            <select
              name="pillarId"
              required
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-white focus:border-blue-500 outline-none"
            >
              <option value="">Select Pillar</option>
              {pillars.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.titleEn} (/{p.slug})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1">
              Category Slug *
            </label>
            <input
              name="slug"
              required
              placeholder="e.g. analysis or react"
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
              placeholder="Mathematical Analysis"
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
              placeholder="Analyse Mathématique"
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-600 focus:border-blue-500 outline-none"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-[11px] font-mono text-slate-400 mb-1">
              Desc (EN)
            </label>
            <input
              name="descriptionEn"
              placeholder="Limits, integrals, and real numbers"
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-600 focus:border-blue-500 outline-none"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-[11px] font-mono text-slate-400 mb-1">
              Desc (FR)
            </label>
            <input
              name="descriptionFr"
              placeholder="Limites, intégrales et analyse réelle"
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-600 focus:border-blue-500 outline-none"
            />
          </div>
          <div className="sm:col-span-4 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500 disabled:opacity-50 transition-colors"
            >
              {isSubmitting ? "Saving..." : "Create Category"}
            </button>
          </div>
        </form>
      </div>

      {/* Category Records Table */}
      <div className="rounded-xl border border-slate-800 bg-slate-950/60 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-900/60 text-xs font-mono uppercase text-slate-400 border-b border-slate-800">
            <tr>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Parent Pillar</th>
              <th className="px-6 py-4">Articles Count</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-sans">
            {initialCategories.map((cat) => {
              const isEditing = editingId === cat.id;

              if (isEditing) {
                return (
                  <tr key={cat.id} className="bg-slate-900/30">
                    <td colSpan={4} className="p-6">
                      <form
                        onSubmit={(e) => handleUpdate(cat.id, e)}
                        className="grid grid-cols-1 sm:grid-cols-4 gap-4"
                      >
                        <div>
                          <label className="text-[10px] font-mono text-slate-500">
                            Pillar
                          </label>
                          <select
                            name="pillarId"
                            defaultValue={cat.pillarId}
                            required
                            className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white"
                          >
                            {pillars.map((p) => (
                              <option key={p.id} value={p.id}>
                                {p.titleEn}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] font-mono text-slate-500">
                            Slug
                          </label>
                          <input
                            name="slug"
                            defaultValue={cat.slug}
                            required
                            className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-mono text-slate-500">
                            Title EN
                          </label>
                          <input
                            name="titleEn"
                            defaultValue={cat.titleEn}
                            required
                            className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-mono text-slate-500">
                            Title FR
                          </label>
                          <input
                            name="titleFr"
                            defaultValue={cat.titleFr}
                            required
                            className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white"
                          />
                        </div>
                        <div className="sm:col-span-4 flex justify-end gap-2">
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
                  key={cat.id}
                  className="hover:bg-slate-900/40 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="font-semibold text-white">
                      {cat.titleEn}
                    </div>
                    <div className="text-xs text-slate-400">{cat.titleFr}</div>
                    <div className="font-mono text-[11px] text-slate-500">
                      /{cat.slug}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 rounded bg-blue-950/60 border border-blue-900/60 px-2.5 py-0.5 text-xs font-mono text-blue-300">
                      <span>{cat.pillar.slug}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-xs text-slate-300">
                      {cat._count.articles} article
                      {cat._count.articles !== 1 ? "s" : ""}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-3 text-xs font-semibold">
                    <button
                      onClick={() => setEditingId(cat.id)}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id, cat.slug)}
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
