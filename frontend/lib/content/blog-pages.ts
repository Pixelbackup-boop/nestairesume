import { selectContent } from './types';

export interface BlogPagesContent {
  listing: {
    meta: { title: string; description: string; ogDescription: string };
    heroBadge: string;
    heroTitle: string;
    heroTitleHighlight: string;
    heroSubtitle: string;
    featuredArticles: string;
    noArticlesTitle: string;
    noArticlesSubtitle: string;
  };
  article: {
    notFound: string;
    faqTitle: string;
    resourcesTitle: string;
    resources: { title: string; subtitle: string }[];
  };
  category: {
    metaTitleSuffix: string;
    metaDescTemplate: string;
    backToBlog: string;
    articlesCount: string;
    articleCount: string;
    noArticlesTitle: string;
    noArticlesSubtitle: string;
  };
  search: {
    meta: { title: string; description: string };
    backToBlog: string;
    title: string;
    resultsCount: string;
    resultCount: string;
    startSearchTitle: string;
    startSearchSubtitle: string;
    noResultsTitle: string;
    noResultsText: string;
    tryLabel: string;
    trySuggestions: string[];
  };
}

const en: BlogPagesContent = {
  listing: {
    meta: {
      title: 'Blog - Resume Tips & Career Advice | Best AI Resume',
      description: 'Expert resume writing tips, career advice, and job search strategies to help you land your dream job. Free guides and tutorials.',
      ogDescription: 'Expert resume writing tips, career advice, and job search strategies.',
    },
    heroBadge: 'Our Blog',
    heroTitle: 'Resume Tips & ',
    heroTitleHighlight: 'Career Advice',
    heroSubtitle: 'Expert guides, tips, and strategies to help you create standout resumes and advance your career.',
    featuredArticles: 'Featured Articles',
    noArticlesTitle: 'No articles yet',
    noArticlesSubtitle: 'Check back soon for new content!',
  },
  article: {
    notFound: 'Post Not Found',
    faqTitle: 'Frequently Asked Questions',
    resourcesTitle: 'Resume Tools & Resources',
    resources: [
      { title: '300+ Resume Examples', subtitle: 'Job-specific writing guides' },
      { title: 'Resume Format Guide 2026', subtitle: 'Chronological, functional & combination' },
      { title: 'Free Resume Templates', subtitle: 'ATS-friendly professional designs' },
      { title: 'AI Resume Builder', subtitle: 'Create your resume in minutes' },
    ],
  },
  category: {
    metaTitleSuffix: 'Articles | Best AI Resume Blog',
    metaDescTemplate: 'Browse our {category} articles for expert advice, tips, and guides.',
    backToBlog: 'Back to Blog',
    articlesCount: '{count} articles in this category',
    articleCount: '{count} article in this category',
    noArticlesTitle: 'No articles yet',
    noArticlesSubtitle: 'Check back soon for new content in this category!',
  },
  search: {
    meta: {
      title: 'Search Blog | Best AI Resume',
      description: 'Search our blog for resume tips, career advice, and job search strategies.',
    },
    backToBlog: 'Back to Blog',
    title: 'Search Results',
    resultsCount: '{count} results for',
    resultCount: '{count} result for',
    startSearchTitle: 'Start searching',
    startSearchSubtitle: 'Enter a search term to find articles',
    noResultsTitle: 'No results found',
    noResultsText: "We couldn't find any articles matching",
    tryLabel: 'Try:',
    trySuggestions: ['Using different keywords', 'Checking your spelling', 'Browsing categories instead'],
  },
};

