/**
 * GET /api/v1/payments/proration-preview?plan=<plan> — Preview cost of a plan change.
 * Ported from backend GET /payments/proration-preview (getProrationPreview()).
 *
 * Response: { amount: number, currency: string, isCredit: boolean }
 */
import { getDb } from '@/lib/server/db';
import { jsonResponse, getBearerToken, verifyAccessToken } from '@/lib/server/apiUtils';
import { getStripe, getProrationPreview, PAID_PLANS, type PaidPlanType } from '@/lib/server/stripeService';

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

  const plan = new URL(request.url).searchParams.get('plan');
  if (!plan || !(PAID_PLANS as readonly string[]).includes(plan)) {
    return jsonResponse({ detail: 'Invalid plan' }, 400, origin);
  }

  try {
    const result = await getProrationPreview(getStripe(), getDb(), tokenUser.id, plan as PaidPlanType);
    return jsonResponse(result, 200, origin);
  } catch (error: unknown) {
    console.error('Proration preview error', error);
    const message = error instanceof Error ? error.message : 'Failed to get proration preview';
    return jsonResponse({ detail: message }, 500, origin);
  }
}
