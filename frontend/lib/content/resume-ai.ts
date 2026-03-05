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

// ---------------------------------------------------------------------------
// Japanese
// ---------------------------------------------------------------------------
const ja: ResumeAIPageContent = {
  meta: {
    title: 'AI履歴書作成 | 無料AI履歴書ジェネレーター2026 | Best AI Resume',
    description: 'AI履歴書作成ツールでプロの履歴書を数分で作成。AI搭載の職務経歴書作成、ATS最適化、20以上のテンプレート — 完全無料。',
    keywords: 'AI履歴書, AI履歴書作成, 履歴書作成ツール, 履歴書サンプル, 職務経歴書, AI履歴書ジェネレーター, 履歴書 AI 無料',
  },
  schemas: {
    breadcrumbName: 'AI履歴書',
    articleHeadline: 'AI履歴書作成：無料AI履歴書ジェネレーター2026',
    articleDescription: 'AIが履歴書のコンテンツを作成・最適化する仕組みを発見。無料のAI搭載履歴書作成ツールで、より多くの面接を獲得しましょう。',
    softwareAppName: 'AI履歴書作成ツール',
  },
  hero: {
    badge: 'AI搭載の履歴書ビルダー',
    title: 'AIが作る、あなたの',
    titleHighlight: '最高の履歴書',
    subtitle: '<strong>AI履歴書作成ツール</strong>がプロのコンテンツを作成し、ATSに最適化し、際立つ履歴書の作成を支援 — 完全無料。<a href="https://www.linkedin.com/business/talent/blog/talent-acquisition/how-recruiters-use-ai" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline">LinkedInの調査</a>によると、採用担当者は各履歴書に平均7秒しかかけません。AIで一秒一秒を最大限に活用しましょう。',
    ctaPrimary: '無料でAI履歴書を試す',
    ctaSecondary: '仕組みを見る',
    trustText: '登録不要 · 100%無料 · AI搭載コンテンツ',
  },
  whatIs: {
    title: 'AI履歴書とは？',
    description: '<strong>AI履歴書</strong>は、履歴書作成の方法を根本から変えます。空白ページを見つめる代わりに、AIがあなたの経験を分析し、目標ポジションを理解し、業界に最適化されたプロのコンテンツを生成します。<a href="https://www.shrm.org/topics-tools/news/talent-acquisition/ai-rapidly-transforming-how-companies-recruit" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline">人事管理協会（SHRM）</a>が指摘するように、AIは採用プロセスを急速に変革しており、AI搭載の履歴書は雇用主に広く受け入れられています。',
    stats: [
      { value: '10倍', label: '手書きより速い' },
      { value: '85%', label: 'ATS通過率の向上' },
      { value: '300万+', label: 'AIで作成された履歴書' },
    ],
  },
  features: {
    title: 'AIが履歴書作成をサポートする方法',
    subtitle: 'AIはフォーマットだけでなく、より良いコンテンツの作成を実際にサポートします。',
    items: [
      { title: 'AIコンテンツ作成', description: 'AIがあなたの経験と目標ポジションに基づいて、プロの箇条書き、サマリー、スキル説明を作成します。' },
      { title: 'スマートキーワード最適化', description: 'AIが求人広告を分析し、雇用主が求める業界固有のキーワードを提案します。' },
      { title: 'ATSスコア分析', description: 'リアルタイムスコアリングで、応募前にATSシステムでの履歴書の評価を確認できます。' },
      { title: '実績の数値化', description: 'AIが曖昧な説明を、採用担当者を惹きつける数値化された実績に変換します。' },
      { title: '業界別テンプレート', description: 'AIが業界と経験レベルに基づいて最適なレイアウトとセクションを推奨します。' },
      { title: '文法・スタイルチェック', description: 'AIがコンテンツの文法やスペルエラーをチェックし、プロフェッショナルで洗練された仕上がりを保証します。' },
    ],
  },
  beforeAfter: {
    title: 'AIが履歴書をどう変えるか見てみましょう',
    subtitle: 'AIによるコンテンツ改善の実例。',
    beforeLabel: '改善前',
    afterLabel: 'AI改善後',
    items: [
      { before: 'チーム管理とプロジェクト管理を担当', after: '8名のクロスファンクショナルエンジニアチームをリードし、12プロジェクトを期限内に納品、顧客満足度98%を達成' },
      { before: '売上増加に貢献', after: 'データ駆動型獲得戦略の実施により年間売上34%増（240万ドル）を達成' },
      { before: 'カスタマーサービスが得意', after: '顧客満足度4.9/5を達成、1日150件以上の問い合わせに対応し初回解決率95%を実現' },
    ],
    cta: 'プレミアム履歴書を作成',
  },
  comparison: {
    title: 'AI履歴書 vs 手書き',
    subtitle: '求職者がAI履歴書作成を選ぶ理由。',
    oursName: 'AI活用',
    othersName: '手書き',
    rows: [
      { feature: '作成時間', ours: '10-15分', others: '2-4時間' },
      { feature: 'プロの文章表現', ours: 'AIが提案を生成', others: '調査が必要' },
      { feature: 'ATS最適化', ours: '自動', others: '手動で推測' },
      { feature: '業界キーワード', ours: 'AIが提案', others: '自分で調べる' },
      { feature: '文法・スペル', ours: '自動チェック', others: '見落としやすい' },
      { feature: '実績の数値化', ours: 'AIがサポート', others: '忘れがち' },
      { feature: 'フォーマット・デザイン', ours: '20以上のテンプレート', others: 'ゼロから作成' },
    ],
  },
  useCases: {
    title: 'AI履歴書を使うのはどんな人？',
    subtitle: 'AI履歴書作成はすべての人に適しています。',
    items: [
      { title: 'キャリアチェンジ', description: 'AIが異業種間のスキル転換を支援' },
      { title: '新卒者', description: 'インターンシップやプロジェクトを説得力のある職務実績に変換' },
      { title: '経験豊富なプロ', description: '20年以上の経験を効果的な2ページの履歴書に凝縮' },
      { title: '転職活動中の方', description: '各応募先に合わせたカスタム履歴書を迅速に作成' },
    ],
  },
  faq: {
    title: 'よくある質問',
    items: [
      { question: 'AI履歴書とは何ですか？', answer: 'AI履歴書とは、AIの支援を受けて作成された履歴書です。当社のツールはプロフェッショナルな箇条書きを作成し、ATSに最適化し、業界キーワードを提案し、すべてを自動的にフォーマット — 数時間ではなく数分で際立つ履歴書が完成します。' },
      { question: 'AIで履歴書を作成するのと自分で書くのではどちらが良いですか？', answer: 'AIはより良いコンテンツをより速く作成するのを支援します。何千もの成功した履歴書を分析して、プロフェッショナルな表現、数値化された実績、見落としがちな業界キーワードを提案します。最終コンテンツの管理権はあなたにあり、AIはプロセスをより簡単で効果的にするだけです。' },
      { question: 'AIで作成した履歴書はATSフィルターを通過できますか？', answer: 'はい！AI履歴書ジェネレーターはATS互換性のために特別に設計されています。クリーンで解析可能なテキストで履歴書をフォーマットし、求人広告に一致するキーワードを提案し、送信前に最適化するためのリアルタイムATSスコアを提供します。' },
      { question: 'このAI履歴書ツールは無料ですか？', answer: 'はい、AI履歴書ジェネレーターは100%無料です。無制限の履歴書を作成し、すべてのテンプレートを使用し、PDFをダウンロード — 一切無料。クレジットカードもサブスクリプションも不要。' },
      { question: 'AIはどのようにコンテンツを生成しますか？', answer: 'AIはあなたの職種、業界、経験レベルを分析し、カスタマイズされた提案を生成します。何百万もの成功した履歴書のパターンを使用して、プロフェッショナルサマリー、実績重視の箇条書き、採用担当者に響くスキル説明を作成します。' },
      { question: '履歴書がAIで作成されたように見えますか？', answer: 'いいえ。当社のツールは、プロの履歴書ライターが書いたような自然でプロフェッショナルなコンテンツを生成します。すべての提案を編集して個人的なタッチを加えることができ、最終結果は完全にあなたのものです。' },
    ],
  },
  crossLinks: {
    title: 'その他のAI履歴書ツール',
    items: [
      { href: '/resume-maker', title: '履歴書メーカー', subtitle: '無料AI履歴書メーカー' },
      { href: '/tools/ats-checker', title: 'ATSチェッカー', subtitle: 'AI搭載ATS分析' },
      { href: '/free-resume-builder', title: '無料ビルダー', subtitle: '100%無料ビルダー' },
    ],
    guidesTitle: 'AI履歴書ガイド',
    guides: [
      { href: '/career-tips/ai-resume-tools', label: '履歴書作成のためのAIツール（2026年版）' },
      { href: '/blog/chatgpt-vs-claude-for-resumes', label: 'ChatGPT vs Claude：履歴書作成対決' },
      { href: '/blog/how-to-write-ats-friendly-resume', label: 'ATS対応履歴書の書き方' },
      { href: '/resume-examples', label: '300以上の履歴書サンプル' },
    ],
  },
  bottomCta: {
    title: 'AI履歴書を作成する準備はできましたか？',
    description: '<a href="/" class="text-purple-600 hover:underline">AI履歴書作成</a>で面接獲得率を上げている数百万の求職者に参加しましょう。',
    cta: '無料でAI履歴書を始める',
    subtext: 'ずっと無料。クレジットカード不要。',
  },
};

