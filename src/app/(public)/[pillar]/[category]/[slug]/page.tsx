import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import {
  type ArticlePageProps,
  articleWithRelationsArgs,
  localizeArticle,
} from "@/types/content";
import ArticleClientView from "@/components/article/ArticleClientView";

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { pillar, category, slug } = await params;

  const rawArticle = await prisma.article.findFirst({
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

  if (!rawArticle) {
    return { title: "Article Not Found" };
  }

  const article = localizeArticle(rawArticle, "fr");

  return {
    title: `${article.title} | ${article.category.title}`,
    description: article.excerpt ?? undefined,
    openGraph: {
      title: article.title,
      description: article.excerpt ?? undefined,
      type: "article",
      publishedTime: article.createdAt.toISOString(),
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { pillar, category, slug } = await params;

  const rawArticle = await prisma.article.findFirst({
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
