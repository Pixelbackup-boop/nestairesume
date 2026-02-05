"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const stripeService_1 = require("../services/stripeService");
const router = (0, express_1.Router)();
// Create checkout session
router.post("/create-checkout", auth_1.authenticateToken, async (req, res) => {
    try {
        const { plan } = req.body;
        if (!plan || !["starter", "gold", "diamond", "platinum"].includes(plan)) {
            res.status(400).json({ detail: "Invalid plan" });
            return;
        }
        if (!req.user) {
            res.status(401).json({ detail: "Not authenticated" });
            return;
        }
        const url = await (0, stripeService_1.createCheckoutSession)(req.user.id, req.user.email, req.user.email, // Using email as name fallback
        plan);
        res.json({ url });
    }
    catch (error) {
        console.error("Checkout error:", error);
        const message = error instanceof Error ? error.message : "Failed to create checkout session";
        res.status(500).json({ detail: message });
    }
});
// Create customer portal session
router.post("/create-portal", auth_1.authenticateToken, async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ detail: "Not authenticated" });
            return;
        }
        const url = await (0, stripeService_1.createPortalSession)(req.user.id);
        res.json({ url });
    }
    catch (error) {
        console.error("Portal error:", error);
        const message = error instanceof Error ? error.message : "Failed to create portal session";
        res.status(500).json({ detail: message });
    }
});
// Get subscription status
router.get("/status", auth_1.authenticateToken, async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ detail: "Not authenticated" });
            return;
        }
        const status = await (0, stripeService_1.getSubscriptionStatus)(req.user.id);
        res.json(status);
    }
    catch (error) {
        console.error("Status error:", error);
        res.status(500).json({ detail: "Failed to get subscription status" });
    }
});
exports.default = router;
//# sourceMappingURL=payments.js.map