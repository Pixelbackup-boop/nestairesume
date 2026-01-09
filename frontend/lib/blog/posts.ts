import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { Post, PostMeta, PostFrontmatter } from './types';

const POSTS_PATH = path.join(process.cwd(), 'content/blog');
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

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
    content: dbPost.content,
    readingTime: readingTime(dbPost.content).text,
  };
}

async function fetchDbPosts(): Promise<Post[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/blog?limit=100`, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    });
    if (!response.ok) return [];
    const data = await response.json();
    return (data.posts || []).map(parseDbPost);
  } catch {
    return [];
  }
}

async function fetchDbPostBySlug(slug: string): Promise<Post | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/blog/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) return null;
    const dbPost = await response.json();
    return parseDbPost(dbPost);
  } catch {
    return null;
  }
}

// ============================================
// MDX FILE POSTS (Fallback Source)
// ============================================

function getPostFiles(): string[] {
  if (!fs.existsSync(POSTS_PATH)) {
    return [];
  }
  return fs.readdirSync(POSTS_PATH).filter(file => file.endsWith('.mdx'));
}

function parsePostFile(filename: string): Post {
  const filePath = path.join(POSTS_PATH, filename);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
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
  const postMetas: PostMeta[] = allPosts.map(({ content, ...meta }) => meta);

  // Sort by date, newest first
  return postMetas.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

// Get a single post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  // Try database first
  const dbPost = await fetchDbPostBySlug(slug);
  if (dbPost) return dbPost;

  // Fallback to MDX files
  const files = getPostFiles();
  for (const filename of files) {
    const post = parsePostFile(filename);
    if (post.slug === slug) {
      return post;
    }
  }

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
