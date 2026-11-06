"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateStudentProfile } from "@/lib/actions/student-account";

// 1. Ajoutez level dans le type
type StudentData = {
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  email: string;
  level: string | null; // <-- Ajout du type
};

export default function StudentProfileForm({
  student,
}: {
  student: StudentData;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    await updateStudentProfile(formData);

    setSuccess(true);
    setLoading(false);
    router.refresh();

    setTimeout(() => setSuccess(false), 3000);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="np-label">Prénom</label>
        <input
          type="text"
          name="firstName"
          defaultValue={student.firstName || ""}
          className="np-input"
          placeholder="Ton prénom"
        />
      </div>

      <div>
        <label className="np-label">Nom de famille</label>
        <input
          type="text"
          name="lastName"
          defaultValue={student.lastName || ""}
          className="np-input"
          placeholder="Ton nom"
        />
      </div>

      <div>
        <label className="np-label">Téléphone</label>
        <input
          type="tel"
          name="phone"
          defaultValue={student.phone || ""}
          className="np-input"
          placeholder="06..."
        />
      </div>

      {/* 2. Ajout du menu déroulant (Dropdown) */}
      <div>
        <label className="np-label">Niveau scolaire</label>
        <select
          name="level"
          defaultValue={student.level || ""}
          className="np-input bg-white dark:bg-[#16181d]"
        >
          <option value="" disabled>
            Sélectionne ton niveau
          </option>
          <option value="COLLEGE_3AC">3ème Année Collège (3AC)</option>
          <option value="TRONC_COMMUN">Tronc Commun Scientifique</option>
          <option value="BAC_1">1ère Année Bac</option>
          <option value="BAC_2">2ème Année Bac</option>
        </select>
      </div>

      <div>
        <label className="np-label">Email (Connexion)</label>
        <input
          type="email"
          defaultValue={student.email}
          className="np-input opacity-60 cursor-not-allowed"
          disabled
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="np-btn-primary w-full disabled:opacity-50 mt-4"
      >
        {loading ? "Enregistrement..." : "Sauvegarder mon profil"}
      </button>

      {success && (
        <p className="text-xs font-bold text-green-600 dark:text-green-400 text-center mt-2">
          Profil mis à jour avec succès !
        </p>
      )}
    </form>
  );
}
