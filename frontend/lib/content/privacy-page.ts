import { selectContent } from './types';

export interface PrivacyContent {
  hero: { badge: string; title: string; titleHighlight: string; subtitle: string };
  highlights: { title: string; text: string }[];
  sections: {
    heading: string;
    intro?: string;
    subsections?: { subheading: string; items: string[] }[];
    items?: string[];
  }[];
  cta: { title: string; titleHighlight: string; subtitle: string; primaryBtn: string; secondaryBtn: string };
  lastUpdated: string;
  contactText: string;
}

const en: PrivacyContent = {
  hero: {
    badge: 'Privacy Policy',
    title: 'Your privacy is',
    titleHighlight: 'our priority',
    subtitle: "At Best AI Resume, we believe your personal data belongs to you. We\u2019ve built our platform with a privacy-first approach that keeps your information under your control.",
  },
  highlights: [
    { title: 'Your Data Stays Local', text: "All your resume content, work experience, education, and skills are stored locally in your browser\u2019s storage\u2014never on our servers." },
    { title: 'Minimal Server Data', text: 'We only store your email address and password on our servers for account authentication. Nothing else. No resume content, no personal details.' },
    { title: 'Full Transparency', text: 'We believe in complete transparency. You can see exactly what data is stored in your browser and delete it anytime you want.' },
  ],
  sections: [
    {
      heading: 'What Data We Collect',
      subsections: [
        { subheading: 'Data Stored on Our Servers (Minimal)', items: ['**Email address** \u2014 Used for account authentication and important service updates', '**Password (encrypted)** \u2014 Securely hashed and stored for authentication'] },
        { subheading: 'Data Stored Locally in Your Browser', items: ['Personal information (name, contact details, address)', 'Work experience and employment history', 'Education and certifications', 'Skills, languages, and achievements', 'Resume templates and customization preferences'] },
      ],
    },
    {
      heading: 'Why We Use Browser Storage',
      intro: 'We chose browser storage (localStorage) as our primary data storage method for several important reasons:',
      items: ['**Maximum Privacy** \u2014 Your sensitive career information never leaves your device', "**No Data Breaches** \u2014 Since we don\u2019t store your resume data, it can\u2019t be compromised in a server breach", '**Complete Control** \u2014 You can view, export, or delete your data anytime through your browser settings', '**Fast Performance** \u2014 Local storage means instant access to your data without server latency'],
    },
    {
      heading: 'How We Protect Your Account',
      intro: 'While we minimize server-side data, we take the security of your account credentials seriously:',
      items: ['Passwords are encrypted using industry-standard hashing algorithms', 'All data transmission is secured with HTTPS encryption', 'We never store passwords in plain text', 'Regular security audits and monitoring'],
    },
    {
      heading: 'Your Rights and Control',
      intro: 'You have complete control over your data:',
      items: ["**Access** \u2014 View all your browser-stored data anytime through your browser\u2019s developer tools", '**Export** \u2014 Download your resume data as PDF or other formats', '**Delete** \u2014 Clear your browser storage or delete your account at any time', '**Portability** \u2014 Your data is yours to take anywhere'],
    },
    {
      heading: "What We Don\u2019t Do",
      intro: "We are committed to ethical data practices. Here\u2019s what we will never do:",
      items: ['Sell your personal information to third parties', 'Use your resume content for advertising purposes', 'Share your information with recruiters without your explicit consent', 'Track your browsing activity across other websites', 'Store your resume content on our servers'],
    },
    {
      heading: 'Cookies and Analytics',
      intro: 'We use minimal, essential cookies for:',
      items: ['Keeping you logged into your account', 'Remembering your language and theme preferences', 'Anonymous usage analytics to improve our service'],
    },
    {
      heading: 'Contact Us',
    },
  ],
  contactText: 'If you have any questions about our privacy practices or want to exercise your data rights, please contact us at',
  cta: {
    title: 'Build your resume with',
    titleHighlight: 'confidence and privacy',
    subtitle: 'Your career data stays with you. Start building your professional resume today.',
    primaryBtn: 'Get Started Free',
    secondaryBtn: 'Learn About Us',
  },
  lastUpdated: 'Last updated: January 2026',
};

