import { selectContent } from './types';

export interface ResumeArticleContent {
  breadcrumb: { home: string; resumeExamples: string };
  notFound: string;
  resumeSuffix: string;
  posted: string;
  keySkillsTitle: string;
  relatedTopics: string;
  faqTitle: string;
  resourcesTitle: string;
  resources: {
    atsResume: { title: string; subtitle: string };
    mistakes: { title: string; subtitle: string };
    format: { title: string; subtitle: string };
    interview: { title: string; subtitle: string };
  };
  resourcesCta: {
    intro: string;
    resumeBuilder: string;
    middle: string;
    templates: string;
    end: string;
    examples: string;
    period: string;
  };
  sidebar: {
    quickStats: string;
    avgSalary: string;
    jobGrowth: string;
    industry: string;
    buildCta: string;
    tocTitle: string;
  };
  relatedJobs: string;
  bottomCta: {
    title: string;
    subtitle: string;
    button: string;
  };
}

const en: ResumeArticleContent = {
  breadcrumb: { home: 'Home', resumeExamples: 'Resume Examples' },
  notFound: 'Not Found',
  resumeSuffix: 'Resume',
  posted: 'Posted',
  keySkillsTitle: 'Key Skills for {jobTitle}',
  relatedTopics: 'Related Topics',
  faqTitle: 'Frequently Asked Questions',
  resourcesTitle: 'Resume Resources',
  resources: {
    atsResume: { title: 'How to Write an ATS-Friendly Resume', subtitle: 'Beat applicant tracking systems' },
    mistakes: { title: 'Top Resume Mistakes to Avoid', subtitle: 'Common errors that cost you interviews' },
    format: { title: 'Resume Format Guide 2026', subtitle: 'Chronological, functional & combination' },
    interview: { title: 'Interview Preparation Guide', subtitle: 'Ace your next job interview' },
  },
  resourcesCta: {
    intro: 'Ready to create your {jobTitle} resume? Use our',
    resumeBuilder: 'AI Resume Builder',
    middle: 'to generate an ATS-optimized resume in minutes. Browse',
    templates: 'free resume templates',
    end: 'or explore more',
    examples: 'resume examples',
    period: '.',
  },
  sidebar: {
    quickStats: 'Quick Stats',
    avgSalary: 'Avg. Salary',
    jobGrowth: 'Job Growth',
    industry: 'Industry',
    buildCta: 'Build My {jobTitle} Resume',
    tocTitle: 'Table of Contents',
  },
  relatedJobs: 'Related Jobs',
  bottomCta: {
    title: 'Build Your {jobTitle} Resume Now',
    subtitle: 'Join thousands of professionals who landed their dream jobs with Best AI Resume.',
    button: 'Create My Resume — Free',
  },
};

const es: ResumeArticleContent = {
  breadcrumb: { home: 'Inicio', resumeExamples: 'Ejemplos de Currículum' },
  notFound: 'No Encontrado',
  resumeSuffix: 'Currículum',
  posted: 'Publicado',
  keySkillsTitle: 'Habilidades Clave para {jobTitle}',
  relatedTopics: 'Temas Relacionados',
  faqTitle: 'Preguntas Frecuentes',
  resourcesTitle: 'Recursos para tu Currículum',
  resources: {
    atsResume: { title: 'Cómo Escribir un Currículum Compatible con ATS', subtitle: 'Supera los sistemas de seguimiento de candidatos' },
    mistakes: { title: 'Principales Errores en el Currículum a Evitar', subtitle: 'Errores comunes que te cuestan entrevistas' },
    format: { title: 'Guía de Formato de Currículum 2026', subtitle: 'Cronológico, funcional y combinado' },
    interview: { title: 'Guía de Preparación para Entrevistas', subtitle: 'Triunfa en tu próxima entrevista de trabajo' },
  },
  resourcesCta: {
    intro: '¿Listo para crear tu currículum de {jobTitle}? Usa nuestro',
    resumeBuilder: 'Creador de Currículum con IA',
    middle: 'para generar un currículum optimizado para ATS en minutos. Explora',
    templates: 'plantillas de currículum gratis',
    end: 'o descubre más',
    examples: 'ejemplos de currículum',
    period: '.',
  },
  sidebar: {
    quickStats: 'Datos Rápidos',
    avgSalary: 'Salario Medio',
    jobGrowth: 'Crecimiento Laboral',
    industry: 'Industria',
    buildCta: 'Crear Mi Currículum de {jobTitle}',
    tocTitle: 'Tabla de Contenidos',
  },
  relatedJobs: 'Empleos Relacionados',
  bottomCta: {
    title: 'Crea Tu Currículum de {jobTitle} Ahora',
    subtitle: 'Únete a miles de profesionales que consiguieron el trabajo de sus sueños con Best AI Resume.',
    button: 'Crear Mi Currículum — Gratis',
  },
};

