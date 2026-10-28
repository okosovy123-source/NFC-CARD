import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { Booked } from "./scenes/Booked";
import { Booking, T } from "./scenes/Booking";
import { Cta } from "./scenes/Cta";
import { Panic } from "./scenes/Panic";
import { PlotTwist } from "./scenes/PlotTwist";
import { FPS, SCENES } from "./theme";

export type ReelProps = {
  // Efekty dźwiękowe. Wyłącz, jeśli dodajesz trendujący dźwięk w Instagramie.
  sfx: boolean;
  // Opcjonalne nagranie ekranu z bookedu.pl (plik w public/, min. 12 s) — zastępuje makietę.
  recording: string | null;
};

const s = (sec: number) => Math.round(sec * FPS);

const Sfx: React.FC<{ at: number; file: string; volume?: number }> = ({ at, file, volume = 1 }) => (
  <Sequence from={at} durationInFrames={s(2)} layout="none">
    <Audio src={staticFile(`sfx/${file}.wav`)} volume={volume} />
  </Sequence>
);

export const Reel: React.FC<ReelProps> = ({ sfx, recording }) => {
  const booking = s(SCENES.booking.from);
  return (
    <AbsoluteFill style={{ background: "black" }}>
      <Sequence name="0–3 s · Panika" from={s(SCENES.panic.from)} durationInFrames={s(SCENES.panic.duration)}>
        <Panic />
      </Sequence>
      <Sequence name="3–6 s · Plot twist" from={s(SCENES.twist.from)} durationInFrames={s(SCENES.twist.duration)}>
        <PlotTwist />
      </Sequence>
      <Sequence name="6–15 s · Rezerwacja" from={booking} durationInFrames={s(SCENES.booking.duration)}>
        <Booking recording={recording} />
      </Sequence>
      <Sequence name="15–18 s · Zarezerwowano" from={s(SCENES.booked.from)} durationInFrames={s(SCENES.booked.duration)}>
        <Booked recording={recording} recordingFrom={s(SCENES.booking.duration)} />
      </Sequence>
      <Sequence name="18–20 s · CTA" from={s(SCENES.cta.from)} durationInFrames={s(SCENES.cta.duration)}>
        <Cta />
      </Sequence>

      {sfx && (
        <>
          <Sfx at={0} file="tick" volume={0.5} />
          <Sfx at={s(1)} file="tick" volume={0.5} />
          <Sfx at={s(2)} file="tick" volume={0.5} />
          <Sfx at={s(SCENES.twist.from) + 7} file="boom" />
          <Sfx at={booking} file="whoosh" volume={0.8} />
          {!recording && (
            <>
              <Sfx at={booking + T.tapSubject} file="tap" />
              <Sfx at={booking + T.toTutors} file="whoosh" volume={0.35} />
              <Sfx at={booking + T.tapTutor} file="tap" />
              <Sfx at={booking + T.toSlots} file="whoosh" volume={0.35} />
              <Sfx at={booking + T.tapSlot} file="tap" />
              <Sfx at={booking + T.tapBook} file="tap" />
            </>
          )}
          <Sfx at={booking + T.tapBook + 10} file="pop" volume={0.7} />
          <Sfx at={s(SCENES.booked.from)} file="ding" />
          <Sfx at={s(SCENES.cta.from)} file="whoosh" volume={0.7} />
          <Sfx at={s(SCENES.cta.from) + 5} file="pop" />
        </>
      )}
    </AbsoluteFill>
  );
};
