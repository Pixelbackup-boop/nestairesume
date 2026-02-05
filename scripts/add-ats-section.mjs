#!/usr/bin/env node
/**
 * Add ATS Optimization section to resume example pages that are missing it.
 * Each section is profession-specific, not generic advice.
 * Inserts before "## Explore More Resume Resources" or at end of content.
 */

import { createRequire } from 'node:module';
import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const require2 = createRequire(path.join(rootDir, 'frontend', 'package.json'));
const matter = require2('gray-matter');

const RESUME_DIR = path.join(rootDir, 'frontend', 'content', 'resume-examples');

// Slug-specific ATS sections for key pages
const SLUG_ATS = {
  'software-engineer': {
    intro: 'Software engineering ATS systems are configured to match technical stack keywords exactly — a missing framework name can filter you out before a human sees your resume.',
    tips: [
      'List programming languages with exact names: "Python 3," "TypeScript," "Go" — not "scripting languages" or "various programming languages"',
      'Include framework and library names as they appear in job postings: "React," "Node.js," "Django," "Spring Boot," "TensorFlow"',
      'Spell out development methodologies: "Agile/Scrum," "CI/CD," "Test-Driven Development (TDD)," "DevOps"',
      'Name specific tools: "Git," "Docker," "Kubernetes," "AWS (EC2, S3, Lambda)," "Jenkins," "JIRA"',
      'Include both the full term and abbreviation: "Application Programming Interface (API)," "Object-Oriented Programming (OOP)," "Software Development Life Cycle (SDLC)"',
    ],
  },
  'nurse': {
    intro: 'Healthcare ATS platforms are built to screen for licenses, certifications, and clinical keywords. Missing your license number or using informal terms instead of clinical terminology can disqualify an otherwise strong application.',
    tips: [
      'Include license type and state abbreviation: "RN — CA License #XXXXXX, exp. 12/2027"',
      'Use exact clinical terms from the posting: "telemetry monitoring," "wound assessment," "medication reconciliation," "patient discharge planning"',
      'Spell out certifications with abbreviations: "Basic Life Support (BLS)," "Advanced Cardiovascular Life Support (ACLS)," "Pediatric Advanced Life Support (PALS)"',
      'Name EHR systems specifically: "Epic," "Cerner," "Meditech," "CPSI" — not just "electronic health records"',
      'Include patient population terms: "medical-surgical," "critical care," "pediatric," "geriatric," "behavioral health"',
    ],
  },
  'data-analyst': {
    intro: 'Data analytics ATS systems filter for specific tools, programming languages, and statistical methods. Generic terms like "data analysis" without naming your actual tools will not pass automated screening.',
    tips: [
      'Name tools exactly: "SQL," "Python (Pandas, NumPy)," "R," "Tableau," "Power BI," "Excel (VLOOKUP, Pivot Tables, Macros)"',
      'Include statistical methods: "regression analysis," "A/B testing," "hypothesis testing," "cohort analysis," "time-series forecasting"',
      'Spell out database platforms: "MySQL," "PostgreSQL," "MongoDB," "BigQuery," "Snowflake," "Redshift"',
      'Reference data pipeline terms: "ETL," "data warehousing," "data modeling," "data governance," "data visualization"',
      'Use both abbreviations and full terms: "Key Performance Indicators (KPIs)," "Business Intelligence (BI)," "Customer Relationship Management (CRM)"',
    ],
  },
  'project-manager': {
    intro: 'Project management ATS platforms screen for methodology certifications, tool proficiency, and leadership terminology. Listing "managed projects" without naming your methodology or tools will not pass keyword filters.',
    tips: [
      'Name certifications prominently: "PMP," "PRINCE2," "Certified Scrum Master (CSM)," "PMI-ACP," "Six Sigma Green Belt"',
      'Include methodology terms: "Agile," "Scrum," "Kanban," "Waterfall," "Hybrid," "Lean," "SAFe"',
      'Name project management tools: "Microsoft Project," "Jira," "Asana," "Monday.com," "Smartsheet," "Confluence"',
      'Use budget and scope keywords: "P&L management," "resource allocation," "risk mitigation," "stakeholder management," "change management"',
      'Include delivery metrics terms: "on-time delivery," "budget variance," "scope management," "milestone tracking," "sprint velocity"',
    ],
  },
  'accountant': {
    intro: 'Accounting ATS systems are calibrated to detect specific software names, compliance frameworks, and financial terminology. Using general phrases instead of exact accounting terms significantly reduces your match score.',
    tips: [
      'Name accounting software: "QuickBooks," "SAP," "Oracle Financials," "NetSuite," "Sage," "Xero," "ADP"',
      'Include compliance terms: "GAAP," "IFRS," "SOX compliance," "internal controls," "audit procedures"',
      'Spell out financial processes: "accounts payable (AP)," "accounts receivable (AR)," "general ledger (GL)," "month-end close," "bank reconciliation"',
      'Reference certifications: "Certified Public Accountant (CPA)," "Certified Management Accountant (CMA)," "Enrolled Agent (EA)"',
      'Include tax and reporting terms: "financial statements," "tax preparation," "1099 processing," "payroll tax," "variance analysis," "budget forecasting"',
    ],
  },
  'graphic-designer': {
    intro: 'Creative industry ATS platforms screen for specific design tool proficiency, deliverable types, and workflow terms. Listing "graphic design" without naming your software stack will filter you out.',
    tips: [
      'Name tools with versions: "Adobe Creative Suite (Photoshop, Illustrator, InDesign, After Effects)," "Figma," "Sketch," "Canva Pro"',
      'Include deliverable types: "brand identity," "social media assets," "print collateral," "UI mockups," "packaging design," "email templates"',
      'Reference design terms: "typography," "color theory," "visual hierarchy," "responsive design," "brand guidelines," "style guide"',
      'Mention file formats and workflows: "vector graphics," "print-ready PDFs," "web-optimized assets," "design systems," "asset management"',
      'Use both creative and business terms: "creative brief," "stakeholder review," "brand consistency," "A/B testing (creative)," "conversion-focused design"',
    ],
  },
};

