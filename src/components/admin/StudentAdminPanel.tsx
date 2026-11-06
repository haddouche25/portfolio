"use client";

import {
  useActionState,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import {
  createStudentAccount,
  resetStudentPassword,
  setStudentActive,
} from "@/lib/actions/students-admin";

export interface StudentRow {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  level: string | null;
  isActive: boolean;
  hasPassword: boolean;
  mustChangePassword: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  attempts: number;
}

const LEVEL_LABELS: Record<string, string> = {
  COLLEGE_3AC: "3AC",
  TRONC_COMMUN: "Tronc commun",
  BAC_1: "1ère Bac",
  BAC_2: "2ème Bac",
};

const LOGIN_URL = "https://mhaddouche.com/connexion";

function whatsappLink(phone: string, email: string, password: string) {
  const msg =
    `Bonjour, voici votre accès à l'espace élève : ${LOGIN_URL}\n` +
    `E-mail : ${email}\n` +
    `Mot de passe provisoire : ${password}\n` +
    `Vous devrez le changer à la première connexion.`;
  return `https://wa.me/${phone.replace("+", "")}?text=${encodeURIComponent(msg)}`;
}

const inputCls =
  "w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-orange-500 focus:outline-none";
const labelCls =
  "block mb-1 text-[11px] font-bold uppercase tracking-wider text-slate-400";

export default function StudentAdminPanel({
  students,
}: {
  students: StudentRow[];
}) {
  const [state, formAction, creating] = useActionState(
    createStudentAccount,
    null,
  );
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, startTransition] = useTransition();
  const [revealed, setRevealed] = useState<Record<string, string>>({});

  useEffect(() => {
    if (state?.ok) formRef.current?.reset();
  }, [state]);

  function onReset(id: string) {
    if (
      !confirm(
        "Générer un nouveau mot de passe provisoire ? L'ancien ne fonctionnera plus.",
      )
    )
      return;
    startTransition(async () => {
      const r = await resetStudentPassword(id);
      if (r.ok) setRevealed((p) => ({ ...p, [id]: r.tempPassword }));
      else alert(r.error);
    });
  }

  function onToggle(id: string, active: boolean) {
    startTransition(async () => {
      const r = await setStudentActive(id, active);
      if (!r.ok) alert(r.error);
    });
  }

  return (
    <div className="space-y-8">
      {/* ---------- Création ---------- */}
      <section className="rounded-2xl border border-slate-800 bg-slate-950/40 p-6">
        <h2 className="text-sm font-black uppercase tracking-wider text-orange-400 mb-4">
          Nouveau compte élève
        </h2>
        <form
          ref={formRef}
          action={formAction}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <div>
            <label className={labelCls} htmlFor="firstName">Prénom</label>
            <input id="firstName" name="firstName" required className={inputCls} />
          </div>
          <div>
            <label className={labelCls} htmlFor="lastName">Nom</label>
            <input id="lastName" name="lastName" required className={inputCls} />
          </div>
          <div>
            <label className={labelCls} htmlFor="email">E-mail (identifiant)</label>
            <input id="email" name="email" type="email" required className={inputCls} />
          </div>
          <div>
            <label className={labelCls} htmlFor="phone">WhatsApp</label>
            <input id="phone" name="phone" placeholder="0612345678" className={inputCls} />
          </div>
          <div>
            <label className={labelCls} htmlFor="level">Niveau</label>
            <select id="level" name="level" className={inputCls} defaultValue="">
              <option value="">Non précisé</option>
              {Object.entries(LEVEL_LABELS).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              disabled={creating}
              className="rounded-lg bg-orange-500 px-5 py-2 text-sm font-black uppercase tracking-wider text-white hover:bg-orange-600 disabled:opacity-60"
            >
              {creating ? "Création…" : "Créer le compte"}
            </button>
          </div>
        </form>

        {state && !state.ok && (
          <p role="alert" className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300">
            {state.error}
          </p>
        )}

        {state?.ok && (
          <div className="mt-4 rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm">
            <p className="font-bold text-emerald-300">
              {state.activatedExisting
                ? "Compte activé (historique conservé)."
                : "Compte créé."}{" "}
              Copie ce mot de passe maintenant : il ne sera plus affiché.
            </p>
            <p className="mt-2 font-mono text-lg tracking-widest text-white">
              {state.tempPassword}
            </p>
            <p className="text-slate-400">Identifiant : {state.email}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(state.tempPassword)}
                className="rounded-lg border border-slate-600 px-3 py-1.5 text-xs font-bold text-slate-200 hover:border-orange-500"
              >
                Copier
              </button>
              {state.phone && (
                <a
                  href={whatsappLink(state.phone, state.email, state.tempPassword)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-700"
                >
                  Envoyer par WhatsApp
                </a>
              )}
            </div>
          </div>
        )}
      </section>

      {/* ---------- Liste ---------- */}
      <section className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/40">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400">
            <tr>
              <th className="px-4 py-3">Élève</th>
              <th className="px-4 py-3">Niveau</th>
              <th className="px-4 py-3">Statut</th>
              <th className="px-4 py-3">Tests</th>
              <th className="px-4 py-3">Dernière connexion</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="border-b border-slate-800/60 align-top">
                <td className="px-4 py-3">
                  <div className="font-bold text-slate-100">{s.fullName}</div>
                  <div className="text-xs text-slate-400">{s.email}</div>
                  {s.phone && <div className="text-xs text-slate-500">{s.phone}</div>}
                  {revealed[s.id] && (
                    <div className="mt-2 rounded border border-emerald-500/40 bg-emerald-500/10 px-2 py-1 text-xs">
                      Nouveau mot de passe :{" "}
                      <span className="font-mono text-sm text-white">{revealed[s.id]}</span>
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 text-slate-300">
                  {s.level ? LEVEL_LABELS[s.level] ?? s.level : "—"}
                </td>
                <td className="px-4 py-3 text-xs">
                  {!s.hasPassword ? (
                    <span className="rounded-full bg-slate-700 px-2 py-0.5 text-slate-200">Invité</span>
                  ) : !s.isActive ? (
                    <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-red-300">Désactivé</span>
                  ) : s.mustChangePassword ? (
                    <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-amber-300">Mot de passe provisoire</span>
                  ) : (
                    <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-emerald-300">Actif</span>
                  )}
                </td>
                <td className="px-4 py-3 text-slate-300">{s.attempts}</td>
                <td className="px-4 py-3 text-xs text-slate-400">
                  {s.lastLoginAt
                    ? new Date(s.lastLoginAt).toLocaleString("fr-MA", { timeZone: "Africa/Casablanca" })
                    : "—"}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      disabled={pending}
                      onClick={() => onReset(s.id)}
                      className="rounded-lg border border-slate-600 px-2.5 py-1 text-xs font-bold text-slate-200 hover:border-orange-500 disabled:opacity-50"
                    >
                      Nouveau mot de passe
                    </button>
                    {s.hasPassword && (
                      <button
                        type="button"
                        disabled={pending}
                        onClick={() => onToggle(s.id, !s.isActive)}
                        className="rounded-lg border border-slate-600 px-2.5 py-1 text-xs font-bold text-slate-200 hover:border-red-500 disabled:opacity-50"
                      >
                        {s.isActive ? "Désactiver" : "Réactiver"}
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-slate-500">
                  Aucun élève pour le moment.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
