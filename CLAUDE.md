# AI Resume Builder - Project Notes

## Tech Stack
- Next.js 16.1.1 (App Router, Turbopack)
- React 19.2.3
- Tailwind CSS v4
- TypeScript

## Tailwind CSS v4 Notes

### CSS Reset Warning
**Don't add your own CSS reset when using Tailwind v4.**

Tailwind v4's `@import "tailwindcss"` includes Preflight (a CSS reset) automatically. Adding your own reset like:
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```
Will override Tailwind's spacing defaults and cause alignment/spacing issues.

**Correct approach:**
```css
@import "tailwindcss";

/* Only override specific properties Tailwind doesn't cover */
* {
  font-family: 'Inter', sans-serif;
}

body {
  background: #080b12;
}
```

### Custom Colors in Tailwind v4
Define colors in `@theme` directive, but also add explicit utility classes for custom color names:
```css
@theme {
  --color-accent-green: #00dc82;
}

/* Explicit utilities for CDN-style color names */
.bg-accent-green { background-color: #00dc82; }
.text-accent-green { color: #00dc82; }
.bg-accent-green\/20 { background-color: rgba(0,220,130,0.2); }
```

### PostCSS Setup
Tailwind v4 requires `@tailwindcss/postcss` plugin:
```js
// postcss.config.mjs
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

## Development
- Dev server runs on port 4455: `npm run dev`
- Clear `.next` cache if you encounter Turbopack errors: `rm -rf .next`
