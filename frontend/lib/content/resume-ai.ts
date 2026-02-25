import type { FaqItem, CrossLinkItem, GuideLinkItem, StatCard } from './types';
import { selectContent } from './types';

export interface ResumeAIPageContent {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  schemas: {
    breadcrumbName: string;
    articleHeadline: string;
    articleDescription: string;
    softwareAppName: string;
  };
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    trustText: string;
  };
  whatIs: {
    title: string;
    description: string;
    stats: StatCard[];
  };
  features: {
    title: string;
    subtitle: string;
    items: { title: string; description: string }[];
  };
  beforeAfter: {
    title: string;
    subtitle: string;
    beforeLabel: string;
    afterLabel: string;
    items: { before: string; after: string }[];
    cta: string;
  };
  comparison: {
    title: string;
    subtitle: string;
    oursName: string;
    othersName: string;
    rows: { feature: string; ours: string; others: string }[];
  };
  useCases: {
    title: string;
    subtitle: string;
    items: { title: string; description: string }[];
  };
  faq: {
    title: string;
    items: FaqItem[];
  };
  crossLinks: {
    title: string;
    items: CrossLinkItem[];
    guidesTitle: string;
    guides: GuideLinkItem[];
  };
  bottomCta: {
    title: string;
    description: string;
    cta: string;
    subtext: string;
  };
}

const en: ResumeAIPageContent = {
  meta: {
    title: 'Resume AI | Free AI Resume Builder & Generator 2026',
    description: 'Build your resume with AI in seconds. Free Resume AI tool that writes professional content, optimizes for ATS, and helps you land interviews.',
    keywords: 'resume ai, ai resume builder, ai resume generator, resume artificial intelligence, ai powered resume, smart resume builder, ai resume writer, resume ai free',
  },
  schemas: {
    breadcrumbName: 'Resume AI',
    articleHeadline: 'Resume AI: Free AI Resume Builder & Generator 2026',
    articleDescription: 'Build your resume with AI. Our free Resume AI tool writes professional content, optimizes for ATS, and creates job-winning resumes in minutes.',
    softwareAppName: 'Resume AI Builder',
  },
  hero: {
    badge: 'Powered by Advanced AI',
    title: 'Build Your Resume',
    titleHighlight: 'With AI in Seconds',
    subtitle: 'Our <strong>Resume AI</strong> writes professional content, optimizes for ATS systems, and helps you create job-winning resumes \u2014 all for free. According to <a href="https://www.linkedin.com/business/talent/blog/talent-acquisition/how-recruiters-use-ai" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline">LinkedIn research</a>, recruiters spend an average of just 7 seconds reviewing each resume. Let AI help you make every second count.',
    ctaPrimary: 'Try Resume AI Free',
    ctaSecondary: 'See How It Works',
    trustText: 'No sign-up required \u00b7 100% free \u00b7 AI-powered content',
  },
  whatIs: {
    title: 'What is Resume AI?',
    description: '<strong>Resume AI</strong> uses artificial intelligence to transform how you create resumes. Instead of staring at a blank page, our AI analyzes your experience, understands your target role, and generates professional content tailored to your industry. As noted by the <a href="https://www.shrm.org/topics-tools/news/talent-acquisition/ai-rapidly-transforming-how-companies-recruit" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline">Society for Human Resource Management (SHRM)</a>, AI is rapidly transforming recruitment \u2014 and AI-assisted resume writing is now widely accepted by employers.',
    stats: [
      { value: '10x', label: 'Faster than manual writing' },
      { value: '85%', label: 'Higher ATS pass rate' },
      { value: '3M+', label: 'Resumes created with AI' },
    ],
  },
  features: {
    title: 'How Resume AI Helps You',
    subtitle: 'Our AI does more than just format your resume \u2014 it actively helps you write better content.',
    items: [
      { title: 'AI Content Writing', description: 'Our AI writes professional bullet points, summaries, and skill descriptions based on your experience and target role.' },
      { title: 'Smart Keyword Optimization', description: 'AI analyzes job descriptions and suggests industry-specific keywords to help your resume match what employers are looking for.' },
      { title: 'ATS Score Analysis', description: 'Real-time AI scoring tells you exactly how your resume performs against ATS systems before you apply.' },
      { title: 'Achievement Quantification', description: 'AI helps transform vague descriptions into quantifiable achievements with metrics that impress hiring managers.' },
      { title: 'Industry-Specific Templates', description: 'AI recommends the best template layout and sections based on your industry and career level.' },
      { title: 'Grammar & Tone Check', description: 'AI reviews your content for grammar, spelling, and professional tone \u2014 ensuring error-free, polished results.' },
    ],
  },
  beforeAfter: {
    title: 'See AI Transform Your Resume',
    subtitle: 'Real examples of how Resume AI improves your content.',
    beforeLabel: 'Before',
    afterLabel: 'After AI',
    items: [
      { before: 'Responsible for managing team and projects', after: 'Led cross-functional team of 8 engineers, delivering 12 projects on time with 98% client satisfaction' },
      { before: 'Helped increase sales', after: 'Drove 34% YoY revenue growth ($2.4M) by implementing data-driven outreach strategy' },
      { before: 'Good at customer service', after: 'Achieved 4.9/5 customer satisfaction rating, resolving 150+ inquiries daily with 95% first-contact resolution' },
    ],
    cta: 'Build Premium Resume',
  },
  comparison: {
    title: 'Resume AI vs. Writing It Yourself',
    subtitle: 'See why job seekers choose AI-powered resume building.',
    oursName: 'With Resume AI',
    othersName: 'Manual Writing',
    rows: [
      { feature: 'Time to Complete', ours: '10-15 minutes', others: '2-4 hours' },
      { feature: 'Professional Phrasing', ours: 'AI-generated suggestions', others: 'Research required' },
      { feature: 'ATS Optimization', ours: 'Automatic', others: 'Manual guesswork' },
      { feature: 'Industry Keywords', ours: 'AI-suggested', others: 'Self-research' },
      { feature: 'Grammar/Spelling', ours: 'Auto-checked', others: 'Easy to miss errors' },
      { feature: 'Achievement Metrics', ours: 'AI helps quantify', others: 'Often forgotten' },
      { feature: 'Format/Design', ours: '20+ templates', others: 'Start from scratch' },
    ],
  },
  useCases: {
    title: 'Who Uses Resume AI?',
    subtitle: 'AI-powered resume building works for everyone.',
    items: [
      { title: 'Career Changers', description: 'AI helps translate skills from one industry to another' },
      { title: 'Recent Graduates', description: 'Turn internships and projects into professional achievements' },
      { title: 'Senior Professionals', description: 'Condense 20+ years into a compelling 2-page resume' },
      { title: 'Job Seekers', description: 'Create tailored resumes for each application quickly' },
    ],
  },
  faq: {
    title: 'Frequently Asked Questions',
    items: [
      { question: 'What is Resume AI?', answer: 'Resume AI refers to artificial intelligence technology that helps you create professional resumes. Our Resume AI tool writes compelling bullet points, optimizes your content for ATS systems, suggests industry keywords, and formats everything automatically \u2014 so you get a job-winning resume in minutes instead of hours.' },
      { question: 'Is Resume AI better than writing a resume myself?', answer: 'Resume AI helps you write better content faster. It analyzes thousands of successful resumes to suggest professional phrasing, quantifiable achievements, and industry-specific keywords you might miss. You still control the final content \u2014 AI just makes the process easier and more effective.' },
      { question: 'Can Resume AI pass ATS screening?', answer: 'Yes! Our Resume AI is specifically designed for ATS compatibility. It formats your resume with clean, parseable text, suggests keywords that match job descriptions, and provides a real-time ATS score so you can optimize before submitting.' },
      { question: 'Is this Resume AI tool free?', answer: 'Yes, our Resume AI builder is 100% free. Create unlimited resumes, access all templates, and download PDFs at no cost. No credit card or subscription required.' },
      { question: 'How does Resume AI generate content?', answer: 'Our AI analyzes your job title, industry, and experience level to generate tailored suggestions. It uses patterns from millions of successful resumes to craft professional summaries, achievement-focused bullet points, and skill descriptions that resonate with hiring managers.' },
      { question: 'Will my resume look AI-generated?', answer: 'No. Our Resume AI creates natural, professional content that reads like it was written by an expert resume writer. You can edit any suggestion to add your personal voice, and the final result is uniquely yours.' },
    ],
  },
  crossLinks: {
    title: 'More AI Resume Tools',
    items: [
      { href: '/resume-maker', title: 'Resume Maker', subtitle: 'Free AI resume maker' },
      { href: '/tools/ats-checker', title: 'ATS Checker', subtitle: 'AI-powered ATS analysis' },
      { href: '/free-resume-builder', title: 'Free Resume Builder', subtitle: '100% free AI builder' },
    ],
    guidesTitle: 'AI Resume Guides',
    guides: [
      { href: '/career-tips/ai-resume-tools', label: 'AI Tools for Resume Writing (2026)' },
      { href: '/blog/chatgpt-vs-claude-for-resumes', label: 'ChatGPT vs Claude for Resumes' },
      { href: '/blog/how-to-write-ats-friendly-resume', label: 'How to Write an ATS-Friendly Resume' },
      { href: '/resume-examples', label: '300+ Resume Examples' },
    ],
  },
  bottomCta: {
    title: 'Ready to Build Your Resume with AI?',
    description: 'Join millions of job seekers using <a href="/" class="text-purple-600 hover:underline">AI-powered resume building</a> to land more interviews.',
    cta: 'Start With Resume AI Free',
    subtext: 'Free forever. No credit card required.',
  },
};

