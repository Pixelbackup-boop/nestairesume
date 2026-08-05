/**
 * Shared helpers for the /api/v1/auth routes running on Cloudflare Workers.
 *
 * Ported from the Express backend (backend/src/middleware/auth.ts,
 * backend/src/services/authService.ts, backend/src/services/emailService.ts)
 * so the Next.js routes stay behaviorally equivalent while the backend is retired.
 */
import { NextResponse } from 'next/server';
import { SignJWT, jwtVerify, errors as joseErrors } from 'jose';
import type { JWTPayload } from 'jose';
import type { ZodError } from 'zod';
import type { PrismaClient } from '@/lib/generated/prisma/client';
import { getEnv } from './db';

// ==================== CORS ====================

const ALLOWED_ORIGINS: readonly string[] = [
  'https://bestairesumes.com',
  'https://www.bestairesumes.com',
  'http://localhost:4455',
];

export function corsHeaders(origin: string | null): Record<string, string> {
  const headers: Record<string, string> = {
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };

  // Mirror the backend cors() config: echo the origin only when allowed
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
    headers['Access-Control-Allow-Credentials'] = 'true';
  }

  return headers;
}

export function jsonResponse(data: unknown, status: number, origin: string | null): NextResponse {
  return NextResponse.json(data, { status, headers: corsHeaders(origin) });
}

/** CORS preflight handler — re-export from each route: `export { OPTIONS } from '@/lib/server/apiUtils'` */
export function OPTIONS(request: Request): Response {
  return new Response(null, { status: 204, headers: corsHeaders(request.headers.get('origin')) });
}

// ==================== Validation ====================

/** Mirrors the backend validateBody() 400 response shape (backend/src/middleware/validation.ts) */
export function validationErrorResponse(error: ZodError, origin: string | null): NextResponse {
  const formattedErrors = error.issues.map((issue) => ({
    field: issue.path.map((segment) => String(segment)).join('.'),
    message: issue.message,
  }));

  return jsonResponse(
    {
      error: 'Validation failed',
      detail: formattedErrors[0]?.message || 'Invalid request data',
      errors: formattedErrors,
    },
    400,
    origin
  );
}

// ==================== JWT ====================

// Matches backend config/env.ts dev fallback
const DEV_FALLBACK_JWT_SECRET = 'dev-fallback-secret-do-not-use-in-production';
const DEFAULT_ACCESS_TOKEN_EXPIRE_MINUTES = 30;

export interface TokenUser {
  id: string;
  email: string;
  role: string;
}

function getJwtSecretKey(): Uint8Array {
  let secret: string | undefined;
  try {
    secret = getEnv().JWT_SECRET;
  } catch {
    // Not running inside a Cloudflare request context (e.g. plain `next dev`)
  }
  secret = secret || process.env.JWT_SECRET || process.env.SECRET_KEY;

  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('JWT_SECRET environment variable is required in production');
    }
    secret = DEV_FALLBACK_JWT_SECRET;
  }

  return new TextEncoder().encode(secret);
}

function getAccessTokenExpireMinutes(): number {
  return parseInt(process.env.ACCESS_TOKEN_EXPIRE_MINUTES || String(DEFAULT_ACCESS_TOKEN_EXPIRE_MINUTES), 10);
}

/** Same payload shape as backend createAccessToken(): { sub, email, role, iat, exp } via HS256 */
export async function signAccessToken(userId: string, email: string, role: string): Promise<string> {
  const nowSeconds = Math.floor(Date.now() / 1000);
  const expiresInSeconds = getAccessTokenExpireMinutes() * 60;

  return new SignJWT({ email, role })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(userId)
    .setIssuedAt(nowSeconds)
    .setExpirationTime(nowSeconds + expiresInSeconds)
    .sign(getJwtSecretKey());
}

/** Verify a token (expiry enforced). Returns null on any failure — mirrors authenticateToken middleware. */
export async function verifyAccessToken(token: string): Promise<TokenUser | null> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    if (typeof payload.sub !== 'string' || payload.sub.length === 0) return null;

    return {
      id: payload.sub,
      email: typeof payload.email === 'string' ? payload.email : '',
      role: typeof payload.role === 'string' ? payload.role : 'user', // Default to user for backward compatibility
    };
  } catch {
    return null;
  }
}

/**
 * Verify signature but allow expired tokens — mirrors the backend refresh flow
 * (jwt.verify with ignoreExpiration: true). Throws on invalid signature/malformed token.
 */
export async function verifyTokenIgnoringExpiration(token: string): Promise<JWTPayload> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    return payload;
  } catch (error) {
    // Signature is verified before claims validation, so an expired-but-authentic
    // token surfaces as JWTExpired with the parsed payload attached.
    if (error instanceof joseErrors.JWTExpired) {
      return error.payload;
    }
    throw error;
  }
}

// ==================== Auth Guard ====================

export function getBearerToken(request: Request): string | null {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.split(' ')[1]; // Bearer TOKEN
  return token || null;
}

