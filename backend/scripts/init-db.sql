-- PostgreSQL Initialization Script
-- This runs automatically when the Docker container starts for the first time

-- Enable UUID extension (used for default UUIDs)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable pg_trgm for text search (optional, for future use)
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Grant privileges (if needed for non-superuser connections)
-- GRANT ALL PRIVILEGES ON DATABASE resumebuilder TO postgres;

-- Note: Prisma will handle all table creation via migrations
-- This script only sets up PostgreSQL extensions