const es: BlogPagesContent = {
  listing: {
    meta: {
      title: 'Blog - Consejos de CV y Carrera Profesional | Best AI Resume',
      description: 'Consejos de expertos para redactar tu currículum, orientación profesional y estrategias de búsqueda de empleo. Guías y tutoriales gratuitos.',
      ogDescription: 'Consejos de expertos para redactar tu currículum y estrategias de búsqueda de empleo.',
    },
    heroBadge: 'Nuestro Blog',
    heroTitle: 'Consejos de CV y ',
    heroTitleHighlight: 'Carrera Profesional',
    heroSubtitle: 'Guías, consejos y estrategias de expertos para crear currículums destacados y avanzar en tu carrera.',
    featuredArticles: 'Artículos Destacados',
    noArticlesTitle: 'No hay artículos todavía',
    noArticlesSubtitle: '¡Vuelve pronto para nuevo contenido!',
  },
  article: {
    notFound: 'Artículo No Encontrado',
    faqTitle: 'Preguntas Frecuentes',
    resourcesTitle: 'Herramientas y Recursos de CV',
    resources: [
      { title: '300+ Ejemplos de CV', subtitle: 'Guías de redacción por profesión' },
      { title: 'Guía de Formato de CV 2026', subtitle: 'Cronológico, funcional y combinado' },
      { title: 'Plantillas de CV Gratuitas', subtitle: 'Diseños profesionales compatibles con ATS' },
      { title: 'Creador de CV con IA', subtitle: 'Crea tu currículum en minutos' },
    ],
  },
  category: {
    metaTitleSuffix: 'Artículos | Blog de Best AI Resume',
    metaDescTemplate: 'Explora nuestros artículos de {category} con consejos, guías y orientación de expertos.',
    backToBlog: 'Volver al Blog',
    articlesCount: '{count} artículos en esta categoría',
    articleCount: '{count} artículo en esta categoría',
    noArticlesTitle: 'No hay artículos todavía',
    noArticlesSubtitle: '¡Vuelve pronto para nuevo contenido en esta categoría!',
  },
  search: {
    meta: {
      title: 'Buscar en el Blog | Best AI Resume',
      description: 'Busca en nuestro blog consejos de currículum, orientación profesional y estrategias de búsqueda de empleo.',
    },
    backToBlog: 'Volver al Blog',
    title: 'Resultados de Búsqueda',
    resultsCount: '{count} resultados para',
    resultCount: '{count} resultado para',
    startSearchTitle: 'Comienza a buscar',
    startSearchSubtitle: 'Ingresa un término de búsqueda para encontrar artículos',
    noResultsTitle: 'Sin resultados',
    noResultsText: 'No pudimos encontrar artículos que coincidan con',
    tryLabel: 'Intenta:',
    trySuggestions: ['Usar palabras clave diferentes', 'Verificar la ortografía', 'Explorar las categorías'],
  },
};

const fr: BlogPagesContent = {
  listing: {
    meta: {
      title: 'Blog - Conseils CV et Carrière | Best AI Resume',
      description: 'Conseils d\'experts pour rédiger votre CV, orientation professionnelle et stratégies de recherche d\'emploi. Guides et tutoriels gratuits.',
      ogDescription: 'Conseils d\'experts pour rédiger votre CV et stratégies de recherche d\'emploi.',
    },
    heroBadge: 'Notre Blog',
    heroTitle: 'Conseils CV et ',
    heroTitleHighlight: 'Carrière',
    heroSubtitle: 'Guides, conseils et stratégies d\'experts pour créer des CV remarquables et progresser dans votre carrière.',
    featuredArticles: 'Articles à la Une',
    noArticlesTitle: 'Pas encore d\'articles',
    noArticlesSubtitle: 'Revenez bientôt pour du nouveau contenu !',
  },
  article: {
    notFound: 'Article Non Trouvé',
    faqTitle: 'Questions Fréquentes',
    resourcesTitle: 'Outils et Ressources CV',
    resources: [
      { title: '300+ Exemples de CV', subtitle: 'Guides de rédaction par métier' },
      { title: 'Guide Format CV 2026', subtitle: 'Chronologique, fonctionnel et combiné' },
      { title: 'Modèles de CV Gratuits', subtitle: 'Designs professionnels compatibles ATS' },
      { title: 'Créateur de CV IA', subtitle: 'Créez votre CV en quelques minutes' },
    ],
  },
  category: {
    metaTitleSuffix: 'Articles | Blog Best AI Resume',
    metaDescTemplate: 'Parcourez nos articles {category} pour des conseils, guides et avis d\'experts.',
    backToBlog: 'Retour au Blog',
    articlesCount: '{count} articles dans cette catégorie',
    articleCount: '{count} article dans cette catégorie',
    noArticlesTitle: 'Pas encore d\'articles',
    noArticlesSubtitle: 'Revenez bientôt pour du nouveau contenu dans cette catégorie !',
  },
  search: {
    meta: {
      title: 'Rechercher dans le Blog | Best AI Resume',
      description: 'Recherchez dans notre blog des conseils CV, orientation professionnelle et stratégies de recherche d\'emploi.',
    },
    backToBlog: 'Retour au Blog',
    title: 'Résultats de Recherche',
    resultsCount: '{count} résultats pour',
    resultCount: '{count} résultat pour',
    startSearchTitle: 'Commencez votre recherche',
    startSearchSubtitle: 'Saisissez un terme de recherche pour trouver des articles',
    noResultsTitle: 'Aucun résultat',
    noResultsText: 'Nous n\'avons trouvé aucun article correspondant à',
    tryLabel: 'Essayez :',
    trySuggestions: ['Utiliser des mots-clés différents', 'Vérifier l\'orthographe', 'Parcourir les catégories'],
  },
};

