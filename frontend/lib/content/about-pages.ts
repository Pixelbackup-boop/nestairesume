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

const fr: AboutPagesContent = {
  about: {
    hero: {
      badge: 'À Propos',
      title: 'Construire l\u2019avenir de la',
      titleHighlight: 'réussite professionnelle',
      subtitle: 'Best AI Resume a pour mission d\u2019aider les chercheurs d\u2019emploi du monde entier à créer des CV professionnels et optimisés pour les ATS qui ouvrent les portes de la carrière de leurs rêves.',
    },
    story: {
      badge: 'Notre Histoire',
      heading: 'Pourquoi nous avons créé Best AI Resume',
      p1: 'Nous avons constaté que des professionnels talentueux étaient ignorés simplement parce que leurs CV ne passaient pas les systèmes de tri automatisés. Le processus traditionnel de création de CV était long, frustrant et produisait souvent des documents qui ne mettaient pas en valeur le véritable potentiel des candidats.',
      p2: 'C\u2019est pourquoi nous avons créé Best AI Resume \u2014 une plateforme qui combine la puissance de l\u2019intelligence artificielle avec un design professionnel et élégant. Notre objectif est simple : aider chaque chercheur d\u2019emploi à présenter le meilleur de lui-même aux employeurs potentiels.',
      p3: 'Aujourd\u2019hui, nous avons aidé plus de 50 000 professionnels à décrocher l\u2019emploi de leurs rêves en créant des CV qui se démarquent tout en passant les filtres ATS avec succès.',
    },
    stats: [
      { value: '50K+', label: 'CV Créés' },
      { value: '98%', label: 'Taux de Réussite ATS' },
      { value: '20+', label: 'Modèles' },
      { value: '4.9', label: 'Note Utilisateurs' },
    ],
    values: {
      badge: 'Nos Valeurs',
      heading: 'Ce qui nous motive',
      cards: [
        { title: 'Confidentialité Avant Tout', text: 'Vos données vous appartiennent. Nous stockons les données de votre CV localement dans votre navigateur, pas sur nos serveurs. Seules vos identifiants de compte sont conservés en sécurité de notre côté.' },
        { title: 'Innovation', text: 'Nous exploitons la technologie d\u2019IA de pointe pour vous aider à rédiger un contenu percutant qui met en valeur vos réalisations et attire l\u2019attention des recruteurs.' },
        { title: 'Accessibilité', text: 'Les outils professionnels de création de CV ne devraient pas être réservés à ceux qui peuvent payer cher. Nous offrons des fonctionnalités puissantes accessibles et abordables pour tous.' },
      ],
    },
    experts: {
      badge: 'Une Expertise de Confiance',
      heading: 'Rencontrez Nos Experts en Carrière',
      subtitle: 'Notre équipe de coachs de carrière, recruteurs et spécialistes du secteur apporte une expertise approfondie aux guides de CV qu\u2019ils rédigent.',
    },
    editorial: {
      heading: 'Nos Standards Éditoriaux',
      items: [
        { title: 'Conseils Fondés sur les Données', text: 'Chaque conseil que nous partageons est testé sur de vrais systèmes ATS et vérifié par des professionnels du secteur.' },
        { title: 'Approche Humaine d\u2019Abord', text: 'Nous croyons que l\u2019IA doit accompagner, pas remplacer. Nous privilégions les stratégies qui séduisent d\u2019abord les recruteurs humains.' },
      ],
    },
    commitment: {
      heading: 'Notre Engagement Envers Vous',
      p1: 'Chez Best AI Resume, nous croyons que votre parcours professionnel est personnel. C\u2019est pourquoi nous avons conçu une plateforme qui respecte votre vie privée tout en vous offrant des outils puissants pour réussir. Les données de votre CV restent sur votre appareil, vous donnant un contrôle total sur vos informations.',
      p2: 'Nous améliorons constamment nos algorithmes d\u2019IA, ajoutons de nouveaux modèles et enrichissons nos fonctionnalités en fonction des retours de nos utilisateurs. Votre réussite est notre réussite, et nous nous engageons à vous accompagner à chaque étape.',
    },
    cta: {
      title: 'Prêt à rejoindre',
      titleHighlight: 'plus de 50 000 histoires de réussite ?',
      subtitle: 'Commencez à créer votre CV professionnel aujourd\u2019hui et faites le premier pas vers la carrière de vos rêves.',
      button: 'Commencer Gratuitement',
    },
  },
  authors: {
    meta: {
      title: 'Nos Auteurs Experts | Best AI Resume',
      description: 'Découvrez les experts en carrière, recruteurs et coachs derrière nos guides de CV. Nos auteurs apportent une expérience concrète du recrutement pour vous aider à décrocher l\u2019emploi de vos rêves.',
      ogDescription: 'Découvrez les experts en carrière, recruteurs et coachs derrière nos guides de CV.',
    },
    breadcrumb: { home: 'Accueil', about: 'À Propos', authors: 'Auteurs' },
    hero: {
      title: 'Rencontrez Nos Auteurs Experts',
      subtitle: 'Notre équipe de coachs de carrière, recruteurs et spécialistes du secteur crée des guides de CV pratiques basés sur une expérience réelle du recrutement.',
    },
    viewProfile: 'Voir le Profil',
    cta: {
      title: 'Créez Votre CV avec des Conseils d\u2019Experts',
      subtitle: 'Notre créateur IA applique les mêmes stratégies que nos experts recommandent. Créez un CV professionnel en quelques minutes.',
      button: 'Créer Mon CV \u2014 Gratuit',
    },
  },
  authorProfile: {
    breadcrumb: { home: 'Accueil', about: 'À Propos' },
    atOrg: '{jobTitle} chez {organization}',
    authorOfGuides: ' Auteur de {count}+ guides de carrière et articles.',
    connectLinkedIn: 'Se connecter sur LinkedIn',
    viewAllGuides: 'Voir Tous les Guides',
    areasOfExpertise: 'Domaines d\u2019Expertise',
    resumeGuidesBy: 'Guides de CV par {name}',
    guidesCount: '{count} guides',
    coverLetterExamplesBy: 'Exemples de Lettres de Motivation par {name}',
    examplesCount: '{count} exemples',
    blogPostsBy: 'Articles de Blog par {name}',
    postsCount: '{count} articles',
    viewAllResumes: 'Voir les {count} guides de CV',
    viewAllCoverLetters: 'Voir les {count} exemples de lettres de motivation',
    viewAllBlogPosts: 'Voir les {count} articles de blog',
    cta: {
      title: 'Créez Votre CV avec des Conseils d\u2019Experts',
      subtitle: 'Utilisez les mêmes stratégies que {name} recommande. Notre créateur IA applique automatiquement les techniques d\u2019experts pour votre CV.',
      button: 'Créer Mon CV \u2014 Gratuit',
    },
  },
};

const de: AboutPagesContent = {
  about: {
    hero: {
      badge: 'Über Uns',
      title: 'Die Zukunft des',
      titleHighlight: 'beruflichen Erfolgs gestalten',
      subtitle: 'Best AI Resume hat es sich zur Aufgabe gemacht, Arbeitssuchenden weltweit dabei zu helfen, professionelle, ATS-optimierte Lebensläufe zu erstellen, die Türen zu ihrer Traumkarriere öffnen.',
    },
    story: {
      badge: 'Unsere Geschichte',
      heading: 'Warum wir Best AI Resume entwickelt haben',
      p1: 'Uns fiel auf, dass talentierte Fachkräfte übersehen wurden, nur weil ihre Lebensläufe die automatisierten Auswahlsysteme nicht überstanden. Der traditionelle Prozess der Lebenslauferstellung war zeitaufwendig, frustrierend und führte oft zu Dokumenten, die das wahre Potenzial der Kandidaten nicht widerspiegelten.',
      p2: 'Deshalb haben wir Best AI Resume geschaffen \u2014 eine Plattform, die die Kraft der künstlichen Intelligenz mit professionellem, ansprechendem Design verbindet. Unser Ziel ist einfach: Jedem Arbeitssuchenden zu helfen, sich potenziellen Arbeitgebern von seiner besten Seite zu präsentieren.',
      p3: 'Heute haben wir über 50.000 Fachkräften geholfen, ihren Traumjob zu finden, indem wir Lebensläufe erstellt haben, die auffallen und gleichzeitig die ATS-Prüfung mit Bravour bestehen.',
    },
    stats: [
      { value: '50K+', label: 'Erstellte Lebensläufe' },
      { value: '98%', label: 'ATS-Erfolgsrate' },
      { value: '20+', label: 'Vorlagen' },
      { value: '4.9', label: 'Nutzerbewertung' },
    ],
    values: {
      badge: 'Unsere Werte',
      heading: 'Was uns antreibt',
      cards: [
        { title: 'Datenschutz Zuerst', text: 'Ihre Daten gehören Ihnen. Wir speichern Ihre Lebenslaufdaten lokal in Ihrem Browser, nicht auf unseren Servern. Nur Ihre Zugangsdaten werden sicher bei uns aufbewahrt.' },
        { title: 'Innovation', text: 'Wir nutzen modernste KI-Technologie, um Ihnen beim Verfassen überzeugender Inhalte zu helfen, die Ihre Leistungen hervorheben und die Aufmerksamkeit von Recruitern gewinnen.' },
        { title: 'Zugänglichkeit', text: 'Professionelle Lebenslauf-Tools sollten nicht hinter teuren Bezahlschranken verborgen sein. Wir bieten leistungsstarke Funktionen, die für jeden zugänglich und erschwinglich sind.' },
      ],
    },
    experts: {
      badge: 'Expertise, der Sie vertrauen können',
      heading: 'Lernen Sie Unsere Karriere-Experten Kennen',
      subtitle: 'Unser Team aus Karrierecoaches, Recruitern und Branchenspezialisten bringt umfassende Fachkenntnisse in die Lebenslauf-Ratgeber ein, die sie verfassen.',
    },
    editorial: {
      heading: 'Unsere Redaktionellen Standards',
      items: [
        { title: 'Datenbasierte Ratschläge', text: 'Jeder Tipp, den wir teilen, wird an echten ATS-Systemen getestet und von Branchenexperten verifiziert.' },
        { title: 'Der Mensch im Mittelpunkt', text: 'Wir glauben, dass KI unterstützen, nicht ersetzen soll. Wir setzen auf Strategien, die zuerst menschliche Recruiter überzeugen.' },
      ],
    },
    commitment: {
      heading: 'Unser Versprechen an Sie',
      p1: 'Bei Best AI Resume glauben wir, dass Ihr Karriereweg persönlich ist. Deshalb haben wir eine Plattform entwickelt, die Ihre Privatsphäre respektiert und Ihnen gleichzeitig leistungsstarke Werkzeuge für Ihren Erfolg bietet. Ihre Lebenslaufdaten verbleiben auf Ihrem Gerät und geben Ihnen die volle Kontrolle über Ihre Informationen.',
      p2: 'Wir verbessern ständig unsere KI-Algorithmen, fügen neue Vorlagen hinzu und erweitern unsere Funktionen auf Basis des Feedbacks unserer Nutzer. Ihr Erfolg ist unser Erfolg, und wir sind entschlossen, Sie bei jedem Schritt zu begleiten.',
    },
    cta: {
      title: 'Bereit, sich',
      titleHighlight: 'über 50.000 Erfolgsgeschichten anzuschließen?',
      subtitle: 'Beginnen Sie noch heute mit der Erstellung Ihres professionellen Lebenslaufs und machen Sie den ersten Schritt zu Ihrer Traumkarriere.',
      button: 'Kostenlos Starten',
    },
  },
  authors: {
    meta: {
      title: 'Unsere Experten-Autoren | Best AI Resume',
      description: 'Lernen Sie die Karriereexperten, Recruiter und Coaches hinter unseren Lebenslauf-Ratgebern kennen. Unsere Autoren bringen echte Erfahrung aus dem Recruiting mit, um Ihnen zu Ihrem Traumjob zu verhelfen.',
      ogDescription: 'Lernen Sie die Karriereexperten, Recruiter und Coaches hinter unseren Lebenslauf-Ratgebern kennen.',
    },
    breadcrumb: { home: 'Startseite', about: 'Über Uns', authors: 'Autoren' },
    hero: {
      title: 'Lernen Sie Unsere Experten-Autoren Kennen',
      subtitle: 'Unser Team aus Karrierecoaches, Recruitern und Branchenspezialisten erstellt praxisnahe Lebenslauf-Ratgeber, die auf echten Erfahrungen im Recruiting basieren.',
    },
    viewProfile: 'Profil Ansehen',
    cta: {
      title: 'Erstellen Sie Ihren Lebenslauf mit Experten-Beratung',
      subtitle: 'Unser KI-Baukasten wendet dieselben Strategien an, die unsere Experten empfehlen. Erstellen Sie in wenigen Minuten einen professionellen Lebenslauf.',
      button: 'Meinen Lebenslauf Erstellen \u2014 Kostenlos',
    },
  },
  authorProfile: {
    breadcrumb: { home: 'Startseite', about: 'Über Uns' },
    atOrg: '{jobTitle} bei {organization}',
    authorOfGuides: ' Autor von {count}+ Karriere-Ratgebern und Artikeln.',
    connectLinkedIn: 'Auf LinkedIn vernetzen',
    viewAllGuides: 'Alle Ratgeber Ansehen',
    areasOfExpertise: 'Fachgebiete',
    resumeGuidesBy: 'Lebenslauf-Ratgeber von {name}',
    guidesCount: '{count} Ratgeber',
    coverLetterExamplesBy: 'Anschreiben-Beispiele von {name}',
    examplesCount: '{count} Beispiele',
    blogPostsBy: 'Blog-Beiträge von {name}',
    postsCount: '{count} Beiträge',
    viewAllResumes: 'Alle {count} Lebenslauf-Ratgeber ansehen',
    viewAllCoverLetters: 'Alle {count} Anschreiben-Beispiele ansehen',
    viewAllBlogPosts: 'Alle {count} Blog-Beiträge ansehen',
    cta: {
      title: 'Erstellen Sie Ihren Lebenslauf mit Experten-Beratung',
      subtitle: 'Nutzen Sie dieselben Strategien, die {name} empfiehlt. Unser KI-Baukasten wendet Experten-Techniken für Ihren Lebenslauf automatisch an.',
      button: 'Meinen Lebenslauf Erstellen \u2014 Kostenlos',
    },
  },
};

