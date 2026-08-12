/**
 * GET /api/v1/ads/settings — public ad display config. No auth; exposes only
 * the safe subset of the admin ad settings, now read from the AppSetting D1
 * table (previously hardcoded defaults while ads were unconfigured on Workers).
 * Ported from backend GET /ads/settings: estimatedMonthlyViews stays
 * admin-only, hasPublisherId masks presence, but publisherId itself is still
 * returned for the AdSense script loader — same exposure as the backend.
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
    const response = jsonResponse(
      {
        adsEnabled: settings.adsEnabled,
        usePlaceholders: settings.usePlaceholders,
        hasPublisherId: !!settings.adsensePublisherId,
        publisherId: settings.adsensePublisherId || '',
        slots: settings.slots,
      },
      200,
      origin
    );
    response.headers.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=600');
    return response;
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to get ad settings';
    return jsonResponse({ detail: message }, 500, origin);
  }
}
