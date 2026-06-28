// Force dynamic rendering — filesystem access fails during static prerender
export const dynamic = 'force-dynamic';
export const revalidate = 3600;

import { NextResponse } from 'next/server';
import { INDEXABLE_LOCALES } from '@/i18n.config';
import { BASE_URL } from '@/lib/sitemap/utils';

// Sitemap index. Referenced from /robots.txt. Lists the per-locale sitemap for
// each INDEXABLE locale only (en, es, fr, de, ar) plus the focused blog
// sitemap. Noindexed locales are omitted — listing their sitemaps would tell
// Google to crawl URLs that emit `noindex`, wasting crawl budget and sending
// contradictory signals.
export async function GET() {
  const now = new Date().toISOString();
  const items = [
    // Per-locale sitemaps (rewritten to /api/sitemap/{locale}) — indexable only
    ...INDEXABLE_LOCALES.map((locale) => `${BASE_URL}/sitemap-${locale}.xml`),
    // Standalone blog sitemap kept for backward-compat with existing GSC
    // submissions; can be retired once GSC reads the index.
    `${BASE_URL}/sitemap-blog.xml`,
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items.map((loc) => `  <sitemap><loc>${loc}</loc><lastmod>${now}</lastmod></sitemap>`).join('\n')}
</sitemapindex>`;
  return new NextResponse(body, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
