# Arabic SEO Content — Complete Creation Prompt

## Your Mission

Create **40 Arabic content pages** for the AI Resume Builder website:
- **35 blog posts** at `frontend/content/blog/ar/`
- **5 career-tips pages** at `frontend/content/career-tips/ar/`

These are NOT translations of the English site — they are **original Arabic-language content** optimized for Arabic Google search queries using real keyword data from `seo/Arabic keywords - top 100.csv` (100 keyword rows, 5K–500 monthly searches) plus 18 adapted English topics for broader coverage.

### What ALREADY exists for all locales (no Arabic content needed):
- **554 resume example pages** (`content/resume-examples/`) — shared across all locales via i18n
- **566 cover letter example pages** (`content/cover-letter-examples/`) — shared across all locales via i18n
- **44 app route pages** (builder, pricing, templates, tools, etc.) — localized via i18n JSON files

**IMPORTANT**: Read `CLAUDE.md` in the project root FIRST. All content must follow the "Google SEO Content Writing Guidelines (2026)" section and the "Target Keyword Placement Checklist (MANDATORY)" rules exactly.

## Arabic Job Market Context (MENA Region)

Reference these throughout the content (NOT US/European equivalents):
- **منطقة الشرق الأوسط وشمال أفريقيا (MENA)** — Primary job market: Saudi Arabia, UAE, Egypt, Jordan, Kuwait, Qatar
- **رؤية 2030** (Vision 2030) — Saudi Arabia's economic diversification plan creating massive job opportunities
- **توطين الوظائف** (Job nationalization) — Saudization, Emiratization, Omanization programs requiring local hiring
- **القطاع الحكومي vs القطاع الخاص** — Government sector vs private sector (different hiring processes)
- **السيرة الذاتية ثنائية اللغة** — Bilingual CV (Arabic + English) required for most Gulf positions
- **صورة شخصية في السيرة الذاتية** — Photo on CV is common and expected in MENA
- **Bayt.com** — Largest job board in the Middle East
- **LinkedIn MENA** — Growing rapidly, essential for professional networking
- **GulfTalent, Naukrigulf** — Major Gulf-specific job boards
- **Wuzzuf** — Egypt's leading job portal
- **نظام الكفالة** (Kafala/sponsorship system) — Affects employment in some Gulf states
- **IELTS/TOEFL** — English proficiency scores often required for Gulf jobs
- **PMP, CIPD, CPA, CFA** — Professional certifications highly valued in Gulf
- **الراتب الإجمالي** (Total salary) — Gulf salaries often include housing/transport allowances
- **فترة التجربة** (Probation period) — Typically 3-6 months in MENA
- **خطاب التقديم** — Cover letter (less common than in Europe, but growing)
- **ATS (نظام تتبع المتقدمين)** — Growing adoption in Gulf corporations and multinationals

## Author

```yaml
author: أحمد حسن
authorBio: >-
  خبير توظيف واستشاري مهني بخبرة تزيد عن 10 سنوات في سوق العمل العربي.
  متخصص في كتابة السير الذاتية الاحترافية واستراتيجيات التوظيف في منطقة
  الشرق الأوسط وشمال أفريقيا.
```

## Categories (Arabic)

- السيرة الذاتية (CV/Resume)
- البحث عن عمل (Job Search)
- المقابلات (Interviews)
- التطوير المهني (Career Development)
- أدوات وتقنيات (Tools & Technology)

## Frontmatter Template