const es: PrivacyContent = {
  hero: {
    badge: 'Pol\u00edtica de Privacidad',
    title: 'Tu privacidad es',
    titleHighlight: 'nuestra prioridad',
    subtitle: 'En Best AI Resume, creemos que tus datos personales te pertenecen. Hemos construido nuestra plataforma con un enfoque de privacidad primero que mantiene tu informaci\u00f3n bajo tu control.',
  },
  highlights: [
    { title: 'Tus Datos Permanecen Locales', text: 'Todo el contenido de tu curr\u00edculum, experiencia laboral, educaci\u00f3n y habilidades se almacenan localmente en tu navegador, nunca en nuestros servidores.' },
    { title: 'Datos M\u00ednimos en el Servidor', text: 'Solo almacenamos tu direcci\u00f3n de correo electr\u00f3nico y contrase\u00f1a en nuestros servidores para la autenticaci\u00f3n de la cuenta. Nada m\u00e1s. Sin contenido de curr\u00edculum, sin datos personales.' },
    { title: 'Transparencia Total', text: 'Creemos en la transparencia completa. Puedes ver exactamente qu\u00e9 datos est\u00e1n almacenados en tu navegador y eliminarlos cuando quieras.' },
  ],
  sections: [
    {
      heading: 'Qu\u00e9 Datos Recopilamos',
      subsections: [
        { subheading: 'Datos Almacenados en Nuestros Servidores (M\u00ednimo)', items: ['**Direcci\u00f3n de correo electr\u00f3nico** \u2014 Utilizada para la autenticaci\u00f3n de la cuenta y actualizaciones importantes del servicio', '**Contrase\u00f1a (encriptada)** \u2014 Hasheada de forma segura y almacenada para la autenticaci\u00f3n'] },
        { subheading: 'Datos Almacenados Localmente en Tu Navegador', items: ['Informaci\u00f3n personal (nombre, datos de contacto, direcci\u00f3n)', 'Experiencia laboral e historial de empleo', 'Educaci\u00f3n y certificaciones', 'Habilidades, idiomas y logros', 'Plantillas de curr\u00edculum y preferencias de personalizaci\u00f3n'] },
      ],
    },
    {
      heading: 'Por Qu\u00e9 Usamos Almacenamiento del Navegador',
      intro: 'Elegimos el almacenamiento del navegador (localStorage) como nuestro m\u00e9todo principal de almacenamiento de datos por varias razones importantes:',
      items: ['**M\u00e1xima Privacidad** \u2014 Tu informaci\u00f3n profesional sensible nunca sale de tu dispositivo', '**Sin Filtraciones de Datos** \u2014 Como no almacenamos los datos de tu curr\u00edculum, no pueden ser comprometidos en una brecha de seguridad', '**Control Total** \u2014 Puedes ver, exportar o eliminar tus datos en cualquier momento desde la configuraci\u00f3n de tu navegador', '**Rendimiento R\u00e1pido** \u2014 El almacenamiento local significa acceso instant\u00e1neo a tus datos sin latencia del servidor'],
    },
    {
      heading: 'C\u00f3mo Protegemos Tu Cuenta',
      intro: 'Aunque minimizamos los datos en el servidor, nos tomamos muy en serio la seguridad de tus credenciales de cuenta:',
      items: ['Las contrase\u00f1as se encriptan usando algoritmos de hash est\u00e1ndar de la industria', 'Toda la transmisi\u00f3n de datos est\u00e1 asegurada con encriptaci\u00f3n HTTPS', 'Nunca almacenamos contrase\u00f1as en texto plano', 'Auditor\u00edas de seguridad regulares y monitoreo'],
    },
    {
      heading: 'Tus Derechos y Control',
      intro: 'Tienes control total sobre tus datos:',
      items: ['**Acceso** \u2014 Consulta todos tus datos almacenados en el navegador en cualquier momento a trav\u00e9s de las herramientas de desarrollo de tu navegador', '**Exportaci\u00f3n** \u2014 Descarga los datos de tu curr\u00edculum en PDF u otros formatos', '**Eliminaci\u00f3n** \u2014 Borra el almacenamiento de tu navegador o elimina tu cuenta en cualquier momento', '**Portabilidad** \u2014 Tus datos son tuyos para llevarlos a donde quieras'],
    },
    {
      heading: 'Lo Que No Hacemos',
      intro: 'Estamos comprometidos con pr\u00e1cticas \u00e9ticas de datos. Esto es lo que nunca haremos:',
      items: ['Vender tu informaci\u00f3n personal a terceros', 'Usar el contenido de tu curr\u00edculum con fines publicitarios', 'Compartir tu informaci\u00f3n con reclutadores sin tu consentimiento expl\u00edcito', 'Rastrear tu actividad de navegaci\u00f3n en otros sitios web', 'Almacenar el contenido de tu curr\u00edculum en nuestros servidores'],
    },
    {
      heading: 'Cookies y An\u00e1lisis',
      intro: 'Usamos cookies m\u00ednimas y esenciales para:',
      items: ['Mantener tu sesi\u00f3n iniciada en tu cuenta', 'Recordar tus preferencias de idioma y tema', 'An\u00e1lisis de uso an\u00f3nimo para mejorar nuestro servicio'],
    },
    {
      heading: 'Cont\u00e1ctanos',
    },
  ],
  contactText: 'Si tienes alguna pregunta sobre nuestras pr\u00e1cticas de privacidad o deseas ejercer tus derechos sobre tus datos, cont\u00e1ctanos en',
  cta: {
    title: 'Crea tu curr\u00edculum con',
    titleHighlight: 'confianza y privacidad',
    subtitle: 'Tus datos profesionales se quedan contigo. Comienza a crear tu curr\u00edculum profesional hoy.',
    primaryBtn: 'Comenzar Gratis',
    secondaryBtn: 'Conoce M\u00e1s Sobre Nosotros',
  },
  lastUpdated: '\u00daltima actualizaci\u00f3n: enero 2026',
};

const contentMap: Record<string, PrivacyContent> = { en, es };

export function getContent(locale: string) { return selectContent(contentMap, locale); }
