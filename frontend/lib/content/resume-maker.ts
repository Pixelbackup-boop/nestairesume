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

const ko: LandingPageContent = {
  meta: {
    title: '무료 이력서 만들기 | AI 이력서 작성 도구 2026',
    description: '무료 AI 이력서 만들기 도구로 프로페셔널한 이력서를 몇 분 만에 작성하세요. ATS 통과 이력서 템플릿, AI 이력서 작성, PDF 다운로드 무료.',
    keywords: '이력서 만들기, 이력서 작성, 이력서 제작, AI 이력서, 무료 이력서, 이력서 빌더, 이력서 쓰는 법, 이력서 템플릿 무료',
  },
  schemas: {
    breadcrumbName: '이력서 만들기',
    articleHeadline: '무료 이력서 만들기: AI 이력서 작성 도구 2026',
    articleDescription: '무료 AI 이력서 만들기 도구로 프로페셔널한 이력서를 몇 분 만에 작성. ATS 통과 이력서 템플릿, AI 작성 지원, PDF 즉시 다운로드.',
    softwareAppName: 'Best AI 이력서 만들기',
  },
  hero: {
    badge: '무료 AI 이력서 만들기',
    title: '프로페셔널한 이력서를',
    titleHighlight: '몇 분 만에 작성',
    subtitle: '무료 <strong>이력서 만들기</strong> 도구가 AI로 설득력 있는 콘텐츠 작성, ATS 최적화, 면접 기회 확대를 도와드립니다. <a href="https://www.jobscan.co/blog/fortune-500-use-applicant-tracking-systems/" target="_blank" rel="noopener noreferrer" class="text-accent-blue hover:underline">포춘 500 기업의 98%</a>가 ATS를 사용하는 지금, 최적화된 이력서는 필수입니다. 디자인 스킬 불필요.',
    ctaPrimary: '무료로 이력서 만들기',
    ctaSecondary: '템플릿 보기',
    trustBadges: ['가입 불필요', '신용카드 불필요', 'PDF 무료 다운로드'],
  },
  features: {
    title: '무료 이력서 만들기 도구가 선택받는 이유',
    subtitle: '단순한 템플릿이 아닙니다——AI 이력서 작성 도구가 더 나은 콘텐츠 작성과 ATS 통과를 도와줍니다.',
    items: [
      { feature: 'AI 작성 지원', description: 'AI가 지원 업종과 경력 수준에 맞춘 프로페셔널한 성과 기술, 경력 요약, 스킬 설명을 자동 생성합니다.' },
      { feature: 'ATS 최적화 템플릿', description: '모든 템플릿은 Workday, Taleo, Greenhouse 등 주요 ATS에서 테스트 완료. 서류 심사를 확실히 통과하세요.' },
      { feature: 'PDF 다운로드', description: '원클릭으로 PDF 다운로드. 워터마크 없음, 비용 없음——완전 무료입니다.' },
      { feature: '몇 분 만에 완성', description: '빈 페이지에서 헤매지 마세요. 가이드 플로우와 AI 제안으로 10분 이내에 완성도 높은 이력서를 작성할 수 있습니다.' },
      { feature: '실시간 ATS 점수', description: '작성하면서 ATS 점수를 실시간으로 확인. 제출 전에 최적화할 수 있습니다.' },
      { feature: '20종 이상 프로 템플릿', description: '모든 업종·경력 수준에 맞는 프로페셔널 템플릿. 전부 무료, 전부 ATS 호환.' },
    ],
    cta: '지금 바로 작성 시작',
  },
  comparison: {
    title: '본 도구 vs 다른 이력서 만들기 서비스',
    subtitle: '왜 많은 구직자가 본 무료 AI 이력서 만들기 도구를 선택하는지 확인하세요.',
    oursName: 'Best AI Resumes',
    othersName: '다른 서비스',
    rows: [
      { feature: 'AI 작성 지원', ours: '고급 AI 작성', others: '기본 또는 없음' },
      { feature: 'ATS 최적화', ours: '실시간 채점', others: '제한적 테스트' },
      { feature: '전체 템플릿 무료', ours: '20종 이상', others: '대부분 유료' },
      { feature: 'PDF 무료 다운로드', ours: '항상 무료', others: '많은 곳이 유료' },
      { feature: '가입 불필요', ours: '바로 시작', others: '보통 필요' },
      { feature: '업종 키워드', ours: 'AI 제안', others: '수동 입력만 가능' },
      { feature: '다수 이력서 작성', ours: '무제한', others: '대부분 제한' },
    ],
  },
  howItWorks: {
    title: '이력서 만들기 사용법',
    subtitle: '3단계로 합격하는 이력서를 작성하세요. AI가 어려운 작업을 대신합니다.',
    steps: [
      { step: 1, title: '템플릿 선택', description: '업종에 맞는 20종 이상의 ATS 통과 프로 템플릿에서 선택하세요.' },
      { step: 2, title: '정보 입력', description: '경력을 입력하면 AI가 개선 제안·키워드·프로페셔널 표현을 제안합니다.' },
      { step: 3, title: '다운로드 후 지원', description: 'PDF로 이력서를 내보내고 바로 지원을 시작하세요.' },
    ],
    cta: '프리미엄 이력서 만들기',
  },
  trust: {
    title: '',
    stats: [
      { value: '200만+', label: '작성된 이력서' },
      { value: '4.8', label: '사용자 평점' },
      { value: '20+', label: '무료 템플릿' },
      { value: '10분', label: '평균 작성 시간' },
    ],
  },
  templates: {
    title: '모든 직종에 맞는 프로 템플릿',
    subtitle: '크리에이티브 디자이너부터 기업 임원까지——당신의 업종에 최적화된 이력서 템플릿을 찾아보세요.',
    styles: ['소프트웨어 엔지니어', '마케팅 매니저', '간호사', '영업 팀장', '데이터 분석가', '교사', '프로젝트 매니저', '디자이너'],
    cta: '전체 템플릿 보기',
  },
  faq: {
    title: '자주 묻는 질문',
    items: [
      { question: '이 이력서 만들기 도구는 정말 무료인가요?', answer: '네! AI 이력서 만들기 도구는 100% 무료입니다. 무제한 이력서 작성, 20종 이상 프로 템플릿 접근, PDF 다운로드——신용카드도 구독도 필요 없습니다.' },
      { question: '왜 최고의 이력서 만들기 도구인가요?', answer: '일반적인 이력서 만들기와 달리, 본 도구는 AI를 활용해 프로페셔널한 성과 기술 작성, ATS 최적화, 업종 맞춤 키워드 제안을 합니다. 보기 좋을 뿐 아니라 ATS 심사도 통과하는 이력서를 만들 수 있습니다.' },
      { question: 'PDF로 무료 다운로드 가능한가요?', answer: '물론입니다. 작성한 모든 이력서를 ATS 호환 PDF로 무료 다운로드할 수 있습니다. 워터마크 없음, 추가 비용 없음.' },
      { question: '이력서 작성에 얼마나 걸리나요?', answer: '대부분의 사용자가 10분 이내에 프로페셔널한 이력서를 완성합니다. AI가 내용을 제안해 주므로, 빈 페이지에서 고민하는 시간을 지원 활동에 쓸 수 있습니다.' },
      { question: '작성한 이력서는 ATS 호환인가요?', answer: '네. 모든 템플릿은 주요 ATS(Workday, Taleo, Greenhouse, Lever)에서 테스트 완료입니다. 실시간 ATS 점수로 제출 전 최적화할 수 있습니다.' },
      { question: '여러 직무에 맞춰 다수의 이력서를 만들 수 있나요?', answer: '네! 필요한 만큼 맞춤 이력서를 작성할 수 있습니다. 직무별로 이력서를 최적화하면 합격률이 높아지며, 본 도구를 사용하면 빠르고 쉽게 가능합니다.' },
    ],
  },
  crossLinks: {
    title: '관련 이력서 도구',
    items: [
      { href: '/ko/resume-ai', title: 'AI 이력서', subtitle: 'AI 기반 이력서 작성 도구' },
      { href: '/ko/tools/ats-checker', title: 'ATS 체커', subtitle: 'ATS 점수 테스트' },
      { href: '/ko/free-resume-builder', title: '무료 이력서 빌더', subtitle: '100% 무료 이력서 작성' },
    ],
    guidesTitle: '유용한 가이드',
    guides: [
      { href: '/ko/blog/how-to-write-a-resume', label: '이력서 쓰는 법 (2026년 가이드)' },
      { href: '/ko/blog/how-to-write-ats-friendly-resume', label: 'ATS 통과 이력서 작성법' },
      { href: '/ko/resume-format', label: '이력서 양식 가이드' },
      { href: '/ko/blog/top-resume-mistakes-to-avoid', label: '이력서 작성 시 흔한 실수' },
    ],
  },
  bottomCta: {
    title: '이력서 작성할 준비가 되셨나요?',
    description: '200만 명 이상의 구직자가 본 무료 AI 이력서 만들기 도구로 프로페셔널한 이력서를 작성했습니다.',
    cta: '무료로 이력서 만들기',
    subtext: '영구 무료. 신용카드 불필요.',
  },
};

