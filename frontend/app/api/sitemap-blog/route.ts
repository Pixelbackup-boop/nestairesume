// Build-time generation: the MDX content is read with fs, which exists in the
// Node build environment but NOT at runtime on Cloudflare Workers (runtime
// rendering silently dropped every content-derived URL). No `revalidate` —
// ISR would re-render at runtime without fs and break again; sitemaps only
// change with deploys anyway.
export const dynamic = 'force-static';

import {
  getAllPosts,
  getAllCategories,
  getLocaleOnlyPostSlugs,
} from '@/lib/blog/posts';
import { getLocalizedPath } from '@/lib/localized-paths';
import { locales, isIndexableLocale } from '@/i18n.config';
import {
  BASE_URL,
  SitemapEntry,
  localizedUrls,
  indexableContentLocaleUrls,
  toXml,
  xmlResponse,
} from '@/lib/sitemap/utils';

// A focused sitemap containing only blog content. Submitted separately in
// Google Search Console so per-section indexing stats are visible and
// blog crawl signals stay strong even when the main sitemap grows.
export async function GET() {
  const now = new Date();
  const entries: SitemapEntry[] = [];

  // /blog index (highest priority — entry point to all blog content)
  entries.push(...localizedUrls('/blog', { lastModified: now, changeFrequency: 'daily', priority: 0.9 }));

  // Blog posts (the high-value content earning organic clicks).
  // Only emit URLs for locales with a dedicated MDX file — fallback
  // locales canonical to /en/ and listing them creates a contradictory
  // signal that pushes URLs into "Crawled - currently not indexed."
  const posts = await getAllPosts();
  for (const post of posts.filter((p) => !p.postType || p.postType === 'blog' || p.postType === 'both')) {
    entries.push(
      ...indexableContentLocaleUrls('blog', post.slug, `/blog/${post.slug}`, {
        lastModified: new Date(post.date),
        changeFrequency: 'weekly',
        priority: 0.9,
      }),
    );
  }

  // Blog categories
  const categories = await getAllCategories();
  for (const category of categories) {
    entries.push(
      ...localizedUrls(`/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`, {
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.7,
      }),
    );
  }

  // Locale-only blog posts (e.g., Polish-only content) — INDEXABLE locales only.
  // Noindexed locales' locale-only posts must not be submitted (they emit
  // noindex; listing them contradicts the tag and wastes crawl budget).
  for (const locale of locales) {
    if (locale === 'en') continue;
    if (!isIndexableLocale(locale)) continue;
    for (const post of getLocaleOnlyPostSlugs(locale)) {
      entries.push({
        url: `${BASE_URL}/${locale}${getLocalizedPath(`/blog/${post.slug}`, locale)}`,
        lastModified: new Date(post.date),
        changeFrequency: 'weekly',
        priority: 0.9,
      });
    }
  }

  return xmlResponse(toXml(entries));
}
