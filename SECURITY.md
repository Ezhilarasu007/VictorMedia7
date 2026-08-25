# VictorMedia Security Policy & Architecture

## 1. Secret Key Isolation
- `SUPABASE_SERVICE_ROLE_KEY`, `AI_PROVIDER_API_KEY`, and admin credentials are strictly restricted to server-side environments (`src/app/api/`).
- Zero secrets exist in client JavaScript bundles or Flutter binaries.

## 2. Row Level Security (RLS)
- All PostgreSQL tables in Supabase have RLS enabled.
- User data (bookmarks, quiz attempts, profile fields) is accessible only by the owning authenticated user ID (`auth.uid() = id`).
- Admin tables (`audit_logs`, global settings) require `public.is_admin()` evaluation.

## 3. Server-Side Verification for Rewarded Ads
- AdMob rewarded callbacks are verified via `/api/ads/verify-reward`.
- Database uniqueness constraints on `reward_event_id` prevent duplicate reward claims and replay attacks.
