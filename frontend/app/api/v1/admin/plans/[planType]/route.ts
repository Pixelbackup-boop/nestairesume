/**
 * PUT /api/v1/admin/plans/[planType] — Update plan limits.
 * Ported from backend PUT /admin/plans/:planType.
 */
import { jsonResponse } from '@/lib/server/apiUtils';
import { requireAdmin } from '@/lib/server/adminGuard';

export { OPTIONS } from '@/lib/server/apiUtils';

export const dynamic = 'force-dynamic';

interface RouteContext {
  params: Promise<{ planType: string }>;
}

const VALID_PLANS = ['starter', 'gold', 'diamond', 'platinum'];

export async function PUT(request: Request, context: RouteContext): Promise<Response> {
  const origin = request.headers.get('origin');
  const { admin, error } = await requireAdmin(request);
  if (!admin) return error;

  const { planType } = await context.params;

  if (!VALID_PLANS.includes(planType)) {
    return jsonResponse({ detail: 'Invalid plan type' }, 400, origin);
  }

  // The backend mutated an in-memory PLANS map (no DB table). On Workers each
  // isolate holds its own copy, so that write would be a silent per-isolate
  // no-op — limits here are compile-time constants in
  // lib/server/subscriptionLimits.ts. 501 is intentional until limits move to
  // a real store (e.g. AppSetting).
  return jsonResponse(
    {
      detail:
        'Plan limits are compile-time constants on this deployment (lib/server/subscriptionLimits.ts). Runtime editing is not supported yet — changing a limit requires a code change and redeploy.',
    },
    501,
    origin
  );
}
