/**
 * GET /api/v1/admin/auto-blog/queue — List scheduled posts, optional ?status filter.
 * Ported from backend GET /admin/auto-blog/queue (aiBlogService.getScheduledPosts).
 */
import { getDb } from '@/lib/server/db';
import { jsonResponse } from '@/lib/server/apiUtils';
import { requireAdmin } from '@/lib/server/adminGuard';
import { SCHEDULED_POST_SELECT } from '@/lib/server/autoBlog';

export { OPTIONS } from '@/lib/server/apiUtils';

export const dynamic = 'force-dynamic';

export async function GET(request: Request): Promise<Response> {
  const origin = request.headers.get('origin');
  const { admin, error } = await requireAdmin(request);
  if (!admin) return error;

  try {
    const status = new URL(request.url).searchParams.get('status');

    const posts = await getDb().scheduledPost.findMany({
      where: status ? { status } : undefined,
      orderBy: { scheduledFor: 'asc' },
      select: SCHEDULED_POST_SELECT,
    });

    return jsonResponse(posts, 200, origin);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to get queue';
    return jsonResponse({ detail: message }, 500, origin);
  }
}
