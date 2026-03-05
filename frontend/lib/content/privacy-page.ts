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

const it: PrivacyContent = {
  hero: {
    badge: 'Informativa sulla Privacy',
    title: 'La tua privacy \u00e8',
    titleHighlight: 'la nostra priorit\u00e0',
    subtitle: 'In Best AI Resume crediamo che i tuoi dati personali appartengano a te. Abbiamo costruito la nostra piattaforma con un approccio incentrato sulla privacy, in conformit\u00e0 con il GDPR (Regolamento Generale sulla Protezione dei Dati) e la normativa italiana in materia.',
  },
  highlights: [
    { title: 'I Tuoi Dati Restano Locali', text: 'Tutti i contenuti del tuo curriculum vitae\u2014esperienze lavorative, formazione e competenze\u2014sono salvati localmente nel tuo browser, mai sui nostri server.' },
    { title: 'Dati Server Minimi', text: 'Conserviamo sui nostri server solo il tuo indirizzo e-mail e la password per l\u2019autenticazione dell\u2019account. Nient\u2019altro. Nessun contenuto del CV, nessun dato personale aggiuntivo.' },
    { title: 'Trasparenza Totale', text: 'Crediamo nella trasparenza completa. Puoi verificare esattamente quali dati sono salvati nel tuo browser e cancellarli in qualsiasi momento.' },
  ],
  sections: [
    {
      heading: 'Quali Dati Raccogliamo',
      subsections: [
        { subheading: 'Dati Conservati sui Nostri Server (Minimi)', items: ['**Indirizzo e-mail** \u2014 Utilizzato per l\u2019autenticazione dell\u2019account e comunicazioni importanti sul servizio', '**Password (crittografata)** \u2014 Salvata in forma di hash sicuro per l\u2019autenticazione'] },
        { subheading: 'Dati Conservati Localmente nel Tuo Browser', items: ['Informazioni personali (nome, recapiti, indirizzo)', 'Esperienze lavorative e storia professionale', 'Istruzione e certificazioni', 'Competenze, lingue e traguardi raggiunti', 'Modelli di CV e preferenze di personalizzazione'] },
      ],
    },
    {
      heading: 'Perch\u00e9 Utilizziamo lo Storage del Browser',
      intro: 'Abbiamo scelto lo storage del browser (localStorage) come metodo principale di salvataggio dei dati per diverse ragioni importanti:',
      items: ['**Massima Privacy** \u2014 Le tue informazioni professionali sensibili non lasciano mai il tuo dispositivo', '**Nessuna Violazione di Dati** \u2014 Poich\u00e9 non conserviamo i dati del tuo CV, non possono essere compromessi in caso di violazione del server', '**Controllo Totale** \u2014 Puoi visualizzare, esportare o eliminare i tuoi dati in qualsiasi momento dalle impostazioni del browser', '**Prestazioni Elevate** \u2014 Lo storage locale garantisce accesso istantaneo ai tuoi dati senza latenza del server'],
    },
    {
      heading: 'Come Proteggiamo il Tuo Account',
      intro: 'Pur minimizzando i dati lato server, prendiamo molto seriamente la sicurezza delle tue credenziali:',
      items: ['Le password sono crittografate con algoritmi di hashing conformi agli standard di settore', 'Tutte le trasmissioni di dati sono protette con crittografia HTTPS', 'Le password non vengono mai memorizzate in chiaro', 'Audit di sicurezza periodici e monitoraggio continuo'],
    },
    {
      heading: 'I Tuoi Diritti e il Tuo Controllo',
      intro: 'In conformit\u00e0 con il GDPR e il D.lgs. 196/2003 (Codice Privacy italiano), hai il pieno controllo sui tuoi dati:',
      items: ['**Accesso** \u2014 Puoi consultare tutti i dati salvati nel browser in qualsiasi momento tramite gli strumenti per sviluppatori del browser', '**Esportazione** \u2014 Scarica i dati del tuo CV in formato PDF o altri formati', '**Cancellazione** \u2014 Svuota lo storage del browser o elimina il tuo account in qualsiasi momento', '**Portabilit\u00e0** \u2014 I tuoi dati sono tuoi e puoi portarli ovunque, come garantito dall\u2019art. 20 del GDPR'],
    },
    {
      heading: 'Cosa Non Facciamo',
      intro: 'Ci impegniamo a rispettare pratiche etiche nella gestione dei dati. Ecco cosa non faremo mai:',
      items: ['Vendere le tue informazioni personali a terzi', 'Utilizzare i contenuti del tuo CV a scopi pubblicitari', 'Condividere i tuoi dati con recruiter senza il tuo consenso esplicito', 'Tracciare la tua attivit\u00e0 di navigazione su altri siti web', 'Conservare i contenuti del tuo curriculum vitae sui nostri server'],
    },
    {
      heading: 'Cookie e Analisi',
      intro: 'Utilizziamo cookie minimi ed essenziali per:',
      items: ['Mantenere attiva la tua sessione di login', 'Ricordare le tue preferenze di lingua e tema', 'Analisi anonime sull\u2019utilizzo per migliorare il servizio'],
    },
    {
      heading: 'Contattaci',
    },
  ],
  contactText: 'Per qualsiasi domanda sulle nostre pratiche in materia di privacy o per esercitare i tuoi diritti sui dati personali (come previsto dal GDPR e dal Garante per la Protezione dei Dati Personali), contattaci all\u2019indirizzo',
  cta: {
    title: 'Crea il tuo curriculum vitae con',
    titleHighlight: 'fiducia e privacy',
    subtitle: 'I tuoi dati professionali restano con te. Inizia a creare il tuo CV professionale oggi.',
    primaryBtn: 'Inizia Gratis',
    secondaryBtn: 'Scopri Chi Siamo',
  },
  lastUpdated: 'Ultimo aggiornamento: gennaio 2026',
};