const vi: LandingPageContent = {
  meta: {
    title: 'Công Cụ Tạo CV Online Miễn Phí | Tạo CV Bằng AI 2026',
    description: 'Tạo CV xin việc chuyên nghiệp trong vài phút với công cụ tạo CV miễn phí bằng AI. Mẫu CV thân thiện ATS, viết bằng AI và tải PDF ngay lập tức.',
    keywords: 'tạo cv online, tạo cv miễn phí, công cụ tạo cv, mẫu cv xin việc, tạo cv bằng ai, cv maker, cv online miễn phí, tạo cv tự động',
  },
  schemas: {
    breadcrumbName: 'Công Cụ Tạo CV',
    articleHeadline: 'Công Cụ Tạo CV Online Miễn Phí: Tạo CV Bằng AI 2026',
    articleDescription: 'Tạo CV xin việc chuyên nghiệp trong vài phút với công cụ tạo CV miễn phí bằng AI. Mẫu ATS, viết bằng AI và tải PDF ngay.',
    softwareAppName: 'Best AI Công Cụ Tạo CV',
  },
  hero: {
    badge: 'Công Cụ Tạo CV Bằng AI Miễn Phí',
    title: 'Tạo CV xin việc',
    titleHighlight: 'chuyên nghiệp trong vài phút',
    subtitle: '<strong>Công cụ tạo CV</strong> miễn phí của chúng tôi sử dụng AI để viết nội dung ấn tượng, tối ưu ATS và giúp bạn được gọi phỏng vấn nhiều hơn. Với <a href="https://www.jobscan.co/blog/fortune-500-use-applicant-tracking-systems/" target="_blank" rel="noopener noreferrer" class="text-accent-blue hover:underline">98% doanh nghiệp lớn</a> sử dụng phần mềm ATS, CV tối ưu là điều thiết yếu. Không cần kỹ năng thiết kế.',
    ctaPrimary: 'Tạo CV miễn phí',
    ctaSecondary: 'Xem mẫu CV',
    trustBadges: ['Không cần đăng ký', 'Không cần thẻ tín dụng', 'Tải PDF miễn phí'],
  },
  features: {
    title: 'Tại sao chọn công cụ tạo CV miễn phí của chúng tôi?',
    subtitle: 'Không chỉ là mẫu — công cụ tạo CV bằng AI giúp bạn viết nội dung tốt hơn và vượt qua sàng lọc ATS.',
    items: [
      { feature: 'Viết CV bằng AI', description: 'AI tự động tạo kinh nghiệm làm việc, tóm tắt chuyên môn và mô tả kỹ năng phù hợp với ngành nghề và cấp bậc của bạn.' },
      { feature: 'Mẫu tối ưu ATS', description: 'Tất cả mẫu được kiểm tra với hệ thống ATS phổ biến như Workday, Taleo, Greenhouse. Tự tin vượt qua sàng lọc tự động.' },
      { feature: 'Tải PDF', description: 'Tải CV dạng PDF chỉ với một cú nhấp. Không watermark, không phí — hoàn toàn miễn phí.' },
      { feature: 'Hoàn thành trong vài phút', description: 'Không cần nhìn trang trống. Quy trình hướng dẫn và gợi ý AI giúp bạn hoàn thành CV chuyên nghiệp dưới 10 phút.' },
      { feature: 'Điểm ATS thời gian thực', description: 'Xem điểm ATS trực tiếp khi viết. Tối ưu trước khi ứng tuyển.' },
      { feature: '20+ mẫu chuyên nghiệp', description: 'Mẫu cho mọi ngành nghề và cấp bậc. Tất cả miễn phí, tất cả thân thiện ATS.' },
    ],
    cta: 'Bắt đầu tạo CV',
  },
  comparison: {
    title: 'Công cụ của chúng tôi vs các công cụ tạo CV khác',
    subtitle: 'Tìm hiểu tại sao người tìm việc chọn công cụ tạo CV miễn phí bằng AI của chúng tôi.',
    oursName: 'Best AI Resumes',
    othersName: 'Công cụ khác',
    rows: [
      { feature: 'Viết bằng AI', ours: 'AI nâng cao', others: 'Cơ bản hoặc không có' },
      { feature: 'Tối ưu ATS', ours: 'Chấm điểm thời gian thực', others: 'Kiểm tra hạn chế' },
      { feature: 'Tất cả mẫu miễn phí', ours: '20+', others: 'Hầu hết trả phí' },
      { feature: 'Tải PDF miễn phí', ours: 'Luôn miễn phí', others: 'Nhiều nơi tính phí' },
      { feature: 'Không cần đăng ký', ours: 'Bắt đầu ngay', others: 'Thường bắt buộc' },
      { feature: 'Từ khóa ngành', ours: 'AI gợi ý', others: 'Chỉ nhập thủ công' },
      { feature: 'Nhiều phiên bản CV', ours: 'Không giới hạn', others: 'Thường bị giới hạn' },
    ],
  },
  howItWorks: {
    title: 'Cách sử dụng công cụ tạo CV',
    subtitle: '3 bước đơn giản để tạo CV chinh phục nhà tuyển dụng. AI lo phần khó.',
    steps: [
      { step: 1, title: 'Chọn mẫu', description: 'Chọn từ 20+ mẫu chuyên nghiệp thân thiện ATS phù hợp với ngành của bạn.' },
      { step: 2, title: 'Nhập thông tin', description: 'Thêm kinh nghiệm và để AI gợi ý cải thiện, từ khóa và cách diễn đạt chuyên nghiệp.' },
      { step: 3, title: 'Tải về và ứng tuyển', description: 'Xuất CV dạng PDF và bắt đầu ứng tuyển ngay.' },
    ],
    cta: 'Tạo CV chuyên nghiệp',
  },
  trust: {
    title: '',
    stats: [
      { value: '2M+', label: 'CV đã tạo' },
      { value: '4.8', label: 'Đánh giá người dùng' },
      { value: '20+', label: 'Mẫu miễn phí' },
      { value: '10 phút', label: 'Thời gian trung bình' },
    ],
  },
  templates: {
    title: 'Mẫu chuyên nghiệp cho mọi ngành nghề',
    subtitle: 'Từ nhà thiết kế sáng tạo đến giám đốc doanh nghiệp — tìm mẫu CV hoàn hảo cho ngành của bạn.',
    styles: ['Kỹ sư phần mềm', 'Marketing Manager', 'Y tá', 'Trưởng phòng kinh doanh', 'Data Analyst', 'Giáo viên', 'Project Manager', 'Designer'],
    cta: 'Xem tất cả mẫu',
  },
  faq: {
    title: 'Câu hỏi thường gặp',
    items: [
      { question: 'Công cụ tạo CV này thực sự miễn phí?', answer: 'Đúng vậy! Công cụ tạo CV bằng AI 100% miễn phí. Tạo CV không giới hạn, truy cập toàn bộ 20+ mẫu, tải PDF — không cần thẻ tín dụng hay đăng ký gói dịch vụ.' },
      { question: 'Tại sao đây là công cụ tạo CV tốt nhất?', answer: 'Khác với các công cụ tạo CV thông thường, chúng tôi sử dụng AI để viết kinh nghiệm làm việc chuyên nghiệp, tối ưu ATS và gợi ý từ khóa theo ngành. Bạn tạo được CV vừa đẹp vừa vượt qua sàng lọc ATS.' },
      { question: 'Tôi có thể tải CV dạng PDF miễn phí không?', answer: 'Tất nhiên. Tất cả CV đều có thể tải miễn phí dạng PDF thân thiện ATS. Không watermark, không phí phụ.' },
      { question: 'Tạo CV mất bao lâu?', answer: 'Hầu hết người dùng hoàn thành CV chuyên nghiệp trong dưới 10 phút. AI gợi ý nội dung nên bạn tiết kiệm thời gian cho việc ứng tuyển.' },
      { question: 'CV tạo ra có tương thích ATS không?', answer: 'Có. Tất cả mẫu đều được kiểm tra với hệ thống ATS phổ biến (Workday, Taleo, Greenhouse, Lever). Điểm ATS thời gian thực giúp bạn tối ưu trước khi ứng tuyển.' },
      { question: 'Tôi có thể tạo nhiều CV cho các vị trí khác nhau không?', answer: 'Có! Tạo bao nhiêu CV tùy chỉnh tùy thích. Tối ưu CV cho từng vị trí tăng cơ hội thành công, và với công cụ của chúng tôi rất nhanh và dễ dàng.' },
    ],
  },
  crossLinks: {
    title: 'Công cụ CV liên quan',
    items: [
      { href: '/vi/resume-ai', title: 'CV Bằng AI', subtitle: 'Công cụ tạo CV bằng AI' },
      { href: '/vi/tools/ats-checker', title: 'Kiểm Tra ATS', subtitle: 'Kiểm tra điểm ATS' },
      { href: '/vi/free-resume-builder', title: 'CV Miễn Phí', subtitle: 'Tạo CV 100% miễn phí' },
    ],
    guidesTitle: 'Hướng dẫn hữu ích',
    guides: [
      { href: '/vi/blog/cach-viet-cv-xin-viec', label: 'Cách viết CV xin việc (hướng dẫn 2026)' },
      { href: '/vi/blog/cv-than-thien-ats', label: 'Cách viết CV thân thiện ATS' },
      { href: '/vi/resume-format', label: 'Hướng dẫn định dạng CV' },
      { href: '/vi/blog/loi-pho-bien-trong-cv', label: 'Lỗi phổ biến trong CV' },
    ],
  },
  bottomCta: {
    title: 'Sẵn sàng tạo CV xin việc?',
    description: 'Hơn 2 triệu người tìm việc đã tạo CV chuyên nghiệp với công cụ miễn phí bằng AI của chúng tôi.',
    cta: 'Tạo CV miễn phí',
    subtext: 'Miễn phí mãi mãi. Không cần thẻ tín dụng.',
  },
};

