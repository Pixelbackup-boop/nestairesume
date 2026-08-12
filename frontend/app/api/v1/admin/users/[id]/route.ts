/**
 * /api/v1/admin/users/[id] — Admin user detail, update, delete.
 * Ported from backend GET/PUT/DELETE /admin/users/:id.
 */
import { getDb } from '@/lib/server/db';
import { corsHeaders, jsonResponse } from '@/lib/server/apiUtils';
import { requireAdmin } from '@/lib/server/adminGuard';
import { PLAN_LIMITS, type PlanType } from '@/lib/server/subscriptionLimits';

export { OPTIONS } from '@/lib/server/apiUtils';

export const dynamic = 'force-dynamic';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, context: RouteContext): Promise<Response> {
  const origin = request.headers.get('origin');
  const { admin, error } = await requireAdmin(request);
  if (!admin) return error;

  const { id } = await context.params;

  try {
    const user = await getDb().user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        subscriptionTier: true,
        subscriptionStatus: true,
        stripeCustomerId: true,
        isSuspended: true,
        cvCreatedCount: true,
        aiUsedCount: true,
        aiUsedToday: true,
        downloadCount: true,
        coverLetterCount: true,
        trialEndsAt: true,
        hasUsedTrial: true,
        country: true,
        countryCode: true,
        createdAt: true,
        updatedAt: true,
        resumes: {
          select: {
            id: true,
            title: true,
            templateLayout: true,
            templateTheme: true,
            createdAt: true,
            updatedAt: true,
          },
          orderBy: { createdAt: 'desc' },
          take: 20,
        },
        payments: {
          select: {
            id: true,
            amount: true,
            currency: true,
            status: true,
            type: true,
            plan: true,
            createdAt: true,
          },
          orderBy: { createdAt: 'desc' },
          take: 20,
        },
      },
    });

    if (!user) {
      return jsonResponse({ detail: 'User not found' }, 404, origin);
    }

    // Mirrors backend getUsageStatus() (subscriptionLimits middleware)
    const plan = PLAN_LIMITS[(user.subscriptionTier as PlanType) || 'free'] || PLAN_LIMITS.free;
    const usageStatus = {
      tier: user.subscriptionTier || 'free',
      usage: {
        cv: { used: user.cvCreatedCount, limit: plan.cvLimit },
        ai: { used: user.aiUsedCount, limit: plan.aiLimit },
        aiToday: { used: user.aiUsedToday, limit: plan.aiLimit },
        download: { used: user.downloadCount, limit: plan.downloadLimit },
        coverLetter: { used: user.coverLetterCount, limit: plan.coverLetterLimit },
      },
    };

    return jsonResponse({ ...user, usageStatus }, 200, origin);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to get user';
    return jsonResponse({ detail: message }, 500, origin);
  }
}

export async function PUT(request: Request, context: RouteContext): Promise<Response> {
  const origin = request.headers.get('origin');
  const { admin, error } = await requireAdmin(request);
  if (!admin) return error;

  const { id } = await context.params;

  try {
    const body = (await request.json()) as {
      name?: string;
      role?: string;
      subscriptionTier?: string;
      isSuspended?: boolean;
    };
    const { name, role, subscriptionTier, isSuspended } = body;

    // Prevent admin from demoting themselves
    if (id === admin.id && role && role !== 'admin') {
      return jsonResponse({ detail: 'Cannot demote your own admin account' }, 400, origin);
    }

    const user = await getDb().user.update({
      where: { id },
      data: { name, role, subscriptionTier, isSuspended },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        subscriptionTier: true,
        isSuspended: true,
      },
    });

    return jsonResponse(user, 200, origin);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to update user';
    return jsonResponse({ detail: message }, 500, origin);
  }
}

export async function DELETE(request: Request, context: RouteContext): Promise<Response> {
  const origin = request.headers.get('origin');
  const { admin, error } = await requireAdmin(request);
  if (!admin) return error;

  const { id } = await context.params;

  // Prevent admin from deleting themselves
  if (id === admin.id) {
    return jsonResponse({ detail: 'Cannot delete your own admin account' }, 400, origin);
  }

  try {
    // Cascade deletes resumes/payments via onDelete: Cascade
    await getDb().user.delete({ where: { id } });
    return new Response(null, { status: 204, headers: corsHeaders(origin) });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to delete user';
    return jsonResponse({ detail: message }, 500, origin);
  }
}
