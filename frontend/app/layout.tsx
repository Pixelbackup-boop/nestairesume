import type { Viewport } from 'next';

// Viewport configuration (shared across all locales)
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#080b12' },
    { media: '(prefers-color-scheme: dark)', color: '#080b12' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

// Root layout - minimal, just passes children to locale layout
// The actual html/body/providers are in [locale]/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
