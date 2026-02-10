# Implementation Plan - Fix Header Dark Banner Pagination

The goal is to fix the layout breakage in the "Header Dark Banner" template when using "Large" text size. The issue manifests as content ("Credentials" section in the right column) being "cut up" and not breaking cleanly to the next page.
This is caused by the `PagedPreview` pagination logic sharing a single `cumulativeOffset` across parallel columns (Flexbox rows). Pushes in the Left Column incorrectly affect the calculated position of items in the Right Column, causing the script to believe Right Column items are already on the next page (and thus skipping the necessary push), when they are actually straddling the page break.

## User Review Required
> [!IMPORTANT]
> This change modifies the core `PagedPreview` component used by ALL templates. While designed to be safe (only triggering on backward layout jumps), it technically affects global pagination logic.

## Proposed Changes

### Frontend Component Logic

#### [MODIFY] [PagedPreview.tsx](file:///Users/elw/Documents/Test/AI/AI-Resume-Builder/frontend/components/preview/PagedPreview.tsx)

- Update the `runPagination` function to track `offsetHistory` (mapping Y-positions to cumulative offsets).
- Implement "Jump Detection":
    - When iterating elements, check if `rawRelativeTop` significantly decreases compared to the previous element (indicating a jump to a new column).
    - If a jump is detected, look up the `cumulativeOffset` recorded for that Y-position in `offsetHistory`.
    - Reset `cumulativeOffset` to the historical value (minimum seen offset at that level), effectively isolating the columns.
- Ensure `offsetHistory` records the *minimum* offset seen at each Y-level to correctly capture shared ancestor pushes (like Header) while ignoring sibling pushes.

## Verification Plan

### Automated Tests
- None available for visual pagination logic.

### Manual Verification
- **User Action**: Open "Header Dark Banner" template in Builder.
- **User Action**: Set Text Size to "Large".
- **User Action**: Populate "Credentials" or other Right Column sections until they reach the bottom of Page 1.
- **Verify**: The content should explicitly break to Page 2 (with a gap), rather than being visually sliced or rendering over the gap.
- **Verify**: Previous templates (One column) still paginate correctly (regression check).

### Layout Refinement (User Feedback)
- **User Action**: Check PDF output for "Header Dark Banner".
- **Verify**: The gap between columns should be smaller (approx 12px instead of 24px).
- **Verify**: The content columns should be wider (approx 58% / 40% instead of 55% / 45% with large padding).
