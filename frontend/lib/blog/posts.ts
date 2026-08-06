import fs from 'fs';
import { contentExistsSync, contentReaddirSync, contentReadFileSync } from '@/lib/content-fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { Post, PostMeta, PostFrontmatter, PostType } from './types';
import { resolveContentPath, getContentLocales, hasLocaleContent } from '../content-utils';

const POSTS_PATH = path.join(process.cwd(), 'content/blog');
const CAREER_TIPS_PATH = path.join(process.cwd(), 'content/career-tips');
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4444/api/v1';

// ============================================
// DATABASE POSTS (Primary Source)
// ============================================

interface DbPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  image: string | null;
  imageAlt: string | null;
  category: string;
  tags: string;
  author: string;
  featured: boolean;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  postType: PostType | null; // 'blog', 'career', or 'both'
}

function parseDbPost(dbPost: DbPost): Post {
  let tags: string[] = [];
  try {
    tags = JSON.parse(dbPost.tags);
  } catch {
    tags = dbPost.tags ? dbPost.tags.split(',').map(t => t.trim()) : [];
  }

  return {
    slug: dbPost.slug,
    title: dbPost.title,
    description: dbPost.description,
    date: dbPost.publishedAt || dbPost.createdAt,
    author: dbPost.author,
    category: dbPost.category,
    tags,
    image: dbPost.image || undefined,
    imageAlt: dbPost.imageAlt || undefined,
    featured: dbPost.featured,
    postType: dbPost.postType || 'blog', // Default to 'blog' for backwards compatibility
    content: dbPost.content,
    readingTime: readingTime(dbPost.content).text,
  };
}

// DB-sourced posts (auto-blog) are disabled on the Cloudflare stack: the
// backend /blog API was never ported. Crucially, the old fetch here carried
// `next: { revalidate: 60 }`, which turned every static page and sitemap that
// calls getAllPosts into 60s-ISR — and runtime re-renders on Workers have no
// fs, so blog listings and sitemaps silently emptied themselves a minute
// after each deploy. Content must stay build-time only. If auto-blog returns,
// source it at build or from D1 WITHOUT fetch-level revalidate.
async function fetchDbPosts(): Promise<Post[]> {
  return [];
}

async function fetchDbPostBySlug(_slug: string): Promise<Post | null> {
  return null;
}

// ============================================
// MDX FILE POSTS (Fallback Source)
// ============================================

function getPostFiles(): string[] {
  if (!contentExistsSync(POSTS_PATH)) {
    return [];
  }
  return contentReaddirSync(POSTS_PATH).filter(file => file.endsWith('.mdx'));
}

function parsePostFile(filename: string): Post {
  const filePath = path.join(POSTS_PATH, filename);
  const fileContent = contentReadFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  const frontmatter = data as PostFrontmatter;

  return {
    ...frontmatter,
    content,
    readingTime: readingTime(content).text,
  };
}

function getMdxPosts(): Post[] {
  const files = getPostFiles();
  return files.map(filename => parsePostFile(filename));
}

// ============================================
// UNIFIED API (Merges both sources)
// ============================================

