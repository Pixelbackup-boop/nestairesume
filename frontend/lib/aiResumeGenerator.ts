/**
 * AI Resume Generator
 *
 * Generates professional resume content based on user's name and job title.
 * Currently uses smart templates with job-specific content.
 * Can be extended to use real AI APIs (OpenAI, Claude) in the future.
 */

import { ResumeData, Experience, Education, Skill } from '../store/useResumeStore';

export interface OnboardingInput {
    fullName: string;
    jobTitle: string;
    experienceLevel: 'entry' | 'mid' | 'senior' | 'executive';
    locale?: string; // 'en' | 'es' | 'fr' | 'de' | 'ar'
}

// Job category detection for generating relevant content
type JobCategory = 'tech' | 'design' | 'marketing' | 'finance' | 'healthcare' | 'education' | 'sales' | 'hospitality' | 'general';

function detectJobCategory(jobTitle: string): JobCategory {
    const title = jobTitle.toLowerCase();

    if (/developer|engineer|programmer|software|devops|data scientist|data analyst|architect|backend|frontend|fullstack|machine learning|artificial intelligence/.test(title)) {
        return 'tech';
    }
    if (/designer|ux|ui|graphic|creative|artist|visual/.test(title)) {
        return 'design';
    }
    if (/marketing|seo|content|social media|brand|growth|digital/.test(title)) {
        return 'marketing';
    }
    if (/accountant|finance|analyst|investment|banking|cfo|controller/.test(title)) {
        return 'finance';
    }
    if (/nurse|doctor|medical|healthcare|physician|therapist|clinical/.test(title)) {
        return 'healthcare';
    }
    if (/teacher|professor|instructor|educator|tutor|academic/.test(title)) {
        return 'education';
    }
    if (/sales|account executive|business development|representative/.test(title)) {
        return 'sales';
    }
    if (/waiter|waitress|server|bartender|barista|chef|cook|host|hostess|restaurant|food service|busser|dishwasher|catering|hospitality/.test(title)) {
        return 'hospitality';
    }
    return 'general';
}

// Experience years based on level
const experienceYears: Record<OnboardingInput['experienceLevel'], number> = {
    entry: 1,
    mid: 4,
    senior: 8,
    executive: 15,
};

// Job-specific skill sets
const skillsByCategory: Record<JobCategory, string[]> = {
    tech: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'SQL', 'Git', 'AWS', 'Docker', 'REST APIs'],
    design: ['Figma', 'Adobe XD', 'Sketch', 'Photoshop', 'Illustrator', 'Prototyping', 'User Research', 'Wireframing', 'Design Systems', 'Typography'],
    marketing: ['SEO', 'Google Analytics', 'Content Strategy', 'Social Media', 'Email Marketing', 'PPC', 'CRM', 'Copywriting', 'A/B Testing', 'HubSpot'],
    finance: ['Financial Analysis', 'Excel', 'QuickBooks', 'SAP', 'Budgeting', 'Forecasting', 'GAAP', 'Auditing', 'Risk Management', 'Financial Modeling'],
    healthcare: ['Patient Care', 'EMR Systems', 'HIPAA Compliance', 'Clinical Assessment', 'Care Planning', 'Medical Terminology', 'Patient Education', 'Team Collaboration', 'Documentation', 'Critical Thinking'],
    education: ['Curriculum Development', 'Classroom Management', 'Student Assessment', 'Differentiated Instruction', 'Educational Technology', 'Lesson Planning', 'Communication', 'Mentoring', 'Special Education', 'Parent Relations'],
    sales: ['CRM Software', 'Lead Generation', 'Negotiation', 'Cold Calling', 'Pipeline Management', 'Salesforce', 'Account Management', 'Presentation Skills', 'Closing Deals', 'Client Relations'],
    hospitality: ['Customer Service', 'POS Systems', 'Food Safety', 'Cash Handling', 'Menu Knowledge', 'Team Collaboration', 'Multitasking', 'Communication', 'Time Management', 'Conflict Resolution'],
    general: ['Project Management', 'Communication', 'Problem Solving', 'Team Leadership', 'Microsoft Office', 'Time Management', 'Critical Thinking', 'Adaptability', 'Collaboration', 'Organization'],
};

// Locale-specific data
type LocaleData = {
    cities: string[];
    country: string;
    companies: Record<JobCategory, string[]>;
    degrees: Record<JobCategory, { degree: string; school: string }>;
    educationDescription: string;
    yearsText: (years: number) => string;
};

const localeData: Record<string, LocaleData> = {
    en: {
        cities: ['New York', 'San Francisco', 'Chicago', 'Austin', 'Seattle'],
        country: 'USA',
        companies: {
            tech: ['TechCorp Solutions', 'InnovateTech Inc.', 'CloudWorks Systems', 'DataDriven Labs', 'AppForge Digital'],
            design: ['DesignHub Agency', 'CreativeStudio Pro', 'Pixel Perfect Design', 'UX Collective', 'Visual Arts Inc.'],
            marketing: ['GrowthMatrix Agency', 'Brand Elevate Co.', 'Digital Reach Marketing', 'Engage Media Group', 'Impact Marketing Solutions'],
            finance: ['Capital Advisors LLC', 'Sterling Financial Group', 'Apex Accounting Services', 'Investment Partners Inc.', 'Fiscal Solutions Corp'],
            healthcare: ['Metro General Hospital', 'Community Health Center', 'CarePlus Medical Group', 'Wellness Partners Clinic', 'Regional Medical Center'],
            education: ['Lincoln High School', 'Riverside Academy', 'State University', 'Community College District', 'Excellence Learning Center'],
            sales: ['Enterprise Solutions Inc.', 'Global Trade Partners', 'TechSales Pro', 'Business Growth Associates', 'Premier Sales Group'],
            hospitality: ['The Grand Hotel Restaurant', 'Bistro Elegance', 'Riverside Grill & Bar', 'Downtown Dining Co.', 'Coastal Kitchen'],
            general: ['Acme Corporation', 'Global Enterprises', 'Premier Solutions LLC', 'Innovative Industries', 'Excellence Partners'],
        },
        degrees: {
            tech: { degree: 'Bachelor of Science in Computer Science', school: 'University of Technology' },
            design: { degree: 'Bachelor of Fine Arts in Graphic Design', school: 'School of Design' },
            marketing: { degree: 'Bachelor of Business Administration in Marketing', school: 'State Business School' },
            finance: { degree: 'Bachelor of Science in Finance', school: 'College of Business' },
            healthcare: { degree: 'Bachelor of Science in Nursing', school: 'College of Health Sciences' },
            education: { degree: 'Bachelor of Arts in Education', school: 'State Teachers College' },
            sales: { degree: 'Bachelor of Business Administration', school: 'School of Business' },
            hospitality: { degree: 'Certificate in Hospitality Management', school: 'Culinary Institute' },
            general: { degree: 'Bachelor of Arts', school: 'State University' },
        },
        educationDescription: 'Graduated with honors. Active member of professional associations.',
        yearsText: (years) => years === 1 ? '1 year' : `${years}+ years`,
    },
    es: {
        cities: ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Bilbao'],
        country: 'España',
        companies: {
            tech: ['Soluciones TechCorp', 'InnovaTech S.L.', 'CloudWorks España', 'DataLabs Ibérica', 'AppForge Digital'],
            design: ['Agencia DesignHub', 'Estudio Creativo Pro', 'Diseño Pixel Perfect', 'Colectivo UX', 'Artes Visuales S.L.'],
            marketing: ['Agencia GrowthMatrix', 'Elevate Marca S.L.', 'Marketing Digital Reach', 'Engage Media España', 'Soluciones de Impacto'],
            finance: ['Asesores Capital S.L.', 'Grupo Financiero Sterling', 'Servicios Contables Apex', 'Inversiones Partners', 'Soluciones Fiscales'],
            healthcare: ['Hospital General Metro', 'Centro de Salud Comunitario', 'Grupo Médico CarePlus', 'Clínica Bienestar', 'Centro Médico Regional'],
            education: ['Instituto Lincoln', 'Academia Riverside', 'Universidad Estatal', 'Centro de Formación Superior', 'Centro de Excelencia Educativa'],
            sales: ['Enterprise Solutions S.L.', 'Socios Comerciales Globales', 'TechSales Pro', 'Desarrollo de Negocios S.L.', 'Grupo Premier de Ventas'],
            hospitality: ['Restaurante Gran Hotel', 'Bistró Elegancia', 'Riverside Grill & Bar', 'Gastronomía Downtown', 'Cocina Costera'],
            general: ['Corporación Acme', 'Empresas Globales', 'Soluciones Premier S.L.', 'Industrias Innovadoras', 'Socios de Excelencia'],
        },
        degrees: {
            tech: { degree: 'Licenciatura en Ciencias de la Computación', school: 'Universidad de Tecnología' },
            design: { degree: 'Licenciatura en Bellas Artes - Diseño Gráfico', school: 'Escuela de Diseño' },
            marketing: { degree: 'Licenciatura en Administración de Empresas - Marketing', school: 'Escuela de Negocios' },
            finance: { degree: 'Licenciatura en Finanzas', school: 'Facultad de Economía' },
            healthcare: { degree: 'Licenciatura en Enfermería', school: 'Facultad de Ciencias de la Salud' },
            education: { degree: 'Licenciatura en Educación', school: 'Facultad de Educación' },
            sales: { degree: 'Licenciatura en Administración de Empresas', school: 'Escuela de Negocios' },
            hospitality: { degree: 'Certificado en Gestión Hotelera', school: 'Instituto Culinario' },
            general: { degree: 'Licenciatura en Artes', school: 'Universidad Estatal' },
        },
        educationDescription: 'Graduado con honores. Miembro activo de asociaciones profesionales.',
        yearsText: (years) => years === 1 ? '1 año' : `${years}+ años`,
    },
    fr: {
        cities: ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Bordeaux'],
        country: 'France',
        companies: {
            tech: ['TechCorp Solutions', 'InnovaTech SARL', 'CloudWorks France', 'DataLabs Européen', 'AppForge Digital'],
            design: ['Agence DesignHub', 'Studio Créatif Pro', 'Design Pixel Perfect', 'Collectif UX', 'Arts Visuels SARL'],
            marketing: ['Agence GrowthMatrix', 'Brand Elevate SARL', 'Marketing Digital Reach', 'Engage Media France', 'Solutions Impact'],
            finance: ['Conseillers Capital SARL', 'Groupe Financier Sterling', 'Services Comptables Apex', 'Investissements Partners', 'Solutions Fiscales'],
            healthcare: ['Hôpital Général Metro', 'Centre de Santé Communautaire', 'Groupe Médical CarePlus', 'Clinique Bien-être', 'Centre Médical Régional'],
            education: ['Lycée Lincoln', 'Académie Riverside', 'Université d\'État', 'Centre de Formation Supérieure', 'Centre d\'Excellence Éducative'],
            sales: ['Enterprise Solutions SARL', 'Partenaires Commerciaux Globaux', 'TechSales Pro', 'Développement Commercial SARL', 'Groupe Premier Ventes'],
            hospitality: ['Restaurant Grand Hôtel', 'Bistro Élégance', 'Riverside Grill & Bar', 'Gastronomie Downtown', 'Cuisine Côtière'],
            general: ['Corporation Acme', 'Entreprises Globales', 'Solutions Premier SARL', 'Industries Innovantes', 'Partenaires d\'Excellence'],
        },
        degrees: {
            tech: { degree: 'Licence en Informatique', school: 'Université de Technologie' },
            design: { degree: 'Licence en Arts Graphiques', school: 'École de Design' },
            marketing: { degree: 'Licence en Administration des Affaires - Marketing', school: 'École de Commerce' },
            finance: { degree: 'Licence en Finance', school: 'Faculté d\'Économie' },
            healthcare: { degree: 'Licence en Sciences Infirmières', school: 'Faculté des Sciences de la Santé' },
            education: { degree: 'Licence en Éducation', school: 'Faculté d\'Éducation' },
            sales: { degree: 'Licence en Administration des Affaires', school: 'École de Commerce' },
            hospitality: { degree: 'Certificat en Gestion Hôtelière', school: 'Institut Culinaire' },
            general: { degree: 'Licence en Arts', school: 'Université d\'État' },
        },
        educationDescription: 'Diplômé avec mention. Membre actif d\'associations professionnelles.',
        yearsText: (years) => years === 1 ? '1 an' : `${years}+ ans`,
    },
    de: {
        cities: ['Berlin', 'München', 'Hamburg', 'Frankfurt', 'Köln'],
        country: 'Deutschland',
        companies: {
            tech: ['TechCorp Solutions GmbH', 'InnovaTech AG', 'CloudWorks Deutschland', 'DataLabs Europa', 'AppForge Digital'],
            design: ['DesignHub Agentur', 'Kreativstudio Pro', 'Pixel Perfect Design', 'UX Kollektiv', 'Visuelle Kunst GmbH'],
            marketing: ['GrowthMatrix Agentur', 'Brand Elevate GmbH', 'Digital Reach Marketing', 'Engage Media Deutschland', 'Impact Marketing Solutions'],
            finance: ['Capital Berater GmbH', 'Sterling Finanzgruppe', 'Apex Buchhaltungsservice', 'Investment Partners AG', 'Steuerliche Lösungen'],
            healthcare: ['Metro Allgemeines Krankenhaus', 'Gemeinschafts-Gesundheitszentrum', 'CarePlus Medizingruppe', 'Wellness Partner Klinik', 'Regionales Medizinzentrum'],
            education: ['Lincoln Gymnasium', 'Riverside Akademie', 'Staatliche Universität', 'Hochschulzentrum', 'Exzellenz-Lernzentrum'],
            sales: ['Enterprise Solutions GmbH', 'Globale Handelspartner', 'TechSales Pro', 'Business Growth GmbH', 'Premier Vertriebsgruppe'],
            hospitality: ['Grand Hotel Restaurant', 'Bistro Eleganz', 'Riverside Grill & Bar', 'Downtown Gastronomie', 'Küstenküche'],
            general: ['Acme Corporation', 'Globale Unternehmen', 'Premier Solutions GmbH', 'Innovative Industrien', 'Exzellenz Partner'],
        },
        degrees: {
            tech: { degree: 'Bachelor of Science in Informatik', school: 'Technische Universität' },
            design: { degree: 'Bachelor of Arts in Grafikdesign', school: 'Hochschule für Design' },
            marketing: { degree: 'Bachelor in Betriebswirtschaft - Marketing', school: 'Wirtschaftshochschule' },
            finance: { degree: 'Bachelor of Science in Finanzwesen', school: 'Fakultät für Wirtschaft' },
            healthcare: { degree: 'Bachelor of Science in Pflegewissenschaft', school: 'Fakultät für Gesundheitswissenschaften' },
            education: { degree: 'Bachelor of Arts in Pädagogik', school: 'Pädagogische Hochschule' },
            sales: { degree: 'Bachelor in Betriebswirtschaft', school: 'Wirtschaftshochschule' },
            hospitality: { degree: 'Zertifikat in Hotelmanagement', school: 'Kulinarisches Institut' },
            general: { degree: 'Bachelor of Arts', school: 'Staatliche Universität' },
        },
        educationDescription: 'Abschluss mit Auszeichnung. Aktives Mitglied in Berufsverbänden.',
        yearsText: (years) => years === 1 ? '1 Jahr' : `${years}+ Jahre`,
    },
    ar: {
        cities: ['دبي', 'الرياض', 'القاهرة', 'أبوظبي', 'جدة'],
        country: 'الإمارات',
        companies: {
            tech: ['حلول تك كورب', 'إنوفاتك للتقنية', 'كلاود ووركس', 'مختبرات البيانات', 'آب فورج الرقمية'],
            design: ['وكالة ديزاين هب', 'استوديو الإبداع', 'بيكسل بيرفكت للتصميم', 'مجموعة تجربة المستخدم', 'الفنون البصرية'],
            marketing: ['وكالة النمو', 'براند إليفيت', 'التسويق الرقمي', 'إنجيج ميديا', 'حلول التأثير التسويقي'],
            finance: ['مستشارو رأس المال', 'مجموعة ستيرلنج المالية', 'خدمات المحاسبة', 'شركاء الاستثمار', 'الحلول المالية'],
            healthcare: ['مستشفى مترو العام', 'مركز الصحة المجتمعي', 'مجموعة كير بلس الطبية', 'عيادة الصحة', 'المركز الطبي الإقليمي'],
            education: ['مدرسة لينكولن الثانوية', 'أكاديمية ريفرسايد', 'الجامعة الحكومية', 'مركز التعليم العالي', 'مركز التميز التعليمي'],
            sales: ['حلول المؤسسات', 'شركاء التجارة العالمية', 'تك سيلز برو', 'تطوير الأعمال', 'مجموعة المبيعات الرائدة'],
            hospitality: ['مطعم الفندق الكبير', 'بيسترو الأناقة', 'ريفرسايد جريل', 'مطاعم داون تاون', 'المطبخ الساحلي'],
            general: ['شركة أكمي', 'المؤسسات العالمية', 'الحلول الرائدة', 'الصناعات المبتكرة', 'شركاء التميز'],
        },
        degrees: {
            tech: { degree: 'بكالوريوس علوم الحاسب', school: 'جامعة التكنولوجيا' },
            design: { degree: 'بكالوريوس الفنون الجميلة - التصميم الجرافيكي', school: 'كلية التصميم' },
            marketing: { degree: 'بكالوريوس إدارة الأعمال - التسويق', school: 'كلية إدارة الأعمال' },
            finance: { degree: 'بكالوريوس العلوم المالية', school: 'كلية الاقتصاد' },
            healthcare: { degree: 'بكالوريوس علوم التمريض', school: 'كلية العلوم الصحية' },
            education: { degree: 'بكالوريوس التربية', school: 'كلية التربية' },
            sales: { degree: 'بكالوريوس إدارة الأعمال', school: 'كلية إدارة الأعمال' },
            hospitality: { degree: 'شهادة في إدارة الضيافة', school: 'معهد الطهي' },
            general: { degree: 'بكالوريوس الآداب', school: 'الجامعة الحكومية' },
        },
        educationDescription: 'تخرج بمرتبة الشرف. عضو نشط في الجمعيات المهنية.',
        yearsText: (years) => years === 1 ? 'سنة واحدة' : `${years}+ سنوات`,
    },
};

