import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Fonty (Google Fonts, licencja OFL) trzymamy lokalnie w public/fonts, żeby render działał offline.
const RANGES = {
  latin:
    "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
  "latin-ext":
    "U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF",
};

const loadLocal = (family: string, file: string) => {
  for (const [subset, unicodeRange] of Object.entries(RANGES)) {
    loadFont({ family, url: staticFile(`fonts/${file}-${subset}.woff2`), weight: "100 900", unicodeRange });
  }
  return family;
};

// Kolory marki — podmień na kolory bookedu, jeśli są inne.
export const C = {
  ink: "#0B0C1E",
  night: "#14163A",
  violet: "#6C4CFF",
  violetDeep: "#2B1A8F",
  lime: "#C8FF3D",
  red: "#FF4D5E",
  green: "#22C55E",
  paper: "#FFFBF2",
  white: "#FFFFFF",
  text: "#14142B",
  muted: "#6B6F86",
  line: "#E7E8F0",
};

export const FONT = {
  display: loadLocal("Bricolage Grotesque", "bricolage"),
  ui: loadLocal("Inter", "inter"),
  hand: loadLocal("Caveat", "caveat"),
  emoji: "'Noto Color Emoji', 'Apple Color Emoji', sans-serif",
};

export const FPS = 30;

// Ramy czasowe zgodne ze scenariuszem (w sekundach).
export const SCENES = {
  panic: { from: 0, duration: 3 },
  twist: { from: 3, duration: 3 },
  booking: { from: 6, duration: 9 },
  booked: { from: 15, duration: 3 },
  cta: { from: 18, duration: 2 },
};

export const TOTAL_SECONDS = 20;
