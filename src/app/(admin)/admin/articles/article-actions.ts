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

export async function upsertArticleAction(
  articleId: string | null,
  formData: ArticleFormData,
): Promise<ActionState<{ id: string }>> {
  const finalSlug = slugify(formData.slug || formData.titleEn);

  if (!finalSlug) {
    return {
      success: false,
      message: "A valid slug or English title is required.",
    };
  }

  if (!formData.categoryId) {
    return {
      success: false,
      message: "Please select a category.",
    };
  }

  try {
    const dataPayload = {
      slug: finalSlug,
      categoryId: formData.categoryId,
      youtubeUrl: formData.youtubeUrl?.trim() || null,
      published: formData.published,
      titleEn: formData.titleEn.trim(),
      titleFr: formData.titleFr.trim(),
      excerptEn: formData.excerptEn?.trim() || null,
      excerptFr: formData.excerptFr?.trim() || null,
      contentEn: formData.contentEn,
      contentFr: formData.contentFr,
    };

    let savedId: string;

    if (articleId) {
      const updated = await prisma.article.update({
        where: { id: articleId },
        data: dataPayload,
      });
      savedId = updated.id;
    } else {
      const created = await prisma.article.create({
        data: dataPayload,
      });
      savedId = created.id;
    }

    revalidatePath("/admin/articles");
    revalidatePath("/admin");
    revalidatePath("/", "layout");

    return {
      success: true,
      data: { id: savedId },
    };
  } catch (error: unknown) {
    console.error("Prisma Article Upsert Error:", error);
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
      message: "Database transaction failed. Please check your inputs.",
    };
  }
}
