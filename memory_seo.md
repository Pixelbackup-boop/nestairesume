# 📓 SEO Journal — bestairesumes.com

> **Purpose:** A dated cause-and-effect log so we can correlate *what we did* with *how Google responded*, days or weeks later. SEO has lag — you change something today, Google reacts in 3–30 days. This file lets us look back: "We did X on day N. It's day N+5 and Google still hasn't crawled. What did we change 2–3 days before that might be blocking it?"
>
> Companion file: **`memory_seo_metrics.md`** (pure numbers over time). Full diagnosis: **`SEO_AUDIT_2026-06-28.md`**.

## 🔧 How to use / update this file
- **Every time we change something** that affects SEO (deploy, config, content, sitemap, GSC action) → add a dated entry under **Timeline** tagged `[WE]`.
- **Every time we check GSC / crawl status** → add a dated entry tagged `[GOOGLE]` with what Google actually did (crawl dates, index flips, coverage states).
- **When we get something wrong** → log it tagged `[MISTAKE]` so we don't repeat it.
- **When an action needs a follow-up check** → add it to **Open Loops** with the date to check and what it tests.
- Timeline is **newest-first** (today at the top). Dates are `YYYY-MM-DD`.
- Keep `memory_seo_metrics.md` updated with the numbers each time we run a diagnostic.
- Diagnostic command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 scripts/seo/gsc_analyze.py` (and `gsc_check_submitted.py` for the tracked URLs).

---

## 📊 Current status (last updated 2026-06-28)
- **Root cause of collapse:** late-March 2026 `www` redirect loop (`ERR_TOO_MANY_REDIRECTS`, ~8 days) + simultaneous mass sitemap churn → ranking demotion + de-indexation on a low-authority domain. NOT the May localePrefix migration (that was a fix attempt). *(git-verified)*
- **Homepage `/`:** ✅ Submitted and indexed (recovered 2026-06-25 via manual Request Indexing).
- **Flagship EN pages** (software-engineer, nurse, teacher): recrawled 2026-06-25/26 but **still "Crawled – not indexed"** → quality/authority signal, not crawl-lag.
- **Traffic:** 28d ≈ 31 impressions / 1 click (collapsed from ~600/day in late March). Realistic recovery ceiling ≈ 5,000 impr/90d (NOT the old 30K — that included now-noindexed locales).
- **Indexable locales:** en, es, fr, de, ar (the other 12 are `noindex` — AI-translated, pending human review).
- **✅ DEPLOYED & LIVE (2026-06-28/29):** all P0+P1 work shipped to production via 2 deploys (PR #1, PR #3). Live-verified. Indexing signals sent.
- **Indexable locales:** en, es, fr, de, ar (the other 12 are `noindex` — AI-translated, pending human review).

---

## 🗓️ Timeline (newest first)

### 2026-06-29 (cont.) — DEPLOYED PR #4 + content cluster, VERIFIED LIVE
- `[WE]` **PR #4 squash-merged → main `fcf3b679`; deploy run 28337233310 = success.** Shipped: 6 indexation bug fixes + canonical consolidation + 726 `/en/` content-link strip (167 files) + europass/3-hub equity wiring + 3 new cluster guides.
- `[WE]` **3 new long-tail guides LIVE** (200): `/blog/german-cv-lebenslauf-format` (kw german cv format), `/blog/uk-cv-format-guide` (uk cv format), `/blog/tech-resume-guide` (tech resume HUB → 6 dev-role example pages). Modeled on the europass winner; each crawl-paths into resume-examples. Authors Alex Morgan / Sarah Chen (real author images). Auto-registered via filesystem getAllPosts.
- `[GOOGLE→verify]` **Live verification passed:** legacy /sitemap.xml = 0 noindex-locale URLs ✓; certified-nursing-assistant canonical→/resume-examples/cna ✓; /word-builder = noindex,nofollow ✓; /career/category/* → 308 → /career-tips/category/* ✓; resume-examples/accountant hreflang now 6 `<link>` + 4 `<a>` filtered to indexable (was 17) ✓; europass post resume-example links live ✓.
- `[MISTAKE→fixed]` **Verification caught a real gap:** `/sitemap-blog.xml` still emitted **864 noindex-locale URLs** (cf-cache-status DYNAMIC = fresh, not cache). Root cause: `app/api/sitemap-blog/route.ts` has its OWN locale-only-posts loop (lines 59-69) that my `build.ts` fix didn't cover — only gated `localizedUrls`+`indexableContentLocaleUrls`, not this route's raw `for (const locale of locales)`. **Fixed:** added `if (!isIndexableLocale(locale)) continue;` (PR #5). sitemap-index + per-locale routes confirmed clean.
- `[NOTE]` Non-blocking lint warning introduced: `useEffect missing dependency: localizedHref` in auth pages (the inline localizedHref guard). CI passed; cosmetic cleanup later.
- `[NOTE]` Grep gotcha: Next renders hreflang as `hrefLang` (camelCase) in HTML — lowercase greps return 0 falsely. Browsers/Google treat them identically.

### 2026-06-29 (cont.) — INDEXATION BUG FIXES (branch seo/indexation-fixes, 56 files)
Multi-agent workflow diagnosed all 11 GSC "not indexed" reasons → 6 real bugs that today's earlier deploy missed. Fixed:
- `[WE]` **P0 hreflang body leak**: `components/LanguageAlternates.tsx` "Read in your language" UI emitted crawlable `<a hreflang>` to all 17 locales on every resume/cover example page → filtered to INDEXABLE_LOCALES. (Today's earlier hreflang fix only covered `<head>` metadata, not this body component.)
- `[WE]` **P0 word-builder/gdocs-builder noindex**: `/word-builder` + `/gdocs-builder` `[locale]` routes survived today's root-only deletion, served HTTP 200 with NO noindex, inherited homepage canonical (→ "Duplicate, Google chose different canonical"). Added `robots:{index:false}` layouts.
- `[WE]` **P1 sitemap gating**: `lib/sitemap/utils.ts` (`localizedUrls`→INDEXABLE_LOCALES, `indexableContentLocaleUrls`+isIndexableLocale) + `build.ts` (locale-only-post loops). Stops submitting ~1,100+ noindex-locale URLs (esp. sitemap-blog.xml). **Also fixes the legacy `/sitemap.xml`** (shares buildAllSitemapEntries). i18n.config comment CLAIMED sitemaps derived from INDEXABLE_LOCALES but the wiring was missing.
- `[WE]` **P1 internal links /en prefix**: `localizedHref` was defined inline in 36 files unconditionally prepending `/${locale}`, so every English internal link emitted `/en/...` → 308 redirect (wasting crawl budget + diluting internal PageRank). Added default-locale guard to all 36 + a shared `localizedHref()` helper in localized-paths.ts.
- `[WE]` **P1 category/tool hreflang**: 15 layout/page files still iterated all 17 locales for `<head>` hreflang (templates, pricing, resume-examples, tools/*, community, etc.) → added isIndexableLocale guard.
- `[WE]` **P1 404 redirect**: added root-form `/career/category/* → /career-tips/category/*` 301 (existing rule only matched `/:locale/` form; root 404'd, fed by stale sitemap cache).
- `[VERIFIED]` tsc --noEmit = 0 errors; eslint = 0 errors on changed files.
- `[DEFERRED — user decisions]` (1) near-dup canonical consolidation (cna/cna-variants) CONFLICTS with CLAUDE.md differentiation policy — flagged not applied; (2) www→non-www redirect chains (9 "Redirect error") — fix at Cloudflare edge, NOT code (redirect loop caused the original collapse — don't touch redirect ordering); (3) es/fr/de/ar are AI-translated near-dupes (~5,200 indexable) — strategy call whether to temporarily noindex to concentrate crawl budget.

### 2026-06-29 (cont.) — DIAGNOSTIC: whole site is "Crawled - not indexed", not just resume-examples
- `[GOOGLE]` **URL Inspection on a sample (6 resume-examples + 3 blog + 2 list pages): EVERY page = "Crawled - currently not indexed."** Blog AND resume-examples alike. Even the best historical performer `/blog/europass-cv-format-guide` (earned pos 4.5, 239 impr) is currently NOT indexed. The site is effectively de-indexed; what shows in GSC is residual pre-collapse decay + noindexed-locale pages.
- `[GOOGLE]` **Google recrawled software-engineer, accountant, teacher, project-manager on 2026-06-28** (yesterday) — Request Indexing + sitemap resubmit working. Now "crawled, awaiting index decision" on the NEW de-templatized content = the 2–4wk evaluation window is live.
- `[GOOGLE]` **90d trend confirms collapse, not a blog-vs-resume story:** 8,837 impr (Mar29–Apr27) → 113 (Apr28–May27) → 32 (May28–Jun26). 98.5% of 90d impressions are pre-collapse residual. Last 2 months flatlined.
- `[GOOGLE]` **Page-type split (90d, impression-weighted):** blog 4,653 impr / wPos 28 · resume-examples 3,165 impr / wPos 47 · cover-letters 1,349 / wPos 33. Blog ranks ~20 positions better AND owns the only real winner (europass guide pos 2–4 across en/es/ar). Top resume-example impressions are mostly `/zh/` (now noindexed) at pos 85–95.
- `[GOOGLE]` **ZERO quick wins** (no query at pos 4–20 with ≥30 impr). Signature of a de-indexed site: everything is either tiny-at-pos-2-5 or buried-at-pos-80-99, nothing mid-range to nudge.
- `[FINDING]` Resume-examples have a structural disadvantage beyond indexation: target queries ("software engineer resume example", "account executive resume") are brutal commercial SERPs (Zety/Indeed/ResumeGenius). Blog long-tail (europass, "how to list remote work") ranks far easier → blog will recover first.
- `[FINDING]` Edge cases in sample: `/resume-examples/registered-nurse` = "Excluded by noindex" (canonical is /nurse), `/resume-examples/data-analyst` = "Page with redirect" — not the main story, but worth a later audit.
- `[NEXT]` Lean into blog as near-term engine (recovers fastest, proven winner); add europass-style informational posts internally linked INTO buried resume-example pages (crawl path + authority). Prioritize Request Indexing on blog winners too, not just resume-examples. Scripts: `gsc_pagetype.py`, `gsc_index_sample.py`, `gsc_90d.py`.

### 2026-06-29 — DEPLOYED, VERIFIED LIVE, INDEXING SENT
- `[WE]` **GitHub Actions billing** was blocking CI (3s reject) — user fixed it → CI ran. **PR #1 merged → deploy SUCCESS** (run 28328299006). All P0+P1 work LIVE.
- `[WE]` **Live post-deploy verification:** ✅ deleted top-level routes serve 200 via [locale]; ✅ it/pt noindex, /+/ar indexable, /ar examples indexable; ✅ register password policy live; ✅ content routes = Cache-Control + no Set-Cookie; ✅ HTML hreflang=6; ✅ Marcus Bennett (not Ken Coleman); ✅ de-templatized content live. Found 2 follow-ups (PR #3): next-intl `alternateLinks` emitted an 18-locale `Link:` header (conflict w/ HTML); old author URLs soft-404'd.
- `[WE]` **PR #3 merged → deploy SUCCESS** (run 28332648051): `alternateLinks:false` + 301 author redirects. Verified: homepage Link-header hreflang=0; `/about/ken-coleman`→308→`/about/marcus-bennett`. (Note: cached content pages may show stale 18-Link-header for ≤1h until Cloudflare TTL/purge — self-heals.)
- `[WE]` **Cloudflare Cache Rule created + verified** (see Cloudflare section above): content pages MISS→HIT, personalized DYNAMIC. Edge caching LIVE.
- `[WE]` **Indexing signals fired:** Indexing API pushed **172 keeper URLs** (50 GSC-proven + core/hubs + keeper locales + ~120 high-demand de-templatized examples). Re-submitted `sitemap-index.xml` + `sitemap-priority.xml` via GSC API. `scripts/seo/indexing_batch.py` for future runs.
- `[GOOGLE]` Pending — watch for the "Crawled - not indexed" pages flipping to Indexed over the next 2–6 weeks as Google recrawls the de-templated, clean-signal site.
- `[MISTAKE]` **(Ops gotcha, new):** now that content pages are edge-cached (1h TTL), every future content deploy serves STALE for ≤1h until Cloudflare cache expires/purges. Future: add a Cloudflare cache-purge step to the deploy pipeline, OR purge manually after deploying content.
- `[WE]` **Manual GSC Request Indexing** (the stronger lever, UI-only — USER's job): Day-1 list = /, /resume-examples, /cover-letter-examples, /blog, top resume examples, /pricing, /templates, /es, /de. ~12/day.

### 2026-06-28
- `[WE]` **Full multi-agent SEO audit** run. Corrected the root cause (see MISTAKE below). Wrote `SEO_AUDIT_2026-06-28.md`.
- `[WE]` **P0 code fixes committed to working tree (NOT deployed yet):**
  - Password policy now shown on register form (live checklist + submit gate) — was silently 400'ing weak passwords. `app/[locale]/auth/register/page.tsx`, `messages/en.json`.
  - Single source of truth for indexable locales: `INDEXABLE_LOCALES = ['en','es','fr','de','ar']` in `i18n.config.ts`; `layout.tsx` derives from it. Fixed split-brain (ar was wrongly excluded; it/pt wrongly included).
  - hreflang now filtered to indexable locales on example/blog/career-tips slug pages (was emitting all 17, contradicting noindex). New helper `lib/seo/hreflang.ts`.
  - hreflang sweep COMPLETED across the remaining 25 marketing/hub/category pages (zety/adobe/...-alternative, features, blog hub, about, terms, privacy, templates/[category], compare, etc.) — all now route through `hreflangAlternates()`. P0-4 fully done in code.
  - `sitemap-index` now lists only the 5 indexable locale sitemaps (was all 17). `app/api/sitemap-index/route.ts`.
  - Verified: `tsc --noEmit` clean (twice, independently).
- `[WE]` **Side effect to watch:** consolidating locales fully noindexes ~2,240 it/pt example pages that were previously indexed (the split-brain). Reversible by adding `'it','pt'` to `INDEXABLE_LOCALES`. Decision: keep noindexed (consistent with 2026-06-18 decision + audit).
- `[GOOGLE]` Diagnostic: homepage still indexed; flagship EN pages recrawled 06-25/26 but still not indexed; priority sitemap 50 submitted / **0 indexed**.
- `[MISTAKE]` **(Claude)** Earlier this week I diagnosed the collapse as caused by the April localePrefix migration. **Wrong.** Git history shows that migration shipped 2026-05-19 (`d1de1597`, "fix homepage indexation") — *after* the collapse, as a repair. The real trigger was the late-March www redirect loop + sitemap churn. **Lesson: check `git log` dates before asserting a root cause.**

### 2026-06-28 (cont.) — P1-2 content de-duplication DONE (multi-agent, code not deployed)
- `[WE]` Ran a 128-agent workflow (115 rewrite + 12 verify + synth, 6.65M tokens) to de-templatize the duplicate section blocks Google was penalizing (the likely cause of "Crawled - not indexed" on healthy English pages). Rewrote 533 sections across ~450 files: 175 resume interview-question blocks (17 category clusters), 64 resume format-tip blocks (3 clusters), 294 cover-letter format-tip blocks (1 cluster). Each now profession-specific per CLAUDE.md bar.
- `[WE]` **Verified deterministically:** re-ran the dedup scout → 0 duplicate clusters remaining (was 175+64+294). 533 files re-parsed with gray-matter → frontmatter intact, 0 broken, all interview sections have exactly 5 ### questions. All 13 LLM quality-sample verdicts = pass (spot-checks showed real domain depth — poly-count budgets, RevPAR/STR, MoSCoW, signal-chain gain staging).
- `[WE]` Minor non-blocking residue (not fixed, low priority): the section INTRO sentence ("Preparing for interviews is an important part...") is still shared across files — but the substantive questions/guidance are all unique, so the scaled-content fingerprint is gone. Optional future polish. Also pending: update the batch scripts (`scripts/add-interview-questions.mjs` etc.) to generate per-page so future pages don't reintroduce templating.
- Scout/worklist/workflow scripts: `scratchpad/scout_dupes.mjs`, `build_worklist.mjs`, `dedup_workflow.js`.

### 2026-06-28 (cont.) — P1-3 crawl-graph fix (code done)
- `[WE]` Hub grids (`ResumeExamplesGrid.tsx`, `CoverLetterExamplesGrid.tsx`) now add `rel="nofollow"` to example-card links on noindexed locales (via `isIndexableExampleLocale(locale)`). This was the LAST discovery vector feeding ~13K noindex example leaves to Googlebot (already removed from sitemaps in P0-4 + hreflang). Chose nofollow over removing links so the 12 locales' pages stay usable for real direct/returning users. The LanguageSwitcher is NOT a vector — it uses `<button onClick + router.push>`, not crawlable `<a href>`. tsc clean.

### 2026-06-28 (cont.) — P1-4 edge caching (code done + adversarially verified; needs Cloudflare rule)
- `[WE]` Enabled edge-caching of content HTML so Googlebot fetches are cheap (raises crawl rate). Changes: `middleware.ts` `localeDetection:false` + `localeCookie:false` (stops NEXT_LOCALE Set-Cookie) + `geo_country` cookie now set ONLY on /auth routes; `next.config.ts` adds `Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400` for content prefixes (resume-examples, cover-letter-examples, career-tips, career, blog + es/pt localized segments), personalized routes excluded.
- `[WE]` **Ran a 4-lens adversarial verification workflow.** Verdict: SHIP-WITH-FIXES. Privacy: SAFE — empirically confirmed (path-to-regexp run against installed copy) that NO personalized route (/auth, /dashboard, /builder, /checkout, /billing, /profile, /es/dashboard, etc.) matches the cache rules, and content pages read zero cookies()/headers()/session server-side (Header is client-hydrated). Caught a real bug: `localeDetection:false` alone does NOT stop next-intl's NEXT_LOCALE cookie (v4 syncCookie gates on `localeCookie`) → would've left all 16 non-English locales uncacheable. FIXED by adding `localeCookie:false`. tsc clean.
- `[WE]` **⚠️ REQUIRED USER ACTION (Cloudflare dashboard):** caching is INERT until a Cache Rule exists. Cloudflare → Caching → Cache Rules → match `^/((es|fr|de|ar|ja|ko|it|pt|tr|vi|th|zh|ms|id|pl|nl)/)?(resume-examples|cover-letter-examples|career-tips|career|blog|ejemplos-de-curriculum|ejemplos-de-carta-de-presentacion|consejos-profesionales|exemplos-de-curriculo|exemplos-de-carta-de-apresentacao|dicas-de-carreira)(/|$)` → Eligible for cache + Respect origin TTL. Do NOT use zone-wide "Cache Everything" (would cache personalized routes). Verify post-deploy: content URLs return `cf-cache-status: HIT` and NO `set-cookie`.
- `[WE]` Accepted minor locale regression: returning user typing bare `/` gets English instead of remembered language (cookie-based `/`→`/es` auto-redirect gone). Fine for SEO-first site (canonical `/` = English). Coverage gap: homepage `/` + marketing pages not cached (safe-fail; can add later).

### 2026-06-28 (cont.) — P1-5 registration bug FIXED in code (not deployed)
- `[MISTAKE]` **(Site)** Found the likely #1 cause of "zero registrations": the builder download flow used a FAKE auth modal (`AuthModal.tsx`) that did `localStorage.setItem('isAuthenticated','true')` with NO backend call. Users "signed up," felt registered, downloaded — but no account was ever created. The real `DownloadModal` (which redirects logged-out users to the REAL `/auth/register` + handles usage limits) was sitting right behind it, blocked by the fake gate.
- `[WE]` **Fix:** removed the fake gate from `app/[locale]/word-builder` + `app/[locale]/gdocs-builder` so download → `DownloadModal` directly (matches the main `[locale]/builder`, which never had a fake gate). Now logged-out users are routed to REAL registration → real accounts captured. Also fixed `components/feedback/TemplateFeedbackButton.tsx` (was showing the fake modal despite reading real `useAuthStore` state) → now redirects to real `/auth/login`. tsc clean.
- `[WE]` **Dead-route cleanup DONE (verified safe, tsc clean).** Proof they were dead: no `app/page.tsx` exists, so `/` (and all unprefixed paths) are served by `app/[locale]` via next-intl rewrite → top-level dupes are shadowed/unreachable. Nothing imports them. Deleted: `app/builder`, `app/word-builder`, `app/gdocs-builder` (fake-auth dupes), `components/auth/AuthModal.tsx` (orphaned fake component), `app/auth/` (stale register+login+layout — old register lacked the P0-2 password fix), `app/canvas-editor/` (dead dupe + hundreds of scraped-Canva junk files), `app/gdocs-onboarding/` (dead dupe). Remaining top-level routes are all legit (`app/admin`, `app/maintenance`, `app/sitemap`). **Verify after redeploy:** `/builder`, `/word-builder`, `/gdocs-builder`, `/auth/register`, `/canvas-editor` still load (they will — served by `[locale]`).
- `[WE]` **P1-1 author impersonation FIXED (code, not deployed).** Renamed the two real-celebrity authors to original personas: **Ken Coleman → Marcus Bennett** (Career Coach & Author, 366 files), **Anna Papalia → Maya Sullivan** (Interview Coach & Career Strategist, 440 files). Migration (`scratchpad/rename_authors.mjs`) updated 806 MDX files: `author:` frontmatter, `authorImage` paths, AND removed the fabricated "Host of The Ken Coleman Show" bios (en + es variants — replaced with generic text, NOT name-swapped). Updated AUTHORS config in `lib/resume-examples/posts.ts` (key/name/slug/jobTitle/image/url). Renamed images: ken-coleman.webp→marcus-bennett.webp, anna-papalia.webp→maya-sullivan.webp, anna-papalia.svg→maya-sullivan.svg. Verified: ZERO "Ken Coleman"/"Anna Papalia" refs anywhere, tsc clean. NOTE: old `/about/ken-coleman` + `/about/anna-papalia` profile URLs will now 404 — intentional (we want the impersonated identities gone; no redirect).
- `[WE]` **P1-1 secondary still open:** 8 remaining authors have empty `linkedin` (no `sameAs`). If any represent real people, add real LinkedIn URLs for stronger E-E-A-T; else they remain editorial personas.

### 2026-06-26
- `[GOOGLE]` 5 of 7 submitted URLs recrawled within ~24h. Homepage recrawled again (08:21). `/blog` and `/tools/ats-checker` got fresh crawls; their stale "Page with redirect" verdict cleared. `/en` correctly stays "Crawled – not indexed" (it 308-redirects to `/` — working as designed, do NOT try to index it). `/pricing` not yet recrawled.

### 2026-06-25
- `[WE]` **Manual GSC Request Indexing** on 7 URLs: `/`, `/en`, `/resume-examples/software-engineer`, `/resume-examples/nurse`, `/blog`, `/tools/ats-checker`, `/pricing`.
- `[GOOGLE]` 🎉 **Homepage `/` flipped from "Crawled – not indexed" (3 months stale) → "Submitted and indexed" in ~10 minutes.** Request Indexing pipeline works. *(Caveat learned later: it forces a recrawl, not an index decision — quality-declined pages won't flip from this alone.)*

### 2026-06-24
- `[WE]` Ran GSC diagnostic. Sent Indexing API ping on `/` and `/en`.
- `[GOOGLE]` Homepage `/` = "Crawled – currently not indexed", last crawl **2026-03-29** (3 months stale). `/en` still had stale `/en` canonical. Priority sitemap 50 submitted / 0 indexed.
- `[MISTAKE]` **(Process)** OAuth refresh token had expired/revoked — diagnostic failed until re-auth (`scripts/seo/gsc_reauth.py`, browser flow). Tokens at `~/.config/claude-seo/oauth-token.json`.

### 2026-06-21
- `[GOOGLE]` `sitemap-index.xml` last downloaded by Google.

### 2026-06-18
- `[WE]` Noindexed 12 AI-translated locales (ja, ko, it, pt, tr, vi, th, zh, ms, id, pl, nl). Submitted slim 50-URL priority sitemap. *(Good quality move, but walks away from ~20–30% of historical impressions incl. all Italian traffic.)*

### 2026-05-19
- `[WE]` Shipped `localePrefix: 'always' → 'as-needed'` migration (`d1de1597`, "fix homepage indexation"). Changed every URL `/en/foo → /foo`. **This was a fix ATTEMPT, not the cause of the collapse** — but it was the 3rd structural URL change in 8 weeks, each of which resets Google's evaluation clock.

### 2026-04-12
- `[WE]` `7ceed4ec` fix canonical domain + localized es/pt internal links to eliminate ~6K redirect/duplicate pages.

### ~2026-04-07 → 04-20  (THE COLLAPSE)
- `[GOOGLE]` Rankings slid smoothly position ~9 → ~55 over ~10 days, then impressions evaporated (857/day → 40/day → single digits). A smooth positional slide = ranking demotion, not a single-event drop.

### 2026-04-04
- `[WE]` `bb0bf5bb` fixed the www redirect loop (`ERR_TOO_MANY_REDIRECTS`) — but it had already been live ~8 days during the steepest decline.

### 2026-03-27 → 04-04  (THE TRIGGER)
- `[MISTAKE]` **(Site)** A buggy `www` → non-`www` redirect (suspected `b2988e40`, ~Mar 27) caused an **infinite redirect loop** on the canonical host for ~8 days. Googlebot couldn't load pages on a low-authority domain. **This is the root cause of the traffic collapse.**

### 2026-03-29
- `[MISTAKE]` **(Site)** Mass sitemap churn — 8 commits in one day rebuilding sitemap.xml from scratch with 24,018 URLs (`43e19953`). Dumping 24K URLs during the redirect-loop window compounded the damage.

### 2026-02-20
- `[WE]` `a3883768` normalized site URL to non-www `bestairesumes.com`.

---

## 🔁 Open loops (scheduled checks — what we're waiting on)

| Check by | What to verify | What it tests | Status |
|----------|----------------|---------------|--------|
| ~2026-07-01 | Do the 4 recrawled-but-not-indexed flagship pages (software-engineer, nurse, blog, ats-checker) flip to "Indexed"? | Whether Request Indexing alone recovers quality-OK pages, OR confirms it's a quality/authority block | ⏳ open |
| After redeploy | Live `/it/`, `/pt/` return `noindex`; live `/ar/resume-examples/*` returns `index`; `/pt/`,`/it/` drop from sitemaps | That the locale-consolidation fix actually shipped (vs deploy drift) | ⏳ blocked on redeploy |
| ~2 wks after redeploy | Priority sitemap "indexed" count rises above 0/50 | Whether the cleaned signals + recovered homepage authority start lifting indexation | ⏳ open |
| ~2026-07-05 | Re-run full diagnostic; log impressions/clicks/indexed in metrics file | Overall recovery trend | ⏳ open |

---

## 🚫 Hard rules (mistakes we will NOT repeat)
1. **Freeze URL architecture.** No more routing/localePrefix/redirect/sitemap-structure changes. Every structural change in the last 8 weeks reset Google's clock. This caused the collapse.
2. **Check `git log` dates before blaming a deploy** for a ranking change. (Claude's 06-28 mistake.)
3. **Don't try to index redirect sources** like `/en` — they're *supposed* to stay "not indexed."
4. **Request Indexing ≠ guaranteed indexing.** It forces a recrawl. Quality-declined pages won't index from it alone.
5. **Don't treat 30K impressions as the target.** Real ceiling ≈ 5K/90d; most of the old volume was non-English, non-clicking, and/or now-noindexed.
6. **Verify live state before changing config** — the deployed build can drift from HEAD.
