/**
 * POST /api/v1/auth/verify-email — Verify the 6-digit code and activate the account.
 * Ported from backend verifyEmailCode() (backend/src/services/authService.ts).
 */
import { z } from 'zod';
import { getDb } from '@/lib/server/db';
import { jsonResponse, validationErrorResponse, signAccessToken } from '@/lib/server/apiUtils';

export { OPTIONS } from '@/lib/server/apiUtils';

// Mirrors backend verifyEmailSchema
const verifyEmailSchema = z.object({
  email: z.string({ error: 'Email is required' }).email('Invalid email format'),
  code: z
    .string({ error: 'Verification code is required' })
    .length(6, 'Verification code must be 6 characters'),
});

export async function POST(request: Request): Promise<Response> {
  // TODO: rate limiting — the Express backend applied authLimiter to all /api/v1/auth routes
  const origin = request.headers.get('origin');

  try {
    const body: unknown = await request.json().catch(() => ({}));
    const parsed = verifyEmailSchema.safeParse(body);
    if (!parsed.success) return validationErrorResponse(parsed.error, origin);

    const { email, code } = parsed.data;

    const db = getDb();
    const user = await db.user.findUnique({ where: { email } });

    if (!user) {
      return jsonResponse({ detail: 'User not found' }, 400, origin);
    }
    if (user.emailVerified) {
      return jsonResponse({ detail: 'Email already verified' }, 400, origin);
    }
    if (!user.verificationCode || user.verificationCode !== code) {
      return jsonResponse({ detail: 'Invalid verification code' }, 400, origin);
    }
    if (!user.verificationCodeExpires || user.verificationCodeExpires < new Date()) {
      return jsonResponse({ detail: 'Verification code has expired' }, 400, origin);
    }

    // Mark email as verified
    await db.user.update({
      where: { email },
      data: {
        emailVerified: new Date(),
        verificationCode: null,
        verificationCodeExpires: null,
      },
    });

    const accessToken = await signAccessToken(user.id, user.email, user.role);

    return jsonResponse(
      {
        access_token: accessToken,
        token_type: 'bearer',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      200,
      origin
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Verification failed';
    return jsonResponse({ detail: message }, 400, origin);
  }
}
