import type { FaqItem, CrossLinkItem } from './types';
import { selectContent } from './types';

export interface BiodataComparisonRow {
  aspect: string;
  biodata: string;
  resume: string;
  cv: string;
  biodataHighlight?: string;
}

export interface BiodataStructureSection {
  number: number;
  label: string;
  detail: string;
  colorGroup: 'orange' | 'blue' | 'default' | 'dark';
}

export interface BiodataFormatPageContent {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  schemas: {
    breadcrumbName: string;
    articleHeadline: string;
    articleDescription: string;
  };
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    ctaTemplates: string;
    ctaBuild: string;
  };
  whatIs: {
    title: string;
    paragraphs: string[];
    insightTitle: string;
    insightText: string;
  };
  vsComparison: {
    title: string;
    subtitle: string;
    headers: { aspect: string; biodata: string; resume: string; cv: string };
    rows: BiodataComparisonRow[];
  };
  structure: {
    title: string;
    description: string;
    sections: BiodataStructureSection[];
    proTipTitle: string;
    proTipText: string;
  };
  personalInfo: {
    title: string;
    description: string;
    alwaysInclude: { title: string; items: string[] };
    optional: { title: string; items: string[] };
    noteTitle: string;
    noteText: string;
  };
  types: {
    title: string;
    jobBiodata: {
      title: string;
      description: string;
      focusTitle: string;
      focusItems: string[];
      commonTitle: string;
      commonItems: string[];
    };
    marriageBiodata: {
      title: string;
      description: string;
      sectionsTitle: string;
      sectionsItems: string[];
      designTitle: string;
      designItems: string[];
    };
  };
  regions: {
    title: string;
    description: string;
    items: { country: string; flag: string; text: string }[];
  };
  templates: {
    title: string;
    subtitle: string;
    cards: { title: string; description: string; ctaLabel: string; color: string }[];
  };
  tips: {
    title: string;
    items: { title: string; description: string }[];
  };
  faq: {
    title: string;
    items: FaqItem[];
  };
  crossLinks: {
    title: string;
    items: CrossLinkItem[];
  };
  externalResources: {
    title: string;
    items: { href: string; label: string }[];
  };
  bottomCta: {
    title: string;
    description: string;
    ctaLabel: string;
  };
}

