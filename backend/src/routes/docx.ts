/**
 * DOCX Export Routes
 * Endpoints for generating DOCX resumes
 */

import { Router, Response } from 'express';
import logger from '../lib/logger';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { checkDownloadLimit, incrementDownloadCount } from '../middleware/subscriptionLimits';
import { processDocxRequest } from '../services/docxGeneratorService';
import { PdfGenerateRequest } from '../types/pdf';

const router = Router();

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
router.post('/generate', authenticateToken, checkDownloadLimit, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const request = req.body as PdfGenerateRequest;

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
        const docxBuffer = await processDocxRequest(request);

        // Increment download count (auth is required, so user always exists)
        await incrementDownloadCount(req.user!.id);

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
    } catch (error) {
        logger.error({ err: error }, 'DOCX generation error');
        res.status(500).json({
            error: 'Failed to generate DOCX',
            message: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});

export default router;
