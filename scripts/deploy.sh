#!/bin/bash
# Quick deployment script for AI Resume Builder
# Usage: ./scripts/deploy.sh [backend|frontend|all]

set -e

COMPONENT=${1:-"all"}

deploy_backend() {
  echo "🚀 Deploying backend to Cloud Run..."
  gcloud builds submit --config=cloudbuild-backend.yaml
  echo "✅ Backend deployed!"
}

deploy_frontend() {
  echo "🚀 Triggering Vercel deployment..."
  # Vercel auto-deploys on push, but you can trigger manually:
  cd frontend
  if command -v vercel &> /dev/null; then
    vercel --prod
  else
    echo "ℹ️  Vercel CLI not installed. Push to GitHub to trigger deployment."
    echo "   Or install: npm i -g vercel"
  fi
  cd ..
  echo "✅ Frontend deployment triggered!"
}

case $COMPONENT in
  backend)
    deploy_backend
    ;;
  frontend)
    deploy_frontend
    ;;
  all)
    deploy_backend
    deploy_frontend
    ;;
  *)
    echo "Usage: ./scripts/deploy.sh [backend|frontend|all]"
    exit 1
    ;;
esac

echo ""
echo "🎉 Deployment complete!"
