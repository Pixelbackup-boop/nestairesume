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
// French
// ---------------------------------------------------------------------------
const fr: BiodataFormatPageContent = {
  meta: {
    title: 'Format Biodata 2026 : Modèles Gratuits, Exemples et Guide | Best AI Resume',
    description:
      'Découvrez le format biodata pour les candidatures. Comparez biodata vs CV, téléchargez des modèles gratuits de biodata (PDF et Word) et consultez des exemples pour l\'Inde, le Pakistan et plus.',
    keywords:
      'format biodata, biodata, biodata emploi, biodata vs cv, format biodata mariage, modèle biodata, format biodata simple, biodata travail',
  },
  schemas: {
    breadcrumbName: 'Guide du Format Biodata',
    articleHeadline: 'Guide du Format Biodata 2026 : Modèles, Exemples et Rédaction',
    articleDescription:
      'Guide complet du format biodata pour les candidatures et le mariage. Découvrez la différence entre biodata et CV, téléchargez des modèles gratuits et consultez des exemples.',
  },
  hero: {
    badge: 'Guide Complet pour 2026',
    title: 'Guide du Format Biodata',
    titleHighlight: '(Modèles Gratuits)',
    subtitle:
      'Le <strong>format biodata</strong> est le document standard pour les candidatures en Inde, au Pakistan, au Bangladesh et au Moyen-Orient. Apprenez quand utiliser un biodata plutôt qu\'un CV et téléchargez des modèles adaptés à chaque région.',
    ctaTemplates: 'Télécharger les Modèles',
    ctaBuild: 'Créer un Biodata avec l\'IA',
  },
  whatIs: {
    title: 'Qu\'est-ce qu\'un Biodata ?',
    paragraphs: [
      '<strong>Biodata</strong> (abréviation de <em>biographical data</em>, données biographiques) est un document qui offre un aperçu complet de votre parcours personnel et professionnel. Contrairement à un CV qui se concentre principalement sur l\'expérience professionnelle et les compétences, le biodata inclut des <strong>informations personnelles</strong> telles que la date de naissance, la situation matrimoniale, la nationalité, la religion et parfois des informations familiales.',
      'Le format biodata est largement utilisé en <strong>Asie du Sud</strong> (Inde, Pakistan, Bangladesh, Sri Lanka), au <strong>Moyen-Orient</strong> (Émirats arabes unis, Arabie saoudite, Qatar) et dans certaines parties de l\'<strong>Asie du Sud-Est</strong> (Philippines, Malaisie). Les emplois gouvernementaux, les entreprises du secteur public et les organisations traditionnelles de ces régions demandent souvent spécifiquement un biodata plutôt qu\'un CV de style occidental.',
    ],
    insightTitle: 'Point Clé :',
    insightText:
      'Si vous postulez à des emplois en Inde, au Pakistan ou dans les pays du Golfe, connaître le format biodata est indispensable. De nombreux employeurs rejettent les candidatures qui ne suivent pas le format attendu.',
  },
  vsComparison: {
    title: 'Biodata vs CV vs Curriculum Vitae : Quelle Différence ?',
    subtitle: 'Comprendre quand utiliser chaque document est essentiel pour réussir votre recherche d\'emploi.',
    headers: { aspect: 'Aspect', biodata: 'Biodata', resume: 'CV', cv: 'Curriculum Vitae' },
    rows: [
      { aspect: 'Longueur', biodata: '1-2 pages', resume: '1-2 pages', cv: '2+ pages' },
      {
        aspect: 'Données Personnelles',
        biodata: 'Détaillées (date de naissance, situation matrimoniale, religion, famille)',
        resume: 'Minimales (nom et coordonnées)',
        cv: 'Minimales (nom et coordonnées)',
        biodataHighlight: 'green',
      },
      { aspect: 'Orientation', biodata: 'Parcours personnel + Carrière', resume: 'Compétences + Réalisations', cv: 'Académique + Recherche' },
      {
        aspect: 'Régions Courantes',
        biodata: 'Inde, Pakistan, Moyen-Orient, Philippines',
        resume: 'États-Unis, Canada, Australie',
        cv: 'Europe, Royaume-Uni, monde académique',
      },
      {
        aspect: 'Idéal Pour',
        biodata: 'Emplois gouvernementaux, entreprises traditionnelles, mariage',
        resume: 'Emplois en entreprise, startups, technologie',
        cv: 'Postes académiques, recherche, médecine',
      },
      {
        aspect: 'Personnalisation',
        biodata: 'Même biodata pour plusieurs candidatures',
        resume: 'Adapté à chaque poste',
        cv: 'Mis à jour au fil de la carrière',
      },
    ],
  },
  structure: {
    title: 'Structure Standard du Format Biodata',
    description: 'Bien qu\'il n\'existe pas de format biodata « officiel » unique, la plupart des employeurs attendent ces sections dans cet ordre :',
    sections: [
      { number: 1, label: 'Informations Personnelles', detail: 'Nom, Photo, Date de naissance, Genre, Situation matrimoniale, Nationalité', colorGroup: 'orange' },
      { number: 2, label: 'Coordonnées', detail: 'Adresse (permanente et actuelle), Téléphone, E-mail', colorGroup: 'default' },
      { number: 3, label: 'Objectif Professionnel', detail: '2-3 phrases sur vos objectifs de carrière', colorGroup: 'default' },
      { number: 4, label: 'Formation', detail: 'Diplômes, Établissements, Années, Pourcentages/CGPA', colorGroup: 'blue' },
      { number: 5, label: 'Expérience Professionnelle', detail: 'Entreprise, Poste, Durée, Responsabilités', colorGroup: 'blue' },
      { number: 6, label: 'Compétences', detail: 'Compétences techniques, Langues, Maîtrise logicielle', colorGroup: 'default' },
      { number: 7, label: 'Informations Complémentaires', detail: 'Loisirs, Centres d\'intérêt, Réalisations, Références', colorGroup: 'default' },
      { number: 8, label: 'Déclaration', detail: '« Je déclare que les informations ci-dessus sont exactes… »', colorGroup: 'dark' },
    ],
    proTipTitle: 'Conseil Pro :',
    proTipText:
      'Incluez toujours une photo d\'identité dans le coin supérieur droit de votre biodata. C\'est attendu dans la plupart des pays d\'Asie du Sud et du Moyen-Orient, contrairement aux CV occidentaux où les photos sont déconseillées.',
  },
  personalInfo: {
    title: 'Quelles Informations Personnelles Inclure dans un Biodata',
    description: 'La section informations personnelles est ce qui distingue le biodata du CV. Voici ce qui est généralement attendu :',
    alwaysInclude: {
      title: 'Toujours Inclure',
      items: [
        'Nom complet (tel que sur les documents officiels)',
        'Date de naissance',
        'Genre',
        'Nationalité',
        'Situation matrimoniale',
        'Langues parlées',
        'Adresse permanente',
        'Adresse actuelle',
        'Numéro de téléphone',
        'Adresse e-mail',
      ],
    },
    optional: {
      title: 'Optionnel (Selon le Contexte)',
      items: [
        'Nom et profession du père',
        'Nom de la mère',
        'Religion (si demandée par l\'employeur)',
        'Caste/Communauté (emplois gouvernementaux en Inde)',
        'Groupe sanguin',
        'Taille et poids',
        'Numéro de passeport (pour les emplois à l\'étranger)',
        'Statut de visa',
      ],
    },
    noteTitle: 'Note Importante :',
    noteText:
      'Bien que le biodata inclue traditionnellement des informations comme la religion et la caste, de nombreuses entreprises privées modernes en Inde ne demandent plus ces renseignements. N\'incluez que ce qui est spécifiquement demandé dans l\'offre d\'emploi.',
  },
  types: {
    title: 'Types de Biodata',
    jobBiodata: {
      title: '1. Biodata pour l\'Emploi (Biodata Professionnel)',
      description:
        'Utilisé pour les candidatures, notamment dans le secteur public, les entreprises d\'État (PSU) et les organisations traditionnelles en Asie du Sud.',
      focusTitle: 'Points Clés :',
      focusItems: [
        'Formation avec notes et mentions',
        'Expérience professionnelle avec responsabilités',
        'Compétences techniques et relationnelles',
        'Certifications et formations',
      ],
      commonTitle: 'Courant Pour :',
      commonItems: [
        'Concours UPSC, SSC, bancaires (Inde)',
        'Emplois PPSC, FPSC (Pakistan)',
        'Emploi dans les pays du Golfe',
        'Postes d\'enseignement',
      ],
    },
    marriageBiodata: {
      title: '2. Biodata de Mariage (Biodata Matrimonial)',
      description:
        'Utilisé dans les traditions de mariage arrangé en Inde, au Pakistan, au Bangladesh et parmi les communautés de la diaspora. Ce format inclut des informations personnelles et familiales détaillées.',
      sectionsTitle: 'Sections Supplémentaires :',
      sectionsItems: [
        'Contexte familial (parents, frères et sœurs)',
        'Détails de l\'horoscope / Kundli',
        'Attributs physiques',
        'Préférences du partenaire',
      ],
      designTitle: 'Éléments de Design :',
      designItems: [
        'Bordures décoratives',
        'Photographies professionnelles',
        'Symboles religieux (optionnel)',
        '2-3 pages en général',
      ],
    },
  },
  regions: {
    title: 'Format Biodata par Région',
    description: 'Les attentes varient selon le pays. Voici ce que les employeurs de chaque région attendent généralement :',
    items: [
      {
        country: 'Inde',
        flag: '\ud83c\uddee\ud83c\uddf3',
        text: 'Le biodata est standard pour les emplois gouvernementaux (UPSC, SSC, PSC des États), les banques et les entreprises publiques. Les multinationales privées préfèrent souvent le CV. Incluez le nom du père, la catégorie de caste (pour les réservations) et une déclaration. La photo est obligatoire.',
      },
      {
        country: 'Pakistan',
        flag: '\ud83c\uddf5\ud83c\uddf0',
        text: 'Similaire à l\'Inde. Le numéro CNIC (identité nationale) est souvent requis. Le nom du père et l\'adresse sont standard. Les postes gouvernementaux et semi-gouvernementaux exigent un format biodata détaillé.',
      },
      {
        country: 'EAU / Pays du Golfe',
        flag: '\ud83c\udde6\ud83c\uddea',
        text: 'Les employeurs attendent un biodata avec photo, nationalité, statut de visa et disponibilité. La religion peut être demandée. Incluez les détails du passeport si vous postulez depuis l\'étranger. Les formats biodata et CV sont tous deux acceptés.',
      },
      {
        country: 'Philippines',
        flag: '\ud83c\uddf5\ud83c\udded',
        text: 'La Fiche de Données Personnelles (PDS) est le format biodata officiel pour les postes gouvernementaux. Les entreprises privées peuvent accepter le biodata ou le CV. La taille, le poids et la situation matrimoniale sont couramment inclus.',
      },
    ],
  },
  templates: {
    title: 'Modèles de Biodata Gratuits',
    subtitle:
      'Téléchargez nos modèles de biodata professionnels au format Word et PDF. Personnalisez-les avec vos informations.',
    cards: [
      {
        title: 'Modèle Biodata Emploi',
        description: 'Format professionnel pour les candidatures avec toutes les sections standard.',
        ctaLabel: 'Créer avec le Constructeur IA',
        color: 'blue',
      },
      {
        title: 'Format Biodata Simple',
        description: 'Design épuré et minimaliste, idéal pour les débutants et les premiers postes.',
        ctaLabel: 'Commencer à Créer',
        color: 'orange',
      },
    ],
  },
  tips: {
    title: 'Conseils pour Rédiger un Biodata Efficace',
    items: [
      { title: 'Utilisez une photo professionnelle', description: 'Format identité, tenue formelle, fond uni. Pas de selfies ni de photos décontractées.' },
      { title: 'Restez concis', description: '1-2 pages maximum. Les recruteurs ne lisent pas les documents trop longs.' },
      { title: 'Gardez une mise en forme cohérente', description: 'Même police dans tout le document, en-têtes clairs, alignement correct.' },
      { title: 'Incluez une déclaration', description: '« Je déclare que les informations fournies sont exactes à ma connaissance. »' },
      { title: 'Classez la formation en ordre inverse', description: 'Le diplôme le plus récent en premier. Incluez le pourcentage/CGPA s\'il est impressionnant.' },
      { title: 'Relisez attentivement', description: 'Les fautes d\'orthographe créent immédiatement une impression négative.' },
      { title: 'N\'incluez que les informations pertinentes', description: 'N\'ajoutez pas d\'informations non demandées ou sans rapport avec le poste.' },
      { title: 'Signez et datez votre biodata', description: 'Ajoutez votre signature à la fin avec la date et le lieu actuels.' },
    ],
  },
  faq: {
    title: 'Questions Fréquemment Posées',
    items: [
      {
        question: 'Quelle est la différence entre un biodata et un CV ?',
        answer:
          'Un CV se concentre sur l\'expérience professionnelle, les compétences et les réalisations adaptées à un poste spécifique. Un biodata inclut des informations personnelles comme la date de naissance, la situation matrimoniale, la religion et le contexte familial en plus des informations professionnelles. Le CV est standard dans les pays occidentaux, tandis que le biodata est préféré en Asie du Sud, au Moyen-Orient et dans certaines parties de l\'Asie du Sud-Est.',
      },
      {
        question: 'Le format biodata est-il utilisé pour les candidatures ?',
        answer:
          'Oui, le biodata est couramment utilisé pour les candidatures en Inde, au Pakistan, au Bangladesh, aux Philippines et dans les pays du Moyen-Orient. Les emplois gouvernementaux, les postes du secteur public et les entreprises traditionnelles demandent souvent spécifiquement le format biodata plutôt qu\'un CV.',
      },
      {
        question: 'Quelles informations personnelles inclure dans un biodata ?',
        answer:
          'Un biodata professionnel inclut généralement : nom complet, date de naissance, genre, nationalité, situation matrimoniale, langues parlées et adresse permanente/actuelle. Pour un biodata de mariage, vous pouvez également ajouter la taille, le poids, la religion, la caste, les détails familiaux et les informations horoscopiques.',
      },
      {
        question: 'Quelle longueur doit faire un biodata ?',
        answer:
          'Un biodata devrait idéalement faire 1-2 pages. Le biodata professionnel fait généralement 1 page, tandis que le biodata de mariage peut s\'étendre à 2 pages pour inclure les détails familiaux et les préférences personnelles. Restez concis tout en incluant toutes les informations pertinentes.',
      },
      {
        question: 'Puis-je utiliser un créateur de CV pour faire un biodata ?',
        answer:
          'Oui, vous pouvez utiliser notre créateur de CV avec IA pour élaborer votre biodata. Commencez avec un modèle standard et ajoutez les sections d\'informations personnelles que le biodata exige. Notre constructeur vous permet de personnaliser les sections pour correspondre au format biodata attendu dans votre région.',
      },
      {
        question: 'Qu\'est-ce qu\'un biodata de mariage ?',
        answer:
          'Le biodata de mariage (aussi appelé biodata matrimonial) est utilisé dans les pays avec des traditions de mariage arrangé comme l\'Inde et le Pakistan. Il inclut des informations personnelles détaillées sur l\'individu, le contexte familial, l\'éducation, la carrière, les détails horoscopiques et les préférences du partenaire pour aider les familles à évaluer la compatibilité.',
      },
    ],
  },
  crossLinks: {
    title: 'Ressources Connexes',
    items: [
      { href: '/resume-format', title: 'Guide du Format de CV', subtitle: 'Formats chronologique, fonctionnel et mixte' },
      { href: '/templates', title: 'Modèles de CV', subtitle: 'Plus de 20 modèles professionnels' },
      { href: '/resume-examples', title: 'Exemples de CV', subtitle: 'Plus de 300 exemples par métier' },
    ],
  },
  externalResources: {
    title: 'Ressources Externes',
    items: [
      { href: 'https://www.bls.gov/ooh/', label: 'Bureau of Labor Statistics : Perspectives d\'Emploi' },
      { href: 'https://www.glassdoor.com/blog/guide/resume-tips/', label: 'Glassdoor : Guide CV et Carrière' },
    ],
  },
  bottomCta: {
    title: 'Créez Votre Biodata en Quelques Minutes',
    description:
      'Notre constructeur alimenté par l\'IA vous aide à créer un biodata professionnel avec toutes les sections nécessaires. Choisissez parmi plusieurs modèles et exportez en PDF ou Word.',
    ctaLabel: 'Créer Mon Biodata Gratuitement',
  },
};

// ---------------------------------------------------------------------------
// German
// ---------------------------------------------------------------------------
const de: BiodataFormatPageContent = {
  meta: {
    title: 'Biodata-Format 2026: Kostenlose Vorlagen, Beispiele & Leitfaden | Best AI Resume',
    description:
      'Lernen Sie das Biodata-Format für Bewerbungen kennen. Vergleichen Sie Biodata vs Lebenslauf, laden Sie kostenlose Biodata-Vorlagen (PDF & Word) herunter und sehen Sie Beispiele für Indien, Pakistan und mehr.',
    keywords:
      'Biodata-Format, Biodata, Biodata für Arbeit, Biodata vs Lebenslauf, Hochzeits-Biodata-Format, Biodata-Vorlage, einfaches Biodata-Format, Bewerbung Biodata',
  },
  schemas: {
    breadcrumbName: 'Leitfaden zum Biodata-Format',
    articleHeadline: 'Biodata-Format 2026: Vorlagen, Beispiele & Anleitung',
    articleDescription:
      'Umfassender Leitfaden zum Biodata-Format für Bewerbungen und Heirat. Erfahren Sie den Unterschied zwischen Biodata und Lebenslauf, laden Sie kostenlose Vorlagen herunter und sehen Sie Beispiele.',
  },
  hero: {
    badge: 'Vollständiger Leitfaden für 2026',
    title: 'Leitfaden zum Biodata-Format',
    titleHighlight: '(Kostenlose Vorlagen)',
    subtitle:
      'Das <strong>Biodata-Format</strong> ist das Standarddokument für Bewerbungen in Indien, Pakistan, Bangladesch und dem Nahen Osten. Erfahren Sie, wann Sie Biodata statt Lebenslauf verwenden sollten, und laden Sie kostenlose Vorlagen herunter, die den regionalen Erwartungen entsprechen.',
    ctaTemplates: 'Vorlagen Herunterladen',
    ctaBuild: 'Biodata mit KI Erstellen',
  },
  whatIs: {
    title: 'Was ist ein Biodata?',
    paragraphs: [
      '<strong>Biodata</strong> (Kurzform für <em>biographical data</em>, biografische Daten) ist ein Dokument, das einen umfassenden Überblick über Ihren persönlichen und beruflichen Werdegang bietet. Im Gegensatz zu einem Lebenslauf, der sich hauptsächlich auf Berufserfahrung und Fähigkeiten konzentriert, enthält ein Biodata <strong>persönliche Angaben</strong> wie Geburtsdatum, Familienstand, Nationalität, Religion und manchmal Familieninformationen.',
      'Das Biodata-Format wird in <strong>Südasien</strong> (Indien, Pakistan, Bangladesch, Sri Lanka), dem <strong>Nahen Osten</strong> (Vereinigte Arabische Emirate, Saudi-Arabien, Katar) und Teilen <strong>Südostasiens</strong> (Philippinen, Malaysia) weit verbreitet genutzt. Staatliche Stellen, öffentliche Unternehmen und traditionelle Organisationen in diesen Regionen verlangen oft ausdrücklich ein Biodata anstelle eines westlichen Lebenslaufs.',
    ],
    insightTitle: 'Wichtiger Hinweis:',
    insightText:
      'Wenn Sie sich in Indien, Pakistan oder den Golfstaaten bewerben, ist die Kenntnis des Biodata-Formats unerlässlich. Viele Arbeitgeber lehnen Bewerbungen ab, die nicht dem erwarteten Format entsprechen.',
  },
  vsComparison: {
    title: 'Biodata vs Lebenslauf vs CV: Was ist der Unterschied?',
    subtitle: 'Zu verstehen, wann welches Dokument zu verwenden ist, ist entscheidend für Ihren Bewerbungserfolg.',
    headers: { aspect: 'Aspekt', biodata: 'Biodata', resume: 'Lebenslauf', cv: 'CV' },
    rows: [
      { aspect: 'Länge', biodata: '1-2 Seiten', resume: '1-2 Seiten', cv: '2+ Seiten' },
      {
        aspect: 'Persönliche Daten',
        biodata: 'Umfangreich (Geburtsdatum, Familienstand, Religion, Familie)',
        resume: 'Minimal (Name und Kontakt)',
        cv: 'Minimal (Name und Kontakt)',
        biodataHighlight: 'green',
      },
      { aspect: 'Schwerpunkt', biodata: 'Persönlicher Hintergrund + Karriere', resume: 'Fähigkeiten + Erfolge', cv: 'Akademisch + Forschung' },
      {
        aspect: 'Verbreitete Regionen',
        biodata: 'Indien, Pakistan, Naher Osten, Philippinen',
        resume: 'USA, Kanada, Australien',
        cv: 'Europa, Großbritannien, akademische Welt',
      },
      {
        aspect: 'Ideal Für',
        biodata: 'Staatliche Stellen, traditionelle Unternehmen, Heirat',
        resume: 'Unternehmen, Startups, Technologie',
        cv: 'Akademische Positionen, Forschung, Medizin',
      },
      {
        aspect: 'Anpassung',
        biodata: 'Gleiches Biodata für mehrere Bewerbungen',
        resume: 'Auf jede Stelle zugeschnitten',
        cv: 'Wird mit wachsenden Erfolgen aktualisiert',
      },
    ],
  },
  structure: {
    title: 'Standardstruktur des Biodata-Formats',
    description: 'Obwohl es kein einzelnes „offizielles" Biodata-Format gibt, erwarten die meisten Arbeitgeber diese Abschnitte in dieser Reihenfolge:',
    sections: [
      { number: 1, label: 'Persönliche Informationen', detail: 'Name, Foto, Geburtsdatum, Geschlecht, Familienstand, Nationalität', colorGroup: 'orange' },
      { number: 2, label: 'Kontaktdaten', detail: 'Adresse (dauerhaft & aktuell), Telefon, E-Mail', colorGroup: 'default' },
      { number: 3, label: 'Berufsziel', detail: '2-3 Sätze über Ihre Karriereziele', colorGroup: 'default' },
      { number: 4, label: 'Ausbildung', detail: 'Abschlüsse, Institutionen, Jahre, Noten/CGPA', colorGroup: 'blue' },
      { number: 5, label: 'Berufserfahrung', detail: 'Unternehmen, Position, Dauer, Aufgaben', colorGroup: 'blue' },
      { number: 6, label: 'Fähigkeiten & Kompetenzen', detail: 'Technische Fähigkeiten, Sprachen, Softwarekenntnisse', colorGroup: 'default' },
      { number: 7, label: 'Zusätzliche Informationen', detail: 'Hobbys, Interessen, Erfolge, Referenzen', colorGroup: 'default' },
      { number: 8, label: 'Erklärung', detail: '„Hiermit erkläre ich, dass die oben genannten Angaben wahrheitsgemäß sind…"', colorGroup: 'dark' },
    ],
    proTipTitle: 'Profi-Tipp:',
    proTipText:
      'Fügen Sie immer ein Passfoto in der oberen rechten Ecke Ihres Biodatas ein. Dies wird in den meisten südasiatischen und nahöstlichen Ländern erwartet, im Gegensatz zu westlichen Lebensläufen, bei denen Fotos nicht empfohlen werden.',
  },
  personalInfo: {
    title: 'Welche persönlichen Daten im Biodata angegeben werden sollten',
    description: 'Der Abschnitt mit persönlichen Informationen unterscheidet das Biodata vom Lebenslauf. Folgendes wird üblicherweise erwartet:',
    alwaysInclude: {
      title: 'Immer Angeben',
      items: [
        'Vollständiger Name (wie in offiziellen Dokumenten)',
        'Geburtsdatum',
        'Geschlecht',
        'Nationalität',
        'Familienstand',
        'Sprachkenntnisse',
        'Dauerhafte Adresse',
        'Aktuelle Adresse',
        'Telefonnummer',
        'E-Mail-Adresse',
      ],
    },
    optional: {
      title: 'Optional (Kontextabhängig)',
      items: [
        'Name und Beruf des Vaters',
        'Name der Mutter',
        'Religion (falls vom Arbeitgeber verlangt)',
        'Kaste/Gemeinschaft (Staatsstellen in Indien)',
        'Blutgruppe',
        'Größe und Gewicht',
        'Passnummer (für Auslandsstellen)',
        'Visumstatus',
      ],
    },
    noteTitle: 'Wichtiger Hinweis:',
    noteText:
      'Obwohl das Biodata traditionell Angaben wie Religion und Kaste enthält, verlangen viele moderne Privatunternehmen in Indien diese Informationen nicht mehr. Geben Sie nur an, was in der Stellenausschreibung ausdrücklich verlangt wird.',
  },
  types: {
    title: 'Arten von Biodata',
    jobBiodata: {
      title: '1. Berufs-Biodata (Bewerbungs-Biodata)',
      description:
        'Wird für Bewerbungen verwendet, insbesondere im staatlichen Bereich, bei öffentlichen Unternehmen (PSU) und traditionellen Organisationen in Südasien.',
      focusTitle: 'Schwerpunkte:',
      focusItems: [
        'Ausbildung mit Noten',
        'Berufserfahrung mit Aufgaben',
        'Technische und soziale Kompetenzen',
        'Zertifizierungen und Weiterbildungen',
      ],
      commonTitle: 'Häufig Bei:',
      commonItems: [
        'UPSC-, SSC-, Bankprüfungen (Indien)',
        'PPSC-, FPSC-Stellen (Pakistan)',
        'Beschäftigung in Golfstaaten',
        'Lehrpositionen',
      ],
    },
    marriageBiodata: {
      title: '2. Hochzeits-Biodata (Matrimonial-Biodata)',
      description:
        'Wird in Traditionen der arrangierten Ehe in Indien, Pakistan, Bangladesch und in Diaspora-Gemeinschaften verwendet. Dieses Format enthält ausführliche persönliche und familiäre Angaben.',
      sectionsTitle: 'Zusätzliche Abschnitte:',
      sectionsItems: [
        'Familienhintergrund (Eltern, Geschwister)',
        'Horoskop- / Kundli-Angaben',
        'Körperliche Merkmale',
        'Partnerpräferenzen',
      ],
      designTitle: 'Designelemente:',
      designItems: [
        'Dekorative Rahmen',
        'Professionelle Fotos',
        'Religiöse Symbole (optional)',
        'Üblicherweise 2-3 Seiten',
      ],
    },
  },
  regions: {
    title: 'Biodata-Format nach Region',
    description: 'Die Erwartungen variieren je nach Land. Das erwarten Arbeitgeber in den verschiedenen Regionen:',
    items: [
      {
        country: 'Indien',
        flag: '\ud83c\uddee\ud83c\uddf3',
        text: 'Biodata ist Standard für Staatsstellen (UPSC, SSC, staatliche PSCs), Banken und öffentliche Unternehmen. Private multinationale Unternehmen bevorzugen oft den Lebenslauf. Geben Sie den Namen des Vaters, die Kastenkategorie (für Reservierungen) und eine Erklärung an. Ein Foto ist Pflicht.',
      },
      {
        country: 'Pakistan',
        flag: '\ud83c\uddf5\ud83c\uddf0',
        text: 'Ähnlich wie Indien. Die CNIC-Nummer (Personalausweis) wird oft verlangt. Vatersname und Adresse sind Standard. Staatliche und halbstaatliche Positionen erfordern ein detailliertes Biodata-Format.',
      },
      {
        country: 'VAE / Golfstaaten',
        flag: '\ud83c\udde6\ud83c\uddea',
        text: 'Arbeitgeber erwarten ein Biodata mit Foto, Nationalität, Visumstatus und Verfügbarkeit. Die Religion kann abgefragt werden. Geben Sie Passdetails an, wenn Sie sich aus dem Ausland bewerben. Sowohl Biodata als auch CV werden akzeptiert.',
      },
      {
        country: 'Philippinen',
        flag: '\ud83c\uddf5\ud83c\udded',
        text: 'Das Personal Data Sheet (PDS) ist das offizielle Biodata-Format für Staatsstellen. Privatunternehmen akzeptieren Biodata oder Lebenslauf. Größe, Gewicht und Familienstand werden häufig angegeben.',
      },
    ],
  },
  templates: {
    title: 'Kostenlose Biodata-Vorlagen',
    subtitle:
      'Laden Sie unsere professionell gestalteten Biodata-Vorlagen im Word- und PDF-Format herunter. Passen Sie sie mit Ihren Informationen an.',
    cards: [
      {
        title: 'Berufs-Biodata-Vorlage',
        description: 'Professionelles Format für Bewerbungen mit allen Standardabschnitten.',
        ctaLabel: 'Mit KI-Builder Erstellen',
        color: 'blue',
      },
      {
        title: 'Einfaches Biodata-Format',
        description: 'Schlichtes, minimalistisches Design, ideal für Berufseinsteiger.',
        ctaLabel: 'Jetzt Erstellen',
        color: 'orange',
      },
    ],
  },
  tips: {
    title: 'Tipps für ein Effektives Biodata',
    items: [
      { title: 'Verwenden Sie ein professionelles Foto', description: 'Passbildformat, formelle Kleidung, einfarbiger Hintergrund. Keine Selfies oder Freizeitfotos.' },
      { title: 'Halten Sie es kurz', description: 'Maximal 1-2 Seiten. Personalverantwortliche lesen keine langen Dokumente.' },
      { title: 'Einheitliche Formatierung verwenden', description: 'Gleiche Schriftart im gesamten Dokument, klare Abschnittsüberschriften, korrekte Ausrichtung.' },
      { title: 'Erklärung einfügen', description: '„Hiermit erkläre ich, dass die angegebenen Informationen nach bestem Wissen und Gewissen korrekt sind."' },
      { title: 'Ausbildung in umgekehrter Reihenfolge', description: 'Neuester Abschluss zuerst. Noten/CGPA angeben, wenn beeindruckend.' },
      { title: 'Sorgfältig Korrektur lesen', description: 'Rechtschreibfehler und Tippfehler hinterlassen sofort einen negativen Eindruck.' },
      { title: 'Nur relevante Angaben machen', description: 'Fügen Sie keine Informationen hinzu, die nicht verlangt werden oder für die Stelle nicht relevant sind.' },
      { title: 'Biodata unterschreiben und datieren', description: 'Fügen Sie am Ende Ihre Unterschrift mit aktuellem Datum und Ort hinzu.' },
    ],
  },
  faq: {
    title: 'Häufig Gestellte Fragen',
    items: [
      {
        question: 'Was ist der Unterschied zwischen Biodata und Lebenslauf?',
        answer:
          'Ein Lebenslauf konzentriert sich auf Berufserfahrung, Fähigkeiten und Erfolge, die auf eine bestimmte Stelle zugeschnitten sind. Ein Biodata enthält zusätzlich persönliche Daten wie Geburtsdatum, Familienstand, Religion und Familiengeschichte. Der Lebenslauf ist in westlichen Ländern Standard, während das Biodata in Südasien, dem Nahen Osten und Teilen Südostasiens bevorzugt wird.',
      },
      {
        question: 'Wird das Biodata-Format für Bewerbungen verwendet?',
        answer:
          'Ja, Biodata wird häufig für Bewerbungen in Indien, Pakistan, Bangladesch, den Philippinen und Ländern des Nahen Ostens verwendet. Staatliche Stellen, öffentliche Positionen und traditionelle Unternehmen verlangen oft ausdrücklich das Biodata-Format anstelle eines Lebenslaufs.',
      },
      {
        question: 'Welche persönlichen Daten sollte ich in einem Biodata angeben?',
        answer:
          'Ein Berufs-Biodata enthält üblicherweise: vollständiger Name, Geburtsdatum, Geschlecht, Nationalität, Familienstand, Sprachkenntnisse und dauerhafte/aktuelle Adresse. Für ein Hochzeits-Biodata können Sie auch Größe, Gewicht, Religion, Kaste, Familiendetails und Horoskopangaben hinzufügen.',
      },
      {
        question: 'Wie lang sollte ein Biodata sein?',
        answer:
          'Ein Biodata sollte idealerweise 1-2 Seiten umfassen. Ein Berufs-Biodata hat normalerweise 1 Seite, während ein Hochzeits-Biodata auf 2 Seiten erweitert werden kann, um Familiendetails und persönliche Präferenzen aufzunehmen. Halten Sie es präzise und geben Sie alle relevanten Informationen an.',
      },
      {
        question: 'Kann ich einen Lebenslauf-Builder verwenden, um ein Biodata zu erstellen?',
        answer:
          'Ja, Sie können unseren KI-gestützten Lebenslauf-Builder verwenden, um Ihr Biodata zu erstellen. Beginnen Sie mit einer Standardvorlage und fügen Sie die persönlichen Informationsabschnitte hinzu, die ein Biodata erfordert. Unser Builder ermöglicht es Ihnen, die Abschnitte an das in Ihrer Region erwartete Biodata-Format anzupassen.',
      },
      {
        question: 'Was ist ein Hochzeits-Biodata?',
        answer:
          'Ein Hochzeits-Biodata (auch Matrimonial-Biodata) wird in Ländern mit Traditionen der arrangierten Ehe wie Indien und Pakistan verwendet. Es enthält ausführliche persönliche Informationen, Familiengeschichte, Ausbildung, Karriere, Horoskopdetails und Partnerpräferenzen, um Familien bei der Kompatibilitätsbewertung zu unterstützen.',
      },
    ],
  },
  crossLinks: {
    title: 'Verwandte Ressourcen',
    items: [
      { href: '/resume-format', title: 'Lebenslauf-Format-Leitfaden', subtitle: 'Chronologische, funktionale und kombinierte Formate' },
      { href: '/templates', title: 'Lebenslauf-Vorlagen', subtitle: 'Über 20 professionelle Vorlagen' },
      { href: '/resume-examples', title: 'Lebenslauf-Beispiele', subtitle: 'Über 300 berufsspezifische Beispiele' },
    ],
  },
  externalResources: {
    title: 'Externe Ressourcen',
    items: [
      { href: 'https://www.bls.gov/ooh/', label: 'Bureau of Labor Statistics: Karriereausblick' },
      { href: 'https://www.glassdoor.com/blog/guide/resume-tips/', label: 'Glassdoor: Lebenslauf- & Karriereleitfaden' },
    ],
  },
  bottomCta: {
    title: 'Erstellen Sie Ihr Biodata in Wenigen Minuten',
    description:
      'Unser KI-gestützter Builder hilft Ihnen, ein professionelles Biodata mit allen richtigen Abschnitten zu erstellen. Wählen Sie aus mehreren Vorlagen und exportieren Sie als PDF oder Word.',
    ctaLabel: 'Mein Biodata Kostenlos Erstellen',
  },
};