const vi: PrivacyContent = {
  hero: {
    badge: 'Chính Sách Bảo Mật',
    title: 'Quyền riêng tư của bạn là',
    titleHighlight: 'ưu tiên hàng đầu',
    subtitle: 'Tại Best AI Resume, chúng tôi tin rằng dữ liệu cá nhân thuộc về bạn. Nền tảng của chúng tôi được xây dựng với nguyên tắc bảo mật đặt lên hàng đầu, giúp bạn kiểm soát hoàn toàn thông tin của mình.',
  },
  highlights: [
    { title: 'Dữ Liệu Lưu Trên Máy Bạn', text: 'Toàn bộ nội dung CV—kinh nghiệm làm việc, học vấn và kỹ năng—được lưu trữ trên trình duyệt của bạn, không bao giờ lên máy chủ của chúng tôi.' },
    { title: 'Dữ Liệu Server Tối Thiểu', text: 'Chúng tôi chỉ lưu trữ email và mật khẩu trên server để xác thực tài khoản. Không lưu nội dung CV hay bất kỳ thông tin cá nhân nào khác.' },
    { title: 'Minh Bạch Tuyệt Đối', text: 'Chúng tôi tin vào sự minh bạch hoàn toàn. Bạn có thể xem chính xác dữ liệu nào được lưu trong trình duyệt và xóa bất kỳ lúc nào.' },
  ],
  sections: [
    {
      heading: 'Dữ Liệu Chúng Tôi Thu Thập',
      subsections: [
        { subheading: 'Dữ Liệu Lưu Trên Server (Tối Thiểu)', items: ['**Địa chỉ email** \u2014 Dùng để xác thực tài khoản và thông báo quan trọng về dịch vụ', '**Mật khẩu (đã mã hóa)** \u2014 Được băm an toàn để xác thực'] },
        { subheading: 'Dữ Liệu Lưu Trên Trình Duyệt', items: ['Thông tin cá nhân (tên, thông tin liên hệ, địa chỉ)', 'Kinh nghiệm làm việc và lịch sử công tác', 'Học vấn và chứng chỉ', 'Kỹ năng, ngoại ngữ và thành tích', 'Mẫu CV và tùy chọn cá nhân hóa'] },
      ],
    },
    {
      heading: 'Tại Sao Chúng Tôi Dùng Bộ Nhớ Trình Duyệt',
      intro: 'Chúng tôi chọn bộ nhớ trình duyệt (localStorage) làm phương thức lưu trữ chính vì nhiều lý do quan trọng:',
      items: ['**Bảo Mật Tối Đa** \u2014 Thông tin nghề nghiệp nhạy cảm không bao giờ rời khỏi thiết bị của bạn', '**Không Rò Rỉ Dữ Liệu** \u2014 Vì chúng tôi không lưu dữ liệu CV, nên không thể bị xâm phạm khi server gặp sự cố', '**Kiểm Soát Hoàn Toàn** \u2014 Bạn có thể xem, xuất hoặc xóa dữ liệu bất kỳ lúc nào qua cài đặt trình duyệt', '**Hiệu Suất Cao** \u2014 Lưu trữ cục bộ giúp truy cập dữ liệu tức thì không cần chờ server'],
    },
    {
      heading: 'Cách Chúng Tôi Bảo Vệ Tài Khoản',
      intro: 'Dù tối thiểu hóa dữ liệu phía server, chúng tôi rất nghiêm túc trong việc bảo mật thông tin đăng nhập:',
      items: ['Mật khẩu được mã hóa bằng thuật toán băm tiêu chuẩn ngành', 'Tất cả truyền tải dữ liệu được bảo vệ bằng mã hóa HTTPS', 'Mật khẩu không bao giờ được lưu dạng văn bản thuần', 'Kiểm tra và giám sát bảo mật định kỳ'],
    },
    {
      heading: 'Quyền Và Kiểm Soát Của Bạn',
      intro: 'Bạn có toàn quyền kiểm soát dữ liệu của mình:',
      items: ['**Truy Cập** \u2014 Xem tất cả dữ liệu trong trình duyệt bất kỳ lúc nào qua công cụ nhà phát triển', '**Xuất Dữ Liệu** \u2014 Tải CV dưới dạng PDF hoặc các định dạng khác', '**Xóa** \u2014 Xóa bộ nhớ trình duyệt hoặc xóa tài khoản bất kỳ lúc nào', '**Di Chuyển** \u2014 Dữ liệu là của bạn, bạn có thể mang đi bất cứ đâu'],
    },
    {
      heading: 'Những Điều Chúng Tôi Không Làm',
      intro: 'Chúng tôi cam kết thực hành đạo đức trong quản lý dữ liệu:',
      items: ['Bán thông tin cá nhân cho bên thứ ba', 'Sử dụng nội dung CV cho mục đích quảng cáo', 'Chia sẻ dữ liệu với nhà tuyển dụng mà không có sự đồng ý rõ ràng của bạn', 'Theo dõi hoạt động duyệt web của bạn trên các trang khác', 'Lưu trữ nội dung CV trên server của chúng tôi'],
    },
    {
      heading: 'Cookie và Phân Tích',
      intro: 'Chúng tôi sử dụng cookie tối thiểu và cần thiết để:',
      items: ['Duy trì phiên đăng nhập', 'Ghi nhớ tùy chọn ngôn ngữ và giao diện', 'Phân tích ẩn danh để cải thiện dịch vụ'],
    },
    {
      heading: 'Liên Hệ',
    },
  ],
  contactText: 'Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật hoặc muốn thực hiện quyền kiểm soát dữ liệu cá nhân, vui lòng liên hệ',
  cta: {
    title: 'Tạo CV chuyên nghiệp với',
    titleHighlight: 'sự tin tưởng và bảo mật',
    subtitle: 'Dữ liệu nghề nghiệp của bạn luôn thuộc về bạn. Bắt đầu tạo CV chuyên nghiệp ngay hôm nay.',
    primaryBtn: 'Bắt Đầu Miễn Phí',
    secondaryBtn: 'Tìm Hiểu Về Chúng Tôi',
  },
  lastUpdated: 'Cập nhật lần cuối: tháng 1 năm 2026',
};

