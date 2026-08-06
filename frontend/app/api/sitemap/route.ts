// Build-time generation: the MDX content is read with fs, which exists in the
// Node build environment but NOT at runtime on Cloudflare Workers (runtime
// rendering silently dropped every content-derived URL). No `revalidate` —
// ISR would re-render at runtime without fs and break again; sitemaps only
// change with deploys anyway.
export const dynamic = 'force-static';

import { buildAllSitemapEntries } from '@/lib/sitemap/build';
import { toXml, xmlResponse } from '@/lib/sitemap/utils';

// Legacy monolithic sitemap. Kept for backward compatibility with the URL
// already submitted in Google Search Console. New per-locale sitemaps live
// at /sitemap-{locale}.xml and are referenced from /sitemap-index.xml.
export async function GET() {
  const entries = await buildAllSitemapEntries();
  return xmlResponse(toXml(entries));
}
