# Resume Examples [slug] — Page Layout Design

## File: `frontend/app/[locale]/resume-examples/[slug]/page.tsx`

---

## CURRENT LAYOUT (What exists now)

```
┌══════════════════════════════════════════════════════════════════════════┐
│  HEADER (fixed)                                               [Nav]    │
├══════════════════════════════════════════════════════════════════════════┤
│                                                                        │
│  bg-light-teal                                                         │
│  ┌────────────────────────────────────────────────────────────────┐     │
│  │  Home / Resume Examples / Software Engineer                   │     │
│  └────────────────────────────────────────────────────────────────┘     │
│                                                                        │
│  ┌─────────────────────────────────┐  ┌──────────────────────────┐     │
│  │  [Technology]                   │  │  ┌────────────────────┐  │     │
│  │                                 │  │  │  Quick Stats       │  │     │
│  │  Software Engineer Resume       │  │  │                    │  │     │
│  │  ═══════════════════════════    │  │  │  💰 Avg. Salary    │  │     │
│  │                                 │  │  │  $120,000          │  │     │
│  │  Learn how to write a winning   │  │  │                    │  │     │
│  │  software engineer resume...    │  │  │  📈 Job Growth     │  │     │
│  │                                 │  │  │  25%               │  │     │
│  │  👤 Alex Brown · Career Expert  │  │  │                    │  │     │
│  │  🔗 LinkedIn · 15 min read     │  │  │  🏢 Industry       │  │     │
│  │  Updated 1/25/2025              │  │  │  Technology        │  │     │
│  │                                 │  │  │                    │  │     │
│  │  (col-span-2)                   │  │  │ [Build My Resume]  │  │     │
│  └─────────────────────────────────┘  │  │  teal button       │  │     │
│                                       │  └────────────────────┘  │     │
│           GRID: lg:grid-cols-3        └──────────────────────────┘     │
│                                                                        │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  bg-white                                                              │
│  ┌─────────────────────────────────┐  ┌──────────────────────────┐     │
│  │                                 │  │                          │     │
│  │  Key Skills for Software Eng    │  │  Table of Contents       │     │
│  │  ┌──────┐ ┌──────┐ ┌──────┐    │  │  ─────────────────       │     │
│  │  │ Java │ │ React│ │ AWS  │    │  │  • Professional Summary  │     │
│  │  └──────┘ └──────┘ └──────┘    │  │  • Work Experience       │     │
│  │                                 │  │  • Skills Section        │     │
│  │  ═══════════════════════════    │  │  • Education             │     │
│  │  ## Professional Summary        │  │  (STICKY top-24)         │     │
│  │  Your professional summary...   │  │                          │     │
│  │                                 │  ├──────────────────────────┤     │
│  │  ## How to Write Work Exp...    │  │                          │     │
│  │  List your experience with...   │  │  Related Jobs            │     │
│  │                                 │  │  ─────────────────       │     │
│  │  ## Skills Section              │  │  → Data Engineer         │     │
│  │  Technical skills should...     │  │  → DevOps Engineer       │     │
│  │                                 │  │  → Backend Developer     │     │
│  │  ## Education                   │  │                          │     │
│  │  Include degree, school...      │  ├──────────────────────────┤     │
│  │                                 │  │                          │     │
│  │  ─────────────────              │  │  ██████████████████████  │     │
│  │  Related Topics                 │  │  █ Ready to create    █  │     │
│  │  [resume] [software] [tech]     │  │  █ your resume?       █  │     │
│  │                                 │  │  █                    █  │     │
│  │  (col-span-2)                   │  │  █ [Get Started Free] █  │     │
│  │                                 │  │  █████████████████████  │     │
│  └─────────────────────────────────┘  │  GREEN CTA (REMOVE)     │     │
│                                       └──────────────────────────┘     │
│           GRID: lg:grid-cols-3                                         │
│                                                                        │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  bg-teal-gradient                                                      │
│  ┌────────────────────────────────────────────────────────────────┐     │
│  │          Build Your Software Engineer Resume Now               │     │
│  │    Join thousands of professionals who landed their dream...   │     │
│  │                                                                │     │
│  │              ┌─────────────────────────────┐                   │     │
│  │              │ Create My Resume — Free  ⚡ │                   │     │
│  │              └─────────────────────────────┘                   │     │
│  │              (orange button, full-width CTA)                   │     │
│  └────────────────────────────────────────────────────────────────┘     │
│                                                                        │
├════════════════════════════════════════════════════════════════════════┤
│  FOOTER                                                                │
└════════════════════════════════════════════════════════════════════════┘
```

