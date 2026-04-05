import { Router, Request, Response } from "express";
import logger from "../lib/logger";
import { authenticateToken, AuthRequest } from "../middleware/auth";
import { validateBody, createCheckoutSchema, cancelSubscriptionSchema, changePlanSchema } from "../middleware/validation";
import {
  createCheckoutSession,
  createPortalSession,
  getSubscriptionStatus,
  getSubscriptionDetails,
  getUserInvoices,
  cancelSubscription,
  reactivateSubscription,
  changeSubscriptionPlan,
  getProrationPreview,
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

    const { returnUrl } = req.body as { returnUrl?: string };
    const url = await createPortalSession(req.user.id, returnUrl);
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

// Get billing details (subscription + recent invoices)
router.get("/billing", authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) { res.status(401).json({ detail: "Not authenticated" }); return; }

    const [subscription, invoices] = await Promise.all([
      getSubscriptionDetails(req.user.id),
      getUserInvoices(req.user.id, 12),
    ]);

    res.json({ subscription, invoices });
  } catch (error: unknown) {
    logger.error({ err: error }, 'Billing details error');
    res.status(500).json({ detail: "Failed to get billing details" });
  }
});

// Get invoice list
router.get("/invoices", authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) { res.status(401).json({ detail: "Not authenticated" }); return; }

    const limit = Math.min(parseInt(req.query.limit as string) || 24, 100);
    const invoices = await getUserInvoices(req.user.id, limit);
    res.json({ invoices });
  } catch (error: unknown) {
    logger.error({ err: error }, 'Invoices error');
    res.status(500).json({ detail: "Failed to get invoices" });
  }
});

// Redirect to Stripe invoice PDF (verifies ownership)
router.get("/invoices/:id/pdf", authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) { res.status(401).json({ detail: "Not authenticated" }); return; }

    // Fetch the user's invoices and verify the requested invoice belongs to them
    const invoices = await getUserInvoices(req.user.id, 100);
    const invoice = invoices.find(inv => inv.id === req.params.id);

    if (!invoice?.pdfUrl) {
      res.status(404).json({ detail: "Invoice not found" });
      return;
    }

    res.redirect(302, invoice.pdfUrl);
  } catch (error: unknown) {
    logger.error({ err: error }, 'Invoice PDF error');
    res.status(500).json({ detail: "Failed to get invoice PDF" });
  }
});

// Cancel subscription
router.post("/cancel", authenticateToken, validateBody(cancelSubscriptionSchema), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) { res.status(401).json({ detail: "Not authenticated" }); return; }

    const { immediately } = req.body as { immediately?: boolean };
    const result = await cancelSubscription(req.user.id, immediately);
    res.json(result);
  } catch (error: unknown) {
    logger.error({ err: error }, 'Cancel subscription error');
    const message = error instanceof Error ? error.message : "Failed to cancel subscription";
    res.status(500).json({ detail: message });
  }
});

// Reactivate subscription (undo pending cancellation)
router.post("/reactivate", authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) { res.status(401).json({ detail: "Not authenticated" }); return; }

    const result = await reactivateSubscription(req.user.id);
    res.json(result);
  } catch (error: unknown) {
    logger.error({ err: error }, 'Reactivate subscription error');
    const message = error instanceof Error ? error.message : "Failed to reactivate subscription";
    res.status(500).json({ detail: message });
  }
});

// Change subscription plan
router.post("/change-plan", authenticateToken, validateBody(changePlanSchema), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) { res.status(401).json({ detail: "Not authenticated" }); return; }

    const { plan } = req.body as { plan: PlanType };
    const result = await changeSubscriptionPlan(req.user.id, plan);
    res.json(result);
  } catch (error: unknown) {
    logger.error({ err: error }, 'Change plan error');
    const message = error instanceof Error ? error.message : "Failed to change plan";
    res.status(500).json({ detail: message });
  }
});

// Preview proration for plan change
router.get("/proration-preview", authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) { res.status(401).json({ detail: "Not authenticated" }); return; }

    const plan = req.query.plan as PlanType;
    if (!plan || !['starter', 'gold', 'diamond', 'platinum'].includes(plan)) {
      res.status(400).json({ detail: "Invalid plan" });
      return;
    }

    const result = await getProrationPreview(req.user.id, plan);
    res.json(result);
  } catch (error: unknown) {
    logger.error({ err: error }, 'Proration preview error');
    const message = error instanceof Error ? error.message : "Failed to get proration preview";
    res.status(500).json({ detail: message });
  }
});

// Public endpoint: plan limits (no auth required)
router.get("/plans", (_req: Request, res: Response): void => {
  res.set("Cache-Control", "public, max-age=600, stale-while-revalidate=1200");
  res.json(getPublicPlanLimits());
});

export default router;
