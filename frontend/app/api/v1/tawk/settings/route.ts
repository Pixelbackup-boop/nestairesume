/**
 * GET /api/v1/tawk/settings — public tawk.to widget config. No auth; returns
 * only what the widget loader needs (tawkConfig.ts).
 *
 * The backend served this no-store; a short cache is used here instead so
 * widget fetches don't hammer D1. The client already caches for 15s, so the
 * admin toggle still reflects within ~1 minute.
 */
import { getDb } from '@/lib/server/db';
import { jsonResponse } from '@/lib/server/apiUtils';
import { getSetting } from '@/lib/server/settingsService';

export { OPTIONS } from '@/lib/server/apiUtils';

export const dynamic = 'force-dynamic';

export async function GET(request: Request): Promise<Response> {
  const origin = request.headers.get('origin');

  try {
    const settings = await getSetting(getDb(), 'tawk');
    const response = jsonResponse(
      {
        enabled: settings.enabled,
        propertyId: settings.propertyId,
        widgetId: settings.widgetId,
      },
      200,
      origin
    );
    response.headers.set('Cache-Control', 'public, max-age=60');
    return response;
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to get tawk settings';
    return jsonResponse({ detail: message }, 500, origin);
  }
}
