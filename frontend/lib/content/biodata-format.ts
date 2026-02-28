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
// Export
// ---------------------------------------------------------------------------
const contentMap: Record<string, BiodataFormatPageContent> = { en, es, fr, de, ar, ja, it };

export function getContent(locale: string): BiodataFormatPageContent {
  return selectContent(contentMap, locale);
}
