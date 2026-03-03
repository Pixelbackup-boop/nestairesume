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

const ja: CoverLetterArticleContent = {
  breadcrumb: { home: 'ホーム', coverLetterExamples: 'カバーレター例文' },
  notFound: '見つかりません',
  coverLetterSuffix: 'カバーレター例文',
  keySkillsTitle: 'アピールすべきスキル',
  relatedTopics: '関連トピック',
  faqTitle: 'よくある質問',
  relatedResourcesTitle: '関連リソース',
  resumeExampleSubtext: '対応する履歴書フォーマットを見る',
  coverLetterGenerator: 'AIカバーレター生成ツール',
  coverLetterGeneratorSubtext: '数秒でカバーレターを作成',
  sidebar: {
    ctaTitle: 'カバーレターを作成',
    ctaSubtitle: 'AIを使って{jobTitle}向けのカバーレターを数秒で生成。',
    ctaButton: 'カバーレターを生成',
    tocTitle: '目次',
  },
  relatedCoverLetters: '関連するカバーレター',
  bottomCta: {
    subtitle: 'Best AI Resumeで理想の仕事を見つけた数万人のプロフェッショナルに加わりましょう。',
    button: 'カバーレターを無料で生成',
  },
  updated: '更新日',
};

const it: CoverLetterArticleContent = {
  breadcrumb: { home: 'Home', coverLetterExamples: 'Esempi di Lettera di Presentazione' },
  notFound: 'Non Trovato',
  coverLetterSuffix: 'Esempio di Lettera di Presentazione',
  keySkillsTitle: 'Competenze Chiave da Evidenziare',
  relatedTopics: 'Argomenti Correlati',
  faqTitle: 'Domande Frequenti',
  relatedResourcesTitle: 'Risorse Correlate',
  resumeExampleSubtext: 'Consulta il formato di CV corrispondente',
  coverLetterGenerator: 'Generatore di Lettere di Presentazione con IA',
  coverLetterGeneratorSubtext: 'Crea la tua lettera di presentazione in pochi secondi',
  sidebar: {
    ctaTitle: 'Crea la Tua Lettera di Presentazione',
    ctaSubtitle: 'Usa la nostra IA per generare una lettera di presentazione personalizzata per {jobTitle} in pochi secondi.',
    ctaButton: 'Genera Lettera di Presentazione',
    tocTitle: 'Indice',
  },
  relatedCoverLetters: 'Lettere di Presentazione Correlate',
  bottomCta: {
    subtitle: 'Unisciti a migliaia di professionisti che hanno trovato il lavoro dei loro sogni con Best AI Resume.',
    button: 'Genera Lettera di Presentazione — Gratis',
  },
  updated: 'Aggiornato',
};

const th: CoverLetterArticleContent = {
  breadcrumb: { home: 'หน้าแรก', coverLetterExamples: 'ตัวอย่างจดหมายสมัครงาน' },
  notFound: 'ไม่พบ',
  coverLetterSuffix: 'ตัวอย่างจดหมายสมัครงาน',
  keySkillsTitle: 'ทักษะสำคัญที่ควรเน้น',
  relatedTopics: 'หัวข้อที่เกี่ยวข้อง',
  faqTitle: 'คำถามที่พบบ่อย',
  relatedResourcesTitle: 'แหล่งข้อมูลที่เกี่ยวข้อง',
  resumeExampleSubtext: 'ดูรูปแบบเรซูเม่ที่ตรงกัน',
  coverLetterGenerator: 'เครื่องมือสร้างจดหมายสมัครงาน AI',
  coverLetterGeneratorSubtext: 'สร้างจดหมายสมัครงานของคุณในไม่กี่วินาที',
  sidebar: {
    ctaTitle: 'สร้างจดหมายสมัครงานของคุณ',
    ctaSubtitle: 'ใช้ AI ของเราสร้างจดหมายสมัครงานสำหรับตำแหน่ง {jobTitle} แบบเฉพาะบุคคลในไม่กี่วินาที',
    ctaButton: 'สร้างจดหมายสมัครงาน',
    tocTitle: 'สารบัญ',
  },
  relatedCoverLetters: 'จดหมายสมัครงานที่เกี่ยวข้อง',
  bottomCta: {
    subtitle: 'ร่วมกับมืออาชีพหลายพันคนที่ได้งานในฝันด้วย Best AI Resume',
    button: 'สร้างจดหมายสมัครงาน — ฟรี',
  },
  updated: 'อัปเดต',
};

const pt: CoverLetterArticleContent = {
  breadcrumb: { home: 'Inicio', coverLetterExamples: 'Exemplos de Carta de Apresentacao' },
  notFound: 'Nao Encontrado',
  coverLetterSuffix: 'Exemplo de Carta de Apresentacao',
  keySkillsTitle: 'Habilidades-Chave a Destacar',
  relatedTopics: 'Topicos Relacionados',
  faqTitle: 'Perguntas Frequentes',
  relatedResourcesTitle: 'Recursos Relacionados',
  resumeExampleSubtext: 'Confira o formato de curriculo correspondente',
  coverLetterGenerator: 'Gerador de Carta de Apresentacao com IA',
  coverLetterGeneratorSubtext: 'Crie sua carta de apresentacao em segundos',
  sidebar: {
    ctaTitle: 'Crie Sua Carta de Apresentacao',
    ctaSubtitle: 'Use nossa IA para gerar uma carta de apresentacao personalizada para {jobTitle} em segundos.',
    ctaButton: 'Gerar Carta de Apresentacao',
    tocTitle: 'Indice',
  },
  relatedCoverLetters: 'Cartas de Apresentacao Relacionadas',
  bottomCta: {
    subtitle: 'Junte-se a milhares de profissionais que encontraram o emprego dos sonhos com a Best AI Resume.',
    button: 'Gerar Carta de Apresentacao — Gratis',
  },
  updated: 'Atualizado',
};