const pt: ResumeArticleContent = {
  breadcrumb: { home: 'Início', resumeExamples: 'Exemplos de Currículo' },
  notFound: 'Não Encontrado',
  resumeSuffix: 'Currículo',
  posted: 'Publicado',
  keySkillsTitle: 'Habilidades Essenciais para {jobTitle}',
  relatedTopics: 'Tópicos Relacionados',
  faqTitle: 'Perguntas Frequentes',
  resourcesTitle: 'Recursos de Currículo',
  resources: {
    atsResume: { title: 'Como Escrever um Currículo Compatível com ATS', subtitle: 'Supere os sistemas de rastreamento de candidatos' },
    mistakes: { title: 'Principais Erros de Currículo a Evitar', subtitle: 'Erros comuns que custam entrevistas' },
    format: { title: 'Guia de Formato de Currículo 2026', subtitle: 'Cronológico, funcional e combinado' },
    interview: { title: 'Guia de Preparação para Entrevistas', subtitle: 'Domine sua próxima entrevista de emprego' },
  },
  resourcesCta: {
    intro: 'Pronto para criar seu currículo de {jobTitle}? Use nosso',
    resumeBuilder: 'Construtor de Currículo com IA',
    middle: 'para gerar um currículo otimizado para ATS em minutos. Explore',
    templates: 'modelos de currículo gratuitos',
    end: 'ou veja mais',
    examples: 'exemplos de currículo',
    period: '.',
  },
  sidebar: {
    quickStats: 'Dados Rápidos',
    avgSalary: 'Salário Médio',
    jobGrowth: 'Crescimento do Emprego',
    industry: 'Setor',
    buildCta: 'Criar Meu Currículo de {jobTitle}',
    tocTitle: 'Índice',
  },
  relatedJobs: 'Empregos Relacionados',
  bottomCta: {
    title: 'Crie Seu Currículo de {jobTitle} Agora',
    subtitle: 'Junte-se a milhares de profissionais que conquistaram seus empregos dos sonhos com o Best AI Resume.',
    button: 'Criar Meu Currículo — Grátis',
  },
};

