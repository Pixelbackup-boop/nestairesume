/**
 * Portuguese (pt) locale data for resume example generation.
 * Imported by generate-locale-resume-examples.mjs via:
 *   await import('./locale-data/resume-pt.mjs')
 *
 * Keyword-optimized using seo/portugese-top-300-keywords.csv
 * Top keyword: "modelo de currículo" (500K/month)
 */

const LANG = 'pt';

// ─── CONFIG ─────────────────────────────────────────────────────────────────

export const CONFIG = {
  author: 'Ana Oliveira',
  authorBio: 'Especialista em desenvolvimento de carreira e redação de currículos com mais de 10 anos de experiência ajudando profissionais lusófonos a conquistar o emprego ideal.',
  titlePattern: (job) => `Currículo de ${job}: Modelos, Exemplos e Dicas 2026`,
  descriptionPattern: (job) => `Modelo de currículo de ${job.toLowerCase()} com exemplos compatíveis com ATS e dicas de especialistas. Crie seu currículo profissional e conquiste entrevistas em 2026.`,
  imageAltPattern: (job) => `Exemplo de Currículo de ${job}`,
};

// ─── JOB TITLES (English → Portuguese) ──────────────────────────────────────

export const JOB_TITLES = {
  '3D Artist': 'Artista 3D',
  'Academic Advisor': 'Orientador Acadêmico',
  'Account Executive': 'Executivo de Contas',
  'Account Manager': 'Gerente de Contas',
  'Accountant': 'Contador',
  'Accounting Assistant': 'Assistente Contábil',
  'Accounting Clerk': 'Auxiliar Contábil',
  'Accounting Intern': 'Estagiário de Contabilidade',
  'Accounts Payable Specialist': 'Especialista em Contas a Pagar',
  'Accounts Receivable Specialist': 'Especialista em Contas a Receber',
  'Administrative Assistant': 'Assistente Administrativo',
  'AI Engineer': 'Engenheiro de IA',
  'Android Developer': 'Desenvolvedor Android',
  'Animal Control Officer': 'Agente de Controle Animal',
  'Animal Shelter Worker': 'Funcionário de Abrigo Animal',
  'Animator': 'Animador',
  'Appliance Repair Technician': 'Técnico de Reparação de Eletrodomésticos',
  'Aquarium Keeper': 'Aquarista',
  'Arbitrator': 'Árbitro',
  'Architect': 'Arquiteto',
  'Art Director': 'Diretor de Arte',
  'Assistant Director': 'Diretor Adjunto',
  'Assistant Manager': 'Gerente Assistente',
  'Assistant Property Manager': 'Gerente de Imóveis Assistente',
  'Assistant Store Manager': 'Subgerente de Loja',
  'Athletic Trainer': 'Preparador Físico',
  'Audio Engineer': 'Engenheiro de Áudio',
  'Auditor': 'Auditor',
  'Auto Mechanic': 'Mecânico de Automóveis',
  'Automation Engineer': 'Engenheiro de Automação',
  'Automotive Technician': 'Técnico Automotivo',
  'AWS Cloud Engineer': 'Engenheiro Cloud AWS',
  'AWS Solution Architect': 'Arquiteto de Soluções AWS',
  'Backend Developer': 'Desenvolvedor Backend',
  'Baker': 'Padeiro',
  'Bank Manager': 'Gerente de Banco',
  'Bank Teller': 'Caixa de Banco',
  'Banquet Chef': 'Chef de Banquetes',
  'Barista': 'Barista',
  'Bartender': 'Bartender',
  'Bellhop': 'Mensageiro de Hotel',
  'Billing Specialist': 'Especialista em Faturamento',
  'Blockchain Developer': 'Desenvolvedor Blockchain',
  'Branch Manager': 'Gerente de Agência',
  'Brand Designer': 'Designer de Marca',
  'Budget Analyst': 'Analista Orçamentário',
  'Building Inspector': 'Inspetor de Edificações',
  'Building Maintenance Technician': 'Técnico de Manutenção Predial',
  'Bus Driver': 'Motorista de Ônibus',
  'Business Administration Professional': 'Profissional de Administração de Empresas',
  'Business Analyst': 'Analista de Negócios',
  'Business Consultant': 'Consultor de Negócios',
  'Business Development Executive': 'Executivo de Desenvolvimento de Negócios',
  'Business Development Manager': 'Gerente de Desenvolvimento de Negócios',
  'Business Intelligence Analyst': 'Analista de Business Intelligence',
  'Business Intelligence Specialist': 'Especialista em Business Intelligence',
  'Business Manager': 'Gerente de Negócios',
  'Business Owner': 'Empreendedor',
  'Busser': 'Auxiliar de Salão',
  'Cabin Crew': 'Tripulação de Cabine',
  'Cabinet Maker': 'Marceneiro',
  'Cafeteria Worker': 'Funcionário de Refeitório',
  'Call Center Agent': 'Agente de Call Center',
  'Call Center Representative': 'Atendente de Call Center',
  'Car Sales Associate': 'Vendedor de Automóveis',
  'Caregiver': 'Cuidador',
  'Carpenter': 'Carpinteiro',
  'Carpet Cleaner': 'Limpador de Carpetes',
  'Case Manager': 'Gestor de Casos',
  'Cashier': 'Caixa',
  'Casino Dealer': 'Crupiê',
  'Caterer': 'Fornecedor de Buffet',
  'Catering Manager': 'Gerente de Buffet',
  'Certified Nursing Assistant': 'Auxiliar de Enfermagem Certificado',
  'Certified Nursing Assistant (CNA)': 'Auxiliar de Enfermagem Certificado (CNA)',
  'Change Management Specialist': 'Especialista em Gestão de Mudanças',
  'Chef': 'Chef de Cozinha',
  'Chemical Engineer': 'Engenheiro Químico',
  'Chemist': 'Químico',
  'Chief Information Officer (CIO)': 'Diretor de Tecnologia da Informação (CIO)',
  'Chief of Staff': 'Chefe de Gabinete',
  'Chiropractor': 'Quiroprático',
  'City Planner': 'Urbanista',
  'Civil Engineer': 'Engenheiro Civil',
  'Claims Adjuster': 'Regulador de Sinistros',
  'Client Relations Manager': 'Gerente de Relacionamento com Clientes',
  'Clinical Research Associate': 'Associado de Pesquisa Clínica',
  'Clinical Research Coordinator': 'Coordenador de Pesquisa Clínica',
  'Cloud Architect': 'Arquiteto Cloud',
  'Cloud Engineer': 'Engenheiro Cloud',
  'CNC Machinist': 'Operador CNC',
  'CNC Operator': 'Operador de CNC',
  'Code Enforcement Officer': 'Fiscal de Conformidade',
  'College Admissions Counselor': 'Orientador de Admissões Universitárias',
  'College Professor': 'Professor Universitário',
  'Commercial Cleaner': 'Auxiliar de Limpeza Comercial',
  'Commercial Real Estate Broker': 'Corretor de Imóveis Comerciais',
  'Community Manager': 'Community Manager',
  'Community Outreach Coordinator': 'Coordenador de Relações Comunitárias',
  'Complaints Handler': 'Gestor de Reclamações',
  'Compliance Officer': 'Diretor de Conformidade',
  'Computer Operator': 'Operador de Computador',
  'Computer Science Professional': 'Profissional de Ciência da Computação',
  'Computer Technician': 'Técnico de Informática',
  'Concierge': 'Concierge',
  'Concrete Finisher': 'Pedreiro de Acabamento',
  'Construction Manager': 'Gerente de Obras',
  'Construction Superintendent': 'Superintendente de Obras',
  'Construction Worker': 'Trabalhador da Construção Civil',
  'Consultant': 'Consultor',
  'Content Creator': 'Criador de Conteúdo',
  'Content Writer': 'Redator de Conteúdo',
  'Contract Specialist': 'Especialista em Contratos',
  'Contracts Specialist': 'Especialista em Contratos',
  'Controller': 'Controller Financeiro',
  'Copywriter': 'Redator Publicitário',
  'Corporate Security Manager': 'Gerente de Segurança Corporativa',
  'Correctional Officer': 'Agente Penitenciário',
  'Court Clerk': 'Escrivão Judicial',
  'Court Reporter': 'Estenógrafo Judicial',
  'Creative Director': 'Diretor de Criação',
  'Crisis Counselor': 'Conselheiro de Crise',
  'Cruise Ship Worker': 'Funcionário de Navio de Cruzeiro',
  'Curriculum Developer': 'Desenvolvedor de Currículo Escolar',
  'Customer Experience Specialist': 'Especialista em Experiência do Cliente',
  'Customer Service Representative': 'Representante de Atendimento ao Cliente',
  'Customer Success Manager': 'Gerente de Sucesso do Cliente',
  'Customer Success Specialist': 'Especialista em Sucesso do Cliente',
  'Customer Support Specialist': 'Especialista de Suporte ao Cliente',
  'Customs Officer': 'Agente Aduaneiro',
  'Cybersecurity Analyst': 'Analista de Segurança Cibernética',
  'Data Analyst': 'Analista de Dados',
  'Data Architect': 'Arquiteto de Dados',
  'Data Engineer': 'Engenheiro de Dados',
  'Data Entry Clerk': 'Auxiliar de Digitação',
  'Data Entry Operator': 'Operador de Entrada de Dados',
  'Data Entry Specialist': 'Especialista em Entrada de Dados',
  'Data Scientist': 'Cientista de Dados',
  'Database Administrator': 'Administrador de Banco de Dados',
  'Delivery Driver': 'Motorista de Entregas',
  'Dental Assistant': 'Auxiliar de Dentista',
  'Dental Hygienist': 'Higienista Dental',
  'Dental Office Manager': 'Gerente de Consultório Odontológico',
  'Dentist': 'Dentista',
  'Design Engineer': 'Engenheiro de Projeto',
  'Desktop Support Engineer': 'Engenheiro de Suporte Desktop',
  'Desktop Support Technician': 'Técnico de Suporte Desktop',
  'DevOps Engineer': 'Engenheiro DevOps',
  'Dialysis Technician': 'Técnico de Diálise',
  'Diesel Mechanic': 'Mecânico Diesel',
  'Dietary Aide': 'Auxiliar de Nutrição',
  'Dietitian': 'Nutricionista',
  'Digital Marketer': 'Profissional de Marketing Digital',
  'Digital Marketing Manager': 'Gerente de Marketing Digital',
  'Digital Marketing Specialist': 'Especialista em Marketing Digital',
  'Dishwasher': 'Auxiliar de Cozinha',
  'Dispatcher': 'Despachante',
  'District Manager': 'Gerente Distrital',
  'Doctor': 'Médico',
  'Dog Trainer': 'Adestrador de Cães',
  'Driver': 'Motorista',
  'Drywall Installer': 'Instalador de Drywall',
  'Editor': 'Editor',
  'Education Consultant': 'Consultor Educacional',
  'Educational Technologist': 'Tecnólogo Educacional',
  'Electrical Engineer': 'Engenheiro Eletricista',
  'Electrical Technician': 'Técnico Eletricista',
  'Electrician': 'Eletricista',
  'Elementary Teacher': 'Professor do Ensino Fundamental',
  'Elevator Technician': 'Técnico de Elevadores',
  'Embedded Systems Engineer': 'Engenheiro de Sistemas Embarcados',
  'Emergency Management Coordinator': 'Coordenador de Gestão de Emergências',
  'EMT': 'Socorrista',
  'Engineering Manager': 'Gerente de Engenharia',
  'Environmental Compliance Officer': 'Responsável de Conformidade Ambiental',
  'Epidemiologist': 'Epidemiologista',
  'Escrow Officer': 'Agente de Custódia',
  'ESL Teacher': 'Professor de Inglês como Segunda Língua',
  'Ethical Hacker': 'Hacker Ético',
  'Event Coordinator': 'Coordenador de Eventos',
  'Event Manager': 'Gerente de Eventos',
  'Event Planner': 'Planejador de Eventos',
  'Executive Assistant': 'Assistente Executivo',
  'Executive Chef': 'Chef Executivo',
  'Executive Director': 'Diretor Executivo',
  'Exercise Physiologist': 'Fisiologista do Exercício',
  'Facilities Manager': 'Gerente de Facilities',
  'Family Services Worker': 'Assistente de Serviços Familiares',
  'Farm Manager': 'Gerente de Fazenda',
  'Farm Worker': 'Trabalhador Rural',
  'Fashion Designer': 'Estilista',
  'Fast Food Worker': 'Atendente de Fast Food',
  'Fence Installer': 'Instalador de Cercas',
  'Film Director': 'Diretor de Cinema',
  'Film Editor': 'Editor de Vídeo',
  'Finance Manager': 'Gerente Financeiro',
  'Financial Advisor': 'Consultor Financeiro',
  'Financial Analyst': 'Analista Financeiro',
  'Financial Controller': 'Controller Financeiro',
  'Financial Planner': 'Planejador Financeiro',
  'Fire Inspector': 'Inspetor de Incêndio',
  'Firefighter': 'Bombeiro',
  'First Officer': 'Primeiro Oficial',
  'Fish and Game Warden': 'Fiscal Ambiental',
  'Fitness Center Manager': 'Gerente de Academia',
  'Fitness Instructor': 'Instrutor de Fitness',
  'Fitness Trainer': 'Personal Trainer',
  'Fleet Manager': 'Gerente de Frota',
  'Flight Attendant': 'Comissário de Bordo',
  'Flight Engineer': 'Engenheiro de Voo',
  'Floor Installer': 'Instalador de Pisos',
  'Floor Manager': 'Gerente de Salão',
  'Florist': 'Florista',
  'Food Expeditor': 'Expedidor de Alimentos',
  'Food Inspector': 'Inspetor de Alimentos',
  'Food Runner': 'Runner de Restaurante',
  'Food Safety Manager': 'Gerente de Segurança Alimentar',
  'Food Scientist': 'Cientista de Alimentos',
  'Food Server': 'Atendente de Restaurante',
  'Food Service Director': 'Diretor de Serviços de Alimentação',
  'Food Service Manager': 'Gerente de Serviços de Alimentação',
  'Food Service Worker': 'Auxiliar de Alimentação',
  'Food Stylist': 'Food Stylist',
  'Food Truck Operator': 'Operador de Food Truck',
  'Foreman': 'Encarregado de Obra',
  'Forensic Accountant': 'Contador Forense',
  'Forklift Operator': 'Operador de Empilhadeira',
  'Freelance Writer': 'Redator Freelancer',
  'Freight Broker': 'Corretor de Fretes',
  'Front Desk Agent': 'Recepcionista de Hotel',
  'Front Desk Manager': 'Gerente de Recepção',
  'Front Desk Receptionist': 'Recepcionista',
  'Front End Developer': 'Desenvolvedor Front-End',
  'Frontend Developer': 'Desenvolvedor Frontend',
  'Full Stack Developer': 'Desenvolvedor Full Stack',
  'Fundraiser': 'Captador de Recursos',
  'Funeral Director': 'Diretor Funerário',
  'Game Designer': 'Designer de Jogos',
  'Game Developer': 'Desenvolvedor de Jogos',
  'Garbage Collector': 'Coletor de Lixo',
  'Gardener': 'Jardineiro',
  'General Manager': 'Gerente Geral',
  'Genetic Counselor': 'Conselheiro Genético',
  'Geologist': 'Geólogo',
  'GIS Analyst': 'Analista de Geoprocessamento',
  'Glazier': 'Vidraceiro',
  'Go Developer': 'Desenvolvedor Go',
  'Government Employee': 'Servidor Público',
  'Grants Manager': 'Gerente de Subvenções',
  'Graphic Designer': 'Designer Gráfico',
  'Grocery Store Clerk': 'Atendente de Supermercado',
  'Group Fitness Instructor': 'Instrutor de Ginástica em Grupo',
  'Guidance Counselor': 'Orientador Escolar',
  'Gym Trainer': 'Instrutor de Academia',
  'Hairdresser': 'Cabeleireiro',
  'Hairstylist': 'Cabeleireiro',
  'Head Cook': 'Cozinheiro Chefe',
  'Health Coach': 'Coach de Saúde',
  'Health Educator': 'Educador de Saúde',
  'Health Inspector': 'Inspetor Sanitário',
  'Healthcare Administrator': 'Administrador de Saúde',
  'Healthcare Consultant': 'Consultor de Saúde',
  'Heavy Equipment Operator': 'Operador de Máquinas Pesadas',
  'Help Desk Analyst': 'Analista de Help Desk',
  'Help Desk Technician': 'Técnico de Help Desk',
  'High School Teacher': 'Professor do Ensino Médio',
  'Home Health Aide': 'Cuidador Domiciliar',
  'Home Inspector': 'Inspetor Residencial',
  'Hospice Nurse': 'Enfermeiro de Cuidados Paliativos',
  'Hospital Administrator': 'Administrador Hospitalar',
  'Hospital Housekeeper': 'Auxiliar de Limpeza Hospitalar',
  'Hospitality Manager': 'Gerente de Hotelaria',
  'Host/Hostess': 'Recepcionista de Restaurante',
  'Hotel Front Desk Agent': 'Agente de Recepção de Hotel',
  'Hotel Front Desk Clerk': 'Recepcionista de Hotel',
  'Hotel General Manager': 'Gerente Geral de Hotel',
  'Hotel Housekeeper': 'Camareira de Hotel',
  'Hotel Manager': 'Gerente de Hotel',
  'House Cleaner': 'Faxineiro',
  'Housekeeper': 'Governanta',
  'Housekeeping Supervisor': 'Supervisor de Limpeza',
  'HR Assistant': 'Assistente de RH',
  'HR Business Partner': 'Business Partner de RH',
  'HR Coordinator': 'Coordenador de RH',
  'HR Director': 'Diretor de RH',
  'HR Executive': 'Executivo de RH',
  'HR Generalist': 'Generalista de RH',
  'HR Manager': 'Gerente de RH',
  'HR Recruiter': 'Recrutador de RH',
  'HR Specialist': 'Especialista em RH',
  'HVAC Technician': 'Técnico de Climatização',
  'Illustrator': 'Ilustrador',
  'Immigration Consultant': 'Consultor de Imigração',
  'Immigration Lawyer': 'Advogado de Imigração',
  'Implementation Specialist': 'Especialista de Implantação',
  'Industrial Designer': 'Designer Industrial',
  'Industrial Engineer': 'Engenheiro Industrial',
  'Industrial Maintenance Technician': 'Técnico de Manutenção Industrial',
  'Information Security Analyst': 'Analista de Segurança da Informação',
  'Inside Sales Representative': 'Representante de Vendas Internas',
  'Instructional Coach': 'Coordenador Pedagógico',
  'Instructional Designer': 'Designer Instrucional',
  'Insulation Worker': 'Isolador Térmico',
  'Insurance Agent': 'Corretor de Seguros',
  'Insurance Underwriter': 'Subscritor de Seguros',
  'Intelligence Analyst': 'Analista de Inteligência',
  'Interior Designer': 'Designer de Interiores',
  'Intern': 'Estagiário',
  'Interpreter': 'Intérprete',
  'Inventory Manager': 'Gerente de Estoque',
  'Investigator': 'Investigador',
  'Investment Analyst': 'Analista de Investimentos',
  'Investment Banker': 'Banqueiro de Investimentos',
  'iOS Developer': 'Desenvolvedor iOS',
  'Iron Worker': 'Trabalhador de Ferro',
  'Ironworker': 'Ferreiro Industrial',
  'IT Auditor': 'Auditor de TI',
  'IT Consultant': 'Consultor de TI',
  'IT Director': 'Diretor de TI',
  'IT Manager': 'Gerente de TI',
  'IT Project Manager': 'Gerente de Projetos de TI',
  'IT Recruiter': 'Recrutador de TI',
  'IT Security Analyst': 'Analista de Segurança de TI',
  'IT Specialist': 'Especialista em TI',
  'IT Support Specialist': 'Especialista de Suporte de TI',
  'IT Support Technician': 'Técnico de Suporte de TI',
  'IT Technician': 'Técnico de TI',
  'Janitor': 'Auxiliar de Limpeza',
  'Java Developer': 'Desenvolvedor Java',
  'Java Full Stack Developer': 'Desenvolvedor Java Full Stack',
  'JavaScript Developer': 'Desenvolvedor JavaScript',
  'Jeweler': 'Joalheiro',
  'Journalist': 'Jornalista',
  'Junior Developer': 'Desenvolvedor Júnior',
  'K-12 Teacher': 'Professor da Educação Básica',
  'Kitchen Helper': 'Auxiliar de Cozinha',
  'Kitchen Manager': 'Gerente de Cozinha',
  'Lab Assistant': 'Assistente de Laboratório',
  'Lab Technician': 'Técnico de Laboratório',
  'Laboratory Assistant': 'Assistente de Laboratório',
  'Landscape Architect': 'Arquiteto Paisagista',
  'Landscaper': 'Paisagista',
  'Language Teacher': 'Professor de Idiomas',
  'Lawyer': 'Advogado',
  'Lead Generation Specialist': 'Especialista em Geração de Leads',
  'Leasing Agent': 'Agente de Locação',
  'Leasing Consultant': 'Consultor de Locação',
  'Legal Analyst': 'Analista Jurídico',
  'Legal Assistant': 'Assistente Jurídico',
  'Legal Secretary': 'Secretário Jurídico',
  'Legislative Aide': 'Assessor Legislativo',
  'Librarian': 'Bibliotecário',
  'Library Assistant': 'Auxiliar de Biblioteca',
  'Licensed Practical Nurse': 'Técnico de Enfermagem',
  'Licensed Practical Nurse (LPN)': 'Técnico de Enfermagem (LPN)',
  'Lifeguard': 'Salva-vidas',
  'Limousine Driver': 'Motorista de Limusine',
  'Line Cook': 'Cozinheiro de Linha',
  'Litigation Support Specialist': 'Especialista de Suporte a Litígios',
  'Loan Officer': 'Analista de Crédito',
  'Loan Processor': 'Analista de Empréstimos',
  'Locksmith': 'Chaveiro',
  'Logistics Coordinator': 'Coordenador de Logística',
  'Logistics Manager': 'Gerente de Logística',
  'Logistics Specialist': 'Especialista em Logística',
  'Long Haul Truck Driver': 'Caminhoneiro de Longa Distância',
  'Loss Prevention Specialist': 'Especialista em Prevenção de Perdas',
  'Machine Learning Engineer': 'Engenheiro de Machine Learning',
  'Machine Learning Specialist': 'Especialista em Machine Learning',
  'Machine Operator': 'Operador de Máquinas',
  'Maintenance Engineer': 'Engenheiro de Manutenção',
  'Maintenance Manager': 'Gerente de Manutenção',
  'Maintenance Supervisor': 'Supervisor de Manutenção',
  'Maintenance Technician': 'Técnico de Manutenção',
  'Maintenance Worker': 'Funcionário de Manutenção',
  'Makeup Artist': 'Maquiador',
  'Management Analyst': 'Analista de Gestão',
  'Management Consultant': 'Consultor de Gestão',
  'Manufacturing Engineer': 'Engenheiro de Manufatura',
  'Manufacturing Worker': 'Operário de Manufatura',
  'Marine Biologist': 'Biólogo Marinho',
  'Marine Engineer': 'Engenheiro Naval',
  'Market Research Analyst': 'Analista de Pesquisa de Mercado',
  'Marketing Analyst': 'Analista de Marketing',
  'Marketing Assistant': 'Assistente de Marketing',
  'Marketing Coordinator': 'Coordenador de Marketing',
  'Marketing Director': 'Diretor de Marketing',
  'Marketing Executive': 'Executivo de Marketing',
  'Marketing Intern': 'Estagiário de Marketing',
  'Marketing Manager': 'Gerente de Marketing',
  'Marketing Specialist': 'Especialista de Marketing',
  'Marriage and Family Therapist': 'Terapeuta Familiar',
  'Mason': 'Pedreiro',
  'Massage Therapist': 'Massagista',
  'Material Handler': 'Movimentador de Materiais',
  'Materials Engineer': 'Engenheiro de Materiais',
  'Mechanic': 'Mecânico',
  'Mechanical Design Engineer': 'Engenheiro de Projeto Mecânico',
  'Mechanical Engineer': 'Engenheiro Mecânico',
  'Mechanical Technician': 'Técnico Mecânico',
  'Media Buyer': 'Comprador de Mídia',
  'Mediator': 'Mediador',
  'Medical Assistant': 'Assistente Médico',
  'Medical Billing Specialist': 'Especialista em Faturamento Médico',
  'Medical Coder': 'Codificador Médico',
  'Medical Director': 'Diretor Médico',
  'Medical Lab Technician': 'Técnico de Laboratório Médico',
  'Medical Office Assistant': 'Auxiliar de Consultório Médico',
  'Medical Office Manager': 'Gerente de Consultório Médico',
  'Medical Receptionist': 'Recepcionista de Consultório Médico',
  'Medical Records Clerk': 'Auxiliar de Prontuários Médicos',
  'Medical Representative': 'Representante Médico',
  'Medical Sales Representative': 'Representante de Vendas Médicas',
  'Medical Scribe': 'Escriba Médico',
  'Medical Social Worker': 'Assistente Social Médico',
  'Medical Technologist': 'Tecnólogo Médico',
  'Mental Health Counselor': 'Conselheiro de Saúde Mental',
  'Mental Health Technician': 'Técnico de Saúde Mental',
  'Meteorologist': 'Meteorologista',
  'Microbiologist': 'Microbiologista',
  'Middle School Teacher': 'Professor do Ensino Fundamental II',
  'Midwife': 'Parteira',
  'Military Officer': 'Oficial Militar',
  'Millwright': 'Montador Industrial',
  'Minister': 'Ministro Religioso',
  'Mobile Developer': 'Desenvolvedor Mobile',
  'Mortgage Loan Officer': 'Consultor de Crédito Imobiliário',
  'Motion Graphics Designer': 'Designer de Motion Graphics',
  'Moving Company Driver': 'Motorista de Mudanças',
  'MRI Technologist': 'Tecnólogo em Ressonância Magnética',
  'Music Producer': 'Produtor Musical',
  'Music Teacher': 'Professor de Música',
  'Nanny': 'Babá',
  'Network Administrator': 'Administrador de Redes',
  'Network Engineer': 'Engenheiro de Redes',
  'Night Auditor': 'Auditor Noturno',
  'Node.js Developer': 'Desenvolvedor Node.js',
  'Nonprofit Director': 'Diretor de ONG',
  'Nuclear Engineer': 'Engenheiro Nuclear',
  'Nurse': 'Enfermeiro',
  'Nurse Manager': 'Gerente de Enfermagem',
  'Nurse Practitioner': 'Enfermeiro Especialista',
  'Nursing Assistant': 'Auxiliar de Enfermagem',
  'Nursing Home Administrator': 'Administrador de Lar de Idosos',
  'Nutritionist': 'Nutricionista',
  'Occupational Therapist': 'Terapeuta Ocupacional',
  'Occupational Therapy Assistant': 'Assistente de Terapia Ocupacional',
  'Office Administrator': 'Administrador de Escritório',
  'Office Assistant': 'Auxiliar de Escritório',
  'Office Clerk': 'Auxiliar Administrativo',
  'Office Manager': 'Gerente de Escritório',
  'Operations Analyst': 'Analista de Operações',
  'Operations Coordinator': 'Coordenador de Operações',
  'Operations Director': 'Diretor de Operações',
  'Operations Manager': 'Gerente de Operações',
  'Optician': 'Óptico',
  'Optometrist': 'Optometrista',
  'Orthodontist': 'Ortodontista',
  'Outside Sales Representative': 'Representante de Vendas Externas',
  'Painter': 'Pintor',
  'Paralegal': 'Paralegal',
  'Paramedic': 'Paramédico',
  'Park Ranger': 'Guarda Florestal',
  'Parking Attendant': 'Manobrista',
  'Pastry Chef': 'Chef de Confeitaria',
  'Patient Care Technician': 'Técnico de Cuidados ao Paciente',
  'Payroll Specialist': 'Especialista em Folha de Pagamento',
  'Pediatrician': 'Pediatra',
  'Penetration Tester': 'Pentester',
  'Personal Assistant': 'Assistente Pessoal',
  'Personal Banker': 'Gerente de Conta Pessoal',
  'Personal Trainer': 'Personal Trainer',
  'Pest Control Technician': 'Técnico de Controle de Pragas',
  'Pet Groomer': 'Tosador de Animais',
  'Pet Sitter': 'Pet Sitter',
  'Petroleum Engineer': 'Engenheiro de Petróleo',
  'Pharmaceutical Sales Representative': 'Representante Farmacêutico',
  'Pharmacist': 'Farmacêutico',
  'Pharmacy Assistant': 'Auxiliar de Farmácia',
  'Pharmacy Tech': 'Técnico de Farmácia',
  'Pharmacy Technician': 'Técnico de Farmácia',
  'Phlebotomist': 'Flebotomista',
  'Photographer': 'Fotógrafo',
  'Physical Therapist': 'Fisioterapeuta',
  'Physical Therapy Assistant': 'Assistente de Fisioterapia',
  'Physician': 'Médico',
  'Physician Assistant': 'Assistente Médico',
  'Pilates Instructor': 'Instrutor de Pilates',
  'Pilot': 'Piloto',
  'Pipefitter': 'Montador de Tubulações',
  'Pizza Maker': 'Pizzaiolo',
  'Plant Manager': 'Gerente de Fábrica',
  'Platform Engineer': 'Engenheiro de Plataforma',
  'Plumber': 'Encanador',
  'Podcast Producer': 'Produtor de Podcast',
  'Police Dispatcher': 'Despachante Policial',
  'Police Officer': 'Policial',
  'Policy Analyst': 'Analista de Políticas Públicas',
  'Political Scientist': 'Cientista Político',
  'Pool Cleaner': 'Limpador de Piscinas',
  'Pool Technician': 'Técnico de Piscinas',
  'Porter': 'Porteiro',
  'Postal Worker': 'Carteiro',
  'Power BI Developer': 'Desenvolvedor Power BI',
  'Prep Cook': 'Cozinheiro de Preparação',
  'Preschool Teacher': 'Professor de Educação Infantil',
  'Pressure Washer': 'Operador de Lavagem de Alta Pressão',
  'Principal': 'Diretor de Escola',
  'Private Investigator': 'Detetive Particular',
  'Probation Officer': 'Oficial de Condicional',
  'Process Engineer': 'Engenheiro de Processos',
  'Procurement Manager': 'Gerente de Suprimentos',
  'Procurement Specialist': 'Especialista em Compras',
  'Producer': 'Produtor',
  'Product Analyst': 'Analista de Produto',
  'Product Designer': 'Designer de Produto',
  'Product Manager': 'Gerente de Produto',
  'Product Marketing Manager': 'Gerente de Marketing de Produto',
  'Product Owner': 'Product Owner',
  'Production Assistant': 'Assistente de Produção',
  'Production Engineer': 'Engenheiro de Produção',
  'Production Manager': 'Gerente de Produção',
  'Production Supervisor': 'Supervisor de Produção',
  'Production Worker': 'Operário de Produção',
  'Professor': 'Professor',
  'Program Coordinator': 'Coordenador de Programa',
  'Program Manager': 'Gerente de Programa',
  'Programmer': 'Programador',
  'Project Coordinator': 'Coordenador de Projetos',
  'Project Engineer': 'Engenheiro de Projetos',
  'Project Manager': 'Gerente de Projetos',
  'Prompt Engineer': 'Engenheiro de Prompts',
  'Property Manager': 'Gerente de Propriedades',
  'Prosthodontist': 'Protesista Dentário',
  'Psychiatrist': 'Psiquiatra',
  'Psychologist': 'Psicólogo',
  'Public Affairs Specialist': 'Especialista em Relações Institucionais',
  'Public Health Inspector': 'Inspetor de Saúde Pública',
  'Public Health Specialist': 'Especialista em Saúde Pública',
  'Public Relations Manager': 'Gerente de Relações Públicas',
  'Public Relations Specialist': 'Especialista em Relações Públicas',
  'Purchasing Agent': 'Agente de Compras',
  'Purchasing Manager': 'Gerente de Compras',
  'Python Developer': 'Desenvolvedor Python',
  'QA Analyst': 'Analista de QA',
  'QA Engineer': 'Engenheiro de Qualidade',
  'QA Manager': 'Gerente de QA',
  'QA Tester': 'Testador de QA',
  'Quality Analyst': 'Analista de Qualidade',
  'Quality Assurance Analyst': 'Analista de Garantia de Qualidade',
  'Quality Assurance Manager': 'Gerente de Garantia de Qualidade',
  'Quality Assurance Specialist': 'Especialista em Garantia de Qualidade',
  'Quality Control Inspector': 'Inspetor de Controle de Qualidade',
  'Quality Engineer': 'Engenheiro de Qualidade',
  'Quality Manager': 'Gerente de Qualidade',
  'Radiologic Technologist': 'Tecnólogo em Radiologia',
  'React Developer': 'Desenvolvedor React',
  'Reading Specialist': 'Especialista em Leitura',
  'Real Estate Agent': 'Corretor de Imóveis',
  'Real Estate Appraiser': 'Avaliador de Imóveis',
  'Real Estate Assistant': 'Assistente Imobiliário',
  'Real Estate Attorney': 'Advogado Imobiliário',
  'Real Estate Broker': 'Corretor de Imóveis',
  'Real Estate Investor': 'Investidor Imobiliário',
  'Receptionist': 'Recepcionista',
  'Records Manager': 'Gerente de Registros',
  'Recreation Coordinator': 'Coordenador de Recreação',
  'Recruiter': 'Recrutador',
  'Recruiting Coordinator': 'Coordenador de Recrutamento',
  'Registered Nurse': 'Enfermeiro Registrado',
  'Rehabilitation Counselor': 'Conselheiro de Reabilitação',
  'Release Engineer': 'Engenheiro de Release',
  'Research Analyst': 'Analista de Pesquisa',
  'Research Assistant': 'Assistente de Pesquisa',
  'Research Scientist': 'Cientista Pesquisador',
  'Reservation Agent': 'Agente de Reservas',
  'Resident Assistant': 'Assistente Residencial',
  'Residential Cleaner': 'Faxineiro Residencial',
  'Respiratory Therapist': 'Terapeuta Respiratório',
  'Restaurant General Manager': 'Gerente Geral de Restaurante',
  'Restaurant Manager': 'Gerente de Restaurante',
  'Restaurant Server': 'Garçom',
  'Retail Assistant': 'Auxiliar de Loja',
  'Retail Associate': 'Vendedor de Varejo',
  'Retail Buyer': 'Comprador de Varejo',
  'Retail Manager': 'Gerente de Varejo',
  'Retail Pharmacist': 'Farmacêutico de Varejo',
  'Retail Sales Associate': 'Vendedor de Loja',
  'Retail Store Manager': 'Gerente de Loja de Varejo',
  'Revenue Analyst': 'Analista de Receita',
  'Risk Analyst': 'Analista de Risco',
  'Risk Management Specialist': 'Especialista em Gestão de Riscos',
  'Risk Manager': 'Gerente de Risco',
  'Robotics Engineer': 'Engenheiro de Robótica',
  'Roofer': 'Telhadista',
  'Rust Developer': 'Desenvolvedor Rust',
  'Safety Manager': 'Gerente de Segurança do Trabalho',
  'Sales Assistant': 'Assistente de Vendas',
  'Sales Associate': 'Vendedor',
  'Sales Consultant': 'Consultor de Vendas',
  'Sales Coordinator': 'Coordenador de Vendas',
  'Sales Director': 'Diretor de Vendas',
  'Sales Engineer': 'Engenheiro de Vendas',
  'Sales Executive': 'Executivo de Vendas',
  'Sales Manager': 'Gerente de Vendas',
  'Sales Representative': 'Representante de Vendas',
  'Salesforce Administrator': 'Administrador Salesforce',
  'Sanitation Worker': 'Agente de Saneamento',
  'SAP Consultant': 'Consultor SAP',
  'School Administrator': 'Administrador Escolar',
  'School Counselor': 'Orientador Escolar',
  'School Nurse': 'Enfermeiro Escolar',
  'School Principal': 'Diretor de Escola',
  'School Psychologist': 'Psicólogo Escolar',
  'School Secretary': 'Secretário Escolar',
  'School Social Worker': 'Assistente Social Escolar',
  'School Teacher': 'Professor',
  'Scrum Master': 'Scrum Master',
  'Seaman': 'Marinheiro',
  'Security Analyst': 'Analista de Segurança',
  'Security Engineer': 'Engenheiro de Segurança',
  'Security Guard': 'Segurança',
  'Security Manager': 'Gerente de Segurança',
  'Security Officer': 'Oficial de Segurança',
  'SEO Specialist': 'Especialista em SEO',
  'Server': 'Garçom',
  'Service Advisor': 'Consultor de Serviços',
  'Service Crew': 'Equipe de Atendimento',
  'Set Designer': 'Cenógrafo',
  'Sheet Metal Worker': 'Caldeireiro',
  'Shipping & Receiving Clerk': 'Auxiliar de Expedição e Recebimento',
  'Shipping Clerk': 'Auxiliar de Expedição',
  'Shipping Manager': 'Gerente de Expedição',
  'Site Engineer': 'Engenheiro de Obra',
  'Site Reliability Engineer': 'Engenheiro de Confiabilidade de Site',
  'Small Business Owner': 'Proprietário de Pequeno Negócio',
  'SOC Analyst': 'Analista SOC',
  'Social Media Coordinator': 'Coordenador de Mídias Sociais',
  'Social Media Manager': 'Gerente de Mídias Sociais',
  'Social Media Specialist': 'Especialista em Mídias Sociais',
  'Social Worker': 'Assistente Social',
  'Software Architect': 'Arquiteto de Software',
  'Software Developer': 'Desenvolvedor de Software',
  'Software Engineer': 'Engenheiro de Software',
  'Software QA Tester': 'Testador de Software QA',
  'Software Test Engineer': 'Engenheiro de Testes de Software',
  'Software Tester': 'Testador de Software',
  'Solar Installer': 'Instalador de Energia Solar',
  'Solution Architect': 'Arquiteto de Soluções',
  'Solutions Architect': 'Arquiteto de Soluções',
  'Solutions Engineer': 'Engenheiro de Soluções',
  'Sommelier': 'Sommelier',
  'Sonographer': 'Ultrassonografista',
  'Sound Engineer': 'Engenheiro de Som',
  'Sous Chef': 'Sous Chef',
  'Spa Manager': 'Gerente de Spa',
  'Special Education Teacher': 'Professor de Educação Especial',
  'Speech Pathologist': 'Fonoaudiólogo',
  'Speech-Language Pathologist': 'Fonoaudiólogo',
  'Sports Coach': 'Treinador Esportivo',
  'Stage Manager': 'Diretor de Palco',
  'Sterile Processing Technician': 'Técnico de Esterilização',
  'Store Associate': 'Atendente de Loja',
  'Store Manager': 'Gerente de Loja',
  'Storyboard Artist': 'Artista de Storyboard',
  'Structural Engineer': 'Engenheiro Estrutural',
  'Substance Abuse Counselor': 'Conselheiro de Dependência Química',
  'Substitute Teacher': 'Professor Substituto',
  'Supply Chain Analyst': 'Analista de Cadeia de Suprimentos',
  'Supply Chain Manager': 'Gerente de Cadeia de Suprimentos',
  'Support Worker': 'Auxiliar de Suporte',
  'Surgeon': 'Cirurgião',
  'Surgical Technologist': 'Tecnólogo Cirúrgico',
  'Surveyor': 'Topógrafo',
  'Sushi Chef': 'Sushi Chef',
  'Sustainability Consultant': 'Consultor de Sustentabilidade',
  'Swimming Pool Technician': 'Técnico de Piscinas',
  'System Administrator': 'Administrador de Sistemas',
  'System Analyst': 'Analista de Sistemas',
  'System Engineer': 'Engenheiro de Sistemas',
  'Systems Analyst': 'Analista de Sistemas',
  'Systems Engineer': 'Engenheiro de Sistemas',
  'Talent Acquisition Specialist': 'Especialista em Aquisição de Talentos',
  'Tax Analyst': 'Analista Tributário',
  'Tax Preparer': 'Preparador de Impostos',
  'Teacher': 'Professor',
  'Teacher Assistant': 'Auxiliar de Professor',
  'Teaching Assistant': 'Auxiliar de Ensino',
  'Team Leader': 'Líder de Equipe',
  'Tech Sales Representative': 'Representante de Vendas de Tecnologia',
  'Technical Program Manager': 'Gerente de Programa Técnico',
  'Technical Recruiter': 'Recrutador Técnico',
  'Technical Support Specialist': 'Especialista de Suporte Técnico',
  'Technical Writer': 'Redator Técnico',
  'Telecommunications Technician': 'Técnico de Telecomunicações',
  'Therapist': 'Terapeuta',
  'Title Examiner': 'Examinador de Títulos',
  'Tour Guide': 'Guia Turístico',
  'Translator': 'Tradutor',
  'Transportation Manager': 'Gerente de Transportes',
  'Travel Agent': 'Agente de Viagens',
  'Travel Nurse': 'Enfermeiro Itinerante',
  'Treasury Analyst': 'Analista de Tesouraria',
  'Truck Driver': 'Caminhoneiro',
  'TSA Agent': 'Agente de Segurança Aeroportuária',
  'Tutor': 'Tutor',
  'UI Designer': 'Designer de UI',
  'Ultrasound Technician': 'Técnico de Ultrassom',
  'Urban Planner': 'Urbanista',
  'Urologist': 'Urologista',
  'UX Designer': 'Designer de UX',
  'UX Researcher': 'Pesquisador de UX',
  'Valet': 'Manobrista',
  'Valet Attendant': 'Manobrista',
  'Veterans Service Officer': 'Oficial de Serviços a Veteranos',
  'Veterinarian': 'Veterinário',
  'Veterinary Assistant': 'Auxiliar Veterinário',
  'Veterinary Technician': 'Técnico Veterinário',
  'Vice President': 'Vice-Presidente',
  'Video Editor': 'Editor de Vídeo',
  'Video Producer': 'Produtor de Vídeo',
  'Videographer': 'Videomaker',
  'Virtual Assistant': 'Assistente Virtual',
  'Visual Merchandiser': 'Visual Merchandiser',
  'Voice Actor': 'Dublador',
  'Volunteer Coordinator': 'Coordenador de Voluntários',
  'Waiter/Waitress': 'Garçom/Garçonete',
  'Warehouse Associate': 'Auxiliar de Armazém',
  'Warehouse Manager': 'Gerente de Armazém',
  'Warehouse Supervisor': 'Supervisor de Armazém',
  'Warehouse Worker': 'Operador de Armazém',
  'Web Designer': 'Web Designer',
  'Web Developer': 'Desenvolvedor Web',
  'Wedding Planner': 'Cerimonialista',
  'Welder': 'Soldador',
  'Wellness Coach': 'Coach de Bem-Estar',
  'Wellness Coordinator': 'Coordenador de Bem-Estar',
  'Wildlife Biologist': 'Biólogo de Vida Selvagem',
  'Wind Turbine Technician': 'Técnico de Turbinas Eólicas',
  'Window Cleaner': 'Limpador de Vidros',
  'X-Ray Technician': 'Técnico de Raio-X',
  'Yoga Instructor': 'Instrutor de Yoga',
  'Youth Counselor': 'Orientador de Jovens',
  'Zookeeper': 'Tratador de Zoológico',
};

