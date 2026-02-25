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

const fr: CoverLetterArticleContent = {
  breadcrumb: { home: 'Accueil', coverLetterExamples: 'Exemples de Lettre de Motivation' },
  notFound: 'Non Trouvé',
  coverLetterSuffix: 'Exemple de Lettre de Motivation',
  keySkillsTitle: 'Compétences Clés à Mettre en Avant',
  relatedTopics: 'Sujets Associés',
  faqTitle: 'Questions Fréquentes',
  relatedResourcesTitle: 'Ressources Associées',
  resumeExampleSubtext: 'Voir le format de CV correspondant',
  coverLetterGenerator: 'Générateur de Lettre de Motivation IA',
  coverLetterGeneratorSubtext: 'Créez votre lettre de motivation en quelques secondes',
  sidebar: {
    ctaTitle: 'Créez Votre Lettre de Motivation',
    ctaSubtitle: 'Utilisez notre IA pour générer une lettre de motivation personnalisée pour {jobTitle} en quelques secondes.',
    ctaButton: 'Générer une Lettre',
    tocTitle: 'Sommaire',
  },
  relatedCoverLetters: 'Lettres de Motivation Associées',
  bottomCta: {
    subtitle: 'Rejoignez des milliers de professionnels qui ont décroché le poste idéal avec Best AI Resume.',
    button: 'Générer une Lettre — Gratuit',
  },
  updated: 'Mis à jour',
};

const de: CoverLetterArticleContent = {
  breadcrumb: { home: 'Startseite', coverLetterExamples: 'Anschreiben-Beispiele' },
  notFound: 'Nicht Gefunden',
  coverLetterSuffix: 'Anschreiben-Beispiel',
  keySkillsTitle: 'Wichtige Fähigkeiten hervorheben',
  relatedTopics: 'Verwandte Themen',
  faqTitle: 'Häufig Gestellte Fragen',
  relatedResourcesTitle: 'Verwandte Ressourcen',
  resumeExampleSubtext: 'Passendes Lebenslauf-Format ansehen',
  coverLetterGenerator: 'KI-Anschreiben-Generator',
  coverLetterGeneratorSubtext: 'Erstellen Sie Ihr Anschreiben in Sekunden',
  sidebar: {
    ctaTitle: 'Anschreiben erstellen',
    ctaSubtitle: 'Nutzen Sie unsere KI, um ein personalisiertes Anschreiben für {jobTitle} in Sekunden zu erstellen.',
    ctaButton: 'Anschreiben generieren',
    tocTitle: 'Inhaltsverzeichnis',
  },
  relatedCoverLetters: 'Verwandte Anschreiben',
  bottomCta: {
    subtitle: 'Schließen Sie sich Tausenden von Fachleuten an, die mit Best AI Resume ihren Traumjob gefunden haben.',
    button: 'Anschreiben generieren — Kostenlos',
  },
  updated: 'Aktualisiert',
};

const ar: CoverLetterArticleContent = {
  breadcrumb: { home: 'الرئيسية', coverLetterExamples: 'نماذج خطاب التقديم' },
  notFound: 'غير موجود',
  coverLetterSuffix: 'نموذج خطاب تقديم',
  keySkillsTitle: 'المهارات الرئيسية للإبراز',
  relatedTopics: 'مواضيع ذات صلة',
  faqTitle: 'الأسئلة الشائعة',
  relatedResourcesTitle: 'موارد ذات صلة',
  resumeExampleSubtext: 'شاهد تنسيق السيرة الذاتية المطابق',
  coverLetterGenerator: 'منشئ خطاب التقديم بالذكاء الاصطناعي',
  coverLetterGeneratorSubtext: 'أنشئ خطاب التقديم في ثوانٍ',
  sidebar: {
    ctaTitle: 'أنشئ خطاب التقديم',
    ctaSubtitle: 'استخدم الذكاء الاصطناعي لإنشاء خطاب تقديم مخصص لـ {jobTitle} في ثوانٍ.',
    ctaButton: 'إنشاء خطاب تقديم',
    tocTitle: 'جدول المحتويات',
  },
  relatedCoverLetters: 'خطابات تقديم ذات صلة',
  bottomCta: {
    subtitle: 'انضم لآلاف المحترفين الذين حصلوا على وظيفة أحلامهم مع Best AI Resume.',
    button: 'إنشاء خطاب تقديم — مجاناً',
  },
  updated: 'تم التحديث',
};

const content: Record<string, CoverLetterArticleContent> = { en, es, fr, de, ar };
export const getContent = (locale: string): CoverLetterArticleContent => selectContent(content, locale);
