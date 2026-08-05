import { PrismaClient } from '@prisma/client';
import { PrismaD1 } from '@prisma/adapter-d1';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import type { D1Database } from '@cloudflare/workers-types';

interface CloudflareEnv {
    DB: D1Database;
    JWT_SECRET?: string;
    NEXTAUTH_SECRET?: string;
    BREVO_API_KEY?: string;
    DEEPSEEK_API_KEY?: string;
    STRIPE_SECRET_KEY?: string;
    STRIPE_WEBHOOK_SECRET?: string;
}

export function getEnv(): CloudflareEnv {
    return getCloudflareContext().env as unknown as CloudflareEnv;
}

export function getDb(): PrismaClient {
    const adapter = new PrismaD1(getEnv().DB);
    return new PrismaClient({ adapter });
}
