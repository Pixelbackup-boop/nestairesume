# Resume Template Fixes Reference Guide

This document outlines common issues encountered in both **PDF templates** (backend) and **Web Preview templates** (frontend), along with their solutions. Use this as a reference when creating or fixing templates.

---

## Table of Contents

### PDF Template Issues (Backend)
1. [Multi-Page Sidebar Background Issue](#1-multi-page-sidebar-background-issue)
2. [Accent Stripe Not Extending Full Height](#2-accent-stripe-not-extending-full-height)
3. [Text Showing in Gap Between Pages](#3-text-showing-in-gap-between-pages)
4. [Contact Info Display (Icons Only vs Icons + Text)](#4-contact-info-display)
5. [Color Consistency Between Preview and PDF](#5-color-consistency-between-preview-and-pdf)
6. [Quick Reference: Template Structure](#6-quick-reference-template-structure)

### Web Preview Issues (Frontend)
7. [Table Layout vs Flex Layout for PDF Generation](#7-table-layout-vs-flex-layout-for-pdf-generation)
8. [Frontend Contact Info Not Visible](#8-frontend-contact-info-not-visible)
9. [Skill/Language Level Bars Not Showing Correct Values](#9-skill-language-level-bars-not-showing-correct-values)
10. [Sidebar Width Too Narrow](#10-sidebar-width-too-narrow)
11. [Frontend-Backend Template Parity](#11-frontend-backend-template-parity)
12. [Progress Bars Invisible on Dark Sidebars](#12-progress-bars-invisible-on-dark-sidebars)
13. [Section Header Orphan Protection](#13-section-header-orphan-protection)
14. [Section Placement Parity (Frontend-Backend)](#14-section-placement-parity-frontend-backend)
15. [Container Background Covering Fixed Sidebar on Page 2+](#15-container-background-covering-fixed-sidebar-on-page-2)

---

## 1. Multi-Page Sidebar Background Issue

### Problem
Sidebar background only fills ~70% on page 2, 3, etc. The dark/colored sidebar doesn't extend to the bottom of subsequent pages.

### Why It Happens
- `display: flex` with `min-height: 100%` only makes the sidebar 100% of the first page's content height
- `position: fixed` doesn't work correctly in PDF print context - elements don't repeat on each page
- CSS properties that work in browsers don't always translate to PDF rendering

### Solution: Hybrid Approach (Fixed Background + Table Layout)

```typescript
return `
    <!-- Fixed background that covers full page on ALL pages -->
    <div class="sidebar-bg-fixed" style="background-color: ${sidebarBg}; width: 33%;"></div>

    <!-- Table layout for content structure -->
    <div style="width: 100%; min-height: 100%; display: table; table-layout: fixed;">

        <!-- Sidebar - table-cell -->
        <aside style="display: table-cell; width: 33%; background-color: ${sidebarBg}; padding: 48px 32px; vertical-align: top;">
            <!-- Sidebar content here -->
        </aside>

        <!-- Main Content - table-cell -->
        <main style="display: table-cell; width: 67%; padding: 64px 48px; vertical-align: top;">
            <!-- Main content here -->
        </main>
    </div>
`;
```

### Key Points
1. **Fixed Background Div**: Add `class="sidebar-bg-fixed"` with the sidebar color - this CSS class is defined in `htmlWrapper.ts` and uses `position: fixed` to cover all pages
2. **Table Layout**: Use `display: table` on container and `display: table-cell` on columns - table cells are inherently equal height
3. **Width Override**: Add inline `width: XX%` to match your sidebar width (the CSS class defaults to 35%)
4. **Remove Flexbox**: Replace `display: flex` with table layout for the main container

### Templates Fixed
- `sidebar-monogram.ts` (30% sidebar)
- `header-dark.ts` (33% sidebar)
- `sidebar-dark-navy.ts` (35% sidebar)
- `sidebar-narrow-yellow.ts` (25% sidebar)

---

## 2. Accent Stripe Not Extending Full Height

### Problem
Accent stripe (colored border between sidebar and main content) only extends to content height on page 2+.

### Why It Happens
- `border-right` on a table-cell only extends to that cell's content height
- The border doesn't continue on subsequent pages

### Solution: Fixed-Position Accent Stripe

```typescript
return `
    <!-- Fixed background -->
    <div class="sidebar-bg-fixed" style="background-color: ${sidebarBg}; width: 30%;"></div>

    <!-- Fixed accent stripe at sidebar edge - full page height on ALL pages -->
    <div style="position: fixed; top: 0; left: 30%; width: 8px; height: 100%; background-color: ${accentColor}; z-index: 2;"></div>

    <!-- Table layout (NO border-right on aside) -->
    <div style="display: table; ...">
        <aside style="display: table-cell; width: 30%; ...">
            <!-- NO border-right here -->
        </aside>
        <main style="display: table-cell; width: 70%; ...">
        </main>
    </div>
`;
```

### Key Points
1. **Separate Fixed Div**: Create a dedicated div for the accent stripe
2. **Position at Edge**: Set `left: XX%` to match sidebar width exactly
3. **Remove Border**: Remove `border-right` from the aside element
4. **Z-Index**: Use `z-index: 2` to ensure stripe appears above content

---

## 3. Text Showing in Gap Between Pages

### Problem
Content (text, sections) appears in the gap between PDF pages, getting cut off or split awkwardly across page breaks.

### Why It Happens
- PDF renderers split content at fixed page boundaries
- Long sections or items can break mid-sentence
- No automatic "keep together" behavior by default

### Solution: Use `data-paginate` Attributes

Add `data-paginate="item"` to elements that should stay together:

```typescript
// Individual items that shouldn't break across pages
${education.map(edu => `
    <div data-paginate="item">
        <h4>${escapeHtml(edu.degree)}</h4>
        <div>${escapeHtml(edu.school)}</div>
        <div>${escapeHtml(edu.startDate)} – ${edu.endDate || 'Present'}</div>
    </div>
`).join('')}
```

### Key Points
1. **`data-paginate="item"`**: Marks elements that should stay together on a single page
2. **Apply to List Items**: Use on education entries, experience entries, certifications, etc.
3. **Works with `htmlWrapper.ts`**: The CSS in htmlWrapper handles the page-break behavior
4. **Don't Overuse**: Only apply to items that truly need to stay together

### CSS Applied (from htmlWrapper.ts)
```css
[data-paginate="item"] {
    page-break-inside: avoid;
    break-inside: avoid;
}
```

### Templates Using This
- `sidebar-monogram.ts` - Education, certifications, awards items
- `header-dark-box.ts` - All list items
- Most templates with repeated list sections

### Common Mistake: Missing `data-paginate="item"` on Individual Entries

Sections may have `data-paginate` on the wrapper, but individual entries ALSO need the attribute:

```tsx
// BAD - Only section has data-paginate, individual items will be split
<section className="mb-10 resume-section" data-paginate>
    {experience.map((exp) => (
        <div key={exp.id}>  {/* Missing data-paginate="item"! */}
            ...
        </div>
    ))}
</section>

// GOOD - Both section AND items have data-paginate
<section className="mb-10 resume-section" data-paginate>
    {experience.map((exp) => (
        <div key={exp.id} data-paginate="item">  {/* Prevents splitting */}
            ...
        </div>
    ))}
</section>
```

### Checklist for Pagination Attributes
- [ ] Experience entries: `data-paginate="item"`
- [ ] Education entries: `data-paginate="item"`
- [ ] Certification entries: `data-paginate="item"`
- [ ] Award entries: `data-paginate="item"`
- [ ] Skill items (if listed): `data-paginate="item"`
- [ ] Language items: `data-paginate="item"`

---

## 4. Contact Info Display

### Problem
Contact section shows only emoji icons with values hidden in `title` tooltips - not visible in preview or PDF.

### Bad Pattern (Icons Only)
```typescript
// DON'T DO THIS
{personalInfo.phone && <div title={personalInfo.phone}>📞</div>}
```

### Good Pattern (Icons + Text)
```typescript
// DO THIS
${personalInfo.phone ? `
    <div style="display: flex; align-items: center; gap: 8px;">
        <span>📞</span>
        <span>${escapeHtml(personalInfo.phone)}</span>
    </div>
` : ''}
```

### For Long Values (Email, Website)
```typescript
<span style="word-break: break-all;">${escapeHtml(personalInfo.email)}</span>
```

---

## 5. Color Consistency Between Preview and PDF

### Problem
Colors in web preview don't match the PDF output.

### Solution
1. **Use Exact Hex Codes**: Define colors as constants at the top of the template
2. **Match Frontend Colors**: Copy exact color values from the corresponding frontend component
3. **Use customThemeColor**: Respect user's custom accent color

```typescript
// Theme colors - matching frontend component
const sidebarBg = '#374151'; // Gray 700 (dark sidebar)
const mainBg = '#FFFFFF';
const sidebarText = '#f9fafb'; // Light text for dark background
const mainText = '#1f2937'; // Gray 800
const accentColor = data.customThemeColor || '#facc15'; // Yellow 400 (gold)
```

---

## 6. Quick Reference: Template Structure

### Standard Sidebar Template (with multi-page fix)

```typescript
export const renderTemplateName = (data: PdfResumeData, theme: PdfTheme): string => {
    const { personalInfo, experience, education, skills, ... } = data;

    // Fonts
    const headingFont = getFontFamily(fonts?.heading || 'Inter');
    const bodyFont = getFontFamily(fonts?.body || 'Inter');

    // Colors (match frontend exactly)
    const sidebarBg = '#XXXXXX';
    const mainBg = '#FFFFFF';
    const accentColor = data.customThemeColor || '#XXXXXX';

    return `
        <!-- 1. Fixed background for full-page coverage -->
        <div class="sidebar-bg-fixed" style="background-color: ${sidebarBg}; width: XX%;"></div>

        <!-- 2. Fixed accent stripe (if needed) -->
        <div style="position: fixed; top: 0; left: XX%; width: 8px; height: 100%; background-color: ${accentColor}; z-index: 2;"></div>

        <!-- 3. Table layout container -->
        <div style="width: 100%; min-height: 100%; font-family: ${bodyFont}; display: table; table-layout: fixed;">

            <!-- 4. Sidebar (table-cell) -->
            <aside style="display: table-cell; width: XX%; background-color: ${sidebarBg}; padding: 48px 24px; vertical-align: top;">
                <!-- Profile, Contact, Skills, Languages, etc. -->
            </aside>

            <!-- 5. Main Content (table-cell) -->
            <main style="display: table-cell; width: XX%; padding: 64px 48px; vertical-align: top;">
                <!-- Name, Summary, Experience, Education, etc. -->
            </main>
        </div>
    `;
};
```

### CSS Class Reference (from htmlWrapper.ts)

```css
/* Fixed sidebar background - covers all pages */
.sidebar-bg-fixed {
    position: fixed;
    top: 0;
    left: 0;
    width: 35%;  /* Override with inline style if different */
    height: 100%;
    z-index: 0;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
}
```

---

## Checklist for New Sidebar Templates

- [ ] Use `sidebar-bg-fixed` class for background (override width if needed)
- [ ] Use `display: table` / `table-cell` layout instead of flexbox
- [ ] Use fixed-position div for accent stripes
- [ ] Show contact info as icon + text (not title tooltips)
- [ ] Match colors exactly from frontend component
- [ ] Use `escapeHtml()` for all user content
- [ ] Use `formatDescription()` for multi-line text
- [ ] Add `vertical-align: top` to table cells
- [ ] Add `data-paginate="item"` to list items (education, experience, etc.)
- [ ] Test with multi-page content to verify backgrounds extend

---

## Templates Using This Pattern

| Template | Sidebar Width | Has Accent Stripe |
|----------|--------------|-------------------|
| sidebar-monogram | 30% | Yes (8px gold) |
| sidebar-dark-navy | 35% | No |
| sidebar-narrow-yellow | 25% | Yes (6px yellow) |
| header-dark | 33% | No |

---

## 7. Table Layout vs Flex Layout for PDF Generation

### Problem
PDF output doesn't match web preview - sidebar elements (profile image, skills, strengths) render incorrectly or with wrong positioning. The web preview looks correct but the generated PDF is broken.

### Why It Happens
- Backend template uses `display: table` / `display: table-cell` layout
- Frontend React component uses `display: flex` layout
- Puppeteer PDF generation renders table layout inconsistently
- Table-cell elements don't support flexbox properties like `align-items: center`

### Bad Pattern (Table Layout)
```typescript
// DON'T DO THIS - Table layout renders inconsistently in Puppeteer
return `
    <div style="display: table; table-layout: fixed; width: 100%;">
        <aside style="display: table-cell; width: 33%; vertical-align: top;">
            <!-- Sidebar content -->
        </aside>
        <main style="display: table-cell; width: 67%; vertical-align: top;">
            <!-- Main content -->
        </main>
    </div>
`;
```

### Good Pattern (Flex Layout - Matching Frontend)
```typescript
// DO THIS - Flex layout matches frontend and renders correctly
return `
    <!-- Fixed background for multi-page support -->
    <div class="sidebar-bg-fixed" style="background-color: ${sidebarBg}; width: 33%;"></div>

    <!-- Flex layout matching frontend React component -->
    <div style="width: 100%; min-height: 100%; display: flex;">

        <!-- Sidebar -->
        <aside class="sidebar-content" style="width: 33%; background-color: ${sidebarBg}; padding: 40px 20px; flex-shrink: 0; min-height: 100%; display: flex; flex-direction: column; align-items: center; position: relative; z-index: 1;">
            <!-- Sidebar content -->
        </aside>

        <!-- Main Content -->
        <main style="flex: 1; padding: 56px 40px; display: flex; flex-direction: column;">
            <!-- Main content -->
        </main>
    </div>
`;
```

### Key Differences

| Property | Table Layout (Bad) | Flex Layout (Good) |
|----------|-------------------|-------------------|
| Container | `display: table` | `display: flex` |
| Sidebar | `display: table-cell` | `flex-shrink: 0; display: flex; flex-direction: column` |
| Main | `display: table-cell; width: 67%` | `flex: 1` |
| Centering | `text-align: center; line-height` | `align-items: center; justify-content: center` |
| Z-index | Not supported in table-cell | Works with `position: relative` |

### Profile Image Centering Fix

```typescript
// BAD - Table-cell centering (inconsistent in PDF)
<div style="text-align: center; line-height: 132px; font-size: 48px;">
    ${initials}
</div>

// GOOD - Flexbox centering (consistent in PDF)
<div style="display: flex; align-items: center; justify-content: center; font-size: 48px;">
    ${initials}
</div>
```

### Recommended Padding Values (Matching Narrow Yellow)

| Section | Padding |
|---------|---------|
| Sidebar | `40px 20px` (top/bottom 40px, left/right 20px) |
| Main Content | `56px 40px` (top/bottom 56px, left/right 40px) |

### Templates Fixed
- `header-dark.ts` - Changed from table layout to flex layout

### When to Use Table Layout vs Flex Layout

| Use Case | Recommended Layout |
|----------|-------------------|
| Frontend-backend parity needed | **Flex** (match frontend) |
| Multi-page sidebar backgrounds | **Table** + fixed background OR **Flex** + fixed background |
| Complex centering/alignment | **Flex** |
| Equal height columns only | Either works |

### Note on Multi-Page Backgrounds
Both layouts can work with multi-page sidebar backgrounds when combined with the `sidebar-bg-fixed` class. The key is consistency between frontend and backend templates.

---

## 8. Frontend Contact Info Not Visible

### Problem
Contact section in web preview shows only emoji icons - the actual values (phone, email, location) are hidden in `title` tooltips and not visible.

### Location
`frontend/components/templates/layouts/sidebar/[TemplateName].tsx`

### Bad Pattern
```tsx
{/* DON'T DO THIS - Only icon visible, text hidden in tooltip */}
{personalInfo.phone && <div title={personalInfo.phone}>📞</div>}
{personalInfo.email && <div title={personalInfo.email}>✉️</div>}
```

### Good Pattern
```tsx
{/* DO THIS - Icon + visible text */}
{personalInfo.phone && (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span>📞</span>
        <span>{personalInfo.phone}</span>
    </div>
)}
{personalInfo.email && (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span>✉️</span>
        <span style={{ wordBreak: 'break-all' }}>{personalInfo.email}</span>
    </div>
)}
```

### Templates Fixed
- `SidebarNarrowYellow.tsx`
- `SidebarMonogram.tsx`

---

## 9. Skill/Language Level Bars Not Showing Correct Values

### Problem
Progress bars for skills or languages show 0% or incorrect widths.

### Common Causes
1. **Missing level property**: Not accessing the correct property
2. **Incorrect calculation**: Not multiplying by correct factor
3. **Default value issues**: No fallback for undefined levels

### Solution
```tsx
// Skills (level is 1-5, multiply by 20 for percentage)
<ProgressBar value={(skill.level || 3) * 20} color={accentColor} />

// Languages (use helper function)
<ProgressBar value={getLanguageLevel(lang)} color={accentColor} />

// Strengths (might have direct percentage)
<ProgressBar value={str.level ?? 80} color={accentColor} />
```

### Helper Function for Languages
```typescript
const getLanguageLevel = (lang: { proficiency?: string }): number => {
    const prof = lang.proficiency?.toLowerCase() || '';
    if (prof.includes('native') || prof.includes('fluent')) return 100;
    if (prof.includes('advanced') || prof.includes('professional')) return 80;
    if (prof.includes('intermediate') || prof.includes('conversational')) return 60;
    if (prof.includes('basic') || prof.includes('beginner')) return 40;
    return 50; // default
};
```

---

## 10. Sidebar Width Too Narrow

### Problem
Sidebar is too narrow to display content properly (especially contact info with long emails).

### Solution
Adjust sidebar width percentage:

```tsx
// Frontend (TSX)
const sidebarWidth = '30%'; // Increase from 25% if too narrow

<aside style={{ width: sidebarWidth, ... }}>
```

```typescript
// Backend (TS)
<div class="sidebar-bg-fixed" style="background-color: ${sidebarBg}; width: 30%;"></div>
<aside style="display: table-cell; width: 30%; ...">
```

### Common Width Values
| Template Style | Recommended Width |
|----------------|-------------------|
| Narrow sidebar | 25% |
| Standard sidebar | 30-33% |
| Wide sidebar | 35-40% |

---

## 11. Frontend-Backend Template Parity

### Problem
Web preview (React component) looks different from PDF output (HTML template).

### Checklist for Matching Templates

1. **Colors**: Use exact same hex codes
   ```tsx
   // Frontend
   const sidebarBg = '#374151';
   const accentColor = customThemeColor || '#facc15';

   // Backend (must match!)
   const sidebarBg = '#374151';
   const accentColor = data.customThemeColor || '#facc15';
   ```

2. **Fonts**: Use same font families
   ```tsx
   // Frontend
   const headingFont = getFontFamily(fonts?.heading || 'Playfair Display');

   // Backend
   const headingFont = getFontFamily(fonts?.heading || 'Playfair Display');
   ```

3. **Spacing**: Match padding/margin values
   ```tsx
   // Frontend
   padding: scale < 1 ? '32px 16px' : '56px 24px'

   // Backend (use the larger values since PDF is full size)
   padding: 56px 24px
   ```

4. **Section Order**: Same order of sections in both
5. **Conditional Rendering**: Same conditions for showing/hiding sections

### File Pairing
| Frontend Component | Backend Template |
|-------------------|------------------|
| `SidebarMonogram.tsx` | `sidebar-monogram.ts` |
| `SidebarDarkNavy.tsx` | `sidebar-dark-navy.ts` |
| `SidebarNarrowYellow.tsx` | `sidebar-narrow-yellow.ts` |
| `HeaderDark.tsx` | `header-dark.ts` |

---

## 12. Progress Bars Invisible on Dark Sidebars

### Problem
Skill/language progress bars are invisible or barely visible on dark sidebar backgrounds, even when the value calculation is correct.

### Why It Happens
- The `trackColor` (background of the progress bar) is set to a dark color like `#334155`
- On a dark sidebar background (`#0f172a`, `#1e293b`, etc.), the dark track blends in
- Even with a bright accent color for the fill, if the track is invisible, the bar appears broken

### Bad Pattern
```tsx
// DON'T DO THIS on dark sidebars
<ProgressBar
    value={(skill.level || 3) * 20}
    color={accentColor}
    trackColor="#334155"  // Dark track on dark sidebar = invisible!
    height={6}
/>
```

### Good Pattern (Learned from SidebarMonogram)
```tsx
// Option 1: Don't pass trackColor (uses default light gray #e5e7eb)
<ProgressBar
    value={(skill.level || 3) * 20}
    color={accentColor}
    height={6}
/>

// Option 2: Use semi-transparent white for subtle contrast on dark backgrounds
<ProgressBar
    value={(skill.level || 3) * 20}
    color={accentColor}
    trackColor="rgba(255,255,255,0.15)"  // Subtle light track visible on dark sidebar
    height={6}
/>
```

### Key Points
1. **Check sidebar background**: If sidebar is dark (`#0f172a`, `#1e293b`, `#374151`), use light track colors
2. **Semi-transparent white**: `rgba(255,255,255,0.15)` provides subtle but visible contrast
3. **Default trackColor**: ProgressBar defaults to `#e5e7eb` (light gray) - works well on dark backgrounds
4. **Test visually**: Always verify progress bars are visible against the actual sidebar color

### Templates Fixed
- `HeaderDark.tsx` - Changed trackColor from `#334155` to `rgba(255,255,255,0.15)`

### Track Color Reference
| Sidebar Type | Recommended trackColor |
|--------------|----------------------|
| Dark (`#0f172a`, `#1e293b`) | `rgba(255,255,255,0.15)` or omit (use default) |
| Medium (`#374151`, `#4b5563`) | `rgba(255,255,255,0.2)` or `#6b7280` |
| Light/White | `#e5e7eb` (default) or `#d1d5db` |

---

## 13. Section Header Orphan Protection

### Problem
Section headers (e.g., "EDUCATION", "EXPERIENCE") appear orphaned at the bottom of a page while their content starts on the next page. This creates an awkward visual where only the header shows at page bottom.

### Why It Happens
- `PagedPreview.tsx` has orphan protection that checks for elements near page boundaries
- However, custom section header helper components (like `SectionHeaderMain`) may not have the `data-paginate` attribute
- Without this attribute, the pagination system doesn't push the header to the next page

### Solution: Add `data-paginate` to Section Header Helper Components

```tsx
// BAD - Section header helper without data-paginate
function SectionHeaderMain({ title, ... }: Props) {
    return (
        <h3 style={{ ... }}>
            {title}
        </h3>
    );
}

// GOOD - Section header helper WITH data-paginate
function SectionHeaderMain({ title, ... }: Props) {
    return (
        <h3
            data-paginate  // Enables orphan protection in PagedPreview
            style={{ ... }}
        >
            {title}
        </h3>
    );
}
```

### How Orphan Protection Works (PagedPreview.tsx)

The pagination system detects and pushes elements to prevent orphans:

1. **Selector**: Finds elements with `[data-paginate]`, `.section-header`, `h2`, `h3`
2. **Boundary Check**: If element is within 60px of page bottom AND content follows
3. **Push Action**: Adds CSS margin to push element to next page

```typescript
// From PagedPreview.tsx
const isBreakableElement =
    element.classList.contains('section-header') ||
    element.hasAttribute('data-paginate') ||
    element.tagName === 'H2' ||
    element.tagName === 'H3';

if (isBreakableElement) {
    const spaceRemaining = pageContentBottom - bottom;
    if (spaceRemaining < 60) {
        shouldPush = true;  // Push to next page
    }
}
```

### Key Points
1. **Built-in Support for h2/h3**: Standard headings get orphan protection automatically
2. **Custom Components Need data-paginate**: If your template uses helper components, add the attribute
3. **Works with Helper Components**: Both inline `<h3 data-paginate>` and helper functions work
4. **Minimum Height Threshold**: Elements under 80px are skipped to prevent excessive whitespace

### Templates Fixed
- `HeaderDark.tsx` - Added `data-paginate` to `SectionHeaderMain` helper component

### Checklist for New Templates
- [ ] Section headers (h2, h3) render with `data-paginate` if using helper components
- [ ] Standard h2/h3 tags get protection automatically (no action needed)
- [ ] Custom section header helpers include `data-paginate` attribute

---

## 14. Section Placement Parity (Frontend-Backend)

### Problem
After moving a section (e.g., Languages) from sidebar to main content in the **frontend**, the **PDF output** still shows it in the old location (sidebar). The web preview is correct but the downloaded PDF is wrong.

### Why It Happens
- Frontend React components (`HeaderDark.tsx`) and backend PDF templates (`header-dark.ts`) are separate files
- When you reorganize sections in one file, the change doesn't automatically propagate to the other
- The PDF generator uses the backend template, not the React component

### Solution: Mirror Section Changes in Both Files

**Step 1: Identify paired files**
```
Frontend: frontend/components/templates/layouts/header/HeaderDark.tsx
Backend:  backend/src/templates/pdf/header-dark.ts
```

**Step 2: Make the same structural change in both**

Example: Moving Languages from sidebar to main content:

```tsx
// Frontend (HeaderDark.tsx) - REMOVE from sidebar, ADD to main
// Sidebar section - REMOVE Languages here
<aside>
    {/* Contact, Skills, Strengths, Interests - but NOT Languages */}
</aside>

// Main content - ADD Languages after Education
<main>
    {/* Name, Profile, Experience, Education */}
    {/* ADD Languages section here */}
    {languages && languages.length > 0 && (
        <section className="mb-10 resume-section" data-paginate>
            <SectionHeaderMain title="Languages" ... />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 24px' }}>
                {languages.map((lang) => (
                    <div key={lang.id} style={{ fontSize: fs.body }} data-paginate="item">
                        <span style={{ fontWeight: 600 }}>{lang.name}</span>
                        <span style={{ marginLeft: 6 }}>({lang.proficiency})</span>
                    </div>
                ))}
            </div>
        </section>
    )}
    {/* Credentials, References */}
</main>
```

```typescript
// Backend (header-dark.ts) - SAME changes
// Sidebar section - REMOVE Languages here
<aside>
    <!-- Contact, Skills, Strengths, Interests - but NOT Languages -->
</aside>

// Main content - ADD Languages after Education
<main>
    <!-- Name, Profile, Experience, Education -->
    <!-- ADD Languages section here -->
    ${languages && languages.length > 0 ? `
        <section style="margin-bottom: 40px;">
            ${MainSectionHeader('Languages')}
            <div style="display: flex; flex-wrap: wrap; gap: 12px 24px;">
                ${languages.map(lang => `
                    <div style="font-size: 10pt;">
                        <span style="font-weight: 600; color: #0f172a;">${escapeHtml(lang.name)}</span>
                        <span style="color: #64748b; margin-left: 6px;">(${escapeHtml(lang.proficiency)})</span>
                    </div>
                `).join('')}
            </div>
        </section>
    ` : ''}
    <!-- Credentials, References -->
</main>
```

### Checklist for Section Reorganization
- [ ] Identify the paired frontend/backend files
- [ ] Remove section from old location in BOTH files
- [ ] Add section to new location in BOTH files
- [ ] Match the styling (fonts, colors, spacing)
- [ ] Use appropriate section header helper (`MainSectionHeader` for main, `SidebarSectionHeader` for sidebar)
- [ ] Test web preview AND download PDF to verify both match

### Templates Fixed
- `HeaderDark.tsx` + `header-dark.ts` - Languages moved from sidebar to main content

---

## 15. Container Background Covering Fixed Sidebar on Page 2+

### Problem
When using flex layout with `sidebar-bg-fixed`, the sidebar background only fills ~50% on page 2 and beyond. The fixed background element is correctly positioned, but something is covering it.

### Why It Happens
- The main **container div** has `background-color: ${mainBg}` (white) applied
- This white background paints OVER the `position: fixed` sidebar background element on page 2+
- On page 1, the sidebar's own `background-color` masks this issue
- On page 2+, there's no sidebar content to mask the container's white background

### Visual Comparison

```
PAGE 1 (looks correct):          PAGE 2 (broken):
┌─────────┬───────────┐          ┌─────────┬───────────┐
│ SIDEBAR │   MAIN    │          │ DARK BG │   MAIN    │  ← Fixed bg visible
│ (dark)  │  (white)  │          │ (fixed) │  (white)  │
│         │           │          ├─────────┤           │  ← Container white bg
│         │           │          │  WHITE  │           │     covers fixed bg!
│         │           │          │ (wrong) │           │
└─────────┴───────────┘          └─────────┴───────────┘
```

### Bad Pattern (Container has background)
```typescript
// DON'T DO THIS - Container's white background covers fixed sidebar on page 2+
return `
    <div class="sidebar-bg-fixed" style="background-color: ${sidebarBg}; width: 33%;"></div>

    <div style="width: 100%; min-height: 100%; display: flex; background-color: ${mainBg};">
        <!--                                                 ^^^^^^^^^^^^^^^^^^^^^^^^ BAD! -->
        <aside style="width: 33%; background-color: ${sidebarBg}; ...">
            <!-- Sidebar content -->
        </aside>
        <main style="flex: 1; padding: 56px 40px;">
            <!-- Main content - NO background here -->
        </main>
    </div>
`;
```

### Good Pattern (Background on main only)
```typescript
// DO THIS - Put white background on <main>, not container
return `
    <div class="sidebar-bg-fixed" style="background-color: ${sidebarBg}; width: 33%;"></div>

    <div style="width: 100%; min-height: 100%; display: flex;">
        <!--                                        ^^^^^^^^ No background! -->
        <aside style="width: 33%; background-color: ${sidebarBg}; ...">
            <!-- Sidebar content -->
        </aside>
        <main style="flex: 1; padding: 56px 40px; background-color: ${mainBg};">
            <!--                                   ^^^^^^^^^^^^^^^^^^^^^^^^ GOOD! -->
            <!-- Main content -->
        </main>
    </div>
`;
```

### Key Points
1. **Container must be transparent**: Remove `background-color` from the flex container div
2. **Main gets the background**: Add `background-color: ${mainBg}` to the `<main>` element
3. **Sidebar already has background**: The `<aside>` element has its own `background-color`
4. **Fixed bg shows through**: Without container background, the fixed sidebar bg is visible on all pages

### Why Working Templates Don't Have This Issue

| Template | Container bg | Main bg | Result |
|----------|-------------|---------|--------|
| sidebar-narrow-yellow | ❌ None | ✅ White | Works |
| sidebar-dark-navy | ❌ None | ✅ White | Works |
| sidebar-monogram | ✅ White | ❌ None | Works* |
| header-dark (before fix) | ✅ White | ❌ None | Broken |
| header-dark (after fix) | ❌ None | ✅ White | Works |

*sidebar-monogram uses `display: table` where table-cell backgrounds don't overflow like flexbox

### Templates Fixed
- `header-dark.ts` - Moved `background-color: ${mainBg}` from container to `<main>`

### Checklist for Flex Layout Templates
- [ ] Container div has NO `background-color`
- [ ] `<main>` element has `background-color: ${mainBg}`
- [ ] `<aside>` element has `background-color: ${sidebarBg}`
- [ ] `sidebar-bg-fixed` class is used for the fixed background
- [ ] Test with multi-page content to verify page 2+ sidebar fills completely

---

## Summary: Issues Fixed

| Issue | Type | Solution |
|-------|------|----------|
| Sidebar bg not filling page 2+ | PDF | Fixed background div + table layout |
| Accent stripe 70% on page 2 | PDF | Fixed-position div at sidebar edge |
| Text in gap between pages | PDF | `data-paginate="item"` + `page-break-inside: avoid` |
| Entries split across pages | Both | Add `data-paginate="item"` to each entry |
| Contact icons only (no text) | Both | Show icon + text, not title tooltip |
| Colors not matching preview | Both | Use exact hex codes from frontend |
| Skill bars at 0% | Both | Use `(level \|\| 3) * 20` formula |
| Table layout not matching frontend | PDF | Use `display: flex` layout to match frontend React component |
| Progress bars invisible on dark sidebar | Frontend | Use light/semi-transparent trackColor |
| Section headers orphaned at page bottom | Frontend | Add `data-paginate` to header helper components |
| Section in wrong location in PDF vs preview | Both | Mirror section changes in both frontend + backend files |
| Container bg covers fixed sidebar on page 2+ | PDF | Move `background-color` from container to `<main>` element |

---

## File Locations

```
backend/src/templates/pdf/
├── TEMPLATE_FIXES.md          # This documentation
├── shared/
│   ├── helpers.ts             # Utility functions (escapeHtml, formatDescription, etc.)
│   └── htmlWrapper.ts         # CSS classes including sidebar-bg-fixed
├── sidebar-monogram.ts        # Sidebar template (fixed)
├── sidebar-dark-navy.ts       # Sidebar template (fixed)
├── sidebar-narrow-yellow.ts   # Sidebar template (fixed)
├── header-dark.ts             # Header template with sidebar (fixed)
└── ...

frontend/components/templates/layouts/
├── sidebar/
│   ├── SidebarMonogram.tsx
│   ├── SidebarDarkNavy.tsx
│   ├── SidebarNarrowYellow.tsx
│   └── ...
├── header/
│   ├── HeaderDark.tsx
│   └── ...
└── shared/
    ├── ProgressBar.tsx        # Reusable progress bar component
    └── styleHelpers.ts        # Font and style utilities
```

---

*Last Updated: January 2026*
