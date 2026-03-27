-- Migration: Convert Resume JSON text fields to native jsonb
-- Run against production PostgreSQL before deploying the updated backend.
--
-- These columns were previously TEXT storing JSON strings.
-- The USING clause casts existing text data to jsonb automatically.
-- If any row has malformed JSON in these columns, the ALTER will fail —
-- run the diagnostic query below first to catch any bad rows.

-- Diagnostic: find rows with invalid JSON before migrating
-- SELECT id, 'experiences' AS col FROM "Resume" WHERE experiences IS NOT NULL AND experiences::text !~ '^[\[\{]';

ALTER TABLE "Resume"
  ALTER COLUMN experiences TYPE JSONB USING CASE WHEN experiences = '' THEN NULL ELSE experiences::jsonb END,
  ALTER COLUMN education   TYPE JSONB USING CASE WHEN education   = '' THEN NULL ELSE education::jsonb   END,
  ALTER COLUMN skills      TYPE JSONB USING CASE WHEN skills      = '' THEN NULL ELSE skills::jsonb       END,
  ALTER COLUMN certifications TYPE JSONB USING CASE WHEN certifications = '' THEN NULL ELSE certifications::jsonb END,
  ALTER COLUMN projects    TYPE JSONB USING CASE WHEN projects    = '' THEN NULL ELSE projects::jsonb     END,
  ALTER COLUMN languages   TYPE JSONB USING CASE WHEN languages   = '' THEN NULL ELSE languages::jsonb   END;
