"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import YouTubeEmbed from "@/components/renderers/YouTubeEmbed";
import MarkdownRenderer from "@/components/renderers/MarkdownRenderer";

interface LocalizedData {
  title: string;
  excerpt: string | null;
  content: string;
  categoryTitle: string;
  pillarTitle: string;
}

interface ArticleClientViewProps {
  pillar: string;
  category: string;
  createdAt: string;
  youtubeUrl: string | null;
  fr: LocalizedData;
  en: LocalizedData;
}

export default function ArticleClientView({
  pillar,
  category,
  createdAt,
  youtubeUrl,
  fr,
  en,
}: ArticleClientViewProps) {
  const { lang } = useLanguage();
  const current = lang === "EN" ? en : fr;

  const formattedDate = new Intl.DateTimeFormat(
    lang === "EN" ? "en-US" : "fr-FR",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  ).format(new Date(createdAt));

  return (
    <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16 font-sans">
      {/* Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className="mb-8 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium"
      >
        <Link
          href={`/${pillar}`}
          className="hover:text-[#f25c27] dark:hover:text-[#f25c27] transition-colors"
        >
          {current.pillarTitle}
        </Link>
        <span className="text-slate-400 dark:text-slate-600">/</span>
        <Link
          href={`/${pillar}/${category}`}
          className="hover:text-[#f25c27] dark:hover:text-[#f25c27] transition-colors"
        >
          {current.categoryTitle}
        </Link>
      </nav>

      {/* Header Section */}
      <header className="mb-10 space-y-4">
        <h1 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl text-slate-900 dark:text-slate-50 leading-tight">
          {current.title}
        </h1>

        {current.excerpt && (
          <p className="text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            {current.excerpt}
          </p>
        )}

        <div className="flex items-center gap-4 text-xs font-mono text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-200 dark:border-slate-800">
          <time dateTime={createdAt}>{formattedDate}</time>
          <span>&bull;</span>
          <span className="rounded-full bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-900/60 px-2.5 py-0.5 text-xs text-[#f25c27] font-bold">
            {current.categoryTitle}
          </span>
        </div>
      </header>

      {/* Featured Video Embed */}
      {youtubeUrl && (
        <section className="mb-10">
          <YouTubeEmbed urlOrId={youtubeUrl} title={current.title} />
        </section>
      )}

      {/* Markdown, KaTeX & Code Content */}
      <section className="border-t border-slate-200 dark:border-slate-800 pt-8">
        <MarkdownRenderer content={current.content} />
      </section>
    </article>
  );
}
