import { prisma } from "@/lib/db";
import ArticleForm from "@/components/admin/ArticleForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "New Article | Admin Console",
};

export default async function NewArticlePage() {
  const pillars = await prisma.pillar.findMany({
    orderBy: { slug: "asc" },
    include: {
      categories: {
        orderBy: { slug: "asc" },
        select: {
          id: true,
          slug: true,
          titleEn: true,
        },
      },
    },
  });

  return (
    <div className="py-2">
      <ArticleForm pillars={pillars} />
    </div>
  );
}
