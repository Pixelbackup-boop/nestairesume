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

const ja: FeaturesPageContent = {
  meta: {
    title: 'AI履歴書ビルダーの機能 — テンプレート・ATSチェッカー他 | Best AI Resume',
    description: 'Best AI Resumeの全機能を紹介：AI文章生成、20以上のプレミアムテンプレート、リアルタイムATS最適化、PDF出力、スマート提案で理想の仕事を獲得。',
    keywords: '履歴書作成ツール 機能, AI履歴書, ATSチェッカー, 履歴書テンプレート, PDF履歴書, 履歴書作成',
  },
  hero: {
    badge: '機能紹介',
    title: '理想の仕事を手に入れるための',
    titleHighlight: '全てがここに',
    subtitle: '強力なAIツールと美しいデザインで、あなたを際立たせます。',
  },
  features: [
    { title: 'AI文章生成', description: 'AIがあなたの実績を引き立てる効果的な箇条書きとプロフェッショナルな要約を作成。基本的な業務記述をインパクトのある表現に変換します。' },
    { title: '20以上のプレミアムテンプレート', description: 'ATS互換性を保ちながらデザイン性に優れたプロフェッショナルテンプレートから選択。各テンプレートはデザイン専門家が作成。' },
    { title: 'ATS最適化', description: 'リアルタイムのATSスコアリングで、採用管理システムを確実に通過。スコア改善のフィードバックを即座に取得できます。' },
    { title: 'リアルタイムプレビュー', description: '入力と同時に変更をプレビュー。あなたが見ているものが採用担当者に見えるものと同じです。' },
    { title: 'PDF出力', description: 'すぐに送れるピクセルパーフェクトなPDFをダウンロード。デジタル表示と印刷の両方に最適化されています。' },
    { title: 'スマート提案', description: '応募する職種に基づいたスキル、キーワード、コンテンツのインテリジェントな提案を受け取れます。' },
  ],
  steps: {
    badge: '使い方',
    title: '3ステップで',
    titleHighlight: '完璧な履歴書を作成',
    items: [
      { title: '情報を入力', description: '職歴、学歴、スキルを入力。AIが各ステップをサポートします。' },
      { title: 'テンプレートを選択', description: '20以上のプロフェッショナルテンプレートから選択。リアルタイムでカスタマイズをプレビュー。' },
      { title: 'PDFをダウンロード', description: '完成した履歴書をピクセルパーフェクトなPDFとしてエクスポート。採用担当者を感動させる準備完了。' },
    ],
  },
  cta: {
    title: '今すぐ作りませんか？',
    titleHighlight: 'あなたの最強の履歴書を',
    description: 'Best AI Resumeで理想の仕事を見つけた50,000人以上のプロフェッショナルに加わりましょう。',
    ctaText: '無料で作成を始める',
  },
  externalResources: {
    title: '外部リソース',
    items: [
      { href: 'https://www.bls.gov/ooh/', label: 'Bureau of Labor Statistics：キャリアデータ' },
      { href: 'https://www.shrm.org/', label: 'SHRM：人事・キャリアリソース' },
    ],
  },
};

