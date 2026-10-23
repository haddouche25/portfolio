import { prisma } from "@/lib/db";
import CategoriesManager from "@/components/admin/CategoriesManager";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Categories Taxonomy | Admin Console",
};

export default async function AdminCategoriesPage() {
  const [categories, pillars] = await Promise.all([
    prisma.category.findMany({
      orderBy: [{ pillar: { slug: "asc" } }, { slug: "asc" }],
      include: {
        pillar: {
          select: {
            slug: true,
            titleEn: true,
          },
        },
        _count: {
          select: { articles: true },
        },
      },
    }),
    prisma.pillar.findMany({
      orderBy: { slug: "asc" },
      select: {
        id: true,
        slug: true,
        titleEn: true,
      },
    }),
  ]);

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Categories
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Organize subtopics and technical taxonomy under each core pillar.
        </p>
      </div>

      <CategoriesManager initialCategories={categories} pillars={pillars} />
    </div>
  );
}
