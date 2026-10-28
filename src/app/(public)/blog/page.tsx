import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import BlogHubClient from "@/components/blog/BlogHubClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog & Didactique | Mohamed Haddouche",
  description:
    "Articles didactiques en mathématiques (Lycée & 1Bac SM) et tutoriels d'ingénierie logicielle moderne.",
};

// Fonction utilitaire externe : évite l'appel direct d'une fonction impure dans le rendu du composant
function isRecentArticle(createdAt: Date, maxDays = 14): boolean {
  const diffTime = Math.abs(
    new Date().getTime() - new Date(createdAt).getTime(),
  );
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return diffDays < maxDays;
}

export default async function BlogHubPage() {
  const [articles, categories] = await Promise.all([
    prisma.article.findMany({
      where: { published: true },
      include: {
        category: {
          include: {
            pillar: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.findMany({
      orderBy: { titleFr: "asc" },
    }),
  ]);

  const articlesFr = articles.map((a) => ({
    id: a.id,
    slug: a.slug,
    title: a.titleFr,
    excerpt: a.excerptFr,
    categoryTitle: a.category.titleFr,
    pillarSlug: a.category.pillar.slug,
    categorySlug: a.category.slug,
    createdAt: a.createdAt.toISOString(),
    isNew: isRecentArticle(a.createdAt),
    isFeatured: a.slug.includes("contraposee"),
  }));

  const articlesEn = articles.map((a) => ({
    id: a.id,
    slug: a.slug,
    title: a.titleEn || a.titleFr,
    excerpt: a.excerptEn || a.excerptFr,
    categoryTitle: a.category.titleEn,
    pillarSlug: a.category.pillar.slug,
    categorySlug: a.category.slug,
    createdAt: a.createdAt.toISOString(),
    isNew: isRecentArticle(a.createdAt),
    isFeatured: a.slug.includes("contraposee"),
  }));

  const categoryOptions = categories.map((c) => ({
    slug: c.slug,
    nameFr: c.titleFr,
    nameEn: c.titleEn,
  }));

  return (
    <BlogHubClient
      articlesFr={articlesFr}
      articlesEn={articlesEn}
      categories={categoryOptions}
    />
  );
}