const ar: AboutPagesContent = {
  about: {
    hero: {
      badge: 'من نحن',
      title: 'نبني مستقبل',
      titleHighlight: 'النجاح المهني',
      subtitle: 'تسعى Best AI Resume إلى مساعدة الباحثين عن عمل حول العالم في إنشاء سير ذاتية احترافية ومحسّنة لأنظمة ATS تفتح أبواب وظائف أحلامهم.',
    },
    story: {
      badge: 'قصتنا',
      heading: 'لماذا أنشأنا Best AI Resume',
      p1: 'لاحظنا أن محترفين موهوبين كانوا يُتجاهلون لمجرد أن سيرهم الذاتية لم تتجاوز أنظمة الفرز الآلية. كانت عملية إنشاء السيرة الذاتية التقليدية مستهلكة للوقت ومحبطة، وغالبًا ما أنتجت مستندات لم تُبرز الإمكانات الحقيقية للمرشحين.',
      p2: 'لهذا السبب أنشأنا Best AI Resume \u2014 منصة تجمع بين قوة الذكاء الاصطناعي والتصميم الاحترافي الأنيق. هدفنا بسيط: مساعدة كل باحث عن عمل في تقديم أفضل صورة عن نفسه لأصحاب العمل المحتملين.',
      p3: 'اليوم، ساعدنا أكثر من 50,000 محترف في الحصول على وظائف أحلامهم من خلال إنشاء سير ذاتية تتميز وتتجاوز فلاتر ATS بنجاح.',
    },
    stats: [
      { value: '50K+', label: 'سيرة ذاتية تم إنشاؤها' },
      { value: '98%', label: 'معدل اجتياز ATS' },
      { value: '20+', label: 'قالب' },
      { value: '4.9', label: 'تقييم المستخدمين' },
    ],
    values: {
      badge: 'قيمنا',
      heading: 'ما يدفعنا للأمام',
      cards: [
        { title: 'الخصوصية أولاً', text: 'بياناتك ملكك. نقوم بتخزين بيانات سيرتك الذاتية محليًا في متصفحك، وليس على خوادمنا. فقط بيانات تسجيل الدخول الخاصة بك تُحفظ بأمان لدينا.' },
        { title: 'الابتكار', text: 'نستفيد من أحدث تقنيات الذكاء الاصطناعي لمساعدتك في كتابة محتوى مقنع يُبرز إنجازاتك ويلفت انتباه مسؤولي التوظيف.' },
        { title: 'إمكانية الوصول', text: 'لا ينبغي أن تكون أدوات السيرة الذاتية الاحترافية محصورة خلف جدران دفع باهظة. نقدم ميزات قوية يمكن للجميع الوصول إليها وتحمل تكلفتها.' },
      ],
    },
    experts: {
      badge: 'خبرة يمكنك الوثوق بها',
      heading: 'تعرّف على خبراء المسار المهني لدينا',
      subtitle: 'يقدم فريقنا من مدربي المسار المهني والمسؤولين عن التوظيف والمتخصصين في القطاع خبرة عميقة في أدلة السيرة الذاتية التي يكتبونها.',
    },
    editorial: {
      heading: 'معاييرنا التحريرية',
      items: [
        { title: 'نصائح مبنية على البيانات', text: 'كل نصيحة نشاركها يتم اختبارها على أنظمة ATS حقيقية والتحقق منها من قبل متخصصين في المجال.' },
        { title: 'نهج يضع الإنسان أولاً', text: 'نؤمن بأن الذكاء الاصطناعي يجب أن يُمكّن لا أن يحلّ محل الإنسان. نعطي الأولوية للاستراتيجيات التي تجذب مسؤولي التوظيف البشريين أولاً.' },
      ],
    },
    commitment: {
      heading: 'التزامنا تجاهك',
      p1: 'في Best AI Resume، نؤمن بأن مسيرتك المهنية شخصية. لهذا بنينا منصة تحترم خصوصيتك مع تزويدك بأدوات قوية للنجاح. تبقى بيانات سيرتك الذاتية على جهازك، مما يمنحك السيطرة الكاملة على معلوماتك.',
      p2: 'نعمل باستمرار على تحسين خوارزميات الذكاء الاصطناعي لدينا وإضافة قوالب جديدة وتعزيز ميزاتنا بناءً على ملاحظات المستخدمين. نجاحك هو نجاحنا، ونحن ملتزمون بمساعدتك في كل خطوة.',
    },
    cta: {
      title: 'مستعد للانضمام إلى',
      titleHighlight: 'أكثر من 50,000 قصة نجاح؟',
      subtitle: 'ابدأ بإنشاء سيرتك الذاتية الاحترافية اليوم واتخذ الخطوة الأولى نحو مسيرتك المهنية التي تحلم بها.',
      button: 'ابدأ مجانًا',
    },
  },
  authors: {
    meta: {
      title: 'مؤلفونا الخبراء | Best AI Resume',
      description: 'تعرّف على خبراء المسار المهني والمسؤولين عن التوظيف والمدربين وراء أدلة السيرة الذاتية لدينا. يقدم مؤلفونا خبرة حقيقية في التوظيف لمساعدتك في الحصول على وظيفة أحلامك.',
      ogDescription: 'تعرّف على خبراء المسار المهني والمسؤولين عن التوظيف والمدربين وراء أدلة السيرة الذاتية لدينا.',
    },
    breadcrumb: { home: 'الرئيسية', about: 'من نحن', authors: 'المؤلفون' },
    hero: {
      title: 'تعرّف على مؤلفينا الخبراء',
      subtitle: 'يقوم فريقنا من مدربي المسار المهني والمسؤولين عن التوظيف والمتخصصين في القطاع بإنشاء أدلة سيرة ذاتية عملية مبنية على خبرة حقيقية في التوظيف.',
    },
    viewProfile: 'عرض الملف الشخصي',
    cta: {
      title: 'أنشئ سيرتك الذاتية بتوجيه من الخبراء',
      subtitle: 'يطبّق منشئنا بالذكاء الاصطناعي نفس الاستراتيجيات التي يوصي بها خبراؤنا. أنشئ سيرة ذاتية احترافية في دقائق.',
      button: 'إنشاء سيرتي الذاتية \u2014 مجانًا',
    },
  },
  authorProfile: {
    breadcrumb: { home: 'الرئيسية', about: 'من نحن' },
    atOrg: '{jobTitle} في {organization}',
    authorOfGuides: ' مؤلف {count}+ دليل مهني ومقال.',
    connectLinkedIn: 'التواصل عبر LinkedIn',
    viewAllGuides: 'عرض جميع الأدلة',
    areasOfExpertise: 'مجالات الخبرة',
    resumeGuidesBy: 'أدلة السيرة الذاتية بقلم {name}',
    guidesCount: '{count} دليل',
    coverLetterExamplesBy: 'نماذج خطابات التغطية بقلم {name}',
    examplesCount: '{count} نموذج',
    blogPostsBy: 'مقالات المدونة بقلم {name}',
    postsCount: '{count} مقال',
    viewAllResumes: 'عرض جميع أدلة السيرة الذاتية ({count})',
    viewAllCoverLetters: 'عرض جميع نماذج خطابات التغطية ({count})',
    viewAllBlogPosts: 'عرض جميع مقالات المدونة ({count})',
    cta: {
      title: 'أنشئ سيرتك الذاتية بتوجيه من الخبراء',
      subtitle: 'استخدم نفس الاستراتيجيات التي يوصي بها {name}. يطبّق منشئنا بالذكاء الاصطناعي تقنيات خبراء السيرة الذاتية تلقائيًا.',
      button: 'إنشاء سيرتي الذاتية \u2014 مجانًا',
    },
  },
};

const ja: AboutPagesContent = {
  about: {
    hero: {
      badge: '私たちについて',
      title: 'キャリア成功の',
      titleHighlight: '未来を創る',
      subtitle: 'Best AI Resumeは、世界中の求職者がATS対応のプロフェッショナルな履歴書を作成し、理想のキャリアへの扉を開くことを使命としています。AI履歴書作成ツールで、あなたの転職活動を強力にサポートします。',
    },
    story: {
      badge: '私たちの歩み',
      heading: 'Best AI Resumeを開発した理由',
      p1: '優秀な人材が、履歴書がATS（応募者追跡システム）を通過できないという理由だけで見過ごされている現状に気づきました。従来の履歴書作成は時間がかかり、フラストレーションが溜まるものでした。特に日本の就活市場では、履歴書と職務経歴書の両方が求められ、その負担はさらに大きくなります。',
      p2: 'だからこそ、AIの力とプロフェッショナルなデザインを融合したBest AI Resumeを開発しました。私たちの目標はシンプルです。すべての求職者が、採用担当者に最高の自分を伝えられるようにすること。',
      p3: '今日まで、50,000人以上のプロフェッショナルが、ATS審査を確実にパスしながら際立つ履歴書を作成し、理想の仕事を獲得しています。',
    },
    stats: [
      { value: '50K+', label: '作成された履歴書' },
      { value: '98%', label: 'ATS通過率' },
      { value: '20+', label: 'テンプレート数' },
      { value: '4.9', label: 'ユーザー評価' },
    ],
    values: {
      badge: '私たちの価値観',
      heading: '私たちを動かす原動力',
      cards: [
        { title: 'プライバシー最優先', text: 'あなたのデータはあなたのもの。履歴書データはブラウザにローカル保存され、サーバーには送信されません。アカウント認証情報のみ安全に管理しています。' },
        { title: 'イノベーション', text: '最先端のAI技術を活用し、あなたの実績を効果的にアピールする魅力的なコンテンツの作成をサポートします。' },
        { title: 'アクセシビリティ', text: 'プロフェッショナルな履歴書作成ツールは、高額な有料プランの壁に阻まれるべきではありません。誰もが利用できる強力な機能を提供しています。' },
      ],
    },
    experts: {
      badge: '信頼できる専門知識',
      heading: 'キャリアの専門家をご紹介',
      subtitle: 'キャリアコーチ、採用担当者、業界スペシャリストからなるチームが、履歴書ガイドに深い専門知識を提供しています。',
    },
    editorial: {
      heading: '編集基準',
      items: [
        { title: 'データに基づくアドバイス', text: 'すべてのアドバイスは実際のATSシステムでテストし、業界の専門家が検証しています。' },
        { title: '人を第一に', text: 'AIは人に取って代わるのではなく、人を支えるべきだと考えています。まず人間の採用担当者に響く戦略を優先しています。' },
      ],
    },
    commitment: {
      heading: 'お客様へのお約束',
      p1: 'Best AI Resumeでは、キャリアの道のりは一人ひとり異なると考えています。だからこそ、プライバシーを尊重しながら、成功のための強力なツールを提供するプラットフォームを構築しました。履歴書データはお使いの端末に保存され、情報の完全なコントロールが可能です。',
      p2: 'AIアルゴリズムの改善、新しいテンプレートの追加、ユーザーフィードバックに基づく機能強化を常に行っています。お客様の成功は私たちの成功です。一歩一歩、全力でサポートいたします。',
    },
    cta: {
      title: '50,000+の',
      titleHighlight: 'サクセスストーリーに加わりませんか？',
      subtitle: '今すぐプロフェッショナルな履歴書の作成を始めて、理想のキャリアへの第一歩を踏み出しましょう。',
      button: '無料で始める',
    },
  },
  authors: {
    meta: {
      title: '専門家チーム | Best AI Resume',
      description: '履歴書ガイドを支えるキャリアの専門家、採用担当者、コーチをご紹介します。実際の採用経験を持つ執筆者が、理想の仕事獲得をサポートします。',
      ogDescription: '履歴書ガイドを支えるキャリアの専門家、採用担当者、コーチをご紹介します。',
    },
    breadcrumb: { home: 'ホーム', about: '私たちについて', authors: '執筆者' },
    hero: {
      title: '専門家チームのご紹介',
      subtitle: 'キャリアコーチ、採用担当者、業界スペシャリストが、実際の採用経験に基づいた実践的な履歴書ガイドを執筆しています。',
    },
    viewProfile: 'プロフィールを見る',
    cta: {
      title: '専門家の知見で履歴書を作成',
      subtitle: 'AIビルダーが専門家推奨の戦略を自動で適用。数分でプロフェッショナルな履歴書を作成できます。',
      button: '無料で履歴書を作成',
    },
  },
  authorProfile: {
    breadcrumb: { home: 'ホーム', about: '私たちについて' },
    atOrg: '{organization}の{jobTitle}',
    authorOfGuides: ' {count}以上のキャリアガイド・記事の著者。',
    connectLinkedIn: 'LinkedInでつながる',
    viewAllGuides: 'すべてのガイドを見る',
    areasOfExpertise: '専門分野',
    resumeGuidesBy: '{name}の履歴書ガイド',
    guidesCount: '{count}件のガイド',
    coverLetterExamplesBy: '{name}のカバーレター例',
    examplesCount: '{count}件の例文',
    blogPostsBy: '{name}のブログ記事',
    postsCount: '{count}件の記事',
    viewAllResumes: '{count}件の履歴書ガイドをすべて見る',
    viewAllCoverLetters: '{count}件のカバーレター例をすべて見る',
    viewAllBlogPosts: '{count}件のブログ記事をすべて見る',
    cta: {
      title: '専門家の知見で履歴書を作成',
      subtitle: '{name}が推奨する戦略を活用。AIビルダーが専門家の履歴書テクニックを自動で適用します。',
      button: '無料で履歴書を作成',
    },
  },
};

