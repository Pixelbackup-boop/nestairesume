import { Router, Response } from "express";
import { AuthRequest, authenticateToken, requireAdmin } from "../middleware/auth";
import * as adminService from "../services/adminService";

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
    const skip = parseInt(req.query.skip as string) || 0;
    const limit = parseInt(req.query.limit as string) || 20;
    const search = req.query.search as string | undefined;

    const result = await adminService.getAllUsers(skip, limit, search);
    res.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to get users";
    res.status(500).json({ detail: message });
  }
});

router.get("/users/:id", async (req: AuthRequest, res: Response) => {
  try {
    const user = await adminService.getUserWithResumes(req.params.id);
    if (!user) {
      res.status(404).json({ detail: "User not found" });
      return;
    }
    res.json(user);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to get user";
    res.status(500).json({ detail: message });
  }
});

router.put("/users/:id", async (req: AuthRequest, res: Response) => {
  try {
    const { name, role, subscriptionTier, creditsRemaining, isSuspended } = req.body;

    // Prevent admin from demoting themselves
    if (req.params.id === req.user?.id && role && role !== "admin") {
      res.status(400).json({ detail: "Cannot demote your own admin account" });
      return;
    }

    const user = await adminService.updateUser(req.params.id, {
      name,
      role,
      subscriptionTier,
      creditsRemaining,
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

export default router;
