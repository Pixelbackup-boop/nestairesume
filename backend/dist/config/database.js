"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({
    datasources: {
        db: {
            url: normalizeDbUrl(process.env.DATABASE_URL || ""),
        },
    },
    log: process.env.NODE_ENV === "production" ? ["error"] : ["query", "error", "warn"],
});
/**
 * Normalize DATABASE_URL for Prisma compatibility.
 * Cloud SQL socket URLs like postgresql://user:pass@/dbname?host=/cloudsql/...
 * have an empty host field. Prisma requires a placeholder host even for Unix
 * socket connections — insert "localhost" so the URL parses correctly.
 */
function normalizeDbUrl(url) {
    if (!url || url.startsWith("file:"))
        return url;
    // Fix empty host: ://@/ → ://@localhost/
    if (url.includes("@/") && url.includes("/cloudsql/")) {
        url = url.replace("@/", "@localhost/");
    }
    return url;
}
exports.default = prisma;
//# sourceMappingURL=database.js.map