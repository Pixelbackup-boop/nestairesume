/**
 * Turkish (tr) locale data for cover letter example generation.
 * Imported by generate-locale-cover-letters.mjs via:
 *   await import('./locale-data/cover-letter-tr.mjs')
 *
 * Keywords sourced from seo/turkish-top-300-keywords.csv
 * Top cover letter terms: ön yazı örnekleri (5K), ön yazı örneği (500),
 * iş başvurusu ön yazı (500), cv ön yazı örnekleri (500)
 */

import { JOB_TITLES as RESUME_TITLES } from './resume-tr.mjs';

// ─── CONFIG ─────────────────────────────────────────────────────────────────

export const CONFIG = {
  author: 'Elif Yılmaz',
  authorBio: 'Kariyer danışmanı ve ön yazı yazım uzmanı. 10 yılı aşkın deneyimiyle Türkiye\'deki profesyonellere etkili iş başvuruları hazırlamada rehberlik ediyor.',
  titlePattern: (job) => `${job} Ön Yazı Örneği: Rehber ve Şablon 2026`,
  descriptionPattern: (job) => `${job.toLowerCase()} ön yazı örneği ve profesyonel şablonlar. İş başvurusunda etkili ön yazı hazırlama rehberi ile 2026 yılında mülakata davet alın.`,
};

// ─── JOB TITLES (English → Turkish) ─────────────────────────────────────────

export const JOB_TITLES = {
  ...RESUME_TITLES,
  'Bookkeeper': 'Muhasebe Sorumlusu',
  'Corporate Trainer': 'Kurumsal Eğitmen',
  'Customer Service Representative': 'Müşteri Hizmetleri Temsilcisi',
  'EMT/Paramedic': 'Acil Tıp Teknisyeni/Paramedik',
  'Frontend Developer': 'Frontend Geliştirici',
  'Healthcare Administrator': 'Sağlık Yöneticisi',
  'Human Resources Manager': 'İnsan Kaynakları Müdürü',
  'Machinist': 'Makinist',
  'Registered Nurse': 'Hemşire',
  'Solutions Architect': 'Çözüm Mimarı',
  'Systems Administrator': 'Sistem Yöneticisi',
  'Tax Accountant': 'Vergi Muhasebecisi',
};

// ─── CATEGORIES (English → Turkish) ──────────────────────────────────────────

export const CATEGORIES = {
  Technology: 'Teknoloji',
  Healthcare: 'Sağlık',
  'Food Service': 'Yiyecek İçecek',
  Hospitality: 'Otelcilik',
  Trades: 'Zanaat ve Teknik İşler',
  Creative: 'Yaratıcı Meslekler',
  Education: 'Eğitim',
  Marketing: 'Pazarlama',
  Government: 'Kamu',
  Business: 'İş Dünyası',
  Sales: 'Satış',
  Engineering: 'Mühendislik',
  'Business & Finance': 'İş Dünyası ve Finans',
  Legal: 'Hukuk',
  HR: 'İnsan Kaynakları',
  'Skilled Trades': 'Nitelikli Zanaat İşleri',
  'Real Estate': 'Gayrimenkul',
  'Customer Service': 'Müşteri Hizmetleri',
  'Animal Care': 'Hayvan Bakımı',
  Administrative: 'İdari İşler',
  Transportation: 'Ulaşım',
  Logistics: 'Lojistik',
  Fitness: 'Fitness ve Spor',
  Cleaning: 'Temizlik',
  Retail: 'Perakende',
  Management: 'Yönetim',
  'Social Services': 'Sosyal Hizmetler',
  Manufacturing: 'Üretim',
  Accounting: 'Muhasebe',
  Construction: 'İnşaat',
  Security: 'Güvenlik',
  Science: 'Bilim',
  'Health & Fitness': 'Sağlık ve Fitness',
  Research: 'Araştırma',
  Finance: 'Finans',
  'Writing & Content': 'Yazarlık ve İçerik',
  'Supply Chain': 'Tedarik Zinciri',
  Quality: 'Kalite',
  Media: 'Medya',
  Maritime: 'Denizcilik',
  'Law Enforcement': 'Kolluk Kuvvetleri',
  Facilities: 'Tesis Yönetimi',
  Executive: 'Üst Düzey Yönetim',
  Events: 'Etkinlik',
  'Entry-Level': 'Giriş Seviyesi',
  Entrepreneurship: 'Girişimcilik',
  Consulting: 'Danışmanlık',
  Childcare: 'Çocuk Bakımı',
  'Banking & Finance': 'Bankacılık ve Finans',
  Banking: 'Bankacılık',
  Aviation: 'Havacılık',
  Automotive: 'Otomotiv',
  Architecture: 'Mimarlık',
};

