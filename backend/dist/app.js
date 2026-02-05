"use strict";
/**
 * Express App Configuration
 * Separated from index.ts for testability
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const env_1 = require("./config/env");
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
const mockInterview_1 = __importDefault(require("./routes/mockInterview"));
const ads_1 = __importDefault(require("./routes/ads"));
// Import middleware (only if not in test environment)
const isTestEnv = process.env.NODE_ENV === 'test';
const app = (0, express_1.default)();
// Trust proxy for rate limiting behind reverse proxy
app.set('trust proxy', 1);
// Middleware
app.use((0, cors_1.default)({
    origin: isTestEnv ? '*' : env_1.config.corsOrigins,
    credentials: true,
}));
// Stripe webhook needs raw body - must be before json parser
app.use("/api/v1/webhooks/stripe", express_1.default.raw({ type: "application/json" }));
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
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
// API Routes (without rate limiting in test environment)
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
app.use("/api/v1/interview", mockInterview_1.default);
app.use("/api/v1/ads", ads_1.default);
// Generic error handler
app.use((err, _req, res, _next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map