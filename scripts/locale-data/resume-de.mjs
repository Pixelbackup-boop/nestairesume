#!/usr/bin/env node
/**
 * German (de) locale data for resume example generation.
 * Used by: scripts/generate-locale-resume-examples.mjs --lang de
 *
 * Exports: CONFIG, JOB_TITLES, CATEGORIES, generateTags, generateFAQ, generateBody
 */

// ─── CONFIG ──────────────────────────────────────────────────────────────────

export const CONFIG = {
  author: 'Lisa Müller',
  authorBio: 'Karriereberaterin und Bewerbungsexpertin mit über 10 Jahren Erfahrung in der Unterstützung deutschsprachiger Fachkräfte bei der beruflichen Weiterentwicklung.',
  titlePattern: (job) => `${job} Lebenslauf: Beispiele, Vorlagen und Schreibtipps 2026`,
  descriptionPattern: (job) => `${job} Lebenslauf mit ATS-freundlichen Vorlagen und Expertentipps. Professionelles Format und Beispiele für erfolgreiche Bewerbungen 2026.`,
  imageAltPattern: (job) => `${job} Lebenslauf Beispiel`,
};

// ─── JOB TITLES (554 entries) ────────────────────────────────────────────────

export const JOB_TITLES = {
  '3D Artist': '3D-Künstler',
  'AI Engineer': 'KI-Ingenieur',
  'AWS Cloud Engineer': 'AWS Cloud Engineer',
  'AWS Solution Architect': 'AWS Solution Architect',
  'Academic Advisor': 'Studienberater',
  'Account Executive': 'Account Executive',
  'Account Manager': 'Account Manager',
  'Accountant': 'Buchhalter',
  'Accounting Assistant': 'Buchhaltungsassistent',
  'Accounting Clerk': 'Buchhaltungskraft',
  'Accounting Intern': 'Buchhaltungspraktikant',
  'Accounts Payable Specialist': 'Kreditorenbuchhalter',
  'Accounts Receivable Specialist': 'Debitorenbuchhalter',
  'Administrative Assistant': 'Verwaltungsassistent',
  'Android Developer': 'Android-Entwickler',
  'Animal Control Officer': 'Tierschutzbeauftragter',
  'Animal Shelter Worker': 'Tierheimmitarbeiter',
  'Animator': 'Animator',
  'Appliance Repair Technician': 'Haushaltsgerätetechniker',
  'Aquarium Keeper': 'Aquarienpfleger',
  'Arbitrator': 'Schiedsrichter',
  'Architect': 'Architekt',
  'Art Director': 'Art Director',
  'Assistant Director': 'Stellvertretender Direktor',
  'Assistant Manager': 'Stellvertretender Geschäftsführer',
  'Assistant Property Manager': 'Assistenz der Hausverwaltung',
  'Assistant Store Manager': 'Stellvertretender Filialleiter',
  'Athletic Trainer': 'Sporttrainer',
  'Audio Engineer': 'Tontechniker',
  'Auditor': 'Wirtschaftsprüfer',
  'Auto Mechanic': 'Kfz-Mechaniker',
  'Automation Engineer': 'Automatisierungsingenieur',
  'Automotive Technician': 'Kfz-Mechatroniker',
  'Backend Developer': 'Backend-Entwickler',
  'Baker': 'Bäcker',
  'Bank Manager': 'Bankdirektor',
  'Bank Teller': 'Bankkaufmann',
  'Banquet Chef': 'Bankettchef',
  'Barista': 'Barista',
  'Bartender': 'Barkeeper',
  'Bellhop': 'Hotelpage',
  'Billing Specialist': 'Abrechnungsspezialist',
  'Blockchain Developer': 'Blockchain-Entwickler',
  'Branch Manager': 'Filialleiter',
  'Brand Designer': 'Markendesigner',
  'Budget Analyst': 'Budgetanalyst',
  'Building Inspector': 'Bauinspektor',
  'Building Maintenance Technician': 'Gebäudetechniker',
  'Bus Driver': 'Busfahrer',
  'Business Administration Professional': 'Betriebswirt',
  'Business Analyst': 'Business Analyst',
  'Business Consultant': 'Unternehmensberater',
  'Business Development Executive': 'Business Development Executive',
  'Business Development Manager': 'Business Development Manager',
  'Business Intelligence Analyst': 'Business Intelligence Analyst',
  'Business Intelligence Specialist': 'Business Intelligence Spezialist',
  'Business Manager': 'Geschäftsführer',
  'Business Owner': 'Unternehmer',
  'Busser': 'Abräumer',
  'CNC Machinist': 'CNC-Fräser',
  'CNC Operator': 'CNC-Bediener',
  'Cabin Crew': 'Kabinenpersonal',
  'Cabinet Maker': 'Tischler',
  'Cafeteria Worker': 'Kantinenmitarbeiter',
  'Call Center Agent': 'Callcenter-Agent',
  'Call Center Representative': 'Callcenter-Mitarbeiter',
  'Car Sales Associate': 'Automobilverkäufer',
  'Caregiver': 'Pflegekraft',
  'Carpenter': 'Zimmermann',
  'Carpet Cleaner': 'Teppichreiniger',
  'Case Manager': 'Fallmanager',
  'Cashier': 'Kassierer',
  'Casino Dealer': 'Croupier',
  'Caterer': 'Caterer',
  'Catering Manager': 'Catering-Manager',
  'Certified Nursing Assistant': 'Examinierte Pflegehilfskraft',
  'Certified Nursing Assistant (CNA)': 'Examinierte Pflegehilfskraft (CNA)',
  'Change Management Specialist': 'Change-Management-Spezialist',
  'Chef': 'Küchenchef',
  'Chemical Engineer': 'Chemieingenieur',
  'Chemist': 'Chemiker',
  'Chief Information Officer (CIO)': 'Chief Information Officer (CIO)',
  'Chief of Staff': 'Stabschef',
  'Chiropractor': 'Chiropraktiker',
  'City Planner': 'Stadtplaner',
  'Civil Engineer': 'Bauingenieur',
  'Claims Adjuster': 'Schadensregulierer',
  'Client Relations Manager': 'Kundenbeziehungsmanager',
  'Clinical Research Associate': 'Klinischer Forschungsassistent',
  'Clinical Research Coordinator': 'Klinischer Forschungskoordinator',
  'Cloud Architect': 'Cloud-Architekt',
  'Cloud Engineer': 'Cloud Engineer',
  'Code Enforcement Officer': 'Bauordnungsbeauftragter',
  'College Admissions Counselor': 'Studienberatung Hochschulzulassung',
  'College Professor': 'Hochschulprofessor',
  'Commercial Cleaner': 'Gebäudereiniger',
  'Commercial Real Estate Broker': 'Gewerbeimmobilienmakler',
  'Community Manager': 'Community Manager',
  'Community Outreach Coordinator': 'Koordinator für Öffentlichkeitsarbeit',
  'Complaints Handler': 'Beschwerdemanager',
  'Compliance Officer': 'Compliance-Beauftragter',
  'Computer Operator': 'Computerbediener',
  'Computer Science Professional': 'Informatiker',
  'Computer Technician': 'Computertechniker',
  'Concierge': 'Concierge',
  'Concrete Finisher': 'Betonbauer',
  'Construction Manager': 'Bauleiter',
  'Construction Superintendent': 'Baustellenleiter',
  'Construction Worker': 'Bauarbeiter',
  'Consultant': 'Berater',
  'Content Creator': 'Content Creator',
  'Content Writer': 'Texter',
  'Contract Specialist': 'Vertragsspezialist',
  'Contracts Specialist': 'Vertragsmanager',
  'Controller': 'Controller',
  'Copywriter': 'Werbetexter',
  'Corporate Security Manager': 'Leiter Unternehmenssicherheit',
  'Correctional Officer': 'Justizvollzugsbeamter',
  'Court Clerk': 'Gerichtsschreiber',
  'Court Reporter': 'Protokollführer',
  'Creative Director': 'Creative Director',
  'Crisis Counselor': 'Krisenberater',
  'Cruise Ship Worker': 'Kreuzfahrtmitarbeiter',
  'Curriculum Developer': 'Lehrplanentwickler',
  'Customer Experience Specialist': 'Spezialist für Kundenerfahrung',
  'Customer Service Representative': 'Kundendienstmitarbeiter',
  'Customer Success Manager': 'Customer Success Manager',
  'Customer Success Specialist': 'Customer Success Spezialist',
  'Customer Support Specialist': 'Kundensupport-Spezialist',
  'Customs Officer': 'Zollbeamter',
  'Cybersecurity Analyst': 'Cybersecurity-Analyst',
  'Data Analyst': 'Datenanalyst',
  'Data Architect': 'Datenarchitekt',
  'Data Engineer': 'Data Engineer',
  'Data Entry Clerk': 'Dateneingabekraft',
  'Data Entry Operator': 'Datenerfasser',
  'Data Entry Specialist': 'Dateneingabespezialist',
  'Data Scientist': 'Data Scientist',
  'Database Administrator': 'Datenbankadministrator',
  'Delivery Driver': 'Lieferfahrer',
  'Dental Assistant': 'Zahnmedizinische Fachangestellte',
  'Dental Hygienist': 'Dentalhygieniker',
  'Dental Office Manager': 'Praxismanager Zahnarztpraxis',
  'Dentist': 'Zahnarzt',
  'Design Engineer': 'Konstruktionsingenieur',
  'Desktop Support Engineer': 'Desktop-Support-Ingenieur',
  'Desktop Support Technician': 'Desktop-Support-Techniker',
  'DevOps Engineer': 'DevOps Engineer',
  'Dialysis Technician': 'Dialysetechniker',
  'Diesel Mechanic': 'Dieselmechaniker',
  'Dietary Aide': 'Diätassistent',
  'Dietitian': 'Ernährungsberater',
  'Digital Marketer': 'Digital Marketing Spezialist',
  'Digital Marketing Manager': 'Digital Marketing Manager',
  'Digital Marketing Specialist': 'Online-Marketing-Spezialist',
  'Dishwasher': 'Spülkraft',
  'Dispatcher': 'Disponent',
  'District Manager': 'Bezirksleiter',
  'Doctor': 'Arzt',
  'Dog Trainer': 'Hundetrainer',
  'Driver': 'Fahrer',
  'Drywall Installer': 'Trockenbauer',
  'EMT': 'Rettungssanitäter',
  'ESL Teacher': 'DaF-Lehrer',
  'Editor': 'Redakteur',
  'Education Consultant': 'Bildungsberater',
  'Educational Technologist': 'Bildungstechnologe',
  'Electrical Engineer': 'Elektroingenieur',
  'Electrical Technician': 'Elektrotechniker',
  'Electrician': 'Elektriker',
  'Elementary Teacher': 'Grundschullehrer',
  'Elevator Technician': 'Aufzugstechniker',
  'Embedded Systems Engineer': 'Embedded-Systems-Ingenieur',
  'Emergency Management Coordinator': 'Koordinator für Notfallmanagement',
  'Engineering Manager': 'Engineering Manager',
  'Environmental Compliance Officer': 'Umweltschutzbeauftragter',
  'Epidemiologist': 'Epidemiologe',
  'Escrow Officer': 'Treuhandbeauftragter',
  'Ethical Hacker': 'Ethical Hacker',
  'Event Coordinator': 'Veranstaltungskoordinator',
  'Event Manager': 'Veranstaltungsmanager',
  'Event Planner': 'Eventplaner',
  'Executive Assistant': 'Assistenz der Geschäftsleitung',
  'Executive Chef': 'Chefkoch',
  'Executive Director': 'Geschäftsführer',
  'Family Services Worker': 'Familienbetreuer',
  'Fashion Designer': 'Modedesigner',
  'Fast Food Worker': 'Fast-Food-Mitarbeiter',
  'Fence Installer': 'Zaunbauer',
  'Finance Manager': 'Finanzmanager',
  'Financial Analyst': 'Finanzanalyst',
  'Firefighter': 'Feuerwehrmann',
  'Fitness Center Manager': 'Fitnessstudioleiter',
  'Fitness Instructor': 'Fitnesstrainer',
  'Fitness Trainer': 'Fitnesstrainer',
  'Flight Attendant': 'Flugbegleiter',
  'Floor Installer': 'Bodenleger',
  'Florist': 'Florist',
  'Food Expeditor': 'Küchen-Expedient',
  'Food Runner': 'Servierhilfe',
  'Food Safety Manager': 'Lebensmittelsicherheitsmanager',
  'Food Scientist': 'Lebensmitteltechnologe',
  'Food Server': 'Servicekraft',
  'Food Service Director': 'Gastronomiedirektor',
  'Food Service Manager': 'Gastronomiemanager',
  'Food Service Worker': 'Gastronomiemitarbeiter',
  'Food Stylist': 'Food Stylist',
  'Food Truck Operator': 'Food-Truck-Betreiber',
  'Freelance Writer': 'Freiberuflicher Autor',
  'Freight Broker': 'Frachtmakler',
  'Front Desk Agent': 'Rezeptionist',
  'Front Desk Receptionist': 'Empfangsmitarbeiter',
  'Front End Developer': 'Frontend-Entwickler',
  'Full Stack Developer': 'Full-Stack-Entwickler',
  'Game Designer': 'Game Designer',
  'Game Developer': 'Spieleentwickler',
  'Glazier': 'Glaser',
  'Go Developer': 'Go-Entwickler',
  'Grants Manager': 'Fördermittelmanager',
  'Graphic Designer': 'Grafikdesigner',
  'Group Fitness Instructor': 'Gruppenfitnesstrainer',
  'Gym Trainer': 'Fitnesstrainer im Fitnessstudio',
  'HR Assistant': 'Personalassistent',
  'HR Business Partner': 'HR Business Partner',
  'HR Coordinator': 'Personalkoordinator',
  'HR Director': 'Personaldirektor',
  'HR Executive': 'Personalvorstand',
  'HR Manager': 'Personalmanager',
  'HR Recruiter': 'Personalreferent',
  'HVAC Technician': 'HLK-Techniker',
  'Head Cook': 'Chefkoch',
  'Health Coach': 'Gesundheitscoach',
  'Health Inspector': 'Gesundheitsinspektor',
  'Heavy Equipment Operator': 'Baumaschinenführer',
  'Help Desk Technician': 'Helpdesk-Techniker',
  'High School Teacher': 'Gymnasiallehrer',
  'Home Health Aide': 'Häusliche Pflegekraft',
  'Home Inspector': 'Gebäudegutachter',
  'Hospice Nurse': 'Hospizkrankenschwester',
  'Hospital Housekeeper': 'Krankenhausreiniger',
  'Hotel Front Desk Agent': 'Hotelrezeptionist',
  'Hotel Manager': 'Hoteldirektor',
  'House Cleaner': 'Reinigungskraft',
  'Housekeeper': 'Hauswirtschafter',
  'Housekeeping Supervisor': 'Hauswirtschaftsleiter',
  'IT Director': 'IT-Direktor',
  'IT Manager': 'IT-Manager',
  'IT Recruiter': 'IT-Recruiter',
  'IT Specialist': 'IT-Spezialist',
  'IT Support Specialist': 'IT-Support-Spezialist',
  'IT Support Technician': 'IT-Support-Techniker',
  'IT Technician': 'IT-Techniker',
  'Illustrator': 'Illustrator',
  'Industrial Engineer': 'Wirtschaftsingenieur',
  'Industrial Maintenance Technician': 'Industriemechaniker',
  'Information Security Analyst': 'Informationssicherheitsanalyst',
  'Inside Sales Representative': 'Vertriebsinnendienst-Mitarbeiter',
  'Instructional Coach': 'Unterrichtscoach',
  'Instructional Designer': 'Instruktionsdesigner',
  'Insulation Worker': 'Isolierer',
  'Insurance Agent': 'Versicherungsvertreter',
  'Interior Designer': 'Innenarchitekt',
  'Intern': 'Praktikant',
  'Iron Worker': 'Stahlbauschlosser',
  'Ironworker': 'Eisenflechter',
  'Janitor': 'Hausmeister',
  'Java Full Stack Developer': 'Java Full-Stack-Entwickler',
  'JavaScript Developer': 'JavaScript-Entwickler',
  'Junior Developer': 'Junior-Entwickler',
  'Kitchen Helper': 'Küchenhilfe',
  'Kitchen Manager': 'Küchenleiter',
  'Lab Assistant': 'Laborassistent',
  'Lab Technician': 'Labortechniker',
  'Landscaper': 'Landschaftsgärtner',
  'Leasing Consultant': 'Leasingberater',
  'Legal Analyst': 'Rechtsanalyst',
  'Legal Assistant': 'Rechtsanwaltsfachangestellter',
  'Legal Secretary': 'Rechtssekretär',
  'Legislative Aide': 'Parlamentarischer Mitarbeiter',
  'Librarian': 'Bibliothekar',
  'Library Assistant': 'Bibliotheksassistent',
  'Licensed Practical Nurse (LPN)': 'Examinierte Krankenpflegerin (LPN)',
  'Limousine Driver': 'Limousinenfahrer',
  'Line Cook': 'Postenkoch',
  'Litigation Support Specialist': 'Spezialist für Prozessunterstützung',
  'Loan Officer': 'Kreditsachbearbeiter',
  'Loan Processor': 'Kreditbearbeiter',
  'Locksmith': 'Schlüsseldienst',
  'Logistics Coordinator': 'Logistikkoordinator',
  'Logistics Manager': 'Logistikmanager',
  'Logistics Specialist': 'Logistikspezialist',
  'Long Haul Truck Driver': 'Fernfahrer',
  'Loss Prevention Specialist': 'Verlustpräventionsspezialist',
  'MRI Technologist': 'MRT-Technologe',
  'Machine Learning Engineer': 'Machine Learning Engineer',
  'Machine Learning Specialist': 'Machine Learning Spezialist',
  'Machine Operator': 'Maschinenbediener',
  'Maintenance Engineer': 'Instandhaltungsingenieur',
  'Maintenance Manager': 'Instandhaltungsleiter',
  'Maintenance Technician': 'Wartungstechniker',
  'Makeup Artist': 'Visagist',
  'Management Consultant': 'Managementberater',
  'Manufacturing Engineer': 'Fertigungsingenieur',
  'Manufacturing Worker': 'Produktionsmitarbeiter',
  'Marketing Analyst': 'Marketinganalyst',
  'Marketing Assistant': 'Marketingassistent',
  'Marketing Coordinator': 'Marketingkoordinator',
  'Marketing Director': 'Marketingdirektor',
  'Marketing Executive': 'Marketing Executive',
  'Marketing Intern': 'Marketingpraktikant',
  'Marketing Manager': 'Marketingmanager',
  'Marketing Specialist': 'Marketingspezialist',
  'Mason': 'Maurer',
  'Massage Therapist': 'Massagetherapeut',
  'Material Handler': 'Lagermitarbeiter',
  'Mechanical Design Engineer': 'Konstruktionsingenieur Maschinenbau',
  'Mechanical Engineer': 'Maschinenbauingenieur',
  'Mechanical Technician': 'Mechaniker',
  'Mediator': 'Mediator',
  'Medical Assistant': 'Medizinische Fachangestellte',
  'Medical Billing Specialist': 'Medizinischer Abrechnungsspezialist',
  'Medical Coder': 'Medizinischer Kodierer',
  'Medical Office Assistant': 'Arzthelfer',
  'Medical Receptionist': 'Medizinische Empfangskraft',
  'Medical Representative': 'Pharmareferent',
  'Medical Scribe': 'Medizinischer Dokumentationsassistent',
  'Medical Technologist': 'Medizintechnologe',
  'Mental Health Counselor': 'Psychologischer Berater',
  'Millwright': 'Mühlenbauer',
  'Mobile Developer': 'Mobile-Entwickler',
  'Mortgage Loan Officer': 'Hypothekenberater',
  'Motion Graphics Designer': 'Motion Graphics Designer',
  'Moving Company Driver': 'Umzugsfahrer',
  'Music Producer': 'Musikproduzent',
  'Nanny': 'Kindermädchen',
  'Network Administrator': 'Netzwerkadministrator',
  'Network Engineer': 'Netzwerkingenieur',
  'Night Auditor': 'Nachtrevisor',
  'Node.js Developer': 'Node.js-Entwickler',
  'Nurse Practitioner': 'Krankenpfleger mit erweiterter Praxis',
  'Nursing Assistant': 'Pflegehelfer',
  'Nutritionist': 'Ernährungswissenschaftler',
  'Occupational Therapist': 'Ergotherapeut',
  'Occupational Therapy Assistant': 'Ergotherapieassistent',
  'Office Administrator': 'Büroleiter',
  'Office Assistant': 'Büroassistent',
  'Office Clerk': 'Büroangestellter',
  'Office Manager': 'Office Manager',
  'Operations Analyst': 'Betriebsanalyst',
  'Operations Manager': 'Betriebsleiter',
  'Optician': 'Optiker',
  'Optometrist': 'Augenoptiker',
  'Painter': 'Maler',
  'Paralegal': 'Rechtsanwaltsgehilfe',
  'Paramedic': 'Notfallsanitäter',
  'Park Ranger': 'Parkranger',
  'Pastry Chef': 'Konditor',
  'Payroll Specialist': 'Lohn- und Gehaltsbuchhalter',
  'Penetration Tester': 'Penetration Tester',
  'Personal Trainer': 'Personal Trainer',
  'Pest Control Technician': 'Schädlingsbekämpfer',
  'Pet Groomer': 'Tierpfleger',
  'Pet Sitter': 'Tiersitter',
  'Pharmacist': 'Apotheker',
  'Pharmacy Assistant': 'Pharmazeutisch-kaufmännische Angestellte',
  'Pharmacy Tech': 'Pharmazeutisch-technischer Assistent',
  'Pharmacy Technician': 'Pharmazeutisch-technische Assistentin',
  'Phlebotomist': 'Phlebotomist',
  'Photographer': 'Fotograf',
  'Physical Therapist': 'Physiotherapeut',
  'Physical Therapy Assistant': 'Physiotherapieassistent',
  'Physician Assistant': 'Arztassistent',
  'Pilates Instructor': 'Pilates-Trainer',
  'Pizza Maker': 'Pizzabäcker',
  'Platform Engineer': 'Platform Engineer',
  'Plumber': 'Klempner',
  'Police Officer': 'Polizeibeamter',
  'Policy Analyst': 'Politikanalyst',
  'Pool Cleaner': 'Poolreiniger',
  'Pool Technician': 'Pooltechniker',
  'Postal Worker': 'Postbote',
  'Power BI Developer': 'Power BI Entwickler',
  'Prep Cook': 'Vorbereitungskoch',
  'Preschool Teacher': 'Erzieher',
  'Pressure Washer': 'Hochdruckreiniger-Techniker',
  'Probation Officer': 'Bewährungshelfer',
  'Process Engineer': 'Prozessingenieur',
  'Procurement Manager': 'Einkaufsleiter',
  'Procurement Specialist': 'Einkaufsspezialist',
  'Product Analyst': 'Produktanalyst',
  'Product Designer': 'Produktdesigner',
  'Product Manager': 'Produktmanager',
  'Product Marketing Manager': 'Produktmarketingmanager',
  'Product Owner': 'Product Owner',
  'Production Assistant': 'Produktionsassistent',
  'Production Engineer': 'Produktionsingenieur',
  'Production Manager': 'Produktionsleiter',
  'Production Worker': 'Produktionsmitarbeiter',
  'Program Coordinator': 'Programmkoordinator',
  'Project Coordinator': 'Projektkoordinator',
  'Project Engineer': 'Projektingenieur',
  'Project Manager': 'Projektmanager',
  'Prompt Engineer': 'Prompt Engineer',
  'Property Manager': 'Immobilienverwalter',
  'Psychiatrist': 'Psychiater',
  'Psychologist': 'Psychologe',
  'Public Affairs Specialist': 'Spezialist für Öffentlichkeitsarbeit',
  'Public Health Inspector': 'Gesundheitsaufseher',
  'Python Developer': 'Python-Entwickler',
  'QA Analyst': 'QA-Analyst',
  'QA Engineer': 'QA-Ingenieur',
  'QA Manager': 'QA-Manager',
  'QA Tester': 'QA-Tester',
  'Quality Analyst': 'Qualitätsanalyst',
  'Quality Assurance Specialist': 'Qualitätssicherungsspezialist',
  'Quality Control Inspector': 'Qualitätskontrolleur',
  'Quality Engineer': 'Qualitätsingenieur',
  'Quality Manager': 'Qualitätsmanager',
  'Radiologic Technologist': 'Radiologietechnologe',
  'React Developer': 'React-Entwickler',
  'Reading Specialist': 'Leseförderspezialist',
  'Real Estate Agent': 'Immobilienmakler',
  'Real Estate Appraiser': 'Immobiliengutachter',
  'Real Estate Assistant': 'Immobilienassistent',
  'Real Estate Attorney': 'Immobilienrechtsanwalt',
  'Real Estate Investor': 'Immobilieninvestor',
  'Receptionist': 'Empfangsdame',
  'Recreation Coordinator': 'Freizeitkoordinator',
  'Recruiter': 'Personalvermittler',
  'Recruiting Coordinator': 'Recruiting-Koordinator',
  'Registered Nurse': 'Examinierte Krankenschwester',
  'Release Engineer': 'Release Engineer',
  'Research Analyst': 'Forschungsanalyst',
  'Research Assistant': 'Forschungsassistent',
  'Reservation Agent': 'Reservierungsmitarbeiter',
  'Resident Assistant': 'Wohnheimbetreuer',
  'Residential Cleaner': 'Gebäudereiniger Privathaushalt',
  'Respiratory Therapist': 'Atemtherapeut',
  'Restaurant Manager': 'Restaurantleiter',
  'Retail Assistant': 'Verkaufshilfe',
  'Retail Associate': 'Einzelhandelskaufmann',
  'Retail Manager': 'Einzelhandelsleiter',
  'Retail Sales Associate': 'Verkaufsberater Einzelhandel',
  'Retail Store Manager': 'Filialleiter Einzelhandel',
  'Risk Management Specialist': 'Risikomanagement-Spezialist',
  'Roofer': 'Dachdecker',
  'Rust Developer': 'Rust-Entwickler',
  'SAP Consultant': 'SAP-Berater',
  'SOC Analyst': 'SOC-Analyst',
  'Sales Assistant': 'Verkaufsassistent',
  'Sales Associate': 'Verkäufer',
  'Sales Consultant': 'Vertriebsberater',
  'Sales Coordinator': 'Vertriebskoordinator',
  'Sales Director': 'Vertriebsdirektor',
  'Sales Engineer': 'Vertriebsingenieur',
  'Sales Executive': 'Vertriebsleiter',
  'Sales Manager': 'Vertriebsmanager',
  'Sales Representative': 'Handelsvertreter',
  'Salesforce Administrator': 'Salesforce-Administrator',
  'School Administrator': 'Schulverwaltung',
  'School Counselor': 'Schulberater',
  'Scrum Master': 'Scrum Master',
  'Seaman': 'Seemann',
  'Security Analyst': 'Sicherheitsanalyst',
  'Security Engineer': 'Security Engineer',
  'Security Guard': 'Sicherheitskraft',
  'Security Officer': 'Sicherheitsbeauftragter',
  'Server': 'Kellner',
  'Service Advisor': 'Serviceberater',
  'Service Crew': 'Servicemitarbeiter',
  'Set Designer': 'Bühnenbildner',
  'Sheet Metal Worker': 'Blechbearbeiter',
  'Shipping & Receiving Clerk': 'Versand- und Empfangsmitarbeiter',
  'Site Engineer': 'Baustelleningenieur',
  'Site Reliability Engineer': 'Site Reliability Engineer',
  'Small Business Owner': 'Kleinunternehmer',
  'Social Media Coordinator': 'Social-Media-Koordinator',
  'Social Media Manager': 'Social Media Manager',
  'Social Media Specialist': 'Social-Media-Spezialist',
  'Social Worker': 'Sozialarbeiter',
  'Software Architect': 'Softwarearchitekt',
  'Software Developer': 'Softwareentwickler',
  'Software Engineer': 'Software-Ingenieur',
  'Software Tester': 'Softwaretester',
  'Solar Installer': 'Solarinstallateur',
  'Solution Architect': 'Lösungsarchitekt',
  'Solutions Engineer': 'Solutions Engineer',
  'Sommelier': 'Sommelier',
  'Sous Chef': 'Souschef',
  'Spa Manager': 'Spa-Manager',
  'Special Education Teacher': 'Sonderpädagoge',
  'Speech-Language Pathologist': 'Logopäde',
  'Sports Coach': 'Sporttrainer',
  'Stage Manager': 'Bühnenmeister',
  'Sterile Processing Technician': 'Sterilisationstechniker',
  'Store Associate': 'Filialmitarbeiter',
  'Store Manager': 'Filialleiter',
  'Storyboard Artist': 'Storyboard-Künstler',
  'Substance Abuse Counselor': 'Suchtberater',
  'Supply Chain Analyst': 'Supply-Chain-Analyst',
  'Supply Chain Manager': 'Supply-Chain-Manager',
  'Support Worker': 'Betreuungskraft',
  'Surgical Technologist': 'Operationstechnischer Assistent',
  'Sushi Chef': 'Sushi-Koch',
  'System Administrator': 'Systemadministrator',
  'System Analyst': 'Systemanalytiker',
  'System Engineer': 'Systemingenieur',
  'TSA Agent': 'Sicherheitskontrolleur Flughafen',
  'Talent Acquisition Specialist': 'Talent Acquisition Spezialist',
  'Teacher': 'Lehrer',
  'Teaching Assistant': 'Lehrassistent',
  'Team Leader': 'Teamleiter',
  'Tech Sales Representative': 'IT-Vertriebsmitarbeiter',
  'Technical Program Manager': 'Technical Program Manager',
  'Technical Recruiter': 'Technical Recruiter',
  'Technical Support Specialist': 'Technischer Support-Spezialist',
  'Technical Writer': 'Technischer Redakteur',
  'Therapist': 'Therapeut',
  'Title Examiner': 'Grundbuchprüfer',
  'Tour Guide': 'Reiseleiter',
  'Travel Agent': 'Reisekaufmann',
  'Truck Driver': 'LKW-Fahrer',
  'Tutor': 'Nachhilfelehrer',
  'UI Designer': 'UI-Designer',
  'UX Designer': 'UX-Designer',
  'UX Researcher': 'UX-Forscher',
  'Ultrasound Technician': 'Ultraschalltechniker',
  'Valet Attendant': 'Parkservice-Mitarbeiter',
  'Veterans Service Officer': 'Veteranenbeauftragter',
  'Veterinary Assistant': 'Tierarzthelfer',
  'Veterinary Technician': 'Veterinärtechniker',
  'Video Editor': 'Videoeditor',
  'Videographer': 'Videograf',
  'Virtual Assistant': 'Virtuelle Assistenz',
  'Voice Actor': 'Synchronsprecher',
  'Waiter/Waitress': 'Kellner/Kellnerin',
  'Warehouse Associate': 'Lagermitarbeiter',
  'Warehouse Manager': 'Lagerleiter',
  'Warehouse Worker': 'Lagerarbeiter',
  'Web Designer': 'Webdesigner',
  'Web Developer': 'Webentwickler',
  'Welder': 'Schweißer',
  'Wellness Coach': 'Wellnesscoach',
  'Wildlife Biologist': 'Wildtierbiologe',
  'Wind Turbine Technician': 'Windkraftanlagentechniker',
  'Window Cleaner': 'Fensterreiniger',
  'X-Ray Technician': 'Röntgentechniker',
  'Yoga Instructor': 'Yogalehrer',
  'Youth Counselor': 'Jugendberater',
  'Zookeeper': 'Tierpfleger im Zoo',
  'iOS Developer': 'iOS-Entwickler',
};

