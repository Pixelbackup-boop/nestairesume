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

const contentMap: Record<string, ResumeAIPageContent> = { en, es };

export function getContent(locale: string): ResumeAIPageContent {
  return selectContent(contentMap, locale);
}
