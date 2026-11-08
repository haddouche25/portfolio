"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function importExamsFromJson(formData: FormData) {
  const file = formData.get("file") as File;

  if (!file) {
    return { success: false, error: "Aucun fichier fourni." };
  }

  try {
    // Lire le contenu du fichier texte
    const fileContent = await file.text();
    const examsData = JSON.parse(fileContent);

    if (!Array.isArray(examsData)) {
      return {
        success: false,
        error: "Le fichier JSON doit contenir un tableau d'examens.",
      };
    }

    let importedCount = 0;

    // Utilisation d'une transaction Prisma pour s'assurer que tout s'insère correctement
    await prisma.$transaction(async (tx) => {
      for (const examInput of examsData) {
        // 1. Créer l'examen
        const exam = await tx.qcmExam.create({
          data: {
            slug: examInput.slug,
            title: examInput.title,
            description: examInput.description || "",
            timeLimitMinutes: examInput.timeLimitMinutes || 15,
            published: examInput.published ?? false,
          },
        });

        // 2. Créer les questions et leurs options
        if (examInput.questions && Array.isArray(examInput.questions)) {
          for (let i = 0; i < examInput.questions.length; i++) {
            const q = examInput.questions[i];

            const question = await tx.qcmQuestion.create({
              data: {
                topic: q.topic || "Général",
                difficulty: q.difficulty || "Moyen",
                question: q.question,
                explanation: q.explanation || null,
              },
            });

            // Lier la question à l'examen
            await tx.qcmExamQuestion.create({
              data: {
                examId: exam.id,
                questionId: question.id,
                order: i + 1,
              },
            });

            // Insérer les options
            if (q.options && Array.isArray(q.options)) {
              for (const opt of q.options) {
                await tx.qcmOption.create({
                  data: {
                    questionId: question.id,
                    text: opt.text,
                    isCorrect: opt.isCorrect,
                  },
                });
              }
            }
          }
        }
        importedCount++;
      }
    });

    revalidatePath("/admin/qcm/exams");
    revalidatePath("/qcm");

    return {
      success: true,
      message: `${importedCount} examen(s) importé(s) avec succès !`,
    };
  } catch (error) {
    console.error("Erreur SQL Terminal:", error);
    const err = error as Error;
    return {
      success: false,
      error: `[ERREUR SQL] ${err.message || "Une erreur est survenue lors de l'exécution."}`,
    };
  }
}
