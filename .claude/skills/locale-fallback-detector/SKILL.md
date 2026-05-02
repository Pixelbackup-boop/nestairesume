---
name: locale-fallback-detector
description: Detect MDX content slugs that exist in /en/ but are missing in target locales — these pages render English content at locale URLs and create canonical contradictions that block indexing. Use when auditing SEO indexing issues, deciding which locale translations to prioritize, before submitting a sitemap, or after adding new English content.
---

# Locale Fallback Detector

Finds blog posts, career-tips, resume-examples, and cover-letter-examples whose English source file exists at `content/<type>/slug.mdx` but where one or more locale folders are missing the same `slug.mdx`.

## Why this matters

When `/ko/blog/foo` is requested and `content/blog/ko/foo.mdx` doesn't exist, the app falls back to the English file ([lib/blog/posts.ts:150-160](frontend/lib/blog/posts.ts#L150-L160)). The page renders English content at a Korean URL with a canonical pointing back to `/en/blog/foo`. Google sees the contradictory signal and parks the URL in "Crawled - currently not indexed."

Each missing translation = one URL Google won't index.

## How to run it

When the user asks any of:
- "find missing locale translations"
- "which pages are falling back to English"
- "audit locale coverage"
- "what should we translate next"
- "check sitemap for fallback URLs"

Run this Bash command from the repo root:

```bash
cd frontend && python3 - <<'PY'
import os
from pathlib import Path

LOCALES = ['es','fr','de','ar','ja','ko','it','pt','tr','vi','th','zh','ms','id','pl','nl']
TYPES = {
    'blog': 'content/blog',
    'career-tips': 'content/career-tips',
    'resume-examples': 'content/resume-examples',
    'cover-letter-examples': 'content/cover-letter-examples',
}

print(f"{'Type':<22} {'Slug':<45} {'Missing locales':<55}")
print('-' * 122)

total_gaps = 0
for label, dir_path in TYPES.items():
    p = Path(dir_path)
    if not p.exists():
        continue
    en_slugs = sorted(f.stem for f in p.glob('*.mdx'))
    for slug in en_slugs:
        missing = [loc for loc in LOCALES if not (p / loc / f'{slug}.mdx').exists()]
        if missing:
            total_gaps += len(missing)
            preview = ','.join(missing) if len(missing) <= 8 else f"{','.join(missing[:8])}... (+{len(missing)-8})"
            print(f"{label:<22} {slug:<45} {preview}")

print('-' * 122)
print(f"Total fallback URLs (= URLs Google won't index without translation): {total_gaps}")
PY
```

## Interpreting the output

- **Zero gaps**: every English slug has translations in every locale → sitemap is clean
- **A few gaps in resume-examples / cover-letter-examples**: NOT a problem if those locales are outside `INDEXABLE_EXAMPLE_LOCALES` (en, es, pt, fr, de, it). Other locales emit `noindex` regardless
- **Many gaps in blog / career-tips**: each one is a contradictory URL still being crawled. Translating the highest-traffic English posts to the missing locales recovers indexable URLs at ~1:1 ratio
- **Polish (pl) heavy in blog**: per project memory, Polish blog is locale-only with unique slugs, NOT translations. Those slugs won't appear in this audit (no English root file to match)

## What to suggest after running

1. **For blog / career-tips gaps**: rank by post traffic (use GSC data) — translate the top 20 first
2. **For resume-examples / cover-letter-examples gaps in locales OUTSIDE the indexable list (ar, ja, ko, etc.)**: ignore them. Those pages are noindexed by design ([i18n.config.ts:79](frontend/i18n.config.ts#L79))
3. **For resume-examples / cover-letter-examples gaps INSIDE the indexable list (en, es, pt, fr, de, it)**: critical. These are SEO money pages — translate immediately
4. Mention that the sitemap routes already exclude these fallback URLs from the sitemap (post sitemap-canonical fix), so the harm is limited to URLs Google has already crawled and remembered

## Don't

- Don't suggest writing AI translations as a quick fix. Per project CLAUDE.md, content must be profession-specific and quality-reviewed
- Don't generate placeholder MDX files just to satisfy the gap count
- Don't include `en` in the missing-locales output (English is the source of truth, never "missing")
