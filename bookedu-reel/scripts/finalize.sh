#!/usr/bin/env bash
# Przekodowuje render do standardowego H.264 yuv420p (+faststart) i zapisuje gotowe pliki w gotowe/.
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p gotowe
for f in bookedu-reel bookedu-reel-bez-efektow; do
  ffmpeg -hide_banner -loglevel error -y -i "out/$f.mp4" \
    -vf "scale=in_range=full:out_range=tv,format=yuv420p" \
    -c:v libx264 -preset slow -crf 17 -profile:v high \
    -colorspace bt709 -color_primaries bt709 -color_trc bt709 -color_range tv \
    -c:a copy -movflags +faststart "gotowe/$f.mp4"
done
ffmpeg -hide_banner -loglevel error -y -i out/okladka.png -q:v 2 gotowe/okladka.jpg
ls -la gotowe
