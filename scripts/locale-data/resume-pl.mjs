/**
 * Polish (pl) locale data for resume example generation.
 * Imported by generate-locale-resume-examples.mjs via:
 *   await import('./locale-data/resume-pl.mjs')
 *
 * Keyword-optimized using seo/polish-top-250-keywords.csv
 * Top keywords: "kreator cv" (50K/mo), "szablon cv" (5K/mo), "wzór cv" (5K/mo)
 */

const LANG = 'pl';

// ─── CONFIG ─────────────────────────────────────────────────────────────────

export const CONFIG = {
  author: 'Anna Kowalska',
  authorBio: 'Specjalistka ds. rozwoju kariery i tworzenia CV z ponad 10-letnim doświadczeniem w pomaganiu polskim profesjonalistom w znalezieniu wymarzonej pracy.',
  titlePattern: (job) => `CV ${job}: Wzory, Szablony i Wskazówki 2026`,
  descriptionPattern: (job) => `Wzór CV ${job.toLowerCase()} z przykładami zgodnymi z ATS i wskazówkami ekspertów. Stwórz profesjonalne CV za darmo i zdobądź rozmowę kwalifikacyjną w 2026.`,
  imageAltPattern: (job) => `Przykład CV ${job}`,
};

// ─── JOB TITLES (English → Polish) ──────────────────────────────────────────

