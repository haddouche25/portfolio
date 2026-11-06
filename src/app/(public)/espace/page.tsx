// src/app/(public)/espace/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { requireStudent } from "@/lib/session";
import { prisma } from "@/lib/db";
import LogoutButton from "@/components/student/LogoutButton";
import StudentProfileForm from "@/components/student/StudentProfileForm";
import {
  BookOpen,
  Calendar,
  KeyRound,
  Target,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mon tableau de bord",
  robots: { index: false, follow: false },
};

export default async function EspacePage() {
  const me = await requireStudent();

  // 1. Récupération des données de l'élève avec toutes ses tentatives et les infos de l'examen
  const student = await prisma.student.findUnique({
    where: { id: me.id },
    include: {
      attempts: {
        include: { exam: true },
        orderBy: { startedAt: "desc" },
      },
    },
  });

  if (!student) return null;

  // 2. Séparation et calcul des métriques
  // On considère comme "terminé" un examen qui possède un score non nul (ou selon votre logique de base de données)
  // On considère comme "terminé" un examen qui a une date de fin (completedAt)
  // 2. Séparation des tentatives
  const finishedAttempts = student.attempts.filter(
    (a) => a.completedAt !== null,
  );
  const unfinishedAttempts = student.attempts.filter(
    (a) => a.completedAt === null,
  );

  // Calcul de la moyenne sur 20 ( (score / totalQuestions) * 20 )
  const avgScore = finishedAttempts.length
    ? (
        finishedAttempts.reduce((acc, a) => {
          const noteSur20 =
            a.totalQuestions > 0 ? (a.score / a.totalQuestions) * 20 : 0;
          return acc + noteSur20;
        }, 0) / finishedAttempts.length
      ).toFixed(1) // Arrondi à 1 décimale (ex: 14.5)
    : "--";

  // 3. Calcul de la Mieux notée et de la Pire notée
  let bestAttempt = { title: "--", score20: "" };
  let worstAttempt = { title: "--", score20: "" };

  if (finishedAttempts.length > 0) {
    // Tri par pourcentage (du plus grand au plus petit)
    const sortedAttempts = [...finishedAttempts].sort(
      (a, b) => b.percentage - a.percentage,
    );

    const best = sortedAttempts[0];
    const worst = sortedAttempts[sortedAttempts.length - 1];

    if (best) {
      bestAttempt = {
        title: best.exam?.title || "Examen",
        score20:
          best.totalQuestions > 0
            ? ((best.score / best.totalQuestions) * 20).toFixed(1)
            : "0.0",
      };
    }

    if (worst) {
      worstAttempt = {
        title: worst.exam?.title || "Examen",
        score20:
          worst.totalQuestions > 0
            ? ((worst.score / worst.totalQuestions) * 20).toFixed(1)
            : "0.0",
      };
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f1115] py-12">
      <div className="mx-auto max-w-6xl px-4 space-y-8">
        {/* EN-TÊTE : Titre et boutons d'action rapides */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black text-ink">
              Salut{" "}
              <span className="np-highlight">
                {student.firstName || student.fullName}
              </span>{" "}
            </h1>
            <p className="text-muted mt-1 font-medium">
              Niveau actuel :{" "}
              <span className="text-brand-orange">
                {student.level || "Non renseigné"}
              </span>
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/qcm"
              className="np-btn-primary flex items-center gap-2"
            >
              <BookOpen size={18} /> Liste des examens
            </Link>
            <Link
              href="/espace/disponibilites"
              className="flex items-center gap-2 rounded-lg border border-brand-orange/30 bg-orange-50 px-4 py-2 text-sm font-bold text-brand-orange hover:bg-orange-100 dark:border-brand-orange/50 dark:bg-brand-orange/10 dark:hover:bg-brand-orange/20 transition-colors"
            >
              <Calendar size={18} /> Disponibilités
            </Link>
            <Link
              href="/espace/mot-de-passe"
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
            >
              <KeyRound size={18} /> Sécurité
            </Link>
            <LogoutButton />
          </div>
        </div>

        {/* GRILLE PRINCIPALE */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* COLONNE GAUCHE : Profil */}
          <div className="lg:col-span-1 space-y-6">
            <div className="np-card p-6">
              <h2 className="text-xl font-black mb-6 flex items-center gap-2 text-ink">
                <Target className="text-brand-orange" size={24} />
                Mon Profil
              </h2>
              <StudentProfileForm student={student} />
            </div>
          </div>

          {/* COLONNE DROITE : Stats et Reprises */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cartes de statistiques */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="np-card p-4 flex flex-col items-center justify-center text-center">
                <div className="text-3xl font-black text-brand-orange">
                  {finishedAttempts.length}
                </div>
                <div className="text-xs font-bold text-muted uppercase mt-1">
                  QCM Terminés
                </div>
              </div>

              <div className="np-card p-4 flex flex-col items-center justify-center text-center">
                <div className="text-3xl font-black text-brand-orange">
                  {avgScore}/20
                </div>
                <div className="text-xs font-bold text-muted uppercase mt-1">
                  Score Moyen
                </div>
              </div>

              <div className="np-card p-4 flex flex-col items-center justify-center text-center">
                <TrendingUp className="text-green-500 mb-2" size={24} />
                <div
                  className="text-xs font-bold text-ink truncate w-full"
                  title={bestAttempt.title}
                >
                  {bestAttempt.title}
                </div>
                {bestAttempt.score20 && (
                  <div className="text-lg font-black text-brand-orange mt-1">
                    {bestAttempt.score20}
                    <span className="text-xs text-muted">/20</span>
                  </div>
                )}
                <div className="text-[10px] font-bold text-muted uppercase mt-1">
                  La mieux notée
                </div>
              </div>

              <div className="np-card p-4 flex flex-col items-center justify-center text-center">
                <TrendingDown className="text-red-500 mb-2" size={24} />
                <div
                  className="text-xs font-bold text-ink truncate w-full"
                  title={worstAttempt.title}
                >
                  {worstAttempt.title}
                </div>
                {worstAttempt.score20 && (
                  <div className="text-lg font-black text-brand-orange mt-1">
                    {worstAttempt.score20}
                    <span className="text-xs text-muted">/20</span>
                  </div>
                )}
                <div className="text-[10px] font-bold text-muted uppercase mt-1">
                  La pire notée
                </div>
              </div>
            </div>

            {/* Examens non terminés */}
            <div className="np-card p-6">
              <h2 className="text-xl font-black mb-4 text-ink flex items-center gap-2">
                ⏳ Examens en cours
              </h2>

              {unfinishedAttempts.length > 0 ? (
                <ul className="space-y-3">
                  {unfinishedAttempts.map((attempt) => (
                    <li
                      key={attempt.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50 dark:border-slate-800/60 dark:bg-[#16181d] gap-4"
                    >
                      <div>
                        <p className="font-bold text-sm text-ink">
                          {attempt.exam?.title || "Examen sans titre"}
                        </p>
                        <p className="text-xs text-muted mt-1">
                          Commencé le{" "}
                          {new Date(attempt.startedAt).toLocaleDateString(
                            "fr-FR",
                            { day: "numeric", month: "long", year: "numeric" },
                          )}
                        </p>
                      </div>
                      <Link
                        href={`/qcm/${attempt.examId}/attempt/${attempt.id}`}
                        className="text-xs font-black text-brand-orange hover:text-orange-500 hover:underline shrink-0"
                      >
                        Reprendre le test &rarr;
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-8 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/20">
                  <p className="text-sm font-bold text-muted">
                    Tu es à jour ! Aucun examen en cours.
                  </p>
                  <Link
                    href="/qcm"
                    className="text-xs font-bold text-brand-orange hover:underline mt-2 inline-block"
                  >
                    Découvrir de nouveaux tests
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
