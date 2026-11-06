import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

/** À appeler en PREMIÈRE ligne de chaque Server Action / route API d'administration. */
export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") {
    throw new Error("Non autorisé");
  }
  return session;
}

/** Pour les pages d'administration (redirige au lieu de lever une erreur). */
export async function requireAdminPage() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") redirect("/admin/login");
  return session;
}

/**
 * Élève connecté, relu en base à chaque appel : un compte désactivé perd son
 * accès immédiatement, même si son jeton est encore valide. Jamais de hash renvoyé.
 */
export async function getCurrentStudent() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "student" || !session.user.studentId) return null;

  return prisma.student.findFirst({
    where: {
      id: session.user.studentId,
      isActive: true,
      passwordHash: { not: null },
    },
    select: {
      id: true,
      fullName: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      level: true,
      mustChangePassword: true,
    },
  });
}

/** Pour les pages /espace : redirige vers la connexion, ou vers le changement de mot de passe. */
export async function requireStudent(opts: { allowMustChange?: boolean } = {}) {
  const student = await getCurrentStudent();
  if (!student) redirect("/connexion");
  if (student.mustChangePassword && !opts.allowMustChange) {
    redirect("/espace/mot-de-passe");
  }
  return student;
}
