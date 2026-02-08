/**
 * Express App Configuration
 * Separated from index.ts for testability
 */

import express from "express";
import cors from "cors";
import helmet from "helmet";
import { config } from "./config/env";

// Import routes
import authRoutes from "./routes/auth";
import resumeRoutes from "./routes/resumes";
import adminRoutes from "./routes/admin";
import blogRoutes from "./routes/blog";
import paymentRoutes from "./routes/payments";
import webhookRoutes from "./routes/webhooks";
import autoBlogRoutes from "./routes/autoBlog";
import pdfRoutes from "./routes/pdf";
import docxRoutes from "./routes/docx";
import resumeParserRoutes from "./routes/resumeParser";
import mockInterviewRoutes from "./routes/mockInterview";
import adsRoutes from "./routes/ads";
import contactRoutes from "./routes/contact";
import { authLimiter, generalLimiter } from "./middleware/rateLimiter";

// Import middleware (only if not in test environment)
const isTestEnv = process.env.NODE_ENV === 'test';

const app = express();

// Trust proxy for rate limiting behind reverse proxy
app.set('trust proxy', 1);

// Security headers with helmet
// Configured for API server with cross-origin requests
app.use(helmet({
  // Content Security Policy - relaxed for API
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  // Cross-Origin settings for API
  crossOriginEmbedderPolicy: false, // Allow embedding from frontend
  crossOriginResourcePolicy: { policy: "cross-origin" }, // Allow cross-origin requests
  // Strict Transport Security - enforce HTTPS in production
  hsts: config.isProduction ? {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true,
  } : false,
  // Prevent clickjacking
  frameguard: { action: "deny" },
  // Prevent MIME type sniffing
  noSniff: true,
  // XSS filter (legacy, but still useful)
  xssFilter: true,
  // Hide X-Powered-By header
  hidePoweredBy: true,
  // Referrer Policy
  referrerPolicy: { policy: "strict-origin-when-cross-origin" },
}));

// CORS configuration
app.use(cors({
  origin: isTestEnv ? '*' : config.corsOrigins,
  credentials: true,
}));

// Stripe webhook needs raw body - must be before json parser
app.use("/api/v1/webhooks/stripe", express.raw({ type: "application/json" }));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check
app.get("/", (_req, res) => {
  res.json({
    app: "Best AI Resume API",
    version: "1.0.0",
    docs: "/api/v1",
  });
});

app.get("/health", (_req, res) => {
  res.json({ status: "healthy" });
});

// API Routes
app.use("/api/v1/auth", authLimiter, authRoutes);
app.use("/api/v1/resumes", resumeRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/blog", blogRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1/webhooks", webhookRoutes);
app.use("/api/v1/admin/auto-blog", autoBlogRoutes);
app.use("/api/v1/pdf", pdfRoutes);
app.use("/api/v1/docx", docxRoutes);
app.use("/api/v1/resume", resumeParserRoutes);
app.use("/api/v1/interview", mockInterviewRoutes);
app.use("/api/v1/ads", adsRoutes);
app.use("/api/v1/contact", contactRoutes);

// Generic error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
  });
});

export default app;
