/**
 * POST /api/v1/payments/create-portal — Stripe billing portal session.
 * Ported from backend POST /payments/create-portal (createPortalSession()).
 *
 * Request body: { returnUrl?: string } (defaults to <frontend>/dashboard)
 * Response: { url: string }
 */
import { getDb } from '@/lib/server/db';
import { jsonResponse, getBearerToken, verifyAccessToken } from '@/lib/server/apiUtils';
import { getStripe, createPortalSession, resolveFrontendUrl } from '@/lib/server/stripeService';

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
    const body = (await request.json().catch(() => ({}))) as { returnUrl?: unknown };
    const returnUrl =
      typeof body.returnUrl === 'string' && body.returnUrl
        ? body.returnUrl
        : `${resolveFrontendUrl(request)}/dashboard`;

    const url = await createPortalSession(getStripe(), getDb(), tokenUser.id, returnUrl);
    return jsonResponse({ url }, 200, origin);
  } catch (error: unknown) {
    console.error('Portal error', error);
    const message = error instanceof Error ? error.message : 'Failed to create portal session';
    return jsonResponse({ detail: message }, 500, origin);
  }
}