const ko: PrivacyContent = {
  hero: {
    badge: '개인정보 처리방침',
    title: '여러분의 개인정보는',
    titleHighlight: '최우선 보호 대상입니다',
    subtitle: 'Best AI Resume에서는 개인 데이터가 여러분의 것이라고 믿습니다. 개인정보 보호를 최우선으로 하는 접근 방식으로 플랫폼을 구축하여, 여러분의 정보가 여러분의 관리 하에 있도록 합니다.',
  },
  highlights: [
    { title: '데이터는 로컬에 보관', text: '이력서의 모든 내용, 경력사항, 학력, 기술 정보는 브라우저의 로컬 저장소에 저장되며, 당사 서버에는 전송되지 않습니다.' },
    { title: '최소한의 서버 데이터', text: '서버에 저장하는 것은 계정 인증을 위한 이메일 주소와 비밀번호뿐입니다. 이력서 내용이나 개인 정보는 일절 저장하지 않습니다.' },
    { title: '완전한 투명성', text: '완전한 투명성을 지향합니다. 브라우저에 저장된 데이터를 정확히 확인할 수 있으며, 언제든지 삭제할 수 있습니다.' },
  ],
  sections: [
    {
      heading: '수집하는 데이터',
      subsections: [
        { subheading: '서버에 저장하는 데이터(최소한)', items: ['**이메일 주소** — 계정 인증 및 중요한 서비스 업데이트에 사용', '**비밀번호(암호화됨)** — 안전하게 해시 처리되어 인증용으로 저장'] },
        { subheading: '브라우저에 로컬 저장되는 데이터', items: ['개인 정보(이름, 연락처, 주소)', '경력사항 및 근무 이력', '학력 및 자격증', '기술, 언어, 성과', '이력서 템플릿 및 맞춤 설정'] },
      ],
    },
    {
      heading: '브라우저 저장소를 사용하는 이유',
      intro: '브라우저 저장소(localStorage)를 주요 데이터 저장 방식으로 선택한 중요한 이유가 있습니다:',
      items: ['**최대한의 개인정보 보호** — 민감한 경력 정보가 기기 밖으로 유출되지 않습니다', '**데이터 유출 위험 없음** — 이력서 데이터를 서버에 저장하지 않으므로, 서버 침해 시에도 유출되지 않습니다', '**완전한 통제** — 브라우저 설정을 통해 언제든지 데이터를 조회, 내보내기, 삭제할 수 있습니다', '**빠른 성능** — 로컬 저장으로 서버 지연 없이 즉시 데이터에 접근합니다'],
    },
    {
      heading: '계정 보호 방법',
      intro: '서버 측 데이터를 최소화하면서도 계정 인증 정보의 보안을 철저히 관리합니다:',
      items: ['업계 표준 해시 알고리즘으로 비밀번호를 암호화합니다', '모든 데이터 전송은 HTTPS 암호화로 보호됩니다', '비밀번호를 평문으로 저장하지 않습니다', '정기적인 보안 감사 및 모니터링을 실시합니다'],
    },
    {
      heading: '이용자의 권리와 통제',
      intro: '개인정보에 대한 완전한 관리 권한을 보유합니다:',
      items: ['**접근** — 브라우저 개발자 도구를 통해 언제든지 저장된 데이터를 확인할 수 있습니다', '**내보내기** — 이력서 데이터를 PDF 또는 다른 형식으로 다운로드할 수 있습니다', '**삭제** — 브라우저 저장소를 비우거나 계정을 언제든지 삭제할 수 있습니다', '**이동성** — 데이터는 이용자의 소유이며 원하는 곳으로 가져갈 수 있습니다'],
    },
    {
      heading: '하지 않는 일',
      intro: '윤리적인 데이터 처리를 준수합니다. 다음은 절대 하지 않겠다는 약속입니다:',
      items: ['이용자의 개인정보를 제3자에게 판매하는 행위', '이력서 내용을 광고 목적으로 사용하는 행위', '이용자의 명시적 동의 없이 채용 담당자에게 정보를 공유하는 행위', '다른 웹사이트에서의 브라우징 활동을 추적하는 행위', '이력서 내용을 당사 서버에 저장하는 행위'],
    },
    {
      heading: '쿠키 및 분석',
      intro: '최소한의 필수 쿠키를 다음 목적으로 사용합니다:',
      items: ['계정 로그인 상태 유지', '언어 및 테마 설정 기억', '서비스 개선을 위한 익명 사용 분석'],
    },
    {
      heading: '문의하기',
    },
  ],
  contactText: '개인정보 처리방침에 관한 질문이나 데이터 권리 행사를 원하시면 다음으로 연락해 주십시오',
  cta: {
    title: '안심하고 프라이버시가 보호되는 환경에서',
    titleHighlight: '이력서를 작성하세요',
    subtitle: '경력 데이터는 여러분의 것입니다. 지금 바로 전문적인 이력서 작성을 시작하세요.',
    primaryBtn: '무료로 시작하기',
    secondaryBtn: '더 알아보기',
  },
  lastUpdated: '최종 업데이트: 2026년 1월',
};

