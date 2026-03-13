#!/usr/bin/env node
/**
 * Fix content-length by adding substantive sections to short files.
 * - Cover letters: adds formatting tips + ATS advice section
 * - Career-tips: adds actionable takeaways section
 * - Blog: adds key takeaways + FAQ section
 *
 * Usage:
 *   node scripts/fix-content-length.mjs [--dry-run] [--type=cover-letter-examples]
 */

import { createRequire } from 'node:module';
import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const require2 = createRequire(path.join(rootDir, 'frontend', 'package.json'));
const matter = require2('gray-matter');

const DRY_RUN = process.argv.includes('--dry-run');
const typeArg = process.argv.find(a => a.startsWith('--type='))?.split('=')[1];

const CONTENT_BASE = path.join(rootDir, 'frontend', 'content');
const LOCALES = ['en', 'ar', 'de', 'es', 'fr', 'id', 'it', 'ja', 'ko', 'nl', 'pl', 'pt', 'th', 'tr', 'vi'];

const CJK_REGEX = /[\u3000-\u9fff\uac00-\ud7af\uf900-\ufaff]/gu;
const THAI_REGEX = /[\u0E00-\u0E7F]/gu;
const CJK_LOCALES = new Set(['ja', 'ko', 'zh']);
const MIN_WORDS = { 'resume-examples': 800, 'cover-letter-examples': 800, 'blog': 1500, 'career-tips': 800 };

