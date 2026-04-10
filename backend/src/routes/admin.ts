import { Router, Response } from "express";
import { AuthRequest, authenticateToken, requireAdmin } from "../middleware/auth";
import * as adminService from "../services/adminService";
import * as adSettingsService from "../services/adSettingsService";
import * as tawkSettingsService from "../services/tawkSettingsService";
import * as trustpilotSettingsService from "../services/trustpilotSettingsService";
import { getUsageStatus } from "../middleware/subscriptionLimits";
import { PLANS, PlanType } from "../services/stripeService";
import prisma from "../config/database";

const router = Router();

// All admin routes require authentication + admin role
router.use(authenticateToken);
router.use(requireAdmin);

// Dashboard
router.get("/dashboard", async (_req: AuthRequest, res: Response) => {
  try {
    const stats = await adminService.getDashboardStats();
    res.json(stats);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to get dashboard stats";
    res.status(500).json({ detail: message });
  }
});

// User management
router.get("/users", async (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const search = req.query.search as string | undefined;
    const skip = (page - 1) * limit;

    const result = await adminService.getAllUsers(skip, limit, search);
    res.json({
      ...result,
      page,
      limit,
      totalPages: Math.ceil(result.total / limit),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to get users";
    res.status(500).json({ detail: message });
  }
});

router.get("/users/:id", async (req: AuthRequest, res: Response) => {
  try {
    const [user, usageStatus] = await Promise.all([
      adminService.getUserWithResumes(req.params.id),
      getUsageStatus(req.params.id),
    ]);
    if (!user) {
      res.status(404).json({ detail: "User not found" });
      return;
    }
    res.json({ ...user, usageStatus });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to get user";
    res.status(500).json({ detail: message });
  }
});

router.put("/users/:id", async (req: AuthRequest, res: Response) => {
  try {
    const { name, role, subscriptionTier, isSuspended } = req.body;

    // Prevent admin from demoting themselves
    if (req.params.id === req.user?.id && role && role !== "admin") {
      res.status(400).json({ detail: "Cannot demote your own admin account" });
      return;
    }

    const user = await adminService.updateUser(req.params.id, {
      name,
      role,
      subscriptionTier,
      isSuspended,
    });
    res.json(user);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update user";
    res.status(500).json({ detail: message });
  }
});

router.delete("/users/:id", async (req: AuthRequest, res: Response) => {
  try {
    // Prevent admin from deleting themselves
    if (req.params.id === req.user?.id) {
      res.status(400).json({ detail: "Cannot delete your own admin account" });
      return;
    }

    await adminService.deleteUser(req.params.id);
    res.status(204).send();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete user";
    res.status(500).json({ detail: message });
  }
});

// Blog management
router.get("/blog", async (req: AuthRequest, res: Response) => {
  try {
    const skip = parseInt(req.query.skip as string) || 0;
    const limit = parseInt(req.query.limit as string) || 20;

    const result = await adminService.getAllBlogPosts(skip, limit, true);
    res.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to get blog posts";
    res.status(500).json({ detail: message });
  }
});

router.get("/blog/:id", async (req: AuthRequest, res: Response) => {
  try {
    const post = await adminService.getBlogPostById(req.params.id);
    if (!post) {
      res.status(404).json({ detail: "Blog post not found" });
      return;
    }
    res.json(post);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to get blog post";
    res.status(500).json({ detail: message });
  }
});

router.post("/blog", async (req: AuthRequest, res: Response) => {
  try {
    const { slug, title, description, content, image, imageAlt, category, tags, author, featured, published } = req.body;

    if (!slug || !title || !description || !content || !category || !author) {
      res.status(400).json({ detail: "Missing required fields: slug, title, description, content, category, author" });
      return;
    }

    const post = await adminService.createBlogPost({
      slug,
      title,
      description,
      content,
      image,
      imageAlt,
      category,
      tags: tags || [],
      author,
      featured: featured || false,
      published: published || false,
    });
    res.status(201).json(post);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create blog post";
    if (message.includes("Unique constraint")) {
      res.status(400).json({ detail: "A blog post with this slug already exists" });
      return;
    }
    res.status(500).json({ detail: message });
  }
});

router.put("/blog/:id", async (req: AuthRequest, res: Response) => {
  try {
    const post = await adminService.updateBlogPost(req.params.id, req.body);
    res.json(post);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update blog post";
    res.status(500).json({ detail: message });
  }
});

router.delete("/blog/:id", async (req: AuthRequest, res: Response) => {
  try {
    await adminService.deleteBlogPost(req.params.id);
    res.status(204).send();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete blog post";
    res.status(500).json({ detail: message });
  }
});

// Country analytics
router.get("/analytics/countries", async (_req: AuthRequest, res: Response) => {
  try {
    const analytics = await adminService.getCountryAnalytics();
    res.json(analytics);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to get country analytics";
    res.status(500).json({ detail: message });
  }
});

// Payment management
router.get("/payments/stats", async (_req: AuthRequest, res: Response) => {
  try {
    const stats = await adminService.getPaymentStats();
    res.json(stats);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to get payment stats";
    res.status(500).json({ detail: message });
  }
});

router.get("/payments/analytics", async (_req: AuthRequest, res: Response) => {
  try {
    const analytics = await adminService.getPaymentAnalytics();
    res.json(analytics);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to get payment analytics";
    res.status(500).json({ detail: message });
  }
});

router.get("/payments", async (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;

    const result = await adminService.getAllPayments(page, limit);
    res.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to get payments";
    res.status(500).json({ detail: message });
  }
});

