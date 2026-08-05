/**
 * POST /api/v1/payments/cancel — Cancel subscription (at period end or immediately).
 * Ported from backend POST /payments/cancel
 * (validateBody(cancelSubscriptionSchema) + cancelSubscription()).
 *
 * Request body: { immediately?: boolean } (default false = cancel at period end)
 * Response: { effectiveDate: number } (unix seconds)
 */
import { z } from 'zod';
import { getDb } from '@/lib/server/db';
import {
  jsonResponse,
  getBearerToken,
  verifyAccessToken,
  validationErrorResponse,
} from '@/lib/server/apiUtils';
import { getStripe, cancelSubscription } from '@/lib/server/stripeService';

export { OPTIONS } from '@/lib/server/apiUtils';

// Mirrors backend cancelSubscriptionSchema
const cancelSubscriptionSchema = z.object({
  immediately: z.boolean().optional().default(false),
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
  const parsed = cancelSubscriptionSchema.safeParse(body);
  if (!parsed.success) {
    return validationErrorResponse(parsed.error, origin);
  }

  try {
    const result = await cancelSubscription(getStripe(), getDb(), tokenUser.id, parsed.data.immediately);
    return jsonResponse(result, 200, origin);
  } catch (error: unknown) {
    console.error('Cancel subscription error', error);
    const message = error instanceof Error ? error.message : 'Failed to cancel subscription';
    return jsonResponse({ detail: message }, 500, origin);
  }
}