```yaml
---
title: '[Arabic title ≤60 chars, contains all words from tags[0]]'
slug: [transliterated-slug-no-arabic-script]
description: >-
  [150-160 chars in Arabic, contains all words from tags[0]]
date: '2026-02-22'
author: أحمد حسن
authorBio: >-
  خبير توظيف واستشاري مهني بخبرة تزيد عن 10 سنوات في سوق العمل العربي.
  متخصص في كتابة السير الذاتية الاحترافية واستراتيجيات التوظيف في منطقة
  الشرق الأوسط وشمال أفريقيا.
category: [Arabic category from list above]
tags:
  - [primary keyword = tags[0]]
  - [6-7 more Arabic SEO keywords from CSV or related terms]
image: /blog/ar-placeholder.jpg
imageAlt: [descriptive alt with keyword in Arabic]
featured: false
faq:
  - question: [5-7 FAQs in Arabic]
    answer: >-
      [Detailed answer in Arabic]
---
```

## Content Rules (from CLAUDE.md — MANDATORY)

1. **1,500–2,500 words** per blog post, **2,000–3,000 words** per career-tip
2. **tags[0] words MUST appear in**: title, description, H1 (first `##`), first 150 words, H2 variations, imageAlt
3. **Keyword density**: 0.8–1.2%
4. **H2 every ~300 words** using keyword VARIATIONS (not exact repeats)
5. **2–4 sentences per paragraph** (40–70 words)
6. **5–7 FAQ questions** per post in frontmatter
7. **1–3 internal links per section** with descriptive Arabic anchor text
8. **End each post** with "مقالات ذات صلة:" section (3–4 related Arabic post links)
9. **VERIFICATION**: every word in tags[0] appears in BOTH title AND description
10. **Title ≤60 characters** — front-load the keyword
11. **Description 150–160 characters** — compelling, keyword-rich
12. **6–8 tags per page** — mix of primary keyword, long-tail variations, and related terms
13. **Named author** (أحمد حسن) with authorBio — E-E-A-T requirement
14. **YAML safety**: Avoid unescaped colons in FAQ questions (use — or rephrase)

## Slug Rules

- NO Arabic script in slugs — use transliterated Latin characters
- Hyphens to separate words
- Remove Arabic articles (ال) and filler words
- Lowercase only
- No year numbers in slugs
- Use common transliteration: ع=a, ذ=z, ص=s, ض=d, ط=t, ظ=z, غ=gh, ق=q, ك=k

---

## POST LIST — 35 Blog Posts

### TIER 1 — CSV Keyword Posts (17 posts, highest priority)
These target the actual Arabic search keywords from the CSV.

