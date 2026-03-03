# Locale Expansion Checklist

> **How to use:** When starting a new language:
> 1. First, research and provide the keyword CSV file: `seo/{LANGUAGE}-keywords.csv`
> 2. Then tell Claude: *"Expand locale `{LOCALE}` to full parity per `LOCALE_EXPANSION_CHECKLIST.md`. Keywords are in `seo/{LANGUAGE}-keywords.csv`."*
>
> Claude will follow every step below, using Spanish (es) as the reference implementation.
>
> **IMPORTANT:** The keyword file is a PREREQUISITE. Claude uses these keywords to:
> - Create unique blog posts targeting high-volume search terms (not just translating English posts)
> - Inject keywords into resume example titles, descriptions, and tags
> - Inject keywords into cover letter titles, descriptions, and tags
> - Optimize landing page content with locale-specific search terms
> - ALL content is keyword-optimized, not just literal translations

---

## Current Status

| Locale | Code | UI JSON | Resume Examples (554) | Cover Letters (566) | Blog Posts (~73) | Career Tips (10) | Landing Pages (21 files) | Status |
|--------|------|---------|----------------------|--------------------|-----------------|-----------------|-----------------------|--------|
| English | en | ✅ | ✅ 554 | ✅ 566 | ✅ 70 | ✅ 10 | ✅ | **Complete** |
| Spanish | es | ✅ | ✅ 554 | ✅ 566 | ✅ 73 | ✅ 10 | ✅ | **Complete** |
| French | fr | ✅ | ✅ 554 | ✅ 566 | ✅ 74 | ✅ 10 | ✅ | **Complete** |
| German | de | ✅ | ✅ 554 | ✅ 566 | ✅ 73 | ✅ 10 | ✅ | **Complete** |
| Arabic | ar | ✅ | ✅ 554 | ✅ 566 | ✅ 73 | ✅ 10 | ✅ | **Complete** |
| Italian | it | ✅ | ✅ 554 | ✅ 566 | ✅ 73 | ✅ 10 | ✅ | **Complete** |
| Portuguese | pt | ✅ | ✅ 554 | ✅ 566 | ✅ 73 | ✅ 10 | ✅ | **Complete** |
| Japanese | ja | ✅ | ✅ 554 | ✅ 566 | ✅ 73 | ✅ 10 | ✅ | **Complete** |
| Chinese | zh | ✅ | ❌ 0 | ❌ 0 | ❌ 0 | ❌ 0 | ❌ | **UI Only** |
| Korean | ko | ✅ | ✅ 554 | ✅ 566 | ✅ 73 | ✅ 10 | ✅ | **Complete** |
| Vietnamese | vi | ✅ | ✅ 554 | ✅ 566 | ✅ 72 | ✅ 10 | ✅ | **Complete** |
| Thai | th | ✅ | ✅ 554 | ✅ 566 | ✅ 73 | ✅ 10 | ✅ | **Complete** |
| Malay | ms | ✅ | ❌ 0 | ❌ 0 | ❌ 0 | ❌ 0 | ❌ | **UI Only** |
| Indonesian | id | ✅ | ❌ 0 | ❌ 0 | ❌ 0 | ❌ 0 | ❌ | **UI Only** |
| Polish | pl | ✅ | ❌ 0 | ❌ 0 | ❌ 0 | ❌ 0 | ❌ | **UI Only** |
| Dutch | nl | ✅ | ❌ 0 | ❌ 0 | ❌ 0 | ❌ 0 | ❌ | **UI Only** |
| Turkish | tr | ✅ | ❌ 0 | ❌ 0 | ❌ 0 | ❌ 0 | ❌ | **UI Only** |

**Update this table after completing each locale.**

---

## Keyword-Driven Content Strategy (DO NOT SKIP)

> **This is the #1 reason Spanish content ranks well.** Every page targets real search queries
> that people type into Google in that language. We DO NOT just translate English content word-for-word.

