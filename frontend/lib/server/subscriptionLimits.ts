/**
 * Subscription usage limits for the /api/v1 routes on Cloudflare Workers.
 *
 * Ported from backend/src/middleware/subscriptionLimits.ts. Plan limits mirror
 * the hardcoded PLANS object in backend/src/services/stripeService.ts (the
 * backend reads no PlanConfig table — limits are code constants; keep in sync).
 */
import type { PrismaClient } from '@prisma/client';

export type PlanType = 'free' | 'starter' | 'gold' | 'diamond' | 'platinum';

export interface PlanLimits {
  cvLimit: number; // CV creations per month (-1 = unlimited)
  aiLimit: number; // AI generations per month
  downloadLimit: number; // PDF downloads per month (-1 = unlimited)
  coverLetterLimit: number; // Cover letters per month (-1 = unlimited)
}

export const PLAN_LIMITS: Record<PlanType, PlanLimits> = {
  free: { cvLimit: 3, aiLimit: 5, downloadLimit: 2, coverLetterLimit: 1 },
  starter: { cvLimit: 30, aiLimit: 50, downloadLimit: 3, coverLetterLimit: 10 },
  gold: { cvLimit: 150, aiLimit: 100, downloadLimit: 10, coverLetterLimit: 30 },
  diamond: { cvLimit: 300, aiLimit: 200, downloadLimit: 25, coverLetterLimit: 50 },
  platinum: { cvLimit: -1, aiLimit: 500, downloadLimit: 120, coverLetterLimit: -1 },
};

/** HTTP error a limit check produced — return jsonResponse(body, status) from the route. */
export interface LimitCheckError {
  status: number;
  body: {
    error: string;
    code?: string;
    limit?: number;
    used?: number;
  };
}

const INTERNAL_ERROR: LimitCheckError = {
  status: 500,
  body: { error: 'Internal server error' },
};

/** Mirrors backend checkCvLimit middleware. Null means the request may proceed. */
export async function checkCvLimit(db: PrismaClient, userId: string): Promise<LimitCheckError | null> {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { subscriptionTier: true, cvCreatedCount: true, isSuspended: true },
    });

    if (!user) return { status: 404, body: { error: 'User not found' } };
    if (user.isSuspended) return { status: 403, body: { error: 'Account suspended' } };

    const plan = PLAN_LIMITS[user.subscriptionTier as PlanType];
    if (!plan) {
      return { status: 403, body: { error: 'No active subscription', code: 'SUBSCRIPTION_REQUIRED' } };
    }

    // -1 means unlimited
    if (plan.cvLimit !== -1 && user.cvCreatedCount >= plan.cvLimit) {
      return {
        status: 429,
        body: {
          error: 'CV creation limit reached',
          code: 'CV_LIMIT_REACHED',
          limit: plan.cvLimit,
          used: user.cvCreatedCount,
        },
      };
    }

    return null;
  } catch (error) {
    console.error('CV limit check error', error);
    return INTERNAL_ERROR;
  }
}

/** Mirrors backend checkAiLimit middleware (monthly aiUsedCount vs plan.aiLimit). */
export async function checkAiLimit(db: PrismaClient, userId: string): Promise<LimitCheckError | null> {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { subscriptionTier: true, aiUsedCount: true, isSuspended: true },
    });

    if (!user) return { status: 404, body: { error: 'User not found' } };
    if (user.isSuspended) return { status: 403, body: { error: 'Account suspended' } };

    const plan = PLAN_LIMITS[user.subscriptionTier as PlanType];
    if (!plan) {
      return { status: 403, body: { error: 'No active subscription', code: 'SUBSCRIPTION_REQUIRED' } };
    }

    // Check monthly limit (backend has no -1 escape hatch here — replicated as-is)
    if (user.aiUsedCount >= plan.aiLimit) {
      return {
        status: 429,
        body: {
          error: 'Monthly AI generation limit reached',
          code: 'AI_LIMIT_REACHED',
          limit: plan.aiLimit,
          used: user.aiUsedCount,
        },
      };
    }

    return null;
  } catch (error) {
    console.error('AI limit check error', error);
    return INTERNAL_ERROR;
  }
}

/** Mirrors backend checkCoverLetterLimit middleware. */
export async function checkCoverLetterLimit(db: PrismaClient, userId: string): Promise<LimitCheckError | null> {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { subscriptionTier: true, coverLetterCount: true, isSuspended: true },
    });

    if (!user) return { status: 404, body: { error: 'User not found' } };
    if (user.isSuspended) return { status: 403, body: { error: 'Account suspended' } };

    const plan = PLAN_LIMITS[user.subscriptionTier as PlanType];
    if (!plan) {
      return { status: 403, body: { error: 'No active subscription', code: 'SUBSCRIPTION_REQUIRED' } };
    }

    // -1 means unlimited
    if (plan.coverLetterLimit !== -1 && user.coverLetterCount >= plan.coverLetterLimit) {
      return {
        status: 429,
        body: {
          error: 'Cover letter limit reached',
          code: 'COVER_LETTER_LIMIT_REACHED',
          limit: plan.coverLetterLimit,
          used: user.coverLetterCount,
        },
      };
    }

    return null;
  } catch (error) {
    console.error('Cover letter limit check error', error);
    return INTERNAL_ERROR;
  }
}

/** Increments both the monthly and daily AI counters — mirrors backend incrementAiCount. */
export async function incrementAiCount(db: PrismaClient, userId: string): Promise<void> {
  await db.user.update({
    where: { id: userId },
    data: {
      aiUsedCount: { increment: 1 },
      aiUsedToday: { increment: 1 },
    },
  });
}

/** Mirrors backend incrementCoverLetterCount. */
export async function incrementCoverLetterCount(db: PrismaClient, userId: string): Promise<void> {
  await db.user.update({
    where: { id: userId },
    data: { coverLetterCount: { increment: 1 } },
  });
}
