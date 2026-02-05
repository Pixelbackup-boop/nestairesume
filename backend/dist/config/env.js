"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const isProduction = process.env.NODE_ENV === "production";
exports.config = {
    // Environment
    nodeEnv: process.env.NODE_ENV || "development",
    isProduction,
    // Server
    port: parseInt(process.env.PORT || "4444", 10),
    host: process.env.HOST || "0.0.0.0",
    // Authentication
    secretKey: process.env.JWT_SECRET || process.env.SECRET_KEY || "fallback-secret-key",
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
    // Sentry (optional)
    sentryDsn: process.env.SENTRY_DSN,
};
//# sourceMappingURL=env.js.map