const it: ResumeAIPageContent = {
  meta: {
    title: 'Curriculum Vitae con Intelligenza Artificiale | Generatore CV con IA Gratis 2026 | Best AI Resume',
    description: 'Crea il tuo curriculum vitae con l\'intelligenza artificiale in pochi minuti. Scrittura automatica del CV con IA, ottimizzazione ATS, 20+ modelli — tutto gratis.',
    keywords: 'curriculum vitae intelligenza artificiale, cv con ia, generatore cv automatico, curriculum vitae ia, cv intelligenza artificiale, generatore curriculum con ia, cv automatico gratis',
  },
  schemas: {
    breadcrumbName: 'CV con IA',
    articleHeadline: 'Curriculum Vitae con Intelligenza Artificiale: Generatore CV con IA Gratis 2026',
    articleDescription: 'Scopri come l\'IA crea e ottimizza i contenuti del curriculum vitae. Usa il nostro generatore di CV con IA gratuito per ottenere più colloqui.',
    softwareAppName: 'Generatore Curriculum Vitae con IA',
  },
  hero: {
    badge: 'Creatore di CV con Intelligenza Artificiale',
    title: 'L\'IA crea il tuo',
    titleHighlight: 'curriculum vitae perfetto',
    subtitle: 'Il nostro <strong>generatore di curriculum vitae con intelligenza artificiale</strong> scrive contenuti professionali, ottimizza per gli ATS e ti aiuta a creare un CV che spicca — completamente gratis. Secondo <a href="https://www.linkedin.com/business/talent/blog/talent-acquisition/how-recruiters-use-ai" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline">LinkedIn</a>, i recruiter dedicano in media 7 secondi a ogni CV. Con l\'IA, ogni secondo conta.',
    ctaPrimary: 'Prova il CV con IA gratis',
    ctaSecondary: 'Come funziona',
    trustText: 'Nessuna registrazione · 100% gratis · Contenuti generati dall\'IA',
  },
  whatIs: {
    title: 'Cos\'è un curriculum vitae con IA?',
    description: 'Un <strong>curriculum vitae con intelligenza artificiale</strong> trasforma radicalmente il modo in cui crei il tuo CV. Invece di fissare una pagina vuota, l\'IA analizza le tue esperienze, comprende la posizione desiderata e genera contenuti professionali ottimizzati per il tuo settore. Come evidenzia la <a href="https://www.shrm.org/topics-tools/news/talent-acquisition/ai-rapidly-transforming-how-companies-recruit" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline">SHRM (Society for Human Resource Management)</a>, l\'IA sta trasformando rapidamente i processi di selezione, e i CV creati con l\'IA sono ampiamente accettati dai datori di lavoro.',
    stats: [
      { value: '10x', label: 'Più veloce della scrittura manuale' },
      { value: '85%', label: 'Miglioramento del tasso di superamento ATS' },
      { value: '3M+', label: 'CV creati con l\'IA' },
    ],
  },
  features: {
    title: 'Come l\'IA ti aiuta a creare il curriculum vitae',
    subtitle: 'L\'IA non si limita alla formattazione — ti aiuta concretamente a scrivere contenuti migliori.',
    items: [
      { title: 'Scrittura contenuti con IA', description: 'L\'IA genera esperienze lavorative professionali, profili riassuntivi e descrizioni di competenze basate sulle tue esperienze e sulla posizione desiderata.' },
      { title: 'Ottimizzazione intelligente delle parole chiave', description: 'L\'IA analizza gli annunci di lavoro e suggerisce le parole chiave specifiche del settore che i datori di lavoro cercano.' },
      { title: 'Analisi punteggio ATS', description: 'Il punteggio in tempo reale ti mostra come il tuo curriculum vitae verrà valutato dai sistemi ATS prima di candidarti.' },
      { title: 'Quantificazione dei risultati', description: 'L\'IA trasforma descrizioni generiche in risultati quantificati e misurabili che catturano l\'attenzione dei recruiter.' },
      { title: 'Modelli specifici per settore', description: 'L\'IA consiglia il layout e le sezioni più adatte in base al tuo settore e livello di esperienza.' },
      { title: 'Controllo grammaticale e stile', description: 'L\'IA verifica grammatica ed errori ortografici per garantire un risultato professionale e curato.' },
    ],
  },
  beforeAfter: {
    title: 'Guarda come l\'IA trasforma il tuo curriculum vitae',
    subtitle: 'Esempi reali di miglioramenti apportati dall\'intelligenza artificiale.',
    beforeLabel: 'Prima',
    afterLabel: 'Dopo con IA',
    items: [
      { before: 'Gestione del team e dei progetti aziendali', after: 'Coordinamento di un team cross-funzionale di 8 ingegneri, consegna di 12 progetti nei tempi previsti con il 98% di soddisfazione del cliente' },
      { before: 'Aumento delle vendite dell\'azienda', after: 'Incremento del fatturato annuo del 34% (€2,1M) grazie all\'implementazione di strategie di acquisizione basate sui dati' },
      { before: 'Bravo nel servizio clienti', after: 'Raggiungimento di un punteggio di soddisfazione cliente di 4.9/5, gestendo oltre 150 richieste giornaliere con il 95% di risoluzione al primo contatto' },
    ],
    cta: 'Crea un CV professionale',
  },
  comparison: {
    title: 'CV con IA vs CV scritto a mano',
    subtitle: 'Perché chi cerca lavoro sceglie il curriculum vitae con intelligenza artificiale.',
    oursName: 'Con IA',
    othersName: 'Scritto a mano',
    rows: [
      { feature: 'Tempo di creazione', ours: '10-15 minuti', others: '2-4 ore' },
      { feature: 'Scrittura professionale', ours: 'L\'IA genera suggerimenti', others: 'Richiede ricerca' },
      { feature: 'Ottimizzazione ATS', ours: 'Automatica', others: 'Manuale e approssimativa' },
      { feature: 'Parole chiave di settore', ours: 'Suggerite dall\'IA', others: 'Da cercare da soli' },
      { feature: 'Grammatica e ortografia', ours: 'Controllo automatico', others: 'Facile da trascurare' },
      { feature: 'Quantificazione risultati', ours: 'L\'IA ti assiste', others: 'Spesso dimenticata' },
      { feature: 'Formattazione e design', ours: '20+ modelli', others: 'Da creare da zero' },
    ],
  },
  useCases: {
    title: 'Chi usa il curriculum vitae con IA?',
    subtitle: 'Il generatore di CV con intelligenza artificiale è adatto a tutti.',
    items: [
      { title: 'Cambio di carriera', description: 'L\'IA ti aiuta a valorizzare competenze trasferibili tra settori diversi' },
      { title: 'Neolaureati', description: 'Trasforma stage e progetti universitari in esperienze lavorative convincenti' },
      { title: 'Professionisti esperti', description: 'Condensa oltre 20 anni di esperienza in un curriculum vitae efficace di due pagine' },
      { title: 'Chi cerca attivamente lavoro', description: 'Crea rapidamente CV personalizzati per ogni candidatura' },
    ],
  },
  faq: {
    title: 'Domande frequenti',
    items: [
      { question: 'Cos\'è un curriculum vitae con intelligenza artificiale?', answer: 'Un curriculum vitae con IA è un CV creato con il supporto dell\'intelligenza artificiale. Il nostro strumento genera esperienze lavorative professionali, ottimizza per gli ATS, suggerisce parole chiave di settore e formatta automaticamente tutto — ottenendo un CV eccellente in pochi minuti invece che in ore.' },
      { question: 'È meglio creare il CV con l\'IA o scriverlo da soli?', answer: 'L\'IA ti aiuta a scrivere contenuti migliori più velocemente. Analizza migliaia di CV di successo per suggerire espressioni professionali, risultati quantificati e parole chiave di settore che potresti non conoscere. Mantieni il pieno controllo sul contenuto finale, l\'IA rende semplicemente il processo più efficace.' },
      { question: 'Un CV creato con l\'IA supera i filtri ATS?', answer: 'Sì! Il nostro generatore di curriculum vitae con IA è progettato specificamente per la compatibilità ATS. Formatta il CV con testo pulito e leggibile, suggerisce parole chiave corrispondenti agli annunci di lavoro e fornisce un punteggio ATS in tempo reale per ottimizzare prima dell\'invio.' },
      { question: 'Questo strumento per CV con IA è gratuito?', answer: 'Sì, il generatore di curriculum vitae con IA è 100% gratuito. Crea CV illimitati, usa tutti i modelli, scarica in PDF — tutto gratis. Nessuna carta di credito, nessun abbonamento.' },
      { question: 'Come fa l\'IA a generare i contenuti?', answer: 'L\'IA analizza il tuo ruolo, settore e livello di esperienza per generare suggerimenti personalizzati. Utilizza i pattern di milioni di CV di successo per creare profili professionali, esperienze lavorative orientate ai risultati e descrizioni di competenze che colpiscono i recruiter.' },
      { question: 'Il CV sembrerà generato dall\'IA?', answer: 'No. Il nostro strumento genera contenuti naturali e professionali, come se fossero scritti da un esperto di curriculum vitae. Puoi modificare ogni suggerimento per aggiungere il tuo tocco personale, e il risultato finale è completamente tuo.' },
    ],
  },
  crossLinks: {
    title: 'Altri strumenti per il CV con IA',
    items: [
      { href: '/it/resume-maker', title: 'Creatore di CV', subtitle: 'Creatore di CV gratuito con IA' },
      { href: '/it/tools/ats-checker', title: 'Verifica ATS', subtitle: 'Analisi ATS con IA' },
      { href: '/it/free-resume-builder', title: 'CV gratis', subtitle: 'Creatore 100% gratuito' },
    ],
    guidesTitle: 'Guide sul CV con IA',
    guides: [
      { href: '/it/career-tips/ai-resume-tools', label: 'Strumenti IA per il curriculum vitae (2026)' },
      { href: '/it/blog/chatgpt-vs-claude-for-resumes', label: 'ChatGPT vs Claude: quale IA per il CV?' },
      { href: '/it/blog/how-to-write-ats-friendly-resume', label: 'Come scrivere un CV ATS-friendly' },
      { href: '/it/resume-examples', label: '300+ esempi di curriculum vitae' },
    ],
  },
  bottomCta: {
    title: 'Pronto a creare il tuo curriculum vitae con l\'IA?',
    description: 'Unisciti ai milioni di persone che ottengono più colloqui grazie al <a href="/it/" class="text-purple-600 hover:underline">curriculum vitae con intelligenza artificiale</a>.',
    cta: 'Inizia gratis con l\'IA',
    subtext: 'Gratis per sempre. Nessuna carta di credito.',
  },
};

const vi: ResumeAIPageContent = {
  meta: {
    title: 'CV Bằng AI | Công Cụ Tạo CV Bằng AI Miễn Phí 2026 | Best AI Resume',
    description: 'Tạo CV bằng AI chỉ trong vài phút. Công cụ AI viết CV chuyên nghiệp, tối ưu ATS, 20+ mẫu CV — hoàn toàn miễn phí cho người tìm việc Việt Nam.',
    keywords: 'cv bằng ai, tạo cv bằng ai, công cụ ai viết cv, cv xin việc, tạo cv miễn phí, cv thông minh, viết cv tự động, cv ats việt nam',
  },
  schemas: {
    breadcrumbName: 'CV bằng AI',
    articleHeadline: 'CV Bằng AI: Công Cụ Tạo CV Xin Việc Bằng AI Miễn Phí 2026',
    articleDescription: 'Khám phá cách AI tạo và tối ưu nội dung CV xin việc. Sử dụng công cụ tạo CV bằng AI miễn phí để nhận nhiều lời mời phỏng vấn hơn.',
    softwareAppName: 'Công Cụ Tạo CV Bằng AI',
  },
  hero: {
    badge: 'Công Nghệ AI Tiên Tiến',
    title: 'Tạo CV Xin Việc',
    titleHighlight: 'Bằng AI Chỉ Trong Vài Giây',
    subtitle: '<strong>Công cụ tạo CV bằng AI</strong> của chúng tôi viết nội dung chuyên nghiệp, tối ưu hóa cho hệ thống ATS và giúp bạn tạo CV xin việc nổi bật — hoàn toàn miễn phí. Theo nghiên cứu của <a href="https://www.linkedin.com/business/talent/blog/talent-acquisition/how-recruiters-use-ai" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline">LinkedIn</a>, nhà tuyển dụng chỉ dành trung bình 7 giây để xem mỗi CV. Tại Việt Nam, nơi cạnh tranh trên <a href="https://www.vietnamworks.com" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline">VietnamWorks</a> và <a href="https://www.topcv.vn" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline">TopCV</a> ngày càng gay gắt, hãy để AI giúp bạn tận dụng mỗi giây.',
    ctaPrimary: 'Tạo CV Bằng AI Miễn Phí',
    ctaSecondary: 'Xem Cách Hoạt Động',
    trustText: 'Không cần đăng ký · 100% miễn phí · Nội dung do AI tạo',
  },
  whatIs: {
    title: 'CV bằng AI là gì?',
    description: '<strong>CV bằng AI</strong> sử dụng trí tuệ nhân tạo để thay đổi hoàn toàn cách bạn tạo CV xin việc. Thay vì ngồi loay hoay trước trang trắng, AI phân tích kinh nghiệm của bạn, hiểu vị trí mục tiêu và tạo nội dung chuyên nghiệp phù hợp với ngành nghề. Theo <a href="https://www.shrm.org/topics-tools/news/talent-acquisition/ai-rapidly-transforming-how-companies-recruit" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline">SHRM (Society for Human Resource Management)</a>, AI đang nhanh chóng thay đổi quy trình tuyển dụng — và CV được tạo bằng AI ngày càng được nhà tuyển dụng Việt Nam chấp nhận rộng rãi, đặc biệt khi các công ty áp dụng hệ thống ATS để lọc hồ sơ.',
    stats: [
      { value: '10x', label: 'Nhanh hơn viết thủ công' },
      { value: '85%', label: 'Tỷ lệ vượt qua ATS cao hơn' },
      { value: '3M+', label: 'CV đã được tạo bằng AI' },
    ],
  },
  features: {
    title: 'AI giúp bạn tạo CV xin việc như thế nào',
    subtitle: 'AI không chỉ định dạng — mà thực sự giúp bạn viết nội dung CV tốt hơn.',
    items: [
      { title: 'Viết nội dung bằng AI', description: 'AI tạo mô tả kinh nghiệm làm việc chuyên nghiệp, tóm tắt hồ sơ và mô tả kỹ năng dựa trên kinh nghiệm và vị trí mục tiêu của bạn.' },
      { title: 'Tối ưu từ khóa thông minh', description: 'AI phân tích tin tuyển dụng trên TopCV, VietnamWorks và các nền tảng khác để gợi ý từ khóa ngành nghề mà nhà tuyển dụng tìm kiếm.' },
      { title: 'Phân tích điểm ATS', description: 'Chấm điểm theo thời gian thực cho bạn biết CV xin việc của bạn sẽ được hệ thống ATS đánh giá ra sao trước khi nộp hồ sơ.' },
      { title: 'Lượng hóa thành tích', description: 'AI biến những mô tả chung chung thành thành tích cụ thể với số liệu đo lường được, thu hút sự chú ý của nhà tuyển dụng.' },
      { title: 'Mẫu CV theo ngành nghề', description: 'AI gợi ý bố cục và các mục phù hợp nhất dựa trên ngành nghề và cấp độ kinh nghiệm của bạn tại thị trường Việt Nam.' },
      { title: 'Kiểm tra ngữ pháp và văn phong', description: 'AI rà soát lỗi chính tả, ngữ pháp và đảm bảo văn phong chuyên nghiệp, phù hợp với chuẩn mực ứng tuyển tại Việt Nam.' },
    ],
  },
  beforeAfter: {
    title: 'Xem AI cải thiện CV xin việc của bạn',
    subtitle: 'Ví dụ thực tế về cách công cụ AI viết CV nâng cấp nội dung.',
    beforeLabel: 'Trước',
    afterLabel: 'Sau khi dùng AI',
    items: [
      { before: 'Quản lý nhóm và các dự án', after: 'Điều phối nhóm liên phòng ban gồm 8 kỹ sư, hoàn thành 12 dự án đúng tiến độ với tỷ lệ hài lòng khách hàng đạt 98%' },
      { before: 'Tăng doanh thu cho công ty', after: 'Tăng doanh thu hàng năm 34% (5,2 tỷ VNĐ) nhờ triển khai chiến lược tiếp cận khách hàng dựa trên dữ liệu' },
      { before: 'Giỏi chăm sóc khách hàng', after: 'Đạt điểm hài lòng khách hàng 4.9/5, xử lý hơn 150 yêu cầu mỗi ngày với tỷ lệ giải quyết ngay lần đầu đạt 95%' },
    ],
    cta: 'Tạo CV chuyên nghiệp ngay',
  },
  comparison: {
    title: 'CV bằng AI so với CV viết tay',
    subtitle: 'Tại sao người tìm việc Việt Nam chọn tạo CV bằng AI.',
    oursName: 'Với AI',
    othersName: 'Viết thủ công',
    rows: [
      { feature: 'Thời gian hoàn thành', ours: '10-15 phút', others: '2-4 giờ' },
      { feature: 'Câu từ chuyên nghiệp', ours: 'AI gợi ý tự động', others: 'Phải tự tìm hiểu' },
      { feature: 'Tối ưu hóa ATS', ours: 'Tự động', others: 'Thủ công, dễ sai sót' },
      { feature: 'Từ khóa ngành nghề', ours: 'AI gợi ý', others: 'Tự nghiên cứu' },
      { feature: 'Chính tả & ngữ pháp', ours: 'Kiểm tra tự động', others: 'Dễ bỏ sót lỗi' },
      { feature: 'Số liệu thành tích', ours: 'AI hỗ trợ lượng hóa', others: 'Thường bị bỏ qua' },
      { feature: 'Định dạng & thiết kế', ours: '20+ mẫu CV', others: 'Phải tạo từ đầu' },
    ],
  },
  useCases: {
    title: 'Ai nên sử dụng công cụ tạo CV bằng AI?',
    subtitle: 'Công cụ AI viết CV phù hợp với mọi đối tượng tìm việc tại Việt Nam.',
    items: [
      { title: 'Người chuyển ngành', description: 'AI giúp chuyển đổi kỹ năng từ ngành này sang ngành khác một cách thuyết phục' },
      { title: 'Sinh viên mới ra trường', description: 'Biến thực tập, đồ án tốt nghiệp và hoạt động ngoại khóa thành kinh nghiệm chuyên nghiệp' },
      { title: 'Chuyên gia giàu kinh nghiệm', description: 'Tóm gọn hơn 20 năm kinh nghiệm vào một CV xin việc ấn tượng chỉ trong 2 trang' },
      { title: 'Người đang tìm việc', description: 'Tạo nhanh CV tùy chỉnh cho từng vị trí trên TopCV, VietnamWorks hay Jobsgo' },
    ],
  },
  faq: {
    title: 'Câu hỏi thường gặp',
    items: [
      { question: 'CV bằng AI là gì?', answer: 'CV bằng AI là hồ sơ xin việc được tạo với sự hỗ trợ của trí tuệ nhân tạo. Công cụ của chúng tôi viết mô tả kinh nghiệm chuyên nghiệp, tối ưu cho hệ thống ATS, gợi ý từ khóa ngành nghề phổ biến tại Việt Nam và tự động định dạng — giúp bạn có CV xin việc chất lượng trong vài phút thay vì hàng giờ.' },
      { question: 'Tạo CV bằng AI có tốt hơn viết tay không?', answer: 'AI giúp bạn viết nội dung tốt hơn và nhanh hơn. Công cụ phân tích hàng nghìn CV thành công để gợi ý cách diễn đạt chuyên nghiệp, thành tích có số liệu cụ thể và từ khóa phù hợp với thị trường tuyển dụng Việt Nam. Bạn vẫn toàn quyền kiểm soát nội dung cuối cùng — AI chỉ giúp quá trình hiệu quả hơn.' },
      { question: 'CV tạo bằng AI có vượt qua được bộ lọc ATS không?', answer: 'Có! Công cụ tạo CV bằng AI của chúng tôi được thiết kế đặc biệt để tương thích ATS — hệ thống lọc hồ sơ ngày càng phổ biến tại các công ty Việt Nam. CV được định dạng với văn bản sạch, gợi ý từ khóa khớp với tin tuyển dụng và cung cấp điểm ATS theo thời gian thực để bạn tối ưu trước khi nộp.' },
      { question: 'Công cụ tạo CV bằng AI này có miễn phí không?', answer: 'Có, công cụ tạo CV bằng AI hoàn toàn miễn phí. Tạo CV không giới hạn, sử dụng tất cả mẫu CV, tải xuống PDF — tất cả đều miễn phí. Không cần thẻ tín dụng, không cần đăng ký gói trả phí.' },
      { question: 'AI tạo nội dung CV như thế nào?', answer: 'AI phân tích chức danh, ngành nghề và cấp độ kinh nghiệm của bạn để tạo gợi ý phù hợp. Công cụ sử dụng dữ liệu từ hàng triệu CV thành công để viết tóm tắt hồ sơ, mô tả kinh nghiệm tập trung vào thành tích và mô tả kỹ năng gây ấn tượng với nhà tuyển dụng Việt Nam.' },
      { question: 'CV có bị lộ là do AI viết không?', answer: 'Không. Công cụ của chúng tôi tạo nội dung tự nhiên, chuyên nghiệp — như thể được viết bởi chuyên gia tư vấn nghề nghiệp. Bạn có thể chỉnh sửa mọi gợi ý để thêm dấu ấn cá nhân, và kết quả cuối cùng hoàn toàn là của bạn.' },
    ],
  },
  crossLinks: {
    title: 'Công cụ CV bằng AI khác',
    items: [
      { href: '/vi/resume-maker', title: 'Tạo CV', subtitle: 'Tạo CV miễn phí bằng AI' },
      { href: '/vi/tools/ats-checker', title: 'Kiểm tra ATS', subtitle: 'Phân tích ATS bằng AI' },
      { href: '/vi/free-resume-builder', title: 'CV miễn phí', subtitle: 'Công cụ tạo CV 100% miễn phí' },
    ],
    guidesTitle: 'Hướng dẫn CV bằng AI',
    guides: [
      { href: '/vi/career-tips/ai-resume-tools', label: 'Công cụ AI viết CV xin việc (2026)' },
      { href: '/vi/blog/chatgpt-vs-claude-for-resumes', label: 'ChatGPT vs Claude: AI nào viết CV tốt hơn?' },
      { href: '/vi/blog/cach-viet-cv-xin-viec', label: 'Cách viết CV xin việc chuẩn ATS' },
      { href: '/vi/resume-examples', label: '300+ mẫu CV xin việc' },
    ],
  },
  bottomCta: {
    title: 'Sẵn sàng tạo CV xin việc bằng AI?',
    description: 'Tham gia cùng hàng triệu người đã nhận được nhiều lời mời phỏng vấn hơn nhờ <a href="/vi/" class="text-purple-600 hover:underline">công cụ tạo CV bằng AI</a>.',
    cta: 'Bắt đầu miễn phí với AI',
    subtext: 'Miễn phí mãi mãi. Không cần thẻ tín dụng.',
  },
};

