"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdSettings = getAdSettings;
exports.saveAdSettings = saveAdSettings;
exports.areAdsEnabled = areAdsEnabled;
exports.isPlaceholderMode = isPlaceholderMode;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Ad settings file path
const AD_SETTINGS_FILE = path_1.default.join(__dirname, "../../data/ad-settings.json");
// Ensure data directory exists
const dataDir = path_1.default.dirname(AD_SETTINGS_FILE);
if (!fs_1.default.existsSync(dataDir)) {
    fs_1.default.mkdirSync(dataDir, { recursive: true });
}
const defaultSettings = {
    adsEnabled: false,
    usePlaceholders: true,
    adsensePublisherId: "",
    slots: {
        blogInArticle: "",
        resumeInArticle: "",
        careerInArticle: "",
        toolsRewarded: "",
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
async function getAdSettings() {
    try {
        if (fs_1.default.existsSync(AD_SETTINGS_FILE)) {
            const data = fs_1.default.readFileSync(AD_SETTINGS_FILE, "utf-8");
            return { ...defaultSettings, ...JSON.parse(data) };
        }
        return defaultSettings;
    }
    catch (error) {
        console.error("Error reading ad settings:", error);
        return defaultSettings;
    }
}
/**
 * Save ad settings
 */
async function saveAdSettings(settings) {
    try {
        const currentSettings = await getAdSettings();
        const updatedSettings = {
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
        fs_1.default.writeFileSync(AD_SETTINGS_FILE, JSON.stringify(updatedSettings, null, 2));
        return updatedSettings;
    }
    catch (error) {
        console.error("Error saving ad settings:", error);
        throw new Error("Failed to save ad settings");
    }
}
/**
 * Check if ads are enabled (for frontend API)
 */
async function areAdsEnabled() {
    const settings = await getAdSettings();
    return settings.adsEnabled;
}
/**
 * Check if using placeholders (for frontend API)
 */
async function isPlaceholderMode() {
    const settings = await getAdSettings();
    return settings.usePlaceholders;
}
//# sourceMappingURL=adSettingsService.js.map