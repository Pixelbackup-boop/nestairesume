# German SEO Content — Complete Creation Prompt

## Your Mission

Create **75 German content pages** for the AI Resume Builder website:
- **65 blog posts** at `frontend/content/blog/de/`
- **10 career-tips pages** at `frontend/content/career-tips/de/`

These are NOT translations of the English site — they are **original German-language content** optimized for German Google search queries using real keyword data from `seo/German keywords - filtered.csv` (451 keyword rows, 500K–500 monthly searches).

### What ALREADY exists for all locales (no German content needed):
- **554 resume example pages** (`content/resume-examples/`) — shared across all locales via i18n
- **566 cover letter example pages** (`content/cover-letter-examples/`) — shared across all locales via i18n
- **44 app route pages** (builder, pricing, templates, tools, etc.) — localized via i18n JSON files

**IMPORTANT**: Read `CLAUDE.md` in the project root FIRST. All content must follow the "Google SEO Content Writing Guidelines (2026)" section and the "Target Keyword Placement Checklist (MANDATORY)" rules exactly.

## German Job Market Context

Reference these throughout the content (NOT French/US equivalents):
- **Bundesagentur für Arbeit** (Federal Employment Agency) — Germany's main employment service
- **DIN 5008** — German standard for business document formatting (applies to Bewerbungsschreiben)
- **Tabellarischer Lebenslauf** — Tabular CV format, standard in Germany/Austria/Switzerland
- **DACH region** (Deutschland, Österreich, Schweiz) — German-speaking job market
- **Ausbildung** — Vocational training/apprenticeship system (unique to Germany)
- **Praktikum** — Internship (very common requirement before employment)
- **Minijob** — Part-time employment up to €520/month (German-specific concept)
- **Bewerbungsmappe** — Complete application folder (Deckblatt + Anschreiben + Lebenslauf + Zeugnisse)
- **Arbeitszeugnis** — Formal work reference (legally required in Germany)
- **Initiativbewerbung/Blindbewerbung** — Unsolicited/speculative application
- **Kurzbewerbung** — Short-form application (1–2 pages)
- **Deckblatt** — Application cover page with photo (unique to DACH region)
- **XING** — German professional networking platform (like LinkedIn but dominant in DACH)
- **StepStone, Indeed.de, Monster.de** — Major German job boards
- **AGG (Allgemeines Gleichbehandlungsgesetz)** — Anti-discrimination law affecting CV photos
- **Probezeit** — Probation period (typically 6 months)
- **Gehaltsvorstellung** — Salary expectation (required in many German job listings)

## Author

```yaml
author: Thomas Weber
authorBio: >-
  Karriereberater und Bewerbungsexperte mit über 12 Jahren Erfahrung in der
  Personalberatung im DACH-Raum. Spezialisiert auf Lebenslauf-Optimierung
  und Bewerbungsstrategien für den deutschen Arbeitsmarkt.
```

## Categories (German)

- Lebenslauf Vorlagen (CV templates)
- Bewerbung Schreiben (Application writing)
- Anschreiben Vorlagen (Cover letter templates)
- Vorstellungsgespräch (Job interview)
- Karriere und Beruf (Career & job)
- KI und Tools (AI & tools)

## Frontmatter Template

```yaml
---
title: '[German title ≤60 chars, includes 2026, contains all words from tags[0]]'
slug: [german-slug-no-umlauts-use-ae-oe-ue-ss]
description: >-
  [150-160 chars, contains all words from tags[0]]
date: '2026-02-21'
author: Thomas Weber
authorBio: >-
  Karriereberater und Bewerbungsexperte mit über 12 Jahren Erfahrung in der
  Personalberatung im DACH-Raum. Spezialisiert auf Lebenslauf-Optimierung
  und Bewerbungsstrategien für den deutschen Arbeitsmarkt.
category: [German category from list above]
tags:
  - [primary keyword = tags[0]]
  - [6-7 more German SEO keywords from CSV]
image: /blog/de-placeholder.jpg
imageAlt: [descriptive alt with keyword in German]
featured: false
faq:
  - question: [5-7 FAQs in German]
    answer: >-
      [Detailed answer]
---
```