const th: PrivacyContent = {
  hero: {
    badge: 'นโยบายความเป็นส่วนตัว',
    title: 'ความเป็นส่วนตัวของคุณคือ',
    titleHighlight: 'สิ่งสำคัญสูงสุดของเรา',
    subtitle: 'ที่ Best AI Resume เราเชื่อว่าข้อมูลส่วนบุคคลเป็นของคุณ เราสร้างแพลตฟอร์มด้วยแนวทางที่ให้ความสำคัญกับความเป็นส่วนตัวเป็นอันดับแรก เพื่อให้คุณสามารถควบคุมข้อมูลของตนเองได้อย่างเต็มที่ ตามหลักการของพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA)',
  },
  highlights: [
    { title: 'ข้อมูลของคุณจัดเก็บในเครื่อง', text: 'ข้อมูลเรซูเม่ทั้งหมดของคุณ ประสบการณ์การทำงาน การศึกษา และทักษะ จะถูกจัดเก็บไว้ในเบราว์เซอร์ของคุณเท่านั้น ไม่มีการส่งไปยังเซิร์ฟเวอร์ของเรา' },
    { title: 'ข้อมูลบนเซิร์ฟเวอร์น้อยที่สุด', text: 'เราจัดเก็บเฉพาะอีเมลและรหัสผ่านบนเซิร์ฟเวอร์เพื่อการยืนยันตัวตนเท่านั้น ไม่มีข้อมูลเรซูเม่หรือข้อมูลส่วนบุคคลอื่นใด' },
    { title: 'ความโปร่งใสอย่างสมบูรณ์', text: 'เราเชื่อมั่นในความโปร่งใสอย่างเต็มที่ คุณสามารถตรวจสอบข้อมูลที่จัดเก็บในเบราว์เซอร์ได้อย่างชัดเจน และลบข้อมูลเหล่านั้นได้ทุกเมื่อ' },
  ],
  sections: [
    {
      heading: 'ข้อมูลที่เราเก็บรวบรวม',
      subsections: [
        { subheading: 'ข้อมูลที่จัดเก็บบนเซิร์ฟเวอร์ (น้อยที่สุด)', items: ['**อีเมล** \u2014 ใช้สำหรับการยืนยันตัวตนและการแจ้งเตือนสำคัญเกี่ยวกับบริการ', '**รหัสผ่าน (เข้ารหัสแล้ว)** \u2014 เข้ารหัสอย่างปลอดภัยด้วย Hash เพื่อการยืนยันตัวตน'] },
        { subheading: 'ข้อมูลที่จัดเก็บในเบราว์เซอร์ของคุณ', items: ['ข้อมูลส่วนบุคคล (ชื่อ ข้อมูลติดต่อ ที่อยู่)', 'ประสบการณ์การทำงานและประวัติการจ้างงาน', 'การศึกษาและใบรับรองต่าง ๆ', 'ทักษะ ภาษา และผลงาน', 'เทมเพลตเรซูเม่และการตั้งค่าส่วนบุคคล'] },
      ],
    },
    {
      heading: 'เหตุผลที่เราใช้พื้นที่จัดเก็บของเบราว์เซอร์',
      intro: 'เราเลือกใช้พื้นที่จัดเก็บของเบราว์เซอร์ (localStorage) เป็นวิธีจัดเก็บข้อมูลหลักด้วยเหตุผลสำคัญหลายประการ:',
      items: ['**ความเป็นส่วนตัวสูงสุด** \u2014 ข้อมูลอาชีพที่ละเอียดอ่อนของคุณจะไม่ออกจากอุปกรณ์ของคุณ', '**ไม่มีความเสี่ยงการรั่วไหลของข้อมูล** \u2014 เนื่องจากเราไม่ได้จัดเก็บข้อมูลเรซูเม่ ข้อมูลจึงไม่สามารถถูกเข้าถึงได้แม้เซิร์ฟเวอร์ถูกโจมตี', '**ควบคุมได้อย่างสมบูรณ์** \u2014 คุณสามารถดู ส่งออก หรือลบข้อมูลได้ทุกเมื่อผ่านการตั้งค่าเบราว์เซอร์', '**ประสิทธิภาพสูง** \u2014 การจัดเก็บในเครื่องช่วยให้เข้าถึงข้อมูลได้ทันทีโดยไม่ต้องรอเซิร์ฟเวอร์'],
    },
    {
      heading: 'วิธีการปกป้องบัญชีของคุณ',
      intro: 'แม้เราจะลดข้อมูลที่จัดเก็บบนเซิร์ฟเวอร์ให้น้อยที่สุด แต่เราให้ความสำคัญอย่างยิ่งกับความปลอดภัยของข้อมูลยืนยันตัวตน:',
      items: ['รหัสผ่านถูกเข้ารหัสด้วยอัลกอริทึมแฮชตามมาตรฐานอุตสาหกรรม', 'การรับส่งข้อมูลทั้งหมดได้รับการปกป้องด้วยการเข้ารหัส HTTPS', 'เราไม่มีการจัดเก็บรหัสผ่านในรูปแบบข้อความธรรมดา', 'มีการตรวจสอบและเฝ้าระวังด้านความปลอดภัยอย่างสม่ำเสมอ'],
    },
    {
      heading: 'สิทธิ์และการควบคุมของคุณ',
      intro: 'ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA) คุณมีสิทธิ์ในการควบคุมข้อมูลของคุณอย่างเต็มที่:',
      items: ['**เข้าถึง** \u2014 ดูข้อมูลทั้งหมดที่จัดเก็บในเบราว์เซอร์ได้ทุกเมื่อผ่านเครื่องมือสำหรับนักพัฒนา', '**ส่งออก** \u2014 ดาวน์โหลดข้อมูลเรซูเม่ในรูปแบบ PDF หรือรูปแบบอื่น ๆ', '**ลบ** \u2014 ล้างพื้นที่จัดเก็บของเบราว์เซอร์หรือลบบัญชีของคุณได้ทุกเมื่อ', '**เคลื่อนย้าย** \u2014 ข้อมูลของคุณเป็นของคุณ สามารถนำไปใช้ที่ใดก็ได้'],
    },
    {
      heading: 'สิ่งที่เราไม่ทำ',
      intro: 'เรายึดมั่นในหลักจริยธรรมด้านข้อมูล สิ่งต่อไปนี้เป็นสิ่งที่เราจะไม่ทำโดยเด็ดขาด:',
      items: ['ขายข้อมูลส่วนบุคคลของคุณให้กับบุคคลที่สาม', 'ใช้เนื้อหาเรซูเม่ของคุณเพื่อวัตถุประสงค์ทางโฆษณา', 'แชร์ข้อมูลของคุณกับผู้ว่าจ้างโดยไม่ได้รับความยินยอมอย่างชัดแจ้ง', 'ติดตามกิจกรรมการท่องเว็บของคุณในเว็บไซต์อื่น', 'จัดเก็บเนื้อหาเรซูเม่ของคุณบนเซิร์ฟเวอร์ของเรา'],
    },
    {
      heading: 'คุกกี้และการวิเคราะห์',
      intro: 'เราใช้คุกกี้ที่จำเป็นขั้นต่ำเพื่อ:',
      items: ['รักษาสถานะการเข้าสู่ระบบของคุณ', 'จดจำการตั้งค่าภาษาและธีมของคุณ', 'การวิเคราะห์การใช้งานแบบไม่ระบุตัวตนเพื่อปรับปรุงบริการ'],
    },
    {
      heading: 'ติดต่อเรา',
    },
  ],
  contactText: 'หากคุณมีคำถามเกี่ยวกับแนวปฏิบัติด้านความเป็นส่วนตัวของเราหรือต้องการใช้สิทธิ์ด้านข้อมูล กรุณาติดต่อเราที่',
  cta: {
    title: 'สร้างเรซูเม่ของคุณด้วย',
    titleHighlight: 'ความมั่นใจและความเป็นส่วนตัว',
    subtitle: 'ข้อมูลอาชีพของคุณอยู่กับคุณเสมอ เริ่มสร้างเรซูเม่มืออาชีพของคุณวันนี้',
    primaryBtn: 'เริ่มต้นฟรี',
    secondaryBtn: 'เรียนรู้เกี่ยวกับเรา',
  },
  lastUpdated: 'อัปเดตล่าสุด: มกราคม 2569',
};

