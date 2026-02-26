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

const fr: PrivacyContent = {
  hero: {
    badge: 'Politique de Confidentialité',
    title: 'Votre vie privée est',
    titleHighlight: 'notre priorité',
    subtitle: "Chez Best AI Resume, nous croyons que vos données personnelles vous appartiennent. Nous avons conçu notre plateforme avec une approche axée sur la confidentialité qui garde vos informations sous votre contrôle.",
  },
  highlights: [
    { title: 'Vos Données Restent Locales', text: "Tout le contenu de votre CV, expérience professionnelle, formation et compétences sont stockés localement dans le stockage de votre navigateur — jamais sur nos serveurs." },
    { title: 'Données Serveur Minimales', text: "Nous ne stockons que votre adresse e-mail et votre mot de passe sur nos serveurs pour l\u2019authentification du compte. Rien d\u2019autre. Aucun contenu de CV, aucune donnée personnelle." },
    { title: 'Transparence Totale', text: "Nous croyons en une transparence complète. Vous pouvez voir exactement quelles données sont stockées dans votre navigateur et les supprimer à tout moment." },
  ],
  sections: [
    {
      heading: 'Quelles Données Nous Collectons',
      subsections: [
        { subheading: 'Données Stockées sur Nos Serveurs (Minimal)', items: ['**Adresse e-mail** — Utilisée pour l\u2019authentification du compte et les mises à jour importantes du service', '**Mot de passe (chiffré)** — Haché de manière sécurisée et stocké pour l\u2019authentification'] },
        { subheading: 'Données Stockées Localement dans Votre Navigateur', items: ['Informations personnelles (nom, coordonnées, adresse)', 'Expérience professionnelle et historique d\u2019emploi', 'Formation et certifications', 'Compétences, langues et réalisations', 'Modèles de CV et préférences de personnalisation'] },
      ],
    },
    {
      heading: 'Pourquoi Nous Utilisons le Stockage du Navigateur',
      intro: 'Nous avons choisi le stockage du navigateur (localStorage) comme méthode principale de stockage des données pour plusieurs raisons importantes\u00a0:',
      items: ['**Confidentialité Maximale** — Vos informations professionnelles sensibles ne quittent jamais votre appareil', '**Aucune Fuite de Données** — Puisque nous ne stockons pas les données de votre CV, elles ne peuvent pas être compromises lors d\u2019une violation de serveur', '**Contrôle Total** — Vous pouvez consulter, exporter ou supprimer vos données à tout moment via les paramètres de votre navigateur', '**Performance Rapide** — Le stockage local signifie un accès instantané à vos données sans latence serveur'],
    },
    {
      heading: 'Comment Nous Protégeons Votre Compte',
      intro: 'Bien que nous minimisions les données côté serveur, nous prenons très au sérieux la sécurité de vos identifiants de compte\u00a0:',
      items: ['Les mots de passe sont chiffrés à l\u2019aide d\u2019algorithmes de hachage conformes aux normes de l\u2019industrie', 'Toutes les transmissions de données sont sécurisées par chiffrement HTTPS', 'Nous ne stockons jamais les mots de passe en texte clair', 'Audits de sécurité réguliers et surveillance continue'],
    },
    {
      heading: 'Vos Droits et Votre Contrôle',
      intro: 'Vous avez un contrôle total sur vos données\u00a0:',
      items: ['**Accès** — Consultez toutes vos données stockées dans le navigateur à tout moment via les outils de développement de votre navigateur', '**Exportation** — Téléchargez les données de votre CV en PDF ou dans d\u2019autres formats', '**Suppression** — Effacez le stockage de votre navigateur ou supprimez votre compte à tout moment', '**Portabilité** — Vos données vous appartiennent et vous pouvez les emporter où vous voulez'],
    },
    {
      heading: 'Ce Que Nous Ne Faisons Pas',
      intro: 'Nous nous engageons à des pratiques éthiques en matière de données. Voici ce que nous ne ferons jamais\u00a0:',
      items: ['Vendre vos informations personnelles à des tiers', 'Utiliser le contenu de votre CV à des fins publicitaires', 'Partager vos informations avec des recruteurs sans votre consentement explicite', 'Suivre votre activité de navigation sur d\u2019autres sites web', 'Stocker le contenu de votre CV sur nos serveurs'],
    },
    {
      heading: 'Cookies et Analyses',
      intro: 'Nous utilisons des cookies minimaux et essentiels pour\u00a0:',
      items: ['Maintenir votre connexion à votre compte', 'Mémoriser vos préférences de langue et de thème', 'Analyses d\u2019utilisation anonymes pour améliorer notre service'],
    },
    {
      heading: 'Contactez-nous',
    },
  ],
  contactText: 'Si vous avez des questions sur nos pratiques de confidentialité ou si vous souhaitez exercer vos droits sur vos données, veuillez nous contacter à',
  cta: {
    title: 'Créez votre CV en toute',
    titleHighlight: 'confiance et confidentialité',
    subtitle: 'Vos données professionnelles restent avec vous. Commencez à créer votre CV professionnel dès aujourd\u2019hui.',
    primaryBtn: 'Commencer Gratuitement',
    secondaryBtn: 'En Savoir Plus Sur Nous',
  },
  lastUpdated: 'Dernière mise à jour\u00a0: janvier 2026',
};