// ---------------------------------------------------------------------------
// English
// ---------------------------------------------------------------------------
const en: BiodataFormatPageContent = {
  meta: {
    title: 'Biodata Format 2026: Free Templates, Examples & Writing Guide | Best AI Resume',
    description:
      'Learn the biodata format for job applications. Compare biodata vs resume, download free biodata templates (PDF & Word), and see examples for India, Pakistan & more.',
    keywords:
      'biodata format, biodata, biodata for job, biodata vs resume, marriage biodata format, biodata template, simple biodata format, job biodata',
  },
  schemas: {
    breadcrumbName: 'Biodata Format Guide',
    articleHeadline: 'Biodata Format Guide 2026: Templates, Examples & How to Write',
    articleDescription:
      'Complete guide to biodata format for job applications and marriage. Learn the difference between biodata vs resume, download free templates, and see examples.',
  },
  hero: {
    badge: 'Complete Guide for 2026',
    title: 'Biodata Format Guide',
    titleHighlight: '(Free Templates)',
    subtitle:
      'The <strong>biodata format</strong> is the standard document for job applications in India, Pakistan, Bangladesh, and the Middle East. Learn when to use biodata vs resume, and download free templates that match regional expectations.',
    ctaTemplates: 'Download Templates',
    ctaBuild: 'Create Biodata with AI',
  },
  whatIs: {
    title: 'What is Biodata?',
    paragraphs: [
      '<strong>Biodata</strong> (short for <em>biographical data</em>) is a document that provides a comprehensive overview of your personal and professional background. Unlike a resume that focuses primarily on work experience and skills, biodata includes <strong>personal details</strong> such as date of birth, marital status, nationality, religion, and sometimes family information.',
      'The biodata format is widely used in <strong>South Asian countries</strong> (India, Pakistan, Bangladesh, Sri Lanka), the <strong>Middle East</strong> (UAE, Saudi Arabia, Qatar), and parts of <strong>Southeast Asia</strong> (Philippines, Malaysia). Government jobs, public sector companies, and traditional organizations in these regions often specifically request biodata rather than a Western-style resume.',
    ],
    insightTitle: 'Key Insight:',
    insightText:
      'If you\'re applying for jobs in India, Pakistan, or the Gulf countries, knowing the biodata format is essential. Many employers will reject applications that don\'t follow the expected format.',
  },
  vsComparison: {
    title: 'Biodata vs Resume vs CV: What\u2019s the Difference?',
    subtitle: 'Understanding when to use each document is crucial for your job search success.',
    headers: { aspect: 'Aspect', biodata: 'Biodata', resume: 'Resume', cv: 'CV' },
    rows: [
      { aspect: 'Length', biodata: '1-2 pages', resume: '1-2 pages', cv: '2+ pages' },
      {
        aspect: 'Personal Details',
        biodata: 'Extensive (DOB, marital status, religion, family)',
        resume: 'Minimal (name, contact only)',
        cv: 'Minimal (name, contact only)',
        biodataHighlight: 'green',
      },
      { aspect: 'Focus', biodata: 'Personal background + Career', resume: 'Skills + Achievements', cv: 'Academic + Research' },
      {
        aspect: 'Common Regions',
        biodata: 'India, Pakistan, Middle East, Philippines',
        resume: 'USA, Canada, Australia',
        cv: 'Europe, UK, Academia worldwide',
      },
      {
        aspect: 'Best For',
        biodata: 'Government jobs, traditional companies, matrimonial',
        resume: 'Corporate jobs, startups, tech',
        cv: 'Academic positions, research, medical',
      },
      {
        aspect: 'Customization',
        biodata: 'Same biodata for multiple applications',
        resume: 'Tailored for each job',
        cv: 'Updated as achievements grow',
      },
    ],
  },
  structure: {
    title: 'Standard Biodata Format Structure',
    description: 'While there\u2019s no single "official" biodata format, most employers expect these sections in this order:',
    sections: [
      { number: 1, label: 'Personal Information', detail: 'Name, Photo, DOB, Gender, Marital Status, Nationality', colorGroup: 'orange' },
      { number: 2, label: 'Contact Details', detail: 'Address (Permanent & Current), Phone, Email', colorGroup: 'default' },
      { number: 3, label: 'Career Objective', detail: '2-3 sentences about your career goals', colorGroup: 'default' },
      { number: 4, label: 'Educational Qualifications', detail: 'Degrees, Institutions, Years, Percentages/CGPA', colorGroup: 'blue' },
      { number: 5, label: 'Work Experience', detail: 'Company, Designation, Duration, Responsibilities', colorGroup: 'blue' },
      { number: 6, label: 'Skills & Competencies', detail: 'Technical skills, Languages, Software proficiency', colorGroup: 'default' },
      { number: 7, label: 'Additional Information', detail: 'Hobbies, Interests, Achievements, References', colorGroup: 'default' },
      { number: 8, label: 'Declaration', detail: '\u201cI hereby declare that the above information is true\u2026\u201d', colorGroup: 'dark' },
    ],
    proTipTitle: 'Pro Tip:',
    proTipText:
      'Always include a passport-size photograph in the top right corner of your biodata. This is expected in most South Asian and Middle Eastern countries, unlike Western resumes where photos are discouraged.',
  },
  personalInfo: {
    title: 'What Personal Information to Include in Biodata',
    description: 'The personal information section is what distinguishes biodata from a resume. Here\u2019s what\u2019s typically expected:',
    alwaysInclude: {
      title: 'Always Include',
      items: [
        'Full Name (as per official documents)',
        'Date of Birth',
        'Gender',
        'Nationality',
        'Marital Status',
        'Languages Known',
        'Permanent Address',
        'Current Address',
        'Phone Number',
        'Email Address',
      ],
    },
    optional: {
      title: 'Optional (Context-Dependent)',
      items: [
        'Father\u2019s Name & Occupation',
        'Mother\u2019s Name',
        'Religion (if required by employer)',
        'Caste/Community (government jobs in India)',
        'Blood Group',
        'Height & Weight',
        'Passport Number (for overseas jobs)',
        'Visa Status',
      ],
    },
    noteTitle: 'Important Note:',
    noteText:
      'While biodata traditionally includes details like religion and caste, many modern private companies in India are moving away from requesting this information. Include only what is specifically asked for in the job posting.',
  },
  types: {
    title: 'Types of Biodata',
    jobBiodata: {
      title: '1. Job Biodata (Employment Biodata)',
      description:
        'Used for job applications, especially in government sectors, PSUs (Public Sector Undertakings), and traditional companies in South Asia.',
      focusTitle: 'Key Focus Areas:',
      focusItems: [
        'Educational qualifications with grades',
        'Work experience with responsibilities',
        'Technical and soft skills',
        'Certifications and training',
      ],
      commonTitle: 'Common For:',
      commonItems: [
        'UPSC, SSC, Bank exams (India)',
        'PPSC, FPSC jobs (Pakistan)',
        'Gulf country employment',
        'Teaching positions',
      ],
    },
    marriageBiodata: {
      title: '2. Marriage Biodata (Matrimonial Biodata)',
      description:
        'Used in arranged marriage traditions in India, Pakistan, Bangladesh, and among diaspora communities. This format includes extensive personal and family details.',
      sectionsTitle: 'Additional Sections:',
      sectionsItems: [
        'Family background (parents, siblings)',
        'Horoscope / Kundli details',
        'Physical attributes',
        'Partner preferences',
      ],
      designTitle: 'Design Elements:',
      designItems: [
        'Decorative borders',
        'Professional photographs',
        'Religious symbols (optional)',
        '2-3 pages typical',
      ],
    },
  },
  regions: {
    title: 'Biodata Format by Region',
    description: 'Expectations vary by country. Here\u2019s what employers in different regions typically expect:',
    items: [
      {
        country: 'India',
        flag: '\ud83c\uddee\ud83c\uddf3',
        text: 'Biodata is standard for government jobs (UPSC, SSC, State PSCs), banks, and PSUs. Private MNCs often prefer resumes. Include father\u2019s name, caste category (for reservation), and a declaration statement. Photo is mandatory.',
      },
      {
        country: 'Pakistan',
        flag: '\ud83c\uddf5\ud83c\uddf0',
        text: 'Similar to India. CNIC (national ID) number is often required. Father\u2019s name and address are standard. Government and semi-government positions require detailed biodata format.',
      },
      {
        country: 'UAE / Gulf Countries',
        flag: '\ud83c\udde6\ud83c\uddea',
        text: 'Employers expect biodata with photo, nationality, visa status, and availability. Religion may be asked. Include passport details if applying from abroad. Both biodata and CV formats are accepted.',
      },
      {
        country: 'Philippines',
        flag: '\ud83c\uddf5\ud83c\udded',
        text: 'Personal Data Sheet (PDS) is the official biodata format for government positions. Private companies may accept either biodata or resume. Height, weight, and civil status are commonly included.',
      },
    ],
  },
  templates: {
    title: 'Free Biodata Templates',
    subtitle:
      'Download our professionally designed biodata templates in Word and PDF format. Customize them with your information.',
    cards: [
      {
        title: 'Job Biodata Template',
        description: 'Professional format for job applications with all standard sections.',
        ctaLabel: 'Create with AI Builder',
        color: 'blue',
      },
      {
        title: 'Simple Biodata Format',
        description: 'Clean, minimal design suitable for freshers and entry-level positions.',
        ctaLabel: 'Start Building',
        color: 'orange',
      },
    ],
  },
  tips: {
    title: 'Tips for Writing an Effective Biodata',
    items: [
      { title: 'Use a professional photograph', description: 'Passport-size, formal attire, plain background. No selfies or casual photos.' },
      { title: 'Keep it concise', description: '1-2 pages maximum. Recruiters don\u2019t read lengthy documents.' },
      { title: 'Use consistent formatting', description: 'Same font throughout, clear section headers, proper alignment.' },
      { title: 'Include a declaration', description: '\u201cI hereby declare that the information provided is true to the best of my knowledge.\u201d' },
      { title: 'List education in reverse order', description: 'Most recent qualification first. Include percentage/CGPA if impressive.' },
      { title: 'Proofread carefully', description: 'Spelling errors and typos create a negative impression instantly.' },
      { title: 'Include relevant details only', description: 'Don\u2019t add information that isn\u2019t asked for or isn\u2019t relevant to the job.' },
      { title: 'Sign and date your biodata', description: 'Add your signature at the end with the current date and place.' },
    ],
  },
  faq: {
    title: 'Frequently Asked Questions',
    items: [
      {
        question: 'What is the difference between biodata and resume?',
        answer:
          'A resume focuses on professional experience, skills, and achievements tailored to a specific job. A biodata includes personal details like date of birth, marital status, religion, and family background in addition to professional information. Resumes are standard in Western countries, while biodata is preferred in South Asia, Middle East, and parts of Southeast Asia.',
      },
      {
        question: 'Is biodata format used for job applications?',
        answer:
          'Yes, biodata is commonly used for job applications in India, Pakistan, Bangladesh, Philippines, and Middle Eastern countries. Government jobs, public sector positions, and traditional companies often specifically request biodata format instead of a resume.',
      },
      {
        question: 'What personal details should I include in biodata?',
        answer:
          'A job biodata typically includes: full name, date of birth, gender, nationality, marital status, languages known, and permanent/current address. For marriage biodata, you may also include height, weight, religion, caste, family details, and horoscope information.',
      },
      {
        question: 'How long should a biodata be?',
        answer:
          'A biodata should ideally be 1-2 pages. Job biodata is typically 1 page, while marriage biodata can extend to 2 pages to include family details and personal preferences. Keep it concise while including all relevant information.',
      },
      {
        question: 'Can I use a resume builder to create biodata?',
        answer:
          'Yes, you can use our AI resume builder to create biodata. Start with our standard resume template and add the personal information sections that biodata requires. Our builder allows you to customize sections to match the biodata format expected in your region.',
      },
      {
        question: 'What is marriage biodata?',
        answer:
          'Marriage biodata (also called matrimonial biodata) is used in countries with arranged marriage traditions like India and Pakistan. It includes extensive personal information about the individual, family background, education, career, horoscope details, and partner preferences to help families evaluate compatibility.',
      },
    ],
  },
  crossLinks: {
    title: 'Related Resources',
    items: [
      { href: '/resume-format', title: 'Resume Format Guide', subtitle: 'Chronological, functional & combination formats' },
      { href: '/templates', title: 'Resume Templates', subtitle: '20+ professional templates for any job' },
      { href: '/resume-examples', title: 'Resume Examples', subtitle: '300+ job-specific resume examples' },
    ],
  },
  externalResources: {
    title: 'External Resources',
    items: [
      { href: 'https://www.bls.gov/ooh/', label: 'Bureau of Labor Statistics: Career Outlook' },
      { href: 'https://www.glassdoor.com/blog/guide/resume-tips/', label: 'Glassdoor: Resume & Career Guide' },
    ],
  },
  bottomCta: {
    title: 'Create Your Biodata in Minutes',
    description:
      'Our AI-powered builder helps you create a professional biodata with all the right sections. Choose from multiple templates and export as PDF or Word.',
    ctaLabel: 'Build My Biodata Free',
  },
};

