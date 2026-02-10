import { selectContent } from './types';

export interface CoverLetterArticleContent {
  breadcrumb: { home: string; coverLetterExamples: string };
  notFound: string;
  coverLetterSuffix: string;
  keySkillsTitle: string;
  relatedTopics: string;
  faqTitle: string;
  relatedResourcesTitle: string;
  resumeExampleSubtext: string;
  coverLetterGenerator: string;
  coverLetterGeneratorSubtext: string;
  sidebar: {
    ctaTitle: string;
    ctaSubtitle: string;
    ctaButton: string;
    tocTitle: string;
  };
  relatedCoverLetters: string;
  bottomCta: {
    subtitle: string;
    button: string;
  };
  updated: string;
}

const en: CoverLetterArticleContent = {
  breadcrumb: { home: 'Home', coverLetterExamples: 'Cover Letter Examples' },
  notFound: 'Not Found',
  coverLetterSuffix: 'Cover Letter Example',
  keySkillsTitle: 'Key Skills to Highlight',
  relatedTopics: 'Related Topics',
  faqTitle: 'Frequently Asked Questions',
  relatedResourcesTitle: 'Related Resources',
  resumeExampleSubtext: 'See the matching resume format',
  coverLetterGenerator: 'AI Cover Letter Generator',
  coverLetterGeneratorSubtext: 'Create your cover letter in seconds',
  sidebar: {
    ctaTitle: 'Create Your Cover Letter',
    ctaSubtitle: 'Use our AI to generate a personalized {jobTitle} cover letter in seconds.',
    ctaButton: 'Generate Cover Letter',
    tocTitle: 'Table of Contents',
  },
  relatedCoverLetters: 'Related Cover Letters',
  bottomCta: {
    subtitle: 'Join thousands of professionals who landed their dream jobs with Best AI Resume.',
    button: 'Generate Cover Letter — Free',
  },
  updated: 'Updated',
};

const es: CoverLetterArticleContent = {
  breadcrumb: { home: 'Inicio', coverLetterExamples: 'Ejemplos de Carta de Presentación' },
  notFound: 'No Encontrado',
  coverLetterSuffix: 'Ejemplo de Carta de Presentación',
  keySkillsTitle: 'Habilidades Clave a Destacar',
  relatedTopics: 'Temas Relacionados',
  faqTitle: 'Preguntas Frecuentes',
  relatedResourcesTitle: 'Recursos Relacionados',
  resumeExampleSubtext: 'Ver el formato de currículum correspondiente',
  coverLetterGenerator: 'Generador de Carta de Presentación con IA',
  coverLetterGeneratorSubtext: 'Crea tu carta de presentación en segundos',
  sidebar: {
    ctaTitle: 'Crea Tu Carta de Presentación',
    ctaSubtitle: 'Usa nuestra IA para generar una carta de presentación personalizada para {jobTitle} en segundos.',
    ctaButton: 'Generar Carta de Presentación',
    tocTitle: 'Tabla de Contenidos',
  },
  relatedCoverLetters: 'Cartas de Presentación Relacionadas',
  bottomCta: {
    subtitle: 'Únete a miles de profesionales que consiguieron el trabajo de sus sueños con Best AI Resume.',
    button: 'Generar Carta — Gratis',
  },
  updated: 'Actualizado',
};

const content: Record<string, CoverLetterArticleContent> = { en, es };
export const getContent = (locale: string): CoverLetterArticleContent => selectContent(content, locale);
