import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import StudentExamRunner from "@/components/qcm/StudentExamRunner";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function StudentExamPage({ params }: Props) {
  const { slug } = await params;

  const exam = await prisma.qcmExam.findUnique({
    where: { slug, published: true },
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
  });

  if (!exam) return notFound();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <StudentExamRunner
          examId={exam.id}
          title={exam.title}
          timeLimitMinutes={exam.timeLimitMinutes}
          questions={exam.questions.map((eq) => ({
            id: eq.question.id,
            question: eq.question.question,
            explanation: eq.question.explanation,
            options: eq.question.options.map((opt) => ({
              id: opt.id,
              text: opt.text,
              isCorrect: opt.isCorrect,
            })),
          }))}
        />
      </div>
    </div>
  );
}
