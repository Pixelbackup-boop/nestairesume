/**
 * /api/v1/admin/blog/[id] — Admin blog post detail, update, delete.
 * Ported from backend GET/PUT/DELETE /admin/blog/:id.
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
    const post = await getDb().blogPost.findUnique({ where: { id } });

    if (!post) {
      return jsonResponse({ detail: 'Blog post not found' }, 404, origin);
    }

    // Tags stay a raw JSON string here (backend pre-parsed them): the edit page
    // JSON.parses post.tags itself, and its save path breaks on a pre-parsed array
    return jsonResponse(post, 200, origin);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to get blog post';
    return jsonResponse({ detail: message }, 500, origin);
  }
}

interface BlogPostUpdateData {
  slug?: string;
  title?: string;
  description?: string;
  content?: string;
  image?: string;
  imageAlt?: string;
  category?: string;
  author?: string;
  featured?: boolean;
  published?: boolean;
  tags?: string;
  publishedAt?: Date | null;
}

export async function PUT(request: Request, context: RouteContext): Promise<Response> {
  const origin = request.headers.get('origin');
  const { admin, error } = await requireAdmin(request);
  if (!admin) return error;

  const { id } = await context.params;

  try {
    const body = (await request.json()) as {
      slug?: string;
      title?: string;
      description?: string;
      content?: string;
      image?: string;
      imageAlt?: string;
      category?: string;
      tags?: string[] | string;
      author?: string;
      featured?: boolean;
      published?: boolean;
      publishedAt?: string | null;
      postType?: string;
    };

    // Only known columns — the edit form also sends postType, which isn't in the schema
    const data: BlogPostUpdateData = {
      slug: body.slug,
      title: body.title,
      description: body.description,
      content: body.content,
      image: body.image,
      imageAlt: body.imageAlt,
      category: body.category,
      author: body.author,
      featured: body.featured,
      published: body.published,
    };

    if (body.tags !== undefined) {
      // The admin UI JSON.stringifies the tag array before sending — don't double-encode
      data.tags = typeof body.tags === 'string' ? body.tags : JSON.stringify(body.tags);
    }
    if (body.publishedAt !== undefined) {
      data.publishedAt = body.publishedAt === null ? null : new Date(body.publishedAt);
    }

    // Set publishedAt when publishing for the first time. Sequential awaits on
    // purpose — D1 rejects interactive transactions
    if (body.published) {
      const existing = await getDb().blogPost.findUnique({
        where: { id },
        select: { published: true },
      });
      if (existing && !existing.published) {
        data.publishedAt = new Date();
      }
    }

    const post = await getDb().blogPost.update({ where: { id }, data });

    return jsonResponse({ ...post, tags: JSON.parse(post.tags) as string[] }, 200, origin);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to update blog post';
    return jsonResponse({ detail: message }, 500, origin);
  }
}

export async function DELETE(request: Request, context: RouteContext): Promise<Response> {
  const origin = request.headers.get('origin');
  const { admin, error } = await requireAdmin(request);
  if (!admin) return error;

  const { id } = await context.params;

  try {
    await getDb().blogPost.delete({ where: { id } });
    return new Response(null, { status: 204, headers: corsHeaders(origin) });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to delete blog post';
    return jsonResponse({ detail: message }, 500, origin);
  }
}
