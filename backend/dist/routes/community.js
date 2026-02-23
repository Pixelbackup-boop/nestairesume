"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const asyncHandler_1 = require("../middleware/asyncHandler");
const database_1 = __importDefault(require("../config/database"));
const router = (0, express_1.Router)();
// Valid categories for community templates
const VALID_CATEGORIES = ["creative", "professional", "ats", "bold"];
/**
 * GET /api/v1/community
 * List public community templates (paginated)
 * Optional auth - works for anonymous users too
 */
router.get("/", auth_1.optionalAuth, (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 12));
    const category = req.query.category;
    const skip = (page - 1) * limit;
    // Build where clause
    const where = { isPublic: true };
    if (category && VALID_CATEGORIES.includes(category)) {
        where.category = category;
    }
    // Fetch templates and count in parallel
    const [templates, total] = await Promise.all([
        database_1.default.communityTemplate.findMany({
            where,
            select: {
                id: true,
                name: true,
                description: true,
                category: true,
                thumbnail: true,
                downloads: true,
                createdAt: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                    },
                },
                _count: { select: { comments: true } },
            },
            orderBy: { createdAt: "desc" },
            skip,
            take: limit,
        }),
        database_1.default.communityTemplate.count({ where }),
    ]);
    res.json({
        templates,
        total,
        page,
        totalPages: Math.ceil(total / limit),
    });
}));
/**
 * GET /api/v1/community/my
 * List current user's community templates
 * Requires authentication
 */
router.get("/my", auth_1.authenticateToken, asyncHandler_1.requireAuth, (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const templates = await database_1.default.communityTemplate.findMany({
        where: { userId: req.user.id },
        select: {
            id: true,
            name: true,
            description: true,
            category: true,
            thumbnail: true,
            downloads: true,
            isPublic: true,
            createdAt: true,
            updatedAt: true,
        },
        orderBy: { createdAt: "desc" },
    });
    res.json(templates);
}));
/**
 * GET /api/v1/community/:id
 * Get a single community template by ID
 * Optional auth - public templates available to all
 */
router.get("/:id", auth_1.optionalAuth, (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const template = await database_1.default.communityTemplate.findUnique({
        where: { id: req.params.id },
        select: {
            id: true,
            name: true,
            description: true,
            category: true,
            designData: true,
            thumbnail: true,
            downloads: true,
            isPublic: true,
            createdAt: true,
            userId: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                },
            },
        },
    });
    if (!template) {
        res.status(404).json((0, asyncHandler_1.errorResponse)("Template not found"));
        return;
    }
    // Check access - public templates or owned by user
    const isOwner = req.user?.id === template.userId;
    if (!template.isPublic && !isOwner) {
        res.status(403).json((0, asyncHandler_1.errorResponse)("Access denied"));
        return;
    }
    res.json(template);
}));
/**
 * POST /api/v1/community
 * Create a new community template
 * Requires authentication
 */
router.post("/", auth_1.authenticateToken, asyncHandler_1.requireAuth, (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { name, description, category, designData, thumbnail } = req.body;
    // Validation
    if (!name || typeof name !== "string" || name.trim().length < 1) {
        res.status(400).json((0, asyncHandler_1.errorResponse)("Name is required"));
        return;
    }
    if (!designData || typeof designData !== "string") {
        res.status(400).json((0, asyncHandler_1.errorResponse)("Design data is required"));
        return;
    }
    // Validate JSON
    try {
        JSON.parse(designData);
    }
    catch {
        res.status(400).json((0, asyncHandler_1.errorResponse)("Invalid design data format"));
        return;
    }
    const validCategory = category && VALID_CATEGORIES.includes(category) ? category : "professional";
    const template = await database_1.default.communityTemplate.create({
        data: {
            userId: req.user.id,
            name: name.trim(),
            description: description?.trim() || null,
            category: validCategory,
            designData,
            thumbnail: thumbnail || null,
            isPublic: true,
        },
        select: {
            id: true,
            name: true,
            description: true,
            category: true,
            thumbnail: true,
            createdAt: true,
            user: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });
    res.status(201).json(template);
}));
/**
 * DELETE /api/v1/community/:id
 * Delete a community template (owner only)
 * Requires authentication
 */
