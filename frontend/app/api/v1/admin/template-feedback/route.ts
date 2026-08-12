/**
 * GET /api/v1/admin/template-feedback — Paginated template feedback list.
 * Ported from backend GET /admin/template-feedback (backend/src/routes/admin.ts).
 */
import { getDb } from '@/lib/server/db';
import { jsonResponse } from '@/lib/server/apiUtils';
import { requireAdmin } from '@/lib/server/adminGuard';

export { OPTIONS } from '@/lib/server/apiUtils';

export const dynamic = 'force-dynamic';

const FEEDBACK_STATUSES = ['pending', 'reviewed', 'resolved'];

export async function GET(request: Request): Promise<Response> {
  const origin = request.headers.get('origin');
  const { admin, error } = await requireAdmin(request);
  if (!admin) return error;

  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '', 10) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') ?? '', 10) || 20));
    const status = searchParams.get('status');
    const templateId = searchParams.get('templateId');
    const skip = (page - 1) * limit;

    const where: { status?: string; templateId?: string } = {};
    if (status && FEEDBACK_STATUSES.includes(status)) {
      where.status = status;
    }
    if (templateId) {
      where.templateId = templateId;
    }

    const db = getDb();
    const [feedback, total] = await Promise.all([
      db.templateFeedback.findMany({
        where,
        select: {
          id: true,
          templateId: true,
          type: true,
          message: true,
          status: true,
          adminNote: true,
          createdAt: true,
          user: { select: { id: true, name: true, email: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      db.templateFeedback.count({ where }),
    ]);

    return jsonResponse({ feedback, total, page, totalPages: Math.ceil(total / limit) }, 200, origin);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to get feedback';
    return jsonResponse({ detail: message }, 500, origin);
  }
}
