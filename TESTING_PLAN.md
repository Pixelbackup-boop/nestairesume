# AI Resume Builder - Comprehensive Testing Plan

This document outlines all tests needed for production readiness, organized by priority and category.

---

## Current Test Coverage Summary

| Area | Framework | Test Files | Tests | Status |
|------|-----------|------------|-------|--------|
| Backend Unit | Jest | 3 | ~45 | ✅ Exists |
| Backend Integration | Jest | 5 | ~95 | ✅ Exists |
| Backend Security | Jest | 1 | ~40 | ✅ Exists |
| Frontend Stores | Vitest | 3 | 61 | ✅ NEW |
| Frontend Hooks | Vitest | 1 | 14 | ✅ NEW |
| E2E Flows | Playwright | 7 | ~30 | ✅ Exists |

---

## Priority 1: Critical Path Tests (Before Production)

### 1.1 Frontend Component Tests (Vitest)

#### Editor Components - High Priority
```
tests/components/editor/
├── PersonalForm.test.tsx
│   - renders all input fields
│   - validates email format
│   - validates phone format
│   - handles profile image upload
│   - calls updatePersonalInfo on change
│   - shows validation errors
│
├── ExperienceSection.test.tsx
│   - renders experience list
│   - adds new experience
│   - edits existing experience
│   - deletes experience
│   - reorders experiences (move up/down)
│   - handles current job checkbox
│   - validates date ranges
│
├── EducationSection.test.tsx
│   - renders education list
│   - adds new education
│   - edits existing education
│   - deletes education
│   - handles optional fields (GPA, honors)
│
├── SkillsSection.test.tsx
│   - renders skills list
│   - adds new skill
│   - adjusts skill level (1-5)
│   - removes skill
│   - handles empty state
│
└── DesignTab.test.tsx
    - renders template options
    - changes template selection
    - changes theme/color
    - updates background settings
    - updates font settings
```

#### Download/Export - High Priority
```
tests/components/download/
└── DownloadModal.test.tsx
    - opens modal correctly
    - shows download options (PDF, DOCX)
    - calls PDF generation API
    - handles download errors
    - shows loading state
    - tracks download count
```

#### Authentication - High Priority
```
tests/components/auth/
└── AuthModal.test.tsx
    - renders login form
    - renders register form
    - validates email format
    - validates password requirements
    - handles login submission
    - handles register submission
    - shows error messages
    - handles OAuth buttons
```

### 1.2 Frontend Utility Tests (Vitest)

```
tests/lib/
├── api.test.ts
│   - adds auth header when token exists
│   - handles 401 and clears token
│   - handles network errors
│   - retries on failure (if implemented)
│
├── pdfService.test.ts
│   - calls backend PDF endpoint
│   - handles blob response
│   - triggers download
│   - handles errors gracefully
│
├── themes.test.ts
│   - returns correct colors for theme
│   - handles custom theme colors
│   - validates hex color format
│
└── analytics.test.ts
    - tracks page views
    - tracks events
    - respects consent settings
```

### 1.3 Backend Service Tests (Jest)

#### Missing Service Tests - High Priority
```
src/__tests__/unit/
├── resumeParserService.test.ts
│   - parses PDF resume correctly
│   - parses DOCX resume correctly
│   - extracts personal info
│   - extracts experience entries
│   - extracts education entries
│   - extracts skills
│   - handles malformed files
│   - handles unsupported formats
│
├── docxGeneratorService.test.ts
│   - generates valid DOCX
│   - includes all resume sections
│   - applies styling correctly
│   - handles missing optional fields
│   - handles special characters
│
├── emailService.test.ts
│   - sends verification email
│   - sends password reset email
│   - handles Brevo API errors
│   - validates email addresses
│   - respects rate limits
│
├── mockInterviewService.test.ts
│   - generates interview questions
│   - evaluates user responses
│   - provides feedback
│   - handles AI API errors
│   - respects usage limits
│
└── schedulerService.test.ts
    - schedules jobs correctly
    - executes jobs on schedule
    - handles job failures
    - prevents duplicate executions
```

### 1.4 Backend Integration Tests (Jest)

