import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import {
  type ArticlePageProps,
  articleWithRelationsArgs,
  localizeArticle,
  resolveLocale,
} from "@/types/content";
import YouTubeEmbed from "@/components/renderers/YouTubeEmbed";
import MarkdownRenderer from "@/components/renderers/MarkdownRenderer";

export async function generateMetadata({
  params,
  searchParams,
}: ArticlePageProps): Promise<Metadata> {
  const { pillar, category, slug } = await params;
  const { lang } = await searchParams;
  const locale = resolveLocale(lang);

  const rawArticle = await prisma.article.findFirst({
    where: {
      slug,
      published: true,
      category: {
        slug: category,
        pillar: { slug: pillar },
      },
    },
    ...articleWithRelationsArgs,
  });

  if (!rawArticle) {
    return { title: "Article Not Found" };
  }

  const article = localizeArticle(rawArticle, locale);

  return {
    title: `${article.title} | ${article.category.title}`,
    description: article.excerpt ?? undefined,
    openGraph: {
      title: article.title,
      description: article.excerpt ?? undefined,
      type: "article",
      publishedTime: article.createdAt.toISOString(),
    },
  };
}

export default async function ArticlePage({
  params,
  searchParams,
}: ArticlePageProps) {
  const { pillar, category, slug } = await params;
  const { lang } = await searchParams;
  const locale = resolveLocale(lang);
  const langSuffix = locale === "fr" ? "?lang=fr" : "";

  const rawArticle = await prisma.article.findFirst({
    where: {
      slug,
      published: true,
      category: {
        slug: category,
        pillar: { slug: pillar },
      },
    },
    ...articleWithRelationsArgs,
  });

  if (!rawArticle) {
    notFound();
  }

  const article = localizeArticle(rawArticle, locale);

  const formattedDate = new Intl.DateTimeFormat(
    locale === "fr" ? "fr-FR" : "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  ).format(new Date(article.createdAt));

  return (
    <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16">
      {/* Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400 font-medium"
      >
        <Link
          href={`/${pillar}${langSuffix}`}
          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          {article.category.pillar.title}
        </Link>
        <span className="text-slate-400 dark:text-slate-600">/</span>
        <Link
          href={`/${pillar}/${category}${langSuffix}`}
          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          {article.category.title}
        </Link>
      </nav>

      {/* Header Section */}
      <header className="mb-10 space-y-4">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-slate-900 dark:text-slate-50">
          {article.title}
        </h1>

        {article.excerpt && (
          <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            {article.excerpt}
          </p>
        )}

        <div className="flex items-center gap-4 text-xs font-mono text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-900">
          <time dateTime={article.createdAt.toISOString()}>
            {formattedDate}
          </time>
          <span>&bull;</span>
          <span className="rounded bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-slate-700 dark:text-slate-300">
            {article.category.title}
          </span>
        </div>
      </header>

      {/* Featured Video Embed */}
      {article.youtubeUrl && (
        <section className="mb-10">
          <YouTubeEmbed urlOrId={article.youtubeUrl} title={article.title} />
        </section>
      )}

      {/* Markdown, KaTeX & Code Content */}
      <section className="border-t border-slate-200/80 dark:border-slate-800/80 pt-8">
        <MarkdownRenderer content={article.content} />
      </section>
    </article>
  );
}
