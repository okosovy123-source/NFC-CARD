import React from "react";
import { AbsoluteFill, Easing, interpolate, random, useCurrentFrame } from "remotion";
import { CaptionLine, CaptionStack, Emoji, Mark, usePop } from "../components/ui";
import { C, FONT } from "../theme";

export const PlotTwist: React.FC = () => {
  const frame = useCurrentFrame();
  // Szybki "crash zoom" na twarz, potem drganie po uderzeniu.
  const zoom = interpolate(frame, [0, 8], [0.43, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.9, 0.2, 1),
  });
  const shake = interpolate(frame, [8, 26], [26, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sx = (random(`sx${frame}`) - 0.5) * shake;
  const sy = (random(`sy${frame}`) - 0.5) * shake;
  const flash = interpolate(frame, [7, 9, 16], [0, 0.85, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  // Tło przechodzi z alarmowej czerwieni w "nadzieję" (fiolet marki).
  const hope = interpolate(frame, [40, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const title = usePop(18, 9);
  const glitch = frame >= 18 && frame < 34 && frame % 4 < 2 ? 8 : 0;
  const lines = Array.from({ length: 16 }, (_, i) => i);

  return (
    <AbsoluteFill style={{ background: C.ink, overflow: "hidden" }}>
      <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 55%, #7A1020 0%, #2A0610 70%)" }} />
      <AbsoluteFill
        style={{
          opacity: hope,
          background: `radial-gradient(circle at 50% 55%, ${C.violet} 0%, ${C.violetDeep} 75%)`,
        }}
      />
      {/* Linie prędkości */}
      <svg width={1080} height={1920} style={{ position: "absolute", opacity: interpolate(frame, [4, 10, 30], [0, 0.5, 0.15], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
        {lines.map((i) => {
          const a = (i / lines.length) * Math.PI * 2 + random(`a${i}`) * 0.2;
          return (
            <line
              key={i}
              x1={540 + Math.cos(a) * 420}
              y1={1150 + Math.sin(a) * 420}
              x2={540 + Math.cos(a) * 1500}
              y2={1150 + Math.sin(a) * 1500}
              stroke="white"
              strokeWidth={6 + random(`w${i}`) * 10}
            />
          );
        })}
      </svg>
      <div
        style={{
          position: "absolute",
          left: 540 - 400,
          top: 1150 - 400,
          width: 800,
          height: 800,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          scale: String(zoom),
          translate: `${sx}px ${sy}px`,
        }}
      >
        <Emoji char={frame < 46 ? "😳" : "🤯"} size={780} />
      </div>
      <CaptionStack top={260} gap={22}>
        <div
          style={{
            fontFamily: FONT.display,
            fontWeight: 800,
            fontSize: 150,
            lineHeight: 1,
            letterSpacing: -4,
            color: C.lime,
            textTransform: "uppercase",
            textShadow: `${glitch}px 0 0 ${C.red}, ${-glitch}px 0 0 #3DD9FF, 0 14px 40px rgba(0,0,0,0.45)`,
            opacity: interpolate(title, [0, 0.2], [0, 1], { extrapolateRight: "clamp" }),
            scale: String(interpolate(title, [0, 1], [2.2, 1])),
            rotate: "-3deg",
          }}
        >
          Plot twist:
        </div>
        <CaptionLine delay={34} size={74}>
          da się to jeszcze <Mark>uratować</Mark>
        </CaptionLine>
      </CaptionStack>
      <AbsoluteFill style={{ background: "white", opacity: flash }} />
    </AbsoluteFill>
  );
};
