/**
 * Sentry Error Monitoring Configuration (v10.x)
 *
 * Setup:
 * 1. Create a Sentry account at https://sentry.io
 * 2. Create a new Node.js project
 * 3. Copy your DSN and add to .env: SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
 */

import * as Sentry from '@sentry/node';
import { Express, Request, Response, NextFunction } from 'express';
import logger from './logger';

/**
 * Initialize Sentry with configuration
 */
export function initSentry(app: Express): void {
  const dsn = process.env.SENTRY_DSN;

  if (!dsn) {
    logger.warn('Sentry DSN not configured, error monitoring disabled');
    logger.warn('Add SENTRY_DSN to your .env file to enable error tracking');
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
        } catch {
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

  logger.info('Sentry initialized for error monitoring');
}

/**
 * Setup Sentry Express error handler
 * Must be called AFTER all routes are registered
 */
export function setupSentryErrorHandler(app: Express): void {
  if (!process.env.SENTRY_DSN) return;
  Sentry.setupExpressErrorHandler(app);
}

/**
 * Express request handler middleware
 * Must be added BEFORE all routes
 */
export function sentryRequestHandler() {
  return (_req: Request, _res: Response, next: NextFunction) => {
    next();
  };
}

/**
 * Custom error capture with additional context
 */
export function captureError(
  error: Error,
  context?: {
    user?: { id: string; email?: string };
    tags?: Record<string, string>;
    extra?: Record<string, unknown>;
  }
): string {
  if (!process.env.SENTRY_DSN) {
    logger.error({ err: error }, 'Error (Sentry disabled)');
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
export function trackPdfGeneration(
  templateId: string,
  durationMs: number,
  success: boolean,
  fileSize?: number
): void {
  if (!process.env.SENTRY_DSN) return;

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
export function trackAiCall(
  operation: string,
  durationMs: number,
  success: boolean,
  tokensUsed?: number
): void {
  if (!process.env.SENTRY_DSN) return;

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
export function setUserContext(user: { id: string; email?: string; plan?: string }): void {
  if (!process.env.SENTRY_DSN) return;

  Sentry.setUser({
    id: user.id,
    email: user.email,
  });
}

/**
 * Clear user context (on logout)
 */
export function clearUserContext(): void {
  if (!process.env.SENTRY_DSN) return;
  Sentry.setUser(null);
}

/**
 * Middleware to add request context to Sentry
 */
export function sentryContextMiddleware(req: Request, _res: Response, next: NextFunction): void {
  if (!process.env.SENTRY_DSN) {
    next();
    return;
  }

  Sentry.withScope((scope) => {
    // Add request info
    scope.setTag('url', req.originalUrl);
    scope.setTag('method', req.method);

    // Add user if authenticated
    const user = (req as Request & { user?: { id: string; email?: string } }).user;
    if (user?.id) {
      scope.setUser({ id: user.id, email: user.email });
    }

    next();
  });
}
