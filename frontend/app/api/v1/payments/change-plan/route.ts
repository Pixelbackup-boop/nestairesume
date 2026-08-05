/**
 * POST /api/v1/payments/change-plan — Switch subscription plan with proration.
 * Ported from backend POST /payments/change-plan
 * (validateBody(changePlanSchema) + changeSubscriptionPlan()).
 *
 * Request body: { plan: 'starter' | 'gold' | 'diamond' | 'platinum' }
 * Response: { plan: string, status: string }
 */
import { z } from 'zod';
import { getDb } from '@/lib/server/db';
import {
  jsonResponse,
  getBearerToken,
  verifyAccessToken,
  validationErrorResponse,
} from '@/lib/server/apiUtils';
import { getStripe, changeSubscriptionPlan, PAID_PLANS } from '@/lib/server/stripeService';

export { OPTIONS } from '@/lib/server/apiUtils';

// Mirrors backend changePlanSchema
const changePlanSchema = z.object({
  plan: z.enum(PAID_PLANS, { error: 'Invalid plan. Must be: starter, gold, diamond, or platinum' }),
});

export async function POST(request: Request): Promise<Response> {
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

  const body: unknown = await request.json().catch(() => ({}));
  const parsed = changePlanSchema.safeParse(body);
  if (!parsed.success) {
    return validationErrorResponse(parsed.error, origin);
  }

  try {
    const result = await changeSubscriptionPlan(getStripe(), getDb(), tokenUser.id, parsed.data.plan);
    return jsonResponse(result, 200, origin);
  } catch (error: unknown) {
    console.error('Change plan error', error);
    const message = error instanceof Error ? error.message : 'Failed to change plan';
    return jsonResponse({ detail: message }, 500, origin);
  }
}
