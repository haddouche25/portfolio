// src/app/(admin)/admin/disponibilites/AdminScheduleClient.tsx
"use client";

import { useState, useEffect, useRef, Fragment } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  X,
  Save,
  CheckCircle,
  Loader2,
  UserPlus,
} from "lucide-react";
import {
  saveWeeklySchedule,
  getWeeklySchedule,
  reserveAdminSlot,
  saveScheduleTemplate,
  getScheduleTemplate,
} from "@/lib/actions/schedule";

interface StudentOption {
  id: string;
  firstName: string | null;
  fullName: string;
  level: string | null;
}

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

const LEVEL_LABELS: Record<string, string> = {
  COLLEGE_3AC: "3AC",
  TRONC_COMMUN: "Tronc commun",
  BAC_1: "1ère Bac",
  BAC_2: "2ème Bac",
};

// Libellés au survol : couvrent tous les cas
const getAdminLabel = (rawStatus: string, studentName?: string) => {
  if (studentName) {
    if (rawStatus === "bleu") return `Réservé par l'élève : ${studentName}`;
    if (rawStatus === "jaune") return `Programmé : ${studentName}`;
    if (rawStatus === "orange") return `Complet : ${studentName}`;
    if (rawStatus === "rouge") return `Annulé : ${studentName}`;
    return studentName;
  }
  switch (rawStatus) {
    case "vert":
      return "Disponible";
    case "gris":
      return "Libre (Indisponible pour l'élève)";
    case "orange":
      return "Complet";
    case "rouge":
      return "Annulé";
    case "jaune":
      return "En attente";
    case "bleu":
      return "Réservé par l'élève"; // <--- AJOUT ICI
    default:
      return rawStatus;
  }
};

const JOURS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const HORAIRES = ["17H - 18H30", "19H - 20H30", "21H - 23H30"];
// Array.from : chaque ligne est un tableau distinct (Array(3).fill(Array(7)) partagerait la même ligne)
const makeDefaultSchedule = (): string[][] =>
  Array.from({ length: 3 }, () => Array<string>(7).fill("gris"));

const CUID_RE = /^c[a-z0-9]{24}$/;

function getMonday(d: Date) {
  const date = new Date(d);
  const day = date.getDay();
  date.setDate(date.getDate() - day + (day === 0 ? -6 : 1));
  date.setHours(0, 0, 0, 0);
  return date;
}

