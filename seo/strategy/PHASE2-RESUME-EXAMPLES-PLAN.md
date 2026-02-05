# Phase 2: Resume Examples Section - Implementation Plan

**Date:** January 25, 2025
**Priority:** HIGH (Biggest SEO opportunity)
**Competitors have:** 50-500+ job-specific pages

---

## Overview

Create `/resume-examples/` section with job-specific resume pages targeting long-tail keywords like:
- "software engineer resume example"
- "nurse resume example 2025"
- "marketing manager resume template"

---

## Architecture (Following career-tips Pattern)

### Route Structure
```
frontend/app/[locale]/resume-examples/
├── layout.tsx              # SEO metadata
├── page.tsx               # Listing page (client component)
└── [slug]/
    └── page.tsx           # Individual job page (server component)
```

### Content Storage
```
frontend/content/resume-examples/
├── software-engineer.mdx
├── marketing-manager.mdx
├── nurse.mdx
├── teacher.mdx
└── ... (20+ files)
```

### Library Functions
```
frontend/lib/resume-examples/
└── posts.ts               # Or extend lib/blog/posts.ts
```

---

## Files to Create

### 1. Route Files

| File | Type | Purpose |
|------|------|---------|
| `app/[locale]/resume-examples/layout.tsx` | Server | SEO metadata wrapper |
| `app/[locale]/resume-examples/page.tsx` | Client | Listing with search/filter |
| `app/[locale]/resume-examples/[slug]/page.tsx` | Server | Individual job page |
| `app/api/resume-examples/route.ts` | API | JSON endpoint for client fetch |

### 2. Content Files (Phase 1 - 20 Jobs)

| Filename | Target Keyword | Search Volume |
|----------|----------------|---------------|
| `software-engineer.mdx` | software engineer resume | High |
| `marketing-manager.mdx` | marketing manager resume | High |
| `nurse.mdx` | nurse resume | Very High |
| `teacher.mdx` | teacher resume | Very High |
| `project-manager.mdx` | project manager resume | High |
| `data-analyst.mdx` | data analyst resume | High |
| `graphic-designer.mdx` | graphic designer resume | Medium |
| `sales-representative.mdx` | sales resume | High |
| `accountant.mdx` | accountant resume | High |
| `administrative-assistant.mdx` | administrative assistant resume | High |
| `customer-service.mdx` | customer service resume | High |
| `web-developer.mdx` | web developer resume | High |
| `product-manager.mdx` | product manager resume | High |
| `human-resources.mdx` | hr resume | High |
| `financial-analyst.mdx` | financial analyst resume | Medium |
| `mechanical-engineer.mdx` | mechanical engineer resume | Medium |
| `executive-assistant.mdx` | executive assistant resume | Medium |
| `business-analyst.mdx` | business analyst resume | High |
| `ux-designer.mdx` | ux designer resume | High |
| `data-scientist.mdx` | data scientist resume | High |

### 3. Library Functions

```typescript
// frontend/lib/resume-examples/posts.ts
export async function getAllResumeExamples(): Promise<PostMeta[]>
export async function getResumeExampleBySlug(slug: string): Promise<Post | null>
export async function getAllResumeExampleSlugs(): Promise<string[]>
export async function getResumeExamplesByCategory(category: string): Promise<PostMeta[]>
export async function getRelatedResumeExamples(currentSlug: string, limit: number): Promise<PostMeta[]>
```

### 4. i18n Keys

```json
// Add to messages/en.json (and other locales)
"ResumeExamples": {
  "meta": {
    "title": "Resume Examples by Job Title | Free Templates & Guides",
    "description": "Browse 50+ professional resume examples by job title. Each includes a free template, key skills, and writing tips."
  },
  "hero": {
    "badge": "Job-Specific Guides",
    "title": "Resume Examples",
    "titleHighlight": "by Job Title",
    "subtitle": "Find your profession and get a customized resume template with industry-specific tips."
  },
  "searchPlaceholder": "Search by job title...",
  "categories": {
    "all": "All Jobs",
    "technology": "Technology",
    "healthcare": "Healthcare",
    "business": "Business",
    "creative": "Creative",
    "education": "Education"
  },
  "cta": {
    "title": "Ready to create your",
    "titleHighlight": "{job} resume?",
    "button": "Build My Resume Now"
  }
}
```

