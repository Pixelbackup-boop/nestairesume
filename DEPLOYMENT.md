# AI Resume Builder - Deployment Guide

## Overview

This guide covers deploying the AI Resume Builder application:
- **Frontend**: Next.js → Vercel
- **Backend**: Express.js → Railway/Google Cloud Run
- **Database**: PostgreSQL → Railway/Cloud SQL

---

## Prerequisites

- [ ] All tests passing (`npm test` in backend)
- [ ] PostgreSQL schema ready (`schema.postgresql.prisma`)
- [ ] Production environment variables prepared
- [ ] Stripe production keys and webhook endpoint
- [ ] Domain configured (DNS)

---

## Backend Deployment (Railway)

### 1. Create Railway Project

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Create new project
railway init
```

### 2. Add PostgreSQL

```bash
# Add PostgreSQL plugin
railway add --plugin postgresql

# Get connection string
railway variables
```

### 3. Set Environment Variables

In Railway Dashboard → Variables:

```env
NODE_ENV=production
DATABASE_URL=<from railway>
JWT_SECRET=<generate: openssl rand -base64 64>
CORS_ORIGINS=https://yourdomain.com
FRONTEND_URL=https://yourdomain.com
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
STRIPE_PRICE_STARTER=price_xxx
STRIPE_PRICE_GOLD=price_xxx
STRIPE_PRICE_DIAMOND=price_xxx
STRIPE_PRICE_PLATINUM=price_xxx
OPENAI_API_KEY=sk-xxx
BREVO_API_KEY=xkeysib-xxx
EMAIL_FROM_ADDRESS=noreply@yourdomain.com
```

### 4. Deploy

```bash
# Deploy from backend directory
cd backend
railway up
```

### 5. Run Migrations

```bash
# Connect to Railway and run migrations
railway run npx prisma migrate deploy
```

### 6. Set Up Stripe Webhook

1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://your-railway-url.railway.app/api/v1/webhooks/stripe`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
4. Copy webhook secret to `STRIPE_WEBHOOK_SECRET`

---

## Frontend Deployment (Vercel)

### 1. Connect Repository

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Select the `frontend` directory as root

### 2. Environment Variables

```env
NEXT_PUBLIC_API_URL=https://your-railway-url.railway.app
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=<generate: openssl rand -base64 32>
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx
```

### 3. Deploy

Vercel auto-deploys on git push to main.

---

## Docker Deployment (Alternative)

### Build and Push

```bash
# Build image
docker build -t your-registry/resume-backend:latest ./backend

# Push to registry
docker push your-registry/resume-backend:latest
```

### Google Cloud Run

```bash
# Deploy to Cloud Run
gcloud run deploy resume-backend \
  --image your-registry/resume-backend:latest \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars "NODE_ENV=production" \
  --memory 1Gi \
  --cpu 1
```

---

## Post-Deployment Checklist

- [ ] Health check: `curl https://your-api-url/health`
- [ ] Test registration flow
- [ ] Test login (email + OAuth)
- [ ] Test Stripe checkout (use test card: 4242 4242 4242 4242)
- [ ] Test PDF generation
- [ ] Test AI features
- [ ] Verify webhook receives events (Stripe Dashboard)
- [ ] Set up monitoring (Sentry DSN)
- [ ] Configure custom domain SSL

---

## Monitoring

### Logs

```bash
# Railway
railway logs

# Cloud Run
gcloud logging read "resource.type=cloud_run_revision"
```

### Sentry Setup

1. Create project at sentry.io
2. Add `SENTRY_DSN` to environment variables
3. Errors will auto-report

---

## Rollback

```bash
# Railway - redeploy previous commit
railway up --commit <previous-sha>

# Vercel - instant rollback in dashboard
# Settings → Deployments → ... → Rollback
```

---

## Database Migrations

Always backup before migrations:

```bash
# Backup
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql

# Apply migrations
npx prisma migrate deploy
```

---

## Cost Estimates

| Service | Free Tier | Production |
|---------|-----------|------------|
| Railway | $5/month credit | ~$10-20/month |
| Vercel | Free for hobby | $20/month Pro |
| PostgreSQL | 500MB free | $5-10/month |
| Stripe | 2.9% + $0.30/txn | Same |
| OpenAI | Pay as you go | ~$0.002/request |
