/**
 * Indonesian (id) locale data for resume example generation.
 * Imported by generate-locale-resume-examples.mjs via:
 *   await import('./locale-data/resume-id.mjs')
 *
 * Keyword-optimized from seo/indonesian-top-300-keywords.csv:
 *   - Primary CV terms: "cv", "curriculum vitae", "daftar riwayat hidup"
 *   - Template terms: "template cv gratis", "format cv", "download template cv"
 *   - ATS terms: "cv ats", "cv ats friendly", "format ats"
 *   - Application: "surat lamaran kerja", "lamaran kerja"
 */

const LANG = 'id';

// ─── CONFIG ─────────────────────────────────────────────────────────────────

export const CONFIG = {
  locale: 'id',
  author: 'Rina Kusuma',
  authorSlug: 'rina-kusuma',
  authorBio: 'Konsultan karier dan spesialis penulisan CV dengan pengalaman lebih dari 10 tahun membantu para profesional Indonesia mendapatkan pekerjaan impian mereka. Berpengalaman dalam optimasi CV ATS dan strategi pencarian kerja di pasar Indonesia.',
  titlePattern: (job) => `CV ${job}: Contoh, Template & Panduan Lengkap 2026`,
  descriptionPattern: (job) => `Contoh CV ${job} yang ATS-friendly dan siap didownload gratis. Template curriculum vitae ${job.toLowerCase()} dengan format profesional, contoh ringkasan, dan tips lolos seleksi 2026.`,
  imageAltPattern: (job) => `Contoh CV ${job} ATS-Friendly 2026`,
};

// ─── JOB TITLES (English → Indonesian) ──────────────────────────────────────