const ko: ResumeAIPageContent = {
  meta: {
    title: 'AI 이력서 | 무료 AI 이력서 빌더 및 생성기 2026',
    description: 'AI로 몇 분 만에 이력서를 작성하세요. 무료 AI 이력서 도구가 전문 콘텐츠를 작성하고, ATS에 최적화하며, 면접 기회를 높여줍니다.',
    keywords: 'AI 이력서, AI 이력서 빌더, AI 이력서 생성기, 인공지능 이력서, AI 이력서 작성, 무료 이력서 빌더, 이력서 자동 작성, AI 이력서 무료',
  },
  schemas: {
    breadcrumbName: 'AI 이력서',
    articleHeadline: 'AI 이력서: 무료 AI 이력서 빌더 및 생성기 2026',
    articleDescription: 'AI로 이력서를 작성하세요. 무료 AI 이력서 도구가 전문 콘텐츠 작성, ATS 최적화, 합격하는 이력서 생성을 도와줍니다.',
    softwareAppName: 'AI 이력서 빌더',
  },
  hero: {
    badge: '인공지능 기반 이력서 빌더',
    title: 'AI가 만드는',
    titleHighlight: '합격하는 이력서',
    subtitle: '<strong>AI 이력서 빌더</strong>가 전문적인 콘텐츠를 작성하고, ATS 시스템에 최적화하며, 돋보이는 이력서 작성을 도와줍니다 — 완전 무료. <a href="https://www.linkedin.com/business/talent/blog/talent-acquisition/how-recruiters-use-ai" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline">LinkedIn 조사</a>에 따르면, 채용 담당자는 이력서 한 장에 평균 7초만 사용합니다. AI로 모든 순간을 최대한 활용하세요.',
    ctaPrimary: '무료로 AI 이력서 시작',
    ctaSecondary: '작동 원리 보기',
    trustText: '가입 불필요 · 100% 무료 · AI 기반 콘텐츠',
  },
  whatIs: {
    title: 'AI 이력서란?',
    description: '<strong>AI 이력서</strong>는 인공지능 기술로 이력서 작성 방식을 혁신합니다. 빈 페이지를 바라보는 대신, AI가 여러분의 경력을 분석하고, 지원 직무를 파악하며, 업종에 맞는 전문 콘텐츠를 생성합니다. <a href="https://www.shrm.org/topics-tools/news/talent-acquisition/ai-rapidly-transforming-how-companies-recruit" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline">미국인적자원관리협회(SHRM)</a>에 따르면, AI는 채용 과정을 빠르게 변화시키고 있으며, AI로 작성한 이력서는 고용주들에게 널리 인정받고 있습니다.',
    stats: [
      { value: '10배', label: '수동 작성보다 빠름' },
      { value: '85%', label: 'ATS 통과율 향상' },
      { value: '300만+', label: 'AI로 작성된 이력서' },
    ],
  },
  features: {
    title: 'AI 이력서가 도와주는 방법',
    subtitle: 'AI는 서식 정리뿐만 아니라, 더 나은 콘텐츠 작성을 적극적으로 도와줍니다.',
    items: [
      { title: 'AI 콘텐츠 작성', description: 'AI가 여러분의 경력과 지원 직무를 기반으로 전문적인 성과 기술문, 자기소개서, 역량 설명을 작성합니다.' },
      { title: '스마트 키워드 최적화', description: 'AI가 채용 공고를 분석하고, 기업이 찾는 업종별 핵심 키워드를 제안합니다.' },
      { title: 'ATS 점수 분석', description: '실시간 AI 점수로 지원 전 ATS 시스템에서의 이력서 평가 결과를 정확히 확인할 수 있습니다.' },
      { title: '성과 수치화', description: 'AI가 모호한 업무 설명을 채용 담당자의 눈길을 사로잡는 구체적인 수치 기반 성과로 변환합니다.' },
      { title: '업종별 맞춤 템플릿', description: 'AI가 업종과 경력 수준에 맞는 최적의 레이아웃과 섹션 구성을 추천합니다.' },
      { title: '문법 및 어조 검사', description: 'AI가 문법, 맞춤법, 전문적 어조를 검토하여 오류 없는 완성도 높은 결과물을 보장합니다.' },
    ],
  },
  beforeAfter: {
    title: 'AI가 이력서를 어떻게 바꾸는지 확인하세요',
    subtitle: 'AI 이력서 개선의 실제 사례.',
    beforeLabel: '개선 전',
    afterLabel: 'AI 개선 후',
    items: [
      { before: '팀 관리 및 프로젝트 업무 담당', after: '8명의 크로스펑셔널 엔지니어 팀을 이끌고, 12개 프로젝트를 기한 내 완료, 고객 만족도 98% 달성' },
      { before: '매출 증가에 기여', after: '데이터 기반 영업 전략 도입으로 전년 대비 매출 34% 성장(24억 원) 달성' },
      { before: '고객 서비스에 능숙', after: '고객 만족도 4.9/5점 달성, 하루 150건 이상 문의 처리, 첫 통화 해결률 95% 기록' },
    ],
    cta: '프리미엄 이력서 만들기',
  },
  comparison: {
    title: 'AI 이력서 vs 직접 작성',
    subtitle: '구직자들이 AI 이력서를 선택하는 이유.',
    oursName: 'AI 활용',
    othersName: '직접 작성',
    rows: [
      { feature: '작성 시간', ours: '10-15분', others: '2-4시간' },
      { feature: '전문적 문장', ours: 'AI가 제안 생성', others: '별도 조사 필요' },
      { feature: 'ATS 최적화', ours: '자동', others: '수동 추측' },
      { feature: '업종 키워드', ours: 'AI가 제안', others: '직접 조사' },
      { feature: '문법/맞춤법', ours: '자동 검사', others: '오류 간과 쉬움' },
      { feature: '성과 수치화', ours: 'AI가 지원', others: '자주 누락' },
      { feature: '서식/디자인', ours: '20개 이상 템플릿', others: '처음부터 직접' },
    ],
  },
  useCases: {
    title: 'AI 이력서는 누가 사용하나요?',
    subtitle: 'AI 이력서 작성은 모든 구직자에게 유용합니다.',
    items: [
      { title: '경력 전환자', description: 'AI가 한 업종의 역량을 다른 업종에 맞게 전환하는 것을 도와줍니다' },
      { title: '신입/취업 준비생', description: '인턴십과 프로젝트 경험을 전문적인 성과로 변환합니다' },
      { title: '경력직 전문가', description: '20년 이상의 경력을 효과적인 2페이지 이력서로 압축합니다' },
      { title: '이직 준비자', description: '각 지원 기업에 맞춘 맞춤형 이력서를 빠르게 생성합니다' },
    ],
  },
  faq: {
    title: '자주 묻는 질문',
    items: [
      { question: 'AI 이력서란 무엇인가요?', answer: 'AI 이력서란 인공지능의 도움을 받아 작성된 이력서입니다. 저희 도구는 전문적인 성과 기술문 작성, ATS 최적화, 업종 키워드 제안, 자동 서식 적용까지 — 몇 시간이 아닌 몇 분 만에 합격하는 이력서를 완성합니다.' },
      { question: 'AI로 이력서를 작성하는 것이 직접 쓰는 것보다 나은가요?', answer: 'AI는 더 나은 콘텐츠를 더 빠르게 작성하도록 도와줍니다. 수천 건의 합격 이력서를 분석하여 전문적인 표현, 수치화된 성과, 놓치기 쉬운 업종별 키워드를 제안합니다. 최종 내용의 결정권은 여러분에게 있으며, AI는 과정을 더 쉽고 효과적으로 만들어줄 뿐입니다.' },
      { question: 'AI로 작성한 이력서가 ATS를 통과할 수 있나요?', answer: '네! 저희 AI 이력서 빌더는 ATS 호환성을 위해 특별히 설계되었습니다. 깔끔하게 파싱 가능한 텍스트로 이력서를 구성하고, 채용 공고에 맞는 키워드를 제안하며, 제출 전 최적화를 위한 실시간 ATS 점수를 제공합니다.' },
      { question: '이 AI 이력서 도구는 무료인가요?', answer: '네, AI 이력서 빌더는 100% 무료입니다. 무제한으로 이력서를 생성하고, 모든 템플릿을 이용하며, PDF를 다운로드하세요 — 모두 무료. 신용카드나 구독이 필요 없습니다.' },
      { question: 'AI는 어떻게 이력서 콘텐츠를 생성하나요?', answer: 'AI는 직무, 업종, 경력 수준을 분석하여 맞춤형 제안을 생성합니다. 수백만 건의 합격 이력서 패턴을 활용하여, 전문 요약문, 성과 중심 기술문, 채용 담당자에게 어필하는 역량 설명을 작성합니다.' },
      { question: '이력서가 AI로 작성된 것처럼 보이나요?', answer: '아닙니다. 저희 도구는 전문 이력서 작성가가 쓴 것처럼 자연스럽고 전문적인 콘텐츠를 생성합니다. 모든 제안을 편집하여 개인적인 색깔을 더할 수 있으며, 최종 결과물은 완전히 여러분의 것입니다.' },
    ],
  },
  crossLinks: {
    title: '기타 AI 이력서 도구',
    items: [
      { href: '/resume-maker', title: '이력서 메이커', subtitle: '무료 AI 이력서 메이커' },
      { href: '/tools/ats-checker', title: 'ATS 검사기', subtitle: 'AI 기반 ATS 분석' },
      { href: '/free-resume-builder', title: '무료 이력서 빌더', subtitle: '100% 무료 AI 빌더' },
    ],
    guidesTitle: 'AI 이력서 가이드',
    guides: [
      { href: '/career-tips/ai-resume-tools', label: '이력서 작성을 위한 AI 도구(2026년)' },
      { href: '/blog/chatgpt-vs-claude-for-resumes', label: 'ChatGPT vs Claude: 이력서 작성 비교' },
      { href: '/blog/how-to-write-ats-friendly-resume', label: 'ATS 통과 이력서 작성법' },
      { href: '/resume-examples', label: '300개 이상 이력서 예시' },
    ],
  },
  bottomCta: {
    title: 'AI 이력서를 시작할 준비가 되셨나요?',
    description: '<a href="/" class="text-purple-600 hover:underline">AI 이력서 작성</a>으로 더 많은 면접 기회를 얻고 있는 수백만 구직자와 함께하세요.',
    cta: '무료로 AI 이력서 시작',
    subtext: '영원히 무료. 신용카드 불필요.',
  },
};