export const JOB_TITLES = {
  '3D Artist': 'Artysta 3D',
  'Academic Advisor': 'Doradca Akademicki',
  'Account Executive': 'Kierownik ds. Klientów Kluczowych',
  'Account Manager': 'Menedżer ds. Klientów',
  'Accountant': 'Księgowy',
  'Accounting Assistant': 'Asystent Księgowości',
  'Accounting Clerk': 'Pracownik Biurowy ds. Księgowości',
  'Accounting Intern': 'Stażysta ds. Księgowości',
  'Accounts Payable Specialist': 'Specjalista ds. Zobowiązań',
  'Accounts Receivable Specialist': 'Specjalista ds. Należności',
  'Administrative Assistant': 'Asystent Administracyjny',
  'AI Engineer': 'Inżynier AI',
  'Android Developer': 'Programista Android',
  'Animal Control Officer': 'Inspektor ds. Ochrony Zwierząt',
  'Animal Shelter Worker': 'Pracownik Schroniska dla Zwierząt',
  'Animator': 'Animator',
  'Appliance Repair Technician': 'Technik Naprawy AGD',
  'Aquarium Keeper': 'Opiekun Akwarium',
  'Arbitrator': 'Arbiter',
  'Architect': 'Architekt',
  'Art Director': 'Dyrektor Artystyczny',
  'Assistant Director': 'Zastępca Dyrektora',
  'Assistant Manager': 'Zastępca Kierownika',
  'Assistant Property Manager': 'Asystent Zarządcy Nieruchomości',
  'Assistant Store Manager': 'Zastępca Kierownika Sklepu',
  'Athletic Trainer': 'Trener Sportowy',
  'Audio Engineer': 'Inżynier Dźwięku',
  'Auditor': 'Audytor',
  'Auto Mechanic': 'Mechanik Samochodowy',
  'Automation Engineer': 'Inżynier Automatyki',
  'Automotive Technician': 'Technik Samochodowy',
  'AWS Cloud Engineer': 'Inżynier Chmury AWS',
  'AWS Solution Architect': 'Architekt Rozwiązań AWS',
  'Backend Developer': 'Programista Backend',
  'Baker': 'Piekarz',
  'Bank Manager': 'Dyrektor Oddziału Banku',
  'Bank Teller': 'Kasjer Bankowy',
  'Banquet Chef': 'Szef Kuchni Bankietowej',
  'Barista': 'Barista',
  'Bartender': 'Barman',
  'Bellhop': 'Bagażowy',
  'Billing Specialist': 'Specjalista ds. Fakturowania',
  'Blockchain Developer': 'Programista Blockchain',
  'Branch Manager': 'Kierownik Oddziału',
  'Brand Designer': 'Projektant Marki',
  'Budget Analyst': 'Analityk Budżetowy',
  'Building Inspector': 'Inspektor Budowlany',
  'Building Maintenance Technician': 'Technik Utrzymania Budynku',
  'Bus Driver': 'Kierowca Autobusu',
  'Business Administration Professional': 'Specjalista ds. Administracji Biznesu',
  'Business Analyst': 'Analityk Biznesowy',
  'Business Consultant': 'Konsultant Biznesowy',
  'Business Development Executive': 'Dyrektor ds. Rozwoju Biznesu',
  'Business Development Manager': 'Menedżer ds. Rozwoju Biznesu',
  'Business Intelligence Analyst': 'Analityk Business Intelligence',
  'Business Intelligence Specialist': 'Specjalista Business Intelligence',
  'Business Manager': 'Menedżer Biznesowy',
  'Business Owner': 'Właściciel Firmy',
  'Busser': 'Pomocnik Kelnera',
  'Cabin Crew': 'Personel Pokładowy',
  'Cabinet Maker': 'Stolarz Meblowy',
  'Cafeteria Worker': 'Pracownik Stołówki',
  'Call Center Agent': 'Agent Call Center',
  'Call Center Representative': 'Konsultant Call Center',
  'Car Sales Associate': 'Sprzedawca Samochodów',
  'Caregiver': 'Opiekun',
  'Carpenter': 'Cieśla',
  'Carpet Cleaner': 'Pracownik Pralni Dywanów',
  'Case Manager': 'Kierownik Spraw',
  'Cashier': 'Kasjer',
  'Casino Dealer': 'Krupier',
  'Caterer': 'Operator Cateringowy',
  'Catering Manager': 'Menedżer Cateringu',
  'Certified Nursing Assistant': 'Certyfikowany Asystent Pielęgniarki',
  'Certified Nursing Assistant (CNA)': 'Certyfikowany Asystent Pielęgniarki (CNA)',
  'Change Management Specialist': 'Specjalista ds. Zarządzania Zmianą',
  'Chef': 'Szef Kuchni',
  'Chemical Engineer': 'Inżynier Chemiczny',
  'Chemist': 'Chemik',
  'Chief Information Officer (CIO)': 'Dyrektor ds. Informatyki (CIO)',
  'Chief of Staff': 'Szef Gabinetu',
  'Chiropractor': 'Chiropraktyk',
  'City Planner': 'Urbanista',
  'Civil Engineer': 'Inżynier Budownictwa',
  'Claims Adjuster': 'Likwidator Szkód',
  'Client Relations Manager': 'Menedżer ds. Relacji z Klientami',
  'Clinical Research Associate': 'Asystent Badań Klinicznych',
  'Clinical Research Coordinator': 'Koordynator Badań Klinicznych',
  'Cloud Architect': 'Architekt Chmury',
  'Cloud Engineer': 'Inżynier Chmury',
  'CNC Machinist': 'Operator CNC',
  'CNC Operator': 'Operator CNC',
  'Code Enforcement Officer': 'Inspektor Przestrzegania Przepisów',
  'College Admissions Counselor': 'Doradca ds. Rekrutacji na Studia',
  'College Professor': 'Profesor Wyższy',
  'Commercial Cleaner': 'Pracownik Sprzątający',
  'Commercial Real Estate Broker': 'Pośrednik Nieruchomości Komercyjnych',
  'Community Manager': 'Community Manager',
  'Community Outreach Coordinator': 'Koordynator ds. Społeczności',
  'Complaints Handler': 'Specjalista ds. Reklamacji',
  'Compliance Officer': 'Oficer Compliance',
  'Computer Operator': 'Operator Komputerowy',
  'Computer Science Professional': 'Specjalista ds. Informatyki',
  'Computer Technician': 'Technik Komputerowy',
  'Concierge': 'Concierge',
  'Concrete Finisher': 'Betoniarz Wykończeniowy',
  'Construction Manager': 'Kierownik Budowy',
  'Construction Superintendent': 'Nadzorca Budowy',
  'Construction Worker': 'Pracownik Budowlany',
  'Consultant': 'Konsultant',
  'Content Creator': 'Twórca Treści',
  'Content Writer': 'Copywriter',
  'Contract Specialist': 'Specjalista ds. Umów',
  'Contracts Specialist': 'Specjalista ds. Kontraktów',
  'Controller': 'Kontroler Finansowy',
  'Copywriter': 'Copywriter',
  'Corporate Security Manager': 'Menedżer Bezpieczeństwa Korporacyjnego',
  'Correctional Officer': 'Funkcjonariusz Służby Więziennej',
  'Court Clerk': 'Sekretarz Sądowy',
  'Court Reporter': 'Protokolant Sądowy',
  'Creative Director': 'Dyrektor Kreatywny',
  'Crisis Counselor': 'Doradca Kryzysowy',
  'Cruise Ship Worker': 'Pracownik Statku Wycieczkowego',
  'Curriculum Developer': 'Twórca Programów Nauczania',
  'Customer Experience Specialist': 'Specjalista ds. Doświadczeń Klienta',
  'Customer Service Representative': 'Przedstawiciel Obsługi Klienta',
  'Customer Success Manager': 'Menedżer ds. Sukcesu Klienta',
  'Customer Success Specialist': 'Specjalista ds. Sukcesu Klienta',
  'Customer Support Specialist': 'Specjalista ds. Wsparcia Klienta',
  'Customs Officer': 'Celnik',
  'Cybersecurity Analyst': 'Analityk Cyberbezpieczeństwa',
  'Data Analyst': 'Analityk Danych',
  'Data Architect': 'Architekt Danych',
  'Data Engineer': 'Inżynier Danych',
  'Data Entry Clerk': 'Pracownik Wprowadzania Danych',
  'Data Entry Operator': 'Operator Wprowadzania Danych',
  'Data Entry Specialist': 'Specjalista ds. Wprowadzania Danych',
  'Data Scientist': 'Data Scientist',
  'Database Administrator': 'Administrator Bazy Danych',
  'Delivery Driver': 'Kierowca Dostawczy',
  'Dental Assistant': 'Asystent Stomatologiczny',
  'Dental Hygienist': 'Higienistka Stomatologiczna',
  'Dental Office Manager': 'Kierownik Gabinetu Stomatologicznego',
  'Dentist': 'Stomatolog',
  'Design Engineer': 'Inżynier Projektant',
  'Desktop Support Engineer': 'Inżynier Wsparcia Desktop',
  'Desktop Support Technician': 'Technik Wsparcia Desktop',
  'DevOps Engineer': 'Inżynier DevOps',
  'Dialysis Technician': 'Technik Dializoterapii',
  'Diesel Mechanic': 'Mechanik Silników Diesla',
  'Dietary Aide': 'Asystent Dietetyczny',
  'Dietitian': 'Dietetyk',
  'Digital Marketer': 'Specjalista ds. Marketingu Cyfrowego',
  'Digital Marketing Manager': 'Menedżer Marketingu Cyfrowego',
  'Digital Marketing Specialist': 'Specjalista Marketingu Cyfrowego',
  'Dishwasher': 'Zmywak',
  'Dispatcher': 'Dyspozytor',
  'District Manager': 'Kierownik Regionalny',
  'Doctor': 'Lekarz',
  'Dog Trainer': 'Treser Psów',
  'Driver': 'Kierowca',
  'Drywall Installer': 'Monter Płyt Gipsowo-Kartonowych',
  'Editor': 'Redaktor',
  'Education Consultant': 'Konsultant Edukacyjny',
  'Educational Technologist': 'Specjalista ds. Technologii Edukacyjnych',
  'Electrical Engineer': 'Inżynier Elektryk',
  'Electrical Technician': 'Elektrotechnik',
  'Electrician': 'Elektryk',
  'Elementary Teacher': 'Nauczyciel Szkoły Podstawowej',
  'Elevator Technician': 'Technik Dźwigowy',
  'Embedded Systems Engineer': 'Inżynier Systemów Wbudowanych',
  'Emergency Management Coordinator': 'Koordynator Zarządzania Kryzysowego',
  'EMT': 'Ratownik Medyczny',
  'Engineering Manager': 'Menedżer Inżynieryjny',
  'Environmental Compliance Officer': 'Oficer Zgodności Środowiskowej',
  'Epidemiologist': 'Epidemiolog',
  'Escrow Officer': 'Oficer Powierniczy',
  'ESL Teacher': 'Nauczyciel Języka Angielskiego',
  'Ethical Hacker': 'Etyczny Haker',
  'Event Coordinator': 'Koordynator Wydarzeń',
  'Event Manager': 'Menedżer Wydarzeń',
  'Event Planner': 'Organizator Wydarzeń',
  'Executive Assistant': 'Asystent Zarządu',
  'Executive Chef': 'Szef Kuchni Wykonawczy',
  'Executive Director': 'Dyrektor Wykonawczy',
  'Exercise Physiologist': 'Fizjolog Ćwiczeń',
  'Facilities Manager': 'Menedżer Utrzymania Obiektu',
  'Family Services Worker': 'Pracownik Socjalny ds. Rodzin',
  'Farm Manager': 'Kierownik Gospodarstwa Rolnego',
  'Farm Worker': 'Pracownik Rolny',
  'Fashion Designer': 'Projektant Mody',
  'Fast Food Worker': 'Pracownik Fast Food',
  'Fence Installer': 'Monter Ogrodzeń',
  'Film Director': 'Reżyser Filmowy',
  'Film Editor': 'Montażysta Filmowy',
  'Finance Manager': 'Menedżer Finansowy',
  'Financial Advisor': 'Doradca Finansowy',
  'Financial Analyst': 'Analityk Finansowy',
  'Financial Controller': 'Kontroler Finansowy',
  'Financial Planner': 'Planista Finansowy',
  'Fire Inspector': 'Inspektor Pożarowy',
  'Firefighter': 'Strażak',
  'First Officer': 'Drugi Pilot',
  'Fish and Game Warden': 'Strażnik Łowiecki',
  'Fitness Center Manager': 'Menedżer Centrum Fitness',
  'Fitness Instructor': 'Instruktor Fitness',
  'Fitness Trainer': 'Trener Fitness',
  'Fleet Manager': 'Menedżer Floty',
  'Flight Attendant': 'Steward/Stewardessa',
  'Flight Engineer': 'Inżynier Pokładowy',
  'Floor Installer': 'Posadzkarz',
  'Floor Manager': 'Kierownik Sali',
  'Florist': 'Florysta',
  'Food Expeditor': 'Ekspedytor Żywności',
  'Food Inspector': 'Inspektor Żywności',
  'Food Runner': 'Pomocnik Kelnera',
  'Food Safety Manager': 'Menedżer Bezpieczeństwa Żywności',
  'Food Scientist': 'Technolog Żywności',
  'Food Server': 'Kelner',
  'Food Service Director': 'Dyrektor ds. Żywienia',
  'Food Service Manager': 'Menedżer Gastronomii',
  'Food Service Worker': 'Pracownik Gastronomii',
  'Food Stylist': 'Stylista Kulinarny',
  'Food Truck Operator': 'Operator Food Truck',
  'Foreman': 'Majster',
  'Forensic Accountant': 'Biegły Rewident',
  'Forklift Operator': 'Operator Wózka Widłowego',
  'Freelance Writer': 'Freelancer / Pisarz',
  'Freight Broker': 'Spedytor',
  'Front Desk Agent': 'Recepcjonista',
  'Front Desk Manager': 'Kierownik Recepcji',
  'Front Desk Receptionist': 'Recepcjonista',
  'Front End Developer': 'Programista Frontend',
  'Frontend Developer': 'Programista Frontend',
  'Full Stack Developer': 'Programista Full Stack',
  'Fundraiser': 'Fundraiser',
  'Funeral Director': 'Kierownik Zakładu Pogrzebowego',
  'Game Designer': 'Projektant Gier',
  'Game Developer': 'Programista Gier',
  'Garbage Collector': 'Pracownik Odbioru Odpadów',
  'Gardener': 'Ogrodnik',
  'General Manager': 'Dyrektor Generalny',
  'Genetic Counselor': 'Doradca Genetyczny',
  'Geologist': 'Geolog',
  'GIS Analyst': 'Analityk GIS',
  'Glazier': 'Szklarz',
  'Go Developer': 'Programista Go',
  'Government Employee': 'Pracownik Służby Cywilnej',
  'Grants Manager': 'Menedżer ds. Dotacji',
  'Graphic Designer': 'Grafik',
  'Grocery Store Clerk': 'Pracownik Sklepu Spożywczego',
  'Group Fitness Instructor': 'Instruktor Grupowy Fitness',
  'Guidance Counselor': 'Doradca Zawodowy',
  'Gym Trainer': 'Trener Siłowni',
  'Hairdresser': 'Fryzjer',
  'Hairstylist': 'Stylista Fryzur',
  'Head Cook': 'Kucharz Główny',
  'Health Coach': 'Coach Zdrowia',
  'Health Educator': 'Edukator Zdrowotny',
  'Health Inspector': 'Inspektor Sanitarny',
  'Healthcare Administrator': 'Administrator ds. Ochrony Zdrowia',
  'Healthcare Consultant': 'Konsultant ds. Ochrony Zdrowia',
  'Heavy Equipment Operator': 'Operator Ciężkiego Sprzętu',
  'Help Desk Analyst': 'Analityk Help Desk',
  'Help Desk Technician': 'Technik Help Desk',
  'High School Teacher': 'Nauczyciel Szkoły Średniej',
  'Home Health Aide': 'Opiekun Domowy',
  'Home Inspector': 'Inspektor Budynków Mieszkalnych',
  'Hospice Nurse': 'Pielęgniarka Hospicyjna',
  'Hospital Administrator': 'Administrator Szpitala',
  'Hospital Housekeeper': 'Pracownik Sprzątający Szpital',
  'Hospitality Manager': 'Menedżer Hotelarstwa',
  'Host/Hostess': 'Gospodarz/Gospodyni Sali',
  'Hotel Front Desk Agent': 'Recepcjonista Hotelowy',
  'Hotel Front Desk Clerk': 'Pracownik Recepcji Hotelowej',
  'Hotel General Manager': 'Dyrektor Generalny Hotelu',
  'Hotel Housekeeper': 'Pokojowa',
  'Hotel Manager': 'Kierownik Hotelu',
  'House Cleaner': 'Sprzątaczka',
  'Housekeeper': 'Gospodyni',
  'Housekeeping Supervisor': 'Kierownik Sprzątania',
  'HR Assistant': 'Asystent HR',
  'HR Business Partner': 'HR Business Partner',
  'HR Coordinator': 'Koordynator HR',
  'HR Director': 'Dyrektor HR',
  'HR Executive': 'Dyrektor ds. Personalnych',
  'HR Generalist': 'Specjalista HR',
  'HR Manager': 'Menedżer HR',
  'HR Recruiter': 'Rekruter HR',
  'HR Specialist': 'Specjalista ds. HR',
  'HVAC Technician': 'Technik HVAC',
  'Illustrator': 'Ilustrator',
  'Immigration Consultant': 'Doradca ds. Imigracji',
  'Immigration Lawyer': 'Prawnik ds. Imigracji',
  'Implementation Specialist': 'Specjalista ds. Wdrożeń',
  'Industrial Designer': 'Projektant Przemysłowy',
  'Industrial Engineer': 'Inżynier Przemysłowy',
  'Industrial Maintenance Technician': 'Technik Utrzymania Ruchu',
  'Information Security Analyst': 'Analityk Bezpieczeństwa Informacji',
  'Inside Sales Representative': 'Handlowiec Wewnętrzny',
  'Instructional Coach': 'Doradca Dydaktyczny',
  'Instructional Designer': 'Projektant Dydaktyczny',
  'Insulation Worker': 'Izolator',
  'Insurance Agent': 'Agent Ubezpieczeniowy',
  'Insurance Underwriter': 'Underwriter Ubezpieczeniowy',
  'Intelligence Analyst': 'Analityk Wywiadu',
  'Interior Designer': 'Architekt Wnętrz',
  'Intern': 'Stażysta',
  'Interpreter': 'Tłumacz Ustny',
  'Inventory Manager': 'Menedżer Zapasów',
  'Investigator': 'Śledczy',
  'Investment Analyst': 'Analityk Inwestycyjny',
  'Investment Banker': 'Bankier Inwestycyjny',
  'iOS Developer': 'Programista iOS',
  'Iron Worker': 'Zbrojarz',
  'Ironworker': 'Zbrojarz',
  'IT Auditor': 'Audytor IT',
  'IT Consultant': 'Konsultant IT',
  'IT Director': 'Dyrektor IT',
  'IT Manager': 'Menedżer IT',
  'IT Project Manager': 'Kierownik Projektu IT',
  'IT Recruiter': 'Rekruter IT',
  'IT Security Analyst': 'Analityk Bezpieczeństwa IT',
  'IT Specialist': 'Specjalista IT',
  'IT Support Specialist': 'Specjalista Wsparcia IT',
  'IT Support Technician': 'Technik Wsparcia IT',
  'IT Technician': 'Technik IT',
  'Janitor': 'Woźny',
  'Java Developer': 'Programista Java',
  'Java Full Stack Developer': 'Programista Java Full Stack',
  'JavaScript Developer': 'Programista JavaScript',
  'Jeweler': 'Jubiler',
  'Journalist': 'Dziennikarz',
  'Junior Developer': 'Programista Junior',
  'K-12 Teacher': 'Nauczyciel Szkoły Podstawowej i Średniej',
  'Kitchen Helper': 'Pomocnik Kuchenny',
  'Kitchen Manager': 'Kierownik Kuchni',
  'Lab Assistant': 'Asystent Laboratoryjny',
  'Lab Technician': 'Technik Laboratoryjny',
  'Laboratory Assistant': 'Asystent Laboratoryjny',
  'Landscape Architect': 'Architekt Krajobrazu',
  'Landscaper': 'Ogrodnik Krajobrazowy',
  'Language Teacher': 'Nauczyciel Języków Obcych',
  'Lawyer': 'Prawnik',
  'Lead Generation Specialist': 'Specjalista ds. Generowania Leadów',
  'Leasing Agent': 'Agent ds. Najmu',
  'Leasing Consultant': 'Konsultant ds. Najmu',
  'Legal Analyst': 'Analityk Prawny',
  'Legal Assistant': 'Asystent Prawny',
  'Legal Secretary': 'Sekretarka Prawna',
  'Legislative Aide': 'Asystent Legislacyjny',
  'Librarian': 'Bibliotekarz',
  'Library Assistant': 'Asystent Biblioteczny',
  'Licensed Practical Nurse': 'Pielęgniarka Praktyczna',
  'Licensed Practical Nurse (LPN)': 'Pielęgniarka Praktyczna (LPN)',
  'Lifeguard': 'Ratownik Wodny',
  'Limousine Driver': 'Kierowca Limuzyny',
  'Line Cook': 'Kucharz',
  'Litigation Support Specialist': 'Specjalista ds. Wsparcia Procesowego',
  'Loan Officer': 'Doradca Kredytowy',
  'Loan Processor': 'Pracownik ds. Kredytów',
  'Locksmith': 'Ślusarz',
  'Logistics Coordinator': 'Koordynator Logistyki',
  'Logistics Manager': 'Menedżer Logistyki',
  'Logistics Specialist': 'Specjalista ds. Logistyki',
  'Long Haul Truck Driver': 'Kierowca Ciężarówki Długodystansowej',
  'Loss Prevention Specialist': 'Specjalista ds. Prewencji Strat',
  'Machine Learning Engineer': 'Inżynier Machine Learning',
  'Machine Learning Specialist': 'Specjalista Machine Learning',
  'Machine Operator': 'Operator Maszyn',
  'Maintenance Engineer': 'Inżynier Utrzymania Ruchu',
  'Maintenance Manager': 'Menedżer Utrzymania Ruchu',
  'Maintenance Supervisor': 'Brygadzista Utrzymania Ruchu',
  'Maintenance Technician': 'Technik Utrzymania Ruchu',
  'Maintenance Worker': 'Pracownik Działu Utrzymania',
  'Makeup Artist': 'Wizażysta',
  'Management Analyst': 'Analityk Zarządzania',
  'Management Consultant': 'Konsultant ds. Zarządzania',
  'Manufacturing Engineer': 'Inżynier Produkcji',
  'Manufacturing Worker': 'Pracownik Produkcji',
  'Marine Biologist': 'Biolog Morski',
  'Marine Engineer': 'Inżynier Okrętowy',
  'Market Research Analyst': 'Analityk Badań Rynku',
  'Marketing Analyst': 'Analityk Marketingowy',
  'Marketing Assistant': 'Asystent Marketingu',
  'Marketing Coordinator': 'Koordynator Marketingu',
  'Marketing Director': 'Dyrektor Marketingu',
  'Marketing Executive': 'Dyrektor ds. Marketingu',
  'Marketing Intern': 'Stażysta ds. Marketingu',
  'Marketing Manager': 'Menedżer Marketingu',
  'Marketing Specialist': 'Specjalista ds. Marketingu',
  'Marriage and Family Therapist': 'Terapeuta Rodzinny',
  'Mason': 'Murarz',
  'Massage Therapist': 'Masażysta',
  'Material Handler': 'Magazynier',
  'Materials Engineer': 'Inżynier Materiałowy',
  'Mechanic': 'Mechanik',
  'Mechanical Design Engineer': 'Inżynier Projektowania Mechanicznego',
  'Mechanical Engineer': 'Inżynier Mechanik',
  'Mechanical Technician': 'Technik Mechaniczny',
  'Media Buyer': 'Kupiec Mediowy',
  'Mediator': 'Mediator',
  'Medical Assistant': 'Asystent Medyczny',
  'Medical Billing Specialist': 'Specjalista ds. Rozliczeń Medycznych',
  'Medical Coder': 'Koder Medyczny',
  'Medical Director': 'Dyrektor Medyczny',
  'Medical Lab Technician': 'Technik Laboratorium Medycznego',
  'Medical Office Assistant': 'Asystent Gabinetu Medycznego',
  'Medical Office Manager': 'Kierownik Gabinetu Medycznego',
  'Medical Receptionist': 'Recepcjonista Medyczny',
  'Medical Records Clerk': 'Pracownik Dokumentacji Medycznej',
  'Medical Representative': 'Przedstawiciel Medyczny',
  'Medical Sales Representative': 'Handlowiec ds. Produktów Medycznych',
  'Medical Scribe': 'Asystent Dokumentacji Medycznej',
  'Medical Social Worker': 'Pracownik Socjalny Medyczny',
  'Medical Technologist': 'Technik Medyczny',
  'Mental Health Counselor': 'Doradca ds. Zdrowia Psychicznego',
  'Mental Health Technician': 'Technik Zdrowia Psychicznego',
  'Meteorologist': 'Meteorolog',
  'Microbiologist': 'Mikrobiolog',
  'Middle School Teacher': 'Nauczyciel Szkoły Gimnazjalnej',
  'Midwife': 'Położna',
  'Military Officer': 'Oficer Wojskowy',
  'Millwright': 'Monter Maszyn Przemysłowych',
  'Minister': 'Duchowny',
  'Mobile Developer': 'Programista Aplikacji Mobilnych',
  'Mortgage Loan Officer': 'Doradca Kredytów Hipotecznych',
  'Motion Graphics Designer': 'Projektant Motion Graphics',
  'Moving Company Driver': 'Kierowca Firmy Przeprowadzkowej',
  'MRI Technologist': 'Technik MRI',
  'Music Producer': 'Producent Muzyczny',
  'Music Teacher': 'Nauczyciel Muzyki',
  'Nanny': 'Niania',
  'Network Administrator': 'Administrator Sieci',
  'Network Engineer': 'Inżynier Sieci',
  'Night Auditor': 'Audytor Nocny',
  'Node.js Developer': 'Programista Node.js',
  'Nonprofit Director': 'Dyrektor Organizacji Pozarządowej',
  'Nuclear Engineer': 'Inżynier Jądrowy',
  'Nurse': 'Pielęgniarka',
  'Nurse Manager': 'Kierownik Pielęgniarek',
  'Nurse Practitioner': 'Pielęgniarka Zaawansowanej Praktyki',
  'Nursing Assistant': 'Asystent Pielęgniarki',
  'Nursing Home Administrator': 'Administrator Domu Opieki',
  'Nutritionist': 'Dietetyk',
  'Occupational Therapist': 'Terapeuta Zajęciowy',
  'Occupational Therapy Assistant': 'Asystent Terapii Zajęciowej',
  'Office Administrator': 'Administrator Biura',
  'Office Assistant': 'Asystent Biurowy',
  'Office Clerk': 'Pracownik Biurowy',
  'Office Manager': 'Kierownik Biura',
  'Operations Analyst': 'Analityk Operacyjny',
  'Operations Coordinator': 'Koordynator Operacyjny',
  'Operations Director': 'Dyrektor Operacyjny',
  'Operations Manager': 'Menedżer Operacyjny',
  'Optician': 'Optyk',
  'Optometrist': 'Optometrysta',
  'Orthodontist': 'Ortodonta',
  'Outside Sales Representative': 'Handlowiec Terenowy',
  'Painter': 'Malarz',
  'Paralegal': 'Paralegal',
  'Paramedic': 'Ratownik Medyczny',
  'Park Ranger': 'Leśnik',
  'Parking Attendant': 'Pracownik Parkingu',
  'Pastry Chef': 'Cukiernik',
  'Patient Care Technician': 'Technik Opieki nad Pacjentem',
  'Payroll Specialist': 'Specjalista ds. Wynagrodzeń',
  'Pediatrician': 'Pediatra',
  'Penetration Tester': 'Tester Penetracyjny',
  'Personal Assistant': 'Asystent Osobisty',
  'Personal Banker': 'Doradca Klienta Bankowości Osobistej',
  'Personal Trainer': 'Trener Personalny',
  'Pest Control Technician': 'Technik Dezynsekcji',
  'Pet Groomer': 'Groomer',
  'Pet Sitter': 'Opiekun Zwierząt',
  'Petroleum Engineer': 'Inżynier Naftowy',
  'Pharmaceutical Sales Representative': 'Przedstawiciel Farmaceutyczny',
  'Pharmacist': 'Farmaceuta',
  'Pharmacy Assistant': 'Asystent Farmaceutyczny',
  'Pharmacy Tech': 'Technik Farmaceutyczny',
  'Pharmacy Technician': 'Technik Farmaceutyczny',
  'Phlebotomist': 'Flebotomista',
  'Photographer': 'Fotograf',
  'Physical Therapist': 'Fizjoterapeuta',
  'Physical Therapy Assistant': 'Asystent Fizjoterapeuty',
  'Physician': 'Lekarz',
  'Physician Assistant': 'Asystent Lekarza',
  'Pilates Instructor': 'Instruktor Pilates',
  'Pilot': 'Pilot',
  'Pipefitter': 'Rurociągowiec',
  'Pizza Maker': 'Pizzaiolo',
  'Plant Manager': 'Dyrektor Zakładu',
  'Platform Engineer': 'Inżynier Platformowy',
  'Plumber': 'Hydraulik',
  'Podcast Producer': 'Producent Podcastów',
  'Police Dispatcher': 'Dyspozytor Policji',
  'Police Officer': 'Policjant',
  'Policy Analyst': 'Analityk Polityki',
  'Political Scientist': 'Politolog',
  'Pool Cleaner': 'Serwisant Basenów',
  'Pool Technician': 'Technik Basenowy',
  'Porter': 'Portier',
  'Postal Worker': 'Listonosz',
  'Power BI Developer': 'Programista Power BI',
  'Prep Cook': 'Kucharz Przygotowawczy',
  'Preschool Teacher': 'Nauczyciel Przedszkolny',
  'Pressure Washer': 'Operator Myjki Ciśnieniowej',
  'Principal': 'Dyrektor Szkoły',
  'Private Investigator': 'Prywatny Detektyw',
  'Probation Officer': 'Kurator Sądowy',
  'Process Engineer': 'Inżynier Procesowy',
  'Procurement Manager': 'Menedżer ds. Zakupów',
  'Procurement Specialist': 'Specjalista ds. Zakupów',
  'Producer': 'Producent',
  'Product Analyst': 'Analityk Produktu',
  'Product Designer': 'Projektant Produktu',
  'Product Manager': 'Menedżer Produktu',
  'Product Marketing Manager': 'Menedżer Marketingu Produktu',
  'Product Owner': 'Product Owner',
  'Production Assistant': 'Asystent Produkcji',
  'Production Engineer': 'Inżynier Produkcji',
  'Production Manager': 'Menedżer Produkcji',
  'Production Supervisor': 'Brygadzista Produkcji',
  'Production Worker': 'Pracownik Produkcji',
  'Professor': 'Profesor',
  'Program Coordinator': 'Koordynator Programu',
  'Program Manager': 'Menedżer Programu',
  'Programmer': 'Programista',
  'Project Coordinator': 'Koordynator Projektów',
  'Project Engineer': 'Inżynier Projektu',
  'Project Manager': 'Kierownik Projektu',
  'Prompt Engineer': 'Inżynier Promptów',
  'Property Manager': 'Zarządca Nieruchomości',
  'Prosthodontist': 'Protetyk Dentystyczny',
  'Psychiatrist': 'Psychiatra',
  'Psychologist': 'Psycholog',
  'Public Affairs Specialist': 'Specjalista ds. Relacji Publicznych',
  'Public Health Inspector': 'Inspektor Zdrowia Publicznego',
  'Public Health Specialist': 'Specjalista Zdrowia Publicznego',
  'Public Relations Manager': 'Menedżer PR',
  'Public Relations Specialist': 'Specjalista PR',
  'Purchasing Agent': 'Agent Zakupowy',
  'Purchasing Manager': 'Menedżer ds. Zakupów',
  'Python Developer': 'Programista Python',
  'QA Analyst': 'Analityk QA',
  'QA Engineer': 'Inżynier QA',
  'QA Manager': 'Menedżer QA',
  'QA Tester': 'Tester QA',
  'Quality Analyst': 'Analityk Jakości',
  'Quality Assurance Analyst': 'Analityk Zapewnienia Jakości',
  'Quality Assurance Manager': 'Menedżer Zapewnienia Jakości',
  'Quality Assurance Specialist': 'Specjalista ds. Zapewnienia Jakości',
  'Quality Control Inspector': 'Inspektor Kontroli Jakości',
  'Quality Engineer': 'Inżynier Jakości',
  'Quality Manager': 'Menedżer Jakości',
  'Radiologic Technologist': 'Technik Radiolog',
  'React Developer': 'Programista React',
  'Reading Specialist': 'Specjalista ds. Czytania',
  'Real Estate Agent': 'Agent Nieruchomości',
  'Real Estate Appraiser': 'Rzeczoznawca Majątkowy',
  'Real Estate Assistant': 'Asystent ds. Nieruchomości',
  'Real Estate Attorney': 'Prawnik ds. Nieruchomości',
  'Real Estate Broker': 'Pośrednik Nieruchomości',
  'Real Estate Investor': 'Inwestor Nieruchomości',
  'Receptionist': 'Recepcjonista',
  'Records Manager': 'Menedżer ds. Dokumentacji',
  'Recreation Coordinator': 'Koordynator Rekreacji',
  'Recruiter': 'Rekruter',
  'Recruiting Coordinator': 'Koordynator Rekrutacji',
  'Registered Nurse': 'Pielęgniarka Dyplomowana',
  'Rehabilitation Counselor': 'Doradca Rehabilitacyjny',
  'Release Engineer': 'Inżynier ds. Wydań',
  'Research Analyst': 'Analityk Badań',
  'Research Assistant': 'Asystent Badań',
  'Research Scientist': 'Naukowiec Badacz',
  'Reservation Agent': 'Agent Rezerwacji',
  'Resident Assistant': 'Asystent Rezydenta',
  'Residential Cleaner': 'Pracownik Sprzątający',
  'Respiratory Therapist': 'Terapeuta Oddechowy',
  'Restaurant General Manager': 'Dyrektor Generalny Restauracji',
  'Restaurant Manager': 'Menedżer Restauracji',
  'Restaurant Server': 'Kelner',
  'Retail Assistant': 'Pracownik Sklepu',
  'Retail Associate': 'Sprzedawca',
  'Retail Buyer': 'Kupiec Detaliczny',
  'Retail Manager': 'Menedżer Sklepu',
  'Retail Pharmacist': 'Farmaceuta Apteczny',
  'Retail Sales Associate': 'Sprzedawca w Sklepie',
  'Retail Store Manager': 'Kierownik Sklepu Detalicznego',
  'Revenue Analyst': 'Analityk Przychodów',
  'Risk Analyst': 'Analityk Ryzyka',
  'Risk Management Specialist': 'Specjalista ds. Zarządzania Ryzykiem',
  'Risk Manager': 'Menedżer Ryzyka',
  'Robotics Engineer': 'Inżynier Robotyki',
  'Roofer': 'Dekarz',
  'Rust Developer': 'Programista Rust',
  'Safety Manager': 'Specjalista BHP',
  'Sales Assistant': 'Asystent Sprzedaży',
  'Sales Associate': 'Sprzedawca',
  'Sales Consultant': 'Konsultant Sprzedaży',
  'Sales Coordinator': 'Koordynator Sprzedaży',
  'Sales Director': 'Dyrektor Sprzedaży',
  'Sales Engineer': 'Inżynier Sprzedaży',
  'Sales Executive': 'Dyrektor ds. Sprzedaży',
  'Sales Manager': 'Menedżer Sprzedaży',
  'Sales Representative': 'Przedstawiciel Handlowy',
  'Salesforce Administrator': 'Administrator Salesforce',
  'Sanitation Worker': 'Pracownik Sanitarny',
  'SAP Consultant': 'Konsultant SAP',
  'School Administrator': 'Administrator Szkoły',
  'School Counselor': 'Pedagog Szkolny',
  'School Nurse': 'Pielęgniarka Szkolna',
  'School Principal': 'Dyrektor Szkoły',
  'School Psychologist': 'Psycholog Szkolny',
  'School Secretary': 'Sekretarka Szkolna',
  'School Social Worker': 'Pracownik Socjalny Szkolny',
  'School Teacher': 'Nauczyciel',
  'Scrum Master': 'Scrum Master',
  'Seaman': 'Marynarz',
  'Security Analyst': 'Analityk Bezpieczeństwa',
  'Security Engineer': 'Inżynier Bezpieczeństwa',
  'Security Guard': 'Pracownik Ochrony',
  'Security Manager': 'Menedżer Bezpieczeństwa',
  'Security Officer': 'Oficer Bezpieczeństwa',
  'SEO Specialist': 'Specjalista SEO',
  'Server': 'Kelner',
  'Service Advisor': 'Doradca Serwisowy',
  'Service Crew': 'Pracownik Obsługi',
  'Set Designer': 'Scenograf',
  'Sheet Metal Worker': 'Blacharz',
  'Shipping & Receiving Clerk': 'Pracownik Spedycji i Odbioru',
  'Shipping Clerk': 'Pracownik Spedycji',
  'Shipping Manager': 'Menedżer Spedycji',
  'Site Engineer': 'Inżynier Budowy',
  'Site Reliability Engineer': 'Inżynier Niezawodności Systemów',
  'Small Business Owner': 'Właściciel Małej Firmy',
  'SOC Analyst': 'Analityk SOC',
  'Social Media Coordinator': 'Koordynator Mediów Społecznościowych',
  'Social Media Manager': 'Menedżer Mediów Społecznościowych',
  'Social Media Specialist': 'Specjalista ds. Mediów Społecznościowych',
  'Social Worker': 'Pracownik Socjalny',
  'Software Architect': 'Architekt Oprogramowania',
  'Software Developer': 'Programista',
  'Software Engineer': 'Inżynier Oprogramowania',
  'Software QA Tester': 'Tester QA Oprogramowania',
  'Software Test Engineer': 'Inżynier Testów Oprogramowania',
  'Software Tester': 'Tester Oprogramowania',
  'Solar Installer': 'Monter Instalacji Fotowoltaicznej',
  'Solution Architect': 'Architekt Rozwiązań',
  'Solutions Architect': 'Architekt Rozwiązań',
  'Solutions Engineer': 'Inżynier Rozwiązań',
  'Sommelier': 'Sommelier',
  'Sonographer': 'Sonograf',
  'Sound Engineer': 'Realizator Dźwięku',
  'Sous Chef': 'Zastępca Szefa Kuchni',
  'Spa Manager': 'Menedżer SPA',
  'Special Education Teacher': 'Nauczyciel Edukacji Specjalnej',
  'Speech Pathologist': 'Logopeda',
  'Speech-Language Pathologist': 'Logopeda',
  'Sports Coach': 'Trener Sportowy',
  'Stage Manager': 'Kierownik Sceny',
  'Sterile Processing Technician': 'Technik Sterylizacji',
  'Store Associate': 'Pracownik Sklepu',
  'Store Manager': 'Kierownik Sklepu',
  'Storyboard Artist': 'Artysta Storyboard',
  'Structural Engineer': 'Inżynier Konstruktor',
  'Substance Abuse Counselor': 'Doradca ds. Uzależnień',
  'Substitute Teacher': 'Nauczyciel Zastępczy',
  'Supply Chain Analyst': 'Analityk Łańcucha Dostaw',
  'Supply Chain Manager': 'Menedżer Łańcucha Dostaw',
  'Support Worker': 'Pracownik Wsparcia',
  'Surgeon': 'Chirurg',
  'Surgical Technologist': 'Technik Chirurgiczny',
  'Surveyor': 'Geodeta',
  'Sushi Chef': 'Szef Kuchni Sushi',
  'Sustainability Consultant': 'Konsultant ds. Zrównoważonego Rozwoju',
  'Swimming Pool Technician': 'Technik Basenowy',
  'System Administrator': 'Administrator Systemu',
  'System Analyst': 'Analityk Systemowy',
  'System Engineer': 'Inżynier Systemowy',
  'Systems Analyst': 'Analityk Systemowy',
  'Systems Engineer': 'Inżynier Systemowy',
  'Talent Acquisition Specialist': 'Specjalista ds. Pozyskiwania Talentów',
  'Tax Analyst': 'Analityk Podatkowy',
  'Tax Preparer': 'Doradca Podatkowy',
  'Teacher': 'Nauczyciel',
  'Teacher Assistant': 'Asystent Nauczyciela',
  'Teaching Assistant': 'Asystent Dydaktyczny',
  'Team Leader': 'Lider Zespołu',
  'Tech Sales Representative': 'Przedstawiciel Handlowy ds. Technologii',
  'Technical Program Manager': 'Menedżer Programu Technicznego',
  'Technical Recruiter': 'Rekruter Techniczny',
  'Technical Support Specialist': 'Specjalista Wsparcia Technicznego',
  'Technical Writer': 'Pisarz Techniczny',
  'Telecommunications Technician': 'Technik Telekomunikacyjny',
  'Therapist': 'Terapeuta',
  'Title Examiner': 'Rzeczoznawca Tytułów',
  'Tour Guide': 'Przewodnik Turystyczny',
  'Translator': 'Tłumacz',
  'Transportation Manager': 'Menedżer Transportu',
  'Travel Agent': 'Agent Turystyczny',
  'Travel Nurse': 'Pielęgniarka Podróżująca',
  'Treasury Analyst': 'Analityk Skarbowy',
  'Truck Driver': 'Kierowca Ciężarówki',
  'TSA Agent': 'Agent TSA',
  'Tutor': 'Korepetytor',
  'UI Designer': 'Projektant UI',
  'Ultrasound Technician': 'Technik Ultrasonografii',
  'Urban Planner': 'Urbanista',
  'Urologist': 'Urolog',
  'UX Designer': 'Projektant UX',
  'UX Researcher': 'Badacz UX',
  'Valet': 'Parkingowy',
  'Valet Attendant': 'Parkingowy',
  'Veterans Service Officer': 'Oficer ds. Weteranów',
  'Veterinarian': 'Weterynarz',
  'Veterinary Assistant': 'Asystent Weterynaryjny',
  'Veterinary Technician': 'Technik Weterynarii',
  'Vice President': 'Wiceprezes',
  'Video Editor': 'Montażysta Video',
  'Video Producer': 'Producent Video',
  'Videographer': 'Videograf',
  'Virtual Assistant': 'Wirtualny Asystent',
  'Visual Merchandiser': 'Visual Merchandiser',
  'Voice Actor': 'Lektor',
  'Volunteer Coordinator': 'Koordynator Wolontariuszy',
  'Waiter/Waitress': 'Kelner/Kelnerka',
  'Warehouse Associate': 'Pracownik Magazynowy',
  'Warehouse Manager': 'Kierownik Magazynu',
  'Warehouse Supervisor': 'Brygadzista Magazynowy',
  'Warehouse Worker': 'Pracownik Magazynu',
  'Web Designer': 'Projektant Stron WWW',
  'Web Developer': 'Programista Stron WWW',
  'Wedding Planner': 'Organizator Wesel',
  'Welder': 'Spawacz',
  'Wellness Coach': 'Coach Wellness',
  'Wellness Coordinator': 'Koordynator Wellness',
  'Wildlife Biologist': 'Biolog Dzikiej Przyrody',
  'Wind Turbine Technician': 'Technik Turbin Wiatrowych',
  'Window Cleaner': 'Mycie Okien',
  'X-Ray Technician': 'Technik RTG',
  'Yoga Instructor': 'Instruktor Jogi',
  'Youth Counselor': 'Doradca Młodzieżowy',
  'Zookeeper': 'Opiekun Zoo',
};

