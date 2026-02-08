import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { resolveContentPath } from '../content-utils';

// Re-use authors from resume-examples
import { AUTHORS, getAuthor } from '../resume-examples/posts';
import type { Author } from '../resume-examples/posts';
export { getAuthor, AUTHORS };
export type { Author };

// Cover Letter Example frontmatter
export interface CoverLetterExampleMeta {
  title: string;
  slug: string;
  description: string;
  date: string;
  author: string;
  category: string;
  displayCategory: string;
  tags: string[];
  image?: string;
  imageAlt?: string;
  featured?: boolean;
  jobTitle: string;
  keySkills: string[];
  faq?: { question: string; answer: string }[];
}

export interface CoverLetterExample extends CoverLetterExampleMeta {
  content: string;
  readingTime: string;
}

// Consolidate categories for display
const CATEGORY_MAP: Record<string, string> = {
  "Technology": "Technology",
  "Healthcare": "Healthcare",
  "Business": "Business & Finance",
  "Business & Finance": "Business & Finance",
  "Management": "Business & Finance",
  "Consulting": "Business & Finance",
  "Finance": "Business & Finance",
  "Trades": "Skilled Trades",
  "Skilled Trades": "Skilled Trades",
  "Manufacturing": "Skilled Trades",
  "Construction": "Skilled Trades",
  "Hospitality": "Hospitality & Service",
  "Hospitality & Service": "Hospitality & Service",
  "Service": "Hospitality & Service",
  "Marketing": "Marketing & Media",
  "Media": "Marketing & Media",
  "Engineering": "Engineering",
  "Sales": "Sales",
  "HR": "Human Resources",
  "Administrative": "Administrative",
  "Retail": "Retail",
  "Education": "Education",
  "Education & Training": "Education",
  "Customer Service": "Customer Service",
  "Creative": "Creative & Design",
  "Creative & Design": "Creative & Design",
  "Design": "Creative & Design",
  "Legal": "Legal",
  "Social Services": "Social Services",
  "Other": "Other",
  "Other Industries": "Other",
};

export function getDisplayCategory(rawCategory: string): string {
  return CATEGORY_MAP[rawCategory] || "Other";
}

export async function getAllDisplayCategories(): Promise<{ name: string; count: number }[]> {
  const examples = await getAllCoverLetterExamples();
  const counts = new Map<string, number>();

  for (const example of examples) {
    const display = example.displayCategory;
    counts.set(display, (counts.get(display) || 0) + 1);
  }

  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

const CONTENT_DIR = path.join(process.cwd(), 'content/cover-letter-examples');

// Get all cover letter examples
export async function getAllCoverLetterExamples(): Promise<CoverLetterExampleMeta[]> {
  try {
    if (!fs.existsSync(CONTENT_DIR)) {
      return [];
    }

    const files = fs.readdirSync(CONTENT_DIR).filter(file => file.endsWith('.mdx'));

    const examples = files.map(file => {
      const filePath = path.join(CONTENT_DIR, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(fileContent);
      const rawCategory = data.category || 'General';

      return {
        title: data.title || '',
        slug: data.slug || file.replace('.mdx', ''),
        description: data.description || '',
        date: data.date || new Date().toISOString(),
        author: data.author || 'Career Expert',
        category: rawCategory,
        displayCategory: getDisplayCategory(rawCategory),
        tags: data.tags || [],
        image: data.image,
        imageAlt: data.imageAlt,
        featured: data.featured || false,
        jobTitle: data.jobTitle || data.title?.replace(' Cover Letter', '') || '',
        keySkills: data.keySkills || [],
        faq: data.faq || [],
      } as CoverLetterExampleMeta;
    });

    // Sort by featured first, then by date
    return examples.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  } catch (error) {
    console.error('Error loading cover letter examples:', error);
    return [];
  }
}

// Get single cover letter example by slug (locale-aware with English fallback)
export async function getCoverLetterExampleBySlug(slug: string, locale: string = 'en'): Promise<CoverLetterExample | null> {
  try {
    const filePath = resolveContentPath(CONTENT_DIR, slug, locale);

    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    const stats = readingTime(content);
    const rawCategory = data.category || 'General';

    return {
      title: data.title || '',
      slug: data.slug || slug,
      description: data.description || '',
      date: data.date || new Date().toISOString(),
      author: data.author || 'Career Expert',
      category: rawCategory,
      displayCategory: getDisplayCategory(rawCategory),
      tags: data.tags || [],
      image: data.image,
      imageAlt: data.imageAlt,
      featured: data.featured || false,
      jobTitle: data.jobTitle || data.title?.replace(' Cover Letter', '') || '',
      keySkills: data.keySkills || [],
      faq: data.faq || [],
      content,
      readingTime: stats.text,
    };
  } catch (error) {
    console.error(`Error loading cover letter example ${slug}:`, error);
    return null;
  }
}

// Get all slugs for static generation
export async function getAllCoverLetterExampleSlugs(): Promise<string[]> {
  try {
    if (!fs.existsSync(CONTENT_DIR)) {
      return [];
    }

    const files = fs.readdirSync(CONTENT_DIR).filter(file => file.endsWith('.mdx'));
    return files.map(file => file.replace('.mdx', ''));
  } catch (error) {
    console.error('Error getting cover letter example slugs:', error);
    return [];
  }
}

// Get featured cover letter examples
export async function getFeaturedCoverLetterExamples(limit = 3): Promise<CoverLetterExampleMeta[]> {
  const examples = await getAllCoverLetterExamples();
  return examples.filter(e => e.featured).slice(0, limit);
}

// Get cover letter examples by category
export async function getCoverLetterExamplesByCategory(category: string): Promise<CoverLetterExampleMeta[]> {
  const examples = await getAllCoverLetterExamples();
  if (category === 'all') return examples;
  return examples.filter(e => e.category.toLowerCase() === category.toLowerCase());
}

// Get all unique categories
export async function getAllCoverLetterExampleCategories(): Promise<string[]> {
  const examples = await getAllCoverLetterExamples();
  const categories = new Set(examples.map(e => e.category));
  return Array.from(categories).sort();
}

// Get related cover letter examples (by tags + category)
export async function getRelatedCoverLetterExamples(
  currentSlug: string,
  limit = 3
): Promise<CoverLetterExampleMeta[]> {
  const examples = await getAllCoverLetterExamples();
  const currentExample = examples.find(e => e.slug === currentSlug);

  if (!currentExample) return examples.slice(0, limit);

  // Score each example by shared tags and category
  const scored = examples
    .filter(e => e.slug !== currentSlug)
    .map(example => {
      const sharedTags = example.tags.filter(tag =>
        currentExample.tags.includes(tag)
      ).length;
      const sameCategory = example.category === currentExample.category ? 2 : 0;
      return { example, score: sharedTags + sameCategory };
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map(s => s.example);
}

// Search cover letter examples
export async function searchCoverLetterExamples(query: string): Promise<CoverLetterExampleMeta[]> {
  const examples = await getAllCoverLetterExamples();
  const lowerQuery = query.toLowerCase();

  return examples.filter(example =>
    example.title.toLowerCase().includes(lowerQuery) ||
    example.description.toLowerCase().includes(lowerQuery) ||
    example.jobTitle.toLowerCase().includes(lowerQuery) ||
    example.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    example.keySkills.some(skill => skill.toLowerCase().includes(lowerQuery))
  );
}
