"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteExam(examId: string) {
  try {
    await prisma.$transaction(async (tx) => {
      // 1. Récupérer les identifiants des questions liées à cet examen
      const links = await tx.qcmExamQuestion.findMany({
        where: { examId },
        select: { questionId: true },
      });
      const questionIds = links.map((l) => l.questionId);

      // 2. Supprimer l'examen (Cascade supprime QcmExamQuestion et QcmExamLevel)
      await tx.qcmExam.delete({
        where: { id: examId },
      });

      // 3. Supprimer les questions orphelines (Cascade supprime QcmOption)
      if (questionIds.length > 0) {
        await tx.qcmQuestion.deleteMany({
          where: {
            id: { in: questionIds },
          },
        });
      }
    });

    revalidatePath("/admin/qcm/exams");
    revalidatePath("/qcm");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Erreur suppression examen:", error);
    return {
      success: false,
      error: "Une erreur est survenue lors de la suppression.",
    };
  }
}
