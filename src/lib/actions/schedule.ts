//src\lib\actions/schedule.ts
"use server";

import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { getCurrentStudent, requireAdmin } from "@/lib/session";

// ---------------------------------------------------------------------------
// Format d'une case de la grille : "statut" ou "statut:identifiantÉlève".
//   statuts : vert | orange | gris | jaune | rouge
// Anciens formats encore lus : "statut:Prénom" et "statut:Prénom:identifiant".
// Les NOUVELLES écritures utilisent toujours l'identifiant (jamais le prénom :
// deux élèves peuvent s'appeler pareil).
// ---------------------------------------------------------------------------

const ROWS = 3;
const COLS = 7;
const JOURS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const HORAIRES = ["17H - 18H30", "19H - 20H30", "21H - 23H30"];
const STATUSES = ["vert", "orange", "gris", "jaune", "rouge", "bleu"];
const CUID_RE = /^c[a-z0-9]{24}$/;

/** Ce que l'ÉLÈVE reçoit : uniquement une couleur par case, jamais un nom ni un identifiant. */
export type StudentCell =
  | "vert"
  | "orange"
  | "gris"
  | "jaune"
  | "rouge"
  | "bleu";
export type ReserveResult =
  | { success: true }
  | { success: false; code: "session" | "invalid" | "taken" | "error" };

// --------------------------- utilitaires internes ---------------------------

function emptyMatrix(): string[][] {
  // Array.from : chaque ligne est un tableau distinct (Array(3).fill(Array(7)) les partagerait)
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => "gris"),
  );
}

function isValidMatrix(m: unknown): m is string[][] {
  return (
    Array.isArray(m) &&
    m.length === ROWS &&
    m.every(
      (row) =>
        Array.isArray(row) &&
        row.length === COLS &&
        row.every(
          (c) =>
            typeof c === "string" &&
            c.length <= 200 &&
            STATUSES.includes(c.split(":")[0]),
        ),
    )
  );
}

function toMatrix(json: unknown): string[][] {
  return isValidMatrix(json) ? json.map((r) => [...r]) : emptyMatrix();
}

function parseCell(cell: string) {
  const [status, a, b] = (cell || "gris").split(":");
  const studentId = b ?? (a && CUID_RE.test(a) ? a : undefined);
  const legacyName = !studentId && a ? a : undefined;
  return { status, studentId, legacyName };
}