---

## Content Schema (MDX Frontmatter)

```yaml
---
title: "Software Engineer Resume: Examples & Writing Guide 2025"
slug: "software-engineer"
description: "Create a compelling software engineer resume with our free template. Includes 5+ examples, key skills, and ATS-optimized bullet points."
date: "2025-01-25"
author: "Career Expert"
category: "Technology"
tags: ["software engineer resume", "developer resume", "programmer resume", "tech resume"]
image: "/images/resume-examples/software-engineer.png"
imageAlt: "Software Engineer Resume Example"
featured: true
jobTitle: "Software Engineer"
avgSalary: "$120,000"
jobGrowth: "+25%"
keySkills: ["Python", "JavaScript", "AWS", "Git", "Agile"]
---
```

---

## Page Components

### Listing Page (`page.tsx`)

```
┌─────────────────────────────────────────────────┐
│  Hero Section                                   │
│  "Resume Examples by Job Title"                 │
│  [Search Bar: "Search by job title..."]        │
├─────────────────────────────────────────────────┤
│  Category Pills                                 │
│  [All] [Technology] [Healthcare] [Business]...  │
├─────────────────────────────────────────────────┤
│  Featured Examples (if featured: true)          │
│  ┌────┐ ┌────┐ ┌────┐                          │
│  │    │ │    │ │    │                          │
│  └────┘ └────┘ └────┘                          │
├─────────────────────────────────────────────────┤
│  All Examples Grid (3 columns)                  │
│  ┌────┐ ┌────┐ ┌────┐                          │
│  │Job │ │Job │ │Job │ (shows job icon,         │
│  │Name│ │Name│ │Name│  title, salary, growth)  │
│  └────┘ └────┘ └────┘                          │
├─────────────────────────────────────────────────┤
│  CTA: "Can't find your job? Build custom resume"│
└─────────────────────────────────────────────────┘
```

### Individual Job Page (`[slug]/page.tsx`)

```
┌─────────────────────────────────────────────────┐
│  Breadcrumb: Home > Resume Examples > [Job]     │
├─────────────────────────────────────────────────┤
│  ┌─────────────────────┬───────────────────────┤
│  │ Job Header          │ Quick Stats Sidebar   │
│  │ [Job Title] Resume  │ Avg Salary: $120K    │
│  │ Description text    │ Growth: +25%         │
│  │ Updated: Jan 2025   │ Industry: Tech       │
│  ├─────────────────────┤                      │
│  │ Resume Preview      │ Key Skills:          │
│  │ ┌─────────────────┐ │ • Python            │
│  │ │  Visual Resume  │ │ • JavaScript        │
│  │ │  Example Image  │ │ • AWS               │
│  │ │                 │ │                      │
│  │ └─────────────────┘ │ [Use This Template]  │
│  │ [Download] [Edit]   │                      │
│  ├─────────────────────┼───────────────────────┤
│  │ Content Sections:   │ Table of Contents    │
│  │ - Professional      │ 1. Summary           │
│  │   Summary Examples  │ 2. Skills            │
│  │ - Key Skills        │ 3. Experience        │
│  │ - Experience Tips   │ 4. Common Mistakes   │
│  │ - Bullet Examples   │                      │
│  │ - Common Mistakes   │ Related Jobs:        │
│  │ - FAQ               │ • Data Analyst       │
│  │                     │ • DevOps Engineer    │
│  └─────────────────────┴───────────────────────┘
├─────────────────────────────────────────────────┤
│  Related Resume Examples (3 cards)              │
├─────────────────────────────────────────────────┤
│  CTA: "Build Your [Job] Resume Now - Free"      │
└─────────────────────────────────────────────────┘
```

