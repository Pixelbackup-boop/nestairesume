#!/usr/bin/env node
/**
 * Generate 15 Hospitality resume example MDX files
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT_DIR = path.join(__dirname, '../frontend/content/resume-examples');
const AUTHORS = ['Jessica Park', 'Sarah Sutton'];

function getAuthor(index) { return AUTHORS[index % AUTHORS.length]; }

const HOSPITALITY_JOBS = [
  {
    slug: 'hotel-manager',
    jobTitle: 'Hotel Manager',
    avgSalary: '$65,000',
    jobGrowth: '+10%',
    blsUrl: 'https://www.bls.gov/ooh/management/lodging-managers.htm',
    keySkills: ['Operations Management', 'Revenue Management', 'Guest Services', 'Staff Leadership', 'P&L Responsibility', 'Sales', 'Quality Assurance', 'Budget Management'],
    skillCategories: {
      'Operations': ['Front desk', 'Housekeeping', 'Maintenance', 'F&B oversight', 'Vendor management'],
      'Financial': ['P&L management', 'Revenue optimization', 'Budgeting', 'Cost control', 'Forecasting'],
      'Leadership': ['Staff hiring/training', 'Performance management', 'Guest recovery', 'Brand standards']
    },
    certifications: ['CHA (Certified Hotel Administrator)', 'AHLEI certifications', 'Revenue management certification'],
    context: 'Hotel managers oversee all aspects of property operations—from guest satisfaction to profitability. The role demands 24/7 problem-solving ability.',
    hiringTip: '"Hotel manager for 200-room full-service property, achieved 85% occupancy with $150 ADR, improved TripAdvisor ranking from #15 to #5 in market." Show RevPAR, guest scores, and operational achievements. Include property type, brand, and room count.',
    mistakes: [
      { title: 'Missing key metrics', detail: 'RevPAR, ADR, occupancy, guest satisfaction scores—hotels are metric-driven' },
      { title: 'Not specifying property type', detail: 'Full-service, limited-service, resort, boutique—different skill sets required' },
      { title: 'Ignoring brand experience', detail: 'Marriott, Hilton, IHG standards differ—list brand experience' }
    ],
    interviewQuestions: [
      { q: 'How do you balance occupancy with ADR?', guidance: 'Discuss revenue management strategy and market positioning.' },
      { q: 'Describe a difficult guest situation you resolved', guidance: 'Show empowerment, recovery skills, and maintaining satisfaction.' },
      { q: 'How do you motivate a diverse hotel team?', guidance: 'Cover communication, recognition, and leading across departments.' }
    ],
    atsKeywords: ['hotel manager', 'lodging', 'hospitality', 'RevPAR', 'occupancy', 'guest satisfaction', 'operations']
  },
  {
    slug: 'front-desk-agent',
    jobTitle: 'Front Desk Agent',
    avgSalary: '$32,000',
    jobGrowth: '+9%',
    blsUrl: 'https://www.bls.gov/ooh/office-and-administrative-support/hotel-motel-and-resort-desk-clerks.htm',
    keySkills: ['Guest Check-in/out', 'Reservations', 'PMS Systems', 'Customer Service', 'Problem Resolution', 'Upselling', 'Multi-tasking', 'Communication'],
    skillCategories: {
      'Guest Services': ['Check-in/check-out', 'Reservation handling', 'Guest requests', 'Complaint resolution', 'Concierge assistance'],
      'Technical': ['Opera/PMS systems', 'Phone systems', 'Payment processing', 'Booking engines'],
      'Sales': ['Upselling rooms', 'Loyalty enrollment', 'Package promotion']
    },
    certifications: ['Guest Service Gold certification', 'Brand-specific training'],
    context: 'Front desk agents are the face of the hotel, creating first and last impressions. Multi-tasking and problem-solving are essential.',
    hiringTip: '"Front desk agent at 350-room convention hotel, handling 150+ check-ins daily with 95% guest satisfaction. Top performer in loyalty enrollments." Show volume, guest scores, and sales achievements.',
    mistakes: [
      { title: 'Not mentioning PMS experience', detail: 'Opera, OnQ, FOSSE—list specific systems' },
      { title: 'Missing guest satisfaction data', detail: 'Scores, reviews, recognition demonstrate service quality' }
    ],
    interviewQuestions: [
      { q: 'How do you handle an overbooked night?', guidance: 'Discuss walking guests, compensation, and maintaining satisfaction.' },
      { q: 'Describe your upselling approach', guidance: 'Show natural, guest-focused sales technique.' }
    ],
    atsKeywords: ['front desk', 'hotel', 'guest services', 'Opera', 'check-in', 'hospitality', 'reservations']
  },
  {
    slug: 'housekeeper',
    jobTitle: 'Housekeeper',
    avgSalary: '$30,000',
    jobGrowth: '+6%',
    blsUrl: 'https://www.bls.gov/ooh/building-and-grounds-cleaning/maids-and-housekeeping-cleaners.htm',
    keySkills: ['Room Cleaning', 'Attention to Detail', 'Time Management', 'Laundry', 'Chemical Safety', 'Physical Stamina', 'Guest Interaction', 'Quality Standards'],
    skillCategories: {
      'Cleaning': ['Room turnover', 'Deep cleaning', 'Bathroom sanitation', 'Bed making', 'Public areas'],
      'Operations': ['Cart organization', 'Supply management', 'Laundry', 'Lost and found'],
      'Standards': ['Brand standards', 'Quality inspection', 'Time management', 'Guest privacy']
    },
    certifications: ['Housekeeping certification', 'Chemical handling training'],
    context: 'Housekeepers maintain the cleanliness that guests expect. Speed, attention to detail, and reliability are essential.',
    hiringTip: '"Housekeeper maintaining 16-room quota daily in luxury resort, consistently passing quality inspections. Zero guest complaints in 2 years." Show rooms per day, quality record, and property type.',
    mistakes: [
      { title: 'Not showing room quota', detail: 'Rooms per day demonstrates productivity' },
      { title: 'Missing quality record', detail: 'Inspection pass rates and guest feedback matter' }
    ],
    interviewQuestions: [
      { q: 'How do you prioritize rooms during busy periods?', guidance: 'Discuss checkouts, VIPs, and staying organized.' },
      { q: 'What do you do if you find something suspicious?', guidance: 'Cover security awareness and proper reporting.' }
    ],
    atsKeywords: ['housekeeper', 'housekeeping', 'hotel', 'cleaning', 'room attendant', 'hospitality']
  },
  {
    slug: 'housekeeping-supervisor',
    jobTitle: 'Housekeeping Supervisor',
    avgSalary: '$38,000',
    jobGrowth: '+6%',
    blsUrl: 'https://www.bls.gov/ooh/building-and-grounds-cleaning/first-line-supervisors-of-housekeeping-and-janitorial-workers.htm',
    keySkills: ['Team Supervision', 'Quality Inspection', 'Scheduling', 'Inventory', 'Training', 'Guest Recovery', 'Standards Compliance', 'Problem Solving'],
    skillCategories: {
      'Supervision': ['Staff scheduling', 'Performance management', 'Training', 'Quality inspection'],
      'Operations': ['Room assignment', 'Inventory control', 'Deep cleaning scheduling', 'Vendor coordination'],
      'Leadership': ['Team motivation', 'Problem resolution', 'Guest recovery', 'Cross-department coordination']
    },
    certifications: ['Housekeeping management certification', 'OSHA training'],
    context: 'Housekeeping supervisors lead teams and ensure quality standards are met. The role balances people management with operational efficiency.',
    hiringTip: '"Housekeeping supervisor leading 20-person team in 400-room hotel, maintaining 95% quality inspection pass rate while reducing turnover 25%." Show team size, quality metrics, and leadership impact.',
    mistakes: [
      { title: 'Not quantifying team size', detail: 'Include staff supervised and rooms under responsibility' },
      { title: 'Missing quality metrics', detail: 'Inspection scores, guest satisfaction, turnover rates' }
    ],
    interviewQuestions: [
      { q: 'How do you handle call-offs with a full house?', guidance: 'Discuss contingency planning and maintaining standards under pressure.' },
      { q: 'Describe your quality inspection process', guidance: 'Cover standards, training, and addressing issues.' }
    ],
    atsKeywords: ['housekeeping supervisor', 'hotel', 'hospitality', 'team leadership', 'quality control', 'operations']
  },
  {
    slug: 'concierge',
    jobTitle: 'Concierge',
    avgSalary: '$35,000',
    jobGrowth: '+10%',
    blsUrl: 'https://www.bls.gov/ooh/personal-care-and-service/concierges.htm',
    keySkills: ['Local Knowledge', 'Reservation Assistance', 'Problem Solving', 'Communication', 'Relationship Building', 'Discretion', 'Multi-tasking', 'Sales'],
    skillCategories: {
      'Guest Services': ['Restaurant reservations', 'Activity booking', 'Transportation', 'Special requests', 'VIP services'],
      'Knowledge': ['Local attractions', 'Dining recommendations', 'Entertainment', 'Hidden gems'],
      'Relationships': ['Vendor relationships', 'Guest rapport', 'Network building', 'Les Clefs d\'Or standards']
    },
    certifications: ['Les Clefs d\'Or membership', 'Certified Concierge'],
    context: 'Concierges enhance guest experiences through knowledge, connections, and problem-solving. Building relationships with guests and vendors is essential.',
    hiringTip: '"Hotel concierge known for securing impossible reservations and creating memorable experiences. Les Clefs d\'Or member with extensive restaurant and entertainment contacts." Show specific accomplishments and relationship network.',
    mistakes: [
      { title: 'Being too generic about services', detail: 'Include specific examples of exceptional service provided' },
      { title: 'Not mentioning network', detail: 'Vendor relationships and local connections are your value' }
    ],
    interviewQuestions: [
      { q: 'How do you handle a request you can\'t fulfill?', guidance: 'Show creative problem-solving and alternative solutions.' },
      { q: 'Describe a time you went above and beyond', guidance: 'Specific memorable experience that delighted a guest.' }
    ],
    atsKeywords: ['concierge', 'hotel', 'guest services', 'hospitality', 'luxury', 'reservations']
  },
  {
    slug: 'bellhop',
    jobTitle: 'Bellhop',
    avgSalary: '$28,000',
    jobGrowth: '+8%',
    blsUrl: 'https://www.bls.gov/ooh/personal-care-and-service/baggage-porters-and-bellhops.htm',
    keySkills: ['Luggage Handling', 'Guest Assistance', 'Hotel Knowledge', 'Physical Fitness', 'Communication', 'Valet Parking', 'Room Orientation', 'Professionalism'],
    skillCategories: {
      'Services': ['Luggage transport', 'Room escort', 'Valet parking', 'Deliveries', 'Package handling'],
      'Guest Interaction': ['Property orientation', 'Local information', 'Special requests', 'VIP service'],
      'Operations': ['Cart management', 'Lobby presence', 'Coordination with front desk', 'Security awareness']
    },
    certifications: ['Driver\'s license', 'Guest service training'],
    context: 'Bellhops create welcoming first impressions and ensure guests feel cared for from arrival to departure.',
    hiringTip: '"Bellhop at 500-room luxury resort, handling 100+ guest interactions daily with consistently positive feedback. Certified valet with perfect safety record." Show volume and service quality.',
    mistakes: [
      { title: 'Not showing guest interaction volume', detail: 'Daily interactions, luggage handled demonstrates experience' },
      { title: 'Missing valet certification if applicable', detail: 'Valet capability adds significant value' }
    ],
    interviewQuestions: [
      { q: 'How do you handle multiple arrivals at once?', guidance: 'Discuss prioritization while maintaining service quality.' },
      { q: 'What makes a great first impression?', guidance: 'Cover appearance, attitude, and anticipating needs.' }
    ],
    atsKeywords: ['bellhop', 'bell staff', 'hotel', 'luggage', 'guest services', 'hospitality', 'valet']
  },
  {
    slug: 'night-auditor',
    jobTitle: 'Night Auditor',
    avgSalary: '$34,000',
    jobGrowth: '+9%',
    blsUrl: 'https://www.bls.gov/ooh/office-and-administrative-support/hotel-motel-and-resort-desk-clerks.htm',
    keySkills: ['Auditing', 'Front Desk Operations', 'Report Generation', 'Problem Solving', 'Security Awareness', 'PMS Systems', 'Guest Services', 'Attention to Detail'],
    skillCategories: {
      'Auditing': ['Daily revenue audit', 'Posting reconciliation', 'Report generation', 'Discrepancy resolution'],
      'Front Desk': ['Late check-ins', 'Guest services', 'Reservations', 'PMS operation'],
      'Security': ['Property security', 'Emergency procedures', 'Incident reporting', 'Night operations']
    },
    certifications: ['Front desk certification', 'Basic accounting'],
    context: 'Night auditors balance the day\'s accounts while handling front desk duties during overnight hours. Accuracy and independence are essential.',
    hiringTip: '"Night auditor at 300-room hotel, balancing daily revenue of $75K+ with 99.5% accuracy. Independently handle all overnight operations including emergency situations." Show accuracy rates and independent decision-making.',
    mistakes: [
      { title: 'Not highlighting accuracy', detail: 'Audit accuracy percentage demonstrates reliability' },
      { title: 'Missing independent work ability', detail: 'Overnight requires autonomous decision-making' }
    ],
    interviewQuestions: [
      { q: 'How do you handle discrepancies during audit?', guidance: 'Discuss investigation process and resolution.' },
      { q: 'Describe handling an emergency alone at night', guidance: 'Show calm decision-making and proper procedures.' }
    ],
    atsKeywords: ['night auditor', 'hotel', 'auditing', 'front desk', 'overnight', 'hospitality', 'accounting']
  },
  {
    slug: 'event-coordinator',
    jobTitle: 'Event Coordinator',
    avgSalary: '$52,000',
    jobGrowth: '+18%',
    blsUrl: 'https://www.bls.gov/ooh/business-and-financial/meeting-convention-and-event-planners.htm',
    keySkills: ['Event Planning', 'Vendor Management', 'Budget Management', 'Client Relations', 'Logistics', 'Timeline Management', 'Problem Solving', 'Communication'],
    skillCategories: {
      'Planning': ['Event design', 'Timeline creation', 'Vendor coordination', 'Site selection', 'Registration management'],
      'Execution': ['Day-of coordination', 'Crisis management', 'Team direction', 'Setup/teardown'],
      'Business': ['Budget management', 'Contract negotiation', 'Client communication', 'Post-event analysis']
    },
    certifications: ['CMP (Certified Meeting Professional)', 'CSEP (Certified Special Events Professional)'],
    context: 'Event coordinators bring visions to life, managing all details from concept to execution. Organization and adaptability are essential.',
    hiringTip: '"Event coordinator executing 150+ events annually ranging from 20-person meetings to 500-person galas. Managed $2M+ in annual event budgets with consistent client satisfaction." Show event volume, sizes, and budget responsibility.',
    mistakes: [
      { title: 'Not specifying event types and sizes', detail: 'Corporate, social, weddings—different planning skills required' },
      { title: 'Missing budget experience', detail: 'Budget management is crucial—include dollar amounts' }
    ],
    interviewQuestions: [
      { q: 'How do you handle a vendor no-show on event day?', guidance: 'Show contingency planning and crisis management.' },
      { q: 'Describe your planning timeline for a major event', guidance: 'Walk through milestones and organization system.' }
    ],
    atsKeywords: ['event coordinator', 'event planning', 'events', 'meetings', 'corporate events', 'weddings', 'hospitality']
  },
  {
    slug: 'spa-manager',
    jobTitle: 'Spa Manager',
    avgSalary: '$55,000',
    jobGrowth: '+7%',
    blsUrl: 'https://www.bls.gov/ooh/management/food-service-managers.htm',
    keySkills: ['Spa Operations', 'Staff Management', 'Revenue Generation', 'Guest Experience', 'Retail Sales', 'Treatment Knowledge', 'Scheduling', 'Inventory'],
    skillCategories: {
      'Operations': ['Appointment scheduling', 'Treatment menu', 'Facility maintenance', 'Inventory management'],
      'Business': ['Revenue targets', 'Retail sales', 'Marketing', 'P&L responsibility'],
      'Leadership': ['Therapist management', 'Training', 'Quality standards', 'Guest recovery']
    },
    certifications: ['Spa management certification', 'Hospitality management'],
    context: 'Spa managers create relaxing environments while driving revenue. Balancing guest experience with business goals is key.',
    hiringTip: '"Spa manager overseeing 15-treatment-room facility generating $1.5M annually. Increased retail sales 40% and achieved 92% rebooking rate." Show revenue, retail performance, and guest loyalty metrics.',
    mistakes: [
      { title: 'Not including revenue metrics', detail: 'Spa revenue, retail sales, treatment utilization demonstrate business acumen' },
      { title: 'Missing rebooking/loyalty data', detail: 'Guest return rates show experience quality' }
    ],
    interviewQuestions: [
      { q: 'How do you balance a relaxing environment with sales goals?', guidance: 'Discuss subtle, service-focused approach to revenue.' },
      { q: 'Describe your approach to therapist scheduling', guidance: 'Cover utilization optimization while avoiding burnout.' }
    ],
    atsKeywords: ['spa manager', 'spa', 'wellness', 'hospitality', 'resort', 'beauty', 'luxury']
  },
  {
    slug: 'tour-guide',
    jobTitle: 'Tour Guide',
    avgSalary: '$32,000',
    jobGrowth: '+18%',
    blsUrl: 'https://www.bls.gov/ooh/personal-care-and-service/tour-and-travel-guides.htm',
    keySkills: ['Public Speaking', 'Local Knowledge', 'Storytelling', 'Group Management', 'Safety Awareness', 'Customer Service', 'Languages', 'Adaptability'],
    skillCategories: {
      'Guiding': ['Tour narration', 'Group management', 'Timing', 'Route navigation', 'Q&A handling'],
      'Knowledge': ['Local history', 'Cultural information', 'Points of interest', 'Hidden gems'],
      'Service': ['Guest engagement', 'Problem solving', 'Safety management', 'Special accommodations']
    },
    certifications: ['Tour guide certification', 'First aid/CPR', 'Language certifications'],
    context: 'Tour guides bring destinations to life through knowledge and storytelling. Engaging diverse groups while managing logistics is essential.',
    hiringTip: '"Tour guide leading 500+ tours annually for groups up to 40 guests, averaging 4.9/5 rating. Fluent in English, Spanish, and French." Show tour volume, ratings, and language skills.',
    mistakes: [
      { title: 'Not showing tour volume', detail: 'Tours per week/year and group sizes demonstrate experience' },
      { title: 'Missing guest feedback', detail: 'Ratings and reviews prove engagement quality' }
    ],
    interviewQuestions: [
      { q: 'How do you engage a disinterested group?', guidance: 'Show adaptability and audience reading skills.' },
      { q: 'How do you handle a medical emergency during a tour?', guidance: 'Cover safety protocols and calm crisis management.' }
    ],
    atsKeywords: ['tour guide', 'tourism', 'travel', 'hospitality', 'guide', 'sightseeing']
  },
  {
    slug: 'travel-agent',
    jobTitle: 'Travel Agent',
    avgSalary: '$45,000',
    jobGrowth: '+3%',
    blsUrl: 'https://www.bls.gov/ooh/sales/travel-agents.htm',
    keySkills: ['Destination Knowledge', 'Booking Systems', 'Customer Service', 'Sales', 'Itinerary Planning', 'Problem Solving', 'Supplier Relations', 'Budget Management'],
    skillCategories: {
      'Planning': ['Itinerary design', 'Destination expertise', 'Budget optimization', 'Custom packages'],
      'Technical': ['GDS systems (Amadeus, Sabre)', 'Booking platforms', 'Travel insurance'],
      'Sales': ['Client consultations', 'Upselling', 'Relationship building', 'Referral generation']
    },
    certifications: ['CTA (Certified Travel Associate)', 'CTC (Certified Travel Counselor)', 'Destination specialist certifications'],
    context: 'Travel agents create memorable journeys through expertise and personalized service. Building client relationships and supplier networks is essential.',
    hiringTip: '"Travel agent with $1.2M in annual bookings, specializing in luxury honeymoons and adventure travel. 85% repeat client rate with extensive supplier partnerships." Show booking volume, specialization, and client loyalty.',
    mistakes: [
      { title: 'Not showing booking volume', detail: 'Annual sales demonstrate success in commission-based work' },
      { title: 'Missing specialization', detail: 'Luxury, adventure, cruises, corporate—niche expertise adds value' }
    ],
    interviewQuestions: [
      { q: 'How do you handle a trip that goes wrong?', guidance: 'Show problem-solving, advocacy, and client support during crises.' },
      { q: 'Describe your client consultation process', guidance: 'Cover needs assessment and personalized recommendation approach.' }
    ],
    atsKeywords: ['travel agent', 'travel', 'tourism', 'GDS', 'Amadeus', 'Sabre', 'bookings', 'hospitality']
  },
  {
    slug: 'casino-dealer',
    jobTitle: 'Casino Dealer',
    avgSalary: '$35,000',
    jobGrowth: '+5%',
    blsUrl: 'https://www.bls.gov/ooh/personal-care-and-service/gaming-services-workers.htm',
    keySkills: ['Game Dealing', 'Mathematics', 'Customer Service', 'Rules Knowledge', 'Chip Handling', 'Security Awareness', 'Multi-tasking', 'Composure'],
    skillCategories: {
      'Dealing': ['Blackjack', 'Poker', 'Roulette', 'Craps', 'Baccarat', 'Chip handling'],
      'Operations': ['Game pace', 'Payouts', 'Game protection', 'Procedure compliance'],
      'Service': ['Player engagement', 'Tipping etiquette', 'Problem resolution', 'VIP service']
    },
    certifications: ['Gaming license', 'Dealer school certification'],
    context: 'Casino dealers operate table games while creating entertaining experiences. Accuracy, speed, and customer engagement are essential.',
    hiringTip: '"Casino dealer certified in blackjack, poker, roulette, and craps. 5 years at major Las Vegas property with consistent player compliments and zero game protection incidents." Show games dealt, experience, and compliance record.',
    mistakes: [
      { title: 'Not listing specific games', detail: 'Each game requires different skills—list all certifications' },
      { title: 'Missing compliance record', detail: 'Game protection and procedure compliance demonstrate trustworthiness' }
    ],
    interviewQuestions: [
      { q: 'How do you handle an angry losing player?', guidance: 'Show composure, empathy, and de-escalation skills.' },
      { q: 'Describe game protection awareness', guidance: 'Cover cheating detection without accusing guests.' }
    ],
    atsKeywords: ['casino dealer', 'dealer', 'gaming', 'casino', 'blackjack', 'poker', 'table games']
  },
  {
    slug: 'cruise-ship-worker',
    jobTitle: 'Cruise Ship Worker',
    avgSalary: '$36,000',
    jobGrowth: '+15%',
    blsUrl: 'https://www.bls.gov/ooh/transportation-and-material-moving/water-transportation-occupations.htm',
    keySkills: ['Customer Service', 'Flexibility', 'Living Aboard', 'Multi-cultural Environment', 'Long Hours', 'Safety Training', 'Specific Department Skills', 'Team Living'],
    skillCategories: {
      'Service': ['Guest services', 'Food/beverage', 'Entertainment', 'Housekeeping', 'Retail'],
      'Maritime': ['Safety training', 'Emergency procedures', 'Shipboard protocols'],
      'Lifestyle': ['Extended contracts', 'Shared living', 'Multi-cultural teams', 'Flexibility']
    },
    certifications: ['STCW certification', 'ENG1 medical', 'Department-specific certifications'],
    context: 'Cruise ship workers live and work aboard ships for months at a time. Adaptability and customer service excellence are essential.',
    hiringTip: '"Cruise ship guest services agent with 3 years on luxury cruise line, completing 12 contracts. Consistently rated top performer for guest satisfaction." Show contract experience, line type, and ratings.',
    mistakes: [
      { title: 'Not addressing shipboard lifestyle', detail: 'Show you understand and embrace living aboard' },
      { title: 'Missing contract history', detail: 'Completed contracts demonstrate reliability for this unique work' }
    ],
    interviewQuestions: [
      { q: 'Why do you want to work on a cruise ship?', guidance: 'Show understanding of lifestyle and genuine interest.' },
      { q: 'How do you handle months away from home?', guidance: 'Demonstrate mental preparation and coping strategies.' }
    ],
    atsKeywords: ['cruise ship', 'cruise', 'maritime', 'hospitality', 'guest services', 'STCW']
  },
  {
    slug: 'valet-attendant',
    jobTitle: 'Valet Attendant',
    avgSalary: '$30,000',
    jobGrowth: '+6%',
    blsUrl: 'https://www.bls.gov/ooh/transportation-and-material-moving/parking-attendants.htm',
    keySkills: ['Driving Skills', 'Customer Service', 'Vehicle Care', 'Speed', 'Memory', 'Physical Fitness', 'Cash Handling', 'Professionalism'],
    skillCategories: {
      'Driving': ['Manual transmission', 'Luxury vehicles', 'SUVs/trucks', 'Safe parking'],
      'Service': ['Guest greeting', 'Vehicle retrieval', 'Key management', 'Tip handling'],
      'Operations': ['Lot organization', 'Traffic management', 'Vehicle inspection', 'Damage documentation']
    },
    certifications: ['Valid driver\'s license', 'Clean driving record'],
    context: 'Valet attendants create first impressions while safely handling guests\' vehicles. Speed, care, and professionalism are essential.',
    hiringTip: '"Valet attendant at luxury hotel parking 100+ vehicles nightly, experienced with exotic and luxury vehicles. Perfect safety record with no damage claims." Show volume, vehicle types, and safety record.',
    mistakes: [
      { title: 'Not highlighting clean driving record', detail: 'No accidents/tickets is essential for valet positions' },
      { title: 'Missing vehicle experience', detail: 'Luxury, manual transmission, exotics—show vehicle comfort' }
    ],
    interviewQuestions: [
      { q: 'Can you drive manual transmission?', guidance: 'Be honest—luxury venues often have manual vehicles.' },
      { q: 'How do you handle a busy arrival rush?', guidance: 'Discuss prioritization while maintaining care and service.' }
    ],
    atsKeywords: ['valet', 'parking', 'driver', 'hospitality', 'hotel', 'automotive', 'guest services']
  },
  {
    slug: 'reservation-agent',
    jobTitle: 'Reservation Agent',
    avgSalary: '$35,000',
    jobGrowth: '+9%',
    blsUrl: 'https://www.bls.gov/ooh/office-and-administrative-support/reservation-and-transportation-ticket-agents-and-travel-clerks.htm',
    keySkills: ['Phone Skills', 'Reservation Systems', 'Upselling', 'Customer Service', 'Problem Solving', 'Multi-tasking', 'Product Knowledge', 'Data Entry'],
    skillCategories: {
      'Reservations': ['Booking processing', 'Modification handling', 'Cancellations', 'Group bookings'],
      'Sales': ['Upselling', 'Package promotion', 'Loyalty enrollment', 'Revenue optimization'],
      'Technical': ['CRS/PMS systems', 'Phone systems', 'Email communication', 'Rate management']
    },
    certifications: ['Call center training', 'Product certifications'],
    context: 'Reservation agents convert inquiries into bookings. Phone presence, product knowledge, and sales ability drive success.',
    hiringTip: '"Reservation agent handling 80+ calls daily with 45% conversion rate and $150 average booking value. Top performer in upselling and loyalty enrollments." Show call volume, conversion rates, and sales metrics.',
    mistakes: [
      { title: 'Not showing conversion metrics', detail: 'Conversion rate and booking value demonstrate sales effectiveness' },
      { title: 'Missing system experience', detail: 'List specific reservation systems used' }
    ],
    interviewQuestions: [
      { q: 'How do you handle price objections?', guidance: 'Show value-based selling without discounting.' },
      { q: 'Describe your upselling technique', guidance: 'Natural, guest-focused approach to higher-value bookings.' }
    ],
    atsKeywords: ['reservation agent', 'reservations', 'call center', 'hospitality', 'booking', 'hotel', 'travel']
  }
];

function generateMDXContent(job, authorName) {
  const currentDate = new Date().toISOString().split('T')[0];
  const year = new Date().getFullYear();

  let skillsSection = '## Essential Skills\n\n';
  for (const [cat, skills] of Object.entries(job.skillCategories)) {
    skillsSection += `### ${cat}\n`;
    skills.forEach(s => skillsSection += `- ${s}\n`);
    skillsSection += '\n';
  }

  let certSection = '## Certifications\n\n';
  job.certifications.forEach(c => certSection += `- ${c}\n`);

  let mistakesSection = '## Common Mistakes\n\n';
  job.mistakes.forEach(m => mistakesSection += `### ${m.title}\n\n${m.detail}\n\n`);

  let interviewSection = `## Interview Questions\n\n`;
  job.interviewQuestions.forEach(q => interviewSection += `### "${q.q}"\n\n${q.guidance}\n\n`);

  return `---
title: '${job.jobTitle} Resume: Examples & Writing Guide ${year}'
slug: ${job.slug}
description: >-
  ${job.jobTitle} resume example with professional format. Highlight hospitality skills and guest service experience.
cardSummary: >-
  Get hired in hospitality. See how ${job.jobTitle}s showcase ${job.keySkills[0]} and guest experience wins.
date: '${currentDate}'
author: ${authorName}
category: Hospitality
tags:
  - ${job.slug.replace(/-/g, ' ')} resume
  - hospitality resume
  - hotel resume
  - guest services
  - resume format
image: /images/resume-examples/${job.slug}.png
imageAlt: ${job.jobTitle} Resume Example
featured: false
jobTitle: ${job.jobTitle}
avgSalary: '${job.avgSalary}'
jobGrowth: ${job.jobGrowth}
keySkills:
${job.keySkills.map(s => `  - ${s}`).join('\n')}
faq:
  - question: What skills should I put on a ${job.jobTitle} resume?
    answer: >-
      Include ${job.keySkills.slice(0,3).join(', ')} and other hospitality competencies relevant to the position.
  - question: How much does a ${job.jobTitle} make?
    answer: >-
      ${job.jobTitle} professionals earn an average of ${job.avgSalary}, with ${job.jobGrowth} projected growth.
---
## What Makes a Great ${job.jobTitle} Resume?

${job.context} With ${job.jobGrowth} growth and ${job.avgSalary} average salary, ${job.jobTitle} roles offer solid hospitality careers.

## Professional Summary Examples

**Entry-Level:** "Enthusiastic ${job.jobTitle} with training in ${job.keySkills[0]} and ${job.keySkills[1]}. Strong commitment to guest satisfaction and team success."

**Experienced:** "Skilled ${job.jobTitle} with 4+ years in hospitality. Proven record in ${job.keySkills[0]} and ${job.keySkills[2]} with excellent guest feedback."

## Salary & Outlook

${job.jobTitle} professionals earn approximately **${job.avgSalary}** with **${job.jobGrowth}** growth projected.

**Sources:** [BLS](${job.blsUrl}), [Glassdoor](https://www.glassdoor.com/Salaries/), [PayScale](https://www.payscale.com/).

${certSection}

${skillsSection}

${mistakesSection}

## Hiring Manager Tip

> **${job.jobTitle} resumes with guest satisfaction metrics and operational achievements get prioritized.**

${job.hiringTip}

${interviewSection}

## ATS Keywords

${job.atsKeywords.map(k => `- ${k}`).join('\n')}

Ready to build your ${job.jobTitle} resume? [Try our AI-powered resume builder](/builder).
`;
}

console.log('🚀 Generating Hospitality resume examples...\n');
let created = 0, skipped = 0;

HOSPITALITY_JOBS.forEach((job, i) => {
  const filePath = path.join(CONTENT_DIR, `${job.slug}.mdx`);
  if (fs.existsSync(filePath)) {
    console.log(`⏭️  Skipped: ${job.slug}.mdx (exists)`);
    skipped++;
    return;
  }
  fs.writeFileSync(filePath, generateMDXContent(job, getAuthor(i)), 'utf-8');
  console.log(`✅ Created: ${job.slug}.mdx`);
  created++;
});

console.log(`\n📊 Summary: ✅ ${created} created, ⏭️ ${skipped} skipped, 📁 ${HOSPITALITY_JOBS.length} total`);
