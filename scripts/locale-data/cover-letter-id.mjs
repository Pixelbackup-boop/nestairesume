/**
 * Indonesian (id) locale data for cover letter example generation.
 * Imported by generate-locale-cover-letters.mjs via:
 *   await import('./locale-data/cover-letter-id.mjs')
 *
 * Keyword-optimized from seo/indonesian-top-300-keywords.csv:
 *   - Primary cover letter terms: "surat lamaran kerja", "surat lamaran"
 *   - Template terms: "template surat lamaran kerja", "contoh surat lamaran"
 *   - Related: "lamaran kerja template", "email lamaran kerja"
 */

import { JOB_TITLES as RESUME_TITLES } from './resume-id.mjs';

// ─── CONFIG ─────────────────────────────────────────────────────────────────

export const CONFIG = {
  locale: 'id',
  author: 'Rina Kusuma',
  authorSlug: 'rina-kusuma',
  authorBio: 'Konsultan karier dan spesialis penulisan CV dengan pengalaman lebih dari 10 tahun membantu para profesional Indonesia mendapatkan pekerjaan impian mereka. Berpengalaman dalam penulisan surat lamaran kerja yang efektif dan strategi pencarian kerja.',
  titlePattern: (job) => `Contoh Surat Lamaran Kerja ${job}: Template & Panduan 2026`,
  descriptionPattern: (job) => `Contoh surat lamaran kerja ${job.toLowerCase()} yang profesional dan siap digunakan. Template surat lamaran ${job.toLowerCase()} yang menarik perhatian HRD, ATS-friendly, dan disesuaikan untuk pasar kerja Indonesia 2026.`,
  imageAltPattern: (job) => `Contoh Surat Lamaran Kerja ${job} Profesional 2026`,
};

// ─── JOB TITLES (English → Indonesian) ──────────────────────────────────────
// Extends resume titles with cover-letter-specific additions

export const JOB_TITLES = {
  ...RESUME_TITLES,
  'Bookkeeper': 'Pembukuan',
  'Corporate Trainer': 'Pelatih Korporat',
  'Customer Service Representative': 'Customer Service',
  'EMT/Paramedic': 'EMT/Paramedis',
  'Frontend Developer': 'Frontend Developer',
  'Healthcare Administrator': 'Administrator Kesehatan',
  'Human Resources Manager': 'Manajer HRD',
  'Machinist': 'Operator Mesin',
  'Registered Nurse': 'Perawat',
  'Solutions Architect': 'Solutions Architect',
  'Systems Administrator': 'Administrator Sistem',
  'Tax Accountant': 'Akuntan Pajak',
};

// ─── CATEGORIES (English → Indonesian) ──────────────────────────────────────

export const CATEGORIES = {
  Technology: 'Teknologi',
  Healthcare: 'Kesehatan',
  Trades: 'Keahlian Teknis',
  Hospitality: 'Perhotelan',
  'Food Service': 'Layanan Makanan',
  Creative: 'Kreatif',
  Education: 'Pendidikan',
  Government: 'Pemerintahan',
  Finance: 'Keuangan',
  Marketing: 'Pemasaran',
  Business: 'Bisnis',
  Engineering: 'Teknik',
  Sales: 'Penjualan',
  Legal: 'Hukum',
  'Real Estate': 'Properti',
  HR: 'HRD',
  Fitness: 'Kebugaran',
  Management: 'Manajemen',
  'Animal Care': 'Perawatan Hewan',
  Logistics: 'Logistik',
  'Customer Service': 'Layanan Pelanggan',
  Administrative: 'Administrasi',
  Transportation: 'Transportasi',
  Retail: 'Ritel',
  Cleaning: 'Kebersihan',
  'Social Services': 'Layanan Sosial',
  Manufacturing: 'Manufaktur',
  Construction: 'Konstruksi',
  Security: 'Keamanan',
  Science: 'Sains',
  Events: 'Acara',
  'Writing & Content': 'Penulisan & Konten',
  'Supply Chain': 'Rantai Pasok',
  Research: 'Riset',
  Insurance: 'Asuransi',
  Consulting: 'Konsultasi',
  Aviation: 'Penerbangan',
  Automotive: 'Otomotif',
  Media: 'Media',
  Maritime: 'Maritim',
  'Law Enforcement': 'Penegakan Hukum',
  'Entry-Level': 'Pemula',
  Entertainment: 'Hiburan',
  Childcare: 'Penitipan Anak',
  Beauty: 'Kecantikan',
  Architecture: 'Arsitektur',
  'Business & Finance': 'Bisnis & Keuangan',
  'Health & Fitness': 'Kesehatan & Kebugaran',
  'Skilled Trades': 'Keahlian Terampil',
  Quality: 'Kualitas',
  Accounting: 'Akuntansi',
};

