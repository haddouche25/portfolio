import ReactMarkdown from "react-markdown";
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
        prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
        prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:bg-slate-100 dark:prose-code:bg-slate-800/80 prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
        prose-pre:p-4 prose-pre:rounded-xl prose-pre:bg-[#0d1117] prose-pre:border prose-pre:border-slate-800 prose-pre:shadow-sm
        prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:italic
        prose-img:rounded-xl prose-img:shadow-md
        ${className}`}
    >
      <ReactMarkdown
        remarkPlugins={[
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
              // Do not crash when encountering unfamiliar language fences (e.g., ```pseudocode)
              ignoreMissing: true,
              // Auto-detect language if no identifier is provided on the code fence
              detect: true,
              // Map shorthand notations to highlight.js language parsers
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
