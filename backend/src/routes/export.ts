import { Router, Response } from "express";
import { authenticateToken, AuthRequest } from "../middleware/auth";
import { getResumeById } from "../services/resumeService";
import { generatePDF } from "../services/pdfService";

const router = Router();

// GET /api/v1/export/:resumeId/pdf
router.get("/:resumeId/pdf", authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ detail: "Not authenticated" });
      return;
    }

    const resume = await getResumeById(req.params.resumeId, req.user.id);
    if (!resume) {
      res.status(404).json({ detail: "Resume not found" });
      return;
    }

    const pdfBuffer = await generatePDF(resume);

    const filename = `${resume.fullName.replace(/\s+/g, "_")}_Resume.pdf`;

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.send(pdfBuffer);
  } catch (error) {
    console.error("PDF generation error:", error);
    res.status(500).json({ detail: "Failed to generate PDF" });
  }
});

export default router;
