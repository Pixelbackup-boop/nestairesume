/**
 * /api/v1/resumes/:id — get (GET), update (PUT) and delete (DELETE) a single resume.
 * Ported from backend/src/routes/resumes.ts. Always scoped to the authenticated user.
 */
import { getDb } from '@/lib/server/db';
import { jsonResponse, corsHeaders, getBearerToken, verifyAccessToken, type TokenUser } from '@/lib/server/apiUtils';
import { getResumeById, updateResume, deleteResume, type ResumeData } from '@/lib/server/resumeService';

export { OPTIONS } from '@/lib/server/apiUtils';

interface RouteContext {
  params: Promise<{ id: string }>;
}

/** Mirrors backend authenticateToken: distinct 401s for missing vs invalid token. */
async function authenticate(request: Request, origin: string | null): Promise<TokenUser | Response> {
  const token = getBearerToken(request);
  if (!token) {
    return jsonResponse({ detail: 'Not authenticated' }, 401, origin);
  }
  const tokenUser = await verifyAccessToken(token);
  if (!tokenUser) {
    return jsonResponse({ detail: 'Invalid or expired token' }, 401, origin);
  }
  return tokenUser;
}

export async function GET(request: Request, context: RouteContext): Promise<Response> {
  const origin = request.headers.get('origin');

  const auth = await authenticate(request, origin);
  if (auth instanceof Response) return auth;

  const { id } = await context.params;

  try {
    const resume = await getResumeById(getDb(), id, auth.id);
    if (!resume) {
      return jsonResponse({ detail: 'Resume not found' }, 404, origin);
    }
    return jsonResponse(resume, 200, origin);
  } catch (error) {
    console.error('Get resume error', error);
    return jsonResponse({ detail: 'Internal server error' }, 500, origin);
  }
}

export async function PUT(request: Request, context: RouteContext): Promise<Response> {
  const origin = request.headers.get('origin');

  const auth = await authenticate(request, origin);
  if (auth instanceof Response) return auth;

  const { id } = await context.params;
  const body = (await request.json().catch(() => ({}))) as Partial<ResumeData>;

  try {
    const resume = await updateResume(getDb(), id, auth.id, body);
    if (!resume) {
      return jsonResponse({ detail: 'Resume not found' }, 404, origin);
    }
    return jsonResponse(resume, 200, origin);
  } catch (error) {
    console.error('Update resume error', error);
    return jsonResponse({ detail: 'Internal server error' }, 500, origin);
  }
}

export async function DELETE(request: Request, context: RouteContext): Promise<Response> {
  const origin = request.headers.get('origin');

  const auth = await authenticate(request, origin);
  if (auth instanceof Response) return auth;

  const { id } = await context.params;

  try {
    const deleted = await deleteResume(getDb(), id, auth.id);
    if (!deleted) {
      return jsonResponse({ detail: 'Resume not found' }, 404, origin);
    }
    // Backend responds 204 No Content
    return new Response(null, { status: 204, headers: corsHeaders(origin) });
  } catch (error) {
    console.error('Delete resume error', error);
    return jsonResponse({ detail: 'Internal server error' }, 500, origin);
  }
}