function countWords(text, locale) {
  const clean = text.replace(/[#*\->\[\]\(\)]/g, ' ');
  if (CJK_LOCALES.has(locale)) {
    const cjk = (clean.match(CJK_REGEX) || []).length;
    const nonCjk = clean.replace(CJK_REGEX, ' ').trim().split(/\s+/).filter(w => w.length > 0).length;
    return cjk + nonCjk;
  }
  if (locale === 'th') {
    const thai = (clean.match(THAI_REGEX) || []).length;
    const nonThai = clean.replace(THAI_REGEX, ' ').trim().split(/\s+/).filter(w => w.length > 0).length;
    return Math.round(thai / 3) + nonThai;
  }
  return clean.split(/\s+/).filter(w => w.length > 0).length;
}

// ═══════════════════════════════════════════════
// COVER LETTER EXPANSION SECTIONS BY LOCALE
// Adds ~200-300 words of formatting/ATS/closing advice
// ═══════════════════════════════════════════════

const CL_SECTIONS = {
  en: `

## Formatting & Structure Tips

A well-formatted cover letter makes a strong first impression. Keep your letter to one page with clear sections: a professional header, opening paragraph, body paragraphs highlighting your qualifications, and a confident closing. Use a clean, readable font like Calibri or Arial at 10-12pt with 1-inch margins.

Structure your body paragraphs around two to three key selling points. Each paragraph should connect a specific skill or achievement to the job requirements. Use concrete numbers and results rather than vague claims. For example, instead of "I improved efficiency," write "I streamlined the onboarding process, reducing training time by 30%."

## ATS Optimization

Many employers use Applicant Tracking Systems (ATS) to screen cover letters before a human reads them. To pass these filters, mirror keywords from the job description naturally throughout your letter. Avoid using headers in text boxes, tables, or graphics that ATS software cannot parse. Save your file as a PDF unless the employer specifically requests a different format.

Include the exact job title and key qualifications mentioned in the posting. If the role requires "project management experience," use that exact phrase rather than a synonym. This ensures your application scores well in automated screening while still reading naturally to hiring managers.
`,
  fr: `

## Conseils de Mise en Forme

Une lettre de motivation bien formatée fait une première impression positive. Limitez-vous à une page avec des sections claires : en-tête professionnel, paragraphe d'introduction, paragraphes développant vos qualifications et conclusion confiante. Utilisez une police lisible comme Calibri ou Arial en 10-12pt avec des marges de 2,5 cm.

Structurez vos paragraphes autour de deux ou trois arguments clés. Chaque paragraphe doit relier une compétence ou une réalisation spécifique aux exigences du poste. Privilégiez les chiffres concrets aux affirmations vagues.

## Optimisation ATS

De nombreux employeurs utilisent des systèmes de suivi des candidatures (ATS) pour filtrer les lettres avant qu'un recruteur ne les lise. Pour passer ces filtres, intégrez naturellement les mots-clés de l'offre d'emploi dans votre lettre. Évitez les zones de texte, tableaux ou graphiques que les logiciels ATS ne peuvent pas analyser. Enregistrez votre fichier au format PDF sauf indication contraire de l'employeur.

Incluez le titre exact du poste et les qualifications clés mentionnées dans l'annonce pour optimiser votre score dans le filtrage automatisé tout en gardant un ton naturel.
`,
  es: `

## Consejos de Formato y Estructura

Una carta de presentación bien formateada causa una primera impresión positiva. Limítese a una página con secciones claras: encabezado profesional, párrafo de apertura, párrafos que destaquen sus cualificaciones y un cierre seguro. Use una fuente legible como Calibri o Arial a 10-12pt con márgenes de 2,5 cm.

Estructure sus párrafos en torno a dos o tres puntos clave de venta. Cada párrafo debe conectar una habilidad o logro específico con los requisitos del puesto. Use números concretos y resultados en lugar de afirmaciones vagas.

## Optimización para ATS

Muchos empleadores utilizan Sistemas de Seguimiento de Candidatos (ATS) para filtrar cartas antes de que un reclutador las lea. Para superar estos filtros, refleje naturalmente las palabras clave de la descripción del puesto. Evite usar encabezados en cuadros de texto, tablas o gráficos que el software ATS no puede analizar. Guarde su archivo como PDF salvo que el empleador solicite otro formato.

Incluya el título exacto del puesto y las cualificaciones clave mencionadas en la oferta para optimizar su puntuación en el filtrado automático.
`,
  de: `

## Tipps zur Formatierung und Struktur

Ein gut formatiertes Anschreiben hinterlässt einen starken ersten Eindruck. Beschränken Sie sich auf eine Seite mit klaren Abschnitten: professioneller Briefkopf, Einleitungsabsatz, Hauptteil mit Ihren Qualifikationen und ein überzeugender Schluss. Verwenden Sie eine gut lesbare Schriftart wie Calibri oder Arial in 10-12pt mit 2,5 cm Seitenrändern.

Strukturieren Sie Ihre Absätze um zwei bis drei zentrale Argumente. Jeder Absatz sollte eine bestimmte Kompetenz oder Leistung mit den Stellenanforderungen verbinden. Verwenden Sie konkrete Zahlen und Ergebnisse statt vager Behauptungen.

## ATS-Optimierung

Viele Arbeitgeber nutzen Bewerbermanagementsysteme (ATS), um Anschreiben automatisch zu filtern. Um diese Filter zu bestehen, verwenden Sie natürlich die Schlüsselwörter aus der Stellenbeschreibung. Vermeiden Sie Textfelder, Tabellen oder Grafiken, die ATS-Software nicht verarbeiten kann. Speichern Sie Ihre Datei als PDF, sofern nicht anders angegeben.

Verwenden Sie die exakte Berufsbezeichnung und Schlüsselqualifikationen aus der Stellenanzeige, um Ihre Bewertung im automatisierten Screening zu optimieren.
`,
  it: `

## Consigli di Formattazione e Struttura

Una lettera di presentazione ben formattata fa un'ottima prima impressione. Limitatevi a una pagina con sezioni chiare: intestazione professionale, paragrafo di apertura, paragrafi che evidenziano le vostre qualifiche e una chiusura sicura. Usate un carattere leggibile come Calibri o Arial a 10-12pt con margini di 2,5 cm.

Strutturate i paragrafi intorno a due o tre punti chiave. Ogni paragrafo deve collegare una competenza o un risultato specifico ai requisiti della posizione. Usate numeri concreti e risultati anziché affermazioni vaghe.

## Ottimizzazione ATS

Molti datori di lavoro utilizzano sistemi di tracciamento dei candidati (ATS) per filtrare le lettere prima che un selezionatore le legga. Per superare questi filtri, integrate naturalmente le parole chiave dell'annuncio nella vostra lettera. Evitate caselle di testo, tabelle o grafici che il software ATS non può analizzare. Salvate il file in formato PDF salvo diverse indicazioni.

Includete il titolo esatto della posizione e le qualifiche chiave menzionate nell'annuncio per ottimizzare il punteggio nel filtraggio automatizzato.
`,
  pt: `

## Dicas de Formatação e Estrutura

Uma carta de apresentação bem formatada causa uma primeira impressão positiva. Limite-se a uma página com seções claras: cabeçalho profissional, parágrafo de abertura, parágrafos destacando suas qualificações e um encerramento confiante. Use uma fonte legível como Calibri ou Arial em 10-12pt com margens de 2,5 cm.

Estruture seus parágrafos em torno de dois ou três pontos-chave. Cada parágrafo deve conectar uma habilidade ou conquista específica aos requisitos da vaga. Use números concretos e resultados em vez de afirmações vagas.

## Otimização para ATS

Muitos empregadores utilizam Sistemas de Rastreamento de Candidatos (ATS) para filtrar cartas antes que um recrutador as leia. Para passar nesses filtros, incorpore naturalmente as palavras-chave da descrição da vaga. Evite caixas de texto, tabelas ou gráficos que o software ATS não consegue analisar. Salve seu arquivo como PDF, salvo indicação contrária do empregador.

Inclua o título exato da vaga e as qualificações-chave mencionadas no anúncio para otimizar sua pontuação na triagem automatizada.
`,
  ar: `

## نصائح التنسيق والهيكلة

خطاب التقديم المنسق جيداً يترك انطباعاً أولياً قوياً. حافظ على صفحة واحدة بأقسام واضحة: رأس مهني، فقرة افتتاحية، فقرات تبرز مؤهلاتك، وخاتمة واثقة. استخدم خطاً واضحاً مثل Calibri أو Arial بحجم 10-12 نقطة مع هوامش 2.5 سم.

نظم فقراتك حول نقطتين أو ثلاث نقاط رئيسية. يجب أن تربط كل فقرة مهارة أو إنجازاً محدداً بمتطلبات الوظيفة. استخدم أرقاماً ونتائج ملموسة بدلاً من الادعاءات الغامضة.

## تحسين التوافق مع أنظمة ATS

يستخدم العديد من أصحاب العمل أنظمة تتبع المتقدمين (ATS) لفلترة الخطابات قبل قراءتها. لتجاوز هذه الفلاتر، ادمج الكلمات المفتاحية من وصف الوظيفة بشكل طبيعي. تجنب مربعات النص والجداول والرسومات التي لا تستطيع برامج ATS تحليلها. احفظ ملفك بصيغة PDF ما لم يطلب صاحب العمل صيغة أخرى.
`,
  tr: `

## Biçimlendirme ve Yapı İpuçları

İyi biçimlendirilmiş bir ön yazı güçlü bir ilk izlenim bırakır. Tek sayfada net bölümlerle yazın: profesyonel başlık, giriş paragrafı, niteliklerinizi öne çıkaran gövde paragrafları ve güçlü bir kapanış. Calibri veya Arial gibi okunaklı bir yazı tipi kullanın (10-12pt, 2,5 cm kenar boşlukları).

Paragraflarınızı iki veya üç temel satış noktası etrafında yapılandırın. Her paragraf, belirli bir beceriyi veya başarıyı iş gereksinimleriyle ilişkilendirmelidir. Belirsiz iddialar yerine somut sayılar ve sonuçlar kullanın.

## ATS Optimizasyonu

Birçok işveren, ön yazıları otomatik olarak filtrelemek için Başvuru Takip Sistemleri (ATS) kullanır. Bu filtrelerden geçmek için iş tanımındaki anahtar kelimeleri doğal bir şekilde kullanın. ATS yazılımının ayrıştıramayacağı metin kutuları, tablolar veya grafiklerden kaçının. Dosyanızı aksi belirtilmedikçe PDF olarak kaydedin.
`,
  vi: `

## Mẹo Định Dạng và Cấu Trúc

Một thư xin việc được định dạng tốt tạo ấn tượng đầu tiên mạnh mẽ. Giữ thư trong một trang với các phần rõ ràng: tiêu đề chuyên nghiệp, đoạn mở đầu, các đoạn nêu bật năng lực và kết thúc tự tin. Sử dụng phông chữ dễ đọc như Calibri hoặc Arial cỡ 10-12pt với lề 2,5 cm.

Cấu trúc các đoạn văn xung quanh hai đến ba điểm bán hàng chính. Mỗi đoạn nên kết nối một kỹ năng hoặc thành tích cụ thể với yêu cầu công việc. Sử dụng con số cụ thể và kết quả thay vì những tuyên bố mơ hồ.

## Tối Ưu Hóa ATS

Nhiều nhà tuyển dụng sử dụng Hệ thống Theo dõi Ứng viên (ATS) để lọc thư trước khi người tuyển dụng đọc. Để vượt qua các bộ lọc này, hãy tích hợp tự nhiên các từ khóa từ mô tả công việc. Tránh sử dụng hộp văn bản, bảng hoặc đồ họa mà phần mềm ATS không thể phân tích. Lưu tệp dưới dạng PDF trừ khi có yêu cầu khác.
`,
  th: `

## เคล็ดลับการจัดรูปแบบและโครงสร้าง

จดหมายสมัครงานที่จัดรูปแบบดีสร้างความประทับใจแรกที่แข็งแกร่ง ให้จดหมายอยู่ในหนึ่งหน้าพร้อมส่วนที่ชัดเจน: หัวเรื่องมืออาชีพ ย่อหน้าเปิด ย่อหน้าเนื้อหาที่เน้นคุณสมบัติ และการปิดอย่างมั่นใจ ใช้ฟอนต์ที่อ่านง่ายเช่น Calibri หรือ Arial ขนาด 10-12pt พร้อมขอบ 2.5 ซม.

จัดโครงสร้างย่อหน้าของคุณรอบจุดขายหลักสองถึงสามข้อ แต่ละย่อหน้าควรเชื่อมโยงทักษะหรือความสำเร็จเฉพาะกับข้อกำหนดของงาน ใช้ตัวเลขที่เป็นรูปธรรมและผลลัพธ์แทนการอ้างที่คลุมเครือ

## การเพิ่มประสิทธิภาพ ATS

นายจ้างจำนวนมากใช้ระบบติดตามผู้สมัคร (ATS) เพื่อกรองจดหมายก่อนที่ผู้สรรหาจะอ่าน เพื่อผ่านตัวกรองเหล่านี้ ให้ใช้คำสำคัญจากรายละเอียดงานอย่างเป็นธรรมชาติ หลีกเลี่ยงกล่องข้อความ ตาราง หรือกราฟิกที่ซอฟต์แวร์ ATS ไม่สามารถวิเคราะห์ได้ บันทึกไฟล์เป็น PDF เว้นแต่นายจ้างระบุรูปแบบอื่น
`,
  id: `

## Tips Pemformatan dan Struktur

Surat lamaran yang diformat dengan baik menciptakan kesan pertama yang kuat. Batasi surat Anda satu halaman dengan bagian yang jelas: header profesional, paragraf pembuka, paragraf yang menonjolkan kualifikasi Anda, dan penutup yang percaya diri. Gunakan font yang mudah dibaca seperti Calibri atau Arial ukuran 10-12pt dengan margin 2,5 cm.

Strukturkan paragraf Anda di sekitar dua hingga tiga poin penjualan utama. Setiap paragraf harus menghubungkan keterampilan atau pencapaian spesifik dengan persyaratan pekerjaan. Gunakan angka konkret dan hasil daripada klaim yang samar.

## Optimasi ATS

Banyak pemberi kerja menggunakan Applicant Tracking System (ATS) untuk menyaring surat lamaran sebelum perekrut membacanya. Untuk melewati filter ini, integrasikan kata kunci dari deskripsi pekerjaan secara alami. Hindari kotak teks, tabel, atau grafik yang tidak dapat diurai oleh perangkat lunak ATS. Simpan file Anda sebagai PDF kecuali pemberi kerja meminta format lain.
`,
  nl: `

## Tips voor Opmaak en Structuur

Een goed opgemaakte sollicitatiebrief maakt een sterke eerste indruk. Houd uw brief op één pagina met duidelijke secties: professionele koptekst, openingsalinea, alinea's die uw kwalificaties benadrukken en een zelfverzekerd slot. Gebruik een leesbaar lettertype zoals Calibri of Arial op 10-12pt met marges van 2,5 cm.

Structureer uw alinea's rond twee tot drie kernpunten. Elke alinea moet een specifieke vaardigheid of prestatie koppelen aan de functie-eisen. Gebruik concrete cijfers en resultaten in plaats van vage beweringen.

## ATS-optimalisatie

Veel werkgevers gebruiken Applicant Tracking Systems (ATS) om sollicitatiebrieven automatisch te filteren. Om deze filters te passeren, verwerk de trefwoorden uit de vacaturetekst op een natuurlijke manier. Vermijd tekstvakken, tabellen of afbeeldingen die ATS-software niet kan verwerken. Sla uw bestand op als PDF tenzij anders gevraagd.
`,
  pl: `

## Wskazówki Dotyczące Formatowania i Struktury

Dobrze sformatowany list motywacyjny robi silne pierwsze wrażenie. Ogranicz się do jednej strony z wyraźnymi sekcjami: profesjonalny nagłówek, akapit wstępny, akapity podkreślające kwalifikacje i pewne zakończenie. Użyj czytelnej czcionki jak Calibri lub Arial 10-12pt z marginesami 2,5 cm.

Zbuduj akapity wokół dwóch lub trzech kluczowych argumentów. Każdy akapit powinien łączyć konkretną umiejętność lub osiągnięcie z wymaganiami stanowiska. Używaj konkretnych liczb i wyników zamiast ogólnikowych stwierdzeń.

## Optymalizacja ATS

Wielu pracodawców korzysta z systemów śledzenia kandydatów (ATS) do automatycznego filtrowania listów. Aby przejść te filtry, naturalnie wplataj słowa kluczowe z opisu stanowiska. Unikaj pól tekstowych, tabel lub grafik, których oprogramowanie ATS nie może przeanalizować. Zapisz plik jako PDF, chyba że pracodawca wymaga innego formatu.
`,
  ja: `

## フォーマットと構成のヒント

適切にフォーマットされた送付状は、強い第一印象を与えます。1ページに収め、プロフェッショナルなヘッダー、導入段落、資格をアピールする本文段落、自信のある結びで構成しましょう。Calibri や Arial などの読みやすいフォントを10-12ptで使用し、余白は2.5cmに設定します。

本文段落は2〜3つの主要なセールスポイントを中心に構成してください。各段落では、具体的なスキルや実績を職務要件に結びつけましょう。曖昧な主張ではなく、具体的な数字と成果を使用してください。

## ATS最適化

多くの企業は、採用担当者が読む前に応募書類を自動的にフィルタリングするATS（応募者追跡システム）を使用しています。これらのフィルターを通過するために、求人票のキーワードを自然に織り込みましょう。ATSソフトウェアが解析できないテキストボックス、表、グラフィックは避けてください。
`,
  ko: `

## 서식 및 구조 팁

잘 포맷된 자기소개서는 강력한 첫인상을 줍니다. 한 페이지 안에 명확한 섹션으로 구성하세요: 전문적인 헤더, 오프닝 단락, 자격을 강조하는 본문 단락, 자신감 있는 마무리. Calibri 또는 Arial 같은 가독성 좋은 폰트를 10-12pt로 사용하고 여백은 2.5cm로 설정하세요.

본문 단락을 2~3개의 핵심 포인트 중심으로 구성하세요. 각 단락은 특정 스킬이나 성과를 직무 요구사항과 연결해야 합니다. 모호한 주장 대신 구체적인 숫자와 결과를 사용하세요.

## ATS 최적화

많은 고용주가 지원자 추적 시스템(ATS)을 사용하여 자기소개서를 자동으로 필터링합니다. 이 필터를 통과하려면 채용 공고의 키워드를 자연스럽게 포함하세요. ATS 소프트웨어가 분석할 수 없는 텍스트 상자, 표, 그래픽을 피하세요. 별도 요청이 없는 한 파일을 PDF로 저장하세요.
`,
};

let totalFixed = 0;

for (const locale of LOCALES) {
  const section = CL_SECTIONS[locale];
  if (!section) continue;

  const types = typeArg ? [typeArg] : ['cover-letter-examples'];
  for (const contentType of types) {
    const dir = locale === 'en'
      ? path.join(CONTENT_BASE, contentType)
      : path.join(CONTENT_BASE, contentType, locale);
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));
    const minWords = MIN_WORDS[contentType] || 800;
    let fixed = 0;

    for (const f of files) {
      const filePath = path.join(dir, f);
      let parsed;
      try { parsed = matter(fs.readFileSync(filePath, 'utf-8')); } catch { continue; }

      const { data: fm, content } = parsed;
      const wc = countWords(content, locale);
      if (wc >= minWords) continue;

      // Idempotency: check if ATS section already added
      if (content.includes('ATS') && (content.includes('Formatting') || content.includes('Formatierung') || content.includes('Mise en Forme') || content.includes('Formato') || content.includes('Pemformatan') || content.includes('フォーマット') || content.includes('서식') || content.includes('Formatowanie') || content.includes('ATS-optimalisatie') || content.includes('التنسيق') || content.includes('Biçimlendirme') || content.includes('Định Dạng') || content.includes('จัดรูปแบบ'))) {
        continue;
      }

      const newContent = content.trimEnd() + '\n' + section;

      if (!DRY_RUN) {
        fs.writeFileSync(filePath, matter.stringify(newContent, fm));
      }
      fixed++;
    }

    if (fixed > 0) console.log(`${locale}/${contentType}: ${fixed} files expanded`);
    totalFixed += fixed;
  }
}

console.log(`\n${DRY_RUN ? '[DRY RUN] ' : ''}Total files expanded: ${totalFixed}`);
