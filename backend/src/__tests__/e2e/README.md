# Stripe Sandbox E2E Tests

## Prerequisites

1. **Stripe Account with Test Mode Access**
   - Go to [Stripe Dashboard](https://dashboard.stripe.com)
   - Switch to **Test Mode** (toggle in the bottom left)

2. **Get Your Test API Keys**
   - Navigate to: Developers → API keys
   - Copy your **Secret key** (starts with `sk_test_`)

3. **Create Products and Prices**
   - Go to: Products → Create product
   - Create 4 products: Starter, Gold, Diamond, Platinum
   - For each, create a recurring price (monthly)
   - Copy each price ID (starts with `price_`)

## Setup

1. Copy the example environment file:
   ```bash
   cp .env.test.example .env.test
   ```

2. Fill in your Stripe test keys:
   ```bash
   STRIPE_SECRET_KEY=sk_test_xxxxx
   STRIPE_PRICE_STARTER=price_xxxxx
   STRIPE_PRICE_GOLD=price_xxxxx
   STRIPE_PRICE_DIAMOND=price_xxxxx
   STRIPE_PRICE_PLATINUM=price_xxxxx
   ```

3. (Optional) Set up webhook testing with Stripe CLI:
   ```bash
   # Install Stripe CLI
   brew install stripe/stripe-cli/stripe

   # Login to Stripe
   stripe login

   # Forward webhooks to local server
   stripe listen --forward-to localhost:4444/api/v1/payments/webhook
   ```

## Running Tests

```bash
# From backend directory
npm run test:e2e:stripe

# Or run directly
npx jest --testPathPattern="e2e/stripe-sandbox" --runInBand
```

## Test Cards

| Scenario | Card Number | CVC | Exp |
|----------|-------------|-----|-----|
| ✅ Success | 4242 4242 4242 4242 | 123 | 12/34 |
| ❌ Declined | 4000 0000 0000 0002 | 123 | 12/34 |
| 💸 Insufficient Funds | 4000 0000 0000 9995 | 123 | 12/34 |
| 🔐 3D Secure | 4000 0025 0000 3155 | 123 | 12/34 |
| ⏰ Expired | 4000 0000 0000 0069 | 123 | 12/34 |
| 🔢 Incorrect CVC | 4000 0000 0000 0127 | 123 | 12/34 |
| ⚠️ Processing Error | 4000 0000 0000 0119 | 123 | 12/34 |

## Manual Testing Flow

1. Start the backend: `npm run dev`
2. Start the frontend: `cd ../frontend && npm run dev`
3. Go to http://localhost:4455/en/pricing
4. Click "Get Started" on any plan
5. Use test card `4242 4242 4242 4242` to complete payment
6. Verify redirect to success page
7. Check user subscription status is updated

## What These Tests Verify

- ✅ Stripe API connection works
- ✅ Checkout session creation for all plans
- ✅ Customer creation and retrieval
- ✅ Price IDs are valid and active
- ✅ Subscription status endpoint returns correct data
- ✅ Webhook signature verification rejects invalid requests

## Troubleshooting

### "Stripe is not configured"
- Ensure `STRIPE_SECRET_KEY` starts with `sk_test_`
- Check the key is in your `.env` file

### "Price not found"
- Create products/prices in Stripe Dashboard (Test Mode)
- Copy the price IDs to your `.env`

### Webhook tests failing
- Run `stripe listen --forward-to localhost:4444/api/v1/payments/webhook`
- Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET`
