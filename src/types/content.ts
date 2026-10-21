import { Prisma } from "@prisma/client";

// ==========================================
// 1. Core Locales & App Router Contracts (Next.js 15+ / 16)
// ==========================================

export type Locale = "en" | "fr";

export interface BasePageProps {
  searchParams: Promise<{
    lang?: string;
    [key: string]: string | string[] | undefined;
  }>;
}

export interface PillarPageProps extends BasePageProps {
  params: Promise<{ pillar: string }>;
}

export interface CategoryPageProps extends BasePageProps {
  params: Promise<{ pillar: string; category: string }>;
}

export interface ArticlePageProps extends BasePageProps {
  params: Promise<{ pillar: string; category: string; slug: string }>;
}

// ==========================================
// 2. Prisma Query Argument Validators
// ==========================================

// Pillar with child categories
export const pillarWithCategoriesArgs =
  Prisma.validator<Prisma.PillarDefaultArgs>()({
    include: {
      categories: true,
    },
  });

// Pillar with full hierarchy down to published articles (Pillar Hub)
export const pillarWithFullTreeArgs =
  Prisma.validator<Prisma.PillarDefaultArgs>()({
    include: {
      categories: {
        include: {
          articles: {
            where: { published: true },
            orderBy: { createdAt: "desc" },
          },
        },
      },
    },
  });

// Category with parent Pillar
export const categoryWithPillarArgs =
  Prisma.validator<Prisma.CategoryDefaultArgs>()({
    include: {
      pillar: true,
    },
  });

// Category with parent Pillar and all its articles (Category Hub)
export const categoryWithArticlesAndPillarArgs =
  Prisma.validator<Prisma.CategoryDefaultArgs>()({
    include: {
      pillar: true,
      articles: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

// Article with full ancestral path (Category -> Pillar) for reader pages and breadcrumbs
export const articleWithRelationsArgs =
  Prisma.validator<Prisma.ArticleDefaultArgs>()({
    include: {
      category: {
        include: {
          pillar: true,
        },
      },
    },
  });

// Lightweight Article card projection (excludes heavy LongText content for listings and search)
export const articleCardArgs = Prisma.validator<Prisma.ArticleDefaultArgs>()({
  select: {
    id: true,
    slug: true,
    titleEn: true,
    titleFr: true,
    excerptEn: true,
    excerptFr: true,
    youtubeUrl: true,
    published: true,
    createdAt: true,
    updatedAt: true,
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

// ==========================================
// 3. Inferred Prisma Payload Types
// ==========================================

export type PillarWithCategories = Prisma.PillarGetPayload<
  typeof pillarWithCategoriesArgs
>;
export type PillarWithFullTree = Prisma.PillarGetPayload<
  typeof pillarWithFullTreeArgs
>;

export type CategoryWithPillar = Prisma.CategoryGetPayload<
  typeof categoryWithPillarArgs
>;
export type CategoryWithArticlesAndPillar = Prisma.CategoryGetPayload<
  typeof categoryWithArticlesAndPillarArgs
>;

export type ArticleWithRelations = Prisma.ArticleGetPayload<
  typeof articleWithRelationsArgs
>;
export type ArticleCardPayload = Prisma.ArticleGetPayload<
  typeof articleCardArgs
>;

// ==========================================
// 4. Resolved Localized View Models (For UI)
// ==========================================

export interface LocalizedPillar {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  icon: string | null;
}

export interface LocalizedCategory {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  pillarId: string;
}

export interface LocalizedArticleMeta {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  youtubeUrl: string | null;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface LocalizedArticleCard extends LocalizedArticleMeta {
  category: {
    slug: string;
    title: string;
    pillar: {
      slug: string;
      title: string;
    };
  };
}

export interface LocalizedArticle extends LocalizedArticleMeta {
  content: string;
  category: LocalizedCategory & {
    pillar: LocalizedPillar;
  };
}

// ==========================================
// 5. Form DTOs & Server Action State
// ==========================================

export interface ArticleFormData {
  slug: string;
  categoryId: string;
  youtubeUrl?: string | null;
  published: boolean;
  titleEn: string;
  titleFr: string;
  excerptEn?: string | null;
  excerptFr?: string | null;
  contentEn: string;
  contentFr: string;
}

export type ActionState<T = unknown> = {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, string[]>;
};

// ==========================================
// 6. Localization Helpers & Pure Mappers
// ==========================================

export function resolveLocale(langParam?: string | null): Locale {
  return langParam === "fr" ? "fr" : "en";
}

export function localizeArticle(
  article: ArticleWithRelations,
  locale: Locale,
): LocalizedArticle {
  const isFr = locale === "fr";

  return {
    id: article.id,
    slug: article.slug,
    title: isFr ? article.titleFr : article.titleEn,
    excerpt: isFr ? article.excerptFr : article.excerptEn,
    content: isFr ? article.contentFr : article.contentEn,
    youtubeUrl: article.youtubeUrl,
    published: article.published,
    createdAt: article.createdAt,
    updatedAt: article.updatedAt,
    category: {
      id: article.category.id,
      slug: article.category.slug,
      title: isFr ? article.category.titleFr : article.category.titleEn,
      description: isFr
        ? article.category.descriptionFr
        : article.category.descriptionEn,
      pillarId: article.category.pillarId,
      pillar: {
        id: article.category.pillar.id,
        slug: article.category.pillar.slug,
        title: isFr
          ? article.category.pillar.titleFr
          : article.category.pillar.titleEn,
        description: isFr
          ? article.category.pillar.descriptionFr
          : article.category.pillar.descriptionEn,
        icon: article.category.pillar.icon,
      },
    },
  };
}

export function localizeArticleCard(
  card: ArticleCardPayload,
  locale: Locale,
): LocalizedArticleCard {
  const isFr = locale === "fr";

  return {
    id: card.id,
    slug: card.slug,
    title: isFr ? card.titleFr : card.titleEn,
    excerpt: isFr ? card.excerptFr : card.excerptEn,
    youtubeUrl: card.youtubeUrl,
    published: card.published,
    createdAt: card.createdAt,
    updatedAt: card.updatedAt,
    category: {
      slug: card.category.slug,
      title: isFr ? card.category.titleFr : card.category.titleEn,
      pillar: {
        slug: card.category.pillar.slug,
        title: isFr
          ? card.category.pillar.titleFr
          : card.category.pillar.titleEn,
      },
    },
  };
}
