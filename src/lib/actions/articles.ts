"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { type ActionState, type ArticleFormData } from "@/types/content";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function revalidateArticlePaths(
  pillarSlug?: string,
  categorySlug?: string,
  articleSlug?: string,
) {
  revalidatePath("/admin/articles");
  revalidatePath("/admin");
  revalidatePath("/");

  if (pillarSlug) {
    revalidatePath(`/${pillarSlug}`);
    if (categorySlug) {
      revalidatePath(`/${pillarSlug}/${categorySlug}`);
      if (articleSlug) {
        revalidatePath(`/${pillarSlug}/${categorySlug}/${articleSlug}`);
      }
    }
  }
}

export async function createArticle(
  data: ArticleFormData,
): Promise<ActionState<{ id: string; slug: string }>> {
  const finalSlug = slugify(data.slug || data.titleEn);

  if (!finalSlug) {
    return {
      success: false,
      message: "A valid slug or English title is required.",
    };
  }

  if (!data.categoryId) {
    return {
      success: false,
      message: "Category selection is required.",
    };
  }

  if (!data.titleEn?.trim() || !data.titleFr?.trim()) {
    return {
      success: false,
      message: "Both English and French titles are required.",
    };
  }

  if (!data.contentEn?.trim() || !data.contentFr?.trim()) {
    return {
      success: false,
      message: "Both English and French content bodies are required.",
    };
  }

  try {
    const article = await prisma.article.create({
      data: {
        slug: finalSlug,
        categoryId: data.categoryId,
        youtubeUrl: data.youtubeUrl?.trim() || null,
        published: data.published,
        titleEn: data.titleEn.trim(),
        titleFr: data.titleFr.trim(),
        excerptEn: data.excerptEn?.trim() || null,
        excerptFr: data.excerptFr?.trim() || null,
        contentEn: data.contentEn,
        contentFr: data.contentFr,
      },
      include: {
        category: {
          include: {
            pillar: true,
          },
        },
      },
    });

    revalidateArticlePaths(
      article.category.pillar.slug,
      article.category.slug,
      article.slug,
    );

    return {
      success: true,
      data: { id: article.id, slug: article.slug },
    };
  } catch (error: unknown) {
    console.error("createArticle error:", error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        message: "An article with this slug already exists in this category.",
      };
    }

    return {
      success: false,
      message: "Failed to create article due to a database error.",
    };
  }
}

export async function updateArticle(
  id: string,
  data: ArticleFormData,
): Promise<ActionState<{ id: string; slug: string }>> {
  const finalSlug = slugify(data.slug || data.titleEn);

  if (!finalSlug) {
    return {
      success: false,
      message: "A valid slug or English title is required.",
    };
  }

  if (!data.categoryId) {
    return {
      success: false,
      message: "Category selection is required.",
    };
  }

  try {
    const previous = await prisma.article.findUnique({
      where: { id },
      include: {
        category: {
          include: {
            pillar: true,
          },
        },
      },
    });

    const updated = await prisma.article.update({
      where: { id },
      data: {
        slug: finalSlug,
        categoryId: data.categoryId,
        youtubeUrl: data.youtubeUrl?.trim() || null,
        published: data.published,
        titleEn: data.titleEn.trim(),
        titleFr: data.titleFr.trim(),
        excerptEn: data.excerptEn?.trim() || null,
        excerptFr: data.excerptFr?.trim() || null,
        contentEn: data.contentEn,
        contentFr: data.contentFr,
      },
      include: {
        category: {
          include: {
            pillar: true,
          },
        },
      },
    });

    if (previous) {
      revalidateArticlePaths(
        previous.category.pillar.slug,
        previous.category.slug,
        previous.slug,
      );
    }

    revalidateArticlePaths(
      updated.category.pillar.slug,
      updated.category.slug,
      updated.slug,
    );

    return {
      success: true,
      data: { id: updated.id, slug: updated.slug },
    };
  } catch (error: unknown) {
    console.error("updateArticle error:", error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        message: "An article with this slug already exists in this category.",
      };
    }

    return {
      success: false,
      message: "Failed to update article due to a database error.",
    };
  }
}

export async function toggleArticlePublished(
  id: string,
  currentStatus: boolean,
): Promise<ActionState<{ published: boolean }>> {
  try {
    const updated = await prisma.article.update({
      where: { id },
      data: { published: !currentStatus },
      include: {
        category: {
          include: {
            pillar: true,
          },
        },
      },
    });

    revalidateArticlePaths(
      updated.category.pillar.slug,
      updated.category.slug,
      updated.slug,
    );

    return {
      success: true,
      data: { published: updated.published },
    };
  } catch (error) {
    console.error("toggleArticlePublished error:", error);
    return {
      success: false,
      message: "Failed to toggle article publication state.",
    };
  }
}

export async function deleteArticle(id: string): Promise<ActionState<null>> {
  try {
    const deleted = await prisma.article.delete({
      where: { id },
      include: {
        category: {
          include: {
            pillar: true,
          },
        },
      },
    });

    revalidateArticlePaths(
      deleted.category.pillar.slug,
      deleted.category.slug,
      deleted.slug,
    );

    return {
      success: true,
      data: null,
    };
  } catch (error) {
    console.error("deleteArticle error:", error);
    return {
      success: false,
      message: "Failed to delete article.",
    };
  }
}
