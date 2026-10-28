import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";

export const PHONE = { width: 620, height: 1100, bezel: 16, top: 520 };
export const SCREEN = { width: PHONE.width - PHONE.bezel * 2, height: PHONE.height - PHONE.bezel * 2 };
// Obszar pod paskiem statusu i adresu: 588 × 932 px.
export const CONTENT_TOP = 136;

// Rama telefonu z paskiem statusu i paskiem adresu przeglądarki.
export const Phone: React.FC<{ time?: string; style?: React.CSSProperties; children: React.ReactNode }> = ({
  time = "18:01",
  style,
  children,
}) => (
  <div
    style={{
      position: "absolute",
      left: (1080 - PHONE.width) / 2,
      top: PHONE.top,
      width: PHONE.width,
      height: PHONE.height,
      borderRadius: 84,
      background: "#0A0A12",
      padding: PHONE.bezel,
      boxShadow: "0 50px 120px rgba(0,0,0,0.45), inset 0 0 0 3px #2A2A36",
      ...style,
    }}
  >
    <div
      style={{
        position: "relative",
        width: SCREEN.width,
        height: SCREEN.height,
        borderRadius: 68,
        overflow: "hidden",
        background: "#F6F6FB",
        fontFamily: FONT.ui,
        color: C.text,
      }}
    >
      <div
        style={{
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 44px 0",
          fontSize: 24,
          fontWeight: 700,
        }}
      >
        <span>{time}</span>
        <div style={{ width: 150, height: 40, borderRadius: 24, background: "#0A0A12" }} />
        <span style={{ letterSpacing: 2 }}>●●●</span>
      </div>
      <div
        style={{
          margin: "6px 24px 0",
          height: 54,
          borderRadius: 18,
          background: "#E9E9F2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          fontSize: 24,
          fontWeight: 600,
          color: "#3B3D52",
        }}
      >
        <span style={{ fontSize: 18 }}>🔒</span> bookedu.pl
      </div>
      <div style={{ position: "absolute", top: CONTENT_TOP, left: 0, right: 0, bottom: 0 }}>{children}</div>
    </div>
  </div>
);

// Wskaźnik dotyku jak w nagraniu ekranu (kółko + fala).
export const Tap: React.FC<{ x: number; y: number; at: number }> = ({ x, y, at }) => {
  const frame = useCurrentFrame();
  const t = frame - at;
  if (t < -10 || t > 18) return null;
  const approach = interpolate(t, [-10, 0], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ring = interpolate(t, [0, 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: x - 34,
          top: y - 34,
          width: 68,
          height: 68,
          borderRadius: 34,
          background: "rgba(40,40,60,0.35)",
          border: "3px solid rgba(255,255,255,0.9)",
          opacity: approach * interpolate(t, [6, 18], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          scale: String(t < 0 ? interpolate(approach, [0, 1], [1.4, 1]) : interpolate(t, [0, 4, 8], [1, 0.8, 1], { extrapolateRight: "clamp" })),
        }}
      />
      {t >= 0 && (
        <div
          style={{
            position: "absolute",
            left: x - 60,
            top: y - 60,
            width: 120,
            height: 120,
            borderRadius: 60,
            border: `4px solid ${C.violet}`,
            opacity: 1 - ring,
            scale: String(interpolate(ring, [0, 1], [0.4, 1.5])),
          }}
        />
      )}
    </>
  );
};
