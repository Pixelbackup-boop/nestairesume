/**
 * POST /api/v1/admin/auto-blog/queue/[id]/approve — Approve a scheduled post.
 * Ported from backend POST /admin/auto-blog/queue/:id/approve (aiBlogService.approvePost).
 */
import { getDb } from '@/lib/server/db';
import { jsonResponse } from '@/lib/server/apiUtils';
import { requireAdmin } from '@/lib/server/adminGuard';

export { OPTIONS } from '@/lib/server/apiUtils';

export const dynamic = 'force-dynamic';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(request: Request, context: RouteContext): Promise<Response> {
  const origin = request.headers.get('origin');
  const { admin, error } = await requireAdmin(request);
  if (!admin) return error;

  const { id } = await context.params;

  try {
    // Returns the plain updated record (no source relation), matching backend approvePost
    const post = await getDb().scheduledPost.update({
      where: { id },
      data: { status: 'approved' },
    });

    return jsonResponse(post, 200, origin);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to approve post';
    return jsonResponse({ detail: message }, 500, origin);
  }
}
