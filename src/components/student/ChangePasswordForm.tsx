"use client";

import { useActionState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { changeOwnPassword } from "@/lib/actions/student-account";

const T = {
  FR: {
    eyebrow: "Sécurité",
    title: "Change ton mot de passe",
    forced:
      "C'est ta première connexion : choisis un mot de passe personnel pour continuer.",
    optional: "Choisis un nouveau mot de passe personnel.",
    current: "Mot de passe actuel (provisoire)",
    next: "Nouveau mot de passe (8 caractères minimum)",
    confirm: "Confirmer le nouveau mot de passe",
    submit: "Enregistrer",
    saving: "Enregistrement…",
    errors: {
      wrong_current: "Le mot de passe actuel est incorrect.",
      too_short: "Le nouveau mot de passe doit faire au moins 8 caractères.",
      too_long: "Le nouveau mot de passe est trop long (72 octets maximum).",
      mismatch: "La confirmation ne correspond pas.",
      same: "Le nouveau mot de passe doit être différent de l'actuel.",
    },
  },
  EN: {
    eyebrow: "Security",
    title: "Change your password",
    forced:
      "This is your first sign-in: choose a personal password to continue.",
    optional: "Choose a new personal password.",
    current: "Current (temporary) password",
    next: "New password (at least 8 characters)",
    confirm: "Confirm new password",
    submit: "Save",
    saving: "Saving…",
    errors: {
      wrong_current: "The current password is incorrect.",
      too_short: "The new password must be at least 8 characters.",
      too_long: "The new password is too long (72 bytes maximum).",
      mismatch: "The confirmation does not match.",
      same: "The new password must be different from the current one.",
    },
  },
} as const;

export default function ChangePasswordForm({ forced }: { forced: boolean }) {
  const { lang } = useLanguage();
  const t = T[lang];
  const [state, action, pending] = useActionState(changeOwnPassword, null);

  return (
    <div className="min-h-[70vh] bg-slate-50 px-4 py-16 dark:bg-[#0f1115]">
      <div className="mx-auto max-w-md space-y-6">
        <div className="text-center">
          <span className="np-eyebrow">{t.eyebrow}</span>
          <h1 className="text-3xl font-black text-ink">
            <span className="np-highlight">{t.title}</span>
          </h1>
          <p className="mt-3 text-sm text-muted">
            {forced ? t.forced : t.optional}
          </p>
        </div>

        <form action={action} className="np-card space-y-4 p-6">
          <div>
            <label className="np-label" htmlFor="current">
              {t.current}
            </label>
            <input
              id="current"
              name="current"
              type="password"
              autoComplete="current-password"
              required
              className="np-input"
            />
          </div>
          <div>
            <label className="np-label" htmlFor="next">
              {t.next}
            </label>
            <input
              id="next"
              name="next"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
              className="np-input"
            />
          </div>
          <div>
            <label className="np-label" htmlFor="confirm">
              {t.confirm}
            </label>
            <input
              id="confirm"
              name="confirm"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
              className="np-input"
            />
          </div>

          {state?.error && (
            <p
              role="alert"
              className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-xs font-bold text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
            >
              {t.errors[state.error]}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="np-btn-primary w-full disabled:opacity-60"
          >
            {pending ? t.saving : t.submit}
          </button>
        </form>
      </div>
    </div>
  );
}
