"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const resumeParserService = __importStar(require("../services/resumeParserService"));
const router = (0, express_1.Router)();
// Configure multer for memory storage
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
// Error handler for multer
const handleMulterError = (err, res) => {
    if (err instanceof multer_1.default.MulterError) {
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
router.post("/parse", (req, res, next) => {
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
}, async (req, res) => {
    try {
        if (!req.file) {
            res.status(400).json({
                success: false,
                error: "No file uploaded",
            });
            return;
        }
        const locale = req.body.locale || "en";
        // Parse the resume
        const result = await resumeParserService.parseResume(req.file.buffer, req.file.mimetype, locale);
        if (result.success) {
            res.json(result);
        }
        else {
            res.status(422).json(result);
        }
    }
    catch (error) {
        console.error("Resume parse error:", error);
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : "Failed to parse resume",
        });
    }
});
/**
 * GET /api/v1/resume/parse/status
 *
 * Health check for the resume parser service
 */
router.get("/parse/status", (_req, res) => {
    res.json({
        status: "ok",
        service: "resume-parser",
        supportedFormats: ["PDF", "DOCX"],
        maxFileSize: "10MB",
    });
});
exports.default = router;
//# sourceMappingURL=resumeParser.js.map