### The Problem with Literal Translation
- English users search "resume" → Spanish users search "curriculum vitae" (different word entirely)
- English users search "cover letter" → Italian users search "lettera di presentazione"
- English users search "resume template" → Portuguese users search "modelo de currículo"
- A literal translation misses what people ACTUALLY type into Google

### What the Keyword CSV Provides
The user researches and provides `seo/{LANGUAGE}-keywords.csv` BEFORE any content work begins. This file contains:
- 200+ real search terms in the target language with monthly search volume
- These keywords are the source of truth for how to phrase titles, tags, descriptions, and body content

### How Keywords Are Used Across ALL Content

| Content Type | How Keywords Are Used |
|-------------|----------------------|
| **Resume example titles** | Use the keyword-researched term for "resume/CV" + localized job title (e.g., "Curriculum Vitae da Ingegnere del Software" not "Resume di Software Engineer") |
| **Resume example tags** | 6-8 tags per page drawn from actual search keywords, not translated English tags |
| **Resume example body** | Naturally incorporate keyword phrases at 0.8-1.2% density |
| **Cover letter titles** | Use the keyword-researched term for "cover letter" (e.g., "lettera di presentazione") |
| **Cover letter tags** | Same keyword injection as resume examples |
| **Blog post titles** | Titles target high-volume keywords directly (e.g., "Come Fare un Curriculum Vitae" if that has 50K searches/month) |
| **Blog post topics** | Top 10-20 keywords become unique blog posts; 3-5 extra locale-only posts targeting keywords with no English equivalent |
| **Landing page headings** | Hero titles use exact high-volume keyword phrases |
| **Landing page descriptions** | Meta descriptions include top keyword terms |
| **Internal link anchor text** | Use keyword phrases as anchor text for cross-links |

### Example: Spanish vs English
| English | Spanish (keyword-researched) | NOT this (literal translation) |
|---------|------------------------------|-------------------------------|
| "How to Write a Resume" | "Cómo Hacer un Curriculum Vitae" (50K searches) | "Cómo Escribir un Resumen" (wrong term) |
| "Resume Template" | "Plantilla de Curriculum" (33K searches) | "Plantilla de Resumen" (wrong term) |
| "Cover Letter Example" | "Ejemplo de Carta de Presentación" (12K searches) | "Ejemplo de Carta de Cubierta" (wrong term) |

---

## Recommended Priority Order

| Priority | Locale | Language | Speakers | Rationale |
|----------|--------|----------|----------|-----------|
| P1 | pt | Portuguese | 260M | Large market, high resume search volume |
| P1 | it | Italian | 85M | EU market, strong job search culture |
| P1 | nl | Dutch | 25M | EU market, high digital literacy |
| P2 | ja | Japanese | 125M | Large market, unique CV format (履歴書) |
| P2 | ko | Korean | 80M | Growing tech job market |
| P2 | zh | Chinese | 1.4B | Massive market, unique resume norms |
| P3 | tr | Turkish | 85M | Growing tech sector |
| P3 | pl | Polish | 45M | EU job migration market |
| P3 | vi | Vietnamese | 100M | Fast-growing economy |
| P4 | th | Thai | 70M | Developing market |
| P4 | ms | Malay | 30M | Smaller market |
| P4 | id | Indonesian | 275M | Large population, growing digital economy |

---

## Step-by-Step Checklist for Each Language

> Replace `{LOCALE}` with the 2-letter locale code (e.g., `it`, `pt`, `ja`)
> Replace `{LANGUAGE}` with the language name (e.g., `Italian`, `Portuguese`, `Japanese`)

---

### STEP 1: Keyword Research (USER provides this BEFORE Claude starts)

**Goal:** The user researches and provides a CSV of 200+ high-volume search keywords in the target language.

**What the user does:**
- [ ] Research keywords using Google Keyword Planner, Ahrefs, Ubersuggest, or Google Trends
- [ ] Focus areas:
  - "resume" / "CV" / "curriculum vitae" equivalents in {LANGUAGE}
  - "cover letter" equivalent in {LANGUAGE}
  - "resume template" / "resume builder" equivalents
  - Top 50 job titles in that language/region
  - "ATS resume" equivalent
  - "free resume" equivalent
  - Job-specific long-tail keywords (e.g., "software engineer resume {LANGUAGE}")
