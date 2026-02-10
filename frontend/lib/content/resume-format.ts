import type { FaqItem, ExternalLinkItem } from './types';
import { selectContent } from './types';

// ── Format comparison item ──────────────────────────────────────────
export interface FormatComparisonItem {
  name: string;
  badge: string;
  badgeColor: 'green' | 'amber' | 'blue';
  bestFor: string[];
  avoidIf: string;
  atsScore: number;
  atsColor: 'green' | 'amber';
}

// ── Structure section row ───────────────────────────────────────────
export interface StructureSection {
  label: string;
  detail?: string;
  isCore?: boolean;
}

// ── Page content interface ──────────────────────────────────────────
export interface ResumeFormatPageContent {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  schemas: {
    breadcrumbName: string;
    howToName: string;
    howToDescription: string;
    howToSteps: string[];
    howToToolName: string;
  };
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    ctaCompare: string;
    ctaBuild: string;
  };
  comparison: {
    title: string;
    subtitle: string;
    tableHeaders: {
      format: string;
      bestFor: string;
      avoidIf: string;
      atsSafety: string;
    };
    formats: FormatComparisonItem[];
  };
  chronological: {
    title: string;
    description: string;
    whyLoveTitle: string;
    whyLoveText: string;
    structureTitle: string;
    sections: StructureSection[];
    downloadLabel: string;
    aiLabel: string;
  };
  functional: {
    title: string;
    description: string;
    warningTitle: string;
    warningText: string;
    structureTitle: string;
    sections: StructureSection[];
    downloadLabel: string;
    aiLabel: string;
  };
  combination: {
    title: string;
    description: string;
    whoForTitle: string;
    whoForItems: string[];
    downloadLabel: string;
    aiLabel: string;
  };
  faq: {
    title: string;
    items: FaqItem[];
  };
  externalResources: {
    title: string;
    items: ExternalLinkItem[];
  };
  stickyCta: {
    text: string;
    ctaLabel: string;
  };
  bottomCta: {
    title: string;
    description: string;
    ctaLabel: string;
  };
}

// ── English ─────────────────────────────────────────────────────────

