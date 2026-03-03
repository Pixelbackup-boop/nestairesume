import { selectContent } from './types';

export interface CareerTipArticleContent {
  breadcrumb: { home: string; careerTips: string };
  notFound: string;
  share: { title: string; subtitle: string };
  cta: { title: string; subtitle: string; button: string };
  sidebar: {
    tocTitle: string;
    relatedTitle: string;
    ctaTitle: string;
    ctaSubtitle: string;
    ctaButton: string;
  };
  moreCareerTips: string;
  tagsLabel: string;
}

const en: CareerTipArticleContent = {
  breadcrumb: { home: 'Home', careerTips: 'Career Tips' },
  notFound: 'Article Not Found',
  share: {
    title: 'Found this helpful?',
    subtitle: 'Share it with others who might benefit',
  },
  cta: {
    title: 'Ready to Build Your Resume?',
    subtitle: 'Put these tips into action with our AI-powered resume builder. Create a professional resume in minutes.',
    button: 'Build Your Resume Now',
  },
  sidebar: {
    tocTitle: 'Table of Contents',
    relatedTitle: 'Related Articles',
    ctaTitle: 'Build Your Resume',
    ctaSubtitle: 'Create a professional resume with AI in minutes.',
    ctaButton: 'Get Started',
  },
  moreCareerTips: 'More Career Tips',
  tagsLabel: 'Tags:',
};

const es: CareerTipArticleContent = {
  breadcrumb: { home: 'Inicio', careerTips: 'Consejos de Carrera' },
  notFound: 'Artículo No Encontrado',
  share: {
    title: '¿Te resultó útil?',
    subtitle: 'Compártelo con otros que puedan beneficiarse',
  },
  cta: {
    title: '¿Listo para crear tu currículum?',
    subtitle: 'Pon estos consejos en práctica con nuestro creador de CV potenciado por IA. Crea un currículum profesional en minutos.',
    button: 'Crear Tu CV Ahora',
  },
  sidebar: {
    tocTitle: 'Tabla de Contenidos',
    relatedTitle: 'Artículos Relacionados',
    ctaTitle: 'Crea Tu CV',
    ctaSubtitle: 'Crea un currículum profesional con IA en minutos.',
    ctaButton: 'Comenzar',
  },
  moreCareerTips: 'Más Consejos de Carrera',
  tagsLabel: 'Etiquetas:',
};

const fr: CareerTipArticleContent = {
  breadcrumb: { home: 'Accueil', careerTips: 'Conseils Carrière' },
  notFound: 'Article Non Trouvé',
  share: {
    title: 'Cet article vous a aidé ?',
    subtitle: 'Partagez-le avec d\'autres personnes qui pourraient en bénéficier',
  },
  cta: {
    title: 'Prêt à créer votre CV ?',
    subtitle: 'Mettez ces conseils en pratique avec notre créateur de CV propulsé par l\'IA. Créez un CV professionnel en quelques minutes.',
    button: 'Créer Votre CV Maintenant',
  },
  sidebar: {
    tocTitle: 'Sommaire',
    relatedTitle: 'Articles Associés',
    ctaTitle: 'Créez Votre CV',
    ctaSubtitle: 'Créez un CV professionnel avec l\'IA en quelques minutes.',
    ctaButton: 'Commencer',
  },
  moreCareerTips: 'Plus de Conseils Carrière',
  tagsLabel: 'Tags :',
};

const de: CareerTipArticleContent = {
  breadcrumb: { home: 'Startseite', careerTips: 'Karriere-Tipps' },
  notFound: 'Artikel Nicht Gefunden',
  share: {
    title: 'War das hilfreich?',
    subtitle: 'Teilen Sie es mit anderen, die davon profitieren könnten',
  },
  cta: {
    title: 'Bereit, Ihren Lebenslauf zu erstellen?',
    subtitle: 'Setzen Sie diese Tipps mit unserem KI-gestützten Lebenslauf-Ersteller in die Praxis um. Erstellen Sie einen professionellen Lebenslauf in Minuten.',
    button: 'Lebenslauf jetzt erstellen',
  },
  sidebar: {
    tocTitle: 'Inhaltsverzeichnis',
    relatedTitle: 'Verwandte Artikel',
    ctaTitle: 'Lebenslauf erstellen',
    ctaSubtitle: 'Erstellen Sie einen professionellen Lebenslauf mit KI in Minuten.',
    ctaButton: 'Starten',
  },
  moreCareerTips: 'Weitere Karriere-Tipps',
  tagsLabel: 'Tags:',
};

