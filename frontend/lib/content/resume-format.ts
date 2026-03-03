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

// ── French ─────────────────────────────────────────────────────────

const fr: ResumeFormatPageContent = {
  meta: {
    title: 'Guide des Formats de CV 2026 : Chronologique, Fonctionnel & Combiné (Modèles Gratuits) | Best AI Resume',
    description: 'Choisissez le meilleur format de CV pour votre carrière. Comparez les formats chronologique, fonctionnel et combiné avec des modèles téléchargeables gratuits. Guide ATS mis à jour pour 2026.',
    keywords: 'format de cv, format cv 2026, cv chronologique, cv fonctionnel, cv combiné, modèle de cv, format cv ats, meilleur format de cv',
  },
  schemas: {
    breadcrumbName: 'Guide des Formats de CV',
    howToName: 'Comment Choisir le Bon Format de CV',
    howToDescription: 'Découvrez quel format de CV convient le mieux à votre situation professionnelle : chronologique, fonctionnel ou combiné.',
    howToSteps: [
      'Évaluez votre situation professionnelle : progression régulière, reconversion ou périodes d\'inactivité',
      'Choisissez le format chronologique si vous avez un parcours professionnel stable dans le même secteur',
      'Choisissez le format fonctionnel en cas de reconversion professionnelle ou de longues périodes d\'inactivité',
      'Choisissez le format combiné pour les postes de direction ou une expertise très spécialisée',
      'Téléchargez un modèle et personnalisez-le avec vos informations',
    ],
    howToToolName: 'Créateur de CV avec IA',
  },
  hero: {
    badge: 'Mis à jour pour 2026',
    title: 'Les Meilleurs Formats de CV pour 2026',
    titleHighlight: '(Modèles Gratuits)',
    subtitle: 'Arrêtez de deviner. Découvrez les 3 formats de CV standard utilisés par 99 % des recruteurs et apprenez exactement quand utiliser chacun pour passer les filtres ATS.',
    ctaCompare: 'Comparer les Formats',
    ctaBuild: 'Créer Mon CV Maintenant',
  },
  comparison: {
    title: 'Comparaison Rapide : Quel Format Vous Convient ?',
    subtitle: 'Ne vous compliquez pas la vie. Trouvez votre situation professionnelle ci-dessous.',
    tableHeaders: {
      format: 'Format',
      bestFor: 'Idéal Pour',
      avoidIf: 'À Éviter Si',
      atsSafety: 'Compatibilité ATS',
    },
    formats: [
      {
        name: '1. Chronologique',
        badge: 'Le Plus Populaire',
        badgeColor: 'green',
        bestFor: [
          'Parcours professionnel continu',
          'Même secteur d\'activité',
          'Progression de carrière ascendante',
        ],
        avoidIf: 'Vous avez des périodes d\'inactivité importantes ou êtes en pleine reconversion professionnelle.',
        atsScore: 100,
        atsColor: 'green',
      },
      {
        name: '2. Fonctionnel',
        badge: 'Basé sur les Compétences',
        badgeColor: 'amber',
        bestFor: [
          'Reconversion professionnelle',
          'Longues périodes d\'inactivité',
          'Freelances / Travailleurs indépendants',
        ],
        avoidIf: 'Vous avez un parcours professionnel classique (les recruteurs pourraient penser que vous cachez quelque chose).',
        atsScore: 70,
        atsColor: 'amber',
      },
      {
        name: '3. Combiné',
        badge: 'Hybride',
        badgeColor: 'blue',
        bestFor: [
          'Cadres dirigeants',
          'Experts hautement spécialisés',
          'Profils aux compétences variées',
        ],
        avoidIf: 'Débutants ou jeunes diplômés (vous n\'avez pas encore assez de compétences à mettre en avant).',
        atsScore: 95,
        atsColor: 'green',
      },
    ],
  },
  chronological: {
    title: '1. Le Format de CV Chronologique',
    description: 'C\'est la référence absolue. Quand un recruteur ouvre un CV, son cerveau est programmé pour chercher ce format. Il présente votre expérience professionnelle en <strong>ordre chronologique inversé</strong> (poste le plus récent en premier).',
    whyLoveTitle: 'Pourquoi les Recruteurs l\'Adorent :',
    whyLoveText: 'Il raconte clairement l\'histoire de votre progression professionnelle. Les recruteurs voient instantanément où vous avez travaillé et comment vous avez évolué.',
    structureTitle: 'Structure :',
    sections: [
      { label: 'En-tête (Nom et Contact)' },
      { label: 'Résumé Professionnel' },
      { label: 'Expérience Professionnelle (Le Cœur)', detail: 'Poste 1 (Actuel) / Poste 2 (Précédent) / Poste 3 (Précédent)', isCore: true },
      { label: 'Formation' },
      { label: 'Compétences' },
    ],
    downloadLabel: 'Télécharger le Modèle Word',
    aiLabel: 'Créer un CV Chronologique avec l\'IA',
  },
  functional: {
    title: '2. Le Format de CV Fonctionnel (Basé sur les Compétences)',
    description: 'Le CV fonctionnel inverse l\'approche traditionnelle. Au lieu de se concentrer sur <em>quand</em> vous avez travaillé, il met en avant <em>ce que vous savez faire</em>. Il regroupe vos réalisations par catégories de compétences (par exemple, « Gestion de Projet », « Leadership Commercial ») plutôt que par poste occupé.',
    warningTitle: 'Attention :',
    warningText: 'Certains systèmes de suivi des candidatures (ATS) ont du mal à lire ce format. Utilisez-le uniquement si nécessaire (par exemple, périodes d\'inactivité de plus de 2 ans).',
    structureTitle: 'Structure :',
    sections: [
      { label: 'En-tête' },
      { label: 'Résumé' },
      { label: 'Compétences Clés (Le Cœur)', detail: 'Catégorie A (3-4 réalisations) / Catégorie B (3-4 réalisations)', isCore: true },
      { label: 'Parcours Professionnel (Liste succincte)' },
      { label: 'Formation' },
    ],
    downloadLabel: 'Télécharger le Modèle Word',
    aiLabel: 'Créer un CV Fonctionnel avec l\'IA',
  },
  combination: {
    title: '3. Le Format de CV Combiné (Hybride)',
    description: 'Comme son nom l\'indique, ce format combine le meilleur des deux approches. Il commence par un résumé détaillé des compétences (comme le fonctionnel) suivi d\'un parcours professionnel chronologique complet.',
    whoForTitle: 'Pour Qui Est-ce ?',
    whoForItems: [
      'Cadres Dirigeants et Directeurs',
      'Professionnels en Reconversion (Niveau Expert)',
    ],
    downloadLabel: 'Télécharger le Modèle Word',
    aiLabel: 'Créer un CV Combiné avec l\'IA',
  },
  faq: {
    title: 'Questions Fréquemment Posées sur les Formats de CV',
    items: [
      {
        question: 'Quel format de CV est le meilleur pour les jeunes diplômés ?',
        answer: 'Le format chronologique reste le meilleur choix. Si vous êtes jeune diplômé, placez la section Formation au-dessus de l\'Expérience Professionnelle pour compenser le manque de parcours.',
      },
      {
        question: 'Les systèmes ATS peuvent-ils lire les fichiers PDF ?',
        answer: 'Oui, les systèmes ATS modernes lisent les PDF sans problème. Cependant, utilisez des polices standard et évitez les colonnes ou les éléments graphiques décoratifs, car ils peuvent perturber l\'analyse quel que soit le format de fichier.',
      },
      {
        question: 'Puis-je changer de format de CV en cours de carrière ?',
        answer: 'Absolument. Si vous vous orientez vers un nouveau secteur, le format combiné vous permet de mettre en avant vos compétences transférables avant de les appuyer par votre parcours professionnel.',
      },
      {
        question: 'Quel est le format de CV le plus couramment utilisé ?',
        answer: 'Le format chronologique inversé est utilisé par plus de 90 % des candidats. Il présente votre expérience la plus récente en premier et c\'est le format que les recruteurs et les systèmes ATS connaissent le mieux.',
      },
      {
        question: 'Faut-il utiliser un CV à une colonne ou à deux colonnes ?',
        answer: 'Utilisez un format à une seule colonne pour une compatibilité maximale avec les ATS. Les mises en page à deux colonnes peuvent perturber le logiciel d\'analyse, entraînant une lecture désordonnée ou l\'omission d\'informations.',
      },
    ],
  },
  externalResources: {
    title: 'Ressources Externes',
    items: [
      { href: 'https://www.bls.gov/careeroutlook/2024/article/resume-tips.htm', label: 'BLS Career Outlook : Conseils pour le CV' },
      { href: 'https://www.shrm.org/topics-tools/tools/hr-answers/what-are-applicant-tracking-systems', label: 'SHRM : Comprendre les Systèmes ATS' },
    ],
  },
  stickyCta: {
    text: 'La mise en page vous pose problème ?',
    ctaLabel: 'Utiliser le Créateur IA',
  },
  bottomCta: {
    title: 'Arrêtez de Vous Battre avec les Marges',
    description: 'Notre créateur de CV avec IA gère automatiquement la mise en forme, les polices et les marges. Choisissez parmi plus de 20 modèles approuvés par les recruteurs et changez de format en un clic.',
    ctaLabel: 'Créer Mon CV Gratuitement',
  },
};

// ── German ─────────────────────────────────────────────────────────

