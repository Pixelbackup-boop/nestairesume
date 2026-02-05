import express from "express";
import cors from "cors";
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

// Import scheduler
import { startScheduler } from "./services/schedulerService";

const app = express();

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

app.get("/health", (_req, res) => {
  res.json({ status: "healthy" });
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

// Start server
app.listen(config.port, config.host, () => {
  console.log(`🚀 Server running at http://${config.host}:${config.port}`);
  console.log(`📚 API endpoints at http://${config.host}:${config.port}/api/v1`);

  // Start auto-blog scheduler
  startScheduler();
});
