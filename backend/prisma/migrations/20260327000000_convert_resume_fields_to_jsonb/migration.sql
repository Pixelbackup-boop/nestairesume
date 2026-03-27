-- Convert Resume JSON text fields to native jsonb
-- Empty strings are converted to NULL to avoid jsonb parse errors.

ALTER TABLE "Resume"
  ALTER COLUMN "experiences" TYPE JSONB USING CASE WHEN "experiences" = '' THEN NULL ELSE "experiences"::jsonb END,
  ALTER COLUMN "education"   TYPE JSONB USING CASE WHEN "education"   = '' THEN NULL ELSE "education"::jsonb   END,
  ALTER COLUMN "skills"      TYPE JSONB USING CASE WHEN "skills"      = '' THEN NULL ELSE "skills"::jsonb      END,
  ALTER COLUMN "certifications" TYPE JSONB USING CASE WHEN "certifications" = '' THEN NULL ELSE "certifications"::jsonb END,
  ALTER COLUMN "projects"    TYPE JSONB USING CASE WHEN "projects"    = '' THEN NULL ELSE "projects"::jsonb    END,
  ALTER COLUMN "languages"   TYPE JSONB USING CASE WHEN "languages"   = '' THEN NULL ELSE "languages"::jsonb   END;
