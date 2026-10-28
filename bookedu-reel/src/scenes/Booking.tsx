import React from "react";
import { Video } from "@remotion/media";
import { AbsoluteFill, Easing, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Phone, SCREEN, Tap } from "../components/Phone";
import { CaptionLine, CaptionStack, Emoji, usePop } from "../components/ui";
import { C, FONT } from "../theme";

// Kluczowe momenty sceny (klatki od początku sceny, 30 fps).
export const T = {
  tapSubject: 55,
  toTutors: 70,
  tapTutor: 140,
  toSlots: 154,
  tapSlot: 192,
  tapBook: 226,
};

const W = SCREEN.width;
const PAD = 32;

const ease = Easing.bezier(0.65, 0, 0.35, 1);

const Logo: React.FC = () => (
  <div style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 40, letterSpacing: -1 }}>
    book<span style={{ color: C.violet }}>edu</span>
    <span style={{ color: C.violet }}>.</span>
  </div>
);

const SUBJECTS: [string, string][] = [
  ["📐", "Matematyka"],
  ["🇬🇧", "Angielski"],
  ["📖", "Polski"],
  ["⚛️", "Fizyka"],
  ["🧪", "Chemia"],
  ["🧬", "Biologia"],
];

const CHIP = { w: (W - PAD * 2 - 16) / 2, h: 150 };

const SubjectStep: React.FC = () => {
  const frame = useCurrentFrame();
  const picked = frame >= T.tapSubject;
  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: W, height: "100%" }}>
      <div style={{ position: "absolute", left: PAD, top: 24 }}>
        <Logo />
      </div>
      <div style={{ position: "absolute", left: PAD, right: PAD, top: 100, fontSize: 42, fontWeight: 800, lineHeight: 1.15 }}>
        Z czego potrzebujesz pomocy?
      </div>
      <div
        style={{
          position: "absolute",
          left: PAD,
          right: PAD,
          top: 236,
          height: 70,
          borderRadius: 20,
          background: C.white,
          border: `2px solid ${C.line}`,
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
          fontSize: 26,
          color: C.muted,
          gap: 12,
        }}
      >
        🔍 Szukaj przedmiotu…
      </div>
      {SUBJECTS.map(([icon, label], i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const active = picked && i === 0;
        return (
          <div
            key={label}
            style={{
              position: "absolute",
              left: PAD + col * (CHIP.w + 16),
              top: 336 + row * (CHIP.h + 16),
              width: CHIP.w,
              height: CHIP.h,
              borderRadius: 24,
              background: active ? C.violet : C.white,
              color: active ? C.white : C.text,
              border: `2px solid ${active ? C.violet : C.line}`,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              paddingLeft: 26,
              gap: 10,
              fontSize: 30,
              fontWeight: 700,
              boxShadow: active ? "0 14px 30px rgba(108,76,255,0.4)" : "none",
              scale: String(active ? interpolate(frame - T.tapSubject, [0, 4, 10], [0.94, 0.94, 1], { extrapolateRight: "clamp" }) : 1),
            }}
          >
            <Emoji char={icon} size={50} />
            {label}
          </div>
        );
      })}
    </div>
  );
};

const TUTORS = [
  { name: "Anna K.", initials: "AK", rating: "4,9", reviews: 128, tag: "Matura · liceum", slot: "18:45", hue: "#FF8A5B" },
  { name: "Michał W.", initials: "MW", rating: "4,8", reviews: 94, tag: "Egzamin ósmoklasisty", slot: "19:30", hue: "#3DB8FF" },
  { name: "Ola N.", initials: "ON", rating: "5,0", reviews: 61, tag: "Szkoła podstawowa", slot: "20:00", hue: "#B65BFF" },
];

const Stars: React.FC<{ rating: string; reviews: number }> = ({ rating, reviews }) => (
  <div style={{ fontSize: 22, color: C.muted, fontWeight: 600 }}>
    <span style={{ color: "#F5A524" }}>★</span> <span style={{ color: C.text, fontWeight: 700 }}>{rating}</span> ({reviews}{" "}
    opinii)
  </div>
);

const Avatar: React.FC<{ initials: string; hue: string; size: number }> = ({ initials, hue, size }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      background: `linear-gradient(135deg, ${hue}, ${C.violet})`,
      color: C.white,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 800,
      fontSize: size * 0.36,
      flexShrink: 0,
    }}
  >
    {initials}
  </div>
);

