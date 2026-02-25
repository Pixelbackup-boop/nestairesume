/**
 * French (fr) locale data for resume example generation.
 * Imported by generate-locale-resume-examples.mjs via:
 *   await import('./locale-data/resume-fr.mjs')
 */

const LANG = 'fr';

// ─── CONFIG ─────────────────────────────────────────────────────────────────

export const CONFIG = {
  author: 'Marie Dupont',
  authorBio: 'Specialiste en developpement de carriere et redaction de CV avec plus de 10 ans d\'experience aidant les professionnels francophones a decrocher leur emploi ideal.',
  titlePattern: (job) => `CV de ${job} : Exemples, Modeles et Guide de Redaction 2026`,
  descriptionPattern: (job) => `Exemple de CV de ${job.toLowerCase()} avec modeles compatibles ATS et conseils d'experts. Format professionnel et exemples pour decrocher des entretiens en 2026.`,
  imageAltPattern: (job) => `Exemple de CV de ${job}`,
};

// ─── JOB TITLES (English → French) ─────────────────────────────────────────

export const JOB_TITLES = {
  '3D Artist': 'Artiste 3D',
  'AI Engineer': 'Ingenieur IA',
  'AWS Cloud Engineer': 'Ingenieur Cloud AWS',
  'AWS Solution Architect': 'Architecte de Solutions AWS',
  'Academic Advisor': 'Conseiller Pedagogique',
  'Account Executive': 'Responsable de Comptes',
  'Account Manager': 'Gestionnaire de Comptes',
  'Accountant': 'Comptable',
  'Accounting Assistant': 'Assistant Comptable',
  'Accounting Clerk': 'Commis Comptable',
  'Accounting Intern': 'Stagiaire en Comptabilite',
  'Accounts Payable Specialist': 'Specialiste Comptes Fournisseurs',
  'Accounts Receivable Specialist': 'Specialiste Comptes Clients',
  'Administrative Assistant': 'Assistant Administratif',
  'Android Developer': 'Developpeur Android',
  'Animal Control Officer': 'Agent de Controle Animalier',
  'Animal Shelter Worker': 'Agent de Refuge Animalier',
  'Animator': 'Animateur',
  'Appliance Repair Technician': 'Technicien de Reparation d\'Electromenagers',
  'Aquarium Keeper': 'Aquariologiste',
  'Arbitrator': 'Arbitre',
  'Architect': 'Architecte',
  'Art Director': 'Directeur Artistique',
  'Assistant Director': 'Directeur Adjoint',
  'Assistant Manager': 'Manager Adjoint',
  'Assistant Property Manager': 'Gestionnaire Immobilier Adjoint',
  'Assistant Store Manager': 'Directeur Adjoint de Magasin',
  'Athletic Trainer': 'Preparateur Physique',
  'Audio Engineer': 'Ingenieur du Son',
  'Auditor': 'Auditeur',
  'Auto Mechanic': 'Mecanicien Automobile',
  'Automation Engineer': 'Ingenieur en Automatisation',
  'Automotive Technician': 'Technicien Automobile',
  'Backend Developer': 'Developpeur Backend',
  'Baker': 'Boulanger',
  'Bank Manager': 'Directeur de Banque',
  'Bank Teller': 'Guichetier de Banque',
  'Banquet Chef': 'Chef de Banquet',
  'Barista': 'Barista',
  'Bartender': 'Barman',
  'Bellhop': 'Groom',
  'Billing Specialist': 'Specialiste de Facturation',
  'Blockchain Developer': 'Developpeur Blockchain',
  'Branch Manager': 'Directeur d\'Agence',
  'Brand Designer': 'Designer de Marque',
  'Budget Analyst': 'Analyste Budgetaire',
  'Building Inspector': 'Inspecteur en Batiment',
  'Building Maintenance Technician': 'Technicien de Maintenance Immobiliere',
  'Bus Driver': 'Conducteur de Bus',
  'Business Administration Professional': 'Professionnel en Administration des Affaires',
  'Business Analyst': 'Analyste d\'Affaires',
  'Business Consultant': 'Consultant en Affaires',
  'Business Development Executive': 'Cadre en Developpement Commercial',
  'Business Development Manager': 'Responsable Developpement Commercial',
  'Business Intelligence Analyst': 'Analyste en Intelligence d\'Affaires',
  'Business Intelligence Specialist': 'Specialiste en Intelligence d\'Affaires',
  'Business Manager': 'Responsable d\'Affaires',
  'Business Owner': 'Chef d\'Entreprise',
  'Busser': 'Commis de Salle',
  'CNC Machinist': 'Usineur CNC',
  'CNC Operator': 'Operateur CNC',
  'Cabin Crew': 'Equipage de Cabine',
  'Cabinet Maker': 'Ebeniste',
  'Cafeteria Worker': 'Employe de Cafeteria',
  'Call Center Agent': 'Agent de Centre d\'Appels',
  'Call Center Representative': 'Representant de Centre d\'Appels',
  'Car Sales Associate': 'Vendeur Automobile',
  'Caregiver': 'Aide-soignant',
  'Carpenter': 'Charpentier',
  'Carpet Cleaner': 'Nettoyeur de Tapis',
  'Case Manager': 'Gestionnaire de Cas',
  'Cashier': 'Caissier',
  'Casino Dealer': 'Croupier',
  'Caterer': 'Traiteur',
  'Catering Manager': 'Responsable de Traiteur',
  'Certified Nursing Assistant': 'Aide-soignant Certifie',
  'Certified Nursing Assistant (CNA)': 'Aide-soignant Certifie (CNA)',
  'Change Management Specialist': 'Specialiste en Gestion du Changement',
  'Chef': 'Chef Cuisinier',
  'Chemical Engineer': 'Ingenieur Chimiste',
  'Chemist': 'Chimiste',
  'Chief Information Officer (CIO)': 'Directeur des Systemes d\'Information (DSI)',
  'Chief of Staff': 'Directeur de Cabinet',
  'Chiropractor': 'Chiropraticien',
  'City Planner': 'Urbaniste',
  'Civil Engineer': 'Ingenieur Civil',
  'Claims Adjuster': 'Expert en Sinistres',
  'Client Relations Manager': 'Responsable de la Relation Client',
  'Clinical Research Associate': 'Associe de Recherche Clinique',
  'Clinical Research Coordinator': 'Coordinateur de Recherche Clinique',
  'Cloud Architect': 'Architecte Cloud',
  'Cloud Engineer': 'Ingenieur Cloud',
  'Code Enforcement Officer': 'Agent de Conformite Reglementaire',
  'College Admissions Counselor': 'Conseiller en Admissions Universitaires',
  'College Professor': 'Professeur d\'Universite',
  'Commercial Cleaner': 'Agent d\'Entretien Commercial',
  'Commercial Real Estate Broker': 'Courtier Immobilier Commercial',
  'Community Manager': 'Community Manager',
  'Community Outreach Coordinator': 'Coordinateur de Relations Communautaires',
  'Complaints Handler': 'Gestionnaire de Reclamations',
  'Compliance Officer': 'Responsable de la Conformite',
  'Computer Operator': 'Operateur Informatique',
  'Computer Science Professional': 'Professionnel en Informatique',
  'Computer Technician': 'Technicien Informatique',
  'Concierge': 'Concierge',
  'Concrete Finisher': 'Finisseur de Beton',
  'Construction Manager': 'Responsable de Chantier',
  'Construction Superintendent': 'Directeur de Chantier',
  'Construction Worker': 'Ouvrier du Batiment',
  'Consultant': 'Consultant',
  'Content Creator': 'Createur de Contenu',
  'Content Writer': 'Redacteur de Contenu',
  'Contract Specialist': 'Specialiste des Contrats',
  'Contracts Specialist': 'Specialiste des Contrats',
  'Controller': 'Controleur de Gestion',
  'Copywriter': 'Redacteur Publicitaire',
  'Corporate Security Manager': 'Responsable de la Securite d\'Entreprise',
  'Correctional Officer': 'Agent Penitentiaire',
  'Court Clerk': 'Greffier',
  'Court Reporter': 'Stenographe Judiciaire',
  'Creative Director': 'Directeur de la Creation',
  'Crisis Counselor': 'Conseiller de Crise',
  'Cruise Ship Worker': 'Employe de Navire de Croisiere',
  'Curriculum Developer': 'Concepteur de Programmes Scolaires',
  'Customer Experience Specialist': 'Specialiste de l\'Experience Client',
  'Customer Service Representative': 'Representant du Service Client',
  'Customer Success Manager': 'Responsable de la Reussite Client',
  'Customer Success Specialist': 'Specialiste de la Reussite Client',
  'Customer Support Specialist': 'Specialiste du Support Client',
  'Customs Officer': 'Agent des Douanes',
  'Cybersecurity Analyst': 'Analyste en Cybersecurite',
  'Data Analyst': 'Analyste de Donnees',
  'Data Architect': 'Architecte de Donnees',
  'Data Engineer': 'Ingenieur de Donnees',
  'Data Entry Clerk': 'Agent de Saisie de Donnees',
  'Data Entry Operator': 'Operateur de Saisie de Donnees',
  'Data Entry Specialist': 'Specialiste de Saisie de Donnees',
  'Data Scientist': 'Scientifique des Donnees',
  'Database Administrator': 'Administrateur de Bases de Donnees',
  'Delivery Driver': 'Chauffeur-livreur',
  'Dental Assistant': 'Assistant Dentaire',
  'Dental Hygienist': 'Hygieniste Dentaire',
  'Dental Office Manager': 'Responsable de Cabinet Dentaire',
  'Dentist': 'Dentiste',
  'Design Engineer': 'Ingenieur de Conception',
  'Desktop Support Engineer': 'Ingenieur Support Informatique',
  'Desktop Support Technician': 'Technicien Support Informatique',
  'DevOps Engineer': 'Ingenieur DevOps',
  'Dialysis Technician': 'Technicien en Dialyse',
  'Diesel Mechanic': 'Mecanicien Diesel',
  'Dietary Aide': 'Aide Dietetique',
  'Dietitian': 'Dieteticien',
  'Digital Marketer': 'Specialiste en Marketing Digital',
  'Digital Marketing Manager': 'Responsable Marketing Digital',
  'Digital Marketing Specialist': 'Specialiste Marketing Digital',
  'Dishwasher': 'Plongeur',
  'Dispatcher': 'Dispatcheur',
  'District Manager': 'Directeur de District',
  'Doctor': 'Medecin',
  'Dog Trainer': 'Educateur Canin',
  'Driver': 'Chauffeur',
  'Drywall Installer': 'Poseur de Plaques de Platre',
  'EMT': 'Ambulancier',
  'ESL Teacher': 'Professeur de FLE',
  'Editor': 'Redacteur en Chef',
  'Education Consultant': 'Consultant en Education',
  'Educational Technologist': 'Technologue en Education',
  'Electrical Engineer': 'Ingenieur Electrique',
  'Electrical Technician': 'Technicien Electrique',
  'Electrician': 'Electricien',
  'Elementary Teacher': 'Professeur des Ecoles',
  'Elevator Technician': 'Technicien d\'Ascenseurs',
  'Embedded Systems Engineer': 'Ingenieur Systemes Embarques',
  'Emergency Management Coordinator': 'Coordinateur de Gestion des Urgences',
  'Engineering Manager': 'Responsable Ingenierie',
  'Environmental Compliance Officer': 'Responsable de la Conformite Environnementale',
  'Epidemiologist': 'Epidemiologiste',
  'Escrow Officer': 'Agent de Sequestre',
  'Ethical Hacker': 'Hacker Ethique',
  'Event Coordinator': 'Coordinateur d\'Evenements',
  'Event Manager': 'Responsable Evenementiel',
  'Event Planner': 'Organisateur d\'Evenements',
  'Executive Assistant': 'Assistant de Direction',
  'Executive Chef': 'Chef Executif',
  'Executive Director': 'Directeur General',
  'Family Services Worker': 'Travailleur des Services Familiaux',
  'Fashion Designer': 'Styliste de Mode',
  'Fast Food Worker': 'Employe de Restauration Rapide',
  'Fence Installer': 'Installateur de Clotures',
  'Finance Manager': 'Responsable Financier',
  'Financial Analyst': 'Analyste Financier',
  'Firefighter': 'Pompier',
  'Fitness Center Manager': 'Directeur de Centre de Fitness',
  'Fitness Instructor': 'Moniteur de Fitness',
  'Fitness Trainer': 'Coach de Fitness',
  'Flight Attendant': 'Hotesse de l\'Air / Steward',
  'Floor Installer': 'Poseur de Sols',
  'Florist': 'Fleuriste',
  'Food Expeditor': 'Expediteur en Cuisine',
  'Food Runner': 'Commis de Salle',
  'Food Safety Manager': 'Responsable Securite Alimentaire',
  'Food Scientist': 'Scientifique Alimentaire',
  'Food Server': 'Serveur',
  'Food Service Director': 'Directeur de la Restauration',
  'Food Service Manager': 'Responsable de la Restauration',
  'Food Service Worker': 'Employe de Restauration',
  'Food Stylist': 'Styliste Culinaire',
  'Food Truck Operator': 'Exploitant de Food Truck',
  'Freelance Writer': 'Redacteur Freelance',
  'Freight Broker': 'Courtier en Transport de Marchandises',
  'Front Desk Agent': 'Agent de Reception',
  'Front Desk Receptionist': 'Receptionniste',
  'Front End Developer': 'Developpeur Front-end',
  'Full Stack Developer': 'Developpeur Full Stack',
  'Game Designer': 'Concepteur de Jeux Video',
  'Game Developer': 'Developpeur de Jeux Video',
  'Glazier': 'Vitrier',
  'Go Developer': 'Developpeur Go',
  'Grants Manager': 'Gestionnaire de Subventions',
  'Graphic Designer': 'Graphiste',
  'Group Fitness Instructor': 'Moniteur de Fitness en Groupe',
  'Gym Trainer': 'Coach en Salle de Sport',
  'HR Assistant': 'Assistant RH',
  'HR Business Partner': 'Partenaire d\'Affaires RH',
  'HR Coordinator': 'Coordinateur RH',
  'HR Director': 'Directeur des Ressources Humaines',
  'HR Executive': 'Cadre RH',
  'HR Manager': 'Responsable des Ressources Humaines',
  'HR Recruiter': 'Recruteur RH',
  'HVAC Technician': 'Technicien CVC',
  'Head Cook': 'Chef de Cuisine',
  'Health Coach': 'Coach en Sante',
  'Health Inspector': 'Inspecteur Sanitaire',
  'Heavy Equipment Operator': 'Operateur d\'Engins Lourds',
  'Help Desk Technician': 'Technicien Help Desk',
  'High School Teacher': 'Professeur de Lycee',
  'Home Health Aide': 'Aide a Domicile',
  'Home Inspector': 'Inspecteur Immobilier',
  'Hospice Nurse': 'Infirmier en Soins Palliatifs',
  'Hospital Housekeeper': 'Agent d\'Entretien Hospitalier',
  'Hotel Front Desk Agent': 'Receptionniste d\'Hotel',
  'Hotel Manager': 'Directeur d\'Hotel',
  'House Cleaner': 'Agent d\'Entretien a Domicile',
  'Housekeeper': 'Gouvernante',
  'Housekeeping Supervisor': 'Superviseur d\'Entretien',
  'IT Director': 'Directeur Informatique',
  'IT Manager': 'Responsable Informatique',
  'IT Recruiter': 'Recruteur IT',
  'IT Specialist': 'Specialiste Informatique',
  'IT Support Specialist': 'Specialiste Support Informatique',
  'IT Support Technician': 'Technicien Support Informatique',
  'IT Technician': 'Technicien Informatique',
  'Illustrator': 'Illustrateur',
  'Industrial Engineer': 'Ingenieur Industriel',
  'Industrial Maintenance Technician': 'Technicien de Maintenance Industrielle',
  'Information Security Analyst': 'Analyste en Securite de l\'Information',
  'Inside Sales Representative': 'Representant Commercial Sedentaire',
  'Instructional Coach': 'Coach Pedagogique',
  'Instructional Designer': 'Concepteur Pedagogique',
  'Insulation Worker': 'Calorifugeur',
  'Insurance Agent': 'Agent d\'Assurance',
  'Interior Designer': 'Architecte d\'Interieur',
  'Intern': 'Stagiaire',
  'Iron Worker': 'Ferrailleur',
  'Ironworker': 'Ferrailleur',
  'Janitor': 'Agent d\'Entretien',
  'Java Full Stack Developer': 'Developpeur Full Stack Java',
  'JavaScript Developer': 'Developpeur JavaScript',
  'Junior Developer': 'Developpeur Junior',
  'Kitchen Helper': 'Aide de Cuisine',
  'Kitchen Manager': 'Responsable de Cuisine',
  'Lab Assistant': 'Assistant de Laboratoire',
  'Lab Technician': 'Technicien de Laboratoire',
  'Landscaper': 'Paysagiste',
  'Leasing Consultant': 'Conseiller en Location',
  'Legal Analyst': 'Analyste Juridique',
  'Legal Assistant': 'Assistant Juridique',
  'Legal Secretary': 'Secretaire Juridique',
  'Legislative Aide': 'Assistant Parlementaire',
  'Librarian': 'Bibliothecaire',
  'Library Assistant': 'Assistant de Bibliotheque',
  'Licensed Practical Nurse (LPN)': 'Infirmier Praticien Autorise (LPN)',
  'Limousine Driver': 'Chauffeur de Limousine',
  'Line Cook': 'Cuisinier de Ligne',
  'Litigation Support Specialist': 'Specialiste de Support au Contentieux',
  'Loan Officer': 'Agent de Credit',
  'Loan Processor': 'Gestionnaire de Prets',
  'Locksmith': 'Serrurier',
  'Logistics Coordinator': 'Coordinateur Logistique',
  'Logistics Manager': 'Responsable Logistique',
  'Logistics Specialist': 'Specialiste Logistique',
  'Long Haul Truck Driver': 'Chauffeur Routier Longue Distance',
  'Loss Prevention Specialist': 'Specialiste en Prevention des Pertes',
  'MRI Technologist': 'Technicien IRM',
  'Machine Learning Engineer': 'Ingenieur en Apprentissage Automatique',
  'Machine Learning Specialist': 'Specialiste en Apprentissage Automatique',
  'Machine Operator': 'Operateur de Machine',
  'Maintenance Engineer': 'Ingenieur de Maintenance',
  'Maintenance Manager': 'Responsable de Maintenance',
  'Maintenance Technician': 'Technicien de Maintenance',
  'Makeup Artist': 'Maquilleur',
  'Management Consultant': 'Consultant en Management',
  'Manufacturing Engineer': 'Ingenieur de Production',
  'Manufacturing Worker': 'Ouvrier de Production',
  'Marketing Analyst': 'Analyste Marketing',
  'Marketing Assistant': 'Assistant Marketing',
  'Marketing Coordinator': 'Coordinateur Marketing',
  'Marketing Director': 'Directeur Marketing',
  'Marketing Executive': 'Cadre Marketing',
  'Marketing Intern': 'Stagiaire Marketing',
  'Marketing Manager': 'Responsable Marketing',
  'Marketing Specialist': 'Specialiste Marketing',
  'Mason': 'Macon',
  'Massage Therapist': 'Massotherapeute',
  'Material Handler': 'Manutentionnaire',
  'Mechanical Design Engineer': 'Ingenieur en Conception Mecanique',
  'Mechanical Engineer': 'Ingenieur Mecanique',
  'Mechanical Technician': 'Technicien Mecanique',
  'Mediator': 'Mediateur',
  'Medical Assistant': 'Assistant Medical',
  'Medical Billing Specialist': 'Specialiste de Facturation Medicale',
  'Medical Coder': 'Codeur Medical',
  'Medical Office Assistant': 'Assistant de Cabinet Medical',
  'Medical Receptionist': 'Receptionniste Medicale',
  'Medical Representative': 'Delegue Medical',
  'Medical Scribe': 'Scribe Medical',
  'Medical Technologist': 'Technologue Medical',
  'Mental Health Counselor': 'Conseiller en Sante Mentale',
  'Millwright': 'Mecanicien-monteur',
  'Mobile Developer': 'Developpeur Mobile',
  'Mortgage Loan Officer': 'Agent de Pret Hypothecaire',
  'Motion Graphics Designer': 'Designer en Motion Design',
  'Moving Company Driver': 'Chauffeur de Demenagement',
  'Music Producer': 'Producteur Musical',
  'Nanny': 'Nounou',
  'Network Administrator': 'Administrateur Reseau',
  'Network Engineer': 'Ingenieur Reseau',
  'Night Auditor': 'Auditeur de Nuit',
  'Node.js Developer': 'Developpeur Node.js',
  'Nurse Practitioner': 'Infirmier Praticien',
  'Nursing Assistant': 'Aide-soignant',
  'Nutritionist': 'Nutritionniste',
  'Occupational Therapist': 'Ergotherapeute',
  'Occupational Therapy Assistant': 'Assistant en Ergotherapie',
  'Office Administrator': 'Administrateur de Bureau',
  'Office Assistant': 'Assistant de Bureau',
  'Office Clerk': 'Employe de Bureau',
  'Office Manager': 'Responsable de Bureau',
  'Operations Analyst': 'Analyste des Operations',
  'Operations Manager': 'Responsable des Operations',
  'Optician': 'Opticien',
  'Optometrist': 'Optometriste',
  'Painter': 'Peintre',
  'Paralegal': 'Paralegal',
  'Paramedic': 'Paramedicale',
  'Park Ranger': 'Garde Forestier',
  'Pastry Chef': 'Chef Patissier',
  'Payroll Specialist': 'Specialiste de la Paie',
  'Penetration Tester': 'Testeur d\'Intrusion',
  'Personal Trainer': 'Coach Personnel',
  'Pest Control Technician': 'Technicien de Desinsectisation',
  'Pet Groomer': 'Toiletteur Animalier',
  'Pet Sitter': 'Gardien d\'Animaux',
  'Pharmacist': 'Pharmacien',
  'Pharmacy Assistant': 'Assistant en Pharmacie',
  'Pharmacy Tech': 'Technicien en Pharmacie',
  'Pharmacy Technician': 'Preparateur en Pharmacie',
  'Phlebotomist': 'Phlebotomiste',
  'Photographer': 'Photographe',
  'Physical Therapist': 'Kinesitherapeute',
  'Physical Therapy Assistant': 'Assistant en Kinesitherapie',
  'Physician Assistant': 'Assistant Medical',
  'Pilates Instructor': 'Professeur de Pilates',
  'Pizza Maker': 'Pizzaiolo',
  'Platform Engineer': 'Ingenieur Plateforme',
  'Plumber': 'Plombier',
  'Police Officer': 'Policier',
  'Policy Analyst': 'Analyste de Politiques Publiques',
  'Pool Cleaner': 'Technicien de Piscine',
  'Pool Technician': 'Technicien de Piscine',
  'Postal Worker': 'Facteur',
  'Power BI Developer': 'Developpeur Power BI',
  'Prep Cook': 'Commis de Cuisine',
  'Preschool Teacher': 'Educateur de Jeunes Enfants',
  'Pressure Washer': 'Technicien de Nettoyage Haute Pression',
  'Probation Officer': 'Agent de Probation',
  'Process Engineer': 'Ingenieur Procedes',
  'Procurement Manager': 'Responsable des Achats',
  'Procurement Specialist': 'Specialiste des Achats',
  'Product Analyst': 'Analyste Produit',
  'Product Designer': 'Designer Produit',
  'Product Manager': 'Chef de Produit',
  'Product Marketing Manager': 'Responsable Marketing Produit',
  'Product Owner': 'Product Owner',
  'Production Assistant': 'Assistant de Production',
  'Production Engineer': 'Ingenieur de Production',
  'Production Manager': 'Responsable de Production',
  'Production Worker': 'Ouvrier de Production',
  'Program Coordinator': 'Coordinateur de Programmes',
  'Project Coordinator': 'Coordinateur de Projets',
  'Project Engineer': 'Ingenieur de Projets',
  'Project Manager': 'Chef de Projet',
  'Prompt Engineer': 'Ingenieur de Prompts',
  'Property Manager': 'Gestionnaire Immobilier',
  'Psychiatrist': 'Psychiatre',
  'Psychologist': 'Psychologue',
  'Public Affairs Specialist': 'Specialiste des Affaires Publiques',
  'Public Health Inspector': 'Inspecteur de Sante Publique',
  'Python Developer': 'Developpeur Python',
  'QA Analyst': 'Analyste QA',
  'QA Engineer': 'Ingenieur QA',
  'QA Manager': 'Responsable QA',
  'QA Tester': 'Testeur QA',
  'Quality Analyst': 'Analyste Qualite',
  'Quality Assurance Specialist': 'Specialiste Assurance Qualite',
  'Quality Control Inspector': 'Inspecteur Controle Qualite',
  'Quality Engineer': 'Ingenieur Qualite',
  'Quality Manager': 'Responsable Qualite',
  'Radiologic Technologist': 'Technicien en Radiologie',
  'React Developer': 'Developpeur React',
  'Reading Specialist': 'Specialiste en Lecture',
  'Real Estate Agent': 'Agent Immobilier',
  'Real Estate Appraiser': 'Expert Immobilier',
  'Real Estate Assistant': 'Assistant Immobilier',
  'Real Estate Attorney': 'Avocat Immobilier',
  'Real Estate Investor': 'Investisseur Immobilier',
  'Receptionist': 'Receptionniste',
  'Recreation Coordinator': 'Coordinateur de Loisirs',
  'Recruiter': 'Recruteur',
  'Recruiting Coordinator': 'Coordinateur de Recrutement',
  'Registered Nurse': 'Infirmier Diplome d\'Etat',
  'Release Engineer': 'Ingenieur de Deploiement',
  'Research Analyst': 'Analyste de Recherche',
  'Research Assistant': 'Assistant de Recherche',
  'Reservation Agent': 'Agent de Reservation',
  'Resident Assistant': 'Assistant de Residence',
  'Residential Cleaner': 'Agent d\'Entretien Residentiel',
  'Respiratory Therapist': 'Therapeute Respiratoire',
  'Restaurant Manager': 'Directeur de Restaurant',
  'Retail Assistant': 'Vendeur',
  'Retail Associate': 'Employe de Commerce',
  'Retail Manager': 'Responsable de Magasin',
  'Retail Sales Associate': 'Vendeur en Magasin',
  'Retail Store Manager': 'Directeur de Magasin',
  'Risk Management Specialist': 'Specialiste en Gestion des Risques',
  'Roofer': 'Couvreur',
  'Rust Developer': 'Developpeur Rust',
  'SAP Consultant': 'Consultant SAP',
  'SOC Analyst': 'Analyste SOC',
  'Sales Assistant': 'Assistant Commercial',
  'Sales Associate': 'Vendeur',
  'Sales Consultant': 'Consultant Commercial',
  'Sales Coordinator': 'Coordinateur Commercial',
  'Sales Director': 'Directeur Commercial',
  'Sales Engineer': 'Ingenieur Commercial',
  'Sales Executive': 'Cadre Commercial',
  'Sales Manager': 'Responsable des Ventes',
  'Sales Representative': 'Representant Commercial',
  'Salesforce Administrator': 'Administrateur Salesforce',
  'School Administrator': 'Administrateur Scolaire',
  'School Counselor': 'Conseiller d\'Orientation',
  'Scrum Master': 'Scrum Master',
  'Seaman': 'Marin',
  'Security Analyst': 'Analyste en Securite',
  'Security Engineer': 'Ingenieur en Securite',
  'Security Guard': 'Agent de Securite',
  'Security Officer': 'Agent de Securite',
  'Server': 'Serveur',
  'Service Advisor': 'Conseiller Service',
  'Service Crew': 'Equipier de Service',
  'Set Designer': 'Scenographe',
  'Sheet Metal Worker': 'Tolier',
  'Shipping & Receiving Clerk': 'Agent d\'Expedition et de Reception',
  'Site Engineer': 'Ingenieur de Chantier',
  'Site Reliability Engineer': 'Ingenieur de Fiabilite de Site',
  'Small Business Owner': 'Proprietaire de Petite Entreprise',
  'Social Media Coordinator': 'Coordinateur des Reseaux Sociaux',
  'Social Media Manager': 'Responsable des Reseaux Sociaux',
  'Social Media Specialist': 'Specialiste des Reseaux Sociaux',
  'Social Worker': 'Travailleur Social',
  'Software Architect': 'Architecte Logiciel',
  'Software Developer': 'Developpeur Logiciel',
  'Software Engineer': 'Ingenieur Logiciel',
  'Software Tester': 'Testeur Logiciel',
  'Solar Installer': 'Installateur de Panneaux Solaires',
  'Solution Architect': 'Architecte de Solutions',
  'Solutions Engineer': 'Ingenieur de Solutions',
  'Sommelier': 'Sommelier',
  'Sous Chef': 'Sous-chef',
  'Spa Manager': 'Directeur de Spa',
  'Special Education Teacher': 'Enseignant Specialise',
  'Speech-Language Pathologist': 'Orthophoniste',
  'Sports Coach': 'Entraineur Sportif',
  'Stage Manager': 'Regisseur',
  'Sterile Processing Technician': 'Technicien de Sterilisation',
  'Store Associate': 'Employe de Magasin',
  'Store Manager': 'Directeur de Magasin',
  'Storyboard Artist': 'Storyboardeur',
  'Substance Abuse Counselor': 'Conseiller en Addictologie',
  'Supply Chain Analyst': 'Analyste de la Chaine d\'Approvisionnement',
  'Supply Chain Manager': 'Responsable de la Chaine d\'Approvisionnement',
  'Support Worker': 'Agent de Support',
  'Surgical Technologist': 'Technicien Chirurgical',
  'Sushi Chef': 'Chef Sushi',
  'System Administrator': 'Administrateur Systeme',
  'System Analyst': 'Analyste Systeme',
  'System Engineer': 'Ingenieur Systeme',
  'TSA Agent': 'Agent de Surete Aeroportuaire',
  'Talent Acquisition Specialist': 'Specialiste en Acquisition de Talents',
  'Teacher': 'Enseignant',
  'Teaching Assistant': 'Assistant d\'Enseignement',
  'Team Leader': 'Chef d\'Equipe',
  'Tech Sales Representative': 'Representant Commercial Tech',
  'Technical Program Manager': 'Responsable Programme Technique',
  'Technical Recruiter': 'Recruteur Technique',
  'Technical Support Specialist': 'Specialiste du Support Technique',
  'Technical Writer': 'Redacteur Technique',
  'Therapist': 'Therapeute',
  'Title Examiner': 'Examinateur de Titres',
  'Tour Guide': 'Guide Touristique',
  'Travel Agent': 'Agent de Voyage',
  'Truck Driver': 'Chauffeur Routier',
  'Tutor': 'Tuteur',
  'UI Designer': 'Designer UI',
  'UX Designer': 'Designer UX',
  'UX Researcher': 'Chercheur UX',
  'Ultrasound Technician': 'Technicien en Echographie',
  'Valet Attendant': 'Voiturier',
  'Veterans Service Officer': 'Agent des Services aux Veterans',
  'Veterinary Assistant': 'Assistant Veterinaire',
  'Veterinary Technician': 'Technicien Veterinaire',
  'Video Editor': 'Monteur Video',
  'Videographer': 'Videographe',
  'Virtual Assistant': 'Assistant Virtuel',
  'Voice Actor': 'Acteur Vocal',
  'Waiter/Waitress': 'Serveur/Serveuse',
  'Warehouse Associate': 'Agent d\'Entrepot',
  'Warehouse Manager': 'Responsable d\'Entrepot',
  'Warehouse Worker': 'Magasinier',
  'Web Designer': 'Web Designer',
  'Web Developer': 'Developpeur Web',
  'Welder': 'Soudeur',
  'Wellness Coach': 'Coach Bien-etre',
  'Wildlife Biologist': 'Biologiste de la Faune Sauvage',
  'Wind Turbine Technician': 'Technicien Eolien',
  'Window Cleaner': 'Laveur de Vitres',
  'X-Ray Technician': 'Technicien en Radiographie',
  'Yoga Instructor': 'Professeur de Yoga',
  'Youth Counselor': 'Educateur de Jeunesse',
  'Zookeeper': 'Soigneur Animalier',
  'iOS Developer': 'Developpeur iOS',
};