## Content Rules (from CLAUDE.md — MANDATORY)

1. **1,500–2,500 words** per post
2. **tags[0] words MUST appear in**: title, description, H1 (first `##`), first 150 words, H2 variations, imageAlt
3. **Keyword density**: 0.8–1.2%
4. **H2 every ~300 words** using keyword VARIATIONS (not exact repeats)
5. **2–4 sentences per paragraph** (40–70 words)
6. **5–7 FAQ questions** per post in frontmatter
7. **1–3 internal links per section** with descriptive German anchor text
8. **End each post** with "Weiterführende Artikel:" section (3–4 related German post links)
9. **VERIFICATION**: every word in tags[0] appears in BOTH title AND description
10. **Title ≤60 characters** — front-load the keyword
11. **Description 150–160 characters** — compelling, keyword-rich
12. **6–8 tags per page** — mix of primary keyword, long-tail variations, and related terms
13. **Named author** (Thomas Weber) with authorBio — E-E-A-T requirement
14. **YAML safety**: Double apostrophes inside single-quoted strings (e.g., `'Wir''ve'`)

## Slug Rules

- NO umlauts: ä→ae, ö→oe, ü→ue, ß→ss
- Hyphens to separate words
- Remove filler words (der, die, das, und, für, ein, eine, etc.)
- Lowercase only
- No year numbers in slugs

---

## POST LIST — 65 Posts in 3 Tiers

### TIER 1 — Mega/High Keywords (500K–50K) — 9 posts
These target the highest-volume German keywords. Create these FIRST.

| # | Slug | Primary Keyword (tags[0]) | Volume | CSV Keywords Absorbed | English Source |
|---|---|---|---|---|---|
| 1 | `lebenslauf-vorlagen-kostenlos` | vorlagen für lebensläufe | 500K | "vorlagen lebensläufe" (50K), "kostenlos lebenslauf vorlage" (50K), "lebenslauf gratis vorlagen" (5K), "lebenslauf gratis" (5K) | NEW (no English equivalent) |
| 2 | `bewerbungsschreiben-vorlage-muster` | bewerbungsschreiben vorlage | 500K root + 50K | "bewerbungsschreiben vorlagen" (50K), "bewerbungsanschreiben vorlage" (50K), "vorlage bewerbungsschreiben" (5K), "bewerbungsschreiben vorlage kostenlos" (5K) | how-to-write-cover-letter |
| 3 | `lebenslauf-vorlage-word-kostenlos` | lebenslauf vorlagen word | 50K | "lebenslauf vorlage kostenlos word" (5K), "lebenslauf in word" (5K), "download lebenslauf word" (500) | resume-builder-word-template |
| 4 | `bewerbung-vorlage-word-kostenlos` | bewerbung vorlage | 50K | "bewerbung vorlage word" (5K), "vorlage bewerbung word" (5K), "word vorlage bewerbung" (5K), "bewerbung vorlage kostenlos" (5K), "bewerbung word vorlage" (5K) | NEW |
| 5 | `lebenslauf-beispiele-professionell` | lebensläufe beispiele | 50K | "beispiel cv" (5K), "beispiel lebenslauf bewerbung" (500), "muster cv" (500) | NEW |
| 6 | `deckblatt-bewerbung-vorlage-gestalten` | deckblatt bewerbung | 50K | "deckblatt bei bewerbung" (50K), "deckblatt für bewerbungen" (50K), "deckblatt bewerbung vorlage" (5K), "bewerbungsvorlage deckblatt" (5K), "deckblatt bewerbung design" (500) | NEW (Germany-specific concept) |
| 7 | `anschreiben-bewerbung-muster-vorlage` | anschreiben bewerbung muster | 50K | "bewerbung anschreiben muster" (50K), "muster anschreiben bewerbung" (50K), "anschreiben für bewerbung muster" (50K), "anschreiben bewerbung vorlage" (5K) | how-to-write-cover-letter |
| 8 | `lebenslauf-schueler-vorlage-kostenlos` | vorlage lebenslauf schüler | 50K | "lebenslauf schüler vorlage kostenlos" (500) | how-to-write-student-resume |
| 9 | `anschreiben-vorlage-word-muster` | anschreiben vorlagen | 50K | "vorlage anschreiben" (50K), "vorlage für anschreiben" (50K), "anschreiben vorlage word" (5K) | NEW |

