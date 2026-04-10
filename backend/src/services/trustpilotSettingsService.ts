import fs from "fs";
import path from "path";
import logger from "../lib/logger";

const TRUSTPILOT_SETTINGS_FILE = path.join(__dirname, "../../data/trustpilot-settings.json");

// Ensure data directory exists
const dataDir = path.dirname(TRUSTPILOT_SETTINGS_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

export interface TrustpilotSettings {
  enabled: boolean;
  businessUnitId: string;
  templateId: string;
  locale: string;
  updatedAt?: string;
}

// Defaults match the current hardcoded values in Footer.tsx so nothing breaks
// if the settings file doesn't exist yet on first deploy.
const defaultSettings: TrustpilotSettings = {
  enabled: true,
  businessUnitId: "6996e90345c20b813450f36a",
  templateId: "56278e9abfbbba0bdcd568bc",
  locale: "en-US",
};

export async function getTrustpilotSettings(): Promise<TrustpilotSettings> {
  try {
    if (fs.existsSync(TRUSTPILOT_SETTINGS_FILE)) {
      const data = fs.readFileSync(TRUSTPILOT_SETTINGS_FILE, "utf-8");
      return { ...defaultSettings, ...JSON.parse(data) };
    }
    return defaultSettings;
  } catch (error) {
    logger.error({ err: error }, "Error reading trustpilot settings");
    return defaultSettings;
  }
}

export async function saveTrustpilotSettings(
  settings: Partial<TrustpilotSettings>
): Promise<TrustpilotSettings> {
  try {
    const currentSettings = await getTrustpilotSettings();
    const updatedSettings: TrustpilotSettings = {
      ...currentSettings,
      ...settings,
      updatedAt: new Date().toISOString(),
    };

    fs.writeFileSync(TRUSTPILOT_SETTINGS_FILE, JSON.stringify(updatedSettings, null, 2));
    return updatedSettings;
  } catch (error) {
    logger.error({ err: error }, "Error saving trustpilot settings");
    throw new Error("Failed to save trustpilot settings");
  }
}
