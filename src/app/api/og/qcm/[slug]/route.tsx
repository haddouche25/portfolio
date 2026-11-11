import { ImageResponse } from "next/og";
import { prisma } from "@/lib/db";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

const LEVEL_LABELS: Record<string, string> = {
  COLLEGE_3AC: "3AC",
  TRONC_COMMUN: "Tronc Commun",
  BAC_1: "1Bac",
  BAC_2: "2Bac",
};

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;

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
        background:
          "linear-gradient(135deg, #1e0847 0%, #111e6c 35%, #0077b6 70%, #d946ef 100%)",
        padding: "40px",
        fontFamily: "sans-serif",
      }}
    >
      {/* Carte Glassmorphism centrale */}
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: "32px",
          border: "1.5px solid rgba(255, 255, 255, 0.25)",
          background: "rgba(15, 23, 42, 0.45)",
          padding: "45px 65px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Haut : Signature & URL www.mhaddouche.com agrandie */}
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
            }}
          >
            MOHAMED HADDOUCHE
          </span>

          <span
            style={{
              fontSize: "15px",
              fontWeight: "700",
              color: "#f97316",
              letterSpacing: "0.5px",
            }}
          >
            Math Coach &amp; Software Consultant
          </span>

          {/* www.mhaddouche.com Agrandie et mise en valeur */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "4px",
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.18)",
              padding: "6px 20px",
              borderRadius: "12px",
            }}
          >
            <span
              style={{
                fontSize: "20px",
                fontWeight: "800",
                color: "#f8fafc",
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
            gap: "14px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "6px 24px",
              borderRadius: "9999px",
              background: "rgba(249, 115, 22, 0.2)",
              border: "1.5px solid #f97316",
              color: "#ffedd5",
              fontSize: "16px",
              fontWeight: "800",
              letterSpacing: "1px",
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
              textShadow: "0 4px 20px rgba(0, 0, 0, 0.35)",
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
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              padding: "12px 36px",
              borderRadius: "20px",
            }}
          >
            <span
              style={{
                fontSize: "30px",
                fontWeight: "900",
                color: "#f97316",
              }}
            >
              {questionsCount}
            </span>
            <span
              style={{
                fontSize: "22px",
                fontWeight: "700",
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
      width: 1200,
      height: 630,
    },
  );
}
