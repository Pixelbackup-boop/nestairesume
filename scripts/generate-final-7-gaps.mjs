#!/usr/bin/env node

/**
 * Generate final 7 examples to meet ALL category targets
 * Real Estate: +3, Education: +3, Fitness: +1
 * Following CLAUDE.md guidelines strictly
 */

import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = path.join(process.cwd(), 'frontend/content/resume-examples');

const JOBS = [
  // Real Estate (+3)
  {
    slug: 'mortgage-loan-officer',
    jobTitle: 'Mortgage Loan Officer',
    category: 'Real Estate',
    avgSalary: '$65,000',
    salaryRange: '$40,000 - $150,000',
    yearsExperience: '2-5',
    jobGrowth: '3%',
    blsUrl: 'https://www.bls.gov/ooh/business-and-financial/loan-officers.htm',
    cardSummary: 'Help families achieve homeownership dreams. Show your loan volume and close rates.',
    skills: {
      lending: ['Loan Origination', 'Underwriting Guidelines', 'Rate Locks', 'Loan Structuring'],
      compliance: ['TRID', 'RESPA', 'Fair Lending', 'NMLS Requirements'],
      sales: ['Lead Generation', 'Referral Networks', 'Client Relationships', 'Pipeline Management']
    },
    certifications: ['NMLS License', 'State MLO License', 'FHA/VA Certification'],
    summaries: {
      entry: 'NMLS-licensed loan officer with strong sales background and comprehensive mortgage training. Proficient in Encompass and conventional lending guidelines. Built initial pipeline through realtor relationships and community networking. Committed to guiding first-time homebuyers through the lending process.',
      mid: 'Mortgage Loan Officer with 4 years originating $25M+ annually across conventional, FHA, VA, and jumbo products. Maintain 85% pull-through rate and 21-day average close time. Built referral network of 30+ realtors generating 60% of pipeline. Expert in complex scenarios including self-employed borrowers and investment properties.',
      senior: 'Senior Loan Officer with 10+ years and $500M+ career origination volume. Consistently rank top 5% nationally for retail production. Manage team of 2 loan officers and 3 processors. Specialize in jumbo loans and high-net-worth clients. Speaker at industry conferences on purchase market strategies.'
    },
    bullets: [
      'Originated $32M in mortgage loans annually with 88% pull-through rate',
      'Built referral network of 45 realtors generating 70% of qualified leads',
      'Reduced average close time from 35 to 21 days through proactive communication',
      'Achieved 4.9-star client satisfaction rating with 95% referral rate',
      'Structured creative solutions for self-employed and non-QM borrowers',
      'Ranked #3 in region for purchase volume during competitive market'
    ],
    formatTips: [
      'Lead with annual production volume—this is how loan officers are measured',
      'Include pull-through rate to demonstrate pipeline management',
      'List loan products you specialize in (conventional, FHA, VA, jumbo, non-QM)',
      'Mention your referral network size and lead sources',
      'Highlight average close time if competitive'
    ],
    hiringTip: {
      insight: 'Production volume tells me if you can do the job, but pull-through rate tells me if you can do it profitably. I also want to see your referral network—loan officers who depend only on company leads are replaceable.',
      elaboration: 'Mortgage companies hire loan officers who can self-source business and manage pipeline efficiently. Your resume should lead with annual volume and pull-through rate. Show your referral network (realtors, builders, financial planners) and average close time. In a purchase market, realtor relationships matter more than refi volume.'
    },
    interviewQuestions: [
      { q: 'Walk me through your lead generation strategy', guidance: 'Describe your referral network, marketing efforts, and how you nurture relationships with realtors and other referral partners.' },
      { q: 'How do you structure a loan for a self-employed borrower with irregular income?', guidance: 'Show knowledge of bank statements, asset depletion, and alternative documentation programs.' },
      { q: 'Describe a deal you saved that seemed impossible', guidance: 'Demonstrate problem-solving with a specific scenario—rate lock extensions, appraisal issues, or credit problems.' },
      { q: 'How do you manage your pipeline during a busy period?', guidance: 'Discuss prioritization, processor relationships, and communication systems.' },
      { q: 'What do you do when rates spike mid-transaction?', guidance: 'Show how you counsel borrowers and manage expectations while maintaining the deal.' }
    ],
    mistakes: [
      'Not listing annual production volume—this is the primary metric',
      'Omitting pull-through rate which indicates pipeline management skill',
      'Failing to specify loan products you originate',
      'Generic sales experience without mortgage-specific knowledge',
      'Not mentioning NMLS license number or state licenses'
    ],
    atsKeywords: ['mortgage loan officer', 'MLO', 'loan origination', 'NMLS', 'conventional', 'FHA', 'VA', 'jumbo', 'Encompass', 'underwriting', 'pull-through rate']
  },
  {
    slug: 'real-estate-investor',
    jobTitle: 'Real Estate Investor',
    category: 'Real Estate',
    avgSalary: '$85,000',
    salaryRange: '$45,000 - $250,000',
    yearsExperience: '3-7',
    jobGrowth: '5%',
    blsUrl: 'https://www.bls.gov/ooh/sales/real-estate-brokers-and-sales-agents.htm',
    cardSummary: 'Build wealth through property investments. Show your deal flow and portfolio returns.',
    skills: {
      analysis: ['Deal Analysis', 'Market Research', 'Pro Forma Modeling', 'Comparable Analysis'],
      acquisition: ['Property Sourcing', 'Due Diligence', 'Negotiation', 'Contract Review'],
      management: ['Asset Management', 'Renovation Oversight', 'Property Management', 'Exit Strategy']
    },
    certifications: ['Real Estate License', 'CCIM', 'CPM'],
    summaries: {
      entry: 'Real estate investor with 2 years building residential rental portfolio. Acquired 5 single-family properties generating $4K monthly cash flow. Proficient in deal analysis, contractor management, and property management. Seeking opportunities to scale portfolio or join investment firm.',
      mid: 'Real estate investor with 5 years and 25-unit portfolio across single-family, small multifamily, and BRRRR projects. Achieved 18% average cash-on-cash return. Expert in off-market acquisition, value-add renovation, and creative financing. Raised $500K from private investors.',
      senior: 'Senior real estate investor and fund manager with 8+ years and $15M portfolio generating 22% IRR. Manage 75 units across multifamily and commercial properties. Raised $3M in investor capital. Specialize in value-add multifamily and syndication structuring.'
    },
    bullets: [
      'Built 35-unit rental portfolio generating $18K monthly net cash flow',
      'Achieved 24% average cash-on-cash return across 12 BRRRR projects',
      'Raised $1.2M from private investors for multifamily syndication',
      'Completed 8 value-add renovations averaging $40K profit per flip',
      'Sourced 80% of deals off-market through direct mail and networking',
      'Grew portfolio from 0 to 35 units in 5 years while maintaining W-2 job'
    ],
    formatTips: [
      'Lead with portfolio size and returns—this establishes credibility',
      'Include specific strategies (BRRRR, syndication, fix-and-flip, buy-and-hold)',
      'Mention capital raised if you work with investors',
      'List property types and markets you specialize in',
      'Highlight any systems or processes youve built'
    ],
    hiringTip: {
      insight: 'Returns matter, but I also want to see your deal flow and sourcing ability. Anyone can buy properties on the MLS—show me you can find off-market deals and add value.',
      elaboration: 'Investment firms and syndicators hire for deal sourcing ability and analytical rigor. Your resume should demonstrate both returns achieved and how you find deals. Include capital raised if applicable—this shows you can bring investor money to opportunities. Specific strategies and property types help match you to the right role.'
    },
    interviewQuestions: [
      { q: 'Walk me through your underwriting process for a multifamily deal', guidance: 'Describe your pro forma assumptions, cap rate selection, expense ratios, and exit strategy.' },
      { q: 'How do you source off-market deals?', guidance: 'Detail your marketing channels: direct mail, driving for dollars, wholesaler relationships, networking.' },
      { q: 'Describe a deal that went wrong and what you learned', guidance: 'Show self-awareness and how you mitigated losses or turned it around.' },
      { q: 'How do you evaluate a market before investing?', guidance: 'Discuss population growth, job market, landlord-tenant laws, and supply pipeline.' },
      { q: 'Tell me about your experience raising capital', guidance: 'Explain investor relationships, deal structuring, and communication practices.' }
    ],
    mistakes: [
      'Not quantifying portfolio size or returns achieved',
      'Omitting specific investment strategies used',
      'Failing to mention deal sourcing methods',
      'Generic real estate experience without investment focus',
      'Not including capital raised or investor relationships if applicable'
    ],
    atsKeywords: ['real estate investor', 'portfolio management', 'BRRRR', 'syndication', 'multifamily', 'cash-on-cash', 'cap rate', 'value-add', 'rental property', 'deal analysis']
  },
  {
    slug: 'real-estate-assistant',
    jobTitle: 'Real Estate Assistant',
    category: 'Real Estate',
    avgSalary: '$42,000',
    salaryRange: '$32,000 - $58,000',
    yearsExperience: '0-2',
    jobGrowth: '6%',
    blsUrl: 'https://www.bls.gov/ooh/office-and-administrative-support/secretaries-and-administrative-assistants.htm',
    cardSummary: 'Keep top agents organized and clients happy. Show your transaction coordination skills.',
    skills: {
      administrative: ['Calendar Management', 'Transaction Coordination', 'Document Preparation', 'Database Management'],
      marketing: ['Listing Marketing', 'Social Media', 'Open House Coordination', 'Photography Scheduling'],
      communication: ['Client Communication', 'Vendor Coordination', 'Follow-up Systems', 'CRM Management']
    },
    certifications: ['Real Estate License (optional)', 'Transaction Coordinator Certification', 'Notary Public'],
    summaries: {
      entry: 'Organized administrative professional transitioning to real estate support role. Experienced in calendar management, client communication, and document preparation. Proficient in Google Workspace and CRM systems. Detail-oriented with ability to manage multiple priorities.',
      mid: 'Real Estate Assistant supporting top-producing agent with $30M annual volume. Manage 40+ transactions annually from contract to close. Expert in Follow Up Boss, DocuSign, and MLS systems. Known for client communication that enhances agent brand.',
      senior: 'Senior Real Estate Assistant and Transaction Coordinator supporting 3-agent team with $75M combined volume. Manage 100+ annual transactions with zero missed deadlines. Train new assistants and develop systems adopted team-wide. Licensed agent available for showing coverage.'
    },
    bullets: [
      'Coordinated 50+ annual transactions totaling $40M in sales volume',
      'Maintained CRM database of 2,500+ contacts with automated follow-up campaigns',
      'Reduced days-on-market by 20% through improved listing launch coordination',
      'Managed social media presence growing Instagram following from 500 to 5K',
      'Achieved zero missed contract deadlines across 150+ transactions',
      'Developed transaction checklist system adopted by entire brokerage'
    ],
    formatTips: [
      'Include transaction volume and sales dollar amounts to show scale',
      'List specific real estate software (MLS, Follow Up Boss, DocuSign, etc.)',
      'Mention if you are licensed or willing to obtain license',
      'Highlight systems you developed or improved',
      'Show both administrative and marketing capabilities'
    ],
    hiringTip: {
      insight: 'I need someone who can run my business while I focus on clients. Show me your transaction volume, the systems you use, and that you understand the real estate timeline. Bonus points if youre licensed and can cover showings.',
      elaboration: 'Top agents hire assistants who can manage all non-client-facing tasks independently. Your resume should demonstrate transaction coordination experience, software proficiency, and systems thinking. License status matters—many agents want assistants who can legally show property or host open houses.'
    },
    interviewQuestions: [
      { q: 'Walk me through how you manage a transaction from contract to close', guidance: 'Describe your checklist, deadline tracking, and communication with all parties.' },
      { q: 'How do you prioritize when an agent has multiple active transactions?', guidance: 'Show organizational skills and understanding of critical path items.' },
      { q: 'What CRM and transaction management systems have you used?', guidance: 'List specific platforms and describe how you leverage their features.' },
      { q: 'How do you handle an unhappy client when the agent is unavailable?', guidance: 'Demonstrate client service skills and judgment about when to escalate.' },
      { q: 'Describe your experience with listing marketing', guidance: 'Cover photography coordination, MLS entry, social media, and print materials.' }
    ],
    mistakes: [
      'Generic admin experience without real estate context',
      'Not listing transaction volume or sales amounts',
      'Omitting real estate software proficiency',
      'Failing to mention license status',
      'Not showing both transaction coordination and marketing skills'
    ],
    atsKeywords: ['real estate assistant', 'transaction coordinator', 'MLS', 'CRM', 'DocuSign', 'Follow Up Boss', 'listing coordination', 'administrative assistant', 'real estate admin']
  },

  // Education (+3)
  {
    slug: 'college-admissions-counselor',
    jobTitle: 'College Admissions Counselor',
    category: 'Education',
    avgSalary: '$48,000',
    salaryRange: '$38,000 - $68,000',
    yearsExperience: '1-4',
    jobGrowth: '8%',
    blsUrl: 'https://www.bls.gov/ooh/education-training-and-library/school-and-career-counselors.htm',
    cardSummary: 'Guide students toward their college dreams. Show your application success rates.',
    skills: {
      counseling: ['College Selection', 'Application Review', 'Essay Coaching', 'Financial Aid Guidance'],
      recruitment: ['Territory Management', 'High School Visits', 'Information Sessions', 'Yield Events'],
      evaluation: ['Application Review', 'Holistic Assessment', 'Committee Presentation', 'Scholarship Selection']
    },
    certifications: ['Masters in Counseling', 'NACAC Membership', 'College Counseling Certificate'],
    summaries: {
      entry: 'Recent masters graduate with practicum experience in college counseling. Assisted students with college selection, application essays, and financial aid forms. Understanding of holistic admissions and demonstrated commitment to educational equity.',
      mid: 'College Admissions Counselor with 3 years reviewing 1,500+ applications annually. Manage recruitment territory of 8 states representing 200+ high schools. Specialize in first-generation student outreach and scholarship program coordination.',
      senior: 'Senior Admissions Counselor with 7+ years and leadership in application review committee. Read 2,000+ applications annually and train new counselors on evaluation criteria. Developed first-gen student success program increasing enrollment 25%. Expert witness on holistic admissions.'
    },
    bullets: [
      'Reviewed 1,800+ applications annually using holistic evaluation criteria',
      'Managed recruitment territory yielding 15% increase in qualified applicants',
      'Conducted 50+ high school visits and information sessions reaching 3,000 students',
      'Developed first-generation student initiative increasing enrollment by 20%',
      'Trained 8 new admissions counselors on application review and territory management',
      'Achieved 35% yield rate on admitted students, exceeding institutional goal'
    ],
    formatTips: [
      'Include application review volume to demonstrate experience',
      'List recruitment territory and results if applicable',
      'Mention special populations you work with (first-gen, international, athletes)',
      'Highlight any program development or leadership roles',
      'Note committee experience and training responsibilities'
    ],
    hiringTip: {
      insight: 'I need counselors who can read applications quickly and accurately while also representing our institution well on the road. Show me your territory results and any programs you developed.',
      elaboration: 'Admissions offices hire counselors who can balance high-volume application reading with recruitment effectiveness. Your resume should include applications reviewed, territory performance, and any yield-improving initiatives. First-gen outreach experience is increasingly valued. Leadership in committees or training differentiates senior candidates.'
    },
    interviewQuestions: [
      { q: 'How do you evaluate an application holistically?', guidance: 'Describe your process for considering academics, activities, essays, and context.' },
      { q: 'Tell me about a student you advocated for in committee', guidance: 'Show your ability to identify potential and present compelling cases.' },
      { q: 'How do you approach recruitment in an underperforming territory?', guidance: 'Discuss relationship building, school counselor outreach, and event strategy.' },
      { q: 'Describe your philosophy on educational equity in admissions', guidance: 'Show thoughtfulness about access while understanding institutional needs.' },
      { q: 'How do you handle a family unhappy with an admissions decision?', guidance: 'Demonstrate empathy and professionalism while maintaining institutional position.' }
    ],
    mistakes: [
      'Not listing application review volume',
      'Omitting recruitment territory and results',
      'Generic counseling experience without admissions context',
      'Failing to mention committee or leadership roles',
      'Not showing commitment to student access and equity'
    ],
    atsKeywords: ['admissions counselor', 'college admissions', 'application review', 'recruitment', 'yield', 'holistic admissions', 'NACAC', 'enrollment management', 'financial aid']
  },
  {
    slug: 'instructional-coach',
    jobTitle: 'Instructional Coach',
    category: 'Education',
    avgSalary: '$62,000',
    salaryRange: '$48,000 - $82,000',
    yearsExperience: '5-8',
    jobGrowth: '6%',
    blsUrl: 'https://www.bls.gov/ooh/education-training-and-library/instructional-coordinators.htm',
    cardSummary: 'Transform teaching practices school-wide. Show your teacher growth and student outcomes.',
    skills: {
      coaching: ['Observation Cycles', 'Feedback Delivery', 'Goal Setting', 'Modeling Lessons'],
      curriculum: ['Data Analysis', 'Assessment Design', 'Curriculum Mapping', 'Differentiation Strategies'],
      leadership: ['Professional Development', 'PLC Facilitation', 'Change Management', 'Adult Learning Theory']
    },
    certifications: ['Teaching License', 'Instructional Coaching Certificate', 'National Board Certification'],
    summaries: {
      entry: 'Teacher leader transitioning to instructional coaching after 6 years of classroom excellence. Led grade-level PLCs and mentored 5 new teachers. Expert in data-driven instruction and differentiation. Completed instructional coaching certification program.',
      mid: 'Instructional Coach with 3 years supporting 30+ teachers in literacy and math instruction. Implemented coaching cycles resulting in 15% increase in student proficiency. Expert in observation/feedback protocols and adult learning theory.',
      senior: 'Senior Instructional Coach leading school-wide improvement initiatives. Built coaching program from startup serving 50 teachers. Achieved school-wide 20-point growth in state assessment scores. Train new coaches district-wide and present at state conferences.'
    },
    bullets: [
      'Coached 35 teachers through observation cycles resulting in 18% student growth',
      'Facilitated weekly PLCs focused on data analysis and instructional planning',
      'Developed new teacher induction program reducing first-year attrition by 40%',
      'Modeled 100+ lessons demonstrating high-impact instructional strategies',
      'Led school-wide literacy initiative improving reading proficiency from 55% to 72%',
      'Trained 12 new instructional coaches on observation and feedback protocols'
    ],
    formatTips: [
      'Lead with teacher impact and student outcome improvements',
      'Include number of teachers coached and coaching cycle frequency',
      'Highlight specific instructional focus areas (literacy, math, ELL, etc.)',
      'Mention professional development sessions designed and delivered',
      'Show your own classroom teaching credentials'
    ],
    hiringTip: {
      insight: 'I hire coaches who can build relationships with resistant teachers while still driving results. Show me student data that improved because of your coaching, not just activities you led.',
      elaboration: 'School leaders hire instructional coaches who combine relationship skills with accountability for results. Your resume must demonstrate measurable student growth linked to your coaching. Include the number of teachers supported, coaching structures used, and any school-wide improvements. Strong classroom teaching experience is a prerequisite.'
    },
    interviewQuestions: [
      { q: 'How do you build trust with a resistant teacher?', guidance: 'Describe your approach to relationship building before pushing for change.' },
      { q: 'Walk me through your coaching cycle process', guidance: 'Explain pre-conference, observation, data collection, and feedback delivery.' },
      { q: 'How do you use data in your coaching conversations?', guidance: 'Show how you help teachers analyze student work and assessments.' },
      { q: 'Describe a time your coaching led to measurable student improvement', guidance: 'Provide specific data and explain the coaching actions that drove change.' },
      { q: 'How do you balance coaching individuals with school-wide initiatives?', guidance: 'Discuss prioritization and connecting individual coaching to broader goals.' }
    ],
    mistakes: [
      'Not including student outcome data linked to coaching',
      'Omitting number of teachers coached and frequency',
      'Failing to demonstrate strong classroom teaching background',
      'Generic PD facilitation without coaching-specific skills',
      'Not showing relationship-building alongside accountability'
    ],
    atsKeywords: ['instructional coach', 'coaching cycle', 'professional development', 'PLC', 'data-driven instruction', 'observation', 'feedback', 'teacher development', 'curriculum']
  },
  {
    slug: 'academic-advisor',
    jobTitle: 'Academic Advisor',
    category: 'Education',
    avgSalary: '$48,000',
    salaryRange: '$38,000 - $62,000',
    yearsExperience: '1-4',
    jobGrowth: '7%',
    blsUrl: 'https://www.bls.gov/ooh/education-training-and-library/school-and-career-counselors.htm',
    cardSummary: 'Guide students toward degree completion. Show your retention rates and advising load.',
    skills: {
      advising: ['Degree Planning', 'Course Selection', 'Transfer Evaluation', 'Career Exploration'],
      retention: ['Early Alert Systems', 'At-Risk Intervention', 'Academic Probation Support', 'Graduation Audits'],
      systems: ['Student Information Systems', 'Degree Audit Tools', 'CRM', 'Scheduling Software']
    },
    certifications: ['Masters in Higher Education', 'NACADA Membership', 'Advising Certificate'],
    summaries: {
      entry: 'Academic advisor with masters in higher education and graduate assistantship in advising office. Assisted 100+ students with course selection, degree planning, and registration. Familiar with Banner, DegreeWorks, and FERPA requirements.',
      mid: 'Academic Advisor managing caseload of 350 students in business college. Achieved 92% fall-to-fall retention rate, exceeding institutional goal. Expert in degree audits, transfer articulation, and academic policy. Specialize in first-generation student success.',
      senior: 'Senior Academic Advisor and team lead overseeing advising services for 1,500 students. Developed peer advising program improving retention by 8 percentage points. Train new advisors and present at NACADA conferences. Serve on university retention committee.'
    },
    bullets: [
      'Managed advising caseload of 400 students maintaining 91% retention rate',
      'Conducted 1,200+ advising appointments annually covering course selection and career planning',
      'Implemented early alert intervention system reducing probation rates by 25%',
      'Developed transfer student orientation improving first-semester success by 15%',
      'Trained 6 new advisors on degree audit systems and advising best practices',
      'Increased four-year graduation rate in assigned cohort from 48% to 57%'
    ],
    formatTips: [
      'Include caseload size and retention/graduation rates',
      'List student information systems you use (Banner, PeopleSoft, DegreeWorks)',
      'Mention special populations advised (first-gen, transfer, athletes, honors)',
      'Highlight any programs developed or leadership roles',
      'Show NACADA involvement or professional development'
    ],
    hiringTip: {
      insight: 'Retention numbers matter more than appointment counts. Show me your retention rate versus the institutional average and any initiatives you led to improve student success.',
      elaboration: 'Higher education institutions hire advisors who can demonstrate impact on retention and graduation. Your resume should feature caseload size, retention rates, and any programs you developed. Technical skills with student systems are expected. NACADA involvement signals commitment to the profession.'
    },
    interviewQuestions: [
      { q: 'How do you manage a large advising caseload effectively?', guidance: 'Discuss prioritization, group advising, technology tools, and outreach strategies.' },
      { q: 'Describe your approach to advising a student on academic probation', guidance: 'Show your intervention process, resource referrals, and follow-up systems.' },
      { q: 'How do you stay current on curriculum changes and policies?', guidance: 'Discuss faculty relationships, committee involvement, and catalog review.' },
      { q: 'Tell me about a student success story from your advising', guidance: 'Share a specific student interaction and the outcomes achieved.' },
      { q: 'How do you handle an advisee who disagrees with your recommendation?', guidance: 'Show respect for student autonomy while ensuring informed decision-making.' }
    ],
    mistakes: [
      'Not including caseload size and retention outcomes',
      'Omitting student information system experience',
      'Generic counseling experience without higher ed context',
      'Failing to mention special populations or program development',
      'Not demonstrating data-informed advising approach'
    ],
    atsKeywords: ['academic advisor', 'advising', 'retention', 'degree audit', 'Banner', 'DegreeWorks', 'student success', 'NACADA', 'higher education', 'graduation rate']
  },

  // Fitness (+1)
  {
    slug: 'sports-coach',
    jobTitle: 'Sports Coach',
    category: 'Fitness',
    avgSalary: '$45,000',
    salaryRange: '$28,000 - $85,000',
    yearsExperience: '2-6',
    jobGrowth: '12%',
    blsUrl: 'https://www.bls.gov/ooh/entertainment-and-sports/coaches-and-scouts.htm',
    cardSummary: 'Develop athletes and winning teams. Show your record and player development.',
    skills: {
      coaching: ['Practice Planning', 'Game Strategy', 'Player Development', 'Video Analysis'],
      leadership: ['Team Building', 'Parent Communication', 'Recruiting', 'Budget Management'],
      technical: ['Sport-Specific Skills', 'Strength & Conditioning', 'Injury Prevention', 'Performance Analytics']
    },
    certifications: ['Sport-Specific Coaching Certification', 'CPR/First Aid', 'NFHS Certification', 'Safesport Certified'],
    summaries: {
      entry: 'Former collegiate athlete transitioning to coaching with assistant coach experience. Led position group training and managed game-day operations. NFHS certified with strong knowledge of player development and recruiting. Committed to building character through athletics.',
      mid: 'Head Coach with 4 years building competitive high school basketball program. Improved team record from 8-18 to 22-8, reaching regional finals. Developed 8 college-bound athletes. Known for practice efficiency and player development focus.',
      senior: 'Senior Coach with 10+ years and state championship experience. Built program from ground level to perennial contender. Developed 25+ college athletes including 3 Division I scholarships. Serve on state coaches association board and mentor first-year coaches.'
    },
    bullets: [
      'Improved team record from 5-20 to 18-7 over 3 seasons, winning conference championship',
      'Developed 12 student-athletes who earned college athletic scholarships',
      'Designed practice curriculum reducing injuries by 35% while improving performance',
      'Recruited 15 athletes to program, building roster depth and team culture',
      'Increased team GPA from 2.8 to 3.4 through academic monitoring program',
      'Raised $50K annually through booster club and community partnerships'
    ],
    formatTips: [
      'Lead with win-loss record improvement to demonstrate program building',
      'Include athletes developed who went on to play collegiately',
      'List sport-specific certifications and coaching education',
      'Mention recruiting success and program growth metrics',
      'Highlight character development and academic success initiatives'
    ],
    hiringTip: {
      insight: 'Wins matter, but I also look at who you developed. Show me players who improved under your coaching and went on to the next level. I also need to know you can handle parents and run a clean program.',
      elaboration: 'Athletic directors hire coaches who build programs, not just win games. Your resume should demonstrate win-loss improvement, player development (college placements), and program building (fundraising, recruiting, culture). Parent communication skills and compliance with athletic rules are assumed but important.'
    },
    interviewQuestions: [
      { q: 'How do you develop practice plans that maximize limited time?', guidance: 'Describe your planning process, priorities, and how you track progress.' },
      { q: 'Tell me about a player you developed significantly', guidance: 'Share specific skill development and how the athlete progressed under your coaching.' },
      { q: 'How do you handle a parent who disagrees with playing time decisions?', guidance: 'Show professionalism, transparency about evaluation criteria, and boundary setting.' },
      { q: 'Describe your approach to building team culture', guidance: 'Discuss values, accountability systems, and how you create buy-in.' },
      { q: 'How do you balance winning with player development?', guidance: 'Show your philosophy on competition versus growth, especially at youth levels.' }
    ],
    mistakes: [
      'Not including win-loss record or improvement trajectory',
      'Omitting player development and college placement statistics',
      'Generic sports experience without coaching-specific accomplishments',
      'Failing to mention certifications and coaching education',
      'Not showing program building beyond wins (fundraising, recruiting, culture)'
    ],
    atsKeywords: ['sports coach', 'head coach', 'assistant coach', 'player development', 'recruiting', 'practice planning', 'game strategy', 'athletics', 'NFHS', 'varsity']
  }
];

