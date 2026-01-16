# Resume Template Fixes Reference Guide

This document outlines common issues encountered in both **PDF templates** (backend) and **Web Preview templates** (frontend), along with their solutions. Use this as a reference when creating or fixing templates.

---

## Table of Contents

### PDF Template Issues (Backend)
1. [Multi-Page Sidebar Background Issue](#1-multi-page-sidebar-background-issue)
2. [Accent Stripe Not Extending Full Height](#2-accent-stripe-not-extending-full-height)
3. [Contact Info Display (Icons Only vs Icons + Text)](#3-contact-info-display)
4. [Color Consistency Between Preview and PDF](#4-color-consistency-between-preview-and-pdf)
5. [Quick Reference: Template Structure](#5-quick-reference-template-structure)

### Web Preview Issues (Frontend)
6. [Frontend Contact Info Not Visible](#6-frontend-contact-info-not-visible)
7. [Skill/Language Level Bars Not Showing Correct Values](#7-skill-language-level-bars-not-showing-correct-values)
8. [Sidebar Width Too Narrow](#8-sidebar-width-too-narrow)
9. [Frontend-Backend Template Parity](#9-frontend-backend-template-parity)

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

## 3. Contact Info Display

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

## 4. Color Consistency Between Preview and PDF

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

## 5. Quick Reference: Template Structure

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

## 6. Frontend Contact Info Not Visible

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

## 7. Skill/Language Level Bars Not Showing Correct Values

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

## 8. Sidebar Width Too Narrow

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

## 9. Frontend-Backend Template Parity

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

## Summary: Issues Fixed

| Issue | Type | Solution |
|-------|------|----------|
| Sidebar bg not filling page 2+ | PDF | Fixed background div + table layout |
| Accent stripe 70% on page 2 | PDF | Fixed-position div at sidebar edge |
| Contact icons only (no text) | Both | Show icon + text, not title tooltip |
| Colors not matching preview | Both | Use exact hex codes from frontend |
| Skill bars at 0% | Both | Use `(level \|\| 3) * 20` formula |
| Table layout breaking | PDF | `display: table` + `table-cell` |

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