const de: ResumeFormatPageContent = {
  meta: {
    title: 'Lebenslauf-Format Ratgeber 2026: Chronologisch, Funktional & Kombiniert (Kostenlose Vorlagen) | Best AI Resume',
    description: 'Wählen Sie das beste Lebenslauf-Format für Ihre Karriere. Vergleichen Sie chronologische, funktionale und kombinierte Formate mit kostenlosen Vorlagen. ATS-freundlicher Ratgeber für 2026.',
    keywords: 'lebenslauf format, lebenslauf format 2026, chronologischer lebenslauf, funktionaler lebenslauf, kombinierter lebenslauf, lebenslauf vorlage, ats lebenslauf format, bestes lebenslauf format',
  },
  schemas: {
    breadcrumbName: 'Lebenslauf-Format Ratgeber',
    howToName: 'So Wählen Sie das Richtige Lebenslauf-Format',
    howToDescription: 'Erfahren Sie, welches Lebenslauf-Format am besten zu Ihrer beruflichen Situation passt: chronologisch, funktional oder kombiniert.',
    howToSteps: [
      'Bewerten Sie Ihre berufliche Situation: stetige Entwicklung, Karrierewechsel oder Lücken',
      'Wählen Sie das chronologische Format bei einem durchgängigen Werdegang in derselben Branche',
      'Wählen Sie das funktionale Format bei einem Karrierewechsel oder längeren Beschäftigungslücken',
      'Wählen Sie das kombinierte Format für Führungspositionen oder hochspezialisierte Fachkenntnisse',
      'Laden Sie eine Vorlage herunter und passen Sie sie mit Ihren Informationen an',
    ],
    howToToolName: 'KI-Lebenslauf-Ersteller',
  },
  hero: {
    badge: 'Aktualisiert für 2026',
    title: 'Die Besten Lebenslauf-Formate für 2026',
    titleHighlight: '(Kostenlose Vorlagen)',
    subtitle: 'Schluss mit dem Raten. Entdecken Sie die 3 Standard-Lebenslauf-Formate, die 99 % der Personalverantwortlichen nutzen, und erfahren Sie genau, wann Sie welches Format verwenden sollten, um ATS-Filter zu bestehen.',
    ctaCompare: 'Formate Vergleichen',
    ctaBuild: 'Meinen Lebenslauf Erstellen',
  },
  comparison: {
    title: 'Schneller Vergleich: Welches Format Passt zu Ihnen?',
    subtitle: 'Machen Sie es sich nicht zu kompliziert. Finden Sie Ihre berufliche Situation unten.',
    tableHeaders: {
      format: 'Format',
      bestFor: 'Ideal Für',
      avoidIf: 'Vermeiden Wenn',
      atsSafety: 'ATS-Kompatibilität',
    },
    formats: [
      {
        name: '1. Chronologisch',
        badge: 'Am Beliebtesten',
        badgeColor: 'green',
        bestFor: [
          'Durchgängiger beruflicher Werdegang',
          'Gleiche Branche oder gleicher Sektor',
          'Aufsteigende Karriereentwicklung',
        ],
        avoidIf: 'Sie haben größere Beschäftigungslücken oder befinden sich mitten in einem Karrierewechsel.',
        atsScore: 100,
        atsColor: 'green',
      },
      {
        name: '2. Funktional',
        badge: 'Kompetenzbasiert',
        badgeColor: 'amber',
        bestFor: [
          'Berufliche Neuorientierung',
          'Längere Beschäftigungslücken',
          'Freiberufler / Selbstständige',
        ],
        avoidIf: 'Sie haben einen klassischen Karriereweg (Personalverantwortliche könnten denken, Sie verbergen etwas).',
        atsScore: 70,
        atsColor: 'amber',
      },
      {
        name: '3. Kombiniert',
        badge: 'Hybrid',
        badgeColor: 'blue',
        bestFor: [
          'Führungskräfte und Geschäftsführer',
          'Hochspezialisierte Fachexperten',
          'Profile mit vielfältigen Kompetenzen',
        ],
        avoidIf: 'Berufseinsteiger oder Absolventen (Sie verfügen noch nicht über genügend Kompetenzen).',
        atsScore: 95,
        atsColor: 'green',
      },
    ],
  },
  chronological: {
    title: '1. Das Chronologische Lebenslauf-Format',
    description: 'Dies ist der Goldstandard. Wenn ein Personalverantwortlicher einen Lebenslauf öffnet, sucht er instinktiv nach diesem Format. Es listet Ihren beruflichen Werdegang in <strong>umgekehrt chronologischer Reihenfolge</strong> auf (aktuellste Stelle zuerst).',
    whyLoveTitle: 'Warum Personalverantwortliche es Bevorzugen:',
    whyLoveText: 'Es erzählt die Geschichte Ihrer Karriereentwicklung klar und deutlich. Man sieht sofort, wo Sie gearbeitet haben und wie Sie sich weiterentwickelt haben.',
    structureTitle: 'Aufbau:',
    sections: [
      { label: 'Kopfzeile (Name und Kontakt)' },
      { label: 'Berufliches Profil' },
      { label: 'Berufserfahrung (Der Kern)', detail: 'Stelle 1 (Aktuell) / Stelle 2 (Vorherige) / Stelle 3 (Vorherige)', isCore: true },
      { label: 'Ausbildung' },
      { label: 'Kompetenzen' },
    ],
    downloadLabel: 'Word-Vorlage Herunterladen',
    aiLabel: 'Chronologischen Lebenslauf mit KI Erstellen',
  },
  functional: {
    title: '2. Das Funktionale (Kompetenzbasierte) Lebenslauf-Format',
    description: 'Der funktionale Lebenslauf kehrt den traditionellen Ansatz um. Statt sich darauf zu konzentrieren, <em>wann</em> Sie gearbeitet haben, hebt er hervor, <em>was Sie können</em>. Er gruppiert Ihre Erfolge nach Kompetenzkategorien (z. B. „Projektmanagement", „Vertriebsleitung") statt nach Stellenbezeichnung.',
    warningTitle: 'Achtung:',
    warningText: 'Einige Bewerbermanagementsysteme (ATS) haben Schwierigkeiten, dieses Format zu lesen. Verwenden Sie es nur wenn nötig (z. B. bei Beschäftigungslücken von mehr als 2 Jahren).',
    structureTitle: 'Aufbau:',
    sections: [
      { label: 'Kopfzeile' },
      { label: 'Zusammenfassung' },
      { label: 'Relevante Kompetenzen (Der Kern)', detail: 'Kategorie A (3-4 Erfolge) / Kategorie B (3-4 Erfolge)', isCore: true },
      { label: 'Beruflicher Werdegang (Nur Kurzübersicht)' },
      { label: 'Ausbildung' },
    ],
    downloadLabel: 'Word-Vorlage Herunterladen',
    aiLabel: 'Funktionalen Lebenslauf mit KI Erstellen',
  },
  combination: {
    title: '3. Das Kombinierte (Hybride) Format',
    description: 'Wie der Name schon sagt, vereint dieses Format das Beste aus beiden Ansätzen. Es beginnt mit einer ausführlichen Kompetenzübersicht (wie beim funktionalen Format) gefolgt von einem vollständigen chronologischen Werdegang.',
    whoForTitle: 'Für Wen Ist Es Geeignet?',
    whoForItems: [
      'Führungskräfte und Geschäftsführer',
      'Quereinsteiger auf Expertenniveau',
    ],
    downloadLabel: 'Word-Vorlage Herunterladen',
    aiLabel: 'Kombinierten Lebenslauf mit KI Erstellen',
  },
  faq: {
    title: 'Häufig Gestellte Fragen zu Lebenslauf-Formaten',
    items: [
      {
        question: 'Welches Lebenslauf-Format ist für Absolventen am besten?',
        answer: 'Das chronologische Format bleibt die beste Wahl. Wenn Sie frisch von der Universität kommen, setzen Sie den Abschnitt Ausbildung über die Berufserfahrung, um den noch geringen Werdegang auszugleichen.',
      },
      {
        question: 'Können ATS-Systeme PDF-Dateien lesen?',
        answer: 'Ja, moderne ATS-Systeme lesen PDFs problemlos. Verwenden Sie jedoch Standardschriften und vermeiden Sie Spalten oder dekorative Grafiken, da diese den Parser unabhängig vom Dateiformat verwirren können.',
      },
      {
        question: 'Kann ich das Format mitten in der Karriere wechseln?',
        answer: 'Selbstverständlich. Wenn Sie in eine neue Branche wechseln möchten, ermöglicht Ihnen das kombinierte Format, Ihre übertragbaren Kompetenzen in den Vordergrund zu stellen und sie mit Ihrem Werdegang zu untermauern.',
      },
      {
        question: 'Welches ist das am häufigsten verwendete Lebenslauf-Format?',
        answer: 'Das umgekehrt chronologische Format wird von über 90 % der Bewerber verwendet. Es listet Ihre aktuellste Erfahrung zuerst auf und ist das Format, das Personalverantwortlichen und ATS-Systemen am vertrautesten ist.',
      },
      {
        question: 'Sollte ich einen einspaltigen oder zweispaltigen Lebenslauf verwenden?',
        answer: 'Verwenden Sie ein einspaltiges Format für maximale ATS-Kompatibilität. Zweispaltige Layouts können die Analysesoftware verwirren, sodass Informationen in falscher Reihenfolge gelesen oder ganz übersprungen werden.',
      },
    ],
  },
  externalResources: {
    title: 'Externe Ressourcen',
    items: [
      { href: 'https://www.bls.gov/careeroutlook/2024/article/resume-tips.htm', label: 'BLS Career Outlook: Tipps für den Lebenslauf' },
      { href: 'https://www.shrm.org/topics-tools/tools/hr-answers/what-are-applicant-tracking-systems', label: 'SHRM: ATS-Systeme Verstehen' },
    ],
  },
  stickyCta: {
    text: 'Probleme mit der Formatierung?',
    ctaLabel: 'KI-Ersteller Nutzen',
  },
  bottomCta: {
    title: 'Schluss mit dem Kampf um Seitenränder',
    description: 'Unser KI-Lebenslauf-Ersteller kümmert sich automatisch um Formatierung, Schriftarten und Seitenränder. Wählen Sie aus über 20 von Personalverantwortlichen empfohlenen Vorlagen und wechseln Sie das Format mit einem Klick.',
    ctaLabel: 'Meinen Lebenslauf Kostenlos Erstellen',
  },
};

// ── Arabic ─────────────────────────────────────────────────────────

const ar: ResumeFormatPageContent = {
  meta: {
    title: 'دليل تنسيق السيرة الذاتية 2026: الترتيب الزمني والوظيفي والمدمج (قوالب مجانية) | Best AI Resume',
    description: 'اختر أفضل تنسيق للسيرة الذاتية لمسيرتك المهنية. قارن بين التنسيقات الزمنية والوظيفية والمدمجة مع قوالب قابلة للتحميل مجاناً. دليل متوافق مع ATS محدّث لعام 2026.',
    keywords: 'تنسيق السيرة الذاتية, تنسيق السيرة الذاتية 2026, سيرة ذاتية زمنية, سيرة ذاتية وظيفية, سيرة ذاتية مدمجة, قالب سيرة ذاتية, تنسيق سيرة ذاتية ats, أفضل تنسيق سيرة ذاتية',
  },
  schemas: {
    breadcrumbName: 'دليل تنسيق السيرة الذاتية',
    howToName: 'كيف تختار التنسيق المناسب للسيرة الذاتية',
    howToDescription: 'تعرّف على تنسيق السيرة الذاتية الأنسب لوضعك المهني: الزمني أو الوظيفي أو المدمج.',
    howToSteps: [
      'قيّم وضعك المهني: تقدم مستمر، تغيير مسار وظيفي، أو فجوات في التوظيف',
      'اختر التنسيق الزمني إذا كان لديك سجل عمل مستمر في نفس المجال',
      'اختر التنسيق الوظيفي عند تغيير المسار المهني أو وجود فجوات طويلة في التوظيف',
      'اختر التنسيق المدمج للمناصب القيادية أو الخبرات المتخصصة للغاية',
      'حمّل قالباً وخصّصه بمعلوماتك الشخصية',
    ],
    howToToolName: 'منشئ السيرة الذاتية بالذكاء الاصطناعي',
  },
  hero: {
    badge: 'محدّث لعام 2026',
    title: 'أفضل تنسيقات السيرة الذاتية لعام 2026',
    titleHighlight: '(قوالب مجانية)',
    subtitle: 'توقف عن التخمين. اكتشف تنسيقات السيرة الذاتية الثلاثة المعتمدة لدى 99% من مسؤولي التوظيف، وتعلّم متى تستخدم كل تنسيق لاجتياز أنظمة ATS.',
    ctaCompare: 'مقارنة التنسيقات',
    ctaBuild: 'إنشاء سيرتي الذاتية الآن',
  },
  comparison: {
    title: 'مقارنة سريعة: أي تنسيق يناسبك؟',
    subtitle: 'لا تُعقّد الأمور. ابحث عن وضعك المهني أدناه.',
    tableHeaders: {
      format: 'التنسيق',
      bestFor: 'الأنسب لـ',
      avoidIf: 'تجنّبه إذا',
      atsSafety: 'توافق ATS',
    },
    formats: [
      {
        name: '1. الزمني',
        badge: 'الأكثر شيوعاً',
        badgeColor: 'green',
        bestFor: [
          'سجل عمل مستمر',
          'البقاء في نفس المجال',
          'تقدم وظيفي تصاعدي',
        ],
        avoidIf: 'لديك فجوات توظيف كبيرة أو تغيّر مسارك المهني بالكامل.',
        atsScore: 100,
        atsColor: 'green',
      },
      {
        name: '2. الوظيفي',
        badge: 'قائم على المهارات',
        badgeColor: 'amber',
        bestFor: [
          'تغيير المسار المهني',
          'فجوات توظيف طويلة',
          'العمل الحر / العمل المستقل',
        ],
        avoidIf: 'لديك مسار مهني تقليدي (قد يظن مسؤولو التوظيف أنك تخفي شيئاً).',
        atsScore: 70,
        atsColor: 'amber',
      },
      {
        name: '3. المدمج',
        badge: 'هجين',
        badgeColor: 'blue',
        bestFor: [
          'المدراء التنفيذيون',
          'الخبراء المتخصصون',
          'أصحاب المهارات المتنوعة',
        ],
        avoidIf: 'حديثو التخرج أو المبتدئون (لا تملك بعد مهارات كافية لإبرازها).',
        atsScore: 95,
        atsColor: 'green',
      },
    ],
  },
  chronological: {
    title: '1. تنسيق السيرة الذاتية الزمني',
    description: 'هذا هو المعيار الذهبي. عندما يفتح مسؤول التوظيف سيرة ذاتية، فإن ذهنه مبرمج للبحث عن هذا التنسيق. يعرض تاريخك المهني بـ<strong>ترتيب زمني عكسي</strong> (الوظيفة الأحدث أولاً).',
    whyLoveTitle: 'لماذا يفضّله مسؤولو التوظيف:',
    whyLoveText: 'يروي قصة واضحة عن تطورك المهني. يمكنهم فوراً رؤية أين عملت وكيف تقدمت في مسيرتك.',
    structureTitle: 'الهيكل:',
    sections: [
      { label: 'العنوان (الاسم ومعلومات الاتصال)' },
      { label: 'الملخص المهني' },
      { label: 'الخبرة المهنية (الجوهر)', detail: 'الوظيفة 1 (الحالية) / الوظيفة 2 (السابقة) / الوظيفة 3 (السابقة)', isCore: true },
      { label: 'التعليم' },
      { label: 'المهارات' },
    ],
    downloadLabel: 'تحميل قالب Word',
    aiLabel: 'إنشاء سيرة ذاتية زمنية بالذكاء الاصطناعي',
  },
  functional: {
    title: '2. تنسيق السيرة الذاتية الوظيفي (القائم على المهارات)',
    description: 'السيرة الذاتية الوظيفية تعكس النهج التقليدي. بدلاً من التركيز على <em>متى</em> عملت، تركّز على <em>ما تستطيع فعله</em>. تجمع إنجازاتك في فئات مهارات (مثل «إدارة المشاريع»، «قيادة المبيعات») بدلاً من ترتيبها حسب المسمى الوظيفي.',
    warningTitle: 'تحذير:',
    warningText: 'بعض أنظمة تتبع المتقدمين (ATS) تواجه صعوبة في قراءة هذا التنسيق. استخدمه فقط عند الضرورة (مثلاً، فجوات توظيف تزيد عن سنتين).',
    structureTitle: 'الهيكل:',
    sections: [
      { label: 'العنوان' },
      { label: 'الملخص' },
      { label: 'المهارات ذات الصلة (الجوهر)', detail: 'الفئة أ (3-4 إنجازات) / الفئة ب (3-4 إنجازات)', isCore: true },
      { label: 'التاريخ الوظيفي (قائمة مختصرة فقط)' },
      { label: 'التعليم' },
    ],
    downloadLabel: 'تحميل قالب Word',
    aiLabel: 'إنشاء سيرة ذاتية وظيفية بالذكاء الاصطناعي',
  },
  combination: {
    title: '3. التنسيق المدمج (الهجين)',
    description: 'كما يوحي الاسم، يجمع هذا التنسيق بين أفضل ما في الأسلوبين. يبدأ بملخص مفصّل للمهارات (كالتنسيق الوظيفي) يليه سجل عمل زمني شامل.',
    whoForTitle: 'لمن هو مناسب؟',
    whoForItems: [
      'المدراء التنفيذيون وكبار القياديين',
      'المهنيون الذين يغيرون مسارهم (مستوى خبير)',
    ],
    downloadLabel: 'تحميل قالب Word',
    aiLabel: 'إنشاء سيرة ذاتية مدمجة بالذكاء الاصطناعي',
  },
  faq: {
    title: 'الأسئلة الشائعة حول تنسيقات السيرة الذاتية',
    items: [
      {
        question: 'ما أفضل تنسيق سيرة ذاتية لحديثي التخرج؟',
        answer: 'التنسيق الزمني لا يزال الخيار الأفضل. إذا كنت حديث التخرج، ضع قسم التعليم فوق قسم الخبرة المهنية لتعويض قلة الخبرة العملية.',
      },
      {
        question: 'هل تستطيع أنظمة ATS قراءة ملفات PDF؟',
        answer: 'نعم، أنظمة ATS الحديثة تقرأ ملفات PDF بسهولة. لكن استخدم خطوطاً قياسية وتجنّب الأعمدة أو الرسومات الزخرفية، لأنها قد تربك المحلل بغض النظر عن صيغة الملف.',
      },
      {
        question: 'هل يمكنني تغيير التنسيق في منتصف مسيرتي المهنية؟',
        answer: 'بالتأكيد. إذا كنت تنتقل إلى مجال جديد، فإن التنسيق المدمج يتيح لك إبراز مهاراتك القابلة للنقل أولاً ثم دعمها بسجلك المهني.',
      },
      {
        question: 'ما هو تنسيق السيرة الذاتية الأكثر استخداماً؟',
        answer: 'التنسيق الزمني العكسي يستخدمه أكثر من 90% من الباحثين عن عمل. يعرض خبرتك الأحدث أولاً وهو التنسيق الأكثر ألفة لدى مسؤولي التوظيف وأنظمة ATS.',
      },
      {
        question: 'هل أستخدم سيرة ذاتية بعمود واحد أم عمودين؟',
        answer: 'استخدم تنسيق العمود الواحد لأقصى توافق مع أنظمة ATS. تخطيطات العمودين قد تربك برنامج التحليل، مما يؤدي إلى قراءة المعلومات بترتيب خاطئ أو تخطيها بالكامل.',
      },
    ],
  },
  externalResources: {
    title: 'مصادر خارجية',
    items: [
      { href: 'https://www.bls.gov/careeroutlook/2024/article/resume-tips.htm', label: 'BLS Career Outlook: نصائح للسيرة الذاتية' },
      { href: 'https://www.shrm.org/topics-tools/tools/hr-answers/what-are-applicant-tracking-systems', label: 'SHRM: فهم أنظمة ATS' },
    ],
  },
  stickyCta: {
    text: 'تواجه صعوبة في التنسيق؟',
    ctaLabel: 'استخدم المنشئ الذكي',
  },
  bottomCta: {
    title: 'توقف عن معاناة الهوامش والتنسيق',
    description: 'منشئ السيرة الذاتية بالذكاء الاصطناعي يتولى تلقائياً التنسيق والخطوط والهوامش. اختر من بين أكثر من 20 قالباً معتمداً من مسؤولي التوظيف وبدّل التنسيق بنقرة واحدة.',
    ctaLabel: 'إنشاء سيرتي الذاتية مجاناً',
  },
};

