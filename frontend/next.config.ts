import type { NextConfig } from "next";
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
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://embed.tawk.to https://js.stripe.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: blob: https:",
      "font-src 'self' https://fonts.gstatic.com",
      `connect-src 'self' ${process.env.NODE_ENV === 'development' ? 'http://localhost:4444' : ''} ${(process.env.NEXT_PUBLIC_API_URL || '').trim()} https://*.bestairesumes.com https://www.google-analytics.com https://embed.tawk.to https://va.tawk.to wss://chat.tawk.to https://api.stripe.com`,
      "frame-src https://embed.tawk.to https://js.stripe.com",
      "worker-src 'self' blob:",
    ].join('; '),
  },
];

const nextConfig: NextConfig = {
  // Redirects for removed pages
  async redirects() {
    return [
      {
        source: '/:locale/templates/ats-friendly',
        destination: '/:locale/templates',
        permanent: true,
      },
    ];
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
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
