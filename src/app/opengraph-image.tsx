import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "HowLongToGo"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F7F5F0",
          backgroundImage: "radial-gradient(circle at 25px 25px, #D0CCC5 2%, transparent 0%), radial-gradient(circle at 75px 75px, #D0CCC5 2%, transparent 0%)",
          backgroundSize: "100px 100px",
          fontFamily: "sans-serif",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100px",
            height: "100px",
            borderRadius: "50px",
            backgroundColor: "#FF6B6B",
            marginBottom: "30px",
          }}
        >
          <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </div>
        <div
          style={{
            fontSize: "80px",
            fontWeight: "900",
            color: "#2C3E50",
            letterSpacing: "-0.05em",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          HowLongToGo
        </div>
        <div
          style={{
            fontSize: "36px",
            fontWeight: "500",
            color: "#7F8C8D",
            textAlign: "center",
            maxWidth: "800px",
          }}
        >
          The most beautiful way to track time since and until your favorite dates, holidays, and milestones.
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
