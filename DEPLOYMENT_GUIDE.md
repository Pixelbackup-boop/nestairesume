# Production Deployment Guide

Complete step-by-step instructions to deploy AI Resume Builder to production.

---

## Overview

```
Local Machine → GitHub → Tests Pass → Deploy to:
                                      ├── Vercel (Frontend)
                                      └── Cloud Run (Backend)
```

---

## Phase 1: Pre-Deployment Checklist

### 1.1 Run Tests Locally

```bash
# Frontend E2E tests
cd frontend
npx playwright test

# Verify all 103 tests pass
```

### 1.2 Check Environment Variables

Create these files if not exists:

**Backend: `backend/.env.production`**
```env
NODE_ENV=production
PORT=8080

# Database (Cloud SQL)
DATABASE_URL="postgresql://USER:PASSWORD@/DATABASE?host=/cloudsql/PROJECT:REGION:INSTANCE"

# Or use connection string for external DB
# DATABASE_URL="postgresql://user:pass@host:5432/dbname?sslmode=require"

# JWT
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
JWT_EXPIRES_IN=7d

# Stripe
STRIPE_SECRET_KEY=sk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
STRIPE_PRICE_STARTER=price_xxxxx
STRIPE_PRICE_GOLD=price_xxxxx
STRIPE_PRICE_DIAMOND=price_xxxxx
STRIPE_PRICE_PLATINUM=price_xxxxx

# DeepSeek AI for AI features
DEEPSEEK_API_KEY=sk-xxxxx

# Frontend URL (for CORS)
FRONTEND_URL=https://your-domain.com

# Google OAuth
GOOGLE_CLIENT_ID=xxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxxxx
```

**Frontend: Vercel Environment Variables**
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.run.app
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
NEXT_PUBLIC_GOOGLE_CLIENT_ID=xxxxx.apps.googleusercontent.com
```

---

## Phase 2: Google Cloud Setup

### 2.1 Create GCP Project

```bash
# Install gcloud CLI if not installed
# https://cloud.google.com/sdk/docs/install

# Login
gcloud auth login

# Create project (or use existing)
gcloud projects create ai-resume-builder --name="AI Resume Builder"

# Set project
gcloud config set project ai-resume-builder

# Enable required APIs
gcloud services enable \
  cloudbuild.googleapis.com \
  run.googleapis.com \
  containerregistry.googleapis.com \
  sqladmin.googleapis.com \
  secretmanager.googleapis.com
```

### 2.2 Create Cloud SQL Database (PostgreSQL)

```bash
# Create instance
gcloud sql instances create resume-db \
  --database-version=POSTGRES_15 \
  --tier=db-f1-micro \
  --region=us-central1

# Set root password
gcloud sql users set-password postgres \
  --instance=resume-db \
  --password=YOUR_DB_PASSWORD

# Create database
gcloud sql databases create resume_production --instance=resume-db

# Get connection name (save this!)
gcloud sql instances describe resume-db --format="value(connectionName)"
# Output: ai-resume-builder:us-central1:resume-db
```

### 2.3 Create Service Account for GitHub Actions

```bash
PROJECT_ID=$(gcloud config get-value project)

# Create service account
gcloud iam service-accounts create github-deploy \
  --display-name="GitHub Deploy"

# Grant permissions
for ROLE in roles/run.admin roles/storage.admin roles/iam.serviceAccountUser roles/cloudsql.client; do
  gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:github-deploy@${PROJECT_ID}.iam.gserviceaccount.com" \
    --role="$ROLE"
done

# Create and download key
gcloud iam service-accounts keys create gcp-key.json \
  --iam-account=github-deploy@${PROJECT_ID}.iam.gserviceaccount.com

# IMPORTANT: Copy content of gcp-key.json - you'll need it for GitHub secrets
cat gcp-key.json
```

---

## Phase 3: Vercel Setup

### 3.1 Install Vercel CLI & Link Project

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link frontend project
cd frontend
vercel link

# This creates .vercel/project.json with orgId and projectId
cat .vercel/project.json
```

### 3.2 Get Vercel Token

1. Go to: https://vercel.com/account/tokens
2. Create new token: "GitHub Deploy"
3. Copy the token

### 3.3 Configure Vercel Environment Variables

