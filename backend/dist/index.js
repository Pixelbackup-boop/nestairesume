"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const env_1 = require("./config/env");
const sentry_1 = require("./lib/sentry");
// Import routes
const auth_1 = __importDefault(require("./routes/auth"));
const resumes_1 = __importDefault(require("./routes/resumes"));
const admin_1 = __importDefault(require("./routes/admin"));
const blog_1 = __importDefault(require("./routes/blog"));
const payments_1 = __importDefault(require("./routes/payments"));
const webhooks_1 = __importDefault(require("./routes/webhooks"));
const autoBlog_1 = __importDefault(require("./routes/autoBlog"));
const pdf_1 = __importDefault(require("./routes/pdf"));
const docx_1 = __importDefault(require("./routes/docx"));
const resumeParser_1 = __importDefault(require("./routes/resumeParser"));
const ai_1 = __importDefault(require("./routes/ai"));
const atsChecker_1 = __importDefault(require("./routes/atsChecker"));
const ads_1 = __importDefault(require("./routes/ads"));
const tawk_1 = __importDefault(require("./routes/tawk"));
const mockInterview_1 = __importDefault(require("./routes/mockInterview"));
const contact_1 = __importDefault(require("./routes/contact"));
const community_1 = __importDefault(require("./routes/community"));
const templateFeedback_1 = __importDefault(require("./routes/templateFeedback"));
// Import scheduler
const schedulerService_1 = require("./services/schedulerService");
const stripeService_1 = require("./services/stripeService");
const fontCache_1 = require("./templates/pdf/shared/fontCache");
const database_1 = __importDefault(require("./config/database"));
const app = (0, express_1.default)();
// Initialize Sentry (must be before routes)
(0, sentry_1.initSentry)(app);
// Middleware
app.use((0, cors_1.default)({
    origin: env_1.config.corsOrigins,
    credentials: true,
}));
// Stripe webhook needs raw body - must be before json parser
app.use("/api/v1/webhooks/stripe", express_1.default.raw({ type: "application/json" }));
app.use(express_1.default.json({ limit: '10mb' })); // Increased for base64 images
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
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
            database_1.default.$queryRaw `SELECT 1`,
            new Promise((_, reject) => setTimeout(() => reject(new Error("DB health check timeout")), HEALTH_CHECK_TIMEOUT_MS)),
        ]);
        res.json({ status: "healthy", database: "connected" });
    }
    catch {
        res.status(503).json({ status: "unhealthy", database: "disconnected" });
    }
});
// API Routes
app.use("/api/v1/auth", auth_1.default);
app.use("/api/v1/resumes", resumes_1.default);
app.use("/api/v1/admin", admin_1.default);
app.use("/api/v1/blog", blog_1.default);
app.use("/api/v1/payments", payments_1.default);
app.use("/api/v1/webhooks", webhooks_1.default);
app.use("/api/v1/admin/auto-blog", autoBlog_1.default);
app.use("/api/v1/pdf", pdf_1.default);
app.use("/api/v1/docx", docx_1.default);
app.use("/api/v1/resume", resumeParser_1.default);
app.use("/api/v1/ai", ai_1.default);
app.use("/api/v1/ats", atsChecker_1.default);
app.use("/api/v1/ads", ads_1.default);
app.use("/api/v1/tawk", tawk_1.default);
app.use("/api/v1/interview", mockInterview_1.default);
app.use("/api/v1/contact", contact_1.default);
app.use("/api/v1/community", community_1.default);
app.use("/api/v1/template-feedback", templateFeedback_1.default);
// Sentry error handler (must be after all routes)
(0, sentry_1.setupSentryErrorHandler)(app);
// Process-level error handlers
process.on('unhandledRejection', (reason) => {
    console.error('Unhandled promise rejection:', reason);
    // Exit so Cloud Run restarts the container instead of leaving a zombie
    process.exit(1);
});
process.on('uncaughtException', (err) => {
    console.error('Uncaught exception:', err);
    process.exit(1);
});
// Start server
const server = app.listen(env_1.config.port, env_1.config.host, async () => {
    console.log(`🚀 Server running at http://${env_1.config.host}:${env_1.config.port}`);
    console.log(`📚 API endpoints at http://${env_1.config.host}:${env_1.config.port}/api/v1`);
    // Cache Google Fonts for PDF generation (eliminates CDN calls)
    (0, fontCache_1.initFontCache)();
    // Load plan limits from DB (falls back to hardcoded defaults if no rows)
    await (0, stripeService_1.reloadPlansFromDb)();
    // Start auto-blog scheduler
    (0, schedulerService_1.startScheduler)();
});
// Graceful shutdown — Cloud Run sends SIGTERM with 10s grace period
const SHUTDOWN_TIMEOUT_MS = 8000;
function gracefulShutdown(signal) {
    console.log(`\n${signal} received. Shutting down gracefully...`);
    // Stop accepting new connections
    server.close(async () => {
        console.log('All in-flight requests completed. Disconnecting DB...');
        await database_1.default.$disconnect();
        console.log('DB disconnected. Exiting.');
        process.exit(0);
    });
    // Force exit if in-flight requests don't finish in time
    setTimeout(async () => {
        console.error('Shutdown timeout reached. Forcing exit.');
        await database_1.default.$disconnect().catch(() => { });
        process.exit(1);
    }, SHUTDOWN_TIMEOUT_MS);
}
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
//# sourceMappingURL=index.js.map