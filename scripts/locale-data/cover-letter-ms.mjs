/**
 * Malay (ms) locale data for cover letter example generation.
 * Imported by generate-locale-cover-letters.mjs via:
 *   await import('./locale-data/cover-letter-ms.mjs')
 *
 * Keyword source: seo/malay-top-100-keywords.csv
 * Top terms: surat iringan (5K), surat permohonan kerja (2K), contoh surat iringan (1K),
 *            surat motivasi (500), surat permohonan jawatan (500), cover letter (500)
 */

import { JOB_TITLES as RESUME_TITLES } from './resume-ms.mjs';

// ─── CONFIG ─────────────────────────────────────────────────────────────────

export const CONFIG = {
  author: 'Nurul Aisyah',
  authorBio: 'Perunding kerjaya dan pakar penulisan surat iringan dengan lebih 10 tahun pengalaman membantu profesional Malaysia mendapat pekerjaan idaman. Mahir dalam pasaran kerja Malaysia, strategi permohonan kerja, dan pengoptimuman dokumen untuk sistem ATS.',
  titlePattern: (job) => `Contoh Surat Iringan ${job} | Panduan Menulis 2026`,
  descriptionPattern: (job) => `Contoh surat iringan ${job} dan surat permohonan kerja yang berkesan. Panduan lengkap menulis surat iringan profesional dengan templat, contoh, dan tips untuk pasaran kerja Malaysia 2026.`,
};

// ─── JOB TITLES (English → Malay) ───────────────────────────────────────────

export const JOB_TITLES = {
  ...RESUME_TITLES,
  'Bookkeeper': 'Penyimpan Kira-kira',
  'Corporate Trainer': 'Jurulatih Korporat',
  'Customer Service Representative': 'Wakil Khidmat Pelanggan',
  'EMT/Paramedic': 'Paramedik',
  'Frontend Developer': 'Pembangun Frontend',
  'Healthcare Administrator': 'Pentadbir Penjagaan Kesihatan',
  'Human Resources Manager': 'Pengurus Sumber Manusia',
  'Machinist': 'Jurumesin',
  'Registered Nurse': 'Jururawat Berdaftar',
  'Solutions Architect': 'Arkitek Penyelesaian',
  'Systems Administrator': 'Pentadbir Sistem',
  'Tax Accountant': 'Akauntan Cukai',
};

// ─── CATEGORIES (English → Malay) ───────────────────────────────────────────

