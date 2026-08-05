/**
 * POST /api/v1/docx/generate — render a resume DOCX and return it as a download.
 * Ported from backend/src/routes/docx.ts (authenticateToken + checkDownloadLimit).
 *
 * HTML comes from the generated string-template bundle
 * (lib/docx-templates/docxTemplates.js), converted with html-to-docx
 * (pure-JS: jszip + xmlbuilder — runs under nodejs_compat).
 */
import HTMLtoDOCX from 'html-to-docx';
import { getDb } from '@/lib/server/db';
import { jsonResponse, corsHeaders, getBearerToken, verifyAccessToken } from '@/lib/server/apiUtils';
import { checkDownloadLimit, incrementDownloadCount } from '@/lib/server/subscriptionLimits';
import { renderDocxHtml } from '@/lib/docx-templates/docxTemplates';
import { sanitizeLocale } from '@/lib/server/pdfHtml';
import type { PdfGenerateRequest } from '@/lib/server/pdfGenerator';

export { OPTIONS } from '@/lib/server/apiUtils';

export const maxDuration = 60;

export async function POST(request: Request): Promise<Response> {
  const origin = request.headers.get('origin');

  const token = getBearerToken(request);
  if (!token) {
    return jsonResponse({ error: 'Please sign in to download', code: 'AUTH_REQUIRED' }, 401, origin);
  }
  const tokenUser = await verifyAccessToken(token);
  if (!tokenUser) {
    return jsonResponse({ detail: 'Invalid or expired token' }, 401, origin);
  }

  const db = getDb();
  const limit = await checkDownloadLimit(db, tokenUser.id);
  if (limit.error) {
    return jsonResponse(limit.error.body, limit.error.status, origin);
  }

  const body = (await request.json().catch(() => null)) as PdfGenerateRequest | null;
  if (!body?.data) return jsonResponse({ error: 'Missing resume data' }, 400, origin);
  if (!body.templateId) return jsonResponse({ error: 'Missing templateId' }, 400, origin);
  if (!body.theme) return jsonResponse({ error: 'Missing theme' }, 400, origin);

  try {
    const html = renderDocxHtml(
      body.data,
      body.templateId,
      body.theme,
      body.translations,
      sanitizeLocale(body.locale)
    );

    const docxOut = await HTMLtoDOCX(html, null, {
      table: { row: { cantSplit: true } },
      footer: false,
      pageNumber: false,
      margins: { top: 720, bottom: 720, left: 720, right: 720, header: 720, footer: 720, gutter: 0 },
    });
    const docxBytes = new Uint8Array(
      docxOut instanceof ArrayBuffer ? docxOut : (docxOut as Buffer)
    );

    await incrementDownloadCount(db, tokenUser.id);

    const sanitizedName = (body.data.personalInfo?.fullName || 'resume')
      .replace(/[^a-zA-Z0-9]/g, '_')
      .toLowerCase();

    return new Response(docxBytes, {
      status: 200,
      headers: {
        ...corsHeaders(origin),
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="${sanitizedName}_resume.docx"`,
        'Content-Length': String(docxBytes.length),
      },
    });
  } catch (error) {
    console.error('DOCX generation error', error);
    return jsonResponse(
      { error: 'Failed to generate DOCX', message: error instanceof Error ? error.message : 'Unknown error' },
      500,
      origin
    );
  }
}
