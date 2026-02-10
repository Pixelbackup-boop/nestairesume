"use strict";
/**
 * DOCX Export Routes
 * Endpoints for generating DOCX resumes
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const subscriptionLimits_1 = require("../middleware/subscriptionLimits");
const docxGeneratorService_1 = require("../services/docxGeneratorService");
const router = (0, express_1.Router)();
/**
 * POST /api/v1/docx/generate
 * Generate a DOCX from resume data
 *
 * Request body: {
 *   data: PdfResumeData,
 *   templateId: string,
 *   theme: PdfTheme
 * }
 *
 * Response: DOCX file
 */
router.post('/generate', auth_1.authenticateToken, subscriptionLimits_1.checkDownloadLimit, async (req, res) => {
    try {
        const request = req.body;
        // Validate required fields
        if (!request.data) {
            res.status(400).json({ error: 'Missing resume data' });
            return;
        }
        if (!request.templateId) {
            res.status(400).json({ error: 'Missing templateId' });
            return;
        }
        if (!request.theme) {
            res.status(400).json({ error: 'Missing theme' });
            return;
        }
        // Generate DOCX
        const docxBuffer = await (0, docxGeneratorService_1.processDocxRequest)(request);
        // Increment download count (auth is required, so user always exists)
        await (0, subscriptionLimits_1.incrementDownloadCount)(req.user.id);
        // Generate filename from name
        const sanitizedName = (request.data.personalInfo?.fullName || 'resume')
            .replace(/[^a-zA-Z0-9]/g, '_')
            .toLowerCase();
        const filename = `${sanitizedName}_resume.docx`;
        // Send DOCX response
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.setHeader('Content-Length', docxBuffer.length);
        res.send(docxBuffer);
    }
    catch (error) {
        console.error('DOCX generation error:', error);
        res.status(500).json({
            error: 'Failed to generate DOCX',
            message: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
exports.default = router;
//# sourceMappingURL=docx.js.map