// ─── CATEGORIES (46 entries) ─────────────────────────────────────────────────

export const CATEGORIES = {
  'Technology': 'Technologie',
  'Healthcare': 'Gesundheitswesen',
  'Trades': 'Handwerk',
  'Hospitality': 'Gastgewerbe',
  'Food Service': 'Gastronomie',
  'Creative': 'Kreativberufe',
  'Education': 'Bildung',
  'Government': 'Öffentlicher Dienst',
  'Finance': 'Finanzen',
  'Marketing': 'Marketing',
  'Business': 'Wirtschaft',
  'Engineering': 'Ingenieurwesen',
  'Sales': 'Vertrieb',
  'Legal': 'Recht',
  'Real Estate': 'Immobilien',
  'HR': 'Personalwesen',
  'Fitness': 'Fitness',
  'Management': 'Management',
  'Animal Care': 'Tierpflege',
  'Logistics': 'Logistik',
  'Customer Service': 'Kundenservice',
  'Administrative': 'Verwaltung',
  'Transportation': 'Transport',
  'Retail': 'Einzelhandel',
  'Cleaning': 'Reinigung',
  'Social Services': 'Soziale Arbeit',
  'Manufacturing': 'Fertigung',
  'Construction': 'Bauwesen',
  'Security': 'Sicherheit',
  'Science': 'Wissenschaft',
  'Events': 'Veranstaltungen',
  'Writing & Content': 'Redaktion & Inhalt',
  'Supply Chain': 'Lieferkette',
  'Research': 'Forschung',
  'Insurance': 'Versicherung',
  'Consulting': 'Beratung',
  'Aviation': 'Luftfahrt',
  'Automotive': 'Automobilbranche',
  'Media': 'Medien',
  'Maritime': 'Seefahrt',
  'Law Enforcement': 'Strafverfolgung',
  'Entry-Level': 'Berufseinsteiger',
  'Entertainment': 'Unterhaltung',
  'Childcare': 'Kinderbetreuung',
  'Beauty': 'Schönheitspflege',
  'Architecture': 'Architektur',
};

