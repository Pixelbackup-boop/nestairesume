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
const auth_1 = require("../middleware/auth");
const pdfService = __importStar(require("../services/pdfContentService"));
const aiBlogService = __importStar(require("../services/aiBlogService"));
const schedulerService = __importStar(require("../services/schedulerService"));
const router = (0, express_1.Router)();
// Configure multer for memory storage (PDFs)
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: {
        fileSize: 50 * 1024 * 1024, // 50MB limit
    },
    fileFilter: (_req, file, cb) => {
        if (file.mimetype === "application/pdf") {
            cb(null, true);
        }
        else {
            cb(new Error("Only PDF files are allowed"));
        }
    },
});
// All routes require admin
router.use(auth_1.authenticateToken);
router.use(auth_1.requireAdmin);
// ============ CONTENT SOURCES ============
// Upload PDF
router.post("/content/upload", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            res.status(400).json({ detail: "No file uploaded" });
            return;
        }
        const name = req.body.name || req.file.originalname.replace(".pdf", "");
        // Extract PDF content
        const extracted = await pdfService.extractPdfContent(req.file.buffer);
        // Save to database
        const source = await pdfService.saveContentSource(name, req.file.originalname, extracted.text, extracted.pageCount, { title: extracted.info.title, author: extracted.info.author });
        res.status(201).json({
            id: source.id,
            name: source.name,
            filename: source.filename,
            pageCount: source.pageCount,
            contentLength: extracted.text.length,
        });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to upload PDF";
        res.status(500).json({ detail: message });
    }
});
// List content sources
router.get("/content", async (_req, res) => {
    try {
        const sources = await pdfService.getAllContentSources();
        res.json(sources);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to get content sources";
        res.status(500).json({ detail: message });
    }
});
// Get single content source
router.get("/content/:id", async (req, res) => {
    try {
        const source = await pdfService.getContentSourceById(req.params.id);
        if (!source) {
            res.status(404).json({ detail: "Content source not found" });
            return;
        }
        res.json(source);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to get content source";
        res.status(500).json({ detail: message });
    }
});
// Delete content source
router.delete("/content/:id", async (req, res) => {
    try {
        await pdfService.deleteContentSource(req.params.id);
        res.status(204).send();
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to delete content source";
        res.status(500).json({ detail: message });
    }
});
// ============ AI GENERATION ============
// Generate posts from content source
router.post("/generate", async (req, res) => {
    try {
        const { sourceId, count = 5 } = req.body;
        if (!sourceId) {
            res.status(400).json({ detail: "sourceId is required" });
            return;
        }
        // Generate posts using AI
        const posts = await aiBlogService.generatePostsFromContent(sourceId, count);
        // Save to queue
        const savedCount = await aiBlogService.savePostsToQueue(posts, sourceId);
        res.json({
            generated: posts.length,
            saved: savedCount,
            posts: posts.map((p) => ({ title: p.title, category: p.category })),
        });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to generate posts";
        res.status(500).json({ detail: message });
    }
});
// ============ POST QUEUE ============
// Get all scheduled posts
router.get("/queue", async (req, res) => {
    try {
        const status = req.query.status;
        const posts = await aiBlogService.getScheduledPosts(status);
        res.json(posts);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to get queue";
        res.status(500).json({ detail: message });
    }
});
// Get single scheduled post
router.get("/queue/:id", async (req, res) => {
    try {
        const post = await aiBlogService.getScheduledPostById(req.params.id);
        if (!post) {
            res.status(404).json({ detail: "Post not found" });
            return;
        }
        res.json(post);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to get post";
        res.status(500).json({ detail: message });
    }
});
// Update scheduled post
router.put("/queue/:id", async (req, res) => {
    try {
        const post = await aiBlogService.updateScheduledPost(req.params.id, req.body);
        res.json(post);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to update post";
        res.status(500).json({ detail: message });
    }
});
// Approve post
router.post("/queue/:id/approve", async (req, res) => {
    try {
        const post = await aiBlogService.approvePost(req.params.id);
        res.json(post);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to approve post";
        res.status(500).json({ detail: message });
    }
});
// Publish post immediately
router.post("/queue/:id/publish", async (req, res) => {
    try {
        const settings = await schedulerService.getSettings();
        const blogPost = await aiBlogService.publishPost(req.params.id, settings.authorName);
        res.json(blogPost);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to publish post";
        res.status(500).json({ detail: message });
    }
});
// Delete scheduled post
router.delete("/queue/:id", async (req, res) => {
    try {
        await aiBlogService.deleteScheduledPost(req.params.id);
        res.status(204).send();
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to delete post";
        res.status(500).json({ detail: message });
    }
});
// ============ SETTINGS & STATUS ============
// Get scheduler status
router.get("/status", async (_req, res) => {
    try {
        const status = await schedulerService.getSchedulerStatus();
        res.json(status);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to get status";
        res.status(500).json({ detail: message });
    }
});
// Get settings
router.get("/settings", async (_req, res) => {
    try {
        const settings = await schedulerService.getSettings();
        res.json(settings);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to get settings";
        res.status(500).json({ detail: message });
    }
});
// Update settings
router.put("/settings", async (req, res) => {
    try {
        const settings = await schedulerService.updateSettings(req.body);
        res.json(settings);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to update settings";
        res.status(500).json({ detail: message });
    }
});
// Toggle auto-posting
router.post("/toggle", async (req, res) => {
    try {
        const { enabled } = req.body;
        const settings = await schedulerService.updateSettings({ enabled });
        res.json({ enabled: settings.enabled });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to toggle auto-posting";
        res.status(500).json({ detail: message });
    }
});
exports.default = router;
//# sourceMappingURL=autoBlog.js.map