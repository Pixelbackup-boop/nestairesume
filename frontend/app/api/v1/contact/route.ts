/**
 * POST /api/v1/contact — contact form: notify support, confirm to the sender.
 * Ported from backend/src/routes/contact.ts.
 *
 * TODO: rate limiting — the Express backend applied contactLimiter.
 */
import { z } from 'zod';
import { jsonResponse, validationErrorResponse, sendEmail } from '@/lib/server/apiUtils';

export { OPTIONS } from '@/lib/server/apiUtils';

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'support@bestairesumes.com';

const contactFormSchema = z.object({
  inquiryType: z.string().min(1, 'Inquiry type is required').max(100),
  name: z.string().min(1, 'Name is required').max(100).trim(),
  email: z.string().email('Invalid email format').max(255),
  subject: z.string().min(1, 'Subject is required').max(200).trim(),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message too long (max 5000 characters)')
    .trim(),
});

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(request: Request): Promise<Response> {
  const origin = request.headers.get('origin');

  const body: unknown = await request.json().catch(() => ({}));
  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    return validationErrorResponse(parsed.error, origin);
  }
  const { inquiryType, name, email, subject, message } = parsed.data;

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message);
  const safeInquiryType = escapeHtml(inquiryType);

  try {
    const adminHtml = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f5;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td align="center" style="padding: 40px 0;">
              <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <tr>
                  <td style="padding: 40px 40px 20px; text-align: center; background-color: #00dc82; border-radius: 12px 12px 0 0;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">New Contact Form Submission</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 40px;">
                    <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                      <tr>
                        <td style="padding: 12px; font-weight: 600; color: #18181b; border-bottom: 1px solid #e4e4e7; width: 140px;">Inquiry Type</td>
                        <td style="padding: 12px; color: #52525b; border-bottom: 1px solid #e4e4e7;">${safeInquiryType}</td>
                      </tr>
                      <tr>
                        <td style="padding: 12px; font-weight: 600; color: #18181b; border-bottom: 1px solid #e4e4e7;">Name</td>
                        <td style="padding: 12px; color: #52525b; border-bottom: 1px solid #e4e4e7;">${safeName}</td>
                      </tr>
                      <tr>
                        <td style="padding: 12px; font-weight: 600; color: #18181b; border-bottom: 1px solid #e4e4e7;">Email</td>
                        <td style="padding: 12px; color: #52525b; border-bottom: 1px solid #e4e4e7;">${safeEmail}</td>
                      </tr>
                      <tr>
                        <td style="padding: 12px; font-weight: 600; color: #18181b; border-bottom: 1px solid #e4e4e7;">Subject</td>
                        <td style="padding: 12px; color: #52525b; border-bottom: 1px solid #e4e4e7;">${safeSubject}</td>
                      </tr>
                    </table>
                    <h3 style="margin: 0 0 12px; color: #18181b; font-size: 16px;">Message:</h3>
                    <div style="background-color: #f4f4f5; border-radius: 8px; padding: 20px; white-space: pre-wrap; color: #52525b; font-size: 15px; line-height: 1.6;">${safeMessage}</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px 40px 40px; border-top: 1px solid #e4e4e7;">
                    <p style="margin: 0; color: #a1a1aa; font-size: 12px; text-align: center;">
                      This message was sent via the Best AI Resume contact form.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>`;

    const adminText = `New Contact Form Submission\n\nInquiry Type: ${inquiryType}\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`;

    const adminSuccess = await sendEmail({
      to: CONTACT_EMAIL,
      toName: 'Best AI Resume Support',
      subject: `[Contact] ${inquiryType}: ${subject}`,
      htmlContent: adminHtml,
      textContent: adminText,
      replyTo: email,
    });

    if (!adminSuccess) {
      return jsonResponse({ detail: 'Failed to send message. Please try again later.' }, 500, origin);
    }

    const confirmHtml = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f5;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td align="center" style="padding: 40px 0;">
              <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <tr>
                  <td style="padding: 40px 40px 20px; text-align: center; background-color: #00dc82; border-radius: 12px 12px 0 0;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">Best AI Resume</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 40px;">
                    <h2 style="margin: 0 0 20px; color: #18181b; font-size: 24px; font-weight: 600;">We received your message!</h2>
                    <p style="margin: 0 0 20px; color: #52525b; font-size: 16px; line-height: 1.6;">
                      Hi ${safeName},
                    </p>
                    <p style="margin: 0 0 20px; color: #52525b; font-size: 16px; line-height: 1.6;">
                      Thank you for reaching out to us. We've received your message regarding <strong>"${safeSubject}"</strong> and our team will get back to you within 24 hours.
                    </p>
                    <p style="margin: 0; color: #71717a; font-size: 14px;">
                      If you have any urgent concerns, please don't hesitate to send a follow-up message.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px 40px 40px; border-top: 1px solid #e4e4e7;">
                    <p style="margin: 0; color: #a1a1aa; font-size: 12px; text-align: center;">
                      &copy; ${new Date().getFullYear()} Best AI Resume. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>`;

    const confirmText = `Hi ${name},\n\nThank you for reaching out to us. We've received your message regarding "${subject}" and our team will get back to you within 24 hours.\n\nIf you have any urgent concerns, please don't hesitate to send a follow-up message.\n\n© ${new Date().getFullYear()} Best AI Resume. All rights reserved.`;

    // Fire-and-forget — don't fail the request if the confirmation email fails
    void sendEmail({
      to: email,
      toName: name,
      subject: 'We received your message - Best AI Resume',
      htmlContent: confirmHtml,
      textContent: confirmText,
    });

    return jsonResponse({ success: true, message: 'Your message has been sent successfully.' }, 200, origin);
  } catch (error) {
    console.error('Contact form error', error);
    return jsonResponse({ detail: 'Failed to send message' }, 500, origin);
  }
}
