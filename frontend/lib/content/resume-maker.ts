import type { LandingPageContent } from './types';
import { selectContent } from './types';

const en: LandingPageContent = {
  meta: {
    title: 'Free Resume Maker | AI-Powered Resume Builder 2026',
    description: 'Create a professional resume in minutes with our free AI resume maker. ATS-friendly templates, AI writing, and instant PDF download.',
    keywords: 'resume maker, resume maker ai free, best resume maker ai, free resume maker, ai resume maker, resume builder, resume creator, make a resume',
  },
  schemas: {
    breadcrumbName: 'Resume Maker',
    articleHeadline: 'Free Resume Maker: AI-Powered Resume Builder 2026',
    articleDescription: 'Create professional resumes in minutes with our free AI resume maker. ATS-friendly templates, AI writing assistance, and instant PDF downloads.',
    softwareAppName: 'Best AI Resume Maker',
  },
  hero: {
    badge: 'Free AI Resume Maker',
    title: 'Create Your Professional',
    titleHighlight: 'Resume in Minutes',
    subtitle: 'Our free <strong>resume maker</strong> uses AI to help you write compelling content, optimize for ATS systems, and land more interviews. With <a href="https://www.jobscan.co/blog/fortune-500-use-applicant-tracking-systems/" target="_blank" rel="noopener noreferrer" class="text-accent-blue hover:underline">98% of Fortune 500 companies</a> using ATS software, having an optimized resume is essential. No design skills needed.',
    ctaPrimary: 'Make My Resume Free',
    ctaSecondary: 'View Templates',
    trustBadges: ['No sign-up required', 'No credit card', 'Free PDF download'],
  },
  features: {
    title: 'Why Choose Our Free Resume Maker?',
    subtitle: 'More than just a template — our AI resume maker helps you write better content and get past ATS screening.',
    items: [
      { feature: 'AI-Powered Writing', description: 'Our AI writes professional bullet points, summaries, and skill descriptions tailored to your industry and experience level.' },
      { feature: 'ATS-Optimized Templates', description: 'Every template is tested against major ATS systems like Workday, Taleo, and Greenhouse. Your resume gets past the bots.' },
      { feature: 'Instant PDF Download', description: 'Download your polished resume as a clean PDF in one click. No watermarks, no paywalls — completely free.' },
      { feature: 'Ready in Minutes', description: 'No more blank page anxiety. Our guided flow and AI suggestions help you build a complete resume in under 10 minutes.' },
      { feature: 'Real-Time ATS Score', description: 'See how your resume scores against ATS requirements as you type. Optimize before you submit.' },
      { feature: '20+ Pro Templates', description: 'Choose from professionally designed templates for every industry and career level. All free, all ATS-friendly.' },
    ],
    cta: 'Start Building Now',
  },
  comparison: {
    title: 'Our Resume Maker vs. The Competition',
    subtitle: 'See why job seekers choose our free AI resume maker over alternatives.',
    oursName: 'Best AI Resumes',
    othersName: 'Other Makers',
    rows: [
      { feature: 'AI Writing Assistance', ours: 'Full AI writing', others: 'Basic or none' },
      { feature: 'ATS Optimization', ours: 'Real-time scoring', others: 'Limited testing' },
      { feature: 'All Templates Free', ours: '20+ templates', others: 'Most are paid' },
      { feature: 'Free PDF Download', ours: 'Always free', others: 'Often paywalled' },
      { feature: 'No Account Required', ours: 'Start instantly', others: 'Usually required' },
      { feature: 'Industry Keywords', ours: 'AI suggestions', others: 'Manual only' },
      { feature: 'Multiple Versions', ours: 'Unlimited', others: 'Often limited' },
    ],
  },
  howItWorks: {
    title: 'How Our Resume Maker Works',
    subtitle: 'Create a job-winning resume in three simple steps. Our AI does the heavy lifting.',
    steps: [
      { step: 1, title: 'Choose a Template', description: 'Pick from 20+ ATS-friendly professional templates designed for your industry.' },
      { step: 2, title: 'Add Your Information', description: 'Enter your experience and let AI suggest improvements, keywords, and professional phrasing.' },
      { step: 3, title: 'Download & Apply', description: 'Export your polished resume as PDF and start applying to jobs immediately.' },
    ],
    cta: 'Build Premium Resume',
  },
  trust: {
    title: '',
    stats: [
      { value: '2M+', label: 'Resumes Created' },
      { value: '4.8', label: 'User Rating' },
      { value: '20+', label: 'Free Templates' },
      { value: '10 min', label: 'Avg. Build Time' },
    ],
  },
  templates: {
    title: 'Professional Templates for Every Career',
    subtitle: 'From creative designers to corporate executives — find the perfect resume template for your industry.',
    styles: ['Software Engineer', 'Marketing Manager', 'Nurse', 'Sales Executive', 'Data Analyst', 'Teacher', 'Project Manager', 'Designer'],
    cta: 'Browse All Templates',
  },
  faq: {
    title: 'Frequently Asked Questions',
    items: [
      { question: 'Is this resume maker really free?', answer: 'Yes! Our AI-powered resume maker is 100% free to use. Create unlimited resumes, access all 20+ professional templates, and download your resume as a PDF — no credit card or subscription required.' },
      { question: 'What makes this the best resume maker?', answer: 'Unlike generic resume makers, our tool uses AI to write professional bullet points, optimize your content for ATS systems, and suggest industry-specific keywords. You get a resume that looks great AND passes automated screening.' },
      { question: 'Can I download my resume as PDF for free?', answer: 'Absolutely. Every resume you create can be downloaded as a clean, ATS-friendly PDF at no cost. No watermarks, no paywalls, no catches.' },
      { question: 'How long does it take to make a resume?', answer: 'Most users create a professional resume in under 10 minutes. Our AI pre-fills content suggestions, so you spend less time staring at a blank page and more time applying to jobs.' },
      { question: 'Is my resume ATS-compatible?', answer: 'Yes. Every template in our resume maker is tested against major ATS systems (Workday, Taleo, Greenhouse, Lever). Our real-time ATS score helps you optimize your resume before you submit it.' },
      { question: 'Can I create multiple resumes for different jobs?', answer: 'Yes! Create as many tailored resumes as you need. Many job seekers customize their resume for each application to match specific job descriptions — our resume maker makes this fast and easy.' },
    ],
  },
  crossLinks: {
    title: 'Related Resume Tools',
    items: [
      { href: '/resume-ai', title: 'Resume AI', subtitle: 'AI-powered resume builder' },
      { href: '/tools/ats-checker', title: 'ATS Checker', subtitle: 'Test your resume ATS score' },
      { href: '/free-resume-builder', title: 'Free Resume Builder', subtitle: '100% free resume creation' },
    ],
    guidesTitle: 'Helpful Guides',
    guides: [
      { href: '/blog/how-to-write-a-resume', label: 'How to Write a Resume (2026 Guide)' },
      { href: '/blog/how-to-write-ats-friendly-resume', label: 'How to Write an ATS-Friendly Resume' },
      { href: '/resume-format', label: 'Resume Format Guide' },
      { href: '/blog/top-resume-mistakes-to-avoid', label: 'Top Resume Mistakes to Avoid' },
    ],
  },
  bottomCta: {
    title: 'Ready to Make Your Resume?',
    description: 'Join over 2 million job seekers who have created professional resumes with our free AI resume builder.',
    cta: 'Create My Resume Free',
    subtext: 'Free forever. No credit card required.',
  },
};

