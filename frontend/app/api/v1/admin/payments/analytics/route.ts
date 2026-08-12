/**
 * GET /api/v1/admin/payments/analytics — Revenue chart data.
 * Ported from backend GET /admin/payments/analytics (adminService.getPaymentAnalytics).
 * Loads all succeeded payments and aggregates in JS — admin-only, volume is manageable.
 */
import { getDb } from '@/lib/server/db';
import { jsonResponse } from '@/lib/server/apiUtils';
import { requireAdmin } from '@/lib/server/adminGuard';

export { OPTIONS } from '@/lib/server/apiUtils';

export const dynamic = 'force-dynamic';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export async function GET(request: Request): Promise<Response> {
  const origin = request.headers.get('origin');
  const { admin, error } = await requireAdmin(request);
  if (!admin) return error;

  try {
    const db = getDb();
    const now = new Date();

    const payments = await db.payment.findMany({
      where: { status: 'succeeded' },
      select: { amount: true, plan: true, createdAt: true, userId: true },
      orderBy: { createdAt: 'asc' },
    });

    // Daily revenue (last 30 days)
    const thirtyDaysAgo = new Date(now);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const dailyMap = new Map<string, { revenue: number; count: number }>();
    for (let i = 0; i < 30; i++) {
      const d = new Date(thirtyDaysAgo);
      d.setDate(d.getDate() + i);
      dailyMap.set(d.toISOString().slice(0, 10), { revenue: 0, count: 0 });
    }
    for (const p of payments) {
      const key = p.createdAt.toISOString().slice(0, 10);
      const entry = dailyMap.get(key);
      if (entry) {
        entry.revenue += p.amount;
        entry.count += 1;
      }
    }
    const dailyRevenue = Array.from(dailyMap.entries()).map(([date, data]) => ({
      date,
      revenue: data.revenue,
      count: data.count,
    }));

    // Monthly revenue (last 12 months)
    const monthlyMap = new Map<string, { revenue: number; count: number }>();
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      monthlyMap.set(key, { revenue: 0, count: 0 });
    }
    for (const p of payments) {
      const key = `${p.createdAt.getFullYear()}-${String(p.createdAt.getMonth() + 1).padStart(2, '0')}`;
      const entry = monthlyMap.get(key);
      if (entry) {
        entry.revenue += p.amount;
        entry.count += 1;
      }
    }
    const monthlyRevenue = Array.from(monthlyMap.entries()).map(([key, data]) => ({
      month: MONTH_NAMES[parseInt(key.split('-')[1], 10) - 1],
      revenue: data.revenue,
      count: data.count,
    }));

    // Revenue by plan
    const revenueByPlan: Record<string, { revenue: number; count: number }> = {};
    for (const p of payments) {
      const plan = p.plan || 'other';
      if (!revenueByPlan[plan]) revenueByPlan[plan] = { revenue: 0, count: 0 };
      revenueByPlan[plan].revenue += p.amount;
      revenueByPlan[plan].count += 1;
    }

    // Month-over-month growth
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const previousMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    let currentMonthRevenue = 0;
    let previousMonthRevenue = 0;
    for (const p of payments) {
      if (p.createdAt >= currentMonthStart) {
        currentMonthRevenue += p.amount;
      } else if (p.createdAt >= previousMonthStart && p.createdAt < currentMonthStart) {
        previousMonthRevenue += p.amount;
      }
    }
    const percentChange =
      previousMonthRevenue > 0
        ? Math.round(((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100)
        : currentMonthRevenue > 0
          ? 100
          : 0;
    const growth = {
      currentMonth: currentMonthRevenue,
      previousMonth: previousMonthRevenue,
      percentChange,
    };

    // Top customers
    const customerMap = new Map<string, { totalSpent: number; count: number }>();
    for (const p of payments) {
      const entry = customerMap.get(p.userId) || { totalSpent: 0, count: 0 };
      entry.totalSpent += p.amount;
      entry.count += 1;
      customerMap.set(p.userId, entry);
    }
    const topUserIds = Array.from(customerMap.entries())
      .sort((a, b) => b[1].totalSpent - a[1].totalSpent)
      .slice(0, 5);
    const topUsers =
      topUserIds.length > 0
        ? await db.user.findMany({
            where: { id: { in: topUserIds.map(([id]) => id) } },
            select: { id: true, name: true, email: true },
          })
        : [];
    const topCustomers = topUserIds.map(([userId, data]) => {
      const user = topUsers.find((u) => u.id === userId);
      return {
        name: user?.name || 'Unknown',
        email: user?.email || '',
        totalSpent: data.totalSpent,
        count: data.count,
      };
    });

    return jsonResponse({ dailyRevenue, monthlyRevenue, revenueByPlan, growth, topCustomers }, 200, origin);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to get payment analytics';
    return jsonResponse({ detail: message }, 500, origin);
  }
}
