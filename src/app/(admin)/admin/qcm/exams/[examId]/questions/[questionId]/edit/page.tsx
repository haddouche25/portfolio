import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import EditQuestionForm from "@/components/admin/EditQuestionForm";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ examId: string; questionId: string }>;
}

export default async function EditQcmQuestionPage({ params }: PageProps) {
  const { examId, questionId } = await params;

  const question = await prisma.qcmQuestion.findUnique({
    where: { id: questionId },
    include: { options: true },
  });

  if (!question) return notFound();

  return (
    <div className="p-8 max-w-4xl mx-auto text-slate-100">
      <Link
        href={`/admin/qcm/exams/${examId}`}
        className="text-xs font-mono text-slate-400 hover:text-white inline-flex items-center gap-1.5 mb-4 transition"
      >
        &larr; Retour à l&apos;examen
      </Link>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <h1 className="text-2xl font-extrabold text-white tracking-tight mb-1">
          Modifier la question
        </h1>
        <p className="text-xs text-slate-400 mb-6">
          Éditez l&apos;énoncé, les propositions et l&apos;explication avec
          prévisualisation mathématique en direct.
        </p>

        <EditQuestionForm
          examId={examId}
          questionId={question.id}
          initialData={{
            topic: question.topic,
            difficulty: question.difficulty,
            question: question.question,
            explanation: question.explanation || "",
            options: question.options.map((o) => ({
              id: o.id,
              text: o.text,
              isCorrect: o.isCorrect,
            })),
          }}
        />
      </div>
    </div>
  );
}
