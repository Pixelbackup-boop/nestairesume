import Stripe from "stripe";
import { config } from "../config/env";
import prisma from "../config/database";

// Initialize Stripe (will be null if no API key)
const stripe = config.stripeSecretKey
  ? new Stripe(config.stripeSecretKey, { apiVersion: "2024-12-18.acacia" })
  : null;

export type PlanType = "starter" | "gold" | "diamond";

interface PlanConfig {
  name: string;
  priceId: string;
  type: "one_time" | "subscription";
  credits: number;
}

const PLANS: Record<PlanType, PlanConfig> = {
  starter: {
    name: "Starter",
    priceId: config.stripePrices.starter,
    type: "one_time",
    credits: 10,
  },
  gold: {
    name: "Gold",
    priceId: config.stripePrices.gold,
    type: "subscription",
    credits: 50,
  },
  diamond: {
    name: "Diamond",
    priceId: config.stripePrices.diamond,
    type: "subscription",
    credits: -1, // Unlimited
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

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: planConfig.type === "subscription" ? "subscription" : "payment",
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
  });

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

  // Create payment record
  await prisma.payment.create({
    data: {
      userId,
      stripePaymentId: session.payment_intent as string || session.subscription as string || session.id,
      amount: session.amount_total || 0,
      currency: session.currency || "usd",
      status: "succeeded",
      type: planConfig.type === "subscription" ? "subscription" : "one_time",
      plan,
    },
  });

  // Update user tier and credits
  const updateData: {
    subscriptionTier: string;
    creditsRemaining?: number;
    subscriptionId?: string;
    subscriptionStatus?: string;
  } = {
    subscriptionTier: plan,
  };

  if (planConfig.credits > 0) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    updateData.creditsRemaining = (user?.creditsRemaining || 0) + planConfig.credits;
  } else if (planConfig.credits === -1) {
    updateData.creditsRemaining = 999999; // "Unlimited"
  }

  if (session.subscription) {
    updateData.subscriptionId = session.subscription as string;
    updateData.subscriptionStatus = "active";
  }

  await prisma.user.update({
    where: { id: userId },
    data: updateData,
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

  await prisma.user.update({
    where: { id: user.id },
    data: {
      subscriptionTier: "free",
      subscriptionId: null,
      subscriptionStatus: "canceled",
    },
  });
};

// Handle successful invoice payment
const handleInvoicePaid = async (invoice: Stripe.Invoice): Promise<void> => {
  const customerId = invoice.customer as string;
  const subscriptionId = invoice.subscription as string;

  const user = await prisma.user.findFirst({
    where: { stripeCustomerId: customerId },
  });

  if (!user || !subscriptionId) return;

  // Record the payment
  await prisma.payment.create({
    data: {
      userId: user.id,
      stripePaymentId: invoice.payment_intent as string || invoice.id,
      amount: invoice.amount_paid,
      currency: invoice.currency,
      status: "succeeded",
      type: "subscription",
      plan: user.subscriptionTier,
    },
  });

  // Refresh credits for subscription users
  const planConfig = PLANS[user.subscriptionTier as PlanType];
  if (planConfig?.credits > 0) {
    await prisma.user.update({
      where: { id: user.id },
      data: { creditsRemaining: planConfig.credits },
    });
  }
};

// Handle failed payment
const handlePaymentFailed = async (invoice: Stripe.Invoice): Promise<void> => {
  const customerId = invoice.customer as string;

  const user = await prisma.user.findFirst({
    where: { stripeCustomerId: customerId },
  });

  if (!user) return;

  await prisma.user.update({
    where: { id: user.id },
    data: { subscriptionStatus: "past_due" },
  });

  // Optionally record the failed payment
  await prisma.payment.create({
    data: {
      userId: user.id,
      stripePaymentId: invoice.payment_intent as string || invoice.id,
      amount: invoice.amount_due,
      currency: invoice.currency,
      status: "failed",
      type: "subscription",
      plan: user.subscriptionTier,
    },
  });
};

// Get subscription status
export const getSubscriptionStatus = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      subscriptionTier: true,
      subscriptionStatus: true,
      creditsRemaining: true,
      stripeCustomerId: true,
    },
  });

  return user;
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