function generateMDX(job) {
  const today = new Date().toISOString().split('T')[0];
  const skillCategories = Object.entries(job.skills);

  return `---
title: "${job.jobTitle} Resume Example & Writing Guide 2025"
description: "Professional ${job.jobTitle.toLowerCase()} resume example with expert tips. Learn how to showcase your ${Object.values(job.skills).flat().slice(0, 3).join(', ').toLowerCase()} expertise."
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
  - "${job.category.toLowerCase()} resume"
  - "resume example"
  - "resume template"
  - "ats resume"
---

## What Makes a Great ${job.jobTitle} Resume?

A ${job.jobTitle.toLowerCase()} resume requires demonstrating industry-specific expertise alongside measurable outcomes. Hiring managers in this field scan for candidates who understand the unique demands of the role and can show quantifiable impact.

The most effective ${job.jobTitle.toLowerCase()} resumes lead with relevant credentials and showcase specific achievements: metrics that prove you can deliver results in this specialized environment.

## Professional Summary Examples

### Entry-Level ${job.jobTitle}
${job.summaries.entry}

### Mid-Level ${job.jobTitle}
${job.summaries.mid}

### Senior ${job.jobTitle}
${job.summaries.senior}

## Salary & Job Outlook

The ${job.jobTitle.toLowerCase()} field offers varied compensation based on performance and specialization:

- **Median Salary:** ${job.avgSalary}
- **Salary Range:** ${job.salaryRange}
- **Job Growth:** ${job.jobGrowth} (next decade)

*Sources: [U.S. Bureau of Labor Statistics](${job.blsUrl}), [Glassdoor](https://www.glassdoor.com/Salaries/), [PayScale](https://www.payscale.com/research/US/). Actual compensation varies by location, experience, employer type, and performance.*

## Essential Skills to Highlight

${skillCategories.map(([category, skills]) => `### ${category.charAt(0).toUpperCase() + category.slice(1)} Skills
${skills.map(s => `- ${s}`).join('\n')}`).join('\n\n')}

## Achievement-Focused Bullet Points

Strong ${job.jobTitle.toLowerCase()} bullet points quantify your specific impact:

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

Include these industry-specific keywords naturally throughout your resume to pass Applicant Tracking Systems:

**Priority Keywords:** ${job.atsKeywords.slice(0, 5).join(', ')}

**Additional Keywords:** ${job.atsKeywords.slice(5).join(', ')}

Mirror language from job postings when possible to improve ATS matching.

## Related Resources

- [Resume Writing Guide](/en/blog/resume-writing-guide)
- [Cover Letter Tips](/en/blog/cover-letter-tips)
- [Interview Preparation](/en/blog/interview-preparation)
- [Browse All Templates](/en/templates)
`;
}

async function main() {
  console.log(`\\n📝 Generating final ${JOBS.length} examples to meet ALL category targets...\\n`);

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
