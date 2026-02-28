/**
 * Italian (it) locale data for resume example generation.
 * Imported by generate-locale-resume-examples.mjs via:
 *   await import('./locale-data/resume-it.mjs')
 *
 * Keyword source: seo/italian-top-500-keywords.csv (500 keywords)
 * Top terms: curriculum vitae (5M), cv europass (500K), curriculum vitae gratis (500K),
 *            modello curriculum vitae (50K), crea cv gratis (50K)
 */

const LANG = 'it';

// ─── CONFIG ─────────────────────────────────────────────────────────────────

export const CONFIG = {
  author: 'Giulia Moretti',
  authorBio: 'Esperta in sviluppo professionale e redazione di curriculum vitae con oltre 10 anni di esperienza nell\'aiutare professionisti italiani a ottenere il lavoro ideale.',
  titlePattern: (job) => `Curriculum Vitae da ${job}: Esempi, Modelli e Guida 2026`,
  descriptionPattern: (job) => `Esempio di curriculum vitae da ${job.toLowerCase()} con modelli compatibili ATS e consigli professionali. Crea il tuo CV gratis e ottieni colloqui nel 2026.`,
  imageAltPattern: (job) => `Esempio di Curriculum Vitae da ${job}`,
};

// ─── JOB TITLES (English → Italian) ─────────────────────────────────────────

