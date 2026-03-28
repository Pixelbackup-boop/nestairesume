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

const tr: CareerTipArticleContent = {
  breadcrumb: { home: 'Ana Sayfa', careerTips: 'Kariyer İpuçları' },
  notFound: 'Makale Bulunamadı',
  share: {
    title: 'Bu makale faydalı mıydı?',
    subtitle: 'Fayda görebilecek biriyle paylaşın',
  },
  cta: {
    title: 'CV\'nizi oluşturmaya hazır mısınız?',
    subtitle: 'Bu ipuçlarını yapay zeka destekli CV oluşturucumuzla hayata geçirin. Dakikalar içinde profesyonel bir CV hazırlayın.',
    button: 'Şimdi CV\'mi Oluştur',
  },
  sidebar: {
    tocTitle: 'İçindekiler',
    relatedTitle: 'İlgili Makaleler',
    ctaTitle: 'CV\'nizi Oluşturun',
    ctaSubtitle: 'Dakikalar içinde AI ile profesyonel CV hazırlayın.',
    ctaButton: 'Başla',
  },
  moreCareerTips: 'Daha Fazla Kariyer İpucu',
  tagsLabel: 'Etiketler:',
};

const vi: CareerTipArticleContent = {
  breadcrumb: { home: 'Trang Chủ', careerTips: 'Mẹo Nghề Nghiệp' },
  notFound: 'Không Tìm Thấy Bài Viết',
  share: {
    title: 'Bài viết này có hữu ích không?',
    subtitle: 'Chia sẻ với những người khác có thể hưởng lợi',
  },
  cta: {
    title: 'Sẵn Sàng Tạo CV của Bạn?',
    subtitle: 'Áp dụng những mẹo này với công cụ tạo CV AI của chúng tôi. Tạo CV chuyên nghiệp trong vài phút.',
    button: 'Tạo CV Ngay',
  },
  sidebar: {
    tocTitle: 'Mục Lục',
    relatedTitle: 'Bài Viết Liên Quan',
    ctaTitle: 'Tạo CV Của Bạn',
    ctaSubtitle: 'Tạo CV chuyên nghiệp với AI trong vài phút.',
    ctaButton: 'Bắt Đầu',
  },
  moreCareerTips: 'Mẹo Nghề Nghiệp Khác',
  tagsLabel: 'Thẻ:',
};

const ko: CareerTipArticleContent = {
  breadcrumb: { home: '홈', careerTips: '커리어 팁' },
  notFound: '기사를 찾을 수 없습니다',
  share: {
    title: '도움이 되셨나요?',
    subtitle: '도움이 필요한 다른 분들과 공유하세요',
  },
  cta: {
    title: '이력서를 만들 준비가 되셨나요?',
    subtitle: 'AI 이력서 빌더로 이 팁들을 실제로 적용해 보세요. 몇 분 만에 전문적인 이력서를 만드세요.',
    button: '지금 이력서 만들기',
  },
  sidebar: {
    tocTitle: '목차',
    relatedTitle: '관련 기사',
    ctaTitle: '이력서 만들기',
    ctaSubtitle: 'AI로 몇 분 만에 전문적인 이력서를 만드세요.',
    ctaButton: '시작하기',
  },
  moreCareerTips: '더 많은 커리어 팁',
  tagsLabel: '태그:',
};

const nl: CareerTipArticleContent = {
  breadcrumb: { home: 'Home', careerTips: 'Loopbaantips' },
  notFound: 'Artikel Niet Gevonden',
  share: {
    title: 'Was dit nuttig?',
    subtitle: 'Deel het met anderen die er baat bij kunnen hebben',
  },
  cta: {
    title: 'Klaar om je cv te maken?',
    subtitle: 'Pas deze tips toe met onze AI-aangedreven cv maker. Maak in minuten een professioneel cv.',
    button: 'Maak Nu Je CV',
  },
  sidebar: {
    tocTitle: 'Inhoudsopgave',
    relatedTitle: 'Gerelateerde Artikelen',
    ctaTitle: 'Maak Je CV',
    ctaSubtitle: 'Maak in minuten een professioneel cv met AI.',
    ctaButton: 'Aan de Slag',
  },
  moreCareerTips: 'Meer Loopbaantips',
  tagsLabel: 'Tags:',
};

const zh: CareerTipArticleContent = {
  breadcrumb: { home: '首页', careerTips: '职业建议' },
  notFound: '文章未找到',
  share: {
    title: '觉得有帮助吗？',
    subtitle: '分享给其他可能受益的人',
  },
  cta: {
    title: '准备好制作简历了吗？',
    subtitle: '使用我们的AI简历制作工具将这些建议付诸实践。几分钟内即可创建专业简历。',
    button: '立即制作简历',
  },
  sidebar: {
    tocTitle: '目录',
    relatedTitle: '相关文章',
    ctaTitle: '制作你的简历',
    ctaSubtitle: '使用AI几分钟内创建专业简历。',
    ctaButton: '开始',
  },
  moreCareerTips: '更多职业建议',
  tagsLabel: '标签：',
};

const ms: CareerTipArticleContent = {
  breadcrumb: { home: 'Laman Utama', careerTips: 'Tip Kerjaya' },
  notFound: 'Artikel Tidak Ditemui',
  share: {
    title: 'Adakah ini membantu?',
    subtitle: 'Kongsikan dengan orang lain yang mungkin mendapat manfaat',
  },
  cta: {
    title: 'Sedia untuk membina resume anda?',
    subtitle: 'Gunakan tip ini dengan pembina resume AI kami. Cipta resume profesional dalam beberapa minit.',
    button: 'Bina Resume Anda Sekarang',
  },
  sidebar: {
    tocTitle: 'Jadual Kandungan',
    relatedTitle: 'Artikel Berkaitan',
    ctaTitle: 'Bina Resume Anda',
    ctaSubtitle: 'Cipta resume profesional dengan AI dalam beberapa minit.',
    ctaButton: 'Mula',
  },
  moreCareerTips: 'Lagi Tip Kerjaya',
  tagsLabel: 'Tag:',
};

const content: Record<string, CareerTipArticleContent> = { en, es, fr, de, ar, ja, it, ko, vi, th, pt, tr, nl, zh, ms };
export const getContent = (locale: string): CareerTipArticleContent => selectContent(content, locale);