const en: ResumeFormatPageContent = {
  meta: {
    title: 'Resume Format Guide 2026: Chronological, Functional & Combination (Free Templates) | Best AI Resume',
    description: 'Choose the best resume format for your career. Compare chronological, functional, and combination formats with free downloadable templates. ATS-friendly guide updated for 2026.',
    keywords: 'resume format, resume format 2026, chronological resume, functional resume, combination resume, resume template, ATS resume format, best resume format',
  },
  schemas: {
    breadcrumbName: 'Resume Format Guide',
    howToName: 'How to Choose the Right Resume Format',
    howToDescription: 'Learn which resume format is best for your career situation: chronological, functional, or combination.',
    howToSteps: [
      'Assess your career situation: steady progression, career change, or gaps',
      'Choose chronological format for consistent work history in the same industry',
      'Choose functional format for career changes or significant employment gaps',
      'Choose combination format for senior roles or highly specialized expertise',
      'Download a template and customize it with your information',
    ],
    howToToolName: 'Best AI Resume Builder',
  },
  hero: {
    badge: 'Updated for 2026',
    title: 'Best Resume Formats for 2026',
    titleHighlight: '(Free Templates)',
    subtitle: 'Stop guessing. Discover the 3 standard resume formats used by 99% of recruiters, and learn strictly when to use each one to beat the ATS.',
    ctaCompare: 'Compare Formats',
    ctaBuild: 'Build My Resume Now',
  },
  comparison: {
    title: 'Quick Comparison: Which Format is Right for You?',
    subtitle: "Don't overthink it. Find your career situation below.",
    tableHeaders: {
      format: 'Format',
      bestFor: 'Best For',
      avoidIf: 'Avoid If',
      atsSafety: 'ATS Safety',
    },
    formats: [
      {
        name: '1. Chronological',
        badge: 'Most Popular',
        badgeColor: 'green',
        bestFor: [
          'Consistent work history',
          'Staying in the same industry',
          'Climbing the corporate ladder',
        ],
        avoidIf: 'You have major employment gaps or are changing careers completely.',
        atsScore: 100,
        atsColor: 'green',
      },
      {
        name: '2. Functional',
        badge: 'Skills-Based',
        badgeColor: 'amber',
        bestFor: [
          'Major career changers',
          'Long employment gaps',
          'Freelancers / Gig workers',
        ],
        avoidIf: "You have a traditional career path (recruiters might think you're hiding something).",
        atsScore: 70,
        atsColor: 'amber',
      },
      {
        name: '3. Combination',
        badge: 'Hybrid',
        badgeColor: 'blue',
        bestFor: [
          'Senior Executives',
          'Highly specialized experts',
          'Diverse skill sets',
        ],
        avoidIf: "Entry-level candidates (you don't have enough skills yet).",
        atsScore: 95,
        atsColor: 'green',
      },
    ],
  },
  chronological: {
    title: '1. The Chronological Resume Format',
    description: 'This is the gold standard. When a recruiter opens a resume, their brain is wired to look for this format. It lists your work history in <strong>reverse-chronological order</strong> (newest job first).',
    whyLoveTitle: 'Why Recruiters Love It:',
    whyLoveText: "It tells a clear story of your career progression. They can instantly see where you've been and how you've grown.",
    structureTitle: 'Structure:',
    sections: [
      { label: 'Header (Name & Contact)' },
      { label: 'Professional Summary' },
      { label: 'Work Experience (The Core)', detail: 'Job 1 (Current) / Job 2 (Previous) / Job 3 (Previous)', isCore: true },
      { label: 'Education' },
      { label: 'Skills' },
    ],
    downloadLabel: 'Download Word Template',
    aiLabel: 'Create a Chronological Resume with AI',
  },
  functional: {
    title: '2. The Functional (Skills-Based) Resume Format',
    description: 'The functional resume flips the script. Instead of focusing on <em>when</em> you worked, it focuses on <em>what you can do</em>. It groups your achievements into skill categories (e.g., "Project Management," "Sales Leadership") rather than by job title.',
    warningTitle: 'Warning:',
    warningText: 'Some Applicant Tracking Systems (ATS) struggle to read this format. Use it only if necessary (e.g., career gaps > 2 years).',
    structureTitle: 'Structure:',
    sections: [
      { label: 'Header' },
      { label: 'Summary' },
      { label: 'Relevant Skills (The Core)', detail: 'Skill Category A (3-4 bullets) / Skill Category B (3-4 bullets)', isCore: true },
      { label: 'Work History (Brief list only)' },
      { label: 'Education' },
    ],
    downloadLabel: 'Download Word Template',
    aiLabel: 'Build Functional Resume with AI',
  },
  combination: {
    title: '3. The Combination (Hybrid) Format',
    description: 'As the name suggests, this blends the best of both worlds. It starts with a detailed skills summary (like a Functional resume) but follows it with a robust chronological work history.',
    whoForTitle: 'Who Is It For?',
    whoForItems: [
      'Senior Executives',
      'Career Pivoters (Expert level)',
    ],
    downloadLabel: 'Download Word Template',
    aiLabel: 'Build Combination Resume with AI',
  },
  faq: {
    title: 'Frequently Asked Questions',
    items: [
      {
        question: 'Which resume format is best for students?',
        answer: 'The Chronological format is still best. Place your Education section above your Work Experience if you are a new grad.',
      },
      {
        question: 'Does ATS read PDF files?',
        answer: 'Yes, modern ATS can read PDFs. However, stick to standard fonts and avoid using columns or graphics, as these can confuse the parser regardless of file format.',
      },
      {
        question: 'Can I switch formats mid-career?',
        answer: 'Absolutely. If you are pivoting to a new industry, a Combination format allows you to highlight your transferable skills first.',
      },
      {
        question: 'What is the most common resume format?',
        answer: 'The reverse-chronological format is used by over 90% of job seekers. It lists your most recent experience first and is the format recruiters and ATS systems are most familiar with.',
      },
      {
        question: 'Should I use a one-column or two-column resume format?',
        answer: 'Use a single-column format for maximum ATS compatibility. Two-column layouts can confuse parsing software, causing information to be read out of order or skipped entirely.',
      },
    ],
  },
  externalResources: {
    title: 'External Resources',
    items: [
      { href: 'https://www.bls.gov/careeroutlook/2024/article/resume-tips.htm', label: 'BLS Career Outlook: Resume Tips' },
      { href: 'https://www.shrm.org/topics-tools/tools/hr-answers/what-are-applicant-tracking-systems', label: 'SHRM: Understanding ATS Systems' },
    ],
  },
  stickyCta: {
    text: 'Confused by formatting?',
    ctaLabel: 'Use AI Builder',
  },
  bottomCta: {
    title: 'Stop Fighting with Margins',
    description: 'Our AI Resume Builder automatically handles formatting, fonts, and margins. Choose from 20+ recruiter-approved templates and switch formats with one click.',
    ctaLabel: 'Build My Resume Free',
  },
};

// ── Spanish ─────────────────────────────────────────────────────────