// ─── TAGS GENERATOR ─────────────────────────────────────────────────────────

export function generateTags(jobTitle, slug) {
  const lower = jobTitle.toLowerCase();
  return [
    `surat lamaran kerja ${lower}`,
    `contoh surat lamaran ${lower}`,
    `template surat lamaran ${lower}`,
    `surat lamaran ${lower} profesional`,
    `surat lamaran kerja`,
    `contoh surat lamaran kerja`,
    `template surat lamaran`,
    `lamaran kerja ${lower}`,
  ];
}

// ─── FAQ GENERATOR ──────────────────────────────────────────────────────────

export function generateFAQ(jobTitle) {
  const lower = jobTitle.toLowerCase();
  return [
    {
      question: `Apa yang harus disertakan dalam surat lamaran ${lower}?`,
      answer: `Surat lamaran ${lower} yang efektif harus mencakup: paragraf pembuka yang menarik yang menyebutkan posisi spesifik, bagian tengah yang menghubungkan pengalaman dan keterampilan Anda dengan kebutuhan perusahaan, dan penutup yang kuat dengan ajakan bertindak. Selalu sesuaikan setiap surat lamaran dengan perusahaan dan posisi spesifik.`,
    },
    {
      question: `Berapa panjang ideal surat lamaran untuk posisi ${lower}?`,
      answer: `Surat lamaran ${lower} yang ideal berisi 3-4 paragraf atau sekitar 250-400 kata — cukup untuk menunjukkan antusiasme dan kualifikasi Anda tanpa membuang waktu rekruter. Hindari mengulang isi CV; fokuslah pada alasan spesifik mengapa Anda cocok untuk peran tersebut.`,
    },
    {
      question: `Bagaimana cara menyesuaikan surat lamaran untuk posisi ${lower}?`,
      answer: `Teliti perusahaan secara mendalam dan sesuaikan surat lamaran Anda untuk mencerminkan nilai dan kebutuhan mereka. Gunakan kata kunci spesifik dari deskripsi pekerjaan ${lower}, sebutkan proyek atau inisiatif perusahaan yang relevan, dan jelaskan bagaimana pengalaman unik Anda menyelesaikan tantangan spesifik mereka.`,
    },
    {
      question: `Haruskah saya mencantumkan ekspektasi gaji dalam surat lamaran ${lower}?`,
      answer: `Umumnya tidak disarankan mencantumkan ekspektasi gaji dalam surat lamaran kecuali diminta secara eksplisit oleh perusahaan. Jika diminta, sebutkan rentang yang realistis berdasarkan riset pasar untuk posisi ${lower} di lokasi Anda, bukan angka pasti.`,
    },
    {
      question: `Format file apa yang terbaik untuk surat lamaran ${lower}?`,
      answer: `PDF adalah format yang paling direkomendasikan untuk surat lamaran ${lower} karena mempertahankan format di semua perangkat dan sistem operasi. Namun, jika perusahaan secara spesifik meminta format Word atau teks biasa, ikuti instruksi mereka. Pastikan nama file profesional seperti "Surat-Lamaran-[Nama Anda]-${lower.replace(/\s+/g, '-')}.pdf".`,
    },
  ];
}