const de: PrivacyContent = {
  hero: {
    badge: 'Datenschutzrichtlinie',
    title: 'Ihre Privatsphäre ist',
    titleHighlight: 'unsere Priorität',
    subtitle: 'Bei Best AI Resume glauben wir, dass Ihre persönlichen Daten Ihnen gehören. Wir haben unsere Plattform mit einem Datenschutz-zuerst-Ansatz entwickelt, der Ihre Informationen unter Ihrer Kontrolle hält.',
  },
  highlights: [
    { title: 'Ihre Daten Bleiben Lokal', text: 'Alle Ihre Lebenslauf-Inhalte, Berufserfahrung, Ausbildung und Fähigkeiten werden lokal im Speicher Ihres Browsers gespeichert — niemals auf unseren Servern.' },
    { title: 'Minimale Serverdaten', text: 'Wir speichern nur Ihre E-Mail-Adresse und Ihr Passwort auf unseren Servern zur Kontoauthentifizierung. Nichts anderes. Keine Lebenslauf-Inhalte, keine persönlichen Daten.' },
    { title: 'Vollständige Transparenz', text: 'Wir glauben an vollständige Transparenz. Sie können genau sehen, welche Daten in Ihrem Browser gespeichert sind, und diese jederzeit löschen.' },
  ],
  sections: [
    {
      heading: 'Welche Daten Wir Erheben',
      subsections: [
        { subheading: 'Auf Unseren Servern Gespeicherte Daten (Minimal)', items: ['**E-Mail-Adresse** — Wird für die Kontoauthentifizierung und wichtige Service-Updates verwendet', '**Passwort (verschlüsselt)** — Sicher gehasht und für die Authentifizierung gespeichert'] },
        { subheading: 'Lokal in Ihrem Browser Gespeicherte Daten', items: ['Persönliche Informationen (Name, Kontaktdaten, Adresse)', 'Berufserfahrung und Beschäftigungshistorie', 'Ausbildung und Zertifizierungen', 'Fähigkeiten, Sprachen und Erfolge', 'Lebenslauf-Vorlagen und Anpassungseinstellungen'] },
      ],
    },
    {
      heading: 'Warum Wir Browser-Speicher Verwenden',
      intro: 'Wir haben den Browser-Speicher (localStorage) als unsere primäre Datenspeichermethode aus mehreren wichtigen Gründen gewählt:',
      items: ['**Maximaler Datenschutz** — Ihre sensiblen Karriereinformationen verlassen niemals Ihr Gerät', '**Keine Datenlecks** — Da wir Ihre Lebenslauf-Daten nicht speichern, können sie bei einem Servereinbruch nicht kompromittiert werden', '**Vollständige Kontrolle** — Sie können Ihre Daten jederzeit über die Einstellungen Ihres Browsers einsehen, exportieren oder löschen', '**Schnelle Leistung** — Lokaler Speicher bedeutet sofortigen Zugriff auf Ihre Daten ohne Server-Latenz'],
    },
    {
      heading: 'Wie Wir Ihr Konto Schützen',
      intro: 'Obwohl wir die serverseitigen Daten minimieren, nehmen wir die Sicherheit Ihrer Kontoanmeldedaten sehr ernst:',
      items: ['Passwörter werden mit branchenüblichen Hash-Algorithmen verschlüsselt', 'Alle Datenübertragungen sind mit HTTPS-Verschlüsselung gesichert', 'Wir speichern Passwörter niemals im Klartext', 'Regelmäßige Sicherheitsprüfungen und Überwachung'],
    },
    {
      heading: 'Ihre Rechte und Kontrolle',
      intro: 'Sie haben die vollständige Kontrolle über Ihre Daten:',
      items: ['**Zugriff** — Sehen Sie alle in Ihrem Browser gespeicherten Daten jederzeit über die Entwicklertools Ihres Browsers ein', '**Export** — Laden Sie Ihre Lebenslauf-Daten als PDF oder in anderen Formaten herunter', '**Löschung** — Löschen Sie Ihren Browser-Speicher oder Ihr Konto jederzeit', '**Portabilität** — Ihre Daten gehören Ihnen und Sie können sie überallhin mitnehmen'],
    },
    {
      heading: 'Was Wir Nicht Tun',
      intro: 'Wir verpflichten uns zu ethischen Datenpraktiken. Folgendes werden wir niemals tun:',
      items: ['Ihre persönlichen Informationen an Dritte verkaufen', 'Ihre Lebenslauf-Inhalte für Werbezwecke verwenden', 'Ihre Informationen ohne Ihre ausdrückliche Zustimmung an Personalvermittler weitergeben', 'Ihre Browsing-Aktivitäten auf anderen Websites verfolgen', 'Ihre Lebenslauf-Inhalte auf unseren Servern speichern'],
    },
    {
      heading: 'Cookies und Analysen',
      intro: 'Wir verwenden minimale, wesentliche Cookies für:',
      items: ['Die Aufrechterhaltung Ihrer Anmeldung in Ihrem Konto', 'Das Speichern Ihrer Sprach- und Theme-Einstellungen', 'Anonyme Nutzungsanalysen zur Verbesserung unseres Dienstes'],
    },
    {
      heading: 'Kontaktieren Sie Uns',
    },
  ],
  contactText: 'Wenn Sie Fragen zu unseren Datenschutzpraktiken haben oder Ihre Datenrechte ausüben möchten, kontaktieren Sie uns bitte unter',
  cta: {
    title: 'Erstellen Sie Ihren Lebenslauf mit',
    titleHighlight: 'Vertrauen und Datenschutz',
    subtitle: 'Ihre Karrieredaten bleiben bei Ihnen. Beginnen Sie noch heute mit der Erstellung Ihres professionellen Lebenslaufs.',
    primaryBtn: 'Kostenlos Starten',
    secondaryBtn: 'Mehr Über Uns Erfahren',
  },
  lastUpdated: 'Letzte Aktualisierung: Januar 2026',
};

