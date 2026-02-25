# Translation Guide - Adding New Languages

This guide covers everything needed to add a new language to the AI Resume Builder.

## Current Languages (17)

| Code | Language | Script | Font |
|------|----------|--------|------|
| en | English | Latin | Poppins |
| es | Spanish | Latin | Poppins |
| fr | French | Latin | Poppins |
| de | German | Latin | Poppins |
| ar | Arabic | Arabic (RTL) | Noto Sans Arabic |
| ja | Japanese | CJK | Noto Sans JP |
| ko | Korean | CJK | Noto Sans KR |
| it | Italian | Latin | Poppins |
| pt | Brazilian Portuguese | Latin | Poppins |
| tr | Turkish | Latin | Poppins |
| vi | Vietnamese | Latin+diacritics | Poppins |
| th | Thai | Thai | Noto Sans Thai |
| zh | Chinese Simplified | CJK | Noto Sans SC |
| ms | Malay | Latin | Poppins |
| id | Indonesian | Latin | Poppins |
| pl | Polish | Latin | Poppins |
| nl | Dutch | Latin | Poppins |

---

## Step 1: Update Config (REQUIRED)

**File:** `frontend/i18n.config.ts`

Add the new locale to these 4 places:

```typescript
// 1. Add to locales array
export const locales = ['en', 'es', ..., 'NEW_CODE'] as const;

// 2. Add native display name
export const localeNames: Record<Locale, string> = {
  ...,
  NEW_CODE: 'Native Name',  // e.g., 'हिन्दी' for Hindi
};

// 3. Add short code
export const localeCodes: Record<Locale, string> = {
  ...,
  NEW_CODE: 'XX',  // e.g., 'HI' for Hindi
};

// 4. Add OpenGraph locale
export const ogLocaleMap: Record<Locale, string> = {
  ...,
  NEW_CODE: 'xx_XX',  // e.g., 'hi_IN' for Hindi
};
```

**If RTL language** (Arabic, Hebrew, Farsi, Urdu):
```typescript
export const rtlLocales: Locale[] = ['ar', 'NEW_CODE'];
```

That's it for config. All 47+ page files import `locales` from this config, so they auto-detect new locales.

---

## Step 2: Create Translation File (REQUIRED)

**File:** `frontend/messages/NEW_CODE.json`

Copy `en.json` as a starting point:
```bash
cp frontend/messages/en.json frontend/messages/NEW_CODE.json
```

Then translate all string values. The file has ~2087 lines with 523 keys across 35 namespaces.

**Rules:**
- Keep all JSON keys unchanged (only translate values)
- Keep placeholders: `{date}`, `{count}`, `{name}`, `{plan}`, etc.
- Keep brand names: "Best AI Resume", "Stripe", "Google", "LinkedIn", etc.
- Keep technical terms: "PDF", "ATS", "DOCX", "GPA", "AI", "CV"
- Keep ICU plural syntax: `{count, plural, one {} other {s}}`
- Keep keyboard shortcuts: "V Select", "Cmd+Z", etc.

**Missing keys auto-fallback to English** — so partial translations are safe to deploy.

### Translation Priority

| Priority | Namespaces | Keys | Why |
|----------|-----------|------|-----|
| P1 | Navigation, Footer, Common, Meta, LanguageSwitcher | ~169 | Every page uses these |
| P2 | Home, Pricing, Contact, Builder, Templates, CanvasTemplates | ~384 | Core user-facing pages |
| P3 | Auth, Onboarding, Checkout, CheckoutSuccess | ~201 | Sign-up/payment flows |
| P4 | Everything else | ~703 | Lower traffic pages |

---

## Step 3: Add Font (ONLY for non-Latin scripts)

**Skip this step** if the language uses Latin script (like Portuguese, Turkish, Polish, etc.).
Poppins already covers Latin + Latin-ext subsets.

**Required for:** CJK (Chinese, Japanese, Korean), Thai, Devanagari (Hindi), Cyrillic (Russian), etc.

### 3A: Frontend Font

**File:** `frontend/app/[locale]/layout.tsx`

```typescript
// Add import
import { ..., Noto_Sans_NEW } from 'next/font/google';

// Add font declaration
const notoNew = Noto_Sans_NEW({
  variable: '--font-newlang',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

// Add to fontClassMap
const fontClassMap: Record<string, string> = {
  ...,
  NEW_CODE: 'font-newlang',
};

// Add variable to <body> className
className={`... ${notoNew.variable} ...`}
```

### 3B: CSS Class

**File:** `frontend/app/globals.css`

Add after existing font classes:
```css
/* NewLang font family */
.font-newlang {
  font-family: var(--font-newlang), 'Noto Sans NEW', sans-serif;
}
```

### 3C: Backend PDF Font

**File:** `backend/src/templates/pdf/shared/htmlWrapper.ts`

Add to `CJK_FONT_MAP`:
```typescript
const CJK_FONT_MAP: Record<string, { family: string; googleParam: string }> = {
  ...,
  NEW_CODE: { family: 'Noto Sans NEW', googleParam: 'Noto+Sans+NEW:wght@400;500;600;700' },
};
```

---

## Step 4: Test

1. Visit `/{NEW_CODE}/` — page loads
2. Visit `/{NEW_CODE}/builder` — builder works, text renders
3. Language switcher shows the new language
4. Switch to new locale and back — works correctly
5. Enter text in new script in builder — renders in preview
6. Download PDF — text renders correctly
7. View page source — `<link rel="alternate" hreflang="NEW_CODE">` present
8. Check `<meta property="og:locale">` — shows correct country code

---

## Checklist

- [ ] Added to `frontend/i18n.config.ts` (locales, localeNames, localeCodes, ogLocaleMap)
- [ ] Created `frontend/messages/{code}.json` with translations
- [ ] Font added if non-Latin script (layout.tsx + globals.css + htmlWrapper.ts)
- [ ] If RTL: added to `rtlLocales` array
- [ ] Tested: pages load, language switcher works, PDF export works

---

## Architecture Notes

- **Config:** `frontend/i18n.config.ts` — single source of truth for all locale data
- **Messages:** `frontend/messages/{code}.json` — one file per locale, loaded by `frontend/i18n/request.ts`
- **Fallback:** Deep-merges locale JSON with English — missing keys use English automatically
- **Middleware:** `frontend/middleware.ts` — handles locale detection and URL routing
- **Fonts:** `next/font/google` auto-subsets CJK via Unicode Range (~100-300KB per page)
- **RTL:** Handled by `isRtl()` + `getDirection()` — sets `dir="rtl"` on `<html>`
- **Localized URLs:** Optional, defined in `frontend/lib/localized-paths.ts` (only Spanish has them currently)
- **PDF fonts:** Non-Latin fonts loaded via Google Fonts `<link>` tag in `backend/src/templates/pdf/shared/htmlWrapper.ts`

## Common Fonts for New Languages

| Language | Google Font | Import Name |
|----------|-----------|-------------|
| Hindi | Noto Sans Devanagari | `Noto_Sans_Devanagari` |
| Russian | Noto Sans (Cyrillic subset) | Already in Poppins latin-ext? Check. Otherwise `Noto_Sans` |
| Bengali | Noto Sans Bengali | `Noto_Sans_Bengali` |
| Tamil | Noto Sans Tamil | `Noto_Sans_Tamil` |
| Hebrew | Noto Sans Hebrew | `Noto_Sans_Hebrew` |
| Greek | Noto Sans (Greek subset) | Poppins covers basic Greek |