#### Missing Route Tests
```
src/__tests__/integration/
├── docx.test.ts
│   - generates DOCX from resume data
│   - requires authentication
│   - validates resume data
│   - returns correct content type
│   - handles template selection
│
├── resumeParser.test.ts
│   - accepts PDF uploads
│   - accepts DOCX uploads
│   - returns parsed data
│   - rejects invalid files
│   - respects file size limits
│
├── mockInterview.test.ts
│   - generates questions for job role
│   - evaluates interview responses
│   - requires authentication
│   - respects usage limits
│
├── community.test.ts
│   - lists community templates
│   - gets single template
│   - creates template (authenticated)
│   - likes template
│   - reports inappropriate content
│
└── admin.test.ts
    - requires admin role
    - returns dashboard stats
    - lists users
    - manages subscriptions
    - blocks unauthorized access
```

---

## Priority 2: Important Tests (Post-Launch Iteration)

### 2.1 Frontend Component Tests

#### Canvas Editor Components
```
tests/components/canvas/
├── CanvasWorkspace.test.tsx
│   - renders canvas correctly
│   - handles zoom in/out
│   - handles pan
│   - selects shapes
│   - moves shapes
│   - resizes shapes
│
├── CanvasToolbar.test.tsx
│   - renders all tools
│   - activates selected tool
│   - handles tool options
│
├── AIPopup.test.tsx
│   - opens on trigger
│   - submits AI request
│   - shows loading state
│   - displays generated content
│   - handles errors
│
└── IconsLibrary.test.tsx
    - renders icon categories
    - searches icons
    - inserts icon to canvas
```

#### Preview Components
```
tests/components/preview/
├── ResumePreview.test.tsx
│   - renders resume data
│   - applies selected template
│   - handles empty sections
│   - updates on data change
│
└── PagedPreview.test.tsx
    - shows page breaks
    - calculates page count
    - handles multi-page content
```

#### Template Components
```
tests/components/templates/
├── ClassicProfessional.test.tsx
├── HeaderDark.test.tsx
├── SidebarDarkNavy.test.tsx
└── MinimalBlueSections.test.tsx
    (Each template):
    - renders without errors
    - displays all sections
    - handles missing data gracefully
    - applies theme colors
    - generates correct HTML structure
```

### 2.2 Backend Template Tests

#### PDF Template Snapshot Tests
```
src/__tests__/templates/
├── classic-professional.test.ts
├── header-dark.test.ts
├── header-blue-clean.test.ts
├── sidebar-dark-navy.test.ts
└── ... (all 22 templates)
    (Each template):
    - generates valid HTML
    - includes all provided sections
    - handles empty sections
    - applies theme colors
    - snapshot test for regression
```

---

## Priority 3: Edge Case & Stress Tests

### 3.1 Edge Case Tests

```
tests/edge-cases/
├── largeResume.test.ts
│   - handles 20+ experience entries
│   - handles 50+ skills
│   - handles very long descriptions
│   - PDF generation doesn't timeout
│
├── unicodeContent.test.ts
│   - handles Arabic text (RTL)
│   - handles Chinese characters
│   - handles emojis
│   - handles special symbols
│
├── missingData.test.ts
│   - renders with only personal info
│   - renders with no experience
│   - renders with no education
│   - handles null/undefined values
│
└── concurrentOperations.test.ts
    - handles multiple simultaneous saves
    - handles rapid template switching
    - handles multiple PDF generations
```

### 3.2 Performance Tests

```
tests/performance/
├── pdfGeneration.perf.ts
│   - generates PDF under 5 seconds
│   - handles 10 concurrent generations
│   - memory doesn't leak on repeated calls
│
├── apiResponse.perf.ts
│   - GET /resumes responds under 200ms
│   - POST /resumes responds under 500ms
│   - template listing under 100ms
│
└── frontendRender.perf.ts
    - initial page load under 3s
    - template switch under 500ms
    - preview update under 200ms
```

---

## Priority 4: Security Tests (Ongoing)

### 4.1 Additional Security Tests

