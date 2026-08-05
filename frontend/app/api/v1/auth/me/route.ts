/**
 * GET /api/v1/auth/me — Current user profile from a Bearer JWT.
 * Ported from backend GET /auth/me (authenticateToken middleware + getUserById()).
 */
import { getDb } from '@/lib/server/db';
import {
  jsonResponse,
  getBearerToken,
  verifyAccessToken,
  getUserProfile,
} from '@/lib/server/apiUtils';

export { OPTIONS } from '@/lib/server/apiUtils';

export async function GET(request: Request): Promise<Response> {
  // TODO: rate limiting — the Express backend applied authLimiter to all /api/v1/auth routes
  const origin = request.headers.get('origin');

  const token = getBearerToken(request);
  if (!token) {
    return jsonResponse({ detail: 'Not authenticated' }, 401, origin);
  }

  const tokenUser = await verifyAccessToken(token);
  if (!tokenUser) {
    return jsonResponse({ detail: 'Invalid or expired token' }, 401, origin);
  }

  try {
    const user = await getUserProfile(getDb(), tokenUser.id);
    if (!user) {
      return jsonResponse({ detail: 'User not found' }, 404, origin);
    }

    return jsonResponse(user, 200, origin);
  } catch {
    return jsonResponse({ detail: 'Failed to get user' }, 500, origin);
  }
}
