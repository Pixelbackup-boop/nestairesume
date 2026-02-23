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
const VALID_TYPES = ["feedback", "bug", "suggestion"];
/**
 * POST /api/v1/template-feedback
 * Submit feedback for a specific template (authenticated users only)
 */
router.post("/", auth_1.authenticateToken, asyncHandler_1.requireAuth, (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { templateId, type, message } = req.body;
    if (!templateId || typeof templateId !== "string" || templateId.trim().length < 1) {
        res.status(400).json((0, asyncHandler_1.errorResponse)("Template ID is required"));
        return;
    }
    const feedbackType = type && VALID_TYPES.includes(type) ? type : "feedback";
    if (!message || typeof message !== "string" || message.trim().length < 5) {
        res.status(400).json((0, asyncHandler_1.errorResponse)("Message must be at least 5 characters"));
        return;
    }
    if (message.trim().length > 2000) {
        res.status(400).json((0, asyncHandler_1.errorResponse)("Message must be under 2000 characters"));
        return;
    }
    const feedback = await database_1.default.templateFeedback.create({
        data: {
            userId: req.user.id,
            templateId: templateId.trim(),
            type: feedbackType,
            message: message.trim(),
        },
        select: {
            id: true,
            templateId: true,
            type: true,
            message: true,
            createdAt: true,
        },
    });
    res.status(201).json({ success: true, feedback });
}));
exports.default = router;
//# sourceMappingURL=templateFeedback.js.map