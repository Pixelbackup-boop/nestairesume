"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const atsCheckerService_1 = require("../services/atsCheckerService");
const router = (0, express_1.Router)();
// Configure multer for memory storage (same pattern as resumeParser)
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
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
        }
        else {
            cb(new Error("Only PDF and DOCX files are allowed"));
        }
    },
});
/**
 * POST /api/v1/ats/check
 * Upload a resume PDF/DOCX and get ATS compatibility score.
 * No auth required — free tool for lead generation.
 */
router.post("/check", (req, res) => {
    upload.single("file")(req, res, async (err) => {
        if (err) {
            if (err instanceof multer_1.default.MulterError && err.code === "LIMIT_FILE_SIZE") {
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
            const result = await (0, atsCheckerService_1.checkAtsCompatibility)(req.file.buffer, req.file.mimetype);
            res.json({ success: true, ...result });
        }
        catch (error) {
            console.error("ATS check error:", error);
            res.status(500).json({
                success: false,
                error: "Failed to analyze resume. Please try again.",
            });
        }
    });
});
exports.default = router;
//# sourceMappingURL=atsChecker.js.map