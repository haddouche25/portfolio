"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import {
  localizeArticleCard,
  type LocalizedArticleCard,
} from "@/types/content";
import ArticleCard from "@/components/cards/ArticleCard";

interface RawArticle {
  id: string;
  slug: string;
  titleEn: string;
  titleFr: string;
  excerptEn: string | null;
  excerptFr: string | null;
  youtubeUrl: string | null;
  createdAt: string;
}

interface RawCategory {
  id: string;
  slug: string;
  titleEn: string;
  titleFr: string;
  descriptionEn: string | null;
  descriptionFr: string | null;
  articles: RawArticle[];
}

interface PillarClientViewProps {
  pillarSlug: string;
  pillarIcon: string | null;
  pillarTitleFr: string;
  pillarTitleEn: string;
  pillarDescFr: string | null;
  pillarDescEn: string | null;
  categories: RawCategory[];
}

export default function PillarClientView({
  pillarSlug,
  pillarIcon,
  pillarTitleFr,
  pillarTitleEn,
  pillarDescFr,
  pillarDescEn,
  categories,
}: PillarClientViewProps) {
  const { lang } = useLanguage();
  const isFr = lang === "FR";
  const locale = isFr ? "fr" : "en";
  const langSuffix = isFr ? "?lang=fr" : "";

  const pillarTitle = isFr ? pillarTitleFr : pillarTitleEn;
  const pillarDescription = isFr ? pillarDescFr : pillarDescEn;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16 font-sans">
      {/* Pillar Overview Header */}
      <header className="mb-14 border-b border-slate-200 dark:border-slate-800 pb-10">
        <div className="flex items-center gap-2.5 text-xs font-mono font-bold uppercase tracking-wider text-[#f25c27] mb-3">
          <span>{pillarIcon ?? "✦"}</span>
          <span>{isFr ? "Pilier d'apprentissage" : "Learning Pillar"}</span>
        </div>
        <h1 className="text-4xl font-black tracking-tight sm:text-5xl text-slate-900 dark:text-slate-50 leading-tight">
          {pillarTitle}
        </h1>
        {pillarDescription && (
          <p className="mt-4 max-w-3xl text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {pillarDescription}
          </p>
        )}
      </header>

      {/* Categories with Latest Articles */}
      {categories.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center bg-slate-50 dark:bg-slate-900/40">
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            {isFr
              ? "Aucune catégorie configurée dans ce pilier pour le moment."
              : "No categories configured in this pillar yet."}
          </p>
        </div>
      ) : (
        <div className="space-y-16">
          {categories.map((category) => {
            const categoryTitle = isFr ? category.titleFr : category.titleEn;
            const categoryDescription = isFr
              ? category.descriptionFr
              : category.descriptionEn;
            const categoryUrl = `/${pillarSlug}/${category.slug}${langSuffix}`;

            return (
              <section key={category.id} className="space-y-6">
                {/* Category Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-100 dark:border-slate-800/80 pb-4">
                  <div>
                    <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100">
                      <Link
                        href={categoryUrl}
                        className="hover:text-[#f25c27] dark:hover:text-[#f25c27] transition-colors"
                      >
                        {categoryTitle}
                      </Link>
                    </h2>
                    {categoryDescription && (
                      <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                        {categoryDescription}
                      </p>
                    )}
                  </div>

                  <Link
                    href={categoryUrl}
                    className="inline-flex items-center text-xs font-bold text-[#f25c27] hover:underline shrink-0 uppercase tracking-wider"
                  >
                    {isFr ? "Voir toute la catégorie" : "View all articles"}{" "}
                    &rarr;
                  </Link>
                </div>

                {/* Article Cards Grid */}
                {category.articles.length === 0 ? (
                  <p className="text-xs text-slate-400 dark:text-slate-500 italic">
                    {isFr
                      ? "Aucun article disponible pour l'instant."
                      : "No articles available yet."}
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.articles.map((rawArticle) => {
                      const articleDate = new Date(rawArticle.createdAt);

                      const cardPayload = {
                        ...rawArticle,
                        createdAt: articleDate,
                        updatedAt: articleDate,
                        published: true,
                        category: {
                          slug: category.slug,
                          titleEn: category.titleEn,
                          titleFr: category.titleFr,
                          pillar: {
                            slug: pillarSlug,
                            titleEn: pillarTitleEn,
                            titleFr: pillarTitleFr,
                          },
                        },
                      };

                      const localizedCard: LocalizedArticleCard =
                        localizeArticleCard(cardPayload, locale);

                      return (
                        <ArticleCard
                          key={rawArticle.id}
                          article={localizedCard}
                          langSuffix={langSuffix}
                        />
                      );
                    })}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
