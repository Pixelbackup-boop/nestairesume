import { Router, Request, Response } from "express";
import logger from "../lib/logger";
import { authenticateToken, AuthRequest } from "../middleware/auth";
import { validateBody, createCheckoutSchema } from "../middleware/validation";
import {
  createCheckoutSession,
  createPortalSession,
  getSubscriptionStatus,
  getPublicPlanLimits,
  PlanType,
} from "../services/stripeService";
import { getUsageStatus } from "../middleware/subscriptionLimits";

const router = Router();

// Create checkout session
router.post("/create-checkout", authenticateToken, validateBody(createCheckoutSchema), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { plan } = req.body as { plan: PlanType };

    if (!req.user) {
      res.status(401).json({ detail: "Not authenticated" });
      return;
    }

    const url = await createCheckoutSession(
      req.user.id,
      req.user.email,
      req.user.email, // Using email as name fallback
      plan
    );

    res.json({ url });
  } catch (error: unknown) {
    logger.error({ err: error }, 'Checkout error');
    const message = error instanceof Error ? error.message : "Failed to create checkout session";
    res.status(500).json({ detail: message });
  }
});

// Create customer portal session
router.post("/create-portal", authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ detail: "Not authenticated" });
      return;
    }

    const url = await createPortalSession(req.user.id);
    res.json({ url });
  } catch (error: unknown) {
    logger.error({ err: error }, 'Portal error');
    const message = error instanceof Error ? error.message : "Failed to create portal session";
    res.status(500).json({ detail: message });
  }
});

// Get subscription status
router.get("/status", authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ detail: "Not authenticated" });
      return;
    }

    const status = await getSubscriptionStatus(req.user.id);
    res.json(status);
  } catch (error: unknown) {
    logger.error({ err: error }, 'Subscription status error');
    res.status(500).json({ detail: "Failed to get subscription status" });
  }
});

// Get usage limits and remaining counts
router.get("/usage", authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ detail: "Not authenticated" });
      return;
    }

    const usage = await getUsageStatus(req.user.id);
    if (!usage) {
      res.status(404).json({ detail: "User not found" });
      return;
    }

    res.json(usage);
  } catch (error: unknown) {
    logger.error({ err: error }, 'Usage status error');
    res.status(500).json({ detail: "Failed to get usage status" });
  }
});

// Public endpoint: plan limits (no auth required)
router.get("/plans", (_req: Request, res: Response): void => {
  res.set("Cache-Control", "public, max-age=600, stale-while-revalidate=1200");
  res.json(getPublicPlanLimits());
});

export default router;
