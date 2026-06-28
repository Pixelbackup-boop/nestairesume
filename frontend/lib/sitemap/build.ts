// Shared entry-building logic for sitemap routes.
//
// Both the monolithic `app/api/sitemap/route.ts` and the new per-locale
// `app/api/sitemap/[locale]/route.ts` import from here so URL generation
// stays consistent. The default-locale URL strip-prefix logic lives in
// `getLocalizedUrl` (used by the helpers in `./utils.ts`).

import {
  getAllPosts,
  getAllCategories,
  getAllCareerPosts,
  getAllCareerTips,
  getAllCareerTipsCategories,
  getLocaleOnlyPostSlugs,
  getLocaleOnlyCareerTipSlugs,
} from '@/lib/blog/posts';
import { getAllResumeExamples, AUTHORS } from '@/lib/resume-examples/posts';
import { getAllCoverLetterExamples } from '@/lib/cover-letter-examples/posts';
import { getAllCategorySlugs } from '@/lib/templates/categories';
import { getLocalizedUrl } from '@/lib/localized-paths';
import { locales, defaultLocale, isIndexableLocale, Locale } from '@/i18n.config';
import {
  BASE_URL,
  SitemapEntry,
  localizedUrls,
  indexableExampleLocaleUrls,
  indexableContentLocaleUrls,
} from '@/lib/sitemap/utils';

