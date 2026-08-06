/**
 * Stripe payments service for the /api/v1/payments and /api/v1/webhooks routes
 * running on Cloudflare Workers.
 *
 * Ported from backend/src/services/stripeService.ts so the Next.js routes stay
 * behaviorally equivalent while the Express backend is retired.
 *
 * Differences from the backend forced by the platform:
 * - The Stripe client is created per request with the fetch HTTP client
 *   (Workers has no Node sockets) instead of once at module load.
 * - Plan price IDs come from the STRIPE_PRICE_* Worker vars (wrangler.jsonc);
 *   plan limits are shared with lib/server/subscriptionLimits.ts.
 * - The frontend URL for redirect targets is resolved per request (the Worker
 *   serves the app and the API from the same deployment).
 */
import Stripe from 'stripe';
import type { PrismaClient } from '@/lib/generated/prisma/client';
import { getEnv } from './db';
import type { PlanType } from './subscriptionLimits';

export type { PlanType };

export const PAID_PLANS = ['starter', 'gold', 'diamond', 'platinum'] as const;
export type PaidPlanType = (typeof PAID_PLANS)[number];

/** Mirrors the `name` field of the backend PLANS map */
const PLAN_DISPLAY_NAMES: Record<PlanType, string> = {
  free: 'Free',
  starter: 'Starter',
  gold: 'Gold',
  diamond: 'Diamond',
  platinum: 'Platinum',
};

// ==================== Environment ====================

type StripeEnvKey =
  | 'STRIPE_SECRET_KEY'
  | 'STRIPE_WEBHOOK_SECRET'
  | 'FRONTEND_URL'
  | 'STRIPE_PRICE_STARTER'
  | 'STRIPE_PRICE_GOLD'
  | 'STRIPE_PRICE_DIAMOND'
  | 'STRIPE_PRICE_PLATINUM'
  | 'STRIPE_PRICE_STARTER_ANNUAL'
  | 'STRIPE_PRICE_GOLD_ANNUAL'
  | 'STRIPE_PRICE_DIAMOND_ANNUAL'
  | 'STRIPE_PRICE_PLATINUM_ANNUAL';

function envVar(key: StripeEnvKey): string | undefined {
  let value: string | undefined;
  try {
    value = getEnv()[key];
  } catch {
    // Not running inside a Cloudflare request context (e.g. plain `next dev`)
  }
  return value || process.env[key] || undefined;
}

const PRICE_ENV_KEYS: Record<PaidPlanType, { monthly: StripeEnvKey; annual: StripeEnvKey }> = {
  starter: { monthly: 'STRIPE_PRICE_STARTER', annual: 'STRIPE_PRICE_STARTER_ANNUAL' },
  gold: { monthly: 'STRIPE_PRICE_GOLD', annual: 'STRIPE_PRICE_GOLD_ANNUAL' },
  diamond: { monthly: 'STRIPE_PRICE_DIAMOND', annual: 'STRIPE_PRICE_DIAMOND_ANNUAL' },
  platinum: { monthly: 'STRIPE_PRICE_PLATINUM', annual: 'STRIPE_PRICE_PLATINUM_ANNUAL' },
};

/** Empty string when the plan is free or the env var is missing — mirrors backend config.stripePrices */
export function getPriceId(plan: PlanType, annual = false): string {
  if (plan === 'free') return '';
  const keys = PRICE_ENV_KEYS[plan];
  return envVar(annual ? keys.annual : keys.monthly) || '';
}

/**
 * Per-request Stripe client. Workers requires the fetch HTTP client; the API
 * version is left unpinned (account default), matching the backend.
 */
export function getStripe(): Stripe {
  const secretKey = envVar('STRIPE_SECRET_KEY');
  if (!secretKey) throw new Error('Stripe is not configured');
  return new Stripe(secretKey, {
    httpClient: Stripe.createFetchHttpClient(),
    maxNetworkRetries: 2,
  });
}

export function getWebhookSecret(): string {
  const secret = envVar('STRIPE_WEBHOOK_SECRET');
  if (!secret) throw new Error('Stripe webhook secret is not configured');
  return secret;
}

