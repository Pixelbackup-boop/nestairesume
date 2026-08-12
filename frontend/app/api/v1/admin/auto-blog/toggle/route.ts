/**
 * POST /api/v1/admin/auto-blog/toggle — Enable/disable auto-posting.
 * Ported from backend POST /admin/auto-blog/toggle.
 */
import { getDb } from '@/lib/server/db';
import { jsonResponse } from '@/lib/server/apiUtils';
import { requireAdmin } from '@/lib/server/adminGuard';
import { getAutoBlogSettings } from '@/lib/server/autoBlog';

export { OPTIONS } from '@/lib/server/apiUtils';

export const dynamic = 'force-dynamic';

export async function POST(request: Request): Promise<Response> {
  const origin = request.headers.get('origin');
  const { admin, error } = await requireAdmin(request);
  if (!admin) return error;

  try {
    // The settings page POSTs with no body and expects a flip; the dashboard
    // sends {enabled} explicitly. (The backend silently no-op'd the bodyless
    // call — the UI's intent wins here.)
    let body: { enabled?: boolean } = {};
    try {
      body = (await request.json()) as { enabled?: boolean };
    } catch {
      // No/invalid JSON body — treat as a flip request
    }

    const db = getDb();
    const settings = await getAutoBlogSettings(db);
    const enabled = typeof body.enabled === 'boolean' ? body.enabled : !settings.enabled;

    const updated = await db.autoBlogSettings.update({
      where: { id: settings.id },
      data: { enabled },
    });

    return jsonResponse({ enabled: updated.enabled }, 200, origin);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to toggle auto-posting';
    return jsonResponse({ detail: message }, 500, origin);
  }
}