const th: ResumeAIPageContent = {
  meta: {
    title: 'เรซูเม่ AI | เครื่องมือสร้างเรซูเม่ AI ฟรี 2026',
    description: 'สร้างเรซูเม่ด้วย AI ในไม่กี่วินาที เครื่องมือเรซูเม่ AI ฟรีที่เขียนเนื้อหามืออาชีพ ปรับให้ผ่าน ATS และช่วยให้คุณได้สัมภาษณ์',
    keywords: 'เรซูเม่ AI, สร้างเรซูเม่ AI, เรซูเม่อัจฉริยะ, AI เขียนเรซูเม่, สร้างเรซูเม่ฟรี, เรซูเม่สมัครงาน, ประวัติย่อ AI, เรซูเม่อัตโนมัติ',
  },
  schemas: {
    breadcrumbName: 'เรซูเม่ AI',
    articleHeadline: 'เรซูเม่ AI: เครื่องมือสร้างเรซูเม่ AI ฟรี 2026',
    articleDescription: 'สร้างเรซูเม่ด้วย AI เครื่องมือเรซูเม่ AI ฟรีเขียนเนื้อหามืออาชีพ ปรับ ATS และสร้างเรซูเม่สมัครงานภายในไม่กี่นาที',
    softwareAppName: 'เครื่องมือสร้างเรซูเม่ AI',
  },
  hero: {
    badge: 'ขับเคลื่อนด้วย AI ขั้นสูง',
    title: 'สร้างเรซูเม่ของคุณ',
    titleHighlight: 'ด้วย AI ในไม่กี่วินาที',
    subtitle: '<strong>เรซูเม่ AI</strong> ของเราเขียนเนื้อหามืออาชีพ ปรับให้เหมาะกับระบบ ATS และช่วยสร้างเรซูเม่สมัครงานที่โดดเด่น — ฟรีทั้งหมด จากข้อมูลของ <a href="https://www.linkedin.com/business/talent/blog/talent-acquisition/how-recruiters-use-ai" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline">LinkedIn</a> ฝ่ายทรัพยากรบุคคลใช้เวลาเฉลี่ยเพียง 7 วินาทีในการดูเรซูเม่แต่ละฉบับ ในตลาดงานไทยที่แข่งขันสูงบน <a href="https://www.jobthai.com/" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline">JobThai</a> และ JobsDB ให้ AI ช่วยคุณใช้ทุกวินาทีอย่างคุ้มค่า',
    ctaPrimary: 'ลองเรซูเม่ AI ฟรี',
    ctaSecondary: 'ดูวิธีการทำงาน',
    trustText: 'ไม่ต้องสมัครสมาชิก · ฟรี 100% · เนื้อหาจาก AI',
  },
  whatIs: {
    title: 'เรซูเม่ AI คืออะไร?',
    description: '<strong>เรซูเม่ AI</strong> ใช้ปัญญาประดิษฐ์เปลี่ยนวิธีการสร้างเรซูเม่สมัครงานของคุณ แทนที่จะนั่งจ้องหน้าจอว่างเปล่า AI จะวิเคราะห์ประสบการณ์ เข้าใจตำแหน่งที่คุณสมัคร และสร้างเนื้อหามืออาชีพที่ตรงกับสายงาน ตามข้อมูลของ <a href="https://www.shrm.org/topics-tools/news/talent-acquisition/ai-rapidly-transforming-how-companies-recruit" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline">SHRM</a> AI กำลังเปลี่ยนแปลงกระบวนการสรรหาบุคลากรอย่างรวดเร็ว และเรซูเม่ที่ AI ช่วยเขียนได้รับการยอมรับจากนายจ้างทั่วโลก รวมถึงบริษัทในไทย',
    stats: [
      { value: '10 เท่า', label: 'เร็วกว่าเขียนเอง' },
      { value: '85%', label: 'ผ่าน ATS สูงขึ้น' },
      { value: '3 ล้าน+', label: 'เรซูเม่ที่สร้างด้วย AI' },
    ],
  },
  features: {
    title: 'เรซูเม่ AI ช่วยคุณอย่างไร',
    subtitle: 'AI ทำมากกว่าแค่จัดรูปแบบ — ช่วยเขียนเนื้อหาที่ดีขึ้นจริงๆ',
    items: [
      { title: 'AI เขียนเนื้อหา', description: 'AI เขียนประสบการณ์ทำงาน สรุปตัวเอง และคำอธิบายทักษะที่ตรงกับประสบการณ์และตำแหน่งที่สมัคร' },
      { title: 'คีย์เวิร์ดอัจฉริยะ', description: 'AI วิเคราะห์ประกาศรับสมัครงานและแนะนำคีย์เวิร์ดตามสายงานที่ HR และระบบ ATS ค้นหา' },
      { title: 'วิเคราะห์คะแนน ATS', description: 'คะแนน ATS แบบเรียลไทม์บอกคุณว่าเรซูเม่จะผ่านระบบคัดกรองหรือไม่ ก่อนที่คุณจะกดส่ง' },
      { title: 'แปลงผลงานเป็นตัวเลข', description: 'AI ช่วยเปลี่ยนคำอธิบายทั่วไปให้เป็นผลงานที่วัดได้ด้วยตัวเลขที่สร้างความประทับใจ' },
      { title: 'เทมเพลตตามสายงาน', description: 'AI แนะนำเทมเพลตและส่วนต่างๆ ที่เหมาะสมตามสายงานและระดับประสบการณ์ในตลาดงานไทย' },
      { title: 'ตรวจไวยากรณ์และโทน', description: 'AI ตรวจสอบไวยากรณ์ การสะกดคำ และโทนเสียงที่เป็นมืออาชีพ — ให้ผลลัพธ์ที่สมบูรณ์แบบ' },
    ],
  },
  beforeAfter: {
    title: 'ดู AI เปลี่ยนเรซูเม่ของคุณ',
    subtitle: 'ตัวอย่างจริงของการปรับปรุงเรซูเม่ด้วย AI',
    beforeLabel: 'ก่อน',
    afterLabel: 'หลัง AI ช่วย',
    items: [
      { before: 'รับผิดชอบดูแลทีมและโครงการ', after: 'นำทีมข้ามแผนก 8 คน ส่งมอบ 12 โครงการตรงเวลา ลูกค้าพึงพอใจ 98%' },
      { before: 'ช่วยเพิ่มยอดขาย', after: 'สร้างรายได้เพิ่ม 34% YoY (72 ล้านบาท) จากการใช้กลยุทธ์การขายแบบ Data-driven' },
      { before: 'ให้บริการลูกค้าดี', after: 'ได้คะแนนความพึงพอใจลูกค้า 4.9/5 ดูแลลูกค้า 150+ คนต่อวัน แก้ปัญหาสำเร็จรอบแรก 95%' },
    ],
    cta: 'สร้างเรซูเม่มืออาชีพ',
  },
  comparison: {
    title: 'เรซูเม่ AI vs. เขียนเอง',
    subtitle: 'ทำไมผู้หางานไทยเลือกสร้างเรซูเม่ด้วย AI',
    oursName: 'ใช้ AI',
    othersName: 'เขียนเอง',
    rows: [
      { feature: 'เวลาที่ใช้', ours: '10-15 นาที', others: '2-4 ชั่วโมง' },
      { feature: 'สำนวนมืออาชีพ', ours: 'AI แนะนำอัตโนมัติ', others: 'ต้องค้นคว้าเอง' },
      { feature: 'ปรับ ATS', ours: 'อัตโนมัติ', others: 'เดาเอง' },
      { feature: 'คีย์เวิร์ดตามสายงาน', ours: 'AI แนะนำ', others: 'ต้องค้นหาเอง' },
      { feature: 'ไวยากรณ์/สะกดคำ', ours: 'ตรวจอัตโนมัติ', others: 'พลาดได้ง่าย' },
      { feature: 'ตัวเลขผลงาน', ours: 'AI ช่วยคำนวณ', others: 'มักลืมใส่' },
      { feature: 'รูปแบบ/ดีไซน์', ours: 'เทมเพลต 20+ แบบ', others: 'เริ่มจากศูนย์' },
    ],
  },
  useCases: {
    title: 'ใครควรใช้เรซูเม่ AI?',
    subtitle: 'เรซูเม่ AI เหมาะกับทุกคนที่กำลังหางาน',
    items: [
      { title: 'คนเปลี่ยนสายงาน', description: 'AI ช่วยแปลงทักษะจากสายงานเดิมให้ตรงกับงานใหม่' },
      { title: 'จบใหม่', description: 'เปลี่ยนประสบการณ์ฝึกงานและโปรเจกต์เป็นผลงานมืออาชีพ' },
      { title: 'ผู้บริหาร/ผู้มีประสบการณ์', description: 'สรุปประสบการณ์กว่า 20 ปีให้เป็นเรซูเม่ 2 หน้าที่น่าสนใจ' },
      { title: 'คนหางาน', description: 'สร้างเรซูเม่ปรับแต่งสำหรับแต่ละตำแหน่งบน JobThai หรือ JobsDB ได้อย่างรวดเร็ว' },
    ],
  },
  faq: {
    title: 'คำถามที่พบบ่อย',
    items: [
      { question: 'เรซูเม่ AI คืออะไร?', answer: 'เรซูเม่ AI คือเรซูเม่สมัครงานที่สร้างด้วยความช่วยเหลือของปัญญาประดิษฐ์ เครื่องมือของเราเขียนประสบการณ์ทำงาน ปรับให้ผ่าน ATS แนะนำคีย์เวิร์ดตามสายงาน และจัดรูปแบบอัตโนมัติ — สร้างเรซูเม่คุณภาพได้ในไม่กี่นาที ไม่ใช่หลายชั่วโมง' },
      { question: 'ใช้ AI สร้างเรซูเม่ดีกว่าเขียนเองไหม?', answer: 'AI ช่วยให้คุณเขียนเนื้อหาที่ดีขึ้นและเร็วขึ้น วิเคราะห์เรซูเม่ที่ประสบความสำเร็จหลายพันฉบับเพื่อแนะนำสำนวนมืออาชีพ ผลงานเป็นตัวเลข และคีย์เวิร์ดที่ตรงกับตลาดงานไทย คุณยังคงเป็นคนตัดสินใจเนื้อหาสุดท้าย — AI เป็นเพียงผู้ช่วย' },
      { question: 'เรซูเม่จาก AI ผ่าน ATS ได้ไหม?', answer: 'ได้! เครื่องมือเรซูเม่ AI ของเราออกแบบมาให้รองรับ ATS โดยเฉพาะ จัดรูปแบบให้ระบบอ่านได้ง่าย แนะนำคีย์เวิร์ดที่ตรงกับประกาศรับสมัคร และให้คะแนน ATS แบบเรียลไทม์เพื่อปรับปรุงก่อนส่ง' },
      { question: 'เครื่องมือเรซูเม่ AI นี้ฟรีไหม?', answer: 'ใช่ เครื่องมือสร้างเรซูเม่ AI ฟรี 100% สร้างเรซูเม่ไม่จำกัด ใช้เทมเพลตทุกแบบ ดาวน์โหลด PDF ได้ — ทั้งหมดฟรี ไม่ต้องใช้บัตรเครดิตหรือสมัครสมาชิก' },
      { question: 'AI สร้างเนื้อหาเรซูเม่อย่างไร?', answer: 'AI วิเคราะห์ตำแหน่ง สายงาน และระดับประสบการณ์ของคุณเพื่อสร้างคำแนะนำที่เหมาะสม ใช้ข้อมูลจากเรซูเม่ที่ประสบความสำเร็จหลายล้านฉบับเพื่อเขียนสรุปตัวเอง ประสบการณ์เน้นผลงาน และคำอธิบายทักษะที่สร้างความประทับใจ' },
      { question: 'เรซูเม่จะดูเหมือน AI เขียนไหม?', answer: 'ไม่ เครื่องมือของเราสร้างเนื้อหาที่เป็นธรรมชาติและมืออาชีพ — เหมือนผู้เชี่ยวชาญด้านอาชีพเขียนให้ คุณสามารถแก้ไขทุกข้อเสนอแนะเพื่อเพิ่มเอกลักษณ์ส่วนตัว ผลลัพธ์สุดท้ายเป็นของคุณทั้งหมด' },
    ],
  },
  crossLinks: {
    title: 'เครื่องมือเรซูเม่ AI อื่นๆ',
    items: [
      { href: '/th/resume-maker', title: 'สร้างเรซูเม่', subtitle: 'สร้างเรซูเม่ฟรีด้วย AI' },
      { href: '/th/tools/ats-checker', title: 'ตรวจ ATS', subtitle: 'วิเคราะห์ ATS ด้วย AI' },
      { href: '/th/free-resume-builder', title: 'เรซูเม่ฟรี', subtitle: 'เครื่องมือสร้างเรซูเม่ฟรี 100%' },
    ],
    guidesTitle: 'คู่มือเรซูเม่ AI',
    guides: [
      { href: '/th/career-tips/ai-resume-tools', label: 'เครื่องมือ AI สำหรับเขียนเรซูเม่ (2026)' },
      { href: '/th/blog/chatgpt-vs-claude-for-resumes', label: 'ChatGPT vs Claude: AI ไหนเขียนเรซูเม่ดีกว่า?' },
      { href: '/th/blog/how-to-write-ats-friendly-resume', label: 'วิธีเขียนเรซูเม่ให้ผ่าน ATS' },
      { href: '/th/resume-examples', label: 'ตัวอย่างเรซูเม่ 300+ แบบ' },
    ],
  },
  bottomCta: {
    title: 'พร้อมสร้างเรซูเม่ด้วย AI แล้วหรือยัง?',
    description: 'ร่วมกับผู้หางานหลายล้านคนที่ได้รับโอกาสสัมภาษณ์มากขึ้นด้วย <a href="/th/" class="text-purple-600 hover:underline">เครื่องมือเรซูเม่ AI</a>',
    cta: 'ลองเรซูเม่ AI ฟรี',
    subtext: 'ฟรีตลอดไป ไม่ต้องใช้บัตรเครดิต',
  },
};

