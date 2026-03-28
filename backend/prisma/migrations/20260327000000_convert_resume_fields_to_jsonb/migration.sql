-- Convert Resume JSON text fields to native jsonb
-- Uses a helper function to safely parse JSON, returning NULL for any invalid values.

CREATE OR REPLACE FUNCTION _safe_jsonb(val TEXT) RETURNS JSONB AS $$
BEGIN
  IF val IS NULL OR val = '' OR BTRIM(val) = '' THEN RETURN NULL; END IF;
  RETURN val::jsonb;
EXCEPTION WHEN OTHERS THEN RETURN NULL;
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