// Get locale data with fallback to English
function getLocaleData(locale?: string): LocaleData {
    return localeData[locale || 'en'] || localeData.en;
}

// Professional summaries by category, level, and locale
type SummaryTemplates = Record<JobCategory, Record<OnboardingInput['experienceLevel'], string>>;

const summaryTemplates: Record<string, SummaryTemplates> = {
    en: {
        tech: {
            entry: 'Motivated {jobTitle} with {years} of hands-on experience in software development. Passionate about writing clean, efficient code and learning new technologies. Eager to contribute to innovative projects and grow as a developer.',
            mid: 'Results-driven {jobTitle} with {years} of experience building scalable applications and leading technical initiatives. Proven track record of delivering high-quality solutions that improve system performance by up to 40%. Strong collaborator with cross-functional teams.',
            senior: 'Experienced {jobTitle} with {years} of expertise in architecting and delivering enterprise-scale solutions. Led teams of 5+ developers, reducing deployment time by 60% through CI/CD implementation. Passionate about mentoring junior developers and driving technical excellence.',
            executive: 'Strategic technology leader with {years} of experience driving digital transformation and technical innovation. Managed budgets exceeding $2M and teams of 20+ engineers. Successfully delivered projects that generated $10M+ in revenue growth.',
        },
        design: {
            entry: 'Creative {jobTitle} with {years} of experience crafting user-centered designs. Skilled in modern design tools and passionate about creating intuitive, visually appealing interfaces.',
            mid: 'Innovative {jobTitle} with {years} of experience creating user-centered digital experiences. Delivered designs that increased user engagement by 35% and reduced bounce rates by 25%.',
            senior: 'Senior {jobTitle} with {years} of experience leading design teams and shaping product vision. Established design systems adopted across 10+ products, improving design consistency by 50%.',
            executive: 'Design executive with {years} of experience building and leading world-class design organizations. Transformed design culture at Fortune 500 companies, driving $5M+ in cost savings.',
        },
        marketing: {
            entry: 'Enthusiastic {jobTitle} with {years} of experience in digital marketing. Skilled in content creation, social media management, and data analysis.',
            mid: 'Data-driven {jobTitle} with {years} of experience executing campaigns that deliver measurable results. Increased organic traffic by 150% and improved conversion rates by 40%.',
            senior: 'Strategic {jobTitle} with {years} of experience leading high-performing marketing teams. Managed $1M+ marketing budgets and delivered campaigns generating 200% ROI.',
            executive: 'Marketing executive with {years} of experience driving revenue growth through innovative marketing strategies. Led global marketing teams and managed $10M+ budgets.',
        },
        finance: {
            entry: 'Detail-oriented {jobTitle} with {years} of experience in financial analysis and reporting. Strong foundation in accounting principles and financial software.',
            mid: 'Analytical {jobTitle} with {years} of experience in financial planning and analysis. Identified cost-saving opportunities resulting in $500K+ annual savings.',
            senior: 'Senior {jobTitle} with {years} of experience leading financial operations and strategy. Managed portfolios worth $50M+ and led teams through successful audits.',
            executive: 'Finance executive with {years} of experience driving financial strategy and operational excellence. Led M&A transactions totaling $100M+ and improved EBITDA margins by 15%.',
        },
        healthcare: {
            entry: 'Compassionate {jobTitle} with {years} of clinical experience providing patient-centered care. Committed to maintaining high standards of care.',
            mid: 'Dedicated {jobTitle} with {years} of experience delivering high-quality patient care. Improved patient satisfaction scores by 30% through enhanced communication protocols.',
            senior: 'Experienced {jobTitle} with {years} of clinical expertise and leadership experience. Led quality improvement initiatives reducing hospital readmissions by 20%.',
            executive: 'Healthcare executive with {years} of experience transforming clinical operations and patient outcomes. Led departments of 50+ staff and managed $5M+ budgets.',
        },
        education: {
            entry: 'Passionate {jobTitle} with {years} of teaching experience committed to student success. Skilled in creating engaging lesson plans and fostering inclusive learning environments.',
            mid: 'Innovative {jobTitle} with {years} of experience developing curriculum that engages diverse learners. Improved student test scores by 25% through differentiated instruction strategies.',
            senior: 'Veteran {jobTitle} with {years} of experience shaping educational outcomes and mentoring colleagues. Developed award-winning programs adopted district-wide.',
            executive: 'Education leader with {years} of experience driving institutional excellence. Secured $2M+ in grants and led accreditation processes.',
        },
        sales: {
            entry: 'Motivated {jobTitle} with {years} of experience in business development. Strong communication skills and customer focus. Eager to exceed targets.',
            mid: 'Results-oriented {jobTitle} with {years} of experience consistently exceeding quotas. Generated $2M+ in new business revenue and maintained 95% client retention rate.',
            senior: 'High-performing {jobTitle} with {years} of experience leading sales teams and driving revenue growth. Managed territories generating $10M+ annually.',
            executive: 'Sales executive with {years} of experience building and scaling high-performance sales organizations. Grew revenue from $5M to $50M and expanded into 3 new markets.',
        },
        hospitality: {
            entry: 'Friendly and energetic {jobTitle} with {years} of experience in fast-paced dining environments. Committed to delivering exceptional customer service.',
            mid: 'Dedicated {jobTitle} with {years} of experience providing outstanding service in high-volume restaurants. Maintained 98% customer satisfaction ratings.',
            senior: 'Experienced {jobTitle} with {years} of expertise in fine dining and high-volume establishments. Trained and mentored 15+ staff members.',
            executive: 'Hospitality professional with {years} of experience managing restaurant operations. Oversaw teams of 30+ staff and increased revenue by 40%.',
        },
        general: {
            entry: 'Motivated {jobTitle} with {years} of professional experience. Strong work ethic, excellent communication skills, and commitment to delivering quality results.',
            mid: 'Accomplished {jobTitle} with {years} of experience driving operational excellence. Improved team efficiency by 30% through process optimization.',
            senior: 'Seasoned {jobTitle} with {years} of experience leading teams and strategic initiatives. Successfully managed projects with budgets up to $1M.',
            executive: 'Executive leader with {years} of experience driving organizational transformation. Led teams of 50+ and managed P&L responsibility of $20M+.',
        },
    },
    es: {
        tech: {
            entry: '{jobTitle} motivado/a con {years} de experiencia práctica en desarrollo de software. Apasionado/a por escribir código limpio y eficiente y aprender nuevas tecnologías.',
            mid: '{jobTitle} orientado/a a resultados con {years} de experiencia construyendo aplicaciones escalables. Historial comprobado de entrega de soluciones que mejoran el rendimiento del sistema en un 40%.',
            senior: '{jobTitle} experimentado/a con {years} de experiencia en arquitectura y entrega de soluciones empresariales. Lideró equipos de más de 5 desarrolladores, reduciendo el tiempo de despliegue en un 60%.',
            executive: 'Líder tecnológico estratégico con {years} de experiencia impulsando la transformación digital. Gestionó presupuestos superiores a $2M y equipos de más de 20 ingenieros.',
        },
        design: {
            entry: '{jobTitle} creativo/a con {years} de experiencia diseñando interfaces centradas en el usuario. Experto/a en herramientas modernas de diseño.',
            mid: '{jobTitle} innovador/a con {years} de experiencia creando experiencias digitales. Diseños que aumentaron la participación del usuario en un 35%.',
            senior: '{jobTitle} senior con {years} de experiencia liderando equipos de diseño. Estableció sistemas de diseño adoptados en más de 10 productos.',
            executive: 'Ejecutivo de diseño con {years} de experiencia construyendo organizaciones de diseño de clase mundial. Ahorro de $5M+ en costos.',
        },
        marketing: {
            entry: '{jobTitle} entusiasta con {years} de experiencia en marketing digital. Habilidades en creación de contenido y gestión de redes sociales.',
            mid: '{jobTitle} orientado/a a datos con {years} de experiencia ejecutando campañas con resultados medibles. Aumentó el tráfico orgánico en un 150%.',
            senior: '{jobTitle} estratégico/a con {years} de experiencia liderando equipos de marketing de alto rendimiento. Gestionó presupuestos de más de $1M.',
            executive: 'Ejecutivo de marketing con {years} de experiencia impulsando el crecimiento de ingresos. Gestionó equipos globales y presupuestos de más de $10M.',
        },
        finance: {
            entry: '{jobTitle} detallista con {years} de experiencia en análisis financiero. Sólida base en principios contables y software financiero.',
            mid: '{jobTitle} analítico/a con {years} de experiencia en planificación financiera. Identificó oportunidades de ahorro de más de $500K anuales.',
            senior: '{jobTitle} senior con {years} de experiencia liderando operaciones financieras. Gestionó carteras de más de $50M.',
            executive: 'Ejecutivo financiero con {years} de experiencia impulsando la estrategia financiera. Lideró transacciones M&A por más de $100M.',
        },
        healthcare: {
            entry: '{jobTitle} compasivo/a con {years} de experiencia clínica proporcionando atención centrada en el paciente.',
            mid: '{jobTitle} dedicado/a con {years} de experiencia brindando atención de alta calidad. Mejoró las puntuaciones de satisfacción del paciente en un 30%.',
            senior: '{jobTitle} experimentado/a con {years} de experiencia clínica y liderazgo. Lideró iniciativas que redujeron los reingresos hospitalarios en un 20%.',
            executive: 'Ejecutivo de salud con {years} de experiencia transformando operaciones clínicas. Lideró departamentos de más de 50 empleados.',
        },
        education: {
            entry: '{jobTitle} apasionado/a con {years} de experiencia docente comprometido/a con el éxito estudiantil.',
            mid: '{jobTitle} innovador/a con {years} de experiencia desarrollando currículos. Mejoró las puntuaciones de los estudiantes en un 25%.',
            senior: '{jobTitle} veterano/a con {years} de experiencia formando resultados educativos. Desarrolló programas premiados adoptados en todo el distrito.',
            executive: 'Líder educativo con {years} de experiencia impulsando la excelencia institucional. Aseguró más de $2M en subvenciones.',
        },
        sales: {
            entry: '{jobTitle} motivado/a con {years} de experiencia en desarrollo de negocios. Fuertes habilidades de comunicación.',
            mid: '{jobTitle} orientado/a a resultados con {years} de experiencia superando cuotas. Generó más de $2M en nuevos ingresos.',
            senior: '{jobTitle} de alto rendimiento con {years} de experiencia liderando equipos de ventas. Gestionó territorios que generan más de $10M anuales.',
            executive: 'Ejecutivo de ventas con {years} de experiencia escalando organizaciones de ventas. Creció los ingresos de $5M a $50M.',
        },
        hospitality: {
            entry: '{jobTitle} amigable y enérgico/a con {years} de experiencia en ambientes de comedor dinámicos. Comprometido/a con un servicio excepcional.',
            mid: '{jobTitle} dedicado/a con {years} de experiencia proporcionando servicio excepcional. Mantuvo una tasa de satisfacción del 98%.',
            senior: '{jobTitle} experimentado/a con {years} de experiencia en restaurantes de alta cocina. Entrenó a más de 15 miembros del personal.',
            executive: 'Profesional de hospitalidad con {years} de experiencia gestionando operaciones de restaurante. Aumentó los ingresos en un 40%.',
        },
        general: {
            entry: '{jobTitle} motivado/a con {years} de experiencia profesional. Fuerte ética de trabajo y excelentes habilidades de comunicación.',
            mid: '{jobTitle} consumado/a con {years} de experiencia impulsando la excelencia operacional. Mejoró la eficiencia del equipo en un 30%.',
            senior: '{jobTitle} experimentado/a con {years} de experiencia liderando equipos e iniciativas estratégicas. Gestionó proyectos de hasta $1M.',
            executive: 'Líder ejecutivo con {years} de experiencia impulsando la transformación organizacional. Lideró equipos de más de 50 personas.',
        },
    },
    fr: {
        tech: {
            entry: '{jobTitle} motivé(e) avec {years} d\'expérience pratique en développement logiciel. Passionné(e) par l\'écriture de code propre et efficace.',
            mid: '{jobTitle} axé(e) sur les résultats avec {years} d\'expérience dans la création d\'applications évolutives. Amélioration des performances système de 40%.',
            senior: '{jobTitle} expérimenté(e) avec {years} d\'expertise en architecture de solutions d\'entreprise. A dirigé des équipes de plus de 5 développeurs.',
            executive: 'Leader technologique stratégique avec {years} d\'expérience dans la transformation numérique. Gestion de budgets de plus de 2M$.',
        },
        design: {
            entry: '{jobTitle} créatif(ve) avec {years} d\'expérience en conception centrée utilisateur. Maîtrise des outils de design modernes.',
            mid: '{jobTitle} innovant(e) avec {years} d\'expérience en création d\'expériences digitales. Augmentation de l\'engagement utilisateur de 35%.',
            senior: '{jobTitle} senior avec {years} d\'expérience en direction d\'équipes de design. Systèmes de design adoptés sur plus de 10 produits.',
            executive: 'Directeur design avec {years} d\'expérience dans la construction d\'organisations de design. Économies de coûts de plus de 5M$.',
        },
        marketing: {
            entry: '{jobTitle} enthousiaste avec {years} d\'expérience en marketing digital. Compétences en création de contenu et gestion des réseaux sociaux.',
            mid: '{jobTitle} orienté(e) données avec {years} d\'expérience en exécution de campagnes. Augmentation du trafic organique de 150%.',
            senior: '{jobTitle} stratégique avec {years} d\'expérience en direction d\'équipes marketing. Gestion de budgets de plus de 1M$.',
            executive: 'Directeur marketing avec {years} d\'expérience en croissance des revenus. Gestion d\'équipes mondiales et budgets de plus de 10M$.',
        },
        finance: {
            entry: '{jobTitle} rigoureux(se) avec {years} d\'expérience en analyse financière. Solide base en principes comptables.',
            mid: '{jobTitle} analytique avec {years} d\'expérience en planification financière. Économies annuelles de plus de 500K$.',
            senior: '{jobTitle} senior avec {years} d\'expérience en direction des opérations financières. Gestion de portefeuilles de plus de 50M$.',
            executive: 'Directeur financier avec {years} d\'expérience en stratégie financière. Transactions M&A de plus de 100M$.',
        },
        healthcare: {
            entry: '{jobTitle} compatissant(e) avec {years} d\'expérience clinique en soins centrés sur le patient.',
            mid: '{jobTitle} dévoué(e) avec {years} d\'expérience en soins de haute qualité. Amélioration de la satisfaction patient de 30%.',
            senior: '{jobTitle} expérimenté(e) avec {years} d\'expertise clinique et leadership. Réduction des réadmissions de 20%.',
            executive: 'Directeur santé avec {years} d\'expérience en transformation des opérations cliniques. Direction de départements de plus de 50 personnes.',
        },
        education: {
            entry: '{jobTitle} passionné(e) avec {years} d\'expérience en enseignement. Engagement pour la réussite des étudiants.',
            mid: '{jobTitle} innovant(e) avec {years} d\'expérience en développement de programmes. Amélioration des résultats de 25%.',
            senior: '{jobTitle} expérimenté(e) avec {years} d\'expérience en formation éducative. Programmes primés adoptés dans tout le district.',
            executive: 'Leader éducatif avec {years} d\'expérience en excellence institutionnelle. Subventions de plus de 2M$.',
        },
        sales: {
            entry: '{jobTitle} motivé(e) avec {years} d\'expérience en développement commercial. Excellentes compétences en communication.',
            mid: '{jobTitle} orienté(e) résultats avec {years} d\'expérience dépassant les quotas. Plus de 2M$ de nouveaux revenus.',
            senior: '{jobTitle} performant(e) avec {years} d\'expérience en direction d\'équipes commerciales. Territoires générant plus de 10M$ annuellement.',
            executive: 'Directeur commercial avec {years} d\'expérience en développement d\'organisations de vente. Croissance de 5M$ à 50M$.',
        },
        hospitality: {
            entry: '{jobTitle} amical(e) et dynamique avec {years} d\'expérience en restauration. Engagement pour un service client exceptionnel.',
            mid: '{jobTitle} dévoué(e) avec {years} d\'expérience en service de haute qualité. Taux de satisfaction de 98%.',
            senior: '{jobTitle} expérimenté(e) avec {years} d\'expertise en gastronomie. Formation de plus de 15 membres du personnel.',
            executive: 'Professionnel de l\'hôtellerie avec {years} d\'expérience en gestion de restaurant. Augmentation des revenus de 40%.',
        },
        general: {
            entry: '{jobTitle} motivé(e) avec {years} d\'expérience professionnelle. Forte éthique de travail et excellentes compétences en communication.',
            mid: '{jobTitle} accompli(e) avec {years} d\'expérience en excellence opérationnelle. Amélioration de l\'efficacité de 30%.',
            senior: '{jobTitle} expérimenté(e) avec {years} d\'expérience en direction d\'équipes. Gestion de projets jusqu\'à 1M$.',
            executive: 'Leader exécutif avec {years} d\'expérience en transformation organisationnelle. Direction d\'équipes de plus de 50 personnes.',
        },
    },
    de: {
        tech: {
            entry: 'Motivierte/r {jobTitle} mit {years} praktischer Erfahrung in der Softwareentwicklung. Leidenschaft für sauberen, effizienten Code.',
            mid: 'Ergebnisorientierte/r {jobTitle} mit {years} Erfahrung im Aufbau skalierbarer Anwendungen. Systemleistung um 40% verbessert.',
            senior: 'Erfahrene/r {jobTitle} mit {years} Expertise in Unternehmensarchitektur. Leitung von Teams mit 5+ Entwicklern.',
            executive: 'Strategische/r Technologieführer/in mit {years} Erfahrung in digitaler Transformation. Verwaltung von Budgets über 2M$.',
        },
        design: {
            entry: 'Kreative/r {jobTitle} mit {years} Erfahrung in nutzerzentriertem Design. Versiert in modernen Design-Tools.',
            mid: 'Innovative/r {jobTitle} mit {years} Erfahrung in digitalen Erlebnissen. Steigerung der Nutzerinteraktion um 35%.',
            senior: 'Senior {jobTitle} mit {years} Erfahrung in der Leitung von Design-Teams. Designsysteme für 10+ Produkte etabliert.',
            executive: 'Design-Führungskraft mit {years} Erfahrung im Aufbau von Design-Organisationen. Kosteneinsparungen von über 5M$.',
        },
        marketing: {
            entry: 'Begeisterte/r {jobTitle} mit {years} Erfahrung im digitalen Marketing. Fähigkeiten in Content-Erstellung und Social Media.',
            mid: 'Datenorientierte/r {jobTitle} mit {years} Erfahrung in Kampagnendurchführung. Organischer Traffic um 150% gesteigert.',
            senior: 'Strategische/r {jobTitle} mit {years} Erfahrung in der Leitung von Marketing-Teams. Verwaltung von Budgets über 1M$.',
            executive: 'Marketing-Führungskraft mit {years} Erfahrung in Umsatzwachstum. Leitung globaler Teams und Budgets über 10M$.',
        },
        finance: {
            entry: 'Detailorientierte/r {jobTitle} mit {years} Erfahrung in Finanzanalyse. Solide Grundlage in Buchhaltungsprinzipien.',
            mid: 'Analytische/r {jobTitle} mit {years} Erfahrung in Finanzplanung. Jährliche Einsparungen von über 500K$ identifiziert.',
            senior: 'Senior {jobTitle} mit {years} Erfahrung in Finanzoperationen. Verwaltung von Portfolios über 50M$.',
            executive: 'Finanz-Führungskraft mit {years} Erfahrung in Finanzstrategie. M&A-Transaktionen über 100M$.',
        },
        healthcare: {
            entry: 'Mitfühlende/r {jobTitle} mit {years} klinischer Erfahrung in patientenzentrierter Pflege.',
            mid: 'Engagierte/r {jobTitle} mit {years} Erfahrung in qualitativ hochwertiger Pflege. Patientenzufriedenheit um 30% verbessert.',
            senior: 'Erfahrene/r {jobTitle} mit {years} klinischer Expertise und Führungserfahrung. Wiederaufnahmen um 20% reduziert.',
            executive: 'Gesundheits-Führungskraft mit {years} Erfahrung in klinischen Operationen. Leitung von Abteilungen mit 50+ Mitarbeitern.',
        },
        education: {
            entry: 'Leidenschaftliche/r {jobTitle} mit {years} Unterrichtserfahrung. Engagement für Studentenerfolg.',
            mid: 'Innovative/r {jobTitle} mit {years} Erfahrung in Lehrplanentwicklung. Testergebnisse um 25% verbessert.',
            senior: 'Erfahrene/r {jobTitle} mit {years} Erfahrung in Bildungsgestaltung. Preisgekrönte Programme distriktweit eingeführt.',
            executive: 'Bildungsleiter/in mit {years} Erfahrung in institutioneller Exzellenz. Zuschüsse über 2M$ gesichert.',
        },
        sales: {
            entry: 'Motivierte/r {jobTitle} mit {years} Erfahrung in Geschäftsentwicklung. Starke Kommunikationsfähigkeiten.',
            mid: 'Ergebnisorientierte/r {jobTitle} mit {years} Erfahrung im Übertreffen von Quoten. Über 2M$ neue Einnahmen generiert.',
            senior: 'Leistungsstarke/r {jobTitle} mit {years} Erfahrung in der Leitung von Vertriebsteams. Territorien mit über 10M$ jährlich.',
            executive: 'Vertriebsleiter/in mit {years} Erfahrung im Aufbau von Vertriebsorganisationen. Umsatzwachstum von 5M$ auf 50M$.',
        },
        hospitality: {
            entry: 'Freundliche/r und energische/r {jobTitle} mit {years} Erfahrung in der Gastronomie. Engagement für exzellenten Service.',
            mid: 'Engagierte/r {jobTitle} mit {years} Erfahrung in hochvolumiger Gastronomie. 98% Kundenzufriedenheit.',
            senior: 'Erfahrene/r {jobTitle} mit {years} Expertise in gehobener Gastronomie. Schulung von 15+ Mitarbeitern.',
            executive: 'Gastro-Profi mit {years} Erfahrung im Restaurantmanagement. Umsatzsteigerung um 40%.',
        },
        general: {
            entry: 'Motivierte/r {jobTitle} mit {years} Berufserfahrung. Starke Arbeitsmoral und ausgezeichnete Kommunikationsfähigkeiten.',
            mid: 'Erfolgreiche/r {jobTitle} mit {years} Erfahrung in operativer Exzellenz. Teameffizienz um 30% verbessert.',
            senior: 'Erfahrene/r {jobTitle} mit {years} Erfahrung in Teamführung. Projektverwaltung bis zu 1M$.',
            executive: 'Führungskraft mit {years} Erfahrung in organisatorischer Transformation. Leitung von Teams mit 50+ Personen.',
        },
    },
    ar: {
        tech: {
            entry: '{jobTitle} متحمس مع {years} من الخبرة العملية في تطوير البرمجيات. شغوف بكتابة كود نظيف وفعال.',
            mid: '{jobTitle} موجه نحو النتائج مع {years} من الخبرة في بناء تطبيقات قابلة للتوسع. تحسين أداء النظام بنسبة 40%.',
            senior: '{jobTitle} ذو خبرة مع {years} من الخبرة في هندسة الحلول المؤسسية. قيادة فرق تضم أكثر من 5 مطورين.',
            executive: 'قائد تقني استراتيجي مع {years} من الخبرة في التحول الرقمي. إدارة ميزانيات تتجاوز 2 مليون دولار.',
        },
        design: {
            entry: '{jobTitle} مبدع مع {years} من الخبرة في التصميم المتمحور حول المستخدم. إتقان أدوات التصميم الحديثة.',
            mid: '{jobTitle} مبتكر مع {years} من الخبرة في إنشاء تجارب رقمية. زيادة تفاعل المستخدمين بنسبة 35%.',
            senior: '{jobTitle} أول مع {years} من الخبرة في قيادة فرق التصميم. أنظمة تصميم معتمدة في أكثر من 10 منتجات.',
            executive: 'مدير تصميم مع {years} من الخبرة في بناء منظمات تصميم عالمية. وفورات في التكاليف تتجاوز 5 ملايين دولار.',
        },
        marketing: {
            entry: '{jobTitle} متحمس مع {years} من الخبرة في التسويق الرقمي. مهارات في إنشاء المحتوى وإدارة وسائل التواصل.',
            mid: '{jobTitle} موجه بالبيانات مع {years} من الخبرة في تنفيذ الحملات. زيادة الزيارات العضوية بنسبة 150%.',
            senior: '{jobTitle} استراتيجي مع {years} من الخبرة في قيادة فرق التسويق. إدارة ميزانيات تتجاوز مليون دولار.',
            executive: 'مدير تسويق مع {years} من الخبرة في نمو الإيرادات. قيادة فرق عالمية وميزانيات تتجاوز 10 ملايين دولار.',
        },
        finance: {
            entry: '{jobTitle} دقيق مع {years} من الخبرة في التحليل المالي. أساس قوي في مبادئ المحاسبة.',
            mid: '{jobTitle} تحليلي مع {years} من الخبرة في التخطيط المالي. تحديد فرص توفير تتجاوز 500 ألف دولار سنوياً.',
            senior: '{jobTitle} أول مع {years} من الخبرة في قيادة العمليات المالية. إدارة محافظ تتجاوز 50 مليون دولار.',
            executive: 'مدير مالي مع {years} من الخبرة في الاستراتيجية المالية. صفقات استحواذ تتجاوز 100 مليون دولار.',
        },
        healthcare: {
            entry: '{jobTitle} رحيم مع {years} من الخبرة السريرية في الرعاية المتمحورة حول المريض.',
            mid: '{jobTitle} مخلص مع {years} من الخبرة في تقديم رعاية عالية الجودة. تحسين رضا المرضى بنسبة 30%.',
            senior: '{jobTitle} ذو خبرة مع {years} من الخبرة السريرية والقيادية. تقليل إعادة الدخول بنسبة 20%.',
            executive: 'مدير صحي مع {years} من الخبرة في تحويل العمليات السريرية. قيادة أقسام تضم أكثر من 50 موظفاً.',
        },
        education: {
            entry: '{jobTitle} شغوف مع {years} من الخبرة التعليمية. ملتزم بنجاح الطلاب.',
            mid: '{jobTitle} مبتكر مع {years} من الخبرة في تطوير المناهج. تحسين نتائج الطلاب بنسبة 25%.',
            senior: '{jobTitle} متمرس مع {years} من الخبرة في تشكيل النتائج التعليمية. برامج حائزة على جوائز.',
            executive: 'قائد تعليمي مع {years} من الخبرة في التميز المؤسسي. تأمين منح تتجاوز 2 مليون دولار.',
        },
        sales: {
            entry: '{jobTitle} متحمس مع {years} من الخبرة في تطوير الأعمال. مهارات تواصل قوية.',
            mid: '{jobTitle} موجه نحو النتائج مع {years} من الخبرة في تجاوز الحصص. توليد أكثر من 2 مليون دولار إيرادات جديدة.',
            senior: '{jobTitle} عالي الأداء مع {years} من الخبرة في قيادة فرق المبيعات. مناطق تحقق أكثر من 10 ملايين دولار سنوياً.',
            executive: 'مدير مبيعات مع {years} من الخبرة في بناء منظمات البيع. نمو الإيرادات من 5 إلى 50 مليون دولار.',
        },
        hospitality: {
            entry: '{jobTitle} ودود ونشيط مع {years} من الخبرة في بيئات تناول الطعام. ملتزم بخدمة عملاء استثنائية.',
            mid: '{jobTitle} مخلص مع {years} من الخبرة في تقديم خدمة متميزة. معدل رضا 98%.',
            senior: '{jobTitle} ذو خبرة مع {years} من الخبرة في المطاعم الراقية. تدريب أكثر من 15 موظفاً.',
            executive: 'محترف ضيافة مع {years} من الخبرة في إدارة المطاعم. زيادة الإيرادات بنسبة 40%.',
        },
        general: {
            entry: '{jobTitle} متحمس مع {years} من الخبرة المهنية. أخلاقيات عمل قوية ومهارات تواصل ممتازة.',
            mid: '{jobTitle} ناجح مع {years} من الخبرة في التميز التشغيلي. تحسين كفاءة الفريق بنسبة 30%.',
            senior: '{jobTitle} متمرس مع {years} من الخبرة في قيادة الفرق. إدارة مشاريع تصل إلى مليون دولار.',
            executive: 'قائد تنفيذي مع {years} من الخبرة في التحول المؤسسي. قيادة فرق تضم أكثر من 50 شخصاً.',
        },
    },
};

