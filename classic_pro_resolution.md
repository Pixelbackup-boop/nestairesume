# Classic Professional Template Fix Resolution

## Problem Description
The "Classic Professional" template showed discrepancies between the Web Preview and the generated PDF:
1.  **Layout Shift:** Content stuck to Page 1 in the Preview was pushed to Page 2 in the PDF (e.g., the "Education" section).
2.  **Pagination Behavior:** The PDF allowed sections to split (e.g., half a list on Page 1, half on Page 2), while the Web Preview forced the entire section to jump to the next page if it didn't fit perfectly.

## Root Cause Analysis

### 1. Width Mismatch (The "0.3px" Bug)
- **Frontend Canvas:** Uses standard A4 pixel dimensions at 96 DPI: **794px**.
- **Backend PDF:** Uses Puppeteer with `format: 'A4'`, which internally converts 210mm to approximately **793.7px**.
- **Impact:** This tiny 0.3px difference meant that text lines which *perfectly* filled the width in the Frontend (794px) would wrap to a new line in the PDF (793.7px). These extra wrapped lines accumulated, increasing the total height of the content in the PDF and pushing sections onto the next page.

### 2. Aggressive Pagination Logic
- **Component:** `PagedPreview.tsx`
- **Issue:** The pagination algorithm was configured to treat `<section>` elements and elements with class `.resume-section` as atomic, unbreakable blocks.
- **Impact:** If a section (like "Experience") was slightly too long for the page, the Preview forced the *entire* section to Page 2. The PDF engine, however, naturally splits block containers, allowing the content to flow properly.

## Applied Solutions

### Fix 1: Constrain Frontend Width
We modified the **Frontend Template** to be strictly narrower than the PDF, forcing it to wrap text *at least* as aggressively as the PDF engine.

- **File:** `frontend/components/templates/layouts/classic/ClassicProfessional.tsx`
- **Change:** Increased horizontal padding from `40px` to **44px**.
  ```typescript
  // Before
  padding: scale < 1 ? '16px' : '40px',
  
  // After
  padding: scale < 1 ? '16px' : '40px 44px', // 40px Vertical, 44px Horizontal
  ```
- **Result:** The content width is reduced by 8px, overpowering the 0.3px discrepancy. Any text that fits in this narrower Preview is guaranteed to fit in the wider PDF.

### Fix 2: Relax Pagination Logic
We updated the **Pagination Engine** to allow sections to split, matching the native PDF behavior.

- **File:** `frontend/components/preview/PagedPreview.tsx`
- **Change:** Removed broad section selectors (`.resume-section`, `section`, `[class*="section"]`) from the "do not break" list.
  ```typescript
  // Before
  const elements = Array.from(container.querySelectorAll(
      '[data-paginate], .section-header, .resume-entry, .resume-section, section, ...'
  ));

  // After
  const elements = Array.from(container.querySelectorAll(
      '[data-paginate], .section-header, .resume-entry, ...' // Sections removed
  ));
  ```
- **Result:** The Preview now only keeps *logical units* together (like a specific Job Entry or a Header), but allows the parent Section to span across pages.

## Verification
- **Visual Check:** The Web Preview now correctly moves content to Page 2 exactly where the PDF does.
- **Flow:** Long sections now split naturally across pages in the Preview, matching the PDF output.