```
src/__tests__/security/
├── authentication.security.test.ts
│   - brute force protection works
│   - JWT tampering detected
│   - expired tokens rejected
│   - token refresh works correctly
│
├── authorization.security.test.ts
│   - users can't access others' resumes
│   - admin routes blocked for users
│   - subscription limits enforced
│
├── injection.security.test.ts
│   - SQL injection prevented
│   - XSS in resume content prevented
│   - command injection in file names prevented
│
├── fileUpload.security.test.ts
│   - rejects executable files
│   - validates file size limits
│   - sanitizes file names
│   - scans for malicious content
│
└── rateLimiting.security.test.ts
    - rate limits enforced per IP
    - rate limits enforced per user
    - webhook rate limits work
    - AI endpoint limits work
```

---

## E2E Test Additions (Playwright)

### Current Coverage ✅
- auth.spec.ts - Login/Register forms
- registration-flow.spec.ts - Full registration
- builder.spec.ts - Basic builder
- resume-builder.spec.ts - Multi-template
- ai-generation.spec.ts - AI content
- stripe-subscription.spec.ts - Payments
- homepage.spec.ts - Homepage

### Additional E2E Tests Needed
```
frontend/e2e/
├── template-switching.spec.ts
│   - switch between all template categories
│   - verify data persists across switches
│   - verify preview updates correctly
│
├── export-download.spec.ts
│   - download PDF successfully
│   - download DOCX successfully
│   - verify downloaded file is valid
│
├── resume-crud.spec.ts
│   - create new resume
│   - edit existing resume
│   - delete resume
│   - duplicate resume
│
├── subscription-limits.spec.ts
│   - free tier limits enforced
│   - upgrade flow works
│   - trial expiration handled
│
└── mobile-responsive.spec.ts
    - mobile viewport works
    - touch interactions work
    - responsive layout correct
```

---

## Test Implementation Priority

### Week 1: Critical (Must Have)
1. ✅ Vitest setup complete
2. ✅ Store tests complete (useAuthStore, useResumeStore, useUsageStore)
3. ✅ Hook tests complete (useLimitCheck)
4. [ ] PersonalForm.test.tsx
5. [ ] DownloadModal.test.tsx
6. [ ] api.test.ts
7. [ ] pdfService.test.ts

### Week 2: High Priority
1. [ ] ExperienceSection.test.tsx
2. [ ] EducationSection.test.tsx
3. [ ] AuthModal.test.tsx
4. [ ] resumeParserService.test.ts
5. [ ] docxGeneratorService.test.ts
6. [ ] emailService.test.ts

### Week 3: Integration & E2E
1. [ ] docx.test.ts (integration)
2. [ ] resumeParser.test.ts (integration)
3. [ ] template-switching.spec.ts (e2e)
4. [ ] export-download.spec.ts (e2e)

### Week 4: Edge Cases & Polish
1. [ ] Template snapshot tests
2. [ ] Edge case tests
3. [ ] Performance benchmarks
4. [ ] Security audit tests

---

## Running Tests

### Frontend (Vitest)
```bash
cd frontend
npm run test          # Watch mode
npm run test:run      # Single run
npm run test:coverage # With coverage
npm run test:ui       # Visual UI
```

### Backend (Jest)
```bash
cd backend
npm test              # All tests
npm run test:unit     # Unit only
npm run test:integration # Integration only
npm run test:coverage # With coverage
```

### E2E (Playwright)
```bash
cd frontend
npx playwright test              # All tests
npx playwright test auth.spec.ts # Single file
npx playwright test --ui         # Visual UI
npx playwright show-report       # View report
```

---

## Test File Naming Conventions

- Unit tests: `*.test.ts` or `*.test.tsx`
- Integration tests: `*.test.ts` in `integration/` folder
- E2E tests: `*.spec.ts` in `e2e/` folder
- Security tests: `*.security.test.ts`
- Performance tests: `*.perf.ts`

---

## Coverage Goals

| Category | Current | Target |
|----------|---------|--------|
| Frontend Stores | 90%+ | 95% |
| Frontend Hooks | 80%+ | 90% |
| Frontend Components | 0% | 70% |
| Backend Services | ~60% | 85% |
| Backend Routes | ~70% | 85% |
| E2E Critical Paths | ~80% | 95% |

---

## Notes

1. **Mock Strategy**: Use MSW (Mock Service Worker) for frontend API mocking in component tests
2. **Database**: Backend tests use SQLite in-memory for speed
3. **Puppeteer**: PDF tests may be slow; consider separate test suite
4. **CI/CD**: All tests should run in GitHub Actions before merge