function parseMonday(value: string): Date | null {
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

// Empêche de créer des réservations dans une semaine très ancienne ou lointaine.
function isReservableWeek(monday: Date) {
  const now = Date.now();
  const day = 24 * 3600 * 1000;
  return (
    monday.getTime() >= now - 7 * day && monday.getTime() <= now + 60 * day
  );
}

/**
 * Transforme la grille brute en grille pour UN élève :
 *  - ses propres séances : jaune (programmée) ou rouge (annulée par le prof)
 *  - les séances des AUTRES élèves, quel que soit leur statut : gris (indisponible)
 *  - créneaux sans élève : vert (libre), orange (complet posé par le prof), sinon gris
 */
function matrixForStudent(
  matrix: string[][],
  me: { id: string; names: string[] },
): StudentCell[][] {
  const myNames = new Set(
    me.names.map((n) => n.trim().toLowerCase()).filter(Boolean),
  );

  return matrix.map((row) =>
    row.map((cell): StudentCell => {
      const { status, studentId, legacyName } = parseCell(cell);

      if (studentId || legacyName) {
        const isMine = studentId
          ? studentId === me.id
          : myNames.has((legacyName as string).trim().toLowerCase());

        if (!isMine) return "gris"; // Les séances des autres élèves deviennent grises (indisponibles)
        if (status === "rouge") return "rouge";
        if (status === "bleu" || status === "orange") return "bleu"; // Ses propres réservations en bleu
        if (status === "jaune") return "jaune"; // Séances programmées par l'admin
        return "gris";
      }

      if (status === "vert") return "vert";
      if (status === "orange") return "orange";
      return "gris";
    }),
  );
}

// ===========================================================================
// ADMIN : toutes ces actions exigent le rôle admin (elles étaient appelables
// par n'importe quel visiteur, y compris pour écraser ton planning).
// ===========================================================================

export async function saveWeeklySchedule(mondayStr: string, matrix: unknown) {
  await requireAdmin();
  const mondayDate = parseMonday(mondayStr);
  if (!mondayDate || !isValidMatrix(matrix))
    throw new Error("Données invalides");

  await prisma.weeklySchedule.upsert({
    where: { mondayDate },
    update: { matrix },
    create: { mondayDate, matrix },
  });
  return { success: true };
}

/** Grille brute (avec identifiants d'élèves) : ADMIN uniquement. */
export async function getWeeklySchedule(mondayStr: string) {
  await requireAdmin();
  const mondayDate = parseMonday(mondayStr);
  if (!mondayDate) return null;
  const schedule = await prisma.weeklySchedule.findUnique({
    where: { mondayDate },
  });
  return schedule?.matrix || null;
}

export async function reserveAdminSlot(
  studentId: string,
  mondayStr: string,
  jour: string,
  horaire: string,
  newMatrix: unknown,
) {
  await requireAdmin();
  const mondayDate = parseMonday(mondayStr);
  if (
    !mondayDate ||
    !isValidMatrix(newMatrix) ||
    !JOURS.includes(jour) ||
    !HORAIRES.includes(horaire)
  ) {
    throw new Error("Données invalides");
  }
  const student = await prisma.student.findUnique({
    where: { id: studentId },
    select: { id: true },
  });
  if (!student) throw new Error("Élève introuvable");

  await prisma.$transaction([
    prisma.reservation.create({
      data: { studentId: student.id, mondayDate, jour, horaire },
    }),
    prisma.weeklySchedule.upsert({
      where: { mondayDate },
      update: { matrix: newMatrix },
      create: { mondayDate, matrix: newMatrix },
    }),
  ]);
  return { success: true };
}

export async function saveScheduleTemplate(matrix: unknown) {
  await requireAdmin();
  if (!isValidMatrix(matrix)) throw new Error("Données invalides");
  await prisma.scheduleTemplate.upsert({
    where: { id: "default" },
    update: { matrix },
    create: { id: "default", matrix },
  });
  return { success: true };
}

export async function getScheduleTemplate() {
  await requireAdmin();
  const template = await prisma.scheduleTemplate.findUnique({
    where: { id: "default" },
  });
  return template?.matrix || null;
}

// ===========================================================================
// ÉLÈVE : l'identité vient TOUJOURS de la session, jamais d'un paramètre.
// ===========================================================================

/** Grille filtrée côté serveur : aucune information sur les autres élèves ne sort d'ici. */
export async function getStudentWeeklySchedule(
  mondayStr: string,
): Promise<StudentCell[][] | null> {
  const me = await getCurrentStudent();
  if (!me) return null;
  const mondayDate = parseMonday(mondayStr);
  if (!mondayDate) return null;

  const weekly = await prisma.weeklySchedule.findUnique({
    where: { mondayDate },
  });

  let matrix: string[][];
  if (weekly) {
    matrix = toMatrix(weekly.matrix);
  } else {
    const template = await prisma.scheduleTemplate.findUnique({
      where: { id: "default" },
    });
    matrix = toMatrix(template?.matrix);
  }

  return matrixForStudent(matrix, {
    id: me.id,
    names: [me.firstName ?? "", me.fullName],
  });
}

export async function studentReserveSlot(
  mondayStr: string,
  rowIndex: number,
  colIndex: number,
): Promise<ReserveResult> {
  const me = await getCurrentStudent();
  if (!me) return { success: false, code: "session" };

  const mondayDate = parseMonday(mondayStr);
  if (
    !mondayDate ||
    !isReservableWeek(mondayDate) ||
    !Number.isInteger(rowIndex) ||
    !Number.isInteger(colIndex) ||
    rowIndex < 0 ||
    rowIndex >= ROWS ||
    colIndex < 0 ||
    colIndex >= COLS
  ) {
    return { success: false, code: "invalid" };
  }

  try {
    // Transaction sérialisée : deux élèves qui cliquent en même temps sur le
    // même créneau ne peuvent pas tous les deux réussir.
    const reserved = await prisma.$transaction(
      async (tx) => {
        const weekly = await tx.weeklySchedule.findUnique({
          where: { mondayDate },
        });
        let matrix: string[][];
        if (weekly) {
          matrix = toMatrix(weekly.matrix);
        } else {
          const template = await tx.scheduleTemplate.findUnique({
            where: { id: "default" },
          });
          matrix = toMatrix(template?.matrix);
        }

        const { status, studentId, legacyName } = parseCell(
          matrix[rowIndex][colIndex],
        );
        if (status !== "vert" || studentId || legacyName) return false;

        matrix[rowIndex][colIndex] = `bleu:${me.id}`;

        await tx.weeklySchedule.upsert({
          where: { mondayDate },
          update: { matrix },
          create: { mondayDate, matrix },
        });
        await tx.reservation.create({
          data: {
            studentId: me.id,
            mondayDate,
            jour: JOURS[colIndex],
            horaire: HORAIRES[rowIndex],
          },
        });
        return true;
      },
      { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
    );

    return reserved ? { success: true } : { success: false, code: "taken" };
  } catch {
    return { success: false, code: "error" };
  }
}
