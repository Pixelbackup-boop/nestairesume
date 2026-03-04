/**
 * Dutch (nl) locale data for resume example generation.
 * Imported by generate-locale-resume-examples.mjs via:
 *   await import('./locale-data/resume-nl.mjs')
 */

const LANG = 'nl';

// ─── CONFIG ─────────────────────────────────────────────────────────────────

export const CONFIG = {
  author: 'Jan de Vries',
  authorBio: 'Loopbaanspecialist en cv-expert met meer dan 10 jaar ervaring in het helpen van Nederlandstalige professionals bij het vinden van hun droombaan.',
  titlePattern: (job) => `cv ${job}: Voorbeelden, Sjablonen en Schrijfgids 2026`,
  descriptionPattern: (job) => `cv voorbeeld ${job.toLowerCase()} met ATS-vriendelijke sjablonen en experttips. Professioneel formaat en voorbeelden om sollicitatiegesprekken te landen in 2026.`,
  imageAltPattern: (job) => `cv voorbeeld ${job}`,
};

// ─── JOB TITLES (English → Dutch) ───────────────────────────────────────────

export const JOB_TITLES = {
  '3D Artist': '3D Artiest',
  'AI Engineer': 'AI-ingenieur',
  'AWS Cloud Engineer': 'AWS Cloud-ingenieur',
  'AWS Solution Architect': 'AWS Solution Architect',
  'Academic Advisor': 'Studieadviseur',
  'Account Executive': 'Accountmanager',
  'Account Manager': 'Accountmanager',
  'Accountant': 'Accountant',
  'Accounting Assistant': 'Administratief Medewerker Boekhouding',
  'Accounting Clerk': 'Boekhoudkundig Medewerker',
  'Accounting Intern': 'Stagiair Boekhouding',
  'Accounts Payable Specialist': 'Crediteurenadministrateur',
  'Accounts Receivable Specialist': 'Debiteurenadministrateur',
  'Administrative Assistant': 'Administratief Medewerker',
  'Android Developer': 'Android-ontwikkelaar',
  'Animal Control Officer': 'Dierenpolitieagent',
  'Animal Shelter Worker': 'Medewerker Dierenasiel',
  'Animator': 'Animator',
  'Appliance Repair Technician': 'Huishoudapparaten Reparateur',
  'Aquarium Keeper': 'Aquariumverzorger',
  'Arbitrator': 'Arbiter',
  'Architect': 'Architect',
  'Art Director': 'Art Director',
  'Assistant Director': 'Adjunct-directeur',
  'Assistant Manager': 'Assistent-manager',
  'Assistant Property Manager': 'Assistent Vastgoedbeheerder',
  'Assistant Store Manager': 'Assistent Winkelmanager',
  'Athletic Trainer': 'Atletiektrainer',
  'Audio Engineer': 'Audio-ingenieur',
  'Auditor': 'Auditor',
  'Auto Mechanic': 'Automonteur',
  'Automation Engineer': 'Automatiseringsingenieur',
  'Automotive Technician': 'Autotechnicus',
  'Backend Developer': 'Backend-ontwikkelaar',
  'Baker': 'Bakker',
  'Bank Manager': 'Bankmanager',
  'Bank Teller': 'Bankmedewerker Kassa',
  'Banquet Chef': 'Banketkok',
  'Barista': 'Barista',
  'Bartender': 'Barman',
  'Bellhop': 'Piccolo',
  'Billing Specialist': 'Factureringsspecialist',
  'Blockchain Developer': 'Blockchain-ontwikkelaar',
  'Branch Manager': 'Vestigingsmanager',
  'Brand Designer': 'Merkontwerper',
  'Budget Analyst': 'Begrotingsanalist',
  'Building Inspector': 'Bouwkundige Inspecteur',
  'Building Maintenance Technician': 'Onderhoudsmonteur Gebouwen',
  'Bus Driver': 'Buschauffeur',
  'Business Administration Professional': 'Bedrijfskundig Professional',
  'Business Analyst': 'Bedrijfsanalist',
  'Business Consultant': 'Bedrijfsadviseur',
  'Business Development Executive': 'Business Development Executive',
  'Business Development Manager': 'Business Development Manager',
  'Business Intelligence Analyst': 'Business Intelligence Analist',
  'Business Intelligence Specialist': 'Business Intelligence Specialist',
  'Business Manager': 'Bedrijfsmanager',
  'Business Owner': 'Ondernemer',
  'Busser': 'Tafelhulp',
  'CNC Machinist': 'CNC Machinist',
  'CNC Operator': 'CNC Operator',
  'Cabin Crew': 'Cabinepersoneel',
  'Cabinet Maker': 'Meubelmaker',
  'Cafeteria Worker': 'Kantinemedewerker',
  'Call Center Agent': 'Callcenteragent',
  'Call Center Representative': 'Callcentermedewerker',
  'Car Sales Associate': 'Autoverkoper',
  'Caregiver': 'Verzorger',
  'Carpenter': 'Timmerman',
  'Carpet Cleaner': 'Tapijtreiniger',
  'Case Manager': 'Casemanager',
  'Cashier': 'Kassamedewerker',
  'Casino Dealer': 'Croupier',
  'Caterer': 'Cateraar',
  'Catering Manager': 'Cateringmanager',
  'Certified Nursing Assistant': 'Gecertificeerd Verzorgingsassistent',
  'Certified Nursing Assistant (CNA)': 'Gecertificeerd Verzorgingsassistent (CNA)',
  'Change Management Specialist': 'Change Management Specialist',
  'Chef': 'Chef-kok',
  'Chemical Engineer': 'Chemisch Ingenieur',
  'Chemist': 'Scheikundige',
  'Chief Information Officer (CIO)': 'Chief Information Officer (CIO)',
  'Chief of Staff': 'Kabinetschef',
  'Chiropractor': 'Chiropractor',
  'City Planner': 'Stedenbouwkundige',
  'Civil Engineer': 'Civiel Ingenieur',
  'Claims Adjuster': 'Schadebeoordelaar',
  'Client Relations Manager': 'Relatiemanager',
  'Clinical Research Associate': 'Klinisch Onderzoeksmedewerker',
  'Clinical Research Coordinator': 'Klinisch Onderzoekscoordinator',
  'Cloud Architect': 'Cloud Architect',
  'Cloud Engineer': 'Cloud-ingenieur',
  'Code Enforcement Officer': 'Handhavingsmedewerker',
  'College Admissions Counselor': 'Studieadviseur Hoger Onderwijs',
  'College Professor': 'Universitair Docent',
  'Commercial Cleaner': 'Commercieel Schoonmaakmedewerker',
  'Commercial Real Estate Broker': 'Commercieel Makelaar',
  'Community Manager': 'Community Manager',
  'Community Outreach Coordinator': 'Coordinator Gemeenschapsrelaties',
  'Complaints Handler': 'Klachtenbehandelaar',
  'Compliance Officer': 'Compliance Officer',
  'Computer Operator': 'Computerbediener',
  'Computer Science Professional': 'Informaticus',
  'Computer Technician': 'IT-technicus',
  'Concierge': 'Concierge',
  'Concrete Finisher': 'Betonafwerker',
  'Construction Manager': 'Bouwmanager',
  'Construction Superintendent': 'Bouwopzichter',
  'Construction Worker': 'Bouwvakker',
  'Consultant': 'Consultant',
  'Content Creator': 'Content Creator',
  'Content Writer': 'Contentschrijver',
  'Contract Specialist': 'Contractspecialist',
  'Contracts Specialist': 'Contractspecialist',
  'Controller': 'Controller',
  'Copywriter': 'Copywriter',
  'Corporate Security Manager': 'Beveiligingsmanager Bedrijven',
  'Correctional Officer': 'Penitentiaire Inrichtingswerker',
  'Court Clerk': 'Griffier',
  'Court Reporter': 'Rechtbankstenograaf',
  'Creative Director': 'Creatief Directeur',
  'Crisis Counselor': 'Crisisbegeleider',
  'Cruise Ship Worker': 'Cruiseschipmedewerker',
  'Curriculum Developer': 'Curriculumontwikkelaar',
  'Customer Experience Specialist': 'Klantbelevenisspecialist',
  'Customer Service Representative': 'Klantenservicemedewerker',
  'Customer Success Manager': 'Customer Success Manager',
  'Customer Success Specialist': 'Customer Success Specialist',
  'Customer Support Specialist': 'Klantondersteuningsspecialist',
  'Customs Officer': 'Douanier',
  'Cybersecurity Analyst': 'Cybersecurity Analist',
  'Data Analyst': 'Data-analist',
  'Data Architect': 'Data Architect',
  'Data Engineer': 'Data-ingenieur',
  'Data Entry Clerk': 'Gegevensinvoermedewerker',
  'Data Entry Operator': 'Gegevensinvoeroperator',
  'Data Entry Specialist': 'Gegevensinvoerspecialist',
  'Data Scientist': 'Data Scientist',
  'Database Administrator': 'Databasebeheerder',
  'Delivery Driver': 'Bezorger',
  'Dental Assistant': 'Tandartsassistent',
  'Dental Hygienist': 'Mondhygienist',
  'Dental Office Manager': 'Praktijkmanager Tandartspraktijk',
  'Dentist': 'Tandarts',
  'Design Engineer': 'Ontwerpingenieur',
  'Desktop Support Engineer': 'Desktop Support Engineer',
  'Desktop Support Technician': 'Desktop Support Technicus',
  'DevOps Engineer': 'DevOps-ingenieur',
  'Dialysis Technician': 'Dialysetechnicus',
  'Diesel Mechanic': 'Dieselmonteur',
  'Dietary Aide': 'Dieetassistent',
  'Dietitian': 'Dietist',
  'Digital Marketer': 'Digital Marketeer',
  'Digital Marketing Manager': 'Digital Marketing Manager',
  'Digital Marketing Specialist': 'Digital Marketing Specialist',
  'Dishwasher': 'Afwasser',
  'Dispatcher': 'Dispatcher',
  'District Manager': 'Districtsmanager',
  'Doctor': 'Arts',
  'Dog Trainer': 'Hondentrainer',
  'Driver': 'Chauffeur',
  'Drywall Installer': 'Gipsplaatmonteur',
  'EMT': 'Ambulancemedewerker',
  'ESL Teacher': 'Engels als Tweede Taal Docent',
  'Editor': 'Redacteur',
  'Education Consultant': 'Onderwijsadviseur',
  'Educational Technologist': 'Onderwijstechnoloog',
  'Electrical Engineer': 'Elektrotechnisch Ingenieur',
  'Electrical Technician': 'Elektrotechnicus',
  'Electrician': 'Elektricien',
  'Elementary Teacher': 'Basisschoolleerkracht',
  'Elevator Technician': 'Lifttechnicus',
  'Embedded Systems Engineer': 'Embedded Systems Ingenieur',
  'Emergency Management Coordinator': 'Coordinator Rampenbeheersing',
  'Engineering Manager': 'Engineering Manager',
  'Environmental Compliance Officer': 'Milieuzorgmedewerker',
  'Epidemiologist': 'Epidemioloog',
  'Escrow Officer': 'Notarieel Medewerker',
  'Ethical Hacker': 'Ethisch Hacker',
  'Event Coordinator': 'Evenementencoordinator',
  'Event Manager': 'Evenementenmanager',
  'Event Planner': 'Evenementenplanner',
  'Executive Assistant': 'Directiesecretaresse',
  'Executive Chef': 'Uitvoerend Chef-kok',
  'Executive Director': 'Uitvoerend Directeur',
  'Family Services Worker': 'Gezinsondersteuner',
  'Fashion Designer': 'Modeontwerper',
  'Fast Food Worker': 'Fastfoodmedewerker',
  'Fence Installer': 'Hekwerkmonteur',
  'Finance Manager': 'Financieel Manager',
  'Financial Analyst': 'Financieel Analist',
  'Firefighter': 'Brandweerman',
  'Fitness Center Manager': 'Fitnesscentrummanager',
  'Fitness Instructor': 'Fitnessinstructeur',
  'Fitness Trainer': 'Fitnesstrainer',
  'Flight Attendant': 'Stewardess/Steward',
  'Floor Installer': 'Vloerlegger',
  'Florist': 'Bloemist',
  'Food Expeditor': 'Keukenhulp Expediteur',
  'Food Runner': 'Loopjongen',
  'Food Safety Manager': 'Voedselveiligheidsmanager',
  'Food Scientist': 'Voedingswetenschapper',
  'Food Server': 'Bediend Personeel',
  'Food Service Director': 'Foodservice Directeur',
  'Food Service Manager': 'Foodservice Manager',
  'Food Service Worker': 'Horecamedewerker',
  'Food Stylist': 'Voedselstylist',
  'Food Truck Operator': 'Foodtruck Exploitant',
  'Freelance Writer': 'Freelance Schrijver',
  'Freight Broker': 'Vrachtmakelaar',
  'Front Desk Agent': 'Receptiemedewerker',
  'Front Desk Receptionist': 'Receptionist',
  'Front End Developer': 'Front-end Ontwikkelaar',
  'Full Stack Developer': 'Full Stack Ontwikkelaar',
  'Game Designer': 'Game-ontwerper',
  'Game Developer': 'Game-ontwikkelaar',
  'Glazier': 'Glazenmaker',
  'Go Developer': 'Go-ontwikkelaar',
  'Grants Manager': 'Subsidiebeheerder',
  'Graphic Designer': 'Grafisch Ontwerper',
  'Group Fitness Instructor': 'Groepsfitness Instructeur',
  'Gym Trainer': 'Gymtrainer',
  'HR Assistant': 'HR-assistent',
  'HR Business Partner': 'HR Business Partner',
  'HR Coordinator': 'HR-coordinator',
  'HR Director': 'HR-directeur',
  'HR Executive': 'HR Executive',
  'HR Manager': 'HR-manager',
  'HR Recruiter': 'HR-recruiter',
  'HVAC Technician': 'HVAC-technicus',
  'Head Cook': 'Hoofdkok',
  'Health Coach': 'Gezondheidscoach',
  'Health Inspector': 'Gezondheidsinspecteur',
  'Heavy Equipment Operator': 'Machineoperator Zwaar Materieel',
  'Help Desk Technician': 'Helpdesktechnicus',
  'High School Teacher': 'Middelbare Schoolleraar',
  'Home Health Aide': 'Thuiszorgmedewerker',
  'Home Inspector': 'Woninginspecteur',
  'Hospice Nurse': 'Palliatief Verpleegkundige',
  'Hospital Housekeeper': 'Ziekenhuisschoonmaker',
  'Hotel Front Desk Agent': 'Hotelreceptionist',
  'Hotel Manager': 'Hotelmanager',
  'House Cleaner': 'Huishoudster',
  'Housekeeper': 'Huishoudster',
  'Housekeeping Supervisor': 'Hoofd Huishouding',
  'IT Director': 'IT-directeur',
  'IT Manager': 'IT-manager',
  'IT Recruiter': 'IT-recruiter',
  'IT Specialist': 'IT-specialist',
  'IT Support Specialist': 'IT-ondersteuningsspecialist',
  'IT Support Technician': 'IT-ondersteuning Technicus',
  'IT Technician': 'IT-technicus',
  'Illustrator': 'Illustrator',
  'Industrial Engineer': 'Industrieel Ingenieur',
  'Industrial Maintenance Technician': 'Onderhoudstechnicus Industrie',
  'Information Security Analyst': 'Informatiebeveiligingsanalist',
  'Inside Sales Representative': 'Binnendienst Verkoopvertegenwoordiger',
  'Instructional Coach': 'Instructiecoach',
  'Instructional Designer': 'Instructional Designer',
  'Insulation Worker': 'Isolatiemonteur',
  'Insurance Agent': 'Verzekeringsagent',
  'Interior Designer': 'Interieurontwerper',
  'Intern': 'Stagiair',
  'Iron Worker': 'Ijzerwerker',
  'Ironworker': 'Ijzerwerker',
  'Janitor': 'Schoonmaker',
  'Java Full Stack Developer': 'Java Full Stack Ontwikkelaar',
  'JavaScript Developer': 'JavaScript-ontwikkelaar',
  'Junior Developer': 'Junior Ontwikkelaar',
  'Kitchen Helper': 'Keukenhulp',
  'Kitchen Manager': 'Keukenmanager',
  'Lab Assistant': 'Laboratoriumassistent',
  'Lab Technician': 'Laboratoriumtechnicus',
  'Landscaper': 'Hovenier',
  'Leasing Consultant': 'Verhuurconsultant',
  'Legal Analyst': 'Juridisch Analist',
  'Legal Assistant': 'Juridisch Medewerker',
  'Legal Secretary': 'Juridisch Secretaresse',
  'Legislative Aide': 'Parlementair Medewerker',
  'Librarian': 'Bibliothecaris',
  'Library Assistant': 'Bibliotheekmedewerker',
  'Licensed Practical Nurse (LPN)': 'Gediplomeerd Verpleegkundig Medewerker (LPN)',
  'Limousine Driver': 'Limousinchauffeur',
  'Line Cook': 'Keukenmedewerker Lijn',
  'Litigation Support Specialist': 'Procesondersteuningsspecialist',
  'Loan Officer': 'Kredietadviseur',
  'Loan Processor': 'Kredietdossierbehandelaar',
  'Locksmith': 'Slotenmaker',
  'Logistics Coordinator': 'Logistiek Coordinator',
  'Logistics Manager': 'Logistiek Manager',
  'Logistics Specialist': 'Logistiek Specialist',
  'Long Haul Truck Driver': 'Vrachtwagenchauffeur Lange Afstand',
  'Loss Prevention Specialist': 'Preventiemedewerker Diefstal',
  'MRI Technologist': 'MRI-technoloog',
  'Machine Learning Engineer': 'Machine Learning Ingenieur',
  'Machine Learning Specialist': 'Machine Learning Specialist',
  'Machine Operator': 'Machine Operator',
  'Maintenance Engineer': 'Onderhoudsingenieur',
  'Maintenance Manager': 'Onderhoudsmanager',
  'Maintenance Technician': 'Onderhoudstechnicus',
  'Makeup Artist': 'Visagist',
  'Management Consultant': 'Managementconsultant',
  'Manufacturing Engineer': 'Productie-ingenieur',
  'Manufacturing Worker': 'Productiemedewerker',
  'Marketing Analyst': 'Marketinganalist',
  'Marketing Assistant': 'Marketingassistent',
  'Marketing Coordinator': 'Marketingcoordinator',
  'Marketing Director': 'Marketing Directeur',
  'Marketing Executive': 'Marketing Executive',
  'Marketing Intern': 'Marketing Stagiair',
  'Marketing Manager': 'Marketing Manager',
  'Marketing Specialist': 'Marketing Specialist',
  'Mason': 'Metselaar',
  'Massage Therapist': 'Massagetherapeut',
  'Material Handler': 'Materiaalbehandelaar',
  'Mechanical Design Engineer': 'Werktuigbouwkundig Ontwerpingenieur',
  'Mechanical Engineer': 'Werktuigbouwkundig Ingenieur',
  'Mechanical Technician': 'Mechanisch Technicus',
  'Mediator': 'Mediator',
  'Medical Assistant': 'Medisch Assistent',
  'Medical Billing Specialist': 'Medisch Factureringsspecialist',
  'Medical Coder': 'Medisch Codespecialist',
  'Medical Office Assistant': 'Medisch Administratief Medewerker',
  'Medical Receptionist': 'Medisch Receptionist',
  'Medical Representative': 'Medisch Vertegenwoordiger',
  'Medical Scribe': 'Medisch Schrijver',
  'Medical Technologist': 'Medisch Technoloog',
  'Mental Health Counselor': 'GGZ-counselor',
  'Millwright': 'Installatiemonteur',
  'Mobile Developer': 'Mobiele App Ontwikkelaar',
  'Mortgage Loan Officer': 'Hypotheekadviseur',
  'Motion Graphics Designer': 'Motion Graphics Designer',
  'Moving Company Driver': 'Verhuischauffeur',
  'Music Producer': 'Muziekproducent',
  'Nanny': 'Nanny',
  'Network Administrator': 'Netwerkbeheerder',
  'Network Engineer': 'Netwerk-ingenieur',
  'Night Auditor': 'Nachtreceptionist',
  'Node.js Developer': 'Node.js-ontwikkelaar',
  'Nurse Practitioner': 'Verpleegkundig Specialist',
  'Nursing Assistant': 'Verpleegassistent',
  'Nutritionist': 'Voedingsdeskundige',
  'Occupational Therapist': 'Ergotherapeut',
  'Occupational Therapy Assistant': 'Ergotherapeut Assistent',
  'Office Administrator': 'Kantooradministrateur',
  'Office Assistant': 'Kantoorassistent',
  'Office Clerk': 'Kantoormedewerker',
  'Office Manager': 'Officemanager',
  'Operations Analyst': 'Operationeel Analist',
  'Operations Manager': 'Operationeel Manager',
  'Optician': 'Opticien',
  'Optometrist': 'Optometrist',
  'Painter': 'Schilder',
  'Paralegal': 'Paralegal',
  'Paramedic': 'Paramedicus',
  'Park Ranger': 'Boswachter',
  'Pastry Chef': 'Patissier',
  'Payroll Specialist': 'Salarisadministrateur',
  'Penetration Tester': 'Penetratietester',
  'Personal Trainer': 'Personal Trainer',
  'Pest Control Technician': 'Ongediertebestrijder',
  'Pet Groomer': 'Hondenkapper',
  'Pet Sitter': 'Huisdieroppas',
  'Pharmacist': 'Apotheker',
  'Pharmacy Assistant': 'Apothekersassistent',
  'Pharmacy Tech': 'Apothekersassistent',
  'Pharmacy Technician': 'Apothekersmedewerker',
  'Phlebotomist': 'Phlebotomist',
  'Photographer': 'Fotograaf',
  'Physical Therapist': 'Fysiotherapeut',
  'Physical Therapy Assistant': 'Fysiotherapeut Assistent',
  'Physician Assistant': 'Physician Assistant',
  'Pilates Instructor': 'Pilates Instructeur',
  'Pizza Maker': 'Pizzabakker',
  'Platform Engineer': 'Platform-ingenieur',
  'Plumber': 'Loodgieter',
  'Police Officer': 'Politieagent',
  'Policy Analyst': 'Beleidsanalist',
  'Pool Cleaner': 'Zwembadtechnicus',
  'Pool Technician': 'Zwembadtechnicus',
  'Postal Worker': 'Postbode',
  'Power BI Developer': 'Power BI Ontwikkelaar',
  'Prep Cook': 'Keukenvoorbereider',
  'Preschool Teacher': 'Peuterspeelzaalleider',
  'Pressure Washer': 'Hogedrukspuiter',
  'Probation Officer': 'Reclasseringsmedewerker',
  'Process Engineer': 'Procesingenieur',
  'Procurement Manager': 'Inkoopmanager',
  'Procurement Specialist': 'Inkoopspecialist',
  'Product Analyst': 'Productanalist',
  'Product Designer': 'Productontwerper',
  'Product Manager': 'Productmanager',
  'Product Marketing Manager': 'Product Marketing Manager',
  'Product Owner': 'Product Owner',
  'Production Assistant': 'Productieassistent',
  'Production Engineer': 'Productie-ingenieur',
  'Production Manager': 'Productiemanager',
  'Production Worker': 'Productiemedewerker',
  'Program Coordinator': 'Programmacoordinator',
  'Project Coordinator': 'Projectcoordinator',
  'Project Engineer': 'Projectingenieur',
  'Project Manager': 'Projectmanager',
  'Prompt Engineer': 'Prompt Engineer',
  'Property Manager': 'Vastgoedbeheerder',
  'Psychiatrist': 'Psychiater',
  'Psychologist': 'Psycholoog',
  'Public Affairs Specialist': 'Public Affairs Specialist',
  'Public Health Inspector': 'Inspecteur Volksgezondheid',
  'Python Developer': 'Python-ontwikkelaar',
  'QA Analyst': 'QA-analist',
  'QA Engineer': 'QA-ingenieur',
  'QA Manager': 'QA-manager',
  'QA Tester': 'QA-tester',
  'Quality Analyst': 'Kwaliteitsanalist',
  'Quality Assurance Specialist': 'Kwaliteitsborging Specialist',
  'Quality Control Inspector': 'Kwaliteitscontroleur',
  'Quality Engineer': 'Kwaliteitsingenieur',
  'Quality Manager': 'Kwaliteitsmanager',
  'Radiologic Technologist': 'Radiologisch Technoloog',
  'React Developer': 'React-ontwikkelaar',
  'Reading Specialist': 'Leesspecialist',
  'Real Estate Agent': 'Makelaar',
  'Real Estate Appraiser': 'Vastgoedtaxateur',
  'Real Estate Assistant': 'Makelaar Assistent',
  'Real Estate Attorney': 'Vastgoedadvocaat',
  'Real Estate Investor': 'Vastgoedinvesteerder',
  'Receptionist': 'Receptionist',
  'Recreation Coordinator': 'Recreatiecoordinator',
  'Recruiter': 'Recruiter',
  'Recruiting Coordinator': 'Wervingscoordinator',
  'Registered Nurse': 'Verpleegkundige',
  'Release Engineer': 'Release-ingenieur',
  'Research Analyst': 'Onderzoeksanalist',
  'Research Assistant': 'Onderzoeksassistent',
  'Reservation Agent': 'Reserveringsagent',
  'Resident Assistant': 'Woonbegeleider',
  'Residential Cleaner': 'Huishoudelijk Schoonmaker',
  'Respiratory Therapist': 'Ademhalingsterapeut',
  'Restaurant Manager': 'Restaurantmanager',
  'Retail Assistant': 'Winkelmedewerker',
  'Retail Associate': 'Winkelmedewerker',
  'Retail Manager': 'Retailmanager',
  'Retail Sales Associate': 'Verkoopmedewerker Retail',
  'Retail Store Manager': 'Winkelmanager',
  'Risk Management Specialist': 'Risicobeheer Specialist',
  'Roofer': 'Dakdekker',
  'Rust Developer': 'Rust-ontwikkelaar',
  'SAP Consultant': 'SAP Consultant',
  'SOC Analyst': 'SOC Analist',
  'Sales Assistant': 'Verkoopmedewerker',
  'Sales Associate': 'Verkoopmedewerker',
  'Sales Consultant': 'Verkoopconsultant',
  'Sales Coordinator': 'Verkoopcoordinator',
  'Sales Director': 'Verkoopdirecteur',
  'Sales Engineer': 'Sales Engineer',
  'Sales Executive': 'Sales Executive',
  'Sales Manager': 'Verkoopmanager',
  'Sales Representative': 'Verkoopvertegenwoordiger',
  'Salesforce Administrator': 'Salesforce Beheerder',
  'School Administrator': 'Schooladministrateur',
  'School Counselor': 'Schooldecaan',
  'Scrum Master': 'Scrum Master',
  'Seaman': 'Zeeman',
  'Security Analyst': 'Beveiligingsanalist',
  'Security Engineer': 'Beveiligingsingenieur',
  'Security Guard': 'Beveiliger',
  'Security Officer': 'Beveiligingsbeambte',
  'Server': 'Ober',
  'Service Advisor': 'Service Adviseur',
  'Service Crew': 'Servicepersoneel',
  'Set Designer': 'Decorontwerper',
  'Sheet Metal Worker': 'Plaatwerker',
  'Shipping & Receiving Clerk': 'Expeditie Medewerker',
  'Site Engineer': 'Werkplaatsingenieur',
  'Site Reliability Engineer': 'Site Reliability Engineer',
  'Small Business Owner': 'Kleine Ondernemer',
  'Social Media Coordinator': 'Social Media Coordinator',
  'Social Media Manager': 'Social Media Manager',
  'Social Media Specialist': 'Social Media Specialist',
  'Social Worker': 'Maatschappelijk Werker',
  'Software Architect': 'Software Architect',
  'Software Developer': 'Software Ontwikkelaar',
  'Software Engineer': 'Software-ingenieur',
  'Software Tester': 'Software Tester',
  'Solar Installer': 'Zonnepanelen Installateur',
  'Solution Architect': 'Solution Architect',
  'Solutions Engineer': 'Solutions Engineer',
  'Sommelier': 'Sommelier',
  'Sous Chef': 'Sous-chef',
  'Spa Manager': 'Spa Manager',
  'Special Education Teacher': 'Speciaal Onderwijs Leraar',
  'Speech-Language Pathologist': 'Logopedist',
  'Sports Coach': 'Sportcoach',
  'Stage Manager': 'Toneelmeester',
  'Sterile Processing Technician': 'Sterilisatietechnicus',
  'Store Associate': 'Winkelmedewerker',
  'Store Manager': 'Winkelmanager',
  'Storyboard Artist': 'Storyboardtekenaar',
  'Substance Abuse Counselor': 'Verslavingsconsultant',
  'Supply Chain Analyst': 'Supply Chain Analist',
  'Supply Chain Manager': 'Supply Chain Manager',
  'Support Worker': 'Ondersteuningsmedewerker',
  'Surgical Technologist': 'Operatietechnoloog',
  'Sushi Chef': 'Sushikok',
  'System Administrator': 'Systeembeheerder',
  'System Analyst': 'Systeemanalyticus',
  'System Engineer': 'Systeem-ingenieur',
  'TSA Agent': 'Luchtvaartbeveiliger',
  'Talent Acquisition Specialist': 'Talentacquisitie Specialist',
  'Teacher': 'Leraar',
  'Teaching Assistant': 'Onderwijsassistent',
  'Team Leader': 'Teamleider',
  'Tech Sales Representative': 'Tech Verkoopvertegenwoordiger',
  'Technical Program Manager': 'Technisch Programmamanager',
  'Technical Recruiter': 'Technisch Recruiter',
  'Technical Support Specialist': 'Technisch Ondersteuningsspecialist',
  'Technical Writer': 'Technisch Schrijver',
  'Therapist': 'Therapeut',
  'Title Examiner': 'Eigendomsonderzoeker',
  'Tour Guide': 'Reisgids',
  'Travel Agent': 'Reisagent',
  'Truck Driver': 'Vrachtwagenchauffeur',
  'Tutor': 'Bijlesleraar',
  'UI Designer': 'UI-ontwerper',
  'UX Designer': 'UX-ontwerper',
  'UX Researcher': 'UX-onderzoeker',
  'Ultrasound Technician': 'Echoscopist',
  'Valet Attendant': 'Parkeerbediende',
  'Veterans Service Officer': 'Veteranenzorgambtenaar',
  'Veterinary Assistant': 'Dierenartsassistent',
  'Veterinary Technician': 'Dierenartstechnicus',
  'Video Editor': 'Video Editor',
  'Videographer': 'Videograaf',
  'Virtual Assistant': 'Virtueel Assistent',
  'Voice Actor': 'Stemacteur',
  'Waiter/Waitress': 'Ober/Serveerster',
  'Warehouse Associate': 'Magazijnmedewerker',
  'Warehouse Manager': 'Magazijnmanager',
  'Warehouse Worker': 'Magazijnmedewerker',
  'Web Designer': 'Webontwerper',
  'Web Developer': 'Webontwikkelaar',
  'Welder': 'Lasser',
  'Wellness Coach': 'Wellnesscoach',
  'Wildlife Biologist': 'Wildbioloog',
  'Wind Turbine Technician': 'Windturbinetechnicus',
  'Window Cleaner': 'Glazenwasser',
  'X-Ray Technician': 'Rontgentechnicus',
  'Yoga Instructor': 'Yogaleraar',
  'Youth Counselor': 'Jeugdhulpverlener',
  'Zookeeper': 'Dierenverzorger',
  'iOS Developer': 'iOS-ontwikkelaar',
};

