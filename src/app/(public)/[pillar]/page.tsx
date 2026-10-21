import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import {
  type PillarPageProps,
  resolveLocale,
  localizeArticleCard,
} from "@/types/content";
import ArticleCard from "@/components/cards/ArticleCard";

export async function generateMetadata({
  params,
  searchParams,
}: PillarPageProps): Promise<Metadata> {
  const { pillar } = await params;
  const { lang } = await searchParams;
  const locale = resolveLocale(lang);

  const pillarRecord = await prisma.pillar.findUnique({
    where: { slug: pillar },
  });

  if (!pillarRecord) {
    return { title: "Pillar Not Found" };
  }

  const title = locale === "fr" ? pillarRecord.titleFr : pillarRecord.titleEn;
  const description =
    locale === "fr" ? pillarRecord.descriptionFr : pillarRecord.descriptionEn;

  return {
    title: `${title} | Portfolio`,
    description: description ?? undefined,
  };
}

export default async function PillarHubPage({
  params,
  searchParams,
}: PillarPageProps) {
  const { pillar } = await params;
  const { lang } = await searchParams;
  const locale = resolveLocale(lang);
  const langSuffix = locale === "fr" ? "?lang=fr" : "";
  const isFr = locale === "fr";

  const pillarData = await prisma.pillar.findUnique({
    where: { slug: pillar },
    include: {
      categories: {
        include: {
          articles: {
            where: { published: true },
            orderBy: { createdAt: "desc" },
            take: 3,
          },
        },
      },
    },
  });

  if (!pillarData) {
    notFound();
  }

  const pillarTitle = isFr ? pillarData.titleFr : pillarData.titleEn;
  const pillarDescription = isFr
    ? pillarData.descriptionFr
    : pillarData.descriptionEn;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
      {/* Pillar Overview Header */}
      <header className="mb-14 border-b border-slate-200/80 dark:border-slate-800/80 pb-10">
        <div className="flex items-center gap-3 text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
          <span>{pillarData.icon ?? "✦"}</span>
          <span>{isFr ? "Pilier d'apprentissage" : "Learning Pillar"}</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-slate-900 dark:text-slate-50">
          {pillarTitle}
        </h1>
        {pillarDescription && (
          <p className="mt-4 max-w-3xl text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {pillarDescription}
          </p>
        )}
      </header>

      {/* Categories with Latest 3 Articles */}
      {pillarData.categories.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {isFr
              ? "Aucune catégorie configurée dans ce pilier pour le moment."
              : "No categories configured in this pillar yet."}
          </p>
        </div>
      ) : (
        <div className="space-y-16">
          {pillarData.categories.map((category) => {
            const categoryTitle = isFr ? category.titleFr : category.titleEn;
            const categoryDescription = isFr
              ? category.descriptionFr
              : category.descriptionEn;
            const categoryUrl = `/${pillarData.slug}/${category.slug}${langSuffix}`;

            return (
              <section key={category.id} className="space-y-6">
                {/* Category Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-100 dark:border-slate-900 pb-4">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                      <Link
                        href={categoryUrl}
                        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {categoryTitle}
                      </Link>
                    </h2>
                    {categoryDescription && (
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
                        {categoryDescription}
                      </p>
                    )}
                  </div>

                  <Link
                    href={categoryUrl}
                    className="inline-flex items-center text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline shrink-0"
                  >
                    {isFr ? "Voir toute la catégorie" : "View all articles"}{" "}
                    &rarr;
                  </Link>
                </div>

                {/* Article Cards Grid */}
                {category.articles.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">
                    {isFr
                      ? "Aucun article disponible pour l'instant."
                      : "No articles available yet."}
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.articles.map((rawArticle) => {
                      const cardPayload = {
                        ...rawArticle,
                        category: {
                          slug: category.slug,
                          titleEn: category.titleEn,
                          titleFr: category.titleFr,
                          pillar: {
                            slug: pillarData.slug,
                            titleEn: pillarData.titleEn,
                            titleFr: pillarData.titleFr,
                          },
                        },
                      };

                      const localizedCard = localizeArticleCard(
                        cardPayload,
                        locale,
                      );

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
