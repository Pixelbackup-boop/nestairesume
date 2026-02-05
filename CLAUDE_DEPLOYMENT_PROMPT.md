# Claude Code Deployment Prompt

Copy and paste this prompt into a new Claude Code session to start deployment:

---

## Prompt to Use:

```
Help me deploy my AI Resume Builder project to production.

Project location: /Users/elw/Documents/Test/AI/AI-Resume-Builder

Stack:
- Frontend: Next.js → Deploy to Vercel
- Backend: Express/Node.js → Deploy to Google Cloud Run
- Database: PostgreSQL → Cloud SQL
- Payments: Stripe

I have already:
1. GitHub Actions workflow at .github/workflows/deploy.yml
2. Deployment guide at DEPLOYMENT_GUIDE.md

Please help me:
1. First verify the E2E tests pass (103 tests)
2. Then guide me through setting up GitHub secrets
3. Help me configure Vercel
4. Help me configure Google Cloud Run
5. Commit and push to trigger deployment

Start by running the tests to make sure everything is ready.
```

---

## Quick Commands Reference

### Run Tests
```bash
cd frontend && npx playwright test
```

### Check Git Status
```bash
git status
```

### Commit and Deploy
```bash
git add .
git commit -m "Deploy to production"
git push origin main
```

### View Cloud Run Logs
```bash
gcloud run logs tail --service=resume-backend --region=us-central1
```

### View Deployment Status
Go to: https://github.com/YOUR_USERNAME/YOUR_REPO/actions

---

## Checklist Before Starting

- [ ] Google Cloud account created
- [ ] Vercel account created
- [ ] Stripe account with live keys ready
- [ ] Domain name (optional)
- [ ] gcloud CLI installed (`brew install google-cloud-sdk`)
- [ ] Vercel CLI installed (`npm i -g vercel`)