// ─── CATEGORIES (English → Dutch) ────────────────────────────────────────────

export const CATEGORIES = {
  Technology: 'Technologie',
  Healthcare: 'Gezondheidszorg',
  Trades: 'Vakmanschap',
  Hospitality: 'Horeca',
  'Food Service': 'Foodservice',
  Creative: 'Creatief',
  Education: 'Onderwijs',
  Government: 'Overheid',
  Finance: 'Financien',
  Marketing: 'Marketing',
  Business: 'Bedrijfsleven',
  Engineering: 'Techniek',
  Sales: 'Verkoop',
  Legal: 'Juridisch',
  'Real Estate': 'Vastgoed',
  HR: 'Human Resources',
  Fitness: 'Fitness',
  Management: 'Management',
  'Animal Care': 'Dierenverzorging',
  Logistics: 'Logistiek',
  'Customer Service': 'Klantenservice',
  Administrative: 'Administratief',
  Transportation: 'Transport',
  Retail: 'Retail',
  Cleaning: 'Schoonmaak',
  'Social Services': 'Sociale Diensten',
  Manufacturing: 'Productie',
  Construction: 'Bouw',
  Security: 'Beveiliging',
  Science: 'Wetenschap',
  Events: 'Evenementen',
  'Writing & Content': 'Schrijven & Content',
  'Supply Chain': 'Supply Chain',
  Research: 'Onderzoek',
  Insurance: 'Verzekeringen',
  Consulting: 'Advies',
  Aviation: 'Luchtvaart',
  Automotive: 'Automotive',
  Media: 'Media',
  Maritime: 'Maritiem',
  'Law Enforcement': 'Politie en Handhaving',
  'Entry-Level': 'Startend',
  Entertainment: 'Entertainment',
  Childcare: 'Kinderopvang',
  Beauty: 'Schoonheid',
  Architecture: 'Architectuur',
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function normalizeCategory(category) {
  const c = category.toLowerCase();
  if (c.includes('hospitality') || c.includes('hotel')) return 'Hospitality';
  if (c.includes('tech') || c.includes('engineering') || c.includes('software') || c.includes('it')) return 'Technology';
  if (c.includes('health') || c.includes('medical') || c.includes('nursing')) return 'Healthcare';
  if (c.includes('finance') || c.includes('accounting') || c.includes('banking')) return 'Finance';
  if (c.includes('food') || c.includes('culinary') || c.includes('restaurant')) return 'Food Service';
  if (c.includes('trade') || c.includes('construction') || c.includes('manufacturing')) return 'Trades';
  if (c.includes('creative') || c.includes('design') || c.includes('art')) return 'Creative';
  if (c.includes('education') || c.includes('teaching')) return 'Education';
  if (c.includes('admin') || c.includes('office')) return 'Administrative';
  if (c.includes('sales')) return 'Sales';
  if (c.includes('marketing')) return 'Marketing';
  if (c.includes('hr') || c.includes('human resource')) return 'HR';
  if (c.includes('customer') || c.includes('support')) return 'Customer Service';
  if (c.includes('retail') || c.includes('store')) return 'Retail';
  if (c.includes('logistics') || c.includes('warehouse') || c.includes('supply')) return 'Logistics';
  if (c.includes('government') || c.includes('law enforcement') || c.includes('security') || c.includes('police')) return 'Government';
  if (c.includes('legal')) return 'Legal';
  return 'default';
}

// ─── CATEGORY OPENERS ────────────────────────────────────────────────────────

const CATEGORY_OPENERS = {
  Technology: (job) => `Een effectief cv als ${job} gaat veel verder dan een lijst van beheersde technologieen. Het toont het vermogen om concrete problemen op te lossen, kwantificeert de impact van je werk en benadrukt je begrip van de technische uitdagingen van de beoogde functie.`,
  Healthcare: (job) => `Recruiters in de zorgsector zoeken kandidaten die zowel sterke klinische vaardigheden als oprechte betrokkenheid bij het welzijn van patienten kunnen aantonen. Een goed cv als ${job} balanceert technische vakbekwaamheid met menselijke kwaliteiten.`,
  Finance: (job) => `Financiele recruiters geven de voorkeur aan kandidaten die complexe data omzetten in strategische beslissingen. Een cv als ${job} moet analytische scherpte, aandacht voor detail en goed oordeelsvermogen in financiele kwesties aantonen.`,
  Education: (job) => `Recruiters in het onderwijs zoeken professionals die leren inspireren en zich aanpassen aan diverse leerbehoeften. Een cv als ${job} moet je pedagogische expertise en betrokkenheid bij de ontwikkeling van leerlingen weerspiegelen.`,
  'Food Service': (job) => `Recruiters in de horecasector zoeken betrouwbaarheid, teamgeest en passie voor het vak. Een cv als ${job} moet je technische kookvaardigheden en het vermogen om onder druk te presteren benadrukken.`,
  Hospitality: (job) => `De horecasector waardeert warmte, oog voor detail en elegantie onder druk. Een cv als ${job} moet je klantgerichte instelling en het vermogen om gedenkwaardige ervaringen te creeren weerspiegelen.`,
  Trades: (job) => `Werkgevers waarderen gekwalificeerde vakmensen die zelfstandig kunnen werken en kwalitatief werk leveren. Een cv als ${job} moet je praktijkervaring, veiligheidsbewustzijn en probleemoplossend vermogen op de werkvloer benadrukken.`,
  Creative: (job) => `De beste creatieve professionals combineren artistieke uitstekendheid met begrip van klantbehoeften. Een cv als ${job} moet je creatieve visie tonen terwijl het je zakelijk inzicht en het vermogen om projecten op tijd te leveren aantoont.`,
  Administrative: (job) => `Werkgevers zoeken kandidaten die behoeften anticiperen, problemen proactief oplossen en vertrouwelijkheid bewaren. Een effectief cv als ${job} toont organisatorische excellentie en het vermogen om operaties soepel te laten verlopen.`,
  Sales: (job) => `Jouw cv is je eerste verkooppitch, en recruiters beoordelen het als zodanig. De effectiefste aanpak voor een cv als ${job} is aantonen dat je de commerciele uitdagingen van het bedrijf begrijpt en kunt bijdragen aan de omzetdoelstellingen.`,
  Marketing: (job) => `Marketing evolueert snel en recruiters zoeken kandidaten die zowel strategie als uitvoering beheersen. Een cv als ${job} moet aantonen dat je meetbare resultaten genereert met creatief strategisch denken.`,
  HR: (job) => `In tegenstelling tot andere zakelijke functies vereisen HR-rollen het aantonen van het vermogen om te navigeren in gevoelige organisatiedynamieken terwijl je concrete bedrijfsresultaten boekt.`,
  'Customer Service': (job) => `Klantenservice-functies vereisen uitzonderlijke communicatievaardigheden en echte empathie. Een cv als ${job} moet aantonen dat je problemen effectief oplost terwijl je positieve klantrelaties onderhoudt.`,
  Retail: (job) => `Retailwerkgevers waarderen betrouwbaarheid, productkennis en oprechte enthousiasme voor klantservice. Een cv als ${job} moet je verkoopprestaties en het vermogen om te gedijen in een dynamische omgeving benadrukken.`,
  Logistics: (job) => `Logistieke werkgevers geven prioriteit aan efficientie, nauwkeurigheid en het vermogen om tijdgevoelige operaties te beheren. Een cv als ${job} moet je ervaring in voorraadbeheer, planning en procesoptimalisatie benadrukken.`,
  Government: (job) => `Sollicitaties in de publieke sector vereisen een andere aanpak dan de private sector. Een cv als ${job} moet direct inspelen op de functievereisten en tegelijk je betrokkenheid bij publieke dienstverlening en het algemeen belang tonen.`,
  Legal: (job) => `De juridische sector vereist absolute precisie en nauwgezette aandacht voor detail. Een cv als ${job} moet je intellectuele scherpte, kennis van het regelgevend kader en het vermogen om complexe dossiers te beheren weerspiegelen.`,
  default: (job) => `Een effectief cv als ${job} richt zich op concrete resultaten die aantonen dat je vanaf dag een waarde toevoegt. Het combineert relevante ervaring met oprechte enthousiasme voor de beoogde functie.`,
};

// ─── TAGS GENERATOR ──────────────────────────────────────────────────────────

export function generateTags(jobTitle, slug) {
  const lower = jobTitle.toLowerCase();
  return [
    `cv ${lower}`,
    `cv voorbeeld ${lower}`,
    `cv sjabloon ${lower}`,
    `cv schrijven ${lower}`,
    `cv template`,
    `ats cv opstellen`,
    `cv sjabloon gratis`,
    `cv maken`,
  ];
}

// ─── FAQ GENERATOR ───────────────────────────────────────────────────────────

export function generateFAQ(jobTitle) {
  const lower = jobTitle.toLowerCase();
  return [
    {
      question: `Welke vaardigheden moet ik vermelden op een cv als ${lower}?`,
      answer: `Vermeld de technische vaardigheden die direct relevant zijn voor de functie van ${lower}, samen met overdraagbare vaardigheden zoals communicatie en teamwork. Gebruik de trefwoorden uit de vacature en onderbouw elke vaardigheid met een concreet voorbeeld van een professionele prestatie.`,
    },
    {
      question: `Hoe lang moet een cv als ${lower} zijn?`,
      answer: `Een cv als ${lower} past het best op een pagina voor starters en medior profielen, en kan uitgebreid worden tot twee paginas voor senior profielen met meer dan 10 jaar ervaring. Geef de voorkeur aan kwaliteit boven kwantiteit en zorg ervoor dat elk element waarde toevoegt.`,
    },
    {
      question: `Welk cv-formaat is het beste voor een functie als ${lower}?`,
      answer: `Het omgekeerd chronologische formaat is het meest aanbevolen voor een cv als ${lower}, omdat het je loopbaanontwikkeling benadrukt. Gebruik een professioneel ATS-compatibel sjabloon met duidelijke secties: contactgegevens, professionele samenvatting, werkervaring, opleiding en vaardigheden.`,
    },
    {
      question: `Wat is het salaris van een ${lower}?`,
      answer: `Het salaris van een ${lower} varieert afhankelijk van ervaring, locatie en bedrijfsgrootte. Raadpleeg actuele salarisgegevens op sites zoals Glassdoor of PayScale voor een realistische bandbreedte in jouw regio. Het vermelden van gekwantificeerde prestaties in je cv versterkt je positie bij salarisonderhandelingen.`,
    },
    {
      question: `Wat moet er op een cv als ${lower} staan?`,
      answer: `Een volledig cv als ${lower} moet je contactgegevens bevatten, een krachtige professionele samenvatting, werkervaring met meetbare prestaties, opleiding, relevante certificeringen en kernvaardigheden. Pas elke sectie aan op de specifieke eisen van de beoogde functie.`,
    },
  ];
}

// ─── BODY GENERATOR ──────────────────────────────────────────────────────────

export function generateBody(jobTitle, category, keySkills, avgSalary, jobGrowth, slug) {
  const lower = jobTitle.toLowerCase();
  const skills = keySkills || [];
  const topSkills = skills.slice(0, 3).join(', ') || 'kernvaardigheden';
  const midSkills = skills.slice(3, 6).join(', ') || 'aanvullende vaardigheden';
  const softSkills = skills.slice(6, 8).join(', ') || 'teamwerk, communicatie';

  const norm = normalizeCategory(category);
  const opener = (CATEGORY_OPENERS[norm] || CATEGORY_OPENERS.default)(jobTitle);

  return `
## Wat Maakt een Goed cv als ${jobTitle}?

${opener}

Recruiters besteden gemiddeld zes tot zeven seconden aan de eerste lezing van een cv. Voor een functie als ${lower} betekent dit dat je meest relevante vaardigheden en belangrijkste prestaties onmiddellijk zichtbaar moeten zijn. Een goed gestructureerd cv vermeldt niet alleen je ervaringen — het vertelt het verhaal van je loopbaan en toont de waarde die je aan het bedrijf toevoegt.

## Professionele Samenvatting Voorbeelden

### Startend

Gemotiveerde ${lower} met een solide opleiding in ${topSkills || 'vakgerelateerde vaardigheden'}. Enthousiast om bij te dragen aan een dynamisch team en mijn academische kennis toe te passen in een professionele omgeving. Bekend om snel leren, organisatorisch vermogen en vastberadenheid om gestelde doelen te bereiken.

### Medior

${jobTitle} met meer dan 5 jaar ervaring in ${topSkills}. Bewezen resultaten in het verbeteren van processen en het opleveren van projecten binnen tijd en budget. Expert in ${midSkills || 'geavanceerde vaardigheden'}, met een aangetoond vermogen om junior teamleden te begeleiden en initiatieven voor continue verbetering te leiden.

### Senior

Senior ${jobTitle} met meer dan 10 jaar sectorervaring, erkend als expert in ${topSkills} en ${midSkills || 'strategisch management'}. Heeft multidisciplinaire teams van meer dan 15 personen geleid en strategische projecten aangestuurd die meer dan EUR 500.000 aan besparingen genereerden. Uitgebreide vaardigheden in ${softSkills || 'leiderschap en strategische visie'}, met een consistente track record van het overtreffen van doelstellingen.

## Salaris en Arbeidsmarktperspectief

Het gemiddeld salaris van een ${lower} bedraagt circa **${avgSalary || '$50,000'}** per jaar, met significante variaties afhankelijk van ervaring, geografische locatie en sector. De verwachte groei van de werkgelegenheid voor deze functie bedraagt **${jobGrowth || '+5%'}** in de komende jaren.

Startende professionals kunnen een aanvangssalaris verwachten van 70% tot 80% van het mediaansalaris, terwijl senior of gespecialiseerde profielen dit mediaan met 40% tot 60% kunnen overschrijden. Stedelijke regio's en sectoren met hoge vraag bieden doorgaans hogere vergoedingen.

**Bronnen:**
- [Bureau of Labor Statistics (BLS)](https://www.bls.gov/ooh/) — Officiele gegevens over werkgelegenheid en salarissen in de VS
- [Glassdoor](https://www.glassdoor.com/Salaries/) — Door werknemers gerapporteerde salarissen en beloningsbandbreedtes
- [PayScale](https://www.payscale.com/research/US/) — Salarisonderzoek en vergelijkingen per functie

*De werkelijke beloning varieert afhankelijk van ervaring, locatie, sector en bedrijfsgrootte.*

## Essentiele Vaardigheden om te Benadrukken

### Technische Vaardigheden
${skills.slice(0, 3).map(s => `- **${s}** — Fundamentele vaardigheid voor elke ${lower}, direct gezocht door recruiters en ATS-systemen`).join('\n') || '- Beheersing van de tools en technologieen die specifiek zijn voor de functie\n- Diepgaande kennis van de methoden en processen in de sector\n- Vermogen om professionele software effectief te gebruiken'}

### Organisatorische Vaardigheden
${skills.slice(3, 6).map(s => `- **${s}** — Gewaardeerde vaardigheid in de dagelijkse uitoefening van de rol van ${lower}`).join('\n') || '- Tijdbeheer en prioritering van taken\n- Organisatie en projectplanning\n- Nauwkeurigheid in het opvolgen van procedures'}

### Persoonlijke Vaardigheden
${skills.slice(6, 8).map(s => `- **${s}** — Essentiiele interpersoonlijke kwaliteit om te slagen als ${lower}`).join('\n') || '- Schriftelijke en mondelinge communicatie\n- Teamwerk en samenwerking'}
- Aanpassingsvermogen en het vermogen om onder druk te werken
- Conflictoplossing en onderhandelen

## Prestatiegerichte cv-Punten

Gebruik deze voorbeelden als sjabloon om je eigen prestaties met concrete cijfers te formuleren:

- Verbeterde de operationele efficientie met **25%** door procesoptimalisatie in ${topSkills || 'kernvaardigheden'}, wat aanzienlijke jaarlijkse besparingen genereerde
- Beheerde tegelijkertijd **12+ projecten** met een tijdige oplevering van 98%, waarmee de teamdoelstellingen werden overtroffen
- Trainde en begeleidde **8 junior collega's**, wat bijdroeg aan een verkorting van de integratiperiode met 40%
- Implementeerde een nieuw systeem voor ${skills[0] || 'beheer'} dat fouten met **35%** verminderde en de klanttevredenheid verbeterde
- Verhoogde de omzet met **20%** in een kwartaal door innovatieve strategieen in ${skills[1] || 'ontwikkeling'}
- Behaalde een klanttevredenheidscore van **95%** door continue verbeteringen op basis van gebruikersfeedback

## cv-Formaat en Sjabloontips voor ${jobTitle}

1. **Gebruik omgekeerd chronologisch formaat** — Zet je meest recente ervaring bovenaan. Dit is het formaat dat de voorkeur heeft van recruiters en ATS-systemen voor functies als ${lower}.
2. **Pas je professionele samenvatting aan per sollicitatie** — Neem de trefwoorden uit de vacature over en personaliseer je profiel om te laten zien dat je de specifieke uitdagingen van de functie begrijpt.
3. **Kwantificeer je prestaties** — Cijfers trekken de aandacht en maken je bijdragen tastbaar. Schrijf liever "verhoogde verkoop met 30%" dan "verbeterde commerciele resultaten".
4. **Verzorg de opmaak** — Gebruik marges van 2,5 cm, een professioneel lettertype (Calibri, Arial, Garamond) in grootte 10-12, en secties duidelijk afgebakend door vette titels.
5. **Vermeld relevante certificeringen en opleidingen** — Voor een functie als ${lower} tonen professionele certificeringen en bijscholing je betrokkenheid bij de ontwikkeling van je vaardigheden.

## Tip van de Recruiter

> **De meest voorkomende fout die ik zie in cv's van ${lower} is het ontbreken van meetbare resultaten.** Veel kandidaten beschrijven hun verantwoordelijkheden zonder ooit de concrete impact van hun werk te laten zien.

Wanneer ik een ${lower} recruiter, zoek ik tastbaar bewijs van prestaties. Een kandidaat die schrijft "Leidde een team van 5 personen" vertelt me minder dan iemand die schrijft "Leidde een team van 5 personen en bereikte 115% van de kwartaaldoelstellingen gedurende 4 opeenvolgende kwartalen". Elke regel in je ervaringssectie moet de vraag beantwoorden: welk meetbaar resultaat heb ik behaald?

Denk er ook aan je vocabulaire aan te passen aan de beoogde sector. Gespecialiseerde recruiters in ${category.toLowerCase()} merken onmiddellijk generieke termen op die verraden dat een cv niet gepersonaliseerd is.

## Veelgestelde Interviewvragen voor ${jobTitle}

### Kunt u een complex project beschrijven dat u succesvol heeft afgerond als ${lower}?

Recruiters willen je vermogen evalueren om complexiteit te beheren. Structureer je antwoord volgens de STAR-methode (Situatie, Taak, Actie, Resultaat). Beschrijf de context, je specifieke rol, de acties die je hebt ondernomen en de meetbare resultaten die je hebt behaald.

### Hoe gaat u om met druksituaties of strakke deadlines in uw rol als ${lower}?

Toon je vermogen om prioriteiten te stellen en effectief te blijven onder druk. Geef een concreet voorbeeld waarbij je tegenstrijdige prioriteiten moest beheren, leg je methodische aanpak uit en deel het positieve resultaat dat je hebt behaald.

### Wat zijn uw sterkste technische vaardigheden in relatie tot deze functie als ${lower}?

Dit is de gelegenheid om je expertise in ${topSkills || 'kernvaardigheden'} te benadrukken. Volstaan met het opsommen van vaardigheden is niet genoeg: illustreer ze met voorbeelden van concrete toepassingen en resultaten die dankzij deze vaardigheden zijn behaald.

### Hoe blijft u op de hoogte van ontwikkelingen in uw sector?

Recruiters willen verzekerd zijn dat je investeert in je continue professionele ontwikkeling. Noem recente trainingen, certificeringen, conferenties, vakpublicaties of professionele gemeenschappen waar je actief aan deelneemt.

### Waar ziet u zichzelf over vijf jaar in het vakgebied van ${lower}?

Toon dat je een duidelijke visie hebt op je professionele ontwikkeling. Uit realistische ambities die aansluiten bij de groeimogelijkheden van het bedrijf, terwijl je je langetermijnbetrokkenheid bij de sector aantoont.

## Veelgemaakte Fouten om te Vermijden

### 1. Een generiek cv gebruiken dat niet is aangepast aan de functie

Hetzelfde cv voor elke sollicitatie insturen is de meest schadelijke fout. ATS-systemen en recruiters herkennen onmiddellijk een niet-gepersonaliseerd cv. Pas je professionele samenvatting en trefwoorden aan voor elke vacature als ${lower}.

### 2. Taken beschrijven in plaats van prestaties

Het opsommen van dagelijkse verantwoordelijkheden maakt geen indruk op recruiters. Transformeer elk punt in een meetbare prestatie. "Beheerde klantenoproepen" wordt "Verwerkte gemiddeld 85 oproepen per dag met een first-contact-resolutiepercentage van 92%".

### 3. ATS-optimalisatie verwaarlozen

Veel kandidaten voor de functie van ${lower} verliezen kansen omdat hun cv de automatische filters niet doorkomt. Vermijd complexe tabellen, kop- en voetteksten en afbeeldingen die niet worden gelezen door ATS-parsers.

### 4. Verouderde of niet-relevante informatie opnemen

Ervaringen van meer dan 15 jaar geleden of zonder verband met de functie van ${lower} maken je cv onoverzichtelijk. Concentreer je op de laatste 10 jaar en op ervaringen die direct relevant zijn voor de beoogde functie.

### 5. Sectorspecifieke trefwoorden vergeten

Elke sector heeft zijn eigen professioneel jargon. Voor een functie als ${lower} kan het ontbreken van specifieke technische termen zoals ${topSkills || 'vakgerelateerde vaardigheden'} een gebrek aan expertise signaleren aan de recruiter.

## ATS-Optimalisatie voor cv's als ${jobTitle}

Applicant Tracking Systems (ATS) filteren cv's voordat een recruiter ze bekijkt. Om je kansen te maximaliseren als ${lower}:

- **Neem de exacte trefwoorden uit de vacature over** — Als de advertentie "${skills[0] || 'specifieke vaardigheid'}" vermeldt, gebruik dan exact die formulering in je cv
- **Gebruik een eenvoudig en leesbaar formaat** — Vermijd meerdere kolommen, tabellen en tekstvakken die ATS-parsers verstoren
- **Vermeld kernvaardigheden in meerdere secties** — Noem ${topSkills || 'je belangrijkste vaardigheden'} in je professionele samenvatting, je werkervaring EN je vaardigheidssectie
- **Geef de voorkeur aan PDF- of DOCX-formaat** — Deze formaten worden het beste ondersteund door moderne ATS-systemen
- **Vermeld zowel acroniemen als volledige termen** — Schrijf bijvoorbeeld "Kwaliteitsborging (QA)" om beide zoekvarianten te dekken
- **Vermijd kop- en voetteksten** — Sommige ATS-systemen lezen de inhoud in deze zones niet

## Aanvullende Bronnen

Raadpleeg deze bronnen om je sollicitatie als ${lower} te verbeteren:

- [Controleer de ATS-compatibiliteit van je cv](/nl/tools/ats-checker) — Test je cv gratis met onze ATS-analysetool
- [Professionele cv-voorbeelden](/nl/resume-examples) — Bekijk honderden sjablonen per sector
- [ATS-vriendelijke cv-sjablonen](/nl/templates) — Kies uit onze sjablonen die geoptimaliseerd zijn voor automatische filters

Klaar om een professioneel en ATS-vriendelijk cv als ${lower} te maken? Gebruik onze [gratis cv-maker](/nl/builder) om in enkele minuten een sterk cv te ontwerpen. Onze sjablonen zijn geoptimaliseerd voor ATS-systemen en begeleiden je stap voor stap bij het schrijven van elke sectie.
`;
}
