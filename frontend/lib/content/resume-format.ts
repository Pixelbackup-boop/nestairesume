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

const contentMap: Record<string, ResumeFormatPageContent> = { en, es, fr, de, ar, ja };

export function getContent(locale: string): ResumeFormatPageContent {
  return selectContent(contentMap, locale);
}