// ─── CATEGORIES (English → French) ──────────────────────────────────────────

export const CATEGORIES = {
  Technology: 'Technologie',
  Healthcare: 'Sante',
  Trades: 'Metiers Manuels',
  Hospitality: 'Hotellerie',
  'Food Service': 'Restauration',
  Creative: 'Creatif',
  Education: 'Education',
  Government: 'Fonction Publique',
  Finance: 'Finance',
  Marketing: 'Marketing',
  Business: 'Affaires',
  Engineering: 'Ingenierie',
  Sales: 'Ventes',
  Legal: 'Juridique',
  'Real Estate': 'Immobilier',
  HR: 'Ressources Humaines',
  Fitness: 'Fitness',
  Management: 'Gestion',
  'Animal Care': 'Soins Animaliers',
  Logistics: 'Logistique',
  'Customer Service': 'Service Client',
  Administrative: 'Administratif',
  Transportation: 'Transport',
  Retail: 'Commerce de Detail',
  Cleaning: 'Entretien',
  'Social Services': 'Services Sociaux',
  Manufacturing: 'Industrie',
  Construction: 'Construction',
  Security: 'Securite',
  Science: 'Sciences',
  Events: 'Evenementiel',
  'Writing & Content': 'Redaction et Contenu',
  'Supply Chain': 'Chaine d\'Approvisionnement',
  Research: 'Recherche',
  Insurance: 'Assurance',
  Consulting: 'Conseil',
  Aviation: 'Aviation',
  Automotive: 'Automobile',
  Media: 'Medias',
  Maritime: 'Maritime',
  'Law Enforcement': 'Forces de l\'Ordre',
  'Entry-Level': 'Debutant',
  Entertainment: 'Divertissement',
  Childcare: 'Petite Enfance',
  Beauty: 'Beaute',
  Architecture: 'Architecture',
};

