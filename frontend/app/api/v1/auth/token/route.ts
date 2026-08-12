/**
 * POST /api/v1/auth/token — Login. Accepts application/x-www-form-urlencoded
 * (OAuth2-style username/password) and JSON, like the Express backend.
 * Ported from backend loginUser() (backend/src/services/authService.ts).
 */
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { getDb } from '@/lib/server/db';
import { jsonResponse, validationErrorResponse, signAccessToken } from '@/lib/server/apiUtils';
import { getCountryFromRequest } from '@/lib/server/geo';

export { OPTIONS } from '@/lib/server/apiUtils';

// Mirrors backend loginSchema
const loginSchema = z
  .object({
    // Support both username (OAuth2 standard) and email
    username: z.string().email('Invalid email format').optional(),
    email: z.string().email('Invalid email format').optional(),
    password: z.string({ error: 'Password is required' }).min(1, 'Password is required'),
    // Fallback country source when the cf-ipcountry header is absent (lib/server/geo)
    countryCode: z.string().max(2).optional(),
  })
  .refine((data) => data.username || data.email, {
    message: 'Email is required',
    path: ['email'],
  });

async function parseRequestBody(request: Request): Promise<Record<string, unknown>> {
  const contentType = request.headers.get('content-type') || '';

  if (
    contentType.includes('application/x-www-form-urlencoded') ||
    contentType.includes('multipart/form-data')
  ) {
    const form = await request.formData();
    const body: Record<string, unknown> = {};
    form.forEach((value, key) => {
      if (typeof value === 'string') body[key] = value;
    });
    return body;
  }

  const json: unknown = await request.json().catch(() => ({}));
  return typeof json === 'object' && json !== null ? (json as Record<string, unknown>) : {};
}

export async function POST(request: Request): Promise<Response> {
  // TODO: rate limiting — the Express backend applied authLimiter to all /api/v1/auth routes
  const origin = request.headers.get('origin');

  try {
    const body = await parseRequestBody(request);
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) return validationErrorResponse(parsed.error, origin);

    const email = parsed.data.username || parsed.data.email;
    const password = parsed.data.password;
    if (!email) {
      // Unreachable after the refine above, but keeps the type narrow
      return jsonResponse({ detail: 'Invalid email or password' }, 401, origin);
    }

    const db = getDb();
    const user = await db.user.findUnique({ where: { email } });

    if (!user) {
      return jsonResponse({ detail: 'Invalid email or password' }, 401, origin);
    }
    if (user.isSuspended) {
      return jsonResponse({ detail: 'Account suspended. Please contact support.' }, 401, origin);
    }
    // OAuth-only users have no password
    if (!user.hashedPassword) {
      return jsonResponse({ detail: 'Invalid email or password' }, 401, origin);
    }

    const isValid = await bcrypt.compare(password, user.hashedPassword);
    if (!isValid) {
      return jsonResponse({ detail: 'Invalid email or password' }, 401, origin);
    }

    // Update country on login (keeps it current) — same as backend loginUser()
    const geo = getCountryFromRequest(request, parsed.data.countryCode);
    if (geo) {
      await db.user.update({
        where: { id: user.id },
        data: { country: geo.country, countryCode: geo.countryCode },
      });
    }

    const accessToken = await signAccessToken(user.id, user.email, user.role);

    return jsonResponse({ access_token: accessToken, token_type: 'bearer' }, 200, origin);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Login failed';
    return jsonResponse({ detail: message }, 401, origin);
  }
}