### TIER 2 — Medium Keywords (5K) — 36 posts

#### Lebenslauf/CV Posts (12 posts)

| # | Slug | Primary Keyword (tags[0]) | Volume | CSV Keywords Absorbed | English Source |
|---|---|---|---|---|---|
| 10 | `curriculum-vitae-vorlage-deutsch` | curriculum vitae vorlage | 5K | "muster cv" (500), "modell lebenslauf" (500) | resume-vs-cv-difference |
| 11 | `moderne-lebenslauf-vorlage-2026` | moderne lebenslauf vorlage | 5K | "lebenslauf aktuell" (5K), "lebenslauf klassisch vorlage" (500) | NEW |
| 12 | `lebenslauf-gestalten-tipps` | lebenslauf gestalten | 5K | "lebenslauf professionell erstellen" (500) | NEW |
| 13 | `lebenslauf-kostenlos-erstellen-gratis` | lebenslauf kostenlos | 5K | "lebenslauf gratis" (5K), "lebenslauf schreiben kostenlos" (5K), "cv erstellen kostenlos" (500), "lebenslauf erstellen kostenlos pdf" (500) | NEW |
| 14 | `lebenslauf-generator-online-erstellen` | lebenslauf generator | 5K | "online lebenslauf erstellen" (5K), "lebenslauf editor" (500), "lebenslauf generator kostenlos" (500) | NEW |
| 15 | `ki-lebenslauf-erstellen-generator` | ki lebenslauf | 5K | "lebenslauf erstellen ki" (5K), "ki für lebenslauf" (500), "lebenslauf vorlage ki" (500) | best-ai-resume-maker-tools |
| 16 | `cv-englisch-vorlage-tipps` | cv englisch vorlage | 5K | "cv auf englisch vorlage" (5K), "lebenslauf englisch vorlage kostenlos" (500) | NEW |
| 17 | `tabellarischer-lebenslauf-vorlage` | vorlage lebenslauf tabellarisch | 5K | "tabellarischer lebenslauf erstellen" (500), "vordruck tabellarischer lebenslauf" (500) | chronological-resume-format |
| 18 | `lebenslauf-vorlage-ausfuellen` | lebenslauf vorlage ausfüllen | 5K | "vorlage lebenslauf zum ausfüllen" (5K), "lebenslauf vordrucke zum ausfüllen" (500) | NEW |
| 19 | `lebenslauf-formular-vordruck` | lebenslauf formular | 5K | "vordruck lebenslauf" (5K), "vordruck lebenslauf word" (500) | NEW |
| 20 | `lebenslauf-ausbildung-vorlage` | lebenslauf für ausbildung vorlage | 5K | | NEW (Germany-specific: Ausbildung) |
| 21 | `lebenslauf-praktikum-vorlage` | lebenslauf vorlage für praktikum | 5K | | NEW (Germany-specific: Praktikum) |

#### Bewerbung/Application Posts (10 posts)