// Keep in sync with ALLOWED_ORIGINS in lib/server/apiUtils.ts
const ALLOWED_FRONTEND_ORIGINS: readonly string[] = [
  'https://bestairesumes.com',
  'https://www.bestairesumes.com',
  'http://localhost:4455',
];

/**
 * Backend equivalent of config.frontendUrl (FRONTEND_URL || localhost). Prefers
 * an explicit FRONTEND_URL var, then the calling page's (allowlisted) origin,
 * then the request URL origin — the Worker serves app and API from one domain.
 */
export function resolveFrontendUrl(request: Request): string {
  const configured = envVar('FRONTEND_URL');
  if (configured) return configured;

  const origin = request.headers.get('origin');
  if (origin && ALLOWED_FRONTEND_ORIGINS.includes(origin)) return origin;

  return new URL(request.url).origin;
}

// ==================== Checkout & Portal ====================

/** Create or get Stripe customer — mirrors backend getOrCreateCustomer() */
export async function getOrCreateCustomer(
  stripe: Stripe,
  db: PrismaClient,
  userId: string,
  email: string,
  name: string
): Promise<string> {
  const user = await db.user.findUnique({ where: { id: userId } });

  if (user?.stripeCustomerId) {
    return user.stripeCustomerId;
  }

  const customer = await stripe.customers.create({
    email,
    name,
    metadata: { userId },
  });

  await db.user.update({
    where: { id: userId },
    data: { stripeCustomerId: customer.id },
  });

  return customer.id;
}

export interface CheckoutOptions {
  userId: string;
  email: string;
  name: string;
  plan: PaidPlanType;
  /** Maps to the STRIPE_PRICE_*_ANNUAL price IDs; current frontend callers only send monthly */
  annual: boolean;
  frontendUrl: string;
}

