import { Router, Request, Response } from "express";
import prisma from "../config/database";

const router = Router();

// Get all published blog posts (public)
router.get("/", async (req: Request, res: Response) => {
  try {
    const skip = parseInt(req.query.skip as string) || 0;
    const limit = parseInt(req.query.limit as string) || 20;
    const category = req.query.category as string | undefined;
    const tag = req.query.tag as string | undefined;
    const featured = req.query.featured === "true";

    const where: Record<string, unknown> = { published: true };

    if (category) {
      where.category = { equals: category, mode: "insensitive" };
    }

    if (featured) {
      where.featured = true;
    }

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        orderBy: { publishedAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.blogPost.count({ where }),
    ]);

    // Filter by tag if provided (since tags is JSON string)
    let filteredPosts = posts.map(post => ({
      ...post,
      tags: JSON.parse(post.tags || "[]"),
    }));

    if (tag) {
      filteredPosts = filteredPosts.filter(post =>
        post.tags.some((t: string) => t.toLowerCase() === tag.toLowerCase())
      );
    }

    res.set("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
    res.json({
      posts: filteredPosts,
      total: tag ? filteredPosts.length : total,
      pages: Math.ceil((tag ? filteredPosts.length : total) / limit),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to get blog posts";
    res.status(500).json({ detail: message });
  }
});

// Get single published blog post by slug (public)
router.get("/:slug", async (req: Request, res: Response) => {
  try {
    const post = await prisma.blogPost.findFirst({
      where: {
        slug: req.params.slug,
        published: true,
      },
    });

    if (!post) {
      res.status(404).json({ detail: "Blog post not found" });
      return;
    }

    res.json({
      ...post,
      tags: JSON.parse(post.tags || "[]"),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to get blog post";
    res.status(500).json({ detail: message });
  }
});

// Get all categories (public)
router.get("/meta/categories", async (_req: Request, res: Response) => {
  try {
    const categories = await prisma.blogPost.findMany({
      where: { published: true },
      select: { category: true },
      distinct: ["category"],
    });

    res.json(categories.map(c => c.category));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to get categories";
    res.status(500).json({ detail: message });
  }
});

export default router;
