import { selectContent } from './types';

export interface ResumeExamplesIndexContent {
  meta: { title: string; description: string };
  hero: { badge: string; title: string; titleHighlight: string; subtitle: string };
  bottomCta: { title: string; description: string; ctaText: string };
}

const en: ResumeExamplesIndexContent = {
  meta: {
    title: 'Browse 300+ Resume Examples by Job Title (2026) | Best AI Resume',
    description: 'Browse 300+ free resume examples organized by industry and job title. Professional resume format templates with ATS-friendly tips. Find your role and build your resume.',
  },
  hero: {
    badge: 'Resume Examples 2026',
    title: 'Resume Examples',
    titleHighlight: 'by Job Title',
    subtitle: 'Browse {count}+ professional resume examples organized by industry. Find your role, study the resume format, and build yours with our AI builder.',
  },
  bottomCta: {
    title: "Don't see your job title?",
    description: 'Our AI can write a custom resume for ANY job title in seconds.',
    ctaText: 'Generate Custom Resume',
  },
};

const es: ResumeExamplesIndexContent = {
  meta: {
    title: 'Más de 300 Ejemplos de Currículum por Profesión (2026) | Best AI Resume',
    description: 'Explora más de 300 ejemplos de currículum vitae gratis organizados por industria y profesión. Plantillas de curriculum con formato profesional y consejos para sistemas ATS.',
  },
  hero: {
    badge: 'Ejemplos de Currículum 2026',
    title: 'Ejemplos de Currículum',
    titleHighlight: 'por Profesión',
    subtitle: 'Explora {count}+ ejemplos de currículum vitae profesional organizados por industria. Encuentra tu rol, estudia el formato y crea el tuyo con nuestro creador con IA.',
  },
  bottomCta: {
    title: '¿No encuentras tu profesión?',
    description: 'Nuestra IA puede crear un currículum personalizado para CUALQUIER profesión en segundos.',
    ctaText: 'Generar Currículum Personalizado',
  },
};

const content: Record<string, ResumeExamplesIndexContent> = { en, es };
export const getContent = (locale: string): ResumeExamplesIndexContent => selectContent(content, locale);