export default function AdminScheduleClient({
  oldestMondayDB,
  students,
}: {
  oldestMondayDB: Date | null;
  students: StudentOption[];
}) {
  const [systemMonday] = useState<Date>(() => getMonday(new Date()));
  const oldestMonday = oldestMondayDB
    ? getMonday(oldestMondayDB)
    : systemMonday;

  const [currentMonday, setCurrentMonday] = useState<Date>(systemMonday);
  const [matrix, setMatrix] = useState<string[][]>(makeDefaultSchedule);

  const [activeCell, setActiveCell] = useState<{ r: number; c: number } | null>(
    null,
  );
  const [assignModal, setAssignModal] = useState<{
    r: number;
    c: number;
    jour: string;
    horaire: string;
  } | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  // --- Identité des élèves : la grille stocke l'IDENTIFIANT, on retrouve le prénom ici ---
  const nameById: Record<string, string> = Object.fromEntries(
    students.map((s) => [s.id, s.firstName || s.fullName || "Élève"]),
  );

  // Cellule = "statut" | "statut:identifiant" | (ancien) "statut:Prénom[:identifiant]"
  function splitCell(val: string) {
    const [status, a, b] = (val || "gris").split(":");
    const ref = b ?? a; // identifiant (nouveau format) ou prénom (ancien format)
    const isId = !!ref && CUID_RE.test(ref);
    const name = isId ? (nameById[ref] ?? "Élève") : a;
    return { status, ref, name };
  }

  // Libellé de semaine calculé (pas besoin d'état ni d'effet)
  const sunday = new Date(currentMonday);
  sunday.setDate(currentMonday.getDate() + 6);
  const weekLabel = `du ${currentMonday.toLocaleDateString("fr-FR", { day: "numeric" })} au ${sunday.toLocaleDateString("fr-FR", { day: "numeric", month: "long" })}`;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (gridRef.current && !gridRef.current.contains(event.target as Node))
        setActiveCell(null);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setIsLoading(true);
      try {
        const data = await getWeeklySchedule(currentMonday.toISOString());
        let next: string[][] | null = (data as string[][] | null) ?? null;
        if (!next) {
          const template = await getScheduleTemplate();
          next = (template as string[][] | null) ?? null;
        }
        if (!cancelled) setMatrix(next ?? makeDefaultSchedule());
      } catch {
        if (!cancelled) {
          setMatrix(makeDefaultSchedule());
          alert("Impossible de charger la semaine (session expirée ?).");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [currentMonday]);

  const changeWeek = (offset: number) => {
    const next = new Date(currentMonday);
    next.setDate(currentMonday.getDate() + offset * 7);
    setCurrentMonday(next);
    setActiveCell(null);
  };

  const updateCellStatus = (r: number, c: number, newStatus: string) => {
    const newMatrix = matrix.map((row) => [...row]);
    const { ref } = splitCell(newMatrix[r][c] || "");

    // Si on rend la case "Gris" ou "Vert", on retire l'élève de cette case
    if (newStatus === "gris" || newStatus === "vert") {
      newMatrix[r][c] = newStatus;
    } else if (ref) {
      newMatrix[r][c] = `${newStatus}:${ref}`;
    } else {
      newMatrix[r][c] = newStatus;
    }

    setMatrix(newMatrix);
    setActiveCell(null);
  };

  const handleSaveWeek = async () => {
    setIsSaving(true);
    try {
      await saveWeeklySchedule(currentMonday.toISOString(), matrix);
      alert("Semaine sauvegardée !");
    } catch {
      alert("Échec de la sauvegarde (session expirée ?).");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSavePermanent = async () => {
    const confirmed = window.confirm(
      "Définir cette grille comme modèle par défaut pour toutes les prochaines semaines ?",
    );
    if (!confirmed) return;
    setIsSaving(true);

    // Le modèle ne garde ni élèves ni séances : orange/jaune/rouge redeviennent verts.
    const templateMatrix = matrix.map((row) =>
      row.map((val) => {
        const { status } = splitCell(val);
        return status === "orange" || status === "jaune" || status === "rouge"
          ? "vert"
          : status;
      }),
    );

    try {
      await saveScheduleTemplate(templateMatrix);
      await saveWeeklySchedule(currentMonday.toISOString(), matrix);
      alert("Modèle permanent enregistré avec succès !");
    } catch {
      alert("Échec de la sauvegarde (session expirée ?).");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAssignStudent = async () => {
    if (!assignModal) return;
    setIsSaving(true);

    const newMatrix = matrix.map((row) => [...row]);

    try {
      if (selectedStudentId) {
        // On stocke l'IDENTIFIANT (jamais le prénom : deux élèves peuvent s'appeler pareil)
        newMatrix[assignModal.r][assignModal.c] = `jaune:${selectedStudentId}`;

        await reserveAdminSlot(
          selectedStudentId,
          currentMonday.toISOString(),
          assignModal.jour,
          assignModal.horaire,
          newMatrix,
        );
      } else {
        newMatrix[assignModal.r][assignModal.c] = "vert";
      }

      setMatrix(newMatrix);
      setAssignModal(null);
      setSelectedStudentId("");
    } catch {
      alert("Échec de l'assignation (session expirée ?).");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f1115] py-8 select-none">
      <div className="mx-auto max-w-5xl px-4 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white dark:bg-[#16181d] p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
          <h1 className="text-xl font-black text-ink flex items-center gap-3">
            <CalendarDays className="text-brand-orange" />
            Gestion <span className="np-highlight">Disponibilités</span>
          </h1>

          <div className="flex items-center gap-4">
            <button
              onClick={() => changeWeek(-1)}
              disabled={currentMonday.getTime() <= oldestMonday.getTime()}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors disabled:opacity-30"
              aria-label="Semaine précédente"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="font-bold w-56 text-center text-sm text-ink">
              Semaine {weekLabel}
            </span>
            <button
              onClick={() => changeWeek(1)}
              disabled={currentMonday.getTime() >= systemMonday.getTime()}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors disabled:opacity-30"
              aria-label="Semaine suivante"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleSaveWeek}
              disabled={isLoading || isSaving}
              className="px-4 py-2 text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 rounded-lg flex items-center gap-2"
            >
              {isSaving ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Save size={16} />
              )}
              Cette semaine
            </button>
            <button
              onClick={handleSavePermanent}
              disabled={isLoading || isSaving}
              className="np-btn-primary py-2 px-4 text-sm flex items-center gap-2"
            >
              {isSaving ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <CheckCircle size={16} />
              )}
              Sauvegarde Permanente
            </button>
          </div>
        </div>

        <div
          ref={gridRef}
          className="np-card p-4 md:p-8 overflow-visible relative"
        >
          {isLoading && (
            <div className="absolute inset-0 z-10 bg-white/50 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center rounded-2xl">
              <Loader2 className="animate-spin text-brand-orange" size={40} />
            </div>
          )}

          <div className="overflow-x-auto pb-10 overflow-y-visible">
            <div className="min-w-[600px] grid grid-cols-[100px_repeat(7,1fr)] gap-x-2 gap-y-10 items-center">
              <div className="text-transparent">Heure</div>
              {JOURS.map((jour) => (
                <div
                  key={jour}
                  className="text-center font-black text-sm text-ink"
                >
                  {jour}
                </div>
              ))}

              {HORAIRES.map((horaire, rowIndex) => (
                <Fragment key={horaire}>
                  <div className="text-right text-xs font-bold text-brand-orange pr-2 border-r border-slate-200 dark:border-slate-800">
                    {horaire}
                  </div>

                  {JOURS.map((jour, colIndex) => {
                    const cellValue = matrix[rowIndex][colIndex] || "gris";
                    const { status: rawStatus, name: studentName } =
                      splitCell(cellValue);

                    const colorClass =
                      STATUS_COLORS[rawStatus as keyof typeof STATUS_COLORS] ??
                      STATUS_COLORS.gris;
                    const isActive =
                      activeCell?.r === rowIndex && activeCell?.c === colIndex;
                    const hasStudent = !!studentName;

                    // Vert (Disponible) et Gris (Libre) sont toujours proposés
                    const popoverButtons = ["vert", "gris"];
                    if (hasStudent) {
                      popoverButtons.push("orange", "rouge"); // si un élève est sur le créneau
                    }

                    return (
                      <div
                        key={`${horaire}-${jour}`}
                        className="relative flex flex-col items-center justify-center"
                      >
                        <button
                          onClick={() =>
                            setActiveCell(
                              isActive ? null : { r: rowIndex, c: colIndex },
                            )
                          }
                          title={getAdminLabel(rawStatus, studentName)}
                          className={`w-10 h-10 rounded-full transition-transform hover:scale-110 ${colorClass} ${isActive ? "ring-4 ring-brand-orange/50 scale-110" : ""}`}
                        />

                        {/* Prénom en dessous de la sphère */}
                        {hasStudent && (
                          <span className="absolute top-[44px] text-[10px] font-bold text-slate-500 dark:text-slate-400 leading-tight text-center w-20 truncate">
                            {studentName}
                          </span>
                        )}

                        {/* Popover animé */}
                        <div
                          className={`absolute bottom-[48px] mb-2 z-50 flex items-center gap-2 p-2 bg-white dark:bg-slate-800 rounded-full shadow-xl border border-slate-100 dark:border-slate-700 origin-bottom transition-all duration-200 ${isActive ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-50 pointer-events-none"}`}
                        >
                          <button
                            onClick={() => {
                              setActiveCell(null);
                              setAssignModal({
                                r: rowIndex,
                                c: colIndex,
                                jour,
                                horaire,
                              });
                            }}
                            className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-100 text-blue-600 hover:bg-blue-200 hover:scale-110 transition-transform shadow-sm"
                            title="Assigner un élève"
                          >
                            <UserPlus size={16} />
                          </button>

                          <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1"></div>

                          {popoverButtons.map((btnKey) => (
                            <button
                              key={btnKey}
                              onClick={() =>
                                updateCellStatus(rowIndex, colIndex, btnKey)
                              }
                              className={`w-8 h-8 rounded-full transition-transform hover:scale-125 ${STATUS_COLORS[btnKey as keyof typeof STATUS_COLORS]}`}
                              title={getAdminLabel(btnKey)}
                            />
                          ))}

                          <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1"></div>
                          <button
                            onClick={() => setActiveCell(null)}
                            className="text-slate-400 hover:text-ink"
                            aria-label="Fermer"
                          >
                            <X size={16} />
                          </button>
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white dark:border-t-slate-800"></div>
                        </div>
                      </div>
                    );
                  })}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL ASSIGNATION */}
      {assignModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#16181d] rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-black text-ink mb-2">
              Assigner un élève
            </h3>
            <p className="text-sm text-muted mb-6">
              Pour le{" "}
              <strong className="text-brand-orange">
                {assignModal.jour} ({assignModal.horaire})
              </strong>
            </p>

            <label className="np-label" htmlFor="assign-student">
              Sélectionner l&apos;élève :
            </label>
            <select
              id="assign-student"
              className="np-input w-full mb-8 bg-slate-50 dark:bg-[#0f1115]"
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
            >
              <option value="" disabled>
                -- Choisir un élève --
              </option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.firstName || s.fullName} (
                  {s.level ? (LEVEL_LABELS[s.level] ?? s.level) : "Sans niveau"}
                  )
                </option>
              ))}
            </select>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setAssignModal(null)}
                className="px-4 py-2 font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              >
                Annuler
              </button>
              <button
                onClick={handleAssignStudent}
                disabled={!selectedStudentId || isSaving}
                className="np-btn-primary flex items-center gap-2 disabled:opacity-50"
              >
                {isSaving && <Loader2 size={16} className="animate-spin" />}
                Confirmer l&apos;assignation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