// ─── HELPERS ────────────────────────────────────────────────────────────────

function normalizeCategory(category) {
  const c = category.toLowerCase();
  if (c.includes('hospitality') || c.includes('hotel')) return 'Hospitality';
  if (c.includes('tech') || c.includes('software') || c.includes('it')) return 'Technology';
  if (c.includes('engineering')) return 'Engineering';
  if (c.includes('health') || c.includes('medical') || c.includes('nursing')) return 'Healthcare';
  if (c.includes('finance') || c.includes('accounting') || c.includes('banking')) return 'Finance';
  if (c.includes('food') || c.includes('culinary') || c.includes('restaurant')) return 'Food Service';
  if (c.includes('trade') || c.includes('construction') || c.includes('manufacturing') || c.includes('skilled')) return 'Trades';
  if (c.includes('creative') || c.includes('design') || c.includes('art') || c.includes('media') || c.includes('writing')) return 'Creative';
  if (c.includes('education') || c.includes('teaching') || c.includes('childcare')) return 'Education';
  if (c.includes('admin') || c.includes('office') || c.includes('executive') || c.includes('facilities')) return 'Administrative';
  if (c.includes('sales') || c.includes('retail')) return 'Sales';
  if (c.includes('marketing')) return 'Marketing';
  if (c.includes('hr') || c.includes('human resource')) return 'HR';
  if (c.includes('customer') || c.includes('support')) return 'Customer Service';
  if (c.includes('logistics') || c.includes('warehouse') || c.includes('supply') || c.includes('transport')) return 'Logistics';
  if (c.includes('government') || c.includes('law enforcement') || c.includes('security') || c.includes('police')) return 'Government';
  if (c.includes('legal') || c.includes('consulting')) return 'Legal';
  if (c.includes('science') || c.includes('research')) return 'Science';
  if (c.includes('fitness') || c.includes('animal')) return 'Fitness';
  if (c.includes('cleaning')) return 'Cleaning';
  if (c.includes('aviation') || c.includes('automotive') || c.includes('maritime')) return 'Logistics';
  if (c.includes('event') || c.includes('entrepreneurship')) return 'Business';
  if (c.includes('entry')) return 'Entry-Level';
  return 'default';
}

// ─── CATEGORY OPENERS ───────────────────────────────────────────────────────

