#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = path.join(process.cwd(), 'frontend/content/resume-examples');

// Final batch to reach 500+ examples
const JOBS = [
  // Customer Service (+7)
  {
    slug: 'call-center-representative',
    jobTitle: 'Call Center Representative',
    category: 'Customer Service',
    avgSalary: '$36,000',
    salaryRange: '$28,000 - $48,000',
    yearsExperience: '0-2',
    jobGrowth: '2%',
    keySkills: ['Phone Support', 'CRM Software', 'Problem Resolution', 'Multi-tasking', 'Data Entry'],
    certifications: ['Customer Service Certification', 'Call Center Management'],
    cardSummary: 'Handle high call volumes with ease. Show metrics that prove you resolve issues fast.',
    hiringTip: 'Call center managers track average handle time and first-call resolution rates religiously. Your resume should include these metrics prominently.',
    interviewQuestions: [
      { q: 'How do you handle an angry caller?', guidance: 'Describe de-escalation techniques and staying calm under pressure' },
      { q: 'What CRM systems have you used?', guidance: 'List specific platforms and explain proficiency level' },
      { q: 'How do you meet call quotas while maintaining quality?', guidance: 'Balance efficiency with customer satisfaction' },
      { q: 'Describe a time you turned a complaint into a positive outcome', guidance: 'Show problem-solving and empathy' },
      { q: 'How do you handle repetitive work?', guidance: 'Demonstrate mental stamina and consistency' }
    ],
    atsKeywords: ['call center', 'customer support', 'CRM', 'phone support', 'first call resolution', 'average handle time', 'inbound calls', 'outbound calls']
  },
  {
    slug: 'customer-success-manager',
    jobTitle: 'Customer Success Manager',
    category: 'Customer Service',
    avgSalary: '$72,000',
    salaryRange: '$55,000 - $105,000',
    yearsExperience: '3-5',
    jobGrowth: '8%',
    keySkills: ['Account Management', 'Retention Strategies', 'Upselling', 'Product Training', 'Analytics'],
    certifications: ['Customer Success Manager Certification', 'SaaS Fundamentals'],
    cardSummary: 'Drive retention and expansion revenue. Show how you turn customers into advocates.',
    hiringTip: 'CSM roles live and die by retention metrics. Include your Net Revenue Retention, churn reduction percentages, and expansion revenue numbers.',
    interviewQuestions: [
      { q: 'How do you identify at-risk accounts?', guidance: 'Describe early warning indicators and proactive outreach' },
      { q: 'Walk me through your onboarding process', guidance: 'Show structured approach to time-to-value' },
      { q: 'How do you prioritize your book of business?', guidance: 'Explain segmentation and resource allocation' },
      { q: 'Describe a time you saved a churning customer', guidance: 'Show problem-solving and relationship skills' },
      { q: 'How do you drive product adoption?', guidance: 'Discuss training, check-ins, and success metrics' }
    ],
    atsKeywords: ['customer success', 'retention', 'churn', 'NRR', 'onboarding', 'account management', 'expansion revenue', 'QBR', 'health score']
  },
  {
    slug: 'technical-support-specialist',
    jobTitle: 'Technical Support Specialist',
    category: 'Customer Service',
    avgSalary: '$52,000',
    salaryRange: '$38,000 - $72,000',
    yearsExperience: '1-3',
    jobGrowth: '5%',
    keySkills: ['Troubleshooting', 'Ticketing Systems', 'Remote Support', 'Technical Documentation', 'Hardware/Software Knowledge'],
    certifications: ['CompTIA A+', 'ITIL Foundation', 'HDI Support Center Analyst'],
    cardSummary: 'Solve tech problems that stump others. Show your troubleshooting wins and ticket metrics.',
    hiringTip: 'Technical support managers want to see ticket resolution rates and customer satisfaction scores. Include specific technologies you support.',
    interviewQuestions: [
      { q: 'Walk me through your troubleshooting methodology', guidance: 'Show systematic approach to problem isolation' },
      { q: 'How do you explain technical concepts to non-technical users?', guidance: 'Demonstrate communication adaptability' },
      { q: 'Describe a complex issue you resolved', guidance: 'Show technical depth and persistence' },
      { q: 'How do you stay current with technology?', guidance: 'Discuss learning habits and certifications' },
      { q: 'How do you handle escalations?', guidance: 'Show when to solve vs. when to escalate' }
    ],
    atsKeywords: ['technical support', 'troubleshooting', 'helpdesk', 'ticketing', 'IT support', 'remote support', 'Zendesk', 'ServiceNow', 'tier 2']
  },
  {
    slug: 'client-relations-manager',
    jobTitle: 'Client Relations Manager',
    category: 'Customer Service',
    avgSalary: '$65,000',
    salaryRange: '$48,000 - $88,000',
    yearsExperience: '3-5',
    jobGrowth: '6%',
    keySkills: ['Relationship Building', 'Contract Negotiation', 'Conflict Resolution', 'Strategic Planning', 'Cross-functional Collaboration'],
    certifications: ['Certified Client Service Professional', 'Project Management Professional'],
    cardSummary: 'Build relationships that drive revenue. Show how you turn clients into long-term partners.',
    hiringTip: 'Client relations roles require demonstrating both soft skills and business impact. Include client retention rates and contract renewal percentages.',
    interviewQuestions: [
      { q: 'How do you build trust with a new client?', guidance: 'Show relationship development process' },
      { q: 'Describe a difficult client situation you navigated', guidance: 'Demonstrate diplomacy and problem-solving' },
      { q: 'How do you balance client demands with company capabilities?', guidance: 'Show negotiation and expectation management' },
      { q: 'How do you measure client satisfaction?', guidance: 'Discuss metrics and feedback mechanisms' },
      { q: 'How do you identify upsell opportunities?', guidance: 'Balance service with revenue generation' }
    ],
    atsKeywords: ['client relations', 'account management', 'client retention', 'relationship management', 'contract renewal', 'stakeholder management']
  },
  {
    slug: 'customer-experience-specialist',
    jobTitle: 'Customer Experience Specialist',
    category: 'Customer Service',
    avgSalary: '$48,000',
    salaryRange: '$35,000 - $65,000',
    yearsExperience: '1-3',
    jobGrowth: '7%',
    keySkills: ['Journey Mapping', 'Voice of Customer', 'Process Improvement', 'Data Analysis', 'Cross-channel Support'],
    certifications: ['CX Professional Certification', 'Six Sigma Green Belt'],
    cardSummary: 'Design experiences customers love. Show how you improve satisfaction scores.',
    hiringTip: 'CX specialists need to show they can analyze customer feedback and drive measurable improvements. Include NPS improvements and process optimization results.',
    interviewQuestions: [
      { q: 'How do you gather customer feedback?', guidance: 'Discuss multiple channels and analysis methods' },
      { q: 'Walk me through a journey mapping exercise', guidance: 'Show structured approach to CX analysis' },
      { q: 'How do you prioritize CX improvements?', guidance: 'Balance impact with feasibility' },
      { q: 'Describe a process you improved', guidance: 'Show data-driven decision making' },
      { q: 'How do you get buy-in for CX initiatives?', guidance: 'Demonstrate stakeholder management' }
    ],
    atsKeywords: ['customer experience', 'CX', 'journey mapping', 'NPS', 'CSAT', 'voice of customer', 'VoC', 'process improvement']
  },
  {
    slug: 'help-desk-technician',
    jobTitle: 'Help Desk Technician',
    category: 'Customer Service',
    avgSalary: '$45,000',
    salaryRange: '$32,000 - $58,000',
    yearsExperience: '0-2',
    jobGrowth: '4%',
    keySkills: ['Ticket Management', 'Windows/Mac Support', 'Network Troubleshooting', 'Password Resets', 'Software Installation'],
    certifications: ['CompTIA A+', 'Microsoft 365 Certified', 'Google IT Support'],
    cardSummary: 'Be the first line of IT defense. Show your ticket volume and resolution speed.',
    hiringTip: 'Help desk roles are entry points to IT careers. Highlight certifications, ticket metrics, and any automation or documentation you created.',
    interviewQuestions: [
      { q: 'How do you prioritize tickets?', guidance: 'Show understanding of severity and SLAs' },
      { q: 'What steps do you take for a slow computer complaint?', guidance: 'Demonstrate systematic troubleshooting' },
      { q: 'How do you handle a VIP user with a minor issue?', guidance: 'Balance politics with priorities' },
      { q: 'Describe your experience with Active Directory', guidance: 'Show hands-on technical knowledge' },
      { q: 'How do you document your solutions?', guidance: 'Discuss knowledge base contributions' }
    ],
    atsKeywords: ['help desk', 'IT support', 'Active Directory', 'Office 365', 'ticketing', 'desktop support', 'tier 1', 'SLA']
  },
  {
    slug: 'complaints-handler',
    jobTitle: 'Complaints Handler',
    category: 'Customer Service',
    avgSalary: '$42,000',
    salaryRange: '$32,000 - $55,000',
    yearsExperience: '1-3',
    jobGrowth: '3%',
    keySkills: ['Conflict Resolution', 'Empathy', 'Documentation', 'Regulatory Compliance', 'Root Cause Analysis'],
    certifications: ['Customer Complaints Management', 'Mediation Training'],
    cardSummary: 'Turn complaints into opportunities. Show how you resolve issues and retain customers.',
    hiringTip: 'Complaints handlers need to demonstrate both empathy and efficiency. Include complaint resolution times and customer retention rates post-resolution.',
    interviewQuestions: [
      { q: 'How do you stay calm when customers are angry?', guidance: 'Show emotional intelligence and techniques' },
      { q: 'Walk me through your complaint handling process', guidance: 'Demonstrate structured approach' },
      { q: 'How do you know when to offer compensation?', guidance: 'Balance customer satisfaction with policy' },
      { q: 'Describe a complaint that revealed a bigger issue', guidance: 'Show systemic thinking' },
      { q: 'How do you document complaints for compliance?', guidance: 'Show attention to regulatory requirements' }
    ],
    atsKeywords: ['complaints handling', 'dispute resolution', 'customer retention', 'escalation management', 'regulatory compliance', 'root cause analysis']
  },

  // Construction (+6)
  {
    slug: 'construction-superintendent',
    jobTitle: 'Construction Superintendent',
    category: 'Construction',
    avgSalary: '$92,000',
    salaryRange: '$70,000 - $125,000',
    yearsExperience: '7-10',
    jobGrowth: '5%',
    keySkills: ['Project Oversight', 'Crew Management', 'Schedule Coordination', 'Safety Compliance', 'Quality Control'],
    certifications: ['OSHA 30', 'PMP', 'LEED AP', 'First Aid/CPR'],
    cardSummary: 'Lead projects from ground-breaking to ribbon-cutting. Show your track record of on-time delivery.',
    hiringTip: 'Superintendents are judged by project outcomes. Include project values, crew sizes managed, and specific metrics on schedule and budget performance.',
    interviewQuestions: [
      { q: 'How do you keep a project on schedule?', guidance: 'Discuss scheduling tools and proactive management' },
      { q: 'Describe a project that went over budget', guidance: 'Show problem-solving and recovery' },
      { q: 'How do you maintain safety culture on site?', guidance: 'Demonstrate safety leadership' },
      { q: 'How do you handle subcontractor conflicts?', guidance: 'Show conflict resolution skills' },
      { q: 'Walk me through your daily routine', guidance: 'Demonstrate organizational skills' }
    ],
    atsKeywords: ['construction superintendent', 'project oversight', 'site management', 'OSHA', 'scheduling', 'subcontractor management', 'quality control', 'punch list']
  },
  {
    slug: 'concrete-finisher',
    jobTitle: 'Concrete Finisher',
    category: 'Construction',
    avgSalary: '$48,000',
    salaryRange: '$35,000 - $68,000',
    yearsExperience: '2-5',
    jobGrowth: '4%',
    keySkills: ['Flatwork', 'Decorative Concrete', 'Form Setting', 'Tool Operation', 'Blueprint Reading'],
    certifications: ['ACI Flatwork Finisher', 'OSHA 10', 'Decorative Concrete Certification'],
    cardSummary: 'Create surfaces that last decades. Show your finishing techniques and project variety.',
    hiringTip: 'Concrete finishers should highlight specific techniques mastered (stamped, polished, exposed aggregate) and project types (residential, commercial, infrastructure).',
    interviewQuestions: [
      { q: 'How do you prevent cracking in large pours?', guidance: 'Show technical knowledge of joints and curing' },
      { q: 'What decorative techniques do you know?', guidance: 'Demonstrate specialized skills' },
      { q: 'How do you work in extreme weather?', guidance: 'Show adaptability and problem-solving' },
      { q: 'Describe your experience with power trowels', guidance: 'Demonstrate equipment proficiency' },
      { q: 'How do you read concrete specifications?', guidance: 'Show blueprint literacy' }
    ],
    atsKeywords: ['concrete finisher', 'flatwork', 'power trowel', 'bull float', 'decorative concrete', 'stamped concrete', 'ACI certified']
  },
  {
    slug: 'roofer',
    jobTitle: 'Roofer',
    category: 'Construction',
    avgSalary: '$47,000',
    salaryRange: '$32,000 - $72,000',
    yearsExperience: '1-4',
    jobGrowth: '2%',
    keySkills: ['Shingle Installation', 'Flat Roofing', 'Leak Repair', 'Safety Harness', 'Material Estimation'],
    certifications: ['OSHA 10', 'GAF Certified Installer', 'CertainTeed Master Shingle Applicator'],
    cardSummary: 'Protect homes from the elements. Show your installation speed and material expertise.',
    hiringTip: 'Roofing contractors value speed and quality. Include squares completed per day, material systems youre certified in, and any warranty callbacks.',
    interviewQuestions: [
      { q: 'What roofing systems are you experienced with?', guidance: 'List specific materials and manufacturers' },
      { q: 'How do you work safely at height?', guidance: 'Demonstrate safety consciousness' },
      { q: 'How do you estimate material needs?', guidance: 'Show calculation skills' },
      { q: 'Describe a complex roof you completed', guidance: 'Show problem-solving ability' },
      { q: 'How do you handle unexpected weather?', guidance: 'Demonstrate planning and adaptability' }
    ],
    atsKeywords: ['roofer', 'shingle installation', 'flat roof', 'TPO', 'EPDM', 'metal roofing', 'roof repair', 'manufacturer certified']
  },
  {
    slug: 'drywall-installer',
    jobTitle: 'Drywall Installer',
    category: 'Construction',
    avgSalary: '$52,000',
    salaryRange: '$36,000 - $75,000',
    yearsExperience: '1-4',
    jobGrowth: '3%',
    keySkills: ['Hanging Drywall', 'Taping', 'Mudding', 'Sanding', 'Texture Application'],
    certifications: ['OSHA 10', 'AWCI Certification', 'Lead-Safe Certified'],
    cardSummary: 'Create perfect walls and ceilings. Show your speed and finish quality.',
    hiringTip: 'Drywall installers are measured by production rates. Include sheets hung per day, ability to tape and finish, and specialty work like curved walls or high ceilings.',
    interviewQuestions: [
      { q: 'How many sheets can you hang in a day?', guidance: 'Provide realistic production rates' },
      { q: 'Do you tape and finish your own work?', guidance: 'Show full-cycle capability' },
      { q: 'How do you handle high ceilings?', guidance: 'Demonstrate specialized experience' },
      { q: 'What textures can you apply?', guidance: 'List specific finish techniques' },
      { q: 'How do you minimize dust?', guidance: 'Show professionalism and consideration' }
    ],
    atsKeywords: ['drywall', 'sheetrock', 'taping', 'mudding', 'texture', 'Level 5 finish', 'metal framing', 'acoustical']
  },
  {
    slug: 'heavy-equipment-operator',
    jobTitle: 'Heavy Equipment Operator',
    category: 'Construction',
    avgSalary: '$55,000',
    salaryRange: '$40,000 - $78,000',
    yearsExperience: '2-5',
    jobGrowth: '4%',
    keySkills: ['Excavator Operation', 'Bulldozer', 'Grader', 'GPS Systems', 'Site Preparation'],
    certifications: ['NCCER Heavy Equipment', 'OSHA 10', 'CDL Class A'],
    cardSummary: 'Move mountains with precision. Show your equipment range and grade accuracy.',
    hiringTip: 'Equipment operators should list every machine type theyre certified on. GPS/machine control experience and ability to read grade stakes are premium skills.',
    interviewQuestions: [
      { q: 'What equipment are you certified to operate?', guidance: 'List all machines with hours of experience' },
      { q: 'How do you read grade stakes?', guidance: 'Demonstrate understanding of cut/fill' },
      { q: 'Describe your experience with GPS grading', guidance: 'Show technology proficiency' },
      { q: 'How do you perform daily equipment checks?', guidance: 'Show safety and maintenance awareness' },
      { q: 'How do you work around utilities?', guidance: 'Demonstrate safety consciousness' }
    ],
    atsKeywords: ['heavy equipment operator', 'excavator', 'bulldozer', 'grader', 'loader', 'GPS grading', 'earthwork', 'NCCER']
  },
  {
    slug: 'iron-worker',
    jobTitle: 'Iron Worker',
    category: 'Construction',
    avgSalary: '$58,000',
    salaryRange: '$42,000 - $85,000',
    yearsExperience: '3-6',
    jobGrowth: '3%',
    keySkills: ['Structural Steel', 'Rebar Installation', 'Welding', 'Rigging', 'Blueprint Reading'],
    certifications: ['Ironworkers Apprenticeship', 'AWS Welding Cert', 'OSHA 30', 'Rigging Certification'],
    cardSummary: 'Build the skeletons of skyscrapers. Show your structural experience and safety record.',
    hiringTip: 'Ironworkers should highlight specific project types (high-rise, bridges, industrial) and any specialized skills like ornamental work or certified welding.',
    interviewQuestions: [
      { q: 'What types of structures have you worked on?', guidance: 'Describe building types and heights' },
      { q: 'Are you comfortable working at extreme heights?', guidance: 'Address height work directly' },
      { q: 'What welding certifications do you hold?', guidance: 'List specific AWS certifications' },
      { q: 'How do you interpret structural drawings?', guidance: 'Show blueprint literacy' },
      { q: 'Describe your rigging experience', guidance: 'Detail crane work and load calculations' }
    ],
    atsKeywords: ['iron worker', 'structural steel', 'rebar', 'welding', 'rigging', 'crane signals', 'high-rise construction', 'ornamental iron']
  },

  // Transportation (+5)
  {
    slug: 'delivery-driver',
    jobTitle: 'Delivery Driver',
    category: 'Transportation',
    avgSalary: '$38,000',
    salaryRange: '$28,000 - $52,000',
    yearsExperience: '0-2',
    jobGrowth: '12%',
    keySkills: ['Route Planning', 'Time Management', 'Customer Service', 'Vehicle Maintenance', 'GPS Navigation'],
    certifications: ['Valid Drivers License', 'Clean Driving Record', 'DOT Medical Card'],
    cardSummary: 'Deliver on time, every time. Show your route efficiency and customer ratings.',
    hiringTip: 'Delivery drivers should highlight packages per day, on-time delivery percentage, and any customer service ratings. Clean driving record is essential.',
    interviewQuestions: [
      { q: 'How many stops can you complete in a day?', guidance: 'Provide realistic productivity numbers' },
      { q: 'How do you handle difficult delivery locations?', guidance: 'Show problem-solving ability' },
      { q: 'Describe your driving record', guidance: 'Be honest about any incidents' },
      { q: 'How do you handle damaged packages?', guidance: 'Show customer service awareness' },
      { q: 'How do you organize your vehicle?', guidance: 'Demonstrate efficiency mindset' }
    ],
    atsKeywords: ['delivery driver', 'route optimization', 'last mile delivery', 'package handling', 'customer delivery', 'DOT compliant', 'on-time delivery']
  },
  {
    slug: 'long-haul-trucker',
    jobTitle: 'Long Haul Truck Driver',
    category: 'Transportation',
    avgSalary: '$52,000',
    salaryRange: '$40,000 - $78,000',
    yearsExperience: '1-3',
    jobGrowth: '4%',
    keySkills: ['OTR Driving', 'ELD Compliance', 'Load Securing', 'Pre-trip Inspection', 'Route Planning'],
    certifications: ['CDL Class A', 'Hazmat Endorsement', 'TWIC Card', 'Tanker Endorsement'],
    cardSummary: 'Move freight coast to coast. Show your miles driven and safety record.',
    hiringTip: 'Trucking companies want to see miles driven safely, endorsements held, and ELD compliance history. Highlight any specialized experience (flatbed, reefer, hazmat).',
    interviewQuestions: [
      { q: 'What endorsements do you hold?', guidance: 'List all CDL endorsements' },
      { q: 'How do you manage hours of service?', guidance: 'Show ELD knowledge and compliance' },
      { q: 'Describe your experience with different trailer types', guidance: 'List van, flatbed, reefer, etc.' },
      { q: 'How do you inspect your truck?', guidance: 'Walk through pre-trip process' },
      { q: 'How do you handle bad weather?', guidance: 'Show safety judgment' }
    ],
    atsKeywords: ['CDL Class A', 'OTR', 'ELD', 'hazmat', 'tanker', 'flatbed', 'reefer', 'DOT compliance', 'CSA score']
  },
  {
    slug: 'bus-driver',
    jobTitle: 'Bus Driver',
    category: 'Transportation',
    avgSalary: '$42,000',
    salaryRange: '$32,000 - $58,000',
    yearsExperience: '0-2',
    jobGrowth: '6%',
    keySkills: ['Passenger Safety', 'Route Navigation', 'Schedule Adherence', 'Defensive Driving', 'ADA Compliance'],
    certifications: ['CDL Class B', 'Passenger Endorsement', 'School Bus Endorsement', 'First Aid'],
    cardSummary: 'Transport passengers safely daily. Show your safety record and customer service.',
    hiringTip: 'Bus drivers should emphasize their safety record, passenger endorsement, and any special populations served (school children, elderly, disabled passengers).',
    interviewQuestions: [
      { q: 'How do you handle disruptive passengers?', guidance: 'Show de-escalation techniques' },
      { q: 'Describe your pre-trip inspection routine', guidance: 'Demonstrate thoroughness' },
      { q: 'How do you stay on schedule in traffic?', guidance: 'Balance safety with punctuality' },
      { q: 'What experience do you have with ADA requirements?', guidance: 'Show accessibility knowledge' },
      { q: 'How do you handle medical emergencies?', guidance: 'Describe emergency protocols' }
    ],
    atsKeywords: ['bus driver', 'CDL Class B', 'passenger endorsement', 'school bus', 'transit operator', 'ADA', 'passenger safety']
  },
  {
    slug: 'dispatcher',
    jobTitle: 'Dispatcher',
    category: 'Transportation',
    avgSalary: '$44,000',
    salaryRange: '$32,000 - $60,000',
    yearsExperience: '1-3',
    jobGrowth: '3%',
    keySkills: ['Fleet Management', 'Route Optimization', 'Communication', 'Crisis Management', 'Software Systems'],
    certifications: ['Dispatcher Certification', 'TMS Training', 'Emergency Communications'],
    cardSummary: 'Coordinate fleets with precision. Show your efficiency gains and on-time rates.',
    hiringTip: 'Dispatchers should highlight fleet size managed, on-time delivery improvements, and specific TMS/routing software experience.',
    interviewQuestions: [
      { q: 'What dispatch software have you used?', guidance: 'List specific TMS platforms' },
      { q: 'How do you handle driver emergencies?', guidance: 'Show crisis management skills' },
      { q: 'How do you optimize routes?', guidance: 'Describe methodology and tools' },
      { q: 'How do you manage driver hours?', guidance: 'Show HOS compliance knowledge' },
      { q: 'Describe a time you solved a logistics crisis', guidance: 'Show problem-solving ability' }
    ],
    atsKeywords: ['dispatcher', 'fleet management', 'TMS', 'route optimization', 'logistics coordination', 'HOS', 'load planning']
  },
  {
    slug: 'freight-broker',
    jobTitle: 'Freight Broker',
    category: 'Transportation',
    avgSalary: '$55,000',
    salaryRange: '$35,000 - $95,000',
    yearsExperience: '1-3',
    jobGrowth: '7%',
    keySkills: ['Negotiation', 'Carrier Relations', 'Load Matching', 'Rate Quoting', 'Customer Acquisition'],
    certifications: ['Freight Broker License', 'Transportation Intermediary Training'],
    cardSummary: 'Match shippers with carriers profitably. Show your margin growth and volume.',
    hiringTip: 'Freight brokers are measured by revenue and margin. Include loads moved per month, average margin percentage, and key accounts developed.',
    interviewQuestions: [
      { q: 'How do you build carrier relationships?', guidance: 'Describe networking and trust-building' },
      { q: 'How do you negotiate rates?', guidance: 'Show pricing strategy' },
      { q: 'How do you vet new carriers?', guidance: 'Describe due diligence process' },
      { q: 'What load boards do you use?', guidance: 'List platforms and tools' },
      { q: 'How do you handle a failed pickup?', guidance: 'Show crisis management' }
    ],
    atsKeywords: ['freight broker', 'load matching', 'carrier relations', 'TMS', 'load board', 'rate negotiation', 'logistics sales']
  },

  // Social Services (+6)
  {
    slug: 'case-manager',
    jobTitle: 'Case Manager',
    category: 'Social Services',
    avgSalary: '$48,000',
    salaryRange: '$35,000 - $65,000',
    yearsExperience: '2-4',
    jobGrowth: '9%',
    keySkills: ['Client Assessment', 'Care Coordination', 'Resource Navigation', 'Documentation', 'Advocacy'],
    certifications: ['Certified Case Manager (CCM)', 'Social Work License', 'First Aid/CPR'],
    cardSummary: 'Connect clients with life-changing resources. Show your caseload management and outcomes.',
    hiringTip: 'Case managers should demonstrate caseload size, successful placements/outcomes, and familiarity with community resources and documentation requirements.',
    interviewQuestions: [
      { q: 'How do you prioritize a large caseload?', guidance: 'Describe triage methodology' },
      { q: 'Describe a challenging client you helped', guidance: 'Show persistence and creativity' },
      { q: 'How do you maintain boundaries?', guidance: 'Demonstrate professional limits' },
      { q: 'What community resources do you know?', guidance: 'Show local knowledge' },
      { q: 'How do you handle documentation requirements?', guidance: 'Show compliance awareness' }
    ],
    atsKeywords: ['case manager', 'care coordination', 'client assessment', 'resource navigation', 'CCM', 'discharge planning', 'wraparound services']
  },
  {
    slug: 'substance-abuse-counselor',
    jobTitle: 'Substance Abuse Counselor',
    category: 'Social Services',
    avgSalary: '$49,000',
    salaryRange: '$36,000 - $68,000',
    yearsExperience: '2-4',
    jobGrowth: '18%',
    keySkills: ['Motivational Interviewing', 'Group Therapy', 'Crisis Intervention', 'Treatment Planning', 'Relapse Prevention'],
    certifications: ['CADC', 'CASAC', 'Licensed Alcohol and Drug Counselor'],
    cardSummary: 'Guide clients toward recovery. Show your treatment success rates and specializations.',
    hiringTip: 'Substance abuse counselors should highlight specific certifications, treatment modalities mastered, and any specialty populations (adolescents, dual diagnosis).',
    interviewQuestions: [
      { q: 'What treatment modalities do you use?', guidance: 'Describe evidence-based approaches' },
      { q: 'How do you handle relapse?', guidance: 'Show non-judgmental approach' },
      { q: 'Describe your experience with group therapy', guidance: 'Detail facilitation skills' },
      { q: 'How do you engage resistant clients?', guidance: 'Show motivational interviewing skills' },
      { q: 'How do you practice self-care?', guidance: 'Demonstrate burnout prevention' }
    ],
    atsKeywords: ['substance abuse counselor', 'addiction counselor', 'CADC', 'CASAC', 'motivational interviewing', 'MAT', 'relapse prevention', '12-step']
  },
  {
    slug: 'family-services-worker',
    jobTitle: 'Family Services Worker',
    category: 'Social Services',
    avgSalary: '$45,000',
    salaryRange: '$32,000 - $58,000',
    yearsExperience: '1-3',
    jobGrowth: '8%',
    keySkills: ['Family Assessment', 'Home Visits', 'Parenting Education', 'Mandated Reporting', 'Court Documentation'],
    certifications: ['Child Welfare Certification', 'Trauma-Informed Care', 'Mandated Reporter Training'],
    cardSummary: 'Support families in crisis. Show your intervention skills and family outcomes.',
    hiringTip: 'Family services workers should highlight caseload management, court experience, and specific populations served (foster care, reunification, prevention).',
    interviewQuestions: [
      { q: 'How do you conduct home assessments?', guidance: 'Describe observation techniques' },
      { q: 'Describe a family reunification case', guidance: 'Show comprehensive approach' },
      { q: 'How do you handle mandated reporting?', guidance: 'Show legal compliance' },
      { q: 'How do you engage reluctant families?', guidance: 'Demonstrate relationship building' },
      { q: 'How do you handle court testimony?', guidance: 'Show documentation skills' }
    ],
    atsKeywords: ['family services', 'child welfare', 'home visits', 'mandated reporter', 'foster care', 'reunification', 'CPS', 'family preservation']
  },
  {
    slug: 'crisis-counselor',
    jobTitle: 'Crisis Counselor',
    category: 'Social Services',
    avgSalary: '$47,000',
    salaryRange: '$35,000 - $62,000',
    yearsExperience: '2-4',
    jobGrowth: '12%',
    keySkills: ['Crisis Assessment', 'De-escalation', 'Safety Planning', 'Suicide Prevention', 'Trauma-Informed Care'],
    certifications: ['Crisis Intervention Certification', 'QPR Training', 'Mental Health First Aid'],
    cardSummary: 'Respond when seconds matter. Show your de-escalation skills and crisis outcomes.',
    hiringTip: 'Crisis counselors need to demonstrate calm under pressure. Include crisis line statistics, de-escalation successes, and specific training in suicide prevention.',
    interviewQuestions: [
      { q: 'How do you assess suicide risk?', guidance: 'Describe assessment protocol' },
      { q: 'Describe a crisis you de-escalated', guidance: 'Show specific techniques used' },
      { q: 'How do you handle multiple crises?', guidance: 'Demonstrate triage skills' },
      { q: 'How do you manage your own stress?', guidance: 'Show self-care practices' },
      { q: 'How do you collaborate with emergency services?', guidance: 'Describe coordination protocols' }
    ],
    atsKeywords: ['crisis counselor', 'crisis intervention', 'suicide prevention', 'de-escalation', 'safety planning', 'crisis hotline', 'QPR', 'trauma-informed']
  },
  {
    slug: 'community-outreach-coordinator',
    jobTitle: 'Community Outreach Coordinator',
    category: 'Social Services',
    avgSalary: '$46,000',
    salaryRange: '$34,000 - $62,000',
    yearsExperience: '1-3',
    jobGrowth: '7%',
    keySkills: ['Program Development', 'Public Speaking', 'Partnership Building', 'Grant Writing', 'Event Planning'],
    certifications: ['Community Health Worker Certification', 'Public Health Certificate'],
    cardSummary: 'Build bridges between services and communities. Show your program reach and partnerships.',
    hiringTip: 'Outreach coordinators should highlight populations served, events organized, partnerships developed, and any grant funding secured.',
    interviewQuestions: [
      { q: 'How do you identify community needs?', guidance: 'Describe assessment methods' },
      { q: 'Describe a successful outreach campaign', guidance: 'Show measurable impact' },
      { q: 'How do you engage hard-to-reach populations?', guidance: 'Demonstrate cultural competency' },
      { q: 'How do you build community partnerships?', guidance: 'Show relationship development' },
      { q: 'How do you measure program effectiveness?', guidance: 'Describe metrics and evaluation' }
    ],
    atsKeywords: ['community outreach', 'program coordinator', 'public health', 'partnership development', 'community engagement', 'health education', 'grant writing']
  },
  {
    slug: 'youth-counselor',
    jobTitle: 'Youth Counselor',
    category: 'Social Services',
    avgSalary: '$40,000',
    salaryRange: '$30,000 - $52,000',
    yearsExperience: '1-3',
    jobGrowth: '10%',
    keySkills: ['Youth Development', 'Mentoring', 'Behavioral Intervention', 'Program Facilitation', 'Family Communication'],
    certifications: ['Youth Development Certification', 'First Aid/CPR', 'Trauma-Informed Care'],
    cardSummary: 'Guide young people toward success. Show your mentoring impact and program leadership.',
    hiringTip: 'Youth counselors should highlight populations served (at-risk, foster, juvenile justice), programs facilitated, and specific outcomes achieved.',
    interviewQuestions: [
      { q: 'How do you build rapport with resistant youth?', guidance: 'Show relationship-building techniques' },
      { q: 'Describe a youth success story', guidance: 'Share specific interventions and outcomes' },
      { q: 'How do you handle behavioral challenges?', guidance: 'Demonstrate de-escalation skills' },
      { q: 'How do you involve families?', guidance: 'Show family engagement strategies' },
      { q: 'How do you maintain boundaries with youth?', guidance: 'Demonstrate professional limits' }
    ],
    atsKeywords: ['youth counselor', 'youth development', 'mentoring', 'at-risk youth', 'behavioral intervention', 'residential', 'group home', 'juvenile']
  },

  // Security (+4)
  {
    slug: 'security-officer',
    jobTitle: 'Security Officer',
    category: 'Security',
    avgSalary: '$35,000',
    salaryRange: '$26,000 - $48,000',
    yearsExperience: '0-2',
    jobGrowth: '6%',
    keySkills: ['Access Control', 'Patrol Procedures', 'Report Writing', 'Emergency Response', 'Surveillance'],
    certifications: ['State Guard Card', 'First Aid/CPR', 'BSIS Certification'],
    cardSummary: 'Protect people and property. Show your vigilance and incident response skills.',
    hiringTip: 'Security officers should highlight specific site types guarded, any specialized training (hospital, casino, corporate), and incident response experience.',
    interviewQuestions: [
      { q: 'How do you handle a trespasser?', guidance: 'Describe approach and procedures' },
      { q: 'Describe your patrol methodology', guidance: 'Show systematic approach' },
      { q: 'How do you write incident reports?', guidance: 'Demonstrate documentation skills' },
      { q: 'How do you stay alert during long shifts?', guidance: 'Show reliability' },
      { q: 'How do you handle medical emergencies?', guidance: 'Describe first responder actions' }
    ],
    atsKeywords: ['security officer', 'access control', 'patrol', 'surveillance', 'incident response', 'CCTV', 'guard card', 'unarmed security']
  },
  {
    slug: 'loss-prevention-specialist',
    jobTitle: 'Loss Prevention Specialist',
    category: 'Security',
    avgSalary: '$42,000',
    salaryRange: '$30,000 - $58,000',
    yearsExperience: '1-3',
    jobGrowth: '4%',
    keySkills: ['Surveillance', 'Apprehension Procedures', 'Investigation', 'Inventory Analysis', 'Employee Training'],
    certifications: ['LPC (Loss Prevention Certified)', 'Wicklander-Zulawski Interview', 'First Aid'],
    cardSummary: 'Stop shrink before it happens. Show your apprehension rates and inventory savings.',
    hiringTip: 'Loss prevention specialists should include shrink reduction percentages, apprehension statistics, and investigation outcomes. Internal theft investigation experience is valuable.',
    interviewQuestions: [
      { q: 'How do you identify shoplifters?', guidance: 'Describe behavioral indicators' },
      { q: 'Walk me through an apprehension', guidance: 'Show proper procedures' },
      { q: 'How do you investigate internal theft?', guidance: 'Describe interview techniques' },
      { q: 'How do you analyze shrink data?', guidance: 'Show analytical skills' },
      { q: 'How do you train employees on LP?', guidance: 'Demonstrate prevention focus' }
    ],
    atsKeywords: ['loss prevention', 'LP', 'shrink reduction', 'apprehension', 'theft investigation', 'CCTV', 'inventory control', 'EAS']
  },
  {
    slug: 'corporate-security-manager',
    jobTitle: 'Corporate Security Manager',
    category: 'Security',
    avgSalary: '$85,000',
    salaryRange: '$65,000 - $120,000',
    yearsExperience: '5-8',
    jobGrowth: '5%',
    keySkills: ['Security Program Management', 'Risk Assessment', 'Crisis Management', 'Vendor Management', 'Compliance'],
    certifications: ['CPP', 'PSP', 'ASIS Member', 'Security Management Degree'],
    cardSummary: 'Protect enterprise assets and people. Show your program development and risk mitigation.',
    hiringTip: 'Corporate security managers should highlight program development, budget management, incident reduction metrics, and experience with executive protection or global security.',
    interviewQuestions: [
      { q: 'How do you assess organizational risk?', guidance: 'Describe methodology and tools' },
      { q: 'How do you manage a security budget?', guidance: 'Show fiscal responsibility' },
      { q: 'Describe your crisis management experience', guidance: 'Detail specific incidents handled' },
      { q: 'How do you evaluate security vendors?', guidance: 'Show procurement skills' },
      { q: 'How do you align security with business goals?', guidance: 'Demonstrate strategic thinking' }
    ],
    atsKeywords: ['corporate security', 'CPP', 'PSP', 'risk assessment', 'crisis management', 'security program', 'executive protection', 'global security']
  },
  {
    slug: 'cybersecurity-analyst',
    jobTitle: 'Cybersecurity Analyst',
    category: 'Security',
    avgSalary: '$92,000',
    salaryRange: '$65,000 - $130,000',
    yearsExperience: '2-5',
    jobGrowth: '32%',
    keySkills: ['Threat Analysis', 'SIEM', 'Incident Response', 'Vulnerability Assessment', 'Network Security'],
    certifications: ['Security+', 'CEH', 'CISSP', 'GIAC'],
    cardSummary: 'Defend networks from cyber threats. Show your incident response and threat detection.',
    hiringTip: 'Cybersecurity analysts should highlight specific tools (Splunk, CrowdStrike), incident types handled, and any threat hunting or red team experience.',
    interviewQuestions: [
      { q: 'What SIEM tools have you used?', guidance: 'List platforms and use cases' },
      { q: 'Walk me through an incident response', guidance: 'Describe IR process step-by-step' },
      { q: 'How do you stay current on threats?', guidance: 'Show continuous learning' },
      { q: 'Describe a threat you detected', guidance: 'Show analytical skills' },
      { q: 'How do you prioritize vulnerabilities?', guidance: 'Demonstrate risk-based approach' }
    ],
    atsKeywords: ['cybersecurity', 'SOC', 'SIEM', 'incident response', 'threat hunting', 'vulnerability management', 'Security+', 'CISSP', 'network security']
  }
];