// Category-level ATS sections with variation
const CATEGORY_ATS = {
  'Technology': [
    {
      intro: 'Technology ATS systems are configured to match specific languages, frameworks, and tools. Generic terms like "programming" without naming your actual stack will not pass automated keyword screening.',
      tips: [
        'List languages and frameworks by exact name as they appear in the job posting — "React," "Vue.js," "Angular," not "JavaScript frameworks"',
        'Include cloud platforms specifically: "AWS," "Azure," "GCP" with service names like "EC2," "Lambda," "S3," "CloudFormation"',
        'Name development tools and practices: "Git," "Docker," "Kubernetes," "CI/CD pipelines," "Terraform," "Jenkins"',
        'Spell out methodologies: "Agile/Scrum," "DevOps," "Test-Driven Development (TDD)," "Microservices Architecture"',
        'Use plain-text formatting — no tables, graphics, or multi-column layouts that parsing engines cannot read',
      ],
    },
    {
      intro: 'Tech recruiters rely heavily on ATS keyword matching before manual review. Your resume must contain the exact technical terms from the job description to clear the initial automated screening.',
      tips: [
        'Mirror the job posting language exactly — if it says "RESTful APIs," include that phrase, not just "API development"',
        'Name databases and data stores: "PostgreSQL," "MongoDB," "Redis," "Elasticsearch" — not "database management"',
        'Include version control and collaboration: "Git," "GitHub," "GitLab," "Bitbucket," "code review," "pull requests"',
        'List certifications with full names: "AWS Certified Solutions Architect," "Google Cloud Professional," "Kubernetes (CKA)"',
        'Place the most critical technical keywords in both your skills section and within experience bullet points to maximize match frequency',
      ],
    },
  ],
  'Healthcare': [
    {
      intro: 'Healthcare ATS platforms are specifically configured to screen for licensure, certifications, and clinical competency terms. Missing credentials or using informal medical shorthand can filter out qualified candidates.',
      tips: [
        'Include license details: type, number, state, and expiration date in a dedicated Certifications section near the top',
        'Use exact clinical terminology from the job posting: "patient assessment," "care planning," "medication administration," "vital signs monitoring"',
        'Spell out certifications: "Basic Life Support (BLS)," "Advanced Cardiovascular Life Support (ACLS)," "Certified Nursing Assistant (CNA)"',
        'Name EHR systems: "Epic," "Cerner," "Meditech," "PointClickCare" — healthcare ATS systems track specific platform experience',
        'Include both clinical and regulatory terms: "HIPAA compliance," "infection control," "Joint Commission standards," "patient safety protocols"',
      ],
    },
  ],
  'Finance': [
    {
      intro: 'Finance and accounting ATS systems filter for specific software, regulatory frameworks, and financial terminology. Vague descriptions like "financial management" without naming your tools and standards will not clear keyword thresholds.',
      tips: [
        'Name financial software: "QuickBooks," "SAP," "Oracle," "Bloomberg Terminal," "FactSet," "Hyperion," "Workday"',
        'Include regulatory and compliance terms: "GAAP," "IFRS," "SOX," "SEC reporting," "internal audit," "risk assessment"',
        'Reference certifications: "CPA," "CFA," "CMA," "CFP," "FRM" — both abbreviation and full name',
        'Use financial process keywords: "financial modeling," "budget forecasting," "variance analysis," "cash flow management," "P&L analysis"',
        'Structure your resume with clear section headers that ATS parsers expect: Summary, Certifications, Experience, Education, Skills',
      ],
    },
  ],
  'Business': [
    {
      intro: 'Business and operations ATS systems screen for management methodologies, software proficiency, and performance metrics. Use exact terminology from the job description rather than paraphrasing responsibilities.',
      tips: [
        'Name business tools: "Salesforce," "HubSpot," "SAP," "Microsoft Office Suite (Excel, PowerPoint, Word)," "Slack," "Asana"',
        'Include methodology terms: "Lean," "Six Sigma," "Process Improvement," "Change Management," "Strategic Planning"',
        'Use performance keywords: "KPIs," "ROI," "revenue growth," "cost reduction," "operational efficiency," "customer satisfaction"',
        'Reference leadership terms: "cross-functional teams," "stakeholder management," "P&L responsibility," "business development"',
        'Use plain text with standard fonts — avoid columns, text boxes, or graphics that ATS parsers cannot read correctly',
      ],
    },
  ],
  'Hospitality': [
    {
      intro: 'Hospitality ATS systems screen for certifications, service terminology, and operational keywords. Use industry-specific terms rather than generic descriptions to match automated keyword filters.',
      tips: [
        'Include certifications: "ServSafe," "TIPS certified," "Food Handler Card," "CPR/First Aid," "OSHA training"',
        'Name point-of-sale and management systems: "Toast," "Micros," "Aloha," "Square," "OpenTable," "HotSchedules"',
        'Use hospitality terms: "guest satisfaction," "table turn rate," "food cost," "labor cost," "inventory management," "health code compliance"',
        'Include volume metrics with keywords: "200-seat restaurant," "high-volume bar ($X nightly sales)," "managed X-room property"',
        'Use standard resume formatting — single column, no images, standard fonts — hospitality chains use enterprise ATS that parse formatting strictly',
      ],
    },
  ],
  'Marketing': [
    {
      intro: 'Marketing ATS platforms filter for platform-specific skills, analytics tools, and campaign terminology. Saying "digital marketing" without naming your channels and tools will not pass keyword screening.',
      tips: [
        'Name platforms: "Google Ads," "Facebook Ads Manager," "LinkedIn Campaign Manager," "HubSpot," "Mailchimp," "Hootsuite," "Sprout Social"',
        'Include analytics tools: "Google Analytics 4," "SEMrush," "Ahrefs," "Moz," "Hotjar," "Mixpanel," "Google Tag Manager"',
        'Use channel-specific terms: "SEO," "PPC," "email marketing," "content marketing," "social media management," "influencer marketing"',
        'Reference metrics keywords: "conversion rate," "ROAS," "CAC," "CLV," "CTR," "engagement rate," "lead generation," "funnel optimization"',
        'Include both abbreviations and full terms for key metrics to maximize ATS matches across different keyword configurations',
      ],
    },
  ],
  'Engineering': [
    {
      intro: 'Engineering ATS platforms screen for specific software, certifications, and technical standards. Generic terms like "engineering design" without naming your tools and codes will not clear keyword filters.',
      tips: [
        'Name engineering software: "AutoCAD," "SolidWorks," "CATIA," "MATLAB," "ANSYS," "Revit," "Civil 3D"',
        'Include certifications: "PE (Professional Engineer)," "EIT/FE," "PMP," "Lean Six Sigma," "OSHA 30"',
        'Reference industry standards: "ASME," "IEEE," "ASTM," "ISO 9001," "building codes," "NEC," "API standards"',
        'Use engineering terms: "finite element analysis (FEA)," "computational fluid dynamics (CFD)," "GD&T," "structural analysis"',
        'Place critical technical terms in both the skills section and within project or experience bullet points to increase keyword density',
      ],
    },
  ],
  'Sales': [
    {
      intro: 'Sales ATS systems screen for CRM platform experience, sales methodology terms, and performance metrics. Listing "sales experience" without naming your tools and quotas will not clear keyword filters.',
      tips: [
        'Name CRM platforms: "Salesforce," "HubSpot," "Zoho CRM," "Pipedrive," "Microsoft Dynamics 365"',
        'Include sales methodologies: "SPIN Selling," "Challenger Sale," "MEDDIC," "Solution Selling," "Consultative Selling"',
        'Use performance keywords: "quota attainment," "pipeline management," "revenue growth," "average deal size," "sales cycle length"',
        'Reference process terms: "lead generation," "cold calling," "account management," "upselling," "cross-selling," "territory management"',
        'Include both full terms and abbreviations: "Customer Relationship Management (CRM)," "Key Performance Indicators (KPIs)," "Year-over-Year (YoY)"',
      ],
    },
  ],
  'HR': [
    {
      intro: 'HR ATS systems — often the same platforms HR teams use daily — screen for HRIS platform names, compliance terminology, and talent management keywords. Generic phrases like "human resources experience" will not match specific keyword filters.',
      tips: [
        'Name HRIS platforms: "Workday," "ADP," "BambooHR," "SAP SuccessFactors," "UKG," "Paychex," "Greenhouse"',
        'Include compliance terms: "EEOC," "FMLA," "ADA," "I-9 verification," "FLSA," "OSHA," "labor law compliance"',
        'Use talent management keywords: "full-cycle recruiting," "onboarding," "performance management," "succession planning," "employee engagement"',
        'Reference compensation terms: "benefits administration," "compensation analysis," "payroll processing," "total rewards," "salary benchmarking"',
        'Include both abbreviations and full forms: "Human Resources Information System (HRIS)," "Applicant Tracking System (ATS)," "Employee Assistance Program (EAP)"',
      ],
    },
  ],
  'Management': [
    {
      intro: 'Management-level ATS screening looks for leadership scope keywords, strategic terminology, and operational metrics. Listing "management experience" without defining your span of control and methodologies will not pass automated filters.',
      tips: [
        'Quantify your span of control: "managed team of 15," "oversaw $2M budget," "P&L responsibility for $10M division"',
        'Include management methodologies: "OKRs," "Balanced Scorecard," "Lean Management," "Change Management," "Process Improvement"',
        'Name business tools: "Microsoft Project," "Smartsheet," "Asana," "Monday.com," "SAP," "Salesforce"',
        'Use strategic keywords: "strategic planning," "cross-functional leadership," "operational efficiency," "stakeholder engagement," "organizational development"',
        'Structure your resume with clear, ATS-parseable sections — use standard headers like Professional Experience, not creative alternatives',
      ],
    },
  ],
  'Administrative': [
    {
      intro: 'Administrative ATS systems filter for software proficiency, organizational skills, and office management terminology. Naming specific tools and systems is critical for passing automated screening.',
      tips: [
        'Name office software: "Microsoft Office Suite (Word, Excel, PowerPoint, Outlook)," "Google Workspace," "Slack," "Zoom," "SharePoint"',
        'Include scheduling and management tools: "Calendly," "SAP," "QuickBooks," "DocuSign," "Concur," "Expensify"',
        'Use administrative keywords: "calendar management," "travel coordination," "meeting minutes," "vendor management," "office operations"',
        'Reference data management: "filing systems," "database management," "data entry," "records management," "CRM administration"',
        'Include communication terms: "correspondence," "executive support," "client relations," "interdepartmental coordination"',
      ],
    },
  ],
  'Logistics': [
    {
      intro: 'Supply chain and logistics ATS platforms screen for specific software, certification terms, and operational keywords. Generic descriptions without naming your tools and metrics will not pass automated filters.',
      tips: [
        'Name logistics software: "SAP (WM/MM)," "Oracle WMS," "Manhattan Associates," "Blue Yonder," "NetSuite," "ShipStation"',
        'Include certifications: "APICS (CSCP, CPIM)," "Six Sigma," "OSHA forklift certification," "Lean certification," "Hazmat certification"',
        'Use supply chain terms: "inventory management," "demand planning," "procurement," "freight management," "3PL coordination," "last-mile delivery"',
        'Reference metrics keywords: "on-time delivery rate," "order accuracy," "inventory turnover," "cost per unit shipped," "fill rate"',
        'Include both abbreviations: "Warehouse Management System (WMS)," "Enterprise Resource Planning (ERP)," "Transportation Management System (TMS)"',
      ],
    },
  ],
  'Retail': [
    {
      intro: 'Retail ATS systems screen for POS experience, sales metrics, and customer service terminology. Using exact system names and retail-specific performance terms is essential for clearing automated keyword filters.',
      tips: [
        'Name POS and retail systems: "Square," "Shopify POS," "Oracle Retail," "SAP Retail," "Lightspeed," "NCR," "inventory management systems"',
        'Include retail metrics: "sales per square foot," "conversion rate," "average transaction value," "shrinkage reduction," "same-store sales growth"',
        'Use management keywords: "visual merchandising," "inventory control," "loss prevention," "staff scheduling," "customer service training"',
        'Reference seasonal and promotional terms: "holiday staffing," "promotional planning," "product launches," "planogram compliance"',
        'Use plain-text formatting with clear section headers — large retail chains use enterprise ATS that strictly parse document structure',
      ],
    },
  ],
  'Creative': [
    {
      intro: 'Creative industry ATS systems scan for specific tool names, deliverable types, and process terms. Listing "design skills" without naming your software stack and output types will not pass keyword screening.',
      tips: [
        'Name design tools: "Adobe Creative Suite (Photoshop, Illustrator, InDesign, After Effects, Premiere Pro)," "Figma," "Sketch," "Cinema 4D"',
        'Include deliverable types: "brand identity," "UI/UX mockups," "motion graphics," "print production," "web design," "social media content"',
        'Use workflow terms: "design systems," "brand guidelines," "creative brief," "client presentations," "cross-functional collaboration"',
        'Reference digital terms: "responsive design," "HTML/CSS (basic)," "prototyping," "wireframing," "user testing," "accessibility (WCAG)"',
        'Include both creative and business terminology to match how hiring managers write job descriptions for creative roles',
      ],
    },
  ],
  'Manufacturing': [
    {
      intro: 'Manufacturing ATS platforms screen for specific equipment, quality standards, and process terminology. Listing "manufacturing experience" without naming your systems and certifications will not pass automated filters.',
      tips: [
        'Name equipment and systems: "CNC (Haas, Mazak)," "PLC programming," "CAD/CAM," "ERP systems (SAP, Oracle)," "MES"',
        'Include quality certifications: "ISO 9001," "Six Sigma (Green/Black Belt)," "Lean Manufacturing," "GMP," "SPC"',
        'Use process terms: "5S," "Kaizen," "value stream mapping," "root cause analysis," "FMEA," "preventive maintenance"',
        'Reference safety: "OSHA compliance," "lockout/tagout (LOTO)," "PPE protocols," "safety audits," "incident investigation"',
        'Include production metrics: "OEE (Overall Equipment Effectiveness)," "cycle time," "first-pass yield," "scrap rate reduction"',
      ],
    },
  ],
  'Trades': [
    {
      intro: 'Trades ATS systems screen for specific certifications, equipment, and code compliance terms. Listing general trade experience without naming your licenses and specializations will not pass keyword filters.',
      tips: [
        'Include license details: type, number, state, and class (e.g., "Journeyman Electrician License #XXXXX, State of TX")',
        'Name equipment and tools: "multimeter," "oscilloscope," "pipe threading machine," specific brands used in your trade',
        'Reference codes and standards: "NEC," "UPC," "IMC," "ASHRAE," "EPA 608 certification," "building codes"',
        'Use trade-specific terms: "blueprint reading," "load calculations," "system diagnostics," "preventive maintenance," "commissioning"',
        'Include safety certifications: "OSHA 10/30," "First Aid/CPR," "confined space entry," "fall protection," "hot work permit"',
      ],
    },
  ],
  'Customer Service': [
    {
      intro: 'Customer service ATS platforms filter for CRM tool names, support channel experience, and service metrics. Generic phrases like "customer service skills" without naming your tools and metrics will not clear automated screening.',
      tips: [
        'Name CRM and support tools: "Zendesk," "Salesforce Service Cloud," "Freshdesk," "Intercom," "HubSpot," "Five9," "Genesys"',
        'Include channel terms: "phone support," "live chat," "email support," "social media support," "omnichannel," "ticketing system"',
        'Use service metrics: "CSAT score," "first-call resolution," "average handle time (AHT)," "NPS," "ticket volume," "SLA compliance"',
        'Reference skills keywords: "de-escalation," "upselling," "product knowledge," "troubleshooting," "complaint resolution"',
        'Include both abbreviations and full terms: "Customer Satisfaction (CSAT)," "Net Promoter Score (NPS)," "Service Level Agreement (SLA)"',
      ],
    },
  ],
};

