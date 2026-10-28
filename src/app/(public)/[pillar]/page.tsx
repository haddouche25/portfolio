import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { type PillarPageProps, resolveLocale } from "@/types/content";
import PillarClientView from "@/components/pillars/PillarClientView";

export async function generateMetadata({
  params,
  searchParams,
}: PillarPageProps): Promise<Metadata> {
  const { pillar } = await params;
  const { lang } = await searchParams;
  const locale = resolveLocale(lang);

  const pillarRecord = await prisma.pillar.findUnique({
    where: { slug: pillar },
  });

  if (!pillarRecord) {
    return { title: "Pillar Not Found" };
  }

  const title = locale === "fr" ? pillarRecord.titleFr : pillarRecord.titleEn;
  const description =
    locale === "fr" ? pillarRecord.descriptionFr : pillarRecord.descriptionEn;

  return {
    title: `${title} | Portfolio`,
    description: description ?? undefined,
  };
}

export default async function PillarHubPage({ params }: PillarPageProps) {
  const { pillar } = await params;

  const pillarData = await prisma.pillar.findUnique({
    where: { slug: pillar },
    include: {
      categories: {
        include: {
          articles: {
            where: { published: true },
            orderBy: { createdAt: "desc" },
            take: 3,
          },
        },
      },
    },
  });

  if (!pillarData) {
    notFound();
  }

  // Sérialisation des dates pour le passage au composant Client
  const serializedCategories = pillarData.categories.map((c) => ({
    id: c.id,
    slug: c.slug,
    titleEn: c.titleEn,
    titleFr: c.titleFr,
    descriptionEn: c.descriptionEn,
    descriptionFr: c.descriptionFr,
    articles: c.articles.map((a) => ({
      id: a.id,
      slug: a.slug,
      titleEn: a.titleEn,
      titleFr: a.titleFr,
      excerptEn: a.excerptEn,
      excerptFr: a.excerptFr,
      youtubeUrl: a.youtubeUrl,
      createdAt: a.createdAt.toISOString(),
    })),
  }));

  return (
    <PillarClientView
      pillarSlug={pillarData.slug}
      pillarIcon={pillarData.icon}
      pillarTitleFr={pillarData.titleFr}
      pillarTitleEn={pillarData.titleEn}
      pillarDescFr={pillarData.descriptionFr}
      pillarDescEn={pillarData.descriptionEn}
      categories={serializedCategories}
    />
  );
}
