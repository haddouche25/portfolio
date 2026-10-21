"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";

export async function toggleArticlePublished(
  id: string,
  currentStatus: boolean,
) {
  try {
    await prisma.article.update({
      where: { id },
      data: { published: !currentStatus },
    });

    revalidatePath("/admin/articles");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Failed to toggle publish status:", error);
    return { success: false, message: "Database update failed" };
  }
}

export async function deleteArticle(id: string) {
  try {
    await prisma.article.delete({
      where: { id },
    });

    revalidatePath("/admin/articles");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete article:", error);
    return { success: false, message: "Database deletion failed" };
  }
}
