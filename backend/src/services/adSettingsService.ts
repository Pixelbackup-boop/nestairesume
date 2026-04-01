import fs from "fs";
import path from "path";
import logger from "../lib/logger";

// Ad settings file path
const AD_SETTINGS_FILE = path.join(__dirname, "../../data/ad-settings.json");

// Ensure data directory exists
const dataDir = path.dirname(AD_SETTINGS_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

export interface AdSettings {
  // Master Controls
  adsEnabled: boolean;
  usePlaceholders: boolean;

  // Google AdSense
  adsensePublisherId: string;

  // Ad Slots
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

  // Revenue Tracking
  estimatedMonthlyViews: {
    blog: number;
    resume: number;
    career: number;
    tools: number;
  };

  // Metadata
  updatedAt?: string;
}

const defaultSettings: AdSettings = {
  adsEnabled: false,
  usePlaceholders: true,
  adsensePublisherId: "",
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
  estimatedMonthlyViews: {
    blog: 50000,
    resume: 200000,
    career: 20000,
    tools: 10000,
  },
};

/**
 * Get current ad settings
 */
export async function getAdSettings(): Promise<AdSettings> {
  try {
    if (fs.existsSync(AD_SETTINGS_FILE)) {
      const data = fs.readFileSync(AD_SETTINGS_FILE, "utf-8");
      return { ...defaultSettings, ...JSON.parse(data) };
    }
    return defaultSettings;
  } catch (error) {
    logger.error({ err: error }, 'Error reading ad settings');
    return defaultSettings;
  }
}

/**
 * Save ad settings
 */
export async function saveAdSettings(settings: Partial<AdSettings>): Promise<AdSettings> {
  try {
    const currentSettings = await getAdSettings();
    const updatedSettings: AdSettings = {
      ...currentSettings,
      ...settings,
      slots: {
        ...currentSettings.slots,
        ...(settings.slots || {}),
      },
      estimatedMonthlyViews: {
        ...currentSettings.estimatedMonthlyViews,
        ...(settings.estimatedMonthlyViews || {}),
      },
      updatedAt: new Date().toISOString(),
    };

    fs.writeFileSync(AD_SETTINGS_FILE, JSON.stringify(updatedSettings, null, 2));
    return updatedSettings;
  } catch (error) {
    logger.error({ err: error }, 'Error saving ad settings');
    throw new Error("Failed to save ad settings");
  }
}

/**
 * Check if ads are enabled (for frontend API)
 */
export async function areAdsEnabled(): Promise<boolean> {
  const settings = await getAdSettings();
  return settings.adsEnabled;
}

/**
 * Check if using placeholders (for frontend API)
 */
export async function isPlaceholderMode(): Promise<boolean> {
  const settings = await getAdSettings();
  return settings.usePlaceholders;
}
