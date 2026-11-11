import { ImageResponse } from "next/og";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

export const alt = "Évaluation QCM Mathématiques";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const LEVEL_LABELS: Record<string, string> = {
  COLLEGE_3AC: "3AC",
  TRONC_COMMUN: "Tronc Commun",
  BAC_1: "1Bac",
  BAC_2: "2Bac",
};

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function OpengraphImage({ params }: Props) {
  const { slug } = await params;

  // Récupération de l'examen et de ses niveaux associés
  const exam = await prisma.qcmExam.findUnique({
    where: { slug },
    include: {
      levels: { select: { level: true } },
      _count: { select: { questions: true } },
    },
  });

  const title = exam?.title || "Test QCM Mathématiques";
  const rawLevel = exam?.levels?.[0]?.level;
  const levelBadge = rawLevel ? LEVEL_LABELS[rawLevel] || rawLevel : "Maths";
  const questionsCount = exam?._count?.questions ?? 0;
  const duration = exam?.timeLimitMinutes
    ? `${exam.timeLimitMinutes} min`
    : "Libre";

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#0b0d11",
        backgroundImage:
          "radial-gradient(circle at 25px 25px, #1a1d24 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1a1d24 2%, transparent 0%)",
        backgroundSize: "100px 100px",
        padding: "60px 70px",
        fontFamily: "sans-serif",
        color: "#ffffff",
        border: "16px solid #14171f",
      }}
    >
      {/* En-tête : Logo et Badges */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              backgroundColor: "#f25c27",
              width: "42px",
              height: "42px",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              fontWeight: "900",
              color: "#ffffff",
            }}
          >
            ∑
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: "20px",
                fontWeight: "900",
                letterSpacing: "-0.5px",
              }}
            >
              MOHAMED HADDOUCHE
            </span>
            <span
              style={{
                fontSize: "12px",
                color: "#f25c27",
                fontWeight: "700",
                letterSpacing: "1px",
              }}
            >
              PLATEFORME DIDACTIQUE
            </span>
          </div>
        </div>

        {/* Badge Niveau */}
        <div
          style={{
            display: "flex",
            backgroundColor: "rgba(242, 92, 39, 0.15)",
            border: "2px solid #f25c27",
            color: "#f25c27",
            borderRadius: "50px",
            padding: "8px 24px",
            fontSize: "20px",
            fontWeight: "800",
            textTransform: "uppercase",
          }}
        >
          {levelBadge}
        </div>
      </div>

      {/* Centre : Titre de l'épreuve */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          margin: "auto 0",
        }}
      >
        <span
          style={{
            color: "#94a3b8",
            fontSize: "18px",
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "2px",
          }}
        >
          Évaluation Diagnostique &amp; Entraînement
        </span>

        <h1
          style={{
            fontSize: title.length > 50 ? "46px" : "56px",
            fontWeight: "900",
            lineHeight: 1.15,
            color: "#ffffff",
            letterSpacing: "-1px",
            maxWidth: "1050px",
          }}
        >
          {title}
        </h1>
      </div>

      {/* Pied : Statistiques et Call to Action */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "2px solid #1e232d",
          paddingTop: "30px",
        }}
      >
        <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
          <span
            style={{ fontSize: "20px", color: "#cbd5e1", fontWeight: "600" }}
          >
            📝{" "}
            <strong style={{ color: "#ffffff", marginLeft: "6px" }}>
              {questionsCount}
            </strong>{" "}
            questions
          </span>
          <span
            style={{ fontSize: "20px", color: "#cbd5e1", fontWeight: "600" }}
          >
            ⏱{" "}
            <strong style={{ color: "#ffffff", marginLeft: "6px" }}>
              {duration}
            </strong>
          </span>
          <span
            style={{ fontSize: "20px", color: "#22c55e", fontWeight: "700" }}
          >
            ✓ Correction détaillée
          </span>
        </div>

        <div
          style={{
            backgroundColor: "#f25c27",
            color: "#ffffff",
            borderRadius: "14px",
            padding: "12px 28px",
            fontSize: "18px",
            fontWeight: "800",
            display: "flex",
            alignItems: "center",
            boxShadow: "0 8px 20px rgba(242, 92, 39, 0.3)",
          }}
        >
          Démarrer le QCM →
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
