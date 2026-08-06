/**
 * GET /api/v1/ads/settings — public ad display config.
 *
 * The Express backend read this from a JSON file on disk (admin-editable);
 * that file died with the GCP deployment and Workers has no fs. Ads are not
 * configured on the new infrastructure, so this serves the safe defaults the
 * backend used for a fresh install (ads disabled). Wire to D1 if/when the
 * admin ads panel is rebuilt.
 */
import { jsonResponse } from '@/lib/server/apiUtils';

export { OPTIONS } from '@/lib/server/apiUtils';

export const dynamic = 'force-dynamic';

const PUBLIC_AD_SETTINGS = {
  adsEnabled: false,
  usePlaceholders: true,
  hasPublisherId: false,
  publisherId: '',
  slots: {
    blogInArticle: '',
    resumeInArticle: '',
    careerInArticle: '',
    toolsRewarded: '',
    sidebarDisplay: '',
    leaderboard: '',
    multiplex: '',
    toolsBetweenSection: '',
  },
};

export async function GET(request: Request): Promise<Response> {
  const origin = request.headers.get('origin');
  const response = jsonResponse(PUBLIC_AD_SETTINGS, 200, origin);
  response.headers.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=600');
  return response;
}
