/**
 * POST /api/v1/auth/refresh — Exchange a valid-but-possibly-expired JWT for a fresh one.
 * Ported from backend refreshAccessToken() (signature verified, expiry ignored).
 */
import { getDb } from '@/lib/server/db';
import { jsonResponse, verifyTokenIgnoringExpiration, signAccessToken } from '@/lib/server/apiUtils';

export { OPTIONS } from '@/lib/server/apiUtils';

export async function POST(request: Request): Promise<Response> {
  // TODO: rate limiting — the Express backend applied authLimiter to all /api/v1/auth routes
  const origin = request.headers.get('origin');

  const body: unknown = await request.json().catch(() => ({}));
  const token = (body as { token?: unknown })?.token;

  if (!token || typeof token !== 'string') {
    return jsonResponse({ detail: 'Token is required' }, 400, origin);
  }

  try {
    // Verify signature but allow expired tokens (matches backend ignoreExpiration: true)
    const payload = await verifyTokenIgnoringExpiration(token);
    const userId = typeof payload.sub === 'string' ? payload.sub : null;
    if (!userId) {
      return jsonResponse({ detail: 'Token refresh failed' }, 401, origin);
    }

    const db = getDb();
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, role: true, isSuspended: true },
    });

    if (!user) {
      return jsonResponse({ detail: 'User not found' }, 401, origin);
    }
    if (user.isSuspended) {
      return jsonResponse({ detail: 'Account suspended' }, 401, origin);
    }

    const accessToken = await signAccessToken(user.id, user.email, user.role);

    return jsonResponse({ access_token: accessToken, token_type: 'bearer' }, 200, origin);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Token refresh failed';
    return jsonResponse({ detail: message }, 401, origin);
  }
}
