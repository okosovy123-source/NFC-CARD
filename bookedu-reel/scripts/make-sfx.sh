#!/usr/bin/env bash
# Generuje proste efekty dźwiękowe (syntezowane, bez licencji) do public/sfx/.
set -euo pipefail
cd "$(dirname "$0")/.."
OUT=public/sfx
mkdir -p "$OUT"
F="ffmpeg -hide_banner -loglevel error -y"

# Tykanie zegara
$F -f lavfi -i "sine=f=2400:d=0.035" -f lavfi -i "anoisesrc=d=0.035:c=white:a=0.5" \
  -filter_complex "[0][1]amix=2,afade=t=out:st=0.005:d=0.03,volume=0.9,highpass=f=900" -ar 48000 "$OUT/tick.wav"

# Dramatyczne uderzenie (boom)
$F -f lavfi -i "sine=f=55:d=1.6" -f lavfi -i "sine=f=110:d=1.6" -f lavfi -i "anoisesrc=d=0.25:c=brown:a=0.9" \
  -filter_complex "[0][1]amix=2,afade=t=out:st=0.05:d=1.5[t];[2]lowpass=f=600,afade=t=out:st=0.02:d=0.22[n];[t][n]amix=2:normalize=0,volume=2.2,alimiter=limit=0.9" -ar 48000 "$OUT/boom.wav"

# Whoosh
$F -f lavfi -i "anoisesrc=d=0.6:c=pink:a=0.8" \
  -af "bandpass=f=1800:width_type=o:w=2,afade=t=in:d=0.3:curve=exp,afade=t=out:st=0.3:d=0.3,volume=1.6" -ar 48000 "$OUT/whoosh.wav"

# Tap (klik w telefonie)
$F -f lavfi -i "sine=f=1500:d=0.05" -af "afade=t=out:st=0:d=0.05,volume=0.7" -ar 48000 "$OUT/tap.wav"

# Ding (sukces)
$F -f lavfi -i "sine=f=1046.5:d=1.2" -f lavfi -i "sine=f=1568:d=1.2" \
  -filter_complex "[1]adelay=110|110[b];[0][b]amix=2,afade=t=out:st=0.05:d=1.1,volume=1.4" -ar 48000 "$OUT/ding.wav"

# Pop (kciuk / CTA)
$F -f lavfi -i "sine=f=420:d=0.14" -af "vibrato=f=18:d=0.6,afade=t=out:st=0.02:d=0.12,volume=1.2" -ar 48000 "$OUT/pop.wav"
ls -la "$OUT"