const it: AboutPagesContent = {
  about: {
    hero: {
      badge: 'Chi Siamo',
      title: 'Costruiamo il futuro del',
      titleHighlight: 'successo professionale',
      subtitle: 'Best AI Resume ha la missione di aiutare chi cerca lavoro in tutto il mondo a creare curriculum vitae professionali e ottimizzati per gli ATS, aprendo le porte alla carriera dei propri sogni.',
    },
    story: {
      badge: 'La Nostra Storia',
      heading: 'Perch\u00e9 abbiamo creato Best AI Resume',
      p1: 'Ci siamo resi conto che professionisti di talento venivano ignorati semplicemente perch\u00e9 il loro curriculum vitae non superava i sistemi di screening automatizzati. Il processo tradizionale di creazione del CV era lungo, frustrante e spesso produceva documenti che non valorizzavano il vero potenziale dei candidati.',
      p2: 'Per questo abbiamo creato Best AI Resume\u2014una piattaforma che unisce la potenza dell\u2019intelligenza artificiale a un design professionale ed elegante. Il nostro obiettivo \u00e8 semplice: aiutare ogni candidato a presentare il meglio di s\u00e9 ai potenziali datori di lavoro.',
      p3: 'Oggi abbiamo aiutato oltre 50.000 professionisti a ottenere il lavoro dei loro sogni, creando curriculum vitae che si distinguono e superano i filtri ATS con successo.',
    },
    stats: [
      { value: '50K+', label: 'CV Creati' },
      { value: '98%', label: 'Tasso di Superamento ATS' },
      { value: '20+', label: 'Modelli' },
      { value: '4.9', label: 'Valutazione Utenti' },
    ],
    values: {
      badge: 'I Nostri Valori',
      heading: 'Cosa ci guida ogni giorno',
      cards: [
        { title: 'Privacy al Primo Posto', text: 'I tuoi dati appartengono a te. Salviamo i dati del tuo CV localmente nel browser, non sui nostri server. Solo le credenziali del tuo account sono conservate in modo sicuro da noi.' },
        { title: 'Innovazione', text: 'Sfruttiamo la tecnologia AI pi\u00f9 avanzata per aiutarti a scrivere contenuti efficaci che mettano in risalto i tuoi risultati e attirino l\u2019attenzione dei selezionatori.' },
        { title: 'Accessibilit\u00e0', text: 'Gli strumenti professionali per il curriculum vitae non dovrebbero essere nascosti dietro costosi abbonamenti. Offriamo funzionalit\u00e0 potenti accessibili e alla portata di tutti.' },
      ],
    },
    experts: {
      badge: 'Competenza Affidabile',
      heading: 'Incontra i Nostri Esperti di Carriera',
      subtitle: 'Il nostro team di career coach, recruiter e specialisti del settore porta una profonda esperienza nelle guide al curriculum vitae che redige.',
    },
    editorial: {
      heading: 'I Nostri Standard Editoriali',
      items: [
        { title: 'Consigli Basati sui Dati', text: 'Ogni consiglio che condividiamo \u00e8 testato su veri sistemi ATS e verificato da professionisti del settore.' },
        { title: 'Approccio Centrato sull\u2019Uomo', text: 'Crediamo che l\u2019AI debba potenziare, non sostituire. Diamo priorit\u00e0 alle strategie che conquistano prima i selezionatori umani.' },
      ],
    },
    commitment: {
      heading: 'Il Nostro Impegno nei Tuoi Confronti',
      p1: 'In Best AI Resume crediamo che il percorso professionale sia personale. Ecco perch\u00e9 abbiamo costruito una piattaforma che rispetta la tua privacy offrendoti strumenti potenti per avere successo. I dati del tuo CV restano sul tuo dispositivo, dandoti il controllo totale sulle tue informazioni.',
      p2: 'Miglioriamo costantemente i nostri algoritmi di intelligenza artificiale, aggiungiamo nuovi modelli e potenziamo le funzionalit\u00e0 in base al feedback degli utenti. Il tuo successo \u00e8 il nostro successo, e ci impegniamo ad accompagnarti in ogni fase del percorso.',
    },
    cta: {
      title: 'Pronto a unirti a',
      titleHighlight: 'oltre 50.000 storie di successo?',
      subtitle: 'Inizia a creare il tuo curriculum vitae professionale oggi e fai il primo passo verso la carriera dei tuoi sogni.',
      button: 'Inizia Gratis',
    },
  },
  authors: {
    meta: {
      title: 'I Nostri Autori Esperti | Best AI Resume',
      description: 'Scopri gli esperti di carriera, recruiter e coach dietro le nostre guide al curriculum vitae. I nostri autori portano esperienza reale nel recruiting per aiutarti a ottenere il lavoro dei tuoi sogni.',
      ogDescription: 'Scopri gli esperti di carriera, recruiter e coach dietro le nostre guide al curriculum vitae.',
    },
    breadcrumb: { home: 'Home', about: 'Chi Siamo', authors: 'Autori' },
    hero: {
      title: 'Incontra i Nostri Autori Esperti',
      subtitle: 'Il nostro team di career coach, recruiter e specialisti del settore crea guide pratiche al curriculum vitae basate su esperienza reale nel recruiting.',
    },
    viewProfile: 'Vedi Profilo',
    cta: {
      title: 'Crea il Tuo CV con la Guida degli Esperti',
      subtitle: 'Il nostro builder con AI applica le stesse strategie raccomandate dai nostri esperti. Crea un curriculum vitae professionale in pochi minuti.',
      button: 'Crea il Mio CV \u2014 Gratis',
    },
  },
  authorProfile: {
    breadcrumb: { home: 'Home', about: 'Chi Siamo' },
    atOrg: '{jobTitle} presso {organization}',
    authorOfGuides: ' Autore di {count}+ guide di carriera e articoli.',
    connectLinkedIn: 'Collegati su LinkedIn',
    viewAllGuides: 'Vedi Tutte le Guide',
    areasOfExpertise: 'Aree di Competenza',
    resumeGuidesBy: 'Guide al CV di {name}',
    guidesCount: '{count} guide',
    coverLetterExamplesBy: 'Esempi di Lettera di Presentazione di {name}',
    examplesCount: '{count} esempi',
    blogPostsBy: 'Articoli del Blog di {name}',
    postsCount: '{count} articoli',
    viewAllResumes: 'Vedi tutte le {count} guide al CV',
    viewAllCoverLetters: 'Vedi tutti i {count} esempi di lettera di presentazione',
    viewAllBlogPosts: 'Vedi tutti i {count} articoli del blog',
    cta: {
      title: 'Crea il Tuo CV con la Guida degli Esperti',
      subtitle: 'Usa le stesse strategie raccomandate da {name}. Il nostro builder con AI applica automaticamente le tecniche degli esperti per il tuo curriculum vitae.',
      button: 'Crea il Mio CV \u2014 Gratis',
    },
  },
};

const ko: AboutPagesContent = {
  about: {
    hero: {
      badge: '소개',
      title: '커리어 성공의',
      titleHighlight: '미래를 만들어갑니다',
      subtitle: 'Best AI Resume는 전 세계 구직자들이 ATS 최적화된 전문 이력서를 작성하여 꿈의 커리어로 나아갈 수 있도록 돕는 것을 사명으로 합니다. AI 이력서 작성 도구로 취업 활동을 강력하게 지원합니다.',
    },
    story: {
      badge: '우리의 이야기',
      heading: 'Best AI Resume를 만든 이유',
      p1: '우수한 인재들이 이력서가 ATS(지원자 추적 시스템)를 통과하지 못한다는 이유만으로 기회를 잃고 있다는 사실을 알게 되었습니다. 기존의 이력서 작성 방식은 시간이 오래 걸리고, 답답하며, 지원자의 진정한 역량을 보여주지 못하는 경우가 많았습니다.',
      p2: '그래서 AI의 힘과 전문적인 디자인을 결합한 Best AI Resume를 개발했습니다. 목표는 단순합니다. 모든 구직자가 채용 담당자에게 최고의 모습을 보여줄 수 있도록 돕는 것입니다.',
      p3: '지금까지 50,000명 이상의 전문가들이 ATS 심사를 확실히 통과하면서도 돋보이는 이력서를 작성하여 꿈의 직장을 얻었습니다.',
    },
    stats: [
      { value: '50K+', label: '작성된 이력서' },
      { value: '98%', label: 'ATS 통과율' },
      { value: '20+', label: '이력서 템플릿 수' },
      { value: '4.9', label: '사용자 평점' },
    ],
    values: {
      badge: '핵심 가치',
      heading: '우리를 움직이는 원동력',
      cards: [
        { title: '개인정보 보호 최우선', text: '귀하의 데이터는 귀하의 것입니다. 이력서 데이터는 브라우저에 로컬 저장되며 서버로 전송되지 않습니다. 계정 인증 정보만 안전하게 관리합니다.' },
        { title: '혁신', text: '최첨단 AI 기술을 활용하여 성과를 효과적으로 어필하는 매력적인 콘텐츠 작성을 지원합니다.' },
        { title: '접근성', text: '전문적인 이력서 작성 도구가 비싼 유료 서비스 뒤에 숨어있어서는 안 됩니다. 누구나 이용할 수 있는 강력한 기능을 제공합니다.' },
      ],
    },
    experts: {
      badge: '신뢰할 수 있는 전문성',
      heading: '커리어 전문가를 소개합니다',
      subtitle: '커리어 코치, 채용 담당자, 업계 전문가로 구성된 팀이 이력서 가이드에 깊은 전문 지식을 제공합니다.',
    },
    editorial: {
      heading: '편집 기준',
      items: [
        { title: '데이터 기반 조언', text: '모든 조언은 실제 ATS 시스템에서 테스트하고 업계 전문가가 검증합니다.' },
        { title: '사람 중심 접근', text: 'AI는 사람을 대체하는 것이 아니라 돕는 것이어야 한다고 믿습니다. 인간 채용 담당자에게 먼저 어필하는 전략을 우선시합니다.' },
      ],
    },
    commitment: {
      heading: '고객에 대한 약속',
      p1: 'Best AI Resume는 커리어의 여정이 한 사람 한 사람 다르다고 믿습니다. 그래서 개인정보를 존중하면서도 성공을 위한 강력한 도구를 제공하는 플랫폼을 구축했습니다. 이력서 데이터는 사용자의 기기에 저장되어 정보에 대한 완전한 통제가 가능합니다.',
      p2: 'AI 알고리즘 개선, 새로운 템플릿 추가, 사용자 피드백에 기반한 기능 강화를 꾸준히 진행하고 있습니다. 고객의 성공이 곧 우리의 성공입니다. 한 걸음 한 걸음 전력으로 지원하겠습니다.',
    },
    cta: {
      title: '50,000+',
      titleHighlight: '성공 스토리에 함께하시겠습니까?',
      subtitle: '지금 바로 전문적인 이력서 작성을 시작하고, 꿈의 커리어를 향한 첫걸음을 내딛으세요.',
      button: '무료로 시작하기',
    },
  },
  authors: {
    meta: {
      title: '전문가 팀 | Best AI Resume',
      description: '이력서 가이드를 집필하는 커리어 전문가, 채용 담당자, 코치를 소개합니다. 실제 채용 경험을 바탕으로 꿈의 직장 취업을 지원합니다.',
      ogDescription: '이력서 가이드를 집필하는 커리어 전문가, 채용 담당자, 코치를 소개합니다.',
    },
    breadcrumb: { home: '홈', about: '소개', authors: '저자' },
    hero: {
      title: '전문가 팀 소개',
      subtitle: '커리어 코치, 채용 담당자, 업계 전문가가 실제 채용 경험에 기반한 실용적인 이력서 가이드를 집필합니다.',
    },
    viewProfile: '프로필 보기',
    cta: {
      title: '전문가의 노하우로 이력서를 작성하세요',
      subtitle: 'AI 빌더가 전문가 추천 전략을 자동으로 적용합니다. 몇 분 만에 전문적인 이력서를 완성하세요.',
      button: '무료로 이력서 만들기',
    },
  },
  authorProfile: {
    breadcrumb: { home: '홈', about: '소개' },
    atOrg: '{organization} {jobTitle}',
    authorOfGuides: ' {count}개 이상의 커리어 가이드 및 기사 저자.',
    connectLinkedIn: 'LinkedIn에서 연결하기',
    viewAllGuides: '모든 가이드 보기',
    areasOfExpertise: '전문 분야',
    resumeGuidesBy: '{name}의 이력서 가이드',
    guidesCount: '{count}개 가이드',
    coverLetterExamplesBy: '{name}의 자기소개서 예시',
    examplesCount: '{count}개 예시',
    blogPostsBy: '{name}의 블로그 글',
    postsCount: '{count}개 글',
    viewAllResumes: '{count}개 이력서 가이드 모두 보기',
    viewAllCoverLetters: '{count}개 자기소개서 예시 모두 보기',
    viewAllBlogPosts: '{count}개 블로그 글 모두 보기',
    cta: {
      title: '전문가의 노하우로 이력서를 작성하세요',
      subtitle: '{name}이(가) 추천하는 전략을 활용하세요. AI 빌더가 전문가의 이력서 기법을 자동으로 적용합니다.',
      button: '무료로 이력서 만들기',
    },
  },
};