// ─── TAG GENERATOR ───────────────────────────────────────────────────────────

/**
 * Returns 8 German SEO tags for a given job title and slug.
 */
export function generateTags(jobTitle, slug) {
  const lower = jobTitle.toLowerCase();
  return [
    `${lower} lebenslauf`,
    `lebenslauf ${lower}`,
    `bewerbung ${lower}`,
    `${lower} lebenslauf vorlage`,
    `${lower} lebenslauf muster`,
    `${lower} lebenslauf beispiel`,
    `lebenslauf vorlage ${lower}`,
    `${lower} bewerbungsschreiben`,
  ];
}

// ─── FAQ GENERATOR ───────────────────────────────────────────────────────────

/**
 * Returns 5 FAQ objects with German question/answer pairs.
 */
export function generateFAQ(jobTitle) {
  return [
    {
      question: `Welche Fähigkeiten sollte ich in meinen ${jobTitle} Lebenslauf aufnehmen?`,
      answer: `Für einen ${jobTitle} Lebenslauf sollten Sie Fähigkeiten hervorheben, die direkt mit der Stellenbeschreibung übereinstimmen. Nennen Sie sowohl fachliche als auch soziale Kompetenzen, die für die Rolle als ${jobTitle} relevant sind. Überprüfen Sie jede Stellenanzeige sorgfältig, da ATS-Systeme nach exakten Schlüsselwörtern suchen.`,
    },
    {
      question: `Wie lang sollte ein ${jobTitle} Lebenslauf sein?`,
      answer: `Ein ${jobTitle} Lebenslauf sollte für Berufseinsteiger maximal eine Seite umfassen. Mit mehr als fünf Jahren Berufserfahrung als ${jobTitle} können zwei Seiten gerechtfertigt sein. Konzentrieren Sie sich auf relevante Erfahrungen und messbare Erfolge statt auf eine vollständige Auflistung aller Positionen.`,
    },
    {
      question: `Welches Format eignet sich am besten für einen ${jobTitle} Lebenslauf?`,
      answer: `Der ideale ${jobTitle} Lebenslauf nutzt ein antichronologisches Format, bei dem die aktuelle Position zuerst erscheint. Verwenden Sie klare Überschriften und ein einspaltiges Layout für beste ATS-Kompatibilität. Fügen Sie einen dedizierten Abschnitt für Fähigkeiten hinzu, der Ihre ${jobTitle}-spezifischen Kompetenzen hervorhebt.`,
    },
    {
      question: `Was verdient ein ${jobTitle} durchschnittlich?`,
      answer: `Das Gehalt als ${jobTitle} variiert je nach Region, Erfahrung und Branche erheblich. Recherchieren Sie aktuelle Gehaltsdaten auf Portalen wie StepStone, Glassdoor oder Gehalt.de, um realistische Erwartungen für Ihre Qualifikationsstufe zu entwickeln. Neben dem Grundgehalt sollten Sie auch Zusatzleistungen wie betriebliche Altersvorsorge berücksichtigen.`,
    },
    {
      question: `Was sollte ich in meinen ${jobTitle} Lebenslauf aufnehmen?`,
      answer: `Ein überzeugender ${jobTitle} Lebenslauf enthält Kontaktdaten, eine professionelle Zusammenfassung, Berufserfahrung mit messbaren Erfolgen, relevante Ausbildung und Zertifizierungen. Passen Sie jeden Lebenslauf individuell an die ${jobTitle}-Stelle an und verwenden Sie Schlüsselwörter aus der Stellenanzeige, um ATS-Filter zu bestehen.`,
    },
  ];
}

