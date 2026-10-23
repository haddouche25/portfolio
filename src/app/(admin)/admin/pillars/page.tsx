import { prisma } from "@/lib/db";
import PillarsManager from "@/components/admin/PillarsManager";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Pillars Taxonomy | Admin Console",
};

export default async function AdminPillarsPage() {
  const pillars = await prisma.pillar.findMany({
    orderBy: { slug: "asc" },
    include: {
      _count: {
        select: { categories: true },
      },
    },
  });

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Top-Level Pillars
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Manage core structural pillars and domain namespaces.
        </p>
      </div>

      <PillarsManager initialPillars={pillars} />
    </div>
  );
}
