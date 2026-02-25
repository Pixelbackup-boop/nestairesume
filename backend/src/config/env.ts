import dotenv from "dotenv";
import pino from "pino";

dotenv.config();

// Use pino directly here to avoid circular dependency with lib/logger
const envLogger = pino({
  level: process.env.LOG_LEVEL || 'info',
  ...(process.env.NODE_ENV !== 'production' && {
    transport: {
      target: 'pino-pretty',
      options: { colorize: true },
    },
  }),
});

const isProduction = process.env.NODE_ENV === "production";
const isTest = process.env.NODE_ENV === "test";

// SECURITY: Validate required secrets in production
function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET || process.env.SECRET_KEY;

  if (isProduction && !secret) {
    throw new Error(
      "CRITICAL: JWT_SECRET environment variable is required in production. " +
      "Set JWT_SECRET to a secure random string (min 32 characters)."
    );
  }

  // Allow fallback only in development/test for convenience
  if (!secret && !isProduction) {
    envLogger.warn('Using fallback JWT secret - set JWT_SECRET in .env for security');
    return "dev-fallback-secret-do-not-use-in-production";
  }

  return secret!;
}

export const config = {
  // Environment
  nodeEnv: process.env.NODE_ENV || "development",
  isProduction,
  isTest,

  // Server
  port: parseInt(process.env.PORT || "4444", 10),
  host: process.env.HOST || "0.0.0.0",

  // Authentication - CRITICAL: No fallback in production
  secretKey: getJwtSecret(),
  accessTokenExpireMinutes: parseInt(process.env.ACCESS_TOKEN_EXPIRE_MINUTES || "30", 10),

  // AI Services
  deepseekApiKey: process.env.DEEPSEEK_API_KEY,
  openaiApiKey: process.env.OPENAI_API_KEY,

  // CORS
  corsOrigins: process.env.CORS_ORIGINS?.split(",") || ["http://localhost:4455", "http://localhost:3000"],

  // Stripe
  stripeSecretKey: process.env.STRIPE_SECRET_KEY || "",
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET || "",
  stripePrices: {
    starter: process.env.STRIPE_PRICE_STARTER || "",
    gold: process.env.STRIPE_PRICE_GOLD || "",
    diamond: process.env.STRIPE_PRICE_DIAMOND || "",
    platinum: process.env.STRIPE_PRICE_PLATINUM || "",
  },

  // Frontend
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:4455",

  // Email (Brevo)
  brevoApiKey: process.env.BREVO_API_KEY || "",
  emailFromAddress: process.env.EMAIL_FROM_ADDRESS || "noreply@bestairesumes.com",
  contactEmail: process.env.CONTACT_EMAIL || "support@bestairesumes.com",

  // Sentry (optional)
  sentryDsn: process.env.SENTRY_DSN,
};