/** Extract Bearer token and verify it. Null when the header is missing or the token is invalid. */
export async function authenticateRequest(request: Request): Promise<TokenUser | null> {
  const token = getBearerToken(request);
  if (!token) return null;
  return verifyAccessToken(token);
}

/** Same field selection as backend getUserById() — the /auth/me response shape */
export async function getUserProfile(db: PrismaClient, userId: string) {
  return db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      image: true,
      role: true,
      subscriptionTier: true,
      subscriptionStatus: true,
      trialEndsAt: true,
      isSuspended: true,
      createdAt: true,
    },
  });
}

// ==================== Email (Brevo) ====================

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';
export const VERIFICATION_CODE_EXPIRY_MINUTES = 10;

function getBrevoApiKey(): string {
  let key: string | undefined;
  try {
    key = getEnv().BREVO_API_KEY;
  } catch {
    // Not running inside a Cloudflare request context
  }
  return key || process.env.BREVO_API_KEY || '';
}

function getEmailFromAddress(): string {
  return process.env.EMAIL_FROM_ADDRESS || 'noreply@bestairesumes.com';
}

// Generate 6-digit verification code with a CSPRNG (Math.random is predictable).
// Rejection sampling avoids modulo bias across the 900000-value range.
export function generateVerificationCode(): string {
  const range = 900000;
  const limit = Math.floor(0xffffffff / range) * range;
  const buf = new Uint32Array(1);
  do {
    crypto.getRandomValues(buf);
  } while (buf[0] >= limit);
  return (100000 + (buf[0] % range)).toString();
}

interface SendEmailOptions {
  to: string;
  toName?: string;
  subject: string;
  htmlContent: string;
  textContent?: string;
}

/**
 * Send a transactional email through the Brevo HTTP API.
 * Mirrors backend sendEmail(): never throws — returns false on failure so
 * registration still succeeds even when the email provider is down.
 */
export async function sendEmail(options: SendEmailOptions): Promise<boolean> {
  const apiKey = getBrevoApiKey();
  if (!apiKey) {
    console.error('Brevo API key is not configured — email not sent', { to: options.to });
    return false;
  }

  try {
    const response = await fetch(BREVO_API_URL, {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        sender: {
          name: 'Best AI Resume',
          email: getEmailFromAddress(),
        },
        to: [{ email: options.to, name: options.toName || options.to }],
        subject: options.subject,
        htmlContent: options.htmlContent,
        ...(options.textContent ? { textContent: options.textContent } : {}),
      }),
    });

    if (!response.ok) {
      const body = await response.text().catch(() => '');
      console.error('Failed to send email', { to: options.to, status: response.status, body });
      return false;
    }

    return true;
  } catch (error) {
    console.error('Failed to send email', { to: options.to, error });
    return false;
  }
}

// Send verification code email — HTML/text templates copied from backend emailService.ts
export async function sendVerificationEmail(email: string, name: string, code: string): Promise<boolean> {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f5;">
      <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
          <td align="center" style="padding: 40px 0;">
            <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              <!-- Header -->
              <tr>
                <td style="padding: 40px 40px 20px; text-align: center; background-color: #00dc82; border-radius: 12px 12px 0 0;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">Best AI Resume</h1>
                </td>
              </tr>

              <!-- Content -->
              <tr>
                <td style="padding: 40px;">
                  <h2 style="margin: 0 0 20px; color: #18181b; font-size: 24px; font-weight: 600;">Verify your email</h2>
                  <p style="margin: 0 0 20px; color: #52525b; font-size: 16px; line-height: 1.6;">
                    Hi ${name},
                  </p>
                  <p style="margin: 0 0 30px; color: #52525b; font-size: 16px; line-height: 1.6;">
                    Thanks for signing up! Please use the verification code below to complete your registration:
                  </p>

                  <!-- Code Box -->
                  <div style="background-color: #f4f4f5; border-radius: 8px; padding: 24px; text-align: center; margin-bottom: 30px;">
                    <span style="font-size: 36px; font-weight: 700; letter-spacing: 8px; color: #18181b;">${code}</span>
                  </div>

                  <p style="margin: 0 0 10px; color: #71717a; font-size: 14px;">
                    This code will expire in <strong>10 minutes</strong>.
                  </p>
                  <p style="margin: 0; color: #71717a; font-size: 14px;">
                    If you didn't create an account, you can safely ignore this email.
                  </p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding: 20px 40px 40px; border-top: 1px solid #e4e4e7;">
                  <p style="margin: 0; color: #a1a1aa; font-size: 12px; text-align: center;">
                    © ${new Date().getFullYear()} Best AI Resume. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  const textContent = `
    Verify your email - Best AI Resume

    Hi ${name},

    Thanks for signing up! Please use the verification code below to complete your registration:

    ${code}

    This code will expire in 10 minutes.

    If you didn't create an account, you can safely ignore this email.

    © ${new Date().getFullYear()} Best AI Resume. All rights reserved.
  `;

  return sendEmail({
    to: email,
    toName: name,
    subject: `${code} is your verification code`,
    htmlContent,
    textContent,
  });
}
