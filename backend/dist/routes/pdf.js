"use strict";
/**
 * PDF Export Routes
 * Endpoints for generating PDF resumes
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const subscriptionLimits_1 = require("../middleware/subscriptionLimits");
const rateLimiter_1 = require("../middleware/rateLimiter");
const pdfGeneratorService_1 = require("../services/pdfGeneratorService");
const router = (0, express_1.Router)();
/**
 * POST /api/v1/pdf/generate
 * Generate a PDF from resume data
 *
 * Request body: {
 *   data: PdfResumeData,
 *   templateId: string,
 *   theme: PdfTheme
 * }
 *
 * Response: PDF file (application/pdf)
 */
router.post('/generate', rateLimiter_1.pdfLimiter, rateLimiter_1.pdfHourlyLimiter, auth_1.authenticateToken, subscriptionLimits_1.checkDownloadLimit, async (req, res) => {
    try {
        const request = req.body;
        console.log(`[PDF] Generate request for template: ${request.templateId}, locale: ${request.locale || 'en'}`);
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
        // Generate PDF
        const pdfBuffer = await (0, pdfGeneratorService_1.processPdfRequest)(request);
        // Increment download count (auth is required, so user always exists)
        await (0, subscriptionLimits_1.incrementDownloadCount)(req.user.id);
        // Generate filename from name
        const sanitizedName = (request.data.personalInfo?.fullName || 'resume')
            .replace(/[^a-zA-Z0-9]/g, '_')
            .toLowerCase();
        const filename = `${sanitizedName}_resume.pdf`;
        // Send PDF response
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.setHeader('Content-Length', pdfBuffer.length);
        res.send(pdfBuffer);
    }
    catch (error) {
        console.error('PDF generation error:', error);
        const message = error instanceof Error ? error.message : 'Unknown error';
        const status = message.includes('queue timeout') ? 503 : 500;
        res.status(status).json({
            error: status === 503 ? 'Server busy' : 'Failed to generate PDF',
            message,
            retryAfter: status === 503 ? 5 : undefined,
        });
    }
});
/**
 * POST /api/v1/pdf/preview
 * Generate a PDF and return as base64 for preview
 *
 * Request body: same as /generate
 * Response: { pdf: string (base64) }
 */
router.post('/preview', rateLimiter_1.pdfLimiter, rateLimiter_1.pdfHourlyLimiter, async (req, res) => {
    try {
        const request = req.body;
        // Validate required fields
        if (!request.data || !request.templateId || !request.theme) {
            res.status(400).json({ error: 'Missing required fields: data, templateId, theme' });
            return;
        }
        // Generate PDF
        const pdfBuffer = await (0, pdfGeneratorService_1.processPdfRequest)(request);
        // Return as base64
        res.json({
            pdf: pdfBuffer.toString('base64'),
            size: pdfBuffer.length,
        });
    }
    catch (error) {
        console.error('PDF preview error:', error);
        const message = error instanceof Error ? error.message : 'Unknown error';
        const status = message.includes('queue timeout') ? 503 : 500;
        res.status(status).json({
            error: status === 503 ? 'Server busy' : 'Failed to generate PDF preview',
            message,
            retryAfter: status === 503 ? 5 : undefined,
        });
    }
});
exports.default = router;
//# sourceMappingURL=pdf.js.map