import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin Dashboard | Portfolio",
};

export default async function AdminDashboardPage() {
  const [
    totalPillars,
    totalCategories,
    publishedArticlesCount,
    draftArticlesCount,
    recentArticles,
  ] = await Promise.all([
    prisma.pillar.count(),
    prisma.category.count(),
    prisma.article.count({ where: { published: true } }),
    prisma.article.count({ where: { published: false } }),
    prisma.article.findMany({
      orderBy: { updatedAt: "desc" },
      take: 5,
      include: {
        category: {
          include: {
            pillar: true,
          },
        },
      },
    }),
  ]);

  const totalArticles = publishedArticlesCount + draftArticlesCount;

  const STATS = [
    {
      label: "Total Articles",
      value: totalArticles,
      sub: `${publishedArticlesCount} published · ${draftArticlesCount} drafts`,
      href: "/admin/articles",
      color: "border-blue-500/30 text-blue-400",
    },
    {
      label: "Categories",
      value: totalCategories,
      sub: "Active taxonomy nodes",
      href: "/admin/categories",
      color: "border-purple-500/30 text-purple-400",
    },
    {
      label: "Core Pillars",
      value: totalPillars,
      sub: "Maths, Coding, Computing",
      href: "/admin/pillars",
      color: "border-emerald-500/30 text-emerald-400",
    },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Dashboard Overview
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Real-time platform metrics and content inventory.
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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {STATS.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group relative rounded-xl border border-slate-800 bg-slate-950/60 p-6 transition-all hover:border-slate-700 hover:bg-slate-950"
          >
            <p className="text-xs font-mono uppercase tracking-wider text-slate-500">
              {stat.label}
            </p>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-4xl font-extrabold tracking-tight text-white font-mono">
                {stat.value}
              </span>
              <span className="text-xs font-semibold text-slate-500 group-hover:text-slate-300 transition-colors">
                Manage &rarr;
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-400">{stat.sub}</p>
          </Link>
        ))}
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-950/60 overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white">
              Recently Modified Articles
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              The latest 5 records created or updated in MariaDB.
            </p>
          </div>
          <Link
            href="/admin/articles"
            className="text-xs font-semibold text-blue-400 hover:underline"
          >
            View all articles &rarr;
          </Link>
        </div>

        {recentArticles.length === 0 ? (
          <div className="p-12 text-center text-sm text-slate-500">
            No articles found. Click &quot;New Article&quot; to create your
            first post.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-900/60 text-xs font-mono uppercase text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-6 py-3.5">Title</th>
                  <th className="px-6 py-3.5">Taxonomy</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Last Updated</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {recentArticles.map((article) => (
                  <tr
                    key={article.id}
                    className="hover:bg-slate-900/40 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-semibold text-white">
                        {article.titleEn}
                      </div>
                      <div className="text-xs text-slate-400 truncate max-w-xs">
                        {article.titleFr}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-300">
                        <span className="text-blue-400">
                          {article.category.pillar.slug}
                        </span>
                        <span className="text-slate-600">/</span>
                        <span>{article.category.slug}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4">
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
                    <td className="px-6 py-4 text-xs font-mono text-slate-400">
                      {new Intl.DateTimeFormat("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }).format(new Date(article.updatedAt))}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/articles/${article.id}`}
                        className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
