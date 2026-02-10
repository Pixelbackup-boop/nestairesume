import Stripe from "stripe";
export type PlanType = "starter" | "gold" | "diamond" | "platinum";
interface PlanConfig {
    name: string;
    priceId: string;
    type: "subscription";
    cvLimit: number;
    aiLimit: number;
    downloadLimit: number;
    coverLetterLimit: number;
    trialDailyLimit: number;
    hasTrial: boolean;
}
export declare const PLANS: Record<PlanType, PlanConfig>;
export declare const getOrCreateCustomer: (userId: string, email: string, name: string) => Promise<string>;
export declare const createCheckoutSession: (userId: string, email: string, name: string, plan: PlanType) => Promise<string>;
export declare const createPortalSession: (userId: string) => Promise<string>;
export declare const handleWebhookEvent: (event: Stripe.Event) => Promise<void>;
export declare const getSubscriptionStatus: (userId: string) => Promise<{
    limits: {
        cvLimit: number;
        aiLimit: number;
        downloadLimit: number;
        coverLetterLimit: number;
        dailyLimit: number;
    } | null;
    isTrialing: boolean;
    subscriptionTier: string;
    stripeCustomerId: string | null;
    subscriptionStatus: string | null;
    trialEndsAt: Date | null;
    cvCreatedCount: number;
    aiUsedCount: number;
    aiUsedToday: number;
} | null>;
export declare const reloadPlansFromDb: () => Promise<void>;
export declare const getPublicPlanLimits: () => Record<string, {
    cvLimit: number;
    aiLimit: number;
    downloadLimit: number;
    coverLetterLimit: number;
}>;
export declare const constructWebhookEvent: (payload: Buffer, signature: string) => Stripe.Event;
export {};
//# sourceMappingURL=stripeService.d.ts.map