"use server";

import { prisma } from "@/lib/db";

interface InitAttemptInput {
  examId: string;
  fullName?: string;
  email: string;
  totalQuestions: number;
}

// 1. Initialise une nouvelle session ou reprend la session inachevée existante
export async function getOrCreateExamSession(data: InitAttemptInput) {
  const cleanEmail = data.email.toLowerCase().trim();

  const student = await prisma.student.upsert({
    where: { email: cleanEmail },
    update: data.fullName ? { fullName: data.fullName } : {},
    create: {
      email: cleanEmail,
      fullName: data.fullName || "Élève Anonyme",
    },
  });

  // 1. Chercher d'abord la tentative en cours (non terminée)
  const existingAttempt = await prisma.qcmAttempt.findFirst({
    where: {
      examId: data.examId,
      studentId: student.id,
      completedAt: null,
    },
    include: {
      answers: true,
    },
    orderBy: {
      startedAt: "desc",
    },
  });

  if (existingAttempt) {
    const savedAnswers: Record<string, string> = {};
    for (const ans of existingAttempt.answers) {
      if (ans.selectedOptionId) {
        savedAnswers[ans.questionId] = ans.selectedOptionId;
      }
    }

    return {
      attemptId: existingAttempt.id,
      fullName: student.fullName,
      email: student.email,
      savedAnswers,
      isResumed: true,
    };
  }

  // 2. Si aucune session n'est ouverte, forcer completedAt: null
  const newAttempt = await prisma.qcmAttempt.create({
    data: {
      examId: data.examId,
      studentId: student.id,
      score: 0,
      totalQuestions: data.totalQuestions,
      percentage: 0,
      startedAt: new Date(),
      completedAt: null, // <-- Forcé explicitement à null
    },
  });

  return {
    attemptId: newAttempt.id,
    fullName: student.fullName,
    email: student.email,
    savedAnswers: {},
    isResumed: false,
  };
}

// 2. Enregistre ou met à jour le choix pour une question donnée
export async function saveQuestionAnswer(data: {
  attemptId: string;
  questionId: string;
  selectedOptionId: string | null;
}) {
  let isCorrect = false;

  if (data.selectedOptionId) {
    const option = await prisma.qcmOption.findUnique({
      where: { id: data.selectedOptionId },
    });
    isCorrect = Boolean(option?.isCorrect);
  }

  // Enregistrer ou mettre à jour la réponse
  await prisma.qcmAnswer.upsert({
    where: {
      attemptId_questionId: {
        attemptId: data.attemptId,
        questionId: data.questionId,
      },
    },
    update: {
      selectedOptionId: data.selectedOptionId,
      isCorrect,
    },
    create: {
      attemptId: data.attemptId,
      questionId: data.questionId,
      selectedOptionId: data.selectedOptionId,
      isCorrect,
    },
  });

  // Mettre à jour en temps réel le score dans la tentative pour la table d'administration
  const correctCount = await prisma.qcmAnswer.count({
    where: {
      attemptId: data.attemptId,
      isCorrect: true,
    },
  });

  const attempt = await prisma.qcmAttempt.findUnique({
    where: { id: data.attemptId },
    select: { totalQuestions: true },
  });

  const percentage =
    attempt && attempt.totalQuestions > 0
      ? Math.round((correctCount / attempt.totalQuestions) * 100)
      : 0;

  await prisma.qcmAttempt.update({
    where: { id: data.attemptId },
    data: {
      score: correctCount,
      percentage,
    },
  });
}
// 3. Clôture de l'épreuve à la validation finale
export async function finalizeExamAttempt(attemptId: string) {
  const attempt = await prisma.qcmAttempt.findUnique({
    where: { id: attemptId },
    include: { answers: true },
  });

  if (!attempt) throw new Error("Tentative introuvable");

  const score = attempt.answers.filter((a) => a.isCorrect).length;
  const percentage =
    attempt.totalQuestions > 0
      ? Math.round((score / attempt.totalQuestions) * 100)
      : 0;

  return await prisma.qcmAttempt.update({
    where: { id: attemptId },
    data: {
      score,
      percentage,
      completedAt: new Date(),
    },
  });
}