export const CATEGORIES = {
  Technology: 'Teknologi',
  Healthcare: 'Penjagaan Kesihatan',
  'Food Service': 'Perkhidmatan Makanan',
  Hospitality: 'Hospitaliti',
  Trades: 'Pertukangan',
  Creative: 'Kreatif',
  Education: 'Pendidikan',
  Marketing: 'Pemasaran',
  Government: 'Kerajaan',
  Business: 'Perniagaan',
  Sales: 'Jualan',
  Engineering: 'Kejuruteraan',
  'Business & Finance': 'Perniagaan & Kewangan',
  Legal: 'Undang-undang',
  HR: 'Sumber Manusia',
  'Skilled Trades': 'Pertukangan Mahir',
  'Real Estate': 'Hartanah',
  'Customer Service': 'Khidmat Pelanggan',
  'Animal Care': 'Penjagaan Haiwan',
  Administrative: 'Pentadbiran',
  Transportation: 'Pengangkutan',
  Logistics: 'Logistik',
  Fitness: 'Kecergasan',
  Cleaning: 'Pembersihan',
  Retail: 'Runcit',
  Management: 'Pengurusan',
  'Social Services': 'Perkhidmatan Sosial',
  Manufacturing: 'Pembuatan',
  Accounting: 'Perakaunan',
  Construction: 'Pembinaan',
  Security: 'Keselamatan',
  Science: 'Sains',
  'Health & Fitness': 'Kesihatan & Kecergasan',
  Research: 'Penyelidikan',
  Finance: 'Kewangan',
  'Writing & Content': 'Penulisan & Kandungan',
  'Supply Chain': 'Rantaian Bekalan',
  Quality: 'Kawalan Kualiti',
  Media: 'Media',
  Maritime: 'Maritim',
  'Law Enforcement': 'Penguatkuasaan Undang-undang',
  Facilities: 'Pengurusan Fasiliti',
  Executive: 'Eksekutif',
  Events: 'Acara',
  'Entry-Level': 'Peringkat Permulaan',
  Entrepreneurship: 'Keusahawanan',
  Consulting: 'Perundingan',
  Childcare: 'Penjagaan Kanak-kanak',
  'Banking & Finance': 'Perbankan & Kewangan',
  Banking: 'Perbankan',
  Aviation: 'Penerbangan',
  Automotive: 'Automotif',
  Architecture: 'Seni Bina',
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

export { normalizeCategory };

// ─── CATEGORY OPENERS ───────────────────────────────────────────────────────

const CATEGORY_OPENERS = {
  Technology: (job) => `Dalam bidang teknologi, surat iringan ${job} bukan sekadar menyenaraikan kemahiran teknikal — ia perlu menunjukkan bagaimana kepakaran anda menyelesaikan masalah sebenar dan mencipta nilai perniagaan. Pengurus pengambilan mencari hubungan langsung antara pengetahuan khusus anda dan keperluan jawatan yang ditawarkan.`,
  Healthcare: (job) => `Dalam bidang penjagaan kesihatan, dedikasi tulen terhadap penjagaan pesakit amat dihargai. Surat iringan ${job} perlu mempamerkan kedua-dua keupayaan klinikal dan sifat kemanusiaan anda. Pengurus pengambilan mencari calon yang memahami aspek etika dan kemanusiaan tugas, selain kelayakan teknikal.`,
  Finance: (job) => `Pengurus pengambilan dalam bidang kewangan dan perakaunan mahukan calon yang menggabungkan kemahiran analisis dengan ketelitian. Surat iringan ${job} perlu menunjukkan keupayaan anda melaksanakan tugas kewangan dengan tepat dan mematuhi piawaian peraturan industri.`,
  'Food Service': (job) => `Dalam industri perkhidmatan makanan, surat iringan ${job} perlu menyampaikan keghairahan terhadap makanan dan kebolehan bekerja dalam persekitaran yang pantas. Pengurus pengambilan menghargai calon yang menunjukkan kerja berpasukan, pengetahuan kebersihan, dan sikap serius terhadap pengalaman pelanggan.`,
  Hospitality: (job) => `Dalam industri hospitaliti, calon yang mewujudkan kecemerlangan perkhidmatan sangat dihargai. Surat iringan ${job} perlu menunjukkan semangat keramahan, perhatian terhadap perincian, dan keupayaan menyediakan pengalaman yang tidak dapat dilupakan kepada tetamu.`,
  Trades: (job) => `Dalam bidang pertukangan, surat iringan ${job} yang berkesan menekankan pengalaman praktikal, sijil, dan kesedaran keselamatan. Pengurus pengambilan mencari pekerja mahir yang boleh dipercayai, bekerja secara bebas, dan menghasilkan kerja berkualiti tinggi dalam tempoh yang ditetapkan.`,
  Engineering: (job) => `Dalam bidang kejuruteraan, surat iringan ${job} perlu menunjukkan keupayaan menyelesaikan masalah kompleks secara sistematik. Pengurus pengambilan mencari bukti projek yang berjaya dilaksanakan, kemahiran alat teknikal, dan pemahaman terhadap kekangan industri.`,
  Creative: (job) => `Dalam bidang kreatif, surat iringan ${job} itu sendiri menjadi contoh keupayaan anda. Tunjukkan bakat artistik sambil membuktikan pemahaman terhadap matlamat perniagaan dan kebolehan memenuhi tarikh akhir.`,
  Education: (job) => `Dalam bidang pendidikan, calon yang menunjukkan semangat tulen terhadap penyampaian ilmu sangat dihargai. Surat iringan ${job} perlu mencerminkan falsafah pendidikan anda, keupayaan menyesuaikan diri dengan pelajar pelbagai latar belakang, dan sumbangan terhadap pencapaian pendidikan.`,
  Administrative: (job) => `Dalam jawatan pentadbiran, surat iringan ${job} perlu menunjukkan kemahiran organisasi, keupayaan menjaga kerahsiaan, dan kepelbagaian kemahiran. Pengurus pengambilan mencari calon yang boleh menjangka keperluan dan menguruskan pelbagai keutamaan serentak.`,
  Sales: (job) => `Surat iringan ${job} adalah persembahan jualan pertama anda. Pengurus pengambilan menilai keupayaan komunikasi yang meyakinkan, kebolehan mengenal pasti keperluan pelanggan, dan cadangan nilai yang jelas.`,
  Marketing: (job) => `Dalam bidang pemasaran, surat iringan ${job} perlu menunjukkan pemahaman strategi komunikasi dan keupayaan menghasilkan keputusan yang boleh diukur. Buktikan pemikiran strategik dan keupayaan pelaksanaan dengan contoh konkrit.`,
  HR: (job) => `Dalam bidang sumber manusia, surat iringan ${job} perlu menunjukkan pemahaman terhadap dinamik organisasi dan aspek kemanusiaan syarikat. Tunjukkan keupayaan mengimbangi kepentingan pekerja dan kepentingan organisasi.`,
  'Customer Service': (job) => `Dalam jawatan khidmat pelanggan, surat iringan ${job} perlu menunjukkan kebolehan mendengar, kesabaran, dan kemahiran penyelesaian masalah. Pengurus pengambilan mencari calon yang boleh mengubah situasi sukar menjadi pengalaman positif untuk pelanggan.`,
  Logistics: (job) => `Dalam bidang logistik, ketepatan dan kecekapan kerja amat dihargai. Surat iringan ${job} perlu menunjukkan keupayaan menguruskan operasi kompleks, memenuhi tarikh akhir, dan mengoptimumkan proses.`,
  Government: (job) => `Permohonan jawatan kerajaan mengikut amalan yang berbeza daripada sektor swasta. Surat iringan ${job} perlu menunjukkan kesedaran perkhidmatan awam, pemahaman rangka kerja peraturan, dan keupayaan bekerja dalam prosedur yang ditetapkan.`,
  Legal: (job) => `Dalam bidang undang-undang, surat iringan ${job} mestilah sempurna dari segi kandungan dan format. Pengurus pengambilan menilai ketajaman intelektual, kemahiran analisis, dan penguasaan istilah undang-undang.`,
  Science: (job) => `Dalam bidang sains, surat iringan ${job} perlu menunjukkan pendekatan analisis dan sumbangan penyelidikan. Buktikan ketelitian metodologi, penerbitan atau projek utama, dan keupayaan menjelaskan konsep kompleks dengan cara yang mudah difahami.`,
  Fitness: (job) => `Dalam bidang kecergasan dan kesejahteraan, surat iringan ${job} perlu menyampaikan keghairahan terhadap bimbingan dan kepakaran profesional. Pengurus pengambilan mencari profesional berkelayakan yang benar-benar menyumbang kepada kesihatan dan perkembangan pelanggan.`,
  Cleaning: (job) => `Dalam bidang pembersihan, surat iringan ${job} perlu menunjukkan kebolehpercayaan, perhatian terhadap perincian, dan pengetahuan teknik pembersihan profesional. Pengurus pengambilan menghargai calon yang menepati masa dan boleh mengekalkan piawaian kebersihan tinggi secara bebas.`,
  'Entry-Level': (job) => `Bagi graduan baru atau mereka yang bertukar kerjaya, surat iringan ${job} perlu mengimbangi kekurangan pengalaman dengan keghairahan, motivasi, dan kemahiran boleh pindah yang diperoleh daripada pengajian atau latihan industri. Pengurus pengambilan menghargai kebolehan belajar dengan cepat dan komitmen tulen untuk menyumbang.`,
  Business: (job) => `Dalam bidang perniagaan, surat iringan ${job} perlu menunjukkan pemikiran strategik dan orientasi hasil. Pengurus pengambilan mencari calon yang boleh menyumbang kepada pertumbuhan syarikat, memahami cabaran perniagaan dengan jelas, dan mencadangkan penyelesaian konkrit.`,
  default: (job) => `Surat iringan ${job} yang berkesan menunjukkan hubungan langsung antara kemahiran anda dan keperluan khusus syarikat. Sampaikan pemahaman terhadap jawatan, pencapaian yang paling relevan, dan semangat tulen terhadap peluang ini.`,
};

// ─── TAGS GENERATOR ─────────────────────────────────────────────────────────

export function generateTags(jobTitle, slug) {
  return [
    `surat iringan ${jobTitle}`,
    `contoh surat iringan ${jobTitle}`,
    `surat permohonan kerja ${jobTitle}`,
    `surat iringan profesional`,
    `contoh surat permohonan jawatan`,
    `templat surat iringan`,
    `panduan surat iringan 2026`,
    `surat permohonan kerja Malaysia`,
  ];
}

// ─── FAQ GENERATOR ──────────────────────────────────────────────────────────

export function generateFAQ(jobTitle) {
  return [
    {
      question: `Bagaimana cara menulis surat iringan untuk jawatan ${jobTitle}?`,
      answer: `Mulakan dengan pengenalan yang disesuaikan — nyatakan nama syarikat dan jawatan yang dipohon. Seterusnya, huraikan 2-3 pencapaian khusus yang berkaitan dengan keperluan jawatan ${jobTitle}, lengkap dengan angka dan hasil yang boleh diukur. Akhiri dengan menyatakan motivasi permohonan anda dan memohon peluang temu duga.`,
    },
    {
      question: `Berapakah panjang surat iringan ${jobTitle} yang sesuai?`,
      answer: `Surat iringan ${jobTitle} yang ideal adalah satu muka surat sahaja, sekitar 300-500 patah perkataan. Pengurus pengambilan tidak mempunyai banyak masa untuk setiap permohonan, jadi utamakan keringkasan dan impak. Pastikan setiap perenggan menyampaikan maklumat baharu yang berkaitan dengan jawatan yang dipohon.`,
    },
    {
      question: `Bolehkah saya mengulang kandungan resume dalam surat iringan?`,
      answer: `Tidak sepatutnya. Surat iringan adalah pelengkap resume, bukan salinannya. Gunakan surat iringan untuk menjelaskan latar belakang pencapaian anda, menyampaikan motivasi bertukar kerja, dan mendalami pencapaian yang paling relevan. Ceritakan kisah di sebalik angka dan tunjukkan personaliti profesional anda.`,
    },
    {
      question: `Adakah surat iringan masih diperlukan untuk memohon jawatan ${jobTitle}?`,
      answer: `Walaupun tidak dinyatakan dalam iklan jawatan, surat iringan ${jobTitle} yang ditulis dengan teliti membezakan anda daripada calon lain yang mempunyai kemahiran serupa. Ia menunjukkan kesungguhan anda, minat tulen terhadap jawatan tersebut, dan keupayaan berkomunikasi secara profesional.`,
    },
  ];
}

// ─── BODY GENERATOR ─────────────────────────────────────────────────────────

export function generateBody(jobTitle, category, keySkills, slug) {
  const skills = keySkills || [];
  const topSkills = skills.slice(0, 4).join(', ') || 'kemahiran utama berkaitan jawatan';
  const skill1 = skills[0] || 'pengurusan projek';
  const skill2 = skills[1] || 'kerja berpasukan';
  const skill3 = skills[2] || 'komunikasi';
  const skill4 = skills[3] || 'penyelesaian masalah';

  const norm = normalizeCategory(category);
  const opener = (CATEGORY_OPENERS[norm] || CATEGORY_OPENERS.default)(jobTitle);

  return `
## Perkara Penting dalam Surat Iringan ${jobTitle} yang Berkesan

${opener}

Surat iringan ${jobTitle} yang meyakinkan bukan sekadar meringkaskan pengalaman kerjaya anda. Ia adalah peluang untuk menunjukkan bahawa anda memahami cabaran jawatan dan syarikat, serta mempunyai kemahiran khusus untuk menanganinya. Sampaikan profesionalisme anda dan bezakan diri daripada calon lain.

## Contoh Surat Iringan ${jobTitle}

> **Perkara: Permohonan Jawatan ${jobTitle} (Rujukan: [Nombor Rujukan])**
>
> Tuan/Puan yang dihormati,
>
> Saya menulis surat ini untuk memohon jawatan ${jobTitle} yang diiklankan di [nama platform pengambilan]. Dengan pengalaman dalam bidang ${skill1} dan ${skill2}, saya yakin dapat menyumbang secara bermakna kepada organisasi tuan/puan.
>
> Sepanjang kerjaya saya di [syarikat semasa/terdahulu], saya telah membina kepakaran kukuh dalam ${topSkills}. Antara pencapaian yang boleh diketengahkan, saya berjaya [pencapaian khusus berkaitan ${skill1} dengan angka konkrit] yang meningkatkan prestasi pasukan dengan ketara. Selain itu, saya menggunakan kemahiran ${skill3} untuk [contoh sumbangan berkaitan ${skill3}].
>
> Saya amat berminat dengan jawatan ini di organisasi tuan/puan kerana [sebab khusus berkaitan syarikat atau jawatan]. Dengan kemahiran ${skill4} dan pengalaman industri saya, saya percaya dapat menyumbang dengan berkesan kepada pencapaian matlamat organisasi tuan/puan.
>
> Saya amat mengharapkan peluang temu duga untuk menjelaskan dengan lebih lanjut bagaimana pengalaman saya memenuhi keperluan jawatan ini.
>
> Yang benar,
>
> [Nama Penuh]

*Gantikan maklumat dalam kurungan segi empat dengan maklumat peribadi dan maklumat syarikat yang dipohon.*

## Elemen Utama Surat Iringan yang Berkesan

### Pengenalan yang Disesuaikan

Elakkan ungkapan klise seperti "Dengan ini saya ingin memohon jawatan...". Nyatakan nama syarikat, nombor rujukan jawatan, dan sebab khusus permohonan anda. Pengurus pengambilan boleh mengesan pengenalan generik yang disalin dan ditampal. Sebut projek terkini syarikat atau nilai korporat yang selari dengan kerjaya anda.

### Pencapaian Berangka

Setiap dakwaan perlu disokong dengan angka konkrit. Daripada menulis "saya memperbaiki proses", tulislah "saya memperkenalkan kaedah baharu dalam ${skill1} yang mengurangkan masa pemprosesan sebanyak 30%". Hasil yang boleh diukur meningkatkan kredibiliti calon dan memudahkan pengurus pengambilan menilai impak sebenar kerja anda sebagai ${jobTitle}.

### Hubungan dengan Syarikat

Tunjukkan bahawa anda telah membuat kajian yang mencukupi tentang syarikat tersebut. Kenal pasti cabaran atau matlamat strategik yang boleh anda tangani dengan kemahiran ${topSkills}. Bahagian ini membuktikan bahawa permohonan anda adalah hasil pertimbangan teliti, bukan permohonan yang dihantar secara pukal.

### Penutup dengan Cadangan Nilai

Penutup bukan sekadar ucapan terima kasih. Ringkaskan kekuatan unik anda dalam satu ayat dan cadangkan temu duga secara khusus. Tegaskan semula keghairahan anda terhadap jawatan ${jobTitle} dan nyatakan kesediaan anda untuk perbincangan lanjut.

## Panduan Mengikut Peringkat Kerjaya

### Graduan Baru / Peringkat Permulaan

Jika pengalaman kerja anda terhad, gunakan latihan industri, projek akademik, dan kemahiran boleh pindah. Jelaskan bagaimana pengajian anda menyediakan anda untuk jawatan ${jobTitle}. Tekankan semangat, kebolehan belajar dengan cepat, dan pengalaman aktiviti berkaitan.

### Profesional Berpengalaman

Dengan beberapa tahun pengalaman, pilih 2-3 pencapaian yang paling berkaitan dengan jawatan ${jobTitle} yang dipohon. Jangan cuba merangkumi segala-galanya — fokus pada hasil yang paling berkesan menunjukkan nilai tambah anda.

### Peringkat Kanan / Pengurusan

Pada peringkat ini, surat iringan ${jobTitle} perlu mencerminkan visi strategik dan keupayaan memimpin pasukan serta projek berskala besar. Ketengahkan pencapaian peringkat organisasi: transformasi yang berjaya, penjimatan kos yang direalisasikan, dan pasukan yang dibina.

## Kesilapan Lazim dalam Surat Iringan

- **Menghantar surat iringan generik tanpa penyesuaian** — Pengurus pengambilan mudah mengesan surat yang dihantar secara pukal. Untuk setiap permohonan ${jobTitle}, sesuaikan surat dengan nama syarikat, jawatan, dan sebab khusus permohonan anda.

- **Mengulang kandungan resume secara verbatim** — Surat iringan adalah pelengkap resume, bukan salinannya. Gunakan ia untuk menjelaskan konteks pencapaian, menerangkan pertukaran kerjaya, dan menyampaikan personaliti profesional anda.

- **Memulakan setiap ayat dengan "Saya"** — Surat iringan yang terlalu berpusatkan diri memberi tanggapan pandangan yang sempit. Selang-selikan antara apa yang anda tawarkan dan apa yang syarikat perlukan.

- **Membiarkan kesilapan ejaan atau format yang tidak konsisten** — Surat iringan dengan kesilapan ejaan adalah isyarat negatif tentang profesionalisme anda. Semak sebelum menghantar dan minta orang lain untuk menyemak juga.

- **Menutup surat tanpa cadangan tindakan khusus** — Tanpa cadangan temu duga atau panggilan telefon, anda tidak memberi arahan langkah seterusnya kepada pengurus pengambilan. Sentiasa tutup dengan cadangan yang jelas dan kesediaan jadual.

## Lengkapkan Surat Iringan Anda dengan Resume Profesional

Surat iringan yang meyakinkan memerlukan resume yang setaraf. Pastikan keseluruhan dokumen permohonan ${jobTitle} anda konsisten:

- [Alat pembina resume percuma](/ms/builder) untuk mencipta resume profesional yang dioptimumkan ATS
- [Contoh resume ${jobTitle}](/ms/resume-examples/${slug}) untuk rujukan templat yang sesuai dengan industri
- [Alat penulis surat iringan AI](/ms/tools/cover-letter) untuk menjana surat iringan yang disesuaikan dengan profil anda

Set dokumen permohonan yang lengkap — resume yang tersusun dan surat iringan yang disesuaikan — meningkatkan peluang anda untuk dipanggil temu duga bagi jawatan ${jobTitle} dengan ketara.
`;
}