// ---------------------------------------------------------------------------
// Arabic
// ---------------------------------------------------------------------------
const ar: BiodataFormatPageContent = {
  meta: {
    title: 'نموذج البيانات الشخصية 2026: قوالب مجانية وأمثلة ودليل كتابة | Best AI Resume',
    description:
      'تعرّف على نموذج البيانات الشخصية (Biodata) للتقديم على الوظائف. قارن بين البيانات الشخصية والسيرة الذاتية، وحمّل قوالب مجانية (PDF و Word) واطلع على أمثلة للهند وباكستان والمزيد.',
    keywords:
      'نموذج بيانات شخصية, بيانات شخصية, بيانات شخصية للوظيفة, بيانات شخصية مقابل سيرة ذاتية, نموذج بيانات زواج, قالب بيانات شخصية, نموذج بيانات بسيط, بيانات شخصية للعمل',
  },
  schemas: {
    breadcrumbName: 'دليل نموذج البيانات الشخصية',
    articleHeadline: 'دليل نموذج البيانات الشخصية 2026: قوالب وأمثلة وطريقة الكتابة',
    articleDescription:
      'دليل شامل لنموذج البيانات الشخصية للتقديم على الوظائف والزواج. تعرّف على الفرق بين البيانات الشخصية والسيرة الذاتية، وحمّل قوالب مجانية واطلع على أمثلة.',
  },
  hero: {
    badge: 'دليل شامل لعام 2026',
    title: 'دليل نموذج البيانات الشخصية',
    titleHighlight: '(قوالب مجانية)',
    subtitle:
      '<strong>نموذج البيانات الشخصية</strong> هو المستند المعتمد للتقديم على الوظائف في الهند وباكستان وبنغلاديش والشرق الأوسط. تعرّف على الحالات التي تستخدم فيها البيانات الشخصية بدلاً من السيرة الذاتية، وحمّل قوالب تتوافق مع توقعات كل منطقة.',
    ctaTemplates: 'تحميل القوالب',
    ctaBuild: 'إنشاء بيانات شخصية بالذكاء الاصطناعي',
  },
  whatIs: {
    title: 'ما هي البيانات الشخصية (Biodata)؟',
    paragraphs: [
      '<strong>البيانات الشخصية</strong> (اختصار لـ <em>biographical data</em>، أي البيانات السيرية) هي مستند يقدم نظرة شاملة عن خلفيتك الشخصية والمهنية. على عكس السيرة الذاتية التي تركز بشكل رئيسي على الخبرة العملية والمهارات، تتضمن البيانات الشخصية <strong>تفاصيل شخصية</strong> مثل تاريخ الميلاد والحالة الاجتماعية والجنسية والديانة وأحياناً معلومات عائلية.',
      'يُستخدم نموذج البيانات الشخصية على نطاق واسع في <strong>جنوب آسيا</strong> (الهند وباكستان وبنغلاديش وسريلانكا) و<strong>الشرق الأوسط</strong> (الإمارات والسعودية وقطر) وأجزاء من <strong>جنوب شرق آسيا</strong> (الفلبين وماليزيا). غالباً ما تطلب الوظائف الحكومية وشركات القطاع العام والمؤسسات التقليدية في هذه المناطق بيانات شخصية بشكل محدد بدلاً من سيرة ذاتية بالنمط الغربي.',
    ],
    insightTitle: 'نقطة مهمة:',
    insightText:
      'إذا كنت تتقدم لوظائف في الهند أو باكستان أو دول الخليج، فإن معرفة نموذج البيانات الشخصية أمر ضروري. يرفض العديد من أصحاب العمل الطلبات التي لا تتبع النموذج المتوقع.',
  },
  vsComparison: {
    title: 'البيانات الشخصية مقابل السيرة الذاتية مقابل الـ CV: ما الفرق؟',
    subtitle: 'فهم متى تستخدم كل مستند أمر بالغ الأهمية لنجاح بحثك عن عمل.',
    headers: { aspect: 'الجانب', biodata: 'البيانات الشخصية', resume: 'السيرة الذاتية', cv: 'CV' },
    rows: [
      { aspect: 'الطول', biodata: '1-2 صفحات', resume: '1-2 صفحات', cv: '+2 صفحات' },
      {
        aspect: 'البيانات الشخصية',
        biodata: 'مفصّلة (تاريخ الميلاد، الحالة الاجتماعية، الديانة، العائلة)',
        resume: 'محدودة (الاسم ومعلومات الاتصال فقط)',
        cv: 'محدودة (الاسم ومعلومات الاتصال فقط)',
        biodataHighlight: 'green',
      },
      { aspect: 'التركيز', biodata: 'الخلفية الشخصية + المسار المهني', resume: 'المهارات + الإنجازات', cv: 'الأكاديمي + البحث' },
      {
        aspect: 'المناطق الشائعة',
        biodata: 'الهند، باكستان، الشرق الأوسط، الفلبين',
        resume: 'الولايات المتحدة، كندا، أستراليا',
        cv: 'أوروبا، المملكة المتحدة، الأوساط الأكاديمية',
      },
      {
        aspect: 'الأنسب لـ',
        biodata: 'الوظائف الحكومية، الشركات التقليدية، الزواج',
        resume: 'الشركات، الشركات الناشئة، التكنولوجيا',
        cv: 'المناصب الأكاديمية، البحث، الطب',
      },
      {
        aspect: 'التخصيص',
        biodata: 'نفس البيانات لعدة طلبات',
        resume: 'يُعدّل لكل وظيفة',
        cv: 'يُحدّث مع نمو الإنجازات',
      },
    ],
  },
  structure: {
    title: 'الهيكل المعتمد لنموذج البيانات الشخصية',
    description: 'رغم عدم وجود نموذج بيانات شخصية «رسمي» واحد، يتوقع معظم أصحاب العمل هذه الأقسام بهذا الترتيب:',
    sections: [
      { number: 1, label: 'المعلومات الشخصية', detail: 'الاسم، الصورة، تاريخ الميلاد، الجنس، الحالة الاجتماعية، الجنسية', colorGroup: 'orange' },
      { number: 2, label: 'بيانات الاتصال', detail: 'العنوان (الدائم والحالي)، الهاتف، البريد الإلكتروني', colorGroup: 'default' },
      { number: 3, label: 'الهدف المهني', detail: '2-3 جمل عن أهدافك المهنية', colorGroup: 'default' },
      { number: 4, label: 'المؤهلات العلمية', detail: 'الشهادات، المؤسسات، السنوات، النسب/المعدل التراكمي', colorGroup: 'blue' },
      { number: 5, label: 'الخبرة العملية', detail: 'الشركة، المسمى الوظيفي، المدة، المسؤوليات', colorGroup: 'blue' },
      { number: 6, label: 'المهارات والكفاءات', detail: 'المهارات التقنية، اللغات، إتقان البرامج', colorGroup: 'default' },
      { number: 7, label: 'معلومات إضافية', detail: 'الهوايات، الاهتمامات، الإنجازات، المراجع', colorGroup: 'default' },
      { number: 8, label: 'الإقرار', detail: '«أقر بأن المعلومات الواردة أعلاه صحيحة…»', colorGroup: 'dark' },
    ],
    proTipTitle: 'نصيحة احترافية:',
    proTipText:
      'احرص دائماً على إضافة صورة بحجم جواز السفر في الزاوية العلوية اليمنى من بياناتك الشخصية. هذا مطلوب في معظم دول جنوب آسيا والشرق الأوسط، على عكس السير الذاتية الغربية التي لا يُنصح فيها بإضافة الصور.',
  },
  personalInfo: {
    title: 'ما المعلومات الشخصية التي يجب تضمينها في البيانات الشخصية',
    description: 'قسم المعلومات الشخصية هو ما يميّز البيانات الشخصية عن السيرة الذاتية. إليك ما يُتوقع عادةً:',
    alwaysInclude: {
      title: 'يجب تضمينها دائماً',
      items: [
        'الاسم الكامل (كما في الوثائق الرسمية)',
        'تاريخ الميلاد',
        'الجنس',
        'الجنسية',
        'الحالة الاجتماعية',
        'اللغات المعروفة',
        'العنوان الدائم',
        'العنوان الحالي',
        'رقم الهاتف',
        'البريد الإلكتروني',
      ],
    },
    optional: {
      title: 'اختياري (حسب السياق)',
      items: [
        'اسم الأب ومهنته',
        'اسم الأم',
        'الديانة (إذا طلبها صاحب العمل)',
        'الطائفة/المجتمع (الوظائف الحكومية في الهند)',
        'فصيلة الدم',
        'الطول والوزن',
        'رقم جواز السفر (للوظائف في الخارج)',
        'حالة التأشيرة',
      ],
    },
    noteTitle: 'ملاحظة مهمة:',
    noteText:
      'على الرغم من أن البيانات الشخصية تتضمن تقليدياً تفاصيل مثل الديانة والطائفة، فإن العديد من الشركات الخاصة الحديثة في الهند لم تعد تطلب هذه المعلومات. أدرج فقط ما هو مطلوب تحديداً في إعلان الوظيفة.',
  },
  types: {
    title: 'أنواع البيانات الشخصية',
    jobBiodata: {
      title: '1. البيانات الشخصية للوظيفة (البيانات المهنية)',
      description:
        'تُستخدم للتقديم على الوظائف، خاصة في القطاع الحكومي والشركات العامة (PSU) والمؤسسات التقليدية في جنوب آسيا.',
      focusTitle: 'المجالات الرئيسية:',
      focusItems: [
        'المؤهلات العلمية مع الدرجات',
        'الخبرة العملية مع المسؤوليات',
        'المهارات التقنية والشخصية',
        'الشهادات والتدريبات',
      ],
      commonTitle: 'شائعة في:',
      commonItems: [
        'اختبارات UPSC و SSC والبنوك (الهند)',
        'وظائف PPSC و FPSC (باكستان)',
        'التوظيف في دول الخليج',
        'مناصب التدريس',
      ],
    },
    marriageBiodata: {
      title: '2. بيانات الزواج (البيانات الشخصية للزواج)',
      description:
        'تُستخدم في تقاليد الزواج المُرتّب في الهند وباكستان وبنغلاديش وبين مجتمعات المهجر. يتضمن هذا النموذج تفاصيل شخصية وعائلية مفصّلة.',
      sectionsTitle: 'أقسام إضافية:',
      sectionsItems: [
        'الخلفية العائلية (الوالدان، الإخوة)',
        'تفاصيل الأبراج / الكندلي',
        'الصفات الجسدية',
        'مواصفات الشريك المطلوب',
      ],
      designTitle: 'عناصر التصميم:',
      designItems: [
        'إطارات مزخرفة',
        'صور احترافية',
        'رموز دينية (اختياري)',
        '2-3 صفحات عادةً',
      ],
    },
  },
  regions: {
    title: 'نموذج البيانات الشخصية حسب المنطقة',
    description: 'تختلف التوقعات حسب البلد. إليك ما يتوقعه أصحاب العمل في المناطق المختلفة:',
    items: [
      {
        country: 'الهند',
        flag: '\ud83c\uddee\ud83c\uddf3',
        text: 'البيانات الشخصية معيارية للوظائف الحكومية (UPSC و SSC و PSC الولائية) والبنوك والشركات العامة. تفضل الشركات الخاصة المتعددة الجنسيات السيرة الذاتية. أدرج اسم الأب وفئة الطائفة (للحجوزات) وإقراراً. الصورة إلزامية.',
      },
      {
        country: 'باكستان',
        flag: '\ud83c\uddf5\ud83c\uddf0',
        text: 'مشابه للهند. غالباً ما يُطلب رقم CNIC (الهوية الوطنية). اسم الأب والعنوان من البيانات الأساسية. تتطلب المناصب الحكومية وشبه الحكومية نموذج بيانات شخصية مفصّل.',
      },
      {
        country: 'الإمارات / دول الخليج',
        flag: '\ud83c\udde6\ud83c\uddea',
        text: 'يتوقع أصحاب العمل بيانات شخصية تتضمن الصورة والجنسية وحالة التأشيرة والتوفر. قد تُطلب الديانة. أدرج تفاصيل جواز السفر إذا كنت تتقدم من الخارج. يُقبل كل من نموذج البيانات الشخصية والسيرة الذاتية.',
      },
      {
        country: 'الفلبين',
        flag: '\ud83c\uddf5\ud83c\udded',
        text: 'ورقة البيانات الشخصية (PDS) هي النموذج الرسمي للوظائف الحكومية. قد تقبل الشركات الخاصة البيانات الشخصية أو السيرة الذاتية. يُضمّن عادةً الطول والوزن والحالة الاجتماعية.',
      },
    ],
  },
  templates: {
    title: 'قوالب بيانات شخصية مجانية',
    subtitle:
      'حمّل قوالب البيانات الشخصية المصممة باحترافية بصيغة Word و PDF. خصّصها بمعلوماتك.',
    cards: [
      {
        title: 'قالب بيانات شخصية للوظيفة',
        description: 'نموذج احترافي للتقديم على الوظائف مع جميع الأقسام المعتمدة.',
        ctaLabel: 'إنشاء باستخدام أداة الذكاء الاصطناعي',
        color: 'blue',
      },
      {
        title: 'نموذج بيانات شخصية بسيط',
        description: 'تصميم نظيف وبسيط مناسب لحديثي التخرج والمناصب المبتدئة.',
        ctaLabel: 'البدء بالإنشاء',
        color: 'orange',
      },
    ],
  },
  tips: {
    title: 'نصائح لكتابة بيانات شخصية فعّالة',
    items: [
      { title: 'استخدم صورة احترافية', description: 'بحجم جواز السفر، بملابس رسمية، وخلفية بسيطة. لا صور سيلفي أو صور غير رسمية.' },
      { title: 'كن موجزاً', description: '1-2 صفحات كحد أقصى. لا يقرأ مسؤولو التوظيف المستندات الطويلة.' },
      { title: 'حافظ على تنسيق موحد', description: 'نفس الخط في كامل المستند، عناوين أقسام واضحة، محاذاة صحيحة.' },
      { title: 'أضف إقراراً', description: '«أقر بأن المعلومات المقدمة صحيحة على حد علمي ومعرفتي.»' },
      { title: 'رتّب التعليم بترتيب عكسي', description: 'أحدث مؤهل أولاً. أدرج النسبة/المعدل التراكمي إذا كان مميزاً.' },
      { title: 'راجع بعناية', description: 'الأخطاء الإملائية تترك انطباعاً سلبياً فورياً.' },
      { title: 'أدرج البيانات ذات الصلة فقط', description: 'لا تضف معلومات لم تُطلب أو ليست ذات صلة بالوظيفة.' },
      { title: 'وقّع وأرّخ بياناتك الشخصية', description: 'أضف توقيعك في النهاية مع التاريخ والمكان الحاليين.' },
    ],
  },
  faq: {
    title: 'الأسئلة الشائعة',
    items: [
      {
        question: 'ما الفرق بين البيانات الشخصية والسيرة الذاتية؟',
        answer:
          'السيرة الذاتية تركز على الخبرة المهنية والمهارات والإنجازات المصممة لوظيفة محددة. البيانات الشخصية تتضمن تفاصيل شخصية كتاريخ الميلاد والحالة الاجتماعية والديانة والخلفية العائلية بالإضافة إلى المعلومات المهنية. السيرة الذاتية معتمدة في الدول الغربية، بينما البيانات الشخصية مفضلة في جنوب آسيا والشرق الأوسط وأجزاء من جنوب شرق آسيا.',
      },
      {
        question: 'هل يُستخدم نموذج البيانات الشخصية في التقديم على الوظائف؟',
        answer:
          'نعم، تُستخدم البيانات الشخصية بشكل شائع في التقديم على الوظائف في الهند وباكستان وبنغلاديش والفلبين ودول الشرق الأوسط. غالباً ما تطلب الوظائف الحكومية ومناصب القطاع العام والشركات التقليدية نموذج البيانات الشخصية تحديداً بدلاً من السيرة الذاتية.',
      },
      {
        question: 'ما البيانات الشخصية التي يجب تضمينها؟',
        answer:
          'تتضمن البيانات الشخصية للوظيفة عادةً: الاسم الكامل، تاريخ الميلاد، الجنس، الجنسية، الحالة الاجتماعية، اللغات المعروفة، والعنوان الدائم/الحالي. لبيانات الزواج يمكنك أيضاً إضافة الطول والوزن والديانة والطائفة وتفاصيل العائلة ومعلومات الأبراج.',
      },
      {
        question: 'كم يجب أن يكون طول البيانات الشخصية؟',
        answer:
          'يجب أن تكون البيانات الشخصية 1-2 صفحات بشكل مثالي. البيانات الشخصية للوظيفة عادة صفحة واحدة، بينما بيانات الزواج قد تمتد إلى صفحتين لتشمل التفاصيل العائلية والتفضيلات الشخصية. اجعلها موجزة مع تضمين جميع المعلومات ذات الصلة.',
      },
      {
        question: 'هل يمكنني استخدام أداة إنشاء السيرة الذاتية لعمل بيانات شخصية؟',
        answer:
          'نعم، يمكنك استخدام أداة إنشاء السيرة الذاتية بالذكاء الاصطناعي لإعداد بياناتك الشخصية. ابدأ بقالب معتمد وأضف أقسام المعلومات الشخصية التي يتطلبها نموذج البيانات. تتيح لك أداتنا تخصيص الأقسام لتتوافق مع النموذج المتوقع في منطقتك.',
      },
      {
        question: 'ما هي بيانات الزواج الشخصية؟',
        answer:
          'بيانات الزواج الشخصية (تُعرف أيضاً بالبيانات الشخصية للزواج المُرتّب) تُستخدم في البلدان ذات تقاليد الزواج المُرتّب مثل الهند وباكستان. تتضمن معلومات شخصية مفصّلة عن الفرد، والخلفية العائلية، والتعليم، والمسار المهني، وتفاصيل الأبراج، ومواصفات الشريك لمساعدة العائلات في تقييم التوافق.',
      },
    ],
  },
  crossLinks: {
    title: 'موارد ذات صلة',
    items: [
      { href: '/resume-format', title: 'دليل تنسيق السيرة الذاتية', subtitle: 'التنسيق الزمني والوظيفي والمختلط' },
      { href: '/templates', title: 'قوالب السيرة الذاتية', subtitle: 'أكثر من 20 قالب احترافي' },
      { href: '/resume-examples', title: 'أمثلة السيرة الذاتية', subtitle: 'أكثر من 300 مثال حسب المهنة' },
    ],
  },
  externalResources: {
    title: 'موارد خارجية',
    items: [
      { href: 'https://www.bls.gov/ooh/', label: 'Bureau of Labor Statistics: توقعات التوظيف' },
      { href: 'https://www.glassdoor.com/blog/guide/resume-tips/', label: 'Glassdoor: دليل السيرة الذاتية والمسار المهني' },
    ],
  },
  bottomCta: {
    title: 'أنشئ بياناتك الشخصية في دقائق',
    description:
      'تساعدك أداتنا المدعومة بالذكاء الاصطناعي على إنشاء بيانات شخصية احترافية بجميع الأقسام الصحيحة. اختر من بين عدة قوالب وصدّرها بصيغة PDF أو Word.',
    ctaLabel: 'إنشاء بياناتي الشخصية مجاناً',
  },
};

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// Japanese
// ---------------------------------------------------------------------------
const ja: BiodataFormatPageContent = {
  meta: {
    title: 'バイオデータ形式ガイド 2026：無料テンプレート・記入例・書き方 | Best AI Resume',
    description:
      'バイオデータ（Biodata）形式を徹底解説。履歴書・職務経歴書との違い、無料テンプレート（PDF・Word）のダウンロード、インド・パキスタン・中東向けの記入例をご紹介。',
    keywords:
      'バイオデータ, biodata 書き方, バイオデータ テンプレート, バイオデータ 履歴書 違い, 履歴書作成ツール, 履歴書サンプル, AI履歴書, 職務経歴書',
  },
  schemas: {
    breadcrumbName: 'バイオデータ形式ガイド',
    articleHeadline: 'バイオデータ形式ガイド 2026：テンプレート・記入例・書き方',
    articleDescription:
      '就職・結婚用バイオデータ（Biodata）の完全ガイド。履歴書との違い、無料テンプレートダウンロード、地域別の記入例を解説。',
  },
  hero: {
    badge: '2026年完全ガイド',
    title: 'バイオデータ形式ガイド',
    titleHighlight: '（無料テンプレート付き）',
    subtitle:
      '<strong>バイオデータ（Biodata）</strong>は、インド、パキスタン、バングラデシュ、中東で就職応募に使われる標準的な書類形式です。日本の<strong>履歴書</strong>とは異なる独自の形式を学び、各地域の期待に合ったテンプレートをダウンロードしましょう。',
    ctaTemplates: 'テンプレートをダウンロード',
    ctaBuild: 'AIでバイオデータを作成',
  },
  whatIs: {
    title: 'バイオデータ（Biodata）とは？',
    paragraphs: [
      '<strong>バイオデータ</strong>（<em>biographical data</em>＝経歴データの略）は、個人の経歴や職務情報をまとめた書類です。職務経歴やスキルを中心とする日本の<strong>履歴書・職務経歴書</strong>とは異なり、バイオデータには生年月日、婚姻状況、国籍、宗教、場合によっては家族情報などの<strong>個人情報</strong>が含まれます。',
      'バイオデータ形式は、<strong>南アジア</strong>（インド、パキスタン、バングラデシュ、スリランカ）、<strong>中東</strong>（UAE、サウジアラビア、カタール）、<strong>東南アジア</strong>の一部（フィリピン、マレーシア）で広く使用されています。これらの地域の公務員採用、公的機関、伝統的な企業では、欧米式の履歴書ではなくバイオデータ形式が求められることが多くあります。',
    ],
    insightTitle: '重要なポイント：',
    insightText:
      'インド、パキスタン、湾岸諸国の求人に応募する場合、バイオデータ形式を理解することは不可欠です。期待されるフォーマットに従わない応募書類は、多くの企業で不採用となります。',
  },
  vsComparison: {
    title: 'バイオデータ vs 履歴書 vs CV：違いは？',
    subtitle: 'どの書類をいつ使うかを正しく理解することが、就職活動の成功に不可欠です。',
    headers: { aspect: '項目', biodata: 'バイオデータ', resume: '履歴書（レジュメ）', cv: 'CV' },
    rows: [
      { aspect: '長さ', biodata: '1〜2ページ', resume: '1〜2ページ', cv: '2ページ以上' },
      {
        aspect: '個人情報',
        biodata: '詳細（生年月日、婚姻状況、宗教、家族構成）',
        resume: '最小限（氏名と連絡先のみ）',
        cv: '最小限（氏名と連絡先のみ）',
        biodataHighlight: 'green',
      },
      { aspect: '重点', biodata: '個人的背景 + 職歴', resume: 'スキル + 実績', cv: '学術 + 研究業績' },
      {
        aspect: '主な使用地域',
        biodata: 'インド、パキスタン、中東、フィリピン',
        resume: '米国、カナダ、オーストラリア、日本',
        cv: '欧州、英国、学術界',
      },
      {
        aspect: '適した場面',
        biodata: '公務員、伝統的企業、結婚用途',
        resume: '一般企業、スタートアップ、IT業界',
        cv: '学術ポジション、研究職、医療職',
      },
      {
        aspect: 'カスタマイズ',
        biodata: '複数の応募に同じ内容を使用',
        resume: '応募先ごとにカスタマイズ',
        cv: '業績の蓄積に応じて更新',
      },
    ],
  },
  structure: {
    title: 'バイオデータの標準構成',
    description: '「公式」なバイオデータ形式は存在しませんが、ほとんどの採用担当者が期待するセクション構成は以下の通りです：',
    sections: [
      { number: 1, label: '個人情報', detail: '氏名、写真、生年月日、性別、婚姻状況、国籍', colorGroup: 'orange' },
      { number: 2, label: '連絡先情報', detail: '住所（本籍・現住所）、電話番号、メールアドレス', colorGroup: 'default' },
      { number: 3, label: '志望理由・目標', detail: 'キャリア目標を2〜3文で記載', colorGroup: 'default' },
      { number: 4, label: '学歴', detail: '学位、教育機関、卒業年、成績/GPA', colorGroup: 'blue' },
      { number: 5, label: '職歴', detail: '企業名、役職、期間、担当業務', colorGroup: 'blue' },
      { number: 6, label: 'スキル・能力', detail: '専門スキル、語学力、ソフトウェアスキル', colorGroup: 'default' },
      { number: 7, label: 'その他の情報', detail: '趣味、特技、受賞歴、推薦者', colorGroup: 'default' },
      { number: 8, label: '宣誓文', detail: '「上記の情報が正確であることを宣言します…」', colorGroup: 'dark' },
    ],
    proTipTitle: 'プロのアドバイス：',
    proTipText:
      'バイオデータの右上にパスポートサイズの証明写真を必ず貼付してください。これは南アジアや中東では必須です。日本の履歴書でも証明写真は標準的ですが、欧米のレジュメでは推奨されません。',
  },
  personalInfo: {
    title: 'バイオデータに記載する個人情報',
    description: '個人情報セクションが、バイオデータを通常の履歴書と区別する最大の要素です。一般的に期待される情報は以下の通りです：',
    alwaysInclude: {
      title: '必ず記載する項目',
      items: [
        '氏名（公式書類通り）',
        '生年月日',
        '性別',
        '国籍',
        '婚姻状況',
        '使用可能言語',
        '本籍住所',
        '現住所',
        '電話番号',
        'メールアドレス',
      ],
    },
    optional: {
      title: '任意（状況に応じて）',
      items: [
        '父親の氏名・職業',
        '母親の氏名',
        '宗教（雇用主が要求する場合）',
        'カースト/コミュニティ（インドの公務員採用）',
        '血液型',
        '身長・体重',
        'パスポート番号（海外就職の場合）',
        'ビザステータス',
      ],
    },
    noteTitle: '重要な注意：',
    noteText:
      'バイオデータには伝統的に宗教やカーストなどの情報が含まれますが、インドの近代的な民間企業の多くはこれらの情報を求めなくなっています。求人票で具体的に求められている情報のみを記載してください。',
  },
  types: {
    title: 'バイオデータの種類',
    jobBiodata: {
      title: '1. 就職用バイオデータ（プロフェッショナル・バイオデータ）',
      description:
        '就職応募で使用されます。特に南アジアの公務員採用、公的企業（PSU）、伝統的な企業で一般的です。',
      focusTitle: '主な記載内容：',
      focusItems: [
        '成績を含む学歴情報',
        '職務内容を含む職歴',
        '専門的・対人スキル',
        '資格・研修歴',
      ],
      commonTitle: '主な使用場面：',
      commonItems: [
        'UPSC・SSC・銀行試験（インド）',
        'PPSC・FPSC採用試験（パキスタン）',
        '湾岸諸国での就職活動',
        '教職への応募',
      ],
    },
    marriageBiodata: {
      title: '2. お見合い用バイオデータ（マリッジ・バイオデータ）',
      description:
        'インド、パキスタン、バングラデシュ、および海外在住コミュニティのお見合い（アレンジドマリッジ）の伝統で使用されます。詳細な個人情報と家族情報を含む書類です。',
      sectionsTitle: '追加セクション：',
      sectionsItems: [
        '家族背景（両親、兄弟姉妹）',
        'ホロスコープ・クンダリーの詳細',
        '身体的特徴',
        'パートナーの希望条件',
      ],
      designTitle: 'デザイン要素：',
      designItems: [
        '装飾的なボーダー',
        'プロフェッショナルな写真',
        '宗教的シンボル（任意）',
        '通常2〜3ページ',
      ],
    },
  },
  regions: {
    title: '地域別バイオデータ形式',
    description: '国によって期待される内容が異なります。各地域の採用担当者が求めるポイントをご紹介します：',
    items: [
      {
        country: 'インド',
        flag: '\ud83c\uddee\ud83c\uddf3',
        text: 'バイオデータは公務員採用（UPSC、SSC、州PSC）、銀行、公的企業で標準。外資系民間企業はレジュメを好みます。父親の氏名、カーストカテゴリ（予約制度用）、宣誓文が必須。証明写真も必須です。',
      },
      {
        country: 'パキスタン',
        flag: '\ud83c\uddf5\ud83c\uddf0',
        text: 'インドと類似。CNIC（国民身分証明書）番号の記載が求められることが多いです。父親の氏名と住所は基本情報。公務員・半官半民の職位では詳細なバイオデータが必要です。',
      },
      {
        country: 'UAE・湾岸諸国',
        flag: '\ud83c\udde6\ud83c\uddea',
        text: '写真、国籍、ビザステータス、入社可能日を含むバイオデータが期待されます。宗教の記載を求められることも。海外からの応募の場合はパスポート情報を記載。バイオデータとレジュメの両方が受け入れられます。',
      },
      {
        country: 'フィリピン',
        flag: '\ud83c\uddf5\ud83c\udded',
        text: 'Personal Data Sheet（PDS）が公務員の正式フォーマット。民間企業はバイオデータまたはレジュメを受け付けます。身長、体重、婚姻状況の記載が一般的です。',
      },
    ],
  },
  templates: {
    title: '無料バイオデータテンプレート',
    subtitle:
      'プロフェッショナルにデザインされたWord・PDF形式のバイオデータテンプレートをダウンロード。ご自身の情報で簡単にカスタマイズできます。',
    cards: [
      {
        title: '就職用バイオデータテンプレート',
        description: '標準セクションを網羅した就職応募用のプロフェッショナルなテンプレートです。',
        ctaLabel: 'AIツールで作成する',
        color: 'blue',
      },
      {
        title: 'シンプルバイオデータテンプレート',
        description: '新卒や未経験者向けのシンプルでクリーンなデザインのテンプレートです。',
        ctaLabel: '作成を始める',
        color: 'orange',
      },
    ],
  },
  tips: {
    title: '効果的なバイオデータを書くためのヒント',
    items: [
      { title: 'プロフェッショナルな証明写真を使用', description: 'パスポートサイズ、フォーマルな服装、無地の背景。セルフィーやカジュアルな写真は不可。' },
      { title: '簡潔にまとめる', description: '最大1〜2ページ。採用担当者は長い書類を読みません。' },
      { title: '統一的なフォーマットを維持', description: '全体で同じフォント、明確なセクション見出し、適切な配置を心がけましょう。' },
      { title: '宣誓文を追加', description: '「上記の情報が私の知り得る限り正確であることを宣誓します。」' },
      { title: '学歴は新しい順に記載', description: '最新の学位を最初に。成績/GPAが優れている場合は必ず記載。' },
      { title: '誤字脱字を入念にチェック', description: 'スペルミスや誤字は即座にマイナスの印象を与えます。' },
      { title: '関連情報のみ記載', description: '求められていない情報や職務に関係のない情報は記載しないでください。' },
      { title: '署名と日付を記入', description: '末尾に自筆署名、現在の日付と場所を記載してください。' },
    ],
  },
  faq: {
    title: 'よくある質問',
    items: [
      {
        question: 'バイオデータと履歴書の違いは何ですか？',
        answer:
          '履歴書（レジュメ）は職歴、スキル、実績を中心に、特定の求人に合わせてカスタマイズする書類です。バイオデータにはさらに生年月日、婚姻状況、宗教、家族情報などの個人情報が含まれます。日本や欧米では履歴書が標準ですが、南アジア、中東、東南アジアの一部ではバイオデータが好まれます。',
      },
      {
        question: 'バイオデータは就職活動で使われますか？',
        answer:
          'はい、バイオデータはインド、パキスタン、バングラデシュ、フィリピン、中東諸国の就職活動で一般的に使用されています。公務員、公的機関、伝統的企業では、レジュメではなくバイオデータ形式を明確に要求されることが多いです。',
      },
      {
        question: 'バイオデータにはどのような個人情報を記載しますか？',
        answer:
          '就職用バイオデータには通常、氏名、生年月日、性別、国籍、婚姻状況、使用言語、本籍/現住所を記載します。お見合い用バイオデータでは、身長、体重、宗教、カースト、家族情報、ホロスコープ情報を追加することがあります。',
      },
      {
        question: 'バイオデータの適切な長さは？',
        answer:
          '理想的には1〜2ページです。就職用バイオデータは通常1ページ、お見合い用バイオデータは家族情報や個人的な希望条件を含めるため2ページになることがあります。簡潔にまとめつつ、必要な情報はすべて記載してください。',
      },
      {
        question: '履歴書作成ツールでバイオデータを作成できますか？',
        answer:
          'はい、当社のAI履歴書作成ツールでバイオデータを作成できます。標準テンプレートをベースに、バイオデータに必要な個人情報セクションを追加してください。セクションのカスタマイズ機能により、お住まいの地域で期待されるバイオデータ形式に合わせることが可能です。',
      },
      {
        question: 'お見合い用バイオデータ（マリッジバイオデータ）とは？',
        answer:
          'マリッジバイオデータは、インドやパキスタンなどのお見合い（アレンジドマリッジ）の伝統がある国で使用される書類です。詳細な個人情報、家族背景、学歴、職歴、ホロスコープ情報、パートナーの希望条件を記載し、家族間の相性判断に役立てられます。',
      },
    ],
  },
  crossLinks: {
    title: '関連リソース',
    items: [
      { href: '/resume-format', title: '履歴書フォーマットガイド', subtitle: '時系列・機能別・コンビネーション形式' },
      { href: '/templates', title: '履歴書テンプレート', subtitle: '20種類以上のプロフェッショナルテンプレート' },
      { href: '/resume-examples', title: '履歴書サンプル', subtitle: '300以上の職種別サンプル' },
    ],
  },
  externalResources: {
    title: '外部リソース',
    items: [
      { href: 'https://www.bls.gov/ooh/', label: 'Bureau of Labor Statistics: 職業展望' },
      { href: 'https://www.glassdoor.com/blog/guide/resume-tips/', label: 'Glassdoor: 履歴書・キャリアガイド' },
    ],
  },
  bottomCta: {
    title: '数分でバイオデータを作成',
    description:
      'AI搭載ビルダーで、正しいセクション構成のプロフェッショナルなバイオデータを簡単に作成。複数のテンプレートから選択し、PDFまたはWordでエクスポートできます。',
    ctaLabel: '無料でバイオデータを作成',
  },
};

