/**
 * SESSION 5 (part 2): Add Indonesian (id) locale to 3 remaining TypeScript files
 * Usage: node scripts/add-id-locale-remaining.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const contentDir = resolve(__dirname, '../frontend/lib/content');

// ─── Privacy page ─────────────────────────────────────────────────────────────

const PRIVACY_ID = `
const id: PrivacyContent = {
  hero: {
    badge: 'Kebijakan Privasi',
    title: 'Privasi Anda adalah',
    titleHighlight: 'prioritas kami',
    subtitle: 'Di Best AI Resume, kami percaya data pribadi Anda adalah milik Anda. Platform kami dikembangkan dengan pendekatan yang mengutamakan privasi, sesuai dengan Undang-Undang Perlindungan Data Pribadi (UU PDP) Indonesia.',
  },
  highlights: [
    { title: 'Data Anda Tetap di Perangkat', text: 'Seluruh konten CV Anda — pengalaman kerja, pendidikan, dan keahlian — disimpan secara lokal di browser Anda, bukan di server kami.' },
    { title: 'Data Minimum di Server', text: 'Di server kami, kami hanya menyimpan alamat email dan kata sandi Anda untuk autentikasi akun. Tidak ada konten CV, tidak ada data pribadi tambahan.' },
    { title: 'Transparansi Penuh', text: 'Kami percaya pada transparansi penuh. Anda dapat memeriksa data apa yang tersimpan di browser Anda dan menghapusnya kapan saja.' },
  ],
  sections: [
    {
      heading: 'Data Apa yang Kami Kumpulkan',
      subsections: [
        { subheading: 'Data yang Disimpan di Server Kami (Minimum)', items: ['**Alamat email** — Digunakan untuk autentikasi akun dan komunikasi layanan penting', '**Kata sandi (terenkripsi)** — Disimpan dengan hash aman untuk autentikasi'] },
        { subheading: 'Data yang Disimpan Secara Lokal di Browser Anda', items: ['Informasi pribadi (nama, kontak, alamat)', 'Pengalaman profesional dan riwayat pekerjaan', 'Informasi pendidikan dan sertifikat', 'Keahlian, bahasa, dan prestasi', 'Template CV dan preferensi kustomisasi'] },
      ],
    },
    {
      heading: 'Mengapa Kami Menggunakan Penyimpanan Browser',
      intro: 'Kami memilih penyimpanan browser (localStorage) sebagai metode penyimpanan utama karena beberapa alasan penting:',
      items: ['**Privasi Maksimal** — Informasi profesional sensitif Anda tidak pernah meninggalkan perangkat Anda', '**Tidak Ada Risiko Kebocoran** — Karena kami tidak menyimpan data CV, data tidak bisa terkompromikan akibat kegagalan server', '**Kontrol Penuh** — Anda dapat melihat, mengekspor, atau menghapus data Anda kapan saja melalui pengaturan browser', '**Performa Tinggi** — Penyimpanan lokal memastikan akses instan ke data Anda tanpa latensi server'],
    },
    {
      heading: 'Cara Kami Melindungi Akun Anda',
      intro: 'Meskipun kami meminimalkan data di server, kami serius dalam mengamankan kredensial Anda:',
      items: ['Kata sandi dienkripsi dengan algoritma hash sesuai standar industri', 'Semua transmisi data dilindungi dengan enkripsi HTTPS', 'Kata sandi tidak pernah disimpan dalam bentuk teks biasa', 'Audit keamanan dan pemantauan rutin'],
    },
    {
      heading: 'Hak dan Kendali Anda',
      intro: 'Sesuai UU PDP (Undang-Undang Perlindungan Data Pribadi), Anda memiliki kendali penuh atas data Anda:',
      items: ['**Akses** — Lihat semua data di browser Anda kapan saja melalui alat pengembang browser', '**Ekspor** — Unduh data CV Anda dalam format PDF atau lainnya', '**Penghapusan** — Hapus penyimpanan browser atau hapus akun Anda kapan saja', '**Portabilitas** — Data Anda adalah milik Anda dan bisa dipindahkan ke mana saja'],
    },
    {
      heading: 'Yang Tidak Kami Lakukan',
      intro: 'Kami berkomitmen pada praktik pengelolaan data yang etis. Berikut hal yang tidak pernah kami lakukan:',
      items: ['Menjual informasi pribadi Anda kepada pihak ketiga', 'Menggunakan konten CV Anda untuk tujuan periklanan', 'Berbagi data Anda dengan rekruter tanpa persetujuan eksplisit', 'Melacak aktivitas penelusuran Anda di situs lain', 'Menyimpan konten CV Anda di server kami'],
    },
    {
      heading: 'Cookie dan Analitik',
      intro: 'Kami hanya menggunakan cookie esensial dan minimal untuk:',
      items: ['Mempertahankan sesi login Anda tetap aktif', 'Mengingat preferensi bahasa dan tema Anda', 'Analitik penggunaan anonim untuk meningkatkan layanan'],
    },
    {
      heading: 'Hubungi Kami',
    },
  ],
  contactText: 'Ada pertanyaan tentang praktik privasi kami atau untuk menggunakan hak Anda berdasarkan UU PDP? Hubungi kami melalui email:',
  cta: {
    title: 'Buat CV Anda dengan',
    titleHighlight: 'kepercayaan dan privasi',
    subtitle: 'Data profesional Anda adalah milik Anda. Mulai buat CV profesional Anda hari ini.',
    primaryBtn: 'Mulai Gratis',
    secondaryBtn: 'Tentang Kami',
  },
  lastUpdated: 'Terakhir diperbarui: Januari 2026',
};
`;

// ─── Resume format page ───────────────────────────────────────────────────────

const RESUME_FORMAT_ID = `
const id: ResumeFormatPageContent = {
  meta: {
    title: 'Format CV yang Benar 2026: Panduan Lengkap Curriculum Vitae | Best AI Resume',
    description:
      'Panduan memilih format cv yang benar. Perbandingan format cv kronologis, fungsional, dan kombinasi. Template cv ats-friendly gratis. 2026.',
    keywords:
      'format cv yang benar, format cv, template cv, cara membuat cv, cv kronologis, format cv 2026, cv ats friendly, format curriculum vitae',
  },
  schemas: {
    breadcrumbName: 'Panduan Format CV',
    howToName: 'Cara memilih format CV yang tepat',
    howToDescription:
      'Bandingkan 3 format CV utama (kronologis, fungsional, kombinasi) dan pilih format terbaik sesuai situasi karier Anda.',
    howToSteps: [
      'Evaluasi tahap karier Anda (fresh graduate, profesional berpengalaman, eksekutif)',
      'Bandingkan kelebihan dan kekurangan 3 format CV',
      'Cek skor kompatibilitas ATS',
      'Pilih template dan buat CV Anda',
    ],
    howToToolName: 'Best AI Resume — Pembuat CV',
  },
  hero: {
    badge: 'Panduan format CV 2026',
    title: 'Pilih format CV yang tepat',
    titleHighlight: 'lolos seleksi pertama',
    subtitle:
      'Kronologis, fungsional, atau kombinasi — memilih <strong>format cv yang benar</strong> adalah langkah kritis pertama dalam proses lamaran. Dengan pembuat CV bertenaga AI kami, mengubah format hanya butuh satu klik.',
    ctaCompare: 'Bandingkan format',
    ctaBuild: 'Buat CV gratis',
  },
  comparison: {
    title: 'Perbandingan 3 format CV',
    subtitle: 'Fitur, penggunaan ideal, dan kompatibilitas ATS setiap format secara jelas.',
    tableHeaders: {
      format: 'Format',
      bestFor: 'Penggunaan ideal',
      avoidIf: 'Hindari jika',
      atsSafety: 'Kompatibilitas ATS',
    },
    formats: [
      {
        name: 'Kronologis (terbalik)',
        badge: 'Paling umum',
        badgeColor: 'green',
        bestFor: [
          'Kandidat tanpa kesenjangan karier signifikan',
          'Profesional yang berkembang di industri yang sama',
          'Mereka yang pengalaman terbaru langsung relevan dengan posisi',
        ],
        avoidIf: 'Jika Anda memiliki kesenjangan karier yang panjang',
        atsScore: 98,
        atsColor: 'green',
      },
      {
        name: 'Fungsional (berbasis keahlian)',
        badge: 'Berbasis keahlian',
        badgeColor: 'amber',
        bestFor: [
          'Yang ingin pindah industri',
          'Yang memiliki kesenjangan karier',
          'Fresh graduate atau pekerja lepas',
        ],
        avoidIf: 'Jika melamar ke industri konservatif atau perusahaan besar',
        atsScore: 72,
        atsColor: 'amber',
      },
      {
        name: 'Kombinasi',
        badge: 'Seimbang',
        badgeColor: 'blue',
        bestFor: [
          'Yang memiliki keahlian kuat dan pengalaman luas',
          'Posisi kepemimpinan atau senior',
          'Yang ingin menonjolkan keahlian sekaligus hasil',
        ],
        avoidIf: 'Jika pengalaman kerja Anda masih sedikit',
        atsScore: 90,
        atsColor: 'green',
      },
    ],
  },
  chronological: {
    title: 'Format kronologis (terbalik)',
    description:
      'Format yang mencantumkan pengalaman kerja dari yang terbaru. Ini adalah format yang paling disukai rekruter Indonesia dan internasional, dengan kompatibilitas ATS maksimal.',
    whyLoveTitle: 'Mengapa perusahaan menyukai format ini',
    whyLoveText:
      'CV kronologis memungkinkan rekruter langsung melihat perkembangan karier. Sistem ATS mengurai format ini dengan akurasi tertinggi — itulah mengapa perusahaan besar, perusahaan multinasional, dan institusi pemerintah di Indonesia lebih menyukai format ini.',
    structureTitle: 'Struktur bagian',
    sections: [
      { label: 'Informasi pribadi dan kontak', detail: 'Nama, email, telepon, kota', isCore: true },
      { label: 'Ringkasan profesional', detail: '3-4 kalimat yang merangkum pengalaman dan keahlian utama', isCore: true },
      { label: 'Pengalaman kerja', detail: 'Dari terbaru ke terlama (perusahaan, periode, pencapaian)', isCore: true },
      { label: 'Pendidikan', detail: 'Gelar terbaru dan paling relevan' },
      { label: 'Keahlian', detail: 'Keahlian teknis, sertifikasi, dan bahasa' },
    ],
    downloadLabel: 'Unduh template',
    aiLabel: 'Buat dengan AI',
  },
  functional: {
    title: 'Format fungsional (berbasis keahlian)',
    description: 'Format yang menyusun CV berdasarkan keahlian dan kompetensi, bukan kronologi.',
    warningTitle: 'Perhatikan kompatibilitas ATS',
    warningText:
      'Beberapa sistem ATS kesulitan membaca CV fungsional dengan bagian pengalaman yang diminimalkan.',
    structureTitle: 'Struktur bagian',
    sections: [
      { label: 'Informasi pribadi dan kontak', isCore: true },
      { label: 'Ringkasan profesional', isCore: true },
      {
        label: 'Area kompetensi utama',
        detail: '3-4 area utama dengan hasil konkret untuk masing-masing',
        isCore: true,
      },
      { label: 'Pengalaman kerja (ringkasan)', detail: 'Hanya perusahaan, jabatan, dan periode' },
      { label: 'Pendidikan' },
    ],
    downloadLabel: 'Unduh template',
    aiLabel: 'Buat dengan AI',
  },
  combination: {
    title: 'Format kombinasi',
    description: 'Menggabungkan kekuatan format kronologis dan fungsional.',
    whoForTitle: 'Kapan memilih format ini',
    whoForItems: [
      'Profesional menengah-senior dengan pengalaman luas dan keahlian manajerial',
      'Yang ingin menonjolkan kedalaman pengalaman sekaligus keragaman keahlian',
      'Yang melamar posisi di mana hasil teknis maupun operasional sama pentingnya',
      'Yang memiliki riwayat karier lintas beberapa industri',
    ],
    downloadLabel: 'Unduh template',
    aiLabel: 'Buat dengan AI',
  },
  faq: {
    title: 'Pertanyaan yang sering diajukan',
    items: [
      {
        question: 'Format CV apa yang paling umum di Indonesia?',
        answer:
          'Di Indonesia, format kronologis (terbalik) adalah yang paling umum di sektor swasta. Perusahaan besar, perusahaan multinasional, dan perusahaan teknologi mengharapkan format ini. Di sektor pemerintah, formulir lamaran khusus (seperti formulir CPNS) mungkin diperlukan.',
      },
      {
        question: 'Saya sering berganti pekerjaan — format apa yang lebih baik?',
        answer:
          'Format kombinasi adalah pilihan terbaik. Anda bisa menonjolkan keahlian sekaligus mempertahankan riwayat pekerjaan kronologis. Dengan cara ini Anda menunjukkan kedalaman pengalaman dan fleksibilitas sekaligus.',
      },
      {
        question: 'Format apa yang cocok untuk fresh graduate?',
        answer:
          'Format kronologis ideal untuk fresh graduate. Tempatkan bagian pendidikan sebelum pengalaman kerja untuk menonjolkan prestasi akademik, magang, dan proyek Anda.',
      },
      {
        question: 'Apa itu CV ATS friendly?',
        answer:
          'ATS (Applicant Tracking System) adalah perangkat lunak yang digunakan perusahaan untuk menyaring CV. CV yang ATS friendly memiliki format sederhana, judul yang jelas, dan kata kunci yang relevan — tanpa tabel atau grafik. Format kronologis bekerja paling baik dengan sistem ini.',
      },
      {
        question: 'Apakah Europass berlaku di Indonesia?',
        answer:
          'Europass adalah format standar untuk lamaran ke institusi Uni Eropa dan jarang terlihat di pasar kerja Indonesia. Jika melamar ke negara UE, Europass bisa dipertimbangkan; namun untuk lamaran di sektor swasta Indonesia, format kronologis jauh lebih efektif.',
      },
    ],
  },
  externalResources: {
    title: 'Sumber daya eksternal',
    items: [
      { href: 'https://www.kemnaker.go.id/', label: 'Kemnaker — Kementerian Ketenagakerjaan Republik Indonesia' },
      { href: 'https://www.glints.com/id', label: 'Glints Indonesia — Platform lowongan kerja terkemuka' },
    ],
  },
  stickyCta: { text: 'Sudah menemukan format CV yang tepat?', ctaLabel: 'Buat CV sekarang' },
  bottomCta: {
    title: 'Tinggalkan masalah format CV',
    description:
      'Pembuat CV bertenaga AI kami secara otomatis mengoptimalkan format, font, dan margin. Pilih dari 20+ template yang kompatibel ATS.',
    ctaLabel: 'Buat CV gratis',
  },
};
`;

// ─── Biodata format page ──────────────────────────────────────────────────────

const BIODATA_FORMAT_ID = `
const id: BiodataFormatPageContent = {
  meta: {
    title: 'Biodata / Daftar Riwayat Hidup: Panduan Format & Template Gratis 2026 | Best AI Resume',
    description:
      'Apa itu biodata atau daftar riwayat hidup? Pelajari format biodata untuk lamaran kerja di Indonesia. Template gratis siap unduh. 2026.',
    keywords:
      'biodata, daftar riwayat hidup, format biodata, biodata lamaran kerja, biodata vs cv, template biodata, contoh biodata, form daftar riwayat hidup',
  },
  schemas: {
    breadcrumbName: 'Panduan Format Biodata',
    articleHeadline: 'Biodata / Daftar Riwayat Hidup: Panduan Format, Template, dan Contoh 2026',
    articleDescription:
      'Panduan lengkap format biodata dan daftar riwayat hidup. Pelajari perbedaannya dengan CV dan resume, unduh template gratis.',
  },
  hero: {
    badge: 'Panduan lengkap untuk 2026',
    title: 'Panduan Format Biodata',
    titleHighlight: '(Template Gratis)',
    subtitle:
      '<strong>Biodata atau daftar riwayat hidup</strong> adalah dokumen standar yang digunakan dalam lamaran kerja di Indonesia dan Asia Tenggara. Pelajari perbedaan biodata dengan CV dan resume, lalu unduh template gratis yang siap digunakan.',
    ctaTemplates: 'Unduh Template',
    ctaBuild: 'Buat Biodata dengan AI',
  },
  whatIs: {
    title: 'Apa Itu Biodata?',
    paragraphs: [
      '<strong>Biodata</strong> (singkatan dari data biografis) adalah dokumen yang menyajikan ringkasan komprehensif latar belakang pribadi dan profesional Anda. Berbeda dengan CV atau resume yang hanya berfokus pada pengalaman kerja dan keahlian, biodata juga mencakup detail pribadi seperti <strong>tanggal lahir, status pernikahan, kewarganegaraan</strong>, dan terkadang informasi keluarga.',
      'Format biodata umum digunakan di <strong>Indonesia dan Asia Tenggara</strong> (terutama untuk instansi pemerintah dan perusahaan tradisional), <strong>Asia Selatan</strong> (India, Pakistan, Bangladesh), dan <strong>Timur Tengah</strong> (UEA, Arab Saudi, Qatar). Instansi pemerintah dan perusahaan tradisional di wilayah-wilayah ini sering meminta biodata daripada resume bergaya Barat.',
    ],
    insightTitle: 'Catatan Penting:',
    insightText:
      'Di Indonesia, banyak instansi pemerintah dan BUMN masih menggunakan formulir "daftar riwayat hidup" sebagai dokumen standar. Namun perusahaan swasta modern dan startup umumnya menerima CV atau resume biasa.',
  },
  vsComparison: {
    title: 'Biodata, CV, dan Resume: Apa Bedanya?',
    subtitle: 'Mengetahui dokumen mana yang digunakan kapan sangat penting dalam pencarian kerja Anda.',
    headers: { aspect: 'Aspek', biodata: 'Biodata', resume: 'CV/Resume', cv: 'CV Akademik' },
    rows: [
      { aspect: 'Panjang', biodata: '1-2 halaman', resume: '1-2 halaman', cv: '2+ halaman' },
      {
        aspect: 'Informasi Pribadi',
        biodata: 'Lengkap (tanggal lahir, status, agama, keluarga)',
        resume: 'Minimal (nama, kontak)',
        cv: 'Minimal (nama, kontak)',
        biodataHighlight: 'green',
      },
      {
        aspect: 'Fokus',
        biodata: 'Riwayat pribadi + karier',
        resume: 'Keahlian + pencapaian',
        cv: 'Akademik + penelitian',
      },
      {
        aspect: 'Wilayah Umum',
        biodata: 'Indonesia, Malaysia, India, Pakistan, Timur Tengah',
        resume: 'AS, Kanada, Australia, Eropa',
        cv: 'Eropa, Inggris, lingkungan akademik',
      },
      {
        aspect: 'Penggunaan Ideal',
        biodata: 'Pekerjaan pemerintah, perusahaan tradisional, BUMN',
        resume: 'Perusahaan swasta, startup, teknologi',
        cv: 'Posisi akademik, penelitian, medis',
      },
      {
        aspect: 'Kustomisasi',
        biodata: 'Biodata yang sama digunakan untuk banyak lamaran',
        resume: 'Disesuaikan untuk setiap pekerjaan',
        cv: 'Diperbarui seiring pencapaian',
      },
    ],
  },
  structure: {
    title: 'Struktur Format Biodata Standar',
    description: 'Meskipun tidak ada format biodata "resmi" yang tunggal, sebagian besar pemberi kerja mengharapkan bagian-bagian ini dalam urutan berikut:',
    sections: [
      {
        number: 1,
        label: 'Informasi Pribadi',
        detail: 'Nama, Foto, Tanggal Lahir, Jenis Kelamin, Status Pernikahan, Kewarganegaraan',
        colorGroup: 'orange',
      },
      {
        number: 2,
        label: 'Informasi Kontak',
        detail: 'Alamat (Tetap dan Sementara), Telepon, Email',
        colorGroup: 'default',
      },
      {
        number: 3,
        label: 'Tujuan Karier',
        detail: '2-3 kalimat yang mendeskripsikan tujuan karier Anda',
        colorGroup: 'default',
      },
      {
        number: 4,
        label: 'Riwayat Pendidikan',
        detail: 'Gelar, Institusi, Tahun, IPK',
        colorGroup: 'blue',
      },
      {
        number: 5,
        label: 'Pengalaman Kerja',
        detail: 'Perusahaan, Jabatan, Periode, Tanggung Jawab',
        colorGroup: 'blue',
      },
      {
        number: 6,
        label: 'Keahlian dan Kompetensi',
        detail: 'Keahlian teknis, kemampuan bahasa, penguasaan software',
        colorGroup: 'default',
      },
      {
        number: 7,
        label: 'Informasi Tambahan',
        detail: 'Hobi, Minat, Prestasi, Referensi',
        colorGroup: 'default',
      },
      {
        number: 8,
        label: 'Pernyataan',
        detail: '"Dengan ini saya menyatakan bahwa informasi di atas adalah benar dan lengkap…"',
        colorGroup: 'dark',
      },
    ],
    proTipTitle: 'Tips Profesional:',
    proTipText:
      'Sesuaikan bagian-bagian sesuai dengan negara atau institusi yang Anda lamar. Beberapa daerah meminta informasi agama atau golongan darah, sementara yang lain cukup dengan informasi profesional standar.',
  },
  personalInfo: {
    title: 'Bagian Informasi Pribadi',
    description: 'Informasi pribadi adalah bagian paling kritis dari biodata — ekspektasi berbeda berdasarkan wilayah.',
    alwaysInclude: {
      title: 'Selalu Sertakan',
      items: [
        'Nama lengkap',
        'Tanggal lahir (atau usia)',
        'Jenis kelamin',
        'Kewarganegaraan',
        'Informasi kontak (telepon, email)',
        'Alamat (tetap dan/atau sementara)',
      ],
    },
    optional: {
      title: 'Opsional Berdasarkan Wilayah',
      items: [
        'Status pernikahan',
        'Agama',
        'Informasi paspor (untuk lamaran luar negeri)',
        'Tinggi dan berat badan (beberapa lamaran Asia)',
        'Nama ayah / informasi orang tua',
        'Foto pasfoto',
      ],
    },
    noteTitle: 'Catatan untuk Pasar Kerja Indonesia:',
    noteText:
      'Di Indonesia, banyak lowongan kerja — terutama di BUMN dan instansi pemerintah — masih meminta foto, agama, dan golongan darah dalam biodata. Perusahaan swasta modern dan multinasional umumnya hanya meminta CV standar tanpa informasi tersebut.',
  },
  types: {
    title: 'Jenis-Jenis Biodata',
    jobBiodata: {
      title: 'Biodata Lamaran Kerja',
      description: 'Mencakup detail pribadi beserta latar belakang profesional dan tujuan karier.',
      focusTitle: 'Fokus Utama',
      focusItems: ['Tujuan karier', 'Riwayat pendidikan', 'Pengalaman kerja', 'Keahlian dan sertifikasi', 'Referensi'],
      commonTitle: 'Wilayah Umum',
      commonItems: ['Instansi pemerintah Indonesia', 'BUMN', 'Perusahaan tradisional Asia Tenggara', 'Pemberi kerja Timur Tengah'],
    },
    marriageBiodata: {
      title: 'Biodata Pernikahan',
      description: 'Digunakan dalam tradisi perjodohan Asia Selatan, mencakup informasi keluarga dan ciri pribadi.',
      sectionsTitle: 'Bagian Khas',
      sectionsItems: [
        'Informasi pribadi (tinggi, berat, warna kulit)',
        'Agama / suku / golongan',
        'Latar belakang keluarga',
        'Pendidikan dan karier',
        'Ciri fisik',
        'Preferensi pasangan',
      ],
      designTitle: 'Tips Desain',
      designItems: [
        'Sertakan foto profesional',
        'Cantumkan informasi yang disetujui keluarga',
        'Utamakan kesederhanaan dan kredibilitas',
        'Cerminkan nilai agama dan budaya',
      ],
    },
  },
  regions: {
    title: 'Format Biodata Berdasarkan Wilayah',
    description: 'Setiap negara memiliki ekspektasi berbeda. Berikut informasi yang dicari pemberi kerja di setiap wilayah:',
    items: [
      {
        country: 'Indonesia',
        flag: '🇮🇩',
        text: 'Biodata atau daftar riwayat hidup adalah standar untuk instansi pemerintah dan BUMN. Perusahaan swasta multinasional lebih memilih CV. Foto, agama, dan golongan darah sering diminta. Pernyataan kebenaran data di bagian akhir adalah umum.',
      },
      {
        country: 'India',
        flag: '🇮🇳',
        text: 'Biodata adalah standar untuk instansi pemerintah (UPSC, SSC) dan bank pemerintah. Perusahaan multinasional swasta lebih memilih resume. Nama ayah, kasta (untuk sistem kuota), dan surat referensi biasanya diperlukan.',
      },
      {
        country: 'Pakistan',
        flag: '🇵🇰',
        text: 'Mirip dengan India, nomor CNIC (kartu identitas nasional) dan nama ayah adalah informasi dasar. Posisi pemerintah dan semi-pemerintah memerlukan biodata lengkap.',
      },
      {
        country: 'UEA dan Teluk',
        flag: '🇦🇪',
        text: 'Biodata berfoto dengan kewarganegaraan, status visa, dan tanggal mulai kerja diharapkan. Informasi agama bisa diminta. Untuk pelamar internasional, informasi paspor harus disertakan.',
      },
    ],
  },
  templates: {
    title: 'Template Biodata Gratis',
    subtitle:
      'Unduh template biodata Word/PDF yang dirancang secara profesional. Mudah dikustomisasi dengan informasi Anda sendiri.',
    cards: [
      {
        title: 'Template Biodata Lamaran Kerja',
        description: 'Template profesional dengan bagian standar untuk lamaran kerja.',
        ctaLabel: 'Buat dengan AI',
        color: 'blue',
      },
      {
        title: 'Template Biodata Sederhana',
        description: 'Desain bersih dan sederhana untuk fresh graduate atau yang berpengalaman sedikit.',
        ctaLabel: 'Mulai Membuat',
        color: 'orange',
      },
    ],
  },
  tips: {
    title: 'Tips Membuat Biodata yang Efektif',
    items: [
      {
        title: 'Gunakan Foto Profesional',
        description: 'Gunakan foto pasfoto ukuran 3x4 atau 4x6 dengan latar belakang polos dan pakaian formal. Jangan gunakan selfie atau foto kasual.',
      },
      {
        title: 'Buat Ringkas',
        description: 'Jangan melebihi 1-2 halaman. Rekruter tidak ingin membaca dokumen yang terlalu panjang.',
      },
      {
        title: 'Format Konsisten',
        description: 'Gunakan jenis dan ukuran font yang sama. Buat judul menonjol dan pastikan tampilan teratur.',
      },
      {
        title: 'Sertakan Pernyataan',
        description: 'Sertakan kalimat "Dengan ini saya menyatakan bahwa informasi di atas adalah benar dan lengkap."',
      },
      {
        title: 'Urutkan Pendidikan dari Terbaru',
        description: 'Tempatkan gelar terakhir di atas. Cantumkan IPK jika bagus.',
      },
      {
        title: 'Periksa Kesalahan Ketik',
        description: 'Kesalahan ejaan dan penulisan menciptakan kesan pertama yang buruk. Periksa dengan teliti sebelum mengirim.',
      },
      {
        title: 'Sertakan Hanya Informasi yang Relevan',
        description: 'Hindari memasukkan informasi pribadi yang tidak diminta atau tidak relevan dengan posisi.',
      },
      {
        title: 'Tanda Tangani dan Beri Tanggal',
        description: 'Tambahkan tanda tangan, tanggal terkini, dan kota Anda di bagian bawah dokumen.',
      },
    ],
  },
  faq: {
    title: 'Pertanyaan yang Sering Diajukan',
    items: [
      {
        question: 'Apa perbedaan biodata dan CV?',
        answer:
          'CV berfokus pada pengalaman, keahlian, dan pencapaian, dan disesuaikan untuk setiap lamaran kerja. Biodata mencakup detail pribadi tambahan seperti tanggal lahir, status pernikahan, agama, dan informasi keluarga. Di Indonesia dan banyak negara Asia, biodata adalah dokumen standar untuk lamaran ke instansi pemerintah dan perusahaan tradisional.',
      },
      {
        question: 'Apakah biodata benar-benar digunakan dalam lamaran kerja?',
        answer:
          'Ya. Biodata atau daftar riwayat hidup sangat umum di Indonesia, Malaysia, India, Pakistan, Bangladesh, dan Timur Tengah. Instansi pemerintah dan perusahaan tradisional di wilayah-wilayah ini mungkin secara khusus meminta biodata daripada resume.',
      },
      {
        question: 'Informasi pribadi apa yang harus disertakan dalam biodata?',
        answer:
          'Biodata untuk pekerjaan biasanya mencakup nama lengkap, tanggal lahir, jenis kelamin, kewarganegaraan, status pernikahan, informasi kontak, dan alamat. Beberapa pemberi kerja Indonesia juga meminta agama, golongan darah, dan foto.',
      },
      {
        question: 'Berapa halaman biodata?',
        answer:
          '1-2 halaman adalah ideal. Biodata lamaran kerja biasanya 1 halaman, sementara biodata pernikahan bisa 2 halaman karena informasi keluarga. Perhatikan agar ringkas namun komprehensif.',
      },
      {
        question: 'Bisakah pembuat CV digunakan untuk membuat biodata?',
        answer:
          'Ya. Pembuat CV AI kami bisa digunakan untuk membuat biodata juga. Pilih template standar dan sesuaikan bagian informasi pribadi sesuai persyaratan biodata. Susun bagian Anda sesuai ekspektasi regional.',
      },
      {
        question: 'Apakah biodata diperlukan di Indonesia?',
        answer:
          'Di Indonesia, biodata atau daftar riwayat hidup masih diminta oleh banyak instansi pemerintah dan BUMN. Perusahaan swasta modern dan startup umumnya menerima CV standar. Sesuaikan dengan jenis perusahaan yang Anda lamar.',
      },
    ],
  },
  crossLinks: {
    title: 'Sumber Daya Terkait',
    items: [
      { href: '/resume-format', title: 'Panduan Format CV', subtitle: 'Kronologis / Fungsional / Kombinasi' },
      { href: '/templates', title: 'Template CV', subtitle: '20+ template profesional' },
      { href: '/resume-examples', title: 'Contoh CV', subtitle: '300+ contoh CV berbagai profesi' },
    ],
  },
  externalResources: {
    title: 'Sumber Daya Eksternal',
    items: [
      { href: 'https://www.kemnaker.go.id/', label: 'Kemnaker — Kementerian Ketenagakerjaan Republik Indonesia' },
      { href: 'https://www.glints.com/id', label: 'Glints Indonesia — Platform lowongan kerja terkemuka' },
    ],
  },
  bottomCta: {
    title: 'Buat Biodata atau CV dalam Beberapa Menit',
    description:
      'Pembuat CV bertenaga AI kami membantu Anda menyiapkan dokumen profesional dengan struktur yang tepat. Pilih dari berbagai template dan ekspor ke PDF atau Word.',
    ctaLabel: 'Buat Biodata Gratis',
  },
};
`;

// ─── File processing ──────────────────────────────────────────────────────────

function processFile(filename, idContent) {
  const filepath = resolve(contentDir, filename);
  let content = readFileSync(filepath, 'utf8');

  // Check if `id` already exists
  if (/\bconst id\s*[=:]/.test(content)) {
    console.log(`  ⏭  ${filename} — already has \`id\` locale, skipping`);
    return;
  }

  const insertBefore = '\nconst contentMap';
  const idx = content.lastIndexOf(insertBefore);
  if (idx === -1) {
    console.log(`  ⚠️  ${filename} — could not find insertion point, skipping`);
    return;
  }

  content = content.slice(0, idx) + idContent + content.slice(idx);

  // Add `id` to the contentMap
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

console.log('SESSION 5 (part 2): Adding id locale to 3 remaining files...\n');

processFile('privacy-page.ts', PRIVACY_ID);
processFile('resume-format.ts', RESUME_FORMAT_ID);
processFile('biodata-format.ts', BIODATA_FORMAT_ID);

console.log('\nDone!');