const pt: ResumeAIPageContent = {
  meta: {
    title: 'Curriculo com Inteligencia Artificial | Gerador de Curriculo com IA Gratis 2026 | Best AI Resume',
    description: 'Crie seu curriculo com inteligencia artificial em minutos. Escrita automatica com IA, otimizacao ATS, 20+ modelos — tudo gratis.',
    keywords: 'curriculo inteligencia artificial, curriculo com ia, gerador de curriculo automatico, criar curriculo ia, curriculo ia gratis, gerador curriculo com ia, curriculo automatico gratis',
  },
  schemas: {
    breadcrumbName: 'Curriculo com IA',
    articleHeadline: 'Curriculo com Inteligencia Artificial: Gerador de Curriculo com IA Gratis 2026',
    articleDescription: 'Descubra como a IA cria e otimiza o conteudo do curriculo. Use nosso gerador de curriculo com IA gratuito para conseguir mais entrevistas.',
    softwareAppName: 'Gerador de Curriculo com IA',
  },
  hero: {
    badge: 'Criador de Curriculo com Inteligencia Artificial',
    title: 'A IA cria seu',
    titleHighlight: 'curriculo perfeito',
    subtitle: 'Nosso <strong>gerador de curriculo com inteligencia artificial</strong> escreve conteudo profissional, otimiza para ATS e ajuda a criar um curriculo que se destaca — completamente gratis. Segundo o <a href="https://www.linkedin.com/business/talent/blog/talent-acquisition/how-recruiters-use-ai" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline">LinkedIn</a>, os recrutadores dedicam em media 7 segundos a cada curriculo. Com IA, cada segundo conta.',
    ctaPrimary: 'Testar curriculo com IA gratis',
    ctaSecondary: 'Como funciona',
    trustText: 'Sem cadastro · 100% gratis · Conteudo gerado por IA',
  },
  whatIs: {
    title: 'O que e um curriculo com IA?',
    description: 'Um <strong>curriculo com inteligencia artificial</strong> transforma radicalmente como voce cria seu curriculo. Em vez de encarar uma pagina em branco, a IA analisa suas experiencias, entende a vaga desejada e gera conteudo profissional otimizado para o seu setor. Como destaca a <a href="https://www.shrm.org/topics-tools/news/talent-acquisition/ai-rapidly-transforming-how-companies-recruit" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline">SHRM (Society for Human Resource Management)</a>, a IA esta transformando rapidamente os processos seletivos, e curriculos criados com IA sao amplamente aceitos pelos empregadores.',
    stats: [
      { value: '10x', label: 'Mais rapido que escrever manualmente' },
      { value: '85%', label: 'Melhora na taxa de aprovacao ATS' },
      { value: '3M+', label: 'Curriculos criados com IA' },
    ],
  },
  features: {
    title: 'Como a IA ajuda a criar seu curriculo',
    subtitle: 'A IA nao apenas formata — ela ajuda a escrever conteudo melhor de verdade.',
    items: [
      { title: 'Escrita de conteudo com IA', description: 'A IA gera experiencias profissionais, resumos e descricoes de habilidades baseados nas suas experiencias e na vaga desejada.' },
      { title: 'Otimizacao inteligente de palavras-chave', description: 'A IA analisa vagas de emprego e sugere palavras-chave especificas do setor que os empregadores buscam.' },
      { title: 'Analise de pontuacao ATS', description: 'A pontuacao em tempo real mostra como seu curriculo sera avaliado pelos sistemas ATS antes de se candidatar.' },
      { title: 'Quantificacao de resultados', description: 'A IA transforma descricoes genericas em resultados quantificados e mensuraveis que chamam a atencao dos recrutadores.' },
      { title: 'Modelos especificos por setor', description: 'A IA recomenda o layout e as secoes mais adequados com base no seu setor e nivel de experiencia.' },
      { title: 'Verificacao gramatical e de estilo', description: 'A IA verifica gramatica e ortografia para garantir um resultado profissional e polido.' },
    ],
  },
  beforeAfter: {
    title: 'Veja como a IA transforma seu curriculo',
    subtitle: 'Exemplos reais de melhorias feitas pela inteligencia artificial.',
    beforeLabel: 'Antes',
    afterLabel: 'Depois com IA',
    items: [
      { before: 'Gestao de equipe e projetos da empresa', after: 'Coordenacao de equipe multifuncional de 8 engenheiros, entrega de 12 projetos dentro do prazo com 98% de satisfacao dos clientes' },
      { before: 'Aumento das vendas da empresa', after: 'Crescimento da receita anual em 34% (R$2,1M) com implementacao de estrategias de aquisicao baseadas em dados' },
      { before: 'Bom atendimento ao cliente', after: 'Pontuacao de satisfacao de 4,9/5, gerenciando mais de 150 solicitacoes diarias com 95% de resolucao no primeiro contato' },
    ],
    cta: 'Criar curriculo profissional',
  },
  comparison: {
    title: 'Curriculo com IA vs Curriculo escrito manualmente',
    subtitle: 'Por que os candidatos escolhem o curriculo com inteligencia artificial.',
    oursName: 'Com IA',
    othersName: 'Escrito manualmente',
    rows: [
      { feature: 'Tempo de criacao', ours: '10-15 minutos', others: '2-4 horas' },
      { feature: 'Escrita profissional', ours: 'IA gera sugestoes', others: 'Requer pesquisa' },
      { feature: 'Otimizacao ATS', ours: 'Automatica', others: 'Manual e imprecisa' },
      { feature: 'Palavras-chave do setor', ours: 'Sugeridas pela IA', others: 'A pesquisar sozinho' },
      { feature: 'Gramatica e ortografia', ours: 'Verificacao automatica', others: 'Facil de negligenciar' },
      { feature: 'Quantificacao de resultados', ours: 'IA auxilia', others: 'Frequentemente esquecida' },
      { feature: 'Formatacao e design', ours: '20+ modelos', others: 'A criar do zero' },
    ],
  },
  useCases: {
    title: 'Quem usa curriculo com IA?',
    subtitle: 'O gerador de curriculo com inteligencia artificial e ideal para todos.',
    items: [
      { title: 'Mudanca de carreira', description: 'A IA ajuda a valorizar habilidades transferiveis entre setores diferentes' },
      { title: 'Recém-formados', description: 'Transforme estagios e projetos academicos em experiencias profissionais convincentes' },
      { title: 'Profissionais experientes', description: 'Condense mais de 20 anos de experiencia em um curriculo eficaz de duas paginas' },
      { title: 'Quem busca emprego ativamente', description: 'Crie rapidamente curriculos personalizados para cada candidatura' },
    ],
  },
  faq: {
    title: 'Perguntas frequentes',
    items: [
      { question: 'O que e um curriculo com inteligencia artificial?', answer: 'Um curriculo com IA e um curriculo criado com suporte de inteligencia artificial. Nossa ferramenta gera experiencias profissionais, otimiza para ATS, sugere palavras-chave do setor e formata tudo automaticamente — obtendo um curriculo excelente em minutos ao inves de horas.' },
      { question: 'E melhor criar o curriculo com IA ou escrever manualmente?', answer: 'A IA ajuda a escrever conteudo melhor mais rapido. Ela analisa milhares de curriculos de sucesso para sugerir expressoes profissionais, resultados quantificados e palavras-chave do setor que voce talvez nao conheca. Voce mantem controle total sobre o conteudo final — a IA apenas torna o processo mais eficaz.' },
      { question: 'Um curriculo criado com IA passa pelos filtros ATS?', answer: 'Sim! Nosso gerador de curriculo com IA e projetado especificamente para compatibilidade ATS. Formata o curriculo com texto limpo e legivel, sugere palavras-chave correspondentes as vagas e fornece pontuacao ATS em tempo real para otimizar antes do envio.' },
      { question: 'Esta ferramenta de curriculo com IA e gratuita?', answer: 'Sim, o gerador de curriculo com IA e 100% gratuito. Crie curriculos ilimitados, use todos os modelos, baixe em PDF — tudo gratis. Sem cartao de credito, sem assinatura.' },
      { question: 'Como a IA gera o conteudo?', answer: 'A IA analisa seu cargo, setor e nivel de experiencia para gerar sugestoes personalizadas. Ela utiliza padroes de milhoes de curriculos de sucesso para criar resumos profissionais, experiencias orientadas a resultados e descricoes de habilidades que impressionam recrutadores.' },
      { question: 'O curriculo vai parecer gerado por IA?', answer: 'Nao. Nossa ferramenta gera conteudo natural e profissional, como se fosse escrito por um especialista em curriculos. Voce pode editar cada sugestao para adicionar seu toque pessoal, e o resultado final e completamente seu.' },
    ],
  },
  crossLinks: {
    title: 'Outras ferramentas de curriculo com IA',
    items: [
      { href: '/pt/resume-maker', title: 'Criador de Curriculo', subtitle: 'Criador de curriculo gratuito com IA' },
      { href: '/pt/tools/ats-checker', title: 'Verificador ATS', subtitle: 'Analise ATS com IA' },
      { href: '/pt/free-resume-builder', title: 'Curriculo gratis', subtitle: 'Criador 100% gratuito' },
    ],
    guidesTitle: 'Guias sobre curriculo com IA',
    guides: [
      { href: '/pt/career-tips/ai-resume-tools', label: 'Ferramentas de IA para curriculo (2026)' },
      { href: '/pt/blog/chatgpt-vs-claude-for-resumes', label: 'ChatGPT vs Claude: qual IA para o curriculo?' },
      { href: '/pt/blog/how-to-write-ats-friendly-resume', label: 'Como fazer um curriculo ATS' },
      { href: '/pt/resume-examples', label: '300+ exemplos de curriculo' },
    ],
  },
  bottomCta: {
    title: 'Pronto para criar seu curriculo com IA?',
    description: 'Junte-se a milhoes de pessoas que conseguem mais entrevistas com o <a href="/pt/" class="text-purple-600 hover:underline">curriculo com inteligencia artificial</a>.',
    cta: 'Comecar gratis com IA',
    subtext: 'Gratis para sempre. Sem cartao de credito.',
  },
};