// ---------------------------------------------------------------------------
// Italian
// ---------------------------------------------------------------------------
const it: BiodataFormatPageContent = {
  meta: {
    title: 'Formato Biodata 2026: Modelli Gratuiti, Esempi e Guida alla Compilazione | Best AI Resume',
    description:
      'Scopri il formato biodata per candidature di lavoro. Confronta biodata vs curriculum vitae, scarica modelli gratuiti (PDF e Word) e consulta esempi per India, Pakistan e altri paesi.',
    keywords:
      'formato biodata, biodata, biodata per lavoro, biodata vs curriculum vitae, biodata matrimoniale, modello biodata, formato dati personali, curriculum vitae formato',
  },
  schemas: {
    breadcrumbName: 'Guida al Formato Biodata',
    articleHeadline: 'Guida al Formato Biodata 2026: Modelli, Esempi e Come Scriverlo',
    articleDescription:
      'Guida completa al formato biodata per candidature di lavoro e matrimonio. Scopri la differenza tra biodata e curriculum vitae, scarica modelli gratuiti e consulta gli esempi.',
  },
  hero: {
    badge: 'Guida Completa 2026',
    title: 'Guida al Formato Biodata',
    titleHighlight: '(Modelli Gratuiti)',
    subtitle:
      'Il <strong>formato biodata</strong> \u00e8 il documento standard per le candidature di lavoro in India, Pakistan, Bangladesh e Medio Oriente. Scopri quando usare il biodata rispetto al curriculum vitae e scarica modelli gratuiti conformi alle aspettative regionali.',
    ctaTemplates: 'Scarica i Modelli',
    ctaBuild: 'Crea il Biodata con l\u2019AI',
  },
  whatIs: {
    title: 'Che cos\u2019\u00e8 il Biodata?',
    paragraphs: [
      'Il <strong>biodata</strong> (abbreviazione di <em>biographical data</em>, ovvero dati biografici) \u00e8 un documento che riassume le informazioni personali e professionali di un individuo. A differenza del <strong>curriculum vitae</strong> italiano, che si concentra sulle esperienze lavorative e sulle competenze, il biodata include <strong>dati personali</strong> come data di nascita, stato civile, nazionalit\u00e0, religione e talvolta informazioni sulla famiglia.',
      'Il formato biodata \u00e8 ampiamente utilizzato in <strong>Asia meridionale</strong> (India, Pakistan, Bangladesh, Sri Lanka), <strong>Medio Oriente</strong> (EAU, Arabia Saudita, Qatar) e in parte del <strong>Sud-Est asiatico</strong> (Filippine, Malesia). In queste regioni, gli enti pubblici, le istituzioni governative e le aziende tradizionali richiedono spesso il formato biodata anzich\u00e9 il curriculum vitae europeo.',
    ],
    insightTitle: 'Nota importante:',
    insightText:
      'Se ti candidi per posizioni in India, Pakistan o nei paesi del Golfo, conoscere il formato biodata \u00e8 fondamentale. Le candidature che non rispettano il formato richiesto vengono spesso scartate. In Italia il curriculum vitae resta il documento standard, ma chi lavora in contesti internazionali dovrebbe conoscere entrambi i formati.',
  },
  vsComparison: {
    title: 'Biodata vs Curriculum Vitae vs Resume: Quali Differenze?',
    subtitle: 'Comprendere quale documento utilizzare in ogni contesto \u00e8 essenziale per candidarsi con successo.',
    headers: { aspect: 'Aspetto', biodata: 'Biodata', resume: 'Curriculum Vitae', cv: 'CV Accademico' },
    rows: [
      { aspect: 'Lunghezza', biodata: '1\u20132 pagine', resume: '1\u20132 pagine', cv: '2+ pagine' },
      {
        aspect: 'Dati personali',
        biodata: 'Dettagliati (data di nascita, stato civile, religione, famiglia)',
        resume: 'Minimi (nome e contatti)',
        cv: 'Minimi (nome e contatti)',
        biodataHighlight: 'green',
      },
      { aspect: 'Focus', biodata: 'Background personale + esperienza', resume: 'Competenze + risultati', cv: 'Carriera accademica + ricerca' },
      {
        aspect: 'Dove si usa',
        biodata: 'India, Pakistan, Medio Oriente, Filippine',
        resume: 'Italia, Europa, USA, Canada, Australia',
        cv: 'Mondo accademico, Regno Unito',
      },
      {
        aspect: 'Contesto tipico',
        biodata: 'Impiego pubblico, aziende tradizionali, matrimonio',
        resume: 'Aziende private, startup, settore IT',
        cv: 'Posizioni accademiche, ricerca, sanit\u00e0',
      },
      {
        aspect: 'Personalizzazione',
        biodata: 'Contenuto identico per pi\u00f9 candidature',
        resume: 'Personalizzato per ogni candidatura',
        cv: 'Aggiornato con nuove pubblicazioni e traguardi',
      },
    ],
  },
  structure: {
    title: 'Struttura Standard del Biodata',
    description: 'Non esiste un formato \u00abofficial\u00bb unico, ma la maggior parte dei selezionatori si aspetta queste sezioni:',
    sections: [
      { number: 1, label: 'Dati personali', detail: 'Nome completo, foto, data di nascita, sesso, stato civile, nazionalit\u00e0', colorGroup: 'orange' },
      { number: 2, label: 'Recapiti', detail: 'Indirizzo (permanente e attuale), telefono, e-mail', colorGroup: 'default' },
      { number: 3, label: 'Obiettivo professionale', detail: 'Descrizione dell\u2019obiettivo di carriera in 2\u20133 frasi', colorGroup: 'default' },
      { number: 4, label: 'Istruzione', detail: 'Titolo di studio, istituto, anno di conseguimento, voto/GPA', colorGroup: 'blue' },
      { number: 5, label: 'Esperienza lavorativa', detail: 'Azienda, ruolo, periodo, mansioni principali', colorGroup: 'blue' },
      { number: 6, label: 'Competenze', detail: 'Competenze tecniche, lingue conosciute, software', colorGroup: 'default' },
      { number: 7, label: 'Informazioni aggiuntive', detail: 'Hobby, interessi, premi, referenze', colorGroup: 'default' },
      { number: 8, label: 'Dichiarazione', detail: '\u00abDichiaro che le informazioni sopra riportate sono veritiere...\u00bb', colorGroup: 'dark' },
    ],
    proTipTitle: 'Consiglio dell\u2019esperto:',
    proTipText:
      'Includi sempre una fototessera professionale nell\u2019angolo in alto a destra del biodata. \u00c8 un requisito standard in Asia meridionale e Medio Oriente. Anche nel curriculum vitae italiano la foto \u00e8 diffusa, sebbene non obbligatoria, mentre nei resume anglosassoni \u00e8 generalmente sconsigliata.',
  },
  personalInfo: {
    title: 'Dati Personali da Includere nel Biodata',
    description: 'La sezione dei dati personali \u00e8 l\u2019elemento che distingue maggiormente il biodata dal curriculum vitae tradizionale. Ecco cosa \u00e8 generalmente richiesto:',
    alwaysInclude: {
      title: 'Da includere sempre',
      items: [
        'Nome completo (come nei documenti ufficiali)',
        'Data di nascita',
        'Sesso',
        'Nazionalit\u00e0',
        'Stato civile',
        'Lingue conosciute',
        'Indirizzo di residenza permanente',
        'Indirizzo attuale',
        'Numero di telefono',
        'Indirizzo e-mail',
      ],
    },
    optional: {
      title: 'Facoltativo (in base al contesto)',
      items: [
        'Nome e professione del padre',
        'Nome della madre',
        'Religione (se richiesta dal datore di lavoro)',
        'Casta/comunit\u00e0 (per impieghi pubblici in India)',
        'Gruppo sanguigno',
        'Altezza e peso',
        'Numero di passaporto (per lavoro all\u2019estero)',
        'Status del visto',
      ],
    },
    noteTitle: 'Nota importante:',
    noteText:
      'Sebbene il biodata tradizionale includa informazioni come religione e casta, molte aziende private moderne in India non le richiedono pi\u00f9. Inserisci solo le informazioni espressamente richieste nell\u2019annuncio di lavoro. In Italia, il curriculum vitae segue le normative GDPR e non richiede dati sensibili come religione o stato civile, salvo che siano rilevanti per la posizione.',
  },
  types: {
    title: 'Tipologie di Biodata',
    jobBiodata: {
      title: '1. Biodata Professionale (per Lavoro)',
      description:
        'Utilizzato per le candidature di lavoro, particolarmente diffuso nel settore pubblico dell\u2019Asia meridionale, nelle aziende statali e nelle imprese tradizionali.',
      focusTitle: 'Contenuto principale:',
      focusItems: [
        'Percorso formativo con risultati accademici',
        'Esperienza lavorativa con descrizione delle mansioni',
        'Competenze professionali e trasversali',
        'Certificazioni e formazione professionale',
      ],
      commonTitle: 'Contesti di utilizzo pi\u00f9 comuni:',
      commonItems: [
        'Concorsi UPSC, SSC e bancari (India)',
        'Selezioni PPSC e FPSC (Pakistan)',
        'Ricerca di lavoro nei paesi del Golfo',
        'Candidature per posizioni di insegnamento',
      ],
    },
    marriageBiodata: {
      title: '2. Biodata Matrimoniale',
      description:
        'Utilizzato nella tradizione dei matrimoni combinati in India, Pakistan, Bangladesh e nelle comunit\u00e0 della diaspora. Contiene informazioni personali e familiari dettagliate.',
      sectionsTitle: 'Sezioni aggiuntive:',
      sectionsItems: [
        'Background familiare (genitori, fratelli e sorelle)',
        'Dettagli dell\u2019oroscopo / Kundali',
        'Caratteristiche fisiche',
        'Preferenze per il partner',
      ],
      designTitle: 'Elementi di design:',
      designItems: [
        'Bordi decorativi',
        'Fotografia professionale',
        'Simboli religiosi (facoltativo)',
        'Di solito 2\u20133 pagine',
      ],
    },
  },
  regions: {
    title: 'Formato Biodata per Regione',
    description: 'Le aspettative variano da paese a paese. Ecco cosa cercano i selezionatori nelle diverse aree geografiche:',
    items: [
      {
        country: 'India',
        flag: '\ud83c\uddee\ud83c\uddf3',
        text: 'Il biodata \u00e8 lo standard per la pubblica amministrazione (UPSC, SSC, PSC statali), banche e aziende statali. Le aziende private multinazionali preferiscono il curriculum vitae. Sono richiesti: nome del padre, categoria di casta (per le riserve), dichiarazione e fototessera.',
      },
      {
        country: 'Pakistan',
        flag: '\ud83c\uddf5\ud83c\uddf0',
        text: 'Simile all\u2019India. Spesso viene richiesto il numero CNIC (Carta d\u2019Identit\u00e0 Nazionale). Nome del padre e indirizzo sono informazioni di base. Per le posizioni governative e semi-governative \u00e8 necessario un biodata dettagliato.',
      },
      {
        country: 'EAU e Paesi del Golfo',
        flag: '\ud83c\udde6\ud83c\uddea',
        text: 'Si aspettano un biodata con foto, nazionalit\u00e0, stato del visto e data di disponibilit\u00e0. La religione pu\u00f2 essere richiesta. Per le candidature dall\u2019estero, includere i dati del passaporto. Sia il biodata che il curriculum vitae sono accettati.',
      },
      {
        country: 'Filippine',
        flag: '\ud83c\uddf5\ud83c\udded',
        text: 'Il Personal Data Sheet (PDS) \u00e8 il formato ufficiale per la pubblica amministrazione. Le aziende private accettano sia il biodata che il curriculum vitae. \u00c8 comune indicare altezza, peso e stato civile.',
      },
    ],
  },
  templates: {
    title: 'Modelli di Biodata Gratuiti',
    subtitle:
      'Scarica modelli di biodata professionali in formato Word e PDF. Personalizzali facilmente con le tue informazioni.',
    cards: [
      {
        title: 'Modello Biodata Professionale',
        description: 'Modello con tutte le sezioni standard per candidature di lavoro.',
        ctaLabel: 'Crea con l\u2019AI',
        color: 'blue',
      },
      {
        title: 'Modello Biodata Semplice',
        description: 'Design pulito e minimale, ideale per neolaureati e candidati alle prime esperienze.',
        ctaLabel: 'Inizia a Creare',
        color: 'orange',
      },
    ],
  },
  tips: {
    title: 'Consigli per Scrivere un Biodata Efficace',
    items: [
      { title: 'Usa una foto professionale', description: 'Formato tessera, abbigliamento formale, sfondo neutro. Niente selfie o foto informali.' },
      { title: 'Sii conciso', description: 'Massimo 1\u20132 pagine. I selezionatori non leggono documenti troppo lunghi.' },
      { title: 'Mantieni un formato coerente', description: 'Stesso carattere tipografico, intestazioni chiare, allineamento uniforme in tutto il documento.' },
      { title: 'Aggiungi la dichiarazione', description: '\u00abDichiaro che le informazioni sopra riportate sono veritiere e corrette a mia conoscenza.\u00bb' },
      { title: 'Elenca l\u2019istruzione in ordine cronologico inverso', description: 'Inizia dal titolo di studio pi\u00f9 recente. Includi il voto se significativo.' },
      { title: 'Ricontrolla con attenzione', description: 'Errori di ortografia e grammatica creano immediatamente un\u2019impressione negativa.' },
      { title: 'Includi solo informazioni pertinenti', description: 'Non inserire dati che non sono richiesti o non sono rilevanti per la posizione.' },
      { title: 'Firma e data', description: 'Apponi la firma, la data e il luogo in calce al documento.' },
    ],
  },
  faq: {
    title: 'Domande Frequenti',
    items: [
      {
        question: 'Qual \u00e8 la differenza tra biodata e curriculum vitae?',
        answer:
          'Il curriculum vitae (CV) si concentra sulle esperienze lavorative, competenze e risultati professionali, ed \u00e8 personalizzato per ogni candidatura. Il biodata include inoltre dati personali come data di nascita, stato civile, religione e informazioni sulla famiglia. In Italia e in Europa si usa il curriculum vitae, mentre il biodata \u00e8 il formato preferito in Asia meridionale, Medio Oriente e in parte del Sud-Est asiatico.',
      },
      {
        question: 'Il biodata si usa per cercare lavoro?',
        answer:
          'S\u00ec, il biodata \u00e8 comunemente utilizzato per le candidature di lavoro in India, Pakistan, Bangladesh, Filippine e nei paesi del Medio Oriente. Nel settore pubblico e nelle aziende tradizionali \u00e8 spesso espressamente richiesto il formato biodata anzich\u00e9 il curriculum vitae.',
      },
      {
        question: 'Quali dati personali si inseriscono nel biodata?',
        answer:
          'Un biodata professionale include tipicamente nome completo, data di nascita, sesso, nazionalit\u00e0, stato civile, lingue conosciute e indirizzi (permanente e attuale). Un biodata matrimoniale pu\u00f2 aggiungere altezza, peso, religione, casta, informazioni sulla famiglia e dettagli dell\u2019oroscopo.',
      },
      {
        question: 'Quanto deve essere lungo un biodata?',
        answer:
          'Idealmente 1\u20132 pagine. Un biodata professionale occupa di solito una pagina, mentre quello matrimoniale pu\u00f2 arrivare a due pagine per via delle informazioni sulla famiglia e delle preferenze personali. Cerca di essere conciso senza omettere le informazioni essenziali.',
      },
      {
        question: 'Posso creare un biodata con uno strumento per curriculum vitae?',
        answer:
          'S\u00ec, il nostro builder AI pu\u00f2 essere utilizzato per creare un biodata. Parti da un modello standard e aggiungi le sezioni relative ai dati personali tipici del biodata. Le funzionalit\u00e0 di personalizzazione ti permettono di adattare il documento al formato richiesto nella tua area geografica.',
      },
      {
        question: 'Cos\u2019\u00e8 un biodata matrimoniale?',
        answer:
          'Il biodata matrimoniale \u00e8 un documento utilizzato nella tradizione dei matrimoni combinati in India, Pakistan e altri paesi dell\u2019Asia meridionale. Contiene informazioni personali dettagliate, background familiare, percorso formativo e professionale, dettagli dell\u2019oroscopo e preferenze per il partner, per facilitare la compatibilit\u00e0 tra le famiglie.',
      },
    ],
  },
  crossLinks: {
    title: 'Risorse Correlate',
    items: [
      { href: '/it/resume-format', title: 'Guida al Formato del CV', subtitle: 'Formato cronologico, funzionale e combinato' },
      { href: '/it/templates', title: 'Modelli di Curriculum Vitae', subtitle: 'Oltre 20 modelli professionali' },
      { href: '/it/resume-examples', title: 'Esempi di Curriculum Vitae', subtitle: 'Oltre 300 esempi per professione' },
    ],
  },
  externalResources: {
    title: 'Risorse Esterne',
    items: [
      { href: 'https://www.bls.gov/ooh/', label: 'Bureau of Labor Statistics: Panorama Occupazionale' },
      { href: 'https://www.glassdoor.com/blog/guide/resume-tips/', label: 'Glassdoor: Guida al CV e alla Carriera' },
    ],
  },
  bottomCta: {
    title: 'Crea il Tuo Biodata in Pochi Minuti',
    description:
      'Il nostro builder con intelligenza artificiale ti aiuta a creare un biodata professionale con la struttura corretta. Scegli tra diversi modelli ed esporta in PDF o Word.',
    ctaLabel: 'Crea il Biodata Gratis',
  },
};

