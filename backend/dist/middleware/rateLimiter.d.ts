/**
 * Rate Limiting Middleware
 * Protects API endpoints from abuse, especially PDF generation and AI calls
 */
import { Request, Response, NextFunction } from 'express';
import { SubscriptionTier } from '../types';
/**
 * Plan-based AI limits configuration
 * Your plans: starter, gold, diamond, platinum
 * All users are PAID users (trial or active subscription)
 */
interface PlanLimits {
    perMinute: number;
    perHour: number;
    monthlyLimit: number;
}
declare const AI_LIMITS: Record<SubscriptionTier, PlanLimits>;
/**
 * General API rate limiter
 * 100 requests per minute per IP
 */
export declare const generalLimiter: import("express-rate-limit").RateLimitRequestHandler;
/**
 * PDF generation rate limiter (per minute)
 */
export declare const pdfLimiter: import("express-rate-limit").RateLimitRequestHandler;
/**
 * PDF hourly rate limiter
 */
export declare const pdfHourlyLimiter: import("express-rate-limit").RateLimitRequestHandler;
/**
 * Authentication rate limiter (brute force protection)
 * OAuth needs higher limits due to callback redirects during testing
 */
export declare const authLimiter: import("express-rate-limit").RateLimitRequestHandler;
/**
 * Webhook rate limiter (very permissive for Stripe)
 */
export declare const webhookLimiter: import("express-rate-limit").RateLimitRequestHandler;
/**
 * Upload rate limiter
 */
export declare const uploadLimiter: import("express-rate-limit").RateLimitRequestHandler;
/**
 * Plan-based AI rate limiter middleware
 * Checks both per-minute and per-hour limits based on user's subscription
 */
export declare const aiLimiter: (req: Request, res: Response, next: NextFunction) => void;
/**
 * Global AI rate limiter (server protection)
 * Prevents overwhelming the server regardless of individual limits
 */
export declare const aiGlobalLimiter: import("express-rate-limit").RateLimitRequestHandler;
/**
 * Combined AI limiters (global + plan-based)
 * Use this for AI endpoints
 */
export declare const aiRateLimiters: ((req: Request, res: Response, next: NextFunction) => void)[];
/**
 * Contact form rate limiter
 * 3 submissions per 15 minutes per IP
 */
export declare const contactLimiter: import("express-rate-limit").RateLimitRequestHandler;
export { AI_LIMITS };
//# sourceMappingURL=rateLimiter.d.ts.map