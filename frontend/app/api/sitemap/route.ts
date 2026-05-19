// Force dynamic rendering — filesystem access fails during static prerender
export const dynamic = 'force-dynamic';
export const revalidate = 3600;

import { buildAllSitemapEntries } from '@/lib/sitemap/build';
import { toXml, xmlResponse } from '@/lib/sitemap/utils';

// Legacy monolithic sitemap. Kept for backward compatibility with the URL
// already submitted in Google Search Console. New per-locale sitemaps live
// at /sitemap-{locale}.xml and are referenced from /sitemap-index.xml.
export async function GET() {
  const entries = await buildAllSitemapEntries();
  return xmlResponse(toXml(entries));
}
