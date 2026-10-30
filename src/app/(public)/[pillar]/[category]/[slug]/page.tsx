import type { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import {
  type ArticlePageProps,
  articleWithRelationsArgs,
  localizeArticle,
} from "@/types/content";
import ArticleClientView from "@/components/article/ArticleClientView";

/**
 * Cached fetcher shared between generateMetadata and ArticlePage.
 * React cache ensures the DB query only executes once per request.
 */
const getArticle = cache(
  async (pillar: string, category: string, slug: string) => {
    return prisma.article.findFirst({
      where: {
        slug,
        published: true,
        category: {
          slug: category,
          pillar: { slug: pillar },
        },
      },
      ...articleWithRelationsArgs,
    });
  },
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pillar: string; category: string; slug: string }>;
}): Promise<Metadata> {
  const { pillar, category, slug } = await params;
  const article = await getArticle(pillar, category, slug);

  if (!article) {
    return {
      title: "Article non trouvé | Mohamed Haddouche",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";

  // Build the dynamic image URL
  const ogImageUrl = new URL(`${siteUrl}/api/og`);
  ogImageUrl.searchParams.set("title", article.titleFr);
  ogImageUrl.searchParams.set("category", article.category.titleFr);

  return {
    title: `${article.titleFr} | Mohamed Haddouche`,
    description: article.excerptFr ?? undefined,
    openGraph: {
      title: article.titleFr,
      description: article.excerptFr ?? undefined,
      images: [
        {
          url: ogImageUrl.toString(),
          width: 1200,
          height: 630,
          alt: article.titleFr,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.titleFr,
      description: article.excerptFr ?? undefined,
      images: [ogImageUrl.toString()],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { pillar, category, slug } = await params;

  const rawArticle = await getArticle(pillar, category, slug);

  if (!rawArticle) {
    notFound();
  }

  // Préparation des versions FR et EN
  const articleFr = localizeArticle(rawArticle, "fr");
  const articleEn = localizeArticle(rawArticle, "en");

  return (
    <ArticleClientView
      pillar={pillar}
      category={category}
      createdAt={rawArticle.createdAt.toISOString()}
      youtubeUrl={rawArticle.youtubeUrl}
      fr={{
        title: articleFr.title,
        excerpt: articleFr.excerpt,
        content: articleFr.content,
        categoryTitle: articleFr.category.title,
        pillarTitle: articleFr.category.pillar.title,
      }}
      en={{
        title: articleEn.title,
        excerpt: articleEn.excerpt,
        content: articleEn.content,
        categoryTitle: articleEn.category.title,
        pillarTitle: articleEn.category.pillar.title,
      }}
    />
  );
}
