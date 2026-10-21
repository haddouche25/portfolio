import Link from "next/link";
import { type LocalizedArticleCard } from "@/types/content";

interface ArticleCardProps {
  article: LocalizedArticleCard;
  langSuffix: string;
}

export default function ArticleCard({ article, langSuffix }: ArticleCardProps) {
  const formattedDate = new Intl.DateTimeFormat(
    langSuffix.includes("fr") ? "fr-FR" : "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  ).format(new Date(article.createdAt));

  const href = `/${article.category.pillar.slug}/${article.category.slug}/${article.slug}${langSuffix}`;

  return (
    <article className="group flex flex-col justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 transition-all hover:border-blue-500/50 hover:shadow-md">
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
          <time dateTime={article.createdAt.toISOString()}>
            {formattedDate}
          </time>
          {article.youtubeUrl && (
            <span className="inline-flex items-center gap-1 rounded bg-red-50 dark:bg-red-950/50 px-2 py-0.5 text-red-600 dark:text-red-400 font-sans font-medium text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
              Video
            </span>
          )}
        </div>

        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          <Link href={href} className="focus:outline-none">
            {article.title}
          </Link>
        </h2>

        {article.excerpt && (
          <p className="line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {article.excerpt}
          </p>
        )}
      </div>

      <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80">
        <Link
          href={href}
          className="inline-flex items-center text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
        >
          {langSuffix.includes("fr") ? "Lire l'article" : "Read article"} &rarr;
        </Link>
      </div>
    </article>
  );
}
