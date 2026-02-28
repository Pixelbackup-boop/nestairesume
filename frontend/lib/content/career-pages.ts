import { selectContent } from './types';

interface CareerListingContent {
  meta: { title: string; description: string; ogTitle: string; ogDescription: string };
  badge: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  featured: string;
  noPostsTitle: string;
  noPostsSub: string;
}

interface CareerArticleContent {
  notFound: string;
}

export interface CareerPagesContent {
  listing: CareerListingContent;
  article: CareerArticleContent;
}

const en: CareerPagesContent = {
  listing: {
    meta: {
      title: 'Career Resources & Job Opportunities | Best AI Resume',
      description: 'Discover career resources, job opportunities, industry insights, and professional development tips to advance your career.',
      ogTitle: 'Career Resources & Job Opportunities | Best AI Resume',
      ogDescription: 'Discover career resources, job opportunities, and professional development tips.',
    },
    badge: 'Career Center',
    title: 'Career Resources &',
    titleHighlight: 'Opportunities',
    subtitle: 'Explore job opportunities, career insights, and professional development resources to help you advance your career.',
    featured: 'Featured Opportunities',
    noPostsTitle: 'No career posts yet',
    noPostsSub: 'Check back soon for career resources and opportunities!',
  },
  article: {
    notFound: 'Post Not Found',
  },
};

const es: CareerPagesContent = {
  listing: {
    meta: {
      title: 'Recursos Profesionales y Oportunidades de Empleo | Best AI Resume',
      description: 'Descubre recursos profesionales, oportunidades de empleo, perspectivas de la industria y consejos de desarrollo profesional para avanzar en tu carrera.',
      ogTitle: 'Recursos Profesionales y Oportunidades de Empleo | Best AI Resume',
      ogDescription: 'Descubre recursos profesionales, oportunidades de empleo y consejos de desarrollo profesional.',
    },
    badge: 'Centro de Carreras',
    title: 'Recursos Profesionales y',
    titleHighlight: 'Oportunidades',
    subtitle: 'Explora oportunidades de empleo, perspectivas profesionales y recursos de desarrollo para ayudarte a avanzar en tu carrera.',
    featured: 'Oportunidades Destacadas',
    noPostsTitle: 'A\u00fan no hay publicaciones de carrera',
    noPostsSub: '\u00a1Vuelve pronto para recursos profesionales y oportunidades!',
  },
  article: {
    notFound: 'Publicaci\u00f3n No Encontrada',
  },
};

const fr: CareerPagesContent = {
  listing: {
    meta: {
      title: 'Ressources Carrière et Opportunités d\'Emploi | Best AI Resume',
      description: 'Découvrez des ressources carrière, des opportunités d\'emploi, des perspectives sectorielles et des conseils de développement professionnel.',
      ogTitle: 'Ressources Carrière et Opportunités d\'Emploi | Best AI Resume',
      ogDescription: 'Découvrez des ressources carrière, des opportunités d\'emploi et des conseils de développement professionnel.',
    },
    badge: 'Espace Carrière',
    title: 'Ressources Carrière et',
    titleHighlight: 'Opportunités',
    subtitle: 'Explorez les opportunités d\'emploi, les perspectives de carrière et les ressources de développement professionnel.',
    featured: 'Opportunités à la Une',
    noPostsTitle: 'Pas encore de publications',
    noPostsSub: 'Revenez bientôt pour des ressources et opportunités !',
  },
  article: {
    notFound: 'Publication Non Trouvée',
  },
};

