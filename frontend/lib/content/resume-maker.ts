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

// ── French ─────────────────────────────────────────────────────────

const fr: LandingPageContent = {
  meta: {
    title: 'Créateur de CV Gratuit | Générateur de CV avec IA 2026',
    description: 'Créez un CV professionnel en quelques minutes avec notre créateur de CV gratuit alimenté par l\'IA. Modèles compatibles ATS, rédaction IA et téléchargement PDF instantané.',
    keywords: 'créateur de cv, créateur de cv ia gratuit, meilleur créateur de cv ia, créateur de cv gratuit, générateur de cv ia, générateur de cv, créer un cv, faire un cv',
  },
  schemas: {
    breadcrumbName: 'Créateur de CV',
    articleHeadline: 'Créateur de CV Gratuit : Générateur de CV avec IA 2026',
    articleDescription: 'Créez des CV professionnels en quelques minutes avec notre créateur de CV gratuit alimenté par l\'IA. Modèles compatibles ATS, assistance à la rédaction IA et téléchargement PDF instantané.',
    softwareAppName: 'Meilleur Créateur de CV avec IA',
  },
  hero: {
    badge: 'Créateur de CV IA Gratuit',
    title: 'Créez Votre CV',
    titleHighlight: 'Professionnel en Minutes',
    subtitle: 'Notre <strong>créateur de CV</strong> gratuit utilise l\'IA pour vous aider à rédiger un contenu percutant, optimiser pour les systèmes ATS et décrocher plus d\'entretiens. Avec <a href="https://www.jobscan.co/blog/fortune-500-use-applicant-tracking-systems/" target="_blank" rel="noopener noreferrer" class="text-accent-blue hover:underline">98 % des entreprises du Fortune 500</a> utilisant des logiciels ATS, un CV optimisé est indispensable. Aucune compétence en design requise.',
    ctaPrimary: 'Créer Mon CV Gratuitement',
    ctaSecondary: 'Voir les Modèles',
    trustBadges: ['Sans inscription', 'Sans carte bancaire', 'Téléchargement PDF gratuit'],
  },
  features: {
    title: 'Pourquoi Choisir Notre Créateur de CV Gratuit ?',
    subtitle: 'Bien plus qu\'un simple modèle — notre créateur de CV avec IA vous aide à rédiger un meilleur contenu et à franchir le filtrage ATS.',
    items: [
      { feature: 'Rédaction Assistée par IA', description: 'Notre IA rédige des points clés professionnels, des résumés et des descriptions de compétences adaptés à votre secteur et niveau d\'expérience.' },
      { feature: 'Modèles Optimisés ATS', description: 'Chaque modèle est testé avec les principaux systèmes ATS comme Workday, Taleo et Greenhouse. Votre CV passe les filtres automatiques.' },
      { feature: 'Téléchargement PDF Instantané', description: 'Téléchargez votre CV finalisé en PDF propre en un clic. Sans filigrane, sans mur payant — entièrement gratuit.' },
      { feature: 'Prêt en Quelques Minutes', description: 'Fini l\'angoisse de la page blanche. Notre parcours guidé et les suggestions IA vous aident à créer un CV complet en moins de 10 minutes.' },
      { feature: 'Score ATS en Temps Réel', description: 'Visualisez le score de compatibilité ATS de votre CV pendant la rédaction. Optimisez avant de postuler.' },
      { feature: 'Plus de 20 Modèles Pro', description: 'Choisissez parmi des modèles conçus professionnellement pour chaque secteur et niveau de carrière. Tous gratuits, tous compatibles ATS.' },
    ],
    cta: 'Commencer Maintenant',
  },
  comparison: {
    title: 'Notre Créateur de CV vs. La Concurrence',
    subtitle: 'Découvrez pourquoi les candidats choisissent notre créateur de CV gratuit avec IA.',
    oursName: 'Best AI Resumes',
    othersName: 'Autres Créateurs',
    rows: [
      { feature: 'Assistance Rédaction IA', ours: 'Rédaction IA complète', others: 'Basique ou inexistante' },
      { feature: 'Optimisation ATS', ours: 'Score en temps réel', others: 'Tests limités' },
      { feature: 'Tous les Modèles Gratuits', ours: 'Plus de 20 modèles', others: 'La plupart payants' },
      { feature: 'Téléchargement PDF Gratuit', ours: 'Toujours gratuit', others: 'Souvent payant' },
      { feature: 'Sans Compte Requis', ours: 'Démarrage immédiat', others: 'Généralement requis' },
      { feature: 'Mots-clés Sectoriels', ours: 'Suggestions IA', others: 'Manuel uniquement' },
      { feature: 'Versions Multiples', ours: 'Illimitées', others: 'Souvent limitées' },
    ],
  },
  howItWorks: {
    title: 'Comment Fonctionne Notre Créateur de CV',
    subtitle: 'Créez un CV gagnant en trois étapes simples. Notre IA fait le gros du travail.',
    steps: [
      { step: 1, title: 'Choisissez un Modèle', description: 'Sélectionnez parmi plus de 20 modèles professionnels compatibles ATS conçus pour votre secteur.' },
      { step: 2, title: 'Ajoutez Vos Informations', description: 'Saisissez votre expérience et laissez l\'IA suggérer des améliorations, des mots-clés et une rédaction professionnelle.' },
      { step: 3, title: 'Téléchargez et Postulez', description: 'Exportez votre CV finalisé en PDF et commencez à postuler immédiatement.' },
    ],
    cta: 'Créer un CV Premium',
  },
  trust: {
    title: '',
    stats: [
      { value: '2M+', label: 'CV Créés' },
      { value: '4.8', label: 'Note Utilisateurs' },
      { value: '20+', label: 'Modèles Gratuits' },
      { value: '10 min', label: 'Temps Moyen' },
    ],
  },
  templates: {
    title: 'Modèles Professionnels pour Chaque Métier',
    subtitle: 'Des designers créatifs aux cadres dirigeants — trouvez le modèle de CV parfait pour votre secteur.',
    styles: ['Ingénieur Logiciel', 'Responsable Marketing', 'Infirmier(ère)', 'Directeur Commercial', 'Analyste de Données', 'Enseignant(e)', 'Chef de Projet', 'Designer'],
    cta: 'Voir Tous les Modèles',
  },
  faq: {
    title: 'Questions Fréquemment Posées',
    items: [
      { question: 'Ce créateur de CV est-il vraiment gratuit ?', answer: 'Oui ! Notre créateur de CV avec IA est 100 % gratuit. Créez des CV illimités, accédez à plus de 20 modèles professionnels et téléchargez votre CV en PDF — sans carte bancaire ni abonnement.' },
      { question: 'Qu\'est-ce qui en fait le meilleur créateur de CV ?', answer: 'Contrairement aux créateurs de CV génériques, notre outil utilise l\'IA pour rédiger des points clés professionnels, optimiser votre contenu pour les systèmes ATS et suggérer des mots-clés spécifiques à votre secteur. Vous obtenez un CV attrayant ET qui passe le filtrage automatique.' },
      { question: 'Puis-je télécharger mon CV en PDF gratuitement ?', answer: 'Absolument. Chaque CV que vous créez peut être téléchargé en PDF propre et compatible ATS sans aucun frais. Sans filigrane, sans mur payant, sans piège.' },
      { question: 'Combien de temps faut-il pour créer un CV ?', answer: 'La plupart des utilisateurs créent un CV professionnel en moins de 10 minutes. Notre IA pré-remplit des suggestions de contenu, pour que vous passiez moins de temps devant une page blanche et plus de temps à postuler.' },
      { question: 'Mon CV est-il compatible ATS ?', answer: 'Oui. Chaque modèle de notre créateur est testé avec les principaux systèmes ATS (Workday, Taleo, Greenhouse, Lever). Notre score ATS en temps réel vous aide à optimiser votre CV avant de postuler.' },
      { question: 'Puis-je créer plusieurs CV pour différents postes ?', answer: 'Oui ! Créez autant de CV personnalisés que nécessaire. De nombreux candidats adaptent leur CV pour chaque candidature — notre créateur de CV rend cela rapide et facile.' },
    ],
  },
  crossLinks: {
    title: 'Outils de CV Associés',
    items: [
      { href: '/resume-ai', title: 'CV avec IA', subtitle: 'Créateur de CV alimenté par l\'IA' },
      { href: '/tools/ats-checker', title: 'Vérificateur ATS', subtitle: 'Testez votre score ATS' },
      { href: '/free-resume-builder', title: 'Créateur de CV Gratuit', subtitle: 'Création de CV 100 % gratuite' },
    ],
    guidesTitle: 'Guides Utiles',
    guides: [
      { href: '/blog/how-to-write-a-resume', label: 'Comment Rédiger un CV (Guide 2026)' },
      { href: '/blog/how-to-write-ats-friendly-resume', label: 'Comment Rédiger un CV Compatible ATS' },
      { href: '/resume-format', label: 'Guide des Formats de CV' },
      { href: '/blog/top-resume-mistakes-to-avoid', label: 'Erreurs de CV à Éviter' },
    ],
  },
  bottomCta: {
    title: 'Prêt à Créer Votre CV ?',
    description: 'Rejoignez plus de 2 millions de candidats qui ont créé leur CV professionnel avec notre créateur gratuit alimenté par l\'IA.',
    cta: 'Créer Mon CV Gratuitement',
    subtext: 'Gratuit pour toujours. Sans carte bancaire.',
  },
};

