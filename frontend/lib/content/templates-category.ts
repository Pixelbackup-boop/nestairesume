import { selectContent } from './types';

export interface TemplatesCategoryContent {
  fallbackTitle: string;
  collectionSuffix: string;
  availableTemplates: string;
  editInAI: string;
  tiredTitle: string;
  tiredSubtitle: string;
  buildWithAI: string;
  breadcrumbHome: string;
  breadcrumbTemplates: string;
}

const en: TemplatesCategoryContent = {
  fallbackTitle: 'Resume Templates | Best AI Resume',
  collectionSuffix: 'Collection',
  availableTemplates: 'Available Templates',
  editInAI: 'Edit in AI',
  tiredTitle: 'Tired of formatting files?',
  tiredSubtitle: 'Downloading templates is great, but filling them out is a pain. Our AI Resume Builder does the formatting for you instantly.',
  buildWithAI: 'Build With AI Instead',
  breadcrumbHome: 'Home',
  breadcrumbTemplates: 'Templates',
};

const es: TemplatesCategoryContent = {
  fallbackTitle: 'Plantillas de Curr\u00edculum | Best AI Resume',
  collectionSuffix: 'Colecci\u00f3n',
  availableTemplates: 'Plantillas Disponibles',
  editInAI: 'Editar con IA',
  tiredTitle: '\u00bfCansado de formatear archivos?',
  tiredSubtitle: 'Descargar plantillas est\u00e1 bien, pero rellenarlas es tedioso. Nuestro Creador de Curr\u00edculum con IA hace el formato por ti al instante.',
  buildWithAI: 'Crear con IA',
  breadcrumbHome: 'Inicio',
  breadcrumbTemplates: 'Plantillas',
};

const contentMap: Record<string, TemplatesCategoryContent> = { en, es };

export function getContent(locale: string) { return selectContent(contentMap, locale); }
