import Link from "next/link";

export default function ArticleNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
      <h2 className="text-2xl font-bold text-white">Article Not Found</h2>
      <p className="text-sm text-slate-400">
        The requested article could not be found or has been removed.
      </p>
      <Link
        href="/admin/articles"
        className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500 transition-colors"
      >
        Back to Articles
      </Link>
    </div>
  );
}
