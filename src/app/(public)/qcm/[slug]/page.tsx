import type { Metadata } from "next";
import { cache } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import StudentExamRunner from "@/components/qcm/StudentExamRunner";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

// Cache de la requête pour l'utiliser à la fois dans generateMetadata et la page
const getExam = cache(async (slug: string) => {
  return prisma.qcmExam.findUnique({
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
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const exam = await getExam(slug);

  if (!exam) {
    return {
      title: "Évaluation non trouvée | Mohamed Haddouche",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mhaddouche.com";
  const title = `${exam.title} | Évaluation QCM`;
  const description =
    exam.description ||
    `Testez vos compétences avec cette évaluation de ${exam.questions.length} questions. Correction détaillée incluse.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteUrl}/qcm/${slug}`,
      type: "website",
      locale: "fr_FR",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function StudentExamPage({ params }: Props) {
  const { slug } = await params;
  const exam = await getExam(slug);

  if (!exam) return notFound();

  const count = exam.questions.length;

  return (
    <div className="min-h-screen bg-background text-ink font-sans antialiased selection:bg-brand-red selection:text-white">
      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 space-y-8">
        {/* Navigation */}
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/qcm"
            className="text-xs font-bold text-muted hover:text-brand-red flex items-center gap-1.5 transition"
          >
            &larr; Retour au catalogue QCM
          </Link>
        </div>

        {/* En-tête */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
            Passez votre <span className="np-highlight">Évaluation</span>
          </h1>
          <p className="text-muted text-sm mt-3 max-w-2xl leading-relaxed">
            {count} question{count > 1 ? "s" : ""}
            {exam.timeLimitMinutes
              ? ` • ${exam.timeLimitMinutes} minutes`
              : " • sans limite de temps"}
            . La correction détaillée est disponible dès la fin de
            l&apos;épreuve.
          </p>
        </div>

        {/* Zone d'épreuve : même carte que le reste du site.
            La classe "dark" garde le runner lisible dans les deux thèmes. */}
        <div className="np-card p-4 sm:p-8 border-t-4 border-t-brand-red">
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
      </main>
    </div>
  );
}