/** Mirrors backend createCheckoutSession() — returns the Stripe-hosted checkout URL */
export async function createCheckoutSession(
  stripe: Stripe,
  db: PrismaClient,
  options: CheckoutOptions
): Promise<string> {
  const { userId, email, name, plan, annual, frontendUrl } = options;

  const priceId = getPriceId(plan, annual);
  if (!priceId) {
    throw new Error(`Invalid plan: ${plan}`);
  }

  const customerId = await getOrCreateCustomer(stripe, db, userId, email, name);

  // Cancel existing subscription to prevent double-charging
  const user = await db.user.findUnique({ where: { id: userId } });
  if (user?.subscriptionId) {
    try {
      await stripe.subscriptions.cancel(user.subscriptionId);
    } catch (err) {
      // Old sub may already be cancelled — safe to ignore
      console.warn('Could not cancel old subscription', err);
    }
  }

  const session = await stripe.checkout.sessions.create(
    {
      customer: customerId,
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${frontendUrl}/checkout/success?plan=${plan}`,
      cancel_url: `${frontendUrl}/checkout?plan=${plan}&payment=cancelled`,
      metadata: {
        userId,
        plan,
      },
    },
    {
      idempotencyKey: `checkout_${userId}_${plan}_${Date.now()}`,
    }
  );

  if (!session.url) {
    throw new Error('Failed to create checkout session');
  }

  return session.url;
}

/** Mirrors backend createPortalSession() — returnUrl already includes the default fallback */
export async function createPortalSession(
  stripe: Stripe,
  db: PrismaClient,
  userId: string,
  returnUrl: string
): Promise<string> {
  const user = await db.user.findUnique({ where: { id: userId } });

  if (!user?.stripeCustomerId) {
    throw new Error('No Stripe customer found');
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: returnUrl,
  });

  return session.url;
}

// ==================== Billing details ====================

function planFromPriceId(priceId: string | undefined): PlanType | null {
  if (!priceId) return null;
  for (const plan of PAID_PLANS) {
    if (getPriceId(plan) === priceId || getPriceId(plan, true) === priceId) return plan;
  }
  return null;
}

/** Mirrors backend getSubscriptionDetails() — the `subscription` half of GET /payments/billing */
export async function getSubscriptionDetails(stripe: Stripe, db: PrismaClient, userId: string) {
  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user?.subscriptionId || !user?.stripeCustomerId) {
    return null;
  }

  const subscription = await stripe.subscriptions.retrieve(user.subscriptionId, {
    expand: ['default_payment_method', 'latest_invoice'],
  });

  const paymentMethod = subscription.default_payment_method as Stripe.PaymentMethod | null;
  const firstItem = subscription.items.data[0];

  const planName = planFromPriceId(firstItem?.price?.id) ?? user.subscriptionTier ?? 'unknown';

  // In Stripe v20, current_period_end is on the subscription item, not subscription
  const periodEnd = firstItem?.current_period_end ?? 0;

  return {
    plan: planName,
    planDisplayName: PLAN_DISPLAY_NAMES[planName as PlanType] || planName,
    status: subscription.status,
    currentPeriodEnd: periodEnd,
    cancelAtPeriodEnd: subscription.cancel_at_period_end,
    cancelAt: subscription.cancel_at,
    paymentMethod: paymentMethod?.card
      ? {
          brand: paymentMethod.card.brand,
          last4: paymentMethod.card.last4,
          expMonth: paymentMethod.card.exp_month,
          expYear: paymentMethod.card.exp_year,
        }
      : null,
  };
}

/** Mirrors backend getUserInvoices() — the `invoices` half of GET /payments/billing */
export async function getUserInvoices(stripe: Stripe, db: PrismaClient, userId: string, limit = 24) {
  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user?.stripeCustomerId) {
    return [];
  }

  const invoices = await stripe.invoices.list({
    customer: user.stripeCustomerId,
    limit,
  });

  return invoices.data.map((invoice) => ({
    id: invoice.id,
    number: invoice.number,
    date: invoice.created,
    amount: invoice.amount_paid,
    currency: invoice.currency,
    status: invoice.status,
    pdfUrl: invoice.invoice_pdf,
    hostedUrl: invoice.hosted_invoice_url,
    description: invoice.lines.data[0]?.description || 'Subscription',
  }));
}

// ==================== Subscription lifecycle ====================

/** Mirrors backend cancelSubscription() — at period end (default) or immediately */
export async function cancelSubscription(
  stripe: Stripe,
  db: PrismaClient,
  userId: string,
  immediately = false
): Promise<{ effectiveDate: number }> {
  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user?.subscriptionId) {
    throw new Error('No active subscription found');
  }

  if (immediately) {
    await stripe.subscriptions.cancel(user.subscriptionId);
    return { effectiveDate: Math.floor(Date.now() / 1000) };
  }

  const subscription = await stripe.subscriptions.update(user.subscriptionId, {
    cancel_at_period_end: true,
  });

  const periodEnd = subscription.items.data[0]?.current_period_end ?? Math.floor(Date.now() / 1000);
  return { effectiveDate: periodEnd };
}

/** Mirrors backend reactivateSubscription() — undoes a pending cancellation */
export async function reactivateSubscription(
  stripe: Stripe,
  db: PrismaClient,
  userId: string
): Promise<{ status: string }> {
  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user?.subscriptionId) {
    throw new Error('No active subscription found');
  }

  const subscription = await stripe.subscriptions.update(user.subscriptionId, {
    cancel_at_period_end: false,
  });

  return { status: subscription.status };
}

/** Mirrors backend changeSubscriptionPlan() — swaps the price with proration, updates local tier */
export async function changeSubscriptionPlan(
  stripe: Stripe,
  db: PrismaClient,
  userId: string,
  newPlan: PaidPlanType
): Promise<{ plan: PaidPlanType; status: string }> {
  const priceId = getPriceId(newPlan);
  if (!priceId) {
    throw new Error(`Invalid plan: ${newPlan}`);
  }

  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user?.subscriptionId) {
    throw new Error('No active subscription found');
  }

  const subscription = await stripe.subscriptions.retrieve(user.subscriptionId);
  const itemId = subscription.items.data[0]?.id;
  if (!itemId) {
    throw new Error('No subscription item found');
  }

  const updated = await stripe.subscriptions.update(user.subscriptionId, {
    items: [{ id: itemId, price: priceId }],
    proration_behavior: 'create_prorations',
  });

  await db.user.update({
    where: { id: userId },
    data: { subscriptionTier: newPlan },
  });

  return { plan: newPlan, status: updated.status };
}

/** Mirrors backend getProrationPreview() — amount due (or credit) for a plan change */
export async function getProrationPreview(
  stripe: Stripe,
  db: PrismaClient,
  userId: string,
  newPlan: PaidPlanType
): Promise<{ amount: number; currency: string; isCredit: boolean }> {
  const priceId = getPriceId(newPlan);
  if (!priceId) {
    throw new Error(`Invalid plan: ${newPlan}`);
  }

  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user?.subscriptionId || !user?.stripeCustomerId) {
    throw new Error('No active subscription found');
  }

  const subscription = await stripe.subscriptions.retrieve(user.subscriptionId);
  const itemId = subscription.items.data[0]?.id;
  if (!itemId) {
    throw new Error('No subscription item found');
  }

  const preview = await stripe.invoices.createPreview({
    customer: user.stripeCustomerId,
    subscription: user.subscriptionId,
    subscription_details: {
      items: [{ id: itemId, price: priceId }],
      proration_behavior: 'create_prorations',
    },
  });

  return {
    amount: preview.amount_due,
    currency: preview.currency,
    isCredit: preview.amount_due < 0,
  };
}

// ==================== Webhook handlers ====================

/** Unexpanded webhook fields arrive as ID strings, but tolerate expanded objects too */
function stripeIdField(value: unknown): string | null {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object' && 'id' in value) {
    const id = (value as { id?: unknown }).id;
    return typeof id === 'string' ? id : null;
  }
  return null;
}

/**
 * Newer Stripe API versions moved invoice.subscription under invoice.parent —
 * the webhook payload shape follows the account's API version, so read both.
 */
function invoiceSubscriptionId(invoice: Stripe.Invoice): string | null {
  const legacy = stripeIdField((invoice as unknown as { subscription?: unknown }).subscription);
  if (legacy) return legacy;

  const parent = (invoice as unknown as {
    parent?: { subscription_details?: { subscription?: unknown } | null } | null;
  }).parent;
  return stripeIdField(parent?.subscription_details?.subscription);
}

function invoicePaymentIntentId(invoice: Stripe.Invoice): string | null {
  return stripeIdField((invoice as unknown as { payment_intent?: unknown }).payment_intent);
}

/**
 * Insert a Payment row unless one already exists for this stripePaymentId.
 * Stripe retries webhooks and Worker isolates don't share the in-memory event
 * dedupe, so the unique column is the durable idempotency guard.
 */
async function createPaymentIfNew(
  db: PrismaClient,
  data: {
    userId: string;
    stripePaymentId: string;
    amount: number;
    currency: string;
    status: string;
    type: string;
    plan: string | null;
  }
): Promise<void> {
  const existing = await db.payment.findUnique({
    where: { stripePaymentId: data.stripePaymentId },
    select: { id: true },
  });
  if (existing) return;

  await db.payment.create({ data });
}

/** Mirrors backend handleWebhookEvent() — same events, same DB effects */
export async function handleWebhookEvent(db: PrismaClient, event: Stripe.Event): Promise<void> {
  switch (event.type) {
    case 'checkout.session.completed': {
      await handleCheckoutComplete(db, event.data.object as Stripe.Checkout.Session);
      break;
    }
    case 'customer.subscription.created':
    case 'customer.subscription.updated': {
      await handleSubscriptionChange(db, event.data.object as Stripe.Subscription);
      break;
    }
    case 'customer.subscription.deleted': {
      await handleSubscriptionDeleted(db, event.data.object as Stripe.Subscription);
      break;
    }
    case 'invoice.paid': {
      await handleInvoicePaid(db, event.data.object as Stripe.Invoice);
      break;
    }
    case 'invoice.payment_failed': {
      await handlePaymentFailed(db, event.data.object as Stripe.Invoice);
      break;
    }
  }
}

// Handle successful checkout
async function handleCheckoutComplete(db: PrismaClient, session: Stripe.Checkout.Session): Promise<void> {
  const userId = session.metadata?.userId;
  const plan = session.metadata?.plan as PlanType | undefined;

  if (!userId || !plan) return;

  // Create payment record (amount may be 0 for trial start)
  await createPaymentIfNew(db, {
    userId,
    stripePaymentId: (session.payment_intent as string) || (session.subscription as string) || session.id,
    amount: session.amount_total || 0,
    currency: session.currency || 'usd',
    status: 'succeeded',
    type: 'subscription',
    plan,
  });

  // Update user with subscription info
  await db.user.update({
    where: { id: userId },
    data: {
      subscriptionTier: plan,
      subscriptionId: (session.subscription as string) || null,
      subscriptionStatus: 'active',
      // Reset usage counters for new subscription
      cvCreatedCount: 0,
      aiUsedCount: 0,
      aiUsedToday: 0,
      downloadCount: 0,
      coverLetterCount: 0,
      lastAiResetDate: new Date(),
    },
  });
}

// Handle subscription changes
async function handleSubscriptionChange(db: PrismaClient, subscription: Stripe.Subscription): Promise<void> {
  const customerId = subscription.customer as string;

  const user = await db.user.findFirst({
    where: { stripeCustomerId: customerId },
  });

  if (!user) return;

  await db.user.update({
    where: { id: user.id },
    data: {
      subscriptionId: subscription.id,
      subscriptionStatus: subscription.status,
    },
  });
}

// Handle subscription deletion
async function handleSubscriptionDeleted(db: PrismaClient, subscription: Stripe.Subscription): Promise<void> {
  const customerId = subscription.customer as string;

  const user = await db.user.findFirst({
    where: { stripeCustomerId: customerId },
  });

  if (!user) return;

  // When subscription ends, user loses access but keeps account
  await db.user.update({
    where: { id: user.id },
    data: {
      subscriptionTier: 'expired', // No "free" tier - must resubscribe
      subscriptionId: null,
      subscriptionStatus: 'canceled',
    },
  });
}

// Handle successful invoice payment (monthly renewal)
async function handleInvoicePaid(db: PrismaClient, invoice: Stripe.Invoice): Promise<void> {
  const customerId = invoice.customer as string;
  const subscriptionId = invoiceSubscriptionId(invoice);

  const user = await db.user.findFirst({
    where: { stripeCustomerId: customerId },
  });

  if (!user || !subscriptionId) return;

  // Record the payment
  const stripePaymentId = invoicePaymentIntentId(invoice) || invoice.id;
  if (stripePaymentId) {
    await createPaymentIfNew(db, {
      userId: user.id,
      stripePaymentId,
      amount: invoice.amount_paid,
      currency: invoice.currency,
      status: 'succeeded',
      type: 'subscription',
      plan: user.subscriptionTier,
    });
  }

  // Reset monthly counters on successful payment (new billing period)
  await db.user.update({
    where: { id: user.id },
    data: {
      cvCreatedCount: 0,
      aiUsedCount: 0,
      aiUsedToday: 0,
      downloadCount: 0,
      coverLetterCount: 0,
      lastAiResetDate: new Date(),
      subscriptionStatus: 'active',
    },
  });
}

// Handle failed payment
async function handlePaymentFailed(db: PrismaClient, invoice: Stripe.Invoice): Promise<void> {
  const customerId = invoice.customer as string;

  const user = await db.user.findFirst({
    where: { stripeCustomerId: customerId },
  });

  if (!user) return;

  // Backend reported this to Sentry; Workers has no Sentry SDK wired up yet
  console.error(`Payment failed for user ${user.id}`, {
    invoiceId: invoice.id,
    amountDue: invoice.amount_due,
    currency: invoice.currency,
  });

  await db.user.update({
    where: { id: user.id },
    data: { subscriptionStatus: 'past_due' },
  });

  // Record the failed payment
  const stripePaymentId = invoicePaymentIntentId(invoice) || invoice.id;
  if (stripePaymentId) {
    await createPaymentIfNew(db, {
      userId: user.id,
      stripePaymentId,
      amount: invoice.amount_due,
      currency: invoice.currency,
      status: 'failed',
      type: 'subscription',
      plan: user.subscriptionTier,
    });
  }
}
