-- AppSetting: key-value store for admin-editable site settings (ads/tawk/trustpilot).
-- Matches `model AppSetting` in frontend/prisma/schema.prisma.
-- Generated per the D1 workflow (prisma migrate diff + wrangler d1 execute).
--
-- Apply locally:  npx wrangler d1 execute bestairesume-db --local  --file migrations/0001_app_setting.sql
-- Apply remotely: npx wrangler d1 execute bestairesume-db --remote --file migrations/0001_app_setting.sql
--
-- Status: already applied to BOTH local miniflare D1 and remote production D1
-- (remote verified 2026-08-13 — sqlite_master DDL matches). Idempotent either way.
CREATE TABLE IF NOT EXISTS "AppSetting" ("key" TEXT NOT NULL PRIMARY KEY, "value" TEXT NOT NULL, "updatedAt" DATETIME NOT NULL);
