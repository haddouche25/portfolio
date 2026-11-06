"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useLanguage } from "@/context/LanguageContext";

const T = {
  FR: {
    eyebrow: "Espace élèves & familles",
    title: "Connexion",
    subtitle:
      "Accède à ton tableau de bord, tes séances et tes QCM premium avec les identifiants envoyés par ton coach.",
    email: "E-mail",
    password: "Mot de passe",
    submit: "Se connecter",
    loading: "Connexion…",
    error: "Identifiants incorrects.",
    noAccount: "Pas encore de compte ? Les accès sont créés par ton coach.",
    contact: "Me contacter",
  },
  EN: {
    eyebrow: "Students & families area",
    title: "Sign in",
    subtitle:
      "Access your dashboard, sessions and premium quizzes with the credentials sent by your coach.",
    email: "Email",
    password: "Password",
    submit: "Sign in",
    loading: "Signing in…",
    error: "Incorrect credentials.",
    noAccount: "No account yet? Access is created by your coach.",
    contact: "Contact me",
  },
} as const;

export default function StudentLoginForm({
  callbackUrl,
}: {
  callbackUrl: string;
}) {
  const { lang } = useLanguage();
  const t = T[lang];
  const router = useRouter();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const form = new FormData(e.currentTarget);
    const res = await signIn("student-credentials", {
      email: String(form.get("email") ?? ""),
      password: String(form.get("password") ?? ""),
      redirect: false,
    });
    if (!res || res.error) {
      setError(true);
      setLoading(false);
      return;
    }
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div className="min-h-[70vh] bg-slate-50 px-4 py-16 dark:bg-[#0f1115]">
      <div className="mx-auto max-w-md space-y-6">
        <div className="text-center">
          <span className="np-eyebrow">{t.eyebrow}</span>
          <h1 className="text-3xl font-black text-ink">
            <span className="np-highlight">{t.title}</span>
          </h1>
          <p className="mt-3 text-sm text-muted">{t.subtitle}</p>
        </div>

        <form onSubmit={onSubmit} className="np-card space-y-4 p-6" noValidate>
          <div>
            <label className="np-label" htmlFor="email">
              {t.email}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="username"
              required
              className="np-input"
            />
          </div>
          <div>
            <label className="np-label" htmlFor="password">
              {t.password}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="np-input"
            />
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-xs font-bold text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
            >
              {t.error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="np-btn-primary w-full disabled:opacity-60"
          >
            {loading ? t.loading : t.submit}
          </button>
        </form>

        <p className="text-center text-xs text-muted">
          {t.noAccount}{" "}
          <Link
            href="/contact"
            className="font-bold text-brand-orange hover:underline"
          >
            {t.contact}
          </Link>
        </p>
      </div>
    </div>
  );
}
