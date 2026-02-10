"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = __importDefault(require("../config/database"));
const router = (0, express_1.Router)();
// Get all published blog posts (public)
router.get("/", async (req, res) => {
    try {
        const skip = parseInt(req.query.skip) || 0;
        const limit = parseInt(req.query.limit) || 20;
        const category = req.query.category;
        const tag = req.query.tag;
        const featured = req.query.featured === "true";
        const where = { published: true };
        if (category) {
            where.category = { equals: category, mode: "insensitive" };
        }
        if (featured) {
            where.featured = true;
        }
        const [posts, total] = await Promise.all([
            database_1.default.blogPost.findMany({
                where,
                orderBy: { publishedAt: "desc" },
                skip,
                take: limit,
            }),
            database_1.default.blogPost.count({ where }),
        ]);
        // Filter by tag if provided (since tags is JSON string)
        let filteredPosts = posts.map(post => ({
            ...post,
            tags: JSON.parse(post.tags || "[]"),
        }));
        if (tag) {
            filteredPosts = filteredPosts.filter(post => post.tags.some((t) => t.toLowerCase() === tag.toLowerCase()));
        }
        res.set("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
        res.json({
            posts: filteredPosts,
            total: tag ? filteredPosts.length : total,
            pages: Math.ceil((tag ? filteredPosts.length : total) / limit),
        });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to get blog posts";
        res.status(500).json({ detail: message });
    }
});
// Get single published blog post by slug (public)
router.get("/:slug", async (req, res) => {
    try {
        const post = await database_1.default.blogPost.findFirst({
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
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to get blog post";
        res.status(500).json({ detail: message });
    }
});
// Get all categories (public)
router.get("/meta/categories", async (_req, res) => {
    try {
        const categories = await database_1.default.blogPost.findMany({
            where: { published: true },
            select: { category: true },
            distinct: ["category"],
        });
        res.json(categories.map(c => c.category));
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to get categories";
        res.status(500).json({ detail: message });
    }
});
exports.default = router;
//# sourceMappingURL=blog.js.map