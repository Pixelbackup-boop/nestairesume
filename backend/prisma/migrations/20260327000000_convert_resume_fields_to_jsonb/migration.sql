-- Convert Resume JSON text fields to native jsonb
-- Handles both TEXT and JSONB columns (in case a prior partial run already converted some).
-- Uses a helper function to safely parse JSON, returning NULL for any invalid values.

CREATE OR REPLACE FUNCTION _safe_jsonb(val TEXT) RETURNS JSONB AS $$
BEGIN
  IF val IS NULL OR val = '' OR BTRIM(val) = '' THEN RETURN NULL; END IF;
  RETURN val::jsonb;
EXCEPTION WHEN OTHERS THEN RETURN NULL;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Also create an overload for JSONB input (no-op passthrough) so the function
-- works on columns that were already converted by a prior partial migration.
CREATE OR REPLACE FUNCTION _safe_jsonb(val JSONB) RETURNS JSONB AS $$
BEGIN
  RETURN val;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

ALTER TABLE "Resume"
  ALTER COLUMN "experiences"    TYPE JSONB USING _safe_jsonb("experiences"),
  ALTER COLUMN "education"      TYPE JSONB USING _safe_jsonb("education"),
  ALTER COLUMN "skills"         TYPE JSONB USING _safe_jsonb("skills"),
  ALTER COLUMN "certifications" TYPE JSONB USING _safe_jsonb("certifications"),
  ALTER COLUMN "projects"       TYPE JSONB USING _safe_jsonb("projects"),
  ALTER COLUMN "languages"      TYPE JSONB USING _safe_jsonb("languages");

DROP FUNCTION _safe_jsonb(TEXT);
DROP FUNCTION _safe_jsonb(JSONB);
