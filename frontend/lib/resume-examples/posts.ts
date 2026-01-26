import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

// Centralized author info for E-E-A-T structured data
export const SITE_AUTHOR = {
  name: "Alex Brown",
  jobTitle: "Senior HR & Resume Strategist",
  organization: "Best AI Resume",
  image: "/images/authors/alex-brown.png",
  url: "https://www.bestairesumes.com/about",
  linkedin: "https://www.linkedin.com/in/alex-brown-4324043a8/",
};

// Resume Example specific frontmatter
export interface ResumeExampleMeta {
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
  avgSalary?: string;
  jobGrowth?: string;
  keySkills: string[];
}

export interface ResumeExample extends ResumeExampleMeta {
  content: string;
  readingTime: string;
}

// Consolidate 42 raw MDX categories → 18 display categories
const CATEGORY_MAP: Record<string, string> = {
  "Technology": "Technology",
  "Healthcare": "Healthcare",
  "Business": "Business & Management",
  "Management": "Business & Management",
  "Consulting": "Business & Management",
  "Trades": "Trades & Manufacturing",
  "Manufacturing": "Trades & Manufacturing",
  "Construction": "Trades & Manufacturing",
  "Architecture": "Trades & Manufacturing",
  "Finance": "Finance",
  "Hospitality": "Hospitality",
  "Childcare": "Hospitality",
  "Marketing": "Marketing & Media",
  "Media": "Marketing & Media",
  "Engineering": "Engineering",
  "Sales": "Sales",
  "HR": "Human Resources",
  "Logistics": "Logistics & Supply Chain",
  "Supply Chain": "Logistics & Supply Chain",
  "Creative": "Creative & Design",
  "Entertainment": "Creative & Design",
  "Beauty": "Creative & Design",
  "Administrative": "Administrative",
  "Retail": "Retail",
  "Education": "Education & Research",
  "Research": "Education & Research",
  "Science": "Education & Research",
  "Customer Service": "Customer Service",
  "Transportation": "Transportation",
  "Automotive": "Transportation",
  "Aviation": "Transportation",
  "Maritime": "Transportation",
};

export function getDisplayCategory(rawCategory: string): string {
  return CATEGORY_MAP[rawCategory] || "Other";
}

export async function getAllDisplayCategories(): Promise<{ name: string; count: number }[]> {
  const examples = await getAllResumeExamples();
  const counts = new Map<string, number>();

  for (const example of examples) {
    const display = example.displayCategory;
    counts.set(display, (counts.get(display) || 0) + 1);
  }

  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

const CONTENT_DIR = path.join(process.cwd(), 'content/resume-examples');

// Get all resume examples
export async function getAllResumeExamples(): Promise<ResumeExampleMeta[]> {
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
        jobTitle: data.jobTitle || data.title?.replace(' Resume', '') || '',
        avgSalary: data.avgSalary,
        jobGrowth: data.jobGrowth,
        keySkills: data.keySkills || [],
      } as ResumeExampleMeta;
    });

    // Sort by featured first, then by date
    return examples.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  } catch (error) {
    console.error('Error loading resume examples:', error);
    return [];
  }
}

// Get single resume example by slug
export async function getResumeExampleBySlug(slug: string): Promise<ResumeExample | null> {
  try {
    const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);

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
      jobTitle: data.jobTitle || data.title?.replace(' Resume', '') || '',
      avgSalary: data.avgSalary,
      jobGrowth: data.jobGrowth,
      keySkills: data.keySkills || [],
      content,
      readingTime: stats.text,
    };
  } catch (error) {
    console.error(`Error loading resume example ${slug}:`, error);
    return null;
  }
}

// Get all slugs for static generation
export async function getAllResumeExampleSlugs(): Promise<string[]> {
  try {
    if (!fs.existsSync(CONTENT_DIR)) {
      return [];
    }

    const files = fs.readdirSync(CONTENT_DIR).filter(file => file.endsWith('.mdx'));
    return files.map(file => file.replace('.mdx', ''));
  } catch (error) {
    console.error('Error getting resume example slugs:', error);
    return [];
  }
}

// Get featured resume examples
export async function getFeaturedResumeExamples(limit = 3): Promise<ResumeExampleMeta[]> {
  const examples = await getAllResumeExamples();
  return examples.filter(e => e.featured).slice(0, limit);
}

// Get resume examples by category
export async function getResumeExamplesByCategory(category: string): Promise<ResumeExampleMeta[]> {
  const examples = await getAllResumeExamples();
  if (category === 'all') return examples;
  return examples.filter(e => e.category.toLowerCase() === category.toLowerCase());
}

// Get all unique categories
export async function getAllResumeExampleCategories(): Promise<string[]> {
  const examples = await getAllResumeExamples();
  const categories = new Set(examples.map(e => e.category));
  return Array.from(categories).sort();
}

// Get related resume examples (by tags + category)
export async function getRelatedResumeExamples(
  currentSlug: string,
  limit = 3
): Promise<ResumeExampleMeta[]> {
  const examples = await getAllResumeExamples();
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

// Search resume examples
export async function searchResumeExamples(query: string): Promise<ResumeExampleMeta[]> {
  const examples = await getAllResumeExamples();
  const lowerQuery = query.toLowerCase();

  return examples.filter(example =>
    example.title.toLowerCase().includes(lowerQuery) ||
    example.description.toLowerCase().includes(lowerQuery) ||
    example.jobTitle.toLowerCase().includes(lowerQuery) ||
    example.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    example.keySkills.some(skill => skill.toLowerCase().includes(lowerQuery))
  );
}