const vi: AboutPagesContent = {
  about: {
    hero: {
      badge: 'Về Chúng Tôi',
      title: 'Xây dựng tương lai của',
      titleHighlight: 'thành công nghề nghiệp',
      subtitle: 'Best AI Resume có sứ mệnh giúp người tìm việc trên toàn thế giới tạo CV chuyên nghiệp, tối ưu ATS, mở cánh cửa đến sự nghiệp mơ ước.',
    },
    story: {
      badge: 'Câu Chuyện Của Chúng Tôi',
      heading: 'Tại sao chúng tôi xây dựng Best AI Resume',
      p1: 'Chúng tôi nhận ra rằng nhiều chuyên gia tài năng bị bỏ qua chỉ vì CV của họ không vượt qua được hệ thống sàng lọc tự động ATS. Quy trình tạo CV truyền thống tốn thời gian, gây bực bội và thường tạo ra những tài liệu không thể hiện hết tiềm năng thực sự của ứng viên.',
      p2: 'Vì vậy chúng tôi đã tạo Best AI Resume—nền tảng kết hợp sức mạnh trí tuệ nhân tạo với thiết kế chuyên nghiệp. Mục tiêu rất đơn giản: giúp mọi ứng viên thể hiện tốt nhất trước nhà tuyển dụng.',
      p3: 'Đến nay, chúng tôi đã giúp hơn 50.000 chuyên gia có được công việc mơ ước bằng những CV nổi bật và vượt qua hệ thống ATS thành công.',
    },
    stats: [
      { value: '50K+', label: 'CV Đã Tạo' },
      { value: '98%', label: 'Tỷ Lệ Vượt ATS' },
      { value: '20+', label: 'Mẫu CV' },
      { value: '4.9', label: 'Đánh Giá Người Dùng' },
    ],
    values: {
      badge: 'Giá Trị Cốt Lõi',
      heading: 'Điều thúc đẩy chúng tôi mỗi ngày',
      cards: [
        { title: 'Bảo Mật Hàng Đầu', text: 'Dữ liệu của bạn thuộc về bạn. Chúng tôi lưu dữ liệu CV trên trình duyệt, không phải trên server. Chỉ thông tin đăng nhập được lưu trữ an toàn bởi chúng tôi.' },
        { title: 'Đổi Mới Sáng Tạo', text: 'Chúng tôi tận dụng công nghệ AI tiên tiến nhất để giúp bạn viết nội dung hấp dẫn, nổi bật thành tích và thu hút nhà tuyển dụng.' },
        { title: 'Dễ Tiếp Cận', text: 'Công cụ CV chuyên nghiệp không nên bị giấu sau những gói đăng ký đắt đỏ. Chúng tôi cung cấp tính năng mạnh mẽ cho mọi người.' },
      ],
    },
    experts: {
      badge: 'Chuyên Gia Uy Tín',
      heading: 'Gặp Gỡ Chuyên Gia Nghề Nghiệp',
      subtitle: 'Đội ngũ tư vấn viên nghề nghiệp, nhà tuyển dụng và chuyên gia ngành mang đến kinh nghiệm sâu rộng trong các hướng dẫn viết CV.',
    },
    editorial: {
      heading: 'Tiêu Chuẩn Biên Tập',
      items: [
        { title: 'Tư Vấn Dựa Trên Dữ Liệu', text: 'Mọi lời khuyên đều được kiểm tra trên hệ thống ATS thực và xác minh bởi chuyên gia ngành.' },
        { title: 'Tiếp Cận Lấy Con Người Làm Trung Tâm', text: 'Chúng tôi tin rằng AI nên hỗ trợ chứ không thay thế. Ưu tiên chiến lược chinh phục nhà tuyển dụng trước tiên.' },
      ],
    },
    commitment: {
      heading: 'Cam Kết Với Bạn',
      p1: 'Tại Best AI Resume, chúng tôi tin rằng hành trình nghề nghiệp là riêng của mỗi người. Vì vậy chúng tôi xây dựng nền tảng tôn trọng quyền riêng tư đồng thời cung cấp công cụ mạnh mẽ giúp bạn thành công. Dữ liệu CV ở trên thiết bị của bạn, cho bạn toàn quyền kiểm soát.',
      p2: 'Chúng tôi liên tục cải tiến thuật toán AI, bổ sung mẫu mới và nâng cấp tính năng dựa trên phản hồi người dùng. Thành công của bạn là thành công của chúng tôi.',
    },
    cta: {
      title: 'Sẵn sàng gia nhập',
      titleHighlight: 'hơn 50.000 câu chuyện thành công?',
      subtitle: 'Bắt đầu tạo CV chuyên nghiệp ngay hôm nay và bước đầu tiên đến sự nghiệp mơ ước.',
      button: 'Bắt Đầu Miễn Phí',
    },
  },
  authors: {
    meta: {
      title: 'Đội Ngũ Chuyên Gia | Best AI Resume',
      description: 'Gặp gỡ các chuyên gia nghề nghiệp, nhà tuyển dụng và tư vấn viên đứng sau các hướng dẫn viết CV. Đội ngũ mang kinh nghiệm tuyển dụng thực tế giúp bạn có được công việc mơ ước.',
      ogDescription: 'Gặp gỡ các chuyên gia nghề nghiệp, nhà tuyển dụng và tư vấn viên đứng sau các hướng dẫn viết CV.',
    },
    breadcrumb: { home: 'Trang Chủ', about: 'Về Chúng Tôi', authors: 'Tác Giả' },
    hero: {
      title: 'Gặp Gỡ Đội Ngũ Chuyên Gia',
      subtitle: 'Đội ngũ tư vấn viên nghề nghiệp, nhà tuyển dụng và chuyên gia ngành tạo ra các hướng dẫn CV thực tiễn dựa trên kinh nghiệm tuyển dụng thực tế.',
    },
    viewProfile: 'Xem Hồ Sơ',
    cta: {
      title: 'Tạo CV Với Hướng Dẫn Từ Chuyên Gia',
      subtitle: 'Công cụ AI áp dụng các chiến lược được chuyên gia khuyên dùng. Tạo CV chuyên nghiệp trong vài phút.',
      button: 'Tạo CV Miễn Phí',
    },
  },
  authorProfile: {
    breadcrumb: { home: 'Trang Chủ', about: 'Về Chúng Tôi' },
    atOrg: '{jobTitle} tại {organization}',
    authorOfGuides: ' Tác giả của hơn {count} hướng dẫn nghề nghiệp và bài viết.',
    connectLinkedIn: 'Kết Nối Trên LinkedIn',
    viewAllGuides: 'Xem Tất Cả Hướng Dẫn',
    areasOfExpertise: 'Lĩnh Vực Chuyên Môn',
    resumeGuidesBy: 'Hướng Dẫn CV của {name}',
    guidesCount: '{count} hướng dẫn',
    coverLetterExamplesBy: 'Mẫu Thư Xin Việc của {name}',
    examplesCount: '{count} mẫu',
    blogPostsBy: 'Bài Viết Blog của {name}',
    postsCount: '{count} bài viết',
    viewAllResumes: 'Xem tất cả {count} hướng dẫn CV',
    viewAllCoverLetters: 'Xem tất cả {count} mẫu thư xin việc',
    viewAllBlogPosts: 'Xem tất cả {count} bài viết blog',
    cta: {
      title: 'Tạo CV Với Hướng Dẫn Từ Chuyên Gia',
      subtitle: 'Áp dụng chiến lược được {name} khuyên dùng. Công cụ AI tự động áp dụng kỹ thuật viết CV từ chuyên gia.',
      button: 'Tạo CV Miễn Phí',
    },
  },
};

