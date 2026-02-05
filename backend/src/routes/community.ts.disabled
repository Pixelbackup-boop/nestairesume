import { Router, Response } from "express";
import { authenticateToken, optionalAuthenticate, AuthRequest } from "../middleware/auth";
import { asyncHandler, requireAuth, errorResponse } from "../middleware/asyncHandler";
import prisma from "../config/database";

const router = Router();

// Valid categories for community templates
const VALID_CATEGORIES = ["creative", "professional", "ats", "bold"];

/**
 * GET /api/v1/community
 * List public community templates (paginated)
 * Optional auth - works for anonymous users too
 */
router.get(
  "/",
  optionalAuthenticate,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit as string) || 12));
    const category = req.query.category as string;
    const skip = (page - 1) * limit;

    // Build where clause
    const where: { isPublic: boolean; category?: string } = { isPublic: true };
    if (category && VALID_CATEGORIES.includes(category)) {
      where.category = category;
    }

    // Fetch templates and count in parallel
    const [templates, total] = await Promise.all([
      prisma.communityTemplate.findMany({
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
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.communityTemplate.count({ where }),
    ]);

    res.json({
      templates,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  })
);

/**
 * GET /api/v1/community/my
 * List current user's community templates
 * Requires authentication
 */
router.get(
  "/my",
  authenticateToken,
  requireAuth,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const templates = await prisma.communityTemplate.findMany({
      where: { userId: req.user!.id },
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
  })
);

/**
 * GET /api/v1/community/:id
 * Get a single community template by ID
 * Optional auth - public templates available to all
 */
router.get(
  "/:id",
  optionalAuthenticate,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const template = await prisma.communityTemplate.findUnique({
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
      res.status(404).json(errorResponse("Template not found"));
      return;
    }

    // Check access - public templates or owned by user
    const isOwner = req.user?.id === template.userId;
    if (!template.isPublic && !isOwner) {
      res.status(403).json(errorResponse("Access denied"));
      return;
    }

    res.json(template);
  })
);

/**
 * POST /api/v1/community
 * Create a new community template
 * Requires authentication
 */
router.post(
  "/",
  authenticateToken,
  requireAuth,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { name, description, category, designData, thumbnail } = req.body;

    // Validation
    if (!name || typeof name !== "string" || name.trim().length < 1) {
      res.status(400).json(errorResponse("Name is required"));
      return;
    }

    if (!designData || typeof designData !== "string") {
      res.status(400).json(errorResponse("Design data is required"));
      return;
    }

    // Validate JSON
    try {
      JSON.parse(designData);
    } catch {
      res.status(400).json(errorResponse("Invalid design data format"));
      return;
    }

    const validCategory = category && VALID_CATEGORIES.includes(category) ? category : "professional";

    const template = await prisma.communityTemplate.create({
      data: {
        userId: req.user!.id,
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
  })
);

/**
 * DELETE /api/v1/community/:id
 * Delete a community template (owner only)
 * Requires authentication
 */
router.delete(
  "/:id",
  authenticateToken,
  requireAuth,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    // Check ownership
    const template = await prisma.communityTemplate.findUnique({
      where: { id: req.params.id },
      select: { userId: true },
    });

    if (!template) {
      res.status(404).json(errorResponse("Template not found"));
      return;
    }

    if (template.userId !== req.user!.id) {
      res.status(403).json(errorResponse("Not authorized to delete this template"));
      return;
    }

    await prisma.communityTemplate.delete({
      where: { id: req.params.id },
    });

    res.json({ success: true, message: "Template deleted" });
  })
);

/**
 * POST /api/v1/community/:id/use
 * Increment download count when a user uses a template
 * Optional auth - works for anonymous users too
 */
router.post(
  "/:id/use",
  optionalAuthenticate,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const template = await prisma.communityTemplate.findUnique({
      where: { id: req.params.id },
      select: { id: true, isPublic: true },
    });

    if (!template) {
      res.status(404).json(errorResponse("Template not found"));
      return;
    }

    if (!template.isPublic) {
      res.status(403).json(errorResponse("Template is not public"));
      return;
    }

    // Increment download count
    await prisma.communityTemplate.update({
      where: { id: req.params.id },
      data: { downloads: { increment: 1 } },
    });

    res.json({ success: true });
  })
);

/**
 * PATCH /api/v1/community/:id/visibility
 * Toggle template visibility (public/private)
 * Requires authentication (owner only)
 */
router.patch(
  "/:id/visibility",
  authenticateToken,
  requireAuth,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { isPublic } = req.body;

    if (typeof isPublic !== "boolean") {
      res.status(400).json(errorResponse("isPublic must be a boolean"));
      return;
    }

    // Check ownership
    const template = await prisma.communityTemplate.findUnique({
      where: { id: req.params.id },
      select: { userId: true },
    });

    if (!template) {
      res.status(404).json(errorResponse("Template not found"));
      return;
    }

    if (template.userId !== req.user!.id) {
      res.status(403).json(errorResponse("Not authorized to modify this template"));
      return;
    }

    const updated = await prisma.communityTemplate.update({
      where: { id: req.params.id },
      data: { isPublic },
      select: {
        id: true,
        isPublic: true,
      },
    });

    res.json(updated);
  })
);

export default router;