// ---------------------------------------------------------------------------
// Korean
// ---------------------------------------------------------------------------
const ko: BiodataFormatPageContent = {
  meta: {
    title: '바이오데이터 형식 가이드 2026: 무료 템플릿, 예시, 작성법 | Best AI Resume',
    description:
      '바이오데이터(Biodata) 형식을 상세히 안내합니다. 이력서와의 차이점, 무료 템플릿(PDF/Word) 다운로드, 인도·파키스탄·중동 지역 작성 예시를 소개합니다.',
    keywords:
      '바이오데이터, biodata 작성법, 바이오데이터 템플릿, 바이오데이터 이력서 차이, 이력서 작성 도구, 이력서 샘플, AI 이력서, 이력서 쓰는 법',
  },
  schemas: {
    breadcrumbName: '바이오데이터 형식 가이드',
    articleHeadline: '바이오데이터 형식 가이드 2026: 템플릿, 예시, 작성법',
    articleDescription:
      '취업 및 결혼용 바이오데이터(Biodata) 완전 가이드. 이력서와의 차이점, 무료 템플릿 다운로드, 지역별 작성 예시를 안내합니다.',
  },
  hero: {
    badge: '2026년 완전 가이드',
    title: '바이오데이터 형식 가이드',
    titleHighlight: '(무료 템플릿 포함)',
    subtitle:
      '<strong>바이오데이터(Biodata)</strong>는 인도, 파키스탄, 방글라데시, 중동에서 입사 지원에 사용되는 표준 문서 형식입니다. 한국의 <strong>이력서</strong>와 다른 고유한 형식을 이해하고, 각 지역의 기대에 맞는 템플릿을 다운로드하세요.',
    ctaTemplates: '템플릿 다운로드',
    ctaBuild: 'AI로 바이오데이터 작성',
  },
  whatIs: {
    title: '바이오데이터(Biodata)란?',
    paragraphs: [
      '<strong>바이오데이터</strong>(<em>biographical data</em> = 경력 데이터의 약자)는 개인의 경력 및 직무 정보를 정리한 문서입니다. 직무 경력과 스킬을 중심으로 하는 한국의 <strong>이력서</strong>와 달리, 바이오데이터에는 생년월일, 혼인 여부, 국적, 종교, 경우에 따라 가족 정보 등 <strong>개인 정보</strong>가 포함됩니다.',
      '바이오데이터 형식은 <strong>남아시아</strong>(인도, 파키스탄, 방글라데시, 스리랑카), <strong>중동</strong>(UAE, 사우디아라비아, 카타르), <strong>동남아시아</strong> 일부(필리핀, 말레이시아)에서 널리 사용됩니다. 이 지역의 공무원 채용, 공공기관, 전통적 기업에서는 서구식 이력서 대신 바이오데이터 형식을 요구하는 경우가 많습니다.',
    ],
    insightTitle: '핵심 포인트:',
    insightText:
      '인도, 파키스탄, 걸프 국가의 일자리에 지원할 경우 바이오데이터 형식을 이해하는 것이 필수입니다. 기대되는 포맷을 따르지 않은 지원서는 많은 기업에서 탈락 사유가 됩니다.',
  },
  vsComparison: {
    title: '바이오데이터 vs 이력서 vs CV: 차이점은?',
    subtitle: '어떤 문서를 언제 사용하는지 정확히 이해하는 것이 취업 활동 성공의 핵심입니다.',
    headers: { aspect: '항목', biodata: '바이오데이터', resume: '이력서(레쥬메)', cv: 'CV' },
    rows: [
      { aspect: '길이', biodata: '1~2페이지', resume: '1~2페이지', cv: '2페이지 이상' },
      {
        aspect: '개인 정보',
        biodata: '상세(생년월일, 혼인 여부, 종교, 가족 구성)',
        resume: '최소(이름과 연락처만)',
        cv: '최소(이름과 연락처만)',
        biodataHighlight: 'green',
      },
      { aspect: '중점', biodata: '개인 배경 + 경력', resume: '스킬 + 성과', cv: '학술 + 연구 업적' },
      {
        aspect: '주요 사용 지역',
        biodata: '인도, 파키스탄, 중동, 필리핀',
        resume: '미국, 캐나다, 호주, 한국',
        cv: '유럽, 영국, 학계',
      },
      {
        aspect: '적합한 상황',
        biodata: '공무원, 전통 기업, 결혼 용도',
        resume: '일반 기업, 스타트업, IT 업계',
        cv: '학술직, 연구직, 의료직',
      },
      {
        aspect: '맞춤화',
        biodata: '여러 지원에 동일 내용 사용',
        resume: '지원처마다 맞춤 작성',
        cv: '업적 축적에 따라 업데이트',
      },
    ],
  },
  structure: {
    title: '바이오데이터 표준 구성',
    description: '"공식적인" 바이오데이터 형식은 없지만, 대부분의 채용 담당자가 기대하는 섹션 구성은 다음과 같습니다:',
    sections: [
      { number: 1, label: '개인 정보', detail: '성명, 사진, 생년월일, 성별, 혼인 여부, 국적', colorGroup: 'orange' },
      { number: 2, label: '연락처', detail: '주소(본적/현주소), 전화번호, 이메일', colorGroup: 'default' },
      { number: 3, label: '지원 동기/목표', detail: '커리어 목표를 2~3문장으로 기재', colorGroup: 'default' },
      { number: 4, label: '학력', detail: '학위, 교육기관, 졸업 연도, 성적/GPA', colorGroup: 'blue' },
      { number: 5, label: '경력', detail: '회사명, 직위, 기간, 담당 업무', colorGroup: 'blue' },
      { number: 6, label: '기술/역량', detail: '전문 기술, 어학 능력, 소프트웨어 스킬', colorGroup: 'default' },
      { number: 7, label: '기타 정보', detail: '취미, 특기, 수상 경력, 추천인', colorGroup: 'default' },
      { number: 8, label: '선서문', detail: '"위 정보가 정확함을 선언합니다…"', colorGroup: 'dark' },
    ],
    proTipTitle: '전문가 조언:',
    proTipText:
      '바이오데이터 우측 상단에 여권 사이즈 증명사진을 반드시 부착하세요. 남아시아와 중동에서는 필수 사항입니다. 한국 이력서에서도 증명사진은 표준이지만, 서양식 레쥬메에서는 권장되지 않습니다.',
  },
  personalInfo: {
    title: '바이오데이터에 기재하는 개인 정보',
    description: '개인 정보 섹션이 바이오데이터를 일반 이력서와 구별 짓는 가장 큰 요소입니다. 일반적으로 기대되는 정보는 다음과 같습니다:',
    alwaysInclude: {
      title: '필수 기재 항목',
      items: [
        '성명(공식 문서 기준)',
        '생년월일',
        '성별',
        '국적',
        '혼인 여부',
        '사용 가능 언어',
        '본적 주소',
        '현 주소',
        '전화번호',
        '이메일 주소',
      ],
    },
    optional: {
      title: '선택 사항(상황에 따라)',
      items: [
        '부친 성명 및 직업',
        '모친 성명',
        '종교(고용주가 요구하는 경우)',
        '카스트/커뮤니티(인도 공무원 채용)',
        '혈액형',
        '신장/체중',
        '여권 번호(해외 취업의 경우)',
        '비자 상태',
      ],
    },
    noteTitle: '중요 참고:',
    noteText:
      '바이오데이터에는 전통적으로 종교나 카스트 등의 정보가 포함되지만, 인도의 현대적 민간 기업 다수는 이러한 정보를 더 이상 요구하지 않습니다. 구인 공고에서 구체적으로 요구하는 정보만 기재하세요.',
  },
  types: {
    title: '바이오데이터의 종류',
    jobBiodata: {
      title: '1. 취업용 바이오데이터(프로페셔널 바이오데이터)',
      description:
        '입사 지원에 사용됩니다. 특히 남아시아의 공무원 채용, 공기업(PSU), 전통적 기업에서 일반적입니다.',
      focusTitle: '주요 기재 내용:',
      focusItems: [
        '성적을 포함한 학력 정보',
        '직무 내용을 포함한 경력 사항',
        '전문 기술 및 대인 기술',
        '자격증 및 연수 이력',
      ],
      commonTitle: '주요 사용 상황:',
      commonItems: [
        'UPSC/SSC/은행 시험(인도)',
        'PPSC/FPSC 채용 시험(파키스탄)',
        '걸프 국가 취업 활동',
        '교직 지원',
      ],
    },
    marriageBiodata: {
      title: '2. 맞선용 바이오데이터(매리지 바이오데이터)',
      description:
        '인도, 파키스탄, 방글라데시 및 해외 거주 커뮤니티의 중매(어레인지드 매리지) 전통에서 사용됩니다. 상세한 개인 정보와 가족 정보를 포함하는 문서입니다.',
      sectionsTitle: '추가 섹션:',
      sectionsItems: [
        '가족 배경(부모, 형제자매)',
        '점성술/쿤달리 세부 사항',
        '신체적 특징',
        '배우자 희망 조건',
      ],
      designTitle: '디자인 요소:',
      designItems: [
        '장식적 테두리',
        '전문 사진',
        '종교적 상징(선택)',
        '보통 2~3페이지',
      ],
    },
  },
  regions: {
    title: '지역별 바이오데이터 형식',
    description: '국가마다 기대되는 내용이 다릅니다. 각 지역의 채용 담당자가 요구하는 포인트를 소개합니다:',
    items: [
      {
        country: '인도',
        flag: '\ud83c\uddee\ud83c\uddf3',
        text: '바이오데이터는 공무원 채용(UPSC, SSC, 주 PSC), 은행, 공기업에서 표준입니다. 외국계 민간 기업은 레쥬메를 선호합니다. 부친 성명, 카스트 카테고리(예약제도용), 선서문이 필수이며 증명사진도 필수입니다.',
      },
      {
        country: '파키스탄',
        flag: '\ud83c\uddf5\ud83c\uddf0',
        text: '인도와 유사합니다. CNIC(국민신분증) 번호 기재가 요구되는 경우가 많습니다. 부친 성명과 주소는 기본 정보입니다. 공무원 및 준공공 직위에서는 상세한 바이오데이터가 필요합니다.',
      },
      {
        country: 'UAE 및 걸프 국가',
        flag: '\ud83c\udde6\ud83c\uddea',
        text: '사진, 국적, 비자 상태, 입사 가능일을 포함한 바이오데이터가 기대됩니다. 종교 기재를 요구받을 수도 있습니다. 해외 지원 시 여권 정보를 기재하세요. 바이오데이터와 레쥬메 모두 허용됩니다.',
      },
      {
        country: '필리핀',
        flag: '\ud83c\uddf5\ud83c\udded',
        text: 'Personal Data Sheet(PDS)가 공무원의 공식 포맷입니다. 민간 기업은 바이오데이터 또는 레쥬메를 허용합니다. 신장, 체중, 혼인 여부 기재가 일반적입니다.',
      },
    ],
  },
  templates: {
    title: '무료 바이오데이터 템플릿',
    subtitle:
      '전문적으로 디자인된 Word/PDF 형식의 바이오데이터 템플릿을 다운로드하세요. 본인의 정보로 쉽게 맞춤 설정할 수 있습니다.',
    cards: [
      {
        title: '취업용 바이오데이터 템플릿',
        description: '표준 섹션을 모두 포함한 입사 지원용 전문 템플릿입니다.',
        ctaLabel: 'AI 도구로 작성하기',
        color: 'blue',
      },
      {
        title: '심플 바이오데이터 템플릿',
        description: '신입 및 경력이 적은 분을 위한 심플하고 깔끔한 디자인 템플릿입니다.',
        ctaLabel: '작성 시작하기',
        color: 'orange',
      },
    ],
  },
  tips: {
    title: '효과적인 바이오데이터를 작성하기 위한 팁',
    items: [
      { title: '전문적인 증명사진 사용', description: '여권 사이즈, 정장 차림, 무지 배경. 셀피나 캐주얼 사진은 불가.' },
      { title: '간결하게 작성', description: '최대 1~2페이지. 채용 담당자는 긴 문서를 읽지 않습니다.' },
      { title: '일관된 포맷 유지', description: '전체적으로 동일한 글꼴, 명확한 섹션 제목, 적절한 정렬을 유지하세요.' },
      { title: '선서문 추가', description: '"위 정보가 제가 아는 한 정확함을 선서합니다."' },
      { title: '학력은 최신순으로 기재', description: '가장 최근 학위를 먼저 기재. 성적/GPA가 우수한 경우 반드시 포함.' },
      { title: '오탈자를 꼼꼼히 확인', description: '맞춤법 오류나 오탈자는 즉시 부정적인 인상을 줍니다.' },
      { title: '관련 정보만 기재', description: '요구되지 않거나 직무와 관련 없는 정보는 기재하지 마세요.' },
      { title: '서명 및 날짜 기입', description: '하단에 자필 서명, 현재 날짜와 장소를 기재하세요.' },
    ],
  },
  faq: {
    title: '자주 묻는 질문',
    items: [
      {
        question: '바이오데이터와 이력서의 차이점은 무엇인가요?',
        answer:
          '이력서(레쥬메)는 경력, 스킬, 성과를 중심으로 특정 구인에 맞춰 맞춤 작성하는 문서입니다. 바이오데이터에는 추가로 생년월일, 혼인 여부, 종교, 가족 정보 등의 개인 정보가 포함됩니다. 한국이나 서구에서는 이력서가 표준이지만, 남아시아, 중동, 동남아시아 일부에서는 바이오데이터가 선호됩니다.',
      },
      {
        question: '바이오데이터는 취업 활동에 사용되나요?',
        answer:
          '네, 바이오데이터는 인도, 파키스탄, 방글라데시, 필리핀, 중동 국가의 취업 활동에서 일반적으로 사용됩니다. 공무원, 공공기관, 전통적 기업에서는 레쥬메가 아닌 바이오데이터 형식을 명시적으로 요구하는 경우가 많습니다.',
      },
      {
        question: '바이오데이터에는 어떤 개인 정보를 기재하나요?',
        answer:
          '취업용 바이오데이터에는 보통 성명, 생년월일, 성별, 국적, 혼인 여부, 사용 언어, 본적/현주소를 기재합니다. 맞선용 바이오데이터에서는 신장, 체중, 종교, 카스트, 가족 정보, 점성술 정보를 추가할 수 있습니다.',
      },
      {
        question: '바이오데이터의 적절한 길이는?',
        answer:
          '이상적으로는 1~2페이지입니다. 취업용 바이오데이터는 보통 1페이지, 맞선용 바이오데이터는 가족 정보와 개인적 희망 조건을 포함하여 2페이지가 될 수 있습니다. 간결하게 작성하되 필요한 정보는 모두 포함하세요.',
      },
      {
        question: '이력서 작성 도구로 바이오데이터를 만들 수 있나요?',
        answer:
          '네, 저희 AI 이력서 작성 도구로 바이오데이터를 만들 수 있습니다. 표준 템플릿을 기반으로 바이오데이터에 필요한 개인 정보 섹션을 추가하세요. 섹션 맞춤 기능으로 거주 지역에서 기대되는 바이오데이터 형식에 맞출 수 있습니다.',
      },
      {
        question: '맞선용 바이오데이터(매리지 바이오데이터)란?',
        answer:
          '매리지 바이오데이터는 인도나 파키스탄 등 중매(어레인지드 매리지) 전통이 있는 나라에서 사용되는 문서입니다. 상세한 개인 정보, 가족 배경, 학력, 경력, 점성술 정보, 배우자 희망 조건을 기재하여 가족 간 궁합 판단에 활용됩니다.',
      },
    ],
  },
  crossLinks: {
    title: '관련 리소스',
    items: [
      { href: '/resume-format', title: '이력서 포맷 가이드', subtitle: '시간순/기능별/혼합 형식' },
      { href: '/templates', title: '이력서 템플릿', subtitle: '20종 이상의 전문 템플릿' },
      { href: '/resume-examples', title: '이력서 샘플', subtitle: '300개 이상 직종별 샘플' },
    ],
  },
  externalResources: {
    title: '외부 리소스',
    items: [
      { href: 'https://www.bls.gov/ooh/', label: 'Bureau of Labor Statistics: 직업 전망' },
      { href: 'https://www.glassdoor.com/blog/guide/resume-tips/', label: 'Glassdoor: 이력서 및 커리어 가이드' },
    ],
  },
  bottomCta: {
    title: '몇 분 만에 바이오데이터 작성',
    description:
      'AI 기반 빌더로 올바른 섹션 구성의 전문적인 바이오데이터를 쉽게 작성하세요. 다양한 템플릿 중 선택하여 PDF 또는 Word로 내보내기 가능합니다.',
    ctaLabel: '무료로 바이오데이터 작성',
  },
};