// ── Japanese ──────────────────────────────────────────────────────────

const ja: ResumeFormatPageContent = {
  meta: {
    title: '履歴書フォーマット完全ガイド2026 | 履歴書作成ツール | Best AI Resume',
    description: '履歴書フォーマットの選び方を徹底解説。逆年代順・機能別・混合形式を比較し、あなたのキャリアに最適な履歴書サンプルを見つけましょう。ATS対応テンプレート20種以上。',
    keywords: '履歴書フォーマット, 履歴書作成ツール, 履歴書サンプル, AI履歴書, 職務経歴書, 履歴書テンプレート, ATS対応履歴書, 履歴書の書き方',
  },
  schemas: {
    breadcrumbName: '履歴書フォーマット',
    howToName: '適切な履歴書フォーマットの選び方',
    howToDescription: '3つの主要な履歴書フォーマット（逆年代順・機能別・混合形式）を比較し、あなたのキャリア段階と目標に最適なフォーマットを選びましょう。',
    howToSteps: [
      '自分のキャリア段階を分析する（新卒、中堅、管理職など）',
      '3つのフォーマットの長所と短所を比較する',
      'ATS適合性スコアを確認する',
      'テンプレートを選んで履歴書を作成する',
    ],
    howToToolName: 'Best AI Resume 履歴書作成ツール',
  },
  hero: {
    badge: '履歴書フォーマットガイド 2026',
    title: '最適な履歴書フォーマットを',
    titleHighlight: '選びましょう',
    subtitle: '逆年代順・機能別・混合形式——あなたのキャリアに合った<strong>履歴書フォーマット</strong>を選ぶことが、書類選考突破の第一歩です。AI履歴書作成ツールを使えば、フォーマットの切り替えもワンクリックで完了します。',
    ctaCompare: 'フォーマットを比較する',
    ctaBuild: '履歴書を無料で作成',
  },
  comparison: {
    title: '3大履歴書フォーマット比較',
    subtitle: 'それぞれのフォーマットの特徴、最適な利用シーン、ATS対応度を一目で確認できます。',
    tableHeaders: {
      format: 'フォーマット',
      bestFor: '最適な利用シーン',
      avoidIf: '避けるべき場合',
      atsSafety: 'ATS適合度',
    },
    formats: [
      {
        name: '逆年代順',
        badge: '最も人気',
        badgeColor: 'green',
        bestFor: ['キャリアに空白期間がない方', '同じ業界でステップアップを目指す方', '直近の職歴が応募職種に直結する方'],
        avoidIf: '長期間のブランクがある場合',
        atsScore: 98,
        atsColor: 'green',
      },
      {
        name: '機能別（スキルベース）',
        badge: 'スキル重視',
        badgeColor: 'amber',
        bestFor: ['転職やキャリアチェンジをする方', '職歴に空白期間がある方', '新卒やフリーランスの方'],
        avoidIf: '従来型の企業・業界に応募する場合',
        atsScore: 72,
        atsColor: 'amber',
      },
      {
        name: '混合形式',
        badge: 'バランス型',
        badgeColor: 'blue',
        bestFor: ['強いスキルセットと豊富な職歴がある方', '管理職・シニアレベルのポジション', 'スキルと実績の両方をアピールしたい方'],
        avoidIf: '職務経験が少ない場合',
        atsScore: 90,
        atsColor: 'green',
      },
    ],
  },
  chronological: {
    title: '逆年代順フォーマット',
    description: '最も新しい職歴から順に記載するフォーマットです。日本の採用担当者に最も馴染みがあり、ATS（応募者追跡システム）との互換性も最高です。',
    whyLoveTitle: '採用担当者が好む理由',
    whyLoveText: '逆年代順の履歴書は、キャリアの成長過程が一目で分かるため、採用担当者が最も読みやすいフォーマットです。ATSの解析精度も高く、大手企業への応募に最適です。',
    structureTitle: 'セクション構成',
    sections: [
      { label: '氏名・連絡先', detail: '名前、メール、電話番号、所在地', isCore: true },
      { label: '職務要約', detail: '3〜4行で経験とスキルの概要を記載', isCore: true },
      { label: '職務経歴', detail: '最新の職歴から順に記載（会社名・期間・成果）', isCore: true },
      { label: '学歴', detail: '最終学歴を記載' },
      { label: 'スキル', detail: '職種に関連する技術スキル・資格' },
    ],
    downloadLabel: 'テンプレートをダウンロード',
    aiLabel: 'AIで作成する',
  },
  functional: {
    title: '機能別（スキルベース）フォーマット',
    description: 'スキルと能力を中心に構成するフォーマットです。職歴よりも「何ができるか」を強調したい場合に適しています。',
    warningTitle: 'ATS互換性に注意',
    warningText: '一部のATSでは職歴セクションが短いと解析精度が下がる可能性があります。キャリアチェンジ中の方、ブランクがある方、フリーランスから正社員へ転向する方に最適ですが、従来型の企業・業界への応募には注意が必要です。',
    structureTitle: 'セクション構成',
    sections: [
      { label: '氏名・連絡先', isCore: true },
      { label: '職務要約', isCore: true },
      { label: 'スキルカテゴリ', detail: '3〜4つのスキル分野ごとに実績を記載', isCore: true },
      { label: '職歴（簡略版）', detail: '会社名・役職・在籍期間のみ' },
      { label: '学歴' },
    ],
    downloadLabel: 'テンプレートをダウンロード',
    aiLabel: 'AIで作成する',
  },
  combination: {
    title: '混合形式フォーマット',
    description: '逆年代順と機能別の長所を組み合わせたフォーマットです。豊富なスキルと充実した職歴の両方をアピールできます。',
    whoForTitle: 'このフォーマットが適しているケース',
    whoForItems: [
      '中堅〜シニアレベルの専門職やマネジメント経験がある方',
      'スキルの幅広さと職務経験の深さを同時に示したい方',
      '技術スキルと業務実績の両方が求められるポジションに応募する方',
      '複数の分野にまたがるキャリアを持つ方',
    ],
    downloadLabel: 'テンプレートをダウンロード',
    aiLabel: 'AIで作成する',
  },
  faq: {
    title: 'よくある質問',
    items: [
      { question: '日本で最も一般的な履歴書フォーマットは？', answer: '日本では逆年代順フォーマットが最も一般的です。職務経歴を最新のものから順に記載するこの形式は、採用担当者が慣れ親しんでおり、ATSとの互換性も最高です。特に正社員採用では、この形式が標準とされています。' },
      { question: '転職回数が多い場合、どのフォーマットが適していますか？', answer: '転職回数が多い場合は、混合形式がおすすめです。スキルセクションで強みを先にアピールしつつ、職歴も簡潔にまとめることで、転職回数よりも能力に焦点を当てることができます。' },
      { question: '新卒の場合、どのフォーマットを使うべきですか？', answer: '新卒の方には逆年代順フォーマットが最適です。学歴を職歴セクションの上に配置し、インターンシップやアルバイト、学業での成果を記載しましょう。AI履歴書作成ツールを使えば、新卒向けの適切な表現を自動で提案してくれます。' },
      { question: 'ATS対応の履歴書フォーマットとは何ですか？', answer: 'ATS（応募者追跡システム）が正しく読み取れるように構成された履歴書フォーマットのことです。シンプルなレイアウト、標準的なセクション名、適切なファイル形式（PDF）を使用することがポイントです。当ツールのテンプレートはすべてATS対応済みです。' },
      { question: '職務経歴書と履歴書の違いは？', answer: '日本の就職活動では、履歴書は基本的な個人情報・学歴・資格を記載する書類で、職務経歴書はこれまでの職務内容・実績を詳しく記載する書類です。両方を提出することが一般的ですが、外資系企業では英文レジュメ1枚にまとめる形式が主流です。' },
    ],
  },
  externalResources: {
    title: '参考リンク',
    items: [
      { href: 'https://www.bls.gov/ooh/', label: '米国労働統計局 職業別見通し' },
      { href: 'https://www.hellowork.go.jp/', label: 'ハローワーク インターネットサービス' },
    ],
  },
  stickyCta: {
    text: '最適な履歴書フォーマットが見つかりましたか？',
    ctaLabel: '今すぐ履歴書を作成',
  },
  bottomCta: {
    title: 'フォーマット選びに悩むのはもう終わり',
    description: 'AI履歴書作成ツールが自動でフォーマット・フォント・余白を最適化。20種以上のATS対応テンプレートから選んで、ワンクリックでフォーマットを切り替えられます。',
    ctaLabel: '履歴書を無料で作成する',
  },
};

