/**
 * Admin auth guard for /api/v1/admin/* route handlers.
 * Mirrors the Express backend's authenticateToken + requireAdmin middleware
 * pair: the role comes from the signed JWT (embedded at login), so a role
 * change takes effect on the user's next login — same behavior as before.
 */
import { getBearerToken, verifyAccessToken, jsonResponse, type TokenUser } from './apiUtils';

export type AdminGuardResult =
  | { admin: TokenUser; error?: never }
  | { admin?: never; error: Response };

export async function requireAdmin(request: Request): Promise<AdminGuardResult> {
  const origin = request.headers.get('origin');

  const token = getBearerToken(request);
  if (!token) {
    return { error: jsonResponse({ detail: 'Not authenticated' }, 401, origin) };
  }

  const user = await verifyAccessToken(token);
  if (!user) {
    return { error: jsonResponse({ detail: 'Invalid or expired token' }, 401, origin) };
  }

  if (user.role !== 'admin') {
    return { error: jsonResponse({ detail: 'Admin access required' }, 403, origin) };
  }

  return { admin: user };
}