| # | Slug | Primary Keyword (tags[0]) | Volume | CSV Keywords Absorbed | English Source |
|---|---|---|---|---|---|
| 22 | `bewerbungsunterlagen-vorlage-komplett` | bewerbungsunterlagen vorlage | 5K | "vorlage bewerbungsunterlagen" (5K), "bewerbungsunterlagen vorlage kostenlos" (500), "bewerbungsunterlagen muster" (500) | NEW (Germany-specific: complete Bewerbungsmappe) |
| 23 | `bewerbungsvorlage-word-kostenlos` | bewerbungsvorlage word | 5K | "bewerbungsvorlagen für word" (5K), "bewerbung word" (5K), "bewerbungsvorlagen" (5K), "bewerbungsvorlagen kostenlos" (5K) | resume-builder-word-template |
| 24 | `bewerbung-erstellen-online-kostenlos` | bewerbung erstellen | 5K | "bewerbung online erstellen" (500), "bewerbung erstellen kostenlos" (500), "kostenlos bewerbung erstellen" (500) | NEW |
| 25 | `richtig-bewerbung-schreiben-anleitung` | richtig bewerbung schreiben | 5K | "richtiges anschreiben bewerbung" (5K) | how-to-write-a-resume |
| 26 | `komplette-bewerbung-vorlage-word` | komplette bewerbung vorlage word | 5K | "bewerbung vorlage word kostenlos" (5K), "bewerbung design vorlage word kostenlos" (500) | NEW |
| 27 | `bewerbung-vorlage-pdf-kostenlos` | bewerbung vorlage pdf kostenlos | 5K | "bewerbung muster pdf" (5K), "muster bewerbung pdf" (5K) | NEW |
| 28 | `muster-bewerbung-beispiele-2026` | muster bewerbung | 5K | "bewerbung beispiel" (5K), "beispiel bewerbung" (5K), "beispiel für bewerbung" (5K), "bewerbung muster vorlage" (500) | NEW |
| 29 | `bewerbung-ausbildung-vorlage-muster` | bewerbung ausbildung vorlage | 5K | "vorlage bewerbung ausbildung" (5K), "ausbildung bewerbung vorlage" (5K), "bewerbung für ausbildung vorlage" (5K), "bewerbungsvorlagen ausbildung" (500) | simple-resume-format-freshers |
| 30 | `bewerbung-praktikum-vorlage-muster` | bewerbung praktikum vorlage | 5K | many variants (5K each), "bewerbung praktikum schreiben" (5K), "bewerbung als praktikant vorlage" (5K) | NEW |
| 31 | `bewerbung-minijob-vorlage` | bewerbung minijob vorlage | 5K | "minijob bewerbung vorlage" (5K), "vorlage bewerbung minijob" (5K) | NEW (Germany-specific: Minijob) |

#### Anschreiben/Cover Letter Posts (8 posts)

| # | Slug | Primary Keyword (tags[0]) | Volume | CSV Keywords Absorbed | English Source |
|---|---|---|---|---|---|
| 32 | `moderne-bewerbungsschreiben-2026` | moderne bewerbungsschreiben | 5K | "modernes anschreiben" (500), "moderne bewerbung vorlage" (500), "moderne bewerbung anschreiben" (500) | NEW |
| 33 | `bewerbungsschreiben-aufbau-struktur` | bewerbungsschreiben aufbau | 5K | "anschreiben bewerbung aufbau" (5K), "aufbau bewerbungsanschreiben" (5K), "anschreiben aufbau" (5K) | how-to-write-cover-letter |
| 34 | `anschreiben-bewerbung-beispiele` | anschreiben bewerbung beispiele | 5K | "beispiel anschreiben bewerbung" (5K), "bewerbung anschreiben beispiel" (5K), many variants, "beispiele bewerbungsschreiben" (5K), "bewerbungsschreiben muster" (5K) | NEW |
| 35 | `blindbewerbung-muster-vorlage` | blindbewerbung muster | 5K | | NEW (Germany-specific) |
| 36 | `kurzbewerbung-vorlage-muster` | kurzbewerbung vorlage | 5K | "vorlage kurzbewerbung" (5K) | NEW (Germany-specific) |
| 37 | `initiativbewerbung-vorlage-muster` | initiativbewerbung vorlage | 5K | "vorlage initiativbewerbung" (5K), "initiativbewerbung muster" (5K), "initiativbewerbung muster pdf" (5K), "anschreiben bei initiativbewerbung" (5K) | NEW (Germany-specific) |
| 38 | `interne-bewerbung-muster-tipps` | interne bewerbung muster | 5K | "bewerbung intern muster" (5K), "muster interne bewerbung" (5K) | NEW (Germany-specific) |
| 39 | `anschreiben-bewerbung-englisch` | anschreiben bewerbung englisch | 5K | "bewerbung englisch anschreiben" (5K), "englische bewerbung schreiben" (5K), "bewerbungsschreiben auf englisch" (5K) | NEW |

#### Deckblatt & Format Posts (6 posts)