const es: ResumeFormatPageContent = {
  meta: {
    title: 'Formato de Currículum Vitae 2026: Cronológico, Funcional y Combinado (Plantillas Gratis) | Best AI Resume',
    description: 'Elige el mejor formato de currículum vitae para tu carrera. Compara los tipos de currículum cronológico, funcional y combinado con plantillas descargables gratis. Guía ATS actualizada 2026.',
    keywords: 'formato de curriculum vitae, formato de curriculum, tipos de curriculum vitae, curriculum cronologico, curriculum funcional, curriculum combinado, formato cv 2026, plantilla curriculum vitae',
  },
  schemas: {
    breadcrumbName: 'Guía de Formato de Currículum',
    howToName: 'Cómo Elegir el Formato de Currículum Adecuado',
    howToDescription: 'Aprende qué formato de currículum vitae es mejor según tu situación profesional: cronológico, funcional o combinado.',
    howToSteps: [
      'Evalúa tu situación profesional: progresión estable, cambio de carrera o períodos sin empleo',
      'Elige el formato cronológico si tienes un historial laboral constante en la misma industria',
      'Elige el formato funcional para cambios de carrera o períodos prolongados sin empleo',
      'Elige el formato combinado para puestos directivos o experiencia altamente especializada',
      'Descarga una plantilla y personalízala con tu información',
    ],
    howToToolName: 'Creador de Currículum con IA',
  },
  hero: {
    badge: 'Actualizado para 2026',
    title: 'Mejores Formatos de Currículum Vitae 2026',
    titleHighlight: '(Plantillas Gratis)',
    subtitle: 'Deja de adivinar. Descubre los 3 formatos de currículum vitae estándar que usan el 99% de los reclutadores y aprende exactamente cuándo usar cada uno para superar los filtros ATS.',
    ctaCompare: 'Comparar Formatos',
    ctaBuild: 'Crear Mi Currículum Ahora',
  },
  comparison: {
    title: '¿Qué Formato de Currículum Te Conviene?',
    subtitle: 'No le des más vueltas. Busca tu situación profesional a continuación.',
    tableHeaders: {
      format: 'Formato',
      bestFor: 'Ideal Para',
      avoidIf: 'Evitar Si',
      atsSafety: 'Compatibilidad ATS',
    },
    formats: [
      {
        name: '1. Cronológico',
        badge: 'Más Popular',
        badgeColor: 'green',
        bestFor: [
          'Historial laboral continuo',
          'Misma industria o sector',
          'Crecimiento profesional ascendente',
        ],
        avoidIf: 'Tienes vacíos laborales importantes o estás cambiando completamente de carrera.',
        atsScore: 100,
        atsColor: 'green',
      },
      {
        name: '2. Funcional',
        badge: 'Basado en Habilidades',
        badgeColor: 'amber',
        bestFor: [
          'Cambio de carrera profesional',
          'Períodos largos sin empleo',
          'Freelancers / Trabajadores independientes',
        ],
        avoidIf: 'Tienes una trayectoria profesional tradicional (los reclutadores pueden pensar que ocultas algo).',
        atsScore: 70,
        atsColor: 'amber',
      },
      {
        name: '3. Combinado',
        badge: 'Híbrido',
        badgeColor: 'blue',
        bestFor: [
          'Ejecutivos y directivos',
          'Especialistas con alta experiencia',
          'Perfiles con habilidades diversas',
        ],
        avoidIf: 'Recién egresados o perfiles junior (aún no tienes suficientes habilidades para destacar).',
        atsScore: 95,
        atsColor: 'green',
      },
    ],
  },
  chronological: {
    title: '1. El Formato de Currículum Cronológico',
    description: 'Este es el estándar de oro del formato de currículum vitae. Cuando un reclutador abre un CV, su mente busca automáticamente esta estructura. Lista tu experiencia laboral en <strong>orden cronológico inverso</strong> (el empleo más reciente primero).',
    whyLoveTitle: 'Por Qué Lo Prefieren los Reclutadores:',
    whyLoveText: 'Cuenta una historia clara de tu progresión profesional. Pueden ver al instante dónde has trabajado y cómo has crecido dentro de tu sector.',
    structureTitle: 'Estructura:',
    sections: [
      { label: 'Encabezado (Nombre y Contacto)' },
      { label: 'Perfil Profesional' },
      { label: 'Experiencia Laboral (El Núcleo)', detail: 'Puesto 1 (Actual) / Puesto 2 (Anterior) / Puesto 3 (Anterior)', isCore: true },
      { label: 'Formación Académica' },
      { label: 'Habilidades' },
    ],
    downloadLabel: 'Descargar Plantilla Word',
    aiLabel: 'Crear Currículum Cronológico con IA',
  },
  functional: {
    title: '2. El Formato de Currículum Funcional (Basado en Habilidades)',
    description: 'El currículum funcional invierte el enfoque tradicional. En lugar de centrarse en <em>cuándo</em> trabajaste, destaca <em>lo que sabes hacer</em>. Agrupa tus logros en categorías de habilidades (por ejemplo, "Gestión de Proyectos," "Liderazgo Comercial") en vez de organizarlos por puesto de trabajo.',
    warningTitle: 'Advertencia:',
    warningText: 'Algunos sistemas de seguimiento de candidatos (ATS) tienen dificultades para leer este formato. Úsalo solo cuando sea necesario (por ejemplo, vacíos laborales de más de 2 años).',
    structureTitle: 'Estructura:',
    sections: [
      { label: 'Encabezado' },
      { label: 'Resumen' },
      { label: 'Habilidades Relevantes (El Núcleo)', detail: 'Categoría A (3-4 logros) / Categoría B (3-4 logros)', isCore: true },
      { label: 'Historial Laboral (Solo lista breve)' },
      { label: 'Formación Académica' },
    ],
    downloadLabel: 'Descargar Plantilla Word',
    aiLabel: 'Crear Currículum Funcional con IA',
  },
  combination: {
    title: '3. El Formato de Currículum Combinado (Híbrido)',
    description: 'Como su nombre lo indica, este formato de currículum vitae combina lo mejor de ambos mundos. Comienza con un resumen detallado de habilidades (como el funcional) seguido de un historial laboral cronológico completo.',
    whoForTitle: '¿Para Quién Es?',
    whoForItems: [
      'Ejecutivos y Directivos Senior',
      'Profesionales en Transición de Carrera (Nivel Experto)',
    ],
    downloadLabel: 'Descargar Plantilla Word',
    aiLabel: 'Crear Currículum Combinado con IA',
  },
  faq: {
    title: 'Preguntas Frecuentes sobre Formato de Currículum',
    items: [
      {
        question: '¿Qué formato de currículum vitae es mejor para recién egresados?',
        answer: 'El formato cronológico sigue siendo la mejor opción. Si eres recién egresado, coloca la sección de Formación Académica por encima de la Experiencia Laboral para compensar la falta de trayectoria profesional.',
      },
      {
        question: '¿Los sistemas ATS pueden leer archivos PDF?',
        answer: 'Sí, los sistemas ATS modernos leen PDF sin problemas. Sin embargo, usa fuentes estándar y evita columnas o gráficos decorativos, ya que pueden confundir al analizador independientemente del formato de archivo.',
      },
      {
        question: '¿Puedo cambiar de formato de currículum a mitad de carrera?',
        answer: 'Por supuesto. Si estás haciendo una transición hacia una nueva industria, el formato combinado te permite destacar primero tus habilidades transferibles y luego respaldarlas con tu historial laboral.',
      },
      {
        question: '¿Cuál es el formato de currículum más utilizado?',
        answer: 'El formato cronológico inverso lo usa más del 90% de los candidatos. Lista tu experiencia más reciente primero y es el tipo de currículum vitae con el que los reclutadores y los sistemas ATS están más familiarizados.',
      },
      {
        question: '¿Debo usar un currículum de una columna o dos columnas?',
        answer: 'Usa un formato de una sola columna para máxima compatibilidad con ATS. Los diseños de dos columnas pueden confundir al software de análisis, provocando que la información se lea desordenada o se omita por completo.',
      },
    ],
  },
  externalResources: {
    title: 'Recursos Externos',
    items: [
      { href: 'https://www.bls.gov/careeroutlook/2024/article/resume-tips.htm', label: 'BLS Career Outlook: Consejos para el Currículum' },
      { href: 'https://www.shrm.org/topics-tools/tools/hr-answers/what-are-applicant-tracking-systems', label: 'SHRM: Entendiendo los Sistemas ATS' },
    ],
  },
  stickyCta: {
    text: '¿El formato te confunde?',
    ctaLabel: 'Usar el Constructor IA',
  },
  bottomCta: {
    title: 'Deja de Pelear con los Márgenes',
    description: 'Nuestro constructor de currículum con IA se encarga automáticamente del formato, las fuentes y los márgenes. Elige entre más de 20 plantillas aprobadas por reclutadores y cambia de formato con un solo clic.',
    ctaLabel: 'Crear Mi Currículum Gratis',
  },
};

// ── Export ───────────────────────────────────────────────────────────

const contentMap: Record<string, ResumeFormatPageContent> = { en, es };

export function getContent(locale: string): ResumeFormatPageContent {
  return selectContent(contentMap, locale);
}
