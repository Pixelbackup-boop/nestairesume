/**
 * /api/v1/admin/auto-blog/settings — Auto-blog settings singleton.
 * Ported from backend GET/PUT /admin/auto-blog/settings
 * (schedulerService.getSettings / updateSettings).
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
    const settings = await getAutoBlogSettings(getDb());
    return jsonResponse(settings, 200, origin);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to get settings';
    return jsonResponse({ detail: message }, 500, origin);
  }
}

export async function PUT(request: Request): Promise<Response> {
  const origin = request.headers.get('origin');
  const { admin, error } = await requireAdmin(request);
  if (!admin) return error;

  try {
    const body = (await request.json()) as {
      postsPerDay?: number;
      startHour?: number;
      endHour?: number;
      enabled?: boolean;
      authorName?: string;
    };

    const db = getDb();
    const settings = await getAutoBlogSettings(db);

    // undefined fields are skipped by Prisma — partial update like the backend
    const updated = await db.autoBlogSettings.update({
      where: { id: settings.id },
      data: {
        postsPerDay: body.postsPerDay,
        startHour: body.startHour,
        endHour: body.endHour,
        enabled: body.enabled,
        authorName: body.authorName,
      },
    });

    return jsonResponse(updated, 200, origin);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to update settings';
    return jsonResponse({ detail: message }, 500, origin);
  }
}
