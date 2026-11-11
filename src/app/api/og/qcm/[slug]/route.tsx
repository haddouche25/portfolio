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
        // Rich, dynamic orange radial + linear gradient
        background:
          "linear-gradient(135deg, #7c1a00 0%, #c2410c 30%, #ea580c 60%, #f97316 85%, #fb923c 100%)",
        padding: "40px",
        fontFamily: "sans-serif",
      }}
    >
      {/* Frosted Glassmorphism Container */}
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
          background: "rgba(0, 0, 0, 0.28)",
          padding: "45px 65px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
        }}
      >
        {/* Top: Name, Subtitle, and prominent Domain Pill */}
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
              color: "rgba(255, 255, 255, 0.85)",
              letterSpacing: "0.5px",
            }}
          >
            Math Coach &amp; Software Consultant
          </span>

          {/* www.mhaddouche.com Pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "4px",
              background: "rgba(255, 255, 255, 0.15)",
              border: "1px solid rgba(255, 255, 255, 0.35)",
              padding: "6px 22px",
              borderRadius: "14px",
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

        {/* Center: School Level Badge & Large Centered Title */}
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "6px 26px",
              borderRadius: "9999px",
              background: "#ffffff",
              color: "#c2410c",
              fontSize: "17px",
              fontWeight: "900",
              letterSpacing: "1px",
              boxShadow: "0 4px 14px rgba(0, 0, 0, 0.2)",
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
              textShadow: "0 4px 24px rgba(0, 0, 0, 0.35)",
            }}
          >
            {title}
          </h1>
        </div>

        {/* Bottom: Question Count Banner */}
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
              background: "rgba(255, 255, 255, 0.18)",
              border: "1px solid rgba(255, 255, 255, 0.35)",
              padding: "12px 36px",
              borderRadius: "20px",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
            }}
          >
            <span
              style={{
                fontSize: "30px",
                fontWeight: "900",
                color: "#ffffff",
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
      width: 1200,
      height: 630,
    },
  );
}
