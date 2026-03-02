/**
 * Vietnamese (vi) locale data for resume example generation.
 * Imported by generate-locale-resume-examples.mjs via:
 *   await import('./locale-data/resume-vi.mjs')
 *
 * Keyword source: seo/vietnam-top-500-keywords.csv (502 keywords)
 * Top terms: tạo cv (50K), mẫu cv (50K), cv xin việc (50K),
 *            sơ yếu lý lịch (50K), làm cv (50K), cv ai (50K)
 */

const LANG = 'vi';

// ─── CONFIG ─────────────────────────────────────────────────────────────────

export const CONFIG = {
  author: 'Nguyen Minh Tuan',
  authorBio: 'Chuyen gia tu van nghe nghiep va viet CV voi hon 10 nam kinh nghiem giup nguoi lao dong Viet Nam tim duoc cong viec ly tuong.',
  titlePattern: (job) => `CV ${job}: Mau CV Xin Viec & Huong Dan 2026`,
  descriptionPattern: (job) => `Mau CV ${job.toLowerCase()} chuyen nghiep voi huong dan chi tiet, vi du tom tat chuyen mon va meo tu chuyen gia 2026. Tao CV xin viec mien phi, toi uu ATS, tai PDF ngay.`,
  imageAltPattern: (job) => `Mau CV ${job} Chuyen Nghiep`,
};

// ─── JOB TITLES (English → Vietnamese) ──────────────────────────────────────

