"use server";

import { prisma } from "@/lib/db";
import { SchoolLevel } from "@prisma/client";
import { revalidatePath } from "next/cache";

// Résolution souple vers l'Enum Prisma SchoolLevel
function resolveSchoolLevel(raw: unknown): SchoolLevel | null {
  if (typeof raw !== "string") return null;
  const clean = raw.toLowerCase().trim();

  if (clean === "3ac" || clean === "college_3ac" || clean.includes("3ac")) {
    return SchoolLevel.COLLEGE_3AC;
  }
  if (clean === "tronc commun" || clean === "tronc_commun" || clean === "tc") {
    return SchoolLevel.TRONC_COMMUN;
  }
  if (clean === "1bac" || clean === "bac_1" || clean.includes("1bac")) {
    return SchoolLevel.BAC_1;
  }
  if (clean === "2bac" || clean === "bac_2" || clean.includes("2bac")) {
    return SchoolLevel.BAC_2;
  }
  return null;
}

// Déduction de secours si le JSON n'a pas spécifié de clé level
function inferLevelFromText(slug: string, title: string): SchoolLevel | null {
  const combined = `${slug} ${title}`.toLowerCase();
  if (combined.includes("3ac") || combined.includes("3e"))
    return SchoolLevel.COLLEGE_3AC;
  if (combined.includes("1bac")) return SchoolLevel.BAC_1;
  if (combined.includes("2bac")) return SchoolLevel.BAC_2;
  if (combined.includes("tronc") || combined.includes("tc"))
    return SchoolLevel.TRONC_COMMUN;
  return null;
}

export async function importExamsFromJson(formData: FormData) {
  const file = formData.get("file") as File;

  if (!file) {
    return { success: false, error: "Aucun fichier fourni." };
  }

  try {
    const fileContent = await file.text();
    const examsData = JSON.parse(fileContent);

    if (!Array.isArray(examsData)) {
      return {
        success: false,
        error: "Le fichier JSON doit contenir un tableau d'examens.",
      };
    }

    let importedCount = 0;

    await prisma.$transaction(async (tx) => {
      for (const examInput of examsData) {
        // 1. Déterminer le(s) niveau(x)
        const levelsToAssign: SchoolLevel[] = [];

        if (Array.isArray(examInput.levels)) {
          for (const l of examInput.levels) {
            const resolved = resolveSchoolLevel(l);
            if (resolved && !levelsToAssign.includes(resolved))
              levelsToAssign.push(resolved);
          }
        } else if (examInput.level) {
          const resolved = resolveSchoolLevel(examInput.level);
          if (resolved) levelsToAssign.push(resolved);
        }

        // Si aucun niveau n'est présent dans le JSON, on l'infère du slug/titre
        if (levelsToAssign.length === 0) {
          const inferred = inferLevelFromText(
            examInput.slug || "",
            examInput.title || "",
          );
          if (inferred) levelsToAssign.push(inferred);
        }

        // 2. Créer ou Mettre à jour l'Examen
        const exam = await tx.qcmExam.upsert({
          where: { slug: examInput.slug },
          update: {
            title: examInput.title,
            description: examInput.description || "",
            timeLimitMinutes: examInput.timeLimitMinutes ?? 15,
            published: examInput.published ?? true,
          },
          create: {
            slug: examInput.slug,
            title: examInput.title,
            description: examInput.description || "",
            timeLimitMinutes: examInput.timeLimitMinutes ?? 15,
            published: examInput.published ?? true,
          },
        });

        // 3. Persistance dans la table de liaison qcm_exam_levels
        await tx.qcmExamLevel.deleteMany({
          where: { examId: exam.id },
        });

        if (levelsToAssign.length > 0) {
          await tx.qcmExamLevel.createMany({
            data: levelsToAssign.map((lvl) => ({
              examId: exam.id,
              level: lvl,
            })),
          });
        }

        // 4. Questions et Options
        if (examInput.questions && Array.isArray(examInput.questions)) {
          // Vider les anciennes questions si l'examen existait déjà
          const existingLinks = await tx.qcmExamQuestion.findMany({
            where: { examId: exam.id },
            select: { questionId: true },
          });

          if (existingLinks.length > 0) {
            const qIds = existingLinks.map((l) => l.questionId);
            await tx.qcmExamQuestion.deleteMany({ where: { examId: exam.id } });
            await tx.qcmQuestion.deleteMany({ where: { id: { in: qIds } } });
          }

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

            await tx.qcmExamQuestion.create({
              data: {
                examId: exam.id,
                questionId: question.id,
                order: i + 1,
              },
            });

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
    revalidatePath("/");

    return {
      success: true,
      message: `${importedCount} examen(s) importé(s) avec succès !`,
    };
  } catch (error) {
    console.error("Erreur import JSON:", error);
    const err = error as Error;
    return {
      success: false,
      error: `[ERREUR SYSTEME] ${err.message}`,
    };
  }
}