| # | Slug | Primary Keyword (tags[0]) | Volume | CSV Keywords Absorbed |
|---|------|--------------------------|--------|----------------------|
| 1 | `amal-sira-zatiya` | عمل سيرة ذاتية | 5K | انشاء سيرة ذاتية (5K), كيفية عمل سيرة ذاتية (5K), اعمل سيرة ذاتية (5K), عايز اعمل سيرة ذاتية (5K), عايز اعمل سيره ذاتيه (5K), صنع سيرة ذاتية (500), طريقة عمل سيرة ذاتية (500), عمل سيره ذاتيه (5K), عمل سيره ذاتية (5K), عمل سيرة ذاتيه (5K), انشئ سيرة ذاتية (500), كيفية انشاء سيرة ذاتية (500) |
| 2 | `tasmim-sira-zatiya` | تصميم سيرة ذاتية | 5K | تصميم cv (5K), تصميم سي في (500), تصميم سيره ذاتيه (500), تصميم سيرة ذاتية احترافية (5K) |
| 3 | `insha-sira-zatiya-majanan` | انشاء سيرة ذاتية مجانا | 5K | عمل سيرة ذاتية مجانا (5K), عمل cv مجانا (5K), انشاء cv مجانا (5K), عمل cv مجانًا (5K), تصميم سيرة ذاتية مجانا (500), تصميم cv مجانا (500), عمل سيفي مجاني (5K), انشاء سيفي مجانا (500) |
| 4 | `amal-cv` | عمل cv | 5K | انشاء cv (5K), اعمل cv (5K), cv عمل (500), اعمل سي في (5K), عمل سي فى (5K), انشاء سيفي (500) |
| 5 | `sira-zatiya-bilarabiya` | عمل سيرة ذاتية بالعربي | 5K | عمل السيرة الذاتية بالعربي (5K), انشاء سيرة ذاتية بالعربي (500), عمل سي في بالعربي (500), سيرة ذاتية بالعربي مجانا (500), عمل cv بالعربي (500), عمل cv عربي (500), طريقة عمل cv بالعربي (500) |
| 6 | `mawaqia-amal-cv` | مواقع لعمل cv | 5K | مواقع لعمل السيرة الذاتية (5K), مواقع لعمل cv مجانا (5K), افضل مواقع لعمل cv (5K), أفضل مواقع لعمل cv مجانًا (5K), أفضل مواقع لعمل cv مجانا (5K), افضل المواقع لعمل السيرة الذاتية (5K) |
| 7 | `afdal-mawqia-amal-cv` | افضل موقع لعمل cv | 500 | موقع لعمل cv (500), موقع عمل سيرة ذاتية (500), موقع انشاء سيرة ذاتية (500), موقع لعمل السيرة الذاتية (500), موقع لعمل cv مجانا (500), موقع عمل cv مجاني (500), موقع انشاء cv (500), مواقع انشاء سيرة ذاتية (500), مواقع عمل cv مجانا (500), مواقع مجانية لعمل cv (500), مواقع عمل سي في مجانا (500), مواقع عمل سيرة ذاتية (500) |
| 8 | `tariqat-amal-cv` | طريقة عمل cv | 5K | كيفية عمل cv (5K), طريقة عمل السي في (5K), طريقه عملcv (5K), طريقة عمل سيفي (500), كيفية عمل cv للمبتدئين (500) |
| 9 | `amal-cv-ihtirafi` | عمل cv احترافي | 500 | عمل سيرة ذاتية احترافية (500), عمل سيفي احترافي (500), انشاء cv احترافي (500), طريقة عمل cv احترافي (500), عمل cv احترافي مجانا (500), كيفية عمل سيرة ذاتية احترافية (500), كيفية عمل cv احترافي (500), عمل سي في احترافي (500), كيفية عمل سي في احترافي (500), طريقة عمل سيرة ذاتية احترافية (500), انشاء سيرة ذاتية احترافية مجانا (500) |
| 10 | `sira-zatiya-zikaa-istinai` | سيرة ذاتية بالذكاء الاصطناعي | 500 | تصميم سيرة ذاتية بالذكاء الاصطناعي (500), عمل سيرة ذاتية بالذكاء الاصطناعي (500) |
| 11 | `amal-cv-mobile-pdf` | عمل cv على الموبايل pdf | 5K | كيفية عمل cv على الموبايل (500) |
| 12 | `amal-cv-jahiz-pdf` | عمل cv جاهز pdf | 5K | عمل cv جاهز (500), عمل سيرة ذاتية pdf (500) |
| 13 | `barnamij-amal-cv` | برنامج عمل cv | 5K | برنامج لعمل cv (5K), برنامج تصميم سيرة ذاتية (500) |
| 14 | `amal-sifi` | عمل سيفي | 5K | سيفي للعمل (500), سيفي عمل (500) |
| 15 | `amal-cv-bilinglizi` | عمل cv بالانجليزي | 500 | (standalone — English CV for Arabic speakers) |
| 16 | `kanfa-sira-zatiya` | كانفا سيرة ذاتية | 500 | (standalone — Canva for Arabic CVs) |
| 17 | `insha-alsira-alzatiya` | انشاء السيرة الذاتية | 5K | انشاء سيرة ذاتيه (500) |

### TIER 2 — English-Adapted Posts (18 posts)
Original Arabic content inspired by English posts. Adapted for MENA job market with Arabic examples, salary data, and cultural context.

