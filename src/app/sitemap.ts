import { MetadataRoute } from "next";
import { prisma } from "@/lib/db";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://mhaddouche.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Pages statiques publiques
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/qcm`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/connexion`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // 2. Récupération dynamique des QCM actifs
  let qcmRoutes: MetadataRoute.Sitemap = [];
  try {
    const exams = await prisma.qcmExam.findMany({
      select: {
        slug: true,
        updatedAt: true,
      },
    });

    qcmRoutes = exams.map((exam) => ({
      url: `${BASE_URL}/qcm/${exam.slug}`,
      lastModified: exam.updatedAt,
      changeFrequency: "monthly",
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Erreur génération sitemap QCM:", error);
  }

  // 3. Récupération dynamique des articles de blog publiés
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const articles = await prisma.article.findMany({
      where: {
        published: true,
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    });

    blogRoutes = articles.map((art) => ({
      url: `${BASE_URL}/blog/${art.slug}`,
      lastModified: art.updatedAt,
      changeFrequency: "monthly",
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Erreur génération sitemap Blog:", error);
  }

  return [...staticRoutes, ...qcmRoutes, ...blogRoutes];
}