const ar: PrivacyContent = {
  hero: {
    badge: 'سياسة الخصوصية',
    title: 'خصوصيتك هي',
    titleHighlight: 'أولويتنا',
    subtitle: 'في Best AI Resume، نؤمن بأن بياناتك الشخصية ملك لك. لقد بنينا منصتنا بنهج يضع الخصوصية أولاً ويبقي معلوماتك تحت سيطرتك.',
  },
  highlights: [
    { title: 'بياناتك تبقى محلية', text: 'جميع محتويات سيرتك الذاتية وخبراتك المهنية وتعليمك ومهاراتك تُخزَّن محلياً في متصفحك — وليس على خوادمنا أبداً.' },
    { title: 'بيانات خادم محدودة', text: 'نحن نخزن فقط عنوان بريدك الإلكتروني وكلمة المرور على خوادمنا للمصادقة على الحساب. لا شيء آخر. لا محتوى سيرة ذاتية، ولا تفاصيل شخصية.' },
    { title: 'شفافية كاملة', text: 'نؤمن بالشفافية الكاملة. يمكنك رؤية البيانات المخزنة في متصفحك بالضبط وحذفها في أي وقت تشاء.' },
  ],
  sections: [
    {
      heading: 'ما البيانات التي نجمعها',
      subsections: [
        { subheading: 'البيانات المخزنة على خوادمنا (الحد الأدنى)', items: ['**عنوان البريد الإلكتروني** — يُستخدم للمصادقة على الحساب وتحديثات الخدمة المهمة', '**كلمة المرور (مشفرة)** — مُجزَّأة بشكل آمن ومخزنة للمصادقة'] },
        { subheading: 'البيانات المخزنة محلياً في متصفحك', items: ['المعلومات الشخصية (الاسم، بيانات الاتصال، العنوان)', 'الخبرة المهنية وتاريخ التوظيف', 'التعليم والشهادات', 'المهارات واللغات والإنجازات', 'قوالب السيرة الذاتية وتفضيلات التخصيص'] },
      ],
    },
    {
      heading: 'لماذا نستخدم تخزين المتصفح',
      intro: 'اخترنا تخزين المتصفح (localStorage) كطريقة أساسية لتخزين البيانات لعدة أسباب مهمة:',
      items: ['**أقصى خصوصية** — معلوماتك المهنية الحساسة لا تغادر جهازك أبداً', '**لا تسريب للبيانات** — بما أننا لا نخزن بيانات سيرتك الذاتية، فلا يمكن اختراقها في حالة اختراق الخادم', '**تحكم كامل** — يمكنك عرض بياناتك أو تصديرها أو حذفها في أي وقت من خلال إعدادات متصفحك', '**أداء سريع** — التخزين المحلي يعني وصولاً فورياً إلى بياناتك بدون تأخير من الخادم'],
    },
    {
      heading: 'كيف نحمي حسابك',
      intro: 'بينما نقلل البيانات المخزنة على الخادم، نأخذ أمان بيانات اعتماد حسابك على محمل الجد:',
      items: ['يتم تشفير كلمات المرور باستخدام خوارزميات تجزئة متوافقة مع معايير الصناعة', 'جميع عمليات نقل البيانات مؤمنة بتشفير HTTPS', 'لا نخزن كلمات المرور أبداً كنص عادي', 'عمليات تدقيق أمني منتظمة ومراقبة مستمرة'],
    },
    {
      heading: 'حقوقك وتحكمك',
      intro: 'لديك تحكم كامل في بياناتك:',
      items: ['**الوصول** — اطلع على جميع بياناتك المخزنة في المتصفح في أي وقت من خلال أدوات المطور في متصفحك', '**التصدير** — قم بتنزيل بيانات سيرتك الذاتية بصيغة PDF أو صيغ أخرى', '**الحذف** — امسح تخزين متصفحك أو احذف حسابك في أي وقت', '**قابلية النقل** — بياناتك ملكك ويمكنك أخذها أينما تشاء'],
    },
    {
      heading: 'ما لا نفعله',
      intro: 'نحن ملتزمون بممارسات بيانات أخلاقية. إليك ما لن نفعله أبداً:',
      items: ['بيع معلوماتك الشخصية لأطراف ثالثة', 'استخدام محتوى سيرتك الذاتية لأغراض إعلانية', 'مشاركة معلوماتك مع مسؤولي التوظيف بدون موافقتك الصريحة', 'تتبع نشاط تصفحك عبر مواقع ويب أخرى', 'تخزين محتوى سيرتك الذاتية على خوادمنا'],
    },
    {
      heading: 'ملفات تعريف الارتباط والتحليلات',
      intro: 'نستخدم ملفات تعريف ارتباط أساسية ومحدودة من أجل:',
      items: ['الحفاظ على تسجيل دخولك في حسابك', 'تذكر تفضيلات اللغة والمظهر الخاصة بك', 'تحليلات استخدام مجهولة لتحسين خدمتنا'],
    },
    {
      heading: 'اتصل بنا',
    },
  ],
  contactText: 'إذا كانت لديك أي أسئلة حول ممارسات الخصوصية لدينا أو ترغب في ممارسة حقوقك المتعلقة ببياناتك، يرجى التواصل معنا على',
  cta: {
    title: 'أنشئ سيرتك الذاتية بكل',
    titleHighlight: 'ثقة وخصوصية',
    subtitle: 'بياناتك المهنية تبقى معك. ابدأ بإنشاء سيرتك الذاتية الاحترافية اليوم.',
    primaryBtn: 'ابدأ مجاناً',
    secondaryBtn: 'تعرف علينا',
  },
  lastUpdated: 'آخر تحديث: يناير 2026',
};

