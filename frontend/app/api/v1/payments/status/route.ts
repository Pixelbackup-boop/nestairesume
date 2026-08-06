/**
 * GET /api/v1/payments/status — Subscription tier/status plus plan limits.
 * Ported from backend GET /payments/status (getSubscriptionStatus()).
 *
 * Response: { subscriptionTier, subscriptionStatus, stripeCustomerId,
 *             cvCreatedCount, aiUsedCount, aiUsedToday, limits: {...} | null }
 */
import { getDb } from '@/lib/server/db';
import { jsonResponse, getBearerToken, verifyAccessToken } from '@/lib/server/apiUtils';
import { PLAN_LIMITS, type PlanType } from '@/lib/server/subscriptionLimits';

export { OPTIONS } from '@/lib/server/apiUtils';

export async function GET(request: Request): Promise<Response> {
  // TODO: rate limiting — the Express backend applied generalLimiter to /api/v1/payments
  const origin = request.headers.get('origin');

  const token = getBearerToken(request);
  if (!token) {
    return jsonResponse({ detail: 'Not authenticated' }, 401, origin);
  }
  const tokenUser = await verifyAccessToken(token);
  if (!tokenUser) {
    return jsonResponse({ detail: 'Invalid or expired token' }, 401, origin);
  }

  try {
    const user = await getDb().user.findUnique({
      where: { id: tokenUser.id },
      select: {
        subscriptionTier: true,
        subscriptionStatus: true,
        stripeCustomerId: true,
        cvCreatedCount: true,
        aiUsedCount: true,
        aiUsedToday: true,
      },
    });

    // Backend returned the raw getSubscriptionStatus() result — null body for a missing user
    if (!user) {
      return jsonResponse(null, 200, origin);
    }

    const plan = PLAN_LIMITS[user.subscriptionTier as PlanType];

    return jsonResponse(
      {
        ...user,
        // Include plan limits for frontend (null for unknown tiers, e.g. "expired")
        limits: plan
          ? {
              cvLimit: plan.cvLimit,
              aiLimit: plan.aiLimit,
              downloadLimit: plan.downloadLimit,
              coverLetterLimit: plan.coverLetterLimit,
            }
          : null,
      },
      200,
      origin
    );
  } catch (error) {
    console.error('Subscription status error', error);
    return jsonResponse({ detail: 'Failed to get subscription status' }, 500, origin);
  }
}