// ─── HELPERS ────────────────────────────────────────────────────────────────

function normalizeCategory(category) {
  const c = category.toLowerCase();
  // Check hospitality/hotel before tech (since 'hospitality' contains 'it')
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
  Technology: (job) => `Un CV de ${job} efficace va bien au-dela d'une simple liste de technologies maitrisees. Il demontre une capacite a resoudre des problemes concrets, quantifie l'impact de votre travail et met en avant votre comprehension des enjeux techniques du poste vise.`,
  Healthcare: (job) => `Les recruteurs dans le secteur de la sante recherchent des candidats capables de demontrer a la fois des competences cliniques solides et un engagement sincere envers le bien-etre des patients. Votre CV de ${job} doit equilibrer maitrise technique et qualites humaines.`,
  Finance: (job) => `Les recruteurs en finance privilegient les candidats capables de transformer des donnees complexes en decisions strategiques. Votre CV de ${job} doit demontrer rigueur analytique, attention aux details et bon jugement dans les questions financieres.`,
  Education: (job) => `Les responsables du recrutement dans l'education recherchent des professionnels capables d'inspirer l'apprentissage et de s'adapter aux besoins varies des apprenants. Votre CV de ${job} doit refleter votre expertise pedagogique et votre engagement pour la reussite des eleves.`,
  'Food Service': (job) => `Les responsables de recrutement en restauration recherchent la fiabilite, l'esprit d'equipe et la passion du metier. Votre CV de ${job} doit mettre en valeur vos competences techniques culinaires et votre capacite a performer sous pression.`,
  Hospitality: (job) => `Le secteur de l'hotellerie valorise la chaleur humaine, le souci du detail et l'elegance sous pression. Votre CV de ${job} doit refleter votre orientation service et votre capacite a creer des experiences memorables pour les clients.`,
  Trades: (job) => `Les employeurs valorisent les professionnels qualifies capables de travailler de maniere autonome et de livrer un travail de qualite. Votre CV de ${job} doit mettre en avant votre experience pratique, votre conscience de la securite et votre aptitude a resoudre les problemes sur le terrain.`,
  Creative: (job) => `Les meilleurs professionnels creatifs allient excellence artistique et comprehension des besoins du client. Votre CV de ${job} doit mettre en valeur votre vision creative tout en demontrant votre sens commercial et votre capacite a livrer des projets dans les delais.`,
  Administrative: (job) => `Les employeurs recherchent des candidats capables d'anticiper les besoins, de resoudre les problemes de maniere proactive et de maintenir la confidentialite. Un CV de ${job} efficace demontre une excellence organisationnelle et une capacite a assurer le bon fonctionnement des operations.`,
  Sales: (job) => `Votre CV est votre premiere demonstration commerciale, et les responsables du recrutement l'evaluent en tant que telle. L'approche la plus efficace pour un CV de ${job} consiste a montrer que vous comprenez les defis commerciaux de l'entreprise et que vous pouvez contribuer a ses objectifs de chiffre d'affaires.`,
  Marketing: (job) => `Le marketing evolue rapidement et les recruteurs cherchent des candidats qui maitrisent a la fois la strategie et l'execution. Votre CV de ${job} doit demontrer votre capacite a generer des resultats mesurables tout en faisant preuve de creativite strategique.`,
  HR: (job) => `A la difference d'autres postes en entreprise, les roles en ressources humaines exigent de demontrer votre capacite a naviguer dans des dynamiques organisationnelles sensibles tout en generant des resultats concrets pour l'entreprise.`,
  'Customer Service': (job) => `Les postes en service client requierent des competences exceptionnelles en communication et une empathie authentique. Votre CV de ${job} doit demontrer votre capacite a resoudre les problemes efficacement tout en maintenant des relations positives avec la clientele.`,
  Retail: (job) => `Les employeurs du commerce de detail valorisent la fiabilite, la connaissance des produits et un enthousiasme sincere pour le service client. Votre CV de ${job} doit mettre en avant vos performances commerciales et votre capacite a prosperer dans un environnement dynamique.`,
  Logistics: (job) => `Les employeurs en logistique privilegient l'efficacite, la precision et la capacite a gerer des operations sensibles aux delais. Votre CV de ${job} doit mettre en avant votre experience en gestion des stocks, planification et optimisation des processus.`,
  Government: (job) => `Les candidatures dans le secteur public exigent une approche differente du secteur prive. Votre CV de ${job} doit repondre directement aux exigences de l'offre tout en demontrant votre engagement pour le service public et l'interet general.`,
  Legal: (job) => `Le secteur juridique exige une precision absolue et une attention meticuleuse aux details. Votre CV de ${job} doit refleter votre rigueur intellectuelle, votre maitrise du cadre reglementaire et votre capacite a gerer des dossiers complexes.`,
  default: (job) => `Un CV de ${job} efficace se concentre sur des realisations concretes qui demontrent votre capacite a generer des resultats des le premier jour. Il combine experience pertinente et enthousiasme sincere pour le poste vise.`,
};

