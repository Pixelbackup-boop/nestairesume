import { Router, Response } from "express";
import { authenticateToken, AuthRequest } from "../middleware/auth";
import { asyncHandler, requireAuth, errorResponse } from "../middleware/asyncHandler";
import { checkCvLimit } from "../middleware/subscriptionLimits";
import prisma from "../config/database";
import {
  getTemplates,
  createResume,
  getResumes,
  getResumeById,
  updateResume,
  deleteResume,
} from "../services/resumeService";

const router = Router();

// GET /api/v1/resumes/templates (public)
router.get("/templates", (_req, res: Response) => {
  const templates = getTemplates();
  res.json(templates);
});

// POST /api/v1/resumes
router.post("/", authenticateToken, requireAuth, checkCvLimit, asyncHandler<AuthRequest>(async (req, res) => {
  const { title, fullName } = req.body;
  if (!title || !fullName) {
    res.status(400).json(errorResponse("Title and fullName are required"));
    return;
  }

  // Wrap in transaction so count increment rolls back if resume create fails
  const resume = await prisma.$transaction(async (tx) => {
    const created = await createResume(req.user!.id, req.body, tx);
    await tx.user.update({
      where: { id: req.user!.id },
      data: { cvCreatedCount: { increment: 1 } },
    });
    return created;
  });

  res.status(201).json(resume);
}));

// GET /api/v1/resumes
router.get("/", authenticateToken, requireAuth, asyncHandler<AuthRequest>(async (req, res) => {
  const skip = parseInt(req.query.skip as string) || 0;
  const limit = parseInt(req.query.limit as string) || 20;

  const resumes = await getResumes(req.user!.id, skip, limit);
  res.json(resumes);
}));

// GET /api/v1/resumes/:id
router.get("/:id", authenticateToken, requireAuth, asyncHandler<AuthRequest>(async (req, res) => {
  const resume = await getResumeById(req.params.id, req.user!.id);
  if (!resume) {
    res.status(404).json(errorResponse("Resume not found"));
    return;
  }
  res.json(resume);
}));

// PUT /api/v1/resumes/:id
router.put("/:id", authenticateToken, requireAuth, asyncHandler<AuthRequest>(async (req, res) => {
  const resume = await updateResume(req.params.id, req.user!.id, req.body);
  if (!resume) {
    res.status(404).json(errorResponse("Resume not found"));
    return;
  }
  res.json(resume);
}));

// DELETE /api/v1/resumes/:id
router.delete("/:id", authenticateToken, requireAuth, asyncHandler<AuthRequest>(async (req, res) => {
  const deleted = await deleteResume(req.params.id, req.user!.id);
  if (!deleted) {
    res.status(404).json(errorResponse("Resume not found"));
    return;
  }
  res.status(204).send();
}));

export default router;
