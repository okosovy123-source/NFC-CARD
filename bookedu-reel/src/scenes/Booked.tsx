import React from "react";
import { AbsoluteFill, Easing, interpolate, random, useCurrentFrame, useVideoConfig } from "remotion";
import { Phone, SCREEN } from "../components/Phone";
import { CaptionLine, CaptionStack, Emoji, Mark, usePop } from "../components/ui";
import { C } from "../theme";
import { ScreenRecording } from "./Booking";

const CONFETTI_COLORS = [C.lime, C.white, "#FF8A5B", "#3DB8FF", C.red, "#FFD23D"];

const Confetti: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {Array.from({ length: 90 }, (_, i) => {
        const angle = -Math.PI / 2 + (random(`a${i}`) - 0.5) * Math.PI * 1.1;
        const speed = 700 + random(`s${i}`) * 900;
        const x = 540 + Math.cos(angle) * speed * t;
        const y = 820 + Math.sin(angle) * speed * t + 700 * t * t;
        const size = 14 + random(`z${i}`) * 18;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: size,
              height: size * 0.5,
              borderRadius: 3,
              background: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
              rotate: `${random(`r${i}`) * 360 + frame * (8 + random(`v${i}`) * 12)}deg`,
              opacity: interpolate(frame, [0, 3, 70, 90], [0, 1, 1, 0], { extrapolateRight: "clamp" }),
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

const Success: React.FC = () => {
  const frame = useCurrentFrame();
  const circle = usePop(0, 10);
  const draw = interpolate(frame, [6, 20], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const text = interpolate(frame, [10, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const rows: [string, string][] = [
    ["📐", "Matematyka"],
    ["👩‍🏫", "Anna K."],
    ["📅", "Dziś, 18:45"],
  ];
  return (
    <div style={{ position: "absolute", inset: 0, background: C.white }}>
      <div
        style={{
          position: "absolute",
          left: SCREEN.width / 2 - 110,
          top: 70,
          width: 220,
          height: 220,
          borderRadius: 110,
          background: C.green,
          boxShadow: "0 20px 50px rgba(34,197,94,0.45)",
          scale: String(circle),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width={120} height={120} viewBox="0 0 120 120">
          <path
            d="M24 62 L50 88 L98 34"
            fill="none"
            stroke="white"
            strokeWidth={16}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={draw}
          />
        </svg>
      </div>
      <div
        style={{
          position: "absolute",
          left: 20,
          right: 20,
          top: 330,
          textAlign: "center",
          fontSize: 46,
          fontWeight: 800,
          lineHeight: 1.15,
          opacity: text,
          translate: `0px ${(1 - text) * 20}px`,
        }}
      >
        Lekcja
        <br />
        zarezerwowana!
      </div>
      <div
        style={{
          position: "absolute",
          left: 32,
          right: 32,
          top: 480,
          borderRadius: 26,
          border: `2px solid ${C.line}`,
          padding: "10px 28px",
          opacity: text,
        }}
      >
        {rows.map(([icon, label], i) => (
          <div
            key={label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              fontSize: 30,
              fontWeight: 700,
              padding: "20px 0",
              borderTop: i ? `2px solid ${C.line}` : "none",
            }}
          >
            <Emoji char={icon} size={38} />
            {label}
          </div>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          left: 32,
          right: 32,
          top: 790,
          height: 100,
          borderRadius: 28,
          background: "#E9FBEF",
          color: "#138A43",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 14,
          fontSize: 32,
          fontWeight: 800,
          opacity: text,
        }}
      >
        ⏱ Start za 45 min
      </div>
    </div>
  );
};

export const Booked: React.FC<{ recording?: string | null; recordingFrom?: number }> = ({
  recording,
  recordingFrom = 0,
}) => {
  const frame = useCurrentFrame();
  const glow = interpolate(frame, [0, 10, 40], [0, 0.9, 0.35], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 30%, ${C.violet} 0%, ${C.violetDeep} 80%)`,
        overflow: "hidden",
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 55%, rgba(200,255,61,${glow}) 0%, transparent 55%)`,
        }}
      />
      <Phone time="18:02">{recording ? <ScreenRecording src={recording} from={recordingFrom} /> : <Success />}</Phone>
      <Confetti />
      <CaptionStack top={210} gap={12}>
        <CaptionLine delay={4} size={76}>
          Lekcja nawet
        </CaptionLine>
        <CaptionLine delay={10} size={92} tilt={-2}>
          <Mark>za 45 minut</Mark> <Emoji char="⚡" size={80} />
        </CaptionLine>
      </CaptionStack>
    </AbsoluteFill>
  );
};
