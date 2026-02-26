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

const contentMap: Record<string, AboutPagesContent> = { en, es, fr, de, ar, ja };

export function getAboutContent(locale: string) { return selectContent(contentMap, locale).about; }
export function getAuthorsContent(locale: string) { return selectContent(contentMap, locale).authors; }
export function getAuthorProfileContent(locale: string) { return selectContent(contentMap, locale).authorProfile; }
