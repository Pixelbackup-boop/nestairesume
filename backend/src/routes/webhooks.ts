import { Router, Request, Response } from "express";
import { constructWebhookEvent, handleWebhookEvent } from "../services/stripeService";

const router = Router();

// Track processed event IDs to prevent duplicate processing on retries
// Stripe retries webhooks up to 3 times — without this, duplicate payments can occur
const processedEvents = new Map<string, number>();
const MAX_PROCESSED_EVENTS = 1000;

function isAlreadyProcessed(eventId: string): boolean {
  if (processedEvents.has(eventId)) return true;

  // Evict old entries if map gets too large
  if (processedEvents.size >= MAX_PROCESSED_EVENTS) {
    const oldestKey = processedEvents.keys().next().value;
    if (oldestKey) processedEvents.delete(oldestKey);
  }

  processedEvents.set(eventId, Date.now());
  return false;
}

// Stripe webhook endpoint
// Note: This route must use raw body parsing, configured in index.ts
router.post("/stripe", async (req: Request, res: Response): Promise<void> => {
  const signature = req.headers["stripe-signature"];

  if (!signature || typeof signature !== "string") {
    res.status(400).json({ detail: "Missing stripe-signature header" });
    return;
  }

  try {
    const event = constructWebhookEvent(req.body as Buffer, signature);

    // Skip if already processed (Stripe retry)
    if (isAlreadyProcessed(event.id)) {
      res.json({ received: true, duplicate: true });
      return;
    }

    await handleWebhookEvent(event);

    res.json({ received: true });
  } catch (error: unknown) {
    console.error("Webhook error:", error);
    const message = error instanceof Error ? error.message : "Webhook handler failed";
    res.status(400).json({ detail: message });
  }
});

// For testing: clear processed events between test runs
export function clearProcessedEvents(): void {
  processedEvents.clear();
}

export default router;
