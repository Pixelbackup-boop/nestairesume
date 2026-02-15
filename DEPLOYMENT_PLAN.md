# Google Cloud Run Deployment Plan

## Overview

Move both frontend (currently on Vercel) and backend (currently on Cloud Run) to a unified Google Cloud Run setup. Auto-scalable — upgrade RAM/CPU/storage with one command as users grow. No migration ever needed.

**Chosen Service:** Google Cloud Run
**Cost:** ~$44/mo (100 users/day) → ~$600/mo (10,000 users/day)
**Cold Start:** min-instances=0 (can upgrade to 1 later for $20/mo)
**CI/CD:** GitHub Actions

---

## Architecture

```
You (git push) → GitHub Actions → Google Artifact Registry → Google Cloud Run
                                                                    ↓
                    ┌───────────────────────────────────────────────────────┐
                    │              Google Cloud (us-central1)              │
                    ├───────────────────────────────────────────────────────┤
                    │                                                       │
                    │  Cloud Run: resume-frontend                          │
                    │  ├─ Next.js 16 (SSR)                                │
                    │  ├─ 1 GB RAM, 1 CPU                                 │
                    │  ├─ min: 0, max: 50 instances                       │
                    │  ├─ concurrency: 100 requests/instance              │
                    │  └─ www.bestairesumes.com                           │
                    │                                                       │
                    │  Cloud Run: resume-backend                           │
                    │  ├─ Express.js + Puppeteer/Chromium                  │
                    │  ├─ 4 GB RAM, 2 CPU                                 │
                    │  ├─ min: 0, max: 20 instances                       │
                    │  ├─ concurrency: 8 requests/instance                │
                    │  └─ api.bestairesumes.com                           │
                    │                                                       │
                    │  Cloud SQL: PostgreSQL                               │
                    │  ├─ db-custom-1-3840 (1 vCPU, 3.75 GB RAM)         │
                    │  ├─ 20 GB SSD (auto-expand enabled)                 │
                    │  └─ Automated daily backups                         │
                    │                                                       │
                    │  Secret Manager: all sensitive env vars              │
                    │  Artifact Registry: Docker images                    │
                    └───────────────────────────────────────────────────────┘
```

---

## Cost Estimates

| Traffic | Frontend | Backend | Cloud SQL | Total |
|---------|----------|---------|-----------|-------|
| 100 users/day | $1 | $2 | $40 | **~$44/mo** |
| 1,000 users/day | $10 | $40 | $90 | **~$145/mo** |
| 10,000 users/day | $50 | $200 | $350 | **~$600/mo** |

---

## Scaling Commands (No Migration, Just One Command)

```bash
# Upgrade backend RAM (e.g., more concurrent PDF generation):
gcloud run services update resume-backend --memory 8Gi --cpu 4

# Handle more frontend traffic:
gcloud run services update resume-frontend --max-instances 100

# Upgrade database:
gcloud sql instances patch resume-db --tier=db-custom-2-7680

# Enable high availability (at revenue > $10K/mo):
gcloud sql instances patch resume-db --availability-type=REGIONAL

# Switch from cold to warm (always-on, no wait):
gcloud run services update resume-backend --min-instances 1

# Go multi-region (50K+ users):
gcloud run deploy resume-frontend-eu --region europe-west1
```

---

## Change Google Account (Zero Downtime)

```bash
# 1. Add new account as Owner
gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member="user:new-email@gmail.com" \
  --role="roles/owner"

# 2. New account links their billing (GCP Console → Billing)

# 3. Remove old account (optional)
gcloud projects remove-iam-policy-binding YOUR_PROJECT_ID \
  --member="user:old-email@gmail.com" \
  --role="roles/owner"

# Nothing moves. Same URLs, same data, same everything. Just a new owner.
```

---

## Implementation Plan

### Part A: Production-Readiness Fixes (Before Deploy)

These issues were found during our production audit. Must fix before going live.