const de: BlogPagesContent = {
  listing: {
    meta: {
      title: 'Blog - Lebenslauf-Tipps und Karriereberatung | Best AI Resume',
      description: 'Experten-Tipps für Lebenslauf-Erstellung, Karriereberatung und Strategien für die Jobsuche. Kostenlose Anleitungen und Tutorials.',
      ogDescription: 'Experten-Tipps für Lebenslauf-Erstellung und Strategien für die Jobsuche.',
    },
    heroBadge: 'Unser Blog',
    heroTitle: 'Lebenslauf-Tipps und ',
    heroTitleHighlight: 'Karriereberatung',
    heroSubtitle: 'Experten-Guides, Tipps und Strategien, um herausragende Lebensläufe zu erstellen und Ihre Karriere voranzutreiben.',
    featuredArticles: 'Empfohlene Artikel',
    noArticlesTitle: 'Noch keine Artikel',
    noArticlesSubtitle: 'Schauen Sie bald wieder vorbei!',
  },
  article: {
    notFound: 'Artikel Nicht Gefunden',
    faqTitle: 'Häufig Gestellte Fragen',
    resourcesTitle: 'Lebenslauf-Tools und Ressourcen',
    resources: [
      { title: '300+ Lebenslauf-Beispiele', subtitle: 'Berufsspezifische Anleitungen' },
      { title: 'Lebenslauf-Format Guide 2026', subtitle: 'Chronologisch, funktional und kombiniert' },
      { title: 'Kostenlose Lebenslauf-Vorlagen', subtitle: 'ATS-kompatible professionelle Designs' },
      { title: 'KI-Lebenslauf-Ersteller', subtitle: 'Erstellen Sie Ihren Lebenslauf in Minuten' },
    ],
  },
  category: {
    metaTitleSuffix: 'Artikel | Best AI Resume Blog',
    metaDescTemplate: 'Durchsuchen Sie unsere {category}-Artikel für Experten-Tipps, Anleitungen und Ratgeber.',
    backToBlog: 'Zurück zum Blog',
    articlesCount: '{count} Artikel in dieser Kategorie',
    articleCount: '{count} Artikel in dieser Kategorie',
    noArticlesTitle: 'Noch keine Artikel',
    noArticlesSubtitle: 'Schauen Sie bald wieder vorbei für neue Inhalte in dieser Kategorie!',
  },
  search: {
    meta: {
      title: 'Blog durchsuchen | Best AI Resume',
      description: 'Durchsuchen Sie unseren Blog nach Lebenslauf-Tipps, Karriereberatung und Strategien für die Jobsuche.',
    },
    backToBlog: 'Zurück zum Blog',
    title: 'Suchergebnisse',
    resultsCount: '{count} Ergebnisse für',
    resultCount: '{count} Ergebnis für',
    startSearchTitle: 'Suche starten',
    startSearchSubtitle: 'Geben Sie einen Suchbegriff ein, um Artikel zu finden',
    noResultsTitle: 'Keine Ergebnisse',
    noResultsText: 'Wir konnten keine Artikel finden, die übereinstimmen mit',
    tryLabel: 'Versuchen Sie:',
    trySuggestions: ['Andere Suchbegriffe verwenden', 'Rechtschreibung überprüfen', 'Kategorien durchsuchen'],
  },
};