export const JOB_TITLES = {
  '3D Artist': 'Artista 3D',
  'AI Engineer': 'Ingegnere IA',
  'AWS Cloud Engineer': 'Ingegnere Cloud AWS',
  'AWS Solution Architect': 'Architetto di Soluzioni AWS',
  'Academic Advisor': 'Consulente Accademico',
  'Account Executive': 'Responsabile Commerciale',
  'Account Manager': 'Account Manager',
  'Accountant': 'Commercialista',
  'Accounting Assistant': 'Assistente Contabile',
  'Accounting Clerk': 'Impiegato Contabile',
  'Accounting Intern': 'Stagista in Contabilita',
  'Accounts Payable Specialist': 'Specialista Contabilita Fornitori',
  'Accounts Receivable Specialist': 'Specialista Contabilita Clienti',
  'Administrative Assistant': 'Assistente Amministrativo',
  'Android Developer': 'Sviluppatore Android',
  'Animal Control Officer': 'Agente di Controllo Animali',
  'Animal Shelter Worker': 'Operatore di Rifugio per Animali',
  'Animator': 'Animatore',
  'Appliance Repair Technician': 'Tecnico Riparazione Elettrodomestici',
  'Aquarium Keeper': 'Acquariofilo Professionista',
  'Arbitrator': 'Arbitro',
  'Architect': 'Architetto',
  'Art Director': 'Direttore Artistico',
  'Assistant Director': 'Vicedirettore',
  'Assistant Manager': 'Vice Responsabile',
  'Assistant Property Manager': 'Assistente Gestore Immobiliare',
  'Assistant Store Manager': 'Vice Responsabile di Negozio',
  'Athletic Trainer': 'Preparatore Atletico',
  'Audio Engineer': 'Ingegnere del Suono',
  'Auditor': 'Revisore dei Conti',
  'Auto Mechanic': 'Meccanico Auto',
  'Automation Engineer': 'Ingegnere dell\'Automazione',
  'Automotive Technician': 'Tecnico Automobilistico',
  'Backend Developer': 'Sviluppatore Backend',
  'Baker': 'Panettiere',
  'Bank Manager': 'Direttore di Banca',
  'Bank Teller': 'Cassiere di Banca',
  'Banquet Chef': 'Chef di Banchetti',
  'Barista': 'Barista',
  'Bartender': 'Barman',
  'Bellhop': 'Facchino d\'Albergo',
  'Billing Specialist': 'Specialista di Fatturazione',
  'Blockchain Developer': 'Sviluppatore Blockchain',
  'Branch Manager': 'Direttore di Filiale',
  'Brand Designer': 'Designer di Brand',
  'Budget Analyst': 'Analista di Bilancio',
  'Building Inspector': 'Ispettore Edile',
  'Building Maintenance Technician': 'Tecnico di Manutenzione Edifici',
  'Bus Driver': 'Autista di Autobus',
  'Business Administration Professional': 'Professionista in Amministrazione Aziendale',
  'Business Analyst': 'Analista Aziendale',
  'Business Consultant': 'Consulente Aziendale',
  'Business Development Executive': 'Dirigente Sviluppo Commerciale',
  'Business Development Manager': 'Responsabile Sviluppo Commerciale',
  'Business Intelligence Analyst': 'Analista di Business Intelligence',
  'Business Intelligence Specialist': 'Specialista di Business Intelligence',
  'Business Manager': 'Responsabile Aziendale',
  'Business Owner': 'Imprenditore',
  'Busser': 'Aiuto Cameriere',
  'CNC Machinist': 'Operatore CNC',
  'CNC Operator': 'Operatore Macchine CNC',
  'Cabin Crew': 'Equipaggio di Cabina',
  'Cabinet Maker': 'Ebanista',
  'Cafeteria Worker': 'Addetto alla Mensa',
  'Call Center Agent': 'Operatore di Call Center',
  'Call Center Representative': 'Addetto al Call Center',
  'Car Sales Associate': 'Venditore Auto',
  'Caregiver': 'Assistente Familiare',
  'Carpenter': 'Falegname',
  'Carpet Cleaner': 'Pulitore di Tappeti',
  'Case Manager': 'Case Manager',
  'Cashier': 'Cassiere',
  'Casino Dealer': 'Croupier',
  'Caterer': 'Catering Manager',
  'Catering Manager': 'Responsabile Catering',
  'Certified Nursing Assistant': 'Operatore Socio Sanitario (OSS)',
  'Certified Nursing Assistant (CNA)': 'Operatore Socio Sanitario (OSS)',
  'Change Management Specialist': 'Specialista in Gestione del Cambiamento',
  'Chef': 'Chef',
  'Chemical Engineer': 'Ingegnere Chimico',
  'Chemist': 'Chimico',
  'Chief Information Officer (CIO)': 'Direttore dei Sistemi Informativi (CIO)',
  'Chief of Staff': 'Capo di Gabinetto',
  'Chiropractor': 'Chiropratico',
  'City Planner': 'Urbanista',
  'Civil Engineer': 'Ingegnere Civile',
  'Claims Adjuster': 'Perito Assicurativo',
  'Client Relations Manager': 'Responsabile Relazioni con i Clienti',
  'Clinical Research Associate': 'Associato alla Ricerca Clinica',
  'Clinical Research Coordinator': 'Coordinatore di Ricerca Clinica',
  'Cloud Architect': 'Architetto Cloud',
  'Cloud Engineer': 'Ingegnere Cloud',
  'Code Enforcement Officer': 'Ispettore di Conformita Edilizia',
  'College Admissions Counselor': 'Consulente Ammissioni Universitarie',
  'College Professor': 'Professore Universitario',
  'Commercial Cleaner': 'Addetto alle Pulizie Commerciali',
  'Commercial Real Estate Broker': 'Agente Immobiliare Commerciale',
  'Community Manager': 'Community Manager',
  'Community Outreach Coordinator': 'Coordinatore Relazioni con la Comunita',
  'Complaints Handler': 'Addetto alla Gestione Reclami',
  'Compliance Officer': 'Responsabile della Conformita',
  'Computer Operator': 'Operatore Informatico',
  'Computer Science Professional': 'Professionista in Informatica',
  'Computer Technician': 'Tecnico Informatico',
  'Concierge': 'Concierge',
  'Concrete Finisher': 'Specialista in Calcestruzzo',
  'Construction Manager': 'Direttore dei Lavori',
  'Construction Superintendent': 'Sovrintendente di Cantiere',
  'Construction Worker': 'Operaio Edile',
  'Consultant': 'Consulente',
  'Content Creator': 'Creatore di Contenuti',
  'Content Writer': 'Redattore di Contenuti',
  'Contract Specialist': 'Specialista Contratti',
  'Contracts Specialist': 'Specialista Contratti',
  'Controller': 'Controller di Gestione',
  'Copywriter': 'Copywriter',
  'Corporate Security Manager': 'Responsabile Sicurezza Aziendale',
  'Correctional Officer': 'Agente Penitenziario',
  'Court Clerk': 'Cancelliere',
  'Court Reporter': 'Stenografo Giudiziario',
  'Creative Director': 'Direttore Creativo',
  'Crisis Counselor': 'Consulente di Crisi',
  'Cruise Ship Worker': 'Addetto alla Nave da Crociera',
  'Curriculum Developer': 'Sviluppatore di Programmi Scolastici',
  'Customer Experience Specialist': 'Specialista dell\'Esperienza Cliente',
  'Customer Service Representative': 'Addetto al Servizio Clienti',
  'Customer Success Manager': 'Customer Success Manager',
  'Customer Success Specialist': 'Specialista Customer Success',
  'Customer Support Specialist': 'Specialista Supporto Clienti',
  'Customs Officer': 'Agente Doganale',
  'Cybersecurity Analyst': 'Analista di Cybersicurezza',
  'Data Analyst': 'Analista dei Dati',
  'Data Architect': 'Architetto dei Dati',
  'Data Engineer': 'Ingegnere dei Dati',
  'Data Entry Clerk': 'Addetto all\'Inserimento Dati',
  'Data Entry Operator': 'Operatore di Inserimento Dati',
  'Data Entry Specialist': 'Specialista di Inserimento Dati',
  'Data Scientist': 'Data Scientist',
  'Database Administrator': 'Amministratore di Database',
  'Delivery Driver': 'Autista per Consegne',
  'Dental Assistant': 'Assistente Dentale',
  'Dental Hygienist': 'Igienista Dentale',
  'Dental Office Manager': 'Responsabile Studio Dentistico',
  'Dentist': 'Dentista',
  'Design Engineer': 'Ingegnere Progettista',
  'Desktop Support Engineer': 'Ingegnere Supporto Desktop',
  'Desktop Support Technician': 'Tecnico Supporto Desktop',
  'DevOps Engineer': 'Ingegnere DevOps',
  'Dialysis Technician': 'Tecnico di Dialisi',
  'Diesel Mechanic': 'Meccanico Diesel',
  'Dietary Aide': 'Assistente Dietetico',
  'Dietitian': 'Dietista',
  'Digital Marketer': 'Specialista di Marketing Digitale',
  'Digital Marketing Manager': 'Responsabile Marketing Digitale',
  'Digital Marketing Specialist': 'Specialista Marketing Digitale',
  'Dishwasher': 'Lavapiatti',
  'Dispatcher': 'Addetto alla Logistica',
  'District Manager': 'Direttore di Distretto',
  'Doctor': 'Medico',
  'Dog Trainer': 'Addestratore di Cani',
  'Driver': 'Autista',
  'Drywall Installer': 'Posatore di Cartongesso',
  'EMT': 'Tecnico di Emergenza Sanitaria',
  'ESL Teacher': 'Insegnante di Italiano per Stranieri',
  'Editor': 'Redattore',
  'Education Consultant': 'Consulente Educativo',
  'Educational Technologist': 'Tecnologo dell\'Istruzione',
  'Electrical Engineer': 'Ingegnere Elettrico',
  'Electrical Technician': 'Tecnico Elettrico',
  'Electrician': 'Elettricista',
  'Elementary Teacher': 'Insegnante di Scuola Elementare',
  'Elevator Technician': 'Tecnico Ascensorista',
  'Embedded Systems Engineer': 'Ingegnere Sistemi Embedded',
  'Emergency Management Coordinator': 'Coordinatore Gestione Emergenze',
  'Engineering Manager': 'Responsabile Ingegneria',
  'Environmental Compliance Officer': 'Responsabile Conformita Ambientale',
  'Epidemiologist': 'Epidemiologo',
  'Escrow Officer': 'Agente di Deposito a Garanzia',
  'Ethical Hacker': 'Hacker Etico',
  'Event Coordinator': 'Coordinatore di Eventi',
  'Event Manager': 'Responsabile Eventi',
  'Event Planner': 'Organizzatore di Eventi',
  'Executive Assistant': 'Assistente di Direzione',
  'Executive Chef': 'Executive Chef',
  'Executive Director': 'Direttore Esecutivo',
  'Family Services Worker': 'Operatore dei Servizi alla Famiglia',
  'Fashion Designer': 'Stilista di Moda',
  'Fast Food Worker': 'Addetto alla Ristorazione Veloce',
  'Fence Installer': 'Installatore di Recinzioni',
  'Finance Manager': 'Responsabile Finanziario',
  'Financial Analyst': 'Analista Finanziario',
  'Firefighter': 'Vigile del Fuoco',
  'Fitness Center Manager': 'Direttore di Centro Fitness',
  'Fitness Instructor': 'Istruttore di Fitness',
  'Fitness Trainer': 'Personal Trainer',
  'Flight Attendant': 'Assistente di Volo',
  'Floor Installer': 'Posatore di Pavimenti',
  'Florist': 'Fiorista',
  'Food Expeditor': 'Expeditor di Cucina',
  'Food Runner': 'Runner di Sala',
  'Food Safety Manager': 'Responsabile Sicurezza Alimentare',
  'Food Scientist': 'Scienziato Alimentare',
  'Food Server': 'Cameriere',
  'Food Service Director': 'Direttore della Ristorazione',
  'Food Service Manager': 'Responsabile della Ristorazione',
  'Food Service Worker': 'Addetto alla Ristorazione',
  'Food Stylist': 'Food Stylist',
  'Food Truck Operator': 'Operatore di Food Truck',
  'Freelance Writer': 'Scrittore Freelance',
  'Freight Broker': 'Spedizioniere',
  'Front Desk Agent': 'Addetto alla Reception',
  'Front Desk Receptionist': 'Receptionist',
  'Front End Developer': 'Sviluppatore Front-end',
  'Full Stack Developer': 'Sviluppatore Full Stack',
  'Game Designer': 'Game Designer',
  'Game Developer': 'Sviluppatore di Videogiochi',
  'Glazier': 'Vetraio',
  'Go Developer': 'Sviluppatore Go',
  'Grants Manager': 'Responsabile Sovvenzioni',
  'Graphic Designer': 'Grafico',
  'Group Fitness Instructor': 'Istruttore di Fitness di Gruppo',
  'Gym Trainer': 'Istruttore di Palestra',
  'HR Assistant': 'Assistente Risorse Umane',
  'HR Business Partner': 'HR Business Partner',
  'HR Coordinator': 'Coordinatore Risorse Umane',
  'HR Director': 'Direttore Risorse Umane',
  'HR Executive': 'Dirigente Risorse Umane',
  'HR Manager': 'Responsabile Risorse Umane',
  'HR Recruiter': 'Recruiter HR',
  'HVAC Technician': 'Tecnico HVAC',
  'Head Cook': 'Capo Cuoco',
  'Health Coach': 'Coach della Salute',
  'Health Inspector': 'Ispettore Sanitario',
  'Heavy Equipment Operator': 'Operatore di Macchine Pesanti',
  'Help Desk Technician': 'Tecnico Help Desk',
  'High School Teacher': 'Insegnante di Scuola Superiore',
  'Home Health Aide': 'Assistente Domiciliare',
  'Home Inspector': 'Ispettore Immobiliare',
  'Hospice Nurse': 'Infermiere di Cure Palliative',
  'Hospital Housekeeper': 'Addetto alle Pulizie Ospedaliere',
  'Hotel Front Desk Agent': 'Receptionist d\'Hotel',
  'Hotel Manager': 'Direttore d\'Hotel',
  'House Cleaner': 'Addetto alle Pulizie Domestiche',
  'Housekeeper': 'Governante',
  'Housekeeping Supervisor': 'Supervisore delle Pulizie',
  'IT Director': 'Direttore IT',
  'IT Manager': 'Responsabile IT',
  'IT Recruiter': 'Recruiter IT',
  'IT Specialist': 'Specialista IT',
  'IT Support Specialist': 'Specialista Supporto IT',
  'IT Support Technician': 'Tecnico Supporto IT',
  'IT Technician': 'Tecnico Informatico',
  'Illustrator': 'Illustratore',
  'Industrial Engineer': 'Ingegnere Industriale',
  'Industrial Maintenance Technician': 'Tecnico di Manutenzione Industriale',
  'Information Security Analyst': 'Analista di Sicurezza Informatica',
  'Inside Sales Representative': 'Commerciale Interno',
  'Instructional Coach': 'Coach Didattico',
  'Instructional Designer': 'Progettista Didattico',
  'Insulation Worker': 'Coibentatore',
  'Insurance Agent': 'Agente Assicurativo',
  'Interior Designer': 'Interior Designer',
  'Intern': 'Stagista',
  'Iron Worker': 'Carpentiere in Ferro',
  'Ironworker': 'Carpentiere in Ferro',
  'Janitor': 'Addetto alle Pulizie',
  'Java Full Stack Developer': 'Sviluppatore Full Stack Java',
  'JavaScript Developer': 'Sviluppatore JavaScript',
  'Junior Developer': 'Sviluppatore Junior',
  'Kitchen Helper': 'Aiuto Cucina',
  'Kitchen Manager': 'Responsabile di Cucina',
  'Lab Assistant': 'Assistente di Laboratorio',
  'Lab Technician': 'Tecnico di Laboratorio',
  'Landscaper': 'Giardiniere Paesaggista',
  'Leasing Consultant': 'Consulente Locazioni',
  'Legal Analyst': 'Analista Legale',
  'Legal Assistant': 'Assistente Legale',
  'Legal Secretary': 'Segretaria Legale',
  'Legislative Aide': 'Assistente Parlamentare',
  'Librarian': 'Bibliotecario',
  'Library Assistant': 'Assistente di Biblioteca',
  'Licensed Practical Nurse (LPN)': 'Infermiere Professionale (LPN)',
  'Limousine Driver': 'Autista di Limousine',
  'Line Cook': 'Cuoco di Linea',
  'Litigation Support Specialist': 'Specialista Supporto Contenzioso',
  'Loan Officer': 'Addetto ai Prestiti',
  'Loan Processor': 'Addetto alla Gestione Prestiti',
  'Locksmith': 'Fabbro',
  'Logistics Coordinator': 'Coordinatore Logistico',
  'Logistics Manager': 'Responsabile Logistica',
  'Logistics Specialist': 'Specialista Logistico',
  'Long Haul Truck Driver': 'Camionista Lunga Percorrenza',
  'Loss Prevention Specialist': 'Specialista Prevenzione Perdite',
  'MRI Technologist': 'Tecnico di Risonanza Magnetica',
  'Machine Learning Engineer': 'Ingegnere di Machine Learning',
  'Machine Learning Specialist': 'Specialista di Machine Learning',
  'Machine Operator': 'Operatore di Macchine',
  'Maintenance Engineer': 'Ingegnere di Manutenzione',
  'Maintenance Manager': 'Responsabile Manutenzione',
  'Maintenance Technician': 'Tecnico di Manutenzione',
  'Makeup Artist': 'Truccatore',
  'Management Consultant': 'Consulente di Management',
  'Manufacturing Engineer': 'Ingegnere di Produzione',
  'Manufacturing Worker': 'Operaio di Produzione',
  'Marketing Analyst': 'Analista Marketing',
  'Marketing Assistant': 'Assistente Marketing',
  'Marketing Coordinator': 'Coordinatore Marketing',
  'Marketing Director': 'Direttore Marketing',
  'Marketing Executive': 'Dirigente Marketing',
  'Marketing Intern': 'Stagista Marketing',
  'Marketing Manager': 'Responsabile Marketing',
  'Marketing Specialist': 'Specialista Marketing',
  'Mason': 'Muratore',
  'Massage Therapist': 'Massaggiatore',
  'Material Handler': 'Addetto alla Movimentazione Materiali',
  'Mechanical Design Engineer': 'Ingegnere di Progettazione Meccanica',
  'Mechanical Engineer': 'Ingegnere Meccanico',
  'Mechanical Technician': 'Tecnico Meccanico',
  'Mediator': 'Mediatore',
  'Medical Assistant': 'Assistente Medico',
  'Medical Billing Specialist': 'Specialista Fatturazione Medica',
  'Medical Coder': 'Codificatore Medico',
  'Medical Office Assistant': 'Assistente di Studio Medico',
  'Medical Receptionist': 'Receptionist Medica',
  'Medical Representative': 'Informatore Scientifico del Farmaco',
  'Medical Scribe': 'Assistente alla Documentazione Medica',
  'Medical Technologist': 'Tecnologo Medico',
  'Mental Health Counselor': 'Consulente di Salute Mentale',
  'Millwright': 'Montatore Meccanico',
  'Mobile Developer': 'Sviluppatore Mobile',
  'Mortgage Loan Officer': 'Addetto ai Mutui',
  'Motion Graphics Designer': 'Motion Graphics Designer',
  'Moving Company Driver': 'Autista di Traslochi',
  'Music Producer': 'Produttore Musicale',
  'Nanny': 'Tata',
  'Network Administrator': 'Amministratore di Rete',
  'Network Engineer': 'Ingegnere di Rete',
  'Night Auditor': 'Revisore Notturno',
  'Node.js Developer': 'Sviluppatore Node.js',
  'Nurse Practitioner': 'Infermiere Specializzato',
  'Nursing Assistant': 'Ausiliario Socio Assistenziale',
  'Nutritionist': 'Nutrizionista',
  'Occupational Therapist': 'Terapista Occupazionale',
  'Occupational Therapy Assistant': 'Assistente di Terapia Occupazionale',
  'Office Administrator': 'Amministratore d\'Ufficio',
  'Office Assistant': 'Assistente d\'Ufficio',
  'Office Clerk': 'Impiegato d\'Ufficio',
  'Office Manager': 'Office Manager',
  'Operations Analyst': 'Analista delle Operazioni',
  'Operations Manager': 'Responsabile delle Operazioni',
  'Optician': 'Ottico',
  'Optometrist': 'Optometrista',
  'Painter': 'Imbianchino',
  'Paralegal': 'Paralegale',
  'Paramedic': 'Paramedico',
  'Park Ranger': 'Guardia Forestale',
  'Pastry Chef': 'Chef Pasticcere',
  'Payroll Specialist': 'Specialista Buste Paga',
  'Penetration Tester': 'Penetration Tester',
  'Personal Trainer': 'Personal Trainer',
  'Pest Control Technician': 'Tecnico Disinfestazione',
  'Pet Groomer': 'Toelettatore di Animali',
  'Pet Sitter': 'Pet Sitter',
  'Pharmacist': 'Farmacista',
  'Pharmacy Assistant': 'Assistente di Farmacia',
  'Pharmacy Tech': 'Tecnico di Farmacia',
  'Pharmacy Technician': 'Tecnico di Farmacia',
  'Phlebotomist': 'Flebotomista',
  'Photographer': 'Fotografo',
  'Physical Therapist': 'Fisioterapista',
  'Physical Therapy Assistant': 'Assistente Fisioterapista',
  'Physician Assistant': 'Assistente Medico',
  'Pilates Instructor': 'Istruttore di Pilates',
  'Pizza Maker': 'Pizzaiolo',
  'Platform Engineer': 'Ingegnere di Piattaforma',
  'Plumber': 'Idraulico',
  'Police Officer': 'Agente di Polizia',
  'Policy Analyst': 'Analista di Politiche Pubbliche',
  'Pool Cleaner': 'Manutentore di Piscine',
  'Pool Technician': 'Tecnico di Piscine',
  'Postal Worker': 'Postino',
  'Power BI Developer': 'Sviluppatore Power BI',
  'Prep Cook': 'Cuoco Preparatore',
  'Preschool Teacher': 'Insegnante di Scuola Materna',
  'Pressure Washer': 'Tecnico di Idropulitura',
  'Probation Officer': 'Agente di Sorveglianza',
  'Process Engineer': 'Ingegnere di Processo',
  'Procurement Manager': 'Responsabile Acquisti',
  'Procurement Specialist': 'Specialista Acquisti',
  'Product Analyst': 'Analista di Prodotto',
  'Product Designer': 'Product Designer',
  'Product Manager': 'Product Manager',
  'Product Marketing Manager': 'Responsabile Marketing di Prodotto',
  'Product Owner': 'Product Owner',
  'Production Assistant': 'Assistente di Produzione',
  'Production Engineer': 'Ingegnere di Produzione',
  'Production Manager': 'Responsabile di Produzione',
  'Production Worker': 'Operaio di Produzione',
  'Program Coordinator': 'Coordinatore di Programmi',
  'Project Coordinator': 'Coordinatore di Progetto',
  'Project Engineer': 'Ingegnere di Progetto',
  'Project Manager': 'Project Manager',
  'Prompt Engineer': 'Prompt Engineer',
  'Property Manager': 'Gestore Immobiliare',
  'Psychiatrist': 'Psichiatra',
  'Psychologist': 'Psicologo',
  'Public Affairs Specialist': 'Specialista in Affari Pubblici',
  'Public Health Inspector': 'Ispettore di Sanita Pubblica',
  'Python Developer': 'Sviluppatore Python',
  'QA Analyst': 'Analista QA',
  'QA Engineer': 'Ingegnere QA',
  'QA Manager': 'Responsabile QA',
  'QA Tester': 'Tester QA',
  'Quality Analyst': 'Analista della Qualita',
  'Quality Assurance Specialist': 'Specialista Assicurazione Qualita',
  'Quality Control Inspector': 'Ispettore Controllo Qualita',
  'Quality Engineer': 'Ingegnere della Qualita',
  'Quality Manager': 'Responsabile Qualita',
  'Radiologic Technologist': 'Tecnico di Radiologia',
  'React Developer': 'Sviluppatore React',
  'Reading Specialist': 'Specialista in Lettura',
  'Real Estate Agent': 'Agente Immobiliare',
  'Real Estate Appraiser': 'Perito Immobiliare',
  'Real Estate Assistant': 'Assistente Immobiliare',
  'Real Estate Attorney': 'Avvocato Immobiliare',
  'Real Estate Investor': 'Investitore Immobiliare',
  'Receptionist': 'Receptionist',
  'Recreation Coordinator': 'Coordinatore Ricreativo',
  'Recruiter': 'Recruiter',
  'Recruiting Coordinator': 'Coordinatore di Selezione',
  'Registered Nurse': 'Infermiere Professionale',
  'Release Engineer': 'Ingegnere di Rilascio',
  'Research Analyst': 'Analista di Ricerca',
  'Research Assistant': 'Assistente di Ricerca',
  'Reservation Agent': 'Addetto alle Prenotazioni',
  'Resident Assistant': 'Assistente di Residenza',
  'Residential Cleaner': 'Addetto alle Pulizie Residenziali',
  'Respiratory Therapist': 'Terapista Respiratorio',
  'Restaurant Manager': 'Direttore di Ristorante',
  'Retail Assistant': 'Commesso',
  'Retail Associate': 'Addetto Vendite',
  'Retail Manager': 'Responsabile di Negozio',
  'Retail Sales Associate': 'Addetto Vendite al Dettaglio',
  'Retail Store Manager': 'Direttore di Negozio',
  'Risk Management Specialist': 'Specialista in Gestione del Rischio',
  'Roofer': 'Copritetto',
  'Rust Developer': 'Sviluppatore Rust',
  'SAP Consultant': 'Consulente SAP',
  'SOC Analyst': 'Analista SOC',
  'Sales Assistant': 'Assistente alle Vendite',
  'Sales Associate': 'Addetto alle Vendite',
  'Sales Consultant': 'Consulente Commerciale',
  'Sales Coordinator': 'Coordinatore Vendite',
  'Sales Director': 'Direttore Commerciale',
  'Sales Engineer': 'Ingegnere Commerciale',
  'Sales Executive': 'Dirigente Commerciale',
  'Sales Manager': 'Responsabile Vendite',
  'Sales Representative': 'Rappresentante Commerciale',
  'Salesforce Administrator': 'Amministratore Salesforce',
  'School Administrator': 'Amministratore Scolastico',
  'School Counselor': 'Consulente Scolastico',
  'Scrum Master': 'Scrum Master',
  'Seaman': 'Marinaio',
  'Security Analyst': 'Analista di Sicurezza',
  'Security Engineer': 'Ingegnere della Sicurezza',
  'Security Guard': 'Guardia Giurata',
  'Security Officer': 'Addetto alla Sicurezza',
  'Server': 'Cameriere',
  'Service Advisor': 'Consulente di Servizio',
  'Service Crew': 'Addetto al Servizio',
  'Set Designer': 'Scenografo',
  'Sheet Metal Worker': 'Lattoniere',
  'Shipping & Receiving Clerk': 'Addetto Spedizioni e Ricevimento',
  'Site Engineer': 'Ingegnere di Cantiere',
  'Site Reliability Engineer': 'Site Reliability Engineer',
  'Small Business Owner': 'Titolare di Piccola Impresa',
  'Social Media Coordinator': 'Coordinatore Social Media',
  'Social Media Manager': 'Social Media Manager',
  'Social Media Specialist': 'Specialista Social Media',
  'Social Worker': 'Assistente Sociale',
  'Software Architect': 'Architetto Software',
  'Software Developer': 'Sviluppatore Software',
  'Software Engineer': 'Ingegnere del Software',
  'Software Tester': 'Tester Software',
  'Solar Installer': 'Installatore di Pannelli Solari',
  'Solution Architect': 'Architetto di Soluzioni',
  'Solutions Engineer': 'Ingegnere di Soluzioni',
  'Sommelier': 'Sommelier',
  'Sous Chef': 'Sous Chef',
  'Spa Manager': 'Direttore di Spa',
  'Special Education Teacher': 'Insegnante di Sostegno',
  'Speech-Language Pathologist': 'Logopedista',
  'Sports Coach': 'Allenatore Sportivo',
  'Stage Manager': 'Direttore di Scena',
  'Sterile Processing Technician': 'Tecnico di Sterilizzazione',
  'Store Associate': 'Addetto al Negozio',
  'Store Manager': 'Direttore di Negozio',
  'Storyboard Artist': 'Storyboard Artist',
  'Substance Abuse Counselor': 'Consulente per le Dipendenze',
  'Supply Chain Analyst': 'Analista della Supply Chain',
  'Supply Chain Manager': 'Responsabile Supply Chain',
  'Support Worker': 'Operatore di Supporto',
  'Surgical Technologist': 'Tecnico Chirurgico',
  'Sushi Chef': 'Sushi Chef',
  'System Administrator': 'Amministratore di Sistema',
  'System Analyst': 'Analista di Sistema',
  'System Engineer': 'Ingegnere di Sistema',
  'TSA Agent': 'Agente di Sicurezza Aeroportuale',
  'Talent Acquisition Specialist': 'Specialista in Talent Acquisition',
  'Teacher': 'Insegnante',
  'Teaching Assistant': 'Assistente di Insegnamento',
  'Team Leader': 'Team Leader',
  'Tech Sales Representative': 'Commerciale Tech',
  'Technical Program Manager': 'Responsabile Programma Tecnico',
  'Technical Recruiter': 'Recruiter Tecnico',
  'Technical Support Specialist': 'Specialista Supporto Tecnico',
  'Technical Writer': 'Redattore Tecnico',
  'Therapist': 'Terapeuta',
  'Title Examiner': 'Esaminatore di Titoli',
  'Tour Guide': 'Guida Turistica',
  'Travel Agent': 'Agente di Viaggio',
  'Truck Driver': 'Camionista',
  'Tutor': 'Tutor',
  'UI Designer': 'Designer UI',
  'UX Designer': 'Designer UX',
  'UX Researcher': 'Ricercatore UX',
  'Ultrasound Technician': 'Tecnico Ecografico',
  'Valet Attendant': 'Parcheggiatore',
  'Veterans Service Officer': 'Operatore dei Servizi ai Veterani',
  'Veterinary Assistant': 'Assistente Veterinario',
  'Veterinary Technician': 'Tecnico Veterinario',
  'Video Editor': 'Montatore Video',
  'Videographer': 'Videomaker',
  'Virtual Assistant': 'Assistente Virtuale',
  'Voice Actor': 'Doppiatore',
  'Waiter/Waitress': 'Cameriere/Cameriera',
  'Warehouse Associate': 'Addetto al Magazzino',
  'Warehouse Manager': 'Responsabile di Magazzino',
  'Warehouse Worker': 'Magazziniere',
  'Web Designer': 'Web Designer',
  'Web Developer': 'Sviluppatore Web',
  'Welder': 'Saldatore',
  'Wellness Coach': 'Coach del Benessere',
  'Wildlife Biologist': 'Biologo della Fauna Selvatica',
  'Wind Turbine Technician': 'Tecnico Eolico',
  'Window Cleaner': 'Lavavetri',
  'X-Ray Technician': 'Tecnico Radiologo',
  'Yoga Instructor': 'Istruttore di Yoga',
  'Youth Counselor': 'Educatore Giovanile',
  'Zookeeper': 'Guardiano dello Zoo',
  'iOS Developer': 'Sviluppatore iOS',
};

