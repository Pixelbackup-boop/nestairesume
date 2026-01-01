import express from "express";
import cors from "cors";
import { config } from "./config/env";

// Import routes
import authRoutes from "./routes/auth";
import resumeRoutes from "./routes/resumes";
import aiRoutes from "./routes/ai";
import exportRoutes from "./routes/export";

const app = express();

// Middleware
app.use(cors({
  origin: config.corsOrigins,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/", (_req, res) => {
  res.json({
    app: "ResumeAI API",
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
app.use("/api/v1/ai", aiRoutes);
app.use("/api/v1/export", exportRoutes);

// Start server
app.listen(config.port, config.host, () => {
  console.log(`🚀 Server running at http://${config.host}:${config.port}`);
  console.log(`📚 API endpoints at http://${config.host}:${config.port}/api/v1`);
});