// ── German ─────────────────────────────────────────────────────────

const de: LandingPageContent = {
  meta: {
    title: 'Kostenloser Lebenslauf-Ersteller | KI-Lebenslauf-Generator 2026',
    description: 'Erstellen Sie in wenigen Minuten einen professionellen Lebenslauf mit unserem kostenlosen KI-Lebenslauf-Ersteller. ATS-freundliche Vorlagen, KI-Texterstellung und sofortiger PDF-Download.',
    keywords: 'lebenslauf ersteller, lebenslauf ersteller ki kostenlos, bester lebenslauf ersteller ki, kostenloser lebenslauf ersteller, ki lebenslauf ersteller, lebenslauf generator, lebenslauf erstellen, lebenslauf machen',
  },
  schemas: {
    breadcrumbName: 'Lebenslauf-Ersteller',
    articleHeadline: 'Kostenloser Lebenslauf-Ersteller: KI-Lebenslauf-Generator 2026',
    articleDescription: 'Erstellen Sie professionelle Lebensläufe in wenigen Minuten mit unserem kostenlosen KI-Lebenslauf-Ersteller. ATS-freundliche Vorlagen, KI-Schreibhilfe und sofortiger PDF-Download.',
    softwareAppName: 'Bester KI-Lebenslauf-Ersteller',
  },
  hero: {
    badge: 'Kostenloser KI-Lebenslauf-Ersteller',
    title: 'Erstellen Sie Ihren Professionellen',
    titleHighlight: 'Lebenslauf in Minuten',
    subtitle: 'Unser kostenloser <strong>Lebenslauf-Ersteller</strong> nutzt KI, um Ihnen beim Verfassen überzeugender Inhalte zu helfen, für ATS-Systeme zu optimieren und mehr Vorstellungsgespräche zu erzielen. Da <a href="https://www.jobscan.co/blog/fortune-500-use-applicant-tracking-systems/" target="_blank" rel="noopener noreferrer" class="text-accent-blue hover:underline">98 % der Fortune-500-Unternehmen</a> ATS-Software einsetzen, ist ein optimierter Lebenslauf unverzichtbar. Keine Designkenntnisse erforderlich.',
    ctaPrimary: 'Meinen Lebenslauf Kostenlos Erstellen',
    ctaSecondary: 'Vorlagen Ansehen',
    trustBadges: ['Ohne Registrierung', 'Ohne Kreditkarte', 'Kostenloser PDF-Download'],
  },
  features: {
    title: 'Warum Unseren Kostenlosen Lebenslauf-Ersteller Wählen?',
    subtitle: 'Mehr als nur eine Vorlage — unser KI-Lebenslauf-Ersteller hilft Ihnen, bessere Inhalte zu schreiben und das ATS-Screening zu bestehen.',
    items: [
      { feature: 'KI-gestützte Texterstellung', description: 'Unsere KI schreibt professionelle Aufzählungspunkte, Zusammenfassungen und Kompetenzbeschreibungen, zugeschnitten auf Ihre Branche und Erfahrungsstufe.' },
      { feature: 'ATS-optimierte Vorlagen', description: 'Jede Vorlage ist mit führenden ATS-Systemen wie Workday, Taleo und Greenhouse getestet. Ihr Lebenslauf besteht die automatischen Filter.' },
      { feature: 'Sofortiger PDF-Download', description: 'Laden Sie Ihren fertigen Lebenslauf als sauberes PDF mit einem Klick herunter. Ohne Wasserzeichen, ohne Bezahlschranke — völlig kostenlos.' },
      { feature: 'In Minuten Fertig', description: 'Schluss mit der Angst vor der leeren Seite. Unser geführter Ablauf und KI-Vorschläge helfen Ihnen, in unter 10 Minuten einen vollständigen Lebenslauf zu erstellen.' },
      { feature: 'ATS-Score in Echtzeit', description: 'Sehen Sie, wie Ihr Lebenslauf gegen ATS-Anforderungen abschneidet, während Sie schreiben. Optimieren Sie vor der Bewerbung.' },
      { feature: 'Über 20 Profi-Vorlagen', description: 'Wählen Sie aus professionell gestalteten Vorlagen für jede Branche und Karrierestufe. Alle kostenlos, alle ATS-kompatibel.' },
    ],
    cta: 'Jetzt Starten',
  },
  comparison: {
    title: 'Unser Lebenslauf-Ersteller vs. Die Konkurrenz',
    subtitle: 'Erfahren Sie, warum Bewerber unseren kostenlosen KI-Lebenslauf-Ersteller bevorzugen.',
    oursName: 'Best AI Resumes',
    othersName: 'Andere Ersteller',
    rows: [
      { feature: 'KI-Schreibhilfe', ours: 'Vollständige KI-Texterstellung', others: 'Einfach oder keine' },
      { feature: 'ATS-Optimierung', ours: 'Echtzeit-Scoring', others: 'Begrenzte Tests' },
      { feature: 'Alle Vorlagen Kostenlos', ours: 'Über 20 Vorlagen', others: 'Die meisten kostenpflichtig' },
      { feature: 'Kostenloser PDF-Download', ours: 'Immer kostenlos', others: 'Oft kostenpflichtig' },
      { feature: 'Ohne Konto Erforderlich', ours: 'Sofort starten', others: 'Meist erforderlich' },
      { feature: 'Branchenspezifische Keywords', ours: 'KI-Vorschläge', others: 'Nur manuell' },
      { feature: 'Mehrere Versionen', ours: 'Unbegrenzt', others: 'Oft begrenzt' },
    ],
  },
  howItWorks: {
    title: 'So Funktioniert Unser Lebenslauf-Ersteller',
    subtitle: 'Erstellen Sie einen überzeugenden Lebenslauf in drei einfachen Schritten. Unsere KI erledigt die Schwerstarbeit.',
    steps: [
      { step: 1, title: 'Vorlage Wählen', description: 'Wählen Sie aus über 20 ATS-freundlichen professionellen Vorlagen für Ihre Branche.' },
      { step: 2, title: 'Informationen Eingeben', description: 'Geben Sie Ihre Erfahrung ein und lassen Sie die KI Verbesserungen, Keywords und professionelle Formulierungen vorschlagen.' },
      { step: 3, title: 'Herunterladen und Bewerben', description: 'Exportieren Sie Ihren fertigen Lebenslauf als PDF und bewerben Sie sich sofort.' },
    ],
    cta: 'Premium-Lebenslauf Erstellen',
  },
  trust: {
    title: '',
    stats: [
      { value: '2M+', label: 'Erstellte Lebensläufe' },
      { value: '4.8', label: 'Nutzerbewertung' },
      { value: '20+', label: 'Kostenlose Vorlagen' },
      { value: '10 Min', label: 'Durchschn. Erstellzeit' },
    ],
  },
  templates: {
    title: 'Professionelle Vorlagen für Jeden Beruf',
    subtitle: 'Von kreativen Designern bis hin zu Führungskräften — finden Sie die perfekte Lebenslauf-Vorlage für Ihre Branche.',
    styles: ['Softwareentwickler', 'Marketing-Manager', 'Pflegefachkraft', 'Vertriebsleiter', 'Datenanalyst', 'Lehrkraft', 'Projektmanager', 'Designer'],
    cta: 'Alle Vorlagen Ansehen',
  },
  faq: {
    title: 'Häufig Gestellte Fragen',
    items: [
      { question: 'Ist dieser Lebenslauf-Ersteller wirklich kostenlos?', answer: 'Ja! Unser KI-Lebenslauf-Ersteller ist 100 % kostenlos. Erstellen Sie unbegrenzt Lebensläufe, nutzen Sie alle 20+ professionellen Vorlagen und laden Sie Ihren Lebenslauf als PDF herunter — ohne Kreditkarte oder Abonnement.' },
      { question: 'Was macht diesen zum besten Lebenslauf-Ersteller?', answer: 'Im Gegensatz zu generischen Erstellern nutzt unser Tool KI, um professionelle Aufzählungspunkte zu schreiben, Inhalte für ATS-Systeme zu optimieren und branchenspezifische Keywords vorzuschlagen. Sie erhalten einen Lebenslauf, der gut aussieht UND das automatische Screening besteht.' },
      { question: 'Kann ich meinen Lebenslauf kostenlos als PDF herunterladen?', answer: 'Selbstverständlich. Jeder Lebenslauf kann kostenlos als sauberes, ATS-kompatibles PDF heruntergeladen werden. Ohne Wasserzeichen, ohne Bezahlschranke, ohne Haken.' },
      { question: 'Wie lange dauert es, einen Lebenslauf zu erstellen?', answer: 'Die meisten Nutzer erstellen einen professionellen Lebenslauf in unter 10 Minuten. Unsere KI schlägt Inhalte vor, damit Sie weniger Zeit vor einer leeren Seite verbringen und mehr Zeit mit Bewerbungen.' },
      { question: 'Ist mein Lebenslauf ATS-kompatibel?', answer: 'Ja. Jede Vorlage in unserem Ersteller ist mit führenden ATS-Systemen getestet (Workday, Taleo, Greenhouse, Lever). Unser Echtzeit-ATS-Score hilft Ihnen, vor dem Absenden zu optimieren.' },
      { question: 'Kann ich mehrere Lebensläufe für verschiedene Stellen erstellen?', answer: 'Ja! Erstellen Sie so viele maßgeschneiderte Lebensläufe wie nötig. Viele Bewerber passen ihren Lebenslauf für jede Bewerbung an — unser Ersteller macht das schnell und einfach.' },
    ],
  },
  crossLinks: {
    title: 'Verwandte Lebenslauf-Tools',
    items: [
      { href: '/resume-ai', title: 'Lebenslauf mit KI', subtitle: 'KI-gestützter Lebenslauf-Ersteller' },
      { href: '/tools/ats-checker', title: 'ATS-Checker', subtitle: 'Testen Sie Ihren ATS-Score' },
      { href: '/free-resume-builder', title: 'Kostenloser Lebenslauf-Ersteller', subtitle: '100 % kostenlose Lebenslauf-Erstellung' },
    ],
    guidesTitle: 'Hilfreiche Ratgeber',
    guides: [
      { href: '/blog/how-to-write-a-resume', label: 'So Schreiben Sie einen Lebenslauf (Ratgeber 2026)' },
      { href: '/blog/how-to-write-ats-friendly-resume', label: 'So Schreiben Sie einen ATS-Kompatiblen Lebenslauf' },
      { href: '/resume-format', label: 'Lebenslauf-Format Ratgeber' },
      { href: '/blog/top-resume-mistakes-to-avoid', label: 'Die Häufigsten Lebenslauf-Fehler' },
    ],
  },
  bottomCta: {
    title: 'Bereit, Ihren Lebenslauf zu Erstellen?',
    description: 'Schließen Sie sich über 2 Millionen Bewerbern an, die ihren professionellen Lebenslauf mit unserem kostenlosen KI-Ersteller erstellt haben.',
    cta: 'Meinen Lebenslauf Kostenlos Erstellen',
    subtext: 'Für immer kostenlos. Ohne Kreditkarte.',
  },
};