// ─── CATEGORIES (English → Italian) ──────────────────────────────────────────

export const CATEGORIES = {
  Technology: 'Tecnologia',
  Healthcare: 'Sanita',
  Trades: 'Mestieri e Artigianato',
  Hospitality: 'Ospitalita',
  'Food Service': 'Ristorazione',
  Creative: 'Settore Creativo',
  Education: 'Istruzione',
  Government: 'Pubblica Amministrazione',
  Finance: 'Finanza',
  Marketing: 'Marketing',
  Business: 'Business',
  Engineering: 'Ingegneria',
  Sales: 'Vendite',
  Legal: 'Legale',
  'Real Estate': 'Immobiliare',
  HR: 'Risorse Umane',
  Fitness: 'Fitness',
  Management: 'Management',
  'Animal Care': 'Cura degli Animali',
  Logistics: 'Logistica',
  'Customer Service': 'Servizio Clienti',
  Administrative: 'Amministrativo',
  Transportation: 'Trasporti',
  Retail: 'Commercio al Dettaglio',
  Cleaning: 'Pulizie',
  'Social Services': 'Servizi Sociali',
  Manufacturing: 'Industria Manifatturiera',
  Construction: 'Edilizia',
  Security: 'Sicurezza',
  Science: 'Scienze',
  Events: 'Eventi',
  'Writing & Content': 'Scrittura e Contenuti',
  'Supply Chain': 'Supply Chain',
  Research: 'Ricerca',
  Insurance: 'Assicurazioni',
  Consulting: 'Consulenza',
  Aviation: 'Aviazione',
  Automotive: 'Automotive',
  Media: 'Media',
  Maritime: 'Settore Marittimo',
  'Law Enforcement': 'Forze dell\'Ordine',
  'Entry-Level': 'Primo Impiego',
  Entertainment: 'Intrattenimento',
  Childcare: 'Infanzia',
  Beauty: 'Estetica',
  Architecture: 'Architettura',
};

