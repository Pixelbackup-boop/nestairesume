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

## Device / geo snapshot (90d, pulled 2026-06-28)
- **Device:** Desktop 8,785 impr (CTR 0.07%) / Mobile 1,285 (CTR 0.47%, ~7x better) / Tablet 8. Desktop-skew = research/template query mix.
- **Top countries:** USA 2,549 · Italy 1,551 *(noindexed now)* · Germany 1,430 · France 663 · Spain 334 · Switzerland 264.
- **Markets:** English-speaking 37.6% · German-speaking 22.4% · Italy 19.7% *(gone)* · French 9.5% · Spanish 5.7%.
