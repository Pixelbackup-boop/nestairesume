/**
 * GET /api/v1/admin/users — Paginated user list with optional search.
 * Ported from backend GET /admin/users (adminService.getAllUsers).
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

  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || '1', 10) || 1;
  const limit = parseInt(url.searchParams.get('limit') || '20', 10) || 20;
  const search = url.searchParams.get('search') || undefined;
  const skip = (page - 1) * limit;

  const where = search
    ? { OR: [{ email: { contains: search } }, { name: { contains: search } }] }
    : {};

  try {
    const db = getDb();
    const [users, total] = await Promise.all([
      db.user.findMany({
        where,
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          subscriptionTier: true,
          subscriptionStatus: true,
          isSuspended: true,
          country: true,
          countryCode: true,
          createdAt: true,
          updatedAt: true,
          _count: { select: { resumes: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      db.user.count({ where }),
    ]);

    return jsonResponse(
      {
        users: users.map((u) => ({
          ...u,
          resumeCount: u._count.resumes,
          _count: undefined,
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
    const message = err instanceof Error ? err.message : 'Failed to get users';
    return jsonResponse({ detail: message }, 500, origin);
  }
}
