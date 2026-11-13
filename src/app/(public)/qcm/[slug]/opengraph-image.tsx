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
  COLLEGE_1AC: "1AC",
  COLLEGE_2AC: "2AC",
  COLLEGE_3AC: "3AC",
  TRONC_COMMUN: "Tronc commun",
  BAC_1: "1Bac",
  BAC_2: "2Bac",
};

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function OpengraphImage({ params }: Props) {
  const { slug } = await params;

  const exam = await prisma.qcmExam.findUnique({
    where: { slug },
    include: {
      levels: { select: { level: true } },
      _count: { select: { questions: true } },
    },
  });

  const title = exam?.title || "Évaluation QCM Mathématiques";
  const rawLevel = exam?.levels?.[0]?.level;
  const levelLabel = rawLevel ? LEVEL_LABELS[rawLevel] || rawLevel : "Maths";
  const questionsCount = exam?._count?.questions ?? 0;

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#eb4d16",
        padding: "42px",
        fontFamily: "sans-serif",
      }}
    >
      {/* Grand panneau intérieur avec ombre portée douce (Rectangle 2) */}
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#e84a14",
          padding: "56px 135px 46px 135px",
          boxShadow: "0 12px 35px rgba(0, 0, 0, 0.22)",
        }}
      >
        {/* Ligne du haut : Mohamed HADDOUCHE (gauche) / MATH COACH (droite) */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <span
            style={{
              fontSize: "26px",
              fontWeight: "800",
              color: "#ffffff",
              letterSpacing: "-0.3px",
            }}
          >
            Mohamed HADDOUCHE
          </span>

          <span
            style={{
              fontSize: "26px",
              fontWeight: "800",
              color: "#ffffff",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}
          >
            MATH COACH
          </span>
        </div>

        {/* Cadre central blanc épais (Rectangle 1 avec Stroke) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "285px",
            border: "6px solid #ffffff",
            padding: "36px 40px 28px 40px",
          }}
        >
          {/* Titre du QCM aligné à gauche */}
          <h1
            style={{
              fontSize:
                title.length > 65
                  ? "36px"
                  : title.length > 45
                    ? "42px"
                    : "48px",
              fontWeight: "800",
              lineHeight: 1.2,
              color: "#ffffff",
              margin: 0,
              letterSpacing: "-0.5px",
            }}
          >
            {title}
          </h1>

          {/* Bas du cadre blanc : Niveau (gauche) / Nombre de questions (droite) */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <span
              style={{
                fontSize: "24px",
                fontWeight: "700",
                color: "#ffffff",
              }}
            >
              {levelLabel}
            </span>

            <span
              style={{
                fontSize: "24px",
                fontWeight: "700",
                color: "#ffffff",
              }}
            >
              {questionsCount} {questionsCount > 1 ? "Questions" : "Question"}
            </span>
          </div>
        </div>

        {/* Pied de page centré */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <span
            style={{
              fontSize: "23px",
              fontWeight: "700",
              color: "#ffffff",
              letterSpacing: "-0.2px",
            }}
          >
            Plus de QCM interactifs sur mhaddouche.com/qcm
          </span>
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
