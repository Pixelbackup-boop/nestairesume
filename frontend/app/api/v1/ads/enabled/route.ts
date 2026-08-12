/**
 * GET /api/v1/ads/enabled — whether ads are on. No auth.
 * Ported from backend GET /ads/enabled (areAdsEnabled), now read from the
 * AppSetting D1 table; errors report { enabled: false } with a 500, matching
 * the backend.
 */
import { getDb } from '@/lib/server/db';
import { jsonResponse } from '@/lib/server/apiUtils';
import { getSetting } from '@/lib/server/settingsService';

export { OPTIONS } from '@/lib/server/apiUtils';

export const dynamic = 'force-dynamic';

export async function GET(request: Request): Promise<Response> {
  const origin = request.headers.get('origin');

  try {
    const settings = await getSetting(getDb(), 'ads');
    const response = jsonResponse({ enabled: settings.adsEnabled }, 200, origin);
    response.headers.set('Cache-Control', 'public, max-age=60');
    return response;
  } catch {
    return jsonResponse({ enabled: false }, 500, origin);
  }
}