| # | Slug | Arabic tags[0] | English Source | Topic Focus |
|---|------|----------------|----------------|-------------|
| 18 | `kitabat-sira-zatiya-dalil` | كتابة سيرة ذاتية | how-to-write-a-resume | Complete step-by-step guide |
| 19 | `mulakhas-mihani-sira-zatiya` | ملخص مهني سيرة ذاتية | how-to-write-professional-summary | Professional summary examples |
| 20 | `maharat-sira-zatiya` | مهارات السيرة الذاتية | how-to-list-skills-on-resume | Skills listing guide |
| 21 | `afaal-qawiya-sira-zatiya` | أفعال قوية للسيرة الذاتية | resume-action-verbs | Arabic action verbs list |
| 22 | `akhta-sira-zatiya` | أخطاء السيرة الذاتية | top-resume-mistakes-to-avoid | Common mistakes in Arab CVs |
| 23 | `kitabat-khitab-taqdim` | كتابة خطاب تقديم | how-to-write-cover-letter | Cover letter guide |
| 24 | `tahdir-muqabala-amal` | تحضير مقابلة عمل | interview-preparation-guide | Interview prep guide |
| 25 | `tariqat-star-muqabala` | طريقة STAR للمقابلات | star-method-interview-questions | STAR method for Arabic speakers |
| 26 | `hadithni-an-nafsak` | حدثني عن نفسك إجابة | tell-me-about-yourself-answer | "Tell me about yourself" in Arabic |
| 27 | `nuqat-daaf-muqabala` | نقاط ضعف مقابلة عمل | weakness-interview-question | Weakness question answers |
| 28 | `tafawud-rawatib` | تفاوض رواتب | salary-negotiation-tips | Gulf salary negotiation |
| 29 | `fagawat-sira-zatiya` | فجوات السيرة الذاتية | resume-gap-explanation-examples | Resume gap explanations |
| 30 | `sira-zatiya-tullab` | سيرة ذاتية للطلاب | how-to-write-student-resume | Student/fresh graduate CV |
| 31 | `linkedin-taswiq-mihani` | لينكدإن تسويق مهني | linkedin-profile-optimization | LinkedIn for MENA professionals |
| 32 | `istratijiyat-bahth-amal` | استراتيجية بحث عن عمل | job-search-strategy | Job search in MENA |
| 33 | `maharat-rawatib-aliya` | مهارات رواتب عالية | high-paying-skills | High-paying skills in Gulf |
| 34 | `tansiq-sira-zatiya-zamani` | تنسيق السيرة الذاتية الزمني | chronological-resume-format | Chronological format guide |
| 35 | `farq-sira-zatiya-cv` | الفرق بين السيرة الذاتية و CV | resume-vs-cv-difference | CV vs Resume in Arab context |

---

## CAREER-TIPS PAGES (5 pages at `frontend/content/career-tips/ar/`)

In-depth career guide pages. Same frontmatter and SEO rules as blog posts but longer (2,000–3,000 words).

| # | Slug | Arabic tags[0] | English Source | Topic |
|---|------|----------------|----------------|-------|
| C1 | `dalil-kitabat-sira-zatiya` | دليل كتابة السيرة الذاتية | career-guidance | Career guidance & CV writing masterclass |
| C2 | `sira-zatiya-ats` | سيرة ذاتية ATS | how-to-write-ats-friendly-resume | ATS-optimized resume guide |
| C3 | `dalil-khitab-taqdim` | دليل خطاب التقديم | how-to-write-cover-letter | Complete cover letter guide |
| C4 | `dalil-tahdir-muqabala` | دليل تحضير المقابلة | interview-preparation-guide | Interview preparation masterclass |
| C5 | `khitat-tatwir-mihani` | خطة تطوير مهني | career-development-plan | Career development plan template |

### Career-Tips Content Rules

