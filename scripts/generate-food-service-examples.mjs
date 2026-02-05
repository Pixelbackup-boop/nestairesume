#!/usr/bin/env node
/**
 * Generate 15 Food Service resume example MDX files
 * Following SEO content guidelines from CLAUDE.md
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT_DIR = path.join(__dirname, '../frontend/content/resume-examples');

const AUTHORS = ['Ken Coleman', 'Jessica Park'];

function getAuthor(index) {
  return AUTHORS[index % AUTHORS.length];
}

const FOOD_SERVICE_JOBS = [
  {
    slug: 'executive-chef',
    jobTitle: 'Executive Chef',
    avgSalary: '$75,000',
    jobGrowth: '+6%',
    blsUrl: 'https://www.bls.gov/ooh/food-preparation-and-serving/chefs-and-head-cooks.htm',
    keySkills: ['Menu Development', 'Kitchen Management', 'Food Cost Control', 'Staff Training', 'Culinary Arts', 'Inventory Management', 'Health & Safety', 'Vendor Relations'],
    skillCategories: {
      'Culinary Leadership': ['Menu creation', 'Recipe development', 'Plating and presentation', 'Culinary trends', 'Seasonal menu planning'],
      'Business Operations': ['Food cost management', 'Labor scheduling', 'Inventory control', 'Vendor negotiations', 'Budget management'],
      'Team Management': ['Staff hiring and training', 'Kitchen brigade management', 'Performance evaluation', 'Mentoring sous chefs', 'Cross-training']
    },
    certifications: ['Culinary degree', 'ServSafe certification', 'HACCP certification', 'Food handler\'s permit', 'ACF certification'],
    context: 'Executive chefs lead kitchen operations, creating menus, managing staff, and controlling costs. The role combines culinary artistry with business acumen.',
    hiringTip: 'I look for chefs who balance creativity with profitability. "Executive chef managing $2.5M annual food budget, reduced food cost from 34% to 28% while maintaining quality, grew revenue 20% through seasonal menu innovations." Include cuisine types, restaurant styles (fine dining, casual, hotel), and team size managed. Awards, reviews, and press mentions add credibility.',
    mistakes: [
      { title: 'Only listing culinary skills without business metrics', detail: 'Include food cost percentage, labor cost, revenue growth, and cover counts. Business impact matters as much as culinary skill' },
      { title: 'Missing cuisine and restaurant type', detail: 'Fine dining, casual, hotel, catering—specify your experience. French, Italian, Asian fusion—cuisine expertise matters' },
      { title: 'No team management details', detail: 'Include kitchen size, staff trained, and leadership examples. Chefs who develop talent are valued' },
      { title: 'Ignoring awards and recognition', detail: 'Reviews, awards, media features—include recognition that validates your culinary reputation' },
      { title: 'Not showing career progression', detail: 'Line cook to sous to executive—show your culinary journey and growth' }
    ],
    interviewQuestions: [
      { q: 'How do you balance creativity with food cost targets?', guidance: 'Discuss menu engineering, ingredient utilization, and maintaining quality while hitting margins.' },
      { q: 'Describe your approach to menu development', guidance: 'Cover inspiration, testing, costing, and seasonal rotation strategies.' },
      { q: 'How do you handle kitchen staff conflicts?', guidance: 'Kitchens are high-pressure. Discuss leadership, communication, and maintaining team cohesion.' },
      { q: 'Tell me about a dish you created that became a signature item', guidance: 'Show creativity, process, and customer response. Chefs should have memorable creations.' },
      { q: 'How do you stay current with culinary trends?', guidance: 'Discuss travel, research, dining out, and incorporating trends while maintaining your style.' }
    ],
    atsKeywords: ['executive chef', 'chef', 'kitchen management', 'menu development', 'food cost', 'culinary', 'fine dining', 'restaurant', 'cuisine', 'food safety']
  },
  {
    slug: 'sous-chef',
    jobTitle: 'Sous Chef',
    avgSalary: '$55,000',
    jobGrowth: '+6%',
    blsUrl: 'https://www.bls.gov/ooh/food-preparation-and-serving/chefs-and-head-cooks.htm',
    keySkills: ['Kitchen Operations', 'Line Management', 'Food Preparation', 'Inventory Control', 'Staff Supervision', 'Quality Control', 'Recipe Execution', 'Safety Compliance'],
    skillCategories: {
      'Kitchen Operations': ['Line supervision', 'Expediting', 'Station management', 'Prep oversight', 'Service execution'],
      'Culinary Skills': ['Recipe execution', 'Sauce work', 'Protein preparation', 'Plating standards', 'Mise en place'],
      'Management': ['Staff scheduling', 'Training line cooks', 'Inventory ordering', 'Food cost monitoring', 'Health inspections']
    },
    certifications: ['Culinary degree', 'ServSafe Manager', 'Food handler certification', 'HACCP certification'],
    context: 'Sous chefs are the executive chef\'s right hand, managing daily kitchen operations and ensuring consistent food quality during service.',
    hiringTip: 'Sous chefs need to run service seamlessly when the exec is absent. "Sous chef managing 12-person kitchen, responsible for daily prep, line management, and $400K monthly food orders." Show you can handle both culinary execution and administrative duties. Include covers per service, cuisine style, and any signature dishes you\'ve contributed.',
    mistakes: [
      { title: 'Not demonstrating leadership readiness', detail: 'Show you can run the kitchen independently. Include examples of managing service without the executive chef' },
      { title: 'Missing operational metrics', detail: 'Covers per service, prep volume, staff size—quantify your operational experience' },
      { title: 'Ignoring administrative skills', detail: 'Ordering, scheduling, inventory—sous chefs handle significant admin work. Include this experience' },
      { title: 'No mention of training or mentoring', detail: 'Sous chefs develop line cooks. Include training and development contributions' },
      { title: 'Only listing cooking skills', detail: 'Balance culinary abilities with management and operational capabilities' }
    ],
    interviewQuestions: [
      { q: 'How do you prepare for a busy service?', guidance: 'Discuss mise en place, staff briefings, anticipating needs, and backup plans.' },
      { q: 'Describe how you handle a kitchen that\'s falling behind during service', guidance: 'Show calm leadership, problem-solving, and communication under pressure.' },
      { q: 'How do you train new line cooks?', guidance: 'Discuss onboarding, standards, observation, and feedback processes.' },
      { q: 'Tell me about your experience with inventory management', guidance: 'Cover ordering, receiving, storage, and waste reduction.' },
      { q: 'What\'s your goal for your culinary career?', guidance: 'Show ambition while demonstrating commitment to the sous chef role.' }
    ],
    atsKeywords: ['sous chef', 'kitchen management', 'line supervision', 'food preparation', 'inventory', 'culinary', 'restaurant', 'service', 'cooking']
  },
  {
    slug: 'line-cook',
    jobTitle: 'Line Cook',
    avgSalary: '$35,000',
    jobGrowth: '+16%',
    blsUrl: 'https://www.bls.gov/ooh/food-preparation-and-serving/cooks.htm',
    keySkills: ['Station Management', 'Food Preparation', 'Cooking Techniques', 'Food Safety', 'Speed & Efficiency', 'Team Coordination', 'Recipe Following', 'Cleanliness'],
    skillCategories: {
      'Cooking Skills': ['Grill', 'Sauté', 'Fry', 'Garde manger', 'Pastry basics', 'Sauce preparation'],
      'Kitchen Operations': ['Station setup', 'Mise en place', 'Ticket timing', 'Plating', 'Food storage'],
      'Professionalism': ['Speed under pressure', 'Consistency', 'Cleanliness', 'Team communication', 'Taking direction']
    },
    certifications: ['Food handler\'s permit', 'ServSafe certification', 'Culinary school (preferred)'],
    context: 'Line cooks are the backbone of kitchen operations, executing dishes consistently during high-volume service.',
    hiringTip: '"Line cook working grill station in 200-cover fine dining restaurant, consistently meeting 12-minute ticket times with zero remakes." That tells me you can handle pressure and deliver quality. Include stations worked (grill, sauté, garde manger, pastry), restaurant volume and style, and any culinary training. Speed, consistency, and reliability are what I\'m looking for.',
    mistakes: [
      { title: 'Not specifying stations worked', detail: 'Grill, sauté, fry, garde manger, pastry—list all stations you\'re proficient in' },
      { title: 'Missing restaurant volume context', detail: 'Covers per night, ticket times, restaurant style—context shows your experience level' },
      { title: 'Ignoring speed and consistency', detail: 'Ticket times, remake rates, handling rushes—demonstrate reliability under pressure' },
      { title: 'No mention of culinary training', detail: 'Culinary school, apprenticeships, or training programs show investment in the craft' },
      { title: 'Not showing progression potential', detail: 'Express interest in growth—line cooks who want to advance are valuable' }
    ],
    interviewQuestions: [
      { q: 'What stations are you most comfortable working?', guidance: 'Be honest about your strengths while showing willingness to work any station.' },
      { q: 'How do you handle a rush when tickets are backing up?', guidance: 'Discuss prioritization, communication, and staying calm under pressure.' },
      { q: 'Describe your mise en place routine', guidance: 'Show organized preparation habits that set up successful service.' },
      { q: 'What do you do when you make a mistake on a dish?', guidance: 'Honesty, quick correction, and learning from mistakes are valued.' },
      { q: 'Why do you want to work in this kitchen?', guidance: 'Show knowledge of the restaurant and genuine interest in the cuisine or team.' }
    ],
    atsKeywords: ['line cook', 'cook', 'kitchen', 'food preparation', 'grill', 'sauté', 'restaurant', 'culinary', 'food service']
  },
  {
    slug: 'prep-cook',
    jobTitle: 'Prep Cook',
    avgSalary: '$30,000',
    jobGrowth: '+16%',
    blsUrl: 'https://www.bls.gov/ooh/food-preparation-and-serving/cooks.htm',
    keySkills: ['Food Preparation', 'Knife Skills', 'Recipe Following', 'Food Safety', 'Organization', 'Time Management', 'Inventory Rotation', 'Cleaning'],
    skillCategories: {
      'Prep Skills': ['Knife cuts', 'Vegetable preparation', 'Protein portioning', 'Sauce making', 'Stock preparation'],
      'Organization': ['Mise en place', 'Labeling and dating', 'FIFO rotation', 'Walk-in organization', 'Prep lists'],
      'Safety & Cleanliness': ['Food safety', 'Cross-contamination prevention', 'Proper storage', 'Station cleanliness', 'Equipment care']
    },
    certifications: ['Food handler\'s permit', 'ServSafe certification'],
    context: 'Prep cooks set up line cooks for success by preparing ingredients before service. Speed, consistency, and organization are essential.',
    hiringTip: '"Prep cook completing prep lists for 150-cover restaurant, responsible for vegetable prep, sauce production, and protein portioning." Show volume handled, prep types, and reliability. Knife skills and organization are key—if you can julienne onions perfectly at speed and keep the walk-in organized, you\'re valuable.',
    mistakes: [
      { title: 'Not mentioning volume and restaurant type', detail: 'How many covers does your prep support? What type of cuisine? Context matters' },
      { title: 'Missing knife skill details', detail: 'Classic cuts, speed, consistency—describe your knife proficiency' },
      { title: 'Ignoring organization abilities', detail: 'Walk-in organization, FIFO, labeling—organization prevents waste and enables service' },
      { title: 'No food safety emphasis', detail: 'Proper storage, temperatures, cross-contamination prevention—safety is fundamental' },
      { title: 'Not showing advancement interest', detail: 'Prep cook is often an entry point. Show desire to learn and grow' }
    ],
    interviewQuestions: [
      { q: 'Describe your knife skills', guidance: 'Discuss classic cuts you\'re comfortable with and your speed/consistency.' },
      { q: 'How do you prioritize a long prep list?', guidance: 'Show organizational thinking and understanding of what needs to happen first.' },
      { q: 'What do you do if you\'re running behind on prep?', guidance: 'Communication with chef, prioritization, and problem-solving.' },
      { q: 'Explain FIFO and why it matters', guidance: 'First In First Out prevents waste and ensures food safety.' },
      { q: 'What do you want to learn in this kitchen?', guidance: 'Show eagerness to develop skills and advance.' }
    ],
    atsKeywords: ['prep cook', 'food preparation', 'kitchen', 'knife skills', 'mise en place', 'food safety', 'culinary', 'restaurant']
  },
  {
    slug: 'pastry-chef',
    jobTitle: 'Pastry Chef',
    avgSalary: '$55,000',
    jobGrowth: '+6%',
    blsUrl: 'https://www.bls.gov/ooh/food-preparation-and-serving/chefs-and-head-cooks.htm',
    keySkills: ['Baking', 'Dessert Creation', 'Pastry Arts', 'Chocolate Work', 'Bread Making', 'Menu Development', 'Food Costing', 'Presentation'],
    skillCategories: {
      'Pastry Skills': ['Laminated doughs', 'Chocolate tempering', 'Sugar work', 'Plated desserts', 'Bread production'],
      'Baking': ['Cakes and tortes', 'Tarts and pies', 'Cookies and confections', 'Custards and creams', 'Frozen desserts'],
      'Management': ['Dessert menu development', 'Recipe costing', 'Production scheduling', 'Pastry team leadership', 'Event planning']
    },
    certifications: ['Pastry arts degree', 'ServSafe certification', 'Chocolate certifications', 'ACF Pastry Chef certification'],
    context: 'Pastry chefs create desserts, breads, and pastries. The role requires precision, artistry, and understanding of the chemistry behind baking.',
    hiringTip: '"Pastry chef creating dessert program for 120-seat fine dining restaurant, producing 80+ covers nightly plus bread service and special event cakes." Include your repertoire (chocolate, plated desserts, bread, wedding cakes), volume, and any signature creations. Photos of your work speak volumes—consider including portfolio links.',
    mistakes: [
      { title: 'Not showing range of skills', detail: 'Chocolate, laminated dough, plated desserts, bread—show breadth of pastry expertise' },
      { title: 'Missing production volume', detail: 'Covers per night, breads per day, cakes per week—numbers show your capability' },
      { title: 'Ignoring business aspects', detail: 'Food cost, menu development, vendor relations—pastry is still a business' },
      { title: 'No portfolio or photos', detail: 'Pastry is visual. Links to photos of your work demonstrate skill better than words' },
      { title: 'Not mentioning special events', detail: 'Weddings, events, holidays—high-pressure pastry experience adds value' }
    ],
    interviewQuestions: [
      { q: 'What pastry techniques are you most skilled in?', guidance: 'Discuss your strengths: laminated dough, chocolate work, plated desserts, bread.' },
      { q: 'How do you develop a new dessert menu?', guidance: 'Cover seasonality, creativity, costing, and balancing with the savory menu.' },
      { q: 'Describe a challenging custom cake or event', guidance: 'Show problem-solving, creativity under pressure, and execution.' },
      { q: 'How do you manage production for high-volume service?', guidance: 'Discuss scheduling, prep timing, and organization.' },
      { q: 'What inspires your pastry creations?', guidance: 'Show passion and creativity—pastry chefs should have artistic vision.' }
    ],
    atsKeywords: ['pastry chef', 'baker', 'desserts', 'pastry', 'baking', 'chocolate', 'bread', 'culinary', 'fine dining']
  },
  {
    slug: 'baker',
    jobTitle: 'Baker',
    avgSalary: '$32,000',
    jobGrowth: '+8%',
    blsUrl: 'https://www.bls.gov/ooh/production/bakers.htm',
    keySkills: ['Bread Making', 'Pastry Production', 'Recipe Following', 'Dough Handling', 'Oven Management', 'Food Safety', 'Inventory', 'Quality Control'],
    skillCategories: {
      'Bread Skills': ['Artisan breads', 'Commercial breads', 'Sourdough', 'Laminated doughs', 'Bagels and rolls'],
      'Pastry Skills': ['Cakes', 'Cookies', 'Muffins', 'Pies', 'Basic decorating'],
      'Operations': ['Production scheduling', 'Oven management', 'Scaling recipes', 'Ingredient management', 'Equipment maintenance']
    },
    certifications: ['Food handler\'s permit', 'Baking/pastry certification', 'ServSafe certification'],
    context: 'Bakers produce breads, pastries, and baked goods, often working early morning hours. The role combines craft skill with production efficiency.',
    hiringTip: '"Baker producing 500+ units daily including artisan breads, croissants, and pastries for retail bakery and wholesale accounts." Include production volume, types of products, and any specialties (sourdough, laminated, gluten-free). Early morning reliability is essential—demonstrate consistent attendance.',
    mistakes: [
      { title: 'Not specifying product types', detail: 'Bread, pastry, retail, wholesale—different settings require different skills' },
      { title: 'Missing production volume', detail: 'Units per day, pounds of dough handled—volume shows capability' },
      { title: 'Ignoring specialty skills', detail: 'Sourdough, laminated, gluten-free, decorated cakes—specialties add value' },
      { title: 'No mention of consistency', detail: 'Product consistency day after day is essential. Address reliability' },
      { title: 'Not addressing early hours', detail: 'Bakers work early. Demonstrating reliability for those hours matters' }
    ],
    interviewQuestions: [
      { q: 'What types of baking are you most experienced with?', guidance: 'Discuss bread vs pastry, artisan vs production, retail vs wholesale.' },
      { q: 'How do you ensure consistency in your baked goods?', guidance: 'Cover measuring, timing, temperature control, and quality checks.' },
      { q: 'Describe your sourdough or artisan bread experience', guidance: 'If applicable, discuss starters, fermentation, and specialty techniques.' },
      { q: 'How do you handle the early morning schedule?', guidance: 'Show you understand and can reliably manage baker\'s hours.' },
      { q: 'What do you do when a batch doesn\'t turn out right?', guidance: 'Discuss troubleshooting, waste prevention, and learning from mistakes.' }
    ],
    atsKeywords: ['baker', 'baking', 'bread', 'pastry', 'bakery', 'production', 'artisan', 'dough', 'food production']
  },
  {
    slug: 'restaurant-manager',
    jobTitle: 'Restaurant Manager',
    avgSalary: '$60,000',
    jobGrowth: '+10%',
    blsUrl: 'https://www.bls.gov/ooh/management/food-service-managers.htm',
    keySkills: ['Operations Management', 'Staff Leadership', 'Customer Service', 'P&L Management', 'Inventory Control', 'Scheduling', 'Health & Safety', 'Training'],
    skillCategories: {
      'Operations': ['Daily operations', 'Service standards', 'Quality control', 'Vendor management', 'Health inspections'],
      'Financial': ['P&L responsibility', 'Labor cost control', 'Inventory management', 'Sales analysis', 'Budgeting'],
      'Leadership': ['Hiring and training', 'Staff scheduling', 'Performance management', 'Team motivation', 'Conflict resolution']
    },
    certifications: ['ServSafe Manager', 'Food handler\'s permit', 'TIPS certification', 'Restaurant management certification'],
    context: 'Restaurant managers oversee all aspects of restaurant operations, from guest experience to profitability. The role demands leadership, business sense, and hospitality passion.',
    hiringTip: '"Restaurant manager for 150-seat casual dining location generating $3M annually, achieved 15% revenue growth while reducing labor cost by 3 points." Show me financial impact, team size, and operational achievements. Include P&L responsibility, cover counts, and any turnaround or opening experience. Guest satisfaction scores matter—include NPS or review ratings.',
    mistakes: [
      { title: 'Not including financial metrics', detail: 'Revenue, labor cost percentage, food cost, P&L responsibility—business results matter' },
      { title: 'Missing restaurant details', detail: 'Seats, revenue, covers, cuisine—context shows your experience level' },
      { title: 'Ignoring guest satisfaction data', detail: 'Review scores, NPS, repeat customer rates—guest experience is measurable' },
      { title: 'No staff development examples', detail: 'Turnover reduction, promotions, training programs—leadership impact matters' },
      { title: 'Not showing problem-solving', detail: 'Every restaurant has challenges. Include examples of issues solved' }
    ],
    interviewQuestions: [
      { q: 'Tell me about your P&L experience', guidance: 'Discuss revenue targets, cost control, and financial decision-making.' },
      { q: 'How do you handle an unhappy guest?', guidance: 'Show service recovery skills, empathy, and empowerment to resolve issues.' },
      { q: 'Describe your approach to reducing turnover', guidance: 'Cover hiring, training, culture, and retention strategies.' },
      { q: 'How do you prepare for health inspections?', guidance: 'Discuss daily standards, training, and maintaining inspection-ready status.' },
      { q: 'Tell me about a time you turned around a struggling shift or period', guidance: 'Show problem diagnosis, action taken, and measurable improvement.' }
    ],
    atsKeywords: ['restaurant manager', 'manager', 'food service', 'operations', 'P&L', 'hospitality', 'customer service', 'leadership']
  },
  {
    slug: 'food-service-worker',
    jobTitle: 'Food Service Worker',
    avgSalary: '$28,000',
    jobGrowth: '+9%',
    blsUrl: 'https://www.bls.gov/ooh/food-preparation-and-serving/food-preparation-workers.htm',
    keySkills: ['Food Preparation', 'Customer Service', 'Cleanliness', 'Cash Handling', 'Food Safety', 'Teamwork', 'Speed', 'Reliability'],
    skillCategories: {
      'Food Service': ['Food preparation', 'Serving', 'Beverage service', 'Portion control', 'Food assembly'],
      'Customer Interaction': ['Order taking', 'Customer service', 'Cash handling', 'POS systems', 'Handling complaints'],
      'Operations': ['Cleaning and sanitation', 'Stocking', 'Inventory rotation', 'Equipment operation', 'Safety compliance']
    },
    certifications: ['Food handler\'s permit', 'ServSafe certification'],
    context: 'Food service workers prepare and serve food in various settings—cafeterias, healthcare, schools, and quick service. Reliability and food safety are paramount.',
    hiringTip: '"Food service worker in hospital cafeteria serving 500+ meals daily, maintaining food safety standards and 95% customer satisfaction." Include setting (hospital, school, corporate), volume, and any special populations served (patients, students). Perfect attendance and flexibility with scheduling are highly valued in food service.',
    mistakes: [
      { title: 'Not specifying setting', detail: 'Hospital, school, corporate, quick service—different settings have different requirements' },
      { title: 'Missing volume served', detail: 'Meals per day, customers per shift—numbers show your capability' },
      { title: 'Ignoring food safety training', detail: 'Food handler\'s permit is often required. Include all food safety certifications' },
      { title: 'No attendance/reliability mentioned', detail: 'Showing up is essential in food service. Highlight your reliability' },
      { title: 'Not mentioning customer interaction', detail: 'Most food service roles involve customers. Include service skills' }
    ],
    interviewQuestions: [
      { q: 'What food service experience do you have?', guidance: 'Describe settings, duties, and volume handled.' },
      { q: 'How do you ensure food safety?', guidance: 'Cover temperature control, handwashing, cross-contamination prevention.' },
      { q: 'Describe a time you handled a difficult customer', guidance: 'Show patience, problem-solving, and maintaining professionalism.' },
      { q: 'How do you handle working when it\'s very busy?', guidance: 'Discuss prioritization, teamwork, and staying calm under pressure.' },
      { q: 'Are you able to work flexible hours including weekends?', guidance: 'Food service often requires flexible scheduling. Be honest about availability.' }
    ],
    atsKeywords: ['food service worker', 'food service', 'cafeteria', 'food preparation', 'customer service', 'food safety', 'hospital', 'school']
  },
  {
    slug: 'catering-manager',
    jobTitle: 'Catering Manager',
    avgSalary: '$55,000',
    jobGrowth: '+10%',
    blsUrl: 'https://www.bls.gov/ooh/management/food-service-managers.htm',
    keySkills: ['Event Planning', 'Sales', 'Client Relations', 'Budget Management', 'Staff Coordination', 'Logistics', 'Menu Planning', 'Vendor Management'],
    skillCategories: {
      'Sales & Client Service': ['Lead generation', 'Client consultations', 'Proposal writing', 'Relationship management', 'Upselling'],
      'Event Execution': ['Event planning', 'Timeline management', 'Staff scheduling', 'Logistics coordination', 'On-site management'],
      'Business Operations': ['Budgeting', 'Vendor negotiation', 'Inventory management', 'Quality control', 'Post-event follow-up']
    },
    certifications: ['ServSafe Manager', 'Event planning certification', 'CMP (Certified Meeting Professional)'],
    context: 'Catering managers oversee off-premise food service for events, managing sales, planning, and execution. Success requires sales ability and operational excellence.',
    hiringTip: '"Catering manager generating $1.5M annual revenue across 200+ events, maintaining 90% client rebooking rate." Show revenue generated, event volume, and client satisfaction. Include event types (corporate, weddings, social), size range, and any signature events. Sales ability and operational execution must both be evident.',
    mistakes: [
      { title: 'Not showing revenue responsibility', detail: 'Annual revenue, average event size, sales growth—catering is a revenue-driven business' },
      { title: 'Missing event volume and types', detail: 'Events per month, size range, corporate vs social—show your experience breadth' },
      { title: 'Ignoring client relationship metrics', detail: 'Rebooking rate, referrals, client feedback—relationships drive catering success' },
      { title: 'No operational execution examples', detail: 'Balance sales skills with examples of flawless event execution' },
      { title: 'Not mentioning team coordination', detail: 'Catering requires coordinating many moving parts. Show leadership skills' }
    ],
    interviewQuestions: [
      { q: 'Tell me about your sales approach for catering', guidance: 'Discuss lead generation, consultations, proposals, and closing.' },
      { q: 'Describe a challenging event and how you handled it', guidance: 'Show problem-solving, adaptability, and maintaining client satisfaction.' },
      { q: 'How do you ensure consistent quality across multiple events?', guidance: 'Cover staffing, training, checklists, and quality control systems.' },
      { q: 'What\'s the largest event you\'ve managed?', guidance: 'Discuss scope, challenges, and successful execution.' },
      { q: 'How do you handle a client request you can\'t accommodate?', guidance: 'Show client service skills while managing expectations honestly.' }
    ],
    atsKeywords: ['catering manager', 'catering', 'events', 'event planning', 'sales', 'food service', 'banquet', 'hospitality', 'weddings']
  },
  {
    slug: 'barista',
    jobTitle: 'Barista',
    avgSalary: '$28,000',
    jobGrowth: '+4%',
    blsUrl: 'https://www.bls.gov/ooh/food-preparation-and-serving/food-and-beverage-serving-and-related-workers.htm',
    keySkills: ['Espresso Preparation', 'Latte Art', 'Customer Service', 'Cash Handling', 'Speed & Efficiency', 'Product Knowledge', 'Cleanliness', 'Teamwork'],
    skillCategories: {
      'Coffee Skills': ['Espresso extraction', 'Milk steaming', 'Latte art', 'Pour over', 'Cold brew'],
      'Customer Service': ['Order taking', 'Drink customization', 'Regular customer relationships', 'Handling complaints', 'Speed of service'],
      'Operations': ['Opening/closing procedures', 'Cash handling', 'Inventory', 'Equipment maintenance', 'Food safety']
    },
    certifications: ['Barista certification', 'Food handler\'s permit', 'SCA certifications'],
    context: 'Baristas craft coffee beverages and create the welcoming atmosphere that keeps customers returning. The role blends technical coffee skill with hospitality.',
    hiringTip: '"Barista at specialty coffee shop, preparing 200+ drinks daily with consistent quality, trained in single-origin pourovers and latte art." Include drink volume, coffee program type (specialty vs quick service), and any certifications or competitions. Customer connection skills matter—regulars are the lifeblood of coffee shops.',
    mistakes: [
      { title: 'Not specifying coffee program type', detail: 'Specialty, quick service, drive-through—different environments have different expectations' },
      { title: 'Missing volume handled', detail: 'Drinks per shift, peak hour performance—numbers show your capability' },
      { title: 'Ignoring specialty skills', detail: 'Latte art, single-origin, alternative brewing—specialty skills differentiate you' },
      { title: 'No customer service emphasis', detail: 'Baristas are hospitality professionals. Include customer interaction skills' },
      { title: 'Not mentioning training or certifications', detail: 'SCA certifications or formal training show commitment to the craft' }
    ],
    interviewQuestions: [
      { q: 'What coffee skills are you most confident in?', guidance: 'Discuss espresso, milk technique, alternative brewing, and latte art.' },
      { q: 'How do you handle a rush while maintaining quality?', guidance: 'Show you can balance speed with drink quality and customer service.' },
      { q: 'Describe your approach to a new regular customer', guidance: 'Show hospitality skills and building customer relationships.' },
      { q: 'What do you do when a drink comes out wrong?', guidance: 'Immediate remake, quality standards, and not serving subpar drinks.' },
      { q: 'What interests you about specialty coffee?', guidance: 'Show genuine interest in coffee beyond just making drinks.' }
    ],
    atsKeywords: ['barista', 'coffee', 'espresso', 'latte art', 'customer service', 'cafe', 'specialty coffee', 'beverage']
  },
  {
    slug: 'dishwasher',
    jobTitle: 'Dishwasher',
    avgSalary: '$27,000',
    jobGrowth: '+8%',
    blsUrl: 'https://www.bls.gov/ooh/food-preparation-and-serving/food-preparation-workers.htm',
    keySkills: ['Dishwashing', 'Sanitation', 'Organization', 'Speed', 'Physical Stamina', 'Teamwork', 'Cleanliness', 'Reliability'],
    skillCategories: {
      'Dish Operations': ['Machine operation', 'Hand washing', 'Pot washing', 'Dish organization', 'Three-compartment sink'],
      'Sanitation': ['Sanitizer concentration', 'Temperature compliance', 'Waste disposal', 'Floor maintenance', 'Grease trap'],
      'Kitchen Support': ['Restocking', 'Food prep assistance', 'Receiving deliveries', 'Trash removal', 'General cleaning']
    },
    certifications: ['Food handler\'s permit'],
    context: 'Dishwashers keep kitchens running by ensuring clean equipment is always available. The role requires speed, stamina, and reliability.',
    hiringTip: 'Dishwashers who show up, work hard, and keep up with the rush are gold. "Dishwasher in 200-cover restaurant, maintaining dish availability throughout service with zero backups." Reliability and work ethic matter most. Include restaurant volume and any additional kitchen duties you\'ve taken on.',
    mistakes: [
      { title: 'Not showing reliability', detail: 'Perfect attendance, punctuality, staying late when needed—reliability is the top quality' },
      { title: 'Missing restaurant volume', detail: 'Covers, pace, busy periods—context shows what you\'ve handled' },
      { title: 'Ignoring additional skills', detail: 'Prep assistance, receiving, cleaning—additional contributions add value' },
      { title: 'No mention of sanitation knowledge', detail: 'Temperature, sanitizer concentration, three-sink method—show you know proper sanitation' },
      { title: 'Not expressing work ethic', detail: 'Dishwashing is hard work. Show you\'re up for the physical demands' }
    ],
    interviewQuestions: [
      { q: 'How do you keep up during a busy service?', guidance: 'Show organizational skills, prioritization, and physical capability.' },
      { q: 'Describe proper dishwashing sanitation', guidance: 'Cover temperatures, sanitizer, three-sink method, and food safety basics.' },
      { q: 'Are you willing to help with other kitchen tasks?', guidance: 'Flexibility to assist with prep, receiving, or cleaning adds value.' },
      { q: 'What do you do when the dish pit gets backed up?', guidance: 'Show problem-solving, prioritization, and communication with kitchen.' },
      { q: 'Can you work long shifts on your feet?', guidance: 'Be honest about physical capability for this demanding role.' }
    ],
    atsKeywords: ['dishwasher', 'kitchen', 'sanitation', 'food service', 'restaurant', 'cleaning', 'dish pit']
  },
  {
    slug: 'food-runner',
    jobTitle: 'Food Runner',
    avgSalary: '$28,000',
    jobGrowth: '+12%',
    blsUrl: 'https://www.bls.gov/ooh/food-preparation-and-serving/waiters-and-waitresses.htm',
    keySkills: ['Food Delivery', 'Table Numbers', 'Menu Knowledge', 'Speed', 'Communication', 'Attention to Detail', 'Teamwork', 'Physical Stamina'],
    skillCategories: {
      'Running Skills': ['Table number knowledge', 'Food quality check', 'Timing coordination', 'Temperature awareness', 'Position delivery'],
      'Communication': ['Expo communication', 'Server coordination', 'Kitchen communication', 'Guest interaction', 'Special requests'],
      'Operations': ['Side work', 'Table maintenance', 'Drink running', 'Pre-bussing', 'Support tasks']
    },
    certifications: ['Food handler\'s permit', 'TIPS certification (if alcohol)'],
    context: 'Food runners bridge the kitchen and dining room, ensuring dishes reach guests quickly and accurately. The role is fast-paced and detail-oriented.',
    hiringTip: '"Food runner in fine dining restaurant, delivering 150+ plates per service with accurate table and position delivery." Show volume, restaurant style, and accuracy. Include any server or kitchen experience—food runners often advance to server positions.',
    mistakes: [
      { title: 'Not specifying restaurant type', detail: 'Fine dining, casual, quick service—running styles differ by setting' },
      { title: 'Missing volume handled', detail: 'Plates per service, covers—numbers show your capability' },
      { title: 'Ignoring accuracy', detail: 'Correct table, correct seat position, correct dish—accuracy is essential' },
      { title: 'No menu knowledge mentioned', detail: 'Runners need to know the menu to answer guest questions' },
      { title: 'Not showing advancement interest', detail: 'Running is often a stepping stone. Show interest in growth' }
    ],
    interviewQuestions: [
      { q: 'How do you ensure food goes to the right table?', guidance: 'Discuss table numbers, position numbers, and double-checking.' },
      { q: 'What do you do if you notice a dish looks wrong?', guidance: 'Communication with expo, not running bad food, maintaining quality.' },
      { q: 'How do you prioritize multiple dishes ready at once?', guidance: 'Temperature priority, timing, and working with expo.' },
      { q: 'How do you handle a guest question about a dish?', guidance: 'Menu knowledge, or finding the server for detailed questions.' },
      { q: 'Are you interested in becoming a server?', guidance: 'Show career interest while demonstrating commitment to current role.' }
    ],
    atsKeywords: ['food runner', 'runner', 'restaurant', 'food service', 'dining', 'hospitality', 'server assistant']
  },
  {
    slug: 'busser',
    jobTitle: 'Busser',
    avgSalary: '$26,000',
    jobGrowth: '+12%',
    blsUrl: 'https://www.bls.gov/ooh/food-preparation-and-serving/waiters-and-waitresses.htm',
    keySkills: ['Table Clearing', 'Table Reset', 'Water Service', 'Speed', 'Attention to Detail', 'Teamwork', 'Guest Awareness', 'Physical Stamina'],
    skillCategories: {
      'Bussing Skills': ['Table clearing', 'Pre-bussing', 'Table reset', 'Crumbing', 'Water/bread service'],
      'Support Duties': ['Server assistance', 'Restocking', 'Side work', 'Restroom checks', 'Running food'],
      'Guest Service': ['Guest awareness', 'Anticipating needs', 'Quiet efficiency', 'Professionalism', 'Handling spills']
    },
    certifications: ['Food handler\'s permit'],
    context: 'Bussers ensure smooth table turnover and support servers throughout service. The role requires speed, awareness, and team coordination.',
    hiringTip: '"Busser in 120-seat restaurant, maintaining table turnover for 300+ covers per night while assisting server team." Show restaurant size, cover counts, and additional duties. Bussers who anticipate needs rather than waiting to be asked are valuable.',
    mistakes: [
      { title: 'Not mentioning restaurant volume', detail: 'Covers, seats, turnover rate—context shows what you\'ve handled' },
      { title: 'Missing additional duties', detail: 'Water service, running food, restocking—additional contributions add value' },
      { title: 'Ignoring speed and efficiency', detail: 'Table turn time matters. Show you work quickly without rushing guests' },
      { title: 'No team support mentioned', detail: 'Bussers support the entire front-of-house team, not just clearing tables' },
      { title: 'Not showing career interest', detail: 'Many bussers advance to server. Show you\'re learning and growing' }
    ],
    interviewQuestions: [
      { q: 'How do you prioritize during a busy service?', guidance: 'Discuss reading the floor, anticipating needs, and working efficiently.' },
      { q: 'What does good pre-bussing look like?', guidance: 'Removing finished plates and items while guests are still dining.' },
      { q: 'How do you handle a spill or accident?', guidance: 'Quick response, guest care, cleanup, and communication.' },
      { q: 'What support do you provide to servers?', guidance: 'Water, bread, running food, anything that helps the team.' },
      { q: 'Are you interested in becoming a server?', guidance: 'Show you\'re learning the business while excelling at current role.' }
    ],
    atsKeywords: ['busser', 'busboy', 'restaurant', 'food service', 'table', 'hospitality', 'dining room']
  },
  {
    slug: 'fast-food-worker',
    jobTitle: 'Fast Food Worker',
    avgSalary: '$26,000',
    jobGrowth: '+7%',
    blsUrl: 'https://www.bls.gov/ooh/food-preparation-and-serving/food-and-beverage-serving-and-related-workers.htm',
    keySkills: ['Order Taking', 'Food Preparation', 'Cash Handling', 'Speed', 'Customer Service', 'POS Systems', 'Cleanliness', 'Teamwork'],
    skillCategories: {
      'Service': ['Order taking', 'Drive-through', 'Counter service', 'Order accuracy', 'Speed of service'],
      'Food Prep': ['Assembly', 'Grill operation', 'Fryer operation', 'Food holding', 'Portion control'],
      'Operations': ['Cash handling', 'POS systems', 'Opening/closing', 'Cleaning', 'Restocking']
    },
    certifications: ['Food handler\'s permit', 'ServSafe certification'],
    context: 'Fast food workers serve customers quickly and efficiently in high-volume quick service restaurants. Speed, accuracy, and customer service are essential.',
    hiringTip: '"Fast food team member handling 100+ orders per shift at drive-through with 95% order accuracy and average 2-minute ticket times." Include volume, position (grill, counter, drive-through), and any leadership or training responsibilities. Reliability and flexibility are highly valued.',
    mistakes: [
      { title: 'Not specifying position', detail: 'Grill, counter, drive-through, prep—different stations require different skills' },
      { title: 'Missing volume or speed metrics', detail: 'Orders per hour, drive-through times—quick service is measured' },
      { title: 'Ignoring advancement', detail: 'Crew trainer, shift lead roles show growth potential' },
      { title: 'No mention of reliability', detail: 'Showing up consistently, covering shifts—reliability matters in QSR' },
      { title: 'Not listing specific chains', detail: 'McDonald\'s, Chick-fil-A, Taco Bell—brand experience can be relevant' }
    ],
    interviewQuestions: [
      { q: 'What positions have you worked in fast food?', guidance: 'Describe all stations and your comfort level with each.' },
      { q: 'How do you maintain speed while ensuring accuracy?', guidance: 'Discuss systems, double-checking, and staying focused.' },
      { q: 'Tell me about handling a customer complaint', guidance: 'Show patience, problem-solving, and making it right quickly.' },
      { q: 'Are you available for various shifts?', guidance: 'Flexibility is essential in quick service. Be honest about availability.' },
      { q: 'Would you be interested in training or leadership roles?', guidance: 'Show ambition and willingness to take on more responsibility.' }
    ],
    atsKeywords: ['fast food', 'quick service', 'QSR', 'counter', 'drive-through', 'food service', 'customer service', 'restaurant']
  },
  {
    slug: 'dietary-aide',
    jobTitle: 'Dietary Aide',
    avgSalary: '$30,000',
    jobGrowth: '+11%',
    blsUrl: 'https://www.bls.gov/ooh/food-preparation-and-serving/food-preparation-workers.htm',
    keySkills: ['Meal Preparation', 'Dietary Restrictions', 'Food Safety', 'Patient Interaction', 'Portion Control', 'Documentation', 'Cleanliness', 'Teamwork'],
    skillCategories: {
      'Dietary Service': ['Meal assembly', 'Diet modifications', 'Portion control', 'Tray service', 'Patient feeding assistance'],
      'Food Safety': ['Temperature monitoring', 'Allergen awareness', 'Sanitation', 'HACCP principles', 'Special diet handling'],
      'Patient Care': ['Patient interaction', 'Diet card reading', 'Intake documentation', 'Resident preferences', 'Compassionate service']
    },
    certifications: ['Food handler\'s permit', 'ServSafe certification', 'Dietary manager certification (CDM)'],
    context: 'Dietary aides prepare and serve meals in healthcare settings, following specific diet orders. The role combines food service with patient care awareness.',
    hiringTip: '"Dietary aide in 150-bed skilled nursing facility, preparing meals for residents on therapeutic diets including diabetic, renal, and texture-modified." Include facility type, beds, and diet types handled. Accuracy with diet orders is critical—a mistake can harm patients. Show attention to detail and compassion for residents.',
    mistakes: [
      { title: 'Not specifying healthcare setting', detail: 'Hospital, nursing home, assisted living—different settings have different requirements' },
      { title: 'Missing diet type experience', detail: 'Diabetic, renal, pureed, cardiac—list therapeutic diets you\'ve prepared' },
      { title: 'Ignoring food safety emphasis', detail: 'Healthcare food safety is critical. Show HACCP knowledge and temperature awareness' },
      { title: 'No patient interaction mentioned', detail: 'Dietary aides interact with patients. Include compassionate service skills' },
      { title: 'Not mentioning accuracy', detail: 'Diet order accuracy can affect patient health. Emphasize attention to detail' }
    ],
    interviewQuestions: [
      { q: 'What therapeutic diets are you familiar with?', guidance: 'List diets you\'ve prepared and any special training.' },
      { q: 'How do you ensure diet orders are followed correctly?', guidance: 'Discuss checking diet cards, verifying orders, and attention to detail.' },
      { q: 'Describe how you interact with patients/residents', guidance: 'Show compassion, patience, and appropriate communication.' },
      { q: 'What food safety practices are essential in healthcare?', guidance: 'Cover temperatures, allergens, and cross-contamination prevention.' },
      { q: 'How do you handle a patient who refuses to eat?', guidance: 'Patience, options, reporting to nursing—show appropriate response.' }
    ],
    atsKeywords: ['dietary aide', 'healthcare food service', 'therapeutic diet', 'nursing home', 'hospital', 'food service', 'patient care', 'dietary']
  }
];

function generateMDXContent(job, authorName) {
  const currentDate = new Date().toISOString().split('T')[0];
  const year = new Date().getFullYear();

  let skillsSection = '## Essential Skills to Highlight\n\n';
  for (const [category, skills] of Object.entries(job.skillCategories)) {
    skillsSection += `### ${category}\n`;
    skills.forEach(skill => {
      skillsSection += `- ${skill}\n`;
    });
    skillsSection += '\n';
  }

  let certSection = '## Valuable Certifications\n\n';
  job.certifications.forEach(cert => {
    certSection += `- ${cert}\n`;
  });

  let mistakesSection = '## Common Mistakes to Avoid\n\n';
  job.mistakes.forEach(mistake => {
    mistakesSection += `### ${mistake.title}\n\n${mistake.detail}\n\n`;
  });

  let interviewSection = `## Common ${job.jobTitle} Interview Questions\n\n`;
  interviewSection += 'Preparing for interviews is an important part of the job search process. Here are questions frequently asked in ' + job.jobTitle + ' interviews:\n\n';
  job.interviewQuestions.forEach(item => {
    interviewSection += `### "${item.q}"\n\n${item.guidance}\n\n`;
  });

  let atsSection = `## ATS Optimization for ${job.jobTitle} Resumes\n\n`;
  atsSection += `Food service employers and hospitality recruiters use ATS systems to filter applications. Using industry-standard terminology helps your resume get seen.\n\n`;
  atsSection += '**Essential keywords to include:**\n';
  job.atsKeywords.forEach(kw => {
    atsSection += `- ${kw}\n`;
  });

  const content = `---
title: '${job.jobTitle} Resume: Examples & Writing Guide ${year}'
slug: ${job.slug}
description: >-
  ${job.jobTitle} resume example with professional format and templates. Highlight
  your culinary skills, food service experience, and customer service abilities.
cardSummary: >-
  Get hired in food service. See how ${job.jobTitle}s showcase ${job.keySkills[0]} and service excellence wins.
date: '${currentDate}'
author: ${authorName}
category: Food Service
tags:
  - ${job.slug.replace(/-/g, ' ')} resume
  - ${job.jobTitle.toLowerCase()} resume
  - food service resume
  - culinary resume
  - ${job.slug.replace(/-/g, ' ')} resume example
  - restaurant resume
  - hospitality resume
  - resume format
  - professional resume
  - ats resume template
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
      ${job.jobTitle} employers look for specific skills in food preparation,
      customer service, and operational abilities. Include ${job.keySkills[0]},
      ${job.keySkills[1]}, ${job.keySkills[2]} and other relevant competencies.
      Prioritize skills that match the specific job posting.
  - question: How long should a ${job.jobTitle} resume be?
    answer: >-
      One page is standard for food service positions. Focus on relevant experience,
      certifications, and achievements rather than listing every job you've held.
  - question: What is the best resume format for a ${job.jobTitle}?
    answer: >-
      Use a reverse-chronological format showing your most recent experience first.
      Include a skills section with relevant food service competencies and any
      certifications like ServSafe or food handler's permits.
  - question: How much does a ${job.jobTitle} make?
    answer: >-
      ${job.jobTitle} professionals earn an average of ${job.avgSalary}, with ${job.jobGrowth}
      projected growth. Pay varies based on location, establishment type, and experience.
  - question: What should I include in my ${job.jobTitle} resume?
    answer: >-
      Include a professional summary, relevant food service experience with achievements,
      skills section covering ${job.keySkills[0]}, ${job.keySkills[1]}, certifications,
      and education. Emphasize customer service and any leadership experience.
---
## What Makes a Great ${job.jobTitle} Resume?

${job.context} With ${job.jobGrowth} job growth and an average salary of ${job.avgSalary}, ${job.jobTitle} positions offer opportunities for those passionate about food service. Your resume must communicate your skills, experience, and reliability. This guide covers what food service employers look for when hiring.

## Professional Summary Examples

**For Entry-Level ${job.jobTitle}:**
"Enthusiastic ${job.jobTitle} with training in ${job.keySkills[0]} and ${job.keySkills[1]}. Strong work ethic with commitment to food safety and customer satisfaction. Eager to contribute to a fast-paced food service team."

**For Experienced ${job.jobTitle}:**
"Skilled ${job.jobTitle} with 3+ years experience in high-volume food service. Proficient in ${job.keySkills[0]} and ${job.keySkills[2]}. Known for reliability, attention to detail, and positive customer interactions."

**For Senior ${job.jobTitle}:**
"Accomplished ${job.jobTitle} with 8+ years in food service operations. Expert in ${job.keySkills[0]}, ${job.keySkills[1]}, and team leadership. Track record of improving efficiency and maintaining quality standards."


## Salary & Job Outlook

${job.jobTitle} professionals earn a median annual salary of approximately **${job.avgSalary}**. Employment is projected to grow **${job.jobGrowth}** over the next decade.

**Sources:** Salary estimates from [U.S. Bureau of Labor Statistics](${job.blsUrl}), [Glassdoor](https://www.glassdoor.com/Salaries/${job.slug}-salary-SRCH_KO0,${job.slug.length}.htm), [PayScale](https://www.payscale.com/research/US/Job=${job.jobTitle.replace(/ /g, '_')}/Hourly_Rate). Compensation varies by location, establishment type, and experience.

${certSection}

${skillsSection}

## Achievement-Focused Bullet Points

Quantify your contributions:

- "Consistently maintained food safety standards with zero health code violations"
- "Served 200+ customers daily while maintaining 95% satisfaction ratings"
- "Reduced food waste by 15% through improved inventory management"
- "Trained 5 new team members on food safety and service procedures"
- "Recognized for perfect attendance over 12-month period"

## ${job.jobTitle} Resume Format Tips

Food service resumes should be clear and easy to scan:

- **Certifications first** — ServSafe, food handler's permits are often required
- **Quantify experience** — Covers served, volume handled, customer counts
- **Show reliability** — Attendance record, schedule flexibility
- **Include relevant skills** — Food safety, POS systems, specific equipment
- **Keep it to one page** — Concise and focused on relevant experience

${mistakesSection}

## Hiring Manager Tip

> **${job.jobTitle} resumes that demonstrate reliability, food safety knowledge, and customer service skills get prioritized.**

${job.hiringTip}


${interviewSection}

${atsSection}

## Explore More Resources

- [Server Resume Example](/resume-examples/server)
- [Bartender Resume Example](/resume-examples/bartender)
- [Restaurant Manager Resume Example](/resume-examples/restaurant-manager)

Ready to build your ${job.jobTitle} resume? [Try our AI-powered resume builder](/builder).
`;

  return content;
}

// Main execution
console.log('🚀 Generating Food Service resume examples...\n');

let created = 0;
let skipped = 0;

FOOD_SERVICE_JOBS.forEach((job, index) => {
  const filePath = path.join(CONTENT_DIR, `${job.slug}.mdx`);

  if (fs.existsSync(filePath)) {
    console.log(`⏭️  Skipped: ${job.slug}.mdx (already exists)`);
    skipped++;
    return;
  }

  const author = getAuthor(index);
  const content = generateMDXContent(job, author);

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ Created: ${job.slug}.mdx (${job.jobTitle})`);
  created++;
});

console.log('\n📊 Summary:');
console.log(`   ✅ Created: ${created}`);
console.log(`   ⏭️  Skipped: ${skipped}`);
console.log(`   📁 Total Food Service Jobs: ${FOOD_SERVICE_JOBS.length}`);