// ── Export ───────────────────────────────────────────────────────────

const it: ResumeFormatPageContent = {
  meta: {
    title: 'Formato Curriculum Vitae: Guida Completa 2026 | Modello Curriculum Europeo | Best AI Resume',
    description: 'Scopri come scegliere il formato curriculum vitae giusto. Confronta cronologico inverso, funzionale e combinato. Modelli di curriculum europeo ATS-friendly gratis. Formato CV 2026.',
    keywords: 'formato curriculum vitae, modello curriculum europeo, formato cv 2026, modello curriculum vitae, formato curriculum, cv formato europeo, curriculum vitae formato, modello cv europeo',
  },
  schemas: {
    breadcrumbName: 'Formato Curriculum Vitae',
    howToName: 'Come scegliere il formato del curriculum vitae giusto',
    howToDescription: 'Confronta i 3 principali formati di curriculum vitae (cronologico inverso, funzionale, combinato) e scegli quello più adatto alla tua situazione professionale.',
    howToSteps: [
      'Analizza la tua fase di carriera (neolaureato, professionista esperto, dirigente)',
      'Confronta i pro e contro dei 3 formati',
      'Verifica il punteggio di compatibilità ATS',
      'Scegli un modello e crea il tuo curriculum vitae',
    ],
    howToToolName: 'Best AI Resume — Creatore Curriculum Vitae',
  },
  hero: {
    badge: 'Guida al formato curriculum vitae 2026',
    title: 'Scegli il formato curriculum vitae',
    titleHighlight: 'giusto per te',
    subtitle: 'Cronologico inverso, funzionale o combinato — scegliere il <strong>formato curriculum vitae</strong> corretto è il primo passo per superare la selezione. Con il nostro creatore di CV con IA, cambiare formato è questione di un clic.',
    ctaCompare: 'Confronta i formati',
    ctaBuild: 'Crea il CV gratis',
  },
  comparison: {
    title: 'Confronto tra i 3 formati di curriculum vitae',
    subtitle: 'Caratteristiche, casi d\'uso ideali e compatibilità ATS di ogni formato a colpo d\'occhio.',
    tableHeaders: {
      format: 'Formato',
      bestFor: 'Ideale per',
      avoidIf: 'Da evitare se',
      atsSafety: 'Compatibilità ATS',
    },
    formats: [
      {
        name: 'Cronologico inverso',
        badge: 'Il più diffuso',
        badgeColor: 'green',
        bestFor: ['Carriera senza interruzioni significative', 'Crescita professionale nello stesso settore', 'L\'ultima esperienza è direttamente rilevante per la posizione'],
        avoidIf: 'Hai periodi prolungati di inattività lavorativa',
        atsScore: 98,
        atsColor: 'green',
      },
      {
        name: 'Funzionale (basato sulle competenze)',
        badge: 'Orientato alle competenze',
        badgeColor: 'amber',
        bestFor: ['Cambio di settore o carriera', 'Periodi di inattività lavorativa', 'Neolaureati o liberi professionisti'],
        avoidIf: 'Ti candidi per aziende tradizionali o settori conservativi',
        atsScore: 72,
        atsColor: 'amber',
      },
      {
        name: 'Combinato',
        badge: 'Equilibrato',
        badgeColor: 'blue',
        bestFor: ['Competenze solide e ampia esperienza lavorativa', 'Posizioni dirigenziali o senior', 'Chi vuole valorizzare sia competenze che risultati'],
        avoidIf: 'Hai poca esperienza lavorativa',
        atsScore: 90,
        atsColor: 'green',
      },
    ],
  },
  chronological: {
    title: 'Formato cronologico inverso',
    description: 'Il formato che elenca le esperienze lavorative dalla più recente alla più remota. È il formato più riconosciuto dai recruiter italiani e internazionali e offre la massima compatibilità con i sistemi ATS.',
    whyLoveTitle: 'Perché i recruiter lo preferiscono',
    whyLoveText: 'Il curriculum vitae cronologico inverso permette ai recruiter di vedere immediatamente la progressione di carriera. Gli ATS lo analizzano con la massima precisione, rendendolo ideale per candidature ad aziende medio-grandi e multinazionali presenti in Italia.',
    structureTitle: 'Struttura delle sezioni',
    sections: [
      { label: 'Dati personali e contatti', detail: 'Nome, email, telefono, città di residenza', isCore: true },
      { label: 'Profilo professionale', detail: '3-4 righe che riassumono esperienza e competenze chiave', isCore: true },
      { label: 'Esperienze lavorative', detail: 'Dalla più recente alla più remota (azienda, periodo, risultati)', isCore: true },
      { label: 'Formazione', detail: 'Titolo di studio più recente e rilevante' },
      { label: 'Competenze', detail: 'Competenze tecniche, certificazioni e lingue' },
    ],
    downloadLabel: 'Scarica il modello',
    aiLabel: 'Crea con l\'IA',
  },
  functional: {
    title: 'Formato funzionale (basato sulle competenze)',
    description: 'Il formato che organizza il curriculum vitae intorno alle competenze e alle capacità, anziché alla cronologia lavorativa. Ideale per chi vuole mettere in primo piano "cosa sa fare" piuttosto che "dove ha lavorato".',
    warningTitle: 'Attenzione alla compatibilità ATS',
    warningText: 'Alcuni sistemi ATS faticano ad analizzare CV funzionali con una sezione esperienze ridotta. Questo formato è ideale per chi cambia settore, ha periodi di inattività o passa dal lavoro autonomo al lavoro dipendente, ma va usato con cautela per candidature ad aziende tradizionali o alla pubblica amministrazione.',
    structureTitle: 'Struttura delle sezioni',
    sections: [
      { label: 'Dati personali e contatti', isCore: true },
      { label: 'Profilo professionale', isCore: true },
      { label: 'Aree di competenza', detail: '3-4 macro-aree con risultati specifici per ciascuna', isCore: true },
      { label: 'Esperienze lavorative (sintetico)', detail: 'Solo azienda, ruolo e periodo' },
      { label: 'Formazione' },
    ],
    downloadLabel: 'Scarica il modello',
    aiLabel: 'Crea con l\'IA',
  },
  combination: {
    title: 'Formato combinato',
    description: 'Unisce i punti di forza del cronologico inverso e del funzionale. Permette di valorizzare sia le competenze trasversali che l\'esperienza lavorativa concreta.',
    whoForTitle: 'Quando scegliere questo formato',
    whoForItems: [
      'Professionisti di livello medio-senior con competenze manageriali',
      'Chi vuole evidenziare sia la profondità dell\'esperienza che la varietà delle competenze',
      'Candidature per posizioni che richiedono sia competenze tecniche che risultati operativi',
      'Chi ha un percorso professionale trasversale su più settori',
    ],
    downloadLabel: 'Scarica il modello',
    aiLabel: 'Crea con l\'IA',
  },
  faq: {
    title: 'Domande frequenti',
    items: [
      { question: 'Qual è il formato curriculum vitae più usato in Italia?', answer: 'In Italia il formato cronologico inverso è il più diffuso nel settore privato. Elenca le esperienze dalla più recente e offre la massima compatibilità con gli ATS. Nelle candidature per la pubblica amministrazione, il formato Europass è ancora spesso richiesto, ma nel privato un CV moderno e personalizzato è più efficace.' },
      { question: 'Quale formato scegliere se ho cambiato spesso lavoro?', answer: 'Il formato combinato è la scelta migliore. La sezione competenze in apertura mette in evidenza i punti di forza, mentre le esperienze vengono presentate in modo sintetico, spostando l\'attenzione dalle frequenti transizioni alle capacità acquisite.' },
      { question: 'Quale formato è adatto per i neolaureati?', answer: 'Per i neolaureati il cronologico inverso è ideale. Posiziona la sezione formazione sopra le esperienze e valorizza stage, tirocini e progetti universitari. Il nostro creatore di CV con IA suggerisce automaticamente le espressioni più adatte per chi è all\'inizio della carriera.' },
      { question: 'Cos\'è un curriculum vitae ATS-friendly?', answer: 'È un curriculum vitae strutturato per essere letto correttamente dai sistemi ATS (Applicant Tracking System). Layout semplice, nomi di sezione standard e formato PDF sono i requisiti fondamentali. Tutti i nostri modelli sono testati e ottimizzati per gli ATS.' },
      { question: 'Il modello curriculum europeo (Europass) è ancora valido nel 2026?', answer: 'Il formato Europass è ancora richiesto per concorsi pubblici, istituzioni UE e programmi di mobilità europea. Tuttavia, nel settore privato italiano la maggior parte dei recruiter preferisce un curriculum vitae moderno e personalizzato. Il nostro creatore di CV ti permette di scegliere tra 20+ modelli professionali adatti a ogni contesto.' },
    ],
  },
  externalResources: {
    title: 'Risorse esterne',
    items: [
      { href: 'https://www.istat.it/', label: 'ISTAT — Istituto Nazionale di Statistica' },
      { href: 'https://europa.eu/europass/it', label: 'Europass — Portale ufficiale' },
    ],
  },
  stickyCta: {
    text: 'Hai trovato il formato curriculum vitae giusto?',
    ctaLabel: 'Crea il tuo CV adesso',
  },
  bottomCta: {
    title: 'Basta indecisioni sul formato del curriculum vitae',
    description: 'Il nostro creatore di CV con IA ottimizza automaticamente formato, font e margini. Scegli tra 20+ modelli ATS-friendly e cambia formato con un clic.',
    ctaLabel: 'Crea il curriculum vitae gratis',
  },
};

