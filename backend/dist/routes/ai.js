"use strict";
/**
 * AI Routes
 * Endpoints for AI-powered content generation
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const subscriptionLimits_1 = require("../middleware/subscriptionLimits");
const aiContentService_1 = require("../services/aiContentService");
const router = (0, express_1.Router)();
/**
 * POST /api/v1/ai/improve-content
 * Improve resume experience/description content using AI
 *
 * Request body: { content: string }
 * Response: { improved_content: string }
 */
router.post("/improve-content", auth_1.authenticateToken, subscriptionLimits_1.checkAiLimit, async (req, res) => {
    try {
        const { content } = req.body;
        if (!content || typeof content !== "string") {
            res.status(400).json({ error: "Content is required" });
            return;
        }
        if (content.length > 5000) {
            res.status(400).json({ error: "Content too long (max 5000 characters)" });
            return;
        }
        const improvedContent = await (0, aiContentService_1.improveContent)(content);
        // Increment AI usage count after successful generation
        await (0, subscriptionLimits_1.incrementAiCount)(req.user.id);
        res.json({ improved_content: improvedContent });
    }
    catch (error) {
        console.error("AI improve-content error:", error);
        const message = error instanceof Error ? error.message : "Failed to improve content";
        res.status(500).json({ error: message });
    }
});
/**
 * POST /api/v1/ai/generate-cover-letter
 * Generate a personalized cover letter using AI
 *
 * Request body: CoverLetterInput
 * Response: { cover_letter: string }
 */
router.post("/generate-cover-letter", auth_1.authenticateToken, subscriptionLimits_1.checkCoverLetterLimit, async (req, res) => {
    try {
        const input = req.body;
        // Validate required fields
        if (!input.fullName || typeof input.fullName !== "string") {
            res.status(400).json({ error: "Full name is required" });
            return;
        }
        if (!input.jobTitle || typeof input.jobTitle !== "string") {
            res.status(400).json({ error: "Job title is required" });
            return;
        }
        if (!input.companyName || typeof input.companyName !== "string") {
            res.status(400).json({ error: "Company name is required" });
            return;
        }
        // Validate tone
        const validTones = ["professional", "friendly", "confident", "enthusiastic"];
        if (!input.tone || !validTones.includes(input.tone)) {
            input.tone = "professional"; // Default to professional
        }
        const coverLetter = await (0, aiContentService_1.generateCoverLetter)(input);
        // Increment cover letter usage count after successful generation
        await (0, subscriptionLimits_1.incrementCoverLetterCount)(req.user.id);
        res.json({ cover_letter: coverLetter });
    }
    catch (error) {
        console.error("AI generate-cover-letter error:", error);
        const message = error instanceof Error ? error.message : "Failed to generate cover letter";
        res.status(500).json({ error: message });
    }
});
exports.default = router;
//# sourceMappingURL=ai.js.map