const pt: PrivacyContent = {
  hero: {
    badge: 'Politica de Privacidade',
    title: 'Sua privacidade e',
    titleHighlight: 'nossa prioridade',
    subtitle: 'Na Best AI Resume, acreditamos que seus dados pessoais pertencem a voce. Nossa plataforma foi desenvolvida com uma abordagem que prioriza a privacidade, em conformidade com a Lei Geral de Protecao de Dados (LGPD - Lei n. 13.709/2018).',
  },
  highlights: [
    { title: 'Seus Dados Ficam no Seu Dispositivo', text: 'Todo o conteudo do seu curriculo — experiencias profissionais, formacao e habilidades — e salvo localmente no seu navegador, nunca nos nossos servidores.' },
    { title: 'Minimos Dados no Servidor', text: 'Armazenamos apenas seu e-mail e senha em nossos servidores para autenticacao da conta. Nenhum conteudo de curriculo, nenhum dado pessoal adicional.' },
    { title: 'Transparencia Total', text: 'Acreditamos em total transparencia. Voce pode verificar exatamente quais dados estao salvos no seu navegador e exclui-los a qualquer momento.' },
  ],
  sections: [
    {
      heading: 'Quais Dados Coletamos',
      subsections: [
        { subheading: 'Dados Armazenados em Nossos Servidores (Minimos)', items: ['**Endereco de e-mail** \u2014 Usado para autenticacao da conta e comunicacoes importantes sobre o servico', '**Senha (criptografada)** \u2014 Armazenada de forma segura com hash para autenticacao'] },
        { subheading: 'Dados Armazenados Localmente no Seu Navegador', items: ['Informacoes pessoais (nome, contatos, endereco)', 'Experiencias profissionais e historico de emprego', 'Formacao academica e certificacoes', 'Habilidades, idiomas e conquistas', 'Modelos de curriculo e preferencias de personalizacao'] },
      ],
    },
    {
      heading: 'Por Que Usamos o Armazenamento do Navegador',
      intro: 'Escolhemos o armazenamento do navegador (localStorage) como metodo principal de salvamento por diversas razoes importantes:',
      items: ['**Maxima Privacidade** \u2014 Suas informacoes profissionais sensiveis nunca saem do seu dispositivo', '**Sem Risco de Vazamento** \u2014 Como nao armazenamos dados do curriculo, eles nao podem ser comprometidos em caso de falha no servidor', '**Controle Total** \u2014 Voce pode visualizar, exportar ou excluir seus dados a qualquer momento pelas configuracoes do navegador', '**Alto Desempenho** \u2014 O armazenamento local garante acesso instantaneo aos seus dados sem latencia de servidor'],
    },
    {
      heading: 'Como Protegemos Sua Conta',
      intro: 'Mesmo minimizando os dados no servidor, levamos muito a serio a seguranca das suas credenciais:',
      items: ['Senhas sao criptografadas com algoritmos de hash conforme padroes do setor', 'Todas as transmissoes de dados sao protegidas com criptografia HTTPS', 'Senhas nunca sao armazenadas em texto simples', 'Auditorias e monitoramento de seguranca periodicos'],
    },
    {
      heading: 'Seus Direitos e Controle',
      intro: 'Em conformidade com a LGPD (Lei n. 13.709/2018), voce tem pleno controle sobre seus dados:',
      items: ['**Acesso** \u2014 Consulte todos os dados salvos no navegador a qualquer momento pelas ferramentas do desenvolvedor', '**Exportacao** \u2014 Baixe os dados do seu curriculo em PDF ou outros formatos', '**Exclusao** \u2014 Limpe o armazenamento do navegador ou exclua sua conta a qualquer momento', '**Portabilidade** \u2014 Seus dados sao seus e voce pode leva-los para onde quiser'],
    },
    {
      heading: 'O Que Nao Fazemos',
      intro: 'Nos comprometemos com praticas eticas no tratamento de dados. Isto e o que jamais faremos:',
      items: ['Vender suas informacoes pessoais a terceiros', 'Usar o conteudo do seu curriculo para fins publicitarios', 'Compartilhar seus dados com recrutadores sem seu consentimento explicito', 'Rastrear sua atividade de navegacao em outros sites', 'Armazenar o conteudo do seu curriculo em nossos servidores'],
    },
    {
      heading: 'Cookies e Analise',
      intro: 'Usamos apenas cookies essenciais e minimos para:',
      items: ['Manter sua sessao de login ativa', 'Lembrar suas preferencias de idioma e tema', 'Analises anonimas de uso para melhorar o servico'],
    },
    {
      heading: 'Fale Conosco',
    },
  ],
  contactText: 'Em caso de duvidas sobre nossas praticas de privacidade ou para exercer seus direitos previstos na LGPD, entre em contato conosco pelo e-mail',
  cta: {
    title: 'Crie seu curriculo com',
    titleHighlight: 'confianca e privacidade',
    subtitle: 'Seus dados profissionais ficam com voce. Comece a criar seu curriculo profissional hoje.',
    primaryBtn: 'Comece Gratuitamente',
    secondaryBtn: 'Saiba Mais Sobre Nos',
  },
  lastUpdated: 'Ultima atualizacao: janeiro de 2026',
};

