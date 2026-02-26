import { MetadataRoute } from 'next';
import { getAllPosts, getAllCategories, getAllCareerPosts, getAllCareerCategories, getAllCareerTips, getAllCareerTipsCategories, getLocaleOnlyPostSlugs, getLocaleOnlyCareerTipSlugs } from '@/lib/blog/posts';
import { getAllResumeExamples, AUTHORS } from '@/lib/resume-examples/posts';
import { getAllCoverLetterExamples } from '@/lib/cover-letter-examples/posts';
import { getAllCategorySlugs } from '@/lib/templates/categories';
import { getLocalizedPath } from '@/lib/localized-paths';
import { locales } from '@/i18n.config';

function localizedUrls(baseUrl: string, path: string, options: { lastModified: Date; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }): MetadataRoute.Sitemap {
  return locales.map(locale => ({
    url: `${baseUrl}/${locale}${getLocalizedPath(path, locale)}`,
    lastModified: options.lastModified,
    changeFrequency: options.changeFrequency,
    priority: options.priority,
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bestairesumes.com';
  const now = new Date();

  // Static pages (localized)
  const staticRoutes = [
    { path: '', priority: 1 },
    { path: '/features', priority: 0.8 },
    { path: '/templates', priority: 0.8 },
    { path: '/pricing', priority: 0.8 },
    { path: '/about', priority: 0.7 },
    { path: '/privacy', priority: 0.3 },
    { path: '/blog', priority: 0.8 },
    { path: '/career', priority: 0.7 },
    { path: '/career-tips', priority: 0.7 },
    { path: '/resume-examples', priority: 0.9 },
    { path: '/cover-letter-examples', priority: 0.9 },
    { path: '/resume-format', priority: 0.8 },
    { path: '/builder', priority: 0.8 },
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
    { path: '/about/authors', priority: 0.5 },
  ];

  const staticPages = staticRoutes.flatMap(route =>
    localizedUrls(baseUrl, route.path, { lastModified: now, changeFrequency: 'weekly', priority: route.priority })
  );

  // Author pages (localized)
  const authorPages = Object.values(AUTHORS).flatMap(author =>
    localizedUrls(baseUrl, `/about/${author.slug}`, { lastModified: now, changeFrequency: 'monthly', priority: 0.6 })
  );

  // Blog posts (localized)
  const posts = await getAllPosts();
  const blogPages = posts
    .filter(post => !post.postType || post.postType === 'blog' || post.postType === 'both')
    .flatMap(post =>
      localizedUrls(baseUrl, `/blog/${post.slug}`, { lastModified: new Date(post.date), changeFrequency: 'monthly', priority: 0.7 })
    );

  // Career posts (localized)
  const careerPosts = await getAllCareerPosts();
  const careerPages = careerPosts.flatMap(post =>
    localizedUrls(baseUrl, `/career/${post.slug}`, { lastModified: new Date(post.date), changeFrequency: 'monthly', priority: 0.7 })
  );

  // Career tips (localized)
  const careerTips = await getAllCareerTips();
  const careerTipsPages = careerTips.flatMap(tip =>
    localizedUrls(baseUrl, `/career-tips/${tip.slug}`, { lastModified: new Date(tip.date), changeFrequency: 'monthly', priority: 0.7 })
  );

  // Blog category pages (localized)
  const categories = await getAllCategories();
  const categoryPages = categories.flatMap(category =>
    localizedUrls(baseUrl, `/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`, { lastModified: now, changeFrequency: 'weekly', priority: 0.6 })
  );

  // Career category pages (localized)
  const careerCategories = await getAllCareerCategories();
  const careerCategoryPages = careerCategories.flatMap(category =>
    localizedUrls(baseUrl, `/career/category/${category.toLowerCase().replace(/\s+/g, '-')}`, { lastModified: now, changeFrequency: 'weekly', priority: 0.6 })
  );

  // Career tips category pages (localized)
  const careerTipsCategories = await getAllCareerTipsCategories();
  const careerTipsCategoryPages = careerTipsCategories.flatMap(category =>
    localizedUrls(baseUrl, `/career-tips/category/${category.toLowerCase().replace(/\s+/g, '-')}`, { lastModified: now, changeFrequency: 'weekly', priority: 0.6 })
  );

  // Resume examples (localized)
  const resumeExamples = await getAllResumeExamples();
  const resumeExamplesPages = resumeExamples.flatMap(example =>
    localizedUrls(baseUrl, `/resume-examples/${example.slug}`, { lastModified: new Date(example.date), changeFrequency: 'monthly', priority: 0.8 })
  );

  // Cover letter examples (localized)
  const coverLetterExamples = await getAllCoverLetterExamples();
  const coverLetterPages = coverLetterExamples.flatMap(example =>
    localizedUrls(baseUrl, `/cover-letter-examples/${example.slug}`, { lastModified: new Date(example.date), changeFrequency: 'monthly', priority: 0.8 })
  );

  // Template category pages (localized)
  const templateCategorySlugs = getAllCategorySlugs();
  const templateCategoryPages = templateCategorySlugs.flatMap(slug =>
    localizedUrls(baseUrl, `/templates/${slug}`, { lastModified: now, changeFrequency: 'weekly', priority: 0.7 })
  );

  // Locale-only blog posts (e.g., Spanish posts with unique slugs not in English)
  const localeOnlyBlogPages: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    if (locale === 'en') continue;
    const localePosts = getLocaleOnlyPostSlugs(locale);
    for (const post of localePosts) {
      localeOnlyBlogPages.push({
        url: `${baseUrl}/${locale}${getLocalizedPath(`/blog/${post.slug}`, locale)}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  // Locale-only career-tips (e.g., German career-tips with unique slugs)
  const localeOnlyCareerTipsPages: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    if (locale === 'en') continue;
    const localeTips = getLocaleOnlyCareerTipSlugs(locale);
    for (const tip of localeTips) {
      localeOnlyCareerTipsPages.push({
        url: `${baseUrl}/${locale}${getLocalizedPath(`/career-tips/${tip.slug}`, locale)}`,
        lastModified: new Date(tip.date),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  return [
    ...staticPages,
    ...authorPages,
    ...blogPages,
    ...localeOnlyBlogPages,
    ...careerPages,
    ...careerTipsPages,
    ...localeOnlyCareerTipsPages,
    ...categoryPages,
    ...careerCategoryPages,
    ...careerTipsCategoryPages,
    ...resumeExamplesPages,
    ...coverLetterPages,
    ...templateCategoryPages,
  ];
}