const th: AboutPagesContent = {
  about: {
    hero: {
      badge: 'เกี่ยวกับเรา',
      title: 'สร้างอนาคตของ',
      titleHighlight: 'ความสำเร็จในอาชีพ',
      subtitle: 'Best AI Resume มีพันธกิจช่วยให้ผู้หางานทั่วโลกสร้างเรซูเม่มืออาชีพที่ผ่านระบบ ATS ได้อย่างมั่นใจ เปิดประตูสู่อาชีพในฝันของคุณ',
    },
    story: {
      badge: 'เรื่องราวของเรา',
      heading: 'ทำไมเราจึงสร้าง Best AI Resume',
      p1: 'เราพบว่ามืออาชีพที่มีความสามารถจำนวนมากถูกมองข้าม เพียงเพราะเรซูเม่ของพวกเขาไม่ผ่านระบบคัดกรองอัตโนมัติ กระบวนการสร้างเรซูเม่แบบเดิมนั้นใช้เวลานาน สร้างความหงุดหงิด และมักสร้างเอกสารที่ไม่สามารถแสดงศักยภาพที่แท้จริงของผู้สมัครได้',
      p2: 'นั่นคือเหตุผลที่เราสร้าง Best AI Resume ขึ้นมา แพลตฟอร์มที่ผสมผสานพลังของปัญญาประดิษฐ์เข้ากับดีไซน์ที่สวยงามและเป็นมืออาชีพ เป้าหมายของเรานั้นเรียบง่าย: ช่วยให้ผู้หางานทุกคนนำเสนอตัวเองได้ดีที่สุดต่อนายจ้าง',
      p3: 'จนถึงวันนี้ เราได้ช่วยผู้เชี่ยวชาญกว่า 50,000 คนให้ได้งานในฝัน ด้วยการสร้างเรซูเม่ที่โดดเด่นและผ่านระบบ ATS ได้อย่างราบรื่น',
    },
    stats: [
      { value: '50K+', label: 'เรซูเม่ที่สร้างแล้ว' },
      { value: '98%', label: 'อัตราผ่าน ATS' },
      { value: '20+', label: 'เทมเพลต' },
      { value: '4.9', label: 'คะแนนจากผู้ใช้' },
    ],
    values: {
      badge: 'ค่านิยมของเรา',
      heading: 'สิ่งที่ขับเคลื่อนเราไปข้างหน้า',
      cards: [
        { title: 'ความเป็นส่วนตัวมาก่อน', text: 'ข้อมูลของคุณเป็นของคุณ เราจัดเก็บข้อมูลเรซูเม่ในเบราว์เซอร์ของคุณ ไม่ใช่บนเซิร์ฟเวอร์ของเรา มีเพียงข้อมูลยืนยันตัวตนเท่านั้นที่จัดเก็บอย่างปลอดภัยฝั่งเรา' },
        { title: 'นวัตกรรม', text: 'เราใช้เทคโนโลยี AI ล้ำสมัยเพื่อช่วยคุณเขียนเนื้อหาที่น่าสนใจ เน้นผลงาน และดึงดูดความสนใจจากผู้จ้างงาน' },
        { title: 'การเข้าถึง', text: 'เครื่องมือสร้างเรซูเม่มืออาชีพไม่ควรอยู่เบื้องหลังราคาที่แพงเกินไป เรามอบฟีเจอร์อันทรงพลังที่ทุกคนเข้าถึงได้' },
      ],
    },
    experts: {
      badge: 'ความเชี่ยวชาญที่น่าเชื่อถือ',
      heading: 'พบกับผู้เชี่ยวชาญด้านอาชีพของเรา',
      subtitle: 'ทีมงานของเราประกอบด้วยโค้ชด้านอาชีพ ผู้เชี่ยวชาญด้านการสรรหาบุคลากร และผู้เชี่ยวชาญเฉพาะด้าน ที่นำความรู้เชิงลึกมาสู่คู่มือเรซูเม่ที่พวกเขาเขียน',
    },
    editorial: {
      heading: 'มาตรฐานบรรณาธิการของเรา',
      items: [
        { title: 'คำแนะนำที่อิงข้อมูล', text: 'ทุกคำแนะนำที่เราแบ่งปันได้รับการทดสอบกับระบบ ATS จริง และตรวจสอบโดยผู้เชี่ยวชาญในอุตสาหกรรม' },
        { title: 'แนวทางที่เน้นมนุษย์เป็นหลัก', text: 'เราเชื่อว่า AI ควรเสริมศักยภาพ ไม่ใช่ทดแทน เราให้ความสำคัญกับกลยุทธ์ที่ดึงดูดผู้จ้างงานจริง ๆ ก่อน' },
      ],
    },
    commitment: {
      heading: 'คำมั่นสัญญาของเราต่อคุณ',
      p1: 'ที่ Best AI Resume เราเชื่อว่าเส้นทางอาชีพเป็นเรื่องเฉพาะตัวของแต่ละคน นั่นคือเหตุผลที่เราสร้างแพลตฟอร์มที่เคารพความเป็นส่วนตัวของคุณ พร้อมมอบเครื่องมืออันทรงพลังเพื่อความสำเร็จ ข้อมูลเรซูเม่จะอยู่บนอุปกรณ์ของคุณ ให้คุณควบคุมข้อมูลได้อย่างสมบูรณ์',
      p2: 'เราพัฒนาอัลกอริทึม AI อย่างต่อเนื่อง เพิ่มเทมเพลตใหม่ และปรับปรุงฟีเจอร์ต่าง ๆ ตามความคิดเห็นของผู้ใช้ ความสำเร็จของคุณคือความสำเร็จของเรา และเรามุ่งมั่นสนับสนุนคุณทุกขั้นตอน',
    },
    cta: {
      title: 'พร้อมเข้าร่วมกับ',
      titleHighlight: 'เรื่องราวความสำเร็จกว่า 50,000 เรื่อง?',
      subtitle: 'เริ่มสร้างเรซูเม่มืออาชีพของคุณวันนี้ และก้าวแรกสู่อาชีพในฝัน',
      button: 'เริ่มต้นฟรี',
    },
  },
  authors: {
    meta: {
      title: 'ทีมผู้เชี่ยวชาญของเรา | Best AI Resume',
      description: 'พบกับผู้เชี่ยวชาญด้านอาชีพ ผู้จ้างงาน และโค้ชที่อยู่เบื้องหลังคู่มือเรซูเม่ของเรา ผู้เขียนของเรานำประสบการณ์จริงด้านการสรรหาบุคลากรมาช่วยคุณได้งานในฝัน',
      ogDescription: 'พบกับผู้เชี่ยวชาญด้านอาชีพ ผู้จ้างงาน และโค้ชที่อยู่เบื้องหลังคู่มือเรซูเม่ของเรา',
    },
    breadcrumb: { home: 'หน้าแรก', about: 'เกี่ยวกับเรา', authors: 'ผู้เขียน' },
    hero: {
      title: 'พบกับทีมผู้เชี่ยวชาญของเรา',
      subtitle: 'ทีมโค้ชด้านอาชีพ ผู้เชี่ยวชาญด้านการสรรหาบุคลากร และผู้เชี่ยวชาญเฉพาะด้านสร้างคู่มือเรซูเม่ที่ใช้ได้จริง จากประสบการณ์จริงในการจ้างงาน',
    },
    viewProfile: 'ดูโปรไฟล์',
    cta: {
      title: 'สร้างเรซูเม่ด้วยคำแนะนำจากผู้เชี่ยวชาญ',
      subtitle: 'เครื่องมือ AI ของเราใช้กลยุทธ์เดียวกับที่ผู้เชี่ยวชาญแนะนำ สร้างเรซูเม่มืออาชีพได้ในไม่กี่นาที',
      button: 'สร้างเรซูเม่ฟรี',
    },
  },
  authorProfile: {
    breadcrumb: { home: 'หน้าแรก', about: 'เกี่ยวกับเรา' },
    atOrg: '{jobTitle} ที่ {organization}',
    authorOfGuides: ' ผู้เขียนคู่มืออาชีพและบทความมากกว่า {count} ชิ้น',
    connectLinkedIn: 'เชื่อมต่อบน LinkedIn',
    viewAllGuides: 'ดูคู่มือทั้งหมด',
    areasOfExpertise: 'ด้านที่เชี่ยวชาญ',
    resumeGuidesBy: 'คู่มือเรซูเม่โดย {name}',
    guidesCount: '{count} คู่มือ',
    coverLetterExamplesBy: 'ตัวอย่างจดหมายสมัครงานโดย {name}',
    examplesCount: '{count} ตัวอย่าง',
    blogPostsBy: 'บทความบล็อกโดย {name}',
    postsCount: '{count} บทความ',
    viewAllResumes: 'ดูคู่มือเรซูเม่ทั้งหมด {count} รายการ',
    viewAllCoverLetters: 'ดูตัวอย่างจดหมายสมัครงานทั้งหมด {count} รายการ',
    viewAllBlogPosts: 'ดูบทความบล็อกทั้งหมด {count} รายการ',
    cta: {
      title: 'สร้างเรซูเม่ด้วยคำแนะนำจากผู้เชี่ยวชาญ',
      subtitle: 'ใช้กลยุทธ์เดียวกับที่ {name} แนะนำ เครื่องมือ AI ของเราจะนำเทคนิคการเขียนเรซูเม่จากผู้เชี่ยวชาญมาใช้โดยอัตโนมัติ',
      button: 'สร้างเรซูเม่ฟรี',
    },
  },
};

const pt: AboutPagesContent = {
  about: {
    hero: {
      badge: 'Sobre Nos',
      title: 'Construindo o futuro do',
      titleHighlight: 'sucesso profissional',
      subtitle: 'A Best AI Resume tem a missao de ajudar candidatos em todo o mundo a criar curriculos profissionais e otimizados para ATS, abrindo as portas para a carreira dos sonhos.',
    },
    story: {
      badge: 'Nossa Historia',
      heading: 'Por que criamos a Best AI Resume',
      p1: 'Percebemos que profissionais talentosos eram ignorados simplesmente porque seu curriculo nao passava pelos sistemas de triagem automatizada. O processo tradicional de criacao de curriculo era demorado, frustrante e muitas vezes produzia documentos que nao valorizavam o real potencial dos candidatos.',
      p2: 'Por isso criamos a Best AI Resume — uma plataforma que une o poder da inteligencia artificial a um design profissional e elegante. Nosso objetivo e simples: ajudar cada candidato a apresentar o melhor de si mesmo aos potenciais empregadores.',
      p3: 'Hoje ja ajudamos mais de 50.000 profissionais a conquistar o emprego dos sonhos, criando curriculos que se destacam e passam pelos filtros ATS com sucesso.',
    },
    stats: [
      { value: '50K+', label: 'Curriculos Criados' },
      { value: '98%', label: 'Taxa de Aprovacao ATS' },
      { value: '20+', label: 'Modelos' },
      { value: '4.9', label: 'Avaliacao dos Usuarios' },
    ],
    values: {
      badge: 'Nossos Valores',
      heading: 'O que nos guia todos os dias',
      cards: [
        { title: 'Privacidade em Primeiro Lugar', text: 'Seus dados sao seus. Salvamos os dados do seu curriculo localmente no navegador, nao em nossos servidores. Apenas as credenciais da sua conta sao armazenadas de forma segura por nos.' },
        { title: 'Inovacao', text: 'Utilizamos a mais avancada tecnologia de IA para ajudar voce a escrever conteudo eficaz que destaque suas conquistas e atraia a atencao dos recrutadores.' },
        { title: 'Acessibilidade', text: 'Ferramentas profissionais de curriculo nao deveriam estar escondidas atras de assinaturas caras. Oferecemos funcionalidades poderosas acessiveis a todos.' },
      ],
    },
    experts: {
      badge: 'Especialistas de Confianca',
      heading: 'Conheca Nossos Especialistas de Carreira',
      subtitle: 'Nossa equipe de coaches de carreira, recrutadores e especialistas do setor traz experiencia profunda nos guias de curriculo que elabora.',
    },
    editorial: {
      heading: 'Nossos Padroes Editoriais',
      items: [
        { title: 'Conselhos Baseados em Dados', text: 'Cada dica que compartilhamos e testada em sistemas ATS reais e verificada por profissionais do setor.' },
        { title: 'Abordagem Centrada no Humano', text: 'Acreditamos que a IA deve potencializar, nao substituir. Priorizamos estrategias que conquistam primeiro os recrutadores humanos.' },
      ],
    },
    commitment: {
      heading: 'Nosso Compromisso com Voce',
      p1: 'Na Best AI Resume acreditamos que a trajetoria profissional e pessoal. Por isso construimos uma plataforma que respeita sua privacidade oferecendo ferramentas poderosas para ter sucesso. Os dados do seu curriculo permanecem no seu dispositivo, dando a voce controle total sobre suas informacoes.',
      p2: 'Melhoramos constantemente nossos algoritmos de inteligencia artificial, adicionamos novos modelos e aprimoramos funcionalidades com base no feedback dos usuarios. Seu sucesso e o nosso sucesso, e nos comprometemos a acompanha-lo em cada etapa.',
    },
    cta: {
      title: 'Pronto para se juntar a',
      titleHighlight: 'mais de 50.000 historias de sucesso?',
      subtitle: 'Comece a criar seu curriculo profissional hoje e da o primeiro passo em direcao a carreira dos seus sonhos.',
      button: 'Comecar Gratis',
    },
  },
  authors: {
    meta: {
      title: 'Nossos Autores Especialistas | Best AI Resume',
      description: 'Conheca os especialistas de carreira, recrutadores e coaches por tras de nossos guias de curriculo. Nossos autores trazem experiencia real em recrutamento para ajuda-lo a conquistar o emprego dos sonhos.',
      ogDescription: 'Conheca os especialistas de carreira, recrutadores e coaches por tras de nossos guias de curriculo.',
    },
    breadcrumb: { home: 'Inicio', about: 'Sobre Nos', authors: 'Autores' },
    hero: {
      title: 'Conheca Nossos Autores Especialistas',
      subtitle: 'Nossa equipe de coaches de carreira, recrutadores e especialistas do setor cria guias praticos de curriculo baseados em experiencia real em recrutamento.',
    },
    viewProfile: 'Ver Perfil',
    cta: {
      title: 'Crie Seu Curriculo com Orientacao de Especialistas',
      subtitle: 'Nosso construtor com IA aplica as mesmas estrategias recomendadas por nossos especialistas. Crie um curriculo profissional em poucos minutos.',
      button: 'Criar Meu Curriculo — Gratis',
    },
  },
  authorProfile: {
    breadcrumb: { home: 'Inicio', about: 'Sobre Nos' },
    atOrg: '{jobTitle} na {organization}',
    authorOfGuides: ' Autor(a) de {count}+ guias de carreira e artigos.',
    connectLinkedIn: 'Conectar no LinkedIn',
    viewAllGuides: 'Ver Todos os Guias',
    areasOfExpertise: 'Areas de Especialidade',
    resumeGuidesBy: 'Guias de Curriculo de {name}',
    guidesCount: '{count} guias',
    coverLetterExamplesBy: 'Exemplos de Carta de Apresentacao de {name}',
    examplesCount: '{count} exemplos',
    blogPostsBy: 'Artigos do Blog de {name}',
    postsCount: '{count} artigos',
    viewAllResumes: 'Ver todos os {count} guias de curriculo',
    viewAllCoverLetters: 'Ver todos os {count} exemplos de carta de apresentacao',
    viewAllBlogPosts: 'Ver todos os {count} artigos do blog',
    cta: {
      title: 'Crie Seu Curriculo com Orientacao de Especialistas',
      subtitle: 'Use as mesmas estrategias recomendadas por {name}. Nosso construtor com IA aplica automaticamente as tecnicas dos especialistas para o seu curriculo.',
      button: 'Criar Meu Curriculo — Gratis',
    },
  },
};