const tr: PrivacyContent = {
  hero: {
    badge: 'Gizlilik Politikası',
    title: 'Gizliliğiniz bizim',
    titleHighlight: 'önceliğimizdir',
    subtitle: 'Best AI Resume olarak kişisel verilerinizin size ait olduğuna inanıyoruz. Platformumuz, 6698 sayılı Kişisel Verilerin Korunması Kanunu\'na (KVKK) uygun olarak gizlilik öncelikli bir yaklaşımla geliştirilmiştir.',
  },
  highlights: [
    { title: 'Verileriniz Cihazınızda Kalır', text: 'CV içeriğinizin tamamı — iş deneyimleriniz, eğitiminiz ve becerileriniz — sunucularımızda değil, tarayıcınızda yerel olarak kaydedilir.' },
    { title: 'Sunucuda Minimum Veri', text: 'Sunucularımızda yalnızca hesap doğrulaması için e-posta adresinizi ve şifrenizi saklıyoruz. Hiçbir CV içeriği, hiçbir ek kişisel veri.' },
    { title: 'Tam Şeffaflık', text: 'Tam şeffaflığa inanıyoruz. Tarayıcınızda tam olarak hangi verilerin kaydedildiğini kontrol edebilir ve istediğiniz zaman silebilirsiniz.' },
  ],
  sections: [
    {
      heading: 'Hangi Verileri Topluyoruz',
      subsections: [
        { subheading: 'Sunucularımızda Saklanan Veriler (Minimum)', items: ['**E-posta adresi** — Hesap doğrulaması ve önemli hizmet iletişimleri için kullanılır', '**Şifre (şifrelenmiş)** — Kimlik doğrulama için güvenli hash ile saklanır'] },
        { subheading: 'Tarayıcınızda Yerel Olarak Saklanan Veriler', items: ['Kişisel bilgiler (ad, iletişim bilgileri, adres)', 'Profesyonel deneyimler ve iş geçmişi', 'Eğitim bilgileri ve sertifikalar', 'Beceriler, diller ve başarılar', 'CV şablonları ve kişiselleştirme tercihleri'] },
      ],
    },
    {
      heading: 'Neden Tarayıcı Depolama Kullanıyoruz',
      intro: 'Tarayıcı depolamayı (localStorage) birincil kaydetme yöntemi olarak seçtik; bunun birkaç önemli nedeni var:',
      items: ['**Maksimum Gizlilik** — Hassas mesleki bilgileriniz cihazınızı hiçbir zaman terk etmez', '**Sızıntı Riski Yok** — CV verilerini depolamadığımız için sunucu arızası durumunda tehlikeye giremez', '**Tam Kontrol** — Verilerinizi tarayıcı ayarlarından istediğiniz zaman görüntüleyebilir, dışa aktarabilir veya silebilirsiniz', '**Yüksek Performans** — Yerel depolama, sunucu gecikmesi olmaksızın verilerinize anında erişimi garanti eder'],
    },
    {
      heading: 'Hesabınızı Nasıl Koruyoruz',
      intro: 'Sunucudaki verileri en aza indirmiş olsak da kimlik bilgilerinizin güvenliğini ciddiye alıyoruz:',
      items: ['Şifreler sektör standartlarına uygun hash algoritmalarıyla şifrelenir', 'Tüm veri iletimi HTTPS şifrelemesiyle korunur', 'Şifreler hiçbir zaman düz metin olarak saklanmaz', 'Düzenli güvenlik denetimleri ve izleme'],
    },
    {
      heading: 'Haklarınız ve Kontrolünüz',
      intro: 'KVKK (6698 sayılı Kanun) uyarınca verileriniz üzerinde tam kontrole sahipsiniz:',
      items: ['**Erişim** — Tarayıcı geliştirici araçları aracılığıyla istediğiniz zaman tarayıcınızdaki tüm verileri görüntüleyin', '**Dışa Aktarma** — CV verilerinizi PDF veya diğer formatlarda indirin', '**Silme** — Tarayıcı depolamasını temizleyin veya istediğiniz zaman hesabınızı silin', '**Taşınabilirlik** — Verileriniz size aittir ve istediğiniz yere taşıyabilirsiniz'],
    },
    {
      heading: 'Yapmadıklarımız',
      intro: 'Etik veri işleme uygulamalarına bağlıyız. İşte asla yapmayacaklarımız:',
      items: ['Kişisel bilgilerinizi üçüncü taraflara satmak', 'CV içeriğinizi reklam amaçlı kullanmak', 'Verilerinizi açık rızanız olmadan işe alım uzmanlarıyla paylaşmak', 'Diğer sitelerdeki tarama etkinliğinizi takip etmek', 'CV içeriğinizi sunucularımızda depolamak'],
    },
    {
      heading: 'Çerezler ve Analitik',
      intro: 'Yalnızca şunlar için temel ve minimum çerezler kullanıyoruz:',
      items: ['Giriş oturumunuzu aktif tutmak', 'Dil ve tema tercihlerinizi hatırlamak', 'Hizmeti iyileştirmek için anonim kullanım analitiği'],
    },
    {
      heading: 'Bize Ulaşın',
    },
  ],
  contactText: 'Gizlilik uygulamalarımız hakkında sorularınız veya KVKK kapsamındaki haklarınızı kullanmak için bize e-posta ile ulaşın:',
  cta: {
    title: 'CV\'nizi güven ve',
    titleHighlight: 'gizlilikle oluşturun',
    subtitle: 'Mesleki verileriniz size aittir. Bugün profesyonel CV\'nizi oluşturmaya başlayın.',
    primaryBtn: 'Ücretsiz Başla',
    secondaryBtn: 'Hakkımızda',
  },
  lastUpdated: 'Son güncelleme: Ocak 2026',
};

const id: PrivacyContent = {
  hero: {
    badge: 'Kebijakan Privasi',
    title: 'Privasi Anda adalah',
    titleHighlight: 'prioritas kami',
    subtitle: 'Di Best AI Resume, kami percaya data pribadi Anda adalah milik Anda. Platform kami dikembangkan dengan pendekatan yang mengutamakan privasi, sesuai dengan Undang-Undang Perlindungan Data Pribadi (UU PDP) Indonesia.',
  },
  highlights: [
    { title: 'Data Anda Tetap di Perangkat', text: 'Seluruh konten CV Anda — pengalaman kerja, pendidikan, dan keahlian — disimpan secara lokal di browser Anda, bukan di server kami.' },
    { title: 'Data Minimum di Server', text: 'Di server kami, kami hanya menyimpan alamat email dan kata sandi Anda untuk autentikasi akun. Tidak ada konten CV, tidak ada data pribadi tambahan.' },
    { title: 'Transparansi Penuh', text: 'Kami percaya pada transparansi penuh. Anda dapat memeriksa data apa yang tersimpan di browser Anda dan menghapusnya kapan saja.' },
  ],
  sections: [
    {
      heading: 'Data Apa yang Kami Kumpulkan',
      subsections: [
        { subheading: 'Data yang Disimpan di Server Kami (Minimum)', items: ['**Alamat email** — Digunakan untuk autentikasi akun dan komunikasi layanan penting', '**Kata sandi (terenkripsi)** — Disimpan dengan hash aman untuk autentikasi'] },
        { subheading: 'Data yang Disimpan Secara Lokal di Browser Anda', items: ['Informasi pribadi (nama, kontak, alamat)', 'Pengalaman profesional dan riwayat pekerjaan', 'Informasi pendidikan dan sertifikat', 'Keahlian, bahasa, dan prestasi', 'Template CV dan preferensi kustomisasi'] },
      ],
    },
    {
      heading: 'Mengapa Kami Menggunakan Penyimpanan Browser',
      intro: 'Kami memilih penyimpanan browser (localStorage) sebagai metode penyimpanan utama karena beberapa alasan penting:',
      items: ['**Privasi Maksimal** — Informasi profesional sensitif Anda tidak pernah meninggalkan perangkat Anda', '**Tidak Ada Risiko Kebocoran** — Karena kami tidak menyimpan data CV, data tidak bisa terkompromikan akibat kegagalan server', '**Kontrol Penuh** — Anda dapat melihat, mengekspor, atau menghapus data Anda kapan saja melalui pengaturan browser', '**Performa Tinggi** — Penyimpanan lokal memastikan akses instan ke data Anda tanpa latensi server'],
    },
    {
      heading: 'Cara Kami Melindungi Akun Anda',
      intro: 'Meskipun kami meminimalkan data di server, kami serius dalam mengamankan kredensial Anda:',
      items: ['Kata sandi dienkripsi dengan algoritma hash sesuai standar industri', 'Semua transmisi data dilindungi dengan enkripsi HTTPS', 'Kata sandi tidak pernah disimpan dalam bentuk teks biasa', 'Audit keamanan dan pemantauan rutin'],
    },
    {
      heading: 'Hak dan Kendali Anda',
      intro: 'Sesuai UU PDP (Undang-Undang Perlindungan Data Pribadi), Anda memiliki kendali penuh atas data Anda:',
      items: ['**Akses** — Lihat semua data di browser Anda kapan saja melalui alat pengembang browser', '**Ekspor** — Unduh data CV Anda dalam format PDF atau lainnya', '**Penghapusan** — Hapus penyimpanan browser atau hapus akun Anda kapan saja', '**Portabilitas** — Data Anda adalah milik Anda dan bisa dipindahkan ke mana saja'],
    },
    {
      heading: 'Yang Tidak Kami Lakukan',
      intro: 'Kami berkomitmen pada praktik pengelolaan data yang etis. Berikut hal yang tidak pernah kami lakukan:',
      items: ['Menjual informasi pribadi Anda kepada pihak ketiga', 'Menggunakan konten CV Anda untuk tujuan periklanan', 'Berbagi data Anda dengan rekruter tanpa persetujuan eksplisit', 'Melacak aktivitas penelusuran Anda di situs lain', 'Menyimpan konten CV Anda di server kami'],
    },
    {
      heading: 'Cookie dan Analitik',
      intro: 'Kami hanya menggunakan cookie esensial dan minimal untuk:',
      items: ['Mempertahankan sesi login Anda tetap aktif', 'Mengingat preferensi bahasa dan tema Anda', 'Analitik penggunaan anonim untuk meningkatkan layanan'],
    },
    {
      heading: 'Hubungi Kami',
    },
  ],
  contactText: 'Ada pertanyaan tentang praktik privasi kami atau untuk menggunakan hak Anda berdasarkan UU PDP? Hubungi kami melalui email:',
  cta: {
    title: 'Buat CV Anda dengan',
    titleHighlight: 'kepercayaan dan privasi',
    subtitle: 'Data profesional Anda adalah milik Anda. Mulai buat CV profesional Anda hari ini.',
    primaryBtn: 'Mulai Gratis',
    secondaryBtn: 'Tentang Kami',
  },
  lastUpdated: 'Terakhir diperbarui: Januari 2026',
};

