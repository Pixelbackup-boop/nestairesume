import { Router, Request, Response } from "express";
import * as trustpilotSettingsService from "../services/trustpilotSettingsService";

const router = Router();

/**
 * Get public trustpilot settings (for frontend widget)
 * No auth required — returns only what's needed to render the widget
 */
router.get("/settings", async (_req: Request, res: Response) => {
  try {
    const settings = await trustpilotSettingsService.getTrustpilotSettings();

    res.set("Cache-Control", "public, max-age=300, stale-while-revalidate=600");
    res.json({
      enabled: settings.enabled,
      businessUnitId: settings.businessUnitId,
      templateId: settings.templateId,
      locale: settings.locale,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to get trustpilot settings";
    res.status(500).json({ detail: message });
  }
});

export default router;