#### A1. Remove `continue-on-error` from tests [CRITICAL]
- **File:** `.github/workflows/deploy.yml` (lines 40, 48, 57)
- **Problem:** All 3 test steps have `continue-on-error: true` — broken code can deploy to production
- **Fix:** Remove `continue-on-error: true` from backend tests, frontend lint, and E2E tests
- **Status:** [ ] Not started

#### A2. Enable Sentry error monitoring [CRITICAL]
- **Files:** `backend/src/lib/sentry.ts.disabled` → `sentry.ts`, `backend/src/index.ts`
- **Problem:** Error monitoring is disabled — production errors are invisible
- **Fix:** Rename file, import in index.ts, add SENTRY_DSN to GCP Secret Manager
- **Status:** [ ] Not started

#### A3. Add SIGTERM graceful shutdown [CRITICAL]
- **File:** `backend/src/index.ts`
- **Problem:** Cloud Run sends SIGTERM during deploys — in-flight PDF requests get killed
- **Fix:** Add handler: stop accepting requests → wait for in-flight → close DB → exit
- **Status:** [ ] Not started

#### A4. Configure Prisma connection pooling [CRITICAL]
- **File:** `backend/src/config/database.ts` or DATABASE_URL
- **Problem:** No connection limit — 20 Cloud Run instances could open unlimited DB connections
- **Fix:** Add `?connection_limit=5&pool_timeout=10` to DATABASE_URL (20 instances × 5 = 100 max)
- **Status:** [ ] Not started

#### A5. Move secrets from `--set-env-vars` to `--set-secrets` [CRITICAL]
- **File:** `.github/workflows/deploy.yml` (lines 110-119)
- **Problem:** JWT_SECRET, STRIPE_SECRET_KEY etc. passed as plain env vars (visible in GCP logs)
- **Fix:** Store in GCP Secret Manager, use `--set-secrets` flag instead
- **Secrets to migrate:** DATABASE_URL, JWT_SECRET, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, DEEPSEEK_API_KEY
- **Status:** [ ] Not started

#### A6. Add static asset caching headers [CRITICAL]
- **File:** `frontend/next.config.ts`
- **Problem:** No Cache-Control headers — every request hits the server, poor performance
- **Fix:** Add headers in `async headers()`:
  - `/_next/static/*` → `public, max-age=31536000, immutable`
  - `/Img/*` → `public, max-age=2592000` (30 days)
- **Status:** [ ] Not started

#### A7. Improve health check with DB verification [HIGH]
- **File:** `backend/src/app.ts` (line 104-106)
- **Problem:** Health check returns `{ status: "healthy" }` without verifying DB connection
- **Fix:** Add `await prisma.$queryRaw\`SELECT 1\`` — return 503 if DB is down
- **Status:** [ ] Not started

#### A8. Add deployment rollback verification [HIGH]
- **File:** `.github/workflows/deploy.yml`
- **Problem:** If deploy breaks production, manual revert needed (5-10 min downtime)
- **Fix:** After deploy, curl health endpoint — if it fails, auto-rollback to previous revision
- **Status:** [ ] Not started

#### A9. Add Stripe webhook idempotency [HIGH]
- **File:** `backend/src/services/stripeService.ts`
- **Problem:** Retried webhooks can process the same event twice (duplicate charges)
- **Fix:** Track processed event IDs in database, skip if already processed
- **Status:** [ ] Not started

---

### Part B: Move Frontend to Google Cloud Run

#### B1. Fix `next.config.ts` — add standalone output [CRITICAL]
- **File:** `frontend/next.config.ts`
- **Problem:** Dockerfile copies from `.next/standalone` but config doesn't set `output: 'standalone'`
- **Fix:** Add `output: 'standalone'` to nextConfig
- **Status:** [ ] Not started