export async function buildAllSitemapEntries(): Promise<SitemapEntry[]> {
  const now = new Date();
  const entries: SitemapEntry[] = [];

  const staticRoutes = [
    { path: '', priority: 1 },
    { path: '/features', priority: 0.8 },
    { path: '/templates', priority: 0.8 },
    { path: '/pricing', priority: 0.8 },
    { path: '/about', priority: 0.7 },
    { path: '/privacy', priority: 0.3 },
    { path: '/blog', priority: 0.9 },
    { path: '/career', priority: 0.7 },
    { path: '/career-tips', priority: 0.7 },
    { path: '/resume-format', priority: 0.8 },
    { path: '/tools', priority: 0.8 },
    { path: '/tools/cover-letter', priority: 0.7 },
    { path: '/tools/resignation-letter', priority: 0.7 },
    { path: '/tools/ats-checker', priority: 0.7 },
    { path: '/tools/mock-interview', priority: 0.7 },
    { path: '/canva-alternative', priority: 0.7 },
    { path: '/overleaf-alternative', priority: 0.7 },
    { path: '/resume-io-alternative', priority: 0.7 },
    { path: '/rezi-alternative', priority: 0.7 },
    { path: '/zety-alternative', priority: 0.7 },
    { path: '/livecareer-alternative', priority: 0.7 },
    { path: '/adobe-alternative', priority: 0.7 },
    { path: '/nova-alternative', priority: 0.7 },
    { path: '/europass-alternative', priority: 0.7 },
    { path: '/doda-alternative', priority: 0.7 },
    { path: '/compare/chatgpt-vs-ai-resume-builder', priority: 0.7 },
    { path: '/ats-friendly-templates', priority: 0.8 },
    { path: '/free-resume-builder', priority: 0.8 },
    { path: '/resume-ai', priority: 0.8 },
    { path: '/resume-maker', priority: 0.8 },
    { path: '/biodata-format', priority: 0.7 },
    { path: '/terms', priority: 0.3 },
    { path: '/community', priority: 0.5 },
    { path: '/help', priority: 0.5 },
    { path: '/about/authors', priority: 0.5 },
  ];

  for (const route of staticRoutes) {
    entries.push(...localizedUrls(route.path, { lastModified: now, changeFrequency: 'weekly', priority: route.priority }));
  }

  for (const author of Object.values(AUTHORS)) {
    entries.push(...localizedUrls(`/about/${author.slug}`, { lastModified: now, changeFrequency: 'monthly', priority: 0.6 }));
  }

  for (const slug of getAllCategorySlugs()) {
    entries.push(...localizedUrls(`/templates/${slug}`, { lastModified: now, changeFrequency: 'weekly', priority: 0.7 }));
  }

  entries.push(...indexableExampleLocaleUrls('/resume-examples', { lastModified: now, changeFrequency: 'weekly', priority: 0.9 }));
  entries.push(...indexableExampleLocaleUrls('/cover-letter-examples', { lastModified: now, changeFrequency: 'weekly', priority: 0.9 }));

  const resumeExamples = await getAllResumeExamples();
  for (const example of resumeExamples) {
    entries.push(...indexableExampleLocaleUrls(`/resume-examples/${example.slug}`, { lastModified: new Date(example.date), changeFrequency: 'monthly', priority: 0.8 }));
  }

  const coverLetterExamples = await getAllCoverLetterExamples();
  for (const example of coverLetterExamples) {
    entries.push(...indexableExampleLocaleUrls(`/cover-letter-examples/${example.slug}`, { lastModified: new Date(example.date), changeFrequency: 'monthly', priority: 0.8 }));
  }

  const posts = await getAllPosts();
  for (const post of posts.filter(p => !p.postType || p.postType === 'blog' || p.postType === 'both')) {
    entries.push(...indexableContentLocaleUrls('blog', post.slug, `/blog/${post.slug}`, { lastModified: new Date(post.date), changeFrequency: 'weekly', priority: 0.9 }));
  }

  const careerPosts = await getAllCareerPosts();
  for (const post of careerPosts) {
    entries.push(...indexableContentLocaleUrls('blog', post.slug, `/career/${post.slug}`, { lastModified: new Date(post.date), changeFrequency: 'monthly', priority: 0.7 }));
  }

  const categories = await getAllCategories();
  for (const category of categories) {
    entries.push(...localizedUrls(`/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`, { lastModified: now, changeFrequency: 'weekly', priority: 0.6 }));
  }

  const careerTipsCategories = await getAllCareerTipsCategories();
  for (const category of careerTipsCategories) {
    entries.push(...localizedUrls(`/career-tips/category/${category.toLowerCase().replace(/\s+/g, '-')}`, { lastModified: now, changeFrequency: 'weekly', priority: 0.6 }));
  }

  for (const locale of locales) {
    if (locale === defaultLocale) continue;
    if (!isIndexableLocale(locale)) continue; // skip noindexed locales' locale-only posts
    for (const post of getLocaleOnlyPostSlugs(locale)) {
      entries.push({
        url: getLocalizedUrl(BASE_URL, `/blog/${post.slug}`, locale),
        lastModified: new Date(post.date),
        changeFrequency: 'weekly',
        priority: 0.9,
      });
    }
  }

  const careerTips = await getAllCareerTips();
  for (const tip of careerTips) {
    entries.push(...indexableContentLocaleUrls('careerTips', tip.slug, `/career-tips/${tip.slug}`, { lastModified: new Date(tip.date), changeFrequency: 'monthly', priority: 0.7 }));
  }

  for (const locale of locales) {
    if (locale === defaultLocale) continue;
    if (!isIndexableLocale(locale)) continue; // skip noindexed locales' locale-only career tips
    for (const tip of getLocaleOnlyCareerTipSlugs(locale)) {
      entries.push({
        url: getLocalizedUrl(BASE_URL, `/career-tips/${tip.slug}`, locale),
        lastModified: new Date(tip.date),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  return entries;
}

/**
 * Determine which locale a sitemap URL belongs to based on its path prefix.
 * Default-locale URLs have no prefix (e.g., `https://site.com/pricing`).
 * Other locales are prefixed (e.g., `https://site.com/es/pricing`).
 */
export function urlLocale(url: string, base = BASE_URL): Locale {
  const after = url.slice(base.length);
  const seg = after.split('/')[1];
  if (seg && (locales as readonly string[]).includes(seg)) {
    return seg as Locale;
  }
  return defaultLocale;
}

export function entriesForLocale(entries: SitemapEntry[], locale: Locale): SitemapEntry[] {
  return entries.filter((e) => urlLocale(e.url) === locale);
}