// ─── CATEGORIES (English → Polish) ──────────────────────────────────────────

export const CATEGORIES = {
  Technology: 'Technologia',
  Healthcare: 'Opieka Zdrowotna',
  Trades: 'Rzemiosło i Budownictwo',
  Hospitality: 'Hotelarstwo',
  'Food Service': 'Gastronomia',
  Creative: 'Kreatywne',
  Education: 'Edukacja',
  Government: 'Administracja Publiczna',
  Finance: 'Finanse',
  Marketing: 'Marketing',
  Business: 'Biznes',
  Engineering: 'Inżynieria',
  Sales: 'Sprzedaż',
  Legal: 'Prawo',
  'Real Estate': 'Nieruchomości',
  HR: 'Zasoby Ludzkie',
  Fitness: 'Fitness',
  Management: 'Zarządzanie',
  'Animal Care': 'Opieka nad Zwierzętami',
  Logistics: 'Logistyka',
  'Customer Service': 'Obsługa Klienta',
  Administrative: 'Administracja',
  Transportation: 'Transport',
  Retail: 'Handel Detaliczny',
  Cleaning: 'Sprzątanie',
  'Social Services': 'Usługi Społeczne',
  Manufacturing: 'Produkcja',
  Construction: 'Budownictwo',
  Security: 'Bezpieczeństwo',
  Science: 'Nauka',
  Events: 'Organizacja Wydarzeń',
  'Writing & Content': 'Pisanie i Treści',
  'Supply Chain': 'Łańcuch Dostaw',
  Research: 'Badania',
  Insurance: 'Ubezpieczenia',
  Consulting: 'Consulting',
  Aviation: 'Lotnictwo',
  Automotive: 'Motoryzacja',
  Media: 'Media',
  Maritime: 'Morski',
  'Law Enforcement': 'Służby Mundurowe',
  'Entry-Level': 'Bez Doświadczenia',
  Entertainment: 'Rozrywka',
  Childcare: 'Opieka nad Dziećmi',
  Beauty: 'Uroda',
  Architecture: 'Architektura',
  'Business & Finance': 'Biznes i Finanse',
  'Skilled Trades': 'Rzemiosło Specjalistyczne',
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
  Technology: (job) => `Skuteczne CV ${job} to znacznie więcej niż lista opanowanych technologii. Pokazuje zdolność rozwiązywania realnych problemów, mierzy wpływ Twojej pracy i podkreśla zrozumienie wyzwań technicznych na danym stanowisku. Rekruterzy IT w Polsce zwracają szczególną uwagę na projekty, wyniki i umiejętność pracy w zespołach Agile.`,
  Healthcare: (job) => `Rekruterzy w ochronie zdrowia szukają kandydatów potrafiących wykazać solidne kompetencje kliniczne i autentyczne zaangażowanie w dobro pacjentów. Twoje CV ${job} powinno równoważyć wiedzę techniczną z cechami interpersonalnymi — i spełniać wymogi NFZ oraz polskich standardów kwalifikacji medycznych.`,
  Finance: (job) => `Rekruterzy w finansach priorytetowo traktują kandydatów potrafiących przekształcić złożone dane w strategiczne decyzje. CV ${job} powinno demonstrować rygor analityczny, dbałość o szczegóły i solidną znajomość polskich regulacji finansowych i podatkowych.`,
  Education: (job) => `Pracodawcy w edukacji szukają profesjonalistów, którzy potrafią inspirować do nauki i dostosować się do różnych potrzeb uczniów. Twoje CV ${job} powinno odzwierciedlać wiedzę pedagogiczną, znajomość podstawy programowej i zaangażowanie w sukces edukacyjny.`,
  'Food Service': (job) => `Pracodawcy w gastronomii cenią niezawodność, ducha zespołowego i pasję do zawodu. CV ${job} powinno podkreślać Twoje kompetencje kulinarne i zdolność do pracy pod presją — branża gastronomiczna w Polsce szybko się rozwija i wymaga doświadczonych specjalistów.`,
  Hospitality: (job) => `Branża hotelarska ceni ciepłe podejście do gości, dbałość o szczegóły i elegancję pod presją. Twoje CV ${job} powinno odzwierciedlać orientację na obsługę i zdolność tworzenia niezapomnianych doświadczeń dla gości — szczególnie ważne w dynamicznie rozwijającym się polskim sektorze turystycznym.`,
  Trades: (job) => `Pracodawcy cenią wykwalifikowanych pracowników potrafiących pracować samodzielnie i dostarczać produkty wysokiej jakości. CV ${job} powinno podkreślać Twoje praktyczne doświadczenie, świadomość BHP i umiejętność rozwiązywania problemów w terenie. Uprawnienia budowlane i certyfikaty są kluczowe na polskim rynku.`,
  Creative: (job) => `Najlepsi profesjonaliści kreatywni łączą doskonałość artystyczną z rozumieniem potrzeb klienta. CV ${job} powinno prezentować Twoją wizję twórczą, jednocześnie demonstrując zmysł komercyjny i zdolność do realizacji projektów w terminie i budżecie.`,
  Administrative: (job) => `Pracodawcy szukają kandydatów potrafiących przewidywać potrzeby, proaktywnie rozwiązywać problemy i zachowywać poufność. Skuteczne CV ${job} demonstruje doskonałość organizacyjną i zdolność zapewnienia sprawnego funkcjonowania biura.`,
  Sales: (job) => `Twoje CV to Twoja pierwsza prezentacja handlowa, a menedżerowie rekrutacyjni oceniają je właśnie w taki sposób. Najskuteczniejsze CV ${job} pokazuje, że rozumiesz wyzwania handlowe firmy i możesz przyczynić się do realizacji jej celów sprzedażowych.`,
  Marketing: (job) => `Marketing ewoluuje szybko, a rekruterzy szukają kandydatów biegłych zarówno w strategii, jak i egzekucji. CV ${job} powinno demonstrować zdolność generowania mierzalnych wyników i kreatywność strategiczną, z naciskiem na marketing cyfrowy i media społecznościowe.`,
  HR: (job) => `W przeciwieństwie do innych ról korporacyjnych, funkcje w HR wymagają wykazania zdolności do poruszania się w delikatnych dynamikach organizacyjnych przy jednoczesnym generowaniu konkretnych wyników dla firmy. Znajomość Kodeksu Pracy jest niezbędna.`,
  'Customer Service': (job) => `Stanowiska w obsłudze klienta wymagają wyjątkowych umiejętności komunikacyjnych i autentycznej empatii. CV ${job} powinno demonstrować zdolność do skutecznego rozwiązywania problemów przy zachowaniu pozytywnych relacji z klientami.`,
  Retail: (job) => `Pracodawcy w handlu detalicznym cenią niezawodność, znajomość produktów i autentyczny entuzjazm do obsługi klienta. CV ${job} powinno podkreślać Twoją wydajność sprzedażową i zdolność do prosperowania w dynamicznym środowisku pracy.`,
  Logistics: (job) => `Pracodawcy w logistyce priorytetowo traktują wydajność, precyzję i zdolność zarządzania operacjami wrażliwymi na czas. CV ${job} powinno podkreślać doświadczenie w zarządzaniu magazynem, planowaniu i optymalizacji procesów — kluczowe umiejętności w polskim sektorze e-commerce i dystrybucji.`,
  Government: (job) => `Aplikacje do sektora publicznego wymagają innego podejścia niż sektor prywatny. CV ${job} powinno bezpośrednio odpowiadać wymaganiom ogłoszenia, jednocześnie demonstrując zaangażowanie w służbę publiczną i interes społeczny.`,
  Legal: (job) => `Sektor prawniczy wymaga absolutnej precyzji i skrupulatnej dbałości o szczegóły. CV ${job} powinno odzwierciedlać rygor intelektualny, znajomość polskiego systemu prawnego i zdolność zarządzania złożonymi sprawami.`,
  default: (job) => `Skuteczne CV ${job} koncentruje się na konkretnych osiągnięciach, które demonstrują zdolność do generowania wyników od pierwszego dnia pracy. Łączy istotne doświadczenie z autentycznym entuzjazmem wobec stanowiska.`,
};

