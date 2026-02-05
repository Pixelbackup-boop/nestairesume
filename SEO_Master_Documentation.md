# Project SEO Documentation: Strategy & Implementation

**Status:** Implementation In Progress
**Strategies Implemented:** Phase 1 (Unicorn Pillar), Phase 2 (Programmatic SEO), Phase 3 (Template Collections)

---

## Part 1: The Master "Low DA" Strategy

**The Core Problem:** As a new site (Low Domain Authority), we cannot rank for broad terms like "Resume Builder".
**The Solution:** Attack "Unicorn" keywords (High Volume / Low Competition) and "Long Tail" clusters.

### Target Keywords Matrix
| Keyword | Volume | Strategy | Status |
| :--- | :--- | :--- | :--- |
| `resume format` | 5,000,000 | **Pillar Page** (/resume-format) | ✅ Live |
| `resume examples` | 500,000 | **Programmatic Engine** (/resume-examples/[job]) | ✅ Live |
| `ats resume template` | 50,000 | **Template Collection** (/templates/ats) | ✅ Live |
| `cv template word` | 50,000 | **Template Collection** (/templates/word) | ✅ Live |

---

## Part 2: Implemented Code (Phase 1: Resume Format Pillar)

**Goal:** Capture 5M traffic for "Resume Format" and offer free Word downloads.

### 1. Page Component
`frontend/app/[locale]/resume-format/page.tsx`
```tsx
// (Source code included in actual file, summarized here)
// Features: 
// - Deep guides on Chronological/Functional/Combination formats
// - Visual Comparison Table
// - Direct Download Buttons for .docx templates
// - Conversion Funnels to /onboarding
```

### 2. Assets
- `public/templates/chronological_resume_template.docx`
- `public/templates/functional_resume_template.docx`
- `public/templates/combination_resume_template.docx`

---

## Part 3: Implemented Code (Phase 2: Programmatic SEO)

**Goal:** Capture 500k traffic for "Resume Examples" by generating pages for every job title.

### 1. Data Schema & Engine
`frontend/lib/resume-examples/data.ts`
```typescript
export interface ResumeExampleData {
  jobTitle: string;
  slug: string;
  seoDescription: string;
  summary: string;
  skills: string[];
  experience: { title: string; company: string; period: string; points: string[] }[];
  education: { degree: string; school: string; year: string }[];
}

export const RESUME_EXAMPLES: ResumeExampleData[] = [
  // Populated with: Software Engineer, Nurse, Project Manager, Marketing Manager, Customer Service
];
```

### 2. Dynamic Route (The Engine)
`frontend/app/[locale]/resume-examples/[job]/page.tsx`
- **Dynamic Routing:** specific URL for each job (e.g., `/resume-examples/registered-nurse`).
- **SSG:** Uses `generateStaticParams` to pre-render pages for SEO speed.
- **Metadata:** Auto-generates unique Title Tags: "{Job Title} Resume Example & Guide (2026)".
- **Layout:** Renders the JSON data into a beautiful, ATS-friendly resume layout.

### 3. Hub Page
`frontend/app/[locale]/resume-examples/page.tsx`
- Lists all available examples.
- Serves as a crawlable directory for Google bots.

---

## Part 4: Implemented Code (Phase 3: Template Collections)

**Goal:** Capture high-intent traffic for specific file formats (Word, Google Docs) or styles.

### 1. Configuration Strategy
`frontend/lib/templates/categories.ts`
- Maps slugs (`google-docs`, `simple`) to SEO metadata.
- Allows instant creation of new landing pages by adding an object to the array.

### 2. Dynamic Collection Route
`frontend/app/[locale]/templates/[category]/page.tsx`
- **One Page to Rule Them All:** generated landing pages for all 4 categories.
- **SEO Content:** Includes a "Text Trap" (SEO description) unique to each category.
- **Conversion:** Each template card has "Edit in AI" buttons.

### 3. Collections Hub
`frontend/app/[locale]/templates/page.tsx`
- Central directory linking to all 4 collections.
- Distributes internal link equity to the landing pages.