- [ ] Save to `seo/{LANGUAGE}-keywords.csv` with columns: keyword, monthly volume, competition
- [ ] Provide the file to Claude

**What Claude does with the keywords:**
- [ ] Parse the keyword CSV and categorize keywords into groups:
  - **Blog post topics** — Top 10-20 highest-volume keywords become unique blog posts (NOT just translations of English posts)
  - **Resume tag keywords** — Job-title-related keywords get injected into resume example frontmatter tags
  - **Cover letter tag keywords** — Same for cover letter examples
  - **Landing page keywords** — High-volume generic terms ("free resume builder", "ATS resume") get woven into landing page content
  - **Internal link anchor text** — Keywords used as anchor text for cross-linking

**Reference files:**
- `seo/spanish-high-volume-keywords.csv` (246 keywords, example format)
- `seo/French keywords.csv`
- `seo/German keywords.csv`

> **Why this matters:** Spanish content ranks well because every page targets real search queries
> people type in Google. A literal translation of "how to write a resume" might not match what
> Italian users actually search for (they search "come fare un curriculum vitae" or "modello CV").
> The keyword file ensures we target ACTUAL search behavior, not guessed translations.

---

### STEP 2: Create Locale Data Files (Keyword-Driven)

**Goal:** Create the translation/config files that drive all content generation scripts. These files use keywords from Step 1 — NOT literal English-to-{LANGUAGE} translations.

> **CRITICAL RULE: No verbatim translation.** Every title, description, tag, and body section
> must use the actual search terms people type in {LANGUAGE}. The keyword CSV is the source of
> truth for how to phrase things, not the English version.
>
> **ALL content must follow `CLAUDE.md` SEO Content Rules and Google SEO Guidelines.**

#### 2a. Resume Examples Data
- [ ] Create `scripts/locale-data/resume-{LOCALE}.mjs`
- [ ] Cross-reference keyword CSV to find resume-related search terms for each job title
- [ ] Use high-volume keyword phrases in `titlePattern` and `descriptionPattern` (not literal translations)

Must contain:
```javascript
export const CONFIG = {
  locale: '{LOCALE}',
  author: '{Native-sounding author name}',
  authorSlug: '{author-slug}',
  authorBio: '{1-2 sentence bio in LANGUAGE}',
  // IMPORTANT: Use keyword-researched phrases, not literal English translations
  // e.g., Italian users search "curriculum vitae" not "resume"
  titlePattern: (jobTitle) => `{keyword-optimized title pattern with jobTitle}`,
  descriptionPattern: (jobTitle) => `{keyword-optimized meta description with jobTitle}`,
};

// All 554 English job titles → {LANGUAGE} translations
// Use the job title form that people ACTUALLY SEARCH for in {LANGUAGE}
export const JOB_TITLES = {
  'Software Engineer': '{translated — use the locally-searched term}',
  'Nurse': '{translated — use the locally-searched term}',
  // ... all 554 entries
};

// Category translations
export const CATEGORIES = {
  'Technology': '{translated}',
  'Healthcare': '{translated}',
  'Business': '{translated}',
  // ... all categories
};

// Generate 6-8 SEO tags per job title
// Tags MUST include actual search keywords from the CSV, not just translated English tags
// Mix: exact-match keyword + long-tail variations + related terms
export function generateTags(jobTitle, slug) { ... }

// Generate FAQ section (5 questions)
// Questions should reflect what {LANGUAGE} speakers actually ask (from keyword research)
export function generateFAQ(jobTitle) { ... }

// Generate full MDX body content
// Body must naturally incorporate keyword phrases from the CSV
// Target 0.8-1.2% keyword density for the primary keyword
export function generateBody(jobTitle, category, tags) { ... }
```

