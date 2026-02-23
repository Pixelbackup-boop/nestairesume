"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTawkSettings = getTawkSettings;
exports.saveTawkSettings = saveTawkSettings;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const TAWK_SETTINGS_FILE = path_1.default.join(__dirname, "../../data/tawk-settings.json");
// Ensure data directory exists
const dataDir = path_1.default.dirname(TAWK_SETTINGS_FILE);
if (!fs_1.default.existsSync(dataDir)) {
    fs_1.default.mkdirSync(dataDir, { recursive: true });
}
const defaultSettings = {
    enabled: false,
    propertyId: "",
    widgetId: "",
};
async function getTawkSettings() {
    try {
        if (fs_1.default.existsSync(TAWK_SETTINGS_FILE)) {
            const data = fs_1.default.readFileSync(TAWK_SETTINGS_FILE, "utf-8");
            return { ...defaultSettings, ...JSON.parse(data) };
        }
        return defaultSettings;
    }
    catch (error) {
        console.error("Error reading tawk settings:", error);
        return defaultSettings;
    }
}
async function saveTawkSettings(settings) {
    try {
        const currentSettings = await getTawkSettings();
        const updatedSettings = {
            ...currentSettings,
            ...settings,
            updatedAt: new Date().toISOString(),
        };
        fs_1.default.writeFileSync(TAWK_SETTINGS_FILE, JSON.stringify(updatedSettings, null, 2));
        return updatedSettings;
    }
    catch (error) {
        console.error("Error saving tawk settings:", error);
        throw new Error("Failed to save tawk settings");
    }
}
//# sourceMappingURL=tawkSettingsService.js.map