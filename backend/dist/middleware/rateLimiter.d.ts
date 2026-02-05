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
export declare const generalLimiter: any;
/**
 * PDF generation rate limiter (per minute)
 */
export declare const pdfLimiter: any;
/**
 * PDF hourly rate limiter
 */
export declare const pdfHourlyLimiter: any;
/**
 * Authentication rate limiter (brute force protection)
 * OAuth needs higher limits due to callback redirects during testing
 */
export declare const authLimiter: any;
/**
 * Webhook rate limiter (very permissive for Stripe)
 */
export declare const webhookLimiter: any;
/**
 * Upload rate limiter
 */
export declare const uploadLimiter: any;
/**
 * Plan-based AI rate limiter middleware
 * Checks both per-minute and per-hour limits based on user's subscription
 */
export declare const aiLimiter: (req: Request, res: Response, next: NextFunction) => void;
/**
 * Global AI rate limiter (server protection)
 * Prevents overwhelming the server regardless of individual limits
 */
export declare const aiGlobalLimiter: any;
/**
 * Combined AI limiters (global + plan-based)
 * Use this for AI endpoints
 */
export declare const aiRateLimiters: any[];
export { AI_LIMITS };
//# sourceMappingURL=rateLimiter.d.ts.map