const tr: AboutPagesContent = {
  about: {
    hero: {
      badge: 'Hakkımızda',
      title: 'Mesleki başarının geleceğini',
      titleHighlight: 'inşa ediyoruz',
      subtitle: 'Best AI Resume, dünya genelindeki iş arayanların ATS uyumlu profesyonel CV\'ler oluşturmasına yardımcı olma misyonuyla, kariyer hayallerine açılan kapıyı açıyor.',
    },
    story: {
      badge: 'Hikayemiz',
      heading: 'Best AI Resume\'yu neden oluşturduk',
      p1: 'Yetenekli profesyonellerin, CV\'leri otomatik tarama sistemlerinden geçemediği için göz ardı edildiğini fark ettik. Geleneksel CV oluşturma süreci zaman alıcı, sinir bozucu ve çoğu zaman adayların gerçek potansiyelini yansıtmayan belgeler üretiyordu.',
      p2: 'Bu yüzden Best AI Resume\'yu oluşturduk — yapay zekanın gücünü profesyonel ve zarif bir tasarımla birleştiren bir platform. Amacımız basit: her adayın potansiyel işverenlere en iyi şekilde kendini sunmasına yardımcı olmak.',
      p3: 'Bugüne kadar 50.000\'den fazla profesyonelin hayallerindeki işi bulmasına yardımcı olduk; öne çıkan ve ATS filtrelerinden başarıyla geçen CV\'ler oluşturduk.',
    },
    stats: [
      { value: '50K+', label: 'Oluşturulan CV' },
      { value: '98%', label: 'ATS Geçme Oranı' },
      { value: '20+', label: 'Şablon' },
      { value: '4.9', label: 'Kullanıcı Puanı' },
    ],
    values: {
      badge: 'Değerlerimiz',
      heading: 'Bizi her gün ileriye taşıyan şey',
      cards: [
        { title: 'Önce Gizlilik', text: 'Verileriniz size aittir. CV verilerinizi sunucularımızda değil, tarayıcınızda yerel olarak kaydediyoruz. Yalnızca hesap kimlik bilgileriniz güvenli şekilde tarafımızca saklanır.' },
        { title: 'İnovasyon', text: 'Başarılarınızı öne çıkaran ve işe alım uzmanlarının dikkatini çeken etkili içerik yazmanıza yardımcı olmak için en gelişmiş AI teknolojisini kullanıyoruz.' },
        { title: 'Erişilebilirlik', text: 'Profesyonel CV araçları pahalı aboneliklerin arkasına gizlenmemelidir. Herkese açık güçlü özellikler sunuyoruz.' },
      ],
    },
    experts: {
      badge: 'Güvenilir Uzmanlık',
      heading: 'Kariyer Uzmanlarımızla Tanışın',
      subtitle: 'Kariyer koçları, işe alım uzmanları ve sektör profesyonellerinden oluşan ekibimiz, hazırladıkları CV rehberlerine derin uzmanlık katar.',
    },
    editorial: {
      heading: 'Editoryal Standartlarımız',
      items: [
        { title: 'Veriye Dayalı Tavsiyeler', text: 'Paylaştığımız her ipucu gerçek ATS sistemlerinde test edilmiş ve sektör profesyonelleri tarafından doğrulanmıştır.' },
        { title: 'İnsan Odaklı Yaklaşım', text: 'AI\'nın güçlendirmesi gerektiğine, yerini almaması gerektiğine inanıyoruz. Önce gerçek işe alım uzmanlarını etkileyen stratejileri ön plana çıkarıyoruz.' },
      ],
    },
    commitment: {
      heading: 'Size Olan Taahhüdümüz',
      p1: 'Best AI Resume olarak kariyer yolculuğunun kişisel olduğuna inanıyoruz. Bu yüzden gizliliğinize saygı gösteren ve başarı için güçlü araçlar sunan bir platform oluşturduk. CV verileriniz cihazınızda kalır, bilgileriniz üzerinde tam kontrol sizdedir.',
      p2: 'AI algoritmalarımızı sürekli iyileştiriyor, yeni şablonlar ekliyor ve kullanıcı geri bildirimlerine göre özellikleri geliştiriyoruz. Başarınız bizim başarımızdır ve her adımda yanınızda olmaya kararlıyız.',
    },
    cta: {
      title: 'Katılmaya hazır mısınız:',
      titleHighlight: '50.000\'den fazla başarı hikayesi?',
      subtitle: 'Bugün profesyonel CV\'nizi oluşturmaya başlayın ve hayalinizdeki kariyere ilk adımı atın.',
      button: 'Ücretsiz Başla',
    },
  },
  authors: {
    meta: {
      title: 'Uzman Yazarlarımız | Best AI Resume',
      description: 'CV rehberlerimizin arkasındaki kariyer uzmanları, işe alım uzmanları ve koçlarla tanışın. Yazarlarımız, hayalinizdeki işi bulmanıza yardımcı olmak için gerçek işe alım deneyimi sunuyor.',
      ogDescription: 'CV rehberlerimizin arkasındaki kariyer uzmanları, işe alım uzmanları ve koçlarla tanışın.',
    },
    breadcrumb: { home: 'Ana Sayfa', about: 'Hakkımızda', authors: 'Yazarlar' },
    hero: {
      title: 'Uzman Yazarlarımızla Tanışın',
      subtitle: 'Kariyer koçları, işe alım uzmanları ve sektör profesyonellerinden oluşan ekibimiz, gerçek işe alım deneyimine dayanan pratik CV rehberleri hazırlar.',
    },
    viewProfile: 'Profili Gör',
    cta: {
      title: 'Uzman Rehberliğiyle CV\'nizi Oluşturun',
      subtitle: 'AI oluşturucumuz, uzmanlarımızın önerdiği stratejilerin aynısını uygular. Dakikalar içinde profesyonel bir CV hazırlayın.',
      button: 'CV\'mi Oluştur — Ücretsiz',
    },
  },
  authorProfile: {
    breadcrumb: { home: 'Ana Sayfa', about: 'Hakkımızda' },
    atOrg: '{organization}\'da {jobTitle}',
    authorOfGuides: ' {count}\'den fazla kariyer rehberi ve makalenin yazarı.',
    connectLinkedIn: 'LinkedIn\'de Bağlan',
    viewAllGuides: 'Tüm Rehberleri Gör',
    areasOfExpertise: 'Uzmanlık Alanları',
    resumeGuidesBy: '{name} tarafından CV Rehberleri',
    guidesCount: '{count} rehber',
    coverLetterExamplesBy: '{name} tarafından Ön Yazı Örnekleri',
    examplesCount: '{count} örnek',
    blogPostsBy: '{name} tarafından Blog Yazıları',
    postsCount: '{count} yazı',
    viewAllResumes: '{count} CV rehberinin tamamını gör',
    viewAllCoverLetters: '{count} ön yazı örneğinin tamamını gör',
    viewAllBlogPosts: '{count} blog yazısının tamamını gör',
    cta: {
      title: 'Uzman Rehberliğiyle CV\'nizi Oluşturun',
      subtitle: '{name}\'in önerdiği stratejilerin aynısını kullanın. AI oluşturucumuz, uzman CV yazma tekniklerini otomatik olarak uygular.',
      button: 'CV\'mi Oluştur — Ücretsiz',
    },
  },
};

const id: AboutPagesContent = {
  about: {
    hero: {
      badge: 'Tentang Kami',
      title: 'Membangun masa depan',
      titleHighlight: 'kesuksesan profesional',
      subtitle: 'Best AI Resume hadir dengan misi membantu pencari kerja di seluruh dunia membuat CV profesional yang kompatibel ATS, membuka pintu menuju karier impian mereka.',
    },
    story: {
      badge: 'Cerita Kami',
      heading: 'Mengapa kami membangun Best AI Resume',
      p1: 'Kami menyadari bahwa banyak profesional berbakat diabaikan hanya karena CV mereka tidak bisa lolos sistem seleksi otomatis. Proses pembuatan CV tradisional memakan waktu, membuat frustrasi, dan seringkali menghasilkan dokumen yang tidak mencerminkan potensi nyata kandidat.',
      p2: 'Itulah mengapa kami membangun Best AI Resume — platform yang menggabungkan kekuatan kecerdasan buatan dengan desain yang elegan dan profesional. Tujuan kami sederhana: membantu setiap kandidat mempresentasikan diri mereka sebaik mungkin kepada calon pemberi kerja.',
      p3: 'Hingga kini, kami telah membantu lebih dari 50.000 profesional menemukan pekerjaan impian mereka; membuat CV yang menonjol dan berhasil melewati filter ATS.',
    },
    stats: [
      { value: '50K+', label: 'CV yang Dibuat' },
      { value: '98%', label: 'Tingkat Lolos ATS' },
      { value: '20+', label: 'Template' },
      { value: '4.9', label: 'Rating Pengguna' },
    ],
    values: {
      badge: 'Nilai-Nilai Kami',
      heading: 'Yang mendorong kami setiap hari',
      cards: [
        { title: 'Privasi Pertama', text: 'Data Anda adalah milik Anda. Kami menyimpan data CV Anda secara lokal di browser, bukan di server kami. Hanya kredensial akun Anda yang kami simpan dengan aman.' },
        { title: 'Inovasi', text: 'Kami menggunakan teknologi AI terdepan untuk membantu Anda menulis konten yang efektif, menonjolkan pencapaian, dan menarik perhatian rekruter.' },
        { title: 'Aksesibilitas', text: 'Alat CV profesional seharusnya tidak tersembunyi di balik langganan mahal. Kami menyediakan fitur-fitur hebat yang bisa diakses semua orang.' },
      ],
    },
    experts: {
      badge: 'Keahlian Terpercaya',
      heading: 'Temukan Pakar Karier Kami',
      subtitle: 'Tim kami yang terdiri dari pelatih karier, rekruter, dan profesional industri memberikan keahlian mendalam pada panduan CV yang mereka tulis.',
    },
    editorial: {
      heading: 'Standar Editorial Kami',
      items: [
        { title: 'Saran Berbasis Data', text: 'Setiap tips yang kami bagikan telah diuji pada sistem ATS nyata dan divalidasi oleh profesional industri.' },
        { title: 'Pendekatan Human-First', text: 'Kami percaya AI harus memperkuat, bukan menggantikan. Kami mengutamakan strategi yang benar-benar berdampak pada rekruter nyata.' },
      ],
    },
    commitment: {
      heading: 'Komitmen Kami kepada Anda',
      p1: 'Di Best AI Resume, kami percaya bahwa perjalanan karier itu personal. Itulah mengapa kami membangun platform yang menghormati privasi Anda dan memberikan alat yang kuat untuk meraih kesuksesan. Data CV Anda tetap ada di perangkat Anda — Anda memiliki kendali penuh atas informasi Anda.',
      p2: 'Kami terus meningkatkan algoritma AI kami, menambahkan template baru, dan mengembangkan fitur berdasarkan umpan balik pengguna. Kesuksesan Anda adalah kesuksesan kami, dan kami berkomitmen untuk selalu mendampingi Anda.',
    },
    cta: {
      title: 'Siap bergabung dengan:',
      titleHighlight: '50.000+ kisah sukses?',
      subtitle: 'Mulai buat CV profesional Anda hari ini dan ambil langkah pertama menuju karier impian Anda.',
      button: 'Mulai Gratis',
    },
  },
  authors: {
    meta: {
      title: 'Penulis Ahli Kami | Best AI Resume',
      description: 'Kenali para pakar karier, rekruter, dan pelatih di balik panduan CV kami. Penulis kami membawa pengalaman rekrutmen nyata untuk membantu Anda menemukan pekerjaan impian.',
      ogDescription: 'Kenali para pakar karier, rekruter, dan pelatih di balik panduan CV kami.',
    },
    breadcrumb: { home: 'Beranda', about: 'Tentang Kami', authors: 'Penulis' },
    hero: {
      title: 'Temukan Penulis Ahli Kami',
      subtitle: 'Tim kami yang terdiri dari pelatih karier, rekruter, dan profesional industri menyusun panduan CV praktis berdasarkan pengalaman rekrutmen nyata.',
    },
    viewProfile: 'Lihat Profil',
    cta: {
      title: 'Buat CV Anda dengan Panduan Ahli',
      subtitle: 'Pembuat AI kami menerapkan strategi yang sama yang direkomendasikan oleh para ahli kami. Siapkan CV profesional dalam hitungan menit.',
      button: 'Buat CV Saya — Gratis',
    },
  },
  authorProfile: {
    breadcrumb: { home: 'Beranda', about: 'Tentang Kami' },
    atOrg: '{jobTitle} di {organization}',
    authorOfGuides: ' Penulis {count}+ panduan karier dan artikel.',
    connectLinkedIn: 'Terhubung di LinkedIn',
    viewAllGuides: 'Lihat Semua Panduan',
    areasOfExpertise: 'Area Keahlian',
    resumeGuidesBy: 'Panduan CV oleh {name}',
    guidesCount: '{count} panduan',
    coverLetterExamplesBy: 'Contoh Surat Lamaran oleh {name}',
    examplesCount: '{count} contoh',
    blogPostsBy: 'Artikel Blog oleh {name}',
    postsCount: '{count} artikel',
    viewAllResumes: 'Lihat semua {count} panduan CV',
    viewAllCoverLetters: 'Lihat semua {count} contoh surat lamaran',
    viewAllBlogPosts: 'Lihat semua {count} artikel blog',
    cta: {
      title: 'Buat CV Anda dengan Panduan Ahli',
      subtitle: 'Gunakan strategi yang sama yang direkomendasikan oleh {name}. Pembuat AI kami secara otomatis menerapkan teknik penulisan CV dari para ahli.',
      button: 'Buat CV Saya — Gratis',
    },
  },
};