const tr: ResumeAIPageContent = {
  meta: {
    title: 'Yapay Zeka ile CV | AI CV Oluşturucu Ücretsiz 2026 | Best AI Resume',
    description: 'Yapay zeka ile dakikalar içinde CV oluşturun. Otomatik AI yazımı, ATS optimizasyonu, 20\'den fazla şablon — hepsi ücretsiz.',
    keywords: 'yapay zeka cv, ai ile cv oluştur, otomatik cv oluşturucu, ai cv hazırla, ai cv ücretsiz, yapay zeka özgeçmiş oluşturucu',
  },
  schemas: {
    breadcrumbName: 'AI CV',
    articleHeadline: 'Yapay Zeka ile CV: AI CV Oluşturucu Ücretsiz 2026',
    articleDescription: 'AI\'nın CV içeriğini nasıl oluşturup optimize ettiğini keşfedin. Daha fazla mülakat almak için ücretsiz AI CV oluşturucumuzu kullanın.',
    softwareAppName: 'AI CV Oluşturucu',
  },
  hero: {
    badge: 'Yapay Zeka ile CV Oluşturucu',
    title: 'AI sizin için',
    titleHighlight: 'mükemmel CV\'nizi oluşturuyor',
    subtitle: '<strong>Yapay zeka CV oluşturucumuz</strong> profesyonel içerik yazıyor, ATS için optimize ediyor ve öne çıkan CV oluşturmanıza yardımcı oluyor — tamamen ücretsiz. <a href="https://www.linkedin.com/business/talent/blog/talent-acquisition/how-recruiters-use-ai" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline">LinkedIn\'e</a> göre işe alım uzmanları her CV\'ye ortalama 7 saniye ayırıyor. AI ile her saniye önemli.',
    ctaPrimary: 'AI CV\'yi ücretsiz dene',
    ctaSecondary: 'Nasıl çalışır',
    trustText: 'Kayıt gerekmez · %100 ücretsiz · AI ile oluşturulmuş içerik',
  },
  whatIs: {
    title: 'AI ile CV nedir?',
    description: '<strong>Yapay zeka CV</strong>, CV oluşturma şeklinizi kökten değiştiriyor. Boş bir sayfayla uğraşmak yerine, AI deneyimlerinizi analiz ediyor, istenen pozisyonu anlıyor ve sektörünüz için optimize edilmiş profesyonel içerik üretiyor. <a href="https://www.shrm.org/topics-tools/news/talent-acquisition/ai-rapidly-transforming-how-companies-recruit" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline">SHRM (Society for Human Resource Management)</a>\'nin vurguladığı üzere AI, işe alım süreçlerini hızla dönüştürüyor ve AI ile oluşturulan CV\'ler işverenler tarafından geniş çapta kabul görüyor.',
    stats: [
      { value: '10x', label: 'Manuel yazmadan daha hızlı' },
      { value: '%85', label: 'ATS geçme oranında iyileşme' },
      { value: '3M+', label: 'AI ile oluşturulan CV' },
    ],
  },
  features: {
    title: 'AI CV\'nizi oluşturmaya nasıl yardımcı olur',
    subtitle: 'AI sadece biçimlendirmiyor — gerçekten daha iyi içerik yazmanıza yardımcı oluyor.',
    items: [
      { title: 'AI ile içerik yazımı', description: 'AI, deneyimlerinize ve istenen pozisyona dayalı profesyonel deneyimler, özetler ve beceri açıklamaları üretiyor.' },
      { title: 'Akıllı anahtar kelime optimizasyonu', description: 'AI iş ilanlarını analiz ediyor ve işverenlerin aradığı sektöre özel anahtar kelimeleri öneriyor.' },
      { title: 'ATS puan analizi', description: 'Gerçek zamanlı puanlama, başvurmadan önce CV\'nizin ATS sistemleri tarafından nasıl değerlendirileceğini gösteriyor.' },
      { title: 'Sonuçların sayısallaştırılması', description: 'AI genel açıklamaları, işe alım uzmanlarının dikkatini çeken ölçülebilir ve somut sonuçlara dönüştürüyor.' },
      { title: 'Sektöre özel şablonlar', description: 'AI sektörünüze ve deneyim seviyenize göre en uygun düzeni ve bölümleri öneriyor.' },
      { title: 'Dilbilgisi ve ton kontrolü', description: 'AI dilbilgisi ve yazım denetimi yaparak profesyonel ve cilalı bir sonuç sağlıyor.' },
    ],
  },
  beforeAfter: {
    title: 'AI\'nın CV\'nizi nasıl dönüştürdüğünü görün',
    subtitle: 'Yapay zeka tarafından yapılan iyileştirmelerin gerçek örnekleri.',
    beforeLabel: 'Önce',
    afterLabel: 'AI Sonrası',
    items: [
      { before: 'Ekip ve projeleri yönettim', after: '8 kişilik çok disiplinli ekibi koordine ettim; 12 projeyi zamanında ve %98 müşteri memnuniyetiyle teslim ettim' },
      { before: 'Satışları artırdım', after: 'Veri odaklı satın alma stratejileriyle yıllık geliri %34 artırdım (₺35M)' },
      { before: 'İyi müşteri hizmeti verdim', after: '4,9/5 memnuniyet puanı; günlük 150\'den fazla talebi yöneterek %95 ilk temas çözüm oranı sağladım' },
    ],
    cta: 'Profesyonel CV oluştur',
  },
  comparison: {
    title: 'AI CV vs. Elle yazılmış CV',
    subtitle: 'Adayların yapay zeka CV\'sini neden tercih ettiği.',
    oursName: 'AI ile',
    othersName: 'Elle yazılmış',
    rows: [
      { feature: 'Oluşturma süresi', ours: '10-15 dakika', others: '2-4 saat' },
      { feature: 'Profesyonel yazım', ours: 'AI önerir', others: 'Araştırma gerektirir' },
      { feature: 'ATS optimizasyonu', ours: 'Otomatik', others: 'Manuel ve hatalı' },
      { feature: 'Sektör anahtar kelimeleri', ours: 'AI tarafından önerilir', others: 'Kendi araştırmanız' },
      { feature: 'Dilbilgisi/yazım', ours: 'Otomatik kontrol', others: 'Kolayca atlanır' },
      { feature: 'Sonuçların sayısallaştırılması', ours: 'AI yardımcı olur', others: 'Çoğunlukla unutulur' },
      { feature: 'Biçimlendirme/tasarım', ours: '20\'den fazla şablon', others: 'Sıfırdan oluşturma' },
    ],
  },
  useCases: {
    title: 'AI CV kimler için?',
    subtitle: 'Yapay zeka CV oluşturucu iş arayan herkes için idealdir.',
    items: [
      { title: 'Kariyer değiştirenler', description: 'AI, aktarılabilir becerilerin farklı sektörler arasında değerini öne çıkarmanıza yardımcı olur' },
      { title: 'Yeni mezunlar', description: 'Staj ve akademik projeleri ikna edici profesyonel deneyimlere dönüştürün' },
      { title: 'Deneyimli profesyoneller', description: '20 yıllık deneyimi etkili 2 sayfalık CV\'ye sıkıştırın' },
      { title: 'Aktif iş arayanlar', description: 'Her başvuru için hızlıca özelleştirilmiş CV oluşturun' },
    ],
  },
  faq: {
    title: 'Sık sorulan sorular',
    items: [
      { question: 'Yapay zeka ile CV nedir?', answer: 'AI CV, yapay zeka yardımıyla oluşturulan bir CV\'dir. Aracımız profesyonel deneyimler üretiyor, ATS için optimize ediyor, sektör anahtar kelimeleri öneriyor ve her şeyi otomatik biçimlendiriyor — saatler yerine dakikalar içinde mükemmel CV elde ediyorsunuz.' },
      { question: 'AI ile CV oluşturmak mı daha iyi yoksa elle yazmak mı?', answer: 'AI daha iyi içeriği daha hızlı yazmanıza yardımcı olur. Binlerce başarılı CV\'yi analiz ederek Türkiye iş piyasasına uygun profesyonel ifadeler, sayısallaştırılmış sonuçlar ve anahtar kelimeler öneriyor. Nihai içerik üzerinde tam kontrolü siz koruyorsunuz — AI yalnızca süreci daha etkili hale getiriyor.' },
      { question: 'AI ile oluşturulan CV ATS filtrelerinden geçer mi?', answer: 'Evet! AI CV oluşturucumuz özellikle ATS uyumluluğu için tasarlanmıştır. CV\'yi okunabilir temiz metinle biçimlendiriyor, pozisyonla eşleşen anahtar kelimeler öneriyor ve göndermeden önce optimize etmek için gerçek zamanlı ATS puanlama sağlıyor.' },
      { question: 'Bu AI CV aracı ücretsiz mi?', answer: 'Evet, AI CV oluşturucu %100 ücretsiz. Sınırsız CV oluşturun, tüm şablonları kullanın, PDF olarak indirin — hepsi ücretsiz. Kredi kartı veya abonelik gerekmez.' },
      { question: 'AI içeriği nasıl oluşturuyor?', answer: 'AI pozisyonunuzu, sektörünüzü ve deneyim seviyenizi analiz ederek kişiselleştirilmiş öneriler üretiyor. Milyonlarca başarılı CV\'nin kalıplarını kullanarak işe alım uzmanlarını etkileyen profesyonel özetler, sonuç odaklı deneyimler ve beceri açıklamaları oluşturuyor.' },
      { question: 'CV AI tarafından yazılmış gibi görünür mü?', answer: 'Hayır. Aracımız, bir kariyer uzmanı tarafından yazılmış gibi doğal ve profesyonel içerik üretiyor. Her öneriyi kişisel dokunuşunuzu eklemek için düzenleyebilirsiniz ve nihai sonuç tamamen size ait.' },
    ],
  },
  crossLinks: {
    title: 'Diğer AI CV araçları',
    items: [
      { href: '/tr/resume-maker', title: 'CV Oluşturucu', subtitle: 'AI ile ücretsiz CV oluşturucu' },
      { href: '/tr/tools/ats-checker', title: 'ATS Kontrolü', subtitle: 'AI ile ATS analizi' },
      { href: '/tr/free-resume-builder', title: 'Ücretsiz CV', subtitle: '%100 ücretsiz oluşturucu' },
    ],
    guidesTitle: 'AI CV kılavuzları',
    guides: [
      { href: '/tr/career-tips/ai-resume-tools', label: 'CV için AI araçları (2026)' },
      { href: '/tr/blog/chatgpt-vs-claude-for-resumes', label: 'ChatGPT vs Claude: CV için hangi AI?' },
      { href: '/tr/career-tips/how-to-write-ats-friendly-resume', label: 'ATS uyumlu CV nasıl yazılır' },
      { href: '/tr/resume-examples', label: '300\'den fazla CV örneği' },
    ],
  },
  bottomCta: {
    title: 'AI ile CV\'nizi oluşturmaya hazır mısınız?',
    description: 'Daha fazla mülakat alan milyonlarca kişiye katılın — <a href="/tr/" class="text-purple-600 hover:underline">yapay zeka CV oluşturucu</a> ile.',
    cta: 'AI ile ücretsiz başla',
    subtext: 'Sonsuza kadar ücretsiz. Kredi kartı gerekmez.',
  },
};

