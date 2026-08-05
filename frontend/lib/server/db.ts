import { PrismaClient } from '@/lib/generated/prisma/client';
import { PrismaD1 } from '@prisma/adapter-d1';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import type { D1Database } from '@cloudflare/workers-types';
import type { BrowserWorker } from '@cloudflare/puppeteer';

interface CloudflareEnv {
    DB: D1Database;
    /** Browser Rendering binding for PDF generation (wrangler.jsonc "browser") */
    BROWSER?: BrowserWorker;
    JWT_SECRET?: string;
    NEXTAUTH_SECRET?: string;
    BREVO_API_KEY?: string;
    DEEPSEEK_API_KEY?: string;
    STRIPE_SECRET_KEY?: string;
    STRIPE_WEBHOOK_SECRET?: string;
    /** Backend config.frontendUrl equivalent; when unset, payment routes derive it from the request */
    FRONTEND_URL?: string;
    // Stripe price IDs (wrangler.jsonc vars)
    STRIPE_PRICE_STARTER?: string;
    STRIPE_PRICE_GOLD?: string;
    STRIPE_PRICE_DIAMOND?: string;
    STRIPE_PRICE_PLATINUM?: string;
    STRIPE_PRICE_STARTER_ANNUAL?: string;
    STRIPE_PRICE_GOLD_ANNUAL?: string;
    STRIPE_PRICE_DIAMOND_ANNUAL?: string;
    STRIPE_PRICE_PLATINUM_ANNUAL?: string;
}

export function getEnv(): CloudflareEnv {
    return getCloudflareContext().env as unknown as CloudflareEnv;
}

export function getDb(): PrismaClient {
    const adapter = new PrismaD1(getEnv().DB);
    return new PrismaClient({ adapter });
}
