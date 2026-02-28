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

const fr: TemplatesCategoryContent = {
  fallbackTitle: 'Modèles de CV | Best AI Resume',
  collectionSuffix: 'Collection',
  availableTemplates: 'Modèles Disponibles',
  editInAI: 'Modifier avec l\'IA',
  tiredTitle: 'Fatigué de mettre en forme des fichiers ?',
  tiredSubtitle: 'Télécharger des modèles c\'est bien, mais les remplir est fastidieux. Notre Créateur de CV IA fait la mise en forme pour vous instantanément.',
  buildWithAI: 'Créer avec l\'IA',
  breadcrumbHome: 'Accueil',
  breadcrumbTemplates: 'Modèles',
};

const de: TemplatesCategoryContent = {
  fallbackTitle: 'Lebenslauf-Vorlagen | Best AI Resume',
  collectionSuffix: 'Sammlung',
  availableTemplates: 'Verfügbare Vorlagen',
  editInAI: 'Mit KI bearbeiten',
  tiredTitle: 'Keine Lust mehr auf Formatierung?',
  tiredSubtitle: 'Vorlagen herunterladen ist gut, aber das Ausfüllen ist mühsam. Unser KI-Lebenslauf-Ersteller übernimmt die Formatierung sofort für Sie.',
  buildWithAI: 'Mit KI erstellen',
  breadcrumbHome: 'Startseite',
  breadcrumbTemplates: 'Vorlagen',
};

const ar: TemplatesCategoryContent = {
  fallbackTitle: 'قوالب سيرة ذاتية | Best AI Resume',
  collectionSuffix: 'مجموعة',
  availableTemplates: 'القوالب المتاحة',
  editInAI: 'تعديل بالذكاء الاصطناعي',
  tiredTitle: 'هل سئمت من تنسيق الملفات؟',
  tiredSubtitle: 'تحميل القوالب أمر جيد، لكن ملؤها متعب. منشئ السيرة الذاتية بالذكاء الاصطناعي يقوم بالتنسيق تلقائياً.',
  buildWithAI: 'إنشاء بالذكاء الاصطناعي',
  breadcrumbHome: 'الرئيسية',
  breadcrumbTemplates: 'القوالب',
};

const ja: TemplatesCategoryContent = {
  fallbackTitle: '履歴書テンプレート | Best AI Resume',
  collectionSuffix: 'コレクション',
  availableTemplates: '利用可能なテンプレート',
  editInAI: 'AIで編集',
  tiredTitle: 'ファイルの書式設定に疲れていませんか？',
  tiredSubtitle: 'テンプレートのダウンロードは便利ですが、中身を埋めるのは大変です。AI履歴書作成ツールなら、書式設定を瞬時に自動化します。',
  buildWithAI: 'AIで作成する',
  breadcrumbHome: 'ホーム',
  breadcrumbTemplates: 'テンプレート',
};

const it: TemplatesCategoryContent = {
  fallbackTitle: 'Modelli di Curriculum Vitae | Best AI Resume',
  collectionSuffix: 'Collezione',
  availableTemplates: 'Modelli Disponibili',
  editInAI: 'Modifica con IA',
  tiredTitle: 'Stanco di formattare documenti?',
  tiredSubtitle: 'Scaricare modelli è utile, ma compilarli è noioso. Il nostro Creatore di CV con IA si occupa della formattazione al posto tuo in un istante.',
  buildWithAI: 'Crea con l\'IA',
  breadcrumbHome: 'Home',
  breadcrumbTemplates: 'Modelli',
};

const contentMap: Record<string, TemplatesCategoryContent> = { en, es, fr, de, ar, ja, it };

export function getContent(locale: string) { return selectContent(contentMap, locale); }
