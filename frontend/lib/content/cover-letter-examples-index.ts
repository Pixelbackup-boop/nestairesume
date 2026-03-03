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

const it: CoverLetterExamplesIndexContent = {
  meta: {
    title: 'Esempi di Lettera di Presentazione per Professione (2026) | Best AI Resume',
    description: 'Sfoglia oltre 100 esempi gratuiti di lettera di presentazione organizzati per settore e professione. Modelli professionali con consigli di scrittura.',
    keywords: 'esempi lettera di presentazione, modello lettera di presentazione, lettera di presentazione professionale, lettera di accompagnamento, formato lettera di presentazione',
  },
  hero: {
    badge: 'Esempi di Lettere 2026',
    title: 'Esempi di Lettera di Presentazione',
    titleHighlight: 'per Professione',
    subtitle: 'Sfoglia {count}+ esempi professionali di lettera di presentazione organizzati per settore. Trova la tua professione e crea la tua lettera con il nostro strumento IA.',
    ctaBrowse: 'Sfoglia gli Esempi',
    ctaCreate: 'Crea una Lettera con l\'IA',
  },
  stats: {
    examples: 'Esempi di Lettere',
    industries: 'Settori Coperti',
    free: 'Gratuiti da Usare',
  },
  tips: {
    title: 'Cosa rende efficace una lettera di presentazione?',
    items: [
      { title: 'Personalizzazione', description: 'Rivolgiti al responsabile delle assunzioni per nome e personalizza ogni lettera. Il 77% dei selezionatori preferisce lettere personalizzate.' },
      { title: 'Risultati Concreti', description: 'Includi 1-2 risultati quantificati che dimostrino il tuo valore. I numeri sono più memorabili delle affermazioni generiche.' },
      { title: 'Lunghezza Concisa', description: 'Mantieniti tra 250 e 400 parole. I selezionatori dedicano meno di 30 secondi alla lettura — ogni parola conta.' },
    ],
  },
  grid: {
    title: 'Sfoglia per Settore',
    examplesLabel: 'esempi',
    coverLetterSuffix: 'Lettera di Presentazione',
    comingSoon: 'Esempi di lettere di presentazione in arrivo!',
    comingSoonCta: 'Crea una Lettera con l\'IA',
  },
  bottomCta: {
    title: 'Non trovi la tua professione?',
    description: 'La nostra IA può scrivere una lettera di presentazione personalizzata per QUALSIASI professione in pochi secondi.',
    ctaText: 'Genera Lettera Personalizzata',
  },
  relatedResources: {
    title: 'Risorse Correlate',
    items: [
      { title: 'Esempi di Curriculum Vitae', description: 'Oltre 300 esempi per professione' },
      { title: 'Guida alla Lettera di Presentazione', description: 'Tutorial passo passo per la scrittura' },
      { title: 'Modelli di Curriculum Vitae', description: 'Modelli professionali per qualsiasi lavoro' },
    ],
  },
};