const ko: ResumeFormatPageContent = {
  meta: {
    title: '이력서 양식 완벽 가이드 2026 | 이력서 빌더 | Best AI Resume',
    description: '이력서 양식 선택 방법을 완벽 해설. 역순형·기능형·혼합형 이력서 양식을 비교하고 나에게 맞는 최적의 이력서 양식을 찾아보세요. ATS 통과 이력서 템플릿 20종 이상 무료 제공.',
    keywords: '이력서 양식, 이력서 빌더, 이력서 템플릿, 이력서 쓰는 법, 영문 이력서 양식, 한글 이력서 양식, ATS 이력서 양식, 무료 이력서',
  },
  schemas: {
    breadcrumbName: '이력서 양식',
    howToName: '나에게 맞는 이력서 양식 선택하는 법',
    howToDescription: '3가지 주요 이력서 양식(역순형·기능형·혼합형)을 비교하고 자신의 경력 단계와 목표에 맞는 최적의 양식을 선택하세요.',
    howToSteps: [
      '자신의 경력 단계를 파악한다 (신입, 경력직, 임원급 등)',
      '3가지 이력서 양식의 장단점을 비교한다',
      'ATS 호환성 점수를 확인한다',
      '템플릿을 선택하고 이력서를 작성한다',
    ],
    howToToolName: 'Best AI Resume 이력서 빌더',
  },
  hero: {
    badge: '이력서 양식 가이드 2026',
    title: '나에게 맞는 이력서 양식을',
    titleHighlight: '선택하세요',
    subtitle: '역순형·기능형·혼합형——나의 경력에 맞는 <strong>이력서 양식</strong>을 선택하는 것이 서류 합격의 첫걸음입니다. AI 이력서 빌더를 사용하면 양식 전환도 원클릭으로 완료됩니다.',
    ctaCompare: '양식 비교하기',
    ctaBuild: '이력서 무료 작성',
  },
  comparison: {
    title: '3대 이력서 양식 비교',
    subtitle: '각 양식의 특징, 적합한 상황, ATS 호환도를 한눈에 확인하세요.',
    tableHeaders: {
      format: '양식',
      bestFor: '적합한 경우',
      avoidIf: '피해야 할 경우',
      atsSafety: 'ATS 호환도',
    },
    formats: [
      {
        name: '역순형 (시간순)',
        badge: '가장 인기',
        badgeColor: 'green',
        bestFor: ['경력 공백 없이 꾸준히 근무한 분', '같은 업계에서 승진·이직을 준비하는 분', '최근 경력이 지원 직무와 직접 관련된 분'],
        avoidIf: '장기간 경력 공백이 있는 경우',
        atsScore: 98,
        atsColor: 'green',
      },
      {
        name: '기능형 (스킬 기반)',
        badge: '스킬 중심',
        badgeColor: 'amber',
        bestFor: ['이직 또는 직종 전환을 준비하는 분', '경력 공백이 있는 분', '신입·프리랜서·인턴 경험 위주인 분'],
        avoidIf: '대기업이나 보수적인 업계에 지원하는 경우',
        atsScore: 72,
        atsColor: 'amber',
      },
      {
        name: '혼합형',
        badge: '균형잡힌',
        badgeColor: 'blue',
        bestFor: ['전문 역량과 풍부한 경력을 모두 갖춘 분', '관리자·임원급 포지션 지원자', '스킬과 실적을 동시에 어필하고 싶은 분'],
        avoidIf: '직무 경험이 적은 경우',
        atsScore: 90,
        atsColor: 'green',
      },
    ],
  },
  chronological: {
    title: '역순형 이력서 양식',
    description: '가장 최근 경력부터 시간 역순으로 기재하는 양식입니다. 한국 채용 시장에서 가장 보편적이며 ATS(지원자 추적 시스템)와의 호환성도 최상입니다.',
    whyLoveTitle: '채용 담당자가 선호하는 이유',
    whyLoveText: '역순형 이력서 양식은 경력 성장 과정을 한눈에 파악할 수 있어 채용 담당자가 가장 읽기 쉬운 형식입니다. ATS 파싱 정확도가 높아 대기업·공기업 지원에 최적입니다.',
    structureTitle: '섹션 구성',
    sections: [
      { label: '인적 사항', detail: '이름, 이메일, 전화번호, 거주 지역', isCore: true },
      { label: '경력 요약', detail: '3~4줄로 핵심 경험과 강점 요약', isCore: true },
      { label: '경력 사항', detail: '최근 경력부터 역순 기재 (회사명·기간·성과)', isCore: true },
      { label: '학력', detail: '최종 학력 기재' },
      { label: '보유 스킬', detail: '직무 관련 기술 스킬·자격증' },
    ],
    downloadLabel: '템플릿 다운로드',
    aiLabel: 'AI로 작성하기',
  },
  functional: {
    title: '기능형 (스킬 기반) 이력서 양식',
    description: '스킬과 역량을 중심으로 구성하는 양식입니다. 경력보다 "무엇을 할 수 있는가"를 강조하고 싶을 때 적합합니다.',
    warningTitle: 'ATS 호환성 주의',
    warningText: '일부 ATS에서는 경력 섹션이 짧으면 파싱 정확도가 떨어질 수 있습니다. 직종 전환 중이거나 경력 공백이 있는 분, 프리랜서에서 정규직으로 전환하는 분에게 최적이지만, 대기업이나 보수적인 업계 지원 시에는 주의가 필요합니다.',
    structureTitle: '섹션 구성',
    sections: [
      { label: '인적 사항', isCore: true },
      { label: '경력 요약', isCore: true },
      { label: '핵심 역량', detail: '3~4개 스킬 분야별 실적 기재', isCore: true },
      { label: '경력 사항 (간략)', detail: '회사명·직책·재직 기간만 기재' },
      { label: '학력' },
    ],
    downloadLabel: '템플릿 다운로드',
    aiLabel: 'AI로 작성하기',
  },
  combination: {
    title: '혼합형 이력서 양식',
    description: '역순형과 기능형의 장점을 결합한 양식입니다. 풍부한 스킬과 탄탄한 경력을 동시에 어필할 수 있습니다.',
    whoForTitle: '이 양식이 적합한 경우',
    whoForItems: [
      '중견~시니어급 전문직 또는 관리직 경력이 있는 분',
      '역량의 폭과 경력의 깊이를 동시에 보여주고 싶은 분',
      '기술 스킬과 업무 성과를 모두 요구하는 포지션에 지원하는 분',
      '여러 분야에 걸친 커리어를 보유한 분',
    ],
    downloadLabel: '템플릿 다운로드',
    aiLabel: 'AI로 작성하기',
  },
  faq: {
    title: '자주 묻는 질문',
    items: [
      { question: '한국에서 가장 일반적인 이력서 양식은?', answer: '한국에서는 역순형 이력서 양식이 가장 보편적입니다. 경력을 최근 순으로 기재하는 이 형식은 채용 담당자에게 가장 익숙하며 ATS 호환성도 가장 높습니다. 대기업, 중견기업, 공기업 채용 모두 이 형식이 표준입니다.' },
      { question: '이직 횟수가 많으면 어떤 이력서 양식이 좋나요?', answer: '이직이 잦은 경우 혼합형 이력서 양식을 추천합니다. 핵심 역량 섹션에서 강점을 먼저 어필하고, 경력 사항은 간결하게 정리하면 이직 횟수보다 역량에 초점을 맞출 수 있습니다.' },
      { question: '신입인 경우 어떤 이력서 양식을 사용해야 하나요?', answer: '신입은 역순형 이력서 양식이 가장 적합합니다. 학력을 경력 섹션 위에 배치하고, 인턴십·아르바이트·대외활동·프로젝트 경험을 기재하세요. AI 이력서 빌더를 사용하면 신입에게 적합한 표현을 자동으로 제안해 줍니다.' },
      { question: 'ATS 호환 이력서 양식이란 무엇인가요?', answer: 'ATS(지원자 추적 시스템)가 정확히 파싱할 수 있도록 구성된 이력서 양식입니다. 심플한 레이아웃, 표준 섹션명, PDF 파일 형식이 핵심입니다. 본 툴의 모든 템플릿은 ATS 최적화 검증을 완료했습니다.' },
      { question: '한글 이력서 양식과 영문 이력서 양식의 차이점은?', answer: '한글 이력서는 인적 사항·학력·경력·자격증 중심의 국내 표준 양식이며, 영문 이력서(Resume)는 경력 중심으로 구성됩니다. 외국계 기업이나 해외 취업 시에는 영문 이력서가 필수입니다. 본 AI 이력서 빌더는 한글과 영문 이력서를 모두 지원합니다.' },
    ],
  },
  externalResources: {
    title: '참고 자료',
    items: [
      { href: 'https://www.work.go.kr/', label: '워크넷 (고용노동부 취업 포털)' },
      { href: 'https://www.bls.gov/ooh/', label: '미국 노동통계국 직업 전망' },
    ],
  },
  stickyCta: {
    text: '나에게 맞는 이력서 양식을 찾으셨나요?',
    ctaLabel: '지금 바로 이력서 작성',
  },
  bottomCta: {
    title: '이력서 양식 고민은 이제 그만',
    description: 'AI 이력서 빌더가 양식·폰트·여백을 자동 최적화합니다. 20종 이상의 ATS 통과 템플릿에서 선택하고, 원클릭으로 양식을 전환하세요.',
    ctaLabel: '이력서 무료로 작성하기',
  },
};

const vi: ResumeFormatPageContent = {
  meta: {
    title: 'Định Dạng CV Xin Việc: Hướng Dẫn Toàn Diện 2026 | Mẫu CV | Best AI Resume',
    description: 'Tìm hiểu cách chọn định dạng CV xin việc phù hợp nhất. So sánh CV theo thời gian ngược, CV theo kỹ năng và CV kết hợp. Tải mẫu CV xin việc ATS-friendly miễn phí 2026.',
    keywords: 'định dạng cv, mẫu cv xin việc, cách trình bày cv, cv xin việc, định dạng cv 2026, mẫu cv chuyên nghiệp, cv theo thời gian ngược, cv theo kỹ năng',
  },
  schemas: {
    breadcrumbName: 'Định Dạng CV',
    howToName: 'Cách chọn định dạng CV xin việc phù hợp',
    howToDescription: 'So sánh 3 định dạng CV phổ biến nhất (theo thời gian ngược, theo kỹ năng, kết hợp) và chọn định dạng phù hợp với tình trạng nghề nghiệp của bạn.',
    howToSteps: [
      'Xác định giai đoạn sự nghiệp của bạn (sinh viên mới ra trường, chuyên viên, quản lý)',
      'So sánh ưu nhược điểm của 3 định dạng CV',
      'Kiểm tra điểm tương thích ATS của từng định dạng',
      'Chọn mẫu CV và bắt đầu tạo CV xin việc',
    ],
    howToToolName: 'Best AI Resume — Công Cụ Tạo CV Xin Việc',
  },
  hero: {
    badge: 'Hướng dẫn định dạng CV 2026',
    title: 'Chọn định dạng CV xin việc',
    titleHighlight: 'phù hợp với bạn',
    subtitle: 'CV theo thời gian ngược, theo kỹ năng hay kết hợp — chọn đúng <strong>định dạng CV xin việc</strong> là bước đầu tiên để vượt qua vòng sàng lọc hồ sơ. Với công cụ tạo CV bằng AI, bạn có thể đổi định dạng chỉ bằng một cú nhấp chuột.',
    ctaCompare: 'So sánh các định dạng',
    ctaBuild: 'Tạo CV miễn phí',
  },
  comparison: {
    title: 'So sánh 3 định dạng CV phổ biến nhất',
    subtitle: 'Đặc điểm, trường hợp sử dụng lý tưởng và mức tương thích ATS của từng định dạng trong một cái nhìn.',
    tableHeaders: {
      format: 'Định dạng',
      bestFor: 'Phù hợp nhất cho',
      avoidIf: 'Nên tránh nếu',
      atsSafety: 'Tương thích ATS',
    },
    formats: [
      {
        name: 'CV theo thời gian ngược',
        badge: 'Phổ biến nhất',
        badgeColor: 'green',
        bestFor: ['Quá trình làm việc liên tục, không có khoảng trống lớn', 'Thăng tiến nghề nghiệp trong cùng một lĩnh vực', 'Kinh nghiệm gần nhất liên quan trực tiếp đến vị trí ứng tuyển'],
        avoidIf: 'Bạn có thời gian dài không đi làm',
        atsScore: 98,
        atsColor: 'green',
      },
      {
        name: 'CV theo kỹ năng (chức năng)',
        badge: 'Tập trung kỹ năng',
        badgeColor: 'amber',
        bestFor: ['Chuyển đổi ngành nghề hoặc lĩnh vực', 'Có khoảng trống trong lịch sử làm việc', 'Sinh viên mới ra trường, freelancer hoặc thực tập sinh'],
        avoidIf: 'Bạn ứng tuyển vào doanh nghiệp truyền thống hoặc cơ quan nhà nước',
        atsScore: 72,
        atsColor: 'amber',
      },
      {
        name: 'CV kết hợp',
        badge: 'Cân bằng',
        badgeColor: 'blue',
        bestFor: ['Có kỹ năng chuyên sâu lẫn kinh nghiệm dày dặn', 'Ứng tuyển vị trí quản lý hoặc cấp cao', 'Muốn thể hiện cả năng lực lẫn thành tích công việc'],
        avoidIf: 'Bạn có ít kinh nghiệm làm việc',
        atsScore: 90,
        atsColor: 'green',
      },
    ],
  },
  chronological: {
    title: 'Định dạng CV theo thời gian ngược',
    description: 'Định dạng liệt kê kinh nghiệm làm việc từ gần nhất đến xa nhất. Đây là định dạng phổ biến nhất tại Việt Nam và trên thế giới, đồng thời có mức tương thích cao nhất với hệ thống ATS.',
    whyLoveTitle: 'Tại sao nhà tuyển dụng ưa thích định dạng này',
    whyLoveText: 'CV theo thời gian ngược giúp nhà tuyển dụng nhanh chóng nắm bắt quá trình thăng tiến của ứng viên. Hệ thống ATS phân tích chính xác nhất với định dạng này, khiến nó trở thành lựa chọn lý tưởng khi ứng tuyển vào các công ty lớn, tập đoàn đa quốc gia và doanh nghiệp FDI tại Việt Nam.',
    structureTitle: 'Cấu trúc các phần',
    sections: [
      { label: 'Thông tin cá nhân & liên hệ', detail: 'Họ tên, email, số điện thoại, thành phố', isCore: true },
      { label: 'Tóm tắt nghề nghiệp', detail: '3-4 dòng tóm tắt kinh nghiệm và thế mạnh cốt lõi', isCore: true },
      { label: 'Kinh nghiệm làm việc', detail: 'Từ gần nhất đến xa nhất (công ty, thời gian, thành tích)', isCore: true },
      { label: 'Học vấn', detail: 'Bằng cấp cao nhất và liên quan nhất' },
      { label: 'Kỹ năng', detail: 'Kỹ năng chuyên môn, chứng chỉ và ngoại ngữ' },
    ],
    downloadLabel: 'Tải mẫu CV',
    aiLabel: 'Tạo bằng AI',
  },
  functional: {
    title: 'Định dạng CV theo kỹ năng (chức năng)',
    description: 'Định dạng sắp xếp CV xin việc xoay quanh kỹ năng và năng lực thay vì trình tự thời gian. Phù hợp cho những ai muốn nhấn mạnh "bạn làm được gì" hơn là "bạn đã làm ở đâu".',
    warningTitle: 'Lưu ý về tương thích ATS',
    warningText: 'Một số hệ thống ATS gặp khó khăn khi phân tích CV theo kỹ năng có phần kinh nghiệm quá ngắn. Định dạng này phù hợp nhất cho người chuyển ngành, có khoảng trống trong sự nghiệp hoặc chuyển từ làm tự do sang làm toàn thời gian, nhưng cần cân nhắc kỹ khi ứng tuyển vào doanh nghiệp truyền thống hoặc cơ quan nhà nước.',
    structureTitle: 'Cấu trúc các phần',
    sections: [
      { label: 'Thông tin cá nhân & liên hệ', isCore: true },
      { label: 'Tóm tắt nghề nghiệp', isCore: true },
      { label: 'Các lĩnh vực kỹ năng', detail: '3-4 nhóm kỹ năng với thành tích cụ thể cho mỗi nhóm', isCore: true },
      { label: 'Kinh nghiệm làm việc (tóm tắt)', detail: 'Chỉ ghi tên công ty, chức danh và thời gian' },
      { label: 'Học vấn' },
    ],
    downloadLabel: 'Tải mẫu CV',
    aiLabel: 'Tạo bằng AI',
  },
  combination: {
    title: 'Định dạng CV kết hợp',
    description: 'Kết hợp điểm mạnh của CV theo thời gian ngược và CV theo kỹ năng. Giúp bạn thể hiện đồng thời cả năng lực chuyên môn lẫn kinh nghiệm thực tế.',
    whoForTitle: 'Khi nào nên chọn định dạng này',
    whoForItems: [
      'Chuyên viên cấp trung hoặc cấp cao với kinh nghiệm quản lý',
      'Muốn thể hiện cả chiều sâu kinh nghiệm lẫn sự đa dạng của kỹ năng',
      'Ứng tuyển vị trí đòi hỏi cả năng lực chuyên môn lẫn thành tích thực tế',
      'Có lộ trình sự nghiệp đa ngành, đa lĩnh vực',
    ],
    downloadLabel: 'Tải mẫu CV',
    aiLabel: 'Tạo bằng AI',
  },
  faq: {
    title: 'Câu hỏi thường gặp',
    items: [
      { question: 'Định dạng CV nào phổ biến nhất tại Việt Nam?', answer: 'Tại Việt Nam, CV theo thời gian ngược là định dạng phổ biến nhất. Liệt kê kinh nghiệm từ gần nhất giúp nhà tuyển dụng dễ dàng đánh giá năng lực hiện tại của bạn. Định dạng này cũng có tương thích ATS cao nhất, phù hợp với cả doanh nghiệp trong nước lẫn công ty nước ngoài tại Việt Nam.' },
      { question: 'Nên chọn định dạng nào nếu thay đổi công việc nhiều lần?', answer: 'Định dạng CV kết hợp là lựa chọn tốt nhất. Phần kỹ năng được đặt lên đầu giúp nhà tuyển dụng thấy ngay thế mạnh của bạn, trong khi phần kinh nghiệm được trình bày ngắn gọn, chuyển trọng tâm từ số lần chuyển việc sang năng lực tích lũy được.' },
      { question: 'Sinh viên mới ra trường nên dùng định dạng CV nào?', answer: 'Sinh viên mới ra trường nên dùng CV theo thời gian ngược. Đặt phần học vấn lên trên kinh nghiệm và tận dụng các hoạt động thực tập, dự án tốt nghiệp, hoạt động ngoại khóa và tình nguyện. Công cụ tạo CV bằng AI sẽ tự động gợi ý cách diễn đạt phù hợp cho người mới đi làm.' },
      { question: 'CV ATS-friendly là gì?', answer: 'CV ATS-friendly là CV được thiết kế để hệ thống ATS (Applicant Tracking System — hệ thống quản lý tuyển dụng) có thể đọc và phân tích chính xác. Bố cục đơn giản, tên phần chuẩn và định dạng PDF là yêu cầu cơ bản. Tất cả mẫu CV của chúng tôi đều đã được kiểm tra và tối ưu hóa cho ATS.' },
      { question: 'Có nên viết CV bằng tiếng Anh khi ứng tuyển tại Việt Nam?', answer: 'Nếu bạn ứng tuyển vào công ty nước ngoài, tập đoàn đa quốc gia hoặc vị trí đòi hỏi tiếng Anh, CV tiếng Anh là bắt buộc. Với công ty Việt Nam, CV tiếng Việt là đủ nhưng việc có thêm bản CV tiếng Anh sẽ là điểm cộng lớn. Công cụ tạo CV bằng AI của chúng tôi hỗ trợ cả tiếng Việt và tiếng Anh.' },
    ],
  },
  externalResources: {
    title: 'Tài liệu tham khảo',
    items: [
      { href: 'https://www.molisa.gov.vn/', label: 'Bộ Lao động — Thương binh và Xã hội' },
      { href: 'https://www.vietnamworks.com/', label: 'VietnamWorks — Trang tuyển dụng hàng đầu Việt Nam' },
    ],
  },
  stickyCta: {
    text: 'Bạn đã tìm được định dạng CV phù hợp chưa?',
    ctaLabel: 'Tạo CV ngay bây giờ',
  },
  bottomCta: {
    title: 'Không cần băn khoăn về định dạng CV nữa',
    description: 'Công cụ tạo CV bằng AI tự động tối ưu hóa định dạng, phông chữ và lề. Chọn từ hơn 20 mẫu CV ATS-friendly và đổi định dạng chỉ bằng một cú nhấp chuột.',
    ctaLabel: 'Tạo CV xin việc miễn phí',
  },
};

