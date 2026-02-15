/**
 * Rate Limiting Middleware
 * Protects API endpoints from abuse, especially PDF generation and AI calls
 */

import rateLimit from 'express-rate-limit';
import { Request, Response, NextFunction } from 'express';
import { SubscriptionTier } from '../types';

/**
 * Plan-based AI limits configuration
 * Your plans: starter, gold, diamond, platinum
 * All users are PAID users (trial or active subscription)
 */
interface PlanLimits {
  perMinute: number;    // Max AI requests per minute
  perHour: number;      // Max AI requests per hour
  monthlyLimit: number; // Monthly AI limit (from Stripe config)
}

// AI limits synced with stripeService.ts PLANS and pricing page
const AI_LIMITS: Record<SubscriptionTier, PlanLimits> = {
  // Starter: 10 AI/month - no trial, charges immediately
  starter: {
    perMinute: 2,
    perHour: 10,
    monthlyLimit: 10,
  },
  // Gold: 30 AI/month - has 7-day trial
  gold: {
    perMinute: 3,
    perHour: 30,
    monthlyLimit: 30,
  },
  // Diamond: 50 AI/month - has 7-day trial
  diamond: {
    perMinute: 5,
    perHour: 50,
    monthlyLimit: 50,
  },
  // Platinum: 100 AI/month - no trial, charges immediately
  platinum: {
    perMinute: 10,
    perHour: 100,
    monthlyLimit: 100,
  },
  // Expired subscription - must renew to use AI
  expired: {
    perMinute: 0,
    perHour: 0,
    monthlyLimit: 0,
  },
  // "free" tier = no subscription yet (shouldn't happen, but handle gracefully)
  free: {
    perMinute: 0,
    perHour: 0,
    monthlyLimit: 0,
  },
};

/**
 * Get client identifier for rate limiting
 */
const getClientId = (req: Request): string => {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    const ips = Array.isArray(forwarded) ? forwarded[0] : forwarded.split(',')[0];
    return ips.trim();
  }
  return req.ip || 'unknown';
};

/**
 * Get user key for rate limiting (user ID or IP)
 */
const getUserKey = (req: Request): string => {
  const user = (req as Request & { user?: { id?: string } }).user;
  return user?.id ? `user:${user.id}` : `ip:${getClientId(req)}`;
};

/**
 * Format wait time for user-friendly message
 */
