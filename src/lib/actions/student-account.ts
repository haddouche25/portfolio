"use server";

import { compare, hash } from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getCurrentStudent } from "@/lib/session";
import { SchoolLevel } from "@prisma/client";

export type PasswordState = null | {
  error: "wrong_current" | "too_short" | "too_long" | "mismatch" | "same";
};

export async function changeOwnPassword(
  _prev: PasswordState,
  formData: FormData,
): Promise<PasswordState> {
  const me = await getCurrentStudent();
  if (!me) redirect("/connexion");

  const current = String(formData.get("current") ?? "");
  const next = String(formData.get("next") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  if (next.length < 10) return { error: "too_short" };
  if (Buffer.byteLength(next) > 72) return { error: "too_long" }; // limite de bcrypt
  if (next !== confirm) return { error: "mismatch" };
  if (next === current) return { error: "same" };

  const row = await prisma.student.findUnique({
    where: { id: me.id },
    select: { passwordHash: true },
  });
  if (!row?.passwordHash || !(await compare(current, row.passwordHash))) {
    return { error: "wrong_current" };
  }

  await prisma.student.update({
    where: { id: me.id },
    data: { passwordHash: await hash(next, 12), mustChangePassword: false },
  });

  redirect("/espace");
}

export async function updateStudentProfile(formData: FormData) {
  const me = await getCurrentStudent();

  if (!me) throw new Error("Non autorisé");

  const firstName = formData.get("firstName")?.toString().trim();
  const lastName = formData.get("lastName")?.toString().trim();
  const phone = formData.get("phone")?.toString().trim();

  // Récupérer la valeur du select
  const levelValue = formData.get("level")?.toString().trim();
  const level = levelValue ? (levelValue as SchoolLevel) : null;

  await prisma.student.update({
    where: { id: me.id },
    data: {
      firstName: firstName || null,
      lastName: lastName || null,
      phone: phone || null,
      level: level, // <-- Mise à jour du niveau en base
    },
  });

  return { success: true };
}
