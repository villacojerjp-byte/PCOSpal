# PCOS Pal 💜

A React Native (Expo) recreation of the **PCOS Pal** iOS app UI/UX — a PCOS
companion with expert-reviewed lessons, a food scanner, PCOS-friendly recipes,
adapted workouts, and a calorie / weight tracker.

> **Theme note:** The original app's hero/brand color is a vivid raspberry
> ("eggplant") tone. Per the project brief, that brand color has been replaced
> everywhere with **purple** (`#7C3AED`), while keeping the rest of the visual
> language identical. All colors live in a single file —
> [`src/theme/colors.js`](src/theme/colors.js) — so the palette can be retuned
> in one place.

## ✨ Screens

| Screen | What's inside |
| --- | --- |
| **Welcome** | Purple gradient hero, cherry mascot, "Your PCOS partner", rating |
| **Home** | Greeting + streak, "Continue Day 3" card, This Week day selector, Today's Lessons |
| **Lessons** | Featured presenter video, day-to-day journey with completed / current / locked states |
| **Scan** | Camera viewfinder → instant food score with Nutri-Score style E–A scale, insights & macros |
| **Recipes** | "New recipes added weekly!" banner, category filter chips, 2-column recipe grid + detail |
| **Progress** | Calorie ring, macro bars, meals grid, Apple Health sync, before/after weight results, expanding **Log** FAB |
| **Workout player** | Step-through exercise player with progress segments and "Next" preview |

## 🎨 Design system

- **Colors** — purple primary with periwinkle accents, soft lavender backgrounds, dark-plum serif headings ([`src/theme/colors.js`](src/theme/colors.js)).
- **Typography** — DM Serif Display (titles), Fredoka (rounded display), Nunito (body), Caveat (script accents) via `@expo-google-fonts`.
- **Components** — reusable `Card`, `Chip`, `Badge`, `ProgressRing` (SVG), `MacroBar`, `ScoreScale`, `LogFab`, `PalMascot` (SVG), and more in [`src/components`](src/components).

## 🚀 Run locally

```bash
npm install
npx expo start
```

Open in **Expo Go** (scan the QR code) or an Android/iOS simulator.

## 📦 Build with EAS

This project is configured for [EAS Build](https://docs.expo.dev/build/introduction/).
Build profiles live in [`eas.json`](eas.json): `development`, `preview`, `production`.

```bash
npm install -g eas-cli
eas login              # log in to your Expo account
eas init               # links this project to your Expo account (writes projectId)
eas build --profile preview --platform android   # internal APK
eas build --profile production --platform all     # store-ready builds
```

> The bundle identifier / Android package is `com.villacojerjp.pcospal`
> (change it in [`app.json`](app.json) if needed).

## 🗂 Structure

```
App.js                  # font loading, splash, navigation container
src/
  theme/                # colors, typography, spacing, shadows
  data/content.js       # mock content for all screens
  components/           # reusable UI primitives
  navigation/           # root stack + custom bottom tab bar
  screens/              # Welcome, Home, Lessons, Scan, Recipes, Progress, players
assets/                 # purple-themed icon, splash, adaptive icons
```

## 📝 Disclaimer

This is a UI/UX recreation for educational purposes and is not affiliated with
the original PCOS Pal app (Slayyy, Inc.). It does not provide medical advice.