// ---------------------------------------------------------------------------
// Vietnamese
// ---------------------------------------------------------------------------
const vi: BiodataFormatPageContent = {
  meta: {
    title: 'Mẫu Sơ Yếu Lý Lịch 2026: Biodata Miễn Phí, Ví Dụ & Hướng Dẫn Viết | Best AI Resume',
    description:
      'Tìm hiểu mẫu sơ yếu lý lịch (biodata) xin việc chuẩn. So sánh sơ yếu lý lịch với CV, tải mẫu miễn phí (PDF & Word) và xem ví dụ cho Ấn Độ, Pakistan, Việt Nam và các nước khác.',
    keywords:
      'mẫu sơ yếu lý lịch, sơ yếu lý lịch xin việc, biodata, lý lịch cá nhân, sơ yếu lý lịch mẫu, biodata xin việc, mẫu lý lịch, sơ yếu lý lịch tự thuật',
  },
  schemas: {
    breadcrumbName: 'Hướng Dẫn Mẫu Sơ Yếu Lý Lịch',
    articleHeadline: 'Hướng Dẫn Mẫu Sơ Yếu Lý Lịch 2026: Biodata, Ví Dụ & Cách Viết',
    articleDescription:
      'Hướng dẫn toàn diện về mẫu sơ yếu lý lịch (biodata) cho xin việc và hôn nhân. Tìm hiểu sự khác biệt giữa sơ yếu lý lịch và CV, tải mẫu miễn phí và xem các ví dụ thực tế.',
  },
  hero: {
    badge: 'Hướng Dẫn Đầy Đủ 2026',
    title: 'Hướng Dẫn Mẫu Sơ Yếu Lý Lịch',
    titleHighlight: '(Biodata Miễn Phí)',
    subtitle:
      '<strong>Sơ yếu lý lịch</strong> (biodata) là tài liệu tiêu chuẩn để xin việc tại Ấn Độ, Pakistan, Bangladesh và Trung Đông. Tại Việt Nam, <strong>sơ yếu lý lịch</strong> (SYLL) là biểu mẫu bắt buộc cho các cơ quan nhà nước và khu vực công. Tìm hiểu khi nào dùng biodata thay vì CV và tải mẫu miễn phí phù hợp với yêu cầu từng khu vực.',
    ctaTemplates: 'Tải Mẫu Miễn Phí',
    ctaBuild: 'Tạo Sơ Yếu Lý Lịch Bằng AI',
  },
  whatIs: {
    title: 'Sơ Yếu Lý Lịch (Biodata) Là Gì?',
    paragraphs: [
      '<strong>Sơ yếu lý lịch</strong> (biodata — viết tắt của <em>biographical data</em>, tức dữ liệu tiểu sử) là tài liệu tổng hợp thông tin cá nhân và nghề nghiệp của một người. Khác với <strong>CV</strong> (curriculum vitae) tập trung vào kinh nghiệm làm việc và kỹ năng, sơ yếu lý lịch bao gồm <strong>thông tin cá nhân</strong> như ngày sinh, tình trạng hôn nhân, quốc tịch, tôn giáo và đôi khi cả thông tin gia đình.',
      'Tại <strong>Việt Nam</strong>, "sơ yếu lý lịch" (SYLL) là một biểu mẫu hành chính chính thức, bắt buộc khi xin việc vào cơ quan nhà nước, đơn vị sự nghiệp công lập và lực lượng vũ trang. SYLL yêu cầu kê khai chi tiết về bản thân, gia đình (cha mẹ, anh chị em, vợ/chồng), quá trình học tập, quá trình công tác, và quan hệ xã hội. Ngoài ra, mẫu sơ yếu lý lịch cũng phổ biến ở <strong>Nam Á</strong> (Ấn Độ, Pakistan, Bangladesh, Sri Lanka), <strong>Trung Đông</strong> (UAE, Ả Rập Xê Út, Qatar) và một phần <strong>Đông Nam Á</strong> (Philippines, Malaysia).',
    ],
    insightTitle: 'Lưu ý quan trọng:',
    insightText:
      'Nếu bạn nộp đơn xin việc vào cơ quan nhà nước Việt Nam, bạn bắt buộc phải có sơ yếu lý lịch theo mẫu quy định, có xác nhận của chính quyền địa phương. Đối với doanh nghiệp tư nhân và công ty nước ngoài tại Việt Nam, CV hiện đại thường được ưu tiên hơn. Nếu ứng tuyển tại Ấn Độ, Pakistan hay các nước Vùng Vịnh, hiểu rõ mẫu biodata là điều thiết yếu — hồ sơ không đúng định dạng thường bị loại ngay.',
  },
  vsComparison: {
    title: 'Sơ Yếu Lý Lịch vs CV vs Resume: Khác Nhau Ở Đâu?',
    subtitle: 'Hiểu rõ khi nào dùng tài liệu nào là chìa khóa để ứng tuyển thành công.',
    headers: { aspect: 'Tiêu chí', biodata: 'Sơ Yếu Lý Lịch (Biodata)', resume: 'Resume (CV ngắn)', cv: 'CV Học thuật' },
    rows: [
      { aspect: 'Độ dài', biodata: '1–2 trang', resume: '1–2 trang', cv: '2+ trang' },
      {
        aspect: 'Thông tin cá nhân',
        biodata: 'Chi tiết (ngày sinh, hôn nhân, tôn giáo, gia đình)',
        resume: 'Tối thiểu (tên và liên lạc)',
        cv: 'Tối thiểu (tên và liên lạc)',
        biodataHighlight: 'green',
      },
      { aspect: 'Trọng tâm', biodata: 'Lý lịch cá nhân + kinh nghiệm', resume: 'Kỹ năng + thành tích', cv: 'Sự nghiệp học thuật + nghiên cứu' },
      {
        aspect: 'Nơi sử dụng',
        biodata: 'Ấn Độ, Pakistan, Trung Đông, Việt Nam (khu vực công)',
        resume: 'Mỹ, Canada, Úc, doanh nghiệp tư nhân Việt Nam',
        cv: 'Giới học thuật, Anh Quốc',
      },
      {
        aspect: 'Bối cảnh phù hợp',
        biodata: 'Cơ quan nhà nước, doanh nghiệp truyền thống, hôn nhân',
        resume: 'Doanh nghiệp tư nhân, startup, ngành CNTT',
        cv: 'Vị trí học thuật, nghiên cứu, y tế',
      },
      {
        aspect: 'Tùy chỉnh',
        biodata: 'Nội dung giống nhau cho nhiều đơn ứng tuyển',
        resume: 'Tùy chỉnh cho từng vị trí',
        cv: 'Cập nhật khi có thêm công trình và thành tích',
      },
    ],
  },
  structure: {
    title: 'Cấu Trúc Tiêu Chuẩn Của Sơ Yếu Lý Lịch',
    description: 'Không có mẫu "chính thức" duy nhất, nhưng hầu hết nhà tuyển dụng mong đợi các phần sau:',
    sections: [
      { number: 1, label: 'Thông tin cá nhân', detail: 'Họ tên đầy đủ, ảnh, ngày sinh, giới tính, tình trạng hôn nhân, quốc tịch', colorGroup: 'orange' },
      { number: 2, label: 'Thông tin liên lạc', detail: 'Địa chỉ (thường trú và tạm trú), số điện thoại, email', colorGroup: 'default' },
      { number: 3, label: 'Mục tiêu nghề nghiệp', detail: 'Mô tả mục tiêu sự nghiệp trong 2–3 câu', colorGroup: 'default' },
      { number: 4, label: 'Trình độ học vấn', detail: 'Bằng cấp, trường, năm tốt nghiệp, điểm GPA/xếp loại', colorGroup: 'blue' },
      { number: 5, label: 'Kinh nghiệm làm việc', detail: 'Tên công ty, chức vụ, thời gian, nhiệm vụ chính', colorGroup: 'blue' },
      { number: 6, label: 'Kỹ năng', detail: 'Kỹ năng chuyên môn, ngoại ngữ, phần mềm', colorGroup: 'default' },
      { number: 7, label: 'Thông tin bổ sung', detail: 'Sở thích, giải thưởng, người tham chiếu', colorGroup: 'default' },
      { number: 8, label: 'Lời cam đoan', detail: '"Tôi xin cam đoan những thông tin trên là đúng sự thật…"', colorGroup: 'dark' },
    ],
    proTipTitle: 'Mẹo chuyên gia:',
    proTipText:
      'Luôn dán ảnh thẻ chuyên nghiệp ở góc trên bên phải của sơ yếu lý lịch. Đây là yêu cầu bắt buộc ở Nam Á và Trung Đông. Tại Việt Nam, ảnh thẻ 3x4 hoặc 4x6 cũng là yêu cầu tiêu chuẩn trong sơ yếu lý lịch xin việc vào cơ quan nhà nước, trong khi resume kiểu phương Tây thường không yêu cầu ảnh.',
  },
  personalInfo: {
    title: 'Thông Tin Cá Nhân Cần Ghi Trong Sơ Yếu Lý Lịch',
    description: 'Phần thông tin cá nhân là yếu tố phân biệt lớn nhất giữa sơ yếu lý lịch (biodata) và CV hiện đại. Dưới đây là những thông tin thường được yêu cầu:',
    alwaysInclude: {
      title: 'Bắt buộc ghi',
      items: [
        'Họ và tên đầy đủ (theo giấy tờ tùy thân)',
        'Ngày sinh',
        'Giới tính',
        'Quốc tịch',
        'Tình trạng hôn nhân',
        'Ngoại ngữ sử dụng được',
        'Địa chỉ thường trú',
        'Địa chỉ tạm trú',
        'Số điện thoại',
        'Địa chỉ email',
      ],
    },
    optional: {
      title: 'Tùy chọn (tùy theo ngữ cảnh)',
      items: [
        'Họ tên và nghề nghiệp của cha',
        'Họ tên của mẹ',
        'Tôn giáo (nếu nhà tuyển dụng yêu cầu)',
        'Dân tộc (bắt buộc trong SYLL Việt Nam)',
        'Nhóm máu',
        'Chiều cao và cân nặng',
        'Số hộ chiếu (khi xin việc ở nước ngoài)',
        'Tình trạng visa',
      ],
    },
    noteTitle: 'Lưu ý quan trọng:',
    noteText:
      'Tại Việt Nam, sơ yếu lý lịch theo mẫu nhà nước yêu cầu kê khai thêm thành phần gia đình (cha mẹ, anh chị em, vợ/chồng), quá trình hoạt động và quan hệ xã hội — những mục không có trong CV thông thường. Đối với doanh nghiệp tư nhân hiện đại tại Việt Nam, CV tiếng Việt hoặc tiếng Anh tập trung vào kinh nghiệm và kỹ năng thường được ưu tiên hơn. Chỉ kê khai những thông tin mà nhà tuyển dụng yêu cầu cụ thể trong thông báo tuyển dụng.',
  },
  types: {
    title: 'Các Loại Sơ Yếu Lý Lịch (Biodata)',
    jobBiodata: {
      title: '1. Sơ Yếu Lý Lịch Xin Việc (Biodata Nghề Nghiệp)',
      description:
        'Dùng khi nộp đơn xin việc, đặc biệt phổ biến trong khu vực công tại Nam Á, doanh nghiệp nhà nước và các công ty truyền thống. Tại Việt Nam, mẫu SYLL là tài liệu bắt buộc khi xin việc vào cơ quan nhà nước, đơn vị sự nghiệp và lực lượng vũ trang.',
      focusTitle: 'Nội dung trọng tâm:',
      focusItems: [
        'Quá trình học tập với kết quả học tập',
        'Kinh nghiệm làm việc với mô tả nhiệm vụ',
        'Kỹ năng chuyên môn và kỹ năng mềm',
        'Chứng chỉ và đào tạo nghề nghiệp',
      ],
      commonTitle: 'Bối cảnh sử dụng phổ biến:',
      commonItems: [
        'Thi tuyển công chức, viên chức tại Việt Nam',
        'Kỳ thi UPSC, SSC và ngân hàng (Ấn Độ)',
        'Tuyển dụng PPSC và FPSC (Pakistan)',
        'Tìm việc tại các nước Vùng Vịnh',
      ],
    },
    marriageBiodata: {
      title: '2. Sơ Yếu Lý Lịch Hôn Nhân (Biodata Kết Hôn)',
      description:
        'Được sử dụng trong truyền thống hôn nhân sắp đặt tại Ấn Độ, Pakistan, Bangladesh và các cộng đồng kiều bào. Chứa thông tin cá nhân và gia đình chi tiết để hai bên gia đình đánh giá sự phù hợp.',
      sectionsTitle: 'Các phần bổ sung:',
      sectionsItems: [
        'Hoàn cảnh gia đình (cha mẹ, anh chị em)',
        'Chi tiết tử vi / Kundali',
        'Đặc điểm ngoại hình',
        'Tiêu chí mong muốn ở bạn đời',
      ],
      designTitle: 'Yếu tố thiết kế:',
      designItems: [
        'Viền trang trí',
        'Ảnh chân dung chuyên nghiệp',
        'Biểu tượng tôn giáo (tùy chọn)',
        'Thường 2–3 trang',
      ],
    },
  },
  regions: {
    title: 'Mẫu Sơ Yếu Lý Lịch Theo Khu Vực',
    description: 'Yêu cầu khác nhau tùy theo quốc gia. Dưới đây là những gì nhà tuyển dụng ở các khu vực mong đợi:',
    items: [
      {
        country: 'Việt Nam',
        flag: '🇻🇳',
        text: '"Sơ yếu lý lịch" (SYLL) là biểu mẫu hành chính bắt buộc cho cơ quan nhà nước, đơn vị sự nghiệp và lực lượng vũ trang. Mẫu SYLL yêu cầu kê khai chi tiết về bản thân, gia đình, quá trình học tập và công tác, đoàn thể, và phải có xác nhận của UBND phường/xã. Doanh nghiệp tư nhân và công ty nước ngoài thường chấp nhận CV hiện đại thay vì SYLL.',
      },
      {
        country: 'Ấn Độ',
        flag: '🇮🇳',
        text: 'Biodata là tiêu chuẩn cho tuyển dụng công chức (UPSC, SSC, PSC bang), ngân hàng và doanh nghiệp nhà nước. Các công ty đa quốc gia tư nhân ưu tiên resume. Yêu cầu: tên cha, danh mục đẳng cấp (cho hệ thống bảo lưu), lời cam đoan và ảnh thẻ.',
      },
      {
        country: 'Pakistan',
        flag: '🇵🇰',
        text: 'Tương tự Ấn Độ. Thường yêu cầu số CNIC (Thẻ Căn cước Quốc gia). Tên cha và địa chỉ là thông tin cơ bản. Các vị trí nhà nước và bán công yêu cầu biodata chi tiết.',
      },
      {
        country: 'UAE & Các Nước Vùng Vịnh',
        flag: '🇦🇪',
        text: 'Mong đợi biodata có ảnh, quốc tịch, tình trạng visa và ngày có thể bắt đầu làm việc. Tôn giáo có thể được yêu cầu. Khi ứng tuyển từ nước ngoài, hãy ghi thông tin hộ chiếu. Cả biodata và resume đều được chấp nhận.',
      },
      {
        country: 'Philippines',
        flag: '🇵🇭',
        text: 'Personal Data Sheet (PDS) là mẫu chính thức cho khu vực công. Doanh nghiệp tư nhân chấp nhận cả biodata và resume. Việc ghi chiều cao, cân nặng và tình trạng hôn nhân là phổ biến.',
      },
    ],
  },
  templates: {
    title: 'Mẫu Sơ Yếu Lý Lịch Miễn Phí',
    subtitle:
      'Tải mẫu sơ yếu lý lịch chuyên nghiệp dạng Word và PDF. Dễ dàng tùy chỉnh với thông tin của bạn.',
    cards: [
      {
        title: 'Mẫu Sơ Yếu Lý Lịch Xin Việc',
        description: 'Mẫu chuyên nghiệp với đầy đủ các mục tiêu chuẩn cho đơn xin việc.',
        ctaLabel: 'Tạo Bằng AI',
        color: 'blue',
      },
      {
        title: 'Mẫu Sơ Yếu Lý Lịch Đơn Giản',
        description: 'Thiết kế gọn gàng, tối giản, phù hợp cho sinh viên mới ra trường và ứng viên chưa có nhiều kinh nghiệm.',
        ctaLabel: 'Bắt Đầu Tạo',
        color: 'orange',
      },
    ],
  },
  tips: {
    title: 'Mẹo Viết Sơ Yếu Lý Lịch Hiệu Quả',
    items: [
      { title: 'Dùng ảnh thẻ chuyên nghiệp', description: 'Ảnh kiểu hộ chiếu, trang phục lịch sự, nền trơn. Không dùng ảnh selfie hay ảnh đời thường.' },
      { title: 'Viết ngắn gọn', description: 'Tối đa 1–2 trang. Nhà tuyển dụng không đọc tài liệu quá dài.' },
      { title: 'Giữ định dạng nhất quán', description: 'Cùng phông chữ, tiêu đề rõ ràng, căn lề đồng nhất trong toàn bộ tài liệu.' },
      { title: 'Thêm lời cam đoan', description: '"Tôi xin cam đoan những thông tin kê khai trên đây là đúng sự thật và hoàn toàn chịu trách nhiệm."' },
      { title: 'Ghi học vấn theo thứ tự mới nhất', description: 'Bằng cấp cao nhất ghi trước. Ghi điểm GPA hoặc xếp loại nếu tốt.' },
      { title: 'Kiểm tra kỹ chính tả', description: 'Lỗi chính tả và ngữ pháp gây ấn tượng xấu ngay lập tức với nhà tuyển dụng.' },
      { title: 'Chỉ ghi thông tin liên quan', description: 'Không kê khai thông tin không được yêu cầu hoặc không liên quan đến vị trí ứng tuyển.' },
      { title: 'Ký tên và ghi ngày', description: 'Ký tên, ghi ngày tháng và nơi lập tại cuối tài liệu. Tại Việt Nam, SYLL cần có xác nhận của chính quyền địa phương.' },
    ],
  },
  faq: {
    title: 'Câu Hỏi Thường Gặp',
    items: [
      {
        question: 'Sơ yếu lý lịch (biodata) khác CV như thế nào?',
        answer:
          'CV (curriculum vitae) tập trung vào kinh nghiệm làm việc, kỹ năng và thành tích nghề nghiệp, được tùy chỉnh cho từng vị trí ứng tuyển. Sơ yếu lý lịch (biodata) bao gồm thêm thông tin cá nhân như ngày sinh, tình trạng hôn nhân, tôn giáo và thông tin gia đình. Tại Việt Nam, "sơ yếu lý lịch" (SYLL) là biểu mẫu hành chính riêng, bắt buộc cho khu vực nhà nước. Doanh nghiệp tư nhân thường sử dụng CV hiện đại. Ở Nam Á và Trung Đông, biodata là định dạng được ưa chuộng.',
      },
      {
        question: 'Sơ yếu lý lịch có dùng để xin việc không?',
        answer:
          'Có, sơ yếu lý lịch được sử dụng rộng rãi để xin việc tại Ấn Độ, Pakistan, Bangladesh, Philippines và các nước Trung Đông. Tại Việt Nam, SYLL là tài liệu bắt buộc khi thi tuyển công chức, viên chức và xin việc vào cơ quan nhà nước. Trong khu vực công và doanh nghiệp truyền thống, mẫu biodata/SYLL thường được yêu cầu cụ thể thay vì CV.',
      },
      {
        question: 'Cần ghi những thông tin cá nhân gì trong sơ yếu lý lịch?',
        answer:
          'Sơ yếu lý lịch xin việc thường bao gồm họ tên đầy đủ, ngày sinh, giới tính, quốc tịch, tình trạng hôn nhân, ngoại ngữ và địa chỉ (thường trú và tạm trú). Tại Việt Nam, SYLL còn yêu cầu kê khai dân tộc, thành phần gia đình và quá trình hoạt động. Biodata hôn nhân có thể bổ sung chiều cao, cân nặng, tôn giáo, đẳng cấp, thông tin gia đình và chi tiết tử vi.',
      },
      {
        question: 'Sơ yếu lý lịch nên dài bao nhiêu?',
        answer:
          'Lý tưởng là 1–2 trang. Sơ yếu lý lịch xin việc thường 1 trang, trong khi biodata hôn nhân có thể dài đến 2 trang do có thêm thông tin gia đình và tiêu chí cá nhân. Tại Việt Nam, mẫu SYLL nhà nước có số trang cố định theo biểu mẫu quy định. Hãy viết ngắn gọn nhưng đầy đủ thông tin thiết yếu.',
      },
      {
        question: 'Có thể tạo sơ yếu lý lịch bằng công cụ viết CV không?',
        answer:
          'Có, công cụ tạo CV bằng AI của chúng tôi có thể được sử dụng để tạo sơ yếu lý lịch (biodata). Bắt đầu với một mẫu tiêu chuẩn và thêm các mục thông tin cá nhân đặc trưng của biodata. Tính năng tùy chỉnh cho phép bạn điều chỉnh tài liệu theo đúng định dạng yêu cầu ở khu vực của bạn.',
      },
      {
        question: 'Biodata hôn nhân (sơ yếu lý lịch kết hôn) là gì?',
        answer:
          'Biodata hôn nhân là tài liệu được sử dụng trong truyền thống hôn nhân sắp đặt tại Ấn Độ, Pakistan và các nước Nam Á khác. Tài liệu chứa thông tin cá nhân chi tiết, hoàn cảnh gia đình, trình độ học vấn, nghề nghiệp, chi tiết tử vi và tiêu chí mong muốn ở bạn đời, giúp hai bên gia đình đánh giá sự tương thích.',
      },
    ],
  },
  crossLinks: {
    title: 'Tài Nguyên Liên Quan',
    items: [
      { href: '/vi/resume-format', title: 'Hướng Dẫn Định Dạng CV', subtitle: 'Định dạng theo thời gian, chức năng và kết hợp' },
      { href: '/vi/templates', title: 'Mẫu CV Chuyên Nghiệp', subtitle: 'Hơn 20 mẫu chuyên nghiệp' },
      { href: '/vi/resume-examples', title: 'Ví Dụ CV Theo Ngành', subtitle: 'Hơn 300 ví dụ theo nghề nghiệp' },
    ],
  },
  externalResources: {
    title: 'Tài Nguyên Bên Ngoài',
    items: [
      { href: 'https://www.bls.gov/ooh/', label: 'Bureau of Labor Statistics: Triển Vọng Nghề Nghiệp' },
      { href: 'https://www.glassdoor.com/blog/guide/resume-tips/', label: 'Glassdoor: Hướng Dẫn CV & Sự Nghiệp' },
    ],
  },
  bottomCta: {
    title: 'Tạo Sơ Yếu Lý Lịch Chỉ Trong Vài Phút',
    description:
      'Công cụ tạo sơ yếu lý lịch bằng AI giúp bạn tạo biodata chuyên nghiệp với cấu trúc chuẩn. Chọn mẫu phù hợp và xuất ra PDF hoặc Word.',
    ctaLabel: 'Tạo Sơ Yếu Lý Lịch Miễn Phí',
  },
};