// ─── BODY GENERATOR ──────────────────────────────────────────────────────────

/**
 * Normalizes English category to one of ~15 category groups
 * so that generateBody can pick category-specific intros.
 */
function normalizeCategory(category) {
  const map = {
    'Technology': 'Technology',
    'Healthcare': 'Healthcare',
    'Finance': 'Finance',
    'Education': 'Education',
    'Food Service': 'Food Service',
    'Hospitality': 'Hospitality',
    'Trades': 'Trades',
    'Creative': 'Creative',
    'Administrative': 'Administrative',
    'Sales': 'Sales',
    'HR': 'HR',
    'Customer Service': 'Customer Service',
    'Retail': 'Retail',
    'Logistics': 'Logistics',
    'Government': 'Government',
    'Legal': 'Legal',
    'Engineering': 'Engineering',
    'Marketing': 'Marketing',
    'Business': 'Business',
    'Management': 'Management',
    'Construction': 'Construction',
    'Security': 'Security',
    'Science': 'Science',
    'Manufacturing': 'Manufacturing',
    'Social Services': 'Social Services',
    'Fitness': 'Fitness',
    'Cleaning': 'Cleaning',
    'Animal Care': 'Animal Care',
    'Transportation': 'Transportation',
    'Events': 'Events',
    'Writing & Content': 'Creative',
    'Supply Chain': 'Logistics',
    'Research': 'Science',
    'Insurance': 'Finance',
    'Consulting': 'Business',
    'Aviation': 'Transportation',
    'Automotive': 'Trades',
    'Media': 'Creative',
    'Maritime': 'Transportation',
    'Law Enforcement': 'Government',
    'Entry-Level': 'default',
    'Entertainment': 'Creative',
    'Childcare': 'Education',
    'Beauty': 'Creative',
    'Architecture': 'Engineering',
    'Real Estate': 'Sales',
  };
  return map[category] || 'default';
}

