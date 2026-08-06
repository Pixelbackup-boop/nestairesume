/**
 * Legacy Prisma singleton, now backed by D1 (Cloudflare Workers).
 *
 * The classic `new PrismaClient()` needs a DATABASE_URL + native engine —
 * neither exists on Workers. This lazy proxy resolves the D1-backed client
 * per property access so legacy imports (`import { prisma } from '@/lib/prisma'`)
 * keep working inside request handlers without module-scope bindings.
 */
import type { PrismaClient } from '@/lib/generated/prisma/client';
import { getDb } from '@/lib/server/db';

export const prisma: PrismaClient = new Proxy({} as PrismaClient, {
    get(_target, prop: string | symbol) {
        const db = getDb() as unknown as Record<string | symbol, unknown>;
        return db[prop];
    },
});
