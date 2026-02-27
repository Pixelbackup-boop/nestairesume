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

const fr: CoverLetterExamplesIndexContent = {
  meta: {
    title: 'Exemples de Lettre de Motivation par Métier (2026) | Best AI Resume',
    description: 'Parcourez plus de 100 exemples de lettre de motivation gratuits organisés par secteur et métier. Modèles professionnels avec conseils de rédaction.',
    keywords: 'exemples lettre de motivation, modèle lettre de motivation, lettre de motivation professionnelle, lettre de candidature, format lettre de motivation',
  },
  hero: {
    badge: 'Exemples de Lettres 2026',
    title: 'Exemples de Lettre de Motivation',
    titleHighlight: 'par Métier',
    subtitle: 'Parcourez {count}+ exemples de lettre de motivation professionnels organisés par secteur. Trouvez votre métier et créez la vôtre avec notre outil IA.',
    ctaBrowse: 'Voir les Exemples',
    ctaCreate: 'Créer une Lettre avec l\'IA',
  },
  stats: {
    examples: 'Exemples de Lettres',
    industries: 'Secteurs Couverts',
    free: 'Gratuit à Utiliser',
  },
  tips: {
    title: 'Qu\'est-ce qui fait une bonne lettre de motivation ?',
    items: [
      { title: 'Personnalisation', description: 'Adressez-vous au responsable du recrutement par son nom et personnalisez chaque lettre. 77% des recruteurs préfèrent les lettres personnalisées.' },
      { title: 'Réalisations Concrètes', description: 'Incluez 1 à 2 réalisations chiffrées qui démontrent votre valeur. Les chiffres sont plus mémorables que les affirmations vagues.' },
      { title: 'Longueur Concise', description: 'Restez entre 250 et 400 mots. Les recruteurs passent moins de 30 secondes sur une lettre — chaque mot compte.' },
    ],
  },
  grid: {
    title: 'Parcourir par Secteur',
    examplesLabel: 'exemples',
    coverLetterSuffix: 'Lettre de Motivation',
    comingSoon: 'Exemples de lettres bientôt disponibles !',
    comingSoonCta: 'Créer une Lettre avec l\'IA',
  },
  bottomCta: {
    title: 'Vous ne trouvez pas votre métier ?',
    description: 'Notre IA peut rédiger une lettre de motivation personnalisée pour N\'IMPORTE QUEL métier en quelques secondes.',
    ctaText: 'Générer une Lettre Personnalisée',
  },
  relatedResources: {
    title: 'Ressources Associées',
    items: [
      { title: 'Exemples de CV', description: 'Plus de 300 exemples par métier' },
      { title: 'Guide Lettre de Motivation', description: 'Tutoriel de rédaction étape par étape' },
      { title: 'Modèles de CV', description: 'Modèles professionnels pour tout emploi' },
    ],
  },
};

const de: CoverLetterExamplesIndexContent = {
  meta: {
    title: 'Anschreiben-Beispiele nach Beruf (2026) | Best AI Resume',
    description: 'Durchsuchen Sie über 100 kostenlose Anschreiben-Beispiele nach Branche und Beruf sortiert. Professionelle Bewerbungsvorlagen mit Schreibtipps.',
    keywords: 'Anschreiben Beispiele, Bewerbungsschreiben Vorlage, professionelles Anschreiben, Bewerbungsanschreiben, Anschreiben Muster',
  },
  hero: {
    badge: 'Anschreiben-Beispiele 2026',
    title: 'Anschreiben-Beispiele',
    titleHighlight: 'nach Beruf',
    subtitle: 'Durchsuchen Sie {count}+ professionelle Anschreiben-Beispiele nach Branche sortiert. Finden Sie Ihren Beruf und erstellen Sie Ihr Anschreiben mit unserem KI-Tool.',
    ctaBrowse: 'Beispiele ansehen',
    ctaCreate: 'Anschreiben mit KI erstellen',
  },
  stats: {
    examples: 'Anschreiben-Beispiele',
    industries: 'Branchen abgedeckt',
    free: 'Kostenlos nutzbar',
  },
  tips: {
    title: 'Was macht ein gutes Anschreiben aus?',
    items: [
      { title: 'Personalisierung', description: 'Sprechen Sie den Personalverantwortlichen namentlich an und passen Sie jedes Anschreiben individuell an. 77% der Recruiter bevorzugen personalisierte Anschreiben.' },
      { title: 'Konkrete Erfolge', description: 'Nennen Sie 1-2 quantifizierte Erfolge, die Ihren Mehrwert belegen. Zahlen sind einprägsamer als vage Behauptungen.' },
      { title: 'Prägnante Länge', description: 'Halten Sie 250-400 Wörter ein. Personalverantwortliche verbringen weniger als 30 Sekunden mit einem Anschreiben — jedes Wort zählt.' },
    ],
  },
  grid: {
    title: 'Nach Branche durchsuchen',
    examplesLabel: 'Beispiele',
    coverLetterSuffix: 'Anschreiben',
    comingSoon: 'Anschreiben-Beispiele kommen bald!',
    comingSoonCta: 'Anschreiben mit KI erstellen',
  },
  bottomCta: {
    title: 'Beruf nicht gefunden?',
    description: 'Unsere KI kann ein individuelles Anschreiben für JEDEN Beruf in Sekunden erstellen.',
    ctaText: 'Individuelles Anschreiben erstellen',
  },
  relatedResources: {
    title: 'Verwandte Ressourcen',
    items: [
      { title: 'Lebenslauf-Beispiele', description: 'Über 300 berufsspezifische Beispiele' },
      { title: 'Anschreiben-Leitfaden', description: 'Schritt-für-Schritt-Anleitung' },
      { title: 'Lebenslauf-Vorlagen', description: 'Professionelle Vorlagen für jeden Beruf' },
    ],
  },
};

