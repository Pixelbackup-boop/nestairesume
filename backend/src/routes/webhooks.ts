import { Router, Request, Response } from "express";
import { constructWebhookEvent, handleWebhookEvent } from "../services/stripeService";

const router = Router();

// Stripe webhook endpoint
// Note: This route must use raw body parsing, configured in index.ts
router.post("/stripe", async (req: Request, res: Response): Promise<void> => {
  const signature = req.headers["stripe-signature"];

  if (!signature || typeof signature !== "string") {
    res.status(400).json({ detail: "Missing stripe-signature header" });
    return;
  }

  try {
    // req.body should be a Buffer when using express.raw()
    const event = constructWebhookEvent(req.body as Buffer, signature);

    // Handle the event
    await handleWebhookEvent(event);

    res.json({ received: true });
  } catch (error: unknown) {
    console.error("Webhook error:", error);
    const message = error instanceof Error ? error.message : "Webhook handler failed";
    res.status(400).json({ detail: message });
  }
});

export default router;