```bash
# Set production environment variables
vercel env add NEXT_PUBLIC_API_URL production
# Enter: https://resume-backend-xxxxx.run.app (you'll get this after Cloud Run deploy)

vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY production
# Enter: pk_live_xxxxx

vercel env add NEXT_PUBLIC_GOOGLE_CLIENT_ID production
# Enter: xxxxx.apps.googleusercontent.com
```

---

## Phase 4: GitHub Secrets Configuration

### 4.1 GitHub Secrets Checklist

**Before first deployment, ensure ALL secrets below are configured in GitHub:**

Go to: **GitHub → Your Repo → Settings → Secrets and variables → Actions → New repository secret**

#### Required Secrets Checklist

```
[ ] GCP_PROJECT_ID        - Your GCP project ID (e.g., ai-resume-builder)
[ ] GCP_SA_KEY            - Entire content of gcp-key.json (service account key)
[ ] VERCEL_TOKEN          - Token from Vercel dashboard
[ ] VERCEL_ORG_ID         - From .vercel/project.json → orgId
[ ] VERCEL_PROJECT_ID     - From .vercel/project.json → projectId
[ ] DATABASE_URL          - PostgreSQL connection string for Cloud SQL
[ ] JWT_SECRET            - Strong secret for JWT signing (min 32 chars)
[ ] STRIPE_SECRET_KEY     - Stripe secret key (sk_live_...)
[ ] STRIPE_WEBHOOK_SECRET - Stripe webhook signing secret (whsec_...)
[ ] STRIPE_PRICE_STARTER  - Stripe price ID for Starter plan
[ ] STRIPE_PRICE_GOLD     - Stripe price ID for Gold plan
[ ] STRIPE_PRICE_DIAMOND  - Stripe price ID for Diamond plan
[ ] STRIPE_PRICE_PLATINUM - Stripe price ID for Platinum plan
[ ] DEEPSEEK_API_KEY      - DeepSeek API key for AI features
[ ] FRONTEND_URL          - Your frontend URL (e.g., https://yourdomain.com)
```

### 4.2 Infrastructure Secrets (GCP + Vercel)

| Secret Name | Value |
|-------------|-------|
| `GCP_PROJECT_ID` | Your GCP project ID (e.g., `ai-resume-builder`) |
| `GCP_SA_KEY` | Entire content of `gcp-key.json` |
| `VERCEL_TOKEN` | Token from Vercel dashboard |
| `VERCEL_ORG_ID` | From `.vercel/project.json` → `orgId` |
| `VERCEL_PROJECT_ID` | From `.vercel/project.json` → `projectId` |

### 4.3 Backend Environment Secrets (Cloud Run)

