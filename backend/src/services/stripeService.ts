import Stripe from "stripe";
import { config } from "../config/env";
import prisma from "../config/database";
import logger from "../lib/logger";
import { captureError } from "../lib/sentry";

// Initialize Stripe (will be null if no API key)
const stripe = config.stripeSecretKey
  ? new Stripe(config.stripeSecretKey, { maxNetworkRetries: 2 })
  : null;

export type PlanType = "starter" | "gold" | "diamond" | "platinum";

interface PlanConfig {
  name: string;
  priceId: string;
  type: "subscription";
  cvLimit: number;       // CV creations per month (-1 = unlimited)
  aiLimit: number;       // AI CV generations per month
  downloadLimit: number; // PDF downloads per month (-1 = unlimited)
  coverLetterLimit: number; // Cover letters per month (-1 = unlimited)
}

export const PLANS: Record<PlanType, PlanConfig> = {
  starter: {
    name: "Starter",
    priceId: config.stripePrices.starter,
    type: "subscription",
    cvLimit: 30,
    aiLimit: 50,
    downloadLimit: 3,
    coverLetterLimit: 10,
  },
  gold: {
    name: "Gold",
    priceId: config.stripePrices.gold,
    type: "subscription",
    cvLimit: 150,
    aiLimit: 100,
    downloadLimit: 10,
    coverLetterLimit: 30,
  },
  diamond: {
    name: "Diamond",
    priceId: config.stripePrices.diamond,
    type: "subscription",
    cvLimit: 300,
    aiLimit: 200,
    downloadLimit: 25,
    coverLetterLimit: 50,
  },
  platinum: {
    name: "Platinum",
    priceId: config.stripePrices.platinum,
    type: "subscription",
    cvLimit: -1, // Unlimited
    aiLimit: 500,
    downloadLimit: 120,
    coverLetterLimit: -1, // Unlimited
  },
};

// Create or get Stripe customer
export const getOrCreateCustomer = async (userId: string, email: string, name: string): Promise<string> => {
  if (!stripe) throw new Error("Stripe is not configured");

  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (user?.stripeCustomerId) {
    return user.stripeCustomerId;
  }

  const customer = await stripe.customers.create({
    email,
    name,
    metadata: { userId },
  });

  await prisma.user.update({
    where: { id: userId },
    data: { stripeCustomerId: customer.id },
  });

  return customer.id;
};

// Create checkout session
export const createCheckoutSession = async (
  userId: string,
  email: string,
  name: string,
  plan: PlanType
): Promise<string> => {
  if (!stripe) throw new Error("Stripe is not configured");

  const planConfig = PLANS[plan];
  if (!planConfig || !planConfig.priceId) {
    throw new Error(`Invalid plan: ${plan}`);
  }

  const customerId = await getOrCreateCustomer(userId, email, name);

  // Cancel existing subscription to prevent double-charging
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (user?.subscriptionId) {
    try {
      await stripe.subscriptions.cancel(user.subscriptionId);
    } catch (err) {
      // Old sub may already be cancelled — safe to ignore
      logger.warn({ err }, 'Could not cancel old subscription');
      captureError(err instanceof Error ? err : new Error(String(err)), {
        tags: { service: 'stripe', operation: 'cancel-old-subscription' },
        extra: { userId, subscriptionId: user.subscriptionId },
      });
    }
  }

  const session = await stripe.checkout.sessions.create(
    {
      customer: customerId,
      mode: "subscription",
      line_items: [
        {
          price: planConfig.priceId,
          quantity: 1,
        },
      ],
      success_url: `${config.frontendUrl}/checkout/success?plan=${plan}`,
      cancel_url: `${config.frontendUrl}/checkout?plan=${plan}&payment=cancelled`,
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
    throw new Error("Failed to create checkout session");
  }

  return session.url;
};

// Create customer portal session
export const createPortalSession = async (userId: string): Promise<string> => {
  if (!stripe) throw new Error("Stripe is not configured");

  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user?.stripeCustomerId) {
    throw new Error("No Stripe customer found");
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: `${config.frontendUrl}/dashboard`,
  });

  return session.url;
};

// Handle webhook events
export const handleWebhookEvent = async (event: Stripe.Event): Promise<void> => {
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      await handleCheckoutComplete(session);
      break;
    }
    case "customer.subscription.created":
    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      await handleSubscriptionChange(subscription);
      break;
    }
    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      await handleSubscriptionDeleted(subscription);
      break;
    }
    case "invoice.paid": {
      const invoice = event.data.object as Stripe.Invoice;
      await handleInvoicePaid(invoice);
      break;
    }
    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      await handlePaymentFailed(invoice);
      break;
    }
  }
};

// Handle successful checkout
const handleCheckoutComplete = async (session: Stripe.Checkout.Session): Promise<void> => {
  const userId = session.metadata?.userId;
  const plan = session.metadata?.plan as PlanType | undefined;

  if (!userId || !plan) return;

  const planConfig = PLANS[plan];

  // Create payment record (amount may be 0 for trial start)
  await prisma.payment.create({
    data: {
      userId,
      stripePaymentId: session.payment_intent as string || session.subscription as string || session.id,
      amount: session.amount_total || 0,
      currency: session.currency || "usd",
      status: "succeeded",
      type: "subscription",
      plan,
    },
  });

  // Update user with subscription info
  await prisma.user.update({
    where: { id: userId },
    data: {
      subscriptionTier: plan,
      subscriptionId: session.subscription as string || null,
      subscriptionStatus: "active",
      // Reset usage counters for new subscription
      cvCreatedCount: 0,
      aiUsedCount: 0,
      aiUsedToday: 0,
      downloadCount: 0,
      coverLetterCount: 0,
      lastAiResetDate: new Date(),
    },
  });
};

