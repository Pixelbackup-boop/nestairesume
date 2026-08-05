/**
 * GET /api/v1/resumes/templates — public template catalog (no auth).
 * Ported from backend/src/routes/resumes.ts GET /templates.
 * Static segment wins over the [id] route, matching the Express registration order.
 */
import { jsonResponse } from '@/lib/server/apiUtils';
import { getTemplates } from '@/lib/server/resumeService';

export { OPTIONS } from '@/lib/server/apiUtils';

export function GET(request: Request): Response {
  return jsonResponse(getTemplates(), 200, request.headers.get('origin'));
}
