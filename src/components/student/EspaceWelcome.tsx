"use client";

import { signOut } from "next-auth/react";
import { useLanguage } from "@/context/LanguageContext";

const T = {
  FR: { hello: "Bonjour", soon: "Ton tableau de bord arrive bientôt.", out: "Se déconnecter" },
  EN: { hello: "Hello", soon: "Your dashboard is coming soon.", out: "Sign out" },
} as const;

export default function EspaceWelcome({ name }: { name: string }) {
  const { lang } = useLanguage();
  const t = T[lang];
  return (
    <div className="min-h-[60vh] bg-slate-50 px-4 py-16 dark:bg-[#0f1115]">
      <div className="np-card mx-auto max-w-xl space-y-4 p-8 text-center">
        <h1 className="text-2xl font-black text-ink">
          {t.hello}, <span className="np-highlight">{name}</span>
        </h1>
        <p className="text-sm text-muted">{t.soon}</p>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/" })}
          className="np-btn-blue"
        >
          {t.out}
        </button>
      </div>
    </div>
  );
}
