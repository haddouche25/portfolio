"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

const T = {
  FR: {
    title: "Respect de votre vie privée",
    text: "Nous utilisons des cookies essentiels pour sécuriser vos sessions d'évaluations (QCM) et mémoriser vos réglages didactiques (thème, langue). Pour en savoir plus, consultez notre",
    privacyLink: "politique de confidentialité",
    refuse: "Refuser",
    accept: "Accepter",
  },
  EN: {
    title: "Privacy & Cookie Policy",
    text: "We use essential cookies to maintain secure exam sessions (MCQ) and remember your didactic preferences (theme, language). To learn more, read our",
    privacyLink: "privacy policy",
    refuse: "Decline",
    accept: "Accept",
  },
};

export default function CookieBanner() {
  const isHydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const { lang } = useLanguage();
  const t = T[lang] || T.FR;

  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== "undefined") {
      return !localStorage.getItem("cookie_consent");
    }
    return false;
  });

  if (!isHydrated || !isVisible) return null;

  const handleConsent = (choice: "accepted" | "declined") => {
    localStorage.setItem("cookie_consent", choice);
    setIsVisible(false);
  };

  return (
    <aside
      aria-label="Consentement cookies"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 p-4 rounded-2xl bg-surface border border-line shadow-2xl text-ink font-sans transition-all"
    >
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <span className="text-xl shrink-0" aria-hidden="true">
            🍪
          </span>
          <div className="text-xs text-muted leading-relaxed">
            <strong className="text-ink block font-bold mb-0.5">
              {t.title}
            </strong>
            {t.text}{" "}
            <Link
              href="/privacy"
              className="text-brand-orange hover:underline font-semibold"
            >
              {t.privacyLink}
            </Link>
            .
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-line/60">
          <button
            type="button"
            onClick={() => handleConsent("declined")}
            className="px-3 py-1.5 rounded-lg border border-line text-xs font-semibold text-muted hover:text-ink hover:bg-surface2 transition"
          >
            {t.refuse}
          </button>
          <button
            type="button"
            onClick={() => handleConsent("accepted")}
            className="px-3.5 py-1.5 rounded-lg bg-brand-orange hover:bg-brand-red text-white text-xs font-bold transition shadow-sm"
          >
            {t.accept}
          </button>
        </div>
      </div>
    </aside>
  );
}
