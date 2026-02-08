import fs from "fs";
import path from "path";

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

const defaultSettings: TawkSettings = {
  enabled: false,
  propertyId: "",
  widgetId: "",
};

export async function getTawkSettings(): Promise<TawkSettings> {
  try {
    if (fs.existsSync(TAWK_SETTINGS_FILE)) {
      const data = fs.readFileSync(TAWK_SETTINGS_FILE, "utf-8");
      return { ...defaultSettings, ...JSON.parse(data) };
    }
    return defaultSettings;
  } catch (error) {
    console.error("Error reading tawk settings:", error);
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
    console.error("Error saving tawk settings:", error);
    throw new Error("Failed to save tawk settings");
  }
}