function generateMDX(job) {
  const today = new Date().toISOString().split('T')[0];

  return `---
title: "${job.jobTitle} Resume Example & Writing Guide 2025"
description: "Professional ${job.jobTitle.toLowerCase()} resume example with expert writing tips. Learn how to highlight your ${job.keySkills.slice(0, 3).join(', ').toLowerCase()} skills."
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
${job.keySkills.map(s => `  - "${s}"`).join('\n')}
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

A strong ${job.jobTitle.toLowerCase()} resume demonstrates your ability to deliver results in the ${job.category.toLowerCase()} field. Hiring managers in this industry specifically look for candidates who can show measurable impact in ${job.keySkills.slice(0, 2).join(' and ').toLowerCase()}.

The most effective ${job.jobTitle.toLowerCase()} resumes go beyond listing job duties. They showcase quantifiable achievements that prove you can excel in this role.

## Professional Summary Examples

### Entry-Level ${job.jobTitle}
Motivated professional with foundational training in ${job.keySkills[0].toLowerCase()} and ${job.keySkills[1].toLowerCase()}. ${job.certifications[0] ? `Currently pursuing ${job.certifications[0]} certification.` : ''} Strong work ethic with demonstrated ability to learn quickly and contribute to team success.

### Mid-Level ${job.jobTitle}
Experienced ${job.jobTitle.toLowerCase()} with ${job.yearsExperience} years delivering results in ${job.keySkills[0].toLowerCase()} and ${job.keySkills[1].toLowerCase()}. Proven track record of exceeding performance targets while maintaining high standards. Seeking to leverage expertise in a challenging new role.

### Senior ${job.jobTitle}
Accomplished ${job.jobTitle.toLowerCase()} professional with extensive experience leading initiatives in ${job.keySkills[0].toLowerCase()}. Known for developing innovative solutions that improve efficiency and drive results. ${job.certifications[0] ? `${job.certifications[0]} certified with` : 'Demonstrated'} expertise mentoring junior team members.

## Salary & Job Outlook

The ${job.jobTitle.toLowerCase()} field offers competitive compensation with growth potential:

- **Median Salary:** ${job.avgSalary}
- **Salary Range:** ${job.salaryRange}
- **Job Growth:** ${job.jobGrowth} (next decade)

*Sources: [U.S. Bureau of Labor Statistics](https://www.bls.gov/ooh/), [Glassdoor](https://www.glassdoor.com/Salaries/), [PayScale](https://www.payscale.com/research/US/). Actual compensation varies by location, experience, and employer.*

## Essential Skills to Highlight

### Core Competencies
${job.keySkills.slice(0, 2).map(s => `- ${s}`).join('\n')}

### Technical Skills
${job.keySkills.slice(2, 4).map(s => `- ${s}`).join('\n')}

### Professional Skills
${job.keySkills.slice(4).map(s => `- ${s}`).join('\n')}
- Communication
- Problem-solving

## Achievement-Focused Bullet Points

Strong ${job.jobTitle.toLowerCase()} bullet points demonstrate measurable impact:

- Improved ${job.keySkills[0].toLowerCase()} efficiency by 25%, reducing processing time
- Implemented new ${job.keySkills[1].toLowerCase()} procedures, increasing accuracy by 30%
- Trained 5+ team members on ${job.keySkills[2].toLowerCase()} best practices
- Received consistent positive feedback for ${job.keySkills[3].toLowerCase()} abilities
- Reduced errors by 40% through improved quality control processes
- Contributed to team achieving 95%+ satisfaction ratings

## ${job.jobTitle} Resume Format & Template Tips

Your ${job.jobTitle.toLowerCase()} resume should emphasize relevant experience prominently. Consider these formatting recommendations:

- **Lead with impact:** Open with a summary highlighting your strongest ${job.category.toLowerCase()} achievements
- **Quantify results:** Include specific metrics like percentages, dollar amounts, or volume handled
- **Highlight certifications:** ${job.certifications[0] ? `Feature credentials like ${job.certifications[0]} prominently` : 'Feature relevant certifications prominently'}
- **Use industry keywords:** Include terms like "${job.atsKeywords.slice(0, 3).join('", "')}" for ATS optimization
- **Keep it concise:** One page for entry-level, two pages maximum for experienced professionals

## Hiring Manager Tip

> **"${job.hiringTip}"**

This insight reflects what decision-makers prioritize when reviewing ${job.jobTitle.toLowerCase()} candidates. Make sure your resume addresses these specific concerns directly.

## Common ${job.jobTitle} Interview Questions

${job.interviewQuestions.map((q, i) => `### ${i + 1}. ${q.q}
${q.guidance}`).join('\n\n')}

## Common Mistakes to Avoid

1. **Focusing on duties instead of achievements** - Describe what you accomplished, not just what you were responsible for
2. **Missing relevant keywords** - Include industry terms like ${job.atsKeywords.slice(0, 3).join(', ')} for ATS screening
3. **Omitting certifications** - ${job.certifications[0] ? `Credentials like ${job.certifications[0]} can set you apart` : 'Relevant certifications can set you apart'}
4. **Using generic descriptions** - Be specific about your contributions and their impact
5. **Neglecting soft skills** - ${job.category} roles require strong interpersonal abilities alongside technical skills

## ATS Optimization for ${job.jobTitle} Resumes

Ensure your resume passes Applicant Tracking Systems by including these keywords naturally throughout your document:

**Priority Keywords:** ${job.atsKeywords.slice(0, 4).join(', ')}

**Additional Keywords:** ${job.atsKeywords.slice(4).join(', ')}

Match the exact phrasing from job descriptions when possible, but maintain natural readability.

## Related Resources

- [Resume Writing Guide](/en/blog/resume-writing-guide)
- [Cover Letter Tips](/en/blog/cover-letter-tips)
- [Interview Preparation](/en/blog/interview-preparation)
- [Browse All Templates](/en/templates)
`;
}

async function main() {
  console.log(`\\n📝 Generating ${JOBS.length} final batch resume examples...\\n`);

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
  console.log(`   Total in batch: ${JOBS.length}`);
}

main().catch(console.error);
