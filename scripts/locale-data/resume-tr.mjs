/**
 * Turkish (tr) locale data for resume example generation.
 * Imported by generate-locale-resume-examples.mjs via:
 *   await import('./locale-data/resume-tr.mjs')
 *
 * Keywords sourced from seo/turkish-top-300-keywords.csv
 * Top terms: cv hazırlama (500K), cv örneği (50K), özgeçmiş örneği (50K),
 * cv şablonu (5K), profesyonel cv (5K), ats uyumlu cv (500)
 */

const LANG = 'tr';

// ─── CONFIG ─────────────────────────────────────────────────────────────────

export const CONFIG = {
  author: 'Elif Yılmaz',
  authorBio: 'Kariyer danışmanı ve CV yazım uzmanı. 10 yılı aşkın deneyimiyle Türkiye\'deki profesyonellerin hayallerindeki işi bulmalarına yardımcı oluyor.',
  titlePattern: (job) => `${job} CV Örneği: Şablonlar ve Yazım Kılavuzu 2026`,
  descriptionPattern: (job) => `${job.toLowerCase()} cv örneği ile ATS uyumlu şablonlar ve uzman ipuçları. Profesyonel cv hazırlama rehberi ile 2026 yılında mülakat kapısını aralayın.`,
  imageAltPattern: (job) => `${job} CV Örneği`,
};

// ─── JOB TITLES (English → Turkish) ─────────────────────────────────────────

