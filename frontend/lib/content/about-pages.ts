import { selectContent } from './types';

// ───── About Main Page ─────
interface AboutContent {
  hero: { badge: string; title: string; titleHighlight: string; subtitle: string };
  story: { badge: string; heading: string; p1: string; p2: string; p3: string };
  stats: { value: string; label: string }[];
  values: { badge: string; heading: string; cards: { title: string; text: string }[] };
  experts: { badge: string; heading: string; subtitle: string };
  editorial: { heading: string; items: { title: string; text: string }[] };
  commitment: { heading: string; p1: string; p2: string };
  cta: { title: string; titleHighlight: string; subtitle: string; button: string };
}

// ───── Authors Listing Page ─────
interface AuthorsContent {
  meta: { title: string; description: string; ogDescription: string };
  breadcrumb: { home: string; about: string; authors: string };
  hero: { title: string; subtitle: string };
  viewProfile: string;
  cta: { title: string; subtitle: string; button: string };
}

// ───── Author Profile Page ─────
interface AuthorProfileContent {
  breadcrumb: { home: string; about: string };
  atOrg: string;
  authorOfGuides: string;
  connectLinkedIn: string;
  viewAllGuides: string;
  areasOfExpertise: string;
  resumeGuidesBy: string;
  guidesCount: string;
  coverLetterExamplesBy: string;
  examplesCount: string;
  blogPostsBy: string;
  postsCount: string;
  viewAllResumes: string;
  viewAllCoverLetters: string;
  viewAllBlogPosts: string;
  cta: { title: string; subtitle: string; button: string };
}

export interface AboutPagesContent {
  about: AboutContent;
  authors: AuthorsContent;
  authorProfile: AuthorProfileContent;
}

const en: AboutPagesContent = {
  about: {
    hero: {
      badge: 'About Us',
      title: 'Building the future of',
      titleHighlight: 'career success',
      subtitle: 'Best AI Resume is on a mission to help job seekers worldwide create professional, ATS-optimized resumes that open doors to their dream careers.',
    },
    story: {
      badge: 'Our Story',
      heading: 'Why we built Best AI Resume',
      p1: "We noticed that talented professionals were being overlooked simply because their resumes didn\u2019t make it past automated screening systems. The traditional resume-building process was time-consuming, frustrating, and often produced documents that failed to showcase candidates\u2019 true potential.",
      p2: "That\u2019s why we created Best AI Resume\u2014a platform that combines the power of artificial intelligence with beautiful, professional design. Our goal is simple: help every job seeker present their best self to potential employers.",
      p3: "Today, we\u2019ve helped over 50,000 professionals land their dream jobs by creating resumes that stand out while passing ATS screening with flying colors.",
    },
    stats: [
      { value: '50K+', label: 'Resumes Created' },
      { value: '98%', label: 'ATS Pass Rate' },
      { value: '20+', label: 'Templates' },
      { value: '4.9', label: 'User Rating' },
    ],
    values: {
      badge: 'Our Values',
      heading: 'What drives us forward',
      cards: [
        { title: 'Privacy First', text: 'Your data belongs to you. We store your resume data locally in your browser, not on our servers. Only your account credentials are kept secure on our end.' },
        { title: 'Innovation', text: 'We leverage cutting-edge AI technology to help you write compelling content that highlights your achievements and gets you noticed by recruiters.' },
        { title: 'Accessibility', text: "Professional resume tools shouldn\u2019t be locked behind expensive paywalls. We offer powerful features that everyone can access and afford." },
      ],
    },
    experts: {
      badge: 'Expertise You Can Trust',
      heading: 'Meet Our Career Experts',
      subtitle: 'Our team of career coaches, recruiters, and industry specialists each bring deep expertise to the resume guides they write.',
    },
    editorial: {
      heading: 'Our Editorial Standards',
      items: [
        { title: 'Data-Backed Advice', text: 'Every tip we share is tested against real ATS systems and verified by industry professionals.' },
        { title: 'Human-First Approach', text: 'We believe AI should empower, not replace. We prioritize strategies that appeal to human recruiters first.' },
      ],
    },
    commitment: {
      heading: 'Our Commitment to You',
      p1: "At Best AI Resume, we believe that your career journey is personal. That\u2019s why we\u2019ve built a platform that respects your privacy while giving you powerful tools to succeed. Your resume data stays on your device, giving you complete control over your information.",
      p2: "We\u2019re constantly improving our AI algorithms, adding new templates, and enhancing our features based on user feedback. Your success is our success, and we\u2019re committed to helping you every step of the way.",
    },
    cta: {
      title: 'Ready to join',
      titleHighlight: '50,000+ success stories?',
      subtitle: 'Start building your professional resume today and take the first step toward your dream career.',
      button: 'Get Started Free',
    },
  },
  authors: {
    meta: {
      title: 'Our Expert Authors | Best AI Resume',
      description: 'Meet the career experts, recruiters, and coaches behind our resume guides. Our authors bring real-world hiring experience to help you land your dream job.',
      ogDescription: 'Meet the career experts, recruiters, and coaches behind our resume guides.',
    },
    breadcrumb: { home: 'Home', about: 'About', authors: 'Authors' },
    hero: {
      title: 'Meet Our Expert Authors',
      subtitle: 'Our team of career coaches, recruiters, and industry specialists create actionable resume guides backed by real hiring experience.',
    },
    viewProfile: 'View Profile',
    cta: {
      title: 'Build Your Resume with Expert Guidance',
      subtitle: 'Our AI builder applies the same strategies our experts recommend. Create a professional resume in minutes.',
      button: 'Create My Resume \u2014 Free',
    },
  },
  authorProfile: {
    breadcrumb: { home: 'Home', about: 'About' },
    atOrg: '{jobTitle} at {organization}',
    authorOfGuides: ' Author of {count}+ career guides and articles.',
    connectLinkedIn: 'Connect on LinkedIn',
    viewAllGuides: 'View All Guides',
    areasOfExpertise: 'Areas of Expertise',
    resumeGuidesBy: 'Resume Guides by {name}',
    guidesCount: '{count} guides',
    coverLetterExamplesBy: 'Cover Letter Examples by {name}',
    examplesCount: '{count} examples',
    blogPostsBy: 'Blog Posts by {name}',
    postsCount: '{count} posts',
    viewAllResumes: 'View all {count} resume guides',
    viewAllCoverLetters: 'View all {count} cover letter examples',
    viewAllBlogPosts: 'View all {count} blog posts',
    cta: {
      title: 'Build Your Resume with Expert Guidance',
      subtitle: 'Use the same strategies {name} recommends. Our AI builder applies expert resume techniques automatically.',
      button: 'Create My Resume \u2014 Free',
    },
  },
};