const it: FeaturesPageContent = {
  meta: {
    title: 'Funzionalit\u00e0 del Builder CV con AI \u2014 Modelli, Controllo ATS e Altro | Best AI Resume',
    description: 'Scopri tutte le funzionalit\u00e0 di Best AI Resume: scrittura con intelligenza artificiale, oltre 20 modelli professionali, ottimizzazione ATS in tempo reale, esportazione PDF e suggerimenti intelligenti per il tuo curriculum vitae.',
    keywords: 'funzionalit\u00e0 builder curriculum vitae, scrittore cv ai, controllo ats curriculum, modelli cv, esportazione pdf curriculum, strumenti creazione cv',
  },
  hero: {
    badge: 'Funzionalit\u00e0',
    title: 'Tutto ci\u00f2 che ti serve per',
    titleHighlight: 'ottenere il lavoro dei tuoi sogni',
    subtitle: 'Strumenti AI potenti combinati con un design elegante per distinguerti dalla concorrenza.',
  },
  features: [
    { title: 'Scrittura con AI', description: 'Lascia che la nostra intelligenza artificiale crei punti elenco convincenti e sommari professionali che valorizzano i tuoi risultati. Trasforma semplici descrizioni lavorative in dichiarazioni d\u2019impatto.' },
    { title: 'Oltre 20 Modelli Premium', description: 'Scegli tra modelli progettati da professionisti che si distinguono mantenendo la compatibilit\u00e0 con i sistemi ATS. Ogni modello \u00e8 realizzato da esperti di design.' },
    { title: 'Ottimizzazione ATS', description: 'Il punteggio ATS in tempo reale garantisce che il tuo curriculum vitae superi i sistemi di screening automatizzati in ogni occasione. Ricevi feedback immediato su come migliorare il tuo punteggio.' },
    { title: 'Anteprima in Tempo Reale', description: 'Visualizza le modifiche istantaneamente mentre digiti. Ci\u00f2 che vedi \u00e8 esattamente ci\u00f2 che vedranno i selezionatori. Niente pi\u00f9 dubbi sull\u2019aspetto del tuo CV.' },
    { title: 'Esportazione PDF', description: 'Scarica PDF perfetti pronti da inviare. Ottimizzati sia per la visualizzazione digitale che per la stampa. Il tuo curriculum vitae appare professionale ovunque.' },
    { title: 'Suggerimenti Intelligenti', description: 'Ricevi raccomandazioni intelligenti su competenze, parole chiave e contenuti in base al ruolo desiderato. L\u2019AI analizza migliaia di curriculum vitae di successo.' },
  ],
  steps: {
    badge: 'Come Funziona',
    title: 'Tre passaggi per il tuo',
    titleHighlight: 'curriculum vitae perfetto',
    items: [
      { title: 'Inserisci i Tuoi Dati', description: 'Aggiungi le tue esperienze, formazione e competenze. La nostra AI ti assiste in ogni fase.' },
      { title: 'Scegli un Modello', description: 'Seleziona tra oltre 20 modelli professionali. Anteprima in tempo reale mentre personalizzi.' },
      { title: 'Scarica il PDF', description: 'Esporta il tuo CV curato come un PDF perfetto, pronto a impressionare i selezionatori.' },
    ],
  },
  cta: {
    title: 'Pronto a creare il tuo',
    titleHighlight: 'curriculum vitae vincente?',
    description: 'Unisciti a oltre 50.000 professionisti che hanno gi\u00e0 ottenuto il lavoro dei loro sogni con Best AI Resume.',
    ctaText: 'Inizia a Creare Gratis',
  },
  externalResources: {
    title: 'Risorse Esterne',
    items: [
      { href: 'https://www.bls.gov/ooh/', label: 'Bureau of Labor Statistics: Dati sulle Carriere' },
      { href: 'https://www.shrm.org/', label: 'SHRM: Risorse HR e Carriera' },
    ],
  },
};

