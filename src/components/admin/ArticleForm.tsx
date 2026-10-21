"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { type ArticleFormData } from "@/types/content";
import { upsertArticleAction } from "@/app/(admin)/admin/articles/article-actions";
import MarkdownRenderer from "@/components/renderers/MarkdownRenderer";
import YouTubeEmbed from "@/components/renderers/YouTubeEmbed";

interface TaxonomyPillar {
  id: string;
  slug: string;
  titleEn: string;
  categories: {
    id: string;
    slug: string;
    titleEn: string;
  }[];
}

interface ArticleFormProps {
  pillars: TaxonomyPillar[];
  initialData?: ArticleFormData;
  articleId?: string;
}

export default function ArticleForm({
  pillars,
  initialData,
  articleId,
}: ArticleFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [statusMessage, setStatusMessage] = useState<{
    text: string;
    isError: boolean;
  } | null>(null);

  // Active language tab: "en" | "fr"
  const [activeLangTab, setActiveLangTab] = useState<"en" | "fr">("en");

  // Determine initial selected pillar based on initial categoryId
  const initialCategoryPillar = pillars.find((p) =>
    p.categories.some((c) => c.id === initialData?.categoryId),
  );

  const [selectedPillarId, setSelectedPillarId] = useState<string>(
    initialCategoryPillar?.id || pillars[0]?.id || "",
  );

  const [formData, setFormData] = useState<ArticleFormData>(
    initialData || {
      slug: "",
      categoryId: pillars[0]?.categories[0]?.id || "",
      youtubeUrl: "",
      published: false,
      titleEn: "",
      titleFr: "",
      excerptEn: "",
      excerptFr: "",
      contentEn: "",
      contentFr: "",
    },
  );

  // Filter categories by selected pillar
  const availableCategories =
    pillars.find((p) => p.id === selectedPillarId)?.categories || [];

  const handlePillarChange = (pillarId: string) => {
    setSelectedPillarId(pillarId);
    const firstCat = pillars.find((p) => p.id === pillarId)?.categories[0];
    setFormData((prev) => ({
      ...prev,
      categoryId: firstCat ? firstCat.id : "",
    }));
  };

  const generateSlugFromTitle = () => {
    const base = formData.titleEn || formData.titleFr;
    const slugified = base
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setFormData((prev) => ({ ...prev, slug: slugified }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    startTransition(async () => {
      const res = await upsertArticleAction(articleId || null, formData);
      if (res.success) {
        router.push("/admin/articles");
        router.refresh();
      } else {
        setStatusMessage({
          text: res.message || "An error occurred.",
          isError: true,
        });
      }
    });
  };

  const currentTitle =
    activeLangTab === "en" ? formData.titleEn : formData.titleFr;
  const currentExcerpt =
    activeLangTab === "en" ? formData.excerptEn : formData.excerptFr;
  const currentContent =
    activeLangTab === "en" ? formData.contentEn : formData.contentFr;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            {articleId ? "Edit Article" : "Create New Article"}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Synchronized English/French contents with live LaTeX ($...$) and
            Code block rendering.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/articles"
            className="px-4 py-2 rounded-lg border border-slate-700 bg-slate-800 text-xs font-semibold text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isPending}
            className="px-5 py-2 rounded-lg bg-blue-600 text-xs font-semibold text-white shadow-sm hover:bg-blue-500 disabled:opacity-50 transition-colors"
          >
            {isPending
              ? "Saving..."
              : articleId
                ? "Update Article"
                : "Publish / Save"}
          </button>
        </div>
      </div>

      {statusMessage && (
        <div
          className={`p-4 rounded-xl border text-sm ${
            statusMessage.isError
              ? "bg-red-950/40 border-red-800 text-red-300"
              : "bg-emerald-950/40 border-emerald-800 text-emerald-300"
          }`}
        >
          {statusMessage.text}
        </div>
      )}

      {/* Primary Metadata Box */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 rounded-xl border border-slate-800 bg-slate-950/60">
        {/* Pillar Selector */}
        <div>
          <label className="block text-xs font-mono uppercase text-slate-400 mb-2">
            Pillar
          </label>
          <select
            value={selectedPillarId}
            onChange={(e) => handlePillarChange(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
          >
            {pillars.map((p) => (
              <option key={p.id} value={p.id}>
                {p.titleEn} ({p.slug})
              </option>
            ))}
          </select>
        </div>

        {/* Category Selector */}
        <div>
          <label className="block text-xs font-mono uppercase text-slate-400 mb-2">
            Category
          </label>
          <select
            value={formData.categoryId}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, categoryId: e.target.value }))
            }
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
          >
            {availableCategories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.titleEn} ({c.slug})
              </option>
            ))}
          </select>
        </div>

        {/* Slug input + Auto-gen */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-mono uppercase text-slate-400">
              Slug
            </label>
            <button
              type="button"
              onClick={generateSlugFromTitle}
              className="text-[10px] font-mono text-blue-400 hover:underline"
            >
              Auto-generate
            </button>
          </div>
          <input
            type="text"
            required
            value={formData.slug}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, slug: e.target.value }))
            }
            placeholder="my-article-slug"
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Visibility Status */}
        <div>
          <label className="block text-xs font-mono uppercase text-slate-400 mb-2">
            Visibility Status
          </label>
          <div className="flex items-center gap-3 h-10">
            <label className="inline-flex items-center gap-2 cursor-pointer text-sm text-slate-300">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    published: e.target.checked,
                  }))
                }
                className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-0"
              />
              <span>Published Live</span>
            </label>
          </div>
        </div>

        {/* YouTube Video Embed URL */}
        <div className="md:col-span-4">
          <label className="block text-xs font-mono uppercase text-slate-400 mb-2">
            Featured YouTube URL or Video ID (Optional)
          </label>
          <input
            type="text"
            value={formData.youtubeUrl || ""}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, youtubeUrl: e.target.value }))
            }
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Language Switcher Tabs */}
      <div className="flex border-b border-slate-800">
        <button
          type="button"
          onClick={() => setActiveLangTab("en")}
          className={`flex items-center gap-2 px-6 py-3 border-b-2 text-sm font-semibold transition-colors ${
            activeLangTab === "en"
              ? "border-blue-500 text-blue-400 bg-slate-950/40"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <span>English Content</span>
          {formData.titleEn && (
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
          )}
        </button>
        <button
          type="button"
          onClick={() => setActiveLangTab("fr")}
          className={`flex items-center gap-2 px-6 py-3 border-b-2 text-sm font-semibold transition-colors ${
            activeLangTab === "fr"
              ? "border-blue-500 text-blue-400 bg-slate-950/40"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <span>French Content (Français)</span>
          {formData.titleFr && (
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
          )}
        </button>
      </div>

      {/* Split-Screen Editor & Live KaTeX/Code Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Side: Inputs */}
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-2">
              Title ({activeLangTab.toUpperCase()})
            </label>
            <input
              type="text"
              required
              value={
                activeLangTab === "en" ? formData.titleEn : formData.titleFr
              }
              onChange={(e) => {
                const val = e.target.value;
                setFormData((prev) =>
                  activeLangTab === "en"
                    ? { ...prev, titleEn: val }
                    : { ...prev, titleFr: val },
                );
              }}
              placeholder={
                activeLangTab === "en"
                  ? "e.g., Understanding Singular Value Decomposition"
                  : "e.g., Comprendre la décomposition en valeurs singulières"
              }
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-base text-white focus:outline-none focus:border-blue-500 font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-2">
              Summary Excerpt ({activeLangTab.toUpperCase()})
            </label>
            <textarea
              rows={2}
              value={
                (activeLangTab === "en"
                  ? formData.excerptEn
                  : formData.excerptFr) || ""
              }
              onChange={(e) => {
                const val = e.target.value;
                setFormData((prev) =>
                  activeLangTab === "en"
                    ? { ...prev, excerptEn: val }
                    : { ...prev, excerptFr: val },
                );
              }}
              placeholder="Short introductory overview for listing cards and search snippets..."
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-mono uppercase text-slate-400">
                Body Markdown ({activeLangTab.toUpperCase()})
              </label>
              <span className="text-[11px] font-mono text-slate-500">
                Supports $f(x)$ inline, $$...$$ block, and ```code fences
              </span>
            </div>
            <textarea
              rows={22}
              required
              value={
                activeLangTab === "en" ? formData.contentEn : formData.contentFr
              }
              onChange={(e) => {
                const val = e.target.value;
                setFormData((prev) =>
                  activeLangTab === "en"
                    ? { ...prev, contentEn: val }
                    : { ...prev, contentFr: val },
                );
              }}
              placeholder="# Introduction..."
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 font-mono text-xs leading-relaxed text-slate-100 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Right Side: Realtime Rendered View */}
        <div className="sticky top-20 rounded-xl border border-slate-800 bg-slate-950/80 p-6 overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-6">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Live Preview ({activeLangTab.toUpperCase()})
            </span>
            <span className="text-[11px] font-mono text-slate-500">
              Matches public article layout
            </span>
          </div>

          <div className="max-h-[800px] overflow-y-auto pr-2 space-y-6">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              {currentTitle || (
                <span className="text-slate-600 italic">
                  No title entered yet
                </span>
              )}
            </h1>

            {currentExcerpt && (
              <p className="text-sm text-slate-400 italic border-l-2 border-slate-700 pl-3">
                {currentExcerpt}
              </p>
            )}

            {formData.youtubeUrl && (
              <YouTubeEmbed
                title="{currentTitle}"
                urlOrId="{formData.youtubeUrl}"
              />
            )}

            <div className="border-t border-slate-800 pt-6">
              {currentContent ? (
                <MarkdownRenderer content="{currentContent}" />
              ) : (
                <p className="text-xs text-slate-600 font-mono italic">
                  Markdown rendered preview will appear here in real time...
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