// Get all posts sorted by date (newest first)
export async function getAllPosts(): Promise<PostMeta[]> {
  // Fetch from database first
  const dbPosts = await fetchDbPosts();

  // Get MDX posts as fallback
  const mdxPosts = getMdxPosts();

  // Merge: DB posts take precedence (by slug)
  const dbSlugs = new Set(dbPosts.map(p => p.slug));
  const uniqueMdxPosts = mdxPosts.filter(p => !dbSlugs.has(p.slug));

  const allPosts = [...dbPosts, ...uniqueMdxPosts];

  // Remove content from metadata
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const postMetas: PostMeta[] = allPosts.map(({ content: _content, ...meta }) => meta);

  // Sort by date, newest first
  return postMetas.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

// Get a single post by slug (locale-aware with English fallback)
export async function getPostBySlug(slug: string, locale: string = 'en'): Promise<Post | null> {
  // Try database first (database posts are English-only for now)
  const dbPost = await fetchDbPostBySlug(slug);
  if (dbPost && locale === 'en') return dbPost;

  // Try locale-specific MDX file first, then fallback to English
  const filePath = resolveContentPath(POSTS_PATH, slug, locale);
  if (contentExistsSync(filePath)) {
    const fileContent = contentReadFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    const frontmatter = data as PostFrontmatter;
    return {
      ...frontmatter,
      content,
      readingTime: readingTime(content).text,
    };
  }

  // If locale file not found and we have a DB post, return it as fallback
  if (dbPost) return dbPost;

  return null;
}

// Get posts by category
export async function getPostsByCategory(category: string): Promise<PostMeta[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post =>
    post.category.toLowerCase() === category.toLowerCase()
  );
}

// Get posts by tag
export async function getPostsByTag(tag: string): Promise<PostMeta[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post =>
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}

// Get all unique categories
export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllPosts();
  const categories = new Set(posts.map(post => post.category));
  return Array.from(categories).sort();
}

// Get all unique tags
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tags = new Set(posts.flatMap(post => post.tags));
  return Array.from(tags).sort();
}

// Get featured posts
export async function getFeaturedPosts(limit = 3): Promise<PostMeta[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => post.featured).slice(0, limit);
}

// Get related posts (by shared tags, excluding current post)
export async function getRelatedPosts(currentSlug: string, limit = 3): Promise<PostMeta[]> {
  const currentPost = await getPostBySlug(currentSlug);
  if (!currentPost) return [];

  const allPosts = await getAllPosts();

  // Score posts by number of shared tags
  const scoredPosts = allPosts
    .filter(post => post.slug !== currentSlug)
    .map(post => {
      const sharedTags = post.tags.filter(tag =>
        currentPost.tags.includes(tag)
      );
      const sameCategory = post.category === currentPost.category ? 2 : 0;
      return {
        post,
        score: sharedTags.length + sameCategory,
      };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score);

  return scoredPosts.slice(0, limit).map(item => item.post);
}

// Get all post slugs (for static generation)
export async function getAllPostSlugs(): Promise<string[]> {
  const posts = await getAllPosts();
  return posts.map(post => post.slug);
}

// Get locale-specific MDX posts that don't exist in the English/DB set.
// Used by the sitemap to include Spanish-only blog posts.
export function getLocaleOnlyPostSlugs(locale: string): PostMeta[] {
  if (locale === 'en') return [];
  const localeDir = path.join(POSTS_PATH, locale);
  if (!contentExistsSync(localeDir)) return [];

  const files = contentReaddirSync(localeDir).filter(f => f.endsWith('.mdx'));
  const englishSlugs = new Set(getPostFiles().map(f => f.replace(/\.mdx$/, '')));

  const localeOnlyPosts: PostMeta[] = [];
  for (const file of files) {
    const slug = file.replace(/\.mdx$/, '');
    if (englishSlugs.has(slug)) continue; // shared slug — already in sitemap via localizedUrls
    const filePath = path.join(localeDir, file);
    const fileContent = contentReadFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    const frontmatter = data as PostFrontmatter;
    localeOnlyPosts.push({
      ...frontmatter,
      readingTime: readingTime(content).text,
    });
  }
  return localeOnlyPosts;
}

// Get locale-specific career-tips that don't exist in the English set.
// Used by the sitemap to include German-only career-tips pages.
export function getLocaleOnlyCareerTipSlugs(locale: string): PostMeta[] {
  if (locale === 'en') return [];
  const localeDir = path.join(CAREER_TIPS_PATH, locale);
  if (!contentExistsSync(localeDir)) return [];

  const files = contentReaddirSync(localeDir).filter(f => f.endsWith('.mdx'));
  const englishSlugs = new Set(getCareerTipsFiles().map(f => f.replace(/\.mdx$/, '')));

  const localeOnlyTips: PostMeta[] = [];
  for (const file of files) {
    const slug = file.replace(/\.mdx$/, '');
    if (englishSlugs.has(slug)) continue;
    const filePath = path.join(localeDir, file);
    const fileContent = contentReadFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    const frontmatter = data as PostFrontmatter;
    localeOnlyTips.push({
      ...frontmatter,
      readingTime: readingTime(content).text,
    });
  }
  return localeOnlyTips;
}

// Locales where a blog/career post has its own content (no English fallback).
// Used by canonical/hreflang to avoid declaring duplicate-content locale URLs.
// English coverage comes from a root MDX file OR a database post.
export async function getPostAvailableLocales(
  slug: string,
  allLocales: readonly string[],
): Promise<string[]> {
  const fileLocales = getContentLocales(POSTS_PATH, slug, allLocales);
  if (!fileLocales.includes('en')) {
    const dbPost = await fetchDbPostBySlug(slug);
    if (dbPost) return ['en', ...fileLocales];
  }
  return fileLocales;
}

// Locales where a career-tip slug has its own MDX. No DB source for tips.
export function getCareerTipAvailableLocales(
  slug: string,
  allLocales: readonly string[],
): string[] {
  return getContentLocales(CAREER_TIPS_PATH, slug, allLocales);
}

// Search posts by query (title, description, tags)
export async function searchPosts(query: string): Promise<PostMeta[]> {
  const searchTerm = query.toLowerCase().trim();
  if (!searchTerm) return [];

  const allPosts = await getAllPosts();

  return allPosts.filter(post => {
    const searchableText = [
      post.title,
      post.description,
      post.category,
      ...post.tags,
    ].join(' ').toLowerCase();

    return searchableText.includes(searchTerm);
  });
}

// Paginate posts
export function paginatePosts(
  posts: PostMeta[],
  page: number,
  perPage = 10
): { posts: PostMeta[]; totalPages: number; currentPage: number } {
  const totalPages = Math.ceil(posts.length / perPage);
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const startIndex = (currentPage - 1) * perPage;

  return {
    posts: posts.slice(startIndex, startIndex + perPage),
    totalPages,
    currentPage,
  };
}

// ============================================
// CAREER POSTS (Posts with postType 'career' or 'both')
// ============================================

// Get all career posts
export async function getAllCareerPosts(): Promise<PostMeta[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post =>
    post.postType === 'career' || post.postType === 'both'
  );
}