const th: LandingPageContent = {
  meta: {
    title: 'สร้างเรซูเม่ออนไลน์ | เครื่องมือทำเรซูเม่ AI 2026',
    description: 'สร้างเรซูเม่ออนไลน์ฟรีด้วย AI ช่วยเขียน เทมเพลต ATS กว่า 20 แบบ ดาวน์โหลด PDF ทันที เรซูเม่สมัครงานพร้อมใช้ใน 10 นาที',
    keywords: 'สร้างเรซูเม่ออนไลน์, สร้างเรซูเม่, ทำเรซูเม่, เรซูเม่ AI, เรซูเม่ฟรี, เรซูเม่สมัครงาน, เทมเพลตเรซูเม่, ประวัติย่อออนไลน์',
  },
  schemas: {
    breadcrumbName: 'สร้างเรซูเม่ออนไลน์',
    articleHeadline: 'สร้างเรซูเม่ออนไลน์ฟรี: เครื่องมือทำเรซูเม่ AI 2026',
    articleDescription: 'สร้างเรซูเม่สมัครงานออนไลน์ฟรีภายในไม่กี่นาที เทมเพลต ATS พร้อม AI ช่วยเขียน ดาวน์โหลด PDF ฟรี',
    softwareAppName: 'Best AI เครื่องมือสร้างเรซูเม่',
  },
  hero: {
    badge: 'สร้างเรซูเม่ออนไลน์ฟรีด้วย AI',
    title: 'สร้างเรซูเม่มืออาชีพ',
    titleHighlight: 'เสร็จภายในไม่กี่นาที',
    subtitle: 'เครื่องมือ<strong>สร้างเรซูเม่ออนไลน์</strong>ฟรีของเราใช้ AI ช่วยเขียนเนื้อหาที่น่าสนใจ ปรับให้เหมาะกับระบบ ATS และเพิ่มโอกาสได้สัมภาษณ์ เมื่อ <a href="https://www.jobscan.co/blog/fortune-500-use-applicant-tracking-systems/" target="_blank" rel="noopener noreferrer" class="text-accent-blue hover:underline">98% ของบริษัทชั้นนำ</a>ใช้ระบบ ATS คัดกรอง การมีเรซูเม่ที่ปรับแต่งมาอย่างดีจึงสำคัญมาก ไม่ต้องมีทักษะออกแบบ',
    ctaPrimary: 'สร้างเรซูเม่ฟรี',
    ctaSecondary: 'ดูเทมเพลต',
    trustBadges: ['ไม่ต้องสมัครสมาชิก', 'ไม่ต้องใช้บัตรเครดิต', 'ดาวน์โหลด PDF ฟรี'],
  },
  features: {
    title: 'ทำไมต้องเลือกเครื่องมือสร้างเรซูเม่ฟรีของเรา?',
    subtitle: 'มากกว่าแค่เทมเพลต — AI ช่วยเขียนเนื้อหาที่ดีขึ้นและผ่านการคัดกรอง ATS',
    items: [
      { feature: 'AI ช่วยเขียน', description: 'AI เขียนประสบการณ์ทำงาน สรุปตัวเอง และคำอธิบายทักษะที่ตรงกับสายงานและประสบการณ์ของคุณ' },
      { feature: 'เทมเพลต ATS', description: 'ทุกเทมเพลตผ่านการทดสอบกับระบบ ATS หลัก เช่น Workday, Taleo และ Greenhouse เรซูเม่ของคุณจะผ่านการคัดกรอง' },
      { feature: 'ดาวน์โหลด PDF ทันที', description: 'ดาวน์โหลดเรซูเม่เป็น PDF คลิกเดียว ไม่มีลายน้ำ ไม่เสียเงิน — ฟรีทั้งหมด' },
      { feature: 'เสร็จภายไม่กี่นาที', description: 'ไม่ต้องเริ่มจากหน้าว่าง ระบบแนะนำและ AI ช่วยให้คุณสร้างเรซูเม่เสร็จภายใน 10 นาที' },
      { feature: 'คะแนน ATS เรียลไทม์', description: 'ดูคะแนน ATS ของเรซูเม่ขณะพิมพ์ ปรับแต่งก่อนส่งสมัครงาน' },
      { feature: 'เทมเพลตมืออาชีพ 20+ แบบ', description: 'เทมเพลตสำหรับทุกสายงานและระดับประสบการณ์ ฟรีทั้งหมด รองรับ ATS ทั้งหมด' },
    ],
    cta: 'เริ่มสร้างเลย',
  },
  comparison: {
    title: 'เครื่องมือของเรา vs. คู่แข่ง',
    subtitle: 'ดูว่าทำไมผู้หางานเลือกเครื่องมือสร้างเรซูเม่ออนไลน์ฟรีของเรา',
    oursName: 'Best AI Resumes',
    othersName: 'เครื่องมืออื่น',
    rows: [
      { feature: 'AI ช่วยเขียน', ours: 'AI ช่วยเต็มรูปแบบ', others: 'พื้นฐานหรือไม่มี' },
      { feature: 'ระบบ ATS', ours: 'ให้คะแนนเรียลไทม์', others: 'จำกัดหรือไม่มี' },
      { feature: 'เทมเพลตฟรีทั้งหมด', ours: 'กว่า 20 แบบ', others: 'ส่วนใหญ่เสียเงิน' },
      { feature: 'ดาวน์โหลด PDF ฟรี', ours: 'ฟรีเสมอ', others: 'มักเก็บเงิน' },
      { feature: 'ไม่ต้องสมัครสมาชิก', ours: 'เริ่มได้เลย', others: 'มักบังคับสมัคร' },
      { feature: 'คีย์เวิร์ดตามสายงาน', ours: 'AI แนะนำ', others: 'ต้องทำเอง' },
      { feature: 'สร้างได้หลายฉบับ', ours: 'ไม่จำกัด', others: 'มักจำกัด' },
    ],
  },
  howItWorks: {
    title: 'วิธีสร้างเรซูเม่ออนไลน์',
    subtitle: 'สร้างเรซูเม่สมัครงานใน 3 ขั้นตอนง่ายๆ AI ช่วยทำงานหนักแทนคุณ',
    steps: [
      { step: 1, title: 'เลือกเทมเพลต', description: 'เลือกจากเทมเพลตมืออาชีพที่ผ่านการทดสอบ ATS กว่า 20 แบบ' },
      { step: 2, title: 'กรอกข้อมูล', description: 'กรอกประสบการณ์ แล้ว AI จะแนะนำการปรับปรุง คีย์เวิร์ด และสำนวนมืออาชีพ' },
      { step: 3, title: 'ดาวน์โหลดและสมัครงาน', description: 'ส่งออกเรซูเม่เป็น PDF แล้วเริ่มสมัครงานได้ทันที' },
    ],
    cta: 'สร้างเรซูเม่มืออาชีพ',
  },
  trust: {
    title: '',
    stats: [
      { value: '2 ล้าน+', label: 'เรซูเม่ที่สร้างแล้ว' },
      { value: '4.8', label: 'คะแนนผู้ใช้' },
      { value: '20+', label: 'เทมเพลตฟรี' },
      { value: '10 นาที', label: 'เวลาสร้างเฉลี่ย' },
    ],
  },
  templates: {
    title: 'เทมเพลตมืออาชีพสำหรับทุกสายงาน',
    subtitle: 'ตั้งแต่นักออกแบบสร้างสรรค์ไปจนถึงผู้บริหาร — หาเทมเพลตเรซูเม่ที่เหมาะกับสายงานของคุณ',
    styles: ['วิศวกรซอฟต์แวร์', 'ผู้จัดการการตลาด', 'พยาบาล', 'ผู้บริหารฝ่ายขาย', 'นักวิเคราะห์ข้อมูล', 'ครู', 'ผู้จัดการโครงการ', 'นักออกแบบ'],
    cta: 'ดูเทมเพลตทั้งหมด',
  },
  faq: {
    title: 'คำถามที่พบบ่อย',
    items: [
      { question: 'เครื่องมือสร้างเรซูเม่นี้ฟรีจริงหรือ?', answer: 'ใช่! เครื่องมือสร้างเรซูเม่ออนไลน์ด้วย AI ของเราฟรี 100% สร้างเรซูเม่ไม่จำกัด ใช้เทมเพลตกว่า 20 แบบ และดาวน์โหลด PDF ได้ — ไม่ต้องใช้บัตรเครดิตหรือสมัครสมาชิก' },
      { question: 'อะไรที่ทำให้เครื่องมือนี้ดีที่สุด?', answer: 'ต่างจากเครื่องมือทั่วไป เราใช้ AI ช่วยเขียนประสบการณ์ทำงานอย่างมืออาชีพ ปรับเนื้อหาให้ผ่าน ATS และแนะนำคีย์เวิร์ดตามสายงาน ได้เรซูเม่ที่ทั้งสวยและผ่านระบบคัดกรองอัตโนมัติ' },
      { question: 'ดาวน์โหลดเป็น PDF ได้ฟรีไหม?', answer: 'แน่นอน ดาวน์โหลดเรซูเม่ทุกฉบับเป็น PDF ที่ผ่าน ATS ได้ฟรี ไม่มีลายน้ำ ไม่มีค่าใช้จ่ายเพิ่มเติม' },
      { question: 'ใช้เวลาสร้างเรซูเม่นานเท่าไหร่?', answer: 'ผู้ใช้ส่วนใหญ่สร้างเรซูเม่มืออาชีพเสร็จภายใน 10 นาที AI ช่วยแนะนำเนื้อหา ทำให้คุณไม่ต้องเสียเวลาคิดเองหมดตั้งแต่ต้น' },
      { question: 'เรซูเม่ที่สร้างรองรับ ATS ไหม?', answer: 'ใช่ ทุกเทมเพลตในเครื่องมือของเราผ่านการทดสอบกับระบบ ATS หลัก (Workday, Taleo, Greenhouse, Lever) คะแนน ATS เรียลไทม์ช่วยคุณปรับเรซูเม่ก่อนส่ง' },
      { question: 'สร้างเรซูเม่หลายฉบับสำหรับงานต่างๆ ได้ไหม?', answer: 'ได้! สร้างเรซูเม่ปรับแต่งได้ไม่จำกัด ผู้หางานหลายคนปรับเรซูเม่ให้ตรงกับแต่ละตำแหน่ง — เครื่องมือของเราทำให้เร็วและง่าย' },
    ],
  },
  crossLinks: {
    title: 'เครื่องมือเรซูเม่ที่เกี่ยวข้อง',
    items: [
      { href: '/th/resume-ai', title: 'เรซูเม่ AI', subtitle: 'เครื่องมือเรซูเม่ด้วย AI' },
      { href: '/th/tools/ats-checker', title: 'ตรวจ ATS', subtitle: 'ทดสอบคะแนน ATS' },
      { href: '/th/free-resume-builder', title: 'สร้างเรซูเม่ฟรี', subtitle: 'ฟรี 100%' },
    ],
    guidesTitle: 'คู่มือที่มีประโยชน์',
    guides: [
      { href: '/th/blog/how-to-write-a-resume', label: 'วิธีเขียนเรซูเม่ (คู่มือ 2026)' },
      { href: '/th/blog/how-to-write-ats-friendly-resume', label: 'วิธีเขียนเรซูเม่ให้ผ่าน ATS' },
      { href: '/th/resume-format', label: 'คู่มือรูปแบบเรซูเม่' },
      { href: '/th/blog/top-resume-mistakes-to-avoid', label: 'ข้อผิดพลาดในเรซูเม่ที่พบบ่อย' },
    ],
  },
  bottomCta: {
    title: 'พร้อมสร้างเรซูเม่แล้วหรือยัง?',
    description: 'ผู้หางานกว่า 2 ล้านคนสร้างเรซูเม่มืออาชีพด้วยเครื่องมือสร้างเรซูเม่ออนไลน์ฟรีของเราแล้ว',
    cta: 'สร้างเรซูเม่ฟรี',
    subtext: 'ฟรีตลอดไป ไม่ต้องใช้บัตรเครดิต',
  },
};