const th: FeaturesPageContent = {
  meta: {
    title: 'ฟีเจอร์สร้างเรซูเม่ AI — เทมเพลต ตรวจ ATS และอื่น ๆ | Best AI Resume',
    description: 'สำรวจฟีเจอร์ทั้งหมดของ Best AI Resume: การเขียนด้วย AI เทมเพลตเรซูเม่กว่า 20 แบบ ระบบตรวจ ATS แบบเรียลไทม์ ส่งออก PDF และคำแนะนำอัจฉริยะ',
    keywords: 'ฟีเจอร์สร้างเรซูเม่, เครื่องมือเขียนเรซูเม่ AI, ตรวจเรซูเม่ ATS, เทมเพลตเรซูเม่, ส่งออกเรซูเม่ PDF, เครื่องมือสร้างเรซูเม่',
  },
  hero: {
    badge: 'ฟีเจอร์',
    title: 'ทุกอย่างที่คุณต้องการเพื่อ',
    titleHighlight: 'ได้งานในฝัน',
    subtitle: 'เครื่องมือ AI อันทรงพลังผสานกับการออกแบบที่สวยงาม เพื่อให้คุณโดดเด่นกว่าใคร',
  },
  features: [
    { title: 'เขียนด้วย AI', description: 'ให้ AI ของเราสร้างข้อความที่น่าสนใจและสรุปประสบการณ์มืออาชีพที่เน้นผลงานของคุณ เปลี่ยนรายละเอียดงานธรรมดาให้เป็นข้อความที่มีพลัง' },
    { title: 'เทมเพลตพรีเมียมกว่า 20 แบบ', description: 'เลือกจากเทมเพลตที่ออกแบบโดยมืออาชีพ โดดเด่นและรองรับระบบ ATS ทุกเทมเพลตสร้างโดยผู้เชี่ยวชาญด้านการออกแบบ' },
    { title: 'การปรับแต่ง ATS', description: 'คะแนน ATS แบบเรียลไทม์ช่วยให้เรซูเม่ของคุณผ่านระบบคัดกรองอัตโนมัติทุกครั้ง รับคำแนะนำทันทีเพื่อเพิ่มคะแนน' },
    { title: 'ดูตัวอย่างแบบเรียลไทม์', description: 'เห็นการเปลี่ยนแปลงทันทีขณะพิมพ์ สิ่งที่คุณเห็นคือสิ่งที่ผู้จ้างงานจะเห็น ไม่ต้องเดาอีกต่อไป' },
    { title: 'ส่งออก PDF', description: 'ดาวน์โหลด PDF คุณภาพสูงพร้อมส่งทันที ปรับแต่งสำหรับการดูบนหน้าจอและการพิมพ์ เรซูเม่ของคุณดูเป็นมืออาชีพทุกที่' },
    { title: 'คำแนะนำอัจฉริยะ', description: 'รับคำแนะนำด้านทักษะ คีย์เวิร์ด และเนื้อหาตามตำแหน่งที่คุณต้องการ AI วิเคราะห์เรซูเม่ที่ประสบความสำเร็จหลายพันฉบับ' },
  ],
  steps: {
    badge: 'วิธีใช้งาน',
    title: 'สามขั้นตอนสู่',
    titleHighlight: 'เรซูเม่ที่สมบูรณ์แบบ',
    items: [
      { title: 'กรอกข้อมูลของคุณ', description: 'ใส่ประสบการณ์ การศึกษา และทักษะของคุณ AI ช่วยเหลือคุณทุกขั้นตอน' },
      { title: 'เลือกเทมเพลต', description: 'เลือกจากเทมเพลตมืออาชีพกว่า 20 แบบ ดูตัวอย่างแบบเรียลไทม์ขณะปรับแต่ง' },
      { title: 'ดาวน์โหลด PDF', description: 'ส่งออกเรซูเม่ที่สมบูรณ์เป็น PDF คุณภาพสูง พร้อมสร้างความประทับใจให้ผู้จ้างงาน' },
    ],
  },
  cta: {
    title: 'พร้อมสร้าง',
    titleHighlight: 'เรซูเม่ที่ชนะใจผู้จ้างงานหรือยัง?',
    description: 'ร่วมกับมืออาชีพกว่า 50,000 คนที่ได้งานในฝันด้วย Best AI Resume',
    ctaText: 'เริ่มสร้างฟรี',
  },
  externalResources: {
    title: 'แหล่งข้อมูลภายนอก',
    items: [
      { href: 'https://www.bls.gov/ooh/', label: 'Bureau of Labor Statistics: ข้อมูลอาชีพ' },
      { href: 'https://www.shrm.org/', label: 'SHRM: แหล่งข้อมูล HR และอาชีพ' },
    ],
  },
};

