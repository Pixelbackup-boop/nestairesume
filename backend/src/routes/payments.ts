import { Router, Request, Response } from "express";
import { authenticateToken, AuthRequest } from "../middleware/auth";
import {
  createCheckoutSession,
  createPortalSession,
  getSubscriptionStatus,
  PlanType,
} from "../services/stripeService";

const router = Router();

// Create checkout session
router.post("/create-checkout", authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { plan } = req.body as { plan: PlanType };

    if (!plan || !["starter", "gold", "diamond"].includes(plan)) {
      res.status(400).json({ detail: "Invalid plan" });
      return;
    }

    if (!req.user) {
      res.status(401).json({ detail: "Not authenticated" });
      return;
    }

    const url = await createCheckoutSession(
      req.user.sub,
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

    const url = await createPortalSession(req.user.sub);
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

    const status = await getSubscriptionStatus(req.user.sub);
    res.json(status);
  } catch (error: unknown) {
    console.error("Status error:", error);
    res.status(500).json({ detail: "Failed to get subscription status" });
  }
});

export default router;