function generateSummary(input: OnboardingInput, category: JobCategory): string {
    const locale = input.locale || 'en';
    const locData = getLocaleData(locale);
    const years = experienceYears[input.experienceLevel];
    const yearsText = locData.yearsText(years);

    const templates = summaryTemplates[locale] || summaryTemplates.en;
    const template = templates[category][input.experienceLevel];

    return template.replace('{jobTitle}', input.jobTitle).replace('{years}', yearsText);
}

// Generate experience entries (uses locale-aware companies and cities from localeData)
function generateExperience(input: OnboardingInput, category: JobCategory): Experience[] {
    const locData = getLocaleData(input.locale);
    const companies = locData.companies[category];
    const cities = locData.cities;
    const country = locData.country;
    const years = experienceYears[input.experienceLevel];
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    const experiences: Experience[] = [];
    let yearOffset = 0;

    // Generate 2-3 positions based on experience level
    const positionCount = input.experienceLevel === 'entry' ? 1 : input.experienceLevel === 'mid' ? 2 : 3;

    const levelTitles: Record<OnboardingInput['experienceLevel'], string[]> = {
        entry: [input.jobTitle],
        mid: [`Senior ${input.jobTitle}`, input.jobTitle],
        senior: [`Lead ${input.jobTitle}`, `Senior ${input.jobTitle}`, input.jobTitle],
        executive: [`Director of ${input.jobTitle.replace(/Senior|Lead|Junior/gi, '').trim()}`, `Senior ${input.jobTitle}`, input.jobTitle],
    };

    const titles = levelTitles[input.experienceLevel];

    for (let i = 0; i < positionCount; i++) {
        const duration = i === 0 ? Math.ceil(years / positionCount) + 1 : Math.floor(years / positionCount);
        const startYear = currentYear - yearOffset - duration;
        const startMonth = i === 0 ? currentMonth - 2 : Math.floor(Math.random() * 12) + 1;
        const endYear = i === 0 ? currentYear : currentYear - yearOffset;
        const endMonth = i === 0 ? currentMonth : startMonth + Math.floor(Math.random() * 3);

        experiences.push({
            id: `exp-${i + 1}`,
            title: titles[i] || input.jobTitle,
            company: companies[i % companies.length],
            city: cities[i % cities.length],
            country: country,
            startDate: `${startYear}-${String(Math.max(1, Math.min(12, startMonth))).padStart(2, '0')}`,
            endDate: i === 0 ? '' : `${endYear}-${String(Math.max(1, Math.min(12, endMonth))).padStart(2, '0')}`,
            current: i === 0,
            description: generateJobDescription(category, i, input.experienceLevel, input.locale),
        });

        yearOffset += duration;
    }

    return experiences;
}