export const JOB_TITLES = {
  '3D Artist': '3D Sanatçı',
  'AI Engineer': 'Yapay Zeka Mühendisi',
  'AWS Cloud Engineer': 'AWS Bulut Mühendisi',
  'AWS Solution Architect': 'AWS Çözüm Mimarı',
  'Academic Advisor': 'Akademik Danışman',
  'Account Executive': 'Müşteri İlişkileri Yöneticisi',
  'Account Manager': 'Hesap Yöneticisi',
  'Accountant': 'Muhasebeci',
  'Accounting Assistant': 'Muhasebe Asistanı',
  'Accounting Clerk': 'Muhasebe Memuru',
  'Accounting Intern': 'Muhasebe Stajyeri',
  'Accounts Payable Specialist': 'Borç Hesapları Uzmanı',
  'Accounts Receivable Specialist': 'Alacak Hesapları Uzmanı',
  'Administrative Assistant': 'İdari Asistan',
  'Android Developer': 'Android Geliştirici',
  'Animal Control Officer': 'Hayvan Kontrol Memuru',
  'Animal Shelter Worker': 'Hayvan Barınağı Çalışanı',
  'Animator': 'Animatör',
  'Appliance Repair Technician': 'Beyaz Eşya Tamir Teknisyeni',
  'Aquarium Keeper': 'Akvaryum Bakıcısı',
  'Arbitrator': 'Hakem',
  'Architect': 'Mimar',
  'Art Director': 'Sanat Yönetmeni',
  'Assistant Director': 'Müdür Yardımcısı',
  'Assistant Manager': 'Müdür Yardımcısı',
  'Assistant Property Manager': 'Gayrimenkul Yönetici Yardımcısı',
  'Assistant Store Manager': 'Mağaza Müdür Yardımcısı',
  'Athletic Trainer': 'Atletizm Antrenörü',
  'Audio Engineer': 'Ses Mühendisi',
  'Auditor': 'Denetçi',
  'Auto Mechanic': 'Oto Tamircisi',
  'Automation Engineer': 'Otomasyon Mühendisi',
  'Automotive Technician': 'Otomotiv Teknisyeni',
  'Backend Developer': 'Backend Geliştirici',
  'Baker': 'Fırıncı',
  'Bank Manager': 'Banka Müdürü',
  'Bank Teller': 'Banka Veznedarı',
  'Banquet Chef': 'Ziyafet Şefi',
  'Barista': 'Barista',
  'Bartender': 'Barmen',
  'Bellhop': 'Otel Taşıyıcısı',
  'Billing Specialist': 'Faturalandırma Uzmanı',
  'Blockchain Developer': 'Blockchain Geliştirici',
  'Branch Manager': 'Şube Müdürü',
  'Brand Designer': 'Marka Tasarımcısı',
  'Budget Analyst': 'Bütçe Analisti',
  'Building Inspector': 'Bina Denetçisi',
  'Building Maintenance Technician': 'Bina Bakım Teknisyeni',
  'Bus Driver': 'Otobüs Şoförü',
  'Business Administration Professional': 'İşletme Yönetimi Uzmanı',
  'Business Analyst': 'İş Analisti',
  'Business Consultant': 'İş Danışmanı',
  'Business Development Executive': 'İş Geliştirme Yöneticisi',
  'Business Development Manager': 'İş Geliştirme Müdürü',
  'Business Intelligence Analyst': 'İş Zekası Analisti',
  'Business Intelligence Specialist': 'İş Zekası Uzmanı',
  'Business Manager': 'İşletme Müdürü',
  'Business Owner': 'İşletme Sahibi',
  'Busser': 'Garson Yardımcısı',
  'CNC Machinist': 'CNC Operatörü',
  'CNC Operator': 'CNC Operatörü',
  'Cabin Crew': 'Kabin Ekibi',
  'Cabinet Maker': 'Doğramacı',
  'Cafeteria Worker': 'Kafeterya Çalışanı',
  'Call Center Agent': 'Çağrı Merkezi Temsilcisi',
  'Call Center Representative': 'Çağrı Merkezi Temsilcisi',
  'Car Sales Associate': 'Otomobil Satış Danışmanı',
  'Caregiver': 'Bakıcı',
  'Carpenter': 'Marangoz',
  'Carpet Cleaner': 'Halı Temizlikçisi',
  'Case Manager': 'Vaka Yöneticisi',
  'Cashier': 'Kasiyer',
  'Casino Dealer': 'Krupiye',
  'Caterer': 'Catering Hizmetlisi',
  'Catering Manager': 'Catering Müdürü',
  'Certified Nursing Assistant': 'Sertifikalı Hemşire Yardımcısı',
  'Certified Nursing Assistant (CNA)': 'Sertifikalı Hemşire Yardımcısı (CNA)',
  'Change Management Specialist': 'Değişim Yönetimi Uzmanı',
  'Chef': 'Şef Aşçı',
  'Chemical Engineer': 'Kimya Mühendisi',
  'Chemist': 'Kimyager',
  'Chief Information Officer (CIO)': 'Bilgi İşlem Direktörü (CIO)',
  'Chief of Staff': 'Genel Sekreter',
  'Chiropractor': 'Kayropraktör',
  'City Planner': 'Şehir Plancısı',
  'Civil Engineer': 'İnşaat Mühendisi',
  'Claims Adjuster': 'Hasar Ekspertizi Uzmanı',
  'Client Relations Manager': 'Müşteri İlişkileri Müdürü',
  'Clinical Research Associate': 'Klinik Araştırma Uzmanı',
  'Clinical Research Coordinator': 'Klinik Araştırma Koordinatörü',
  'Cloud Architect': 'Bulut Mimarı',
  'Cloud Engineer': 'Bulut Mühendisi',
  'Code Enforcement Officer': 'İmar Denetim Memuru',
  'College Admissions Counselor': 'Üniversite Kabul Danışmanı',
  'College Professor': 'Üniversite Profesörü',
  'Commercial Cleaner': 'Ticari Temizlik Görevlisi',
  'Commercial Real Estate Broker': 'Ticari Gayrimenkul Danışmanı',
  'Community Manager': 'Topluluk Yöneticisi',
  'Community Outreach Coordinator': 'Toplum İlişkileri Koordinatörü',
  'Complaints Handler': 'Şikayet Yönetim Uzmanı',
  'Compliance Officer': 'Uyum Sorumlusu',
  'Computer Operator': 'Bilgisayar Operatörü',
  'Computer Science Professional': 'Bilgisayar Bilimi Uzmanı',
  'Computer Technician': 'Bilgisayar Teknisyeni',
  'Concierge': 'Resepsiyon Görevlisi',
  'Concrete Finisher': 'Beton İşçisi',
  'Construction Manager': 'İnşaat Müdürü',
  'Construction Superintendent': 'Şantiye Şefi',
  'Construction Worker': 'İnşaat İşçisi',
  'Consultant': 'Danışman',
  'Content Creator': 'İçerik Üreticisi',
  'Content Writer': 'İçerik Yazarı',
  'Contract Specialist': 'Sözleşme Uzmanı',
  'Contracts Specialist': 'Sözleşme Uzmanı',
  'Controller': 'Mali Kontrolör',
  'Copywriter': 'Metin Yazarı',
  'Corporate Security Manager': 'Kurumsal Güvenlik Müdürü',
  'Correctional Officer': 'Cezaevi Memuru',
  'Court Clerk': 'Mahkeme Katibi',
  'Court Reporter': 'Mahkeme Stenografı',
  'Creative Director': 'Kreatif Direktör',
  'Crisis Counselor': 'Kriz Danışmanı',
  'Cruise Ship Worker': 'Kruvaziyer Çalışanı',
  'Curriculum Developer': 'Müfredat Geliştirme Uzmanı',
  'Customer Experience Specialist': 'Müşteri Deneyimi Uzmanı',
  'Customer Service Representative': 'Müşteri Hizmetleri Temsilcisi',
  'Customer Success Manager': 'Müşteri Başarı Yöneticisi',
  'Customer Success Specialist': 'Müşteri Başarı Uzmanı',
  'Customer Support Specialist': 'Müşteri Destek Uzmanı',
  'Customs Officer': 'Gümrük Memuru',
  'Cybersecurity Analyst': 'Siber Güvenlik Analisti',
  'Data Analyst': 'Veri Analisti',
  'Data Architect': 'Veri Mimarı',
  'Data Engineer': 'Veri Mühendisi',
  'Data Entry Clerk': 'Veri Giriş Elemanı',
  'Data Entry Operator': 'Veri Giriş Operatörü',
  'Data Entry Specialist': 'Veri Giriş Uzmanı',
  'Data Scientist': 'Veri Bilimci',
  'Database Administrator': 'Veritabanı Yöneticisi',
  'Delivery Driver': 'Kurye',
  'Dental Assistant': 'Diş Hekimi Asistanı',
  'Dental Hygienist': 'Ağız ve Diş Sağlığı Teknisyeni',
  'Dental Office Manager': 'Diş Kliniği Müdürü',
  'Dentist': 'Diş Hekimi',
  'Design Engineer': 'Tasarım Mühendisi',
  'Desktop Support Engineer': 'Masaüstü Destek Mühendisi',
  'Desktop Support Technician': 'Masaüstü Destek Teknisyeni',
  'DevOps Engineer': 'DevOps Mühendisi',
  'Dialysis Technician': 'Diyaliz Teknisyeni',
  'Diesel Mechanic': 'Dizel Motor Tamircisi',
  'Dietary Aide': 'Diyet Asistanı',
  'Dietitian': 'Diyetisyen',
  'Digital Marketer': 'Dijital Pazarlama Uzmanı',
  'Digital Marketing Manager': 'Dijital Pazarlama Müdürü',
  'Digital Marketing Specialist': 'Dijital Pazarlama Uzmanı',
  'Dishwasher': 'Bulaşıkçı',
  'Dispatcher': 'Sevkiyatçı',
  'District Manager': 'Bölge Müdürü',
  'Doctor': 'Doktor',
  'Dog Trainer': 'Köpek Eğitmeni',
  'Driver': 'Şoför',
  'Drywall Installer': 'Alçıpan Ustası',
  'EMT': 'Acil Tıp Teknisyeni',
  'ESL Teacher': 'İngilizce Öğretmeni',
  'Editor': 'Editör',
  'Education Consultant': 'Eğitim Danışmanı',
  'Educational Technologist': 'Eğitim Teknolojisi Uzmanı',
  'Electrical Engineer': 'Elektrik Mühendisi',
  'Electrical Technician': 'Elektrik Teknisyeni',
  'Electrician': 'Elektrikçi',
  'Elementary Teacher': 'İlkokul Öğretmeni',
  'Elevator Technician': 'Asansör Teknisyeni',
  'Embedded Systems Engineer': 'Gömülü Sistemler Mühendisi',
  'Emergency Management Coordinator': 'Acil Durum Yönetim Koordinatörü',
  'Engineering Manager': 'Mühendislik Müdürü',
  'Environmental Compliance Officer': 'Çevre Uyum Sorumlusu',
  'Epidemiologist': 'Epidemiyolog',
  'Escrow Officer': 'Emanet Hesap Sorumlusu',
  'Ethical Hacker': 'Etik Hacker',
  'Event Coordinator': 'Etkinlik Koordinatörü',
  'Event Manager': 'Etkinlik Müdürü',
  'Event Planner': 'Etkinlik Organizatörü',
  'Executive Assistant': 'Üst Düzey Yönetici Asistanı',
  'Executive Chef': 'Baş Aşçı',
  'Executive Director': 'Genel Müdür',
  'Family Services Worker': 'Aile Hizmetleri Uzmanı',
  'Fashion Designer': 'Moda Tasarımcısı',
  'Fast Food Worker': 'Fast Food Çalışanı',
  'Fence Installer': 'Çit Montajcısı',
  'Finance Manager': 'Finans Müdürü',
  'Financial Analyst': 'Finans Analisti',
  'Firefighter': 'İtfaiyeci',
  'Fitness Center Manager': 'Spor Salonu Müdürü',
  'Fitness Instructor': 'Fitness Eğitmeni',
  'Fitness Trainer': 'Fitness Antrenörü',
  'Flight Attendant': 'Kabin Memuru',
  'Floor Installer': 'Döşeme Ustası',
  'Florist': 'Çiçekçi',
  'Food Expeditor': 'Mutfak Koordinatörü',
  'Food Runner': 'Garson Yardımcısı',
  'Food Safety Manager': 'Gıda Güvenliği Müdürü',
  'Food Scientist': 'Gıda Bilimci',
  'Food Server': 'Garson',
  'Food Service Director': 'Yiyecek İçecek Direktörü',
  'Food Service Manager': 'Yiyecek İçecek Müdürü',
  'Food Service Worker': 'Yiyecek İçecek Çalışanı',
  'Food Stylist': 'Yemek Stilisti',
  'Food Truck Operator': 'Seyyar Yemek Aracı İşletmecisi',
  'Freelance Writer': 'Serbest Yazar',
  'Freight Broker': 'Yük Taşımacılığı Komisyoncusu',
  'Front Desk Agent': 'Resepsiyon Görevlisi',
  'Front Desk Receptionist': 'Resepsiyonist',
  'Front End Developer': 'Frontend Geliştirici',
  'Full Stack Developer': 'Full Stack Geliştirici',
  'Game Designer': 'Oyun Tasarımcısı',
  'Game Developer': 'Oyun Geliştirici',
  'Glazier': 'Camcı',
  'Go Developer': 'Go Geliştirici',
  'Grants Manager': 'Hibe Yöneticisi',
  'Graphic Designer': 'Grafik Tasarımcı',
  'Group Fitness Instructor': 'Grup Fitness Eğitmeni',
  'Gym Trainer': 'Spor Salonu Antrenörü',
  'HR Assistant': 'İK Asistanı',
  'HR Business Partner': 'İK İş Ortağı',
  'HR Coordinator': 'İK Koordinatörü',
  'HR Director': 'İnsan Kaynakları Direktörü',
  'HR Executive': 'İK Yöneticisi',
  'HR Manager': 'İnsan Kaynakları Müdürü',
  'HR Recruiter': 'İK İşe Alım Uzmanı',
  'HVAC Technician': 'İklimlendirme Teknisyeni',
  'Head Cook': 'Baş Aşçı',
  'Health Coach': 'Sağlık Koçu',
  'Health Inspector': 'Sağlık Denetçisi',
  'Heavy Equipment Operator': 'Ağır İş Makinesi Operatörü',
  'Help Desk Technician': 'Help Desk Teknisyeni',
  'High School Teacher': 'Lise Öğretmeni',
  'Home Health Aide': 'Evde Bakım Yardımcısı',
  'Home Inspector': 'Konut Denetçisi',
  'Hospice Nurse': 'Palyatif Bakım Hemşiresi',
  'Hospital Housekeeper': 'Hastane Temizlik Görevlisi',
  'Hotel Front Desk Agent': 'Otel Resepsiyon Görevlisi',
  'Hotel Manager': 'Otel Müdürü',
  'House Cleaner': 'Ev Temizlikçisi',
  'Housekeeper': 'Kat Görevlisi',
  'Housekeeping Supervisor': 'Kat Hizmetleri Sorumlusu',
  'IT Director': 'Bilgi İşlem Direktörü',
  'IT Manager': 'Bilgi İşlem Müdürü',
  'IT Recruiter': 'IT İşe Alım Uzmanı',
  'IT Specialist': 'Bilgi Teknolojileri Uzmanı',
  'IT Support Specialist': 'BT Destek Uzmanı',
  'IT Support Technician': 'BT Destek Teknisyeni',
  'IT Technician': 'Bilgi Teknolojileri Teknisyeni',
  'Illustrator': 'İllüstratör',
  'Industrial Engineer': 'Endüstri Mühendisi',
  'Industrial Maintenance Technician': 'Endüstriyel Bakım Teknisyeni',
  'Information Security Analyst': 'Bilgi Güvenliği Analisti',
  'Inside Sales Representative': 'İç Satış Temsilcisi',
  'Instructional Coach': 'Öğretim Koçu',
  'Instructional Designer': 'Öğretim Tasarımcısı',
  'Insulation Worker': 'Yalıtım İşçisi',
  'Insurance Agent': 'Sigorta Acentesi',
  'Interior Designer': 'İç Mimar',
  'Intern': 'Stajyer',
  'Iron Worker': 'Demirci',
  'Ironworker': 'Demirci',
  'Janitor': 'Temizlik Görevlisi',
  'Java Full Stack Developer': 'Java Full Stack Geliştirici',
  'JavaScript Developer': 'JavaScript Geliştirici',
  'Junior Developer': 'Junior Geliştirici',
  'Kitchen Helper': 'Mutfak Yardımcısı',
  'Kitchen Manager': 'Mutfak Müdürü',
  'Lab Assistant': 'Laboratuvar Asistanı',
  'Lab Technician': 'Laboratuvar Teknisyeni',
  'Landscaper': 'Peyzaj Mimarı',
  'Leasing Consultant': 'Kiralama Danışmanı',
  'Legal Analyst': 'Hukuk Analisti',
  'Legal Assistant': 'Hukuk Asistanı',
  'Legal Secretary': 'Hukuk Sekreteri',
  'Legislative Aide': 'Yasama Asistanı',
  'Librarian': 'Kütüphaneci',
  'Library Assistant': 'Kütüphane Asistanı',
  'Licensed Practical Nurse (LPN)': 'Lisanslı Pratik Hemşire (LPN)',
  'Limousine Driver': 'Limuzin Şoförü',
  'Line Cook': 'Hat Aşçısı',
  'Litigation Support Specialist': 'Dava Destek Uzmanı',
  'Loan Officer': 'Kredi Uzmanı',
  'Loan Processor': 'Kredi İşlemleri Uzmanı',
  'Locksmith': 'Çilingir',
  'Logistics Coordinator': 'Lojistik Koordinatörü',
  'Logistics Manager': 'Lojistik Müdürü',
  'Logistics Specialist': 'Lojistik Uzmanı',
  'Long Haul Truck Driver': 'Uzun Yol Tır Şoförü',
  'Loss Prevention Specialist': 'Kayıp Önleme Uzmanı',
  'MRI Technologist': 'MR Teknisyeni',
  'Machine Learning Engineer': 'Makine Öğrenmesi Mühendisi',
  'Machine Learning Specialist': 'Makine Öğrenmesi Uzmanı',
  'Machine Operator': 'Makine Operatörü',
  'Maintenance Engineer': 'Bakım Mühendisi',
  'Maintenance Manager': 'Bakım Müdürü',
  'Maintenance Technician': 'Bakım Teknisyeni',
  'Makeup Artist': 'Makyaj Sanatçısı',
  'Management Consultant': 'Yönetim Danışmanı',
  'Manufacturing Engineer': 'Üretim Mühendisi',
  'Manufacturing Worker': 'Üretim İşçisi',
  'Marketing Analyst': 'Pazarlama Analisti',
  'Marketing Assistant': 'Pazarlama Asistanı',
  'Marketing Coordinator': 'Pazarlama Koordinatörü',
  'Marketing Director': 'Pazarlama Direktörü',
  'Marketing Executive': 'Pazarlama Yöneticisi',
  'Marketing Intern': 'Pazarlama Stajyeri',
  'Marketing Manager': 'Pazarlama Müdürü',
  'Marketing Specialist': 'Pazarlama Uzmanı',
  'Mason': 'Duvarcı',
  'Massage Therapist': 'Masör',
  'Material Handler': 'Malzeme Taşıyıcısı',
  'Mechanical Design Engineer': 'Mekanik Tasarım Mühendisi',
  'Mechanical Engineer': 'Makine Mühendisi',
  'Mechanical Technician': 'Makine Teknisyeni',
  'Mediator': 'Arabulucu',
  'Medical Assistant': 'Tıbbi Asistan',
  'Medical Billing Specialist': 'Sağlık Faturalandırma Uzmanı',
  'Medical Coder': 'Tıbbi Kodlama Uzmanı',
  'Medical Office Assistant': 'Sağlık Ofisi Asistanı',
  'Medical Receptionist': 'Klinik Resepsiyonisti',
  'Medical Representative': 'Tıbbi Satış Mümessili',
  'Medical Scribe': 'Tıbbi Sekreter',
  'Medical Technologist': 'Tıbbi Teknolog',
  'Mental Health Counselor': 'Ruh Sağlığı Danışmanı',
  'Millwright': 'Montajcı',
  'Mobile Developer': 'Mobil Uygulama Geliştirici',
  'Mortgage Loan Officer': 'Mortgage Kredi Uzmanı',
  'Motion Graphics Designer': 'Motion Grafik Tasarımcısı',
  'Moving Company Driver': 'Nakliye Şoförü',
  'Music Producer': 'Müzik Yapımcısı',
  'Nanny': 'Çocuk Bakıcısı',
  'Network Administrator': 'Ağ Yöneticisi',
  'Network Engineer': 'Ağ Mühendisi',
  'Night Auditor': 'Gece Denetçisi',
  'Node.js Developer': 'Node.js Geliştirici',
  'Nurse Practitioner': 'Uzman Hemşire',
  'Nursing Assistant': 'Hemşire Yardımcısı',
  'Nutritionist': 'Beslenme Uzmanı',
  'Occupational Therapist': 'Ergoterapist',
  'Occupational Therapy Assistant': 'Ergoterapi Asistanı',
  'Office Administrator': 'Ofis Yöneticisi',
  'Office Assistant': 'Ofis Asistanı',
  'Office Clerk': 'Büro Memuru',
  'Office Manager': 'Ofis Müdürü',
  'Operations Analyst': 'Operasyon Analisti',
  'Operations Manager': 'Operasyon Müdürü',
  'Optician': 'Optisyen',
  'Optometrist': 'Optometrist',
  'Painter': 'Boyacı',
  'Paralegal': 'Hukuk Bürosu Asistanı',
  'Paramedic': 'Paramedik',
  'Park Ranger': 'Orman Bekçisi',
  'Pastry Chef': 'Pastane Şefi',
  'Payroll Specialist': 'Bordro Uzmanı',
  'Penetration Tester': 'Sızma Testi Uzmanı',
  'Personal Trainer': 'Kişisel Antrenör',
  'Pest Control Technician': 'İlaçlama Teknisyeni',
  'Pet Groomer': 'Hayvan Bakım Uzmanı',
  'Pet Sitter': 'Evcil Hayvan Bakıcısı',
  'Pharmacist': 'Eczacı',
  'Pharmacy Assistant': 'Eczane Asistanı',
  'Pharmacy Tech': 'Eczane Teknisyeni',
  'Pharmacy Technician': 'Eczane Teknisyeni',
  'Phlebotomist': 'Kan Alma Teknisyeni',
  'Photographer': 'Fotoğrafçı',
  'Physical Therapist': 'Fizyoterapist',
  'Physical Therapy Assistant': 'Fizyoterapi Asistanı',
  'Physician Assistant': 'Hekim Asistanı',
  'Pilates Instructor': 'Pilates Eğitmeni',
  'Pizza Maker': 'Pizzacı',
  'Platform Engineer': 'Platform Mühendisi',
  'Plumber': 'Tesisatçı',
  'Police Officer': 'Polis Memuru',
  'Policy Analyst': 'Politika Analisti',
  'Pool Cleaner': 'Havuz Temizlikçisi',
  'Pool Technician': 'Havuz Teknisyeni',
  'Postal Worker': 'Posta Görevlisi',
  'Power BI Developer': 'Power BI Geliştirici',
  'Prep Cook': 'Hazırlık Aşçısı',
  'Preschool Teacher': 'Anaokulu Öğretmeni',
  'Pressure Washer': 'Basınçlı Yıkama Teknisyeni',
  'Probation Officer': 'Denetimli Serbestlik Memuru',
  'Process Engineer': 'Süreç Mühendisi',
  'Procurement Manager': 'Satın Alma Müdürü',
  'Procurement Specialist': 'Satın Alma Uzmanı',
  'Product Analyst': 'Ürün Analisti',
  'Product Designer': 'Ürün Tasarımcısı',
  'Product Manager': 'Ürün Müdürü',
  'Product Marketing Manager': 'Ürün Pazarlama Müdürü',
  'Product Owner': 'Product Owner',
  'Production Assistant': 'Yapım Asistanı',
  'Production Engineer': 'Üretim Mühendisi',
  'Production Manager': 'Üretim Müdürü',
  'Production Worker': 'Üretim İşçisi',
  'Program Coordinator': 'Program Koordinatörü',
  'Project Coordinator': 'Proje Koordinatörü',
  'Project Engineer': 'Proje Mühendisi',
  'Project Manager': 'Proje Yöneticisi',
  'Prompt Engineer': 'Prompt Mühendisi',
  'Property Manager': 'Gayrimenkul Yöneticisi',
  'Psychiatrist': 'Psikiyatrist',
  'Psychologist': 'Psikolog',
  'Public Affairs Specialist': 'Halkla İlişkiler Uzmanı',
  'Public Health Inspector': 'Halk Sağlığı Denetçisi',
  'Python Developer': 'Python Geliştirici',
  'QA Analyst': 'Kalite Güvence Analisti',
  'QA Engineer': 'Kalite Güvence Mühendisi',
  'QA Manager': 'Kalite Güvence Müdürü',
  'QA Tester': 'QA Test Uzmanı',
  'Quality Analyst': 'Kalite Analisti',
  'Quality Assurance Specialist': 'Kalite Güvence Uzmanı',
  'Quality Control Inspector': 'Kalite Kontrol Müfettişi',
  'Quality Engineer': 'Kalite Mühendisi',
  'Quality Manager': 'Kalite Müdürü',
  'Radiologic Technologist': 'Radyoloji Teknisyeni',
  'React Developer': 'React Geliştirici',
  'Reading Specialist': 'Okuma Uzmanı',
  'Real Estate Agent': 'Emlak Danışmanı',
  'Real Estate Appraiser': 'Gayrimenkul Değerleme Uzmanı',
  'Real Estate Assistant': 'Emlak Asistanı',
  'Real Estate Attorney': 'Gayrimenkul Avukatı',
  'Real Estate Investor': 'Gayrimenkul Yatırımcısı',
  'Receptionist': 'Resepsiyonist',
  'Recreation Coordinator': 'Rekreasyon Koordinatörü',
  'Recruiter': 'İşe Alım Uzmanı',
  'Recruiting Coordinator': 'İşe Alım Koordinatörü',
  'Registered Nurse': 'Hemşire',
  'Release Engineer': 'Sürüm Mühendisi',
  'Research Analyst': 'Araştırma Analisti',
  'Research Assistant': 'Araştırma Asistanı',
  'Reservation Agent': 'Rezervasyon Görevlisi',
  'Resident Assistant': 'Yurt Asistanı',
  'Residential Cleaner': 'Konut Temizlik Görevlisi',
  'Respiratory Therapist': 'Solunum Terapisti',
  'Restaurant Manager': 'Restoran Müdürü',
  'Retail Assistant': 'Mağaza Satış Danışmanı',
  'Retail Associate': 'Perakende Satış Elemanı',
  'Retail Manager': 'Mağaza Müdürü',
  'Retail Sales Associate': 'Mağaza Satış Danışmanı',
  'Retail Store Manager': 'Perakende Mağaza Müdürü',
  'Risk Management Specialist': 'Risk Yönetimi Uzmanı',
  'Roofer': 'Çatı Ustası',
  'Rust Developer': 'Rust Geliştirici',
  'SAP Consultant': 'SAP Danışmanı',
  'SOC Analyst': 'SOC Analisti',
  'Sales Assistant': 'Satış Asistanı',
  'Sales Associate': 'Satış Danışmanı',
  'Sales Consultant': 'Satış Danışmanı',
  'Sales Coordinator': 'Satış Koordinatörü',
  'Sales Director': 'Satış Direktörü',
  'Sales Engineer': 'Satış Mühendisi',
  'Sales Executive': 'Satış Yöneticisi',
  'Sales Manager': 'Satış Müdürü',
  'Sales Representative': 'Satış Temsilcisi',
  'Salesforce Administrator': 'Salesforce Yöneticisi',
  'School Administrator': 'Okul Müdürü',
  'School Counselor': 'Okul Rehber Danışmanı',
  'Scrum Master': 'Scrum Master',
  'Seaman': 'Denizci',
  'Security Analyst': 'Güvenlik Analisti',
  'Security Engineer': 'Güvenlik Mühendisi',
  'Security Guard': 'Güvenlik Görevlisi',
  'Security Officer': 'Güvenlik Amiri',
  'Server': 'Garson',
  'Service Advisor': 'Servis Danışmanı',
  'Service Crew': 'Servis Ekibi Elemanı',
  'Set Designer': 'Set Tasarımcısı',
  'Sheet Metal Worker': 'Sac İşçisi',
  'Shipping & Receiving Clerk': 'Sevkiyat ve Teslim Alma Memuru',
  'Site Engineer': 'Şantiye Mühendisi',
  'Site Reliability Engineer': 'Site Güvenilirlik Mühendisi',
  'Small Business Owner': 'Küçük İşletme Sahibi',
  'Social Media Coordinator': 'Sosyal Medya Koordinatörü',
  'Social Media Manager': 'Sosyal Medya Yöneticisi',
  'Social Media Specialist': 'Sosyal Medya Uzmanı',
  'Social Worker': 'Sosyal Hizmet Uzmanı',
  'Software Architect': 'Yazılım Mimarı',
  'Software Developer': 'Yazılım Geliştirici',
  'Software Engineer': 'Yazılım Mühendisi',
  'Software Tester': 'Yazılım Test Uzmanı',
  'Solar Installer': 'Güneş Paneli Montajcısı',
  'Solution Architect': 'Çözüm Mimarı',
  'Solutions Engineer': 'Çözüm Mühendisi',
  'Sommelier': 'Sommelier',
  'Sous Chef': 'Kısım Şefi',
  'Spa Manager': 'Spa Müdürü',
  'Special Education Teacher': 'Özel Eğitim Öğretmeni',
  'Speech-Language Pathologist': 'Dil ve Konuşma Terapisti',
  'Sports Coach': 'Spor Antrenörü',
  'Stage Manager': 'Sahne Müdürü',
  'Sterile Processing Technician': 'Sterilizasyon Teknisyeni',
  'Store Associate': 'Mağaza Elemanı',
  'Store Manager': 'Mağaza Müdürü',
  'Storyboard Artist': 'Storyboard Sanatçısı',
  'Substance Abuse Counselor': 'Bağımlılık Danışmanı',
  'Supply Chain Analyst': 'Tedarik Zinciri Analisti',
  'Supply Chain Manager': 'Tedarik Zinciri Müdürü',
  'Support Worker': 'Destek Çalışanı',
  'Surgical Technologist': 'Ameliyathane Teknisyeni',
  'Sushi Chef': 'Suşi Şefi',
  'System Administrator': 'Sistem Yöneticisi',
  'System Analyst': 'Sistem Analisti',
  'System Engineer': 'Sistem Mühendisi',
  'TSA Agent': 'Havalimanı Güvenlik Görevlisi',
  'Talent Acquisition Specialist': 'Yetenek Kazanımı Uzmanı',
  'Teacher': 'Öğretmen',
  'Teaching Assistant': 'Öğretim Asistanı',
  'Team Leader': 'Takım Lideri',
  'Tech Sales Representative': 'Teknoloji Satış Temsilcisi',
  'Technical Program Manager': 'Teknik Program Yöneticisi',
  'Technical Recruiter': 'Teknik İşe Alım Uzmanı',
  'Technical Support Specialist': 'Teknik Destek Uzmanı',
  'Technical Writer': 'Teknik Yazar',
  'Therapist': 'Terapist',
  'Title Examiner': 'Tapu İnceleme Uzmanı',
  'Tour Guide': 'Tur Rehberi',
  'Travel Agent': 'Seyahat Acentesi',
  'Truck Driver': 'Tır Şoförü',
  'Tutor': 'Özel Ders Öğretmeni',
  'UI Designer': 'UI Tasarımcı',
  'UX Designer': 'UX Tasarımcı',
  'UX Researcher': 'UX Araştırmacısı',
  'Ultrasound Technician': 'Ultrason Teknisyeni',
  'Valet Attendant': 'Vale',
  'Veterans Service Officer': 'Gazi Hizmetleri Memuru',
  'Veterinary Assistant': 'Veteriner Asistanı',
  'Veterinary Technician': 'Veteriner Teknisyeni',
  'Video Editor': 'Video Editörü',
  'Videographer': 'Kameraman',
  'Virtual Assistant': 'Sanal Asistan',
  'Voice Actor': 'Seslendirme Sanatçısı',
  'Waiter/Waitress': 'Garson',
  'Warehouse Associate': 'Depo Elemanı',
  'Warehouse Manager': 'Depo Müdürü',
  'Warehouse Worker': 'Depo İşçisi',
  'Web Designer': 'Web Tasarımcı',
  'Web Developer': 'Web Geliştirici',
  'Welder': 'Kaynakçı',
  'Wellness Coach': 'Sağlıklı Yaşam Koçu',
  'Wildlife Biologist': 'Yaban Hayatı Biyoloğu',
  'Wind Turbine Technician': 'Rüzgar Türbini Teknisyeni',
  'Window Cleaner': 'Cam Temizlikçisi',
  'X-Ray Technician': 'Röntgen Teknisyeni',
  'Yoga Instructor': 'Yoga Eğitmeni',
  'Youth Counselor': 'Gençlik Danışmanı',
  'Zookeeper': 'Hayvanat Bahçesi Bakıcısı',
  'iOS Developer': 'iOS Geliştirici',
};

