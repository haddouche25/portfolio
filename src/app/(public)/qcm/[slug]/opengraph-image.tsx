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

  const exam = await prisma.qcmExam.findUnique({
    where: { slug },
    include: {
      levels: { select: { level: true } },
      _count: { select: { questions: true } },
    },
  });

  const title = exam?.title || "Évaluation QCM Mathématiques";
  const rawLevel = exam?.levels?.[0]?.level;
  const levelBadge = rawLevel ? LEVEL_LABELS[rawLevel] || rawLevel : "Maths";
  const questionsCount = exam?._count?.questions ?? 0;

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // Dégradé inspiré de la maquette : Magenta / Indigo / Bleu cyan
        background:
          "linear-gradient(135deg, #1d074b 0%, #3b0764 25%, #1e1b4b 50%, #0369a1 75%, #06b6d4 100%)",
        padding: "36px",
        fontFamily: "sans-serif",
      }}
    >
      {/* Panneau de verre (Frosted Glassmorphism Card) */}
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: "32px",
          border: "1.5px solid rgba(255, 255, 255, 0.35)",
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.05) 100%)",
          padding: "45px 65px",
          boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.45)",
        }}
      >
        {/* Haut : Nom, Sous-titre et Domaine www.mhaddouche.com bien grand */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              fontSize: "28px",
              fontWeight: "900",
              color: "#ffffff",
              letterSpacing: "-0.5px",
              textTransform: "uppercase",
              textShadow: "0 2px 10px rgba(0,0,0,0.3)",
            }}
          >
            MOHAMED HADDOUCHE
          </span>

          <span
            style={{
              fontSize: "15px",
              fontWeight: "700",
              color: "rgba(224, 231, 255, 0.9)",
              letterSpacing: "0.5px",
            }}
          >
            Math Coach &amp; Software Consultant
          </span>

          {/* Pastille de domaine bien mise en valeur */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "4px",
              background: "rgba(255, 255, 255, 0.18)",
              border: "1px solid rgba(255, 255, 255, 0.35)",
              padding: "6px 24px",
              borderRadius: "14px",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.15)",
            }}
          >
            <span
              style={{
                fontSize: "20px",
                fontWeight: "900",
                color: "#ffffff",
                letterSpacing: "1px",
              }}
            >
              www.mhaddouche.com
            </span>
          </div>
        </div>

        {/* Centre : Badge de Niveau + Grand Titre Centré */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            maxWidth: "1050px",
            margin: "auto 0",
            gap: "16px",
          }}
        >
          {/* Badge Niveau blanc translucide */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "6px 26px",
              borderRadius: "9999px",
              background: "rgba(255, 255, 255, 0.22)",
              border: "1.5px solid rgba(255, 255, 255, 0.45)",
              color: "#ffffff",
              fontSize: "17px",
              fontWeight: "900",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
            }}
          >
            {levelBadge}
          </div>

          <h1
            style={{
              fontSize:
                title.length > 55
                  ? "46px"
                  : title.length > 35
                    ? "56px"
                    : "66px",
              fontWeight: "900",
              lineHeight: 1.15,
              color: "#ffffff",
              letterSpacing: "-1.5px",
              margin: 0,
              textShadow: "0 4px 25px rgba(0, 0, 0, 0.5)",
            }}
          >
            {title}
          </h1>
        </div>

        {/* Bas : Nombre de questions agrandi et centré */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              background: "rgba(255, 255, 255, 0.15)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              padding: "12px 36px",
              borderRadius: "20px",
              boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
            }}
          >
            <span
              style={{
                fontSize: "30px",
                fontWeight: "900",
                color: "#38bdf8", // Bleu cyan lumineux pour faire ressortir le chiffre
              }}
            >
              {questionsCount}
            </span>
            <span
              style={{
                fontSize: "22px",
                fontWeight: "800",
                color: "#ffffff",
                letterSpacing: "-0.2px",
              }}
            >
              Questions avec Correction Détaillée
            </span>
          </div>
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
