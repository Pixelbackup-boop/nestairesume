# Template Development Guidelines

This document defines the rules and patterns for creating resume templates in this project.

---

## 1. Full-Page Background Colors (CRITICAL)

### Rule: Sidebar and Main Column Colors Must Fill Each Page

When a template has a left sidebar with a background color and a right main section with a different background color:

- **Both colored areas MUST fill the full page height** (top to bottom)
- **If content spans multiple pages, EACH page must have the same full-height colored backgrounds**
- The colors should NOT stop where the content ends

### Implementation Pattern

```tsx
// WRONG - Colors stop where content ends
<div style={{ display: 'flex' }}>
    <aside style={{ width: '35%', backgroundColor: '#f5f5f5' }}>
        {/* Content */}
    </aside>
    <main style={{ flex: 1, backgroundColor: '#ffffff' }}>
        {/* Content */}
    </main>
</div>

// CORRECT - Use PagedPreview's backdrop system for persistent backgrounds
// The template renders content, and PagedPreview handles page backgrounds
```

### How PagedPreview Handles This

For sidebar layouts, `PagedPreview.tsx` renders:
1. **Backdrop pages** - Full A4-sized white rectangles for each page
2. **Sidebar backdrop** - A persistent colored strip on the left for ALL pages
3. **Content layer** - The actual template content with transparent backgrounds

```tsx
// In PagedPreview.tsx - sidebar backdrop for each page
{isSidebarLayout && backgroundPages.map((pageIndex) => (
    <div
        key={`sidebar-bg-${pageIndex}`}
        style={{
            position: 'absolute',
            top: pageIndex * (A4_HEIGHT_PX + PAGE_GAP_PX),
            left: 0,
            width: SIDEBAR_WIDTH_PX,
            height: A4_HEIGHT_PX,
            backgroundColor: sidebarColor,
        }}
    />
))}
```

### Template Responsibility

Templates should:
1. Set `background: transparent` on the root container (PagedPreview does this automatically)
2. Use semantic structure (`<aside>` for sidebar, `<main>` for content)
3. NOT rely on content-based background fills for column colors

---

## 2. Template Structure Requirements

### Required Props Interface

Every template MUST implement `TemplateProps`:

```tsx
interface TemplateProps {
    data: ResumeData;      // All resume content
    theme: ThemeColor;     // Color scheme from Design Tab
    scale?: number;        // For thumbnail previews (default: 1)
}
```

### Required Metadata Export

Every template MUST export metadata:

```tsx
export const templateNameMeta: TemplateMeta = {
    id: 'template-id',           // Unique, kebab-case
    name: 'Display Name',        // User-facing name
    category: 'header',          // Category for filtering
    thumbnail: '/templates/template-id.png',
    description: 'Brief description',
};
```

---

## 3. Pagination Support (CRITICAL)

### Data Attributes for Page Breaks

Add `data-paginate` to elements that should NOT be split across pages:

```tsx
// Section containers
<section className="mb-5 resume-section" data-paginate>

// Individual entries (jobs, education items)
<div className="resume-entry" data-paginate>
```

### Classes for Pagination

| Class | Purpose |
|-------|---------|
| `resume-section` | Major sections (Experience, Education, etc.) |
| `resume-entry` | Individual items within sections |
| `data-paginate` | Attribute that tells PagedPreview to avoid splitting |

### How Pagination Works

1. PagedPreview measures each `[data-paginate]` element's position
2. If an element would be cut by a page boundary, it adds `margin-top` to push it to the next page
3. The element gets class `pushed-section` for visual styling

---

## 4. Scale-Aware Sizing

Templates render at full A4 size but are often displayed as thumbnails. Use scale-aware sizing:

```tsx
// Font sizes
fontSize: scale < 1 ? '8px' : '12px'

// Padding
padding: scale < 1 ? '12px' : '24px'

// Image sizes
width: scale < 1 ? '50px' : '100px'
```

### Scale Values

| Context | Scale Value |
|---------|-------------|
| Full preview in builder | `1` |
| Template card thumbnail | `~0.32` |
| Mini preview | `<0.5` |

---

## 5. Color Usage

### Theme Colors

Use theme colors from props, not hardcoded values:

```tsx
// CORRECT
style={{ color: theme.text }}
style={{ backgroundColor: theme.primary }}
style={{ borderColor: theme.accent }}

// WRONG - hardcoded colors
style={{ color: '#333333' }}
```

### Theme Properties

| Property | Use For |
|----------|---------|
| `theme.primary` | Primary accent color (headers, buttons, links) |
| `theme.secondary` | Secondary text, subtitles |
| `theme.accent` | Accent elements, borders |
| `theme.text` | Body text |
| `theme.heading` | Heading text |
| `theme.background` | Background areas |

### Header/Section Background Colors

For templates with colored headers or sidebars:
- Header background: Can use `theme.primary` or a template-specific dark color
- Sidebar background: Use a light gray like `#f5f5f5` or theme-derived color

---

