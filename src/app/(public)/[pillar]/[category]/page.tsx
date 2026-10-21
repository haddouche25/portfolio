import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import {
  type CategoryPageProps,
  resolveLocale,
  localizeArticleCard,
} from "@/types/content";
import ArticleCard from "@/components/cards/ArticleCard";

export async function generateMetadata({
  params,
  searchParams,
}: CategoryPageProps): Promise<Metadata> {
  const { pillar, category } = await params;
  const { lang } = await searchParams;
  const locale = resolveLocale(lang);

  const categoryRecord = await prisma.category.findFirst({
    where: {
      slug: category,
      pillar: { slug: pillar },
    },
    include: { pillar: true },
  });

  if (!categoryRecord) {
    return { title: "Category Not Found" };
  }

  const title =
    locale === "fr" ? categoryRecord.titleFr : categoryRecord.titleEn;
  const description =
    locale === "fr"
      ? categoryRecord.descriptionFr
      : categoryRecord.descriptionEn;

  return {
    title: `${title} | Portfolio`,
    description: description ?? undefined,
  };
}

export default async function CategoryHubPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { pillar, category } = await params;
  const { lang } = await searchParams;
  const locale = resolveLocale(lang);
  const langSuffix = locale === "fr" ? "?lang=fr" : "";
  const isFr = locale === "fr";

  const categoryRecord = await prisma.category.findFirst({
    where: {
      slug: category,
      pillar: { slug: pillar },
    },
    include: {
      pillar: true,
      articles: {
        where: { published: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!categoryRecord) {
    notFound();
  }

  const categoryTitle = isFr ? categoryRecord.titleFr : categoryRecord.titleEn;
  const categoryDescription = isFr
    ? categoryRecord.descriptionFr
    : categoryRecord.descriptionEn;
  const pillarTitle = isFr
    ? categoryRecord.pillar.titleFr
    : categoryRecord.pillar.titleEn;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 font-medium"
      >
        <Link
          href={`/${pillar}${langSuffix}`}
          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          {pillarTitle}
        </Link>
        <span className="text-slate-400 dark:text-slate-600">/</span>
        <span className="text-slate-800 dark:text-slate-200">
          {categoryTitle}
        </span>
      </nav>

      <header className="mb-12 border-b border-slate-200/80 dark:border-slate-800/80 pb-8">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-900 dark:text-slate-50">
          {categoryTitle}
        </h1>
        {categoryDescription && (
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            {categoryDescription}
          </p>
        )}
      </header>

      {categoryRecord.articles.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            {isFr
              ? "Aucun article publié dans cette catégorie pour le moment."
              : "No articles published in this category yet."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryRecord.articles.map((rawArticle) => {
            const cardPayload = {
              ...rawArticle,
              category: {
                slug: categoryRecord.slug,
                titleEn: categoryRecord.titleEn,
                titleFr: categoryRecord.titleFr,
                pillar: {
                  slug: categoryRecord.pillar.slug,
                  titleEn: categoryRecord.pillar.titleEn,
                  titleFr: categoryRecord.pillar.titleFr,
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
    </div>
  );
}
