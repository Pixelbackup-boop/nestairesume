import path from 'path';
import { NextResponse } from 'next/server';
import { getLocalizedUrl } from '@/lib/localized-paths';
import { hasLocaleContent } from '@/lib/content-utils';
import { locales, INDEXABLE_EXAMPLE_LOCALES } from '@/i18n.config';

export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bestairesumes.com';

// Locales for which a slug has its own MDX file get a sitemap URL.
// Others fall back to English at runtime — including those falsely tells
// Google the locale URL is unique, while the page's canonical points back
// to /en/. That contradiction is why ~thousands of URLs sit in
// "Crawled - currently not indexed."
const CONTENT_DIRS = {
  blog: path.join(process.cwd(), 'content/blog'),
  careerTips: path.join(process.cwd(), 'content/career-tips'),
} as const;
export type ContentType = keyof typeof CONTENT_DIRS;

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
    url: getLocalizedUrl(BASE_URL, path, locale),
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
    url: getLocalizedUrl(BASE_URL, path, locale),
    lastModified: options.lastModified,
    changeFrequency: options.changeFrequency,
    priority: options.priority,
  }));
}

// Emits one URL per locale that has its own MDX file for `slug`. English is
// always emitted (root file is the source of truth). Locales without a
// dedicated translation are skipped — they fall back to English with a
// canonical pointing to the English URL, so listing them in the sitemap is a
// self-contradicting signal Google ignores.
export function indexableContentLocaleUrls(
  contentType: ContentType,
  slug: string,
  routePath: string,
  options: UrlOptions,
): SitemapEntry[] {
  const dir = CONTENT_DIRS[contentType];
  return locales
    .filter((locale) => hasLocaleContent(dir, slug, locale))
    .map((locale) => ({
      url: getLocalizedUrl(BASE_URL, routePath, locale),
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
