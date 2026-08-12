/**
 * GET /api/v1/admin/plans — Subscription plan limits.
 * Ported from backend GET /admin/plans (built from the in-memory PLANS map).
 */
import { jsonResponse } from '@/lib/server/apiUtils';
import { requireAdmin } from '@/lib/server/adminGuard';
import { PLAN_LIMITS, type PlanType } from '@/lib/server/subscriptionLimits';

export { OPTIONS } from '@/lib/server/apiUtils';

export const dynamic = 'force-dynamic';

// stripeService's PLAN_DISPLAY_NAMES is not exported — mirrored here (backend PLANS `name` field)
const PLAN_NAMES: Record<PlanType, string> = {
  free: 'Free',
  starter: 'Starter',
  gold: 'Gold',
  diamond: 'Diamond',
  platinum: 'Platinum',
};

interface PlanResponse {
  name: string;
  cvLimit: number;
  aiLimit: number;
  downloadLimit: number;
  coverLetterLimit: number;
}

export async function GET(request: Request): Promise<Response> {
  const origin = request.headers.get('origin');
  const { admin, error } = await requireAdmin(request);
  if (!admin) return error;

  const plans: Record<string, PlanResponse> = {};
  for (const [key, limits] of Object.entries(PLAN_LIMITS)) {
    plans[key] = { name: PLAN_NAMES[key as PlanType], ...limits };
  }

  return jsonResponse(plans, 200, origin);
}
