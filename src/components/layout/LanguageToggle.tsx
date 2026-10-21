"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type Locale } from "@/types/content";

interface LanguageToggleProps {
  className?: string;
}

export default function LanguageToggle({
  className = "",
}: LanguageToggleProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentLang: Locale = searchParams.get("lang") === "fr" ? "fr" : "en";

  const switchLanguage = (newLang: Locale) => {
    if (newLang === currentLang) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", newLang);

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div
      className={`inline-flex items-center rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-0.5 text-xs font-semibold ${className}`}
      role="group"
      aria-label="Language selection"
    >
      <button
        type="button"
        onClick={() => switchLanguage("en")}
        aria-pressed={currentLang === "en"}
        className={`px-2.5 py-1 rounded-md transition-all ${
          currentLang === "en"
            ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm"
            : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => switchLanguage("fr")}
        aria-pressed={currentLang === "fr"}
        className={`px-2.5 py-1 rounded-md transition-all ${
          currentLang === "fr"
            ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm"
            : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
        }`}
      >
        FR
      </button>
    </div>
  );
}