export const JOB_TITLES = {
  '3D Artist': 'Seniman 3D',
  'AI Engineer': 'AI Engineer',
  'AWS Cloud Engineer': 'AWS Cloud Engineer',
  'AWS Solution Architect': 'AWS Solution Architect',
  'Academic Advisor': 'Penasihat Akademik',
  'Account Executive': 'Account Executive',
  'Account Manager': 'Manajer Akun',
  'Accountant': 'Akuntan',
  'Accounting Assistant': 'Asisten Akuntansi',
  'Accounting Clerk': 'Staf Akuntansi',
  'Accounting Intern': 'Magang Akuntansi',
  'Accounts Payable Specialist': 'Spesialis Hutang Usaha',
  'Accounts Receivable Specialist': 'Spesialis Piutang Usaha',
  'Administrative Assistant': 'Asisten Administrasi',
  'Android Developer': 'Android Developer',
  'Animal Control Officer': 'Petugas Pengendalian Hewan',
  'Animal Shelter Worker': 'Pekerja Penampungan Hewan',
  'Animator': 'Animator',
  'Appliance Repair Technician': 'Teknisi Perbaikan Peralatan',
  'Aquarium Keeper': 'Penjaga Akuarium',
  'Arbitrator': 'Arbiter',
  'Architect': 'Arsitek',
  'Art Director': 'Art Director',
  'Assistant Director': 'Direktur Asisten',
  'Assistant Manager': 'Asisten Manajer',
  'Assistant Property Manager': 'Asisten Manajer Properti',
  'Assistant Store Manager': 'Asisten Manajer Toko',
  'Athletic Trainer': 'Pelatih Atletik',
  'Audio Engineer': 'Audio Engineer',
  'Auditor': 'Auditor',
  'Auto Mechanic': 'Mekanik Otomotif',
  'Automation Engineer': 'Automation Engineer',
  'Automotive Technician': 'Teknisi Otomotif',
  'Backend Developer': 'Backend Developer',
  'Baker': 'Pembuat Roti',
  'Bank Manager': 'Manajer Bank',
  'Bank Teller': 'Teller Bank',
  'Banquet Chef': 'Chef Banquet',
  'Barista': 'Barista',
  'Bartender': 'Bartender',
  'Bellhop': 'Bellhop',
  'Billing Specialist': 'Spesialis Penagihan',
  'Blockchain Developer': 'Blockchain Developer',
  'Branch Manager': 'Manajer Cabang',
  'Brand Designer': 'Brand Designer',
  'Budget Analyst': 'Analis Anggaran',
  'Building Inspector': 'Inspektur Bangunan',
  'Building Maintenance Technician': 'Teknisi Pemeliharaan Gedung',
  'Bus Driver': 'Pengemudi Bus',
  'Business Administration Professional': 'Profesional Administrasi Bisnis',
  'Business Analyst': 'Business Analyst',
  'Business Consultant': 'Konsultan Bisnis',
  'Business Development Executive': 'Eksekutif Pengembangan Bisnis',
  'Business Development Manager': 'Manajer Pengembangan Bisnis',
  'Business Intelligence Analyst': 'Business Intelligence Analyst',
  'Business Intelligence Specialist': 'Spesialis Business Intelligence',
  'Business Manager': 'Manajer Bisnis',
  'Business Owner': 'Pemilik Usaha',
  'Busser': 'Busser',
  'CNC Machinist': 'Operator CNC',
  'CNC Operator': 'Operator CNC',
  'Cabin Crew': 'Pramugari/Pramugara',
  'Cabinet Maker': 'Pembuat Lemari',
  'Cafeteria Worker': 'Pekerja Kantin',
  'Call Center Agent': 'Agen Call Center',
  'Call Center Representative': 'Perwakilan Call Center',
  'Car Sales Associate': 'Sales Mobil',
  'Caregiver': 'Pengasuh',
  'Carpenter': 'Tukang Kayu',
  'Carpet Cleaner': 'Pembersih Karpet',
  'Case Manager': 'Manajer Kasus',
  'Cashier': 'Kasir',
  'Casino Dealer': 'Dealer Kasino',
  'Caterer': 'Penyedia Katering',
  'Catering Manager': 'Manajer Katering',
  'Certified Nursing Assistant': 'Asisten Perawat Bersertifikat',
  'Certified Nursing Assistant (CNA)': 'Asisten Perawat Bersertifikat (CNA)',
  'Change Management Specialist': 'Spesialis Manajemen Perubahan',
  'Chef': 'Chef',
  'Chemical Engineer': 'Insinyur Kimia',
  'Chemist': 'Ahli Kimia',
  'Chief Information Officer (CIO)': 'Chief Information Officer (CIO)',
  'Chief of Staff': 'Kepala Staf',
  'Chiropractor': 'Kiropraktor',
  'City Planner': 'Perencana Kota',
  'Civil Engineer': 'Insinyur Sipil',
  'Claims Adjuster': 'Adjuster Klaim',
  'Client Relations Manager': 'Manajer Hubungan Klien',
  'Clinical Research Associate': 'Associate Riset Klinis',
  'Clinical Research Coordinator': 'Koordinator Riset Klinis',
  'Cloud Architect': 'Cloud Architect',
  'Cloud Engineer': 'Cloud Engineer',
  'Code Enforcement Officer': 'Petugas Penegak Kode',
  'College Admissions Counselor': 'Konselor Penerimaan Perguruan Tinggi',
  'College Professor': 'Dosen',
  'Commercial Cleaner': 'Petugas Kebersihan Komersial',
  'Commercial Real Estate Broker': 'Broker Properti Komersial',
  'Community Manager': 'Community Manager',
  'Community Outreach Coordinator': 'Koordinator Penjangkauan Komunitas',
  'Complaints Handler': 'Penanganan Keluhan',
  'Compliance Officer': 'Compliance Officer',
  'Computer Operator': 'Operator Komputer',
  'Computer Science Professional': 'Profesional Ilmu Komputer',
  'Computer Technician': 'Teknisi Komputer',
  'Concierge': 'Concierge',
  'Concrete Finisher': 'Tukang Finishing Beton',
  'Construction Manager': 'Manajer Konstruksi',
  'Construction Superintendent': 'Pengawas Konstruksi',
  'Construction Worker': 'Pekerja Konstruksi',
  'Consultant': 'Konsultan',
  'Content Creator': 'Content Creator',
  'Content Writer': 'Penulis Konten',
  'Contract Specialist': 'Spesialis Kontrak',
  'Contracts Specialist': 'Spesialis Kontrak',
  'Controller': 'Controller',
  'Copywriter': 'Copywriter',
  'Corporate Security Manager': 'Manajer Keamanan Perusahaan',
  'Correctional Officer': 'Petugas Pemasyarakatan',
  'Court Clerk': 'Panitera Pengadilan',
  'Court Reporter': 'Pelapor Pengadilan',
  'Creative Director': 'Creative Director',
  'Crisis Counselor': 'Konselor Krisis',
  'Cruise Ship Worker': 'Pekerja Kapal Pesiar',
  'Curriculum Developer': 'Pengembang Kurikulum',
  'Customer Experience Specialist': 'Spesialis Pengalaman Pelanggan',
  'Customer Service Representative': 'Customer Service',
  'Customer Success Manager': 'Customer Success Manager',
  'Customer Success Specialist': 'Spesialis Customer Success',
  'Customer Support Specialist': 'Spesialis Dukungan Pelanggan',
  'Customs Officer': 'Petugas Bea Cukai',
  'Cybersecurity Analyst': 'Analis Keamanan Siber',
  'Data Analyst': 'Data Analyst',
  'Data Architect': 'Data Architect',
  'Data Engineer': 'Data Engineer',
  'Data Entry Clerk': 'Staf Input Data',
  'Data Entry Operator': 'Operator Input Data',
  'Data Entry Specialist': 'Spesialis Input Data',
  'Data Scientist': 'Data Scientist',
  'Database Administrator': 'Administrator Database',
  'Delivery Driver': 'Pengemudi Pengiriman',
  'Dental Assistant': 'Asisten Dokter Gigi',
  'Dental Hygienist': 'Terapis Gigi',
  'Dental Office Manager': 'Manajer Klinik Gigi',
  'Dentist': 'Dokter Gigi',
  'Design Engineer': 'Insinyur Desain',
  'Desktop Support Engineer': 'Desktop Support Engineer',
  'Desktop Support Technician': 'Teknisi Desktop Support',
  'DevOps Engineer': 'DevOps Engineer',
  'Dialysis Technician': 'Teknisi Dialisis',
  'Diesel Mechanic': 'Mekanik Diesel',
  'Dietary Aide': 'Asisten Gizi',
  'Dietitian': 'Ahli Gizi',
  'Digital Marketer': 'Digital Marketer',
  'Digital Marketing Manager': 'Manajer Digital Marketing',
  'Digital Marketing Specialist': 'Spesialis Digital Marketing',
  'Dishwasher': 'Pencuci Piring',
  'Dispatcher': 'Dispatcher',
  'District Manager': 'Manajer Distrik',
  'Doctor': 'Dokter',
  'Dog Trainer': 'Pelatih Anjing',
  'Driver': 'Pengemudi',
  'Drywall Installer': 'Pemasang Drywall',
  'EMT': 'EMT',
  'ESL Teacher': 'Guru ESL',
  'Editor': 'Editor',
  'Education Consultant': 'Konsultan Pendidikan',
  'Educational Technologist': 'Teknolog Pendidikan',
  'Electrical Engineer': 'Insinyur Elektro',
  'Electrical Technician': 'Teknisi Elektro',
  'Electrician': 'Elektrisi',
  'Elementary Teacher': 'Guru SD',
  'Elevator Technician': 'Teknisi Lift',
  'Embedded Systems Engineer': 'Insinyur Sistem Tertanam',
  'Emergency Management Coordinator': 'Koordinator Manajemen Darurat',
  'Engineering Manager': 'Manajer Engineering',
  'Environmental Compliance Officer': 'Petugas Kepatuhan Lingkungan',
  'Epidemiologist': 'Ahli Epidemiologi',
  'Escrow Officer': 'Petugas Escrow',
  'Ethical Hacker': 'Ethical Hacker',
  'Event Coordinator': 'Koordinator Acara',
  'Event Manager': 'Manajer Acara',
  'Event Planner': 'Perencana Acara',
  'Executive Assistant': 'Asisten Eksekutif',
  'Executive Chef': 'Executive Chef',
  'Executive Director': 'Direktur Eksekutif',
  'Family Services Worker': 'Pekerja Layanan Keluarga',
  'Fashion Designer': 'Desainer Mode',
  'Fast Food Worker': 'Pekerja Restoran Cepat Saji',
  'Fence Installer': 'Pemasang Pagar',
  'Finance Manager': 'Manajer Keuangan',
  'Financial Analyst': 'Analis Keuangan',
  'Firefighter': 'Pemadam Kebakaran',
  'Fitness Center Manager': 'Manajer Pusat Kebugaran',
  'Fitness Instructor': 'Instruktur Kebugaran',
  'Fitness Trainer': 'Pelatih Kebugaran',
  'Flight Attendant': 'Pramugari',
  'Floor Installer': 'Pemasang Lantai',
  'Florist': 'Floris',
  'Food Expeditor': 'Food Expeditor',
  'Food Runner': 'Food Runner',
  'Food Safety Manager': 'Manajer Keamanan Pangan',
  'Food Scientist': 'Ilmuwan Pangan',
  'Food Server': 'Pelayan Makan',
  'Food Service Director': 'Direktur Layanan Makanan',
  'Food Service Manager': 'Manajer Layanan Makanan',
  'Food Service Worker': 'Pekerja Layanan Makanan',
  'Food Stylist': 'Food Stylist',
  'Food Truck Operator': 'Operator Food Truck',
  'Freelance Writer': 'Penulis Lepas',
  'Freight Broker': 'Broker Pengiriman',
  'Front Desk Agent': 'Petugas Resepsionis',
  'Front Desk Receptionist': 'Resepsionis',
  'Front End Developer': 'Frontend Developer',
  'Full Stack Developer': 'Full Stack Developer',
  'Game Designer': 'Game Designer',
  'Game Developer': 'Game Developer',
  'Glazier': 'Tukang Kaca',
  'Go Developer': 'Go Developer',
  'Grants Manager': 'Manajer Hibah',
  'Graphic Designer': 'Desainer Grafis',
  'Group Fitness Instructor': 'Instruktur Kebugaran Kelompok',
  'Gym Trainer': 'Pelatih Gym',
  'HR Assistant': 'Asisten HRD',
  'HR Business Partner': 'HR Business Partner',
  'HR Coordinator': 'Koordinator HRD',
  'HR Director': 'Direktur HRD',
  'HR Executive': 'Eksekutif HRD',
  'HR Manager': 'Manajer HRD',
  'HR Recruiter': 'Rekruter HRD',
  'HVAC Technician': 'Teknisi HVAC',
  'Head Cook': 'Kepala Juru Masak',
  'Health Coach': 'Health Coach',
  'Health Inspector': 'Inspektur Kesehatan',
  'Heavy Equipment Operator': 'Operator Alat Berat',
  'Help Desk Technician': 'Teknisi Help Desk',
  'High School Teacher': 'Guru SMA',
  'Home Health Aide': 'Asisten Kesehatan Rumah',
  'Home Inspector': 'Inspektur Rumah',
  'Hospice Nurse': 'Perawat Hospis',
  'Hospital Housekeeper': 'Petugas Kebersihan Rumah Sakit',
  'Hotel Front Desk Agent': 'Resepsionis Hotel',
  'Hotel Manager': 'Manajer Hotel',
  'House Cleaner': 'Petugas Kebersihan Rumah',
  'Housekeeper': 'Housekeeper',
  'Housekeeping Supervisor': 'Supervisor Housekeeping',
  'IT Director': 'Direktur IT',
  'IT Manager': 'Manajer IT',
  'IT Recruiter': 'Rekruter IT',
  'IT Specialist': 'Spesialis IT',
  'IT Support Specialist': 'Spesialis IT Support',
  'IT Support Technician': 'Teknisi IT Support',
  'IT Technician': 'Teknisi IT',
  'Illustrator': 'Ilustrator',
  'Industrial Engineer': 'Insinyur Industri',
  'Industrial Maintenance Technician': 'Teknisi Pemeliharaan Industri',
  'Information Security Analyst': 'Analis Keamanan Informasi',
  'Inside Sales Representative': 'Sales Representative Internal',
  'Instructional Coach': 'Pelatih Instruksional',
  'Instructional Designer': 'Desainer Instruksional',
  'Insulation Worker': 'Pekerja Insulasi',
  'Insurance Agent': 'Agen Asuransi',
  'Interior Designer': 'Desainer Interior',
  'Intern': 'Magang',
  'Iron Worker': 'Pekerja Besi',
  'Ironworker': 'Pekerja Besi',
  'Janitor': 'Petugas Kebersihan',
  'Java Full Stack Developer': 'Java Full Stack Developer',
  'JavaScript Developer': 'JavaScript Developer',
  'Junior Developer': 'Junior Developer',
  'Kitchen Helper': 'Pembantu Dapur',
  'Kitchen Manager': 'Manajer Dapur',
  'Lab Assistant': 'Asisten Laboratorium',
  'Lab Technician': 'Teknisi Laboratorium',
  'Landscaper': 'Penata Taman',
  'Leasing Consultant': 'Konsultan Leasing',
  'Legal Analyst': 'Analis Hukum',
  'Legal Assistant': 'Asisten Hukum',
  'Legal Secretary': 'Sekretaris Hukum',
  'Legislative Aide': 'Asisten Legislatif',
  'Librarian': 'Pustakawan',
  'Library Assistant': 'Asisten Perpustakaan',
  'Licensed Practical Nurse (LPN)': 'Perawat Praktik Berlisensi',
  'Limousine Driver': 'Pengemudi Limousine',
  'Line Cook': 'Juru Masak',
  'Litigation Support Specialist': 'Spesialis Dukungan Litigasi',
  'Loan Officer': 'Petugas Pinjaman',
  'Loan Processor': 'Pemroses Pinjaman',
  'Locksmith': 'Tukang Kunci',
  'Logistics Coordinator': 'Koordinator Logistik',
  'Logistics Manager': 'Manajer Logistik',
  'Logistics Specialist': 'Spesialis Logistik',
  'Long Haul Truck Driver': 'Sopir Truk Jarak Jauh',
  'Loss Prevention Specialist': 'Spesialis Pencegahan Kerugian',
  'MRI Technologist': 'Teknolog MRI',
  'Machine Learning Engineer': 'Machine Learning Engineer',
  'Machine Learning Specialist': 'Spesialis Machine Learning',
  'Machine Operator': 'Operator Mesin',
  'Maintenance Engineer': 'Insinyur Pemeliharaan',
  'Maintenance Manager': 'Manajer Pemeliharaan',
  'Maintenance Technician': 'Teknisi Pemeliharaan',
  'Makeup Artist': 'Makeup Artist',
  'Management Consultant': 'Konsultan Manajemen',
  'Manufacturing Engineer': 'Insinyur Manufaktur',
  'Manufacturing Worker': 'Pekerja Manufaktur',
  'Marketing Analyst': 'Analis Marketing',
  'Marketing Assistant': 'Asisten Marketing',
  'Marketing Coordinator': 'Koordinator Marketing',
  'Marketing Director': 'Direktur Marketing',
  'Marketing Executive': 'Eksekutif Marketing',
  'Marketing Intern': 'Magang Marketing',
  'Marketing Manager': 'Manajer Marketing',
  'Marketing Specialist': 'Spesialis Marketing',
  'Mason': 'Tukang Batu',
  'Massage Therapist': 'Terapis Pijat',
  'Material Handler': 'Penanganan Material',
  'Mechanical Design Engineer': 'Insinyur Desain Mekanik',
  'Mechanical Engineer': 'Insinyur Mekanik',
  'Mechanical Technician': 'Teknisi Mekanik',
  'Mediator': 'Mediator',
  'Medical Assistant': 'Asisten Medis',
  'Medical Billing Specialist': 'Spesialis Penagihan Medis',
  'Medical Coder': 'Medical Coder',
  'Medical Office Assistant': 'Asisten Klinik',
  'Medical Receptionist': 'Resepsionis Klinik',
  'Medical Representative': 'Medical Representative',
  'Medical Scribe': 'Scribe Medis',
  'Medical Technologist': 'Teknolog Medis',
  'Mental Health Counselor': 'Konselor Kesehatan Mental',
  'Millwright': 'Teknisi Mesin Industri',
  'Mobile Developer': 'Mobile Developer',
  'Mortgage Loan Officer': 'Petugas Pinjaman KPR',
  'Motion Graphics Designer': 'Desainer Motion Graphics',
  'Moving Company Driver': 'Sopir Perusahaan Pindahan',
  'Music Producer': 'Produser Musik',
  'Nanny': 'Pengasuh Anak',
  'Network Administrator': 'Administrator Jaringan',
  'Network Engineer': 'Network Engineer',
  'Night Auditor': 'Night Auditor',
  'Node.js Developer': 'Node.js Developer',
  'Nurse Practitioner': 'Perawat Praktisi',
  'Nursing Assistant': 'Asisten Perawat',
  'Nutritionist': 'Ahli Nutrisi',
  'Occupational Therapist': 'Terapis Okupasi',
  'Occupational Therapy Assistant': 'Asisten Terapi Okupasi',
  'Office Administrator': 'Administrator Kantor',
  'Office Assistant': 'Asisten Kantor',
  'Office Clerk': 'Staf Kantor',
  'Office Manager': 'Manajer Kantor',
  'Operations Analyst': 'Analis Operasional',
  'Operations Manager': 'Manajer Operasional',
  'Optician': 'Optisian',
  'Optometrist': 'Optometris',
  'Painter': 'Tukang Cat',
  'Paralegal': 'Paralegal',
  'Paramedic': 'Paramedis',
  'Park Ranger': 'Penjaga Taman',
  'Pastry Chef': 'Chef Pastri',
  'Payroll Specialist': 'Spesialis Penggajian',
  'Penetration Tester': 'Penetration Tester',
  'Personal Trainer': 'Personal Trainer',
  'Pest Control Technician': 'Teknisi Pengendalian Hama',
  'Pet Groomer': 'Groomer Hewan Peliharaan',
  'Pet Sitter': 'Penjaga Hewan Peliharaan',
  'Pharmacist': 'Apoteker',
  'Pharmacy Assistant': 'Asisten Apoteker',
  'Pharmacy Tech': 'Teknisi Farmasi',
  'Pharmacy Technician': 'Teknisi Farmasi',
  'Phlebotomist': 'Analis Darah',
  'Photographer': 'Fotografer',
  'Physical Therapist': 'Fisioterapis',
  'Physical Therapy Assistant': 'Asisten Fisioterapis',
  'Physician Assistant': 'Asisten Dokter',
  'Pilates Instructor': 'Instruktur Pilates',
  'Pizza Maker': 'Pembuat Pizza',
  'Platform Engineer': 'Platform Engineer',
  'Plumber': 'Tukang Ledeng',
  'Police Officer': 'Polisi',
  'Policy Analyst': 'Analis Kebijakan',
  'Pool Cleaner': 'Petugas Kebersihan Kolam',
  'Pool Technician': 'Teknisi Kolam Renang',
  'Postal Worker': 'Petugas Pos',
  'Power BI Developer': 'Power BI Developer',
  'Prep Cook': 'Juru Masak Persiapan',
  'Preschool Teacher': 'Guru PAUD',
  'Pressure Washer': 'Petugas Cuci Tekanan',
  'Probation Officer': 'Petugas Pembebasan Bersyarat',
  'Process Engineer': 'Insinyur Proses',
  'Procurement Manager': 'Manajer Pengadaan',
  'Procurement Specialist': 'Spesialis Pengadaan',
  'Product Analyst': 'Product Analyst',
  'Product Designer': 'Product Designer',
  'Product Manager': 'Product Manager',
  'Product Marketing Manager': 'Manajer Marketing Produk',
  'Product Owner': 'Product Owner',
  'Production Assistant': 'Asisten Produksi',
  'Production Engineer': 'Insinyur Produksi',
  'Production Manager': 'Manajer Produksi',
  'Production Worker': 'Pekerja Produksi',
  'Program Coordinator': 'Koordinator Program',
  'Project Coordinator': 'Koordinator Proyek',
  'Project Engineer': 'Insinyur Proyek',
  'Project Manager': 'Project Manager',
  'Prompt Engineer': 'Prompt Engineer',
  'Property Manager': 'Manajer Properti',
  'Psychiatrist': 'Psikiater',
  'Psychologist': 'Psikolog',
  'Public Affairs Specialist': 'Spesialis Hubungan Publik',
  'Public Health Inspector': 'Inspektur Kesehatan Masyarakat',
  'Python Developer': 'Python Developer',
  'QA Analyst': 'QA Analyst',
  'QA Engineer': 'QA Engineer',
  'QA Manager': 'QA Manager',
  'QA Tester': 'QA Tester',
  'Quality Analyst': 'Analis Kualitas',
  'Quality Assurance Specialist': 'Spesialis Quality Assurance',
  'Quality Control Inspector': 'Inspektur Quality Control',
  'Quality Engineer': 'Insinyur Kualitas',
  'Quality Manager': 'Manajer Kualitas',
  'Radiologic Technologist': 'Teknolog Radiologi',
  'React Developer': 'React Developer',
  'Reading Specialist': 'Spesialis Membaca',
  'Real Estate Agent': 'Agen Properti',
  'Real Estate Appraiser': 'Penilai Properti',
  'Real Estate Assistant': 'Asisten Properti',
  'Real Estate Attorney': 'Pengacara Properti',
  'Real Estate Investor': 'Investor Properti',
  'Receptionist': 'Resepsionis',
  'Recreation Coordinator': 'Koordinator Rekreasi',
  'Recruiter': 'Rekruter',
  'Recruiting Coordinator': 'Koordinator Rekrutmen',
  'Registered Nurse': 'Perawat Registered',
  'Release Engineer': 'Release Engineer',
  'Research Analyst': 'Analis Riset',
  'Research Assistant': 'Asisten Riset',
  'Reservation Agent': 'Agen Reservasi',
  'Resident Assistant': 'Asisten Residen',
  'Residential Cleaner': 'Petugas Kebersihan Residensial',
  'Respiratory Therapist': 'Terapis Pernapasan',
  'Restaurant Manager': 'Manajer Restoran',
  'Retail Assistant': 'Asisten Toko',
  'Retail Associate': 'Staf Toko',
  'Retail Manager': 'Manajer Toko Retail',
  'Retail Sales Associate': 'Sales Associate Retail',
  'Retail Store Manager': 'Manajer Toko Retail',
  'Risk Management Specialist': 'Spesialis Manajemen Risiko',
  'Roofer': 'Tukang Atap',
  'Rust Developer': 'Rust Developer',
  'SAP Consultant': 'Konsultan SAP',
  'SOC Analyst': 'SOC Analyst',
  'Sales Assistant': 'Asisten Sales',
  'Sales Associate': 'Sales Associate',
  'Sales Consultant': 'Konsultan Sales',
  'Sales Coordinator': 'Koordinator Sales',
  'Sales Director': 'Direktur Sales',
  'Sales Engineer': 'Sales Engineer',
  'Sales Executive': 'Sales Executive',
  'Sales Manager': 'Manajer Sales',
  'Sales Representative': 'Sales Representative',
  'Salesforce Administrator': 'Salesforce Administrator',
  'School Administrator': 'Administrator Sekolah',
  'School Counselor': 'Konselor Sekolah',
  'Scrum Master': 'Scrum Master',
  'Seaman': 'Pelaut',
  'Security Analyst': 'Analis Keamanan',
  'Security Engineer': 'Security Engineer',
  'Security Guard': 'Satpam',
  'Security Officer': 'Petugas Keamanan',
  'Server': 'Pramusaji',
  'Service Advisor': 'Service Advisor',
  'Service Crew': 'Service Crew',
  'Set Designer': 'Desainer Set',
  'Sheet Metal Worker': 'Pekerja Logam Lembaran',
  'Shipping & Receiving Clerk': 'Staf Pengiriman dan Penerimaan',
  'Site Engineer': 'Insinyur Lapangan',
  'Site Reliability Engineer': 'Site Reliability Engineer',
  'Small Business Owner': 'Pemilik Usaha Kecil',
  'Social Media Coordinator': 'Koordinator Media Sosial',
  'Social Media Manager': 'Manajer Media Sosial',
  'Social Media Specialist': 'Spesialis Media Sosial',
  'Social Worker': 'Pekerja Sosial',
  'Software Architect': 'Software Architect',
  'Software Developer': 'Software Developer',
  'Software Engineer': 'Software Engineer',
  'Software Tester': 'Software Tester',
  'Solar Installer': 'Instalator Panel Surya',
  'Solution Architect': 'Solution Architect',
  'Solutions Engineer': 'Solutions Engineer',
  'Sommelier': 'Sommelier',
  'Sous Chef': 'Sous Chef',
  'Spa Manager': 'Manajer Spa',
  'Special Education Teacher': 'Guru Pendidikan Khusus',
  'Speech-Language Pathologist': 'Ahli Patologi Bicara',
  'Sports Coach': 'Pelatih Olahraga',
  'Stage Manager': 'Manajer Panggung',
  'Sterile Processing Technician': 'Teknisi Sterilisasi',
  'Store Associate': 'Staf Toko',
  'Store Manager': 'Manajer Toko',
  'Storyboard Artist': 'Seniman Storyboard',
  'Substance Abuse Counselor': 'Konselor Penyalahgunaan Zat',
  'Supply Chain Analyst': 'Analis Supply Chain',
  'Supply Chain Manager': 'Manajer Supply Chain',
  'Support Worker': 'Petugas Dukungan',
  'Surgical Technologist': 'Teknolog Bedah',
  'Sushi Chef': 'Chef Sushi',
  'System Administrator': 'Administrator Sistem',
  'System Analyst': 'Analis Sistem',
  'System Engineer': 'System Engineer',
  'TSA Agent': 'Petugas Keamanan Bandara',
  'Talent Acquisition Specialist': 'Spesialis Talent Acquisition',
  'Teacher': 'Guru',
  'Teaching Assistant': 'Asisten Pengajar',
  'Team Leader': 'Team Leader',
  'Tech Sales Representative': 'Sales Representative Teknologi',
  'Technical Program Manager': 'Technical Program Manager',
  'Technical Recruiter': 'Technical Recruiter',
  'Technical Support Specialist': 'Spesialis Technical Support',
  'Technical Writer': 'Technical Writer',
  'Therapist': 'Terapis',
  'Title Examiner': 'Pemeriksa Hak Tanah',
  'Tour Guide': 'Pemandu Wisata',
  'Travel Agent': 'Agen Perjalanan',
  'Truck Driver': 'Sopir Truk',
  'Tutor': 'Tutor',
  'UI Designer': 'UI Designer',
  'UX Designer': 'UX Designer',
  'UX Researcher': 'UX Researcher',
  'Ultrasound Technician': 'Teknisi Ultrasonografi',
  'Valet Attendant': 'Petugas Valet',
  'Veterans Service Officer': 'Petugas Layanan Veteran',
  'Veterinary Assistant': 'Asisten Dokter Hewan',
  'Veterinary Technician': 'Teknisi Dokter Hewan',
  'Video Editor': 'Video Editor',
  'Videographer': 'Videografer',
  'Virtual Assistant': 'Virtual Assistant',
  'Voice Actor': 'Pengisi Suara',
  'Waiter/Waitress': 'Pelayan Restoran',
  'Warehouse Associate': 'Staf Gudang',
  'Warehouse Manager': 'Manajer Gudang',
  'Warehouse Worker': 'Pekerja Gudang',
  'Web Designer': 'Web Designer',
  'Web Developer': 'Web Developer',
  'Welder': 'Tukang Las',
  'Wellness Coach': 'Wellness Coach',
  'Wildlife Biologist': 'Ahli Biologi Satwa Liar',
  'Wind Turbine Technician': 'Teknisi Turbin Angin',
  'Window Cleaner': 'Pembersih Jendela',
  'X-Ray Technician': 'Teknisi Rontgen',
  'Yoga Instructor': 'Instruktur Yoga',
  'Youth Counselor': 'Konselor Remaja',
  'Zookeeper': 'Penjaga Kebun Binatang',
  'iOS Developer': 'iOS Developer',
  // Additional titles from cover letter sources
  'Banking Officer': 'Petugas Perbankan',
  'CNA': 'Asisten Perawat Bersertifikat (CNA)',
  'Chief Accountant': 'Kepala Akuntan',
  'Chief Information Officer': 'Chief Information Officer',
  'Civil Construction Engineer': 'Insinyur Konstruksi Sipil',
  'Content Marketing Specialist': 'Spesialis Pemasaran Konten',
  'Early Childhood Educator': 'Pendidik Anak Usia Dini',
  'Export Import Specialist': 'Spesialis Ekspor Impor',
  'Factory Production Worker': 'Pekerja Produksi Pabrik',
  'Golang Developer': 'Golang Developer',
  'HR Department Head': 'Kepala Departemen HRD',
  'LPN': 'Perawat Praktik Berlisensi (LPN)',
  'Licensed Pharmacist': 'Apoteker Berlisensi',
  'Medical Lab Technician': 'Teknisi Laboratorium Medis',
  'Nurse': 'Perawat',
  'Public Administration Officer': 'Petugas Administrasi Publik',
  'QC QA Specialist': 'Spesialis QC/QA',
  'Real Estate Sales Agent': 'Agen Penjualan Properti',
  'Telesales Agent': 'Agen Telesales',
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

// ─── HELPERS ────────────────────────────────────────────────────────────────

function normalizeCategory(category) {
  const c = category.toLowerCase();
  if (c.includes('hospitality') || c.includes('hotel')) return 'Hospitality';
  if (c.includes('tech') || c.includes('engineering') || c.includes('software') || c.includes('it')) return 'Technology';
  if (c.includes('health') || c.includes('medical') || c.includes('nursing')) return 'Healthcare';
  if (c.includes('finance') || c.includes('accounting') || c.includes('banking')) return 'Finance';
  if (c.includes('food') || c.includes('culinary') || c.includes('restaurant')) return 'Food Service';
  if (c.includes('trade') || c.includes('construction') || c.includes('manufacturing')) return 'Trades';
  if (c.includes('creative') || c.includes('design') || c.includes('art')) return 'Creative';
  if (c.includes('education') || c.includes('teaching')) return 'Education';
  if (c.includes('admin') || c.includes('office')) return 'Administrative';
  if (c.includes('sales')) return 'Sales';
  if (c.includes('marketing')) return 'Marketing';
  if (c.includes('hr') || c.includes('human resource')) return 'HR';
  if (c.includes('customer') || c.includes('support')) return 'Customer Service';
  if (c.includes('retail') || c.includes('store')) return 'Retail';
  if (c.includes('logistics') || c.includes('warehouse') || c.includes('supply')) return 'Logistics';
  if (c.includes('government') || c.includes('law enforcement') || c.includes('security') || c.includes('police')) return 'Government';
  if (c.includes('legal')) return 'Legal';
  return 'default';
}

// ─── CATEGORY OPENERS ───────────────────────────────────────────────────────

const CATEGORY_OPENERS = {
  Technology: (job) => `CV ${job} yang efektif jauh lebih dari sekadar daftar teknologi yang dikuasai. CV ini harus menunjukkan kemampuan memecahkan masalah nyata, mengukur dampak pekerjaan Anda, dan menonjolkan pemahaman Anda tentang tantangan teknis posisi yang dituju. Rekruter di industri teknologi Indonesia mencari kandidat yang dapat berkontribusi sejak hari pertama.`,
  Healthcare: (job) => `Rekruter di bidang kesehatan mencari kandidat yang dapat menunjukkan kompetensi klinis yang kuat sekaligus komitmen tulus terhadap kesejahteraan pasien. CV ${job} Anda harus menyeimbangkan keahlian teknis medis dengan kualitas interpersonal yang dibutuhkan dalam pelayanan kesehatan di Indonesia.`,
  Finance: (job) => `Rekruter di bidang keuangan mengutamakan kandidat yang mampu mengubah data kompleks menjadi keputusan strategis. CV ${job} Anda harus menunjukkan ketajaman analitis, perhatian terhadap detail, dan pertimbangan yang baik dalam masalah keuangan sesuai regulasi Indonesia.`,
  Education: (job) => `Manajer perekrutan di bidang pendidikan mencari profesional yang mampu menginspirasi pembelajaran dan beradaptasi dengan berbagai kebutuhan siswa. CV ${job} Anda harus mencerminkan keahlian pedagogis dan komitmen Anda terhadap keberhasilan siswa di lingkungan pendidikan Indonesia.`,
  'Food Service': (job) => `Manajer rekrutmen di industri kuliner mencari keandalan, semangat tim, dan kecintaan terhadap profesi. CV ${job} Anda harus menonjolkan keterampilan teknis kuliner dan kemampuan bekerja di bawah tekanan dalam lingkungan restoran atau katering yang dinamis.`,
  Hospitality: (job) => `Industri perhotelan menghargai kehangatan, perhatian terhadap detail, dan keanggunan di bawah tekanan. CV ${job} Anda harus mencerminkan orientasi layanan dan kemampuan Anda menciptakan pengalaman berkesan bagi tamu di hotel atau resort Indonesia.`,
  Trades: (job) => `Pengusaha menghargai profesional terampil yang mampu bekerja mandiri dan menghasilkan pekerjaan berkualitas. CV ${job} Anda harus menonjolkan pengalaman praktis, kesadaran keselamatan kerja, dan kemampuan memecahkan masalah di lapangan.`,
  Creative: (job) => `Profesional kreatif terbaik memadukan keunggulan artistik dengan pemahaman kebutuhan klien. CV ${job} Anda harus menonjolkan visi kreatif sekaligus menunjukkan kemampuan bisnis dan kemampuan menyelesaikan proyek tepat waktu sesuai anggaran.`,
  Administrative: (job) => `Pengusaha mencari kandidat yang mampu mengantisipasi kebutuhan, menyelesaikan masalah secara proaktif, dan menjaga kerahasiaan. CV ${job} yang efektif menunjukkan keunggulan organisasi dan kemampuan memastikan kelancaran operasional kantor.`,
  Sales: (job) => `CV Anda adalah presentasi penjualan pertama Anda, dan rekruter mengevaluasinya sebagai demikian. Pendekatan paling efektif untuk CV ${job} adalah menunjukkan bahwa Anda memahami tantangan bisnis perusahaan dan dapat berkontribusi pada target penjualan mereka.`,
  Marketing: (job) => `Dunia pemasaran bergerak cepat dan rekruter mencari kandidat yang menguasai strategi sekaligus eksekusi. CV ${job} Anda harus menunjukkan kemampuan menghasilkan hasil yang terukur sambil menampilkan kreativitas strategis yang dibutuhkan di pasar Indonesia.`,
  HR: (job) => `Berbeda dengan posisi lain di perusahaan, peran di bidang HRD mengharuskan Anda menunjukkan kemampuan mengelola dinamika organisasi yang sensitif sambil menghasilkan hasil nyata bagi bisnis. CV ${job} harus mencerminkan pemahaman mendalam tentang regulasi ketenagakerjaan Indonesia.`,
  'Customer Service': (job) => `Posisi layanan pelanggan memerlukan keterampilan komunikasi luar biasa dan empati yang tulus. CV ${job} Anda harus menunjukkan kemampuan menyelesaikan masalah secara efektif sambil mempertahankan hubungan positif dengan pelanggan.`,
  Retail: (job) => `Pengusaha ritel menghargai keandalan, pengetahuan produk, dan antusiasme tulus dalam layanan pelanggan. CV ${job} Anda harus menonjolkan kinerja penjualan dan kemampuan berkembang di lingkungan yang dinamis.`,
  Logistics: (job) => `Pengusaha di bidang logistik mengutamakan efisiensi, ketepatan, dan kemampuan mengelola operasi yang peka terhadap waktu. CV ${job} Anda harus menonjolkan pengalaman manajemen stok, perencanaan, dan optimasi proses distribusi.`,
  Government: (job) => `Lamaran di sektor pemerintahan dan BUMN memerlukan pendekatan yang berbeda dari sektor swasta. CV ${job} Anda harus langsung menjawab persyaratan lowongan sambil menunjukkan komitmen terhadap pelayanan publik.`,
  Legal: (job) => `Bidang hukum menuntut presisi mutlak dan perhatian teliti terhadap detail. CV ${job} Anda harus mencerminkan ketajaman intelektual, penguasaan kerangka hukum Indonesia, dan kemampuan mengelola kasus yang kompleks.`,
  default: (job) => `CV ${job} yang efektif berfokus pada pencapaian konkret yang menunjukkan kemampuan Anda menghasilkan hasil sejak hari pertama. CV ini menggabungkan pengalaman relevan dan antusiasme tulus terhadap posisi yang dituju.`,
};

// ─── TAGS GENERATOR ─────────────────────────────────────────────────────────

export function generateTags(jobTitle, slug) {
  const lower = jobTitle.toLowerCase();
  return [
    `cv ${lower}`,
    `contoh cv ${lower}`,
    `template cv ${lower}`,
    `curriculum vitae ${lower}`,
    `cv ${lower} ats friendly`,
    `format cv ${lower}`,
    `contoh cv ${lower} 2026`,
    `cara membuat cv ${lower}`,
  ];
}

// ─── FAQ GENERATOR ──────────────────────────────────────────────────────────

export function generateFAQ(jobTitle) {
  const lower = jobTitle.toLowerCase();
  return [
    {
      question: `Apa saja keterampilan yang harus dicantumkan dalam CV ${lower}?`,
      answer: `Dalam CV ${lower}, cantumkan keterampilan teknis yang langsung relevan dengan posisi, seperti perangkat lunak, sertifikasi, dan keahlian industri spesifik. Sertakan juga keterampilan soft skills seperti komunikasi, kepemimpinan, dan kerja tim. Gunakan kata kunci dari deskripsi pekerjaan untuk memastikan CV Anda lolos sistem ATS.`,
    },
    {
      question: `Berapa halaman idealnya CV ${lower}?`,
      answer: `CV ${lower} idealnya 1 halaman untuk kandidat dengan pengalaman di bawah 5 tahun, dan maksimal 2 halaman untuk profesional senior dengan pengalaman lebih dari 10 tahun. Prioritaskan kualitas konten daripada kuantitas — setiap baris harus menunjukkan nilai yang Anda tambahkan.`,
    },
    {
      question: `Format CV apa yang paling baik untuk posisi ${lower}?`,
      answer: `Format kronologis terbalik paling direkomendasikan untuk CV ${lower} karena menonjolkan perkembangan karier Anda. Gunakan template profesional yang kompatibel dengan sistem ATS, dengan bagian yang jelas: informasi kontak, ringkasan profesional, pengalaman, pendidikan, dan keterampilan.`,
    },
    {
      question: `Berapa gaji ${lower} di Indonesia?`,
      answer: `Gaji ${lower} di Indonesia bervariasi tergantung pengalaman, lokasi, dan ukuran perusahaan. Kandidat pemula biasanya mendapat Rp 4-8 juta per bulan, tingkat menengah Rp 8-20 juta, dan senior bisa mencapai Rp 20-50 juta atau lebih. Bandingkan dengan data pasar terkini di Jobstreet, LinkedIn, atau Indeed Indonesia.`,
    },
    {
      question: `Apa yang harus disertakan dalam CV ${lower}?`,
      answer: `CV ${lower} yang lengkap harus mencakup: informasi kontak profesional, ringkasan profesional yang menarik, pengalaman kerja dengan pencapaian terukur, pendidikan, sertifikasi relevan, dan keterampilan inti. Sesuaikan setiap bagian dengan persyaratan spesifik posisi yang dilamar.`,
    },
  ];
}

// ─── BODY GENERATOR ─────────────────────────────────────────────────────────

export function generateBody(jobTitle, category, keySkills, avgSalary, jobGrowth, slug) {
  const lower = jobTitle.toLowerCase();
  const skills = keySkills || [];
  const topSkills = skills.slice(0, 3).join(', ') || 'keterampilan utama';
  const midSkills = skills.slice(3, 6).join(', ') || 'keterampilan pendukung';
  const softSkills = skills.slice(6, 8).join(', ') || 'kerja tim, komunikasi';

  const norm = normalizeCategory(category);
  const opener = (CATEGORY_OPENERS[norm] || CATEGORY_OPENERS.default)(jobTitle);

  return `
## Apa yang Membuat CV ${jobTitle} Menonjol?

${opener}

Rekruter rata-rata hanya menghabiskan 6-7 detik pada pembacaan pertama CV. Untuk posisi ${lower}, ini berarti keterampilan paling relevan dan pencapaian utama Anda harus langsung terlihat. CV yang terstruktur dengan baik bukan sekadar daftar pengalaman — ia menceritakan perjalanan karier Anda dan menunjukkan nilai yang Anda bawa ke perusahaan.

## Contoh Ringkasan Profesional

### Pemula / Fresh Graduate

${lower} bermotivasi tinggi dengan latar belakang pendidikan yang kuat dalam ${topSkills || 'bidang terkait'}. Siap berkontribusi pada tim yang dinamis dan menerapkan pengetahuan akademik dalam lingkungan profesional. Dikenal atas kemampuan belajar cepat, keterampilan organisasi, dan tekad mencapai target yang ditetapkan.

### Menengah (3-7 Tahun Pengalaman)

${jobTitle} berpengalaman dengan lebih dari 5 tahun keahlian dalam ${topSkills}. Terbukti berhasil meningkatkan efisiensi proses dan menyelesaikan proyek tepat waktu dan sesuai anggaran. Ahli dalam ${midSkills || 'keterampilan lanjutan'}, dengan kemampuan teruji membimbing tim junior dan mendorong inisiatif perbaikan berkelanjutan.

### Senior (8+ Tahun Pengalaman)

${jobTitle} senior dengan lebih dari 10 tahun pengalaman di industri, diakui atas keahlian dalam ${topSkills} dan ${midSkills || 'manajemen strategis'}. Telah memimpin tim multidisiplin dan mengelola proyek strategis yang menghasilkan penghematan signifikan. Keterampilan lanjutan dalam ${softSkills || 'kepemimpinan dan visi strategis'} dengan rekam jejak konsisten melampaui target.

## Gaji & Prospek Karier

Gaji rata-rata seorang ${lower} adalah sekitar **${avgSalary || 'Rp 8.000.000 - Rp 20.000.000'}** per bulan, dengan variasi signifikan berdasarkan pengalaman, lokasi geografis, dan sektor industri. Prospek pertumbuhan pekerjaan untuk posisi ini adalah **${jobGrowth || '+10%'}** dalam beberapa tahun ke depan.

Profesional pemula dapat mengharapkan gaji awal sekitar 70-80% dari median, sementara profil senior atau spesialis dapat melampaui median hingga 40-60%. Kota-kota besar seperti Jakarta, Surabaya, dan Bandung umumnya menawarkan kompensasi lebih tinggi.

**Sumber Referensi Gaji:**
- [Bureau of Labor Statistics (BLS)](https://www.bls.gov/ooh/) — Data resmi ketenagakerjaan dan gaji
- [Glassdoor](https://www.glassdoor.com/Salaries/) — Gaji yang dilaporkan karyawan dan kisaran kompensasi
- [PayScale](https://www.payscale.com/research/US/) — Riset gaji dan perbandingan berdasarkan posisi

*Kompensasi aktual bervariasi berdasarkan pengalaman, lokasi, industri, dan ukuran perusahaan.*

## Keterampilan Penting yang Harus Ditonjolkan

### Keterampilan Teknis
${skills.slice(0, 3).map(s => `- **${s}** — Keterampilan fundamental untuk setiap ${lower}, langsung dicari oleh rekruter dan sistem ATS`).join('\n') || `- Penguasaan alat dan teknologi spesifik bidang\n- Pengetahuan mendalam tentang metode dan proses industri\n- Kemampuan menggunakan perangkat lunak profesional yang relevan`}

### Keterampilan Organisasi & Manajerial
${skills.slice(3, 6).map(s => `- **${s}** — Keterampilan yang dihargai dalam pelaksanaan peran ${lower} sehari-hari`).join('\n') || `- Manajemen waktu dan prioritas tugas\n- Organisasi dan perencanaan proyek\n- Ketelitian dalam mengikuti prosedur`}

### Keterampilan Interpersonal
${skills.slice(6, 8).map(s => `- **${s}** — Kualitas interpersonal penting untuk sukses sebagai ${lower}`).join('\n') || `- Komunikasi tertulis dan lisan yang efektif\n- Kerja tim dan kolaborasi`}
- Kemampuan adaptasi dan bekerja di bawah tekanan
- Pemecahan masalah dan pengambilan keputusan

## Poin Pencapaian Berorientasi Hasil

Gunakan contoh ini sebagai model untuk merumuskan pencapaian Anda sendiri dengan angka konkret:

- Meningkatkan efisiensi operasional **25%** melalui optimasi proses dalam ${topSkills || 'bidang utama'}, menghasilkan penghematan tahunan yang signifikan
- Mengelola **12+ proyek** secara bersamaan dengan tingkat penyelesaian tepat waktu 98%, melampaui target tim
- Melatih dan membimbing **8 rekan junior**, berkontribusi mengurangi waktu orientasi 40%
- Mengimplementasikan sistem ${skills[0] || 'manajemen'} baru yang mengurangi kesalahan **35%** dan meningkatkan kepuasan pelanggan
- Meningkatkan pendapatan **20%** dalam satu kuartal melalui strategi inovatif dalam ${skills[1] || 'pengembangan bisnis'}
- Mencapai tingkat kepuasan pelanggan **95%** dengan mengimplementasikan perbaikan berkelanjutan berdasarkan umpan balik pengguna

## Tips Format & Template CV ${jobTitle}

1. **Gunakan format kronologis terbalik** — Tempatkan pengalaman terbaru di atas. Ini format yang paling disukai rekruter dan sistem ATS untuk posisi ${lower}.
2. **Sesuaikan ringkasan profesional untuk setiap lamaran** — Ambil kata kunci dari deskripsi pekerjaan dan personalisasi pembukaan Anda untuk menunjukkan pemahaman tentang kebutuhan spesifik perusahaan.
3. **Kuantifikasi pencapaian Anda** — Angka menarik perhatian dan membuat kontribusi Anda nyata. Pilih "meningkatkan penjualan 30%" daripada "meningkatkan hasil penjualan".
4. **Perhatikan tata letak** — Gunakan margin 2,5 cm, font profesional (Calibri, Arial) ukuran 10-12, dan bagian yang jelas dipisahkan dengan judul tebal.
5. **Sertakan sertifikasi dan pelatihan relevan** — Untuk posisi ${lower}, sertifikasi profesional menunjukkan komitmen Anda terhadap pengembangan keahlian.

## Saran Manajer Perekrutan

> **Kesalahan paling umum yang saya lihat dalam CV ${lower} adalah tidak adanya hasil yang terukur.** Banyak kandidat mendeskripsikan tanggung jawab tanpa pernah menunjukkan dampak nyata dari pekerjaan mereka.

Ketika saya merekrut ${lower}, saya mencari bukti nyata kinerja. Kandidat yang menulis "Mengelola tim 5 orang" memberikan informasi yang lebih sedikit dibandingkan yang menulis "Memimpin tim 5 orang, mencapai 115% target kuartalan selama 4 kuartal berturut-turut". Setiap baris di bagian pengalaman harus menjawab pertanyaan: hasil terukur apa yang saya capai?

## Pertanyaan Wawancara Umum untuk ${jobTitle}

### Bisakah Anda menggambarkan proyek kompleks yang berhasil Anda selesaikan sebagai ${lower}?

Rekruter ingin mengevaluasi kemampuan Anda mengelola kompleksitas. Susun jawaban menggunakan metode STAR (Situasi, Tugas, Aksi, Hasil). Deskripsikan konteks, peran spesifik Anda, tindakan yang Anda ambil, dan hasil terukur yang dicapai.

### Bagaimana Anda menangani situasi tekanan atau tenggat waktu ketat dalam peran ${lower} Anda?

Tunjukkan kemampuan Anda memprioritaskan dan tetap produktif di bawah tekanan. Berikan contoh konkret di mana Anda harus mengelola prioritas yang bertentangan, jelaskan pendekatan metodis Anda, dan bagikan hasil positif yang dicapai.

### Apa kekuatan teknis terbesar Anda yang relevan dengan posisi ${lower} ini?

Ini kesempatan untuk menonjolkan keahlian Anda dalam ${topSkills || 'keterampilan inti'}. Jangan hanya mendaftar keterampilan — ilustrasikan dengan contoh penerapan nyata dan hasil yang dicapai berkat keterampilan tersebut.

### Bagaimana Anda mengikuti perkembangan di bidang ${lower}?

Rekruter ingin memastikan Anda berinvestasi dalam pengembangan profesional berkelanjutan. Sebutkan pelatihan terkini, sertifikasi, konferensi, publikasi profesional, atau komunitas yang Anda ikuti secara aktif.

### Di mana Anda melihat diri Anda dalam lima tahun ke depan di bidang ${lower}?

Tunjukkan bahwa Anda memiliki visi jelas tentang pengembangan profesional Anda. Ekspresikan ambisi yang realistis yang selaras dengan peluang pertumbuhan perusahaan, sambil menunjukkan komitmen jangka panjang di industri.

## Kesalahan Umum yang Harus Dihindari

### 1. Menggunakan CV generik yang tidak disesuaikan

Mengirimkan CV yang sama untuk setiap lamaran adalah kesalahan paling merugikan. Sistem ATS dan rekruter langsung mendeteksi CV yang tidak dipersonalisasi. Sesuaikan ringkasan profesional dan kata kunci untuk setiap posisi ${lower}.

### 2. Mendeskripsikan tugas daripada pencapaian

Mendaftar tanggung jawab sehari-hari tidak mengesankan rekruter. Ubah setiap poin menjadi pencapaian yang terukur. "Mengelola panggilan pelanggan" menjadi "Menangani rata-rata 85 panggilan per hari dengan tingkat resolusi pertama kali 92%".

### 3. Mengabaikan optimasi ATS

Banyak kandidat posisi ${lower} kehilangan kesempatan karena CV mereka tidak lolos filter otomatis. Hindari tabel kompleks, header dan footer, serta grafik yang tidak terbaca oleh sistem ATS.

### 4. Menyertakan informasi usang atau tidak relevan

Pengalaman lebih dari 15 tahun lalu atau yang tidak berkaitan dengan posisi ${lower} memenuhi CV Anda. Fokus pada 10 tahun terakhir dan pengalaman yang langsung relevan dengan posisi yang dilamar.

### 5. Melupakan kata kunci spesifik industri

Setiap industri memiliki jargon profesionalnya sendiri. Untuk posisi ${lower}, tidak adanya istilah teknis spesifik seperti ${topSkills || 'keterampilan bidang'} dapat menandakan kurangnya keahlian di mata rekruter.

## Optimasi ATS untuk CV ${jobTitle}

Sistem Applicant Tracking System (ATS) menyaring CV sebelum rekruter melihatnya. Untuk memaksimalkan peluang Anda sebagai ${lower}:

- **Gunakan kata kunci persis dari deskripsi pekerjaan** — Jika lowongan menyebut "${skills[0] || 'keterampilan spesifik'}", gunakan frasa yang sama persis dalam CV Anda
- **Gunakan format yang sederhana dan mudah dibaca** — Hindari kolom ganda, tabel, dan kotak teks yang mengganggu parser ATS
- **Tempatkan keterampilan inti di beberapa bagian** — Sebutkan ${topSkills || 'keterampilan utama Anda'} dalam ringkasan profesional, pengalaman, DAN bagian keterampilan
- **Pilih format PDF atau DOCX** — Format ini paling baik didukung oleh sistem ATS modern
- **Sertakan akronim DAN istilah lengkap** — Tulis misalnya "Human Resources Development (HRD)" untuk mencakup kedua varian pencarian
- **Hindari header dan footer** — Beberapa ATS tidak membaca konten yang ditempatkan di area tersebut

## Sumber Daya Tambahan

Kunjungi sumber daya ini untuk menyempurnakan lamaran ${lower} Anda:

- [Periksa kompatibilitas ATS CV Anda](/id/tools/ats-checker) — Uji CV Anda secara gratis dengan alat analisis ATS kami
- [Contoh CV profesional](/id/resume-examples) — Jelajahi ratusan template berdasarkan bidang pekerjaan
- [Template CV ATS-friendly](/id/templates) — Pilih dari template kami yang dioptimalkan untuk lolos filter otomatis

Siap membuat CV ${lower} yang profesional dan ATS-friendly? Gunakan [pembuat CV gratis kami](/id/builder) untuk membuat CV yang mengesankan dalam beberapa menit. Template kami dioptimalkan untuk sistem ATS dan memandu Anda langkah demi langkah dalam menyusun setiap bagian.
`;
}
