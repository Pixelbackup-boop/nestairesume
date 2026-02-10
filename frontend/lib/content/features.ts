import { selectContent } from './types';

export interface FeaturesPageContent {
  meta: { title: string; description: string; keywords: string };
  hero: { badge: string; title: string; titleHighlight: string; subtitle: string };
  features: { title: string; description: string }[];
  steps: {
    badge: string;
    title: string;
    titleHighlight: string;
    items: { title: string; description: string }[];
  };
  cta: { title: string; titleHighlight: string; description: string; ctaText: string };
  externalResources: { title: string; items: { href: string; label: string }[] };
}

const en: FeaturesPageContent = {
  meta: {
    title: 'AI Resume Builder Features — Templates, ATS Checker & More | Best AI Resume',
    description: 'Explore all features of Best AI Resume: AI-powered writing, 20+ premium templates, real-time ATS optimization, PDF export, and smart suggestions to land your dream job.',
    keywords: 'resume builder features, AI resume writer, ATS resume checker, resume templates, PDF resume export, resume builder tools',
  },
  hero: {
    badge: 'Features',
    title: 'Everything you need to',
    titleHighlight: 'land your dream job',
    subtitle: 'Powerful AI tools combined with beautiful design to help you stand out from the crowd.',
  },
  features: [
    { title: 'AI-Powered Writing', description: 'Let our AI craft compelling bullet points and professional summaries that highlight your achievements. Transform basic job descriptions into impactful statements.' },
    { title: '20+ Premium Templates', description: 'Choose from professionally designed templates that stand out while maintaining ATS compatibility. Each template is crafted by design experts.' },
    { title: 'ATS Optimization', description: 'Real-time ATS scoring ensures your resume passes automated screening systems every time. Get instant feedback on how to improve your score.' },
    { title: 'Real-time Preview', description: 'See changes instantly as you type. What you see is exactly what recruiters will see. No more guessing how your resume looks.' },
    { title: 'PDF Export', description: 'Download pixel-perfect PDFs ready to send. Optimized for both digital viewing and print. Your resume looks professional everywhere.' },
    { title: 'Smart Suggestions', description: 'Get intelligent recommendations for skills, keywords, and content based on your target role. AI analyzes thousands of successful resumes.' },
  ],
  steps: {
    badge: 'How It Works',
    title: 'Three steps to your',
    titleHighlight: 'perfect resume',
    items: [
      { title: 'Fill Your Details', description: 'Enter your experience, education, and skills. Our AI assists you every step of the way.' },
      { title: 'Choose Template', description: 'Select from 20+ professionally designed templates. Preview in real-time as you customize.' },
      { title: 'Download PDF', description: 'Export your polished resume as a pixel-perfect PDF, ready to impress recruiters.' },
    ],
  },
  cta: {
    title: 'Ready to build your',
    titleHighlight: 'winning resume?',
    description: "Join 50,000+ professionals who've already landed their dream jobs with Best AI Resume.",
    ctaText: 'Start Building Free',
  },
  externalResources: {
    title: 'External Resources',
    items: [
      { href: 'https://www.bls.gov/ooh/', label: 'Bureau of Labor Statistics: Career Data' },
      { href: 'https://www.shrm.org/', label: 'SHRM: HR & Career Resources' },
    ],
  },
};

const es: FeaturesPageContent = {
  meta: {
    title: 'Creador de Currículum con IA — Plantillas, Verificador ATS y Más | Best AI Resume',
    description: 'Descubre las funciones del creador de currículum con IA: redacción con inteligencia artificial, más de 20 plantillas profesionales, optimización ATS en tiempo real y exportación PDF.',
    keywords: 'creador de curriculum vitae, herramientas cv, plantillas curriculum, verificador ats, exportar curriculum pdf, hacer curriculum con ia',
  },
  hero: {
    badge: 'Funciones',
    title: 'Todo lo que necesitas para',
    titleHighlight: 'conseguir tu empleo ideal',
    subtitle: 'Herramientas de IA potentes combinadas con un diseño profesional para destacar entre la competencia.',
  },
  features: [
    { title: 'Redacción con IA', description: 'Deja que nuestra IA redacte viñetas convincentes y resúmenes profesionales que destaquen tus logros. Transforma descripciones básicas de empleo en declaraciones de impacto.' },
    { title: 'Más de 20 Plantillas Premium', description: 'Elige entre plantillas diseñadas profesionalmente que destacan y son compatibles con sistemas ATS. Cada plantilla está creada por expertos en diseño.' },
    { title: 'Optimización ATS', description: 'La puntuación ATS en tiempo real asegura que tu currículum supere los sistemas de filtrado automatizado siempre. Recibe retroalimentación instantánea para mejorar tu puntuación.' },
    { title: 'Vista Previa en Tiempo Real', description: 'Visualiza los cambios al instante mientras escribes. Lo que ves es exactamente lo que verán los reclutadores. Sin más dudas sobre cómo se ve tu currículum.' },
    { title: 'Exportar a PDF', description: 'Descarga PDFs perfectos listos para enviar. Optimizados para visualización digital e impresión. Tu currículum se ve profesional en cualquier lugar.' },
    { title: 'Sugerencias Inteligentes', description: 'Recibe recomendaciones inteligentes de habilidades, palabras clave y contenido basadas en tu puesto objetivo. La IA analiza miles de currículums exitosos.' },
  ],
  steps: {
    badge: 'Cómo Funciona',
    title: 'Tres pasos para tu',
    titleHighlight: 'currículum perfecto',
    items: [
      { title: 'Completa tus Datos', description: 'Ingresa tu experiencia, educación y habilidades. Nuestra IA te asiste en cada paso del proceso.' },
      { title: 'Elige una Plantilla', description: 'Selecciona entre más de 20 plantillas diseñadas profesionalmente. Vista previa en tiempo real mientras personalizas.' },
      { title: 'Descarga el PDF', description: 'Exporta tu currículum pulido como un PDF perfecto, listo para impresionar a los reclutadores.' },
    ],
  },
  cta: {
    title: '¿Listo para crear tu',
    titleHighlight: 'currículum ganador?',
    description: 'Únete a más de 50,000 profesionales que ya han conseguido su empleo ideal con Best AI Resume.',
    ctaText: 'Comenzar Gratis',
  },
  externalResources: {
    title: 'Recursos Externos',
    items: [
      { href: 'https://www.bls.gov/ooh/', label: 'Bureau of Labor Statistics: Datos Laborales' },
      { href: 'https://www.shrm.org/', label: 'SHRM: Recursos de RRHH y Carreras' },
    ],
  },
};

const content: Record<string, FeaturesPageContent> = { en, es };
export const getContent = (locale: string): FeaturesPageContent => selectContent(content, locale);