// ─── TAGS GENERATOR ─────────────────────────────────────────────────────────

export function generateTags(jobTitle, slug) {
  const lower = jobTitle.toLowerCase();
  return [
    `cv ${lower}`,
    `cv de ${lower}`,
    `exemple cv ${lower}`,
    `modele cv ${lower}`,
    `cv professionnel`,
    `cv compatible ats`,
    `modele de cv`,
    `rediger un cv`,
  ];
}

// ─── FAQ GENERATOR ──────────────────────────────────────────────────────────

export function generateFAQ(jobTitle) {
  const lower = jobTitle.toLowerCase();
  return [
    {
      question: `Quelles competences mettre en avant dans un CV de ${lower} ?`,
      answer: `Mettez en avant les competences techniques directement liees au poste de ${lower}, ainsi que les competences transversales comme la communication et le travail d'equipe. Utilisez les mots-cles de l'offre d'emploi et appuyez chaque competence par un exemple concret de realisation professionnelle.`,
    },
    {
      question: `Quelle est la longueur ideale d'un CV de ${lower} ?`,
      answer: `Un CV de ${lower} doit tenir sur une page pour les profils debutants et intermediaires, et peut s'etendre a deux pages pour les profils seniors avec plus de 10 ans d'experience. Privilegiez la qualite du contenu a la quantite et assurez-vous que chaque element apporte de la valeur.`,
    },
    {
      question: `Quel format de CV choisir pour un poste de ${lower} ?`,
      answer: `Le format chronologique inverse est le plus recommande pour un CV de ${lower}, car il met en valeur votre progression de carriere. Utilisez un modele professionnel compatible ATS avec des sections claires : coordonnees, resume professionnel, experience, formation et competences.`,
    },
    {
      question: `Quel salaire peut-on attendre en tant que ${lower} ?`,
      answer: `Le salaire d'un ${lower} varie selon l'experience, la localisation et la taille de l'entreprise. Consultez les donnees salariales actualisees sur des sites comme Glassdoor ou PayScale pour obtenir une fourchette realiste dans votre region. Mentionner vos realisations quantifiees dans votre CV renforce votre position lors de la negociation salariale.`,
    },
    {
      question: `Que faut-il inclure dans un CV de ${lower} ?`,
      answer: `Un CV de ${lower} complet doit inclure vos coordonnees, un resume professionnel percutant, votre experience professionnelle avec des realisations chiffrees, votre formation, vos certifications pertinentes et vos competences cles. Adaptez chaque section aux exigences specifiques du poste vise.`,
    },
  ];
}

