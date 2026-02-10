# Master Guide: Page Breaking & Page Margins

This guide details how to configure **Page Breaking** (pagination) and **Page Margins** for all sections of a resume template. It follows the "Standard" strategy used in the `header-dark-box` template.

---

## Part 1: Page Breaking (Pagination)

The goal is to allow content to "flow" naturally from one page to the next, filling available space, rather than forcing entire sections to jump to the next page effectively leaving large empty gaps.

### The Golden Rule
*   **Container (`<section>`):** **REMOVE** `data-paginate`.
    *   *Why?* If the container has `data-paginate`, the system treats the *entire section* (Header + All Items) as one solid block. If it doesn't fit typically in the remaining space, it moves the *whole block* to the next page.
*   **Items (Children):** **ADD** `data-paginate="item"`.
    *   *Why?* This tells the system: "Keep this specific job/school/skill entry together, but you can separate it from its neighbors."

### Section-by-Section Implementation

#### 1. Experience & Education (Vertical Lists)
**Behavior:** The section header stays on Page 1 (if there's room), and job entries fill the rest of Page 1. Remaining entries flow to Page 2.

**Frontend (`.tsx`):**
```tsx
{/* Container: NO data-paginate */}
<section className="resume-section" style={{ marginBottom: sp(16) }}>
    <SectionHeader>Experience</SectionHeader>
    <div className="flex-col gap-4">
        {experience.map(exp => (
            /* Items: ADD data-paginate="item" */
            <div key={exp.id} className="resume-entry" data-paginate="item">
                <h4>{exp.title}</h4>
                <p>{exp.company}</p>
            </div>
        ))}
    </div>
</section>
```

**Backend (`.ts`):**
```typescript
{/* Container: NO data-paginate */}
<section style="margin-bottom: 24px;">
    ${SectionHeader('Experience')}
    <div style="display: flex; flex-direction: column; gap: 20px;">
        ${experience.map(exp => `
            /* Items: ADD data-paginate="item" */
            <div data-paginate="item">
                <h4>${escapeHtml(exp.title)}</h4>
                <p>${escapeHtml(exp.company)}</p>
            </div>
        `).join('')}
    </div>
</section>
```

#### 2. Skills, Languages, References (Grids or Flex Lists)
**Behavior:** Rows of skills/icons will fill the bottom of Page 1. If a row doesn't fit, that specific row moves to Page 2.

**Frontend (`.tsx`):**
```tsx
{/* Container: NO data-paginate */}
<section className="resume-section" style={{ marginBottom: sp(16) }}>
    <SectionHeader>Skills</SectionHeader>
    <div className="grid grid-cols-3 gap-4">
        {skills.map(skill => (
            /* Items: ADD data-paginate="item" */
            <div key={skill.id} data-paginate="item">
                <ProgressBar value={skill.level} />
            </div>
        ))}
    </div>
</section>
```

**Backend (`.ts`):**
```typescript
{/* Container: NO data-paginate */}
<section style="margin-bottom: 24px;">
    ${SectionHeader('Skills')}
    <div style="display: grid; grid-template-columns: repeat(3, 1fr);">
        ${skills.map(skill => `
            /* Items: ADD data-paginate="item" */
            /* Wrap content in a div with the attribute if needed */
            <div data-paginate="item">
                ${CircularProgress(skill.level)}
            </div>
        `).join('')}
    </div>
</section>
```

#### 3. Social Links (Horizontal/Vertical Groups)
**Behavior:** Individual links will fill the available space.

**Frontend (`.tsx`):**
```tsx
{/* Container: NO data-paginate */}
<section className="resume-section" style={{ marginBottom: sp(16) }}>
    <SectionHeader>Social</SectionHeader>
    <div className="flex-col gap-2">
        {personalInfo.github && (
            /* Items: ADD data-paginate="item" */
            <div data-paginate="item">Github...</div>
        )}
        {personalInfo.linkedin && (
            <div data-paginate="item">LinkedIn...</div>
        )}
    </div>
</section>
```

#### 4. Summary / Custom Text (Text Blocks)
**Behavior:** Usually, you *do* want a text block to stay together. However, if it's very long and you want to allow it to split:

*   **Keep Together (Default):** Add `data-paginate` to the container or the paragraph.
*   **Allow Split:** Remove `data-paginate` from everything. The text will cut wherever the page ends (this can sometimes split lines awkwardly, so use with caution).

---

## Part 2: Page Margins

The goal is to have consistent whitespace at the top and bottom of every page in the generated PDF.

### Strategy: "Standard" Margins
This strategy gives you **0px margin on Page 1** (allowing full headers) and **40px margin on Page 2+** (preventing cutoff).

### 1. Configure the Service
In `backend/src/services/pdfGeneratorService.ts`:

1.  Find the `headerTemplates` array (which forces 'full-bleed' / 0 margins).
2.  **REMOVE** your template ID from this list.
3.  By default, it will fall back to `marginStrategy = 'standard'`, which applies:
    *   `@page { margin: 40px 0 40px 0; }` (Top/Bottom margins)
    *   `@page :first { margin: 0; }` (No margin on first page)

```typescript
// backend/src/services/pdfGeneratorService.ts

const headerTemplates = [
    'header-dark-banner',
    // 'header-dark-box',  <-- REMOVED (Now uses Standard strategy)
];
```

### 2. Configure the Template (Padding)
Because Page 1 has `0` margin (to allow headers to touch the top if needed), you must add **internal padding** to your main container to create the whitespace on the first page.

**Backend Template (`.ts`):**
```typescript
export const renderTemplate = (...) => {
    return `
        <!-- Main Container -->
        <!-- Add padding here. This provides the "Margin" for Page 1. -->
        <!-- On Page 2, the @page margin takes over for top/bottom. -->
        <div style="width: 100%; box-sizing: border-box; padding: 40px;">
            <header>...</header>
            <main>...</main>
        </div>
    `;
};
```

### Summary of Margins Logic
*   **Page 1 Top:** Controls by `div style="padding-top: 40px"` inside your template.
*   **Page 2+ Top:** Controls by `@page { margin-top: 40px }` (Automatic via 'standard' strategy).
*   **Page 1 Bottom:** Controls by `div style="padding-bottom: 40px"` + overflow calculation.
*   **Page 2+ Bottom:** Controls by `@page { margin-bottom: 40px }` (Automatic via 'standard' strategy).
*   **Left/Right:** Controls by `div style="padding-left/right: 40px"`. (`@page` LR is usually 0).

---

## Troubleshooting

**Q: My section header is "orphaned" at the bottom of the page (header shows, but content starts on next page).**
**A:** Ensure your Section Header has `data-paginate` (or is an `h3` tag which has it by default). The system automatically pushes headers to the next page if they are too close to the bottom.

**Q: There is still a big gap at the bottom of Page 1.**
**A:** Check if a larger section *still* has `data-paginate` on the `<section>` tag. Also, check if you have a very large single item (like a massive job description) that has `data-paginate="item"`. Large items will move entirely if they don't fit.

**Q: Page 2 content is touching the very top edge.**
**A:** Your template is likely still in the `headerTemplates` list in `pdfGeneratorService.ts`. Remove it to enable the 40px top margin for continuation pages.
