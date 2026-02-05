"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stripeService_1 = require("../services/stripeService");
const router = (0, express_1.Router)();
// Stripe webhook endpoint
// Note: This route must use raw body parsing, configured in index.ts
router.post("/stripe", async (req, res) => {
    const signature = req.headers["stripe-signature"];
    if (!signature || typeof signature !== "string") {
        res.status(400).json({ detail: "Missing stripe-signature header" });
        return;
    }
    try {
        // req.body should be a Buffer when using express.raw()
        const event = (0, stripeService_1.constructWebhookEvent)(req.body, signature);
        // Handle the event
        await (0, stripeService_1.handleWebhookEvent)(event);
        res.json({ received: true });
    }
    catch (error) {
        console.error("Webhook error:", error);
        const message = error instanceof Error ? error.message : "Webhook handler failed";
        res.status(400).json({ detail: message });
    }
});
exports.default = router;
//# sourceMappingURL=webhooks.js.map