// ─── BODY GENERATOR ─────────────────────────────────────────────────────────

export function generateBody(jobTitle, category, keySkills, avgSalary, jobGrowth, slug) {
  const lower = jobTitle.toLowerCase();
  const skills = keySkills || [];
  const topSkills = skills.slice(0, 3).join(', ') || 'competences cles';
  const midSkills = skills.slice(3, 6).join(', ') || 'competences complementaires';
  const softSkills = skills.slice(6, 8).join(', ') || 'travail d\'equipe, communication';

  const norm = normalizeCategory(category);
  const opener = (CATEGORY_OPENERS[norm] || CATEGORY_OPENERS.default)(jobTitle);

  const relatedSlug1 = slug.includes('-') ? slug.split('-')[0] : slug;

  return `
## Ce qui Distingue un CV de ${jobTitle}

${opener}

Les recruteurs consacrent en moyenne six a sept secondes a la premiere lecture d'un CV. Pour un poste de ${lower}, cela signifie que vos competences les plus pertinentes et vos realisations majeures doivent etre immediatement visibles. Un CV bien structure ne se contente pas de lister vos experiences : il raconte l'histoire de votre parcours professionnel et demontre la valeur que vous apportez a l'entreprise.

## Exemples de Resume Professionnel

### Debutant

${lower} motive avec une formation solide en ${topSkills || 'competences du domaine'}. Desireux de contribuer a une equipe dynamique et d'appliquer mes connaissances academiques dans un environnement professionnel exigeant. Reconnu pour ma capacite d'apprentissage rapide, mon sens de l'organisation et ma determination a atteindre les objectifs fixes.

### Intermediaire

${jobTitle} avec plus de 5 ans d'experience en ${topSkills}. Resultat prouve dans l'amelioration des processus et la livraison de projets dans les delais et budgets impartis. Expert en ${midSkills || 'competences avancees'}, avec une capacite demontree a encadrer des equipes juniors et a conduire des initiatives d'amelioration continue.

### Senior

${jobTitle} senior avec plus de 10 ans d'experience dans le secteur, reconnu pour son expertise en ${topSkills} et ${midSkills || 'gestion strategique'}. A dirige des equipes pluridisciplinaires de plus de 15 personnes et pilote des projets strategiques ayant genere des economies de plus de 500 000 euros. Competences avancees en ${softSkills || 'leadership et vision strategique'}, avec un historique constant de depassement des objectifs.

## Salaire et Perspectives d'Emploi

Le salaire moyen d'un ${lower} est d'environ **${avgSalary || '$50,000'}** par an, avec des variations significatives selon l'experience, la localisation geographique et le secteur d'activite. Les perspectives de croissance de l'emploi pour ce poste sont de **${jobGrowth || '+5%'}** au cours des prochaines annees.

Les professionnels debutants peuvent s'attendre a un salaire d'entree situe entre 70 % et 80 % du salaire median, tandis que les profils seniors ou specialises peuvent depasser de 40 % a 60 % cette mediane. Les regions metropolitaines et les secteurs a forte demande offrent generalement des remunerations superieures.

**Sources :**
- [Bureau of Labor Statistics (BLS)](https://www.bls.gov/ooh/) — Donnees officielles sur l'emploi et les salaires aux Etats-Unis
- [Glassdoor](https://www.glassdoor.com/Salaries/) — Salaires declares par les employes et fourchettes de remuneration
- [PayScale](https://www.payscale.com/research/US/) — Recherche salariale et comparaisons par poste

*Les remunerations reelles varient en fonction de l'experience, de la localisation, du secteur et de la taille de l'entreprise.*

## Competences Essentielles a Mettre en Avant

### Competences Techniques
${skills.slice(0, 3).map(s => `- **${s}** — Competence fondamentale pour tout ${lower}, directement recherchee par les recruteurs et les systemes ATS`).join('\n') || '- Maitrise des outils et technologies specifiques au poste\n- Connaissance approfondie des methodes et processus du secteur\n- Capacite a utiliser les logiciels professionnels courants'}

### Competences Organisationnelles
${skills.slice(3, 6).map(s => `- **${s}** — Competence valorisee dans l'exercice quotidien du role de ${lower}`).join('\n') || '- Gestion du temps et priorisation des taches\n- Organisation et planification de projets\n- Rigueur dans le suivi des procedures'}

### Competences Relationnelles
${skills.slice(6, 8).map(s => `- **${s}** — Qualite interpersonnelle essentielle pour reussir en tant que ${lower}`).join('\n') || '- Communication ecrite et orale\n- Travail d\'equipe et collaboration'}
- Adaptabilite et capacite a travailler sous pression
- Resolution de conflits et negociation

## Points de Realisation Axes sur les Resultats

Utilisez ces exemples comme modeles pour formuler vos propres realisations avec des chiffres concrets :

- Amelioration de **25 %** de l'efficacite operationnelle grace a l'optimisation des processus en ${topSkills || 'competences cles'}, generant des economies annuelles significatives
- Gestion simultanee de **12+ projets** avec un taux de livraison dans les delais de 98 %, depassant les objectifs de l'equipe
- Formation et encadrement de **8 collegues juniors**, contribuant a reduire le temps d'integration de 40 %
- Mise en place d'un nouveau systeme de ${skills[0] || 'gestion'} ayant reduit les erreurs de **35 %** et ameliore la satisfaction client
- Augmentation du chiffre d'affaires de **20 %** sur un trimestre grace a des strategies innovantes en ${skills[1] || 'developpement'}
- Obtention d'un taux de satisfaction client de **95 %** en implementant des ameliorations continues basees sur les retours utilisateurs

## Format et Conseils de Modele pour CV de ${jobTitle}

1. **Utilisez un format chronologique inverse** — Placez votre experience la plus recente en premier. C'est le format prefere par les recruteurs et les systemes ATS pour les postes de ${lower}.
2. **Adaptez votre resume professionnel a chaque candidature** — Reprenez les mots-cles de l'offre d'emploi et personnalisez votre accroche pour montrer que vous comprenez les enjeux specifiques du poste.
3. **Quantifiez vos realisations** — Les chiffres attirent l'attention et rendent vos contributions tangibles. Preferez "augmente les ventes de 30 %" a "ameliore les resultats commerciaux".
4. **Soignez la mise en page** — Utilisez des marges de 2,5 cm, une police professionnelle (Calibri, Arial, Garamond) en taille 10-12, et des sections clairement delimitees par des titres en gras.
5. **Incluez les certifications et formations pertinentes** — Pour un poste de ${lower}, les certifications professionnelles et formations continues demontrent votre engagement dans le developpement de vos competences.

## Conseil du Responsable de Recrutement

> **L'erreur la plus frequente que je vois dans les CV de ${lower} est l'absence de resultats chiffres.** Beaucoup de candidats decrivent leurs responsabilites sans jamais montrer l'impact concret de leur travail.

Quand je recrute un ${lower}, je cherche des preuves tangibles de performance. Un candidat qui ecrit "Gere une equipe de 5 personnes" m'apprend moins que celui qui ecrit "Pilote une equipe de 5 personnes, atteignant 115 % des objectifs trimestriels pendant 4 trimestres consecutifs". Chaque ligne de votre section experience doit repondre a la question : quel resultat mesurable ai-je obtenu ?

Pensez egalement a adapter votre vocabulaire au secteur vise. Les recruteurs specialises en ${category.toLowerCase()} repereront immediatement les termes generiques qui trahissent un CV non personnalise.

## Questions d'Entretien Courantes pour ${jobTitle}

### Pouvez-vous decrire un projet complexe que vous avez mene a bien en tant que ${lower} ?

Les recruteurs veulent evaluer votre capacite a gerer la complexite. Structurez votre reponse selon la methode STAR (Situation, Tache, Action, Resultat). Decrivez le contexte, votre role specifique, les actions que vous avez entreprises et les resultats mesurables obtenus.

### Comment gerez-vous les situations de pression ou les delais serres dans votre role de ${lower} ?

Demontrez votre capacite a prioriser et a rester performant sous pression. Donnez un exemple concret ou vous avez du gerer des priorites conflictuelles, expliquez votre approche methodique et partagez le resultat positif obtenu.

### Quelles sont vos competences techniques les plus fortes en lien avec ce poste de ${lower} ?

C'est l'occasion de mettre en avant votre expertise en ${topSkills || 'competences cles'}. Ne vous contentez pas de lister des competences : illustrez-les par des exemples d'application concrete et des resultats obtenus grace a ces competences.

### Comment vous tenez-vous informe des evolutions de votre secteur ?

Les recruteurs veulent s'assurer que vous investissez dans votre developpement professionnel continu. Mentionnez les formations recentes, certifications, conferences, publications professionnelles ou communautes auxquelles vous participez activement.

### Ou vous voyez-vous dans cinq ans dans le domaine de ${lower} ?

Montrez que vous avez une vision claire de votre evolution professionnelle. Exprimez des ambitions realistes qui s'alignent avec les opportunites de croissance de l'entreprise, tout en demontrant votre engagement a long terme dans le secteur.

## Erreurs Courantes a Eviter

### 1. Utiliser un CV generique non adapte au poste

Envoyer le meme CV pour chaque candidature est l'erreur la plus penalisante. Les systemes ATS et les recruteurs detectent immediatement un CV non personnalise. Adaptez votre resume professionnel et vos mots-cles a chaque offre de ${lower}.

### 2. Decrire des taches plutot que des realisations

Lister vos responsabilites quotidiennes n'impressionne pas les recruteurs. Transformez chaque point en une realisation mesurable. "Gere les appels clients" devient "Traite en moyenne 85 appels par jour avec un taux de resolution au premier contact de 92 %".

### 3. Negliger l'optimisation ATS

De nombreux candidats au poste de ${lower} perdent des opportunites parce que leur CV ne passe pas les filtres automatiques. Evitez les tableaux complexes, les en-tetes et pieds de page, et les graphiques qui ne sont pas lus par les ATS.

### 4. Inclure des informations obsoletes ou non pertinentes

Les experiences datant de plus de 15 ans ou sans rapport avec le poste de ${lower} encombrent votre CV. Concentrez-vous sur les 10 dernieres annees et sur les experiences directement pertinentes pour le poste vise.

### 5. Oublier les mots-cles specifiques au secteur

Chaque secteur a son jargon professionnel. Pour un poste de ${lower}, l'absence de termes techniques specifiques comme ${topSkills || 'competences du domaine'} peut signaler un manque d'expertise aux yeux du recruteur.

## Optimisation ATS pour CV de ${jobTitle}

Les systemes de suivi des candidatures (ATS) filtrent les CV avant qu'un recruteur ne les examine. Pour maximiser vos chances en tant que ${lower} :

- **Reprenez les mots-cles exacts de l'offre d'emploi** — Si l'annonce mentionne "${skills[0] || 'competence specifique'}", utilisez cette formulation exacte dans votre CV
- **Utilisez un format simple et lisible** — Evitez les colonnes multiples, les tableaux et les zones de texte qui perturbent les parsers ATS
- **Placez les competences cles dans plusieurs sections** — Mentionnez ${topSkills || 'vos competences principales'} dans votre resume professionnel, votre experience ET votre section competences
- **Privilegiez le format PDF ou DOCX** — Ces formats sont les mieux pris en charge par les systemes ATS modernes
- **Incluez les acronymes ET les termes complets** — Ecrivez par exemple "Gestion de la Relation Client (CRM)" pour couvrir les deux variantes de recherche
- **Evitez les en-tetes et pieds de page** — Certains ATS ne lisent pas le contenu place dans ces zones

## Ressources Complementaires

Consultez ces ressources pour perfectionner votre candidature de ${lower} :

- [Verifiez la compatibilite ATS de votre CV](/fr/tools/ats-checker) — Testez gratuitement votre CV avec notre outil d'analyse ATS
- [Exemples de CV professionnels](/fr/resume-examples) — Parcourez des centaines de modeles par secteur d'activite
- [Modeles de CV compatibles ATS](/fr/templates) — Choisissez parmi nos modeles optimises pour passer les filtres automatiques

Pret a creer un CV de ${lower} professionnel et compatible ATS ? Utilisez notre [createur de CV gratuit](/fr/builder) pour concevoir un CV percutant en quelques minutes. Nos modeles sont optimises pour les systemes ATS et vous guident etape par etape dans la redaction de chaque section.
`;
}
