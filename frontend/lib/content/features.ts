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

const fr: FeaturesPageContent = {
  meta: {
    title: 'Créateur de CV IA — Modèles, Vérificateur ATS et Plus | Best AI Resume',
    description: 'Découvrez les fonctionnalités de Best AI Resume : rédaction IA, plus de 20 modèles professionnels, optimisation ATS en temps réel, export PDF et suggestions intelligentes.',
    keywords: 'créateur de cv, rédacteur cv ia, vérificateur ats cv, modèles cv, export cv pdf, outils création cv',
  },
  hero: {
    badge: 'Fonctionnalités',
    title: 'Tout ce qu\'il vous faut pour',
    titleHighlight: 'décrocher le poste idéal',
    subtitle: 'Des outils IA puissants combinés à un design élégant pour vous démarquer de la concurrence.',
  },
  features: [
    { title: 'Rédaction par IA', description: 'Laissez notre IA rédiger des points percutants et des résumés professionnels qui mettent en valeur vos réalisations. Transformez de simples descriptions de poste en déclarations d\'impact.' },
    { title: 'Plus de 20 Modèles Premium', description: 'Choisissez parmi des modèles conçus par des professionnels, élégants et compatibles ATS. Chaque modèle est créé par des experts en design.' },
    { title: 'Optimisation ATS', description: 'Le score ATS en temps réel garantit que votre CV passe les systèmes de filtrage automatisés. Obtenez un retour instantané pour améliorer votre score.' },
    { title: 'Aperçu en Temps Réel', description: 'Visualisez les modifications instantanément pendant la saisie. Ce que vous voyez est exactement ce que les recruteurs verront.' },
    { title: 'Export PDF', description: 'Téléchargez des PDF parfaits prêts à envoyer. Optimisés pour l\'affichage numérique et l\'impression.' },
    { title: 'Suggestions Intelligentes', description: 'Recevez des recommandations de compétences, mots-clés et contenu basées sur votre poste cible. L\'IA analyse des milliers de CV réussis.' },
  ],
  steps: {
    badge: 'Comment ça marche',
    title: 'Trois étapes vers votre',
    titleHighlight: 'CV parfait',
    items: [
      { title: 'Remplissez vos Informations', description: 'Saisissez votre expérience, formation et compétences. Notre IA vous assiste à chaque étape.' },
      { title: 'Choisissez un Modèle', description: 'Sélectionnez parmi plus de 20 modèles professionnels. Aperçu en temps réel pendant la personnalisation.' },
      { title: 'Téléchargez le PDF', description: 'Exportez votre CV soigné en PDF parfait, prêt à impressionner les recruteurs.' },
    ],
  },
  cta: {
    title: 'Prêt à créer votre',
    titleHighlight: 'CV gagnant ?',
    description: 'Rejoignez plus de 50 000 professionnels qui ont décroché le poste idéal avec Best AI Resume.',
    ctaText: 'Commencer Gratuitement',
  },
  externalResources: {
    title: 'Ressources Externes',
    items: [
      { href: 'https://www.bls.gov/ooh/', label: 'Bureau of Labor Statistics : Données Emploi' },
      { href: 'https://www.shrm.org/', label: 'SHRM : Ressources RH et Carrières' },
    ],
  },
};

const de: FeaturesPageContent = {
  meta: {
    title: 'KI-Lebenslauf-Ersteller — Vorlagen, ATS-Checker und Mehr | Best AI Resume',
    description: 'Entdecken Sie die Funktionen von Best AI Resume: KI-gestützte Texterstellung, über 20 professionelle Vorlagen, ATS-Optimierung in Echtzeit, PDF-Export und intelligente Vorschläge.',
    keywords: 'Lebenslauf Ersteller, KI Lebenslauf, ATS Lebenslauf Checker, Lebenslauf Vorlagen, Lebenslauf PDF Export, Lebenslauf Tools',
  },
  hero: {
    badge: 'Funktionen',
    title: 'Alles was Sie brauchen, um',
    titleHighlight: 'Ihren Traumjob zu bekommen',
    subtitle: 'Leistungsstarke KI-Tools kombiniert mit professionellem Design, um sich von der Konkurrenz abzuheben.',
  },
  features: [
    { title: 'KI-gestützte Texterstellung', description: 'Lassen Sie unsere KI überzeugende Aufzählungspunkte und professionelle Zusammenfassungen verfassen, die Ihre Erfolge hervorheben.' },
    { title: 'Über 20 Premium-Vorlagen', description: 'Wählen Sie aus professionell gestalteten Vorlagen, die hervorstechen und gleichzeitig ATS-kompatibel sind.' },
    { title: 'ATS-Optimierung', description: 'Die ATS-Bewertung in Echtzeit stellt sicher, dass Ihr Lebenslauf automatisierte Screening-Systeme jedes Mal besteht.' },
    { title: 'Echtzeit-Vorschau', description: 'Sehen Sie Änderungen sofort beim Tippen. Was Sie sehen, ist genau das, was Personalverantwortliche sehen werden.' },
    { title: 'PDF-Export', description: 'Laden Sie pixelgenaue PDFs herunter, die sofort versandbereit sind. Optimiert für digitale Ansicht und Druck.' },
    { title: 'Intelligente Vorschläge', description: 'Erhalten Sie intelligente Empfehlungen für Fähigkeiten, Schlüsselwörter und Inhalte basierend auf Ihrer Zielposition.' },
  ],
  steps: {
    badge: 'So funktioniert es',
    title: 'Drei Schritte zu Ihrem',
    titleHighlight: 'perfekten Lebenslauf',
    items: [
      { title: 'Daten eingeben', description: 'Geben Sie Ihre Erfahrung, Ausbildung und Fähigkeiten ein. Unsere KI unterstützt Sie bei jedem Schritt.' },
      { title: 'Vorlage wählen', description: 'Wählen Sie aus über 20 professionell gestalteten Vorlagen. Echtzeit-Vorschau während der Anpassung.' },
      { title: 'PDF herunterladen', description: 'Exportieren Sie Ihren ausgefeilten Lebenslauf als pixelperfektes PDF, bereit um Personalverantwortliche zu beeindrucken.' },
    ],
  },
  cta: {
    title: 'Bereit, Ihren',
    titleHighlight: 'Lebenslauf zu erstellen?',
    description: 'Schließen Sie sich über 50.000 Fachleuten an, die mit Best AI Resume ihren Traumjob gefunden haben.',
    ctaText: 'Kostenlos starten',
  },
  externalResources: {
    title: 'Externe Ressourcen',
    items: [
      { href: 'https://www.bls.gov/ooh/', label: 'Bureau of Labor Statistics: Karrieredaten' },
      { href: 'https://www.shrm.org/', label: 'SHRM: HR- und Karriere-Ressourcen' },
    ],
  },
};

