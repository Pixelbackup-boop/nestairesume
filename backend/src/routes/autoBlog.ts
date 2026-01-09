import { Router, Response } from "express";
import multer from "multer";
import { AuthRequest, authenticateToken, requireAdmin } from "../middleware/auth";
import * as pdfService from "../services/pdfContentService";
import * as aiBlogService from "../services/aiBlogService";
import * as schedulerService from "../services/schedulerService";

const router = Router();

// Configure multer for memory storage (PDFs)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"));
    }
  },
});

// All routes require admin
router.use(authenticateToken);
router.use(requireAdmin);

// ============ CONTENT SOURCES ============

// Upload PDF
router.post("/content/upload", upload.single("file"), async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) {
      res.status(400).json({ detail: "No file uploaded" });
      return;
    }

    const name = req.body.name || req.file.originalname.replace(".pdf", "");

    // Extract PDF content
    const extracted = await pdfService.extractPdfContent(req.file.buffer);

    // Save to database
    const source = await pdfService.saveContentSource(
      name,
      req.file.originalname,
      extracted.text,
      extracted.pageCount,
      { title: extracted.info.title, author: extracted.info.author }
    );

    res.status(201).json({
      id: source.id,
      name: source.name,
      filename: source.filename,
      pageCount: source.pageCount,
      contentLength: extracted.text.length,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to upload PDF";
    res.status(500).json({ detail: message });
  }
});

// List content sources
router.get("/content", async (_req: AuthRequest, res: Response) => {
  try {
    const sources = await pdfService.getAllContentSources();
    res.json(sources);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to get content sources";
    res.status(500).json({ detail: message });
  }
});

// Get single content source
router.get("/content/:id", async (req: AuthRequest, res: Response) => {
  try {
    const source = await pdfService.getContentSourceById(req.params.id);
    if (!source) {
      res.status(404).json({ detail: "Content source not found" });
      return;
    }
    res.json(source);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to get content source";
    res.status(500).json({ detail: message });
  }
});

// Delete content source
router.delete("/content/:id", async (req: AuthRequest, res: Response) => {
  try {
    await pdfService.deleteContentSource(req.params.id);
    res.status(204).send();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete content source";
    res.status(500).json({ detail: message });
  }
});

// ============ AI GENERATION ============

// Generate posts from content source
router.post("/generate", async (req: AuthRequest, res: Response) => {
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
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to generate posts";
    res.status(500).json({ detail: message });
  }
});

// ============ POST QUEUE ============

// Get all scheduled posts
router.get("/queue", async (req: AuthRequest, res: Response) => {
  try {
    const status = req.query.status as string | undefined;
    const posts = await aiBlogService.getScheduledPosts(status);
    res.json(posts);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to get queue";
    res.status(500).json({ detail: message });
  }
});

// Get single scheduled post
router.get("/queue/:id", async (req: AuthRequest, res: Response) => {
  try {
    const post = await aiBlogService.getScheduledPostById(req.params.id);
    if (!post) {
      res.status(404).json({ detail: "Post not found" });
      return;
    }
    res.json(post);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to get post";
    res.status(500).json({ detail: message });
  }
});

// Update scheduled post
router.put("/queue/:id", async (req: AuthRequest, res: Response) => {
  try {
    const post = await aiBlogService.updateScheduledPost(req.params.id, req.body);
    res.json(post);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update post";
    res.status(500).json({ detail: message });
  }
});

// Approve post
router.post("/queue/:id/approve", async (req: AuthRequest, res: Response) => {
  try {
    const post = await aiBlogService.approvePost(req.params.id);
    res.json(post);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to approve post";
    res.status(500).json({ detail: message });
  }
});

// Publish post immediately
router.post("/queue/:id/publish", async (req: AuthRequest, res: Response) => {
  try {
    const settings = await schedulerService.getSettings();
    const blogPost = await aiBlogService.publishPost(req.params.id, settings.authorName);
    res.json(blogPost);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to publish post";
    res.status(500).json({ detail: message });
  }
});

// Delete scheduled post
router.delete("/queue/:id", async (req: AuthRequest, res: Response) => {
  try {
    await aiBlogService.deleteScheduledPost(req.params.id);
    res.status(204).send();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete post";
    res.status(500).json({ detail: message });
  }
});

// ============ SETTINGS & STATUS ============

// Get scheduler status
router.get("/status", async (_req: AuthRequest, res: Response) => {
  try {
    const status = await schedulerService.getSchedulerStatus();
    res.json(status);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to get status";
    res.status(500).json({ detail: message });
  }
});

// Get settings
router.get("/settings", async (_req: AuthRequest, res: Response) => {
  try {
    const settings = await schedulerService.getSettings();
    res.json(settings);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to get settings";
    res.status(500).json({ detail: message });
  }
});

// Update settings
router.put("/settings", async (req: AuthRequest, res: Response) => {
  try {
    const settings = await schedulerService.updateSettings(req.body);
    res.json(settings);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update settings";
    res.status(500).json({ detail: message });
  }
});

// Toggle auto-posting
router.post("/toggle", async (req: AuthRequest, res: Response) => {
  try {
    const { enabled } = req.body;
    const settings = await schedulerService.updateSettings({ enabled });
    res.json({ enabled: settings.enabled });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to toggle auto-posting";
    res.status(500).json({ detail: message });
  }
});

export default router;