#### B2. Update GitHub Actions — replace Vercel with Cloud Run [CRITICAL]
- **File:** `.github/workflows/deploy.yml`
- **What:** Replace the Vercel `deploy-frontend` job (lines 125-141) with Cloud Run deployment:
  1. Authenticate to GCP (same as backend job)
  2. Build Docker image with build args (API_URL, SITE_URL, GA_ID)
  3. Push to Artifact Registry (`us-central1-docker.pkg.dev`)
  4. Deploy to Cloud Run: 1Gi RAM, 1 CPU, min:0, max:50, concurrency:100
  5. Set secrets via `--set-secrets`
- **Status:** [ ] Not started

#### B3. Fix backend deploy — migrate to Artifact Registry [HIGH]
- **File:** `.github/workflows/deploy.yml`
- **What:**
  - Change `gcr.io/` → `us-central1-docker.pkg.dev/` (GCR is deprecated by Google)
  - Use `--set-secrets` instead of `--set-env-vars` for sensitive values (from A5)
- **Status:** [ ] Not started

#### B4. Update Cloud Build configs [MEDIUM]
- **Files:** `cloudbuild-backend.yaml`, `cloudbuild-frontend.yaml`
- **What:**
  - Backend: memory 2Gi → 4Gi (match GitHub Actions config)
  - Frontend: add `--concurrency=100`
- **Status:** [ ] Not started

#### B5. DNS cutover from Vercel to Cloud Run [CRITICAL]
- **Steps:**
  1. Lower DNS TTL to 300s (5 min) — do this 24 hours before cutover
  2. Deploy and verify frontend via Cloud Run URL (test all 5 locales)
  3. Map custom domain: `gcloud run domain-mappings create --service=resume-frontend --domain=www.bestairesumes.com`
  4. Update DNS records at registrar (Vercel CNAME → Cloud Run A records)
  5. Wait for SSL certificate provisioning (15-60 min)
  6. Keep Vercel active 24 hours as rollback option
  7. Verify: homepage, builder, PDF download, Stripe, OAuth, all locales
  8. Delete Vercel project after 24 hours of successful operation
- **Status:** [ ] Not started

---

### Part C: Post-Launch Improvements (Week 1-2)

| Task | Priority | Description |
|------|----------|-------------|
| Refresh tokens | HIGH | Users re-login every 30 min. Implement access token (15 min) + refresh token (7 days) |
| Redis rate limiter | HIGH | In-memory Map is per-instance. Use Redis (Memorystore) for cluster-safe rate limiting |
| Structured logging | HIGH | Replace console.log with Winston/Pino + request correlation IDs |
| CORS validation | MEDIUM | Validate CORS_ORIGINS at startup, reject `*` in production |
| Password reset protection | MEDIUM | Add attempt counter + brute force limit (5 attempts per 15 min) |

---

## Files to Modify

| File | Changes |
|------|---------|
| `frontend/next.config.ts` | Add `output: 'standalone'` + caching headers |
| `.github/workflows/deploy.yml` | Remove continue-on-error, replace Vercel → Cloud Run, fix secrets |
| `backend/src/index.ts` | Add SIGTERM handler, import Sentry |
| `backend/src/app.ts` | Improve health check with DB verification |
| `backend/src/lib/sentry.ts.disabled` | Rename to `sentry.ts` |
| `backend/src/services/stripeService.ts` | Add webhook idempotency |
| `cloudbuild-backend.yaml` | Memory 2Gi → 4Gi |
| `cloudbuild-frontend.yaml` | Add concurrency=100 |

---

## Verification Checklist (After Deploy)

- [ ] `docker build` frontend locally — standalone output works
- [ ] Backend tests pass (no more continue-on-error)
- [ ] Frontend loads on Cloud Run — all 5 locales (en, es, fr, de, ar)
- [ ] PDF generation works — Puppeteer with 4Gi RAM
- [ ] Graceful shutdown works — `docker stop` during PDF generation
- [ ] Health check returns 503 when DB is down
- [ ] Stripe webhooks reach backend
- [ ] OAuth callbacks work (Google, GitHub)
- [ ] Sentry receives test error
- [ ] Playwright E2E tests pass against Cloud Run URLs
- [ ] Lighthouse score > 90
- [ ] Static assets have Cache-Control headers

