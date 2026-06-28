import type { NextConfig } from "next";
import path from 'path';
import createNextIntlPlugin from 'next-intl/plugin';
import bundleAnalyzer from '@next/bundle-analyzer';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');
const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' });

const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://embed.tawk.to https://js.stripe.com https://widget.trustpilot.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://embed.tawk.to",
      "img-src 'self' data: blob: https:",
      "font-src 'self' https://fonts.gstatic.com https://*.tawk.to",
      `connect-src 'self' ${process.env.NODE_ENV === 'development' ? 'http://localhost:4444' : ''} ${(process.env.NEXT_PUBLIC_API_URL || '').trim()} https://*.bestairesumes.com https://www.google-analytics.com https://*.tawk.to wss://*.tawk.to https://tawk.link https://api.stripe.com https://widget.trustpilot.com https://pagead2.googlesyndication.com`,
      "frame-src https://embed.tawk.to https://js.stripe.com https://widget.trustpilot.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com",
      "worker-src 'self' blob:",
    ].join('; '),
  },
];

const nextConfig: NextConfig = {
  // Standalone output for Docker/Cloud Run deployment
  output: 'standalone',

  // Rewrite /sitemap*.xml to API routes (bypasses next-intl middleware).
  // Order matters: more specific patterns first so /sitemap-blog.xml and
  // /sitemap-index.xml don't get captured by the per-locale `:locale` pattern.
  async rewrites() {
    return [
      {
        source: '/sitemap-index.xml',
        destination: '/api/sitemap-index',
      },
      {
        source: '/sitemap-blog.xml',
        destination: '/api/sitemap-blog',
      },
      {
        source: '/sitemap-:locale.xml',
        destination: '/api/sitemap/:locale',
      },
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ];
  },

  // Redirects for removed/renamed pages.
  //
  // SEO migration: as of the `localePrefix: 'as-needed'` switch, English URLs
  // live at the root (no `/en` prefix). We 301-redirect prior `/en/*` URLs to
  // their non-prefixed equivalents so existing backlinks/bookmarks preserve
  // SEO equity. Order matters: list these BEFORE the generic `:locale` rules
  // so `/en/x` is caught and rewritten rather than falling through to the
  // non-default locale matchers.
  async redirects() {
    return [
      // SEO migration — strip /en prefix from default-locale URLs
      {
        source: '/en',
        destination: '/',
        permanent: true,
      },
      {
        source: '/en/:path*',
        destination: '/:path*',
        permanent: true,
      },

      // Existing redirects
      {
        source: '/:locale/templates/ats-friendly',
        destination: '/:locale/templates',
        permanent: true,
      },
      // Old tool URLs → new tool paths
      {
        source: '/cover-letter-builder',
        destination: '/tools/cover-letter',
        permanent: true,
      },
      {
        source: '/:locale/cover-letter-builder',
        destination: '/:locale/tools/cover-letter',
        permanent: true,
      },
      {
        source: '/ats-resume-checker',
        destination: '/tools/ats-checker',
        permanent: true,
      },
      {
        source: '/:locale/ats-resume-checker',
        destination: '/:locale/tools/ats-checker',
        permanent: true,
      },
      // Old /career/ category URLs → career-tips
      {
        source: '/:locale/career/category/:category',
        destination: '/:locale/career-tips/category/:category',
        permanent: true,
      },
    ];
  },

  // Security + caching headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      // Cache Next.js static assets (immutable hashed filenames)
      {
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // Cache public images (30 days)
      {
        source: '/Img/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=2592000' },
        ],
      },
      // Cache fonts (1 year, immutable)
      {
        source: '/fonts/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // Edge-cache CONTENT HTML so Googlebot fetches are cheap → higher crawl
      // rate. These pages render identical HTML for everyone (auth state is
      // client-hydrated in <Header/>), so shared-cache is safe. `s-maxage` is
      // CDN-only (browsers revalidate). ONLY content path prefixes are listed
      // here — personalized routes (auth, dashboard, builder, checkout,
      // account, onboarding, admin, api) are intentionally excluded so they are
      // never cached. Requires a matching Cloudflare Cache Rule to take effect.
      // English (root) content paths:
      {
        source: '/:type(resume-examples|cover-letter-examples|career-tips|career|blog)/:rest*',
        headers: [
          { key: 'Cache-Control', value: 'public, s-maxage=3600, stale-while-revalidate=86400' },
        ],
      },
      // Locale-prefixed content paths (English segments for most locales +
      // localized segments for es/pt). Locale param is constrained to real
      // locales so no personalized first-segment route can match.
      {
        source: '/:locale(es|fr|de|ar|ja|ko|it|pt|tr|vi|th|zh|ms|id|pl|nl)/:type(resume-examples|cover-letter-examples|career-tips|career|blog|ejemplos-de-curriculum|ejemplos-de-carta-de-presentacion|consejos-profesionales|exemplos-de-curriculo|exemplos-de-carta-de-apresentacao|dicas-de-carreira)/:rest*',
        headers: [
          { key: 'Cache-Control', value: 'public, s-maxage=3600, stale-while-revalidate=86400' },
        ],
      },
    ];
  },

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [200, 400, 640, 828, 1080],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // Tree-shaking for large libraries + client-side router cache
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'recharts'],
    staleTimes: {
      dynamic: 30,   // cache dynamic pages for 30s (back/forward navigation)
      static: 300,   // cache static pages for 5min (content pages, blog, examples)
    },
  },

  // Fix Turbopack workspace root detection (multiple lockfiles in monorepo)
  turbopack: {
    root: path.resolve(process.cwd()),
  },

  // Webpack configuration for bundle splitting
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Split heavy libraries into separate async chunks
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks?.cacheGroups,
          // Konva + react-konva (~400-500KB) - only used in canvas-editor
          konva: {
            test: /[\\/]node_modules[\\/](konva|react-konva)[\\/]/,
            name: 'konva',
            chunks: 'async',
            priority: 30,
          },
          // jsPDF (~600KB) - only used in canvas-editor
          jspdf: {
            test: /[\\/]node_modules[\\/]jspdf[\\/]/,
            name: 'jspdf',
            chunks: 'async',
            priority: 30,
          },
          // recharts (~200KB) - only used in admin dashboard
          recharts: {
            test: /[\\/]node_modules[\\/]recharts[\\/]/,
            name: 'recharts',
            chunks: 'async',
            priority: 30,
          },
        },
      };
    }
    return config;
  },
};

export default withBundleAnalyzer(withNextIntl(nextConfig));
