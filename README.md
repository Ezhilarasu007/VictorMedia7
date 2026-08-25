# VictorMedia — Production-Ready Full-Stack Platform

VictorMedia (`victormedia.net`) is a high-performance digital technology, education, developer tools, and AI platform. Built with Next.js 14, Supabase, and Flutter Android SDK, it is architected for legitimate long-term monetization through Google AdSense and Google AdMob.

---

## 🌟 Platform Highlights

- **Web Application (`/web`)**: Next.js 14 App Router, TypeScript, Tailwind CSS, SSR, SEO Metadata, Dynamic Sitemap, robots.txt, AdSense-ready layout, Desktop & Mobile Navigation.
- **Android Application (`/android_app`)**: Flutter, Dart, Material 3, Google Mobile Ads SDK integration (`AdService`), Banner, Interstitial, and Rewarded ads using official Google Test Ad Units.
- **Database & RLS (`/supabase`)**: PostgreSQL DDL migration, Row Level Security (RLS) policies, UUIDs, foreign keys, triggers, storage bucket configuration, and seed data.
- **Developer Utilities**: 18 interactive client-side tools (Word Counter, JSON Formatter, Base64, Document Exporter, Favicon Gen, Password Gen, QR Gen, etc.).
- **AI Suite**: 7 server-backed AI tools (Text Assistant, Summarizer, Grammar, Idea Gen, Study Assistant, Code Explain, Email Gen).
- **Admin Dashboard (`/admin`)**: Telemetry analytics, article CMS with publishing schedules, quiz builder, category manager, and audit logging.
- **Ad Security**: Server-Side Verification (`/api/ads/verify-reward`) for AdMob rewarded events with unique `reward_event_id` constraints to prevent replay attacks.

---

## 📁 Repository Structure

```
VictorMedia/
├── supabase/
│   ├── migrations/20260825000000_init_victormedia.sql
│   └── seed.sql
├── web/
│   ├── public/ (ads.txt, icons)
│   ├── src/
│   │   ├── app/ (All Next.js pages & API routes)
│   │   ├── lib/ (Supabase browser, server, admin clients)
│   │   └── types/
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.js
│   └── tsconfig.json
├── android_app/
│   ├── android/ (AndroidManifest.xml with AdMob App ID)
│   ├── lib/
│   │   ├── services/ (ad_service.dart, supabase_service.dart)
│   │   ├── screens/ (home, explore, tools, games, quiz, ai, profile)
│   │   └── main.dart
│   └── pubspec.yaml
├── DEPLOYMENT.md
├── SECURITY.md
└── README.md
```

---

## 🚀 Quick Setup & Verification

### 1. Database Setup
Execute the migration SQL file in your Supabase SQL Editor:
```bash
# Apply migrations
d:\VictorMedia\supabase\migrations\20260825000000_init_victormedia.sql

# Seed data
d:\VictorMedia\supabase\seed.sql
```

### 2. Next.js Web Application
```bash
cd web
npm install
npm run dev
```
Open `http://localhost:3000` in your browser.

### 3. Flutter Android App
```bash
cd android_app
flutter pub get
flutter run
```
