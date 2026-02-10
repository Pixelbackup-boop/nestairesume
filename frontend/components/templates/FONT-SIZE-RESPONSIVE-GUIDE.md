# Font-Size-Responsive Templates Guide

How to make any template adapt spacing, icons, and component dimensions when the user switches between Small, Medium, and Large text sizes.

---

## The Problem

Templates use `getScaledFontSizes()` for text, but all other dimensions (padding, gaps, margins, icon sizes, progress bar heights, circular indicator sizes) are hardcoded. When a user selects "Large" text, the text grows but spacing stays the same — creating visual imbalance.

## The Solution: `sp()` Helper

Add two lines after `getScaledFontSizes()`:

```typescript
const sizeConfig = fontSizes[fonts?.size || 'medium'];
const fs = getScaledFontSizes(sizeConfig, scale);

// Add these two lines:
const sizeMult = parseInt(sizeConfig.base) / 14;
const sp = (px: number) => Math.round(px * sizeMult);
```

### How it works

`sizeConfig.base` is `'12px'` (Small), `'14px'` (Medium), or `'16px'` (Large). Dividing by 14 gives:

| Size    | Base | sizeMult | Effect          |
|---------|------|----------|-----------------|
| Small   | 12px | 0.857    | ~14% smaller    |
| Medium  | 14px | 1.000    | No change       |
| Large   | 16px | 1.143    | ~14% larger     |

### Resulting pixel values

| `sp(value)` | Small | Medium | Large |
|-------------|-------|--------|-------|
| `sp(4)`     | 3px   | 4px    | 5px   |
| `sp(8)`     | 7px   | 8px    | 9px   |
| `sp(12)`    | 10px  | 12px   | 14px  |
| `sp(16)`    | 14px  | 16px   | 18px  |
| `sp(24)`    | 21px  | 24px   | 27px  |
| `sp(32)`    | 27px  | 32px   | 37px  |
| `sp(70)`    | 60px  | 70px   | 80px  |
| `sp(100)`   | 86px  | 100px  | 114px |
| `sp(160)`   | 137px | 160px  | 183px |

---

## What to Replace

### 1. Section Margins

Replace Tailwind spacing classes with inline styles:

```tsx
// BEFORE
<section className="mb-4 resume-section">

// AFTER
<section className="resume-section" style={{ marginBottom: sp(16) }}>
```

```tsx
// BEFORE
<section className="resume-section mt-4">

// AFTER
<section className="resume-section" style={{ marginTop: sp(16) }}>
```

### 2. List/Entry Spacing

Replace `space-y-*` classes with flex column + gap:

```tsx
// BEFORE
<div className="space-y-3">
  {items.map(...)}
</div>

// AFTER
<div style={{ display: 'flex', flexDirection: 'column', gap: `${sp(12)}px` }}>
  {items.map(...)}
</div>
```

Common mappings:
- `space-y-1` (4px) -> `gap: ${sp(4)}px`
- `space-y-2` (8px) -> `gap: ${sp(8)}px`
- `space-y-3` (12px) -> `gap: ${sp(12)}px`
- `space-y-4` (16px) -> `gap: ${sp(16)}px`

### 3. Container Padding & Gaps

```tsx
// BEFORE
padding: '24px',
gap: '24px',

// AFTER
padding: `${sp(24)}px`,
gap: `${sp(24)}px`,
```

For compound padding:
```tsx
// BEFORE
padding: '24px 32px',

// AFTER
padding: `${sp(24)}px ${sp(32)}px`,
```

### 4. Icon Sizes (Lucide)

```tsx
// BEFORE
<Phone size={12} />
<Calendar size={10} />

// AFTER
<Phone size={sp(12)} />
<Calendar size={sp(10)} />
```

Define icon size variables at the top of the component:
```tsx
const iconSm = scale < 1 ? 8 : sp(10);
const iconMd = scale < 1 ? 10 : sp(12);
```

### 5. FontAwesome Icon Sizes

FontAwesome uses `style={{ width, height }}`:
```tsx
// BEFORE
<FontAwesomeIcon icon={faFutbol} style={{ width: 20, height: 20 }} />

// AFTER
<FontAwesomeIcon icon={faFutbol} style={{ width: sp(20), height: sp(20) }} />
```

### 6. CircularProgress Component

```tsx
// BEFORE
<CircularProgress
    size={70}
    strokeWidth={3}
    fontSize={16}
    labelFontSize={10}
/>

// AFTER
<CircularProgress
    size={scale < 1 ? 40 : sp(70)}
    strokeWidth={scale < 1 ? 2 : sp(3)}
    fontSize={scale < 1 ? 10 : sp(16)}
    labelFontSize={scale < 1 ? 6 : sp(10)}
/>
```

