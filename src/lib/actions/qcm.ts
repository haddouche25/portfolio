"use server";

import { prisma } from "@/lib/db";
interface SubmissionData {
  fullName: string;
  email: string;
  answers: {
    questionId: string;
    selectedOptionId: string;
  }[];
}

export async function submitQcmAttempt(data: SubmissionData) {
  const { fullName, email, answers } = data;

  if (!fullName?.trim() || !email?.trim() || !answers || answers.length === 0) {
    throw new Error("Informations d'inscription ou réponses incomplètes.");
  }

  const cleanEmail = email.trim().toLowerCase();
  const cleanName = fullName.trim();

  // 1. Get or create the student
  const student = await prisma.student.upsert({
    where: { email: cleanEmail },
    update: { fullName: cleanName },
    create: {
      fullName: cleanName,
      email: cleanEmail,
    },
  });

  // 2. Fetch all questions and their correct options
  const questionIds = answers.map((a) => a.questionId);
  const questions = await prisma.qcmQuestion.findMany({
    where: { id: { in: questionIds } },
    include: { options: true },
  });

  // 3. Grade answers on the server side
  let score = 0;
  const gradedAnswers = answers.map((userAns) => {
    const q = questions.find((item) => item.id === userAns.questionId);
    const selected = q?.options.find(
      (opt) => opt.id === userAns.selectedOptionId,
    );
    const isCorrect = Boolean(selected?.isCorrect);

    if (isCorrect) score += 1;

    return {
      questionId: userAns.questionId,
      selectedOptionId: userAns.selectedOptionId,
      isCorrect,
    };
  });

  const totalQuestions = questions.length;
  const percentage = Math.round((score / totalQuestions) * 1000) / 10; // e.g. 85.5%

  // 4. Save attempt and detailed answers
  const attempt = await prisma.qcmAttempt.create({
    data: {
      studentId: student.id,
      score,
      totalQuestions,
      percentage,
      completedAt: new Date(),
      answers: {
        create: gradedAnswers,
      },
    },
  });

  return {
    success: true,
    attemptId: attempt.id,
    score,
    totalQuestions,
    percentage,
  };
}
