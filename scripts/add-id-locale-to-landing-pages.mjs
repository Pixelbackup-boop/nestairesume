/**
 * SESSION 5: Add Indonesian (id) locale to 18 landing page TypeScript files
 * Usage: node scripts/add-id-locale-to-landing-pages.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const contentDir = resolve(__dirname, '../frontend/lib/content');

// ─── Indonesian locale content blocks ────────────────────────────────────────

const FREE_RESUME_BUILDER_ID = `
const id: LandingPageContent = {
  meta: {
    title: 'Pembuat CV Gratis | Buat CV Online ATS-Friendly 2026',
    description: 'Buat CV gratis secara online. Tanpa kartu kredit, tanpa biaya tersembunyi. Penulisan AI, 20+ template ATS, dan unduh PDF langsung.',
    keywords: 'pembuat cv gratis, buat cv online gratis, cv gratis, template cv gratis, pembuat cv online, buat cv gratis',
  },
  schemas: {
    breadcrumbName: 'Pembuat CV Gratis',
    articleHeadline: 'Pembuat CV Gratis: Buat CV Online dengan AI 2026',
    articleDescription: 'Buat CV gratis secara online. Tanpa kartu kredit, tanpa biaya tersembunyi. Penulisan AI, template ATS, dan unduh PDF langsung.',
    softwareAppName: 'Pembuat CV Gratis dengan AI',
  },
  hero: {
    badge: '100% Gratis — Tanpa Kartu Kredit',
    title: 'Buat CV Anda',
    titleHighlight: 'sepenuhnya gratis',
    subtitle: '<strong>Pembuat CV gratis kami</strong> menawarkan segalanya: penulisan AI, template profesional, optimasi ATS, dan unduh PDF langsung. Menurut <a href="https://www.kemnaker.go.id/" target="_blank" rel="noopener noreferrer" class="text-green-600 hover:underline">Kemnaker</a>, pasar kerja Indonesia semakin kompetitif — CV profesional seharusnya tidak perlu biaya. Tanpa biaya tersembunyi. Tanpa masa percobaan.',
    ctaPrimary: 'Buat CV saya gratis',
    ctaSecondary: 'Lihat apa yang termasuk',
    trustBadges: ['Tanpa pendaftaran', 'Tanpa kartu kredit', 'Unduh PDF gratis', 'Tanpa watermark'],
  },
  features: {
    title: 'Semua yang Anda butuhkan — Gratis',
    subtitle: 'Tidak seperti pembuat CV lain yang mengenakan biaya untuk fitur dasar, di sini semua fitur termasuk dalam paket gratis. <a href="https://www.jobscan.co/blog/fortune-500-use-applicant-tracking-systems/" target="_blank" rel="noopener noreferrer" class="text-green-600 hover:underline">98% perusahaan besar</a> menggunakan ATS — Anda membutuhkan akses ke alat profesional.',
    items: [
      { feature: 'Template profesional', description: '20+ desain tersedia' },
      { feature: 'Penulisan konten AI', description: 'Pengalaman dan profil profesional' },
      { feature: 'Optimasi ATS', description: 'Penilaian real-time' },
      { feature: 'Unduh PDF', description: 'Ekspor tak terbatas' },
      { feature: 'Tanpa watermark', description: 'Hasil bersih dan profesional' },
      { feature: 'CV ganda', description: 'Buat sebanyak yang Anda inginkan' },
      { feature: 'Kata kunci industri', description: 'Disarankan oleh AI' },
      { feature: 'Ramah mobile', description: 'Buat dari perangkat apapun' },
    ],
    cta: 'Buat CV profesional',
  },
  comparison: {
    title: 'Gratis kami vs. "gratis" yang lain',
    subtitle: 'Banyak pembuat CV mengklaim gratis tapi memungut biaya untuk unduhan. Kami tidak.',
    oursName: 'Best AI Resumes (gratis)',
    othersName: 'Pembuat CV "gratis" lainnya',
    rows: [
      { feature: 'Unduh PDF', ours: 'Gratis dan tak terbatas', others: 'Biasanya berbayar' },
      { feature: 'Semua template', ours: '20+ semuanya gratis', others: '1-3 gratis, sisanya berbayar' },
      { feature: 'Penulisan AI', ours: 'Termasuk gratis', others: 'Fitur premium' },
      { feature: 'Penilaian ATS', ours: 'Real-time gratis', others: 'Premium atau tidak ada' },
      { feature: 'Watermark', ours: 'Tidak ada', others: 'Ada di versi gratis' },
      { feature: 'Akun wajib', ours: 'Opsional', others: 'Biasanya wajib' },
      { feature: 'Masa percobaan', ours: 'Tidak ada — gratis selamanya', others: 'Percobaan 7-14 hari' },
    ],
  },
  howItWorks: {
    title: 'Buat CV gratis dalam 3 langkah',
    subtitle: 'Tidak ada kejutan. Tidak ada hambatan berbayar. Hanya CV profesional.',
    steps: [
      { step: 1, title: 'Pilih template', description: 'Pilih dari 20+ template profesional yang telah diuji ATS — semuanya gratis.' },
      { step: 2, title: 'Masukkan informasi Anda', description: 'Isi data Anda dan biarkan AI membantu menulis konten yang efektif.' },
      { step: 3, title: 'Unduh gratis', description: 'Ekspor CV Anda sebagai PDF — tanpa pembayaran, tanpa watermark.' },
    ],
    cta: 'Buat CV profesional',
  },
  trust: {
    title: 'Dipercaya pencari kerja di seluruh dunia',
    stats: [
      { value: '2M+', label: 'CV yang dibuat gratis' },
      { value: '4.8', label: 'Rating rata-rata pengguna' },
      { value: '150+', label: 'Negara' },
      { value: 'Rp 0', label: 'Biaya unduhan' },
    ],
  },
  templates: {
    title: '20+ template CV profesional gratis',
    subtitle: 'Semua template gratis. Semua telah diuji untuk ATS. Temukan gaya yang sempurna untuk lamaran Anda.',
    styles: ['Modern', 'Klasik', 'Eksekutif', 'Kreatif', 'Minimalis', 'Profesional', 'Teknis', 'Akademik'],
    cta: 'Lihat semua template gratis',
  },
  faq: {
    title: 'Pertanyaan yang sering diajukan',
    items: [
      { question: 'Apakah pembuat CV ini benar-benar 100% gratis?', answer: 'Ya! Pembuat CV gratis kami menyertakan segalanya: 20+ template profesional, penulisan AI, optimasi ATS, dan unduhan PDF tak terbatas. Tanpa kartu kredit, tanpa biaya tersembunyi, tanpa masa percobaan.' },
      { question: 'Apa yang gratis dan apa yang berbayar?', answer: 'Semua fitur dasar gratis: semua template, penulisan AI, penilaian ATS, dan unduh PDF. Paket premium opsional menambahkan fitur lanjutan seperti pembuat surat lamaran, namun sebagian besar pengguna tidak membutuhkannya.' },
      { question: 'Mengapa pembuat CV ini gratis?', answer: 'Kami percaya setiap orang, apapun anggarannya, berhak mendapatkan akses ke alat CV profesional. Versi gratis didukung oleh peningkatan premium opsional dan kemitraan. Anda bisa membuat CV profesional lengkap tanpa membayar apapun.' },
      { question: 'Bisakah saya mengunduh CV saya sebagai PDF gratis?', answer: 'Tentu saja. Unduh CV Anda sebagai PDF yang bersih dan kompatibel ATS kapan saja — sepenuhnya gratis. Tanpa watermark, tanpa logo, tanpa syarat.' },
      { question: 'Apakah saya perlu membuat akun?', answer: 'Tidak! Anda bisa langsung mulai membuat CV tanpa mendaftar. Pekerjaan Anda disimpan secara lokal di browser. Buat akun hanya jika Anda ingin menyimpan beberapa CV atau mengakses dari perangkat berbeda.' },
      { question: 'Apakah template gratis kompatibel ATS?', answer: 'Ya, semua template di pembuat CV gratis kami telah diuji dengan sistem ATS terkemuka termasuk Workday, Taleo, Greenhouse, dan Lever. Penilaian ATS real-time membantu Anda mengoptimalkan CV sebelum melamar.' },
    ],
  },
  crossLinks: {
    title: 'Alat CV gratis lainnya',
    items: [
      { href: '/id/resume-maker', title: 'Pembuat CV', subtitle: 'Buat gratis dengan AI' },
      { href: '/id/resume-ai', title: 'CV dengan AI', subtitle: 'Penulisan bertenaga AI' },
      { href: '/id/tools/ats-checker', title: 'Cek ATS', subtitle: 'Penilaian ATS gratis' },
    ],
    guidesTitle: 'Panduan CV gratis',
    guides: [
      { href: '/id/blog/how-to-write-a-resume', label: 'Cara membuat CV (panduan gratis)' },
      { href: '/id/resume-format', label: 'Panduan format CV 2026' },
      { href: '/id/resume-examples', label: '300+ contoh CV gratis' },
      { href: '/id/templates', label: 'Template CV gratis' },
    ],
  },
  bottomCta: {
    title: 'Siap membuat CV gratis Anda?',
    description: 'Lebih dari 2 juta pencari kerja telah membuat CV profesional mereka dengan pembuat CV gratis kami.',
    cta: 'Buat CV gratis saya',
    subtext: 'Gratis selamanya. Tanpa kartu kredit. Tanpa biaya tersembunyi.',
  },
};
`;

const RESUME_MAKER_ID = `
const id: LandingPageContent = {
  meta: {
    title: 'Pembuat CV Online | Buat CV Profesional dengan AI 2026',
    description: 'Buat CV profesional dalam hitungan menit dengan pembuat CV online bertenaga AI. Template ATS, penulisan AI, dan unduh PDF langsung.',
    keywords: 'pembuat cv online, buat cv online, cv online gratis, pembuat cv, buat cv profesional, cv otomatis, generator cv online',
  },
  schemas: {
    breadcrumbName: 'Pembuat CV Online',
    articleHeadline: 'Pembuat CV Online Gratis: Buat CV Profesional dengan AI 2026',
    articleDescription: 'Buat CV profesional dalam hitungan menit dengan AI. Template ATS, penulisan AI, dan unduh PDF langsung.',
    softwareAppName: 'Best AI Pembuat CV',
  },
  hero: {
    badge: 'Pembuat CV Online Gratis dengan AI',
    title: 'CV profesional Anda',
    titleHighlight: 'siap dalam hitungan menit',
    subtitle: '<strong>Pembuat CV online kami</strong> menggunakan AI untuk menulis konten yang efektif, mengoptimalkan untuk ATS, dan membantu Anda mendapatkan lebih banyak panggilan interview. <a href="https://www.jobscan.co/blog/fortune-500-use-applicant-tracking-systems/" target="_blank" rel="noopener noreferrer" class="text-accent-blue hover:underline">98% perusahaan besar</a> menggunakan ATS — CV yang teroptimasi adalah keharusan. Tidak perlu kemampuan desain.',
    ctaPrimary: 'Buat CV saya gratis',
    ctaSecondary: 'Lihat template',
    trustBadges: ['Tanpa pendaftaran', 'Tanpa kartu kredit', 'Unduh PDF gratis'],
  },
  features: {
    title: 'Mengapa memilih pembuat CV online kami?',
    subtitle: 'Lebih dari sekadar template — pembuat CV AI kami membantu menulis konten yang lebih baik dan melewati seleksi ATS.',
    items: [
      { feature: 'Penulisan bertenaga AI', description: 'AI secara otomatis menghasilkan pengalaman profesional, ringkasan, dan deskripsi keahlian yang disesuaikan dengan industri dan level pengalaman Anda.' },
      { feature: 'Template teroptimasi ATS', description: 'Semua template telah diuji dengan sistem ATS terkemuka seperti Workday, Taleo, Greenhouse. Lewati seleksi otomatis dengan percaya diri.' },
      { feature: 'Unduh PDF', description: 'Unduh CV Anda sebagai PDF dengan satu klik. Tanpa watermark, tanpa biaya — sepenuhnya gratis.' },
      { feature: 'Siap dalam hitungan menit', description: 'Tidak perlu bergulat dengan halaman kosong. Alur terpandu dan saran AI memungkinkan CV profesional dalam kurang dari 10 menit.' },
      { feature: 'Penilaian ATS real-time', description: 'Lihat skor ATS CV Anda secara real-time saat menulis. Optimalkan sebelum melamar.' },
      { feature: '20+ template profesional', description: 'Template untuk setiap industri dan level karier. Semuanya gratis, semuanya kompatibel ATS.' },
    ],
    cta: 'Mulai buat CV',
  },
  comparison: {
    title: 'Pembuat CV kami vs. pembuat CV lainnya',
    subtitle: 'Temukan mengapa pencari kerja memilih pembuat CV AI gratis kami.',
    oursName: 'Best AI Resumes',
    othersName: 'Pembuat CV lainnya',
    rows: [
      { feature: 'Penulisan AI', ours: 'AI canggih', others: 'Dasar atau tidak ada' },
      { feature: 'Optimasi ATS', ours: 'Penilaian real-time', others: 'Pengujian terbatas' },
      { feature: 'Semua template gratis', ours: '20+', others: 'Kebanyakan berbayar' },
      { feature: 'Unduh PDF gratis', ours: 'Selalu gratis', others: 'Banyak yang berbayar' },
      { feature: 'Mulai tanpa akun', ours: 'Langsung mulai', others: 'Biasanya wajib' },
      { feature: 'Kata kunci industri', ours: 'Disarankan AI', others: 'Manual saja' },
      { feature: 'Beberapa versi', ours: 'Tak terbatas', others: 'Biasanya terbatas' },
    ],
  },
  howItWorks: {
    title: 'Cara menggunakan pembuat CV',
    subtitle: 'Buat CV yang mengesankan rekruter dalam 3 langkah sederhana. AI menangani pekerjaan berat.',
    steps: [
      { step: 1, title: 'Pilih template', description: 'Pilih dari 20+ template ATS profesional yang sesuai dengan industri Anda.' },
      { step: 2, title: 'Masukkan informasi Anda', description: 'Tambahkan pengalaman Anda dan biarkan AI menyarankan peningkatan, kata kunci, dan frasa profesional.' },
      { step: 3, title: 'Unduh dan lamar', description: 'Ekspor CV Anda sebagai PDF dan mulai melamar sekarang.' },
    ],
    cta: 'Buat CV profesional',
  },
  trust: {
    title: '',
    stats: [
      { value: '2M+', label: 'CV yang dibuat' },
      { value: '4.8', label: 'Rating pengguna' },
      { value: '20+', label: 'Template gratis' },
      { value: '10 mnt', label: 'Rata-rata waktu pembuatan' },
    ],
  },
  templates: {
    title: 'Template profesional untuk setiap industri',
    subtitle: 'Dari desainer kreatif hingga eksekutif — temukan template CV yang sempurna untuk bidang Anda.',
    styles: ['Software Engineer', 'Manajer Marketing', 'Perawat', 'Manajer Penjualan', 'Analis Data', 'Guru', 'Manajer Proyek', 'Desainer'],
    cta: 'Lihat semua template',
  },
  faq: {
    title: 'Pertanyaan yang sering diajukan',
    items: [
      { question: 'Apakah pembuat CV ini benar-benar gratis?', answer: 'Ya! Pembuat CV AI kami 100% gratis. Buat CV tak terbatas, akses 20+ template profesional, unduh sebagai PDF — tidak perlu kartu kredit atau langganan.' },
      { question: 'Mengapa ini adalah pembuat CV terbaik?', answer: 'Berbeda dari pembuat CV biasa, kami menggunakan AI untuk menghasilkan pengalaman profesional, mengoptimalkan untuk ATS, dan menyarankan kata kunci khusus industri. Anda mendapatkan CV yang menarik secara visual sekaligus efektif dalam seleksi otomatis.' },
      { question: 'Bisakah saya mengunduh CV saya sebagai PDF gratis?', answer: 'Tentu saja. Semua CV yang dibuat bisa diunduh sebagai PDF gratis. Tanpa watermark, tanpa biaya tambahan.' },
      { question: 'Berapa lama membuat CV?', answer: 'Sebagian besar pengguna menyelesaikan CV profesional dalam kurang dari 10 menit. AI menyarankan konten sehingga Anda bisa menghemat waktu untuk lamaran kerja.' },
      { question: 'Apakah CV yang dibuat kompatibel ATS?', answer: 'Ya. Semua template telah diuji dengan sistem ATS terkemuka (Workday, Taleo, Greenhouse, Lever). Penilaian ATS real-time membantu Anda mengoptimalkan CV sebelum melamar.' },
      { question: 'Bisakah saya membuat beberapa CV untuk lamaran berbeda?', answer: 'Ya! Anda bisa membuat CV yang disesuaikan sebanyak yang Anda inginkan. Mengoptimalkan CV untuk setiap posisi meningkatkan peluang Anda, dan alat kami membuat ini cepat dan mudah.' },
    ],
  },
  crossLinks: {
    title: 'Alat CV terkait',
    items: [
      { href: '/id/resume-ai', title: 'CV dengan AI', subtitle: 'Pembuat CV bertenaga AI' },
      { href: '/id/tools/ats-checker', title: 'Cek ATS', subtitle: 'Uji skor ATS Anda' },
      { href: '/id/free-resume-builder', title: 'CV Gratis', subtitle: 'Pembuat 100% gratis' },
    ],
    guidesTitle: 'Panduan berguna',
    guides: [
      { href: '/id/blog/how-to-write-a-resume', label: 'Cara membuat CV (panduan 2026)' },
      { href: '/id/career-tips/how-to-write-ats-friendly-resume', label: 'Cara membuat CV ATS friendly' },
      { href: '/id/resume-format', label: 'Panduan format CV' },
      { href: '/id/blog/top-resume-mistakes-to-avoid', label: 'Kesalahan umum dalam CV' },
    ],
  },
  bottomCta: {
    title: 'Siap membuat CV Anda?',
    description: 'Lebih dari 2 juta pencari kerja telah membuat CV profesional mereka dengan pembuat CV AI gratis kami.',
    cta: 'Buat CV gratis saya',
    subtext: 'Gratis selamanya. Tanpa kartu kredit.',
  },
};
`;

const RESUME_AI_ID = `
const id: ResumeAIPageContent = {
  meta: {
    title: 'CV dengan AI | Pembuat CV Kecerdasan Buatan Gratis 2026',
    description: 'Buat CV dengan AI dalam hitungan menit. Penulisan AI otomatis, optimasi ATS, 20+ template — semuanya gratis.',
    keywords: 'cv dengan ai, buat cv dengan kecerdasan buatan, cv ai gratis, pembuat cv ai, cv otomatis ai, generator cv kecerdasan buatan',
  },
  schemas: {
    breadcrumbName: 'CV dengan AI',
    articleHeadline: 'CV dengan AI: Pembuat CV Kecerdasan Buatan Gratis 2026',
    articleDescription: 'Temukan bagaimana AI menghasilkan dan mengoptimalkan konten CV. Gunakan pembuat CV AI gratis kami untuk mendapatkan lebih banyak interview.',
    softwareAppName: 'Pembuat CV AI',
  },
  hero: {
    badge: 'Pembuat CV dengan Kecerdasan Buatan',
    title: 'AI membuatkan',
    titleHighlight: 'CV sempurna Anda',
    subtitle: '<strong>Pembuat CV AI kami</strong> menulis konten profesional, mengoptimalkan untuk ATS, dan membantu Anda membuat CV yang menonjol — sepenuhnya gratis. Menurut <a href="https://www.linkedin.com/business/talent/blog/talent-acquisition/how-recruiters-use-ai" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline">LinkedIn</a>, rekruter rata-rata menghabiskan 7 detik untuk setiap CV. Dengan AI, setiap detik penting.',
    ctaPrimary: 'Coba CV AI gratis',
    ctaSecondary: 'Cara kerjanya',
    trustText: 'Tanpa pendaftaran · 100% gratis · Konten dibuat AI',
  },
  whatIs: {
    title: 'Apa itu CV dengan AI?',
    description: '<strong>CV dengan AI</strong> mengubah cara Anda membuat CV secara mendasar. Daripada bergulat dengan halaman kosong, AI menganalisis pengalaman Anda, memahami posisi yang diinginkan, dan menghasilkan konten profesional yang dioptimalkan untuk industri Anda. Seperti yang disoroti oleh <a href="https://www.shrm.org/topics-tools/news/talent-acquisition/ai-rapidly-transforming-how-companies-recruit" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline">SHRM</a>, AI dengan cepat mengubah proses rekrutmen dan CV yang dibuat AI diterima secara luas oleh perusahaan.',
    stats: [
      { value: '10x', label: 'Lebih cepat dari penulisan manual' },
      { value: '85%', label: 'Peningkatan tingkat lolos ATS' },
      { value: '3M+', label: 'CV yang dibuat dengan AI' },
    ],
  },
  features: {
    title: 'Bagaimana AI membantu membuat CV Anda',
    subtitle: 'AI tidak hanya memformat — AI benar-benar membantu menulis konten yang lebih baik.',
    items: [
      { title: 'Penulisan konten AI', description: 'AI menghasilkan pengalaman profesional, ringkasan, dan deskripsi keahlian berdasarkan pengalaman dan posisi yang Anda inginkan.' },
      { title: 'Optimasi kata kunci cerdas', description: 'AI menganalisis lowongan kerja dan menyarankan kata kunci spesifik industri yang dicari perusahaan.' },
      { title: 'Analisis skor ATS', description: 'Penilaian real-time menunjukkan bagaimana CV Anda akan dievaluasi oleh sistem ATS sebelum Anda melamar.' },
      { title: 'Kuantifikasi hasil', description: 'AI mengubah deskripsi umum menjadi pencapaian terukur dan konkret yang menarik perhatian rekruter.' },
      { title: 'Template spesifik industri', description: 'AI menyarankan tata letak dan bagian yang paling sesuai untuk industri dan level pengalaman Anda.' },
      { title: 'Pemeriksaan tata bahasa dan nada', description: 'AI secara otomatis memeriksa tata bahasa dan ejaan untuk memastikan hasil yang profesional dan sempurna.' },
    ],
  },
  beforeAfter: {
    title: 'Lihat bagaimana AI mengubah CV Anda',
    subtitle: 'Contoh nyata peningkatan yang dibuat oleh kecerdasan buatan.',
    beforeLabel: 'Sebelum',
    afterLabel: 'Setelah AI',
    items: [
      { before: 'Mengelola tim dan proyek', after: 'Mengkoordinasikan tim lintas fungsi 8 orang; menyelesaikan 12 proyek tepat waktu dengan kepuasan klien 98%' },
      { before: 'Meningkatkan penjualan', after: 'Meningkatkan pendapatan tahunan 34% (Rp 35M) dengan strategi pembelian berbasis data' },
      { before: 'Memberikan layanan pelanggan yang baik', after: 'Skor kepuasan 4,9/5; mengelola 150+ permintaan harian dengan tingkat resolusi kontak pertama 95%' },
    ],
    cta: 'Buat CV profesional',
  },
  comparison: {
    title: 'CV dengan AI vs. CV yang ditulis manual',
    subtitle: 'Mengapa pencari kerja memilih CV AI.',
    oursName: 'Dengan AI',
    othersName: 'Ditulis manual',
    rows: [
      { feature: 'Waktu pembuatan', ours: '10-15 menit', others: '2-4 jam' },
      { feature: 'Penulisan profesional', ours: 'AI menyarankan', others: 'Perlu riset sendiri' },
      { feature: 'Optimasi ATS', ours: 'Otomatis', others: 'Manual dan rentan error' },
      { feature: 'Kata kunci industri', ours: 'Disarankan AI', others: 'Riset sendiri' },
      { feature: 'Tata bahasa/ejaan', ours: 'Pemeriksaan otomatis', others: 'Mudah terlewat' },
      { feature: 'Kuantifikasi hasil', ours: 'AI membantu', others: 'Sering terlupakan' },
      { feature: 'Format/desain', ours: '20+ template', others: 'Buat dari nol' },
    ],
  },
  useCases: {
    title: 'CV AI untuk siapa?',
    subtitle: 'Pembuat CV AI cocok untuk semua pencari kerja.',
    items: [
      { title: 'Pindah karier', description: 'AI membantu menonjolkan keahlian yang bisa ditransfer di berbagai industri' },
      { title: 'Fresh graduate', description: 'Ubah magang dan proyek akademik menjadi pengalaman profesional yang meyakinkan' },
      { title: 'Profesional berpengalaman', description: 'Rangkum 20 tahun pengalaman menjadi CV 2 halaman yang efektif' },
      { title: 'Aktif mencari kerja', description: 'Buat CV yang disesuaikan dengan cepat untuk setiap lamaran' },
    ],
  },
  faq: {
    title: 'Pertanyaan yang sering diajukan',
    items: [
      { question: 'Apa itu CV dengan AI?', answer: 'CV dengan AI adalah CV yang dibuat dengan bantuan kecerdasan buatan. Alat kami menghasilkan pengalaman profesional, mengoptimalkan untuk ATS, menyarankan kata kunci industri, dan memformat semuanya secara otomatis — CV sempurna dalam hitungan menit, bukan jam.' },
      { question: 'Lebih baik buat CV dengan AI atau tulis manual?', answer: 'AI membantu menulis konten yang lebih baik dengan lebih cepat. AI menganalisis ribuan CV sukses dan menyarankan frasa profesional, hasil terukur, dan kata kunci yang sesuai pasar kerja Indonesia. Anda tetap memiliki kontrol penuh atas konten akhir — AI hanya membuat prosesnya lebih efektif.' },
      { question: 'Apakah CV yang dibuat AI bisa lolos filter ATS?', answer: 'Ya! Pembuat CV AI kami dirancang khusus untuk kompatibilitas ATS. AI memformat CV dengan teks bersih yang mudah dibaca, menyarankan kata kunci yang cocok dengan posisi, dan memberikan penilaian ATS real-time untuk mengoptimalkan sebelum mengirim.' },
      { question: 'Apakah alat CV AI ini gratis?', answer: 'Ya, pembuat CV AI 100% gratis. Buat CV tak terbatas, gunakan semua template, unduh sebagai PDF — semuanya gratis. Tidak perlu kartu kredit atau langganan.' },
      { question: 'Bagaimana AI menghasilkan konten?', answer: 'AI menganalisis posisi, industri, dan level pengalaman Anda untuk menghasilkan saran yang dipersonalisasi. AI menggunakan pola dari jutaan CV sukses untuk membuat ringkasan profesional, pengalaman berorientasi hasil, dan deskripsi keahlian yang menarik perhatian rekruter.' },
      { question: 'Apakah CV akan terlihat seperti dibuat AI?', answer: 'Tidak. Alat kami menghasilkan konten yang alami dan profesional seperti ditulis oleh konsultan karier. Anda bisa mengedit setiap saran untuk menambahkan sentuhan personal, dan hasil akhir sepenuhnya milik Anda.' },
    ],
  },
  crossLinks: {
    title: 'Alat CV AI lainnya',
    items: [
      { href: '/id/resume-maker', title: 'Pembuat CV', subtitle: 'Pembuat CV AI gratis' },
      { href: '/id/tools/ats-checker', title: 'Cek ATS', subtitle: 'Analisis ATS dengan AI' },
      { href: '/id/free-resume-builder', title: 'CV Gratis', subtitle: 'Pembuat 100% gratis' },
    ],
    guidesTitle: 'Panduan CV AI',
    guides: [
      { href: '/id/career-tips/ai-resume-tools', label: 'Tools AI untuk CV (2026)' },
      { href: '/id/blog/chatgpt-vs-claude-for-resumes', label: 'ChatGPT vs Claude: AI mana untuk CV?' },
      { href: '/id/career-tips/how-to-write-ats-friendly-resume', label: 'Cara membuat CV ATS friendly' },
      { href: '/id/resume-examples', label: '300+ contoh CV' },
    ],
  },
  bottomCta: {
    title: 'Siap membuat CV dengan AI?',
    description: 'Bergabunglah dengan jutaan orang yang mendapatkan lebih banyak interview — dengan <a href="/id/" class="text-purple-600 hover:underline">pembuat CV kecerdasan buatan</a>.',
    cta: 'Mulai gratis dengan AI',
    subtext: 'Gratis selamanya. Tanpa kartu kredit.',
  },
};
`;

// ─── Comparison (alternative) page Indonesian content ────────────────────────

function makeAlternativeId(competitorName, competitorSlug, price, currency = 'Rp 0') {
  return `
const id: ComparisonPageContent = {
  meta: {
    title: 'Alternatif ${competitorName} 2026: Pembuat CV AI Gratis | Best AI Resume',
    description: 'Cari alternatif ${competitorName} gratis? Bandingkan ${competitorName} vs Best AI Resume Builder — penulisan AI, template ATS, unduhan tak terbatas. Tanpa biaya tersembunyi.',
    keywords: 'alternatif ${competitorName.toLowerCase()}, ${competitorName.toLowerCase()} vs best ai resume, pembuat cv gratis alternatif ${competitorName.toLowerCase()}, cv builder gratis indonesia',
  },
  schemas: {
    breadcrumbName: 'Alternatif ${competitorName}',
    articleHeadline: 'Alternatif ${competitorName} 2026: Pembuat CV AI Gratis Tanpa Biaya Tersembunyi',
    articleDescription: 'Bandingkan ${competitorName} vs Best AI Resume Builder. Dapatkan penulisan AI, optimasi ATS, dan unduhan tak terbatas sepenuhnya gratis.',
  },
  hero: {
    badge: 'Alternatif ${competitorName}',
    title: 'Buat CV Anda.',
    titleHighlight: 'Unduh Gratis.',
    subtitle: '${competitorName} memungkinkan Anda membuat CV — lalu memungut biaya untuk mengunduhnya. Dapatkan penulisan AI, template ATS, dan ekspor tak terbatas seharga <strong>${currency}</strong>.',
    ctaPrimary: 'Buat CV Saya Gratis',
    ctaSecondary: 'Lihat Perbandingan',
  },
  problem: {
    title: 'Masalah dengan ${competitorName}',
    description: '${competitorName} memiliki template profesional dan saran konten yang berguna. Masalahnya ada di model harganya: Anda baru mengetahui biaya unduhan setelah menyelesaikan seluruh CV. Banyak pengguna melaporkan biaya tak terduga di situs ulasan.',
    stats: [
      { value: '$2.70', label: 'Masa percobaan (perpanjang otomatis ke $23.70/bln)' },
      { value: '$284', label: 'Biaya tahunan jika lupa membatalkan' },
      { value: '${currency}', label: 'Best AI Resume Builder — gratis selamanya' },
    ],
  },
  comparison: {
    title: 'Perbandingan ${competitorName} vs Best AI Resume Builder',
    subtitle: 'Perbandingan fitur secara berdampingan.',
    competitorName: '${competitorName}',
    oursName: 'Best AI Resumes',
    rows: [
      { feature: 'Harga', competitor: '❌ Berbayar untuk mengunduh', ours: '✅ 100% gratis selamanya' },
      { feature: 'Unduhan Gratis', competitor: '❌ Perlu bayar untuk PDF', ours: '✅ Unduhan PDF gratis tak terbatas' },
      { feature: 'Penulisan AI', competitor: '⚠️ Saran terbatas', ours: '✅ Konten yang dibuat AI sepenuhnya' },
      { feature: 'Optimasi ATS', competitor: '✅ Pemeriksaan dasar', ours: '✅ Skor ATS real-time + kata kunci' },
      { feature: 'Kualitas Template', competitor: '✅ Desain profesional', ours: '✅ 20+ template yang diuji ATS' },
      { feature: 'Jumlah CV', competitor: '⚠️ Terbatas di paket gratis', ours: '✅ CV tak terbatas, gratis' },
      { feature: 'Pembuat Surat Lamaran', competitor: '✅ Tersedia (paket berbayar)', ours: '✅ Bertenaga AI (gratis)' },
      { feature: 'Saran Konten', competitor: '✅ Frasa yang ditulis sebelumnya', ours: '✅ Adaptasi AI berdasarkan pengalaman Anda' },
      { feature: 'Pembatalan', competitor: '❌ Harus dibatalkan sebelum masa percobaan', ours: '✅ Tidak ada yang perlu dibatalkan' },
      { feature: 'Ulasan Pengguna', competitor: '⚠️ Campuran — keluhan penagihan umum', ours: '✅ Tidak mungkin ada masalah penagihan' },
    ],
  },
  whySwitch: {
    title: '3 Alasan Beralih dari ${competitorName}',
    subtitle: 'Benar-benar gratis. AI lebih baik. Tanpa jebakan.',
    reasons: [
      { title: 'Unduhan Benar-benar Gratis', description: '${competitorName} meminta bayaran setelah Anda selesai membuat CV. Di sini, Anda bisa mengunduh apapun yang Anda buat secara instan dan gratis — tidak ada percobaan, kartu kredit, atau perpanjangan otomatis.' },
      { title: 'AI Nyata (Bukan Frasa yang Ditulis Sebelumnya)', description: 'Saran ${competitorName} didasarkan pada pustaka frasa yang telah ditulis sebelumnya. AI kami menghasilkan konten yang benar-benar disesuaikan untuk setiap bagian CV.' },
      { title: 'Optimasi ATS Lebih Baik', description: 'Dibandingkan fitur ATS dasar ${competitorName}, kami menawarkan penilaian ATS real-time, saran kata kunci spesifik industri, dan template yang diuji untuk sistem yang umum digunakan di Indonesia.' },
    ],
  },
  recommendation: {
    title: 'Rekomendasi Jujur',
    useCompetitor: {
      title: 'Gunakan ${competitorName} jika...',
      items: [
        'Anda bersedia membayar untuk fitur tertentu yang dimiliki ${competitorName}',
        'Anda lebih suka antarmuka spesifik ${competitorName}',
        'Anda membutuhkan fitur tertentu yang hanya ada di ${competitorName}',
        'Anda menginginkan dukungan pelanggan berbayar',
      ],
    },
    useUs: {
      title: 'Gunakan Best AI Resumes jika...',
      items: [
        'Anda ingin membuat dan mengunduh CV secara gratis',
        'Anda membutuhkan AI canggih untuk membantu menulis konten',
        'Anda ingin penilaian ATS real-time saat membuat CV',
        'Anda tidak ingin berurusan dengan langganan atau perpanjangan otomatis',
      ],
    },
  },
  resumeExamples: {
    title: 'Jelajahi 300+ Contoh CV Gratis',
    description: 'Contoh CV profesional untuk setiap industri dan level karier.',
    ctaBrowse: 'Lihat Contoh CV',
    ctaTemplates: 'Lihat Semua Template',
  },
  faq: {
    title: 'Pertanyaan yang Sering Diajukan',
    items: [
      { question: 'Apakah ${competitorName} gratis?', answer: '${competitorName} mengizinkan pembuatan CV gratis tetapi mengenakan biaya untuk mengunduh. Best AI Resume Builder 100% gratis — buat dan unduh CV tak terbatas tanpa kartu kredit.' },
      { question: 'Mengapa ${competitorName} mengenakan biaya untuk mengunduh?', answer: 'Model bisnis ${competitorName} adalah "freemium" — proses pembuatan gratis untuk menarik pengguna, tetapi monetisasi terjadi saat mengunduh. Best AI Resume Builder transparan: semuanya gratis, tanpa kejutan.' },
      { question: 'Apa alternatif gratis terbaik untuk ${competitorName}?', answer: 'Best AI Resume Builder adalah alternatif gratis terbaik. Kami menawarkan semua yang ada di balik paywall ${competitorName} — template profesional, ekspor PDF, surat lamaran — ditambah penulisan AI dan optimasi ATS.' },
      { question: 'Apakah ${competitorName} memiliki penulisan AI?', answer: '${competitorName} memiliki beberapa saran konten, tetapi bukan penulisan AI yang sebenarnya. Best AI Resume Builder menggunakan AI canggih untuk menghasilkan pengalaman profesional, ringkasan, dan kata kunci yang dipersonalisasi.' },
      { question: 'Bagaimana cara membatalkan ${competitorName}?', answer: 'Untuk membatalkan ${competitorName}, akses pengaturan akun sebelum masa percobaan berakhir. Best AI Resume Builder tidak memerlukan langganan — tidak ada yang perlu dibatalkan. Cukup gunakan platform secara gratis.' },
    ],
  },
  crossLinks: {
    title: 'Bandingkan Pembuat CV Lainnya',
    items: [
      { href: '/id/livecareer-alternative', title: 'Alternatif LiveCareer', subtitle: 'Tradisional vs modern' },
      { href: '/id/resume-io-alternative', title: 'Alternatif Resume.io', subtitle: 'Perbandingan harga' },
      { href: '/id/canva-alternative', title: 'Alternatif Canva', subtitle: 'Alat desain vs AI' },
      { href: '/id/rezi-alternative', title: 'Alternatif Rezi', subtitle: 'Perbandingan fitur AI' },
    ],
    guidesTitle: 'Panduan CV yang Berguna',
    guides: [],
  },
  externalResources: {
    title: 'Sumber Daya Eksternal',
    items: [
      { href: 'https://www.kemnaker.go.id/', label: 'Kemnaker — Kementerian Ketenagakerjaan Republik Indonesia' },
      { href: 'https://www.glassdoor.co.id/', label: 'Glassdoor Indonesia — Gaji dan Peluang Karier' },
    ],
  },
  bottomCta: {
    title: 'Pembuat CV yang Benar-benar Gratis.',
    description: 'Tanpa jebakan harga, tanpa perpanjangan otomatis. Hanya pembuat CV bertenaga AI — 100% gratis selamanya.',
    cta: 'Buat CV Saya Gratis',
    subtext: 'Gratis selamanya. Tanpa kartu kredit. Tanpa kejutan.',
  },
};
`;
}

const ABOUT_PAGES_ID = `
const id: AboutPagesContent = {
  about: {
    hero: {
      badge: 'Tentang Kami',
      title: 'Membangun masa depan',
      titleHighlight: 'kesuksesan profesional',
      subtitle: 'Best AI Resume hadir dengan misi membantu pencari kerja di seluruh dunia membuat CV profesional yang kompatibel ATS, membuka pintu menuju karier impian mereka.',
    },
    story: {
      badge: 'Cerita Kami',
      heading: 'Mengapa kami membangun Best AI Resume',
      p1: 'Kami menyadari bahwa banyak profesional berbakat diabaikan hanya karena CV mereka tidak bisa lolos sistem seleksi otomatis. Proses pembuatan CV tradisional memakan waktu, membuat frustrasi, dan seringkali menghasilkan dokumen yang tidak mencerminkan potensi nyata kandidat.',
      p2: 'Itulah mengapa kami membangun Best AI Resume — platform yang menggabungkan kekuatan kecerdasan buatan dengan desain yang elegan dan profesional. Tujuan kami sederhana: membantu setiap kandidat mempresentasikan diri mereka sebaik mungkin kepada calon pemberi kerja.',
      p3: 'Hingga kini, kami telah membantu lebih dari 50.000 profesional menemukan pekerjaan impian mereka; membuat CV yang menonjol dan berhasil melewati filter ATS.',
    },
    stats: [
      { value: '50K+', label: 'CV yang Dibuat' },
      { value: '98%', label: 'Tingkat Lolos ATS' },
      { value: '20+', label: 'Template' },
      { value: '4.9', label: 'Rating Pengguna' },
    ],
    values: {
      badge: 'Nilai-Nilai Kami',
      heading: 'Yang mendorong kami setiap hari',
      cards: [
        { title: 'Privasi Pertama', text: 'Data Anda adalah milik Anda. Kami menyimpan data CV Anda secara lokal di browser, bukan di server kami. Hanya kredensial akun Anda yang kami simpan dengan aman.' },
        { title: 'Inovasi', text: 'Kami menggunakan teknologi AI terdepan untuk membantu Anda menulis konten yang efektif, menonjolkan pencapaian, dan menarik perhatian rekruter.' },
        { title: 'Aksesibilitas', text: 'Alat CV profesional seharusnya tidak tersembunyi di balik langganan mahal. Kami menyediakan fitur-fitur hebat yang bisa diakses semua orang.' },
      ],
    },
    experts: {
      badge: 'Keahlian Terpercaya',
      heading: 'Temukan Pakar Karier Kami',
      subtitle: 'Tim kami yang terdiri dari pelatih karier, rekruter, dan profesional industri memberikan keahlian mendalam pada panduan CV yang mereka tulis.',
    },
    editorial: {
      heading: 'Standar Editorial Kami',
      items: [
        { title: 'Saran Berbasis Data', text: 'Setiap tips yang kami bagikan telah diuji pada sistem ATS nyata dan divalidasi oleh profesional industri.' },
        { title: 'Pendekatan Human-First', text: 'Kami percaya AI harus memperkuat, bukan menggantikan. Kami mengutamakan strategi yang benar-benar berdampak pada rekruter nyata.' },
      ],
    },
    commitment: {
      heading: 'Komitmen Kami kepada Anda',
      p1: 'Di Best AI Resume, kami percaya bahwa perjalanan karier itu personal. Itulah mengapa kami membangun platform yang menghormati privasi Anda dan memberikan alat yang kuat untuk meraih kesuksesan. Data CV Anda tetap ada di perangkat Anda — Anda memiliki kendali penuh atas informasi Anda.',
      p2: 'Kami terus meningkatkan algoritma AI kami, menambahkan template baru, dan mengembangkan fitur berdasarkan umpan balik pengguna. Kesuksesan Anda adalah kesuksesan kami, dan kami berkomitmen untuk selalu mendampingi Anda.',
    },
    cta: {
      title: 'Siap bergabung dengan:',
      titleHighlight: '50.000+ kisah sukses?',
      subtitle: 'Mulai buat CV profesional Anda hari ini dan ambil langkah pertama menuju karier impian Anda.',
      button: 'Mulai Gratis',
    },
  },
  authors: {
    meta: {
      title: 'Penulis Ahli Kami | Best AI Resume',
      description: 'Kenali para pakar karier, rekruter, dan pelatih di balik panduan CV kami. Penulis kami membawa pengalaman rekrutmen nyata untuk membantu Anda menemukan pekerjaan impian.',
      ogDescription: 'Kenali para pakar karier, rekruter, dan pelatih di balik panduan CV kami.',
    },
    breadcrumb: { home: 'Beranda', about: 'Tentang Kami', authors: 'Penulis' },
    hero: {
      title: 'Temukan Penulis Ahli Kami',
      subtitle: 'Tim kami yang terdiri dari pelatih karier, rekruter, dan profesional industri menyusun panduan CV praktis berdasarkan pengalaman rekrutmen nyata.',
    },
    viewProfile: 'Lihat Profil',
    cta: {
      title: 'Buat CV Anda dengan Panduan Ahli',
      subtitle: 'Pembuat AI kami menerapkan strategi yang sama yang direkomendasikan oleh para ahli kami. Siapkan CV profesional dalam hitungan menit.',
      button: 'Buat CV Saya — Gratis',
    },
  },
  authorProfile: {
    breadcrumb: { home: 'Beranda', about: 'Tentang Kami' },
    atOrg: '{jobTitle} di {organization}',
    authorOfGuides: ' Penulis {count}+ panduan karier dan artikel.',
    connectLinkedIn: 'Terhubung di LinkedIn',
    viewAllGuides: 'Lihat Semua Panduan',
    areasOfExpertise: 'Area Keahlian',
    resumeGuidesBy: 'Panduan CV oleh {name}',
    guidesCount: '{count} panduan',
    coverLetterExamplesBy: 'Contoh Surat Lamaran oleh {name}',
    examplesCount: '{count} contoh',
    blogPostsBy: 'Artikel Blog oleh {name}',
    postsCount: '{count} artikel',
    viewAllResumes: 'Lihat semua {count} panduan CV',
    viewAllCoverLetters: 'Lihat semua {count} contoh surat lamaran',
    viewAllBlogPosts: 'Lihat semua {count} artikel blog',
    cta: {
      title: 'Buat CV Anda dengan Panduan Ahli',
      subtitle: 'Gunakan strategi yang sama yang direkomendasikan oleh {name}. Pembuat AI kami secara otomatis menerapkan teknik penulisan CV dari para ahli.',
      button: 'Buat CV Saya — Gratis',
    },
  },
};
`;

const CAREER_PAGES_ID = `
const id: CareerPagesContent = {
  listing: {
    meta: {
      title: 'Sumber Daya Karier dan Peluang Kerja | Best AI Resume',
      description: 'Temukan sumber daya karier, peluang kerja, tren industri, dan tips pengembangan profesional untuk memajukan karier Anda.',
      ogTitle: 'Sumber Daya Karier dan Peluang Kerja | Best AI Resume',
      ogDescription: 'Temukan sumber daya karier, peluang kerja, dan tips pengembangan profesional.',
    },
    badge: 'Pusat Karier',
    title: 'Sumber Daya Karier dan',
    titleHighlight: 'Peluang Kerja',
    subtitle: 'Temukan peluang kerja, wawasan karier, dan sumber daya pengembangan profesional untuk memajukan karier Anda.',
    featured: 'Peluang Unggulan',
    noPostsTitle: 'Belum ada artikel',
    noPostsSub: 'Kembali lagi segera untuk sumber daya karier dan peluang kerja!',
  },
  article: {
    notFound: 'Artikel Tidak Ditemukan',
  },
};
`;

const COMMUNITY_PAGE_ID = `
const id: CommunityContent = {
  title: 'Template Komunitas',
  subtitle: 'Temukan dan gunakan template yang dibagikan oleh komunitas',
  categories: [
    { value: '', label: 'Semua' },
    { value: 'professional', label: 'Profesional' },
    { value: 'creative', label: 'Kreatif' },
    { value: 'ats', label: 'Teroptimasi ATS' },
    { value: 'bold', label: 'Mencolok' },
  ],
  browseTab: 'Jelajahi Template',
  myTemplatesTab: 'Template Saya',
  templatesAvailable: '{count} template tersedia',
  templateAvailable: '{count} template tersedia',
  createYourOwn: 'Buat milik Anda →',
  errorMessage: 'Gagal memuat template. Silakan coba lagi.',
  tryAgain: 'Coba Lagi',
  noTemplatesTitle: 'Belum ada template',
  noTemplatesSub: 'Jadilah yang pertama berbagi template dengan komunitas!',
  createTemplate: 'Buat Template',
  pageOf: 'Halaman {page} / {total}',
  templatesPosted: '{count} template dipublikasikan',
  templatePosted: '{count} template dipublikasikan',
  createNewTemplate: 'Buat template baru →',
  noPostedTitle: 'Anda belum memposting template',
  noPostedSub: 'Buat desain di editor Canvas dan bagikan dengan komunitas!',
  publicLabel: 'Publik',
  privateLabel: 'Privat',
  noPreview: 'Tidak ada pratinjau',
  downloads: 'unduhan',
  download: 'unduh',
  signInTitle: 'Masuk untuk melihat template Anda',
  signInSub: 'Anda perlu masuk untuk melihat dan mengelola template yang telah Anda publikasikan.',
  signIn: 'Masuk',
  deleteConfirm: 'Apakah Anda yakin ingin menghapus template ini? Tindakan ini tidak dapat dibatalkan.',
  deleteError: 'Gagal menghapus template. Silakan coba lagi.',
  visibilityError: 'Gagal memperbarui visibilitas. Silakan coba lagi.',
  makePrivate: 'Jadikan Privat',
  makePublic: 'Jadikan Publik',
  edit: 'Edit',
  deleteBtn: 'Hapus',
};
`;

const COMMUNITY_DETAIL_ID = `
const id: CommunityDetailContent = {
  backToGallery: '← Kembali ke Galeri',
  useTemplate: 'Gunakan Template Ini',
  downloads: 'unduhan',
  download: 'unduh',
  by: 'Oleh',
  commentsTitle: 'Komentar',
  commentPlaceholder: 'Bagikan pendapat Anda tentang template ini...',
  postComment: 'Posting Komentar',
  signInToComment: 'Masuk untuk berkomentar',
  signIn: 'Masuk',
  noComments: 'Belum ada komentar. Jadilah yang pertama!',
  deleteComment: 'Hapus',
  deleteConfirm: 'Apakah Anda yakin ingin menghapus komentar ini?',
  editComment: 'Edit',
  saveEdit: 'Simpan',
  cancelEdit: 'Batal',
  loadMore: 'Muat lebih banyak komentar',
  charLimit: '{count}/2000',
  edited: '(diedit)',
};
`;

const TEMPLATES_CATEGORY_ID = `
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
`;

const TERMS_PAGE_ID = `
const id: TermsContent = {
  hero: {
    badge: 'Syarat dan Ketentuan',
    title: 'Transparan, adil',
    titleHighlight: 'syarat dan ketentuan',
    subtitle: 'Syarat ini mendefinisikan perjanjian antara Anda dan kami dalam bahasa yang jelas. Tidak ada jargon hukum yang rumit — hanya ketentuan yang bersih dan jujur.',
  },
  highlights: [
    { title: 'Tidak Ada Biaya Tersembunyi', text: 'Yang Anda lihat adalah yang Anda bayar. Harga kami transparan; tidak ada biaya kejutan atau biaya tersembunyi.' },
    { title: 'Data Anda, Kendali Anda', text: 'Kami hanya menyimpan alamat email dan nama Anda untuk login. Konten CV Anda tetap di browser — tidak pernah di server kami.' },
    { title: 'Uji Coba Gratis 7 Hari', text: 'Coba semua fitur premium selama 7 hari secara gratis. Tidak ada tagihan selama masa uji coba, batalkan kapan saja secara gratis.' },
  ],
  sections: [
    {
      heading: 'Gambaran Umum Layanan',
      intro: 'Best AI Resume adalah pembuat CV online yang membantu Anda membuat CV profesional dengan alat bertenaga AI. Dengan menggunakan layanan kami, Anda menyetujui syarat-syarat ini.',
      items: ['Buat CV tak terbatas dengan alat kami', 'Akses saran dan peningkatan konten yang dihasilkan AI', 'Unduh CV Anda dalam format PDF', 'Pilih dari template yang dirancang oleh para profesional'],
    },
    {
      heading: 'Akun dan Transparansi Data',
      subsections: [
        { subheading: 'Yang Kami Simpan di Server Kami', items: ['**Alamat email** — Untuk login dan notifikasi penting', '**Nama** — Untuk mempersonalisasi pengalaman Anda', '**Kata sandi (terenkripsi)** — Disimpan dengan hash aman untuk autentikasi', '**Status langganan** — Untuk mengelola manfaat paket Anda'] },
        { subheading: 'Yang Tidak Kami Simpan', items: ['Konten CV (disimpan secara lokal di browser Anda)', 'Riwayat pekerjaan atau detail pekerjaan', 'Informasi pendidikan atau keahlian', 'Alamat pribadi atau nomor telepon'] },
      ],
      intro: 'Kami berkomitmen untuk mengumpulkan data minimum yang diperlukan. Kami hanya menyimpan apa yang diperlukan untuk fungsionalitas akun Anda:',
    },
    {
      heading: 'Langganan dan Pembayaran',
      subsections: [
        { subheading: 'Langganan Bulanan', items: ['**Siklus penagihan** — Ditagih setiap bulan dari tanggal berlangganan', '**Perpanjangan otomatis** — Langganan diperpanjang otomatis kecuali dibatalkan', '**Transparansi harga** — Harga yang ditampilkan saat checkout, termasuk pajak yang berlaku, adalah jumlah yang dikenakan'] },
        { subheading: 'Kebijakan Pembatalan', items: ['Batalkan kapan saja dari panel akun Anda — tidak perlu alasan', 'Akses berlanjut hingga akhir periode penagihan saat ini', 'Tidak ada penalti atau biaya pembatalan', 'Data lokal Anda tetap utuh setelah pembatalan'] },
        { subheading: 'Uji Coba Gratis 7 Hari', items: ['**Akses penuh** — Coba semua fitur premium selama 7 hari secara gratis', '**Tidak ada tagihan selama uji coba** — Anda tidak akan ditagih sampai masa uji coba berakhir', '**Batalkan kapan saja** — Batalkan sebelum uji coba berakhir dan Anda tidak membayar apapun', '**Email pengingat** — Kami akan memberi tahu Anda sebelum masa uji coba berakhir'] },
      ],
    },
    {
      heading: 'Akses Gratis dan Paket Berbayar',
      intro: 'Sebelum berlangganan, Anda dapat:',
      items: ['Menelusuri dan melihat pratinjau semua template', 'Membuat dan menyimpan CV di akun Anda', 'Melihat contoh CV dan tips karier'],
    },
    {
      heading: 'Tanggung Jawab Pengguna',
      intro: 'Dengan menggunakan layanan kami, Anda setuju untuk:',
      items: ['Memberikan informasi akurat saat mendaftar akun', 'Menjaga keamanan kredensial login Anda', 'Menggunakan layanan hanya untuk tujuan yang sah', 'Tidak mencoba melewati atau menyalahgunakan layanan'],
    },
    {
      heading: 'Kekayaan Intelektual',
      items: ['**Konten Anda** — Anda mempertahankan kepemilikan penuh atas semua konten yang Anda buat dengan layanan kami', '**Template kami** — Desain template dilisensikan untuk penggunaan pribadi dan profesional', '**Konten yang dihasilkan AI** — Teks yang dihasilkan oleh AI kami adalah milik Anda dan dapat digunakan secara bebas'],
    },
    {
      heading: 'Ketersediaan Layanan',
      intro: 'Kami berkomitmen untuk mempertahankan ketersediaan layanan yang tinggi, namun:',
      items: ['Pemeliharaan berkala dapat menyebabkan gangguan sementara', 'Kami akan memberi pemberitahuan terlebih dahulu tentang pemeliharaan terjadwal bila memungkinkan', 'Data lokal Anda dapat diakses bahkan ketika server kami tidak tersedia'],
    },
    {
      heading: 'Perubahan pada Syarat',
      intro: 'Kami dapat memperbarui syarat ini dari waktu ke waktu. Kami akan memberi tahu Anda tentang perubahan penting melalui email atau layanan. Melanjutkan penggunaan layanan setelah perubahan berarti Anda menerima syarat baru.',
    },
    {
      heading: 'Hubungi Kami',
    },
  ],
  contactText: 'Ada pertanyaan tentang syarat ini? Hubungi kami melalui email:',
  cta: {
    title: 'Siap membuat CV',
    titleHighlight: 'profesional Anda?',
    subtitle: 'Harga sederhana, syarat transparan, dan data Anda adalah milik Anda.',
    primaryBtn: 'Mulai Gratis',
    secondaryBtn: 'Lihat Paket',
  },
  lastUpdated: 'Terakhir diperbarui: Januari 2026',
};
`;

// ─── File processing ──────────────────────────────────────────────────────────

function processFile(filename, idContent, contentMapPattern) {
  const filepath = resolve(contentDir, filename);
  let content = readFileSync(filepath, 'utf8');

  // Check if `id` already exists
  if (/\bconst id\s*[:=]/.test(content)) {
    console.log(`  ⏭  ${filename} — already has \`id\` locale, skipping`);
    return;
  }

  // Find contentMap line and insert before it
  const mapMatch = content.match(/\nconst contentMap[^\n]+\{[^}]+\}/);
  if (!mapMatch) {
    console.log(`  ⚠️  ${filename} — could not find contentMap, skipping`);
    return;
  }

  const insertBefore = '\nconst contentMap';
  const idx = content.lastIndexOf(insertBefore);
  if (idx === -1) {
    console.log(`  ⚠️  ${filename} — could not find insertion point, skipping`);
    return;
  }

  // Insert id locale before contentMap
  content = content.slice(0, idx) + idContent + content.slice(idx);

  // Add `id` to the contentMap — find the closing } of the map and insert before it
  content = content.replace(
    /(\bconst contentMap[^=]+=\s*\{)([^}]+)(\})/,
    (match, before, middle, after) => {
      const trimmed = middle.trimEnd();
      const separator = trimmed.endsWith(',') ? ' ' : ', ';
      return `${before}${trimmed}${separator}id ${after}`;
    }
  );

  writeFileSync(filepath, content, 'utf8');
  console.log(`  ✅  ${filename}`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

console.log('SESSION 5: Adding Indonesian (id) locale to landing page TS files...\n');

// 1. LandingPageContent files
processFile('free-resume-builder.ts', FREE_RESUME_BUILDER_ID);
processFile('resume-maker.ts', RESUME_MAKER_ID);
processFile('resume-ai.ts', RESUME_AI_ID);

// 2. Comparison/alternative files
const alternativeFiles = [
  { file: 'adobe-alternative.ts', name: 'Adobe Express', slug: 'adobe-alternative' },
  { file: 'canva-alternative.ts', name: 'Canva', slug: 'canva-alternative' },
  { file: 'europass-alternative.ts', name: 'Europass', slug: 'europass-alternative' },
  { file: 'livecareer-alternative.ts', name: 'LiveCareer', slug: 'livecareer-alternative' },
  { file: 'nova-alternative.ts', name: 'Nova', slug: 'nova-alternative' },
  { file: 'overleaf-alternative.ts', name: 'Overleaf', slug: 'overleaf-alternative' },
  { file: 'resume-io-alternative.ts', name: 'Resume.io', slug: 'resume-io-alternative' },
  { file: 'rezi-alternative.ts', name: 'Rezi', slug: 'rezi-alternative' },
  { file: 'zety-alternative.ts', name: 'Zety', slug: 'zety-alternative' },
];

for (const { file, name, slug } of alternativeFiles) {
  processFile(file, makeAlternativeId(name, slug));
}

// 3. Structural pages
processFile('about-pages.ts', ABOUT_PAGES_ID);
processFile('career-pages.ts', CAREER_PAGES_ID);
processFile('community-page.ts', COMMUNITY_PAGE_ID);
processFile('community-detail-page.ts', COMMUNITY_DETAIL_ID);
processFile('templates-category.ts', TEMPLATES_CATEGORY_ID);
processFile('terms-page.ts', TERMS_PAGE_ID);

console.log('\nDone!');
