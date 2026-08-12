/**
 * /api/v1/admin/template-feedback/[id] — Update or delete a feedback entry.
 * Ported from backend PATCH/DELETE /admin/template-feedback/:id (backend/src/routes/admin.ts).
 */
import { getDb } from '@/lib/server/db';
import { jsonResponse } from '@/lib/server/apiUtils';
import { requireAdmin } from '@/lib/server/adminGuard';

export { OPTIONS } from '@/lib/server/apiUtils';

export const dynamic = 'force-dynamic';

const FEEDBACK_STATUSES = ['pending', 'reviewed', 'resolved'];

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, context: RouteContext): Promise<Response> {
  const origin = request.headers.get('origin');
  const { admin, error } = await requireAdmin(request);
  if (!admin) return error;

  const { id } = await context.params;

  try {
    const body = (await request.json()) as { status?: string; adminNote?: string | null };

    // Invalid statuses are silently ignored, matching the backend
    const updateData: { status?: string; adminNote?: string | null } = {};
    if (body.status && FEEDBACK_STATUSES.includes(body.status)) {
      updateData.status = body.status;
    }
    if (body.adminNote !== undefined) {
      updateData.adminNote = body.adminNote;
    }

    const updated = await getDb().templateFeedback.update({
      where: { id },
      data: updateData,
      select: { id: true, status: true, adminNote: true, updatedAt: true },
    });

    return jsonResponse(updated, 200, origin);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to update feedback';
    return jsonResponse({ detail: message }, 500, origin);
  }
}

export async function DELETE(request: Request, context: RouteContext): Promise<Response> {
  const origin = request.headers.get('origin');
  const { admin, error } = await requireAdmin(request);
  if (!admin) return error;

  const { id } = await context.params;

  try {
    await getDb().templateFeedback.delete({ where: { id } });
    return jsonResponse({ success: true, message: 'Feedback deleted' }, 200, origin);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to delete feedback';
    return jsonResponse({ detail: message }, 500, origin);
  }
}
