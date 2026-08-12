/**
 * GET /api/v1/trustpilot/settings — public Trustpilot widget config. No auth;
 * returns only what Footer.tsx needs to render the review collector.
 * Ported from backend GET /trustpilot/settings, including its cache policy.
 */
import { getDb } from '@/lib/server/db';
import { jsonResponse } from '@/lib/server/apiUtils';
import { getSetting } from '@/lib/server/settingsService';

export { OPTIONS } from '@/lib/server/apiUtils';

export const dynamic = 'force-dynamic';

export async function GET(request: Request): Promise<Response> {
  const origin = request.headers.get('origin');

  try {
    const settings = await getSetting(getDb(), 'trustpilot');
    const response = jsonResponse(
      {
        enabled: settings.enabled,
        businessUnitId: settings.businessUnitId,
        templateId: settings.templateId,
        locale: settings.locale,
      },
      200,
      origin
    );
    response.headers.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=600');
    return response;
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to get trustpilot settings';
    return jsonResponse({ detail: message }, 500, origin);
  }
}
