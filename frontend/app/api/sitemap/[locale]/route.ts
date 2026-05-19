// Force dynamic rendering — filesystem access fails during static prerender
export const dynamic = 'force-dynamic';
export const revalidate = 3600;

import { notFound } from 'next/navigation';
import { buildAllSitemapEntries, entriesForLocale } from '@/lib/sitemap/build';
import { toXml, xmlResponse } from '@/lib/sitemap/utils';
import { locales, Locale } from '@/i18n.config';

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
