#!/usr/bin/env node
/**
 * Adds a "Common Interview Questions" section with 5 profession-specific
 * questions and answer guidance to each resume example MDX file.
 * Inserts after "Hiring Manager Tip" section or before "Common Mistakes to Avoid".
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

// ─── Interview Questions by Slug ───────────────────────────────────────
// Each entry: array of { q, guidance }

function getQuestions(slug, jobTitle, category, skills) {
  const specific = SLUG_QUESTIONS[slug];
  if (specific) return specific;
  return getCategoryQuestions(jobTitle, category, skills);
}

const SLUG_QUESTIONS = {
  'software-engineer': [
    { q: 'Describe a system you designed that had to handle significant scale. What trade-offs did you make?', guidance: 'Walk through your architecture decisions, explaining why you chose specific technologies. Mention the scale (requests/sec, data volume) and the constraints that drove your trade-offs. Interviewers want to see structured thinking, not just the final answer.' },
    { q: 'Tell me about a time you had to debug a production issue under pressure. What was your process?', guidance: 'Describe a specific incident: the symptoms, your diagnostic steps, the root cause, and the fix. Highlight your use of monitoring tools, logs, and collaboration. Mention what you changed afterward to prevent recurrence.' },
    { q: 'How do you decide when to refactor existing code versus building new features?', guidance: 'Show that you balance technical debt against business priorities. Mention specific criteria: code complexity metrics, bug frequency, team velocity impact. Avoid extremes — neither "always refactor" nor "never refactor" is the right answer.' },
    { q: 'Walk me through your code review process. What do you look for?', guidance: 'Discuss correctness, readability, test coverage, performance implications, and security. Mention how you give constructive feedback and how you handle disagreements. This question assesses both technical depth and collaboration skills.' },
    { q: 'How do you approach learning a new technology or framework you haven\'t used before?', guidance: 'Describe a concrete example: reading documentation, building a proof of concept, pair programming with an expert. Interviewers want to see self-directed learning ability and intellectual curiosity, not just saying "I learn fast."' },
  ],
  'software-developer': [
    { q: 'Tell me about a feature you built from scratch. How did you approach the requirements and implementation?', guidance: 'Walk through the full lifecycle: understanding the user need, breaking it into tasks, implementation decisions, testing strategy, and deployment. Mention any scope changes and how you handled them.' },
    { q: 'How do you handle a situation where you disagree with a technical decision made by your team lead?', guidance: 'Demonstrate professionalism and evidence-based reasoning. Describe presenting your alternative with data or prototypes while being open to being wrong. This tests collaboration and communication.' },
    { q: 'What steps do you take to ensure the code you write is maintainable?', guidance: 'Mention clear naming conventions, appropriate abstractions, documentation where needed, comprehensive tests, and consistent coding standards. Give a specific example of making a complex piece of code more maintainable.' },
    { q: 'Describe your experience with version control workflows. How do you manage branches and deployments?', guidance: 'Discuss your branching strategy (feature branches, trunk-based development), code review process, CI/CD pipeline interaction, and how you handle merge conflicts. Concrete examples strengthen your answer.' },
    { q: 'How do you prioritize bug fixes versus new feature development?', guidance: 'Show that you consider severity, user impact, and business priority. Mention triage processes, how you communicate trade-offs to stakeholders, and how you prevent recurring bugs through root cause analysis.' },
  ],
  'full-stack-developer': [
    { q: 'How do you decide which logic belongs on the frontend versus the backend?', guidance: 'Discuss security (never trust the client), performance (reduce round trips), and user experience (responsive interactions). Give a specific example where you moved logic between layers and explain why.' },
    { q: 'Walk me through how you would optimize a slow-loading page.', guidance: 'Cover the full stack: database query optimization, API response caching, frontend bundle size reduction, lazy loading, image optimization, and CDN usage. Mention profiling tools you use to identify bottlenecks.' },
    { q: 'How do you manage state across the frontend and backend in a full-stack application?', guidance: 'Discuss session management, API design (REST vs GraphQL), client-side state management (React state, Redux, Zustand), and caching strategies. Highlight how you keep data consistent.' },
    { q: 'Describe a situation where you had to work with an unfamiliar part of the stack.', guidance: 'Show adaptability. Describe the context, how you ramped up (documentation, mentoring, experimentation), and the outcome. Full-stack roles require comfort with ambiguity across technologies.' },
    { q: 'How do you approach writing tests for a full-stack feature?', guidance: 'Cover unit tests for business logic, integration tests for API endpoints, and end-to-end tests for critical user flows. Mention your testing philosophy: what you always test vs. what you skip and why.' },
  ],
  'front-end-developer': [
    { q: 'How do you approach building accessible web interfaces?', guidance: 'Discuss semantic HTML, ARIA attributes, keyboard navigation, screen reader testing, and color contrast ratios. Mention specific tools (Lighthouse, axe DevTools) and standards (WCAG 2.1 AA). Give a concrete example of fixing an accessibility issue.' },
    { q: 'What\'s your approach to CSS architecture in a large application?', guidance: 'Discuss methodologies (BEM, CSS modules, Tailwind, styled-components), naming conventions, and how you avoid specificity conflicts. Mention how you handle responsive design and theme management.' },
    { q: 'Explain how you optimize frontend performance and what metrics you track.', guidance: 'Cover Core Web Vitals (LCP, FID, CLS), bundle analysis, code splitting, lazy loading, and image optimization. Mention your monitoring approach and specific improvements you have achieved.' },
    { q: 'How do you handle cross-browser compatibility issues?', guidance: 'Discuss your testing strategy (BrowserStack, manual testing), progressive enhancement vs. graceful degradation, and how you use feature detection. Provide a specific example of a compatibility fix.' },
    { q: 'Describe how you manage component state in a complex React (or other framework) application.', guidance: 'Compare local state, context, and external state management solutions. Explain your decision criteria for choosing one approach over another, using a real project example.' },
  ],
  'data-scientist': [
    { q: 'Walk me through a machine learning model you built from data exploration to deployment.', guidance: 'Cover the full pipeline: problem definition, data cleaning, feature engineering, model selection, validation strategy (cross-validation, holdout set), and deployment. Mention how you communicated results to non-technical stakeholders.' },
    { q: 'How do you handle class imbalance in a classification problem?', guidance: 'Discuss techniques: oversampling (SMOTE), undersampling, class weights, anomaly detection framing, and appropriate evaluation metrics (precision-recall, F1, AUC-PR instead of accuracy). Use a specific project example.' },
    { q: 'How do you decide which features to include in your model?', guidance: 'Mention domain knowledge, correlation analysis, feature importance from tree models, forward/backward selection, and regularization. Emphasize that feature engineering often matters more than model complexity.' },
    { q: 'Describe a time when your model performed well in testing but poorly in production.', guidance: 'Discuss data drift, training-serving skew, or feature leakage. Explain your diagnostic process and the fix. This tests real-world ML experience beyond academic knowledge.' },
    { q: 'How do you explain a complex model\'s predictions to a non-technical business stakeholder?', guidance: 'Discuss SHAP values, feature importance plots, partial dependence plots, and plain-language summaries. Give a concrete example of translating model output into a business recommendation.' },
  ],
  'data-engineer': [
    { q: 'How do you design a data pipeline that needs to be both reliable and performant?', guidance: 'Discuss idempotency, retry mechanisms, dead-letter queues, monitoring and alerting, and performance optimization. Mention specific tools (Airflow, dbt, Spark) and your approach to SLA management.' },
    { q: 'What\'s your approach to handling schema evolution in a data warehouse?', guidance: 'Discuss backward-compatible changes, schema versioning, migration strategies, and how you coordinate with downstream consumers. Mention specific data catalog or governance tools you have used.' },
    { q: 'Describe how you would debug a data quality issue that appears in a downstream report.', guidance: 'Walk through your diagnostic approach: tracing the data lineage, checking source systems, validating transformation logic, and implementing data quality checks to prevent recurrence.' },
    { q: 'How do you decide between batch and stream processing for a given use case?', guidance: 'Discuss latency requirements, data volume, complexity of transformations, and cost trade-offs. Give examples of when you chose each approach and the reasoning behind your decision.' },
    { q: 'What strategies do you use to optimize query performance in a data warehouse?', guidance: 'Cover partitioning, clustering, materialized views, query optimization, and indexing strategies. Mention specific warehouse platforms (Snowflake, BigQuery, Redshift) and their unique optimization approaches.' },
  ],
  'data-analyst': [
    { q: 'Tell me about an analysis that changed a business decision. What was the outcome?', guidance: 'Describe the business question, your analytical approach, the key finding, and how it influenced the decision. Quantify the impact if possible. This tests whether your analysis drives action, not just reporting.' },
    { q: 'How do you handle messy or incomplete data in your analysis?', guidance: 'Discuss data validation techniques, handling missing values, identifying outliers, and documenting data quality assumptions. Mention tools and approaches for each scenario.' },
    { q: 'Walk me through how you would set up an A/B test for a product feature.', guidance: 'Cover hypothesis formulation, sample size calculation, randomization, duration, success metrics, and statistical significance testing. Mention common pitfalls like peeking at results too early.' },
    { q: 'How do you communicate data findings to stakeholders who are not data-literate?', guidance: 'Discuss visualization best practices, storytelling with data, using analogies, and focusing on actionable recommendations rather than methodology. Mention specific tools (Tableau, Looker, PowerPoint).' },
    { q: 'What SQL techniques do you use most frequently, and what are their limitations?', guidance: 'Discuss window functions, CTEs, subqueries, joins, and aggregations. Mention when SQL isn\'t the right tool and you reach for Python or R instead. Give a specific complex query example.' },
  ],
  'devops-engineer': [
    { q: 'How do you design a CI/CD pipeline for a microservices architecture?', guidance: 'Discuss per-service pipelines, shared libraries, artifact management, deployment strategies (blue-green, canary), and rollback procedures. Mention specific tools and how you handle inter-service dependencies.' },
    { q: 'Describe how you would handle a production outage. Walk me through your incident response process.', guidance: 'Cover detection (monitoring, alerts), communication (incident channel, status page), diagnosis (runbooks, logs), resolution, and post-mortem. Mention specific tools and your experience with on-call rotations.' },
    { q: 'What\'s your approach to infrastructure as code? How do you manage state and drift?', guidance: 'Discuss Terraform state management, module organization, drift detection, and plan/apply workflows. Mention how you handle secrets management, environment separation, and code review for infrastructure changes.' },
    { q: 'How do you balance security requirements with developer velocity?', guidance: 'Discuss shift-left security (SAST, DAST in CI), automated policy enforcement (OPA, Sentinel), pre-approved architecture patterns, and self-service platforms. Show that security doesn\'t have to slow teams down.' },
    { q: 'How do you approach monitoring and observability for distributed systems?', guidance: 'Cover the three pillars: metrics (Prometheus, Datadog), logs (ELK, Loki), and traces (Jaeger, Zipkin). Discuss alert fatigue management, SLIs/SLOs, and how you use observability data to drive improvements.' },
  ],
  'product-manager': [
    { q: 'How do you prioritize features when you have more ideas than engineering capacity?', guidance: 'Discuss your prioritization framework (RICE, ICE, weighted scoring) and how you balance quantitative scoring with qualitative factors. Mention how you communicate prioritization decisions to stakeholders who disagree.' },
    { q: 'Tell me about a product you launched that didn\'t meet expectations. What did you learn?', guidance: 'Be honest about what went wrong. Discuss whether the problem was market fit, execution, or timing. Show what you learned and how it changed your approach. Vulnerability here demonstrates maturity.' },
    { q: 'How do you validate a product idea before committing engineering resources?', guidance: 'Discuss customer interviews, prototype testing, surveys, competitive analysis, and MVP strategies. Show that you don\'t jump to building — you validate assumptions first.' },
    { q: 'Describe how you work with engineering teams to define scope and manage trade-offs.', guidance: 'Discuss your approach to writing PRDs or specs, running sprint planning, handling scope creep, and making cut decisions. Show respect for engineering constraints while advocating for user needs.' },
    { q: 'How do you measure the success of a feature after it launches?', guidance: 'Cover defining success metrics before launch, instrumentation planning, post-launch monitoring, and iteration based on data. Mention specific analytics tools and how you handle ambiguous results.' },
  ],
  'project-manager': [
    { q: 'How do you handle scope creep on a project with a fixed deadline?', guidance: 'Discuss change control processes, impact assessment, stakeholder communication, and the art of saying no diplomatically. Give a specific example of negotiating scope while maintaining client or stakeholder trust.' },
    { q: 'Describe a project that went off track. How did you recover it?', guidance: 'Walk through the early warning signs, your diagnostic process, the corrective actions, and the outcome. Show that you can identify problems early and take decisive action to course-correct.' },
    { q: 'What tools and methodologies do you use for project tracking and reporting?', guidance: 'Name specific tools (Jira, Asana, MS Project, Monday.com) and methodologies (Agile, Waterfall, hybrid). Explain why you choose different approaches for different project types.' },
    { q: 'How do you manage stakeholders with conflicting priorities?', guidance: 'Discuss stakeholder mapping, communication plans, escalation procedures, and negotiation techniques. Give a concrete example of aligning competing interests to reach a decision.' },
    { q: 'How do you assess and mitigate project risks?', guidance: 'Cover risk identification (workshops, historical analysis), risk registers, probability/impact matrices, and mitigation planning. Mention how you communicate risks to leadership without causing alarm.' },
  ],
  'nurse': [
    { q: 'How do you prioritize patient care when you have multiple patients with urgent needs?', guidance: 'Discuss clinical triage principles, delegation to support staff, communication with charge nurses, and time management. Use a specific scenario that demonstrates clinical judgment under pressure.' },
    { q: 'Describe a time you caught a medication error or prevented an adverse event.', guidance: 'Walk through the situation, what alerted you, the action you took, and the outcome. Highlight the safety systems you follow (five rights, barcode scanning) and your attention to detail.' },
    { q: 'How do you handle a difficult patient or family member?', guidance: 'Discuss de-escalation techniques, empathy, active listening, and when to involve supervisors or patient advocates. Emphasize that difficult behavior often stems from fear or pain.' },
    { q: 'What steps do you take to stay current with clinical best practices?', guidance: 'Mention continuing education, professional organizations, evidence-based practice resources, and peer learning. Give a specific example of implementing a new practice or protocol.' },
    { q: 'How do you handle the emotional stress of nursing, especially in high-acuity settings?', guidance: 'Discuss self-care strategies, debriefing practices, peer support, and professional boundaries. Honesty about the emotional demands while showing resilience is valued over pretending it doesn\'t affect you.' },
  ],
  'doctor': [
    { q: 'How do you approach a clinical decision when the evidence is inconclusive?', guidance: 'Discuss shared decision-making with patients, consulting colleagues, weighing risks and benefits, and your comfort with clinical uncertainty. This tests medical judgment and communication skills.' },
    { q: 'Describe a time you had to deliver bad news to a patient. How did you approach it?', guidance: 'Discuss the SPIKES framework or similar structured approach: setting, perception, invitation, knowledge, empathy, strategy. Show genuine compassion alongside clinical professionalism.' },
    { q: 'How do you manage your patient panel to ensure preventive care doesn\'t fall through the cracks?', guidance: 'Discuss EHR-based care gap tools, population health management, pre-visit planning, and team-based care models. Mention specific quality metrics you track.' },
    { q: 'How do you handle a disagreement with a colleague about a patient\'s treatment plan?', guidance: 'Discuss evidence-based discussion, maintaining professional respect, escalation to department leadership when needed, and always keeping patient safety as the priority.' },
    { q: 'What is your approach to maintaining work-life balance in medicine?', guidance: 'Be honest about challenges while showing sustainable strategies. Discuss scheduling boundaries, delegation, EHR efficiency, and support systems. Burnout awareness is increasingly valued in physician hiring.' },
  ],
  'accountant': [
    { q: 'How do you stay current with changes in tax law or accounting standards?', guidance: 'Mention CPE credits, professional organizations (AICPA, state CPA societies), industry publications, and peer discussions. Give a specific example of applying a recent standard change.' },
    { q: 'Describe your month-end close process and how you\'ve improved it.', guidance: 'Walk through your close checklist, timeline, reconciliation procedures, and review steps. Highlight a specific improvement you made — automation, earlier deadlines, error reduction.' },
    { q: 'How do you handle a situation where you discover a material error in previously filed financial statements?', guidance: 'Discuss the assessment process (materiality threshold), communication with leadership, restatement procedures, and regulatory notification requirements. Show ethical judgment and procedural knowledge.' },
    { q: 'What ERP or accounting software systems have you used, and how do you evaluate new tools?', guidance: 'Name specific platforms with your proficiency level. Discuss evaluation criteria: integration capabilities, reporting flexibility, audit trail quality, and user adoption considerations.' },
    { q: 'How do you explain complex financial information to non-financial stakeholders?', guidance: 'Discuss using visual summaries, analogies, focusing on business impact rather than GAAP terminology, and tailoring detail level to the audience. Give a specific example.' },
  ],
  'financial-analyst': [
    { q: 'Walk me through how you would build a financial model for a new business initiative.', guidance: 'Cover assumptions gathering, revenue modeling, cost structure, sensitivity analysis, and scenario planning. Mention your approach to validating assumptions and presenting results to decision-makers.' },
    { q: 'How do you handle a situation where your analysis contradicts what leadership expects or wants to hear?', guidance: 'Discuss presenting data objectively, preparing for pushback with supporting evidence, and suggesting alternative perspectives. Show integrity and the ability to deliver uncomfortable truths diplomatically.' },
    { q: 'Describe your approach to variance analysis. How do you determine which variances are meaningful?', guidance: 'Discuss materiality thresholds, trend analysis, one-time vs. recurring variances, and how you investigate root causes. Mention how you communicate findings and recommended actions.' },
    { q: 'How do you ensure accuracy in your financial reports and models?', guidance: 'Cover model audit techniques, cross-referencing sources, building error checks into formulas, peer review processes, and version control. Give an example of catching an error before it reached stakeholders.' },
    { q: 'What financial metrics do you consider most important, and why does context matter?', guidance: 'Discuss how metrics like EBITDA, revenue growth, CAC, LTV, and free cash flow are interpreted differently by industry and company stage. Show that you understand metrics as storytelling tools, not just numbers.' },
  ],
  'sales-manager': [
    { q: 'How do you build a sales forecast and how accurate have your forecasts been?', guidance: 'Discuss your methodology (pipeline-weighted, historical trending, bottoms-up), CRM hygiene requirements, and how you handle sandbagging vs. optimism. Include your forecast accuracy track record.' },
    { q: 'Describe your approach to coaching an underperforming sales rep.', guidance: 'Cover diagnosis (skill gap vs. will gap vs. market issue), structured coaching plans, ride-alongs, call reviews, and performance timelines. Show that you invest in people before managing them out.' },
    { q: 'How do you design and manage sales territories to maximize team performance?', guidance: 'Discuss data-driven territory planning (market size, existing revenue, growth potential), balancing workload, and how you handle territory changes without demotivating reps.' },
    { q: 'What sales methodologies have you implemented, and how did you drive adoption?', guidance: 'Name specific methodologies (MEDDIC, Challenger, SPIN, Sandler). Discuss training rollout, reinforcement mechanisms (deal reviews, scorecards), and the measurable impact on win rates or deal size.' },
    { q: 'How do you balance short-term quota pressure with long-term team development?', guidance: 'Show that you can deliver results while building sustainable team capability. Discuss pipeline building, rep development, and how you prevent burnout during high-pressure quarters.' },
  ],
  'recruiter': [
    { q: 'How do you source candidates for hard-to-fill roles?', guidance: 'Discuss Boolean search strategies, LinkedIn Recruiter techniques, referral programs, community engagement, and niche job boards. Give a specific example of filling a difficult role and the sourcing method that worked.' },
    { q: 'How do you assess culture fit without introducing bias?', guidance: 'Discuss structured interviews, behaviorally anchored rating scales, and distinguishing "culture add" from "culture fit." Show awareness of unconscious bias and your mitigation strategies.' },
    { q: 'Describe how you manage a hiring manager who has unrealistic expectations about the talent market.', guidance: 'Cover market data presentation, candidate calibration sessions, and constructive pushback. Show that you can be a strategic advisor, not just an order taker.' },
    { q: 'How do you improve time-to-fill without sacrificing candidate quality?', guidance: 'Discuss process optimization: intake meeting quality, interview scheduling efficiency, structured evaluation, and reducing unnecessary interview rounds. Mention specific metrics improvements.' },
    { q: 'What metrics do you track to evaluate your recruiting effectiveness?', guidance: 'Cover time-to-fill, quality of hire (90-day retention, hiring manager satisfaction), source effectiveness, offer acceptance rate, and pipeline conversion ratios. Show that you\'re data-driven.' },
  ],
  'marketing-manager': [
    { q: 'How do you allocate a marketing budget across channels?', guidance: 'Discuss historical performance data, attribution modeling, test budgets for new channels, and how you balance brand investment against performance marketing. Include a specific allocation decision you made.' },
    { q: 'Describe a campaign that significantly exceeded expectations. What made it work?', guidance: 'Cover the strategy, creative approach, channel selection, and results. Analyze why it worked — timing, messaging, audience targeting — rather than just describing what happened.' },
    { q: 'How do you measure marketing ROI for brand awareness campaigns where attribution is difficult?', guidance: 'Discuss brand lift studies, share of voice, direct traffic changes, branded search volume, and survey-based measurement. Show that you understand not everything can be attributed to last-click.' },
    { q: 'How do you manage a marketing team with diverse specialties (content, paid, social, etc.)?', guidance: 'Discuss goal alignment, cross-functional collaboration, skill development, and how you ensure specialists understand the broader strategy. Give examples of resolving channel conflicts.' },
    { q: 'How do you stay ahead of changes in marketing platforms and consumer behavior?', guidance: 'Mention industry publications, conferences, peer networks, platform beta programs, and a test-and-learn approach. Give a specific example of adapting quickly to a platform change.' },
  ],
  'graphic-designer': [
    { q: 'Walk me through your design process from brief to final deliverable.', guidance: 'Cover brief interpretation, research/mood boards, sketching, digital concepts, feedback rounds, and final production. Mention how you handle vague briefs and conflicting feedback.' },
    { q: 'How do you handle feedback that you disagree with from a client or stakeholder?', guidance: 'Discuss presenting your design rationale with evidence (user data, brand guidelines, design principles), being open to valid input, and knowing when to push back vs. accommodate. Show professionalism.' },
    { q: 'How do you maintain brand consistency across multiple designers, channels, and formats?', guidance: 'Discuss brand guidelines creation, design systems, component libraries, template systems, and review processes. Mention tools you use for collaboration (Figma, Abstract, Zeplin).' },
    { q: 'Describe a project where you had to balance creativity with business constraints.', guidance: 'Show that you understand design serves business goals. Discuss working within brand guidelines, budget limitations, or technical constraints while still delivering creative work.' },
    { q: 'How do you stay current with design trends while developing a distinctive personal style?', guidance: 'Discuss design communities (Dribbble, Behance), industry leaders you follow, experimentation in personal projects, and how you filter trends through the lens of the specific project needs.' },
  ],
  'customer-service': [
    { q: 'Describe how you handle an angry customer who wants to speak to a manager.', guidance: 'Discuss active listening, empathy, de-escalation techniques, and when you do involve a supervisor. Show that you try to resolve the issue yourself first while respecting the customer\'s request.' },
    { q: 'How do you balance quality of service with efficiency when handling high volumes?', guidance: 'Discuss prioritization, using templates or macros without sounding robotic, and knowing when to invest extra time for complex issues. Mention your approach to maintaining service quality under pressure.' },
    { q: 'Give me an example of going above and beyond for a customer.', guidance: 'Share a specific story with a clear positive outcome. Show that you take ownership of customer problems and find creative solutions. The best answers demonstrate initiative without requiring manager approval.' },
    { q: 'How do you handle a situation where company policy prevents you from giving the customer what they want?', guidance: 'Discuss acknowledging the customer\'s frustration, explaining the policy rationale, and offering alternatives. Show that you can uphold policies while maintaining customer relationships.' },
    { q: 'What do you do when you don\'t know the answer to a customer\'s question?', guidance: 'Discuss honest communication, research skills, using knowledge bases, escalating to subject matter experts, and following up. Show that you prioritize accuracy over speed when needed.' },
  ],
  'executive-assistant': [
    { q: 'How do you prioritize competing requests from multiple executives?', guidance: 'Discuss your triage process: urgency, impact, deadlines, and direct communication when priorities conflict. Show that you\'re proactive about clarifying priorities rather than guessing.' },
    { q: 'Describe how you handle confidential information.', guidance: 'Discuss specific security practices: document handling, email discretion, physical security, and your approach to situations where people try to extract information inappropriately.' },
    { q: 'How do you manage a complex travel itinerary with last-minute changes?', guidance: 'Cover your preparation (backup options, flexible bookings), communication protocols during changes, and tools you use. Give a specific example of handling a major disruption smoothly.' },
    { q: 'How do you anticipate your executive\'s needs before they ask?', guidance: 'Discuss learning their patterns, preparing meeting briefs proactively, managing recurring tasks automatically, and building relationships with their key contacts. Proactive anticipation is the core EA skill.' },
    { q: 'How do you diplomatically say no on behalf of your executive?', guidance: 'Discuss protecting their time while maintaining relationships, offering alternatives, and communicating with empathy. Show that you can be a gatekeeper without being a blocker.' },
  ],
  'chef': [
    { q: 'How do you develop a new menu while managing food cost targets?', guidance: 'Discuss sourcing seasonal ingredients, cross-utilizing proteins and produce, costing each dish, and balancing high-margin items with crowd-pleasers. Mention your food cost percentage targets and how you achieve them.' },
    { q: 'Describe how you handle a kitchen service that\'s falling behind.', guidance: 'Cover communication (calling the pace), delegation, simplifying preparations, and rallying the team. Show leadership under pressure while maintaining food quality and customer experience.' },
    { q: 'How do you train and develop line cooks with varying experience levels?', guidance: 'Discuss mise en place standards, station training progression, mentoring vs. directing, and how you create a learning environment during high-volume service. Give an example of developing a cook successfully.' },
    { q: 'How do you maintain food safety and sanitation standards during peak service?', guidance: 'Cover HACCP principles, temperature monitoring, cross-contamination prevention, and how you hold staff accountable without disrupting service flow. Mention your health inspection track record.' },
    { q: 'How do you handle food waste in your kitchen?', guidance: 'Discuss inventory management, prep scheduling based on projected covers, creative repurposing of trim, and tracking waste to identify patterns. Quantify your waste reduction results.' },
  ],
  'teacher': [
    { q: 'How do you differentiate instruction for students at different levels in the same classroom?', guidance: 'Discuss tiered assignments, flexible grouping, scaffolding strategies, choice boards, and how you use assessment data to inform grouping decisions. Give a specific example from your classroom.' },
    { q: 'Describe a lesson that didn\'t go as planned and how you adapted.', guidance: 'Show flexibility and reflection. Discuss real-time adjustments, student feedback signals you noticed, and what you changed for next time. Administrators value teachers who learn from experience.' },
    { q: 'How do you handle a disruptive student while maintaining a positive classroom environment?', guidance: 'Discuss your classroom management philosophy (restorative practices, PBIS, etc.), specific strategies (proximity, redirection, private conversation), and how you balance individual needs with the class.' },
    { q: 'How do you communicate with parents about their child\'s progress, especially when there are concerns?', guidance: 'Discuss proactive positive communication, data-driven conversations, using specific examples, solution-focused approaches, and cultural sensitivity. Show that you partner with families.' },
    { q: 'What role does technology play in your teaching, and how do you evaluate new educational tools?', guidance: 'Discuss specific tools you use and their learning impact. Show that you evaluate technology based on pedagogical value, not novelty. Mention how you ensure equitable access.' },
  ],
  'bartender': [
    { q: 'How do you handle a customer who is approaching intoxication?', guidance: 'Discuss responsible serving practices: observation techniques, slowing service, offering food and water, and when/how to cut someone off diplomatically. Mention your awareness of local liquor laws and liability.' },
    { q: 'Describe your approach to upselling without being pushy.', guidance: 'Cover reading customer cues, suggesting premium alternatives naturally, recommending pairings, and building rapport. Mention your upsell rate and how it compared to bar averages.' },
    { q: 'How do you manage a busy bar when orders are backing up?', guidance: 'Discuss prioritization (queue management), efficient station setup, communication with barbacks and servers, and maintaining quality under speed pressure. Speed and accuracy together are what matters.' },
    { q: 'How do you handle customer complaints about drinks?', guidance: 'Cover active listening, immediate remake without argument, finding the actual preference, and turning a complaint into a positive experience. The goal is retention, not being right.' },
    { q: 'What\'s your approach to creating a craft cocktail menu?', guidance: 'Discuss balancing classic and creative recipes, seasonal ingredients, cost considerations, and gauging customer preferences. Mention any signature cocktails you\'ve developed and their reception.' },
  ],
  'construction-worker': [
    { q: 'How do you approach safety on a job site, especially when under schedule pressure?', guidance: 'Discuss your commitment to safety protocols regardless of deadline pressure, specific safety practices you follow, and willingness to speak up about unsafe conditions. Give an example of stopping work for safety reasons.' },
    { q: 'Describe your experience with reading blueprints and specifications.', guidance: 'Cover the types of drawings you work with (architectural, structural, mechanical), how you interpret dimensions, notes, and symbols, and how you flag discrepancies between plans and field conditions.' },
    { q: 'How do you handle a situation where you notice a quality issue with work already completed?', guidance: 'Discuss speaking up immediately, documenting the issue, communicating with the foreman, and understanding that rework is cheaper than a callback. Show integrity over convenience.' },
    { q: 'What tools and equipment are you most experienced with?', guidance: 'Be specific: name hand tools, power tools, heavy equipment, and measurement tools. Mention any certifications (forklift, aerial lift, laser level) and your maintenance habits.' },
    { q: 'How do you work effectively as part of a crew with different trades?', guidance: 'Discuss communication, respecting other trades\' work, coordinating schedules, and maintaining clean workspaces. Show that you understand construction is a team effort where sequencing matters.' },
  ],
  'warehouse-worker': [
    { q: 'How do you maintain accuracy when processing high volumes of orders?', guidance: 'Discuss systematic approaches: scanning verification, pick-path discipline, double-checking before packing, and staying focused during repetitive tasks. Mention your accuracy rate.' },
    { q: 'Describe your experience with warehouse management systems.', guidance: 'Name specific WMS platforms (Manhattan, SAP EWM, NetSuite WMS) and RF scanner systems. Discuss how you use the system for receiving, putaway, picking, and cycle counting.' },
    { q: 'How do you approach safety in a warehouse environment?', guidance: 'Cover powered equipment safety, ergonomic lifting, aisle awareness, PPE compliance, and housekeeping. Mention your safety record and any safety committee involvement.' },
    { q: 'How do you handle a situation where you receive a shipment that doesn\'t match the purchase order?', guidance: 'Discuss documentation procedures, quarantine protocols, communication with receiving supervisors, and how you handle discrepancies while maintaining workflow.' },
    { q: 'What is your approach to maintaining organization in your work area?', guidance: 'Discuss 5S methodology, FIFO/FEFO compliance, labeling standards, and how organization directly impacts pick accuracy and speed.' },
  ],
  'truck-driver': [
    { q: 'How do you manage your hours of service to stay compliant and safe?', guidance: 'Discuss ELD usage, pre-trip planning, understanding 11/14-hour rules, 70-hour limits, and how you plan rest stops. Show that compliance is non-negotiable, not an inconvenience.' },
    { q: 'Describe your pre-trip inspection routine.', guidance: 'Walk through your DVIR checklist: tires, brakes, lights, fluids, coupling devices, and cargo securement. Show thoroughness and understanding that pre-trip inspections prevent roadside breakdowns and violations.' },
    { q: 'How do you handle unexpected road conditions or mechanical issues?', guidance: 'Discuss decision-making for pulling over safely, communication with dispatch, roadside repair capabilities, and how you prioritize safety over schedule.' },
    { q: 'What steps do you take to maintain fuel efficiency?', guidance: 'Cover progressive shifting, cruise control usage, reduced idle time, route planning, tire pressure maintenance, and driving speed management. Mention any fuel bonus programs you have qualified for.' },
    { q: 'How do you deal with shipping/receiving delays at customer locations?', guidance: 'Discuss patience, professional communication, documentation of detention time, and how you use wait time productively. Show understanding of the business relationship between driver and customer.' },
  ],
  'real-estate-agent': [
    { q: 'How do you generate leads in a competitive market?', guidance: 'Discuss your lead generation mix: sphere of influence, digital marketing, open houses, referral partnerships, and community involvement. Include conversion rates and which sources produce the best clients.' },
    { q: 'Describe a difficult negotiation and how you reached a successful outcome.', guidance: 'Walk through the specific scenario, competing interests, your negotiation strategy, and the resolution. Show that you advocate for your client while maintaining professional relationships.' },
    { q: 'How do you handle a transaction where inspection issues threaten to derail the deal?', guidance: 'Discuss objective assessment, repair vs. credit negotiations, managing emotional reactions, and when to advise walking away. Show you protect your client\'s interests while saving viable deals.' },
    { q: 'What is your approach to pricing a listing in a shifting market?', guidance: 'Cover your CMA methodology, absorption rate analysis, condition adjustments, and how you present pricing recommendations to sellers who have unrealistic expectations.' },
    { q: 'How do you market a property that\'s been sitting without offers?', guidance: 'Discuss price adjustment conversations, staging improvements, photography/video upgrades, expanded digital marketing, broker open houses, and reassessing the target buyer profile.' },
  ],
  'security-guard': [
    { q: 'How do you handle a situation where you need to deny entry to someone who becomes aggressive?', guidance: 'Discuss de-escalation techniques, maintaining physical safety, verbal commands, and when to call for backup or law enforcement. Show calm confidence and awareness of use-of-force policies.' },
    { q: 'Describe your approach to conducting a thorough security patrol.', guidance: 'Cover route variation, attention to access points, checking locks and alarms, documenting observations, and staying alert during long shifts. Mention specific patrol frequencies and coverage areas.' },
    { q: 'How do you write a detailed incident report?', guidance: 'Discuss factual documentation: who, what, when, where, and how. Mention avoiding subjective language, including witness statements, and the legal importance of accurate reporting.' },
    { q: 'What would you do if you discovered a colleague violating security protocols?', guidance: 'Discuss reporting through proper channels, documenting the violation, and maintaining professional relationships while upholding standards. Show integrity without being self-righteous.' },
    { q: 'How do you stay alert and focused during a long, uneventful shift?', guidance: 'Cover active observation techniques, varying patrol routes, mental alertness strategies, and understanding that complacency is the biggest security risk during quiet periods.' },
  ],
  'property-manager': [
    { q: 'How do you handle a tenant who consistently pays rent late?', guidance: 'Discuss your escalation process: communication, written notices, late fee enforcement, payment plans, and when to begin eviction proceedings. Show that you balance empathy with fiduciary duty to the property owner.' },
    { q: 'Describe how you manage a large maintenance request backlog.', guidance: 'Cover prioritization (safety/habitability first), vendor coordination, tenant communication, and preventive maintenance programs that reduce request volume. Mention specific property management software.' },
    { q: 'How do you minimize vacancy rates in a competitive rental market?', guidance: 'Discuss market-rate pricing, property presentation, targeted marketing, tenant retention programs, and quick turnover processes. Include specific vacancy rates you have achieved.' },
    { q: 'What is your approach to vendor management and cost control?', guidance: 'Cover vendor evaluation, competitive bidding, contract negotiation, quality oversight, and relationship management. Give an example of significant cost savings from vendor management improvements.' },
    { q: 'How do you handle a fair housing complaint or potential discrimination claim?', guidance: 'Discuss fair housing law knowledge, documentation practices, consistent policy application, and immediate response to complaints. Show that compliance is proactive, not reactive.' },
  ],
};

function getCategoryQuestions(jobTitle, category, skills) {
  const skill1 = skills?.[0] || 'core technical skills';
  const skill2 = skills?.[1] || 'industry knowledge';
  const skill3 = skills?.[2] || 'communication';

  const categoryQs = {
    'Technology': [
      { q: `What is the most challenging technical problem you've solved in your ${jobTitle} career?`, guidance: 'Structure your answer as situation, approach, solution, and result. Focus on the complexity of the problem and the reasoning behind your solution, not just the tools you used.' },
      { q: `How do you stay current with ${skill1} and related technologies?`, guidance: 'Mention specific resources: documentation, community forums, conferences, side projects. Interviewers want to see a systematic learning approach, not just "I read blogs."' },
      { q: `Describe a time you had to explain a complex technical concept to a non-technical stakeholder.`, guidance: 'Show your ability to translate technical complexity into business-relevant language. Include the context, your communication approach, and how the stakeholder used the information to make a decision.' },
      { q: `How do you approach debugging when the problem isn't immediately obvious?`, guidance: `Describe your systematic approach: reproducing the issue, isolating variables, using logging and monitoring, and testing hypotheses. Mention specific tools relevant to ${jobTitle} roles.` },
      { q: `Tell me about a time you made a technical decision that you later had to reverse. What did you learn?`, guidance: 'Show humility and learning ability. Describe the original reasoning, what changed, and how you handled the reversal. Interviewers value self-awareness and adaptability over never making mistakes.' },
    ],
    'Engineering': [
      { q: `Describe a project where you had to balance technical requirements with budget constraints.`, guidance: 'Walk through the trade-off analysis: safety requirements (non-negotiable), performance specs, material selection, and where you found savings without compromising quality.' },
      { q: `How do you approach quality assurance and testing in your ${jobTitle} work?`, guidance: `Discuss inspection methods, testing protocols, and standards compliance specific to your engineering discipline. Mention any quality management systems you've worked with.` },
      { q: `Tell me about a time you identified a design flaw before it became a costly problem.`, guidance: 'Describe the flaw, how you discovered it (design review, simulation, prototype testing), and the cost or safety impact you prevented. This demonstrates both technical skill and attention to detail.' },
      { q: `How do you manage cross-disciplinary collaboration on complex engineering projects?`, guidance: 'Discuss communication practices, design review processes, and how you coordinate with other engineering disciplines, procurement, and construction teams.' },
      { q: `What industry codes and standards are most relevant to your work, and how do you stay current?`, guidance: 'Name specific codes (ASME, IEEE, ASTM, ASCE, NEC). Discuss how you track updates, participate in standards committees, or implement new requirements in your work.' },
    ],
    'Healthcare': [
      { q: `How do you handle a situation where a patient or their family disagrees with the recommended treatment plan?`, guidance: 'Discuss patient-centered communication, shared decision-making, explaining risks and benefits clearly, and respecting patient autonomy while advocating for best clinical practice.' },
      { q: `Describe a time you had to work as part of an interdisciplinary care team. What was your role?`, guidance: 'Show collaborative skills: communication with physicians, nurses, therapists, and social workers. Describe how team coordination improved patient outcomes.' },
      { q: `How do you manage your workload during a particularly demanding shift?`, guidance: 'Discuss prioritization based on patient acuity, delegation to support staff, time management strategies, and how you maintain care quality under pressure.' },
      { q: `What steps do you take to prevent errors in your clinical work?`, guidance: 'Cover specific safety practices: checklists, verification protocols, hand hygiene, medication administration safety checks, and documentation accuracy.' },
      { q: `How do you handle a situation where you need to advocate for a patient's needs?`, guidance: 'Describe a specific situation where you escalated a concern, communicated with providers, or ensured a patient received appropriate care. Show patient advocacy skills.' },
    ],
    'Finance': [
      { q: `Walk me through how you've used data analysis to drive a financial recommendation.`, guidance: 'Describe the business question, data sources, analytical approach, and how your recommendation was received and implemented. Quantify the impact if possible.' },
      { q: `How do you ensure accuracy and compliance in your financial work?`, guidance: 'Discuss review processes, internal controls, reconciliation procedures, and how you stay current with regulatory requirements relevant to your specialty.' },
      { q: `Describe a time you identified a financial risk or opportunity that others missed.`, guidance: 'Show analytical thinking and initiative. Explain what you noticed, why others missed it, and the outcome of your finding.' },
      { q: `How do you handle tight deadlines during reporting periods?`, guidance: 'Discuss planning, prioritization, automation of routine tasks, and communication when timelines are at risk. Give a specific example from a close cycle or audit.' },
      { q: `How do you adapt your communication style when presenting financial data to different audiences?`, guidance: 'Discuss how you tailor the level of detail, visualization choices, and language for finance teams vs. operations vs. executive leadership.' },
    ],
    'Business': [
      { q: `Tell me about a business process you improved and the measurable impact it had.`, guidance: 'Walk through the problem identification, analysis, solution design, implementation, and results. Include specific metrics: time saved, cost reduced, or quality improved.' },
      { q: `How do you approach making a recommendation when data is incomplete or ambiguous?`, guidance: 'Discuss your framework for decision-making under uncertainty: identifying what you do know, assessing risks, proposing options, and communicating confidence levels to stakeholders.' },
      { q: `Describe a situation where you had to influence others without formal authority.`, guidance: 'Show persuasion and collaboration skills. Describe the context, your approach (data-driven, relationship-based), and the outcome.' },
      { q: `How do you prioritize competing projects or initiatives?`, guidance: 'Discuss your evaluation criteria: business impact, resource requirements, strategic alignment, and urgency. Mention frameworks you use and how you communicate priorities.' },
      { q: `What role does data play in your decision-making, and how do you balance it with intuition?`, guidance: 'Show that you value data but recognize its limitations. Discuss when you rely on analysis vs. experience, and how you make decisions when data points in different directions.' },
    ],
    'Management': [
      { q: `How do you build trust with a new team when stepping into a leadership role?`, guidance: 'Discuss your first 90-day approach: listening, one-on-ones, understanding existing dynamics, quick wins, and demonstrating competence without disrupting what works.' },
      { q: `Describe how you handle performance conversations with an underperforming team member.`, guidance: 'Cover specific, documented feedback, collaborative goal-setting, support and resources offered, timelines, and how you balance compassion with accountability.' },
      { q: `How do you delegate effectively while maintaining quality and accountability?`, guidance: 'Discuss matching tasks to strengths, clear expectations and deadlines, check-in cadence, and how you provide feedback without micromanaging.' },
      { q: `Tell me about a difficult decision you made as a leader. What was the outcome?`, guidance: 'Choose a decision with real stakes and competing considerations. Walk through your reasoning, who you consulted, and how you communicated the decision. Include the outcome and what you learned.' },
      { q: `How do you develop the skills and careers of your team members?`, guidance: 'Discuss individual development plans, stretch assignments, mentoring, training investments, and promotion advocacy. Give specific examples of team members you have developed.' },
    ],
    'Sales': [
      { q: `Walk me through your sales process from prospecting to close.`, guidance: 'Cover each stage: prospecting/qualifying, discovery, presentation/demo, objection handling, negotiation, and close. Include specific techniques and tools you use at each stage.' },
      { q: `How do you handle a prospect who goes silent during the sales cycle?`, guidance: 'Discuss multi-channel re-engagement strategies, adding value (not just "checking in"), knowing when to move on, and how you prevent ghosting in the first place through strong qualification.' },
      { q: `Describe your approach to handling the most common objection you face.`, guidance: 'Name the specific objection, explain why it occurs, and walk through your response framework. Show that you address underlying concerns rather than just overcoming surface-level pushback.' },
      { q: `How do you manage your pipeline to ensure consistent quarterly performance?`, guidance: 'Discuss pipeline coverage ratios, stage progression tracking, deal velocity analysis, and how you balance working existing deals with building future pipeline.' },
      { q: `Tell me about a deal you lost and what you learned from it.`, guidance: 'Show self-awareness and learning ability. Analyze what went wrong — qualification, competitive positioning, stakeholder management — and what you changed in your approach going forward.' },
    ],
    'Marketing': [
      { q: `Describe a marketing campaign you planned and executed. What were the results?`, guidance: 'Cover the strategy (target audience, messaging, channels), execution, measurement, and results. Include what you would do differently. This tests both planning and analytical ability.' },
      { q: `How do you measure the success of your marketing efforts?`, guidance: 'Discuss KPIs relevant to your specialty, attribution challenges, and how you connect marketing metrics to business outcomes. Show sophistication beyond vanity metrics.' },
      { q: `How do you approach creating content or campaigns for an audience you are not personally part of?`, guidance: 'Discuss research methods: customer interviews, persona development, data analysis, and testing assumptions. Show empathy and curiosity about understanding different perspectives.' },
      { q: `Describe a time you had to pivot a marketing strategy based on data or market changes.`, guidance: 'Show agility and data-driven decision-making. Walk through the original plan, what changed, how you recognized the need to pivot, and the outcome of the new approach.' },
      { q: `How do you stay creative while working within brand guidelines and marketing objectives?`, guidance: 'Discuss creative briefs, brainstorming processes, A/B testing creative variations, and finding innovation within constraints. Show that structure and creativity are not opposed.' },
    ],
    'HR': [
      { q: `How do you handle a workplace conflict between two team members?`, guidance: 'Discuss your investigation approach, maintaining neutrality, confidentiality, mediation techniques, and documentation. Show that you seek resolution, not just compliance.' },
      { q: `Describe your approach to improving employee engagement and retention.`, guidance: 'Cover data collection (surveys, stay interviews), analysis, action planning, and measurable outcomes. Show systemic thinking rather than one-off initiatives.' },
      { q: `How do you ensure hiring practices are fair, inclusive, and compliant?`, guidance: 'Discuss structured interviews, diverse candidate slates, bias training, accommodation practices, and compliance with EEO regulations. Show proactive DEI commitment, not just legal compliance.' },
      { q: `How do you handle a sensitive employee relations investigation?`, guidance: 'Cover investigation procedures: documentation, witness interviews, confidentiality, legal considerations, and outcome communication. Show thoroughness and fairness.' },
      { q: `How do you measure the effectiveness of HR programs and initiatives?`, guidance: 'Discuss metrics: turnover rates, time-to-fill, engagement scores, training effectiveness, and how you use data to justify HR investments to leadership.' },
    ],
    'Administrative': [
      { q: `How do you manage multiple priorities with competing deadlines?`, guidance: 'Discuss your organizational systems: task management tools, priority matrices, communication about capacity, and how you negotiate deadlines when everything is urgent.' },
      { q: `Describe a time you improved an office process or system.`, guidance: 'Walk through the problem, your solution, implementation, and the measurable impact (time saved, errors reduced, satisfaction improved). Show initiative.' },
      { q: `How do you handle sensitive or confidential information?`, guidance: 'Discuss document security, digital privacy practices, discretion in communications, and your understanding of what information should and should not be shared.' },
      { q: `What software and tools are you most proficient with?`, guidance: 'Be specific: name the tools, your proficiency level, and how you use them. Mention any certifications. Include both standard office tools and specialized systems relevant to the role.' },
      { q: `How do you handle interruptions while working on important tasks?`, guidance: 'Discuss your approach to balancing responsiveness with focus: time blocking, managing expectations, and determining what requires immediate attention vs. can wait.' },
    ],
    'Customer Service': [
      { q: `How do you handle a customer whose problem you cannot solve?`, guidance: 'Discuss empathy, transparency, escalation procedures, and follow-up. Show that you take ownership even when the resolution is beyond your control.' },
      { q: `Describe a time you turned a negative customer experience into a positive one.`, guidance: 'Share a specific example with a clear before and after. Show active listening, problem-solving, and genuine concern for the customer outcome.' },
      { q: `How do you maintain a positive attitude during difficult customer interactions?`, guidance: 'Discuss separating personal feelings from professional interactions, self-care strategies, and understanding that customer frustration is usually about the situation, not you.' },
      { q: `What do you think makes excellent customer service?`, guidance: 'Go beyond "being friendly." Discuss first-contact resolution, proactive communication, personalization, and making the customer feel heard and valued.' },
      { q: `How do you adapt your communication style for different types of customers?`, guidance: 'Discuss reading customer cues (technical vs. non-technical, upset vs. confused), adjusting language and pace, and channel-appropriate communication (phone vs. chat vs. email).' },
    ],
    'Retail': [
      { q: `How do you approach a customer who seems undecided or hesitant?`, guidance: 'Discuss asking open-ended questions, understanding their needs, presenting options without pressure, and building genuine rapport. Show that you help customers make confident decisions.' },
      { q: `Describe how you handle a busy shift with limited staff.`, guidance: 'Cover prioritization, multitasking, customer acknowledgment techniques, and maintaining store standards under pressure.' },
      { q: `How do you handle returns or exchanges from difficult customers?`, guidance: 'Discuss following company policy while being empathetic, finding solutions within your authority, and knowing when to escalate. Customer retention matters more than being right.' },
      { q: `What strategies do you use to meet sales goals?`, guidance: 'Discuss product knowledge, suggestive selling, building customer relationships, and tracking your performance. Give specific examples of exceeding targets.' },
      { q: `How do you maintain store appearance and merchandising standards during business hours?`, guidance: 'Discuss zone recovery, task prioritization between customer service and store maintenance, and how you balance selling with operational duties.' },
    ],
    'Logistics': [
      { q: `How do you handle a shipment that's delayed or damaged in transit?`, guidance: 'Discuss your response protocol: customer communication, carrier claim processes, alternative fulfillment options, and root cause investigation. Speed and transparency matter most.' },
      { q: `Describe your experience with inventory management and accuracy.`, guidance: 'Cover cycle counting, reconciliation procedures, discrepancy investigation, and inventory accuracy rates you have maintained. Name specific systems used.' },
      { q: `How do you optimize logistics processes to reduce costs without affecting service levels?`, guidance: 'Discuss route optimization, carrier negotiation, consolidation strategies, and technology implementation. Give specific examples with cost savings achieved.' },
      { q: `How do you manage relationships with carriers and logistics partners?`, guidance: 'Cover performance monitoring, regular business reviews, contract negotiation, and how you handle underperformance. Show partnership rather than just vendor management.' },
      { q: `What metrics do you track most closely in your logistics operations?`, guidance: 'Discuss on-time delivery, cost per shipment, damage rates, inventory accuracy, and capacity utilization. Show that you manage by metrics, not just gut feel.' },
    ],
    'Hospitality': [
      { q: `How do you handle a guest complaint to ensure they leave satisfied?`, guidance: 'Discuss the LEARN method: Listen, Empathize, Apologize, Resolve, Notify. Give a specific example of turning an unhappy guest into a loyal one.' },
      { q: `Describe your approach to training staff on service standards.`, guidance: 'Cover onboarding programs, role-playing, mentoring, consistent reinforcement, and how you maintain standards across different shifts and team members.' },
      { q: `How do you manage staffing during seasonal peaks and slow periods?`, guidance: 'Discuss forecasting, cross-training, flexible scheduling, and balancing labor cost with service quality. Mention specific scheduling tools or approaches.' },
      { q: `How do you maintain consistency in guest experience across your team?`, guidance: 'Cover service standards documentation, regular training, mystery shopper programs, and feedback loops. Show that consistency comes from systems, not just individual effort.' },
      { q: `What steps do you take to create a welcoming atmosphere for diverse guests?`, guidance: 'Discuss cultural awareness training, language accommodations, accessibility considerations, and reading guest preferences. Show genuine hospitality beyond scripted service.' },
    ],
    'Construction': [
      { q: `How do you ensure safety compliance on your job site?`, guidance: 'Cover daily safety meetings, site inspections, PPE enforcement, hazard communication, and how you empower workers to stop unsafe work. Show that safety is proactive, not reactive.' },
      { q: `Describe how you manage subcontractors and coordinate multiple trades on site.`, guidance: 'Discuss scheduling coordination, quality expectations, daily communication, and conflict resolution between trades. Show leadership in a multi-stakeholder environment.' },
      { q: `How do you handle cost overruns or unexpected changes during a project?`, guidance: 'Cover change order management, value engineering, client communication, and your approach to staying within budget when surprises arise.' },
      { q: `What is your approach to quality control during construction?`, guidance: 'Discuss inspection checkpoints, code compliance verification, punch list management, and how you catch issues before they become costly corrections.' },
      { q: `How do you keep a project on schedule when you encounter weather delays or material shortages?`, guidance: 'Cover schedule recovery strategies, critical path management, material contingency planning, and communication with owners about revised timelines.' },
    ],
    'Creative': [
      { q: `How do you respond to creative feedback that you disagree with?`, guidance: 'Show professionalism and openness. Discuss presenting your design rationale with evidence while being genuinely open to the possibility that the feedback improves the work.' },
      { q: `Walk me through a project from concept to final delivery.`, guidance: 'Cover research, ideation, concept development, client presentation, revisions, and production. Mention timelines, collaboration, and how you handled changes.' },
      { q: `How do you maintain creativity and avoid burnout?`, guidance: 'Discuss inspiration sources outside work, creative routines, collaboration, and how you refresh your perspective. Show self-awareness about your creative process.' },
      { q: `How do you balance creative vision with client requirements or business objectives?`, guidance: 'Show that you view constraints as creative challenges, not limitations. Give an example of producing excellent creative work within strict guidelines.' },
      { q: `How do you present your work to stakeholders who aren't design-literate?`, guidance: 'Discuss framing decisions in terms of user goals and business outcomes rather than design jargon. Show that you can advocate for design decisions with evidence.' },
    ],
    'Trades': [
      { q: `What do you do when you encounter a problem on the job that you haven't seen before?`, guidance: 'Discuss diagnostic approaches, consulting references (codes, manuals), asking experienced colleagues, and knowing when to escalate. Show problem-solving ability and willingness to learn.' },
      { q: `How do you approach safety differently on different types of job sites?`, guidance: 'Cover risk assessment based on site type (residential vs. commercial vs. industrial), specific hazards, and how you adapt your safety practices accordingly.' },
      { q: `Describe your tool maintenance habits and organizational system.`, guidance: 'Discuss regular inspection, cleaning, calibration, and organized storage. Show that you treat your tools as investments and understand that tool condition affects work quality.' },
      { q: `How do you handle a situation where you notice code violations in existing work you're working near?`, guidance: "Discuss documentation, communication with the project supervisor, and your understanding of when you are obligated to report vs. when it is outside your scope." },
      { q: `What continuing education or certifications are you pursuing?`, guidance: 'Show career development initiative: apprenticeship progression, journeyman to master advancement, specialized certifications, or new technology training.' },
    ],
    'Manufacturing': [
      { q: `How do you maintain quality standards during high-volume production runs?`, guidance: 'Discuss SPC techniques, first-article inspection, in-process checks, and your approach to catching defects before they become batch problems.' },
      { q: `Describe your experience with lean manufacturing or continuous improvement.`, guidance: 'Give specific examples of kaizen events, 5S implementation, waste reduction, or process improvement projects. Include measurable results.' },
      { q: `How do you handle equipment breakdowns during production?`, guidance: 'Cover your troubleshooting approach, communication with maintenance, documentation, and any basic repair capabilities you have. Show production awareness alongside technical ability.' },
      { q: `How do you adapt to schedule changes or priority shifts in production?`, guidance: 'Discuss flexibility, changeover efficiency, communication with team members, and how you maintain quality during transitions between jobs or products.' },
      { q: `What safety precautions do you take when operating manufacturing equipment?`, guidance: 'Cover lockout/tagout, PPE requirements, machine guarding, and your approach to reporting unsafe conditions. Show that safety training is actively practiced, not just completed.' },
    ],
  };

  const qs = categoryQs[category];
  if (qs) return qs;

  // Generic fallback
  return [
    { q: `Tell me about your most significant achievement in your ${jobTitle} career.`, guidance: 'Structure your answer with the situation, your specific contribution, and the measurable result. Choose an accomplishment that demonstrates skills directly relevant to the role you are applying for.' },
    { q: `Why are you interested in this ${jobTitle} position specifically?`, guidance: 'Research the company beforehand and connect their needs to your skills. Show genuine interest in the work, not just the paycheck. Mention specific aspects of the role or company that appeal to you.' },
    { q: `How do you handle situations where you need to learn something new quickly?`, guidance: 'Give a concrete example. Describe the learning challenge, your approach, and how quickly you became productive. This tests adaptability, which matters in every role.' },
    { q: `Describe a situation where you had a disagreement with a coworker. How did you resolve it?`, guidance: 'Show emotional intelligence and professionalism. Focus on the resolution process: active listening, finding common ground, and maintaining the working relationship.' },
    { q: `Where do you see your ${jobTitle} career going in the next 3-5 years?`, guidance: 'Show ambition aligned with a realistic path. Connect your growth goals to the opportunity at hand. Avoid answers that suggest you will quickly leave or are not committed to the field.' },
  ];
}

function buildSection(questions, jobTitle) {
  let section = `## Common ${jobTitle} Interview Questions\n\n`;
  section += `Preparing for interviews is an important part of the job search process. Here are questions frequently asked in ${jobTitle} interviews, along with guidance on how to answer them:\n\n`;

  for (const { q, guidance } of questions) {
    section += `### "${q}"\n\n`;
    section += `${guidance}\n\n`;
  }

  return section;
}

// ─── Main ──────────────────────────────────────────────────────────────

const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.mdx'));
console.log(`Adding Interview Questions to ${files.length} files...\n`);

let added = 0;
let skipped = 0;

for (const file of files) {
  const filePath = path.join(CONTENT_DIR, file);
  const raw = fs.readFileSync(filePath, 'utf-8');

  if (raw.includes('## Common') && raw.includes('Interview Questions')) {
    skipped++;
    continue;
  }

  const { data, content } = matter(raw);
  const slug = data.slug || file.replace('.mdx', '');
  const jobTitle = data.jobTitle || slug.replace(/-/g, ' ');
  const category = data.category || 'General';
  const keySkills = data.keySkills || [];

  const questions = getQuestions(slug, jobTitle, category, keySkills);
  const section = buildSection(questions, jobTitle);

  // Insert before "## Common Mistakes to Avoid"
  let newContent;
  const mistakesIdx = content.indexOf('## Common Mistakes to Avoid');
  if (mistakesIdx !== -1) {
    newContent = content.slice(0, mistakesIdx) + section + '\n' + content.slice(mistakesIdx);
  } else {
    // Insert before the last paragraph
    const lines = content.trimEnd().split('\n');
    const lastLine = lines.pop();
    newContent = lines.join('\n') + '\n\n' + section + '\n' + lastLine + '\n';
  }

  const newFile = matter.stringify(newContent, data);
  fs.writeFileSync(filePath, newFile, 'utf-8');
  added++;
}

console.log(`\n✅ Added Interview Questions to ${added} files (${skipped} already had them).`);
console.log(`Total processed: ${files.length}`);