export const JOB_TITLES = {
  '3D Artist': 'Hoa si 3D',
  'AI Engineer': 'Ky su AI',
  'AWS Cloud Engineer': 'Ky su Dam may AWS',
  'AWS Solution Architect': 'Kien truc su Giai phap AWS',
  'Academic Advisor': 'Co van Hoc vu',
  'Account Executive': 'Chuyen vien Kinh doanh',
  'Account Manager': 'Quan ly Tai khoan',
  'Accountant': 'Ke toan',
  'Accounting Assistant': 'Tro ly Ke toan',
  'Accounting Clerk': 'Nhan vien Ke toan',
  'Accounting Intern': 'Thuc tap sinh Ke toan',
  'Accounting Manager': 'Truong phong Ke toan',
  'Acupuncturist': 'Bac si Cham cuu',
  'Administrative Assistant': 'Tro ly Hanh chinh',
  'Administrative Coordinator': 'Dieu phoi Hanh chinh',
  'Admissions Counselor': 'Tu van Tuyen sinh',
  'Advertising Manager': 'Quan ly Quang cao',
  'Aerospace Engineer': 'Ky su Hang khong Vu tru',
  'Agricultural Engineer': 'Ky su Nong nghiep',
  'Air Traffic Controller': 'Kiem soat vien Khong luu',
  'Aircraft Mechanic': 'Tho may bay',
  'Android Developer': 'Lap trinh vien Android',
  'Anesthesiologist': 'Bac si Gay me',
  'Animal Caretaker': 'Nhan vien Cham soc Dong vat',
  'Animator': 'Nha lam Phim hoat hinh',
  'Application Support Engineer': 'Ky su Ho tro Ung dung',
  'Appraiser': 'Chuyen vien Tham dinh',
  'Apprentice Electrician': 'Hoc viec Dien',
  'Arborist': 'Chuyen gia Cham soc Cay xanh',
  'Architect': 'Kien truc su',
  'Architectural Drafter': 'Hoa vien Kien truc',
  'Art Director': 'Giam doc Nghe thuat',
  'Art Teacher': 'Giao vien My thuat',
  'Assembler': 'Cong nhan Lap rap',
  'Assistant Manager': 'Pho Quan ly',
  'Assistant Principal': 'Pho Hieu truong',
  'Athletic Trainer': 'Huan luyen vien The thao',
  'Audio Engineer': 'Ky su Am thanh',
  'Audit Manager': 'Truong phong Kiem toan',
  'Auditor': 'Kiem toan vien',
  'Auto Body Technician': 'Ky thuat vien Son o to',
  'Auto Mechanic': 'Tho sua o to',
  'Automation Engineer': 'Ky su Tu dong hoa',
  'Automotive Engineer': 'Ky su O to',
  'Automotive Technician': 'Ky thuat vien O to',
  'Aviation Maintenance Technician': 'Ky thuat vien Bao tri Hang khong',
  'Back-End Developer': 'Lap trinh vien Back-End',
  'Baker': 'Tho lam Banh',
  'Bank Teller': 'Giao dich vien Ngan hang',
  'Banker': 'Nhan vien Ngan hang',
  'Barber': 'Tho cat toc',
  'Barista': 'Nhan vien Pha che',
  'Bartender': 'Nhan vien Bartender',
  'Beauty Advisor': 'Tu van vien Lam dep',
  'Behavioral Therapist': 'Chuyen vien Tri lieu Hanh vi',
  'Bicycle Mechanic': 'Tho sua Xe dap',
  'Billing Specialist': 'Chuyen vien Thanh toan',
  'Biomedical Engineer': 'Ky su Y sinh',
  'Blockchain Developer': 'Lap trinh vien Blockchain',
  'Bookkeeper': 'Nhan vien So sach Ke toan',
  'Brand Manager': 'Quan ly Thuong hieu',
  'Budget Analyst': 'Chuyen vien Phan tich Ngan sach',
  'Building Engineer': 'Ky su Xay dung',
  'Building Inspector': 'Thanh tra Xay dung',
  'Bus Driver': 'Tai xe Xe buyt',
  'Business Analyst': 'Chuyen vien Phan tich Kinh doanh',
  'Business Consultant': 'Tu van Kinh doanh',
  'Business Development Associate': 'Nhan vien Phat trien Kinh doanh',
  'Business Development Manager': 'Quan ly Phat trien Kinh doanh',
  'Business Intelligence Analyst': 'Chuyen vien Phan tich BI',
  'Business Manager': 'Quan ly Kinh doanh',
  'Business Owner': 'Chu Doanh nghiep',
  'Butcher': 'Tho cat Thit',
  'Buyer': 'Chuyen vien Mua hang',
  'CAD Designer': 'Thiet ke vien CAD',
  'CNA (Certified Nursing Assistant)': 'Tro ly Y ta',
  'CNC Machinist': 'Tho may CNC',
  'COO (Chief Operating Officer)': 'Giam doc Van hanh',
  'Cable Technician': 'Ky thuat vien Cap',
  'Call Center Agent': 'Nhan vien Tong dai',
  'Call Center Manager': 'Quan ly Tong dai',
  'Camp Counselor': 'Huong dan vien Trai he',
  'Car Detailer': 'Nhan vien Cham soc O to',
  'Car Salesperson': 'Nhan vien Ban O to',
  'Cardiac Sonographer': 'Ky thuat vien Sieu am Tim',
  'Cardiovascular Technologist': 'Ky thuat vien Tim mach',
  'Caregiver': 'Nguoi cham soc',
  'Carpenter': 'Tho moc',
  'Carpet Cleaner': 'Nhan vien Ve sinh Tham',
  'Cashier': 'Thu ngan',
  'Cement Mason': 'Tho xi mang',
  'Certified Nursing Assistant': 'Tro ly Y ta Co chung chi',
  'Chef': 'Dau bep Truong',
  'Chemical Engineer': 'Ky su Hoa hoc',
  'Chiropractor': 'Bac si Nang chinh Xuong khop',
  'Civil Engineer': 'Ky su Xay dung Dan dung',
  'Claims Adjuster': 'Chuyen vien Giam dinh Boi thuong',
  'Claims Analyst': 'Chuyen vien Phan tich Boi thuong',
  'Cleaner': 'Nhan vien Ve sinh',
  'Clinical Research Associate': 'Chuyen vien Nghien cuu Lam sang',
  'Cloud Architect': 'Kien truc su Dam may',
  'Cloud Engineer': 'Ky su Dam may',
  'Coach': 'Huan luyen vien',
  'Collections Specialist': 'Chuyen vien Thu hoi No',
  'Communications Director': 'Giam doc Truyen thong',
  'Communications Manager': 'Quan ly Truyen thong',
  'Community Health Worker': 'Nhan vien Y te Cong dong',
  'Community Manager': 'Quan ly Cong dong',
  'Compliance Analyst': 'Chuyen vien Phan tich Tuan thu',
  'Compliance Manager': 'Quan ly Tuan thu',
  'Compliance Officer': 'Chuyen vien Tuan thu',
  'Computer Technician': 'Ky thuat vien May tinh',
  'Concierge': 'Nhan vien Le tan',
  'Concrete Finisher': 'Tho hoan thien Be tong',
  'Construction Engineer': 'Ky su Thi cong',
  'Construction Manager': 'Quan ly Cong trinh',
  'Construction Worker': 'Cong nhan Xay dung',
  'Consultant': 'Tu van vien',
  'Content Creator': 'Nha Sang tao Noi dung',
  'Content Marketing Manager': 'Quan ly Content Marketing',
  'Content Strategist': 'Chuyen gia Chien luoc Noi dung',
  'Content Writer': 'Nhan vien Viet Noi dung',
  'Contract Specialist': 'Chuyen vien Hop dong',
  'Controller': 'Ke toan Truong',
  'Copywriter': 'Copywriter',
  'Corporate Recruiter': 'Chuyen vien Tuyen dung',
  'Correctional Officer': 'Can bo Quan giao',
  'Cosmetologist': 'Chuyen vien Tham my',
  'Counselor': 'Tu van vien Tam ly',
  'Courier': 'Nhan vien Giao hang',
  'Court Clerk': 'Thu ky Toa an',
  'Crane Operator': 'Tho lai Cau truc',
  'Credit Analyst': 'Chuyen vien Phan tich Tin dung',
  'Curriculum Designer': 'Chuyen vien Thiet ke Chuong trinh Hoc',
  'Customer Service Manager': 'Quan ly Dich vu Khach hang',
  'Customer Service Representative': 'Nhan vien Dich vu Khach hang',
  'Customer Success Manager': 'Quan ly Thanh cong Khach hang',
  'Customs Broker': 'Nhan vien Hai quan',
  'Cybersecurity Analyst': 'Chuyen vien Phan tich An ninh Mang',
  'Data Analyst': 'Chuyen vien Phan tich Du lieu',
  'Data Architect': 'Kien truc su Du lieu',
  'Data Engineer': 'Ky su Du lieu',
  'Data Entry Clerk': 'Nhan vien Nhap lieu',
  'Data Scientist': 'Nha Khoa hoc Du lieu',
  'Database Administrator': 'Quan tri Co so Du lieu',
  'Dental Assistant': 'Tro ly Nha khoa',
  'Dental Hygienist': 'Ky thuat vien Ve sinh Rang',
  'Dentist': 'Nha si',
  'Deputy Sheriff': 'Pho Canh sat Truong',
  'Desktop Support Engineer': 'Ky su Ho tro May tinh',
  'Desktop Support Specialist': 'Chuyen vien Ho tro May tinh',
  'Detailer': 'Nhan vien Cham soc Chi tiet',
  'DevOps Engineer': 'Ky su DevOps',
  'Diesel Mechanic': 'Tho may Diesel',
  'Diesel Technician': 'Ky thuat vien Diesel',
  'Dietitian': 'Chuyen gia Dinh duong',
  'Digital Marketing Manager': 'Quan ly Marketing So',
  'Digital Marketing Specialist': 'Chuyen vien Marketing So',
  'Director of Operations': 'Giam doc Van hanh',
  'Dishwasher': 'Nhan vien Rua bat',
  'Dispatcher': 'Nhan vien Dieu phoi',
  'Dog Groomer': 'Nhan vien Cham soc Thu cung',
  'Dog Walker': 'Nguoi Dan cho Di dao',
  'Drafter': 'Hoa vien Ky thuat',
  'Drywall Installer': 'Tho Thach cao',
  'ESL Teacher': 'Giao vien Tieng Anh',
  'Electrical Engineer': 'Ky su Dien',
  'Electrician': 'Tho dien',
  'Embedded Software Engineer': 'Ky su Phan mem Nhung',
  'Emergency Medical Technician (EMT)': 'Nhan vien Cap cuu',
  'Engineering Manager': 'Quan ly Ky thuat',
  'Entrepreneur': 'Doanh nhan',
  'Environmental Consultant': 'Tu van Moi truong',
  'Environmental Engineer': 'Ky su Moi truong',
  'Environmental Scientist': 'Nha Khoa hoc Moi truong',
  'Esthetician': 'Chuyen vien Cham soc Da',
  'Event Coordinator': 'Dieu phoi vien Su kien',
  'Event Manager': 'Quan ly Su kien',
  'Event Planner': 'Chuyen vien To chuc Su kien',
  'Executive Assistant': 'Tro ly Giam doc',
  'Executive Chef': 'Bep Truong',
  'Exercise Physiologist': 'Chuyen gia Sinh ly Van dong',
  'Expeditor': 'Nhan vien Xu ly Don hang',
  'Eyewear Sales Associate': 'Nhan vien Ban Kinh mat',
  'Facilities Manager': 'Quan ly Co so Vat chat',
  'Factory Worker': 'Cong nhan Nha may',
  'Fashion Designer': 'Nha Thiet ke Thoi trang',
  'Field Engineer': 'Ky su Hien truong',
  'Field Service Technician': 'Ky thuat vien Dich vu Hien truong',
  'Film Director': 'Dao dien Phim',
  'Finance Manager': 'Quan ly Tai chinh',
  'Financial Advisor': 'Tu van Tai chinh',
  'Financial Analyst': 'Chuyen vien Phan tich Tai chinh',
  'Financial Controller': 'Kiem soat vien Tai chinh',
  'Financial Planner': 'Chuyen vien Lap Ke hoach Tai chinh',
  'Fire Inspector': 'Thanh tra Phong chay',
  'Firefighter': 'Linh cuu hoa',
  'Fitness Instructor': 'Huan luyen vien The duc',
  'Flight Attendant': 'Tiep vien Hang khong',
  'Florist': 'Nhan vien Cam hoa',
  'Food Runner': 'Nhan vien Phuc vu Mon an',
  'Food Scientist': 'Nha Khoa hoc Thuc pham',
  'Forklift Operator': 'Tho lai Xe nang',
  'Freelance Writer': 'Nha van Tu do',
  'Front Desk Agent': 'Nhan vien Le tan',
  'Front Desk Receptionist': 'Le tan',
  'Front-End Developer': 'Lap trinh vien Front-End',
  'Full-Stack Developer': 'Lap trinh vien Full-Stack',
  'Funeral Director': 'Quan ly Tang le',
  'Game Designer': 'Nha Thiet ke Game',
  'General Manager': 'Tong Quan ly',
  'GIS Analyst': 'Chuyen vien Phan tich GIS',
  'Glazier': 'Tho Kinh',
  'Golf Course Superintendent': 'Quan ly San Golf',
  'Graphic Designer': 'Thiet ke Do hoa',
  'Guidance Counselor': 'Tu van Huong nghiep',
  'Gym Manager': 'Quan ly Phong tap',
  'HVAC Technician': 'Ky thuat vien Dieu hoa',
  'Hair Stylist': 'Nha Tao mau Toc',
  'Head Chef': 'Bep Truong',
  'Health Educator': 'Giang vien Y te',
  'Healthcare Administrator': 'Quan ly Y te',
  'Help Desk Technician': 'Ky thuat vien Ho tro CNTT',
  'Home Health Aide': 'Nhan vien Cham soc Suc khoe tai Nha',
  'Horticulturist': 'Chuyen gia Lam vuon',
  'Hospital Administrator': 'Quan ly Benh vien',
  'Hospitality Manager': 'Quan ly Khach san',
  'Host/Hostess': 'Nhan vien Don khach',
  'Hotel Manager': 'Quan ly Khach san',
  'House Cleaner': 'Nhan vien Don dep',
  'Housekeeping Manager': 'Quan ly Buong phong',
  'Housekeeping Supervisor': 'Giam sat Buong phong',
  'IT Auditor': 'Kiem toan vien CNTT',
  'IT Consultant': 'Tu van CNTT',
  'IT Director': 'Giam doc CNTT',
  'IT Manager': 'Quan ly CNTT',
  'IT Project Manager': 'Quan ly Du an CNTT',
  'IT Specialist': 'Chuyen vien CNTT',
  'IT Support Specialist': 'Chuyen vien Ho tro CNTT',
  'Immigration Paralegal': 'Tro ly Luat Di tru',
  'Industrial Designer': 'Nha Thiet ke Cong nghiep',
  'Industrial Engineer': 'Ky su Cong nghiep',
  'Information Security Analyst': 'Chuyen vien An ninh Thong tin',
  'Information Technology Manager': 'Quan ly Cong nghe Thong tin',
  'Inside Sales Representative': 'Nhan vien Ban hang Noi bo',
  'Instructional Designer': 'Chuyen vien Thiet ke Giang day',
  'Insurance Agent': 'Dai ly Bao hiem',
  'Insurance Underwriter': 'Chuyen vien Bao hiem',
  'Interior Designer': 'Nha Thiet ke Noi that',
  'Interpreter': 'Phien dich vien',
  'Inventory Manager': 'Quan ly Kho',
  'Investment Analyst': 'Chuyen vien Phan tich Dau tu',
  'Investment Banker': 'Nhan vien Ngan hang Dau tu',
  'Janitor': 'Nhan vien Tap vu',
  'Java Developer': 'Lap trinh vien Java',
  'Jeweler': 'Tho Kim hoan',
  'Journalist': 'Nha Bao',
  'Junior Accountant': 'Nhan vien Ke toan',
  'Juvenile Probation Officer': 'Can bo Giam sat Vi thanh nien',
  'Kindergarten Teacher': 'Giao vien Mau giao',
  'Kitchen Manager': 'Quan ly Bep',
  'Lab Technician': 'Ky thuat vien Phong thi nghiem',
  'Landscape Architect': 'Kien truc su Canh quan',
  'Landscaper': 'Nhan vien Cham soc San vuon',
  'Law Clerk': 'Thu ky Phap ly',
  'Lawyer': 'Luat su',
  'Lead Teacher': 'Giao vien Chu nhiem',
  'Leasing Consultant': 'Tu van vien Cho thue',
  'Legal Analyst': 'Chuyen vien Phan tich Phap ly',
  'Legal Assistant': 'Tro ly Phap ly',
  'Legal Secretary': 'Thu ky Phap ly',
  'Legislative Aide': 'Tro ly Lap phap',
  'Librarian': 'Thu thu',
  'Library Assistant': 'Tro ly Thu vien',
  'Licensed Practical Nurse (LPN)': 'Y ta Thuc hanh',
  'Limousine Driver': 'Tai xe Limousine',
  'Line Cook': 'Dau bep Day chuyen',
  'Litigation Support Specialist': 'Chuyen vien Ho tro Tranh tung',
  'Loan Officer': 'Chuyen vien Tin dung',
  'Loan Processor': 'Nhan vien Xu ly Tin dung',
  'Locksmith': 'Tho Khoa',
  'Logistics Coordinator': 'Dieu phoi vien Logistics',
  'Logistics Manager': 'Quan ly Logistics',
  'Logistics Specialist': 'Chuyen vien Logistics',
  'Long Haul Truck Driver': 'Tai xe Duong dai',
  'Loss Prevention Specialist': 'Chuyen vien Phong chong That thoat',
  'MRI Technologist': 'Ky thuat vien MRI',
  'Machine Learning Engineer': 'Ky su Machine Learning',
  'Machine Learning Specialist': 'Chuyen vien Machine Learning',
  'Machine Operator': 'Tho van hanh May',
  'Maintenance Engineer': 'Ky su Bao tri',
  'Maintenance Manager': 'Quan ly Bao tri',
  'Maintenance Technician': 'Ky thuat vien Bao tri',
  'Makeup Artist': 'Chuyen vien Trang diem',
  'Management Consultant': 'Tu van Quan ly',
  'Manufacturing Engineer': 'Ky su San xuat',
  'Manufacturing Worker': 'Cong nhan San xuat',
  'Marketing Analyst': 'Chuyen vien Phan tich Marketing',
  'Marketing Assistant': 'Tro ly Marketing',
  'Marketing Coordinator': 'Dieu phoi vien Marketing',
  'Marketing Director': 'Giam doc Marketing',
  'Marketing Executive': 'Chuyen vien Marketing Cao cap',
  'Marketing Intern': 'Thuc tap sinh Marketing',
  'Marketing Manager': 'Quan ly Marketing',
  'Marketing Specialist': 'Chuyen vien Marketing',
  'Mason': 'Tho xay',
  'Massage Therapist': 'Chuyen vien Massage',
  'Material Handler': 'Nhan vien Xu ly Vat tu',
  'Mechanical Design Engineer': 'Ky su Thiet ke Co khi',
  'Mechanical Engineer': 'Ky su Co khi',
  'Mechanical Technician': 'Ky thuat vien Co khi',
  'Mediator': 'Hoa giai vien',
  'Medical Assistant': 'Tro ly Y te',
  'Medical Billing Specialist': 'Chuyen vien Thanh toan Y te',
  'Medical Coder': 'Chuyen vien Ma hoa Y te',
  'Medical Office Assistant': 'Tro ly Van phong Y te',
  'Medical Receptionist': 'Le tan Phong kham',
  'Medical Representative': 'Trinh duoc vien',
  'Medical Scribe': 'Thu ky Y khoa',
  'Medical Technologist': 'Chuyen vien Cong nghe Y te',
  'Mental Health Counselor': 'Tu van vien Suc khoe Tam than',
  'Millwright': 'Ky thuat vien Lap may',
  'Mobile Developer': 'Lap trinh vien Mobile',
  'Mortgage Loan Officer': 'Chuyen vien Cho vay The chap',
  'Motion Graphics Designer': 'Thiet ke Motion Graphics',
  'Moving Company Driver': 'Tai xe Chuyen nha',
  'Music Producer': 'Nha San xuat Am nhac',
  'Nanny': 'Nguoi Giu tre',
  'Network Administrator': 'Quan tri Mang',
  'Network Engineer': 'Ky su Mang',
  'Night Auditor': 'Kiem toan vien Ca dem',
  'Node.js Developer': 'Lap trinh vien Node.js',
  'Nurse': 'Y ta',
  'Nurse Practitioner': 'Y ta Chuyen khoa',
  'Nursing Assistant': 'Tro ly Y ta',
  'Nutritionist': 'Chuyen gia Dinh duong',
  'Occupational Therapist': 'Chuyen vien Vat ly Tri lieu',
  'Occupational Therapy Assistant': 'Tro ly Vat ly Tri lieu',
  'Office Administrator': 'Quan tri Van phong',
  'Office Assistant': 'Tro ly Van phong',
  'Office Clerk': 'Nhan vien Van phong',
  'Office Manager': 'Quan ly Van phong',
  'Operations Analyst': 'Chuyen vien Phan tich Van hanh',
  'Operations Manager': 'Quan ly Van hanh',
  'Optician': 'Ky thuat vien Kinh mat',
  'Optometrist': 'Bac si Khuc xa',
  'Painter': 'Tho son',
  'Paralegal': 'Tro ly Luat su',
  'Paramedic': 'Nhan vien Cap cuu',
  'Park Ranger': 'Kiem lam',
  'Pastry Chef': 'Dau bep Banh ngot',
  'Payroll Specialist': 'Chuyen vien Tinh luong',
  'Penetration Tester': 'Chuyen vien Kiem thu Xam nhap',
  'Personal Trainer': 'Huan luyen vien Ca nhan',
  'Pest Control Technician': 'Ky thuat vien Diet con trung',
  'Pet Groomer': 'Nhan vien Cham soc Thu cung',
  'Pet Sitter': 'Nguoi Trong thu cung',
  'Pharmacist': 'Duoc si',
  'Pharmacy Assistant': 'Tro ly Nha thuoc',
  'Pharmacy Tech': 'Ky thuat vien Duoc',
  'Pharmacy Technician': 'Ky thuat vien Duoc',
  'Phlebotomist': 'Ky thuat vien Lay mau',
  'Photographer': 'Nhiep anh gia',
  'Physical Therapist': 'Chuyen vien Vat ly Tri lieu',
  'Physical Therapy Assistant': 'Tro ly Vat ly Tri lieu',
  'Physician Assistant': 'Tro ly Bac si',
  'Pilates Instructor': 'Huan luyen vien Pilates',
  'Pizza Maker': 'Tho lam Pizza',
  'Platform Engineer': 'Ky su Platform',
  'Plumber': 'Tho nuoc',
  'Police Officer': 'Canh sat',
  'Policy Analyst': 'Chuyen vien Phan tich Chinh sach',
  'Pool Cleaner': 'Nhan vien Ve sinh Ho boi',
  'Pool Technician': 'Ky thuat vien Ho boi',
  'Postal Worker': 'Nhan vien Buu dien',
  'Power BI Developer': 'Lap trinh vien Power BI',
  'Prep Cook': 'Phu bep',
  'Preschool Teacher': 'Giao vien Mam non',
  'Pressure Washer': 'Nhan vien Rua ap luc',
  'Probation Officer': 'Can bo Giam sat',
  'Process Engineer': 'Ky su Quy trinh',
  'Procurement Manager': 'Quan ly Mua sam',
  'Procurement Specialist': 'Chuyen vien Mua sam',
  'Product Analyst': 'Chuyen vien Phan tich San pham',
  'Product Designer': 'Nha Thiet ke San pham',
  'Product Manager': 'Quan ly San pham',
  'Product Marketing Manager': 'Quan ly Marketing San pham',
  'Product Owner': 'Product Owner',
  'Production Assistant': 'Tro ly San xuat',
  'Production Engineer': 'Ky su San xuat',
  'Production Manager': 'Quan ly San xuat',
  'Production Worker': 'Cong nhan San xuat',
  'Program Coordinator': 'Dieu phoi vien Chuong trinh',
  'Project Coordinator': 'Dieu phoi vien Du an',
  'Project Engineer': 'Ky su Du an',
  'Project Manager': 'Quan ly Du an',
  'Prompt Engineer': 'Ky su Prompt',
  'Property Manager': 'Quan ly Bat dong san',
  'Psychiatrist': 'Bac si Tam than',
  'Psychologist': 'Chuyen gia Tam ly',
  'Public Affairs Specialist': 'Chuyen vien Doi ngoai',
  'Public Health Inspector': 'Thanh tra Y te Cong dong',
  'Python Developer': 'Lap trinh vien Python',
  'QA Analyst': 'Chuyen vien Phan tich QA',
  'QA Engineer': 'Ky su QA',
  'QA Manager': 'Quan ly QA',
  'QA Tester': 'Nhan vien Kiem thu QA',
  'Quality Analyst': 'Chuyen vien Phan tich Chat luong',
  'Quality Assurance Specialist': 'Chuyen vien Dam bao Chat luong',
  'Quality Control Inspector': 'Thanh tra Kiem soat Chat luong',
  'Quality Engineer': 'Ky su Chat luong',
  'Quality Manager': 'Quan ly Chat luong',
  'Radiologic Technologist': 'Ky thuat vien X-quang',
  'React Developer': 'Lap trinh vien React',
  'Reading Specialist': 'Chuyen vien Doc',
  'Real Estate Agent': 'Moi gioi Bat dong san',
  'Real Estate Appraiser': 'Tham dinh vien Bat dong san',
  'Real Estate Assistant': 'Tro ly Bat dong san',
  'Real Estate Attorney': 'Luat su Bat dong san',
  'Real Estate Investor': 'Nha Dau tu Bat dong san',
  'Receptionist': 'Le tan',
  'Recreation Coordinator': 'Dieu phoi vien Giai tri',
  'Recruiter': 'Chuyen vien Tuyen dung',
  'Recruiting Coordinator': 'Dieu phoi vien Tuyen dung',
  'Registered Nurse': 'Dieu duong',
  'Release Engineer': 'Ky su Release',
  'Research Analyst': 'Chuyen vien Phan tich Nghien cuu',
  'Research Assistant': 'Tro ly Nghien cuu',
  'Reservation Agent': 'Nhan vien Dat phong',
  'Resident Assistant': 'Tro ly Ky tuc xa',
  'Residential Cleaner': 'Nhan vien Ve sinh Nha o',
  'Respiratory Therapist': 'Chuyen vien Tri lieu Ho hap',
  'Restaurant Manager': 'Quan ly Nha hang',
  'Retail Assistant': 'Nhan vien Ban le',
  'Retail Associate': 'Nhan vien Ban hang',
  'Retail Manager': 'Quan ly Cua hang',
  'Retail Sales Associate': 'Nhan vien Ban hang Le',
  'Retail Store Manager': 'Quan ly Cua hang Ban le',
  'Risk Management Specialist': 'Chuyen vien Quan ly Rui ro',
  'Roofer': 'Tho lop Mai',
  'Rust Developer': 'Lap trinh vien Rust',
  'SAP Consultant': 'Tu van SAP',
  'SOC Analyst': 'Chuyen vien Phan tich SOC',
  'Sales Assistant': 'Tro ly Ban hang',
  'Sales Associate': 'Nhan vien Ban hang',
  'Sales Consultant': 'Tu van Ban hang',
  'Sales Coordinator': 'Dieu phoi vien Ban hang',
  'Sales Director': 'Giam doc Ban hang',
  'Sales Engineer': 'Ky su Ban hang',
  'Sales Executive': 'Chuyen vien Kinh doanh',
  'Sales Manager': 'Quan ly Ban hang',
  'Sales Representative': 'Dai dien Ban hang',
  'Salesforce Administrator': 'Quan tri vien Salesforce',
  'School Administrator': 'Quan ly Truong hoc',
  'School Counselor': 'Tu van Hoc duong',
  'Scrum Master': 'Scrum Master',
  'Seaman': 'Thuy thu',
  'Security Analyst': 'Chuyen vien Phan tich An ninh',
  'Security Engineer': 'Ky su An ninh',
  'Security Guard': 'Bao ve',
  'Security Officer': 'Nhan vien An ninh',
  'Server': 'Nhan vien Phuc vu',
  'Service Advisor': 'Tu van Dich vu',
  'Service Crew': 'Nhan vien Phuc vu',
  'Set Designer': 'Nha Thiet ke San khau',
  'Sheet Metal Worker': 'Tho Kim loai Tam',
  'Shipping & Receiving Clerk': 'Nhan vien Xuat nhap hang',
  'Site Engineer': 'Ky su Cong truong',
  'Site Reliability Engineer': 'Ky su SRE',
  'Small Business Owner': 'Chu Doanh nghiep Nho',
  'Social Media Coordinator': 'Dieu phoi vien Mang xa hoi',
  'Social Media Manager': 'Quan ly Mang xa hoi',
  'Social Media Specialist': 'Chuyen vien Mang xa hoi',
  'Social Worker': 'Nhan vien Cong tac Xa hoi',
  'Software Architect': 'Kien truc su Phan mem',
  'Software Developer': 'Lap trinh vien',
  'Software Engineer': 'Ky su Phan mem',
  'Software Tester': 'Nhan vien Kiem thu Phan mem',
  'Solar Installer': 'Ky thuat vien Pin mat troi',
  'Solution Architect': 'Kien truc su Giai phap',
  'Solutions Engineer': 'Ky su Giai phap',
  'Sommelier': 'Chuyen gia Ruou vang',
  'Sous Chef': 'Pho Bep truong',
  'Spa Manager': 'Quan ly Spa',
  'Special Education Teacher': 'Giao vien Giao duc Dac biet',
  'Speech-Language Pathologist': 'Chuyen vien Am ngu Tri lieu',
  'Sports Coach': 'Huan luyen vien The thao',
  'Stage Manager': 'Quan ly San khau',
  'Sterile Processing Technician': 'Ky thuat vien Tiet trung',
  'Store Associate': 'Nhan vien Cua hang',
  'Store Manager': 'Quan ly Cua hang',
  'Storyboard Artist': 'Hoa si Storyboard',
  'Substance Abuse Counselor': 'Tu van vien Cai nghien',
  'Supply Chain Analyst': 'Chuyen vien Phan tich Chuoi cung ung',
  'Supply Chain Manager': 'Quan ly Chuoi cung ung',
  'Support Worker': 'Nhan vien Ho tro',
  'Surgical Technologist': 'Ky thuat vien Phau thuat',
  'Sushi Chef': 'Dau bep Sushi',
  'System Administrator': 'Quan tri He thong',
  'System Analyst': 'Chuyen vien Phan tich He thong',
  'System Engineer': 'Ky su He thong',
  'TSA Agent': 'Nhan vien An ninh San bay',
  'Talent Acquisition Specialist': 'Chuyen vien Tuyen dung Nhan tai',
  'Teacher': 'Giao vien',
  'Teaching Assistant': 'Tro giang',
  'Team Leader': 'Truong nhom',
  'Tech Sales Representative': 'Dai dien Ban hang Cong nghe',
  'Technical Program Manager': 'Quan ly Chuong trinh Ky thuat',
  'Technical Recruiter': 'Chuyen vien Tuyen dung IT',
  'Technical Support Specialist': 'Chuyen vien Ho tro Ky thuat',
  'Technical Writer': 'Chuyen vien Viet Tai lieu Ky thuat',
  'Therapist': 'Chuyen vien Tri lieu',
  'Title Examiner': 'Chuyen vien Kiem tra Giay to',
  'Tour Guide': 'Huong dan vien Du lich',
  'Travel Agent': 'Dai ly Du lich',
  'Truck Driver': 'Tai xe Xe tai',
  'Tutor': 'Gia su',
  'UI Designer': 'Thiet ke UI',
  'UX Designer': 'Thiet ke UX',
  'UX Researcher': 'Nghien cuu vien UX',
  'Ultrasound Technician': 'Ky thuat vien Sieu am',
  'Valet Attendant': 'Nhan vien Dau xe',
  'Veterans Service Officer': 'Chuyen vien Ho tro Cuu chien binh',
  'Veterinary Assistant': 'Tro ly Thu y',
  'Veterinary Technician': 'Ky thuat vien Thu y',
  'Video Editor': 'Bien tap vien Video',
  'Videographer': 'Quay phim',
  'Virtual Assistant': 'Tro ly Ao',
  'Voice Actor': 'Dien vien Long tieng',
  'Waiter/Waitress': 'Nhan vien Phuc vu',
  'Warehouse Associate': 'Nhan vien Kho',
  'Warehouse Manager': 'Quan ly Kho',
  'Warehouse Worker': 'Cong nhan Kho',
  'Web Designer': 'Thiet ke Web',
  'Web Developer': 'Lap trinh vien Web',
  'Welder': 'Tho Han',
  'Wellness Coach': 'Chuyen gia Suc khoe',
  'Wildlife Biologist': 'Nha Sinh vat hoc Hoang da',
  'Wind Turbine Technician': 'Ky thuat vien Tua bin Gio',
  'Window Cleaner': 'Nhan vien Lau kinh',
  'X-Ray Technician': 'Ky thuat vien X-quang',
  'Yoga Instructor': 'Huan luyen vien Yoga',
  'Youth Counselor': 'Tu van vien Thanh thieu nien',
  'Zookeeper': 'Nhan vien Cham soc Thu So thu',
  'Accounts Payable Specialist': 'Chuyen vien Cong no Phai tra',
  'Accounts Receivable Specialist': 'Chuyen vien Cong no Phai thu',
  'Animal Control Officer': 'Nhan vien Kiem soat Dong vat',
  'Animal Shelter Worker': 'Nhan vien Trai Cuu tro Dong vat',
  'Appliance Repair Technician': 'Ky thuat vien Sua chua Thiet bi',
  'Aquarium Keeper': 'Nhan vien Cham soc Thuy cung',
  'Arbitrator': 'Trong tai vien',
  'Assistant Director': 'Pho Giam doc',
  'Assistant Property Manager': 'Tro ly Quan ly Bat dong san',
  'Assistant Store Manager': 'Pho Quan ly Cua hang',
  'Backend Developer': 'Lap trinh vien Backend',
  'Bank Manager': 'Giam doc Ngan hang',
  'Banquet Chef': 'Dau bep Tiec',
  'Bellhop': 'Nhan vien Khuong vac Khach san',
  'Branch Manager': 'Truong Chi nhanh',
  'Brand Designer': 'Thiet ke Thuong hieu',
  'Building Maintenance Technician': 'Ky thuat vien Bao tri Toa nha',
  'Business Administration Professional': 'Chuyen vien Quan tri Kinh doanh',
  'Business Development Executive': 'Chuyen vien Phat trien Kinh doanh',
  'Business Intelligence Specialist': 'Chuyen vien Business Intelligence',
  'Busser': 'Nhan vien Don ban',
  'CNC Operator': 'Tho van hanh CNC',
  'Cabin Crew': 'Tiep vien Hang khong',
  'Cabinet Maker': 'Tho dong Tu',
  'Cafeteria Worker': 'Nhan vien Can tin',
  'Call Center Representative': 'Dai dien Tong dai',
  'Car Sales Associate': 'Nhan vien Ban O to',
  'Case Manager': 'Quan ly Ho so',
  'Casino Dealer': 'Nhan vien Chia bai Casino',
  'Caterer': 'Nhan vien Cung cap Tiec',
  'Catering Manager': 'Quan ly Dich vu Tiec',
  'Certified Nursing Assistant (CNA)': 'Tro ly Y ta (CNA)',
  'Change Management Specialist': 'Chuyen vien Quan ly Thay doi',
  'Chemist': 'Nha Hoa hoc',
  'Chief Information Officer (CIO)': 'Giam doc Cong nghe Thong tin',
  'Chief of Staff': 'Chanh Van phong',
  'City Planner': 'Chuyen vien Quy hoach Do thi',
  'Client Relations Manager': 'Quan ly Quan he Khach hang',
  'Clinical Research Coordinator': 'Dieu phoi vien Nghien cuu Lam sang',
  'Code Enforcement Officer': 'Nhan vien Kiem tra Tieu chuan',
  'College Admissions Counselor': 'Tu van Tuyen sinh Dai hoc',
  'College Professor': 'Giang vien Dai hoc',
  'Commercial Cleaner': 'Nhan vien Ve sinh Thuong mai',
  'Commercial Real Estate Broker': 'Moi gioi Bat dong san Thuong mai',
  'Community Outreach Coordinator': 'Dieu phoi vien Tiep can Cong dong',
  'Complaints Handler': 'Nhan vien Xu ly Khieu nai',
  'Computer Operator': 'Nhan vien Van hanh May tinh',
  'Computer Science Professional': 'Chuyen gia Khoa hoc May tinh',
  'Construction Superintendent': 'Giam sat Cong trinh',
  'Contracts Specialist': 'Chuyen vien Hop dong',
  'Corporate Security Manager': 'Quan ly An ninh Doanh nghiep',
  'Court Reporter': 'Thu ky Phien toa',
  'Creative Director': 'Giam doc Sang tao',
  'Crisis Counselor': 'Tu van vien Khung hoang',
  'Cruise Ship Worker': 'Nhan vien Tau du lich',
  'Curriculum Developer': 'Chuyen vien Phat trien Chuong trinh Hoc',
  'Customer Experience Specialist': 'Chuyen vien Trai nghiem Khach hang',
  'Customer Success Specialist': 'Chuyen vien Thanh cong Khach hang',
  'Customer Support Specialist': 'Chuyen vien Ho tro Khach hang',
  'Customs Officer': 'Can bo Hai quan',
  'Data Entry Operator': 'Nhan vien Nhap du lieu',
  'Data Entry Specialist': 'Chuyen vien Nhap du lieu',
  'Delivery Driver': 'Tai xe Giao hang',
  'Dental Office Manager': 'Quan ly Phong kham Nha khoa',
  'Design Engineer': 'Ky su Thiet ke',
  'Desktop Support Technician': 'Ky thuat vien Ho tro May tinh',
  'Dialysis Technician': 'Ky thuat vien Loc mau',
  'Dietary Aide': 'Nhan vien Ho tro Dinh duong',
  'Digital Marketer': 'Chuyen vien Marketing So',
  'District Manager': 'Quan ly Khu vuc',
  'Doctor': 'Bac si',
  'Dog Trainer': 'Huan luyen vien Cho',
  'Driver': 'Tai xe',
  'EMT': 'Nhan vien Cap cuu Y te',
  'Editor': 'Bien tap vien',
  'Education Consultant': 'Tu van Giao duc',
  'Educational Technologist': 'Chuyen gia Cong nghe Giao duc',
  'Electrical Technician': 'Ky thuat vien Dien',
  'Elementary Teacher': 'Giao vien Tieu hoc',
  'Elevator Technician': 'Ky thuat vien Thang may',
  'Embedded Systems Engineer': 'Ky su He thong Nhung',
  'Emergency Management Coordinator': 'Dieu phoi vien Quan ly Khung hoang',
  'Environmental Compliance Officer': 'Nhan vien Tuan thu Moi truong',
  'Epidemiologist': 'Nha Dich te hoc',
  'Escrow Officer': 'Chuyen vien Ky quy',
  'Ethical Hacker': 'Hacker Dao duc',
  'Executive Director': 'Giam doc Dieu hanh',
  'Family Services Worker': 'Nhan vien Dich vu Gia dinh',
  'Fast Food Worker': 'Nhan vien Thuc an Nhanh',
  'Fence Installer': 'Tho lam Hang rao',
  'Fitness Center Manager': 'Quan ly Trung tam The duc',
  'Fitness Trainer': 'Huan luyen vien The hinh',
  'Floor Installer': 'Tho lop San',
  'Food Expeditor': 'Nhan vien Dieu phoi Mon an',
  'Food Safety Manager': 'Quan ly An toan Thuc pham',
  'Food Server': 'Nhan vien Phuc vu An uong',
  'Food Service Director': 'Giam doc Dich vu An uong',
  'Food Service Manager': 'Quan ly Dich vu An uong',
  'Food Service Worker': 'Nhan vien Dich vu An uong',
  'Food Stylist': 'Nha Tao hinh Thuc pham',
  'Food Truck Operator': 'Chu Xe ban do an',
  'Freight Broker': 'Moi gioi Van tai',
  'Front End Developer': 'Lap trinh vien Front End',
  'Full Stack Developer': 'Lap trinh vien Full Stack',
  'Game Developer': 'Lap trinh vien Game',
  'Go Developer': 'Lap trinh vien Go',
  'Grants Manager': 'Quan ly Tai tro',
  'Group Fitness Instructor': 'Huan luyen vien The duc Nhom',
  'Gym Trainer': 'Huan luyen vien Gym',
  'HR Assistant': 'Tro ly Nhan su',
  'HR Business Partner': 'Doi tac Kinh doanh Nhan su',
  'HR Coordinator': 'Dieu phoi vien Nhan su',
  'HR Director': 'Giam doc Nhan su',
  'HR Executive': 'Chuyen vien Nhan su Cao cap',
  'HR Manager': 'Quan ly Nhan su',
  'HR Recruiter': 'Chuyen vien Tuyen dung Nhan su',
  'Head Cook': 'Bep Truong',
  'Health Coach': 'Tu van Suc khoe',
  'Health Inspector': 'Thanh tra Y te',
  'Heavy Equipment Operator': 'Tho lai May cong trinh',
  'High School Teacher': 'Giao vien Trung hoc',
  'Home Inspector': 'Nhan vien Kiem dinh Nha',
  'Hospice Nurse': 'Y ta Cham soc Cuoi doi',
  'Hospital Housekeeper': 'Nhan vien Ve sinh Benh vien',
  'Hotel Front Desk Agent': 'Nhan vien Le tan Khach san',
  'Housekeeper': 'Nhan vien Buong phong',
  'IT Recruiter': 'Chuyen vien Tuyen dung IT',
  'IT Support Technician': 'Ky thuat vien Ho tro IT',
  'IT Technician': 'Ky thuat vien IT',
  'Illustrator': 'Hoa si Minh hoa',
  'Industrial Maintenance Technician': 'Ky thuat vien Bao tri Cong nghiep',
  'Instructional Coach': 'Chuyen vien Huong dan Giang day',
  'Insulation Worker': 'Tho Cach nhiet',
  'Intern': 'Thuc tap sinh',
  'Iron Worker': 'Tho Sat',
  'Ironworker': 'Tho Sat Thep',
  'Java Full Stack Developer': 'Lap trinh vien Java Full Stack',
  'JavaScript Developer': 'Lap trinh vien JavaScript',
  'Junior Developer': 'Lap trinh vien Junior',
  'Kitchen Helper': 'Phu bep',
  'Lab Assistant': 'Tro ly Phong thi nghiem',
  'iOS Developer': 'Lap trinh vien iOS',
};

