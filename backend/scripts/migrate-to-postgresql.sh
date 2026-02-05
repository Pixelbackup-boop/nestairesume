#!/bin/bash
# PostgreSQL Migration Script
# Run this script to migrate from SQLite to PostgreSQL

set -e

echo "========================================="
echo "PostgreSQL Migration Script"
echo "========================================="

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "ERROR: DATABASE_URL environment variable is not set"
    echo ""
    echo "Please set DATABASE_URL to your PostgreSQL connection string:"
    echo "  export DATABASE_URL=\"postgresql://user:password@host:5432/dbname?schema=public\""
    echo ""
    echo "For Railway:"
    echo "  export DATABASE_URL=\"\$RAILWAY_DATABASE_URL\""
    echo ""
    echo "For local Docker:"
    echo "  export DATABASE_URL=\"postgresql://postgres:postgres@localhost:5432/resumebuilder?schema=public\""
    exit 1
fi

# Check if this is a PostgreSQL URL
if [[ ! "$DATABASE_URL" == postgresql://* ]] && [[ ! "$DATABASE_URL" == postgres://* ]]; then
    echo "ERROR: DATABASE_URL does not appear to be a PostgreSQL connection string"
    echo "Current value: $DATABASE_URL"
    exit 1
fi

echo "Database URL detected: ${DATABASE_URL:0:30}..."
echo ""

# Backup current schema (optional)
echo "Step 1: Backing up current SQLite schema..."
cp prisma/schema.prisma prisma/schema.sqlite.backup 2>/dev/null || true

# Switch to PostgreSQL schema
echo "Step 2: Switching to PostgreSQL schema..."
cp prisma/schema.postgresql.prisma prisma/schema.prisma

# Generate Prisma client
echo "Step 3: Generating Prisma client..."
npx prisma generate

# Check if we should run migrations
echo ""
echo "Step 4: Migration options"
echo "  [1] Fresh database - Run 'prisma migrate deploy' (production)"
echo "  [2] Development - Run 'prisma migrate dev' (creates migration history)"
echo "  [3] Reset database - Run 'prisma migrate reset' (DELETES ALL DATA)"
echo "  [4] Push schema only - Run 'prisma db push' (no migration history)"
echo "  [5] Skip - I'll run migrations manually"
echo ""
read -p "Choose option (1-5): " choice

case $choice in
    1)
        echo "Running prisma migrate deploy..."
        npx prisma migrate deploy
        ;;
    2)
        echo "Running prisma migrate dev..."
        npx prisma migrate dev --name postgresql_migration
        ;;
    3)
        echo "WARNING: This will DELETE ALL DATA!"
        read -p "Are you sure? (yes/no): " confirm
        if [ "$confirm" == "yes" ]; then
            npx prisma migrate reset --force
        fi
        ;;
    4)
        echo "Running prisma db push..."
        npx prisma db push
        ;;
    5)
        echo "Skipping migrations. Run them manually:"
        echo "  npx prisma migrate deploy  # For production"
        echo "  npx prisma migrate dev     # For development"
        ;;
    *)
        echo "Invalid choice. Skipping migrations."
        ;;
esac

echo ""
echo "========================================="
echo "Migration script complete!"
echo ""
echo "Next steps:"
echo "  1. Verify your PostgreSQL connection"
echo "  2. Run tests: npm test"
echo "  3. Start the server: npm run dev"
echo "========================================="
