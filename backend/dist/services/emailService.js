"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPasswordResetEmail = exports.sendVerificationEmail = exports.generateVerificationCode = exports.sendEmail = void 0;
const brevo = __importStar(require("@getbrevo/brevo"));
const env_1 = require("../config/env");
// Initialize Brevo API
const apiInstance = new brevo.TransactionalEmailsApi();
// Debug: Check if API key is loaded
console.log("🔍 Brevo API Key loaded:", env_1.config.brevoApiKey ? `${env_1.config.brevoApiKey.substring(0, 20)}...` : "NOT SET");
apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, env_1.config.brevoApiKey || "");
const sendEmail = async (options) => {
    try {
        const sendSmtpEmail = new brevo.SendSmtpEmail();
        sendSmtpEmail.sender = {
            name: "Best AI Resume",
            email: env_1.config.emailFromAddress || "noreply@bestairesumes.com",
        };
        sendSmtpEmail.to = [
            {
                email: options.to,
                name: options.toName || options.to,
            },
        ];
        sendSmtpEmail.subject = options.subject;
        sendSmtpEmail.htmlContent = options.htmlContent;
        if (options.textContent) {
            sendSmtpEmail.textContent = options.textContent;
        }
        const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log(`✅ Email sent successfully to ${options.to}`, result);
        return true;
    }
    catch (error) {
        console.error("❌ Failed to send email:");
        console.error("  Error message:", error?.message);
        console.error("  Error body:", error?.body || error?.response?.body);
        console.error("  Full error:", JSON.stringify(error, null, 2));
        return false;
    }
};
exports.sendEmail = sendEmail;
// Generate 6-digit verification code
const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};
exports.generateVerificationCode = generateVerificationCode;
// Send verification code email
const sendVerificationEmail = async (email, name, code) => {
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f5;">
      <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
          <td align="center" style="padding: 40px 0;">
            <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              <!-- Header -->
              <tr>
                <td style="padding: 40px 40px 20px; text-align: center; background-color: #00dc82; border-radius: 12px 12px 0 0;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">Best AI Resume</h1>
                </td>
              </tr>

              <!-- Content -->
              <tr>
                <td style="padding: 40px;">
                  <h2 style="margin: 0 0 20px; color: #18181b; font-size: 24px; font-weight: 600;">Verify your email</h2>
                  <p style="margin: 0 0 20px; color: #52525b; font-size: 16px; line-height: 1.6;">
                    Hi ${name},
                  </p>
                  <p style="margin: 0 0 30px; color: #52525b; font-size: 16px; line-height: 1.6;">
                    Thanks for signing up! Please use the verification code below to complete your registration:
                  </p>

                  <!-- Code Box -->
                  <div style="background-color: #f4f4f5; border-radius: 8px; padding: 24px; text-align: center; margin-bottom: 30px;">
                    <span style="font-size: 36px; font-weight: 700; letter-spacing: 8px; color: #18181b;">${code}</span>
                  </div>

                  <p style="margin: 0 0 10px; color: #71717a; font-size: 14px;">
                    This code will expire in <strong>10 minutes</strong>.
                  </p>
                  <p style="margin: 0; color: #71717a; font-size: 14px;">
                    If you didn't create an account, you can safely ignore this email.
                  </p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding: 20px 40px 40px; border-top: 1px solid #e4e4e7;">
                  <p style="margin: 0; color: #a1a1aa; font-size: 12px; text-align: center;">
                    © ${new Date().getFullYear()} Best AI Resume. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
    const textContent = `
    Verify your email - Best AI Resume

    Hi ${name},

    Thanks for signing up! Please use the verification code below to complete your registration:

    ${code}

    This code will expire in 10 minutes.

    If you didn't create an account, you can safely ignore this email.

    © ${new Date().getFullYear()} Best AI Resume. All rights reserved.
  `;
    return (0, exports.sendEmail)({
        to: email,
        toName: name,
        subject: `${code} is your verification code`,
        htmlContent,
        textContent,
    });
};
exports.sendVerificationEmail = sendVerificationEmail;
// Send password reset email
const sendPasswordResetEmail = async (email, name, code) => {
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f5;">
      <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
          <td align="center" style="padding: 40px 0;">
            <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              <!-- Header -->
              <tr>
                <td style="padding: 40px 40px 20px; text-align: center; background-color: #00dc82; border-radius: 12px 12px 0 0;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">Best AI Resume</h1>
                </td>
              </tr>

              <!-- Content -->
              <tr>
                <td style="padding: 40px;">
                  <h2 style="margin: 0 0 20px; color: #18181b; font-size: 24px; font-weight: 600;">Reset your password</h2>
                  <p style="margin: 0 0 20px; color: #52525b; font-size: 16px; line-height: 1.6;">
                    Hi ${name},
                  </p>
                  <p style="margin: 0 0 30px; color: #52525b; font-size: 16px; line-height: 1.6;">
                    We received a request to reset your password. Use the code below to proceed:
                  </p>

                  <!-- Code Box -->
                  <div style="background-color: #f4f4f5; border-radius: 8px; padding: 24px; text-align: center; margin-bottom: 30px;">
                    <span style="font-size: 36px; font-weight: 700; letter-spacing: 8px; color: #18181b;">${code}</span>
                  </div>

                  <p style="margin: 0 0 10px; color: #71717a; font-size: 14px;">
                    This code will expire in <strong>10 minutes</strong>.
                  </p>
                  <p style="margin: 0; color: #71717a; font-size: 14px;">
                    If you didn't request a password reset, you can safely ignore this email.
                  </p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding: 20px 40px 40px; border-top: 1px solid #e4e4e7;">
                  <p style="margin: 0; color: #a1a1aa; font-size: 12px; text-align: center;">
                    © ${new Date().getFullYear()} Best AI Resume. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
    const textContent = `
    Reset your password - Best AI Resume

    Hi ${name},

    We received a request to reset your password. Use the code below to proceed:

    ${code}

    This code will expire in 10 minutes.

    If you didn't request a password reset, you can safely ignore this email.

    © ${new Date().getFullYear()} Best AI Resume. All rights reserved.
  `;
    return (0, exports.sendEmail)({
        to: email,
        toName: name,
        subject: `${code} is your password reset code`,
        htmlContent,
        textContent,
    });
};
exports.sendPasswordResetEmail = sendPasswordResetEmail;
//# sourceMappingURL=emailService.js.map