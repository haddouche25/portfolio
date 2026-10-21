import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import {
  type BasePageProps,
  resolveLocale,
  localizeArticleCard,
} from "@/types/content";
import ArticleCard from "@/components/cards/ArticleCard";

export async function generateMetadata({
  searchParams,
}: BasePageProps): Promise<Metadata> {
  const { lang } = await searchParams;
  const locale = resolveLocale(lang);

  return {
    title:
      locale === "fr"
        ? "Accueil | Mathématiques, Programmation & Systèmes"
        : "Home | Mathematics, Software & Systems",
    description:
      locale === "fr"
        ? "Plateforme technique et portfolio explorant les mathématiques appliquées, l'ingénierie logicielle et les systèmes informatiques."
        : "Technical portfolio and learning platform covering applied mathematics, software engineering, and computer systems.",
  };
}

export default async function HomePage({ searchParams }: BasePageProps) {
  const { lang } = await searchParams;
  const locale = resolveLocale(lang);
  const langSuffix = locale === "fr" ? "?lang=fr" : "";
  const isFr = locale === "fr";

  const [pillars, recentArticles] = await Promise.all([
    prisma.pillar.findMany({
      orderBy: { slug: "asc" },
      include: {
        _count: {
          select: { categories: true },
        },
      },
    }),
    prisma.article.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 6,
      include: {
        category: {
          include: {
            pillar: true,
          },
        },
      },
    }),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20 space-y-20">
      <section className="space-y-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 dark:border-blue-900/60 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 text-xs font-mono font-medium text-blue-700 dark:text-blue-300">
          <span>&Sigma;</span>
          <span>
            {isFr ? "Recherche & Enseignement" : "Research & Engineering"}
          </span>
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-slate-900 dark:text-slate-50 leading-tight">
          {isFr ? (
            <>
              Explorer les maths, le code et l&apos;informatique avec{" "}
              <span className="text-blue-600 dark:text-blue-400">rigueur</span>.
            </>
          ) : (
            <>
              Bridging mathematics, software engineering, and{" "}
              <span className="text-blue-600 dark:text-blue-400">systems</span>.
            </>
          )}
        </h1>

        <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
          {isFr
            ? "Une plateforme d'apprentissage bilingue combinant dérivations mathématiques précises (LaTeX), implémentations algorithmiques concrètes et analyses architecturales de systèmes."
            : "A technical portfolio and knowledge base combining rigorous math derivations (LaTeX), software engineering implementations, and computing architectures."}
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Link
            href={`/maths${langSuffix}`}
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
          >
            {isFr ? "Parcourir les piliers" : "Explore Pillars"}
          </Link>
          <Link
            href={`/contact${langSuffix}`}
            className="rounded-lg border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors"
          >
            {isFr ? "Me contacter" : "Contact"}
          </Link>
        </div>
      </section>

      <section className="space-y-8">
        <div className="border-b border-slate-200/80 dark:border-slate-800/80 pb-4">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {isFr ? "Les Trois Piliers" : "The Core Pillars"}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {isFr
              ? "Les domaines directeurs de la plateforme."
              : "The primary learning and knowledge foundations of this platform."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar) => {
            const title = isFr ? pillar.titleFr : pillar.titleEn;
            const description = isFr
              ? pillar.descriptionFr
              : pillar.descriptionEn;
            const href = `/${pillar.slug}${langSuffix}`;

            return (
              <Link
                key={pillar.id}
                href={href}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 p-7 transition-all hover:-translate-y-1 hover:border-blue-500/50 hover:bg-white dark:hover:bg-slate-900 hover:shadow-lg"
              >
                <div className="space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 text-xl font-bold font-mono">
                    {pillar.icon ?? "Σ"}
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {title}
                  </h3>

                  {description && (
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {description}
                    </p>
                  )}
                </div>

                <div className="mt-8 flex items-center justify-between pt-4 border-t border-slate-200/60 dark:border-slate-800/60 text-xs font-mono text-slate-500">
                  <span>
                    {pillar._count.categories}{" "}
                    {isFr ? "catégories" : "categories"}
                  </span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                    &rarr;
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="space-y-8">
        <div className="border-b border-slate-200/80 dark:border-slate-800/80 pb-4">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {isFr ? "Dernières Publications" : "Recent Publications"}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {isFr
              ? "Derniers articles, tutoriels et notes de recherche ajoutés."
              : "Latest articles, tutorials, and research notes."}
          </p>
        </div>

        {recentArticles.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {isFr
                ? "Aucune publication pour le moment."
                : "No articles published yet."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentArticles.map((rawArticle) => {
              const cardPayload = {
                ...rawArticle,
                category: {
                  slug: rawArticle.category.slug,
                  titleEn: rawArticle.category.titleEn,
                  titleFr: rawArticle.category.titleFr,
                  pillar: {
                    slug: rawArticle.category.pillar.slug,
                    titleEn: rawArticle.category.pillar.titleEn,
                    titleFr: rawArticle.category.pillar.titleFr,
                  },
                },
              };

              const localizedCard = localizeArticleCard(cardPayload, locale);

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
    </div>
  );
}