const ja: PrivacyContent = {
  hero: {
    badge: 'プライバシーポリシー',
    title: 'あなたのプライバシーは',
    titleHighlight: '最優先事項です',
    subtitle: 'Best AI Resumeでは、個人データはあなたのものであると信じています。プライバシー第一のアプローチでプラットフォームを構築し、あなたの情報をあなた自身の管理下に置きます。',
  },
  highlights: [
    { title: 'データはローカルに保存', text: '履歴書のすべてのコンテンツ、職歴、学歴、スキルはブラウザのローカルストレージに保存され、当社のサーバーには送信されません。' },
    { title: '最小限のサーバーデータ', text: 'サーバーに保存するのはアカウント認証のためのメールアドレスとパスワードのみです。それ以外の履歴書コンテンツや個人情報は一切保存しません。' },
    { title: '完全な透明性', text: '完全な透明性を信じています。ブラウザに保存されているデータを正確に確認でき、いつでも削除可能です。' },
  ],
  sections: [
    {
      heading: '収集するデータ',
      subsections: [
        { subheading: 'サーバーに保存するデータ（最小限）', items: ['**メールアドレス** — アカウント認証と重要なサービス更新に使用', '**パスワード（暗号化済み）** — 安全にハッシュ化され認証用に保存'] },
        { subheading: 'ブラウザにローカル保存されるデータ', items: ['個人情報（名前、連絡先、住所）', '職歴・雇用履歴', '学歴・資格', 'スキル、言語、実績', '履歴書テンプレートとカスタマイズ設定'] },
      ],
    },
    {
      heading: 'ブラウザストレージを使用する理由',
      intro: 'ブラウザストレージ（localStorage）を主要なデータ保存方法として選択した重要な理由があります：',
      items: ['**最大限のプライバシー** — 機密性の高いキャリア情報がデバイスの外に出ることはありません', '**データ漏洩のリスクなし** — 履歴書データを保存しないため、サーバー侵害で漏洩することはありません', '**完全なコントロール** — ブラウザの設定からいつでもデータの閲覧、エクスポート、削除が可能', '**高速パフォーマンス** — ローカルストレージによりサーバーの遅延なく即座にデータにアクセス'],
    },
    {
      heading: 'アカウントの保護方法',
      intro: 'サーバー側のデータを最小限にしつつ、アカウント認証情報のセキュリティには真剣に取り組んでいます：',
      items: ['業界標準のハッシュアルゴリズムでパスワードを暗号化', 'すべてのデータ送信をHTTPS暗号化で保護', 'パスワードを平文で保存することは決してありません', '定期的なセキュリティ監査とモニタリング'],
    },
    {
      heading: 'あなたの権利と管理',
      intro: 'データの完全な管理権があります：',
      items: ['**アクセス** — ブラウザの開発者ツールを通じていつでもブラウザに保存されたデータを確認可能', '**エクスポート** — 履歴書データをPDFや他の形式でダウンロード', '**削除** — ブラウザのストレージをクリアまたはアカウントをいつでも削除可能', '**ポータビリティ** — データはあなたのものであり、どこにでも持ち運び可能'],
    },
    {
      heading: '行わないこと',
      intro: '私たちは倫理的なデータ慣行に取り組んでいます。以下のことは決して行いません：',
      items: ['個人情報を第三者に販売すること', '履歴書の内容を広告目的に使用すること', '明示的な同意なく採用担当者と情報を共有すること', '他のウェブサイトでのブラウジング活動を追跡すること', '履歴書の内容をサーバーに保存すること'],
    },
    {
      heading: 'Cookieと分析',
      intro: '最小限の必須Cookieを以下の目的で使用しています：',
      items: ['アカウントへのログイン状態の維持', '言語とテーマの設定の記憶', 'サービス改善のための匿名の使用状況分析'],
    },
    {
      heading: 'お問い合わせ',
    },
  ],
  contactText: 'プライバシーに関するご質問やデータの権利行使については、以下までお問い合わせください',
  cta: {
    title: '安心とプライバシーのもとで',
    titleHighlight: '履歴書を作成',
    subtitle: 'キャリアデータはあなたのもとに。今日からプロフェッショナルな履歴書の作成を始めましょう。',
    primaryBtn: '無料で始める',
    secondaryBtn: '詳細を見る',
  },
  lastUpdated: '最終更新：2026年1月',
};

const contentMap: Record<string, PrivacyContent> = { en, es, fr, de, ar, ja };

export function getContent(locale: string) { return selectContent(contentMap, locale); }
