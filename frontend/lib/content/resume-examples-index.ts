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

const fr: ResumeExamplesIndexContent = {
  meta: {
    title: 'Plus de 300 Exemples de CV par Métier (2026) | Best AI Resume',
    description: 'Parcourez plus de 300 exemples de CV gratuits organisés par secteur et métier. Modèles de CV professionnels avec conseils ATS. Trouvez votre poste et créez votre CV.',
  },
  hero: {
    badge: 'Exemples de CV 2026',
    title: 'Exemples de CV',
    titleHighlight: 'par Métier',
    subtitle: 'Parcourez {count}+ exemples de CV professionnels organisés par secteur. Trouvez votre poste, étudiez le format et créez le vôtre avec notre outil IA.',
  },
  bottomCta: {
    title: 'Vous ne trouvez pas votre métier ?',
    description: 'Notre IA peut rédiger un CV personnalisé pour N\'IMPORTE QUEL métier en quelques secondes.',
    ctaText: 'Générer un CV Personnalisé',
  },
};

const de: ResumeExamplesIndexContent = {
  meta: {
    title: 'Über 300 Lebenslauf-Beispiele nach Beruf (2026) | Best AI Resume',
    description: 'Durchsuchen Sie über 300 kostenlose Lebenslauf-Beispiele nach Branche und Beruf sortiert. Professionelle Lebenslauf-Vorlagen mit ATS-Tipps.',
  },
  hero: {
    badge: 'Lebenslauf-Beispiele 2026',
    title: 'Lebenslauf-Beispiele',
    titleHighlight: 'nach Beruf',
    subtitle: 'Durchsuchen Sie {count}+ professionelle Lebenslauf-Beispiele nach Branche sortiert. Finden Sie Ihren Beruf und erstellen Sie Ihren Lebenslauf mit unserem KI-Tool.',
  },
  bottomCta: {
    title: 'Beruf nicht gefunden?',
    description: 'Unsere KI kann einen individuellen Lebenslauf für JEDEN Beruf in Sekunden erstellen.',
    ctaText: 'Individuellen Lebenslauf erstellen',
  },
};

const ar: ResumeExamplesIndexContent = {
  meta: {
    title: 'أكثر من 300 نموذج سيرة ذاتية حسب المهنة (2026) | Best AI Resume',
    description: 'تصفح أكثر من 300 نموذج سيرة ذاتية مجاني مصنف حسب القطاع والمهنة. قوالب سيرة ذاتية احترافية مع نصائح ATS.',
  },
  hero: {
    badge: 'نماذج سيرة ذاتية 2026',
    title: 'نماذج سيرة ذاتية',
    titleHighlight: 'حسب المهنة',
    subtitle: 'تصفح {count}+ نموذج سيرة ذاتية احترافي مصنف حسب القطاع. اعثر على وظيفتك وأنشئ سيرتك الذاتية باستخدام أداة الذكاء الاصطناعي.',
  },
  bottomCta: {
    title: 'لم تجد مهنتك؟',
    description: 'يمكن للذكاء الاصطناعي كتابة سيرة ذاتية مخصصة لأي مهنة في ثوانٍ.',
    ctaText: 'إنشاء سيرة ذاتية مخصصة',
  },
};

const ja: ResumeExamplesIndexContent = {
  meta: {
    title: '職種別 履歴書サンプル 300以上（2026年版）| Best AI Resume',
    description: '業界・職種別に整理された300以上の無料履歴書サンプルを閲覧。ATS対応のプロフェッショナルな履歴書テンプレート付き。あなたの職種を見つけて履歴書を作成しましょう。',
  },
  hero: {
    badge: '履歴書サンプル 2026',
    title: '履歴書サンプル',
    titleHighlight: '職種別',
    subtitle: '{count}以上のプロフェッショナルな履歴書サンプルを業界別に閲覧。あなたの職種を見つけて、AIビルダーで履歴書を作成しましょう。',
  },
  bottomCta: {
    title: 'お探しの職種が見つかりませんか？',
    description: 'AIがあらゆる職種の履歴書を数秒で作成します。',
    ctaText: 'カスタム履歴書を生成',
  },
};

const content: Record<string, ResumeExamplesIndexContent> = { en, es, fr, de, ar, ja };
export const getContent = (locale: string): ResumeExamplesIndexContent => selectContent(content, locale);
