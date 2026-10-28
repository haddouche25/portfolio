import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // 👈 Ajout indispensable pour les tableaux
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import "katex/dist/katex.min.css";
import "highlight.js/styles/github-dark.css";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export default function MarkdownRenderer({
  content,
  className = "",
}: MarkdownRendererProps) {
  return (
    <div
      className={`prose prose-slate dark:prose-invert max-w-none 
        prose-headings:font-bold prose-headings:tracking-tight 
        prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
        prose-p:leading-relaxed prose-p:text-slate-700 dark:prose-p:text-slate-300
        prose-table:w-full prose-table:my-6 prose-table:border-collapse
        prose-th:border prose-th:border-slate-200 dark:prose-th:border-slate-800 prose-th:p-3 prose-th:bg-slate-50 dark:prose-th:bg-slate-900 prose-th:text-left
        prose-td:border prose-td:border-slate-200 dark:prose-td:border-slate-800 prose-td:p-3
        prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
        prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:bg-slate-100 dark:prose-code:bg-slate-800/80 prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
        prose-pre:p-4 prose-pre:rounded-xl prose-pre:bg-[#0d1117] prose-pre:border prose-pre:border-slate-800 prose-pre:shadow-sm
        prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:italic
        prose-img:rounded-xl prose-img:shadow-md
        ${className}`}
    >
      <ReactMarkdown
        remarkPlugins={[
          remarkGfm, // 👈 Active le support des tableaux, listes de tâches, barré, etc.
          [
            remarkMath,
            {
              singleDollarTextMath: true,
            },
          ],
        ]}
        rehypePlugins={[
          [
            rehypeKatex,
            {
              output: "htmlAndMathml",
              throwOnError: false,
              errorColor: "#ef4444",
              strict: false,
              trust: true,
            },
          ],
          [
            rehypeHighlight,
            {
              ignoreMissing: true,
              detect: true,
              aliases: {
                py: "python",
                ts: "typescript",
                js: "javascript",
                sh: "bash",
                zsh: "bash",
                shell: "bash",
                yml: "yaml",
                md: "markdown",
                prisma: "graphql",
              },
            },
          ],
        ]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