const pt: FeaturesPageContent = {
  meta: {
    title: 'Funcionalidades do Construtor de Curriculo com IA — Modelos, ATS e Mais | Best AI Resume',
    description: 'Descubra todas as funcionalidades da Best AI Resume: redacao com IA, mais de 20 modelos profissionais, otimizacao ATS em tempo real, exportacao em PDF e sugestoes inteligentes para seu curriculo.',
    keywords: 'funcionalidades construtor curriculo, redator curriculo ia, verificador ats curriculo, modelos curriculo, exportacao pdf curriculo, ferramentas criacao curriculo',
  },
  hero: {
    badge: 'Funcionalidades',
    title: 'Tudo o que voce precisa para',
    titleHighlight: 'conquistar o emprego dos sonhos',
    subtitle: 'Ferramentas de IA poderosas combinadas com design elegante para se destacar da concorrencia.',
  },
  features: [
    { title: 'Redacao com IA', description: 'Deixe nossa inteligencia artificial criar bullets convincentes e resumos profissionais que valorizam suas conquistas. Transforme descricoes simples em declaracoes de impacto.' },
    { title: 'Mais de 20 Modelos Premium', description: 'Escolha entre modelos criados por profissionais que se destacam mantendo compatibilidade com sistemas ATS. Cada modelo e desenvolvido por especialistas em design.' },
    { title: 'Otimizacao ATS', description: 'A pontuacao ATS em tempo real garante que seu curriculo passe pelos sistemas de triagem automatizados. Receba feedback imediato sobre como melhorar sua pontuacao.' },
    { title: 'Previa em Tempo Real', description: 'Visualize as alteracoes instantaneamente enquanto digita. O que voce ve e exatamente o que os recrutadores verao. Sem mais duvidas sobre a aparencia do seu CV.' },
    { title: 'Exportacao em PDF', description: 'Baixe PDFs perfeitos prontos para enviar. Otimizados tanto para visualizacao digital quanto para impressao. Seu curriculo fica profissional em qualquer lugar.' },
    { title: 'Sugestoes Inteligentes', description: 'Receba recomendacoes inteligentes sobre habilidades, palavras-chave e conteudo com base na vaga desejada. A IA analisa milhares de curriculos de sucesso.' },
  ],
  steps: {
    badge: 'Como Funciona',
    title: 'Tres passos para o seu',
    titleHighlight: 'curriculo perfeito',
    items: [
      { title: 'Insira Seus Dados', description: 'Adicione suas experiencias, formacao e habilidades. Nossa IA te auxilia em cada etapa.' },
      { title: 'Escolha um Modelo', description: 'Selecione entre mais de 20 modelos profissionais. Previa em tempo real enquanto personaliza.' },
      { title: 'Baixe o PDF', description: 'Exporte seu curriculo polido como um PDF perfeito, pronto para impressionar os recrutadores.' },
    ],
  },
  cta: {
    title: 'Pronto para criar o seu',
    titleHighlight: 'curriculo vencedor?',
    description: 'Junte-se a mais de 50.000 profissionais que ja conquistaram o emprego dos sonhos com a Best AI Resume.',
    ctaText: 'Comecar a Criar Gratis',
  },
  externalResources: {
    title: 'Recursos Externos',
    items: [
      { href: 'https://www.bls.gov/ooh/', label: 'Bureau of Labor Statistics: Dados de Carreira' },
      { href: 'https://www.shrm.org/', label: 'SHRM: Recursos de RH e Carreira' },
    ],
  },
};

const tr: FeaturesPageContent = {
  meta: {
    title: 'AI CV Oluşturucu Özellikleri — Şablonlar, ATS ve Daha Fazlası | Best AI Resume',
    description: 'Best AI Resume\'nun tüm özelliklerini keşfedin: AI yazımı, 20\'den fazla profesyonel şablon, gerçek zamanlı ATS optimizasyonu, PDF dışa aktarma ve akıllı öneriler.',
    keywords: 'cv oluşturucu özellikleri, ai cv yazımı, ats cv kontrolü, cv şablonları, pdf cv dışa aktarma, cv oluşturma araçları',
  },
  hero: {
    badge: 'Özellikler',
    title: 'Hayalinizdeki işi kazanmak için',
    titleHighlight: 'ihtiyacınız olan her şey',
    subtitle: 'Rakiplerinizden öne çıkmak için zarif tasarımla birleştirilmiş güçlü AI araçları.',
  },
  features: [
    { title: 'AI ile Yazım', description: 'Yapay zekamızın başarılarınızı öne çıkaran ikna edici bullet noktalar ve profesyonel özetler oluşturmasına izin verin. Basit açıklamaları etki yaratan ifadelere dönüştürün.' },
    { title: '20\'den Fazla Premium Şablon', description: 'ATS uyumluluğunu korurken öne çıkacak şekilde tasarlanmış profesyoneller tarafından hazırlanmış şablonlar arasından seçim yapın. Her şablon tasarım uzmanları tarafından geliştirilmiştir.' },
    { title: 'ATS Optimizasyonu', description: 'Gerçek zamanlı ATS puanlaması CV\'nizin otomatik tarama sistemlerinden geçmesini sağlar. Puanınızı nasıl artıracağınız konusunda anında geri bildirim alın.' },
    { title: 'Gerçek Zamanlı Önizleme', description: 'Yazarken değişiklikleri anında görün. Gördüğünüz şey tam olarak işe alım uzmanlarının göreceği şeydir. CV\'nizin nasıl görüneceği konusunda artık tahmin yok.' },
    { title: 'PDF Dışa Aktarma', description: 'Göndermeye hazır mükemmel PDF\'ler indirin. Hem dijital görüntüleme hem de baskı için optimize edilmiş. CV\'niz her yerde profesyonel görünür.' },
    { title: 'Akıllı Öneriler', description: 'Hedef pozisyona göre beceriler, anahtar kelimeler ve içerik hakkında akıllı öneriler alın. AI, binlerce başarılı CV\'yi analiz eder.' },
  ],
  steps: {
    badge: 'Nasıl Çalışır',
    title: 'Mükemmel CV\'niz için',
    titleHighlight: 'üç adım',
    items: [
      { title: 'Bilgilerinizi Girin', description: 'Deneyimlerinizi, eğitiminizi ve becerilerinizi ekleyin. AI\'mız her adımda size yardımcı olur.' },
      { title: 'Şablon Seçin', description: '20\'den fazla profesyonel şablon arasından seçin. Özelleştirirken gerçek zamanlı önizleme.' },
      { title: 'PDF\'i İndirin', description: 'Cilalı CV\'nizi mükemmel bir PDF olarak dışa aktarın, işe alım uzmanlarını etkilemeye hazır.' },
    ],
  },
  cta: {
    title: 'Kazandıran CV\'nizi',
    titleHighlight: 'oluşturmaya hazır mısınız?',
    description: 'Best AI Resume ile hayallerindeki işi bulan 50.000\'den fazla profesyonele katılın.',
    ctaText: 'Ücretsiz Oluşturmaya Başla',
  },
  externalResources: {
    title: 'Dış Kaynaklar',
    items: [
      { href: 'https://www.bls.gov/ooh/', label: 'Bureau of Labor Statistics: Kariyer Verileri' },
      { href: 'https://www.shrm.org/', label: 'SHRM: İK ve Kariyer Kaynakları' },
    ],
  },
};

