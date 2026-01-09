# Robust WYSIWYG Pagination Architecture

## Overview

This document describes the pagination system used in the resume preview that ensures:
1. **Page gaps NEVER disappear** - regardless of content or template
2. **Auto-pagination** - when page 1 is full, content flows to page 2 with visible gap
3. **No content cutoff** - elements are pushed to next page if they would be split
4. **PDF matches preview** - what you see is what you get

## How It Works

### Page Detection
The system continuously monitors content height and calculates which elements cross page boundaries.

```
A4 Page Height: 1123px
Gap Between Pages: 40px
Full Page + Gap: 1163px
```

### Element Selection (Universal)
The system finds ALL elements that shouldn't be split across pages:
```typescript
container.querySelectorAll(
  '[data-paginate], .section-header, .resume-entry, h2, h3'
)
```

Any new template component can be included by:
1. Using `SectionHeader` or `ResumeEntry` shared components
2. Adding `data-paginate` attribute to custom elements

### Pagination Logic

```
For each element:
  1. Measure position relative to container
  2. Calculate which page it's on
  3. If element crosses page boundary → push to next page
  4. If section header is < 60px from bottom → push (orphan protection)
  5. If element > 90% of page height → let it span naturally
```

## Key Features

### 1. Font Loading Wait
```typescript
await document.fonts.ready; // Wait before measuring
```
Ensures accurate measurements after fonts load.

### 2. ResizeObserver
```typescript
const resizeObserver = new ResizeObserver(() => {
  requestAnimationFrame(() => runPagination());
});
```
Automatically recalculates when content changes dynamically.

### 3. Persistent Sidebar Background
For sidebar templates, the sidebar background color appears on ALL pages:
```typescript
{isSidebarLayout && (
  <div style={{ width: '238px', backgroundColor: theme.primary }} />
)}
```

### 4. Maximum Z-Index Gap Overlay
```typescript
style={{
  zIndex: 2147483647, // Maximum z-index
  isolation: 'isolate' // New stacking context
}}
```
Gap will NEVER be hidden by content.

## Files Involved

| File | Purpose |
|------|---------|
| `components/preview/PagedPreview.tsx` | Main pagination engine |
| `components/templates/shared/SectionHeader.tsx` | Section headers (has `data-paginate`) |
| `components/templates/shared/ResumeEntry.tsx` | Entry items (has `data-paginate`) |

## Template Compatibility

### ✅ Works Perfectly (26 templates)
- Classic, Sidebar, Header, Minimal, Europass
- Any template using `SectionHeader` and `ResumeEntry`
- Any template with `data-paginate` attributes

### ⚠️ Sidebar-Only-Page-1 (4 templates)
- Full-height sidebar templates show sidebar on page 1
- Page 2+ has sidebar background color but no sidebar content
- This is professional standard behavior

### 🔴 Incompatible (2 templates)
Three-column layouts cannot coordinate pagination:
- `20-three-column-DO-NOT-USE-3COL.webp`
- `28-olive-header-3col-DO-NOT-USE-3COL.webp`

**Solution:** Convert to two-column with sections stacked.

## Adding New Templates

To ensure pagination works with new templates:

1. **Use Shared Components:**
```tsx
import SectionHeader from '../shared/SectionHeader';
import ResumeEntry from '../shared/ResumeEntry';

<SectionHeader theme={theme}>Experience</SectionHeader>
<ResumeEntry>
  <h3>Job Title</h3>
  <p>Description...</p>
</ResumeEntry>
```

2. **Or Add data-paginate:**
```tsx
<div data-paginate="custom-section">
  Content that shouldn't be split...
</div>
```

## Visual Representation

```
┌─────────────────┐
│    PAGE 1       │
│  Experience     │
│  • Job 1        │
│  • Job 2        │
│  Education      │
└─────────────────┘
     ████████        ← 40px DARK GAP (always visible)
┌─────────────────┐
│    PAGE 2       │
│  • More content │
│  Skills         │
│  Languages      │
└─────────────────┘
     ████████        ← Another GAP
┌─────────────────┐
│    PAGE 3       │
│  References     │
└─────────────────┘
```

## Troubleshooting

### Gap not visible?
- Check browser dev tools for z-index conflicts
- Gap overlay uses `z-index: 2147483647` (maximum)

### Content getting cut off?
- Ensure element has `data-paginate` attribute
- Or wrap in `ResumeEntry` component

### Measurements incorrect?
- Fonts may not have loaded - system waits for `document.fonts.ready`
- Check if ResizeObserver is triggering

---

*Last updated: January 2026*
