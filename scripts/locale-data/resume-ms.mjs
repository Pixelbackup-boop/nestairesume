/**
 * Malay (ms) locale data for resume example generation.
 * Imported by generate-locale-resume-examples.mjs via:
 *   await import('./locale-data/resume-ms.mjs')
 *
 * Keyword source: Malaysian job market search trends
 * Top terms: contoh resume (resume example), resume template (5K),
 *            cara buat resume (how to make resume), resume kerja (work resume),
 *            template resume percuma (free resume template),
 *            resume contoh terbaik (best resume example)
 */

const LANG = 'ms';

// ─── CONFIG ─────────────────────────────────────────────────────────────────

export const CONFIG = {
  author: 'Nurul Aisyah',
  authorBio: 'Perunding pembangunan kerjaya dengan lebih 10 tahun pengalaman dalam pasaran pekerjaan Malaysia. Pakar dalam penulisan resume dan strategi pencarian kerja, telah membantu ribuan pencari kerja berjaya mendapat temuduga dan tawaran kerja.',
  titlePattern: (job) => `Contoh Resume ${job} | Panduan Menulis 2026`,
  descriptionPattern: (job) => `Contoh resume ${job} dan template percuma. Panduan cara buat resume kerja yang optimum untuk ATS. Muat turun template resume ${job} 2026.`,
  imageAltPattern: (job) => `Contoh Resume ${job}`,
};

// ─── JOB TITLES (English → Malay) ──────────────────────────────────────────
// Uses Malay terms people actually search for — English loanwords where natural
// in Malaysian workplace context, native Malay terms where that is standard.