// ---------------------------------------------------------------------------
// Thai
// ---------------------------------------------------------------------------
const th: ResumeFormatPageContent = {
  meta: {
    title: 'รูปแบบเรซูเม่ที่ดีที่สุด 2026 | คู่มือฉบับสมบูรณ์ | Best AI Resume',
    description:
      'เลือกรูปแบบเรซูเม่ที่เหมาะกับคุณ เปรียบเทียบรูปแบบลำดับเวลาย้อนกลับ เชิงทักษะ และผสมผสาน พร้อมเทมเพลตเรซูเม่ ATS ฟรีกว่า 20 แบบ',
    keywords:
      'รูปแบบเรซูเม่, เทมเพลตเรซูเม่, สร้างเรซูเม่, เรซูเม่ AI, เรซูเม่ ATS, วิธีเขียนเรซูเม่, รูปแบบเรซูเม่ภาษาไทย, เรซูเม่สมัครงาน',
  },
  schemas: {
    breadcrumbName: 'รูปแบบเรซูเม่',
    howToName: 'วิธีเลือกรูปแบบเรซูเม่ที่เหมาะสม',
    howToDescription:
      'เปรียบเทียบ 3 รูปแบบเรซูเม่หลัก (ลำดับเวลาย้อนกลับ เชิงทักษะ ผสมผสาน) แล้วเลือกรูปแบบที่เหมาะกับระดับประสบการณ์และเป้าหมายอาชีพของคุณ',
    howToSteps: [
      'ประเมินระดับประสบการณ์ของคุณ (จบใหม่ มีประสบการณ์ ผู้บริหาร)',
      'เปรียบเทียบข้อดีข้อเสียของ 3 รูปแบบเรซูเม่',
      'ตรวจสอบคะแนนความเข้ากันได้กับ ATS',
      'เลือกเทมเพลตแล้วเริ่มสร้างเรซูเม่',
    ],
    howToToolName: 'Best AI Resume เครื่องมือสร้างเรซูเม่',
  },
  hero: {
    badge: 'คู่มือรูปแบบเรซูเม่ 2026',
    title: 'เลือกรูปแบบเรซูเม่',
    titleHighlight: 'ที่เหมาะกับคุณ',
    subtitle:
      'ลำดับเวลาย้อนกลับ เชิงทักษะ หรือผสมผสาน — การเลือก<strong>รูปแบบเรซูเม่</strong>ที่ถูกต้องคือก้าวแรกสู่การผ่านการคัดเลือก เครื่องมือสร้างเรซูเม่ AI ช่วยให้สลับรูปแบบได้ในคลิกเดียว',
    ctaCompare: 'เปรียบเทียบรูปแบบ',
    ctaBuild: 'สร้างเรซูเม่ฟรี',
  },
  comparison: {
    title: 'เปรียบเทียบ 3 รูปแบบเรซูเม่หลัก',
    subtitle: 'ดูคุณสมบัติ ความเหมาะสม และคะแนน ATS ของแต่ละรูปแบบ',
    tableHeaders: {
      format: 'รูปแบบ',
      bestFor: 'เหมาะสำหรับ',
      avoidIf: 'หลีกเลี่ยงถ้า',
      atsSafety: 'ความเข้ากันกับ ATS',
    },
    formats: [
      {
        name: 'ลำดับเวลาย้อนกลับ',
        badge: 'นิยมที่สุด',
        badgeColor: 'green',
        bestFor: [
          'มีประวัติการทำงานต่อเนื่องไม่มีช่องว่าง',
          'กำลังเลื่อนตำแหน่งหรือย้ายงานในอุตสาหกรรมเดิม',
          'ประสบการณ์ล่าสุดตรงกับตำแหน่งที่สมัคร',
        ],
        avoidIf: 'มีช่วงว่างในประวัติการทำงานนาน',
        atsScore: 98,
        atsColor: 'green',
      },
      {
        name: 'เชิงทักษะ (Functional)',
        badge: 'เน้นทักษะ',
        badgeColor: 'amber',
        bestFor: [
          'กำลังเปลี่ยนสายงานหรืออุตสาหกรรม',
          'มีช่วงว่างในประวัติการทำงาน',
          'จบใหม่ ฟรีแลนซ์ หรือมีแค่ประสบการณ์ฝึกงาน',
        ],
        avoidIf: 'สมัครงานบริษัทใหญ่หรืออุตสาหกรรมอนุรักษ์นิยม',
        atsScore: 72,
        atsColor: 'amber',
      },
      {
        name: 'ผสมผสาน (Combination)',
        badge: 'สมดุล',
        badgeColor: 'blue',
        bestFor: [
          'มีทั้งทักษะเฉพาะทางและประสบการณ์ที่แข็งแกร่ง',
          'สมัครตำแหน่งผู้จัดการหรือผู้บริหาร',
          'ต้องการโชว์ทั้งทักษะและผลงานพร้อมกัน',
        ],
        avoidIf: 'มีประสบการณ์ทำงานน้อย',
        atsScore: 90,
        atsColor: 'green',
      },
    ],
  },
  chronological: {
    title: 'รูปแบบเรซูเม่ลำดับเวลาย้อนกลับ',
    description:
      'เริ่มจากประสบการณ์ล่าสุดแล้วไล่ย้อนกลับไป เป็นรูปแบบที่นิยมที่สุดในตลาดงานไทยและทั่วโลก มีความเข้ากันได้กับระบบ ATS สูงที่สุด',
    whyLoveTitle: 'ทำไม HR ชอบรูปแบบนี้',
    whyLoveText:
      'รูปแบบลำดับเวลาย้อนกลับแสดงความก้าวหน้าในอาชีพอย่างชัดเจน ทำให้ผู้สรรหาอ่านและประเมินได้ง่ายที่สุด ระบบ ATS แปลผลได้แม่นยำ เหมาะสำหรับสมัครงานบริษัทใหญ่และข้ามชาติในไทย',
    structureTitle: 'โครงสร้างส่วนต่าง ๆ',
    sections: [
      { label: 'ข้อมูลส่วนตัว', detail: 'ชื่อ อีเมล เบอร์โทร ที่อยู่', isCore: true },
      { label: 'สรุปประวัติ', detail: 'สรุปประสบการณ์และจุดแข็งหลักใน 3-4 บรรทัด', isCore: true },
      { label: 'ประสบการณ์ทำงาน', detail: 'เรียงจากล่าสุด (ชื่อบริษัท ตำแหน่ง ระยะเวลา ผลงาน)', isCore: true },
      { label: 'การศึกษา', detail: 'วุฒิการศึกษาสูงสุด' },
      { label: 'ทักษะ', detail: 'ทักษะเฉพาะทางและใบรับรอง' },
    ],
    downloadLabel: 'ดาวน์โหลดเทมเพลต',
    aiLabel: 'สร้างด้วย AI',
  },
  functional: {
    title: 'รูปแบบเรซูเม่เชิงทักษะ (Functional)',
    description:
      'เน้นทักษะและความสามารถเป็นหลัก เหมาะเมื่อต้องการแสดง "สิ่งที่ทำได้" มากกว่าลำดับประสบการณ์',
    warningTitle: 'ข้อควรระวังเรื่อง ATS',
    warningText:
      'ระบบ ATS บางตัวอาจแปลผลได้ไม่ดีถ้าส่วนประสบการณ์ทำงานสั้นเกินไป เหมาะสำหรับคนเปลี่ยนสายงาน มีช่วงว่างในอาชีพ หรือเปลี่ยนจากฟรีแลนซ์เป็นพนักงานประจำ แต่ควรระวังเมื่อสมัครบริษัทใหญ่หรืออุตสาหกรรมที่อนุรักษ์นิยม',
    structureTitle: 'โครงสร้างส่วนต่าง ๆ',
    sections: [
      { label: 'ข้อมูลส่วนตัว', isCore: true },
      { label: 'สรุปประวัติ', isCore: true },
      { label: 'ทักษะหลัก', detail: 'จัดกลุ่ม 3-4 ด้านพร้อมผลงาน', isCore: true },
      { label: 'ประสบการณ์ทำงาน (ย่อ)', detail: 'ชื่อบริษัท ตำแหน่ง ระยะเวลาเท่านั้น' },
      { label: 'การศึกษา' },
    ],
    downloadLabel: 'ดาวน์โหลดเทมเพลต',
    aiLabel: 'สร้างด้วย AI',
  },
  combination: {
    title: 'รูปแบบเรซูเม่ผสมผสาน (Combination)',
    description:
      'รวมข้อดีของรูปแบบลำดับเวลาย้อนกลับและเชิงทักษะเข้าด้วยกัน แสดงทั้งทักษะที่หลากหลายและประสบการณ์ที่แข็งแกร่ง',
    whoForTitle: 'เหมาะสำหรับใคร',
    whoForItems: [
      'ผู้มีประสบการณ์ระดับกลางถึงซีเนียร์ในสายอาชีพเฉพาะทาง',
      'ต้องการแสดงทั้งความกว้างของทักษะและความลึกของประสบการณ์',
      'สมัครตำแหน่งที่ต้องการทั้งทักษะเทคนิคและผลงานที่ผ่านมา',
      'มีอาชีพที่ครอบคลุมหลายสาขา',
    ],
    downloadLabel: 'ดาวน์โหลดเทมเพลต',
    aiLabel: 'สร้างด้วย AI',
  },
  faq: {
    title: 'คำถามที่พบบ่อย',
    items: [
      {
        question: 'รูปแบบเรซูเม่ที่นิยมที่สุดในไทยคืออะไร?',
        answer:
          'ในประเทศไทย รูปแบบลำดับเวลาย้อนกลับเป็นที่นิยมมากที่สุด เรียงประสบการณ์จากล่าสุดไปเก่าสุด ผู้สรรหาคุ้นเคยกับรูปแบบนี้มากที่สุดและ ATS รองรับได้ดีที่สุด ทั้งบริษัทไทยและบริษัทข้ามชาติในไทยยอมรับรูปแบบนี้เป็นมาตรฐาน',
      },
      {
        question: 'เปลี่ยนงานบ่อยควรใช้รูปแบบไหน?',
        answer:
          'ถ้าเปลี่ยนงานบ่อย แนะนำรูปแบบผสมผสาน ส่วนทักษะหลักช่วยแสดงจุดแข็งก่อน แล้วจัดส่วนประสบการณ์ให้กระชับ ทำให้โฟกัสที่ความสามารถมากกว่าจำนวนครั้งที่เปลี่ยนงาน',
      },
      {
        question: 'จบใหม่ควรใช้รูปแบบเรซูเม่แบบไหน?',
        answer:
          'จบใหม่เหมาะกับรูปแบบลำดับเวลาย้อนกลับ วางส่วนการศึกษาไว้เหนือประสบการณ์ทำงาน ใส่ฝึกงาน กิจกรรมนอกหลักสูตร และโปรเจกต์ เครื่องมือสร้างเรซูเม่ AI จะแนะนำสำนวนที่เหมาะสมสำหรับคนเพิ่งจบใหม่โดยอัตโนมัติ',
      },
      {
        question: 'รูปแบบเรซูเม่ที่ผ่าน ATS คืออะไร?',
        answer:
          'รูปแบบเรซูเม่ที่ ATS (ระบบติดตามผู้สมัคร) อ่านได้อย่างถูกต้อง หลักสำคัญคือเลย์เอาต์เรียบง่าย ชื่อส่วนมาตรฐาน และไฟล์ PDF เทมเพลตทั้งหมดของเราผ่านการทดสอบความเข้ากันได้กับ ATS แล้ว',
      },
      {
        question: 'เรซูเม่ภาษาไทยกับเรซูเม่ภาษาอังกฤษต่างกันอย่างไร?',
        answer:
          'เรซูเม่ภาษาไทยมักมีรูปถ่าย ข้อมูลส่วนตัวมากกว่า (เช่น วันเกิด สถานภาพ) ตามธรรมเนียมไทย ส่วนเรซูเม่ภาษาอังกฤษ (Resume) เน้นประสบการณ์และผลงาน สำหรับบริษัทข้ามชาติในไทย แนะนำเตรียมทั้งสองภาษา เครื่องมือสร้างเรซูเม่ AI ของเรารองรับทั้งภาษาไทยและภาษาอังกฤษ',
      },
    ],
  },
  externalResources: {
    title: 'แหล่งข้อมูลภายนอก',
    items: [
      { href: 'https://www.doe.go.th/', label: 'กรมการจัดหางาน กระทรวงแรงงาน' },
      { href: 'https://www.bls.gov/ooh/', label: 'สำนักสถิติแรงงานสหรัฐฯ: ภาพรวมอาชีพ' },
    ],
  },
  stickyCta: {
    text: 'พบรูปแบบเรซูเม่ที่เหมาะกับคุณแล้วหรือยัง?',
    ctaLabel: 'สร้างเรซูเม่เลย',
  },
  bottomCta: {
    title: 'ไม่ต้องกังวลเรื่องรูปแบบเรซูเม่อีกต่อไป',
    description:
      'เครื่องมือสร้างเรซูเม่ AI ปรับรูปแบบ ฟอนต์ และระยะขอบให้อัตโนมัติ เลือกจากเทมเพลตเรซูเม่ ATS มากกว่า 20 แบบ แล้วสลับรูปแบบได้ในคลิกเดียว',
    ctaLabel: 'สร้างเรซูเม่ฟรี',
  },
};

