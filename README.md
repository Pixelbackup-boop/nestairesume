# 📄 AI Resume Builder

> Generate ATS-friendly, tailored resumes that get you past recruiters and land interviews

---

## 📋 Overview

**Problem:** Job seekers waste days creating resumes:
- 75% of resumes are rejected by ATS (Applicant Tracking Systems) before human review
- Tailoring resumes for each job is time-consuming
- Hard to quantify achievements effectively
- Don't know which keywords to include
- Resume formatting breaks in ATS systems

**Solution:** AI Resume Builder that creates:
- ATS-optimized resumes that pass automated screenings
- Tailored versions for each job description
- Quantified bullet points with impact metrics
- Keyword-optimized for target roles
- Professional templates (PDF/DOCX)
- Cover letters automatically generated

**Target Users:**
- Job seekers (entry-level to executive)
- Career changers
- Recent graduates
- Professionals updating resumes
- Career coaches
- Recruitment agencies

---

## 💰 Market Opportunity

**Market Size:**
- 250 million job applications per month (US alone)
- Resume writing services: $50-500 per resume
- Our tool: $9-29 per resume (20x cheaper)
- Recruiters say 63% of resumes have formatting issues

**Why This Will Sell:**
1. **Clear outcome** - Better resume = more interviews
2. **Pain point** - Everyone hates writing resumes
3. **Proven demand** - Resume services are a $1B industry
4. **Quick wins** - Users see results immediately
5. **Recurring need** - Job seekers apply to 10-50 jobs

---

## ✨ Core Features

### Phase 1 (MVP - 2 weeks)

**1. Experience Input**
- Job title, company, dates
- Responsibilities & achievements
- Skills & certifications
- Education
- Paste or upload existing resume

**2. AI Resume Generation**
- Professional summary (3-4 sentences)
- Quantified bullet points
- Achievement-focused (not duty-focused)
- Action verbs
- Impact metrics

**3. Job Description Matching**
- Paste target JD
- Extract key requirements
- Match skills & keywords
- Highlight gaps
- Tailor resume content

**4. ATS Optimization**
- ATS-safe formatting
- Keyword density checker
- Proper section headings
- No tables/columns/graphics
- Clean fonts

**5. Templates & Export**
- 10 professional templates
- PDF export (ATS-compatible)
- DOCX export (editable)
- Plain text version

### Phase 2 (Growth - 4 weeks)

**6. Cover Letter Generator**
- Auto-generated from resume + JD
- Personalized to company
- Professional tone
- 3-paragraph structure

**7. Multiple Versions**
- Save unlimited resume versions
- Different roles/industries
- Version comparison
- "Master resume" concept

**8. LinkedIn Profile Optimizer**
- Generate LinkedIn headline
- About section
- Experience descriptions
- Skills recommendations

**9. Interview Prep**
- Predict likely interview questions
- Based on your resume
- STAR method answers

**10. Success Tracking**
- Track which resume got interviews
- A/B test versions
- Analytics on what works

### Phase 3 (Scale - 8 weeks)

**11. Chrome Extension**
- Auto-fill job applications
- One-click LinkedIn applications
- Save job postings

**12. Portfolio Integration**
- Link to projects/GitHub
- QR codes for portfolios
- Visual elements (for creatives)

**13. Team Features (for coaches)**
- Client management
- Feedback & collaboration
- White label

---

## 🎨 CV Template System (20+ Templates)

### Template Architecture

The app uses a **Layout × Theme** multiplication strategy to create 20+ unique, professional templates:

