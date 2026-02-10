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

const content: Record<string, CareerTipArticleContent> = { en, es };
export const getContent = (locale: string): CareerTipArticleContent => selectContent(content, locale);