// ─── CATEGORIES (English → Portuguese) ──────────────────────────────────────

export const CATEGORIES = {
  Technology: 'Tecnologia',
  Healthcare: 'Saúde',
  Trades: 'Ofícios e Construção',
  Hospitality: 'Hotelaria',
  'Food Service': 'Alimentação',
  Creative: 'Criativo',
  Education: 'Educação',
  Government: 'Governo',
  Finance: 'Finanças',
  Marketing: 'Marketing',
  Business: 'Negócios',
  Engineering: 'Engenharia',
  Sales: 'Vendas',
  Legal: 'Jurídico',
  'Real Estate': 'Imobiliário',
  HR: 'Recursos Humanos',
  Fitness: 'Fitness',
  Management: 'Gestão',
  'Animal Care': 'Cuidados Animais',
  Logistics: 'Logística',
  'Customer Service': 'Atendimento ao Cliente',
  Administrative: 'Administrativo',
  Transportation: 'Transportes',
  Retail: 'Varejo',
  Cleaning: 'Limpeza',
  'Social Services': 'Serviços Sociais',
  Manufacturing: 'Manufatura',
  Construction: 'Construção',
  Security: 'Segurança',
  Science: 'Ciência',
  Events: 'Eventos',
  'Writing & Content': 'Redação e Conteúdo',
  'Supply Chain': 'Cadeia de Suprimentos',
  Research: 'Pesquisa',
  Insurance: 'Seguros',
  Consulting: 'Consultoria',
  Aviation: 'Aviação',
  Automotive: 'Automotivo',
  Media: 'Mídia',
  Maritime: 'Marítimo',
  'Law Enforcement': 'Segurança Pública',
  'Entry-Level': 'Primeiro Emprego',
  Entertainment: 'Entretenimento',
  Childcare: 'Cuidados Infantis',
  Beauty: 'Beleza',
  Architecture: 'Arquitetura',
  'Business & Finance': 'Negócios e Finanças',
  'Skilled Trades': 'Ofícios Especializados',
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
  Technology: (job) => `Um currículo de ${job} eficaz vai muito além de uma simples lista de tecnologias dominadas. Ele demonstra capacidade de resolver problemas reais, quantifica o impacto do seu trabalho e destaca sua compreensão dos desafios técnicos da vaga pretendida.`,
  Healthcare: (job) => `Os recrutadores da área de saúde procuram candidatos capazes de demonstrar competências clínicas sólidas e um compromisso genuíno com o bem-estar dos pacientes. Seu currículo de ${job} deve equilibrar domínio técnico e qualidades humanas.`,
  Finance: (job) => `Os recrutadores em finanças priorizam candidatos capazes de transformar dados complexos em decisões estratégicas. Seu currículo de ${job} deve demonstrar rigor analítico, atenção aos detalhes e bom julgamento em questões financeiras.`,
  Education: (job) => `Os responsáveis pelo recrutamento na educação procuram profissionais capazes de inspirar o aprendizado e se adaptar às necessidades variadas dos alunos. Seu currículo de ${job} deve refletir sua expertise pedagógica e compromisso com o sucesso dos estudantes.`,
  'Food Service': (job) => `Os responsáveis pelo recrutamento em alimentação procuram confiabilidade, espírito de equipe e paixão pelo ofício. Seu currículo de ${job} deve valorizar suas competências técnicas culinárias e sua capacidade de performar sob pressão.`,
  Hospitality: (job) => `O setor hoteleiro valoriza o calor humano, a atenção aos detalhes e a elegância sob pressão. Seu currículo de ${job} deve refletir sua orientação para o serviço e capacidade de criar experiências memoráveis para os hóspedes.`,
  Trades: (job) => `Os empregadores valorizam profissionais qualificados capazes de trabalhar de forma autônoma e entregar um trabalho de qualidade. Seu currículo de ${job} deve destacar sua experiência prática, consciência de segurança e aptidão para resolver problemas no campo.`,
  Creative: (job) => `Os melhores profissionais criativos combinam excelência artística e compreensão das necessidades do cliente. Seu currículo de ${job} deve valorizar sua visão criativa enquanto demonstra senso comercial e capacidade de entregar projetos dentro dos prazos.`,
  Administrative: (job) => `Os empregadores procuram candidatos capazes de antecipar necessidades, resolver problemas proativamente e manter a confidencialidade. Um currículo de ${job} eficaz demonstra excelência organizacional e capacidade de garantir o bom funcionamento das operações.`,
  Sales: (job) => `Seu currículo é sua primeira demonstração comercial, e os gerentes de contratação o avaliam como tal. A abordagem mais eficaz para um currículo de ${job} consiste em mostrar que você compreende os desafios comerciais da empresa e pode contribuir para seus objetivos de faturamento.`,
  Marketing: (job) => `O marketing evolui rapidamente e os recrutadores buscam candidatos que dominem tanto a estratégia quanto a execução. Seu currículo de ${job} deve demonstrar sua capacidade de gerar resultados mensuráveis enquanto mostra criatividade estratégica.`,
  HR: (job) => `Diferente de outros cargos corporativos, as funções em recursos humanos exigem demonstrar sua capacidade de navegar em dinâmicas organizacionais sensíveis enquanto gera resultados concretos para a empresa.`,
  'Customer Service': (job) => `Os cargos em atendimento ao cliente requerem competências excepcionais de comunicação e empatia genuína. Seu currículo de ${job} deve demonstrar sua capacidade de resolver problemas eficientemente mantendo relações positivas com a clientela.`,
  Retail: (job) => `Os empregadores do varejo valorizam confiabilidade, conhecimento dos produtos e entusiasmo genuíno pelo atendimento ao cliente. Seu currículo de ${job} deve destacar seu desempenho comercial e capacidade de prosperar em um ambiente dinâmico.`,
  Logistics: (job) => `Os empregadores em logística priorizam eficiência, precisão e capacidade de gerenciar operações sensíveis a prazos. Seu currículo de ${job} deve destacar sua experiência em gestão de estoque, planejamento e otimização de processos.`,
  Government: (job) => `As candidaturas no setor público exigem uma abordagem diferente do setor privado. Seu currículo de ${job} deve responder diretamente às exigências do edital enquanto demonstra seu compromisso com o serviço público e o interesse coletivo.`,
  Legal: (job) => `O setor jurídico exige precisão absoluta e atenção meticulosa aos detalhes. Seu currículo de ${job} deve refletir rigor intelectual, domínio do quadro regulatório e capacidade de gerenciar dossiês complexos.`,
  default: (job) => `Um currículo de ${job} eficaz se concentra em realizações concretas que demonstram sua capacidade de gerar resultados desde o primeiro dia. Ele combina experiência relevante e entusiasmo genuíno pelo cargo pretendido.`,
};