// Get featured career posts
export async function getFeaturedCareerPosts(limit = 3): Promise<PostMeta[]> {
  const careerPosts = await getAllCareerPosts();
  return careerPosts.filter(post => post.featured).slice(0, limit);
}

// Get all unique career categories
export async function getAllCareerCategories(): Promise<string[]> {
  const posts = await getAllCareerPosts();
  const categories = new Set(posts.map(post => post.category));
  return Array.from(categories).sort();
}

// Get career posts by category
export async function getCareerPostsByCategory(category: string): Promise<PostMeta[]> {
  const careerPosts = await getAllCareerPosts();
  return careerPosts.filter(post =>
    post.category.toLowerCase() === category.toLowerCase()
  );
}

// Search career posts
export async function searchCareerPosts(query: string): Promise<PostMeta[]> {
  const searchTerm = query.toLowerCase().trim();
  if (!searchTerm) return [];

  const careerPosts = await getAllCareerPosts();

  return careerPosts.filter(post => {
    const searchableText = [
      post.title,
      post.description,
      post.category,
      ...post.tags,
    ].join(' ').toLowerCase();

    return searchableText.includes(searchTerm);
  });
}

// Get all career post slugs (for static generation)
export async function getAllCareerPostSlugs(): Promise<string[]> {
  const posts = await getAllCareerPosts();
  return posts.map(post => post.slug);
}