// Translated job descriptions by locale
type JobDescriptions = Record<JobCategory, string[][]>;

const jobDescriptionsByLocale: Record<string, JobDescriptions> = {
    en: {
        tech: [
            [
                '• Led development of microservices architecture, improving system scalability by 300%',
                '• Implemented CI/CD pipelines reducing deployment time from 2 hours to 15 minutes',
                '• Mentored team of 5 junior developers, conducting code reviews and technical training',
                '• Collaborated with product managers to define technical requirements and sprint planning',
                '• Reduced application load time by 40% through performance optimization',
            ],
            [
                '• Developed RESTful APIs serving 1M+ daily requests with 99.9% uptime',
                '• Built responsive web applications using React and TypeScript',
                '• Integrated third-party services and payment gateways',
                '• Participated in agile ceremonies and contributed to sprint planning',
            ],
            [
                '• Contributed to codebase maintenance and bug fixes',
                '• Assisted senior developers with feature implementation',
                '• Wrote unit tests improving code coverage by 25%',
            ],
        ],
        design: [
            [
                '• Led design team of 5 designers in creating user-centered digital products',
                '• Established design system and component library used across 10+ projects',
                '• Increased user engagement by 40% through UX improvements',
                '• Conducted user research and usability testing with 100+ participants',
                '• Presented design concepts to stakeholders and incorporated feedback',
            ],
            [
                '• Designed mobile and web applications for iOS and Android platforms',
                '• Created wireframes, prototypes, and high-fidelity mockups',
                '• Collaborated with developers to ensure design implementation accuracy',
                '• Improved conversion rates by 35% through A/B testing',
            ],
            [
                '• Assisted in creating visual designs for marketing campaigns',
                '• Maintained brand consistency across all design deliverables',
                '• Supported senior designers with asset creation',
            ],
        ],
        marketing: [
            [
                '• Developed and executed marketing strategies resulting in 200% ROI',
                '• Managed $500K+ annual marketing budget across digital channels',
                '• Led team of 4 marketers in campaign planning and execution',
                '• Increased organic traffic by 150% through SEO optimization',
                '• Built partnerships with influencers reaching 2M+ audience',
            ],
            [
                '• Created content strategy driving 100K+ monthly blog visitors',
                '• Managed social media accounts growing followers by 300%',
                '• Executed email campaigns with 35% open rate and 15% CTR',
                '• Analyzed campaign performance and optimized based on data',
            ],
            [
                '• Assisted in social media content creation and scheduling',
                '• Supported team with market research and competitive analysis',
                '• Helped organize marketing events and webinars',
            ],
        ],
        finance: [
            [
                '• Managed financial planning and analysis for $50M+ business unit',
                '• Led annual budgeting process and quarterly forecasting',
                '• Identified cost-saving opportunities resulting in $1M+ savings',
                '• Presented financial reports to executive leadership',
                '• Supervised team of 3 analysts and coordinated audit processes',
            ],
            [
                '• Prepared monthly financial statements and variance analysis',
                '• Developed financial models for business planning',
                '• Streamlined reporting processes reducing close time by 30%',
                '• Supported M&A due diligence and integration',
            ],
            [
                '• Assisted with accounts payable and receivable processing',
                '• Reconciled bank statements and general ledger accounts',
                '• Supported senior accountants with month-end close',
            ],
        ],
        healthcare: [
            [
                '• Supervised nursing staff of 15+ in providing patient care',
                '• Implemented quality improvement initiatives reducing errors by 40%',
                '• Coordinated patient care plans with interdisciplinary team',
                '• Maintained compliance with HIPAA and regulatory requirements',
                '• Trained new staff on protocols and best practices',
            ],
            [
                '• Provided direct patient care for 10+ patients daily',
                '• Administered medications and monitored patient conditions',
                '• Documented patient information in EMR systems accurately',
                '• Collaborated with physicians on treatment plans',
            ],
            [
                '• Assisted with patient intake and vital sign monitoring',
                '• Supported nursing staff with daily care activities',
                '• Maintained clean and organized patient environments',
            ],
        ],
        education: [
            [
                '• Developed curriculum adopted across district serving 5,000+ students',
                '• Mentored 10+ teachers in implementing new instructional strategies',
                '• Improved student achievement scores by 25% over 3 years',
                '• Led professional development workshops and training sessions',
                '• Secured $100K+ in grants for educational programs',
            ],
            [
                '• Taught classes of 25+ students across multiple grade levels',
                '• Created engaging lesson plans aligned with state standards',
                '• Implemented differentiated instruction for diverse learners',
                '• Communicated regularly with parents on student progress',
            ],
            [
                '• Assisted lead teachers with classroom instruction',
                '• Supported students with individual and small group tutoring',
                '• Helped maintain classroom organization and materials',
            ],
        ],
        sales: [
            [
                '• Exceeded annual quota by 150%, generating $5M+ in revenue',
                '• Built and managed team of 8 sales representatives',
                '• Developed strategic account plans for enterprise clients',
                '• Negotiated contracts valued at $500K+ with C-level executives',
                '• Implemented CRM processes improving forecast accuracy by 40%',
            ],
            [
                '• Achieved 120% of quota consistently for 8 consecutive quarters',
                '• Managed pipeline of 50+ opportunities worth $2M+',
                '• Conducted product demonstrations and presentations',
                '• Maintained 95% client retention rate through relationship management',
            ],
            [
                '• Generated leads through cold calling and networking',
                '• Assisted senior representatives with client meetings',
                '• Maintained accurate records in CRM system',
            ],
        ],
        hospitality: [
            [
                '• Supervised team of 10+ servers ensuring consistent service quality',
                '• Trained new staff on menu items, POS systems, and service standards',
                '• Resolved customer complaints professionally, maintaining 95% satisfaction rate',
                '• Coordinated with kitchen staff to ensure timely food delivery',
                '• Managed section of 8+ tables during peak hours serving 100+ guests daily',
            ],
            [
                '• Provided excellent table service in fast-paced 200-seat restaurant',
                '• Increased average check size by 20% through effective upselling',
                '• Memorized extensive menu including daily specials and wine pairings',
                '• Processed payments accurately handling $500+ in daily transactions',
            ],
            [
                '• Greeted and seated guests ensuring positive first impressions',
                '• Took accurate food and beverage orders using POS system',
                '• Maintained clean and organized dining area throughout shifts',
            ],
        ],
        general: [
            [
                '• Led cross-functional team of 10+ members on strategic initiatives',
                '• Managed projects with budgets up to $500K and delivered on time',
                '• Improved operational efficiency by 30% through process optimization',
                '• Developed and implemented departmental policies and procedures',
                '• Presented quarterly reports to senior leadership',
            ],
            [
                '• Coordinated daily operations and workflow management',
                '• Collaborated with stakeholders to meet project deadlines',
                '• Analyzed data to identify trends and improvement opportunities',
                '• Trained new team members on processes and systems',
            ],
            [
                '• Supported team with administrative and operational tasks',
                '• Assisted with data entry and report preparation',
                '• Helped organize team meetings and events',
            ],
        ],
    },
    es: {
        tech: [
            [
                '• Lideré el desarrollo de arquitectura de microservicios, mejorando la escalabilidad del sistema en un 300%',
                '• Implementé pipelines CI/CD reduciendo el tiempo de despliegue de 2 horas a 15 minutos',
                '• Mentoricé a un equipo de 5 desarrolladores junior, realizando revisiones de código y capacitación técnica',
                '• Colaboré con gerentes de producto para definir requisitos técnicos y planificación de sprints',
                '• Reduje el tiempo de carga de la aplicación en un 40% mediante optimización de rendimiento',
            ],
            [
                '• Desarrollé APIs RESTful sirviendo más de 1M de solicitudes diarias con 99.9% de disponibilidad',
                '• Construí aplicaciones web responsivas usando React y TypeScript',
                '• Integré servicios de terceros y pasarelas de pago',
                '• Participé en ceremonias ágiles y contribuí a la planificación de sprints',
            ],
            [
                '• Contribuí al mantenimiento del código base y corrección de errores',
                '• Asistí a desarrolladores senior con la implementación de funcionalidades',
                '• Escribí pruebas unitarias mejorando la cobertura de código en un 25%',
            ],
        ],
        design: [
            [
                '• Lideré un equipo de 5 diseñadores en la creación de productos digitales centrados en el usuario',
                '• Establecí un sistema de diseño y biblioteca de componentes usado en más de 10 proyectos',
                '• Aumenté el engagement de usuarios en un 40% mediante mejoras de UX',
                '• Realicé investigación de usuarios y pruebas de usabilidad con más de 100 participantes',
                '• Presenté conceptos de diseño a stakeholders e incorporé feedback',
            ],
            [
                '• Diseñé aplicaciones móviles y web para plataformas iOS y Android',
                '• Creé wireframes, prototipos y mockups de alta fidelidad',
                '• Colaboré con desarrolladores para asegurar la precisión en la implementación del diseño',
                '• Mejoré las tasas de conversión en un 35% mediante pruebas A/B',
            ],
            [
                '• Asistí en la creación de diseños visuales para campañas de marketing',
                '• Mantuve la consistencia de marca en todos los entregables de diseño',
                '• Apoyé a diseñadores senior con la creación de assets',
            ],
        ],
        marketing: [
            [
                '• Desarrollé y ejecuté estrategias de marketing con un ROI del 200%',
                '• Gestioné un presupuesto anual de marketing de más de $500K en canales digitales',
                '• Lideré un equipo de 4 especialistas en marketing en planificación y ejecución de campañas',
                '• Aumenté el tráfico orgánico en un 150% mediante optimización SEO',
                '• Construí alianzas con influencers alcanzando más de 2M de audiencia',
            ],
            [
                '• Creé una estrategia de contenido generando más de 100K visitantes mensuales al blog',
                '• Gestioné cuentas de redes sociales aumentando seguidores en un 300%',
                '• Ejecuté campañas de email con 35% de tasa de apertura y 15% de CTR',
                '• Analicé el rendimiento de campañas y optimicé basado en datos',
            ],
            [
                '• Asistí en la creación y programación de contenido para redes sociales',
                '• Apoyé al equipo con investigación de mercado y análisis competitivo',
                '• Ayudé a organizar eventos de marketing y webinars',
            ],
        ],
        finance: [
            [
                '• Gestioné la planificación y análisis financiero para una unidad de negocio de más de $50M',
                '• Lideré el proceso de presupuesto anual y pronósticos trimestrales',
                '• Identifiqué oportunidades de ahorro resultando en más de $1M de ahorros',
                '• Presenté informes financieros a la dirección ejecutiva',
                '• Supervisé un equipo de 3 analistas y coordiné procesos de auditoría',
            ],
            [
                '• Preparé estados financieros mensuales y análisis de variaciones',
                '• Desarrollé modelos financieros para planificación de negocios',
                '• Optimicé procesos de reporte reduciendo el tiempo de cierre en un 30%',
                '• Apoyé en due diligence e integración de M&A',
            ],
            [
                '• Asistí con el procesamiento de cuentas por pagar y cobrar',
                '• Concilié extractos bancarios y cuentas del libro mayor',
                '• Apoyé a contadores senior con el cierre de mes',
            ],
        ],
        healthcare: [
            [
                '• Supervisé al personal de enfermería de más de 15 personas en la atención al paciente',
                '• Implementé iniciativas de mejora de calidad reduciendo errores en un 40%',
                '• Coordiné planes de atención al paciente con equipo interdisciplinario',
                '• Mantuve el cumplimiento con HIPAA y requisitos regulatorios',
                '• Capacité a nuevo personal en protocolos y mejores prácticas',
            ],
            [
                '• Proporcioné atención directa al paciente para más de 10 pacientes diarios',
                '• Administré medicamentos y monitoreé condiciones de pacientes',
                '• Documenté información del paciente en sistemas EMR con precisión',
                '• Colaboré con médicos en planes de tratamiento',
            ],
            [
                '• Asistí con la admisión de pacientes y monitoreo de signos vitales',
                '• Apoyé al personal de enfermería con actividades de cuidado diario',
                '• Mantuve ambientes de pacientes limpios y organizados',
            ],
        ],
        education: [
            [
                '• Desarrollé un currículo adoptado en todo el distrito sirviendo a más de 5,000 estudiantes',
                '• Mentoricé a más de 10 profesores en implementación de nuevas estrategias instruccionales',
                '• Mejoré los puntajes de logro estudiantil en un 25% en 3 años',
                '• Lideré talleres de desarrollo profesional y sesiones de capacitación',
                '• Aseguré más de $100K en subvenciones para programas educativos',
            ],
            [
                '• Impartí clases a más de 25 estudiantes en múltiples niveles',
                '• Creé planes de lección atractivos alineados con estándares estatales',
                '• Implementé instrucción diferenciada para estudiantes diversos',
                '• Comuniqué regularmente con padres sobre el progreso estudiantil',
            ],
            [
                '• Asistí a profesores principales con la instrucción en el aula',
                '• Apoyé a estudiantes con tutoría individual y en grupos pequeños',
                '• Ayudé a mantener la organización del aula y los materiales',
            ],
        ],
        sales: [
            [
                '• Superé la cuota anual en un 150%, generando más de $5M en ingresos',
                '• Construí y gestioné un equipo de 8 representantes de ventas',
                '• Desarrollé planes de cuenta estratégicos para clientes empresariales',
                '• Negocié contratos valorados en más de $500K con ejecutivos de nivel C',
                '• Implementé procesos de CRM mejorando la precisión del pronóstico en un 40%',
            ],
            [
                '• Logré el 120% de la cuota consistentemente durante 8 trimestres consecutivos',
                '• Gestioné un pipeline de más de 50 oportunidades con valor de más de $2M',
                '• Realicé demostraciones de productos y presentaciones',
                '• Mantuve una tasa de retención de clientes del 95% mediante gestión de relaciones',
            ],
            [
                '• Generé leads mediante llamadas en frío y networking',
                '• Asistí a representantes senior en reuniones con clientes',
                '• Mantuve registros precisos en el sistema CRM',
            ],
        ],
        hospitality: [
            [
                '• Supervisé un equipo de más de 10 meseros asegurando calidad de servicio consistente',
                '• Capacité a nuevo personal en menú, sistemas POS y estándares de servicio',
                '• Resolví quejas de clientes profesionalmente, manteniendo 95% de satisfacción',
                '• Coordiné con personal de cocina para asegurar entrega oportuna de comida',
                '• Gestioné sección de más de 8 mesas en horas pico sirviendo a más de 100 clientes diarios',
            ],
            [
                '• Proporcioné excelente servicio de mesa en restaurante de 200 asientos',
                '• Aumenté el ticket promedio en un 20% mediante upselling efectivo',
                '• Memoricé extenso menú incluyendo especialidades diarias y maridajes',
                '• Procesé pagos con precisión manejando más de $500 en transacciones diarias',
            ],
            [
                '• Recibí y acomodé a clientes asegurando primeras impresiones positivas',
                '• Tomé pedidos precisos de comida y bebida usando sistema POS',
                '• Mantuve el área de comedor limpia y organizada durante los turnos',
            ],
        ],
        general: [
            [
                '• Lideré un equipo multifuncional de más de 10 miembros en iniciativas estratégicas',
                '• Gestioné proyectos con presupuestos de hasta $500K entregados a tiempo',
                '• Mejoré la eficiencia operacional en un 30% mediante optimización de procesos',
                '• Desarrollé e implementé políticas y procedimientos departamentales',
                '• Presenté informes trimestrales a la dirección senior',
            ],
            [
                '• Coordiné operaciones diarias y gestión de flujo de trabajo',
                '• Colaboré con stakeholders para cumplir plazos de proyectos',
                '• Analicé datos para identificar tendencias y oportunidades de mejora',
                '• Capacité a nuevos miembros del equipo en procesos y sistemas',
            ],
            [
                '• Apoyé al equipo con tareas administrativas y operacionales',
                '• Asistí con entrada de datos y preparación de informes',
                '• Ayudé a organizar reuniones de equipo y eventos',
            ],
        ],
    },
    fr: {
        tech: [
            [
                '• Direction du développement d\'architecture microservices, améliorant la scalabilité de 300%',
                '• Mise en place de pipelines CI/CD réduisant le temps de déploiement de 2h à 15 minutes',
                '• Mentorat d\'une équipe de 5 développeurs juniors, revues de code et formation technique',
                '• Collaboration avec les chefs de produit pour définir les exigences techniques',
                '• Réduction du temps de chargement de 40% par optimisation des performances',
            ],
            [
                '• Développement d\'APIs RESTful servant plus d\'1M de requêtes quotidiennes avec 99.9% de disponibilité',
                '• Construction d\'applications web responsives avec React et TypeScript',
                '• Intégration de services tiers et passerelles de paiement',
                '• Participation aux cérémonies agiles et planification de sprints',
            ],
            [
                '• Contribution à la maintenance du code et correction de bugs',
                '• Assistance aux développeurs seniors pour l\'implémentation de fonctionnalités',
                '• Écriture de tests unitaires améliorant la couverture de 25%',
            ],
        ],
        design: [
            [
                '• Direction d\'une équipe de 5 designers pour créer des produits centrés utilisateur',
                '• Établissement d\'un système de design utilisé sur plus de 10 projets',
                '• Augmentation de l\'engagement utilisateur de 40% par améliorations UX',
                '• Recherche utilisateur et tests d\'utilisabilité avec plus de 100 participants',
                '• Présentation de concepts design aux parties prenantes et intégration des retours',
            ],
            [
                '• Conception d\'applications mobiles et web pour iOS et Android',
                '• Création de wireframes, prototypes et maquettes haute fidélité',
                '• Collaboration avec les développeurs pour assurer la précision de l\'implémentation',
                '• Amélioration des taux de conversion de 35% par tests A/B',
            ],
            [
                '• Assistance à la création de designs visuels pour campagnes marketing',
                '• Maintien de la cohérence de marque sur tous les livrables',
                '• Support aux designers seniors pour la création d\'assets',
            ],
        ],
        marketing: [
            [
                '• Développement et exécution de stratégies marketing avec ROI de 200%',
                '• Gestion d\'un budget marketing annuel de plus de 500K$ sur les canaux digitaux',
                '• Direction d\'une équipe de 4 marketeurs en planification de campagnes',
                '• Augmentation du trafic organique de 150% par optimisation SEO',
                '• Construction de partenariats avec influenceurs touchant 2M+ d\'audience',
            ],
            [
                '• Création de stratégie de contenu générant plus de 100K visiteurs mensuels',
                '• Gestion des comptes réseaux sociaux avec croissance de 300% des abonnés',
                '• Exécution de campagnes email avec 35% de taux d\'ouverture et 15% CTR',
                '• Analyse des performances et optimisation basée sur les données',
            ],
            [
                '• Assistance à la création et programmation de contenu social',
                '• Support à l\'équipe pour recherche de marché et analyse concurrentielle',
                '• Aide à l\'organisation d\'événements marketing et webinaires',
            ],
        ],
        finance: [
            [
                '• Gestion de la planification financière pour une unité de plus de 50M$',
                '• Direction du processus budgétaire annuel et prévisions trimestrielles',
                '• Identification d\'opportunités d\'économies de plus d\'1M$',
                '• Présentation de rapports financiers à la direction exécutive',
                '• Supervision d\'une équipe de 3 analystes et coordination des audits',
            ],
            [
                '• Préparation des états financiers mensuels et analyse des écarts',
                '• Développement de modèles financiers pour la planification',
                '• Optimisation des processus de reporting réduisant le temps de clôture de 30%',
                '• Support due diligence et intégration M&A',
            ],
            [
                '• Assistance au traitement des comptes fournisseurs et clients',
                '• Rapprochement des relevés bancaires et comptes du grand livre',
                '• Support aux comptables seniors pour la clôture mensuelle',
            ],
        ],
        healthcare: [
            [
                '• Supervision du personnel infirmier de 15+ personnes pour les soins aux patients',
                '• Mise en œuvre d\'initiatives qualité réduisant les erreurs de 40%',
                '• Coordination des plans de soins avec l\'équipe interdisciplinaire',
                '• Maintien de la conformité HIPAA et exigences réglementaires',
                '• Formation du nouveau personnel aux protocoles et bonnes pratiques',
            ],
            [
                '• Soins directs aux patients pour plus de 10 patients quotidiens',
                '• Administration de médicaments et surveillance des conditions',
                '• Documentation précise des informations patients dans les systèmes EMR',
                '• Collaboration avec les médecins sur les plans de traitement',
            ],
            [
                '• Assistance à l\'admission des patients et surveillance des signes vitaux',
                '• Support au personnel infirmier pour les activités de soins quotidiens',
                '• Maintien d\'environnements patients propres et organisés',
            ],
        ],
        education: [
            [
                '• Développement d\'un programme adopté dans tout le district pour 5000+ élèves',
                '• Mentorat de 10+ enseignants pour l\'implémentation de nouvelles stratégies',
                '• Amélioration des résultats des élèves de 25% sur 3 ans',
                '• Animation d\'ateliers de développement professionnel et formations',
                '• Obtention de plus de 100K$ de subventions pour programmes éducatifs',
            ],
            [
                '• Enseignement à des classes de 25+ élèves de plusieurs niveaux',
                '• Création de plans de cours engageants alignés sur les standards',
                '• Mise en œuvre d\'instruction différenciée pour apprenants divers',
                '• Communication régulière avec les parents sur le progrès des élèves',
            ],
            [
                '• Assistance aux enseignants principaux pour l\'instruction en classe',
                '• Support aux élèves avec tutorat individuel et en petit groupe',
                '• Aide au maintien de l\'organisation de la classe et du matériel',
            ],
        ],
        sales: [
            [
                '• Dépassement du quota annuel de 150%, générant plus de 5M$ de revenus',
                '• Construction et gestion d\'une équipe de 8 commerciaux',
                '• Développement de plans de compte stratégiques pour clients entreprise',
                '• Négociation de contrats de plus de 500K$ avec dirigeants C-level',
                '• Implémentation de processus CRM améliorant la précision des prévisions de 40%',
            ],
            [
                '• Atteinte de 120% du quota pendant 8 trimestres consécutifs',
                '• Gestion d\'un pipeline de 50+ opportunités valant plus de 2M$',
                '• Réalisation de démonstrations produits et présentations',
                '• Maintien d\'un taux de rétention client de 95%',
            ],
            [
                '• Génération de leads par prospection et networking',
                '• Assistance aux commerciaux seniors pour les réunions clients',
                '• Maintien de registres précis dans le système CRM',
            ],
        ],
        hospitality: [
            [
                '• Supervision d\'une équipe de 10+ serveurs assurant une qualité de service constante',
                '• Formation du nouveau personnel sur le menu, systèmes POS et standards',
                '• Résolution professionnelle des plaintes, maintenant 95% de satisfaction',
                '• Coordination avec la cuisine pour une livraison rapide des plats',
                '• Gestion de section de 8+ tables aux heures de pointe, 100+ clients/jour',
            ],
            [
                '• Service de table excellent dans un restaurant de 200 places',
                '• Augmentation du ticket moyen de 20% par upselling efficace',
                '• Mémorisation du menu complet incluant spécialités et accords vins',
                '• Traitement précis des paiements, plus de 500$ de transactions/jour',
            ],
            [
                '• Accueil et placement des clients assurant une première impression positive',
                '• Prise de commandes précise via système POS',
                '• Maintien de la salle propre et organisée pendant le service',
            ],
        ],
        general: [
            [
                '• Direction d\'équipe transversale de 10+ membres sur initiatives stratégiques',
                '• Gestion de projets avec budgets jusqu\'à 500K$ livrés dans les délais',
                '• Amélioration de l\'efficacité opérationnelle de 30% par optimisation',
                '• Développement et mise en œuvre de politiques et procédures',
                '• Présentation de rapports trimestriels à la direction senior',
            ],
            [
                '• Coordination des opérations quotidiennes et gestion des flux',
                '• Collaboration avec les parties prenantes pour respecter les délais',
                '• Analyse de données pour identifier tendances et opportunités',
                '• Formation des nouveaux membres sur les processus et systèmes',
            ],
            [
                '• Support à l\'équipe pour tâches administratives et opérationnelles',
                '• Assistance à la saisie de données et préparation de rapports',
                '• Aide à l\'organisation des réunions d\'équipe et événements',
            ],
        ],
    },
    de: {
        tech: [
            [
                '• Leitung der Microservices-Architekturentwicklung, Skalierbarkeit um 300% verbessert',
                '• Implementierung von CI/CD-Pipelines, Deployment-Zeit von 2h auf 15 Min. reduziert',
                '• Mentoring eines Teams von 5 Junior-Entwicklern, Code-Reviews und technische Schulungen',
                '• Zusammenarbeit mit Produktmanagern zur Definition technischer Anforderungen',
                '• Reduzierung der Ladezeit um 40% durch Performance-Optimierung',
            ],
            [
                '• Entwicklung von RESTful APIs mit 1M+ täglichen Anfragen bei 99,9% Verfügbarkeit',
                '• Erstellung responsiver Webanwendungen mit React und TypeScript',
                '• Integration von Drittanbieter-Services und Zahlungsgateways',
                '• Teilnahme an agilen Zeremonien und Sprint-Planung',
            ],
            [
                '• Beitrag zur Codebasis-Wartung und Fehlerbehebung',
                '• Unterstützung der Senior-Entwickler bei Feature-Implementierung',
                '• Schreiben von Unit-Tests, Testabdeckung um 25% verbessert',
            ],
        ],
        design: [
            [
                '• Leitung eines Design-Teams von 5 Designern für nutzerzentrierte Produkte',
                '• Etablierung eines Designsystems für über 10 Projekte',
                '• Steigerung des Nutzer-Engagements um 40% durch UX-Verbesserungen',
                '• Nutzerforschung und Usability-Tests mit 100+ Teilnehmern',
                '• Präsentation von Design-Konzepten und Integration von Feedback',
            ],
            [
                '• Design von mobilen und Web-Anwendungen für iOS und Android',
                '• Erstellung von Wireframes, Prototypen und High-Fidelity-Mockups',
                '• Zusammenarbeit mit Entwicklern für präzise Design-Umsetzung',
                '• Verbesserung der Conversion-Raten um 35% durch A/B-Tests',
            ],
            [
                '• Unterstützung bei der Erstellung visueller Designs für Marketing',
                '• Aufrechterhaltung der Markenkonsistenz über alle Deliverables',
                '• Support für Senior-Designer bei Asset-Erstellung',
            ],
        ],
        marketing: [
            [
                '• Entwicklung und Umsetzung von Marketing-Strategien mit 200% ROI',
                '• Verwaltung eines Marketing-Budgets von über 500K$ über digitale Kanäle',
                '• Leitung eines Teams von 4 Marketern in Kampagnenplanung',
                '• Steigerung des organischen Traffics um 150% durch SEO-Optimierung',
                '• Aufbau von Influencer-Partnerschaften mit 2M+ Reichweite',
            ],
            [
                '• Erstellung einer Content-Strategie mit 100K+ monatlichen Blog-Besuchern',
                '• Verwaltung von Social-Media-Accounts, Follower um 300% gesteigert',
                '• Durchführung von E-Mail-Kampagnen mit 35% Öffnungsrate und 15% CTR',
                '• Analyse der Kampagnen-Performance und datenbasierte Optimierung',
            ],
            [
                '• Unterstützung bei Content-Erstellung und -Planung für Social Media',
                '• Support für Marktforschung und Wettbewerbsanalyse',
                '• Hilfe bei der Organisation von Marketing-Events und Webinaren',
            ],
        ],
        finance: [
            [
                '• Finanzplanung und -analyse für Geschäftsbereich mit über 50M$ verwaltet',
                '• Leitung des jährlichen Budgetprozesses und quartalsweiser Prognosen',
                '• Identifizierung von Einsparungsmöglichkeiten von über 1M$',
                '• Präsentation von Finanzberichten an die Geschäftsleitung',
                '• Supervision eines Teams von 3 Analysten und Audit-Koordination',
            ],
            [
                '• Erstellung monatlicher Finanzberichte und Abweichungsanalysen',
                '• Entwicklung von Finanzmodellen für Geschäftsplanung',
                '• Optimierung der Reporting-Prozesse, Abschlusszeit um 30% reduziert',
                '• Unterstützung bei M&A Due Diligence und Integration',
            ],
            [
                '• Unterstützung bei Kreditoren- und Debitorenbuchhaltung',
                '• Abstimmung von Kontoauszügen und Hauptbuchkonten',
                '• Support für Senior-Buchhalter beim Monatsabschluss',
            ],
        ],
        healthcare: [
            [
                '• Supervision des Pflegepersonals von 15+ bei der Patientenversorgung',
                '• Implementierung von Qualitätsinitiativen, Fehler um 40% reduziert',
                '• Koordination von Pflegeplänen mit interdisziplinärem Team',
                '• Einhaltung von HIPAA und regulatorischen Anforderungen',
                '• Schulung neuer Mitarbeiter in Protokollen und Best Practices',
            ],
            [
                '• Direkte Patientenversorgung für täglich 10+ Patienten',
                '• Medikamentengabe und Überwachung des Patientenzustands',
                '• Genaue Dokumentation in EMR-Systemen',
                '• Zusammenarbeit mit Ärzten bei Behandlungsplänen',
            ],
            [
                '• Unterstützung bei Patientenaufnahme und Vitalzeichen-Monitoring',
                '• Support für Pflegepersonal bei täglichen Pflegeaktivitäten',
                '• Aufrechterhaltung sauberer und organisierter Patientenumgebungen',
            ],
        ],
        education: [
            [
                '• Entwicklung eines Lehrplans für über 5.000 Schüler im Bezirk',
                '• Mentoring von 10+ Lehrern bei neuen Unterrichtsstrategien',
                '• Verbesserung der Schülerleistungen um 25% über 3 Jahre',
                '• Leitung von Fortbildungsworkshops und Schulungen',
                '• Sicherung von über 100K$ an Zuschüssen für Bildungsprogramme',
            ],
            [
                '• Unterricht für Klassen mit 25+ Schülern verschiedener Stufen',
                '• Erstellung engagierender Unterrichtspläne nach Standards',
                '• Implementierung differenzierter Instruktion für diverse Lerner',
                '• Regelmäßige Kommunikation mit Eltern über Schülerfortschritte',
            ],
            [
                '• Unterstützung der Hauptlehrer beim Klassenunterricht',
                '• Support für Schüler mit Einzel- und Kleingruppenunterricht',
                '• Hilfe bei der Klassenorganisation und Materialverwaltung',
            ],
        ],
        sales: [
            [
                '• Jahresquote um 150% übertroffen, über 5M$ Umsatz generiert',
                '• Aufbau und Führung eines Teams von 8 Vertriebsmitarbeitern',
                '• Entwicklung strategischer Account-Pläne für Unternehmenskunden',
                '• Verhandlung von Verträgen über 500K$ mit C-Level-Führungskräften',
                '• Implementierung von CRM-Prozessen, Prognosegenauigkeit um 40% verbessert',
            ],
            [
                '• 120% der Quote für 8 aufeinanderfolgende Quartale erreicht',
                '• Verwaltung einer Pipeline von 50+ Opportunities im Wert von 2M$+',
                '• Durchführung von Produktdemos und Präsentationen',
                '• Aufrechterhaltung einer Kundenbindungsrate von 95%',
            ],
            [
                '• Lead-Generierung durch Kaltakquise und Networking',
                '• Unterstützung von Senior-Vertriebsmitarbeitern bei Kundenmeetings',
                '• Pflege genauer Aufzeichnungen im CRM-System',
            ],
        ],
        hospitality: [
            [
                '• Supervision eines Teams von 10+ Kellnern für konstante Servicequalität',
                '• Schulung neuer Mitarbeiter zu Menü, POS-Systemen und Standards',
                '• Professionelle Lösung von Beschwerden, 95% Zufriedenheit',
                '• Koordination mit Küchenpersonal für pünktliche Essenslieferung',
                '• Verwaltung von 8+ Tischen zu Stoßzeiten, 100+ Gäste täglich',
            ],
            [
                '• Exzellenter Tischservice in Restaurant mit 200 Plätzen',
                '• Steigerung des durchschnittlichen Bons um 20% durch Upselling',
                '• Auswendiglernen der Karte inkl. Tagesgerichte und Weinempfehlungen',
                '• Genaue Zahlungsabwicklung, über 500$ Tagesumsatz',
            ],
            [
                '• Begrüßung und Platzierung der Gäste für positiven ersten Eindruck',
                '• Genaue Aufnahme von Bestell über POS-System',
                '• Aufrechterhaltung eines sauberen und organisierten Gastraums',
            ],
        ],
        general: [
            [
                '• Leitung eines funktionsübergreifenden Teams von 10+ bei strategischen Initiativen',
                '• Projektverwaltung mit Budgets bis 500K$, termingerecht geliefert',
                '• Verbesserung der operativen Effizienz um 30% durch Prozessoptimierung',
                '• Entwicklung und Implementierung von Abteilungsrichtlinien',
                '• Präsentation von Quartalsberichten an die Geschäftsleitung',
            ],
            [
                '• Koordination des Tagesgeschäfts und Workflow-Management',
                '• Zusammenarbeit mit Stakeholdern zur Einhaltung von Fristen',
                '• Datenanalyse zur Identifizierung von Trends und Chancen',
                '• Schulung neuer Teammitglieder in Prozessen und Systemen',
            ],
            [
                '• Support für administrative und operative Aufgaben',
                '• Unterstützung bei Dateneingabe und Berichtserstellung',
                '• Hilfe bei der Organisation von Teammeetings und Events',
            ],
        ],
    },
    ar: {
        tech: [
            [
                '• قيادة تطوير بنية الخدمات المصغرة، تحسين قابلية التوسع بنسبة 300%',
                '• تنفيذ خطوط CI/CD لتقليل وقت النشر من ساعتين إلى 15 دقيقة',
                '• توجيه فريق من 5 مطورين مبتدئين، إجراء مراجعات الكود والتدريب التقني',
                '• التعاون مع مديري المنتجات لتحديد المتطلبات التقنية وتخطيط السبرنت',
                '• تقليل وقت تحميل التطبيق بنسبة 40% من خلال تحسين الأداء',
            ],
            [
                '• تطوير واجهات برمجة RESTful تخدم أكثر من مليون طلب يومياً بتوفر 99.9%',
                '• بناء تطبيقات ويب متجاوبة باستخدام React و TypeScript',
                '• دمج خدمات الطرف الثالث وبوابات الدفع',
                '• المشاركة في احتفالات أجايل والمساهمة في تخطيط السبرنت',
            ],
            [
                '• المساهمة في صيانة قاعدة الكود وإصلاح الأخطاء',
                '• مساعدة المطورين الكبار في تنفيذ الميزات',
                '• كتابة اختبارات الوحدة لتحسين تغطية الكود بنسبة 25%',
            ],
        ],
        design: [
            [
                '• قيادة فريق تصميم من 5 مصممين لإنشاء منتجات رقمية تركز على المستخدم',
                '• إنشاء نظام تصميم ومكتبة مكونات مستخدمة في أكثر من 10 مشاريع',
                '• زيادة تفاعل المستخدمين بنسبة 40% من خلال تحسينات تجربة المستخدم',
                '• إجراء بحث المستخدم واختبار قابلية الاستخدام مع أكثر من 100 مشارك',
                '• تقديم مفاهيم التصميم لأصحاب المصلحة ودمج الملاحظات',
            ],
            [
                '• تصميم تطبيقات الهاتف والويب لمنصات iOS و Android',
                '• إنشاء النماذج الأولية والماكيتات عالية الدقة',
                '• التعاون مع المطورين لضمان دقة تنفيذ التصميم',
                '• تحسين معدلات التحويل بنسبة 35% من خلال اختبار A/B',
            ],
            [
                '• المساعدة في إنشاء التصاميم المرئية لحملات التسويق',
                '• الحفاظ على اتساق العلامة التجارية عبر جميع التسليمات',
                '• دعم المصممين الكبار في إنشاء الأصول',
            ],
        ],
        marketing: [
            [
                '• تطوير وتنفيذ استراتيجيات التسويق بعائد استثمار 200%',
                '• إدارة ميزانية تسويق سنوية تتجاوز 500 ألف دولار عبر القنوات الرقمية',
                '• قيادة فريق من 4 مسوقين في تخطيط وتنفيذ الحملات',
                '• زيادة الزيارات العضوية بنسبة 150% من خلال تحسين SEO',
                '• بناء شراكات مع المؤثرين للوصول إلى أكثر من 2 مليون متابع',
            ],
            [
                '• إنشاء استراتيجية محتوى تجذب أكثر من 100 ألف زائر شهرياً للمدونة',
                '• إدارة حسابات التواصل الاجتماعي مع نمو المتابعين بنسبة 300%',
                '• تنفيذ حملات البريد الإلكتروني بمعدل فتح 35% ومعدل نقر 15%',
                '• تحليل أداء الحملات والتحسين بناءً على البيانات',
            ],
            [
                '• المساعدة في إنشاء وجدولة محتوى وسائل التواصل الاجتماعي',
                '• دعم الفريق في بحث السوق والتحليل التنافسي',
                '• المساعدة في تنظيم فعاليات التسويق والندوات عبر الإنترنت',
            ],
        ],
        finance: [
            [
                '• إدارة التخطيط والتحليل المالي لوحدة أعمال تتجاوز 50 مليون دولار',
                '• قيادة عملية الميزانية السنوية والتنبؤات الفصلية',
                '• تحديد فرص توفير التكاليف بأكثر من مليون دولار',
                '• تقديم التقارير المالية للإدارة التنفيذية',
                '• الإشراف على فريق من 3 محللين وتنسيق عمليات التدقيق',
            ],
            [
                '• إعداد البيانات المالية الشهرية وتحليل الفروقات',
                '• تطوير النماذج المالية لتخطيط الأعمال',
                '• تبسيط عمليات التقارير وتقليل وقت الإغلاق بنسبة 30%',
                '• دعم العناية الواجبة والتكامل في عمليات الاندماج',
            ],
            [
                '• المساعدة في معالجة الحسابات الدائنة والمدينة',
                '• تسوية كشوف البنك وحسابات دفتر الأستاذ',
                '• دعم كبار المحاسبين في إغلاق نهاية الشهر',
            ],
        ],
        healthcare: [
            [
                '• الإشراف على طاقم التمريض من أكثر من 15 شخصاً في تقديم رعاية المرضى',
                '• تنفيذ مبادرات تحسين الجودة لتقليل الأخطاء بنسبة 40%',
                '• تنسيق خطط رعاية المرضى مع الفريق متعدد التخصصات',
                '• الحفاظ على الامتثال لـ HIPAA والمتطلبات التنظيمية',
                '• تدريب الموظفين الجدد على البروتوكولات وأفضل الممارسات',
            ],
            [
                '• تقديم الرعاية المباشرة لأكثر من 10 مرضى يومياً',
                '• إعطاء الأدوية ومراقبة حالات المرضى',
                '• توثيق معلومات المرضى بدقة في أنظمة السجلات الطبية',
                '• التعاون مع الأطباء في خطط العلاج',
            ],
            [
                '• المساعدة في استقبال المرضى ومراقبة العلامات الحيوية',
                '• دعم طاقم التمريض في أنشطة الرعاية اليومية',
                '• الحفاظ على بيئات المرضى نظيفة ومنظمة',
            ],
        ],
        education: [
            [
                '• تطوير منهج دراسي معتمد في جميع أنحاء المنطقة يخدم أكثر من 5000 طالب',
                '• توجيه أكثر من 10 معلمين في تنفيذ استراتيجيات تعليمية جديدة',
                '• تحسين درجات تحصيل الطلاب بنسبة 25% على مدى 3 سنوات',
                '• قيادة ورش التطوير المهني وجلسات التدريب',
                '• تأمين أكثر من 100 ألف دولار في المنح للبرامج التعليمية',
            ],
            [
                '• تدريس فصول تضم أكثر من 25 طالباً عبر مستويات متعددة',
                '• إنشاء خطط دروس جذابة متوافقة مع المعايير',
                '• تنفيذ التعليم المتمايز للمتعلمين المتنوعين',
                '• التواصل المنتظم مع الآباء حول تقدم الطلاب',
            ],
            [
                '• مساعدة المعلمين الرئيسيين في التدريس الصفي',
                '• دعم الطلاب بالدروس الفردية والجماعية الصغيرة',
                '• المساعدة في تنظيم الفصل والمواد',
            ],
        ],
        sales: [
            [
                '• تجاوز الحصة السنوية بنسبة 150%، توليد أكثر من 5 ملايين دولار من الإيرادات',
                '• بناء وإدارة فريق من 8 مندوبي مبيعات',
                '• تطوير خطط حسابات استراتيجية للعملاء المؤسسيين',
                '• التفاوض على عقود تتجاوز 500 ألف دولار مع التنفيذيين',
                '• تنفيذ عمليات CRM لتحسين دقة التنبؤ بنسبة 40%',
            ],
            [
                '• تحقيق 120% من الحصة باستمرار لمدة 8 أرباع متتالية',
                '• إدارة خط أنابيب من أكثر من 50 فرصة بقيمة تتجاوز 2 مليون دولار',
                '• إجراء عروض المنتجات والعروض التقديمية',
                '• الحفاظ على معدل احتفاظ بالعملاء بنسبة 95%',
            ],
            [
                '• توليد العملاء المحتملين من خلال الاتصال البارد والتواصل',
                '• مساعدة كبار الممثلين في اجتماعات العملاء',
                '• الحفاظ على سجلات دقيقة في نظام CRM',
            ],
        ],
        hospitality: [
            [
                '• الإشراف على فريق من أكثر من 10 نوادل لضمان جودة خدمة ثابتة',
                '• تدريب الموظفين الجدد على قائمة الطعام وأنظمة نقاط البيع ومعايير الخدمة',
                '• حل شكاوى العملاء باحترافية، والحفاظ على معدل رضا 95%',
                '• التنسيق مع طاقم المطبخ لضمان تسليم الطعام في الوقت المناسب',
                '• إدارة قسم من أكثر من 8 طاولات خلال ساعات الذروة مع خدمة أكثر من 100 ضيف يومياً',
            ],
            [
                '• تقديم خدمة طاولة ممتازة في مطعم سريع يتسع لـ 200 شخص',
                '• زيادة متوسط الفاتورة بنسبة 20% من خلال البيع الإضافي الفعال',
                '• حفظ قائمة الطعام الشاملة بما في ذلك العروض اليومية وتوصيات النبيذ',
                '• معالجة المدفوعات بدقة مع التعامل مع أكثر من 500 دولار في المعاملات اليومية',
            ],
            [
                '• استقبال وإجلاس الضيوف لضمان انطباعات أولى إيجابية',
                '• تلقي طلبات الطعام والمشروبات بدقة باستخدام نظام نقاط البيع',
                '• الحفاظ على منطقة تناول الطعام نظيفة ومنظمة طوال المناوبات',
            ],
        ],
        general: [
            [
                '• قيادة فريق متعدد الوظائف من أكثر من 10 أعضاء في المبادرات الاستراتيجية',
                '• إدارة مشاريع بميزانيات تصل إلى 500 ألف دولار وتسليمها في الوقت المحدد',
                '• تحسين الكفاءة التشغيلية بنسبة 30% من خلال تحسين العمليات',
                '• تطوير وتنفيذ سياسات وإجراءات الإدارة',
                '• تقديم التقارير الفصلية للإدارة العليا',
            ],
            [
                '• تنسيق العمليات اليومية وإدارة سير العمل',
                '• التعاون مع أصحاب المصلحة للوفاء بمواعيد المشاريع',
                '• تحليل البيانات لتحديد الاتجاهات وفرص التحسين',
                '• تدريب أعضاء الفريق الجدد على العمليات والأنظمة',
            ],
            [
                '• دعم الفريق في المهام الإدارية والتشغيلية',
                '• المساعدة في إدخال البيانات وإعداد التقارير',
                '• المساعدة في تنظيم اجتماعات الفريق والفعاليات',
            ],
        ],
    },
};

