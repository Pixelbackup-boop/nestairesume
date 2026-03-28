import { MetadataRoute } from 'next';
import { getAllPosts, getAllCategories, getAllCareerPosts, getAllCareerTips, getLocaleOnlyPostSlugs, getLocaleOnlyCareerTipSlugs } from '@/lib/blog/posts';
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

// Sitemap 0: Static pages, authors, template categories, all category pages
function getStaticAndMiscPages(baseUrl: string, now: Date): MetadataRoute.Sitemap {
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

  const staticPages = staticRoutes.flatMap(route =>
    localizedUrls(baseUrl, route.path, { lastModified: now, changeFrequency: 'weekly', priority: route.priority })
  );

  const authorPages = Object.values(AUTHORS).flatMap(author =>
    localizedUrls(baseUrl, `/about/${author.slug}`, { lastModified: now, changeFrequency: 'monthly', priority: 0.6 })
  );

  const templateCategorySlugs = getAllCategorySlugs();
  const templateCategoryPages = templateCategorySlugs.flatMap(slug =>
    localizedUrls(baseUrl, `/templates/${slug}`, { lastModified: now, changeFrequency: 'weekly', priority: 0.7 })
  );

  return [...staticPages, ...authorPages, ...templateCategoryPages];
}

// Sitemap 1: Resume examples (all locales)
async function getResumeExamplePages(baseUrl: string): Promise<MetadataRoute.Sitemap> {
  const resumeExamples = await getAllResumeExamples();
  return resumeExamples.flatMap(example =>
    localizedUrls(baseUrl, `/resume-examples/${example.slug}`, { lastModified: new Date(example.date), changeFrequency: 'monthly', priority: 0.8 })
  );
}

// Sitemap 2: Cover letter examples (all locales)
async function getCoverLetterPages(baseUrl: string): Promise<MetadataRoute.Sitemap> {
  const coverLetterExamples = await getAllCoverLetterExamples();
  return coverLetterExamples.flatMap(example =>
    localizedUrls(baseUrl, `/cover-letter-examples/${example.slug}`, { lastModified: new Date(example.date), changeFrequency: 'monthly', priority: 0.8 })
  );
}

// Sitemap 3: Blog posts + locale-only blog + career posts + blog/career categories
async function getBlogAndCareerPages(baseUrl: string, now: Date): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const blogPages = posts
    .filter(post => !post.postType || post.postType === 'blog' || post.postType === 'both')
    .flatMap(post =>
      localizedUrls(baseUrl, `/blog/${post.slug}`, { lastModified: new Date(post.date), changeFrequency: 'monthly', priority: 0.7 })
    );

  const careerPosts = await getAllCareerPosts();
  const careerPages = careerPosts.flatMap(post =>
    localizedUrls(baseUrl, `/career/${post.slug}`, { lastModified: new Date(post.date), changeFrequency: 'monthly', priority: 0.7 })
  );

  const categories = await getAllCategories();
  const categoryPages = categories.flatMap(category =>
    localizedUrls(baseUrl, `/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`, { lastModified: now, changeFrequency: 'weekly', priority: 0.6 })
  );

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

  return [...blogPages, ...localeOnlyBlogPages, ...careerPages, ...categoryPages];
}

// Sitemap 4: Career tips + locale-only career tips + career-tips categories
async function getCareerTipsPages(baseUrl: string, _now: Date): Promise<MetadataRoute.Sitemap> {
  const careerTips = await getAllCareerTips();
  const careerTipsPages = careerTips.flatMap(tip =>
    localizedUrls(baseUrl, `/career-tips/${tip.slug}`, { lastModified: new Date(tip.date), changeFrequency: 'monthly', priority: 0.7 })
  );

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

  return [...careerTipsPages, ...localeOnlyCareerTipsPages];
}

export async function generateSitemaps() {
  return [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
}

export default async function sitemap({ id }: { id: Promise<string> }): Promise<MetadataRoute.Sitemap> {
  const resolvedId = Number(await id);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bestairesumes.com';
  const now = new Date();

  switch (resolvedId) {
    case 0: return getStaticAndMiscPages(baseUrl, now);
    case 1: return await getResumeExamplePages(baseUrl);
    case 2: return await getCoverLetterPages(baseUrl);
    case 3: return await getBlogAndCareerPages(baseUrl, now);
    case 4: return await getCareerTipsPages(baseUrl, now);
    default: return [];
  }
}
