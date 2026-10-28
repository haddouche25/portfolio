"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import ArticleGridCard, {
  ArticleCardData,
} from "@/components/blog/ArticleGridCard";

interface CategoryOption {
  slug: string;
  nameFr: string;
  nameEn: string;
}

interface BlogHubClientProps {
  articlesFr: ArticleCardData[];
  articlesEn: ArticleCardData[];
  categories: CategoryOption[];
}

export default function BlogHubClient({
  articlesFr,
  articlesEn,
  categories,
}: BlogHubClientProps) {
  const { lang } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const rawArticles = lang === "EN" ? articlesEn : articlesFr;

  const filteredArticles =
    selectedCategory === "ALL"
      ? rawArticles
      : rawArticles.filter((art) => art.categorySlug === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f1115] text-slate-900 dark:text-slate-100 py-12 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-200">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Title Header */}
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <nav className="flex justify-center items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <Link href="/" className="hover:text-[#f25c27] transition">
              {lang === "FR" ? "Accueil" : "Home"}
            </Link>
            <span>/</span>
            <span className="text-slate-700 dark:text-slate-200">Blog</span>
          </nav>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
            {lang === "FR" ? "Blog Didactique & " : "Engineering & "}
            <span className="relative inline-block whitespace-nowrap">
              <span className="relative z-10">
                {lang === "FR" ? "Ingénierie" : "Math Blog"}
              </span>
              <span
                aria-hidden
                className="absolute bottom-1 sm:bottom-2 left-0 right-0 h-3 sm:h-4 bg-[#f25c27] -rotate-1 rounded-sm -z-0 opacity-85"
              />
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {lang === "FR"
              ? "Analyses didactiques, démonstrations rigoureuses pour le secondaire et retours d'expérience en ingénierie logicielle full-stack."
              : "Formal mathematical deductions, high-school curriculum insights, and modern full-stack web engineering tutorials."}
          </p>
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-5xl mx-auto">
          <button
            type="button"
            onClick={() => setSelectedCategory("ALL")}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-150 ${
              selectedCategory === "ALL"
                ? "bg-[#f25c27] text-white shadow-md shadow-orange-500/25"
                : "bg-white dark:bg-[#1a1b1e] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-[#f25c27] hover:text-[#f25c27]"
            }`}
          >
            {lang === "FR" ? "Tous les articles" : "All Posts"}
          </button>

          {categories.map((cat) => {
            const isActive = selectedCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-150 ${
                  isActive
                    ? "bg-[#f25c27] text-white shadow-md shadow-orange-500/25"
                    : "bg-white dark:bg-[#1a1b1e] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-[#f25c27] hover:text-[#f25c27]"
                }`}
              >
                {lang === "FR" ? cat.nameFr : cat.nameEn}
              </button>
            );
          })}
        </div>

        {/* Grid Display */}
        {filteredArticles.length === 0 ? (
          <div className="p-16 text-center bg-white dark:bg-[#1a1b1e] border border-slate-200 dark:border-slate-800 rounded-3xl text-slate-500 shadow-sm max-w-xl mx-auto">
            <span className="text-4xl block mb-3">🔍</span>
            <p className="font-bold text-sm">
              {lang === "FR"
                ? "Aucun article dans cette catégorie pour le moment."
                : "No articles found in this category yet."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {filteredArticles.map((article, index) => (
              <React.Fragment key={article.id}>
                <ArticleGridCard article={article} lang={lang} />

                {/* Lead-gen card inserted after 2nd article */}
                {index === 1 && (
                  <div className="bg-white dark:bg-[#1a1b1e] rounded-3xl p-8 border-2 border-dashed border-[#f25c27]/40 flex flex-col justify-between text-center space-y-6 shadow-sm">
                    <div className="space-y-3">
                      <span className="inline-block px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-950/40 text-[#f25c27] text-[10px] font-black uppercase tracking-wider">
                        Diagnostic Gratuit
                      </span>
                      <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight">
                        {lang === "FR"
                          ? "Évaluez votre rigueur logique en 15 minutes"
                          : "Test Your Mathematical Foundations in 15 Min"}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        {lang === "FR"
                          ? "Accédez aux épreuves interactives linéaires avec feedback immédiat et explications KaTeX."
                          : "Take interactive diagnostic tests with instant scoring and detailed step-by-step proofs."}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                      <Link
                        href="/qcm"
                        className="inline-flex w-full items-center justify-center py-3.5 px-6 rounded-xl bg-[#f25c27] hover:bg-[#d94f1e] text-white font-black text-xs uppercase tracking-wider shadow-md shadow-orange-500/20 transition"
                      >
                        {lang === "FR"
                          ? "Accéder aux QCM →"
                          : "Start Free Test →"}
                      </Link>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
