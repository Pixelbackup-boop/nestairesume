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
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
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
const contact_1 = __importDefault(require("./routes/contact"));
const community_1 = __importDefault(require("./routes/community"));
const templateFeedback_1 = __importDefault(require("./routes/templateFeedback"));
const rateLimiter_1 = require("./middleware/rateLimiter");
// Import middleware (only if not in test environment)
const isTestEnv = process.env.NODE_ENV === 'test';
const app = (0, express_1.default)();
// Trust proxy for rate limiting behind reverse proxy
app.set('trust proxy', 1);
// Gzip/Brotli compression (skip PDFs — already compressed binary)
app.use((0, compression_1.default)({
    filter: (req, res) => {
        if (res.getHeader('Content-Type') === 'application/pdf')
            return false;
        return compression_1.default.filter(req, res);
    }
}));
// Security headers with helmet
// Configured for API server with cross-origin requests
app.use((0, helmet_1.default)({
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
    hsts: env_1.config.isProduction ? {
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
// API Routes
app.use("/api/v1/auth", rateLimiter_1.authLimiter, auth_1.default);
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
app.use("/api/v1/contact", contact_1.default);
app.use("/api/v1/community", community_1.default);
app.use("/api/v1/template-feedback", templateFeedback_1.default);
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