// ---------------------------------------------------------------------------
// Thai
// ---------------------------------------------------------------------------
const th: BiodataFormatPageContent = {
  meta: {
    title: 'รูปแบบ Biodata 2026: เทมเพลตฟรี ตัวอย่าง วิธีเขียน | Best AI Resume',
    description:
      'คู่มือรูปแบบ Biodata ฉบับสมบูรณ์ ความแตกต่างจากเรซูเม่ ดาวน์โหลดเทมเพลตฟรี (PDF/Word) พร้อมตัวอย่างสำหรับอินเดีย ตะวันออกกลาง และไทย',
    keywords:
      'ไบโอดาต้า, biodata, รูปแบบ biodata, เรซูเม่ AI, เทมเพลตเรซูเม่, สร้างเรซูเม่, biodata กับเรซูเม่, ไบโอดาต้าสมัครงาน',
  },
  schemas: {
    breadcrumbName: 'คู่มือรูปแบบ Biodata',
    articleHeadline: 'รูปแบบ Biodata 2026: เทมเพลต ตัวอย่าง วิธีเขียน',
    articleDescription:
      'คู่มือ Biodata ฉบับสมบูรณ์สำหรับสมัครงานและแต่งงาน ความแตกต่างจากเรซูเม่ ดาวน์โหลดเทมเพลตฟรี ตัวอย่างแยกตามภูมิภาค',
  },
  hero: {
    badge: 'คู่มือฉบับสมบูรณ์ 2026',
    title: 'คู่มือรูปแบบ Biodata',
    titleHighlight: '(เทมเพลตฟรี)',
    subtitle:
      '<strong>Biodata (ไบโอดาต้า)</strong> คือเอกสารมาตรฐานที่ใช้สมัครงานในอินเดีย ปากีสถาน บังกลาเทศ และตะวันออกกลาง ในประเทศไทย บางหน่วยงานราชการและบริษัทไทยดั้งเดิมอาจขอ <strong>ประวัติส่วนตัว</strong> ในรูปแบบที่คล้ายกัน เรียนรู้รูปแบบที่ถูกต้องแล้วดาวน์โหลดเทมเพลตได้เลย',
    ctaTemplates: 'ดาวน์โหลดเทมเพลต',
    ctaBuild: 'สร้าง Biodata ด้วย AI',
  },
  whatIs: {
    title: 'Biodata (ไบโอดาต้า) คืออะไร?',
    paragraphs: [
      '<strong>Biodata</strong> (<em>biographical data</em> = ข้อมูลชีวประวัติ) คือเอกสารที่รวบรวมข้อมูลส่วนตัวและประวัติการทำงานของบุคคล ต่างจาก<strong>เรซูเม่</strong>ทั่วไปที่เน้นประสบการณ์และทักษะ Biodata จะมี<strong>ข้อมูลส่วนตัว</strong>เพิ่มเติม เช่น วันเกิด สถานภาพ สัญชาติ ศาสนา และในบางกรณีรวมถึงข้อมูลครอบครัว',
      'รูปแบบ Biodata ใช้กันอย่างแพร่หลายใน<strong>เอเชียใต้</strong> (อินเดีย ปากีสถาน บังกลาเทศ ศรีลังกา) <strong>ตะวันออกกลาง</strong> (UAE ซาอุดีอาระเบีย กาตาร์) และ<strong>เอเชียตะวันออกเฉียงใต้</strong>บางส่วน (ฟิลิปปินส์ มาเลเซีย) ในประเทศไทย แม้เรซูเม่จะเป็นมาตรฐาน แต่หน่วยงานราชการบางแห่งและบริษัทไทยดั้งเดิมอาจขอเอกสารในรูปแบบคล้าย Biodata ที่มีข้อมูลส่วนตัวมากกว่า',
    ],
    insightTitle: 'จุดสำคัญ:',
    insightText:
      'หากสมัครงานในอินเดีย ปากีสถาน หรือประเทศอ่าวเปอร์เซีย การเข้าใจรูปแบบ Biodata เป็นสิ่งจำเป็น หลายบริษัทจะปฏิเสธใบสมัครที่ไม่ได้ทำตามรูปแบบที่คาดหวัง สำหรับงานราชการไทยบางตำแหน่ง เอกสาร \"ประวัติส่วนตัว\" ก็มีโครงสร้างคล้ายกัน',
  },
  vsComparison: {
    title: 'Biodata vs เรซูเม่ vs CV: ต่างกันอย่างไร?',
    subtitle: 'การเข้าใจว่าควรใช้เอกสารแบบไหนเมื่อไหร่คือกุญแจสู่ความสำเร็จในการหางาน',
    headers: { aspect: 'หัวข้อ', biodata: 'Biodata', resume: 'เรซูเม่', cv: 'CV' },
    rows: [
      { aspect: 'ความยาว', biodata: '1-2 หน้า', resume: '1-2 หน้า', cv: '2 หน้าขึ้นไป' },
      {
        aspect: 'ข้อมูลส่วนตัว',
        biodata: 'ละเอียด (วันเกิด สถานภาพ ศาสนา ครอบครัว)',
        resume: 'น้อยที่สุด (ชื่อและข้อมูลติดต่อ)',
        cv: 'น้อยที่สุด (ชื่อและข้อมูลติดต่อ)',
        biodataHighlight: 'green',
      },
      { aspect: 'จุดเน้น', biodata: 'ภูมิหลังส่วนตัว + ประสบการณ์', resume: 'ทักษะ + ผลงาน', cv: 'วิชาการ + งานวิจัย' },
      {
        aspect: 'ภูมิภาคที่ใช้',
        biodata: 'อินเดีย ปากีสถาน ตะวันออกกลาง ฟิลิปปินส์',
        resume: 'สหรัฐฯ แคนาดา ออสเตรเลีย ไทย',
        cv: 'ยุโรป อังกฤษ สายวิชาการ',
      },
      {
        aspect: 'เหมาะสำหรับ',
        biodata: 'ราชการ บริษัทดั้งเดิม งานแต่งงาน',
        resume: 'บริษัทเอกชน สตาร์ทอัพ ไอที',
        cv: 'สายวิชาการ วิจัย แพทย์',
      },
      {
        aspect: 'การปรับแต่ง',
        biodata: 'ใช้เนื้อหาเดิมส่งหลายที่',
        resume: 'ปรับแต่งตามตำแหน่งที่สมัคร',
        cv: 'อัปเดตเมื่อมีผลงานเพิ่ม',
      },
    ],
  },
  structure: {
    title: 'โครงสร้างมาตรฐานของ Biodata',
    description: 'ไม่มีรูปแบบ Biodata ที่ "เป็นทางการ" แต่ส่วนต่าง ๆ ที่ผู้สรรหาส่วนใหญ่คาดหวังมีดังนี้:',
    sections: [
      { number: 1, label: 'ข้อมูลส่วนตัว', detail: 'ชื่อ-นามสกุล รูปถ่าย วันเกิด เพศ สถานภาพ สัญชาติ', colorGroup: 'orange' },
      { number: 2, label: 'ข้อมูลติดต่อ', detail: 'ที่อยู่ (ภูมิลำเนา/ที่อยู่ปัจจุบัน) เบอร์โทร อีเมล', colorGroup: 'default' },
      { number: 3, label: 'วัตถุประสงค์', detail: 'เป้าหมายอาชีพ 2-3 ประโยค', colorGroup: 'default' },
      { number: 4, label: 'การศึกษา', detail: 'วุฒิ สถาบัน ปีที่จบ เกรด/GPA', colorGroup: 'blue' },
      { number: 5, label: 'ประสบการณ์ทำงาน', detail: 'ชื่อบริษัท ตำแหน่ง ระยะเวลา หน้าที่', colorGroup: 'blue' },
      { number: 6, label: 'ทักษะ/ความสามารถ', detail: 'ทักษะเฉพาะทาง ภาษา ซอฟต์แวร์', colorGroup: 'default' },
      { number: 7, label: 'ข้อมูลเพิ่มเติม', detail: 'งานอดิเรก ความถนัดพิเศษ รางวัล ผู้อ้างอิง', colorGroup: 'default' },
      { number: 8, label: 'คำรับรอง', detail: '"ข้าพเจ้าขอรับรองว่าข้อมูลข้างต้นเป็นความจริงทุกประการ..."', colorGroup: 'dark' },
    ],
    proTipTitle: 'เคล็ดลับ:',
    proTipText:
      'ติดรูปถ่ายขนาดพาสปอร์ตที่มุมขวาบนของ Biodata เสมอ ในเอเชียใต้และตะวันออกกลางถือเป็นสิ่งจำเป็น ในเรซูเม่ไทยก็นิยมติดรูปถ่ายเช่นกัน แต่ในเรซูเม่แบบตะวันตกไม่แนะนำ',
  },
  personalInfo: {
    title: 'ข้อมูลส่วนตัวที่ต้องระบุใน Biodata',
    description: 'ส่วนข้อมูลส่วนตัวคือสิ่งที่ทำให้ Biodata แตกต่างจากเรซูเม่ทั่วไป ข้อมูลที่คาดหวังมีดังนี้:',
    alwaysInclude: {
      title: 'ต้องระบุเสมอ',
      items: [
        'ชื่อ-นามสกุล (ตามเอกสารราชการ)',
        'วันเดือนปีเกิด',
        'เพศ',
        'สัญชาติ',
        'สถานภาพสมรส',
        'ภาษาที่ใช้ได้',
        'ที่อยู่ภูมิลำเนา',
        'ที่อยู่ปัจจุบัน',
        'เบอร์โทรศัพท์',
        'อีเมล',
      ],
    },
    optional: {
      title: 'ข้อมูลเพิ่มเติม (ตามสถานการณ์)',
      items: [
        'ชื่อและอาชีพบิดา',
        'ชื่อมารดา',
        'ศาสนา (ถ้าผู้จ้างงานต้องการ)',
        'วรรณะ/ชุมชน (สำหรับราชการอินเดีย)',
        'กรุ๊ปเลือด',
        'ส่วนสูง/น้ำหนัก',
        'หมายเลขหนังสือเดินทาง (สำหรับงานต่างประเทศ)',
        'สถานะวีซ่า',
      ],
    },
    noteTitle: 'หมายเหตุสำคัญ:',
    noteText:
      'แม้ Biodata จะมีข้อมูลเช่นศาสนาและวรรณะตามธรรมเนียม แต่บริษัทเอกชนสมัยใหม่จำนวนมากในอินเดียไม่ต้องการข้อมูลเหล่านี้แล้ว ระบุเฉพาะข้อมูลที่ประกาศรับสมัครงานระบุไว้เท่านั้น สำหรับตลาดงานไทย ใช้รูปแบบเรซูเม่มาตรฐานไทยเว้นแต่ได้รับการขอให้ส่ง Biodata โดยเฉพาะ',
  },
  types: {
    title: 'ประเภทของ Biodata',
    jobBiodata: {
      title: '1. Biodata สมัครงาน (Professional Biodata)',
      description:
        'ใช้สำหรับสมัครงาน พบได้ทั่วไปในราชการเอเชียใต้ รัฐวิสาหกิจ และบริษัทดั้งเดิม',
      focusTitle: 'เนื้อหาหลัก:',
      focusItems: [
        'การศึกษาพร้อมผลการเรียน',
        'ประสบการณ์ทำงานพร้อมรายละเอียดหน้าที่',
        'ทักษะเฉพาะทางและทักษะด้านบุคลิกภาพ',
        'ใบรับรองและการฝึกอบรม',
      ],
      commonTitle: 'ใช้ในกรณี:',
      commonItems: [
        'สอบ UPSC/SSC/ธนาคาร (อินเดีย)',
        'สอบ PPSC/FPSC (ปากีสถาน)',
        'สมัครงานในประเทศอ่าวเปอร์เซีย',
        'สมัครตำแหน่งอาจารย์',
      ],
    },
    marriageBiodata: {
      title: '2. Biodata แต่งงาน (Marriage Biodata)',
      description:
        'ใช้ในประเพณีคลุมถุงชนในอินเดีย ปากีสถาน บังกลาเทศ และชุมชนต่างแดน เอกสารนี้มีข้อมูลส่วนตัวและข้อมูลครอบครัวอย่างละเอียด',
      sectionsTitle: 'ส่วนเพิ่มเติม:',
      sectionsItems: [
        'ภูมิหลังครอบครัว (พ่อแม่ พี่น้อง)',
        'ข้อมูลโหราศาสตร์/ดวงชะตา',
        'ลักษณะทางกายภาพ',
        'คุณสมบัติคู่ครองที่ต้องการ',
      ],
      designTitle: 'องค์ประกอบการออกแบบ:',
      designItems: [
        'กรอบตกแต่ง',
        'รูปถ่ายมืออาชีพ',
        'สัญลักษณ์ทางศาสนา (ตามต้องการ)',
        'ปกติ 2-3 หน้า',
      ],
    },
  },
  regions: {
    title: 'รูปแบบ Biodata ตามภูมิภาค',
    description: 'แต่ละประเทศมีสิ่งที่คาดหวังต่างกัน นี่คือสิ่งที่ผู้สรรหาในแต่ละภูมิภาคมองหา:',
    items: [
      {
        country: 'อินเดีย',
        flag: '\ud83c\uddee\ud83c\uddf3',
        text: 'Biodata เป็นมาตรฐานสำหรับราชการ (UPSC, SSC, State PSC) ธนาคาร และรัฐวิสาหกิจ บริษัทเอกชนข้ามชาตินิยมเรซูเม่ ต้องระบุชื่อบิดา วรรณะ (สำหรับระบบโควตา) คำรับรอง และรูปถ่าย',
      },
      {
        country: 'ปากีสถาน',
        flag: '\ud83c\uddf5\ud83c\uddf0',
        text: 'คล้ายกับอินเดีย มักต้องระบุหมายเลข CNIC (บัตรประชาชน) ชื่อบิดาและที่อยู่เป็นข้อมูลพื้นฐาน ตำแหน่งราชการและกึ่งราชการต้องการ Biodata ละเอียด',
      },
      {
        country: 'UAE และอ่าวเปอร์เซีย',
        flag: '\ud83c\udde6\ud83c\uddea',
        text: 'คาดหวัง Biodata ที่มีรูปถ่าย สัญชาติ สถานะวีซ่า และวันที่พร้อมเริ่มงาน อาจถูกขอให้ระบุศาสนา สำหรับผู้สมัครจากต่างประเทศ ให้ระบุข้อมูลหนังสือเดินทาง ยอมรับทั้ง Biodata และเรซูเม่',
      },
      {
        country: 'ฟิลิปปินส์',
        flag: '\ud83c\uddf5\ud83c\udded',
        text: 'Personal Data Sheet (PDS) เป็นรูปแบบทางการสำหรับราชการ บริษัทเอกชนยอมรับทั้ง Biodata และเรซูเม่ การระบุส่วนสูง น้ำหนัก และสถานภาพสมรสเป็นเรื่องปกติ',
      },
    ],
  },
  templates: {
    title: 'เทมเพลต Biodata ฟรี',
    subtitle:
      'ดาวน์โหลดเทมเพลต Biodata รูปแบบ Word/PDF ที่ออกแบบอย่างมืออาชีพ ปรับแต่งด้วยข้อมูลของคุณได้ง่าย',
    cards: [
      {
        title: 'เทมเพลต Biodata สมัครงาน',
        description: 'เทมเพลตมืออาชีพสำหรับสมัครงาน มีส่วนมาตรฐานครบถ้วน',
        ctaLabel: 'สร้างด้วยเครื่องมือ AI',
        color: 'blue',
      },
      {
        title: 'เทมเพลต Biodata แบบเรียบง่าย',
        description: 'ดีไซน์เรียบง่ายสำหรับจบใหม่หรือผู้มีประสบการณ์น้อย',
        ctaLabel: 'เริ่มสร้าง',
        color: 'orange',
      },
    ],
  },
  tips: {
    title: 'เคล็ดลับสร้าง Biodata ที่มีประสิทธิภาพ',
    items: [
      { title: 'ใช้รูปถ่ายมืออาชีพ', description: 'ขนาดพาสปอร์ต ใส่ชุดสุภาพ พื้นหลังเรียบ ห้ามใช้เซลฟี่หรือรูปลำลอง' },
      { title: 'เขียนให้กระชับ', description: 'ไม่เกิน 1-2 หน้า ผู้สรรหาไม่อ่านเอกสารยาว' },
      { title: 'รักษารูปแบบให้สม่ำเสมอ', description: 'ใช้ฟอนต์เดียวกันตลอด หัวข้อชัดเจน จัดเรียงเป็นระเบียบ' },
      { title: 'ใส่คำรับรอง', description: '"ข้าพเจ้าขอรับรองว่าข้อมูลข้างต้นเป็นความจริงตามที่ข้าพเจ้าทราบ"' },
      { title: 'เรียงการศึกษาจากล่าสุด', description: 'วุฒิล่าสุดอยู่บนสุด ถ้าเกรด/GPA ดีให้ระบุด้วย' },
      { title: 'ตรวจคำผิดให้ละเอียด', description: 'คำสะกดผิดหรือพิมพ์ผิดสร้างความประทับใจเชิงลบทันที' },
      { title: 'ระบุเฉพาะข้อมูลที่เกี่ยวข้อง', description: 'ไม่ต้องใส่ข้อมูลที่ไม่ถูกร้องขอหรือไม่เกี่ยวกับตำแหน่งงาน' },
      { title: 'ลงชื่อและวันที่', description: 'ลงลายมือชื่อ วันที่ปัจจุบัน และสถานที่ที่ด้านล่างเอกสาร' },
    ],
  },
  faq: {
    title: 'คำถามที่พบบ่อย',
    items: [
      {
        question: 'Biodata กับเรซูเม่ต่างกันอย่างไร?',
        answer:
          'เรซูเม่เน้นประสบการณ์ ทักษะ และผลงาน ปรับแต่งตามตำแหน่งที่สมัคร ส่วน Biodata มีข้อมูลส่วนตัวเพิ่มเติม เช่น วันเกิด สถานภาพ ศาสนา ข้อมูลครอบครัว ในไทยและตะวันตกใช้เรซูเม่เป็นมาตรฐาน แต่ในเอเชียใต้ ตะวันออกกลาง และเอเชียตะวันออกเฉียงใต้บางส่วนจะนิยม Biodata มากกว่า',
      },
      {
        question: 'Biodata ใช้สมัครงานได้จริงหรือ?',
        answer:
          'ได้ Biodata ใช้สมัครงานกันทั่วไปในอินเดีย ปากีสถาน บังกลาเทศ ฟิลิปปินส์ และตะวันออกกลาง ราชการ หน่วยงานรัฐ และบริษัทดั้งเดิมมักขอ Biodata แทนเรซูเม่โดยเฉพาะ',
      },
      {
        question: 'ต้องใส่ข้อมูลส่วนตัวอะไรบ้างใน Biodata?',
        answer:
          'Biodata สมัครงานมักระบุชื่อ-นามสกุล วันเกิด เพศ สัญชาติ สถานภาพ ภาษาที่ใช้ได้ ที่อยู่ภูมิลำเนา/ปัจจุบัน ส่วน Biodata แต่งงานอาจเพิ่มส่วนสูง น้ำหนัก ศาสนา วรรณะ ข้อมูลครอบครัว และโหราศาสตร์',
      },
      {
        question: 'Biodata ควรยาวกี่หน้า?',
        answer:
          'ควรอยู่ที่ 1-2 หน้า Biodata สมัครงานปกติ 1 หน้า ส่วน Biodata แต่งงานอาจถึง 2 หน้าเพราะมีข้อมูลครอบครัวและความต้องการส่วนตัว เขียนให้กระชับแต่ครบถ้วน',
      },
      {
        question: 'ใช้เครื่องมือสร้างเรซูเม่ทำ Biodata ได้ไหม?',
        answer:
          'ได้ เครื่องมือสร้างเรซูเม่ AI ของเราสามารถใช้ทำ Biodata ได้ เลือกเทมเพลตมาตรฐานแล้วเพิ่มส่วนข้อมูลส่วนตัวตามที่ Biodata ต้องการ ปรับแต่งส่วนต่าง ๆ ให้ตรงกับรูปแบบ Biodata ที่คาดหวังในภูมิภาคของคุณ',
      },
      {
        question: 'Biodata แต่งงาน (Marriage Biodata) คืออะไร?',
        answer:
          'Marriage Biodata คือเอกสารที่ใช้ในประเพณีคลุมถุงชนในอินเดีย ปากีสถาน และประเทศอื่น ๆ มีข้อมูลส่วนตัวละเอียด ภูมิหลังครอบครัว การศึกษา อาชีพ โหราศาสตร์ และคุณสมบัติคู่ครองที่ต้องการ เพื่อให้ครอบครัวประเมินความเหมาะสม',
      },
    ],
  },
  crossLinks: {
    title: 'แหล่งข้อมูลที่เกี่ยวข้อง',
    items: [
      { href: '/resume-format', title: 'คู่มือรูปแบบเรซูเม่', subtitle: 'ลำดับเวลาย้อนกลับ / เชิงทักษะ / ผสมผสาน' },
      { href: '/templates', title: 'เทมเพลตเรซูเม่', subtitle: 'เทมเพลตมืออาชีพมากกว่า 20 แบบ' },
      { href: '/resume-examples', title: 'ตัวอย่างเรซูเม่', subtitle: 'ตัวอย่างเรซูเม่กว่า 300 อาชีพ' },
    ],
  },
  externalResources: {
    title: 'แหล่งข้อมูลภายนอก',
    items: [
      { href: 'https://www.bls.gov/ooh/', label: 'สำนักสถิติแรงงานสหรัฐฯ: ภาพรวมอาชีพ' },
      { href: 'https://www.glassdoor.com/blog/guide/resume-tips/', label: 'Glassdoor: คู่มือเรซูเม่และอาชีพ' },
    ],
  },
  bottomCta: {
    title: 'สร้าง Biodata ได้ในไม่กี่นาที',
    description:
      'เครื่องมือสร้างเรซูเม่ AI ช่วยให้คุณสร้าง Biodata มืออาชีพที่มีโครงสร้างถูกต้อง เลือกเทมเพลตที่เหมาะสมแล้วส่งออกเป็น PDF หรือ Word',
    ctaLabel: 'สร้าง Biodata ฟรี',
  },
};