// ─── TAGS GENERATOR ─────────────────────────────────────────────────────────

export function generateTags(jobTitle, slug) {
  const lower = jobTitle.toLowerCase();
  return [
    `cv ${lower}`,
    `szablon cv ${lower}`,
    `wzór cv ${lower}`,
    `kreator cv`,
    `cv za darmo`,
    `szablon cv za darmo`,
    `przykład cv`,
    `cv zgodne z ats`,
  ];
}

// ─── FAQ GENERATOR ──────────────────────────────────────────────────────────

export function generateFAQ(jobTitle) {
  const lower = jobTitle.toLowerCase();
  return [
    {
      question: `Jakie umiejętności uwzględnić w CV ${lower}?`,
      answer: `W CV ${lower} podkreśl umiejętności techniczne bezpośrednio związane ze stanowiskiem oraz kompetencje miękkie, takie jak komunikacja i praca zespołowa. Użyj słów kluczowych z ogłoszenia o pracę i popieraj każdą umiejętność konkretnym przykładem osiągnięcia zawodowego.`,
    },
    {
      question: `Jaka powinna być długość CV ${lower}?`,
      answer: `CV ${lower} powinno mieścić się na jednej stronie dla kandydatów z doświadczeniem do 5 lat i może rozciągnąć się do dwóch stron dla seniorów z ponad 10-letnim doświadczeniem. Priorytet ma jakość treści nad ilością — każdy element powinien wnosić wartość.`,
    },
    {
      question: `Jaki format wybrać dla CV ${lower}?`,
      answer: `Format chronologiczny odwrotny jest najbardziej zalecany dla CV ${lower}, ponieważ podkreśla postęp kariery. Użyj profesjonalnego szablonu zgodnego z ATS z wyraźnymi sekcjami: dane osobowe, podsumowanie zawodowe, doświadczenie, wykształcenie i umiejętności.`,
    },
    {
      question: `Jakiego wynagrodzenia oczekiwać na stanowisku ${lower}?`,
      answer: `Wynagrodzenie ${lower} różni się w zależności od doświadczenia, lokalizacji i wielkości firmy. Sprawdź aktualne dane płacowe na Pracuj.pl, No Fluff Jobs lub Glassdoor, aby uzyskać realistyczny przedział dla Twojego regionu. Wymienione w CV ilościowe osiągnięcia wzmacniają pozycję w negocjacjach.`,
    },
    {
      question: `Co powinno zawierać CV ${lower}?`,
      answer: `Kompletne CV ${lower} powinno zawierać dane kontaktowe, wciągające podsumowanie zawodowe, doświadczenie zawodowe z ilościowymi osiągnięciami, wykształcenie, odpowiednie certyfikaty i kluczowe umiejętności. Dostosuj każdą sekcję do konkretnych wymagań stanowiska.`,
    },
  ];
}