| Secret Name | Value |
|-------------|-------|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Your JWT secret |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret |
| `STRIPE_PRICE_STARTER` | Stripe price ID for Starter plan |
| `STRIPE_PRICE_GOLD` | Stripe price ID for Gold plan |
| `STRIPE_PRICE_DIAMOND` | Stripe price ID for Diamond plan |
| `STRIPE_PRICE_PLATINUM` | Stripe price ID for Platinum plan |
| `DEEPSEEK_API_KEY` | DeepSeek API key for AI features |
| `FRONTEND_URL` | Your frontend URL (e.g., https://yourdomain.com) |

---

## Phase 5: First Deployment

### 5.1 Commit and Push

```bash
cd /Users/elw/Documents/Test/AI/AI-Resume-Builder

# Check status
git status

# Add all changes
git add .

# Commit
git commit -m "Add GitHub Actions deployment workflow"

# Push to GitHub
git push origin main
```

### 5.2 Monitor Deployment

1. Go to: **GitHub → Your Repo → Actions**
2. Watch the workflow run
3. Check each step:
   - ✅ Tests pass
   - ✅ Backend deploys to Cloud Run
   - ✅ Frontend deploys to Vercel

### 5.3 Get Cloud Run URL

After first backend deployment:

```bash
gcloud run services describe resume-backend --region=us-central1 --format="value(status.url)"
# Output: https://resume-backend-xxxxx-uc.a.run.app
```

### 5.4 Update Frontend with Backend URL

```bash
# Update Vercel environment variable with actual Cloud Run URL
vercel env rm NEXT_PUBLIC_API_URL production
vercel env add NEXT_PUBLIC_API_URL production
# Enter the Cloud Run URL

# Trigger redeploy
cd frontend
vercel --prod
```

---

## Phase 6: Database Migration

### 6.1 Run Prisma Migrations

```bash
# Connect to Cloud SQL via proxy (for migrations)
# Download: https://cloud.google.com/sql/docs/postgres/sql-proxy

# Start proxy
./cloud-sql-proxy ai-resume-builder:us-central1:resume-db &

# Run migrations
cd backend
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/resume_production" npx prisma migrate deploy
```

Or add migration to Cloud Run startup:

```dockerfile
# In backend/Dockerfile, add:
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/index.js"]
```

---

## Phase 7: Configure Stripe Webhooks

### 7.1 Create Webhook Endpoint

1. Go to: https://dashboard.stripe.com/webhooks
2. Click "Add endpoint"
3. URL: `https://your-backend-url.run.app/api/payments/webhook`
4. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.paid`
   - `invoice.payment_failed`
5. Copy the webhook signing secret
6. Add to Cloud Run environment variables

---

## Phase 8: Domain Setup (Optional)

### 8.1 Frontend Domain (Vercel)

1. Go to: Vercel Dashboard → Project → Settings → Domains
2. Add your domain: `resumebuilder.com`
3. Update DNS records as instructed

### 8.2 Backend Domain (Cloud Run)

```bash
# Map custom domain
gcloud run domain-mappings create \
  --service=resume-backend \
  --domain=api.resumebuilder.com \
  --region=us-central1
```

---

## Phase 9: Post-Deployment Verification

### 9.1 Checklist

Run through this checklist:

- [ ] Frontend loads at Vercel URL
- [ ] Backend health check: `curl https://your-backend.run.app/health`
- [ ] User registration works
- [ ] User login works
- [ ] Google OAuth works
- [ ] Resume builder loads
- [ ] AI generation works
- [ ] Stripe checkout works (use test card 4242...)
- [ ] PDF download works
- [ ] Email verification works

### 9.2 Monitor Logs

```bash
# View Cloud Run logs
gcloud run logs read --service=resume-backend --region=us-central1

# Stream logs
gcloud run logs tail --service=resume-backend --region=us-central1
```

---

## Quick Reference

### Update Workflow

```bash
# 1. Make changes locally with Claude Code
claude

# 2. Test locally
cd frontend && npx playwright test

# 3. Commit and push
git add .
git commit -m "Your message"
git push origin main

# 4. GitHub Actions automatically:
#    - Runs tests
#    - If pass → deploys to Cloud Run + Vercel
```

### Rollback

```bash
# List Cloud Run revisions
gcloud run revisions list --service=resume-backend --region=us-central1

# Rollback to previous revision
gcloud run services update-traffic resume-backend \
  --to-revisions=resume-backend-00001-abc=100 \
  --region=us-central1
```

### Emergency Fix

```bash
# If you need to deploy without tests (NOT RECOMMENDED)
# Go to GitHub Actions → Re-run only deploy jobs
```

---

## Troubleshooting

### Cloud Run won't start

```bash
# Check logs
gcloud run logs read --service=resume-backend --region=us-central1 --limit=50

# Common issues:
# - Missing environment variables
# - Database connection failed
# - Port not set to 8080
```

### Database connection failed

```bash
# Verify Cloud SQL connection name
gcloud sql instances describe resume-db --format="value(connectionName)"

# Ensure Cloud Run has Cloud SQL Client role
# DATABASE_URL format: postgresql://USER:PASS@/DB?host=/cloudsql/CONNECTION_NAME
```

### Vercel deployment failed

```bash
# Check build logs in Vercel dashboard
# Common issues:
# - Missing environment variables
# - Build errors (run npm run build locally first)
```

---

## Cost Estimate (Monthly)

| Service | Estimated Cost |
|---------|---------------|
| Cloud Run (low traffic) | $0-10 |
| Cloud SQL (db-f1-micro) | ~$10 |
| Vercel (Hobby/Pro) | $0-20 |
| Stripe | 2.9% + $0.30 per transaction |
| **Total** | ~$10-40/month + Stripe fees |

---

## Next Steps After Deployment

1. Set up monitoring (Google Cloud Monitoring, Vercel Analytics)
2. Configure alerts for errors
3. Set up backup schedule for database
4. Add rate limiting if not already
5. Configure CDN for static assets
6. Set up staging environment