**Problems:**
- Quick Stats is in the header area — disappears when user scrolls down
- Green CTA box in sidebar — redundant (bottom CTA already exists)
- Header uses grid just for Quick Stats — wastes horizontal space

---

## NEW LAYOUT (Proposed)

```
┌══════════════════════════════════════════════════════════════════════════┐
│  HEADER (fixed)                                               [Nav]    │
├══════════════════════════════════════════════════════════════════════════┤
│                                                                        │
│  bg-light-teal                                                         │
│  ┌────────────────────────────────────────────────────────────────┐     │
│  │  Home / Resume Examples / Software Engineer                   │     │
│  └────────────────────────────────────────────────────────────────┘     │
│                                                                        │
│  ┌────────────────────────────────────────────────────────────────┐     │
│  │  [Technology]                                                  │     │
│  │                                                                │     │
│  │  Software Engineer Resume                                      │     │
│  │  ═════════════════════════════════════════════════════════     │     │
│  │                                                                │     │
│  │  Learn how to write a winning software engineer resume         │     │
│  │  with our expert guide, examples, and AI-powered builder...   │     │
│  │                                                                │     │
│  │  👤 Alex Brown · Career Expert · 🔗 LinkedIn · 15 min read   │     │
│  │  Updated 1/25/2025                                             │     │
│  │                                                                │     │
│  │  ★ FULL WIDTH — no grid, title has more breathing room ★      │     │
│  └────────────────────────────────────────────────────────────────┘     │
│                                                                        │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  bg-white                                                              │
│  ┌─────────────────────────────────┐  ┌──────────────────────────┐     │
│  │                                 │  │ ┏━━━━━━━━━━━━━━━━━━━━━┓  │     │
│  │  Key Skills for Software Eng    │  │ ┃                     ┃  │     │
│  │  ┌──────┐ ┌──────┐ ┌──────┐    │  │ ┃  Quick Stats        ┃  │     │
│  │  │ Java │ │ React│ │ AWS  │    │  │ ┃  ─────────────       ┃  │     │
│  │  └──────┘ └──────┘ └──────┘    │  │ ┃  💰 $120,000        ┃  │     │
│  │                                 │  │ ┃  📈 25% Growth      ┃  │     │
│  │  ═══════════════════════════    │  │ ┃  🏢 Technology      ┃  │     │
│  │  ## Professional Summary        │  │ ┃                     ┃  │     │
│  │  Your professional summary...   │  │ ┃ [Build My Resume]   ┃  │     │
│  │                                 │  │ ┃  teal CTA button    ┃  │     │
│  │  ## How to Write Work Exp...    │  │ ┗━━━━━━━━━━━━━━━━━━━━━┛  │     │
│  │  List your experience with...   │  │                          │     │
│  │                                 │  │ ┌──────────────────────┐ │     │
│  │  ## Skills Section              │  │ │ Table of Contents    │ │     │
│  │  Technical skills should...     │  │ │ ────────────────     │ │     │
│  │                                 │  │ │ • Professional Sum   │ │     │
│  │  ## Education                   │  │ │ • Work Experience    │ │     │
│  │  Include degree, school...      │  │ │ • Skills Section     │ │     │
│  │                                 │  │ │ • Education          │ │     │
│  │                                 │  │ └──────────────────────┘ │     │
│  │                                 │  │                          │     │
│  │                                 │  │  ━━━ STICKY top-24 ━━━  │     │
│  │                                 │  │  (both boxes stick      │     │
│  │                                 │  │   together as one unit) │     │
│  │                                 │  │                          │     │
│  │                                 │  ├──────────────────────────┤     │
│  │  ─────────────────              │  │                          │     │
│  │  Related Topics                 │  │  Related Jobs            │     │
│  │  [resume] [software] [tech]     │  │  ─────────────────       │     │
│  │                                 │  │  → Data Engineer         │     │
│  │  (col-span-2)                   │  │  → DevOps Engineer       │     │
│  │                                 │  │  → Backend Developer     │     │
│  └─────────────────────────────────┘  │  (scrolls normally)      │     │
│                                       └──────────────────────────┘     │
│           GRID: lg:grid-cols-3                                         │
│                                                                        │
│           GREEN CTA BOX REMOVED (redundant)                            │
│                                                                        │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  bg-teal-gradient                                                      │
│  ┌────────────────────────────────────────────────────────────────┐     │
│  │          Build Your Software Engineer Resume Now               │     │
│  │    Join thousands of professionals who landed their dream...   │     │
│  │                                                                │     │
│  │              ┌─────────────────────────────┐                   │     │
│  │              │ Create My Resume — Free  ⚡ │                   │     │
│  │              └─────────────────────────────┘                   │     │
│  │              (orange button — the ONLY bottom CTA)             │     │
│  └────────────────────────────────────────────────────────────────┘     │
│                                                                        │
├════════════════════════════════════════════════════════════════════════┤
│  FOOTER                                                                │
└════════════════════════════════════════════════════════════════════════┘
```

