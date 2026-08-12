/**
 * /api/v1/admin/blog — Admin blog post list + create.
 * Ported from backend GET/POST /admin/blog (adminService.getAllBlogPosts, createBlogPost).
 */
import { getDb } from '@/lib/server/db';
import { jsonResponse } from '@/lib/server/apiUtils';
import { requireAdmin } from '@/lib/server/adminGuard';

export { OPTIONS } from '@/lib/server/apiUtils';

export const dynamic = 'force-dynamic';

/** Prisma P2002 or raw D1 "UNIQUE constraint failed" — backend matched on message text */
function isUniqueConstraintError(err: unknown): boolean {
  const code = (err as { code?: string } | null)?.code;
  const message = err instanceof Error ? err.message : '';
  return code === 'P2002' || /unique constraint/i.test(message);
}

export async function GET(request: Request): Promise<Response> {
  const origin = request.headers.get('origin');
  const { admin, error } = await requireAdmin(request);
  if (!admin) return error;

  const url = new URL(request.url);
  const limit = parseInt(url.searchParams.get('limit') || '20', 10) || 20;
  const page = parseInt(url.searchParams.get('page') || '1', 10) || 1;
  const skipParam = url.searchParams.get('skip');
  // Backend took ?skip; the admin list UI sends ?page — honor both
  const skip = skipParam !== null ? parseInt(skipParam, 10) || 0 : (page - 1) * limit;
  const search = url.searchParams.get('search') || undefined;

  const where = search
    ? {
        OR: [
          { title: { contains: search } },
          { slug: { contains: search } },
          { category: { contains: search } },
        ],
      }
    : {};

  try {
    const db = getDb();
    const [posts, total] = await Promise.all([
      db.blogPost.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      db.blogPost.count({ where }),
    ]);

    return jsonResponse(
      {
        posts: posts.map((post) => ({
          ...post,
          tags: JSON.parse(post.tags || '[]') as string[],
        })),
        total,
        pages: Math.ceil(total / limit),
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      200,
      origin
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to get blog posts';
    return jsonResponse({ detail: message }, 500, origin);
  }
}

export async function POST(request: Request): Promise<Response> {
  const origin = request.headers.get('origin');
  const { admin, error } = await requireAdmin(request);
  if (!admin) return error;

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
    };
    const { slug, title, description, content, image, imageAlt, category, tags, author, featured, published } = body;

    if (!slug || !title || !description || !content || !category || !author) {
      return jsonResponse(
        { detail: 'Missing required fields: slug, title, description, content, category, author' },
        400,
        origin
      );
    }

    // The admin UI JSON.stringifies the tag array before sending — don't double-encode
    const encodedTags =
      typeof tags === 'string' ? tags : JSON.stringify(tags || []);

    const post = await getDb().blogPost.create({
      data: {
        slug,
        title,
        description,
        content,
        image,
        imageAlt,
        category,
        tags: encodedTags,
        author,
        featured: featured || false,
        published: published || false,
        publishedAt: published ? new Date() : null,
      },
    });

    return jsonResponse({ ...post, tags: JSON.parse(post.tags) as string[] }, 201, origin);
  } catch (err) {
    if (isUniqueConstraintError(err)) {
      return jsonResponse({ detail: 'A blog post with this slug already exists' }, 400, origin);
    }
    const message = err instanceof Error ? err.message : 'Failed to create blog post';
    return jsonResponse({ detail: message }, 500, origin);
  }
}
