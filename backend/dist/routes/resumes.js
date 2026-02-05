"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const asyncHandler_1 = require("../middleware/asyncHandler");
const resumeService_1 = require("../services/resumeService");
const router = (0, express_1.Router)();
// GET /api/v1/resumes/templates (public)
router.get("/templates", (_req, res) => {
    const templates = (0, resumeService_1.getTemplates)();
    res.json(templates);
});
// POST /api/v1/resumes
router.post("/", auth_1.authenticateToken, asyncHandler_1.requireAuth, (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { title, fullName } = req.body;
    if (!title || !fullName) {
        res.status(400).json((0, asyncHandler_1.errorResponse)("Title and fullName are required"));
        return;
    }
    const resume = await (0, resumeService_1.createResume)(req.user.id, req.body);
    res.status(201).json(resume);
}));
// GET /api/v1/resumes
router.get("/", auth_1.authenticateToken, asyncHandler_1.requireAuth, (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 20;
    const resumes = await (0, resumeService_1.getResumes)(req.user.id, skip, limit);
    res.json(resumes);
}));
// GET /api/v1/resumes/:id
router.get("/:id", auth_1.authenticateToken, asyncHandler_1.requireAuth, (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const resume = await (0, resumeService_1.getResumeById)(req.params.id, req.user.id);
    if (!resume) {
        res.status(404).json((0, asyncHandler_1.errorResponse)("Resume not found"));
        return;
    }
    res.json(resume);
}));
// PUT /api/v1/resumes/:id
router.put("/:id", auth_1.authenticateToken, asyncHandler_1.requireAuth, (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const resume = await (0, resumeService_1.updateResume)(req.params.id, req.user.id, req.body);
    if (!resume) {
        res.status(404).json((0, asyncHandler_1.errorResponse)("Resume not found"));
        return;
    }
    res.json(resume);
}));
// DELETE /api/v1/resumes/:id
router.delete("/:id", auth_1.authenticateToken, asyncHandler_1.requireAuth, (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const deleted = await (0, resumeService_1.deleteResume)(req.params.id, req.user.id);
    if (!deleted) {
        res.status(404).json((0, asyncHandler_1.errorResponse)("Resume not found"));
        return;
    }
    res.status(204).send();
}));
exports.default = router;
//# sourceMappingURL=resumes.js.map