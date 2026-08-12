/**
 * POST /api/v1/admin/auto-blog/generate — AI post generation (not ported).
 * The Express backend generated posts through the OpenAI SDK
 * (aiBlogService.generatePostsFromContent with circuit breaker + retry).
 * That engine has not been ported to Workers, so this returns an honest 501
 * instead of failing opaquely.
 */
import { jsonResponse } from '@/lib/server/apiUtils';
import { requireAdmin } from '@/lib/server/adminGuard';

export { OPTIONS } from '@/lib/server/apiUtils';

export const dynamic = 'force-dynamic';

export async function POST(request: Request): Promise<Response> {
  const origin = request.headers.get('origin');
  const { admin, error } = await requireAdmin(request);
  if (!admin) return error;

  return jsonResponse(
    { detail: 'AI post generation is not available on this deployment yet' },
    501,
    origin
  );
}
