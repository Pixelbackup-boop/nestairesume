import { Router, Request, Response } from "express";
import multer from "multer";
import * as resumeParserService from "../services/resumeParserService";

const router = Router();

// Configure multer for memory storage
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

// Error handler for multer
const handleMulterError = (err: Error, res: Response): boolean => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      res.status(400).json({
        success: false,
        error: "File size exceeds 10MB limit",
      });
      return true;
    }
  }
  if (err.message.includes("Only PDF and DOCX")) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
    return true;
  }
  return false;
};

/**
 * POST /api/v1/resume/parse
 *
 * Parse an uploaded resume (PDF or DOCX) and generate an enhanced version
 * using AI. Returns structured resume data.
 *
 * Body (multipart/form-data):
 * - file: PDF or DOCX file (max 10MB)
 * - locale: Language code (en, es, fr, de, ar) - optional, defaults to 'en'
 *
 * Response:
 * {
 *   success: boolean,
 *   data?: ParsedResumeData,
 *   warnings?: string[],
 *   isLinkedIn?: boolean,
 *   error?: string
 * }
 */
router.post(
  "/parse",
  (req: Request, res: Response, next) => {
    upload.single("file")(req, res, (err) => {
      if (err && handleMulterError(err, res)) {
        return;
      }
      if (err) {
        res.status(500).json({
          success: false,
          error: "File upload failed",
        });
        return;
      }
      next();
    });
  },
  async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.file) {
        res.status(400).json({
          success: false,
          error: "No file uploaded",
        });
        return;
      }

      const locale = (req.body.locale as string) || "en";

      // Parse the resume
      const result = await resumeParserService.parseResume(
        req.file.buffer,
        req.file.mimetype,
        locale
      );

      if (result.success) {
        res.json(result);
      } else {
        res.status(422).json(result);
      }
    } catch (error) {
      console.error("Resume parse error:", error);
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Failed to parse resume",
      });
    }
  }
);

/**
 * GET /api/v1/resume/parse/status
 *
 * Health check for the resume parser service
 */
router.get("/parse/status", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    service: "resume-parser",
    supportedFormats: ["PDF", "DOCX"],
    maxFileSize: "10MB",
  });
});

export default router;
