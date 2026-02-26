import { LocaleBundle } from './types';

const id: LocaleBundle = {
    localeData: {
        cities: ['Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Semarang'],
        country: 'Indonesia',
        nationality: 'Indonesian',
        companies: {
            tech: ['TechCorp Solusi', 'InnovaTech Indonesia', 'CloudWorks Nusantara', 'DataLabs Indonesia', 'AppForge Digital'],
            design: ['Kreasi Visual Studio', 'DesainHub Indonesia', 'Pixel Sempurna Kreatif', 'Studio UX Nusantara', 'Seni Digital Indonesia'],
            marketing: ['Pertumbuhan Media Grup', 'Elevasi Brand Indonesia', 'Digital Jangkauan Marketing', 'Engage Media Nusantara', 'Dampak Marketing Solusi'],
            finance: ['Kapital Penasihat Indonesia', 'Artha Finansial Grup', 'Mulia Akuntansi Solusi', 'Investama Partners', 'Fiskal Solusi Nusantara'],
            healthcare: ['Rumah Sakit Umum Metropolitan', 'Pusat Kesehatan Masyarakat', 'Sehat Plus Klinik', 'Mitra Sehat Medika', 'Rumah Sakit Daerah Sentral'],
            education: ['SMA Negeri Unggulan', 'Akademi Harapan Bangsa', 'Universitas Negeri', 'Sekolah Tinggi Ilmu Pendidikan', 'Pusat Pembelajaran Unggul'],
            sales: ['Solusi Bisnis Enterprise', 'Mitra Dagang Global', 'TechSales Indonesia', 'Asosiasi Pertumbuhan Bisnis', 'Premier Penjualan Grup'],
            hospitality: ['Restoran Hotel Grand Nusantara', 'Bistro Cita Rasa', 'Riverside Grill & Bar', 'Nusa Dining Co.', 'Dapur Pesisir'],
            general: ['Karya Mandiri Corporation', 'Global Enterprises Indonesia', 'Solusi Utama Nusantara', 'Industri Inovatif Indonesia', 'Mitra Unggul Sejahtera'],
        },
        degrees: {
            tech: { degree: 'Sarjana Ilmu Komputer', school: 'Universitas Teknologi' },
            design: { degree: 'Sarjana Desain Komunikasi Visual', school: 'Institut Seni dan Desain' },
            marketing: { degree: 'Sarjana Manajemen Pemasaran', school: 'Sekolah Tinggi Bisnis' },
            finance: { degree: 'Sarjana Akuntansi', school: 'Fakultas Ekonomi dan Bisnis' },
            healthcare: { degree: 'Sarjana Keperawatan', school: 'Fakultas Ilmu Kesehatan' },
            education: { degree: 'Sarjana Pendidikan', school: 'Universitas Pendidikan' },
            sales: { degree: 'Sarjana Administrasi Bisnis', school: 'Sekolah Tinggi Manajemen' },
            hospitality: { degree: 'Diploma Manajemen Perhotelan', school: 'Akademi Pariwisata' },
            general: { degree: 'Sarjana Ilmu Sosial', school: 'Universitas Negeri' },
        },
        educationDescription: 'Lulus dengan predikat cum laude. Anggota aktif asosiasi profesional.',
        yearsText: (years) => years === 1 ? '1 tahun' : `${years}+ tahun`,
    },
    summaryTemplates: {
        tech: {
            entry: '{jobTitle} yang termotivasi dengan pengalaman langsung {years} di bidang pengembangan perangkat lunak. Bersemangat dalam menulis kode yang bersih dan efisien serta mempelajari teknologi baru. Siap berkontribusi pada proyek inovatif dan berkembang sebagai pengembang profesional.',
            mid: '{jobTitle} yang berorientasi pada hasil dengan pengalaman {years} dalam membangun aplikasi berskala besar dan memimpin inisiatif teknis. Rekam jejak terbukti dalam menghasilkan solusi berkualitas tinggi yang meningkatkan kinerja sistem hingga 40%. Kolaborator yang kuat dalam tim lintas fungsi.',
            senior: '{jobTitle} berpengalaman dengan keahlian {years} dalam merancang dan mengimplementasikan solusi skala enterprise. Memimpin tim yang terdiri dari 5+ pengembang, mengurangi waktu deployment sebesar 60% melalui implementasi CI/CD. Berkomitmen membimbing pengembang junior dan mendorong keunggulan teknis.',
            executive: 'Pemimpin teknologi strategis dengan pengalaman {years} dalam mendorong transformasi digital dan inovasi teknis. Mengelola anggaran melebihi Rp30 miliar dan tim yang terdiri dari 20+ insinyur. Berhasil menghasilkan proyek yang menghasilkan pertumbuhan pendapatan lebih dari Rp150 miliar.',
        },
        design: {
            entry: '{jobTitle} yang kreatif dengan pengalaman {years} dalam menciptakan desain yang berpusat pada pengguna. Terampil dalam alat desain modern dan bersemangat membuat antarmuka yang intuitif dan menarik secara visual.',
            mid: '{jobTitle} yang inovatif dengan pengalaman {years} dalam menciptakan pengalaman digital yang berpusat pada pengguna. Menghasilkan desain yang meningkatkan keterlibatan pengguna sebesar 35% dan menurunkan tingkat bounce sebesar 25%.',
            senior: '{jobTitle} senior dengan pengalaman {years} memimpin tim desain dan membentuk visi produk. Membangun sistem desain yang diadopsi di lebih dari 10 produk, meningkatkan konsistensi desain sebesar 50%.',
            executive: 'Eksekutif desain dengan pengalaman {years} membangun dan memimpin organisasi desain kelas dunia. Mentransformasi budaya desain di perusahaan besar, menghasilkan penghematan biaya lebih dari Rp75 miliar.',
        },
        marketing: {
            entry: '{jobTitle} yang antusias dengan pengalaman {years} di bidang pemasaran digital. Terampil dalam pembuatan konten, manajemen media sosial, dan analisis data.',
            mid: '{jobTitle} berbasis data dengan pengalaman {years} dalam menjalankan kampanye yang memberikan hasil terukur. Meningkatkan lalu lintas organik sebesar 150% dan meningkatkan tingkat konversi sebesar 40%.',
            senior: '{jobTitle} strategis dengan pengalaman {years} memimpin tim pemasaran berkinerja tinggi. Mengelola anggaran pemasaran Rp15 miliar+ dan menghasilkan kampanye dengan ROI 200%.',
            executive: 'Eksekutif pemasaran dengan pengalaman {years} mendorong pertumbuhan pendapatan melalui strategi pemasaran inovatif. Memimpin tim pemasaran global dan mengelola anggaran Rp150 miliar+.',
        },
        finance: {
            entry: '{jobTitle} yang teliti dengan pengalaman {years} dalam analisis dan pelaporan keuangan. Memiliki dasar kuat dalam prinsip akuntansi dan perangkat lunak keuangan.',
            mid: '{jobTitle} yang analitis dengan pengalaman {years} dalam perencanaan dan analisis keuangan. Mengidentifikasi peluang penghematan biaya yang menghasilkan penghematan tahunan lebih dari Rp7,5 miliar.',
            senior: '{jobTitle} senior dengan pengalaman {years} memimpin operasi dan strategi keuangan. Mengelola portofolio senilai Rp750 miliar+ dan memimpin tim melalui audit yang berhasil.',
            executive: 'Eksekutif keuangan dengan pengalaman {years} mendorong strategi keuangan dan keunggulan operasional. Memimpin transaksi M&A senilai total Rp1,5 triliun+ dan meningkatkan margin EBITDA sebesar 15%.',
        },
        healthcare: {
            entry: '{jobTitle} yang penuh kasih sayang dengan pengalaman klinis {years} dalam memberikan perawatan yang berpusat pada pasien. Berkomitmen menjaga standar perawatan yang tinggi.',
            mid: '{jobTitle} yang berdedikasi dengan pengalaman {years} dalam memberikan perawatan pasien berkualitas tinggi. Meningkatkan skor kepuasan pasien sebesar 30% melalui protokol komunikasi yang ditingkatkan.',
            senior: '{jobTitle} berpengalaman dengan keahlian klinis {years} dan pengalaman kepemimpinan. Memimpin inisiatif peningkatan kualitas yang mengurangi angka rawat ulang sebesar 20%.',
            executive: 'Eksekutif layanan kesehatan dengan pengalaman {years} mentransformasi operasi klinis dan hasil perawatan pasien. Memimpin departemen dengan 50+ staf dan mengelola anggaran Rp75 miliar+.',
        },
        education: {
            entry: '{jobTitle} yang penuh semangat dengan pengalaman mengajar {years} yang berkomitmen pada keberhasilan siswa. Terampil dalam membuat rencana pelajaran yang menarik dan membangun lingkungan belajar yang inklusif.',
            mid: '{jobTitle} yang inovatif dengan pengalaman {years} mengembangkan kurikulum yang melibatkan peserta didik yang beragam. Meningkatkan nilai ujian siswa sebesar 25% melalui strategi instruksi diferensiasi.',
            senior: '{jobTitle} berpengalaman dengan pengalaman {years} membentuk hasil pendidikan dan membimbing rekan sejawat. Mengembangkan program unggulan yang diadopsi di seluruh dinas pendidikan daerah.',
            executive: 'Pemimpin pendidikan dengan pengalaman {years} mendorong keunggulan institusional. Mengamankan hibah senilai Rp30 miliar+ dan memimpin proses akreditasi.',
        },
        sales: {
            entry: '{jobTitle} yang termotivasi dengan pengalaman {years} di bidang pengembangan bisnis. Memiliki keterampilan komunikasi yang kuat dan fokus pada pelanggan. Siap melampaui target.',
            mid: '{jobTitle} yang berorientasi pada hasil dengan pengalaman {years} secara konsisten melampaui kuota. Menghasilkan pendapatan bisnis baru Rp30 miliar+ dan mempertahankan tingkat retensi klien 95%.',
            senior: '{jobTitle} berkinerja tinggi dengan pengalaman {years} memimpin tim penjualan dan mendorong pertumbuhan pendapatan. Mengelola wilayah yang menghasilkan Rp150 miliar+ per tahun.',
            executive: 'Eksekutif penjualan dengan pengalaman {years} membangun dan mengembangkan organisasi penjualan berkinerja tinggi. Meningkatkan pendapatan dari Rp75 miliar menjadi Rp750 miliar dan berekspansi ke 3 pasar baru.',
        },
        hospitality: {
            entry: '{jobTitle} yang ramah dan energik dengan pengalaman {years} di lingkungan restoran yang dinamis. Berkomitmen memberikan pelayanan pelanggan yang luar biasa.',
            mid: '{jobTitle} yang berdedikasi dengan pengalaman {years} memberikan layanan prima di restoran berkapasitas besar. Mempertahankan tingkat kepuasan pelanggan 98%.',
            senior: '{jobTitle} berpengalaman dengan keahlian {years} di restoran fine dining dan berkapasitas tinggi. Melatih dan membimbing 15+ anggota staf.',
            executive: 'Profesional perhotelan dengan pengalaman {years} mengelola operasional restoran. Mengawasi tim 30+ staf dan meningkatkan pendapatan sebesar 40%.',
        },
        general: {
            entry: '{jobTitle} yang termotivasi dengan pengalaman profesional {years}. Memiliki etos kerja yang kuat, keterampilan komunikasi yang baik, dan komitmen untuk memberikan hasil berkualitas.',
            mid: '{jobTitle} yang berprestasi dengan pengalaman {years} mendorong keunggulan operasional. Meningkatkan efisiensi tim sebesar 30% melalui optimisasi proses.',
            senior: '{jobTitle} berpengalaman dengan pengalaman {years} memimpin tim dan inisiatif strategis. Berhasil mengelola proyek dengan anggaran hingga Rp15 miliar.',
            executive: 'Pemimpin eksekutif dengan pengalaman {years} mendorong transformasi organisasi. Memimpin tim 50+ orang dan mengelola tanggung jawab P&L sebesar Rp300 miliar+.',
        },
    },
    jobDescriptions: {
        tech: [
            [
                '• Memimpin pengembangan arsitektur microservices, meningkatkan skalabilitas sistem sebesar 300%',
                '• Mengimplementasikan pipeline CI/CD yang mengurangi waktu deployment dari 2 jam menjadi 15 menit',
                '• Membimbing tim yang terdiri dari 5 pengembang junior, melakukan code review dan pelatihan teknis',
                '• Berkolaborasi dengan manajer produk untuk menentukan kebutuhan teknis dan perencanaan sprint',
                '• Mengurangi waktu muat aplikasi sebesar 40% melalui optimisasi kinerja',
            ],
            [
                '• Mengembangkan RESTful API yang melayani 1 juta+ permintaan harian dengan uptime 99,9%',
                '• Membangun aplikasi web responsif menggunakan React dan TypeScript',
                '• Mengintegrasikan layanan pihak ketiga dan gateway pembayaran',
                '• Berpartisipasi dalam kegiatan agile dan berkontribusi dalam perencanaan sprint',
            ],
            [
                '• Berkontribusi dalam pemeliharaan codebase dan perbaikan bug',
                '• Membantu pengembang senior dalam implementasi fitur',
                '• Menulis unit test yang meningkatkan cakupan kode sebesar 25%',
            ],
        ],
        design: [
            [
                '• Memimpin tim desain yang terdiri dari 5 desainer dalam menciptakan produk digital yang berpusat pada pengguna',
                '• Membangun sistem desain dan pustaka komponen yang digunakan di 10+ proyek',
                '• Meningkatkan keterlibatan pengguna sebesar 40% melalui perbaikan UX',
                '• Melakukan riset pengguna dan pengujian kegunaan dengan 100+ partisipan',
                '• Mempresentasikan konsep desain kepada pemangku kepentingan dan mengintegrasikan umpan balik',
            ],
            [
                '• Mendesain aplikasi mobile dan web untuk platform iOS dan Android',
                '• Membuat wireframe, prototipe, dan mockup fidelitas tinggi',
                '• Berkolaborasi dengan pengembang untuk memastikan akurasi implementasi desain',
                '• Meningkatkan tingkat konversi sebesar 35% melalui A/B testing',
            ],
            [
                '• Membantu pembuatan desain visual untuk kampanye pemasaran',
                '• Menjaga konsistensi merek di seluruh deliverable desain',
                '• Mendukung desainer senior dalam pembuatan aset',
            ],
        ],
        marketing: [
            [
                '• Mengembangkan dan menjalankan strategi pemasaran yang menghasilkan ROI 200%',
                '• Mengelola anggaran pemasaran tahunan Rp7,5 miliar+ di seluruh kanal digital',
                '• Memimpin tim yang terdiri dari 4 pemasar dalam perencanaan dan pelaksanaan kampanye',
                '• Meningkatkan lalu lintas organik sebesar 150% melalui optimisasi SEO',
                '• Membangun kemitraan dengan influencer yang menjangkau audiens 2 juta+',
            ],
            [
                '• Membuat strategi konten yang menghasilkan 100 ribu+ pengunjung blog bulanan',
                '• Mengelola akun media sosial dengan pertumbuhan pengikut sebesar 300%',
                '• Menjalankan kampanye email dengan open rate 35% dan CTR 15%',
                '• Menganalisis kinerja kampanye dan melakukan optimisasi berdasarkan data',
            ],
            [
                '• Membantu pembuatan dan penjadwalan konten media sosial',
                '• Mendukung tim dalam riset pasar dan analisis kompetitif',
                '• Membantu penyelenggaraan acara pemasaran dan webinar',
            ],
        ],
        finance: [
            [
                '• Mengelola perencanaan dan analisis keuangan untuk unit bisnis senilai Rp750 miliar+',
                '• Memimpin proses penyusunan anggaran tahunan dan peramalan triwulanan',
                '• Mengidentifikasi peluang penghematan biaya yang menghasilkan penghematan Rp15 miliar+',
                '• Menyajikan laporan keuangan kepada jajaran direksi',
                '• Mengawasi tim yang terdiri dari 3 analis dan mengoordinasikan proses audit',
            ],
            [
                '• Menyiapkan laporan keuangan bulanan dan analisis varians',
                '• Mengembangkan model keuangan untuk perencanaan bisnis',
                '• Menyederhanakan proses pelaporan yang mengurangi waktu tutup buku sebesar 30%',
                '• Mendukung proses due diligence dan integrasi M&A',
            ],
            [
                '• Membantu pemrosesan utang dan piutang usaha',
                '• Melakukan rekonsiliasi rekening bank dan buku besar',
                '• Mendukung akuntan senior dalam proses tutup buku bulanan',
            ],
        ],
        healthcare: [
            [
                '• Mengawasi staf keperawatan yang terdiri dari 15+ perawat dalam memberikan perawatan pasien',
                '• Mengimplementasikan inisiatif peningkatan kualitas yang mengurangi kesalahan medis sebesar 40%',
                '• Mengoordinasikan rencana perawatan pasien dengan tim interdisipliner',
                '• Menjaga kepatuhan terhadap regulasi dan standar akreditasi rumah sakit',
                '• Melatih staf baru tentang protokol dan praktik terbaik',
            ],
            [
                '• Memberikan perawatan langsung kepada 10+ pasien setiap hari',
                '• Melakukan pemberian obat dan memantau kondisi pasien',
                '• Mendokumentasikan informasi pasien secara akurat dalam sistem rekam medis elektronik',
                '• Berkolaborasi dengan dokter dalam rencana perawatan',
            ],
            [
                '• Membantu proses penerimaan pasien dan pemantauan tanda vital',
                '• Mendukung staf keperawatan dalam aktivitas perawatan harian',
                '• Menjaga kebersihan dan keteraturan lingkungan pasien',
            ],
        ],
        education: [
            [
                '• Mengembangkan kurikulum yang diadopsi di seluruh dinas pendidikan yang melayani 5.000+ siswa',
                '• Membimbing 10+ guru dalam menerapkan strategi instruksional baru',
                '• Meningkatkan nilai prestasi siswa sebesar 25% selama 3 tahun',
                '• Memimpin lokakarya pengembangan profesional dan sesi pelatihan',
                '• Mengamankan hibah senilai Rp1,5 miliar+ untuk program pendidikan',
            ],
            [
                '• Mengajar kelas yang terdiri dari 25+ siswa di berbagai jenjang',
                '• Membuat rencana pelajaran yang menarik dan sesuai dengan kurikulum nasional',
                '• Menerapkan instruksi diferensiasi untuk peserta didik yang beragam',
                '• Berkomunikasi secara rutin dengan orang tua mengenai perkembangan siswa',
            ],
            [
                '• Membantu guru utama dalam kegiatan instruksi di kelas',
                '• Mendukung siswa dengan bimbingan belajar individu dan kelompok kecil',
                '• Membantu menjaga organisasi kelas dan materi pembelajaran',
            ],
        ],
        sales: [
            [
                '• Melampaui kuota tahunan sebesar 150%, menghasilkan pendapatan Rp75 miliar+',
                '• Membangun dan mengelola tim yang terdiri dari 8 tenaga penjualan',
                '• Mengembangkan rencana akun strategis untuk klien enterprise',
                '• Menegosiasikan kontrak senilai Rp7,5 miliar+ dengan eksekutif level C',
                '• Mengimplementasikan proses CRM yang meningkatkan akurasi peramalan sebesar 40%',
            ],
            [
                '• Mencapai 120% dari kuota secara konsisten selama 8 kuartal berturut-turut',
                '• Mengelola pipeline yang terdiri dari 50+ peluang senilai Rp30 miliar+',
                '• Melakukan demonstrasi produk dan presentasi penjualan',
                '• Mempertahankan tingkat retensi klien 95% melalui manajemen hubungan',
            ],
            [
                '• Menghasilkan prospek melalui cold calling dan networking',
                '• Membantu tenaga penjualan senior dalam pertemuan klien',
                '• Memelihara catatan yang akurat dalam sistem CRM',
            ],
        ],
        hospitality: [
            [
                '• Mengawasi tim yang terdiri dari 10+ pelayan untuk memastikan kualitas layanan yang konsisten',
                '• Melatih staf baru tentang menu, sistem POS, dan standar pelayanan',
                '• Menyelesaikan keluhan pelanggan secara profesional, mempertahankan tingkat kepuasan 95%',
                '• Berkoordinasi dengan staf dapur untuk memastikan pengiriman makanan tepat waktu',
                '• Mengelola area yang terdiri dari 8+ meja selama jam sibuk melayani 100+ tamu setiap hari',
            ],
            [
                '• Memberikan pelayanan meja yang prima di restoran berkapasitas 200 kursi dengan tempo tinggi',
                '• Meningkatkan rata-rata nilai transaksi sebesar 20% melalui teknik upselling yang efektif',
                '• Menghafal menu lengkap termasuk menu spesial harian dan padanan minuman',
                '• Memproses pembayaran secara akurat dengan menangani transaksi harian senilai Rp7,5 juta+',
            ],
            [
                '• Menyambut dan mengantar tamu untuk memastikan kesan pertama yang positif',
                '• Mencatat pesanan makanan dan minuman secara akurat menggunakan sistem POS',
                '• Menjaga kebersihan dan keteraturan area makan selama shift kerja',
            ],
        ],
        general: [
            [
                '• Memimpin tim lintas fungsi yang terdiri dari 10+ anggota dalam inisiatif strategis',
                '• Mengelola proyek dengan anggaran hingga Rp7,5 miliar dan menyelesaikannya tepat waktu',
                '• Meningkatkan efisiensi operasional sebesar 30% melalui optimisasi proses',
                '• Mengembangkan dan menerapkan kebijakan serta prosedur departemen',
                '• Menyajikan laporan triwulanan kepada jajaran pimpinan senior',
            ],
            [
                '• Mengoordinasikan operasional harian dan manajemen alur kerja',
                '• Berkolaborasi dengan pemangku kepentingan untuk memenuhi tenggat waktu proyek',
                '• Menganalisis data untuk mengidentifikasi tren dan peluang perbaikan',
                '• Melatih anggota tim baru tentang proses dan sistem yang berlaku',
            ],
            [
                '• Mendukung tim dalam tugas administratif dan operasional',
                '• Membantu dalam penginputan data dan penyiapan laporan',
                '• Membantu mengorganisir rapat tim dan acara',
            ],
        ],
    },
    masterDegree: { tech: 'Magister Ilmu Komputer', business: 'Magister Manajemen (MBA)', school: 'Sekolah Bisnis Pascasarjana' },
    phoneFormat: '+62 812 0000 0000',
    titlePrefixes: { senior: 'Senior', lead: 'Kepala', director: 'Direktur' },
};

export default id;