// ── Export ───────────────────────────────────────────────────────────

const pt: ResumeFormatPageContent = {
  meta: {
    title: 'Formato de Curriculo: Guia Completo 2026 | Modelo de Curriculo ATS | Best AI Resume',
    description: 'Aprenda a escolher o formato de curriculo certo. Compare cronologico inverso, funcional e combinado. Modelos de curriculo ATS gratis. Formato curriculo 2026.',
    keywords: 'formato de curriculo, modelo de curriculo, formato curriculo 2026, modelo curriculo profissional, formato curriculum vitae, curriculo cronologico, formato curriculo simples, modelo cv profissional',
  },
  schemas: {
    breadcrumbName: 'Formato de Curriculo',
    howToName: 'Como escolher o formato de curriculo certo',
    howToDescription: 'Compare os 3 principais formatos de curriculo (cronologico inverso, funcional, combinado) e escolha o mais adequado para sua situacao profissional.',
    howToSteps: [
      'Analise seu estagio de carreira (recém-formado, profissional experiente, executivo)',
      'Compare os pros e contras dos 3 formatos',
      'Verifique a pontuacao de compatibilidade ATS',
      'Escolha um modelo e crie seu curriculo',
    ],
    howToToolName: 'Best AI Resume — Criador de Curriculo',
  },
  hero: {
    badge: 'Guia de formato de curriculo 2026',
    title: 'Escolha o formato de curriculo',
    titleHighlight: 'certo para voce',
    subtitle: 'Cronologico inverso, funcional ou combinado — escolher o <strong>formato de curriculo</strong> correto e o primeiro passo para passar pela triagem. Com nosso criador de curriculo com IA, mudar de formato e questao de um clique.',
    ctaCompare: 'Comparar formatos',
    ctaBuild: 'Criar curriculo gratis',
  },
  comparison: {
    title: 'Comparacao dos 3 formatos de curriculo',
    subtitle: 'Caracteristicas, casos de uso ideais e compatibilidade ATS de cada formato de forma clara.',
    tableHeaders: {
      format: 'Formato',
      bestFor: 'Ideal para',
      avoidIf: 'Evite se',
      atsSafety: 'Compatibilidade ATS',
    },
    formats: [
      {
        name: 'Cronologico inverso',
        badge: 'O mais usado',
        badgeColor: 'green',
        bestFor: ['Carreira sem interrupcoes significativas', 'Crescimento profissional no mesmo setor', 'A ultima experiencia e diretamente relevante para a vaga'],
        avoidIf: 'Voce tem periodos prolongados de inatividade profissional',
        atsScore: 98,
        atsColor: 'green',
      },
      {
        name: 'Funcional (baseado em habilidades)',
        badge: 'Orientado a habilidades',
        badgeColor: 'amber',
        bestFor: ['Mudanca de setor ou carreira', 'Periodos de inatividade profissional', 'Recém-formados ou freelancers'],
        avoidIf: 'Voce se candidata a empresas tradicionais ou setores conservadores',
        atsScore: 72,
        atsColor: 'amber',
      },
      {
        name: 'Combinado',
        badge: 'Equilibrado',
        badgeColor: 'blue',
        bestFor: ['Habilidades solidas e ampla experiencia profissional', 'Posicoes de lideranca ou senior', 'Quem quer valorizar tanto habilidades quanto resultados'],
        avoidIf: 'Voce tem pouca experiencia profissional',
        atsScore: 90,
        atsColor: 'green',
      },
    ],
  },
  chronological: {
    title: 'Formato cronologico inverso',
    description: 'O formato que lista as experiencias profissionais da mais recente para a mais antiga. E o formato mais reconhecido pelos recrutadores brasileiros e internacionais e oferece maxima compatibilidade com sistemas ATS.',
    whyLoveTitle: 'Por que os recrutadores preferem',
    whyLoveText: 'O curriculo cronologico inverso permite que os recrutadores vejam imediatamente a progressao de carreira. Os sistemas ATS o analisam com maxima precisao, tornando-o ideal para candidaturas a empresas de medio e grande porte e multinacionais no Brasil.',
    structureTitle: 'Estrutura das secoes',
    sections: [
      { label: 'Dados pessoais e contatos', detail: 'Nome, e-mail, telefone, cidade', isCore: true },
      { label: 'Resumo profissional', detail: '3-4 linhas resumindo experiencia e principais habilidades', isCore: true },
      { label: 'Experiencias profissionais', detail: 'Da mais recente para a mais antiga (empresa, periodo, resultados)', isCore: true },
      { label: 'Formacao academica', detail: 'Titulo mais recente e relevante' },
      { label: 'Habilidades', detail: 'Habilidades tecnicas, certificacoes e idiomas' },
    ],
    downloadLabel: 'Baixar modelo',
    aiLabel: 'Criar com IA',
  },
  functional: {
    title: 'Formato funcional (baseado em habilidades)',
    description: 'O formato que organiza o curriculo em torno das habilidades e competencias, em vez da cronologia profissional. Ideal para quem quer destacar "o que sabe fazer" em vez de "onde trabalhou".',
    warningTitle: 'Atencao a compatibilidade ATS',
    warningText: 'Alguns sistemas ATS tem dificuldade em analisar curriculos funcionais com secao de experiencias reduzida. Este formato e ideal para quem muda de setor, tem periodos de inatividade ou passa do trabalho autonomo para o CLT, mas deve ser usado com cautela para candidaturas a empresas tradicionais.',
    structureTitle: 'Estrutura das secoes',
    sections: [
      { label: 'Dados pessoais e contatos', isCore: true },
      { label: 'Resumo profissional', isCore: true },
      { label: 'Areas de competencia', detail: '3-4 grandes areas com resultados especificos para cada uma', isCore: true },
      { label: 'Experiencias profissionais (sintetico)', detail: 'Apenas empresa, cargo e periodo' },
      { label: 'Formacao academica' },
    ],
    downloadLabel: 'Baixar modelo',
    aiLabel: 'Criar com IA',
  },
  combination: {
    title: 'Formato combinado',
    description: 'Une os pontos fortes do cronologico inverso e do funcional. Permite valorizar tanto as competencias transversais quanto a experiencia profissional concreta.',
    whoForTitle: 'Quando escolher este formato',
    whoForItems: [
      'Profissionais de nivel medio-senior com habilidades de gestao',
      'Quem quer destacar tanto a profundidade da experiencia quanto a variedade de habilidades',
      'Candidaturas para posicoes que exigem tanto habilidades tecnicas quanto resultados operacionais',
      'Quem tem trajetoria profissional transversal em varios setores',
    ],
    downloadLabel: 'Baixar modelo',
    aiLabel: 'Criar com IA',
  },
  faq: {
    title: 'Perguntas frequentes',
    items: [
      { question: 'Qual e o formato de curriculo mais usado no Brasil?', answer: 'No Brasil, o formato cronologico inverso e o mais difundido no setor privado. Lista as experiencias da mais recente e oferece maxima compatibilidade com os ATS. Para concursos publicos, pode ser exigido formato especifico, mas no mercado privado um curriculo moderno e personalizado e mais eficaz.' },
      { question: 'Qual formato escolher se troquei muito de emprego?', answer: 'O formato combinado e a melhor escolha. A secao de habilidades no inicio destaca os pontos fortes, enquanto as experiencias sao apresentadas de forma sintetica, deslocando a atencao das transicoes frequentes para as competencias adquiridas.' },
      { question: 'Qual formato e adequado para recém-formados?', answer: 'Para recém-formados, o cronologico inverso e ideal. Posicione a secao de formacao acima das experiencias e valorize estagios, trainee e projetos academicos. Nosso criador de curriculo com IA sugere automaticamente as expressoes mais adequadas para quem esta iniciando a carreira.' },
      { question: 'O que e um curriculo ATS?', answer: 'E um curriculo estruturado para ser lido corretamente pelos sistemas ATS (Applicant Tracking System). Layout simples, nomes de secao padroes e formato PDF sao os requisitos fundamentais. Todos os nossos modelos sao testados e otimizados para ATS.' },
      { question: 'O modelo Europass ainda e valido no Brasil em 2026?', answer: 'O Europass e um formato europeu, pouco usado no mercado de trabalho brasileiro. No Brasil, os recrutadores preferem curriculos modernos e personalizados. Nosso criador de curriculo permite escolher entre 20+ modelos profissionais adequados ao mercado brasileiro.' },
    ],
  },
  externalResources: {
    title: 'Recursos externos',
    items: [
      { href: 'https://www.ibge.gov.br/estatisticas/sociais/trabalho.html', label: 'IBGE — Instituto Brasileiro de Geografia e Estatistica' },
      { href: 'https://www.mte.gov.br/', label: 'Ministerio do Trabalho e Emprego — Brasil' },
    ],
  },
  stickyCta: {
    text: 'Encontrou o formato de curriculo certo?',
    ctaLabel: 'Criar seu curriculo agora',
  },
  bottomCta: {
    title: 'Chega de duvidas sobre o formato do curriculo',
    description: 'Nosso criador de curriculo com IA otimiza automaticamente formato, fonte e margens. Escolha entre 20+ modelos ATS e mude o formato com um clique.',
    ctaLabel: 'Criar curriculo gratis',
  },
};