## 6. Two-Column Layout Pattern

### Standard Two-Column Structure

```tsx
<div className="w-full h-full">
    {/* Header */}
    <header style={{ /* header styles */ }}>
        {/* Photo, Name, Title */}
    </header>

    {/* Two-Column Body */}
    <div style={{ display: 'flex', minHeight: 0 }}>
        {/* Left Column - Sidebar */}
        <aside style={{ width: '35%', backgroundColor: leftColumnBg }}>
            {/* Contact, Education, Skills, Languages */}
        </aside>

        {/* Right Column - Main Content */}
        <main style={{ flex: 1, backgroundColor: rightColumnBg }}>
            {/* Summary, Experience, References */}
        </main>
    </div>
</div>
```

### Column Width Guidelines

| Layout Type | Left Column | Right Column |
|-------------|-------------|--------------|
| Sidebar | 30-35% | 65-70% |
| Header with 2-col body | 35% | 65% |
| Classic labels-left | 25% | 75% |

---

## 7. File Organization

### Directory Structure

```
frontend/components/templates/
├── layouts/
│   ├── header/
│   │   ├── HeaderBold.tsx
│   │   ├── HeaderDark.tsx
│   │   └── ...
│   ├── sidebar/
│   │   ├── SidebarModern.tsx
│   │   └── ...
│   ├── classic/
│   │   └── ...
│   ├── minimal/
│   │   └── ...
│   └── index.ts          # Registry exports
├── shared/
│   ├── types.ts          # TemplateProps, TemplateMeta
│   ├── styleHelpers.ts   # Common style functions
│   ├── SectionHeader.tsx # Reusable section header
│   └── ResumeEntry.tsx   # Reusable entry component
└── UnifiedTemplate.tsx   # Router component
```

### Naming Conventions

| Item | Convention | Example |
|------|------------|---------|
| Component file | PascalCase | `HeaderDark.tsx` |
| Template ID | kebab-case | `header-dark` |
| Metadata export | camelCase + Meta | `headerDarkMeta` |
| Builder template | camelCase + Template | `headerDarkTemplate` |

---

## 8. Registration Checklist

When adding a new template:

1. **Create component** in `layouts/[category]/TemplateName.tsx`
2. **Export metadata** from the component file
3. **Add to registry** in `layouts/index.ts`:
   ```tsx
   import TemplateName, { templateNameMeta } from './category/TemplateName';
   // Add to templateRegistry array
   { ...templateNameMeta, component: TemplateName },
   ```
4. **Add builder template** in `lib/templates/builder/templates/[category]/`:
   ```tsx
   export const templateNameTemplate: BuilderTemplate = {
       id: 'template-name',
       name: 'Template Name',
       style: 'Professional',
       layout: 'header',
       layoutPresetId: 'header-normal-normal',
       category: 'professional',
       accentColor: '#334155',
       gradientColors: 'from-slate-600 to-slate-800',
       templateId: 'template-name', // Links to unique React component
   };
   ```
5. **Test** in templates page and builder

---

## 9. PDF Generation Sync

Every frontend template needs a matching backend PDF template:

| Frontend | Backend |
|----------|---------|
| `layouts/header/HeaderDark.tsx` | `backend/src/templates/pdf/header-dark.ts` |

### PDF Template Requirements

- Mirror the exact same layout structure
- Use CSS table layout for better page-break support (flexbox has issues)
- Match colors, fonts, and spacing exactly

---

## 10. Common Issues & Solutions

### Issue: Sidebar color doesn't fill full page height

**Solution**: Don't rely on CSS for this. PagedPreview renders backdrop colors separately from content.

### Issue: Content gets cut off at page break

**Solution**: Add `data-paginate` attribute to the container element.

### Issue: Template looks different in PDF vs preview

**Solution**: Ensure backend PDF template exactly matches frontend structure. Avoid flexbox for main layout in PDF templates.

### Issue: Fonts render differently

**Solution**: Use `getFontFamily()` helper which returns web-safe font stacks.

---

## 11. Quick Reference

### Essential Imports

```tsx
import { TemplateProps, TemplateMeta } from '../../shared/types';
import {
    getBackgroundStyle,
    getFontFamily,
    fontSizes,
    getImageBorderRadius
} from '../../shared/styleHelpers';
```

### Template Skeleton

```tsx
'use client';

import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes } from '../../shared/styleHelpers';

export default function TemplateName({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills } = data;
    const headingFont = getFontFamily(data.fonts?.heading || 'Inter');
    const bodyFont = getFontFamily(data.fonts?.body || 'Inter');

    return (
        <div className="w-full h-full" style={{ fontFamily: bodyFont }}>
            {/* Template content */}
        </div>
    );
}

export const templateNameMeta: TemplateMeta = {
    id: 'template-name',
    name: 'Template Name',
    category: 'header',
    thumbnail: '/templates/template-name.png',
    description: 'Description here',
};
```

---

## Version History

| Date | Change |
|------|--------|
| 2026-01-09 | Initial guidelines created |