const es: ResumeAIPageContent = {
  meta: {
    title: 'Curr\u00edculum con IA | Generador de Curr\u00edculum con Inteligencia Artificial 2026',
    description: 'Crea tu curriculum vitae con inteligencia artificial gratis. Generador de CV con IA que escribe contenido profesional, optimiza para ATS y ofrece plantillas y modelos de hoja de vida.',
    keywords: 'curriculum con inteligencia artificial, curriculum vitae con ia, generador de curriculum con ia, crear cv con ia, crear curriculum con ia gratis, modelos de cv con ia, hoja de vida con ia, plantillas curriculum vitae ia',
  },
  schemas: {
    breadcrumbName: 'Curr\u00edculum con IA',
    articleHeadline: 'Curr\u00edculum con Inteligencia Artificial: Generador Gratis 2026',
    articleDescription: 'Crea tu curr\u00edculum vitae con IA. Herramienta gratuita que escribe contenido profesional, optimiza para ATS y genera curr\u00edculums ganadores en minutos.',
    softwareAppName: 'Generador de Curr\u00edculum con IA',
  },
  hero: {
    badge: 'Potenciado por Inteligencia Artificial',
    title: 'Crea Tu Curr\u00edculum',
    titleHighlight: 'Con IA en Segundos',
    subtitle: 'Nuestro <strong>generador de curr\u00edculum con inteligencia artificial</strong> escribe contenido profesional, optimiza para sistemas ATS y te ayuda a crear curr\u00edculums ganadores \u2014 todo gratis. Seg\u00fan una <a href="https://www.linkedin.com/business/talent/blog/talent-acquisition/how-recruiters-use-ai" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline">investigaci\u00f3n de LinkedIn</a>, los reclutadores dedican solo 7 segundos a revisar cada curr\u00edculum. Deja que la IA te ayude a aprovechar cada segundo.',
    ctaPrimary: 'Crear Curr\u00edculum con IA Gratis',
    ctaSecondary: 'Ver C\u00f3mo Funciona',
    trustText: 'Sin registro \u00b7 100% gratis \u00b7 Contenido con IA',
  },
  whatIs: {
    title: '\u00bfQu\u00e9 es un Curr\u00edculum con Inteligencia Artificial?',
    description: 'Un <strong>curr\u00edculum con inteligencia artificial</strong> utiliza IA avanzada para transformar la forma en que creas tu CV. En lugar de enfrentarte a una p\u00e1gina en blanco, nuestra IA analiza tu experiencia, comprende el puesto al que aspiras y genera contenido profesional adaptado a tu sector. Como se\u00f1ala la <a href="https://www.shrm.org/topics-tools/news/talent-acquisition/ai-rapidly-transforming-how-companies-recruit" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline">Society for Human Resource Management (SHRM)</a>, la IA est\u00e1 transformando r\u00e1pidamente el reclutamiento \u2014 y los curr\u00edculums creados con IA son ampliamente aceptados por los empleadores.',
    stats: [
      { value: '10x', label: 'M\u00e1s r\u00e1pido que escribir manualmente' },
      { value: '85%', label: 'Mayor tasa de aprobaci\u00f3n ATS' },
      { value: '3M+', label: 'Curr\u00edculums creados con IA' },
    ],
  },
  features: {
    title: 'C\u00f3mo la IA Te Ayuda a Crear tu Curr\u00edculum',
    subtitle: 'Nuestra IA hace mucho m\u00e1s que dar formato \u2014 te ayuda activamente a escribir mejor contenido para tu curr\u00edculum vitae.',
    items: [
      { title: 'Redacci\u00f3n con IA', description: 'La IA escribe vi\u00f1etas profesionales, res\u00famenes y descripciones de habilidades basados en tu experiencia y el puesto objetivo.' },
      { title: 'Optimizaci\u00f3n de Palabras Clave', description: 'La IA analiza ofertas de empleo y sugiere palabras clave espec\u00edficas del sector para que tu curr\u00edculum coincida con lo que buscan los empleadores.' },
      { title: 'An\u00e1lisis de Puntuaci\u00f3n ATS', description: 'La puntuaci\u00f3n en tiempo real te indica exactamente c\u00f3mo se desempe\u00f1a tu curr\u00edculum frente a los sistemas ATS antes de postularte.' },
      { title: 'Cuantificaci\u00f3n de Logros', description: 'La IA transforma descripciones vagas en logros cuantificables con m\u00e9tricas que impresionan a los reclutadores.' },
      { title: 'Plantillas por Sector', description: 'La IA recomienda el mejor dise\u00f1o y secciones seg\u00fan tu industria y nivel profesional.' },
      { title: 'Revisi\u00f3n Gramatical y de Tono', description: 'La IA revisa tu contenido en busca de errores gramaticales y de ortograf\u00eda, asegurando resultados profesionales y pulidos.' },
    ],
  },
  beforeAfter: {
    title: 'Mira C\u00f3mo la IA Transforma tu Curr\u00edculum',
    subtitle: 'Ejemplos reales de c\u00f3mo la inteligencia artificial mejora el contenido de tu CV.',
    beforeLabel: 'Antes',
    afterLabel: 'Con IA',
    items: [
      { before: 'Responsable de gestionar equipo y proyectos', after: 'Lider\u00e9 un equipo multifuncional de 8 ingenieros, entregando 12 proyectos a tiempo con un 98% de satisfacci\u00f3n del cliente' },
      { before: 'Ayud\u00e9 a aumentar las ventas', after: 'Impuls\u00e9 un crecimiento interanual del 34% ($2.4M) implementando una estrategia de captaci\u00f3n basada en datos' },
      { before: 'Bueno en atenci\u00f3n al cliente', after: 'Logr\u00e9 una calificaci\u00f3n de satisfacci\u00f3n de 4.9/5, resolviendo m\u00e1s de 150 consultas diarias con un 95% de resoluci\u00f3n en primer contacto' },
    ],
    cta: 'Crear Curr\u00edculum Premium',
  },
  comparison: {
    title: 'Curr\u00edculum con IA vs. Escribirlo T\u00fa Mismo',
    subtitle: 'Descubre por qu\u00e9 los profesionales eligen crear su curr\u00edculum vitae con inteligencia artificial.',
    oursName: 'Con IA',
    othersName: 'Manual',
    rows: [
      { feature: 'Tiempo de creaci\u00f3n', ours: '10-15 minutos', others: '2-4 horas' },
      { feature: 'Redacci\u00f3n profesional', ours: 'Sugerencias generadas por IA', others: 'Requiere investigaci\u00f3n' },
      { feature: 'Optimizaci\u00f3n ATS', ours: 'Autom\u00e1tica', others: 'Ensayo y error' },
      { feature: 'Palabras clave del sector', ours: 'Sugeridas por IA', others: 'Investigaci\u00f3n propia' },
      { feature: 'Gram\u00e1tica y ortograf\u00eda', ours: 'Revisi\u00f3n autom\u00e1tica', others: 'F\u00e1cil omitir errores' },
      { feature: 'M\u00e9tricas de logros', ours: 'La IA ayuda a cuantificar', others: 'A menudo se olvidan' },
      { feature: 'Formato y dise\u00f1o', ours: 'M\u00e1s de 20 plantillas', others: 'Empezar desde cero' },
    ],
  },
  useCases: {
    title: '\u00bfQui\u00e9n Usa el Generador de Curr\u00edculum con IA?',
    subtitle: 'Crear curriculum con IA gratis funciona para todos los profesionales.',
    items: [
      { title: 'Cambio de Carrera', description: 'La IA te ayuda a traducir habilidades de un sector a otro de forma profesional' },
      { title: 'Reci\u00e9n Graduados', description: 'Convierte pr\u00e1cticas y proyectos acad\u00e9micos en logros profesionales convincentes' },
      { title: 'Profesionales Senior', description: 'Condensa m\u00e1s de 20 a\u00f1os de experiencia en un curr\u00edculum de 2 p\u00e1ginas impactante' },
      { title: 'Buscadores de Empleo', description: 'Crea curr\u00edculums personalizados para cada oferta de trabajo r\u00e1pidamente' },
    ],
  },
  faq: {
    title: 'Preguntas Frecuentes',
    items: [
      { question: '\u00bfQu\u00e9 es un curr\u00edculum con inteligencia artificial?', answer: 'Un curr\u00edculum con inteligencia artificial es un CV creado con ayuda de IA. Nuestra herramienta escribe vi\u00f1etas profesionales, optimiza tu contenido para sistemas ATS, sugiere palabras clave del sector y da formato autom\u00e1ticamente \u2014 para que obtengas un curr\u00edculum ganador en minutos en lugar de horas.' },
      { question: '\u00bfEs mejor crear mi curriculum vitae con IA que escribirlo yo mismo?', answer: 'La IA te ayuda a redactar mejor contenido en menos tiempo. Analiza miles de curr\u00edculums exitosos para sugerirte frases profesionales, logros cuantificables y palabras clave espec\u00edficas de tu sector que podr\u00edas pasar por alto. T\u00fa mantienes el control del contenido final \u2014 la IA simplemente hace el proceso m\u00e1s f\u00e1cil y efectivo.' },
      { question: '\u00bfUn curr\u00edculum creado con IA puede pasar los filtros ATS?', answer: '\u00a1S\u00ed! Nuestro generador de curr\u00edculum con IA est\u00e1 dise\u00f1ado espec\u00edficamente para compatibilidad ATS. Formatea tu curr\u00edculum con texto limpio y analizable, sugiere palabras clave que coinciden con las ofertas de empleo y proporciona una puntuaci\u00f3n ATS en tiempo real para que optimices antes de enviar.' },
      { question: '\u00bfEs gratis este generador de curriculum con ia?', answer: 'S\u00ed, nuestro generador de curr\u00edculum con inteligencia artificial es 100% gratis. Crea curr\u00edculums ilimitados, accede a todas las plantillas y descarga PDFs sin costo. No se requiere tarjeta de cr\u00e9dito ni suscripci\u00f3n.' },
      { question: '\u00bfC\u00f3mo genera contenido la inteligencia artificial para mi curr\u00edculum?', answer: 'Nuestra IA analiza tu puesto, sector y nivel de experiencia para generar sugerencias personalizadas. Utiliza patrones de millones de curr\u00edculums exitosos para crear res\u00famenes profesionales, vi\u00f1etas enfocadas en logros y descripciones de habilidades que conectan con los reclutadores.' },
      { question: '\u00bfMi curr\u00edculum parecer\u00e1 generado por IA?', answer: 'No. Nuestro generador crea contenido natural y profesional que parece escrito por un experto en redacci\u00f3n de curr\u00edculums. Puedes editar cualquier sugerencia para a\u00f1adir tu toque personal, y el resultado final es \u00fanicamente tuyo.' },
    ],
  },
  crossLinks: {
    title: 'M\u00e1s Herramientas de Curr\u00edculum con IA',
    items: [
      { href: '/resume-maker', title: 'Creador de Curr\u00edculum', subtitle: 'Creador gratuito con IA' },
      { href: '/tools/ats-checker', title: 'Verificador ATS', subtitle: 'An\u00e1lisis ATS con IA' },
      { href: '/free-resume-builder', title: 'Constructor Gratuito', subtitle: 'Constructor de CV 100% gratis' },
    ],
    guidesTitle: 'Gu\u00edas de Curr\u00edculum con IA',
    guides: [
      { href: '/career-tips/ai-resume-tools', label: 'Herramientas IA para Curr\u00edculums (2026)' },
      { href: '/blog/chatgpt-vs-claude-for-resumes', label: 'ChatGPT vs Claude para Curr\u00edculums' },
      { href: '/blog/how-to-write-ats-friendly-resume', label: 'C\u00f3mo Escribir un Curr\u00edculum Compatible con ATS' },
      { href: '/resume-examples', label: 'M\u00e1s de 300 Ejemplos de Curr\u00edculum' },
    ],
  },
  bottomCta: {
    title: '\u00bfListo para Crear tu Curr\u00edculum con Inteligencia Artificial?',
    description: '\u00danete a millones de profesionales que usan <a href="/" class="text-purple-600 hover:underline">inteligencia artificial para crear curr\u00edculums</a> y consigue m\u00e1s entrevistas.',
    cta: 'Crear Curr\u00edculum con IA Gratis',
    subtext: 'Gratis para siempre. Sin tarjeta de cr\u00e9dito.',
  },
};