const pt: LandingPageContent = {
  meta: {
    title: 'Criador de Curriculo Gratis | Fazer Curriculo Online com IA 2026',
    description: 'Crie um curriculo profissional em minutos com nosso criador de curriculo gratuito com IA. Modelos ATS, escrita com IA e download PDF instantaneo.',
    keywords: 'criador de curriculo, fazer curriculo online, criar curriculo, criador curriculo gratis, modelo de curriculo, curriculo online gratis, gerador de curriculo automatico',
  },
  schemas: {
    breadcrumbName: 'Criador de Curriculo',
    articleHeadline: 'Criador de Curriculo Gratis: Fazer Curriculo Online com IA 2026',
    articleDescription: 'Crie curriculos profissionais em minutos com nosso criador de curriculo gratuito com IA. Modelos ATS, escrita com IA e download PDF instantaneo.',
    softwareAppName: 'Best AI Criador de Curriculo',
  },
  hero: {
    badge: 'Criador de Curriculo com IA Gratis',
    title: 'Crie seu curriculo',
    titleHighlight: 'profissional em minutos',
    subtitle: 'Nosso <strong>criador de curriculo</strong> gratuito usa IA para escrever conteudo eficaz, otimizar para ATS e ajudar a conseguir mais entrevistas. Com o <a href="https://www.jobscan.co/blog/fortune-500-use-applicant-tracking-systems/" target="_blank" rel="noopener noreferrer" class="text-accent-blue hover:underline">98% das grandes empresas</a> usando software ATS, ter um curriculo otimizado e essencial. Nenhuma habilidade de design necessaria.',
    ctaPrimary: 'Criar meu curriculo gratis',
    ctaSecondary: 'Ver modelos',
    trustBadges: ['Sem cadastro', 'Sem cartao de credito', 'Download PDF gratis'],
  },
  features: {
    title: 'Por que escolher nosso criador de curriculo gratis?',
    subtitle: 'Mais do que um simples modelo — nosso criador com IA ajuda a escrever conteudo melhor e superar a triagem ATS.',
    items: [
      { feature: 'Escrita assistida por IA', description: 'A IA gera automaticamente experiencias profissionais, resumos e descricoes de habilidades adaptados ao seu setor e nivel de experiencia.' },
      { feature: 'Modelos otimizados para ATS', description: 'Todos os modelos sao testados com os principais sistemas ATS como Workday, Taleo, Greenhouse. Passe pela triagem automatica com confianca.' },
      { feature: 'Download PDF', description: 'Baixe seu curriculo em PDF com um clique. Sem marca d\'agua, sem custo — completamente gratis.' },
      { feature: 'Pronto em minutos', description: 'Sem paginas em branco. O fluxo guiado e as sugestoes da IA permitem criar um curriculo profissional em menos de 10 minutos.' },
      { feature: 'Pontuacao ATS em tempo real', description: 'Veja a pontuacao ATS do seu curriculo em tempo real enquanto escreve. Otimize antes de se candidatar.' },
      { feature: '20+ modelos profissionais', description: 'Modelos para cada setor e nivel de carreira. Todos gratis, todos ATS.' },
    ],
    cta: 'Comecar a criar meu curriculo',
  },
  comparison: {
    title: 'Nosso criador vs outros criadores de curriculo',
    subtitle: 'Descubra por que os candidatos escolhem nosso criador de curriculo gratuito com IA.',
    oursName: 'Best AI Resumes',
    othersName: 'Outros criadores',
    rows: [
      { feature: 'Escrita com IA', ours: 'IA avancada', others: 'Basica ou ausente' },
      { feature: 'Otimizacao ATS', ours: 'Pontuacao em tempo real', others: 'Testes limitados' },
      { feature: 'Todos os modelos gratis', ours: '20+', others: 'A maioria paga' },
      { feature: 'Download PDF gratis', ours: 'Sempre gratis', others: 'Muitos pagos' },
      { feature: 'Sem conta', ours: 'Inicio imediato', others: 'Geralmente necessaria' },
      { feature: 'Palavras-chave do setor', ours: 'Sugeridas pela IA', others: 'Apenas manual' },
      { feature: 'Versoes multiplas', ours: 'Ilimitadas', others: 'Frequentemente limitadas' },
    ],
  },
  howItWorks: {
    title: 'Como usar o criador de curriculo',
    subtitle: 'Em 3 simples passos crie um curriculo que conquista recrutadores. A IA faz o trabalho pesado.',
    steps: [
      { step: 1, title: 'Escolha um modelo', description: 'Selecione entre 20+ modelos profissionais ATS adequados ao seu setor.' },
      { step: 2, title: 'Insira as informacoes', description: 'Adicione suas experiencias e deixe a IA sugerir melhorias, palavras-chave e expressoes profissionais.' },
      { step: 3, title: 'Baixe e candidate-se', description: 'Exporte seu curriculo em PDF e comece a se candidatar imediatamente.' },
    ],
    cta: 'Criar curriculo profissional',
  },
  trust: {
    title: '',
    stats: [
      { value: '2M+', label: 'Curriculos criados' },
      { value: '4.8', label: 'Avaliacao dos usuarios' },
      { value: '20+', label: 'Modelos gratis' },
      { value: '10 min', label: 'Tempo medio de criacao' },
    ],
  },
  templates: {
    title: 'Modelos profissionais para cada setor',
    subtitle: 'Do designer criativo ao executivo — encontre o modelo de curriculo perfeito para sua area.',
    styles: ['Engenheiro de software', 'Gerente de marketing', 'Enfermeiro', 'Gerente de vendas', 'Analista de dados', 'Professor', 'Gerente de projetos', 'Designer'],
    cta: 'Ver todos os modelos',
  },
  faq: {
    title: 'Perguntas frequentes',
    items: [
      { question: 'Este criador de curriculo e realmente gratis?', answer: 'Sim! Nosso criador de curriculo com IA e 100% gratuito. Crie curriculos ilimitados, acesse todos os 20+ modelos profissionais, baixe em PDF — sem cartao de credito nem assinatura.' },
      { question: 'Por que e o melhor criador de curriculo?', answer: 'Ao contrario dos criadores de curriculo genericos, o nosso usa IA para gerar experiencias profissionais, otimizar para ATS e sugerir palavras-chave especificas do seu setor. Voce cria um curriculo que e visualmente atraente e eficaz na triagem automatica.' },
      { question: 'Posso baixar o curriculo em PDF gratis?', answer: 'Claro. Todos os curriculos criados podem ser baixados gratuitamente em PDF. Sem marca d\'agua, sem custo adicional.' },
      { question: 'Quanto tempo leva para criar um curriculo?', answer: 'A maioria dos usuarios completa um curriculo profissional em menos de 10 minutos. A IA sugere o conteudo, entao voce pode dedicar o tempo economizado as candidaturas.' },
      { question: 'Os curriculos criados sao compativeis com ATS?', answer: 'Sim. Todos os modelos sao testados com os principais sistemas ATS (Workday, Taleo, Greenhouse, Lever). A pontuacao ATS em tempo real ajuda a otimizar o curriculo antes de se candidatar.' },
      { question: 'Posso criar varios curriculos para diferentes candidaturas?', answer: 'Sim! Voce pode criar quantos curriculos personalizados quiser. Otimizar o curriculo para cada vaga aumenta suas chances, e com nossa ferramenta e rapido e simples.' },
    ],
  },
  crossLinks: {
    title: 'Ferramentas relacionadas para curriculo',
    items: [
      { href: '/pt/resume-ai', title: 'Curriculo com IA', subtitle: 'Criador de curriculo com inteligencia artificial' },
      { href: '/pt/tools/ats-checker', title: 'Verificador ATS', subtitle: 'Teste sua pontuacao ATS' },
      { href: '/pt/free-resume-builder', title: 'Curriculo gratis', subtitle: 'Criador de curriculo 100% gratis' },
    ],
    guidesTitle: 'Guias uteis',
    guides: [
      { href: '/pt/blog/how-to-write-a-resume', label: 'Como fazer um curriculo (guia 2026)' },
      { href: '/pt/blog/how-to-write-ats-friendly-resume', label: 'Como fazer um curriculo ATS' },
      { href: '/pt/resume-format', label: 'Guia de formato de curriculo' },
      { href: '/pt/blog/top-resume-mistakes-to-avoid', label: 'Erros comuns no curriculo' },
    ],
  },
  bottomCta: {
    title: 'Pronto para criar seu curriculo?',
    description: 'Mais de 2 milhoes de candidatos criaram seu curriculo profissional com nosso criador gratuito com IA.',
    cta: 'Criar meu curriculo gratis',
    subtext: 'Gratis para sempre. Sem cartao de credito.',
  },
};

const tr: LandingPageContent = {
  meta: {
    title: 'CV Oluşturucu | AI ile Online CV Yap 2026',
    description: 'AI destekli ücretsiz CV oluşturucumuzla dakikalar içinde profesyonel CV hazırlayın. ATS şablonları, AI yazımı ve anında PDF indirme.',
    keywords: 'cv oluşturucu, online cv yap, cv hazırla, ücretsiz cv oluşturucu, cv şablonu, ücretsiz online özgeçmiş, otomatik cv oluşturucu',
  },
  schemas: {
    breadcrumbName: 'CV Oluşturucu',
    articleHeadline: 'Ücretsiz CV Oluşturucu: AI ile Online CV Yap 2026',
    articleDescription: 'Dakikalar içinde AI ile profesyonel CV oluşturun. ATS şablonları, AI yazımı ve anında PDF indirme.',
    softwareAppName: 'Best AI CV Oluşturucu',
  },
  hero: {
    badge: 'AI ile Ücretsiz CV Oluşturucu',
    title: 'Profesyonel CV\'nizi',
    titleHighlight: 'dakikalar içinde oluşturun',
    subtitle: '<strong>CV oluşturucumuz</strong>, etkili içerik yazmak, ATS için optimize etmek ve daha fazla mülakat almaya yardımcı olmak için AI kullanıyor. <a href="https://www.jobscan.co/blog/fortune-500-use-applicant-tracking-systems/" target="_blank" rel="noopener noreferrer" class="text-accent-blue hover:underline">Büyük şirketlerin %98\'i</a> ATS yazılımı kullanıyor — optimize edilmiş bir CV şart. Tasarım becerisi gerekmez.',
    ctaPrimary: 'Ücretsiz CV\'mi oluştur',
    ctaSecondary: 'Şablonları gör',
    trustBadges: ['Kayıt gerekmez', 'Kredi kartı gerekmez', 'Ücretsiz PDF indirme'],
  },
  features: {
    title: 'Neden ücretsiz CV oluşturucumuzu seçmelisiniz?',
    subtitle: 'Basit bir şablondan fazlası — AI oluşturucumuz daha iyi içerik yazmanıza ve ATS taramasını geçmenize yardımcı olur.',
    items: [
      { feature: 'AI destekli yazım', description: 'AI, sektörünüze ve deneyim seviyenize göre uyarlanmış profesyonel deneyimler, özetler ve beceri açıklamaları otomatik olarak oluşturur.' },
      { feature: 'ATS için optimize şablonlar', description: 'Tüm şablonlar Workday, Taleo, Greenhouse gibi önde gelen ATS sistemleriyle test edilmiştir. Otomatik taramadan güvenle geçin.' },
      { feature: 'PDF indirme', description: 'CV\'nizi tek tıklamayla PDF olarak indirin. Filigran yok, maliyet yok — tamamen ücretsiz.' },
      { feature: 'Dakikalar içinde hazır', description: 'Boş sayfayla uğraşmak yok. Rehberli akış ve AI önerileri, 10 dakikadan kısa sürede profesyonel CV oluşturmanızı sağlar.' },
      { feature: 'Gerçek zamanlı ATS puanlama', description: 'CV\'nizin yazarken ATS puanını gerçek zamanlı görün. Başvurmadan önce optimize edin.' },
      { feature: '20\'den fazla profesyonel şablon', description: 'Her sektör ve kariyer seviyesi için şablonlar. Hepsi ücretsiz, hepsi ATS uyumlu.' },
    ],
    cta: 'CV oluşturmaya başla',
  },
  comparison: {
    title: 'Bizim oluşturucu vs. diğer CV oluşturucular',
    subtitle: 'Adayların neden ücretsiz AI CV oluşturucumuzu tercih ettiğini keşfedin.',
    oursName: 'Best AI Resumes',
    othersName: 'Diğer oluşturucular',
    rows: [
      { feature: 'AI yazımı', ours: 'Gelişmiş AI', others: 'Temel veya yok' },
      { feature: 'ATS optimizasyonu', ours: 'Gerçek zamanlı puanlama', others: 'Sınırlı test' },
      { feature: 'Tüm şablonlar ücretsiz', ours: '20\'den fazla', others: 'Çoğu ücretli' },
      { feature: 'Ücretsiz PDF indirme', ours: 'Her zaman ücretsiz', others: 'Birçoğu ücretli' },
      { feature: 'Hesapsız başlangıç', ours: 'Anında başla', others: 'Genellikle gerekli' },
      { feature: 'Sektör anahtar kelimeleri', ours: 'AI tarafından önerilir', others: 'Yalnızca manuel' },
      { feature: 'Çoklu sürümler', ours: 'Sınırsız', others: 'Çoğunlukla sınırlı' },
    ],
  },
  howItWorks: {
    title: 'CV oluşturucu nasıl kullanılır',
    subtitle: '3 basit adımda işe alım uzmanlarını etkileyen CV oluşturun. AI ağır işi halleder.',
    steps: [
      { step: 1, title: 'Şablon seçin', description: 'Sektörünüze uygun 20\'den fazla profesyonel ATS şablonu arasından seçin.' },
      { step: 2, title: 'Bilgilerinizi girin', description: 'Deneyimlerinizi ekleyin ve AI\'nın iyileştirmeler, anahtar kelimeler ve profesyonel ifadeler önermesine izin verin.' },
      { step: 3, title: 'İndirin ve başvurun', description: 'CV\'nizi PDF olarak dışa aktarın ve hemen başvurmaya başlayın.' },
    ],
    cta: 'Profesyonel CV oluştur',
  },
  trust: {
    title: '',
    stats: [
      { value: '2M+', label: 'Oluşturulan CV' },
      { value: '4.8', label: 'Kullanıcı puanı' },
      { value: '20+', label: 'Ücretsiz şablon' },
      { value: '10 dk', label: 'Ortalama oluşturma süresi' },
    ],
  },
  templates: {
    title: 'Her sektör için profesyonel şablonlar',
    subtitle: 'Yaratıcı tasarımcıdan yöneticiye — alanınız için mükemmel CV şablonunu bulun.',
    styles: ['Yazılım Mühendisi', 'Pazarlama Müdürü', 'Hemşire', 'Satış Müdürü', 'Veri Analisti', 'Öğretmen', 'Proje Müdürü', 'Tasarımcı'],
    cta: 'Tüm şablonları gör',
  },
  faq: {
    title: 'Sık sorulan sorular',
    items: [
      { question: 'Bu CV oluşturucu gerçekten ücretsiz mi?', answer: 'Evet! AI CV oluşturucumuz %100 ücretsiz. Sınırsız CV oluşturun, 20\'den fazla profesyonel şablona erişin, PDF olarak indirin — kredi kartı veya abonelik gerekmez.' },
      { question: 'Neden bu en iyi CV oluşturucu?', answer: 'Genel CV oluşturuculardan farklı olarak, profesyonel deneyimler oluşturmak, ATS için optimize etmek ve sektörünüze özel anahtar kelimeler önermek için AI kullanıyoruz. Hem görsel açıdan çekici hem de otomatik taramada etkili bir CV oluşturuyorsunuz.' },
      { question: 'CV\'mi ücretsiz PDF olarak indirebilir miyim?', answer: 'Elbette. Oluşturulan tüm CV\'ler ücretsiz PDF olarak indirilebilir. Filigran yok, ek maliyet yok.' },
      { question: 'CV oluşturmak ne kadar sürer?', answer: 'Kullanıcıların çoğu 10 dakikadan kısa sürede profesyonel CV tamamlar. AI içerik önerir, böylece tasarruf ettiğiniz zamanı başvurulara ayırabilirsiniz.' },
      { question: 'Oluşturulan CV\'ler ATS uyumlu mu?', answer: 'Evet. Tüm şablonlar önde gelen ATS sistemleriyle (Workday, Taleo, Greenhouse, Lever) test edilmiştir. Gerçek zamanlı ATS puanlama, başvurmadan önce CV\'nizi optimize etmenize yardımcı olur.' },
      { question: 'Farklı başvurular için birden fazla CV oluşturabilir miyim?', answer: 'Evet! İstediğiniz kadar özelleştirilmiş CV oluşturabilirsiniz. Her pozisyon için CV\'nizi optimize etmek şansınızı artırır ve aracımızla bu hızlı ve kolaydır.' },
    ],
  },
  crossLinks: {
    title: 'İlgili CV araçları',
    items: [
      { href: '/tr/resume-ai', title: 'AI CV', subtitle: 'AI ile CV oluşturucu' },
      { href: '/tr/tools/ats-checker', title: 'ATS Kontrolü', subtitle: 'ATS puanınızı test edin' },
      { href: '/tr/free-resume-builder', title: 'Ücretsiz CV', subtitle: '%100 ücretsiz oluşturucu' },
    ],
    guidesTitle: 'Faydalı kılavuzlar',
    guides: [
      { href: '/tr/blog/how-to-write-a-resume', label: 'CV nasıl yazılır (2026 kılavuzu)' },
      { href: '/tr/career-tips/how-to-write-ats-friendly-resume', label: 'ATS uyumlu CV nasıl yazılır' },
      { href: '/tr/resume-format', label: 'CV format rehberi' },
      { href: '/tr/blog/top-resume-mistakes-to-avoid', label: 'CV\'de yapılan yaygın hatalar' },
    ],
  },
  bottomCta: {
    title: 'CV\'nizi oluşturmaya hazır mısınız?',
    description: '2 milyondan fazla iş arayan, ücretsiz AI CV oluşturucumuzla profesyonel CV hazırladı.',
    cta: 'Ücretsiz CV\'mi oluştur',
    subtext: 'Sonsuza kadar ücretsiz. Kredi kartı gerekmez.',
  },
};

