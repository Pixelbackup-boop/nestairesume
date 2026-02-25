import express from "express";
import cors from "cors";
import { config } from "./config/env";
import { initSentry, setupSentryErrorHandler } from "./lib/sentry";
import logger from "./lib/logger";
import { requestIdMiddleware } from "./middleware/requestId";

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
import aiRoutes from "./routes/ai";
import atsCheckerRoutes from "./routes/atsChecker";
import adsRoutes from "./routes/ads";
import tawkRoutes from "./routes/tawk";
import mockInterviewRoutes from "./routes/mockInterview";
import contactRoutes from "./routes/contact";
import communityRoutes from "./routes/community";
import templateFeedbackRoutes from "./routes/templateFeedback";

// Import scheduler
import { startScheduler } from "./services/schedulerService";
import { reloadPlansFromDb } from "./services/stripeService";
import { initFontCache } from "./templates/pdf/shared/fontCache";
import prisma from "./config/database";

const app = express();

// Initialize Sentry (must be before routes)
initSentry(app);

// Middleware
app.use(cors({
  origin: config.corsOrigins,
  credentials: true,
}));

// Stripe webhook needs raw body - must be before json parser
app.use("/api/v1/webhooks/stripe", express.raw({ type: "application/json" }));

app.use(express.json({ limit: '10mb' }));  // Increased for base64 images
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request ID for log correlation (must be after body parsers, before routes)
app.use(requestIdMiddleware);

// Health check
app.get("/", (_req, res) => {
  res.json({
    app: "Best AI Resume API",
    version: "1.0.0",
    docs: "/api/v1",
  });
});

app.get("/health", async (_req, res) => {
  try {
    const HEALTH_CHECK_TIMEOUT_MS = 2000;
    await Promise.race([
      prisma.$queryRaw`SELECT 1`,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("DB health check timeout")), HEALTH_CHECK_TIMEOUT_MS)
      ),
    ]);
    res.json({ status: "healthy", database: "connected" });
  } catch {
    res.status(503).json({ status: "unhealthy", database: "disconnected" });
  }
});

// Detailed health check for monitoring dashboards
app.get("/health/detailed", async (_req, res) => {
  const checks: Record<string, "ok" | "error"> = {};
  const TIMEOUT_MS = 3000;

  // Database
  try {
    await Promise.race([
      prisma.$queryRaw`SELECT 1`,
      new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), TIMEOUT_MS)),
    ]);
    checks.database = "ok";
  } catch {
    checks.database = "error";
  }

  // Stripe (just check SDK is configured)
  checks.stripe = config.stripeSecretKey ? "ok" : "error";

  // OpenAI (just check key exists)
  checks.openai = process.env.OPENAI_API_KEY ? "ok" : "error";

  // Brevo email (just check key exists)
  checks.email = config.brevoApiKey ? "ok" : "error";

  const allOk = Object.values(checks).every(v => v === "ok");
  res.status(allOk ? 200 : 503).json({ status: allOk ? "healthy" : "degraded", checks });
});

// API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/resumes", resumeRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/blog", blogRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1/webhooks", webhookRoutes);
app.use("/api/v1/admin/auto-blog", autoBlogRoutes);
app.use("/api/v1/pdf", pdfRoutes);
app.use("/api/v1/docx", docxRoutes);
app.use("/api/v1/resume", resumeParserRoutes);
app.use("/api/v1/ai", aiRoutes);
app.use("/api/v1/ats", atsCheckerRoutes);
app.use("/api/v1/ads", adsRoutes);
app.use("/api/v1/tawk", tawkRoutes);
app.use("/api/v1/interview", mockInterviewRoutes);
app.use("/api/v1/contact", contactRoutes);
app.use("/api/v1/community", communityRoutes);
app.use("/api/v1/template-feedback", templateFeedbackRoutes);

// Sentry error handler (must be after all routes)
setupSentryErrorHandler(app);

// Process-level error handlers
process.on('unhandledRejection', (reason) => {
  logger.error({ err: reason }, 'Unhandled promise rejection');
  // Exit so Cloud Run restarts the container instead of leaving a zombie
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  logger.error({ err }, 'Uncaught exception');
  process.exit(1);
});

// Start server
const server = app.listen(config.port, config.host, async () => {
  logger.info({ host: config.host, port: config.port }, 'Server running');
  logger.info({ host: config.host, port: config.port, path: '/api/v1' }, 'API endpoints available');

  // Cache Google Fonts for PDF generation (eliminates CDN calls)
  initFontCache();

  // Load plan limits from DB (falls back to hardcoded defaults if no rows)
  await reloadPlansFromDb();

  // Start auto-blog scheduler
  startScheduler();
});

// Graceful shutdown — Cloud Run sends SIGTERM with 10s grace period
const SHUTDOWN_TIMEOUT_MS = 8000;

function gracefulShutdown(signal: string) {
  logger.info({ signal }, 'Received shutdown signal, shutting down gracefully');

  // Stop accepting new connections
  server.close(async () => {
    logger.info('All in-flight requests completed, disconnecting DB');
    await prisma.$disconnect();
    logger.info('DB disconnected, exiting');
    process.exit(0);
  });

  // Force exit if in-flight requests don't finish in time
  setTimeout(async () => {
    logger.error('Shutdown timeout reached, forcing exit');
    await prisma.$disconnect().catch(() => {});
    process.exit(1);
  }, SHUTDOWN_TIMEOUT_MS);
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
