import { Router, Request, Response } from "express";
import { authenticateToken, AuthRequest } from "../middleware/auth";
import { validateBody, createCheckoutSchema } from "../middleware/validation";
import {
  createCheckoutSession,
  createPortalSession,
  getSubscriptionStatus,
  PlanType,
} from "../services/stripeService";

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
    console.error("Checkout error:", error);
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
    console.error("Portal error:", error);
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
    console.error("Status error:", error);
    res.status(500).json({ detail: "Failed to get subscription status" });
  }
});

export default router;
