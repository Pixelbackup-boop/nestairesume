#!/usr/bin/env bash
# One-time migration: Cloud SQL (resume_production) → serverless Postgres (Neon/Supabase).
#
# Prereqs:
#   1. Temporarily authorize this machine's IP on the Cloud SQL instance:
#        gcloud sql instances patch resume-db --authorized-networks="$(curl -s ifconfig.me)/32" --quiet
#   2. export SOURCE_URL='postgresql://postgres:<password>@35.226.55.171/resume_production'
#   3. export TARGET_URL='<direct (non-pooled) connection string of the new database>'
#
# After the script reports success:
#   - Update the DATABASE_URL GitHub secret to the new POOLED connection string
#     (Neon: the "-pooler" host; append ?pgbouncer=true&connect_timeout=15 for Prisma)
#   - Keep the DIRECT URL at hand for `prisma migrate deploy` (poolers can't run migrations)
#   - Redeploy the backend, verify /health/detailed, then:
#        gcloud sql instances patch resume-db --clear-authorized-networks --quiet
#   - Once stable for a few days: stop (then delete) the Cloud SQL instance.

set -euo pipefail
: "${SOURCE_URL:?export SOURCE_URL=… (see header)}"
: "${TARGET_URL:?export TARGET_URL=… (see header)}"

# psql/pg_dump 15 to match the server version
PGBIN="/usr/local/Cellar/postgresql@15/15.17/bin"
DUMP="backups/prod_$(date +%Y%m%d_%H%M%S).dump"

echo "1/3 Dumping production database…"
"$PGBIN/pg_dump" "$SOURCE_URL" -Fc -f "$DUMP"
echo "    → $DUMP ($(du -h "$DUMP" | cut -f1))"

echo "2/3 Restoring into target…"
"$PGBIN/pg_restore" --no-owner --no-acl -d "$TARGET_URL" "$DUMP"

echo "3/3 Comparing row counts (n_live_tup is an estimate — spot-check key tables on mismatch)…"
Q="SELECT relname, n_live_tup FROM pg_stat_user_tables ORDER BY relname;"
if diff <("$PGBIN/psql" "$SOURCE_URL" -Atc "$Q") <("$PGBIN/psql" "$TARGET_URL" -Atc "$Q"); then
    echo "✅ Row counts match — proceed with the DATABASE_URL secret swap (see header)"
else
    echo "⚠️  Differences listed above"
fi