// ─── TAGS GENERATOR ─────────────────────────────────────────────────────────

export function generateTags(jobTitle, slug) {
  const lower = jobTitle.toLowerCase();
  return [
    `currículo ${lower}`,
    `currículo de ${lower}`,
    `modelo de currículo ${lower}`,
    `exemplo currículo ${lower}`,
    `currículo profissional`,
    `currículo compatível com ats`,
    `modelo de currículo`,
    `fazer currículo`,
  ];
}

// ─── FAQ GENERATOR ──────────────────────────────────────────────────────────

export function generateFAQ(jobTitle) {
  const lower = jobTitle.toLowerCase();
  return [
    {
      question: `Quais competências destacar em um currículo de ${lower}?`,
      answer: `Destaque as competências técnicas diretamente relacionadas ao cargo de ${lower}, além de competências transversais como comunicação e trabalho em equipe. Use as palavras-chave da vaga e sustente cada competência com um exemplo concreto de realização profissional.`,
    },
    {
      question: `Qual o tamanho ideal de um currículo de ${lower}?`,
      answer: `Um currículo de ${lower} deve caber em uma página para perfis iniciantes e intermediários, podendo se estender a duas páginas para perfis seniores com mais de 10 anos de experiência. Priorize a qualidade do conteúdo sobre a quantidade e certifique-se de que cada elemento agregue valor.`,
    },
    {
      question: `Qual formato de currículo escolher para uma vaga de ${lower}?`,
      answer: `O formato cronológico reverso é o mais recomendado para um currículo de ${lower}, pois valoriza sua progressão de carreira. Use um modelo profissional compatível com ATS com seções claras: dados pessoais, resumo profissional, experiência, formação e competências.`,
    },
    {
      question: `Qual salário esperar como ${lower}?`,
      answer: `O salário de um ${lower} varia conforme a experiência, localização e porte da empresa. Consulte dados salariais atualizados em sites como Glassdoor ou PayScale para obter uma faixa realista para sua região. Mencionar realizações quantificadas no currículo fortalece sua posição na negociação salarial.`,
    },
    {
      question: `O que incluir em um currículo de ${lower}?`,
      answer: `Um currículo de ${lower} completo deve incluir seus dados pessoais, um resumo profissional impactante, experiência profissional com realizações quantificadas, formação acadêmica, certificações relevantes e competências-chave. Adapte cada seção às exigências específicas da vaga pretendida.`,
    },
  ];
}

