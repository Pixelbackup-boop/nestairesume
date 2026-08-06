/**
 * GET /api/v1/ads/enabled — ads are not configured on the Workers deployment
 * (see ../settings/route.ts).
 */
import { jsonResponse } from '@/lib/server/apiUtils';

export { OPTIONS } from '@/lib/server/apiUtils';

export const dynamic = 'force-dynamic';

export async function GET(request: Request): Promise<Response> {
  return jsonResponse({ enabled: false }, 200, request.headers.get('origin'));
}
