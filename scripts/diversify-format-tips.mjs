#!/usr/bin/env node
/**
 * Diversifies the "Resume Format & Template Tips" section across all 306 pages.
 * Each page gets unique formatting advice based on its specific profession,
 * eliminating templated same-category duplication.
 */

import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const require = createRequire(path.join(rootDir, 'frontend', 'package.json'));
const matter = require('gray-matter');

const CONTENT_DIR = path.join(rootDir, 'frontend/content/resume-examples');

// Each entry: { intro, tips: string[] }
// Tips are 5-6 bullet points of truly unique formatting advice

function getFormatTips(slug, jobTitle) {
  const specific = SLUG_TIPS[slug];
  if (specific) return specific;
  return null; // Will use category fallback
}

const SLUG_TIPS = {
  // ═══ TECHNOLOGY ══════════════════════════════════════════════════════
  'software-engineer': {
    intro: `Software engineering resumes are evaluated by both technical recruiters and engineering managers — each looking for different things. Your format must satisfy both audiences:`,
    tips: [
      `**Separate "Technical Skills" from "Experience"** — Engineering managers want to see your tech stack at a glance. Create a dedicated section listing languages, frameworks, databases, and cloud platforms. Group by category (Backend / Frontend / DevOps / Data) rather than alphabetically`,
      `**Include system scale in every bullet** — "Built an API" means nothing. "Built a REST API serving 50K requests/second across 12 microservices" tells the story. Add request volumes, data sizes, user counts, or SLA targets to every technical bullet`,
      `**Link to your GitHub or technical portfolio** — Place it in your header next to your email and phone. If your best work is in private repos, describe it in a "Key Projects" section with architecture details and outcomes`,
      `**Reverse-chronological, 1-2 pages** — One page for <5 years experience. Two pages only if you have significant architecture decisions, team leadership, or open-source contributions worth detailing`,
      `**Skip the objective statement** — Replace it with a 2-line summary that names your strongest stack, years of experience, and biggest technical achievement. Engineering hiring managers skip objectives entirely`,
    ],
  },
  'software-developer': {
    intro: `Software developer resumes need to demonstrate that you ship working software, not just write code. Your format should make production experience immediately visible:`,
    tips: [
      `**Lead each role with a "shipped product" statement** — Before listing bullets, add one line describing what the team built and your role in it: "Built and maintained a SaaS invoicing platform serving 5,000 SMB customers (Node.js, React, PostgreSQL)"`,
      `**Show your development workflow** — Mention CI/CD tools, testing frameworks, and code review practices in your bullets. Developers who mention "maintained 90% test coverage" and "reviewed 15+ PRs weekly" signal production-readiness`,
      `**Use a "Technologies" line under each role** — Instead of a separate skills section, list the specific tech stack used in each position directly below the company name. This shows context for when and where you used each technology`,
      `**Include version control and collaboration tools** — Git, Jira, Confluence, Slack, and Linear are assumed but listing them shows you work in structured team environments. Mention branching strategies if relevant (trunk-based, Gitflow)`,
      `**Keep it to one page unless you have 7+ years** — Junior and mid-level developers should ruthlessly edit. Remove college coursework after 2+ years of professional experience. Remove technologies you used briefly and would not want to be tested on`,
    ],
  },
  'full-stack-developer': {
    intro: `Full-stack developer resumes must prove depth in at least one stack while demonstrating cross-boundary competence. Your format should make your primary expertise clear within 5 seconds:`,
    tips: [
      `**Declare your primary stack in the summary** — "Full-stack developer specializing in React/Node.js with production experience across the entire stack from PostgreSQL schema design to deployment automation." This prevents recruiters from guessing your strength`,
      `**Organize bullets by feature, not by technology** — "Built end-to-end user authentication including database schema, API endpoints, JWT handling, and React login flow" proves full-stack ability better than separate frontend and backend bullet lists`,
      `**Include a "Technical Projects" section** — Full-stack roles benefit from 2-3 project descriptions showing end-to-end ownership. Include the problem, your solution, the tech stack, and the outcome`,
      `**Show database work explicitly** — Many frontend developers call themselves full-stack. Differentiate by mentioning schema design, query optimization, migration management, and data modeling experience`,
      `**Link to deployed projects** — Live URLs are the most powerful proof of full-stack ability. Include 1-2 links to projects where you built both the frontend and backend`,
      `**One to two pages** — Focus on roles and projects where you touched both frontend and backend. Remove positions that were purely one-sided unless they demonstrate relevant depth`,
    ],
  },
  'front-end-developer': {
    intro: `Frontend developer resumes are judged on two dimensions: technical sophistication and design sensibility. Your resume format itself is a design artifact — make it count:`,
    tips: [
      `**Your resume IS a design sample** — Frontend developers who submit poorly formatted resumes send a contradictory signal. Use clean typography, consistent spacing, and clear visual hierarchy. Consider a tasteful personal brand color, but keep it ATS-compatible`,
      `**Lead with performance metrics** — Lighthouse scores, Core Web Vitals improvements, bundle size reductions, and page load times signal senior-level thinking. "Reduced LCP from 4.2s to 1.1s through code splitting and image optimization" beats any technology list`,
      `**Mention accessibility explicitly** — WCAG compliance, screen reader testing, keyboard navigation, and semantic HTML are increasingly required. An "Accessibility" subsection under skills shows this is a priority, not an afterthought`,
      `**Group skills by domain** — "UI Frameworks: React, Next.js, Vue | Styling: Tailwind, CSS Modules, Styled Components | Testing: Jest, Cypress, Playwright | Build: Webpack, Vite, Turbopack" is scannable and organized`,
      `**Include portfolio and GitHub links prominently** — Place them in your header. Frontend work is visual — let hiring managers see your components, animations, and responsive layouts in action`,
    ],
  },
  'web-developer': {
    intro: `Web developer resumes need to demonstrate both creative and technical capabilities. Unlike specialized frontend or backend roles, web developers are often hired to own entire websites end-to-end:`,
    tips: [
      `**Show the full lifecycle** — Web developers who mention SEO optimization, performance tuning, hosting setup, and analytics implementation demonstrate broader value than those who only list coding skills`,
      `**Include CMS and site builder experience** — WordPress, Shopify, Webflow, and Squarespace expertise is highly relevant for web developer roles. List platforms, themes you have customized, and plugins you have developed`,
      `**Mention responsive design as a core skill** — Include specific breakpoints you have designed for, mobile-first approaches, and cross-browser testing methods. This is table stakes but often overlooked on resumes`,
      `**Add client or project variety** — Web developers often work across industries. List project types (e-commerce, portfolio, SaaS landing page, non-profit) to show versatility`,
      `**Link to live sites** — Working URLs are the strongest proof of web development skill. Include 3-5 links to your best deployed projects. If client work is under NDA, describe the project type and your technical contribution`,
      `**SEO awareness is a differentiator** — Mention Core Web Vitals, structured data, meta tag optimization, and page speed optimization. Web developers who understand SEO are significantly more valuable`,
    ],
  },
  'devops-engineer': {
    intro: `DevOps engineering resumes must balance breadth of tooling knowledge with depth of operational impact. Avoid the "tool dump" format that lists 30 technologies without context:`,
    tips: [
      `**Organize tools by function, not alphabetically** — "CI/CD: Jenkins, GitHub Actions, ArgoCD | IaC: Terraform, Ansible, CloudFormation | Monitoring: Datadog, PagerDuty, Grafana | Containers: Docker, Kubernetes, Helm" gives instant clarity`,
      `**Lead bullets with operational metrics** — Deployment frequency, MTTR, change failure rate, and uptime percentages are the DORA metrics that DevOps managers evaluate. Include them prominently`,
      `**Show automation impact** — "Automated deployment pipeline reducing release time from 4 hours to 15 minutes" proves you deliver the core DevOps value proposition. Quantify time saved, errors eliminated, and manual steps removed`,
      `**Include on-call and incident experience** — Mention your on-call rotation, incident response process involvement, and post-mortem contributions. These demonstrate operational maturity`,
      `**Certifications in the header or a dedicated section** — AWS, GCP, Azure, and Kubernetes certifications are significant hiring signals in DevOps. List certification name, ID, and date earned`,
    ],
  },
  'data-scientist': {
    intro: `Data science resumes sit between academia and industry — your format needs to demonstrate both rigorous methodology and business impact:`,
    tips: [
      `**Lead with business outcomes, not model architectures** — "Built a churn prediction model that identified 2,300 at-risk accounts, enabling a retention campaign that saved $1.8M" beats "Implemented XGBoost with hyperparameter tuning achieving 0.91 AUC"`,
      `**Include a "Methods & Tools" section** — Group by: Languages (Python, R, SQL), ML Frameworks (scikit-learn, TensorFlow, PyTorch), Visualization (Tableau, Matplotlib), and Cloud (SageMaker, Databricks, BigQuery)`,
      `**Mention deployment, not just development** — If your models serve production predictions, say so. "Deployed real-time fraud detection model serving 5K predictions/second via FastAPI" separates industry data scientists from notebook-only analysts`,
      `**Publications and patents deserve their own section** — If you have peer-reviewed publications, conference presentations, or patents, create a dedicated section. Include citation counts if notable`,
      `**Keep education prominent if you have an advanced degree** — PhD and Master's degrees in quantitative fields are genuine differentiators. Place Education before Experience if your degree is from a recognized program and you have <5 years of industry experience`,
    ],
  },
  'data-engineer': {
    intro: `Data engineering resumes should read like infrastructure specifications — precise, scalable, and reliable. Avoid vague descriptions of "building pipelines":`,
    tips: [
      `**Quantify every pipeline** — Include data volume (rows/day, TB processed), latency (batch/real-time), SLA (99.9% uptime), and downstream consumers. "Built a Spark pipeline processing 2TB daily for the analytics team" is specific; "built data pipelines" is not`,
      `**List your data platform stack precisely** — "Orchestration: Airflow | Transform: dbt, Spark | Storage: S3, Snowflake | Streaming: Kafka, Flink" tells managers exactly where you fit`,
      `**Show data quality and governance work** — Mention data validation frameworks, schema evolution strategies, data catalog contributions, and monitoring/alerting implementations. These are senior-level differentiators`,
      `**Include both batch and streaming experience** — Modern data engineering requires both. If you have only batch experience, mention real-time aspirations in your summary. If you have both, highlight streaming prominently`,
      `**Infrastructure-as-code for data** — Mention Terraform for infrastructure, dbt for transformation logic, and version-controlled SQL. Data engineers who treat infrastructure like code are in high demand`,
    ],
  },
  'data-analyst': {
    intro: `Data analyst resumes need to demonstrate that your analysis drives decisions, not just reports. Format your resume to show influence alongside technical skill:`,
    tips: [
      `**Frame every analysis as a business question answered** — "Analyzed customer funnel data to identify a 23% mobile drop-off, leading to a UX redesign that recovered $300K in quarterly revenue" is far stronger than "Performed funnel analysis"`,
      `**Separate "Tools" from "Methods"** — "Tools: SQL, Python, Tableau, Excel, Google Analytics | Methods: A/B Testing, Regression Analysis, Cohort Analysis, Customer Segmentation" shows both capability and methodology`,
      `**Include dashboard and reporting portfolio** — If you have built Tableau or Looker dashboards, include screenshots in your portfolio or mention user adoption metrics: "Built 12 executive dashboards with 85% weekly active usage"`,
      `**Show stakeholder communication** — Mention presenting to leadership, writing executive summaries, or translating data findings for non-technical audiences. Analysts who influence decisions are more valuable than analysts who only run queries`,
      `**Education and certifications matter more here than in engineering** — Google Data Analytics Certificate, Tableau Desktop Specialist, or a statistics degree should be placed prominently. Include relevant coursework if early career`,
    ],
  },
  'product-manager': {
    intro: `Product manager resumes must prove you can think strategically and execute operationally. Your format should show outcomes, not just features launched:`,
    tips: [
      `**Structure each role as "Product → Outcome"** — Start with what you owned ("Led the self-service onboarding product for SMB segment") then show results ("Reduced time-to-value from 14 days to 2 days, increasing trial-to-paid conversion by 18%")`,
      `**Include a "Products" or "Portfolio" section** — List the products you have owned with brief descriptions, user counts, and revenue impact. This is unique to PM resumes and immediately shows your scope`,
      `**Show cross-functional leadership** — Mention engineering team sizes you worked with, stakeholder groups you aligned, and go-to-market coordination. PM hiring managers evaluate your ability to lead without authority`,
      `**Metrics should be business metrics, not vanity metrics** — Revenue impact, conversion rates, retention improvements, and NPS changes matter more than feature counts or sprint velocities`,
      `**One to two pages, summary-driven** — Lead with a strong summary naming your product domain, company stage (startup/scale-up/enterprise), and biggest outcome. PMs are hired for judgment, and your summary is the first evidence of it`,
    ],
  },
  'project-manager': {
    intro: `Project manager resumes should demonstrate control and delivery. Your format needs to communicate organizational capability as clearly as a well-structured project plan:`,
    tips: [
      `**Lead with project scope metrics** — Budget managed, team size, timeline, and stakeholder count in the first line of each role. "$12M program across 3 workstreams with 45 team members and 8 stakeholders" immediately establishes your operating level`,
      `**Show methodology fluency** — Mention Agile, Waterfall, Hybrid, or SAFe explicitly. If you are PMP, CSM, or PMI-ACP certified, place certifications prominently near your name`,
      `**Include on-time and on-budget delivery rates** — "Delivered 12 of 14 projects on time and within budget" is the single most important metric for a PM resume`,
      `**Demonstrate risk management** — Include examples of risks identified, mitigated, or escalated. Risk awareness is a PM differentiator that most resumes miss entirely`,
      `**Tools in a dedicated section** — "Jira, Asana, MS Project, Smartsheet, Monday.com, Confluence, Miro" listed clearly shows you can operate in any project management environment`,
    ],
  },
  'nurse': {
    intro: `Nursing resumes are clinical documents — accuracy and structure matter as much as in your charting. Your format should mirror the precision expected in patient care:`,
    tips: [
      `**License and certifications first** — Place RN license (state, number, expiration), BSN/ADN, and specialty certifications (CCRN, CEN, CNOR) immediately after your name. Nursing recruiters verify credentials before reading anything else`,
      `**Unit type and patient acuity in every role** — "32-bed cardiac step-down unit" or "Level I trauma center ED" immediately tells hiring managers your clinical environment and acuity level`,
      `**Include patient ratios** — "Managed 1:4 patient ratio" is essential context that determines whether your experience matches the hiring unit. Never omit patient ratios from clinical roles`,
      `**Quantify quality metrics** — Patient satisfaction scores, fall rates, infection rates, medication error rates, and hand hygiene compliance percentages demonstrate quality-focused nursing practice`,
      `**Education should include clinical hours** — New graduates should list clinical rotation hours, preceptorship details, and simulation lab experience. Include the facility name and unit type for each rotation`,
      `**One page for <5 years, two pages maximum** — Travel nurses with many short assignments should group them: "Travel nurse assignments (2023-2025): 4 contracts across ICU, ER, and Med-Surg units in CA, TX, and FL"`,
    ],
  },
  'doctor': {
    intro: `Physician CVs follow academic medicine conventions that differ significantly from corporate resumes. Understanding these conventions is essential:`,
    tips: [
      `**Use CV format, not resume format** — Physicians submit curricula vitae, not one-page resumes. Include education, training, board certifications, licensure, clinical experience, publications, presentations, and professional memberships`,
      `**Board certification status prominently placed** — "Board Certified in Internal Medicine (ABIM, 2020)" should appear near the top. If board eligible, state your expected certification date`,
      `**Publications in proper citation format** — Use PubMed-standard formatting. List all publications with full author list, journal name, volume, and year. Most recent first`,
      `**Clinical volume and outcomes** — Patient panel size, procedure counts, quality metrics (HEDIS scores, patient satisfaction), and RVU production if relevant to the role`,
      `**Separate sections for Education, Training, Licensure, Board Certification** — These are distinct sections in physician CVs, not combined as in other industries`,
      `**CME and professional development** — Include recent continuing medical education, grand rounds presentations, and committee memberships. These demonstrate ongoing engagement with the medical community`,
    ],
  },
  'accountant': {
    intro: `Accounting resumes should be as precise as a clean balance sheet — numbers accurate, format consistent, nothing out of place:`,
    tips: [
      `**CPA status in your header** — If you hold a CPA license, it should appear immediately after your name: "Jane Smith, CPA." If pursuing, note "CPA Candidate" with expected exam completion date`,
      `**Name your ERP platforms** — "NetSuite (5 years), SAP (3 years), QuickBooks Enterprise (7 years)" is more valuable than "proficient in multiple ERP systems." Accounting hiring is platform-specific`,
      `**Show close cycle improvements** — "Reduced month-end close from 12 business days to 6" is the most relevant metric for accounting resumes. Include your close timeline in every applicable role`,
      `**Include audit outcomes** — "Clean audit opinions for 4 consecutive years" or "Supported SOX 404 compliance with zero material weaknesses" demonstrates accuracy and compliance capability`,
      `**Technical skills section should include** — GAAP/IFRS knowledge, specific tax software (UltraTax, Lacerte), Excel proficiency level (pivot tables, VLOOKUP, macros), and any data analysis tools (Power BI, Alteryx)`,
    ],
  },
  'financial-analyst': {
    intro: `Financial analyst resumes must communicate analytical precision and business influence. Your format should demonstrate you think in models, not just spreadsheets:`,
    tips: [
      `**Quantify the models you have built** — "Created a 3-year DCF model for a $200M acquisition" or "Built monthly variance analysis covering 15 cost centers totaling $50M" shows model complexity and business scope`,
      `**Show forecast accuracy** — "Revenue forecasts achieved 97% accuracy against actuals over 8 quarters" is the most compelling metric for an FP&A resume. Include your track record`,
      `**Name your tools precisely** — "Advanced Excel (financial modeling, pivot tables, VBA macros), Bloomberg Terminal, Capital IQ, Tableau, SQL, Power BI" covers the analyst toolkit comprehensively`,
      `**Include deal or project involvement** — M&A due diligence, IPO preparation, or capital allocation analysis shows strategic exposure beyond routine reporting`,
      `**Education and certifications near the top** — CFA progress (Level I/II/III), MBA, or Master's in Finance are significant differentiators. Include GPA if above 3.5 from a recognized program`,
    ],
  },
  'sales-manager': {
    intro: `Sales management resumes are scorecards. Your format should make your team's performance and your leadership contribution immediately visible:`,
    tips: [
      `**Team quota attainment in the first line of each role** — "Led a team of 12 AEs to 118% of a $15M annual quota" is the most important data point on your resume. Make it impossible to miss`,
      `**Show team development alongside numbers** — "Promoted 3 SDRs to AE roles, hired 5 new reps, reduced ramp time from 6 months to 3 months" demonstrates you build teams, not just manage quotas`,
      `**Include your sales methodology** — "Implemented MEDDIC across the team, improving qualification accuracy and increasing average deal size by 22%" shows strategic capability`,
      `**Territory and segment detail** — "Managed Mid-Market segment ($50K-$500K ACV) across the Eastern US territory" gives recruiters immediate fit assessment`,
      `**Pipeline management and forecasting** — "Maintained 3.5x pipeline coverage with forecast accuracy within 5% for 6 consecutive quarters" proves operational discipline that VPs of Sales prioritize`,
    ],
  },
  'sales-representative': {
    intro: `Sales rep resumes are performance records. Format yours like a quarterly business review — results first, details second:`,
    tips: [
      `**Quota attainment as a headline metric** — "Exceeded quota in 7 of 8 quarters, averaging 115% attainment against a $750K annual target" should be the first thing hiring managers see`,
      `**Include deal complexity** — Average deal size, sales cycle length, and stakeholder levels you sell to (VP, C-suite, procurement) differentiate enterprise reps from transactional sellers`,
      `**Show prospecting methodology** — "Generated 40% of pipeline through outbound prospecting (cold email, LinkedIn, trade shows)" demonstrates self-sourcing capability that hiring managers value`,
      `**Awards and rankings** — "President's Club 2024, 2025" or "Ranked #2 of 25 reps nationally" belongs in a prominent position. Sales recognition is a strong hiring signal`,
      `**CRM and sales tools** — Salesforce, HubSpot, Outreach, Gong, and LinkedIn Sales Navigator are expected. List them, but lead with results, not tools`,
    ],
  },
  'customer-service': {
    intro: `Customer service resumes should be as clear and organized as the support you provide. Format yours to highlight service metrics, not just job duties:`,
    tips: [
      `**Lead with your CSAT score** — "Maintained a 96% customer satisfaction score across 2,000+ interactions" is the most powerful opening line for a customer service resume. Include the measurement method if possible`,
      `**Show volume and channel diversity** — "Handled 65+ inquiries daily across phone, email, live chat, and social media" demonstrates multi-channel capability and throughput`,
      `**Include resolution metrics** — First-call resolution rate, average handle time, and escalation rate tell managers exactly how effective you are. If these improved over your tenure, show the before and after`,
      `**Mention specific tools** — Zendesk, Salesforce Service Cloud, Freshdesk, Intercom, or Five9 — name the platforms you have used. Customer service hiring is increasingly tech-dependent`,
      `**Show recognition** — "Named Top Agent Q3 2025 (out of 50 agents)" or "Selected to train new hires based on quality score performance" demonstrates peer-leading capability`,
    ],
  },
  'graphic-designer': {
    intro: `Your resume is a design artifact — it should demonstrate the same visual sensibility you bring to client work while remaining ATS-compatible:`,
    tips: [
      `**Portfolio link in your header — non-negotiable** — Behance, Dribbble, or personal portfolio URL must be the first thing after your name and contact info. Without a visible portfolio link, most design hiring managers stop reading`,
      `**Tasteful design within ATS constraints** — Use consistent typography, subtle brand colors, and clean alignment — but avoid graphics, images, text boxes, or multi-column layouts that ATS software cannot parse`,
      `**Show software proficiency precisely** — "Adobe Creative Suite: Photoshop (expert), Illustrator (expert), InDesign (advanced), After Effects (intermediate) | Figma (expert) | Sketch (advanced)" is scannable and honest`,
      `**Include client types and project scope** — "Designed brand identity systems for 15+ clients across tech, hospitality, and healthcare sectors" shows breadth. Mention notable brand names if permitted`,
      `**Awards and recognition in a dedicated section** — Design awards (AIGA, Communication Arts, D&AD), publications, and speaking engagements carry significant weight in design hiring`,
    ],
  },
  'marketing-manager': {
    intro: `Marketing manager resumes should demonstrate strategic thinking alongside execution capability. Format yours to show you drive revenue, not just campaigns:`,
    tips: [
      `**Budget and team size in each role header** — "Marketing Manager | $2M annual budget | 8 direct reports" immediately establishes your management scope. Include this information before your bullet points`,
      `**Revenue attribution in your top 3 bullets** — "Generated $3.2M in attributable pipeline through integrated campaign strategy across paid, organic, email, and events" connects marketing to business outcomes`,
      `**Channel performance breakdown** — "Paid Search: $800K budget, 4.2x ROAS | Email: 250K subscribers, 22% open rate | Content: 150K monthly organic sessions" shows channel-level competence`,
      `**Show marketing technology stack** — HubSpot, Marketo, Google Ads, Meta Ads Manager, Salesforce, Google Analytics 4 — name every platform with your proficiency level`,
      `**One to two pages, results-dense** — Marketing managers should aim for the highest ratio of metrics-to-text possible. Every bullet should include at least one number`,
    ],
  },
  'executive-assistant': {
    intro: `Executive assistant resumes must convey discretion, organizational mastery, and executive-level judgment — your format should reflect the professionalism of the executives you support:`,
    tips: [
      `**Name the executive level you supported** — "Executive Assistant to the CEO" or "Supported 3 C-suite executives (CEO, CFO, COO)" immediately establishes your operating level`,
      `**Show scope of responsibility** — Calendar management for 100+ meetings monthly, travel coordination across 12 countries, board meeting preparation, and confidential document handling demonstrate breadth`,
      `**Tools with specific proficiency** — "Microsoft 365 (expert), Concur Travel, SAP Concur Expense, Zoom/Teams event hosting, Salesforce (basic), SharePoint administration" shows enterprise tool competence`,
      `**Confidentiality and judgment** — "Managed confidential board materials and M&A documentation for 3 acquisitions" signals the trust level you have earned. This is a unique differentiator for EA resumes`,
      `**Clean, conservative format** — Executive assistants represent their executives. Use a polished, professional template with no design flourishes. Consistent formatting, perfect grammar, and flawless spelling are non-negotiable`,
    ],
  },
  'receptionist': {
    intro: `Receptionist resumes should be as welcoming and organized as you are at the front desk. Format yours to show volume capacity and professionalism:`,
    tips: [
      `**Volume metrics in the first bullet** — "Managed a multi-line phone system handling 120+ calls daily while greeting 40+ walk-in visitors" immediately establishes your throughput capacity`,
      `**Name your phone and scheduling systems** — Multi-line phone systems, VoIP platforms, scheduling software (Calendly, Acuity, SimplePractice), and visitor management systems should be listed specifically`,
      `**Show accuracy and reliability** — "Maintained 98% scheduling accuracy across 200+ weekly appointments" and "Zero missed days over 18 months" demonstrate the dependability hiring managers prioritize`,
      `**Include industry context** — Medical office, law firm, corporate HQ, and dental practice receptions require different skills. Name your industry and the specific workflows you managed`,
      `**One page, clean format** — Receptionists are organizational professionals. Your resume should reflect that with clear sections, consistent formatting, and easy-to-scan bullet points`,
    ],
  },
  'warehouse-worker': {
    intro: `Warehouse resumes are evaluated on throughput, accuracy, and safety — your format should present these metrics prominently:`,
    tips: [
      `**Pick rate and accuracy as headline metrics** — "Pick rate: 120 units/hour (target: 95). Accuracy rate: 99.7%. Zero safety incidents over 18 months." Lead with the numbers that operations managers evaluate`,
      `**Equipment certifications prominently listed** — Forklift (sit-down, stand-up, reach), order picker, pallet jack, and RF scanner certifications should be in a dedicated section near the top`,
      `**Name your WMS platform** — Manhattan Associates, SAP EWM, NetSuite WMS, or Blue Yonder. Warehouse hiring is increasingly system-specific, and named experience gets priority`,
      `**Physical capabilities without overstating** — "Comfortable lifting 50+ lbs repeatedly" and "Standing/walking for 10-hour shifts" addresses physical requirements that warehouse managers need confirmed`,
      `**Safety record as a section or prominent bullet** — "Zero OSHA recordable incidents" and any safety committee participation should be visible. Warehouse operations are safety-critical environments`,
    ],
  },
  'truck-driver': {
    intro: `Trucking resumes are qualification documents — your CDL, endorsements, and safety record must be immediately visible. Format for rapid qualification screening:`,
    tips: [
      `**CDL class and endorsements in your header** — "CDL-A | Hazmat | Tanker | Doubles/Triples" should appear directly below your name. Dispatchers and fleet managers check qualifications before reading anything else`,
      `**Safety record prominently displayed** — "500,000+ accident-free miles" or "8 years clean MVR" is the most important metric on a trucking resume. Place it in your summary or first bullet`,
      `**Equipment types operated** — "53' dry van, refrigerated trailer, flatbed, tanker" tells carriers exactly what you can drive from day one. Include gross weight ratings if relevant`,
      `**Route experience** — "OTR (48 states), regional (Southeast), dedicated (Walmart DC to store)" specifies your routing experience. Carriers hire for specific route types`,
      `**ELD and technology compliance** — Mention your ELD platform (KeepTruckin, Samsara, Omnitracs), GPS navigation, and any dashcam systems. Technology adoption matters to modern carriers`,
    ],
  },
  'construction-worker': {
    intro: `Construction resumes should be built as solidly as the projects you work on. Lead with certifications, safety record, and trade-specific skills:`,
    tips: [
      `**OSHA certification at the top** — "OSHA 30-Hour Construction Safety" should appear near your name. OSHA 10 is minimum; OSHA 30 signals advanced safety training that general contractors require for lead positions`,
      `**Trade skills organized by category** — "Concrete: forming, pouring, finishing | Carpentry: framing, trim, cabinetry | Equipment: excavator, skid steer, laser level" makes your capabilities scannable`,
      `**Project types and values** — "Worked on commercial projects totaling $15M+ including office buildings, retail spaces, and warehouse facilities" establishes your experience level`,
      `**Crew size and leadership** — "Led a 6-person crew on concrete foundation work" or "Supervised apprentices on finish carpentry" shows progression toward foreman or superintendent roles`,
      `**Physical certifications and clearances** — Fall protection, scaffolding, confined space, rigging, and first aid/CPR certifications are hiring requirements, not optional additions. List every current certification`,
    ],
  },
  'teacher': {
    intro: `Teaching resumes should demonstrate pedagogical impact and classroom leadership. Format yours to show student outcomes, not just lesson plans:`,
    tips: [
      `**Grade level and subject at the top** — "5th Grade Mathematics Teacher, PS 123, Brooklyn, NY" immediately establishes your teaching context. Include school demographics if they strengthen your candidacy`,
      `**Student growth data prominently featured** — "Students achieved 18% improvement in state math proficiency scores" or "Average 1.5 grade levels of reading growth on MAP assessments" proves instructional effectiveness`,
      `**Teaching certifications in a dedicated section** — State teaching license (with endorsements), Praxis scores, National Board Certification, ESL/bilingual endorsements, and special education qualifications should be clearly listed`,
      `**Differentiation and inclusion evidence** — "Managed a class of 28 including 5 IEP students and 8 ELL students" demonstrates your ability to teach diverse learners`,
      `**Professional development and leadership** — Curriculum committee membership, grade-level team lead, mentoring of student teachers, and technology integration initiatives show engagement beyond the classroom`,
    ],
  },
  'chef': {
    intro: `Culinary resumes should balance creative vision with operational rigor — you manage both flavor profiles and food cost percentages:`,
    tips: [
      `**Kitchen role and volume in the header** — "Executive Chef | 400 Covers/Night | 15-Person Kitchen" immediately establishes your operating scale. Include restaurant name and cuisine type`,
      `**Food cost and labor cost percentages** — "Maintained 28% food cost against a 32% industry average" is the financial metric that restaurant owners evaluate first. Include labor cost if you manage scheduling`,
      `**Menu development as portfolio** — "Developed 4 seasonal menus per year featuring 40+ original dishes" shows creative output. Mention any signature dishes, press coverage, or awards`,
      `**Health inspection and safety record** — "3 consecutive perfect health inspections (scores 98+)" demonstrates the sanitation standards that every kitchen must maintain`,
      `**Team development** — "Trained 20+ line cooks; 5 promoted to sous chef positions" shows you develop talent, not just manage bodies. Culinary mentorship is a valued leadership trait`,
    ],
  },
  'bartender': {
    intro: `Bartending resumes should showcase both creative and commercial skills. Format yours to highlight revenue contribution alongside cocktail expertise:`,
    tips: [
      `**Nightly sales volume as a headline** — "$2,800 average nightly sales" or "Ranked #1 in bar revenue 4 of 6 months" immediately demonstrates your revenue contribution`,
      `**Venue type and capacity** — "High-volume cocktail bar (200-seat capacity)" or "Fine dining restaurant (80 covers/night)" establishes your service environment and pace`,
      `**Certifications near the top** — TIPS or ServSafe Alcohol certification, state bartending license, and any craft cocktail certifications should be prominently listed`,
      `**Specialty skills section** — "Craft cocktails (50+ original recipes), wine service (WSET Level 2), draft beer systems, speed pouring (200+ drinks/shift)" shows both depth and speed`,
      `**Upselling and customer retention** — "Maintained 40% premium liquor call rate" and "Built a regular clientele base generating 30% of weekly revenue" demonstrate commercial awareness`,
    ],
  },
  'security-guard': {
    intro: `Security resumes must convey reliability, training, and situational awareness. Format yours to demonstrate you are qualified, alert, and trustworthy:`,
    tips: [
      `**State license and certifications first** — Guard card number, armed/unarmed classification, CPR/First Aid, and any specialized certifications (fire watch, CCTV, access control) should appear near your name`,
      `**Facility type and scale** — "500,000 sq ft corporate campus with 2,000 daily occupants" or "24-hour residential community (350 units)" tells hiring managers your experience level`,
      `**Incident handling without security-sensitive details** — "Responded to 30+ incidents monthly including trespassing, theft, and medical emergencies with a 90% de-escalation success rate" shows effectiveness without compromising security protocols`,
      `**Patrol and monitoring specifics** — "Conducted 12 patrol rounds per 8-hour shift covering interior and exterior checkpoints" and "Monitored 40+ CCTV feeds with zero missed security events" demonstrate diligence`,
      `**Clean background as an implicit qualification** — Security roles require background checks. Focus your resume on professional qualifications and incident management, which hiring managers prioritize alongside background clearance`,
    ],
  },
  'real-estate-agent': {
    intro: `Real estate resumes are production reports — your transaction volume, deal sizes, and client satisfaction tell your professional story:`,
    tips: [
      `**Transaction volume as a headline** — "42 transactions totaling $18.5M in 2025" should be the first metric on your resume. Real estate hiring is fundamentally production-based`,
      `**Specialization clearly stated** — "Residential specialist: first-time homebuyers and move-up market ($300K-$800K)" or "Commercial focus: office and retail leasing in downtown metro" helps brokerages assess fit`,
      `**Client satisfaction and referral metrics** — "95% client satisfaction, 40% repeat/referral business, 4.9-star average Google review" proves relationship quality beyond transaction counts`,
      `**Designations and licenses** — CRS, ABR, GRI, SRES, or other NAR designations should be listed after your name. Multi-state licensure should be noted prominently`,
      `**Marketing innovation** — "Launched a YouTube property tour channel with 5K subscribers generating 10+ monthly buyer inquiries" or "Implemented virtual staging reducing average days on market by 15" shows modern marketing capability`,
    ],
  },
  'property-manager': {
    intro: `Property management resumes should demonstrate financial stewardship alongside tenant relationship management. Format yours like a portfolio performance report:`,
    tips: [
      `**Portfolio size as a headline** — "12 multifamily properties, 850 units, $120M total value" immediately establishes your management scope. Include both unit count and portfolio value`,
      `**Occupancy and NOI metrics prominently** — "96% average occupancy, 12% NOI improvement YoY" are the two numbers property owners evaluate first. Include them in your summary or first bullet`,
      `**Property management software** — Yardi, AppFolio, RealPage, Buildium, or MRI Software experience should be listed specifically. Property management is increasingly technology-driven`,
      `**Maintenance and capital project management** — "Managed $500K annual maintenance budget, coordinated 3 capital improvement projects totaling $1.2M" shows operational and financial management`,
      `**Regulatory compliance** — Fair housing, lease compliance, eviction procedures, and local tenant law knowledge should be mentioned. Property managers operate in heavily regulated environments`,
    ],
  },
  'hvac-technician': {
    intro: `HVAC resumes should demonstrate technical certification, equipment range, and service reliability. Format for rapid qualification verification:`,
    tips: [
      `**EPA certification type in your header** — "EPA 608 Universal" should appear prominently. NATE certification, if held, is a significant differentiator that deserves header placement`,
      `**Equipment brands and system types** — "Carrier, Trane, Lennox, Daikin | Split systems, packaged units, VRF, mini-splits, commercial rooftop units" tells shops exactly what you can work on from day one`,
      `**Service metrics** — "8 service calls daily, 92% first-time fix rate" demonstrates both speed and diagnostic accuracy. If you exceed benchmarks, include the comparison`,
      `**Installation experience with tonnage** — "Installed 50+ residential systems (2-5 ton) and 12 commercial units (10-25 ton)" establishes your installation scope alongside service work`,
      `**Specialized skills section** — "Refrigerant recovery, brazing, electrical diagnostics, sheet metal fabrication, building automation systems, ductwork design" covers the full HVAC technical range`,
    ],
  },
  'personal-trainer': {
    intro: `Personal trainer resumes should prove you get results for clients and generate revenue for gyms. Format yours to show both training outcomes and business metrics:`,
    tips: [
      `**Certification prominently placed** — "NASM-CPT" or "ACE Certified Personal Trainer" or "NSCA-CSCS" should appear after your name. Include specialty certifications (corrective exercise, performance enhancement, nutrition)`,
      `**Client retention as a headline metric** — "35 active clients with 90% 6-month retention rate (gym average: 55%)" is the metric that gym owners and fitness directors evaluate first`,
      `**Transformation results** — "Helped 15+ clients achieve documented goals: 20+ lb weight loss, marathon completion, post-surgery rehabilitation milestones" proves you deliver outcomes`,
      `**Revenue contribution** — "Generated $8,500 monthly in personal training revenue" or "Increased PT department revenue by 25% through client acquisition and retention" speaks to business impact`,
      `**Specialties and populations** — "Specializations: weight loss, sports performance, senior fitness, pre/postnatal, rehabilitation" shows the populations you can serve and the programs you can design`,
    ],
  },
  'intern': {
    intro: `Intern resumes emphasize potential over experience. Format yours to highlight initiative, applied learning, and transferable skills:`,
    tips: [
      `**Education section first** — Unlike experienced professionals, interns should lead with education: university, major, GPA (if above 3.3), relevant coursework, and expected graduation date`,
      `**Projects and leadership over job history** — "Led a 5-person team in a semester-long business case competition" demonstrates more than "Worked at a retail store part-time." Prioritize projects, organizations, and competitions`,
      `**Skills section with honest proficiency levels** — "Python (intermediate), Excel (advanced), SQL (beginner), Tableau (intermediate)" is more trustworthy than listing every tool you have touched`,
      `**Strictly one page** — Intern resumes should never exceed one page. If you are struggling to fill the page, add relevant coursework, volunteer work, and personal projects — but do not stretch margins or reduce font size below 10pt`,
      `**Tailor aggressively for each application** — Generic intern resumes get lost. Mirror the company's language, mention their products, and connect your coursework to their business`,
    ],
  },
  'social-worker': {
    intro: `Social work resumes must balance clinical competence with empathetic practice. Format yours to demonstrate both caseload capacity and client outcomes:`,
    tips: [
      `**License type immediately after your name** — "Jane Smith, LCSW" or "John Doe, LMSW" is the standard format. Include your license number and state if applying outside your current jurisdiction`,
      `**Caseload size and population in each role** — "Managed caseload of 45 child welfare cases" or "Provided individual and group therapy to 30 adults with substance use disorders" establishes your clinical scope`,
      `**Intervention modalities** — "CBT, DBT, motivational interviewing, trauma-informed care, crisis intervention" should be listed in a clinical skills section. Employers match modalities to their program needs`,
      `**Outcome metrics** — "78% successful case closure rate" and "Reduced recidivism by 25% through intensive case management" demonstrate evidence-based practice effectiveness`,
      `**Supervision and training** — If you provide clinical supervision to MSW interns or facilitate staff training, include supervision hours and training topics. This signals readiness for leadership roles`,
    ],
  },
  'event-planner': {
    intro: `Event planner resumes should showcase logistics mastery alongside creative vision. Format yours to demonstrate you can manage complexity at scale:`,
    tips: [
      `**Event scale as a headline** — "35+ events annually, 50-2,000 attendees, budgets $10K-$500K" immediately establishes your experience range. Include both minimum and maximum to show versatility`,
      `**Budget management precision** — "Delivered 92% of events under budget with average savings of 5%" proves financial discipline. Include total budget managed annually`,
      `**Event types and variety** — "Corporate conferences, product launches, galas, weddings, non-profit fundraisers, trade shows" shows you can adapt to different event formats and client expectations`,
      `**Vendor network** — "Managed relationships with 50+ vendors across catering, A/V, florals, entertainment, and venues" demonstrates your professional network — a core asset for event planners`,
      `**Technology and tools** — "Cvent, Eventbrite, Social Tables, Canva, Monday.com" and virtual event platforms (Hopin, Zoom Events) show you can manage both in-person and hybrid events`,
    ],
  },
};

