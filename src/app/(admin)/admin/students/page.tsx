import { prisma } from "@/lib/db";
import { requireAdminPage } from "@/lib/session";
import StudentAdminPanel, {
  type StudentRow,
} from "@/components/admin/StudentAdminPanel";

export const dynamic = "force-dynamic";

export default async function AdminStudentsPage() {
  await requireAdminPage();

  const students = await prisma.student.findMany({
    orderBy: { createdAt: "desc" },
    take: 300,
    select: {
      id: true,
      fullName: true,
      email: true,
      phone: true,
      level: true,
      isActive: true,
      passwordHash: true,
      mustChangePassword: true,
      lastLoginAt: true,
      createdAt: true,
      _count: { select: { attempts: true } },
    },
  });

  // Le hash ne quitte jamais le serveur : on ne transmet qu'un booléen.
  const rows: StudentRow[] = students.map((s) => ({
    id: s.id,
    fullName: s.fullName,
    email: s.email,
    phone: s.phone,
    level: s.level,
    isActive: s.isActive,
    hasPassword: Boolean(s.passwordHash),
    mustChangePassword: s.mustChangePassword,
    lastLoginAt: s.lastLoginAt ? s.lastLoginAt.toISOString() : null,
    createdAt: s.createdAt.toISOString(),
    attempts: s._count.attempts,
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-white">Élèves &amp; comptes</h1>
        <p className="text-sm text-slate-400 mt-1">
          Crée les accès de tes élèves. Le mot de passe provisoire n&apos;est
          affiché qu&apos;une seule fois.
        </p>
      </div>
      <StudentAdminPanel students={rows} />
    </div>
  );
}