---

## SEO Optimization

### Per-Page Metadata
```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    title: `${example.jobTitle} Resume: Examples & Writing Guide 2025`,
    description: example.description,
    keywords: example.tags.join(', '),
    openGraph: {
      type: 'article',
      images: [{ url: example.image, alt: example.imageAlt }],
    },
    alternates: {
      canonical: `https://www.bestairesumes.com/resume-examples/${slug}`,
    },
  };
}
```

### JSON-LD Schema
```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Write a Software Engineer Resume",
  "description": "Step-by-step guide to creating a software engineer resume",
  "step": [
    { "@type": "HowToStep", "text": "Write a compelling summary" },
    { "@type": "HowToStep", "text": "List technical skills" },
    { "@type": "HowToStep", "text": "Describe work experience with metrics" }
  ],
  "tool": {
    "@type": "HowToTool",
    "name": "Best AI Resume Builder"
  }
}
```

---

## Implementation Steps

### Step 1: Create Route Structure
1. Create `app/[locale]/resume-examples/layout.tsx`
2. Create `app/[locale]/resume-examples/page.tsx` (listing)
3. Create `app/[locale]/resume-examples/[slug]/page.tsx` (individual)
4. Create `app/api/resume-examples/route.ts`

### Step 2: Create Library Functions
1. Create `lib/resume-examples/posts.ts`
2. Add types to `lib/blog/types.ts` (extend PostFrontmatter)

### Step 3: Create Content Directory
1. Create `content/resume-examples/` folder
2. Create 5 initial MDX files (software-engineer, nurse, teacher, marketing-manager, data-analyst)

### Step 4: Add i18n Translations
1. Add `ResumeExamples` namespace to all 5 locale files

### Step 5: Update Sitemap
1. Update `app/sitemap.ts` to include resume-examples pages

### Step 6: Scale Content
1. Create remaining 15 MDX files
2. Add more job titles over time (50+ goal)

---

## Verification Checklist

- [ ] Listing page loads with all examples
- [ ] Search/filter works
- [ ] Individual pages load with correct content
- [ ] SEO metadata correct (check with SEO tools)
- [ ] JSON-LD schema valid (Google Rich Results Test)
- [ ] Mobile responsive
- [ ] All 5 locales work
- [ ] Sitemap includes new pages
- [ ] Internal links to builder work
- [ ] Related examples show correctly

---

## Files Summary

**New Files to Create:**
```
frontend/
├── app/
│   ├── [locale]/resume-examples/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   └── api/resume-examples/route.ts
├── lib/resume-examples/
│   └── posts.ts
├── content/resume-examples/
│   ├── software-engineer.mdx
│   ├── marketing-manager.mdx
│   ├── nurse.mdx
│   ├── teacher.mdx
│   ├── project-manager.mdx
│   └── ... (15 more files)
└── messages/
    └── en.json (add ResumeExamples namespace)
```

**Files to Modify:**
```
frontend/
├── app/sitemap.ts (add resume-examples)
├── lib/blog/types.ts (extend frontmatter types)
└── messages/
    ├── de.json
    ├── fr.json
    ├── es.json
    └── ar.json
```

---

## Timeline Estimate

| Task | Effort |
|------|--------|
| Route structure + API | 2-3 hours |
| Library functions | 1-2 hours |
| Listing page component | 2-3 hours |
| Individual page component | 3-4 hours |
| i18n translations | 1-2 hours |
| 5 initial content files | 2-3 hours |
| Testing & verification | 1-2 hours |
| **Total Phase 2a** | **12-19 hours** |

| Content Scaling | Effort |
|-----------------|--------|
| 15 more MDX files | 5-8 hours |
| Scale to 50 jobs | Ongoing |