// ── Arabic ─────────────────────────────────────────────────────────

const ar: LandingPageContent = {
  meta: {
    title: 'منشئ سيرة ذاتية مجاني | مولّد سيرة ذاتية بالذكاء الاصطناعي 2026',
    description: 'أنشئ سيرة ذاتية احترافية في دقائق مع منشئ السيرة الذاتية المجاني المدعوم بالذكاء الاصطناعي. قوالب متوافقة مع ATS، كتابة بالذكاء الاصطناعي، وتحميل PDF فوري.',
    keywords: 'منشئ سيرة ذاتية, منشئ سيرة ذاتية مجاني بالذكاء الاصطناعي, أفضل منشئ سيرة ذاتية, منشئ سيرة ذاتية مجاني, مولد سيرة ذاتية, إنشاء سيرة ذاتية, عمل سيرة ذاتية',
  },
  schemas: {
    breadcrumbName: 'منشئ السيرة الذاتية',
    articleHeadline: 'منشئ سيرة ذاتية مجاني: مولّد سيرة ذاتية بالذكاء الاصطناعي 2026',
    articleDescription: 'أنشئ سيراً ذاتية احترافية في دقائق مع منشئ السيرة الذاتية المجاني المدعوم بالذكاء الاصطناعي. قوالب متوافقة مع ATS، مساعدة في الكتابة بالذكاء الاصطناعي، وتحميل PDF فوري.',
    softwareAppName: 'أفضل منشئ سيرة ذاتية بالذكاء الاصطناعي',
  },
  hero: {
    badge: 'منشئ سيرة ذاتية مجاني بالذكاء الاصطناعي',
    title: 'أنشئ سيرتك الذاتية',
    titleHighlight: 'الاحترافية في دقائق',
    subtitle: '<strong>منشئ السيرة الذاتية</strong> المجاني لدينا يستخدم الذكاء الاصطناعي لمساعدتك في كتابة محتوى مقنع، والتحسين لأنظمة ATS، والحصول على مزيد من المقابلات. مع استخدام <a href="https://www.jobscan.co/blog/fortune-500-use-applicant-tracking-systems/" target="_blank" rel="noopener noreferrer" class="text-accent-blue hover:underline">98% من شركات Fortune 500</a> لبرامج ATS، فإن امتلاك سيرة ذاتية محسّنة أمر ضروري. لا حاجة لمهارات تصميم.',
    ctaPrimary: 'إنشاء سيرتي الذاتية مجاناً',
    ctaSecondary: 'عرض القوالب',
    trustBadges: ['بدون تسجيل', 'بدون بطاقة ائتمان', 'تحميل PDF مجاني'],
  },
  features: {
    title: 'لماذا تختار منشئ السيرة الذاتية المجاني لدينا؟',
    subtitle: 'أكثر من مجرد قالب — منشئ السيرة الذاتية بالذكاء الاصطناعي يساعدك على كتابة محتوى أفضل واجتياز فحص ATS.',
    items: [
      { feature: 'كتابة مدعومة بالذكاء الاصطناعي', description: 'ذكاؤنا الاصطناعي يكتب نقاطاً رئيسية احترافية وملخصات ووصف مهارات مصممة لقطاعك ومستوى خبرتك.' },
      { feature: 'قوالب محسّنة لـ ATS', description: 'كل قالب مُختبر مع أنظمة ATS الرائدة مثل Workday وTaleo وGreenhouse. سيرتك الذاتية تتجاوز الفلاتر الآلية.' },
      { feature: 'تحميل PDF فوري', description: 'حمّل سيرتك الذاتية المصقولة كملف PDF نظيف بنقرة واحدة. بدون علامات مائية، بدون رسوم — مجاني بالكامل.' },
      { feature: 'جاهز في دقائق', description: 'لا مزيد من قلق الصفحة الفارغة. مسارنا الموجّه واقتراحات الذكاء الاصطناعي تساعدك على إنشاء سيرة ذاتية كاملة في أقل من 10 دقائق.' },
      { feature: 'نتيجة ATS في الوقت الفعلي', description: 'شاهد كيف تحقق سيرتك الذاتية نتائج مقابل متطلبات ATS أثناء الكتابة. حسّنها قبل التقديم.' },
      { feature: 'أكثر من 20 قالباً احترافياً', description: 'اختر من قوالب مصممة احترافياً لكل قطاع ومستوى وظيفي. كلها مجانية، كلها متوافقة مع ATS.' },
    ],
    cta: 'ابدأ الإنشاء الآن',
  },
  comparison: {
    title: 'منشئنا مقابل المنافسين',
    subtitle: 'اكتشف لماذا يختار الباحثون عن عمل منشئ السيرة الذاتية المجاني بالذكاء الاصطناعي.',
    oursName: 'Best AI Resumes',
    othersName: 'منشئون آخرون',
    rows: [
      { feature: 'مساعدة الكتابة بالذكاء الاصطناعي', ours: 'كتابة IA كاملة', others: 'أساسية أو معدومة' },
      { feature: 'تحسين ATS', ours: 'تقييم في الوقت الفعلي', others: 'اختبارات محدودة' },
      { feature: 'جميع القوالب مجانية', ours: 'أكثر من 20 قالباً', others: 'معظمها مدفوع' },
      { feature: 'تحميل PDF مجاني', ours: 'مجاني دائماً', others: 'غالباً مدفوع' },
      { feature: 'بدون حساب مطلوب', ours: 'ابدأ فوراً', others: 'مطلوب عادةً' },
      { feature: 'كلمات مفتاحية قطاعية', ours: 'اقتراحات الذكاء الاصطناعي', others: 'يدوي فقط' },
      { feature: 'نسخ متعددة', ours: 'غير محدودة', others: 'غالباً محدودة' },
    ],
  },
  howItWorks: {
    title: 'كيف يعمل منشئ السيرة الذاتية لدينا',
    subtitle: 'أنشئ سيرة ذاتية ناجحة في ثلاث خطوات بسيطة. ذكاؤنا الاصطناعي يتولى العمل الشاق.',
    steps: [
      { step: 1, title: 'اختر قالباً', description: 'اختر من بين أكثر من 20 قالباً احترافياً متوافقاً مع ATS مصمماً لقطاعك.' },
      { step: 2, title: 'أضف معلوماتك', description: 'أدخل خبرتك ودع الذكاء الاصطناعي يقترح تحسينات وكلمات مفتاحية وصياغة احترافية.' },
      { step: 3, title: 'حمّل وتقدّم', description: 'صدّر سيرتك الذاتية المصقولة بصيغة PDF وابدأ بالتقدم للوظائف فوراً.' },
    ],
    cta: 'إنشاء سيرة ذاتية مميزة',
  },
  trust: {
    title: '',
    stats: [
      { value: '2M+', label: 'سيرة ذاتية تم إنشاؤها' },
      { value: '4.8', label: 'تقييم المستخدمين' },
      { value: '20+', label: 'قوالب مجانية' },
      { value: '10 دقائق', label: 'متوسط وقت الإنشاء' },
    ],
  },
  templates: {
    title: 'قوالب احترافية لكل مهنة',
    subtitle: 'من المصممين المبدعين إلى المدراء التنفيذيين — اعثر على قالب السيرة الذاتية المثالي لقطاعك.',
    styles: ['مهندس برمجيات', 'مدير تسويق', 'ممرض(ة)', 'مدير مبيعات', 'محلل بيانات', 'معلم(ة)', 'مدير مشاريع', 'مصمم'],
    cta: 'تصفح جميع القوالب',
  },
  faq: {
    title: 'الأسئلة الشائعة',
    items: [
      { question: 'هل منشئ السيرة الذاتية هذا مجاني فعلاً؟', answer: 'نعم! منشئ السيرة الذاتية بالذكاء الاصطناعي مجاني 100%. أنشئ سيراً ذاتية غير محدودة، استخدم جميع القوالب الاحترافية الـ 20+، وحمّل سيرتك الذاتية بصيغة PDF — بدون بطاقة ائتمان أو اشتراك.' },
      { question: 'ما الذي يجعل هذا أفضل منشئ سيرة ذاتية؟', answer: 'على عكس المنشئين العاديين، أداتنا تستخدم الذكاء الاصطناعي لكتابة نقاط رئيسية احترافية، وتحسين محتواك لأنظمة ATS، واقتراح كلمات مفتاحية خاصة بقطاعك. تحصل على سيرة ذاتية تبدو رائعة وتجتاز الفحص الآلي.' },
      { question: 'هل يمكنني تحميل سيرتي الذاتية بصيغة PDF مجاناً؟', answer: 'بالتأكيد. كل سيرة ذاتية تنشئها يمكن تحميلها كملف PDF نظيف ومتوافق مع ATS بدون أي تكلفة. بدون علامات مائية، بدون جدار دفع، بدون فخاخ.' },
      { question: 'كم من الوقت يستغرق إنشاء سيرة ذاتية؟', answer: 'معظم المستخدمين ينشئون سيرة ذاتية احترافية في أقل من 10 دقائق. ذكاؤنا الاصطناعي يقترح المحتوى مسبقاً، لتقضي وقتاً أقل أمام صفحة فارغة ووقتاً أكثر في التقدم للوظائف.' },
      { question: 'هل سيرتي الذاتية متوافقة مع ATS؟', answer: 'نعم. كل قالب في منشئنا مُختبر مع أنظمة ATS الرائدة (Workday، Taleo، Greenhouse، Lever). تقييم ATS في الوقت الفعلي يساعدك على التحسين قبل التقديم.' },
      { question: 'هل يمكنني إنشاء عدة سير ذاتية لوظائف مختلفة؟', answer: 'نعم! أنشئ عدد السير الذاتية المخصصة الذي تحتاجه. كثير من الباحثين عن عمل يخصصون سيرتهم الذاتية لكل طلب توظيف — منشئنا يجعل ذلك سريعاً وسهلاً.' },
    ],
  },
  crossLinks: {
    title: 'أدوات سيرة ذاتية ذات صلة',
    items: [
      { href: '/resume-ai', title: 'سيرة ذاتية بالذكاء الاصطناعي', subtitle: 'منشئ سيرة ذاتية مدعوم بالذكاء الاصطناعي' },
      { href: '/tools/ats-checker', title: 'فاحص ATS', subtitle: 'اختبر نتيجة ATS لسيرتك الذاتية' },
      { href: '/free-resume-builder', title: 'منشئ سيرة ذاتية مجاني', subtitle: 'إنشاء سيرة ذاتية مجاني 100%' },
    ],
    guidesTitle: 'أدلة مفيدة',
    guides: [
      { href: '/blog/how-to-write-a-resume', label: 'كيف تكتب سيرة ذاتية (دليل 2026)' },
      { href: '/blog/how-to-write-ats-friendly-resume', label: 'كيف تكتب سيرة ذاتية متوافقة مع ATS' },
      { href: '/resume-format', label: 'دليل تنسيق السيرة الذاتية' },
      { href: '/blog/top-resume-mistakes-to-avoid', label: 'أخطاء السيرة الذاتية التي يجب تجنبها' },
    ],
  },
  bottomCta: {
    title: 'مستعد لإنشاء سيرتك الذاتية؟',
    description: 'انضم إلى أكثر من 2 مليون باحث عن عمل أنشأوا سيرتهم الذاتية الاحترافية مع منشئنا المجاني المدعوم بالذكاء الاصطناعي.',
    cta: 'إنشاء سيرتي الذاتية مجاناً',
    subtext: 'مجاني للأبد. بدون بطاقة ائتمان.',
  },
};

