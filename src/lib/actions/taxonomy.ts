"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";

// ---------------------------------------------------------------------------
// PILLAR ACTIONS
// ---------------------------------------------------------------------------

export async function createPillar(formData: FormData) {
  const slug = (formData.get("slug") as string)?.trim().toLowerCase();
  const titleEn = (formData.get("titleEn") as string)?.trim();
  const titleFr = (formData.get("titleFr") as string)?.trim();
  const descriptionEn =
    (formData.get("descriptionEn") as string)?.trim() || null;
  const descriptionFr =
    (formData.get("descriptionFr") as string)?.trim() || null;
  const icon = (formData.get("icon") as string)?.trim() || null;

  if (!slug || !titleEn || !titleFr) {
    return { error: "Slug, English title, and French title are required." };
  }

  const existing = await prisma.pillar.findUnique({ where: { slug } });
  if (existing) {
    return { error: `A pillar with slug "${slug}" already exists.` };
  }

  await prisma.pillar.create({
    data: { slug, titleEn, titleFr, descriptionEn, descriptionFr, icon },
  });

  revalidatePath("/admin/pillars");
  revalidatePath("/");
  return { success: true };
}

export async function updatePillar(id: string, formData: FormData) {
  const slug = (formData.get("slug") as string)?.trim().toLowerCase();
  const titleEn = (formData.get("titleEn") as string)?.trim();
  const titleFr = (formData.get("titleFr") as string)?.trim();
  const descriptionEn =
    (formData.get("descriptionEn") as string)?.trim() || null;
  const descriptionFr =
    (formData.get("descriptionFr") as string)?.trim() || null;
  const icon = (formData.get("icon") as string)?.trim() || null;

  if (!slug || !titleEn || !titleFr) {
    return { error: "Slug, English title, and French title are required." };
  }

  const existing = await prisma.pillar.findUnique({ where: { slug } });
  if (existing && existing.id !== id) {
    return { error: `Another pillar already uses the slug "${slug}".` };
  }

  await prisma.pillar.update({
    where: { id },
    data: { slug, titleEn, titleFr, descriptionEn, descriptionFr, icon },
  });

  revalidatePath("/admin/pillars");
  revalidatePath("/");
  return { success: true };
}

export async function deletePillar(id: string) {
  // Cascading check 1: Check child categories
  const categoriesCount = await prisma.category.count({
    where: { pillarId: id },
  });

  if (categoriesCount > 0) {
    return {
      error: `Cannot delete: This pillar has ${categoriesCount} assigned categories. Remove or reassign them first.`,
    };
  }

  // Cascading check 2: Defensive check for orphaned articles
  const articlesCount = await prisma.article.count({
    where: {
      category: { pillarId: id },
    },
  });

  if (articlesCount > 0) {
    return {
      error: `Cannot delete: This pillar still references ${articlesCount} existing articles.`,
    };
  }

  await prisma.pillar.delete({ where: { id } });
  revalidatePath("/admin/pillars");
  revalidatePath("/");
  return { success: true };
}

// ---------------------------------------------------------------------------
// CATEGORY ACTIONS
// ---------------------------------------------------------------------------

export async function createCategory(formData: FormData) {
  const slug = (formData.get("slug") as string)?.trim().toLowerCase();
  const pillarId = (formData.get("pillarId") as string)?.trim();
  const titleEn = (formData.get("titleEn") as string)?.trim();
  const titleFr = (formData.get("titleFr") as string)?.trim();
  const descriptionEn =
    (formData.get("descriptionEn") as string)?.trim() || null;
  const descriptionFr =
    (formData.get("descriptionFr") as string)?.trim() || null;

  if (!slug || !pillarId || !titleEn || !titleFr) {
    return { error: "Slug, Parent Pillar, and titles are required." };
  }

  const existing = await prisma.category.findFirst({
    where: {
      pillarId,
      slug,
    },
  });

  if (existing) {
    return {
      error: `A category with slug "${slug}" already exists under this pillar.`,
    };
  }

  await prisma.category.create({
    data: { slug, pillarId, titleEn, titleFr, descriptionEn, descriptionFr },
  });

  revalidatePath("/admin/categories");
  revalidatePath("/");
  return { success: true };
}

export async function updateCategory(id: string, formData: FormData) {
  const slug = (formData.get("slug") as string)?.trim().toLowerCase();
  const pillarId = (formData.get("pillarId") as string)?.trim();
  const titleEn = (formData.get("titleEn") as string)?.trim();
  const titleFr = (formData.get("titleFr") as string)?.trim();
  const descriptionEn =
    (formData.get("descriptionEn") as string)?.trim() || null;
  const descriptionFr =
    (formData.get("descriptionFr") as string)?.trim() || null;

  if (!slug || !pillarId || !titleEn || !titleFr) {
    return { error: "Slug, Parent Pillar, and titles are required." };
  }

  const existing = await prisma.category.findFirst({
    where: {
      pillarId,
      slug,
    },
  });

  if (existing && existing.id !== id) {
    return {
      error: `Another category with slug "${slug}" exists under this pillar.`,
    };
  }

  await prisma.category.update({
    where: { id },
    data: { slug, pillarId, titleEn, titleFr, descriptionEn, descriptionFr },
  });

  revalidatePath("/admin/categories");
  revalidatePath("/");
  return { success: true };
}

export async function deleteCategory(id: string) {
  // Cascading check: Prevent deleting categories with published or draft articles
  const articlesCount = await prisma.article.count({
    where: { categoryId: id },
  });

  if (articlesCount > 0) {
    return {
      error: `Cannot delete: Category contains ${articlesCount} article(s). Delete or reassign those articles first.`,
    };
  }

  await prisma.category.delete({ where: { id } });
  revalidatePath("/admin/categories");
  revalidatePath("/");
  return { success: true };
}