// ─── CATEGORIES (English → Vietnamese) ──────────────────────────────────────

export const CATEGORIES = {
  Technology: 'Cong nghe',
  Healthcare: 'Y te',
  Trades: 'Nghe thu cong',
  Hospitality: 'Khach san',
  'Food Service': 'Dich vu An uong',
  Creative: 'Sang tao',
  Education: 'Giao duc',
  Government: 'Hanh chinh Cong',
  Finance: 'Tai chinh',
  Marketing: 'Marketing',
  Business: 'Kinh doanh',
  Engineering: 'Ky thuat',
  Sales: 'Ban hang',
  Legal: 'Phap ly',
  'Real Estate': 'Bat dong san',
  HR: 'Nhan su',
  Fitness: 'The duc The thao',
  Management: 'Quan ly',
  'Animal Care': 'Cham soc Dong vat',
  Logistics: 'Logistics',
  'Customer Service': 'Dich vu Khach hang',
  Administrative: 'Hanh chinh',
  Transportation: 'Van tai',
  Retail: 'Ban le',
  Cleaning: 'Ve sinh',
  'Social Services': 'Dich vu Xa hoi',
  Manufacturing: 'San xuat',
  Construction: 'Xay dung',
  Security: 'An ninh',
  Science: 'Khoa hoc',
  Events: 'Su kien',
  'Writing & Content': 'Viet va Noi dung',
  'Supply Chain': 'Chuoi cung ung',
  Research: 'Nghien cuu',
  Insurance: 'Bao hiem',
  Consulting: 'Tu van',
  Aviation: 'Hang khong',
  Automotive: 'O to',
  Media: 'Truyen thong',
  Maritime: 'Hang hai',
  'Law Enforcement': 'Luc luong Phap luat',
  'Entry-Level': 'Moi vao Nghe',
  Entertainment: 'Giai tri',
  Childcare: 'Cham soc Tre em',
  Beauty: 'Lam dep',
  Architecture: 'Kien truc',
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
  Technology: (job) => `Mot mau CV ${job} hieu qua khong chi don gian la liet ke cac cong nghe ban biet. CV can the hien kha nang giai quyet van de thuc te, luong hoa tac dong cua cong viec va chung minh ban hieu ro nhung thach thuc ky thuat cua vi tri ung tuyen.`,
  Healthcare: (job) => `Nha tuyen dung trong linh vuc y te tim kiem ung vien co the chung minh ca nang luc chuyen mon lan su tan tam voi suc khoe benh nhan. CV ${job} cua ban can can bang giua trinh do ky thuat va pham chat con nguoi.`,
  Finance: (job) => `Nha tuyen dung tai chinh uu tien nhung ung vien co kha nang bien du lieu phuc tap thanh quyet dinh chien luoc. CV ${job} cua ban can the hien tu duy phan tich sac ben, su chinh xac va kha nang phan doan trong cac van de tai chinh.`,
  Education: (job) => `Nha tuyen dung trong linh vuc giao duc tim kiem nhung chuyen gia co kha nang truyen cam hung hoc tap va thich ung voi nhu cau da dang cua hoc sinh. CV ${job} cua ban can phan anh nang luc su pham va cam ket vi su thanh cong cua nguoi hoc.`,
  'Food Service': (job) => `Nha tuyen dung nganh an uong danh gia cao su dang tin cay, tinh than lam viec nhom va niem dam me voi nghe. CV ${job} cua ban can lam noi bat ky nang am thuc va kha nang lam viec duoi ap luc cao.`,
  Hospitality: (job) => `Nganh khach san danh gia cao su nhiet tinh, chu dao va phong thai chuyen nghiep duoi ap luc. CV ${job} cua ban can phan anh dinh huong phuc vu va kha nang tao trai nghiem dang nho cho khach hang.`,
  Trades: (job) => `Nha tuyen dung danh gia cao nhung nguoi tho lanh nghe, co the lam viec doc lap va dam bao chat luong cong viec. CV ${job} cua ban can the hien kinh nghiem thuc hanh, y thuc an toan lao dong va kha nang xu ly tinh huong tai hien truong.`,
  Creative: (job) => `Nhung chuyen gia sang tao gioi nhat ket hop xuat sac giua nghe thuat va hieu biet ve nhu cau khach hang. CV ${job} cua ban can the hien tam nhin sang tao dong thoi chung minh tu duy thuong mai va kha nang hoan thanh du an dung tien do.`,
  Administrative: (job) => `Nha tuyen dung tim kiem ung vien co the du doan nhu cau, chu dong giai quyet van de va dam bao tinh bao mat. CV ${job} hieu qua the hien su xuat sac trong to chuc va kha nang dam bao moi hoat dong dien ra tron tru.`,
  Sales: (job) => `CV cua ban la ban chao hang dau tien, va nha tuyen dung se danh gia no nhu vay. Cach hieu qua nhat de xay dung CV ${job} la chung minh ban hieu thach thuc kinh doanh va co the dong gop vao muc tieu doanh thu.`,
  Marketing: (job) => `Marketing thay doi nhanh chong va nha tuyen dung tim kiem ung vien thanh thao ca chien luoc lan thuc thi. CV ${job} cua ban can chung minh kha nang tao ra ket qua do luong duoc bang su sang tao co chien luoc.`,
  HR: (job) => `Khac voi cac vi tri kinh doanh khac, cac vi tri nhan su yeu cau chung minh kha nang xu ly cac van de to chuc nhay cam dong thoi tao ra ket qua cu the cho doanh nghiep.`,
  'Customer Service': (job) => `Cac vi tri dich vu khach hang doi hoi ky nang giao tiep xuat sac va su dong cam chan thanh. CV ${job} cua ban can chung minh kha nang giai quyet van de hieu qua dong thoi duy tri moi quan he tot voi khach hang.`,
  Retail: (job) => `Nha tuyen dung ban le danh gia cao su dang tin cay, kien thuc san pham va nhiet tinh phuc vu khach hang. CV ${job} cua ban can the hien thanh tich ban hang va kha nang lam viec trong moi truong nang dong.`,
  Logistics: (job) => `Nha tuyen dung logistics uu tien hieu suat, do chinh xac va kha nang quan ly van hanh voi thoi han chat che. CV ${job} cua ban can the hien kinh nghiem quan ly kho hang, lap ke hoach va toi uu hoa quy trinh.`,
  Government: (job) => `Ung tuyen vao khu vuc cong doi hoi cach tiep can khac biet so voi khu vuc tu nhan. CV ${job} cua ban can dap ung truc tiep yeu cau cua vi tri, dong thoi the hien cam ket phuc vu cong dong va loi ich chung.`,
  Legal: (job) => `Linh vuc phap ly doi hoi su chinh xac tuyet doi va chu y ti mi den chi tiet. CV ${job} cua ban can phan anh tu duy nghiem tuc, am hieu phap luat va kha nang xu ly cac vu viec phuc tap.`,
  default: (job) => `Mot CV ${job} hieu qua tap trung vao nhung ket qua cu the chung minh kha nang tao ra gia tri ngay tu ngay dau tien. Ket hop kinh nghiem phu hop va nhiet huyet chan thanh voi vi tri mong muon.`,
};