/**
 * Returns a category-specific opening paragraph in German.
 */
function getCategoryIntro(jobTitle, normalizedCategory) {
  const intros = {
    Technology: `Die Technologiebranche verändert sich rasant, und ein überzeugender ${jobTitle} Lebenslauf muss genau diese Dynamik widerspiegeln. Personalverantwortliche in der IT suchen nach Kandidaten, die nicht nur über aktuelle technische Kenntnisse verfügen, sondern auch die Fähigkeit zeigen, sich schnell in neue Technologien einzuarbeiten. Ein gut strukturierter Lebenslauf ist der Schlüssel, um sich in einem wettbewerbsintensiven Markt zu behaupten.`,

    Healthcare: `Im Gesundheitswesen ist Präzision entscheidend — und das gilt auch für Ihren ${jobTitle} Lebenslauf. Personalverantwortliche in medizinischen Einrichtungen achten besonders auf Zertifizierungen, klinische Erfahrung und die Einhaltung von Qualitätsstandards. Ein professioneller Lebenslauf, der Ihre Patientenorientierung und fachliche Kompetenz hervorhebt, ist Ihre Eintrittskarte in diese anspruchsvolle Branche.`,

    Finance: `Die Finanzbranche verlangt Genauigkeit, analytisches Denken und Vertrauenswürdigkeit — Eigenschaften, die sich bereits in Ihrem ${jobTitle} Lebenslauf widerspiegeln sollten. Arbeitgeber im Finanzsektor bewerten nicht nur Ihre fachlichen Qualifikationen, sondern auch Ihre Fähigkeit, komplexe Daten zu interpretieren und fundierte Entscheidungen zu treffen.`,

    Education: `Ein ${jobTitle} Lebenslauf im Bildungsbereich muss pädagogische Kompetenz, Fachwissen und eine Leidenschaft für das Lernen vermitteln. Schulen und Bildungseinrichtungen suchen nach Bewerbern, die nicht nur Wissen vermitteln können, sondern auch innovative Lehrmethoden einsetzen und eine positive Lernumgebung schaffen.`,

    'Food Service': `In der Gastronomie zählen praktische Erfahrung, Belastbarkeit und Teamfähigkeit. Ein überzeugender ${jobTitle} Lebenslauf zeigt, dass Sie sowohl die fachlichen Anforderungen als auch den Umgang mit anspruchsvollen Situationen in einer schnelllebigen Küchenumgebung beherrschen. Arbeitgeber in der Gastronomie suchen nach Kandidaten mit nachweisbarer Erfahrung und einem Gespür für Qualität.`,

    Hospitality: `Das Gastgewerbe lebt von exzellentem Service und persönlicher Betreuung. Ihr ${jobTitle} Lebenslauf sollte genau diese Qualitäten hervorheben — von Ihrer Kommunikationsfähigkeit bis hin zu Ihrer Erfahrung im Umgang mit internationalen Gästen. In einer Branche, die stark auf zwischenmenschliche Fähigkeiten setzt, ist ein professioneller Lebenslauf besonders wichtig.`,

    Trades: `Im Handwerk zählen praktische Erfahrung, Fachkenntnisse und Zuverlässigkeit. Ein ${jobTitle} Lebenslauf muss Ihre handwerklichen Fähigkeiten, Zertifizierungen und Sicherheitskenntnisse klar darstellen. Arbeitgeber in diesem Bereich bewerten vor allem Ihre praktische Erfahrung und die Fähigkeit, Projekte termingerecht und qualitativ hochwertig abzuschließen.`,

    Creative: `In der Kreativbranche ist Ihr ${jobTitle} Lebenslauf mehr als ein Dokument — er ist eine Visitenkarte Ihres kreativen Talents. Neben Ihrem Portfolio muss Ihr Lebenslauf Ihre künstlerischen Fähigkeiten, technischen Tools und Ihre Fähigkeit, kreative Visionen umzusetzen, überzeugend darstellen.`,

    Administrative: `Administrative Fachkräfte sind das Rückgrat jeder Organisation. Ein starker ${jobTitle} Lebenslauf zeigt Ihre organisatorischen Fähigkeiten, Ihre Zuverlässigkeit und Ihre Kompetenz im Umgang mit modernen Bürosoftware-Lösungen. Arbeitgeber suchen nach Bewerbern, die Abläufe effizient organisieren und mehrere Aufgaben gleichzeitig koordinieren können.`,

    Sales: `Im Vertrieb zählen Ergebnisse — und Ihr ${jobTitle} Lebenslauf sollte genau das widerspiegeln. Personalverantwortliche suchen nach messbaren Verkaufserfolgen, Kundenbeziehungsmanagement und der Fähigkeit, Umsatzziele konsequent zu übertreffen. Quantifizieren Sie Ihre Leistungen mit konkreten Zahlen und Prozentwerten.`,

    HR: `Als ${jobTitle} im Personalwesen müssen Sie zeigen, dass Sie den gesamten Mitarbeiterlebenszyklus beherrschen. Ihr Lebenslauf sollte Ihre Erfahrung in Recruiting, Personalentwicklung und Arbeitsrecht hervorheben. Personalverantwortliche achten besonders auf Ihre Kommunikationsfähigkeit und Ihren strategischen Beitrag zur Unternehmenskultur.`,

    'Customer Service': `Ein herausragender ${jobTitle} Lebenslauf demonstriert Ihre Fähigkeit, Kundenbedürfnisse zu erkennen und Probleme effizient zu lösen. Arbeitgeber in diesem Bereich schätzen messbare Ergebnisse wie Kundenzufriedenheitswerte, gelöste Anfragen und Reaktionszeiten. Zeigen Sie, dass Sie sowohl empathisch als auch lösungsorientiert arbeiten.`,

    Retail: `Im Einzelhandel ist der ${jobTitle} Lebenslauf Ihre Chance, Ihre Verkaufstalente und Ihre Kundenorientierung zu demonstrieren. Arbeitgeber suchen nach Bewerbern, die Umsatzziele erreichen, Teams motivieren und ein positives Einkaufserlebnis schaffen können. Heben Sie Ihre Erfahrung mit Warenwirtschaftssystemen und Kassenabwicklung hervor.`,

    Logistics: `Die Logistikbranche erfordert Präzision, Organisationstalent und die Fähigkeit, komplexe Lieferketten zu koordinieren. Ein überzeugender ${jobTitle} Lebenslauf zeigt Ihre Erfahrung im Supply-Chain-Management, Ihre Kompetenz mit Logistiksoftware und Ihre Fähigkeit, Prozesse zu optimieren und Kosten zu senken.`,

    Government: `Im öffentlichen Dienst gelten besondere Anforderungen an den ${jobTitle} Lebenslauf. Neben der fachlichen Qualifikation achten Behörden auf Zuverlässigkeit, Integrität und die Kenntnis relevanter Vorschriften und Gesetze. Strukturieren Sie Ihren Lebenslauf klar und orientieren Sie sich an den spezifischen Anforderungen der ausgeschriebenen Stelle.`,

    Legal: `Im Rechtsbereich muss Ihr ${jobTitle} Lebenslauf höchste Präzision und Professionalität ausstrahlen. Kanzleien und Rechtsabteilungen bewerten Ihre juristische Ausbildung, einschlägige Berufserfahrung und Ihre Fähigkeit, komplexe rechtliche Sachverhalte verständlich darzustellen. Achten Sie auf eine fehlerfreie und formal korrekte Darstellung.`,

    Engineering: `Als ${jobTitle} im Ingenieurwesen müssen Sie technische Kompetenz, Problemlösungsfähigkeit und Projektmanagement-Erfahrung überzeugend darstellen. Arbeitgeber suchen nach Bewerbern, die komplexe technische Herausforderungen meistern und gleichzeitig im Team effektiv arbeiten können. Quantifizieren Sie Ihre Projekterfolge mit konkreten Kennzahlen.`,

    Marketing: `Ein ${jobTitle} Lebenslauf im Marketing muss genauso überzeugend sein wie die Kampagnen, die Sie erstellen. Arbeitgeber erwarten datengetriebene Ergebnisse, kreative Strategien und Erfahrung mit modernen Marketing-Tools. Zeigen Sie messbare Erfolge wie Reichweitenerhöhung, Conversion-Steigerungen und ROI-Optimierungen.`,

    Business: `In der Wirtschaft sind analytisches Denken, strategische Planung und Führungsqualitäten gefragt. Ihr ${jobTitle} Lebenslauf sollte Ihre Fähigkeit zeigen, geschäftliche Herausforderungen zu erkennen und gewinnbringende Lösungen zu entwickeln. Untermauern Sie Ihre Leistungen mit konkreten Geschäftsergebnissen und Kennzahlen.`,

    Management: `Als ${jobTitle} in einer Führungsposition müssen Sie Ihre Fähigkeit zeigen, Teams zu leiten, Ziele zu erreichen und Unternehmenserfolge voranzutreiben. Ihr Lebenslauf sollte eine klare Entwicklung Ihrer Karriere darstellen, messbare Führungserfolge hervorheben und Ihre strategische Vision demonstrieren.`,

    Construction: `Im Bauwesen sind praktische Erfahrung, Sicherheitsbewusstsein und Projektmanagement-Fähigkeiten entscheidend. Ihr ${jobTitle} Lebenslauf sollte Ihre Erfahrung mit Bauprojekten, relevante Zertifizierungen und Ihre Fähigkeit, Projekte im Budget und Zeitrahmen abzuschließen, klar darstellen.`,

    Security: `In der Sicherheitsbranche zählen Zuverlässigkeit, Wachsamkeit und professionelles Auftreten. Ihr ${jobTitle} Lebenslauf sollte relevante Sicherheitszertifizierungen, Erfahrung mit Überwachungssystemen und Ihre Fähigkeit, in Krisensituationen besonnen zu handeln, hervorheben.`,

    Science: `In der Wissenschaft ist Ihr ${jobTitle} Lebenslauf ein Nachweis Ihrer Forschungskompetenz und analytischen Fähigkeiten. Arbeitgeber bewerten Ihre Publikationen, Forschungsprojekte, Laborerfahrung und die Fähigkeit, komplexe Daten zu interpretieren und zu kommunizieren.`,

    Manufacturing: `In der Fertigungsindustrie sind technisches Verständnis, Qualitätsbewusstsein und Prozesskenntnis entscheidend. Ein überzeugender ${jobTitle} Lebenslauf hebt Ihre Erfahrung mit Produktionsverfahren, Qualitätssicherung und Lean-Management-Methoden hervor.`,

    'Social Services': `Im sozialen Bereich ist Ihr ${jobTitle} Lebenslauf ein Nachweis Ihrer Empathie, fachlichen Kompetenz und Ihres Engagements für das Gemeinwohl. Arbeitgeber in diesem Sektor bewerten Ihre Erfahrung in der Klientenbetreuung, Ihre Kenntnisse der Sozialsysteme und Ihre Fähigkeit, Menschen in schwierigen Lebenslagen zu unterstützen.`,

    Fitness: `In der Fitnessbranche verbindet Ihr ${jobTitle} Lebenslauf sportliche Kompetenz mit pädagogischem Geschick. Zeigen Sie Ihre Zertifizierungen, Trainingserfolge mit Klienten und Ihre Fähigkeit, individuelle Fitness- und Gesundheitsprogramme zu entwickeln und durchzuführen.`,

    Cleaning: `Im Reinigungsbereich sind Zuverlässigkeit, Gründlichkeit und Effizienz Ihre stärksten Argumente. Ein ${jobTitle} Lebenslauf sollte Ihre Erfahrung mit verschiedenen Reinigungsverfahren, Ihre Kenntnis relevanter Hygienstandards und Ihre Fähigkeit, selbstständig und termingerecht zu arbeiten, hervorheben.`,

    'Animal Care': `In der Tierpflege verbindet Ihr ${jobTitle} Lebenslauf fachliches Wissen mit einer echten Leidenschaft für Tiere. Zeigen Sie Ihre Erfahrung in der Tierbetreuung, relevante Ausbildungen und Ihre Fähigkeit, mit verschiedenen Tierarten verantwortungsvoll umzugehen.`,

    Transportation: `In der Transportbranche sind Sicherheit, Zuverlässigkeit und die richtige Qualifikation entscheidend. Ihr ${jobTitle} Lebenslauf sollte Ihre Führerscheinklassen, Ihre unfallfreie Fahrzeit und Ihre Erfahrung mit verschiedenen Fahrzeugtypen klar dokumentieren.`,

    Events: `In der Veranstaltungsbranche zählen Organisationstalent, Kreativität und Stressresistenz. Ihr ${jobTitle} Lebenslauf sollte erfolgreiche Veranstaltungen, Ihr Budget-Management und Ihre Fähigkeit, unter Zeitdruck herausragende Ergebnisse zu liefern, hervorheben.`,

    default: `Ein überzeugender ${jobTitle} Lebenslauf ist der erste Schritt zu Ihrem Traumjob. In einem wettbewerbsintensiven Arbeitsmarkt kann ein professionell gestalteter Lebenslauf den entscheidenden Unterschied machen. Hier erfahren Sie, wie Sie Ihre Qualifikationen, Erfahrungen und Fähigkeiten optimal in Szene setzen, um bei Personalverantwortlichen einen bleibenden Eindruck zu hinterlassen.`,
  };

  return intros[normalizedCategory] || intros.default;
}

