"use server";

import { randomInt } from "crypto";
import { hash } from "bcryptjs";
import { revalidatePath } from "next/cache";
import { SchoolLevel } from "@prisma/client";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/session";

// Sans caractères ambigus (0/O, 1/l/I)
const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";

function generateTempPassword(length = 12) {
  let out = "";
  for (let i = 0; i < length; i++) out += ALPHABET[randomInt(ALPHABET.length)];
  return out;
}

function normalizePhone(raw: string): string | null | "invalid" {
  const p = raw.replace(/[\s().-]/g, "");
  if (!p) return null;
  if (/^0[5-7]\d{8}$/.test(p)) return "+212" + p.slice(1); // format marocain local
  if (/^\+?[0-9]{8,15}$/.test(p)) return p.startsWith("+") ? p : "+" + p;
  return "invalid";
}

export type CreateStudentState =
  | null
  | {
      ok: true;
      email: string;
      phone: string | null;
      tempPassword: string;
      activatedExisting: boolean;
    }
  | { ok: false; error: string };

export async function createStudentAccount(
  _prev: CreateStudentState,
  formData: FormData,
): Promise<CreateStudentState> {
  await requireAdmin();

  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const levelRaw = String(formData.get("level") ?? "");
  const phone = normalizePhone(String(formData.get("phone") ?? ""));

  if (!firstName || !lastName) {
    return { ok: false, error: "Prénom et nom obligatoires." };
  }
  if (
    firstName.length > 60 ||
    lastName.length > 60 ||
    email.length > 191 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return { ok: false, error: "E-mail ou nom invalide." };
  }
  if (phone === "invalid") {
    return { ok: false, error: "Numéro WhatsApp invalide (ex : 0612345678 ou +212612345678)." };
  }
  const level = (Object.values(SchoolLevel) as string[]).includes(levelRaw)
    ? (levelRaw as SchoolLevel)
    : null;

  const existing = await prisma.student.findUnique({
    where: { email },
    select: { id: true, passwordHash: true },
  });
  if (existing?.passwordHash) {
    return {
      ok: false,
      error:
        "Un compte actif existe déjà pour cet e-mail. Utilise « Nouveau mot de passe » dans la liste.",
    };
  }

  const tempPassword = generateTempPassword();
  const passwordHash = await hash(tempPassword, 12);
  const data = {
    fullName: `${firstName} ${lastName}`,
    firstName,
    lastName,
    phone,
    level,
    passwordHash,
    mustChangePassword: true,
    isActive: true,
  };

  // E-mail déjà connu (ancien élève ayant passé un QCM sans compte) :
  // on ACTIVE la ligne existante, l'historique est conservé.
  if (existing) {
    await prisma.student.update({ where: { id: existing.id }, data });
  } else {
    await prisma.student.create({ data: { ...data, email } });
  }

  revalidatePath("/admin/students");
  return {
    ok: true,
    email,
    phone,
    tempPassword,
    activatedExisting: Boolean(existing),
  };
}

export async function resetStudentPassword(
  studentId: string,
): Promise<{ ok: true; tempPassword: string } | { ok: false; error: string }> {
  await requireAdmin();
  const student = await prisma.student.findUnique({
    where: { id: studentId },
    select: { id: true },
  });
  if (!student) return { ok: false, error: "Élève introuvable." };

  const tempPassword = generateTempPassword();
  await prisma.student.update({
    where: { id: student.id },
    data: {
      passwordHash: await hash(tempPassword, 12),
      mustChangePassword: true,
      isActive: true,
    },
  });
  revalidatePath("/admin/students");
  return { ok: true, tempPassword };
}

export async function setStudentActive(
  studentId: string,
  active: boolean,
): Promise<{ ok: true } | { ok: false; error: string }> {
  await requireAdmin();
  const res = await prisma.student.updateMany({
    where: { id: studentId },
    data: { isActive: Boolean(active) },
  });
  if (res.count === 0) return { ok: false, error: "Élève introuvable." };
  revalidatePath("/admin/students");
  return { ok: true };
}
