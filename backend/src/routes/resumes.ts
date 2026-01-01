import { Router, Response } from "express";
import { authenticateToken, AuthRequest } from "../middleware/auth";
import {
  getTemplates,
  createResume,
  getResumes,
  getResumeById,
  updateResume,
  deleteResume,
} from "../services/resumeService";

const router = Router();

// GET /api/v1/resumes/templates
router.get("/templates", (_req, res: Response) => {
  const templates = getTemplates();
  res.json(templates);
});

// POST /api/v1/resumes
router.post("/", authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ detail: "Not authenticated" });
      return;
    }

    const { title, fullName } = req.body;
    if (!title || !fullName) {
      res.status(400).json({ detail: "Title and fullName are required" });
      return;
    }

    const resume = await createResume(req.user.id, req.body);
    res.status(201).json(resume);
  } catch (error) {
    console.error("Create resume error:", error);
    res.status(500).json({ detail: "Failed to create resume" });
  }
});

// GET /api/v1/resumes
router.get("/", authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ detail: "Not authenticated" });
      return;
    }

    const skip = parseInt(req.query.skip as string) || 0;
    const limit = parseInt(req.query.limit as string) || 20;

    const resumes = await getResumes(req.user.id, skip, limit);
    res.json(resumes);
  } catch (error) {
    console.error("Get resumes error:", error);
    res.status(500).json({ detail: "Failed to get resumes" });
  }
});

// GET /api/v1/resumes/:id
router.get("/:id", authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ detail: "Not authenticated" });
      return;
    }

    const resume = await getResumeById(req.params.id, req.user.id);
    if (!resume) {
      res.status(404).json({ detail: "Resume not found" });
      return;
    }

    res.json(resume);
  } catch (error) {
    console.error("Get resume error:", error);
    res.status(500).json({ detail: "Failed to get resume" });
  }
});

// PUT /api/v1/resumes/:id
router.put("/:id", authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ detail: "Not authenticated" });
      return;
    }

    const resume = await updateResume(req.params.id, req.user.id, req.body);
    if (!resume) {
      res.status(404).json({ detail: "Resume not found" });
      return;
    }

    res.json(resume);
  } catch (error) {
    console.error("Update resume error:", error);
    res.status(500).json({ detail: "Failed to update resume" });
  }
});

// DELETE /api/v1/resumes/:id
router.delete("/:id", authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ detail: "Not authenticated" });
      return;
    }

    const deleted = await deleteResume(req.params.id, req.user.id);
    if (!deleted) {
      res.status(404).json({ detail: "Resume not found" });
      return;
    }

    res.status(204).send();
  } catch (error) {
    console.error("Delete resume error:", error);
    res.status(500).json({ detail: "Failed to delete resume" });
  }
});

export default router;
