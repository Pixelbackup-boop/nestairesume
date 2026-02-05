#!/usr/bin/env node

/**
 * Generate 14 Food Service resume examples following CLAUDE.md guidelines:
 * - Profession-specific content (no templated fill-in-the-blank)
 * - 3 professional summaries with real terminology
 * - Skills organized by domain (3 subcategories)
 * - 6 achievement bullets with realistic metrics
 * - Unique format tips per profession
 * - Hiring manager tip with insider knowledge
 * - 5 profession-specific interview questions
 * - 5 unique mistakes for the profession
 * - ATS keywords specific to the role
 */

import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = path.join(process.cwd(), 'frontend/content/resume-examples');

const JOBS = [
  {
    slug: 'executive-chef',
    jobTitle: 'Executive Chef',
    category: 'Food Service',
    avgSalary: '$68,000',
    salaryRange: '$48,000 - $95,000',
    yearsExperience: '8-12',
    jobGrowth: '6%',
    blsUrl: 'https://www.bls.gov/ooh/food-preparation-and-serving/chefs-and-head-cooks.htm',
    cardSummary: 'Lead kitchens to culinary excellence. Show your menu innovation and P&L mastery.',
    skills: {
      culinary: ['Menu Development', 'Food Costing', 'Plate Presentation', 'Recipe Standardization'],
      leadership: ['Kitchen Management', 'Staff Training', 'Vendor Negotiation', 'Scheduling'],
      business: ['P&L Management', 'Inventory Control', 'Health Code Compliance', 'Budget Planning']
    },
    certifications: ['ServSafe Manager', 'Certified Executive Chef (CEC)', 'ACF Certification', 'HACCP'],
    summaries: {
      entry: 'Culinary school graduate with externship experience at Michelin-starred restaurants. Proficient in classic French techniques, modern plating, and kitchen station management. ServSafe certified with strong foundation in food safety and mise en place discipline.',
      mid: 'Sous Chef with 5+ years progressing through fine dining kitchens, now managing 12-person brigade. Achieved 28% food cost while maintaining quality standards. Developed seasonal menus generating 15% revenue increase. Expert in French, Italian, and contemporary American cuisines.',
      senior: 'Certified Executive Chef with 10+ years leading high-volume restaurants generating $4M+ annually. Reduced food costs from 34% to 27% while improving guest satisfaction scores. Opened 3 successful restaurant concepts from menu development through launch. Known for mentoring emerging talent and building cohesive kitchen teams.'
    },
    bullets: [
      'Reduced food cost from 32% to 26% through portion control, waste tracking, and vendor renegotiation',
      'Developed seasonal menu rotations increasing average check by 18% and repeat guest visits by 25%',
      'Managed kitchen brigade of 18 across AM/PM shifts while maintaining labor cost at 24%',
      'Achieved 98% health inspection score and zero critical violations across 3 consecutive years',
      'Trained and promoted 5 line cooks to sous chef positions, reducing turnover by 40%',
      'Implemented inventory management system reducing waste by $2,400 monthly'
    ],
    formatTips: [
      'Lead with your highest-profile restaurant or cuisine specialty in the summary',
      'Include food cost and labor percentages—these are the metrics owners care about most',
      'List specific cuisines mastered (French classical, Japanese, farm-to-table) rather than generic "international"',
      'Mention revenue figures or covers served to demonstrate scale',
      'Include culinary competition wins, media features, or awards prominently'
    ],
    hiringTip: {
      insight: 'I scan for food cost percentage first—if you ran a 32% kitchen, I need to know why. Then I look for longevity. Chefs who job-hop every 8 months raise red flags. Show me 2+ years somewhere with measurable impact.',
      elaboration: 'Restaurant owners and F&B directors are risk-averse when hiring executive chefs because a bad hire can sink a restaurant. Your resume needs to prove you understand the business side—not just that you can cook. Include your food cost, labor cost, and any revenue growth you drove. If you opened a restaurant or led a major menu overhaul, quantify the results.'
    },
    interviewQuestions: [
      { q: 'Walk me through how you develop a new menu', guidance: 'Discuss your process: analyzing food costs, seasonal availability, guest demographics, and kitchen capabilities. Mention how you balance creativity with profitability.' },
      { q: 'How do you handle a 32% food cost target when ingredient prices spike?', guidance: 'Show your problem-solving: menu engineering, portion adjustments, substitute ingredients, vendor negotiations. Give a specific example.' },
      { q: 'Describe how you build and maintain kitchen culture', guidance: 'Address hiring, training, communication style, and how you handle conflicts. Mention retention rates if strong.' },
      { q: 'Tell me about a dish that failed and what you learned', guidance: 'Show humility and learning ability. Explain what went wrong, customer feedback, and how you pivoted.' },
      { q: 'How do you manage a kitchen during a 300-cover night?', guidance: 'Demonstrate your organizational skills: prep lists, station assignments, expediting, and communication systems.' }
    ],
    mistakes: [
      'Listing every cuisine ever attempted instead of demonstrating true expertise in 2-3 styles',
      'Omitting food cost and labor percentages—the #1 metric owners evaluate',
      'Focusing only on cooking skills while ignoring P&L, inventory, and staff management',
      'Not mentioning health inspection scores or food safety certifications',
      'Leaving out the scale of operations (covers per night, team size, revenue)'
    ],
    atsKeywords: ['executive chef', 'food cost', 'menu development', 'kitchen management', 'P&L', 'ServSafe', 'HACCP', 'culinary', 'fine dining', 'brigade', 'inventory control', 'vendor relations']
  },
  {
    slug: 'restaurant-manager',
    jobTitle: 'Restaurant Manager',
    category: 'Food Service',
    avgSalary: '$62,000',
    salaryRange: '$45,000 - $85,000',
    yearsExperience: '3-6',
    jobGrowth: '10%',
    blsUrl: 'https://www.bls.gov/ooh/management/food-service-managers.htm',
    cardSummary: 'Run restaurants that thrive. Show your revenue growth and team leadership.',
    skills: {
      operations: ['Floor Management', 'Scheduling', 'Opening/Closing Procedures', 'POS Systems'],
      financial: ['P&L Ownership', 'Labor Cost Control', 'Cash Handling', 'Sales Forecasting'],
      leadership: ['Staff Training', 'Performance Reviews', 'Conflict Resolution', 'Guest Recovery']
    },
    certifications: ['ServSafe Manager', 'TIPS Certification', 'Food Handler Card', 'CPR/First Aid'],
    summaries: {
      entry: 'Promoted from server to shift supervisor with proven ability to lead teams and maintain service standards. ServSafe and TIPS certified with strong knowledge of POS systems and opening/closing procedures. Consistently achieved highest guest satisfaction scores on shift.',
      mid: 'Restaurant Manager with 4+ years overseeing full-service dining operations generating $2.5M annually. Reduced labor costs by 3 percentage points while maintaining service quality. Hired, trained, and retained team of 35+ FOH staff with 60% lower turnover than company average.',
      senior: 'Senior Restaurant Manager with track record of turning around underperforming locations. Increased same-store sales 22% year-over-year through service improvements and local marketing. Managed P&L for $4M restaurant, consistently beating labor and COGS targets. Opened 2 new locations from staffing through launch.'
    },
    bullets: [
      'Managed P&L for $3.2M restaurant, achieving 8% profit margin vs. 5% company average',
      'Reduced staff turnover from 120% to 65% annually through improved training and scheduling',
      'Increased average check by 12% through server upselling training and menu engineering',
      'Maintained labor cost at 22% while improving guest satisfaction scores by 15 points',
      'Resolved 50+ guest complaints monthly with 90% recovery rate and return visits',
      'Implemented new reservation system reducing wait times by 25% and increasing covers by 18%'
    ],
    formatTips: [
      'Lead with revenue responsibility and profit improvements—this is what regional managers scan for',
      'Include specific percentages for labor cost, food cost, and turnover improvements',
      'Mention guest satisfaction metrics (Yelp rating improvements, NPS scores)',
      'List POS systems by name (Toast, Aloha, Square) to pass ATS screening',
      'Highlight any multi-unit or new opening experience prominently'
    ],
    hiringTip: {
      insight: 'Your labor cost percentage tells me everything. If you can run a shift at 20% labor without sacrificing service, you understand restaurant math. Show me the numbers.',
      elaboration: 'Regional managers and owners are looking for managers who think like operators, not just supervisors. Your resume should prove you understand the relationship between labor scheduling, sales forecasting, and profitability. Include your labor and food cost percentages, turnover rates, and any comp sales growth you achieved.'
    },
    interviewQuestions: [
      { q: 'How do you build a labor schedule that hits cost targets?', guidance: 'Explain your forecasting process: historical sales data, weather, events, daypart analysis. Show how you flex staff without hurting service.' },
      { q: 'Tell me about a time you turned around a struggling restaurant', guidance: 'Structure your answer: identify the problem, your action plan, and measurable results. Include timeline.' },
      { q: 'How do you handle a guest who had a bad experience?', guidance: 'Walk through your recovery process: listen, apologize, solve, follow up. Mention specific comp policies or empowerment levels.' },
      { q: 'Describe your approach to reducing turnover', guidance: 'Discuss hiring practices, training programs, scheduling fairness, and recognition. Quantify improvements.' },
      { q: 'How do you drive sales during a slow period?', guidance: 'Share specific tactics: LTOs, local marketing, server contests, daypart promotions. Include results.' }
    ],
    mistakes: [
      'Listing duties ("managed staff, handled complaints") instead of measurable outcomes',
      'Not including revenue responsibility or P&L ownership scope',
      'Omitting labor cost, food cost, or turnover percentages',
      'Failing to mention specific POS or scheduling systems used',
      'Leaving out guest satisfaction improvements or recovery success rates'
    ],
    atsKeywords: ['restaurant manager', 'P&L', 'labor cost', 'food cost', 'guest satisfaction', 'Toast', 'Aloha', 'scheduling', 'turnover', 'FOH', 'BOH', 'ServSafe', 'TIPS']
  },
  {
    slug: 'kitchen-manager',
    jobTitle: 'Kitchen Manager',
    category: 'Food Service',
    avgSalary: '$52,000',
    salaryRange: '$38,000 - $70,000',
    yearsExperience: '3-5',
    jobGrowth: '5%',
    blsUrl: 'https://www.bls.gov/ooh/management/food-service-managers.htm',
    cardSummary: 'Keep kitchens running like clockwork. Show your cost control and team efficiency.',
    skills: {
      operations: ['Line Management', 'Prep Scheduling', 'Ticket Times', 'Quality Control'],
      inventory: ['Food Ordering', 'Waste Reduction', 'Vendor Management', 'Par Levels'],
      compliance: ['Health Inspections', 'HACCP', 'Food Safety', 'Sanitation Standards']
    },
    certifications: ['ServSafe Manager', 'HACCP Certification', 'Food Handler Card'],
    summaries: {
      entry: 'Line cook promoted to kitchen supervisor with strong understanding of food safety, prep scheduling, and quality standards. ServSafe certified with experience managing 5-person prep team. Known for maintaining ticket times under 12 minutes during peak service.',
      mid: 'Kitchen Manager with 4 years overseeing BOH operations for high-volume casual dining ($1.8M annual). Maintained food cost at 28% while reducing waste by 20%. Managed team of 12 cooks across all stations with 95% recipe compliance.',
      senior: 'Senior Kitchen Manager with expertise in multi-unit operations and new kitchen openings. Achieved 96% health inspection scores across 3 locations. Reduced ticket times from 18 to 11 minutes through station reorganization. Built training program adopted company-wide.'
    },
    bullets: [
      'Maintained 27% food cost through portion control, waste tracking, and strategic ordering',
      'Reduced average ticket time from 16 to 10 minutes during peak hours through line reorganization',
      'Achieved 98% health inspection score with zero critical violations for 24 consecutive months',
      'Managed inventory for 200+ SKUs, reducing spoilage waste by $1,800 monthly',
      'Trained 15+ line cooks on station procedures, achieving 94% recipe consistency scores',
      'Implemented prep schedule reducing overtime by 25% while maintaining quality standards'
    ],
    formatTips: [
      'Lead with food cost percentage and ticket time improvements—these define kitchen efficiency',
      'Include health inspection scores to demonstrate compliance expertise',
      'List specific inventory management systems or methods used',
      'Mention team size and training accomplishments',
      'Highlight any new kitchen openings or major equipment implementations'
    ],
    hiringTip: {
      insight: 'Health inspection scores and food cost—those two numbers tell me if you can actually run a kitchen. I want to see 95%+ health scores and food cost within 2 points of target.',
      elaboration: 'Kitchen managers are the bridge between the executive chef creative vision and daily operational reality. Your resume must prove you can maintain consistency, control costs, and keep the health department happy. Include your average ticket times, food cost percentage, and inspection scores with specific numbers.'
    },
    interviewQuestions: [
      { q: 'How do you maintain food cost during price fluctuations?', guidance: 'Discuss menu engineering, portion control, vendor alternatives, and waste reduction. Give a specific example with numbers.' },
      { q: 'Walk me through your prep scheduling process', guidance: 'Explain how you forecast needs, assign tasks, and ensure freshness while minimizing labor. Mention par levels.' },
      { q: 'How do you prepare for a health inspection?', guidance: 'Describe your daily/weekly checklist, staff training, and how you maintain standards consistently—not just for inspections.' },
      { q: 'Describe a time a line cook was consistently underperforming', guidance: 'Show your coaching process: identify issue, provide training, set expectations, document, and final outcome.' },
      { q: 'How do you handle a 45-minute ticket time during a rush?', guidance: 'Explain your triage process: communication with FOH, prioritization, station support, and guest recovery.' }
    ],
    mistakes: [
      'Not including food cost percentage—the primary metric for kitchen managers',
      'Omitting health inspection scores or food safety certifications',
      'Listing cooking skills instead of management and operational abilities',
      'Failing to mention team size or training accomplishments',
      'Leaving out ticket time improvements or efficiency gains'
    ],
    atsKeywords: ['kitchen manager', 'food cost', 'BOH', 'inventory', 'health inspection', 'HACCP', 'ServSafe', 'ticket times', 'line management', 'prep', 'waste reduction']
  },
  {
    slug: 'sushi-chef',
    jobTitle: 'Sushi Chef',
    category: 'Food Service',
    avgSalary: '$55,000',
    salaryRange: '$35,000 - $85,000',
    yearsExperience: '3-7',
    jobGrowth: '6%',
    blsUrl: 'https://www.bls.gov/ooh/food-preparation-and-serving/chefs-and-head-cooks.htm',
    cardSummary: 'Master the art of sushi. Show your knife skills and omakase expertise.',
    skills: {
      technical: ['Knife Skills', 'Fish Butchery', 'Rice Preparation', 'Sashimi Cutting'],
      knowledge: ['Fish Sourcing', 'Seasonal Ingredients', 'Sake Pairing', 'Japanese Cuisine'],
      presentation: ['Omakase Service', 'Plate Artistry', 'Customer Interaction', 'Speed & Precision']
    },
    certifications: ['ServSafe', 'Sushi Chef Certification', 'Japanese Culinary Training'],
    summaries: {
      entry: 'Sushi apprentice with 2 years training under master itamae, proficient in maki rolls, nigiri preparation, and basic fish butchery. Skilled in shari (rice) preparation achieving proper temperature and seasoning consistency. ServSafe certified with deep respect for Japanese culinary traditions.',
      mid: 'Itamae with 5+ years experience at high-end Japanese restaurants, specializing in omakase service and whole-fish butchery. Expert in identifying fish quality, optimal aging times, and seasonal preparations. Maintained 35% food cost while sourcing premium bluefin and uni.',
      senior: 'Master Sushi Chef with 10+ years leading sushi programs at Michelin-recognized restaurants. Trained in Tokyo for 3 years under renowned itamae. Expert in aging techniques, rare fish sourcing, and creating omakase experiences averaging $250 per guest. Mentored 8 sushi chefs now leading their own programs.'
    },
    bullets: [
      'Prepared 150+ pieces of nigiri and sashimi nightly with zero quality complaints',
      'Maintained fish cost at 32% while sourcing premium-grade tuna, hamachi, and seasonal specialties',
      'Developed 12-course omakase menu generating $180 average check and 40% repeat bookings',
      'Reduced fish waste by 25% through improved butchery techniques and creative prep utilization',
      'Trained 4 apprentice sushi chefs on knife skills, rice preparation, and customer interaction',
      'Built relationships with 3 specialty fish purveyors, securing exclusive access to seasonal items'
    ],
    formatTips: [
      'Mention specific training—especially any time spent in Japan or under a recognized master',
      'List fish varieties you specialize in (bluefin, uni, kohada, etc.) to show expertise depth',
      'Include omakase price points and guest counts to demonstrate your level',
      'Highlight knife brands and techniques if trained in traditional methods',
      'Mention any sake or beverage pairing knowledge'
    ],
    hiringTip: {
      insight: 'I watch candidates make rice before anything else. If your shari is wrong, nothing else matters. On paper, I look for where you trained and how long you stayed—sushi requires patience and dedication.',
      elaboration: 'Sushi chef hiring is deeply traditional. Owners want to see apprenticeship history, longevity at respected establishments, and evidence of proper technique training. Your resume should emphasize your training lineage, fish sourcing knowledge, and ability to maintain quality at volume. Omakase experience commands premium positions.'
    },
    interviewQuestions: [
      { q: 'How do you evaluate fish quality when receiving deliveries?', guidance: 'Discuss visual inspection (eyes, gills, flesh), smell, texture, and your relationship with suppliers. Mention specific red flags.' },
      { q: 'Describe your shari preparation process', guidance: 'Detail rice variety, washing, cooking, and seasoning. Explain temperature management and timing for service.' },
      { q: 'How do you structure an omakase experience?', guidance: 'Walk through course progression: light to rich, raw to cooked, texture variety, and pacing for guest enjoyment.' },
      { q: 'What knives do you use and how do you maintain them?', guidance: 'Name specific knives (yanagiba, deba, usuba), sharpening routine, and storage. This reveals your training.' },
      { q: 'How do you handle a guest with fish allergies at the sushi bar?', guidance: 'Show flexibility and creativity while maintaining the omakase spirit. Mention vegetable and cooked alternatives.' }
    ],
    mistakes: [
      'Not mentioning where you trained or your sushi lineage—this is critical in Japanese cuisine',
      'Listing generic "Asian cuisine" instead of specific Japanese techniques and fish expertise',
      'Omitting fish cost percentages or volume served',
      'Failing to highlight omakase experience if you have it—this is premium positioning',
      'Not mentioning knife skills or specific training in traditional techniques'
    ],
    atsKeywords: ['sushi chef', 'itamae', 'omakase', 'nigiri', 'sashimi', 'fish butchery', 'shari', 'Japanese cuisine', 'knife skills', 'fish sourcing']
  },
  {
    slug: 'food-service-director',
    jobTitle: 'Food Service Director',
    category: 'Food Service',
    avgSalary: '$75,000',
    salaryRange: '$55,000 - $110,000',
    yearsExperience: '7-12',
    jobGrowth: '10%',
    blsUrl: 'https://www.bls.gov/ooh/management/food-service-managers.htm',
    cardSummary: 'Lead institutional food programs. Show your budget mastery and operational scale.',
    skills: {
      leadership: ['Multi-Unit Management', 'Staff Development', 'Vendor Contracts', 'Union Relations'],
      financial: ['Budget Planning', 'Cost Analysis', 'Contract Negotiation', 'Revenue Forecasting'],
      compliance: ['Regulatory Compliance', 'Nutritional Standards', 'Safety Protocols', 'Quality Assurance']
    },
    certifications: ['ServSafe Manager', 'CDM (Certified Dietary Manager)', 'SFM (School Food Service Manager)', 'HACCP'],
    summaries: {
      entry: 'Food service supervisor transitioning to director role with 5 years progressive management experience. Managed cafeteria operations serving 800+ daily guests while maintaining 95% satisfaction scores. ServSafe certified with strong vendor relationship management skills.',
      mid: 'Food Service Director managing $3.5M annual budget across hospital and long-term care facilities. Implemented cost controls reducing food spend by 12% while improving patient satisfaction. Supervised team of 45 across dietary, production, and service departments.',
      senior: 'Senior Food Service Director with 12+ years leading institutional dining programs serving 5,000+ daily meals. Managed $8M budget with consistent 5% under-budget performance. Negotiated multi-year vendor contracts saving $400K annually. Achieved Joint Commission compliance across all facilities.'
    },
    bullets: [
      'Managed $5.2M food service budget serving 3,500 daily meals across 4 institutional locations',
      'Negotiated GPO contracts reducing food costs by 15%, saving $380K annually',
      'Achieved 94% patient satisfaction scores, up from 78% through menu redesign and service training',
      'Supervised 52 employees across dietary, production, and service departments with 85% retention',
      'Maintained 100% compliance with state health regulations and Joint Commission standards',
      'Implemented room service model reducing food waste by 30% and improving patient outcomes'
    ],
    formatTips: [
      'Lead with budget size and daily meal counts to establish operational scale',
      'Include specific regulatory frameworks (Joint Commission, CMS, state health) to show compliance expertise',
      'Highlight vendor contract negotiations and cost savings',
      'Mention patient/resident satisfaction improvements with specific metrics',
      'Include any dietary specialty experience (renal, diabetic, texture-modified)'
    ],
    hiringTip: {
      insight: 'Budget management and regulatory compliance are non-negotiable. Show me you can hit financial targets while keeping surveyors happy. Patient satisfaction scores seal the deal.',
      elaboration: 'Healthcare and institutional food service directors operate in a heavily regulated environment. Your resume must demonstrate financial acumen (budget management, cost per meal), regulatory compliance (Joint Commission, CMS, state surveys), and quality outcomes (satisfaction scores, clinical nutrition). Multi-site experience is increasingly valued.'
    },
    interviewQuestions: [
      { q: 'How do you manage food costs while meeting nutritional requirements?', guidance: 'Discuss menu planning, GPO utilization, seasonal purchasing, and waste reduction while ensuring compliance with dietary standards.' },
      { q: 'Describe your experience with regulatory surveys', guidance: 'Detail specific surveys (Joint Commission, state health), your preparation process, and any deficiencies youve addressed.' },
      { q: 'How do you improve patient/resident satisfaction scores?', guidance: 'Share specific initiatives: menu changes, service timing, staff training, and feedback systems. Include measurable results.' },
      { q: 'Walk me through your vendor management approach', guidance: 'Explain contract negotiation, performance monitoring, GPO relationships, and how you handle service failures.' },
      { q: 'How do you handle staffing challenges in food service?', guidance: 'Discuss recruitment, retention strategies, cross-training, and contingency planning for call-outs.' }
    ],
    mistakes: [
      'Not listing budget size or daily meal volume—these establish your operational scope',
      'Omitting regulatory compliance experience (Joint Commission, CMS, state health)',
      'Failing to mention patient/resident satisfaction metrics',
      'Leaving out vendor contract negotiations or cost savings achievements',
      'Not highlighting specialized dietary knowledge required in healthcare settings'
    ],
    atsKeywords: ['food service director', 'dietary manager', 'institutional food service', 'budget management', 'Joint Commission', 'CMS', 'patient satisfaction', 'GPO', 'vendor management', 'CDM']
  },
  {
    slug: 'barista',
    jobTitle: 'Barista',
    category: 'Food Service',
    avgSalary: '$28,000',
    salaryRange: '$22,000 - $38,000',
    yearsExperience: '0-2',
    jobGrowth: '11%',
    blsUrl: 'https://www.bls.gov/ooh/food-preparation-and-serving/food-and-beverage-serving-and-related-workers.htm',
    cardSummary: 'Craft perfect drinks every time. Show your speed, latte art, and customer connections.',
    skills: {
      technical: ['Espresso Extraction', 'Milk Steaming', 'Latte Art', 'Manual Brewing'],
      service: ['Customer Service', 'Speed of Service', 'Order Accuracy', 'POS Systems'],
      knowledge: ['Coffee Origins', 'Flavor Profiles', 'Equipment Maintenance', 'Drink Customization']
    },
    certifications: ['SCA Barista Skills', 'Food Handler Card', 'ServSafe'],
    summaries: {
      entry: 'Passionate barista with 6 months specialty coffee training, skilled in espresso extraction, milk texturing, and basic latte art. Consistently prepare 80+ drinks per shift while maintaining quality and customer connection. Food handler certified with enthusiasm for coffee education.',
      mid: 'Experienced barista with 3 years at high-volume specialty coffee shops, averaging 120+ drinks per shift. Proficient in latte art, pour-over techniques, and espresso machine calibration. Achieved highest customer satisfaction scores in district through product knowledge and personalized service.',
      senior: 'Lead Barista and shift supervisor with SCA certification and 5+ years specialty coffee experience. Expert in dialing in espresso, equipment maintenance, and training new baristas. Built customer loyalty program increasing repeat visits by 35%. Competed in regional latte art competitions.'
    },
    bullets: [
      'Prepared 100-150 beverages per shift while maintaining under 3-minute average ticket time',
      'Achieved 98% order accuracy rate with zero customer complaints over 6-month period',
      'Increased average ticket by 22% through suggestive selling of food items and drink upgrades',
      'Trained 8 new baristas on espresso extraction, milk steaming, and customer service standards',
      'Maintained espresso machine and grinders, reducing equipment downtime by 40%',
      'Built regular customer relationships resulting in 45% of sales from repeat guests'
    ],
    formatTips: [
      'Include drinks per shift and ticket times to demonstrate speed and efficiency',
      'Mention specific equipment (La Marzocco, Synesso, EK43) to show experience level',
      'Highlight latte art ability if skilled—this differentiates specialty baristas',
      'List manual brewing methods (V60, Chemex, AeroPress) for specialty shops',
      'Include any competitions, certifications, or coffee education'
    ],
    hiringTip: {
      insight: 'I can teach you to make drinks, but I cant teach you to be genuinely friendly at 6am. Show me customer service examples and any metrics around speed—we need both personality and efficiency.',
      elaboration: 'Specialty coffee shops look for baristas who combine technical skill with genuine hospitality. Your resume should demonstrate both—include drink volume and ticket times for efficiency, plus customer interaction examples. SCA certifications and latte art skills differentiate you for higher-end positions.'
    },
    interviewQuestions: [
      { q: 'How do you dial in espresso at the start of your shift?', guidance: 'Explain your process: dose, yield, time targets, taste evaluation, and adjustments. Show you understand extraction.' },
      { q: 'Describe how you handle a long line while maintaining quality', guidance: 'Discuss prioritization, communication with customers, and techniques for speed without sacrificing drinks.' },
      { q: 'A customer says their latte tastes bitter—what do you do?', guidance: 'Show troubleshooting: ask questions, identify issue (over-extraction, old coffee), remake, and prevent future occurrence.' },
      { q: 'How do you build relationships with regular customers?', guidance: 'Share specific techniques: remembering names/orders, genuine conversation, personalized recommendations.' },
      { q: 'What do you know about our coffee program?', guidance: 'Research the shop beforehand—know their roaster, brewing methods, and values. Show genuine interest.' }
    ],
    mistakes: [
      'Not mentioning drink volume or speed metrics—efficiency matters in coffee',
      'Omitting latte art or manual brewing skills if you have them',
      'Listing generic customer service without specific examples or metrics',
      'Failing to mention equipment experience (machines, grinders, brewing gear)',
      'Not highlighting any coffee education, certifications, or competitions'
    ],
    atsKeywords: ['barista', 'espresso', 'latte art', 'specialty coffee', 'customer service', 'POS', 'milk steaming', 'pour over', 'coffee', 'SCA']
  },
  {
    slug: 'banquet-chef',
    jobTitle: 'Banquet Chef',
    category: 'Food Service',
    avgSalary: '$58,000',
    salaryRange: '$42,000 - $80,000',
    yearsExperience: '5-8',
    jobGrowth: '6%',
    blsUrl: 'https://www.bls.gov/ooh/food-preparation-and-serving/chefs-and-head-cooks.htm',
    cardSummary: 'Execute flawless large-scale events. Show your volume expertise and timing precision.',
    skills: {
      production: ['High-Volume Cooking', 'Batch Production', 'Timing Coordination', 'Quality Consistency'],
      planning: ['Menu Costing', 'Prep Scheduling', 'Equipment Logistics', 'Staff Deployment'],
      events: ['Plated Service', 'Buffet Management', 'Dietary Accommodations', 'Client Tastings']
    },
    certifications: ['ServSafe Manager', 'HACCP', 'Certified Culinarian'],
    summaries: {
      entry: 'Line cook with experience supporting banquet operations for events up to 200 guests. Skilled in batch cooking, maintaining temperature standards, and executing synchronized plate-ups. ServSafe certified with strong attention to timing and consistency.',
      mid: 'Banquet Sous Chef with 4+ years executing events from 50 to 800 guests at hotel and convention properties. Expert in scaling recipes, coordinating multi-course service timing, and managing temporary kitchen staff. Maintained food cost at 30% while ensuring zero service delays.',
      senior: 'Executive Banquet Chef with 8+ years leading culinary operations for properties hosting 150+ annual events. Managed $2M+ annual food revenue with consistent 28% food cost. Executed simultaneous events for 1,200+ guests with flawless timing. Known for innovative menu development and client retention.'
    },
    bullets: [
      'Executed 200+ banquet events annually ranging from 50 to 1,000 guests with zero timing failures',
      'Maintained 29% food cost across diverse menu offerings while meeting quality standards',
      'Managed banquet kitchen team of 15 full-time plus 25 on-call staff during peak season',
      'Developed 8 signature banquet menus increasing event booking revenue by 25%',
      'Coordinated simultaneous service for 3 events totaling 1,500 guests without delay',
      'Reduced overtime costs by 20% through improved prep scheduling and staff training'
    ],
    formatTips: [
      'Lead with largest event size and frequency—this is how banquet chefs are measured',
      'Include food cost percentage and revenue responsibility',
      'Highlight simultaneous event management and timing coordination abilities',
      'Mention specific service styles mastered (plated, buffet, action stations, passed)',
      'Include any signature menus developed or client retention metrics'
    ],
    hiringTip: {
      insight: 'Banquet cooking is about timing, scaling, and staying calm when serving 500 people in 20 minutes. Show me your largest events, your timing track record, and how you handle the chaos.',
      elaboration: 'Hotels and convention centers hire banquet chefs who can execute flawlessly under pressure. Your resume should emphasize the scale of events youve managed, your ability to coordinate complex timing, and your consistency maintaining food cost at volume. Simultaneous event experience is highly valued.'
    },
    interviewQuestions: [
      { q: 'How do you ensure 400 plates go out at the same temperature and quality?', guidance: 'Explain your system: holding techniques, plate-up organization, timing signals, and quality checks.' },
      { q: 'Walk me through your prep planning for a week with 5 major events', guidance: 'Discuss forecasting, prep prioritization, staff scheduling, and equipment allocation.' },
      { q: 'How do you handle a client requesting a last-minute menu change?', guidance: 'Show flexibility while managing expectations around timing, cost, and feasibility.' },
      { q: 'Describe how you manage seasonal on-call banquet staff', guidance: 'Discuss training, skill assessment, scheduling systems, and maintaining quality with variable crews.' },
      { q: 'What do you do when an event is running 30 minutes behind schedule?', guidance: 'Show your communication and adjustment process: FOH coordination, holding decisions, and guest experience.' }
    ],
    mistakes: [
      'Not listing event sizes and frequency—volume capability is the primary qualifier',
      'Omitting timing coordination experience or simultaneous event management',
      'Failing to include food cost percentage for high-volume operations',
      'Listing only restaurant experience without highlighting banquet-specific skills',
      'Not mentioning different service styles (plated, buffet, action stations)'
    ],
    atsKeywords: ['banquet chef', 'high-volume', 'events', 'catering', 'plated service', 'buffet', 'food cost', 'timing', 'hotel', 'convention', 'action stations']
  },
  {
    slug: 'pizza-maker',
    jobTitle: 'Pizza Maker',
    category: 'Food Service',
    avgSalary: '$32,000',
    salaryRange: '$25,000 - $45,000',
    yearsExperience: '1-3',
    jobGrowth: '5%',
    blsUrl: 'https://www.bls.gov/ooh/food-preparation-and-serving/cooks.htm',
    cardSummary: 'Craft pizzas that keep customers returning. Show your dough skills and oven mastery.',
    skills: {
      technical: ['Dough Preparation', 'Oven Management', 'Topping Distribution', 'Crust Techniques'],
      speed: ['High-Volume Production', 'Order Management', 'Station Organization', 'Quality Consistency'],
      knowledge: ['Ingredient Handling', 'Temperature Control', 'Recipe Scaling', 'Food Safety']
    },
    certifications: ['Food Handler Card', 'ServSafe'],
    summaries: {
      entry: 'Entry-level pizza maker with 6 months experience in high-volume pizzeria producing 150+ pizzas per shift. Proficient in dough stretching, topping application, and deck oven operation. Food handler certified with strong commitment to consistency and speed.',
      mid: 'Experienced pizzaiolo with 3 years crafting Neapolitan and New York-style pizzas. Expert in dough fermentation, wood-fired oven management, and achieving consistent leoparding. Produces 200+ pizzas per shift while training new staff on technique.',
      senior: 'Head Pizza Maker with 6+ years leading production for award-winning pizzeria. Developed signature dough recipe now used across 4 locations. Manages ingredient ordering, recipe scaling, and maintains 26% food cost. Trained 15+ pizza makers on proper technique.'
    },
    bullets: [
      'Produced 180-220 pizzas per shift while maintaining consistent quality and 8-minute ticket times',
      'Developed dough fermentation process reducing waste by 15% and improving flavor consistency',
      'Trained 10+ new pizza makers on dough handling, topping portioning, and oven management',
      'Maintained 27% food cost through accurate portioning and waste reduction',
      'Achieved 98% order accuracy during peak service periods of 50+ pizzas per hour',
      'Managed wood-fired oven at 800°F+ producing Neapolitan-style pizzas in 90 seconds'
    ],
    formatTips: [
      'Include pizzas per shift to demonstrate speed and volume capability',
      'Mention specific styles (Neapolitan, NY, Detroit, Sicilian) to show expertise',
      'List oven types (deck, conveyor, wood-fired) youre experienced with',
      'Highlight dough-making skills if you prepare from scratch',
      'Include food cost management if applicable to your role'
    ],
    hiringTip: {
      insight: 'I watch how you stretch dough before anything else. Speed matters, but so does not tearing or overworking it. Tell me your volume and any dough experience—those are the skills that take years to develop.',
      elaboration: 'Pizza shops hire for speed and consistency. Your resume should prove you can handle volume without sacrificing quality. If you have experience making dough from scratch or managing fermentation, highlight that prominently—its a differentiating skill. Include your pizzas-per-shift numbers.'
    },
    interviewQuestions: [
      { q: 'How do you know when dough is properly proofed?', guidance: 'Discuss visual and tactile indicators: size increase, surface texture, poke test, and timing based on environment.' },
      { q: 'What do you do when orders back up during a rush?', guidance: 'Explain prioritization, communication, and techniques for increasing speed without quality loss.' },
      { q: 'Describe your approach to consistent topping distribution', guidance: 'Discuss portioning systems, visual techniques, and quality checks.' },
      { q: 'How do you manage a wood-fired oven?', guidance: 'Explain temperature monitoring, pizza rotation, and adjusting for different products.' },
      { q: 'A customer complains their pizza is undercooked—what do you do?', guidance: 'Show problem-solving: assess the complaint, identify cause, remedy, and prevent recurrence.' }
    ],
    mistakes: [
      'Not including pizzas per shift or volume capability',
      'Omitting specific pizza styles you specialize in',
      'Failing to mention dough preparation experience if you have it',
      'Listing generic cooking skills instead of pizza-specific techniques',
      'Not mentioning oven types youve worked with'
    ],
    atsKeywords: ['pizza maker', 'pizzaiolo', 'dough', 'Neapolitan', 'wood-fired', 'deck oven', 'pizza production', 'high-volume', 'food handler']
  },
  {
    slug: 'caterer',
    jobTitle: 'Caterer',
    category: 'Food Service',
    avgSalary: '$45,000',
    salaryRange: '$32,000 - $68,000',
    yearsExperience: '2-5',
    jobGrowth: '8%',
    blsUrl: 'https://www.bls.gov/ooh/food-preparation-and-serving/chefs-and-head-cooks.htm',
    cardSummary: 'Deliver memorable events off-site. Show your logistics mastery and client satisfaction.',
    skills: {
      operations: ['Menu Planning', 'Food Transport', 'Site Assessment', 'Equipment Logistics'],
      service: ['Event Execution', 'Staff Coordination', 'Client Relations', 'Problem Solving'],
      business: ['Cost Estimation', 'Contract Negotiation', 'Vendor Management', 'Timeline Management']
    },
    certifications: ['ServSafe Manager', 'Food Handler Card', 'HACCP', 'Event Planning Certification'],
    summaries: {
      entry: 'Catering assistant with 1 year experience supporting events from 25 to 200 guests. Skilled in food transport, set-up, service, and breakdown. ServSafe certified with strong attention to food safety during off-site operations.',
      mid: 'Catering coordinator managing 75+ events annually ranging from intimate dinners to corporate functions of 300 guests. Expert in menu development, site logistics, and client communication. Achieved 95% client rebooking rate through flawless execution.',
      senior: 'Senior Caterer and business owner with 8+ years building $600K annual catering operation. Manage team of 12 full-time plus 30 event staff. Specialize in weddings and corporate events up to 500 guests. Known for creative menus and seamless logistics.'
    },
    bullets: [
      'Executed 100+ off-site events annually ranging from 20 to 400 guests with 98% client satisfaction',
      'Maintained 32% food cost while accommodating dietary restrictions and custom menu requests',
      'Coordinated team of 15 event staff ensuring professional service and brand consistency',
      'Developed 25 signature menu packages increasing average booking value by 30%',
      'Managed complete event logistics: venue assessment, equipment rental, transport, and breakdown',
      'Built vendor relationships reducing rental costs by 20% while improving equipment quality'
    ],
    formatTips: [
      'Lead with event volume and guest count ranges to establish experience level',
      'Include client retention or rebooking rates—these prove service quality',
      'Highlight logistics expertise: transport, site assessment, equipment management',
      'Mention specialty event types (weddings, corporate, social) if you have a focus',
      'Include any business development or sales experience'
    ],
    hiringTip: {
      insight: 'Catering is 50% cooking and 50% logistics. Show me you can execute flawlessly in a church basement with one outlet and no running water. Real caterers solve problems before clients know they exist.',
      elaboration: 'Catering companies hire for problem-solving ability and logistics expertise as much as culinary skill. Your resume should prove you can assess sites, plan for contingencies, and execute in challenging environments. Client retention rates demonstrate quality better than anything else.'
    },
    interviewQuestions: [
      { q: 'How do you assess a new event venue?', guidance: 'Discuss your checklist: power, water, staging area, temperature control, access, and rental needs.' },
      { q: 'Describe an event where something went wrong and how you handled it', guidance: 'Show quick thinking and problem-solving while maintaining client experience.' },
      { q: 'How do you maintain food safety during transport and off-site service?', guidance: 'Explain temperature monitoring, hot/cold holding, and timing management.' },
      { q: 'Walk me through your event timeline from booking to breakdown', guidance: 'Demonstrate organizational skills: planning, prep scheduling, logistics coordination, and staffing.' },
      { q: 'How do you handle a client who wants to change the menu one week before the event?', guidance: 'Show flexibility while managing expectations around feasibility and cost.' }
    ],
    mistakes: [
      'Focusing only on cooking skills without highlighting logistics and event management',
      'Not including event volume or guest count ranges',
      'Omitting client satisfaction or retention metrics',
      'Failing to mention off-site execution challenges youve overcome',
      'Leaving out staff coordination and team management experience'
    ],
    atsKeywords: ['caterer', 'catering', 'off-site events', 'menu planning', 'event coordination', 'food transport', 'weddings', 'corporate events', 'ServSafe']
  },
  {
    slug: 'food-expeditor',
    jobTitle: 'Food Expeditor',
    category: 'Food Service',
    avgSalary: '$32,000',
    salaryRange: '$26,000 - $42,000',
    yearsExperience: '1-2',
    jobGrowth: '5%',
    blsUrl: 'https://www.bls.gov/ooh/food-preparation-and-serving/cooks.htm',
    cardSummary: 'Orchestrate the pass like a conductor. Show your timing precision and quality control.',
    skills: {
      coordination: ['Order Timing', 'Kitchen Communication', 'Quality Control', 'Server Coordination'],
      attention: ['Plate Presentation', 'Temperature Checks', 'Ticket Management', 'Accuracy Verification'],
      communication: ['BOH/FOH Bridge', 'Problem Escalation', 'Rush Management', 'Team Leadership']
    },
    certifications: ['Food Handler Card', 'ServSafe'],
    summaries: {
      entry: 'Food runner transitioning to expo position with strong understanding of menu items, table numbers, and service timing. Known for maintaining organization during rush periods and clear communication with both kitchen and servers.',
      mid: 'Experienced expeditor managing the pass for high-volume restaurant serving 300+ covers nightly. Expert in coordinating ticket timing, maintaining plate presentation standards, and bridging BOH/FOH communication. Reduced average ticket times by 15%.',
      senior: 'Lead Expeditor and Kitchen Coordinator with 4+ years running the pass at fine dining and high-volume establishments. Known for remaining calm during 400-cover nights and maintaining quality standards without delays. Train new expo staff and assist with kitchen management.'
    },
    bullets: [
      'Coordinated pass for 300+ cover restaurant, maintaining 10-minute average ticket times',
      'Reduced food quality complaints by 40% through rigorous plate inspection before service',
      'Managed ticket flow for 8-station kitchen, ensuring synchronized firing and plating',
      'Communicated effectively with 12 servers on timing, modifications, and table coordination',
      'Handled 50+ tables simultaneously during peak service without delays or errors',
      'Trained 5 new expeditors on ticket management, quality standards, and communication protocols'
    ],
    formatTips: [
      'Include cover counts and ticket times to demonstrate volume handling',
      'Mention specific kitchen communication systems or protocols used',
      'Highlight quality control responsibilities and any complaint reduction',
      'Show BOH and FOH coordination abilities',
      'Include any training or leadership responsibilities'
    ],
    hiringTip: {
      insight: 'The expo position is the hardest in the restaurant—you need to read tickets, check quality, communicate both ways, and never lose your cool. Show me you can handle volume without making mistakes.',
      elaboration: 'Restaurants hire expeditors who can maintain composure and quality under pressure. Your resume should prove you can manage ticket flow, communicate clearly with both kitchen and servers, and catch quality issues before food leaves the window. Volume metrics and quality improvement results are key.'
    },
    interviewQuestions: [
      { q: 'How do you prioritize tickets when the kitchen gets backed up?', guidance: 'Explain your triage approach: VIP tables, time-sensitive items, communication with servers.' },
      { q: 'What do you check before letting a plate leave the pass?', guidance: 'Detail your quality checklist: temperature, presentation, accuracy, garnish, plate cleanliness.' },
      { q: 'How do you communicate with a line cook who keeps sending subpar food?', guidance: 'Show diplomatic communication that maintains respect while ensuring standards.' },
      { q: 'Describe how you handle a server who keeps rushing you', guidance: 'Balance server needs with kitchen reality while maintaining professionalism.' },
      { q: 'What do you do when one station is significantly behind?', guidance: 'Explain how you adjust ticket calling, communicate with FOH, and support the struggling station.' }
    ],
    mistakes: [
      'Not including cover counts or ticket volume handled',
      'Omitting quality control responsibilities and results',
      'Listing only food runner experience without expo-specific skills',
      'Failing to highlight BOH/FOH communication abilities',
      'Not mentioning ticket time improvements or efficiency gains'
    ],
    atsKeywords: ['expeditor', 'expo', 'food runner', 'ticket management', 'quality control', 'BOH', 'FOH', 'plate presentation', 'kitchen coordination']
  },
  {
    slug: 'cafeteria-worker',
    jobTitle: 'Cafeteria Worker',
    category: 'Food Service',
    avgSalary: '$28,000',
    salaryRange: '$22,000 - $36,000',
    yearsExperience: '0-2',
    jobGrowth: '8%',
    blsUrl: 'https://www.bls.gov/ooh/food-preparation-and-serving/food-preparation-workers.htm',
    cardSummary: 'Serve meals that fuel communities. Show your efficiency and food safety dedication.',
    skills: {
      service: ['Food Service', 'Portion Control', 'Cash Handling', 'Customer Interaction'],
      preparation: ['Food Prep', 'Salad Bar Maintenance', 'Beverage Service', 'Stock Rotation'],
      safety: ['Food Safety', 'Sanitation', 'Temperature Monitoring', 'Allergen Awareness']
    },
    certifications: ['Food Handler Card', 'ServSafe'],
    summaries: {
      entry: 'Dependable cafeteria worker with food handler certification and commitment to food safety standards. Experienced in serving line operations, portion control, and maintaining clean service areas. Friendly demeanor with ability to serve 200+ guests during busy periods.',
      mid: 'Experienced cafeteria worker with 3 years in school and corporate dining environments. Proficient in all serving line positions, cash handling, and prep work. Known for speed and accuracy during peak service while maintaining food safety compliance.',
      senior: 'Lead Cafeteria Worker with 5+ years managing serving line operations and training new staff. Expert in high-volume service, inventory rotation, and dietary accommodation. Promoted to shift leader supervising team of 6 during lunch service.'
    },
    bullets: [
      'Served 400+ students and staff daily while maintaining friendly, efficient service',
      'Maintained proper food temperatures with 100% compliance during health inspections',
      'Processed 200+ cash and card transactions daily with zero discrepancies',
      'Rotated inventory following FIFO principles, reducing food waste by 20%',
      'Accommodated 50+ dietary restrictions and allergies with zero cross-contamination incidents',
      'Trained 4 new employees on serving procedures, portion control, and sanitation standards'
    ],
    formatTips: [
      'Include serving volume (guests per day) to demonstrate experience level',
      'Highlight food safety compliance and any inspection results',
      'Mention cash handling accuracy if applicable',
      'List dietary accommodation experience (allergies, special diets)',
      'Include any training or leadership responsibilities'
    ],
    hiringTip: {
      insight: 'Reliability matters most—I need people who show up on time and follow food safety rules without exception. Show me you understand the serving line and can handle volume while being friendly.',
      elaboration: 'Institutional food service managers hire for dependability and food safety compliance above all else. Your resume should demonstrate consistent attendance, food handler certification, and ability to serve high volumes efficiently. Any experience with dietary accommodations is valuable in schools and healthcare settings.'
    },
    interviewQuestions: [
      { q: 'How do you maintain food safety during a busy lunch rush?', guidance: 'Discuss temperature monitoring, hand washing, utensil changes, and contamination prevention.' },
      { q: 'Describe your approach to serving a student with severe allergies', guidance: 'Show awareness of cross-contamination, communication with staff, and safety protocols.' },
      { q: 'How do you handle a long line while maintaining quality service?', guidance: 'Balance speed with friendliness and accuracy.' },
      { q: 'What do you do if you notice food at improper temperature?', guidance: 'Explain reporting, removal, and documentation procedures.' },
      { q: 'How do you stay motivated during repetitive work?', guidance: 'Show positive attitude and commitment to service.' }
    ],
    mistakes: [
      'Not including serving volume or guest counts',
      'Omitting food handler certification or safety training',
      'Failing to mention cash handling experience if applicable',
      'Leaving out dietary accommodation or allergen awareness experience',
      'Not highlighting reliability and attendance record'
    ],
    atsKeywords: ['cafeteria worker', 'food service', 'serving line', 'portion control', 'food handler', 'school lunch', 'institutional food service', 'cash handling']
  },
  {
    slug: 'food-truck-operator',
    jobTitle: 'Food Truck Operator',
    category: 'Food Service',
    avgSalary: '$38,000',
    salaryRange: '$28,000 - $65,000',
    yearsExperience: '1-4',
    jobGrowth: '12%',
    blsUrl: 'https://www.bls.gov/ooh/management/food-service-managers.htm',
    cardSummary: 'Run a kitchen on wheels. Show your versatility and business hustle.',
    skills: {
      operations: ['Mobile Kitchen Management', 'Menu Execution', 'Generator Operation', 'Vehicle Maintenance'],
      business: ['Permitting', 'Location Scouting', 'Social Media Marketing', 'Cash Management'],
      culinary: ['Limited-Space Cooking', 'Speed of Service', 'Inventory Management', 'Menu Optimization']
    },
    certifications: ['Food Handler Card', 'ServSafe Manager', 'Mobile Food Vendor Permit', 'Fire Extinguisher Certification'],
    summaries: {
      entry: 'Line cook transitioning to food truck with experience in high-volume, limited-space cooking. Proficient in menu execution, equipment maintenance, and customer service. Food handler certified with valid drivers license and clean record.',
      mid: 'Food Truck Operator with 3 years running successful taco truck averaging $800 daily revenue. Expert in location strategy, social media marketing, and optimizing 5-item menu for speed and profitability. Maintain all permits and health certifications.',
      senior: 'Senior Food Truck Owner-Operator with 5+ years building $180K annual business from single truck to 3-vehicle fleet. Developed signature menu featured in local publications. Expert in event booking, catering contracts, and scaling food truck operations.'
    },
    bullets: [
      'Generated $1,200+ average daily revenue during peak season with optimized 6-item menu',
      'Maintained 100% health inspection compliance across 24 consecutive inspections',
      'Built social media following of 8,000+ driving 40% of daily customers to location',
      'Reduced food cost from 38% to 30% through portion control and supplier negotiation',
      'Secured 50+ private event bookings generating $45K annual catering revenue',
      'Managed all permits, licensing, and vehicle maintenance with zero operational violations'
    ],
    formatTips: [
      'Lead with daily revenue or annual sales to demonstrate business success',
      'Include health inspection compliance—critical for mobile food vendors',
      'Highlight social media or marketing efforts that drove sales',
      'Mention event bookings or catering to show business development',
      'List all permits and certifications specific to mobile food service'
    ],
    hiringTip: {
      insight: 'Food truck work is brutal—you need someone who can cook, serve, drive, fix equipment, and promote all in the same day. Show me you can handle the versatility and the hustle.',
      elaboration: 'Food truck operators need to demonstrate multidisciplinary capability. Your resume should show cooking skills, business acumen, vehicle/equipment knowledge, and marketing ability. Revenue numbers prove you can execute. Permit and compliance experience shows you understand the regulatory landscape.'
    },
    interviewQuestions: [
      { q: 'How do you decide where to park for maximum revenue?', guidance: 'Discuss research methods: foot traffic analysis, event calendars, competitor mapping, and testing.' },
      { q: 'Describe your pre-service checklist', guidance: 'Cover equipment checks, inventory counts, generator operation, and safety protocols.' },
      { q: 'How do you maintain food safety in a mobile environment?', guidance: 'Explain temperature control, water management, sanitation, and limited-space challenges.' },
      { q: 'What do you do when equipment breaks down mid-service?', guidance: 'Show troubleshooting ability, backup plans, and customer communication.' },
      { q: 'How do you build a customer following?', guidance: 'Discuss social media strategy, location communication, loyalty programs, and event presence.' }
    ],
    mistakes: [
      'Not including revenue or sales metrics—this is a business role',
      'Omitting permit and licensing experience specific to mobile food',
      'Failing to mention equipment maintenance and troubleshooting skills',
      'Leaving out social media or marketing efforts',
      'Not highlighting health inspection compliance history'
    ],
    atsKeywords: ['food truck', 'mobile food', 'street food', 'food vendor', 'catering', 'event booking', 'health permit', 'food service management']
  },
  {
    slug: 'head-cook',
    jobTitle: 'Head Cook',
    category: 'Food Service',
    avgSalary: '$42,000',
    salaryRange: '$32,000 - $58,000',
    yearsExperience: '3-5',
    jobGrowth: '5%',
    blsUrl: 'https://www.bls.gov/ooh/food-preparation-and-serving/cooks.htm',
    cardSummary: 'Lead the kitchen without the executive title. Show your cooking mastery and team leadership.',
    skills: {
      culinary: ['Menu Execution', 'Recipe Consistency', 'Food Preparation', 'Quality Control'],
      leadership: ['Kitchen Staff Supervision', 'Training', 'Scheduling', 'Performance Management'],
      operations: ['Inventory Management', 'Food Ordering', 'Cost Control', 'Health Compliance']
    },
    certifications: ['ServSafe Manager', 'Food Handler Card', 'HACCP'],
    summaries: {
      entry: 'Line cook promoted to shift lead with 2 years experience managing small kitchen team. Skilled in all stations, recipe consistency, and maintaining food quality during high-volume service. ServSafe certified with strong training abilities.',
      mid: 'Head Cook with 4 years leading kitchen operations for casual dining restaurant serving 200+ daily. Supervise team of 8 cooks, manage inventory ordering, and maintain 28% food cost. Known for consistent quality and smooth service execution.',
      senior: 'Senior Head Cook with 6+ years running kitchens for institutions and restaurants. Manage full kitchen operations: hiring, training, scheduling, ordering, and food cost control. Achieved 96% health inspection scores and zero service failures.'
    },
    bullets: [
      'Supervised kitchen team of 10 preparing 250+ meals daily with consistent quality',
      'Maintained food cost at 27% through portion control, waste reduction, and smart ordering',
      'Achieved 97% health inspection scores for 3 consecutive years',
      'Trained 12 new cooks on recipes, safety protocols, and station procedures',
      'Managed weekly inventory ordering keeping par levels accurate within 5%',
      'Reduced ticket times by 20% through improved station organization and prep systems'
    ],
    formatTips: [
      'Lead with team size and meal volume to establish leadership scope',
      'Include food cost percentage to demonstrate cost control ability',
      'Mention health inspection scores as compliance proof',
      'Highlight training and staff development responsibilities',
      'List ordering and inventory management experience'
    ],
    hiringTip: {
      insight: 'Head cooks are my kitchen workhorses—you need to cook AND lead. Show me you can maintain quality while managing people, not just execute recipes.',
      elaboration: 'Head cook positions bridge line cooking and management. Your resume should demonstrate both culinary consistency and leadership capability. Include your food cost percentage, team size supervised, and any training you provided. Health inspection scores prove you understand compliance.'
    },
    interviewQuestions: [
      { q: 'How do you ensure recipe consistency across your team?', guidance: 'Discuss training methods, recipe cards, tasting protocols, and quality checks.' },
      { q: 'Describe your approach to managing kitchen staff', guidance: 'Cover scheduling, communication, performance feedback, and conflict resolution.' },
      { q: 'How do you control food costs?', guidance: 'Explain ordering systems, portion control, waste tracking, and inventory management.' },
      { q: 'What do you do when a cook calls out 30 minutes before a busy shift?', guidance: 'Show your contingency planning, cross-training investment, and personal flexibility.' },
      { q: 'How do you handle a quality complaint about food you didnt personally prepare?', guidance: 'Take ownership, investigate root cause, and implement preventive measures.' }
    ],
    mistakes: [
      'Listing only cooking duties without leadership responsibilities',
      'Omitting team size supervised and meal volume',
      'Failing to include food cost management experience',
      'Not mentioning training and staff development',
      'Leaving out health inspection compliance results'
    ],
    atsKeywords: ['head cook', 'lead cook', 'kitchen supervisor', 'food cost', 'inventory', 'ServSafe', 'kitchen management', 'line cook', 'food preparation']
  }
];

