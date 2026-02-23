"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearProcessedEvents = clearProcessedEvents;
const express_1 = require("express");
const stripeService_1 = require("../services/stripeService");
const router = (0, express_1.Router)();
// Track processed event IDs to prevent duplicate processing on retries
// Stripe retries webhooks up to 3 times — without this, duplicate payments can occur
const processedEvents = new Map();
const MAX_PROCESSED_EVENTS = 1000;
function isAlreadyProcessed(eventId) {
    if (processedEvents.has(eventId))
        return true;
    // Evict old entries if map gets too large
    if (processedEvents.size >= MAX_PROCESSED_EVENTS) {
        const oldestKey = processedEvents.keys().next().value;
        if (oldestKey)
            processedEvents.delete(oldestKey);
    }
    processedEvents.set(eventId, Date.now());
    return false;
}
// Stripe webhook endpoint
// Note: This route must use raw body parsing, configured in index.ts
router.post("/stripe", async (req, res) => {
    const signature = req.headers["stripe-signature"];
    if (!signature || typeof signature !== "string") {
        res.status(400).json({ detail: "Missing stripe-signature header" });
        return;
    }
    try {
        const event = (0, stripeService_1.constructWebhookEvent)(req.body, signature);
        // Skip if already processed (Stripe retry)
        if (isAlreadyProcessed(event.id)) {
            res.json({ received: true, duplicate: true });
            return;
        }
        await (0, stripeService_1.handleWebhookEvent)(event);
        res.json({ received: true });
    }
    catch (error) {
        console.error("Webhook error:", error);
        const message = error instanceof Error ? error.message : "Webhook handler failed";
        res.status(400).json({ detail: message });
    }
});
// For testing: clear processed events between test runs
function clearProcessedEvents() {
    processedEvents.clear();
}
exports.default = router;
//# sourceMappingURL=webhooks.js.map