const CATEGORY_OPENERS = {
  Technology: (job) => `Teknoloji sektöründe bir ${job} ön yazısı, yalnızca bildiğiniz dilleri ve araçları sıralamaktan çok daha ötesine geçmelidir. İşe alım yöneticileri, teknik becerilerinizin somut problemleri nasıl çözdüğünü ve önceki iş yerlerine nasıl değer kattığını gösterebilen adaylar arar. Ön yazınız, uzmanlığınız ile pozisyonun gereksinimleri arasında doğrudan bir bağlantı kurmalıdır.`,
  Healthcare: (job) => `Sağlık sektörü, hasta refahına olan bağlılığa özel bir önem verir. ${job} ön yazınız hem klinik yetkinliklerinizi hem de profesyonel empatinizi yansıtmalıdır. İşe alım uzmanları, teknik niteliklerinizin ötesinde pozisyonun etik ve insani boyutlarını anladığınızı görmek ister.`,
  Finance: (job) => `Finans ve muhasebe alanında işe alım uzmanları, ön yazısında analitik titizlik ve mesleki dürüstlük sergileyen adaylar arar. ${job} başvurunuz, sektörün düzenleyici normlarına uygun şekilde mali sorumlulukları hassasiyetle yönetme yeteneğinizi somut örneklerle ortaya koymalıdır.`,
  'Food Service': (job) => `Yiyecek içecek sektöründe bir ${job} ön yazısı gastronomi tutkunuzu ve tempolu bir ortamda performans gösterme kapasitenizi aktarmalıdır. İşe alım yöneticileri güçlü bir ekip ruhunu, hijyen standartlarına hakimiyeti ve müşteri deneyimine olan bağlılığı kanıtlayan adayları değerli bulur.`,
  Hospitality: (job) => `Otelcilik sektörü hizmet mükemmeliyetini somutlaştıran adayları arar. ${job} ön yazınız misafirperverlik anlayışınızı, detaylara özeninizi ve müşteriler için unutulmaz deneyimler yaratma becerinizi yansıtmalıdır. İşe alım uzmanları operasyonel becerileri insani sıcaklıkla birleştiren profesyoneller arar.`,
  Trades: (job) => `Zanaat ve teknik mesleklerde etkili bir ${job} ön yazısı, uygulamalı deneyiminizi, sertifikalarınızı ve iş güvenliğine olan bağlılığınızı öne çıkarır. İşverenler güvenilir, bağımsız çalışabilen ve sürelere uygun şekilde kaliteli iş üreten profesyoneller arar.`,
  Engineering: (job) => `Mühendislik pozisyonları, karmaşık sorunları sistematik bir şekilde çözme yeteneğinizi gösteren bir ${job} ön yazısı gerektirir. İşe alım uzmanları başarıyla tamamlanmış projelerin, teknik araçlara hakimiyetin ve endüstriyel kısıtlamaların anlaşıldığının somut kanıtlarını görmek ister.`,
  Creative: (job) => `Yaratıcı mesleklerde ${job} ön yazınız, başlı başına yeteneklerinizin bir vitrinidir. Sanatsal duyarlılığınızı sergilerken ticari hedefleri de kavradığınızı kanıtlamalıdır. Kreatif direktörler, sanatsal vizyonu müşteri beklentileriyle uyumlu hale getirebilen adaylar arar.`,
  Education: (job) => `Eğitim sektörü, bilgi aktarımına yönelik gerçek bir vocasyonu gösteren adayları değerli bulur. ${job} ön yazınız pedagojik felsefenizi, farklı öğrenci profillerine uyum sağlama becerinizi ve eğitimsel başarıya olan bağlılığınızı yansıtmalıdır.`,
  Administrative: (job) => `İdari pozisyonlar, organizasyon becerinizi, sağduyunuzu ve çok yönlülüğünüzü sergileyen bir ${job} ön yazısı gerektirir. İşe alım uzmanları ihtiyaçları önceden tahmin edebilen, birden fazla önceliği aynı anda yönetebilen ve günlük operasyonların sorunsuz yürümesini sağlayabilen adaylar arar.`,
  Sales: (job) => `${job} ön yazınız ilk satış sunumunuzdur — ikna edici olmalıdır. İşe alım yöneticileri ikna edici iletişim kurma, müşteri ihtiyaçlarını belirleme ve net bir değer önerisi sunma becerinizi değerlendirir. Her paragraf satış potansiyelinizi somutlaştırmalıdır.`,
  Marketing: (job) => `Pazarlama alanında ${job} ön yazınız iletişim stratejilerine hakimiyetinizi ve ölçülebilir sonuçlar elde etme kapasitetesinizi yansıtmalıdır. İşe alım uzmanları hem stratejik düşünce hem de operasyonel uygulama konusunda yetkin, başarılı kampanya veya girişim örnekleri sunan adaylar görmek ister.`,
  HR: (job) => `İnsan kaynakları pozisyonları, organizasyonel dinamiklere hakimiyetinizi ve şirketin insani boyutuna duyarlılığınızı gösteren bir ${job} ön yazısı gerektirir. Başvurunuz çalışanların çıkarları ile organizasyonun hedeflerini dengeleme yeteneğinizi somutlaştırmalıdır.`,
  'Customer Service': (job) => `Müşteri hizmetleri pozisyonları, dinleme becerinizi, sabrınızı ve problem çözme yeteneğinizi öne çıkaran bir ${job} ön yazısı gerektirir. İşe alım uzmanları zor durumları müşteri için olumlu deneyimlere dönüştürebilen adaylar arar.`,
  Logistics: (job) => `Lojistik sektörü hassasiyet ve operasyonel verimliliğe değer verir. ${job} ön yazınız karmaşık operasyonları yönetme, sürelere uyma ve süreçleri optimize etme kapasitenizi göstermelidir. İşverenler akış yönetiminde sağlam deneyime sahip sistematik profesyoneller arar.`,
  Government: (job) => `Kamu sektörüne yapılan başvurular kendine özgü kurallara tabidir. ${job} ön yazınız kamu hizmetine olan bağlılığınızı, düzenleyici çerçeveye hakimiyetinizi ve yerleşik idari prosedürlere uygun çalışma kapasitenizi göstermelidir.`,
  Legal: (job) => `Hukuk sektörü hem içerik hem de biçim açısından kusursuz bir ${job} ön yazısı talep eder. İşe alım uzmanları entelektüel titizliğinizi, analiz kapastenizi ve hukuki terminolojiye hakimiyetinizi değerlendirir. Her cümle meslekte beklenen hassasiyet ve detaylara özeni yansıtmalıdır.`,
  Science: (job) => `Bilimsel pozisyonlar, analitik yaklaşımınızı ve araştırmaya katkılarınızı öne çıkaran bir ${job} ön yazısı gerektirir. İşe alım uzmanları metodolojik titizliğinizin, önemli yayın veya projelerinizin ve karmaşık kavramları anlaşılır kılma becerinizin kanıtlarını görmek ister.`,
  Fitness: (job) => `Spor ve sağlıklı yaşam sektöründe ${job} ön yazınız rehberlik tutkunuzu ve teknik uzmanlığınızı aktarmalıdır. İşverenler müşterilerinin sağlığına ve gelişimine gerçek bir bağlılık gösteren, sertifikalı profesyoneller arar.`,
  Cleaning: (job) => `Temizlik pozisyonları için etkili bir ${job} ön yazısı güvenilirliğinizi, detaylara özeninizi ve profesyonel temizlik ürün ve tekniklerine hakimiyetinizi vurgular. İşverenler dakik, bağımsız çalışabilen ve yüksek temizlik standartlarını korumaya özen gösteren adayları tercih eder.`,
  'Entry-Level': (job) => `İlk işiniz için hazırladığınız ${job} ön yazısı, deneyim eksikliğini coşku, motivasyon ve öğreniminiz veya stajlarınız sırasında kazandığınız transfer edilebilir becerilerle telafi etmelidir. İşe alım uzmanları hızlı öğrenme potansiyeli ve gerçek bir katkı isteği gösteren yeni mezunları değerli bulur.`,
  Business: (job) => `İş dünyası, stratejik bakış açınızı ve sonuç odaklılığınızı gösteren bir ${job} ön yazısı talep eder. İşe alım uzmanları şirketin büyümesine katkı sağlayabilecek, ticari zorlukları net bir şekilde kavrayan ve somut çözümler önerebilen adaylar arar.`,
  default: (job) => `Etkili bir ${job} ön yazısı, becerileriniz ile şirketin spesifik ihtiyaçları arasında doğrudan bir bağlantı kurar. Pozisyonu anladığınızı gösterir, en ilgili başarılarınızı öne çıkarır ve bu profesyonel fırsat için samimi motivasyonunuzu aktarır.`,
};

