/**
 * GET /api/v1/payments/plans — Public plan limits (no auth).
 * Ported from backend GET /payments/plans (getPublicPlanLimits()).
 *
 * Response: Record<plan, { cvLimit, aiLimit, downloadLimit, coverLetterLimit }>
 * — limits only, never price IDs or other secrets.
 */
import { NextResponse } from 'next/server';
import { corsHeaders } from '@/lib/server/apiUtils';
import { PLAN_LIMITS } from '@/lib/server/subscriptionLimits';

export { OPTIONS } from '@/lib/server/apiUtils';

export const dynamic = "force-dynamic";

export function GET(request: Request): Response {
  // TODO: rate limiting — the Express backend applied generalLimiter to /api/v1/payments
  const plans: Record<string, { cvLimit: number; aiLimit: number; downloadLimit: number; coverLetterLimit: number }> = {};
  for (const [key, limits] of Object.entries(PLAN_LIMITS)) {
    plans[key] = { ...limits };
  }

  return NextResponse.json(plans, {
    status: 200,
    headers: {
      ...corsHeaders(request.headers.get('origin')),
      'Cache-Control': 'public, max-age=600, stale-while-revalidate=1200',
    },
  });
}
