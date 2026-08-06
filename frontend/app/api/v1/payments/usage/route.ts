/**
 * GET /api/v1/payments/usage — Usage counters vs plan limits.
 * Ported from backend GET /payments/usage (getUsageStatus() in
 * backend/src/middleware/subscriptionLimits.ts).
 *
 * Response: { tier, usage: { cv, ai, aiToday, download, coverLetter } }
 * where each entry is { used: number, limit: number } (-1 = unlimited).
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
        cvCreatedCount: true,
        aiUsedCount: true,
        aiUsedToday: true,
        downloadCount: true,
        coverLetterCount: true,
      },
    });

    if (!user) {
      return jsonResponse({ detail: 'User not found' }, 404, origin);
    }

    // Unknown tiers (e.g. "expired") fall back to free limits — backend parity
    const plan = PLAN_LIMITS[(user.subscriptionTier as PlanType) || 'free'] || PLAN_LIMITS.free;

    return jsonResponse(
      {
        tier: user.subscriptionTier || 'free',
        usage: {
          cv: { used: user.cvCreatedCount, limit: plan.cvLimit },
          ai: { used: user.aiUsedCount, limit: plan.aiLimit },
          aiToday: { used: user.aiUsedToday, limit: plan.aiLimit },
          download: { used: user.downloadCount, limit: plan.downloadLimit },
          coverLetter: { used: user.coverLetterCount, limit: plan.coverLetterLimit },
        },
      },
      200,
      origin
    );
  } catch (error) {
    console.error('Usage status error', error);
    return jsonResponse({ detail: 'Failed to get usage status' }, 500, origin);
  }
}
