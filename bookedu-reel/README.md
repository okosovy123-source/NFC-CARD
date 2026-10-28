# Rolka bookedu.pl: „Sprawdzian jutro? Lekcja dziś”

Pionowy film 1080×1920, 30 kl./s, 20 s, przygotowany na Instagram Reels (zrobiony w [Remotion](https://remotion.dev)).

## Gotowe pliki (`gotowe/`)

| Plik | Do czego |
| --- | --- |
| `bookedu-reel.mp4` | Wersja z efektami dźwiękowymi (tykanie zegara, uderzenie, kliknięcia, „ding”). |
| `bookedu-reel-bez-efektow.mp4` | Wersja bez dźwięku. Użyj jej, jeśli w Instagramie dodajesz trendujący dźwięk. |
| `okladka.jpg` | Okładka rolki (klatka „Nic nie umiem.”). |

## Sceny

| Czas | Scena | Tekst na ekranie |
| --- | --- | --- |
| 0–3 s | 😰, zegar 18:00, zeszyt z zadaniami | „Jutro sprawdzian z matmy.” / „Nic nie umiem.” |
| 3–6 s | Szybkie zbliżenie na twarz (😳 → 🤯) | „Plot twist: da się to jeszcze uratować” |
| 6–15 s | Telefon: przedmiot → korepetytor → godzina → „Zarezerwuj” | „Wybierasz przedmiot, godzinę, klikasz.” + „Bez dzwonienia.” |
| 15–18 s | Ekran „Lekcja zarezerwowana!” + konfetti | „Lekcja nawet za 45 minut” |
| 18–20 s | 😎👍 + logo | „bookedu.pl” / „link w bio” |

Interfejs w telefonie to **makieta**, a nie nagranie prawdziwej strony. Imiona korepetytorów, oceny i godziny są przykładowe.

## Podmiana makiety na prawdziwe nagranie ekranu

1. Nagraj ekran telefonu na bookedu.pl (ok. 12 s: przedmiot → korepetytor → godzina → „Zarezerwuj” → potwierdzenie).
2. Wrzuć plik do `public/`, np. `public/nagranie.mp4`.
3. W `src/Root.tsx` ustaw `recording: "nagranie.mp4"` w `defaultProps` obu kompozycji `Reel`.
4. Wyrenderuj ponownie (poniżej). Pierwsze 9 s nagrania trafi do sceny rezerwacji, następne 3 s do sceny potwierdzenia.

## Edycja i render

```bash
npm i
npm run dev      # podgląd w Remotion Studio
npm run render   # renderuje oba MP4 i okładkę do gotowe/
```

- Kolory marki: `src/theme.ts` (obiekt `C`).
- Teksty: bezpośrednio w plikach scen w `src/scenes/`.
- Efekty dźwiękowe są generowane przez `scripts/make-sfx.sh` (syntezowane w ffmpeg, bez licencji).
- Fonty (Bricolage Grotesque, Inter, Caveat — OFL) są w `public/fonts`. Emoji to Noto Emoji (Apache 2.0) w `public/emoji`.
- W środowisku bez Chrome Remotion pobierze przeglądarkę sam. Własną możesz wskazać zmienną `REMOTION_CHROME=/ścieżka/do/chrome`.