// Category-level fallback generators for slugs not in SLUG_TIPS
function getCategoryFormatTips(slug, jobTitle, category, skills) {
  const skill1 = skills?.[0] || 'core competencies';
  const skill2 = skills?.[1] || 'industry tools';

  // Hash slug to select variation within category
  const hash = slug.split('').reduce((a, c) => a + c.charCodeAt(0), 0);

  const variations = {
    'Technology': [
      {
        intro: `${jobTitle} resumes in the technology sector must demonstrate both technical depth and practical impact. Your format should make your capabilities scannable in under 10 seconds:`,
        tips: [
          `**Technical skills section organized by domain** — Group your technologies: "${skill1}, ${skill2}" under clear categories (Languages, Frameworks, Cloud, Databases, Tools) rather than a random list`,
          `**Metrics in every experience bullet** — System scale, user counts, performance improvements, and uptime percentages transform generic descriptions into evidence of impact`,
          `**GitHub or portfolio link in your header** — Technical hiring managers increasingly check your code or project portfolio. Make the link impossible to miss`,
          `**Reverse-chronological format** — Technology moves fast. Lead with your most recent role to show your current stack is relevant`,
          `**One page for <5 years experience, two pages maximum** — Ruthlessly cut outdated technologies and irrelevant early-career roles. Quality over quantity`,
        ],
      },
      {
        intro: `A strong ${jobTitle} resume communicates technical capability through evidence, not claims. Structure yours to prove every skill you list:`,
        tips: [
          `**Every technology claim needs a context** — Instead of listing "${skill1}" alone, pair it with usage: "${skill1} (3 years, production applications serving 10K+ users)." Context prevents resume inflation`,
          `**Project descriptions should include architecture** — "Designed a microservices architecture with 8 services communicating via gRPC" is more informative than "worked on backend systems"`,
          `**Include your development environment and workflow** — Git branching strategy, CI/CD pipeline, testing approach, and code review process signal professional development practices`,
          `**ATS-compatible format is essential** — Even engineering roles use automated screening. Use standard section headers, avoid tables and graphics, and include both acronyms and full terms`,
          `**Tailor for each role** — Mirror the exact technology names from the job posting. "React.js" vs "React" vs "ReactJS" matters for keyword matching`,
        ],
      },
    ],
    'Engineering': [
      {
        intro: `${jobTitle} resumes must demonstrate technical precision alongside project management capability. Format yours to show engineering judgment:`,
        tips: [
          `**PE or EIT status prominently displayed** — Professional licensure is a career-defining credential in engineering. Place "PE" or "EIT" after your name if applicable`,
          `**Project types, scales, and standards** — "Designed [systems] for a $50M [project type] under [applicable code/standard]" tells hiring managers your exact experience level`,
          `**Software proficiency** — Name specific engineering tools: AutoCAD, SolidWorks, ANSYS, MATLAB, Revit, Civil 3D, or discipline-specific software with proficiency levels`,
          `**Include project values and scope** — Dollar amounts, capacity ratings, team sizes, and timeline adherence demonstrate your operating level`,
          `**Certifications and continuing education** — Professional development courses, specialized training, and industry certification maintenance show commitment to your discipline`,
        ],
      },
      {
        intro: `Engineering hiring managers evaluate ${jobTitle} candidates on technical competence, project experience, and professional credentials. Your format should address all three:`,
        tips: [
          `**List applicable codes and standards** — ASME, IEEE, ASTM, NEC, IBC, or discipline-specific regulatory frameworks you work within. Compliance knowledge is a fundamental engineering qualification`,
          `**Quantify design outcomes** — Cost savings from design optimization, performance improvements, safety factor achievements, or efficiency gains from your engineering work`,
          `**Cross-disciplinary coordination** — "Coordinated with structural, mechanical, and electrical teams on a $25M hospital expansion" shows you work effectively in multi-discipline environments`,
          `**Publications and patents if applicable** — Engineering patents, conference papers, or technical presentations in a dedicated section demonstrate thought leadership`,
          `**One to two pages, technically precise** — Use exact specifications and measurements where relevant. Engineering resumes should be as precise as engineering documents`,
        ],
      },
    ],
    'Healthcare': [
      {
        intro: `${jobTitle} resumes in healthcare are credential documents first, achievement records second. Your format must prioritize clinical qualifications:`,
        tips: [
          `**Licenses and certifications before experience** — Healthcare recruiters verify credentials first. Create a dedicated section listing license type, number, state, and expiration date`,
          `**Clinical setting and volume in each role** — "48-bed cardiac unit" or "outpatient clinic seeing 35 patients daily" immediately communicates your clinical environment and pace`,
          `**Patient outcome metrics** — Satisfaction scores, safety records, and quality improvement contributions demonstrate clinical excellence beyond basic competence`,
          `**EHR system proficiency** — Epic, Cerner, Meditech, or eClinicalWorks experience should be named specifically. Healthcare is increasingly technology-dependent`,
          `**Continuing education and specialty training** — Recent CE credits, specialty certifications, and professional development show you stay current with evolving clinical standards`,
        ],
      },
      {
        intro: `A strong ${jobTitle} resume demonstrates clinical competence through measurable outcomes. Healthcare hiring is increasingly data-driven:`,
        tips: [
          `**Certification credentials after your name** — "Jane Smith, RN, BSN, CCRN" or equivalent credentialing format is the standard in healthcare. This appears before anything else`,
          `**Patient-to-staff ratios** — Include ratios for every clinical role. "1:4 in ICU" or "12 patients per shift on med-surg" tells managers your acuity experience`,
          `**Quality and safety metrics** — Zero infection rates, fall prevention outcomes, medication error rates, and hand hygiene compliance percentages belong prominently on healthcare resumes`,
          `**Team-based care evidence** — "Collaborated with interdisciplinary team of physicians, PTs, OTs, and social workers" demonstrates the team orientation healthcare demands`,
          `**One to two pages** — New graduates should aim for one page. Experienced professionals with multiple certifications and clinical specialties may use two pages`,
        ],
      },
    ],
    'Finance': [
      {
        intro: `${jobTitle} resumes should demonstrate analytical precision and financial stewardship. Your format should be as clean as a well-organized ledger:`,
        tips: [
          `**Professional certifications prominently placed** — CPA, CFA, CFP, or EA credentials appear after your name. If in progress, note the expected completion timeline`,
          `**Financial systems named specifically** — SAP, Oracle, NetSuite, QuickBooks, Bloomberg, or Capital IQ experience should be listed with proficiency levels and years of use`,
          `**Dollar amounts for scope** — "Managed a $50M revenue budget" or "Prepared financial statements for a $200M portfolio" establishes your operating level immediately`,
          `**Regulatory and compliance track record** — Clean audit results, SOX compliance, regulatory examination outcomes, and internal control implementations demonstrate risk awareness`,
          `**Accuracy and timeline metrics** — "Reduced month-end close by 3 days" or "Achieved 98% forecast accuracy over 6 quarters" proves operational excellence`,
        ],
      },
    ],
    'Business': [
      {
        intro: `${jobTitle} resumes must demonstrate that you drive business outcomes, not just execute tasks. Format yours to show measurable impact:`,
        tips: [
          `**Revenue or efficiency impact in your summary** — Lead with your biggest business result. "Drove $2.1M in revenue growth through operational improvements" sets the tone immediately`,
          `**Scope of responsibility clearly defined** — Team size, budget, geographic coverage, and stakeholder count establish your management or analytical level`,
          `**Show methodology alongside results** — "Applied lean methodology to reduce operational costs by 15% ($800K annually)" connects approach to outcome`,
          `**Tools and platforms** — Name your analytical tools (Excel, SQL, Tableau, Power BI), project management tools (Jira, Asana), and any industry-specific platforms`,
          `**One to two pages focused on outcomes** — Every bullet should include a metric. Remove any bullet that only describes a responsibility without a measurable result`,
        ],
      },
    ],
    'Management': [
      {
        intro: `${jobTitle} resumes must demonstrate leadership capability alongside business results. Your format should show you develop teams while driving performance:`,
        tips: [
          `**Team size and performance metrics in each role** — "Managed a team of 20, achieving 115% of annual targets while reducing turnover from 25% to 12%" shows both results and people leadership`,
          `**Budget and P&L responsibility** — Include the financial scope you manage. "$5M operating budget" or "$15M P&L responsibility" establishes your management level`,
          `**People development evidence** — Promotions facilitated, training programs implemented, and succession planning contributions prove you invest in your team`,
          `**Strategic initiatives** — Process improvements, organizational changes, and cross-functional projects you led demonstrate strategic thinking beyond operational management`,
          `**One to two pages, accomplishment-driven** — Management resumes should emphasize what changed because of your leadership, not what existed before you arrived`,
        ],
      },
    ],
    'Sales': [
      {
        intro: `${jobTitle} resumes are performance scorecards. Your format should make quota attainment and deal metrics impossible to miss:`,
        tips: [
          `**Quota attainment percentage as the first data point** — "112% average quota attainment across 8 quarters" is the most important number on a sales resume. Make it prominent`,
          `**Deal metrics** — Average deal size, sales cycle length, win rate, and pipeline coverage ratios tell managers exactly how you sell and at what level`,
          `**Methodology and approach** — "Implemented MEDDIC qualification" or "Challenger sale approach" signals professional sales methodology`,
          `**Awards and rankings** — "President's Club 2024-2025" or "Ranked #3 of 40 reps" in a dedicated section. Sales recognition is a strong hiring signal`,
          `**CRM and sales tools** — Salesforce, HubSpot, Outreach, Gong, ZoomInfo, and LinkedIn Sales Navigator. Name them all — sales tech proficiency is expected`,
        ],
      },
    ],
    'Marketing': [
      {
        intro: `${jobTitle} resumes must connect creative execution to business metrics. Format yours to demonstrate measurable marketing impact:`,
        tips: [
          `**Channel performance with specific metrics** — "Google Ads: $100K monthly budget, 3.8x ROAS | Email: 45% open rate, 12% click rate | Organic: 200K monthly sessions" is far stronger than "managed digital campaigns"`,
          `**Budget management** — Include the total marketing budget you managed or influenced. Budget size establishes your responsibility level`,
          `**Marketing technology stack** — HubSpot, Marketo, Google Analytics 4, Meta Business Suite, Mailchimp, SEMrush — list every platform with your role (user, admin, implementer)`,
          `**Campaign results as portfolio items** — Name 2-3 specific campaigns with objectives, approach, and results. This functions like a mini case study section`,
          `**One to two pages, data-dense** — Marketing has become a quantitative discipline. Your resume should reflect that with metrics in every bullet point`,
        ],
      },
    ],
    'HR': [
      {
        intro: `${jobTitle} resumes should demonstrate that you drive people outcomes that impact business results. Format yours to show measurable HR impact:`,
        tips: [
          `**HR certifications after your name** — PHR, SPHR, SHRM-CP, or SHRM-SCP credentials belong in your name line. They signal professional commitment to the HR discipline`,
          `**People metrics prominently featured** — Turnover reduction, time-to-fill improvement, engagement score increases, and training effectiveness data prove your HR initiatives deliver results`,
          `**Employee population and scope** — "Supported 500 employees across 3 locations" or "Managed HR operations for a 2,000-person organization" establishes your operating level`,
          `**Compliance and regulatory track record** — "Zero EEOC complaints over 4 years" or "Successfully passed DOL audit" demonstrates risk management capability`,
          `**HRIS and HR technology** — Workday, ADP, BambooHR, Greenhouse, Lever, or other platforms should be named with your proficiency level`,
        ],
      },
    ],
    'Administrative': [
      {
        intro: `${jobTitle} resumes should demonstrate organizational excellence. Your format should be as clean and well-organized as the systems you manage:`,
        tips: [
          `**Volume and complexity metrics** — "Managed calendars for 5 executives, coordinated 200+ meetings monthly, processed 150+ expense reports" demonstrates your throughput capacity`,
          `**Software proficiency with detail** — "Microsoft 365 (advanced: pivot tables, VLOOKUP, mail merge), Google Workspace, SAP Concur, DocuSign" shows tool-level competence`,
          `**Process improvements** — Include at least one example of a system or process you improved: time saved, errors reduced, or satisfaction increased`,
          `**Reliability indicators** — Attendance record, years of tenure, or "zero missed deadlines" demonstrate the dependability that administrative roles require`,
          `**One page, pristine formatting** — Administrative professionals are judged on attention to detail. Formatting errors, inconsistent spacing, or typos on an admin resume are disqualifying`,
        ],
      },
    ],
    'Customer Service': [
      {
        intro: `${jobTitle} resumes should reflect the same clarity and helpfulness you bring to customer interactions. Format yours to show measurable service quality:`,
        tips: [
          `**CSAT or NPS score as a headline metric** — "96% customer satisfaction score across 3,000+ interactions" is the most compelling data point for any customer-facing resume`,
          `**Volume and channel coverage** — "65+ daily interactions across phone, email, live chat, and social media" demonstrates multi-channel capability and throughput`,
          `**Resolution metrics** — First-contact resolution rate, average handle time, and escalation rate tell managers your efficiency and effectiveness levels`,
          `**Platform proficiency** — Zendesk, Salesforce Service Cloud, Freshdesk, Intercom, or Five9 — name every support platform you have used`,
          `**Recognition and advancement** — "Named Top Agent Q3 2025" or "Selected to train 15 new hires" demonstrates performance that stands out among peers`,
        ],
      },
    ],
    'Retail': [
      {
        intro: `${jobTitle} resumes should demonstrate sales performance and customer engagement. Format yours to show measurable contributions to store success:`,
        tips: [
          `**Sales metrics prominently displayed** — Personal sales volume, conversion rate, average transaction value, and units per transaction tell retail managers your selling capability`,
          `**Store operations experience** — Inventory management, visual merchandising, opening/closing procedures, and cash handling demonstrate operational competence beyond selling`,
          `**Customer engagement indicators** — Loyalty program signups, customer return rates, or Google review scores show relationship-building ability`,
          `**Team contributions** — Training new associates, leading product knowledge sessions, or managing a specific department show leadership potential`,
          `**Availability and flexibility** — Weekends, evenings, holidays, and seasonal peak availability are real differentiators in retail. Mention them in your summary`,
        ],
      },
    ],
    'Logistics': [
      {
        intro: `${jobTitle} resumes in logistics must demonstrate operational efficiency and accuracy. Format yours to show you can handle volume while maintaining quality:`,
        tips: [
          `**Processing volume as a headline** — "2,000 orders/day" or "500 shipments/week" immediately establishes your operational scale`,
          `**Accuracy and quality metrics** — Order accuracy rates, shipping error percentages, and damage rates prove you maintain quality at speed`,
          `**Systems and technology** — WMS (Manhattan, SAP EWM), TMS (Oracle, MercuryGate), and ERP platforms should be named specifically`,
          `**Cost efficiency** — Cost per order, freight spend reduction, and labor productivity improvements demonstrate financial contribution`,
          `**Safety record** — "Zero OSHA recordable incidents" and any safety leadership or committee participation should be prominently featured`,
        ],
      },
    ],
    'Hospitality': [
      {
        intro: `${jobTitle} resumes should demonstrate both service excellence and operational capability. Format yours to show guest satisfaction alongside business metrics:`,
        tips: [
          `**Guest satisfaction scores prominently placed** — TripAdvisor ratings, Google review averages, or internal survey scores should appear in your summary or first bullet`,
          `**Revenue and cost metrics** — RevPAR, average check size, food cost percentage, or occupancy rates (depending on your role) demonstrate business acumen`,
          `**Service volume and team size** — "200 covers per night" or "35-person staff across FOH and BOH" establishes your operational scope`,
          `**Certifications** — Food safety, alcohol service, first aid, and any hospitality-specific certifications should be clearly listed`,
          `**Availability** — Evenings, weekends, holidays, and split shifts are expected. Mention your flexibility to demonstrate industry commitment`,
        ],
      },
    ],
    'Construction': [
      {
        intro: `${jobTitle} resumes must demonstrate safety, skill, and project experience. Format yours for rapid qualification assessment:`,
        tips: [
          `**OSHA and safety certifications at the top** — OSHA 10/30, first aid/CPR, and any specialized safety training (fall protection, confined space, rigging) are mandatory inclusions`,
          `**Project types and values** — "Commercial projects totaling $20M+" or "Residential builds averaging $500K" establishes your experience level and scope`,
          `**Trade skills organized clearly** — Group by category: structural, finishing, equipment operation, and safety. This makes your capabilities scannable`,
          `**Safety record** — "Zero lost-time incidents over [X] years" and any safety committee participation demonstrate your commitment to job site safety`,
          `**Equipment and tools** — Name every piece of major equipment you operate and any licenses or certifications required for them`,
        ],
      },
    ],
    'Creative': [
      {
        intro: `${jobTitle} resumes must be both visually polished and ATS-compatible. Your format is itself a design sample — make it count:`,
        tips: [
          `**Portfolio link in your header — mandatory** — Behance, Dribbble, personal website, or Vimeo URL. Creative hiring always includes work review; make it effortless to access`,
          `**Software proficiency with specificity** — Name exact tools with proficiency levels. "Figma (expert), Photoshop (advanced), After Effects (intermediate)" is honest and helpful`,
          `**Project types and client industries** — Show creative versatility through the variety of your project experience`,
          `**Awards and publications** — Design awards, featured work, speaking engagements, or published articles in a dedicated section carry significant weight`,
          `**ATS-friendly despite design ambition** — Use clean typography and subtle brand colors, but avoid graphics, images, or complex layouts that automated systems cannot parse`,
        ],
      },
    ],
    'Trades': [
      {
        intro: `${jobTitle} resumes are qualification documents. Format yours for rapid verification of certifications, skills, and safety record:`,
        tips: [
          `**Certifications and licenses first** — Trade licenses, EPA certifications, OSHA training, and specialized endorsements should appear near the top of your resume. Hiring is certification-driven in the trades`,
          `**Equipment and systems you work with** — Name specific brands, models, and system types. This tells employers exactly what you can operate from day one`,
          `**Safety record prominently featured** — Years without incidents, safety committee participation, and any safety awards demonstrate the reliability that employers prioritize`,
          `**Project types and scale** — Residential, commercial, industrial, and the scale of projects you have contributed to establish your experience level`,
          `**Continuing education** — Journeyman-to-master progression, new technology training, and manufacturer certifications show professional development`,
        ],
      },
    ],
    'Manufacturing': [
      {
        intro: `${jobTitle} resumes should demonstrate production efficiency, quality awareness, and safety compliance. Format yours to show measurable output:`,
        tips: [
          `**Production metrics as headline data** — Units per shift, machine utilization rate, or quality yield percentage tell manufacturing managers your capability level`,
          `**Equipment and machine types** — Name every machine type you operate with specific manufacturers and any CNC programming or PLC knowledge`,
          `**Quality and defect rates** — "99.2% first-pass yield" or "0.3% scrap rate across 18 months" proves you maintain quality at production speed`,
          `**Safety record and training** — OSHA training, lockout/tagout certification, and injury-free tenure should be prominently displayed`,
          `**Lean and continuous improvement** — Kaizen participation, 5S implementation, or Six Sigma methodology experience demonstrates manufacturing maturity`,
        ],
      },
    ],
  };

  const catVars = variations[category];
  if (catVars) {
    const idx = hash % catVars.length;
    return catVars[idx];
  }

  // Ultimate fallback
  return {
    intro: `A well-formatted ${jobTitle} resume communicates your qualifications clearly and efficiently. Here are formatting guidelines specific to this profession:`,
    tips: [
      `**Lead with your strongest qualification** — For ${jobTitle} roles, place your most relevant credential, achievement, or metric where it cannot be missed: in your summary or first experience bullet`,
      `**Name your tools and platforms** — "${skill1}" and "${skill2}" should be listed with context. Hiring managers need to know what you have used, how long, and at what proficiency level`,
      `**Quantify every achievement** — Numbers transform generic descriptions into evidence. Include volumes, percentages, dollar amounts, and timeframes in every bullet point`,
      `**Tailor for each application** — Mirror the exact terminology and skill names from the job posting. ATS systems match keywords literally, not conceptually`,
      `**Professional, clean format** — Use a single-column layout, standard fonts, and clear section headers. Save your resume as PDF to preserve formatting across all devices and platforms`,
    ],
  };
}

