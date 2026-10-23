import { prisma } from "@/lib/db";
import QuestionsClient from "@/components/qcm/QuestionsClient";

export const dynamic = "force-dynamic";

export default async function AdminQuestionsPage() {
  const questions = await prisma.qcmQuestion.findMany({
    include: {
      options: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-8 max-w-6xl mx-auto text-slate-100">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Banque de Questions QCM
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Gérez les énoncés mathématiques et algorithmiques avec support KaTeX
          et options multiples.
        </p>
      </div>

      <QuestionsClient questions={questions} />
    </div>
  );
}
