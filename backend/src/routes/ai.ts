import { Router, Request, Response } from "express";
import { generateSummary, improveContent } from "../services/aiService";

const router = Router();

// POST /api/v1/ai/generate-summary
router.post("/generate-summary", async (req: Request, res: Response) => {
  try {
    const { job_title, experience } = req.body;

    if (!job_title) {
      res.status(400).json({ detail: "job_title is required" });
      return;
    }

    const summary = await generateSummary(job_title, experience || "");
    res.json({ summary });
  } catch (error) {
    console.error("Generate summary error:", error);
    res.status(500).json({ detail: "Failed to generate summary" });
  }
});

// POST /api/v1/ai/improve-content
router.post("/improve-content", async (req: Request, res: Response) => {
  try {
    const { content } = req.body;

    if (!content) {
      res.status(400).json({ detail: "content is required" });
      return;
    }

    const improved_content = await improveContent(content);
    res.json({ improved_content });
  } catch (error) {
    console.error("Improve content error:", error);
    res.status(500).json({ detail: "Failed to improve content" });
  }
});

export default router;
