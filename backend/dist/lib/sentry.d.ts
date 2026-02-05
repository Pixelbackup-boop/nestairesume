/**
 * Sentry Error Monitoring Configuration (v10.x)
 *
 * Setup:
 * 1. Create a Sentry account at https://sentry.io
 * 2. Create a new Node.js project
 * 3. Copy your DSN and add to .env: SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
 */
import { Express, Request, Response, NextFunction } from 'express';
/**
 * Initialize Sentry with configuration
 */
export declare function initSentry(app: Express): void;
/**
 * Setup Sentry Express error handler
 * Must be called AFTER all routes are registered
 */
export declare function setupSentryErrorHandler(app: Express): void;
/**
 * Express request handler middleware
 * Must be added BEFORE all routes
 */
export declare function sentryRequestHandler(): (_req: Request, _res: Response, next: NextFunction) => void;
/**
 * Custom error capture with additional context
 */
export declare function captureError(error: Error, context?: {
    user?: {
        id: string;
        email?: string;
    };
    tags?: Record<string, string>;
    extra?: Record<string, unknown>;
}): string;
/**
 * Track PDF generation performance
 */
export declare function trackPdfGeneration(templateId: string, durationMs: number, success: boolean, fileSize?: number): void;
/**
 * Track AI API calls
 */
export declare function trackAiCall(operation: string, durationMs: number, success: boolean, tokensUsed?: number): void;
/**
 * Set user context for all subsequent events
 */
export declare function setUserContext(user: {
    id: string;
    email?: string;
    plan?: string;
}): void;
/**
 * Clear user context (on logout)
 */
export declare function clearUserContext(): void;
/**
 * Middleware to add request context to Sentry
 */
export declare function sentryContextMiddleware(req: Request, _res: Response, next: NextFunction): void;
//# sourceMappingURL=sentry.d.ts.map