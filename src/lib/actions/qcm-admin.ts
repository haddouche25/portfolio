"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export interface CreateQuestionInput {
  topic: string;
  difficulty: string;
  question: string;
  imageUrl?: string;
  explanation?: string;
  options: {
    text: string;
    imageUrl?: string;
    isCorrect: boolean;
  }[];
}

export async function createQuestion(data: CreateQuestionInput) {
  if (!data.question.trim() || data.options.length < 2) {
    throw new Error(
      "Une question doit comporter un énoncé et au moins 2 options.",
    );
  }

  const hasCorrect = data.options.some((opt) => opt.isCorrect);
  if (!hasCorrect) {
    throw new Error("Au moins une option doit être marquée comme correcte.");
  }

  await prisma.qcmQuestion.create({
    data: {
      topic: data.topic,
      difficulty: data.difficulty,
      question: data.question,
      imageUrl: data.imageUrl || null,
      explanation: data.explanation || null,
      options: {
        create: data.options.map((opt) => ({
          text: opt.text,
          imageUrl: opt.imageUrl || null,
          isCorrect: opt.isCorrect,
        })),
      },
    },
  });

  revalidatePath("/admin/qcm/questions");
  revalidatePath("/qcm");
}

export async function deleteQuestion(id: string) {
  await prisma.qcmQuestion.delete({
    where: { id },
  });

  revalidatePath("/admin/qcm/questions");
  revalidatePath("/qcm");
}
