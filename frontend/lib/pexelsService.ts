/**
 * Pexels API Service
 *
 * Fetches high-quality images from Pexels for blog articles.
 * API Documentation: https://www.pexels.com/api/documentation/
 *
 * Usage:
 *   import { searchPexelsImages } from '@/lib/pexelsService';
 *   const images = await searchPexelsImages('resume writing', 5);
 */

const PEXELS_API_KEY = process.env.PEXELS_API_KEY || '';
const PEXELS_API_URL = 'https://api.pexels.com/v1';

export interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  url: string; // Pexels page URL
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: {
    original: string;
    large2x: string;  // 940px width
    large: string;    // 650px width
    medium: string;   // 350px width
    small: string;    // 130px width
    portrait: string; // 800x1200
    landscape: string; // 1200x627
    tiny: string;     // 280x200
  };
  alt: string;
}

export interface PexelsSearchResult {
  total_results: number;
  page: number;
  per_page: number;
  photos: PexelsPhoto[];
  next_page?: string;
}

/**
 * Search for images on Pexels
 * @param query - Search term (e.g., "resume writing", "job interview")
 * @param perPage - Number of results (max 80)
 * @param page - Page number for pagination
 */
export async function searchPexelsImages(
  query: string,
  perPage: number = 10,
  page: number = 1
): Promise<PexelsSearchResult> {
  if (!PEXELS_API_KEY) {
    throw new Error('PEXELS_API_KEY not configured. Add it to your .env.local file.');
  }

  const params = new URLSearchParams({
    query,
    per_page: perPage.toString(),
    page: page.toString(),
    orientation: 'landscape', // Best for blog headers
  });

  const response = await fetch(
    `${PEXELS_API_URL}/search?${params}`,
    {
      headers: {
        Authorization: PEXELS_API_KEY,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Pexels API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get curated photos from Pexels (high-quality, hand-picked)
 */
export async function getCuratedPhotos(
  perPage: number = 15,
  page: number = 1
): Promise<PexelsSearchResult> {
  if (!PEXELS_API_KEY) {
    throw new Error('PEXELS_API_KEY not configured');
  }

  const params = new URLSearchParams({
    per_page: perPage.toString(),
    page: page.toString(),
  });

  const response = await fetch(
    `${PEXELS_API_URL}/curated?${params}`,
    {
      headers: {
        Authorization: PEXELS_API_KEY,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Pexels API error: ${response.status}`);
  }

  return response.json();
}

/**
 * Get a specific photo by ID
 */
export async function getPexelsPhotoById(id: number): Promise<PexelsPhoto | null> {
  if (!PEXELS_API_KEY) {
    throw new Error('PEXELS_API_KEY not configured');
  }

  const response = await fetch(
    `${PEXELS_API_URL}/photos/${id}`,
    {
      headers: {
        Authorization: PEXELS_API_KEY,
      },
    }
  );

  if (!response.ok) {
    return null;
  }

  return response.json();
}

/**
 * Generate attribution text for Pexels image (required by guidelines)
 */
export function getPexelsAttribution(photo: PexelsPhoto): string {
  return `Photo by ${photo.photographer} on Pexels`;
}

/**
 * Get the best image URL for blog headers (landscape, ~1200px width)
 */
export function getBlogImageUrl(photo: PexelsPhoto): string {
  // large2x is 940px, but we can use original with size parameter
  // Pexels auto-serves optimized images
  return photo.src.large2x || photo.src.large;
}

// Predefined search queries for different article types
export const ARTICLE_IMAGE_QUERIES: Record<string, string> = {
  // Career Tips
  'cover-letter': 'professional writing business letter',
  'resume': 'resume document career professional',
  'interview': 'job interview business meeting',
  'ats': 'computer technology hiring recruitment',
  'career': 'career growth success professional',
  'job-search': 'job search laptop career',

  // Skills
  'skills': 'professional skills teamwork',
  'leadership': 'leadership team business',
  'communication': 'business communication meeting',

  // Specific topics
  'salary': 'salary negotiation business',
  'linkedin': 'social media professional networking',
  'remote-work': 'remote work home office',
  'email': 'email laptop business',
  'fonts': 'typography design creative',
  'fresher': 'graduate student career',
  'student': 'student education university',
  'canva': 'design creative digital',
  'google-docs': 'laptop document writing',
  'word': 'document writing office',
  'ai': 'artificial intelligence technology',

  // General
  'office': 'modern office workspace',
  'success': 'success achievement celebration',
  'laptop': 'laptop work professional',
};

/**
 * Get suggested query for an article based on its slug or title
 */
export function getSuggestedQuery(slug: string): string {
  const lowerSlug = slug.toLowerCase();

  for (const [key, query] of Object.entries(ARTICLE_IMAGE_QUERIES)) {
    if (lowerSlug.includes(key)) {
      return query;
    }
  }

  // Default fallback
  return 'professional business career office';
}