const id: ResumeAIPageContent = {
  meta: {
    title: 'CV dengan AI | Pembuat CV Kecerdasan Buatan Gratis 2026',
    description: 'Buat CV dengan AI dalam hitungan menit. Penulisan AI otomatis, optimasi ATS, 20+ template — semuanya gratis.',
    keywords: 'cv dengan ai, buat cv dengan kecerdasan buatan, cv ai gratis, pembuat cv ai, cv otomatis ai, generator cv kecerdasan buatan',
  },
  schemas: {
    breadcrumbName: 'CV dengan AI',
    articleHeadline: 'CV dengan AI: Pembuat CV Kecerdasan Buatan Gratis 2026',
    articleDescription: 'Temukan bagaimana AI menghasilkan dan mengoptimalkan konten CV. Gunakan pembuat CV AI gratis kami untuk mendapatkan lebih banyak interview.',
    softwareAppName: 'Pembuat CV AI',
  },
  hero: {
    badge: 'Pembuat CV dengan Kecerdasan Buatan',
    title: 'AI membuatkan',
    titleHighlight: 'CV sempurna Anda',
    subtitle: '<strong>Pembuat CV AI kami</strong> menulis konten profesional, mengoptimalkan untuk ATS, dan membantu Anda membuat CV yang menonjol — sepenuhnya gratis. Menurut <a href="https://www.linkedin.com/business/talent/blog/talent-acquisition/how-recruiters-use-ai" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline">LinkedIn</a>, rekruter rata-rata menghabiskan 7 detik untuk setiap CV. Dengan AI, setiap detik penting.',
    ctaPrimary: 'Coba CV AI gratis',
    ctaSecondary: 'Cara kerjanya',
    trustText: 'Tanpa pendaftaran · 100% gratis · Konten dibuat AI',
  },
  whatIs: {
    title: 'Apa itu CV dengan AI?',
    description: '<strong>CV dengan AI</strong> mengubah cara Anda membuat CV secara mendasar. Daripada bergulat dengan halaman kosong, AI menganalisis pengalaman Anda, memahami posisi yang diinginkan, dan menghasilkan konten profesional yang dioptimalkan untuk industri Anda. Seperti yang disoroti oleh <a href="https://www.shrm.org/topics-tools/news/talent-acquisition/ai-rapidly-transforming-how-companies-recruit" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline">SHRM</a>, AI dengan cepat mengubah proses rekrutmen dan CV yang dibuat AI diterima secara luas oleh perusahaan.',
    stats: [
      { value: '10x', label: 'Lebih cepat dari penulisan manual' },
      { value: '85%', label: 'Peningkatan tingkat lolos ATS' },
      { value: '3M+', label: 'CV yang dibuat dengan AI' },
    ],
  },
  features: {
    title: 'Bagaimana AI membantu membuat CV Anda',
    subtitle: 'AI tidak hanya memformat — AI benar-benar membantu menulis konten yang lebih baik.',
    items: [
      { title: 'Penulisan konten AI', description: 'AI menghasilkan pengalaman profesional, ringkasan, dan deskripsi keahlian berdasarkan pengalaman dan posisi yang Anda inginkan.' },
      { title: 'Optimasi kata kunci cerdas', description: 'AI menganalisis lowongan kerja dan menyarankan kata kunci spesifik industri yang dicari perusahaan.' },
      { title: 'Analisis skor ATS', description: 'Penilaian real-time menunjukkan bagaimana CV Anda akan dievaluasi oleh sistem ATS sebelum Anda melamar.' },
      { title: 'Kuantifikasi hasil', description: 'AI mengubah deskripsi umum menjadi pencapaian terukur dan konkret yang menarik perhatian rekruter.' },
      { title: 'Template spesifik industri', description: 'AI menyarankan tata letak dan bagian yang paling sesuai untuk industri dan level pengalaman Anda.' },
      { title: 'Pemeriksaan tata bahasa dan nada', description: 'AI secara otomatis memeriksa tata bahasa dan ejaan untuk memastikan hasil yang profesional dan sempurna.' },
    ],
  },
  beforeAfter: {
    title: 'Lihat bagaimana AI mengubah CV Anda',
    subtitle: 'Contoh nyata peningkatan yang dibuat oleh kecerdasan buatan.',
    beforeLabel: 'Sebelum',
    afterLabel: 'Setelah AI',
    items: [
      { before: 'Mengelola tim dan proyek', after: 'Mengkoordinasikan tim lintas fungsi 8 orang; menyelesaikan 12 proyek tepat waktu dengan kepuasan klien 98%' },
      { before: 'Meningkatkan penjualan', after: 'Meningkatkan pendapatan tahunan 34% (Rp 35M) dengan strategi pembelian berbasis data' },
      { before: 'Memberikan layanan pelanggan yang baik', after: 'Skor kepuasan 4,9/5; mengelola 150+ permintaan harian dengan tingkat resolusi kontak pertama 95%' },
    ],
    cta: 'Buat CV profesional',
  },
  comparison: {
    title: 'CV dengan AI vs. CV yang ditulis manual',
    subtitle: 'Mengapa pencari kerja memilih CV AI.',
    oursName: 'Dengan AI',
    othersName: 'Ditulis manual',
    rows: [
      { feature: 'Waktu pembuatan', ours: '10-15 menit', others: '2-4 jam' },
      { feature: 'Penulisan profesional', ours: 'AI menyarankan', others: 'Perlu riset sendiri' },
      { feature: 'Optimasi ATS', ours: 'Otomatis', others: 'Manual dan rentan error' },
      { feature: 'Kata kunci industri', ours: 'Disarankan AI', others: 'Riset sendiri' },
      { feature: 'Tata bahasa/ejaan', ours: 'Pemeriksaan otomatis', others: 'Mudah terlewat' },
      { feature: 'Kuantifikasi hasil', ours: 'AI membantu', others: 'Sering terlupakan' },
      { feature: 'Format/desain', ours: '20+ template', others: 'Buat dari nol' },
    ],
  },
  useCases: {
    title: 'CV AI untuk siapa?',
    subtitle: 'Pembuat CV AI cocok untuk semua pencari kerja.',
    items: [
      { title: 'Pindah karier', description: 'AI membantu menonjolkan keahlian yang bisa ditransfer di berbagai industri' },
      { title: 'Fresh graduate', description: 'Ubah magang dan proyek akademik menjadi pengalaman profesional yang meyakinkan' },
      { title: 'Profesional berpengalaman', description: 'Rangkum 20 tahun pengalaman menjadi CV 2 halaman yang efektif' },
      { title: 'Aktif mencari kerja', description: 'Buat CV yang disesuaikan dengan cepat untuk setiap lamaran' },
    ],
  },
  faq: {
    title: 'Pertanyaan yang sering diajukan',
    items: [
      { question: 'Apa itu CV dengan AI?', answer: 'CV dengan AI adalah CV yang dibuat dengan bantuan kecerdasan buatan. Alat kami menghasilkan pengalaman profesional, mengoptimalkan untuk ATS, menyarankan kata kunci industri, dan memformat semuanya secara otomatis — CV sempurna dalam hitungan menit, bukan jam.' },
      { question: 'Lebih baik buat CV dengan AI atau tulis manual?', answer: 'AI membantu menulis konten yang lebih baik dengan lebih cepat. AI menganalisis ribuan CV sukses dan menyarankan frasa profesional, hasil terukur, dan kata kunci yang sesuai pasar kerja Indonesia. Anda tetap memiliki kontrol penuh atas konten akhir — AI hanya membuat prosesnya lebih efektif.' },
      { question: 'Apakah CV yang dibuat AI bisa lolos filter ATS?', answer: 'Ya! Pembuat CV AI kami dirancang khusus untuk kompatibilitas ATS. AI memformat CV dengan teks bersih yang mudah dibaca, menyarankan kata kunci yang cocok dengan posisi, dan memberikan penilaian ATS real-time untuk mengoptimalkan sebelum mengirim.' },
      { question: 'Apakah alat CV AI ini gratis?', answer: 'Ya, pembuat CV AI 100% gratis. Buat CV tak terbatas, gunakan semua template, unduh sebagai PDF — semuanya gratis. Tidak perlu kartu kredit atau langganan.' },
      { question: 'Bagaimana AI menghasilkan konten?', answer: 'AI menganalisis posisi, industri, dan level pengalaman Anda untuk menghasilkan saran yang dipersonalisasi. AI menggunakan pola dari jutaan CV sukses untuk membuat ringkasan profesional, pengalaman berorientasi hasil, dan deskripsi keahlian yang menarik perhatian rekruter.' },
      { question: 'Apakah CV akan terlihat seperti dibuat AI?', answer: 'Tidak. Alat kami menghasilkan konten yang alami dan profesional seperti ditulis oleh konsultan karier. Anda bisa mengedit setiap saran untuk menambahkan sentuhan personal, dan hasil akhir sepenuhnya milik Anda.' },
    ],
  },
  crossLinks: {
    title: 'Alat CV AI lainnya',
    items: [
      { href: '/id/resume-maker', title: 'Pembuat CV', subtitle: 'Pembuat CV AI gratis' },
      { href: '/id/tools/ats-checker', title: 'Cek ATS', subtitle: 'Analisis ATS dengan AI' },
      { href: '/id/free-resume-builder', title: 'CV Gratis', subtitle: 'Pembuat 100% gratis' },
    ],
    guidesTitle: 'Panduan CV AI',
    guides: [
      { href: '/id/career-tips/ai-resume-tools', label: 'Tools AI untuk CV (2026)' },
      { href: '/id/blog/chatgpt-vs-claude-for-resumes', label: 'ChatGPT vs Claude: AI mana untuk CV?' },
      { href: '/id/career-tips/how-to-write-ats-friendly-resume', label: 'Cara membuat CV ATS friendly' },
      { href: '/id/resume-examples', label: '300+ contoh CV' },
    ],
  },
  bottomCta: {
    title: 'Siap membuat CV dengan AI?',
    description: 'Bergabunglah dengan jutaan orang yang mendapatkan lebih banyak interview — dengan <a href="/id/" class="text-purple-600 hover:underline">pembuat CV kecerdasan buatan</a>.',
    cta: 'Mulai gratis dengan AI',
    subtext: 'Gratis selamanya. Tanpa kartu kredit.',
  },
};

const pl: ResumeAIPageContent = {
  meta: {
    title: 'CV AI | Darmowy Kreator CV z AI 2026 | Stwórz CV Online',
    description: 'Stwórz CV z AI w kilka minut. Darmowe narzędzie AI do CV, które pisze profesjonalne treści, optymalizuje pod ATS i pomaga zdobyć więcej rozmów kwalifikacyjnych.',
    keywords: 'cv ai, kreator cv z ai, ai do cv, cv sztuczna inteligencja, darmowe cv ai, kreator cv ai, cv online ai, wzór cv ai',
  },
  schemas: {
    breadcrumbName: 'CV z AI',
    articleHeadline: 'CV AI: Darmowy Kreator CV z AI 2026',
    articleDescription: 'Stwórz CV z AI. Nasze darmowe narzędzie AI pisze profesjonalne treści, optymalizuje pod ATS i tworzy CV, które zdobywają rozmowy kwalifikacyjne.',
    softwareAppName: 'Kreator CV z AI',
  },
  hero: {
    badge: 'Napędzany zaawansowaną AI',
    title: 'Stwórz CV',
    titleHighlight: 'z AI w kilka sekund',
    subtitle: 'Nasz <strong>kreator CV z AI</strong> pisze profesjonalne treści, optymalizuje pod systemy ATS i pomaga tworzyć CV, które zdobywają rozmowy kwalifikacyjne — wszystko za darmo. Według badań <a href="https://www.linkedin.com/business/talent/blog/talent-acquisition/how-recruiters-use-ai" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline">LinkedIn</a> rekruterzy poświęcają średnio zaledwie 7 sekund na każde CV. Niech AI sprawi, żeby każda sekunda się liczyła.',
    ctaPrimary: 'Wypróbuj kreator CV z AI za darmo',
    ctaSecondary: 'Zobacz jak działa',
    trustText: 'Bez rejestracji · 100% bezpłatnie · Treści generowane przez AI',
  },
  whatIs: {
    title: 'Czym jest tworzenie CV z AI?',
    description: '<strong>Tworzenie CV z AI</strong> fundamentalnie zmienia sposób, w jaki piszesz CV. Zamiast wpatrywać się w pusty ekran, nasza AI analizuje Twoje doświadczenie, rozumie Twoje docelowe stanowisko i generuje profesjonalne treści dostosowane do Twojej branży. Jak podkreśla <a href="https://www.shrm.org/topics-tools/news/talent-acquisition/ai-rapidly-transforming-how-companies-recruit" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline">Society for Human Resource Management (SHRM)</a>, AI szybko transformuje rekrutację — a CV tworzone z AI są szeroko akceptowane przez pracodawców.',
    stats: [
      { value: '10x', label: 'Szybciej niż pisanie ręczne' },
      { value: '85%', label: 'Wyższa szansa na przejście ATS' },
      { value: '3M+', label: 'CV stworzonych z AI' },
    ],
  },
  features: {
    title: 'Jak AI ulepsza Twoje CV',
    subtitle: 'AI robi więcej niż tylko formatuje — naprawdę pomaga pisać lepsze treści.',
    items: [
      { title: 'Pisanie treści przez AI', description: 'AI generuje profesjonalne opisy doświadczenia, podsumowania i umiejętności na podstawie Twojego doświadczenia i docelowego stanowiska.' },
      { title: 'Inteligentna optymalizacja słów kluczowych', description: 'AI analizuje oferty pracy i sugeruje słowa kluczowe charakterystyczne dla branży, których szukają pracodawcy.' },
      { title: 'Analiza wyników ATS', description: 'Ocenianie w czasie rzeczywistym pokazuje, jak Twoje CV jest oceniane przez systemy ATS przed aplikowaniem.' },
      { title: 'Kwantyfikacja wyników', description: 'AI przekształca niejasne opisy w mierzalne, konkretne osiągnięcia, które przyciągają uwagę rekruterów.' },
      { title: 'Szablony specyficzne dla branży', description: 'AI sugeruje układ i sekcje najlepiej dopasowane do Twojej branży i poziomu doświadczenia.' },
      { title: 'Sprawdzanie gramatyki i tonu', description: 'AI automatycznie sprawdza gramatykę i pisownię, zapewniając bezbłędną, profesjonalną prezentację.' },
    ],
  },
  beforeAfter: {
    title: 'Jak AI transformuje Twoje CV',
    subtitle: 'Prawdziwe przykłady ulepszeń dokonanych przez sztuczną inteligencję.',
    beforeLabel: 'Przed',
    afterLabel: 'Po AI',
    items: [
      { before: 'Zarządzałem zespołem i projektami', after: 'Kierowałem cross-funkcyjnym zespołem 8 osób; zrealizowałem 12 projektów na czas z 98% satysfakcją klientów' },
      { before: 'Zwiększyłem sprzedaż', after: 'Zwiększyłem roczną sprzedaż o 34% (280 000 zł) poprzez strategię zakupów opartą na danych' },
      { before: 'Zapewniałem dobrą obsługę klienta', after: 'Utrzymywałem ocenę 4,9/5 satysfakcji; obsługiwałem 150+ zapytań dziennie ze wskaźnikiem rozwiązania przy pierwszym kontakcie 95%' },
    ],
    cta: 'Stwórz profesjonalne CV',
  },
  comparison: {
    title: 'CV z AI vs. CV pisane ręcznie',
    subtitle: 'Dlaczego osoby szukające pracy wybierają tworzenie CV z AI.',
    oursName: 'Z AI',
    othersName: 'Ręcznie',
    rows: [
      { feature: 'Czas tworzenia', ours: '10-15 minut', others: '2-4 godziny' },
      { feature: 'Profesjonalne pisanie', ours: 'AI sugeruje', others: 'Własne badania' },
      { feature: 'Optymalizacja ATS', ours: 'Automatyczna', others: 'Ręczna, podatna na błędy' },
      { feature: 'Słowa kluczowe branży', ours: 'Sugestie AI', others: 'Samodzielne wyszukiwanie' },
      { feature: 'Gramatyka/pisownia', ours: 'Automatyczna kontrola', others: 'Łatwo pominąć' },
      { feature: 'Kwantyfikacja wyników', ours: 'AI pomaga', others: 'Często zapomniane' },
      { feature: 'Format/projekt', ours: '20+ szablonów', others: 'Budowanie od zera' },
    ],
  },
  useCases: {
    title: 'Dla kogo jest tworzenie CV z AI?',
    subtitle: 'Nasz kreator CV z AI jest odpowiedni dla wszystkich szukających pracy.',
    items: [
      { title: 'Zmiana pracy', description: 'AI pomaga podkreślić umiejętności przenośne do nowej branży' },
      { title: 'Wejście na rynek pracy', description: 'Przekształć staże i projekty studenckie w przekonujące doświadczenie zawodowe' },
      { title: 'Doświadczony specjalista', description: 'Podsumuj 20 lat doświadczenia w efektywnym CV na 2 stronach' },
      { title: 'Aktywne poszukiwanie pracy', description: 'Szybko twórz dopasowane CV dla każdej aplikacji' },
    ],
  },
  faq: {
    title: 'Często zadawane pytania',
    items: [
      { question: 'Czym jest CV AI?', answer: 'CV AI to tworzenie CV przy pomocy sztucznej inteligencji. Nasze narzędzie generuje profesjonalne opisy doświadczenia, optymalizuje pod ATS, sugeruje słowa kluczowe branży i automatycznie formatuje wszystko — doskonałe CV w minutach, nie godzinach.' },
      { question: 'Czy CV z AI jest lepsze niż pisane ręcznie?', answer: 'AI pomaga szybciej pisać lepsze treści. Analizuje tysiące udanych CV i sugeruje profesjonalne sformułowania, mierzalne wyniki i słowa kluczowe zgodne z rynkiem pracy. Zachowujesz pełną kontrolę nad finalną treścią — AI sprawia, że proces jest skuteczniejszy.' },
      { question: 'Czy CV z AI przejdzie przez filtry ATS?', answer: 'Tak! Nasz kreator CV z AI jest specjalnie zaprojektowany z myślą o zgodności z ATS. AI formatuje CV z czystym tekstem, łatwym do odczytu przez systemy, sugeruje słowa kluczowe pasujące do stanowiska i daje wynik ATS w czasie rzeczywistym do optymalizacji przed wysłaniem.' },
      { question: 'Czy to narzędzie AI do CV jest darmowe?', answer: 'Tak, kreator CV z AI jest w 100% darmowy. Twórz nieograniczoną liczbę CV, korzystaj ze wszystkich szablonów, pobieraj jako PDF — wszystko za darmo. Nie potrzebujesz karty kredytowej ani subskrypcji.' },
      { question: 'Jak AI generuje treści?', answer: 'AI analizuje Twoje stanowisko, branżę i poziom doświadczenia, aby generować spersonalizowane sugestie. Korzysta ze wzorców milionów udanych CV, aby pisać profesjonalne podsumowania, zorientowane na wyniki opisy doświadczenia i opisy umiejętności, które przemawiają do rekruterów.' },
      { question: 'Czy moje CV będzie wyglądać jak stworzone przez AI?', answer: 'Nie. Nasze narzędzie generuje naturalne, profesjonalne treści brzmiące jak napisane przez coacha kariery. Możesz edytować każdą sugestię, aby dodać własny styl, a końcowy rezultat jest w pełni Twój.' },
    ],
  },
  crossLinks: {
    title: 'Inne narzędzia CV z AI',
    items: [
      { href: '/pl/resume-maker', title: 'Kreator CV', subtitle: 'Darmowy kreator CV z AI' },
      { href: '/pl/tools/ats-checker', title: 'Sprawdzarka ATS', subtitle: 'Analiza ATS przez AI' },
      { href: '/pl/free-resume-builder', title: 'Darmowe CV', subtitle: '100% darmowy kreator CV' },
    ],
    guidesTitle: 'Poradniki CV z AI',
    guides: [
      { href: '/pl/career-tips/ai-resume-tools', label: 'Narzędzia AI do CV (2026)' },
      { href: '/pl/blog/chatgpt-vs-claude-for-resumes', label: 'ChatGPT vs Claude: które AI do CV?' },
      { href: '/pl/career-tips/how-to-write-ats-friendly-resume', label: 'Jak napisać CV przyjazne ATS' },
      { href: '/pl/resume-examples', label: '300+ przykładów CV' },
    ],
  },
  bottomCta: {
    title: 'Gotowy, aby stworzyć CV z AI?',
    description: 'Dołącz do milionów osób szukających pracy, które zdobywają więcej rozmów kwalifikacyjnych — z naszym <a href="/pl/" class="text-purple-600 hover:underline">kreatorem CV z AI</a>.',
    cta: 'Zacznij za darmo z AI',
    subtext: 'Za darmo na zawsze. Bez karty kredytowej.',
  },
};