| # | Slug | Primary Keyword (tags[0]) | Volume | CSV Keywords Absorbed | English Source |
|---|---|---|---|---|---|
| 40 | `bewerbungsschreiben-vorlage-word` | bewerbungsschreiben vorlage word | 5K | "vorlage bewerbungsschreiben word" (5K), "bewerbungsschreiben word vorlage" (5K), "anschreiben bewerbung vorlage word" (5K) | resume-builder-word-template |
| 41 | `bewerbungsschreiben-vorlage-pdf` | bewerbungsschreiben vorlage pdf | 5K | "bewerbungsschreiben pdf vorlage" (5K), "vorlage bewerbungsschreiben pdf" (5K), "anschreiben pdf" (5K) | NEW |
| 42 | `bewerbungsschreiben-praktikum-vorlage` | bewerbungsschreiben praktikum vorlage | 5K | many variants (5K each), "bewerbungsschreiben für praktikum" (5K) | NEW |
| 43 | `anschreiben-praktikum-vorlage` | anschreiben praktikum vorlage | 5K | many variants (5K each), "anschreiben für praktikum" (5K) | NEW |
| 44 | `einfache-bewerbung-vorlage` | einfache bewerbung vorlage | 5K | "bewerbung lehrstelle vorlage" (500), "bewerbung lehrstelle muster kostenlos" (500) | simple-resume-format-freshers |
| 45 | `anschreiben-beispiel-muster` | anschreiben beispiel | 5K | "anschreiben muster" (5K), "kurzes anschreiben muster" (5K) | NEW |

### TIER 3 — Career, Interview & Tools (from English) — 20 posts

#### How-To & Guide Posts (10 posts)

| # | Slug | Primary Keyword (tags[0]) | English Source |
|---|---|---|---|
| 46 | `wie-schreibt-man-einen-lebenslauf` | lebenslauf schreiben anleitung | how-to-write-a-resume |
| 47 | `professionelles-profil-lebenslauf` | professionelles profil lebenslauf | how-to-write-professional-summary |
| 48 | `fehler-im-lebenslauf-vermeiden` | fehler lebenslauf vermeiden | top-resume-mistakes-to-avoid |
| 49 | `lebenslauf-ats-optimieren` | lebenslauf ats optimieren | how-to-write-ats-friendly-resume |
| 50 | `was-ist-ats-bewerbung` | was ist ats bewerbung | what-is-ats-guide |
| 51 | `kompetenzen-im-lebenslauf` | kompetenzen lebenslauf richtig angeben | how-to-list-skills-on-resume |
| 52 | `aktionsverben-lebenslauf-liste` | aktionsverben lebenslauf | resume-action-verbs |
| 53 | `schluesselwoerter-lebenslauf-branche` | schlüsselwörter lebenslauf branche | resume-keywords-by-industry |
| 54 | `lebenslauf-luecken-erklaeren` | lebenslauf lücken erklären | resume-gap-explanation-examples |
| 55 | `lebenslauf-laenge-seiten` | lebenslauf länge seiten | resume-length-guide |

#### Interview & Career Posts (5 posts)

| # | Slug | Primary Keyword (tags[0]) | English Source |
|---|---|---|---|
| 56 | `vorstellungsgespraech-vorbereitung-guide` | vorstellungsgespräch vorbereitung | interview-preparation-guide |
| 57 | `star-methode-vorstellungsgespraech` | star methode vorstellungsgespräch | star-method-interview-questions |
| 58 | `erzaehlen-sie-von-sich-antwort` | erzählen sie von sich antwort | tell-me-about-yourself-answer |
| 59 | `schwaechen-vorstellungsgespraech-antworten` | schwächen vorstellungsgespräch | weakness-interview-question |
| 60 | `gehaltsverhandlung-tipps-strategien` | gehaltsverhandlung tipps | salary-negotiation-tips |

#### Tools & AI Posts (5 posts)