export const JOB_TITLES = {
  '3D Artist': 'Artis 3D',
  'AI Engineer': 'Jurutera AI',
  'AWS Cloud Engineer': 'Jurutera Cloud AWS',
  'AWS Solution Architect': 'Arkitek Solusi AWS',
  'Academic Advisor': 'Penasihat Akademik',
  'Account Executive': 'Eksekutif Akaun',
  'Account Manager': 'Pengurus Akaun',
  'Accountant': 'Akauntan',
  'Accounting Assistant': 'Pembantu Perakaunan',
  'Accounting Clerk': 'Kerani Perakaunan',
  'Accounting Intern': 'Pelatih Perakaunan',
  'Accounting Manager': 'Pengurus Perakaunan',
  'Accounts Payable Specialist': 'Pakar Akaun Belum Bayar',
  'Accounts Receivable Specialist': 'Pakar Akaun Belum Terima',
  'Acupuncturist': 'Pakar Akupunktur',
  'Administrative Assistant': 'Pembantu Pentadbiran',
  'Administrative Coordinator': 'Penyelaras Pentadbiran',
  'Admissions Counselor': 'Kaunselor Kemasukan',
  'Advertising Manager': 'Pengurus Pengiklanan',
  'Aerospace Engineer': 'Jurutera Aeroangkasa',
  'Agricultural Engineer': 'Jurutera Pertanian',
  'Air Traffic Controller': 'Pengawal Trafik Udara',
  'Aircraft Mechanic': 'Mekanik Pesawat',
  'Android Developer': 'Pembangun Android',
  'Anesthesiologist': 'Pakar Anestesiologi',
  'Animal Caretaker': 'Penjaga Haiwan',
  'Animal Control Officer': 'Pegawai Kawalan Haiwan',
  'Animal Shelter Worker': 'Pekerja Pusat Perlindungan Haiwan',
  'Animator': 'Animator',
  'Appliance Repair Technician': 'Juruteknik Pembaikan Peralatan',
  'Application Support Engineer': 'Jurutera Sokongan Aplikasi',
  'Appraiser': 'Penilai',
  'Apprentice Electrician': 'Perantis Juruelektrik',
  'Aquarium Keeper': 'Penjaga Akuarium',
  'Arbitrator': 'Penimbang Tara',
  'Arborist': 'Pakar Pokok',
  'Architect': 'Arkitek',
  'Architectural Drafter': 'Pelukis Pelan Seni Bina',
  'Art Director': 'Pengarah Seni',
  'Art Teacher': 'Guru Seni',
  'Assembler': 'Pemasang',
  'Assistant Director': 'Penolong Pengarah',
  'Assistant Manager': 'Penolong Pengurus',
  'Assistant Principal': 'Penolong Pengetua',
  'Assistant Property Manager': 'Penolong Pengurus Hartanah',
  'Assistant Store Manager': 'Penolong Pengurus Kedai',
  'Athletic Trainer': 'Jurulatih Sukan',
  'Audio Engineer': 'Jurutera Audio',
  'Audit Manager': 'Pengurus Audit',
  'Auditor': 'Juruaudit',
  'Auto Body Technician': 'Juruteknik Badan Kereta',
  'Auto Mechanic': 'Mekanik Kereta',
  'Automation Engineer': 'Jurutera Automasi',
  'Automotive Engineer': 'Jurutera Automotif',
  'Automotive Technician': 'Juruteknik Automotif',
  'Aviation Maintenance Technician': 'Juruteknik Penyelenggaraan Penerbangan',
  'Back-End Developer': 'Pembangun Back-End',
  'Backend Developer': 'Pembangun Backend',
  'Baker': 'Tukang Roti',
  'Bank Manager': 'Pengurus Bank',
  'Bank Teller': 'Juruwang Bank',
  'Banker': 'Pegawai Bank',
  'Banquet Chef': 'Chef Jamuan',
  'Barber': 'Tukang Gunting Rambut',
  'Barista': 'Barista',
  'Bartender': 'Bartender',
  'Beauty Advisor': 'Penasihat Kecantikan',
  'Behavioral Therapist': 'Ahli Terapi Tingkah Laku',
  'Bellhop': 'Bellboy',
  'Bicycle Mechanic': 'Mekanik Basikal',
  'Billing Specialist': 'Pakar Pengebilan',
  'Biomedical Engineer': 'Jurutera Bioperubatan',
  'Blockchain Developer': 'Pembangun Blockchain',
  'Bookkeeper': 'Pemegang Buku Akaun',
  'Branch Manager': 'Pengurus Cawangan',
  'Brand Designer': 'Pereka Jenama',
  'Brand Manager': 'Pengurus Jenama',
  'Budget Analyst': 'Penganalisis Belanjawan',
  'Building Engineer': 'Jurutera Bangunan',
  'Building Inspector': 'Pemeriksa Bangunan',
  'Building Maintenance Technician': 'Juruteknik Penyelenggaraan Bangunan',
  'Bus Driver': 'Pemandu Bas',
  'Business Administration Professional': 'Profesional Pentadbiran Perniagaan',
  'Business Analyst': 'Penganalisis Perniagaan',
  'Business Consultant': 'Perunding Perniagaan',
  'Business Development Associate': 'Pegawai Pembangunan Perniagaan',
  'Business Development Executive': 'Eksekutif Pembangunan Perniagaan',
  'Business Development Manager': 'Pengurus Pembangunan Perniagaan',
  'Business Intelligence Analyst': 'Penganalisis Perisikan Perniagaan',
  'Business Intelligence Specialist': 'Pakar Perisikan Perniagaan',
  'Business Manager': 'Pengurus Perniagaan',
  'Business Owner': 'Pemilik Perniagaan',
  'Busser': 'Pembantu Restoran',
  'Butcher': 'Tukang Daging',
  'Buyer': 'Pembeli',
  'CAD Designer': 'Pereka CAD',
  'CNA (Certified Nursing Assistant)': 'Pembantu Kejururawatan Bertauliah',
  'CNC Machinist': 'Operator Mesin CNC',
  'CNC Operator': 'Operator CNC',
  'COO (Chief Operating Officer)': 'COO (Ketua Pegawai Operasi)',
  'Cabin Crew': 'Anak Kapal',
  'Cabinet Maker': 'Tukang Kabinet',
  'Cable Technician': 'Juruteknik Kabel',
  'Cafeteria Worker': 'Pekerja Kafeteria',
  'Call Center Agent': 'Ejen Pusat Panggilan',
  'Call Center Manager': 'Pengurus Pusat Panggilan',
  'Call Center Representative': 'Wakil Pusat Panggilan',
  'Camp Counselor': 'Kaunselor Kem',
  'Car Detailer': 'Pakar Perincian Kereta',
  'Car Sales Associate': 'Pegawai Jualan Kereta',
  'Car Salesperson': 'Jurujual Kereta',
  'Cardiac Sonographer': 'Sonografer Jantung',
  'Cardiovascular Technologist': 'Teknologis Kardiovaskular',
  'Caregiver': 'Penjaga Pesakit',
  'Carpenter': 'Tukang Kayu',
  'Carpet Cleaner': 'Pembersih Karpet',
  'Case Manager': 'Pengurus Kes',
  'Cashier': 'Juruwang',
  'Casino Dealer': 'Dealer Kasino',
  'Caterer': 'Pengusaha Katering',
  'Catering Manager': 'Pengurus Katering',
  'Cement Mason': 'Tukang Simen',
  'Certified Nursing Assistant': 'Pembantu Kejururawatan Bertauliah',
  'Certified Nursing Assistant (CNA)': 'Pembantu Kejururawatan Bertauliah (CNA)',
  'Change Management Specialist': 'Pakar Pengurusan Perubahan',
  'Chef': 'Chef',
  'Chemical Engineer': 'Jurutera Kimia',
  'Chemist': 'Ahli Kimia',
  'Chief Information Officer (CIO)': 'CIO (Ketua Pegawai Maklumat)',
  'Chief of Staff': 'Ketua Kakitangan',
  'Chiropractor': 'Kiropraktor',
  'City Planner': 'Perancang Bandar',
  'Civil Engineer': 'Jurutera Awam',
  'Claims Adjuster': 'Penyelaras Tuntutan',
  'Claims Analyst': 'Penganalisis Tuntutan',
  'Cleaner': 'Pembersih',
  'Client Relations Manager': 'Pengurus Hubungan Pelanggan',
  'Clinical Research Associate': 'Rakan Penyelidikan Klinikal',
  'Clinical Research Coordinator': 'Penyelaras Penyelidikan Klinikal',
  'Cloud Architect': 'Arkitek Cloud',
  'Cloud Engineer': 'Jurutera Cloud',
  'Coach': 'Jurulatih',
  'Code Enforcement Officer': 'Pegawai Penguatkuasaan Kod',
  'Collections Specialist': 'Pakar Kutipan Hutang',
  'College Admissions Counselor': 'Kaunselor Kemasukan Kolej',
  'College Professor': 'Profesor Kolej',
  'Commercial Cleaner': 'Pembersih Komersial',
  'Commercial Real Estate Broker': 'Broker Hartanah Komersial',
  'Communications Director': 'Pengarah Komunikasi',
  'Communications Manager': 'Pengurus Komunikasi',
  'Community Health Worker': 'Pekerja Kesihatan Komuniti',
  'Community Manager': 'Pengurus Komuniti',
  'Community Outreach Coordinator': 'Penyelaras Jangkauan Komuniti',
  'Complaints Handler': 'Pengendali Aduan',
  'Compliance Analyst': 'Penganalisis Pematuhan',
  'Compliance Manager': 'Pengurus Pematuhan',
  'Compliance Officer': 'Pegawai Pematuhan',
  'Computer Operator': 'Operator Komputer',
  'Computer Science Professional': 'Profesional Sains Komputer',
  'Computer Technician': 'Juruteknik Komputer',
  'Concierge': 'Concierge',
  'Concrete Finisher': 'Tukang Kemasan Konkrit',
  'Construction Engineer': 'Jurutera Pembinaan',
  'Construction Manager': 'Pengurus Pembinaan',
  'Construction Superintendent': 'Penyelia Pembinaan',
  'Construction Worker': 'Pekerja Pembinaan',
  'Consultant': 'Perunding',
  'Content Creator': 'Pencipta Kandungan',
  'Content Marketing Manager': 'Pengurus Pemasaran Kandungan',
  'Content Strategist': 'Pakar Strategi Kandungan',
  'Content Writer': 'Penulis Kandungan',
  'Contract Specialist': 'Pakar Kontrak',
  'Contracts Specialist': 'Pakar Kontrak',
  'Controller': 'Pengawal Kewangan',
  'Copywriter': 'Penulis Iklan',
  'Corporate Recruiter': 'Perekrut Korporat',
  'Corporate Security Manager': 'Pengurus Keselamatan Korporat',
  'Correctional Officer': 'Pegawai Pemulihan',
  'Cosmetologist': 'Ahli Kosmetologi',
  'Counselor': 'Kaunselor',
  'Courier': 'Kurier',
  'Court Clerk': 'Kerani Mahkamah',
  'Court Reporter': 'Penulis Laporan Mahkamah',
  'Crane Operator': 'Operator Kren',
  'Creative Director': 'Pengarah Kreatif',
  'Credit Analyst': 'Penganalisis Kredit',
  'Crisis Counselor': 'Kaunselor Krisis',
  'Cruise Ship Worker': 'Pekerja Kapal Persiaran',
  'Curriculum Designer': 'Pereka Kurikulum',
  'Curriculum Developer': 'Pembangun Kurikulum',
  'Customer Experience Specialist': 'Pakar Pengalaman Pelanggan',
  'Customer Service Manager': 'Pengurus Perkhidmatan Pelanggan',
  'Customer Service Representative': 'Wakil Perkhidmatan Pelanggan',
  'Customer Success Manager': 'Pengurus Kejayaan Pelanggan',
  'Customer Success Specialist': 'Pakar Kejayaan Pelanggan',
  'Customer Support Specialist': 'Pakar Sokongan Pelanggan',
  'Customs Broker': 'Broker Kastam',
  'Customs Officer': 'Pegawai Kastam',
  'Cybersecurity Analyst': 'Penganalisis Keselamatan Siber',
  'Data Analyst': 'Penganalisis Data',
  'Data Architect': 'Arkitek Data',
  'Data Engineer': 'Jurutera Data',
  'Data Entry Clerk': 'Kerani Kemasukan Data',
  'Data Entry Operator': 'Operator Kemasukan Data',
  'Data Entry Specialist': 'Pakar Kemasukan Data',
  'Data Scientist': 'Saintis Data',
  'Database Administrator': 'Pentadbir Pangkalan Data',
  'Delivery Driver': 'Pemandu Penghantaran',
  'Dental Assistant': 'Pembantu Pergigian',
  'Dental Hygienist': 'Pakar Higien Pergigian',
  'Dental Office Manager': 'Pengurus Klinik Pergigian',
  'Dentist': 'Doktor Gigi',
  'Deputy Sheriff': 'Timbalan Syerif',
  'Design Engineer': 'Jurutera Reka Bentuk',
  'Desktop Support Engineer': 'Jurutera Sokongan Desktop',
  'Desktop Support Specialist': 'Pakar Sokongan Desktop',
  'Desktop Support Technician': 'Juruteknik Sokongan Desktop',
  'Detailer': 'Pakar Perincian',
  'DevOps Engineer': 'Jurutera DevOps',
  'Dialysis Technician': 'Juruteknik Dialisis',
  'Diesel Mechanic': 'Mekanik Diesel',
  'Diesel Technician': 'Juruteknik Diesel',
  'Dietary Aide': 'Pembantu Diet',
  'Dietitian': 'Pakar Pemakanan',
  'Digital Marketer': 'Pemasar Digital',
  'Digital Marketing Manager': 'Pengurus Pemasaran Digital',
  'Digital Marketing Specialist': 'Pakar Pemasaran Digital',
  'Director of Operations': 'Pengarah Operasi',
  'Dishwasher': 'Pencuci Pinggan',
  'Dispatcher': 'Penghantar',
  'District Manager': 'Pengurus Daerah',
  'Doctor': 'Doktor',
  'Dog Groomer': 'Pakar Dandanan Anjing',
  'Dog Trainer': 'Jurulatih Anjing',
  'Dog Walker': 'Pengiring Anjing',
  'Drafter': 'Pelukis Pelan',
  'Driver': 'Pemandu',
  'Drywall Installer': 'Pemasang Dinding Kering',
  'EMT': 'Juruteknik Perubatan Kecemasan',
  'ESL Teacher': 'Guru Bahasa Inggeris',
  'Editor': 'Editor',
  'Education Consultant': 'Perunding Pendidikan',
  'Educational Technologist': 'Teknologis Pendidikan',
  'Electrical Engineer': 'Jurutera Elektrik',
  'Electrical Technician': 'Juruteknik Elektrik',
  'Electrician': 'Juruelektrik',
  'Elementary Teacher': 'Guru Sekolah Rendah',
  'Elevator Technician': 'Juruteknik Lif',
  'Embedded Software Engineer': 'Jurutera Perisian Terbenam',
  'Embedded Systems Engineer': 'Jurutera Sistem Terbenam',
  'Emergency Management Coordinator': 'Penyelaras Pengurusan Kecemasan',
  'Emergency Medical Technician (EMT)': 'Juruteknik Perubatan Kecemasan (EMT)',
  'Engineering Manager': 'Pengurus Kejuruteraan',
  'Entrepreneur': 'Usahawan',
  'Environmental Compliance Officer': 'Pegawai Pematuhan Alam Sekitar',
  'Environmental Consultant': 'Perunding Alam Sekitar',
  'Environmental Engineer': 'Jurutera Alam Sekitar',
  'Environmental Scientist': 'Saintis Alam Sekitar',
  'Epidemiologist': 'Pakar Epidemiologi',
  'Escrow Officer': 'Pegawai Eskrow',
  'Esthetician': 'Pakar Estetik',
  'Ethical Hacker': 'Penggodam Beretika',
  'Event Coordinator': 'Penyelaras Acara',
  'Event Manager': 'Pengurus Acara',
  'Event Planner': 'Perancang Acara',
  'Executive Assistant': 'Pembantu Eksekutif',
  'Executive Chef': 'Chef Eksekutif',
  'Executive Director': 'Pengarah Eksekutif',
  'Executive Housekeeper': 'Ketua Pengemasan',
  'Exercise Physiologist': 'Pakar Fisiologi Senaman',
  'Expeditor': 'Pegawai Penghantaran',
  'Eyewear Sales Associate': 'Pegawai Jualan Cermin Mata',
  'Facilities Manager': 'Pengurus Fasiliti',
  'Factory Worker': 'Pekerja Kilang',
  'Family Services Worker': 'Pekerja Perkhidmatan Keluarga',
  'Fashion Designer': 'Pereka Fesyen',
  'Fast Food Worker': 'Pekerja Makanan Segera',
  'Fence Installer': 'Pemasang Pagar',
  'Field Engineer': 'Jurutera Lapangan',
  'Field Service Technician': 'Juruteknik Perkhidmatan Lapangan',
  'Film Director': 'Pengarah Filem',
  'Finance Manager': 'Pengurus Kewangan',
  'Financial Advisor': 'Penasihat Kewangan',
  'Financial Analyst': 'Penganalisis Kewangan',
  'Financial Controller': 'Pengawal Kewangan',
  'Financial Manager': 'Pengurus Kewangan',
  'Financial Planner': 'Perancang Kewangan',
  'Fire Chief': 'Ketua Bomba',
  'Fire Inspector': 'Pemeriksa Kebakaran',
  'Firefighter': 'Anggota Bomba',
  'Fitness Center Manager': 'Pengurus Pusat Kecergasan',
  'Fitness Instructor': 'Pengajar Kecergasan',
  'Fitness Trainer': 'Jurulatih Kecergasan',
  'Fleet Manager': 'Pengurus Armada',
  'Flight Attendant': 'Pramugari/Pramugara',
  'Floor Installer': 'Pemasang Lantai',
  'Floor Manager': 'Pengurus Lantai',
  'Florist': 'Penjual Bunga',
  'Food Expeditor': 'Penghantar Makanan Dapur',
  'Food Runner': 'Penghantar Makanan',
  'Food Safety Manager': 'Pengurus Keselamatan Makanan',
  'Food Scientist': 'Saintis Makanan',
  'Food Server': 'Pelayan Makanan',
  'Food Service Director': 'Pengarah Perkhidmatan Makanan',
  'Food Service Manager': 'Pengurus Perkhidmatan Makanan',
  'Food Service Worker': 'Pekerja Perkhidmatan Makanan',
  'Food Stylist': 'Penggaya Makanan',
  'Food Truck Operator': 'Operator Trak Makanan',
  'Forklift Operator': 'Operator Forklif',
  'Freelance Writer': 'Penulis Bebas',
  'Freight Broker': 'Broker Pengangkutan',
  'Front Desk Agent': 'Pegawai Kaunter Hadapan',
  'Front Desk Receptionist': 'Penyambut Tetamu Kaunter Hadapan',
  'Front End Developer': 'Pembangun Front End',
  'Front-End Developer': 'Pembangun Front-End',
  'Frontend Developer': 'Pembangun Frontend',
  'Full Stack Developer': 'Pembangun Full Stack',
  'Full-Stack Developer': 'Pembangun Full-Stack',
  'Fundraiser': 'Pengumpul Dana',
  'Funeral Director': 'Pengarah Pengurusan Jenazah',
  'Game Designer': 'Pereka Permainan',
  'Game Developer': 'Pembangun Permainan',
  'General Counsel': 'Penasihat Undang-Undang',
  'General Manager': 'Pengurus Besar',
  'Genetic Counselor': 'Kaunselor Genetik',
  'Geologist': 'Ahli Geologi',
  'GIS Analyst': 'Penganalisis GIS',
  'Glazier': 'Tukang Kaca',
  'Go Developer': 'Pembangun Go',
  'Golf Course Superintendent': 'Penyelia Padang Golf',
  'Google Ads Specialist': 'Pakar Google Ads',
  'Governance Risk Compliance': 'Pakar GRC',
  'Grants Manager': 'Pengurus Geran',
  'Graphic Designer': 'Pereka Grafik',
  'Grocery Store Clerk': 'Kerani Kedai Runcit',
  'Group Fitness Instructor': 'Pengajar Kecergasan Kumpulan',
  'Guidance Counselor': 'Kaunselor Bimbingan',
  'Gym Manager': 'Pengurus Gimnasium',
  'Gym Trainer': 'Jurulatih Gimnasium',
  'HVAC Technician': 'Juruteknik HVAC',
  'HR Assistant': 'Pembantu Sumber Manusia',
  'HR Business Partner': 'Rakan Perniagaan HR',
  'HR Coordinator': 'Penyelaras Sumber Manusia',
  'HR Director': 'Pengarah Sumber Manusia',
  'HR Executive': 'Eksekutif Sumber Manusia',
  'HR Manager': 'Pengurus Sumber Manusia',
  'HR Recruiter': 'Perekrut Sumber Manusia',
  'Hair Stylist': 'Penggaya Rambut',
  'Head Chef': 'Ketua Chef',
  'Head Cook': 'Ketua Tukang Masak',
  'Health Coach': 'Jurulatih Kesihatan',
  'Health Educator': 'Pendidik Kesihatan',
  'Health Information Technician': 'Juruteknik Maklumat Kesihatan',
  'Health Inspector': 'Pemeriksa Kesihatan',
  'Healthcare Administrator': 'Pentadbir Penjagaan Kesihatan',
  'Heavy Equipment Operator': 'Operator Jentera Berat',
  'Help Desk Technician': 'Juruteknik Meja Bantuan',
  'High School Teacher': 'Guru Sekolah Menengah',
  'Home Health Aide': 'Pembantu Kesihatan Rumah',
  'Home Inspector': 'Pemeriksa Rumah',
  'Hospice Nurse': 'Jururawat Hospis',
  'Hospital Administrator': 'Pentadbir Hospital',
  'Hospital Housekeeper': 'Pembersih Hospital',
  'Hospitality Manager': 'Pengurus Hospitaliti',
  'Host/Hostess': 'Penyambut Tetamu',
  'Hotel Front Desk Agent': 'Pegawai Kaunter Hadapan Hotel',
  'Hotel Manager': 'Pengurus Hotel',
  'House Cleaner': 'Pembersih Rumah',
  'House Painter': 'Tukang Cat Rumah',
  'Housekeeper': 'Pembantu Rumah',
  'Housekeeping Manager': 'Pengurus Pengemasan',
  'Housekeeping Supervisor': 'Penyelia Pengemasan',
  'IT Auditor': 'Juruaudit IT',
  'IT Consultant': 'Perunding IT',
  'IT Coordinator': 'Penyelaras IT',
  'IT Director': 'Pengarah IT',
  'IT Manager': 'Pengurus IT',
  'IT Project Manager': 'Pengurus Projek IT',
  'IT Recruiter': 'Perekrut IT',
  'IT Specialist': 'Pakar IT',
  'IT Support Specialist': 'Pakar Sokongan IT',
  'IT Support Technician': 'Juruteknik Sokongan IT',
  'IT Technician': 'Juruteknik IT',
  'Illustrator': 'Ilustrator',
  'Immigration Lawyer': 'Peguam Imigresen',
  'Immigration Paralegal': 'Pembantu Undang-Undang Imigresen',
  'Implementation Specialist': 'Pakar Pelaksanaan',
  'Industrial Designer': 'Pereka Industri',
  'Industrial Engineer': 'Jurutera Industri',
  'Industrial Maintenance Technician': 'Juruteknik Penyelenggaraan Industri',
  'Information Security Analyst': 'Penganalisis Keselamatan Maklumat',
  'Information Technology Manager': 'Pengurus Teknologi Maklumat',
  'Inside Sales Representative': 'Wakil Jualan Dalaman',
  'Instructional Coach': 'Jurulatih Pengajaran',
  'Instructional Designer': 'Pereka Pengajaran',
  'Insulation Worker': 'Pekerja Penebat',
  'Insurance Agent': 'Ejen Insurans',
  'Insurance Underwriter': 'Penaja Jamin Insurans',
  'Interior Designer': 'Pereka Dalaman',
  'Internal Auditor': 'Juruaudit Dalaman',
  'Intern': 'Pelatih',
  'Interpreter': 'Jurubahasa',
  'Inventory Manager': 'Pengurus Inventori',
  'Investment Analyst': 'Penganalisis Pelaburan',
  'Investment Banker': 'Jurubank Pelaburan',
  'Iron Worker': 'Pekerja Besi',
  'Ironworker': 'Pekerja Besi',
  'Janitor': 'Tukang Cuci',
  'Java Developer': 'Pembangun Java',
  'Java Full Stack Developer': 'Pembangun Java Full Stack',
  'JavaScript Developer': 'Pembangun JavaScript',
  'Jeweler': 'Tukang Emas',
  'Journalist': 'Wartawan',
  'Junior Accountant': 'Akauntan Junior',
  'Junior Developer': 'Pembangun Junior',
  'Juvenile Probation Officer': 'Pegawai Parol Juvana',
  'Kindergarten Teacher': 'Guru Tadika',
  'Kitchen Helper': 'Pembantu Dapur',
  'Kitchen Manager': 'Pengurus Dapur',
  'Lab Assistant': 'Pembantu Makmal',
  'Lab Technician': 'Juruteknik Makmal',
  'Landscape Architect': 'Arkitek Landskap',
  'Landscaper': 'Tukang Landskap',
  'Law Clerk': 'Kerani Undang-Undang',
  'Lawyer': 'Peguam',
  'Lead Teacher': 'Guru Utama',
  'Leasing Consultant': 'Perunding Pajakan',
  'Legal Analyst': 'Penganalisis Undang-Undang',
  'Legal Assistant': 'Pembantu Undang-Undang',
  'Legal Secretary': 'Setiausaha Undang-Undang',
  'Legislative Aide': 'Pembantu Perundangan',
  'Librarian': 'Pustakawan',
  'Library Assistant': 'Pembantu Perpustakaan',
  'Licensed Practical Nurse': 'Jururawat Praktikal Berlesen',
  'Licensed Practical Nurse (LPN)': 'Jururawat Praktikal Berlesen (LPN)',
  'Limousine Driver': 'Pemandu Limosin',
  'Line Cook': 'Tukang Masak Barisan',
  'Litigation Support Specialist': 'Pakar Sokongan Litigasi',
  'Loan Officer': 'Pegawai Pinjaman',
  'Loan Processor': 'Pemproses Pinjaman',
  'Locksmith': 'Tukang Kunci',
  'Logistics Coordinator': 'Penyelaras Logistik',
  'Logistics Manager': 'Pengurus Logistik',
  'Logistics Specialist': 'Pakar Logistik',
  'Long Haul Truck Driver': 'Pemandu Lori Jarak Jauh',
  'Loss Prevention Specialist': 'Pakar Pencegahan Kerugian',
  'MRI Technologist': 'Teknologis MRI',
  'Machine Learning Engineer': 'Jurutera Pembelajaran Mesin',
  'Machine Learning Specialist': 'Pakar Pembelajaran Mesin',
  'Machine Operator': 'Operator Mesin',
  'Maintenance Engineer': 'Jurutera Penyelenggaraan',
  'Maintenance Manager': 'Pengurus Penyelenggaraan',
  'Maintenance Technician': 'Juruteknik Penyelenggaraan',
  'Maintenance Worker': 'Pekerja Penyelenggaraan',
  'Makeup Artist': 'Artis Solekan',
  'Management Consultant': 'Perunding Pengurusan',
  'Manufacturing Engineer': 'Jurutera Pembuatan',
  'Manufacturing Worker': 'Pekerja Pembuatan',
  'Marine Biologist': 'Ahli Biologi Marin',
  'Marine Engineer': 'Jurutera Marin',
  'Market Research Analyst': 'Penganalisis Penyelidikan Pasaran',
  'Marketing Analyst': 'Penganalisis Pemasaran',
  'Marketing Assistant': 'Pembantu Pemasaran',
  'Marketing Coordinator': 'Penyelaras Pemasaran',
  'Marketing Director': 'Pengarah Pemasaran',
  'Marketing Executive': 'Eksekutif Pemasaran',
  'Marketing Intern': 'Pelatih Pemasaran',
  'Marketing Manager': 'Pengurus Pemasaran',
  'Marketing Specialist': 'Pakar Pemasaran',
  'Mason': 'Tukang Batu',
  'Massage Therapist': 'Ahli Terapi Urutan',
  'Material Handler': 'Pengendali Bahan',
  'Materials Manager': 'Pengurus Bahan',
  'Mechanical Design Engineer': 'Jurutera Reka Bentuk Mekanikal',
  'Mechanical Engineer': 'Jurutera Mekanikal',
  'Mechanical Technician': 'Juruteknik Mekanikal',
  'Media Buyer': 'Pembeli Media',
  'Mediator': 'Pengantara',
  'Medical Assistant': 'Pembantu Perubatan',
  'Medical Billing Specialist': 'Pakar Pengebilan Perubatan',
  'Medical Coder': 'Pengekod Perubatan',
  'Medical Device Sales Representative': 'Wakil Jualan Peranti Perubatan',
  'Medical Lab Technician': 'Juruteknik Makmal Perubatan',
  'Medical Office Assistant': 'Pembantu Pejabat Perubatan',
  'Medical Office Manager': 'Pengurus Pejabat Perubatan',
  'Medical Receptionist': 'Penyambut Tetamu Perubatan',
  'Medical Records Clerk': 'Kerani Rekod Perubatan',
  'Medical Representative': 'Wakil Perubatan',
  'Medical Scribe': 'Penulis Rekod Perubatan',
  'Medical Technologist': 'Teknologis Perubatan',
  'Mental Health Counselor': 'Kaunselor Kesihatan Mental',
  'Merchandise Planner': 'Perancang Barangan',
  'Microbiologist': 'Ahli Mikrobiologi',
  'Middle School Teacher': 'Guru Sekolah Menengah Rendah',
  'Midwife': 'Bidan',
  'Military Officer': 'Pegawai Tentera',
  'Millwright': 'Mekanik Industri',
  'Mobile Developer': 'Pembangun Mudah Alih',
  'Mortgage Loan Officer': 'Pegawai Pinjaman Gadai Janji',
  'Mortgage Loan Processor': 'Pemproses Pinjaman Gadai Janji',
  'Motion Graphics Designer': 'Pereka Grafik Gerakan',
  'Moving Company Driver': 'Pemandu Syarikat Pindah Rumah',
  'Museum Curator': 'Kurator Muzium',
  'Music Producer': 'Penerbit Muzik',
  'Music Teacher': 'Guru Muzik',
  'Nanny': 'Pengasuh',
  'Natural Language Processing Engineer': 'Jurutera NLP',
  'Network Administrator': 'Pentadbir Rangkaian',
  'Network Engineer': 'Jurutera Rangkaian',
  'Night Auditor': 'Juruaudit Malam',
  'Node.js Developer': 'Pembangun Node.js',
  'Nuclear Engineer': 'Jurutera Nuklear',
  'Nurse': 'Jururawat',
  'Nurse Manager': 'Pengurus Jururawat',
  'Nurse Practitioner': 'Pengamal Jururawat',
  'Nursing Assistant': 'Pembantu Jururawat',
  'Nutritionist': 'Pakar Pemakanan',
  'Occupational Health Specialist': 'Pakar Kesihatan Pekerjaan',
  'Occupational Therapist': 'Ahli Terapi Pekerjaan',
  'Occupational Therapy Assistant': 'Pembantu Terapi Pekerjaan',
  'Office Administrator': 'Pentadbir Pejabat',
  'Office Assistant': 'Pembantu Pejabat',
  'Office Clerk': 'Kerani Pejabat',
  'Office Manager': 'Pengurus Pejabat',
  'Operations Analyst': 'Penganalisis Operasi',
  'Operations Coordinator': 'Penyelaras Operasi',
  'Operations Director': 'Pengarah Operasi',
  'Operations Manager': 'Pengurus Operasi',
  'Optician': 'Optisyen',
  'Optometrist': 'Pakar Optometri',
  'Oracle Database Administrator': 'Pentadbir Pangkalan Data Oracle',
  'Orthodontist': 'Pakar Ortodontik',
  'Outside Sales Representative': 'Wakil Jualan Luar',
  'Painter': 'Pelukis',
  'Paralegal': 'Pembantu Undang-Undang',
  'Paramedic': 'Paramedik',
  'Park Ranger': 'Renjer Taman',
  'Parking Lot Attendant': 'Petugas Tempat Letak Kereta',
  'Parts Manager': 'Pengurus Alat Ganti',
  'Pastry Chef': 'Chef Pastri',
  'Patient Access Representative': 'Wakil Akses Pesakit',
  'Patient Care Technician': 'Juruteknik Penjagaan Pesakit',
  'Payroll Specialist': 'Pakar Gaji',
  'Pediatrician': 'Pakar Pediatrik',
  'Penetration Tester': 'Penguji Penembusan',
  'Personal Banker': 'Jurubank Peribadi',
  'Personal Trainer': 'Jurulatih Peribadi',
  'Pest Control Technician': 'Juruteknik Kawalan Serangga',
  'Pet Groomer': 'Pakar Dandanan Haiwan Peliharaan',
  'Pet Sitter': 'Penjaga Haiwan Peliharaan',
  'Petroleum Engineer': 'Jurutera Petroleum',
  'Pharmaceutical Sales Representative': 'Wakil Jualan Farmaseutikal',
  'Pharmacist': 'Ahli Farmasi',
  'Pharmacy Assistant': 'Pembantu Farmasi',
  'Pharmacy Tech': 'Juruteknik Farmasi',
  'Pharmacy Technician': 'Juruteknik Farmasi',
  'Phlebotomist': 'Pakar Ambil Darah',
  'Photographer': 'Jurugambar',
  'Physical Therapist': 'Ahli Fisioterapi',
  'Physical Therapy Aide': 'Pembantu Fisioterapi',
  'Physical Therapy Assistant': 'Pembantu Fisioterapi',
  'Physician Assistant': 'Pembantu Perubatan',
  'Pilates Instructor': 'Pengajar Pilates',
  'Pilot': 'Juruterbang',
  'Pipefitter': 'Tukang Paip',
  'Pizza Maker': 'Pembuat Pizza',
  'Plant Manager': 'Pengurus Kilang',
  'Plasterer': 'Tukang Plaster',
  'Platform Engineer': 'Jurutera Platform',
  'Plumber': 'Tukang Paip',
  'Plumbing Engineer': 'Jurutera Paip',
  'Podcast Host': 'Hos Podcast',
  'Police Officer': 'Pegawai Polis',
  'Policy Analyst': 'Penganalisis Dasar',
  'Pool Cleaner': 'Pembersih Kolam Renang',
  'Pool Technician': 'Juruteknik Kolam Renang',
  'Porter': 'Porter',
  'Postal Worker': 'Pekerja Pos',
  'Power BI Developer': 'Pembangun Power BI',
  'Prep Cook': 'Tukang Masak Penyediaan',
  'Preschool Teacher': 'Guru Prasekolah',
  'Pressure Washer': 'Operator Cucian Tekanan',
  'Principal': 'Pengetua',
  'Private Investigator': 'Penyiasat Persendirian',
  'Probation Officer': 'Pegawai Parol',
  'Process Engineer': 'Jurutera Proses',
  'Procurement Manager': 'Pengurus Perolehan',
  'Procurement Specialist': 'Pakar Perolehan',
  'Producer': 'Penerbit',
  'Product Analyst': 'Penganalisis Produk',
  'Product Designer': 'Pereka Produk',
  'Product Manager': 'Pengurus Produk',
  'Product Marketing Manager': 'Pengurus Pemasaran Produk',
  'Product Owner': 'Pemilik Produk',
  'Production Assistant': 'Pembantu Pengeluaran',
  'Production Engineer': 'Jurutera Pengeluaran',
  'Production Manager': 'Pengurus Pengeluaran',
  'Production Planner': 'Perancang Pengeluaran',
  'Production Worker': 'Pekerja Pengeluaran',
  'Program Coordinator': 'Penyelaras Program',
  'Program Manager': 'Pengurus Program',
  'Programmer': 'Pengaturcara',
  'Project Coordinator': 'Penyelaras Projek',
  'Project Engineer': 'Jurutera Projek',
  'Project Manager': 'Pengurus Projek',
  'Prompt Engineer': 'Jurutera Prompt',
  'Property Manager': 'Pengurus Hartanah',
  'Prosthetist': 'Pakar Prostetik',
  'Psychiatric Nurse': 'Jururawat Psikiatri',
  'Psychiatrist': 'Pakar Psikiatri',
  'Psychologist': 'Ahli Psikologi',
  'Public Affairs Specialist': 'Pakar Hal Ehwal Awam',
  'Public Health Inspector': 'Pemeriksa Kesihatan Awam',
  'Public Health Specialist': 'Pakar Kesihatan Awam',
  'Public Relations Coordinator': 'Penyelaras Perhubungan Awam',
  'Public Relations Specialist': 'Pakar Perhubungan Awam',
  'Purchasing Agent': 'Ejen Pembelian',
  'Purchasing Manager': 'Pengurus Pembelian',
  'Python Developer': 'Pembangun Python',
  'QA Analyst': 'Penganalisis QA',
  'QA Engineer': 'Jurutera QA',
  'QA Manager': 'Pengurus QA',
  'QA Tester': 'Penguji QA',
  'Quality Analyst': 'Penganalisis Kualiti',
  'Quality Assurance Inspector': 'Pemeriksa Jaminan Kualiti',
  'Quality Assurance Specialist': 'Pakar Jaminan Kualiti',
  'Quality Control Inspector': 'Pemeriksa Kawalan Kualiti',
  'Quality Engineer': 'Jurutera Kualiti',
  'Quality Manager': 'Pengurus Kualiti',
  'Radiologic Technologist': 'Teknologis Radiologi',
  'React Developer': 'Pembangun React',
  'Reading Specialist': 'Pakar Pembacaan',
  'Real Estate Agent': 'Ejen Hartanah',
  'Real Estate Appraiser': 'Penilai Hartanah',
  'Real Estate Assistant': 'Pembantu Hartanah',
  'Real Estate Attorney': 'Peguam Hartanah',
  'Real Estate Investor': 'Pelabur Hartanah',
  'Receiving Clerk': 'Kerani Penerimaan',
  'Receptionist': 'Penyambut Tetamu',
  'Records Manager': 'Pengurus Rekod',
  'Recreation Coordinator': 'Penyelaras Rekreasi',
  'Recreation Director': 'Pengarah Rekreasi',
  'Recruiter': 'Perekrut',
  'Recruiting Coordinator': 'Penyelaras Perekrutan',
  'Registered Nurse': 'Jururawat Berdaftar',
  'Rehabilitation Counselor': 'Kaunselor Pemulihan',
  'Reliability Engineer': 'Jurutera Kebolehpercayaan',
  'Release Engineer': 'Jurutera Pelepasan',
  'Reporter': 'Wartawan',
  'Research Analyst': 'Penganalisis Penyelidikan',
  'Research Assistant': 'Pembantu Penyelidikan',
  'Research Scientist': 'Saintis Penyelidikan',
  'Reservation Agent': 'Ejen Tempahan',
  'Resident Assistant': 'Pembantu Penghuni',
  'Residential Cleaner': 'Pembersih Kediaman',
  'Residential Counselor': 'Kaunselor Kediaman',
  'Resort Manager': 'Pengurus Resort',
  'Respiratory Therapist': 'Ahli Terapi Respiratori',
  'Restaurant General Manager': 'Pengurus Besar Restoran',
  'Restaurant Manager': 'Pengurus Restoran',
  'Retail Assistant': 'Pembantu Runcit',
  'Retail Associate': 'Pegawai Runcit',
  'Retail Manager': 'Pengurus Runcit',
  'Retail Sales Associate': 'Pegawai Jualan Runcit',
  'Retail Store Manager': 'Pengurus Kedai Runcit',
  'Revenue Manager': 'Pengurus Hasil',
  'Risk Analyst': 'Penganalisis Risiko',
  'Risk Management Specialist': 'Pakar Pengurusan Risiko',
  'Risk Manager': 'Pengurus Risiko',
  'Robotics Engineer': 'Jurutera Robotik',
  'Roofer': 'Tukang Bumbung',
  'Room Attendant': 'Petugas Bilik',
  'Rust Developer': 'Pembangun Rust',
  'SAP Consultant': 'Perunding SAP',
  'SEO Specialist': 'Pakar SEO',
  'SOC Analyst': 'Penganalisis SOC',
  'Safety Coordinator': 'Penyelaras Keselamatan',
  'Safety Manager': 'Pengurus Keselamatan',
  'Sales Assistant': 'Pembantu Jualan',
  'Sales Associate': 'Pegawai Jualan',
  'Sales Consultant': 'Perunding Jualan',
  'Sales Coordinator': 'Penyelaras Jualan',
  'Sales Director': 'Pengarah Jualan',
  'Sales Engineer': 'Jurutera Jualan',
  'Sales Executive': 'Eksekutif Jualan',
  'Sales Manager': 'Pengurus Jualan',
  'Sales Representative': 'Wakil Jualan',
  'Salesforce Administrator': 'Pentadbir Salesforce',
  'Sanitation Worker': 'Pekerja Sanitasi',
  'School Administrator': 'Pentadbir Sekolah',
  'School Counselor': 'Kaunselor Sekolah',
  'School Nurse': 'Jururawat Sekolah',
  'School Principal': 'Pengetua Sekolah',
  'School Psychologist': 'Ahli Psikologi Sekolah',
  'Scrum Master': 'Scrum Master',
  'Seaman': 'Anak Kapal',
  'Security Analyst': 'Penganalisis Keselamatan',
  'Security Engineer': 'Jurutera Keselamatan',
  'Security Guard': 'Pengawal Keselamatan',
  'Security Manager': 'Pengurus Keselamatan',
  'Security Officer': 'Pegawai Keselamatan',
  'Senior Accountant': 'Akauntan Kanan',
  'Server': 'Pelayan',
  'Service Advisor': 'Penasihat Perkhidmatan',
  'Service Crew': 'Kru Perkhidmatan',
  'Set Designer': 'Pereka Set',
  'Sheet Metal Worker': 'Pekerja Kepingan Logam',
  'Shipping & Receiving Clerk': 'Kerani Penghantaran & Penerimaan',
  'Shipping Clerk': 'Kerani Penghantaran',
  'Site Engineer': 'Jurutera Tapak',
  'Site Reliability Engineer': 'Jurutera Kebolehpercayaan Tapak (SRE)',
  'Small Business Owner': 'Pemilik Perniagaan Kecil',
  'Social Media Coordinator': 'Penyelaras Media Sosial',
  'Social Media Manager': 'Pengurus Media Sosial',
  'Social Media Specialist': 'Pakar Media Sosial',
  'Social Worker': 'Pekerja Sosial',
  'Software Architect': 'Arkitek Perisian',
  'Software Developer': 'Pembangun Perisian',
  'Software Engineer': 'Jurutera Perisian',
  'Software Engineering Manager': 'Pengurus Kejuruteraan Perisian',
  'Software Test Engineer': 'Jurutera Ujian Perisian',
  'Software Tester': 'Penguji Perisian',
  'Solar Installer': 'Pemasang Solar',
  'Solution Architect': 'Arkitek Solusi',
  'Solutions Architect': 'Arkitek Solusi',
  'Solutions Engineer': 'Jurutera Solusi',
  'Sommelier': 'Sommelier',
  'Sonographer': 'Sonografer',
  'Sound Engineer': 'Jurutera Bunyi',
  'Sous Chef': 'Sous Chef',
  'Spa Manager': 'Pengurus Spa',
  'Special Education Teacher': 'Guru Pendidikan Khas',
  'Speech Language Pathologist': 'Pakar Patologi Pertuturan',
  'Speech-Language Pathologist': 'Pakar Patologi Pertuturan',
  'Sports Coach': 'Jurulatih Sukan',
  'Stage Manager': 'Pengurus Pentas',
  'Sterile Processing Technician': 'Juruteknik Pemprosesan Steril',
  'Store Associate': 'Pegawai Kedai',
  'Store Manager': 'Pengurus Kedai',
  'Storyboard Artist': 'Artis Papan Cerita',
  'Structural Engineer': 'Jurutera Struktur',
  'Substance Abuse Counselor': 'Kaunselor Penyalahgunaan Bahan',
  'Substitute Teacher': 'Guru Ganti',
  'Supply Chain Analyst': 'Penganalisis Rantaian Bekalan',
  'Supply Chain Manager': 'Pengurus Rantaian Bekalan',
  'Support Worker': 'Pekerja Sokongan',
  'Surgeon': 'Pakar Bedah',
  'Surgical Technologist': 'Teknologis Pembedahan',
  'Survey Researcher': 'Penyelidik Tinjauan',
  'Surveyor': 'Juruukur',
  'Sushi Chef': 'Chef Sushi',
  'Sustainability Coordinator': 'Penyelaras Kelestarian',
  'System Administrator': 'Pentadbir Sistem',
  'System Analyst': 'Penganalisis Sistem',
  'System Engineer': 'Jurutera Sistem',
  'Systems Administrator': 'Pentadbir Sistem',
  'Systems Analyst': 'Penganalisis Sistem',
  'Systems Engineer': 'Jurutera Sistem',
  'TSA Agent': 'Ejen Keselamatan Lapangan Terbang',
  'Talent Acquisition Specialist': 'Pakar Pemerolehan Bakat',
  'Teacher': 'Guru',
  'Teaching Assistant': 'Pembantu Pengajar',
  'Team Leader': 'Ketua Pasukan',
  'Tech Sales Representative': 'Wakil Jualan Teknologi',
  'Technical Program Manager': 'Pengurus Program Teknikal',
  'Technical Recruiter': 'Perekrut Teknikal',
  'Technical Support Specialist': 'Pakar Sokongan Teknikal',
  'Technical Writer': 'Penulis Teknikal',
  'Therapist': 'Ahli Terapi',
  'Title Examiner': 'Pemeriksa Hak Milik',
  'Tour Guide': 'Pemandu Pelancong',
  'Travel Agent': 'Ejen Pelancongan',
  'Truck Driver': 'Pemandu Lori',
  'Tutor': 'Tutor',
  'UI Designer': 'Pereka UI',
  'UX Designer': 'Pereka UX',
  'UX Researcher': 'Penyelidik UX',
  'Ultrasound Technician': 'Juruteknik Ultrabunyi',
  'Valet Attendant': 'Petugas Valet',
  'Veterans Service Officer': 'Pegawai Perkhidmatan Veteran',
  'Veterinary Assistant': 'Pembantu Veterinar',
  'Veterinary Technician': 'Juruteknik Veterinar',
  'Video Editor': 'Editor Video',
  'Videographer': 'Juruvideo',
  'Virtual Assistant': 'Pembantu Maya',
  'Voice Actor': 'Pelakon Suara',
  'Waiter/Waitress': 'Pelayan/Pelayan Wanita',
  'Warehouse Associate': 'Pegawai Gudang',
  'Warehouse Manager': 'Pengurus Gudang',
  'Warehouse Worker': 'Pekerja Gudang',
  'Web Designer': 'Pereka Web',
  'Web Developer': 'Pembangun Web',
  'Welder': 'Jurukimpal',
  'Wellness Coach': 'Jurulatih Kesejahteraan',
  'Wildlife Biologist': 'Ahli Biologi Hidupan Liar',
  'Wind Turbine Technician': 'Juruteknik Turbin Angin',
  'Window Cleaner': 'Pencuci Tingkap',
  'X-Ray Technician': 'Juruteknik X-Ray',
  'Yoga Instructor': 'Pengajar Yoga',
  'Youth Counselor': 'Kaunselor Belia',
  'Zookeeper': 'Penjaga Zoo',
  'iOS Developer': 'Pembangun iOS',
};