// ---------------------------------------------------------------------------
// Turkish
// ---------------------------------------------------------------------------
const tr: ResumeFormatPageContent = {
  meta: {
    title: 'CV Formatı Rehberi 2026: Doğru Özgeçmiş Formatı Seçimi | Best AI Resume',
    description:
      'Doğru cv formatını seçmek için rehber. Kronolojik, fonksiyonel ve kombine cv formatları karşılaştırması. ATS uyumlu cv şablonları ücretsiz. 2026.',
    keywords:
      'cv formatı, özgeçmiş formatı, cv şablonu, cv nasıl hazırlanır, kronolojik cv, cv formatı 2026, ats uyumlu cv formatı, özgeçmiş şablonu',
  },
  schemas: {
    breadcrumbName: 'CV Formatı Rehberi',
    howToName: 'Doğru CV formatı nasıl seçilir',
    howToDescription:
      '3 temel CV formatını (kronolojik, fonksiyonel, kombine) karşılaştırın ve kariyer durumunuza en uygun formatı seçin.',
    howToSteps: [
      'Kariyer aşamanızı değerlendirin (yeni mezun, deneyimli profesyonel, yönetici)',
      '3 CV formatının artı ve eksilerini karşılaştırın',
      'ATS uyumluluk puanını kontrol edin',
      "Bir şablon seçin ve CV'nizi oluşturun",
    ],
    howToToolName: 'Best AI Resume — CV Oluşturucu',
  },
  hero: {
    badge: 'CV format rehberi 2026',
    title: 'Doğru CV formatını seçin',
    titleHighlight: 'ilk elemeden geçin',
    subtitle:
      'Kronolojik, fonksiyonel veya kombine — doğru <strong>cv formatını</strong> seçmek, başvuru sürecinin ilk kritik adımıdır. Yapay zeka destekli CV oluşturucumuzla format değiştirmek bir tıklama kadar kolay.',
    ctaCompare: 'Formatları karşılaştır',
    ctaBuild: 'Ücretsiz CV oluştur',
  },
  comparison: {
    title: '3 CV formatının karşılaştırması',
    subtitle: 'Her formatın özellikleri, ideal kullanım alanları ve ATS uyumluluğu açık ve net biçimde.',
    tableHeaders: {
      format: 'Format',
      bestFor: 'İdeal kullanım',
      avoidIf: 'Kaçının eğer',
      atsSafety: 'ATS uyumluluğu',
    },
    formats: [
      {
        name: 'Kronolojik (ters sıralı)',
        badge: 'En yaygın',
        badgeColor: 'green',
        bestFor: [
          'Önemli kariyer boşluğu olmayan adaylar',
          'Aynı sektörde ilerleyen profesyoneller',
          'Son deneyim doğrudan pozisyonla ilgili olanlar',
        ],
        avoidIf: 'Uzun süreli kariyer boşluklarınız varsa',
        atsScore: 98,
        atsColor: 'green',
      },
      {
        name: 'Fonksiyonel (beceri odaklı)',
        badge: 'Beceri odaklı',
        badgeColor: 'amber',
        bestFor: [
          'Sektör değiştirmek isteyenler',
          'Kariyer boşluğu olanlar',
          'Yeni mezunlar veya serbest çalışanlar',
        ],
        avoidIf: 'Geleneksel sektörlere veya büyük şirketlere başvuruyorsanız',
        atsScore: 72,
        atsColor: 'amber',
      },
      {
        name: 'Kombine',
        badge: 'Dengeli',
        badgeColor: 'blue',
        bestFor: [
          'Güçlü becerileri ve geniş deneyimi olanlar',
          'Liderlik veya üst düzey pozisyonlar',
          'Hem beceri hem sonuçları öne çıkarmak isteyenler',
        ],
        avoidIf: 'Az iş deneyiminiz varsa',
        atsScore: 90,
        atsColor: 'green',
      },
    ],
  },
  chronological: {
    title: 'Kronolojik (ters sıralı) format',
    description:
      "İş deneyimlerini en yeniden başlayarak sıralayan format. Türk ve uluslararası işe alım uzmanları tarafından en çok tercih edilen format olup ATS sistemleriyle maksimum uyumluluk sağlar.",
    whyLoveTitle: 'Neden işverenler bu formatı tercih ediyor',
    whyLoveText:
      "Kronolojik CV, işe alım uzmanlarının kariyer gelişimini anında görmesini sağlar. ATS sistemleri bu formatı en yüksek doğrulukla ayrıştırır; bu nedenle Türkiye'deki büyük şirketler, çok uluslu firmalar ve kamu kurumları başvurularında bu format tercih edilir.",
    structureTitle: 'Bölüm yapısı',
    sections: [
      { label: 'Kişisel bilgiler ve iletişim', detail: 'Ad soyad, e-posta, telefon, şehir', isCore: true },
      { label: 'Profesyonel özet', detail: 'Deneyim ve temel becerileri özetleyen 3-4 cümle', isCore: true },
      { label: 'İş deneyimi', detail: 'En yeniden en eskiye sıralı (şirket, dönem, sonuçlar)', isCore: true },
      { label: 'Eğitim', detail: 'En son ve ilgili derece' },
      { label: 'Beceriler', detail: 'Teknik beceriler, sertifikalar ve dil bilgisi' },
    ],
    downloadLabel: 'Şablonu indir',
    aiLabel: 'AI ile oluştur',
  },
  functional: {
    title: 'Fonksiyonel (beceri odaklı) format',
    description: "CV'yi kronoloji yerine beceri ve yetkinlikler etrafında düzenleyen format.",
    warningTitle: 'ATS uyumluluğuna dikkat',
    warningText:
      "Bazı ATS sistemleri deneyim bölümü küçültülmüş fonksiyonel CV'leri doğru okumakta güçlük çeker.",
    structureTitle: 'Bölüm yapısı',
    sections: [
      { label: 'Kişisel bilgiler ve iletişim', isCore: true },
      { label: 'Profesyonel özet', isCore: true },
      {
        label: 'Temel yetkinlik alanları',
        detail: 'Her biri için somut sonuçlar içeren 3-4 ana alan',
        isCore: true,
      },
      { label: 'İş deneyimi (özet)', detail: 'Yalnızca şirket, unvan ve dönem' },
      { label: 'Eğitim' },
    ],
    downloadLabel: 'Şablonu indir',
    aiLabel: 'AI ile oluştur',
  },
  combination: {
    title: 'Kombine format',
    description: 'Kronolojik ve fonksiyonel formatların güçlü yönlerini bir araya getirir.',
    whoForTitle: 'Bu formatı ne zaman tercih edin',
    whoForItems: [
      'Yönetim becerileriyle birlikte geniş deneyime sahip orta-kıdemli profesyoneller',
      'Hem deneyim derinliğini hem beceri çeşitliliğini vurgulamak isteyenler',
      'Hem teknik hem operasyonel sonuçların önemli olduğu pozisyonlara başvuranlar',
      'Birden fazla sektörde kesişen kariyer geçmişi olanlar',
    ],
    downloadLabel: 'Şablonu indir',
    aiLabel: 'AI ile oluştur',
  },
  faq: {
    title: 'Sık sorulan sorular',
    items: [
      {
        question: "Türkiye'de en yaygın kullanılan CV formatı hangisi?",
        answer:
          "Türkiye'de özel sektörde kronolojik (ters sıralı) format en yaygın tercih edilenidir. Büyük şirketler, çok uluslu firmalar ve teknoloji şirketleri bu formatı bekler. Kamu sektöründe ise özel başvuru formları kullanılabilir.",
      },
      {
        question: 'Çok iş değiştirdim — hangi format daha iyi?',
        answer:
          'Kombine format en iyi seçimdir. Becerilerinizi öne çıkarırken kronolojik iş geçmişinizi de korursunuz. Bu şekilde deneyim derinliğinizi ve esnekliğinizi birlikte gösterirsiniz.',
      },
      {
        question: 'Yeni mezun için hangi format uygun?',
        answer:
          "Yeni mezunlar için kronolojik format idealdir. Eğitim bölümünü iş deneyimi bölümünün önüne yerleştirerek akademik başarılarınızı, stajlarınızı ve proje çalışmalarınızı öne çıkarabilirsiniz.",
      },
      {
        question: 'ATS uyumlu CV nedir?',
        answer:
          "ATS (Applicant Tracking System — Aday Takip Sistemi), şirketlerin CV'leri filtrelemek için kullandığı yazılımlardır. ATS uyumlu CV, basit biçimlendirme, net başlıklar ve anahtar kelimeler içeren, tablosuz ve grafiksiz bir CV'dir. Kronolojik format bu sistemlerle en iyi çalışan formattır.",
      },
      {
        question: "Europass CV Türkiye'de geçerli mi?",
        answer:
          "Europass, AB kurumlarına başvurularda kullanılan standart bir format olup Türkiye iş piyasasında nadir görülür. AB ülkelerine iş başvurusu yapıyorsanız Europass tercih edilebilir; ancak Türkiye'deki özel sektör başvurularında kronolojik format çok daha etkilidir.",
      },
    ],
  },
  externalResources: {
    title: 'Harici kaynaklar',
    items: [
      { href: 'https://www.iskur.gov.tr/', label: 'İŞKUR — Türkiye İş Kurumu' },
      { href: 'https://www.kariyer.net/', label: "Kariyer.net — Türkiye'nin önde gelen iş ilanı platformu" },
    ],
  },
  stickyCta: { text: "Doğru CV formatını buldunuz mu?", ctaLabel: "Hemen CV oluşturun" },
  bottomCta: {
    title: 'CV format sorunlarını geride bırakın',
    description:
      "AI destekli CV oluşturucumuz format, yazı tipi ve kenar boşluklarını otomatik optimize eder. 20'den fazla ATS uyumlu şablon arasından seçin.",
    ctaLabel: 'Ücretsiz CV oluştur',
  },
};

const contentMap: Record<string, ResumeFormatPageContent> = { en, es, fr, de, ar, ja, it, ko, vi, th, pt, tr };

export function getContent(locale: string): ResumeFormatPageContent {
  return selectContent(contentMap, locale);
}
