"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email?.trim().toLowerCase();
  const expectedEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const userRole = (session?.user as { role?: string } | undefined)?.role;

  const isAdmin =
    Boolean(session?.user) &&
    (userRole === "ADMIN" ||
      (Boolean(expectedEmail) && userEmail === expectedEmail));

  if (!isAdmin) {
    throw new Error("Accès non autorisé");
  }
}

export async function updateQcmExamAction(examId: string, formData: FormData) {
  await requireAdmin();

  const title = String(formData.get("title") || "").trim();
  const slug = String(formData.get("slug") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const rawTime = String(formData.get("timeLimitMinutes") || "").trim();
  const timeLimitMinutes = rawTime ? parseInt(rawTime, 10) : null;
  const published = formData.get("published") === "on";
  const levels = formData.getAll("levels").map(String);

  if (!title || !slug) {
    throw new Error("Le titre et le slug sont obligatoires.");
  }

  await prisma.$transaction(async (tx) => {
    await tx.qcmExam.update({
      where: { id: examId },
      data: {
        title,
        slug,
        description: description || null,
        timeLimitMinutes,
        published,
      },
    });

    if (levels.length > 0) {
      await tx.qcmExamLevel.deleteMany({ where: { examId } });
      await tx.qcmExamLevel.createMany({
        data: levels.map((level) => ({
          examId,
          level: level as never,
        })),
      });
    }
  });

  revalidatePath("/admin/qcm/exams");
  revalidatePath(`/admin/qcm/exams/${examId}`);
  revalidatePath(`/qcm/${slug}`);
  redirect(`/admin/qcm/exams/${examId}`);
}

export async function updateQcmQuestionAction(
  examId: string,
  questionId: string,
  payload: {
    topic: string;
    difficulty: string;
    question: string;
    explanation: string;
    options: { id?: string; text: string; isCorrect: boolean }[];
  },
) {
  await requireAdmin();

  if (!payload.question.trim() || payload.options.length < 2) {
    throw new Error("L'énoncé et au moins deux options sont requis.");
  }

  await prisma.$transaction(async (tx) => {
    await tx.qcmQuestion.update({
      where: { id: questionId },
      data: {
        topic: payload.topic.trim(),
        difficulty: payload.difficulty,
        question: payload.question.trim(),
        explanation: payload.explanation.trim() || null,
      },
    });

    await tx.qcmOption.deleteMany({ where: { questionId } });
    await tx.qcmOption.createMany({
      data: payload.options.map((opt) => ({
        questionId,
        text: opt.text.trim(),
        isCorrect: opt.isCorrect,
      })),
    });
  });

  revalidatePath(`/admin/qcm/exams/${examId}`);
  revalidatePath("/admin/qcm/questions");
  redirect(`/admin/qcm/exams/${examId}`);
}
