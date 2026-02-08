import { Router, Request, Response } from "express";
import * as tawkSettingsService from "../services/tawkSettingsService";

const router = Router();

/**
 * Get public tawk.to settings (for frontend widget)
 * No auth required — returns only what's needed to load the widget
 */
router.get("/settings", async (_req: Request, res: Response) => {
  try {
    const settings = await tawkSettingsService.getTawkSettings();

    res.json({
      enabled: settings.enabled,
      propertyId: settings.propertyId,
      widgetId: settings.widgetId,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to get tawk settings";
    res.status(500).json({ detail: message });
  }
});

export default router;