const vi: FeaturesPageContent = {
  meta: {
    title: 'Tính Năng Tạo CV AI — Mẫu, Kiểm Tra ATS và Hơn Thế | Best AI Resume',
    description: 'Khám phá tất cả tính năng của Best AI Resume: viết bằng AI, hơn 20 mẫu CV chuyên nghiệp, tối ưu hóa ATS thời gian thực, xuất PDF và gợi ý thông minh.',
    keywords: 'tính năng tạo CV, viết CV bằng AI, kiểm tra ATS, mẫu CV, xuất PDF, công cụ tạo CV miễn phí',
  },
  hero: {
    badge: 'Tính Năng',
    title: 'Mọi thứ bạn cần để',
    titleHighlight: 'có được công việc mơ ước',
    subtitle: 'Công cụ AI mạnh mẽ kết hợp với thiết kế đẹp giúp bạn nổi bật so với đám đông.',
  },
  features: [
    { title: 'Viết bằng AI', description: 'Để AI của chúng tôi tạo ra các gạch đầu dòng ấn tượng và tóm tắt chuyên nghiệp làm nổi bật thành tích của bạn. Chuyển mô tả công việc cơ bản thành tuyên bố có tác động.' },
    { title: 'Hơn 20 Mẫu Cao Cấp', description: 'Chọn từ các mẫu được thiết kế chuyên nghiệp, nổi bật và tương thích ATS. Mỗi mẫu được tạo bởi các chuyên gia thiết kế.' },
    { title: 'Tối Ưu Hóa ATS', description: 'Điểm ATS theo thời gian thực đảm bảo CV của bạn vượt qua hệ thống sàng lọc tự động. Nhận phản hồi tức thì về cách cải thiện điểm số.' },
    { title: 'Xem Trước Thời Gian Thực', description: 'Xem thay đổi ngay lập tức khi bạn nhập. Những gì bạn thấy chính xác là những gì nhà tuyển dụng sẽ thấy. Không còn đoán mò nữa.' },
    { title: 'Xuất PDF', description: 'Tải xuống PDF hoàn hảo sẵn sàng gửi đi. Tối ưu cho cả xem kỹ thuật số và in ấn. CV của bạn trông chuyên nghiệp ở mọi nơi.' },
    { title: 'Gợi Ý Thông Minh', description: 'Nhận đề xuất thông minh về kỹ năng, từ khóa và nội dung dựa trên vị trí mục tiêu. AI phân tích hàng nghìn CV thành công.' },
  ],
  steps: {
    badge: 'Cách Hoạt Động',
    title: 'Ba bước đến',
    titleHighlight: 'CV hoàn hảo của bạn',
    items: [
      { title: 'Điền Thông Tin', description: 'Nhập kinh nghiệm, học vấn và kỹ năng của bạn. AI hỗ trợ bạn ở mọi bước.' },
      { title: 'Chọn Mẫu', description: 'Chọn từ hơn 20 mẫu chuyên nghiệp. Xem trước thời gian thực khi bạn tùy chỉnh.' },
      { title: 'Tải PDF', description: 'Xuất CV hoàn thiện dưới dạng PDF hoàn hảo, sẵn sàng gây ấn tượng với nhà tuyển dụng.' },
    ],
  },
  cta: {
    title: 'Sẵn sàng xây dựng',
    titleHighlight: 'CV chiến thắng của bạn?',
    description: 'Tham gia cùng hơn 50.000 chuyên gia đã tìm được công việc mơ ước với Best AI Resume.',
    ctaText: 'Bắt Đầu Miễn Phí',
  },
  externalResources: {
    title: 'Tài Nguyên Bên Ngoài',
    items: [
      { href: 'https://www.bls.gov/ooh/', label: 'Bureau of Labor Statistics: Dữ liệu nghề nghiệp' },
      { href: 'https://www.shrm.org/', label: 'SHRM: Tài nguyên nhân sự và nghề nghiệp' },
    ],
  },
};

