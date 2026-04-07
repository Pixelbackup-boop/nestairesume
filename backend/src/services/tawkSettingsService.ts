import fs from "fs";
import path from "path";
import logger from "../lib/logger";

const TAWK_SETTINGS_FILE = path.join(__dirname, "../../data/tawk-settings.json");

// Ensure data directory exists
const dataDir = path.dirname(TAWK_SETTINGS_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

export interface TawkSettings {
  enabled: boolean;
  propertyId: string;
  widgetId: string;
  updatedAt?: string;
}

// Fall back to env vars so settings survive container redeploys
const defaultSettings: TawkSettings = {
  enabled: !!process.env.TAWK_PROPERTY_ID,
  propertyId: process.env.TAWK_PROPERTY_ID || "",
  widgetId: process.env.TAWK_WIDGET_ID || "default",
};

export async function getTawkSettings(): Promise<TawkSettings> {
  try {
    if (fs.existsSync(TAWK_SETTINGS_FILE)) {
      const data = fs.readFileSync(TAWK_SETTINGS_FILE, "utf-8");
      return { ...defaultSettings, ...JSON.parse(data) };
    }
    return defaultSettings;
  } catch (error) {
    logger.error({ err: error }, 'Error reading tawk settings');
    return defaultSettings;
  }
}

export async function saveTawkSettings(settings: Partial<TawkSettings>): Promise<TawkSettings> {
  try {
    const currentSettings = await getTawkSettings();
    const updatedSettings: TawkSettings = {
      ...currentSettings,
      ...settings,
      updatedAt: new Date().toISOString(),
    };

    fs.writeFileSync(TAWK_SETTINGS_FILE, JSON.stringify(updatedSettings, null, 2));
    return updatedSettings;
  } catch (error) {
    logger.error({ err: error }, 'Error saving tawk settings');
    throw new Error("Failed to save tawk settings");
  }
}