// ---------------------------------------------------------------------------
// French
// ---------------------------------------------------------------------------
const fr: ResumeAIPageContent = {
  meta: {
    title: 'CV avec IA | Générateur de CV par Intelligence Artificielle Gratuit 2026',
    description: 'Créez votre CV avec l\'IA en quelques secondes. Outil gratuit de CV avec IA qui rédige du contenu professionnel, optimise pour ATS et vous aide à décrocher des entretiens.',
    keywords: 'cv avec ia, créateur de cv ia, générateur de cv ia, cv intelligence artificielle, cv assisté par ia, créateur de cv intelligent, rédacteur de cv ia, cv ia gratuit',
  },
  schemas: {
    breadcrumbName: 'CV avec IA',
    articleHeadline: 'CV avec IA : Générateur de CV par Intelligence Artificielle Gratuit 2026',
    articleDescription: 'Créez votre CV avec l\'IA. Notre outil gratuit de CV avec IA rédige du contenu professionnel, optimise pour ATS et crée des CV percutants en quelques minutes.',
    softwareAppName: 'Générateur de CV avec IA',
  },
  hero: {
    badge: 'Propulsé par l\'Intelligence Artificielle',
    title: 'Créez Votre CV',
    titleHighlight: 'Avec l\'IA en Quelques Secondes',
    subtitle: 'Notre <strong>CV avec IA</strong> rédige du contenu professionnel, optimise pour les systèmes ATS et vous aide à créer des CV percutants — le tout gratuitement. Selon une <a href="https://www.linkedin.com/business/talent/blog/talent-acquisition/how-recruiters-use-ai" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline">étude de LinkedIn</a>, les recruteurs consacrent en moyenne seulement 7 secondes à l\'examen de chaque CV. Laissez l\'IA vous aider à optimiser chaque seconde.',
    ctaPrimary: 'Essayer le CV avec IA Gratuit',
    ctaSecondary: 'Voir Comment Ça Marche',
    trustText: 'Sans inscription \u00b7 100% gratuit \u00b7 Contenu par IA',
  },
  whatIs: {
    title: 'Qu\'est-ce qu\'un CV avec IA ?',
    description: 'Un <strong>CV avec IA</strong> utilise l\'intelligence artificielle pour transformer la façon dont vous créez votre CV. Au lieu de fixer une page blanche, notre IA analyse votre expérience, comprend le poste visé et génère du contenu professionnel adapté à votre secteur. Comme le souligne la <a href="https://www.shrm.org/topics-tools/news/talent-acquisition/ai-rapidly-transforming-how-companies-recruit" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline">Society for Human Resource Management (SHRM)</a>, l\'IA transforme rapidement le recrutement — et les CV assistés par IA sont désormais largement acceptés par les employeurs.',
    stats: [
      { value: '10x', label: 'Plus rapide que la rédaction manuelle' },
      { value: '85%', label: 'Taux de réussite ATS supérieur' },
      { value: '3M+', label: 'CV créés avec l\'IA' },
    ],
  },
  features: {
    title: 'Comment l\'IA Vous Aide à Créer Votre CV',
    subtitle: 'Notre IA fait bien plus que mettre en forme votre CV — elle vous aide activement à rédiger un meilleur contenu.',
    items: [
      { title: 'Rédaction par IA', description: 'Notre IA rédige des puces professionnelles, des résumés et des descriptions de compétences basés sur votre expérience et le poste ciblé.' },
      { title: 'Optimisation Intelligente des Mots-Clés', description: 'L\'IA analyse les offres d\'emploi et suggère des mots-clés sectoriels pour que votre CV corresponde à ce que recherchent les employeurs.' },
      { title: 'Analyse du Score ATS', description: 'Le score en temps réel vous indique exactement comment votre CV se comporte face aux systèmes ATS avant de postuler.' },
      { title: 'Quantification des Réalisations', description: 'L\'IA transforme les descriptions vagues en réalisations quantifiables avec des métriques qui impressionnent les recruteurs.' },
      { title: 'Modèles par Secteur', description: 'L\'IA recommande la meilleure mise en page et les meilleures sections selon votre secteur et votre niveau de carrière.' },
      { title: 'Vérification Grammaire et Ton', description: 'L\'IA vérifie votre contenu pour les erreurs de grammaire, d\'orthographe et de ton professionnel — garantissant un résultat impeccable.' },
    ],
  },
  beforeAfter: {
    title: 'Voyez l\'IA Transformer Votre CV',
    subtitle: 'Exemples concrets de l\'amélioration de votre contenu par l\'IA.',
    beforeLabel: 'Avant',
    afterLabel: 'Après IA',
    items: [
      { before: 'Responsable de la gestion d\'équipe et de projets', after: 'Dirigé une équipe pluridisciplinaire de 8 ingénieurs, livrant 12 projets dans les délais avec 98% de satisfaction client' },
      { before: 'Aidé à augmenter les ventes', after: 'Généré une croissance de 34% du chiffre d\'affaires annuel (2,4 M$) en mettant en place une stratégie de prospection basée sur les données' },
      { before: 'Bon en service client', after: 'Obtenu une note de satisfaction de 4,9/5, résolvant plus de 150 demandes par jour avec 95% de résolution au premier contact' },
    ],
    cta: 'Créer un CV Premium',
  },
  comparison: {
    title: 'CV avec IA vs. Rédaction Manuelle',
    subtitle: 'Découvrez pourquoi les chercheurs d\'emploi choisissent la création de CV par IA.',
    oursName: 'Avec l\'IA',
    othersName: 'Rédaction Manuelle',
    rows: [
      { feature: 'Temps de création', ours: '10-15 minutes', others: '2-4 heures' },
      { feature: 'Formulation professionnelle', ours: 'Suggestions générées par IA', others: 'Recherche nécessaire' },
      { feature: 'Optimisation ATS', ours: 'Automatique', others: 'Tâtonnement' },
      { feature: 'Mots-clés du secteur', ours: 'Suggérés par l\'IA', others: 'Recherche personnelle' },
      { feature: 'Grammaire et orthographe', ours: 'Vérification automatique', others: 'Erreurs faciles à manquer' },
      { feature: 'Métriques de réalisations', ours: 'L\'IA aide à quantifier', others: 'Souvent oubliées' },
      { feature: 'Format et design', ours: 'Plus de 20 modèles', others: 'Partir de zéro' },
    ],
  },
  useCases: {
    title: 'Qui Utilise le CV avec IA ?',
    subtitle: 'La création de CV par intelligence artificielle fonctionne pour tous.',
    items: [
      { title: 'Reconversion Professionnelle', description: 'L\'IA aide à transposer les compétences d\'un secteur à un autre' },
      { title: 'Jeunes Diplômés', description: 'Transformez stages et projets en réalisations professionnelles' },
      { title: 'Cadres Expérimentés', description: 'Condensez plus de 20 ans d\'expérience en un CV percutant de 2 pages' },
      { title: 'Chercheurs d\'Emploi', description: 'Créez des CV personnalisés pour chaque candidature rapidement' },
    ],
  },
  faq: {
    title: 'Questions Fréquemment Posées',
    items: [
      { question: 'Qu\'est-ce qu\'un CV avec IA ?', answer: 'Un CV avec IA est un curriculum vitae créé à l\'aide de l\'intelligence artificielle. Notre outil rédige des puces professionnelles convaincantes, optimise votre contenu pour les systèmes ATS, suggère des mots-clés sectoriels et met tout en forme automatiquement — pour obtenir un CV percutant en minutes au lieu d\'heures.' },
      { question: 'Est-il préférable de créer mon CV avec l\'IA plutôt que de le rédiger moi-même ?', answer: 'L\'IA vous aide à rédiger un meilleur contenu plus rapidement. Elle analyse des milliers de CV réussis pour vous suggérer des formulations professionnelles, des réalisations quantifiables et des mots-clés sectoriels que vous pourriez manquer. Vous gardez le contrôle du contenu final — l\'IA facilite simplement le processus.' },
      { question: 'Un CV créé avec l\'IA peut-il passer les filtres ATS ?', answer: 'Oui ! Notre générateur de CV avec IA est spécialement conçu pour la compatibilité ATS. Il formate votre CV avec un texte propre et analysable, suggère des mots-clés correspondant aux offres d\'emploi et fournit un score ATS en temps réel pour optimiser avant d\'envoyer.' },
      { question: 'Cet outil de CV avec IA est-il gratuit ?', answer: 'Oui, notre générateur de CV avec IA est 100% gratuit. Créez des CV illimités, accédez à tous les modèles et téléchargez des PDF sans frais. Aucune carte bancaire ni abonnement requis.' },
      { question: 'Comment l\'IA génère-t-elle le contenu ?', answer: 'Notre IA analyse votre poste, votre secteur et votre niveau d\'expérience pour générer des suggestions personnalisées. Elle utilise des modèles issus de millions de CV réussis pour créer des résumés professionnels, des puces axées sur les réalisations et des descriptions de compétences qui parlent aux recruteurs.' },
      { question: 'Mon CV aura-t-il l\'air généré par IA ?', answer: 'Non. Notre CV avec IA crée un contenu naturel et professionnel qui semble rédigé par un expert en rédaction de CV. Vous pouvez modifier chaque suggestion pour ajouter votre touche personnelle, et le résultat final vous est propre.' },
    ],
  },
  crossLinks: {
    title: 'Plus d\'Outils CV avec IA',
    items: [
      { href: '/resume-maker', title: 'Créateur de CV', subtitle: 'Créateur de CV gratuit avec IA' },
      { href: '/tools/ats-checker', title: 'Vérificateur ATS', subtitle: 'Analyse ATS par IA' },
      { href: '/free-resume-builder', title: 'Créateur de CV Gratuit', subtitle: 'Créateur 100% gratuit' },
    ],
    guidesTitle: 'Guides CV avec IA',
    guides: [
      { href: '/career-tips/ai-resume-tools', label: 'Outils IA pour la Rédaction de CV (2026)' },
      { href: '/blog/chatgpt-vs-claude-for-resumes', label: 'ChatGPT vs Claude pour les CV' },
      { href: '/blog/how-to-write-ats-friendly-resume', label: 'Comment Rédiger un CV Compatible ATS' },
      { href: '/resume-examples', label: 'Plus de 300 Exemples de CV' },
    ],
  },
  bottomCta: {
    title: 'Prêt à Créer Votre CV avec l\'IA ?',
    description: 'Rejoignez des millions de chercheurs d\'emploi qui utilisent <a href="/" class="text-purple-600 hover:underline">l\'intelligence artificielle pour créer leur CV</a> et décrocher plus d\'entretiens.',
    cta: 'Commencer avec le CV IA Gratuit',
    subtext: 'Gratuit pour toujours. Sans carte bancaire.',
  },
};

