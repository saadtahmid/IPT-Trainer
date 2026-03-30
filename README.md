# IPT Trainer - Military Decision Tactical Training

A web-based application for military tactical decision training with category-specific question banks and audio feedback.

## Features

- 📱 Responsive design (desktop & mobile)
- 🎯 Multiple question categories (SNK, NCO, JCO, NCO Course, JCO Course)
- 🏆 Leaderboard with persistence
- 🔊 Audio feedback (correct/wrong responses)
- 📊 Progress tracking and timer
- 🎖️ Military tactical theme

## Prerequisites

- Node.js 18+
- Android SDK (for APK builds)
- Gradle (included in Android SDK)

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build APK

### Local Build
```bash
npx cap sync
cd android
./gradlew assembleRelease
```

The APK will be located at: `android/app/build/outputs/apk/release/app-release.apk`

### Cloud Build with Netlify
Push to GitHub and Netlify will automatically build the APK using the provided workflow.

## Project Structure

```
├── index.html           # Main UI
├── style.css            # Military tactical theme
├── script.js            # Quiz logic & routing
├── sounds/              # Audio effects
├── www/                 # Capacitor web assets
├── android/             # Android platform
├── capacitor.config.json
├── netlify.toml         # Netlify config
└── package.json
```

## Author

MADE BY 36 BIR