const pl: PrivacyContent = {
  hero: {
    badge: 'Polityka Prywatności',
    title: 'Twoja prywatność jest',
    titleHighlight: 'naszym priorytetem',
    subtitle: 'W Best AI Resume wierzymy, że Twoje dane osobowe należą do Ciebie. Zbudowaliśmy naszą platformę z podejściem privacy-first, które utrzymuje Twoje informacje pod Twoją kontrolą — w pełnej zgodności z RODO (Rozporządzenie o Ochronie Danych Osobowych).',
  },
  highlights: [
    { title: 'Twoje Dane Pozostają Lokalne', text: 'Cała zawartość Twojego CV — doświadczenie zawodowe, wykształcenie i umiejętności — jest przechowywana lokalnie w Twojej przeglądarce, nigdy na naszych serwerach.' },
    { title: 'Minimalne Dane na Serwerze', text: 'Na naszych serwerach przechowujemy wyłącznie Twój adres e-mail i hasło do uwierzytelnienia konta. Nic więcej. Żadnych treści CV, żadnych danych osobowych.' },
    { title: 'Pełna Przejrzystość', text: 'Wierzymy w pełną transparentność. Możesz dokładnie zobaczyć, jakie dane są przechowywane w Twojej przeglądarce i usunąć je w dowolnym momencie.' },
  ],
  sections: [
    {
      heading: 'Jakie Dane Zbieramy',
      subsections: [
        { subheading: 'Dane Przechowywane na Naszych Serwerach (Minimalne)', items: ['**Adres e-mail** — Używany do uwierzytelnienia konta i ważnych aktualizacji usługi', '**Hasło (zaszyfrowane)** — Bezpiecznie zahashowane do uwierzytelnienia'] },
        { subheading: 'Dane Przechowywane Lokalnie w Twojej Przeglądarce', items: ['Dane osobowe (imię, dane kontaktowe, adres)', 'Doświadczenie zawodowe i historia pracy', 'Wykształcenie i certyfikaty', 'Umiejętności, języki i osiągnięcia', 'Szablony CV i preferencje personalizacji'] },
      ],
    },
    {
      heading: 'Dlaczego Używamy Pamięci Przeglądarki',
      intro: 'Wybraliśmy pamięć przeglądarki (localStorage) jako naszą podstawową metodę przechowywania z ważnych powodów:',
      items: ['**Maksymalna Prywatność** — Twoje wrażliwe dane kariery nigdy nie opuszczają Twojego urządzenia', '**Brak Wycieków Danych** — Ponieważ nie przechowujemy Twoich danych CV, nie mogą zostać narażone w przypadku naruszenia serwera', '**Pełna Kontrola** — Możesz przeglądać, eksportować lub usuwać swoje dane w dowolnym momencie przez ustawienia przeglądarki', '**Szybkie Działanie** — Lokalne przechowywanie oznacza natychmiastowy dostęp do danych bez opóźnień serwera'],
    },
    {
      heading: 'Jak Chronimy Twoje Konto',
      intro: 'Choć minimalizujemy dane serwerowe, traktujemy bezpieczeństwo danych konta poważnie:',
      items: ['Hasła są szyfrowane przy użyciu standardowych algorytmów haszowania', 'Cały transfer danych jest zabezpieczony szyfrowaniem HTTPS', 'Nigdy nie przechowujemy haseł w postaci jawnej', 'Regularne audyty bezpieczeństwa i monitorowanie'],
    },
    {
      heading: 'Twoje Prawa i Kontrola',
      intro: 'Na mocy RODO masz pełną kontrolę nad swoimi danymi:',
      items: ['**Dostęp** — Przeglądaj wszystkie dane przechowywane w przeglądarce w dowolnym momencie przez narzędzia deweloperskie', '**Eksport** — Pobierz dane CV jako PDF lub w innych formatach', '**Usunięcie** — Wyczyść pamięć przeglądarki lub usuń konto w dowolnym momencie', '**Przenoszalność** — Twoje dane należą do Ciebie i możesz je zabrać ze sobą wszędzie'],
    },
    {
      heading: 'Czego Nie Robimy',
      intro: 'Jesteśmy zaangażowani w etyczne praktyki danych. Nigdy nie będziemy:',
      items: ['Sprzedawać Twoich danych osobowych stronom trzecim', 'Używać zawartości Twojego CV do celów reklamowych', 'Udostępniać Twoich informacji rekruterom bez Twojej wyraźnej zgody', 'Śledzić Twojej aktywności przeglądania na innych stronach', 'Przechowywać zawartości Twojego CV na naszych serwerach'],
    },
    {
      heading: 'Pliki Cookie i Analityka',
      intro: 'Używamy minimalnych, niezbędnych plików cookie do:',
      items: ['Utrzymania zalogowania w Twoim koncie', 'Zapamiętywania Twoich preferencji języka i motywu', 'Anonimowej analityki użytkowania w celu ulepszenia naszej usługi'],
    },
    {
      heading: 'Skontaktuj Się z Nami',
    },
  ],
  contactText: 'Jeśli masz pytania dotyczące naszej polityki prywatności lub chcesz skorzystać ze swoich praw RODO, skontaktuj się z nami pod adresem',
  cta: {
    title: 'Twórz CV z',
    titleHighlight: 'zaufaniem i prywatnością',
    subtitle: 'Twoje dane kariery pozostają przy Tobie. Zacznij tworzyć profesjonalne CV już dziś.',
    primaryBtn: 'Zacznij za darmo',
    secondaryBtn: 'O nas',
  },
  lastUpdated: 'Ostatnia aktualizacja: styczeń 2026',
};