const ko: FeaturesPageContent = {
  meta: {
    title: 'AI 이력서 빌더 기능 — 양식, ATS 검사 등 | Best AI Resume',
    description: 'Best AI Resume의 모든 기능을 확인하세요: AI 글쓰기, 20개 이상 전문 양식, 실시간 ATS 최적화, PDF 내보내기, 스마트 제안으로 원하는 일자리를 얻으세요.',
    keywords: '이력서 빌더 기능, AI 이력서 작성, ATS 이력서 검사, 이력서 양식, PDF 이력서, 이력서 작성 도구',
  },
  hero: {
    badge: '기능',
    title: '원하는 직장을 얻기 위한',
    titleHighlight: '모든 것',
    subtitle: '강력한 AI 도구와 아름다운 디자인으로 경쟁자들보다 돋보이세요.',
  },
  features: [
    { title: 'AI 글쓰기', description: 'AI가 성과를 강조하는 설득력 있는 글머리 기호와 전문적인 요약을 작성합니다. 기본적인 직무 설명을 임팩트 있는 문장으로 변환하세요.' },
    { title: '20개 이상 프리미엄 양식', description: 'ATS 호환성을 유지하면서 돋보이는 전문적으로 디자인된 양식 중에서 선택하세요. 각 양식은 디자인 전문가가 제작합니다.' },
    { title: 'ATS 최적화', description: '실시간 ATS 점수로 이력서가 자동 스크리닝 시스템을 통과하도록 보장합니다. 점수 향상 방법에 대한 즉각적인 피드백을 받으세요.' },
    { title: '실시간 미리보기', description: '입력하면서 변경 사항을 즉시 확인하세요. 당신이 보는 것이 바로 채용 담당자가 보는 것입니다.' },
    { title: 'PDF 내보내기', description: '바로 보낼 수 있는 완벽한 PDF를 다운로드하세요. 디지털 보기와 인쇄 모두에 최적화되어 있습니다.' },
    { title: '스마트 제안', description: '목표 직무에 맞는 기술, 키워드 및 콘텐츠에 대한 지능적인 추천을 받으세요. AI가 수천 개의 성공적인 이력서를 분석합니다.' },
  ],
  steps: {
    badge: '사용 방법',
    title: '완벽한 이력서를 위한',
    titleHighlight: '세 단계',
    items: [
      { title: '정보 입력', description: '경력, 학력, 기술을 입력하세요. AI가 매 단계를 도와드립니다.' },
      { title: '양식 선택', description: '20개 이상의 전문 양식에서 선택하세요. 사용자 정의하면서 실시간으로 미리보기하세요.' },
      { title: 'PDF 다운로드', description: '완성된 이력서를 완벽한 PDF로 내보내어 채용 담당자에게 인상을 남기세요.' },
    ],
  },
  cta: {
    title: '합격하는 이력서를',
    titleHighlight: '지금 만들어 보세요',
    description: 'Best AI Resume로 꿈의 직장을 찾은 50,000명 이상의 전문가와 함께하세요.',
    ctaText: '무료로 시작하기',
  },
  externalResources: {
    title: '외부 자료',
    items: [
      { href: 'https://www.bls.gov/ooh/', label: 'Bureau of Labor Statistics: 직업 데이터' },
      { href: 'https://www.shrm.org/', label: 'SHRM: HR 및 경력 자료' },
    ],
  },
};