// Default for categories without specific content
const DEFAULT_ATS = {
  intro: 'Applicant tracking systems filter resumes based on keyword matching before a human reviews them. Optimizing your resume for ATS compatibility is essential to ensure your qualifications are captured accurately.',
  tips: [
    'Use exact terminology from the job posting — mirror the language the employer uses for skills, tools, and qualifications',
    'Include both full terms and abbreviations for key qualifications, certifications, and tools used in your profession',
    'Structure your resume with clear, standard section headers: Summary, Skills, Experience, Education, Certifications',
    'Place the most critical keywords in both your skills section and within experience bullet points to maximize match frequency',
    'Use plain-text formatting with standard fonts — avoid tables, graphics, text boxes, or multi-column layouts that ATS parsers cannot read',
  ],
};

// ═══════════════════════════════════════
// Process files
// ═══════════════════════════════════════

let added = 0;
let skipped = 0;

for (const f of fs.readdirSync(RESUME_DIR).filter(x => x.endsWith('.mdx'))) {
  const filePath = path.join(RESUME_DIR, f);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const slug = data.slug || f.replace('.mdx', '');
  const jobTitle = data.jobTitle || data.title || slug;
  const category = data.category || 'Unknown';

  // Skip if already has ATS section
  if (/^## ATS Optimization/m.test(content)) {
    skipped++;
    continue;
  }

  // Get ATS content: slug-specific → category → default
  let atsContent;
  if (SLUG_ATS[slug]) {
    atsContent = SLUG_ATS[slug];
  } else if (CATEGORY_ATS[category]) {
    const variations = CATEGORY_ATS[category];
    const hash = slug.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    atsContent = variations[hash % variations.length];
  } else {
    atsContent = DEFAULT_ATS;
  }

  // Build section
  let section = `\n## ATS Optimization for ${jobTitle} Resumes\n\n`;
  section += `${atsContent.intro}\n\n`;
  for (const tip of atsContent.tips) {
    section += `- ${tip}\n`;
  }

  // Insert before "## Explore More Resume Resources" if exists, otherwise before end
  let updatedContent;
  const exploreIdx = content.indexOf('\n## Explore More Resume Resources');
  if (exploreIdx !== -1) {
    updatedContent = content.slice(0, exploreIdx) + section + content.slice(exploreIdx);
  } else {
    updatedContent = content.trimEnd() + '\n' + section;
  }

  const newRaw = matter.stringify(updatedContent, data);
  fs.writeFileSync(filePath, newRaw);
  added++;
}

console.log(`ATS Optimization: ${added} sections added, ${skipped} already had it`);
