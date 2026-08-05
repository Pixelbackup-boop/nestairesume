/**
 * POST /api/v1/auth/request-email-change — start an email change; the code is
 * sent to the NEW address. Ported from backend requestEmailChange().
 */
import { z } from 'zod';
import { getDb } from '@/lib/server/db';
import {
  jsonResponse,
  validationErrorResponse,
  authenticateRequest,
  generateVerificationCode,
  sendEmailChangeVerification,
  VERIFICATION_CODE_EXPIRY_MINUTES,
} from '@/lib/server/apiUtils';

export { OPTIONS } from '@/lib/server/apiUtils';

const requestEmailChangeSchema = z.object({
  newEmail: z.string().email('Invalid email format').max(255),
});

export async function POST(request: Request): Promise<Response> {
  const origin = request.headers.get('origin');

  const tokenUser = await authenticateRequest(request);
  if (!tokenUser) {
    return jsonResponse({ detail: 'Not authenticated' }, 401, origin);
  }

  const body: unknown = await request.json().catch(() => ({}));
  const parsed = requestEmailChangeSchema.safeParse(body);
  if (!parsed.success) {
    return validationErrorResponse(parsed.error, origin);
  }
  const { newEmail } = parsed.data;

  try {
    const db = getDb();

    const existing = await db.user.findFirst({
      where: { email: newEmail, NOT: { id: tokenUser.id } },
    });
    if (existing) {
      return jsonResponse({ detail: 'Email already in use' }, 400, origin);
    }

    const user = await db.user.findUnique({ where: { id: tokenUser.id } });
    if (!user) {
      return jsonResponse({ detail: 'User not found' }, 400, origin);
    }

    const verificationCode = generateVerificationCode();
    const verificationCodeExpires = new Date(Date.now() + VERIFICATION_CODE_EXPIRY_MINUTES * 60 * 1000);

    await db.user.update({
      where: { id: tokenUser.id },
      data: { pendingEmail: newEmail, verificationCode, verificationCodeExpires },
    });

    await sendEmailChangeVerification(newEmail, user.name, verificationCode);

    return jsonResponse({ message: 'Verification code sent to your new email address' }, 200, origin);
  } catch (error) {
    console.error('Request email change error', error);
    return jsonResponse({ detail: 'Email change request failed' }, 400, origin);
  }
}
