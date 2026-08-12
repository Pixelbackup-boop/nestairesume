/**
 * GET /api/v1/admin/auto-blog/content — List content sources.
 * Ported from backend GET /admin/auto-blog/content (pdfContentService.getAllContentSources).
 */
import { getDb } from '@/lib/server/db';
import { jsonResponse } from '@/lib/server/apiUtils';
import { requireAdmin } from '@/lib/server/adminGuard';

export { OPTIONS } from '@/lib/server/apiUtils';

export const dynamic = 'force-dynamic';

export async function GET(request: Request): Promise<Response> {
  const origin = request.headers.get('origin');
  const { admin, error } = await requireAdmin(request);
  if (!admin) return error;

  try {
    const sources = await getDb().contentSource.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        filename: true,
        type: true,
        pageCount: true,
        createdAt: true,
        _count: {
          select: { scheduledPosts: true },
        },
      },
    });

    return jsonResponse(sources, 200, origin);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to get content sources';
    return jsonResponse({ detail: message }, 500, origin);
  }
}