- **2,000–3,000 words** (in-depth guides, longer than blog posts)
- Same SEO keyword placement rules as blog posts
- Read the English source for structure, then write original Arabic content — NOT a translation
- Reference MENA equivalents: Bayt.com (not Indeed.com), LinkedIn MENA, GulfTalent
- For salary context: Gulf salaries in USD/AED/SAR, mention housing allowances, 13th month
- Reference Saudi Vision 2030, Emiratization, and tech hubs (Dubai, Riyadh, Cairo)

---

## Internal Linking Strategy

Posts should cross-link using "مقالات ذات صلة:" sections at the end. Key hub posts:

- `amal-sira-zatiya` (pillar) → links to all CV creation posts
- `mawaqia-amal-cv` → links to tool/site reviews, Canva, programs
- `kitabat-sira-zatiya-dalil` → links to skills, summary, mistakes, format
- `tahdir-muqabala-amal` → links to STAR, tell me about yourself, weakness
- `sira-zatiya-zikaa-istinai` → links to AI tools, Canva, programs

Internal links should also reference:
- `/ar/builder` — "أنشئ سيرتك الذاتية الآن" (builder CTA)
- `/ar/templates` — "تصفح قوالب السيرة الذاتية الاحترافية"
- Other Arabic blog posts using descriptive anchor text

---

## Quality Checklist (per post)

- [ ] tags[0] words in title?
- [ ] tags[0] words in description?
- [ ] Title ≤60 chars?
- [ ] Description 150–160 chars?
- [ ] H1 (first `##`) includes keyword variation?
- [ ] Keyword in first 150 words?
- [ ] 6–8 tags?
- [ ] 5–7 FAQs?
- [ ] Named author (أحمد حسن)?
- [ ] imageAlt includes keyword?
- [ ] 1,500–2,500 words (blog) / 2,000–3,000 words (career-tips)?
- [ ] "مقالات ذات صلة:" section?
- [ ] H2 every ~300 words (keyword variations)?
- [ ] 1–3 internal links per section?
- [ ] MENA job market references (Bayt.com, Vision 2030, etc.)?
- [ ] No unescaped colons in YAML FAQ questions?
- [ ] RTL-appropriate content (no LTR-only formatting assumptions)?

---

## Execution Instructions

### Step 1: Create directories
```bash
mkdir -p frontend/content/blog/ar
mkdir -p frontend/content/career-tips/ar
```

### Step 2: Create posts in parallel batches

**Batch 1** (Tier 1 — CSV keyword posts):
- Agent A: Posts 1–6
- Agent B: Posts 7–12
- Agent C: Posts 13–17

**Batch 2** (Tier 2 — adapted posts + career tips):
- Agent D: Posts 18–23
- Agent E: Posts 24–29
- Agent F: Posts 30–35
- Agent G: Career tips C1–C5

### Step 3: Verification
1. Run `npm run build` in `frontend/` — must pass cleanly
2. Spot-check 5 blog posts + 2 career-tips for keyword compliance:
   - Every word of tags[0] appears in BOTH title AND description
   - tags[0] appears in H1 (first `##`), first 150 words, and imageAlt
   - Title ≤60 chars, description 150–160 chars
   - 6–8 tags, 5–7 FAQs, named author
3. Commit

---

## TOTAL ARABIC CONTENT SUMMARY

| Content Type | Count | Location |
|---|---|---|
| Blog posts (CSV keyword-optimized) | 17 | `frontend/content/blog/ar/` |
| Blog posts (English-adapted) | 18 | `frontend/content/blog/ar/` |
| Career tips (in-depth guides) | 5 | `frontend/content/career-tips/ar/` |
| Resume examples (shared) | 554 | `frontend/content/resume-examples/` (already localized via i18n) |
| Cover letter examples (shared) | 566 | `frontend/content/cover-letter-examples/` (already localized via i18n) |
| App pages (shared) | ~44 | `frontend/app/[locale]/` (already localized via i18n JSON) |
| **Total new Arabic pages** | **40** | |