const pl: AboutPagesContent = {
  about: {
    hero: {
      badge: 'O nas',
      title: 'Budujemy przyszłość',
      titleHighlight: 'sukcesu zawodowego',
      subtitle: 'Best AI Resume pomaga kandydatom na całym świecie tworzyć profesjonalne CV zgodne z ATS, otwierając drzwi do wymarzonej kariery.',
    },
    story: {
      badge: 'Nasza historia',
      heading: 'Dlaczego stworzyliśmy Best AI Resume',
      p1: 'Dostrzegliśmy, że utalentowani profesjonaliści są pomijani tylko dlatego, że ich CV nie przechodzi przez automatyczne systemy selekcji. Tradycyjny proces tworzenia CV jest czasochłonny, frustrujący i często daje dokumenty, które nie odzwierciedlają prawdziwego potencjału kandydata.',
      p2: 'Dlatego zbudowaliśmy Best AI Resume — platformę łączącą moc sztucznej inteligencji z eleganckim, profesjonalnym designem. Nasz cel jest prosty: pomóc każdemu kandydatowi zaprezentować się jak najlepiej potencjalnym pracodawcom.',
      p3: 'Do tej pory pomogliśmy ponad 50 000 profesjonalistów znaleźć wymarzoną pracę, tworząc CV, które wyróżniają się i przechodzą przez filtry ATS.',
    },
    stats: [
      { value: '50K+', label: 'Utworzonych CV' },
      { value: '98%', label: 'Skuteczność ATS' },
      { value: '20+', label: 'Szablonów' },
      { value: '4.9', label: 'Ocena użytkowników' },
    ],
    values: {
      badge: 'Nasze wartości',
      heading: 'Co nas napędza każdego dnia',
      cards: [
        { title: 'Prywatność na pierwszym miejscu', text: 'Twoje dane należą do Ciebie. Dane CV przechowujemy lokalnie w Twojej przeglądarce, nie na naszych serwerach. Tylko dane logowania są bezpiecznie przechowywane przez nas.' },
        { title: 'Innowacja', text: 'Używamy najnowocześniejszej technologii AI, aby pomóc Ci pisać skuteczne treści, podkreślać osiągnięcia i przyciągać uwagę rekruterów.' },
        { title: 'Dostępność', text: 'Profesjonalne narzędzia CV nie powinny być ukryte za drogimi subskrypcjami. Oferujemy potężne funkcje dostępne dla wszystkich.' },
      ],
    },
    experts: {
      badge: 'Zaufana wiedza ekspercka',
      heading: 'Poznaj naszych ekspertów kariery',
      subtitle: 'Nasz zespół coachów kariery, rekruterów i specjalistów branżowych wnosi głęboką wiedzę do przewodników CV, które tworzą.',
    },
    editorial: {
      heading: 'Nasze standardy redakcyjne',
      items: [
        { title: 'Porady oparte na danych', text: 'Każda wskazówka, którą udostępniamy, została przetestowana na prawdziwych systemach ATS i zweryfikowana przez specjalistów branżowych.' },
        { title: 'Podejście human-first', text: 'Wierzymy, że AI powinna wzmacniać, a nie zastępować. Stawiamy na strategie, które naprawdę robią wrażenie na prawdziwych rekruterach.' },
      ],
    },
    commitment: {
      heading: 'Nasze zobowiązanie wobec Ciebie',
      p1: 'W Best AI Resume wierzymy, że droga zawodowa jest sprawą osobistą. Dlatego zbudowaliśmy platformę, która szanuje Twoją prywatność i daje potężne narzędzia do osiągnięcia sukcesu. Dane CV pozostają na Twoim urządzeniu — masz pełną kontrolę nad swoimi informacjami.',
      p2: 'Stale ulepszamy nasze algorytmy AI, dodajemy nowe szablony i rozwijamy funkcje na podstawie opinii użytkowników. Twój sukces jest naszym sukcesem i jesteśmy zaangażowani, aby towarzyszyć Ci na każdym kroku.',
    },
    cta: {
      title: 'Gotowy dołączyć do:',
      titleHighlight: 'ponad 50 000 historii sukcesu?',
      subtitle: 'Zacznij tworzyć swoje profesjonalne CV już dziś i zrób pierwszy krok ku wymarzonej karierze.',
      button: 'Zacznij za darmo',
    },
  },
  authors: {
    meta: {
      title: 'Nasi eksperci | Best AI Resume',
      description: 'Poznaj ekspertów kariery, rekruterów i coachów stojących za naszymi przewodnikami CV. Nasi autorzy wnoszą prawdziwe doświadczenie rekrutacyjne, aby pomóc Ci znaleźć wymarzoną pracę.',
      ogDescription: 'Poznaj ekspertów kariery, rekruterów i coachów stojących za naszymi przewodnikami CV.',
    },
    breadcrumb: { home: 'Strona główna', about: 'O nas', authors: 'Autorzy' },
    hero: {
      title: 'Poznaj naszych ekspertów',
      subtitle: 'Nasz zespół coachów kariery, rekruterów i specjalistów branżowych tworzy praktyczne przewodniki CV oparte na prawdziwym doświadczeniu rekrutacyjnym.',
    },
    viewProfile: 'Zobacz profil',
    cta: {
      title: 'Stwórz CV z pomocą eksperta',
      subtitle: 'Nasz kreator AI stosuje te same strategie, które rekomendują nasi eksperci. Przygotuj profesjonalne CV w kilka minut.',
      button: 'Stwórz moje CV — za darmo',
    },
  },
  authorProfile: {
    breadcrumb: { home: 'Strona główna', about: 'O nas' },
    atOrg: '{jobTitle} w {organization}',
    authorOfGuides: ' Autor {count}+ przewodników kariery i artykułów.',
    connectLinkedIn: 'Połącz się na LinkedIn',
    viewAllGuides: 'Zobacz wszystkie przewodniki',
    areasOfExpertise: 'Obszary ekspertyzy',
    resumeGuidesBy: 'Przewodniki CV autorstwa {name}',
    guidesCount: '{count} przewodników',
    coverLetterExamplesBy: 'Przykłady listów motywacyjnych autorstwa {name}',
    examplesCount: '{count} przykładów',
    blogPostsBy: 'Artykuły blogowe autorstwa {name}',
    postsCount: '{count} artykułów',
    viewAllResumes: 'Zobacz wszystkie {count} przewodniki CV',
    viewAllCoverLetters: 'Zobacz wszystkie {count} przykłady listów motywacyjnych',
    viewAllBlogPosts: 'Zobacz wszystkie {count} artykuły blogowe',
    cta: {
      title: 'Stwórz CV z pomocą eksperta',
      subtitle: 'Stosuj te same strategie, które rekomenduje {name}. Nasz kreator AI automatycznie stosuje eksperckie techniki pisania CV.',
      button: 'Stwórz moje CV — za darmo',
    },
  },
};

const nl: AboutPagesContent = {
  about: {
    hero: {
      badge: 'Over Ons',
      title: 'Bouwen aan de toekomst van',
      titleHighlight: 'carrièresucces',
      subtitle: 'Best AI Resume heeft als missie werkzoekenden wereldwijd te helpen professionele, ATS-geoptimaliseerde cv\'s te maken die deuren openen naar hun droombaan.',
    },
    story: {
      badge: 'Ons Verhaal',
      heading: 'Waarom wij Best AI Resume hebben gebouwd',
      p1: 'We merkten dat getalenteerde professionals over het hoofd werden gezien, simpelweg omdat hun cv niet door automatische screeningssystemen kwam. Het traditionele cv-maakproces was tijdrovend, frustrerend en leverde documenten op die het ware potentieel van kandidaten niet toonden.',
      p2: 'Daarom ontwikkelden wij Best AI Resume — een platform dat de kracht van kunstmatige intelligentie combineert met professioneel, aantrekkelijk ontwerp. Ons doel is eenvoudig: elke werkzoekende helpen zijn of haar beste kant te laten zien aan potentiële werkgevers.',
      p3: 'Tot op heden hebben wij meer dan 50.000 professionals geholpen hun droombaan te vinden door cv\'s te maken die opvallen én ATS-filters doorstaan.',
    },
    stats: [
      { value: '50K+', label: 'Cv\'s Gemaakt' },
      { value: '98%', label: 'ATS-slagingspercentage' },
      { value: '20+', label: 'Sjablonen' },
      { value: '4.9', label: 'Gebruikersbeoordeling' },
    ],
    values: {
      badge: 'Onze Waarden',
      heading: 'Wat ons elke dag aandrijft',
      cards: [
        { title: 'Privacy Voorop', text: 'Uw gegevens zijn van u. Wij slaan uw cv-inhoud lokaal op in uw browser, niet op onze servers. Alleen uw accountgegevens bewaren we veilig aan onze kant.' },
        { title: 'Innovatie', text: 'Wij maken gebruik van geavanceerde AI-technologie om u te helpen overtuigende inhoud te schrijven die uw prestaties belicht en recruiters aanspreekt.' },
        { title: 'Toegankelijkheid', text: 'Professionele cv-tools horen niet achter dure betaalmuren verborgen te zijn. Wij bieden krachtige functies die iedereen kan gebruiken en betalen.' },
      ],
    },
    experts: {
      badge: 'Vertrouwde Expertise',
      heading: 'Ontmoet Onze Carrière-experts',
      subtitle: 'Ons team van carrièrecoaches, recruiters en brancheprofessionals brengt diepgaande expertise in de cv-gidsen die zij schrijven.',
    },
    editorial: {
      heading: 'Onze Redactionele Standaarden',
      items: [
        { title: 'Datagedreven Advies', text: 'Elk stukje advies dat wij delen, is getest op echte ATS-systemen en gevalideerd door brancheprofessionals.' },
        { title: 'Mensgerichte Aanpak', text: 'Wij geloven dat AI moet versterken, niet vervangen. Wij geven prioriteit aan strategieën die daadwerkelijk impact hebben bij echte recruiters.' },
      ],
    },
    commitment: {
      heading: 'Onze Belofte aan U',
      p1: 'Bij Best AI Resume geloven wij dat een carrièrepad persoonlijk is. Daarom hebben wij een platform gebouwd dat uw privacy respecteert en u krachtige tools geeft om succes te behalen. Uw cv-gegevens blijven op uw apparaat — u heeft volledige controle over uw informatie.',
      p2: 'Wij verbeteren voortdurend onze AI-algoritmen, voegen nieuwe sjablonen toe en ontwikkelen functies op basis van gebruikersfeedback. Uw succes is ons succes, en wij zijn toegewijd u te blijven ondersteunen.',
    },
    cta: {
      title: 'Klaar om mee te doen aan:',
      titleHighlight: '50.000+ succesverhalen?',
      subtitle: 'Begin vandaag met het maken van uw professionele cv en zet de eerste stap naar uw droombaan.',
      button: 'Gratis Beginnen',
    },
  },
  authors: {
    meta: {
      title: 'Onze Expertauteurs | Best AI Resume',
      description: 'Maak kennis met de carrièreexperts, recruiters en coaches achter onze cv-gidsen. Onze auteurs brengen echte rekruteringservaring mee om u te helpen uw droombaan te vinden.',
      ogDescription: 'Maak kennis met de carrièreexperts, recruiters en coaches achter onze cv-gidsen.',
    },
    breadcrumb: { home: 'Home', about: 'Over Ons', authors: 'Auteurs' },
    hero: {
      title: 'Ontmoet Onze Expertauteurs',
      subtitle: 'Ons team van carrièrecoaches, recruiters en brancheprofessionals schrijft praktische cv-gidsen op basis van echte rekruteringservaring.',
    },
    viewProfile: 'Profiel Bekijken',
    cta: {
      title: 'Maak Uw Cv met Expertbegeleiding',
      subtitle: 'Onze AI-bouwer past dezelfde strategieën toe die door onze experts worden aanbevolen. Stel in enkele minuten een professioneel cv op.',
      button: 'Maak Mijn Cv — Gratis',
    },
  },
  authorProfile: {
    breadcrumb: { home: 'Home', about: 'Over Ons' },
    atOrg: '{jobTitle} bij {organization}',
    authorOfGuides: ' Auteur van {count}+ carrièregidsen en artikelen.',
    connectLinkedIn: 'Verbinden op LinkedIn',
    viewAllGuides: 'Alle Gidsen Bekijken',
    areasOfExpertise: 'Expertisegebieden',
    resumeGuidesBy: 'Cv-gidsen door {name}',
    guidesCount: '{count} gidsen',
    coverLetterExamplesBy: 'Sollicitatiebriefvoorbeelden door {name}',
    examplesCount: '{count} voorbeelden',
    blogPostsBy: 'Blogartikelen door {name}',
    postsCount: '{count} artikelen',
    viewAllResumes: 'Bekijk alle {count} cv-gidsen',
    viewAllCoverLetters: 'Bekijk alle {count} sollicitatiebriefvoorbeelden',
    viewAllBlogPosts: 'Bekijk alle {count} blogartikelen',
    cta: {
      title: 'Maak Uw Cv met Expertbegeleiding',
      subtitle: 'Gebruik dezelfde strategieën die worden aanbevolen door {name}. Onze AI-bouwer past automatisch schrijftechnieken van cv-experts toe.',
      button: 'Maak Mijn Cv — Gratis',
    },
  },
};