// ─── CATEGORIES (English → Turkish) ──────────────────────────────────────────

export const CATEGORIES = {
  Technology: 'Teknoloji',
  Healthcare: 'Sağlık',
  Trades: 'Zanaat ve Teknik İşler',
  Hospitality: 'Otelcilik',
  'Food Service': 'Yiyecek İçecek',
  Creative: 'Yaratıcı Meslekler',
  Education: 'Eğitim',
  Government: 'Kamu',
  Finance: 'Finans',
  Marketing: 'Pazarlama',
  Business: 'İş Dünyası',
  Engineering: 'Mühendislik',
  Sales: 'Satış',
  Legal: 'Hukuk',
  'Real Estate': 'Gayrimenkul',
  HR: 'İnsan Kaynakları',
  Fitness: 'Fitness ve Spor',
  Management: 'Yönetim',
  'Animal Care': 'Hayvan Bakımı',
  Logistics: 'Lojistik',
  'Customer Service': 'Müşteri Hizmetleri',
  Administrative: 'İdari İşler',
  Transportation: 'Ulaşım',
  Retail: 'Perakende',
  Cleaning: 'Temizlik',
  'Social Services': 'Sosyal Hizmetler',
  Manufacturing: 'Üretim',
  Construction: 'İnşaat',
  Security: 'Güvenlik',
  Science: 'Bilim',
  Events: 'Etkinlik',
  'Writing & Content': 'Yazarlık ve İçerik',
  'Supply Chain': 'Tedarik Zinciri',
  Research: 'Araştırma',
  Insurance: 'Sigortacılık',
  Consulting: 'Danışmanlık',
  Aviation: 'Havacılık',
  Automotive: 'Otomotiv',
  Media: 'Medya',
  Maritime: 'Denizcilik',
  'Law Enforcement': 'Kolluk Kuvvetleri',
  'Entry-Level': 'Giriş Seviyesi',
  Entertainment: 'Eğlence',
  Childcare: 'Çocuk Bakımı',
  Beauty: 'Güzellik',
  Architecture: 'Mimarlık',
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
  Technology: (job) => `Etkili bir ${job} CV'si, yalnızca bildiğiniz teknolojileri sıralamaktan çok daha fazlasını gerektirir. Somut problemleri nasıl çözdüğünüzü, çalışmanızın ölçülebilir etkisini ve hedeflediğiniz pozisyonun teknik gereksinimlerini ne kadar iyi anladığınızı göstermelidir.`,
  Healthcare: (job) => `Sağlık sektöründe işe alım yapan yöneticiler, hem güçlü klinik yetkinlikleri hem de hastalara karşı samimi bir özeni gösterebilen adaylar arar. ${job} CV'niz teknik uzmanlık ile insani değerleri dengeli bir şekilde yansıtmalıdır.`,
  Finance: (job) => `Finans sektöründe işe alım uzmanları, karmaşık verileri stratejik kararlara dönüştürebilen adayları tercih eder. ${job} CV'niz analitik titizlik, detaylara dikkat ve mali konularda sağlam bir muhakeme yeteneğini ortaya koymalıdır.`,
  Education: (job) => `Eğitim alanında işe alım yöneticileri, öğrenmeyi teşvik edebilen ve farklı öğrenci ihtiyaçlarına uyum sağlayabilen profesyoneller arar. ${job} CV'niz pedagojik uzmanlığınızı ve öğrenci başarısına olan bağlılığınızı yansıtmalıdır.`,
  'Food Service': (job) => `Yiyecek içecek sektöründe işe alım müdürleri güvenilirlik, ekip çalışması ve mesleğe duyulan tutkuyu arar. ${job} CV'niz mutfak becerilerinizi ve baskı altında performans gösterme kapasitenizi vurgulamalıdır.`,
  Hospitality: (job) => `Otelcilik sektörü sıcak misafirperverliği, detaylara özeni ve baskı altında zarafeti değerli bulur. ${job} CV'niz hizmet odaklılığınızı ve müşteriler için unutulmaz deneyimler yaratma becerinizi yansıtmalıdır.`,
  Trades: (job) => `İşverenler, bağımsız çalışabilen ve kaliteli iş çıkarabilen nitelikli profesyonellere değer verir. ${job} CV'niz uygulamalı deneyiminizi, iş güvenliği bilincinizi ve sahadaki sorun çözme yeteneğinizi öne çıkarmalıdır.`,
  Creative: (job) => `En başarılı yaratıcı profesyoneller, sanatsal mükemmeliyeti müşteri ihtiyaçlarını anlama becerisiyle birleştirir. ${job} CV'niz yaratıcı vizyonunuzu sergilerken ticari anlayışınızı ve projeleri zamanında teslim etme yetkinliğinizi de göstermelidir.`,
  Administrative: (job) => `İşverenler, ihtiyaçları önceden tahmin edebilen, sorunlara proaktif çözümler üretebilen ve gizliliğe önem veren adaylar arar. Etkili bir ${job} CV'si üstün organizasyon becerilerini ve operasyonların sorunsuz yürümesini sağlama kapasitesini göstermelidir.`,
  Sales: (job) => `CV'niz ilk satış sunumunuzdur ve işe alım yöneticileri de onu bu gözle değerlendirir. ${job} CV'niz için en etkili yaklaşım, şirketin ticari zorluklarını anladığınızı ve gelir hedeflerine katkı sağlayabileceğinizi göstermektir.`,
  Marketing: (job) => `Pazarlama hızla değişen bir alan ve işe alım uzmanları hem strateji hem de uygulama konusunda yetkin adaylar arar. ${job} CV'niz ölçülebilir sonuçlar elde etme becerinizi stratejik yaratıcılıkla birlikte göstermelidir.`,
  HR: (job) => `Diğer kurumsal pozisyonlardan farklı olarak, insan kaynakları rolleri hassas organizasyonel dinamiklerde yol alabilme ve aynı zamanda somut iş sonuçları elde edebilme yeteneğinizi göstermenizi gerektirir.`,
  'Customer Service': (job) => `Müşteri hizmetleri pozisyonları olağanüstü iletişim becerisi ve gerçek empati gerektirir. ${job} CV'niz, olumlu müşteri ilişkilerini sürdürürken sorunları etkili bir şekilde çözme yeteneğinizi kanıtlamalıdır.`,
  Retail: (job) => `Perakende sektöründe işverenler güvenilirlik, ürün bilgisi ve müşteri hizmetlerine yönelik samimi bir coşkuyu önemser. ${job} CV'niz satış performansınızı ve dinamik bir ortamda başarılı olma kapasitenizi öne çıkarmalıdır.`,
  Logistics: (job) => `Lojistik sektöründe işverenler verimlilik, doğruluk ve zaman duyarlı operasyonları yönetebilme kapasitesini ön planda tutar. ${job} CV'niz stok yönetimi, planlama ve süreç optimizasyonu konularındaki deneyiminizi vurgulamalıdır.`,
  Government: (job) => `Kamu sektörüne yapılan başvurular özel sektörden farklı bir yaklaşım gerektirir. ${job} CV'niz, iş ilanının gereksinimlerini doğrudan karşılarken kamu hizmetine olan bağlılığınızı göstermelidir.`,
  Legal: (job) => `Hukuk sektörü mutlak bir hassasiyet ve detaylara titiz bir özen talep eder. ${job} CV'niz entelektüel titizliğinizi, mevzuata hakimiyetinizi ve karmaşık dosyaları yönetme yetkinliğinizi yansıtmalıdır.`,
  default: (job) => `Etkili bir ${job} CV'si, ilk günden itibaren sonuç üretebileceğinizi kanıtlayan somut başarılara odaklanır. Konuyla ilgili deneyimi, pozisyona yönelik samimi bir coşkuyla birleştirir.`,
};

