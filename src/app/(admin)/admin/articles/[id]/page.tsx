import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import ArticleForm from "@/components/admin/ArticleForm";

interface EditArticlePageProps {
  params: Promise<{ id: string }>;
}
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Edit Article | Admin Console",
};

export default async function EditArticlePage({
  params,
}: EditArticlePageProps) {
  const { id } = await params;

  const [article, pillars] = await Promise.all([
    prisma.article.findUnique({
      where: { id },
    }),
    prisma.pillar.findMany({
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
    }),
  ]);

  if (!article) {
    notFound();
  }

  const initialFormData = {
    slug: article.slug,
    categoryId: article.categoryId,
    youtubeUrl: article.youtubeUrl || "",
    published: article.published,
    titleEn: article.titleEn,
    titleFr: article.titleFr,
    excerptEn: article.excerptEn || "",
    excerptFr: article.excerptFr || "",
    contentEn: article.contentEn,
    contentFr: article.contentFr,
  };

  return (
    <div className="py-2">
      <ArticleForm
        articleId={article.id}
        initialData={initialFormData}
        pillars={pillars}
      />
    </div>
  );
}