const TutorStep: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", left: W, top: 0, width: W, height: "100%" }}>
      <div style={{ position: "absolute", left: PAD, top: 24, fontSize: 40, fontWeight: 800 }}>← Matematyka</div>
      <div
        style={{
          position: "absolute",
          left: PAD,
          top: 92,
          fontSize: 26,
          fontWeight: 600,
          color: C.green,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div style={{ width: 14, height: 14, borderRadius: 7, background: C.green }} /> Wolne terminy dziś
      </div>
      {TUTORS.map((t, i) => {
        const appear = interpolate(frame, [T.toTutors + 6 + i * 5, T.toTutors + 18 + i * 5], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.cubic),
        });
        const pressed = i === 0 && frame >= T.tapTutor;
        return (
          <div
            key={t.name}
            style={{
              position: "absolute",
              left: PAD,
              right: PAD,
              top: 160 + i * 206,
              height: 186,
              borderRadius: 26,
              background: C.white,
              border: `2px solid ${pressed ? C.violet : C.line}`,
              boxShadow: pressed ? "0 14px 30px rgba(108,76,255,0.3)" : "0 6px 16px rgba(20,20,43,0.06)",
              display: "flex",
              alignItems: "center",
              gap: 22,
              padding: "0 24px",
              opacity: appear,
              translate: `0px ${(1 - appear) * 40}px`,
              scale: String(pressed ? interpolate(frame - T.tapTutor, [0, 4, 10], [0.96, 0.96, 1], { extrapolateRight: "clamp" }) : 1),
            }}
          >
            <Avatar initials={t.initials} hue={t.hue} size={96} />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ fontSize: 32, fontWeight: 800 }}>{t.name}</div>
              <Stars rating={t.rating} reviews={t.reviews} />
              <div style={{ fontSize: 21, fontWeight: 600, color: C.violet }}>{t.tag}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 19, color: C.muted, fontWeight: 600 }}>dziś</div>
              <div style={{ fontSize: 30, fontWeight: 800, color: C.green }}>{t.slot}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const SLOTS = [
  { time: "18:45", free: true },
  { time: "19:30", free: true },
  { time: "20:00", free: false },
  { time: "20:30", free: true },
  { time: "21:00", free: false },
  { time: "21:30", free: true },
];
const SLOT = { w: (W - PAD * 2 - 32) / 3, h: 90 };
export const BOOK_BTN = { top: 790, height: 100 };

