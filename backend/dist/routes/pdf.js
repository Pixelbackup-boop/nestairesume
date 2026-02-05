"use strict";
/**
 * PDF Export Routes
 * Endpoints for generating PDF resumes
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
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
router.post('/generate', async (req, res) => {
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
        // Generate PDF
        const pdfBuffer = await (0, pdfGeneratorService_1.processPdfRequest)(request);
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
        res.status(500).json({
            error: 'Failed to generate PDF',
            message: error instanceof Error ? error.message : 'Unknown error',
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
router.post('/preview', async (req, res) => {
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
        res.status(500).json({
            error: 'Failed to generate PDF preview',
            message: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
exports.default = router;
//# sourceMappingURL=pdf.js.map