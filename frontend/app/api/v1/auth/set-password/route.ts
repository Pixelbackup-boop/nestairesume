/**
 * POST /api/v1/auth/set-password — let an OAuth-only user add a password.
 * Ported from backend setPassword().
 */
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { getDb } from '@/lib/server/db';
import { jsonResponse, validationErrorResponse, authenticateRequest } from '@/lib/server/apiUtils';

export { OPTIONS } from '@/lib/server/apiUtils';

const setPasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export async function POST(request: Request): Promise<Response> {
  const origin = request.headers.get('origin');

  const tokenUser = await authenticateRequest(request);
  if (!tokenUser) {
    return jsonResponse({ detail: 'Not authenticated' }, 401, origin);
  }

  const body: unknown = await request.json().catch(() => ({}));
  const parsed = setPasswordSchema.safeParse(body);
  if (!parsed.success) {
    return validationErrorResponse(parsed.error, origin);
  }

  try {
    const db = getDb();

    // Only OAuth-only accounts may SET a password — an account that already
    // has one must go through change-password (which verifies the current
    // password). Otherwise a leaked access token alone becomes a full
    // account takeover. (The Express backend lacked this guard.)
    const user = await db.user.findUnique({
      where: { id: tokenUser.id },
      select: { hashedPassword: true },
    });
    if (!user) {
      return jsonResponse({ detail: 'User not found' }, 400, origin);
    }
    if (user.hashedPassword) {
      return jsonResponse(
        { detail: 'Account already has a password. Use change-password instead.' },
        400,
        origin
      );
    }

    const hashedPassword = await bcrypt.hash(parsed.data.password, 10);
    await db.user.update({ where: { id: tokenUser.id }, data: { hashedPassword } });

    return jsonResponse({ message: 'Password set successfully' }, 200, origin);
  } catch (error) {
    console.error('Set password error', error);
    return jsonResponse({ detail: 'Failed to set password' }, 400, origin);
  }
}
