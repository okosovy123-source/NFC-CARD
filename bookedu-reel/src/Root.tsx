import React from "react";
import { Composition, Folder } from "remotion";
import { Reel, ReelProps } from "./Reel";
import { Booked } from "./scenes/Booked";
import { Booking } from "./scenes/Booking";
import { Cta } from "./scenes/Cta";
import { Panic } from "./scenes/Panic";
import { PlotTwist } from "./scenes/PlotTwist";
import { FPS, SCENES, TOTAL_SECONDS } from "./theme";

const VERTICAL = { width: 1080, height: 1920, fps: FPS };

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Reel"
        component={Reel}
        durationInFrames={TOTAL_SECONDS * FPS}
        defaultProps={{ sfx: true, recording: null } satisfies ReelProps}
        {...VERTICAL}
      />
      <Composition
        id="Reel-bez-efektow"
        component={Reel}
        durationInFrames={TOTAL_SECONDS * FPS}
        defaultProps={{ sfx: false, recording: null } satisfies ReelProps}
        {...VERTICAL}
      />
      <Folder name="Sceny">
        <Composition id="Panika" component={Panic} durationInFrames={SCENES.panic.duration * FPS} {...VERTICAL} />
        <Composition id="PlotTwist" component={PlotTwist} durationInFrames={SCENES.twist.duration * FPS} {...VERTICAL} />
        <Composition
          id="Rezerwacja"
          component={Booking}
          durationInFrames={SCENES.booking.duration * FPS}
          defaultProps={{ recording: null }}
          {...VERTICAL}
        />
        <Composition
          id="Zarezerwowano"
          component={Booked}
          durationInFrames={SCENES.booked.duration * FPS}
          defaultProps={{ recording: null, recordingFrom: 0 }}
          {...VERTICAL}
        />
        <Composition id="CTA" component={Cta} durationInFrames={SCENES.cta.duration * FPS} {...VERTICAL} />
      </Folder>
    </>
  );
};