// ---------------------------------------------------------------------------
// Portuguese
// ---------------------------------------------------------------------------
const pt: BiodataFormatPageContent = {
  meta: {
    title: 'Formato Biodata 2026: Modelos Gratis, Exemplos e Guia de Preenchimento | Best AI Resume',
    description:
      'Descubra o formato biodata para candidaturas de emprego. Compare biodata vs curriculo, baixe modelos gratis (PDF e Word) e confira exemplos para India, Paquistao e outros paises.',
    keywords:
      'formato biodata, biodata, biodata para emprego, biodata vs curriculo, biodata matrimonial, modelo biodata, formato dados pessoais, curriculo formato',
  },
  schemas: {
    breadcrumbName: 'Guia de Formato Biodata',
    articleHeadline: 'Guia de Formato Biodata 2026: Modelos, Exemplos e Como Preencher',
    articleDescription:
      'Guia completo do formato biodata para candidaturas de emprego e casamento. Descubra a diferenca entre biodata e curriculo, baixe modelos gratis e confira os exemplos.',
  },
  hero: {
    badge: 'Guia Completo 2026',
    title: 'Guia de Formato Biodata',
    titleHighlight: '(Modelos Gratis)',
    subtitle:
      'O <strong>formato biodata</strong> e o documento padrao para candidaturas de emprego na India, Paquistao, Bangladesh e Oriente Medio. Descubra quando usar o biodata em vez do curriculo e baixe modelos gratis adequados as expectativas regionais.',
    ctaTemplates: 'Baixar Modelos',
    ctaBuild: 'Criar Biodata com IA',
  },
  whatIs: {
    title: 'O que e Biodata?',
    paragraphs: [
      'O <strong>biodata</strong> (abreviacao de <em>biographical data</em>, ou dados biograficos) e um documento que resume as informacoes pessoais e profissionais de um individuo. Ao contrario do <strong>curriculo</strong> brasileiro, que se concentra em experiencias de trabalho e competencias, o biodata inclui <strong>dados pessoais</strong> como data de nascimento, estado civil, nacionalidade, religiao e, as vezes, informacoes sobre a familia.',
      'O formato biodata e amplamente utilizado na <strong>Asia Meridional</strong> (India, Paquistao, Bangladesh, Sri Lanka), no <strong>Oriente Medio</strong> (EAU, Arabia Saudita, Catar) e em partes do <strong>Sudeste Asiatico</strong> (Filipinas, Malasia). Nessas regioes, orgaos publicos, instituicoes governamentais e empresas tradicionais frequentemente exigem o formato biodata em vez do curriculo europeu ou americano.',
    ],
    insightTitle: 'Nota importante:',
    insightText:
      'Se voce esta se candidatando a posicoes na India, Paquistao ou nos paises do Golfo, conhecer o formato biodata e fundamental. Candidaturas que nao respeitam o formato exigido sao frequentemente descartadas. No Brasil, o curriculo e o documento padrao do mercado de trabalho, mas quem atua em contextos internacionais deve conhecer ambos os formatos.',
  },
  vsComparison: {
    title: 'Biodata vs Curriculo vs CV Academico: Quais as Diferencas?',
    subtitle: 'Entender qual documento usar em cada contexto e essencial para se candidatar com sucesso.',
    headers: { aspect: 'Aspecto', biodata: 'Biodata', resume: 'Curriculo', cv: 'CV Academico' },
    rows: [
      { aspect: 'Extensao', biodata: '1–2 paginas', resume: '1–2 paginas', cv: '2+ paginas' },
      {
        aspect: 'Dados pessoais',
        biodata: 'Detalhados (data de nascimento, estado civil, religiao, familia)',
        resume: 'Minimos (nome e contatos)',
        cv: 'Minimos (nome e contatos)',
        biodataHighlight: 'green',
      },
      { aspect: 'Foco', biodata: 'Historico pessoal + experiencia', resume: 'Competencias + resultados', cv: 'Carreira academica + pesquisa' },
      {
        aspect: 'Onde se usa',
        biodata: 'India, Paquistao, Oriente Medio, Filipinas',
        resume: 'Brasil, America Latina, EUA, Canada, Australia',
        cv: 'Mundo academico, Reino Unido, Curriculo Lattes (Brasil academico)',
      },
      {
        aspect: 'Contexto tipico',
        biodata: 'Setor publico, empresas tradicionais, casamento',
        resume: 'Empresas privadas, startups, setor de TI',
        cv: 'Posicoes academicas, pesquisa, saude',
      },
      {
        aspect: 'Personalizacao',
        biodata: 'Conteudo identico para multiplas candidaturas',
        resume: 'Personalizado para cada vaga',
        cv: 'Atualizado com novas publicacoes e conquistas',
      },
    ],
  },
  structure: {
    title: 'Estrutura Padrao do Biodata',
    description: 'Nao existe um formato oficial unico, mas a maioria dos recrutadores espera estas secoes:',
    sections: [
      { number: 1, label: 'Dados pessoais', detail: 'Nome completo, foto, data de nascimento, sexo, estado civil, nacionalidade', colorGroup: 'orange' },
      { number: 2, label: 'Contatos', detail: 'Endereco (permanente e atual), telefone, e-mail', colorGroup: 'default' },
      { number: 3, label: 'Objetivo profissional', detail: 'Descricao do objetivo de carreira em 2–3 frases', colorGroup: 'default' },
      { number: 4, label: 'Formacao academica', detail: 'Titulo, instituicao, ano de conclusao, nota/GPA', colorGroup: 'blue' },
      { number: 5, label: 'Experiencia profissional', detail: 'Empresa, cargo, periodo, principais responsabilidades', colorGroup: 'blue' },
      { number: 6, label: 'Competencias', detail: 'Habilidades tecnicas, idiomas, softwares', colorGroup: 'default' },
      { number: 7, label: 'Informacoes adicionais', detail: 'Hobbies, interesses, premios, referencias', colorGroup: 'default' },
      { number: 8, label: 'Declaracao', detail: '"Declaro que as informacoes acima sao verdadeiras e corretas..."', colorGroup: 'dark' },
    ],
    proTipTitle: 'Dica do especialista:',
    proTipText:
      'Inclua sempre uma foto 3x4 profissional no canto superior direito do biodata. E um requisito padrao na Asia Meridional e no Oriente Medio. No Brasil, a foto no curriculo e comum mas nao obrigatoria, enquanto nos curriculos norte-americanos e geralmente desaconselhada.',
  },
  personalInfo: {
    title: 'Dados Pessoais a Incluir no Biodata',
    description: 'A secao de dados pessoais e o elemento que mais diferencia o biodata do curriculo tradicional. Veja o que geralmente e solicitado:',
    alwaysInclude: {
      title: 'Incluir sempre',
      items: [
        'Nome completo (como nos documentos oficiais)',
        'Data de nascimento',
        'Sexo',
        'Nacionalidade',
        'Estado civil',
        'Idiomas conhecidos',
        'Endereco de residencia permanente',
        'Endereco atual',
        'Numero de telefone',
        'Endereco de e-mail',
      ],
    },
    optional: {
      title: 'Opcional (de acordo com o contexto)',
      items: [
        'Nome e profissao do pai',
        'Nome da mae',
        'Religiao (se solicitado pelo empregador)',
        'Casta/comunidade (para empregos publicos na India)',
        'Tipo sanguineo',
        'Altura e peso',
        'Numero do passaporte (para trabalho no exterior)',
        'Status do visto',
      ],
    },
    noteTitle: 'Nota importante:',
    noteText:
      'Embora o biodata tradicional inclua informacoes como religiao e casta, muitas empresas privadas modernas na India nao as exigem mais. Inclua apenas as informacoes expressamente solicitadas no anuncio de emprego. No Brasil, o curriculo segue as diretrizes da LGPD (Lei 13.709/2018) e nao exige dados sensiveis como religiao ou estado civil, salvo se forem relevantes para a posicao.',
  },
  types: {
    title: 'Tipos de Biodata',
    jobBiodata: {
      title: '1. Biodata Profissional (para Emprego)',
      description:
        'Utilizado para candidaturas de emprego, particularmente difundido no setor publico da Asia Meridional, em empresas estatais e em empresas tradicionais.',
      focusTitle: 'Conteudo principal:',
      focusItems: [
        'Percurso academico com resultados',
        'Experiencia profissional com descricao das atividades',
        'Competencias profissionais e interpessoais',
        'Certificacoes e formacao profissional',
      ],
      commonTitle: 'Contextos de uso mais comuns:',
      commonItems: [
        'Concursos UPSC, SSC e bancarios (India)',
        'Selecoes PPSC e FPSC (Paquistao)',
        'Busca de emprego nos paises do Golfo',
        'Candidaturas para cargos de ensino',
      ],
    },
    marriageBiodata: {
      title: '2. Biodata Matrimonial',
      description:
        'Utilizado na tradicao de casamentos arranjados na India, Paquistao, Bangladesh e nas comunidades da diaspora. Contem informacoes pessoais e familiares detalhadas.',
      sectionsTitle: 'Secoes adicionais:',
      sectionsItems: [
        'Historico familiar (pais, irmaos)',
        'Detalhes do horoscopo / Kundali',
        'Caracteristicas fisicas',
        'Preferencias para o parceiro',
      ],
      designTitle: 'Elementos de design:',
      designItems: [
        'Bordas decorativas',
        'Fotografia profissional',
        'Simbolos religiosos (opcional)',
        'Geralmente 2–3 paginas',
      ],
    },
  },
  regions: {
    title: 'Formato Biodata por Regiao',
    description: 'As expectativas variam de pais para pais. Veja o que os recrutadores esperam nas diferentes areas geograficas:',
    items: [
      {
        country: 'India',
        flag: '\ud83c\uddee\ud83c\uddf3',
        text: 'O biodata e o padrao para a administracao publica (UPSC, SSC, PSC estaduais), bancos e empresas estatais. Empresas privadas multinacionais preferem o curriculo. Sao exigidos: nome do pai, categoria de casta (para cotas), declaracao e foto 3x4.',
      },
      {
        country: 'Paquistao',
        flag: '\ud83c\uddf5\ud83c\uddf0',
        text: 'Semelhante a India. Frequentemente e solicitado o numero CNIC (Cartao Nacional de Identidade). Nome do pai e endereco sao informacoes basicas. Para posicoes governamentais e semi-governamentais e necessario um biodata detalhado.',
      },
      {
        country: 'EAU e Paises do Golfo',
        flag: '\ud83c\udde6\ud83c\uddea',
        text: 'Espera-se um biodata com foto, nacionalidade, status do visto e data de disponibilidade. A religiao pode ser solicitada. Para candidaturas do exterior, incluir dados do passaporte. Tanto o biodata quanto o curriculo sao aceitos.',
      },
      {
        country: 'Filipinas',
        flag: '\ud83c\uddf5\ud83c\udded',
        text: 'O Personal Data Sheet (PDS) e o formato oficial para a administracao publica. Empresas privadas aceitam tanto o biodata quanto o curriculo. E comum indicar altura, peso e estado civil.',
      },
    ],
  },
  templates: {
    title: 'Modelos de Biodata Gratis',
    subtitle:
      'Baixe modelos de biodata profissionais em formato Word e PDF. Personalize-os facilmente com suas informacoes.',
    cards: [
      {
        title: 'Modelo Biodata Profissional',
        description: 'Modelo com todas as secoes padrao para candidaturas de emprego.',
        ctaLabel: 'Criar com IA',
        color: 'blue',
      },
      {
        title: 'Modelo Biodata Simples',
        description: 'Design limpo e minimalista, ideal para recém-formados e candidatos em inicio de carreira.',
        ctaLabel: 'Comecar a Criar',
        color: 'orange',
      },
    ],
  },
  tips: {
    title: 'Dicas para Escrever um Biodata Eficaz',
    items: [
      { title: 'Use uma foto profissional', description: 'Formato 3x4, traje formal, fundo neutro. Nada de selfies ou fotos informais.' },
      { title: 'Seja conciso', description: 'Maximo 1–2 paginas. Os recrutadores nao leem documentos muito longos.' },
      { title: 'Mantenha um formato coerente', description: 'Mesma fonte, titulos claros, alinhamento uniforme em todo o documento.' },
      { title: 'Adicione a declaracao', description: '"Declaro que as informacoes acima sao verdadeiras e corretas ao meu melhor conhecimento."' },
      { title: 'Liste a formacao em ordem cronologica inversa', description: 'Comece pelo titulo mais recente. Inclua a nota se for relevante.' },
      { title: 'Revise com atencao', description: 'Erros de ortografia e gramatica causam uma impressao negativa imediata.' },
      { title: 'Inclua apenas informacoes pertinentes', description: 'Nao insira dados que nao sejam solicitados ou relevantes para a posicao.' },
      { title: 'Assine e date', description: 'Coloque sua assinatura, data e local no rodape do documento.' },
    ],
  },
  faq: {
    title: 'Perguntas Frequentes',
    items: [
      {
        question: 'Qual e a diferenca entre biodata e curriculo?',
        answer:
          'O curriculo se concentra em experiencias de trabalho, competencias e resultados profissionais, e e personalizado para cada candidatura. O biodata tambem inclui dados pessoais como data de nascimento, estado civil, religiao e informacoes sobre a familia. No Brasil e na America Latina usa-se o curriculo, enquanto o biodata e o formato preferido na Asia Meridional, Oriente Medio e partes do Sudeste Asiatico.',
      },
      {
        question: 'O biodata e usado para buscar emprego?',
        answer:
          'Sim, o biodata e comumente utilizado para candidaturas de emprego na India, Paquistao, Bangladesh, Filipinas e nos paises do Oriente Medio. No setor publico e em empresas tradicionais, frequentemente e exigido o formato biodata em vez do curriculo.',
      },
      {
        question: 'Quais dados pessoais se incluem no biodata?',
        answer:
          'Um biodata profissional tipicamente inclui nome completo, data de nascimento, sexo, nacionalidade, estado civil, idiomas conhecidos e enderecos (permanente e atual). Um biodata matrimonial pode adicionar altura, peso, religiao, casta, informacoes sobre a familia e detalhes do horoscopo.',
      },
      {
        question: 'Qual deve ser o tamanho de um biodata?',
        answer:
          'Idealmente 1–2 paginas. Um biodata profissional geralmente ocupa uma pagina, enquanto o matrimonial pode chegar a duas paginas por causa das informacoes familiares e preferencias pessoais. Procure ser conciso sem omitir as informacoes essenciais.',
      },
      {
        question: 'Posso criar um biodata com uma ferramenta de curriculo?',
        answer:
          'Sim, nosso builder com IA pode ser usado para criar um biodata. Comece com um modelo padrao e adicione as secoes de dados pessoais tipicas do biodata. As funcoes de personalizacao permitem adaptar o documento ao formato exigido na sua area geografica.',
      },
      {
        question: 'O que e um biodata matrimonial?',
        answer:
          'O biodata matrimonial e um documento usado na tradicao de casamentos arranjados na India, Paquistao e outros paises da Asia Meridional. Contem informacoes pessoais detalhadas, historico familiar, percurso academico e profissional, detalhes do horoscopo e preferencias para o parceiro, para facilitar a compatibilidade entre as familias.',
      },
    ],
  },
  crossLinks: {
    title: 'Recursos Relacionados',
    items: [
      { href: '/pt/resume-format', title: 'Guia de Formato de Curriculo', subtitle: 'Formato cronologico, funcional e combinado' },
      { href: '/pt/templates', title: 'Modelos de Curriculo', subtitle: 'Mais de 20 modelos profissionais' },
      { href: '/pt/resume-examples', title: 'Exemplos de Curriculo', subtitle: 'Mais de 300 exemplos por profissao' },
    ],
  },
  externalResources: {
    title: 'Recursos Externos',
    items: [
      { href: 'https://www.ibge.gov.br/', label: 'IBGE: Mercado de Trabalho no Brasil' },
      { href: 'https://www.glassdoor.com.br/blog/', label: 'Glassdoor: Guia de Curriculo e Carreira' },
    ],
  },
  bottomCta: {
    title: 'Crie Seu Biodata em Poucos Minutos',
    description:
      'Nosso builder com inteligencia artificial ajuda a criar um biodata profissional com a estrutura correta. Escolha entre varios modelos e exporte em PDF ou Word.',
    ctaLabel: 'Criar Biodata Gratis',
  },
};

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// Turkish
// ---------------------------------------------------------------------------
const tr: BiodataFormatPageContent = {
  meta: {
    title: 'Biodata Nedir? İş Başvurusu Biyografi Formu Rehberi 2026 | Best AI Resume',
    description:
      'Biodata formatı nedir, özgeçmiş ve CV\'den farkı nedir? Güney Asya ve Orta Doğu iş başvurularında kullanılan biyografi formunu öğrenin. Ücretsiz şablonlar. 2026.',
    keywords:
      'biodata nedir, biodata formatı, biyografi formu, iş başvurusu biodata, biodata vs cv, biodata şablonu, biodata örneği, iş başvurusu belgesi',
  },
  schemas: {
    breadcrumbName: 'Biodata Format Rehberi',
    articleHeadline: 'Biodata Nedir? Format Rehberi, Şablonlar ve Örnekler 2026',
    articleDescription:
      'Biodata formatı hakkında kapsamlı rehber. Biyografi formu ile özgeçmiş ve CV arasındaki farkları öğrenin, ücretsiz şablonlar indirin.',
  },
  hero: {
    badge: '2026 için kapsamlı rehber',
    title: 'Biodata Format Rehberi',
    titleHighlight: '(Ücretsiz Şablonlar)',
    subtitle:
      '<strong>Biodata formatı</strong>, Hindistan, Pakistan, Bangladeş ve Orta Doğu\'daki iş başvurularında kullanılan standart belgedir. Biodata ile CV veya özgeçmiş arasındaki farkı öğrenin ve bölgesel beklentilere uygun ücretsiz şablonları indirin.',
    ctaTemplates: 'Şablonları İndir',
    ctaBuild: 'AI ile Biodata Oluştur',
  },
  whatIs: {
    title: 'Biodata Nedir?',
    paragraphs: [
      '<strong>Biodata</strong> (biyografik veri kısaltması), kişisel ve mesleki geçmişinizin kapsamlı bir özetini sunan belgedir. Yalnızca iş deneyimi ve becerilere odaklanan özgeçmiş veya CV\'den farklı olarak biodata; <strong>doğum tarihi, medeni durum, uyruk, din</strong> ve bazen aile bilgileri gibi kişisel ayrıntıları da içerir.',
      'Biodata formatı, <strong>Güney Asya ülkelerinde</strong> (Hindistan, Pakistan, Bangladeş, Sri Lanka), <strong>Orta Doğu\'da</strong> (BAE, Suudi Arabistan, Katar) ve <strong>Güneydoğu Asya\'nın</strong> bazı bölgelerinde (Filipinler, Malezya) yaygın olarak kullanılır. Bu bölgelerdeki kamu kurumları ve geleneksel şirketler, Batı tarzı özgeçmiş yerine sıklıkla biodata talep eder.',
    ],
    insightTitle: 'Önemli Not:',
    insightText:
      'Hindistan, Pakistan veya Körfez ülkelerine iş başvurusu yapıyorsanız biodata formatını bilmek önemlidir. Pek çok işveren beklenen formata uymayan başvuruları reddedebilir.',
  },
  vsComparison: {
    title: 'Biodata, Özgeçmiş ve CV: Farkları Neler?',
    subtitle: 'Hangi belgeyi ne zaman kullanacağınızı bilmek iş arama sürecinizde kritik öneme sahiptir.',
    headers: { aspect: 'Özellik', biodata: 'Biodata', resume: 'Özgeçmiş/CV', cv: 'Akademik CV' },
    rows: [
      { aspect: 'Uzunluk', biodata: '1-2 sayfa', resume: '1-2 sayfa', cv: '2+ sayfa' },
      {
        aspect: 'Kişisel Bilgiler',
        biodata: 'Kapsamlı (doğum tarihi, medeni durum, din, aile)',
        resume: 'Minimal (ad, iletişim)',
        cv: 'Minimal (ad, iletişim)',
        biodataHighlight: 'green',
      },
      {
        aspect: 'Odak',
        biodata: 'Kişisel geçmiş + kariyer',
        resume: 'Beceriler + başarılar',
        cv: 'Akademik + araştırma',
      },
      {
        aspect: 'Yaygın Bölgeler',
        biodata: 'Hindistan, Pakistan, Orta Doğu, Filipinler',
        resume: 'ABD, Kanada, Avustralya, Türkiye',
        cv: 'Avrupa, İngiltere, akademik çevreler',
      },
      {
        aspect: 'İdeal Kullanım',
        biodata: 'Kamu işleri, geleneksel şirketler, evlilik başvuruları',
        resume: 'Kurumsal işler, girişimler, teknoloji',
        cv: 'Akademik pozisyonlar, araştırma, tıp',
      },
      {
        aspect: 'Özelleştirme',
        biodata: 'Birden fazla başvuruda aynı biodata kullanılır',
        resume: 'Her iş için özelleştirilir',
        cv: 'Başarılar eklendikçe güncellenir',
      },
    ],
  },
  structure: {
    title: 'Standart Biodata Format Yapısı',
    description: 'Tek bir "resmi" biodata formatı olmasa da çoğu işveren bu bölümlerin bu sırayla sunulmasını bekler:',
    sections: [
      {
        number: 1,
        label: 'Kişisel Bilgiler',
        detail: 'Ad, Fotoğraf, Doğum Tarihi, Cinsiyet, Medeni Durum, Uyruk',
        colorGroup: 'orange',
      },
      {
        number: 2,
        label: 'İletişim Bilgileri',
        detail: 'Adres (Kalıcı ve Geçici), Telefon, E-posta',
        colorGroup: 'default',
      },
      {
        number: 3,
        label: 'Kariyer Hedefi',
        detail: 'Kariyer hedeflerinizi anlatan 2-3 cümle',
        colorGroup: 'default',
      },
      {
        number: 4,
        label: 'Eğitim Bilgileri',
        detail: 'Dereceler, Kurumlar, Yıllar, Not Ortalamaları',
        colorGroup: 'blue',
      },
      {
        number: 5,
        label: 'İş Deneyimi',
        detail: 'Şirket, Unvan, Süre, Sorumluluklar',
        colorGroup: 'blue',
      },
      {
        number: 6,
        label: 'Beceriler ve Yetkinlikler',
        detail: 'Teknik beceriler, Dil bilgisi, Yazılım yetkinliği',
        colorGroup: 'default',
      },
      {
        number: 7,
        label: 'Ek Bilgiler',
        detail: 'Hobiler, İlgi Alanları, Başarılar, Referanslar',
        colorGroup: 'default',
      },
      {
        number: 8,
        label: 'Beyanname',
        detail: '"Yukarıdaki bilgilerin doğru ve eksiksiz olduğunu beyan ederim…"',
        colorGroup: 'dark',
      },
    ],
    proTipTitle: 'Profesyonel İpucu:',
    proTipText:
      'Başvurduğunuz ülkenin veya kurumun özelliklerine göre bölümleri uyarlayın. Bazı bölgeler din veya kast bilgisi isterken, diğerleri yalnızca standart mesleki bilgilerle yetinir.',
  },
  personalInfo: {
    title: 'Kişisel Bilgiler Bölümü',
    description: 'Biodata\'nın en kritik bölümü kişisel bilgilerdir — bölgeye göre beklentiler farklılaşır.',
    alwaysInclude: {
      title: 'Her Zaman Dahil Edin',
      items: [
        'Tam ad',
        'Doğum tarihi (veya yaş)',
        'Cinsiyet',
        'Uyruk/vatandaşlık',
        'İletişim bilgileri (telefon, e-posta)',
        'Adres (kalıcı ve/veya geçici)',
      ],
    },
    optional: {
      title: 'Bölgeye Göre Opsiyonel',
      items: [
        'Medeni durum',
        'Din / mezhep',
        'Pasaport bilgileri (yurt dışı başvurular için)',
        'Boy ve kilo (bazı Güney Asya başvurularında)',
        'Baba adı / ebeveyn bilgileri',
        'Vesikalık fotoğraf',
      ],
    },
    noteTitle: 'Türk İş Piyasasına Not:',
    noteText:
      'Türkiye\'de standart CV veya özgeçmiş tercih edilir. Türk şirketlerine başvuru yaparken biodata yerine kronolojik özgeçmiş kullanın. Biodata yalnızca Güney Asya veya Körfez ülkelerindeki işverenler tarafından talep edildiğinde gereklidir.',
  },
  types: {
    title: 'Biodata Türleri',
    jobBiodata: {
      title: 'İş Başvurusu Biodatası',
      description: 'Profesyonel geçmiş ve kariyer hedefleriyle birlikte kişisel ayrıntıları içerir.',
      focusTitle: 'Odak Noktaları',
      focusItems: ['Kariyer hedefi', 'Eğitim geçmişi', 'İş deneyimi', 'Beceriler ve sertifikalar', 'Referanslar'],
      commonTitle: 'Yaygın Bölgeler',
      commonItems: ['Hindistan kamu sektörü', 'Pakistan devlet kurumları', 'Orta Doğu işverenleri', 'Filipin şirketleri'],
    },
    marriageBiodata: {
      title: 'Evlilik Biodatası (Marriage Biodata)',
      description: 'Geleneksel Güney Asya düzenlenmiş evliliklerde aile bilgileri ve kişisel özellikler dahil edilir.',
      sectionsTitle: 'Tipik Bölümler',
      sectionsItems: [
        'Kişisel bilgiler (boy, kilo, ten rengi)',
        'Din / mezhep / kast',
        'Aile geçmişi',
        'Eğitim ve kariyer',
        'Fiziksel özellikler',
        'İstenen eş özellikleri',
      ],
      designTitle: 'Tasarım İpuçları',
      designItems: [
        'Profesyonel fotoğraf ekleyin',
        'Ailenin onayladığı bilgileri dahil edin',
        'Sadelik ve güvenilirliği ön planda tutun',
        'Dini ve kültürel değerleri yansıtın',
      ],
    },
  },
  regions: {
    title: 'Bölgelere Göre Biodata Formatı',
    description: 'Her ülkenin farklı beklentileri vardır. İşte her bölgedeki işverenlerin aradığı bilgiler:',
    items: [
      {
        country: 'Hindistan',
        flag: '🇮🇳',
        text: 'Biodata, kamu kurumları (UPSC, SSC) ve kamu bankaları için standarttır. Özel çok uluslu şirketler özgeçmiş tercih eder. Baba adı, kast (kota sistemi için) ve referans mektubu genellikle istenir.',
      },
      {
        country: 'Pakistan',
        flag: '🇵🇰',
        text: "Hindistan\'a benzer şekilde CNIC (kimlik kartı) numarası ve baba adı temel bilgiler arasındadır. Kamu ve yarı kamu pozisyonları ayrıntılı biodata gerektirir.",
      },
      {
        country: 'BAE ve Körfez',
        flag: '🇦🇪',
        text: "Fotoğraflı, uyruk, vize durumu ve işe başlama tarihi belirtilmiş bir biodata beklenir. Din bilgisi istenebilir. Uluslararası başvurucular için pasaport bilgileri eklenmeli; hem biodata hem özgeçmiş kabul edilir.",
      },
      {
        country: 'Filipinler',
        flag: '🇵🇭',
        text: "Personal Data Sheet (PDS), kamu sektörü için resmi formattır. Özel şirketler hem biodata hem özgeçmiş kabul eder. Boy, kilo ve medeni durum belirtmek yaygındır.",
      },
    ],
  },
  templates: {
    title: 'Ücretsiz Biodata Şablonları',
    subtitle:
      'Profesyonelce tasarlanmış Word/PDF biodata şablonları indirin. Kendi bilgilerinizle kolayca özelleştirin.',
    cards: [
      {
        title: 'İş Başvurusu Biodata Şablonu',
        description: 'Standart bölümleri olan, iş başvurusu için profesyonel şablon.',
        ctaLabel: 'AI ile Oluştur',
        color: 'blue',
      },
      {
        title: 'Sade Biodata Şablonu',
        description: 'Yeni mezunlar veya az deneyimliler için sade ve temiz tasarım.',
        ctaLabel: 'Oluşturmaya Başla',
        color: 'orange',
      },
    ],
  },
  tips: {
    title: 'Etkili Biodata Oluşturma İpuçları',
    items: [
      {
        title: 'Profesyonel Fotoğraf Kullanın',
        description: 'Pasaport boyutunda, sade arka planlı, resmi kıyafetli fotoğraf tercih edin. Selfie veya günlük fotoğraf kullanmayın.',
      },
      {
        title: 'Özlü Tutun',
        description: '1-2 sayfayı aşmayın. İşe alım uzmanları uzun belgeler okumak istemez.',
      },
      {
        title: 'Tutarlı Biçimlendirme',
        description: 'Aynı yazı tipini ve boyutunu kullanın. Başlıkları belirginleştirin ve düzenli bir görünüm sağlayın.',
      },
      {
        title: 'Beyanname Ekleyin',
        description: '"Yukarıdaki bilgilerin eksiksiz ve doğru olduğunu beyan ederim" ifadesini dahil edin.',
      },
      {
        title: 'Eğitimi Yeniden Eskiye Sıralayın',
        description: 'En son dereceyi en üste yerleştirin. Not ortalamanız iyiyse belirtin.',
      },
      {
        title: 'Yazım Hatalarını Kontrol Edin',
        description: 'Yazım ve imla hataları olumsuz ilk izlenim yaratır. Göndermeden önce dikkatle kontrol edin.',
      },
      {
        title: 'Yalnızca İlgili Bilgileri Ekleyin',
        description: 'İstenmeyen veya pozisyonla ilgisi olmayan kişisel bilgileri dahil etmekten kaçının.',
      },
      {
        title: 'İmzalayın ve Tarih Ekleyin',
        description: 'Belgenin altına imzanızı, güncel tarihi ve bulunduğunuz şehri ekleyin.',
      },
    ],
  },
  faq: {
    title: 'Sık Sorulan Sorular',
    items: [
      {
        question: 'Biodata ile özgeçmiş arasındaki fark nedir?',
        answer:
          "Özgeçmiş, deneyim, beceri ve başarılara odaklanır ve her iş başvurusu için özelleştirilir. Biodata ise doğum tarihi, medeni durum, din ve aile bilgileri gibi ek kişisel bilgileri içerir. Türkiye ve Batı ülkelerinde özgeçmiş standarttır; ancak Güney Asya, Orta Doğu ve Güneydoğu Asya\'nın bazı bölgelerinde biodata tercih edilir.",
      },
      {
        question: 'Biodata gerçekten iş başvurularında kullanılır mı?',
        answer:
          "Evet. Biodata, Hindistan, Pakistan, Bangladeş, Filipinler ve Orta Doğu\'da yaygın olarak kullanılır. Bu bölgelerdeki kamu kurumları ve geleneksel şirketler, özgeçmiş yerine özellikle biodata talep edebilir.",
      },
      {
        question: 'Biodataya hangi kişisel bilgiler eklenmeli?',
        answer:
          "İş amaçlı biodatada genellikle ad soyad, doğum tarihi, cinsiyet, uyruk, medeni durum, iletişim bilgileri ve ikamet adresi bulunur. Evlilik biodataları boy, kilo, din, kast bilgisi ve aile geçmişi de içerebilir.",
      },
      {
        question: 'Biodata kaç sayfa olmalı?',
        answer:
          "1-2 sayfa idealdir. İş başvurusu biodatası genellikle 1 sayfa olup evlilik biodataları aile bilgileri nedeniyle 2 sayfaya çıkabilir. Öz ve kapsamlı olmasına dikkat edin.",
      },
      {
        question: "CV oluşturucu ile biodata yapılabilir mi?",
        answer:
          "Evet. AI özgeçmiş oluşturucumuz biodata oluşturmak için de kullanılabilir. Standart bir şablon seçin ve kişisel bilgiler bölümünü biodata gereksinimlerine göre özelleştirin. Bölümlerinizi bölgesel beklentilere uygun şekilde düzenleyin.",
      },
      {
        question: 'Türkiye\'de biodata gerekli mi?',
        answer:
          "Türkiye iş piyasasında biodata nadir talep edilir. Türk şirketleri kronolojik CV veya özgeçmiş bekler. Biodata yalnızca Güney Asya veya Körfez ülkelerindeki işverenler tarafından talep edildiğinde gereklidir.",
      },
    ],
  },
  crossLinks: {
    title: 'İlgili Kaynaklar',
    items: [
      { href: '/resume-format', title: 'CV Format Rehberi', subtitle: 'Kronolojik / Fonksiyonel / Kombine' },
      { href: '/templates', title: 'CV Şablonları', subtitle: '20\'den fazla profesyonel şablon' },
      { href: '/resume-examples', title: 'CV Örnekleri', subtitle: '300\'den fazla meslek için CV örnekleri' },
    ],
  },
  externalResources: {
    title: 'Harici Kaynaklar',
    items: [
      { href: 'https://www.iskur.gov.tr/', label: 'İŞKUR — Türkiye İş Kurumu' },
      { href: 'https://www.kariyer.net/', label: "Kariyer.net — Türkiye\'nin önde gelen iş ilanı platformu" },
    ],
  },
  bottomCta: {
    title: 'Birkaç Dakikada Biodata veya CV Oluşturun',
    description:
      "Yapay zeka destekli CV oluşturucumuz, doğru yapıya sahip profesyonel bir belge hazırlamanıza yardımcı olur. Çeşitli şablonlar arasından seçin ve PDF veya Word formatında dışa aktarın.",
    ctaLabel: 'Ücretsiz Biodata Oluştur',
  },
};