// ---------------------------------------------------------------------------
// German
// ---------------------------------------------------------------------------
const de: ResumeAIPageContent = {
  meta: {
    title: 'Lebenslauf mit KI | Kostenloser KI-Lebenslauf-Generator 2026',
    description: 'Erstellen Sie Ihren Lebenslauf mit KI in Sekunden. Kostenloses KI-Tool für Lebensläufe, das professionelle Inhalte schreibt, für ATS optimiert und Ihnen hilft, Vorstellungsgespräche zu bekommen.',
    keywords: 'Lebenslauf KI, KI Lebenslauf erstellen, KI Lebenslauf Generator, Lebenslauf künstliche Intelligenz, KI Lebenslauf kostenlos, intelligenter Lebenslauf, KI Lebenslauf Schreiber, Lebenslauf mit KI erstellen',
  },
  schemas: {
    breadcrumbName: 'Lebenslauf mit KI',
    articleHeadline: 'Lebenslauf mit KI: Kostenloser KI-Lebenslauf-Generator 2026',
    articleDescription: 'Erstellen Sie Ihren Lebenslauf mit KI. Unser kostenloses KI-Tool schreibt professionelle Inhalte, optimiert für ATS und erstellt überzeugende Lebensläufe in Minuten.',
    softwareAppName: 'KI-Lebenslauf-Generator',
  },
  hero: {
    badge: 'Angetrieben von Künstlicher Intelligenz',
    title: 'Erstellen Sie Ihren Lebenslauf',
    titleHighlight: 'Mit KI in Sekunden',
    subtitle: 'Unser <strong>Lebenslauf mit KI</strong> schreibt professionelle Inhalte, optimiert für ATS-Systeme und hilft Ihnen, überzeugende Lebensläufe zu erstellen — alles kostenlos. Laut einer <a href="https://www.linkedin.com/business/talent/blog/talent-acquisition/how-recruiters-use-ai" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline">LinkedIn-Studie</a> verbringen Personalverantwortliche durchschnittlich nur 7 Sekunden mit der Prüfung jedes Lebenslaufs. Lassen Sie die KI Ihnen helfen, jede Sekunde zu nutzen.',
    ctaPrimary: 'Lebenslauf mit KI Kostenlos Testen',
    ctaSecondary: 'So Funktioniert Es',
    trustText: 'Ohne Anmeldung \u00b7 100% kostenlos \u00b7 KI-gestützter Inhalt',
  },
  whatIs: {
    title: 'Was ist ein Lebenslauf mit KI?',
    description: 'Ein <strong>Lebenslauf mit KI</strong> nutzt künstliche Intelligenz, um die Erstellung Ihres Lebenslaufs zu revolutionieren. Statt auf eine leere Seite zu starren, analysiert unsere KI Ihre Erfahrung, versteht Ihre Zielposition und generiert professionelle Inhalte, die auf Ihre Branche zugeschnitten sind. Wie die <a href="https://www.shrm.org/topics-tools/news/talent-acquisition/ai-rapidly-transforming-how-companies-recruit" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline">Society for Human Resource Management (SHRM)</a> berichtet, transformiert KI die Personalbeschaffung rapide — und KI-unterstützte Lebensläufe werden von Arbeitgebern weitgehend akzeptiert.',
    stats: [
      { value: '10x', label: 'Schneller als manuelle Erstellung' },
      { value: '85%', label: 'Höhere ATS-Bestehensquote' },
      { value: '3M+', label: 'Mit KI erstellte Lebensläufe' },
    ],
  },
  features: {
    title: 'Wie KI Ihnen bei Ihrem Lebenslauf Hilft',
    subtitle: 'Unsere KI formatiert nicht nur Ihren Lebenslauf — sie hilft Ihnen aktiv, bessere Inhalte zu schreiben.',
    items: [
      { title: 'KI-Inhaltserstellung', description: 'Unsere KI schreibt professionelle Aufzählungspunkte, Zusammenfassungen und Kompetenzbeschreibungen basierend auf Ihrer Erfahrung und Zielposition.' },
      { title: 'Intelligente Keyword-Optimierung', description: 'Die KI analysiert Stellenangebote und schlägt branchenspezifische Keywords vor, damit Ihr Lebenslauf dem entspricht, was Arbeitgeber suchen.' },
      { title: 'ATS-Score-Analyse', description: 'Die Echtzeit-Bewertung zeigt Ihnen genau, wie Ihr Lebenslauf bei ATS-Systemen abschneidet, bevor Sie sich bewerben.' },
      { title: 'Quantifizierung von Erfolgen', description: 'Die KI verwandelt vage Beschreibungen in quantifizierbare Erfolge mit Kennzahlen, die Personalverantwortliche beeindrucken.' },
      { title: 'Branchenspezifische Vorlagen', description: 'Die KI empfiehlt das beste Layout und die besten Abschnitte basierend auf Ihrer Branche und Karrierestufe.' },
      { title: 'Grammatik- und Tonprüfung', description: 'Die KI prüft Ihren Inhalt auf Grammatik, Rechtschreibung und professionellen Ton — für ein fehlerfreies, ausgefeiltes Ergebnis.' },
    ],
  },
  beforeAfter: {
    title: 'Sehen Sie, Wie KI Ihren Lebenslauf Transformiert',
    subtitle: 'Echte Beispiele, wie KI Ihre Inhalte verbessert.',
    beforeLabel: 'Vorher',
    afterLabel: 'Nach KI',
    items: [
      { before: 'Verantwortlich für Teamleitung und Projektmanagement', after: '8-köpfiges funktionsübergreifendes Ingenieurteam geleitet, 12 Projekte termingerecht mit 98% Kundenzufriedenheit abgeliefert' },
      { before: 'Half beim Umsatzwachstum', after: '34% Umsatzwachstum im Jahresvergleich (2,4 Mio. $) durch Implementierung einer datengesteuerten Vertriebsstrategie erzielt' },
      { before: 'Gut im Kundenservice', after: 'Kundenzufriedenheitsbewertung von 4,9/5 erreicht, über 150 Anfragen täglich mit 95% Erstlösungsquote bearbeitet' },
    ],
    cta: 'Premium-Lebenslauf Erstellen',
  },
  comparison: {
    title: 'Lebenslauf mit KI vs. Selbst Schreiben',
    subtitle: 'Erfahren Sie, warum Bewerber die KI-gestützte Lebenslauf-Erstellung wählen.',
    oursName: 'Mit KI',
    othersName: 'Manuelles Schreiben',
    rows: [
      { feature: 'Erstellungszeit', ours: '10-15 Minuten', others: '2-4 Stunden' },
      { feature: 'Professionelle Formulierung', ours: 'KI-generierte Vorschläge', others: 'Eigenrecherche nötig' },
      { feature: 'ATS-Optimierung', ours: 'Automatisch', others: 'Versuch und Irrtum' },
      { feature: 'Branchen-Keywords', ours: 'KI-vorgeschlagen', others: 'Eigenrecherche' },
      { feature: 'Grammatik/Rechtschreibung', ours: 'Automatisch geprüft', others: 'Fehler leicht übersehen' },
      { feature: 'Erfolgs-Kennzahlen', ours: 'KI hilft zu quantifizieren', others: 'Oft vergessen' },
      { feature: 'Format/Design', ours: 'Über 20 Vorlagen', others: 'Von Grund auf neu' },
    ],
  },
  useCases: {
    title: 'Wer Nutzt den KI-Lebenslauf?',
    subtitle: 'KI-gestützte Lebenslauf-Erstellung funktioniert für jeden.',
    items: [
      { title: 'Quereinsteiger', description: 'KI hilft, Fähigkeiten von einer Branche in eine andere zu übertragen' },
      { title: 'Berufseinsteiger', description: 'Praktika und Projekte in professionelle Erfolge umwandeln' },
      { title: 'Erfahrene Fachkräfte', description: 'Über 20 Jahre Erfahrung in einen überzeugenden 2-seitigen Lebenslauf verdichten' },
      { title: 'Arbeitssuchende', description: 'Schnell maßgeschneiderte Lebensläufe für jede Bewerbung erstellen' },
    ],
  },
  faq: {
    title: 'Häufig Gestellte Fragen',
    items: [
      { question: 'Was ist ein Lebenslauf mit KI?', answer: 'Ein Lebenslauf mit KI ist ein Lebenslauf, der mit Hilfe künstlicher Intelligenz erstellt wird. Unser KI-Tool schreibt überzeugende professionelle Aufzählungspunkte, optimiert Ihre Inhalte für ATS-Systeme, schlägt branchenspezifische Keywords vor und formatiert alles automatisch — sodass Sie in Minuten statt Stunden einen überzeugenden Lebenslauf erhalten.' },
      { question: 'Ist es besser, meinen Lebenslauf mit KI zu erstellen als selbst zu schreiben?', answer: 'KI hilft Ihnen, schneller bessere Inhalte zu schreiben. Sie analysiert Tausende erfolgreicher Lebensläufe, um professionelle Formulierungen, quantifizierbare Erfolge und branchenspezifische Keywords vorzuschlagen, die Sie möglicherweise übersehen. Sie behalten die Kontrolle über den endgültigen Inhalt — KI macht den Prozess einfach einfacher und effektiver.' },
      { question: 'Kann ein mit KI erstellter Lebenslauf ATS-Filter bestehen?', answer: 'Ja! Unser KI-Lebenslauf-Generator ist speziell für ATS-Kompatibilität entwickelt. Er formatiert Ihren Lebenslauf mit sauberem, analysierbarem Text, schlägt Keywords vor, die zu Stellenangeboten passen, und liefert einen Echtzeit-ATS-Score zur Optimierung vor dem Absenden.' },
      { question: 'Ist dieses KI-Lebenslauf-Tool kostenlos?', answer: 'Ja, unser KI-Lebenslauf-Generator ist 100% kostenlos. Erstellen Sie unbegrenzt Lebensläufe, nutzen Sie alle Vorlagen und laden Sie PDFs kostenlos herunter. Keine Kreditkarte oder Abonnement erforderlich.' },
      { question: 'Wie generiert die KI Inhalte?', answer: 'Unsere KI analysiert Ihre Position, Branche und Erfahrungsstufe, um maßgeschneiderte Vorschläge zu generieren. Sie nutzt Muster aus Millionen erfolgreicher Lebensläufe, um professionelle Zusammenfassungen, erfolgsorientierten Aufzählungspunkte und Kompetenzbeschreibungen zu erstellen, die Personalverantwortliche ansprechen.' },
      { question: 'Wird mein Lebenslauf KI-generiert aussehen?', answer: 'Nein. Unser KI-Lebenslauf erstellt natürliche, professionelle Inhalte, die wie von einem Experten für Lebenslauf-Erstellung geschrieben wirken. Sie können jeden Vorschlag bearbeiten, um Ihre persönliche Note einzubringen, und das Endergebnis ist einzigartig Ihres.' },
    ],
  },
  crossLinks: {
    title: 'Weitere KI-Lebenslauf-Tools',
    items: [
      { href: '/resume-maker', title: 'Lebenslauf-Maker', subtitle: 'Kostenloser KI-Lebenslauf-Maker' },
      { href: '/tools/ats-checker', title: 'ATS-Prüfer', subtitle: 'KI-gestützte ATS-Analyse' },
      { href: '/free-resume-builder', title: 'Kostenloser Lebenslauf-Builder', subtitle: '100% kostenloser KI-Builder' },
    ],
    guidesTitle: 'KI-Lebenslauf-Leitfäden',
    guides: [
      { href: '/career-tips/ai-resume-tools', label: 'KI-Tools für die Lebenslauf-Erstellung (2026)' },
      { href: '/blog/chatgpt-vs-claude-for-resumes', label: 'ChatGPT vs Claude für Lebensläufe' },
      { href: '/blog/how-to-write-ats-friendly-resume', label: 'Einen ATS-freundlichen Lebenslauf Schreiben' },
      { href: '/resume-examples', label: 'Über 300 Lebenslauf-Beispiele' },
    ],
  },
  bottomCta: {
    title: 'Bereit, Ihren Lebenslauf mit KI zu Erstellen?',
    description: 'Schließen Sie sich Millionen von Bewerbern an, die <a href="/" class="text-purple-600 hover:underline">KI-gestützte Lebenslauf-Erstellung</a> nutzen, um mehr Vorstellungsgespräche zu bekommen.',
    cta: 'Jetzt mit dem KI-Lebenslauf Starten',
    subtext: 'Für immer kostenlos. Keine Kreditkarte erforderlich.',
  },
};

