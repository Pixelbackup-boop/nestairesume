/**
 * /api/v1/admin/trustpilot/settings — Admin Trustpilot widget settings read/save.
 * Ported from backend GET/POST /admin/trustpilot/settings
 * (trustpilotSettingsService); settings live in the AppSetting D1 table
 * instead of a JSON file on disk.
 */
import { getDb } from '@/lib/server/db';
import { jsonResponse } from '@/lib/server/apiUtils';
import { requireAdmin } from '@/lib/server/adminGuard';
import { getSetting, saveSetting, type TrustpilotSettings } from '@/lib/server/settingsService';

export { OPTIONS } from '@/lib/server/apiUtils';

export const dynamic = 'force-dynamic';

export async function GET(request: Request): Promise<Response> {
  const origin = request.headers.get('origin');
  const { admin, error } = await requireAdmin(request);
  if (!admin) return error;

  try {
    const settings = await getSetting(getDb(), 'trustpilot');
    return jsonResponse(settings, 200, origin);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to get trustpilot settings';
    return jsonResponse({ detail: message }, 500, origin);
  }
}

export async function POST(request: Request): Promise<Response> {
  const origin = request.headers.get('origin');
  const { admin, error } = await requireAdmin(request);
  if (!admin) return error;

  try {
    const body = (await request.json()) as Partial<TrustpilotSettings>;
    const settings = await saveSetting(getDb(), 'trustpilot', body);
    return jsonResponse(settings, 200, origin);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to save trustpilot settings';
    return jsonResponse({ detail: message }, 500, origin);
  }
}
