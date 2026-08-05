/**
 * POST /api/v1/pdf/preview — render a resume PDF and return it as base64.
 * Ported from backend/src/routes/pdf.ts. Unauthenticated (backend parity:
 * the route only had rate limiters, no auth) and always watermark-free —
 * it feeds the in-app preview, not downloads.
 *
 * TODO: rate limiting — the Express backend applied pdfLimiter/pdfHourlyLimiter.
 */
import { getEnv } from '@/lib/server/db';
import { jsonResponse } from '@/lib/server/apiUtils';
import { renderResumePdf, type PdfGenerateRequest } from '@/lib/server/pdfGenerator';

export { OPTIONS } from '@/lib/server/apiUtils';

export const maxDuration = 60;

export async function POST(request: Request): Promise<Response> {
  const origin = request.headers.get('origin');

  const body = (await request.json().catch(() => null)) as PdfGenerateRequest | null;
  if (!body?.data || !body.templateId || !body.theme) {
    return jsonResponse({ error: 'Missing required fields: data, templateId, theme' }, 400, origin);
  }

  const browser = getEnv().BROWSER;
  if (!browser) {
    return jsonResponse({ error: 'PDF service not configured' }, 503, origin);
  }

  try {
    const pdfBytes = await renderResumePdf(browser, body);

    // Base64-encode in chunks — String.fromCharCode(...bytes) overflows the
    // argument limit on multi-page PDFs.
    let binary = '';
    const CHUNK = 0x8000;
    for (let i = 0; i < pdfBytes.length; i += CHUNK) {
      binary += String.fromCharCode(...pdfBytes.subarray(i, i + CHUNK));
    }

    return jsonResponse({ pdf: btoa(binary), size: pdfBytes.length }, 200, origin);
  } catch (error) {
    console.error('PDF preview error', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    const busy = /limit|concurrent|429/i.test(message);
    return jsonResponse(
      {
        error: busy ? 'Server busy' : 'Failed to generate PDF preview',
        message,
        retryAfter: busy ? 5 : undefined,
      },
      busy ? 503 : 500,
      origin
    );
  }
}