// ── Japanese ──────────────────────────────────────────────────────────

const ja: LandingPageContent = {
  meta: {
    title: '無料履歴書メーカー | AI履歴書作成ツール 2026',
    description: '無料のAI履歴書メーカーでプロフェッショナルな履歴書を数分で作成。ATS対応テンプレート、AIライティング支援、PDFダウンロード。履歴書サンプル300件以上。',
    keywords: '履歴書メーカー, 履歴書作成ツール, AI履歴書, 無料 履歴書メーカー, 履歴書サンプル, 職務経歴書 作成, ATS対応 履歴書, 履歴書テンプレート 無料',
  },
  schemas: {
    breadcrumbName: '履歴書メーカー',
    articleHeadline: '無料履歴書メーカー：AI搭載の履歴書作成ツール 2026',
    articleDescription: '無料のAI履歴書メーカーでプロフェッショナルな履歴書を数分で作成。ATS対応テンプレート、AI作成支援、PDFダウンロード。',
    softwareAppName: 'Best AI 履歴書メーカー',
  },
  hero: {
    badge: '無料AI履歴書メーカー',
    title: 'プロフェッショナルな履歴書を',
    titleHighlight: '数分で作成',
    subtitle: '当ツールの無料<strong>履歴書メーカー</strong>はAIを活用して説得力のあるコンテンツ作成、ATS最適化、面接獲得をサポートします。<a href="https://www.jobscan.co/blog/fortune-500-use-applicant-tracking-systems/" target="_blank" rel="noopener noreferrer" class="text-accent-blue hover:underline">Fortune 500企業の98%</a>がATSを使用する今、最適化された履歴書は必須です。デザインスキルは不要。',
    ctaPrimary: '無料で履歴書を作成',
    ctaSecondary: 'テンプレートを見る',
    trustBadges: ['登録不要', 'クレジットカード不要', 'PDFダウンロード無料'],
  },
  features: {
    title: '当ツールの無料履歴書メーカーが選ばれる理由',
    subtitle: '単なるテンプレートではありません——AI履歴書メーカーが優れたコンテンツの作成とATS審査の通過を支援します。',
    items: [
      { feature: 'AIライティング支援', description: 'AIがあなたの業界と経験レベルに合わせたプロフェッショナルな実績記述、職務要約、スキル説明を自動生成します。' },
      { feature: 'ATS最適化テンプレート', description: 'すべてのテンプレートはWorkday、Taleo、GreenhouseなどのATS主要システムでテスト済み。書類選考を確実に突破します。' },
      { feature: 'PDFダウンロード', description: 'ワンクリックでPDFをダウンロード。透かしなし、料金なし——完全無料です。' },
      { feature: '数分で完成', description: '白紙のページに悩む必要はありません。ガイド付きフローとAIの提案で、10分以内に完成度の高い履歴書が作成できます。' },
      { feature: 'リアルタイムATSスコア', description: '入力しながらATSスコアをリアルタイムで確認。提出前に最適化できます。' },
      { feature: '20種以上のプロテンプレート', description: 'あらゆる業界・キャリアレベルに対応するプロフェッショナルテンプレート。すべて無料、すべてATS対応。' },
    ],
    cta: '今すぐ作成を開始',
  },
  comparison: {
    title: '当ツール vs 他の履歴書メーカー',
    subtitle: 'なぜ多くの求職者が当ツールの無料AI履歴書メーカーを選ぶのかご確認ください。',
    oursName: 'Best AI Resumes',
    othersName: '他のメーカー',
    rows: [
      { feature: 'AIライティング支援', ours: '高度なAI作成', others: '基本的または無し' },
      { feature: 'ATS最適化', ours: 'リアルタイム採点', others: '限定的なテスト' },
      { feature: '全テンプレート無料', ours: '20種以上', others: '大半が有料' },
      { feature: 'PDFダウンロード無料', ours: '常に無料', others: '多くが有料' },
      { feature: 'アカウント不要', ours: 'すぐに開始', others: '通常必要' },
      { feature: '業界キーワード', ours: 'AI提案', others: '手動のみ' },
      { feature: '複数バージョン', ours: '無制限', others: '多くが制限あり' },
    ],
  },
  howItWorks: {
    title: '履歴書メーカーの使い方',
    subtitle: '3つの簡単なステップで内定を勝ち取る履歴書を作成。AIが面倒な作業を代行します。',
    steps: [
      { step: 1, title: 'テンプレートを選ぶ', description: '業界に合わせた20種以上のATS対応プロテンプレートから選択。' },
      { step: 2, title: '情報を入力する', description: '経歴を入力すると、AIが改善提案・キーワード・プロの表現を提案します。' },
      { step: 3, title: 'ダウンロードして応募', description: 'PDFで履歴書をエクスポートし、すぐに応募を開始できます。' },
    ],
    cta: 'プレミアム履歴書を作成',
  },
  trust: {
    title: '',
    stats: [
      { value: '200万+', label: '作成された履歴書' },
      { value: '4.8', label: 'ユーザー評価' },
      { value: '20+', label: '無料テンプレート' },
      { value: '10分', label: '平均作成時間' },
    ],
  },
  templates: {
    title: 'あらゆる職種に対応するプロテンプレート',
    subtitle: 'クリエイティブなデザイナーから企業の管理職まで——あなたの業界に最適な履歴書テンプレートが見つかります。',
    styles: ['ソフトウェアエンジニア', 'マーケティングマネージャー', '看護師', '営業部長', 'データアナリスト', '教師', 'プロジェクトマネージャー', 'デザイナー'],
    cta: 'すべてのテンプレートを見る',
  },
  faq: {
    title: 'よくある質問',
    items: [
      { question: 'この履歴書メーカーは本当に無料ですか？', answer: 'はい！AI搭載の履歴書メーカーは100%無料です。無制限の履歴書作成、20種以上のプロテンプレートへのアクセス、PDFダウンロード——クレジットカードもサブスクリプションも不要です。' },
      { question: 'なぜこれが最良の履歴書メーカーなのですか？', answer: '一般的な履歴書メーカーと異なり、当ツールはAIを使ってプロフェッショナルな実績記述の作成、ATS最適化、業界固有のキーワード提案を行います。見た目が良く、かつATS審査も通過する履歴書が作れます。' },
      { question: 'PDFで無料ダウンロードできますか？', answer: 'もちろんです。作成した履歴書はすべて、ATS対応のPDFとして無料でダウンロードできます。透かしなし、料金なし。' },
      { question: '履歴書の作成にどのくらい時間がかかりますか？', answer: '多くのユーザーが10分以内にプロフェッショナルな履歴書を完成させています。AIが内容を提案するので、白紙のページに悩む時間を応募活動に使えます。' },
      { question: '作成した履歴書はATS対応ですか？', answer: 'はい。すべてのテンプレートは主要ATSシステム（Workday、Taleo、Greenhouse、Lever）でテスト済みです。リアルタイムATSスコアで提出前に最適化できます。' },
      { question: '異なる求人に合わせて複数の履歴書を作成できますか？', answer: 'はい！必要な数だけカスタマイズした履歴書を作成できます。求人ごとに職務経歴書を最適化するのが効果的で、当ツールならそれが迅速かつ簡単にできます。' },
    ],
  },
  crossLinks: {
    title: '関連する履歴書ツール',
    items: [
      { href: '/resume-ai', title: 'AI履歴書', subtitle: 'AI搭載の履歴書作成ツール' },
      { href: '/tools/ats-checker', title: 'ATSチェッカー', subtitle: 'ATSスコアをテスト' },
      { href: '/free-resume-builder', title: '無料履歴書ビルダー', subtitle: '100%無料の履歴書作成' },
    ],
    guidesTitle: '役立つガイド',
    guides: [
      { href: '/blog/how-to-write-a-resume', label: '履歴書の書き方（2026年版ガイド）' },
      { href: '/blog/how-to-write-ats-friendly-resume', label: 'ATS対応履歴書の書き方' },
      { href: '/resume-format', label: '履歴書フォーマットガイド' },
      { href: '/blog/top-resume-mistakes-to-avoid', label: '履歴書でよくある間違い' },
    ],
  },
  bottomCta: {
    title: '履歴書を作成する準備はできましたか？',
    description: '200万人以上の求職者が当ツールの無料AI履歴書メーカーでプロフェッショナルな履歴書を作成しています。',
    cta: '無料で履歴書を作成',
    subtext: '永久無料。クレジットカード不要。',
  },
};