| # | Slug | Primary Keyword (tags[0]) | English Source |
|---|---|---|---|
| 61 | `canva-lebenslauf-erstellen-guide` | canva lebenslauf erstellen | canva-ai-resume-builder-guide |
| 62 | `lebenslauf-google-docs-erstellen` | lebenslauf google docs | resume-maker-google-docs |
| 63 | `chatgpt-vs-claude-lebenslauf` | chatgpt vs claude lebenslauf | chatgpt-vs-claude-for-resumes |
| 64 | `ki-prompts-lebenslauf-schreiben` | ki prompts lebenslauf schreiben | ai-prompts-resume-writing |
| 65 | `beste-lebenslauf-apps-2026` | beste lebenslauf apps 2026 | best-resume-builder-apps |

---

## SKIP LIST — Do NOT Create These

| Keyword | Volume | Reason |
|---|---|---|
| bewerbungsschreiben to go | 50K | Brand name / service — not a content topic |
| bewerbung für lidl | 5K | Single-company application — too niche/brand |
| lebenslauf vorlage kaufen | 500 | "Buy resume template" — conflicts with our free offering |
| japanese-resume-maker | — | Japan-specific, irrelevant for German market |
| biodata-format-examples | — | South Asian format, unused in DACH |
| resume-paper-printing-tips | — | US-centric, irrelevant for German market |

---

## German-Only Posts Summary (26 posts — no English equivalent)

These posts target uniquely German concepts with no English blog counterpart:

1. `lebenslauf-vorlagen-kostenlos` — Pillar for "vorlagen für lebensläufe" (500K)
2. `bewerbung-vorlage-word-kostenlos` — "bewerbung vorlage" (50K)
3. `lebenslauf-beispiele-professionell` — "lebensläufe beispiele" (50K)
4. `deckblatt-bewerbung-vorlage-gestalten` — Deckblatt concept (50K, Germany-specific)
5. `anschreiben-vorlage-word-muster` — "anschreiben vorlagen" (50K)
6. `moderne-lebenslauf-vorlage-2026` — modern CV template
7. `lebenslauf-gestalten-tipps` — CV design tips
8. `lebenslauf-kostenlos-erstellen-gratis` — free CV creation
9. `lebenslauf-generator-online-erstellen` — online CV generator
10. `lebenslauf-vorlage-ausfuellen` — fillable CV template
11. `lebenslauf-formular-vordruck` — CV form/printable
12. `lebenslauf-ausbildung-vorlage` — CV for Ausbildung
13. `lebenslauf-praktikum-vorlage` — CV for Praktikum
14. `bewerbungsunterlagen-vorlage-komplett` — complete Bewerbungsmappe
15. `bewerbung-erstellen-online-kostenlos` — create application online
16. `komplette-bewerbung-vorlage-word` — complete application in Word
17. `bewerbung-vorlage-pdf-kostenlos` — application PDF template
18. `muster-bewerbung-beispiele-2026` — application examples
19. `bewerbung-praktikum-vorlage-muster` — Praktikum application
20. `bewerbung-minijob-vorlage` — Minijob application
21. `moderne-bewerbungsschreiben-2026` — modern cover letters
22. `anschreiben-bewerbung-beispiele` — cover letter examples
23. `blindbewerbung-muster-vorlage` — Blindbewerbung (unsolicited application)
24. `kurzbewerbung-vorlage-muster` — Kurzbewerbung (short application)
25. `initiativbewerbung-vorlage-muster` — Initiativbewerbung (speculative application)
26. `interne-bewerbung-muster-tipps` — internal job application

---

## Execution Instructions

### Step 1: Create directory
```bash
mkdir -p frontend/content/blog/de
```

### Step 2: Create posts in parallel batches

Use parallel agents (3–4 at a time) to create posts. Each agent creates 5–8 posts.

**Batch 1** (Tier 1 — highest priority):
- Agent A: Posts 1–5
- Agent B: Posts 6–9

**Batch 2** (Tier 2 — Lebenslauf + Bewerbung):
- Agent C: Posts 10–16
- Agent D: Posts 17–21
- Agent E: Posts 22–28
- Agent F: Posts 29–35

**Batch 3** (Tier 2 — Anschreiben + Format):
- Agent G: Posts 36–39
- Agent H: Posts 40–45

