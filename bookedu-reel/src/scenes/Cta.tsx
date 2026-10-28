import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Emoji, usePop } from "../components/ui";
import { C, FONT } from "../theme";

export const Cta: React.FC = () => {
  const frame = useCurrentFrame();
  const face = usePop(0, 9);
  const thumb = usePop(5, 7);
  const brand = usePop(8, 12);
  const bio = usePop(14, 10);
  const flash = interpolate(frame, [0, 6], [0.9, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 38%, #8A6BFF 0%, ${C.violet} 40%, ${C.violetDeep} 100%)`,
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", left: 540 - 200, top: 420, width: 400, height: 400 }}>
        <div style={{ scale: String(face), rotate: `${interpolate(face, [0, 1], [-20, 0])}deg` }}>
          <Emoji char="😎" size={380} />
        </div>
        <div
          style={{
            position: "absolute",
            right: -150,
            bottom: -60,
            scale: String(thumb),
            rotate: `${interpolate(thumb, [0, 1], [40, -8]) + Math.sin(frame / 4) * 4}deg`,
          }}
        >
          <Emoji char="👍" size={260} />
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 1010,
          textAlign: "center",
          fontFamily: FONT.display,
          fontWeight: 800,
          fontSize: 168,
          letterSpacing: -6,
          color: C.white,
          textShadow: "0 18px 50px rgba(0,0,0,0.35)",
          opacity: interpolate(brand, [0, 0.2], [0, 1], { extrapolateRight: "clamp" }),
          scale: String(interpolate(brand, [0, 1], [0.7, 1])),
        }}
      >
        book<span style={{ color: C.lime }}>edu</span>.pl
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 1250, display: "flex", justifyContent: "center" }}>
        <div
          style={{
            background: C.lime,
            color: C.text,
            fontFamily: FONT.display,
            fontWeight: 800,
            fontSize: 72,
            padding: "18px 44px 24px",
            borderRadius: 60,
            boxShadow: "0 20px 44px rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            gap: 18,
            opacity: interpolate(bio, [0, 0.2], [0, 1], { extrapolateRight: "clamp" }),
            translate: `0px ${interpolate(bio, [0, 1], [60, 0])}px`,
          }}
        >
          link w bio
          <span style={{ display: "inline-block", translate: `0px ${Math.sin(frame / 3) * -8}px` }}>↑</span>
        </div>
      </div>
      <AbsoluteFill style={{ background: C.white, opacity: flash }} />
    </AbsoluteFill>
  );
};