const ar: CareerTipArticleContent = {
  breadcrumb: { home: 'الرئيسية', careerTips: 'نصائح مهنية' },
  notFound: 'المقال غير موجود',
  share: {
    title: 'هل وجدت هذا مفيداً؟',
    subtitle: 'شاركه مع الآخرين الذين قد يستفيدون منه',
  },
  cta: {
    title: 'مستعد لإنشاء سيرتك الذاتية؟',
    subtitle: 'طبّق هذه النصائح مع منشئ السيرة الذاتية بالذكاء الاصطناعي. أنشئ سيرة ذاتية احترافية في دقائق.',
    button: 'أنشئ سيرتك الذاتية الآن',
  },
  sidebar: {
    tocTitle: 'جدول المحتويات',
    relatedTitle: 'مقالات ذات صلة',
    ctaTitle: 'أنشئ سيرتك الذاتية',
    ctaSubtitle: 'أنشئ سيرة ذاتية احترافية بالذكاء الاصطناعي في دقائق.',
    ctaButton: 'ابدأ',
  },
  moreCareerTips: 'المزيد من النصائح المهنية',
  tagsLabel: 'الوسوم:',
};

const ja: CareerTipArticleContent = {
  breadcrumb: { home: 'ホーム', careerTips: 'キャリアアドバイス' },
  notFound: '記事が見つかりません',
  share: {
    title: 'この記事は役に立ちましたか？',
    subtitle: '参考になりそうな方にシェアしましょう',
  },
  cta: {
    title: '履歴書を作成しませんか？',
    subtitle: 'このアドバイスをAI履歴書ビルダーで実践しましょう。数分でプロフェッショナルな履歴書を作成できます。',
    button: '今すぐ履歴書を作成',
  },
  sidebar: {
    tocTitle: '目次',
    relatedTitle: '関連記事',
    ctaTitle: '履歴書を作成',
    ctaSubtitle: 'AIで数分でプロフェッショナルな履歴書を作成。',
    ctaButton: '始める',
  },
  moreCareerTips: 'その他のキャリアアドバイス',
  tagsLabel: 'タグ：',
};

const it: CareerTipArticleContent = {
  breadcrumb: { home: 'Home', careerTips: 'Consigli per la Carriera' },
  notFound: 'Articolo Non Trovato',
  share: {
    title: 'Hai trovato utile questo articolo?',
    subtitle: 'Condividilo con chi potrebbe trarne vantaggio',
  },
  cta: {
    title: 'Pronto a creare il tuo curriculum?',
    subtitle: 'Metti in pratica questi consigli con il nostro creatore di CV basato sull\'intelligenza artificiale. Crea un curriculum professionale in pochi minuti.',
    button: 'Crea il Tuo CV Ora',
  },
  sidebar: {
    tocTitle: 'Indice',
    relatedTitle: 'Articoli Correlati',
    ctaTitle: 'Crea il Tuo CV',
    ctaSubtitle: 'Crea un curriculum vitae professionale con l\'IA in pochi minuti.',
    ctaButton: 'Inizia',
  },
  moreCareerTips: 'Altri Consigli per la Carriera',
  tagsLabel: 'Tag:',
};

const th: CareerTipArticleContent = {
  breadcrumb: { home: 'หน้าแรก', careerTips: 'เคล็ดลับอาชีพ' },
  notFound: 'ไม่พบบทความ',
  share: {
    title: 'บทความนี้มีประโยชน์ไหม?',
    subtitle: 'แชร์ให้คนอื่นที่อาจได้ประโยชน์',
  },
  cta: {
    title: 'พร้อมสร้างเรซูเม่ของคุณหรือยัง?',
    subtitle: 'นำเคล็ดลับเหล่านี้ไปใช้จริงด้วยเครื่องมือสร้างเรซูเม่ AI ของเรา สร้างเรซูเม่มืออาชีพได้ในไม่กี่นาที',
    button: 'สร้างเรซูเม่ตอนนี้',
  },
  sidebar: {
    tocTitle: 'สารบัญ',
    relatedTitle: 'บทความที่เกี่ยวข้อง',
    ctaTitle: 'สร้างเรซูเม่ของคุณ',
    ctaSubtitle: 'สร้างเรซูเม่มืออาชีพด้วย AI ในไม่กี่นาที',
    ctaButton: 'เริ่มต้น',
  },
  moreCareerTips: 'เคล็ดลับอาชีพเพิ่มเติม',
  tagsLabel: 'แท็ก:',
};

const pt: CareerTipArticleContent = {
  breadcrumb: { home: 'Inicio', careerTips: 'Dicas de Carreira' },
  notFound: 'Artigo Nao Encontrado',
  share: {
    title: 'Achou este artigo util?',
    subtitle: 'Compartilhe com quem pode se beneficiar',
  },
  cta: {
    title: 'Pronto para criar seu curriculo?',
    subtitle: 'Aplique essas dicas com nosso construtor de curriculo com inteligencia artificial. Crie um curriculo profissional em poucos minutos.',
    button: 'Criar Meu Curriculo Agora',
  },
  sidebar: {
    tocTitle: 'Indice',
    relatedTitle: 'Artigos Relacionados',
    ctaTitle: 'Crie Seu Curriculo',
    ctaSubtitle: 'Crie um curriculo profissional com IA em poucos minutos.',
    ctaButton: 'Comecar',
  },
  moreCareerTips: 'Mais Dicas de Carreira',
  tagsLabel: 'Tags:',
};

const content: Record<string, CareerTipArticleContent> = { en, es, fr, de, ar, ja, it, th, pt };
export const getContent = (locale: string): CareerTipArticleContent => selectContent(content, locale);
