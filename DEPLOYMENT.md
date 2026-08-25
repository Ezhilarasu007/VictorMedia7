# VictorMedia Production Deployment Guide

Target Domain: `victormedia.net`

## 1. Web Deployment (Vercel)

1. Push the `/web` repository folder to Git (GitHub / GitLab / Bitbucket).
2. Import the project into Vercel.
3. Configure Root Directory as `web`.
4. Set Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `AI_PROVIDER_API_KEY`
   - `NEXT_PUBLIC_GA_ID`
5. Connect domain `victormedia.net`.
6. Enable HTTPS & verify DNS CNAME/A records.
7. Update `public/ads.txt` with your approved Google AdSense publisher ID (`pub-XXXXXXXXXXXXXXXX`).

## 2. Android Deployment (Google Play Console)

1. Open `android_app/android/app/src/main/AndroidManifest.xml` and replace development AdMob App ID with your production AdMob App ID.
2. Open `android_app/lib/services/ad_service.dart` and swap Google Test Ad IDs with production AdMob unit IDs.
3. Generate signed Android App Bundle (.aab):
   ```bash
   cd android_app
   flutter build aab --release
   ```
4. Upload `.aab` to Google Play Console release track.

## 3. AdSense & AdMob Compliance Verification

- Ensure zero automated traffic, click incentives, or artificial impression generators exist.
- Place ads strictly at natural content boundaries and transition points.
