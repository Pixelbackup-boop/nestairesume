/**
 * GET /api/v1/admin/auto-blog/status — Scheduler status + queue counts.
 * Ported from backend GET /admin/auto-blog/status (schedulerService.getSchedulerStatus).
 */
import { getDb } from '@/lib/server/db';
import { jsonResponse } from '@/lib/server/apiUtils';
import { requireAdmin } from '@/lib/server/adminGuard';
import { getAutoBlogSettings } from '@/lib/server/autoBlog';

export { OPTIONS } from '@/lib/server/apiUtils';

export const dynamic = 'force-dynamic';

export async function GET(request: Request): Promise<Response> {
  const origin = request.headers.get('origin');
  const { admin, error } = await requireAdmin(request);
  if (!admin) return error;

  try {
    const db = getDb();
    const settings = await getAutoBlogSettings(db);

    // Backend used server-local midnight; Workers run in UTC, so "today" is UTC-based
    const todayStart = new Date(new Date().setHours(0, 0, 0, 0));

    const [pendingReview, approvedQueue, publishedToday] = await Promise.all([
      db.scheduledPost.count({ where: { status: 'pending' } }),
      db.scheduledPost.count({ where: { status: 'approved' } }),
      db.scheduledPost.count({
        where: { status: 'published', updatedAt: { gte: todayStart } },
      }),
    ]);

    return jsonResponse(
      {
        enabled: settings.enabled,
        postsPerDay: settings.postsPerDay,
        startHour: settings.startHour,
        endHour: settings.endHour,
        authorName: settings.authorName,
        pendingReview,
        approvedQueue,
        publishedToday,
        // The backend's node-cron scheduler was never ported — Workers have no
        // long-running process, so no auto-publish loop exists on this deployment
        isRunning: false,
      },
      200,
      origin
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to get status';
    return jsonResponse({ detail: message }, 500, origin);
  }
}
