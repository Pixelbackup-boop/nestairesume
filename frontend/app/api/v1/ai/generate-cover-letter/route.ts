/**
 * POST /api/v1/ai/generate-cover-letter — generate a personalized cover letter.
 * Ported from backend/src/routes/ai.ts (authenticateToken + checkCoverLetterLimit).
 *
 * Request body: CoverLetterInput
 * Response: { cover_letter: string }
 */
import { getDb } from '@/lib/server/db';
import { jsonResponse, getBearerToken, verifyAccessToken } from '@/lib/server/apiUtils';
import { checkCoverLetterLimit, incrementCoverLetterCount } from '@/lib/server/subscriptionLimits';
import { generateCoverLetter, type CoverLetterInput } from '@/lib/server/aiContentService';

export { OPTIONS } from '@/lib/server/apiUtils';

function isValidTone(tone: unknown): tone is CoverLetterInput['tone'] {
  return tone === 'professional' || tone === 'friendly' || tone === 'confident' || tone === 'enthusiastic';
}

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

  const limitError = await checkCoverLetterLimit(db, tokenUser.id);
  if (limitError) {
    return jsonResponse(limitError.body, limitError.status, origin);
  }

  const body = (await request.json().catch(() => ({}))) as Partial<CoverLetterInput> & { tone?: unknown };

  // Validate required fields (same order and messages as the backend)
  if (!body.fullName || typeof body.fullName !== 'string') {
    return jsonResponse({ error: 'Full name is required' }, 400, origin);
  }
  if (!body.jobTitle || typeof body.jobTitle !== 'string') {
    return jsonResponse({ error: 'Job title is required' }, 400, origin);
  }
  if (!body.companyName || typeof body.companyName !== 'string') {
    return jsonResponse({ error: 'Company name is required' }, 400, origin);
  }

  const input: CoverLetterInput = {
    fullName: body.fullName,
    email: body.email,
    phone: body.phone,
    jobTitle: body.jobTitle,
    companyName: body.companyName,
    hiringManagerName: body.hiringManagerName,
    skills: body.skills,
    experience: body.experience,
    // Backend defaults invalid/missing tones to professional
    tone: isValidTone(body.tone) ? body.tone : 'professional',
  };

  try {
    const coverLetter = await generateCoverLetter(input);

    // Increment cover letter usage count after successful generation
    await incrementCoverLetterCount(db, tokenUser.id);

    return jsonResponse({ cover_letter: coverLetter }, 200, origin);
  } catch (error) {
    console.error('AI generate-cover-letter error', error);
    const message = error instanceof Error ? error.message : 'Failed to generate cover letter';
    return jsonResponse({ error: message }, 500, origin);
  }
}