const id: LandingPageContent = {
  meta: {
    title: 'Pembuat CV Online | Buat CV Profesional dengan AI 2026',
    description: 'Buat CV profesional dalam hitungan menit dengan pembuat CV online bertenaga AI. Template ATS, penulisan AI, dan unduh PDF langsung.',
    keywords: 'pembuat cv online, buat cv online, cv online gratis, pembuat cv, buat cv profesional, cv otomatis, generator cv online',
  },
  schemas: {
    breadcrumbName: 'Pembuat CV Online',
    articleHeadline: 'Pembuat CV Online Gratis: Buat CV Profesional dengan AI 2026',
    articleDescription: 'Buat CV profesional dalam hitungan menit dengan AI. Template ATS, penulisan AI, dan unduh PDF langsung.',
    softwareAppName: 'Best AI Pembuat CV',
  },
  hero: {
    badge: 'Pembuat CV Online Gratis dengan AI',
    title: 'CV profesional Anda',
    titleHighlight: 'siap dalam hitungan menit',
    subtitle: '<strong>Pembuat CV online kami</strong> menggunakan AI untuk menulis konten yang efektif, mengoptimalkan untuk ATS, dan membantu Anda mendapatkan lebih banyak panggilan interview. <a href="https://www.jobscan.co/blog/fortune-500-use-applicant-tracking-systems/" target="_blank" rel="noopener noreferrer" class="text-accent-blue hover:underline">98% perusahaan besar</a> menggunakan ATS — CV yang teroptimasi adalah keharusan. Tidak perlu kemampuan desain.',
    ctaPrimary: 'Buat CV saya gratis',
    ctaSecondary: 'Lihat template',
    trustBadges: ['Tanpa pendaftaran', 'Tanpa kartu kredit', 'Unduh PDF gratis'],
  },
  features: {
    title: 'Mengapa memilih pembuat CV online kami?',
    subtitle: 'Lebih dari sekadar template — pembuat CV AI kami membantu menulis konten yang lebih baik dan melewati seleksi ATS.',
    items: [
      { feature: 'Penulisan bertenaga AI', description: 'AI secara otomatis menghasilkan pengalaman profesional, ringkasan, dan deskripsi keahlian yang disesuaikan dengan industri dan level pengalaman Anda.' },
      { feature: 'Template teroptimasi ATS', description: 'Semua template telah diuji dengan sistem ATS terkemuka seperti Workday, Taleo, Greenhouse. Lewati seleksi otomatis dengan percaya diri.' },
      { feature: 'Unduh PDF', description: 'Unduh CV Anda sebagai PDF dengan satu klik. Tanpa watermark, tanpa biaya — sepenuhnya gratis.' },
      { feature: 'Siap dalam hitungan menit', description: 'Tidak perlu bergulat dengan halaman kosong. Alur terpandu dan saran AI memungkinkan CV profesional dalam kurang dari 10 menit.' },
      { feature: 'Penilaian ATS real-time', description: 'Lihat skor ATS CV Anda secara real-time saat menulis. Optimalkan sebelum melamar.' },
      { feature: '20+ template profesional', description: 'Template untuk setiap industri dan level karier. Semuanya gratis, semuanya kompatibel ATS.' },
    ],
    cta: 'Mulai buat CV',
  },
  comparison: {
    title: 'Pembuat CV kami vs. pembuat CV lainnya',
    subtitle: 'Temukan mengapa pencari kerja memilih pembuat CV AI gratis kami.',
    oursName: 'Best AI Resumes',
    othersName: 'Pembuat CV lainnya',
    rows: [
      { feature: 'Penulisan AI', ours: 'AI canggih', others: 'Dasar atau tidak ada' },
      { feature: 'Optimasi ATS', ours: 'Penilaian real-time', others: 'Pengujian terbatas' },
      { feature: 'Semua template gratis', ours: '20+', others: 'Kebanyakan berbayar' },
      { feature: 'Unduh PDF gratis', ours: 'Selalu gratis', others: 'Banyak yang berbayar' },
      { feature: 'Mulai tanpa akun', ours: 'Langsung mulai', others: 'Biasanya wajib' },
      { feature: 'Kata kunci industri', ours: 'Disarankan AI', others: 'Manual saja' },
      { feature: 'Beberapa versi', ours: 'Tak terbatas', others: 'Biasanya terbatas' },
    ],
  },
  howItWorks: {
    title: 'Cara menggunakan pembuat CV',
    subtitle: 'Buat CV yang mengesankan rekruter dalam 3 langkah sederhana. AI menangani pekerjaan berat.',
    steps: [
      { step: 1, title: 'Pilih template', description: 'Pilih dari 20+ template ATS profesional yang sesuai dengan industri Anda.' },
      { step: 2, title: 'Masukkan informasi Anda', description: 'Tambahkan pengalaman Anda dan biarkan AI menyarankan peningkatan, kata kunci, dan frasa profesional.' },
      { step: 3, title: 'Unduh dan lamar', description: 'Ekspor CV Anda sebagai PDF dan mulai melamar sekarang.' },
    ],
    cta: 'Buat CV profesional',
  },
  trust: {
    title: '',
    stats: [
      { value: '2M+', label: 'CV yang dibuat' },
      { value: '4.8', label: 'Rating pengguna' },
      { value: '20+', label: 'Template gratis' },
      { value: '10 mnt', label: 'Rata-rata waktu pembuatan' },
    ],
  },
  templates: {
    title: 'Template profesional untuk setiap industri',
    subtitle: 'Dari desainer kreatif hingga eksekutif — temukan template CV yang sempurna untuk bidang Anda.',
    styles: ['Software Engineer', 'Manajer Marketing', 'Perawat', 'Manajer Penjualan', 'Analis Data', 'Guru', 'Manajer Proyek', 'Desainer'],
    cta: 'Lihat semua template',
  },
  faq: {
    title: 'Pertanyaan yang sering diajukan',
    items: [
      { question: 'Apakah pembuat CV ini benar-benar gratis?', answer: 'Ya! Pembuat CV AI kami 100% gratis. Buat CV tak terbatas, akses 20+ template profesional, unduh sebagai PDF — tidak perlu kartu kredit atau langganan.' },
      { question: 'Mengapa ini adalah pembuat CV terbaik?', answer: 'Berbeda dari pembuat CV biasa, kami menggunakan AI untuk menghasilkan pengalaman profesional, mengoptimalkan untuk ATS, dan menyarankan kata kunci khusus industri. Anda mendapatkan CV yang menarik secara visual sekaligus efektif dalam seleksi otomatis.' },
      { question: 'Bisakah saya mengunduh CV saya sebagai PDF gratis?', answer: 'Tentu saja. Semua CV yang dibuat bisa diunduh sebagai PDF gratis. Tanpa watermark, tanpa biaya tambahan.' },
      { question: 'Berapa lama membuat CV?', answer: 'Sebagian besar pengguna menyelesaikan CV profesional dalam kurang dari 10 menit. AI menyarankan konten sehingga Anda bisa menghemat waktu untuk lamaran kerja.' },
      { question: 'Apakah CV yang dibuat kompatibel ATS?', answer: 'Ya. Semua template telah diuji dengan sistem ATS terkemuka (Workday, Taleo, Greenhouse, Lever). Penilaian ATS real-time membantu Anda mengoptimalkan CV sebelum melamar.' },
      { question: 'Bisakah saya membuat beberapa CV untuk lamaran berbeda?', answer: 'Ya! Anda bisa membuat CV yang disesuaikan sebanyak yang Anda inginkan. Mengoptimalkan CV untuk setiap posisi meningkatkan peluang Anda, dan alat kami membuat ini cepat dan mudah.' },
    ],
  },
  crossLinks: {
    title: 'Alat CV terkait',
    items: [
      { href: '/id/resume-ai', title: 'CV dengan AI', subtitle: 'Pembuat CV bertenaga AI' },
      { href: '/id/tools/ats-checker', title: 'Cek ATS', subtitle: 'Uji skor ATS Anda' },
      { href: '/id/free-resume-builder', title: 'CV Gratis', subtitle: 'Pembuat 100% gratis' },
    ],
    guidesTitle: 'Panduan berguna',
    guides: [
      { href: '/id/blog/how-to-write-a-resume', label: 'Cara membuat CV (panduan 2026)' },
      { href: '/id/career-tips/how-to-write-ats-friendly-resume', label: 'Cara membuat CV ATS friendly' },
      { href: '/id/resume-format', label: 'Panduan format CV' },
      { href: '/id/blog/top-resume-mistakes-to-avoid', label: 'Kesalahan umum dalam CV' },
    ],
  },
  bottomCta: {
    title: 'Siap membuat CV Anda?',
    description: 'Lebih dari 2 juta pencari kerja telah membuat CV profesional mereka dengan pembuat CV AI gratis kami.',
    cta: 'Buat CV gratis saya',
    subtext: 'Gratis selamanya. Tanpa kartu kredit.',
  },
};

