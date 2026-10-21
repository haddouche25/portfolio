import Link from "next/link";
import { connection } from "next/server";
import { prisma } from "@/lib/db";
import ArticleRowActions from "@/components/admin/ArticleRowActions";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Articles Management | Admin Console",
};

export default async function AdminArticlesPage() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      category: {
        include: {
          pillar: true,
        },
      },
    },
  });

  const totalCount = articles.length;
  const publishedCount = articles.filter((a) => a.published).length;
  const draftCount = totalCount - publishedCount;

  return (
    <div className="space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Articles
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Create, edit, localize, and publish content across pillars.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/articles/new"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
          >
            <span>+</span>
            <span>New Article</span>
          </Link>
        </div>
      </div>

      {/* Quick Status Subheader */}
      <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
        <span>
          Total: <strong className="text-white">{totalCount}</strong>
        </span>
        <span>&bull;</span>
        <span>
          Published:{" "}
          <strong className="text-emerald-400">{publishedCount}</strong>
        </span>
        <span>&bull;</span>
        <span>
          Drafts: <strong className="text-amber-400">{draftCount}</strong>
        </span>
      </div>

      {/* Main Table */}
      <div className="rounded-xl border border-slate-800 bg-slate-950/60 overflow-hidden">
        {articles.length === 0 ? (
          <div className="p-16 text-center space-y-4">
            <p className="text-slate-400 text-sm">
              No articles in the database yet.
            </p>
            <Link
              href="/admin/articles/new"
              className="inline-flex rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500"
            >
              Write First Article
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-900/60 text-xs font-mono uppercase text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">Title &amp; Slug</th>
                  <th className="px-6 py-4">Taxonomy</th>
                  <th className="px-6 py-4">Media</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Created</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {articles.map((article) => {
                  const pillarSlug = article.category.pillar.slug;
                  const categorySlug = article.category.slug;
                  const publicUrl = `/${pillarSlug}/${categorySlug}/${article.slug}`;

                  return (
                    <tr
                      key={article.id}
                      className="hover:bg-slate-900/40 transition-colors"
                    >
                      <td className="px-6 py-4 max-w-sm">
                        <div className="font-semibold text-white truncate">
                          {article.titleEn}
                        </div>
                        <div className="text-xs text-slate-400 truncate">
                          {article.titleFr}
                        </div>
                        <div className="font-mono text-[11px] text-slate-500 mt-1">
                          /{article.slug}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col gap-1 items-start">
                          <span className="inline-flex items-center gap-1 rounded bg-blue-950/60 border border-blue-900/60 px-2 py-0.5 text-[11px] font-mono text-blue-300">
                            <span>{article.category.pillar.icon ?? "✦"}</span>
                            <span>{article.category.pillar.slug}</span>
                          </span>
                          <span className="inline-flex items-center rounded bg-slate-900 border border-slate-800 px-2 py-0.5 text-[11px] font-mono text-slate-300">
                            {article.category.slug}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs font-mono">
                        {article.youtubeUrl ? (
                          <span className="inline-flex items-center gap-1 text-red-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                            YouTube
                          </span>
                        ) : (
                          <span className="text-slate-600">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {article.published ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-950/80 border border-emerald-800/80 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-950/80 border border-amber-800/80 px-2.5 py-0.5 text-xs font-medium text-amber-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                            Draft
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs font-mono text-slate-400">
                        {new Intl.DateTimeFormat("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }).format(new Date(article.createdAt))}
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <ArticleRowActions
                          id={article.id}
                          published={article.published}
                          viewUrl={publicUrl}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