// ─── BODY GENERATOR ─────────────────────────────────────────────────────────

export function generateBody(jobTitle, category, keySkills, avgSalary, jobGrowth, slug) {
  const lower = jobTitle.toLowerCase();
  const skills = keySkills || [];
  const topSkills = skills.slice(0, 3).join(', ') || 'kluczowe kompetencje';
  const midSkills = skills.slice(3, 6).join(', ') || 'kompetencje uzupełniające';
  const softSkills = skills.slice(6, 8).join(', ') || 'praca zespołowa, komunikacja';

  const norm = normalizeCategory(category);
  const opener = (CATEGORY_OPENERS[norm] || CATEGORY_OPENERS.default)(jobTitle);

  return `
## Co Wyróżnia CV ${jobTitle}

${opener}

Rekruterzy poświęcają średnio sześć do siedmiu sekund na pierwsze czytanie CV. W przypadku stanowiska ${lower} oznacza to, że Twoje najważniejsze umiejętności i główne osiągnięcia muszą być natychmiast widoczne. Dobrze zbudowane CV — czyli Curriculum Vitae (CV) — nie ogranicza się do wyliczania doświadczeń: opowiada historię Twojej drogi zawodowej i demonstruje wartość, jaką wnosisz do firmy.

## Przykłady Podsumowania Zawodowego

### Bez Doświadczenia / Junior

Zmotywowany ${lower} z solidnym wykształceniem w zakresie ${topSkills || 'kompetencji branżowych'}. Chętny do wnoszenia wkładu w dynamiczny zespół i stosowania wiedzy akademickiej w wymagającym środowisku zawodowym. Wyróżniam się szybkością uczenia się, zmysłem organizacyjnym i determinacją w osiąganiu wyznaczonych celów.

### Doświadczony / Mid

${jobTitle} z ponad 5-letnim doświadczeniem w obszarze ${topSkills}. Udokumentowane wyniki w usprawnianiu procesów i realizacji projektów w wyznaczonych terminach i budżetach. Specjalista w zakresie ${midSkills || 'zaawansowanych kompetencji'}, ze zdolnością do mentoringu młodszych pracowników i prowadzenia inicjatyw ciągłego doskonalenia.

### Senior

Doświadczony ${jobTitle} z ponad 10-letnim stażem w branży, uznany za eksperta w ${topSkills} i ${midSkills || 'zarządzaniu strategicznym'}. Kierował wielodyscyplinarnymi zespołami powyżej 15 osób i koordynował projekty strategiczne, które wygenerowały oszczędności przekraczające 2 mln zł. Zaawansowane kompetencje w ${softSkills || 'przywództwie i myśleniu strategicznym'} z konsekwentną historią przekraczania celów.

## Wynagrodzenie i Perspektywy Zatrudnienia

Średnie wynagrodzenie ${lower} wynosi około **${avgSalary || '8 000–12 000 zł brutto'}** miesięcznie, z istotnymi różnicami w zależności od doświadczenia, lokalizacji i sektora. Perspektywy wzrostu zatrudnienia na tym stanowisku wynoszą **${jobGrowth || '+5%'}** w najbliższych latach.

Kandydaci na poziomie podstawowym mogą oczekiwać wynagrodzenia w przedziale 70–80% mediany, podczas gdy seniorzy lub wyspecjalizowani specjaliści mogą przekraczać ją o 40–60%. Duże miasta (Warszawa, Kraków, Wrocław, Trójmiasto) i sektory o wysokim popycie zazwyczaj oferują wyższe wynagrodzenia.

**Źródła:**
- [Bureau of Labor Statistics (BLS)](https://www.bls.gov/ooh/) — Oficjalne dane o zatrudnieniu i wynagrodzeniach w USA
- [Glassdoor](https://www.glassdoor.com/Salaries/) — Wynagrodzenia zgłaszane przez pracowników i widełki płac
- [PayScale](https://www.payscale.com/research/US/) — Badania płac i porównania według stanowiska

*Rzeczywiste wynagrodzenia różnią się w zależności od doświadczenia, lokalizacji, sektora i wielkości firmy.*

## Kluczowe Umiejętności do Podkreślenia

### Umiejętności Techniczne
${skills.slice(0, 3).map(s => `- **${s}** — Podstawowa kompetencja dla każdego ${lower}, bezpośrednio poszukiwana przez rekruterów i systemy ATS`).join('\n') || '- Znajomość narzędzi i technologii specyficznych dla stanowiska\n- Dogłębna wiedza o metodach i procesach branżowych\n- Zdolność do korzystania z profesjonalnego oprogramowania'}

### Umiejętności Organizacyjne
${skills.slice(3, 6).map(s => `- **${s}** — Kompetencja ceniona w codziennej pracy na stanowisku ${lower}`).join('\n') || '- Zarządzanie czasem i priorytetyzacja zadań\n- Organizacja i planowanie projektów\n- Skrupulatne przestrzeganie procedur'}

### Umiejętności Interpersonalne
${skills.slice(6, 8).map(s => `- **${s}** — Kluczowa cecha interpersonalna dla skutecznego ${lower}`).join('\n') || '- Komunikacja pisemna i ustna\n- Praca zespołowa i współpraca'}
- Adaptacyjność i zdolność do pracy pod presją
- Rozwiązywanie konfliktów i negocjacje

## Osiągnięcia Skupione na Wynikach

Użyj tych przykładów jako szablonów do sformułowania własnych osiągnięć z konkretnymi liczbami:

- Poprawa efektywności operacyjnej o **25%** poprzez optymalizację procesów w ${topSkills || 'kluczowych kompetencjach'}, generując znaczące roczne oszczędności
- Jednoczesne zarządzanie **12+ projektami** z 98% wskaźnikiem terminowości, przekraczając cele zespołu
- Szkolenie i mentoring **8 młodszych kolegów**, przyczyniając się do skrócenia czasu wdrożenia o 40%
- Wdrożenie nowego systemu ${skills[0] || 'zarządzania'}, który zmniejszył błędy o **35%** i poprawił satysfakcję klienta
- Zwiększenie przychodów o **20%** w jednym kwartale dzięki innowacyjnym strategiom w ${skills[1] || 'rozwoju'}
- Osiągnięcie **95%** wskaźnika satysfakcji klienta poprzez wdrożenie ciągłych usprawnień opartych na opiniach użytkowników

## Format i Wskazówki Dotyczące Szablonu CV ${jobTitle}

1. **Użyj formatu chronologicznego odwrotnego** — Umieść najnowsze doświadczenie na pierwszym miejscu. To format preferowany przez rekruterów i systemy ATS dla stanowisk ${lower}.
2. **Dostosuj podsumowanie zawodowe do każdej aplikacji** — Użyj słów kluczowych z ogłoszenia o pracę i spersonalizuj prezentację, aby wykazać, że rozumiesz specyficzne wyzwania stanowiska.
3. **Kwantyfikuj osiągnięcia** — Liczby przyciągają uwagę i czynią Twoje wkłady namacalnymi. Preferuj „zwiększyłem sprzedaż o 30%" zamiast „poprawiłem wyniki handlowe".
4. **Zadbaj o układ** — Użyj marginesów 2,5 cm, profesjonalnej czcionki (Calibri, Arial, Garamond) w rozmiarze 10–12 i wyraźnie oddzielonych sekcji z pogrubionymi tytułami.
5. **Uwzględnij odpowiednie certyfikaty i szkolenia** — Dla stanowiska ${lower} certyfikaty zawodowe i kursy doskonalące demonstrują zaangażowanie w rozwój kompetencji.

## Wskazówka od Menedżera Rekrutacji

> **Najczęstszy błąd w CV ${lower} to brak ilościowych wyników.** Wielu kandydatów opisuje swoje obowiązki, nie pokazując nigdy konkretnego wpływu swojej pracy.

Kiedy rekrutuję ${lower}, szukam namacalnych dowodów na wydajność. Kandydat piszący „zarządzałem zespołem 5 osób" mówi mi mniej niż ten, który pisze „prowadziłem 5-osobowy zespół, osiągając 115% kwartalnych celów przez 4 kolejne kwartały". Każda linia w sekcji doświadczenia powinna odpowiadać na pytanie: jaki mierzalny wynik uzyskałem?

Myśl też o dostosowaniu słownictwa do poszukiwanego sektora. Rekruterzy specjalizujący się w ${category.toLowerCase()} natychmiast rozpoznają ogólne sformułowania zdradzające niespersonalizowane CV.

## Najczęstsze Pytania Rekrutacyjne dla ${jobTitle}

### Czy może Pan/Pani opisać złożony projekt, którym kierował/kierowała Pan/Pani jako ${lower}?

Rekruterzy chcą ocenić Twoją zdolność do zarządzania złożonością. Ustrukturyzuj odpowiedź metodą STAR (Sytuacja, Zadanie, Akcja, Wynik). Opisz kontekst, swoją konkretną rolę, podjęte działania i uzyskane mierzalne wyniki.

### Jak radzi Pan/Pani sobie w sytuacjach presji lub napiętych terminach na stanowisku ${lower}?

Wykaż zdolność do priorytetyzacji i utrzymania wydajności pod presją. Podaj konkretny przykład, w którym musiałeś/aś zarządzać konkurującymi priorytetami, wyjaśnij swoje metodyczne podejście i podziel się uzyskanym pozytywnym wynikiem.

### Jakie są Pana/Pani najmocniejsze umiejętności techniczne związane z tym stanowiskiem ${lower}?

To okazja do podkreślenia swojej ekspertyzy w ${topSkills || 'kluczowych kompetencjach'}. Nie ograniczaj się do wymieniania umiejętności: zilustruj je przykładami konkretnych zastosowań i wyników uzyskanych dzięki tym kompetencjom.

### Jak śledzi Pan/Pani zmiany w swojej branży?

Rekruterzy chcą upewnić się, że inwestujesz w ciągły rozwój zawodowy. Wspomnij o ostatnich szkoleniach, certyfikatach, konferencjach, publikacjach branżowych lub społecznościach, w których aktywnie uczestniczysz.

### Gdzie widzi Pan/Pani siebie za pięć lat w obszarze ${lower}?

Pokaż, że masz jasną wizję swojego rozwoju zawodowego. Wyraź realistyczne ambicje zgodne z możliwościami wzrostu w firmie, demonstrując długoterminowe zaangażowanie w branżę.

## Najczęstsze Błędy do Uniknięcia

### 1. Używanie ogólnego CV niedostosowanego do oferty

Wysyłanie tego samego CV na każdą aplikację to najbardziej dotkliwy błąd. Systemy ATS i rekruterzy natychmiast wykrywają niespersonalizowane CV. Dostosuj podsumowanie zawodowe i słowa kluczowe do każdej oferty ${lower}.

### 2. Opisywanie obowiązków zamiast osiągnięć

Wymienianie codziennych obowiązków nie robi wrażenia na rekruterach. Przekształć każdy punkt w mierzalne osiągnięcie. „Obsługiwałem klientów" staje się „obsługiwałem średnio 85 klientów dziennie z 92% wskaźnikiem rozwiązania problemu przy pierwszym kontakcie".

### 3. Zaniedbanie optymalizacji ATS

Wielu kandydatów na stanowisko ${lower} traci szanse, ponieważ ich CV nie przechodzi przez automatyczne filtry. Unikaj złożonych tabel, nagłówków i stopek oraz grafik, które nie są odczytywane przez systemy ATS.

### 4. Uwzględnianie przestarzałych lub nieistotnych informacji

Doświadczenia sprzed ponad 15 lat lub niezwiązane ze stanowiskiem ${lower} przeciążają CV. Skoncentruj się na ostatnich 10 latach i doświadczeniach bezpośrednio istotnych dla stanowiska.

### 5. Zapominanie o słowach kluczowych specyficznych dla branży

Każda branża ma swój żargon zawodowy. Dla stanowiska ${lower} brak specyficznych terminów technicznych, takich jak ${topSkills || 'kompetencje branżowe'}, może sygnalizować brak ekspertyzy w oczach rekrutera.

## Optymalizacja ATS dla CV ${jobTitle}

Systemy śledzenia kandydatów (ATS) filtrują CV przed ich przejrzeniem przez rekrutera. Aby zmaksymalizować swoje szanse jako ${lower}:

- **Użyj dokładnych słów kluczowych z ogłoszenia** — Jeśli ogłoszenie wspomina „${skills[0] || 'konkretna kompetencja'}", użyj tej dokładnej frazy w swoim CV
- **Użyj prostego, czytelnego formatu** — Unikaj wielu kolumn, tabel i pól tekstowych, które mylą parsery ATS
- **Umieść kluczowe kompetencje w wielu sekcjach** — Wspomnij ${topSkills || 'swoje główne kompetencje'} w podsumowaniu zawodowym, doświadczeniu I sekcji umiejętności
- **Preferuj format PDF lub DOCX** — Te formaty są najlepiej obsługiwane przez nowoczesne systemy ATS
- **Uwzględnij skróty I pełne terminy** — Napisz np. „Zarządzanie Zasobami Ludzkimi (ZZL)" aby pokryć obie warianty wyszukiwania
- **Unikaj nagłówków i stopek** — Niektóre systemy ATS nie odczytują treści umieszczonej w tych obszarach

## Dodatkowe Zasoby

Zapoznaj się z tymi zasobami, aby udoskonalić swoją aplikację na stanowisko ${lower}:

- [Sprawdź zgodność CV z ATS](/pl/tools/ats-checker) — Bezpłatnie przetestuj swoje CV naszym narzędziem analizy ATS
- [Przykłady profesjonalnych CV](/pl/resume-examples) — Przeglądaj setki szablonów według sektora
- [Szablony CV zgodne z ATS](/pl/templates) — Wybierz spośród naszych szablonów zoptymalizowanych pod kątem automatycznych filtrów

Gotowy/a do stworzenia profesjonalnego CV ${lower} zgodnego z ATS? Użyj naszego [kreatora CV za darmo](/pl/builder), aby zbudować skuteczne CV w kilka minut. Nasze szablony są zoptymalizowane pod systemy ATS i prowadzą Cię krok po kroku przez pisanie każdej sekcji.
`;
}
