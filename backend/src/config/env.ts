import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || "4444", 10),
  host: process.env.HOST || "0.0.0.0",
  secretKey: process.env.SECRET_KEY || "fallback-secret-key",
  accessTokenExpireMinutes: parseInt(process.env.ACCESS_TOKEN_EXPIRE_MINUTES || "30", 10),
  deepseekApiKey: process.env.DEEPSEEK_API_KEY,
  openaiApiKey: process.env.OPENAI_API_KEY,
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
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:4455",
};
