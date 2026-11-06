// src/app/(public)/espace/disponibilites/StudentScheduleClient.tsx
"use client";

import { useEffect, useState, Fragment } from "react";
import Link from "next/link";
import { ArrowLeft, CalendarDays, CheckCircle2, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import {
  getStudentWeeklySchedule,
  studentReserveSlot,
  type StudentCell,
} from "@/lib/actions/schedule";

const STATUS_COLORS = {
  vert: "bg-gradient-to-br from-[#9ef01a] to-[#70e000] shadow-[inset_-2px_-2px_6px_rgba(0,0,0,0.3),_2px_4px_6px_rgba(0,0,0,0.1)]",
  orange:
    "bg-gradient-to-br from-[#f77f00] to-[#d65f00] shadow-[inset_-2px_-2px_6px_rgba(0,0,0,0.3),_2px_4px_6px_rgba(0,0,0,0.1)]",
  gris: "bg-gradient-to-br from-[#f3f9d2] to-[#b8c48b] shadow-[inset_-2px_-2px_6px_rgba(0,0,0,0.2),_2px_4px_6px_rgba(0,0,0,0.1)]",
  jaune:
    "bg-gradient-to-br from-[#ffd60a] to-[#ffb703] shadow-[inset_-2px_-2px_6px_rgba(0,0,0,0.2),_2px_4px_6px_rgba(0,0,0,0.1)]",
  rouge:
    "bg-gradient-to-br from-[#d62828] to-[#9e1b1b] shadow-[inset_-2px_-2px_6px_rgba(0,0,0,0.4),_2px_4px_6px_rgba(0,0,0,0.1)]",
  bleu: "bg-gradient-to-br from-[#00bbf9] to-[#0077b6] shadow-[inset_-2px_-2px_6px_rgba(0,0,0,0.3),_2px_4px_6px_rgba(0,0,0,0.1)]",
};

const HORAIRES = ["17H - 18H30", "19H - 20H30", "21H - 23H30"];

const T = {
  FR: {
    locale: "fr-FR",
    days: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
    back: "Retour",
    titleA: "Mes",
    titleB: "Disponibilités",
    intro: "Planning de la",
    thisWeek: "semaine en cours",
    introEnd: ". Clique sur une sphère verte pour réserver.",
    from: "du",
    to: "au",
    legend: {
      vert: "Disponible",
      jaune: "Ma séance (programmée)",
      rouge: "Annulé",
      gris: "Indisponible",
      bleu: "Reservé",
    },
    hover: {
      vert: (d: string, h: string) => `Disponible : ${d} à ${h}`,
      jaune: "Ta séance programmée",
      rouge: "Séance annulée par le professeur",
      orange: "Complet",
      gris: "Indisponible",
      bleu: "Reservé par l'élève",
    },
    reserve: (d: string, h: string) => `Réserver le créneau de ${d} à ${h}`,
    confirmTitle: "Réserver ce créneau ?",
    confirmBody1: "Tu es sur le point de bloquer le créneau du",
    confirmBody2: "Ce créneau te sera",
    confirmBody3: "immédiatement attribué",
    confirmBody4: "et deviendra indisponible pour les autres élèves.",
    cancel: "Annuler",
    yes: "Oui, réserver",
    ok: "Réservation confirmée ! Ton créneau est bloqué.",
    errors: {
      taken: "Désolé, ce créneau vient d'être pris.",
      session: "Ta session a expiré. Reconnecte-toi.",
      invalid: "Ce créneau n'est pas réservable.",
      error: "Une erreur est survenue. Réessaie dans un instant.",
      load: "Impossible de charger le planning. Reconnecte-toi puis réessaie.",
    },
  },
  EN: {
    locale: "en-GB",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    back: "Back",
    titleA: "My",
    titleB: "Availability",
    intro: "Schedule for the",
    thisWeek: "current week",
    introEnd: ". Click a green sphere to book.",
    from: "from",
    to: "to",
    legend: {
      vert: "Available",
      jaune: "My session (scheduled)",
      rouge: "Cancelled",
      gris: "Unavailable",
      bleu: "Booked by a student",
    },
    hover: {
      vert: (d: string, h: string) => `Book ${d} at ${h}`,
      jaune: "Your scheduled session",
      rouge: "Session cancelled by the teacher",
      orange: "Full",
      gris: "Unavailable",
      bleu: "Réservé par l'élève",
    },
    reserve: (d: string, h: string) => `Book the ${d} slot at ${h}`,
    confirmTitle: "Book this slot?",
    confirmBody1: "You are about to block the slot on",
    confirmBody2: "This slot will be",
    confirmBody3: "assigned to you immediately",
    confirmBody4: "and become unavailable to other students.",
    cancel: "Cancel",
    yes: "Yes, book it",
    ok: "Booking confirmed! Your slot is reserved.",
    errors: {
      taken: "Sorry, this slot has just been taken.",
      session: "Your session has expired. Please sign in again.",
      invalid: "This slot cannot be booked.",
      error: "Something went wrong. Please try again shortly.",
      load: "Could not load the schedule. Please sign in again and retry.",
    },
  },
} as const;

function getMonday(d: Date) {
  const date = new Date(d);
  const day = date.getDay();
  date.setDate(date.getDate() - day + (day === 0 ? -6 : 1));
  date.setHours(0, 0, 0, 0);
  return date;
}

const emptyGrid = (): StudentCell[][] =>
  Array.from({ length: 3 }, () => Array<StudentCell>(7).fill("gris"));

export default function StudentScheduleClient() {
  const { lang } = useLanguage();
  const t = T[lang];

  const [monday] = useState<Date>(() => getMonday(new Date()));
  const [matrix, setMatrix] = useState<StudentCell[][]>(emptyGrid);
  const [isLoading, setIsLoading] = useState(true);
  const [notice, setNotice] = useState<{ ok: boolean; text: string } | null>(
    null,
  );
  const [selectedSlot, setSelectedSlot] = useState<{
    r: number;
    c: number;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const data = await getStudentWeeklySchedule(monday.toISOString());
      if (cancelled) return;
      if (data) setMatrix(data);
      else setNotice({ ok: false, text: T[lang].errors.load });
      setIsLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [monday, lang]);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  const dm = (d: Date) =>
    d.toLocaleDateString(t.locale, { day: "numeric", month: "long" });
  const weekRange = `${t.from} ${dm(monday)} ${t.to} ${dm(sunday)}`;

  async function confirmReservation() {
    if (!selectedSlot) return;
    setIsSubmitting(true);
    const { r, c } = selectedSlot;
    const result = await studentReserveSlot(monday.toISOString(), r, c);

    if (result.success) {
      setMatrix((prev) => {
        const next = prev.map((row) => [...row]);
        next[r][c] = "jaune";
        return next;
      });
      setNotice({ ok: true, text: t.ok });
    } else {
      setNotice({ ok: false, text: t.errors[result.code] });
      // Le créneau a pu changer : on recharge la vraie grille.
      const data = await getStudentWeeklySchedule(monday.toISOString());
      if (data) setMatrix(data);
    }
    setSelectedSlot(null);
    setIsSubmitting(false);
  }

  const legendKeys = ["vert", "jaune", "rouge", "gris", "bleu"] as const;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f1115] py-12 relative">
      <div className="mx-auto max-w-4xl px-4 space-y-8">
        <Link
          href="/espace"
          className="inline-flex items-center gap-2 text-sm font-bold text-muted hover:text-brand-orange transition-colors"
        >
          <ArrowLeft size={16} /> {t.back}
        </Link>

        <div>
          <h1 className="text-3xl font-black text-ink flex items-center gap-3">
            <CalendarDays className="text-brand-orange" size={32} />
            {t.titleA} <span className="np-highlight">{t.titleB}</span>
          </h1>
          <p className="text-muted mt-2 font-medium">
            {t.intro} <strong className="text-ink">{t.thisWeek}</strong>
            <span className="text-brand-orange ml-1">({weekRange})</span>
            {t.introEnd}
          </p>
        </div>

        {notice && (
          <p
            role="status"
            className={`rounded-lg border px-4 py-3 text-sm font-bold ${
              notice.ok
                ? "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300"
                : "border-red-300 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
            }`}
          >
            {notice.text}
          </p>
        )}

        {/* Légende : seulement ce que l'élève peut réellement voir */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 py-2">
          {legendKeys.map((k) => (
            <div key={k} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${STATUS_COLORS[k]}`} />
              <span className="text-xs font-bold text-ink">{t.legend[k]}</span>
            </div>
          ))}
        </div>

        <div className="np-card bg-slate-50 p-4 md:p-8 relative">
          {isLoading && (
            <div className="absolute inset-0 z-10 bg-white/50 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center rounded-2xl">
              <Loader2 className="animate-spin text-brand-orange" size={40} />
            </div>
          )}

          <div className="overflow-x-auto pb-4">
            <div className="min-w-[500px] grid grid-cols-[100px_repeat(7,1fr)] gap-x-2 gap-y-6 items-center">
              <div className="text-transparent">.</div>
              {t.days.map((jour) => (
                <div
                  key={jour}
                  className="text-center font-black text-sm  text-black"
                >
                  {jour}
                </div>
              ))}

              {HORAIRES.map((horaire, r) => (
                <Fragment key={horaire}>
                  <div className="text-right text-xs md:text-sm font-bold text-brand-orange pr-2 border-r border-slate-200 dark:border-slate-800">
                    {horaire}
                  </div>

                  {t.days.map((jour, c) => {
                    const status = matrix[r][c];
                    const isAvailable = status === "vert";
                    const title =
                      status === "vert"
                        ? t.hover.vert(jour, horaire)
                        : t.hover[status];

                    return (
                      <div
                        key={`${horaire}-${jour}`}
                        className="flex justify-center"
                      >
                        {isAvailable ? (
                          <button
                            type="button"
                            onClick={() => setSelectedSlot({ r, c })}
                            title={title}
                            aria-label={t.reserve(jour, horaire)}
                            className={`w-8 h-8 md:w-10 md:h-10 rounded-full transition-all hover:scale-110 hover:ring-4 hover:ring-[#8ec969]/40 cursor-pointer ${STATUS_COLORS[status]}`}
                          />
                        ) : (
                          <div
                            title={title}
                            role="img"
                            aria-label={title}
                            className={`w-8 h-8 md:w-10 md:h-10 rounded-full cursor-default ${STATUS_COLORS[status]}`}
                          />
                        )}
                      </div>
                    );
                  })}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedSlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#16181d] rounded-2xl p-6 md:p-8 max-w-sm w-full shadow-2xl border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="text-[#8ec969]" size={28} />
              <h3 className="text-xl font-black text-ink">{t.confirmTitle}</h3>
            </div>

            <p className="text-sm text-muted mb-6 leading-relaxed">
              {t.confirmBody1}{" "}
              <strong className="text-ink">
                {t.days[selectedSlot.c]} · {HORAIRES[selectedSlot.r]}
              </strong>
              .<br />
              <br />
              {t.confirmBody2}{" "}
              <span className="text-brand-orange font-bold">
                {t.confirmBody3}
              </span>{" "}
              {t.confirmBody4}
            </p>

            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setSelectedSlot(null)}
                disabled={isSubmitting}
                className="px-4 py-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50"
              >
                {t.cancel}
              </button>
              <button
                type="button"
                onClick={confirmReservation}
                disabled={isSubmitting}
                className="px-4 py-2 text-sm font-bold text-white bg-brand-orange hover:bg-orange-600 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isSubmitting ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  t.yes
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
