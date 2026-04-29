// Force dynamic rendering — filesystem access fails during static prerender
export const dynamic = 'force-dynamic';
export const revalidate = 3600;

import {
  getAllPosts,
  getAllCategories,
  getLocaleOnlyPostSlugs,
} from '@/lib/blog/posts';
import { getLocalizedPath } from '@/lib/localized-paths';
import { locales } from '@/i18n.config';
import {
  BASE_URL,
  SitemapEntry,
  localizedUrls,
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

  // Blog posts (the high-value content earning organic clicks)
  const posts = await getAllPosts();
  for (const post of posts.filter((p) => !p.postType || p.postType === 'blog' || p.postType === 'both')) {
    entries.push(
      ...localizedUrls(`/blog/${post.slug}`, {
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

  // Locale-only blog posts (e.g., Polish-only content)
  for (const locale of locales) {
    if (locale === 'en') continue;
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
