#!/usr/bin/env node
/**
 * Generate 30 Trades/Labor resume example MDX files
 * Following SEO content guidelines from CLAUDE.md
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT_DIR = path.join(__dirname, '../frontend/content/resume-examples');

// Author assignment
const AUTHORS = ['Jason M. Hill', 'Ken Coleman'];

function getAuthor(index) {
  return AUTHORS[index % AUTHORS.length];
}

// Comprehensive Trades/Labor job data
const TRADES_JOBS = [
  {
    slug: 'hvac-technician',
    jobTitle: 'HVAC Technician',
    avgSalary: '$52,000',
    jobGrowth: '+6%',
    blsUrl: 'https://www.bls.gov/ooh/installation-maintenance-and-repair/heating-air-conditioning-and-refrigeration-mechanics-and-installers.htm',
    keySkills: ['HVAC Systems', 'Refrigeration', 'Electrical Troubleshooting', 'EPA Certification', 'Preventive Maintenance', 'Customer Service', 'Blueprint Reading', 'Safety Compliance'],
    skillCategories: {
      'HVAC Systems': ['Residential HVAC', 'Commercial HVAC', 'Heat pumps', 'Furnaces', 'Air handlers', 'Ductwork'],
      'Refrigeration': ['Refrigerant handling', 'EPA 608 certified', 'System charging', 'Leak detection', 'Recovery procedures'],
      'Diagnostics & Repair': ['Electrical troubleshooting', 'Combustion analysis', 'Airflow measurement', 'Control systems', 'Compressor replacement']
    },
    certifications: ['EPA 608 Certification', 'NATE Certification', 'HVAC Excellence', 'R-410A Certification', 'OSHA 10/30'],
    context: 'HVAC technicians keep homes and businesses comfortable year-round. The role requires technical expertise, problem-solving skills, and excellent customer service—you\'re often in customers\' homes solving urgent problems.',
    hiringTip: 'Certifications matter, but call completion rates and customer satisfaction scores matter more. I want to see how many calls you average per day and your first-time fix rate. "Maintained 95% first-call completion rate across 8-10 service calls daily with 4.9/5 customer rating" tells me you\'re efficient and customers trust you. Include your EPA certification type (Universal preferred) and any manufacturer certifications (Carrier, Trane, Lennox).',
    mistakes: [
      { title: 'Missing EPA certification details', detail: 'Include your EPA 608 certification type (Type I, II, III, or Universal). Universal certification shows you can work on all equipment types' },
      { title: 'No metrics on service volume or efficiency', detail: 'Include average calls per day, first-time fix rate, and callback percentages. Productivity metrics differentiate top technicians' },
      { title: 'Ignoring customer service skills', detail: 'HVAC work is customer-facing. Include customer satisfaction scores, communication skills, and explaining technical issues to homeowners' },
      { title: 'Not listing manufacturer certifications', detail: 'Carrier, Trane, Lennox, and other manufacturer training shows depth. List specific brands you\'re certified to service' },
      { title: 'Missing commercial experience when applicable', detail: 'Commercial HVAC pays more. If you have commercial experience (rooftop units, chillers, VRF systems), highlight it prominently' }
    ],
    interviewQuestions: [
      { q: 'Walk me through diagnosing a system that\'s not cooling properly', guidance: 'Show systematic troubleshooting: check thermostat, filter, outdoor unit, refrigerant levels, airflow. Demonstrate logical diagnosis process.' },
      { q: 'How do you handle an upset customer whose AC is down in summer?', guidance: 'Show empathy, communication skills, and urgency. Explain how you prioritize their comfort while being honest about repair timelines.' },
      { q: 'Describe your experience with refrigerant recovery and handling', guidance: 'Demonstrate EPA compliance knowledge, recovery procedures, and documentation practices. Safety and environmental compliance are essential.' },
      { q: 'How do you stay current with new HVAC technology?', guidance: 'Discuss manufacturer training, industry publications, and hands-on learning with new systems like mini-splits, heat pumps, and smart thermostats.' },
      { q: 'What\'s your approach to preventive maintenance visits?', guidance: 'Cover comprehensive inspection checklist, documentation, identifying potential issues, and customer communication about findings.' }
    ],
    atsKeywords: ['HVAC', 'heating', 'air conditioning', 'refrigeration', 'EPA 608', 'NATE certified', 'preventive maintenance', 'troubleshooting', 'residential', 'commercial', 'heat pump', 'furnace']
  },
  {
    slug: 'electrician',
    jobTitle: 'Electrician',
    avgSalary: '$60,000',
    jobGrowth: '+7%',
    blsUrl: 'https://www.bls.gov/ooh/construction-and-extraction/electricians.htm',
    keySkills: ['Electrical Systems', 'NEC Code', 'Troubleshooting', 'Wiring Installation', 'Safety Protocols', 'Blueprint Reading', 'Panel Installation', 'Conduit Bending'],
    skillCategories: {
      'Electrical Work': ['Residential wiring', 'Commercial electrical', 'Industrial systems', 'Panel upgrades', 'Service installations'],
      'Code & Safety': ['NEC compliance', 'OSHA standards', 'Lockout/tagout', 'Permit processes', 'Inspection preparation'],
      'Specialized Systems': ['EV charger installation', 'Solar connections', 'Generator systems', 'Low voltage', 'Fire alarm systems']
    },
    certifications: ['Journeyman License', 'Master Electrician License', 'OSHA 10/30', 'NFPA 70E', 'State-specific licenses'],
    context: 'Electricians power modern life—from homes to data centers. The trade requires precision, code knowledge, and safety consciousness. With EV charging and solar growing, electricians are more in demand than ever.',
    hiringTip: 'License level is the first thing I check: apprentice, journeyman, or master. Then I look for specializations—EV charging, solar, commercial, or industrial experience commands premium rates. "Licensed journeyman electrician with 1,500+ residential and 200+ commercial projects completed, zero safety incidents in 8 years" shows you\'re productive and safe. Include your license number and state.',
    mistakes: [
      { title: 'Not prominently displaying license information', detail: 'Lead with your license type, number, and state. This is the first thing employers verify—don\'t bury it in the middle of your resume' },
      { title: 'No project scale or volume metrics', detail: 'Include number of projects completed, typical project sizes, and any large-scale installations. Volume demonstrates experience' },
      { title: 'Missing safety record', detail: 'Electrical work is dangerous. Zero-incident records, safety training, and safe work practices should be highlighted' },
      { title: 'Ignoring emerging specializations', detail: 'EV charging, solar PV, and smart home systems are growing fast. If you have this experience, feature it prominently' },
      { title: 'Not specifying commercial vs residential', detail: 'Commercial and industrial pay more but require different skills. Be clear about your experience level in each sector' }
    ],
    interviewQuestions: [
      { q: 'Describe your process for troubleshooting a dead circuit', guidance: 'Walk through systematic diagnosis: breaker check, outlet testing, tracing the circuit, identifying the fault. Show methodical approach.' },
      { q: 'How do you ensure NEC compliance on your installations?', guidance: 'Discuss code knowledge, permit processes, inspection preparation, and staying current with code updates.' },
      { q: 'Tell me about a challenging installation you completed', guidance: 'Describe complexity, obstacles overcome, and successful completion. Show problem-solving and technical depth.' },
      { q: 'How do you approach safety on job sites?', guidance: 'Cover lockout/tagout, PPE, situational awareness, and refusing unsafe work. Safety mindset is essential.' },
      { q: 'What experience do you have with EV chargers or solar systems?', guidance: 'These are growth areas. If you have experience, describe specific installations and any specialized training.' }
    ],
    atsKeywords: ['electrician', 'electrical', 'journeyman', 'master electrician', 'NEC', 'wiring', 'panel', 'residential', 'commercial', 'industrial', 'conduit', 'troubleshooting', 'licensed']
  },
  {
    slug: 'plumber',
    jobTitle: 'Plumber',
    avgSalary: '$59,000',
    jobGrowth: '+5%',
    blsUrl: 'https://www.bls.gov/ooh/construction-and-extraction/plumbers-pipefitters-and-steamfitters.htm',
    keySkills: ['Plumbing Systems', 'Pipe Installation', 'Drain Cleaning', 'Water Heater Installation', 'Fixture Installation', 'Code Compliance', 'Leak Detection', 'Customer Service'],
    skillCategories: {
      'Plumbing Services': ['Drain cleaning', 'Water heater installation', 'Fixture installation', 'Pipe repair', 'Sewer line work'],
      'Specialized Systems': ['Tankless water heaters', 'Water treatment', 'Gas line work', 'Backflow prevention', 'Commercial plumbing'],
      'Diagnostics': ['Leak detection', 'Camera inspection', 'Hydro jetting', 'Water pressure diagnosis', 'Sewer scoping']
    },
    certifications: ['Journeyman Plumber License', 'Master Plumber License', 'Backflow Certification', 'Gas Fitter License', 'OSHA certification'],
    context: 'Plumbers maintain the systems we depend on daily—water supply, drainage, and gas. The trade combines physical skill, problem-solving, and customer interaction, often in emergency situations.',
    hiringTip: 'Service plumbers need speed and customer skills; new construction plumbers need precision and volume. Tell me which you are. "Service plumber averaging 6-8 calls daily with 92% same-day resolution and 4.8/5 customer rating" or "Rough-in plumber completing 3-4 houses weekly, passing inspection first time 98%." Include your license type and any specialty certifications like gas or backflow.',
    mistakes: [
      { title: 'Not specifying license type and number', detail: 'Apprentice, journeyman, or master? Include your license number and issuing state. This is mandatory for plumbing jobs' },
      { title: 'Missing service volume metrics', detail: 'Include calls per day (service) or units per week (construction). Volume metrics show productivity' },
      { title: 'Ignoring specialty certifications', detail: 'Gas fitter, backflow preventer, or medical gas certifications add value. List all relevant specialty credentials' },
      { title: 'No customer service evidence for service roles', detail: 'Service plumbing is customer-facing. Include satisfaction scores and communication skills' },
      { title: 'Not differentiating service vs new construction', detail: 'These are different skill sets. Be clear about your experience and preference' }
    ],
    interviewQuestions: [
      { q: 'How do you diagnose a slow drain?', guidance: 'Walk through the process: inspection, determining blockage location, selecting the right tool (snake, hydro jet, camera). Show systematic thinking.' },
      { q: 'Describe your experience with water heater installations', guidance: 'Cover tank vs tankless, gas vs electric, code requirements, and typical installation process. Show comprehensive knowledge.' },
      { q: 'How do you handle emergency calls?', guidance: 'Discuss prioritization, customer communication, temporary solutions, and follow-up. Show calm under pressure.' },
      { q: 'What\'s your approach to code compliance?', guidance: 'Discuss staying current with code updates, permit processes, and ensuring work passes inspection.' },
      { q: 'Tell me about a challenging repair you completed', guidance: 'Describe problem-solving, creative solutions, and successful resolution. Show technical skill and persistence.' }
    ],
    atsKeywords: ['plumber', 'plumbing', 'journeyman', 'master plumber', 'drain cleaning', 'water heater', 'pipe', 'fixture', 'residential', 'commercial', 'service', 'licensed']
  },
  {
    slug: 'welder',
    jobTitle: 'Welder',
    avgSalary: '$47,000',
    jobGrowth: '+3%',
    blsUrl: 'https://www.bls.gov/ooh/production/welders-cutters-solderers-and-brazers.htm',
    keySkills: ['MIG Welding', 'TIG Welding', 'Stick Welding', 'Blueprint Reading', 'Metal Fabrication', 'Safety Procedures', 'Quality Inspection', 'Cutting Operations'],
    skillCategories: {
      'Welding Processes': ['MIG/GMAW', 'TIG/GTAW', 'Stick/SMAW', 'Flux-cored', 'Submerged arc'],
      'Materials': ['Carbon steel', 'Stainless steel', 'Aluminum', 'Cast iron', 'Exotic alloys'],
      'Positions & Certifications': ['All-position welding (1G-6G)', 'Pipe welding', 'Structural welding', 'AWS certifications', 'Code work (D1.1, ASME)']
    },
    certifications: ['AWS Certified Welder', 'ASME Certification', 'API 1104 Certification', 'CWI (Inspector)', 'Specific code certifications'],
    context: 'Welders join the metal that builds our infrastructure—from bridges to pipelines. The trade rewards precision, certifications, and the ability to work in challenging positions and environments.',
    hiringTip: 'Certifications and positions tell me everything. "AWS D1.1 structural welder certified in 3G and 4G positions, 6G pipe certified per ASME Section IX" immediately tells me your capability level. Include weld rejection rates if impressive (<2% is excellent). Pipe and pressure vessel welders command premium rates—if you have these certifications, lead with them.',
    mistakes: [
      { title: 'Not listing specific certifications and positions', detail: 'AWS D1.1? ASME? API 1104? What positions are you certified in (1G-6G)? Certifications define what work you can do' },
      { title: 'Missing materials experience', detail: 'Carbon steel, stainless, aluminum—each requires different techniques. List materials you\'re experienced with' },
      { title: 'No quality metrics', detail: 'Weld rejection rate, X-ray pass rate, and visual inspection results demonstrate quality. Include these metrics' },
      { title: 'Ignoring specialized welding types', detail: 'Pipe welding, pressure vessels, and structural work pay more. Highlight specialized experience' },
      { title: 'Not mentioning equipment operated', detail: 'Different employers use different machines. List specific welding equipment you\'re proficient with' }
    ],
    interviewQuestions: [
      { q: 'What welding processes are you most proficient in?', guidance: 'Discuss your strongest processes, certifications held, and experience with different techniques.' },
      { q: 'How do you ensure weld quality?', guidance: 'Cover preparation, technique, visual inspection, and understanding of destructive/non-destructive testing.' },
      { q: 'Describe your experience with pipe welding', guidance: 'If experienced, discuss positions, certifications, and specific projects. Pipe welding is a premium skill.' },
      { q: 'How do you read welding symbols and blueprints?', guidance: 'Demonstrate understanding of weld symbols, joint types, and translating drawings to actual welds.' },
      { q: 'What safety practices do you follow?', guidance: 'Cover PPE, ventilation, fire watch, and awareness of hazards. Safety is non-negotiable in welding.' }
    ],
    atsKeywords: ['welder', 'welding', 'MIG', 'TIG', 'stick', 'AWS certified', 'pipe welder', 'structural', 'fabrication', 'GMAW', 'GTAW', 'SMAW', 'blueprint']
  },
  {
    slug: 'carpenter',
    jobTitle: 'Carpenter',
    avgSalary: '$52,000',
    jobGrowth: '+4%',
    blsUrl: 'https://www.bls.gov/ooh/construction-and-extraction/carpenters.htm',
    keySkills: ['Framing', 'Finish Carpentry', 'Blueprint Reading', 'Power Tools', 'Measurements', 'Safety Compliance', 'Trim Work', 'Cabinetry'],
    skillCategories: {
      'Rough Carpentry': ['Framing', 'Roof systems', 'Floor systems', 'Wall construction', 'Concrete forms'],
      'Finish Carpentry': ['Trim installation', 'Cabinetry', 'Built-ins', 'Crown molding', 'Custom millwork'],
      'Tools & Techniques': ['Power tools', 'Hand tools', 'Precision measurement', 'Layout', 'Blueprint reading']
    },
    certifications: ['OSHA 10/30', 'Carpenter Apprenticeship Certificate', 'Lead-Safe Certified', 'Union journeyman card', 'State contractor license'],
    context: 'Carpenters build the structures we live and work in. The trade spans rough framing to fine finish work, requiring precision, physical endurance, and craftsmanship.',
    hiringTip: 'Are you a framer or a finish carpenter? These are different skill sets—be clear about which you are and which you want. "Finish carpenter specializing in custom trim and cabinetry with 15 years experience on high-end residential projects" or "Production framer completing 2-3 houses weekly, lead on crew of 5." Portfolio photos speak louder than words for finish carpenters.',
    mistakes: [
      { title: 'Not specifying carpentry type', detail: 'Rough vs finish, residential vs commercial, production vs custom—these require different skills. Be specific about your specialty' },
      { title: 'Missing project scale and volume', detail: 'How many houses have you framed? How many kitchens have you trimmed out? Numbers demonstrate experience' },
      { title: 'No portfolio or photos for finish work', detail: 'Finish carpentry is visual. Links to photos of your work are powerful evidence of skill quality' },
      { title: 'Ignoring leadership experience', detail: 'Lead carpenter or crew lead experience adds value. Include supervisory roles and crew sizes managed' },
      { title: 'Not mentioning tools owned', detail: 'Owning your own professional tools shows investment in the trade. List major tool investments' }
    ],
    interviewQuestions: [
      { q: 'What type of carpentry do you specialize in?', guidance: 'Be clear about your specialty: framing, finish, commercial, residential, custom, or production work.' },
      { q: 'Describe a challenging project you completed', guidance: 'Show problem-solving, precision, and craftsmanship. Include specific challenges and how you overcame them.' },
      { q: 'How do you ensure precision in your measurements?', guidance: 'Discuss measuring twice, accounting for reveals, and techniques for accurate layout work.' },
      { q: 'What tools do you own vs expect provided?', guidance: 'List your professional tool collection. Having quality tools shows professionalism.' },
      { q: 'How do you handle blueprint discrepancies on site?', guidance: 'Discuss communication with supervisors, problem-solving, and not making unauthorized changes.' }
    ],
    atsKeywords: ['carpenter', 'carpentry', 'framing', 'finish carpentry', 'trim', 'cabinetry', 'construction', 'residential', 'commercial', 'blueprint', 'woodwork', 'journeyman']
  },
  {
    slug: 'auto-mechanic',
    jobTitle: 'Auto Mechanic',
    avgSalary: '$46,000',
    jobGrowth: '+1%',
    blsUrl: 'https://www.bls.gov/ooh/installation-maintenance-and-repair/automotive-service-technicians-and-mechanics.htm',
    keySkills: ['Diagnostics', 'Engine Repair', 'Brake Systems', 'Electrical Systems', 'Preventive Maintenance', 'Customer Service', 'ASE Certification', 'Computer Diagnostics'],
    skillCategories: {
      'Mechanical Systems': ['Engine repair', 'Transmission', 'Brakes', 'Suspension', 'Steering', 'Exhaust'],
      'Electrical & Electronics': ['Computer diagnostics', 'Electrical troubleshooting', 'Sensor systems', 'Hybrid/EV systems'],
      'Service Skills': ['Preventive maintenance', 'Oil changes', 'Tire service', 'Alignments', 'Inspections']
    },
    certifications: ['ASE Certifications', 'State Inspection License', 'Manufacturer Training (Honda, Toyota, etc.)', 'Hybrid/EV Certification', 'Refrigerant Handling (R-134a)'],
    context: 'Auto mechanics keep vehicles running safely and efficiently. The trade is evolving rapidly with electric vehicles, advanced driver assistance, and computerized systems—continuous learning is essential.',
    hiringTip: 'ASE certifications are the gold standard—tell me which ones you have (A1-A9, L1-L4). Dealer experience or manufacturer training (Honda, Toyota, BMW) shows specialization. "ASE Master Technician with 8 certifications, L1 Advanced Engine Performance, averaging 45 flag hours weekly with 95% customer satisfaction" shows productivity and expertise. EV and hybrid experience is increasingly valuable.',
    mistakes: [
      { title: 'Not listing specific ASE certifications', detail: 'Which ASE certs do you hold? A1-A9? L1? Master Technician? List each certification specifically' },
      { title: 'Missing productivity metrics', detail: 'Flag hours per week, efficiency percentage, and comeback rate demonstrate productivity and quality' },
      { title: 'Ignoring manufacturer training', detail: 'Honda, Toyota, Ford, or BMW factory training is valuable. List manufacturer-specific certifications' },
      { title: 'No EV or hybrid experience', detail: 'The industry is transitioning. If you have hybrid or EV experience, highlight it—it\'s increasingly required' },
      { title: 'Not specifying diagnostic skills', detail: 'Modern cars are computers on wheels. Include scan tool proficiency and diagnostic capabilities' }
    ],
    interviewQuestions: [
      { q: 'Walk me through diagnosing a check engine light', guidance: 'Describe systematic diagnosis: code reading, freeze frame data, component testing, and root cause identification.' },
      { q: 'What ASE certifications do you hold?', guidance: 'List your certifications and discuss your path to obtaining them. Show commitment to professional development.' },
      { q: 'How do you stay current with automotive technology?', guidance: 'Discuss ongoing training, manufacturer updates, and adapting to new systems like ADAS and EVs.' },
      { q: 'Describe your experience with hybrid or electric vehicles', guidance: 'If experienced, discuss safety procedures, high-voltage awareness, and specific systems worked on.' },
      { q: 'How do you handle a comeback (repeat repair)?', guidance: 'Show accountability, systematic re-diagnosis, and commitment to customer satisfaction.' }
    ],
    atsKeywords: ['auto mechanic', 'automotive technician', 'ASE certified', 'diagnostics', 'engine repair', 'brakes', 'electrical', 'hybrid', 'EV', 'preventive maintenance', 'service technician']
  },
  {
    slug: 'diesel-mechanic',
    jobTitle: 'Diesel Mechanic',
    avgSalary: '$52,000',
    jobGrowth: '+5%',
    blsUrl: 'https://www.bls.gov/ooh/installation-maintenance-and-repair/diesel-service-technicians-and-mechanics.htm',
    keySkills: ['Diesel Engines', 'Heavy Equipment', 'Fleet Maintenance', 'DOT Inspections', 'Preventive Maintenance', 'Hydraulic Systems', 'Electrical Diagnostics', 'Welding'],
    skillCategories: {
      'Diesel Systems': ['Engine overhaul', 'Fuel systems', 'Emissions systems', 'Turbochargers', 'Aftertreatment'],
      'Heavy Equipment': ['Class 8 trucks', 'Trailers', 'Construction equipment', 'Agricultural equipment', 'Generators'],
      'Support Systems': ['Hydraulics', 'Pneumatics', 'Electrical', 'Air brakes', 'Transmissions']
    },
    certifications: ['ASE Medium/Heavy Truck (T1-T8)', 'DOT Inspector Certification', 'State inspection license', 'Cummins/Caterpillar/Detroit certifications', 'Air brake certification'],
    context: 'Diesel mechanics keep commercial fleets and heavy equipment running. The work requires strength, technical skill, and understanding of regulations like DOT compliance.',
    hiringTip: 'Fleet experience and specific equipment types matter. "Fleet diesel technician maintaining 75 Class 8 trucks, achieving 98% DOT inspection pass rate and reducing breakdown calls by 25% through preventive maintenance program" shows real value. Include engine manufacturers you\'re certified on (Cummins, Caterpillar, Detroit, Paccar) and equipment types (Freightliner, Peterbilt, Kenworth).',
    mistakes: [
      { title: 'Not specifying equipment types', detail: 'Class 8 trucks, construction equipment, agricultural—be specific about what you\'ve worked on' },
      { title: 'Missing engine manufacturer certifications', detail: 'Cummins, Cat, Detroit, Paccar—manufacturer training shows specialization. List all certifications' },
      { title: 'No fleet metrics', detail: 'Uptime percentages, breakdown reduction, and PM compliance demonstrate fleet maintenance value' },
      { title: 'Ignoring DOT compliance experience', detail: 'DOT inspections and regulations are essential for fleet work. Include inspector certifications' },
      { title: 'Not mentioning field service experience', detail: 'Road calls and field repairs are valuable. Include mobile service and emergency repair experience' }
    ],
    interviewQuestions: [
      { q: 'What diesel engine platforms are you most experienced with?', guidance: 'Discuss specific manufacturers, certifications, and years of experience with each platform.' },
      { q: 'Describe your approach to preventive maintenance programs', guidance: 'Cover scheduling, inspection procedures, documentation, and fleet uptime impact.' },
      { q: 'How do you handle an over-the-road breakdown?', guidance: 'Discuss remote diagnosis, parts sourcing, field repair procedures, and getting drivers back on the road.' },
      { q: 'What experience do you have with emissions systems?', guidance: 'Cover DPF, DEF, EGR systems, and troubleshooting aftertreatment problems.' },
      { q: 'How do you stay current with diesel technology?', guidance: 'Discuss manufacturer training, evolving emissions regulations, and emerging technologies.' }
    ],
    atsKeywords: ['diesel mechanic', 'diesel technician', 'heavy duty', 'fleet', 'Class 8', 'DOT', 'Cummins', 'Caterpillar', 'preventive maintenance', 'truck', 'commercial vehicle']
  },
  {
    slug: 'cnc-machinist',
    jobTitle: 'CNC Machinist',
    avgSalary: '$50,000',
    jobGrowth: '+7%',
    blsUrl: 'https://www.bls.gov/ooh/production/machinists-and-tool-and-die-makers.htm',
    keySkills: ['CNC Programming', 'G-Code', 'Blueprint Reading', 'Precision Measurement', 'Setup & Operation', 'Quality Control', 'CAD/CAM', 'Tooling Selection'],
    skillCategories: {
      'CNC Operations': ['CNC lathes', 'CNC mills', 'Multi-axis machining', 'Swiss-type machines', 'EDM'],
      'Programming': ['G-code', 'M-code', 'Mastercam', 'Fusion 360', 'Conversational programming'],
      'Quality & Precision': ['GD&T', 'CMM operation', 'Statistical process control', 'Precision measurement', 'First article inspection']
    },
    certifications: ['NIMS Certification', 'CNC Machinist Certificate', 'Quality Control certifications', 'Specific machine certifications'],
    context: 'CNC machinists create precision parts for aerospace, medical, automotive, and manufacturing. The role combines traditional machining knowledge with modern programming and automation skills.',
    hiringTip: 'Tell me your tolerances and part complexity. "5-axis CNC machinist producing aerospace components to ±0.0002" tolerance with 99.7% first-pass yield" tells me your capability level. Include machines operated (Haas, Mazak, DMG Mori), programming software (Mastercam, Fusion), and industries served. Multi-axis and programming experience commands premium rates.',
    mistakes: [
      { title: 'Not specifying machine types and brands', detail: 'Haas, Mazak, Okuma, DMG Mori—list specific machines you\'ve operated. Include number of axes' },
      { title: 'Missing tolerance capabilities', detail: 'What precision can you hold? ±0.001", ±0.0005", tighter? Tolerance capability defines your skill level' },
      { title: 'Ignoring programming experience', detail: 'Setup-only vs programming capability matters. Include CAM software and G-code proficiency' },
      { title: 'No quality metrics', detail: 'First-pass yield, scrap rate, and on-time delivery demonstrate consistent quality. Include these metrics' },
      { title: 'Not mentioning industry experience', detail: 'Aerospace, medical, automotive have different requirements. Specify industries and certifications like AS9100' }
    ],
    interviewQuestions: [
      { q: 'What CNC machines have you operated?', guidance: 'List specific brands, models, and axis configurations. Include both lathe and mill experience.' },
      { q: 'Describe your programming experience', guidance: 'Discuss G-code proficiency, CAM software used, and level (setup only, modify programs, or program from scratch).' },
      { q: 'How do you ensure parts meet tolerance specifications?', guidance: 'Cover in-process inspection, measurement tools, SPC, and response to out-of-spec conditions.' },
      { q: 'Walk me through your setup process for a new job', guidance: 'Describe program verification, tool setup, first article inspection, and production release.' },
      { q: 'What industries have you worked in?', guidance: 'Aerospace, medical, automotive have different standards. Discuss quality systems and certifications.' }
    ],
    atsKeywords: ['CNC machinist', 'CNC', 'G-code', 'Mastercam', 'precision', 'machining', 'lathe', 'mill', 'blueprint', 'tolerance', 'GD&T', 'manufacturing']
  },
  {
    slug: 'sheet-metal-worker',
    jobTitle: 'Sheet Metal Worker',
    avgSalary: '$53,000',
    jobGrowth: '+4%',
    blsUrl: 'https://www.bls.gov/ooh/construction-and-extraction/sheet-metal-workers.htm',
    keySkills: ['HVAC Ductwork', 'Metal Fabrication', 'Blueprint Reading', 'Welding', 'Layout & Cutting', 'Installation', 'Safety Compliance', 'Precision Measurement'],
    skillCategories: {
      'Fabrication': ['Layout and pattern development', 'Cutting and forming', 'Welding and soldering', 'Plasma/laser cutting', 'Press brake operation'],
      'Installation': ['HVAC ductwork', 'Architectural sheet metal', 'Roofing and siding', 'Kitchen equipment', 'Industrial systems'],
      'Technical Skills': ['Blueprint reading', 'CAD/CAM for sheet metal', 'Material selection', 'Quality inspection', 'Code compliance']
    },
    certifications: ['Journeyman Sheet Metal Worker', 'OSHA 10/30', 'Welding certifications', 'EPA 608 (for HVAC work)', 'Union card'],
    context: 'Sheet metal workers fabricate and install ductwork, roofing, and architectural metal. The trade combines shop fabrication with field installation, requiring precision and physical capability.',
    hiringTip: 'Shop fabrication vs field installation are different focuses—be clear about your experience in each. "Journeyman sheet metal worker with 10 years HVAC ductwork fabrication and installation, completing 50+ commercial projects annually" shows volume and specialty. Include linear feet of ductwork installed, fabrication equipment operated, and any specialty installations (hospitals, clean rooms, kitchens).',
    mistakes: [
      { title: 'Not distinguishing shop vs field experience', detail: 'Fabrication and installation require different skills. Specify your experience in each area' },
      { title: 'Missing project scale metrics', detail: 'How much ductwork have you installed? Square footage of roofing? Numbers demonstrate experience' },
      { title: 'Ignoring specialty applications', detail: 'Hospital HVAC, commercial kitchens, or clean rooms require specialized knowledge. Highlight specialties' },
      { title: 'No fabrication equipment listed', detail: 'List plasma tables, press brakes, and other equipment you\'re proficient with' },
      { title: 'Not mentioning union status if applicable', detail: 'Union journeyman status is valuable in many markets. Include your union local' }
    ],
    interviewQuestions: [
      { q: 'What type of sheet metal work do you specialize in?', guidance: 'Discuss HVAC, architectural, roofing, or industrial specialties and your experience level in each.' },
      { q: 'Describe your experience with ductwork fabrication', guidance: 'Cover materials, equipment, pattern development, and assembly techniques.' },
      { q: 'How do you ensure proper airflow in HVAC installations?', guidance: 'Discuss balancing, sizing, testing, and coordinating with HVAC technicians.' },
      { q: 'What fabrication equipment are you proficient with?', guidance: 'List specific equipment: plasma tables, press brakes, rollers, shears, and any CNC equipment.' },
      { q: 'How do you handle working in occupied buildings?', guidance: 'Discuss customer consideration, dust control, noise management, and scheduling around building use.' }
    ],
    atsKeywords: ['sheet metal worker', 'HVAC', 'ductwork', 'fabrication', 'installation', 'journeyman', 'welding', 'layout', 'commercial', 'residential', 'architectural']
  },
  {
    slug: 'industrial-maintenance-technician',
    jobTitle: 'Industrial Maintenance Technician',
    avgSalary: '$56,000',
    jobGrowth: '+16%',
    blsUrl: 'https://www.bls.gov/ooh/installation-maintenance-and-repair/industrial-machinery-mechanics.htm',
    keySkills: ['Preventive Maintenance', 'Troubleshooting', 'PLCs', 'Hydraulics', 'Pneumatics', 'Electrical Systems', 'Welding', 'Blueprint Reading'],
    skillCategories: {
      'Mechanical Systems': ['Pumps', 'Conveyors', 'Gearboxes', 'Bearings', 'Drives', 'Hydraulics', 'Pneumatics'],
      'Electrical & Controls': ['PLCs', 'Motor controls', 'VFDs', 'Sensors', 'Electrical troubleshooting', 'Control wiring'],
      'Maintenance Practices': ['Preventive maintenance', 'Predictive maintenance', 'Root cause analysis', 'CMMS systems', 'Safety lockout/tagout']
    },
    certifications: ['Industrial Maintenance Mechanic certification', 'PLC certifications', 'Welding certifications', 'Electrical license', 'OSHA certifications'],
    context: 'Industrial maintenance technicians keep manufacturing running. Downtime costs thousands per hour, so speed, breadth of skills, and reliability are essential.',
    hiringTip: 'Uptime is everything in manufacturing. "Multi-craft maintenance technician reducing unplanned downtime by 30% through improved PM program and predictive maintenance implementation" shows real value. Include equipment types maintained, PLC brands (Allen-Bradley, Siemens), and industries (food processing, automotive, packaging). Multi-craft ability (mechanical, electrical, PLC) commands premium rates.',
    mistakes: [
      { title: 'Not listing specific equipment maintained', detail: 'What machines do you work on? CNC, packaging lines, conveyors? Specific equipment experience matters' },
      { title: 'Missing PLC experience', detail: 'PLC troubleshooting is increasingly expected. Include brands and programming/troubleshooting ability' },
      { title: 'No downtime or uptime metrics', detail: 'Reduced downtime by X%, achieved Y% uptime—these metrics demonstrate maintenance value' },
      { title: 'Ignoring multi-craft capabilities', detail: 'Mechanical, electrical, PLC, welding—list all your skill areas. Multi-craft techs are most valuable' },
      { title: 'Not mentioning CMMS experience', detail: 'SAP, Maximo, or other maintenance management systems are commonly used. Include system experience' }
    ],
    interviewQuestions: [
      { q: 'How do you troubleshoot a machine that suddenly stopped?', guidance: 'Walk through systematic diagnosis: safety, visual inspection, controls check, mechanical inspection. Show methodical approach.' },
      { q: 'Describe your experience with PLCs', guidance: 'Discuss brands used, level of ability (troubleshoot, modify, program), and specific applications.' },
      { q: 'How do you prioritize multiple maintenance requests?', guidance: 'Discuss production impact, safety criticality, and communication with production teams.' },
      { q: 'What preventive maintenance programs have you implemented?', guidance: 'Cover PM development, scheduling, tracking, and impact on equipment reliability.' },
      { q: 'Describe your experience with predictive maintenance', guidance: 'Discuss vibration analysis, thermal imaging, oil analysis, and using data to prevent failures.' }
    ],
    atsKeywords: ['industrial maintenance', 'maintenance technician', 'PLC', 'hydraulics', 'pneumatics', 'preventive maintenance', 'troubleshooting', 'manufacturing', 'mechanical', 'electrical', 'multi-craft']
  },
  {
    slug: 'heavy-equipment-operator',
    jobTitle: 'Heavy Equipment Operator',
    avgSalary: '$50,000',
    jobGrowth: '+4%',
    blsUrl: 'https://www.bls.gov/ooh/construction-and-extraction/construction-equipment-operators.htm',
    keySkills: ['Excavators', 'Bulldozers', 'Loaders', 'Graders', 'Safety Protocols', 'Grade Reading', 'GPS Systems', 'Equipment Maintenance'],
    skillCategories: {
      'Equipment Types': ['Excavators', 'Bulldozers', 'Wheel loaders', 'Backhoes', 'Graders', 'Scrapers', 'Compactors'],
      'Operations': ['Grading', 'Excavation', 'Loading', 'Trenching', 'Site prep', 'Road building'],
      'Technology': ['GPS/Machine control', 'Laser grade systems', 'Telematics', 'Basic equipment maintenance']
    },
    certifications: ['NCCER Heavy Equipment certification', 'OSHA 10/30', 'Equipment-specific certifications', 'CDL (if required)', 'MSHA (for mining)'],
    context: 'Heavy equipment operators move earth and materials on construction, mining, and infrastructure projects. The role requires precision despite operating massive machines.',
    hiringTip: 'List every piece of equipment you can run—excavators, dozers, loaders, graders. "Heavy equipment operator with 15 years experience on excavators up to CAT 390, GPS-equipped graders, and articulated dump trucks. Zero at-fault accidents, consistently meeting daily production targets." GPS/machine control experience is increasingly valuable. Include projects completed: miles of road, cubic yards moved, pipe installed.',
    mistakes: [
      { title: 'Not listing specific equipment types and sizes', detail: 'CAT 320 excavator is different from a CAT 390. List specific equipment and sizes you\'re qualified on' },
      { title: 'Missing safety record', detail: 'Heavy equipment is dangerous. Zero accidents and years without incidents are valuable credentials' },
      { title: 'Ignoring GPS/machine control experience', detail: 'Modern sites use GPS grading systems. This experience is increasingly required—highlight it' },
      { title: 'No production metrics', detail: 'Cubic yards moved, footage of pipe installed, acres graded—production numbers demonstrate capability' },
      { title: 'Not mentioning maintenance abilities', detail: 'Operators who can do basic maintenance and daily inspections add value' }
    ],
    interviewQuestions: [
      { q: 'What equipment are you most experienced with?', guidance: 'List specific machines, brands, and sizes. Include years of experience with each.' },
      { q: 'Describe your experience with GPS/machine control systems', guidance: 'Discuss systems used, ability to set up and troubleshoot, and benefits for grade work.' },
      { q: 'How do you ensure safety on the job site?', guidance: 'Cover situational awareness, communication with ground crew, and pre-operation inspections.' },
      { q: 'Walk me through your daily equipment inspection routine', guidance: 'Demonstrate knowledge of what to check: fluids, tracks/tires, hydraulics, safety devices.' },
      { q: 'Tell me about a challenging dig or grading project', guidance: 'Describe technical challenges, problem-solving, and successful completion.' }
    ],
    atsKeywords: ['heavy equipment operator', 'excavator', 'bulldozer', 'loader', 'grader', 'construction', 'GPS', 'earthmoving', 'excavation', 'grading', 'NCCER', 'OSHA']
  },
  {
    slug: 'roofer',
    jobTitle: 'Roofer',
    avgSalary: '$47,000',
    jobGrowth: '+2%',
    blsUrl: 'https://www.bls.gov/ooh/construction-and-extraction/roofers.htm',
    keySkills: ['Shingle Installation', 'Flat Roofing', 'Repairs', 'Safety Protocols', 'Waterproofing', 'Flashing', 'Material Handling', 'Blueprint Reading'],
    skillCategories: {
      'Roofing Systems': ['Asphalt shingles', 'Metal roofing', 'TPO/EPDM', 'Built-up roofing', 'Tile and slate'],
      'Installation': ['Tear-off', 'Deck repair', 'Underlayment', 'Flashing', 'Ventilation', 'Gutters'],
      'Safety & Skills': ['Fall protection', 'Ladder safety', 'Hot work (torch down)', 'Repairs and maintenance', 'Storm damage assessment']
    },
    certifications: ['OSHA 10/30', 'GAF/CertainTeed certification', 'Manufacturer certifications', 'Fall protection training', 'State contractor license'],
    context: 'Roofers protect buildings from the elements. The work is physically demanding, weather-dependent, and requires attention to detail—one missed nail can cause a leak.',
    hiringTip: 'Roofing systems matter—shingles, flat roofing, metal, tile are different specialties. "Lead roofer with 12 years experience completing 200+ residential re-roofs annually. GAF Master Elite certified, zero callbacks in past 3 years." Manufacturer certifications (GAF, CertainTeed, Owens Corning) show professionalism. Include crew size led and production metrics (squares per day).',
    mistakes: [
      { title: 'Not specifying roofing system experience', detail: 'Shingles, flat roof, metal, tile—be specific about your experience with each system' },
      { title: 'Missing production metrics', detail: 'Squares per day, roofs completed annually, crew productivity—numbers demonstrate capability' },
      { title: 'Ignoring manufacturer certifications', detail: 'GAF, CertainTeed, Owens Corning certifications show professionalism and warranty capability' },
      { title: 'No mention of quality/callback rate', detail: 'Low callback rates demonstrate quality installation. Include quality metrics if strong' },
      { title: 'Not addressing safety experience', detail: 'Roofing is dangerous. OSHA training and fall protection experience should be highlighted' }
    ],
    interviewQuestions: [
      { q: 'What roofing systems are you most experienced with?', guidance: 'Discuss shingles, flat roofing, metal, tile—your experience and certifications with each.' },
      { q: 'How do you ensure quality installations?', guidance: 'Cover inspection processes, following manufacturer specs, and attention to detail points.' },
      { q: 'Describe your experience leading a roofing crew', guidance: 'Discuss crew sizes, task delegation, quality control, and production management.' },
      { q: 'How do you handle safety on steep roofs?', guidance: 'Cover fall protection, roof jacks, harnesses, and safety protocols. This is critical.' },
      { q: 'How do you assess and repair storm damage?', guidance: 'Discuss damage identification, insurance documentation, and repair procedures.' }
    ],
    atsKeywords: ['roofer', 'roofing', 'shingles', 'flat roof', 'installation', 'residential', 'commercial', 'GAF', 'repair', 'construction', 'waterproofing']
  },
  {
    slug: 'painter',
    jobTitle: 'Painter',
    avgSalary: '$44,000',
    jobGrowth: '+5%',
    blsUrl: 'https://www.bls.gov/ooh/construction-and-extraction/painters-construction-and-maintenance.htm',
    keySkills: ['Surface Preparation', 'Interior Painting', 'Exterior Painting', 'Spray Application', 'Color Matching', 'Wallpaper', 'Safety Compliance', 'Customer Service'],
    skillCategories: {
      'Painting Techniques': ['Brush and roller', 'Spray application', 'Staining and varnishing', 'Faux finishes', 'Color matching'],
      'Surface Preparation': ['Sanding', 'Scraping', 'Patching', 'Priming', 'Caulking', 'Power washing'],
      'Specialty Work': ['Wallpaper installation', 'Cabinet refinishing', 'Epoxy coatings', 'Industrial painting', 'Lead-safe practices']
    },
    certifications: ['Lead-Safe Certified (RRP)', 'OSHA 10/30', 'Painting contractor license', 'Specialty coating certifications'],
    context: 'Painters protect and beautify buildings. The trade requires preparation discipline, technique mastery, and customer service skills for residential work.',
    hiringTip: 'Residential and commercial are different worlds—residential needs customer skills; commercial needs speed and volume. "Residential painter completing 3-4 interior repaints weekly with 100% customer referral rate" or "Commercial painter averaging 500 sq ft/hour spray application with clean cut lines." Include specific finishes (faux, cabinet, specialty coatings) and any lead-safe certification.',
    mistakes: [
      { title: 'Not distinguishing residential vs commercial', detail: 'These require different skill sets and production rates. Be clear about your experience' },
      { title: 'Missing production metrics', detail: 'Square footage per day, rooms per day, projects per week—numbers demonstrate productivity' },
      { title: 'Ignoring surface preparation', detail: 'Prep work is often 70% of the job. Describe your preparation approach and techniques' },
      { title: 'No specialty skills listed', detail: 'Faux finishes, cabinet refinishing, spray work, wallpaper—specialties command premium rates' },
      { title: 'Not mentioning lead-safe certification', detail: 'RRP certification is legally required for pre-1978 homes. Include this certification' }
    ],
    interviewQuestions: [
      { q: 'What is your approach to surface preparation?', guidance: 'Emphasize that prep is critical to quality. Describe your process for different surfaces.' },
      { q: 'Do you have experience with spray application?', guidance: 'Discuss HVLP, airless, and when each is appropriate. Include production rates.' },
      { q: 'How do you handle customer expectations and changes?', guidance: 'For residential work, customer service matters. Discuss communication and handling requests.' },
      { q: 'Describe your experience with specialty finishes', guidance: 'Discuss faux finishes, cabinet refinishing, or other specialty techniques.' },
      { q: 'How do you ensure clean cut lines and quality finish?', guidance: 'Cover technique, tools, and quality control. Demonstrate attention to detail.' }
    ],
    atsKeywords: ['painter', 'painting', 'interior', 'exterior', 'spray', 'residential', 'commercial', 'surface preparation', 'wallpaper', 'contractor', 'lead-safe']
  },
  {
    slug: 'mason',
    jobTitle: 'Mason',
    avgSalary: '$50,000',
    jobGrowth: '+2%',
    blsUrl: 'https://www.bls.gov/ooh/construction-and-extraction/brickmasons-blockmasons-and-stonemasons.htm',
    keySkills: ['Brick Laying', 'Block Work', 'Stone Installation', 'Mortar Mixing', 'Blueprint Reading', 'Layout', 'Restoration', 'Safety Compliance'],
    skillCategories: {
      'Masonry Work': ['Brick laying', 'Block work', 'Stone installation', 'Pavers', 'Chimneys', 'Fireplaces'],
      'Techniques': ['Mortar mixing', 'Layout and leveling', 'Cutting and shaping', 'Pointing and repointing', 'Waterproofing'],
      'Specialties': ['Restoration', 'Decorative masonry', 'Structural work', 'Tuckpointing', 'Hardscaping']
    },
    certifications: ['Mason certification', 'OSHA 10/30', 'Restoration certifications', 'Contractor license'],
    context: 'Masons build structures that last centuries—from foundations to decorative facades. The trade combines physical precision with craftsmanship that\'s visible in every course.',
    hiringTip: 'Brick per day or block per day is how I measure productivity. "Journeyman mason laying 500+ brick daily with plumb and level work, experienced in structural and decorative applications." Include project types: residential, commercial, restoration. Restoration and historical work is a premium specialty. Show photos of your work if possible.',
    mistakes: [
      { title: 'Not specifying masonry type', detail: 'Brick, block, stone, pavers—be specific about your experience with each material' },
      { title: 'Missing productivity metrics', detail: 'Brick or block per day demonstrates speed. Include typical production rates' },
      { title: 'Ignoring specialty experience', detail: 'Restoration, decorative work, chimneys, fireplaces—specialties command premium rates' },
      { title: 'No project type experience listed', detail: 'Residential, commercial, restoration—specify what types of projects you\'ve completed' },
      { title: 'Not showing portfolio', detail: 'Masonry is visual. Links to photos of your work demonstrate quality' }
    ],
    interviewQuestions: [
      { q: 'What masonry materials are you most experienced with?', guidance: 'Discuss brick, block, stone, and your experience level with each.' },
      { q: 'How do you ensure level and plumb walls?', guidance: 'Describe your technique for layout, string lines, and quality control during work.' },
      { q: 'Describe your experience with restoration work', guidance: 'If experienced, discuss matching existing materials, tuckpointing, and preservation techniques.' },
      { q: 'What is your typical production rate?', guidance: 'Be honest about brick/block per day. Include factors that affect production.' },
      { q: 'How do you handle challenging weather conditions?', guidance: 'Discuss cold weather masonry, protecting fresh work, and when to delay work.' }
    ],
    atsKeywords: ['mason', 'masonry', 'brick', 'block', 'stone', 'mortar', 'construction', 'journeyman', 'restoration', 'tuckpointing', 'fireplace', 'chimney']
  },
  {
    slug: 'landscaper',
    jobTitle: 'Landscaper',
    avgSalary: '$37,000',
    jobGrowth: '+5%',
    blsUrl: 'https://www.bls.gov/ooh/building-and-grounds-cleaning/grounds-maintenance-workers.htm',
    keySkills: ['Lawn Care', 'Planting', 'Irrigation', 'Hardscaping', 'Equipment Operation', 'Customer Service', 'Plant Knowledge', 'Pruning'],
    skillCategories: {
      'Maintenance': ['Lawn mowing', 'Edging', 'Pruning', 'Mulching', 'Fertilization', 'Weed control'],
      'Installation': ['Planting', 'Sod installation', 'Irrigation systems', 'Pavers and patios', 'Retaining walls'],
      'Specialized Services': ['Tree care', 'Pest management', 'Landscape design', 'Water features', 'Lighting']
    },
    certifications: ['Pesticide applicator license', 'Irrigation certification', 'Landscape technician certification', 'Equipment certifications'],
    context: 'Landscapers create and maintain outdoor spaces. The work is seasonal in many areas, physically demanding, and increasingly technical with irrigation and lighting systems.',
    hiringTip: 'Maintenance vs installation are different skill sets—tell me which you do. "Landscape foreman managing 40 residential maintenance accounts with 95% retention rate" or "Hardscape installer completing 20+ paver patios annually, experienced in retaining walls and drainage." Include pesticide applicator license if you have it—it\'s often required for chemical applications.',
    mistakes: [
      { title: 'Not specifying maintenance vs installation', detail: 'These are different career paths. Be clear about your focus and experience' },
      { title: 'Missing account or project volume', detail: 'How many accounts do you maintain? How many installations per season? Numbers demonstrate capability' },
      { title: 'Ignoring certifications', detail: 'Pesticide applicator, irrigation, CDL—include all relevant certifications' },
      { title: 'No equipment proficiency listed', detail: 'List equipment you\'re proficient with: mowers, skid steers, trenchers, etc.' },
      { title: 'Not mentioning plant knowledge', detail: 'Knowing plants, their care, and regional adaptability is valuable knowledge to highlight' }
    ],
    interviewQuestions: [
      { q: 'What type of landscaping do you specialize in?', guidance: 'Discuss maintenance vs installation, residential vs commercial, and your experience level.' },
      { q: 'Describe your experience with irrigation systems', guidance: 'Cover installation, troubleshooting, and programming. Irrigation is a growing specialty.' },
      { q: 'How do you manage multiple maintenance accounts?', guidance: 'Discuss routing, scheduling, and maintaining quality across all accounts.' },
      { q: 'What equipment are you experienced operating?', guidance: 'List commercial mowers, skid steers, mini excavators, and other equipment.' },
      { q: 'How do you handle plant selection for different conditions?', guidance: 'Demonstrate horticultural knowledge—sun/shade, soil, climate zone considerations.' }
    ],
    atsKeywords: ['landscaper', 'landscaping', 'lawn care', 'irrigation', 'planting', 'hardscape', 'maintenance', 'residential', 'commercial', 'foreman', 'horticulture']
  },
  {
    slug: 'concrete-finisher',
    jobTitle: 'Concrete Finisher',
    avgSalary: '$47,000',
    jobGrowth: '+5%',
    blsUrl: 'https://www.bls.gov/ooh/construction-and-extraction/cement-masons-and-concrete-finishers.htm',
    keySkills: ['Flatwork', 'Finishing', 'Forming', 'Stamping', 'Polishing', 'Power Troweling', 'Blueprint Reading', 'Safety Compliance'],
    skillCategories: {
      'Finishing Techniques': ['Hand finishing', 'Power troweling', 'Broom finish', 'Stamped concrete', 'Exposed aggregate', 'Polished concrete'],
      'Concrete Work': ['Flatwork', 'Forming', 'Placing', 'Reinforcement', 'Curbs and gutters', 'Structural slabs'],
      'Specialty Work': ['Decorative concrete', 'Staining', 'Epoxy coatings', 'Repair and restoration', 'Saw cutting']
    },
    certifications: ['ACI certification', 'OSHA 10/30', 'Decorative concrete certifications', 'Contractor license'],
    context: 'Concrete finishers shape and finish the most used construction material. The work is time-sensitive—once concrete is placed, you have limited time to achieve the desired finish.',
    hiringTip: 'Flatwork finisher or structural? Decorative or commercial production? Tell me your specialty. "Concrete finisher averaging 5,000 sq ft daily production with consistent FF/FL numbers" tells me you\'re fast and accurate. Decorative work (stamping, staining, polished) is a premium specialty—if you have it, highlight it. Include power trowel experience and ACI certifications if held.',
    mistakes: [
      { title: 'Not specifying concrete specialty', detail: 'Flatwork, structural, decorative—each requires different skills. Be specific about your experience' },
      { title: 'Missing production metrics', detail: 'Square footage per day, projects completed—production numbers demonstrate capability' },
      { title: 'Ignoring decorative experience', detail: 'Stamped, stained, polished concrete commands premium rates. Highlight this experience' },
      { title: 'No equipment proficiency listed', detail: 'Power trowels, screeds, laser-guided equipment—list equipment you operate' },
      { title: 'Not mentioning quality metrics', detail: 'FF/FL numbers for floor flatness and levelness demonstrate quality. Include if measured' }
    ],
    interviewQuestions: [
      { q: 'What type of concrete work do you specialize in?', guidance: 'Discuss flatwork, structural, decorative, and your experience level with each.' },
      { q: 'How do you manage finishing timing on hot days?', guidance: 'Demonstrate understanding of concrete chemistry and techniques for different conditions.' },
      { q: 'Describe your experience with decorative concrete', guidance: 'If experienced, discuss stamping, staining, or polishing techniques and projects completed.' },
      { q: 'What equipment are you proficient with?', guidance: 'Cover power trowels, screeds, and any specialty equipment like laser screeds.' },
      { q: 'How do you ensure proper curing?', guidance: 'Discuss curing methods, timing, and importance for long-term durability.' }
    ],
    atsKeywords: ['concrete finisher', 'concrete', 'flatwork', 'finishing', 'stamped', 'decorative', 'power trowel', 'forming', 'construction', 'ACI']
  },
  {
    slug: 'ironworker',
    jobTitle: 'Ironworker',
    avgSalary: '$57,000',
    jobGrowth: '+5%',
    blsUrl: 'https://www.bls.gov/ooh/construction-and-extraction/structural-iron-and-steel-workers.htm',
    keySkills: ['Structural Steel', 'Rigging', 'Welding', 'Blueprint Reading', 'Reinforcing', 'Safety Compliance', 'Crane Signals', 'Bolt-up'],
    skillCategories: {
      'Structural Work': ['Steel erection', 'Bolt-up', 'Plumbing and aligning', 'Decking', 'Curtain wall', 'Pre-cast'],
      'Reinforcing': ['Rebar placement', 'Tying', 'Post-tension', 'Estimating', 'Layout'],
      'Rigging & Safety': ['Rigging', 'Crane signals', 'Fall protection', 'Structural welding', 'Cutting']
    },
    certifications: ['Journeyman Ironworker', 'OSHA 10/30', 'Rigging certification', 'Welding certifications', 'Crane signaling'],
    context: 'Ironworkers build the steel skeletons of bridges, buildings, and infrastructure. The work is physical, heights are common, and safety is paramount.',
    hiringTip: 'Structural steel or reinforcing? These are different career paths. "Structural ironworker with 10 years experience on high-rise and bridge projects, certified in rigging and structural welding" shows capability. Include notable projects, heights worked at, and any specialized certifications. Connector and rigging experience is especially valuable for structural work.',
    mistakes: [
      { title: 'Not specifying structural vs reinforcing', detail: 'These are different specialties. Be clear about your experience in each area' },
      { title: 'Missing project scale', detail: 'Include building heights, bridge lengths, tonnage of steel placed—scale demonstrates experience' },
      { title: 'Ignoring rigging certifications', detail: 'Rigging is a critical safety skill. Include all rigging and signaling certifications' },
      { title: 'No welding certifications listed', detail: 'If certified, list welding certifications and positions qualified' },
      { title: 'Not mentioning safety record', detail: 'Ironwork is dangerous. Zero-incident records and safety training are important credentials' }
    ],
    interviewQuestions: [
      { q: 'What type of ironwork are you most experienced in?', guidance: 'Discuss structural erection, reinforcing, or both. Include years of experience.' },
      { q: 'Describe your experience with rigging', guidance: 'Cover load calculation, rigging selection, and crane signal communication.' },
      { q: 'How do you ensure safety at heights?', guidance: 'Discuss fall protection, 100% tie-off, and situational awareness. This is critical.' },
      { q: 'What welding certifications do you hold?', guidance: 'List positions and processes you\'re certified for. Field welding experience is valuable.' },
      { q: 'Tell me about a challenging project you\'ve worked on', guidance: 'Describe complexity, your role, and successful completion.' }
    ],
    atsKeywords: ['ironworker', 'structural steel', 'rigging', 'rebar', 'reinforcing', 'welding', 'construction', 'journeyman', 'erection', 'bolt-up', 'crane signals']
  },
  {
    slug: 'glazier',
    jobTitle: 'Glazier',
    avgSalary: '$48,000',
    jobGrowth: '+5%',
    blsUrl: 'https://www.bls.gov/ooh/construction-and-extraction/glaziers.htm',
    keySkills: ['Glass Installation', 'Curtain Wall', 'Storefront', 'Measurement', 'Safety Protocols', 'Sealants', 'Blueprint Reading', 'Cutting'],
    skillCategories: {
      'Installation Types': ['Curtain wall', 'Storefront systems', 'Windows', 'Skylights', 'Mirrors', 'Shower enclosures'],
      'Glass Work': ['Cutting and fabrication', 'Tempering', 'Laminated glass', 'Insulated units', 'Specialty glass'],
      'Systems & Materials': ['Aluminum framing', 'Sealants and glazing compounds', 'Hardware installation', 'Point-supported systems']
    },
    certifications: ['Journeyman Glazier', 'OSHA 10/30', 'Manufacturer certifications', 'Forklift/aerial lift certification'],
    context: 'Glaziers install glass in buildings—from skyscraper curtain walls to residential windows. The work requires precision, as glass is unforgiving of mistakes.',
    hiringTip: 'Commercial curtain wall and residential are different skill sets. "Curtain wall glazier with 15 years on high-rise projects, experienced in unitized and stick-built systems" or "Residential glazier specializing in window replacements and shower enclosures, averaging 8 installations daily." Include notable projects and any manufacturer certifications for specific systems.',
    mistakes: [
      { title: 'Not specifying commercial vs residential', detail: 'Curtain wall and residential work require different skills. Be clear about your experience' },
      { title: 'Missing project scale', detail: 'Square footage of curtain wall, number of units installed—metrics demonstrate experience' },
      { title: 'Ignoring system experience', detail: 'Kawneer, YKK, Oldcastle—mention specific systems you\'re experienced with' },
      { title: 'No safety certifications', detail: 'Include OSHA, aerial lift, and fall protection training. Glass work involves heights' },
      { title: 'Not mentioning specialty glass experience', detail: 'Fire-rated, impact-resistant, decorative—specialty glass experience adds value' }
    ],
    interviewQuestions: [
      { q: 'What glazing systems are you most experienced with?', guidance: 'Discuss curtain wall, storefront, residential, and specific manufacturer systems.' },
      { q: 'How do you ensure proper installation and weatherproofing?', guidance: 'Cover setting blocks, sealant application, and testing procedures.' },
      { q: 'Describe your experience working at height', guidance: 'Discuss swing stage, scaffolding, and aerial lift experience. Include certifications.' },
      { q: 'How do you handle damaged or broken glass?', guidance: 'Cover safety procedures, proper disposal, and replacement processes.' },
      { q: 'What specialty glass have you worked with?', guidance: 'Discuss fire-rated, laminated, low-e, or other specialty products.' }
    ],
    atsKeywords: ['glazier', 'glass', 'curtain wall', 'storefront', 'window', 'installation', 'commercial', 'residential', 'journeyman', 'sealant']
  },
  {
    slug: 'insulation-worker',
    jobTitle: 'Insulation Worker',
    avgSalary: '$47,000',
    jobGrowth: '+5%',
    blsUrl: 'https://www.bls.gov/ooh/construction-and-extraction/insulation-workers.htm',
    keySkills: ['Mechanical Insulation', 'Building Insulation', 'Fire Stopping', 'Spray Foam', 'Blueprint Reading', 'Safety Compliance', 'Asbestos Abatement', 'Energy Efficiency'],
    skillCategories: {
      'Insulation Types': ['Fiberglass', 'Spray foam', 'Rigid board', 'Mineral wool', 'Pipe covering', 'Duct wrap'],
      'Applications': ['Mechanical insulation', 'Building envelope', 'Fire stopping', 'Soundproofing', 'Cryogenic'],
      'Related Skills': ['Vapor barriers', 'Asbestos handling', 'Energy auditing', 'Blower door testing']
    },
    certifications: ['Mechanical Insulator certification', 'Asbestos handler license', 'OSHA 10/30', 'Fire stopping certification', 'EPA certifications'],
    context: 'Insulation workers improve energy efficiency and protect workers from temperature extremes in industrial settings. Mechanical insulation for pipes and equipment is a specialty demanding precision.',
    hiringTip: 'Mechanical insulation (pipes, equipment) vs building insulation (walls, attics) are different careers. "Mechanical insulator with 12 years in industrial facilities, certified in asbestos and fire stopping" shows valuable specialization. Include specific industries (refineries, power plants) and any certifications. Fire stopping certification is increasingly required.',
    mistakes: [
      { title: 'Not specifying mechanical vs building insulation', detail: 'These are different specialties with different pay scales. Be clear about your focus' },
      { title: 'Missing industry experience', detail: 'Refineries, power plants, commercial—specify the industries you\'ve worked in' },
      { title: 'Ignoring certifications', detail: 'Asbestos, fire stopping, and specialty certifications are important. List all credentials' },
      { title: 'No production metrics', detail: 'Linear feet of pipe covered, square footage of spray foam—numbers show productivity' },
      { title: 'Not mentioning safety training', detail: 'Respiratory protection, hazardous materials—safety training is essential for this trade' }
    ],
    interviewQuestions: [
      { q: 'What type of insulation work do you specialize in?', guidance: 'Discuss mechanical, building, or both. Include specific materials and applications.' },
      { q: 'Describe your experience with mechanical insulation', guidance: 'Cover pipe covering, equipment insulation, and specific industrial applications.' },
      { q: 'Do you have asbestos handling certification?', guidance: 'If certified, describe training and any abatement project experience.' },
      { q: 'How do you ensure proper installation and vapor barrier integrity?', guidance: 'Discuss installation techniques, sealing, and quality control.' },
      { q: 'What safety precautions do you follow?', guidance: 'Cover respiratory protection, hazardous material handling, and confined space if applicable.' }
    ],
    atsKeywords: ['insulation worker', 'insulation', 'mechanical insulation', 'spray foam', 'fiberglass', 'fire stopping', 'energy efficiency', 'asbestos', 'OSHA', 'industrial']
  },
  {
    slug: 'drywall-installer',
    jobTitle: 'Drywall Installer',
    avgSalary: '$47,000',
    jobGrowth: '+3%',
    blsUrl: 'https://www.bls.gov/ooh/construction-and-extraction/drywall-installers-ceiling-tile-installers-and-tapers.htm',
    keySkills: ['Hanging Drywall', 'Taping', 'Finishing', 'Ceiling Tiles', 'Metal Framing', 'Blueprint Reading', 'Safety Compliance', 'Texture Application'],
    skillCategories: {
      'Drywall Work': ['Hanging', 'Taping and finishing', 'Texturing', 'Repairs', 'Fire-rated assemblies'],
      'Framing': ['Metal stud framing', 'Acoustical ceilings', 'Soffits and bulkheads', 'Curved walls'],
      'Related Skills': ['Level 5 finish', 'Soundproofing', 'EIFS', 'Venetian plaster']
    },
    certifications: ['OSHA 10/30', 'GA-214 certified', 'Lead-safe certified', 'Scaffold training', 'Aerial lift certification'],
    context: 'Drywall installers create the interior surfaces of buildings. The trade includes hanging (boarding) and finishing (taping, mudding, texturing)—many specialize in one or the other.',
    hiringTip: 'Hanger or finisher? Commercial metal stud or residential? Tell me your specialty. "Commercial drywall hanger averaging 75 boards daily on metal stud framing" or "Level 5 finisher specializing in high-end residential." Finish level matters—Level 4 is standard, Level 5 is premium. Include boards per day (hanging) or linear feet of tape per day (finishing).',
    mistakes: [
      { title: 'Not distinguishing hanging vs finishing', detail: 'These are different skills and often different crews. Be clear about your specialty' },
      { title: 'Missing production metrics', detail: 'Boards per day, linear feet of tape—production numbers demonstrate capability' },
      { title: 'Ignoring finish level experience', detail: 'Level 4 vs Level 5 finish is significant. Specify your finishing capability' },
      { title: 'No metal framing experience listed', detail: 'Many drywall jobs include metal stud framing. Include this experience if you have it' },
      { title: 'Not mentioning fire-rated assemblies', detail: 'Fire-rated walls and ceilings are common in commercial. Include this experience' }
    ],
    interviewQuestions: [
      { q: 'Are you primarily a hanger or finisher?', guidance: 'Discuss your specialty and experience level. Many do both but prefer one.' },
      { q: 'What finish levels are you capable of producing?', guidance: 'Discuss Level 4 vs Level 5 and your experience with each.' },
      { q: 'Describe your experience with metal stud framing', guidance: 'Cover layout, installation, and integration with drywall installation.' },
      { q: 'What is your typical production rate?', guidance: 'Be honest about boards per day or linear feet of tape. Include factors affecting production.' },
      { q: 'How do you handle fire-rated assemblies?', guidance: 'Discuss proper installation, inspection requirements, and documentation.' }
    ],
    atsKeywords: ['drywall', 'drywall installer', 'taper', 'finisher', 'hanging', 'metal stud', 'acoustical ceiling', 'commercial', 'residential', 'texture', 'finishing']
  },
  {
    slug: 'floor-installer',
    jobTitle: 'Floor Installer',
    avgSalary: '$45,000',
    jobGrowth: '+5%',
    blsUrl: 'https://www.bls.gov/ooh/construction-and-extraction/flooring-installers-and-tile-and-marble-setters.htm',
    keySkills: ['Hardwood Installation', 'Tile Setting', 'Carpet Installation', 'LVP/LVT', 'Subfloor Preparation', 'Adhesives', 'Blueprint Reading', 'Customer Service'],
    skillCategories: {
      'Flooring Types': ['Hardwood', 'Tile', 'Carpet', 'LVP/LVT', 'Laminate', 'Concrete polishing'],
      'Installation Skills': ['Subfloor preparation', 'Layout and pattern', 'Adhesive application', 'Transitions and trim', 'Moisture testing'],
      'Specialty Work': ['Refinishing', 'Custom inlays', 'Heated floors', 'Commercial carpet', 'Rubber and athletic']
    },
    certifications: ['CFI Certified Floor Installer', 'NWFA certification', 'CTEF certification', 'Manufacturer certifications'],
    context: 'Floor installers create the surfaces we walk on daily. The trade spans multiple materials—hardwood, tile, carpet, vinyl—each requiring different techniques.',
    hiringTip: 'What flooring do you specialize in? Hardwood, tile, carpet, and LVP are different skill sets. "Hardwood floor installer with 15 years experience, NWFA certified, averaging 500 sq ft daily installation and 800 sq ft daily refinishing" shows productivity and certification. Include square footage per day and any manufacturer certifications (Armstrong, Shaw, Mohawk).',
    mistakes: [
      { title: 'Not specifying flooring specialty', detail: 'Hardwood, tile, carpet, LVP—be specific about what you install. Many specialize in one or two' },
      { title: 'Missing production metrics', detail: 'Square footage per day for installation and refinishing—numbers show capability' },
      { title: 'Ignoring certifications', detail: 'NWFA, CFI, CTEF certifications show professionalism. Include manufacturer certifications too' },
      { title: 'No subfloor preparation mentioned', detail: 'Prep work is critical. Describe your approach to subfloor assessment and preparation' },
      { title: 'Not mentioning customer service for residential', detail: 'Residential flooring is customer-facing. Include customer interaction skills' }
    ],
    interviewQuestions: [
      { q: 'What flooring materials are you most experienced with?', guidance: 'Discuss hardwood, tile, carpet, LVP—your specialties and experience with each.' },
      { q: 'How do you assess and prepare subfloors?', guidance: 'Cover moisture testing, leveling, and preparation for different flooring types.' },
      { q: 'What is your typical production rate?', guidance: 'Discuss square footage per day for different materials and project types.' },
      { q: 'Describe your approach to complex layouts', guidance: 'Cover pattern planning, centering, and minimizing waste on challenging rooms.' },
      { q: 'How do you handle warranties and callbacks?', guidance: 'Discuss quality standards, addressing issues, and customer satisfaction.' }
    ],
    atsKeywords: ['floor installer', 'flooring', 'hardwood', 'tile', 'carpet', 'LVP', 'installation', 'residential', 'commercial', 'NWFA', 'refinishing']
  },
  {
    slug: 'locksmith',
    jobTitle: 'Locksmith',
    avgSalary: '$45,000',
    jobGrowth: '+4%',
    blsUrl: 'https://www.bls.gov/ooh/installation-maintenance-and-repair/locksmiths-and-safe-repairers.htm',
    keySkills: ['Lock Installation', 'Key Cutting', 'Access Control', 'Safe Opening', 'Automotive Locks', 'Security Systems', 'Customer Service', 'Emergency Services'],
    skillCategories: {
      'Lock Work': ['Lock installation', 'Rekeying', 'Master key systems', 'High-security locks', 'Lock picking'],
      'Specialized Services': ['Automotive lockouts', 'Safe work', 'Access control', 'Door hardware', 'Emergency services'],
      'Modern Systems': ['Electronic locks', 'Keypad systems', 'Card readers', 'Smart locks', 'Integrated security']
    },
    certifications: ['ALOA certification', 'State locksmith license', 'Manufacturer certifications', 'Safe technician certification'],
    context: 'Locksmiths provide security and access services. The trade is evolving with electronic access control, but traditional skills remain essential for emergency services.',
    hiringTip: 'Mobile service, storefront, or institutional? These are different business models. "Mobile locksmith averaging 12 service calls daily with 4.9 rating, certified in automotive and access control" shows productivity and breadth. Include automotive experience (it\'s increasingly technical), access control certifications, and any safe work credentials.',
    mistakes: [
      { title: 'Not specifying service types', detail: 'Residential, commercial, automotive, safe work—specify your experience areas' },
      { title: 'Missing call volume metrics', detail: 'Calls per day, response time, customer ratings—service metrics demonstrate capability' },
      { title: 'Ignoring electronic access control', detail: 'Access control systems are growing. Include experience with electronic and smart locks' },
      { title: 'No automotive experience listed', detail: 'Automotive is a major service area. Include transponder programming and specialty tools used' },
      { title: 'Not mentioning customer service skills', detail: 'Locksmithing is customer-facing, often in stressful situations. Highlight interpersonal skills' }
    ],
    interviewQuestions: [
      { q: 'What types of locksmith services do you specialize in?', guidance: 'Discuss residential, commercial, automotive, and access control experience.' },
      { q: 'Describe your experience with automotive lockouts', guidance: 'Cover tools used, vehicle types, transponder programming, and special challenges.' },
      { q: 'How do you stay current with electronic locks and access control?', guidance: 'Discuss training, manufacturer certifications, and adapting to new technologies.' },
      { q: 'How do you handle emergency calls?', guidance: 'Discuss response time, customer communication, and service under pressure.' },
      { q: 'What verification do you use before providing lockout services?', guidance: 'Cover identification verification and ethical considerations—this shows professionalism.' }
    ],
    atsKeywords: ['locksmith', 'lock', 'key cutting', 'access control', 'automotive', 'security', 'rekeying', 'master key', 'emergency', 'safe', 'ALOA']
  },
  {
    slug: 'appliance-repair-technician',
    jobTitle: 'Appliance Repair Technician',
    avgSalary: '$44,000',
    jobGrowth: '+3%',
    blsUrl: 'https://www.bls.gov/ooh/installation-maintenance-and-repair/home-appliance-repairers.htm',
    keySkills: ['Diagnostics', 'Refrigeration', 'Electrical Systems', 'Customer Service', 'Parts Ordering', 'Preventive Maintenance', 'Technical Documentation', 'Problem Solving'],
    skillCategories: {
      'Major Appliances': ['Refrigerators', 'Washers/dryers', 'Dishwashers', 'Ovens/ranges', 'HVAC systems'],
      'Technical Skills': ['Electrical troubleshooting', 'Refrigeration sealed systems', 'Gas appliances', 'Control boards', 'Motor replacement'],
      'Service Skills': ['Diagnostics', 'Parts identification', 'Customer communication', 'Documentation', 'Inventory management']
    },
    certifications: ['EPA 608 Certification', 'Manufacturer certifications (Whirlpool, GE, Samsung)', 'NASTeC certification', 'Gas appliance certification'],
    context: 'Appliance repair technicians fix the machines households depend on daily. The role combines technical diagnosis, customer service, and efficient field service operations.',
    hiringTip: 'First-call completion rate and customer ratings drive success. "Appliance repair technician averaging 6-8 calls daily, 92% first-call completion, 4.8 customer rating, EPA 608 Universal certified." Include specific brands you\'re certified on (Whirlpool, Samsung, LG, GE)—manufacturer training shows capability. Commercial appliance experience pays more than residential.',
    mistakes: [
      { title: 'Not listing manufacturer certifications', detail: 'Whirlpool, Samsung, LG, GE certifications show brand-specific expertise. List all manufacturer training' },
      { title: 'Missing service metrics', detail: 'Calls per day, first-call completion rate, customer ratings—these demonstrate productivity and quality' },
      { title: 'Ignoring EPA certification', detail: 'EPA 608 is required for refrigeration work. Include your certification type' },
      { title: 'No differentiation of appliance types', detail: 'Refrigeration, laundry, cooking, HVAC—specify which appliances you\'re most experienced with' },
      { title: 'Not mentioning parts knowledge', detail: 'Identifying and ordering parts is key. Include experience with parts systems and inventory' }
    ],
    interviewQuestions: [
      { q: 'Walk me through diagnosing a refrigerator that\'s not cooling', guidance: 'Describe systematic diagnosis: sealed system, electrical, defrost system, controls. Show methodical approach.' },
      { q: 'What brands are you most experienced with?', guidance: 'Discuss manufacturer training and brands you\'ve worked on most.' },
      { q: 'How do you handle parts not in stock?', guidance: 'Discuss parts identification, ordering processes, and customer communication about delays.' },
      { q: 'Describe your customer service approach', guidance: 'You\'re in people\'s homes. Discuss communication, cleanliness, and managing expectations.' },
      { q: 'What is your first-call completion rate?', guidance: 'Be honest. Discuss factors that affect completion and how you prepare for calls.' }
    ],
    atsKeywords: ['appliance repair', 'appliance technician', 'refrigerator', 'washer', 'dryer', 'diagnostics', 'EPA 608', 'service technician', 'residential', 'commercial']
  },
  {
    slug: 'building-maintenance-technician',
    jobTitle: 'Building Maintenance Technician',
    avgSalary: '$42,000',
    jobGrowth: '+6%',
    blsUrl: 'https://www.bls.gov/ooh/installation-maintenance-and-repair/general-maintenance-and-repair-workers.htm',
    keySkills: ['General Maintenance', 'HVAC Basics', 'Plumbing', 'Electrical', 'Carpentry', 'Painting', 'Safety Compliance', 'Work Order Management'],
    skillCategories: {
      'Building Systems': ['HVAC maintenance', 'Plumbing repairs', 'Electrical basics', 'Fire safety systems', 'Elevators'],
      'General Maintenance': ['Carpentry', 'Painting', 'Drywall repair', 'Locksmithing basics', 'Landscaping'],
      'Building Operations': ['Work order systems', 'Preventive maintenance', 'Vendor coordination', 'Tenant relations', 'Emergency response']
    },
    certifications: ['EPA 608 (for HVAC)', 'OSHA 10/30', 'CPR/First Aid', 'Boiler license (where applicable)', 'Pool operator certification'],
    context: 'Building maintenance technicians keep facilities running smoothly. The role requires broad skills across multiple trades and the ability to prioritize competing demands.',
    hiringTip: 'Jack-of-all-trades, master of maintenance. "Facilities technician maintaining 250,000 sq ft Class A office building, responsible for HVAC, plumbing, electrical, and tenant improvements." Include square footage maintained, building type (office, retail, industrial, residential), and any specialized certifications. Being able to handle most issues without calling contractors saves money.',
    mistakes: [
      { title: 'Not listing building size and type', detail: 'Square footage, building class, and property type show the scale of your experience' },
      { title: 'Missing skill breadth', detail: 'HVAC, plumbing, electrical, carpentry—list all skill areas. Breadth is valued in maintenance' },
      { title: 'Ignoring work order systems', detail: 'CMMS experience (Angus, Building Engines, etc.) shows you can handle documentation and tracking' },
      { title: 'No response time metrics', detail: 'Emergency response time, work order completion rate—metrics show reliability' },
      { title: 'Not mentioning tenant relations', detail: 'In commercial properties, tenant satisfaction matters. Include customer service skills' }
    ],
    interviewQuestions: [
      { q: 'What types of buildings have you maintained?', guidance: 'Discuss square footage, property types, and systems you\'ve worked with.' },
      { q: 'How do you prioritize multiple maintenance requests?', guidance: 'Discuss safety first, tenant impact, and systematic prioritization.' },
      { q: 'What trades are you most skilled in?', guidance: 'Be honest about strengths and areas where you typically call contractors.' },
      { q: 'Describe your experience with CMMS/work order systems', guidance: 'Discuss systems used and your approach to documentation.' },
      { q: 'How do you handle after-hours emergencies?', guidance: 'Discuss response procedures, common emergencies, and decision-making under pressure.' }
    ],
    atsKeywords: ['building maintenance', 'facilities', 'maintenance technician', 'HVAC', 'plumbing', 'electrical', 'property management', 'work orders', 'preventive maintenance', 'handyman']
  },
  {
    slug: 'pest-control-technician',
    jobTitle: 'Pest Control Technician',
    avgSalary: '$38,000',
    jobGrowth: '+6%',
    blsUrl: 'https://www.bls.gov/ooh/personal-care-and-service/pest-control-workers.htm',
    keySkills: ['Pest Identification', 'Chemical Application', 'IPM', 'Customer Service', 'Route Management', 'Safety Compliance', 'Documentation', 'Sales'],
    skillCategories: {
      'Pest Management': ['General pest control', 'Termite treatment', 'Rodent control', 'Wildlife removal', 'Bed bug treatment'],
      'Application Methods': ['Chemical application', 'Baiting systems', 'Fumigation', 'Heat treatment', 'Exclusion work'],
      'Business Skills': ['Route management', 'Customer retention', 'Sales', 'Inspection reports', 'State compliance']
    },
    certifications: ['State pest control license', 'Termite certification', 'WDI certification', 'Wildlife control certification', 'IPM certification'],
    context: 'Pest control technicians protect homes and businesses from pests. The role combines technical knowledge of pest biology, safe chemical application, and customer service.',
    hiringTip: 'Route efficiency and customer retention drive success. "Pest control technician managing 150 residential accounts with 92% retention rate, licensed in general pest and termite, averaging 15 stops daily." Include specific certifications (termite, fumigation, wildlife) and account retention rates. Selling additional services (termite inspections, wildlife) is often part of the role.',
    mistakes: [
      { title: 'Not listing specific certifications', detail: 'General pest, termite, fumigation, wildlife—list all licenses and certifications held' },
      { title: 'Missing route and retention metrics', detail: 'Stops per day, accounts managed, retention rate—these show productivity and customer satisfaction' },
      { title: 'Ignoring sales experience', detail: 'Upselling services is often part of the job. Include sales achievements if applicable' },
      { title: 'No IPM knowledge mentioned', detail: 'Integrated Pest Management is industry standard. Show you understand more than just chemical application' },
      { title: 'Not specifying pest types', detail: 'General pest, termite, rodent, wildlife, bed bugs—specify your experience areas' }
    ],
    interviewQuestions: [
      { q: 'What pest control licenses do you hold?', guidance: 'List state licenses and any additional certifications like termite or wildlife.' },
      { q: 'Describe your experience with termite treatments', guidance: 'Discuss liquid treatment, baiting systems, inspection procedures, and WDI reports.' },
      { q: 'How do you handle customer complaints about recurring pests?', guidance: 'Discuss investigation, treatment adjustment, and communication.' },
      { q: 'What is your approach to route management?', guidance: 'Discuss efficiency, scheduling, and maximizing stops while maintaining quality.' },
      { q: 'How do you explain treatment options to customers?', guidance: 'Show you can communicate technical information clearly and build trust.' }
    ],
    atsKeywords: ['pest control', 'exterminator', 'termite', 'pest management', 'IPM', 'licensed', 'residential', 'commercial', 'inspection', 'treatment']
  },
  {
    slug: 'elevator-technician',
    jobTitle: 'Elevator Technician',
    avgSalary: '$97,000',
    jobGrowth: '+6%',
    blsUrl: 'https://www.bls.gov/ooh/construction-and-extraction/elevator-installers-and-repairers.htm',
    keySkills: ['Elevator Systems', 'Electrical', 'Hydraulics', 'Safety Compliance', 'Code Knowledge', 'Troubleshooting', 'Preventive Maintenance', 'Modernization'],
    skillCategories: {
      'Elevator Systems': ['Traction elevators', 'Hydraulic elevators', 'Machine-room-less', 'Escalators', 'Moving walkways'],
      'Technical Skills': ['Controls and programming', 'Door operators', 'Safety devices', 'Electrical troubleshooting', 'Hydraulic systems'],
      'Service Types': ['Installation', 'Maintenance', 'Repair', 'Modernization', 'Emergency service']
    },
    certifications: ['Elevator Mechanic License', 'OSHA certifications', 'QEI certification', 'Manufacturer training', 'State elevator license'],
    context: 'Elevator technicians install and maintain vertical transportation systems. The trade is highly specialized, well-compensated, and requires extensive training—typically a 4-year apprenticeship.',
    hiringTip: 'Elevator is one of the highest-paying trades—show me why you deserve it. "Journeyman elevator mechanic with 10 years experience in traction and hydraulic systems, QEI certified, maintaining portfolio of 75 units with 99% uptime." Include units maintained, types of systems, and any modernization project experience. Emergency callback response is critical—include your availability.',
    mistakes: [
      { title: 'Not specifying elevator types', detail: 'Traction, hydraulic, MRL, escalators—specify which systems you\'re experienced with' },
      { title: 'Missing license information', detail: 'Elevator licenses are required and vary by state. Include your license type and jurisdiction' },
      { title: 'No portfolio size mentioned', detail: 'How many units do you maintain? Portfolio size shows experience scale' },
      { title: 'Ignoring modernization experience', detail: 'Modernization projects are major work. Include significant modernization experience' },
      { title: 'Not mentioning emergency response', detail: 'Elevator technicians respond to entrapments. Include availability and response experience' }
    ],
    interviewQuestions: [
      { q: 'What elevator systems are you most experienced with?', guidance: 'Discuss traction, hydraulic, MRL, escalators—your specialties and depth of experience.' },
      { q: 'Describe a challenging troubleshooting scenario', guidance: 'Walk through diagnosis, solution, and what made it challenging. Show systematic thinking.' },
      { q: 'What is your experience with modernization projects?', guidance: 'Discuss scope, systems upgraded, and project management aspects.' },
      { q: 'How do you handle passenger entrapments?', guidance: 'Discuss response procedures, communication, and maintaining calm under pressure.' },
      { q: 'What preventive maintenance procedures do you follow?', guidance: 'Cover inspection checklists, code requirements, and documentation.' }
    ],
    atsKeywords: ['elevator technician', 'elevator mechanic', 'traction', 'hydraulic', 'escalator', 'maintenance', 'modernization', 'QEI', 'licensed', 'vertical transportation']
  },
  {
    slug: 'millwright',
    jobTitle: 'Millwright',
    avgSalary: '$58,000',
    jobGrowth: '+5%',
    blsUrl: 'https://www.bls.gov/ooh/installation-maintenance-and-repair/industrial-machinery-mechanics.htm',
    keySkills: ['Machine Installation', 'Precision Alignment', 'Rigging', 'Welding', 'Blueprint Reading', 'Hydraulics', 'Conveyor Systems', 'Turbines'],
    skillCategories: {
      'Installation & Alignment': ['Precision alignment', 'Laser alignment', 'Leveling', 'Grouting', 'Foundation work'],
      'Machinery': ['Conveyors', 'Pumps', 'Turbines', 'Compressors', 'Gearboxes', 'Paper machines'],
      'Support Skills': ['Rigging', 'Welding', 'Fabrication', 'Hydraulics', 'Pneumatics', 'PLCs']
    },
    certifications: ['Journeyman Millwright', 'Rigging certification', 'Welding certifications', 'Laser alignment certification', 'OSHA certifications'],
    context: 'Millwrights install, maintain, and repair industrial machinery. The trade requires precision—misalignment by thousandths of an inch can cause premature equipment failure.',
    hiringTip: 'Precision alignment is the millwright\'s calling card. "Journeyman millwright with 15 years experience in paper mill and power generation, laser alignment certified, rigging up to 100 tons." Include specific industries (paper, power, mining, manufacturing), tonnage rigged, and precision capabilities. Shutdown experience—working tight turnaround schedules—is valuable.',
    mistakes: [
      { title: 'Not specifying industry experience', detail: 'Paper, power, mining, manufacturing—industry experience matters. Be specific about your background' },
      { title: 'Missing precision alignment certifications', detail: 'Laser alignment certification shows precision capability. Include all alignment training' },
      { title: 'Ignoring rigging experience', detail: 'Include maximum tonnage rigged and rigging certifications' },
      { title: 'No shutdown/turnaround experience mentioned', detail: 'Plant shutdowns require working under pressure. Include outage experience' },
      { title: 'Not listing specific equipment types', detail: 'Turbines, conveyors, pumps—list specific machinery you\'ve installed and maintained' }
    ],
    interviewQuestions: [
      { q: 'What industries have you worked in as a millwright?', guidance: 'Discuss paper, power, manufacturing, or other industries and specific equipment.' },
      { q: 'Describe your precision alignment experience', guidance: 'Cover laser alignment, dial indicators, and tolerance capabilities.' },
      { q: 'What is the largest equipment you\'ve rigged?', guidance: 'Discuss tonnage, rigging plans, and complex lifts you\'ve performed.' },
      { q: 'Describe your experience with plant shutdowns', guidance: 'Discuss working under time pressure, coordination, and critical path work.' },
      { q: 'What troubleshooting approach do you use for vibration issues?', guidance: 'Cover vibration analysis, balance, alignment checks, and root cause identification.' }
    ],
    atsKeywords: ['millwright', 'precision alignment', 'rigging', 'industrial machinery', 'laser alignment', 'conveyor', 'turbine', 'journeyman', 'manufacturing', 'installation']
  },
  {
    slug: 'solar-installer',
    jobTitle: 'Solar Installer',
    avgSalary: '$47,000',
    jobGrowth: '+22%',
    blsUrl: 'https://www.bls.gov/ooh/construction-and-extraction/solar-photovoltaic-installers.htm',
    keySkills: ['PV Installation', 'Electrical Systems', 'Roof Work', 'Safety Compliance', 'System Design', 'Inverters', 'Code Compliance', 'Customer Service'],
    skillCategories: {
      'Solar Systems': ['Rooftop PV', 'Ground-mount systems', 'Inverters', 'Battery storage', 'Microinverters', 'Optimizers'],
      'Installation': ['Racking systems', 'Module installation', 'Electrical connections', 'Conduit and wiring', 'Commissioning'],
      'Support Skills': ['Roof work', 'Electrical', 'Site assessment', 'System monitoring', 'Troubleshooting']
    },
    certifications: ['NABCEP certification', 'OSHA 10/30', 'Electrical license (in some states)', 'Fall protection certification', 'Manufacturer certifications'],
    context: 'Solar installers are at the forefront of the clean energy transition. The trade combines roofing, electrical, and specialized PV system knowledge in a rapidly growing industry.',
    hiringTip: 'Solar is booming—NABCEP certification sets you apart. "NABCEP certified solar installer with 500+ residential installations, experienced in rooftop and ground-mount systems, battery storage certified." Include kW installed, system types (residential, commercial, ground-mount), and any electrical license. Battery storage experience is increasingly valuable.',
    mistakes: [
      { title: 'Not pursuing NABCEP certification', detail: 'NABCEP is the industry standard certification. It significantly increases employability and pay' },
      { title: 'Missing installation volume', detail: 'Number of systems installed, total kW—volume demonstrates experience' },
      { title: 'Ignoring electrical experience', detail: 'Solar requires electrical work. Include any electrical license or training' },
      { title: 'No battery storage experience', detail: 'Storage is growing rapidly. If you have battery installation experience, highlight it' },
      { title: 'Not specifying system types', detail: 'Residential, commercial, ground-mount—different systems require different skills' }
    ],
    interviewQuestions: [
      { q: 'What solar systems have you installed?', guidance: 'Discuss residential, commercial, ground-mount, and system sizes.' },
      { q: 'Describe your experience with battery storage systems', guidance: 'If experienced, discuss brands, integration, and commissioning procedures.' },
      { q: 'How do you ensure safety when working on roofs?', guidance: 'Cover fall protection, roof assessment, and safe work practices.' },
      { q: 'What troubleshooting experience do you have?', guidance: 'Discuss diagnosing underperforming systems, inverter issues, and monitoring systems.' },
      { q: 'Are you NABCEP certified or working toward it?', guidance: 'Discuss your certification status and commitment to industry standards.' }
    ],
    atsKeywords: ['solar installer', 'solar', 'PV', 'photovoltaic', 'NABCEP', 'renewable energy', 'rooftop', 'inverter', 'battery storage', 'electrical', 'clean energy']
  },
  {
    slug: 'wind-turbine-technician',
    jobTitle: 'Wind Turbine Technician',
    avgSalary: '$57,000',
    jobGrowth: '+44%',
    blsUrl: 'https://www.bls.gov/ooh/installation-maintenance-and-repair/wind-turbine-technicians.htm',
    keySkills: ['Turbine Maintenance', 'Electrical Systems', 'Hydraulics', 'Climbing', 'Safety Compliance', 'Troubleshooting', 'Mechanical Repair', 'SCADA'],
    skillCategories: {
      'Turbine Systems': ['Gearboxes', 'Generators', 'Blades', 'Pitch systems', 'Yaw systems', 'Nacelle components'],
      'Technical Skills': ['Electrical troubleshooting', 'Hydraulics', 'Mechanical repair', 'SCADA monitoring', 'Fiber optics'],
      'Safety & Access': ['Tower climbing', 'Rescue training', 'Confined space', 'Helicopter access', 'High-angle rescue']
    },
    certifications: ['GWO certifications', 'OSHA 10/30', 'First Aid/CPR', 'Rescue training', 'Manufacturer training (Vestas, GE, Siemens)'],
    context: 'Wind turbine technicians maintain the turbines generating clean energy. The job combines technical skill with physical demands—climbing 300+ foot towers in all weather conditions.',
    hiringTip: 'GWO certification is the global standard—have it. "Wind turbine technician with 5 years experience on Vestas V110 and GE 1.5MW platforms, GWO BST/ART certified, maintaining 40-turbine site with 97% availability." Include specific turbine platforms, site availability metrics, and any manufacturer training. The ability to work at heights in all conditions is essential.',
    mistakes: [
      { title: 'Missing GWO certifications', detail: 'GWO Basic Safety Training and Advanced Rescue Training are industry requirements. List all GWO modules' },
      { title: 'Not listing turbine platforms', detail: 'Vestas, GE, Siemens Gamesa—specify which manufacturers and models you\'re trained on' },
      { title: 'Ignoring availability metrics', detail: 'Turbine availability percentage demonstrates maintenance effectiveness. Include site metrics' },
      { title: 'No rescue training mentioned', detail: 'High-angle rescue capability is essential for wind work. Include rescue certifications' },
      { title: 'Not addressing physical requirements', detail: 'Climbing, working at height, physical fitness—acknowledge the physical demands' }
    ],
    interviewQuestions: [
      { q: 'What turbine platforms are you experienced with?', guidance: 'Discuss manufacturers, models, and specific systems you\'ve worked on.' },
      { q: 'Describe your experience with blade inspections or repairs', guidance: 'Cover inspection methods, rope access, and repair procedures.' },
      { q: 'How do you handle emergency situations at height?', guidance: 'Discuss rescue training, emergency procedures, and staying calm under pressure.' },
      { q: 'What preventive maintenance procedures do you follow?', guidance: 'Cover scheduled maintenance, inspections, and predictive maintenance technologies.' },
      { q: 'How do you troubleshoot turbine faults using SCADA?', guidance: 'Discuss interpreting alarms, remote diagnostics, and systematic troubleshooting.' }
    ],
    atsKeywords: ['wind turbine technician', 'wind energy', 'GWO', 'turbine maintenance', 'renewable energy', 'Vestas', 'GE', 'Siemens', 'climbing', 'green energy']
  }
];

function generateMDXContent(job, authorName) {
  const currentDate = new Date().toISOString().split('T')[0];
  const year = new Date().getFullYear();

  // Build skills section with categories
  let skillsSection = '## Essential Skills to Highlight\n\n';
  for (const [category, skills] of Object.entries(job.skillCategories)) {
    skillsSection += `### ${category}\n`;
    skills.forEach(skill => {
      skillsSection += `- ${skill}\n`;
    });
    skillsSection += '\n';
  }

  // Build certifications section
  let certSection = '## Valuable Certifications\n\n';
  job.certifications.forEach(cert => {
    certSection += `- ${cert}\n`;
  });

  // Build mistakes section
  let mistakesSection = '## Common Mistakes to Avoid\n\n';
  job.mistakes.forEach(mistake => {
    mistakesSection += `### ${mistake.title}\n\n${mistake.detail}\n\n`;
  });

  // Build interview questions section
  let interviewSection = `## Common ${job.jobTitle} Interview Questions\n\n`;
  interviewSection += 'Preparing for interviews is an important part of the job search process. Here are questions frequently asked in ' + job.jobTitle + ' interviews, along with guidance on how to answer them:\n\n';
  job.interviewQuestions.forEach(item => {
    interviewSection += `### "${item.q}"\n\n${item.guidance}\n\n`;
  });

  // Build ATS section
  let atsSection = `## ATS Optimization for ${job.jobTitle} Resumes\n\n`;
  atsSection += `Trade employers and staffing agencies use ATS systems to screen for certifications, experience, and specific skills. Using the right terminology ensures your resume gets seen.\n\n`;
  atsSection += '**Essential keywords to include:**\n';
  job.atsKeywords.forEach(kw => {
    atsSection += `- ${kw}\n`;
  });

  const content = `---
title: '${job.jobTitle} Resume: Examples & Writing Guide ${year}'
slug: ${job.slug}
description: >-
  ${job.jobTitle} resume example with professional resume format and templates. Highlight
  your trade skills, certifications, and work experience.
cardSummary: >-
  Get hired faster as a ${job.jobTitle}. Showcase ${job.keySkills[0]}, certifications, and hands-on expertise.
date: '${currentDate}'
author: ${authorName}
category: Trades
tags:
  - ${job.slug.replace(/-/g, ' ')} resume
  - ${job.jobTitle.toLowerCase()} resume
  - trades resume
  - skilled trades resume
  - ${job.slug.replace(/-/g, ' ')} resume example
  - ${job.slug.replace(/-/g, ' ')} resume template
  - ${job.slug.replace(/-/g, ' ')} cv example
  - resume format
  - professional resume
  - ats resume template
  - resume writing guide
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
      ${job.jobTitle} employers look for specific trade skills, certifications, and
      hands-on experience. Your skills section should lead with ${job.keySkills[0]},
      ${job.keySkills[1]}, ${job.keySkills[2]} and include certifications that demonstrate
      your qualifications. Group technical skills separately from soft skills,
      and prioritize skills mentioned in the specific job posting.
  - question: How long should a ${job.jobTitle} resume be?
    answer: >-
      One page is standard for trade positions. Experienced ${job.jobTitle}s with
      multiple certifications or supervisory experience may use two pages if
      necessary. Focus on relevant experience, certifications, and measurable
      accomplishments rather than listing every job you have held.
  - question: What is the best resume format for a ${job.jobTitle}?
    answer: >-
      For ${job.jobTitle} positions, use a reverse-chronological format that
      highlights your most recent experience first. Place certifications and
      licenses prominently—trade employers verify these before reviewing work
      history. Use a clean, professional format that is easy to scan.
  - question: How much does a ${job.jobTitle} make?
    answer: >-
      ${job.jobTitle} professionals earn an average of ${job.avgSalary}, with ${job.jobGrowth}
      projected job growth. Pay varies based on certifications, years of experience,
      specialization, union membership, and geographic location. Highlighting
      specialized skills and certifications can help you command higher wages.
  - question: What should I include in my ${job.jobTitle} resume?
    answer: >-
      A strong ${job.jobTitle} resume includes a professional summary, certifications
      and licenses section, detailed work experience with accomplishments, skills
      section covering ${job.keySkills[0]}, ${job.keySkills[1]}, ${job.keySkills[2]},
      and education or apprenticeship information. Include safety record and any
      specialized training relevant to the position.
---
## What Makes a Great ${job.jobTitle} Resume?

${job.context} With ${job.jobGrowth} job growth and an average salary of ${job.avgSalary}, the ${job.jobTitle} field offers solid career opportunities for skilled tradespeople. Your resume must communicate your certifications, hands-on experience, and ability to work safely and efficiently. This guide covers what employers look for when hiring ${job.jobTitle} professionals.

## Professional Summary Examples

**For Entry-Level ${job.jobTitle}:**
"Motivated ${job.jobTitle} with hands-on training in ${job.keySkills[0]} and ${job.keySkills[1]}. Completed apprenticeship/training program with strong foundation in ${job.keySkills[2]}. Eager to apply skills in a professional environment with commitment to safety and quality work."

**For Experienced ${job.jobTitle}:**
"Skilled ${job.jobTitle} with 5+ years of experience in ${job.keySkills[0]} and ${job.keySkills[1]}. Proven track record of completing projects on time while maintaining excellent safety record. Experienced in ${job.keySkills[2]} with strong troubleshooting abilities."

**For Senior ${job.jobTitle}:**
"Master ${job.jobTitle} with 15+ years of experience leading crews and managing complex projects. Expert in ${job.keySkills[0]}, ${job.keySkills[1]}, and ${job.keySkills[2]}. Trained 20+ apprentices and maintained zero-incident safety record over past 5 years."


## Salary & Job Outlook

${job.jobTitle} professionals earn a median annual salary of approximately **${job.avgSalary}**, with experienced professionals and those with specialized certifications earning significantly more. Employment for this occupation is projected to grow **${job.jobGrowth}** over the next decade.

**Sources:** Salary estimates are based on data from the [U.S. Bureau of Labor Statistics Occupational Outlook Handbook](${job.blsUrl}), [Glassdoor](https://www.glassdoor.com/Salaries/${job.slug}-salary-SRCH_KO0,${job.slug.length}.htm), [PayScale](https://www.payscale.com/research/US/Job=${job.jobTitle.replace(/ /g, '_')}/Hourly_Rate). Actual compensation varies based on geographic location, union membership, certifications, specialization, and years of experience.

${certSection}

${skillsSection}

## Achievement-Focused Bullet Points

Quantify your work whenever possible:

- "Completed ${job.keySkills[0]} projects with 100% customer satisfaction rating"
- "Maintained perfect safety record over 5+ years and 1,000+ service calls"
- "Reduced callback rate by 30% through thorough quality checks"
- "Trained 5 apprentices who successfully completed their certifications"
- "Increased daily productivity by 20% through improved work methods"
- "Managed projects valued at $500K+ from start to completion"

## ${job.jobTitle} Resume Format & Template Tips

Trade resumes need to communicate competence quickly. Hiring managers often review dozens of applications—make yours stand out:

- **Certifications at the top** — License numbers, certification types, and expiration dates should be immediately visible. This is the first thing employers verify
- **Quantify your experience** — Years in trade, number of projects, production metrics, and safety record with specific numbers
- **Specify equipment and systems** — List specific brands, models, or systems you\'re experienced with. Generic descriptions don\'t differentiate you
- **Include safety record** — Incident-free years, safety training completed, and OSHA certifications demonstrate professionalism
- **Show progression** — Apprentice to journeyman to master, crew lead to foreman—show career growth
- **One page preferred** — Trades value efficiency. Keep it concise and relevant

${mistakesSection}

## Hiring Manager Tip

> **${job.jobTitle} resumes that show certifications, productivity, and safety record get prioritized.**

${job.hiringTip}


${interviewSection}

Build a ${job.jobTitle} resume that works. Our AI tool structures your experience into a professional format that employers and ATS systems both respond to.

${atsSection}

## Explore More Resume Resources

Looking for more career guidance? Check out these related resources:

- [Construction Worker Resume Example](/resume-examples/construction-worker)
- [Maintenance Technician Resume Example](/resume-examples/maintenance-technician)
- [Electrician Resume Example](/resume-examples/electrician)
- [Resume Keywords by Industry](/blog/resume-keywords-by-industry)

Ready to build your ${job.jobTitle} resume? [Try our AI-powered resume builder](/builder) — optimized for ATS compatibility and employer expectations.
`;

  return content;
}

// Main execution
console.log('🚀 Generating Trades resume examples...\n');

let created = 0;
let skipped = 0;

TRADES_JOBS.forEach((job, index) => {
  const filePath = path.join(CONTENT_DIR, `${job.slug}.mdx`);

  // Check if file already exists
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
console.log(`   📁 Total Trades Jobs: ${TRADES_JOBS.length}`);