function generateMDX(job) {
  const today = new Date().toISOString().split('T')[0];
  const skillCategories = Object.entries(job.skills);

  return `---
title: "${job.jobTitle} Resume Example & Writing Guide 2025"
description: "Professional ${job.jobTitle.toLowerCase()} resume example with expert tips. Show your ${Object.values(job.skills).flat().slice(0, 3).join(', ').toLowerCase()} expertise."
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
  - "food service resume"
  - "resume example"
  - "resume template"
  - "ats resume"
---

## What Makes a Great ${job.jobTitle} Resume?

A ${job.jobTitle.toLowerCase()} resume must demonstrate more than cooking ability—it needs to prove you understand the business realities of food service. ${job.jobTitle}s are evaluated on their ability to deliver consistent quality while controlling costs and leading teams.

The most effective ${job.jobTitle.toLowerCase()} resumes lead with quantifiable achievements: food cost percentages, team sizes managed, revenue responsibility, and operational improvements. Generic statements about "passion for food" won't differentiate you from hundreds of other applicants.

## Professional Summary Examples

### Entry-Level ${job.jobTitle}
${job.summaries.entry}

### Mid-Level ${job.jobTitle}
${job.summaries.mid}

### Senior ${job.jobTitle}
${job.summaries.senior}

## Salary & Job Outlook

The ${job.jobTitle.toLowerCase()} role offers competitive compensation with advancement potential:

- **Median Salary:** ${job.avgSalary}
- **Salary Range:** ${job.salaryRange}
- **Job Growth:** ${job.jobGrowth} (next decade)

*Sources: [U.S. Bureau of Labor Statistics](${job.blsUrl}), [Glassdoor](https://www.glassdoor.com/Salaries/), [PayScale](https://www.payscale.com/research/US/). Actual compensation varies by location, establishment type, and experience level.*

## Essential Skills to Highlight

${skillCategories.map(([category, skills]) => `### ${category.charAt(0).toUpperCase() + category.slice(1)} Skills
${skills.map(s => `- ${s}`).join('\n')}`).join('\n\n')}

## Achievement-Focused Bullet Points

Strong ${job.jobTitle.toLowerCase()} bullet points quantify your impact:

${job.bullets.map(b => `- ${b}`).join('\n')}

## ${job.jobTitle} Resume Format & Template Tips

${job.formatTips.map((tip, i) => `${i + 1}. **${tip.split('—')[0].split('–')[0]}** ${tip.includes('—') ? '— ' + tip.split('—')[1] : tip.includes('–') ? '– ' + tip.split('–')[1] : ''}`).join('\n')}

## Hiring Manager Tip

> **"${job.hiringTip.insight}"**

${job.hiringTip.elaboration}

## Common ${job.jobTitle} Interview Questions

${job.interviewQuestions.map((q, i) => `### ${i + 1}. ${q.q}
${q.guidance}`).join('\n\n')}

## Common Mistakes to Avoid

${job.mistakes.map((m, i) => `${i + 1}. **${m.split('—')[0]}**`).join('\n')}

## ATS Optimization for ${job.jobTitle} Resumes

Ensure your resume passes Applicant Tracking Systems by including these industry-specific keywords naturally throughout your document:

**Priority Keywords:** ${job.atsKeywords.slice(0, 5).join(', ')}

**Additional Keywords:** ${job.atsKeywords.slice(5).join(', ')}

Mirror the exact language from job postings when possible—ATS systems match on specific terminology.

## Related Resources

- [Resume Writing Guide](/en/blog/resume-writing-guide)
- [Cover Letter Tips](/en/blog/cover-letter-tips)
- [Interview Preparation](/en/blog/interview-preparation)
- [Browse All Templates](/en/templates)
`;
}

async function main() {
  console.log(`\\n📝 Generating ${JOBS.length} Food Service resume examples (CLAUDE.md compliant)...\\n`);

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