---

## Pre-Deploy Checklist (DO THIS BEFORE PUSHING)

### 1. Store secrets in GCP Secret Manager

Run these commands in Google Cloud Console or `gcloud` CLI:

```bash
# Backend secrets (already have some — add missing ones)
echo -n "YOUR_SENTRY_DSN" | gcloud secrets create SENTRY_DSN --data-file=-

# Frontend secrets
echo -n "YOUR_NEXTAUTH_SECRET" | gcloud secrets create NEXTAUTH_SECRET --data-file=-
echo -n "YOUR_GOOGLE_CLIENT_ID" | gcloud secrets create GOOGLE_CLIENT_ID --data-file=-
echo -n "YOUR_GOOGLE_CLIENT_SECRET" | gcloud secrets create GOOGLE_CLIENT_SECRET --data-file=-
```

Verify existing secrets:
```bash
gcloud secrets list
# Should show: DATABASE_URL, JWT_SECRET, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET,
#              DEEPSEEK_API_KEY, SENTRY_DSN, NEXTAUTH_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
```

Grant Cloud Run access:
```bash
gcloud secrets add-iam-policy-binding NEXTAUTH_SECRET \
  --member="serviceAccount:YOUR_PROJECT_NUMBER-compute@developer.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"
# Repeat for GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, SENTRY_DSN
```

### 2. Add GitHub Secrets

Go to GitHub → Repository → Settings → Secrets and variables → Actions → New repository secret:

| Secret Name | Value | Notes |
|-------------|-------|-------|
| `GCP_PROJECT_ID` | your-project-id | Already exists |
| `GCP_SA_KEY` | service account JSON | Already exists |
| `NEXT_PUBLIC_API_URL` | `https://api.bestairesumes.com` | **NEW** |
| `NEXT_PUBLIC_SITE_URL` | `https://www.bestairesumes.com` | **NEW** |
| `GA_MEASUREMENT_ID` | `G-XXXXXXXXXX` | **NEW** |
| `FRONTEND_URL` | `https://www.bestairesumes.com` | Already exists |
| `STRIPE_PRICE_STARTER` | price_xxx | Already exists |
| `STRIPE_PRICE_GOLD` | price_xxx | Already exists |
| `STRIPE_PRICE_DIAMOND` | price_xxx | Already exists |
| `STRIPE_PRICE_PLATINUM` | price_xxx | Already exists |

Secrets to **remove after migration**:
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

### 3. Create Artifact Registry repository

```bash
gcloud artifacts repositories create resume-builder \
  --repository-format=docker \
  --location=us-central1 \
  --description="AI Resume Builder Docker images"
```

### 4. DNS Cutover (After Successful Deployment)

**24 hours before cutover:**
```bash
# Lower TTL at your domain registrar to 300 seconds (5 min)
```

**During cutover:**
```bash
# Map domains to Cloud Run
gcloud run domain-mappings create \
  --service=resume-frontend \
  --domain=www.bestairesumes.com \
  --region=us-central1

gcloud run domain-mappings create \
  --service=resume-backend \
  --domain=api.bestairesumes.com \
  --region=us-central1

# Google will give you DNS records to add. Example:
# Type  Name   Value
# A     www    216.239.32.21
# AAAA  www    2001:4860:4802:32::15
# A     api    216.239.32.21
```

**After cutover:**
- Wait 15-60 min for SSL certificate provisioning
- Test all pages, PDF generation, Stripe, OAuth
- Keep Vercel active 24 hours as rollback
- Delete Vercel project after 24 hours of success

---

## Deployment Flow (After Implementation)

```
1. You write code locally
2. git add + git commit + git push origin main
3. GitHub Actions triggers automatically (~10-12 min):
   ├─ Run tests (if fail → deployment stops)
   ├─ Build Docker images (frontend + backend)
   ├─ Push to Artifact Registry
   ├─ Deploy to Cloud Run
   └─ Verify health check (if fail → auto-rollback)
4. Website updated live
```