// ─── TAGS GENERATOR ─────────────────────────────────────────────────────────

export function generateTags(jobTitle, slug) {
  const lower = jobTitle.toLowerCase();
  return [
    `cv ${lower}`,
    `mau cv ${lower}`,
    `cv xin viec ${lower}`,
    `tao cv ${lower}`,
    `mau cv xin viec chuyen nghiep`,
    `cv toi uu ats`,
    `mau cv mien phi`,
    `tao cv online`,
  ];
}

// ─── FAQ GENERATOR ──────────────────────────────────────────────────────────

export function generateFAQ(jobTitle) {
  const lower = jobTitle.toLowerCase();
  return [
    {
      question: `Nen dua nhung ky nang gi vao CV ${lower}?`,
      answer: `Hay dua vao cac ky nang chuyen mon truc tiep lien quan den vi tri ${lower}, cung voi cac ky nang mem nhu giao tiep va lam viec nhom. Su dung tu khoa tu mo ta cong viec va ho tro moi ky nang bang mot vi du cu the ve thanh tich nghe nghiep.`,
    },
    {
      question: `CV ${lower} nen dai bao nhieu?`,
      answer: `CV ${lower} nen goi gon trong mot trang doi voi nguoi moi di lam va trung cap, va co the mo rong den hai trang doi voi cap cao co tren 10 nam kinh nghiem. Uu tien chat luong noi dung hon so luong va dam bao moi thong tin deu mang lai gia tri.`,
    },
    {
      question: `Nen chon dinh dang CV nao cho vi tri ${lower}?`,
      answer: `Dinh dang thoi gian nguoc la phu hop nhat cho CV ${lower}, vi no the hien qua trinh phat trien nghe nghiep cua ban. Su dung mau CV chuyen nghiep tuong thich ATS voi cac phan ro rang: thong tin ca nhan, tom tat nghe nghiep, kinh nghiem, hoc van va ky nang.`,
    },
    {
      question: `Muc luong trung binh cua ${lower} la bao nhieu?`,
      answer: `Muc luong cua ${lower} thay doi tuy theo kinh nghiem, dia diem va quy mo cong ty. Tham khao du lieu cap nhat tren cac trang nhu Glassdoor, PayScale hoac VietnamWorks de co uoc tinh thuc te tai khu vuc cua ban. Neu dua thanh tich cu the vao CV, ban se co loi the khi dam phan luong.`,
    },
    {
      question: `CV ${lower} can bao gom nhung gi?`,
      answer: `Mot CV ${lower} day du can co: thong tin ca nhan, tom tat nghe nghiep an tuong, kinh nghiem lam viec voi thanh tich cu the, hoc van, chung chi lien quan va cac ky nang chinh. Tuy chinh moi phan theo yeu cau cu the cua vi tri ung tuyen.`,
    },
  ];
}

