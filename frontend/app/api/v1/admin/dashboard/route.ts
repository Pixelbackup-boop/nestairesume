/**
 * GET /api/v1/admin/dashboard — Admin dashboard stats.
 * Ported from backend GET /admin/dashboard (adminService.getDashboardStats).
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
    const db = getDb();
    const [
      totalUsers,
      totalResumes,
      totalBlogPosts,
      publishedPosts,
      totalPayments,
      recentUsers,
      recentPayments,
      revenue,
    ] = await Promise.all([
      db.user.count(),
      db.resume.count(),
      db.blogPost.count(),
      db.blogPost.count({ where: { published: true } }),
      db.payment.count(),
      db.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
          subscriptionTier: true,
          country: true,
          countryCode: true,
        },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
      db.payment.findMany({
        include: { user: { select: { email: true, name: true } } },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
      db.payment.aggregate({
        where: { status: 'succeeded' },
        _sum: { amount: true },
      }),
    ]);

    return jsonResponse(
      {
        totalUsers,
        totalResumes,
        totalBlogPosts,
        publishedPosts,
        totalPayments,
        totalRevenue: revenue._sum.amount || 0,
        recentUsers,
        recentPayments,
      },
      200,
      origin
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to get dashboard stats';
    return jsonResponse({ detail: message }, 500, origin);
  }
}
