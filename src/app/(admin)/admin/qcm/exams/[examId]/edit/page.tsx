import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { updateQcmExamAction } from "@/actions/qcm-admin";

export const dynamic = "force-dynamic";

const AVAILABLE_LEVELS = [
  { value: "COLLEGE_1AC", label: "1ère Année Collège (1AC)" },
  { value: "COLLEGE_2AC", label: "2ème Année Collège (2AC)" },
  { value: "COLLEGE_3AC", label: "3ème Année Collège (3AC)" },
  { value: "TRONC_COMMUN", label: "Tronc Commun Scientifique (TCS)" },
  { value: "BAC_1", label: "1ère Année Baccalauréat (1Bac)" },
  { value: "BAC_2", label: "2ème Année Baccalauréat (2Bac)" },
];

interface PageProps {
  params: Promise<{ examId: string }>;
}

export default async function EditQcmExamPage({ params }: PageProps) {
  const { examId } = await params;

  const exam = await prisma.qcmExam.findUnique({
    where: { id: examId },
    include: { levels: true },
  });

  if (!exam) return notFound();

  const selectedLevels = new Set<string>(exam.levels.map((l) => l.level));
  const updateWithId = updateQcmExamAction.bind(null, exam.id);

  return (
    <div className="p-8 max-w-3xl mx-auto text-slate-100">
      <Link
        href={`/admin/qcm/exams/${exam.id}`}
        className="text-xs font-mono text-slate-400 hover:text-white inline-flex items-center gap-1.5 mb-4 transition"
      >
        &larr; Retour à l&apos;examen
      </Link>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <h1 className="text-2xl font-extrabold text-white tracking-tight mb-1">
          Modifier l&apos;examen QCM
        </h1>
        <p className="text-xs text-slate-400 mb-6">
          Modifiez les métadonnées, la durée, les niveaux et le statut de
          publication.
        </p>

        <form action={updateWithId} className="space-y-5">
          {/* Titre */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
              Titre de l&apos;examen *
            </label>
            <input
              type="text"
              name="title"
              required
              defaultValue={exam.title}
              className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2.5 text-sm text-white focus:border-[#eb4d16] focus:outline-none"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
              Slug URL *
            </label>
            <input
              type="text"
              name="slug"
              required
              defaultValue={exam.slug}
              className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2.5 font-mono text-sm text-slate-200 focus:border-[#eb4d16] focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
              Description
            </label>
            <textarea
              name="description"
              rows={3}
              defaultValue={exam.description || ""}
              className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2.5 text-sm text-white focus:border-[#eb4d16] focus:outline-none"
            />
          </div>

          {/* Durée & Publication */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                Durée limite (minutes)
              </label>
              <input
                type="number"
                name="timeLimitMinutes"
                min={1}
                placeholder="Vide = illimitée"
                defaultValue={exam.timeLimitMinutes ?? ""}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2.5 text-sm text-white focus:border-[#eb4d16] focus:outline-none"
              />
            </div>

            <div className="flex items-end pb-2">
              <label className="inline-flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="published"
                  defaultChecked={exam.published}
                  className="h-4 w-4 rounded border-slate-700 bg-slate-950 accent-[#eb4d16]"
                />
                <span className="text-sm font-medium text-slate-200">
                  Examen publié (visible par les élèves)
                </span>
              </label>
            </div>
          </div>

          {/* Niveaux scolaires */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
              Niveaux concernés
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {AVAILABLE_LEVELS.map((lvl) => (
                <label
                  key={lvl.value}
                  className="flex items-center gap-2.5 rounded-xl border border-slate-800 bg-slate-950/70 px-3.5 py-2.5 text-xs text-slate-200 cursor-pointer hover:border-slate-700"
                >
                  <input
                    type="checkbox"
                    name="levels"
                    value={lvl.value}
                    defaultChecked={selectedLevels.has(lvl.value)}
                    className="h-4 w-4 rounded border-slate-700 accent-[#eb4d16]"
                  />
                  <span>{lvl.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Boutons */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <Link
              href={`/admin/qcm/exams/${exam.id}`}
              className="px-4 py-2.5 rounded-xl border border-slate-700 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition"
            >
              Annuler
            </Link>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#eb4d16] hover:bg-[#d94310] text-xs font-bold uppercase tracking-wide text-white shadow-lg shadow-[#eb4d16]/20 transition"
            >
              Enregistrer les modifications
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
