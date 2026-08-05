/**
 * /api/v1/resumes — list (GET) + create (POST).
 * Ported from backend/src/routes/resumes.ts (authenticateToken + requireAuth + checkCvLimit).
 */
import { getDb } from '@/lib/server/db';
import { jsonResponse, getBearerToken, verifyAccessToken } from '@/lib/server/apiUtils';
import { createResume, getResumes, type ResumeData } from '@/lib/server/resumeService';
import { checkCvLimit } from '@/lib/server/subscriptionLimits';

export { OPTIONS } from '@/lib/server/apiUtils';

export async function GET(request: Request): Promise<Response> {
  // TODO: rate limiting — the Express backend applied generalLimiter to /api/v1/resumes
  const origin = request.headers.get('origin');

  const token = getBearerToken(request);
  if (!token) {
    return jsonResponse({ detail: 'Not authenticated' }, 401, origin);
  }
  const tokenUser = await verifyAccessToken(token);
  if (!tokenUser) {
    return jsonResponse({ detail: 'Invalid or expired token' }, 401, origin);
  }

  const { searchParams } = new URL(request.url);
  const skip = parseInt(searchParams.get('skip') || '', 10) || 0;
  const limit = parseInt(searchParams.get('limit') || '', 10) || 20;

  try {
    const resumes = await getResumes(getDb(), tokenUser.id, skip, limit);
    return jsonResponse(resumes, 200, origin);
  } catch (error) {
    console.error('List resumes error', error);
    return jsonResponse({ detail: 'Internal server error' }, 500, origin);
  }
}

export async function POST(request: Request): Promise<Response> {
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

  const limitError = await checkCvLimit(db, tokenUser.id);
  if (limitError) {
    return jsonResponse(limitError.body, limitError.status, origin);
  }

  const body = (await request.json().catch(() => ({}))) as ResumeData;
  if (!body.title || !body.fullName) {
    return jsonResponse({ detail: 'Title and fullName are required' }, 400, origin);
  }

  try {
    // The Express backend wrapped these in an interactive $transaction, but D1
    // rejects interactive transactions outright. Run them sequentially: create
    // first so a failed increment can't leave the user without their resume.
    const resume = await createResume(db, tokenUser.id, body);
    await db.user.update({
      where: { id: tokenUser.id },
      data: { cvCreatedCount: { increment: 1 } },
    });

    return jsonResponse(resume, 201, origin);
  } catch (error) {
    console.error('Create resume error', error);
    return jsonResponse({ detail: 'Internal server error' }, 500, origin);
  }
}
