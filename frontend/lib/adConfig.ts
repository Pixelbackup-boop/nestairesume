/**
 * Ad Configuration - Fetches settings from backend API
 *
 * Centralizes all ad settings management. Settings are controlled
 * from the admin panel at /admin/ads
 */

import api from "./api";

export interface AdSettings {
  adsEnabled: boolean;
  usePlaceholders: boolean;
  hasPublisherId: boolean;
  publisherId: string;
  slots: {
    blogInArticle: string;
    resumeInArticle: string;
    careerInArticle: string;
    toolsRewarded: string;
    sidebarDisplay: string;
    leaderboard: string;
    multiplex: string;
    toolsBetweenSection: string;
  };
}

// Cache settings to avoid repeated API calls
let cachedSettings: AdSettings | null = null;
let lastFetchTime = 0;
const CACHE_TTL = 60000; // 1 minute cache

/**
 * Fetch ad settings from API
 */
export async function getAdSettings(): Promise<AdSettings> {
  const now = Date.now();

  // Return cached settings if still valid
  if (cachedSettings && now - lastFetchTime < CACHE_TTL) {
    return cachedSettings;
  }

  try {
    const response = await api.get("/ads/settings");
    cachedSettings = response.data as AdSettings;
    lastFetchTime = now;
    return cachedSettings;
  } catch (error) {
    console.error("Failed to fetch ad settings:", error);
    // Return default disabled settings on error
    return {
      adsEnabled: false,
      usePlaceholders: true,
      hasPublisherId: false,
      publisherId: "",
      slots: {
        blogInArticle: "",
        resumeInArticle: "",
        careerInArticle: "",
        toolsRewarded: "",
        sidebarDisplay: "",
        leaderboard: "",
        multiplex: "",
        toolsBetweenSection: "",
      },
    };
  }
}

/**
 * Clear cached settings (useful after admin updates)
 */
export function clearAdSettingsCache(): void {
  cachedSettings = null;
  lastFetchTime = 0;
}

/**
 * Check if ads should be shown
 */
export async function shouldShowAds(): Promise<boolean> {
  const settings = await getAdSettings();
  return settings.adsEnabled;
}

/**
 * Check if using placeholder mode
 */
export async function isPlaceholderMode(): Promise<boolean> {
  const settings = await getAdSettings();
  return settings.usePlaceholders;
}

/**
 * Get the AdSense publisher ID
 */
export async function getPublisherId(): Promise<string> {
  const settings = await getAdSettings();
  return settings.publisherId;
}

/**
 * Get a specific ad slot ID
 */
export async function getAdSlot(
  slotType: keyof AdSettings["slots"]
): Promise<string> {
  const settings = await getAdSettings();
  return settings.slots[slotType] || "";
}

// CPM estimates for revenue display
export const estimatedCpm: Record<string, string> = {
  blogInArticle: "$10-15",
  resumeInArticle: "$12",
  careerInArticle: "$10-15",
  toolsRewarded: "$20-40",
  sidebarDisplay: "$8-12",
  leaderboard: "$5-8",
  multiplex: "$3-6",
  toolsBetweenSection: "$6-10",
};