const id: BiodataFormatPageContent = {
  meta: {
    title: 'Biodata / Daftar Riwayat Hidup: Panduan Format & Template Gratis 2026 | Best AI Resume',
    description:
      'Apa itu biodata atau daftar riwayat hidup? Pelajari format biodata untuk lamaran kerja di Indonesia. Template gratis siap unduh. 2026.',
    keywords:
      'biodata, daftar riwayat hidup, format biodata, biodata lamaran kerja, biodata vs cv, template biodata, contoh biodata, form daftar riwayat hidup',
  },
  schemas: {
    breadcrumbName: 'Panduan Format Biodata',
    articleHeadline: 'Biodata / Daftar Riwayat Hidup: Panduan Format, Template, dan Contoh 2026',
    articleDescription:
      'Panduan lengkap format biodata dan daftar riwayat hidup. Pelajari perbedaannya dengan CV dan resume, unduh template gratis.',
  },
  hero: {
    badge: 'Panduan lengkap untuk 2026',
    title: 'Panduan Format Biodata',
    titleHighlight: '(Template Gratis)',
    subtitle:
      '<strong>Biodata atau daftar riwayat hidup</strong> adalah dokumen standar yang digunakan dalam lamaran kerja di Indonesia dan Asia Tenggara. Pelajari perbedaan biodata dengan CV dan resume, lalu unduh template gratis yang siap digunakan.',
    ctaTemplates: 'Unduh Template',
    ctaBuild: 'Buat Biodata dengan AI',
  },
  whatIs: {
    title: 'Apa Itu Biodata?',
    paragraphs: [
      '<strong>Biodata</strong> (singkatan dari data biografis) adalah dokumen yang menyajikan ringkasan komprehensif latar belakang pribadi dan profesional Anda. Berbeda dengan CV atau resume yang hanya berfokus pada pengalaman kerja dan keahlian, biodata juga mencakup detail pribadi seperti <strong>tanggal lahir, status pernikahan, kewarganegaraan</strong>, dan terkadang informasi keluarga.',
      'Format biodata umum digunakan di <strong>Indonesia dan Asia Tenggara</strong> (terutama untuk instansi pemerintah dan perusahaan tradisional), <strong>Asia Selatan</strong> (India, Pakistan, Bangladesh), dan <strong>Timur Tengah</strong> (UEA, Arab Saudi, Qatar). Instansi pemerintah dan perusahaan tradisional di wilayah-wilayah ini sering meminta biodata daripada resume bergaya Barat.',
    ],
    insightTitle: 'Catatan Penting:',
    insightText:
      'Di Indonesia, banyak instansi pemerintah dan BUMN masih menggunakan formulir "daftar riwayat hidup" sebagai dokumen standar. Namun perusahaan swasta modern dan startup umumnya menerima CV atau resume biasa.',
  },
  vsComparison: {
    title: 'Biodata, CV, dan Resume: Apa Bedanya?',
    subtitle: 'Mengetahui dokumen mana yang digunakan kapan sangat penting dalam pencarian kerja Anda.',
    headers: { aspect: 'Aspek', biodata: 'Biodata', resume: 'CV/Resume', cv: 'CV Akademik' },
    rows: [
      { aspect: 'Panjang', biodata: '1-2 halaman', resume: '1-2 halaman', cv: '2+ halaman' },
      {
        aspect: 'Informasi Pribadi',
        biodata: 'Lengkap (tanggal lahir, status, agama, keluarga)',
        resume: 'Minimal (nama, kontak)',
        cv: 'Minimal (nama, kontak)',
        biodataHighlight: 'green',
      },
      {
        aspect: 'Fokus',
        biodata: 'Riwayat pribadi + karier',
        resume: 'Keahlian + pencapaian',
        cv: 'Akademik + penelitian',
      },
      {
        aspect: 'Wilayah Umum',
        biodata: 'Indonesia, Malaysia, India, Pakistan, Timur Tengah',
        resume: 'AS, Kanada, Australia, Eropa',
        cv: 'Eropa, Inggris, lingkungan akademik',
      },
      {
        aspect: 'Penggunaan Ideal',
        biodata: 'Pekerjaan pemerintah, perusahaan tradisional, BUMN',
        resume: 'Perusahaan swasta, startup, teknologi',
        cv: 'Posisi akademik, penelitian, medis',
      },
      {
        aspect: 'Kustomisasi',
        biodata: 'Biodata yang sama digunakan untuk banyak lamaran',
        resume: 'Disesuaikan untuk setiap pekerjaan',
        cv: 'Diperbarui seiring pencapaian',
      },
    ],
  },
  structure: {
    title: 'Struktur Format Biodata Standar',
    description: 'Meskipun tidak ada format biodata "resmi" yang tunggal, sebagian besar pemberi kerja mengharapkan bagian-bagian ini dalam urutan berikut:',
    sections: [
      {
        number: 1,
        label: 'Informasi Pribadi',
        detail: 'Nama, Foto, Tanggal Lahir, Jenis Kelamin, Status Pernikahan, Kewarganegaraan',
        colorGroup: 'orange',
      },
      {
        number: 2,
        label: 'Informasi Kontak',
        detail: 'Alamat (Tetap dan Sementara), Telepon, Email',
        colorGroup: 'default',
      },
      {
        number: 3,
        label: 'Tujuan Karier',
        detail: '2-3 kalimat yang mendeskripsikan tujuan karier Anda',
        colorGroup: 'default',
      },
      {
        number: 4,
        label: 'Riwayat Pendidikan',
        detail: 'Gelar, Institusi, Tahun, IPK',
        colorGroup: 'blue',
      },
      {
        number: 5,
        label: 'Pengalaman Kerja',
        detail: 'Perusahaan, Jabatan, Periode, Tanggung Jawab',
        colorGroup: 'blue',
      },
      {
        number: 6,
        label: 'Keahlian dan Kompetensi',
        detail: 'Keahlian teknis, kemampuan bahasa, penguasaan software',
        colorGroup: 'default',
      },
      {
        number: 7,
        label: 'Informasi Tambahan',
        detail: 'Hobi, Minat, Prestasi, Referensi',
        colorGroup: 'default',
      },
      {
        number: 8,
        label: 'Pernyataan',
        detail: '"Dengan ini saya menyatakan bahwa informasi di atas adalah benar dan lengkap…"',
        colorGroup: 'dark',
      },
    ],
    proTipTitle: 'Tips Profesional:',
    proTipText:
      'Sesuaikan bagian-bagian sesuai dengan negara atau institusi yang Anda lamar. Beberapa daerah meminta informasi agama atau golongan darah, sementara yang lain cukup dengan informasi profesional standar.',
  },
  personalInfo: {
    title: 'Bagian Informasi Pribadi',
    description: 'Informasi pribadi adalah bagian paling kritis dari biodata — ekspektasi berbeda berdasarkan wilayah.',
    alwaysInclude: {
      title: 'Selalu Sertakan',
      items: [
        'Nama lengkap',
        'Tanggal lahir (atau usia)',
        'Jenis kelamin',
        'Kewarganegaraan',
        'Informasi kontak (telepon, email)',
        'Alamat (tetap dan/atau sementara)',
      ],
    },
    optional: {
      title: 'Opsional Berdasarkan Wilayah',
      items: [
        'Status pernikahan',
        'Agama',
        'Informasi paspor (untuk lamaran luar negeri)',
        'Tinggi dan berat badan (beberapa lamaran Asia)',
        'Nama ayah / informasi orang tua',
        'Foto pasfoto',
      ],
    },
    noteTitle: 'Catatan untuk Pasar Kerja Indonesia:',
    noteText:
      'Di Indonesia, banyak lowongan kerja — terutama di BUMN dan instansi pemerintah — masih meminta foto, agama, dan golongan darah dalam biodata. Perusahaan swasta modern dan multinasional umumnya hanya meminta CV standar tanpa informasi tersebut.',
  },
  types: {
    title: 'Jenis-Jenis Biodata',
    jobBiodata: {
      title: 'Biodata Lamaran Kerja',
      description: 'Mencakup detail pribadi beserta latar belakang profesional dan tujuan karier.',
      focusTitle: 'Fokus Utama',
      focusItems: ['Tujuan karier', 'Riwayat pendidikan', 'Pengalaman kerja', 'Keahlian dan sertifikasi', 'Referensi'],
      commonTitle: 'Wilayah Umum',
      commonItems: ['Instansi pemerintah Indonesia', 'BUMN', 'Perusahaan tradisional Asia Tenggara', 'Pemberi kerja Timur Tengah'],
    },
    marriageBiodata: {
      title: 'Biodata Pernikahan',
      description: 'Digunakan dalam tradisi perjodohan Asia Selatan, mencakup informasi keluarga dan ciri pribadi.',
      sectionsTitle: 'Bagian Khas',
      sectionsItems: [
        'Informasi pribadi (tinggi, berat, warna kulit)',
        'Agama / suku / golongan',
        'Latar belakang keluarga',
        'Pendidikan dan karier',
        'Ciri fisik',
        'Preferensi pasangan',
      ],
      designTitle: 'Tips Desain',
      designItems: [
        'Sertakan foto profesional',
        'Cantumkan informasi yang disetujui keluarga',
        'Utamakan kesederhanaan dan kredibilitas',
        'Cerminkan nilai agama dan budaya',
      ],
    },
  },
  regions: {
    title: 'Format Biodata Berdasarkan Wilayah',
    description: 'Setiap negara memiliki ekspektasi berbeda. Berikut informasi yang dicari pemberi kerja di setiap wilayah:',
    items: [
      {
        country: 'Indonesia',
        flag: '🇮🇩',
        text: 'Biodata atau daftar riwayat hidup adalah standar untuk instansi pemerintah dan BUMN. Perusahaan swasta multinasional lebih memilih CV. Foto, agama, dan golongan darah sering diminta. Pernyataan kebenaran data di bagian akhir adalah umum.',
      },
      {
        country: 'India',
        flag: '🇮🇳',
        text: 'Biodata adalah standar untuk instansi pemerintah (UPSC, SSC) dan bank pemerintah. Perusahaan multinasional swasta lebih memilih resume. Nama ayah, kasta (untuk sistem kuota), dan surat referensi biasanya diperlukan.',
      },
      {
        country: 'Pakistan',
        flag: '🇵🇰',
        text: 'Mirip dengan India, nomor CNIC (kartu identitas nasional) dan nama ayah adalah informasi dasar. Posisi pemerintah dan semi-pemerintah memerlukan biodata lengkap.',
      },
      {
        country: 'UEA dan Teluk',
        flag: '🇦🇪',
        text: 'Biodata berfoto dengan kewarganegaraan, status visa, dan tanggal mulai kerja diharapkan. Informasi agama bisa diminta. Untuk pelamar internasional, informasi paspor harus disertakan.',
      },
    ],
  },
  templates: {
    title: 'Template Biodata Gratis',
    subtitle:
      'Unduh template biodata Word/PDF yang dirancang secara profesional. Mudah dikustomisasi dengan informasi Anda sendiri.',
    cards: [
      {
        title: 'Template Biodata Lamaran Kerja',
        description: 'Template profesional dengan bagian standar untuk lamaran kerja.',
        ctaLabel: 'Buat dengan AI',
        color: 'blue',
      },
      {
        title: 'Template Biodata Sederhana',
        description: 'Desain bersih dan sederhana untuk fresh graduate atau yang berpengalaman sedikit.',
        ctaLabel: 'Mulai Membuat',
        color: 'orange',
      },
    ],
  },
  tips: {
    title: 'Tips Membuat Biodata yang Efektif',
    items: [
      {
        title: 'Gunakan Foto Profesional',
        description: 'Gunakan foto pasfoto ukuran 3x4 atau 4x6 dengan latar belakang polos dan pakaian formal. Jangan gunakan selfie atau foto kasual.',
      },
      {
        title: 'Buat Ringkas',
        description: 'Jangan melebihi 1-2 halaman. Rekruter tidak ingin membaca dokumen yang terlalu panjang.',
      },
      {
        title: 'Format Konsisten',
        description: 'Gunakan jenis dan ukuran font yang sama. Buat judul menonjol dan pastikan tampilan teratur.',
      },
      {
        title: 'Sertakan Pernyataan',
        description: 'Sertakan kalimat "Dengan ini saya menyatakan bahwa informasi di atas adalah benar dan lengkap."',
      },
      {
        title: 'Urutkan Pendidikan dari Terbaru',
        description: 'Tempatkan gelar terakhir di atas. Cantumkan IPK jika bagus.',
      },
      {
        title: 'Periksa Kesalahan Ketik',
        description: 'Kesalahan ejaan dan penulisan menciptakan kesan pertama yang buruk. Periksa dengan teliti sebelum mengirim.',
      },
      {
        title: 'Sertakan Hanya Informasi yang Relevan',
        description: 'Hindari memasukkan informasi pribadi yang tidak diminta atau tidak relevan dengan posisi.',
      },
      {
        title: 'Tanda Tangani dan Beri Tanggal',
        description: 'Tambahkan tanda tangan, tanggal terkini, dan kota Anda di bagian bawah dokumen.',
      },
    ],
  },
  faq: {
    title: 'Pertanyaan yang Sering Diajukan',
    items: [
      {
        question: 'Apa perbedaan biodata dan CV?',
        answer:
          'CV berfokus pada pengalaman, keahlian, dan pencapaian, dan disesuaikan untuk setiap lamaran kerja. Biodata mencakup detail pribadi tambahan seperti tanggal lahir, status pernikahan, agama, dan informasi keluarga. Di Indonesia dan banyak negara Asia, biodata adalah dokumen standar untuk lamaran ke instansi pemerintah dan perusahaan tradisional.',
      },
      {
        question: 'Apakah biodata benar-benar digunakan dalam lamaran kerja?',
        answer:
          'Ya. Biodata atau daftar riwayat hidup sangat umum di Indonesia, Malaysia, India, Pakistan, Bangladesh, dan Timur Tengah. Instansi pemerintah dan perusahaan tradisional di wilayah-wilayah ini mungkin secara khusus meminta biodata daripada resume.',
      },
      {
        question: 'Informasi pribadi apa yang harus disertakan dalam biodata?',
        answer:
          'Biodata untuk pekerjaan biasanya mencakup nama lengkap, tanggal lahir, jenis kelamin, kewarganegaraan, status pernikahan, informasi kontak, dan alamat. Beberapa pemberi kerja Indonesia juga meminta agama, golongan darah, dan foto.',
      },
      {
        question: 'Berapa halaman biodata?',
        answer:
          '1-2 halaman adalah ideal. Biodata lamaran kerja biasanya 1 halaman, sementara biodata pernikahan bisa 2 halaman karena informasi keluarga. Perhatikan agar ringkas namun komprehensif.',
      },
      {
        question: 'Bisakah pembuat CV digunakan untuk membuat biodata?',
        answer:
          'Ya. Pembuat CV AI kami bisa digunakan untuk membuat biodata juga. Pilih template standar dan sesuaikan bagian informasi pribadi sesuai persyaratan biodata. Susun bagian Anda sesuai ekspektasi regional.',
      },
      {
        question: 'Apakah biodata diperlukan di Indonesia?',
        answer:
          'Di Indonesia, biodata atau daftar riwayat hidup masih diminta oleh banyak instansi pemerintah dan BUMN. Perusahaan swasta modern dan startup umumnya menerima CV standar. Sesuaikan dengan jenis perusahaan yang Anda lamar.',
      },
    ],
  },
  crossLinks: {
    title: 'Sumber Daya Terkait',
    items: [
      { href: '/resume-format', title: 'Panduan Format CV', subtitle: 'Kronologis / Fungsional / Kombinasi' },
      { href: '/templates', title: 'Template CV', subtitle: '20+ template profesional' },
      { href: '/resume-examples', title: 'Contoh CV', subtitle: '300+ contoh CV berbagai profesi' },
    ],
  },
  externalResources: {
    title: 'Sumber Daya Eksternal',
    items: [
      { href: 'https://www.kemnaker.go.id/', label: 'Kemnaker — Kementerian Ketenagakerjaan Republik Indonesia' },
      { href: 'https://www.glints.com/id', label: 'Glints Indonesia — Platform lowongan kerja terkemuka' },
    ],
  },
  bottomCta: {
    title: 'Buat Biodata atau CV dalam Beberapa Menit',
    description:
      'Pembuat CV bertenaga AI kami membantu Anda menyiapkan dokumen profesional dengan struktur yang tepat. Pilih dari berbagai template dan ekspor ke PDF atau Word.',
    ctaLabel: 'Buat Biodata Gratis',
  },
};

const nl: BiodataFormatPageContent = {
  meta: {
    title: 'Biodata Formaat 2026: Gratis Sjablonen, Voorbeelden & Schrijfgids | Best AI Resume',
    description:
      'Leer wat een biodata is en wanneer u het gebruikt. Vergelijk biodata vs cv, download gratis biodatasjablonen (PDF & Word) en bekijk voorbeelden voor Aziatische en Midden-Oosterse markten.',
    keywords:
      'biodata formaat, biodata, biodata voor sollicitatie, biodata vs cv, huwelijks biodata, biodata sjabloon, eenvoudig biodata formaat, biodata voorbeeld',
  },
  schemas: {
    breadcrumbName: 'Biodata Formaatgids',
    articleHeadline: 'Biodata Formaatgids 2026: Sjablonen, Voorbeelden & Schrijfinstructies',
    articleDescription:
      'Complete gids over het biodataformaat voor sollicitaties. Leer het verschil tussen biodata en cv, download gratis sjablonen en bekijk voorbeelden.',
  },
  hero: {
    badge: 'Complete Gids voor 2026',
    title: 'Biodata Formaatgids',
    titleHighlight: '(Gratis Sjablonen)',
    subtitle:
      'Het <strong>biodataformaat</strong> is het standaarddocument voor sollicitaties in India, Pakistan, Bangladesh en het Midden-Oosten. Leer wanneer u biodata versus een cv gebruikt, en download gratis sjablonen die aansluiten bij regionale verwachtingen.',
    ctaTemplates: 'Sjablonen Downloaden',
    ctaBuild: 'Maak Biodata met AI',
  },
  whatIs: {
    title: 'Wat Is een Biodata?',
    paragraphs: [
      '<strong>Biodata</strong> (afkorting van <em>biografische gegevens</em>) is een document dat een uitgebreid overzicht biedt van uw persoonlijke en professionele achtergrond. Anders dan een cv dat primair gericht is op werkervaring en vaardigheden, bevat biodata ook <strong>persoonlijke gegevens</strong> zoals geboortedatum, burgerlijke staat, nationaliteit, religie en soms familiegegevens.',
      'Het biodataformaat wordt veel gebruikt in <strong>Zuid-Aziatische landen</strong> (India, Pakistan, Bangladesh, Sri Lanka), het <strong>Midden-Oosten</strong> (VAE, Saudi-Arabië, Qatar) en delen van <strong>Zuidoost-Azië</strong> (Filippijnen, Maleisië). Overheidsbanen, publieke sector bedrijven en traditionele organisaties in deze regio\'s vragen vaak specifiek om biodata in plaats van een westers cv.',
    ],
    insightTitle: 'Belangrijk:',
    insightText:
      'Als u solliciteert naar banen in India, Pakistan of de Golfstaten, is kennis van het biodataformaat essentieel. Veel werkgevers wijzen sollicitaties af die niet het verwachte formaat volgen.',
  },
  vsComparison: {
    title: 'Biodata vs Cv vs Academisch CV: Wat is het Verschil?',
    subtitle: 'Begrijpen wanneer u welk document gebruikt, is cruciaal voor succes in uw zoektocht naar werk.',
    headers: { aspect: 'Aspect', biodata: 'Biodata', resume: 'Cv', cv: 'Academisch CV' },
    rows: [
      { aspect: 'Lengte', biodata: '1-2 pagina\'s', resume: '1-2 pagina\'s', cv: '2+ pagina\'s' },
      {
        aspect: 'Persoonlijke Informatie',
        biodata: 'Uitgebreid (geboortedatum, status, religie, familie)',
        resume: 'Minimaal (naam, contactgegevens)',
        cv: 'Minimaal (naam, contactgegevens)',
        biodataHighlight: 'green',
      },
      {
        aspect: 'Focus',
        biodata: 'Persoonlijke + carrièregeschiedenis',
        resume: 'Vaardigheden + prestaties',
        cv: 'Academisch + onderzoek',
      },
      {
        aspect: 'Gebruikelijke Regio',
        biodata: 'India, Pakistan, Maleisië, Bangladesh, Midden-Oosten',
        resume: 'VS, Canada, Australië, Europa',
        cv: 'Europa, VK, academische omgevingen',
      },
      {
        aspect: 'Ideaal Gebruik',
        biodata: 'Overheidsbanen, traditionele bedrijven, staatsbedrijven',
        resume: 'Particuliere bedrijven, startups, technologie',
        cv: 'Academische functies, onderzoek, medisch',
      },
      {
        aspect: 'Aanpassing',
        biodata: 'Dezelfde biodata voor meerdere sollicitaties',
        resume: 'Aangepast per vacature',
        cv: 'Bijgewerkt naarmate prestaties toenemen',
      },
    ],
  },
  structure: {
    title: 'Standaard Biodataformaatstructuur',
    description: 'Hoewel er geen enkel "officieel" biodataformaat bestaat, verwachten de meeste werkgevers deze secties in de volgende volgorde:',
    sections: [
      {
        number: 1,
        label: 'Persoonlijke Informatie',
        detail: 'Naam, Foto, Geboortedatum, Geslacht, Burgerlijke Staat, Nationaliteit',
        colorGroup: 'orange',
      },
      {
        number: 2,
        label: 'Contactgegevens',
        detail: 'Adres (Vast en Tijdelijk), Telefoon, E-mail',
        colorGroup: 'default',
      },
      {
        number: 3,
        label: 'Carrièredoelstelling',
        detail: '2-3 zinnen die uw carrièredoelstelling beschrijven',
        colorGroup: 'default',
      },
      {
        number: 4,
        label: 'Opleidingsgeschiedenis',
        detail: 'Diploma\'s, Instelling, Jaar, Cijferlijst',
        colorGroup: 'blue',
      },
      {
        number: 5,
        label: 'Werkervaring',
        detail: 'Bedrijf, Functie, Periode, Verantwoordelijkheden',
        colorGroup: 'blue',
      },
      {
        number: 6,
        label: 'Vaardigheden en Competenties',
        detail: 'Technische vaardigheden, taalvaardigheden, softwarebeheersing',
        colorGroup: 'default',
      },
      {
        number: 7,
        label: 'Aanvullende Informatie',
        detail: 'Hobby\'s, Interesses, Prestaties, Referenties',
        colorGroup: 'default',
      },
      {
        number: 8,
        label: 'Verklaring',
        detail: '"Ik verklaar hierbij dat de bovenstaande informatie naar waarheid en volledig is ingevuld…"',
        colorGroup: 'dark',
      },
    ],
    proTipTitle: 'Professionele Tip:',
    proTipText:
      'Pas de secties aan op het land of de instelling waarvoor u solliciteert. Sommige regio\'s vragen om religieuze informatie of bloedgroep, terwijl andere volstaan met standaard professionele informatie.',
  },
  personalInfo: {
    title: 'Sectie Persoonlijke Informatie',
    description: 'Persoonlijke informatie is het meest kritieke onderdeel van een biodata — verwachtingen verschillen per regio.',
    alwaysInclude: {
      title: 'Altijd Opnemen',
      items: [
        'Volledige naam',
        'Geboortedatum (of leeftijd)',
        'Geslacht',
        'Nationaliteit',
        'Contactgegevens (telefoon, e-mail)',
        'Adres (vast en/of tijdelijk)',
      ],
    },
    optional: {
      title: 'Optioneel Per Regio',
      items: [
        'Burgerlijke staat',
        'Religie',
        'Paspoortinformatie (voor buitenlandse sollicitaties)',
        'Lengte en gewicht (sommige Aziatische sollicitaties)',
        'Naam vader / oudersgegevens',
        'Pasfoto',
      ],
    },
    noteTitle: 'Opmerking voor de Nederlandse Markt:',
    noteText:
      'In Nederland en de Europese Unie gelden strikte AVG-regels voor het verzamelen van persoonlijke gegevens. Werkgevers mogen doorgaans niet naar leeftijd, religie, nationaliteit of burgerlijke staat vragen. Als u solliciteert bij bedrijven die biodata eisen (bijv. Aziatische of Midden-Oosterse werkgevers), informeer dan vooraf welke gegevens zij specifiek nodig hebben.',
  },
  types: {
    title: 'Soorten Biodata',
    jobBiodata: {
      title: 'Biodata voor Sollicitaties',
      description: 'Bevat persoonlijke gegevens samen met professionele achtergrond en carrièredoelstellingen.',
      focusTitle: 'Hoofdfocus',
      focusItems: ['Carrièredoelstelling', 'Opleidingsgeschiedenis', 'Werkervaring', 'Vaardigheden en certificeringen', 'Referenties'],
      commonTitle: 'Gebruikelijke Regio\'s',
      commonItems: ['Indiase overheidsdiensten', 'Pakistaanse publieke sector', 'Traditionele Zuidoost-Aziatische bedrijven', 'Midden-Oosterse werkgevers'],
    },
    marriageBiodata: {
      title: 'Huwelijksbiodata',
      description: 'Gebruikt in Zuid-Aziatische huwelijkstradities, bevat familiegegevens en persoonlijke kenmerken.',
      sectionsTitle: 'Typische Secties',
      sectionsItems: [
        'Persoonlijke informatie (lengte, gewicht, huidskleur)',
        'Religie / etniciteit / kaste',
        'Familieachtergrond',
        'Opleiding en carrière',
        'Fysieke kenmerken',
        'Voorkeur voor partner',
      ],
      designTitle: 'Ontwerptips',
      designItems: [
        'Voeg een professionele foto toe',
        'Neem door de familie goedgekeurde informatie op',
        'Geef prioriteit aan eenvoud en geloofwaardigheid',
        'Weerspiegel religieuze en culturele waarden',
      ],
    },
  },
  regions: {
    title: 'Biodataformaten Per Regio',
    description: 'Elk land heeft andere verwachtingen. Dit zijn de gegevens die werkgevers per regio zoeken:',
    items: [
      {
        country: 'India',
        flag: '🇮🇳',
        text: 'Biodata is standaard voor overheidsdiensten (UPSC, SSC) en staatsbankieren. Multinationale private bedrijven geven de voorkeur aan een cv. Vadersnaam, kaste (voor quotasysteem) en referentiebrieven zijn meestal vereist.',
      },
      {
        country: 'Pakistan',
        flag: '🇵🇰',
        text: 'Vergelijkbaar met India — CNIC-nummer (nationale identiteitskaart) en vadersnaam zijn basisgegevens. Overheids- en semi-overheidsfuncties vereisen volledige biodata.',
      },
      {
        country: 'VAE en Golf',
        flag: '🇦🇪',
        text: 'Biodata met foto, inclusief nationaliteit, visumstatus en gewenste startdatum wordt verwacht. Religieuze informatie kan worden gevraagd. Voor internationale sollicitanten moet paspoortinformatie worden meegestuurd.',
      },
      {
        country: 'Maleisië en Indonesië',
        flag: '🇲🇾',
        text: 'Biodata of daftar riwayat hidup is standaard voor overheidsinstellingen. Moderne private bedrijven en multinationals geven de voorkeur aan een standaard cv. Foto en nationaliteit worden vaak gevraagd.',
      },
    ],
  },
  templates: {
    title: 'Gratis Biodatasjablonen',
    subtitle:
      'Download professioneel ontworpen Word/PDF-biodatasjablonen. Eenvoudig aan te passen met uw eigen gegevens.',
    cards: [
      {
        title: 'Biodata Sjabloon voor Sollicitaties',
        description: 'Professioneel sjabloon met standaardsecties voor sollicitaties.',
        ctaLabel: 'Maak met AI',
        color: 'blue',
      },
      {
        title: 'Eenvoudig Biodatasjabloon',
        description: 'Schoon en eenvoudig ontwerp voor pas afgestudeerden of kandidaten met weinig ervaring.',
        ctaLabel: 'Begin met Maken',
        color: 'orange',
      },
    ],
  },
  tips: {
    title: 'Tips voor het Maken van een Effectieve Biodata',
    items: [
      {
        title: 'Gebruik een Professionele Foto',
        description: 'Gebruik een pasfoto met een effen achtergrond en formele kleding. Gebruik geen selfie of informele foto\'s.',
      },
      {
        title: 'Houd het Beknopt',
        description: 'Overschrijd niet de 1-2 pagina\'s. Recruiters willen geen te lang document lezen.',
      },
      {
        title: 'Consistent Formaat',
        description: 'Gebruik hetzelfde lettertype en dezelfde lettergrootte. Zorg dat koppen opvallen en dat de lay-out overzichtelijk is.',
      },
      {
        title: 'Voeg een Verklaring toe',
        description: 'Voeg de zin toe: "Ik verklaar hierbij dat de bovenstaande informatie naar waarheid en volledig is ingevuld."',
      },
      {
        title: 'Sorteer Opleiding van Nieuwste naar Oudste',
        description: 'Zet uw meest recente diploma bovenaan. Vermeld uw cijfergemiddelde als dat goed is.',
      },
      {
        title: 'Controleer op Typefouten',
        description: 'Spel- en schrijffouten maken een slechte eerste indruk. Controleer zorgvuldig voor het verzenden.',
      },
      {
        title: 'Neem Alleen Relevante Informatie op',
        description: 'Vermijd het opnemen van gevraagde persoonlijke informatie die niet relevant is voor de functie.',
      },
      {
        title: 'Onderteken en Dateer het Document',
        description: 'Voeg onderaan het document uw handtekening, de huidige datum en uw woonplaats toe.',
      },
    ],
  },
  faq: {
    title: 'Veelgestelde Vragen',
    items: [
      {
        question: 'Wat is het verschil tussen biodata en een cv?',
        answer:
          'Een cv richt zich op ervaring, vaardigheden en prestaties, en wordt aangepast per sollicitatie. Biodata bevat aanvullende persoonlijke gegevens zoals geboortedatum, burgerlijke staat, religie en familiegegevens. In India en veel Aziatische landen is biodata het standaarddocument voor sollicitaties bij overheids- en traditionele bedrijven.',
      },
      {
        question: 'Wordt biodata echt gebruikt bij sollicitaties?',
        answer:
          'Ja. Biodata is heel gebruikelijk in India, Maleisië, Pakistan, Bangladesh en het Midden-Oosten. Overheidsinstellingen en traditionele bedrijven in deze regio\'s vragen mogelijk specifiek om biodata in plaats van een cv.',
      },
      {
        question: 'Welke persoonlijke informatie moet in een biodata staan?',
        answer:
          'Biodata voor sollicitaties bevat doorgaans volledige naam, geboortedatum, geslacht, nationaliteit, burgerlijke staat, contactgegevens en adres. Sommige Aziatische werkgevers vragen ook om religie, bloedgroep en een foto.',
      },
      {
        question: 'Hoeveel pagina\'s heeft een biodata?',
        answer:
          '1-2 pagina\'s is ideaal. Biodata voor sollicitaties is meestal 1 pagina, terwijl huwelijksbiodata 2 pagina\'s kan zijn vanwege de familiegegevens. Zorg dat het beknopt maar volledig is.',
      },
      {
        question: 'Kan een cv-bouwer worden gebruikt om biodata te maken?',
        answer:
          'Ja. Onze AI-cv-bouwer kan ook worden gebruikt om biodata te maken. Kies een standaardsjabloon en pas de sectie persoonlijke informatie aan op de biodatavereisten. Rangschik uw secties op basis van regionale verwachtingen.',
      },
      {
        question: 'Is biodata vereist bij sollicitaties in Nederland?',
        answer:
          'Nee. In Nederland is biodata niet het standaard sollicitatiedocument — hier wordt een professioneel cv gebruikt. Biodata kan echter nuttig zijn als u solliciteert bij Aziatische of Midden-Oosterse bedrijven, of voor functies in landen waar biodata de norm is.',
      },
    ],
  },
  crossLinks: {
    title: 'Gerelateerde Bronnen',
    items: [
      { href: '/nl/resume-format', title: 'Cv-Formaatgids', subtitle: 'Chronologisch / Functioneel / Combinatie' },
      { href: '/nl/templates', title: 'Cv-Sjablonen', subtitle: '20+ professionele sjablonen' },
      { href: '/nl/resume-examples', title: 'Cv-Voorbeelden', subtitle: '300+ cv-voorbeelden per beroep' },
    ],
  },
  externalResources: {
    title: 'Externe Bronnen',
    items: [
      { href: 'https://www.werk.nl/', label: 'Werk.nl — Het UWV werkportaal voor werkzoekenden in Nederland' },
      { href: 'https://www.nationaleberoepengids.nl/', label: 'Nationale Beroepengids — Beroepen en carrièreinformatie' },
    ],
  },
  bottomCta: {
    title: 'Maak een Biodata of Cv in Enkele Minuten',
    description:
      'Onze AI-cv-bouwer helpt u een professioneel document op te stellen met de juiste structuur. Kies uit verschillende sjablonen en exporteer naar PDF of Word.',
    ctaLabel: 'Maak Gratis een Biodata',
  },
};

const contentMap: Record<string, BiodataFormatPageContent> = { en, es, fr, de, ar, ja, it, ko, vi, th, pt, tr, id, nl };

export function getContent(locale: string): BiodataFormatPageContent {
  return selectContent(contentMap, locale);
}