**Reference:** `scripts/locale-data/resume-fr.mjs`

#### 2b. Cover Letter Data
- [ ] Create `scripts/locale-data/cover-letter-{LOCALE}.mjs`
- [ ] Cross-reference keyword CSV for cover-letter-specific search terms

Same structure as resume data but with cover-letter-specific:
- Title patterns using the local term for "cover letter" (from keyword CSV, e.g., "lettera di presentazione" not "cover letter" for Italian)
- Description patterns with keyword-rich phrasing
- Body content templates incorporating search terms
- FAQ questions reflecting real {LANGUAGE} search queries about cover letters

**Reference:** `scripts/locale-data/cover-letter-fr.mjs`

#### 2c. Blog Post Data
- [ ] Create `scripts/locale-data/blog-{LOCALE}.mjs`
- [ ] **IMPORTANT:** Blog posts are NOT just translations of English posts. They fall into two categories:

**Category A: Translated posts (~70 posts)**
Adapt English blog posts BUT:
- Use keyword-researched titles (not literal translations)
- Replace English tags with actual {LANGUAGE} search keywords from CSV
- Rewrite body content to use local terminology and keyword phrases
- Reference local job platforms, salary standards, and cultural norms

**Category B: Unique keyword-targeted posts (~3-5 extra posts)**
Create NEW blog posts that don't exist in English, targeting:
- High-volume {LANGUAGE} keywords that have no English equivalent
- Locale-specific topics (e.g., Spanish has posts about "curriculum vitae" because that's what Spanish speakers search — English speakers search "resume")
- Local job market topics unique to {LANGUAGE}-speaking regions

Must contain:
```javascript
export const CONFIG = {
  locale: '{LOCALE}',
  author: '{Native-sounding author name}',
  authorBio: '{bio}',
};

// KEYWORD_MAP: Maps high-volume keywords from CSV → content
// This drives tag selection and body content for ALL posts
export const KEYWORD_MAP = {
  // From the keyword CSV — top 50 keywords organized by category
  resume_terms: ['{keyword1}', '{keyword2}', ...],
  cover_letter_terms: ['{keyword3}', '{keyword4}', ...],
  job_title_terms: ['{keyword5}', '{keyword6}', ...],
  template_terms: ['{keyword7}', '{keyword8}', ...],
};

// Blog post data: slug → { title, description, tags, body }
export const POSTS = {
  'how-to-write-a-resume': {
    title: '{keyword-optimized title — NOT a literal translation}',
    description: '{keyword-rich description using actual search terms}',
    tags: ['{real search keyword}', '{real search keyword}', ...],
    body: '{full localized MDX body — uses keywords naturally throughout}',
  },
  // ... all ~73 posts + unique locale-only posts
};

// Locale-only posts (not translations of English)
export const LOCALE_ONLY_POSTS = {
  '{locale-specific-slug}': {
    title: '{targets a high-volume keyword unique to this language}',
    description: '{...}',
    tags: ['{...}'],
    body: '{unique content for this language market}',
  },
};
```

**Note:** For languages with large character sets, the file may need splitting into parts:
- `blog-{LOCALE}-part1.mjs` through `blog-{LOCALE}-partN.mjs`
- See `scripts/locale-data/blog-ar-part*.mjs` for the Arabic example

**Reference:** `scripts/locale-data/blog-de.mjs`

---

### STEP 3: Generate MDX Content Files

**Goal:** Run the existing generation scripts to create all content files.

> **REMINDER:** All generated content MUST follow `CLAUDE.md` → "SEO Content Rules" (10 required
> sections for resume examples) and "Google SEO Content Writing Guidelines" (title tags, meta
> descriptions, keyword placement, E-E-A-T, content length). See "Content Quality Rules" section
> below for the full checklist.

#### 3a. Generate 554 Resume Examples
- [ ] Run: `node scripts/generate-locale-resume-examples.mjs --locale={LOCALE}`
- [ ] Verify output: `frontend/content/resume-examples/{LOCALE}/` should have 554 `.mdx` files
- [ ] Spot-check 3-5 files for correct translation, tags, and frontmatter

#### 3b. Generate 566 Cover Letter Examples
- [ ] Run: `node scripts/generate-locale-cover-letters.mjs --locale={LOCALE}`
- [ ] Verify output: `frontend/content/cover-letter-examples/{LOCALE}/` should have 566 `.mdx` files
- [ ] Spot-check 3-5 files

#### 3c. Generate ~73 Blog Posts
- [ ] Run: `node scripts/generate-locale-blog-posts.mjs --locale={LOCALE}`
- [ ] Verify output: `frontend/content/blog/{LOCALE}/` should have ~73 `.mdx` files
- [ ] Spot-check 3-5 files

#### 3d. Generate 10 Career Tips
- [ ] Create career tip articles in `frontend/content/career-tips/{LOCALE}/`
- [ ] Must include the same 10 slugs as Spanish:
  - `ai-engineer-resume.mdx`
  - `ai-ml-engineer-resume.mdx`
  - `how-to-write-ats-friendly-resume.mdx`
  - `interview-preparation-guide.mdx`
  - (check `frontend/content/career-tips/es/` for complete list)
- [ ] Each must have: frontmatter (title, description, author, date, tags) + MDX body

---

### STEP 4: Landing Page Content (21 TypeScript Files)

**Goal:** Add {LANGUAGE} content to all 21 `lib/content/*.ts` files so SEO landing pages render in {LANGUAGE} instead of falling back to English.

> **All landing page content must follow `CLAUDE.md` Google SEO Guidelines (title tags, meta descriptions, keyword placement).**
>
> **KEYWORD INJECTION:** Landing pages target high-volume generic keywords from the CSV.
> For example, if "creatore di curriculum gratuito" (free resume maker) has 12K monthly searches
> in Italian, the `resume-maker.ts` Italian content should use that exact phrase in the hero title,
> meta description, and throughout the page — not a literal translation of the English title.

Each file follows this pattern:
1. Add a `const {LOCALE}: TypeInterface = { ... }` block with keyword-optimized content
2. Update the `contentMap` to include the new locale

#### Files to update (all in `frontend/lib/content/`):

| # | File | Content Type | Approx Lines to Add |
|---|------|-------------|---------------------|
| 1 | `about-pages.ts` | About us, authors, author profiles | ~100 |
| 2 | `adobe-alternative.ts` | Adobe vs us comparison page | ~120 |
| 3 | `biodata-format.ts` | Biodata format guide | ~300 |
| 4 | `canva-alternative.ts` | Canva vs us comparison | ~120 |
| 5 | `career-pages.ts` | Career listing/detail pages | ~25 |
| 6 | `community-detail-page.ts` | Community post detail | ~25 |
| 7 | `community-page.ts` | Community listing page | ~50 |
| 8 | `europass-alternative.ts` | Europass vs us comparison | ~120 |
| 9 | `free-resume-builder.ts` | Free builder landing page | ~110 |
| 10 | `livecareer-alternative.ts` | LiveCareer vs us comparison | ~120 |
| 11 | `nova-alternative.ts` | Nova vs us comparison | ~120 |
| 12 | `overleaf-alternative.ts` | Overleaf vs us comparison | ~120 |
| 13 | `privacy-page.ts` | Privacy policy | ~60 |
| 14 | `resume-ai.ts` | AI resume builder page | ~130 |
| 15 | `resume-format.ts` | Resume format guide | ~180 |
| 16 | `resume-io-alternative.ts` | Resume.io vs us comparison | ~120 |
| 17 | `resume-maker.ts` | Resume maker landing page | ~110 |
| 18 | `rezi-alternative.ts` | Rezi vs us comparison | ~120 |
| 19 | `templates-category.ts` | Template category listing | ~15 |
| 20 | `terms-page.ts` | Terms of service | ~70 |
| 21 | `zety-alternative.ts` | Zety vs us comparison | ~130 |

**How to update each file:**
```typescript
// 1. Add the new locale constant
// Use keyword CSV to find the best {LANGUAGE} phrasing for titles, CTAs, descriptions
// Do NOT just translate the English or Spanish version word-for-word
const {LOCALE}: TypeInterface = {
  hero: { title: '{keyword-optimized title}', subtitle: '{keyword-rich subtitle}', ... },
  // ... all fields with keyword-aware content
};

// 2. Update the contentMap (add {LOCALE} to the object)
const contentMap: Record<string, TypeInterface> = { en, es, fr, de, ar, {LOCALE} };
```

**Reference:** Look at the `es` constant in each file for the exact structure, but use keyword CSV for phrasing.

---

### STEP 5: SEO Optimization (Post-Generation Polish)

**Goal:** Ensure generated content meets SEO quality standards from `CLAUDE.md`.

#### 5a. Internal Link Fixes
- [ ] Ensure all internal links in {LOCALE} content point to `/{LOCALE}/...` paths (not `/en/...`)
- [ ] Reference script: `scripts/fix-es-internal-links.mjs`
- [ ] Adapt and run for {LOCALE}

#### 5b. Meta Description Optimization
- [ ] Verify every MDX file's `description` frontmatter:
  - Contains all words from `tags[0]`
  - Is 150-160 characters
  - Reads as a compelling CTA
- [ ] Reference script: `scripts/optimize-es-descriptions.mjs`

#### 5c. Body Keyword Density
- [ ] Target 0.8-1.2% density for the primary keyword
- [ ] Reference script: `scripts/optimize-es-body-keywords.mjs`

#### 5d. Content Enhancement Scripts (if needed)
- [ ] Add hiring manager tips: `scripts/add-hiring-manager-tips.mjs`
- [ ] Add salary citations: `scripts/add-salary-citations.mjs`
- [ ] Add interview questions: `scripts/add-interview-questions.mjs`
- [ ] Differentiate near-duplicate content: `scripts/differentiate-duplicates.mjs`
- [ ] Diversify format tips: `scripts/diversify-format-tips.mjs`

---

### STEP 6: Sitemap & Blog System Updates

**Goal:** Ensure the content routing system recognizes the new locale's content.

- [ ] Check `frontend/app/sitemap.ts`:
  - Verify `getLocaleOnlyPostSlugs()` includes {LOCALE}-exclusive blog slugs (if any)
  - Verify `getLocaleOnlyCareerTipSlugs()` includes {LOCALE}-exclusive career tip slugs (if any)
- [ ] Check blog listing page picks up new locale posts
- [ ] Check resume examples listing page includes new locale content

**Note:** If the locale has blog posts with slugs that DON'T exist in English, they need to be registered in the locale-only slug functions so the sitemap includes them.

---

### STEP 7: Quality Assurance

**Goal:** Verify everything works end-to-end.

- [ ] **7a. File count verification:**
  ```bash
  echo "Resume examples:" && find frontend/content/resume-examples/{LOCALE} -name '*.mdx' | wc -l
  echo "Cover letters:" && find frontend/content/cover-letter-examples/{LOCALE} -name '*.mdx' | wc -l
  echo "Blog posts:" && find frontend/content/blog/{LOCALE} -name '*.mdx' | wc -l
  echo "Career tips:" && find frontend/content/career-tips/{LOCALE} -name '*.mdx' | wc -l
  ```
  Expected: 554 + 566 + ~73 + 10 = ~1,203 files

- [ ] **7b. Build test:**
  ```bash
  cd frontend && npm run build
  ```
  Must succeed without errors.

- [ ] **7c. Spot-check rendered pages:**
  - Visit `/{LOCALE}/resume-examples/software-engineer` — content should be in {LANGUAGE}
  - Visit `/{LOCALE}/blog` — should list blog posts in {LANGUAGE}
  - Visit `/{LOCALE}/resume-format` — landing page should be in {LANGUAGE}
  - Visit `/{LOCALE}/resume-examples` — listing page should be in {LANGUAGE}

- [ ] **7d. Sitemap check:**
  - Verify `/{LOCALE}/resume-examples/*` URLs appear in sitemap
  - Verify `/{LOCALE}/blog/*` URLs appear in sitemap

- [ ] **7e. CJK/RTL rendering check (if applicable):**
  - Japanese/Chinese/Korean: Verify characters render correctly, line breaks work
  - Thai: Verify Thai script renders with proper line wrapping
  - Arabic: Already handled (RTL support exists)

- [ ] **7f. Lighthouse sample:**
  - Run Lighthouse on `/{LOCALE}/resume-examples/software-engineer`
  - SEO score should be ≥90

---

### STEP 8: Update Status & Commit

- [ ] Update the **Current Status** table at the top of this file
- [ ] Commit with message: `content: add localized content for {LANGUAGE} ({LOCALE})`
- [ ] Push to remote

---

## Reference Files & Paths

| Resource | Path |
|----------|------|
| **Generation scripts** | `scripts/generate-locale-resume-examples.mjs` |
| | `scripts/generate-locale-cover-letters.mjs` |
| | `scripts/generate-locale-blog-posts.mjs` |
| **Locale data files** | `scripts/locale-data/resume-{LOCALE}.mjs` |
| | `scripts/locale-data/cover-letter-{LOCALE}.mjs` |
| | `scripts/locale-data/blog-{LOCALE}.mjs` |
| **Content output dirs** | `frontend/content/resume-examples/{LOCALE}/` |
| | `frontend/content/cover-letter-examples/{LOCALE}/` |
| | `frontend/content/blog/{LOCALE}/` |
| | `frontend/content/career-tips/{LOCALE}/` |
| **Landing page content** | `frontend/lib/content/*.ts` (21 files) |
| **SEO optimization scripts** | `scripts/fix-es-internal-links.mjs` |
| | `scripts/optimize-es-descriptions.mjs` |
| | `scripts/optimize-es-body-keywords.mjs` |
| | `scripts/add-hiring-manager-tips.mjs` |
| | `scripts/add-interview-questions.mjs` |
| | `scripts/add-salary-citations.mjs` |
| | `scripts/differentiate-duplicates.mjs` |
| | `scripts/diversify-format-tips.mjs` |
| **SEO keyword research** | `seo/{LANGUAGE}-keywords.csv` |
| **Translation JSON** | `frontend/messages/{LOCALE}.json` (already done) |
| **i18n config** | `frontend/i18n.config.ts` (already done) |
| **Sitemap** | `frontend/app/sitemap.ts` |
| **SEO content rules** | `CLAUDE.md` → "SEO Content Rules" section |
| **Google SEO guidelines** | `CLAUDE.md` → "Google SEO Content Writing Guidelines" section |
| **Translation guide** | `TRANSLATION_GUIDE.md` |

---

## Content Quality Rules (MANDATORY — from CLAUDE.md)

> **ALL content generated in every step above MUST follow the full SEO Content Rules and
> Google SEO Content Writing Guidelines defined in `CLAUDE.md`.** This is non-negotiable.
> Read `CLAUDE.md` before generating any content for a new locale.

### Resume Example Pages — Required Sections (from CLAUDE.md → "SEO Content Rules")
Every resume example MDX file must include ALL 10 of these sections:
1. **Unique intro** (`## What Makes a Great [Job] Resume?`) — profession-specific, not generic
2. **3 professional summaries** (`## Professional Summary Examples`) — Entry/Mid/Senior with real terminology and metrics
3. **Salary & Job Outlook** (`## Salary & Job Outlook`) — median salary, range, growth projection. Cite BLS, Glassdoor, PayScale with links. Include disclaimer
4. **Skills organized by domain** (`## Essential Skills to Highlight`) — 3 subcategories relevant to the profession (NOT generic "Technical / Soft / Other")
5. **6 achievement bullet points** (`## Achievement-Focused Bullet Points`) — realistic metrics specific to the profession
6. **Format tips specific to the profession** (`## [Job Title] Resume Format & Template Tips`) — unique per page, not templated
7. **Hiring Manager Tip** (`## Hiring Manager Tip`) — blockquote with insider advice from someone who hires for this role
8. **5 interview questions with answer guidance** (`## Common [Job Title] Interview Questions`) — profession-specific, not generic
9. **5 common mistakes unique to the job** (`## Common Mistakes to Avoid`) — profession-specific, not generic
10. **ATS Optimization section** (`## ATS Optimization for [Job] Resumes`) — profession-specific keyword advice

### Google SEO Guidelines (from CLAUDE.md → "Google SEO Content Writing Guidelines")
Every page and blog post must follow these rules:

**Title Tag (`title` in frontmatter):**
- 50-60 characters, primary keyword front-loaded
- Match closely with H1 heading
- Unique per page

**Meta Description (`description` in frontmatter):**
- 150-160 characters
- Every word of `tags[0]` must be present
- Written as a compelling CTA, not just a summary

**Target Keyword Placement (MANDATORY for every page):**
| Location | Rule |
|----------|------|
| Title tag | Front-load keyword. ≤60 chars. Every word of `tags[0]` present |
| H1 heading | Include keyword or natural variation |
| First 100-150 words | Keyword in opening paragraph |
| URL slug | Keyword-based, hyphens, lowercase, no filler words |
| Meta description | Every word of `tags[0]` present |
| H2/H3 subheadings | Keyword variations and related terms |
| Body content | 0.8-1.2% density. Use full terms + abbreviations |

**Content Length:**
- Resume example pages: 800+ words (excluding frontmatter)
- Blog posts: 1,500-2,500 words
- Landing/guide pages: 2,000-3,000 words

**Heading Structure:**
- One H1 per page
- H2s for major sections with secondary keywords
- Break content every ~300 words with a heading

**Tags & Keywords (frontmatter):**
- 6-8 tags per page
- Mix of exact-match, long-tail, and related terms
- Tags must reflect actual search queries (from keyword CSV)

**E-E-A-T Signals:**
- Named author with bio, credentials, and job title
- Cite authoritative sources (BLS, Glassdoor, PayScale for salary data)
- First-hand knowledge signals: specific metrics, tools, real examples
- Include disclaimers where appropriate

**Internal Linking:**
- Every page links to at least one other page on the site
- 1-3 contextual links per section
- Descriptive anchor text using keyword phrases (not "click here")
- All links point to `/{LOCALE}/...` paths

**What to Avoid (Google Penalties):**
- Keyword stuffing
- Thin content (under 300 words)
- Duplicate/near-identical content across pages
- Scaled content abuse (mass AI content without unique value)
- Missing author attribution
- Walls of text without headings or formatting

**Near-Duplicate Differentiation:**
When multiple pages target overlapping job titles (e.g., "CNA" vs "Certified Nursing Assistant"):
- Different meta descriptions
- Different intro headings and body copy
- Different professional summaries
- Known duplicate groups: `cna`/`certified-nursing-assistant`/`nursing-assistant`, `pharmacy-tech`/`pharmacy-technician`

### Content Freshness
- Include current year (2026) in titles and content
- Reference current tools, platforms, and industry standards
- Salary data from most recent available sources

---

## Notes for CJK Languages (ja, ko, zh)

- Job titles may not have 1:1 English equivalents — use the most common local term
- Resume format differs significantly (e.g., Japanese 履歴書 vs 職務経歴書)
- Blog content should reference local job search platforms (Indeed Japan, Saramin Korea, etc.)
- SEO tags should use native-script keywords (not romanized)
- Character count ≠ word count — adjust "800+ words" rule to ~400+ characters for CJK

## Notes for Thai (th)

- Thai has no spaces between words — ensure line wrapping works
- Use Thai-specific resume terminology (ประวัติย่อ, จดหมายสมัครงาน)
- Reference Thai job platforms (JobThai, JobsDB Thailand)

---

*Last updated: 2026-03-03*