```
┌─────────────────────────────────────────────────────────────────────┐
│                        5 BASE LAYOUTS                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  │
│  │ ═══════ │  │██│      │  │█████████│  │         │  │  ┌───┐  │  │
│  │         │  │██│      │  │█████████│  │ ─────── │  │  │ ● │  │  │
│  │ • • • • │  │██│ • •  │  │         │  │         │  │  └───┘  │  │
│  │ • • • • │  │██│ • •  │  │ • • • • │  │ • • • • │  │ • • • • │  │
│  │ • • • • │  │██│ • •  │  │ • • • • │  │ • • • • │  │ • • • • │  │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘  └─────────┘  │
│   CLASSIC      SIDEBAR      HEADER      MINIMAL      CREATIVE      │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
                                  ×
┌─────────────────────────────────────────────────────────────────────┐
│                        4 COLOR THEMES                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   🔵 Professional    🌿 Modern Teal    ⚫ Elegant Dark   🟣 Creative│
│      Navy Blue          #0D9488          #1F2937          #7C3AED  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
                                  =
                    📄 20 Unique Template Combinations!
```

### Template Categories

| Category | Templates | Best For |
|----------|-----------|----------|
| **Classic** | Executive, Traditional, Academic, Corporate | Senior roles, traditional industries |
| **Sidebar** | Modern Pro, Creative Sidebar, Tech Resume, Visual | Tech, design, modern companies |
| **Header** | Bold Header, Banner Style, Hero Resume, Impact | Marketing, sales, executives |
| **Minimal** | Clean, Swiss, Typography, Whitespace | Startups, consultants, minimalists |
| **Creative** | Portfolio, Designer, Infographic, Unique | Creatives, designers, artists |

### Template Data Model

```python
# Each template is defined by:
class CVTemplate:
    id: str              # "classic_navy"
    name: str            # "Classic Navy"
    layout: LayoutType   # CLASSIC | SIDEBAR | HEADER | MINIMAL | CREATIVE
    theme: ThemeColors   # Primary, secondary, accent, text colors
    preview_image: str   # Path to preview thumbnail
    is_premium: bool     # Free or paid template
    
class ThemeColors:
    primary: str         # Main accent color
    secondary: str       # Secondary elements
    background: str      # Background color
    text: str            # Main text color
    heading: str         # Heading color
```



### All 20 Templates

| # | Template Name | Layout | Theme |
|---|--------------|--------|-------|
| 1 | **Executive Navy** | Classic | Navy Blue |
| 2 | **Executive Teal** | Classic | Teal |
| 3 | **Executive Dark** | Classic | Dark |
| 4 | **Executive Purple** | Classic | Purple |
| 5 | **Modern Sidebar Blue** | Sidebar | Navy Blue |
| 6 | **Modern Sidebar Green** | Sidebar | Teal |
| 7 | **Modern Sidebar Dark** | Sidebar | Dark |
| 8 | **Modern Sidebar Purple** | Sidebar | Purple |
| 9 | **Bold Header Navy** | Header | Navy Blue |
| 10 | **Bold Header Teal** | Header | Teal |
| 11 | **Bold Header Dark** | Header | Dark |
| 12 | **Bold Header Violet** | Header | Purple |
| 13 | **Minimal Clean** | Minimal | Navy Blue |
| 14 | **Minimal Swiss** | Minimal | Teal |
| 15 | **Minimal Dark** | Minimal | Dark |
| 16 | **Minimal Mono** | Minimal | Purple |
| 17 | **Creative Portfolio** | Creative | Navy Blue |
| 18 | **Creative Designer** | Creative | Teal |
| 19 | **Creative Dark** | Creative | Dark |
| 20 | **Creative Vibrant** | Creative | Purple |

---

## 🛠️ Tech Stack

```
Frontend:     tailwindcss4, nextjs, typescript, react. 
Backend:      Python, FastAPI, SQLAlchemy
Database:     PostgreSQL
AI:           DeepSeek API (cost-effective),
PDF:          WeasyPrint / ReportLab (backend), pdf package (Flutter)
DOCX:         python-docx library
NLP:          spaCy / NLTK for keyword extraction
Payments:     Stripe
Hosting:      Railway/Render (backend) + Vercel/Firebase 
oath with gamil login and email login with firebase email verification..
```