const SlotStep: React.FC = () => {
  const frame = useCurrentFrame();
  const slotPicked = frame >= T.tapSlot;
  const booking = frame >= T.tapBook;
  const summary = interpolate(frame, [T.tapSlot, T.tapSlot + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  return (
    <div style={{ position: "absolute", left: W * 2, top: 0, width: W, height: "100%" }}>
      <div style={{ position: "absolute", left: PAD, top: 20, display: "flex", alignItems: "center", gap: 20 }}>
        <Avatar initials="AK" hue="#FF8A5B" size={84} />
        <div>
          <div style={{ fontSize: 34, fontWeight: 800 }}>Anna K.</div>
          <div style={{ fontSize: 24, fontWeight: 600, color: C.muted }}>Matematyka</div>
        </div>
      </div>
      <div style={{ position: "absolute", left: PAD, top: 140, fontSize: 36, fontWeight: 800 }}>Wybierz termin</div>
      <div style={{ position: "absolute", left: PAD, top: 202, display: "flex", gap: 14 }}>
        {["Dziś", "Jutro", "Pojutrze"].map((d, i) => (
          <div
            key={d}
            style={{
              padding: "14px 28px",
              borderRadius: 40,
              fontSize: 26,
              fontWeight: 700,
              background: i === 0 ? C.text : C.white,
              color: i === 0 ? C.white : C.text,
              border: `2px solid ${i === 0 ? C.text : C.line}`,
            }}
          >
            {d}
          </div>
        ))}
      </div>
      {SLOTS.map((s, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const active = slotPicked && i === 0;
        return (
          <div
            key={s.time}
            style={{
              position: "absolute",
              left: PAD + col * (SLOT.w + 16),
              top: 310 + row * (SLOT.h + 34),
              width: SLOT.w,
              height: SLOT.h,
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 800,
              background: active ? C.violet : s.free ? C.white : "#EEEEF4",
              color: active ? C.white : s.free ? C.text : "#B4B6C6",
              textDecoration: s.free ? "none" : "line-through",
              border: `2px solid ${active ? C.violet : s.free ? C.line : "#EEEEF4"}`,
              scale: String(active ? interpolate(frame - T.tapSlot, [0, 4, 10], [0.92, 0.92, 1], { extrapolateRight: "clamp" }) : 1),
            }}
          >
            {s.time}
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          left: PAD,
          top: 310 + SLOT.h + 2,
          width: SLOT.w,
          textAlign: "center",
          fontSize: 20,
          fontWeight: 800,
          color: C.green,
        }}
      >
        za 45 min
      </div>
      <div
        style={{
          position: "absolute",
          left: PAD,
          right: PAD,
          top: 580,
          borderRadius: 24,
          background: "#EFEAFF",
          padding: "22px 26px",
          fontSize: 26,
          fontWeight: 600,
          color: C.text,
          opacity: summary,
          translate: `0px ${(1 - summary) * 20}px`,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div style={{ fontWeight: 800, fontSize: 28 }}>Matematyka z Anną K.</div>
        <div style={{ color: C.muted }}>Dziś, 18:45</div>
      </div>
      <div
        style={{
          position: "absolute",
          left: PAD,
          right: PAD,
          top: BOOK_BTN.top,
          height: BOOK_BTN.height,
          borderRadius: 28,
          background: slotPicked ? C.violet : "#D9D9E6",
          color: C.white,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          fontSize: 36,
          fontWeight: 800,
          boxShadow: slotPicked ? "0 18px 36px rgba(108,76,255,0.45)" : "none",
          scale: String(booking ? interpolate(frame - T.tapBook, [0, 4, 10], [0.94, 0.94, 1], { extrapolateRight: "clamp" }) : 1),
        }}
      >
        {booking ? (
          <>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 17,
                border: "5px solid rgba(255,255,255,0.35)",
                borderTopColor: C.white,
                rotate: `${(frame - T.tapBook) * 18}deg`,
              }}
            />
            Rezerwuję…
          </>
        ) : (
          "Zarezerwuj"
        )}
      </div>
    </div>
  );
};

const MockScreens: React.FC = () => {
  const frame = useCurrentFrame();
  const step = interpolate(frame, [T.toTutors, T.toTutors + 14, T.toSlots, T.toSlots + 14], [0, 1, 1, 2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  return (
    <>
      <div style={{ position: "absolute", inset: 0, translate: `${-step * W}px 0px` }}>
        <SubjectStep />
        <TutorStep />
        <SlotStep />
      </div>
      <Tap x={PAD + CHIP.w / 2} y={336 + CHIP.h / 2} at={T.tapSubject} />
      <Tap x={W / 2} y={160 + 93} at={T.tapTutor} />
      <Tap x={PAD + SLOT.w / 2} y={310 + SLOT.h / 2} at={T.tapSlot} />
      <Tap x={W / 2} y={BOOK_BTN.top + BOOK_BTN.height / 2} at={T.tapBook} />
    </>
  );
};

// Jeśli podasz własne nagranie ekranu (plik w public/), zastąpi ono makietę w telefonie.
export const ScreenRecording: React.FC<{ src: string; from: number }> = ({ src, from }) => (
  <Video
    src={staticFile(src)}
    trimBefore={from}
    muted
    objectFit="cover"
    style={{ position: "absolute", top: -136, left: 0, width: "100%", height: "calc(100% + 136px)" }}
  />
);

export const Booking: React.FC<{ recording?: string | null }> = ({ recording }) => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [0, 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const sticker = usePop(T.tapBook + 10, 9);

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 30%, ${C.violet} 0%, ${C.violetDeep} 80%)`,
        overflow: "hidden",
      }}
    >
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,0.06) 2px, transparent 2px)",
          backgroundSize: "80px 80px",
        }}
      />
      <Phone
        style={{
          translate: `0px ${(1 - enter) * 1300}px`,
          rotate: `${(1 - enter) * 12}deg`,
        }}
      >
        {recording ? <ScreenRecording src={recording} from={0} /> : <MockScreens />}
      </Phone>
      <CaptionStack top={210} gap={12}>
        <CaptionLine delay={14} size={64}>
          Wybierasz przedmiot,
        </CaptionLine>
        <CaptionLine delay={T.tapSlot - 4} size={64}>
          godzinę, <span style={{ color: C.violet }}>klikasz.</span>
        </CaptionLine>
      </CaptionStack>
      <div style={{ position: "absolute", left: 0, right: 0, top: 1150, display: "flex", justifyContent: "center" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            background: C.lime,
            color: C.text,
            fontFamily: FONT.display,
            fontWeight: 800,
            fontSize: 64,
            padding: "16px 34px 20px",
            borderRadius: 26,
            boxShadow: "0 20px 44px rgba(0,0,0,0.35)",
            rotate: "-4deg",
            opacity: interpolate(sticker, [0, 0.2], [0, 1], { extrapolateRight: "clamp" }),
            scale: String(interpolate(sticker, [0, 1], [1.8, 1])),
          }}
        >
          <Emoji char="📵" size={64} /> Bez dzwonienia.
        </div>
      </div>
    </AbsoluteFill>
  );
};