const es: LandingPageContent = {
  meta: {
    title: 'Crear Currículum Vitae Gratis | Creador de CV con IA 2026',
    description: 'Crear curriculum vitae gratis con inteligencia artificial. Plantillas y modelos de CV compatibles con ATS. Formatos de hoja de vida profesionales. Descarga en PDF y Word.',
    keywords: 'crear curriculums gratis, curriculum hacer gratis, armar curriculum vitae gratis, creador de curriculums gratis, hacer curriculum online gratis, modelos de cv, hoja de vida gratis, formato curriculum vitae, plantillas curriculum vitae',
  },
  schemas: {
    breadcrumbName: 'Creador de Currículum',
    articleHeadline: 'Crear Currículum Gratis: Creador de CV con IA 2026',
    articleDescription: 'Crea tu currículum profesional en minutos con nuestro creador de CV gratuito con IA. Plantillas ATS, asistencia de escritura con IA y descarga PDF.',
    softwareAppName: 'Creador de Currículum con IA',
  },
  hero: {
    badge: 'Creador de Currículum con IA Gratis',
    title: 'Crea Tu Currículum',
    titleHighlight: 'Profesional en Minutos',
    subtitle: 'Nuestro <strong>creador de currículum gratis</strong> usa inteligencia artificial para ayudarte a redactar contenido profesional, optimizar para sistemas ATS y conseguir más entrevistas. Con el <a href="https://www.jobscan.co/blog/fortune-500-use-applicant-tracking-systems/" target="_blank" rel="noopener noreferrer" class="text-accent-blue hover:underline">98% de las empresas Fortune 500</a> usando software ATS, tener un currículum optimizado es esencial. No necesitas habilidades de diseño.',
    ctaPrimary: 'Crear Mi Currículum Gratis',
    ctaSecondary: 'Ver Plantillas',
    trustBadges: ['Sin registro', 'Sin tarjeta de crédito', 'Descarga PDF gratis'],
  },
  features: {
    title: '¿Por Qué Elegir Nuestro Creador de Currículum Gratis?',
    subtitle: 'Más que una plantilla — nuestro creador de currículum con IA te ayuda a escribir mejor contenido y pasar el filtro ATS.',
    items: [
      { feature: 'Escritura con IA', description: 'Nuestra IA redacta viñetas profesionales, resúmenes y descripciones de habilidades adaptadas a tu industria y nivel de experiencia.' },
      { feature: 'Plantillas Optimizadas ATS', description: 'Cada plantilla está probada con los principales sistemas ATS como Workday, Taleo y Greenhouse.' },
      { feature: 'Descarga PDF Instantánea', description: 'Descarga tu currículum como PDF limpio con un clic. Sin marcas de agua, sin costo.' },
      { feature: 'Listo en Minutos', description: 'Nuestro flujo guiado y sugerencias de IA te ayudan a crear un currículum completo en menos de 10 minutos.' },
      { feature: 'Puntuación ATS en Tiempo Real', description: 'Mira cómo puntúa tu currículum contra los requisitos ATS mientras escribes.' },
      { feature: 'Más de 20 Plantillas Pro', description: 'Plantillas profesionales para cada industria y nivel de carrera. Todas gratis, todas compatibles con ATS.' },
    ],
    cta: 'Empezar a Crear',
  },
  comparison: {
    title: 'Nuestro Creador vs. La Competencia',
    subtitle: 'Mira por qué los profesionales eligen nuestro creador de currículum gratis con IA.',
    oursName: 'Best AI Resumes',
    othersName: 'Otros Creadores',
    rows: [
      { feature: 'Asistencia de Escritura IA', ours: 'IA completa', others: 'Básica o ninguna' },
      { feature: 'Optimización ATS', ours: 'Puntuación en tiempo real', others: 'Pruebas limitadas' },
      { feature: 'Todas las Plantillas Gratis', ours: 'Más de 20 plantillas', others: 'La mayoría son de pago' },
      { feature: 'Descarga PDF Gratis', ours: 'Siempre gratis', others: 'Generalmente de pago' },
      { feature: 'Sin Cuenta Requerida', ours: 'Empieza al instante', others: 'Generalmente obligatoria' },
      { feature: 'Palabras Clave', ours: 'Sugerencias con IA', others: 'Solo manual' },
      { feature: 'Múltiples Versiones', ours: 'Ilimitadas', others: 'Generalmente limitadas' },
    ],
  },
  howItWorks: {
    title: 'Cómo Funciona Nuestro Creador de Currículum',
    subtitle: 'Crea un currículum ganador en tres simples pasos. Nuestra IA hace el trabajo pesado.',
    steps: [
      { step: 1, title: 'Elige una Plantilla', description: 'Selecciona entre más de 20 plantillas profesionales compatibles con ATS diseñadas para tu industria.' },
      { step: 2, title: 'Agrega Tu Información', description: 'Ingresa tu experiencia y deja que la IA sugiera mejoras, palabras clave y redacción profesional.' },
      { step: 3, title: 'Descarga y Postúlate', description: 'Exporta tu currículum perfecto como PDF y comienza a postularte de inmediato.' },
    ],
    cta: 'Crear Currículum Premium',
  },
  trust: {
    title: '',
    stats: [
      { value: '2M+', label: 'Currículos Creados' },
      { value: '4.8', label: 'Calificación' },
      { value: '20+', label: 'Plantillas Gratis' },
      { value: '10 min', label: 'Tiempo Promedio' },
    ],
  },
  templates: {
    title: 'Plantillas Profesionales para Cada Carrera',
    subtitle: 'Desde diseñadores creativos hasta ejecutivos corporativos — encuentra la plantilla de currículum perfecta para tu industria.',
    styles: ['Ingeniero de Software', 'Gerente de Marketing', 'Enfermera', 'Ejecutivo de Ventas', 'Analista de Datos', 'Profesor', 'Gerente de Proyectos', 'Diseñador'],
    cta: 'Ver Todas las Plantillas',
  },
  faq: {
    title: 'Preguntas Frecuentes',
    items: [
      { question: '¿Este creador de currículum es realmente gratis?', answer: '¡Sí! Nuestro creador de currículum con IA es 100% gratis. Crea currículos ilimitados, accede a más de 20 plantillas profesionales y descarga tu currículum como PDF — sin tarjeta de crédito ni suscripción.' },
      { question: '¿Qué hace a este el mejor creador de currículum?', answer: 'A diferencia de creadores genéricos, nuestra herramienta usa IA para escribir viñetas profesionales, optimizar tu contenido para sistemas ATS y sugerir palabras clave específicas de tu industria.' },
      { question: '¿Puedo descargar mi currículum como PDF gratis?', answer: 'Absolutamente. Cada currículum que crees se puede descargar como PDF limpio y compatible con ATS sin costo. Sin marcas de agua, sin muros de pago.' },
      { question: '¿Cuánto tiempo tarda crear un currículum?', answer: 'La mayoría de los usuarios crean un currículum profesional en menos de 10 minutos. Nuestra IA sugiere contenido, para que pases menos tiempo con la página en blanco y más tiempo postulándote.' },
      { question: '¿Mi currículum es compatible con ATS?', answer: 'Sí. Cada plantilla de nuestro creador está probada con los principales sistemas ATS (Workday, Taleo, Greenhouse, Lever). Nuestra puntuación ATS en tiempo real te ayuda a optimizar antes de enviar.' },
      { question: '¿Puedo crear múltiples currículos para diferentes trabajos?', answer: '¡Sí! Crea todos los currículos personalizados que necesites. Nuestro creador de currículum hace que sea rápido y fácil adaptar tu CV para cada postulación.' },
    ],
  },
  crossLinks: {
    title: 'Herramientas de Currículum Relacionadas',
    items: [
      { href: '/resume-ai', title: 'Currículum con IA', subtitle: 'Creador con inteligencia artificial' },
      { href: '/tools/ats-checker', title: 'Verificador ATS', subtitle: 'Prueba tu puntuación ATS' },
      { href: '/free-resume-builder', title: 'Creador de CV Gratis', subtitle: 'Creación de CV 100% gratis' },
    ],
    guidesTitle: 'Guías Útiles',
    guides: [
      { href: '/blog/how-to-write-a-resume', label: 'Cómo Escribir un Currículum (Guía 2026)' },
      { href: '/blog/how-to-write-ats-friendly-resume', label: 'Cómo Escribir un Currículum Compatible con ATS' },
      { href: '/resume-format', label: 'Guía de Formato de Currículum' },
      { href: '/blog/top-resume-mistakes-to-avoid', label: 'Errores de Currículum que Debes Evitar' },
    ],
  },
  bottomCta: {
    title: '¿Listo Para Crear Tu Currículum?',
    description: 'Únete a más de 2 millones de profesionales que han creado su currículum con nuestro creador gratuito con IA.',
    cta: 'Crear Mi Currículum Gratis',
    subtext: 'Gratis siempre. Sin tarjeta de crédito.',
  },
};

const contentMap: Record<string, LandingPageContent> = { en, es };

export function getContent(locale: string): LandingPageContent {
  return selectContent(contentMap, locale);
}