// 4. Récupère l'historique des tentatives d'un élève via son email
export async function getStudentHistoryByEmail(email: string) {
  try {
    const cleanEmail = email.toLowerCase().trim();

    const student = await prisma.student.findUnique({
      where: { email: cleanEmail },
      include: {
        attempts: {
          include: {
            exam: true,
            answers: true,
          },
          orderBy: {
            startedAt: "desc",
          },
        },
      },
    });

    if (!student) {
      return { found: false, student: null, attempts: [] };
    }

    const attemptsData = student.attempts.map((attempt) => {
      const isCompleted = Boolean(attempt.completedAt);
      const score = isCompleted
        ? attempt.score
        : attempt.answers.filter((a) => a.isCorrect).length;

      const percentage =
        attempt.totalQuestions > 0
          ? Math.round((score / attempt.totalQuestions) * 100)
          : 0;

      return {
        id: attempt.id,
        examTitle: attempt.exam?.title ?? "Examen",
        examSlug: attempt.exam?.slug ?? "",
        level: attempt.exam?.level ?? "",
        isCompleted,
        score,
        totalQuestions: attempt.totalQuestions,
        percentage,
        answeredCount: attempt.answers.length,
        // Convertir impérativement en string pour la sérialisation Next.js RSC
        startedAt: attempt.startedAt.toISOString(),
        completedAt: attempt.completedAt
          ? attempt.completedAt.toISOString()
          : null,
      };
    });

    return {
      found: true,
      student: {
        fullName: student.fullName,
        email: student.email,
      },
      attempts: attemptsData,
    };
  } catch (error) {
    console.error("Erreur dans getStudentHistoryByEmail:", error);
    return { found: false, student: null, attempts: [] };
  }
}

// 5. Récupère le détail complet d'une tentative terminée pour affichage didactique
export async function getAttemptDetailsForReview(attemptId: string) {
  const attempt = await prisma.qcmAttempt.findUnique({
    where: { id: attemptId },
    include: {
      exam: {
        include: {
          questions: {
            orderBy: { order: "asc" },
            include: {
              question: {
                include: {
                  options: true,
                },
              },
            },
          },
        },
      },
      answers: true,
    },
  });

  // Sécurité : n'autoriser la correction que si l'épreuve est terminée
  if (!attempt || !attempt.completedAt) {
    return null;
  }

  const answersMap = new Map<string, string>();
  for (const ans of attempt.answers) {
    if (ans.selectedOptionId) {
      answersMap.set(ans.questionId, ans.selectedOptionId);
    }
  }

  const questionsReview = attempt.exam.questions.map(
    ({ order, question: q }) => {
      const selectedOptionId = answersMap.get(q.id) ?? null;
      const correctOption = q.options.find((opt) => opt.isCorrect);
      const selectedOption = q.options.find(
        (opt) => opt.id === selectedOptionId,
      );
      const isCorrect = Boolean(selectedOption?.isCorrect);

      return {
        order,
        questionId: q.id,
        questionText: q.question,
        explanation: q.explanation,
        isCorrect,
        hasAnswered: Boolean(selectedOptionId),
        selectedOptionText: selectedOption ? selectedOption.text : null,
        correctOptionText: correctOption ? correctOption.text : "Non définie",
        options: q.options.map((opt) => ({
          id: opt.id,
          text: opt.text,
          isCorrect: opt.isCorrect,
          isSelected: opt.id === selectedOptionId,
        })),
      };
    },
  );

  return {
    examTitle: attempt.exam.title,
    score: attempt.score,
    totalQuestions: attempt.totalQuestions,
    percentage: attempt.percentage,
    completedAt: attempt.completedAt.toISOString(),
    questions: questionsReview,
  };
}
