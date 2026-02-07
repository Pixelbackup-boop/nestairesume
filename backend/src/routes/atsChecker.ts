import { Router, Request, Response } from "express";
import multer from "multer";
import { checkAtsCompatibility } from "../services/atsCheckerService";

const router = Router();

// Configure multer for memory storage (same pattern as resumeParser)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (_req, file, cb) => {
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF and DOCX files are allowed"));
    }
  },
});

/**
 * POST /api/v1/ats/check
 * Upload a resume PDF/DOCX and get ATS compatibility score.
 * No auth required — free tool for lead generation.
 */
router.post("/check", (req: Request, res: Response) => {
  upload.single("file")(req, res, async (err) => {
    if (err) {
      if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
        res.status(400).json({ success: false, error: "File size exceeds 10MB limit" });
        return;
      }
      if (err.message.includes("Only PDF and DOCX")) {
        res.status(400).json({ success: false, error: err.message });
        return;
      }
      res.status(500).json({ success: false, error: "File upload failed" });
      return;
    }

    if (!req.file) {
      res.status(400).json({ success: false, error: "No file uploaded" });
      return;
    }

    try {
      const result = await checkAtsCompatibility(req.file.buffer, req.file.mimetype);
      res.json({ success: true, ...result });
    } catch (error) {
      console.error("ATS check error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to analyze resume. Please try again.",
      });
    }
  });
});

export default router;