// ─── CATEGORIES (English → Malay) ──────────────────────────────────────────

export const CATEGORIES = {
  Technology: 'Teknologi',
  Healthcare: 'Penjagaan Kesihatan',
  Trades: 'Perdagangan & Kemahiran',
  Hospitality: 'Hospitaliti',
  'Food Service': 'Perkhidmatan Makanan',
  Creative: 'Kreatif',
  Education: 'Pendidikan',
  Government: 'Kerajaan',
  Finance: 'Kewangan',
  Marketing: 'Pemasaran',
  Business: 'Perniagaan',
  Engineering: 'Kejuruteraan',
  Sales: 'Jualan',
  Legal: 'Undang-Undang',
  'Real Estate': 'Hartanah',
  HR: 'Sumber Manusia',
  Fitness: 'Kecergasan',
  Management: 'Pengurusan',
  'Animal Care': 'Penjagaan Haiwan',
  Logistics: 'Logistik',
  'Customer Service': 'Perkhidmatan Pelanggan',
  Administrative: 'Pentadbiran',
  Transportation: 'Pengangkutan',
  Retail: 'Runcit',
  Cleaning: 'Pembersihan',
  'Social Services': 'Perkhidmatan Sosial',
  Manufacturing: 'Pembuatan',
  Construction: 'Pembinaan',
  Security: 'Keselamatan',
  Science: 'Sains',
  Events: 'Acara',
  'Writing & Content': 'Penulisan & Kandungan',
  'Supply Chain': 'Rantaian Bekalan',
  Research: 'Penyelidikan',
  Insurance: 'Insurans',
  Consulting: 'Perundingan',
  Aviation: 'Penerbangan',
  Automotive: 'Automotif',
  Media: 'Media',
  Maritime: 'Maritim',
  'Law Enforcement': 'Penguatkuasaan Undang-Undang',
  'Entry-Level': 'Peringkat Permulaan',
  Entertainment: 'Hiburan',
  Childcare: 'Penjagaan Kanak-Kanak',
  Beauty: 'Kecantikan',
  Architecture: 'Seni Bina',
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

export { normalizeCategory };

// ─── CATEGORY OPENERS ───────────────────────────────────────────────────────

const CATEGORY_OPENERS = {
  Technology: (job) => `Resume ${job} yang berkesan bukan sekadar menyenaraikan kemahiran teknikal — ia perlu menunjukkan keupayaan menyelesaikan masalah dan sumbangan kepada perniagaan. Tonjolkan pencapaian projek dengan angka konkrit bersama kepakaran teknikal anda untuk meyakinkan majikan bahawa anda calon yang tepat.`,
  Healthcare: (job) => `Pengurus pengambilan pekerja dalam bidang kesihatan mencari calon yang menggabungkan kecekapan klinikal dengan keprihatinan tulen terhadap pesakit. Resume ${job} anda harus menunjukkan keseimbangan antara kemahiran profesional dan sifat kemanusiaan — ini adalah kunci untuk melepasi saringan dokumen.`,
  Finance: (job) => `Pengurus pengambilan pekerja dalam sektor kewangan mahukan calon yang mampu menukar data kompleks menjadi keputusan strategik. Resume ${job} anda harus menunjukkan kemahiran analisis, ketelitian, dan pertimbangan kewangan yang tepat melalui pencapaian yang boleh diukur.`,
  Education: (job) => `Institusi pendidikan mencari calon yang boleh membangkitkan semangat belajar dan memenuhi keperluan pelajar yang pelbagai. Resume ${job} anda harus memaparkan kepakaran pedagogi dan sumbangan nyata kepada kejayaan pelajar.`,
  'Food Service': (job) => `Pengurus pengambilan pekerja dalam industri makanan dan minuman mementingkan kebolehpercayaan, kerja berpasukan, dan semangat kerja. Resume ${job} anda perlu menunjukkan kemahiran masakan atau perkhidmatan serta keupayaan memberikan prestasi konsisten dalam persekitaran yang sibuk.`,
  Hospitality: (job) => `Industri hospitaliti memerlukan personaliti yang mesra, perhatian terhadap butiran, dan keupayaan mengendalikan tekanan dengan anggun. Resume ${job} anda harus menonjolkan semangat perkhidmatan dan kebolehan memberikan pengalaman yang tidak dapat dilupakan kepada tetamu.`,
  Trades: (job) => `Pengurus pengambilan pekerja dalam bidang kemahiran menghargai juruteknik yang boleh bekerja secara bebas dan menghasilkan kerja berkualiti tinggi. Resume ${job} anda perlu menonjolkan pengalaman praktikal, kesedaran keselamatan, dan keupayaan menyelesaikan masalah di tapak kerja.`,
  Creative: (job) => `Profesional kreatif yang cemerlang menggabungkan kecemerlangan artistik dengan pemahaman mendalam terhadap keperluan pelanggan. Resume ${job} anda harus menunjukkan visi kreatif sambil juga menonjolkan kepekaan perniagaan dan keupayaan memenuhi tarikh akhir.`,
  Administrative: (job) => `Pengurus pengambilan pekerja untuk jawatan pentadbiran mencari individu yang proaktif, mampu menjangka keperluan, dan menjaga kerahsiaan. Resume ${job} anda perlu menunjukkan kemahiran organisasi dan sumbangan kepada peningkatan kecekapan operasi.`,
  Sales: (job) => `Resume anda adalah pembentangan jualan pertama anda, dan pengurus pengambilan pekerja menilainya dengan cara itu. Resume ${job} yang paling berkesan menunjukkan pemahaman tentang cabaran perniagaan majikan dan keupayaan menyumbang kepada pencapaian sasaran jualan.`,
  Marketing: (job) => `Pemasaran adalah bidang yang berubah pantas, dan pengurus pengambilan pekerja mencari calon yang mahir dalam strategi dan pelaksanaan. Resume ${job} anda harus menunjukkan kreativiti strategik dan keupayaan menghasilkan keputusan yang boleh diukur.`,
  HR: (job) => `Peranan sumber manusia memerlukan pemahaman dinamik organisasi sambil menghasilkan keputusan perniagaan yang nyata. Resume ${job} anda harus memaparkan pencapaian dalam pengurusan bakat dan sumbangan organisasi.`,
  'Customer Service': (job) => `Jawatan perkhidmatan pelanggan memerlukan kemahiran komunikasi yang cemerlang dan empati yang tulen. Resume ${job} anda perlu menunjukkan keupayaan menyelesaikan masalah dengan berkesan sambil mengekalkan hubungan baik dengan pelanggan.`,
  Retail: (job) => `Pengurus pengambilan pekerja runcit mementingkan kebolehpercayaan, pengetahuan produk, dan keghairahan tulen terhadap perkhidmatan pelanggan. Resume ${job} anda harus menunjukkan prestasi jualan dan keupayaan cemerlang dalam persekitaran yang dinamik.`,
  Logistics: (job) => `Pengurus pengambilan pekerja dalam bidang logistik mementingkan kecekapan, ketepatan, dan keupayaan mengurus tugas yang sensitif masa. Resume ${job} anda perlu menunjukkan pengalaman pengurusan inventori, perancangan, dan pengoptimuman proses secara konkrit.`,
  Government: (job) => `Pengambilan pekerja sektor kerajaan memerlukan pendekatan yang berbeza daripada sektor swasta. Resume ${job} anda perlu memenuhi keperluan jawatan secara langsung sambil menunjukkan komitmen terhadap perkhidmatan awam.`,
  Legal: (job) => `Bidang undang-undang menuntut ketepatan mutlak dan perhatian yang teliti terhadap butiran. Resume ${job} anda harus mencerminkan ketegasan intelektual, pemahaman mendalam terhadap undang-undang, dan keupayaan mengendalikan kes yang kompleks.`,
  default: (job) => `Resume ${job} yang berkesan memberi tumpuan kepada pencapaian konkrit yang menunjukkan keupayaan anda memberikan impak dari hari pertama. Gabungkan pengalaman berkaitan dengan semangat tulen terhadap jawatan tersebut.`,
};

// ─── TAGS GENERATOR ─────────────────────────────────────────────────────────

export function generateTags(jobTitle, slug) {
  return [
    `contoh resume ${jobTitle}`,
    `resume ${jobTitle}`,
    `template resume ${jobTitle}`,
    `cara buat resume ${jobTitle}`,
    `contoh resume`,
    `resume template`,
    `resume kerja`,
    `template resume percuma`,
  ];
}

// ─── FAQ GENERATOR ──────────────────────────────────────────────────────────

export function generateFAQ(jobTitle) {
  return [
    {
      question: `Apakah kemahiran yang perlu disenaraikan dalam resume ${jobTitle}?`,
      answer: `Senaraikan kemahiran teknikal yang berkaitan langsung dengan jawatan ${jobTitle} serta kemahiran umum seperti komunikasi dan kerja berpasukan. Gunakan kata kunci daripada iklan jawatan dan sokong setiap kemahiran dengan pencapaian yang konkrit.`,
    },
    {
      question: `Berapakah panjang ideal resume ${jobTitle}?`,
      answer: `Resume ${jobTitle} sepatutnya 1-2 halaman untuk calon dengan pengalaman terhad, dan 2-3 halaman untuk mereka yang mempunyai pengalaman lebih 10 tahun. Utamakan kualiti kandungan dan pastikan setiap maklumat memberikan nilai.`,
    },
    {
      question: `Format apa yang sesuai untuk resume ${jobTitle}?`,
      answer: `Resume ${jobTitle} disarankan menggunakan format standard yang bersih dan serasi ATS. Format kronologi terbalik (pengalaman terkini dahulu) adalah paling berkesan. Bahagikan dengan jelas antara maklumat peribadi, ringkasan profesional, pengalaman kerja, pendidikan, dan sijil.`,
    },
    {
      question: `Berapakah gaji ${jobTitle}?`,
      answer: `Gaji ${jobTitle} berbeza bergantung kepada pengalaman, lokasi kerja, dan saiz syarikat. Semak data gaji terkini di Glassdoor, PayScale, dan JobStreet Malaysia. Menyertakan pencapaian yang boleh diukur dalam resume membantu dalam rundingan gaji.`,
    },
    {
      question: `Apa yang perlu dimasukkan dalam resume ${jobTitle}?`,
      answer: `Resume ${jobTitle} harus mengandungi maklumat peribadi, ringkasan profesional, pengalaman kerja dengan pencapaian yang boleh diukur, pendidikan, sijil berkaitan, dan kemahiran utama. Sesuaikan setiap bahagian mengikut keperluan jawatan yang dipohon.`,
    },
  ];
}

// ─── BODY GENERATOR ─────────────────────────────────────────────────────────

export function generateBody(jobTitle, category, keySkills, avgSalary, jobGrowth, slug) {
  const skills = keySkills || [];
  const topSkills = skills.slice(0, 3).join(', ') || 'kemahiran profesional';
  const midSkills = skills.slice(3, 6).join(', ') || 'kemahiran aplikasi';
  const softSkills = skills.slice(6, 8).join(', ') || 'kerja berpasukan, komunikasi';

  const norm = normalizeCategory(category);
  const opener = (CATEGORY_OPENERS[norm] || CATEGORY_OPENERS.default)(jobTitle);

  return `
## Perkara Utama yang Membezakan Resume ${jobTitle}

${opener}

Pengurus pengambilan pekerja mengambil masa purata 6-7 saat untuk menyemak resume. Untuk jawatan ${jobTitle}, kemahiran yang paling berkaitan dan pencapaian utama perlu segera menarik perhatian. Resume yang baik bukan sekadar senarai pengalaman — ia menceritakan kisah kerjaya anda dan menunjukkan nilai yang anda bawa kepada organisasi.

## Contoh Ringkasan Profesional

### Peringkat Permulaan

Calon ${jobTitle} yang bermotivasi tinggi dengan asas kukuh dalam ${topSkills || 'bidang profesional'}. Bersemangat untuk menyumbang dalam pasukan yang dinamik dan mengaplikasikan pengetahuan akademik dalam persekitaran kerja sebenar. Kelebihan utama termasuk kebolehan belajar dengan cepat, kemahiran organisasi yang cemerlang, dan tekad kuat untuk mencapai matlamat.

### Pengalaman 3-7 Tahun (Pertengahan)

${jobTitle} dengan lebih 5 tahun pengalaman praktikal dalam ${topSkills}. Rekod prestasi yang terbukti dalam penambahbaikan proses dan penyiapan projek dalam tempoh dan belanjawan yang ditetapkan. Mahir dalam ${midSkills || 'kemahiran lanjutan'}, dengan pengalaman luas dalam membimbing kakitangan junior dan memacu inisiatif penambahbaikan berterusan.

### Kanan / Pengurusan

${jobTitle} kanan dengan lebih 10 tahun pengalaman industri. Diiktiraf sebagai pakar dalam bidang ${topSkills} dan ${midSkills || 'pengurusan strategik'}. Memimpin pasukan pelbagai jabatan melebihi 15 orang dan mengetuai projek strategik yang menghasilkan penjimatan kos melebihi RM1 juta. Cemerlang dalam ${softSkills || 'kepimpinan dan visi strategik'}, dengan rekod pencapaian yang konsisten melebihi sasaran.

## Gaji & Tinjauan Pekerjaan

Purata gaji ${jobTitle} adalah sekitar **${avgSalary || '$50,000'}**, yang berbeza mengikut pengalaman, lokasi kerja, dan industri. Pertumbuhan pekerjaan untuk jawatan ini dijangka **${jobGrowth || '+5%'}** dalam beberapa tahun akan datang.

Gaji permulaan biasanya 70-80% daripada nilai median, manakala profesional kanan dan pakar boleh menjangkakan pampasan 40-60% lebih tinggi daripada median. Bandar-bandar besar dan industri yang mempunyai permintaan tinggi biasanya menawarkan pampasan yang lebih baik.

**Sumber rujukan:**
- [Biro Statistik Buruh AS (BLS)](https://www.bls.gov/ooh/) — Data rasmi pekerjaan dan gaji
- [Glassdoor](https://www.glassdoor.com/Salaries/) — Data gaji daripada laporan pekerja
- [PayScale](https://www.payscale.com/research/US/) — Penyelidikan dan perbandingan gaji mengikut jawatan

*Pampasan sebenar berbeza mengikut pengalaman, lokasi kerja, industri, dan saiz syarikat.*

## Kemahiran Penting untuk Ditonjolkan

### Kemahiran Teknikal & Profesional
${skills.slice(0, 3).map(s => `- **${s}** — Kemahiran penting untuk ${jobTitle}, menjadi tumpuan pengurus pengambilan pekerja dan sistem ATS`).join('\n') || '- Kemahiran dalam alatan dan teknologi khusus jawatan\n- Pemahaman mendalam tentang metodologi dan proses industri\n- Kecekapan perisian profesional'}

### Kemahiran Organisasi & Kerja
${skills.slice(3, 6).map(s => `- **${s}** — Kemahiran penting dalam tugas harian ${jobTitle}`).join('\n') || '- Pengurusan masa dan penetapan keutamaan\n- Perancangan dan pengurusan projek\n- Ketepatan dalam pematuhan prosedur'}

### Kemahiran Interpersonal
${skills.slice(6, 8).map(s => `- **${s}** — Kemahiran interpersonal yang penting untuk berjaya sebagai ${jobTitle}`).join('\n') || '- Komunikasi lisan dan bertulis\n- Kerja berpasukan dan kolaborasi'}
- Kebolehsuaian dan prestasi di bawah tekanan
- Penyelesaian konflik dan kemahiran rundingan

## Cara Menulis Pencapaian yang Berkesan

Rujuk contoh berikut dan gunakan angka konkrit untuk menyatakan pencapaian anda:

- Mengoptimumkan proses ${topSkills || 'kemahiran utama'} yang meningkatkan kecekapan kerja sebanyak **25%** dan menghasilkan penjimatan kos yang ketara
- Mengurus **lebih 12 projek** secara serentak, mencapai kadar pematuhan tarikh akhir 98% dan melampaui sasaran pasukan
- Bertanggungjawab melatih dan membimbing **8 kakitangan baharu**, mengurangkan tempoh orientasi sebanyak 40%
- Melaksanakan sistem baharu berkaitan ${skills[0] || 'pengurusan'} yang mengurangkan kadar ralat sebanyak **35%** dan meningkatkan kepuasan pelanggan
- Membangunkan strategi ${skills[1] || 'pembangunan'} inovatif yang meningkatkan hasil suku tahunan sebanyak **20%**
- Mencapai kadar kepuasan pelanggan **95%** melalui penambahbaikan berterusan berdasarkan maklum balas pengguna

## Format & Tip Template Resume ${jobTitle}

1. **Gunakan format kronologi terbalik** — Senaraikan pengalaman terkini dahulu. Ini adalah format yang paling disukai oleh pengurus pengambilan pekerja dan sistem ATS untuk jawatan ${jobTitle}.
2. **Sesuaikan ringkasan profesional untuk setiap permohonan** — Masukkan kata kunci daripada iklan jawatan dan tunjukkan pemahaman anda tentang cabaran unik jawatan tersebut.
3. **Kuantifikasi pencapaian anda** — Angka menarik perhatian pengurus pengambilan pekerja dan menunjukkan sumbangan anda secara konkrit. "Meningkatkan jualan 30%" lebih berkesan daripada "Menyumbang kepada peningkatan jualan".
4. **Pastikan susun atur yang kemas** — Margin 2.5cm, saiz fon 10-12pt, dan tajuk yang jelas untuk membahagikan setiap seksyen.
5. **Senaraikan sijil dan latihan berkaitan** — Untuk jawatan ${jobTitle}, sijil profesional dan pembelajaran berterusan menunjukkan komitmen terhadap peningkatan kemahiran.

## Tip Pengurus Pengambilan Pekerja

> **Kesilapan paling lazim dalam resume ${jobTitle} adalah ketiadaan pencapaian yang boleh diukur.** Ramai calon hanya menerangkan tugasan harian tanpa menunjukkan kesan kerja mereka.

Apabila mengambil pekerja untuk jawatan ${jobTitle}, saya mencari bukti konkrit pencapaian. Calon yang menulis "Memimpin pasukan 5 orang untuk mencapai 115% sasaran selama 4 suku berturut-turut" mendapat penilaian jauh lebih tinggi daripada "Mengurus pasukan 5 orang". Setiap perkara dalam pengalaman kerja anda harus menjawab soalan "Apakah pencapaian yang boleh diukur yang saya hasilkan?"

Selain itu, penting untuk menggunakan istilah yang sesuai dengan industri yang anda pohon. Pengurus pengambilan pekerja yang berpengalaman dalam bidang ${category.toLowerCase()} akan segera mengenali resume yang tidak disesuaikan dan menggunakan ungkapan generik.

## Soalan Temuduga Lazim ${jobTitle}

### Ceritakan tentang projek kompleks yang anda kendalikan sebagai ${jobTitle}

Pengurus pengambilan pekerja menilai keupayaan anda menangani situasi yang kompleks. Gunakan kaedah STAR (Situasi, Tugasan, Tindakan, Keputusan) untuk menyusun jawapan anda, dan terangkan latar belakang, peranan khusus anda, tindakan yang diambil, dan keputusan yang boleh diukur.

### Bagaimana anda menangani tekanan atau tarikh akhir yang ketat sebagai ${jobTitle}?

Tunjukkan keupayaan menetapkan keutamaan dan mengekalkan prestasi di bawah tekanan. Berikan contoh konkrit di mana keutamaan bertentangan, jelaskan pendekatan sistematik anda, dan kongsikan keputusan positif yang dicapai.

### Apakah kekuatan teknikal anda yang paling berkaitan dengan ${jobTitle}?

Ini peluang terbaik untuk menonjolkan kepakaran anda dalam ${topSkills || 'kemahiran utama'}. Jangan sekadar menyenaraikan kemahiran — sokong dengan contoh aplikasi konkrit dan pencapaian yang dihasilkan.

### Bagaimana anda mengikuti perkembangan terkini dalam industri?

Pengurus pengambilan pekerja ingin melihat pelaburan berterusan dalam pembangunan profesional. Nyatakan latihan terkini yang diikuti, sijil yang diperoleh, persidangan yang dihadiri, jurnal profesional yang dilanggan, dan komuniti yang anda sertai secara aktif.

### Di mana anda melihat kerjaya ${jobTitle} anda dalam 5 tahun akan datang?

Tunjukkan bahawa anda mempunyai visi kerjaya yang jelas. Kemukakan matlamat realistik yang selaras dengan peluang pertumbuhan organisasi dan tunjukkan komitmen jangka panjang dalam industri.

## Kesilapan Lazim dan Cara Mengatasinya

### 1. Menggunakan resume yang sama untuk semua permohonan

Menghantar resume yang sama untuk setiap iklan jawatan memberikan kesan negatif. Sistem ATS dan pengurus pengambilan pekerja akan segera mengenal pasti resume yang tidak disesuaikan. Sesuaikan ringkasan profesional dan kata kunci untuk setiap jawatan ${jobTitle} yang dipohon.

### 2. Menerangkan tugas tanpa menunjukkan pencapaian

Menyenaraikan tugas harian tidak menarik perhatian pengurus pengambilan pekerja. Tukar setiap perkara kepada pencapaian yang boleh diukur. Gantikan "Bertanggungjawab melayan pelanggan" dengan "Melayan purata 85 pelanggan sehari dengan kadar penyelesaian pertama 92%".

### 3. Mengabaikan pengoptimuman ATS

Ramai calon ${jobTitle} terlepas peluang kerana gagal melepasi saringan automatik. Elakkan jadual kompleks, header/footer, dan grafik kerana sistem ATS tidak dapat membacanya dengan betul.

### 4. Memasukkan maklumat lama atau tidak berkaitan

Pengalaman lebih 15 tahun lalu atau kerjaya yang tidak berkaitan dengan jawatan ${jobTitle} hanya memanjangkan resume tanpa menambah nilai. Fokus pada pengalaman berkaitan dalam tempoh 10 tahun terkini.

### 5. Tidak menggunakan kata kunci khusus industri

Setiap industri mempunyai terminologi sendiri. Resume ${jobTitle} tanpa istilah khusus industri seperti ${topSkills || 'terminologi profesional'} akan memberi kesan kurang profesional kepada pengurus pengambilan pekerja.

## Pengoptimuman ATS untuk Resume ${jobTitle}

ATS (Applicant Tracking System) adalah sistem penapisan yang menyaring calon sebelum pengurus pengambilan pekerja menyemak resume. Untuk melepasi saringan dokumen sebagai ${jobTitle}:

- **Gunakan kata kunci tepat daripada iklan jawatan** — Jika iklan menyebut "${skills[0] || 'kemahiran tertentu'}", masukkan ungkapan yang sama dalam resume anda
- **Gunakan format yang ringkas dan mudah dibaca** — Elakkan susun atur berbilang lajur, jadual, dan kotak teks kerana ia mengelirukan parser ATS
- **Letakkan kemahiran penting di pelbagai bahagian** — Masukkan ${topSkills || 'kemahiran utama'} dalam ringkasan profesional, pengalaman kerja, dan bahagian kemahiran
- **Hantar dalam format PDF atau DOCX** — Format yang paling disokong oleh sistem ATS moden
- **Sertakan singkatan dan nama penuh** — Contoh: "Pengurusan Hubungan Pelanggan (CRM)" untuk meliputi variasi carian
- **Jangan gunakan header dan footer** — Sesetengah ATS tidak dapat membaca kandungan dalam kawasan ini

## Sumber Berkaitan

Lengkapkan dokumen permohonan ${jobTitle} anda:

- [Semak Resume dengan Penyemak ATS](/ms/tools/ats-checker) — Uji resume anda dengan alat analisis ATS percuma
- [Koleksi Contoh Resume Profesional](/ms/resume-examples) — Lihat ratusan template resume mengikut industri
- [Template Resume Optimum ATS](/ms/templates) — Template yang dioptimumkan untuk melepasi saringan automatik

Ingin membuat resume ${jobTitle} yang profesional dan dioptimumkan untuk ATS? Gunakan [alat pembuat resume percuma](/ms/builder) kami untuk mencipta resume yang mengagumkan dalam beberapa minit. Template kami dioptimumkan untuk ATS dan membimbing anda langkah demi langkah dalam menulis setiap bahagian.
`;
}
