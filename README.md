# IPT Trainer - Military Decision Tactical Training

A web-based application for military tactical decision training with category-specific question banks, admin controls, and audio feedback.

## Architecture

The project has recently been migrated to a modern serverless stack:
- **Frontend & Backend Hosting**: [Cloudflare Pages](https://pages.cloudflare.com/)
- **Database**: Cloudflare D1 (Serverless SQLite)
- **Mobile App**: Cordova/Capacitor acting as a highly efficient live web wrapper.

## Features

- 📱 **Responsive Design** (Desktop & Mobile)
- 🎯 **Multiple Question Categories** (SNK, NCO, JCO, NCO Course, JCO Course)
- 🔒 **Dynamic Access Control** (Admin can toggle visibility and set unique passwords per category via `D1` database)
- ⚙️ **Admin Dashboard** (Available at `/admin.html` secured with a master key)
- 🏆 **Leaderboard** with persistence
- 🔊 **Audio Feedback** (Correct/Wrong responses)
- 📊 **Progress Tracking** and 10-second timer per question
- 🎖️ **Military Tactical Theme**

## Prerequisites

- Node.js 18+
- Cloudflare [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/)
- Android Studio (Only needed once for the initial Capacitor build)

## Local Development (Cloudflare Pages)

To run the application locally with the D1 database binding:

1. **Install Dependencies**:
   ```bash
   npm install
   npm install -D wrangler
   ```

2. **Initialize Local Database**:
   ```bash
   npx wrangler d1 execute shag_db --local --file=./schema.sql
   ```

3. **Start Local Development Server**:
   ```bash
   npx wrangler pages dev www
   ```

## Admin Dashboard

To access the admin dashboard, navigate to `/admin.html` in your browser.
Enter the master admin key to view and modify:
- Which categories are visible to users.
- The unique access password for each specific category.

## Deployment to Cloudflare

Deploying updates to the live site is simple. Because the Android APK is a live wrapper pointing to the Cloudflare URL, **you do not need to rebuild the APK when you change HTML or JS**.

```bash
# Optional: Update production database schema if needed
npx wrangler d1 execute shag_db --remote --file=./schema.sql

# Deploy code to Cloudflare Pages
npx wrangler pages deploy www
```

## Android APK

The `capacitor.config.json` is configured to load the live Cloudflare Pages URL directly (`https://shag-3jd.pages.dev`). You only need to build the APK once.

```bash
# Sync web directory changes to Android
npx cap sync android

# Build from Android Studio or via Gradle
cd android
./gradlew assembleRelease
```
The APK will be located at: `android/app/build/outputs/apk/release/app-release.apk`

## Author

MADE BY 36 BIR