### Flutter Packages
```yaml
dependencies:
  dio: ^5.4.0                   # HTTP client
  riverpod: ^2.5.0              # State management
  pdf: ^3.10.0                  # PDF generation
  printing: ^5.12.0             # PDF preview/export
  flutter_quill: ^9.0.0         # Rich text editing
  go_router: ^13.0.0            # Navigation
  flutter_form_builder: ^9.0.0  # Form handling
```

### Python Packages
```txt
fastapi>=0.109.0
uvicorn>=0.27.0
sqlalchemy>=2.0.0
pydantic>=2.5.0
openai>=1.10.0          # DeepSeek-compatible
python-docx>=1.1.0      # DOCX generation
weasyprint>=60.0        # PDF generation
spacy>=3.7.0            # NLP/keyword extraction
stripe>=8.0.0           # Payments
python-jose>=3.3.0      # JWT auth
passlib>=1.7.4          # Password hashing
```

---

## 🗄️ Database Schema (Key Tables)

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  name VARCHAR(255),
  subscription_tier VARCHAR(50) DEFAULT 'free',
  credits_remaining INT DEFAULT 3,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE resumes (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL, -- "Software Engineer Resume"
  target_role VARCHAR(255),
  target_company VARCHAR(255),

  -- Content sections
  summary TEXT,
  experiences JSONB, -- Array of job objects
  education JSONB,
  skills JSONB,
  certifications JSONB,

  -- Metadata
  template_id VARCHAR(50),
  ats_score DECIMAL(3,1),
  keyword_matches INT,
  is_master_resume BOOLEAN DEFAULT false,

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE job_descriptions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  resume_id UUID REFERENCES resumes(id),
  company_name VARCHAR(255),
  job_title VARCHAR(255),
  description TEXT,
  extracted_keywords TEXT[],
  requirements TEXT[],
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE resume_generations (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  resume_id UUID REFERENCES resumes(id),
  job_description_id UUID REFERENCES job_descriptions(id),
  prompt TEXT,
  generated_content JSONB,
  tokens_used INT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE applications (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  resume_id UUID REFERENCES resumes(id),
  company_name VARCHAR(255),
  status VARCHAR(50), -- applied, interview, rejected, offer
  applied_date DATE,
  notes TEXT
);
```

---

## 🔌 API Endpoints

```
POST   /api/resumes                 - Create new resume
GET    /api/resumes                 - List user's resumes
GET    /api/resumes/:id             - Get resume details
PUT    /api/resumes/:id             - Update resume
DELETE /api/resumes/:id             - Delete resume

POST   /api/ai/generate-summary     - Generate professional summary
POST   /api/ai/improve-bullet       - Quantify & improve bullet point
POST   /api/ai/tailor-resume        - Tailor resume to JD
POST   /api/ai/cover-letter         - Generate cover letter

POST   /api/resumes/:id/export/pdf  - Export as PDF
POST   /api/resumes/:id/export/docx - Export as DOCX

POST   /api/job-descriptions        - Save JD for matching
GET    /api/job-descriptions/:id/match - Match resume to JD
```

---

## 📝 Implementation (Key Code)

### AI Bullet Point Improver
```python
# app/services/ai_service.py
from openai import OpenAI

client = OpenAI(
    api_key="your-deepseek-api-key",
    base_url="https://api.deepseek.com/v1"
)

async def improve_bullet(bullet: str, role: str) -> str:
    """Transform a bullet point to be achievement-focused and quantified."""
    
    system_prompt = f"""You are a professional resume writer.

Transform this bullet point to be:
- Achievement-focused (not duty-focused)
- Quantified with metrics (%, $, numbers)
- Start with strong action verb
- Show impact & results
- ATS keyword-optimized

Role: {role}

Original: "{bullet}"

Return improved version only."""

    response = client.chat.completions.create(
        model="deepseek-chat",
        messages=[{"role": "system", "content": system_prompt}],
        temperature=0.7,
    )
    
    return response.choices[0].message.content
```

### Job Description Matching
```python
# app/services/matching_service.py
from dataclasses import dataclass
import spacy

nlp = spacy.load("en_core_web_sm")

@dataclass
class MatchResult:
    score: float
    matched_keywords: list[str]
    missing_keywords: list[str]

def extract_keywords(text: str) -> list[str]:
    """Extract important keywords from text using NLP."""
    doc = nlp(text)
    keywords = [
        token.text.lower() for token in doc
        if token.pos_ in ("NOUN", "PROPN", "ADJ") 
        and not token.is_stop
        and len(token.text) > 2
    ]
    return list(set(keywords))

def match_resume_to_jd(resume_text: str, jd_text: str) -> MatchResult:
    """Match resume content against job description keywords."""
    jd_keywords = extract_keywords(jd_text)
    resume_lower = resume_text.lower()
    
    matches = [kw for kw in jd_keywords if kw in resume_lower]
    missing = [kw for kw in jd_keywords if kw not in resume_lower]
    
    score = (len(matches) / len(jd_keywords) * 100) if jd_keywords else 0
    
    return MatchResult(
        score=round(score, 1),
        matched_keywords=matches,
        missing_keywords=missing
    )
```

### FastAPI Endpoints
```python
# app/main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI(title="AI Resume Builder API")

class BulletImproveRequest(BaseModel):
    bullet: str
    role: str

class ResumeMatchRequest(BaseModel):
    resume_text: str
    job_description: str

@app.post("/api/ai/improve-bullet")
async def improve_bullet_endpoint(request: BulletImproveRequest):
    improved = await improve_bullet(request.bullet, request.role)
    return {"improved_bullet": improved}

@app.post("/api/ai/match-resume")
async def match_resume_endpoint(request: ResumeMatchRequest):
    result = match_resume_to_jd(request.resume_text, request.job_description)
    return result
```

---

## 💵 Monetization

### Pricing

**Free - $0**
- 3 resume generations
- Basic templates only
- PDF export with watermark

**Pro - $19/month**
- Unlimited resumes
- All templates
- Cover letters
- DOCX export
- No watermark
- **Target:** Active job seekers

**Career Boost - $49/month**
- Everything in Pro
- LinkedIn optimizer
- Interview prep questions
- Priority support
- **Target:** Career changers, executives

**One-Time - $9.99**
- Single resume
- No subscription
- Good for occasional users

### Revenue Projections
```
Month 3:  2000 users → 10% paid = 200 × $20 avg = $4,000 MRR
Month 6:  10000 users → 15% paid = 1500 × $22 avg = $33,000 MRR
Month 12: 40000 users → 20% paid = 8000 × $25 avg = $200,000 MRR
```

---

## 📣 Marketing Strategy

1. **SEO** - "ATS resume builder", "free resume maker"
2. **Reddit** - r/jobs, r/resumes, r/careerguidance
3. **LinkedIn** - Post resume tips, target job seekers
4. **YouTube** - "How to Beat ATS Systems"
5. **Free tool** - Resume ATS score checker
6. **Partnerships** - Career coaches, bootcamps

---

## ⚠️ Risks & Mitigation

**Risk:** AI hallucinates fake achievements
**Mitigation:** Clear warnings, user review required, highlight AI text in yellow

**Risk:** Legal issues (resume writing laws)
**Mitigation:** Disclaimer: "AI-assisted tool, user responsible for accuracy"

**Risk:** Low conversion (free to paid)
**Mitigation:** Limit free tier to 3 resumes, add "Get Interview" upgrade CTA

---

## 🚀 Next Steps

### Week 1 MVP
- [ ] Resume input form
- [ ] AI bullet generation
- [ ] Basic PDF export
- [ ] 3 templates

**Launch fast, iterate based on feedback. Every job seeker needs this!**

Good luck! 📄✨