const zh: AboutPagesContent = {
  about: {
    hero: {
      badge: '关于我们',
      title: '构建职业成功的',
      titleHighlight: '未来',
      subtitle: 'Best AI Resume 致力于帮助全球求职者创建专业的、ATS优化的简历，为他们打开通向理想职业的大门。',
    },
    story: {
      badge: '我们的故事',
      heading: '我们为什么创建 Best AI Resume',
      p1: '我们注意到，许多有才华的专业人士仅仅因为简历无法通过自动筛选系统而被忽视。传统的简历制作过程耗时、令人沮丧，而且往往无法展示候选人的真正潜力。',
      p2: '因此我们创建了 Best AI Resume——一个将人工智能的力量与专业设计相结合的平台。我们的目标很简单：帮助每位求职者向潜在雇主展示最好的自己。',
      p3: '迄今为止，我们已经帮助超过50,000名专业人士通过创建既出色又能通过ATS筛选的简历找到了理想的工作。',
    },
    stats: [
      { value: '50K+', label: '已创建简历' },
      { value: '98%', label: 'ATS通过率' },
      { value: '20+', label: '模板' },
      { value: '4.9', label: '用户评分' },
    ],
    values: {
      badge: '我们的价值观',
      heading: '驱动我们前进的力量',
      cards: [
        { title: '隐私至上', text: '你的数据属于你。我们将简历数据存储在你的浏览器本地，而不是我们的服务器上。只有你的账户凭据安全地保存在我们这边。' },
        { title: '创新', text: '我们利用尖端AI技术帮助你撰写引人注目的内容，突出你的成就，让招聘人员关注你。' },
        { title: '无障碍使用', text: '专业的简历工具不应该被昂贵的付费墙所阻挡。我们提供强大的功能，人人都能使用和负担。' },
      ],
    },
    experts: {
      badge: '值得信赖的专业知识',
      heading: '认识我们的职业专家',
      subtitle: '我们的职业教练、招聘人员和行业专家团队为他们撰写的简历指南带来深厚的专业知识。',
    },
    editorial: {
      heading: '我们的编辑标准',
      items: [
        { title: '数据驱动的建议', text: '我们分享的每一条建议都经过真实ATS系统的测试和行业专业人士的验证。' },
        { title: '以人为本的方法', text: '我们相信AI应该赋能而非替代。我们优先考虑真正能打动人类招聘人员的策略。' },
      ],
    },
    commitment: {
      heading: '我们对你的承诺',
      p1: '在 Best AI Resume，我们相信每个人的职业旅程都是独特的。因此我们构建了一个尊重你隐私的平台，同时为你提供强大的工具以取得成功。你的简历数据保存在你的设备上，让你完全控制自己的信息。',
      p2: '我们不断改进AI算法、添加新模板，并根据用户反馈增强功能。你的成功就是我们的成功，我们致力于在每一步都为你提供帮助。',
    },
    cta: {
      title: '准备加入',
      titleHighlight: '50,000+ 个成功故事？',
      subtitle: '立即开始创建你的专业简历，迈出通向理想职业的第一步。',
      button: '免费开始',
    },
  },
  authors: {
    meta: {
      title: '我们的专家作者 | Best AI Resume',
      description: '认识我们简历指南背后的职业专家、招聘人员和教练。我们的作者带来真实的招聘经验，帮助你找到理想的工作。',
      ogDescription: '认识我们简历指南背后的职业专家、招聘人员和教练。',
    },
    breadcrumb: { home: '首页', about: '关于我们', authors: '作者' },
    hero: {
      title: '认识我们的专家作者',
      subtitle: '我们的职业教练、招聘人员和行业专家团队基于真实的招聘经验撰写实用的简历指南。',
    },
    viewProfile: '查看资料',
    cta: {
      title: '在专家指导下创建简历',
      subtitle: '我们的AI生成器应用了专家推荐的策略。几分钟内即可制作专业简历。',
      button: '创建我的简历 — 免费',
    },
  },
  authorProfile: {
    breadcrumb: { home: '首页', about: '关于我们' },
    atOrg: '{organization} {jobTitle}',
    authorOfGuides: ' 已撰写 {count}+ 篇职业指南和文章。',
    connectLinkedIn: '在LinkedIn上连接',
    viewAllGuides: '查看所有指南',
    areasOfExpertise: '专业领域',
    resumeGuidesBy: '{name} 的简历指南',
    guidesCount: '{count} 篇指南',
    coverLetterExamplesBy: '{name} 的求职信范例',
    examplesCount: '{count} 个范例',
    blogPostsBy: '{name} 的博客文章',
    postsCount: '{count} 篇文章',
    viewAllResumes: '查看全部 {count} 篇简历指南',
    viewAllCoverLetters: '查看全部 {count} 个求职信范例',
    viewAllBlogPosts: '查看全部 {count} 篇博客文章',
    cta: {
      title: '在专家指导下创建简历',
      subtitle: '采用 {name} 推荐的策略。我们的AI生成器自动应用专家级简历写作技巧。',
      button: '创建我的简历 — 免费',
    },
  },
};

const ms: AboutPagesContent = {
  about: {
    hero: {
      badge: 'Tentang Kami',
      title: 'Membina masa depan',
      titleHighlight: 'kejayaan kerjaya',
      subtitle: 'Best AI Resume bermatlamat membantu pencari kerja di seluruh dunia mencipta resume profesional yang dioptimumkan ATS untuk membuka pintu ke kerjaya impian mereka.',
    },
    story: {
      badge: 'Kisah Kami',
      heading: 'Mengapa kami membina Best AI Resume',
      p1: 'Kami perasan ramai profesional berbakat diabaikan hanya kerana resume mereka tidak melepasi sistem saringan automatik. Proses pembuatan resume tradisional memakan masa, mengecewakan dan sering menghasilkan dokumen yang gagal mempamerkan potensi sebenar calon.',
      p2: 'Itulah sebabnya kami mencipta Best AI Resume — platform yang menggabungkan kuasa kecerdasan buatan dengan reka bentuk profesional. Matlamat kami mudah: membantu setiap pencari kerja mempersembahkan diri mereka yang terbaik kepada majikan.',
      p3: 'Sehingga kini, kami telah membantu lebih 50,000 profesional mendapat pekerjaan impian mereka dengan mencipta resume yang menonjol dan melepasi saringan ATS.',
    },
    stats: [
      { value: '50K+', label: 'Resume Dicipta' },
      { value: '98%', label: 'Kadar Lulus ATS' },
      { value: '20+', label: 'Templat' },
      { value: '4.9', label: 'Penilaian Pengguna' },
    ],
    values: {
      badge: 'Nilai Kami',
      heading: 'Apa yang mendorong kami',
      cards: [
        { title: 'Privasi Utama', text: 'Data anda milik anda. Kami menyimpan data resume anda secara setempat dalam pelayar anda, bukan di pelayan kami. Hanya kelayakan akaun anda disimpan dengan selamat di pihak kami.' },
        { title: 'Inovasi', text: 'Kami menggunakan teknologi AI terkini untuk membantu anda menulis kandungan yang menarik yang menonjolkan pencapaian anda dan menarik perhatian perekrut.' },
        { title: 'Kebolehcapaian', text: 'Alat resume profesional tidak sepatutnya tersembunyi di sebalik tembok berbayar yang mahal. Kami menawarkan ciri-ciri berkuasa yang semua orang boleh akses dan mampu.' },
      ],
    },
    experts: {
      badge: 'Kepakaran Dipercayai',
      heading: 'Kenali Pakar Kerjaya Kami',
      subtitle: 'Pasukan jurulatih kerjaya, perekrut dan pakar industri kami membawa kepakaran mendalam ke panduan resume yang mereka tulis.',
    },
    editorial: {
      heading: 'Standard Editorial Kami',
      items: [
        { title: 'Nasihat Berasaskan Data', text: 'Setiap tip yang kami kongsi diuji pada sistem ATS sebenar dan disahkan oleh profesional industri.' },
        { title: 'Pendekatan Mengutamakan Manusia', text: 'Kami percaya AI harus memperkasa, bukan menggantikan. Kami mengutamakan strategi yang menarik perhatian perekrut manusia.' },
      ],
    },
    commitment: {
      heading: 'Komitmen Kami Kepada Anda',
      p1: 'Di Best AI Resume, kami percaya perjalanan kerjaya anda adalah peribadi. Itulah sebabnya kami membina platform yang menghormati privasi anda sambil memberikan alat yang berkuasa untuk berjaya. Data resume anda kekal di peranti anda, memberikan anda kawalan sepenuhnya.',
      p2: 'Kami sentiasa menambah baik algoritma AI, menambah templat baharu dan meningkatkan ciri berdasarkan maklum balas pengguna. Kejayaan anda adalah kejayaan kami.',
    },
    cta: {
      title: 'Bersedia untuk menyertai',
      titleHighlight: '50,000+ kisah kejayaan?',
      subtitle: 'Mula membina resume profesional anda hari ini dan ambil langkah pertama ke arah kerjaya impian anda.',
      button: 'Mula Percuma',
    },
  },
  authors: {
    meta: {
      title: 'Penulis Pakar Kami | Best AI Resume',
      description: 'Kenali pakar kerjaya, perekrut dan jurulatih di sebalik panduan resume kami. Penulis kami membawa pengalaman pengambilan sebenar untuk membantu anda mendapat pekerjaan impian.',
      ogDescription: 'Kenali pakar kerjaya, perekrut dan jurulatih di sebalik panduan resume kami.',
    },
    breadcrumb: { home: 'Laman Utama', about: 'Tentang Kami', authors: 'Penulis' },
    hero: {
      title: 'Kenali Penulis Pakar Kami',
      subtitle: 'Pasukan jurulatih kerjaya, perekrut dan profesional industri kami menulis panduan resume praktikal berdasarkan pengalaman pengambilan sebenar.',
    },
    viewProfile: 'Lihat Profil',
    cta: {
      title: 'Cipta Resume Anda dengan Bimbingan Pakar',
      subtitle: 'Pembina AI kami menggunakan strategi yang disyorkan oleh pakar kami. Cipta resume profesional dalam beberapa minit.',
      button: 'Cipta Resume Saya — Percuma',
    },
  },
  authorProfile: {
    breadcrumb: { home: 'Laman Utama', about: 'Tentang Kami' },
    atOrg: '{jobTitle} di {organization}',
    authorOfGuides: ' Penulis {count}+ panduan kerjaya dan artikel.',
    connectLinkedIn: 'Hubungi di LinkedIn',
    viewAllGuides: 'Lihat Semua Panduan',
    areasOfExpertise: 'Bidang Kepakaran',
    resumeGuidesBy: 'Panduan Resume oleh {name}',
    guidesCount: '{count} panduan',
    coverLetterExamplesBy: 'Contoh Surat Iringan oleh {name}',
    examplesCount: '{count} contoh',
    blogPostsBy: 'Artikel Blog oleh {name}',
    postsCount: '{count} artikel',
    viewAllResumes: 'Lihat semua {count} panduan resume',
    viewAllCoverLetters: 'Lihat semua {count} contoh surat iringan',
    viewAllBlogPosts: 'Lihat semua {count} artikel blog',
    cta: {
      title: 'Cipta Resume Anda dengan Bimbingan Pakar',
      subtitle: 'Gunakan strategi yang disyorkan oleh {name}. Pembina AI kami mengaplikasikan teknik penulisan resume pakar secara automatik.',
      button: 'Cipta Resume Saya — Percuma',
    },
  },
};

const contentMap: Record<string, AboutPagesContent> = { en, es, fr, de, ar, ja, it, ko, vi, th, pt, tr, id, pl, nl, zh, ms };

export function getAboutContent(locale: string) { return selectContent(contentMap, locale).about; }
export function getAuthorsContent(locale: string) { return selectContent(contentMap, locale).authors; }
export function getAuthorProfileContent(locale: string) { return selectContent(contentMap, locale).authorProfile; }