// ---------------------------------------------------------------------------
// Spanish
// ---------------------------------------------------------------------------
const es: BiodataFormatPageContent = {
  meta: {
    title: 'Formato Biodata 2026: Plantillas Gratis, Ejemplos y Gu\u00eda Completa | Best AI Resume',
    description:
      'Aprende el formato biodata para solicitudes de empleo. Compara biodata vs curriculum, descarga plantillas gratis de biodata (PDF y Word) y consulta ejemplos para India, Pakist\u00e1n y m\u00e1s.',
    keywords:
      'formato biodata, biodata para trabajo, biodata vs curriculum, formato biodata matrimonial, plantilla biodata, biodata formato simple, biodata empleo',
  },
  schemas: {
    breadcrumbName: 'Gu\u00eda de Formato Biodata',
    articleHeadline: 'Formato Biodata 2026: Plantillas, Ejemplos y C\u00f3mo Redactarlo',
    articleDescription:
      'Gu\u00eda completa del formato biodata para solicitudes de empleo y matrimonio. Aprende la diferencia entre biodata y curriculum, descarga plantillas gratis y consulta ejemplos.',
  },
  hero: {
    badge: 'Gu\u00eda Completa para 2026',
    title: 'Gu\u00eda de Formato Biodata',
    titleHighlight: '(Plantillas Gratis)',
    subtitle:
      'El <strong>formato biodata</strong> es el documento est\u00e1ndar para solicitudes de empleo en India, Pakist\u00e1n, Banglad\u00e9s y Oriente Medio. Aprende cu\u00e1ndo usar biodata en lugar del curriculum y descarga plantillas adaptadas a cada regi\u00f3n.',
    ctaTemplates: 'Descargar Plantillas',
    ctaBuild: 'Crear Biodata con IA',
  },
  whatIs: {
    title: '\u00bfQu\u00e9 es un Biodata?',
    paragraphs: [
      '<strong>Biodata</strong> (abreviatura de <em>biographical data</em>, datos biogr\u00e1ficos) es un documento que ofrece una visi\u00f3n completa de tu perfil personal y profesional. A diferencia de un curriculum que se centra principalmente en la experiencia laboral y las habilidades, el biodata incluye <strong>datos personales</strong> como fecha de nacimiento, estado civil, nacionalidad, religi\u00f3n y, en ocasiones, informaci\u00f3n familiar.',
      'El formato biodata se utiliza ampliamente en <strong>pa\u00edses del sur de Asia</strong> (India, Pakist\u00e1n, Banglad\u00e9s, Sri Lanka), <strong>Oriente Medio</strong> (Emiratos \u00c1rabes Unidos, Arabia Saudita, Catar) y partes del <strong>sudeste asi\u00e1tico</strong> (Filipinas, Malasia). Los empleos gubernamentales, las empresas del sector p\u00fablico y las organizaciones tradicionales de estas regiones suelen solicitar espec\u00edficamente un biodata en vez de un curriculum al estilo occidental.',
    ],
    insightTitle: 'Dato Clave:',
    insightText:
      'Si est\u00e1s postulando a empleos en India, Pakist\u00e1n o los pa\u00edses del Golfo, conocer el formato biodata es imprescindible. Muchos empleadores rechazan solicitudes que no siguen el formato esperado.',
  },
  vsComparison: {
    title: 'Biodata vs Curriculum vs CV: \u00bfCu\u00e1l es la Diferencia?',
    subtitle: 'Entender cu\u00e1ndo usar cada documento es fundamental para tu b\u00fasqueda de empleo.',
    headers: { aspect: 'Aspecto', biodata: 'Biodata', resume: 'Curriculum', cv: 'CV' },
    rows: [
      { aspect: 'Extensi\u00f3n', biodata: '1-2 p\u00e1ginas', resume: '1-2 p\u00e1ginas', cv: '2+ p\u00e1ginas' },
      {
        aspect: 'Datos Personales',
        biodata: 'Extensos (fecha de nacimiento, estado civil, religi\u00f3n, familia)',
        resume: 'M\u00ednimos (nombre y contacto)',
        cv: 'M\u00ednimos (nombre y contacto)',
        biodataHighlight: 'green',
      },
      { aspect: 'Enfoque', biodata: 'Perfil personal + Carrera', resume: 'Habilidades + Logros', cv: 'Acad\u00e9mico + Investigaci\u00f3n' },
      {
        aspect: 'Regiones Comunes',
        biodata: 'India, Pakist\u00e1n, Oriente Medio, Filipinas',
        resume: 'EE.\u00a0UU., Canad\u00e1, Australia',
        cv: 'Europa, Reino Unido, \u00e1mbito acad\u00e9mico mundial',
      },
      {
        aspect: 'Ideal Para',
        biodata: 'Empleos gubernamentales, empresas tradicionales, matrimonio',
        resume: 'Empleo corporativo, startups, tecnolog\u00eda',
        cv: 'Puestos acad\u00e9micos, investigaci\u00f3n, medicina',
      },
      {
        aspect: 'Personalizaci\u00f3n',
        biodata: 'Mismo biodata para varias postulaciones',
        resume: 'Adaptado a cada puesto',
        cv: 'Se actualiza a medida que creces profesionalmente',
      },
    ],
  },
  structure: {
    title: 'Estructura Est\u00e1ndar del Formato Biodata',
    description: 'Aunque no existe un formato biodata \u00aboficial\u00bb \u00fanico, la mayor\u00eda de los empleadores esperan estas secciones en este orden:',
    sections: [
      { number: 1, label: 'Informaci\u00f3n Personal', detail: 'Nombre, Foto, Fecha de nacimiento, G\u00e9nero, Estado civil, Nacionalidad', colorGroup: 'orange' },
      { number: 2, label: 'Datos de Contacto', detail: 'Direcci\u00f3n (permanente y actual), Tel\u00e9fono, Correo electr\u00f3nico', colorGroup: 'default' },
      { number: 3, label: 'Objetivo Profesional', detail: '2-3 oraciones sobre tus metas profesionales', colorGroup: 'default' },
      { number: 4, label: 'Formaci\u00f3n Acad\u00e9mica', detail: 'T\u00edtulos, Instituciones, A\u00f1os, Porcentajes/CGPA', colorGroup: 'blue' },
      { number: 5, label: 'Experiencia Laboral', detail: 'Empresa, Cargo, Duraci\u00f3n, Responsabilidades', colorGroup: 'blue' },
      { number: 6, label: 'Habilidades y Competencias', detail: 'Habilidades t\u00e9cnicas, Idiomas, Dominio de software', colorGroup: 'default' },
      { number: 7, label: 'Informaci\u00f3n Adicional', detail: 'Hobbies, Intereses, Logros, Referencias', colorGroup: 'default' },
      { number: 8, label: 'Declaraci\u00f3n Jurada', detail: '\u00abDeclaro que la informaci\u00f3n anterior es veraz\u2026\u00bb', colorGroup: 'dark' },
    ],
    proTipTitle: 'Consejo Profesional:',
    proTipText:
      'Incluye siempre una fotograf\u00eda tama\u00f1o pasaporte en la esquina superior derecha de tu biodata. Esto es obligatorio en la mayor\u00eda de pa\u00edses del sur de Asia y Oriente Medio, a diferencia del curriculum occidental donde las fotos no se recomiendan.',
  },
  personalInfo: {
    title: 'Qu\u00e9 Datos Personales Incluir en el Biodata',
    description: 'La secci\u00f3n de informaci\u00f3n personal es lo que distingue al biodata del curriculum. Esto es lo que normalmente se espera:',
    alwaysInclude: {
      title: 'Siempre Incluir',
      items: [
        'Nombre completo (seg\u00fan documentos oficiales)',
        'Fecha de nacimiento',
        'G\u00e9nero',
        'Nacionalidad',
        'Estado civil',
        'Idiomas conocidos',
        'Direcci\u00f3n permanente',
        'Direcci\u00f3n actual',
        'N\u00famero de tel\u00e9fono',
        'Correo electr\u00f3nico',
      ],
    },
    optional: {
      title: 'Opcional (Seg\u00fan Contexto)',
      items: [
        'Nombre y ocupaci\u00f3n del padre',
        'Nombre de la madre',
        'Religi\u00f3n (si lo solicita el empleador)',
        'Casta/Comunidad (empleos gubernamentales en India)',
        'Grupo sangu\u00edneo',
        'Estatura y peso',
        'N\u00famero de pasaporte (para empleos en el extranjero)',
        'Estatus migratorio',
      ],
    },
    noteTitle: 'Nota Importante:',
    noteText:
      'Aunque el biodata tradicionalmente incluye datos como religi\u00f3n y casta, muchas empresas privadas modernas en India est\u00e1n dejando de solicitar esta informaci\u00f3n. Incluye solo lo que se pida espec\u00edficamente en la oferta de empleo.',
  },
  types: {
    title: 'Tipos de Biodata',
    jobBiodata: {
      title: '1. Biodata para Trabajo (Biodata Laboral)',
      description:
        'Se utiliza para solicitudes de empleo, especialmente en el sector gubernamental, empresas p\u00fablicas (PSU) y organizaciones tradicionales del sur de Asia.',
      focusTitle: '\u00c1reas Clave:',
      focusItems: [
        'Formaci\u00f3n acad\u00e9mica con calificaciones',
        'Experiencia laboral con responsabilidades',
        'Habilidades t\u00e9cnicas y blandas',
        'Certificaciones y formaci\u00f3n complementaria',
      ],
      commonTitle: 'Frecuente En:',
      commonItems: [
        'Ex\u00e1menes UPSC, SSC, bancarios (India)',
        'Empleos PPSC, FPSC (Pakist\u00e1n)',
        'Empleo en pa\u00edses del Golfo',
        'Puestos de docencia',
      ],
    },
    marriageBiodata: {
      title: '2. Biodata Matrimonial (Biodata de Matrimonio)',
      description:
        'Utilizado en las tradiciones de matrimonio concertado en India, Pakist\u00e1n, Banglad\u00e9s y entre comunidades de la di\u00e1spora. Este formato incluye amplios detalles personales y familiares.',
      sectionsTitle: 'Secciones Adicionales:',
      sectionsItems: [
        'Historial familiar (padres, hermanos)',
        'Datos del hor\u00f3scopo / Kundli',
        'Atributos f\u00edsicos',
        'Preferencias de pareja',
      ],
      designTitle: 'Elementos de Dise\u00f1o:',
      designItems: [
        'Bordes decorativos',
        'Fotograf\u00edas profesionales',
        'S\u00edmbolos religiosos (opcional)',
        '2-3 p\u00e1ginas t\u00edpicamente',
      ],
    },
  },
  regions: {
    title: 'Formato Biodata seg\u00fan la Regi\u00f3n',
    description: 'Las expectativas var\u00edan seg\u00fan el pa\u00eds. Esto es lo que los empleadores de cada regi\u00f3n suelen esperar:',
    items: [
      {
        country: 'India',
        flag: '\ud83c\uddee\ud83c\uddf3',
        text: 'El biodata es est\u00e1ndar para empleos gubernamentales (UPSC, SSC, PSC estatales), bancos y empresas p\u00fablicas. Las multinacionales privadas suelen preferir el curriculum. Incluye el nombre del padre, la categor\u00eda de casta (para reservas) y una declaraci\u00f3n jurada. La foto es obligatoria.',
      },
      {
        country: 'Pakist\u00e1n',
        flag: '\ud83c\uddf5\ud83c\uddf0',
        text: 'Similar a India. A menudo se requiere el n\u00famero de CNIC (identificaci\u00f3n nacional). El nombre del padre y la direcci\u00f3n son datos est\u00e1ndar. Los puestos gubernamentales y semigubernamentales exigen un formato biodata detallado.',
      },
      {
        country: 'EAU / Pa\u00edses del Golfo',
        flag: '\ud83c\udde6\ud83c\uddea',
        text: 'Los empleadores esperan un biodata con foto, nacionalidad, estatus de visa y disponibilidad. Puede pedirse la religi\u00f3n. Incluye datos del pasaporte si postulas desde el extranjero. Se aceptan tanto el formato biodata como el CV.',
      },
      {
        country: 'Filipinas',
        flag: '\ud83c\uddf5\ud83c\udded',
        text: 'La Hoja de Datos Personales (PDS) es el formato biodata oficial para puestos gubernamentales. Las empresas privadas pueden aceptar biodata o curriculum. Es com\u00fan incluir estatura, peso y estado civil.',
      },
    ],
  },
  templates: {
    title: 'Plantillas Biodata Gratis',
    subtitle:
      'Descarga nuestras plantillas de biodata dise\u00f1adas profesionalmente en formato Word y PDF. Personal\u00edzalas con tu informaci\u00f3n.',
    cards: [
      {
        title: 'Plantilla Biodata para Trabajo',
        description: 'Formato profesional para solicitudes de empleo con todas las secciones est\u00e1ndar.',
        ctaLabel: 'Crear con el Constructor IA',
        color: 'blue',
      },
      {
        title: 'Formato Biodata Simple',
        description: 'Dise\u00f1o limpio y minimalista ideal para reci\u00e9n graduados y puestos iniciales.',
        ctaLabel: 'Empezar a Crear',
        color: 'orange',
      },
    ],
  },
  tips: {
    title: 'Consejos para Redactar un Biodata Efectivo',
    items: [
      { title: 'Usa una fotograf\u00eda profesional', description: 'Tama\u00f1o pasaporte, ropa formal, fondo liso. Nada de selfies ni fotos informales.' },
      { title: 'S\u00e9 conciso', description: '1-2 p\u00e1ginas como m\u00e1ximo. Los reclutadores no leen documentos extensos.' },
      { title: 'Mant\u00e9n un formato consistente', description: 'Misma tipograf\u00eda en todo el documento, encabezados claros, alineaci\u00f3n correcta.' },
      { title: 'Incluye una declaraci\u00f3n jurada', description: '\u00abDeclaro que la informaci\u00f3n proporcionada es veraz seg\u00fan mi leal saber y entender.\u00bb' },
      { title: 'Ordena la formaci\u00f3n de forma inversa', description: 'La cualificaci\u00f3n m\u00e1s reciente primero. Incluye porcentaje/CGPA si es destacable.' },
      { title: 'Revisa cuidadosamente', description: 'Los errores ortogr\u00e1ficos y de escritura generan una impresi\u00f3n negativa de inmediato.' },
      { title: 'Incluye solo datos relevantes', description: 'No agregues informaci\u00f3n que no se haya pedido o que no sea pertinente para el puesto.' },
      { title: 'Firma y fecha tu biodata', description: 'A\u00f1ade tu firma al final junto con la fecha y el lugar actuales.' },
    ],
  },
  faq: {
    title: 'Preguntas Frecuentes',
    items: [
      {
        question: '\u00bfCu\u00e1l es la diferencia entre biodata y curriculum?',
        answer:
          'Un curriculum se centra en la experiencia profesional, habilidades y logros adaptados a un puesto espec\u00edfico. Un biodata incluye datos personales como fecha de nacimiento, estado civil, religi\u00f3n e historial familiar, adem\u00e1s de la informaci\u00f3n profesional. El curriculum es est\u00e1ndar en pa\u00edses occidentales, mientras que el biodata es preferido en el sur de Asia, Oriente Medio y partes del sudeste asi\u00e1tico.',
      },
      {
        question: '\u00bfSe usa el formato biodata para solicitudes de empleo?',
        answer:
          'S\u00ed, el biodata se utiliza frecuentemente para solicitudes de empleo en India, Pakist\u00e1n, Banglad\u00e9s, Filipinas y pa\u00edses de Oriente Medio. Los empleos gubernamentales, puestos del sector p\u00fablico y empresas tradicionales suelen solicitar espec\u00edficamente el formato biodata en vez de un curriculum.',
      },
      {
        question: '\u00bfQu\u00e9 datos personales debo incluir en un biodata para trabajo?',
        answer:
          'Un biodata laboral suele incluir: nombre completo, fecha de nacimiento, g\u00e9nero, nacionalidad, estado civil, idiomas conocidos y direcci\u00f3n permanente/actual. Para el biodata matrimonial tambi\u00e9n puedes a\u00f1adir estatura, peso, religi\u00f3n, casta, datos familiares e informaci\u00f3n del hor\u00f3scopo.',
      },
      {
        question: '\u00bfCu\u00e1nto debe medir un biodata?',
        answer:
          'Un biodata debe tener idealmente 1-2 p\u00e1ginas. El biodata para trabajo normalmente ocupa 1 p\u00e1gina, mientras que el biodata matrimonial puede extenderse a 2 p\u00e1ginas para incluir datos familiares y preferencias personales. Mant\u00e9nlo conciso pero con toda la informaci\u00f3n relevante.',
      },
      {
        question: '\u00bfPuedo usar un creador de curriculum para hacer un biodata?',
        answer:
          'S\u00ed, puedes usar nuestro creador de curriculum con IA para elaborar tu biodata. Comienza con una plantilla est\u00e1ndar y agrega las secciones de informaci\u00f3n personal que el biodata requiere. Nuestro constructor permite personalizar las secciones para que coincidan con el formato biodata esperado en tu regi\u00f3n.',
      },
      {
        question: '\u00bfQu\u00e9 es el biodata matrimonial?',
        answer:
          'El biodata matrimonial (tambi\u00e9n llamado biodata para matrimonio concertado) se utiliza en pa\u00edses con tradiciones de matrimonios arreglados como India y Pakist\u00e1n. Incluye amplia informaci\u00f3n personal del candidato, historial familiar, educaci\u00f3n, carrera profesional, datos del hor\u00f3scopo y preferencias de pareja para que las familias eval\u00faen la compatibilidad.',
      },
    ],
  },
  crossLinks: {
    title: 'Recursos Relacionados',
    items: [
      { href: '/resume-format', title: 'Gu\u00eda de Formato de Curriculum', subtitle: 'Formatos cronol\u00f3gico, funcional y combinado' },
      { href: '/templates', title: 'Plantillas de Curriculum', subtitle: 'M\u00e1s de 20 plantillas profesionales' },
      { href: '/resume-examples', title: 'Ejemplos de Curriculum', subtitle: 'M\u00e1s de 300 ejemplos por profesi\u00f3n' },
    ],
  },
  externalResources: {
    title: 'Recursos Externos',
    items: [
      { href: 'https://www.bls.gov/ooh/', label: 'Bureau of Labor Statistics: Perspectivas Laborales' },
      { href: 'https://www.glassdoor.com/blog/guide/resume-tips/', label: 'Glassdoor: Gu\u00eda de Curriculum y Carrera' },
    ],
  },
  bottomCta: {
    title: 'Crea tu Biodata en Minutos',
    description:
      'Nuestro constructor con inteligencia artificial te ayuda a crear un biodata profesional con todas las secciones correctas. Elige entre varias plantillas y exporta en PDF o Word.',
    ctaLabel: 'Crear Mi Biodata Gratis',
  },
};

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------
const contentMap: Record<string, BiodataFormatPageContent> = { en, es };

export function getContent(locale: string): BiodataFormatPageContent {
  return selectContent(contentMap, locale);
}
