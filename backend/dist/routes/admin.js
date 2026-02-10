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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const adminService = __importStar(require("../services/adminService"));
const adSettingsService = __importStar(require("../services/adSettingsService"));
const tawkSettingsService = __importStar(require("../services/tawkSettingsService"));
const subscriptionLimits_1 = require("../middleware/subscriptionLimits");
const stripeService_1 = require("../services/stripeService");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
// All admin routes require authentication + admin role
router.use(auth_1.authenticateToken);
router.use(auth_1.requireAdmin);
// Dashboard
router.get("/dashboard", async (_req, res) => {
    try {
        const stats = await adminService.getDashboardStats();
        res.json(stats);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to get dashboard stats";
        res.status(500).json({ detail: message });
    }
});
// User management
router.get("/users", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const search = req.query.search;
        const skip = (page - 1) * limit;
        const result = await adminService.getAllUsers(skip, limit, search);
        res.json({
            ...result,
            page,
            limit,
            totalPages: Math.ceil(result.total / limit),
        });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to get users";
        res.status(500).json({ detail: message });
    }
});
router.get("/users/:id", async (req, res) => {
    try {
        const [user, usageStatus] = await Promise.all([
            adminService.getUserWithResumes(req.params.id),
            (0, subscriptionLimits_1.getUsageStatus)(req.params.id),
        ]);
        if (!user) {
            res.status(404).json({ detail: "User not found" });
            return;
        }
        res.json({ ...user, usageStatus });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to get user";
        res.status(500).json({ detail: message });
    }
});
router.put("/users/:id", async (req, res) => {
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
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to update user";
        res.status(500).json({ detail: message });
    }
});
router.delete("/users/:id", async (req, res) => {
    try {
        // Prevent admin from deleting themselves
        if (req.params.id === req.user?.id) {
            res.status(400).json({ detail: "Cannot delete your own admin account" });
            return;
        }
        await adminService.deleteUser(req.params.id);
        res.status(204).send();
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to delete user";
        res.status(500).json({ detail: message });
    }
});
// Blog management
router.get("/blog", async (req, res) => {
    try {
        const skip = parseInt(req.query.skip) || 0;
        const limit = parseInt(req.query.limit) || 20;
        const result = await adminService.getAllBlogPosts(skip, limit, true);
        res.json(result);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to get blog posts";
        res.status(500).json({ detail: message });
    }
});
router.get("/blog/:id", async (req, res) => {
    try {
        const post = await adminService.getBlogPostById(req.params.id);
        if (!post) {
            res.status(404).json({ detail: "Blog post not found" });
            return;
        }
        res.json(post);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to get blog post";
        res.status(500).json({ detail: message });
    }
});
router.post("/blog", async (req, res) => {
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
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to create blog post";
        if (message.includes("Unique constraint")) {
            res.status(400).json({ detail: "A blog post with this slug already exists" });
            return;
        }
        res.status(500).json({ detail: message });
    }
});
router.put("/blog/:id", async (req, res) => {
    try {
        const post = await adminService.updateBlogPost(req.params.id, req.body);
        res.json(post);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to update blog post";
        res.status(500).json({ detail: message });
    }
});
router.delete("/blog/:id", async (req, res) => {
    try {
        await adminService.deleteBlogPost(req.params.id);
        res.status(204).send();
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to delete blog post";
        res.status(500).json({ detail: message });
    }
});
// Payment management
router.get("/payments/stats", async (_req, res) => {
    try {
        const stats = await adminService.getPaymentStats();
        res.json(stats);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to get payment stats";
        res.status(500).json({ detail: message });
    }
});
router.get("/payments/analytics", async (_req, res) => {
    try {
        const analytics = await adminService.getPaymentAnalytics();
        res.json(analytics);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to get payment analytics";
        res.status(500).json({ detail: message });
    }
});
router.get("/payments", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const result = await adminService.getAllPayments(page, limit);
        res.json(result);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to get payments";
        res.status(500).json({ detail: message });
    }
});
// Plan limits management
router.get("/plans", (_req, res) => {
    const plans = {};
    for (const [key, config] of Object.entries(stripeService_1.PLANS)) {
        plans[key] = {
            name: config.name,
            cvLimit: config.cvLimit,
            aiLimit: config.aiLimit,
            downloadLimit: config.downloadLimit,
            coverLetterLimit: config.coverLetterLimit,
            trialDailyLimit: config.trialDailyLimit,
        };
    }
    res.json(plans);
});
router.put("/plans/:planType", async (req, res) => {
    try {
        const { planType } = req.params;
        const validPlans = ["starter", "gold", "diamond", "platinum"];
        if (!validPlans.includes(planType)) {
            res.status(400).json({ detail: "Invalid plan type" });
            return;
        }
        const { cvLimit, aiLimit, downloadLimit, coverLetterLimit, trialDailyLimit } = req.body;
        await prisma.planConfig.upsert({
            where: { planType },
            update: { cvLimit, aiLimit, downloadLimit, coverLetterLimit, trialDailyLimit },
            create: { planType, cvLimit, aiLimit, downloadLimit, coverLetterLimit, trialDailyLimit },
        });
        await (0, stripeService_1.reloadPlansFromDb)();
        res.json({ success: true, plan: stripeService_1.PLANS[planType] });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to update plan";
        res.status(500).json({ detail: message });
    }
});
// Ad settings management
router.get("/ads/settings", async (_req, res) => {
    try {
        const settings = await adSettingsService.getAdSettings();
        res.json(settings);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to get ad settings";
        res.status(500).json({ detail: message });
    }
});
router.post("/ads/settings", async (req, res) => {
    try {
        const settings = await adSettingsService.saveAdSettings(req.body);
        res.json(settings);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to save ad settings";
        res.status(500).json({ detail: message });
    }
});
// Tawk.to live chat settings
router.get("/tawk/settings", async (_req, res) => {
    try {
        const settings = await tawkSettingsService.getTawkSettings();
        res.json(settings);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to get tawk settings";
        res.status(500).json({ detail: message });
    }
});
router.post("/tawk/settings", async (req, res) => {
    try {
        const settings = await tawkSettingsService.saveTawkSettings(req.body);
        res.json(settings);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to save tawk settings";
        res.status(500).json({ detail: message });
    }
});
exports.default = router;
//# sourceMappingURL=admin.js.map