// Generate job descriptions with bullet points (locale-aware)
function generateJobDescription(category: JobCategory, positionIndex: number, level: OnboardingInput['experienceLevel'], locale?: string): string {
    const descriptions = jobDescriptionsByLocale[locale || 'en'] || jobDescriptionsByLocale.en;
    const categoryDescriptions = descriptions[category];
    const descriptionSet = categoryDescriptions[Math.min(positionIndex, categoryDescriptions.length - 1)];

    return descriptionSet.join('\n');
}

// Master's degree translations by locale
const masterDegrees: Record<string, { tech: string; business: string; school: string }> = {
    en: { tech: 'Master of Science in Computer Science', business: 'Master of Business Administration', school: 'Graduate School of Business' },
    es: { tech: 'Maestría en Ciencias de la Computación', business: 'Maestría en Administración de Empresas', school: 'Escuela de Posgrado de Negocios' },
    fr: { tech: 'Master en Informatique', business: 'Master en Administration des Affaires', school: 'École de Commerce' },
    de: { tech: 'Master of Science in Informatik', business: 'Master of Business Administration', school: 'Graduate School of Business' },
    ar: { tech: 'ماجستير علوم الحاسب', business: 'ماجستير إدارة الأعمال', school: 'كلية الدراسات العليا للأعمال' },
};

