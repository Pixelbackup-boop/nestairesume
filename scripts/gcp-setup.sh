#!/bin/bash
# GCP Setup Script for AI Resume Builder
# Run this script after creating your GCP project

set -e

# Configuration - UPDATE THESE VALUES
PROJECT_ID="ai-resume-builder-prod"
REGION="us-central1"
ARTIFACT_REPO="resume-builder"
DB_INSTANCE_NAME="resume-db"
DB_NAME="resume_builder"
DB_USER="resume_app"

echo "🚀 Starting GCP Setup for AI Resume Builder"
echo "============================================="
echo "Project ID: $PROJECT_ID"
echo "Region: $REGION"
echo ""

# Set project
gcloud config set project $PROJECT_ID

# Enable required APIs
echo "📦 Enabling required APIs..."
gcloud services enable \
  cloudbuild.googleapis.com \
  run.googleapis.com \
  sqladmin.googleapis.com \
  secretmanager.googleapis.com \
  artifactregistry.googleapis.com \
  compute.googleapis.com \
  servicenetworking.googleapis.com

echo "✅ APIs enabled"

# Create Artifact Registry repository
echo "📦 Creating Artifact Registry repository..."
gcloud artifacts repositories create $ARTIFACT_REPO \
  --repository-format=docker \
  --location=$REGION \
  --description="Docker images for Resume Builder" \
  || echo "Repository already exists"

echo "✅ Artifact Registry ready"

# Create Cloud SQL instance
echo "🗄️ Creating Cloud SQL PostgreSQL instance..."
echo "⚠️ This may take 5-10 minutes..."

gcloud sql instances create $DB_INSTANCE_NAME \
  --database-version=POSTGRES_15 \
  --tier=db-f1-micro \
  --region=$REGION \
  --storage-type=SSD \
  --storage-size=10GB \
  --backup-start-time=03:00 \
  --availability-type=zonal \
  || echo "Instance may already exist"

# Create database
echo "📊 Creating database..."
gcloud sql databases create $DB_NAME \
  --instance=$DB_INSTANCE_NAME \
  || echo "Database may already exist"

# Generate random password for DB user
DB_PASSWORD=$(openssl rand -base64 24 | tr -d '/+=')

# Create database user
echo "👤 Creating database user..."
gcloud sql users create $DB_USER \
  --instance=$DB_INSTANCE_NAME \
  --password=$DB_PASSWORD \
  || echo "User may already exist"

# Get Cloud SQL connection name
CONNECTION_NAME=$(gcloud sql instances describe $DB_INSTANCE_NAME --format='value(connectionName)')

echo "✅ Cloud SQL setup complete"
echo ""
echo "📝 Save these values:"
echo "   Database Password: $DB_PASSWORD"
echo "   Connection Name: $CONNECTION_NAME"
echo ""

# Create secrets
echo "🔐 Setting up Secret Manager..."
echo "You'll need to add your actual secret values."

# Function to create secret if not exists
create_secret() {
  local name=$1
  local value=$2

  if gcloud secrets describe $name &>/dev/null; then
    echo "   Secret $name already exists"
  else
    echo -n "$value" | gcloud secrets create $name --data-file=- --replication-policy="automatic"
    echo "   ✅ Created $name"
  fi
}

# Create placeholder secrets (you'll update these with real values)
create_secret "DATABASE_URL" "postgresql://$DB_USER:$DB_PASSWORD@/$DB_NAME?host=/cloudsql/$CONNECTION_NAME"
create_secret "JWT_SECRET" "$(openssl rand -base64 32)"
create_secret "NEXTAUTH_SECRET" "$(openssl rand -base64 32)"
create_secret "STRIPE_SECRET_KEY" "sk_live_REPLACE_ME"
create_secret "STRIPE_WEBHOOK_SECRET" "whsec_REPLACE_ME"
create_secret "OPENAI_API_KEY" "sk-REPLACE_ME"
create_secret "BREVO_API_KEY" "xkeysib-REPLACE_ME"
create_secret "SENTRY_DSN" "https://REPLACE_ME@sentry.io/xxx"
create_secret "GOOGLE_CLIENT_ID" "REPLACE_ME.apps.googleusercontent.com"
create_secret "GOOGLE_CLIENT_SECRET" "REPLACE_ME"

echo "✅ Secrets created (update placeholder values in Secret Manager console)"

# Grant Cloud Run access to secrets
echo "🔑 Granting Cloud Run access to secrets..."
PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format='value(projectNumber)')
CLOUD_RUN_SA="${PROJECT_NUMBER}-compute@developer.gserviceaccount.com"

for secret in DATABASE_URL JWT_SECRET NEXTAUTH_SECRET STRIPE_SECRET_KEY STRIPE_WEBHOOK_SECRET OPENAI_API_KEY BREVO_API_KEY SENTRY_DSN GOOGLE_CLIENT_ID GOOGLE_CLIENT_SECRET; do
  gcloud secrets add-iam-policy-binding $secret \
    --member="serviceAccount:$CLOUD_RUN_SA" \
    --role="roles/secretmanager.secretAccessor" \
    --quiet
done

# Grant Cloud Build permissions
echo "🔧 Granting Cloud Build permissions..."
CLOUD_BUILD_SA="${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$CLOUD_BUILD_SA" \
  --role="roles/run.admin" \
  --quiet

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$CLOUD_BUILD_SA" \
  --role="roles/iam.serviceAccountUser" \
  --quiet

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$CLOUD_BUILD_SA" \
  --role="roles/secretmanager.secretAccessor" \
  --quiet

echo "✅ Permissions configured"

echo ""
echo "============================================="
echo "🎉 GCP Setup Complete!"
echo "============================================="
echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Update secrets with real values in Secret Manager:"
echo "   https://console.cloud.google.com/security/secret-manager?project=$PROJECT_ID"
echo ""
echo "2. Connect GitHub repository to Cloud Build:"
echo "   https://console.cloud.google.com/cloud-build/triggers?project=$PROJECT_ID"
echo ""
echo "3. Run database migrations (first deployment):"
echo "   gcloud builds submit --config=cloudbuild-migrate.yaml"
echo ""
echo "4. Your Cloud SQL connection string:"
echo "   postgresql://$DB_USER:$DB_PASSWORD@/$DB_NAME?host=/cloudsql/$CONNECTION_NAME"
echo ""
