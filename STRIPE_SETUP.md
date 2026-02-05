# Stripe Payment Integration Setup

## Required Configuration

To implement Stripe payments, you need the following:

| Item | Where to Get | Purpose |
|------|-------------|---------|
| **Secret API Key** | Stripe Dashboard → Developers → API keys | Backend API calls |
| **Webhook Secret** | Stripe Dashboard → Developers → Webhooks | Verify webhook signatures |
| **Price IDs** | Stripe Dashboard → Products → Create prices | Identify each plan |

---

## Setup Steps

### 1. Create Products & Prices in Stripe Dashboard

Go to **Stripe Dashboard → Products** and create:

```
Product: Starter Plan
  └─ Price: $3/month (recurring) → Copy price ID: price_xxxSTARTER

Product: Gold Plan
  └─ Price: $6/month (recurring) → Copy price ID: price_xxxGOLD

Product: Diamond Plan
  └─ Price: $10/month (recurring) → Copy price ID: price_xxxDIAMOND

Product: Platinum Plan
  └─ Price: $30/month (recurring) → Copy price ID: price_xxxPLATINUM
```

### 2. Add to Backend `.env`

```env
# Stripe Keys
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxx

# Price IDs (from step 1)
STRIPE_PRICE_STARTER=price_xxxxxxxxxxxx
STRIPE_PRICE_GOLD=price_xxxxxxxxxxxx
STRIPE_PRICE_DIAMOND=price_xxxxxxxxxxxx
STRIPE_PRICE_PLATINUM=price_xxxxxxxxxxxx

FRONTEND_URL=http://localhost:4455
```

### 3. Create Webhook Endpoint

In **Stripe Dashboard → Developers → Webhooks**, add endpoint:

- **URL**: `https://yourdomain.com/api/payments/webhook`
- **Events to listen**:
  - `checkout.session.completed`
  - `customer.subscription.created`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
  - `invoice.paid`
  - `invoice.payment_failed`

### 4. For Local Testing

Use Stripe CLI to forward webhooks locally:

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login to your Stripe account
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:5000/api/payments/webhook
```

This gives you a temporary webhook secret (`whsec_...`) for local testing.

---

## Environment Summary

| What You Need | Test Mode | Production |
|--------------|-----------|------------|
| API Key | `sk_test_...` | `sk_live_...` |
| Webhook Secret | From CLI or Dashboard | From Dashboard |
| Price IDs | Create in test mode | Create in live mode |
| Webhook URL | `localhost` via CLI | Your real domain |

---

## Current Plan Configuration

| Plan | Price | CV Creations | AI Generations | Free Trial |
|------|-------|--------------|----------------|------------|
| Starter | $3/month | 30/month | 3/month | **NO** - charges immediately |
| Gold | $6/month | 150/month | 10/month | **YES** - 7 days |
| Diamond | $10/month | 300/month | 30/month | **YES** - 7 days |
| Platinum | $30/month | Unlimited | 100/month | **NO** - charges immediately |

**All plans include:**
- No ads
- All 50+ templates

**Trial available on:**
- Gold & Diamond only (7-day free trial, card required)

---

## Test Cards

Use these test card numbers in Stripe test mode:

| Card | Number | Use Case |
|------|--------|----------|
| Visa | `4242 4242 4242 4242` | Successful payment |
| Visa (Decline) | `4000 0000 0000 0002` | Card declined |
| 3D Secure | `4000 0027 6000 3184` | Requires authentication |

- **Expiry**: Any future date (e.g., 12/34)
- **CVC**: Any 3 digits (e.g., 123)
- **ZIP**: Any 5 digits (e.g., 12345)

---

## Files Reference

Backend files configured for Stripe:
- `backend/src/config/env.ts` - Environment variables
- `backend/src/services/stripeService.ts` - Stripe integration logic
- `backend/prisma/schema.prisma` - User subscription fields
