#!/usr/bin/env node

/**
 * Generate 12 Government resume examples following CLAUDE.md guidelines
 */

import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = path.join(process.cwd(), 'frontend/content/resume-examples');

const JOBS = [
  {
    slug: 'policy-analyst',
    jobTitle: 'Policy Analyst',
    category: 'Government',
    avgSalary: '$72,000',
    salaryRange: '$52,000 - $105,000',
    yearsExperience: '2-5',
    jobGrowth: '8%',
    blsUrl: 'https://www.bls.gov/ooh/life-physical-and-social-science/political-scientists.htm',
    cardSummary: 'Shape policy through rigorous analysis. Show your research depth and policy impact.',
    skills: {
      research: ['Policy Research', 'Data Analysis', 'Literature Review', 'Impact Assessment'],
      writing: ['Policy Briefs', 'White Papers', 'Legislative Summaries', 'Grant Proposals'],
      analysis: ['Cost-Benefit Analysis', 'Statistical Modeling', 'Stakeholder Analysis', 'Program Evaluation']
    },
    certifications: ['Masters in Public Policy', 'SPSS/Stata Certification', 'Security Clearance'],
    summaries: {
      entry: 'Policy research assistant with Masters in Public Policy and experience supporting legislative analysis for state government. Skilled in data collection, literature review, and drafting policy briefs. Proficient in STATA and Excel for quantitative analysis.',
      mid: 'Policy Analyst with 4 years developing recommendations for federal agency programs. Authored 25+ policy briefs informing regulatory decisions affecting $500M in program funding. Expert in cost-benefit analysis and stakeholder engagement.',
      senior: 'Senior Policy Analyst with 8+ years shaping major legislation and regulatory frameworks. Led analysis teams evaluating programs serving 2M+ constituents. Testimony cited in congressional hearings. Known for translating complex data into actionable policy recommendations.'
    },
    bullets: [
      'Authored 30+ policy briefs and white papers informing $400M in program decisions',
      'Led cost-benefit analysis for proposed regulation, identifying $12M in potential savings',
      'Conducted stakeholder interviews with 50+ community organizations to assess policy impact',
      'Developed data dashboard tracking key metrics for 15 state programs',
      'Presented findings to legislative committees, influencing 3 major policy amendments',
      'Managed research team of 4 junior analysts on multi-year program evaluation'
    ],
    formatTips: [
      'Lead with policy areas of expertise (healthcare, education, environment, etc.)',
      'Include publications, testimony, or citations to establish credibility',
      'List specific analytical tools and methods (STATA, cost-benefit, regression)',
      'Mention security clearance level if applicable',
      'Highlight policy outcomes or legislative changes influenced'
    ],
    hiringTip: {
      insight: 'I need analysts who can translate data into decisions. Show me briefs youve written that actually changed something—not just reports that sat on a shelf.',
      elaboration: 'Government agencies hire policy analysts who can produce actionable insights under deadline pressure. Your resume should demonstrate research rigor, writing ability, and policy impact. Include specific examples of recommendations adopted or legislation influenced. Clearance status matters for federal roles.'
    },
    interviewQuestions: [
      { q: 'Walk me through your process for analyzing a new policy proposal', guidance: 'Describe your methodology: stakeholder identification, data collection, analysis framework, and recommendation development.' },
      { q: 'Tell me about a policy brief that influenced a decision', guidance: 'Share specific example with context, your analysis, the recommendation, and the outcome.' },
      { q: 'How do you handle conflicting stakeholder interests in your analysis?', guidance: 'Show objectivity, acknowledgment of trade-offs, and evidence-based approach.' },
      { q: 'Describe your experience with quantitative analysis methods', guidance: 'List specific tools (STATA, R, SPSS), methods used, and examples of insights derived.' },
      { q: 'How do you communicate complex findings to non-technical audiences?', guidance: 'Discuss visualization, executive summaries, and adapting language for different stakeholders.' }
    ],
    mistakes: [
      'Listing research tasks without showing policy outcomes or impact',
      'Omitting specific analytical methods and tools used',
      'Failing to mention publications, testimony, or citations',
      'Generic descriptions of "research" without policy area expertise',
      'Not including security clearance status for federal positions'
    ],
    atsKeywords: ['policy analyst', 'policy research', 'cost-benefit analysis', 'legislative', 'regulatory', 'program evaluation', 'stakeholder', 'policy brief', 'STATA', 'public policy']
  },
  {
    slug: 'legislative-aide',
    jobTitle: 'Legislative Aide',
    category: 'Government',
    avgSalary: '$48,000',
    salaryRange: '$35,000 - $72,000',
    yearsExperience: '1-3',
    jobGrowth: '5%',
    blsUrl: 'https://www.bls.gov/ooh/legal/paralegals-and-legal-assistants.htm',
    cardSummary: 'Support lawmakers in shaping policy. Show your research skills and constituent service.',
    skills: {
      legislative: ['Bill Tracking', 'Research', 'Amendment Drafting', 'Committee Preparation'],
      constituent: ['Casework', 'Correspondence', 'Meeting Coordination', 'Issue Tracking'],
      communication: ['Speech Writing', 'Press Relations', 'Social Media', 'Stakeholder Outreach']
    },
    certifications: ['Congressional Management Foundation Training', 'Security Clearance'],
    summaries: {
      entry: 'Recent political science graduate with internship experience in state legislature. Assisted with constituent correspondence, bill tracking, and committee hearing preparation. Proficient in legislative database systems and policy research.',
      mid: 'Legislative Aide with 3 years supporting senior state senator on healthcare and education policy portfolios. Draft legislation, manage constituent casework, and coordinate with lobbyists and advocacy groups. Helped advance 5 bills through committee.',
      senior: 'Senior Legislative Aide managing policy portfolio for U.S. House member. Oversee team of 3 junior staff, coordinate with committee leadership, and draft legislation. 12 sponsored bills passed. Known for building bipartisan relationships.'
    },
    bullets: [
      'Managed constituent casework for district of 750K, resolving 200+ cases monthly',
      'Drafted 15 bills and amendments, 5 of which passed committee and 2 signed into law',
      'Prepared member for 50+ committee hearings with briefing memos and talking points',
      'Coordinated with 30+ stakeholder organizations on legislative priorities',
      'Managed social media presence growing follower engagement by 45%',
      'Supervised 4 interns on research projects and constituent correspondence'
    ],
    formatTips: [
      'Lead with the level of government and member/office you supported',
      'Include policy areas you specialized in (healthcare, veterans, etc.)',
      'List legislation you helped draft and its outcome',
      'Highlight constituent casework volume and resolution rates',
      'Mention any bipartisan work or across-the-aisle relationships'
    ],
    hiringTip: {
      insight: 'I want staff who understand that 80% of this job is constituent service. Show me your casework experience and how you handled angry callers—not just the policy work.',
      elaboration: 'Legislative offices value aides who can manage the dual demands of policy work and constituent service. Your resume should demonstrate both research capability and people skills. Include casework volume and resolution examples. Campaign experience is valuable but not sufficient alone.'
    },
    interviewQuestions: [
      { q: 'How do you prioritize when you have competing deadlines from the member?', guidance: 'Show judgment, communication, and ability to manage up.' },
      { q: 'Describe a challenging constituent case you resolved', guidance: 'Demonstrate problem-solving, empathy, and knowledge of government processes.' },
      { q: 'How do you prepare a member for a committee hearing?', guidance: 'Walk through your process: research, briefing memo, talking points, practice Q&A.' },
      { q: 'Tell me about legislation you helped draft', guidance: 'Describe the policy problem, your research, the drafting process, and outcome.' },
      { q: 'How do you handle a call from an angry constituent?', guidance: 'Show de-escalation skills, empathy, and follow-through commitment.' }
    ],
    mistakes: [
      'Focusing only on policy work while omitting constituent service experience',
      'Not specifying the level of government or type of office',
      'Omitting specific policy areas you specialized in',
      'Failing to list legislative outcomes (bills passed, amendments adopted)',
      'Leaving out casework volume or resolution examples'
    ],
    atsKeywords: ['legislative aide', 'legislative assistant', 'constituent services', 'casework', 'bill drafting', 'policy research', 'congressional', 'committee', 'government relations']
  },
  {
    slug: 'grants-manager',
    jobTitle: 'Grants Manager',
    category: 'Government',
    avgSalary: '$62,000',
    salaryRange: '$48,000 - $85,000',
    yearsExperience: '3-5',
    jobGrowth: '7%',
    blsUrl: 'https://www.bls.gov/ooh/business-and-financial/budget-analysts.htm',
    cardSummary: 'Secure and manage critical funding. Show your grant wins and compliance expertise.',
    skills: {
      acquisition: ['Grant Writing', 'RFP Response', 'Budget Development', 'Proposal Strategy'],
      management: ['Compliance Monitoring', 'Reporting Requirements', 'Audit Preparation', 'Subgrant Administration'],
      financial: ['Budget Tracking', 'Cost Allocation', 'Financial Reporting', 'Fund Accounting']
    },
    certifications: ['Grants Management Certificate', 'CFR Training', 'CPA (optional)'],
    summaries: {
      entry: 'Grant coordinator with 2 years supporting federal grant administration. Assist with compliance monitoring, reporting, and budget tracking. Experienced with Grants.gov, SAM.gov, and federal financial reporting systems.',
      mid: 'Grants Manager overseeing $8M portfolio of federal, state, and foundation funding. Wrote successful proposals winning $3M+ in new funding over 3 years. Expert in 2 CFR 200 compliance, OMB circulars, and audit preparation.',
      senior: 'Senior Grants Manager with 7+ years securing and administering $25M+ in federal funding. Built grants department from ground up for growing nonprofit. 85% win rate on federal proposals. Led organization through 5 successful single audits with zero findings.'
    },
    bullets: [
      'Managed $12M portfolio of federal grants ensuring 100% compliance with 2 CFR 200',
      'Wrote 25 successful grant proposals totaling $4.5M in new funding (78% win rate)',
      'Led preparation for annual single audit achieving zero findings for 4 consecutive years',
      'Implemented grants management system reducing reporting time by 40%',
      'Supervised 3 grant specialists and trained 20 program staff on compliance requirements',
      'Developed indirect cost rate proposal accepted by federal cognizant agency'
    ],
    formatTips: [
      'Lead with total dollar value of grants managed and portfolio size',
      'Include grant proposal success rate and dollar amounts won',
      'List specific compliance frameworks (2 CFR 200, OMB circulars)',
      'Highlight audit results—zero findings is a major achievement',
      'Mention grants management systems used (Fluxx, Submittable, SAP)'
    ],
    hiringTip: {
      insight: 'Show me your audit history first. I can teach grant writing, but compliance failures sink organizations. Zero findings in single audits tells me you know what youre doing.',
      elaboration: 'Government and nonprofit employers hire grants managers who understand compliance is non-negotiable. Your resume must demonstrate regulatory knowledge (2 CFR 200), successful audit history, and proposal success rates. Include both acquisition (proposals won) and administration (compliance, reporting) experience.'
    },
    interviewQuestions: [
      { q: 'How do you ensure compliance with 2 CFR 200 requirements?', guidance: 'Discuss monitoring systems, training, documentation, and internal controls.' },
      { q: 'Walk me through your grant proposal development process', guidance: 'Cover needs assessment, budget development, narrative writing, review, and submission.' },
      { q: 'Describe how you prepare for a single audit', guidance: 'Explain year-round preparation, documentation systems, and working with auditors.' },
      { q: 'How do you handle a program that is overspending its grant budget?', guidance: 'Show early detection, communication with funder, and remediation strategies.' },
      { q: 'Tell me about a grant you won that you are most proud of', guidance: 'Describe the need, your proposal strategy, competition, and impact.' }
    ],
    mistakes: [
      'Listing grant amounts without specifying your role (writing vs. managing)',
      'Omitting compliance framework knowledge (2 CFR 200, OMB)',
      'Failing to include audit results or compliance track record',
      'Not showing proposal success rates alongside grants won',
      'Generic descriptions without specific funder types or programs'
    ],
    atsKeywords: ['grants manager', 'grant writing', '2 CFR 200', 'federal grants', 'compliance', 'single audit', 'OMB', 'proposal development', 'Grants.gov', 'fund accounting']
  },
  {
    slug: 'building-inspector',
    jobTitle: 'Building Inspector',
    category: 'Government',
    avgSalary: '$62,000',
    salaryRange: '$45,000 - $85,000',
    yearsExperience: '3-6',
    jobGrowth: '4%',
    blsUrl: 'https://www.bls.gov/ooh/construction-and-extraction/construction-and-building-inspectors.htm',
    cardSummary: 'Ensure structures are safe and compliant. Show your code expertise and inspection volume.',
    skills: {
      technical: ['Code Enforcement', 'Blueprint Reading', 'Structural Assessment', 'HVAC Systems'],
      regulatory: ['Building Codes', 'Zoning Laws', 'Permit Processing', 'Violation Documentation'],
      inspection: ['Site Inspection', 'Report Writing', 'Violation Resolution', 'Certificate of Occupancy']
    },
    certifications: ['ICC Certification', 'Residential Building Inspector', 'Commercial Building Inspector', 'Plans Examiner'],
    summaries: {
      entry: 'Journey-level carpenter transitioning to building inspection with 8 years construction experience and ICC Residential Building Inspector certification. Deep knowledge of wood-frame construction, building codes, and permit requirements.',
      mid: 'Building Inspector with 4 years conducting 15+ inspections daily for residential and light commercial construction. ICC certified in residential, commercial, and plumbing inspection. Known for fair enforcement and clear communication with contractors.',
      senior: 'Senior Building Inspector and Plans Examiner with 10+ years ensuring code compliance for municipality of 200K residents. Conducted 3,500+ inspections annually. Served as expert witness in 15 construction litigation cases. Mentor new inspectors.'
    },
    bullets: [
      'Conducted 3,000+ building inspections annually ensuring compliance with IBC, IRC, and local codes',
      'Reviewed 500+ permit applications and construction plans for code compliance',
      'Reduced average permit processing time by 30% through streamlined review procedures',
      'Achieved 95% violation correction rate through contractor education and follow-up',
      'Trained 6 new inspectors on code interpretation and inspection procedures',
      'Served as expert witness in 12 construction defect cases, testified in 5 trials'
    ],
    formatTips: [
      'Lead with ICC certifications—these are industry standard requirements',
      'Include inspection volume (daily/annual) to demonstrate experience',
      'List specific code versions (IBC 2021, IRC 2021, NEC) you work with',
      'Highlight specialty areas (residential, commercial, electrical, plumbing)',
      'Mention plans examination experience separately from field inspection'
    ],
    hiringTip: {
      insight: 'ICC certifications are non-negotiable. Beyond that, I want inspectors who can explain code requirements clearly—enforcement works better through education than citations.',
      elaboration: 'Building departments hire inspectors who combine technical code knowledge with communication skills. Your resume must list ICC certifications prominently and demonstrate inspection volume. Construction trade experience is valuable background. Show you can work with contractors, not just against them.'
    },
    interviewQuestions: [
      { q: 'How do you handle a contractor who disagrees with your code interpretation?', guidance: 'Show diplomacy, cite specific code sections, and explain escalation process.' },
      { q: 'Describe a complex code violation you resolved', guidance: 'Walk through discovery, documentation, communication, and resolution.' },
      { q: 'What do you check during a framing inspection?', guidance: 'Demonstrate systematic approach: structural connections, fire blocking, draftstopping, etc.' },
      { q: 'How do you stay current with code changes?', guidance: 'Discuss continuing education, code update training, and professional associations.' },
      { q: 'Tell me about a safety hazard you discovered during inspection', guidance: 'Show urgency, proper documentation, and follow-through to resolution.' }
    ],
    mistakes: [
      'Not listing ICC certifications prominently—these are essential',
      'Omitting inspection volume or area of specialty',
      'Failing to mention specific code versions you work with',
      'Listing construction experience without connecting it to inspection skills',
      'Not distinguishing between field inspection and plans examination'
    ],
    atsKeywords: ['building inspector', 'ICC certified', 'code enforcement', 'IBC', 'IRC', 'plans examiner', 'permit', 'residential inspector', 'commercial inspector', 'certificate of occupancy']
  },
  {
    slug: 'probation-officer',
    jobTitle: 'Probation Officer',
    category: 'Government',
    avgSalary: '$58,000',
    salaryRange: '$42,000 - $78,000',
    yearsExperience: '1-4',
    jobGrowth: '4%',
    blsUrl: 'https://www.bls.gov/ooh/community-and-social-service/probation-officers-and-correctional-treatment-specialists.htm',
    cardSummary: 'Guide offenders toward rehabilitation. Show your caseload management and reentry success.',
    skills: {
      supervision: ['Risk Assessment', 'Case Management', 'Home Visits', 'Drug Testing'],
      intervention: ['Cognitive Behavioral Programs', 'Crisis Intervention', 'Resource Referrals', 'Reentry Planning'],
      documentation: ['Pre-Sentence Reports', 'Court Testimony', 'Violation Reports', 'Progress Documentation']
    },
    certifications: ['Peace Officer Certification', 'APPA Certification', 'Motivational Interviewing', 'Firearms Qualification'],
    summaries: {
      entry: 'Criminal justice graduate with internship experience in adult probation. Assisted with case documentation, drug testing, and community resource coordination. Trained in risk assessment tools and motivational interviewing techniques.',
      mid: 'Probation Officer with 4 years supervising caseload of 80+ adult felony offenders. Expert in risk-needs-responsivity model, cognitive behavioral interventions, and reentry planning. Reduced technical violations by 30% through evidence-based practices.',
      senior: 'Senior Probation Officer with 8+ years and specialized caseload of high-risk/high-need offenders. Developed departments substance abuse treatment protocol. Testified in 100+ court hearings. Train new officers on supervision strategies.'
    },
    bullets: [
      'Supervised caseload of 85 adult felony offenders with 92% successful completion rate',
      'Conducted 200+ pre-sentence investigations and wrote reports for court consideration',
      'Reduced revocations by 25% through graduated sanctions and early intervention',
      'Testified in 75+ court hearings on violations, modifications, and sentencing',
      'Implemented cognitive behavioral programming reducing recidivism by 18% in pilot group',
      'Trained 8 new probation officers on risk assessment, case planning, and documentation'
    ],
    formatTips: [
      'Include caseload size and type (felony, misdemeanor, specialized) to show experience',
      'List completion and revocation rates—these are key performance metrics',
      'Mention risk assessment tools used (LSI-R, COMPAS, etc.)',
      'Highlight specialized training (motivational interviewing, CBT, trauma-informed)',
      'Include court testimony experience and volume'
    ],
    hiringTip: {
      insight: 'I look at completion rates and revocations. Anyone can violate offenders—I want officers who can use graduated sanctions and actually help people change while keeping the community safe.',
      elaboration: 'Courts and probation departments hire officers who balance accountability with rehabilitation. Your resume should demonstrate caseload management, evidence-based practices knowledge, and successful outcomes. Include completion rates and any innovations that reduced recidivism.'
    },
    interviewQuestions: [
      { q: 'How do you determine the appropriate response to a violation?', guidance: 'Explain graduated sanctions, considering risk level, violation severity, and pattern.' },
      { q: 'Describe your approach to a probationer resistant to treatment', guidance: 'Show motivational interviewing skills and engagement strategies.' },
      { q: 'How do you conduct a risk assessment?', guidance: 'Walk through the tools you use and how assessment informs supervision level.' },
      { q: 'Tell me about testifying in court on a violation', guidance: 'Describe preparation, documentation, and maintaining objectivity under cross-examination.' },
      { q: 'How do you balance helping probationers with protecting public safety?', guidance: 'Show understanding of dual role and how evidence-based practices serve both.' }
    ],
    mistakes: [
      'Not including caseload size and type of supervision',
      'Omitting outcome metrics (completion rates, revocations)',
      'Failing to list risk assessment tools and training',
      'Describing only enforcement without rehabilitation efforts',
      'Not mentioning court testimony or report writing experience'
    ],
    atsKeywords: ['probation officer', 'case management', 'risk assessment', 'pre-sentence investigation', 'supervision', 'court testimony', 'reentry', 'cognitive behavioral', 'LSI-R', 'community corrections']
  },
  {
    slug: 'customs-officer',
    jobTitle: 'Customs Officer',
    category: 'Government',
    avgSalary: '$65,000',
    salaryRange: '$48,000 - $95,000',
    yearsExperience: '0-3',
    jobGrowth: '5%',
    blsUrl: 'https://www.bls.gov/ooh/protective-service/police-and-detectives.htm',
    cardSummary: 'Protect borders and facilitate trade. Show your inspection skills and interdiction success.',
    skills: {
      inspection: ['Cargo Examination', 'Document Verification', 'Vehicle Inspection', 'Passenger Processing'],
      enforcement: ['Contraband Detection', 'Immigration Law', 'Trade Compliance', 'Interview Techniques'],
      systems: ['TECS Database', 'ACE System', 'X-Ray Interpretation', 'Risk Assessment Tools']
    },
    certifications: ['FLETC Training', 'CBP Academy Graduate', 'HAZMAT Awareness', 'Firearms Qualification'],
    summaries: {
      entry: 'CBP Academy graduate with strong academic performance in immigration law, contraband detection, and interview techniques. Military veteran with security clearance and experience in high-pressure environments. Bilingual English/Spanish.',
      mid: 'Customs and Border Protection Officer with 4 years at major port of entry processing 500+ travelers daily. Interdicted $2M+ in contraband and referred 200+ immigration violations. Expert in document fraud detection and interview techniques.',
      senior: 'Senior CBP Officer with 8+ years including K-9 handler and field training officer roles. Led port operations during high-volume periods. Recognized for $5M+ in contraband seizures. Train new officers on inspection techniques and systems.'
    },
    bullets: [
      'Processed 400+ travelers daily while maintaining security protocols and facilitation targets',
      'Intercepted $1.8M in narcotics and currency over 3 years through vehicle and cargo inspection',
      'Identified 150+ fraudulent documents and referred 200+ immigration violations',
      'Achieved 98% accuracy in passenger processing with zero legitimate traveler complaints',
      'Trained 15 new officers as Field Training Officer on inspection procedures and systems',
      'Recognized with 3 commendations for significant seizures and enforcement actions'
    ],
    formatTips: [
      'Highlight FLETC/CBP Academy completion—this is required training',
      'Include seizure or interdiction statistics to demonstrate effectiveness',
      'Mention processing volume to show you can handle high-traffic environments',
      'List language skills—these are highly valued in customs work',
      'Note security clearance level and status'
    ],
    hiringTip: {
      insight: 'I want officers who can spot anomalies while processing 500 people. Show me your seizure stats, but also show me you can work efficiently under pressure without causing legitimate traveler delays.',
      elaboration: 'CBP hires officers who balance security with facilitation. Your resume should demonstrate both enforcement success (seizures, violations) and processing efficiency. Language skills and military/law enforcement background are valued. Academy completion and security clearance are prerequisites.'
    },
    interviewQuestions: [
      { q: 'How do you identify potentially deceptive travelers?', guidance: 'Discuss behavioral indicators, questioning techniques, and document examination without profiling.' },
      { q: 'Describe a significant seizure or interdiction you made', guidance: 'Walk through the indicators, your actions, and the outcome.' },
      { q: 'How do you balance thorough inspection with processing efficiency?', guidance: 'Show risk-based approach and understanding of facilitation mission.' },
      { q: 'What would you do if you suspected a colleague of misconduct?', guidance: 'Demonstrate integrity and knowledge of reporting procedures.' },
      { q: 'How do you handle stressful situations with hostile travelers?', guidance: 'Show de-escalation skills while maintaining authority and safety.' }
    ],
    mistakes: [
      'Not mentioning FLETC or CBP Academy training',
      'Omitting seizure statistics or enforcement actions',
      'Failing to show processing volume and efficiency',
      'Leaving out language skills or security clearance',
      'Generic law enforcement descriptions without customs-specific experience'
    ],
    atsKeywords: ['customs officer', 'CBP', 'border protection', 'port of entry', 'contraband', 'inspection', 'FLETC', 'immigration', 'cargo', 'enforcement']
  },
  {
    slug: 'environmental-compliance-officer',
    jobTitle: 'Environmental Compliance Officer',
    category: 'Government',
    avgSalary: '$68,000',
    salaryRange: '$50,000 - $95,000',
    yearsExperience: '3-6',
    jobGrowth: '6%',
    blsUrl: 'https://www.bls.gov/ooh/life-physical-and-social-science/environmental-scientists-and-specialists.htm',
    cardSummary: 'Enforce environmental regulations that protect communities. Show your inspection expertise.',
    skills: {
      regulatory: ['EPA Regulations', 'RCRA', 'Clean Air Act', 'Clean Water Act', 'State Environmental Laws'],
      inspection: ['Facility Inspection', 'Sample Collection', 'Violation Documentation', 'Enforcement Actions'],
      technical: ['Air Quality Monitoring', 'Water Quality Testing', 'Hazardous Waste Assessment', 'GIS Mapping']
    },
    certifications: ['CHMM', '40-Hour HAZWOPER', 'State Environmental Inspector Certification'],
    summaries: {
      entry: 'Environmental science graduate with internship experience at state EPA office. Assisted with facility inspections, sample collection, and compliance documentation. HAZWOPER certified with strong knowledge of RCRA and Clean Water Act requirements.',
      mid: 'Environmental Compliance Officer with 5 years enforcing federal and state regulations for industrial facilities. Conducted 200+ inspections annually, issued 50+ enforcement actions, and recovered $500K in penalties. Expert in RCRA, CAA, and CWA requirements.',
      senior: 'Senior Environmental Compliance Officer leading enforcement for petroleum and chemical sectors. Managed 8 inspectors across regional office. Developed training program for new regulations. Expert witness in 15 enforcement cases. $3M+ in penalties recovered.'
    },
    bullets: [
      'Conducted 180+ facility inspections annually ensuring compliance with RCRA, CAA, and CWA',
      'Issued 60 enforcement actions recovering $450K in civil penalties over 3 years',
      'Identified and remediated 5 significant environmental violations preventing community exposure',
      'Developed inspection protocols for new regulations, adopted statewide',
      'Trained 12 new inspectors on regulatory requirements and enforcement procedures',
      'Testified as expert witness in 8 enforcement proceedings and 3 criminal cases'
    ],
    formatTips: [
      'Lead with specific regulatory programs (RCRA, CAA, CWA) to show expertise',
      'Include inspection volume and enforcement action statistics',
      'List certifications (CHMM, HAZWOPER) prominently',
      'Mention penalty recovery amounts to demonstrate effectiveness',
      'Highlight any testimony or expert witness experience'
    ],
    hiringTip: {
      insight: 'I need inspectors who know the regulations cold and can document violations that hold up in court. Show me your enforcement record and any cases youve testified in.',
      elaboration: 'Environmental agencies hire compliance officers who combine regulatory knowledge with documentation skills. Your resume should demonstrate specific regulatory expertise, inspection volume, and successful enforcement outcomes. Expert witness experience indicates your work meets legal standards.'
    },
    interviewQuestions: [
      { q: 'Walk me through how you conduct a RCRA inspection', guidance: 'Describe preparation, facility tour, record review, sampling, and documentation.' },
      { q: 'How do you prioritize inspections across your facility universe?', guidance: 'Explain risk-based targeting using compliance history, community impact, and regulatory priorities.' },
      { q: 'Describe an enforcement case you built from inspection to resolution', guidance: 'Walk through violation discovery, documentation, enforcement recommendation, and outcome.' },
      { q: 'How do you handle a facility that refuses to provide access?', guidance: 'Show knowledge of administrative warrants and legal procedures.' },
      { q: 'What do you do when you find an imminent hazard during inspection?', guidance: 'Demonstrate emergency response procedures and escalation protocols.' }
    ],
    mistakes: [
      'Generic environmental experience without specific regulatory programs',
      'Not listing inspection volume or enforcement statistics',
      'Omitting certifications (CHMM, HAZWOPER) critical to the field',
      'Failing to show penalty recovery or compliance improvements',
      'Leaving out testimony or legal support experience'
    ],
    atsKeywords: ['environmental compliance', 'RCRA', 'Clean Air Act', 'Clean Water Act', 'EPA', 'inspection', 'enforcement', 'HAZWOPER', 'CHMM', 'environmental regulations']
  },
  {
    slug: 'public-affairs-specialist',
    jobTitle: 'Public Affairs Specialist',
    category: 'Government',
    avgSalary: '$65,000',
    salaryRange: '$48,000 - $95,000',
    yearsExperience: '2-5',
    jobGrowth: '8%',
    blsUrl: 'https://www.bls.gov/ooh/media-and-communication/public-relations-specialists.htm',
    cardSummary: 'Share government news and build public trust. Show your media skills and reach.',
    skills: {
      media: ['Press Releases', 'Media Relations', 'Crisis Communication', 'Interviews'],
      digital: ['Social Media Management', 'Website Content', 'Video Production', 'Analytics'],
      outreach: ['Community Engagement', 'Public Meetings', 'Stakeholder Communication', 'Campaign Development']
    },
    certifications: ['APR (Accredited in Public Relations)', 'Social Media Certification', 'Crisis Communication Training'],
    summaries: {
      entry: 'Communications professional with journalism background and 1 year supporting federal agency public affairs. Write press releases, manage social media accounts, and coordinate media inquiries. Strong writing skills and understanding of government protocols.',
      mid: 'Public Affairs Specialist with 4 years managing communications for cabinet-level department. Develop messaging, coordinate with national media, and manage crisis communications. Grew social media engagement by 200% and earned coverage in major outlets.',
      senior: 'Senior Public Affairs Specialist leading communications for major federal program. Manage team of 5, coordinate with White House communications, and serve as agency spokesperson. Led communications for $500M program launch reaching 50M Americans.'
    },
    bullets: [
      'Managed media relations resulting in 200+ positive placements in national and local outlets',
      'Grew agency social media following from 15K to 85K across platforms with 300% engagement increase',
      'Developed crisis communication response for data breach affecting 2M constituents',
      'Produced 50+ videos explaining agency programs, achieving 2M+ views',
      'Coordinated 25 press events including Secretary appearances and program announcements',
      'Supervised 4 public affairs staff and 3 contractors on integrated communications campaigns'
    ],
    formatTips: [
      'Lead with the agency level and scope of communications responsibility',
      'Include media placement metrics and outlet names',
      'List social media growth and engagement improvements',
      'Highlight crisis communication experience',
      'Mention any spokesperson or on-camera experience'
    ],
    hiringTip: {
      insight: 'Government communications requires knowing what you can and cant say. Show me you understand the approval process and can work within it while still getting the message out effectively.',
      elaboration: 'Federal agencies hire public affairs specialists who understand government communication protocols and can produce compelling content within constraints. Your resume should demonstrate media relations success, social media growth, and crisis communication experience. Understanding of clearance processes is assumed.'
    },
    interviewQuestions: [
      { q: 'How do you handle a hostile media inquiry?', guidance: 'Show calm under pressure, bridging techniques, and escalation protocols.' },
      { q: 'Describe a crisis communication situation you managed', guidance: 'Walk through the crisis, your response, messaging development, and outcome.' },
      { q: 'How do you ensure message consistency across platforms and spokespeople?', guidance: 'Discuss talking points development, coordination, and review processes.' },
      { q: 'Tell me about a communications campaign you developed', guidance: 'Describe objectives, strategy, tactics, and measurable results.' },
      { q: 'How do you work within government review processes while meeting deadlines?', guidance: 'Show understanding of clearance procedures and strategies for efficiency.' }
    ],
    mistakes: [
      'Private sector PR experience without acknowledging government differences',
      'Not listing specific agencies or level of government',
      'Omitting media placement metrics or coverage outcomes',
      'Failing to mention crisis communication experience',
      'Generic communications descriptions without government context'
    ],
    atsKeywords: ['public affairs', 'government communications', 'press releases', 'media relations', 'crisis communication', 'social media', 'spokesperson', 'federal communications', 'public information']
  },
  {
    slug: 'emergency-management-coordinator',
    jobTitle: 'Emergency Management Coordinator',
    category: 'Government',
    avgSalary: '$58,000',
    salaryRange: '$42,000 - $82,000',
    yearsExperience: '3-5',
    jobGrowth: '6%',
    blsUrl: 'https://www.bls.gov/ooh/management/emergency-management-directors.htm',
    cardSummary: 'Prepare communities for disasters and lead response. Show your planning and activation experience.',
    skills: {
      planning: ['Emergency Planning', 'Hazard Mitigation', 'Continuity of Operations', 'Exercise Design'],
      response: ['EOC Operations', 'Incident Command', 'Multi-Agency Coordination', 'Resource Management'],
      training: ['FEMA Courses', 'Tabletop Exercises', 'Full-Scale Drills', 'Community Education']
    },
    certifications: ['CEM (Certified Emergency Manager)', 'FEMA Professional Development Series', 'ICS 300/400', 'HSEEP'],
    summaries: {
      entry: 'Emergency management professional with FEMA professional development series completed and experience supporting county EOC operations. Assisted with plan updates, exercise coordination, and public education campaigns. ICS 100/200/700/800 certified.',
      mid: 'Emergency Management Coordinator with 4 years developing plans and coordinating response for county of 150K residents. Led EOC activations for 6 declared emergencies. Designed and executed 15 exercises using HSEEP methodology. Expert in ICS and multi-agency coordination.',
      senior: 'Senior Emergency Manager with 8+ years and CEM certification. Managed emergency preparedness for metropolitan area of 1.2M. Coordinated response to 3 presidentially-declared disasters. Built regional mutual aid network including 25 jurisdictions.'
    },
    bullets: [
      'Developed and maintained emergency operations plan serving population of 180K residents',
      'Coordinated EOC activation for 8 emergencies including 2 presidentially-declared disasters',
      'Designed and executed 20 exercises ranging from tabletop to full-scale using HSEEP methodology',
      'Secured $1.2M in FEMA grants for hazard mitigation and planning projects',
      'Built and maintained relationships with 35 partner agencies for coordinated response',
      'Trained 500+ community members and 200 first responders on emergency preparedness'
    ],
    formatTips: [
      'Lead with CEM certification if you have it—its the gold standard',
      'Include population served and number of emergencies/disasters activated for',
      'List specific FEMA courses and ICS certifications',
      'Highlight grant funding secured for preparedness programs',
      'Mention exercise design experience using HSEEP methodology'
    ],
    hiringTip: {
      insight: 'I need coordinators who have actually activated EOCs, not just written plans. Show me the disasters you worked, the exercises you ran, and the relationships you built with partner agencies.',
      elaboration: 'Emergency management agencies hire coordinators who combine planning skills with operational experience. Your resume should demonstrate both: comprehensive plan development AND actual emergency response. CEM certification, HSEEP exercise experience, and multi-agency coordination are key differentiators.'
    },
    interviewQuestions: [
      { q: 'Walk me through how you would update our emergency operations plan', guidance: 'Describe stakeholder engagement, hazard analysis, capability assessment, and exercise validation.' },
      { q: 'Describe an EOC activation you coordinated', guidance: 'Walk through notification, staffing, operations, demobilization, and after-action review.' },
      { q: 'How do you build relationships with partner agencies before an emergency?', guidance: 'Discuss planning meetings, exercises, mutual aid agreements, and informal relationship building.' },
      { q: 'Tell me about an exercise you designed and evaluated', guidance: 'Describe objectives, scenario development, conduct, and improvement plan.' },
      { q: 'How do you prioritize preparedness activities with limited resources?', guidance: 'Show risk-based approach using hazard analysis and capability gaps.' }
    ],
    mistakes: [
      'Listing FEMA courses without showing how you applied the knowledge',
      'Plan writing experience without EOC activation or exercise experience',
      'Not specifying population served or emergency types managed',
      'Omitting CEM certification if you have it',
      'Generic emergency management descriptions without specific accomplishments'
    ],
    atsKeywords: ['emergency management', 'EOC', 'emergency operations', 'CEM', 'FEMA', 'ICS', 'disaster response', 'HSEEP', 'hazard mitigation', 'emergency planning', 'incident command']
  },
  {
    slug: 'budget-analyst',
    jobTitle: 'Budget Analyst',
    category: 'Government',
    avgSalary: '$78,000',
    salaryRange: '$55,000 - $110,000',
    yearsExperience: '2-5',
    jobGrowth: '5%',
    blsUrl: 'https://www.bls.gov/ooh/business-and-financial/budget-analysts.htm',
    cardSummary: 'Shape government spending decisions. Show your analytical skills and budget impact.',
    skills: {
      analysis: ['Budget Formulation', 'Expenditure Analysis', 'Forecasting', 'Cost-Benefit Analysis'],
      financial: ['Appropriations', 'Fund Accounting', 'Financial Reporting', 'Variance Analysis'],
      systems: ['Budget Systems', 'ERP Software', 'Excel Modeling', 'Data Visualization']
    },
    certifications: ['CGFM (Certified Government Financial Manager)', 'CPA', 'Budget Analyst Certificate'],
    summaries: {
      entry: 'Financial analyst transitioning to government budget work with strong analytical and Excel skills. MPA with concentration in public finance. Internship experience at state budget office analyzing agency spending requests.',
      mid: 'Budget Analyst with 4 years at federal agency developing and monitoring $800M program budget. Prepare congressional justifications, analyze spending trends, and advise leadership on resource allocation. Expert in appropriations law and federal budget process.',
      senior: 'Senior Budget Analyst with 8+ years managing portfolio of $2B+ in federal appropriations. Lead team of 4 analysts. Brief senior leadership and congressional staff on budget issues. Identified $50M in savings through program reviews.'
    },
    bullets: [
      'Developed and monitored $750M annual program budget ensuring compliance with appropriations',
      'Prepared congressional budget justification resulting in 12% funding increase',
      'Identified $25M in cost savings through expenditure analysis and program review',
      'Built financial models forecasting 5-year budget scenarios for strategic planning',
      'Analyzed 50+ budget requests from program offices, recommending approval/modification',
      'Trained 10 program managers on budget formulation and execution requirements'
    ],
    formatTips: [
      'Lead with budget size managed to establish scope',
      'Include CGFM or CPA certification if you have it',
      'List specific budget systems used (MAX, SAP, Oracle)',
      'Highlight cost savings identified or efficiency improvements',
      'Mention appropriations law knowledge for federal positions'
    ],
    hiringTip: {
      insight: 'I need analysts who understand appropriations law and can explain to program managers why they cant move money around however they want. Show me you understand the rules, not just the numbers.',
      elaboration: 'Government budget offices hire analysts who combine financial skills with regulatory knowledge. Your resume should demonstrate both analytical ability (forecasting, modeling) and understanding of government budget rules (appropriations law, fund types). Include budget size managed and any savings or efficiencies identified.'
    },
    interviewQuestions: [
      { q: 'Walk me through the federal budget formulation process', guidance: 'Demonstrate understanding from agency request through appropriation.' },
      { q: 'How do you analyze a budget request from a program office?', guidance: 'Describe your review methodology: historical analysis, workload data, policy compliance.' },
      { q: 'Explain the difference between appropriated funds and working capital funds', guidance: 'Show knowledge of fund types and spending authorities.' },
      { q: 'Describe how you identified cost savings in a program', guidance: 'Walk through your analysis and how you presented recommendations.' },
      { q: 'How do you explain budget constraints to program managers?', guidance: 'Show communication skills and ability to translate complex rules into understandable terms.' }
    ],
    mistakes: [
      'Private sector finance experience without demonstrating government budget knowledge',
      'Not listing budget size or appropriations managed',
      'Omitting CGFM or relevant certifications',
      'Generic financial analysis without government budget process specifics',
      'Failing to show appropriations law or regulatory knowledge'
    ],
    atsKeywords: ['budget analyst', 'budget formulation', 'appropriations', 'federal budget', 'CGFM', 'expenditure analysis', 'congressional justification', 'fund accounting', 'government finance', 'OMB']
  },
  {
    slug: 'court-clerk',
    jobTitle: 'Court Clerk',
    category: 'Government',
    avgSalary: '$42,000',
    salaryRange: '$32,000 - $58,000',
    yearsExperience: '1-3',
    jobGrowth: '3%',
    blsUrl: 'https://www.bls.gov/ooh/office-and-administrative-support/court-reporters.htm',
    cardSummary: 'Keep the courts running smoothly. Show your accuracy and procedural expertise.',
    skills: {
      administrative: ['Case Filing', 'Document Management', 'Calendar Management', 'Record Keeping'],
      courtroom: ['Court Procedures', 'Legal Terminology', 'Jury Coordination', 'Exhibit Management'],
      systems: ['Case Management Systems', 'E-Filing', 'Database Management', 'Public Records']
    },
    certifications: ['Court Clerk Certification', 'Notary Public', 'E-Filing Certification'],
    summaries: {
      entry: 'Administrative professional with paralegal certificate seeking court clerk position. Experience with legal document preparation, filing systems, and client service. Strong attention to detail and ability to work in fast-paced environment.',
      mid: 'Court Clerk with 4 years managing civil division caseload of 2,000+ active cases. Expert in case management systems, e-filing procedures, and courtroom support. Process 100+ filings daily with 99.5% accuracy.',
      senior: 'Senior Court Clerk and Deputy Clerk with 8+ years supporting judicial operations. Supervise team of 6 clerks. Train staff on procedures and system updates. Manage high-profile case files and courtroom technology.'
    },
    bullets: [
      'Processed 120+ daily filings and maintained 2,500+ active case files with 99.8% accuracy',
      'Provided courtroom support for 20+ hearings weekly, managing exhibits and recording proceedings',
      'Trained 8 new clerks on case management system, e-filing procedures, and court protocols',
      'Reduced case backlog by 35% through improved workflow and document tracking',
      'Coordinated jury selection for 50+ trials, managing juror communications and logistics',
      'Responded to 75+ daily public inquiries regarding case status and court procedures'
    ],
    formatTips: [
      'Include case volume and accuracy rates to demonstrate capability',
      'List specific case management systems used (Tyler, Odyssey, etc.)',
      'Mention court level and division (civil, criminal, family, probate)',
      'Highlight any certifications or notary commission',
      'Show courtroom experience separate from administrative duties'
    ],
    hiringTip: {
      insight: 'Accuracy is everything—one misfiled document can derail a case. Show me your volume and your accuracy rate. Court experience trumps general admin experience every time.',
      elaboration: 'Court administrators hire clerks who combine speed with precision. Your resume should demonstrate both filing volume and accuracy metrics. Familiarity with specific case management systems and court procedures differentiates you from general administrative candidates. Courtroom experience is valuable.'
    },
    interviewQuestions: [
      { q: 'How do you ensure accuracy when processing high volumes of filings?', guidance: 'Describe your verification process and quality control methods.' },
      { q: 'Describe your experience with case management systems', guidance: 'List specific systems and functions you performed.' },
      { q: 'How do you handle a difficult attorney or litigant?', guidance: 'Show customer service skills while maintaining professional boundaries.' },
      { q: 'What do you do if you discover a filing error after the fact?', guidance: 'Demonstrate knowledge of correction procedures and transparency.' },
      { q: 'Explain the process for preparing a courtroom for trial', guidance: 'Walk through file preparation, exhibit management, and technology setup.' }
    ],
    mistakes: [
      'Not specifying court level or division worked in',
      'Omitting case volume and accuracy metrics',
      'Generic administrative experience without court-specific procedures',
      'Failing to list case management systems used',
      'Leaving out courtroom support experience'
    ],
    atsKeywords: ['court clerk', 'case management', 'e-filing', 'court procedures', 'legal documents', 'courtroom', 'filing', 'records management', 'judiciary', 'docket']
  },
  {
    slug: 'veterans-service-officer',
    jobTitle: 'Veterans Service Officer',
    category: 'Government',
    avgSalary: '$52,000',
    salaryRange: '$38,000 - $72,000',
    yearsExperience: '2-4',
    jobGrowth: '8%',
    blsUrl: 'https://www.bls.gov/ooh/community-and-social-service/social-workers.htm',
    cardSummary: 'Help veterans access earned benefits. Show your claims expertise and client advocacy.',
    skills: {
      benefits: ['Disability Claims', 'Education Benefits', 'Healthcare Enrollment', 'Pension Applications'],
      advocacy: ['Claims Development', 'Appeals', 'Hearings', 'Representation'],
      knowledge: ['38 CFR', 'VA Processes', 'Military Discharge Types', 'Service-Connected Conditions']
    },
    certifications: ['VA Accreditation', 'NACVSO Training', 'State VSO Certification'],
    summaries: {
      entry: 'Veteran transitioning to VSO role with firsthand knowledge of VA healthcare and benefits systems. Completed NACVSO training and seeking VA accreditation. Passionate about helping fellow veterans navigate complex benefits processes.',
      mid: 'Veterans Service Officer with 4 years representing 500+ veterans before VA. Successfully prosecuted disability claims averaging 85% approval rate. Expert in 38 CFR, claims development, and appeals process.',
      senior: 'Senior VSO with 8+ years and track record of $15M+ in benefits secured for veterans. Supervise team of 4 VSOs. Expert witness in BVA hearings. Train new VSOs statewide on claims development.'
    },
    bullets: [
      'Represented 600+ veterans in disability claims with 88% approval rate vs. 65% national average',
      'Secured $4.2M in retroactive benefits for clients through effective claims development',
      'Reduced average claim processing time by 30% through improved documentation practices',
      'Conducted 200+ appeals including 25 BVA hearings with 75% success rate',
      'Trained 12 new VSOs on claims development, evidence gathering, and VA procedures',
      'Maintained caseload of 150+ active claims while meeting quality and timeliness standards'
    ],
    formatTips: [
      'Include approval rate compared to national average—this is the key metric',
      'List total benefits secured if you track this figure',
      'Mention VA accreditation status and accrediting organization',
      'Highlight appeals experience including BVA hearings',
      'Note military service if applicable—it builds rapport with clients'
    ],
    hiringTip: {
      insight: 'I look at approval rates first. Anyone can file claims—I need VSOs who can develop them properly so they get approved. Show me your win rate and any complex cases you successfully resolved.',
      elaboration: 'Veteran service organizations hire VSOs who can deliver results. Your resume should demonstrate claims success rates, benefits secured, and appeals expertise. VA accreditation is required. Military veteran status is valued but not required—competence in claims development matters most.'
    },
    interviewQuestions: [
      { q: 'Walk me through how you develop a disability claim', guidance: 'Describe evidence gathering, medical records, nexus letters, and submission.' },
      { q: 'How do you handle a claim denial?', guidance: 'Explain your appeals strategy including supplemental claims, HLR, and BVA options.' },
      { q: 'Describe a complex claim you successfully resolved', guidance: 'Walk through the challenges, your strategy, and the outcome.' },
      { q: 'How do you prioritize your caseload?', guidance: 'Discuss triage based on urgency, complexity, and client circumstances.' },
      { q: 'What do you do when a veteran has unrealistic expectations?', guidance: 'Show empathy while providing honest assessment and managing expectations.' }
    ],
    mistakes: [
      'Not listing approval rates or success metrics',
      'Omitting VA accreditation status',
      'Generic case management descriptions without claims-specific experience',
      'Failing to mention appeals experience including hearings',
      'Not quantifying benefits secured or caseload managed'
    ],
    atsKeywords: ['veterans service officer', 'VSO', 'VA claims', 'disability', 'veterans benefits', 'VA accredited', '38 CFR', 'BVA', 'appeals', 'claims development']
  }
];

