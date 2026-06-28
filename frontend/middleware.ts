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

  // Show locale prefix only for non-default locales (e.g., /pricing, /es/pricing).
  // English (default) URLs live at the root; /en/* is 301-redirected to /* by
  // next.config.ts to preserve SEO equity from prior URLs.
  localePrefix: 'as-needed',

  // Disabled: `/` now serves consistent English instead of varying by the
  // Accept-Language header. Better for SEO (one canonical version per URL).
  localeDetection: false,

  // Disabled so next-intl's syncCookie does NOT write a `NEXT_LOCALE` Set-Cookie
  // on every response. `localeDetection: false` alone does NOT stop this in
  // next-intl v4 (syncCookie gates only on `localeCookie`) — without this flag,
  // every non-English locale page (e.g. /es/blog/x) emits Set-Cookie and
  // Cloudflare refuses to edge-cache it, defeating the crawl-rate goal. Safe:
  // locale is fully URL-driven, no server code reads NEXT_LOCALE, and the
  // LanguageSwitcher sets it itself client-side via document.cookie.
  localeCookie: false,

  // Disabled so next-intl does NOT emit a `Link:` response header with hreflang
  // alternates for ALL 18 configured locales. Our page metadata already emits
  // HTML `<link rel="alternate" hreflang>` filtered to the 5 indexable locales;
  // the next-intl Link header (every locale, incl. noindexed ones) conflicted
  // with the HTML and pointed Google at noindexed-locale URLs. HTML hreflang is
  // now the single source of truth.
  alternateLinks: false,
});

export default function middleware(request: NextRequest) {
  // www → non-www redirect (prevent domain authority split)
  const host = request.headers.get('host');
  if (host?.startsWith('www.')) {
    const nonWwwHost = host.replace('www.', '');
    const url = new URL(`https://${nonWwwHost}${request.nextUrl.pathname}${request.nextUrl.search}`);
    return NextResponse.redirect(url, 301);
  }

  const { pathname } = request.nextUrl;

  // Skip middleware for sitemap routes — let Next.js handle directly
  if (pathname === '/sitemap.xml' || pathname.startsWith('/sitemap/')) {
    return NextResponse.next();
  }

  // Server-side route protection for authenticated-only pages.
  // Matches both `/{locale}/dashboard` (non-default locales) and `/dashboard`
  // (English at root, since localePrefix is `as-needed`).
  const protectedPrefixedMatch = pathname.match(/^\/([a-z]{2})\/(dashboard|profile)(\/|$)/);
  const protectedRootMatch = pathname.match(/^\/(dashboard|profile)(\/|$)/);
  const protectedLocale = protectedPrefixedMatch
    ? protectedPrefixedMatch[1]
    : protectedRootMatch
      ? defaultLocale
      : null;
  if (protectedLocale) {
    const isAuthenticated =
      request.cookies.has('auth_token') ||
      request.cookies.has('next-auth.session-token') ||
      request.cookies.has('__Secure-next-auth.session-token');

    if (!isAuthenticated) {
      const loginPath = protectedLocale === defaultLocale
        ? '/auth/login'
        : `/${protectedLocale}/auth/login`;
      const loginUrl = new URL(loginPath, request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

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

  // Fix double-locale prefix (e.g., /id/id/tools/ats-checker → /id/tools/ats-checker)
  const doubleLocaleMatch = pathname.match(/^\/([a-z]{2})\/\1\/(.*)/);
  if (doubleLocaleMatch) {
    const locale = doubleLocaleMatch[1];
    const rest = doubleLocaleMatch[2];
    const fixedUrl = request.nextUrl.clone();
    fixedUrl.pathname = `/${locale}/${rest}`;
    return NextResponse.redirect(fixedUrl, 301);
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
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = redirectPath;
      return NextResponse.redirect(redirectUrl, 301);
    }
  }

  // Run intl middleware and capture the response
  const response = intlMiddleware(request);

  // Set geo_country cookie from Cloudflare's CF-IPCountry header — but ONLY on
  // /auth routes. The sole consumer is the email register/login form
  // (useAuthStore.getGeoCookie); OAuth reads the cf-ipcountry header directly
  // (lib/auth.ts) and admin analytics uses stored DB values. Setting this cookie
  // on content routes would emit Set-Cookie and prevent Cloudflare from
  // edge-caching them (slowing Googlebot's crawl). Scoping it here keeps content
  // pages cookie-free and cacheable while registration still gets the country.
  const isAuthPath = /^\/(?:[a-z]{2}\/)?auth(?:\/|$)/.test(pathname);
  const cfCountry = request.headers.get('cf-ipcountry');
  if (
    isAuthPath &&
    cfCountry && cfCountry !== 'XX' && cfCountry !== 'T1' &&
    !request.cookies.has('geo_country')
  ) {
    response.cookies.set('geo_country', cfCountry.toUpperCase(), {
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      sameSite: 'lax',
    });
  }

  return response;
}

export const config = {
  // Match all paths except:
  // - API routes (/api/*)
  // - Admin routes (/admin/*)
  // - Next.js internals (/_next/*)
  // - Sitemaps (/sitemap.xml, /sitemap/*)
  // - Static files (files with extensions like .png, .js, .xml, etc.)
  matcher: [
    '/((?!api|admin|_next|_vercel|sitemap)(?!.*\\..*).*)',
  ],
};
