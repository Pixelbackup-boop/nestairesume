// Force dynamic rendering — filesystem access fails during static prerender
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Cache for 1 hour after first request

import { getAllPosts, getAllCategories, getAllCareerPosts, getAllCareerTips, getAllCareerTipsCategories, getLocaleOnlyPostSlugs, getLocaleOnlyCareerTipSlugs } from '@/lib/blog/posts';
import { getAllResumeExamples, AUTHORS } from '@/lib/resume-examples/posts';
import { getAllCoverLetterExamples } from '@/lib/cover-letter-examples/posts';
import { getAllCategorySlugs } from '@/lib/templates/categories';
import { getLocalizedPath } from '@/lib/localized-paths';
import { locales } from '@/i18n.config';
import {
  BASE_URL as baseUrl,
  SitemapEntry,
  localizedUrls,
  indexableExampleLocaleUrls,
  toXml,
  xmlResponse,
} from '@/lib/sitemap/utils';

export async function GET() {
  const now = new Date();
  const entries: SitemapEntry[] = [];

  // ── Static pages ──────────────────────────────────────────────────────
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
    // /resume-examples and /cover-letter-examples are added separately
    // below — they only emit URLs for INDEXABLE_EXAMPLE_LOCALES.
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

  // Authors
  for (const author of Object.values(AUTHORS)) {
    entries.push(...localizedUrls(`/about/${author.slug}`, { lastModified: now, changeFrequency: 'monthly', priority: 0.6 }));
  }

  // Template categories
  for (const slug of getAllCategorySlugs()) {
    entries.push(...localizedUrls(`/templates/${slug}`, { lastModified: now, changeFrequency: 'weekly', priority: 0.7 }));
  }

  // ── Resume / cover-letter index pages (only for indexable locales) ────
  entries.push(...indexableExampleLocaleUrls('/resume-examples', { lastModified: now, changeFrequency: 'weekly', priority: 0.9 }));
  entries.push(...indexableExampleLocaleUrls('/cover-letter-examples', { lastModified: now, changeFrequency: 'weekly', priority: 0.9 }));

  // ── Resume examples (only for indexable locales) ──────────────────────
  const resumeExamples = await getAllResumeExamples();
  for (const example of resumeExamples) {
    entries.push(...indexableExampleLocaleUrls(`/resume-examples/${example.slug}`, { lastModified: new Date(example.date), changeFrequency: 'monthly', priority: 0.8 }));
  }

  // ── Cover letter examples (only for indexable locales) ────────────────
  const coverLetterExamples = await getAllCoverLetterExamples();
  for (const example of coverLetterExamples) {
    entries.push(...indexableExampleLocaleUrls(`/cover-letter-examples/${example.slug}`, { lastModified: new Date(example.date), changeFrequency: 'monthly', priority: 0.8 }));
  }

  // ── Blog posts ────────────────────────────────────────────────────────
  // Priority 0.9 + weekly changeFrequency: blogs earn ~all organic clicks
  // (per GSC), so we tell Google these are our highest-value content pages
  // and worth re-crawling more often than monthly.
  const posts = await getAllPosts();
  for (const post of posts.filter(p => !p.postType || p.postType === 'blog' || p.postType === 'both')) {
    entries.push(...localizedUrls(`/blog/${post.slug}`, { lastModified: new Date(post.date), changeFrequency: 'weekly', priority: 0.9 }));
  }

  // Career posts
  const careerPosts = await getAllCareerPosts();
  for (const post of careerPosts) {
    entries.push(...localizedUrls(`/career/${post.slug}`, { lastModified: new Date(post.date), changeFrequency: 'monthly', priority: 0.7 }));
  }

  // Blog categories
  const categories = await getAllCategories();
  for (const category of categories) {
    entries.push(...localizedUrls(`/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`, { lastModified: now, changeFrequency: 'weekly', priority: 0.6 }));
  }

  // Career-tips categories
  const careerTipsCategories = await getAllCareerTipsCategories();
  for (const category of careerTipsCategories) {
    entries.push(...localizedUrls(`/career-tips/category/${category.toLowerCase().replace(/\s+/g, '-')}`, { lastModified: now, changeFrequency: 'weekly', priority: 0.6 }));
  }

  // ── Locale-only blog posts ────────────────────────────────────────────
  // Match the blog post priority/frequency above — these are real content,
  // not duplicates, and we want Google to crawl them with the same urgency.
  for (const locale of locales) {
    if (locale === 'en') continue;
    for (const post of getLocaleOnlyPostSlugs(locale)) {
      entries.push({
        url: `${baseUrl}/${locale}${getLocalizedPath(`/blog/${post.slug}`, locale)}`,
        lastModified: new Date(post.date),
        changeFrequency: 'weekly',
        priority: 0.9,
      });
    }
  }

  // ── Career tips ───────────────────────────────────────────────────────
  const careerTips = await getAllCareerTips();
  for (const tip of careerTips) {
    entries.push(...localizedUrls(`/career-tips/${tip.slug}`, { lastModified: new Date(tip.date), changeFrequency: 'monthly', priority: 0.7 }));
  }

  // ── Locale-only career tips ───────────────────────────────────────────
  for (const locale of locales) {
    if (locale === 'en') continue;
    for (const tip of getLocaleOnlyCareerTipSlugs(locale)) {
      entries.push({
        url: `${baseUrl}/${locale}${getLocalizedPath(`/career-tips/${tip.slug}`, locale)}`,
        lastModified: new Date(tip.date),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  return xmlResponse(toXml(entries));
}