function generateMDX(job) {
  const today = new Date().toISOString().split('T')[0];
  const skillCategories = Object.entries(job.skills);

  return `---
title: "${job.jobTitle} Resume Example & Writing Guide 2025"
description: "Professional ${job.jobTitle.toLowerCase()} resume example with expert tips. Learn how to highlight your ${Object.values(job.skills).flat().slice(0, 3).join(', ').toLowerCase()} expertise."
slug: "${job.slug}"
date: "${today}"
author: "Sarah Chen"
authorBio: "Career coach with 10+ years helping professionals land their dream jobs."
image: "/images/resume-examples/${job.slug}.svg"
imageAlt: "${job.jobTitle} Resume Example"
readTime: "8 min read"
category: "${job.category}"
cardSummary: "${job.cardSummary}"
jobTitle: "${job.jobTitle}"
avgSalary: "${job.avgSalary}"
salaryRange: "${job.salaryRange}"
yearsExperience: "${job.yearsExperience}"
jobGrowth: "${job.jobGrowth}"
keySkills:
${Object.values(job.skills).flat().slice(0, 6).map(s => `  - "${s}"`).join('\n')}
certifications:
${job.certifications.map(c => `  - "${c}"`).join('\n')}
tags:
  - "${job.jobTitle.toLowerCase()} resume"
  - "${job.jobTitle.toLowerCase()} resume example"
  - "government resume"
  - "resume example"
  - "resume template"
  - "ats resume"
---

## What Makes a Great ${job.jobTitle} Resume?

A ${job.jobTitle.toLowerCase()} resume must demonstrate your understanding of government processes, regulatory frameworks, and public service values. Unlike private sector roles, government positions require specific qualifications, certifications, and demonstrated experience with established protocols.

The most effective ${job.jobTitle.toLowerCase()} resumes lead with relevant certifications and quantifiable outcomes—case volumes, compliance rates, budget sizes, or constituent services delivered.

## Professional Summary Examples

### Entry-Level ${job.jobTitle}
${job.summaries.entry}

### Mid-Level ${job.jobTitle}
${job.summaries.mid}

### Senior ${job.jobTitle}
${job.summaries.senior}

## Salary & Job Outlook

The ${job.jobTitle.toLowerCase()} role offers stable government employment with competitive benefits:

- **Median Salary:** ${job.avgSalary}
- **Salary Range:** ${job.salaryRange}
- **Job Growth:** ${job.jobGrowth} (next decade)

*Sources: [U.S. Bureau of Labor Statistics](${job.blsUrl}), [Glassdoor](https://www.glassdoor.com/Salaries/), [PayScale](https://www.payscale.com/research/US/). Federal salaries follow GS pay scales; state and local compensation varies by jurisdiction.*

## Essential Skills to Highlight

${skillCategories.map(([category, skills]) => `### ${category.charAt(0).toUpperCase() + category.slice(1)} Skills
${skills.map(s => `- ${s}`).join('\n')}`).join('\n\n')}

## Achievement-Focused Bullet Points

Strong ${job.jobTitle.toLowerCase()} bullet points quantify your public service impact:

${job.bullets.map(b => `- ${b}`).join('\n')}

## ${job.jobTitle} Resume Format & Template Tips

${job.formatTips.map((tip, i) => `${i + 1}. **${tip.split('—')[0].split('–')[0]}**`).join('\n')}

## Hiring Manager Tip

> **"${job.hiringTip.insight}"**

${job.hiringTip.elaboration}

## Common ${job.jobTitle} Interview Questions

${job.interviewQuestions.map((q, i) => `### ${i + 1}. ${q.q}
${q.guidance}`).join('\n\n')}

## Common Mistakes to Avoid

${job.mistakes.map((m, i) => `${i + 1}. **${m.split('—')[0]}**`).join('\n')}

## ATS Optimization for ${job.jobTitle} Resumes

Government hiring systems (USA Jobs, NEOGOV) use keyword matching. Include these terms naturally:

**Priority Keywords:** ${job.atsKeywords.slice(0, 5).join(', ')}

**Additional Keywords:** ${job.atsKeywords.slice(5).join(', ')}

For federal positions, mirror language from the job announcement—KSAs and specialized experience statements should use exact terminology.

## Related Resources

- [Resume Writing Guide](/en/blog/resume-writing-guide)
- [Federal Resume Tips](/en/blog/federal-resume-guide)
- [Interview Preparation](/en/blog/interview-preparation)
- [Browse All Templates](/en/templates)
`;
}

async function main() {
  console.log(`\\n📝 Generating ${JOBS.length} Government resume examples (CLAUDE.md compliant)...\\n`);

  let created = 0;
  let skipped = 0;

  for (const job of JOBS) {
    const filePath = path.join(OUTPUT_DIR, `${job.slug}.mdx`);

    if (fs.existsSync(filePath)) {
      console.log(`⏭️  Skipped (exists): ${job.slug}`);
      skipped++;
      continue;
    }

    const content = generateMDX(job);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Created: ${job.slug}`);
    created++;
  }

  console.log(`\\n📊 Summary:`);
  console.log(`   Created: ${created}`);
  console.log(`   Skipped: ${skipped}`);
}

main().catch(console.error);
