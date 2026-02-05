# SEO Tools Setup Guide

Complete setup instructions for Google Analytics, Search Console, Bing Webmaster, and Yandex Webmaster.

---

## Quick Reference

| Tool | File to Edit | Variable/Field to Replace |
|------|--------------|---------------------------|
| Google Analytics 4 | `.env.local` | `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX` |
| Google Search Console | `app/layout.tsx` | `google: 'YOUR_GOOGLE_VERIFICATION_CODE'` |
| Bing Webmaster | `app/layout.tsx` | `'msvalidate.01': ['YOUR_BING_VERIFICATION_CODE']` |
| Yandex Webmaster | `app/layout.tsx` | `yandex: 'YOUR_YANDEX_VERIFICATION_CODE'` |

---

## 1. Google Analytics 4 (GA4)

### Step 1: Create GA4 Property
1. Go to [analytics.google.com](https://analytics.google.com)
2. Click **Admin** (gear icon) → **Create Property**
3. Enter property name: `Best AI Resume`
4. Select your timezone and currency
5. Choose **Web** as platform
6. Enter your website URL: `https://www.bestairesumes.com`

### Step 2: Get Measurement ID
1. After setup, go to **Admin** → **Data Streams** → **Web**
2. Copy the **Measurement ID** (format: `G-XXXXXXXXXX`)

### Step 3: Add to Project
**File:** `.env.local` (create if doesn't exist)

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Replace `G-XXXXXXXXXX` with your actual Measurement ID.

### Verify It Works
1. Deploy your site or run locally
2. Go to GA4 → **Reports** → **Realtime**
3. Visit your website in another tab
4. You should see yourself as an active user

---

## 2. Google Search Console

### Step 1: Add Property
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Click **Add Property**
3. Choose **URL prefix** method
4. Enter: `https://www.bestairesumes.com`

### Step 2: Get Verification Code
1. Select **HTML tag** verification method
2. You'll see a meta tag like:
   ```html
   <meta name="google-site-verification" content="abc123xyz..." />
   ```
3. Copy only the `content` value (e.g., `abc123xyz...`)

### Step 3: Add to Project
**File:** `app/layout.tsx`

Find this section and replace the placeholder:

```typescript
export const metadata: Metadata = {
  verification: {
    google: 'abc123xyz...',  // ← Replace with your code
    yandex: 'YOUR_YANDEX_VERIFICATION_CODE',
    other: {
      'msvalidate.01': ['YOUR_BING_VERIFICATION_CODE'],
    },
  },
};
```

### Step 4: Verify & Submit Sitemap
1. Deploy your changes
2. Go back to Search Console and click **Verify**
3. Once verified, go to **Sitemaps** in the left menu
4. Enter: `sitemap.xml`
5. Click **Submit**

---

## 3. Bing Webmaster Tools

### Step 1: Add Site
1. Go to [bing.com/webmasters](https://www.bing.com/webmasters)
2. Sign in with Microsoft account
3. Click **Add Site**
4. Enter: `https://www.bestairesumes.com`

### Step 2: Get Verification Code
1. Choose **Meta Tag** verification (Option 2)
2. You'll see a meta tag like:
   ```html
   <meta name="msvalidate.01" content="ABCD1234EFGH5678" />
   ```
3. Copy only the `content` value

### Step 3: Add to Project
**File:** `app/layout.tsx`

```typescript
export const metadata: Metadata = {
  verification: {
    google: 'your-google-code',
    yandex: 'YOUR_YANDEX_VERIFICATION_CODE',
    other: {
      'msvalidate.01': ['ABCD1234EFGH5678'],  // ← Replace with your code
    },
  },
};
```

### Step 4: Verify & Submit Sitemap
1. Deploy your changes
2. Go back to Bing Webmaster and click **Verify**
3. Once verified, go to **Sitemaps** in the left menu
4. Click **Submit Sitemap**
5. Enter: `https://www.bestairesumes.com/sitemap.xml`

---

## 4. Yandex Webmaster

### Step 1: Add Site
1. Go to [webmaster.yandex.com](https://webmaster.yandex.com)
2. Sign in or create a Yandex account
3. Click **Add Site** (+ button)
4. Enter: `https://www.bestairesumes.com`

### Step 2: Get Verification Code
1. Choose **Meta tag** verification method
2. You'll see a meta tag like:
   ```html
   <meta name="yandex-verification" content="a1b2c3d4e5f6g7h8" />
   ```
3. Copy only the `content` value

### Step 3: Add to Project
**File:** `app/layout.tsx`

```typescript
export const metadata: Metadata = {
  verification: {
    google: 'your-google-code',
    yandex: 'a1b2c3d4e5f6g7h8',  // ← Replace with your code
    other: {
      'msvalidate.01': ['your-bing-code'],
    },
  },
};
```

### Step 4: Verify & Submit Sitemap
1. Deploy your changes
2. Go back to Yandex Webmaster and click **Check**
3. Once verified, go to **Indexing** → **Sitemap files**
4. Click **Add**
5. Enter: `https://www.bestairesumes.com/sitemap.xml`

---

## 5. Final Checklist

After completing all setups, your `app/layout.tsx` should look like:

```typescript
export const metadata: Metadata = {
  verification: {
    google: 'your-actual-google-verification-code',
    yandex: 'your-actual-yandex-verification-code',
    other: {
      'msvalidate.01': ['your-actual-bing-verification-code'],
    },
  },
};
```

And your `.env.local` should have:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Verification Checklist

- [ ] Google Analytics showing real-time data
- [ ] Google Search Console verified (green checkmark)
- [ ] Google Search Console sitemap submitted
- [ ] Bing Webmaster verified
- [ ] Bing Webmaster sitemap submitted
- [ ] Yandex Webmaster verified
- [ ] Yandex Webmaster sitemap submitted

---

## Sitemap URL

Your sitemap is automatically generated at:

```
https://www.bestairesumes.com/sitemap.xml
```

This sitemap includes:
- All static pages (homepage, pricing, features, etc.)
- All blog posts
- All 300+ resume example pages
- All career tips articles
- All localized versions (en, de, fr, es, ar)

---

## Troubleshooting

### "Verification failed"
- Make sure you deployed the changes after adding the verification codes
- Wait 5-10 minutes after deployment before verifying
- Check that there are no typos in the verification codes

### "Sitemap couldn't be read"
- Verify the sitemap is accessible: visit `https://www.bestairesumes.com/sitemap.xml` in your browser
- Check for any server errors in the response

### GA4 not tracking
- Check browser console for errors
- Verify the Measurement ID is correct (starts with `G-`)
- Disable ad blockers temporarily to test
- Check that `.env.local` is not committed to git (it shouldn't be)

---

## Additional Resources

- [Google Analytics 4 Documentation](https://support.google.com/analytics/answer/9304153)
- [Google Search Console Help](https://support.google.com/webmasters)
- [Bing Webmaster Tools Help](https://www.bing.com/webmasters/help)
- [Yandex Webmaster Help](https://yandex.com/support/webmaster/)