// ============================================
// BLOG-ONLY POSTS (Posts with postType 'blog' or 'both')
// ============================================

// Get all blog-only posts (excludes career-only posts)
export async function getAllBlogPosts(): Promise<PostMeta[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post =>
    !post.postType || post.postType === 'blog' || post.postType === 'both'
  );
}

// ============================================
// CAREER TIPS (Separate content directory)
// ============================================

function getCareerTipsFiles(): string[] {
  if (!contentExistsSync(CAREER_TIPS_PATH)) {
    return [];
  }
  return contentReaddirSync(CAREER_TIPS_PATH).filter(file => file.endsWith('.mdx'));
}

function parseCareerTipFile(filename: string): Post {
  const filePath = path.join(CAREER_TIPS_PATH, filename);
  const fileContent = contentReadFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  const frontmatter = data as PostFrontmatter;

  return {
    ...frontmatter,
    content,
    readingTime: readingTime(content).text,
    postType: 'career', // Force career type for career-tips
  };
}

// Get all career tips articles
export async function getAllCareerTips(): Promise<PostMeta[]> {
  const files = getCareerTipsFiles();
  const posts = files.map(filename => parseCareerTipFile(filename));

  // Remove content from metadata
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const postMetas: PostMeta[] = posts.map(({ content: _content, ...meta }) => meta);

  // Sort by date, newest first
  return postMetas.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

// Get a single career tip by slug (locale-aware with English fallback)
export async function getCareerTipBySlug(slug: string, locale: string = 'en'): Promise<Post | null> {
  // Try locale-specific file first
  const filePath = resolveContentPath(CAREER_TIPS_PATH, slug, locale);
  if (contentExistsSync(filePath)) {
    const fileContent = contentReadFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    const frontmatter = data as PostFrontmatter;
    return {
      ...frontmatter,
      content,
      readingTime: readingTime(content).text,
      postType: 'career',
    };
  }

  return null;
}

// Get featured career tips
export async function getFeaturedCareerTips(limit = 3): Promise<PostMeta[]> {
  const allTips = await getAllCareerTips();
  return allTips.filter(post => post.featured).slice(0, limit);
}

// Get all unique career tips categories
export async function getAllCareerTipsCategories(): Promise<string[]> {
  const posts = await getAllCareerTips();
  const categories = new Set(posts.map(post => post.category));
  return Array.from(categories).sort();
}

// Get career tips by category
export async function getCareerTipsByCategory(category: string): Promise<PostMeta[]> {
  const allTips = await getAllCareerTips();
  return allTips.filter(post =>
    post.category.toLowerCase() === category.toLowerCase()
  );
}

// Search career tips
export async function searchCareerTips(query: string): Promise<PostMeta[]> {
  const searchTerm = query.toLowerCase().trim();
  if (!searchTerm) return [];

  const allTips = await getAllCareerTips();

  return allTips.filter(post => {
    const searchableText = [
      post.title,
      post.description,
      post.category,
      ...post.tags,
    ].join(' ').toLowerCase();

    return searchableText.includes(searchTerm);
  });
}

// Get all career tips slugs (for static generation)
export async function getAllCareerTipsSlugs(): Promise<string[]> {
  const posts = await getAllCareerTips();
  return posts.map(post => post.slug);
}

// Get related career tips
export async function getRelatedCareerTips(currentSlug: string, limit = 3): Promise<PostMeta[]> {
  const currentPost = await getCareerTipBySlug(currentSlug);
  if (!currentPost) return [];

  const allTips = await getAllCareerTips();

  const scoredPosts = allTips
    .filter(post => post.slug !== currentSlug)
    .map(post => {
      const sharedTags = post.tags.filter(tag =>
        currentPost.tags.includes(tag)
      );
      const sameCategory = post.category === currentPost.category ? 2 : 0;
      return {
        post,
        score: sharedTags.length + sameCategory,
      };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score);

  return scoredPosts.slice(0, limit).map(item => item.post);
}
