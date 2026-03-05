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

const vi: TemplatesCategoryContent = {
  fallbackTitle: 'Mẫu CV Xin Việc | Best AI Resume',
  collectionSuffix: 'Bộ Sưu Tập',
  availableTemplates: 'Mẫu CV Có Sẵn',
  editInAI: 'Chỉnh Sửa Bằng AI',
  tiredTitle: 'Mệt mỏi với việc định dạng CV?',
  tiredSubtitle: 'Tải mẫu CV về thì dễ, nhưng điền thông tin vào rất mất thời gian. Công cụ tạo CV bằng AI của chúng tôi định dạng tự động cho bạn ngay lập tức.',
  buildWithAI: 'Tạo CV Bằng AI',
  breadcrumbHome: 'Trang Chủ',
  breadcrumbTemplates: 'Mẫu CV',
};

const ko: TemplatesCategoryContent = {
  fallbackTitle: '이력서 템플릿 | Best AI Resume',
  collectionSuffix: '컬렉션',
  availableTemplates: '이력서 템플릿 모음',
  editInAI: 'AI로 편집',
  tiredTitle: '이력서 양식 맞추느라 지치셨나요?',
  tiredSubtitle: '이력서 템플릿을 다운로드하는 건 쉽지만, 직접 내용을 채우는 건 번거롭습니다. AI 이력서 작성 도구가 양식과 서식을 즉시 자동으로 완성해 드립니다.',
  buildWithAI: 'AI로 이력서 만들기',
  breadcrumbHome: '홈',
  breadcrumbTemplates: '이력서 템플릿',
};

const th: TemplatesCategoryContent = {
  fallbackTitle: 'เทมเพลตเรซูเม่ | Best AI Resume',
  collectionSuffix: 'คอลเลกชัน',
  availableTemplates: 'เทมเพลตที่ใช้งานได้',
  editInAI: 'แก้ไขด้วย AI',
  tiredTitle: 'เหนื่อยกับการจัดรูปแบบไฟล์ไหม?',
  tiredSubtitle: 'การดาวน์โหลดเทมเพลตเป็นเรื่องง่าย แต่การกรอกข้อมูลนั้นยุ่งยาก เครื่องมือสร้างเรซูเม่ด้วย AI ของเราจัดรูปแบบให้คุณโดยอัตโนมัติทันที',
  buildWithAI: 'สร้างด้วย AI แทน',
  breadcrumbHome: 'หน้าแรก',
  breadcrumbTemplates: 'เทมเพลต',
};

const pt: TemplatesCategoryContent = {
  fallbackTitle: 'Modelos de Curriculo | Best AI Resume',
  collectionSuffix: 'Colecao',
  availableTemplates: 'Modelos Disponiveis',
  editInAI: 'Editar com IA',
  tiredTitle: 'Cansado de formatar documentos?',
  tiredSubtitle: 'Baixar modelos e util, mas preenche-los e trabalhoso. Nosso Construtor de Curriculo com IA faz a formatacao por voce instantaneamente.',
  buildWithAI: 'Criar com IA',
  breadcrumbHome: 'Inicio',
  breadcrumbTemplates: 'Modelos',
};

const tr: TemplatesCategoryContent = {
  fallbackTitle: 'CV Şablonları | Best AI Resume',
  collectionSuffix: 'Koleksiyonu',
  availableTemplates: 'Mevcut Şablonlar',
  editInAI: 'AI ile Düzenle',
  tiredTitle: 'Belgeleri biçimlendirmekten sıkıldınız mı?',
  tiredSubtitle: 'Şablon indirmek kolaydır, ancak doldurmak zahmetlidir. AI CV Oluşturucumuz biçimlendirmeyi sizin için anında yapar.',
  buildWithAI: 'AI ile Oluştur',
  breadcrumbHome: 'Ana Sayfa',
  breadcrumbTemplates: 'Şablonlar',
};

const id: TemplatesCategoryContent = {
  fallbackTitle: 'Template CV | Best AI Resume',
  collectionSuffix: 'Koleksi',
  availableTemplates: 'Template Tersedia',
  editInAI: 'Edit dengan AI',
  tiredTitle: 'Bosan memformat dokumen?',
  tiredSubtitle: 'Mengunduh template mudah, tapi mengisinya memakan waktu. Pembuat CV AI kami melakukan pemformatan untuk Anda secara instan.',
  buildWithAI: 'Buat dengan AI',
  breadcrumbHome: 'Beranda',
  breadcrumbTemplates: 'Template',
};

const pl: TemplatesCategoryContent = {
  fallbackTitle: 'Szablony CV | Best AI Resume',
  collectionSuffix: 'Kolekcja',
  availableTemplates: 'Dostępne Szablony',
  editInAI: 'Edytuj z AI',
  tiredTitle: 'Zmęczony formatowaniem pliku?',
  tiredSubtitle: 'Pobieranie szablonów to dobry start, ale ich wypełnianie jest uciążliwe. Nasz Kreator CV z AI robi formatowanie za Ciebie natychmiast.',
  buildWithAI: 'Stwórz z AI',
  breadcrumbHome: 'Strona główna',
  breadcrumbTemplates: 'Szablony',
};

const nl: TemplatesCategoryContent = {
  fallbackTitle: 'CV-sjablonen | Best AI Resume',
  collectionSuffix: 'Collectie',
  availableTemplates: 'Beschikbare Sjablonen',
  editInAI: 'Bewerken met AI',
  tiredTitle: 'Moe van het opmaken van bestanden?',
  tiredSubtitle: 'Sjablonen downloaden is handig, maar invullen is een gedoe. Onze AI CV Maker doet de opmaak direct voor jou.',
  buildWithAI: 'Bouwen met AI',
  breadcrumbHome: 'Home',
  breadcrumbTemplates: 'Sjablonen',
};

const contentMap: Record<string, TemplatesCategoryContent> = { en, es, fr, de, ar, ja, it, vi, ko, th, pt, tr, id, pl, nl };

export function getContent(locale: string) { return selectContent(contentMap, locale); }