// Plan limits management
router.get("/plans", (_req: AuthRequest, res: Response) => {
  const plans: Record<string, { name: string; cvLimit: number; aiLimit: number; downloadLimit: number; coverLetterLimit: number }> = {};
  for (const [key, config] of Object.entries(PLANS)) {
    plans[key] = {
      name: config.name,
      cvLimit: config.cvLimit,
      aiLimit: config.aiLimit,
      downloadLimit: config.downloadLimit,
      coverLetterLimit: config.coverLetterLimit,
    };
  }
  res.json(plans);
});

router.put("/plans/:planType", async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { planType } = req.params;
    const validPlans: PlanType[] = ["starter", "gold", "diamond", "platinum"];

    if (!validPlans.includes(planType as PlanType)) {
      res.status(400).json({ detail: "Invalid plan type" });
      return;
    }

    const { cvLimit, aiLimit, downloadLimit, coverLetterLimit } = req.body;

    // Update in-memory plan limits directly (no DB table)
    const plan = PLANS[planType as PlanType];
    if (plan) {
      if (cvLimit !== undefined) plan.cvLimit = cvLimit;
      if (aiLimit !== undefined) plan.aiLimit = aiLimit;
      if (downloadLimit !== undefined) plan.downloadLimit = downloadLimit;
      if (coverLetterLimit !== undefined) plan.coverLetterLimit = coverLetterLimit;
    }

    res.json({ success: true, plan: PLANS[planType as PlanType] });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update plan";
    res.status(500).json({ detail: message });
  }
});

// Ad settings management
router.get("/ads/settings", async (_req: AuthRequest, res: Response) => {
  try {
    const settings = await adSettingsService.getAdSettings();
    res.json(settings);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to get ad settings";
    res.status(500).json({ detail: message });
  }
});

router.post("/ads/settings", async (req: AuthRequest, res: Response) => {
  try {
    const settings = await adSettingsService.saveAdSettings(req.body);
    res.json(settings);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to save ad settings";
    res.status(500).json({ detail: message });
  }
});

// Tawk.to live chat settings
router.get("/tawk/settings", async (_req: AuthRequest, res: Response) => {
  try {
    const settings = await tawkSettingsService.getTawkSettings();
    res.json(settings);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to get tawk settings";
    res.status(500).json({ detail: message });
  }
});

router.post("/tawk/settings", async (req: AuthRequest, res: Response) => {
  try {
    const settings = await tawkSettingsService.saveTawkSettings(req.body);
    res.json(settings);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to save tawk settings";
    res.status(500).json({ detail: message });
  }
});

// Trustpilot widget settings
router.get("/trustpilot/settings", async (_req: AuthRequest, res: Response) => {
  try {
    const settings = await trustpilotSettingsService.getTrustpilotSettings();
    res.json(settings);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to get trustpilot settings";
    res.status(500).json({ detail: message });
  }
});

router.post("/trustpilot/settings", async (req: AuthRequest, res: Response) => {
  try {
    const settings = await trustpilotSettingsService.saveTrustpilotSettings(req.body);
    res.json(settings);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to save trustpilot settings";
    res.status(500).json({ detail: message });
  }
});

// Template feedback management
router.get("/template-feedback", async (req: AuthRequest, res: Response) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit as string) || 20));
    const status = req.query.status as string;
    const templateId = req.query.templateId as string;
    const skip = (page - 1) * limit;

    const where: Record<string, string> = {};
    if (status && ["pending", "reviewed", "resolved"].includes(status)) {
      where.status = status;
    }
    if (templateId) {
      where.templateId = templateId;
    }

    const [feedback, total] = await Promise.all([
      prisma.templateFeedback.findMany({
        where,
        select: {
          id: true,
          templateId: true,
          type: true,
          message: true,
          status: true,
          adminNote: true,
          createdAt: true,
          user: { select: { id: true, name: true, email: true } },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.templateFeedback.count({ where }),
    ]);

    res.json({ feedback, total, page, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to get feedback";
    res.status(500).json({ detail: message });
  }
});

router.patch("/template-feedback/:id", async (req: AuthRequest, res: Response) => {
  try {
    const { status, adminNote } = req.body;
    const updateData: Record<string, string> = {};

    if (status && ["pending", "reviewed", "resolved"].includes(status)) {
      updateData.status = status;
    }
    if (adminNote !== undefined) {
      updateData.adminNote = adminNote;
    }

    const updated = await prisma.templateFeedback.update({
      where: { id: req.params.id },
      data: updateData,
      select: { id: true, status: true, adminNote: true, updatedAt: true },
    });

    res.json(updated);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update feedback";
    res.status(500).json({ detail: message });
  }
});

router.delete("/template-feedback/:id", async (req: AuthRequest, res: Response) => {
  try {
    await prisma.templateFeedback.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: "Feedback deleted" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete feedback";
    res.status(500).json({ detail: message });
  }
});

export default router;