const fr: ResumeArticleContent = {
  breadcrumb: { home: 'Accueil', resumeExamples: 'Exemples de CV' },
  notFound: 'Non Trouvé',
  resumeSuffix: 'CV',
  posted: 'Publié',
  keySkillsTitle: 'Compétences Clés pour {jobTitle}',
  relatedTopics: 'Sujets Connexes',
  faqTitle: 'Questions Fréquentes',
  resourcesTitle: 'Ressources CV',
  resources: {
    atsResume: { title: 'Comment Rédiger un CV Compatible ATS', subtitle: 'Passez les systèmes de suivi des candidatures' },
    mistakes: { title: 'Principales Erreurs de CV à Éviter', subtitle: 'Erreurs courantes qui vous coûtent des entretiens' },
    format: { title: 'Guide des Formats de CV 2026', subtitle: 'Chronologique, fonctionnel et combiné' },
    interview: { title: "Guide de Préparation à l'Entretien", subtitle: 'Réussissez votre prochain entretien' },
  },
  resourcesCta: {
    intro: 'Prêt à créer votre CV de {jobTitle} ? Utilisez notre',
    resumeBuilder: 'Créateur de CV par IA',
    middle: 'pour générer un CV optimisé ATS en quelques minutes. Parcourez nos',
    templates: 'modèles de CV gratuits',
    end: 'ou explorez plus',
    examples: 'd’exemples de CV',
    period: '.',
  },
  sidebar: {
    quickStats: 'Statistiques Rapides',
    avgSalary: 'Salaire Moyen',
    jobGrowth: "Croissance de l'Emploi",
    industry: 'Secteur',
    buildCta: 'Créer Mon CV de {jobTitle}',
    tocTitle: 'Table des Matières',
  },
  relatedJobs: 'Emplois Connexes',
  bottomCta: {
    title: 'Créez Votre CV de {jobTitle} Maintenant',
    subtitle: "Rejoignez des milliers de professionnels qui ont décroché l'emploi de leurs rêves avec Best AI Resume.",
    button: 'Créer Mon CV — Gratuit',
  },
};

const de: ResumeArticleContent = {
  breadcrumb: { home: 'Startseite', resumeExamples: 'Lebenslauf-Beispiele' },
  notFound: 'Nicht Gefunden',
  resumeSuffix: 'Lebenslauf',
  posted: 'Veröffentlicht',
  keySkillsTitle: 'Wichtige Fähigkeiten für {jobTitle}',
  relatedTopics: 'Verwandte Themen',
  faqTitle: 'Häufig Gestellte Fragen',
  resourcesTitle: 'Lebenslauf-Ressourcen',
  resources: {
    atsResume: { title: 'Wie man einen ATS-freundlichen Lebenslauf schreibt', subtitle: 'Überzeugen Sie Bewerber-Tracking-Systeme' },
    mistakes: { title: 'Die häufigsten Lebenslauf-Fehler vermeiden', subtitle: 'Häufige Fehler, die Sie Interviews kosten' },
    format: { title: 'Lebenslauf-Format-Leitfaden 2026', subtitle: 'Chronologisch, funktional und kombiniert' },
    interview: { title: 'Leitfaden zur Vorstellungsgespräch-Vorbereitung', subtitle: 'Meistern Sie Ihr nächstes Vorstellungsgespräch' },
  },
  resourcesCta: {
    intro: 'Bereit, Ihren {jobTitle}-Lebenslauf zu erstellen? Nutzen Sie unseren',
    resumeBuilder: 'KI-Lebenslauf-Builder',
    middle: 'um in Minuten einen ATS-optimierten Lebenslauf zu erstellen. Durchsuchen Sie',
    templates: 'kostenlose Lebenslauf-Vorlagen',
    end: 'oder entdecken Sie weitere',
    examples: 'Lebenslauf-Beispiele',
    period: '.',
  },
  sidebar: {
    quickStats: 'Schnellstatistik',
    avgSalary: 'Durchschnittsgehalt',
    jobGrowth: 'Stellenwachstum',
    industry: 'Branche',
    buildCta: 'Meinen {jobTitle}-Lebenslauf Erstellen',
    tocTitle: 'Inhaltsverzeichnis',
  },
  relatedJobs: 'Verwandte Berufe',
  bottomCta: {
    title: 'Erstellen Sie jetzt Ihren {jobTitle}-Lebenslauf',
    subtitle: 'Schließen Sie sich Tausenden von Fachleuten an, die mit Best AI Resume ihren Traumjob gefunden haben.',
    button: 'Meinen Lebenslauf erstellen — Kostenlos',
  },
};

const content: Record<string, ResumeArticleContent> = { en, es, fr, de, pt };
export const getContent = (locale: string): ResumeArticleContent => selectContent(content, locale);