const formatWaitTime = (seconds: number): string => {
  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? 's' : ''}`;
  }
  const minutes = Math.ceil(seconds / 60);
  return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
};

/**
 * General API rate limiter
 * 100 requests per minute per IP
 */
export const generalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: getClientId,
  validate: false,
  handler: (_req: Request, res: Response) => {
    const retryAfter = Number(res.getHeader('Retry-After')) || 60;
    res.status(429).json({
      error: 'Too many requests',
      message: `You have exceeded the rate limit. Please wait ${formatWaitTime(retryAfter)} before trying again.`,
      retryAfter,
      retryAfterFormatted: formatWaitTime(retryAfter),
    });
  },
  skip: (req: Request) => req.path === '/health' || req.path === '/',
});

/**
 * PDF generation rate limiter (per minute)
 */
export const pdfLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: getClientId,
  validate: false,
  handler: (_req: Request, res: Response) => {
    const retryAfter = Number(res.getHeader('Retry-After')) || 60;
    res.status(429).json({
      error: 'PDF generation limit reached',
      message: `You can generate up to 10 PDFs per minute. Please wait ${formatWaitTime(retryAfter)}.`,
      retryAfter,
      retryAfterFormatted: formatWaitTime(retryAfter),
    });
  },
});

/**
 * PDF hourly rate limiter
 */
export const pdfHourlyLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: getClientId,
  validate: false,
  handler: (_req: Request, res: Response) => {
    const retryAfter = Number(res.getHeader('Retry-After')) || 3600;
    res.status(429).json({
      error: 'Hourly PDF limit reached',
      message: `You have reached the maximum of 50 PDF generations per hour. Please wait ${formatWaitTime(retryAfter)}.`,
      retryAfter,
      retryAfterFormatted: formatWaitTime(retryAfter),
    });
  },
});

/**
 * Authentication rate limiter (brute force protection)
 * OAuth needs higher limits due to callback redirects during testing
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30, // Increased for OAuth flows
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: getClientId,
  validate: false,
  handler: (_req: Request, res: Response) => {
    res.status(429).json({
      error: 'Too many login attempts',
      message: 'Too many authentication attempts. Please wait 15 minutes before trying again.',
      retryAfter: 900,
      retryAfterFormatted: '15 minutes',
    });
  },
  skipSuccessfulRequests: true,
});

/**
 * Webhook rate limiter (very permissive for Stripe)
 */
export const webhookLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Upload rate limiter
 */
export const uploadLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: getClientId,
  validate: false,
  handler: (_req: Request, res: Response) => {
    const retryAfter = Number(res.getHeader('Retry-After')) || 60;
    res.status(429).json({
      error: 'Upload limit reached',
      message: `You can upload up to 5 files per minute. Please wait ${formatWaitTime(retryAfter)}.`,
      retryAfter,
      retryAfterFormatted: formatWaitTime(retryAfter),
    });
  },
});

// ============================================
// PLAN-BASED AI RATE LIMITERS
// ============================================

/**
 * In-memory store for tracking AI requests per user
 *
 * NOTE: For production with multiple server instances, replace with Redis:
 *
 * import Redis from 'ioredis';
 * const redis = new Redis(process.env.REDIS_URL);
 *
 * Benefits of Redis:
 * - Persistence across server restarts
 * - Shared state across multiple server instances
 * - Automatic TTL for rate limit windows
 *
 * For single-instance deployments (Railway, small scale), this in-memory
 * store works fine - limits reset on server restart which is acceptable.
 */
const aiRequestStore = new Map<string, { minute: number; hour: number; minuteReset: number; hourReset: number }>();

/**
 * Get user's subscription tier from request
 */
const getUserTier = (req: Request): SubscriptionTier => {
  const user = (req as Request & { user?: { subscriptionTier?: string } }).user;
  const tier = user?.subscriptionTier?.toLowerCase();

  // Validate tier
  if (tier && tier in AI_LIMITS) {
    return tier as SubscriptionTier;
  }

  return 'free';
};

/**
 * Plan-based AI rate limiter middleware
 * Checks both per-minute and per-hour limits based on user's subscription
 */
export const aiLimiter = (req: Request, res: Response, next: NextFunction): void => {
  const userKey = getUserKey(req);
  const tier = getUserTier(req);
  const limits = AI_LIMITS[tier];
  const now = Date.now();

  // Check if user has a valid subscription
  if (tier === 'free' || tier === 'expired' || limits.perHour === 0) {
    const message = tier === 'expired'
      ? 'Your subscription has expired. Please renew to continue using AI features.'
      : 'You need an active subscription to use AI features. Please subscribe to a plan.';

    res.status(403).json({
      error: 'Subscription required',
      message,
      currentPlan: tier,
      requiresSubscription: true,
    });
    return;
  }

  // Get or create user's request tracking
  let tracking = aiRequestStore.get(userKey);

  if (!tracking) {
    tracking = {
      minute: 0,
      hour: 0,
      minuteReset: now + 60 * 1000,
      hourReset: now + 60 * 60 * 1000,
    };
    aiRequestStore.set(userKey, tracking);
  }

  // Reset counters if window expired
  if (now >= tracking.minuteReset) {
    tracking.minute = 0;
    tracking.minuteReset = now + 60 * 1000;
  }

  if (now >= tracking.hourReset) {
    tracking.hour = 0;
    tracking.hourReset = now + 60 * 60 * 1000;
  }

  // Check per-minute limit
  if (tracking.minute >= limits.perMinute) {
    const waitSeconds = Math.ceil((tracking.minuteReset - now) / 1000);
    res.status(429).json({
      error: 'AI rate limit reached',
      limitType: 'minute',
      message: `You can use AI ${limits.perMinute} time${limits.perMinute !== 1 ? 's' : ''} per minute. Please wait ${formatWaitTime(waitSeconds)}.`,
      retryAfter: waitSeconds,
      retryAfterFormatted: formatWaitTime(waitSeconds),
      currentPlan: tier,
      limits: {
        perMinute: limits.perMinute,
        perHour: limits.perHour,
        used: {
          minute: tracking.minute,
          hour: tracking.hour,
        },
      },
    });
    return;
  }

  // Check per-hour limit
  if (tracking.hour >= limits.perHour) {
    const waitSeconds = Math.ceil((tracking.hourReset - now) / 1000);
    const waitMinutes = Math.ceil(waitSeconds / 60);
    res.status(429).json({
      error: 'Hourly AI limit reached',
      limitType: 'hour',
      message: `You have used all ${limits.perHour} AI requests for this hour. Please wait ${waitMinutes} minute${waitMinutes !== 1 ? 's' : ''}.`,
      retryAfter: waitSeconds,
      retryAfterFormatted: formatWaitTime(waitSeconds),
      currentPlan: tier,
      limits: {
        perMinute: limits.perMinute,
        perHour: limits.perHour,
        used: {
          minute: tracking.minute,
          hour: tracking.hour,
        },
      },
    });
    return;
  }

  // Increment counters
  tracking.minute++;
  tracking.hour++;

  // Add info to response headers
  res.setHeader('X-RateLimit-Limit-Minute', limits.perMinute);
  res.setHeader('X-RateLimit-Remaining-Minute', limits.perMinute - tracking.minute);
  res.setHeader('X-RateLimit-Limit-Hour', limits.perHour);
  res.setHeader('X-RateLimit-Remaining-Hour', limits.perHour - tracking.hour);

  next();
};

/**
 * Global AI rate limiter (server protection)
 * Prevents overwhelming the server regardless of individual limits
 */
export const aiGlobalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100, // 100 total AI requests per minute across ALL users
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: () => 'global-ai',
  handler: (_req: Request, res: Response) => {
    res.status(429).json({
      error: 'Server AI capacity reached',
      message: 'Our AI service is experiencing high demand. Please try again in a moment.',
      retryAfter: 30,
      retryAfterFormatted: '30 seconds',
    });
  },
});

/**
 * Combined AI limiters (global + plan-based)
 * Use this for AI endpoints
 */
export const aiRateLimiters = [aiGlobalLimiter, aiLimiter];

/**
 * Contact form rate limiter
 * 3 submissions per 15 minutes per IP
 */
export const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: getClientId,
  validate: false,
  handler: (_req: Request, res: Response) => {
    res.status(429).json({
      error: 'Too many contact submissions',
      message: 'You can submit up to 3 messages per 15 minutes. Please wait before trying again.',
      retryAfter: 900,
      retryAfterFormatted: '15 minutes',
    });
  },
});

// Export plan limits for use in other parts of the app
export { AI_LIMITS };