// ─── TAGS GENERATOR ─────────────────────────────────────────────────────────
// Tags based on Turkish cover letter search keywords from CSV:
// ön yazı örnekleri (5K), ön yazı örneği (500), iş başvurusu ön yazı (500),
// cv ön yazı örnekleri (500), önyazı örnekleri (500)

export function generateTags(jobTitle, slug) {
  const lower = jobTitle.toLowerCase();
  return [
    `${lower} ön yazı örneği`,
    `${lower} ön yazı`,
    `iş başvurusu ön yazı ${lower}`,
    `ön yazı örnekleri`,
    `önyazı örneği`,
    `iş başvurusu ön yazı`,
    `ön yazı nasıl yazılır`,
    `cv ön yazı örnekleri`,
  ];
}

// ─── FAQ GENERATOR ──────────────────────────────────────────────────────────

export function generateFAQ(jobTitle) {
  const lower = jobTitle.toLowerCase();
  return [
    {
      question: `${jobTitle} pozisyonu için ön yazı nasıl hazırlanır?`,
      answer: `Şirketi ve hedeflediğiniz pozisyonu belirten kişiselleştirilmiş bir giriş ile başlayın. Ardından ${lower} pozisyonunun gereksinimleriyle doğrudan ilgili iki veya üç somut başarınızı, rakamlar ve ölçülebilir sonuçlarla geliştirin. Son olarak motivasyonunuzu ifade eden ve mülakat öneren bir kapanışla bitirin.`,
    },
    {
      question: `${jobTitle} ön yazısı ne kadar uzun olmalıdır?`,
      answer: `Bir ${lower} ön yazısı tek sayfada, yaklaşık 250-400 kelime aralığında tutulmalıdır. İşe alım uzmanları her başvuruya kısa süre ayırır; bu nedenle öz ve etkili olmayı tercih edin. Her paragraf, hedeflediğiniz pozisyon için yeni ve anlamlı bir bilgi sunmalıdır.`,
    },
    {
      question: `${jobTitle} ön yazısında CV'deki bilgiler tekrarlanmalı mıdır?`,
      answer: `Hayır, ön yazı CV'nizin tekrarı olmamalıdır. Aksine CV'nizi tamamlamalı; başarılarınızın bağlamını açıklamalı, kariyer geçişlerinizi anlatmalı ve profesyonel kişiliğinizi aktarmalıdır. Ön yazıyı rakamların arkasındaki hikayeyi anlatmak ve ${lower} olarak motivasyonunuzu göstermek için kullanın.`,
    },
    {
      question: `${jobTitle} pozisyonuna başvururken ön yazı göndermek her zaman gerekli midir?`,
      answer: `İş ilanı açıkça talep etmese bile, iyi hazırlanmış bir ${lower} ön yazısı eşit yetkinlikteki iki aday arasında fark yaratabilir. Ciddiyetinizi, pozisyona gerçek ilginizi ve profesyonel iletişim becerinizi gösterir.`,
    },
  ];
}