// ─── BODY GENERATOR ─────────────────────────────────────────────────────────

export function generateBody(jobTitle, category, keySkills, avgSalary, jobGrowth, slug) {
  const lower = jobTitle.toLowerCase();
  const skills = keySkills || [];
  const topSkills = skills.slice(0, 3).join(', ') || 'keterampilan inti';
  const midSkills = skills.slice(3, 5).join(', ') || 'keterampilan pendukung';

  return `
## Cara Menulis Surat Lamaran ${jobTitle} yang Efektif

Surat lamaran ${lower} yang kuat adalah jembatan antara CV Anda dan wawancara kerja. Di pasar kerja Indonesia yang kompetitif, surat lamaran yang dipersonalisasi dan terstruktur dengan baik dapat membedakan Anda dari ratusan pelamar lainnya.

Tidak seperti CV yang mencantumkan kualifikasi Anda, surat lamaran ${lower} memungkinkan Anda menjelaskan mengapa Anda tertarik dengan perusahaan ini secara khusus, bagaimana pengalaman Anda yang relevan mempersiapkan Anda untuk peran ini, dan nilai unik apa yang Anda bawa ke tim.

## Contoh Surat Lamaran ${jobTitle}

### Pemula / Fresh Graduate

**[Tanggal]**

Kepada Yth.
HRD Manager
[Nama Perusahaan]
[Alamat Perusahaan]

Dengan hormat,

Saya menulis surat ini dengan penuh antusiasme untuk melamar posisi ${lower} di [Nama Perusahaan] yang saya temukan di [sumber lowongan]. Sebagai lulusan baru [nama jurusan] dari [nama universitas], saya membawa dasar yang kuat dalam ${topSkills || 'bidang terkait'} dan semangat untuk berkontribusi pada tim Anda.

Selama studi saya, saya mengembangkan keterampilan dalam ${topSkills} melalui [proyek akademik/magang/kegiatan organisasi]. Saya sangat terkesan dengan [sebutkan hal spesifik tentang perusahaan] dan yakin bahwa nilai-nilai perusahaan Anda sejalan dengan tujuan karier saya.

Saya antusias untuk berkontribusi pada [Nama Perusahaan] dan siap belajar dari tim yang berpengalaman. Saya lampirkan CV dan portofolio untuk pertimbangan Anda.

Hormat saya,
[Nama Anda]

---

### Menengah (3-7 Tahun Pengalaman)

**[Tanggal]**

Kepada Yth.
[Nama HRD/Direktur]
[Nama Perusahaan]

Dengan hormat,

Dengan pengalaman lebih dari [X] tahun sebagai ${lower} dan rekam jejak terbukti dalam ${topSkills}, saya melamar posisi ${lower} di [Nama Perusahaan]. Saya tertarik dengan peluang ini karena [alasan spesifik tentang perusahaan/posisi].

Dalam peran saya saat ini di [Perusahaan Sebelumnya], saya berhasil [pencapaian spesifik dengan angka, misalnya: meningkatkan efisiensi proses 30%, mengelola portofolio klien senilai Rp X miliar]. Keahlian saya dalam ${topSkills} dan ${midSkills} langsung relevan dengan tantangan yang disebutkan dalam deskripsi pekerjaan Anda.

Saya berharap dapat mendiskusikan bagaimana pengalaman dan keterampilan saya dapat berkontribusi pada tujuan [Nama Perusahaan]. Apakah Anda bersedia menjadwalkan percakapan singkat minggu ini?

Hormat saya,
[Nama Anda]

---

### Senior (8+ Tahun Pengalaman)

**[Tanggal]**

Kepada Yth.
[Nama Direktur/VP]
[Nama Perusahaan]

Dengan hormat,

Dengan lebih dari [X] tahun pengalaman memimpin tim dan mengelola inisiatif strategis di bidang ${lower}, saya melihat posisi ini sebagai kesempatan luar biasa untuk membawa keahlian saya ke [Nama Perusahaan] yang terus berkembang.

Di [Perusahaan Sebelumnya], saya memimpin transformasi yang menghasilkan [pencapaian signifikan]. Saya mengkhususkan diri dalam ${topSkills}, dan pendekatan berbasis data saya telah secara konsisten menghasilkan [hasil bisnis yang terukur].

Saya percaya bahwa visi [Nama Perusahaan] untuk [sebutkan tujuan perusahaan] sejalan dengan keahlian dan pendekatan kepemimpinan saya. Saya ingin menjelaskan bagaimana saya dapat berkontribusi pada pertumbuhan tersebut.

Terima kasih atas pertimbangan Anda.

Hormat saya,
[Nama Anda]

## Tips Menulis Surat Lamaran ${jobTitle} yang Lolos ATS

### Gunakan Kata Kunci yang Tepat

Sistem ATS memindai surat lamaran untuk kata kunci yang relevan. Untuk posisi ${lower}, pastikan Anda menyertakan:

- Judul posisi yang tepat sesuai iklan lowongan
- Keterampilan teknis utama: ${topSkills || 'keterampilan spesifik bidang'}
- Terminologi industri yang relevan
- Nama perangkat lunak atau alat yang disebutkan dalam deskripsi pekerjaan

### Struktur yang Direkomendasikan

1. **Paragraf Pembuka** — Nyatakan posisi yang dilamar, sumber lowongan, dan satu pernyataan kuat tentang kualifikasi utama Anda
2. **Paragraf Isi 1** — Hubungkan pengalaman relevan dengan kebutuhan spesifik perusahaan (gunakan data dan angka)
3. **Paragraf Isi 2** — Tunjukkan pengetahuan tentang perusahaan dan alasan Anda tertarik secara khusus
4. **Paragraf Penutup** — Ajakan bertindak yang jelas: minta wawancara dengan menyebut waktu spesifik

### Kesalahan Umum yang Harus Dihindari

- **Surat lamaran generik** — Rekruter Indonesia langsung mengenali surat yang tidak dipersonalisasi
- **Mengulang CV** — Surat lamaran harus melengkapi, bukan mengulangi CV Anda
- **Terlalu panjang** — Lebih dari satu halaman jarang dibaca sampai habis
- **Tidak ada ajakan bertindak** — Selalu tutup dengan permintaan wawancara yang spesifik
- **Kesalahan nama/jabatan** — Selalu verifikasi nama dan jabatan penerima

## Gaji & Prospek Karier ${jobTitle}

Posisi ${lower} di Indonesia menawarkan kompensasi yang kompetitif, dengan rata-rata gaji berkisar antara **${avgSalary || 'Rp 8.000.000 - Rp 25.000.000'}** per bulan tergantung pengalaman dan lokasi. Pertumbuhan kebutuhan tenaga ${lower} diperkirakan **${jobGrowth || '+10%'}** dalam beberapa tahun ke depan.

**Sumber Referensi:**
- [Bureau of Labor Statistics (BLS)](https://www.bls.gov/ooh/) — Data ketenagakerjaan dan gaji
- [Glassdoor](https://www.glassdoor.com/Salaries/) — Kisaran gaji berdasarkan laporan karyawan
- [PayScale](https://www.payscale.com/research/US/) — Riset kompensasi berdasarkan posisi

*Kompensasi aktual bervariasi berdasarkan pengalaman, industri, dan ukuran perusahaan.*

## Sumber Daya Tambahan

- [Contoh CV ${jobTitle}](/id/resume-examples/${slug}) — Lihat contoh CV yang matching dengan surat lamaran Anda
- [Template CV ATS-Friendly](/id/templates) — Buat CV profesional yang lolos seleksi ATS
- [Pembuat CV Gratis](/id/builder) — Buat CV dan surat lamaran dalam hitungan menit
- [Semua Contoh Surat Lamaran](/id/cover-letter-examples) — Jelajahi ratusan contoh berdasarkan bidang pekerjaan
`;
}
