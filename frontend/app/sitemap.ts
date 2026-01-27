import { MetadataRoute } from 'next';
import { getAllPosts, getAllCategories, getAllCareerPosts, getAllCareerCategories, getAllCareerTips, getAllCareerTipsCategories } from '@/lib/blog/posts';
import { getAllResumeExamples } from '@/lib/resume-examples/posts';
import { getAllCategorySlugs } from '@/lib/templates/categories';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bestairesumes.com';

  // Static pages
  const staticPages = [
    '',
    '/features',
    '/templates',
    '/pricing',
    '/about',
    '/privacy',
    '/blog',
    '/career',
    '/career-tips',
    '/resume-examples',
    '/resume-format',
    '/canva-alternative',
    '/overleaf-alternative',
    '/resume-io-alternative',
    '/rezi-alternative',
    '/zety-alternative',
    '/livecareer-alternative',
    '/adobe-alternative',
    '/nova-alternative',
    '/europass-alternative',
    '/compare/chatgpt-vs-ai-resume-builder',
    '/builder',
    '/tools/cover-letter',
    '/tools/resignation-letter',
    '/auth/login',
    '/auth/register',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Blog posts
  const posts = await getAllPosts();
  const blogPages = posts
    .filter(post => !post.postType || post.postType === 'blog' || post.postType === 'both')
    .map(post => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

  // Career posts
  const careerPosts = await getAllCareerPosts();
  const careerPages = careerPosts.map(post => ({
    url: `${baseUrl}/career/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Blog category pages
  const categories = await getAllCategories();
  const categoryPages = categories.map(category => ({
    url: `${baseUrl}/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // Career category pages
  const careerCategories = await getAllCareerCategories();
  const careerCategoryPages = careerCategories.map(category => ({
    url: `${baseUrl}/career/category/${category.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // Career tips articles (from content/career-tips/)
  const careerTips = await getAllCareerTips();
  const careerTipsPages = careerTips.map(tip => ({
    url: `${baseUrl}/career-tips/${tip.slug}`,
    lastModified: new Date(tip.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Career tips category pages
  const careerTipsCategories = await getAllCareerTipsCategories();
  const careerTipsCategoryPages = careerTipsCategories.map(category => ({
    url: `${baseUrl}/career-tips/category/${category.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // Resume examples (job-specific pages)
  const resumeExamples = await getAllResumeExamples();
  const resumeExamplesPages = resumeExamples.map(example => ({
    url: `${baseUrl}/resume-examples/${example.slug}`,
    lastModified: new Date(example.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Template category pages (/templates/modern, /templates/simple, etc.)
  const templateCategorySlugs = getAllCategorySlugs();
  const templateCategoryPages = templateCategorySlugs.map(slug => ({
    url: `${baseUrl}/templates/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages, ...careerPages, ...categoryPages, ...careerCategoryPages, ...careerTipsPages, ...careerTipsCategoryPages, ...resumeExamplesPages, ...templateCategoryPages];
}
