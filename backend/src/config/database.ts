import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: {
    db: {
      // Append connection pool params if not already in DATABASE_URL
      // connection_limit=5: max 5 connections per Cloud Run instance (20 instances × 5 = 100 max)
      // pool_timeout=10: wait 10s for a free connection before erroring
      url: appendPoolParams(process.env.DATABASE_URL || ""),
    },
  },
  log: process.env.NODE_ENV === "production" ? ["error"] : ["query", "error", "warn"],
});

function appendPoolParams(url: string): string {
  if (!url || url.startsWith("file:")) return url; // SQLite dev DB
  if (url.includes("connection_limit")) return url; // Already configured
  // Cloud SQL socket URLs (host=/cloudsql/...) contain colons that break
  // Prisma's URL parser when additional query params are appended.
  // Prisma's built-in pool (num_cpus * 2 + 1) is sufficient for Cloud Run.
  if (url.includes("/cloudsql/")) return url;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}connection_limit=5&pool_timeout=10`;
}

export default prisma;