// ─── BODY GENERATOR ─────────────────────────────────────────────────────────

export function generateBody(jobTitle, category, keySkills, avgSalary, jobGrowth, slug) {
  const lower = jobTitle.toLowerCase();
  const skills = keySkills || [];
  const topSkills = skills.slice(0, 3).join(', ') || 'competências-chave';
  const midSkills = skills.slice(3, 6).join(', ') || 'competências complementares';
  const softSkills = skills.slice(6, 8).join(', ') || 'trabalho em equipe, comunicação';

  const norm = normalizeCategory(category);
  const opener = (CATEGORY_OPENERS[norm] || CATEGORY_OPENERS.default)(jobTitle);

  return `
## O Que Diferencia um Currículo de ${jobTitle}

${opener}

Os recrutadores dedicam em média seis a sete segundos à primeira leitura de um currículo. Para uma vaga de ${lower}, isso significa que suas competências mais relevantes e realizações principais devem estar imediatamente visíveis. Um currículo — também conhecido como curriculum vitae (CV) — bem estruturado não se limita a listar experiências: ele conta a história do seu percurso profissional e demonstra o valor que você agrega à empresa.

## Exemplos de Resumo Profissional

### Iniciante

${lower} motivado com formação sólida em ${topSkills || 'competências da área'}. Desejoso de contribuir para uma equipe dinâmica e aplicar conhecimentos acadêmicos em um ambiente profissional exigente. Reconhecido pela capacidade de aprendizado rápido, senso de organização e determinação para atingir os objetivos estabelecidos.

### Intermediário

${jobTitle} com mais de 5 anos de experiência em ${topSkills}. Resultado comprovado na melhoria de processos e entrega de projetos dentro dos prazos e orçamentos estabelecidos. Especialista em ${midSkills || 'competências avançadas'}, com capacidade demonstrada de orientar equipes juniores e conduzir iniciativas de melhoria contínua.

### Sênior

${jobTitle} sênior com mais de 10 anos de experiência no setor, reconhecido pela expertise em ${topSkills} e ${midSkills || 'gestão estratégica'}. Liderou equipes multidisciplinares de mais de 15 pessoas e coordenou projetos estratégicos que geraram economias superiores a R$ 2 milhões. Competências avançadas em ${softSkills || 'liderança e visão estratégica'}, com histórico consistente de superação de metas.

## Salário e Perspectivas de Emprego

O salário médio de um ${lower} é de aproximadamente **${avgSalary || '$50,000'}** por ano, com variações significativas conforme a experiência, localização geográfica e setor de atuação. As perspectivas de crescimento do emprego para este cargo são de **${jobGrowth || '+5%'}** nos próximos anos.

Profissionais iniciantes podem esperar um salário de entrada entre 70% e 80% do salário mediano, enquanto perfis seniores ou especializados podem ultrapassar de 40% a 60% dessa mediana. As regiões metropolitanas e setores com alta demanda geralmente oferecem remunerações superiores.

**Fontes:**
- [Bureau of Labor Statistics (BLS)](https://www.bls.gov/ooh/) — Dados oficiais sobre emprego e salários nos Estados Unidos
- [Glassdoor](https://www.glassdoor.com/Salaries/) — Salários declarados por funcionários e faixas de remuneração
- [PayScale](https://www.payscale.com/research/US/) — Pesquisa salarial e comparações por cargo

*As remunerações reais variam conforme a experiência, localização, setor e porte da empresa.*

## Competências Essenciais a Destacar

### Competências Técnicas
${skills.slice(0, 3).map(s => `- **${s}** — Competência fundamental para todo ${lower}, diretamente buscada por recrutadores e sistemas ATS`).join('\n') || '- Domínio das ferramentas e tecnologias específicas do cargo\n- Conhecimento aprofundado dos métodos e processos do setor\n- Capacidade de utilizar softwares profissionais do mercado'}

### Competências Organizacionais
${skills.slice(3, 6).map(s => `- **${s}** — Competência valorizada no exercício cotidiano do cargo de ${lower}`).join('\n') || '- Gestão do tempo e priorização de tarefas\n- Organização e planejamento de projetos\n- Rigor no acompanhamento de procedimentos'}

### Competências Interpessoais
${skills.slice(6, 8).map(s => `- **${s}** — Qualidade interpessoal essencial para ter sucesso como ${lower}`).join('\n') || '- Comunicação escrita e oral\n- Trabalho em equipe e colaboração'}
- Adaptabilidade e capacidade de trabalhar sob pressão
- Resolução de conflitos e negociação

## Pontos de Realização Focados em Resultados

Use estes exemplos como modelos para formular suas próprias realizações com números concretos:

- Melhoria de **25%** da eficiência operacional por meio da otimização de processos em ${topSkills || 'competências-chave'}, gerando economias anuais significativas
- Gerenciamento simultâneo de **12+ projetos** com taxa de entrega dentro do prazo de 98%, superando as metas da equipe
- Treinamento e orientação de **8 colegas juniores**, contribuindo para reduzir o tempo de integração em 40%
- Implementação de um novo sistema de ${skills[0] || 'gestão'} que reduziu erros em **35%** e melhorou a satisfação do cliente
- Aumento do faturamento em **20%** em um trimestre por meio de estratégias inovadoras em ${skills[1] || 'desenvolvimento'}
- Obtenção de taxa de satisfação do cliente de **95%** implementando melhorias contínuas baseadas em feedback dos usuários

## Formato e Dicas de Modelo para Currículo de ${jobTitle}

1. **Use o formato cronológico reverso** — Coloque sua experiência mais recente em primeiro lugar. Este é o formato preferido pelos recrutadores e sistemas ATS para vagas de ${lower}.
2. **Adapte seu resumo profissional a cada candidatura** — Retome as palavras-chave da vaga e personalize sua apresentação para demonstrar que você compreende os desafios específicos do cargo.
3. **Quantifique suas realizações** — Os números chamam atenção e tornam suas contribuições tangíveis. Prefira "aumentei as vendas em 30%" a "melhorei os resultados comerciais".
4. **Cuide da diagramação** — Use margens de 2,5 cm, uma fonte profissional (Calibri, Arial, Garamond) em tamanho 10-12, e seções claramente delimitadas por títulos em negrito.
5. **Inclua certificações e formações relevantes** — Para uma vaga de ${lower}, certificações profissionais e cursos de atualização demonstram seu compromisso com o desenvolvimento de competências.

## Dica do Gerente de Contratação

> **O erro mais frequente que vejo em currículos de ${lower} é a ausência de resultados quantificados.** Muitos candidatos descrevem suas responsabilidades sem jamais mostrar o impacto concreto do seu trabalho.

Quando recruto um ${lower}, busco provas tangíveis de desempenho. Um candidato que escreve "Gerenciei uma equipe de 5 pessoas" me diz menos do que aquele que escreve "Liderei uma equipe de 5 pessoas, atingindo 115% das metas trimestrais durante 4 trimestres consecutivos". Cada linha da seção de experiência deve responder à pergunta: qual resultado mensurável obtive?

Pense também em adaptar seu vocabulário ao setor almejado. Os recrutadores especializados em ${category.toLowerCase()} identificarão imediatamente os termos genéricos que denunciam um currículo não personalizado.

## Perguntas Comuns de Entrevista para ${jobTitle}

### Pode descrever um projeto complexo que você conduziu como ${lower}?

Os recrutadores querem avaliar sua capacidade de gerenciar a complexidade. Estruture sua resposta pelo método STAR (Situação, Tarefa, Ação, Resultado). Descreva o contexto, seu papel específico, as ações que tomou e os resultados mensuráveis obtidos.

### Como você lida com situações de pressão ou prazos apertados no seu cargo de ${lower}?

Demonstre sua capacidade de priorizar e permanecer performante sob pressão. Dê um exemplo concreto em que teve que gerenciar prioridades conflitantes, explique sua abordagem metódica e compartilhe o resultado positivo obtido.

### Quais são suas competências técnicas mais fortes relacionadas a este cargo de ${lower}?

Esta é a oportunidade de destacar sua expertise em ${topSkills || 'competências-chave'}. Não se limite a listar competências: ilustre-as com exemplos de aplicação concreta e resultados obtidos graças a essas competências.

### Como você se mantém atualizado sobre as evoluções do seu setor?

Os recrutadores querem garantir que você investe no seu desenvolvimento profissional contínuo. Mencione formações recentes, certificações, conferências, publicações profissionais ou comunidades das quais participa ativamente.

### Onde você se vê daqui a cinco anos na área de ${lower}?

Mostre que tem uma visão clara da sua evolução profissional. Expresse ambições realistas alinhadas com as oportunidades de crescimento da empresa, demonstrando seu compromisso de longo prazo no setor.

## Erros Comuns a Evitar

### 1. Usar um currículo genérico não adaptado à vaga

Enviar o mesmo currículo para cada candidatura é o erro mais penalizante. Os sistemas ATS e recrutadores detectam imediatamente um currículo não personalizado. Adapte seu resumo profissional e palavras-chave a cada vaga de ${lower}.

### 2. Descrever tarefas em vez de realizações

Listar suas responsabilidades diárias não impressiona os recrutadores. Transforme cada ponto em uma realização mensurável. "Atendi clientes" se torna "Atendi em média 85 clientes por dia com taxa de resolução no primeiro contato de 92%".

### 3. Negligenciar a otimização ATS

Muitos candidatos à vaga de ${lower} perdem oportunidades porque seu currículo não passa pelos filtros automáticos. Evite tabelas complexas, cabeçalhos e rodapés, e gráficos que não são lidos pelos sistemas ATS.

### 4. Incluir informações obsoletas ou irrelevantes

Experiências com mais de 15 anos ou sem relação com o cargo de ${lower} sobrecarregam seu currículo. Concentre-se nos últimos 10 anos e nas experiências diretamente relevantes para a vaga pretendida.

### 5. Esquecer as palavras-chave específicas do setor

Cada setor tem seu jargão profissional. Para uma vaga de ${lower}, a ausência de termos técnicos específicos como ${topSkills || 'competências da área'} pode sinalizar falta de expertise aos olhos do recrutador.

## Otimização ATS para Currículo de ${jobTitle}

Os sistemas de rastreamento de candidatos (ATS) filtram os currículos antes que um recrutador os examine. Para maximizar suas chances como ${lower}:

- **Retome as palavras-chave exatas da vaga** — Se o anúncio menciona "${skills[0] || 'competência específica'}", use essa formulação exata no seu currículo
- **Use um formato simples e legível** — Evite colunas múltiplas, tabelas e caixas de texto que confundem os parsers ATS
- **Coloque as competências-chave em várias seções** — Mencione ${topSkills || 'suas competências principais'} no resumo profissional, na experiência E na seção de competências
- **Prefira o formato PDF ou DOCX** — Esses formatos são os mais bem suportados pelos sistemas ATS modernos
- **Inclua as siglas E os termos por extenso** — Escreva por exemplo "Gestão de Relacionamento com o Cliente (CRM)" para cobrir as duas variantes de busca
- **Evite cabeçalhos e rodapés** — Alguns ATS não leem o conteúdo colocado nessas áreas

## Recursos Complementares

Consulte estes recursos para aperfeiçoar sua candidatura de ${lower}:

- [Verifique a compatibilidade ATS do seu currículo](/pt/tools/ats-checker) — Teste gratuitamente seu currículo com nossa ferramenta de análise ATS
- [Exemplos de currículos profissionais](/pt/resume-examples) — Navegue por centenas de modelos por setor de atividade
- [Modelos de currículo compatíveis com ATS](/pt/templates) — Escolha entre nossos modelos otimizados para passar pelos filtros automáticos

Pronto para criar um currículo de ${lower} profissional e compatível com ATS? Use nosso [criador de currículo grátis](/pt/builder) para montar um currículo impactante em poucos minutos. Nossos modelos são otimizados para sistemas ATS e guiam você passo a passo na redação de cada seção.
`;
}
