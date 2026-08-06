/**
 * POST /api/v1/auth/change-password — change password for a signed-in user.
 * Ported from backend changePassword().
 */
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { getDb } from '@/lib/server/db';
import { jsonResponse, validationErrorResponse, authenticateRequest } from '@/lib/server/apiUtils';

export { OPTIONS } from '@/lib/server/apiUtils';

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
});

export async function POST(request: Request): Promise<Response> {
  const origin = request.headers.get('origin');

  const tokenUser = await authenticateRequest(request);
  if (!tokenUser) {
    return jsonResponse({ detail: 'Not authenticated' }, 401, origin);
  }

  const body: unknown = await request.json().catch(() => ({}));
  const parsed = changePasswordSchema.safeParse(body);
  if (!parsed.success) {
    return validationErrorResponse(parsed.error, origin);
  }

  try {
    const db = getDb();
    const user = await db.user.findUnique({ where: { id: tokenUser.id } });

    if (!user) {
      return jsonResponse({ detail: 'User not found' }, 400, origin);
    }
    if (!user.hashedPassword) {
      return jsonResponse({ detail: 'Cannot change password for OAuth-only account' }, 400, origin);
    }

    const isValid = await bcrypt.compare(parsed.data.currentPassword, user.hashedPassword);
    if (!isValid) {
      return jsonResponse({ detail: 'Current password is incorrect' }, 400, origin);
    }

    const hashedPassword = await bcrypt.hash(parsed.data.newPassword, 10);
    await db.user.update({ where: { id: tokenUser.id }, data: { hashedPassword } });

    return jsonResponse({ message: 'Password changed successfully' }, 200, origin);
  } catch (error) {
    console.error('Change password error', error);
    return jsonResponse({ detail: 'Password change failed' }, 400, origin);
  }
}