const th: CoverLetterExamplesIndexContent = {
  meta: {
    title: 'ตัวอย่างจดหมายสมัครงานตามตำแหน่ง (2026) | Best AI Resume',
    description: 'เรียกดูตัวอย่างจดหมายสมัครงานฟรีกว่า 100 แบบจัดตามอุตสาหกรรมและตำแหน่งงาน เทมเพลตจดหมายสมัครงานมืออาชีพพร้อมเคล็ดลับการเขียน',
    keywords: 'ตัวอย่างจดหมายสมัครงาน, เทมเพลตจดหมายสมัครงาน, จดหมายสมัครงานมืออาชีพ, แบบฟอร์มจดหมายสมัครงาน, วิธีเขียนจดหมายสมัครงาน',
  },
  hero: {
    badge: 'ตัวอย่างจดหมายสมัครงาน 2026',
    title: 'ตัวอย่างจดหมายสมัครงาน',
    titleHighlight: 'ตามตำแหน่งงาน',
    subtitle: 'เรียกดู {count}+ ตัวอย่างจดหมายสมัครงานมืออาชีพจัดตามอุตสาหกรรม ค้นหาตำแหน่งของคุณ ศึกษารูปแบบ แล้วสร้างของคุณด้วย AI',
    ctaBrowse: 'เรียกดูตัวอย่าง',
    ctaCreate: 'สร้างจดหมายสมัครงานด้วย AI',
  },
  stats: {
    examples: 'ตัวอย่างจดหมายสมัครงาน',
    industries: 'อุตสาหกรรมที่ครอบคลุม',
    free: 'ใช้งานและดาวน์โหลดฟรี',
  },
  tips: {
    title: 'อะไรทำให้จดหมายสมัครงานดี?',
    items: [
      { title: 'ความเฉพาะเจาะจง', description: 'ระบุชื่อผู้จัดการฝ่ายบุคคลและปรับแต่งจดหมายแต่ละฉบับตามตำแหน่ง 77% ของนายจ้างชอบจดหมายที่เขียนเฉพาะตำแหน่ง' },
      { title: 'ผลงานที่เป็นรูปธรรม', description: 'ใส่ผลงาน 1-2 รายการพร้อมตัวเลขที่แสดงคุณค่าของคุณ ตัวเลขจดจำได้ง่ายกว่าคำกล่าวอ้างทั่วไป' },
      { title: 'ความกระชับ', description: 'เขียนให้อยู่ในช่วง 250-400 คำ ผู้จัดการฝ่ายบุคคลใช้เวลาไม่ถึง 30 วินาทีในการอ่าน — ทุกคำมีความหมาย' },
    ],
  },
  grid: {
    title: 'เรียกดูตามอุตสาหกรรม',
    examplesLabel: 'ตัวอย่าง',
    coverLetterSuffix: 'จดหมายสมัครงาน',
    comingSoon: 'ตัวอย่างจดหมายสมัครงานเพิ่มเติมเร็ว ๆ นี้!',
    comingSoonCta: 'สร้างจดหมายสมัครงานด้วย AI',
  },
  bottomCta: {
    title: 'ไม่พบตำแหน่งงานของคุณ?',
    description: 'AI ของเราสามารถเขียนจดหมายสมัครงานสำหรับทุกตำแหน่งในไม่กี่วินาที',
    ctaText: 'สร้างจดหมายสมัครงานที่ปรับแต่งเอง',
  },
  relatedResources: {
    title: 'แหล่งข้อมูลที่เกี่ยวข้อง',
    items: [
      { title: 'ตัวอย่างเรซูเม่', description: 'ตัวอย่างเรซูเม่กว่า 300 แบบตามสายอาชีพ' },
      { title: 'คู่มือจดหมายสมัครงาน', description: 'บทเรียนเขียนจดหมายสมัครงานทีละขั้นตอน' },
      { title: 'เทมเพลตเรซูเม่', description: 'เทมเพลตมืออาชีพสำหรับทุกตำแหน่งงาน' },
    ],
  },
};

const pt: CoverLetterExamplesIndexContent = {
  meta: {
    title: 'Exemplos de Carta de Apresentacao por Profissao (2026) | Best AI Resume',
    description: 'Explore mais de 100 exemplos gratuitos de carta de apresentacao organizados por setor e profissao. Modelos profissionais com dicas de redacao.',
    keywords: 'exemplos carta de apresentacao, modelo carta de apresentacao, carta de apresentacao profissional, carta de motivacao, formato carta de apresentacao',
  },
  hero: {
    badge: 'Exemplos de Cartas 2026',
    title: 'Exemplos de Carta de Apresentacao',
    titleHighlight: 'por Profissao',
    subtitle: 'Explore {count}+ exemplos profissionais de carta de apresentacao organizados por setor. Encontre sua profissao e crie a sua com nosso construtor com IA.',
    ctaBrowse: 'Ver Exemplos',
    ctaCreate: 'Criar Carta com IA',
  },
  stats: {
    examples: 'Exemplos de Cartas',
    industries: 'Setores Cobertos',
    free: 'Gratis para Usar',
  },
  tips: {
    title: 'O que torna uma carta de apresentacao eficaz?',
    items: [
      { title: 'Personalizacao', description: 'Dirija-se ao recrutador pelo nome e personalize cada carta. 77% dos recrutadores preferem cartas personalizadas.' },
      { title: 'Resultados Concretos', description: 'Inclua 1-2 conquistas quantificadas que demonstrem seu valor. Numeros sao mais memoraveis do que afirmacoes vagas.' },
      { title: 'Extensao Concisa', description: 'Mantenha entre 250 e 400 palavras. Recrutadores dedicam menos de 30 segundos — cada palavra conta.' },
    ],
  },
  grid: {
    title: 'Explorar por Setor',
    examplesLabel: 'exemplos',
    coverLetterSuffix: 'Carta de Apresentacao',
    comingSoon: 'Exemplos de carta de apresentacao em breve!',
    comingSoonCta: 'Criar Carta com IA',
  },
  bottomCta: {
    title: 'Nao encontrou sua profissao?',
    description: 'Nossa IA pode escrever uma carta de apresentacao personalizada para QUALQUER profissao em segundos.',
    ctaText: 'Gerar Carta Personalizada',
  },
  relatedResources: {
    title: 'Recursos Relacionados',
    items: [
      { title: 'Exemplos de Curriculo', description: 'Mais de 300 exemplos por profissao' },
      { title: 'Guia de Carta de Apresentacao', description: 'Tutorial passo a passo' },
      { title: 'Modelos de Curriculo', description: 'Modelos profissionais para qualquer emprego' },
    ],
  },
};

