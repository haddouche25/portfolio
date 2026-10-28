"use server";

import { prisma } from "@/lib/db";

interface SubmissionData {
  examId?: string;
  fullName: string;
  email: string;
  answers: {
    questionId: string;
    selectedOptionId: string;
  }[];
}

export async function submitQcmAttempt(data: SubmissionData) {
  const { examId, fullName, email, answers } = data;

  if (!fullName?.trim() || !email?.trim() || !answers || answers.length === 0) {
    throw new Error("Informations d'inscription ou réponses incomplètes.");
  }

  const cleanEmail = email.trim().toLowerCase();
  const cleanName = fullName.trim();

  // 1. Obtenir ou créer l'élève
  const student = await prisma.student.upsert({
    where: { email: cleanEmail },
    update: { fullName: cleanName },
    create: {
      fullName: cleanName,
      email: cleanEmail,
    },
  });

  // 2. Récupérer toutes les questions et leurs options
  const questionIds = answers.map((a) => a.questionId);
  const questions = await prisma.qcmQuestion.findMany({
    where: { id: { in: questionIds } },
    include: { options: true },
  });

  // 3. Noter les réponses côté serveur
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
  const percentage =
    totalQuestions > 0 ? Math.round((score / totalQuestions) * 1000) / 10 : 0;

  // 4. Déterminer un examId valide non nul
  let resolvedExamId = examId;
  if (!resolvedExamId) {
    const fallbackExam = await prisma.qcmExam.findFirst();
    if (!fallbackExam) {
      throw new Error("Aucun examen actif n'a été trouvé en base de données.");
    }
    resolvedExamId = fallbackExam.id;
  }

  // 5. Enregistrer la tentative
  const attempt = await prisma.qcmAttempt.create({
    data: {
      examId: resolvedExamId,
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