---

## MOBILE LAYOUT (< lg breakpoint)

```
┌════════════════════════════┐
│  HEADER [Nav]              │
├════════════════════════════┤
│                            │
│  Home / Resume Examples /  │
│  Software Engineer         │
│                            │
│  [Technology]              │
│                            │
│  Software Engineer         │
│  Resume                    │
│  ═══════════════════       │
│                            │
│  Learn how to write a      │
│  winning software...       │
│                            │
│  👤 Alex Brown             │
│  Career Expert             │
│  🔗 LinkedIn · 15 min     │
│                            │
│  (full width, no grid)     │
│                            │
├────────────────────────────┤
│                            │
│  Key Skills                │
│  ┌────┐ ┌─────┐ ┌────┐    │
│  │Java│ │React│ │AWS │    │
│  └────┘ └─────┘ └────┘    │
│                            │
│  ## Professional Summary   │
│  Your professional...      │
│                            │
│  ## Work Experience        │
│  List your experience...   │
│                            │
│  [full article content]    │
│                            │
├────────────────────────────┤
│  (sidebar stacks below)    │
│                            │
│  ┌────────────────────┐    │
│  │ Quick Stats        │    │
│  │ 💰 $120,000       │    │
│  │ 📈 25% Growth     │    │
│  │ 🏢 Technology     │    │
│  │ [Build My Resume]  │    │
│  └────────────────────┘    │
│                            │
│  ┌────────────────────┐    │
│  │ Table of Contents  │    │
│  │ (collapsed/hidden) │    │
│  └────────────────────┘    │
│                            │
│  ┌────────────────────┐    │
│  │ Related Jobs       │    │
│  │ → Data Engineer    │    │
│  │ → DevOps Engineer  │    │
│  └────────────────────┘    │
│                            │
├────────────────────────────┤
│  Build Your Resume Now     │
│  [Create My Resume ⚡]     │
│  (bottom CTA)              │
├════════════════════════════┤
│  FOOTER                    │
└════════════════════════════┘
```

---

## CHANGES SUMMARY

| # | What | Action |
|---|------|--------|
| 1 | Header section | Remove grid, make full-width |
| 2 | Quick Stats box | Move from header → sidebar (first item) |
| 3 | Sticky wrapper | Wrap Quick Stats + TOC in `sticky top-24` |
| 4 | Green CTA box | DELETE (redundant with bottom CTA) |
| 5 | Bottom CTA | Keep as-is (unchanged) |

## CTA Strategy (2 touchpoints)

| CTA | Position | Visibility |
|-----|----------|------------|
| "Build My Resume" (teal) | Sidebar Quick Stats | Always visible (sticky) |
| "Create My Resume — Free" (orange) | Bottom of page | Seen after reading article |
