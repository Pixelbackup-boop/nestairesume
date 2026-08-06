/**
 * POST /api/v1/auth/reset-password — set a new password with the emailed code.
 * Ported from backend resetPassword(). Error messages match the Express API.
 */
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { getDb } from '@/lib/server/db';
import { jsonResponse, validationErrorResponse } from '@/lib/server/apiUtils';

export { OPTIONS } from '@/lib/server/apiUtils';

const resetPasswordSchema = z.object({
  email: z.string().email('Invalid email format').max(255),
  code: z.string().min(1, 'Code is required'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
});

export async function POST(request: Request): Promise<Response> {
  const origin = request.headers.get('origin');

  const body: unknown = await request.json().catch(() => ({}));
  const parsed = resetPasswordSchema.safeParse(body);
  if (!parsed.success) {
    return validationErrorResponse(parsed.error, origin);
  }
  const { email, code, newPassword } = parsed.data;

  try {
    const db = getDb();
    const user = await db.user.findUnique({ where: { email } });

    if (!user) {
      return jsonResponse({ detail: 'Invalid email or code' }, 400, origin);
    }
    if (!user.verificationCode || user.verificationCode !== code) {
      return jsonResponse({ detail: 'Invalid verification code' }, 400, origin);
    }
    if (!user.verificationCodeExpires || user.verificationCodeExpires < new Date()) {
      return jsonResponse({ detail: 'Verification code has expired' }, 400, origin);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.user.update({
      where: { email },
      data: { hashedPassword, verificationCode: null, verificationCodeExpires: null },
    });

    return jsonResponse({ message: 'Password reset successfully' }, 200, origin);
  } catch (error) {
    console.error('Reset password error', error);
    return jsonResponse({ detail: 'Password reset failed' }, 400, origin);
  }
}