const ar: FeaturesPageContent = {
  meta: {
    title: 'منشئ سيرة ذاتية بالذكاء الاصطناعي — قوالب، فحص ATS والمزيد | Best AI Resume',
    description: 'اكتشف مميزات Best AI Resume: كتابة بالذكاء الاصطناعي، أكثر من 20 قالب احترافي، تحسين ATS في الوقت الفعلي، تصدير PDF واقتراحات ذكية.',
    keywords: 'منشئ سيرة ذاتية, كاتب سيرة ذاتية ذكاء اصطناعي, فحص ats, قوالب سيرة ذاتية, تصدير pdf, أدوات سيرة ذاتية',
  },
  hero: {
    badge: 'المميزات',
    title: 'كل ما تحتاجه لـ',
    titleHighlight: 'الحصول على وظيفة أحلامك',
    subtitle: 'أدوات ذكاء اصطناعي قوية مع تصميم احترافي لتتميز عن المنافسين.',
  },
  features: [
    { title: 'كتابة بالذكاء الاصطناعي', description: 'دع الذكاء الاصطناعي يصيغ نقاطاً مؤثرة وملخصات مهنية تبرز إنجازاتك. حوّل وصف الوظائف البسيط إلى عبارات مؤثرة.' },
    { title: 'أكثر من 20 قالب متميز', description: 'اختر من قوالب مصممة باحتراف تتميز مع الحفاظ على توافق ATS. كل قالب مصمم بواسطة خبراء التصميم.' },
    { title: 'تحسين ATS', description: 'تقييم ATS في الوقت الفعلي يضمن اجتياز سيرتك الذاتية لأنظمة الفرز الآلي في كل مرة.' },
    { title: 'معاينة فورية', description: 'شاهد التغييرات فوراً أثناء الكتابة. ما تراه هو بالضبط ما سيراه مسؤولو التوظيف.' },
    { title: 'تصدير PDF', description: 'حمّل ملفات PDF مثالية جاهزة للإرسال. محسّنة للعرض الرقمي والطباعة.' },
    { title: 'اقتراحات ذكية', description: 'احصل على توصيات ذكية للمهارات والكلمات المفتاحية والمحتوى بناءً على الوظيفة المستهدفة.' },
  ],
  steps: {
    badge: 'كيف يعمل',
    title: 'ثلاث خطوات نحو',
    titleHighlight: 'سيرتك الذاتية المثالية',
    items: [
      { title: 'أدخل بياناتك', description: 'أدخل خبراتك وتعليمك ومهاراتك. الذكاء الاصطناعي يساعدك في كل خطوة.' },
      { title: 'اختر قالباً', description: 'اختر من أكثر من 20 قالب احترافي. معاينة فورية أثناء التخصيص.' },
      { title: 'حمّل PDF', description: 'صدّر سيرتك الذاتية المصقولة كملف PDF مثالي، جاهز لإبهار مسؤولي التوظيف.' },
    ],
  },
  cta: {
    title: 'مستعد لإنشاء',
    titleHighlight: 'سيرتك الذاتية المتميزة؟',
    description: 'انضم لأكثر من 50,000 محترف حصلوا على وظيفة أحلامهم مع Best AI Resume.',
    ctaText: 'ابدأ مجاناً',
  },
  externalResources: {
    title: 'موارد خارجية',
    items: [
      { href: 'https://www.bls.gov/ooh/', label: 'Bureau of Labor Statistics: بيانات التوظيف' },
      { href: 'https://www.shrm.org/', label: 'SHRM: موارد الموارد البشرية والمهن' },
    ],
  },
};

const content: Record<string, FeaturesPageContent> = { en, es, fr, de, ar };
export const getContent = (locale: string): FeaturesPageContent => selectContent(content, locale);