const tr: CoverLetterArticleContent = {
  breadcrumb: { home: 'Ana Sayfa', coverLetterExamples: 'Ön Yazı Örnekleri' },
  notFound: 'Bulunamadı',
  coverLetterSuffix: 'Ön Yazı Örneği',
  keySkillsTitle: 'Öne Çıkarılacak Temel Beceriler',
  relatedTopics: 'İlgili Konular',
  faqTitle: 'Sık Sorulan Sorular',
  relatedResourcesTitle: 'İlgili Kaynaklar',
  resumeExampleSubtext: 'Eşleşen CV formatını inceleyin',
  coverLetterGenerator: 'AI Ön Yazı Oluşturucu',
  coverLetterGeneratorSubtext: 'Ön yazınızı saniyeler içinde oluşturun',
  sidebar: {
    ctaTitle: 'Ön Yazınızı Oluşturun',
    ctaSubtitle: 'AI\'mızı kullanarak {jobTitle} pozisyonu için kişiselleştirilmiş ön yazınızı saniyeler içinde oluşturun.',
    ctaButton: 'Ön Yazı Oluştur',
    tocTitle: 'İçindekiler',
  },
  relatedCoverLetters: 'İlgili Ön Yazılar',
  bottomCta: {
    subtitle: 'Best AI Resume ile hayallerindeki işi bulan binlerce profesyonele katılın.',
    button: 'Ön Yazı Oluştur — Ücretsiz',
  },
  updated: 'Güncellendi',
};

const vi: CoverLetterArticleContent = {
  breadcrumb: { home: 'Trang Chủ', coverLetterExamples: 'Mẫu Thư Xin Việc' },
  notFound: 'Không Tìm Thấy',
  coverLetterSuffix: 'Mẫu Thư Xin Việc',
  keySkillsTitle: 'Kỹ Năng Chính Cần Làm Nổi Bật',
  relatedTopics: 'Chủ Đề Liên Quan',
  faqTitle: 'Câu Hỏi Thường Gặp',
  relatedResourcesTitle: 'Tài Nguyên Liên Quan',
  resumeExampleSubtext: 'Xem định dạng CV tương ứng',
  coverLetterGenerator: 'Công Cụ Tạo Thư Xin Việc AI',
  coverLetterGeneratorSubtext: 'Tạo thư xin việc trong vài giây',
  sidebar: {
    ctaTitle: 'Tạo Thư Xin Việc Của Bạn',
    ctaSubtitle: 'Dùng AI để tạo thư xin việc cho vị trí {jobTitle} trong vài giây.',
    ctaButton: 'Tạo Thư Xin Việc',
    tocTitle: 'Mục Lục',
  },
  relatedCoverLetters: 'Thư Xin Việc Liên Quan',
  bottomCta: {
    subtitle: 'Tham gia cùng hàng nghìn chuyên gia đã có được công việc mơ ước với Best AI Resume.',
    button: 'Tạo Thư Xin Việc — Miễn Phí',
  },
  updated: 'Cập Nhật',
};

const ko: CoverLetterArticleContent = {
  breadcrumb: { home: '홈', coverLetterExamples: '자기소개서 예시' },
  notFound: '찾을 수 없음',
  coverLetterSuffix: '자기소개서 예시',
  keySkillsTitle: '강조해야 할 핵심 역량',
  relatedTopics: '관련 주제',
  faqTitle: '자주 묻는 질문',
  relatedResourcesTitle: '관련 자료',
  resumeExampleSubtext: '해당 이력서 형식 보기',
  coverLetterGenerator: 'AI 자기소개서 생성기',
  coverLetterGeneratorSubtext: '자기소개서를 몇 초 만에 작성',
  sidebar: {
    ctaTitle: '자기소개서 만들기',
    ctaSubtitle: 'AI로 {jobTitle} 포지션에 맞는 맞춤형 자기소개서를 몇 초 안에 생성하세요.',
    ctaButton: '자기소개서 생성',
    tocTitle: '목차',
  },
  relatedCoverLetters: '관련 자기소개서',
  bottomCta: {
    subtitle: 'Best AI Resume로 꿈의 직장을 찾은 수천 명의 전문가와 함께하세요.',
    button: '자기소개서 생성 — 무료',
  },
  updated: '업데이트',
};

const content: Record<string, CoverLetterArticleContent> = { en, es, fr, de, ar, ja, it, ko, vi, th, pt, tr };
export const getContent = (locale: string): CoverLetterArticleContent => selectContent(content, locale);
