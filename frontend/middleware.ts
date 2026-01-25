import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n.config';

export default createMiddleware({
  // Supported locales
  locales,

  // Default locale when none is detected
  defaultLocale,

  // Always show locale prefix in URL (e.g., /en/pricing, /es/pricing)
  localePrefix: 'always',

  // Detect locale from Accept-Language header
  localeDetection: true,
});

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