// ─── HELPERS ────────────────────────────────────────────────────────────────

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

// ─── CATEGORY OPENERS ───────────────────────────────────────────────────────

const CATEGORY_OPENERS = {
  Technology: (job) => `Un curriculum vitae da ${job} efficace va ben oltre un semplice elenco di tecnologie conosciute. Deve dimostrare la capacita di risolvere problemi concreti, quantificare l'impatto del proprio lavoro e mettere in evidenza la comprensione delle sfide tecniche del ruolo.`,
  Healthcare: (job) => `I selezionatori nel settore sanitario cercano candidati capaci di dimostrare sia competenze cliniche solide che un impegno autentico verso il benessere dei pazienti. Il tuo curriculum vitae da ${job} deve bilanciare padronanza tecnica e qualita umane.`,
  Finance: (job) => `I recruiter in ambito finanziario privilegiano candidati capaci di trasformare dati complessi in decisioni strategiche. Il tuo curriculum vitae da ${job} deve dimostrare rigore analitico, attenzione ai dettagli e buon giudizio nelle questioni finanziarie.`,
  Education: (job) => `I responsabili delle assunzioni nel settore dell'istruzione cercano professionisti capaci di ispirare l'apprendimento e di adattarsi alle esigenze diverse degli studenti. Il tuo curriculum vitae da ${job} deve riflettere la tua competenza pedagogica e il tuo impegno per il successo degli alunni.`,
  'Food Service': (job) => `I responsabili delle assunzioni nella ristorazione cercano affidabilita, spirito di squadra e passione per il mestiere. Il tuo curriculum vitae da ${job} deve valorizzare le tue competenze culinarie e la tua capacita di lavorare sotto pressione.`,
  Hospitality: (job) => `Il settore dell'ospitalita valorizza il calore umano, la cura dei dettagli e l'eleganza sotto pressione. Il tuo curriculum vitae da ${job} deve riflettere il tuo orientamento al servizio e la tua capacita di creare esperienze memorabili per gli ospiti.`,
  Trades: (job) => `I datori di lavoro apprezzano i professionisti qualificati capaci di lavorare in autonomia e di fornire un lavoro di qualita. Il tuo curriculum vitae da ${job} deve mettere in evidenza la tua esperienza pratica, la consapevolezza della sicurezza e la capacita di risolvere problemi sul campo.`,
  Creative: (job) => `I migliori professionisti creativi uniscono eccellenza artistica e comprensione delle esigenze del cliente. Il tuo curriculum vitae da ${job} deve valorizzare la tua visione creativa dimostrando al contempo senso commerciale e capacita di consegnare progetti nei tempi stabiliti.`,
  Administrative: (job) => `I datori di lavoro cercano candidati capaci di anticipare le esigenze, risolvere problemi in modo proattivo e mantenere la riservatezza. Un curriculum vitae da ${job} efficace dimostra eccellenza organizzativa e capacita di garantire il buon funzionamento delle operazioni.`,
  Sales: (job) => `Il tuo CV e la tua prima presentazione commerciale, e i selezionatori lo valutano come tale. L'approccio piu efficace per un curriculum vitae da ${job} consiste nel dimostrare che comprendi le sfide aziendali e che puoi contribuire agli obiettivi di fatturato.`,
  Marketing: (job) => `Il marketing evolve rapidamente e i recruiter cercano candidati che padroneggino sia la strategia che l'esecuzione. Il tuo curriculum vitae da ${job} deve dimostrare la capacita di generare risultati misurabili con creativita strategica.`,
  HR: (job) => `A differenza di altri ruoli aziendali, le posizioni nelle risorse umane richiedono di dimostrare la capacita di navigare dinamiche organizzative sensibili generando al contempo risultati concreti per l'azienda.`,
  'Customer Service': (job) => `I ruoli nel servizio clienti richiedono eccezionali competenze comunicative e un'empatia autentica. Il tuo curriculum vitae da ${job} deve dimostrare la capacita di risolvere problemi efficacemente mantenendo relazioni positive con la clientela.`,
  Retail: (job) => `I datori di lavoro nel commercio al dettaglio valorizzano l'affidabilita, la conoscenza dei prodotti e un autentico entusiasmo per il servizio clienti. Il tuo curriculum vitae da ${job} deve mettere in evidenza le tue performance di vendita e la capacita di eccellere in un ambiente dinamico.`,
  Logistics: (job) => `I datori di lavoro in ambito logistico privilegiano l'efficienza, la precisione e la capacita di gestire operazioni con tempistiche stringenti. Il tuo curriculum vitae da ${job} deve evidenziare la tua esperienza nella gestione delle scorte, nella pianificazione e nell'ottimizzazione dei processi.`,
  Government: (job) => `Le candidature nel settore pubblico richiedono un approccio diverso rispetto al settore privato. Il tuo curriculum vitae da ${job} deve rispondere direttamente ai requisiti del bando dimostrando il tuo impegno per il servizio pubblico e l'interesse generale.`,
  Legal: (job) => `Il settore legale esige precisione assoluta e attenzione meticolosa ai dettagli. Il tuo curriculum vitae da ${job} deve riflettere il tuo rigore intellettuale, la padronanza del quadro normativo e la capacita di gestire casi complessi.`,
  default: (job) => `Un curriculum vitae da ${job} efficace si concentra su risultati concreti che dimostrano la tua capacita di generare valore fin dal primo giorno. Combina esperienza pertinente ed entusiasmo autentico per la posizione desiderata.`,
};

