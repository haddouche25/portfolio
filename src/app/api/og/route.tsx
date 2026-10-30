import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "Article & Didactique";
  const category = searchParams.get("category") || "Mathématiques";

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "60px 80px",
        backgroundColor: "#0f172a",
        borderTop: "12px solid #ea580c",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "48px",
            height: "48px",
            borderRadius: "8px",
            backgroundColor: "#ea580c",
            color: "#ffffff",
            fontSize: "28px",
            fontWeight: 900,
          }}
        >
          Σ
        </div>
        <span
          style={{
            color: "#94a3b8",
            fontSize: "20px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "2px",
          }}
        >
          {category}
        </span>
      </div>

      <div
        style={{
          fontSize: "52px",
          fontWeight: 900,
          color: "#f8fafc",
          lineHeight: 1.2,
          letterSpacing: "-1px",
        }}
      >
        {title}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid #1e293b",
          paddingTop: "24px",
        }}
      >
        <span style={{ color: "#e2e8f0", fontSize: "22px", fontWeight: 700 }}>
          Mohamed Haddouche
        </span>
        <span style={{ color: "#ea580c", fontSize: "18px", fontWeight: 600 }}>
          Math Coach &bull; Software Engineer
        </span>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}