const nl: PrivacyContent = {
  hero: {
    badge: 'Privacybeleid',
    title: 'Uw privacy is',
    titleHighlight: 'onze prioriteit',
    subtitle: 'Bij Best AI Resume geloven wij dat uw persoonlijke gegevens van u zijn. Wij hebben ons platform gebouwd met een privacy-first aanpak die uw informatie onder uw controle houdt, volledig in lijn met de AVG (Algemene Verordening Gegevensbescherming).',
  },
  highlights: [
    { title: 'Uw Gegevens Blijven Lokaal', text: 'Al uw cv-inhoud — werkervaring, opleiding en vaardigheden — wordt lokaal opgeslagen in uw browser, nooit op onze servers.' },
    { title: 'Minimale Servergegevens', text: 'Op onze servers slaan wij alleen uw e-mailadres en wachtwoord op voor accountauthenticatie. Niets anders. Geen cv-inhoud, geen persoonlijke gegevens.' },
    { title: 'Volledige Transparantie', text: 'Wij geloven in volledige transparantie. U kunt precies zien welke gegevens in uw browser zijn opgeslagen en ze op elk moment verwijderen.' },
  ],
  sections: [
    {
      heading: 'Welke Gegevens Wij Verzamelen',
      subsections: [
        { subheading: 'Gegevens Opgeslagen op Onze Servers (Minimaal)', items: ['**E-mailadres** — Gebruikt voor accountauthenticatie en belangrijke service-updates', '**Wachtwoord (versleuteld)** — Veilig gehashed opgeslagen voor authenticatie'] },
        { subheading: 'Gegevens Lokaal Opgeslagen in Uw Browser', items: ['Persoonlijke informatie (naam, contactgegevens, adres)', 'Werkervaring en arbeidsgeschiedenis', 'Opleiding en certificaten', 'Vaardigheden, talen en prestaties', 'Cv-sjablonen en aanpassingsvoorkeuren'] },
      ],
    },
    {
      heading: 'Waarom Wij Browseropslag Gebruiken',
      intro: 'Wij hebben gekozen voor browseropslag (localStorage) als onze primaire opslagmethode om belangrijke redenen:',
      items: ['**Maximale Privacy** — Uw gevoelige carrièreinformatie verlaat nooit uw apparaat', '**Geen Datalekken** — Omdat wij uw cv-gegevens niet opslaan, kunnen ze niet worden gecompromitteerd bij een serverinbreuk', '**Volledige Controle** — U kunt uw gegevens op elk moment bekijken, exporteren of verwijderen via uw browserinstellingen', '**Snelle Prestaties** — Lokale opslag betekent directe toegang tot uw gegevens zonder serververtraging'],
    },
    {
      heading: 'Hoe Wij Uw Account Beschermen',
      intro: 'Hoewel wij servergegevens minimaliseren, nemen wij de beveiliging van uw accountgegevens serieus:',
      items: ['Wachtwoorden worden versleuteld met behulp van industriestandaard hash-algoritmen', 'Alle gegevensoverdracht is beveiligd met HTTPS-encryptie', 'Wij slaan wachtwoorden nooit op in platte tekst', 'Regelmatige beveiligingsaudits en monitoring'],
    },
    {
      heading: 'Uw Rechten en Controle',
      intro: 'Op grond van de AVG heeft u volledige controle over uw gegevens:',
      items: ['**Inzage** — Bekijk al uw in de browser opgeslagen gegevens op elk moment via de ontwikkelaarstools van uw browser', '**Export** — Download uw cv-gegevens als PDF of in andere formaten', '**Verwijdering** — Wis uw browseropslag of verwijder uw account op elk gewenst moment', '**Overdraagbaarheid** — Uw gegevens zijn van u en u kunt ze overal mee naartoe nemen'],
    },
    {
      heading: 'Wat Wij Niet Doen',
      intro: 'Wij zijn toegewijd aan ethische gegevenspraktijken. Dit zullen wij nooit doen:',
      items: ['Uw persoonlijke informatie verkopen aan derden', 'Uw cv-inhoud gebruiken voor reclamedoeleinden', 'Uw informatie delen met recruiters zonder uw uitdrukkelijke toestemming', 'Uw browseactiviteit op andere websites bijhouden', 'Uw cv-inhoud opslaan op onze servers'],
    },
    {
      heading: 'Cookies en Analyse',
      intro: 'Wij gebruiken minimale, essentiële cookies voor:',
      items: ['Ingelogd blijven in uw account', 'Onthouden van uw taal- en themavoorkeuren', 'Anonieme gebruiksanalyses om onze service te verbeteren'],
    },
    {
      heading: 'Neem Contact Op',
    },
  ],
  contactText: 'Als u vragen heeft over ons privacybeleid of uw AVG-rechten wilt uitoefenen, neem dan contact met ons op via',
  cta: {
    title: 'Bouw uw cv met',
    titleHighlight: 'vertrouwen en privacy',
    subtitle: 'Uw carrièregegevens blijven bij u. Begin vandaag met het maken van uw professionele cv.',
    primaryBtn: 'Gratis Beginnen',
    secondaryBtn: 'Over Ons',
  },
  lastUpdated: 'Laatste update: januari 2026',
};

const contentMap: Record<string, PrivacyContent> = { en, es, fr, de, ar, ja, it, vi, ko, th, pt, tr, id, pl, nl };

export function getContent(locale: string) { return selectContent(contentMap, locale); }
