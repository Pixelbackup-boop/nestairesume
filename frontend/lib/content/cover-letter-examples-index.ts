import { selectContent } from './types';

export interface CoverLetterExamplesIndexContent {
  meta: { title: string; description: string; keywords: string };
  hero: { badge: string; title: string; titleHighlight: string; subtitle: string; ctaBrowse: string; ctaCreate: string };
  stats: { examples: string; industries: string; free: string };
  tips: { title: string; items: { title: string; description: string }[] };
  grid: { title: string; examplesLabel: string; coverLetterSuffix: string; comingSoon: string; comingSoonCta: string };
  bottomCta: { title: string; description: string; ctaText: string };
  relatedResources: { title: string; items: { title: string; description: string }[] };
}

const en: CoverLetterExamplesIndexContent = {
  meta: {
    title: 'Cover Letter Examples by Job Title (2026) | Best AI Resume',
    description: 'Browse 100+ free cover letter examples organized by industry and job title. Professional cover letter templates with writing tips. Find your role and create your cover letter.',
    keywords: 'cover letter examples, cover letter template, professional cover letter, job cover letter, cover letter samples, cover letter format',
  },
  hero: {
    badge: 'Cover Letter Examples 2026',
    title: 'Cover Letter Examples',
    titleHighlight: 'by Job Title',
    subtitle: 'Browse {count}+ professional cover letter examples organized by industry. Find your role, study the format, and create yours with our AI builder.',
    ctaBrowse: 'Browse Examples',
    ctaCreate: 'Create Cover Letter with AI',
  },
  stats: {
    examples: 'Cover Letter Examples',
    industries: 'Industries Covered',
    free: 'To Use & Download',
  },
  tips: {
    title: 'What Makes a Great Cover Letter?',
    items: [
      { title: 'Personalization', description: 'Address the hiring manager by name and customize for each job. 77% of recruiters prefer personalized cover letters.' },
      { title: 'Specific Achievements', description: 'Include 1-2 quantified accomplishments that demonstrate your value. Numbers are more memorable than vague claims.' },
      { title: 'Concise Length', description: 'Keep it to 250-400 words. Hiring managers spend under 30 seconds reviewing cover letters — every word counts.' },
    ],
  },
  grid: {
    title: 'Browse by Industry',
    examplesLabel: 'examples',
    coverLetterSuffix: 'Cover Letter',
    comingSoon: 'Cover letter examples coming soon!',
    comingSoonCta: 'Create Cover Letter with AI',
  },
  bottomCta: {
    title: "Don't see your job title?",
    description: 'Our AI can write a custom cover letter for ANY job title in seconds.',
    ctaText: 'Generate Custom Cover Letter',
  },
  relatedResources: {
    title: 'Related Resources',
    items: [
      { title: 'Resume Examples', description: '300+ job-specific resume examples' },
      { title: 'Cover Letter Guide', description: 'Step-by-step writing tutorial' },
      { title: 'Resume Templates', description: 'Professional templates for any job' },
    ],
  },
};

const es: CoverLetterExamplesIndexContent = {
  meta: {
    title: 'Ejemplos de Carta de Presentación por Profesión (2026) | Best AI Resume',
    description: 'Explora más de 100 ejemplos de carta de presentación gratis organizados por industria y profesión. Plantillas de carta de presentación profesional con consejos de redacción.',
    keywords: 'ejemplos carta de presentación, plantilla carta de presentación, carta de presentación profesional, modelo carta de presentación, ejemplos carta de motivación',
  },
  hero: {
    badge: 'Ejemplos de Carta de Presentación 2026',
    title: 'Ejemplos de Carta de Presentación',
    titleHighlight: 'por Profesión',
    subtitle: 'Explora {count}+ ejemplos de carta de presentación profesional organizados por industria. Encuentra tu profesión, estudia el formato y crea la tuya con nuestro creador con IA.',
    ctaBrowse: 'Ver Ejemplos',
    ctaCreate: 'Crear Carta de Presentación con IA',
  },
  stats: {
    examples: 'Ejemplos de Carta',
    industries: 'Industrias Cubiertas',
    free: 'Gratis para Usar',
  },
  tips: {
    title: '¿Qué hace una buena carta de presentación?',
    items: [
      { title: 'Personalización', description: 'Dirígete al responsable de selección por nombre y personaliza cada carta para el puesto. El 77% de los reclutadores prefieren cartas personalizadas.' },
      { title: 'Logros Específicos', description: 'Incluye 1-2 logros cuantificados que demuestren tu valor. Los números son más memorables que las afirmaciones vagas.' },
      { title: 'Extensión Concisa', description: 'Mantén entre 250-400 palabras. Los reclutadores dedican menos de 30 segundos a revisar una carta — cada palabra cuenta.' },
    ],
  },
  grid: {
    title: 'Explorar por Industria',
    examplesLabel: 'ejemplos',
    coverLetterSuffix: 'Carta de Presentación',
    comingSoon: '¡Ejemplos de carta de presentación próximamente!',
    comingSoonCta: 'Crear Carta de Presentación con IA',
  },
  bottomCta: {
    title: '¿No encuentras tu profesión?',
    description: 'Nuestra IA puede escribir una carta de presentación personalizada para CUALQUIER profesión en segundos.',
    ctaText: 'Generar Carta Personalizada',
  },
  relatedResources: {
    title: 'Recursos Relacionados',
    items: [
      { title: 'Ejemplos de Currículum', description: 'Más de 300 ejemplos por profesión' },
      { title: 'Guía de Carta de Presentación', description: 'Tutorial paso a paso para redactarla' },
      { title: 'Plantillas de Currículum', description: 'Plantillas profesionales para cualquier empleo' },
    ],
  },
};

const content: Record<string, CoverLetterExamplesIndexContent> = { en, es };
export const getContent = (locale: string): CoverLetterExamplesIndexContent => selectContent(content, locale);