const nl: ResumeAIPageContent = {
  meta: {
    title: 'CV Maken met AI | Gratis AI CV Schrijven 2026',
    description: 'Maak je cv met AI in enkele minuten. Gratis AI cv tool die professionele content schrijft, optimaliseert voor ATS en je helpt meer interviews te krijgen.',
    keywords: 'cv maken met ai, ai cv schrijven, ai cv maker, cv met kunstmatige intelligentie, ai cv gratis, slimme cv maker, ai cv builder, cv ai',
  },
  schemas: {
    breadcrumbName: 'CV met AI',
    articleHeadline: 'CV Maken met AI: Gratis AI CV Maker 2026',
    articleDescription: 'Maak je cv met AI. Onze gratis AI cv tool schrijft professionele content, optimaliseert voor ATS en maakt cv\'s die interviews opleveren.',
    softwareAppName: 'AI CV Maker',
  },
  hero: {
    badge: 'Aangedreven door geavanceerde AI',
    title: 'Maak je cv',
    titleHighlight: 'met AI in seconden',
    subtitle: 'Onze <strong>AI cv maker</strong> schrijft professionele content, optimaliseert voor ATS-systemen en helpt je cv\'s te maken die interviews opleveren \u2014 allemaal gratis. Volgens <a href="https://www.linkedin.com/business/talent/blog/talent-acquisition/how-recruiters-use-ai" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline">LinkedIn onderzoek</a> besteden recruiters gemiddeld slechts 7 seconden aan elk cv. Laat AI elke seconde tellen.',
    ctaPrimary: 'Probeer AI cv maken gratis',
    ctaSecondary: 'Bekijk hoe het werkt',
    trustText: 'Geen account nodig \u00b7 100% gratis \u00b7 AI-gegenereerde content',
  },
  whatIs: {
    title: 'Wat is cv maken met AI?',
    description: '<strong>CV maken met AI</strong> verandert fundamenteel hoe je een cv opstelt. In plaats van naar een leeg scherm te staren, analyseert onze AI je ervaring, begrijpt je doelfunctie en genereert professionele content op maat van jouw branche. Zoals benadrukt door de <a href="https://www.shrm.org/topics-tools/news/talent-acquisition/ai-rapidly-transforming-how-companies-recruit" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline">Society for Human Resource Management (SHRM)</a>, transformeert AI snel de werving — en cv\'s gemaakt met AI worden breed geaccepteerd door werkgevers.',
    stats: [
      { value: '10x', label: 'Sneller dan handmatig schrijven' },
      { value: '85%', label: 'Hogere kans op ATS-doorgang' },
      { value: '3M+', label: "CV's gemaakt met AI" },
    ],
  },
  features: {
    title: 'Hoe AI je cv verbetert',
    subtitle: 'AI doet meer dan alleen opmaken — het helpt je écht betere content te schrijven.',
    items: [
      { title: 'AI content schrijven', description: 'AI genereert professionele werkervaring, samenvattingen en vaardigheidsbeschrijvingen op basis van jouw ervaring en gewenste functie.' },
      { title: 'Slimme zoekwoordoptimalisatie', description: 'AI analyseert vacatures en stelt branchespecifieke zoekwoorden voor die werkgevers zoeken.' },
      { title: 'ATS-score analyse', description: 'Real-time scoring laat zien hoe je cv wordt beoordeeld door ATS-systemen voordat je solliciteert.' },
      { title: 'Resultaten kwantificeren', description: 'AI zet vage beschrijvingen om in meetbare, concrete prestaties die de aandacht van recruiters trekken.' },
      { title: 'Branchespecifieke sjablonen', description: 'AI stelt de lay-out en secties voor die het beste passen bij jouw branche en ervaringsniveau.' },
      { title: 'Grammatica- en tooncontrole', description: 'AI controleert automatisch grammatica en spelling voor een foutloze, professionele presentatie.' },
    ],
  },
  beforeAfter: {
    title: 'Zie hoe AI je cv transformeert',
    subtitle: 'Echte voorbeelden van verbeteringen gemaakt door kunstmatige intelligentie.',
    beforeLabel: 'Voor',
    afterLabel: 'Na AI',
    items: [
      { before: 'Team en projecten beheerd', after: 'Leidde cross-functioneel team van 8 personen; leverde 12 projecten op tijd op met 98% klanttevredenheid' },
      { before: 'Omzet verhoogd', after: 'Jaarlijkse omzet met 34% (€280K) verhoogd via data-gedreven inkoopstrategie' },
      { before: 'Goede klantenservice geleverd', after: 'Score 4,9/5 tevredenheid; verwerkte 150+ dagelijkse aanvragen met 95% first-contact-oplossingspercentage' },
    ],
    cta: 'Maak professioneel cv',
  },
  comparison: {
    title: 'CV met AI vs. handmatig geschreven cv',
    subtitle: 'Waarom werkzoekenden kiezen voor AI cv maken.',
    oursName: 'Met AI',
    othersName: 'Handmatig',
    rows: [
      { feature: 'Aanmaaktijd', ours: '10-15 minuten', others: '2-4 uur' },
      { feature: 'Professioneel schrijven', ours: 'AI stelt voor', others: 'Eigen research nodig' },
      { feature: 'ATS-optimalisatie', ours: 'Automatisch', others: 'Handmatig, foutgevoelig' },
      { feature: 'Branchezoekwoorden', ours: 'AI-suggesties', others: 'Zelf opzoeken' },
      { feature: 'Grammatica/spelling', ours: 'Automatische controle', others: 'Makkelijk over het hoofd' },
      { feature: 'Resultaten kwantificeren', ours: 'AI helpt', others: 'Vaak vergeten' },
      { feature: 'Opmaak/ontwerp', ours: '20+ sjablonen', others: 'Vanaf nul opbouwen' },
    ],
  },
  useCases: {
    title: 'Voor wie is AI cv maken?',
    subtitle: 'Onze AI cv maker is geschikt voor alle werkzoekenden.',
    items: [
      { title: 'Van baan wisselen', description: 'AI helpt overdraagbare vaardigheden te benadrukken voor een nieuwe branche' },
      { title: 'Starter op de arbeidsmarkt', description: 'Zet stages en studieprojecten om naar overtuigende werkervaring' },
      { title: 'Ervaren professional', description: 'Vat 20 jaar ervaring samen in een effectief cv van 2 pagina\'s' },
      { title: 'Actief solliciterend', description: 'Maak snel op maat gemaakte cv\'s voor elke sollicitatie' },
    ],
  },
  faq: {
    title: 'Veelgestelde vragen',
    items: [
      { question: 'Wat is cv maken met AI?', answer: 'CV maken met AI is een cv opstellen met hulp van kunstmatige intelligentie. Onze tool genereert professionele werkervaring, optimaliseert voor ATS, stelt branchezoekwoorden voor en formatteert alles automatisch — een perfect cv in minuten, niet uren.' },
      { question: 'Is een AI cv beter dan een handmatig geschreven cv?', answer: 'AI helpt je sneller betere content te schrijven. Het analyseert duizenden succesvolle cv\'s en stelt professionele formuleringen, meetbare resultaten en zoekwoorden voor die aansluiten op de arbeidsmarkt. Jij behoudt volledige controle over de uiteindelijke content — AI maakt het proces effectiever.' },
      { question: 'Kan een AI cv door ATS-filters heen komen?', answer: 'Ja! Onze AI cv maker is speciaal ontworpen voor ATS-compatibiliteit. AI formatteert het cv met schone tekst die makkelijk te lezen is, stelt zoekwoorden voor die passen bij de functie en geeft real-time ATS-score om te optimaliseren voor verzending.' },
      { question: 'Is deze AI cv tool gratis?', answer: 'Ja, de AI cv maker is 100% gratis. Maak onbeperkt cv\'s, gebruik alle sjablonen, download als pdf — allemaal gratis. Geen creditcard of abonnement nodig.' },
      { question: 'Hoe genereert AI de content?', answer: 'AI analyseert je functie, branche en ervaringsniveau om gepersonaliseerde suggesties te genereren. Het gebruikt patronen van miljoenen succesvolle cv\'s om professionele samenvattingen, resultaatgerichte werkervaring en vaardigheidsbeschrijvingen te schrijven die recruiters aanspreken.' },
      { question: 'Ziet mijn cv eruit alsof het door AI is gemaakt?', answer: 'Nee. Onze tool genereert natuurlijke, professionele content die klinkt als geschreven door een carrièrecoach. Je kunt elke suggestie bewerken om je eigen stempel te zetten, en het eindresultaat is volledig van jou.' },
    ],
  },
  crossLinks: {
    title: 'Andere AI cv-tools',
    items: [
      { href: '/nl/resume-maker', title: 'CV Maker', subtitle: 'Gratis AI cv maker' },
      { href: '/nl/tools/ats-checker', title: 'ATS Checker', subtitle: 'AI ATS-analyse' },
      { href: '/nl/free-resume-builder', title: 'Gratis CV', subtitle: '100% gratis cv maker' },
    ],
    guidesTitle: 'AI cv-gidsen',
    guides: [
      { href: '/nl/career-tips/ai-resume-tools', label: 'AI tools voor je cv (2026)' },
      { href: '/nl/blog/chatgpt-vs-claude-for-resumes', label: 'ChatGPT vs Claude: welke AI voor je cv?' },
      { href: '/nl/career-tips/how-to-write-ats-friendly-resume', label: 'Hoe maak je een ATS-vriendelijk cv' },
      { href: '/nl/resume-examples', label: '300+ cv-voorbeelden' },
    ],
  },
  bottomCta: {
    title: 'Klaar om je cv te maken met AI?',
    description: 'Sluit je aan bij miljoenen werkzoekenden die meer interviews krijgen — met onze <a href="/nl/" class="text-purple-600 hover:underline">AI cv maker</a>.',
    cta: 'Begin gratis met AI',
    subtext: 'Voor altijd gratis. Geen creditcard.',
  },
};

const contentMap: Record<string, ResumeAIPageContent> = { en, es, fr, de, ar, ja, it, vi, ko, th, pt, tr, id, pl, nl };

export function getContent(locale: string): ResumeAIPageContent {
  return selectContent(contentMap, locale);
}
