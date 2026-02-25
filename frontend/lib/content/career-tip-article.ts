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

const content: Record<string, CareerTipArticleContent> = { en, es, fr, de, ar };
export const getContent = (locale: string): CareerTipArticleContent => selectContent(content, locale);