// ---------------------------------------------------------------------------
// Arabic
// ---------------------------------------------------------------------------
const ar: ResumeAIPageContent = {
  meta: {
    title: 'سيرة ذاتية بالذكاء الاصطناعي | أداة إنشاء سيرة ذاتية بالـ AI مجاناً 2026',
    description: 'أنشئ سيرتك الذاتية بالذكاء الاصطناعي في ثوانٍ. أداة مجانية تكتب محتوى احترافياً وتحسّن لأنظمة ATS وتساعدك في الحصول على مقابلات عمل.',
    keywords: 'سيرة ذاتية بالذكاء الاصطناعي, أداة إنشاء سيرة ذاتية بالـ AI, مولّد سيرة ذاتية بالذكاء الاصطناعي, سيرة ذاتية ذكية, cv بالذكاء الاصطناعي, إنشاء سيرة ذاتية مجانية بالـ AI, كاتب سيرة ذاتية ذكي',
  },
  schemas: {
    breadcrumbName: 'سيرة ذاتية بالذكاء الاصطناعي',
    articleHeadline: 'سيرة ذاتية بالذكاء الاصطناعي: أداة إنشاء مجانية 2026',
    articleDescription: 'أنشئ سيرتك الذاتية بالذكاء الاصطناعي. أداتنا المجانية تكتب محتوى احترافياً وتحسّن لأنظمة ATS وتنشئ سيراً ذاتية مميزة في دقائق.',
    softwareAppName: 'مولّد السيرة الذاتية بالذكاء الاصطناعي',
  },
  hero: {
    badge: 'مدعوم بالذكاء الاصطناعي المتقدم',
    title: 'أنشئ سيرتك الذاتية',
    titleHighlight: 'بالذكاء الاصطناعي في ثوانٍ',
    subtitle: '<strong>أداة السيرة الذاتية بالذكاء الاصطناعي</strong> تكتب محتوى احترافياً وتحسّن لأنظمة ATS وتساعدك في إنشاء سير ذاتية مميزة — مجاناً بالكامل. وفقاً لـ <a href="https://www.linkedin.com/business/talent/blog/talent-acquisition/how-recruiters-use-ai" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline">دراسة من LinkedIn</a>، يقضي مسؤولو التوظيف 7 ثوانٍ فقط في مراجعة كل سيرة ذاتية. دع الذكاء الاصطناعي يساعدك في الاستفادة من كل ثانية.',
    ctaPrimary: 'جرّب السيرة الذاتية بالـ AI مجاناً',
    ctaSecondary: 'اعرف كيف تعمل',
    trustText: 'بدون تسجيل \u00b7 100% مجاني \u00b7 محتوى بالذكاء الاصطناعي',
  },
  whatIs: {
    title: 'ما هي السيرة الذاتية بالذكاء الاصطناعي؟',
    description: '<strong>السيرة الذاتية بالذكاء الاصطناعي</strong> تستخدم الذكاء الاصطناعي لتغيير طريقة إنشاء سيرتك الذاتية. بدلاً من التحديق في صفحة فارغة، يحلل ذكاؤنا الاصطناعي خبرتك ويفهم الدور المستهدف وينشئ محتوى احترافياً مصمماً لمجالك. كما تشير <a href="https://www.shrm.org/topics-tools/news/talent-acquisition/ai-rapidly-transforming-how-companies-recruit" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline">جمعية إدارة الموارد البشرية (SHRM)</a>، يحوّل الذكاء الاصطناعي عملية التوظيف بسرعة — والسير الذاتية المدعومة بالـ AI مقبولة على نطاق واسع من أصحاب العمل.',
    stats: [
      { value: '10x', label: 'أسرع من الكتابة اليدوية' },
      { value: '85%', label: 'معدل نجاح أعلى في ATS' },
      { value: '3M+', label: 'سيرة ذاتية أُنشئت بالـ AI' },
    ],
  },
  features: {
    title: 'كيف يساعدك الذكاء الاصطناعي في سيرتك الذاتية',
    subtitle: 'ذكاؤنا الاصطناعي يفعل أكثر من مجرد التنسيق — يساعدك فعلياً في كتابة محتوى أفضل.',
    items: [
      { title: 'كتابة المحتوى بالـ AI', description: 'يكتب الذكاء الاصطناعي نقاطاً احترافية وملخصات ووصف مهارات بناءً على خبرتك والدور المستهدف.' },
      { title: 'تحسين ذكي للكلمات المفتاحية', description: 'يحلل الـ AI إعلانات الوظائف ويقترح كلمات مفتاحية خاصة بالمجال لمطابقة ما يبحث عنه أصحاب العمل.' },
      { title: 'تحليل نتيجة ATS', description: 'التقييم الفوري يُظهر بالضبط كيف تؤدي سيرتك الذاتية أمام أنظمة ATS قبل التقديم.' },
      { title: 'قياس الإنجازات', description: 'يحوّل الـ AI الأوصاف الغامضة إلى إنجازات قابلة للقياس بأرقام تُبهر مسؤولي التوظيف.' },
      { title: 'قوالب حسب المجال', description: 'يوصي الـ AI بأفضل تخطيط وأقسام بناءً على مجالك ومستواك المهني.' },
      { title: 'فحص القواعد والأسلوب', description: 'يراجع الـ AI محتواك بحثاً عن أخطاء نحوية وإملائية، مما يضمن نتائج احترافية ومتقنة.' },
    ],
  },
  beforeAfter: {
    title: 'شاهد كيف يحوّل الذكاء الاصطناعي سيرتك الذاتية',
    subtitle: 'أمثلة حقيقية على تحسين المحتوى بالذكاء الاصطناعي.',
    beforeLabel: 'قبل',
    afterLabel: 'بعد الـ AI',
    items: [
      { before: 'مسؤول عن إدارة الفريق والمشاريع', after: 'قدت فريقاً متعدد التخصصات من 8 مهندسين، وسلّمت 12 مشروعاً في الموعد المحدد مع 98% رضا العملاء' },
      { before: 'ساعدت في زيادة المبيعات', after: 'حققت نمواً بنسبة 34% في الإيرادات السنوية (2.4 مليون دولار) من خلال تطبيق استراتيجية استقطاب قائمة على البيانات' },
      { before: 'جيد في خدمة العملاء', after: 'حققت تقييم رضا عملاء 4.9/5، مع حل أكثر من 150 استفساراً يومياً بنسبة حل من أول اتصال 95%' },
    ],
    cta: 'إنشاء سيرة ذاتية مميزة',
  },
  comparison: {
    title: 'السيرة الذاتية بالـ AI مقابل الكتابة اليدوية',
    subtitle: 'اكتشف لماذا يختار الباحثون عن عمل إنشاء سيرتهم الذاتية بالذكاء الاصطناعي.',
    oursName: 'مع الـ AI',
    othersName: 'الكتابة اليدوية',
    rows: [
      { feature: 'وقت الإنشاء', ours: '10-15 دقيقة', others: '2-4 ساعات' },
      { feature: 'صياغة احترافية', ours: 'اقتراحات مولّدة بالـ AI', others: 'تحتاج بحثاً' },
      { feature: 'تحسين ATS', ours: 'تلقائي', others: 'تخمين يدوي' },
      { feature: 'كلمات مفتاحية للمجال', ours: 'يقترحها الـ AI', others: 'بحث شخصي' },
      { feature: 'القواعد والإملاء', ours: 'فحص تلقائي', others: 'سهل تفويت الأخطاء' },
      { feature: 'أرقام الإنجازات', ours: 'الـ AI يساعد في القياس', others: 'غالباً تُنسى' },
      { feature: 'التنسيق والتصميم', ours: 'أكثر من 20 قالباً', others: 'البدء من الصفر' },
    ],
  },
  useCases: {
    title: 'من يستخدم السيرة الذاتية بالذكاء الاصطناعي؟',
    subtitle: 'إنشاء السيرة الذاتية بالذكاء الاصطناعي يناسب الجميع.',
    items: [
      { title: 'المتحولون مهنياً', description: 'الـ AI يساعد في ترجمة المهارات من مجال إلى آخر' },
      { title: 'الخريجون الجدد', description: 'حوّل التدريبات والمشاريع إلى إنجازات مهنية مقنعة' },
      { title: 'المحترفون ذوو الخبرة', description: 'اختصر أكثر من 20 عاماً من الخبرة في سيرة ذاتية مؤثرة من صفحتين' },
      { title: 'الباحثون عن عمل', description: 'أنشئ سيراً ذاتية مخصصة لكل طلب وظيفة بسرعة' },
    ],
  },
  faq: {
    title: 'الأسئلة الشائعة',
    items: [
      { question: 'ما هي السيرة الذاتية بالذكاء الاصطناعي؟', answer: 'السيرة الذاتية بالذكاء الاصطناعي هي سيرة ذاتية تُنشأ بمساعدة الـ AI. أداتنا تكتب نقاطاً احترافية مقنعة، وتحسّن محتواك لأنظمة ATS، وتقترح كلمات مفتاحية للمجال، وتنسّق كل شيء تلقائياً — لتحصل على سيرة ذاتية مميزة في دقائق بدلاً من ساعات.' },
      { question: 'هل إنشاء سيرتي الذاتية بالـ AI أفضل من كتابتها بنفسي؟', answer: 'الذكاء الاصطناعي يساعدك في كتابة محتوى أفضل وأسرع. يحلل آلاف السير الذاتية الناجحة ليقترح صياغة احترافية وإنجازات قابلة للقياس وكلمات مفتاحية خاصة بمجالك قد تفوتك. أنت تحتفظ بالسيطرة على المحتوى النهائي — الـ AI يجعل العملية أسهل وأكثر فعالية فقط.' },
      { question: 'هل يمكن لسيرة ذاتية مُنشأة بالـ AI اجتياز فلاتر ATS؟', answer: 'نعم! مولّد السيرة الذاتية بالذكاء الاصطناعي مصمم خصيصاً للتوافق مع ATS. ينسّق سيرتك الذاتية بنص نظيف وقابل للتحليل، ويقترح كلمات مفتاحية تتطابق مع إعلانات الوظائف، ويوفر تقييم ATS فوري للتحسين قبل الإرسال.' },
      { question: 'هل أداة السيرة الذاتية بالـ AI هذه مجانية؟', answer: 'نعم، مولّد السيرة الذاتية بالذكاء الاصطناعي مجاني 100%. أنشئ سيراً ذاتية غير محدودة، واستخدم جميع القوالب، وحمّل ملفات PDF بدون تكلفة. لا حاجة لبطاقة ائتمان أو اشتراك.' },
      { question: 'كيف يولّد الذكاء الاصطناعي المحتوى؟', answer: 'يحلل ذكاؤنا الاصطناعي منصبك ومجالك ومستوى خبرتك لتوليد اقتراحات مخصصة. يستخدم أنماطاً من ملايين السير الذاتية الناجحة لإنشاء ملخصات احترافية ونقاط تركز على الإنجازات ووصف مهارات يتفاعل معها مسؤولو التوظيف.' },
      { question: 'هل ستبدو سيرتي الذاتية وكأنها مولّدة بالـ AI؟', answer: 'لا. أداتنا تنشئ محتوى طبيعياً واحترافياً يبدو وكأنه مكتوب بواسطة خبير في كتابة السير الذاتية. يمكنك تعديل أي اقتراح لإضافة لمستك الشخصية، والنتيجة النهائية تخصك وحدك.' },
    ],
  },
  crossLinks: {
    title: 'المزيد من أدوات السيرة الذاتية بالـ AI',
    items: [
      { href: '/resume-maker', title: 'صانع السيرة الذاتية', subtitle: 'صانع سيرة ذاتية مجاني بالـ AI' },
      { href: '/tools/ats-checker', title: 'فاحص ATS', subtitle: 'تحليل ATS بالذكاء الاصطناعي' },
      { href: '/free-resume-builder', title: 'أداة إنشاء مجانية', subtitle: 'أداة إنشاء 100% مجانية' },
    ],
    guidesTitle: 'أدلة السيرة الذاتية بالـ AI',
    guides: [
      { href: '/career-tips/ai-resume-tools', label: 'أدوات الذكاء الاصطناعي لكتابة السيرة الذاتية (2026)' },
      { href: '/blog/chatgpt-vs-claude-for-resumes', label: 'ChatGPT مقابل Claude للسير الذاتية' },
      { href: '/blog/how-to-write-ats-friendly-resume', label: 'كيفية كتابة سيرة ذاتية متوافقة مع ATS' },
      { href: '/resume-examples', label: 'أكثر من 300 مثال سيرة ذاتية' },
    ],
  },
  bottomCta: {
    title: 'هل أنت مستعد لإنشاء سيرتك الذاتية بالذكاء الاصطناعي؟',
    description: 'انضم إلى ملايين الباحثين عن عمل الذين يستخدمون <a href="/" class="text-purple-600 hover:underline">الذكاء الاصطناعي لإنشاء سيرهم الذاتية</a> للحصول على المزيد من المقابلات.',
    cta: 'ابدأ بالسيرة الذاتية بالـ AI مجاناً',
    subtext: 'مجاني للأبد. بدون بطاقة ائتمان.',
  },
};

const contentMap: Record<string, ResumeAIPageContent> = { en, es, fr, de, ar };

export function getContent(locale: string): ResumeAIPageContent {
  return selectContent(contentMap, locale);
}
