// Build-time generation: the MDX content is read with fs, which exists in the
// Node build environment but NOT at runtime on Cloudflare Workers (runtime
// rendering silently dropped every content-derived URL). No `revalidate` —
// ISR would re-render at runtime without fs and break again; sitemaps only
// change with deploys anyway.
export const dynamic = 'force-static';

import { notFound } from 'next/navigation';
import { buildAllSitemapEntries, entriesForLocale } from '@/lib/sitemap/build';
import { toXml, xmlResponse } from '@/lib/sitemap/utils';
import { locales, Locale } from '@/i18n.config';

// Prerender every locale's sitemap at build time
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Per-locale sitemap. Exposed at /sitemap-{locale}.xml via a rewrite in
// next.config.ts. Lets Google Search Console show per-language indexation
// stats so we can tell which locales are gaining traction.
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;
  if (!(locales as readonly string[]).includes(locale)) {
    notFound();
  }
  const all = await buildAllSitemapEntries();
  const filtered = entriesForLocale(all, locale as Locale);
  return xmlResponse(toXml(filtered));
}
