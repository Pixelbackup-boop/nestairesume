#!/usr/bin/env node
/**
 * Adds a unique "Hiring Manager Tip" callout section to each resume example MDX file.
 * Inserts before "Common Mistakes to Avoid" section.
 * Each tip is unique based on jobTitle, category, and keySkills.
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

// ─── Unique hiring manager tips per slug ───────────────────────────────
// Each entry: { insight, detail }
// insight = the bold callout line
// detail = 1-2 paragraphs of actionable advice

function generateTip(slug, jobTitle, category, keySkills, avgSalary) {
  const tips = getTipBySlug(slug, jobTitle, category, keySkills, avgSalary);
  if (tips) return tips;
  // Fallback: generate from category
  return getCategoryTip(jobTitle, category, keySkills);
}

function getTipBySlug(slug, jobTitle, category, skills, salary) {
  const map = {
    // ─── TECHNOLOGY ───────────────────────────────────
    'software-engineer': {
      insight: `The ${jobTitle} resumes that get interviews lead with system impact, not language lists.`,
      detail: `I've reviewed over 2,000 software engineering resumes in the last decade. The pattern is clear: candidates who write "Built a real-time notification service handling 10M daily events using Go and Kafka" get callbacks. Candidates who write "Proficient in Go, Java, Python, Kafka, Redis" get filtered out. Every bullet should follow the pattern: built [what] → achieved [metric] → using [tech]. The technology is the tool, not the story. If you can only make one change to your resume before applying, convert your top 3 bullets from responsibility descriptions to impact statements with numbers.`
    },
    'software-developer': {
      insight: `Hiring managers for ${jobTitle} roles scan for shipped products, not side projects.`,
      detail: `When I'm screening developer resumes, the first thing I check is whether the candidate has shipped software that real users depend on. Side projects and bootcamp capstones are fine for entry-level, but mid-level developers need production experience. Mention deployment environments, user counts, and how your code performed under load. If you contributed to an open-source project with actual users, that counts — but list the project name, your specific contribution, and the PR or feature scope. Generic GitHub links without context get skipped.`
    },
    'software-architect': {
      insight: `${jobTitle} candidates are evaluated on decision quality, not code quality.`,
      detail: `I hire architects to make decisions that scale across teams and years. The resume that wins isn't the one with the longest technology list — it's the one that shows trade-off reasoning. When I see "Selected Kafka over RabbitMQ for event sourcing due to replay capability and partition-based ordering," I know this person thinks architecturally. When I see "Experienced with Kafka and RabbitMQ," I assume they've used both but can't articulate why. Include 3-5 architecture decisions you made, the alternatives you considered, and the business outcome.`
    },
    'full-stack-developer': {
      insight: `${jobTitle} hiring favors depth in one stack over shallow knowledge of many.`,
      detail: `Full-stack doesn't mean "knows everything." The strongest candidates I've hired were deep experts in one stack (React + Node, or Django + Vue) who could competently work across boundaries. Your resume should make your primary stack obvious in the first 3 seconds — put it in your summary and lead bullet. Then show cross-stack capability through project outcomes: "Built end-to-end feature from PostgreSQL schema design through React UI, reducing page load time from 3.2s to 800ms." That proves full-stack ability without listing 20 technologies.`
    },
    'front-end-developer': {
      insight: `${jobTitle} resumes without performance metrics signal a junior mindset.`,
      detail: `Frontend development has evolved past "making things look right." The senior frontend developers I hire demonstrate performance awareness: Lighthouse scores, Core Web Vitals improvements, bundle size reductions, and accessibility audit results. If your resume only mentions frameworks and UI libraries without any measurable outcomes, it reads as mid-level regardless of your years of experience. Include at least two performance-related achievements — even something as simple as "Reduced initial bundle size from 2.4MB to 890KB through code splitting and lazy loading" shows engineering maturity.`
    },
    'web-developer': {
      insight: `${jobTitle} candidates who show SEO and performance awareness stand out immediately.`,
      detail: `Most web developer resumes focus exclusively on frameworks and design. The candidates who get my attention also demonstrate awareness of page speed, SEO fundamentals, and accessibility. If you've improved a site's Lighthouse score, reduced Time to First Byte, or implemented structured data that improved search rankings, put it on your resume. These aren't "nice to have" skills anymore — they're core competencies that separate web developers who build for users from those who build for demos.`
    },
    'devops-engineer': {
      insight: `${jobTitle} resumes that quantify reliability improvements get prioritized over tool lists.`,
      detail: `Every DevOps resume lists Docker, Kubernetes, Terraform, and Jenkins. The ones I interview quantify their operational impact: "Reduced deployment failure rate from 12% to 0.5%," "Cut mean time to recovery from 4 hours to 15 minutes," or "Automated infrastructure provisioning reducing setup time from 3 days to 40 minutes." If you've improved uptime, deployment frequency, or incident response metrics, those numbers are more valuable than any certification. DevOps is about outcomes, and your resume should prove you deliver them.`
    },
    'data-scientist': {
      insight: `${jobTitle} resumes need business outcomes, not just model accuracy scores.`,
      detail: `I've seen hundreds of data science resumes that read like academic papers — F1 scores, AUC-ROC curves, and architecture diagrams. What I need to know is: what did the model do for the business? "Built a churn prediction model (AUC 0.89) that identified at-risk customers, enabling a retention campaign that saved $2.3M annually" tells me everything. The model metrics matter, but only in service of a business result. Lead with the business impact, then provide the technical proof. Every model on your resume should answer: "So what?"`,
    },
    'data-engineer': {
      insight: `${jobTitle} hiring managers look for pipeline reliability metrics, not just tools used.`,
      detail: `Data engineering resumes tend to be technology catalogs: Spark, Airflow, Snowflake, dbt. What I actually want to know is the scale and reliability of your pipelines. How many records per day? What's the SLA? What was the failure rate before and after your work? "Built a real-time ETL pipeline processing 50M events/day with 99.95% delivery SLA using Kafka and Spark Structured Streaming" is a strong bullet. "Experience with Kafka and Spark" is not. Include data volumes, latency requirements, and uptime metrics for every pipeline you mention.`
    },
    'data-analyst': {
      insight: `${jobTitle} candidates who show decision influence get hired over those who just show SQL skills.`,
      detail: `The data analysts I promote fastest are those who changed business decisions, not those who ran the most queries. Your resume should demonstrate influence: "Identified a 23% drop in mobile conversion through funnel analysis, leading to a UX redesign that recovered $400K in quarterly revenue." SQL and Python are table stakes — every analyst has them. What differentiates you is the ability to turn data into action. For every analysis you mention, include who used the insight and what changed because of it.`
    },
    'cloud-engineer': {
      insight: `${jobTitle} resumes that show cost optimization alongside architecture win every time.`,
      detail: `Cloud engineering candidates who only talk about architecture are missing half the story. The cloud engineers I value most demonstrate cost awareness: reserved instance strategies, right-sizing recommendations, spot instance usage, and total cost reduction percentages. "Redesigned the compute layer using a mix of on-demand, reserved, and spot instances, reducing monthly AWS spend from $180K to $112K while maintaining 99.99% availability" — that bullet alone would get you an interview. Include at least one cost optimization metric on your resume.`
    },
    'cloud-architect': {
      insight: `${jobTitle} candidates must show multi-account governance, not just single-service depth.`,
      detail: `Cloud architecture at the enterprise level means landing zones, organizational unit structures, cross-account networking, and centralized security controls. The architect resumes I prioritize show experience with AWS Organizations (or Azure Management Groups), Service Control Policies, and multi-account CI/CD patterns. If your resume only describes deploying services within a single account, it reads as cloud engineering, not cloud architecture. Show that you've designed for organizational scale, not just application scale.`
    },
    'cybersecurity-analyst': {
      insight: `${jobTitle} resumes with incident response metrics outperform certification-heavy resumes.`,
      detail: `Certifications (CISSP, CEH, CompTIA Security+) are important for getting past HR filters, but hiring managers look deeper. I want to know how many incidents you've triaged, your mean time to detect and respond, and what improvements you've implemented. "Reduced mean time to detection from 72 hours to 4 hours by implementing SIEM correlation rules for lateral movement patterns" demonstrates real capability. Stack your certifications in a dedicated section, but lead your experience bullets with operational impact.`
    },
    'machine-learning-engineer': {
      insight: `${jobTitle} hiring prioritizes production ML experience over research publications.`,
      detail: `The gap between ML in a notebook and ML in production is enormous, and hiring managers know it. If you've deployed a model that serves real-time predictions, handles model drift, includes monitoring and alerting, and has a retraining pipeline — say so explicitly. "Deployed a fraud detection model serving 10K predictions/second with <50ms latency, automated weekly retraining, and a monitoring dashboard tracking precision drift" tells me you can do the full job. Jupyter notebooks and Kaggle competitions are starting points, not differentiators.`
    },
    'machine-learning-specialist': {
      insight: `${jobTitle} resumes that demonstrate domain expertise alongside ML chops are rare and valuable.`,
      detail: `ML specialists who understand their application domain — healthcare, finance, NLP, computer vision — are significantly more effective than generalists. Your resume should show that you understand the problem space, not just the algorithms. If you built a medical imaging classifier, mention the clinical workflow it improved. If you built a recommendation engine, include the revenue impact. Domain context turns "built a classification model with 95% accuracy" into "built a pathology image classifier reducing diagnostic turnaround from 48 hours to 2 hours, validated against 10,000 clinical samples."`
    },
    'database-administrator': {
      insight: `${jobTitle} resumes that show uptime track records and disaster recovery testing get immediate attention.`,
      detail: `Database administration is a trust-based role — I need to trust that you won't lose our data. The strongest DBA resumes include specific availability metrics: "Maintained 99.999% uptime across 15 production PostgreSQL clusters over 3 years." Beyond that, I look for disaster recovery evidence: have you actually tested failovers? Restored from backups under time pressure? "Conducted quarterly DR drills with documented recovery time of 12 minutes against a 30-minute RTO" is exactly what I want to see.`
    },
    'product-manager': {
      insight: `${jobTitle} resumes that show measurable product outcomes beat feature lists every time.`,
      detail: `The product manager resumes I screen all describe features they launched. The ones I interview describe outcomes those features drove. "Led the launch of a self-service onboarding flow" is a feature. "Led the launch of a self-service onboarding flow that reduced time-to-value from 14 days to 2 days, increasing trial-to-paid conversion by 18%" is a product outcome. Every feature on your resume should have a before-and-after metric. If you can't measure the impact, either find the data or replace it with a feature where you can.`
    },
    'product-owner': {
      insight: `${jobTitle} resumes should demonstrate backlog prioritization methodology, not just Agile terminology.`,
      detail: `Every Product Owner resume mentions Agile, Scrum, and sprint planning. What differentiates strong candidates is evidence of structured prioritization. How did you decide what to build next? Did you use RICE scoring, weighted shortest job first, or customer impact matrices? "Prioritized a 200-item backlog using RICE scoring, focusing the team on the top 15 features that drove 80% of projected revenue impact" shows strategic thinking. Simply listing "managed product backlog" tells me nothing about your decision-making quality.`
    },
    'project-manager': {
      insight: `${jobTitle} hiring managers look for scope management, not just on-time delivery.`,
      detail: `On-time, on-budget delivery is expected — it's the baseline, not the differentiator. What I look for in project manager resumes is evidence of scope management under pressure. Have you successfully descoped a project to meet a deadline without sacrificing the core deliverable? Have you managed stakeholder expectations when requirements changed mid-project? "Negotiated a phased delivery approach with the client when scope increased 40%, delivering the MVP on the original timeline and completing remaining features in a subsequent release" shows real PM skill.`
    },
    'project-coordinator': {
      insight: `${jobTitle} candidates who demonstrate upward communication skills advance fastest.`,
      detail: `Project coordinators are often the information bridge between execution teams and leadership. The resumes I prioritize show evidence of stakeholder communication: status reporting, risk escalation, and meeting facilitation. "Created a weekly executive dashboard tracking 5 concurrent projects across 3 departments, reducing status meeting time by 60%" demonstrates organizational value. Don't just list "coordinated project activities" — show how your coordination improved visibility and decision-making for people above you in the org chart.`
    },
    'technical-program-manager': {
      insight: `${jobTitle} resumes must show cross-team dependency management at scale.`,
      detail: `Technical Program Management is about orchestrating complexity across multiple engineering teams. The TPM resumes I shortlist describe the number of teams coordinated, the dependency chains managed, and the program-level outcomes delivered. "Coordinated a platform migration across 8 engineering teams and 3 business units, managing 45 cross-team dependencies and delivering the program 2 weeks ahead of the 6-month timeline" is the level of specificity I expect. Generic "managed technical programs" bullets get passed over.`
    },
    'solution-architect': {
      insight: `${jobTitle} candidates who show pre-sales influence and win rates stand out.`,
      detail: `Solution Architects in enterprise sales environments are evaluated on their contribution to revenue. If you've participated in RFP responses, technical demos, or proof-of-concept builds that led to closed deals, quantify your involvement. "Designed and presented custom architecture proposals for 25+ enterprise prospects, contributing to a 65% technical win rate on deals averaging $500K ACV" directly connects your technical work to business outcomes. Show the revenue you helped generate, not just the systems you designed.`
    },
    'ux-designer': {
      insight: `${jobTitle} resumes without usability metrics read as visual design, not UX.`,
      detail: `User Experience is measurable, and hiring managers expect to see the measurements. "Redesigned the checkout flow" tells me what you did. "Redesigned the checkout flow, reducing cart abandonment from 68% to 41% and increasing mobile conversion rate by 24%" tells me you understand UX as a business function. Include task completion rates, error rates, time-on-task improvements, SUS scores, or A/B test results. If you don't have quantitative data, include qualitative evidence: usability test findings, user interview synthesis, or heuristic evaluation results.`
    },
    'ux-researcher': {
      insight: `${jobTitle} hiring prioritizes research that changed product direction.`,
      detail: `UX researchers who just conduct studies and deliver reports are order-takers. The researchers I hire change product strategy. Your resume should include at least 2-3 examples where your research directly altered the product roadmap, killed a feature, or redirected engineering investment. "Conducted 40 user interviews revealing that 70% of the target market preferred async collaboration over real-time — findings that shifted the product roadmap from video-first to document-first, saving 6 months of engineering effort" demonstrates strategic research impact.`
    },
    'graphic-designer': {
      insight: `${jobTitle} resumes without a portfolio link are immediately deprioritized.`,
      detail: `Design is a visual discipline, and no amount of resume text can substitute for seeing your work. The first thing I look for on a graphic designer resume is a portfolio link — Behance, Dribbble, or a personal site. If it's missing, your resume goes to the bottom of the pile regardless of experience. Make sure the link is prominent (in your header or summary), the portfolio loads quickly, and it showcases 8-12 of your strongest pieces with brief context about the brief, your role, and the outcome. Case studies with before/after comparisons are especially effective.`
    },
    'content-creator': {
      insight: `${jobTitle} resumes that include audience growth metrics and engagement rates get callbacks.`,
      detail: `Content creation is a performance-driven role, and your resume should prove it. I want to see follower growth rates, engagement percentages, view counts, and conversion metrics. "Grew Instagram following from 5K to 85K in 12 months with a 6.2% average engagement rate, driving 2,400 monthly link clicks to product pages" is the kind of specificity that gets interviews. If you've created content that generated revenue, leads, or measurable brand awareness, quantify every claim. Vague statements like "created engaging social media content" get overlooked.`
    },
    'digital-marketer': {
      insight: `${jobTitle} hiring managers look for channel-specific ROAS data, not just campaign descriptions.`,
      detail: `The digital marketers I hire think in terms of return on ad spend. Your resume should include platform-specific metrics: "Managed $50K/month Google Ads budget achieving 4.2x ROAS" or "Built a Facebook Lead Ads funnel generating leads at $12 CAC against a $45 target." If you've managed budgets, include the size. If you've optimized campaigns, include the before-and-after metrics. "Managed digital marketing campaigns" without any performance data suggests you executed tasks without tracking results — and that's a red flag.`
    },
    'digital-marketing-manager': {
      insight: `${jobTitle} candidates must show P&L ownership and multi-channel attribution.`,
      detail: `Digital marketing managers are responsible for channel strategy and budget allocation, and your resume needs to reflect that level of ownership. I look for evidence of marketing P&L management: total budget controlled, revenue attributed to your channels, and how you made allocation decisions. "Managed a $1.2M annual digital marketing budget across paid search, social, email, and affiliate channels, delivering $8.4M in attributable revenue through a multi-touch attribution model" shows strategic ownership. Campaign execution without budget context reads as specialist-level, not manager-level.`
    },
    'digital-marketing-specialist': {
      insight: `${jobTitle} resumes should lead with the specific channel you dominate.`,
      detail: `Specialists are hired for depth, not breadth. The most effective resumes I see from digital marketing specialists lead with their primary channel expertise — SEO, PPC, email, or social — and demonstrate progressive mastery. "Email Marketing Specialist: Managed a 250K-subscriber email program generating $1.8M annually through lifecycle automation and segmentation" immediately tells me where you fit on my team. If you try to position yourself as equally skilled across all channels, you end up sounding like a generalist, which is the opposite of what specialist hiring managers want.`
    },
    'seo-analyst': {
      insight: `${jobTitle} candidates who show organic traffic growth with timeline context demonstrate real skill.`,
      detail: `SEO is a patience game, and experienced hiring managers know that. What impresses me is organic traffic growth shown with honest timelines: "Grew organic traffic from 15K to 85K monthly sessions over 14 months through technical SEO fixes, content strategy, and internal linking optimization." I also want to see how you diagnosed problems — mentioning specific Screaming Frog audits, Core Web Vitals improvements, or crawl budget optimization shows technical SEO depth that goes beyond content publishing.`
    },
    'marketing-manager': {
      insight: `${jobTitle} resumes need revenue attribution, not just campaign metrics.`,
      detail: `Marketing managers are expected to connect their work to revenue. "Managed social media campaigns" is an activity. "Managed a multi-channel campaign strategy that generated $2.1M in pipeline and $680K in closed revenue within one quarter" is a result. If you've influenced revenue, customer acquisition cost, or customer lifetime value, put those numbers front and center. Marketing managers who can't articulate their revenue impact are increasingly being passed over in favor of those who can.`
    },
    'marketing-director': {
      insight: `${jobTitle} candidates must demonstrate team building and budget stewardship.`,
      detail: `At the director level, I evaluate marketing leaders on three things: can you build a team, manage a budget, and drive measurable growth? Your resume should address all three. Team size and structure changes you've made, total marketing budget managed, and growth metrics (MQLs, pipeline, revenue) you've delivered. "Built a 12-person marketing team from scratch across content, demand gen, and product marketing, managing a $3.5M annual budget that delivered a 35% YoY increase in qualified pipeline" covers all bases in one bullet.`
    },
    'marketing-analyst': {
      insight: `${jobTitle} hiring managers value attribution modeling experience above all other analytical skills.`,
      detail: `Every marketing analyst can pull reports and build dashboards. The ones I hire can build and explain attribution models. Can you articulate the difference between first-touch, last-touch, and multi-touch attribution? Have you implemented or refined an attribution model that changed how marketing budget was allocated? "Built a multi-touch attribution model using Google Analytics and Looker that revealed email marketing was undervalued by 40%, leading to a budget reallocation that improved blended CAC by 22%" — that's the kind of analysis that proves strategic value.`
    },
    'marketing-coordinator': {
      insight: `${jobTitle} resumes should showcase organizational systems, not just event lists.`,
      detail: `Marketing coordinators manage the logistics that keep campaigns running. The strongest candidates show me the systems they've built: "Created a content calendar and asset management workflow using Monday.com, coordinating deliverables across 4 agencies and 3 internal teams with a 95% on-time delivery rate." This tells me you're organized, can manage multiple stakeholders, and track your own performance. Lists of events attended or emails sent don't demonstrate the organizational capability I'm hiring for.`
    },
    'marketing-specialist': {
      insight: `${jobTitle} candidates who demonstrate testing discipline get promoted faster.`,
      detail: `The best marketing specialists I've hired run structured experiments. Your resume should include evidence of A/B testing, hypothesis-driven optimization, and learning documentation. "Ran 30+ A/B tests on landing pages and email subject lines over 6 months, documenting results in a shared playbook that the team continues to reference" shows methodical thinking. Marketing specialists who "tried things until something worked" are common. Specialists who systematically test, measure, and document are rare — and that's exactly what we're hiring for.`
    },
    'marketing-executive': {
      insight: `${jobTitle} resumes should lead with P&L impact and board-level communication experience.`,
      detail: `Marketing executives are business leaders who happen to specialize in growth. Your resume needs to reflect executive presence: board reporting experience, cross-functional leadership, and P&L impact. "Presented quarterly marketing performance to the board of directors, including customer acquisition cost trends, lifetime value analysis, and competitive positioning — directly influencing a $5M increase in marketing investment" demonstrates the strategic altitude I expect at this level. Campaign-level details should be minimized in favor of business outcomes.`
    },
    'marketing-assistant': {
      insight: `${jobTitle} candidates who show initiative beyond assigned tasks stand out immediately.`,
      detail: `Marketing assistant roles receive hundreds of applications. The ones I interview demonstrate that they've gone beyond task execution to identify opportunities. "Noticed declining email open rates, researched send-time optimization strategies, and proposed a segmented send-time test that improved open rates by 18%" shows curiosity and initiative. Compare that to "Assisted with email marketing campaigns" — which tells me nothing about your contribution. Show me a moment where you identified a problem, proposed a solution, and drove an outcome.`
    },
    'marketing-intern': {
      insight: `${jobTitle} applications that demonstrate self-directed learning get immediate attention.`,
      detail: `I don't expect interns to have professional marketing experience. What I look for is evidence of genuine curiosity: personal blogs you've grown, social media accounts you've managed for student organizations, Google Analytics or HubSpot certifications you've earned independently, or marketing case analyses you've written. "Grew a university club's Instagram from 200 to 1,500 followers using a content calendar and hashtag strategy" shows more marketing aptitude than any coursework description. Show me you've applied marketing thinking to something real.`
    },
    'social-media-manager': {
      insight: `${jobTitle} resumes without platform-specific growth metrics are immediately filtered out.`,
      detail: `Social media management is measurable, and I expect to see the measurements. For every platform you've managed, include follower count growth, engagement rates, and business metrics (clicks, leads, or sales driven). "Managed LinkedIn company page growing from 8K to 45K followers in 18 months, achieving a 4.8% average engagement rate and driving 350+ monthly website visits" is specific and verifiable. Generic claims like "managed social media presence across platforms" tell me nothing about your capability or results.`
    },
    'social-media-coordinator': {
      insight: `${jobTitle} candidates should demonstrate content production velocity and quality together.`,
      detail: `Social media coordination requires balancing volume with quality. The candidates I hire show both: "Produced 60+ social media posts per month across 4 platforms, maintaining brand voice consistency and achieving an average 3.5% engagement rate — 2x industry benchmark." This tells me you can maintain output quality at scale. If you've built content templates, batch production workflows, or approval processes that improved efficiency, include those too. Social media never stops, and I need to know you can keep up without quality dropping.`
    },
    'social-media-specialist': {
      insight: `${jobTitle} resumes should show paid social expertise alongside organic strategy.`,
      detail: `The social media landscape has shifted decisively toward paid amplification. Specialists who only show organic content skills are increasingly outdated. I look for evidence of paid social campaign management: "Managed $25K/month Facebook and Instagram ad budget with a 3.8x ROAS, while simultaneously growing organic engagement by 40%." Showing both paid and organic capabilities — and how they work together — positions you as a full-spectrum social media specialist, not just a content creator.`
    },
    'accountant': {
      insight: `${jobTitle} resumes with specific ERP platform experience and close cycle metrics get prioritized.`,
      detail: `When I hire accountants, the first thing I check is ERP experience — NetSuite, SAP, Oracle, or QuickBooks Enterprise. Name the exact platform, your proficiency level, and how long you've used it. Then show me your close metrics: "Reduced month-end close from 12 business days to 6 business days by automating journal entry reconciliation in NetSuite." Every accounting manager has a close cycle they're trying to shorten, and candidates who demonstrate they've done it before are immediately shortlisted.`
    },
    'financial-analyst': {
      insight: `${jobTitle} resumes that show forecast accuracy and model complexity get interviews.`,
      detail: `Financial analysts are hired to make predictions. The best way to demonstrate that on your resume is to show how accurate your predictions have been. "Built a 3-year revenue forecast model for a $50M business unit achieving 97% accuracy against actuals over 4 quarters" is compelling because it's verifiable. Include the models you've built, the data sources you used, and the decisions your analysis supported. "Performed financial analysis" doesn't differentiate you from the other 200 applicants — forecast accuracy data does.`
    },
    'business-analyst': {
      insight: `${jobTitle} candidates who demonstrate stakeholder interview skills alongside technical analysis get hired.`,
      detail: `The best business analysts I've worked with are translators — they convert business language into technical requirements and vice versa. Your resume should show evidence of requirements gathering methodology: "Conducted 25+ stakeholder interviews across 4 departments, synthesizing conflicting requirements into a unified PRD that reduced development rework by 35%." SQL and data visualization skills are expected. What sets candidates apart is the ability to extract the right requirements from stakeholders who often don't know what they need.`
    },
    'business-intelligence': {
      insight: `${jobTitle} resumes should showcase dashboard adoption metrics, not just build counts.`,
      detail: `Building dashboards is easy. Building dashboards that people actually use is hard. I look for adoption metrics: "Designed 15 executive dashboards in Tableau, achieving 85% weekly active usage across the leadership team — up from 20% with the previous reporting system." If your dashboards are actively used for decision-making, say so. If they replaced a manual reporting process, quantify the time saved. The goal of BI isn't pretty charts — it's better decisions made faster.`
    },
    'business-intelligence-analyst': {
      insight: `${jobTitle} candidates who show data governance and quality improvement experience stand apart.`,
      detail: `BI analysts who address data quality — not just data visualization — are uncommon and highly valued. If you've implemented data validation rules, built data quality dashboards, or established governance standards that improved trust in reporting, include those accomplishments. "Identified and resolved a data pipeline issue causing 15% revenue underreporting in the executive dashboard, correcting a $2.3M discrepancy that had persisted for 2 quarters" shows a level of data stewardship that goes beyond the typical BI analyst scope.`
    },
    'power-bi-developer': {
      insight: `${jobTitle} resumes must show DAX complexity and model optimization, not just report counts.`,
      detail: `Hiring managers for Power BI roles need to know your DAX proficiency level. "Created 50+ Power BI reports" tells me volume but nothing about complexity. "Built a multi-fact data model with 12 dimension tables and 40+ DAX measures including time intelligence calculations, customer cohort analysis, and dynamic currency conversion" tells me you can handle enterprise-scale analytics. Include your data model complexity, DAX measure sophistication, and any performance optimization you've done — query reduction percentages or report load time improvements are gold.`
    },
    'salesforce-administrator': {
      insight: `${jobTitle} hiring managers look for user adoption metrics and process automation depth.`,
      detail: `Salesforce admin resumes that only list certifications and configuration tasks miss the mark. I need to see business impact: user adoption rates, workflow automation results, and data quality improvements. "Increased Salesforce user adoption from 55% to 92% through custom page layouts, automated lead assignment rules, and a gamified data entry training program" demonstrates that you understand the platform serves the business, not the other way around. Include the number of users supported, automations built, and any custom integrations.`
    },
    'sap-consultant': {
      insight: `${jobTitle} resumes with module-specific implementation details and go-live success metrics win.`,
      detail: `SAP consulting resumes need module specificity. "SAP consultant" means nothing — are you FI/CO, MM, SD, PP, or ABAP? Name your modules, your implementation methodology (ASAP, SAP Activate), and your go-live outcomes. "Led the SAP S/4HANA FI/CO implementation for a $500M manufacturing company, migrating from ECC 6.0 with zero data loss and achieving full user adoption within 30 days of go-live" tells me your exact value. Every implementation should include scope (users, modules, geography) and outcome (on-time, data integrity, adoption).`
    },
    'nurse': {
      insight: `${jobTitle} resumes that highlight patient ratios and specialty certifications get prioritized.`,
      detail: `Nurse managers review resumes with a clinical checklist. The first things I look for: patient-to-nurse ratio you've managed, unit type (ICU, ER, med-surg, OR), and specialty certifications (CCRN, CEN, CNOR). "Managed a 1:4 patient ratio on a 32-bed cardiac step-down unit, maintaining a 97% patient satisfaction score and zero central line infections over 18 months" tells me your clinical competence, volume capacity, and quality outcomes in one sentence. Generic "provided patient care" bullets waste space — be specific about your unit, acuity, and outcomes.`
    },
    'doctor': {
      insight: `${jobTitle} resumes should lead with clinical outcomes and patient volume, not just credentials.`,
      detail: `Physician credentials (MD, board certification, residency) are qualifications, not differentiators — everyone applying has them. What makes your resume stand out is clinical impact: patient volume, procedure counts, quality metrics, and research contributions. "Managed a panel of 2,200 patients in a primary care practice, achieving top-decile HEDIS scores for diabetes management (HbA1c control: 82%) and preventive screening compliance (91%)" demonstrates measurable clinical excellence. Include patient outcomes, not just responsibilities.`
    },
    'medical-assistant': {
      insight: `${jobTitle} resumes with EHR platform experience and patient volume metrics get callbacks.`,
      detail: `Medical assistants who name their EHR platform (Epic, Cerner, Athena, eClinicalWorks) and patient throughput immediately stand out. "Managed patient intake and vitals for 35+ patients daily using Epic, maintaining appointment scheduling accuracy above 98% and reducing average patient wait time from 22 minutes to 14 minutes" shows competence at scale. Medical offices are high-volume environments, and I need to know you can handle the pace while maintaining accuracy. Include your daily patient count, EHR proficiency, and any clinical certifications (CMA, RMA).`
    },
    'pharmacist': {
      insight: `${jobTitle} resumes should quantify prescription volume and medication error prevention rates.`,
      detail: `Pharmacy hiring managers evaluate candidates on throughput, accuracy, and clinical intervention capability. "Verified and dispensed 300+ prescriptions daily in a high-volume retail pharmacy, maintaining a 0.01% error rate and conducting 15+ drug utilization reviews weekly that identified clinically significant interactions" covers all three dimensions. Include your daily Rx volume, error rates (or days without errors), and clinical consultation frequency. If you've implemented any process improvements — barcode scanning systems, technician training programs — quantify the safety impact.`
    },
    'dental-assistant': {
      insight: `${jobTitle} candidates who list specific procedures and radiography certification types get priority.`,
      detail: `Dental offices hire assistants for specific clinical capabilities. Your resume should list the procedures you've assisted with (extractions, implant placements, crown preps, root canals) and your radiography proficiency (periapical, panoramic, CBCT). "Assisted with 20+ procedures daily including implant placements, molar extractions, and full-mouth reconstructions. Licensed in expanded-function dental radiography with experience operating Dexis and Schick digital imaging systems." This specificity tells me exactly which operatory you can work in from day one.`
    },
    'dentist': {
      insight: `${jobTitle} resumes for associate positions should include production numbers and patient retention rates.`,
      detail: `Dental practices evaluate associate candidates partly on their revenue generation potential. Including production metrics demonstrates business acumen: "Averaged $45K in monthly production across a mix of restorative, endodontic, and prosthodontic procedures, maintaining a 92% patient retention rate and 4.9-star Google review average." Patient retention and review scores matter because they indicate chairside manner and clinical quality. Don't just list procedures you can perform — show the business results of your clinical work.`
    },
    'receptionist': {
      insight: `${jobTitle} resumes that quantify call volume and scheduling accuracy outperform generic applications.`,
      detail: `Receptionists are the first point of contact for every visitor and caller. I hire based on volume capacity and multitasking evidence: "Managed a multi-line phone system handling 120+ daily calls while greeting 40+ walk-in visitors, maintaining a 30-second average answer time and 98% scheduling accuracy." This tells me you can handle the pace of our front desk. Include your phone system (multi-line, VoIP), daily volume metrics, and any software proficiency (scheduling platforms, CRM, appointment systems). "Answered phones" doesn't differentiate you from other candidates.`
    },
    'executive-assistant': {
      insight: `${jobTitle} candidates who demonstrate confidentiality and executive judgment get hired over those who just list tools.`,
      detail: `Executive assistants support decision-makers who deal with sensitive information daily. Beyond calendar management and travel coordination, I look for evidence of judgment and discretion. "Managed confidential board materials preparation, coordinated due diligence processes for 3 acquisitions, and served as the primary liaison between the CEO and 50+ external stakeholders" demonstrates trust. Mention the executive level you've supported (C-suite, VP, Board), the sensitivity of materials you've handled, and your decision-making scope.`
    },
    'administrative-assistant': {
      insight: `${jobTitle} resumes that show process improvements are far stronger than task lists.`,
      detail: `Administrative assistants who just list duties — "filed documents, scheduled meetings, answered phones" — blend together. The candidates who stand out demonstrate that they've improved the systems they manage. "Redesigned the office filing system from paper-based to SharePoint, reducing document retrieval time from 10 minutes to under 30 seconds" shows you don't just maintain processes — you improve them. Include one or two examples of a process you made better, the time or cost saved, and the tools you used.`
    },
    'office-manager': {
      insight: `${jobTitle} hiring managers look for vendor management and budget oversight experience.`,
      detail: `Office management is fundamentally about operations efficiency and cost control. The resumes I prioritize show vendor negotiation results, budget management, and process automation. "Managed an $800K annual office operations budget across facilities, supplies, and vendor contracts — renegotiated 4 major vendor agreements saving $95K annually while maintaining service quality." Include the budget size, vendor count, headcount supported, and any efficiency improvements. If you've implemented new systems (HRIS, procurement, facilities management), quantify the operational impact.`
    },
    'customer-service': {
      insight: `${jobTitle} resumes with satisfaction scores and resolution metrics are immediately shortlisted.`,
      detail: `Customer service hiring is metrics-driven. I screen for CSAT scores, first-call resolution rates, average handle time, and ticket volume. "Maintained a 96% CSAT score while handling 65+ customer inquiries daily via phone, email, and chat, with an 88% first-contact resolution rate" gives me everything I need in one line. If you've been recognized for performance (top agent, quality award), include it. Generic "provided excellent customer service" statements are meaningless without the numbers to back them up.`
    },
    'customer-support': {
      insight: `${jobTitle} candidates who show ticket volume and escalation reduction win over tool-listers.`,
      detail: `The support reps I hire demonstrate throughput and quality simultaneously. "Resolved 50+ tickets daily in Zendesk across Tier 1 and Tier 2 issues, reducing average resolution time from 4.2 hours to 2.1 hours and decreasing escalation rate from 18% to 7%." Name your ticketing platform (Zendesk, Freshdesk, Intercom, Salesforce Service Cloud), your daily volume, and at least one quality metric. If you've created knowledge base articles that deflected tickets, quantify the deflection — that shows you think systemically about support, not just transactionally.`
    },
    'customer-success-manager': {
      insight: `${jobTitle} resumes must lead with retention rates and expansion revenue metrics.`,
      detail: `Customer success management is measured by two numbers: net revenue retention and logo retention. "Managed a portfolio of 45 enterprise accounts totaling $8M ARR with a 115% net revenue retention rate and 95% logo retention" immediately tells me your book of business and performance level. Include upsell/cross-sell revenue generated, churn prevented (with dollar amounts), and any QBR cadence you maintained. CSM resumes that don't include retention metrics get filtered out because the role is fundamentally about preventing churn and driving expansion.`
    },
    'customer-success': {
      insight: `${jobTitle} candidates should demonstrate onboarding effectiveness and health score management.`,
      detail: `Beyond retention metrics, I evaluate customer success professionals on their onboarding and engagement capabilities. "Designed and executed a structured onboarding program for 30+ new enterprise accounts quarterly, achieving 90% feature adoption within 60 days and reducing time-to-value from 45 days to 18 days." If you've built or improved a customer health scoring model, include the methodology and results. Proactive account management — catching at-risk accounts before they churn — is the most valuable skill in customer success.`
    },
    'sales-manager': {
      insight: `${jobTitle} resumes that show team quota attainment and rep development are what I'm looking for.`,
      detail: `Sales managers are judged on two things: did your team hit quota, and did you develop your reps? "Led a team of 12 AEs achieving 118% of a $15M annual quota, with 8 of 12 reps exceeding individual targets. Promoted 3 SDRs to AE roles through a structured coaching program with weekly pipeline reviews." This shows both performance and people development. Include your team size, quota attainment, and evidence of coaching or enablement. If you've designed sales playbooks, implemented new tools, or restructured territories, include those too.`
    },
    'sales-representative': {
      insight: `${jobTitle} candidates who show consistent quota attainment across multiple quarters demonstrate reliability.`,
      detail: `One great quarter can be luck. Consistent performance across 4-8 quarters demonstrates skill. "Exceeded quarterly quota in 7 of 8 quarters, averaging 112% attainment against a $750K annual target. Closed the company's largest deal ($340K) through a 6-month enterprise sales cycle involving 8 stakeholders." Include your quota, attainment percentage over time, and deal complexity. Sales is a numbers role — your resume should read like a performance scorecard, not a job description.`
    },
    'sales-associate': {
      insight: `${jobTitle} resumes should quantify average transaction value and upsell rates.`,
      detail: `Retail and sales associate roles are measured by revenue contribution. "Consistently ranked top 3 out of 25 associates with $180K in monthly sales, a $245 average transaction value, and a 35% accessory attachment rate" demonstrates measurable impact. Even in entry-level sales, metrics matter. Include your ranking among peers, any recognition (employee of the month, sales competitions won), and specific upselling results. "Helped customers with purchases" doesn't differentiate you from any other applicant.`
    },
    'account-executive': {
      insight: `${jobTitle} resumes must show deal size, sales cycle length, and win rate.`,
      detail: `Account executives are hired to close deals, and your resume should read like a deal sheet. "Closed $2.4M in new business across 18 deals averaging $133K ACV, with a 32% win rate against a 25% team average and a 90-day average sales cycle." Include your pipeline management approach, the stakeholder levels you sold to (VP, C-suite), and your prospecting method (outbound, inbound, channel). If you've sold into specific verticals (healthcare, finance, manufacturing), name them — vertical expertise is a hiring priority.`
    },
    'account-manager': {
      insight: `${jobTitle} resumes should demonstrate portfolio growth and client relationship depth.`,
      detail: `Account management is about growing existing relationships. I evaluate candidates on net revenue growth within their portfolio: "Managed a $5M portfolio of 30 mid-market accounts, growing total ACV by 22% through strategic upselling and cross-selling while maintaining 96% annual retention." Include the size of your book of business, the number of accounts, and your growth metrics. If you've conducted QBRs, managed renewals, or rescued at-risk accounts, include specific examples with dollar amounts. Account managers who only show maintenance activity get passed over.`
    },
    'recruiter': {
      insight: `${jobTitle} resumes should quantify time-to-fill, offer acceptance rates, and quality of hire metrics.`,
      detail: `Recruiting is a metrics-driven profession, and your resume should prove it. "Filled 45 positions annually across engineering, product, and design with a 28-day average time-to-fill and a 91% offer acceptance rate. Sourced 60% of hires through direct outreach, reducing agency dependency and saving $320K in recruiting fees." Include your req load, fill rates, and source mix. If you've built employer brand content, referral programs, or structured interview processes, include those as system improvements. Recruiters who just say "recruited talent" are giving me nothing to evaluate.`
    },
    'hr-manager': {
      insight: `${jobTitle} candidates who show employee retention impact and compliance track records advance.`,
      detail: `HR managers are evaluated on people metrics and risk mitigation. "Reduced voluntary turnover from 24% to 15% through implementing stay interviews, manager coaching programs, and a revised compensation structure — saving an estimated $1.2M in replacement costs annually." Include your compliance track record (zero EEOC complaints, audit results), the employee population you supported, and any culture or engagement initiatives with measured outcomes. HR is a business function — your resume should connect HR activities to business results.`
    },
    'hr-director': {
      insight: `${jobTitle} resumes must show organizational transformation and executive partnership evidence.`,
      detail: `HR director roles are strategic leadership positions. I look for evidence of organizational transformation — restructurings, M&A integration, culture change initiatives — and executive-level partnership. "Partnered with the CEO and CFO to design a post-acquisition integration plan for 200 employees across 3 offices, completing organizational design, compensation harmonization, and HRIS migration within 90 days with 92% employee retention." If you've presented to the board, managed HR budgets in the millions, or led enterprise-wide initiatives, those belong at the top of your resume.`
    },
    'teacher': {
      insight: `${jobTitle} resumes with student outcome data and differentiated instruction examples stand out.`,
      detail: `School administrators hiring teachers look for measurable student impact. "Implemented a differentiated reading instruction program in a class of 28 students with 5 IEP accommodations, achieving an 18% increase in grade-level reading proficiency as measured by MAP assessments." Include standardized test score improvements, student growth percentages, and specific pedagogical approaches. If you've mentored new teachers, led curriculum development, or integrated technology in measurable ways, include those contributions. "Taught 5th grade math" tells me nothing about your effectiveness.`
    },
    'chef': {
      insight: `${jobTitle} resumes that include food cost percentages and cover counts demonstrate operational competence.`,
      detail: `Chefs are creative professionals who run cost centers. The executive chefs and sous chefs I hire demonstrate both culinary skill and business acumen. "Managed a kitchen producing 400 covers per night with a 28% food cost and a 95% health inspection score. Developed a seasonal menu program that increased dessert attachment rate from 15% to 32%." Include your cover count, food cost percentage, labor cost management, and any menu innovation that drove revenue. A beautiful tasting menu matters, but so does running a profitable kitchen.`
    },
    'restaurant-manager': {
      insight: `${jobTitle} resumes should lead with revenue growth and labor management metrics.`,
      detail: `Restaurant management is a P&L role. "Managed a $3.2M annual revenue restaurant with 35 staff, achieving a 6% year-over-year revenue increase while reducing labor cost from 32% to 28% through optimized scheduling and cross-training." Include your revenue, average check size, table turn rate, and any guest satisfaction metrics (Google reviews, NPS). If you've opened a new location, managed a renovation, or turned around an underperforming restaurant, those are premium experiences that deserve prominent placement.`
    },
    'bartender': {
      insight: `${jobTitle} candidates who show sales per shift and upselling results demonstrate revenue awareness.`,
      detail: `Bartending is a sales role with a customer service component. "Averaged $2,800 in nightly sales across a 200-seat venue, consistently ranking #1 in upsell percentage with a 40% premium liquor call rate." Mention your volume (cocktails per hour, covers per shift), tip percentage (if above average), and any specialty skills — craft cocktail development, wine program management, or beverage cost optimization. "Made drinks and served customers" doesn't differentiate. Revenue numbers and speed metrics do.`
    },
    'cashier': {
      insight: `${jobTitle} resumes should highlight transaction accuracy and speed metrics.`,
      detail: `Retail and food service cashiers are evaluated on speed, accuracy, and customer interaction. "Processed 250+ transactions daily with 99.8% cash handling accuracy and zero shortage incidents over 12 months. Maintained an average transaction time of 45 seconds while achieving a 22% loyalty program signup rate." Include your daily transaction volume, accuracy record, and any upselling or program enrollment metrics. If you've trained other cashiers or managed end-of-day reconciliation, those show additional responsibility.`
    },
    'warehouse-worker': {
      insight: `${jobTitle} candidates with pick rate metrics and safety records are hired first.`,
      detail: `Warehouse operations are measured by throughput and accuracy. "Maintained a pick rate of 120 units per hour against a 95-unit target with a 99.7% accuracy rate, contributing to the facility's zero-injury record over 18 months." Include your pick/pack/ship rates, error rates, and any equipment certifications (forklift, reach truck, order picker). If you've worked with WMS platforms (Manhattan, SAP EWM, Blue Yonder), name them. Safety record is non-negotiable — mention your injury-free tenure and any safety committee participation.`
    },
    'warehouse-manager': {
      insight: `${jobTitle} resumes should quantify throughput improvements and cost per unit metrics.`,
      detail: `Warehouse managers are operations leaders, and your resume should reflect P&L responsibility. "Managed a 250,000 sq ft distribution center with 85 staff processing 15,000 orders daily. Reduced cost per unit shipped by 18% through slotting optimization and zone-based picking, while improving order accuracy from 98.5% to 99.8%." Include your facility size, headcount, daily volume, and at least one efficiency improvement with a dollar impact. If you've led a WMS implementation, facility expansion, or automation project, those are premium experiences.`
    },
    'truck-driver': {
      insight: `${jobTitle} resumes should lead with CDL class, endorsements, and clean driving record.`,
      detail: `Trucking companies evaluate drivers on three things: qualifications, safety, and reliability. Your resume header should include CDL class (A or B), endorsements (Hazmat, Tanker, Doubles/Triples), and years of clean driving record. "CDL-A driver with Hazmat and Tanker endorsements and 8 years of clean MVR. Logged 500,000+ miles OTR with zero preventable accidents and 99% on-time delivery rate." Include your mileage, route type (OTR, regional, local), and cargo specialization. Name the equipment you've operated — 53' dry van, reefer, flatbed, tanker.`
    },
    'delivery-driver': {
      insight: `${jobTitle} candidates who demonstrate route efficiency and delivery completion rates stand out.`,
      detail: `Last-mile delivery is a speed and accuracy game. "Completed an average of 180 deliveries per day across a 120-stop route with a 99.5% delivery success rate and zero customer complaints over 6 months." Include your daily stop count, delivery success rate, and vehicle type. If you've optimized your own routes, maintained your vehicle, or trained new drivers, mention those contributions. GPS and routing software proficiency (Route4Me, OptimoRoute) should be listed alongside any driving licenses.`
    },
    'construction-worker': {
      insight: `${jobTitle} resumes with OSHA certification and specific trade skills get priority callbacks.`,
      detail: `Construction hiring moves fast, and supervisors scan resumes for certifications first. OSHA 10 or OSHA 30, first aid/CPR, and any specialized certifications (rigging, scaffolding, confined space) should be prominently listed. "Experienced in concrete forming, rebar placement, and finish carpentry across residential and commercial projects totaling $5M+. OSHA 30 certified with zero safety incidents across 4 years." Name the project types, the tools and equipment you operate, and any crew leadership experience.`
    },
    'construction-manager': {
      insight: `${jobTitle} resumes must show project value, schedule adherence, and safety records simultaneously.`,
      detail: `Construction management is evaluated on the iron triangle: cost, schedule, and quality — plus safety. "Managed 5 concurrent commercial construction projects totaling $28M with 100% on-time delivery, 3% average under-budget performance, and zero lost-time incidents across 180,000 labor hours." Include total project value managed, crew sizes, and your safety metrics. If you've obtained LEED certifications, managed permitting, or implemented BIM workflows, those differentiate you from other candidates.`
    },
    'architect': {
      insight: `${jobTitle} resumes should include project types, square footage, and licensure details.`,
      detail: `Architecture firms evaluate candidates on project diversity and registration status. "Licensed architect (RA) with 8 years of experience across healthcare, education, and mixed-use commercial projects totaling 2.5M square feet. Led design through construction documentation on a $45M hospital expansion using Revit." Include your licensure state(s), NCARB certification, project types, square footage, and BIM proficiency. If you've managed consultant coordination, code compliance reviews, or LEED submissions, those demonstrate the full scope of architectural practice.`
    },
    'real-estate-agent': {
      insight: `${jobTitle} resumes should quantify transaction volume and average sale price.`,
      detail: `Real estate is a production business. "Closed 42 transactions totaling $18.5M in 2025, ranking in the top 5% of agents at the brokerage. Specialized in first-time homebuyers with a 95% client satisfaction rate and 40% repeat/referral business." Include your transaction count, total volume, average price point, and client segment. If you've earned designations (CRS, ABR, GRI), list them. Marketing innovation — staging strategies, digital advertising ROI, open house conversion rates — differentiates agents who just show transaction counts.`
    },
    'insurance-agent': {
      insight: `${jobTitle} resumes should show policy count, premium volume, and retention rates.`,
      detail: `Insurance agencies hire agents who can produce and retain. "Maintained a book of 850 personal lines policies with $2.1M in annual premium and a 93% retention rate. Generated 120 new policies annually through referral networking and community event marketing." Include your book size, premium volume, product lines (auto, home, life, commercial), and new business production. If you hold multiple licenses (P&C, Life & Health), list them with state registrations. Retention rate is as important as new business — include both.`
    },
    'loan-officer': {
      insight: `${jobTitle} resumes must show funded volume and pull-through rates.`,
      detail: `Mortgage lending is a production role. "Originated and funded $45M in residential mortgage volume across 180 loans in 2025, with a 78% pull-through rate and an average of 25-day close time." Include your total funded volume, loan count, pull-through rate, and average close time. Product mix matters too — conventional, FHA, VA, jumbo, and non-QM each require different expertise. If you have a strong referral network (realtors, financial planners), mention the relationship count and percentage of business from referrals.`
    },
    'loan-processor': {
      insight: `${jobTitle} candidates who demonstrate compliance track records and LOS proficiency advance quickly.`,
      detail: `Loan processing is accuracy-critical, and hiring managers evaluate candidates on their error rates and regulatory compliance. "Processed 35 loan files monthly across conventional, FHA, and VA products with a 97% first-submission approval rate and zero TRID violations across 400+ closed loans." Name your Loan Origination System (Encompass, Calyx Point, BytePro), automated underwriting experience (DU/LP), and compliance track record. Processing speed matters, but accuracy and compliance matter more — lead with those.`
    },
    'bank-teller': {
      insight: `${jobTitle} resumes with referral metrics and balancing accuracy stand out immediately.`,
      detail: `Bank tellers are evaluated on three things: transaction accuracy, referral production, and customer service scores. "Processed 200+ transactions daily with zero balancing discrepancies over 14 months while referring 15+ customers monthly to banking specialists, contributing to $1.2M in new deposit and loan volume." Include your daily transaction volume, balancing record, and referral/cross-sell numbers. If you've earned any branch recognition or completed compliance certifications (BSA/AML), mention those as well.`
    },
    'bank-manager': {
      insight: `${jobTitle} candidates must demonstrate deposit growth and team development together.`,
      detail: `Branch management is a revenue and people leadership role. "Managed a $120M deposit branch with 12 staff, achieving 115% of annual deposit growth target and 108% of loan production goal. Promoted 3 tellers to personal banker roles through a structured mentoring program." Include your deposit base, growth metrics, staff size, and people development track record. Regulatory audit results (CRA, BSA) and community engagement activities are also important — branches are evaluated on compliance and community presence alongside production.`
    },
    'intern': {
      insight: `${jobTitle} applications that demonstrate applied learning and initiative over coursework get interviews.`,
      detail: `I don't expect interns to have industry experience. What I look for is evidence that you've applied classroom knowledge to real situations — student organizations you've improved, research projects you've contributed to, or personal projects that demonstrate curiosity. "Led a 5-person team in a semester-long business case competition, developing a go-to-market strategy that won first place among 30 teams" shows initiative, teamwork, and applied thinking. GPA is a checkbox, not a differentiator — show me what you've done, not just what you've studied.`
    },
    'security-guard': {
      insight: `${jobTitle} resumes should lead with certifications, clearance level, and incident management experience.`,
      detail: `Security companies and facility managers hire guards who are trained, reliable, and can handle pressure. List your state guard license, CPR/First Aid, and any specialized certifications (armed guard, handgun permit, BSIS, fire watch) in a prominent position. "Provided security for a 500,000 sq ft commercial complex with 2,000+ daily occupants. Conducted 12 patrol rounds per shift, identified and resolved 35+ security incidents over 18 months without escalation." Include your site type, occupancy, and how you handled incidents. A clean background and reliability record matter more than flashy descriptions.`
    },
    'security-officer': {
      insight: `${jobTitle} candidates who show de-escalation training and report writing quality advance fastest.`,
      detail: `Security officers are first responders who need judgment as much as vigilance. "Responded to 50+ incidents monthly including trespassing, theft, and medical emergencies, de-escalating 90% without law enforcement involvement. Wrote detailed incident reports used in 3 successful prosecutions." Include your response statistics, de-escalation success rate, and any training certifications (Crisis Prevention Institute, verbal de-escalation). Report writing quality directly impacts your value — if your reports have supported legal proceedings, say so explicitly.`
    },
    'flight-attendant': {
      insight: `${jobTitle} resumes should emphasize safety training qualifications and service languages.`,
      detail: `Airlines evaluate flight attendant candidates on safety competency first, service ability second. Lead with your certifications: FAA Certificate of Demonstrated Proficiency, CPR/AED, CRM (Crew Resource Management), and aircraft-type qualifications. "Completed 4,000+ flight hours across B737 and A320 fleets with zero safety violations. Delivered bilingual (English/Spanish) service to an average of 180 passengers per flight, maintaining a 4.8/5.0 passenger satisfaction rating." Language skills significantly increase your value — list every language with your proficiency level.`
    },
    'personal-trainer': {
      insight: `${jobTitle} resumes should quantify client retention rates and transformation outcomes.`,
      detail: `Personal training is a retention business. "Maintained a roster of 35 active clients with a 90% 6-month retention rate, significantly above the gym average of 55%. Helped 15+ clients achieve documented transformation goals including 20+ lb weight loss, marathon completion, and post-surgery rehabilitation milestones." Include your certification (NASM, ACE, CSCS, ISSA), client retention rate, and specific outcome examples. If you've grown your client base through referrals, mention the referral rate — it proves client satisfaction better than any adjective.`
    },
    'fitness-trainer': {
      insight: `${jobTitle} candidates who demonstrate class attendance growth and program design stand out.`,
      detail: `Fitness trainers are evaluated on client engagement and programming creativity. "Designed and led 15 group fitness classes weekly across HIIT, strength, and yoga modalities, growing average class attendance from 12 to 22 participants over 6 months." Include your certification, specialties, class types, and attendance metrics. If you've created custom workout programming for special populations (seniors, prenatal, rehabilitation), that specialization adds significant value. Your resume should show you can fill classes and keep members coming back.`
    },
    'caregiver': {
      insight: `${jobTitle} resumes that show specific care skills and client trust indicators are prioritized.`,
      detail: `Families and agencies hiring caregivers want to know they can trust you with their loved ones. Include specific care capabilities: medication management, mobility assistance, dementia care, wound care, vital signs monitoring. "Provided in-home care for 5 elderly clients across 3 years, managing medication schedules for 15+ prescriptions, assisting with ADLs, and coordinating with physicians and family members. Maintained a perfect attendance record with zero missed shifts." Include your certifications (CNA, HHA, CPR), client duration (long-term retention signals trust), and any specialized training.`
    },
    'social-worker': {
      insight: `${jobTitle} resumes should demonstrate caseload management and intervention outcomes.`,
      detail: `Social work hiring managers need to know you can handle volume and complexity. "Managed a caseload of 45 child welfare cases, completing 95% of home visits within mandated timeframes and achieving permanent placements for 22 children within 12 months." Include your license type (LCSW, LMSW, LSW), caseload size, population served, and measurable outcomes. If you've developed program curriculum, facilitated support groups, or contributed to grant proposals, those show impact beyond individual case management. Document your outcome metrics — they're what separates experienced social workers from entry-level applicants.`
    },
    'legal-assistant': {
      insight: `${jobTitle} candidates who name specific practice areas and case management software get callbacks.`,
      detail: `Legal assistants are hired for practice-area fit and technology proficiency. "Supported 3 attorneys in a commercial litigation practice, managing 40+ active case files in Clio, preparing discovery documents totaling 10,000+ pages, and drafting motions and correspondence for attorney review." Name your practice areas (litigation, corporate, family, immigration, IP), case management software (Clio, MyCase, PracticePanther), and e-discovery tools if applicable. Volume metrics — case count, document pages, filing deadlines met — demonstrate that you can handle the pace.`
    },
    'project-engineer': {
      insight: `${jobTitle} resumes that tie engineering deliverables to project schedule impact get promoted faster.`,
      detail: `Project engineers sit at the intersection of technical work and project management. "Delivered structural analysis packages for 3 concurrent bridge rehabilitation projects totaling $12M, completing all engineering deliverables on schedule with zero design-related field changes." The key differentiator is connecting your technical work to project-level outcomes — not just what you designed, but how your work kept the project on track or improved it. Include project value, your specific technical contributions, and any RFI response metrics or change order management.`
    },
    'civil-engineer': {
      insight: `${jobTitle} resumes should specify project types, permit approvals, and PE licensure status.`,
      detail: `Civil engineering hiring managers check three things immediately: PE license status, project types, and software proficiency. "PE-licensed civil engineer with 7 years of experience in land development and stormwater management. Designed grading and drainage plans for 15 residential subdivisions totaling 2,000+ lots, achieving first-submission permit approval on 80% of projects." Include your license state(s), EIT/PE status, design software (Civil 3D, HydroCAD, StormCAD), and regulatory frameworks you work under. Project variety and permit success rates demonstrate competence.`
    },
    'mechanical-engineer': {
      insight: `${jobTitle} candidates who show patent involvement or product launch contributions stand out.`,
      detail: `Mechanical engineering resumes that demonstrate contribution to shipped products or patented innovations differentiate candidates from those who only describe design tasks. "Designed a thermal management system for a consumer electronics product that shipped 2M+ units, achieving a 15% reduction in operating temperature. Co-inventor on 2 utility patents related to heat dissipation in compact enclosures." If you have patents (granted or pending), list them. If your designs are in production, name the product, production volume, and your design contribution.`
    },
    'electrical-engineer': {
      insight: `${jobTitle} resumes should include schematic complexity and certification standards met.`,
      detail: `Electrical engineering roles vary dramatically by industry. Your resume should immediately clarify your domain: power systems, embedded systems, PCB design, or control systems. "Designed a 12-layer mixed-signal PCB for a medical device under IEC 60601 and FDA 510(k) requirements, passing EMC and safety testing on the first submission." Include your design tools (Altium, OrCAD, KiCad, MATLAB/Simulink), industry standards (UL, IEC, IEEE), and the complexity level of your designs. First-pass certification success rates demonstrate quality.`
    },
    'industrial-engineer': {
      insight: `${jobTitle} resumes that quantify throughput improvements and waste reduction get immediate attention.`,
      detail: `Industrial engineering is about making systems more efficient, and your resume should be a portfolio of improvements. "Redesigned a production line layout using time-motion analysis and simulation (Arena), increasing throughput by 25% and reducing WIP inventory by $340K." Include your methodology (Lean, Six Sigma, value stream mapping, simulation), the scale of operations you've improved, and the dollar impact. Green Belt or Black Belt certification with a project portfolio is strong evidence — but the projects and their outcomes matter more than the certification itself.`
    },
    'data-entry-clerk': {
      insight: `${jobTitle} resumes that show keystrokes per hour and accuracy rates get priority.`,
      detail: `Data entry is measured by speed and accuracy. "Maintained a data entry speed of 12,000 keystrokes per hour with a 99.8% accuracy rate, processing 500+ records daily across medical billing and insurance claim forms." Include your typing speed (KPH or WPM), error rate, daily volume, and the data types you've handled. Name the software platforms (Excel, SAP, Salesforce, medical billing systems) and any data validation processes you follow. If you've identified and corrected data quality issues beyond your scope, mention those — it shows attention to detail beyond the minimum.`
    },
    'data-entry-operator': {
      insight: `${jobTitle} candidates who demonstrate data quality improvement initiatives are rare and valued.`,
      detail: `Data entry operators who go beyond inputting data to improving data quality are the ones I promote. "Processed 600+ records daily from handwritten medical forms into Epic EMR with a 99.6% accuracy rate. Identified and flagged 45+ data inconsistencies monthly, leading to a departmental quality review that corrected a systemic coding error affecting 2,000+ patient records." Show initiative beyond task completion. If you've suggested process improvements, created verification checklists, or trained new operators, those contributions set you apart from volume-only performers.`
    },
    'data-entry-specialist': {
      insight: `${jobTitle} resumes should highlight specialized data types and system migration experience.`,
      detail: `Specialists are hired for domain expertise. If you've worked with specific data types — medical records, financial data, legal documents, inventory systems — name them and the platforms involved. "Migrated 50,000+ product records from legacy ERP to SAP S/4HANA, validating data integrity across 15 fields per record with a 99.9% post-migration accuracy rate." System migration and database cleanup projects demonstrate higher-level capability than routine data entry. Include your volume, error rate, and any project-based work alongside daily operations.`
    },
    'virtual-assistant': {
      insight: `${jobTitle} resumes should specify client industries, tool stack, and response time metrics.`,
      detail: `Virtual assistant hiring depends on industry fit and technology proficiency. "Provided executive-level virtual support to 5 concurrent clients in real estate, e-commerce, and consulting. Managed email inboxes (500+ daily), scheduled 30+ meetings weekly, and maintained CRM databases (HubSpot, Salesforce). Average email response time under 30 minutes during business hours." Include your client count, industries served, and the specific tools you use daily. If you've managed social media, bookkeeping, or project management tools, those additional capabilities justify higher rates.`
    },
    'yoga-instructor': {
      insight: `${jobTitle} resumes should show class variety, student retention, and specialty certifications.`,
      detail: `Yoga studios hire instructors who can fill classes and retain students. "Taught 12 weekly classes across vinyasa, yin, and prenatal yoga with an average attendance of 18 students per class and a 75% weekly return rate. Grew my Saturday morning vinyasa class from 8 to 28 regular attendees over 6 months." Include your 200-hour or 500-hour RYT certification, specialty training (prenatal, trauma-informed, aerial, restorative), and attendance growth metrics. If you've developed workshop programming or teacher training content, that shows leadership within the discipline.`
    },
    'hvac-technician': {
      insight: `${jobTitle} candidates should list EPA certifications, system types, and first-time fix rates.`,
      detail: `HVAC hiring managers look for certification, equipment range, and reliability. "EPA 608 Universal certified technician with 6 years of experience servicing residential and commercial systems (Carrier, Trane, Lennox, Daikin). Completed an average of 8 service calls daily with a 92% first-time fix rate." Include your EPA certification type, NATE certification if applicable, equipment brands and system types (split systems, packaged units, VRF, chillers), and service volume. If you've installed new systems, include tonnage and project value — installation experience commands higher pay.`
    },
    'automotive-technician': {
      insight: `${jobTitle} resumes should list ASE certifications and flat-rate productivity metrics.`,
      detail: `Automotive shops evaluate technicians on certifications and efficiency. "ASE Master Technician (A1-A8) with 10 years of experience at a high-volume Toyota dealership. Consistently clocked 55+ flat-rate hours per week against a 40-hour guarantee, with a 98% customer comeback rate." Include every ASE certification, manufacturer-specific training (Toyota T-TEN, GM ASEP, Ford ASSET), and your flat-rate productivity. Diagnostic capability is increasingly important — mention your scan tool proficiency and experience with ADAS calibration, hybrid/EV systems, or advanced diagnostics.`
    },
    'heavy-equipment-operator': {
      insight: `${jobTitle} resumes with specific machine types and project scale details get hired quickly.`,
      detail: `Equipment operators are hired for specific machines. "Operated CAT 330 excavator, D8 dozer, and 950 wheel loader across highway, pipeline, and commercial site work projects totaling $50M+. Maintained zero equipment damage incidents across 5 years." List every machine type you're certified to operate, the project types and scale, and your safety record. GPS/machine control system experience (Trimble, Topcon, Leica) is increasingly valuable and should be listed prominently. Production metrics — cubic yards moved per shift — demonstrate efficiency.`
    },
    'cnc-operator': {
      insight: `${jobTitle} resumes that show programming capability alongside operation skills command higher offers.`,
      detail: `CNC operators who can also program are significantly more valuable. "Operated and programmed 3-axis and 5-axis CNC mills (Haas, DMG Mori) using Mastercam and FANUC controls. Maintained tolerances of ±0.0005\" across production runs of 500+ aerospace components with a 99.2% first-article acceptance rate." Include the machine types, control systems, programming software, material types, and tolerance levels you work with. If you've optimized cycle times, developed custom fixturing, or reduced scrap rates, quantify those improvements.`
    },
    'machine-operator': {
      insight: `${jobTitle} candidates who show preventive maintenance capability alongside operation are preferred.`,
      detail: `Machine operators who can identify problems before they cause downtime are worth more than operators who just run the machine. "Operated a high-speed packaging line producing 800 units/hour, performing daily preventive maintenance checks that contributed to 97% uptime across 12 months — exceeding the 92% plant average." Include your production rates, machine types, quality metrics (reject rates), and any maintenance capabilities. If you've been cross-trained on multiple machines, that flexibility is a hiring advantage — list all equipment types you can operate.`
    },
    'maintenance-technician': {
      insight: `${jobTitle} resumes that quantify downtime reduction and preventive maintenance compliance stand out.`,
      detail: `Maintenance is measured by equipment availability. "Maintained 95% uptime across 50+ pieces of production equipment in a 24/7 manufacturing facility. Reduced unplanned downtime by 30% through implementing a preventive maintenance schedule in SAP PM." Include the equipment types you service, facility type, CMMS platform (SAP PM, Maximo, Fiix), and any specialized skills (PLC troubleshooting, welding, electrical). Response time metrics — "average emergency response time of 15 minutes" — demonstrate reliability.`
    },
    'maintenance-manager': {
      insight: `${jobTitle} resumes should show budget management, team leadership, and equipment uptime metrics together.`,
      detail: `Maintenance management is an operations leadership role. "Managed a 12-person maintenance team responsible for a 350,000 sq ft manufacturing facility with $2M annual maintenance budget. Improved overall equipment effectiveness from 78% to 89% while reducing maintenance spending by 15% through predictive maintenance implementation." Include your team size, budget, facility type, and OEE or uptime improvements. If you've led capital projects, equipment installations, or CMMS implementations, include project scope and outcomes. CMRP or CRL certification demonstrates professional development.`
    },
    'maintenance-engineer': {
      insight: `${jobTitle} candidates who show reliability engineering methodology get prioritized.`,
      detail: `Maintenance engineers are hired to move organizations from reactive to proactive maintenance. "Implemented a reliability-centered maintenance program across 3 production lines, using vibration analysis and thermography to identify failures before they occurred. Reduced unplanned downtime from 8% to 2.5% and extended mean time between failures by 40%." Include your reliability engineering methodology (RCM, FMEA, root cause analysis), predictive maintenance technologies used, and the quantified impact on equipment availability and maintenance costs.`
    },
    'property-manager': {
      insight: `${jobTitle} resumes should quantify portfolio size, occupancy rates, and NOI improvements.`,
      detail: `Property management is evaluated on financial performance. "Managed a portfolio of 12 multifamily properties totaling 850 units with a combined value of $120M. Maintained 96% average occupancy and improved NOI by 12% through utility cost reduction and strategic rent positioning." Include unit count, property types, occupancy rates, and NOI or revenue metrics. If you've managed capital improvement projects, led property acquisitions, or implemented property management software (Yardi, AppFolio, RealPage), include scope and outcomes. Delinquency rate improvements and tenant retention metrics are also valuable.`
    },
    'event-planner': {
      insight: `${jobTitle} resumes should include event scale, budget management, and attendee satisfaction data.`,
      detail: `Event planners are evaluated on the scale and success of events delivered. "Planned and executed 35+ corporate events annually ranging from 50 to 2,000 attendees, managing budgets from $10K to $500K with an average of 5% under-budget delivery." Include event types (corporate, wedding, conference, non-profit), attendee counts, budget sizes, and any satisfaction metrics. Vendor management (number of vendor relationships maintained) and logistics complexity (multi-venue, multi-day, destination events) demonstrate advanced capability.`
    },
    'event-manager': {
      insight: `${jobTitle} candidates who show ROI metrics for corporate events stand apart from logistics coordinators.`,
      detail: `Event management at the corporate level is tied to business outcomes. "Managed a $2M annual events budget across 8 flagship conferences and 25 regional events, generating 3,500 qualified leads and $4.2M in attributable pipeline." For corporate event managers, include lead generation, sponsorship revenue, and attendee-to-customer conversion rates. For agency event managers, include client retention and event P&L. Moving beyond logistics ("coordinated 200-person gala") to business impact ("200-person gala raised $450K against a $80K production cost") demonstrates management-level thinking.`
    },
    'event-coordinator': {
      insight: `${jobTitle} resumes should emphasize multi-event management and vendor coordination capacity.`,
      detail: `Coordinators are the execution engines of event teams. "Coordinated logistics for 40+ events annually including venue booking, catering, A/V setup, and on-site management for events ranging from 25 to 500 attendees." Include your concurrent event capacity, vendor relationships managed, and any process improvements. "Created a standardized event checklist and timeline template that reduced setup errors by 60% and was adopted by the entire 8-person events team" shows both execution and process improvement capability.`
    },
    'quality-control': {
      insight: `${jobTitle} resumes should lead with defect rate improvements and inspection methodology.`,
      detail: `Quality control is about measurable improvement. "Implemented an incoming inspection protocol using AQL sampling (Level II, 1.0 AQL) that reduced defective material reaching the production line by 75%. Conducted 200+ inspections monthly using CMM, optical comparators, and gauge systems." Include your inspection tools, standards (ISO 9001, AS9100, IATF 16949), defect rates achieved, and volume of inspections. If you've contributed to corrective action processes (8D, CAPA) or participated in customer audits, include those experiences.`
    },
    'quality-engineer': {
      insight: `${jobTitle} candidates who demonstrate process capability improvements get shortlisted immediately.`,
      detail: `Quality engineers are hired to improve Cpk and reduce variation. "Improved process capability from Cpk 1.0 to Cpk 1.67 on a critical dimension for an automotive safety component through DOE-based parameter optimization and gauge R&R validation." Include your statistical tools (Minitab, JMP), quality system experience (APQP, PPAP, FMEA, control plans), and measurable quality improvements. If you've led supplier quality development, audit programs, or customer complaint reduction initiatives, include the scope and results. Process capability data speaks louder than quality certifications alone.`
    },
    'it-manager': {
      insight: `${jobTitle} resumes should demonstrate infrastructure reliability and team development together.`,
      detail: `IT managers are evaluated on system uptime and team capability. "Managed a 10-person IT department supporting 500 users across 3 offices with 99.95% network uptime. Reduced help desk ticket resolution time from 8 hours to 2 hours through tiered support restructuring and knowledge base implementation." Include your team size, user population, infrastructure scope (on-prem, cloud, hybrid), and service level metrics. Budget management, vendor relationships, and security posture improvements (audit results, incident reduction) round out a complete IT management profile.`
    },
    'it-director': {
      insight: `${jobTitle} candidates must show technology strategy alignment with business objectives.`,
      detail: `IT directors bridge technology and business strategy. "Developed and executed a 3-year IT roadmap aligned with the company's expansion from 2 to 7 locations, including infrastructure standardization, cloud migration (Azure), and ERP implementation (NetSuite). Total IT budget: $4.5M." Include your budget size, strategic initiatives, and how they supported business goals. Board or C-suite presentation experience, M&A technology integration, and enterprise security program development demonstrate the strategic altitude required at the director level.`
    },
    'it-specialist': {
      insight: `${jobTitle} resumes should specify systems managed and ticket resolution metrics.`,
      detail: `IT specialists are generalists who need to show breadth with evidence. "Supported 200+ users across Windows, macOS, and Linux environments. Managed Active Directory, Office 365, and network infrastructure (Cisco Meraki). Resolved 15+ tickets daily with a 94% first-contact resolution rate and average response time under 30 minutes." Name every platform, system, and tool you support. Include ticket volume, resolution times, and any projects you've completed (migrations, upgrades, deployments). IT specialist resumes that just list technologies without operational context get overlooked.`
    },
    'network-engineer': {
      insight: `${jobTitle} resumes that include network scale and uptime metrics demonstrate real capability.`,
      detail: `Network engineering is an infrastructure discipline measured by availability and performance. "Designed and maintained a multi-site WAN connecting 12 locations with 99.99% uptime using Cisco SD-WAN and Palo Alto firewalls. Managed network infrastructure supporting 2,000 users and 500+ network devices." Include network scale (sites, users, devices), vendor platforms (Cisco, Juniper, Arista, Palo Alto), protocol expertise (BGP, OSPF, MPLS), and certifications (CCNP, CCIE). Migration projects, security implementations, and capacity planning exercises demonstrate senior-level thinking.`
    },
    'system-administrator': {
      insight: `${jobTitle} resumes should quantify uptime, automation, and environment scale.`,
      detail: `Sysadmins are the backbone of IT operations. "Managed 200+ Linux and Windows servers in a hybrid cloud environment (on-prem VMware + AWS), maintaining 99.98% uptime. Automated routine maintenance tasks using Ansible, reducing manual administration by 20 hours per week." Include your environment scale (server count, user count), platforms (Linux distros, Windows Server versions, hypervisors), and automation tools. If you've led migrations, disaster recovery testing, or capacity planning, those demonstrate senior sysadmin capability beyond daily operations.`
    },
    'cio': {
      insight: `${jobTitle} resumes must demonstrate technology-driven business transformation.`,
      detail: `CIOs are C-suite executives evaluated on strategic impact. "Led a digital transformation initiative that migrated the organization from on-premises legacy systems to a cloud-native architecture, reducing IT operational costs by 30% ($8M annually) while enabling a new direct-to-consumer revenue channel generating $15M in year one." Include board-level communication experience, total IT budget managed, organizational change leadership, and enterprise-wide technology decisions. CIO resumes should read as business transformation narratives, not technology implementation logs.`
    },
    'chief-of-staff': {
      insight: `${jobTitle} resumes should demonstrate strategic initiative execution and cross-functional influence.`,
      detail: `Chief of Staff roles require a unique blend of strategic thinking and execution. "Supported the CEO in managing a $200M organization, driving 5 cross-functional strategic initiatives including international expansion, acquisition integration, and organizational restructuring. Reduced executive meeting time by 40% through agenda restructuring while improving decision-tracking completion from 60% to 95%." Show the scope of your executive's organization, the initiatives you drove, and measurable outcomes. This role is about making the executive and the organization more effective — your resume should prove you did both.`
    },
    'consultant': {
      insight: `${jobTitle} resumes should show client outcomes and engagement scope, not just methodologies.`,
      detail: `Consulting firms and client-side hiring managers evaluate consultants on impact. "Delivered 12 consulting engagements across healthcare and financial services, ranging from 3-month operational assessments to 18-month transformation programs totaling $8M in professional fees." Include engagement count, client industries, project types, and client outcomes. "Identified $4.5M in operational savings for a hospital network through supply chain optimization and labor scheduling improvements, with $3.1M implemented within 6 months" — this connects your work to results that matter.`
    },
    'management-consultant': {
      insight: `${jobTitle} resumes from MBB and Big 4 candidates should show progression; independent consultants should show results.`,
      detail: `The resume format differs based on your consulting background. If you're at McKinsey, BCG, Bain, or Big 4, reviewers expect rapid progression: analyst to associate to engagement manager with increasing scope. If you're an independent consultant, results matter more than titles: "Engaged by a PE-backed SaaS company to redesign go-to-market strategy, contributing to a 35% increase in new logo acquisition over 2 quarters." In both cases, quantify engagement scope (team size, duration, fee), client level (CEO, board, VP), and measurable outcomes.`
    },
    'operations-manager': {
      insight: `${jobTitle} resumes should lead with P&L ownership, headcount, and efficiency metrics.`,
      detail: `Operations management is measured by efficiency, cost control, and team productivity. "Managed daily operations for a $15M manufacturing facility with 85 employees across 3 shifts. Improved production output by 22% while reducing overtime costs by $180K annually through lean manufacturing implementation and cross-training." Include your P&L responsibility, headcount, facility type, and at least 2-3 operational improvements with dollar impact. Operations managers who show continuous improvement methodology (Lean, Six Sigma) alongside results demonstrate they have both the tools and the execution ability.`
    },
    'operations-analyst': {
      insight: `${jobTitle} candidates who show process improvement recommendations that were implemented get hired.`,
      detail: `The difference between a good operations analyst and a great one is implementation. "Analyzed fulfillment operations data identifying a 15% inefficiency in pick paths. Designed a new warehouse slotting strategy and presented the business case to leadership — the implemented changes reduced labor cost per order by 12% ($340K annually)." Include the analytical tools you used (SQL, Python, Tableau, Excel), the operational domain you analyzed, and — critically — whether your recommendations were implemented and what resulted. Analysis without action is just reporting.`
    },
    'executive-director': {
      insight: `${jobTitle} resumes in non-profit should lead with fundraising results and mission impact.`,
      detail: `Executive directors of non-profit organizations are evaluated on fundraising, mission delivery, and organizational health. "Led a 50-employee non-profit with a $6M annual budget, growing fundraising revenue by 35% over 3 years through major gift cultivation and grant diversification. Expanded program reach from 5,000 to 12,000 annual beneficiaries while maintaining a 92% program expense ratio." Include total budget, staff size, fundraising growth, and measurable mission impact (lives served, outcomes achieved). Board management experience and audit results demonstrate governance capability.`
    },
    'correctional-officer': {
      insight: `${jobTitle} resumes should highlight incident management training and inmate-to-staff ratios.`,
      detail: `Corrections hiring prioritizes safety and temperament. "Supervised a housing unit of 120 inmates maintaining order through de-escalation techniques and consistent policy enforcement. Conducted 15+ security rounds per shift with zero escape incidents and a 90% reduction in housing unit use-of-force incidents after implementing a structured conflict resolution program." Include your facility type (federal, state, county, private), security level, inmate ratio, and specialized training (defensive tactics, crisis intervention, contraband detection). A clean disciplinary record is implied — use the space for operational achievements instead.`
    },
    'teaching-assistant': {
      insight: `${jobTitle} resumes should show student impact metrics, not just classroom duties.`,
      detail: `Teaching assistants who can demonstrate student learning outcomes are significantly more competitive. "Provided individualized support to 8 students with IEPs in a 3rd grade inclusion classroom. Students on my caseload showed an average of 1.5 grade levels of reading growth as measured by running records over the school year." Include grade level, student count, specific support provided (small group instruction, behavior management, one-on-one tutoring), and any measurable student progress. If you've created materials, led enrichment activities, or managed classroom technology, those contributions demonstrate initiative.`
    },
    'medical-coder': {
      insight: `${jobTitle} resumes should specify coding systems, accuracy rates, and certification type.`,
      detail: `Medical coding is precision work with direct revenue impact. "Coded 80+ patient encounters daily in ICD-10-CM, CPT, and HCPCS Level II for a multi-specialty clinic, maintaining a 98.5% first-pass claim accuracy rate and reducing coding-related denials by 25%." Include your certification (CPC, CCS, CCA, CRC), specialty coding experience, coding volume, and accuracy rates. If you've audited other coders' work, identified upcoding/downcoding patterns, or contributed to charge capture optimization, those demonstrate advanced capability beyond entry-level coding.`
    },
    'medical-billing-specialist': {
      insight: `${jobTitle} candidates who show denial management and collection rate improvements get priority.`,
      detail: `Medical billing success is measured by clean claim rates, denial management, and collections. "Managed billing for a 15-provider orthopedic practice generating $8M annually. Improved clean claim rate from 88% to 96% and reduced average A/R days from 45 to 28 through systematic denial analysis and payer follow-up protocols." Include the practice type and size, revenue volume, claim submission rates, denial management results, and A/R metrics. Name your billing software (Epic, AdvancedMD, Kareo, athenaCollector) and payer expertise (Medicare, Medicaid, commercial, workers' comp).`
    },
    'resident-assistant': {
      insight: `${jobTitle} resumes should emphasize crisis response experience and community building outcomes.`,
      detail: `Residence life professionals evaluate RAs on two dimensions: crisis management capability and community development impact. "Served as RA for a 60-resident dormitory floor, responding to 15+ crisis situations (medical emergencies, roommate conflicts, mental health interventions) and coordinating with campus police and counseling services. Organized 20+ programming events with 75% average attendance — the highest participation rate among 12 RAs." Include floor size, crisis response examples, programming frequency, and participation metrics. If your floor had strong retention or academic performance data, include those outcomes.`
    },
    'support-worker': {
      insight: `${jobTitle} resumes should demonstrate client dignity and specific care competencies.`,
      detail: `Support worker positions prioritize empathy, reliability, and specific care skills. "Provided person-centered support to 8 adults with intellectual disabilities in a residential group home setting, assisting with daily living activities, medication administration, and community integration. Implemented individualized behavior support plans resulting in a 40% reduction in challenging behaviors across my caseload." Include your client population (developmental disabilities, mental health, elderly, physical disabilities), care setting (residential, day program, home care), and any specialized training. Client outcomes — not just task descriptions — demonstrate professional-level support.`
    },
  };

  return map[slug] || null;
}

function getCategoryTip(jobTitle, category, skills) {
  const cat = category || 'General';
  const skill1 = skills?.[0] || '';
  const skill2 = skills?.[1] || '';
  const skill3 = skills?.[2] || '';

  const categoryTips = {
    "Technology": {
      insight: `${jobTitle} candidates who demonstrate measurable technical impact get interviews over those listing tools.`,
      detail: `When I review ${jobTitle} applications, I skip resumes that read like technology inventories. The candidates who get callbacks describe what they built, the scale it operated at, and the business outcome it delivered. "${skill1}" and "${skill2}" are expected for this role — what differentiates you is proving you applied those skills to solve real problems. Every technical bullet on your resume should answer three questions: what did you build, how big was it, and what improved because of your work? If you can't answer all three for a bullet point, rewrite it until you can.`
    },
    "Engineering": {
      insight: `${jobTitle} hiring managers scan for project scale and regulatory context before anything else.`,
      detail: `Engineering resumes that list capabilities without context — "${skill1}, ${skill2}, ${skill3}" — don't tell me what level you operate at. The same skills applied to a student project and a $50M capital project are evaluated completely differently. For every role on your resume, I need to know the project type, the scale (dollar value, capacity, team size), and the regulatory environment (ASME, IEEE, ISO, FDA, EPA). "Designed heat exchangers" vs. "Designed 3 shell-and-tube heat exchangers for a 50,000 BPD refinery unit under ASME Section VIII" — the second version gets interviews.`
    },
    "Healthcare": {
      insight: `${jobTitle} resumes should lead with patient volume, certification credentials, and quality metrics.`,
      detail: `Healthcare hiring moves fast, and clinical managers scan resumes with a checklist: correct credentials, patient or procedure volume, and quality outcomes. For ${jobTitle} positions specifically, make sure your certifications appear in the first few lines, followed by your clinical volume metrics. If you've maintained patient satisfaction scores above benchmark, achieved zero incident periods, or reduced wait times, those metrics are more valuable than listing responsibilities that every ${jobTitle} performs. Healthcare hiring is increasingly metrics-driven — give the numbers.`
    },
    "Finance": {
      insight: `${jobTitle} resumes that quantify financial impact and name specific platforms are prioritized.`,
      detail: `Financial services hiring managers expect precision — in your work and on your resume. For ${jobTitle} applications, include the dollar volumes you've managed, the financial systems you've used (name the exact platform), and your compliance track record. "${skill1}" and "${skill2}" are table-stakes qualifications. What differentiates candidates is demonstrating how your financial acumen translated into measurable outcomes: cost savings identified, revenue protected, risk mitigated, or processing efficiency gained. If you've passed regulatory audits with clean results, say so explicitly — compliance is non-negotiable in this industry.`
    },
    "Business": {
      insight: `${jobTitle} candidates who show revenue or efficiency impact get moved to the top of the pile.`,
      detail: `Business roles are ultimately evaluated on their contribution to the bottom line. Whether your impact was revenue growth, cost reduction, or process efficiency, quantify it. For ${jobTitle} specifically, I look for evidence that you understand the business context of your work — not just what you did, but why it mattered to the organization. "Managed ${skill1} initiatives" is a task. "Led ${skill1} initiatives that resulted in a 15% improvement in operational efficiency, saving $200K annually" is a business outcome. Frame every accomplishment in terms the CFO would understand.`
    },
    "Management": {
      insight: `${jobTitle} resumes must demonstrate team development alongside business results.`,
      detail: `At the management level, individual contribution matters less than the performance of your team. For ${jobTitle} applications, include your team size, team performance metrics, and at least one example of developing talent (promotions, skill development, retention improvements). The best management resumes show that results improved because of how you led, not despite your team. "Managed a team of 15" is a structure statement. "Managed a team of 15, improving team productivity by 20% while reducing turnover from 30% to 12% through weekly coaching and career development planning" is a leadership statement.`
    },
    "Sales": {
      insight: `${jobTitle} resumes are scorecards — if you can't show your numbers, you won't get an interview.`,
      detail: `Sales hiring is the most metrics-driven in any organization. Your ${jobTitle} resume should include quota attainment (percentage, not just "exceeded"), deal sizes, pipeline value, and win rates. I want to see consistency: "Exceeded quota in 6 of 8 quarters" is more impressive than "Exceeded quota by 200% once" because it demonstrates reliability. Include your sales methodology (MEDDIC, Challenger, SPIN), territory scope, and the decision-maker level you sell to. If you've been President's Club or won performance awards, place them prominently.`
    },
    "Marketing": {
      insight: `${jobTitle} resumes need performance data — impressions, conversions, and revenue attribution.`,
      detail: `Marketing has become a data-driven discipline, and your ${jobTitle} resume should reflect that reality. Campaign descriptions without performance metrics — "Managed social media campaigns" — tell me nothing about your effectiveness. Include channel-specific metrics: conversion rates, cost per acquisition, return on ad spend, engagement rates, or lead generation volume. The most competitive ${jobTitle} candidates connect their marketing activities to pipeline or revenue outcomes. If your work influenced sales results, quantify the connection. Marketing that can't demonstrate business impact is increasingly hard to justify.`
    },
    "HR": {
      insight: `${jobTitle} candidates who demonstrate measurable people outcomes get prioritized over those listing HR functions.`,
      detail: `HR has shifted from administrative function to business partner, and your ${jobTitle} resume should reflect that evolution. Instead of listing HR processes you've managed, show the outcomes: retention rate improvements, time-to-fill reductions, engagement score increases, or training program effectiveness measured by performance data. "${skill1}" is expected. What hiring managers want to see is how your ${skill1} expertise translated into better people metrics that impacted the business. If you've reduced turnover, improved diversity metrics, or achieved clean audit results, quantify every claim.`
    },
    "Administrative": {
      insight: `${jobTitle} resumes that show system improvements — not just system use — demonstrate advancement potential.`,
      detail: `Administrative professionals who maintain existing processes are adequate. Those who improve them are promotable. Your ${jobTitle} resume should include at least 2-3 examples of processes you've made more efficient: time saved, errors reduced, or systems implemented. "${skill1}" and "${skill2}" are operational competencies — but "Streamlined the ${skill1} process reducing processing time from 2 days to 4 hours" shows you add value beyond task completion. Hiring managers promote administrative staff who think about efficiency, not just execution.`
    },
    "Customer Service": {
      insight: `${jobTitle} hiring is entirely metrics-driven — satisfaction scores, resolution rates, and volume.`,
      detail: `Customer-facing roles are evaluated on measurable service quality. For ${jobTitle} positions, include your CSAT score (or equivalent), first-contact resolution rate, average handle time, and daily/weekly volume. If you've been recognized as a top performer, include your ranking ("Top 5% of 200 agents"). If you've mentored new team members or contributed to knowledge base content, those show leadership potential. "Provided excellent customer service" is meaningless without data. "Maintained a 97% satisfaction score across 2,000+ interactions" is proof.`
    },
    "Retail": {
      insight: `${jobTitle} resumes should include sales figures, shrink control, and team performance metrics.`,
      detail: `Retail hiring managers want to see revenue contribution, loss prevention awareness, and customer engagement. For ${jobTitle} applications, include your sales performance (personal or store-level), conversion rates, average transaction value, and any shrink or inventory management results. If you've trained staff, implemented merchandising changes, or managed schedules, include the team size and any efficiency gains. "Worked in retail" doesn't differentiate. "Contributed $45K in monthly sales with a 28% conversion rate and 0.8% shrink rate" demonstrates measurable impact.`
    },
    "Logistics": {
      insight: `${jobTitle} candidates who quantify throughput, accuracy, and cost metrics are hired over those who describe duties.`,
      detail: `Logistics is an operations discipline measured by efficiency and reliability. Your ${jobTitle} resume should include processing volumes (orders per day, pallets per shift, shipments per week), accuracy rates, and cost metrics. Name your WMS or TMS platform (SAP, Manhattan, Oracle, Blue Yonder) and any process improvement methodology you've applied. "Managed warehouse operations" tells me your job title. "Processed 2,000 orders daily with 99.7% accuracy while reducing cost-per-order by 15% through pick-path optimization" tells me your value.`
    },
    "Supply Chain": {
      insight: `${jobTitle} resumes should demonstrate cost savings, lead time improvements, and supplier management scope.`,
      detail: `Supply chain professionals are hired to reduce costs and improve reliability. "Managed supplier relationships" is a function. "Managed 45 suppliers across 3 countries, renegotiating contracts that reduced material costs by 12% ($2.1M annually) while improving on-time delivery from 88% to 96%" is an outcome. Include your procurement volume, supplier count, geographic scope, and measurable improvements. If you've implemented demand planning tools, managed inventory optimization projects, or led sourcing transitions, quantify the scope and impact of each initiative.`
    },
    "Consulting": {
      insight: `${jobTitle} resumes should lead with client impact, not internal methodology descriptions.`,
      detail: `Consulting clients pay for results, and your ${jobTitle} resume should demonstrate them. For every engagement or project, include the client type (industry, company size), the problem scope, and the measurable outcome your work delivered. "Identified $3M in cost savings through operational efficiency improvements for a mid-market manufacturing client" directly demonstrates value. "Conducted business analysis and stakeholder interviews" describes a process without an outcome. Consultants are hired for impact — make sure every bullet on your resume proves you deliver it.`
    },
    "Hospitality": {
      insight: `${jobTitle} candidates who show guest satisfaction scores and revenue metrics stand out immediately.`,
      detail: `Hospitality hiring managers look for service excellence backed by data. For ${jobTitle} applications, include guest satisfaction scores (TripAdvisor, Google reviews, internal surveys), revenue per available room (RevPAR) if applicable, and team management metrics. "Achieved a 4.7/5.0 guest satisfaction rating while managing a team of 20 across front desk and concierge operations" combines service quality with operational scope. If you've contributed to upselling revenue, managed events, or improved operational efficiency, quantify every claim.`
    },
    "Trades": {
      insight: `${jobTitle} resumes should lead with certifications, safety record, and specific trade expertise.`,
      detail: `Trades hiring is certification-driven and reputation-based. Your ${jobTitle} resume should place licenses, certifications, and safety training at the top — not buried at the bottom. Include your safety record (injury-free years, OSHA training), the specific systems or equipment you work with, and your job capacity (journeyman, master, foreman). "7 years of commercial ${skill1} experience with OSHA 30 certification and zero safety incidents" instantly qualifies you. Include project types, sizes, and any specialized skills that command premium pay.`
    },
    "Manufacturing": {
      insight: `${jobTitle} resumes that quantify production output and quality metrics get priority attention.`,
      detail: `Manufacturing hiring managers evaluate candidates on throughput, quality, and safety. Your ${jobTitle} resume should include production volume (units per shift/day), quality rates (defect percentage, scrap rate, first-pass yield), and safety record. "${skill1}" is expected — prove it with production data. "Operated at 110% of standard production rate with a 0.3% defect rate across 18 months" demonstrates both speed and quality. If you've participated in lean manufacturing, kaizen events, or 5S implementation, include the specific improvements that resulted.`
    },
    "Construction": {
      insight: `${jobTitle} resumes must show project values, safety metrics, and schedule adherence.`,
      detail: `Construction hiring evaluates three things: can you deliver on budget, on time, and safely? Your ${jobTitle} resume should include total project value managed, schedule performance (on-time or ahead of schedule), and safety record (zero lost-time incidents, TRIR). "Managed $12M in commercial construction projects with 100% on-time delivery and zero OSHA recordable incidents across 150,000 man-hours" covers all three dimensions. Include project types, crew sizes, and any specialized certifications (OSHA 30, PMP, LEED) to demonstrate professional credentials alongside field capability.`
    },
    "Creative": {
      insight: `${jobTitle} resumes without a portfolio link miss the most important evaluation step.`,
      detail: `Creative roles are evaluated visually. No matter how strong your resume text is, it cannot replace seeing your work. Include a portfolio link in your resume header — Behance, Dribbble, personal website, or Vimeo depending on your medium. The portfolio should show 8-12 of your best pieces with brief context: client name, brief, your role, and the outcome. If your creative work drove measurable results (engagement increases, conversion improvements, award recognition), include those metrics in both your portfolio and resume. ${jobTitle} candidates without visible work samples are skipped.`
    },
    "Education": {
      insight: `${jobTitle} resumes should demonstrate student outcome improvements, not just classroom responsibilities.`,
      detail: `Education hiring has shifted toward data-driven evaluation. Your ${jobTitle} resume should include student growth metrics (test score improvements, reading level gains, graduation rate contributions), differentiation strategies, and evidence of professional development. "Responsible for teaching 25 students" describes a job. "Implemented a blended learning model that improved math proficiency from 62% to 84% as measured by district benchmark assessments" demonstrates impact. Include grade levels, subjects, student populations served (ELL, IEP, gifted), and any curriculum development or leadership contributions.`
    },
    "Legal": {
      insight: `${jobTitle} resumes should specify practice areas, case types, and software proficiency.`,
      detail: `Legal hiring is practice-area specific. Your ${jobTitle} resume should immediately clarify which area of law you work in (litigation, corporate, family, immigration, IP, real estate) and the case types or transaction types you've handled. Include your technology proficiency: case management (Clio, PracticePanther), e-discovery (Relativity, Concordance), and document management platforms. Volume metrics matter — case count, document pages processed, or matters supported. "Supported 3 attorneys in commercial litigation, managing 45 active cases and preparing discovery productions totaling 25,000+ documents" demonstrates operational capacity.`
    },
    "Entry-Level": {
      insight: `${jobTitle} applications that show applied initiative — not just coursework — get called back.`,
      detail: `Entry-level hiring managers know you don't have years of professional experience. What they look for is evidence that you've applied your skills to something real: student organizations, volunteer work, personal projects, or part-time jobs where you took initiative. "Led a team of 6 students in developing a mobile app prototype that won first place in the university hackathon" demonstrates teamwork, technical execution, and competitive drive — more valuable than any grade or course listing. Show what you've done, not just what you've studied.`
    },
    "Research": {
      insight: `${jobTitle} resumes should highlight publication record, grant contributions, and methodology expertise.`,
      detail: `Research positions evaluate candidates on scholarly output and methodological rigor. Include publication count (peer-reviewed, conference proceedings), citation metrics if notable, grant proposals contributed to (with funding amounts), and your specific research methodologies. "${skill1}" and "${skill2}" are qualifications — but demonstrating that your research led to funded grants, published findings, or practical applications shows impact beyond academic exercise. If your work has been cited by others, influenced policy, or contributed to product development, those are premium experiences to highlight.`
    },
    "Science": {
      insight: `${jobTitle} candidates who show laboratory technique breadth and publication activity are preferred.`,
      detail: `Scientific hiring managers evaluate candidates on technical capability and scholarly contribution. List specific instruments, techniques, and software you've mastered — not generic descriptions. "GC-MS, HPLC, PCR, and flow cytometry" is specific. "Laboratory equipment" is not. Include your publication record, poster presentations, and any grant contributions. If your work has led to patents, product development, or regulatory submissions, those translational outcomes significantly strengthen your candidacy beyond basic research skills.`
    },
    "Fitness": {
      insight: `${jobTitle} resumes should quantify client results and retention rates.`,
      detail: `Fitness professionals are evaluated on their ability to get results and retain clients. Include your certification (NASM, ACE, CSCS, ISSA), client retention rate, class attendance growth, and specific transformation outcomes. "Maintained a roster of 30 active clients with an 85% 6-month retention rate, helping 12 clients achieve documented fitness milestones" demonstrates both client relationships and program effectiveness. If you've developed specialized programming (post-rehabilitation, athletic performance, prenatal fitness), those specializations differentiate you in a crowded market.`
    },
    "Childcare": {
      insight: `${jobTitle} resumes should demonstrate safety awareness and developmental milestone support.`,
      detail: `Parents and childcare centers prioritize safety, reliability, and developmental support. Your ${jobTitle} resume should lead with certifications (CPR/First Aid, CDA, state-specific credentials), age groups served, and any specialized training (special needs, language immersion, Montessori). "Provided care for 8 children ages 2-5, implementing daily activities aligned with developmental milestones in motor skills, language, and social-emotional growth" shows intentional, development-focused care. Include parent satisfaction indicators and your reliability record (on-time attendance, zero safety incidents).`
    },
    "Animal Care": {
      insight: `${jobTitle} candidates who show species expertise and handling experience get prioritized.`,
      detail: `Animal care hiring depends on species-specific experience and handling competency. Include the animal types you've worked with, the setting (veterinary clinic, shelter, kennel, farm, zoo), and any certifications. "Provided daily care for 40+ dogs in a veterinary boarding facility, administering medications per veterinary orders and identifying 6 health concerns requiring veterinary attention through observation" shows observational skills and clinical capability. If you've assisted with procedures, managed client communications, or handled emergency situations, include those experiences with specific examples.`
    },
    "Beauty": {
      insight: `${jobTitle} candidates who show client retention rates and revenue per service hour stand out.`,
      detail: `Beauty industry hiring is retention-driven. Include your license, specialties, and retention metrics: "Maintained a client book of 150+ with a 90% rebooking rate and $120 average ticket." Specify your techniques, product expertise, and any advanced training (color correction, keratin treatments, microblading, esthetics). If you've grown your client base, increased revenue per service hour, or trained junior stylists, include those achievements. Social media following relevant to your practice can also demonstrate marketing savvy and personal brand.`
    },
    "Entertainment": {
      insight: `${jobTitle} resumes should showcase production credits and collaboration scope.`,
      detail: `Entertainment industry resumes work differently from corporate resumes. Lead with your most recognized credits, the production scale (budget, audience size, venue capacity), and your specific role. "Production Manager for a 12-show Off-Broadway run at a 299-seat theater with a $450K production budget and a crew of 18" conveys your operational scope. Include the genres, platforms, and venues you've worked in. If your work has been recognized (awards, festival selections, critical reviews), place those prominently. In entertainment, your credits are your resume.`
    },
    "Architecture": {
      insight: `${jobTitle} resumes should include licensure status, software proficiency, and built project portfolio.`,
      detail: `Architecture hiring is portfolio-driven, but the resume must establish your professional credentials. Include your licensure status (RA, NCARB, ARE progress), BIM platform proficiency (Revit, ArchiCAD, Rhino), and project portfolio with square footage and construction values. "Designed through construction administration a 45,000 SF mixed-use development valued at $12M, achieving LEED Gold certification" demonstrates full project lifecycle experience. List project types (residential, commercial, healthcare, education), design awards, and any published work.`
    },
    "Insurance": {
      insight: `${jobTitle} resumes should quantify policy counts, premium volume, and loss ratio performance.`,
      detail: `Insurance professionals are evaluated on production, retention, and risk assessment accuracy. Include your lines of authority, active licenses, book of business size, and performance metrics. "Managed a P&C book of $3.5M in premium with a 94% retention rate and a loss ratio 8 points below company average" demonstrates both sales and risk management competence. If you specialize in specific product lines (commercial, E&O, D&O, workers' comp), name them. Continuing education and industry designations (CPCU, ARM, AU) should be listed prominently.`
    },
    "Real Estate": {
      insight: `${jobTitle} candidates who show transaction volume and client satisfaction metrics get prioritized.`,
      detail: `Real estate is a performance-based profession, and your resume should read as a results summary. Include transaction count, total volume, average price point, and client satisfaction metrics (reviews, referral rate). "Closed 38 transactions totaling $15.2M with a 94% client satisfaction rate and 45% repeat/referral business" covers production and relationship quality. If you specialize in specific property types (luxury, commercial, first-time buyer, investment), make that specialization clear. Market knowledge and negotiation outcomes differentiate experienced agents.`
    },
    "Events": {
      insight: `${jobTitle} resumes should include event scale, budget accuracy, and client satisfaction.`,
      detail: `Event professionals are evaluated on execution quality at scale. Include event count, attendee range, budget management, and satisfaction metrics. "Executed 40+ events annually ranging from 50 to 1,500 attendees, managing budgets from $15K to $400K with an average of 4% under-budget delivery and a 98% client satisfaction rate." Name your event types (corporate, wedding, conference, non-profit), vendor management scope, and any technology platforms used (Cvent, Eventbrite, Social Tables). Process improvements and vendor negotiation savings demonstrate operational maturity.`
    },
    "Social Services": {
      insight: `${jobTitle} resumes should demonstrate caseload management and client outcome metrics.`,
      detail: `Social services hiring managers evaluate candidates on caseload capacity and outcome quality. Include the number of clients served, population type, and measurable outcomes. "Managed a caseload of 50 families providing wraparound services, achieving a 78% successful case closure rate and reducing re-referral rates by 25%." Name the assessment tools you use, the inter-agency collaboration you maintain, and any grant-funded programs you've administered. Documentation quality and regulatory compliance (state licensing, HIPAA) should be explicitly mentioned.`
    },
    "Law Enforcement": {
      insight: `${jobTitle} resumes should highlight training certifications, commendations, and community engagement.`,
      detail: `Law enforcement hiring evaluates physical readiness, training credentials, and professional conduct. Include your academy training, specialized certifications (CIT, DUI enforcement, K-9, SWAT, detective), and any commendations or awards. "Responded to an average of 12 calls per shift across a patrol district serving 15,000 residents, maintaining zero excessive force complaints over 5 years." Community policing activities, multilingual skills, and technology proficiency (RMS, CAD, body-worn camera systems) differentiate candidates in a competitive hiring environment.`
    },
    "Transportation": {
      insight: `${jobTitle} resumes should lead with license class, endorsements, and safety metrics.`,
      detail: `Transportation hiring is qualification-driven. Your CDL class, endorsements, and driving record should appear in the first section of your resume. Include miles driven, cargo types, route experience (OTR, regional, local), and safety record: "550,000+ accident-free miles with Hazmat and Tanker endorsements." Equipment types operated, ELD/GPS proficiency, and DOT compliance record are standard evaluation criteria. If you've trained new drivers or achieved fuel efficiency awards, those demonstrate additional value beyond basic driving capability.`
    },
    "Maritime": {
      insight: `${jobTitle} candidates must list merchant mariner credentials and sea service documentation.`,
      detail: `Maritime hiring requires specific credentials. Include your MMC (Merchant Mariner Credential), STCW certifications, endorsements, and sea service time. "STCW-certified with 3,000+ days of sea service across container vessels and bulk carriers. Holds endorsements for Able Seaman and RFPNW." Name vessel types, tonnage, and trade routes you've worked. Safety training (firefighting, survival craft, medical first aid) should be listed prominently. Maritime resumes that don't lead with credentials and certifications get immediately disqualified.`
    },
    "Automotive": {
      insight: `${jobTitle} resumes should list certifications, brand experience, and diagnostic capability.`,
      detail: `Automotive service hiring is certification-driven. Include your ASE certifications (list each one), manufacturer-specific training, and diagnostic equipment proficiency. "ASE-certified in Engine Repair (A1), Electrical Systems (A6), and Engine Performance (A8) with 5 years of Honda/Acura dealership experience." Name the diagnostic platforms, vehicle types, and any specialized systems you work on (hybrid, EV, ADAS, diesel). Flat-rate productivity metrics demonstrate efficiency, while comeback rate shows quality. Both metrics together paint a complete picture.`
    },
    "Aviation": {
      insight: `${jobTitle} candidates must lead with type ratings, certifications, and flight hours.`,
      detail: `Aviation hiring is credential-driven. Your ${jobTitle} resume should immediately state your certifications, type ratings or aircraft qualifications, and total flight/service hours. "ATP-certified with B737 and A320 type ratings, 8,000+ total flight hours including 3,500 PIC." Name airlines, aircraft types, and operational experience. Safety record, CRM training, and regulatory knowledge (FAA, EASA, ICAO) are mandatory inclusions. Aviation resumes without prominent credential placement are immediately disqualified regardless of experience quality.`
    },
    "Media": {
      insight: `${jobTitle} resumes should showcase audience reach and content performance metrics.`,
      detail: `Media professionals are evaluated on reach and engagement. Include audience size, content volume, and performance metrics relevant to your platform. "Produced 3 weekly video segments reaching 150K+ viewers with a 12% average engagement rate. Content generated 2.5M total views and was syndicated to 4 partner platforms." Whether you work in broadcast, digital, print, or podcast media, quantify your audience. If your content has won awards, been syndicated, or driven measurable business outcomes (subscriptions, ad revenue), include those achievements prominently.`
    },
  };

  const tip = categoryTips[cat];
  if (tip) return tip;

  // Ultimate fallback
  return {
    insight: `${jobTitle} hiring managers spend an average of 7 seconds on initial resume screening — lead with impact.`,
    detail: `Across all industries, the resumes that advance share one trait: the first bullet point under the most recent role contains a specific, measurable achievement. For ${jobTitle} positions, this means leading with your strongest result — not your job description. "Responsible for ${skill1}" tells me what you were assigned. "Delivered ${skill1} improvements that resulted in measurable business impact" tells me what you accomplished. Before you submit your resume, check that your top 3 bullets each contain a number, a result, and a context. If any bullet could apply to anyone with your job title, it needs to be rewritten to be specific to your experience.`
  };
}

// ─── Main ──────────────────────────────────────────────────────────────

const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.mdx'));
console.log(`Adding Hiring Manager Tips to ${files.length} files...\n`);

let added = 0;
let skipped = 0;

for (const file of files) {
  const filePath = path.join(CONTENT_DIR, file);
  const raw = fs.readFileSync(filePath, 'utf-8');

  // Skip if already has the section
  if (raw.includes('## Hiring Manager Tip')) {
    skipped++;
    continue;
  }

  const { data, content } = matter(raw);
  const slug = data.slug || file.replace('.mdx', '');
  const jobTitle = data.jobTitle || slug.replace(/-/g, ' ');
  const category = data.category || 'General';
  const keySkills = data.keySkills || [];
  const avgSalary = data.avgSalary || '';

  const tip = generateTip(slug, jobTitle, category, keySkills, avgSalary);

  const tipSection = `\n## Hiring Manager Tip\n\n> **${tip.insight}**\n\n${tip.detail}\n`;

  // Insert before "## Common Mistakes to Avoid" if it exists, otherwise before last paragraph
  let newContent;
  const mistakesIdx = content.indexOf('## Common Mistakes to Avoid');
  if (mistakesIdx !== -1) {
    newContent = content.slice(0, mistakesIdx) + tipSection + '\n' + content.slice(mistakesIdx);
  } else {
    // Insert before the last line (usually the CTA)
    const lines = content.trimEnd().split('\n');
    const lastLine = lines.pop();
    newContent = lines.join('\n') + '\n' + tipSection + '\n' + lastLine + '\n';
  }

  const newFile = matter.stringify(newContent, data);
  fs.writeFileSync(filePath, newFile, 'utf-8');
  added++;
}

console.log(`\n✅ Added Hiring Manager Tips to ${added} files (${skipped} already had them).`);
console.log(`Total processed: ${files.length}`);
