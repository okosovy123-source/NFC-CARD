import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT } from "../theme";

// Sprężyste wejście 0 → 1 zaczynające się w klatce `delay`.
export const usePop = (delay: number, damping = 12) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping, stiffness: 180 } });
};

// Duże emoji jako wektory Noto (public/emoji), żeby były ostre przy zbliżeniach; reszta z fontu.
const EMOJI_SVG: Record<string, string> = {
  "😰": "1f630",
  "😳": "1f633",
  "🤯": "1f92f",
  "😎": "1f60e",
  "👍": "1f44d",
  "📵": "1f4f5",
  "⚡": "26a1",
};

export const Emoji: React.FC<{ char: string; size: number; style?: React.CSSProperties }> = ({
  char,
  size,
  style,
}) =>
  EMOJI_SVG[char] ? (
    <Img
      src={staticFile(`emoji/${EMOJI_SVG[char]}.svg`)}
      style={{ width: size, height: size, display: "inline-block", verticalAlign: "middle", ...style }}
    />
  ) : (
    <span style={{ fontFamily: FONT.emoji, fontSize: size, lineHeight: 1, display: "inline-block", ...style }}>
      {char}
    </span>
  );

type Variant = "white" | "red" | "lime" | "ink";

const VARIANTS: Record<Variant, { bg: string; fg: string }> = {
  white: { bg: C.white, fg: C.text },
  red: { bg: C.red, fg: C.white },
  lime: { bg: C.lime, fg: C.text },
  ink: { bg: C.ink, fg: C.white },
};

// Napis w stylu Reels: każda linia w osobnym zaokrąglonym "dymku".
export const CaptionLine: React.FC<{
  delay: number;
  variant?: Variant;
  size?: number;
  tilt?: number;
  children: React.ReactNode;
}> = ({ delay, variant = "white", size = 76, tilt = 0, children }) => {
  const p = usePop(delay, 14);
  const v = VARIANTS[variant];
  return (
    <div
      style={{
        display: "inline-block",
        background: v.bg,
        color: v.fg,
        fontFamily: FONT.display,
        fontWeight: 800,
        fontSize: size,
        lineHeight: 1.08,
        letterSpacing: -1,
        padding: "14px 30px 18px",
        borderRadius: 26,
        boxShadow: "0 18px 40px rgba(0,0,0,0.28)",
        opacity: interpolate(p, [0, 0.3], [0, 1], { extrapolateRight: "clamp" }),
        scale: String(interpolate(p, [0, 1], [0.6, 1])),
        translate: `0px ${interpolate(p, [0, 1], [40, 0])}px`,
        rotate: `${tilt}deg`,
        textAlign: "center",
        maxWidth: 900,
      }}
    >
      {children}
    </div>
  );
};

export const CaptionStack: React.FC<{ top: number; gap?: number; children: React.ReactNode }> = ({
  top,
  gap = 14,
  children,
}) => (
  <div
    style={{
      position: "absolute",
      top,
      left: 80,
      right: 80,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap,
    }}
  >
    {children}
  </div>
);

export const Mark: React.FC<{ color?: string; children: React.ReactNode }> = ({ color = C.lime, children }) => (
  <span style={{ background: color, borderRadius: 12, padding: "0 10px", boxDecorationBreak: "clone" }}>{children}</span>
);
