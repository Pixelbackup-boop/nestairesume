/**
 * POST /api/v1/admin/auto-blog/content/upload — PDF upload (not ported).
 * The Express backend used multer + pdf-parse, Node-only libraries that do not
 * run on Cloudflare Workers. Until a Workers-compatible extraction path exists,
 * this returns an honest 501 instead of failing opaquely.
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
    { detail: 'PDF upload/extraction is not available on this deployment yet' },
    501,
    origin
  );
}
