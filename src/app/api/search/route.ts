import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { resolveLocale, type Locale } from "@/types/content";

export interface SearchResultItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  url: string;
  pillar: {
    slug: string;
    title: string;
  };
  category: {
    slug: string;
    title: string;
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const query = searchParams.get("q")?.trim();
    const locale: Locale = resolveLocale(searchParams.get("lang"));
    const limit = Math.min(
      Math.max(Number(searchParams.get("limit")) || 10, 1),
      30,
    );

    if (!query || query.length < 2) {
      return NextResponse.json({ results: [] }, { status: 200 });
    }

    const isFr = locale === "fr";

    // MariaDB/MySQL `contains` defaults to case-insensitive collations (utf8mb4_unicode_ci)
    const articles = await prisma.article.findMany({
      where: {
        published: true,
        OR: [
          { titleEn: { contains: query } },
          { titleFr: { contains: query } },
          { excerptEn: { contains: query } },
          { excerptFr: { contains: query } },
        ],
      },
      take: limit,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        slug: true,
        titleEn: true,
        titleFr: true,
        excerptEn: true,
        excerptFr: true,
        category: {
          select: {
            slug: true,
            titleEn: true,
            titleFr: true,
            pillar: {
              select: {
                slug: true,
                titleEn: true,
                titleFr: true,
              },
            },
          },
        },
      },
    });

    const langSuffix = isFr ? "?lang=fr" : "";

    const results: SearchResultItem[] = articles.map((article) => {
      const pillarSlug = article.category.pillar.slug;
      const categorySlug = article.category.slug;

      return {
        id: article.id,
        slug: article.slug,
        title: isFr ? article.titleFr : article.titleEn,
        excerpt: isFr ? article.excerptFr : article.excerptEn,
        url: `/${pillarSlug}/${categorySlug}/${article.slug}${langSuffix}`,
        pillar: {
          slug: pillarSlug,
          title: isFr
            ? article.category.pillar.titleFr
            : article.category.pillar.titleEn,
        },
        category: {
          slug: categorySlug,
          title: isFr ? article.category.titleFr : article.category.titleEn,
        },
      };
    });

    return NextResponse.json({ results }, { status: 200 });
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json(
      { error: "Internal search error" },
      { status: 500 },
    );
  }
}
