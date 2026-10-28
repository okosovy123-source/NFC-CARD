import React from "react";
import { AbsoluteFill, interpolate, random, useCurrentFrame, useVideoConfig } from "remotion";
import { CaptionLine, CaptionStack, Emoji, usePop } from "../components/ui";
import { C, FONT } from "../theme";

const Clock: React.FC<{ seconds: number }> = ({ seconds }) => {
  const ticks = Array.from({ length: 12 }, (_, i) => i);
  return (
    <svg width={300} height={300} viewBox="-150 -150 300 300">
      <circle r={140} fill={C.paper} stroke="#2A2C55" strokeWidth={14} />
      {ticks.map((i) => (
        <line
          key={i}
          x1={0}
          y1={-118}
          x2={0}
          y2={i % 3 === 0 ? -96 : -106}
          stroke="#2A2C55"
          strokeWidth={i % 3 === 0 ? 8 : 4}
          strokeLinecap="round"
          transform={`rotate(${i * 30})`}
        />
      ))}
      {/* 18:00 — wskazówka godzinowa na 6, minutowa na 12 */}
      <line x1={0} y1={0} x2={0} y2={62} stroke={C.text} strokeWidth={14} strokeLinecap="round" />
      <line x1={0} y1={0} x2={0} y2={-98} stroke={C.text} strokeWidth={9} strokeLinecap="round" />
      <line
        x1={0}
        y1={18}
        x2={0}
        y2={-110}
        stroke={C.red}
        strokeWidth={4}
        strokeLinecap="round"
        transform={`rotate(${seconds * 6})`}
      />
      <circle r={10} fill={C.red} />
    </svg>
  );
};

const SCRIBBLES = ["2x² − 8x + 6 = 0", "Δ = b² − 4ac  ???", "sin 30° = ...", "log₂ 8 = ?"];

const Notebook: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        left: 120,
        top: 1080,
        width: 840,
        height: 560,
        rotate: "-4deg",
        background: C.paper,
        borderRadius: 18,
        boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
        backgroundImage:
          "repeating-linear-gradient(transparent 0 66px, #C9D6F2 66px 69px), linear-gradient(90deg, transparent 96px, #F3A0A8 96px 100px, transparent 100px)",
        padding: "34px 40px 0 130px",
        fontFamily: FONT.hand,
        fontWeight: 700,
        color: "#24306B",
        fontSize: 58,
        lineHeight: "69px",
        overflow: "hidden",
      }}
    >
      {SCRIBBLES.map((s, i) => {
        const shown = interpolate(frame, [-10 + i * 12, i * 12], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <div key={s} style={{ whiteSpace: "nowrap", clipPath: `inset(0 ${(1 - shown) * 100}% 0 0)` }}>
            {s}
          </div>
        );
      })}
      {[0, 1, 2].map((i) => {
        const p = interpolate(frame, [40 + i * 8, 48 + i * 8], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              right: 70 + i * 90,
              top: 250 + (i % 2) * 120,
              fontSize: 150,
              color: C.red,
              opacity: p,
              scale: String(0.4 + p * 0.6),
              rotate: `${(i - 1) * 14}deg`,
            }}
          >
            ?
          </div>
        );
      })}
    </div>
  );
};

export const Panic: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const face = usePop(-6, 10);
  const shakeX = (random(`x${Math.floor(frame / 2)}`) - 0.5) * 8;
  const shakeY = (random(`y${Math.floor(frame / 2)}`) - 0.5) * 6;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 30% 40%, #2A2E66 0%, ${C.night} 45%, ${C.ink} 100%)`,
        overflow: "hidden",
      }}
    >
      <AbsoluteFill
        style={{
          scale: String(interpolate(frame, [0, durationInFrames], [1, 1.07])),
        }}
      >
        <div style={{ position: "absolute", left: 650, top: 600 }}>
          <Clock seconds={Math.floor(frame / fps)} />
          <div
            style={{
              marginTop: 14,
              textAlign: "center",
              fontFamily: FONT.display,
              fontWeight: 800,
              fontSize: 64,
              color: C.red,
              letterSpacing: 2,
            }}
          >
            18:00
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            left: 120,
            top: 620,
            opacity: interpolate(face, [0, 0.3], [0, 1], { extrapolateRight: "clamp" }),
            scale: String(face),
            translate: `${shakeX}px ${shakeY}px`,
          }}
        >
          <Emoji char="😰" size={340} />
        </div>
        <Notebook />
      </AbsoluteFill>
      <CaptionStack top={250}>
        <CaptionLine delay={-5} size={72}>
          Jutro sprawdzian
          <br />z matmy.
        </CaptionLine>
        <CaptionLine delay={22} variant="red" size={88} tilt={-2}>
          Nic nie umiem.
        </CaptionLine>
      </CaptionStack>
      <AbsoluteFill
        style={{
          background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.65) 100%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