const ar: CoverLetterExamplesIndexContent = {
  meta: {
    title: 'نماذج خطاب تقديم حسب المهنة (2026) | Best AI Resume',
    description: 'تصفح أكثر من 100 نموذج خطاب تقديم مجاني مصنف حسب القطاع والمهنة. قوالب احترافية مع نصائح كتابة.',
    keywords: 'نماذج خطاب تقديم, نموذج خطاب تقديم, خطاب تقديم احترافي, رسالة تقديم وظيفية, نماذج رسالة تحفيزية',
  },
  hero: {
    badge: 'نماذج خطابات 2026',
    title: 'نماذج خطاب تقديم',
    titleHighlight: 'حسب المهنة',
    subtitle: 'تصفح {count}+ نموذج خطاب تقديم احترافي مصنف حسب القطاع. اعثر على مهنتك وأنشئ خطابك باستخدام أداة الذكاء الاصطناعي.',
    ctaBrowse: 'تصفح النماذج',
    ctaCreate: 'إنشاء خطاب بالذكاء الاصطناعي',
  },
  stats: {
    examples: 'نماذج خطابات',
    industries: 'قطاعات مغطاة',
    free: 'مجاني للاستخدام',
  },
  tips: {
    title: 'ما الذي يجعل خطاب التقديم مميزاً؟',
    items: [
      { title: 'التخصيص', description: 'خاطب مسؤول التوظيف بالاسم وخصص كل خطاب. 77% من مسؤولي التوظيف يفضلون الخطابات المخصصة.' },
      { title: 'إنجازات محددة', description: 'أدرج 1-2 إنجازات مقاسة تثبت قيمتك. الأرقام أكثر تأثيراً من الادعاءات العامة.' },
      { title: 'الإيجاز', description: 'التزم بـ 250-400 كلمة. يقضي مسؤولو التوظيف أقل من 30 ثانية في مراجعة الخطاب — كل كلمة مهمة.' },
    ],
  },
  grid: {
    title: 'تصفح حسب القطاع',
    examplesLabel: 'نماذج',
    coverLetterSuffix: 'خطاب تقديم',
    comingSoon: 'نماذج خطابات التقديم قادمة قريباً!',
    comingSoonCta: 'إنشاء خطاب بالذكاء الاصطناعي',
  },
  bottomCta: {
    title: 'لم تجد مهنتك؟',
    description: 'يمكن للذكاء الاصطناعي كتابة خطاب تقديم مخصص لأي مهنة في ثوانٍ.',
    ctaText: 'إنشاء خطاب مخصص',
  },
  relatedResources: {
    title: 'موارد ذات صلة',
    items: [
      { title: 'نماذج سيرة ذاتية', description: 'أكثر من 300 نموذج حسب المهنة' },
      { title: 'دليل خطاب التقديم', description: 'شرح خطوة بخطوة' },
      { title: 'قوالب سيرة ذاتية', description: 'قوالب احترافية لأي وظيفة' },
    ],
  },
};

const ja: CoverLetterExamplesIndexContent = {
  meta: {
    title: '職種別カバーレター例文集（2026年版）| Best AI Resume',
    description: '業界・職種別に整理された100以上の無料カバーレター例文を閲覧。プロフェッショナルなカバーレターテンプレートと書き方のコツ付き。',
    keywords: 'カバーレター 例文, カバーレター テンプレート, 志望動機書, カバーレター 書き方, 送付状 例文, 添え状 テンプレート',
  },
  hero: {
    badge: 'カバーレター例文 2026',
    title: 'カバーレター例文',
    titleHighlight: '職種別',
    subtitle: '{count}以上のプロフェッショナルなカバーレター例文を業界別に閲覧。あなたの職種を見つけて、AIビルダーでカバーレターを作成しましょう。',
    ctaBrowse: '例文を見る',
    ctaCreate: 'AIでカバーレターを作成',
  },
  stats: {
    examples: 'カバーレター例文',
    industries: '対応業界数',
    free: '無料で利用可能',
  },
  tips: {
    title: '効果的なカバーレターとは？',
    items: [
      { title: '個別化', description: '採用担当者の名前を宛名に書き、応募先ごとに内容をカスタマイズしましょう。採用担当者の77%がパーソナライズされたカバーレターを好みます。' },
      { title: '具体的な実績', description: '自分の価値を示す1〜2つの定量的な成果を含めましょう。数字は曖昧な主張より記憶に残ります。' },
      { title: '簡潔な長さ', description: '250〜400文字（日本語）を目安に。採用担当者がカバーレターに目を通す時間は30秒未満です。' },
    ],
  },
  grid: {
    title: '業界別に探す',
    examplesLabel: '件の例文',
    coverLetterSuffix: 'カバーレター',
    comingSoon: 'カバーレター例文は近日公開予定です！',
    comingSoonCta: 'AIでカバーレターを作成',
  },
  bottomCta: {
    title: 'お探しの職種が見つかりませんか？',
    description: 'AIがあらゆる職種のカバーレターを数秒で作成します。',
    ctaText: 'カスタムカバーレターを生成',
  },
  relatedResources: {
    title: '関連リソース',
    items: [
      { title: '履歴書サンプル', description: '300以上の職種別履歴書サンプル' },
      { title: 'カバーレターガイド', description: 'ステップバイステップの書き方解説' },
      { title: '履歴書テンプレート', description: 'あらゆる職種に対応したプロ仕様のテンプレート' },
    ],
  },
};

const content: Record<string, CoverLetterExamplesIndexContent> = { en, es, fr, de, ar, ja };
export const getContent = (locale: string): CoverLetterExamplesIndexContent => selectContent(content, locale);
