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

const contentMap: Record<string, CareerPagesContent> = { en, es };

export function getCareerListingContent(locale: string) { return selectContent(contentMap, locale).listing; }
export function getCareerArticleContent(locale: string) { return selectContent(contentMap, locale).article; }