const pl: LandingPageContent = {
  meta: {
    title: 'Kreator CV | Darmowy Kreator CV z AI 2026 | CV Online',
    description: 'Stwórz profesjonalne CV w minutach z naszym darmowym kreatorem CV z AI. Szablony ATS, pomoc w pisaniu z AI i natychmiastowe pobieranie PDF.',
    keywords: 'kreator cv, kreator cv online, darmowy kreator cv, kreator cv z ai, kreator cv ai, cv online, stworz cv, profesjonalne cv',
  },
  schemas: {
    breadcrumbName: 'Kreator CV',
    articleHeadline: 'Darmowy Kreator CV: Twórz CV z AI Online 2026',
    articleDescription: 'Stwórz profesjonalne CV w minutach z naszym darmowym kreatorem CV z AI. Szablony ATS, pomoc w pisaniu z AI i natychmiastowe pobieranie PDF.',
    softwareAppName: 'Best AI Kreator CV',
  },
  hero: {
    badge: 'Darmowy Kreator CV z AI',
    title: 'Stwórz profesjonalne CV',
    titleHighlight: 'gotowe w kilka minut',
    subtitle: 'Nasz darmowy <strong>kreator CV</strong> używa AI do pisania przekonującej treści, optymalizowania CV pod systemy ATS i zapewniania Ci więcej zaproszeń na rozmowy. <a href="https://www.jobscan.co/blog/fortune-500-use-applicant-tracking-systems/" target="_blank" rel="noopener noreferrer" class="text-accent-blue hover:underline">98% dużych pracodawców</a> używa oprogramowania ATS — zoptymalizowane CV jest niezbędne. Nie jest wymagana znajomość designu.',
    ctaPrimary: 'Stwórz moje CV za darmo',
    ctaSecondary: 'Przeglądaj szablony',
    trustBadges: ['Bez rejestracji', 'Bez karty kredytowej', 'Darmowe pobieranie PDF'],
  },
  features: {
    title: 'Dlaczego wybrać nasz darmowy kreator CV?',
    subtitle: 'Coś więcej niż tylko szablon — nasz kreator CV z AI pomaga pisać lepszą treść i przechodzić przez selekcję ATS.',
    items: [
      { feature: 'Pomoc AI w pisaniu', description: 'Nasza AI pisze profesjonalne opisy stanowisk, podsumowania i opisy umiejętności dostosowane do Twojej branży i poziomu doświadczenia.' },
      { feature: 'Szablony zoptymalizowane pod ATS', description: 'Każdy szablon jest testowany pod główne systemy ATS takie jak Workday, Taleo i Greenhouse. Twoje CV przejdzie przez filtry selekcji.' },
      { feature: 'Natychmiastowe pobieranie PDF', description: 'Pobierz gotowe CV jako czysty PDF jednym kliknięciem. Bez znaków wodnych, bez paywallu — w pełni za darmo.' },
      { feature: 'Gotowe w kilka minut', description: 'Koniec z lękiem przed pustą stroną. Nasz prowadzony proces i sugestie AI pomagają stworzyć pełne CV w mniej niż 10 minut.' },
      { feature: 'Wynik ATS w czasie rzeczywistym', description: 'Sprawdzaj jak Twoje CV oceniają systemy ATS podczas pisania. Optymalizuj przed aplikowaniem.' },
      { feature: '20+ profesjonalnych szablonów', description: 'Wybierz spośród profesjonalnie zaprojektowanych szablonów dla każdej branży i poziomu kariery. Wszystkie za darmo, wszystkie przyjazne ATS.' },
    ],
    cta: 'Zacznij tworzyć CV',
  },
  comparison: {
    title: 'Nasz kreator CV vs. konkurencja',
    subtitle: 'Sprawdź dlaczego kandydaci wybierają nasz darmowy kreator CV z AI.',
    oursName: 'Best AI Resumes',
    othersName: 'Inne kreatory CV',
    rows: [
      { feature: 'Pomoc AI w pisaniu', ours: 'Pełna AI', others: 'Ograniczona lub brak' },
      { feature: 'Optymalizacja ATS', ours: 'Wynik w czasie rzeczywistym', others: 'Ograniczona kontrola' },
      { feature: 'Wszystkie szablony za darmo', ours: '20+ szablonów', others: 'Większość płatna' },
      { feature: 'Darmowe pobieranie PDF', ours: 'Zawsze za darmo', others: 'Często za paywallem' },
      { feature: 'Bez wymaganego konta', ours: 'Zacznij od razu', others: 'Zazwyczaj wymagane' },
      { feature: 'Słowa kluczowe branżowe', ours: 'Sugestie AI', others: 'Ręcznie' },
      { feature: 'Wiele wersji', ours: 'Nieograniczone', others: 'Często ograniczone' },
    ],
  },
  howItWorks: {
    title: 'Jak działa nasz kreator CV',
    subtitle: 'Stwórz CV wygrywające aplikacje w trzech prostych krokach. AI wykonuje ciężką pracę.',
    steps: [
      { step: 1, title: 'Wybierz szablon', description: 'Wybierz spośród 20+ przyjaznych ATS profesjonalnych szablonów zaprojektowanych dla Twojej branży.' },
      { step: 2, title: 'Dodaj swoje dane', description: 'Wpisz doświadczenie i pozwól AI sugerować ulepszenia, słowa kluczowe i profesjonalne sformułowania.' },
      { step: 3, title: 'Pobierz i aplikuj', description: 'Eksportuj czysty PDF i zacznij aplikować od razu.' },
    ],
    cta: 'Stwórz profesjonalne CV',
  },
  trust: {
    title: '',
    stats: [
      { value: '2M+', label: 'Stworzonych CV' },
      { value: '4.8', label: 'Ocena użytkowników' },
      { value: '20+', label: 'Darmowych szablonów' },
      { value: '10 min', label: 'Śr. czas tworzenia' },
    ],
  },
  templates: {
    title: 'Profesjonalne szablony dla każdej kariery',
    subtitle: 'Od kreatywnych designerów po dyrektorów — znajdź idealny szablon CV dla swojej branży.',
    styles: ['Inżynier Oprogramowania', 'Menedżer Marketingu', 'Pielęgniarka', 'Menedżer Sprzedaży', 'Analityk Danych', 'Nauczyciel', 'Kierownik Projektu', 'Designer'],
    cta: 'Przeglądaj wszystkie szablony',
  },
  faq: {
    title: 'Najczęściej zadawane pytania',
    items: [
      { question: 'Czy ten kreator CV jest naprawdę darmowy?', answer: 'Tak! Nasz kreator CV z AI jest w 100% darmowy. Twórz nieograniczone CV, używaj wszystkich 20+ profesjonalnych szablonów i pobieraj CV jako PDF — bez karty kredytowej ani subskrypcji.' },
      { question: 'Co sprawia, że to najlepszy kreator CV?', answer: 'W odróżnieniu od zwykłych kreatorów CV, nasze narzędzie używa AI do pisania profesjonalnych opisów stanowisk, optymalizowania treści pod systemy ATS i sugerowania słów kluczowych branżowych. Otrzymujesz CV, które dobrze wygląda i przechodzi automatyczną selekcję.' },
      { question: 'Czy mogę pobrać CV jako PDF za darmo?', answer: 'Oczywiście. Każde stworzone CV można pobrać jako czysty, przyjazny ATS PDF bez opłat. Bez znaków wodnych, bez paywallu.' },
      { question: 'Jak długo trwa tworzenie CV?', answer: 'Większość użytkowników tworzy profesjonalne CV w mniej niż 10 minut. Nasza AI wypełnia wstępnie sugestie treści, więc spędzasz mniej czasu na patrzeniu w pustą stronę, a więcej na aplikowaniu.' },
      { question: 'Czy moje CV jest kompatybilne z ATS?', answer: 'Tak. Każdy szablon w naszym kreatorze CV jest testowany pod główne systemy ATS (Workday, Taleo, Greenhouse, Lever). Nasz wynik ATS w czasie rzeczywistym pomaga zoptymalizować CV przed wysłaniem.' },
      { question: 'Czy mogę tworzyć wiele CV na różne oferty pracy?', answer: 'Tak! Twórz tyle dostosowanych CV ile potrzebujesz. Wielu kandydatów personalizuje CV do każdej aplikacji — nasz kreator CV sprawia, że jest to szybkie i łatwe.' },
    ],
  },
  crossLinks: {
    title: 'Powiązane narzędzia CV',
    items: [
      { href: '/pl/resume-ai', title: 'CV z AI', subtitle: 'Kreator CV wspomagany AI' },
      { href: '/pl/tools/ats-checker', title: 'Sprawdź ATS', subtitle: 'Testuj wynik ATS' },
      { href: '/pl/free-resume-builder', title: 'Darmowy Kreator CV', subtitle: '100% darmowe tworzenie CV' },
    ],
    guidesTitle: 'Przydatne poradniki',
    guides: [
      { href: '/pl/blog/jak-napisac-cv', label: 'Jak napisać CV (poradnik 2026)' },
      { href: '/pl/career-tips/how-to-write-ats-friendly-resume', label: 'Jak stworzyć CV przyjazne ATS' },
      { href: '/pl/resume-format', label: 'Przewodnik po formacie CV' },
      { href: '/pl/blog/top-resume-mistakes-to-avoid', label: 'Najczęstsze błędy w CV' },
    ],
  },
  bottomCta: {
    title: 'Gotowy stworzyć CV?',
    description: 'Ponad 2 miliony kandydatów stworzyło profesjonalne CV z naszym darmowym kreatorem CV z AI.',
    cta: 'Stwórz moje CV za darmo',
    subtext: 'Za darmo na zawsze. Bez karty kredytowej.',
  },
};

