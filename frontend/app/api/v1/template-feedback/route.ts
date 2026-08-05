/**
 * POST /api/v1/template-feedback — submit feedback for a template.
 * Ported from backend/src/routes/templateFeedback.ts (authenticated only).
 */
import { getDb } from '@/lib/server/db';
import { jsonResponse, authenticateRequest } from '@/lib/server/apiUtils';

export { OPTIONS } from '@/lib/server/apiUtils';

const VALID_TYPES = ['feedback', 'bug', 'suggestion'];

export async function POST(request: Request): Promise<Response> {
  const origin = request.headers.get('origin');

  const tokenUser = await authenticateRequest(request);
  if (!tokenUser) {
    return jsonResponse({ detail: 'Not authenticated' }, 401, origin);
  }

  const body = (await request.json().catch(() => ({}))) as {
    templateId?: unknown;
    type?: unknown;
    message?: unknown;
  };

  const templateId = typeof body.templateId === 'string' ? body.templateId.trim() : '';
  if (templateId.length < 1) {
    return jsonResponse({ success: false, error: 'Template ID is required' }, 400, origin);
  }

  const feedbackType =
    typeof body.type === 'string' && VALID_TYPES.includes(body.type) ? body.type : 'feedback';

  const message = typeof body.message === 'string' ? body.message.trim() : '';
  if (message.length < 5) {
    return jsonResponse({ success: false, error: 'Message must be at least 5 characters' }, 400, origin);
  }
  if (message.length > 2000) {
    return jsonResponse({ success: false, error: 'Message must be under 2000 characters' }, 400, origin);
  }

  try {
    const feedback = await getDb().templateFeedback.create({
      data: {
        userId: tokenUser.id,
        templateId,
        type: feedbackType,
        message,
      },
      select: { id: true, templateId: true, type: true, message: true, createdAt: true },
    });

    return jsonResponse({ success: true, feedback }, 201, origin);
  } catch (error) {
    console.error('Template feedback error', error);
    return jsonResponse({ success: false, error: 'Failed to submit feedback' }, 500, origin);
  }
}
