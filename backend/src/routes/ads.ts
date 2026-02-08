import { Router, Request, Response } from "express";
import * as adSettingsService from "../services/adSettingsService";

const router = Router();

/**
 * Get public ad settings (safe to expose to frontend)
 * This endpoint is publicly accessible - no auth required
 */
router.get("/settings", async (_req: Request, res: Response) => {
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
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to get ad settings";
    res.status(500).json({ detail: message });
  }
});

/**
 * Check if ads are enabled
 */
router.get("/enabled", async (_req: Request, res: Response) => {
  try {
    const enabled = await adSettingsService.areAdsEnabled();
    res.json({ enabled });
  } catch (error) {
    res.status(500).json({ enabled: false });
  }
});

export default router;
