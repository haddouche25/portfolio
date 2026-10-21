"use client";

import { useTransition } from "react";
import Link from "next/link";
import {
  toggleArticlePublished,
  deleteArticle,
} from "@/app/(admin)/admin/articles/actions";

interface ArticleRowActionsProps {
  id: string;
  published: boolean;
  viewUrl: string;
}

export default function ArticleRowActions({
  id,
  published,
  viewUrl,
}: ArticleRowActionsProps) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      await toggleArticlePublished(id, published);
    });
  };

  const handleDelete = () => {
    if (
      confirm(
        "Are you sure you want to delete this article? This action cannot be undone.",
      )
    ) {
      startTransition(async () => {
        await deleteArticle(id);
      });
    }
  };

  return (
    <div className="flex items-center justify-end gap-3 text-xs">
      {/* Toggle Published Status */}
      <button
        type="button"
        disabled={isPending}
        onClick={handleToggle}
        title={published ? "Unpublish" : "Publish"}
        className={`px-2.5 py-1 rounded-md font-mono transition-colors disabled:opacity-50 ${
          published
            ? "bg-amber-950/60 text-amber-400 hover:bg-amber-900/60 border border-amber-800/60"
            : "bg-emerald-950/60 text-emerald-400 hover:bg-emerald-900/60 border border-emerald-800/60"
        }`}
      >
        {isPending ? "..." : published ? "Unpublish" : "Publish"}
      </button>

      {/* Edit Link */}
      <Link
        href={`/admin/articles/${id}`}
        className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
      >
        Edit
      </Link>

      {/* Public View Preview */}
      <Link
        href={viewUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="p-1 text-slate-400 hover:text-slate-100 transition-colors"
        title="View on site"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.75"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
          />
        </svg>
      </Link>

      {/* Delete Button */}
      <button
        type="button"
        disabled={isPending}
        onClick={handleDelete}
        className="p-1 text-red-400/80 hover:text-red-300 transition-colors disabled:opacity-50"
        title="Delete article"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.75"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </button>
    </div>
  );
}