// ─── TAGS GENERATOR ─────────────────────────────────────────────────────────
// Tags based on top Turkish search keywords from CSV:
// cv örneği (50K), cv örnekleri (50K), özgeçmiş örneği (50K),
// cv şablonu (5K), profesyonel cv (5K), ats uyumlu cv (500), cv hazırlama (500K)

export function generateTags(jobTitle, slug) {
  const lower = jobTitle.toLowerCase();
  return [
    `${lower} cv örneği`,
    `${lower} özgeçmiş örneği`,
    `${lower} cv şablonu`,
    `profesyonel ${lower} cv`,
    `ats uyumlu cv`,
    `cv hazırlama`,
    `cv örnekleri`,
    `özgeçmiş hazırlama`,
  ];
}

// ─── FAQ GENERATOR ──────────────────────────────────────────────────────────

export function generateFAQ(jobTitle) {
  const lower = jobTitle.toLowerCase();
  return [
    {
      question: `${jobTitle} CV'sinde hangi beceriler öne çıkarılmalıdır?`,
      answer: `${jobTitle} pozisyonuyla doğrudan ilgili teknik becerileri ve iletişim, takım çalışması gibi transfere açık becerileri öne çıkarın. İş ilanındaki anahtar kelimeleri kullanın ve her beceriyi somut bir başarı örneğiyle destekleyin.`,
    },
    {
      question: `${jobTitle} CV'si kaç sayfa olmalıdır?`,
      answer: `Yeni mezun ve orta düzey adaylar için ${lower} CV'si tek sayfada tutulmalıdır. 10 yılı aşkın deneyime sahip kıdemli profesyoneller için iki sayfaya uzayabilir. İçerik kalitesini miktar yerine tercih edin ve her unsurun değer kattığından emin olun.`,
    },
    {
      question: `${jobTitle} pozisyonu için hangi CV formatı en uygun?`,
      answer: `${jobTitle} pozisyonu için ters kronolojik format en çok tavsiye edilen seçenektir çünkü kariyer ilerlemenizi öne çıkarır. ATS uyumlu, profesyonel bir şablon kullanarak iletişim bilgileri, profesyonel özet, deneyim, eğitim ve beceriler bölümlerini net bir şekilde düzenleyin.`,
    },
    {
      question: `${jobTitle} olarak ne kadar maaş beklenebilir?`,
      answer: `Bir ${lower} maaşı deneyime, lokasyona ve şirket büyüklüğüne göre değişir. Bölgeniz için gerçekçi bir aralık elde etmek üzere Glassdoor veya PayScale gibi güncel maaş verilerini inceleyin. CV'nizde ölçülebilir başarılarınızı belirtmek maaş müzakeresi sırasında konumunuzu güçlendirir.`,
    },
    {
      question: `${jobTitle} CV'sinde neler yer almalıdır?`,
      answer: `Eksiksiz bir ${lower} CV'si iletişim bilgilerinizi, etkili bir profesyonel özeti, somut başarılarla desteklenmiş iş deneyiminizi, eğitim bilgilerinizi, ilgili sertifikalarınızı ve temel becerilerinizi içermelidir. Her bölümü hedeflediğiniz pozisyonun gereksinimlerine göre uyarlayın.`,
    },
  ];
}