// ─── BODY GENERATOR ─────────────────────────────────────────────────────────

export function generateBody(jobTitle, category, keySkills, slug) {
  const lower = jobTitle.toLowerCase();
  const skills = keySkills || [];
  const topSkills = skills.slice(0, 4).join(', ') || 'pozisyona özgü temel beceriler';
  const skill1 = skills[0] || 'proje yönetimi';
  const skill2 = skills[1] || 'takım çalışması';
  const skill3 = skills[2] || 'iletişim';
  const skill4 = skills[3] || 'problem çözme';

  const norm = normalizeCategory(category);
  const opener = (CATEGORY_OPENERS[norm] || CATEGORY_OPENERS.default)(jobTitle);

  return `
## ${jobTitle} Ön Yazısını Öne Çıkaran Unsurlar

${opener}

Bir ${lower} pozisyonu için ikna edici bir ön yazı, yalnızca geçmişinizi özetlemekle yetinmez. Pozisyonun ve şirketin gereksinimlerini anlamak için vakit ayırdığınızı ve bunlara cevap verecek spesifik becerilere sahip olduğunuzu gösterir. Bu, profesyonel kişiliğinizi sergileme ve diğer adaylardan sıyrılma fırsatınızdır.

## ${jobTitle} Ön Yazı Örneği

> **Konu: ${jobTitle} Pozisyonu Başvurusu — Ref. [İlan Referansı]**
>
> Sayın Yetkili,
>
> [İlan Kaynağı]'nda yayınlanan ${lower} pozisyonu ilanınız dikkatimi hemen çekti. ${skill1} ve ${skill2} alanlarındaki deneyimimle, [Şirket Adı]'na önemli bir katkı sağlayabileceğime inanıyorum.
>
> [Mevcut/Önceki Şirket]'te ${topSkills} alanlarında sağlam bir uzmanlık geliştirme fırsatı buldum. En dikkat çekici başarılarım arasında [${skill1} ile ilgili rakamsal bir başarı örneği] yer almaktadır; bu sayede ekibin sonuçlarında ölçülebilir bir iyileşme sağladım. ${skill3} konusundaki yetkinliğim de [${skill3} ile ilgili bir katkı örneği] gerçekleştirmeme olanak tanıdı.
>
> [Şirket Adı]'ndaki bu pozisyonda beni özellikle motive eden husus [şirkete veya pozisyona özgü bir neden]'dir. ${skill4} becerilerim ve sektördeki deneyimimle hedeflerinize etkin bir şekilde katkı sağlayabileceğime emindir.
>
> Başvurumu bir mülakat sırasında tartışmaktan ve deneyimimin beklentilerinizi nasıl karşılayabileceğini daha ayrıntılı sunmaktan memnuniyet duyarım. Uygun gördüğünüz her zaman görüşmeye hazırım.
>
> Saygılarımla,
>
> [Adınız Soyadınız]

*Bu örneği, köşeli parantez içindeki bilgileri kendi kişisel bilgileriniz ve hedeflediğiniz şirketin bilgileriyle değiştirerek uyarlayın.*

## Etkili Bir Ön Yazının Temel Unsurları

### Kişiselleştirilmiş Giriş

"Size başvurumu iletmek istiyorum" gibi genel kalıplardan kaçının. Şirket adını, pozisyon referansını ve ilginizi çeken belirli bir nedeni belirtin. İşe alım uzmanları, girişinizin düzinelerce şirkete gönderilen bir kopyala-yapıştır olup olmadığını anında fark eder. ${lower} olarak, şirketin yakın zamandaki bir projesi, bir haber haberi veya geçmişinizle örtüşen bir değerinden bahsedin.

### Rakamlarla Desteklenmiş Başarılar

Her iddia somut rakamlarla desteklenmelidir. "Süreçleri iyileştirdim" yerine "${skill1} alanında yeni bir yöntem uygulayarak işlem süresini %30 kısalttım" yazın. Ölçülebilir sonuçlar başvurunuza güvenilirlik kazandırır ve işe alım uzmanının bir ${lower} olarak yaptığınız işin gerçek etkisini değerlendirmesini sağlar.

### Şirketle Bağlantı Kurma

Şirket hakkında derinlemesine araştırma yaptığınızı gösterin. ${topSkills} alanındaki becerilerinizle katkı sağlayabileceğiniz bir zorluk veya stratejik hedef belirleyin. Bu bölüm, başvurunuzun hedefli ve düşünülmüş olduğunu — yalnızca fırsatçı olmadığını — kanıtlar. İşe alım uzmanları daha ilk mülakattan önce bağlamlarını anlayan adayları değerli bulur.

### Değer Önerisiyle Kapanış

Kapanışınız salt bir nezaket formülü olmamalıdır. Tek bir cümleyle benzersiz katkınızı özetleyin ve somut olarak bir mülakat teklif edin. ${lower} pozisyonuna olan coşkunuzu yeniden ifade edin ve müsaitliğinizi belirtin. Güçlü bir kapanış kalıcı bir izlenim bırakır ve işe alım uzmanını sizinle iletişime geçmeye teşvik eder.

## Deneyim Düzeyine Göre İpuçları

### Yeni Mezunlar

Önemli bir iş deneyimi olmadan, stajlarınıza, akademik projelerinize ve transfer edilebilir becerilerinize odaklanın. Eğitiminizin sizi ${lower} pozisyonuna nasıl hazırladığını açıklayın. Motivasyonunuzu, hızlı öğrenme kapasitenizi ve ilgili ders dışı faaliyetlerinizi öne çıkarın. İşe alım uzmanları yeni başladığınızı bilir — onlar tamamlanmış bir kariyer değil, potansiyel arar.

### Deneyimli Profesyoneller

Birkaç yıllık deneyimle, hedeflediğiniz ${lower} pozisyonuyla en ilgili iki veya üç başarıyı seçin. Her şeyi kapsamaya çalışmayın — katma değerinizi en iyi gösteren sonuçlara odaklanın. Profesyonel gelişiminizi ve artan sorumluluklar üstlenme kapasitenizi gösterin. Rakamlar ve somut örnekler en güçlü müttefiklerinizdir.

### Üst Düzey Yöneticiler

Bu seviyede ${jobTitle} ön yazınız stratejik vizyonunuzu ve ekipler ile büyük ölçekli projeleri yönetme kapasitenizi yansıtmalıdır. Şirket ölçeğindeki başarılarınızı öne çıkarın: başarılı dönüşümler, sağlanan tasarruflar, kurulan ekipler. Güvenli ancak erişilebilir bir ton benimseyin ve pozisyonun hem operasyonel hem de stratejik boyutlarını anladığınızı gösterin.

## Ön Yazılarda Yapılan Yaygın Hatalar

- **Kişiselleştirilmemiş genel bir ön yazı göndermek** — İşe alım uzmanları toplu gönderilen standart bir ön yazıyı anında tespit eder. Her ${lower} başvurusu, şirketi, pozisyonu ve ilginizin özel nedenlerini belirten uyarlanmış bir ön yazıyı hak eder.

- **CV'yi kelimesi kelimesine tekrarlamak** — Ön yazınız CV'nizi çoğaltmamalı, tamamlamalıdır. Başarılarınızın bağlamını geliştirmek, kariyer geçişlerinizi açıklamak ve profesyonel kişiliğinizi aktarmak için kullanın.

- **Her cümleye "Ben" ile başlamak** — Yalnızca kendinize odaklanan bir ön yazı perspektif eksikliği gösterir. Sunduklarınız ile şirketin aradığı arasında denge kurun. ${lower} pozisyonunun gereksinimlerini anladığınızı ve bunlara nasıl cevap verdiğinizi gösterin.

- **Biçimi ve imlayı ihmal etmek** — Yazım hataları veya düzensiz bir düzene sahip bir ön yazı, profesyonel titizliğiniz hakkında olumsuz bir sinyal gönderir. Göndermeden önce metninizi dikkatlice gözden geçirin ve üçüncü bir kişiye kontrol ettirin.

- **Harekete geçirici bir kapanış yapmamak** — Somut bir sonraki adım önermeden (mülakat, telefon görüşmesi, müsaitlik) bitirmek, işe alım uzmanını yönsüz bırakır. Her zaman net bir teklifle ve müsaitliğinizi belirterek bitirin.

## Ön Yazınızı Profesyonel Bir CV ile Tamamlayın

Etkili bir ön yazı, seviyesine uygun bir CV'yi hak eder. ${lower} başvurunuzun başından sonuna tutarlı olmasını sağlayın:

- [Profesyonel CV'nizi oluşturun](/tr/builder) — ATS sistemleri için optimize edilmiş ücretsiz ve kullanıcı dostu aracımızla
- [${lower} CV örneğimizi inceleyin](/tr/resume-examples/${slug}) — Sektörünüze uygun şablonlardan ilham alın
- [Ön yazınızı otomatik olarak oluşturun](/tr/tools/cover-letter) — Profilinize göre içeriği uyarlayan yapay zeka asistanımızla

Eksiksiz ve tutarlı bir başvuru — özenli bir CV, kişiselleştirilmiş bir ön yazı — hedeflediğiniz ${lower} pozisyonu için mülakat şansınızı önemli ölçüde artırır.
`;
}