const ar: BlogPagesContent = {
  listing: {
    meta: {
      title: 'المدونة - نصائح السيرة الذاتية والمسار المهني | Best AI Resume',
      description: 'نصائح خبراء لكتابة السيرة الذاتية، توجيه مهني واستراتيجيات البحث عن عمل. أدلة ودروس مجانية.',
      ogDescription: 'نصائح خبراء لكتابة السيرة الذاتية واستراتيجيات البحث عن عمل.',
    },
    heroBadge: 'مدونتنا',
    heroTitle: 'نصائح السيرة الذاتية و',
    heroTitleHighlight: 'المسار المهني',
    heroSubtitle: 'أدلة ونصائح واستراتيجيات من خبراء لإنشاء سير ذاتية متميزة والتقدم في مسارك المهني.',
    featuredArticles: 'مقالات مميزة',
    noArticlesTitle: 'لا توجد مقالات بعد',
    noArticlesSubtitle: 'عد قريباً لمحتوى جديد!',
  },
  article: {
    notFound: 'المقال غير موجود',
    faqTitle: 'الأسئلة الشائعة',
    resourcesTitle: 'أدوات وموارد السيرة الذاتية',
    resources: [
      { title: 'أكثر من 300 نموذج سيرة ذاتية', subtitle: 'أدلة كتابة حسب المهنة' },
      { title: 'دليل تنسيق السيرة الذاتية 2026', subtitle: 'زمني، وظيفي ومختلط' },
      { title: 'قوالب سيرة ذاتية مجانية', subtitle: 'تصاميم احترافية متوافقة مع ATS' },
      { title: 'منشئ سيرة ذاتية بالذكاء الاصطناعي', subtitle: 'أنشئ سيرتك الذاتية في دقائق' },
    ],
  },
  category: {
    metaTitleSuffix: 'مقالات | مدونة Best AI Resume',
    metaDescTemplate: 'تصفح مقالات {category} للحصول على نصائح وأدلة من الخبراء.',
    backToBlog: 'العودة للمدونة',
    articlesCount: '{count} مقالات في هذه الفئة',
    articleCount: '{count} مقال في هذه الفئة',
    noArticlesTitle: 'لا توجد مقالات بعد',
    noArticlesSubtitle: 'عد قريباً لمحتوى جديد في هذه الفئة!',
  },
  search: {
    meta: {
      title: 'البحث في المدونة | Best AI Resume',
      description: 'ابحث في مدونتنا عن نصائح السيرة الذاتية والتوجيه المهني واستراتيجيات البحث عن عمل.',
    },
    backToBlog: 'العودة للمدونة',
    title: 'نتائج البحث',
    resultsCount: '{count} نتائج لـ',
    resultCount: '{count} نتيجة لـ',
    startSearchTitle: 'ابدأ البحث',
    startSearchSubtitle: 'أدخل كلمة بحث للعثور على المقالات',
    noResultsTitle: 'لا توجد نتائج',
    noResultsText: 'لم نتمكن من العثور على مقالات تتطابق مع',
    tryLabel: 'جرّب:',
    trySuggestions: ['استخدام كلمات مفتاحية مختلفة', 'التحقق من الإملاء', 'تصفح الفئات بدلاً من ذلك'],
  },
};

const ja: BlogPagesContent = {
  listing: {
    meta: {
      title: 'ブログ — 履歴書の書き方・キャリアアドバイス | Best AI Resume',
      description: '履歴書・職務経歴書の書き方、転職活動のコツ、キャリアアップ戦略を専門家が解説。無料ガイドとチュートリアルで理想の仕事を見つけましょう。',
      ogDescription: '履歴書・職務経歴書の書き方とキャリアアップのための専門家アドバイス。',
    },
    heroBadge: 'ブログ',
    heroTitle: '履歴書の書き方・',
    heroTitleHighlight: 'キャリアアドバイス',
    heroSubtitle: '履歴書・職務経歴書の作成と転職活動に役立つ専門家のガイド、ヒント、戦略をお届けします。',
    featuredArticles: '注目の記事',
    noArticlesTitle: 'まだ記事がありません',
    noArticlesSubtitle: '近日中に新しいコンテンツを公開予定です！',
  },
  article: {
    notFound: '記事が見つかりません',
    faqTitle: 'よくある質問',
    resourcesTitle: '履歴書ツール・リソース',
    resources: [
      { title: '300以上の履歴書サンプル', subtitle: '職種別の書き方ガイド' },
      { title: '履歴書フォーマットガイド 2026', subtitle: '時系列・機能別・組み合わせ型' },
      { title: '無料履歴書テンプレート', subtitle: 'ATS対応のプロフェッショナルデザイン' },
      { title: 'AI履歴書ビルダー', subtitle: '数分で履歴書を作成' },
    ],
  },
  category: {
    metaTitleSuffix: '記事一覧 | Best AI Resume ブログ',
    metaDescTemplate: '{category}に関する専門家のアドバイス、ヒント、ガイドをご覧ください。',
    backToBlog: 'ブログに戻る',
    articlesCount: 'このカテゴリに{count}件の記事',
    articleCount: 'このカテゴリに{count}件の記事',
    noArticlesTitle: 'まだ記事がありません',
    noArticlesSubtitle: 'このカテゴリの記事は近日公開予定です！',
  },
  search: {
    meta: {
      title: 'ブログ検索 | Best AI Resume',
      description: '履歴書の書き方、キャリアアドバイス、転職戦略に関するブログ記事を検索できます。',
    },
    backToBlog: 'ブログに戻る',
    title: '検索結果',
    resultsCount: '「{count}」件の検索結果',
    resultCount: '「{count}」件の検索結果',
    startSearchTitle: '検索を開始',
    startSearchSubtitle: '検索キーワードを入力して記事を探しましょう',
    noResultsTitle: '検索結果がありません',
    noResultsText: '一致する記事が見つかりませんでした',
    tryLabel: 'ヒント：',
    trySuggestions: ['別のキーワードを試す', 'スペルを確認する', 'カテゴリから探す'],
  },
};

const content: Record<string, BlogPagesContent> = { en, es, fr, de, ar, ja };
export const getContent = (locale: string): BlogPagesContent => selectContent(content, locale);
