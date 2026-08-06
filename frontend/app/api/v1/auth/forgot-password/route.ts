/**
 * POST /api/v1/auth/forgot-password — send a password reset code.
 * Ported from backend requestPasswordReset(). Always responds success to
 * prevent email enumeration.
 */
import { z } from 'zod';
import { getDb } from '@/lib/server/db';
import {
  jsonResponse,
  validationErrorResponse,
  generateVerificationCode,
  sendPasswordResetEmail,
  VERIFICATION_CODE_EXPIRY_MINUTES,
} from '@/lib/server/apiUtils';

export { OPTIONS } from '@/lib/server/apiUtils';

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email format').max(255),
});

const NEUTRAL_RESPONSE = { message: 'If the email exists, a reset code has been sent' };

export async function POST(request: Request): Promise<Response> {
  const origin = request.headers.get('origin');

  const body: unknown = await request.json().catch(() => ({}));
  const parsed = forgotPasswordSchema.safeParse(body);
  if (!parsed.success) {
    return validationErrorResponse(parsed.error, origin);
  }

  try {
    const db = getDb();
    const user = await db.user.findUnique({ where: { email: parsed.data.email } });
    if (!user) {
      return jsonResponse(NEUTRAL_RESPONSE, 200, origin);
    }

    const verificationCode = generateVerificationCode();
    const verificationCodeExpires = new Date(Date.now() + VERIFICATION_CODE_EXPIRY_MINUTES * 60 * 1000);

    await db.user.update({
      where: { email: parsed.data.email },
      data: { verificationCode, verificationCodeExpires },
    });

    await sendPasswordResetEmail(parsed.data.email, user.name, verificationCode);
  } catch (error) {
    console.error('Forgot password error', error);
    // Fall through to the neutral response — no enumeration, no error leak
  }

  return jsonResponse(NEUTRAL_RESPONSE, 200, origin);
}
