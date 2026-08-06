/**
 * POST /api/v1/payments/reactivate — Undo a pending subscription cancellation.
 * Ported from backend POST /payments/reactivate (reactivateSubscription()).
 *
 * Response: { status: string }
 */
import { getDb } from '@/lib/server/db';
import { jsonResponse, getBearerToken, verifyAccessToken } from '@/lib/server/apiUtils';
import { getStripe, reactivateSubscription } from '@/lib/server/stripeService';

export { OPTIONS } from '@/lib/server/apiUtils';

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

  try {
    const result = await reactivateSubscription(getStripe(), getDb(), tokenUser.id);
    return jsonResponse(result, 200, origin);
  } catch (error: unknown) {
    console.error('Reactivate subscription error', error);
    const message = error instanceof Error ? error.message : 'Failed to reactivate subscription';
    return jsonResponse({ detail: message }, 500, origin);
  }
}
