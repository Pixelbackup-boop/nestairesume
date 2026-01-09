# Resume Templates Development Guide

## Overview

This folder contains resume templates that power the builder's preview and PDF export. All templates share a common architecture to ensure consistent page break behavior and print output.

## Template Architecture

```
templates/
├── layouts/
│   ├── classic/
│   │   ├── ClassicProfessional.tsx
│   │   └── EuropassClassic.tsx
│   ├── header/
│   │   └── HeaderBold.tsx
│   ├── minimal/
│   │   └── MinimalClean.tsx
│   └── sidebar/
│       └── SidebarModern.tsx      ← Reference implementation
├── shared/
│   ├── index.ts                    ← Exports all shared components
│   ├── SectionHeader.tsx           ← REQUIRED for section headings
│   ├── ResumeEntry.tsx             ← REQUIRED for individual entries
│   ├── styleHelpers.ts             ← Font, background utilities
│   └── types.ts                    ← TypeScript interfaces
└── UnifiedTemplate.tsx             ← Template router
```

## Creating a New Template

### Step 1: Use Required Shared Components

Every template MUST use these components to ensure proper page breaks:

```tsx
import { SectionHeader, ResumeEntry } from '../shared';
import { TemplateProps, TemplateMeta } from '../shared/types';
import { getBackgroundStyle, getFontFamily, fontSizes } from '../shared/styleHelpers';
```

### Step 2: Implement TemplateProps Interface

```tsx
export default function MyNewTemplate({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills, ... } = data;
    // ...
}
```

### Step 3: Use SectionHeader for ALL Section Headings

**REQUIRED** - This enables smart page break detection.

```tsx
// ❌ WRONG - Don't use plain h2
<h2 className="section-header">Experience</h2>

// ✅ CORRECT - Use SectionHeader component
<SectionHeader
    theme={theme}
    headingFont={headingFont}
    scale={scale}
    variant="uppercase"  // or "default", "underline", "minimal"
>
    Experience
</SectionHeader>
```

### Step 4: Use ResumeEntry for Individual Entries

**REQUIRED** - This keeps entries together and prevents splitting across pages.

```tsx
// ❌ WRONG - Don't use plain div
<div className="resume-entry">
    <h3>{exp.title}</h3>
    <p>{exp.company}</p>
</div>

// ✅ CORRECT - Use ResumeEntry component
<ResumeEntry key={exp.id}>
    <h3>{exp.title}</h3>
    <p>{exp.company}</p>
</ResumeEntry>
```

### Step 5: Complete Example

```tsx
'use client';

import { TemplateProps, TemplateMeta } from '../../shared/types';
import { getFontFamily, fontSizes } from '../../shared/styleHelpers';
import SectionHeader from '../../shared/SectionHeader';
import ResumeEntry from '../../shared/ResumeEntry';

export default function MyNewTemplate({ data, theme, scale = 1 }: TemplateProps) {
    const { personalInfo, experience, education, skills } = data;
    const headingFont = getFontFamily(data.fonts?.heading || 'Inter');
    const bodyFont = getFontFamily(data.fonts?.body || 'Inter');

    return (
        <div style={{ fontFamily: bodyFont }}>
            {/* Header Section */}
            <header>
                <h1>{personalInfo.fullName}</h1>
                <p>{personalInfo.jobTitle}</p>
            </header>

            {/* Experience Section */}
            {experience.length > 0 && (
                <section className="resume-section">
                    <SectionHeader
                        theme={theme}
                        headingFont={headingFont}
                        scale={scale}
                        variant="uppercase"
                    >
                        Experience
                    </SectionHeader>
                    <div className="space-y-3">
                        {experience.map((exp) => (
                            <ResumeEntry key={exp.id}>
                                <h3>{exp.title}</h3>
                                <p>{exp.company}</p>
                                <p>{exp.description}</p>
                            </ResumeEntry>
                        ))}
                    </div>
                </section>
            )}

            {/* Education Section */}
            {education.length > 0 && (
                <section className="resume-section">
                    <SectionHeader
                        theme={theme}
                        headingFont={headingFont}
                        scale={scale}
                        variant="uppercase"
                    >
                        Education
                    </SectionHeader>
                    <div className="space-y-2">
                        {education.map((edu) => (
                            <ResumeEntry key={edu.id}>
                                <h3>{edu.school}</h3>
                                <p>{edu.degree}</p>
                            </ResumeEntry>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}

// Export metadata for template registry
export const myNewTemplateMeta: TemplateMeta = {
    id: 'my-new-template',
    name: 'My New Template',
    category: 'classic',  // or 'sidebar', 'header', 'minimal', 'creative'
    thumbnail: '/templates/my-new-template.png',
    description: 'Description of your template',
};
```

### Step 6: Register the Template

Add your template to `layouts/index.ts`:

```tsx
import MyNewTemplate, { myNewTemplateMeta } from './category/MyNewTemplate';

export const templateRegistry: TemplateRegistryEntry[] = [
    // ... existing templates
    { ...myNewTemplateMeta, component: MyNewTemplate },
];
```

## SectionHeader Variants

| Variant | Description |
|---------|-------------|
| `default` | Standard heading with theme colors |
| `uppercase` | Uppercase with letter spacing |
| `underline` | Underlined with theme color border |
| `minimal` | Simple, smaller text |

## Why Shared Components Matter

The `PagedPreview.tsx` component uses CSS class selectors to detect content boundaries:

```javascript
const elements = container.querySelectorAll('.section-header, .resume-entry');
```

When content crosses an A4 page boundary, it injects margins to push content to the next page, preventing:
- Section headers orphaned at page bottom
- Entries split across two pages
- Misaligned web preview vs print output

## Testing Your Template

1. Add lots of content to trigger multi-page layout
2. Verify "Page Break" indicators appear between pages
3. Click "Download PDF" and verify print matches preview
4. Test at different zoom levels (50%, 75%, 100%)

## Reference Implementation

See `layouts/sidebar/SidebarModern.tsx` for a complete example using all shared components.
