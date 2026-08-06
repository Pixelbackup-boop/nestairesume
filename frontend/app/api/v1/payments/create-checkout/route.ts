/**
 * POST /api/v1/payments/create-checkout — Stripe Checkout session for a paid plan.
 * Ported from backend POST /payments/create-checkout
 * (authenticateToken + validateBody(createCheckoutSchema) + createCheckoutSession()).
 *
 * Request body: { plan: 'starter' | 'gold' | 'diamond' | 'platinum', annual?: boolean }
 * Response: { url: string }
 */
import { z } from 'zod';
import { getDb } from '@/lib/server/db';
import {
  jsonResponse,
  getBearerToken,
  verifyAccessToken,
  validationErrorResponse,
} from '@/lib/server/apiUtils';
import {
  getStripe,
  createCheckoutSession,
  resolveFrontendUrl,
  PAID_PLANS,
} from '@/lib/server/stripeService';

export { OPTIONS } from '@/lib/server/apiUtils';

// Mirrors backend createCheckoutSchema; `annual` is additive and selects the
// STRIPE_PRICE_*_ANNUAL price (current callers only send { plan } = monthly)
const createCheckoutSchema = z.object({
  plan: z.enum(PAID_PLANS, { error: 'Invalid plan. Must be: starter, gold, diamond, or platinum' }),
  annual: z.boolean().optional().default(false),
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
  const parsed = createCheckoutSchema.safeParse(body);
  if (!parsed.success) {
    return validationErrorResponse(parsed.error, origin);
  }

  try {
    const url = await createCheckoutSession(getStripe(), getDb(), {
      userId: tokenUser.id,
      email: tokenUser.email,
      name: tokenUser.email, // Using email as name fallback (backend parity)
      plan: parsed.data.plan,
      annual: parsed.data.annual,
      frontendUrl: resolveFrontendUrl(request),
    });

    return jsonResponse({ url }, 200, origin);
  } catch (error: unknown) {
    console.error('Checkout error', error);
    const message = error instanceof Error ? error.message : 'Failed to create checkout session';
    return jsonResponse({ detail: message }, 500, origin);
  }
}