// ─── BODY GENERATOR ─────────────────────────────────────────────────────────

export function generateBody(jobTitle, category, keySkills, avgSalary, jobGrowth, slug) {
  const lower = jobTitle.toLowerCase();
  const skills = keySkills || [];
  const topSkills = skills.slice(0, 3).join(', ') || 'ky nang chuyen mon';
  const midSkills = skills.slice(3, 6).join(', ') || 'ky nang bo tro';
  const softSkills = skills.slice(6, 8).join(', ') || 'lam viec nhom, giao tiep';

  const norm = normalizeCategory(category);
  const opener = (CATEGORY_OPENERS[norm] || CATEGORY_OPENERS.default)(jobTitle);

  const relatedSlug1 = slug.includes('-') ? slug.split('-')[0] : slug;

  return `
## Cach Tao CV ${jobTitle} An Tuong

${opener}

Nha tuyen dung trung binh chi danh sau den bay giay de doc luot CV lan dau tien. Doi voi vi tri ${lower}, dieu nay co nghia la nhung ky nang quan trong nhat va thanh tich noi bat cua ban phai duoc nhin thay ngay lap tuc. Mot CV duoc trinh bay tot khong chi liet ke kinh nghiem — no ke cau chuyen ve hanh trinh nghe nghiep cua ban va chung minh gia tri ban mang den cho nha tuyen dung.

## Cac Mau Tom Tat Nghe Nghiep

### Moi Vao Nghe

${lower} nhiet huyet voi nen tang dao tao vung chac ve ${topSkills || 'cac ky nang chuyen nganh'}. Mong muon dong gop cho mot doi nhom nang dong va ap dung kien thuc da hoc vao moi truong lam viec chuyen nghiep. Duoc ghi nhan ve kha nang hoc hoi nhanh, tinh than to chuc va quyet tam dat duoc muc tieu.

### Trung Cap

${jobTitle} voi hon 5 nam kinh nghiem trong linh vuc ${topSkills}. Co thanh tich duoc chung minh trong viec cai tien quy trinh va hoan thanh du an dung tien do va ngan sach. Thanh thao ${midSkills || 'ky nang nang cao'}, voi kha nang huong dan nhan vien moi va dan dat cac sang kien cai tien lien tuc.

### Cap Cao

${jobTitle} cap cao voi hon 10 nam kinh nghiem trong nganh, duoc cong nhan ve chuyen mon trong ${topSkills} va ${midSkills || 'quan ly chien luoc'}. Da dan dat cac doi nhom da nang tren 15 nguoi va quan ly cac du an chien luoc mang lai hieu qua tiet kiem tren 500 trieu dong. Ky nang vuot troi trong ${softSkills || 'lanh dao va tam nhin chien luoc'}, voi thanh tich lien tuc vuot chi tieu.

## Muc Luong va Trien Vong Nghe Nghiep

Muc luong trung binh cua ${lower} vao khoang **${avgSalary || '$50,000'}** moi nam, voi bien do thay doi dang ke tuy theo kinh nghiem, vi tri dia ly va linh vuc hoat dong. Trien vong tang truong viec lam cho vi tri nay la **${jobGrowth || '+5%'}** trong nhung nam toi.

Nguoi moi bat dau co the ky vong muc luong khoi diem bang 70-80% muc trung binh, trong khi cac chuyen gia cap cao hoac chuyen sau co the vuot muc trung binh 40-60%. Cac thanh pho lon nhu TP. Ho Chi Minh va Ha Noi thuong co muc luong cao hon.

**Nguon tham khao:**
- [Bureau of Labor Statistics (BLS)](https://www.bls.gov/ooh/) — Du lieu chinh thuc ve viec lam va muc luong tai Hoa Ky
- [VietnamWorks](https://www.vietnamworks.com/) — Nen tang tuyen dung hang dau Viet Nam voi du lieu luong theo nganh
- [Glassdoor](https://www.glassdoor.com/Salaries/) — Muc luong do nhan vien bao cao va cac muc luong tham khao
- [PayScale](https://www.payscale.com/research/US/) — Nghien cuu muc luong va so sanh theo vi tri

*Muc luong thuc te thay doi tuy theo kinh nghiem, dia diem, nganh nghe va quy mo doanh nghiep.*

## Ky Nang Can Thiet Can Noi Bat

### Ky Nang Chuyen Mon
${skills.slice(0, 3).map(s => `- **${s}** — Ky nang cot loi cho moi ${lower}, duoc nha tuyen dung va he thong ATS uu tien tim kiem`).join('\n') || '- Thanh thao cac cong cu va cong nghe chuyen nganh\n- Hieu biet sau ve phuong phap va quy trinh trong linh vuc\n- Kha nang su dung thanh thao phan mem chuyen dung'}

### Ky Nang To Chuc
${skills.slice(3, 6).map(s => `- **${s}** — Ky nang duoc danh gia cao trong cong viec hang ngay cua ${lower}`).join('\n') || '- Quan ly thoi gian va xac dinh uu tien cong viec\n- To chuc va lap ke hoach du an\n- Nghiem tuc trong tuan thu quy trinh'}

### Ky Nang Giao Tiep
${skills.slice(6, 8).map(s => `- **${s}** — Pham chat giao tiep thiet yeu de thanh cong trong vai tro ${lower}`).join('\n') || '- Giao tiep bang van ban va loi noi\n- Lam viec nhom va hop tac'}
- Thich ung va lam viec hieu qua duoi ap luc
- Giai quyet xung dot va dam phan

## Thanh Tich Noi Bat Voi Con So Cu The

Hay su dung cac vi du nay lam tham khao de trinh bay thanh tich cua ban voi du lieu cu the:

- Cai thien **25%** hieu suat van hanh thong qua toi uu hoa quy trinh trong ${topSkills || 'ky nang cot loi'}, tao ra khoan tiet kiem dang ke hang nam
- Quan ly dong thoi **12+ du an** voi ty le hoan thanh dung han 98%, vuot chi tieu cua doi nhom
- Dao tao va huong dan **8 nhan vien moi**, giup giam thoi gian hoa nhap 40%
- Trien khai he thong ${skills[0] || 'quan ly'} moi giup giam sai sot **35%** va nang cao muc do hai long cua khach hang
- Tang doanh thu **20%** trong mot quy nho cac chien luoc sang tao trong ${skills[1] || 'phat trien'}
- Dat ty le hai long khach hang **95%** bang cach ap dung cai tien lien tuc dua tren phan hoi cua nguoi dung

## Dinh Dang va Meo Tao Mau CV ${jobTitle}

1. **Su dung dinh dang thoi gian nguoc** — Dat kinh nghiem gan nhat len dau. Day la dinh dang duoc nha tuyen dung va he thong ATS uu tien cho vi tri ${lower}.
2. **Tuy chinh tom tat nghe nghiep cho tung lan ung tuyen** — Su dung tu khoa tu mo ta cong viec va ca nhan hoa phan gioi thieu de chung minh ban hieu thach thuc cu the cua vai tro.
3. **Luong hoa thanh tich** — Con so thu hut su chu y va lam ket qua cua ban tro nen cu the. Uu tien "tang doanh so 30%" hon "cai thien ket qua kinh doanh".
4. **Trinh bay chuyen nghiep** — Su dung le 2.5cm, phong chu chuyen nghiep (Arial, Calibri) co 10-12 va cac phan duoc phan cach ro rang boi tieu de in dam.
5. **Ghi ro chung chi va dao tao lien quan** — Doi voi vi tri ${lower}, chung chi chuyen mon va dao tao lien tuc chung minh su cam ket phat trien ky nang cua ban.

## Loi Khuyen Tu Nha Tuyen Dung

> **Sai lam pho bien nhat ma toi thay trong CV ${lower} la thieu thanh tich cu the bang con so.** Nhieu ung vien mo ta nhiem vu hang ngay nhung khong bao gio cho thay tac dong thuc te cua cong viec.

Khi tuyen ${lower}, toi tim kiem bang chung ro rang ve hieu suat. Mot ung vien viet "Quan ly doi 5 nguoi" it an tuong hon nguoi viet "Dan dat doi 5 nguoi, dat 115% chi tieu quy trong 4 quy lien tiep". Moi dong trong phan kinh nghiem phai tra loi duoc cau hoi: thanh tich do luong duoc cua toi la gi?

Hay nho tuy chinh tu ngu theo nganh nghe. Nha tuyen dung chuyen ve ${category.toLowerCase()} se nhan ra ngay nhung tu ngu chung chung cua mot CV khong duoc ca nhan hoa.

## Cau Hoi Phong Van Thuong Gap Cho ${jobTitle}

### Ban co the mo ta mot du an phuc tap ma ban da hoan thanh khi lam ${lower}?

Nha tuyen dung muon danh gia kha nang xu ly cac tinh huong phuc tap cua ban. Trinh bay cau tra loi theo phuong phap STAR (Tinh huong, Nhiem vu, Hanh dong, Ket qua). Mo ta boi canh, vai tro cu the cua ban, hanh dong da thuc hien va ket qua do luong duoc.

### Ban xu ly ap luc cong viec hoac deadline gap nhu the nao trong vai tro ${lower}?

Hay chung minh kha nang sap xep uu tien va duy tri hieu suat duoi ap luc. Dua ra mot vi du cu the khi ban phai xu ly nhieu uu tien cung luc, giai thich phuong phap lam viec co he thong va chia se ket qua tich cuc dat duoc.

### Ky nang ky thuat manh nhat cua ban lien quan den vi tri ${lower} la gi?

Day la co hoi de lam noi bat chuyen mon trong ${topSkills || 'ky nang cot loi'}. Dung chi liet ke ky nang — hay minh hoa bang vi du cu the ve viec ap dung va ket qua dat duoc nho nhung ky nang nay.

### Ban cap nhat kien thuc nganh nghe nhu the nao?

Nha tuyen dung muon dam bao ban dau tu vao phat trien nghe nghiep lien tuc. Nhac den cac khoa hoc gan day, chung chi, hoi thao, an pham chuyen mon hoac cong dong ma ban tham gia tich cuc.

### Ban thay minh o dau sau 5 nam trong linh vuc ${lower}?

Hay cho thay ban co tam nhin ro rang ve su phat trien nghe nghiep. Trinh bay nhung hoai bao thuc te phu hop voi co hoi phat trien cua cong ty, dong thoi the hien cam ket lau dai voi nganh nghe.

## Nhung Sai Lam Can Tranh

### 1. Gui CV chung khong tuy chinh cho vi tri cu the

Gui cung mot CV cho moi lan ung tuyen la sai lam lon nhat. He thong ATS va nha tuyen dung nhan ra ngay mot CV khong duoc ca nhan hoa. Hay tuy chinh tom tat nghe nghiep va tu khoa cho moi vi tri ${lower} cu the.

### 2. Mo ta nhiem vu thay vi thanh tich

Liet ke nhiem vu hang ngay khong gay an tuong voi nha tuyen dung. Chuyen moi diem thanh mot ket qua do luong duoc. "Tra loi dien thoai khach hang" nen thanh "Xu ly trung binh 85 cuoc goi/ngay voi ty le giai quyet lan dau 92%".

### 3. Bo qua toi uu hoa ATS

Nhieu ung vien cho vi tri ${lower} bo lo co hoi vi CV khong vuot qua bo loc tu dong. Tranh bang bieu phuc tap, header/footer va do hoa ma he thong ATS khong doc duoc.

### 4. Dua thong tin loi thoi hoac khong lien quan

Kinh nghiem tu tren 15 nam truoc hoac khong lien quan den vi tri ${lower} lam nang ne CV cua ban. Tap trung vao 10 nam gan nhat va nhung kinh nghiem truc tiep lien quan den vi tri mong muon.

### 5. Khong su dung tu khoa chuyen nganh

Moi nganh deu co thuat ngu rieng. Doi voi vi tri ${lower}, thieu cac thuat ngu ky thuat cu the nhu ${topSkills || 'ky nang chuyen nganh'} co the cho thay su thieu chuyen mon trong mat nha tuyen dung.

## Toi Uu ATS Cho CV ${jobTitle}

He thong theo doi ung tuyen (ATS) loc CV truoc khi nha tuyen dung xem xet. De tang co hoi cho vi tri ${lower}:

- **Dung chinh xac tu khoa tu mo ta cong viec** — Neu tin tuyen dung nhac den "${skills[0] || 'ky nang cu the'}", hay su dung cach dien dat chinh xac nay trong CV cua ban
- **Su dung dinh dang don gian, de doc** — Tranh nhieu cot, bang va hop van ban gay roi parser ATS
- **Dat ky nang chinh o nhieu phan** — Nhac den ${topSkills || 'ky nang chinh'} trong tom tat nghe nghiep, kinh nghiem VA phan ky nang
- **Uu tien dinh dang PDF hoac DOCX** — Day la cac dinh dang duoc he thong ATS hien dai ho tro tot nhat
- **Ghi ca viet tat va tu day du** — Vi du: "Cong nghe Thong tin (CNTT)" de phu ca hai bien the tim kiem
- **Tranh header va footer** — Mot so he thong ATS khong doc noi dung dat o nhung khu vuc nay

## Tai Nguyen Bo Sung

Tham khao cac tai nguyen nay de hoan thien ho so ung tuyen ${lower}:

- [Kiem tra do tuong thich ATS cua CV](/vi/tools/ats-checker) — Kiem tra mien phi CV cua ban voi cong cu phan tich ATS
- [Cac mau CV chuyen nghiep](/vi/resume-examples) — Tham khao hang tram mau CV theo nganh nghe
- [Mau CV tuong thich ATS](/vi/templates) — Chon mau CV duoc toi uu de vuot qua bo loc tu dong

San sang tao CV ${lower} chuyen nghiep va toi uu ATS? Hay su dung [cong cu tao CV mien phi cua chung toi](/vi/builder) de tao CV hieu qua trong vai phut. Cac mau cua chung toi duoc toi uu cho he thong ATS va huong dan ban tung buoc trong viec viet tung phan.
`;
}