/**
 * Generates full MDX body content in German.
 */
export function generateBody(jobTitle, category, keySkills, avgSalary, jobGrowth, slug) {
  const norm = normalizeCategory(category);
  const intro = getCategoryIntro(jobTitle, norm);
  const skills = keySkills.length > 0 ? keySkills : ['Kommunikation', 'Teamarbeit', 'Problemlösung', 'Organisation', 'Zeitmanagement', 'MS Office'];
  const skillGroup1 = skills.slice(0, 2);
  const skillGroup2 = skills.slice(2, 4);
  const skillGroup3 = skills.slice(4, 6);

  return `
## Was einen ${jobTitle} Lebenslauf auszeichnet

${intro}

Ein professioneller ${jobTitle} Lebenslauf unterscheidet sich von einer generischen Bewerbung durch die gezielte Darstellung branchenspezifischer Kompetenzen. Personalverantwortliche verbringen durchschnittlich nur 7 Sekunden mit dem ersten Blick auf einen Lebenslauf — nutzen Sie diese Zeit optimal, indem Sie Ihre wichtigsten Qualifikationen direkt sichtbar machen.

## Beispiele für eine Professionelle Zusammenfassung

### Berufseinsteiger

> Motivierter ${jobTitle} mit fundierter Ausbildung und ersten praktischen Erfahrungen durch Praktika und Projekte. Beherrsche ${skills.slice(0, 3).join(', ')} und bringe eine schnelle Auffassungsgabe sowie hohe Lernbereitschaft mit. Suche nach einer Einstiegsposition, um meine Fähigkeiten in einem professionellen Umfeld weiterzuentwickeln.

### Mittlere Karrierestufe

> Erfahrener ${jobTitle} mit über 5 Jahren Berufserfahrung und nachweisbaren Erfolgen in ${skills.slice(0, 2).join(' und ')}. Habe in meiner aktuellen Position die Effizienz um 25 % gesteigert und arbeite routiniert mit ${skills.slice(2, 4).join(', ')}. Suche eine neue Herausforderung mit Entwicklungsperspektive.

### Senior

> Senior ${jobTitle} mit mehr als 10 Jahren Branchenerfahrung und umfassender Expertise in ${skills.slice(0, 4).join(', ')}. Habe Teams von bis zu 15 Mitarbeitern geleitet, Budgets von über 500.000 € verantwortet und strategische Initiativen umgesetzt, die zu einer Umsatzsteigerung von 30 % führten. Suche eine Führungsposition mit strategischem Gestaltungsspielraum.

## Gehalt und Berufsaussichten

Das durchschnittliche Gehalt für einen ${jobTitle} liegt bei etwa **${avgSalary}** pro Jahr, wobei die tatsächliche Vergütung je nach Region, Erfahrung und Unternehmensgröße variiert. Die Berufsaussichten zeigen ein Wachstum von **${jobGrowth}**, was diese Karriere zu einer vielversprechenden Wahl macht.

**Quellen:**
- [U.S. Bureau of Labor Statistics (BLS)](https://www.bls.gov/ooh/) — Aktuelle Arbeitsmarktstatistiken und Gehaltsdaten
- [Glassdoor Gehaltsdaten](https://www.glassdoor.com/Salaries/) — Erfahrungsberichte und Gehaltsvergleiche
- [PayScale](https://www.payscale.com/research/US/) — Detaillierte Vergütungsanalysen nach Erfahrungsstufe

*Hinweis: Die tatsächliche Vergütung kann je nach Standort, Branche, Unternehmensgröße und individueller Qualifikation erheblich variieren.*

## Wesentliche Fähigkeiten

### Fachliche Kernkompetenzen
${skillGroup1.map(s => `- **${s}** — Fundierte Kenntnisse und praktische Erfahrung, die für die tägliche Arbeit als ${jobTitle} unverzichtbar sind`).join('\n')}

### Methodische Fähigkeiten
${skillGroup2.map(s => `- **${s}** — Wichtige methodische Kompetenz, die in der ${jobTitle}-Rolle regelmäßig zum Einsatz kommt`).join('\n')}

### Übergreifende Kompetenzen
${skillGroup3.map(s => `- **${s}** — Ergänzende Fähigkeit, die Ihren Wert als ${jobTitle} erhöht und die Zusammenarbeit im Team fördert`).join('\n')}

## Leistungsorientierte Aufzählungspunkte

Verwenden Sie konkrete Zahlen und Ergebnisse, um Ihre Leistungen als ${jobTitle} zu untermauern:

- Prozessoptimierung implementiert, die zu einer Effizienzsteigerung von 20 % und einer jährlichen Kosteneinsparung von 50.000 € führte
- Erfolgreich ein Team von 8 Kollegen koordiniert und die Projektabschlussrate um 35 % verbessert
- Neue Arbeitsabläufe eingeführt, die die Bearbeitungszeit um 40 % reduzierten und die Kundenzufriedenheit auf 95 % steigerten
- ${skills[0]}-Expertise eingesetzt, um eine kritische Initiative zu leiten, die innerhalb von 6 Monaten messbare Ergebnisse lieferte
- Schulungsprogramm für 12 neue Mitarbeiter entwickelt und durchgeführt, das die Einarbeitungszeit um 30 % verkürzte
- Qualitätsstandards neu definiert und implementiert, wodurch die Fehlerquote um 45 % gesenkt wurde

## Format- und Vorlagentipps für ${jobTitle} Lebenslauf

1. **Antichronologisches Format** — Beginnen Sie mit Ihrer aktuellsten Position und arbeiten Sie rückwärts. Dieses Format wird von 90 % der Personalverantwortlichen bevorzugt und ist optimal für ATS-Systeme.

2. **Klare Struktur mit Überschriften** — Verwenden Sie eindeutige Abschnittsüberschriften wie „Berufserfahrung", „Ausbildung", „Fähigkeiten" und „Zertifizierungen". Eine logische Gliederung erleichtert das schnelle Scannen.

3. **Anpassung an die Stellenanzeige** — Passen Sie Ihren ${jobTitle} Lebenslauf für jede Bewerbung individuell an. Verwenden Sie Schlüsselwörter aus der Stellenbeschreibung und betonen Sie die gefragten Fähigkeiten.

4. **Professionelles Layout** — Wählen Sie eine gut lesbare Schriftart (Arial, Calibri, 10-12pt), ausreichend Weißraum und eine einheitliche Formatierung. Vermeiden Sie zu viele Farben oder ausgefallene Designelemente.

5. **Messbare Erfolge statt Aufgabenlisten** — Beschreiben Sie Ihre Berufserfahrung mit konkreten Ergebnissen und Zahlen. „Umsatz um 25 % gesteigert" ist wesentlich wirkungsvoller als „für Vertrieb zuständig".

## Tipp vom Personalverantwortlichen

> **Der häufigste Grund, warum ${jobTitle}-Bewerbungen scheitern: fehlende Individualisierung.** Viele Bewerber verwenden einen generischen Lebenslauf für jede Stelle — und werden sofort aussortiert.

Als Personalverantwortlicher sehe ich täglich Dutzende ${jobTitle}-Bewerbungen. Die Kandidaten, die zum Vorstellungsgespräch eingeladen werden, haben eines gemeinsam: Sie haben ihren Lebenslauf gezielt auf die ausgeschriebene Stelle zugeschnitten. Das bedeutet nicht nur die richtigen Schlüsselwörter, sondern auch relevante Erfolge und Erfahrungen, die direkt auf die Anforderungen der Position eingehen.

Nehmen Sie sich die 15 Minuten, um Ihren Lebenslauf für jede ${jobTitle}-Bewerbung anzupassen — es ist die beste Investition Ihrer Zeit im gesamten Bewerbungsprozess.

## Häufige Interviewfragen für ${jobTitle}

### Welche spezifischen Erfahrungen qualifizieren Sie für diese ${jobTitle}-Position?

Beschreiben Sie konkrete Projekte und Aufgaben aus Ihrer bisherigen Laufbahn, die direkt auf die Anforderungen der Stelle eingehen. Nennen Sie messbare Ergebnisse und erklären Sie, wie Ihre Erfahrung einen Mehrwert für das Unternehmen schafft.

### Wie gehen Sie mit typischen Herausforderungen im ${jobTitle}-Alltag um?

Nutzen Sie die STAR-Methode (Situation, Task, Action, Result), um eine konkrete Herausforderung zu schildern. Zeigen Sie, wie Sie analytisch an Probleme herangehen und lösungsorientiert arbeiten.

### Wo sehen Sie sich als ${jobTitle} in den nächsten 3-5 Jahren?

Zeigen Sie Ihre langfristige Motivation und Ihre Bereitschaft, sich als ${jobTitle} weiterzuentwickeln. Verbinden Sie Ihre persönlichen Karriereziele mit den Wachstumsmöglichkeiten im Unternehmen.

### Welche ${skills[0]}-Kenntnisse bringen Sie mit und wie setzen Sie diese ein?

Beschreiben Sie Ihre praktische Erfahrung mit ${skills[0]} anhand konkreter Beispiele. Erklären Sie, in welchem Kontext Sie diese Fähigkeit eingesetzt haben und welche Ergebnisse Sie damit erzielt haben.

### Wie arbeiten Sie im Team und wie lösen Sie Konflikte?

Geben Sie ein konkretes Beispiel für erfolgreiche Teamarbeit als ${jobTitle}. Beschreiben Sie, wie Sie mit unterschiedlichen Persönlichkeiten zusammenarbeiten und Konflikte konstruktiv lösen.

## Häufige Fehler, die es zu vermeiden gilt

1. **Generischer Lebenslauf für alle Bewerbungen** — Verwenden Sie niemals denselben Lebenslauf für verschiedene ${jobTitle}-Stellen. Jede Stellenanzeige hat spezifische Anforderungen, die individuell adressiert werden müssen.

2. **Aufgaben statt Ergebnisse auflisten** — „Verantwortlich für..." sagt wenig über Ihre Leistung aus. Verwenden Sie stattdessen quantifizierte Erfolge mit konkreten Zahlen und Prozentwerten.

3. **Veraltete oder irrelevante Informationen** — Entfernen Sie Berufserfahrung, die älter als 10-15 Jahre ist und keinen Bezug zur ${jobTitle}-Position hat. Konzentrieren Sie sich auf aktuelle, relevante Erfahrungen.

4. **Fehlende Schlüsselwörter aus der Stellenanzeige** — ATS-Systeme filtern Lebensläufe anhand spezifischer Begriffe. Wenn Sie die Schlüsselwörter der ${jobTitle}-Stellenanzeige nicht verwenden, wird Ihr Lebenslauf möglicherweise nie von einem Menschen gelesen.

5. **Unprofessionelles Layout oder Formatierungsfehler** — Rechtschreibfehler, inkonsistente Formatierung oder ein überladenes Design wirken unprofessionell und führen häufig zur sofortigen Ablehnung — besonders in der ${jobTitle}-Branche, wo Detailgenauigkeit geschätzt wird.

## ATS-Optimierung für ${jobTitle} Lebenslauf

Applicant Tracking Systems (ATS) scannen Ihren Lebenslauf nach relevanten Schlüsselwörtern, bevor ein Personalverantwortlicher ihn zu sehen bekommt. So optimieren Sie Ihren ${jobTitle} Lebenslauf für ATS:

- **Verwenden Sie exakte Begriffe aus der Stellenanzeige** — Wenn die Stelle „${skills[0]}" verlangt, schreiben Sie genau „${skills[0]}" und nicht ein Synonym
- **Nutzen Sie Standardüberschriften** wie „Berufserfahrung", „Ausbildung", „Fähigkeiten" — kreative Überschriften können ATS-Systeme verwirren
- **Vermeiden Sie Tabellen, Textboxen und Grafiken** — ATS-Systeme können diese oft nicht korrekt auslesen
- **Speichern Sie als PDF oder DOCX** — beide Formate werden von modernen ATS-Systemen akzeptiert
- **Platzieren Sie Ihre ${jobTitle}-spezifischen Fähigkeiten** (${skills.slice(0, 4).join(', ')}) sowohl im Fähigkeiten-Abschnitt als auch im Kontext Ihrer Berufserfahrung
- **Verwenden Sie sowohl Abkürzungen als auch ausgeschriebene Begriffe** — zum Beispiel „ATS (Applicant Tracking System)", um alle Suchvarianten abzudecken

## Weitere Ressourcen

Nutzen Sie unsere weiteren Ressourcen, um Ihre Bewerbung als ${jobTitle} zu optimieren:

- [Lebenslauf erstellen mit dem AI Resume Builder](/de/builder) — Erstellen Sie Ihren ${jobTitle} Lebenslauf in Minuten
- [ATS-freundliche Vorlagen](/de/ats-friendly-templates) — Professionelle Vorlagen für maximale ATS-Kompatibilität
- [Lebenslauf-Beispiele](/de/resume-examples) — Weitere Beispiele aus verschiedenen Branchen
- [KI-gestützter ATS-Check](/de/tools/ats-checker) — Prüfen Sie Ihren Lebenslauf auf ATS-Kompatibilität

---

Erstellen Sie jetzt Ihren professionellen ${jobTitle} Lebenslauf mit unserem [KI-gestützten Lebenslauf-Generator](/de/builder) und starten Sie Ihre erfolgreiche Bewerbung.
`;
}
