/**
 * GET /api/v1/admin/analytics/countries — Users and revenue grouped by country.
 * Ported from backend GET /admin/analytics/countries (adminService.getCountryAnalytics).
 * Rows are empty until users register with country capture — expected, not a bug.
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

    // All users grouped by country
    const usersByCountry = await db.user.groupBy({
      by: ['countryCode', 'country'],
      _count: { id: true },
      where: { countryCode: { not: null } },
      orderBy: { _count: { id: 'desc' } },
    });

    // Paid users: users with at least one succeeded payment, grouped by country
    const paidUsers = await db.user.findMany({
      where: {
        countryCode: { not: null },
        payments: { some: { status: 'succeeded' } },
      },
      select: {
        countryCode: true,
        country: true,
        payments: {
          where: { status: 'succeeded' },
          select: { amount: true },
        },
      },
    });

    const paidByCountryMap = new Map<string, { country: string; users: number; revenue: number }>();
    for (const user of paidUsers) {
      // Non-null: the where clause excludes null countryCode
      const code = user.countryCode as string;
      const entry = paidByCountryMap.get(code) || {
        country: user.country || code,
        users: 0,
        revenue: 0,
      };
      entry.users += 1;
      entry.revenue += user.payments.reduce((sum, p) => sum + p.amount, 0);
      paidByCountryMap.set(code, entry);
    }

    const revenueByCountry = Array.from(paidByCountryMap.entries())
      .map(([countryCode, data]) => ({
        countryCode,
        country: data.country,
        paidUsers: data.users,
        revenue: data.revenue,
      }))
      .sort((a, b) => b.revenue - a.revenue);

    return jsonResponse(
      {
        usersByCountry: usersByCountry.map((row) => ({
          countryCode: row.countryCode as string,
          country: row.country || (row.countryCode as string),
          count: row._count.id,
        })),
        revenueByCountry,
      },
      200,
      origin
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to get country analytics';
    return jsonResponse({ detail: message }, 500, origin);
  }
}
