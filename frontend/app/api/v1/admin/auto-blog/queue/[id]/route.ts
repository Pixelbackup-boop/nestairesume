/**
 * /api/v1/admin/auto-blog/queue/[id] — Scheduled post detail, update, delete.
 * Ported from backend GET/PUT/DELETE /admin/auto-blog/queue/:id.
 */
import { getDb } from '@/lib/server/db';
import { corsHeaders, jsonResponse } from '@/lib/server/apiUtils';
import { requireAdmin } from '@/lib/server/adminGuard';
import { SCHEDULED_POST_SELECT } from '@/lib/server/autoBlog';

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
    const post = await getDb().scheduledPost.findUnique({
      where: { id },
      select: SCHEDULED_POST_SELECT,
    });

    if (!post) {
      return jsonResponse({ detail: 'Post not found' }, 404, origin);
    }

    return jsonResponse(post, 200, origin);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to get post';
    return jsonResponse({ detail: message }, 500, origin);
  }
}

export async function PUT(request: Request, context: RouteContext): Promise<Response> {
  const origin = request.headers.get('origin');
  const { admin, error } = await requireAdmin(request);
  if (!admin) return error;

  const { id } = await context.params;

  try {
    // Editable fields mirror backend aiBlogService.updateScheduledPost
    const body = (await request.json()) as {
      title?: string;
      slug?: string;
      description?: string;
      content?: string;
      category?: string;
      tags?: string; // JSON-encoded array, stored as-is
      scheduledFor?: string;
      status?: string;
    };

    const post = await getDb().scheduledPost.update({
      where: { id },
      data: {
        title: body.title,
        slug: body.slug,
        description: body.description,
        content: body.content,
        category: body.category,
        tags: body.tags,
        scheduledFor: body.scheduledFor ? new Date(body.scheduledFor) : undefined,
        status: body.status,
      },
    });

    return jsonResponse(post, 200, origin);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to update post';
    return jsonResponse({ detail: message }, 500, origin);
  }
}

export async function DELETE(request: Request, context: RouteContext): Promise<Response> {
  const origin = request.headers.get('origin');
  const { admin, error } = await requireAdmin(request);
  if (!admin) return error;

  const { id } = await context.params;

  try {
    await getDb().scheduledPost.delete({ where: { id } });
    return new Response(null, { status: 204, headers: corsHeaders(origin) });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to delete post';
    return jsonResponse({ detail: message }, 500, origin);
  }
}