router.delete("/:id", auth_1.authenticateToken, asyncHandler_1.requireAuth, (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    // Check ownership
    const template = await database_1.default.communityTemplate.findUnique({
        where: { id: req.params.id },
        select: { userId: true },
    });
    if (!template) {
        res.status(404).json((0, asyncHandler_1.errorResponse)("Template not found"));
        return;
    }
    if (template.userId !== req.user.id) {
        res.status(403).json((0, asyncHandler_1.errorResponse)("Not authorized to delete this template"));
        return;
    }
    await database_1.default.communityTemplate.delete({
        where: { id: req.params.id },
    });
    res.json({ success: true, message: "Template deleted" });
}));
/**
 * POST /api/v1/community/:id/use
 * Increment download count when a user uses a template
 * Optional auth - works for anonymous users too
 */
router.post("/:id/use", auth_1.optionalAuth, (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const template = await database_1.default.communityTemplate.findUnique({
        where: { id: req.params.id },
        select: { id: true, isPublic: true },
    });
    if (!template) {
        res.status(404).json((0, asyncHandler_1.errorResponse)("Template not found"));
        return;
    }
    if (!template.isPublic) {
        res.status(403).json((0, asyncHandler_1.errorResponse)("Template is not public"));
        return;
    }
    // Increment download count
    await database_1.default.communityTemplate.update({
        where: { id: req.params.id },
        data: { downloads: { increment: 1 } },
    });
    res.json({ success: true });
}));
/**
 * PATCH /api/v1/community/:id/visibility
 * Toggle template visibility (public/private)
 * Requires authentication (owner only)
 */
router.patch("/:id/visibility", auth_1.authenticateToken, asyncHandler_1.requireAuth, (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { isPublic } = req.body;
    if (typeof isPublic !== "boolean") {
        res.status(400).json((0, asyncHandler_1.errorResponse)("isPublic must be a boolean"));
        return;
    }
    // Check ownership
    const template = await database_1.default.communityTemplate.findUnique({
        where: { id: req.params.id },
        select: { userId: true },
    });
    if (!template) {
        res.status(404).json((0, asyncHandler_1.errorResponse)("Template not found"));
        return;
    }
    if (template.userId !== req.user.id) {
        res.status(403).json((0, asyncHandler_1.errorResponse)("Not authorized to modify this template"));
        return;
    }
    const updated = await database_1.default.communityTemplate.update({
        where: { id: req.params.id },
        data: { isPublic },
        select: {
            id: true,
            isPublic: true,
        },
    });
    res.json(updated);
}));
// ============ COMMENTS ============
const COMMENT_SELECT = {
    id: true,
    content: true,
    createdAt: true,
    updatedAt: true,
    userId: true,
    user: { select: { id: true, name: true, image: true } },
};
/**
 * GET /api/v1/community/:id/comments
 * List comments for a template (paginated, newest first)
 */
router.get("/:id/comments", auth_1.optionalAuth, (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 20));
    const skip = (page - 1) * limit;
    const template = await database_1.default.communityTemplate.findUnique({
        where: { id: req.params.id },
        select: { id: true, isPublic: true, userId: true },
    });
    if (!template) {
        res.status(404).json((0, asyncHandler_1.errorResponse)("Template not found"));
        return;
    }
    const isOwner = req.user?.id === template.userId;
    if (!template.isPublic && !isOwner) {
        res.status(403).json((0, asyncHandler_1.errorResponse)("Access denied"));
        return;
    }
    const [comments, total] = await Promise.all([
        database_1.default.templateComment.findMany({
            where: { templateId: req.params.id },
            select: COMMENT_SELECT,
            orderBy: { createdAt: "desc" },
            skip,
            take: limit,
        }),
        database_1.default.templateComment.count({ where: { templateId: req.params.id } }),
    ]);
    res.json({ comments, total, page, totalPages: Math.ceil(total / limit) });
}));
/**
 * POST /api/v1/community/:id/comments
 * Create a comment on a template
 */
