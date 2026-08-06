/**
 * POST /api/v1/auth/resend-code — Issue a fresh verification code.
 * Ported from backend resendVerificationCode() (backend/src/services/authService.ts).
 */
import { z } from 'zod';
import { getDb } from '@/lib/server/db';
import {
  jsonResponse,
  validationErrorResponse,
  generateVerificationCode,
  sendVerificationEmail,
  VERIFICATION_CODE_EXPIRY_MINUTES,
} from '@/lib/server/apiUtils';

export { OPTIONS } from '@/lib/server/apiUtils';

// Mirrors backend resendCodeSchema
const resendCodeSchema = z.object({
  email: z.string({ error: 'Email is required' }).email('Invalid email format'),
});

export async function POST(request: Request): Promise<Response> {
  // TODO: rate limiting — the Express backend applied authLimiter to all /api/v1/auth routes
  const origin = request.headers.get('origin');

  try {
    const body: unknown = await request.json().catch(() => ({}));
    const parsed = resendCodeSchema.safeParse(body);
    if (!parsed.success) return validationErrorResponse(parsed.error, origin);

    const { email } = parsed.data;

    const db = getDb();
    const user = await db.user.findUnique({ where: { email } });

    if (!user) {
      return jsonResponse({ detail: 'User not found' }, 400, origin);
    }
    if (user.emailVerified) {
      return jsonResponse({ detail: 'Email already verified' }, 400, origin);
    }

    const verificationCode = generateVerificationCode();
    const verificationCodeExpires = new Date(
      Date.now() + VERIFICATION_CODE_EXPIRY_MINUTES * 60 * 1000
    );

    await db.user.update({
      where: { email },
      data: { verificationCode, verificationCodeExpires },
    });

    await sendVerificationEmail(email, user.name, verificationCode);

    return jsonResponse({ message: 'Verification code sent to your email' }, 200, origin);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to resend code';
    return jsonResponse({ detail: message }, 400, origin);
  }
}
