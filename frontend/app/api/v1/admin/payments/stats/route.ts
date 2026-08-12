/**
 * GET /api/v1/admin/payments/stats — Revenue aggregates for the admin payments page.
 * Ported from backend GET /admin/payments/stats (adminService.getPaymentStats).
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
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const [totalRevenueResult, monthlyRevenueResult, totalPayments] = await Promise.all([
      db.payment.aggregate({
        where: { status: 'succeeded' },
        _sum: { amount: true },
      }),
      db.payment.aggregate({
        where: { status: 'succeeded', createdAt: { gte: monthStart } },
        _sum: { amount: true },
      }),
      db.payment.count({ where: { status: 'succeeded' } }),
    ]);

    const totalRevenue = totalRevenueResult._sum.amount || 0;
    const monthlyRevenue = monthlyRevenueResult._sum.amount || 0;
    const averageOrderValue = totalPayments > 0 ? Math.round(totalRevenue / totalPayments) : 0;

    return jsonResponse(
      { totalRevenue, monthlyRevenue, totalPayments, averageOrderValue },
      200,
      origin
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to get payment stats';
    return jsonResponse({ detail: message }, 500, origin);
  }
}
