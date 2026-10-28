"use client";

import React, { type ReactNode } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";

function PublicLayoutContent({ children }: { children: ReactNode }) {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900 antialiased dark:bg-[#0f1115] dark:text-slate-100 transition-colors duration-200">
      <Header lang={lang} onLanguageChange={setLang} />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
    </div>
  );
}

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <PublicLayoutContent>{children}</PublicLayoutContent>
    </LanguageProvider>
  );
}