// Generate education (locale-aware)
function generateEducation(input: OnboardingInput, category: JobCategory): Education[] {
    const locData = getLocaleData(input.locale);
    const locale = input.locale || 'en';
    const years = experienceYears[input.experienceLevel];
    const currentYear = new Date().getFullYear();
    const gradYear = currentYear - years - 4; // Assume 4 years of college

    // Get degree info from locale data
    const degreeInfo = locData.degrees[category];
    const city = locData.cities[0];
    const country = locData.country;

    const education: Education[] = [
        {
            id: 'edu-1',
            school: degreeInfo.school,
            degree: degreeInfo.degree,
            city: city,
            country: country,
            startDate: `${gradYear - 4}-09`,
            endDate: `${gradYear}-05`,
            current: false,
            description: locData.educationDescription,
        },
    ];

    // Add master's degree for senior/executive
    if (input.experienceLevel === 'senior' || input.experienceLevel === 'executive') {
        const masterData = masterDegrees[locale] || masterDegrees.en;
        education.unshift({
            id: 'edu-0',
            school: masterData.school,
            degree: category === 'tech' ? masterData.tech : masterData.business,
            city: locData.cities[1] || locData.cities[0],
            country: country,
            startDate: `${gradYear + 2}-09`,
            endDate: `${gradYear + 4}-05`,
            current: false,
            description: '',
        });
    }

    return education;
}

