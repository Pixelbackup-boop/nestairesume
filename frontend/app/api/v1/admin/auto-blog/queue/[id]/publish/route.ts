/**
 * POST /api/v1/admin/auto-blog/queue/[id]/publish — Publish a scheduled post now.
 * Ported from backend POST /admin/auto-blog/queue/:id/publish (aiBlogService.publishPost).
 *
 * NOTE: the public blog currently renders MDX content only, so DB-published
 * posts are stored but not yet rendered publicly.
 */
import { getDb } from '@/lib/server/db';
import { jsonResponse } from '@/lib/server/apiUtils';
import { requireAdmin } from '@/lib/server/adminGuard';
import { getAutoBlogSettings } from '@/lib/server/autoBlog';

export { OPTIONS } from '@/lib/server/apiUtils';

export const dynamic = 'force-dynamic';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(request: Request, context: RouteContext): Promise<Response> {
  const origin = request.headers.get('origin');
  const { admin, error } = await requireAdmin(request);
  if (!admin) return error;

  const { id } = await context.params;

  try {
    const db = getDb();

    const scheduledPost = await db.scheduledPost.findUnique({ where: { id } });
    if (!scheduledPost) {
      return jsonResponse({ detail: 'Scheduled post not found' }, 404, origin);
    }

    const settings = await getAutoBlogSettings(db);

    // D1 rejects interactive transactions — plain sequential writes, same order
    // as backend publishPost (create blog post, then mark the queue entry)
    const blogPost = await db.blogPost.create({
      data: {
        slug: scheduledPost.slug,
        title: scheduledPost.title,
        description: scheduledPost.description,
        content: scheduledPost.content,
        category: scheduledPost.category,
        // Both columns hold a JSON-encoded string array — passthrough
        tags: scheduledPost.tags,
        author: settings.authorName,
        published: true,
        publishedAt: new Date(),
      },
    });

    await db.scheduledPost.update({
      where: { id },
      data: { status: 'published', blogPostId: blogPost.id },
    });

    return jsonResponse(blogPost, 200, origin);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to publish post';
    return jsonResponse({ detail: message }, 500, origin);
  }
}