const de: CareerPagesContent = {
  listing: {
    meta: {
      title: 'Karriere-Ressourcen und Stellenangebote | Best AI Resume',
      description: 'Entdecken Sie Karriere-Ressourcen, Stellenangebote, Brancheneinblicke und Tipps zur beruflichen Weiterentwicklung.',
      ogTitle: 'Karriere-Ressourcen und Stellenangebote | Best AI Resume',
      ogDescription: 'Entdecken Sie Karriere-Ressourcen, Stellenangebote und Tipps zur beruflichen Weiterentwicklung.',
    },
    badge: 'Karriere-Center',
    title: 'Karriere-Ressourcen und',
    titleHighlight: 'Stellenangebote',
    subtitle: 'Erkunden Sie Stellenangebote, Karriere-Einblicke und Ressourcen zur beruflichen Weiterentwicklung.',
    featured: 'Empfohlene Stellenangebote',
    noPostsTitle: 'Noch keine Beiträge',
    noPostsSub: 'Schauen Sie bald wieder vorbei für Karriere-Ressourcen und Stellenangebote!',
  },
  article: {
    notFound: 'Beitrag Nicht Gefunden',
  },
};

const ar: CareerPagesContent = {
  listing: {
    meta: {
      title: 'موارد مهنية وفرص عمل | Best AI Resume',
      description: 'اكتشف موارد مهنية وفرص عمل ورؤى قطاعية ونصائح للتطوير المهني لتقدم مسارك الوظيفي.',
      ogTitle: 'موارد مهنية وفرص عمل | Best AI Resume',
      ogDescription: 'اكتشف موارد مهنية وفرص عمل ونصائح للتطوير المهني.',
    },
    badge: 'مركز التوظيف',
    title: 'موارد مهنية و',
    titleHighlight: 'فرص عمل',
    subtitle: 'استكشف فرص العمل والرؤى المهنية وموارد التطوير المهني لمساعدتك في التقدم.',
    featured: 'فرص مميزة',
    noPostsTitle: 'لا توجد منشورات بعد',
    noPostsSub: 'عد قريباً لموارد مهنية وفرص عمل!',
  },
  article: {
    notFound: 'المنشور غير موجود',
  },
};

const ja: CareerPagesContent = {
  listing: {
    meta: {
      title: 'キャリアリソース・求人情報 | Best AI Resume',
      description: 'キャリアリソース、求人情報、業界の最新動向、スキルアップに役立つ情報をご紹介。転職・就職活動に役立つ情報が満載です。',
      ogTitle: 'キャリアリソース・求人情報 | Best AI Resume',
      ogDescription: 'キャリアリソース、求人情報、スキルアップに役立つ情報をご紹介。',
    },
    badge: 'キャリアセンター',
    title: 'キャリアリソースと',
    titleHighlight: '求人情報',
    subtitle: '求人情報、キャリアに関するインサイト、スキルアップのためのリソースをご覧ください。',
    featured: '注目の求人',
    noPostsTitle: 'まだ投稿はありません',
    noPostsSub: 'キャリアリソースと求人情報を近日公開予定です！',
  },
  article: {
    notFound: '記事が見つかりません',
  },
};

const it: CareerPagesContent = {
  listing: {
    meta: {
      title: 'Risorse per la Carriera e Opportunità di Lavoro | Best AI Resume',
      description: 'Scopri risorse professionali, opportunità di lavoro, approfondimenti di settore e consigli per lo sviluppo della carriera.',
      ogTitle: 'Risorse per la Carriera e Opportunità di Lavoro | Best AI Resume',
      ogDescription: 'Scopri risorse professionali, opportunità di lavoro e consigli per lo sviluppo della carriera.',
    },
    badge: 'Centro Carriera',
    title: 'Risorse per la Carriera e',
    titleHighlight: 'Opportunità',
    subtitle: 'Esplora opportunità di lavoro, approfondimenti professionali e risorse per lo sviluppo della carriera.',
    featured: 'Opportunità in Evidenza',
    noPostsTitle: 'Nessun articolo ancora',
    noPostsSub: 'Torna presto per risorse e opportunità professionali!',
  },
  article: {
    notFound: 'Articolo Non Trovato',
  },
};

const contentMap: Record<string, CareerPagesContent> = { en, es, fr, de, ar, ja, it };

export function getCareerListingContent(locale: string) { return selectContent(contentMap, locale).listing; }
export function getCareerArticleContent(locale: string) { return selectContent(contentMap, locale).article; }