const tr: CoverLetterExamplesIndexContent = {
  meta: {
    title: 'Mesleğe Göre Ön Yazı Örnekleri (2026) | Best AI Resume',
    description: 'Sektöre ve mesleğe göre düzenlenmiş 100\'den fazla ücretsiz ön yazı örneği inceleyin. Yazım ipuçlarıyla profesyonel ön yazı şablonları.',
    keywords: 'ön yazı örnekleri, ön yazı şablonu, profesyonel ön yazı, ön yazı nasıl yazılır, ön yazı formatı',
  },
  hero: {
    badge: 'Ön Yazı Örnekleri 2026',
    title: 'Mesleğe Göre',
    titleHighlight: 'Ön Yazı Örnekleri',
    subtitle: 'Sektöre göre düzenlenmiş {count}\'den fazla profesyonel ön yazı örneğine göz atın. Mesleğinizi bulun ve AI oluşturucumuzla kendi ön yazınızı hazırlayın.',
    ctaBrowse: 'Örneklere Bak',
    ctaCreate: 'AI ile Ön Yazı Oluştur',
  },
  stats: {
    examples: 'Ön Yazı Örneği',
    industries: 'Kapsanan Sektör',
    free: 'Ücretsiz Kullanım',
  },
  tips: {
    title: 'Etkili bir ön yazıyı ne yapar?',
    items: [
      { title: 'Kişiselleştirme', description: 'İşe alım uzmanına adıyla hitap edin ve her ön yazıyı kişiselleştirin. İşe alım uzmanlarının %77\'si kişiselleştirilmiş ön yazıları tercih eder.' },
      { title: 'Somut Sonuçlar', description: 'Değerinizi kanıtlayan 1-2 ölçülebilir başarı ekleyin. Rakamlar belirsiz ifadelerden daha akılda kalıcıdır.' },
      { title: 'Özlü Uzunluk', description: '250-400 kelime arasında tutun. İşe alım uzmanları 30 saniyeden az ayırır — her kelime önemlidir.' },
    ],
  },
  grid: {
    title: 'Sektöre Göre Keşfet',
    examplesLabel: 'örnek',
    coverLetterSuffix: 'Ön Yazı',
    comingSoon: 'Ön yazı örnekleri yakında geliyor!',
    comingSoonCta: 'AI ile Ön Yazı Oluştur',
  },
  bottomCta: {
    title: 'Mesleğinizi bulamadınız mı?',
    description: 'AI\'mız saniyeler içinde HERHANGİ bir meslek için özelleştirilmiş ön yazı yazabilir.',
    ctaText: 'Özelleştirilmiş Ön Yazı Oluştur',
  },
  relatedResources: {
    title: 'İlgili Kaynaklar',
    items: [
      { title: 'CV Örnekleri', description: 'Mesleğe göre 300\'den fazla örnek' },
      { title: 'Ön Yazı Rehberi', description: 'Adım adım yazım öğreticisi' },
      { title: 'CV Şablonları', description: 'Her iş için profesyonel şablonlar' },
    ],
  },
};