// ─── BODY GENERATOR ─────────────────────────────────────────────────────────

export function generateBody(jobTitle, category, keySkills, avgSalary, jobGrowth, slug) {
  const lower = jobTitle.toLowerCase();
  const skills = keySkills || [];
  const topSkills = skills.slice(0, 3).join(', ') || 'temel beceriler';
  const midSkills = skills.slice(3, 6).join(', ') || 'ileri düzey beceriler';
  const softSkills = skills.slice(6, 8).join(', ') || 'takım çalışması, iletişim';

  const norm = normalizeCategory(category);
  const opener = (CATEGORY_OPENERS[norm] || CATEGORY_OPENERS.default)(jobTitle);

  const relatedSlug1 = slug.includes('-') ? slug.split('-')[0] : slug;

  return `
## Etkili Bir ${jobTitle} CV'si Nasıl Hazırlanır

${opener}

İşe alım uzmanları bir CV'ye ortalama altı ila yedi saniye ayırır. ${lower} pozisyonu söz konusu olduğunda, en ilgili becerileriniz ve önemli başarılarınız anında göze çarpmalıdır. İyi yapılandırılmış bir CV sadece deneyimlerinizi listelemez; profesyonel yolculuğunuzun hikayesini anlatır ve şirkete katacağınız değeri gösterir.

## Profesyonel Özet Örnekleri

### Giriş Seviyesi

${topSkills || 'alan becerileri'} konusunda sağlam bir eğitim altyapısına sahip, motive ${lower}. Dinamik bir ekipte yer alarak akademik bilgilerimi zorlu bir profesyonel ortamda uygulamaya hevesliyim. Hızlı öğrenme kapasitem, organizasyon becerilerim ve belirlenen hedeflere ulaşma kararlılığımla tanınırım.

### Orta Düzey

${topSkills} alanında 5 yılı aşkın deneyime sahip ${jobTitle}. Süreç iyileştirme ve projelerin zamanında ve bütçe dahilinde tesliminde kanıtlanmış başarı. ${midSkills || 'ileri düzey yetkinlikler'} konusunda uzman; junior ekip üyelerini yönlendirme ve sürekli iyileştirme girişimlerine liderlik etme kapasitesiyle tanınır.

### Kıdemli

Sektörde 10 yılı aşkın deneyime sahip, ${topSkills} ve ${midSkills || 'stratejik yönetim'} konularındaki uzmanlığıyla tanınan kıdemli ${jobTitle}. 15 kişiyi aşkın çapraz fonksiyonlu ekipleri yönetmiş ve 500.000 TL'yi aşkın tasarruf sağlayan stratejik projeleri başarıyla yürütmüştür. ${softSkills || 'liderlik ve stratejik vizyon'} alanlarında ileri düzey yetkinlik; sürekli olarak hedefleri aşma geçmişine sahiptir.

## Maaş ve İstihdam Görünümü

Bir ${lower} için ortalama maaş yılda yaklaşık **${avgSalary || '$50,000'}** civarındadır ve deneyim, coğrafi konum ve sektöre göre önemli farklılıklar gösterir. Bu pozisyon için istihdam büyüme oranı önümüzdeki yıllarda **${jobGrowth || '+%5'}** olarak öngörülmektedir.

Giriş seviyesindeki profesyoneller medyan maaşın %70-80'i arasında bir başlangıç maaşı bekleyebilirken, kıdemli veya uzmanlaşmış profiller bu medyanın %40-60 üzerinde kazanabilir. Büyükşehirler ve yüksek talep gören sektörler genellikle daha yüksek ücretler sunar.

**Kaynaklar:**
- [Bureau of Labor Statistics (BLS)](https://www.bls.gov/ooh/) — ABD istihdam ve maaş verileri
- [Glassdoor](https://www.glassdoor.com/Salaries/) — Çalışan beyanına dayalı maaş verileri ve ücret aralıkları
- [PayScale](https://www.payscale.com/research/US/) — Maaş araştırması ve pozisyon bazlı karşılaştırmalar

*Gerçek ücretler deneyim, lokasyon, sektör ve şirket büyüklüğüne göre farklılık gösterir.*

## Öne Çıkarılması Gereken Temel Beceriler

### Teknik Beceriler
${skills.slice(0, 3).map(s => `- **${s}** — Her ${lower} için temel bir yetkinlik; işe alım uzmanları ve ATS sistemleri tarafından doğrudan aranan bir beceri`).join('\n') || '- Pozisyona özgü araç ve teknolojilerde ustalık\n- Sektöre ait yöntem ve süreçlerin derinlemesine bilgisi\n- Profesyonel yazılımları etkin kullanma kapasitesi'}

### Organizasyonel Beceriler
${skills.slice(3, 6).map(s => `- **${s}** — ${lower} rolünün günlük icrasında değer gören bir yetkinlik`).join('\n') || '- Zaman yönetimi ve görev önceliklendirme\n- Organizasyon ve proje planlama\n- Prosedür takibinde titizlik'}

### Kişiler Arası Beceriler
${skills.slice(6, 8).map(s => `- **${s}** — ${lower} olarak başarılı olmak için vazgeçilmez bir kişiler arası yetkinlik`).join('\n') || '- Yazılı ve sözlü iletişim\n- Takım çalışması ve iş birliği'}
- Uyum yeteneği ve baskı altında çalışabilme kapasitesi
- Çatışma çözümü ve müzakere becerisi

## Başarı Odaklı Madde İşaretleri

Kendi başarılarınızı somut rakamlarla ifade etmek için bu örnekleri şablon olarak kullanın:

- ${topSkills || 'temel beceriler'} alanında süreç optimizasyonu sayesinde operasyonel verimlilikte **%25** iyileştirme sağlandı; yıllık önemli tasarruflar elde edildi
- **12+ projenin** eş zamanlı yönetimi; %98 zamanında teslim oranı ile ekip hedeflerinin üzerinde performans sergilendi
- **8 junior meslektaşın** eğitimi ve mentorluğu; adaptasyon süresinin %40 kısaltılmasına katkı sağlandı
- Yeni bir ${skills[0] || 'yönetim'} sistemi kurularak hata oranında **%35** düşüş ve müşteri memnuniyetinde artış elde edildi
- ${skills[1] || 'geliştirme'} alanındaki yenilikçi stratejilerle bir çeyrekte cironun **%20** artırılması sağlandı
- Kullanıcı geri bildirimlerine dayalı sürekli iyileştirmeler uygulanarak **%95** müşteri memnuniyet oranına ulaşıldı

## ${jobTitle} CV Formatı ve Şablon İpuçları

1. **Ters kronolojik format kullanın** — En güncel deneyiminizi en üste yerleştirin. ${lower} pozisyonları için işe alım uzmanları ve ATS sistemleri tarafından en çok tercih edilen format budur.
2. **Her başvuru için profesyonel özetinizi uyarlayın** — İş ilanındaki anahtar kelimeleri kullanın ve pozisyonun özgün gereksinimlerini anladığınızı gösteren kişiselleştirilmiş bir giriş hazırlayın.
3. **Başarılarınızı rakamlarla ifade edin** — Somut rakamlar dikkat çeker ve katkılarınızı elle tutulur kılar. "Satışları artırdım" yerine "satışları %30 artırdım" yazın.
4. **Düzeni özenle hazırlayın** — 2,5 cm kenar boşlukları, profesyonel bir yazı tipi (Calibri, Arial, Garamond) 10-12 punto büyüklüğünde ve kalın başlıklarla net bölümleme kullanın.
5. **İlgili sertifika ve eğitimleri ekleyin** — ${lower} pozisyonu için mesleki sertifikalar ve sürekli eğitimler, becerilerinizi geliştirmeye olan bağlılığınızı gösterir.

## İşe Alım Uzmanı İpucu

> **${jobTitle} CV'lerinde en sık gördüğüm hata, somut rakamların olmamasıdır.** Birçok aday sorumluluklarını tanımlar ancak yaptıkları işin somut etkisini hiçbir zaman göstermez.

Bir ${lower} işe alırken, performansın elle tutulur kanıtlarını ararım. "5 kişilik bir ekibi yönettim" yazan bir aday, "5 kişilik bir ekibi yöneterek art arda 4 çeyrekte üç aylık hedeflerin %115'ine ulaştım" yazan biri kadar etkileyici değildir. Deneyim bölümünüzdeki her satır şu soruyu yanıtlamalıdır: ölçülebilir ne sonuç elde ettim?

Ayrıca hedeflediğiniz sektöre özgü terminolojiyi kullanmayı da düşünün. ${category.toLowerCase()} alanında uzman işe alım yöneticileri, kişiselleştirilmemiş bir CV'yi ele veren genel ifadeleri anında fark eder.

## Sık Sorulan ${jobTitle} Mülakat Soruları

### ${lower} olarak yürüttüğünüz karmaşık bir projeyi anlatır mısınız?

İşe alım uzmanları karmaşıklığı yönetme becerinizi değerlendirmek ister. Yanıtınızı STAR yöntemiyle (Durum, Görev, Eylem, Sonuç) yapılandırın. Bağlamı, özel rolünüzü, uyguladığınız adımları ve elde ettiğiniz ölçülebilir sonuçları açıklayın.

### ${lower} rolünüzde baskı altındaki durumları veya sıkı teslim tarihlerini nasıl yönetirsiniz?

Önceliklendirme ve baskı altında performans gösterme yeteneğinizi sergileyin. Çelişen öncelikleri yönetmek zorunda kaldığınız somut bir örnek verin, sistematik yaklaşımınızı açıklayın ve elde ettiğiniz olumlu sonucu paylaşın.

### Bu ${lower} pozisyonuyla en çok örtüşen teknik becerileriniz nelerdir?

${topSkills || 'temel yetkinlikler'} konusundaki uzmanlığınızı sergileme fırsatını değerlendirin. Becerileri sadece sıralamayın; her birini somut uygulama örnekleri ve bu beceriler sayesinde elde ettiğiniz sonuçlarla destekleyin.

### Sektörünüzdeki gelişmeleri nasıl takip edersiniz?

İşe alım uzmanları sürekli mesleki gelişiminize yatırım yaptığınızdan emin olmak ister. Son dönemdeki eğitimleri, sertifikaları, konferansları, mesleki yayınları veya aktif olarak katıldığınız toplulukları belirtin.

### Beş yıl içinde ${lower} alanında kendinizi nerede görüyorsunuz?

Profesyonel gelişiminize dair net bir vizyonunuz olduğunu gösterin. Şirketin büyüme fırsatlarıyla uyumlu, gerçekçi hedefler belirtin ve sektöre uzun vadeli bağlılığınızı ortaya koyun.

## Kaçınılması Gereken Yaygın Hatalar

### 1. Pozisyona uyarlanmamış genel bir CV kullanmak

Her başvuruya aynı CV'yi göndermek en maliyetli hatadır. ATS sistemleri ve işe alım uzmanları kişiselleştirilmemiş bir CV'yi anında tespit eder. Profesyonel özetinizi ve anahtar kelimelerinizi her ${lower} iş ilanına göre uyarlayın.

### 2. Başarılar yerine görev tanımlarını listelemek

Günlük sorumluluklarınızı sıralamak işe alım uzmanlarını etkilemez. Her maddeyi ölçülebilir bir başarıya dönüştürün. "Müşteri aramalarını yönettim" ifadesi, "Günde ortalama 85 arama yöneterek ilk temasta çözüm oranını %92'ye çıkardım" haline gelmelidir.

### 3. ATS optimizasyonunu ihmal etmek

Pek çok ${lower} adayı, CV'leri otomatik filtreleri geçemediği için fırsatları kaçırır. Karmaşık tablolardan, üst bilgi ve alt bilgi alanlarından ve ATS tarafından okunamayan grafiklerden kaçının.

### 4. Güncelliğini yitirmiş veya alakasız bilgiler eklemek

15 yıldan eski deneyimler veya ${lower} pozisyonuyla ilgisi olmayan bilgiler CV'nizi gereksiz yere uzatır. Son 10 yıla ve hedeflediğiniz pozisyonla doğrudan ilgili deneyimlere odaklanın.

### 5. Sektöre özgü anahtar kelimeleri unutmak

Her sektörün kendine has bir profesyonel dili vardır. ${lower} pozisyonu için ${topSkills || 'alana özgü yetkinlikler'} gibi teknik terimlerin eksikliği, işe alım uzmanının gözünde uzmanlık eksikliği sinyali verebilir.

## ${jobTitle} CV'si İçin ATS Optimizasyonu

Aday Takip Sistemleri (ATS), bir işe alım uzmanı incelemeden önce CV'leri filtreler. ${lower} olarak şansınızı artırmak için:

- **İş ilanındaki anahtar kelimeleri birebir kullanın** — İlan "${skills[0] || 'belirli beceri'}" ifadesini içeriyorsa, CV'nizde tam olarak bu ifadeyi kullanın
- **Basit ve okunabilir bir format tercih edin** — ATS ayrıştırıcılarını karıştıran çoklu sütunlardan, tablolardan ve metin kutularından kaçının
- **Temel becerileri birden fazla bölüme yerleştirin** — ${topSkills || 'ana becerilerinizi'} profesyonel özetinizde, deneyim bölümünüzde VE beceriler bölümünüzde kullanın
- **PDF veya DOCX formatını tercih edin** — Bu formatlar modern ATS sistemleri tarafından en iyi şekilde desteklenir
- **Hem kısaltmaları HEM de tam terimleri kullanın** — Örneğin "Müşteri İlişkileri Yönetimi (CRM)" yazarak her iki arama varyasyonunu kapsayın
- **Üst bilgi ve alt bilgi alanlarından kaçının** — Bazı ATS sistemleri bu alanlardaki içeriği okuyamaz

## Tamamlayıcı Kaynaklar

${lower} başvurunuzu güçlendirmek için bu kaynakları inceleyin:

- [CV'nizin ATS uyumluluğunu kontrol edin](/tr/tools/ats-checker) — Ücretsiz ATS analiz aracımızla CV'nizi test edin
- [Profesyonel CV örnekleri](/tr/resume-examples) — Sektöre göre yüzlerce örnek CV'yi inceleyin
- [ATS uyumlu CV şablonları](/tr/templates) — Otomatik filtreleri geçmek için optimize edilmiş şablonlarımızı seçin

Profesyonel ve ATS uyumlu bir ${lower} CV'si hazırlamaya hazır mısınız? [Ücretsiz CV oluşturucu](/tr/builder) aracımızı kullanarak birkaç dakika içinde etkileyici bir CV tasarlayın. Şablonlarımız ATS sistemlerine göre optimize edilmiştir ve her bölümün yazımında size adım adım rehberlik eder.
`;
}
