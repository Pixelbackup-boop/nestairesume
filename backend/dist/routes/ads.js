"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adSettingsService = __importStar(require("../services/adSettingsService"));
const router = (0, express_1.Router)();
/**
 * Get public ad settings (safe to expose to frontend)
 * This endpoint is publicly accessible - no auth required
 */
router.get("/settings", async (_req, res) => {
    try {
        const settings = await adSettingsService.getAdSettings();
        // Return only safe-to-expose settings (not the full publisher ID)
        const publicSettings = {
            adsEnabled: settings.adsEnabled,
            usePlaceholders: settings.usePlaceholders,
            // Mask publisher ID - only show if exists
            hasPublisherId: !!settings.adsensePublisherId,
            // Return full publisher ID only for ad script loading
            publisherId: settings.adsensePublisherId || "",
            slots: settings.slots,
        };
        res.set("Cache-Control", "public, max-age=300, stale-while-revalidate=600");
        res.json(publicSettings);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to get ad settings";
        res.status(500).json({ detail: message });
    }
});
/**
 * Check if ads are enabled
 */
router.get("/enabled", async (_req, res) => {
    try {
        const enabled = await adSettingsService.areAdsEnabled();
        res.json({ enabled });
    }
    catch (error) {
        res.status(500).json({ enabled: false });
    }
});
exports.default = router;
//# sourceMappingURL=ads.js.map