// ─── TAGS GENERATOR ─────────────────────────────────────────────────────────

export function generateTags(jobTitle, slug) {
  const lower = jobTitle.toLowerCase();
  return [
    `curriculum vitae ${lower}`,
    `cv ${lower}`,
    `esempio curriculum vitae ${lower}`,
    `modello cv ${lower}`,
    `curriculum vitae professionale`,
    `cv compatibile ats`,
    `modello curriculum vitae`,
    `crea curriculum gratis`,
  ];
}

// ─── FAQ GENERATOR ──────────────────────────────────────────────────────────

export function generateFAQ(jobTitle) {
  const lower = jobTitle.toLowerCase();
  return [
    {
      question: `Quali competenze inserire nel curriculum vitae da ${lower}?`,
      answer: `Inserisci le competenze tecniche direttamente collegate al ruolo di ${lower}, insieme alle competenze trasversali come comunicazione e lavoro di squadra. Utilizza le parole chiave dell'annuncio di lavoro e supporta ogni competenza con un esempio concreto di risultato professionale.`,
    },
    {
      question: `Quanto deve essere lungo il curriculum vitae da ${lower}?`,
      answer: `Un curriculum vitae da ${lower} dovrebbe essere di una pagina per profili junior e intermedi, e puo estendersi a due pagine per profili senior con oltre 10 anni di esperienza. Privilegia la qualita del contenuto rispetto alla quantita e assicurati che ogni elemento apporti valore.`,
    },
    {
      question: `Quale formato di CV scegliere per un ruolo di ${lower}?`,
      answer: `Il formato cronologico inverso e il piu raccomandato per un curriculum vitae da ${lower}, perche valorizza la tua progressione di carriera. Utilizza un modello professionale compatibile ATS con sezioni chiare: dati personali, profilo professionale, esperienza, formazione e competenze.`,
    },
    {
      question: `Qual e lo stipendio medio di un ${lower} in Italia?`,
      answer: `Lo stipendio di un ${lower} varia in base all'esperienza, alla localita e alla dimensione dell'azienda. Consulta i dati aggiornati su siti come Glassdoor, PayScale o ISTAT per ottenere una stima realistica nella tua area. Evidenziare risultati quantificati nel tuo CV rafforza la tua posizione durante la negoziazione salariale.`,
    },
    {
      question: `Cosa includere nel curriculum vitae da ${lower}?`,
      answer: `Un curriculum vitae da ${lower} completo deve includere: dati personali, un profilo professionale efficace, esperienza lavorativa con risultati quantificati, formazione, certificazioni pertinenti e competenze chiave. Adatta ogni sezione ai requisiti specifici della posizione per cui ti candidi.`,
    },
  ];
}