const nl: LandingPageContent = {
  meta: {
    title: 'CV Maker | Gratis AI CV Maker 2026 | CV Maken Online',
    description: 'Maak een professioneel cv in minuten met onze gratis AI cv maker. ATS-vriendelijke sjablonen, AI schrijfhulp en direct als pdf downloaden.',
    keywords: 'cv maker, cv maken, gratis cv maker, ai cv maker, cv builder, cv maken online, cv opstellen, professioneel cv maken',
  },
  schemas: {
    breadcrumbName: 'CV Maker',
    articleHeadline: 'Gratis CV Maker: AI CV Maken Online 2026',
    articleDescription: 'Maak een professioneel cv in minuten met onze gratis AI cv maker. ATS-vriendelijke sjablonen, AI schrijfhulp en direct als pdf downloaden.',
    softwareAppName: 'Best AI CV Maker',
  },
  hero: {
    badge: 'Gratis AI CV Maker',
    title: 'Maak je professionele cv',
    titleHighlight: 'in een paar minuten klaar',
    subtitle: 'Onze gratis <strong>cv maker</strong> gebruikt AI om overtuigende content te schrijven, je cv te optimaliseren voor ATS-systemen en je meer sollicitatie-uitnodigingen te bezorgen. <a href="https://www.jobscan.co/blog/fortune-500-use-applicant-tracking-systems/" target="_blank" rel="noopener noreferrer" class="text-accent-blue hover:underline">98% van de grote werkgevers</a> gebruikt ATS-software — een geoptimaliseerd cv is onmisbaar. Geen ontwerpkennis vereist.',
    ctaPrimary: 'Maak mijn cv gratis',
    ctaSecondary: 'Bekijk sjablonen',
    trustBadges: ['Geen account nodig', 'Geen creditcard', 'Gratis pdf downloaden'],
  },
  features: {
    title: 'Waarom onze gratis cv maker kiezen?',
    subtitle: 'Meer dan alleen een sjabloon — onze AI cv maker helpt je betere content te schrijven en door ATS-selectie heen te komen.',
    items: [
      { feature: 'AI schrijfassistentie', description: 'Onze AI schrijft professionele bullet points, samenvattingen en vaardigheidsbeschrijvingen die zijn afgestemd op jouw branche en ervaringsniveau.' },
      { feature: 'ATS-geoptimaliseerde sjablonen', description: 'Elk sjabloon is getest op de grote ATS-systemen zoals Workday, Taleo en Greenhouse. Jouw cv passeert de selectiefilters.' },
      { feature: 'Direct pdf downloaden', description: 'Download je voltooide cv als verzorgde pdf met één klik. Geen watermerken, geen betaalmuur — volledig gratis.' },
      { feature: 'In enkele minuten klaar', description: 'Geen blanco-pagina-angst meer. Onze begeleide workflow en AI-suggesties helpen je een volledig cv te maken in minder dan 10 minuten.' },
      { feature: 'Real-time ATS-score', description: 'Zie hoe je cv scoort op ATS-vereisten terwijl je typt. Optimaliseer voordat je solliciteert.' },
      { feature: '20+ professionele sjablonen', description: 'Kies uit professioneel ontworpen sjablonen voor elke branche en elk carrièreniveau. Allemaal gratis, allemaal ATS-vriendelijk.' },
    ],
    cta: 'Begin nu met cv maken',
  },
  comparison: {
    title: 'Onze cv maker vs. de concurrentie',
    subtitle: 'Ontdek waarom werkzoekenden kiezen voor onze gratis AI cv maker.',
    oursName: 'Best AI Resumes',
    othersName: 'Andere cv makers',
    rows: [
      { feature: 'AI schrijfassistentie', ours: 'Volwaardige AI', others: 'Beperkt of geen' },
      { feature: 'ATS-optimalisatie', ours: 'Real-time score', others: 'Beperkte controle' },
      { feature: 'Alle sjablonen gratis', ours: '20+ sjablonen', others: 'Meeste betaald' },
      { feature: 'Gratis pdf downloaden', ours: 'Altijd gratis', others: 'Vaak betaalmuur' },
      { feature: 'Geen account nodig', ours: 'Direct starten', others: 'Meestal verplicht' },
      { feature: 'Branchezoekwoorden', ours: 'AI-suggesties', others: 'Handmatig' },
      { feature: 'Meerdere versies', ours: 'Onbeperkt', others: 'Vaak beperkt' },
    ],
  },
  howItWorks: {
    title: 'Hoe onze cv maker werkt',
    subtitle: 'Maak een cv dat sollicitaties wint in drie eenvoudige stappen. De AI doet het zware werk.',
    steps: [
      { step: 1, title: 'Kies een sjabloon', description: 'Kies uit 20+ ATS-vriendelijke professionele sjablonen die zijn ontworpen voor jouw branche.' },
      { step: 2, title: 'Voeg je gegevens in', description: 'Vul je ervaring in en laat de AI verbeteringen, zoekwoorden en professionele formuleringen voorstellen.' },
      { step: 3, title: 'Downloaden en solliciteren', description: 'Exporteer je verzorgde cv als pdf en begin meteen met solliciteren.' },
    ],
    cta: 'Maak professioneel cv',
  },
  trust: {
    title: '',
    stats: [
      { value: '2M+', label: "CV's aangemaakt" },
      { value: '4.8', label: 'Gebruikersbeoordeling' },
      { value: '20+', label: 'Gratis sjablonen' },
      { value: '10 min', label: 'Gem. bouwtijd' },
    ],
  },
  templates: {
    title: 'Professionele sjablonen voor elke carrière',
    subtitle: 'Van creatieve ontwerpers tot directeuren — vind het perfecte cv-sjabloon voor jouw branche.',
    styles: ['Software Engineer', 'Marketingmanager', 'Verpleegkundige', 'Salesmanager', 'Data Analist', 'Leraar', 'Projectmanager', 'Ontwerper'],
    cta: 'Bekijk alle sjablonen',
  },
  faq: {
    title: 'Veelgestelde vragen',
    items: [
      { question: 'Is deze cv maker echt gratis?', answer: 'Ja! Onze AI cv maker is 100% gratis te gebruiken. Maak onbeperkt cv\'s, gebruik alle 20+ professionele sjablonen en download je cv als pdf — geen creditcard of abonnement vereist.' },
      { question: 'Wat maakt dit de beste cv maker?', answer: 'In tegenstelling tot generieke cv makers gebruikt onze tool AI om professionele bullet points te schrijven, je content te optimaliseren voor ATS-systemen en branchespecifieke zoekwoorden voor te stellen. Je krijgt een cv dat er goed uitziet én de automatische selectie doorstaat.' },
      { question: 'Kan ik mijn cv gratis als pdf downloaden?', answer: 'Absoluut. Elk cv dat je maakt, kan worden gedownload als een verzorgde, ATS-vriendelijke pdf zonder kosten. Geen watermerken, geen betaalmuur.' },
      { question: 'Hoe lang duurt het om een cv te maken?', answer: 'De meeste gebruikers maken een professioneel cv in minder dan 10 minuten. Onze AI vult alvast contentvoorstellen in, zodat je minder tijd kwijt bent aan het staren naar een leeg scherm en meer tijd hebt om te solliciteren.' },
      { question: 'Is mijn cv ATS-compatibel?', answer: 'Ja. Elk sjabloon in onze cv maker is getest op de grote ATS-systemen (Workday, Taleo, Greenhouse, Lever). Onze real-time ATS-score helpt je cv te optimaliseren voordat je het instuurt.' },
      { question: 'Kan ik meerdere cv\'s maken voor verschillende vacatures?', answer: 'Ja! Maak zoveel op maat gemaakte cv\'s als je nodig hebt. Veel werkzoekenden passen hun cv aan voor elke sollicitatie — onze cv maker maakt dit snel en eenvoudig.' },
    ],
  },
  crossLinks: {
    title: 'Gerelateerde cv-tools',
    items: [
      { href: '/nl/resume-ai', title: 'CV met AI', subtitle: 'AI-gedreven cv maker' },
      { href: '/nl/tools/ats-checker', title: 'ATS Checker', subtitle: 'Test je ATS-score' },
      { href: '/nl/free-resume-builder', title: 'Gratis CV Maker', subtitle: '100% gratis cv maken' },
    ],
    guidesTitle: 'Handige gidsen',
    guides: [
      { href: '/nl/blog/how-to-write-a-resume', label: 'Hoe schrijf je een cv (gids 2026)' },
      { href: '/nl/career-tips/how-to-write-ats-friendly-resume', label: 'Hoe maak je een ATS-vriendelijk cv' },
      { href: '/nl/resume-format', label: 'CV-format gids' },
      { href: '/nl/blog/top-resume-mistakes-to-avoid', label: 'Veelgemaakte fouten in een cv' },
    ],
  },
  bottomCta: {
    title: 'Klaar om je cv te maken?',
    description: 'Meer dan 2 miljoen werkzoekenden hebben hun professionele cv gemaakt met onze gratis AI cv maker.',
    cta: 'Maak mijn cv gratis',
    subtext: 'Voor altijd gratis. Geen creditcard.',
  },
};

const zh: LandingPageContent = {
  meta: { title: '简历制作器 | 免费AI简历制作 2026 | 在线创建简历', description: '几分钟内用我们的免费AI简历制作器创建专业简历。ATS友好模板、AI写作辅助，即时PDF下载。', keywords: '简历制作器, 免费简历制作, ai简历制作器, 在线创建简历, 专业简历制作, 简历生成' },
  schemas: { breadcrumbName: '简历制作器', articleHeadline: '免费简历制作器：AI在线创建简历 2026', articleDescription: '几分钟内用我们的免费AI简历制作器创建专业简历。ATS友好模板、AI写作辅助，即时PDF下载。', softwareAppName: 'Best AI简历制作器' },
  hero: { badge: '免费AI简历制作器', title: '创建你的专业简历', titleHighlight: '几分钟完成', subtitle: '我们的免费<strong>简历制作器</strong>使用AI撰写引人注目的内容，优化ATS系统，帮助你获得更多面试机会。<a href="https://www.jobscan.co/blog/fortune-500-use-applicant-tracking-systems/" target="_blank" rel="noopener noreferrer" class="text-accent-blue hover:underline">98%的大型雇主</a>使用ATS软件——优化的简历必不可少。无需设计知识。', ctaPrimary: '免费创建简历', ctaSecondary: '查看模板', trustBadges: ['无需注册', '无需信用卡', '免费PDF下载'] },
  features: { title: '为什么选择我们的免费简历制作器？', subtitle: '不仅仅是模板——我们的AI简历制作器帮助你写出更好的内容，通过ATS筛选。', items: [{ feature: 'AI写作辅助', description: '我们的AI根据你的行业和经验水平撰写专业的要点、摘要和技能描述。' }, { feature: 'ATS优化模板', description: '每个模板都经过主要ATS系统测试，包括Workday、Taleo和Greenhouse。' }, { feature: '即时PDF下载', description: '一键将完成的简历下载为干净的PDF。无水印，无付费墙——完全免费。' }, { feature: '几分钟完成', description: '不再面对空白页的焦虑。我们的引导式工作流程和AI建议帮助你在10分钟内完成简历。' }, { feature: '实时ATS评分', description: '在投递前查看简历的ATS评分。边写边优化。' }, { feature: '20+专业模板', description: '从适合各行各业和职级的专业设计模板中选择。全部免费，全部ATS友好。' }], cta: '开始创建简历' },
  comparison: { title: '我们的简历制作器vs竞争对手', subtitle: '了解为什么求职者选择我们的免费AI简历制作器。', oursName: 'Best AI Resumes', othersName: '其他简历制作器', rows: [{ feature: 'AI写作辅助', ours: '完整AI', others: '有限或无' }, { feature: 'ATS优化', ours: '实时评分', others: '有限检查' }, { feature: '所有模板免费', ours: '20+模板', others: '大多数付费' }, { feature: '免费PDF下载', ours: '永远免费', others: '通常需付费' }, { feature: '无需账户', ours: '直接开始', others: '通常必须' }, { feature: '行业关键词', ours: 'AI建议', others: '手动' }, { feature: '多个版本', ours: '无限', others: '通常有限' }] },
  howItWorks: { title: '简历制作器工作原理', subtitle: '三个简单步骤创建赢得面试的简历。AI完成繁重工作。', steps: [{ step: 1, title: '选择模板', description: '从20+ ATS友好的专业模板中选择。' }, { step: 2, title: '填写信息', description: '输入你的经验，让AI建议改进、关键词和专业措辞。' }, { step: 3, title: '下载投递', description: '导出你的专业简历为PDF，立即开始投递。' }], cta: '创建专业简历' },
  trust: { title: '', stats: [{ value: '2M+', label: '已创建简历' }, { value: '4.8', label: '用户评分' }, { value: '20+', label: '免费模板' }, { value: '10分钟', label: '平均制作时间' }] },
  templates: { title: '适合各行各业的专业模板', subtitle: '从创意设计师到高管——找到适合你行业的完美简历模板。', styles: ['软件工程师', '市场经理', '护士', '销售经理', '数据分析师', '教师', '项目经理', '设计师'], cta: '查看所有模板' },
  faq: { title: '常见问题', items: [
    { question: '这个简历制作器真的免费吗？', answer: '是的！我们的AI简历制作器100%免费使用。创建无限简历，使用所有20+专业模板，下载PDF——无需信用卡或订阅。' },
    { question: '什么使这个成为最好的简历制作器？', answer: '与通用简历制作器不同，我们的工具使用AI撰写专业要点，优化ATS内容，并建议行业特定关键词。你得到的简历既好看又能通过自动筛选。' },
    { question: '可以免费下载PDF简历吗？', answer: '当然。你创建的每份简历都可以免费下载为干净的、ATS友好的PDF。无水印，无付费墙。' },
    { question: '制作简历需要多长时间？', answer: '大多数用户在10分钟内完成专业简历。我们的AI预填内容建议，让你花更少时间盯着空白屏幕，更多时间投递。' },
    { question: '我的简历兼容ATS吗？', answer: '是的。简历制作器中的每个模板都经过主要ATS系统测试（Workday、Taleo、Greenhouse、Lever）。实时ATS评分帮助你在投递前优化。' },
    { question: '可以为不同职位创建多份简历吗？', answer: '可以！创建任意数量的定制简历。许多求职者为每次投递调整简历——我们的制作器使这变得快速简单。' },
  ] },
  crossLinks: { title: '相关简历工具', items: [{ href: '/zh/resume-ai', title: 'AI简历', subtitle: 'AI驱动简历制作器' }, { href: '/zh/tools/ats-checker', title: 'ATS检查器', subtitle: '测试ATS评分' }, { href: '/zh/free-resume-builder', title: '免费简历生成器', subtitle: '100%免费' }], guidesTitle: '实用指南', guides: [{ href: '/zh/blog/how-to-write-a-resume', label: '如何写简历（2026指南）' }, { href: '/zh/career-tips/how-to-write-ats-friendly-resume', label: '如何制作ATS友好简历' }, { href: '/zh/resume-format', label: '简历格式指南' }, { href: '/zh/blog/top-resume-mistakes-to-avoid', label: '简历常见错误' }] },
  bottomCta: { title: '准备创建简历？', description: '超过200万求职者已使用我们的免费AI简历制作器创建了专业简历。', cta: '免费创建我的简历', subtext: '永久免费。无需信用卡。' },
};

