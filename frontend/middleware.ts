import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n.config';
import {
  ROUTE_TRANSLATIONS,
  REVERSE_TRANSLATIONS,
} from './lib/localized-paths';

const intlMiddleware = createMiddleware({
  // Supported locales
  locales,

  // Default locale when none is detected
  defaultLocale,

  // Always show locale prefix in URL (e.g., /en/pricing, /es/pricing)
  localePrefix: 'always',

  // Detect locale from Accept-Language header
  localeDetection: true,
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Bypass maintenance for admin, api, internals, static files, maintenance page
  const isExcluded =
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/maintenance') ||
    pathname.includes('.');

  if (process.env.MAINTENANCE_MODE === 'true' && !isExcluded) {
    return NextResponse.rewrite(new URL('/maintenance', request.url));
  }

  // Localized route segment handling (e.g., /es/ejemplos-de-curriculum/slug)
  const localeMatch = pathname.match(/^\/([a-z]{2})\/(.*)/);
  if (localeMatch) {
    const locale = localeMatch[1];
    const restPath = localeMatch[2];
    const firstSegment = restPath.split('/')[0];

    // Localized segment → rewrite to English for internal routing
    // e.g., /es/ejemplos-de-curriculum/slug → /es/resume-examples/slug
    const reverseMap = REVERSE_TRANSLATIONS[locale];
    if (reverseMap?.[firstSegment]) {
      const englishSegment = reverseMap[firstSegment];
      const rewrittenPath = pathname.replace(
        `/${locale}/${firstSegment}`,
        `/${locale}/${englishSegment}`
      );
      const url = request.nextUrl.clone();
      url.pathname = rewrittenPath;
      const response = NextResponse.rewrite(url);
      response.headers.set('x-next-intl-locale', locale);
      return response;
    }

    // English segment that has a localized version → 301 redirect
    // e.g., /es/resume-examples/slug → /es/ejemplos-de-curriculum/slug
    const forwardMap = ROUTE_TRANSLATIONS[locale];
    if (forwardMap?.[firstSegment]) {
      const localizedSegment = forwardMap[firstSegment];
      const redirectPath = pathname.replace(
        `/${locale}/${firstSegment}`,
        `/${locale}/${localizedSegment}`
      );
      return NextResponse.redirect(new URL(redirectPath, request.url), 301);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  // Match all paths except:
  // - API routes (/api/*)
  // - Admin routes (/admin/*)
  // - Next.js internals (/_next/*)
  // - Static files (files with extensions like .png, .js, etc.)
  matcher: [
    '/((?!api|admin|_next|_vercel|.*\\..*).*)',
    '/',
  ],
};