const it: LandingPageContent = {
  meta: {
    title: 'Creatore Curriculum Vitae Gratis | Crea CV Online con IA 2026',
    description: 'Crea un curriculum vitae professionale in pochi minuti con il nostro creatore di CV gratuito con IA. Modelli ATS-friendly, scrittura con IA e download PDF istantaneo.',
    keywords: 'creatore curriculum vitae, crea cv online, generatore curriculum, creatore cv gratis, crea curriculum vitae, curriculum maker, cv online gratis, generatore cv automatico',
  },
  schemas: {
    breadcrumbName: 'Creatore Curriculum Vitae',
    articleHeadline: 'Creatore Curriculum Vitae Gratis: Crea CV Online con IA 2026',
    articleDescription: 'Crea curriculum vitae professionali in pochi minuti con il nostro creatore di CV gratuito con IA. Modelli ATS-friendly, scrittura con IA e download PDF istantaneo.',
    softwareAppName: 'Best AI Creatore Curriculum Vitae',
  },
  hero: {
    badge: 'Creatore Curriculum Vitae con IA Gratis',
    title: 'Crea il tuo curriculum vitae',
    titleHighlight: 'professionale in pochi minuti',
    subtitle: 'Il nostro <strong>creatore di curriculum vitae</strong> gratuito usa l\'IA per scrivere contenuti efficaci, ottimizzare per gli ATS e farti ottenere più colloqui. Con il <a href="https://www.jobscan.co/blog/fortune-500-use-applicant-tracking-systems/" target="_blank" rel="noopener noreferrer" class="text-accent-blue hover:underline">98% delle grandi aziende</a> che utilizza software ATS, avere un CV ottimizzato è essenziale. Nessuna competenza di design richiesta.',
    ctaPrimary: 'Crea il mio CV gratis',
    ctaSecondary: 'Vedi i modelli',
    trustBadges: ['Nessuna registrazione', 'Nessuna carta di credito', 'Download PDF gratis'],
  },
  features: {
    title: 'Perché scegliere il nostro creatore di curriculum vitae gratis?',
    subtitle: 'Più di un semplice modello — il nostro creatore di CV con IA ti aiuta a scrivere contenuti migliori e a superare lo screening ATS.',
    items: [
      { feature: 'Scrittura assistita dall\'IA', description: 'L\'IA genera automaticamente esperienze lavorative professionali, profili riassuntivi e descrizioni di competenze su misura per il tuo settore e livello di esperienza.' },
      { feature: 'Modelli ottimizzati per ATS', description: 'Tutti i modelli sono testati con i principali sistemi ATS come Workday, Taleo, Greenhouse. Supera la selezione automatica con sicurezza.' },
      { feature: 'Download PDF', description: 'Scarica il tuo curriculum vitae in PDF con un clic. Nessun watermark, nessun costo — completamente gratis.' },
      { feature: 'Pronto in pochi minuti', description: 'Niente pagine vuote da fissare. Il flusso guidato e i suggerimenti dell\'IA ti permettono di completare un CV professionale in meno di 10 minuti.' },
      { feature: 'Punteggio ATS in tempo reale', description: 'Visualizza il punteggio ATS del tuo curriculum vitae in tempo reale mentre scrivi. Ottimizza prima di candidarti.' },
      { feature: '20+ modelli professionali', description: 'Modelli per ogni settore e livello di carriera. Tutti gratis, tutti ATS-friendly.' },
    ],
    cta: 'Inizia a creare il tuo CV',
  },
  comparison: {
    title: 'Il nostro creatore vs altri creatori di CV',
    subtitle: 'Scopri perché chi cerca lavoro sceglie il nostro creatore di curriculum vitae gratuito con IA.',
    oursName: 'Best AI Resumes',
    othersName: 'Altri creatori',
    rows: [
      { feature: 'Scrittura con IA', ours: 'IA avanzata', others: 'Base o assente' },
      { feature: 'Ottimizzazione ATS', ours: 'Punteggio in tempo reale', others: 'Test limitati' },
      { feature: 'Tutti i modelli gratis', ours: '20+', others: 'La maggior parte a pagamento' },
      { feature: 'Download PDF gratis', ours: 'Sempre gratis', others: 'Molti a pagamento' },
      { feature: 'Senza account', ours: 'Inizio immediato', others: 'Generalmente richiesto' },
      { feature: 'Parole chiave di settore', ours: 'Suggerite dall\'IA', others: 'Solo manuale' },
      { feature: 'Versioni multiple', ours: 'Illimitate', others: 'Spesso limitate' },
    ],
  },
  howItWorks: {
    title: 'Come usare il creatore di curriculum vitae',
    subtitle: 'In 3 semplici passaggi crea un curriculum vitae che conquista i recruiter. L\'IA si occupa del lavoro pesante.',
    steps: [
      { step: 1, title: 'Scegli un modello', description: 'Seleziona tra 20+ modelli professionali ATS-friendly adatti al tuo settore.' },
      { step: 2, title: 'Inserisci le informazioni', description: 'Aggiungi le tue esperienze e lascia che l\'IA suggerisca miglioramenti, parole chiave ed espressioni professionali.' },
      { step: 3, title: 'Scarica e candidati', description: 'Esporta il tuo curriculum vitae in PDF e inizia subito a candidarti.' },
    ],
    cta: 'Crea un CV professionale',
  },
  trust: {
    title: '',
    stats: [
      { value: '2M+', label: 'CV creati' },
      { value: '4.8', label: 'Valutazione utenti' },
      { value: '20+', label: 'Modelli gratis' },
      { value: '10 min', label: 'Tempo medio di creazione' },
    ],
  },
  templates: {
    title: 'Modelli professionali per ogni settore',
    subtitle: 'Dal designer creativo al dirigente d\'azienda — trova il modello di curriculum vitae perfetto per il tuo settore.',
    styles: ['Ingegnere software', 'Marketing manager', 'Infermiere', 'Responsabile vendite', 'Data analyst', 'Insegnante', 'Project manager', 'Designer'],
    cta: 'Vedi tutti i modelli',
  },
  faq: {
    title: 'Domande frequenti',
    items: [
      { question: 'Questo creatore di curriculum vitae è davvero gratis?', answer: 'Sì! Il nostro creatore di CV con IA è 100% gratuito. Crea curriculum vitae illimitati, accedi a tutti i 20+ modelli professionali, scarica in PDF — senza carta di credito né abbonamento.' },
      { question: 'Perché è il miglior creatore di curriculum vitae?', answer: 'A differenza dei creatori di CV generici, il nostro usa l\'IA per generare esperienze lavorative professionali, ottimizzare per gli ATS e suggerire parole chiave specifiche per il tuo settore. Crei un CV che è sia esteticamente curato che efficace nel superare lo screening automatico.' },
      { question: 'Posso scaricare il CV in PDF gratis?', answer: 'Certo. Tutti i curriculum vitae creati possono essere scaricati gratuitamente in PDF ATS-friendly. Nessun watermark, nessun costo aggiuntivo.' },
      { question: 'Quanto tempo serve per creare un curriculum vitae?', answer: 'La maggior parte degli utenti completa un curriculum vitae professionale in meno di 10 minuti. L\'IA suggerisce i contenuti, così puoi dedicare il tempo risparmiato alle candidature.' },
      { question: 'I CV creati sono compatibili con gli ATS?', answer: 'Sì. Tutti i modelli sono testati con i principali sistemi ATS (Workday, Taleo, Greenhouse, Lever). Il punteggio ATS in tempo reale ti aiuta a ottimizzare il CV prima di candidarti.' },
      { question: 'Posso creare più curriculum vitae per diverse candidature?', answer: 'Sì! Puoi creare quanti curriculum vitae personalizzati desideri. Ottimizzare il CV per ogni posizione aumenta le tue possibilità, e con il nostro strumento è rapido e semplice.' },
    ],
  },
  crossLinks: {
    title: 'Strumenti correlati per il CV',
    items: [
      { href: '/it/resume-ai', title: 'CV con IA', subtitle: 'Creatore di CV con intelligenza artificiale' },
      { href: '/it/tools/ats-checker', title: 'Verifica ATS', subtitle: 'Testa il punteggio ATS' },
      { href: '/it/free-resume-builder', title: 'CV gratis', subtitle: 'Creatore di CV 100% gratis' },
    ],
    guidesTitle: 'Guide utili',
    guides: [
      { href: '/it/blog/how-to-write-a-resume', label: 'Come scrivere un curriculum vitae (guida 2026)' },
      { href: '/it/blog/how-to-write-ats-friendly-resume', label: 'Come scrivere un CV ATS-friendly' },
      { href: '/it/resume-format', label: 'Guida al formato del curriculum vitae' },
      { href: '/it/blog/top-resume-mistakes-to-avoid', label: 'Errori comuni nel curriculum vitae' },
    ],
  },
  bottomCta: {
    title: 'Pronto a creare il tuo curriculum vitae?',
    description: 'Oltre 2 milioni di persone in cerca di lavoro hanno creato il loro CV professionale con il nostro creatore gratuito con IA.',
    cta: 'Crea il mio CV gratis',
    subtext: 'Gratis per sempre. Nessuna carta di credito.',
  },
};

const contentMap: Record<string, LandingPageContent> = { en, es, fr, de, ar, ja, it };

export function getContent(locale: string): LandingPageContent {
  return selectContent(contentMap, locale);
}