**Batch 4** (Tier 3 — Career, Interview, Tools):
- Agent I: Posts 46–52
- Agent J: Posts 53–58
- Agent K: Posts 59–65

### Step 3: Create career-tips directory and pages
```bash
mkdir -p frontend/content/career-tips/de
```
- Agent L: Career tips C1–C5
- Agent M: Career tips C6–C10

### Step 4: Verification
1. Run `npm run build` in `frontend/` — must pass cleanly
2. Spot-check 5 blog posts + 2 career-tips for keyword compliance:
   - Every word of tags[0] appears in BOTH title AND description
   - tags[0] appears in H1 (first `##`), first 150 words, and imageAlt
   - Title ≤60 chars, description 150–160 chars
   - 6–8 tags, 5–7 FAQs, named author
3. Commit:
```bash
git add frontend/content/blog/de/ frontend/content/career-tips/de/
git commit -m "content: add 75 German SEO pages (65 blog posts + 10 career tips)"
```

### Step 5: Gap analysis (optional Phase 2)
Cross-reference all 451 CSV keyword rows against created posts' tags to identify any remaining uncovered clusters worth a dedicated post.

---

## Internal Linking Strategy

Posts should cross-link using "Weiterführende Artikel:" sections at the end. Key hub posts:

- `wie-schreibt-man-einen-lebenslauf` (pillar) → links to all Lebenslauf-creation posts
- `lebenslauf-vorlagen-kostenlos` → links to Word, PDF, modern, tabellarisch templates
- `bewerbungsschreiben-vorlage-muster` (pillar) → links to all Anschreiben posts
- `deckblatt-bewerbung-vorlage-gestalten` → links to Bewerbungsmappe, design posts
- `ki-lebenslauf-erstellen-generator` → links to AI tools, Canva, Google Docs

Internal links should also reference:
- `/de/builder` — "Erstellen Sie jetzt Ihren Lebenslauf" (builder CTA)
- `/de/templates` — "Professionelle Lebenslauf-Vorlagen ansehen"
- Other German blog posts using descriptive anchor text

---

## Quality Checklist (per post)

- [ ] tags[0] words in title? ✅
- [ ] tags[0] words in description? ✅
- [ ] Title ≤60 chars? ✅
- [ ] Description 150–160 chars? ✅
- [ ] H1 (first `##`) includes keyword variation? ✅
- [ ] Keyword in first 150 words? ✅
- [ ] 6–8 tags? ✅
- [ ] 5–7 FAQs? ✅
- [ ] Named author (Thomas Weber)? ✅
- [ ] imageAlt includes keyword? ✅
- [ ] 1,500–2,500 words? ✅
- [ ] "Weiterführende Artikel:" section? ✅
- [ ] H2 every ~300 words (keyword variations)? ✅
- [ ] 1–3 internal links per section? ✅
- [ ] German job market references (Bundesagentur, DIN 5008, etc.)? ✅
- [ ] No unescaped apostrophes in YAML single-quoted strings? ✅

---

## CAREER-TIPS PAGES (10 pages at `frontend/content/career-tips/de/`)

These are longer, in-depth career guide pages. Same frontmatter structure and SEO rules as blog posts, but with `postType: career` and category: Karriere und Beruf. Use German keywords and German job market context.

### English Source → German Equivalent

| # | English Source Slug | German Slug | German tags[0] | Description |
|---|---|---|---|---|
| C1 | `career-development-plan` | `karriereentwicklungsplan-vorlage` | karriereentwicklungsplan vorlage | Career development plan template and guide |
| C2 | `career-guidance` | `karriereberatung-guide` | karriereberatung tipps | Career guidance and coaching guide |
| C3 | `how-to-write-ats-friendly-resume` | `ats-optimierter-lebenslauf` | ats optimierter lebenslauf | How to write an ATS-friendly resume |
| C4 | `how-to-write-cover-letter` | `bewerbungsschreiben-richtig-schreiben` | bewerbungsschreiben richtig schreiben | Complete cover letter writing guide |
| C5 | `interview-preparation-guide` | `vorstellungsgespraech-vorbereitung-guide` | vorstellungsgespräch vorbereitung guide | Interview preparation guide |
| C6 | `resume-bullet-points-ai` | `lebenslauf-stichpunkte-ki` | lebenslauf stichpunkte ki | Using AI for resume bullet points |
| C7 | `ai-resume-tools` | `ki-lebenslauf-tools-vergleich` | ki lebenslauf tools | AI resume tools comparison |
| C8 | `ai-engineer-resume` | `ki-ingenieur-lebenslauf` | ki ingenieur lebenslauf | AI engineer resume guide |
| C9 | `ai-ml-engineer-resume` | `machine-learning-ingenieur-lebenslauf` | machine learning ingenieur lebenslauf | ML engineer resume guide |
| C10 | `ai-product-manager-resume` | `ki-produktmanager-lebenslauf` | ki produktmanager lebenslauf | AI product manager resume guide |