// ─── Main ──────────────────────────────────────────────────────────────

const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.mdx'));
console.log(`Diversifying Format & Template Tips for ${files.length} files...\n`);

let updated = 0;
let noSection = 0;

for (const file of files) {
  const filePath = path.join(CONTENT_DIR, file);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  const slug = data.slug || file.replace('.mdx', '');
  const jobTitle = data.jobTitle || slug.replace(/-/g, ' ');
  const category = data.category || 'General';
  const skills = data.keySkills || [];

  // Find the format tips section
  const formatRegex = /## .+ Resume Format & Template Tips\n[\s\S]*?(?=\n## |\n---|\Z)/;
  const match = content.match(formatRegex);

  if (!match) {
    noSection++;
    continue;
  }

  // Get new tips
  let tips = getFormatTips(slug, jobTitle);
  if (!tips) {
    tips = getCategoryFormatTips(slug, jobTitle, category, skills);
  }

  // Build new section
  const sectionTitle = `## ${jobTitle} Resume Format & Template Tips`;
  let newSection = `${sectionTitle}\n\n${tips.intro}\n\n`;
  for (const tip of tips.tips) {
    newSection += `- ${tip}\n`;
  }

  const newContent = content.replace(formatRegex, newSection);

  if (newContent !== content) {
    const newFile = matter.stringify(newContent, data);
    fs.writeFileSync(filePath, newFile, 'utf-8');
    updated++;
  }
}

console.log(`\n✅ Diversified Format Tips: ${updated} files updated.`);
console.log(`⚠️  No format section found: ${noSection} files.`);
console.log(`Total processed: ${files.length}`);
