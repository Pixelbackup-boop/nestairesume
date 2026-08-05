/**
 * POST /api/v1/pdf/generate — render a resume PDF and return it as a download.
 * Ported from backend/src/routes/pdf.ts (authenticateToken + checkDownloadLimit).
 *
 * Body: { data, templateId, theme, translations?, locale? } (same wire format
 * the builder's lib/pdfService.ts has always sent). Free users get a watermark.
 */
import { getDb, getEnv } from '@/lib/server/db';
import { jsonResponse, corsHeaders, getBearerToken, verifyAccessToken } from '@/lib/server/apiUtils';
import { checkDownloadLimit, incrementDownloadCount } from '@/lib/server/subscriptionLimits';
import { renderResumePdf, type PdfGenerateRequest } from '@/lib/server/pdfGenerator';

export { OPTIONS } from '@/lib/server/apiUtils';

// PDF rendering can exceed the default request budget on cold browser launches
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

  const browser = getEnv().BROWSER;
  if (!browser) {
    return jsonResponse({ error: 'PDF service not configured' }, 503, origin);
  }

  try {
    const pdfBytes = await renderResumePdf(browser, { ...body, watermark: limit.watermark });

    await incrementDownloadCount(db, tokenUser.id);

    const sanitizedName = (body.data.personalInfo?.fullName || 'resume')
      .replace(/[^a-zA-Z0-9]/g, '_')
      .toLowerCase();

    return new Response(new Uint8Array(pdfBytes), {
      status: 200,
      headers: {
        ...corsHeaders(origin),
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${sanitizedName}_resume.pdf"`,
        'Content-Length': String(pdfBytes.length),
      },
    });
  } catch (error) {
    console.error('PDF generation error', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    // Browser Rendering concurrency exhaustion surfaces as acquire failures
    const busy = /limit|concurrent|429/i.test(message);
    return jsonResponse(
      {
        error: busy ? 'Server busy' : 'Failed to generate PDF',
        message,
        retryAfter: busy ? 5 : undefined,
      },
      busy ? 503 : 500,
      origin
    );
  }
}