const vi: CoverLetterExamplesIndexContent = {
  meta: {
    title: 'Mẫu Thư Xin Việc Theo Vị Trí Công Việc (2026) | Best AI Resume',
    description: 'Khám phá hơn 100 mẫu thư xin việc miễn phí theo ngành và vị trí. Thư xin việc chuyên nghiệp với mẹo viết hiệu quả. Tìm vị trí của bạn và tạo thư xin việc ngay.',
    keywords: 'ví dụ thư xin việc, mẫu thư xin việc, thư xin việc chuyên nghiệp, thư ứng tuyển, viết thư xin việc, thư xin việc tiếng Việt',
  },
  hero: {
    badge: 'Mẫu Thư Xin Việc 2026',
    title: 'Mẫu Thư Xin Việc',
    titleHighlight: 'Theo Vị Trí Công Việc',
    subtitle: 'Khám phá {count}+ mẫu thư xin việc chuyên nghiệp theo ngành. Tìm vị trí của bạn, nghiên cứu định dạng và tạo thư với công cụ AI.',
    ctaBrowse: 'Xem Mẫu',
    ctaCreate: 'Tạo Thư Xin Việc với AI',
  },
  stats: {
    examples: 'Mẫu Thư Xin Việc',
    industries: 'Ngành Nghề',
    free: 'Miễn Phí Sử Dụng',
  },
  tips: {
    title: 'Điều Gì Làm Nên Thư Xin Việc Tốt?',
    items: [
      { title: 'Cá nhân hóa', description: 'Gọi tên người quản lý và tùy chỉnh từng thư theo vị trí. 77% nhà tuyển dụng thích thư được cá nhân hóa.' },
      { title: 'Thành tích cụ thể', description: 'Đưa vào 1-2 thành tích có số liệu để chứng minh giá trị của bạn. Con số ấn tượng hơn lời khẳng định mơ hồ.' },
      { title: 'Độ dài súc tích', description: 'Giữ trong 250-400 từ. Nhà tuyển dụng dành dưới 30 giây đọc thư — mỗi từ đều quan trọng.' },
    ],
  },
  grid: {
    title: 'Khám Phá Theo Ngành',
    examplesLabel: 'mẫu',
    coverLetterSuffix: 'Thư Xin Việc',
    comingSoon: 'Mẫu thư xin việc sắp ra mắt!',
    comingSoonCta: 'Tạo Thư Xin Việc với AI',
  },
  bottomCta: {
    title: 'Không tìm thấy vị trí của bạn?',
    description: 'AI của chúng tôi có thể viết thư xin việc cho BẤT KỲ vị trí nào trong vài giây.',
    ctaText: 'Tạo Thư Tùy Chỉnh',
  },
  relatedResources: {
    title: 'Tài Nguyên Liên Quan',
    items: [
      { title: 'Mẫu CV', description: 'Hơn 300 mẫu CV theo nghề nghiệp' },
      { title: 'Hướng Dẫn Thư Xin Việc', description: 'Hướng dẫn viết từng bước' },
      { title: 'Mẫu Hồ Sơ', description: 'Mẫu chuyên nghiệp cho mọi công việc' },
    ],
  },
};

const ko: CoverLetterExamplesIndexContent = {
  meta: {
    title: '직종별 자기소개서 예시 (2026) | Best AI Resume',
    description: '산업 및 직종별로 정리된 100개 이상의 무료 자기소개서 예시를 확인하세요. 작성 팁이 포함된 전문 자기소개서 양식. 원하는 직종을 찾아 자기소개서를 작성하세요.',
    keywords: '자기소개서 예시, 자기소개서 양식, 자기소개서 작성법, 커버레터 예시, 지원서 작성, 자기소개서 샘플',
  },
  hero: {
    badge: '자기소개서 예시 2026',
    title: '자기소개서 예시',
    titleHighlight: '직종별',
    subtitle: '{count}개 이상의 전문 자기소개서 예시를 산업별로 확인하세요. 원하는 직종을 찾아 AI로 자기소개서를 작성하세요.',
    ctaBrowse: '예시 보기',
    ctaCreate: 'AI로 자기소개서 작성',
  },
  stats: {
    examples: '자기소개서 예시',
    industries: '직종 분야',
    free: '무료 이용',
  },
  tips: {
    title: '좋은 자기소개서의 조건은?',
    items: [
      { title: '개인화', description: '채용 담당자의 이름을 쓰고 각 지원서에 맞게 내용을 맞춤화하세요. 77%의 채용 담당자가 개인화된 자기소개서를 선호합니다.' },
      { title: '구체적인 성과', description: '자신의 가치를 보여주는 수치화된 성과 1-2개를 포함하세요. 숫자는 막연한 주장보다 인상적입니다.' },
      { title: '적절한 분량', description: '250-400단어로 작성하세요. 채용 담당자는 30초 미만으로 검토합니다 — 모든 단어가 중요합니다.' },
    ],
  },
  grid: {
    title: '분야별 탐색',
    examplesLabel: '개 예시',
    coverLetterSuffix: '자기소개서',
    comingSoon: '자기소개서 예시가 곧 추가됩니다!',
    comingSoonCta: 'AI로 자기소개서 작성',
  },
  bottomCta: {
    title: '찾는 직종이 없으신가요?',
    description: 'AI가 몇 초 안에 모든 직종에 맞는 맞춤형 자기소개서를 작성합니다.',
    ctaText: '맞춤 자기소개서 생성',
  },
  relatedResources: {
    title: '관련 자료',
    items: [
      { title: '이력서 예시', description: '300개 이상의 직종별 이력서 예시' },
      { title: '자기소개서 가이드', description: '단계별 작성 튜토리얼' },
      { title: '이력서 양식', description: '모든 직종을 위한 전문 양식' },
    ],
  },
};

const content: Record<string, CoverLetterExamplesIndexContent> = { en, es, fr, de, ar, ja, it, ko, vi, th, pt, tr };
export const getContent = (locale: string): CoverLetterExamplesIndexContent => selectContent(content, locale);
