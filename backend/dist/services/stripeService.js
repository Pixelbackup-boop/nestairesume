"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructWebhookEvent = exports.getPublicPlanLimits = exports.reloadPlansFromDb = exports.getSubscriptionStatus = exports.handleWebhookEvent = exports.createPortalSession = exports.createCheckoutSession = exports.getOrCreateCustomer = exports.PLANS = void 0;
const stripe_1 = __importDefault(require("stripe"));
const env_1 = require("../config/env");
const database_1 = __importDefault(require("../config/database"));
// Initialize Stripe (will be null if no API key)
const stripe = env_1.config.stripeSecretKey
    ? new stripe_1.default(env_1.config.stripeSecretKey)
    : null;
exports.PLANS = {
    starter: {
        name: "Starter",
        priceId: env_1.config.stripePrices.starter,
        type: "subscription",
        cvLimit: 30,
        aiLimit: 50,
        downloadLimit: 3,
        coverLetterLimit: 10,
        trialDailyLimit: 3,
        hasTrial: false, // No trial - charges immediately
    },
    gold: {
        name: "Gold",
        priceId: env_1.config.stripePrices.gold,
        type: "subscription",
        cvLimit: 150,
        aiLimit: 100,
        downloadLimit: 10,
        coverLetterLimit: 30,
        trialDailyLimit: 5,
        hasTrial: true, // 7-day free trial
    },
    diamond: {
        name: "Diamond",
        priceId: env_1.config.stripePrices.diamond,
        type: "subscription",
        cvLimit: 300,
        aiLimit: 200,
        downloadLimit: 25,
        coverLetterLimit: 50,
        trialDailyLimit: 10,
        hasTrial: true, // 7-day free trial
    },
    platinum: {
        name: "Platinum",
        priceId: env_1.config.stripePrices.platinum,
        type: "subscription",
        cvLimit: -1, // Unlimited
        aiLimit: 500,
        downloadLimit: 120,
        coverLetterLimit: -1, // Unlimited
        trialDailyLimit: 15,
        hasTrial: false, // No trial - charges immediately
    },
};
// Trial period in days
const TRIAL_PERIOD_DAYS = 7;
// Create or get Stripe customer
const getOrCreateCustomer = async (userId, email, name) => {
    if (!stripe)
        throw new Error("Stripe is not configured");
    const user = await database_1.default.user.findUnique({ where: { id: userId } });
    if (user?.stripeCustomerId) {
        return user.stripeCustomerId;
    }
    const customer = await stripe.customers.create({
        email,
        name,
        metadata: { userId },
    });
    await database_1.default.user.update({
        where: { id: userId },
        data: { stripeCustomerId: customer.id },
    });
    return customer.id;
};
exports.getOrCreateCustomer = getOrCreateCustomer;
// Create checkout session
const createCheckoutSession = async (userId, email, name, plan) => {
    if (!stripe)
        throw new Error("Stripe is not configured");
    const planConfig = exports.PLANS[plan];
    if (!planConfig || !planConfig.priceId) {
        throw new Error(`Invalid plan: ${plan}`);
    }
    const customerId = await (0, exports.getOrCreateCustomer)(userId, email, name);
    // Check if plan offers trial AND user hasn't used trial before
    const user = await database_1.default.user.findUnique({ where: { id: userId } });
    const canUseTrial = planConfig.hasTrial && !user?.hasUsedTrial;
    // Cancel existing subscription to prevent double-charging
    if (user?.subscriptionId) {
        try {
            await stripe.subscriptions.cancel(user.subscriptionId);
        }
        catch (err) {
            // Old sub may already be cancelled — safe to ignore
            console.warn("Could not cancel old subscription:", err.message);
        }
    }
    const session = await stripe.checkout.sessions.create({
        customer: customerId,
        mode: "subscription",
        line_items: [
            {
                price: planConfig.priceId,
                quantity: 1,
            },
        ],
        subscription_data: canUseTrial ? {
            trial_period_days: TRIAL_PERIOD_DAYS,
        } : undefined,
        success_url: `${env_1.config.frontendUrl}/checkout/success?plan=${plan}`,
        cancel_url: `${env_1.config.frontendUrl}/checkout?plan=${plan}&payment=cancelled`,
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
exports.createCheckoutSession = createCheckoutSession;
// Create customer portal session
const createPortalSession = async (userId) => {
    if (!stripe)
        throw new Error("Stripe is not configured");
    const user = await database_1.default.user.findUnique({ where: { id: userId } });
    if (!user?.stripeCustomerId) {
        throw new Error("No Stripe customer found");
    }
    const session = await stripe.billingPortal.sessions.create({
        customer: user.stripeCustomerId,
        return_url: `${env_1.config.frontendUrl}/dashboard`,
    });
    return session.url;
};
exports.createPortalSession = createPortalSession;
// Handle webhook events
const handleWebhookEvent = async (event) => {
    switch (event.type) {
        case "checkout.session.completed": {
            const session = event.data.object;
            await handleCheckoutComplete(session);
            break;
        }
        case "customer.subscription.created":
        case "customer.subscription.updated": {
            const subscription = event.data.object;
            await handleSubscriptionChange(subscription);
            break;
        }
        case "customer.subscription.deleted": {
            const subscription = event.data.object;
            await handleSubscriptionDeleted(subscription);
            break;
        }
        case "invoice.paid": {
            const invoice = event.data.object;
            await handleInvoicePaid(invoice);
            break;
        }
        case "invoice.payment_failed": {
            const invoice = event.data.object;
            await handlePaymentFailed(invoice);
            break;
        }
    }
};
exports.handleWebhookEvent = handleWebhookEvent;
// Handle successful checkout
const handleCheckoutComplete = async (session) => {
    const userId = session.metadata?.userId;
    const plan = session.metadata?.plan;
    if (!userId || !plan)
        return;
    const planConfig = exports.PLANS[plan];
    // Create payment record (amount may be 0 for trial start)
    await database_1.default.payment.create({
        data: {
            userId,
            stripePaymentId: session.payment_intent || session.subscription || session.id,
            amount: session.amount_total || 0,
            currency: session.currency || "usd",
            status: "succeeded",
            type: "subscription",
            plan,
        },
    });
    // Calculate trial end date if on trial
    let trialEndsAt = null;
    let subscriptionStatus = "active";
    if (session.subscription) {
        // Fetch subscription to check trial status
        const subscription = await stripe?.subscriptions.retrieve(session.subscription);
        if (subscription?.trial_end) {
            trialEndsAt = new Date(subscription.trial_end * 1000);
            subscriptionStatus = "trialing";
        }
    }
    // Update user with subscription info and trial tracking
    await database_1.default.user.update({
        where: { id: userId },
        data: {
            subscriptionTier: plan,
            subscriptionId: session.subscription || null,
            subscriptionStatus,
            // Trial tracking
            trialEndsAt,
            hasUsedTrial: trialEndsAt ? true : undefined,
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
const handleSubscriptionChange = async (subscription) => {
    const customerId = subscription.customer;
    const user = await database_1.default.user.findFirst({
        where: { stripeCustomerId: customerId },
    });
    if (!user)
        return;
    await database_1.default.user.update({
        where: { id: user.id },
        data: {
            subscriptionId: subscription.id,
            subscriptionStatus: subscription.status,
        },
    });
};
// Handle subscription deletion
const handleSubscriptionDeleted = async (subscription) => {
    const customerId = subscription.customer;
    const user = await database_1.default.user.findFirst({
        where: { stripeCustomerId: customerId },
    });
    if (!user)
        return;
    // When subscription ends, user loses access but keeps account
    await database_1.default.user.update({
        where: { id: user.id },
        data: {
            subscriptionTier: "expired", // No "free" tier - must resubscribe
            subscriptionId: null,
            subscriptionStatus: "canceled",
            trialEndsAt: null,
        },
    });
};
// Handle successful invoice payment (monthly renewal)
const handleInvoicePaid = async (invoice) => {
    const customerId = invoice.customer;
    const subscriptionId = invoice.subscription;
    const user = await database_1.default.user.findFirst({
        where: { stripeCustomerId: customerId },
    });
    if (!user || !subscriptionId)
        return;
    // Record the payment
    const paymentIntent = invoice.payment_intent;
    await database_1.default.payment.create({
        data: {
            userId: user.id,
            stripePaymentId: paymentIntent || invoice.id,
            amount: invoice.amount_paid,
            currency: invoice.currency,
            status: "succeeded",
            type: "subscription",
            plan: user.subscriptionTier,
        },
    });
    // Reset monthly counters on successful payment (new billing period)
    await database_1.default.user.update({
        where: { id: user.id },
        data: {
            cvCreatedCount: 0,
            aiUsedCount: 0,
            aiUsedToday: 0,
            downloadCount: 0,
            coverLetterCount: 0,
            lastAiResetDate: new Date(),
            subscriptionStatus: "active", // No longer trialing after first payment
            trialEndsAt: null,
        },
    });
};
// Handle failed payment
const handlePaymentFailed = async (invoice) => {
    const customerId = invoice.customer;
    const user = await database_1.default.user.findFirst({
        where: { stripeCustomerId: customerId },
    });
    if (!user)
        return;
    await database_1.default.user.update({
        where: { id: user.id },
        data: { subscriptionStatus: "past_due" },
    });
    // Optionally record the failed payment
    const paymentIntent = invoice.payment_intent;
    await database_1.default.payment.create({
        data: {
            userId: user.id,
            stripePaymentId: paymentIntent || invoice.id,
            amount: invoice.amount_due,
            currency: invoice.currency,
            status: "failed",
            type: "subscription",
            plan: user.subscriptionTier,
        },
    });
};
// Get subscription status with usage limits
const getSubscriptionStatus = async (userId) => {
    const user = await database_1.default.user.findUnique({
        where: { id: userId },
        select: {
            subscriptionTier: true,
            subscriptionStatus: true,
            stripeCustomerId: true,
            trialEndsAt: true,
            cvCreatedCount: true,
            aiUsedCount: true,
            aiUsedToday: true,
        },
    });
    if (!user)
        return null;
    const plan = exports.PLANS[user.subscriptionTier];
    const isTrialing = user.subscriptionStatus === "trialing";
    return {
        ...user,
        // Include plan limits for frontend
        limits: plan ? {
            cvLimit: plan.cvLimit,
            aiLimit: plan.aiLimit,
            downloadLimit: plan.downloadLimit,
            coverLetterLimit: plan.coverLetterLimit,
            dailyLimit: isTrialing ? plan.trialDailyLimit : plan.aiLimit,
        } : null,
        isTrialing,
    };
};
exports.getSubscriptionStatus = getSubscriptionStatus;
// Load plan limits from DB and mutate in-memory PLANS (shared by reference across all modules)
const reloadPlansFromDb = async () => {
    const dbConfigs = await database_1.default.planConfig.findMany();
    for (const config of dbConfigs) {
        const plan = exports.PLANS[config.planType];
        if (plan) {
            plan.cvLimit = config.cvLimit;
            plan.aiLimit = config.aiLimit;
            plan.downloadLimit = config.downloadLimit;
            plan.coverLetterLimit = config.coverLetterLimit;
            plan.trialDailyLimit = config.trialDailyLimit;
        }
    }
};
exports.reloadPlansFromDb = reloadPlansFromDb;
// Return plan limits only (no priceId/secrets) for public API
const getPublicPlanLimits = () => {
    const plans = {};
    for (const [key, config] of Object.entries(exports.PLANS)) {
        plans[key] = {
            cvLimit: config.cvLimit,
            aiLimit: config.aiLimit,
            downloadLimit: config.downloadLimit,
            coverLetterLimit: config.coverLetterLimit,
        };
    }
    return plans;
};
exports.getPublicPlanLimits = getPublicPlanLimits;
// Construct webhook event
const constructWebhookEvent = (payload, signature) => {
    if (!stripe)
        throw new Error("Stripe is not configured");
    return stripe.webhooks.constructEvent(payload, signature, env_1.config.stripeWebhookSecret);
};
exports.constructWebhookEvent = constructWebhookEvent;
//# sourceMappingURL=stripeService.js.map