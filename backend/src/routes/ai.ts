/**
 * AI Routes
 * Endpoints for AI-powered content generation
 */

import { Router, Response } from "express";
import logger from "../lib/logger";
import { authenticateToken, AuthRequest } from "../middleware/auth";
import {
  checkAiLimit,
  checkCoverLetterLimit,
  incrementAiCount,
  incrementCoverLetterCount,
} from "../middleware/subscriptionLimits";
import { improveContent, generateCoverLetter, CoverLetterInput } from "../services/aiContentService";

const router = Router();

/**
 * POST /api/v1/ai/improve-content
 * Improve resume experience/description content using AI
 *
 * Request body: { content: string }
 * Response: { improved_content: string }
 */
router.post(
  "/improve-content",
  authenticateToken,
  checkAiLimit,
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { content } = req.body as { content: string };

      if (!content || typeof content !== "string") {
        res.status(400).json({ error: "Content is required" });
        return;
      }

      if (content.length > 5000) {
        res.status(400).json({ error: "Content too long (max 5000 characters)" });
        return;
      }

      const improvedContent = await improveContent(content);

      // Increment AI usage count after successful generation
      await incrementAiCount(req.user!.id);

      res.json({ improved_content: improvedContent });
    } catch (error) {
      logger.error({ err: error }, 'AI improve-content error');
      const message = error instanceof Error ? error.message : "Failed to improve content";
      res.status(500).json({ error: message });
    }
  }
);

/**
 * POST /api/v1/ai/generate-cover-letter
 * Generate a personalized cover letter using AI
 *
 * Request body: CoverLetterInput
 * Response: { cover_letter: string }
 */
router.post(
  "/generate-cover-letter",
  authenticateToken,
  checkCoverLetterLimit,
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const input = req.body as CoverLetterInput;

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

      const coverLetter = await generateCoverLetter(input);

      // Increment cover letter usage count after successful generation
      await incrementCoverLetterCount(req.user!.id);

      res.json({ cover_letter: coverLetter });
    } catch (error) {
      logger.error({ err: error }, 'AI generate-cover-letter error');
      const message = error instanceof Error ? error.message : "Failed to generate cover letter";
      res.status(500).json({ error: message });
    }
  }
);

export default router;
