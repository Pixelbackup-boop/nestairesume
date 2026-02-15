import express from "express";
import cors from "cors";
import { config } from "./config/env";
import { initSentry, setupSentryErrorHandler } from "./lib/sentry";

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
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: "healthy", database: "connected" });
  } catch {
    res.status(503).json({ status: "unhealthy", database: "disconnected" });
  }
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

// Sentry error handler (must be after all routes)
setupSentryErrorHandler(app);

// Process-level error handlers
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled promise rejection:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
  process.exit(1);
});

// Start server
const server = app.listen(config.port, config.host, async () => {
  console.log(`🚀 Server running at http://${config.host}:${config.port}`);
  console.log(`📚 API endpoints at http://${config.host}:${config.port}/api/v1`);

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
  console.log(`\n${signal} received. Shutting down gracefully...`);

  // Stop accepting new connections
  server.close(() => {
    console.log('All in-flight requests completed. Exiting.');
    process.exit(0);
  });

  // Force exit if in-flight requests don't finish in time
  setTimeout(() => {
    console.error('Shutdown timeout reached. Forcing exit.');
    process.exit(1);
  }, SHUTDOWN_TIMEOUT_MS);
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
