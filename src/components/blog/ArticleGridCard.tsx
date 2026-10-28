"use client";

import React from "react";
import Link from "next/link";

export interface ArticleCardData {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  categoryTitle: string;
  pillarSlug: string;
  categorySlug: string;
  readingTimeMinutes?: number;
  isNew?: boolean;
  isFeatured?: boolean;
  createdAt: string;
  author?: {
    name: string;
    role: string;
    avatarUrl?: string;
  };
}

interface ArticleGridCardProps {
  article: ArticleCardData;
  lang: "FR" | "EN";
}

export default function ArticleGridCard({
  article,
  lang,
}: ArticleGridCardProps) {
  const href = `/${article.pillarSlug}/${article.categorySlug}/${article.slug}`;
  const readingTime = article.readingTimeMinutes || 8;

  const formattedDate = new Intl.DateTimeFormat(
    lang === "EN" ? "en-US" : "fr-FR",
    { month: "short", day: "numeric", year: "numeric" },
  ).format(new Date(article.createdAt));

  const author = article.author || {
    name: "Mohamed Haddouche",
    role:
      lang === "FR"
        ? "Coach Maths & Ingénieur Logiciel"
        : "Math Coach & Software Engineer",
  };

  return (
    <article className="group flex flex-col bg-white dark:bg-[#1a1b1e] rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Visual Header Banner */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-[#f25c27] flex items-center justify-between p-6 select-none">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />

        {/* Status Ribbon */}
        {(article.isNew || article.isFeatured) && (
          <div className="absolute top-4 left-[-35px] w-32 -rotate-45 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest text-center py-1 shadow-md">
            {article.isFeatured
              ? lang === "FR"
                ? "À LA UNE"
                : "FEATURED"
              : "NEW"}
          </div>
        )}

        {/* Thumbnail Title */}
        <div className="relative z-10 max-w-[65%] space-y-1">
          <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-orange-300">
            {article.categoryTitle}
          </span>
          <h3 className="text-white text-base sm:text-lg font-black leading-snug line-clamp-3 group-hover:text-orange-200 transition-colors">
            {article.title}
          </h3>
        </div>

        {/* Math & Didactics Emblem */}
        <div className="relative z-10 w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center text-white shadow-2xl group-hover:scale-105 transition-transform duration-300">
          <span className="text-3xl font-black font-mono text-orange-400">
            &Sigma;
          </span>
          <span className="text-[9px] font-black uppercase tracking-widest text-slate-200">
            Didactique
          </span>
        </div>

        <div className="absolute bottom-3 left-4 text-[9px] font-mono font-bold text-slate-400 bg-black/40 px-2 py-0.5 rounded">
          math <span className="text-[#f25c27]">coach</span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
            <span className="hover:text-[#f25c27] transition-colors">
              {article.categoryTitle}
            </span>
            <span className="flex items-center gap-1 font-mono">
              ⏱ {readingTime} min
            </span>
          </div>

          <h2 className="text-lg font-black text-slate-900 dark:text-white leading-snug group-hover:text-[#f25c27] transition-colors line-clamp-2">
            <Link href={href}>{article.title}</Link>
          </h2>

          {article.excerpt && (
            <p className="mt-2.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
              {article.excerpt}
            </p>
          )}
        </div>

        {/* Author Footer */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-slate-900 to-[#f25c27] text-white flex items-center justify-center font-black text-xs shadow-sm">
              MH
            </div>
            <div className="text-left">
              <div className="text-xs font-black text-slate-900 dark:text-slate-100 leading-tight">
                {author.name}
              </div>
              <div className="text-[10px] text-slate-400 leading-tight truncate max-w-[140px] sm:max-w-[160px]">
                {author.role}
              </div>
            </div>
          </div>

          <div className="text-right font-mono text-[10px] text-slate-400">
            {formattedDate}
          </div>
        </div>
      </div>
    </article>
  );
}
