/**
 * Unsplash API Service
 *
 * Fetches high-quality images from Unsplash for blog articles.
 * Get your API key at: https://unsplash.com/developers
 *
 * Usage:
 *   import { searchUnsplashImages, downloadUnsplashImage } from '@/lib/unsplashService';
 *   const images = await searchUnsplashImages('resume writing', 5);
 */

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || '';
const UNSPLASH_API_URL = 'https://api.unsplash.com';

export interface UnsplashImage {
  id: string;
  width: number;
  height: number;
  description: string | null;
  alt_description: string | null;
  urls: {
    raw: string;
    full: string;
    regular: string; // 1080px width
    small: string;   // 400px width
    thumb: string;   // 200px width
  };
  user: {
    name: string;
    username: string;
    portfolio_url: string | null;
  };
  links: {
    download: string;
    download_location: string;
  };
}

export interface UnsplashSearchResult {
  total: number;
  total_pages: number;
  results: UnsplashImage[];
}

/**
 * Search for images on Unsplash
 * @param query - Search term (e.g., "resume writing", "job interview")
 * @param perPage - Number of results (max 30)
 * @param page - Page number for pagination
 */
export async function searchUnsplashImages(
  query: string,
  perPage: number = 10,
  page: number = 1
): Promise<UnsplashSearchResult> {
  if (!UNSPLASH_ACCESS_KEY) {
    throw new Error('UNSPLASH_ACCESS_KEY not configured. Add it to your .env.local file.');
  }

  const params = new URLSearchParams({
    query,
    per_page: perPage.toString(),
    page: page.toString(),
    orientation: 'landscape', // Best for blog headers
  });

  const response = await fetch(
    `${UNSPLASH_API_URL}/search/photos?${params}`,
    {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Unsplash API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get a random image from Unsplash based on query
 * @param query - Search term
 */
export async function getRandomUnsplashImage(query: string): Promise<UnsplashImage | null> {
  if (!UNSPLASH_ACCESS_KEY) {
    throw new Error('UNSPLASH_ACCESS_KEY not configured');
  }

  const params = new URLSearchParams({
    query,
    orientation: 'landscape',
  });

  const response = await fetch(
    `${UNSPLASH_API_URL}/photos/random?${params}`,
    {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    }
  );

  if (!response.ok) {
    return null;
  }

  return response.json();
}

/**
 * Trigger a download (required by Unsplash API guidelines)
 * Call this when you actually use an image to give credit to photographer
 */
export async function triggerUnsplashDownload(downloadLocation: string): Promise<void> {
  if (!UNSPLASH_ACCESS_KEY) return;

  await fetch(downloadLocation, {
    headers: {
      Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
    },
  });
}

/**
 * Generate attribution text for Unsplash image (required by guidelines)
 */
export function getUnsplashAttribution(image: UnsplashImage): string {
  return `Photo by ${image.user.name} on Unsplash`;
}

/**
 * Get optimized image URL with custom dimensions
 * @param image - Unsplash image object
 * @param width - Desired width in pixels
 * @param quality - Quality 1-100 (default 80)
 */
export function getOptimizedImageUrl(
  image: UnsplashImage,
  width: number = 1200,
  quality: number = 80
): string {
  // Unsplash raw URLs support dynamic resizing
  return `${image.urls.raw}&w=${width}&q=${quality}&fit=crop&auto=format`;
}

// Predefined search queries for different article types
export const ARTICLE_IMAGE_QUERIES: Record<string, string> = {
  // Career Tips
  'cover-letter': 'professional writing letter business',
  'resume': 'resume document professional career',
  'interview': 'job interview business meeting professional',
  'ats': 'computer screening technology hiring',
  'career': 'career growth professional success',
  'job-search': 'job search career opportunity',

  // Skills
  'skills': 'professional skills development',
  'leadership': 'leadership team management',
  'communication': 'business communication teamwork',

  // General
  'office': 'modern office workspace professional',
  'success': 'professional success achievement',
  'laptop': 'laptop work professional desk',
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
  return 'professional career business';
}
