/**
 * /api/v1/admin/auto-blog/content/[id] — Content source detail and delete.
 * Ported from backend GET/DELETE /admin/auto-blog/content/:id.
 */
import { getDb } from '@/lib/server/db';
import { corsHeaders, jsonResponse } from '@/lib/server/apiUtils';
import { requireAdmin } from '@/lib/server/adminGuard';

export { OPTIONS } from '@/lib/server/apiUtils';

export const dynamic = 'force-dynamic';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, context: RouteContext): Promise<Response> {
  const origin = request.headers.get('origin');
  const { admin, error } = await requireAdmin(request);
  if (!admin) return error;

  const { id } = await context.params;

  try {
    // Full record including extracted content, matching backend getContentSourceById
    const source = await getDb().contentSource.findUnique({ where: { id } });

    if (!source) {
      return jsonResponse({ detail: 'Content source not found' }, 404, origin);
    }

    return jsonResponse(source, 200, origin);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to get content source';
    return jsonResponse({ detail: message }, 500, origin);
  }
}

export async function DELETE(request: Request, context: RouteContext): Promise<Response> {
  const origin = request.headers.get('origin');
  const { admin, error } = await requireAdmin(request);
  if (!admin) return error;

  const { id } = await context.params;

  try {
    // Related ScheduledPost.sourceId becomes null via onDelete: SetNull
    await getDb().contentSource.delete({ where: { id } });
    return new Response(null, { status: 204, headers: corsHeaders(origin) });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to delete content source';
    return jsonResponse({ detail: message }, 500, origin);
  }
}