### Career-Tips Frontmatter Template

```yaml
---
title: '[German title ≤60 chars, contains all words from tags[0]]'
slug: [german-slug-no-umlauts]
description: >-
  [150-160 chars, contains all words from tags[0]]
date: '2026-02-21'
author: Thomas Weber
authorBio: >-
  Karriereberater und Bewerbungsexperte mit über 12 Jahren Erfahrung in der
  Personalberatung im DACH-Raum. Spezialisiert auf Lebenslauf-Optimierung
  und Bewerbungsstrategien für den deutschen Arbeitsmarkt.
category: Karriere und Beruf
tags:
  - [primary keyword = tags[0]]
  - [6-7 more German SEO keywords]
image: /blog/[matching-english-image-path].svg
imageAlt: [descriptive alt with keyword in German]
featured: false
postType: career
faq:
  - question: [5-7 FAQs in German]
    answer: >-
      [Detailed answer]
---
```

### Career-Tips Content Rules

- **2,000–3,000 words** (these are in-depth guides, longer than blog posts)
- Same SEO keyword placement rules as blog posts
- Read the English source first, then write original German content — NOT a translation
- Reference German equivalents: Bundesagentur für Arbeit (not BLS), StepStone/Indeed.de (not Indeed.com), XING (not just LinkedIn)
- For AI/tech career pages (C7–C10), reference German tech hubs: Berlin, München, Hamburg, Frankfurt
- Include German salary context: Bruttojahresgehalt (gross annual salary), Tarifvertrag (collective agreement), 13. Monatsgehalt

### Career-Tips Execution

Create all 10 career-tips pages as a **separate batch** after blog posts are done:
- Agent L: Career tips C1–C5
- Agent M: Career tips C6–C10

Directory: `frontend/content/career-tips/de/`

---

## UPDATED EXECUTION PLAN (75 total pages)

### Phase 1: Blog Posts (65 pages)
```bash
mkdir -p frontend/content/blog/de
```
Create in 4 batches using parallel agents (as described above in Execution Instructions).

### Phase 2: Career Tips (10 pages)
```bash
mkdir -p frontend/content/career-tips/de
```
Create in 1 batch using 2 parallel agents.

### Phase 3: Verification
1. `npm run build` in frontend/ — must pass
2. Spot-check 5 blog posts + 2 career-tips for keyword compliance
3. Commit all:
```bash
git add frontend/content/blog/de/ frontend/content/career-tips/de/
git commit -m "content: add 75 German SEO pages (65 blog posts + 10 career tips)"
```

### Phase 4: Optional Gap Analysis
Cross-reference all 451 CSV keyword rows against created content to find any remaining high-value uncovered clusters.

---

## TOTAL GERMAN CONTENT SUMMARY

| Content Type | Count | Location |
|---|---|---|
| Blog posts (keyword-optimized) | 65 | `frontend/content/blog/de/` |
| Career tips (in-depth guides) | 10 | `frontend/content/career-tips/de/` |
| Resume examples (shared) | 554 | `frontend/content/resume-examples/` (already localized via i18n) |
| Cover letter examples (shared) | 566 | `frontend/content/cover-letter-examples/` (already localized via i18n) |
| App pages (shared) | ~44 | `frontend/app/[locale]/` (already localized via i18n JSON) |
| **Total new German pages** | **75** | |
