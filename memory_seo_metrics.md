# 📈 SEO Metrics History — bestairesumes.com

> Companion to `memory_seo.md`. Pure numbers over time so we can see the trend.
> Append a new row each time we run a diagnostic. Oldest → newest (top → bottom).
> Source: `scripts/seo/gsc_analyze.py` (totals + sitemaps) and `gsc_check_submitted.py` (per-URL).

## Search performance (rolling windows, from GSC)

| Date pulled | Window | Clicks | Impressions | CTR | Avg position | Notes |
|-------------|--------|--------|-------------|-----|--------------|-------|
| 2026-06-28 | 180d | 43 | 30,019 | 0.14% | 40.1 | Cumulative peak — NOT a run-rate. ~20-30% on now-noindexed locales |
| 2026-06-28 | 90d  | 12 | 10,078 | 0.12% | 33.9 | ~75% German/French blog; English ~25% with no top-20 |
| 2026-06-28 | 28d  | 1  | 31     | 3.23% | 3.3  | Collapsed; high pos is just a tiny residual |
| 2026-06-24 | 28d  | 1  | 28     | 3.57% | 4.6  | Pre-audit baseline |
| 2026-06-29 | 28d  | 1  | 31     | 3.23% | 3.5  | Flat vs 06-28 (no change yet — fixes need recrawl). Post all-fixes baseline |
| 2026-06-29 | 7d   | 0  | 11     | 0.00% | 2.5  | Tiny residual; watch this window for first recovery signal |

## Daily impressions (the collapse curve — key inflection points)

| Date | Impressions/day | Avg position | Phase |
|------|-----------------|--------------|-------|
| 2026-03-27 | 598 | 9.0  | Healthy (pre-collapse) |
| 2026-03-31 | 857 | 22.7 | Peak |
| 2026-04-06 | 574 | 38.8 | Redirect loop live |
| 2026-04-13 | 211 | 64.2 | Cliff |
| 2026-04-14 | 109 | 51.2 | Cliff (knee) |
| 2026-04-20 | 40  | 37.6 | Bled out |
| 2026-04-29 | 8   | 38.3 | Flatlined |
| 2026-05→06 | 0–7 | varies | Flatlined |

## Homepage `/` index status over time

| Date | Coverage state | Last crawl (Google) | Google canonical |
|------|----------------|---------------------|------------------|
| 2026-06-24 | Crawled – currently not indexed | 2026-03-29 | (none) |
| 2026-06-25 | ✅ Submitted and indexed | 2026-06-25 19:10 | https://bestairesumes.com/ |
| 2026-06-26 | ✅ Submitted and indexed | 2026-06-26 08:21 | https://bestairesumes.com/ |
| 2026-06-28 | ✅ Submitted and indexed | 2026-06-26 08:21 | https://bestairesumes.com/ |

## Tracked URLs — submitted 2026-06-25 via Request Indexing

| URL | 2026-06-25 19:18 | 2026-06-28 | Target |
|-----|------------------|------------|--------|
| `/` | ✅ Indexed (19:10) | ✅ Indexed (recrawl 06-26 08:21) | stay indexed |
| `/en` | Not indexed (04-04) | Not indexed (04-04) | ⚪ should stay (redirects to /) |
| `/resume-examples/software-engineer` | Not indexed (06-25 19:14) | Not indexed (06-25 19:14) | → Indexed |
| `/resume-examples/nurse` | Not indexed (06-25 19:16) | Not indexed (06-25 19:16) | → Indexed |
| `/blog` | Not indexed (04-05) | Recrawled 06-25 19:22, not indexed | → Indexed |
| `/tools/ats-checker` | "Page with redirect" (04-27) | Recrawled, "not indexed" (verdict cleared) | → Indexed |
| `/pricing` | "Page with redirect" (03-04) | "Page with redirect" (03-04, not recrawled) | → Indexed after recrawl |

## Sitemaps

| Date | sitemap-priority.xml | sitemap-index.xml | Notes |
|------|----------------------|-------------------|-------|
| 2026-06-24 | 50 submitted / 0 indexed (dl 06-18) | dl 06-21 | — |
| 2026-06-28 | 50 submitted / 0 indexed | dl 06-21 | After redeploy: index will list 5 locales only (was 17) |

## Monthly trend (90d split, pulled 2026-06-29) — the collapse, in three windows
| Window | Impressions | Clicks | Avg pos | Phase |
|--------|-------------|--------|---------|-------|
| 2026-03-29 → 04-27 | 8,837 | 9 | 37.1 | pre-collapse residual (93% of 90d total) |
| 2026-04-28 → 05-27 | 113 | 2 | 20.2 | flatlined |
| 2026-05-28 → 06-26 | 32 | 1 | 3.4 | flatlined (high pos = tiny residual) |
| **90d TOTAL** | **9,481** | **12** | **35.4** | — |

## Page-type breakdown (90d, impression-weighted, pulled 2026-06-29)
| Section | Impr | % | Clicks | Pages | wAvgPos |
|---------|------|---|--------|-------|---------|
| blog | 4,653 | 47.1% | 3 | 456 | 28.0 |
| resume-examples | 3,165 | 32.1% | 2 | 865 | 47.1 |
| cover-letter-examples | 1,349 | 13.7% | 1 | 407 | 32.9 |
| career-tips | 135 | 1.4% | 2 | 35 | 11.6 |
- Blog ranks ~20 positions better than resume-examples AND owns the only real winner: `/blog/europass-cv-format-guide` pos 2.6–4.5 (en/es/ar).
- Top resume-example impressions are mostly `/zh/` pages (now noindexed) at pos 85–95 → inflate the count without value.
- **Quick wins: ZERO** (no query pos 4–20 with ≥30 impr). De-indexed-site signature.