router.post("/:id/comments", auth_1.authenticateToken, asyncHandler_1.requireAuth, (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { content } = req.body;
    if (!content || typeof content !== "string" || content.trim().length < 1) {
        res.status(400).json((0, asyncHandler_1.errorResponse)("Comment content is required"));
        return;
    }
    if (content.trim().length > 2000) {
        res.status(400).json((0, asyncHandler_1.errorResponse)("Comment must be under 2000 characters"));
        return;
    }
    const template = await database_1.default.communityTemplate.findUnique({
        where: { id: req.params.id },
        select: { id: true, isPublic: true },
    });
    if (!template) {
        res.status(404).json((0, asyncHandler_1.errorResponse)("Template not found"));
        return;
    }
    if (!template.isPublic) {
        res.status(403).json((0, asyncHandler_1.errorResponse)("Cannot comment on private templates"));
        return;
    }
    const comment = await database_1.default.templateComment.create({
        data: {
            templateId: req.params.id,
            userId: req.user.id,
            content: content.trim(),
        },
        select: COMMENT_SELECT,
    });
    res.status(201).json(comment);
}));
/**
 * PATCH /api/v1/community/:id/comments/:commentId
 * Edit a comment (owner only)
 */
router.patch("/:id/comments/:commentId", auth_1.authenticateToken, asyncHandler_1.requireAuth, (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { content } = req.body;
    if (!content || typeof content !== "string" || content.trim().length < 1) {
        res.status(400).json((0, asyncHandler_1.errorResponse)("Comment content is required"));
        return;
    }
    if (content.trim().length > 2000) {
        res.status(400).json((0, asyncHandler_1.errorResponse)("Comment must be under 2000 characters"));
        return;
    }
    const comment = await database_1.default.templateComment.findUnique({
        where: { id: req.params.commentId },
        select: { userId: true, templateId: true },
    });
    if (!comment) {
        res.status(404).json((0, asyncHandler_1.errorResponse)("Comment not found"));
        return;
    }
    if (comment.templateId !== req.params.id) {
        res.status(400).json((0, asyncHandler_1.errorResponse)("Comment does not belong to this template"));
        return;
    }
    if (comment.userId !== req.user.id) {
        res.status(403).json((0, asyncHandler_1.errorResponse)("Not authorized to edit this comment"));
        return;
    }
    const updated = await database_1.default.templateComment.update({
        where: { id: req.params.commentId },
        data: { content: content.trim() },
        select: COMMENT_SELECT,
    });
    res.json(updated);
}));
/**
 * DELETE /api/v1/community/:id/comments/:commentId
 * Delete a comment (owner or admin)
 */
router.delete("/:id/comments/:commentId", auth_1.authenticateToken, asyncHandler_1.requireAuth, (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const comment = await database_1.default.templateComment.findUnique({
        where: { id: req.params.commentId },
        select: { userId: true, templateId: true },
    });
    if (!comment) {
        res.status(404).json((0, asyncHandler_1.errorResponse)("Comment not found"));
        return;
    }
    if (comment.templateId !== req.params.id) {
        res.status(400).json((0, asyncHandler_1.errorResponse)("Comment does not belong to this template"));
        return;
    }
    const isCommentOwner = comment.userId === req.user.id;
    const isAdmin = req.user.role === "admin";
    if (!isCommentOwner && !isAdmin) {
        res.status(403).json((0, asyncHandler_1.errorResponse)("Not authorized to delete this comment"));
        return;
    }
    await database_1.default.templateComment.delete({ where: { id: req.params.commentId } });
    res.json({ success: true, message: "Comment deleted" });
}));
exports.default = router;
//# sourceMappingURL=community.js.map