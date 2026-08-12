/**
 * POST /api/v1/auth/register — Register with email verification.
 * Ported from backend registerUserWithVerification() (backend/src/services/authService.ts).
 */
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { getDb } from '@/lib/server/db';
import {
  jsonResponse,
  validationErrorResponse,
  generateVerificationCode,
  sendVerificationEmail,
  VERIFICATION_CODE_EXPIRY_MINUTES,
} from '@/lib/server/apiUtils';
import { getCountryFromRequest } from '@/lib/server/geo';

export { OPTIONS } from '@/lib/server/apiUtils';

const SALT_ROUNDS = 10;

// Mirrors backend registerSchema (backend/src/middleware/validation.ts)
const registerSchema = z.object({
  email: z
    .string({ error: 'Email is required' })
    .email('Invalid email format')
    .max(255, 'Email too long'),
  password: z
    .string({ error: 'Password is required' })
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password too long')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  name: z
    .string({ error: 'Name is required' })
    .min(1, 'Name is required')
    .max(100, 'Name too long')
    .trim(),
  // Fallback country source when the cf-ipcountry header is absent (lib/server/geo)
  countryCode: z.string().max(2).optional(),
});

export async function POST(request: Request): Promise<Response> {
  // TODO: rate limiting — the Express backend applied authLimiter to all /api/v1/auth routes
  const origin = request.headers.get('origin');

  try {
    const body: unknown = await request.json().catch(() => ({}));
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) return validationErrorResponse(parsed.error, origin);

    const { email, password, name, countryCode } = parsed.data;
    const geo = getCountryFromRequest(request, countryCode);

    const db = getDb();

    // Check if user exists and is already verified
    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser?.emailVerified) {
      return jsonResponse({ detail: 'Email already registered' }, 400, origin);
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const verificationCode = generateVerificationCode();
    const verificationCodeExpires = new Date(
      Date.now() + VERIFICATION_CODE_EXPIRY_MINUTES * 60 * 1000
    );

    // Update existing unverified user, or create a new one
    const user = existingUser
      ? await db.user.update({
          where: { email },
          data: {
            hashedPassword,
            name,
            verificationCode,
            verificationCodeExpires,
            ...(geo && { country: geo.country, countryCode: geo.countryCode }),
          },
        })
      : await db.user.create({
          data: {
            email,
            hashedPassword,
            name,
            verificationCode,
            verificationCodeExpires,
            ...(geo && { country: geo.country, countryCode: geo.countryCode }),
          },
        });

    // Never throws — registration succeeds even if the email provider is down (same as backend)
    await sendVerificationEmail(email, name, verificationCode);

    return jsonResponse(
      {
        requiresVerification: true,
        email: user.email,
        message: 'Verification code sent to your email',
      },
      201,
      origin
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Registration failed';
    return jsonResponse({ detail: message }, 500, origin);
  }
}