const nl: FeaturesPageContent = {
  meta: {
    title: 'AI CV Maker Functies — Sjablonen, ATS Checker en Meer | Best AI Resume',
    description: 'Ontdek alle functies van Best AI Resume: AI-aangedreven schrijven, 20+ premium sjablonen, realtime ATS-optimalisatie, PDF-export en slimme suggesties om je droombaan te vinden.',
    keywords: 'cv maker functies, ai cv schrijver, ats cv checker, cv sjablonen, cv pdf export, cv maker tools',
  },
  hero: {
    badge: 'Functies',
    title: 'Alles wat je nodig hebt om',
    titleHighlight: 'je droombaan te vinden',
    subtitle: 'Krachtige AI-tools gecombineerd met prachtig design om je te laten opvallen tussen de massa.',
  },
  features: [
    { title: 'AI-aangedreven Schrijven', description: 'Laat onze AI overtuigende bullet points en professionele samenvattingen opstellen die je prestaties benadrukken. Verander eenvoudige functiebeschrijvingen in krachtige uitspraken.' },
    { title: '20+ Premium Sjablonen', description: 'Kies uit professioneel ontworpen sjablonen die opvallen en tegelijkertijd ATS-compatibel zijn. Elk sjabloon is gemaakt door designexperts.' },
    { title: 'ATS-optimalisatie', description: 'Realtime ATS-scoring zorgt ervoor dat je cv elke keer de geautomatiseerde screensystemen doorstaat. Ontvang direct feedback over hoe je score te verbeteren.' },
    { title: 'Realtime Preview', description: 'Zie wijzigingen onmiddellijk terwijl je typt. Wat je ziet is precies wat recruiters zullen zien. Geen giswerk meer over hoe je cv eruitziet.' },
    { title: 'PDF-export', description: 'Download pixel-perfecte PDF\'s klaar om te verzenden. Geoptimaliseerd voor zowel digitale weergave als afdrukken. Je cv ziet er professioneel uit overal.' },
    { title: 'Slimme Suggesties', description: 'Ontvang intelligente aanbevelingen voor vaardigheden, trefwoorden en inhoud op basis van je doelrol. AI analyseert duizenden succesvolle cv\'s.' },
  ],
  steps: {
    badge: 'Hoe Het Werkt',
    title: 'Drie stappen naar je',
    titleHighlight: 'perfecte cv',
    items: [
      { title: 'Vul Je Gegevens In', description: 'Voer je werkervaring, opleiding en vaardigheden in. Onze AI helpt je bij elke stap.' },
      { title: 'Kies een Sjabloon', description: 'Selecteer uit 20+ professioneel ontworpen sjablonen. Bekijk een realtime preview terwijl je aanpast.' },
      { title: 'Download PDF', description: 'Exporteer je afgewerkte cv als een pixel-perfecte PDF, klaar om recruiters te imponeren.' },
    ],
  },
  cta: {
    title: 'Klaar om je',
    titleHighlight: 'winnend cv te bouwen?',
    description: 'Sluit je aan bij 50.000+ professionals die al hun droombaan hebben gevonden met Best AI Resume.',
    ctaText: 'Begin Gratis',
  },
  externalResources: {
    title: 'Externe Bronnen',
    items: [
      { href: 'https://www.bls.gov/ooh/', label: 'Bureau of Labor Statistics: Loopbaangegevens' },
      { href: 'https://www.shrm.org/', label: 'SHRM: HR- en Loopbaanbronnen' },
    ],
  },
};

const content: Record<string, FeaturesPageContent> = { en, es, fr, de, ar, ja, it, ko, vi, th, pt, tr, nl };
export const getContent = (locale: string): FeaturesPageContent => selectContent(content, locale);
