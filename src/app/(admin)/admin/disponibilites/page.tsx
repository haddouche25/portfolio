// src/app/(admin)/admin/disponibilites/page.tsx
import { prisma } from "@/lib/db";
import { requireAdminPage } from "@/lib/session";
import AdminScheduleClient from "./AdminScheduleClient";

export const dynamic = "force-dynamic";

export default async function AdminSchedulePage() {
  // Défense en profondeur : le middleware filtre déjà /admin, la page revérifie le rôle.
  await requireAdminPage();

  // 1. Date la plus ancienne
  const oldestSchedule = await prisma.weeklySchedule.findFirst({
    orderBy: { mondayDate: "asc" },
    select: { mondayDate: true },
  });

  // 2. Élèves qui ont un compte (un invité sans mot de passe ne verrait jamais sa séance)
  const students = await prisma.student.findMany({
    where: { passwordHash: { not: null } },
    select: { id: true, firstName: true, fullName: true, level: true },
    orderBy: [{ firstName: "asc" }, { fullName: "asc" }],
  });

  return (
    <AdminScheduleClient
      oldestMondayDB={oldestSchedule?.mondayDate || null}
      students={students}
    />
  );
}