// ─── BODY GENERATOR ─────────────────────────────────────────────────────────

export function generateBody(jobTitle, category, keySkills, avgSalary, jobGrowth, slug) {
  const lower = jobTitle.toLowerCase();
  const skills = keySkills || [];
  const topSkills = skills.slice(0, 3).join(', ') || 'competenze chiave';
  const midSkills = skills.slice(3, 6).join(', ') || 'competenze complementari';
  const softSkills = skills.slice(6, 8).join(', ') || 'lavoro di squadra, comunicazione';

  const norm = normalizeCategory(category);
  const opener = (CATEGORY_OPENERS[norm] || CATEGORY_OPENERS.default)(jobTitle);

  const relatedSlug1 = slug.includes('-') ? slug.split('-')[0] : slug;

  return `
## Come Creare un Curriculum Vitae da ${jobTitle} Efficace

${opener}

I selezionatori dedicano in media sei-sette secondi alla prima lettura di un curriculum vitae. Per una posizione di ${lower}, questo significa che le tue competenze piu rilevanti e i tuoi risultati principali devono essere immediatamente visibili. Un CV ben strutturato non si limita a elencare le esperienze: racconta la storia del tuo percorso professionale e dimostra il valore che porti all'azienda.

## Esempi di Profilo Professionale

### Primo Impiego

${lower} motivato con una solida formazione in ${topSkills || 'competenze del settore'}. Desideroso di contribuire a un team dinamico e di applicare le conoscenze acquisite durante gli studi in un contesto professionale stimolante. Riconosciuto per la capacita di apprendimento rapido, il senso dell'organizzazione e la determinazione nel raggiungere gli obiettivi prefissati.

### Livello Intermedio

${jobTitle} con oltre 5 anni di esperienza in ${topSkills}. Risultati dimostrati nel miglioramento dei processi e nella consegna dei progetti nei tempi e nei budget previsti. Esperto in ${midSkills || 'competenze avanzate'}, con una comprovata capacita di guidare team junior e condurre iniziative di miglioramento continuo.

### Livello Senior

${jobTitle} senior con oltre 10 anni di esperienza nel settore, riconosciuto per l'expertise in ${topSkills} e ${midSkills || 'gestione strategica'}. Ha guidato team multidisciplinari di oltre 15 persone e gestito progetti strategici che hanno generato risparmi superiori a 500.000 euro. Competenze avanzate in ${softSkills || 'leadership e visione strategica'}, con un track record costante di superamento degli obiettivi.

## Stipendio e Prospettive di Lavoro

Lo stipendio medio di un ${lower} e di circa **${avgSalary || '$50,000'}** all'anno, con variazioni significative in base all'esperienza, alla posizione geografica e al settore di attivita. Le prospettive di crescita occupazionale per questo ruolo sono del **${jobGrowth || '+5%'}** nei prossimi anni.

I professionisti alle prime armi possono aspettarsi uno stipendio iniziale compreso tra il 70% e l'80% della mediana, mentre i profili senior o specializzati possono superare la mediana del 40-60%. Le aree metropolitane e i settori ad alta domanda offrono generalmente retribuzioni superiori.

**Fonti:**
- [Bureau of Labor Statistics (BLS)](https://www.bls.gov/ooh/) — Dati ufficiali sull'occupazione e gli stipendi negli Stati Uniti
- [ISTAT](https://www.istat.it/) — Istituto Nazionale di Statistica italiano, dati su retribuzioni e mercato del lavoro
- [Eurostat](https://ec.europa.eu/eurostat) — Dati statistici europei su occupazione e stipendi
- [Glassdoor](https://www.glassdoor.com/Salaries/) — Stipendi dichiarati dai dipendenti e fasce retributive
- [PayScale](https://www.payscale.com/research/US/) — Ricerca salariale e confronti per posizione

*Le retribuzioni effettive variano in base all'esperienza, alla localita, al settore e alla dimensione dell'azienda.*

## Competenze Essenziali da Evidenziare

### Competenze Tecniche
${skills.slice(0, 3).map(s => `- **${s}** — Competenza fondamentale per ogni ${lower}, direttamente ricercata dai selezionatori e dai sistemi ATS`).join('\n') || '- Padronanza degli strumenti e delle tecnologie specifiche del ruolo\n- Conoscenza approfondita dei metodi e dei processi del settore\n- Capacita di utilizzare i software professionali di riferimento'}

### Competenze Organizzative
${skills.slice(3, 6).map(s => `- **${s}** — Competenza valorizzata nell'esercizio quotidiano del ruolo di ${lower}`).join('\n') || '- Gestione del tempo e definizione delle priorita\n- Organizzazione e pianificazione dei progetti\n- Rigore nel rispetto delle procedure'}

### Competenze Relazionali
${skills.slice(6, 8).map(s => `- **${s}** — Qualita interpersonale essenziale per avere successo come ${lower}`).join('\n') || '- Comunicazione scritta e orale\n- Lavoro di squadra e collaborazione'}
- Adattabilita e capacita di lavorare sotto pressione
- Risoluzione dei conflitti e negoziazione

## Risultati Professionali con Impatto Misurabile

Utilizza questi esempi come modello per formulare i tuoi risultati con dati concreti:

- Miglioramento del **25%** dell'efficienza operativa grazie all'ottimizzazione dei processi in ${topSkills || 'competenze chiave'}, generando risparmi annuali significativi
- Gestione simultanea di **12+ progetti** con un tasso di consegna nei tempi del 98%, superando gli obiettivi del team
- Formazione e tutoraggio di **8 colleghi junior**, contribuendo a ridurre il tempo di inserimento del 40%
- Implementazione di un nuovo sistema di ${skills[0] || 'gestione'} che ha ridotto gli errori del **35%** e migliorato la soddisfazione del cliente
- Aumento del fatturato del **20%** in un trimestre grazie a strategie innovative in ${skills[1] || 'sviluppo'}
- Raggiungimento di un tasso di soddisfazione clienti del **95%** implementando miglioramenti continui basati sui feedback degli utenti

## Formato e Consigli per il Modello di Curriculum Vitae da ${jobTitle}

1. **Utilizza il formato cronologico inverso** — Posiziona l'esperienza piu recente per prima. E il formato preferito dai selezionatori e dai sistemi ATS per le posizioni di ${lower}.
2. **Adatta il profilo professionale a ogni candidatura** — Riprendi le parole chiave dell'annuncio di lavoro e personalizza la tua presentazione per dimostrare che comprendi le sfide specifiche del ruolo.
3. **Quantifica i tuoi risultati** — I numeri attirano l'attenzione e rendono tangibili i tuoi contributi. Preferisci "aumentato le vendite del 30%" a "migliorato i risultati commerciali".
4. **Cura l'impaginazione** — Utilizza margini di 2,5 cm, un carattere professionale (Calibri, Arial, Garamond) in dimensione 10-12 e sezioni chiaramente delimitate da titoli in grassetto.
5. **Includi certificazioni e formazione pertinenti** — Per una posizione di ${lower}, le certificazioni professionali e la formazione continua dimostrano il tuo impegno nello sviluppo delle competenze.

## Consiglio del Responsabile delle Assunzioni

> **L'errore piu frequente che vedo nei curriculum vitae da ${lower} e l'assenza di risultati quantificati.** Molti candidati descrivono le proprie responsabilita senza mai mostrare l'impatto concreto del proprio lavoro.

Quando seleziono un ${lower}, cerco prove tangibili di performance. Un candidato che scrive "Gestito un team di 5 persone" mi dice meno di chi scrive "Guidato un team di 5 persone, raggiungendo il 115% degli obiettivi trimestrali per 4 trimestri consecutivi". Ogni riga della sezione esperienza deve rispondere alla domanda: quale risultato misurabile ho ottenuto?

Pensate anche ad adattare il vocabolario al settore. I recruiter specializzati in ${category.toLowerCase()} noteranno immediatamente i termini generici che tradiscono un CV non personalizzato.

## Domande di Colloquio Frequenti per ${jobTitle}

### Puo descrivere un progetto complesso che ha portato a termine come ${lower}?

I selezionatori vogliono valutare la tua capacita di gestire la complessita. Struttura la risposta secondo il metodo STAR (Situazione, Compito, Azione, Risultato). Descrivi il contesto, il tuo ruolo specifico, le azioni intraprese e i risultati misurabili ottenuti.

### Come gestisce le situazioni di pressione o le scadenze ravvicinate nel suo ruolo di ${lower}?

Dimostra la tua capacita di stabilire le priorita e di restare produttivo sotto pressione. Fornisci un esempio concreto in cui hai dovuto gestire priorita contrastanti, spiega il tuo approccio metodico e condividi il risultato positivo ottenuto.

### Quali sono le sue competenze tecniche piu forti in relazione a questa posizione di ${lower}?

E l'occasione per mettere in evidenza la tua expertise in ${topSkills || 'competenze chiave'}. Non limitarti a elencare competenze: illustrale con esempi concreti di applicazione e risultati ottenuti grazie a queste competenze.

### Come si tiene aggiornato sulle evoluzioni del suo settore?

I selezionatori vogliono assicurarsi che investi nel tuo sviluppo professionale continuo. Menziona formazioni recenti, certificazioni, conferenze, pubblicazioni professionali o community a cui partecipi attivamente.

### Dove si vede tra cinque anni nel campo di ${lower}?

Mostra di avere una visione chiara della tua evoluzione professionale. Esprimi ambizioni realistiche allineate con le opportunita di crescita dell'azienda, dimostrando al contempo il tuo impegno a lungo termine nel settore.

## Errori Comuni da Evitare

### 1. Utilizzare un CV generico non adattato alla posizione

Inviare lo stesso curriculum vitae per ogni candidatura e l'errore piu penalizzante. I sistemi ATS e i selezionatori individuano immediatamente un CV non personalizzato. Adatta il profilo professionale e le parole chiave a ogni offerta di ${lower}.

### 2. Descrivere mansioni invece di risultati

Elencare le responsabilita quotidiane non impressiona i selezionatori. Trasforma ogni punto in un risultato misurabile. "Gestito le chiamate dei clienti" diventa "Gestite in media 85 chiamate al giorno con un tasso di risoluzione al primo contatto del 92%".

### 3. Trascurare l'ottimizzazione ATS

Molti candidati alla posizione di ${lower} perdono opportunita perche il loro CV non supera i filtri automatici. Evita tabelle complesse, intestazioni e pie di pagina, e grafici che non vengono letti dai sistemi ATS.

### 4. Includere informazioni obsolete o irrilevanti

Le esperienze risalenti a piu di 15 anni fa o non correlate al ruolo di ${lower} appesantiscono il tuo CV. Concentrati sugli ultimi 10 anni e sulle esperienze direttamente pertinenti alla posizione desiderata.

### 5. Dimenticare le parole chiave specifiche del settore

Ogni settore ha il suo gergo professionale. Per una posizione di ${lower}, l'assenza di termini tecnici specifici come ${topSkills || 'competenze del settore'} puo segnalare una mancanza di expertise agli occhi del selezionatore.

## Ottimizzazione ATS per Curriculum Vitae da ${jobTitle}

I sistemi di tracciamento delle candidature (ATS) filtrano i CV prima che un selezionatore li esamini. Per massimizzare le tue possibilita come ${lower}:

- **Riprendi le parole chiave esatte dell'annuncio di lavoro** — Se l'annuncio menziona "${skills[0] || 'competenza specifica'}", utilizza questa formulazione esatta nel tuo CV
- **Usa un formato semplice e leggibile** — Evita colonne multiple, tabelle e caselle di testo che disturbano i parser ATS
- **Colloca le competenze chiave in piu sezioni** — Menziona ${topSkills || 'le tue competenze principali'} nel profilo professionale, nell'esperienza E nella sezione competenze
- **Privilegia il formato PDF o DOCX** — Sono i formati meglio supportati dai sistemi ATS moderni
- **Includi sia gli acronimi che i termini completi** — Scrivi ad esempio "Gestione delle Relazioni con i Clienti (CRM)" per coprire entrambe le varianti di ricerca
- **Evita intestazioni e pie di pagina** — Alcuni ATS non leggono il contenuto posizionato in queste aree

## Risorse Utili

Consulta queste risorse per perfezionare la tua candidatura come ${lower}:

- [Verifica la compatibilita ATS del tuo CV](/it/tools/ats-checker) — Testa gratuitamente il tuo curriculum vitae con il nostro strumento di analisi ATS
- [Esempi di curriculum vitae professionali](/it/resume-examples) — Sfoglia centinaia di modelli per settore di attivita
- [Modelli di CV compatibili ATS](/it/templates) — Scegli tra i nostri modelli ottimizzati per superare i filtri automatici

Pronto a creare un curriculum vitae da ${lower} professionale e compatibile ATS? Utilizza il nostro [creatore di curriculum vitae gratis](/it/builder) per realizzare un CV efficace in pochi minuti. I nostri modelli sono ottimizzati per i sistemi ATS e ti guidano passo dopo passo nella redazione di ogni sezione.
`;
}
