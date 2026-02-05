"use strict";
/**
 * DOCX Export Routes
 * Endpoints for generating DOCX resumes
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const docxGeneratorService_1 = require("../services/docxGeneratorService");
const router = (0, express_1.Router)();
/**
 * POST /api/v1/docx/generate
 * Generate a DOCX from resume data
 */
router.post('/generate', async (req, res) => {
    try {
        const request = req.body;
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
        const docxBuffer = await (0, docxGeneratorService_1.processDocxRequest)(request);
        const sanitizedName = (request.data.personalInfo?.fullName || 'resume')
            .replace(/[^a-zA-Z0-9]/g, '_')
            .toLowerCase();
        const filename = `${sanitizedName}_resume.docx`;
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