## Indexation sample (URL Inspection, pulled 2026-06-29)
| URL | Coverage | Last crawl |
|-----|----------|-----------|
| /resume-examples/software-engineer | Crawled - not indexed | 2026-06-28 |
| /resume-examples/accountant | Crawled - not indexed | 2026-06-28 |
| /resume-examples/teacher | Crawled - not indexed | 2026-06-28 |
| /resume-examples/project-manager | Crawled - not indexed | 2026-06-28 |
| /resume-examples (list) | Crawled - not indexed | 2026-06-06 |
| /blog/europass-cv-format-guide | Crawled - not indexed | 2026-04-21 |
| /blog/what-is-ats-guide | Crawled - not indexed | 2026-06-13 |
| /blog | Crawled - not indexed | 2026-06-28 |
| /resume-examples/registered-nurse | Excluded by 'noindex' (canonical is /nurse) | 2026-03-16 |
| /resume-examples/data-analyst | Page with redirect | 2026-03-17 |
- **Whole site currently sits at "Crawled - not indexed"** — blog AND resume-examples. 4 flagships recrawled Jun 28 (Request Indexing working) → awaiting index decision on new content.

## Device / geo snapshot (90d, pulled 2026-06-28)
- **Device:** Desktop 8,785 impr (CTR 0.07%) / Mobile 1,285 (CTR 0.47%, ~7x better) / Tablet 8. Desktop-skew = research/template query mix.
- **Top countries:** USA 2,549 · Italy 1,551 *(noindexed now)* · Germany 1,430 · France 663 · Spain 334 · Switzerland 264.
- **Markets:** English-speaking 37.6% · German-speaking 22.4% · Italy 19.7% *(gone)* · French 9.5% · Spanish 5.7%.

## GSC Page Indexing report (2026-06-29) — THE KEY BASELINE to track recovery against
**17 indexed / 31.6K not indexed** (11 reasons). Chart shows ~25K indexed until ~Apr 29 2026, then cliff to ~17.
| Reason | Pages | Bucket |
|--------|-------|--------|
| Crawled - currently not indexed | 19,916 | recovery (quality/authority/time) |
| Excluded by 'noindex' tag | 7,326 | intended (12-locale consolidation) |
| Page with redirect | 2,149 | intended (/en→/ migration) |
| Duplicate, Google chose diff canonical | 1,337 | fixed PR#4 (word-builder noindex) + synonym map |
| (11th) noindex-locale URLs in sitemaps | ~1,100 | fixed PR#4+#5 (sitemap gating) |
| Alternate page w/ canonical | 363 | fixed PR#4 (hreflang leaks) |
| Duplicate without canonical | 336 | fixed earlier (308+self-canonical) |
| Not found (404) | 162 | fixed PR#4 (career/category root redirect) |
| Blocked by robots.txt | 18 | intended (auth pages) |
| Redirect error | 9 | www chains — left (Cloud Run mapping, don't touch) |
| Soft 404 | 2 | negligible |
- **Watch:** does "Indexed" climb above 17, and does "Crawled-not-indexed" fall, over the next 2–6 weeks as Google recrawls the fixed/de-templatized site.

## Sitemap counts (post-fix, 2026-06-29)
| Sitemap | Before | After fix | Note |
|---------|--------|-----------|------|
| sitemap-blog.xml | 1,371 | **507** | gated to indexable locales (PR#5) — dropped 864 noindex-locale URLs |
| sitemap-en.xml | — | 1,352 | includes the 3 new guides |
| sitemap-priority.xml | 50 | 50 | curated; submitted=50 indexed=0 |
- All sitemaps `indexed=0` in GSC — reflects the 17-indexed collapse, not a sitemap defect. Resubmitted index+blog 2026-06-29.

## What shipped (4 deploys, by 2026-06-29)
PR #1 (technical recovery + dedup) → PR #3 (hreflang Link-header + author redirects) → PR #4 (6 indexation bugs + canonical consolidation + 726 /en content links + europass/3-hub wiring + 3 new guides) → PR #5 (sitemap-blog gating). All live-verified.

## 2026-08-07 — Post-migration baseline (after sitemap fix + resubmission)
| sitemap | submitted | indexed | note |
|---|---|---|---|
| sitemap-en.xml | 1352 | 0 | full counts restored (was 51 runtime-poisoned) |
| sitemap-es.xml | 1308 | 0 | |
| sitemap-fr.xml | 1309 | 0 | |
| sitemap-blog.xml | 507 | 0 | was 5 runtime-poisoned |
| sitemap-priority.xml | 53 | 0 | |
| sitemap-ar/de | pending | - | submitted, not yet fetched |

Google downloaded 6/8 sitemaps within SECONDS of API resubmission — crawler
re-engaged immediately. indexed=0 across the board is the outage baseline;
watch for movement over 7-14 days. Homepage still "Server error (5xx)" state
in GSC (last crawl Jul 4) until recrawled.
