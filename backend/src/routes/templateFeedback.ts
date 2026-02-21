import { Router, Response } from "express";
import { authenticateToken, AuthRequest } from "../middleware/auth";
import { asyncHandler, requireAuth, errorResponse } from "../middleware/asyncHandler";
import prisma from "../config/database";

const router = Router();

const VALID_TYPES = ["feedback", "bug", "suggestion"];

/**
 * POST /api/v1/template-feedback
 * Submit feedback for a specific template (authenticated users only)
 */
router.post(
  "/",
  authenticateToken,
  requireAuth,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { templateId, type, message } = req.body;

    if (!templateId || typeof templateId !== "string" || templateId.trim().length < 1) {
      res.status(400).json(errorResponse("Template ID is required"));
      return;
    }

    const feedbackType = type && VALID_TYPES.includes(type) ? type : "feedback";

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      res.status(400).json(errorResponse("Message must be at least 5 characters"));
      return;
    }
    if (message.trim().length > 2000) {
      res.status(400).json(errorResponse("Message must be under 2000 characters"));
      return;
    }

    const feedback = await prisma.templateFeedback.create({
      data: {
        userId: req.user!.id,
        templateId: templateId.trim(),
        type: feedbackType,
        message: message.trim(),
      },
      select: {
        id: true,
        templateId: true,
        type: true,
        message: true,
        createdAt: true,
      },
    });

    res.status(201).json({ success: true, feedback });
  })
);

export default router;