// Generate skills
function generateSkills(category: JobCategory): Skill[] {
    const categorySkills = skillsByCategory[category];

    return categorySkills.slice(0, 8).map((name, index) => ({
        id: `skill-${index + 1}`,
        name,
        level: Math.max(3, 5 - Math.floor(index / 3)), // Top skills get higher ratings
    }));
}

// Phone formats by locale
const phoneFormats: Record<string, string> = {
    en: '+1 (555) 000-0000',
    es: '+34 600 000 000',
    fr: '+33 6 00 00 00 00',
    de: '+49 170 0000000',
    ar: '+971 50 000 0000',
};

/**
 * Main AI Resume Generator function
 * Takes onboarding input and generates complete resume data
 */
export function generateAIResume(input: OnboardingInput): Partial<ResumeData> {
    const category = detectJobCategory(input.jobTitle);
    const locData = getLocaleData(input.locale);
    const locale = input.locale || 'en';

    // Get locale-specific location
    const location = `${locData.cities[0]}, ${locData.country}`;
    const phone = phoneFormats[locale] || phoneFormats.en;

    return {
        personalInfo: {
            fullName: input.fullName,
            jobTitle: input.jobTitle,
            email: `${input.fullName.toLowerCase().replace(/\s+/g, '.')}@email.com`,
            phone: phone,
            location: location,
            website: '',
            linkedin: `linkedin.com/in/${input.fullName.toLowerCase().replace(/\s+/g, '')}`,
            summary: generateSummary(input, category),
            profileImage: '',
            imageShape: 'circle',
            nationality: '',
            idType: '',
            idNumber: '',
        },
        experience: generateExperience(input, category),
        education: generateEducation(input, category),
        skills: generateSkills(category),
    };
}

/**
 * Async version for future AI API integration
 * Currently wraps the synchronous function, but can be modified
 * to call OpenAI/Claude APIs
 */
export async function generateAIResumeAsync(input: OnboardingInput): Promise<Partial<ResumeData>> {
    // Simulate API delay for realistic UX
    await new Promise(resolve => setTimeout(resolve, 2000));

    // TODO: Replace with actual AI API call
    // const response = await fetch('/api/generate-resume', {
    //     method: 'POST',
    //     body: JSON.stringify(input),
    // });
    // return response.json();

    return generateAIResume(input);
}

/**
 * Generate only the professional summary based on job title and experience level.
 * Used by the "Generate with AI" button in the builder.
 */
export function generateSummaryOnly(
    jobTitle: string,
    experienceLevel: OnboardingInput['experienceLevel'] = 'mid'
): string {
    const category = detectJobCategory(jobTitle);
    const input: OnboardingInput = {
        fullName: '', // Not needed for summary
        jobTitle,
        experienceLevel,
    };
    return generateSummary(input, category);
}