// Handle subscription changes
const handleSubscriptionChange = async (subscription: Stripe.Subscription): Promise<void> => {
  const customerId = subscription.customer as string;

  const user = await prisma.user.findFirst({
    where: { stripeCustomerId: customerId },
  });

  if (!user) return;

  await prisma.user.update({
    where: { id: user.id },
    data: {
      subscriptionId: subscription.id,
      subscriptionStatus: subscription.status,
    },
  });
};

// Handle subscription deletion
const handleSubscriptionDeleted = async (subscription: Stripe.Subscription): Promise<void> => {
  const customerId = subscription.customer as string;

  const user = await prisma.user.findFirst({
    where: { stripeCustomerId: customerId },
  });

  if (!user) return;

  // When subscription ends, user loses access but keeps account
  await prisma.user.update({
    where: { id: user.id },
    data: {
      subscriptionTier: "expired", // No "free" tier - must resubscribe
      subscriptionId: null,
      subscriptionStatus: "canceled",
    },
  });
};

// Handle successful invoice payment (monthly renewal)
const handleInvoicePaid = async (invoice: Stripe.Invoice): Promise<void> => {
  const customerId = invoice.customer as string;
  const subscriptionId = (invoice as any).subscription as string;

  const user = await prisma.user.findFirst({
    where: { stripeCustomerId: customerId },
  });

  if (!user || !subscriptionId) return;

  // Record the payment
  const paymentIntent = (invoice as any).payment_intent;
  await prisma.payment.create({
    data: {
      userId: user.id,
      stripePaymentId: (paymentIntent as string) || invoice.id,
      amount: invoice.amount_paid,
      currency: invoice.currency,
      status: "succeeded",
      type: "subscription",
      plan: user.subscriptionTier,
    },
  });

  // Reset monthly counters on successful payment (new billing period)
  await prisma.user.update({
    where: { id: user.id },
    data: {
      cvCreatedCount: 0,
      aiUsedCount: 0,
      aiUsedToday: 0,
      downloadCount: 0,
      coverLetterCount: 0,
      lastAiResetDate: new Date(),
      subscriptionStatus: "active",
    },
  });
};

// Handle failed payment
const handlePaymentFailed = async (invoice: Stripe.Invoice): Promise<void> => {
  const customerId = invoice.customer as string;

  const user = await prisma.user.findFirst({
    where: { stripeCustomerId: customerId },
  });

  if (!user) return;

  // Report payment failure to Sentry for visibility
  captureError(new Error(`Payment failed for user ${user.id}`), {
    user: { id: user.id, email: user.email ?? undefined },
    tags: { service: 'stripe', operation: 'payment-failed' },
    extra: { invoiceId: invoice.id, amountDue: invoice.amount_due, currency: invoice.currency },
  });

  await prisma.user.update({
    where: { id: user.id },
    data: { subscriptionStatus: "past_due" },
  });

  // Optionally record the failed payment
  const paymentIntent = (invoice as any).payment_intent;
  await prisma.payment.create({
    data: {
      userId: user.id,
      stripePaymentId: (paymentIntent as string) || invoice.id,
      amount: invoice.amount_due,
      currency: invoice.currency,
      status: "failed",
      type: "subscription",
      plan: user.subscriptionTier,
    },
  });
};

// Get subscription status with usage limits
export const getSubscriptionStatus = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      subscriptionTier: true,
      subscriptionStatus: true,
      stripeCustomerId: true,
      cvCreatedCount: true,
      aiUsedCount: true,
      aiUsedToday: true,
    },
  });

  if (!user) return null;

  const plan = PLANS[user.subscriptionTier as PlanType];

  return {
    ...user,
    // Include plan limits for frontend
    limits: plan ? {
      cvLimit: plan.cvLimit,
      aiLimit: plan.aiLimit,
      downloadLimit: plan.downloadLimit,
      coverLetterLimit: plan.coverLetterLimit,
    } : null,
  };
};

// Plan limits are now hardcoded in PLANS — no DB table needed
export const reloadPlansFromDb = async () => {
  // No-op: PlanConfig table removed, limits managed via hardcoded PLANS object
};

// Return plan limits only (no priceId/secrets) for public API
export const getPublicPlanLimits = () => {
  const plans: Record<string, { cvLimit: number; aiLimit: number; downloadLimit: number; coverLetterLimit: number }> = {};
  for (const [key, config] of Object.entries(PLANS)) {
    plans[key] = {
      cvLimit: config.cvLimit,
      aiLimit: config.aiLimit,
      downloadLimit: config.downloadLimit,
      coverLetterLimit: config.coverLetterLimit,
    };
  }
  return plans;
};

// Construct webhook event
export const constructWebhookEvent = (
  payload: Buffer,
  signature: string
): Stripe.Event => {
  if (!stripe) throw new Error("Stripe is not configured");

  return stripe.webhooks.constructEvent(
    payload,
    signature,
    config.stripeWebhookSecret
  );
};
