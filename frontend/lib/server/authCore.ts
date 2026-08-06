/**
 * Direct auth operations for NextAuth callbacks running inside the worker.
 *
 * lib/auth.ts used to call /api/v1/auth/{token,me,oauth,refresh} over HTTP,
 * but on Cloudflare a worker cannot fetch its own hostname (self-referential
 * subrequests are blocked), which made every NextAuth sign-in fail with
 * AccessDenied. These functions are the same logic the routes use, called
 * in-process. The HTTP routes remain for external API clients.
 */
import bcrypt from 'bcryptjs';
import { getDb } from './db';
import { signAccessToken, verifyTokenIgnoringExpiration } from './apiUtils';

export interface AuthedUser {
  id: string;
  email: string;
  name: string;
  role: string;
  image: string | null;
  accessToken: string;
}

/** Mirrors POST /api/v1/auth/token + /me: password login returning profile + backend JWT. */
export async function loginWithPassword(email: string, password: string): Promise<AuthedUser | null> {
  try {
    const db = getDb();
    const user = await db.user.findUnique({ where: { email } });

    if (!user || user.isSuspended || !user.hashedPassword) return null;

    const isValid = await bcrypt.compare(password, user.hashedPassword);
    if (!isValid) return null;

    const accessToken = await signAccessToken(user.id, user.email, user.role);
    return { id: user.id, email: user.email, name: user.name, role: user.role, image: user.image, accessToken };
  } catch (error) {
    console.error('loginWithPassword error', error);
    return null;
  }
}

export interface OAuthSyncInput {
  provider: string;
  providerAccountId: string;
  email: string;
  name?: string | null;
  image?: string | null;
  accessToken?: string;
  refreshToken?: string;
}

/** Mirrors POST /api/v1/auth/oauth: find-or-create the user for an OAuth sign-in. */
export async function syncOAuthUser(input: OAuthSyncInput): Promise<AuthedUser | null> {
  try {
    const { provider, providerAccountId, email, image, accessToken, refreshToken } = input;
    const name = input.name || email.split('@')[0];

    const db = getDb();

    let user = await db.user.findFirst({
      where: {
        OR: [{ email }, { accounts: { some: { provider, providerAccountId } } }],
      },
      include: {
        accounts: { select: { provider: true, providerAccountId: true } },
      },
    });

    if (user) {
      const existingAccount = user.accounts?.find(
        (acc) => acc.provider === provider && acc.providerAccountId === providerAccountId
      );

      if (!existingAccount) {
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

      if (!user.image && image) {
        await db.user.update({ where: { id: user.id }, data: { image } });
      }

      if (!user.emailVerified) {
        await db.user.update({ where: { id: user.id }, data: { emailVerified: new Date() } });
      }
    } else {
      user = await db.user.create({
        data: {
          email,
          name,
          image,
          emailVerified: new Date(), // OAuth emails are pre-verified
          hashedPassword: '', // No password for OAuth users
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

    const backendToken = await signAccessToken(user.id, user.email, user.role);
    return { id: user.id, email: user.email, name: user.name, role: user.role, image: user.image, accessToken: backendToken };
  } catch (error) {
    console.error('syncOAuthUser error', error);
    return null;
  }
}

/** Mirrors POST /api/v1/auth/refresh: signature-checked (expiry ignored) → fresh JWT. */
export async function refreshBackendToken(token: string): Promise<string | null> {
  try {
    const payload = await verifyTokenIgnoringExpiration(token);
    const userId = typeof payload.sub === 'string' ? payload.sub : null;
    if (!userId) return null;

    const user = await getDb().user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, role: true, isSuspended: true },
    });

    if (!user || user.isSuspended) return null;

    return signAccessToken(user.id, user.email, user.role);
  } catch {
    return null;
  }
}