const es: AboutPagesContent = {
  about: {
    hero: {
      badge: 'Sobre Nosotros',
      title: 'Construyendo el futuro del',
      titleHighlight: '\u00e9xito profesional',
      subtitle: 'Best AI Resume tiene la misi\u00f3n de ayudar a los buscadores de empleo en todo el mundo a crear curr\u00edculums profesionales y optimizados para ATS que abran las puertas a sus carreras so\u00f1adas.',
    },
    story: {
      badge: 'Nuestra Historia',
      heading: 'Por qu\u00e9 creamos Best AI Resume',
      p1: 'Nos dimos cuenta de que profesionales talentosos eran ignorados simplemente porque sus curr\u00edculums no pasaban los sistemas de selecci\u00f3n automatizados. El proceso tradicional de creaci\u00f3n de curr\u00edculum era lento, frustrante y a menudo produc\u00eda documentos que no mostraban el verdadero potencial de los candidatos.',
      p2: 'Por eso creamos Best AI Resume: una plataforma que combina el poder de la inteligencia artificial con un dise\u00f1o profesional y atractivo. Nuestro objetivo es simple: ayudar a cada buscador de empleo a presentar lo mejor de s\u00ed mismo ante posibles empleadores.',
      p3: 'Hoy, hemos ayudado a m\u00e1s de 50,000 profesionales a conseguir el trabajo de sus sue\u00f1os creando curr\u00edculums que destacan y pasan las pruebas ATS con \u00e9xito.',
    },
    stats: [
      { value: '50K+', label: 'Curr\u00edculums Creados' },
      { value: '98%', label: 'Tasa de Aprobaci\u00f3n ATS' },
      { value: '20+', label: 'Plantillas' },
      { value: '4.9', label: 'Calificaci\u00f3n de Usuarios' },
    ],
    values: {
      badge: 'Nuestros Valores',
      heading: 'Lo que nos impulsa',
      cards: [
        { title: 'Privacidad Primero', text: 'Tus datos te pertenecen. Almacenamos los datos de tu curr\u00edculum localmente en tu navegador, no en nuestros servidores. Solo tus credenciales de cuenta se mantienen seguras en nuestro lado.' },
        { title: 'Innovaci\u00f3n', text: 'Aprovechamos la tecnolog\u00eda de IA m\u00e1s avanzada para ayudarte a escribir contenido atractivo que destaque tus logros y te haga notar por los reclutadores.' },
        { title: 'Accesibilidad', text: 'Las herramientas profesionales de curr\u00edculum no deber\u00edan estar bloqueadas detr\u00e1s de costosos muros de pago. Ofrecemos funciones potentes que todos pueden acceder y pagar.' },
      ],
    },
    experts: {
      badge: 'Experiencia en la que Puedes Confiar',
      heading: 'Conoce a Nuestros Expertos en Carreras',
      subtitle: 'Nuestro equipo de coaches de carrera, reclutadores y especialistas de la industria aportan una profunda experiencia a las gu\u00edas de curr\u00edculum que escriben.',
    },
    editorial: {
      heading: 'Nuestros Est\u00e1ndares Editoriales',
      items: [
        { title: 'Consejos Basados en Datos', text: 'Cada consejo que compartimos est\u00e1 probado contra sistemas ATS reales y verificado por profesionales de la industria.' },
        { title: 'Enfoque Humano Primero', text: 'Creemos que la IA debe empoderar, no reemplazar. Priorizamos estrategias que atraigan primero a los reclutadores humanos.' },
      ],
    },
    commitment: {
      heading: 'Nuestro Compromiso Contigo',
      p1: 'En Best AI Resume, creemos que tu trayectoria profesional es personal. Por eso hemos construido una plataforma que respeta tu privacidad mientras te brinda herramientas poderosas para tener \u00e9xito. Los datos de tu curr\u00edculum permanecen en tu dispositivo, d\u00e1ndote control total sobre tu informaci\u00f3n.',
      p2: 'Estamos constantemente mejorando nuestros algoritmos de IA, a\u00f1adiendo nuevas plantillas y mejorando nuestras funciones bas\u00e1ndonos en los comentarios de los usuarios. Tu \u00e9xito es nuestro \u00e9xito, y estamos comprometidos a ayudarte en cada paso del camino.',
    },
    cta: {
      title: '\u00bfListo para unirte a',
      titleHighlight: 'm\u00e1s de 50,000 historias de \u00e9xito?',
      subtitle: 'Comienza a construir tu curr\u00edculum profesional hoy y da el primer paso hacia tu carrera so\u00f1ada.',
      button: 'Comenzar Gratis',
    },
  },
  authors: {
    meta: {
      title: 'Nuestros Autores Expertos | Best AI Resume',
      description: 'Conoce a los expertos en carreras, reclutadores y coaches detr\u00e1s de nuestras gu\u00edas de curr\u00edculum. Nuestros autores aportan experiencia real en contrataci\u00f3n para ayudarte a conseguir tu trabajo so\u00f1ado.',
      ogDescription: 'Conoce a los expertos en carreras, reclutadores y coaches detr\u00e1s de nuestras gu\u00edas de curr\u00edculum.',
    },
    breadcrumb: { home: 'Inicio', about: 'Sobre Nosotros', authors: 'Autores' },
    hero: {
      title: 'Conoce a Nuestros Autores Expertos',
      subtitle: 'Nuestro equipo de coaches de carrera, reclutadores y especialistas de la industria crean gu\u00edas pr\u00e1cticas de curr\u00edculum respaldadas por experiencia real en contrataci\u00f3n.',
    },
    viewProfile: 'Ver Perfil',
    cta: {
      title: 'Crea Tu Curr\u00edculum con Orientaci\u00f3n Experta',
      subtitle: 'Nuestro creador con IA aplica las mismas estrategias que nuestros expertos recomiendan. Crea un curr\u00edculum profesional en minutos.',
      button: 'Crear Mi Curr\u00edculum \u2014 Gratis',
    },
  },
  authorProfile: {
    breadcrumb: { home: 'Inicio', about: 'Sobre Nosotros' },
    atOrg: '{jobTitle} en {organization}',
    authorOfGuides: ' Autor de {count}+ gu\u00edas de carrera y art\u00edculos.',
    connectLinkedIn: 'Conectar en LinkedIn',
    viewAllGuides: 'Ver Todas las Gu\u00edas',
    areasOfExpertise: '\u00c1reas de Experiencia',
    resumeGuidesBy: 'Gu\u00edas de Curr\u00edculum de {name}',
    guidesCount: '{count} gu\u00edas',
    coverLetterExamplesBy: 'Ejemplos de Carta de Presentaci\u00f3n de {name}',
    examplesCount: '{count} ejemplos',
    blogPostsBy: 'Art\u00edculos del Blog de {name}',
    postsCount: '{count} art\u00edculos',
    viewAllResumes: 'Ver las {count} gu\u00edas de curr\u00edculum',
    viewAllCoverLetters: 'Ver los {count} ejemplos de carta de presentaci\u00f3n',
    viewAllBlogPosts: 'Ver los {count} art\u00edculos del blog',
    cta: {
      title: 'Crea Tu Curr\u00edculum con Orientaci\u00f3n Experta',
      subtitle: 'Usa las mismas estrategias que {name} recomienda. Nuestro creador con IA aplica t\u00e9cnicas expertas de curr\u00edculum autom\u00e1ticamente.',
      button: 'Crear Mi Curr\u00edculum \u2014 Gratis',
    },
  },
};

const contentMap: Record<string, AboutPagesContent> = { en, es };

export function getAboutContent(locale: string) { return selectContent(contentMap, locale).about; }
export function getAuthorsContent(locale: string) { return selectContent(contentMap, locale).authors; }
export function getAuthorProfileContent(locale: string) { return selectContent(contentMap, locale).authorProfile; }