### 7. ProgressBar Component

```tsx
// BEFORE
<ProgressBar height={6} />

// AFTER
<ProgressBar height={scale < 1 ? 4 : sp(6)} />
```

### 8. Pill Badges / Tags

```tsx
// BEFORE
padding: '4px 12px',
borderRadius: '4px',

// AFTER
padding: `${sp(4)}px ${sp(12)}px`,
borderRadius: `${sp(4)}px`,
```

### 9. Image/Photo Sizes

```tsx
// BEFORE
const photoSize = 100;

// AFTER
const photoSize = scale < 1 ? 50 : sp(100);
```

### 10. Interest/Hobby Icon Containers

```tsx
// BEFORE
width: 32, height: 32
getInterestIcon(name, 28)

// AFTER
width: scale < 1 ? 20 : sp(32),
height: scale < 1 ? 20 : sp(32),
getInterestIcon(name, scale < 1 ? 16 : sp(28))
```

### 11. Grid Gaps

```tsx
// BEFORE
gap: '12px',

// AFTER
gap: scale < 1 ? '6px' : `${sp(12)}px`,
```

### 12. Section Headers

Pass `sp` to the SectionHeader component:

```tsx
interface SectionHeaderProps {
    fs: ScaledFontSizes;
    headingFont: string;
    accentColor: string;
    sp: (px: number) => number;
    children: React.ReactNode;
}

function SectionHeader({ fs, headingFont, accentColor, sp, children }: SectionHeaderProps) {
    return (
        <h3 style={{
            fontFamily: headingFont,
            fontSize: fs.sectionHeading,
            fontWeight: 500,
            color: accentColor,
            marginBottom: `${sp(12)}px`,
        }}>
            {children}
        </h3>
    );
}
```

### 13. Bullet List Indentation

```tsx
// BEFORE
paddingLeft: '16px',

// AFTER
paddingLeft: scale < 1 ? '12px' : `${sp(16)}px`,
```

### 14. Border Widths

```tsx
// BEFORE
border: '3px solid #fff',
borderBottom: '2px solid #ccc',

// AFTER
border: `${sp(3)}px solid #fff`,
borderBottom: `${sp(2)}px solid #ccc`,
```

---

## Scale < 1 Branches

The `scale < 1` branches handle thumbnail/preview rendering. Keep them as hardcoded fallbacks — they only apply when the template is rendered as a small preview card, not in the builder.

Pattern:
```tsx
const value = scale < 1 ? SMALL_HARDCODED : sp(NORMAL);
```

**Important:** In the builder preview (`PagedPreview`), `scale` is always `1`. The visual shrinking is done via CSS `transform: scale(0.75)` on the outer container, not the `scale` prop.

---

## Checklist for Each Template

1. [ ] Add `sizeMult` and `sp()` after `getScaledFontSizes()`
2. [ ] Replace all `mb-*` / `mt-*` / `my-*` Tailwind classes with `marginBottom: sp(N)` / `marginTop: sp(N)`
3. [ ] Replace all `space-y-*` classes with `flex column gap: sp(N)px`
4. [ ] Replace all `gap-*` Tailwind classes with `gap: sp(N)px`
5. [ ] Replace all `p-*` / `px-*` / `py-*` Tailwind classes with `padding: sp(N)px`
6. [ ] Replace hardcoded Lucide icon `size` props with `sp(N)`
7. [ ] Replace hardcoded FontAwesome `width`/`height` with `sp(N)`
8. [ ] Replace `CircularProgress` size/strokeWidth/fontSize/labelFontSize with `sp(N)`
9. [ ] Replace `ProgressBar` height with `sp(N)`
10. [ ] Replace hardcoded image/photo sizes with `sp(N)`
11. [ ] Replace hardcoded icon container sizes with `sp(N)`
12. [ ] Replace hardcoded border widths with `sp(N)`
13. [ ] Update `SectionHeader` to accept and use `sp` prop
14. [ ] Verify at Small, Medium, Large — all elements scale proportionally
15. [ ] Verify PDF export at each size

---

## Reference Implementation

See `frontend/components/templates/layouts/header/HeaderDarkBanner.tsx` for the complete working example.

## Backend Templates

Backend PDF templates (`backend/src/templates/pdf/`) already have their own `s()` helper for font scaling. Spacing is less critical for PDFs since Puppeteer renders at a fixed viewport. No changes needed unless spacing looks off in exported PDFs.