const ms: LandingPageContent = {
  meta: { title: 'Pembuat Resume | Pembuat Resume AI Percuma 2026 | Buat Resume Online', description: 'Cipta resume profesional dalam beberapa minit dengan pembuat resume AI percuma kami. Templat mesra ATS, bantuan penulisan AI dan muat turun PDF serta-merta.', keywords: 'pembuat resume, buat resume, pembuat resume percuma, pembuat resume ai, bina resume online, cipta resume profesional' },
  schemas: { breadcrumbName: 'Pembuat Resume', articleHeadline: 'Pembuat Resume Percuma: Buat Resume AI Online 2026', articleDescription: 'Cipta resume profesional dalam beberapa minit dengan pembuat resume AI percuma kami. Templat mesra ATS, bantuan penulisan AI dan muat turun PDF serta-merta.', softwareAppName: 'Best AI Pembuat Resume' },
  hero: { badge: 'Pembuat Resume AI Percuma', title: 'Cipta resume profesional anda', titleHighlight: 'siap dalam beberapa minit', subtitle: '<strong>Pembuat resume</strong> percuma kami menggunakan AI untuk menulis kandungan menarik, mengoptimumkan untuk sistem ATS dan membantu anda mendapat lebih banyak temu duga. <a href="https://www.jobscan.co/blog/fortune-500-use-applicant-tracking-systems/" target="_blank" rel="noopener noreferrer" class="text-accent-blue hover:underline">98% majikan besar</a> menggunakan perisian ATS — resume yang dioptimumkan adalah penting. Tanpa pengetahuan reka bentuk diperlukan.', ctaPrimary: 'Buat resume percuma', ctaSecondary: 'Lihat templat', trustBadges: ['Tanpa pendaftaran', 'Tanpa kad kredit', 'Muat turun PDF percuma'] },
  features: { title: 'Mengapa pilih pembuat resume percuma kami?', subtitle: 'Lebih daripada sekadar templat — pembuat resume AI kami membantu anda menulis kandungan lebih baik dan melepasi saringan ATS.', items: [{ feature: 'Bantuan penulisan AI', description: 'AI kami menulis poin profesional, ringkasan dan penerangan kemahiran yang disesuaikan dengan industri dan tahap pengalaman anda.' }, { feature: 'Templat dioptimumkan ATS', description: 'Setiap templat diuji pada sistem ATS utama seperti Workday, Taleo dan Greenhouse.' }, { feature: 'Muat turun PDF serta-merta', description: 'Muat turun resume siap anda sebagai PDF bersih dengan satu klik. Tanpa tera air, tanpa tembok bayaran — percuma sepenuhnya.' }, { feature: 'Siap dalam beberapa minit', description: 'Tiada lagi kebimbangan halaman kosong. Aliran kerja berpandu dan cadangan AI kami membantu anda melengkapkan resume dalam kurang 10 minit.' }, { feature: 'Skor ATS masa nyata', description: 'Lihat bagaimana resume anda dicetak pada keperluan ATS semasa anda menaip. Optimumkan sebelum memohon.' }, { feature: '20+ templat profesional', description: 'Pilih daripada templat direka bentuk profesional untuk setiap industri dan peringkat kerjaya. Semuanya percuma, semuanya mesra ATS.' }], cta: 'Mula buat resume' },
  comparison: { title: 'Pembuat resume kami vs. pesaing', subtitle: 'Ketahui mengapa pencari kerja memilih pembuat resume AI percuma kami.', oursName: 'Best AI Resumes', othersName: 'Pembuat resume lain', rows: [{ feature: 'Bantuan penulisan AI', ours: 'AI penuh', others: 'Terhad atau tiada' }, { feature: 'Pengoptimuman ATS', ours: 'Skor masa nyata', others: 'Semakan terhad' }, { feature: 'Semua templat percuma', ours: '20+ templat', others: 'Kebanyakan berbayar' }, { feature: 'Muat turun PDF percuma', ours: 'Sentiasa percuma', others: 'Sering berbayar' }, { feature: 'Tanpa akaun diperlukan', ours: 'Mula terus', others: 'Biasanya wajib' }, { feature: 'Kata kunci industri', ours: 'Cadangan AI', others: 'Manual' }, { feature: 'Pelbagai versi', ours: 'Tanpa had', others: 'Sering terhad' }] },
  howItWorks: { title: 'Cara pembuat resume kami berfungsi', subtitle: 'Cipta resume yang memenangi temu duga dalam tiga langkah mudah. AI melakukan kerja berat.', steps: [{ step: 1, title: 'Pilih templat', description: 'Pilih daripada 20+ templat profesional mesra ATS yang direka untuk industri anda.' }, { step: 2, title: 'Tambah butiran anda', description: 'Isikan pengalaman anda dan biarkan AI mencadangkan penambahbaikan, kata kunci dan frasa profesional.' }, { step: 3, title: 'Muat turun dan mohon', description: 'Eksport resume bersih anda sebagai PDF dan mula memohon kerja.' }], cta: 'Buat resume profesional' },
  trust: { title: '', stats: [{ value: '2M+', label: 'Resume dicipta' }, { value: '4.8', label: 'Penilaian pengguna' }, { value: '20+', label: 'Templat percuma' }, { value: '10 min', label: 'Masa purata bina' }] },
  templates: { title: 'Templat profesional untuk setiap kerjaya', subtitle: 'Dari pereka kreatif hingga eksekutif — cari templat resume sempurna untuk industri anda.', styles: ['Jurutera Perisian', 'Pengurus Pemasaran', 'Jururawat', 'Pengurus Jualan', 'Penganalisis Data', 'Guru', 'Pengurus Projek', 'Pereka'], cta: 'Lihat semua templat' },
  faq: { title: 'Soalan lazim', items: [
    { question: 'Adakah pembuat resume ini benar-benar percuma?', answer: 'Ya! Pembuat resume AI kami 100% percuma. Cipta resume tanpa had, gunakan semua 20+ templat profesional dan muat turun resume sebagai PDF — tanpa kad kredit atau langganan diperlukan.' },
    { question: 'Apa yang menjadikan ini pembuat resume terbaik?', answer: 'Tidak seperti pembuat resume generik, alat kami menggunakan AI untuk menulis poin profesional, mengoptimumkan kandungan untuk ATS dan mencadangkan kata kunci industri. Anda mendapat resume yang kelihatan bagus dan melepasi saringan automatik.' },
    { question: 'Boleh muat turun resume sebagai PDF percuma?', answer: 'Sudah tentu. Setiap resume yang anda buat boleh dimuat turun sebagai PDF mesra ATS yang bersih tanpa kos. Tanpa tera air, tanpa tembok bayaran.' },
    { question: 'Berapa lama untuk membuat resume?', answer: 'Kebanyakan pengguna menyiapkan resume profesional dalam kurang 10 minit. AI kami mengisi cadangan kandungan supaya anda habiskan kurang masa merenung skrin kosong.' },
    { question: 'Adakah resume saya serasi ATS?', answer: 'Ya. Setiap templat dalam pembuat resume kami diuji pada sistem ATS utama (Workday, Taleo, Greenhouse, Lever). Skor ATS masa nyata membantu anda mengoptimumkan sebelum menghantar.' },
    { question: 'Boleh buat pelbagai resume untuk jawatan berbeza?', answer: 'Ya! Cipta seberapa banyak resume tersuai yang anda perlukan. Ramai pencari kerja menyesuaikan resume untuk setiap permohonan — pembuat resume kami menjadikannya pantas dan mudah.' },
  ] },
  crossLinks: { title: 'Alat resume berkaitan', items: [{ href: '/ms/resume-ai', title: 'Resume AI', subtitle: 'Pembuat resume AI' }, { href: '/ms/tools/ats-checker', title: 'Penyemak ATS', subtitle: 'Uji skor ATS anda' }, { href: '/ms/free-resume-builder', title: 'Resume Percuma', subtitle: '100% percuma' }], guidesTitle: 'Panduan berguna', guides: [{ href: '/ms/blog/how-to-write-a-resume', label: 'Cara menulis resume (panduan 2026)' }, { href: '/ms/career-tips/how-to-write-ats-friendly-resume', label: 'Cara buat resume mesra ATS' }, { href: '/ms/resume-format', label: 'Panduan format resume' }, { href: '/ms/blog/top-resume-mistakes-to-avoid', label: 'Kesilapan resume yang biasa' }] },
  bottomCta: { title: 'Bersedia membuat resume anda?', description: 'Lebih 2 juta pencari kerja telah membuat resume profesional mereka dengan pembuat resume AI percuma kami.', cta: 'Buat resume percuma', subtext: 'Percuma selama-lamanya. Tanpa kad kredit.' },
};

const contentMap: Record<string, LandingPageContent> = { en, es, fr, de, ar, ja, it, ko, vi, th, pt, tr, id, pl, nl, zh, ms };

export function getContent(locale: string): LandingPageContent {
  return selectContent(contentMap, locale);
}
