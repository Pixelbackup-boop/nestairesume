/**
 * POST /api/v1/ai/improve-content — improve resume experience/description content.
 * Ported from backend/src/routes/ai.ts (authenticateToken + checkAiLimit).
 *
 * Request body: { content: string }
 * Response: { improved_content: string }
 */
import { getDb } from '@/lib/server/db';
import { jsonResponse, getBearerToken, verifyAccessToken } from '@/lib/server/apiUtils';
import { checkAiLimit, incrementAiCount } from '@/lib/server/subscriptionLimits';
import { improveContent } from '@/lib/server/aiContentService';

export { OPTIONS } from '@/lib/server/apiUtils';

const MAX_CONTENT_LENGTH = 5000;

export async function POST(request: Request): Promise<Response> {
  // TODO: rate limiting — the Express backend applied generalLimiter to /api/v1/ai
  const origin = request.headers.get('origin');

  const token = getBearerToken(request);
  if (!token) {
    return jsonResponse({ detail: 'Not authenticated' }, 401, origin);
  }
  const tokenUser = await verifyAccessToken(token);
  if (!tokenUser) {
    return jsonResponse({ detail: 'Invalid or expired token' }, 401, origin);
  }

  const db = getDb();

  const limitError = await checkAiLimit(db, tokenUser.id);
  if (limitError) {
    return jsonResponse(limitError.body, limitError.status, origin);
  }

  const body = (await request.json().catch(() => ({}))) as { content?: unknown };
  const content = body?.content;

  if (!content || typeof content !== 'string') {
    return jsonResponse({ error: 'Content is required' }, 400, origin);
  }

  if (content.length > MAX_CONTENT_LENGTH) {
    return jsonResponse({ error: 'Content too long (max 5000 characters)' }, 400, origin);
  }

  try {
    const improvedContent = await improveContent(content);

    // Increment AI usage count after successful generation
    await incrementAiCount(db, tokenUser.id);

    return jsonResponse({ improved_content: improvedContent }, 200, origin);
  } catch (error) {
    console.error('AI improve-content error', error);
    const message = error instanceof Error ? error.message : 'Failed to improve content';
    return jsonResponse({ error: message }, 500, origin);
  }
}
