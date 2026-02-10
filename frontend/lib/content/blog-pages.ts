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

const content: Record<string, BlogPagesContent> = { en, es };
export const getContent = (locale: string): BlogPagesContent => selectContent(content, locale);
