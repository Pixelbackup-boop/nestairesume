# AI Resume Builder - Project Notes

## Tech Stack
- Next.js 16.1.1 (App Router, Turbopack)
- React 19.2.3
- Tailwind CSS v4
- TypeScript

## Tailwind CSS v4 Notes

### CSS Reset Warning
**Don't add your own CSS reset when using Tailwind v4.**

Tailwind v4's `@import "tailwindcss"` includes Preflight (a CSS reset) automatically. Adding your own reset like:
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```
Will override Tailwind's spacing defaults and cause alignment/spacing issues.

**Correct approach:**
```css
@import "tailwindcss";

/* Only override specific properties Tailwind doesn't cover */
* {
  font-family: 'Inter', sans-serif;
}

body {
  background: #080b12;
}
```

### Custom Colors in Tailwind v4
Define colors in `@theme` directive, but also add explicit utility classes for custom color names:
```css
@theme {
  --color-accent-green: #00dc82;
}

/* Explicit utilities for CDN-style color names */
.bg-accent-green { background-color: #00dc82; }
.text-accent-green { color: #00dc82; }
.bg-accent-green\/20 { background-color: rgba(0,220,130,0.2); }
```

### PostCSS Setup
Tailwind v4 requires `@tailwindcss/postcss` plugin:
```js
// postcss.config.mjs
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

## SEO Content Rules (Resume Examples, Blog Posts, Landing Pages)

When creating or expanding any content page (.mdx files in `frontend/content/`), ALWAYS write genuinely profession-specific content. Never use templated fill-in-the-blank patterns where only the job title is swapped.

### Required sections for every resume example page:
1. **Unique intro** (`## What Makes a Great [Job] Resume?`) — Explain what makes THIS profession's resume different, referencing the specific industry context (regulatory environment, hiring culture, what managers scan for)
2. **3 professional summaries** (`## Professional Summary Examples`) — Entry/Mid/Senior. Each must use real job-specific terminology, realistic metrics, and tools actually used in that profession. NOT generic "X years of experience in Y field"
3. **Salary & Job Outlook** (`## Salary & Job Outlook`) — Must include median salary, salary range, and growth projection from frontmatter. Must cite 3 sources with links: [U.S. Bureau of Labor Statistics OOH](https://www.bls.gov/ooh/), [Glassdoor](https://www.glassdoor.com/Salaries/), and [PayScale](https://www.payscale.com/research/US/). Use job-specific BLS OOH URLs when available. Include disclaimer about compensation variance
4. **Skills organized by domain** (`## Essential Skills to Highlight`) — Group into 3 subcategories relevant to the profession (e.g., "Trade Skills / Equipment & Tools / Safety & Physical" for construction, NOT generic "Technical / Soft / Other")
5. **6 achievement bullet points** (`## Achievement-Focused Bullet Points`) — Must reference realistic metrics, tools, and outcomes specific to the profession. A nurse's bullets should mention patient satisfaction scores and medication error rates; a bartender's should mention pour costs and nightly sales
6. **Format tips specific to the profession** (`## [Job Title] Resume Format & Template Tips`) — Each page needs unique formatting advice. A creative role emphasizes portfolio links; a healthcare role emphasizes license placement; a trade role emphasizes certifications. Pages in the same category MUST NOT have identical format tips — use profession-specific nuances to differentiate
7. **Hiring Manager Tip** (`## Hiring Manager Tip`) — A blockquote callout with bold insight + 1-2 paragraph elaboration. Must read like insider advice from someone who actually hires for this role. Reference profession-specific screening criteria, not generic resume advice
8. **5 interview questions with answer guidance** (`## Common [Job Title] Interview Questions`) — Each question must be specific to the profession (not generic "tell me about yourself"). Include `###` subheading per question and a guidance paragraph explaining what to cover in the answer. Questions should reflect real interview scenarios for that job
9. **5 common mistakes unique to the job** (`## Common Mistakes to Avoid`) — NOT generic "no metrics" or "bad formatting." Each mistake should be something only someone familiar with THAT profession's hiring process would know
10. **ATS Optimization section** (`## ATS Optimization for [Job] Resumes`) — Profession-specific ATS keyword advice, not generic formatting tips

### Near-duplicate differentiation policy:
When multiple pages target overlapping job titles (e.g., "CNA" vs "Certified Nursing Assistant" vs "Nursing Assistant"), each page MUST target a distinct search intent:
- Different meta descriptions emphasizing the unique angle
- Different intro headings and body copy
- Different professional summary examples with distinct career contexts
- Known duplicate groups: `cna` / `certified-nursing-assistant` / `nursing-assistant`, `pharmacy-tech` / `pharmacy-technician`, `desktop-support` / `desktop-support-engineer`

### What to avoid:
- Same sentence structures with only `{jobTitle}` and `{skills}` swapped
- Identical "Format & Template Tips" sections across same-category pages
- FAQ answers that follow the same template with variable substitution
- Generic advice that applies to any job (e.g., "Use a clean, ATS-friendly layout")
- Body content under 800 words (excluding frontmatter)
- Salary sections without cited authoritative sources (BLS, Glassdoor, PayScale)
- Interview questions that could apply to any profession
- Hiring manager tips that use generic resume advice instead of profession-specific screening criteria

### Batch content scripts (in `scripts/`):
These scripts were used to add/update content across all 306 pages. Re-run if new pages are added:
- `add-hiring-manager-tips.mjs` — Adds unique hiring manager tip per page
- `add-salary-citations.mjs` — Adds salary section with BLS/Glassdoor/PayScale citations
- `add-interview-questions.mjs` — Adds 5 profession-specific interview questions
- `differentiate-duplicates.mjs` — Differentiates near-duplicate page content
- `diversify-format-tips.mjs` — Replaces templated format tips with unique content

### Reference examples of good content:
- `frontend/content/resume-examples/software-engineer.mdx`
- `frontend/content/resume-examples/nurse.mdx`
- `frontend/content/resume-examples/construction-worker.mdx`
- `frontend/content/resume-examples/bartender.mdx`

## Google SEO Content Writing Guidelines (2026)

Complete playbook for writing any page or blog post. Based on Google's 2026 algorithm, Helpful Content System, Quality Rater Guidelines, and E-E-A-T framework.

### Content Length

| Content Type | Word Count |
|---|---|
| News/updates | 400–700 words |
| Product reviews | 1,000–1,800 words |
| Listicles | 1,200–1,800 words |
| Blog posts (SEO) | 1,500–2,500 words |
| In-depth guides / pillar pages | 2,000–3,000 words |
| Resume example pages | 800+ words (excluding frontmatter) |

- Google says word count is NOT a direct ranking factor, but top-ranking pages average 1,447–1,500 words (Backlinko study)
- Quality > quantity. A focused 1,500-word piece beats a padded 4,000-word piece
- Analyze top 3-5 competitor pages and slightly exceed their depth with superior value
- Content over 10,000 words can hurt if it fails to match search intent

### Title Tag (`<title>`)
- **Length:** 50–60 characters (under 600px) to avoid truncation
- **Primary keyword near the beginning** — front-loading improves relevancy
- **Match closely with H1** — this is the #1 way to prevent Google from rewriting your title (Google rewrites ~61% of titles, mostly due to length or mismatch)
- **Unique per page** — duplicate titles confuse Google about which page to rank
- **Natural language** — no keyword stuffing or repeating the same keyword
- **For YMYL content** (health, finance): accuracy and helpfulness matter more than keyword optimization

### H1 Heading
- **One H1 per page** — include the primary keyword
- **Align with title tag** — same core message, but H1 can be more conversational or detailed
- **Google uses H1 as a secondary relevancy signal** — and often pulls H1 text when rewriting titles
- **Don't repeat the exact keyword from the title** — use a natural variation

### Meta Description (`description` in frontmatter)
- **Length:** 150–160 characters — Google truncates beyond this
- **Not a direct ranking factor** — but affects click-through rate (CTR), which indirectly affects rankings
- **Include target keyword naturally** — Google bolds matching terms in SERPs
- **Write it as a compelling ad** — tell users what they'll get, not just what the page is about
- **Google may ignore it** — and generate its own from page content, so ensure body content is strong

### URL Slug
- **Short, readable, keyword-rich** — use 1–2 keywords
- **Hyphens to separate words** — not underscores
- **Remove filler words** (the, and, of, a, is)
- **Avoid numbers** in URLs (they become outdated)
- **Lowercase only**

### Heading Structure (H2–H6)
- **H2s for major sections** — use secondary/related keywords (not the primary keyword again)
- **H3s+ for subsections** — add specificity and detail
- **Break content every ~300 words** with a heading — readers lose focus after 300 words without a visual break
- **Self-explanatory headings** — AI Overviews and LLMs use headings to summarize answers. If a reader can scan headings and get the gist, your structure is good
- **29% of top-performing articles** use H2, H3, and H4 tags together

### Paragraph & Readability
- **2–4 sentences per paragraph** (40–70 words) — short paragraphs improve mobile readability
- **Primary keyword in the first 100–150 words** — lead with intent, answer the primary question early
- **Keyword density: 0.8–1.2%** — enough for clarity, not stuffing
- **Use both full terms and abbreviations** — e.g., "Certified Nursing Assistant (CNA)"
- **Bullet points, numbered lists, and tables** for scannable content
- **One image every 300–400 words** — breaks up text, improves engagement

### Internal Linking
- **Every page should link to at least one other page on the site** — Google uses internal links to discover and rank pages
- **1–3 contextual links per section** between related content (e.g., resume example → related blog post, blog → builder page)
- **Descriptive anchor text** — "software engineer resume example" not "click here"
- **Varied anchor text** — don't use the same exact-match keyword for every link to the same page
- **Avoid link stuffing** — multiple links in one paragraph weakens authority signals

### Image Alt Text
- **Descriptive, information-rich** — describe the image content in context of the page
- **Include keyword where natural** — but no keyword stuffing
- **Alt text acts as anchor text** when images are wrapped in links
- **Ensure alt text on mobile versions** — critical for mobile-first indexing
- **Format:** `[Job Title] Resume Example` or `[Topic] Infographic`

### E-E-A-T Signals (Experience, Expertise, Authoritativeness, Trustworthiness)

In 2026, E-E-A-T behaves as a ranking filter and AI visibility filter. Non-negotiable for YMYL content (health, finance, career advice — which includes our resume content).

**Experience:**
- First-hand knowledge signals: case studies, original data, specific examples
- "Tested for X hours" or "Based on X years of experience" language
- Screenshots, real metrics, and practical tips that only someone with experience would know

**Expertise:**
- Author bios with real credentials, job titles, and years of experience
- Correct use of technical terminology with definitions where needed
- Content that explains "why" not just "what"

**Authoritativeness:**
- Named authors (not "Team" or "Admin") with dedicated author profile pages
- Author headshot, LinkedIn link, professional background
- Cite authoritative external sources (BLS, industry associations, peer-reviewed data)

**Trustworthiness:**
- Cite sources with links — salary data from BLS/Glassdoor/PayScale
- Include disclaimers where appropriate ("Actual compensation varies...")
- Transparent about content creation methodology
- No misleading claims or clickbait

### Author & Schema Requirements
- Every content page must have a named `author` in frontmatter
- Author profile pages must include: headshot, bio, credentials, social links, list of authored content
- Use `Article`/`BlogPosting` schema linking to `Person` schema for author
- Person schema should include: `jobTitle`, `alumniOf`, `knowsAbout`, `sameAs` (LinkedIn, etc.)

### Tags & Keywords (frontmatter)
- **6–8 tags per page** — mix of primary keyword, long-tail variations, and related terms
- **Include both exact-match and partial-match** — e.g., "cna resume", "cna resume example", "cna resume template"
- **Add broader category tags** — e.g., "resume format", "ats resume template", "resume writing guide"
- **No duplicate tags across the same page**
- **Tags should reflect actual search queries** users type into Google

### Target Keyword Placement Checklist (MANDATORY)

The target keyword is `tags[0]` in frontmatter. When creating or editing ANY page or blog post, the target keyword (or its words) MUST appear in ALL of these locations. NEVER remove keyword words when shortening or rewriting any element.

| # | Location | Priority | Rule |
|---|----------|----------|------|
| 1 | **Title tag** (`title` in frontmatter) | Critical | Front-load keyword. Keep ≤60 chars. Every word of `tags[0]` must be present |
| 2 | **H1 heading** (first `##` in MDX body) | Critical | Include keyword or natural variation. Align with title but can be more conversational |
| 3 | **First 100–150 words** of body | Critical | Keyword must appear in the opening paragraph. Google weights early content more heavily |
| 4 | **URL slug** (`slug` in frontmatter) | High | Keyword-based, hyphens, no filler words, no year numbers, lowercase |
| 5 | **Meta description** (`description` in frontmatter) | High | Every word of `tags[0]` must be present. Google bolds matching terms in SERPs |
| 6 | **H2/H3 subheadings** | High | Use keyword **variations** and related terms — not the exact keyword repeated |
| 7 | **Image alt text** (`imageAlt` in frontmatter) | Medium | Include keyword naturally |
| 8 | **Internal link anchor text** | Medium | Use descriptive anchor text with keyword, not "click here" |
| 9 | **Body content** (natural usage) | High | 0.8–1.2% density. Use both full terms and abbreviations (e.g., "Certified Nursing Assistant (CNA)") |

**Verification rule:** Before saving any content change, check that every word in `tags[0]` still appears in both the `title` and `description`. If any keyword word was removed, the change is blocked until fixed.

### Content Freshness
- Include the current year in titles and content — e.g., "2026 Guide"
- Update `date` in frontmatter when content is meaningfully revised
- Reference current tools, platforms, and industry standards (not outdated ones)
- Salary data and statistics should cite the most recent available sources

### What to Avoid (Google Penalties)
- **Keyword stuffing** — repeating keywords unnaturally (triggers spam detection)
- **Thin content** — pages under 300 words with no unique value
- **Duplicate content** — identical or near-identical text across multiple pages
- **Scaled content abuse** — mass-producing AI content without human oversight or unique value
- **Clickbait titles** — titles that don't match page content cause high bounce rates
- **Hidden text or links** — any technique designed to trick search engines
- **Over-optimization** — obsessing over exact keyword placement at the expense of readability
- **Missing author attribution** — anonymous content scores lower on E-E-A-T
- **Walls of text** — no headings, no images, no formatting = high bounce rate

## Development
- Dev server runs on port 4455: `npm run dev`
- Clear `.next` cache if you encounter Turbopack errors: `rm -rf .next`
