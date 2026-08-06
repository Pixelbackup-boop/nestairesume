/**
 * GET /api/v1/payments/billing — Subscription details + recent invoices.
 * Ported from backend GET /payments/billing
 * (getSubscriptionDetails() + getUserInvoices(userId, 12)).
 *
 * Response: { subscription: {...} | null, invoices: [...] }
 */
import { getDb } from '@/lib/server/db';
import { jsonResponse, getBearerToken, verifyAccessToken } from '@/lib/server/apiUtils';
import { getStripe, getSubscriptionDetails, getUserInvoices } from '@/lib/server/stripeService';

export { OPTIONS } from '@/lib/server/apiUtils';

const RECENT_INVOICES_LIMIT = 12;

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
    const stripe = getStripe();
    const db = getDb();

    const [subscription, invoices] = await Promise.all([
      getSubscriptionDetails(stripe, db, tokenUser.id),
      getUserInvoices(stripe, db, tokenUser.id, RECENT_INVOICES_LIMIT),
    ]);

    return jsonResponse({ subscription, invoices }, 200, origin);
  } catch (error) {
    console.error('Billing details error', error);
    return jsonResponse({ detail: 'Failed to get billing details' }, 500, origin);
  }
}
