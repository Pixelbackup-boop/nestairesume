/**
 * GET /api/v1/admin/payments — Paginated payment list.
 * Ported from backend GET /admin/payments (adminService.getAllPayments).
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
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '', 10) || 1;
    const limit = parseInt(searchParams.get('limit') || '', 10) || 20;
    const skip = (page - 1) * limit;

    const db = getDb();
    const [payments, total] = await Promise.all([
      // Backend used include:{user} (all payment scalars + user); select mirrors that
      db.payment.findMany({
        select: {
          id: true,
          userId: true,
          stripePaymentId: true,
          amount: true,
          currency: true,
          status: true,
          type: true,
          plan: true,
          createdAt: true,
          user: {
            select: { id: true, email: true, name: true, country: true, countryCode: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      db.payment.count(),
    ]);

    return jsonResponse(
      {
        payments,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      200,
      origin
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to get payments';
    return jsonResponse({ detail: message }, 500, origin);
  }
}
