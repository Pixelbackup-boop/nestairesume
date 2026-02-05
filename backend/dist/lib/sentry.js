"use strict";
/**
 * Sentry Error Monitoring Configuration (v10.x)
 *
 * Setup:
 * 1. Create a Sentry account at https://sentry.io
 * 2. Create a new Node.js project
 * 3. Copy your DSN and add to .env: SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSentry = initSentry;
exports.setupSentryErrorHandler = setupSentryErrorHandler;
exports.sentryRequestHandler = sentryRequestHandler;
exports.captureError = captureError;
exports.trackPdfGeneration = trackPdfGeneration;
exports.trackAiCall = trackAiCall;
exports.setUserContext = setUserContext;
exports.clearUserContext = clearUserContext;
exports.sentryContextMiddleware = sentryContextMiddleware;
const Sentry = __importStar(require("@sentry/node"));
/**
 * Initialize Sentry with configuration
 */
function initSentry(app) {
    const dsn = process.env.SENTRY_DSN;
    if (!dsn) {
        console.log('⚠️  Sentry DSN not configured. Error monitoring disabled.');
        console.log('   Add SENTRY_DSN to your .env file to enable error tracking.');
        return;
    }
    Sentry.init({
        dsn,
        environment: process.env.NODE_ENV || 'development',
        // Performance monitoring
        tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
        // Release tracking (set via CI/CD)
        release: process.env.SENTRY_RELEASE || 'ai-resume-builder@1.0.0',
        // Integrations
        integrations: [
            // HTTP request tracing
            Sentry.httpIntegration(),
            // Express-specific tracing
            Sentry.expressIntegration(),
        ],
        // Filter sensitive data
        beforeSend(event) {
            // Remove sensitive headers
            if (event.request?.headers) {
                delete event.request.headers['authorization'];
                delete event.request.headers['cookie'];
                delete event.request.headers['x-api-key'];
            }
            // Remove sensitive data from request body
            if (event.request?.data) {
                try {
                    const data = typeof event.request.data === 'string'
                        ? JSON.parse(event.request.data)
                        : event.request.data;
                    // Redact sensitive fields
                    const sensitiveFields = ['password', 'token', 'apiKey', 'secret', 'creditCard'];
                    for (const field of sensitiveFields) {
                        if (data[field]) {
                            data[field] = '[REDACTED]';
                        }
                    }
                    event.request.data = JSON.stringify(data);
                }
                catch {
                    // Ignore JSON parse errors
                }
            }
            return event;
        },
        // Ignore specific errors
        ignoreErrors: [
            // Rate limiting (expected behavior)
            'Too many requests',
            // User cancelled requests
            'ECONNRESET',
            'ECONNABORTED',
            // Expected auth errors
            'Invalid token',
            'Token expired',
        ],
    });
    console.log('✅ Sentry initialized for error monitoring');
}
/**
 * Setup Sentry Express error handler
 * Must be called AFTER all routes are registered
 */
function setupSentryErrorHandler(app) {
    if (!process.env.SENTRY_DSN)
        return;
    Sentry.setupExpressErrorHandler(app);
}
/**
 * Express request handler middleware
 * Must be added BEFORE all routes
 */
function sentryRequestHandler() {
    return (_req, _res, next) => {
        next();
    };
}
/**
 * Custom error capture with additional context
 */
function captureError(error, context) {
    if (!process.env.SENTRY_DSN) {
        console.error('Error (Sentry disabled):', error);
        return 'sentry-disabled';
    }
    Sentry.withScope((scope) => {
        if (context?.user) {
            scope.setUser(context.user);
        }
        if (context?.tags) {
            for (const [key, value] of Object.entries(context.tags)) {
                scope.setTag(key, value);
            }
        }
        if (context?.extra) {
            for (const [key, value] of Object.entries(context.extra)) {
                scope.setExtra(key, value);
            }
        }
    });
    return Sentry.captureException(error);
}
/**
 * Track PDF generation performance
 */
function trackPdfGeneration(templateId, durationMs, success, fileSize) {
    if (!process.env.SENTRY_DSN)
        return;
    Sentry.addBreadcrumb({
        category: 'pdf',
        message: `PDF generation ${success ? 'completed' : 'failed'}`,
        level: success ? 'info' : 'error',
        data: {
            templateId,
            durationMs,
            fileSize,
        },
    });
}
/**
 * Track AI API calls
 */
function trackAiCall(operation, durationMs, success, tokensUsed) {
    if (!process.env.SENTRY_DSN)
        return;
    Sentry.addBreadcrumb({
        category: 'ai',
        message: `AI call: ${operation}`,
        level: success ? 'info' : 'error',
        data: {
            operation,
            durationMs,
            tokensUsed,
        },
    });
}
/**
 * Set user context for all subsequent events
 */
function setUserContext(user) {
    if (!process.env.SENTRY_DSN)
        return;
    Sentry.setUser({
        id: user.id,
        email: user.email,
    });
}
/**
 * Clear user context (on logout)
 */
function clearUserContext() {
    if (!process.env.SENTRY_DSN)
        return;
    Sentry.setUser(null);
}
/**
 * Middleware to add request context to Sentry
 */
function sentryContextMiddleware(req, _res, next) {
    if (!process.env.SENTRY_DSN) {
        next();
        return;
    }
    Sentry.withScope((scope) => {
        // Add request info
        scope.setTag('url', req.originalUrl);
        scope.setTag('method', req.method);
        // Add user if authenticated
        const user = req.user;
        if (user?.id) {
            scope.setUser({ id: user.id, email: user.email });
        }
        next();
    });
}
//# sourceMappingURL=sentry.js.map