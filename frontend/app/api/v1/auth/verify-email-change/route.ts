/**
 * POST /api/v1/auth/verify-email-change — confirm the code and switch emails.
 * Ported from backend verifyEmailChange().
 */
import { z } from 'zod';
import { getDb } from '@/lib/server/db';
import { jsonResponse, validationErrorResponse, authenticateRequest } from '@/lib/server/apiUtils';

export { OPTIONS } from '@/lib/server/apiUtils';

const verifyEmailChangeSchema = z.object({
  newEmail: z.string().email('Invalid email format').max(255),
  code: z.string().min(1, 'Code is required'),
});

export async function POST(request: Request): Promise<Response> {
  const origin = request.headers.get('origin');

  const tokenUser = await authenticateRequest(request);
  if (!tokenUser) {
    return jsonResponse({ detail: 'Not authenticated' }, 401, origin);
  }

  const body: unknown = await request.json().catch(() => ({}));
  const parsed = verifyEmailChangeSchema.safeParse(body);
  if (!parsed.success) {
    return validationErrorResponse(parsed.error, origin);
  }
  const { newEmail, code } = parsed.data;

  try {
    const db = getDb();
    const user = await db.user.findUnique({ where: { id: tokenUser.id } });

    if (!user) {
      return jsonResponse({ detail: 'User not found' }, 400, origin);
    }
    if (!user.pendingEmail || user.pendingEmail !== newEmail) {
      return jsonResponse({ detail: 'Email change request not found or email mismatch' }, 400, origin);
    }
    if (!user.verificationCode || user.verificationCode !== code) {
      return jsonResponse({ detail: 'Invalid verification code' }, 400, origin);
    }
    if (!user.verificationCodeExpires || user.verificationCodeExpires < new Date()) {
      return jsonResponse({ detail: 'Verification code has expired' }, 400, origin);
    }

    // Race-condition protection: the address may have been claimed since
    const existing = await db.user.findFirst({
      where: { email: newEmail, NOT: { id: tokenUser.id } },
    });
    if (existing) {
      return jsonResponse({ detail: 'Email is no longer available' }, 400, origin);
    }

    const updatedUser = await db.user.update({
      where: { id: tokenUser.id },
      data: {
        email: newEmail,
        pendingEmail: null,
        verificationCode: null,
        verificationCodeExpires: null,
      },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        role: true,
        subscriptionTier: true,
        subscriptionStatus: true,
        trialEndsAt: true,
      },
    });

    return jsonResponse(updatedUser, 200, origin);
  } catch (error) {
    console.error('Verify email change error', error);
    return jsonResponse({ detail: 'Email verification failed' }, 400, origin);
  }
}
