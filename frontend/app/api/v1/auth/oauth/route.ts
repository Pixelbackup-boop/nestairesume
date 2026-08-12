/**
 * POST /api/v1/auth/oauth — Find-or-create a user for a NextAuth OAuth sign-in.
 * Ported from backend handleOAuthSignIn() (backend/src/services/authService.ts).
 */
import { z } from 'zod';
import { getDb, getEnv } from '@/lib/server/db';
import { jsonResponse, validationErrorResponse, signAccessToken } from '@/lib/server/apiUtils';
import { getCountryFromRequest } from '@/lib/server/geo';

export { OPTIONS } from '@/lib/server/apiUtils';

// Mirrors backend oauthSchema
const oauthSchema = z.object({
  provider: z.string({ error: 'Provider is required' }).min(1, 'Provider is required'),
  providerAccountId: z
    .string({ error: 'Provider account ID is required' })
    .min(1, 'Provider account ID is required'),
  email: z.string({ error: 'Email is required' }).email('Invalid email format'),
  name: z.string().optional(),
  image: z.string().url().optional().nullable(),
  accessToken: z.string().optional(),
  refreshToken: z.string().optional(),
  // Fallback when the cf-ipcountry header is absent — same precedence as the backend
  countryCode: z.string().max(2).optional(),
});

export async function POST(request: Request): Promise<Response> {
  // TODO: rate limiting — the Express backend applied authLimiter to all /api/v1/auth routes
  const origin = request.headers.get('origin');

  // This endpoint mints a JWT for whatever email is posted, so it must only be
  // callable by our own NextAuth signIn callback — never by the public.
  const internalSecret = getEnv().NEXTAUTH_SECRET || process.env.NEXTAUTH_SECRET;
  if (!internalSecret || request.headers.get('x-internal-secret') !== internalSecret) {
    return jsonResponse({ detail: 'Not authenticated' }, 401, origin);
  }

  try {
    const body: unknown = await request.json().catch(() => ({}));
    const parsed = oauthSchema.safeParse(body);
    if (!parsed.success) return validationErrorResponse(parsed.error, origin);

    const { provider, providerAccountId, email, image, accessToken, refreshToken, countryCode } =
      parsed.data;
    const name = parsed.data.name || email.split('@')[0];
    const geo = getCountryFromRequest(request, countryCode);

    const db = getDb();

    // Find existing user by email or provider account
    let user = await db.user.findFirst({
      where: {
        OR: [{ email }, { accounts: { some: { provider, providerAccountId } } }],
      },
      include: {
        accounts: { select: { provider: true, providerAccountId: true } },
      },
    });

    if (user) {
      // Check if this provider is already linked
      const existingAccount = user.accounts?.find(
        (acc) => acc.provider === provider && acc.providerAccountId === providerAccountId
      );

      if (!existingAccount) {
        // Link new OAuth provider to existing user
        await db.account.create({
          data: {
            userId: user.id,
            type: 'oauth',
            provider,
            providerAccountId,
            access_token: accessToken,
            refresh_token: refreshToken,
          },
        });
      }

      // Update user's image if not set
      if (!user.image && image) {
        await db.user.update({ where: { id: user.id }, data: { image } });
      }

      // Mark email as verified for OAuth users + refresh country on every sign-in
      if (!user.emailVerified || geo) {
        await db.user.update({
          where: { id: user.id },
          data: {
            ...(!user.emailVerified && { emailVerified: new Date() }),
            ...(geo && { country: geo.country, countryCode: geo.countryCode }),
          },
        });
      }
    } else {
      // Create new user with OAuth account
      user = await db.user.create({
        data: {
          email,
          name,
          image,
          emailVerified: new Date(), // OAuth emails are pre-verified
          hashedPassword: '', // No password for OAuth users
          ...(geo && { country: geo.country, countryCode: geo.countryCode }),
          accounts: {
            create: {
              type: 'oauth',
              provider,
              providerAccountId,
              access_token: accessToken,
              refresh_token: refreshToken,
            },
          },
        },
        include: {
          accounts: { select: { provider: true, providerAccountId: true } },
        },
      });
    }

    const access_token = await signAccessToken(user.id, user.email, user.role);

    return jsonResponse(
      {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          image: user.image,
        },
        access_token,
        token_type: 'bearer',
      },
      200,
      origin
    );
  } catch (error) {
    console.error('OAuth sign-in error:', error);
    const message = error instanceof Error ? error.message : 'OAuth sign-in failed';
    return jsonResponse({ detail: message }, 500, origin);
  }
}
