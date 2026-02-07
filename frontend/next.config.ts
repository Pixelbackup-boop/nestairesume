import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import bundleAnalyzer from '@next/bundle-analyzer';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');
const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' });

const nextConfig: NextConfig = {
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [200, 400, 640, 828, 1080],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // Optimize tree-shaking for large icon libraries
  experimental: {
    optimizePackageImports: ['lucide-react'],
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
        },
      };
    }
    return config;
  },
};

export default withBundleAnalyzer(withNextIntl(nextConfig));
