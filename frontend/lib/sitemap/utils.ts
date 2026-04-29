import { NextResponse } from 'next/server';
import { getLocalizedPath } from '@/lib/localized-paths';
import { locales, INDEXABLE_EXAMPLE_LOCALES } from '@/i18n.config';

export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bestairesumes.com';

export interface SitemapEntry {
  url: string;
  lastModified: Date;
  changeFrequency: string;
  priority: number;
}

interface UrlOptions {
  lastModified: Date;
  changeFrequency: string;
  priority: number;
}

export function localizedUrls(path: string, options: UrlOptions): SitemapEntry[] {
  return locales.map((locale) => ({
    url: `${BASE_URL}/${locale}${getLocalizedPath(path, locale)}`,
    lastModified: options.lastModified,
    changeFrequency: options.changeFrequency,
    priority: options.priority,
  }));
}

// Same as localizedUrls but only emits entries for locales where example
// content is allowed to be indexed. Pages outside this list emit `noindex`,
// so including them in the sitemap would send Google contradictory signals.
export function indexableExampleLocaleUrls(path: string, options: UrlOptions): SitemapEntry[] {
  return INDEXABLE_EXAMPLE_LOCALES.map((locale) => ({
    url: `${BASE_URL}/${locale}${getLocalizedPath(path, locale)}`,
    lastModified: options.lastModified,
    changeFrequency: options.changeFrequency,
    priority: options.priority,
  }));
}

export function toXml(entries: SitemapEntry[]): string {
  const urls = entries
    .map(
      (entry) =>
        `<url><loc>${entry.url}</loc><lastmod>${entry.lastModified.toISOString()}</lastmod><changefreq>${entry.changeFrequency}</changefreq><priority>${entry.priority}</priority></url>`,
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
}

export function xmlResponse(xml: string): NextResponse {
  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
