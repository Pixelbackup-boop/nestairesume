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
  author: 'Nguyễn Minh Tuấn',
  authorBio: 'Chuyên gia tư vấn nghề nghiệp và viết CV với hơn 10 năm kinh nghiệm giúp người lao động Việt Nam tìm được công việc lý tưởng.',
  titlePattern: (job) => `CV ${job}: Mẫu CV Xin Việc & Hướng Dẫn 2026`,
  descriptionPattern: (job) => `Mẫu CV ${job.toLowerCase()} chuyên nghiệp với hướng dẫn chi tiết, ví dụ tóm tắt chuyên môn và mẹo từ chuyên gia 2026. Tạo CV xin việc miễn phí, tối ưu ATS, tải PDF ngay.`,
  imageAltPattern: (job) => `Mẫu CV ${job} Chuyên Nghiệp`,
};

// ─── JOB TITLES (English → Vietnamese) ──────────────────────────────────────

export const JOB_TITLES = {
  '3D Artist': 'Họa sĩ 3D',
  'AI Engineer': 'Kỹ sư AI',
  'AWS Cloud Engineer': 'Kỹ sư Đám mây AWS',
  'AWS Solution Architect': 'Kiến trúc sư Giải pháp AWS',
  'Academic Advisor': 'Cố vấn Học vụ',
  'Account Executive': 'Chuyên viên Kinh doanh',
  'Account Manager': 'Quản lý Tài khoản',
  'Accountant': 'Kế toán',
  'Accounting Assistant': 'Trợ lý Kế toán',
  'Accounting Clerk': 'Nhân viên Kế toán',
  'Accounting Intern': 'Thực tập sinh Kế toán',
  'Accounting Manager': 'Trưởng phòng Kế toán',
  'Acupuncturist': 'Bác sĩ Châm cứu',
  'Administrative Assistant': 'Trợ lý Hành chính',
  'Administrative Coordinator': 'Điều phối Hành chính',
  'Admissions Counselor': 'Tư vấn Tuyển sinh',
  'Advertising Manager': 'Quản lý Quảng cáo',
  'Aerospace Engineer': 'Kỹ sư Hàng không Vũ trụ',
  'Agricultural Engineer': 'Kỹ sư Nông nghiệp',
  'Air Traffic Controller': 'Kiểm soát viên Không lưu',
  'Aircraft Mechanic': 'Thợ máy bay',
  'Android Developer': 'Lập trình viên Android',
  'Anesthesiologist': 'Bác sĩ Gây mê',
  'Animal Caretaker': 'Nhân viên Chăm sóc Động vật',
  'Animator': 'Nhà làm Phim hoạt hình',
  'Application Support Engineer': 'Kỹ sư Hỗ trợ Ứng dụng',
  'Appraiser': 'Chuyên viên Thẩm định',
  'Apprentice Electrician': 'Học việc Điện',
  'Arborist': 'Chuyên gia Chăm sóc Cây xanh',
  'Architect': 'Kiến trúc sư',
  'Architectural Drafter': 'Họa viên Kiến trúc',
  'Art Director': 'Giám đốc Nghệ thuật',
  'Art Teacher': 'Giáo viên Mỹ thuật',
  'Assembler': 'Công nhân Lắp ráp',
  'Assistant Manager': 'Phó Quản lý',
  'Assistant Principal': 'Phó Hiệu trưởng',
  'Athletic Trainer': 'Huấn luyện viên Thể thao',
  'Audio Engineer': 'Kỹ sư Âm thanh',
  'Audit Manager': 'Trưởng phòng Kiểm toán',
  'Auditor': 'Kiểm toán viên',
  'Auto Body Technician': 'Kỹ thuật viên Sơn Ô tô',
  'Auto Mechanic': 'Thợ sửa Ô tô',
  'Automation Engineer': 'Kỹ sư Tự động hóa',
  'Automotive Engineer': 'Kỹ sư Ô tô',
  'Automotive Technician': 'Kỹ thuật viên Ô tô',
  'Aviation Maintenance Technician': 'Kỹ thuật viên Bảo trì Hàng không',
  'Back-End Developer': 'Lập trình viên Back-End',
  'Baker': 'Thợ làm Bánh',
  'Bank Teller': 'Giao dịch viên Ngân hàng',
  'Banker': 'Nhân viên Ngân hàng',
  'Banking Officer': 'Nhân viên Ngân hàng',
  'Barber': 'Thợ cắt tóc',
  'Barista': 'Nhân viên Pha chế',
  'Bartender': 'Nhân viên Bartender',
  'Beauty Advisor': 'Tư vấn viên Làm đẹp',
  'Behavioral Therapist': 'Chuyên viên Trị liệu Hành vi',
  'Bicycle Mechanic': 'Thợ sửa Xe đạp',
  'Billing Specialist': 'Chuyên viên Thanh toán',
  'Biomedical Engineer': 'Kỹ sư Y sinh',
  'Blockchain Developer': 'Lập trình viên Blockchain',
  'Bookkeeper': 'Nhân viên Sổ sách Kế toán',
  'Brand Manager': 'Quản lý Thương hiệu',
  'Budget Analyst': 'Chuyên viên Phân tích Ngân sách',
  'Building Engineer': 'Kỹ sư Xây dựng',
  'Building Inspector': 'Thanh tra Xây dựng',
  'Bus Driver': 'Tài xế Xe buýt',
  'Business Analyst': 'Chuyên viên Phân tích Kinh doanh',
  'Business Consultant': 'Tư vấn Kinh doanh',
  'Business Development Associate': 'Nhân viên Phát triển Kinh doanh',
  'Business Development Manager': 'Quản lý Phát triển Kinh doanh',
  'Business Intelligence Analyst': 'Chuyên viên Phân tích BI',
  'Business Manager': 'Quản lý Kinh doanh',
  'Business Owner': 'Chủ Doanh nghiệp',
  'Butcher': 'Thợ cắt Thịt',
  'Buyer': 'Chuyên viên Mua hàng',
  'CAD Designer': 'Thiết kế viên CAD',
  'CNA (Certified Nursing Assistant)': 'Trợ lý Y tá',
  'CNC Machinist': 'Thợ máy CNC',
  'COO (Chief Operating Officer)': 'Giám đốc Vận hành',
  'Cable Technician': 'Kỹ thuật viên Cáp',
  'Call Center Agent': 'Nhân viên Tổng đài',
  'Call Center Manager': 'Quản lý Tổng đài',
  'Camp Counselor': 'Hướng dẫn viên Trại hè',
  'Car Detailer': 'Nhân viên Chăm sóc Ô tô',
  'Car Salesperson': 'Nhân viên Bán Ô tô',
  'Cardiac Sonographer': 'Kỹ thuật viên Siêu âm Tim',
  'Cardiovascular Technologist': 'Kỹ thuật viên Tim mạch',
  'Caregiver': 'Người chăm sóc',
  'Carpenter': 'Thợ mộc',
  'Carpet Cleaner': 'Nhân viên Vệ sinh Thảm',
  'Cashier': 'Thu ngân',
  'Cement Mason': 'Thợ xi măng',
  'Certified Nursing Assistant': 'Trợ lý Y tá Có chứng chỉ',
  'Chef': 'Đầu bếp Trưởng',
  'Chief Accountant': 'Kế toán trưởng',
  'Chemical Engineer': 'Kỹ sư Hóa học',
  'Chiropractor': 'Bác sĩ Nắn chỉnh Xương khớp',
  'Civil Engineer': 'Kỹ sư Xây dựng Dân dụng',
  'Civil Construction Engineer': 'Kỹ sư Xây dựng',
  'Claims Adjuster': 'Chuyên viên Giám định Bồi thường',
  'Claims Analyst': 'Chuyên viên Phân tích Bồi thường',
  'Cleaner': 'Nhân viên Vệ sinh',
  'Clinical Research Associate': 'Chuyên viên Nghiên cứu Lâm sàng',
  'Cloud Architect': 'Kiến trúc sư Đám mây',
  'Cloud Engineer': 'Kỹ sư Đám mây',
  'Coach': 'Huấn luyện viên',
  'Collections Specialist': 'Chuyên viên Thu hồi Nợ',
  'Communications Director': 'Giám đốc Truyền thông',
  'Communications Manager': 'Quản lý Truyền thông',
  'Community Health Worker': 'Nhân viên Y tế Cộng đồng',
  'Community Manager': 'Quản lý Cộng đồng',
  'Compliance Analyst': 'Chuyên viên Phân tích Tuân thủ',
  'Compliance Manager': 'Quản lý Tuân thủ',
  'Compliance Officer': 'Chuyên viên Tuân thủ',
  'Computer Technician': 'Kỹ thuật viên Máy tính',
  'Concierge': 'Nhân viên Lễ tân',
  'Concrete Finisher': 'Thợ hoàn thiện Bê tông',
  'Construction Engineer': 'Kỹ sư Thi công',
  'Construction Manager': 'Quản lý Công trình',
  'Construction Worker': 'Công nhân Xây dựng',
  'Consultant': 'Tư vấn viên',
  'Content Creator': 'Nhà Sáng tạo Nội dung',
  'Content Marketing Manager': 'Quản lý Content Marketing',
  'Content Marketing Specialist': 'Nhân viên Content Marketing',
  'Content Strategist': 'Chuyên gia Chiến lược Nội dung',
  'Content Writer': 'Nhân viên Viết Nội dung',
  'Contract Specialist': 'Chuyên viên Hợp đồng',
  'Controller': 'Kế toán Trưởng',
  'Copywriter': 'Copywriter',
  'Corporate Recruiter': 'Chuyên viên Tuyển dụng',
  'Correctional Officer': 'Cán bộ Quản giáo',
  'Cosmetologist': 'Chuyên viên Thẩm mỹ',
  'Counselor': 'Tư vấn viên Tâm lý',
  'Courier': 'Nhân viên Giao hàng',
  'Court Clerk': 'Thư ký Tòa án',
  'Crane Operator': 'Thợ lái Cẩu trục',
  'Credit Analyst': 'Chuyên viên Phân tích Tín dụng',
  'Curriculum Designer': 'Chuyên viên Thiết kế Chương trình Học',
  'Customer Service Manager': 'Quản lý Dịch vụ Khách hàng',
  'Customer Service Representative': 'Nhân viên Dịch vụ Khách hàng',
  'Customer Success Manager': 'Quản lý Thành công Khách hàng',
  'Customs Broker': 'Nhân viên Hải quan',
  'Cybersecurity Analyst': 'Chuyên viên Phân tích An ninh Mạng',
  'Data Analyst': 'Chuyên viên Phân tích Dữ liệu',
  'Data Architect': 'Kiến trúc sư Dữ liệu',
  'Data Engineer': 'Kỹ sư Dữ liệu',
  'Data Entry Clerk': 'Nhân viên Nhập liệu',
  'Data Scientist': 'Nhà Khoa học Dữ liệu',
  'Database Administrator': 'Quản trị Cơ sở Dữ liệu',
  'Dental Assistant': 'Trợ lý Nha khoa',
  'Dental Hygienist': 'Kỹ thuật viên Vệ sinh Răng',
  'Dentist': 'Nha sĩ',
  'Deputy Sheriff': 'Phó Cảnh sát Trưởng',
  'Desktop Support Engineer': 'Kỹ sư Hỗ trợ Máy tính',
  'Desktop Support Specialist': 'Chuyên viên Hỗ trợ Máy tính',
  'Detailer': 'Nhân viên Chăm sóc Chi tiết',
  'DevOps Engineer': 'Kỹ sư DevOps',
  'Diesel Mechanic': 'Thợ máy Diesel',
  'Diesel Technician': 'Kỹ thuật viên Diesel',
  'Dietitian': 'Chuyên gia Dinh dưỡng',
  'Digital Marketing Manager': 'Quản lý Marketing Số',
  'Digital Marketing Specialist': 'Chuyên viên Marketing Số',
  'Director of Operations': 'Giám đốc Vận hành',
  'Dishwasher': 'Nhân viên Rửa bát',
  'Dispatcher': 'Nhân viên Điều phối',
  'Dog Groomer': 'Nhân viên Chăm sóc Thú cưng',
  'Dog Walker': 'Người dắt chó Đi dạo',
  'Drafter': 'Họa viên Kỹ thuật',
  'Drywall Installer': 'Thợ Thạch cao',
  'Early Childhood Educator': 'Giáo viên Mầm non',
  'ESL Teacher': 'Giáo viên Tiếng Anh',
  'Electrical Engineer': 'Kỹ sư Điện',
  'Electrician': 'Thợ điện',
  'Embedded Software Engineer': 'Kỹ sư Phần mềm Nhúng',
  'Emergency Medical Technician (EMT)': 'Nhân viên Cấp cứu',
  'Engineering Manager': 'Quản lý Kỹ thuật',
  'Entrepreneur': 'Doanh nhân',
  'Environmental Consultant': 'Tư vấn Môi trường',
  'Environmental Engineer': 'Kỹ sư Môi trường',
  'Environmental Scientist': 'Nhà Khoa học Môi trường',
  'Esthetician': 'Chuyên viên Chăm sóc Da',
  'Event Coordinator': 'Điều phối viên Sự kiện',
  'Event Manager': 'Quản lý Sự kiện',
  'Event Planner': 'Chuyên viên To chuc Sự kiện',
  'Executive Assistant': 'Trợ lý Giám đốc',
  'Executive Chef': 'Bếp Trưởng',
  'Exercise Physiologist': 'Chuyên gia Sinh lý Vận động',
  'Expeditor': 'Nhân viên Xử lý Đơn hàng',
  'Eyewear Sales Associate': 'Nhân viên Ban Kính mắt',
  'Export Import Specialist': 'Nhân viên Xuất nhập khẩu',
  'Facilities Manager': 'Quản lý Cơ sở Vật chất',
  'Factory Worker': 'Công nhân Nhà máy',
  'Factory Production Worker': 'Công nhân Nhà máy',
  'Fashion Designer': 'Nhà Thiết kế Thời trang',
  'Field Engineer': 'Kỹ sư Hiện trường',
  'Field Service Technician': 'Kỹ thuật viên Dịch vụ Hiện trường',
  'Film Director': 'Đạo diễn Phim',
  'Finance Manager': 'Quản lý Tài chính',
  'Financial Advisor': 'Tư vấn Tài chính',
  'Financial Analyst': 'Chuyên viên Phân tích Tài chính',
  'Financial Controller': 'Kiểm soát viên Tài chính',
  'Financial Planner': 'Chuyên viên Lập Kế hoạch Tài chính',
  'Fire Inspector': 'Thanh tra Phòng cháy',
  'Firefighter': 'Lính cứu hỏa',
  'Fitness Instructor': 'Huấn luyện viên Thể dục',
  'Flight Attendant': 'Tiếp viên Hàng không',
  'Florist': 'Nhân viên Cắm hoa',
  'Food Runner': 'Nhân viên Phục vụ Món ăn',
  'Food Scientist': 'Nhà Khoa học Thực phẩm',
  'Forklift Operator': 'Thợ lái Xe nâng',
  'Freelance Writer': 'Nhà văn Tự do',
  'Front Desk Agent': 'Nhân viên Lễ tân',
  'Front Desk Receptionist': 'Lễ tân',
  'Front-End Developer': 'Lập trình viên Front-End',
  'Full-Stack Developer': 'Lập trình viên Full-Stack',
  'Funeral Director': 'Quản lý Tang lễ',
  'Game Designer': 'Nhà Thiết kế Game',
  'General Manager': 'Tổng Quản lý',
  'GIS Analyst': 'Chuyên viên Phân tích GIS',
  'Glazier': 'Thợ Kính',
  'Golf Course Superintendent': 'Quản lý Sân Golf',
  'Graphic Designer': 'Thiết kế Đồ họa',
  'Guidance Counselor': 'Tư vấn Hướng nghiệp',
  'Gym Manager': 'Quản lý Phòng tập',
  'HVAC Technician': 'Kỹ thuật viên Điều hòa',
  'Hair Stylist': 'Nhà Tạo mẫu Tóc',
  'Head Chef': 'Bếp Trưởng',
  'Health Educator': 'Giảng viên Y tế',
  'Healthcare Administrator': 'Quản lý Y tế',
  'Help Desk Technician': 'Kỹ thuật viên Hỗ trợ CNTT',
  'Home Health Aide': 'Nhân viên Chăm sóc Sức khỏe tại Nhà',
  'Horticulturist': 'Chuyên gia Làm vườn',
  'Hospital Administrator': 'Quản lý Bệnh viện',
  'Hospitality Manager': 'Quản lý Khách sạn',
  'Host/Hostess': 'Nhân viên Đón khách',
  'Hotel Manager': 'Quản lý Khách sạn',
  'House Cleaner': 'Nhân viên Dọn dẹp',
  'Housekeeping Manager': 'Quản lý Buồng phòng',
  'Housekeeping Supervisor': 'Giám sát Buồng phòng',
  'IT Auditor': 'Kiểm toán viên CNTT',
  'IT Consultant': 'Tư vấn CNTT',
  'IT Director': 'Giám đốc CNTT',
  'IT Manager': 'Quản lý CNTT',
  'IT Project Manager': 'Quản lý Dự án CNTT',
  'IT Specialist': 'Chuyên viên CNTT',
  'IT Support Specialist': 'Chuyên viên Hỗ trợ CNTT',
  'Immigration Paralegal': 'Trợ lý Luật Di trú',
  'Industrial Designer': 'Nhà Thiết kế Công nghiệp',
  'Industrial Engineer': 'Kỹ sư Công nghiệp',
  'Information Security Analyst': 'Chuyên viên An ninh Thông tin',
  'Information Technology Manager': 'Quản lý Công nghệ Thông tin',
  'Inside Sales Representative': 'Nhân viên Bán hàng Nội bộ',
  'Instructional Designer': 'Chuyên viên Thiết kế Giảng dạy',
  'Insurance Agent': 'Đại lý Bảo hiểm',
  'Insurance Underwriter': 'Chuyên viên Bảo hiểm',
  'Interior Designer': 'Nhà Thiết kế Nội thất',
  'Interpreter': 'Phiên dịch viên',
  'Inventory Manager': 'Quản lý Kho',
  'Investment Analyst': 'Chuyên viên Phân tích Đầu tư',
  'Investment Banker': 'Nhân viên Ngân hàng Đầu tư',
  'Janitor': 'Nhân viên Tạp vụ',
  'Java Developer': 'Lập trình viên Java',
  'Jeweler': 'Thợ Kim hoàn',
  'Journalist': 'Nhà Báo',
  'Junior Accountant': 'Nhân viên Kế toán',
  'Juvenile Probation Officer': 'Cán bộ Giám sát Vị thành niên',
  'Kindergarten Teacher': 'Giáo viên Mẫu giáo',
  'Kitchen Manager': 'Quản lý Bếp',
  'Lab Technician': 'Kỹ thuật viên Phòng thí nghiệm',
  'Landscape Architect': 'Kiến trúc sư Cảnh quan',
  'Landscaper': 'Nhân viên Chăm sóc Sân vườn',
  'Law Clerk': 'Thư ký Pháp lý',
  'Lawyer': 'Luật sư',
  'Lead Teacher': 'Giáo viên Chủ nhiệm',
  'Leasing Consultant': 'Tư vấn viên Chó thuê',
  'Legal Analyst': 'Chuyên viên Phân tích Pháp lý',
  'Legal Assistant': 'Trợ lý Pháp lý',
  'Legal Secretary': 'Thư ký Pháp lý',
  'Legislative Aide': 'Trợ lý Lập pháp',
  'Librarian': 'Thủ thư',
  'Library Assistant': 'Trợ lý Thư viện',
  'Licensed Practical Nurse (LPN)': 'Y tá Thực hành',
  'Licensed Pharmacist': 'Dược sĩ',
  'Limousine Driver': 'Tài xế Limousine',
  'Line Cook': 'Đầu bếp Dây chuyền',
  'Litigation Support Specialist': 'Chuyên viên Hỗ trợ Tranh tụng',
  'Loan Officer': 'Chuyên viên Tín dụng',
  'Loan Processor': 'Nhân viên Xử lý Tín dụng',
  'Locksmith': 'Thợ Khóa',
  'Logistics Coordinator': 'Điều phối viên Logistics',
  'Logistics Manager': 'Quản lý Logistics',
  'Logistics Specialist': 'Chuyên viên Logistics',
  'Long Haul Truck Driver': 'Tài xế Đường dài',
  'Loss Prevention Specialist': 'Chuyên viên Phòng chống Thất thoát',
  'MRI Technologist': 'Kỹ thuật viên MRI',
  'Machine Learning Engineer': 'Kỹ sư Machine Learning',
  'Machine Learning Specialist': 'Chuyên viên Machine Learning',
  'Machine Operator': 'Thợ vận hành Máy',
  'Maintenance Engineer': 'Kỹ sư Bảo trì',
  'Maintenance Manager': 'Quản lý Bảo trì',
  'Maintenance Technician': 'Kỹ thuật viên Bảo trì',
  'Makeup Artist': 'Chuyên viên Trang điểm',
  'Management Consultant': 'Tư vấn Quản lý',
  'Manufacturing Engineer': 'Kỹ sư Sản xuất',
  'Manufacturing Worker': 'Công nhân Sản xuất',
  'Marketing Analyst': 'Chuyên viên Phân tích Marketing',
  'Marketing Assistant': 'Trợ lý Marketing',
  'Marketing Coordinator': 'Điều phối viên Marketing',
  'Marketing Director': 'Giám đốc Marketing',
  'Marketing Executive': 'Chuyên viên Marketing Cao cấp',
  'Marketing Intern': 'Thực tập sinh Marketing',
  'Marketing Manager': 'Quản lý Marketing',
  'Marketing Specialist': 'Chuyên viên Marketing',
  'Mason': 'Thợ xây',
  'Massage Therapist': 'Chuyên viên Massage',
  'Material Handler': 'Nhân viên Xử lý Vật tư',
  'Mechanical Design Engineer': 'Kỹ sư Thiết kế Cơ khí',
  'Mechanical Engineer': 'Kỹ sư Cơ khí',
  'Mechanical Technician': 'Kỹ thuật viên Cơ khí',
  'Mediator': 'Hòa giải viên',
  'Medical Assistant': 'Trợ lý Y tế',
  'Medical Billing Specialist': 'Chuyên viên Thanh toán Y tế',
  'Medical Coder': 'Chuyên viên Mã hóa Y tế',
  'Medical Lab Technician': 'Kỹ thuật viên Xét nghiệm',
  'Medical Office Assistant': 'Trợ lý Văn phòng Y tế',
  'Medical Receptionist': 'Lễ tân Phòng khám',
  'Medical Representative': 'Trình dược viên',
  'Medical Scribe': 'Thư ký Y khoa',
  'Medical Technologist': 'Chuyên viên Công nghệ Y tế',
  'Mental Health Counselor': 'Tư vấn viên Sức khỏe Tâm thần',
  'Millwright': 'Kỹ thuật viên Lắp máy',
  'Mobile Developer': 'Lập trình viên Mobile',
  'Mortgage Loan Officer': 'Chuyên viên Chó vay Thế chấp',
  'Motion Graphics Designer': 'Thiết kế Motion Graphics',
  'Moving Company Driver': 'Tài xế Chuyển nhà',
  'Music Producer': 'Nhà Sản xuất Âm nhạc',
  'Nanny': 'Người giữ trẻ',
  'Network Administrator': 'Quản trị Mạng',
  'Network Engineer': 'Kỹ sư Mạng',
  'Night Auditor': 'Kiểm toán viên Ca đêm',
  'Node.js Developer': 'Lập trình viên Node.js',
  'Nurse': 'Y tá',
  'Nurse Practitioner': 'Y tá Chuyên khoa',
  'Nursing Assistant': 'Trợ lý Y tá',
  'Nutritionist': 'Chuyên gia Dinh dưỡng',
  'Occupational Therapist': 'Chuyên viên Vật lý Trị liệu',
  'Occupational Therapy Assistant': 'Trợ lý Vật lý Trị liệu',
  'Office Administrator': 'Quản trị Văn phòng',
  'Office Assistant': 'Trợ lý Văn phòng',
  'Office Clerk': 'Nhân viên Văn phòng',
  'Office Manager': 'Quản lý Văn phòng',
  'Operations Analyst': 'Chuyên viên Phân tích Vận hành',
  'Operations Manager': 'Quản lý Vận hành',
  'Optician': 'Kỹ thuật viên Kính mắt',
  'Optometrist': 'Bác sĩ Khúc xạ',
  'Painter': 'Thợ sơn',
  'Paralegal': 'Trợ lý Luật sư',
  'Paramedic': 'Nhân viên Cấp cứu',
  'Park Ranger': 'Kiểm lâm',
  'Pastry Chef': 'Đầu bếp Bánh ngọt',
  'Payroll Specialist': 'Chuyên viên Tính lương',
  'Penetration Tester': 'Chuyên viên Kiểm thử Xâm nhập',
  'Personal Trainer': 'Huấn luyện viên Cá nhân',
  'Pest Control Technician': 'Kỹ thuật viên Diệt côn trùng',
  'Pet Groomer': 'Nhân viên Chăm sóc Thú cưng',
  'Pet Sitter': 'Người trông thú cưng',
  'Pharmacist': 'Dược sĩ',
  'Pharmacy Assistant': 'Trợ lý Nhà thuốc',
  'Pharmacy Tech': 'Kỹ thuật viên Dược',
  'Pharmacy Technician': 'Kỹ thuật viên Dược',
  'Phlebotomist': 'Kỹ thuật viên Lấy máu',
  'Photographer': 'Nhiếp ảnh gia',
  'Physical Therapist': 'Chuyên viên Vật lý Trị liệu',
  'Physical Therapy Assistant': 'Trợ lý Vật lý Trị liệu',
  'Physician Assistant': 'Trợ lý Bác sĩ',
  'Pilates Instructor': 'Huấn luyện viên Pilates',
  'Pizza Maker': 'Thợ làm Pizza',
  'Platform Engineer': 'Kỹ sư Platform',
  'Plumber': 'Thợ nước',
  'Police Officer': 'Cảnh sát',
  'Policy Analyst': 'Chuyên viên Phân tích Chính sách',
  'Pool Cleaner': 'Nhân viên Vệ sinh Hồ bơi',
  'Pool Technician': 'Kỹ thuật viên Hồ bơi',
  'Postal Worker': 'Nhân viên Bưu điện',
  'Power BI Developer': 'Lập trình viên Power BI',
  'Prep Cook': 'Phụ bếp',
  'Preschool Teacher': 'Giáo viên Mầm non',
  'Pressure Washer': 'Nhân viên Rửa áp lực',
  'Probation Officer': 'Cán bộ Giám sát',
  'Process Engineer': 'Kỹ sư Quy trình',
  'Procurement Manager': 'Quản lý Mua sắm',
  'Procurement Specialist': 'Chuyên viên Mua sắm',
  'Product Analyst': 'Chuyên viên Phân tích Sản phẩm',
  'Product Designer': 'Nhà Thiết kế Sản phẩm',
  'Product Manager': 'Quản lý Sản phẩm',
  'Product Marketing Manager': 'Quản lý Marketing Sản phẩm',
  'Product Owner': 'Product Owner',
  'Production Assistant': 'Trợ lý Sản xuất',
  'Production Engineer': 'Kỹ sư Sản xuất',
  'Production Manager': 'Quản lý Sản xuất',
  'Production Worker': 'Công nhân Sản xuất',
  'Program Coordinator': 'Điều phối viên Chương trình',
  'Project Coordinator': 'Điều phối viên Dự án',
  'Project Engineer': 'Kỹ sư Dự án',
  'Project Manager': 'Quản lý Dự án',
  'Prompt Engineer': 'Kỹ sư Prompt',
  'Property Manager': 'Quản lý Bất động sản',
  'Psychiatrist': 'Bác sĩ Tâm thần',
  'Psychologist': 'Chuyên gia Tâm lý',
  'Public Administration Officer': 'Nhân viên Hành chính công',
  'Public Affairs Specialist': 'Chuyên viên Đối ngoại',
  'Public Health Inspector': 'Thanh tra Y tế Cộng đồng',
  'Python Developer': 'Lập trình viên Python',
  'QA Analyst': 'Chuyên viên Phân tích QA',
  'QA Engineer': 'Kỹ sư QA',
  'QA Manager': 'Quản lý QA',
  'QA Tester': 'Nhân viên Kiểm thử QA',
  'QC QA Specialist': 'Nhân viên QC/QA',
  'Quality Analyst': 'Chuyên viên Phân tích Chất lượng',
  'Quality Assurance Specialist': 'Chuyên viên Đảm bảo Chất lượng',
  'Quality Control Inspector': 'Thanh tra Kiểm soát Chất lượng',
  'Quality Engineer': 'Kỹ sư Chất lượng',
  'Quality Manager': 'Quản lý Chất lượng',
  'Radiologic Technologist': 'Kỹ thuật viên X-quang',
  'React Developer': 'Lập trình viên React',
  'Reading Specialist': 'Chuyên viên Đọc',
  'Real Estate Agent': 'Môi giới Bất động sản',
  'Real Estate Appraiser': 'Thẩm định viên Bất động sản',
  'Real Estate Assistant': 'Trợ lý Bất động sản',
  'Real Estate Attorney': 'Luật sư Bất động sản',
  'Real Estate Investor': 'Nhà Đầu tư Bất động sản',
  'Real Estate Sales Agent': 'Nhân viên Kinh doanh Bất động sản',
  'Receptionist': 'Lễ tân',
  'Recreation Coordinator': 'Điều phối viên Giải trí',
  'Recruiter': 'Chuyên viên Tuyển dụng',
  'Recruiting Coordinator': 'Điều phối viên Tuyển dụng',
  'Registered Nurse': 'Điều dưỡng',
  'Release Engineer': 'Kỹ sư Release',
  'Research Analyst': 'Chuyên viên Phân tích Nghiên cứu',
  'Research Assistant': 'Trợ lý Nghiên cứu',
  'Reservation Agent': 'Nhân viên Đặt phòng',
  'Resident Assistant': 'Trợ lý Ký túc xá',
  'Residential Cleaner': 'Nhân viên Vệ sinh Nhà ở',
  'Respiratory Therapist': 'Chuyên viên Trị liệu Hô hấp',
  'Restaurant Manager': 'Quản lý Nhà hàng',
  'Retail Assistant': 'Nhân viên Bán lẻ',
  'Retail Associate': 'Nhân viên Bán hàng',
  'Retail Manager': 'Quản lý Cửa hàng',
  'Retail Sales Associate': 'Nhân viên Bán hàng Lẻ',
  'Retail Store Manager': 'Quản lý Cửa hàng Bán lẻ',
  'Risk Management Specialist': 'Chuyên viên Quản lý Rủi ro',
  'Roofer': 'Thợ lợp Mái',
  'Rust Developer': 'Lập trình viên Rust',
  'SAP Consultant': 'Tư vấn SAP',
  'SOC Analyst': 'Chuyên viên Phân tích SOC',
  'Sales Assistant': 'Trợ lý Bán hàng',
  'Sales Associate': 'Nhân viên Bán hàng',
  'Sales Consultant': 'Tư vấn Bán hàng',
  'Sales Coordinator': 'Điều phối viên Bán hàng',
  'Sales Director': 'Giám đốc Bán hàng',
  'Sales Engineer': 'Kỹ sư Bán hàng',
  'Sales Executive': 'Chuyên viên Kinh doanh',
  'Sales Manager': 'Quản lý Bán hàng',
  'Sales Representative': 'Đại diện Bán hàng',
  'Salesforce Administrator': 'Quản trị viên Salesforce',
  'School Administrator': 'Quản lý Trường học',
  'School Counselor': 'Tư vấn Học đường',
  'Scrum Master': 'Scrum Master',
  'Seaman': 'Thủy thủ',
  'Security Analyst': 'Chuyên viên Phân tích An ninh',
  'Security Engineer': 'Kỹ sư An ninh',
  'Security Guard': 'Bảo vệ',
  'Security Officer': 'Nhân viên An ninh',
  'Server': 'Nhân viên Phục vụ',
  'Service Advisor': 'Tư vấn Dịch vụ',
  'Service Crew': 'Nhân viên Phục vụ',
  'Set Designer': 'Nhà Thiết kế Sân khấu',
  'Sheet Metal Worker': 'Thợ Kim loại Tấm',
  'Shipping & Receiving Clerk': 'Nhân viên Xuất nhập hàng',
  'Site Engineer': 'Kỹ sư Công trường',
  'Site Reliability Engineer': 'Kỹ sư SRE',
  'Small Business Owner': 'Chủ Doanh nghiệp Nhỏ',
  'Social Media Coordinator': 'Điều phối viên Mạng xã hội',
  'Social Media Manager': 'Quản lý Mạng xã hội',
  'Social Media Specialist': 'Chuyên viên Mạng xã hội',
  'Social Worker': 'Nhân viên Công tác Xã hội',
  'Software Architect': 'Kiến trúc sư Phần mềm',
  'Software Developer': 'Lập trình viên',
  'Software Engineer': 'Kỹ sư Phần mềm',
  'Software Tester': 'Nhân viên Kiểm thử Phần mềm',
  'Solar Installer': 'Kỹ thuật viên Pin mặt trời',
  'Solution Architect': 'Kiến trúc sư Giải pháp',
  'Solutions Engineer': 'Kỹ sư Giải pháp',
  'Sommelier': 'Chuyên gia Rượu vang',
  'Sous Chef': 'Phó Bếp trưởng',
  'Spa Manager': 'Quản lý Spa',
  'Special Education Teacher': 'Giáo viên Giáo dục Đặc biệt',
  'Speech-Language Pathologist': 'Chuyên viên Âm ngữ Trị liệu',
  'Sports Coach': 'Huấn luyện viên Thể thao',
  'Stage Manager': 'Quản lý Sân khấu',
  'Sterile Processing Technician': 'Kỹ thuật viên Tiệt trùng',
  'Store Associate': 'Nhân viên Cửa hàng',
  'Store Manager': 'Quản lý Cửa hàng',
  'Storyboard Artist': 'Họa sĩ Storyboard',
  'Substance Abuse Counselor': 'Tư vấn viên Cai nghiện',
  'Supply Chain Analyst': 'Chuyên viên Phân tích Chuỗi cung ứng',
  'Supply Chain Manager': 'Quản lý Chuỗi cung ứng',
  'Support Worker': 'Nhân viên Hỗ trợ',
  'Surgical Technologist': 'Kỹ thuật viên Phẫu thuật',
  'Sushi Chef': 'Đầu bếp Sushi',
  'System Administrator': 'Quản trị Hệ thống',
  'System Analyst': 'Chuyên viên Phân tích Hệ thống',
  'System Engineer': 'Kỹ sư Hệ thống',
  'TSA Agent': 'Nhân viên An ninh Sân bay',
  'Talent Acquisition Specialist': 'Chuyên viên Tuyển dụng Nhân tài',
  'Teacher': 'Giáo viên',
  'Teaching Assistant': 'Trợ giảng',
  'Team Leader': 'Trưởng nhóm',
  'Tech Sales Representative': 'Đại diện Bán hàng Công nghệ',
  'Technical Program Manager': 'Quản lý Chương trình Kỹ thuật',
  'Technical Recruiter': 'Chuyên viên Tuyển dụng IT',
  'Technical Support Specialist': 'Chuyên viên Hỗ trợ Kỹ thuật',
  'Technical Writer': 'Chuyên viên Viết Tài liệu Kỹ thuật',
  'Telesales Agent': 'Nhân viên Telesales',
  'Therapist': 'Chuyên viên Trị liệu',
  'Title Examiner': 'Chuyên viên Kiểm tra Giấy tờ',
  'Tour Guide': 'Hướng dẫn viên Du lịch',
  'Travel Agent': 'Đại lý Du lịch',
  'Truck Driver': 'Tài xế Xe tải',
  'Tutor': 'Gia sư',
  'UI Designer': 'Thiết kế UI',
  'UX Designer': 'Thiết kế UX',
  'UX Researcher': 'Nghiên cứu viên UX',
  'Ultrasound Technician': 'Kỹ thuật viên Siêu âm',
  'Valet Attendant': 'Nhân viên Đậu xe',
  'Veterans Service Officer': 'Chuyên viên Hỗ trợ Cựu chiến binh',
  'Veterinary Assistant': 'Trợ lý Thú y',
  'Veterinary Technician': 'Kỹ thuật viên Thú y',
  'Video Editor': 'Biên tập viên Video',
  'Videographer': 'Quay phim',
  'Virtual Assistant': 'Trợ lý Ảo',
  'Voice Actor': 'Diễn viên Lồng tiếng',
  'Waiter/Waitress': 'Nhân viên Phục vụ',
  'Warehouse Associate': 'Nhân viên Kho',
  'Warehouse Manager': 'Quản lý Kho',
  'Warehouse Worker': 'Công nhân Kho',
  'Web Designer': 'Thiết kế Web',
  'Web Developer': 'Lập trình viên Web',
  'Welder': 'Thợ Hàn',
  'Wellness Coach': 'Chuyên gia Sức khỏe',
  'Wildlife Biologist': 'Nhà Sinh vật học Hoang dã',
  'Wind Turbine Technician': 'Kỹ thuật viên Tua bin Gió',
  'Window Cleaner': 'Nhân viên Lau kính',
  'X-Ray Technician': 'Kỹ thuật viên X-quang',
  'Yoga Instructor': 'Huấn luyện viên Yoga',
  'Youth Counselor': 'Tư vấn viên Thanh thiếu niên',
  'Zookeeper': 'Nhân viên Chăm sóc Sở thú',
  'Accounts Payable Specialist': 'Chuyên viên Công nợ Phải trả',
  'Accounts Receivable Specialist': 'Chuyên viên Công nợ Phải thu',
  'Animal Control Officer': 'Nhân viên Kiểm soát Động vật',
  'Animal Shelter Worker': 'Nhân viên Trại Cứu trợ Động vật',
  'Appliance Repair Technician': 'Kỹ thuật viên Sửa chữa Thiết bị',
  'Aquarium Keeper': 'Nhân viên Chăm sóc Thủy cung',
  'Arbitrator': 'Trọng tài viên',
  'Assistant Director': 'Phó Giám đốc',
  'Assistant Property Manager': 'Trợ lý Quản lý Bất động sản',
  'Assistant Store Manager': 'Phó Quản lý Cửa hàng',
  'Backend Developer': 'Lập trình viên Backend',
  'Bank Manager': 'Giám đốc Ngân hàng',
  'Banquet Chef': 'Đầu bếp Tiệc',
  'Bellhop': 'Nhân viên Khuân vác Khách sạn',
  'Branch Manager': 'Trưởng Chi nhánh',
  'Brand Designer': 'Thiết kế Thương hiệu',
  'Building Maintenance Technician': 'Kỹ thuật viên Bảo trì Tòa nhà',
  'Business Administration Professional': 'Chuyên viên Quản trị Kinh doanh',
  'Business Development Executive': 'Chuyên viên Phát triển Kinh doanh',
  'Business Intelligence Specialist': 'Chuyên viên Business Intelligence',
  'Busser': 'Nhân viên Dọn bàn',
  'CNC Operator': 'Thợ vận hành CNC',
  'Cabin Crew': 'Tiếp viên Hàng không',
  'Cabinet Maker': 'Thợ đóng Tủ',
  'Cafeteria Worker': 'Nhân viên Căn tin',
  'Call Center Representative': 'Đại diện Tổng đài',
  'Car Sales Associate': 'Nhân viên Bán Ô tô',
  'Case Manager': 'Quản lý Hồ sơ',
  'Casino Dealer': 'Nhân viên Chia bài Casino',
  'Caterer': 'Nhân viên Cung cấp Tiệc',
  'Catering Manager': 'Quản lý Dịch vụ Tiệc',
  'Certified Nursing Assistant (CNA)': 'Trợ lý Y tá (CNA)',
  'Change Management Specialist': 'Chuyên viên Quản lý Thay đổi',
  'Chemist': 'Nhà Hóa học',
  'Chief Information Officer (CIO)': 'Giám đốc Công nghệ Thông tin',
  'Chief of Staff': 'Chánh Văn phòng',
  'City Planner': 'Chuyên viên Quy hoạch Đô thị',
  'Client Relations Manager': 'Quản lý Quan hệ Khách hàng',
  'Clinical Research Coordinator': 'Điều phối viên Nghiên cứu Lâm sàng',
  'Code Enforcement Officer': 'Nhân viên Kiểm tra Tiêu chuẩn',
  'College Admissions Counselor': 'Tư vấn Tuyển sinh Đại học',
  'College Professor': 'Giảng viên Đại học',
  'Commercial Cleaner': 'Nhân viên Vệ sinh Thương mại',
  'Commercial Real Estate Broker': 'Môi giới Bất động sản Thương mại',
  'Community Outreach Coordinator': 'Điều phối viên Tiếp cận Cộng đồng',
  'Complaints Handler': 'Nhân viên Xử lý Khiếu nại',
  'Computer Operator': 'Nhân viên Vận hành Máy tính',
  'Computer Science Professional': 'Chuyên gia Khoa học Máy tính',
  'Construction Superintendent': 'Giám sát Công trình',
  'Contracts Specialist': 'Chuyên viên Hợp đồng',
  'Corporate Security Manager': 'Quản lý An ninh Doanh nghiệp',
  'Court Reporter': 'Thư ký Phiên tòa',
  'Creative Director': 'Giám đốc Sáng tạo',
  'Crisis Counselor': 'Tư vấn viên Khủng hoảng',
  'Cruise Ship Worker': 'Nhân viên Tàu du lịch',
  'Curriculum Developer': 'Chuyên viên Phát triển Chương trình Học',
  'Customer Experience Specialist': 'Chuyên viên Trải nghiệm Khách hàng',
  'Customer Success Specialist': 'Chuyên viên Thành công Khách hàng',
  'Customer Support Specialist': 'Chuyên viên Hỗ trợ Khách hàng',
  'Customs Officer': 'Cán bộ Hải quan',
  'Data Entry Operator': 'Nhân viên Nhập dữ liệu',
  'Data Entry Specialist': 'Chuyên viên Nhập dữ liệu',
  'Delivery Driver': 'Tài xế Giao hàng',
  'Dental Office Manager': 'Quản lý Phòng khám Nha khoa',
  'Design Engineer': 'Kỹ sư Thiết kế',
  'Desktop Support Technician': 'Kỹ thuật viên Hỗ trợ Máy tính',
  'Dialysis Technician': 'Kỹ thuật viên Lọc máu',
  'Dietary Aide': 'Nhân viên Hỗ trợ Dinh dưỡng',
  'Digital Marketer': 'Chuyên viên Marketing Số',
  'District Manager': 'Quản lý Khu vực',
  'Doctor': 'Bác sĩ',
  'Dog Trainer': 'Huấn luyện viên Chó',
  'Driver': 'Tài xế',
  'EMT': 'Nhân viên Cấp cứu Y tế',
  'Editor': 'Biên tập viên',
  'Education Consultant': 'Tư vấn Giáo dục',
  'Educational Technologist': 'Chuyên gia Công nghệ Giáo dục',
  'Electrical Technician': 'Kỹ thuật viên Điện',
  'Elementary Teacher': 'Giáo viên Tiểu học',
  'Elevator Technician': 'Kỹ thuật viên Thang máy',
  'Embedded Systems Engineer': 'Kỹ sư Hệ thống Nhúng',
  'Emergency Management Coordinator': 'Điều phối viên Quản lý Khủng hoảng',
  'Environmental Compliance Officer': 'Nhân viên Tuân thủ Môi trường',
  'Epidemiologist': 'Nhà Dịch tễ học',
  'Escrow Officer': 'Chuyên viên Ký quỹ',
  'Ethical Hacker': 'Hacker Đạo đức',
  'Executive Director': 'Giám đốc Điều hành',
  'Family Services Worker': 'Nhân viên Dịch vụ Gia đình',
  'Fast Food Worker': 'Nhân viên Thức ăn Nhanh',
  'Fence Installer': 'Thợ làm Hàng rào',
  'Fitness Center Manager': 'Quản lý Trung tâm Thể dục',
  'Fitness Trainer': 'Huấn luyện viên Thể hình',
  'Floor Installer': 'Thợ lợp Sàn',
  'Food Expeditor': 'Nhân viên Điều phối Món ăn',
  'Food Safety Manager': 'Quản lý An toàn Thực phẩm',
  'Food Server': 'Nhân viên Phục vụ Ăn uống',
  'Food Service Director': 'Giám đốc Dịch vụ Ăn uống',
  'Food Service Manager': 'Quản lý Dịch vụ Ăn uống',
  'Food Service Worker': 'Nhân viên Dịch vụ Ăn uống',
  'Food Stylist': 'Nhà Tạo hình Thực phẩm',
  'Food Truck Operator': 'Chủ Xe bán đồ ăn',
  'Freight Broker': 'Môi giới Vận tải',
  'Front End Developer': 'Lập trình viên Front End',
  'Full Stack Developer': 'Lập trình viên Full Stack',
  'Game Developer': 'Lập trình viên Game',
  'Go Developer': 'Lập trình viên Go',
  'Grants Manager': 'Quản lý Tài trợ',
  'Group Fitness Instructor': 'Huấn luyện viên Thể dục Nhóm',
  'Gym Trainer': 'Huấn luyện viên Gym',
  'HR Assistant': 'Trợ lý Nhân sự',
  'HR Business Partner': 'Đối tác Kinh doanh Nhân sự',
  'HR Coordinator': 'Điều phối viên Nhân sự',
  'HR Director': 'Giám đốc Nhân sự',
  'HR Department Head': 'Trưởng phòng Nhân sự',
  'HR Executive': 'Chuyên viên Nhân sự Cao cấp',
  'HR Manager': 'Quản lý Nhân sự',
  'HR Recruiter': 'Chuyên viên Tuyển dụng Nhân sự',
  'Head Cook': 'Bếp Trưởng',
  'Health Coach': 'Tư vấn Sức khỏe',
  'Health Inspector': 'Thanh tra Y tế',
  'Heavy Equipment Operator': 'Thợ lái Máy công trình',
  'High School Teacher': 'Giáo viên Trung học',
  'Home Inspector': 'Nhân viên Kiểm định Nhà',
  'Hospice Nurse': 'Y tá Chăm sóc Cuối đời',
  'Hospital Housekeeper': 'Nhân viên Vệ sinh Bệnh viện',
  'Hotel Front Desk Agent': 'Nhân viên Lễ tân',
  'Housekeeper': 'Nhân viên Buồng phòng',
  'IT Recruiter': 'Chuyên viên Tuyển dụng IT',
  'IT Support Technician': 'Kỹ thuật viên Hỗ trợ IT',
  'IT Technician': 'Kỹ thuật viên IT',
  'Illustrator': 'Họa sĩ Minh họa',
  'Industrial Maintenance Technician': 'Kỹ thuật viên Bảo trì Công nghiệp',
  'Instructional Coach': 'Chuyên viên Hướng dẫn Giảng dạy',
  'Insulation Worker': 'Thợ Cách nhiệt',
  'Intern': 'Thực tập sinh',
  'Iron Worker': 'Thợ Sắt',
  'Ironworker': 'Thợ Sắt Thép',
  'Java Full Stack Developer': 'Lập trình viên Java Full Stack',
  'JavaScript Developer': 'Lập trình viên JavaScript',
  'Junior Developer': 'Lập trình viên Junior',
  'Kitchen Helper': 'Phụ bếp',
  'Lab Assistant': 'Trợ lý Phòng thí nghiệm',
  'iOS Developer': 'Lập trình viên iOS',
};

// ─── CATEGORIES (English → Vietnamese) ──────────────────────────────────────

export const CATEGORIES = {
  Technology: 'Công nghệ',
  Healthcare: 'Y tế',
  Trades: 'Nghề thủ công',
  Hospitality: 'Khách sạn',
  'Food Service': 'Dịch vụ Ăn uống',
  Creative: 'Sáng tạo',
  Education: 'Giáo dục',
  Government: 'Hành chính Công',
  Finance: 'Tài chính',
  Marketing: 'Marketing',
  Business: 'Kinh doanh',
  Engineering: 'Kỹ thuật',
  Sales: 'Bán hàng',
  Legal: 'Pháp lý',
  'Real Estate': 'Bất động sản',
  HR: 'Nhân sự',
  Fitness: 'Thể dục Thể thao',
  Management: 'Quản lý',
  'Animal Care': 'Chăm sóc Động vật',
  Logistics: 'Logistics',
  'Customer Service': 'Dịch vụ Khách hàng',
  Administrative: 'Hành chính',
  Transportation: 'Vận tải',
  Retail: 'Bán lẻ',
  Cleaning: 'Vệ sinh',
  'Social Services': 'Dịch vụ Xã hội',
  Manufacturing: 'Sản xuất',
  Construction: 'Xây dựng',
  Security: 'An ninh',
  Science: 'Khoa học',
  Events: 'Sự kiện',
  'Writing & Content': 'Viết và Nội dung',
  'Supply Chain': 'Chuỗi cung ứng',
  Research: 'Nghiên cứu',
  Insurance: 'Bảo hiểm',
  Consulting: 'Tư vấn',
  Aviation: 'Hàng không',
  Automotive: 'Ô tô',
  Media: 'Truyền thông',
  Maritime: 'Hàng hải',
  'Law Enforcement': 'Lực lượng Pháp luật',
  'Entry-Level': 'Mới vào Nghề',
  Entertainment: 'Giải trí',
  Childcare: 'Chăm sóc Trẻ em',
  Beauty: 'Làm đẹp',
  Architecture: 'Kiến trúc',
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
  Technology: (job) => `Một mẫu CV ${job} hiệu quả không chỉ đơn giản là liệt kê các công nghệ bạn biết. CV cần thể hiện khả năng giải quyết vấn đề thực tế, lượng hóa tác động của công việc và chứng minh bạn hiểu rõ những thách thức kỹ thuật của vị trí ứng tuyển.`,
  Healthcare: (job) => `Nhà tuyển dụng trong lĩnh vực y tế tìm kiếm ứng viên có thể chứng minh cả năng lực chuyên môn lẫn sự tận tâm với sức khỏe bệnh nhân. CV ${job} của bạn cần cân bằng giữa trình độ kỹ thuật và phẩm chất con người.`,
  Finance: (job) => `Nhà tuyển dụng tài chính ưu tiên những ứng viên có khả năng biến dữ liệu phức tạp thành quyết định chiến lược. CV ${job} của bạn cần thể hiện tư duy phân tích sắc bén, sự chính xác và khả năng phán đoán trong các vấn đề tài chính.`,
  Education: (job) => `Nhà tuyển dụng trong lĩnh vực giáo dục tìm kiếm những chuyên gia có khả năng truyền cảm hứng học tập và thích ứng với nhu cầu đa dạng của học sinh. CV ${job} của bạn cần phản ánh năng lực sư phạm và cam kết vì sự thành công của người học.`,
  'Food Service': (job) => `Nhà tuyển dụng ngành ăn uống đánh giá cao sự đáng tin cậy, tinh thần làm việc nhóm và niềm đam mê với nghề. CV ${job} của bạn cần làm nổi bật kỹ năng ẩm thực và khả năng làm việc dưới áp lực cao.`,
  Hospitality: (job) => `Ngành khách sạn đánh giá cao sự nhiệt tình, chu đáo và phong thái chuyên nghiệp dưới áp lực. CV ${job} của bạn cần phản ánh định hướng phục vụ và khả năng tạo trải nghiệm đáng nhớ cho khách hàng.`,
  Trades: (job) => `Nhà tuyển dụng đánh giá cao những người thợ lành nghề, có thể làm việc độc lập và đảm bảo chất lượng công việc. CV ${job} của bạn cần thể hiện kinh nghiệm thực hành, ý thức an toàn lao động và khả năng xử lý tình huống tại hiện trường.`,
  Creative: (job) => `Những chuyên gia sáng tạo giỏi nhất kết hợp xuất sắc giữa nghệ thuật và hiểu biết về nhu cầu khách hàng. CV ${job} của bạn cần thể hiện tầm nhìn sáng tạo đồng thời chứng minh tư duy thương mại và khả năng hoàn thành dự án đúng tiến độ.`,
  Administrative: (job) => `Nhà tuyển dụng tìm kiếm ứng viên có thể dự đoán nhu cầu, chủ động giải quyết vấn đề và đảm bảo tính bảo mật. CV ${job} hiệu quả thể hiện sự xuất sắc trong tổ chức và khả năng đảm bảo mọi hoạt động diễn ra trôn tru.`,
  Sales: (job) => `CV của bạn là bản chào hàng đầu tiên, và nhà tuyển dụng sẽ đánh giá nó như vậy. Cách hiệu quả nhất để xây dựng CV ${job} là chứng minh bạn hiểu thách thức kinh doanh và có thể đóng góp vào mục tiêu doanh thu.`,
  Marketing: (job) => `Marketing thay đổi nhanh chóng và nhà tuyển dụng tìm kiếm ứng viên thành thạo cả chiến lược lẫn thực thi. CV ${job} của bạn cần chứng minh khả năng tạo ra kết quả đo lường được bằng sự sáng tạo có chiến lược.`,
  HR: (job) => `Khác với các vị trí kinh doanh khác, các vị trí nhân sự yêu cầu chứng minh khả năng xử lý các vấn đề tổ chức nhạy cảm đồng thời tạo ra kết quả cụ thể cho doanh nghiệp.`,
  'Customer Service': (job) => `Các vị trí dịch vụ khách hàng đòi hỏi kỹ năng giao tiếp xuất sắc và sự đồng cảm chân thành. CV ${job} của bạn cần chứng minh khả năng giải quyết vấn đề hiệu quả đồng thời duy trì mối quan hệ tốt với khách hàng.`,
  Retail: (job) => `Nhà tuyển dụng bán lẻ đánh giá cao sự đáng tin cậy, kiến thức sản phẩm và nhiệt tình phục vụ khách hàng. CV ${job} của bạn cần thể hiện thành tích bán hàng và khả năng làm việc trong môi trường năng động.`,
  Logistics: (job) => `Nhà tuyển dụng logistics ưu tiên hiệu suất, độ chính xác và khả năng quản lý vận hành với thời hạn chặt chẽ. CV ${job} của bạn cần thể hiện kinh nghiệm quản lý kho hàng, lập kế hoạch và tối ưu hóa quy trình.`,
  Government: (job) => `Ứng tuyển vào khu vực công đòi hỏi cách tiếp cận khác biệt so với khu vực tư nhân. CV ${job} của bạn cần đáp ứng trực tiếp yêu cầu của vị trí, đồng thời thể hiện cam kết phục vụ cộng đồng và lợi ích chung.`,
  Legal: (job) => `Lĩnh vực pháp lý đòi hỏi sự chính xác tuyệt đối và chú ý tỉ mỉ đến chi tiết. CV ${job} của bạn cần phản ánh tư duy nghiêm túc, am hiểu pháp luật và khả năng xử lý các vụ việc phức tạp.`,
  default: (job) => `Một CV ${job} hiệu quả tập trung vào những kết quả cụ thể chứng minh khả năng tạo ra giá trị ngay từ ngày đầu tiên. Kết hợp kinh nghiệm phù hợp và nhiệt huyết chân thành với vị trí mong muốn.`,
};

// ─── TAGS GENERATOR ─────────────────────────────────────────────────────────

export function generateTags(jobTitle, slug) {
  const lower = jobTitle.toLowerCase();
  return [
    `cv ${lower}`,
    `mẫu cv ${lower}`,
    `cv xin việc ${lower}`,
    `tạo cv ${lower}`,
    `mẫu cv xin việc chuyên nghiệp`,
    `cv tối ưu ats`,
    `mẫu cv miễn phí`,
    `tạo cv online`,
  ];
}

// ─── FAQ GENERATOR ──────────────────────────────────────────────────────────

export function generateFAQ(jobTitle) {
  const lower = jobTitle.toLowerCase();
  return [
    {
      question: `Nên đưa những kỹ năng gì vào CV ${lower}?`,
      answer: `Hãy đưa vào các kỹ năng chuyên môn trực tiếp liên quan đến vị trí ${lower}, cùng với các kỹ năng mềm như giao tiếp và làm việc nhóm. Sử dụng từ khóa từ mô tả công việc và hỗ trợ mỗi kỹ năng bằng một ví dụ cụ thể về thành tích nghề nghiệp.`,
    },
    {
      question: `CV ${lower} nên dài bao nhiêu?`,
      answer: `CV ${lower} nên gói gọn trong một trang đối với người mới đi làm và trung cấp, và có thể mở rộng đến hai trang đối với cấp cao có trên 10 năm kinh nghiệm. Ưu tiên chất lượng nội dung hơn số lượng và đảm bảo mọi thông tin đều mang lại giá trị.`,
    },
    {
      question: `Nên chọn định dạng CV nào cho vị trí ${lower}?`,
      answer: `Định dạng thời gian ngược là phù hợp nhất cho CV ${lower}, vì nó thể hiện quá trình phát triển nghề nghiệp của bạn. Sử dụng mẫu CV chuyên nghiệp tương thích ATS với các phần rõ ràng: thông tin cá nhân, tóm tắt nghề nghiệp, kinh nghiệm, học vấn và kỹ năng.`,
    },
    {
      question: `Mức lương trung bình của ${lower} là bao nhiêu?`,
      answer: `Mức lương của ${lower} thay đổi tùy theo kinh nghiệm, địa điểm và quy mô công ty. Tham khảo dữ liệu cập nhật trên các trang như Glassdoor, PayScale hoặc VietnamWorks để có ước tính thực tế tại khu vực của bạn. Nếu đưa thành tích cụ thể vào CV, bạn sẽ có lợi thế khi đàm phán lương.`,
    },
    {
      question: `CV ${lower} cần bao gồm những gì?`,
      answer: `Một CV ${lower} đầy đủ cần có: thông tin cá nhân, tóm tắt nghề nghiệp ấn tượng, kinh nghiệm làm việc với thành tích cụ thể, học vấn, chứng chỉ liên quan và các kỹ năng chính. Tùy chỉnh mỗi phần theo yêu cầu cụ thể của vị trí ứng tuyển.`,
    },
    {
      question: `Có nên đính kèm ảnh trong CV ${lower} tại Việt Nam không?`,
      answer: `Tại Việt Nam, đính kèm ảnh thẻ chuyên nghiệp (3x4 hoặc 4x6) trong CV ${lower} là phổ biến và được khuyến khích, khác với thị trường phương Tây. Chọn ảnh nền trắng hoặc xanh nhạt, mặc trang phục lịch sự phù hợp ngành nghề. Tuy nhiên, nếu ứng tuyển công ty đa quốc gia, kiểm tra yêu cầu cụ thể vì một số công ty theo chuẩn quốc tế không yêu cầu ảnh.`,
    },
    {
      question: `Sơ yếu lý lịch (SYLL) khác gì CV ${lower}?`,
      answer: `Sơ yếu lý lịch (SYLL) là mẫu đơn hành chính có xác nhận của chính quyền địa phương, thường yêu cầu khi ứng tuyển vào cơ quan nhà nước hoặc doanh nghiệp Nhà nước. CV chuyên nghiệp cho vị trí ${lower} tập trung vào thành tích và kỹ năng, phù hợp với khu vực tư nhân và công ty đa quốc gia. Nhiều ứng viên chuẩn bị cả hai để sẵn sàng cho mọi yêu cầu.`,
    },
  ];
}

// ─── VIETNAMESE COMPANY EXAMPLES PER CATEGORY ──────────────────────────────

const CATEGORY_COMPANIES = {
  Technology: 'FPT Software, Viettel, VNG, Shopee Vietnam, Tiki, Samsung Vietnam',
  Healthcare: 'Vinmec, FV Hospital, Bệnh viện Chợ Rẫy, Bệnh viện Bạch Mai, Medlatec',
  Finance: 'Techcombank, VPBank, MB Bank, Vietcombank, Manulife Vietnam',
  Education: 'Đại học FPT, Vinschool, RMIT Vietnam, British International School',
  'Food Service': "Golden Gate, The Coffee House, Highlands Coffee, Pizza 4P's",
  Hospitality: 'Vinpearl, Mường Thanh, InterContinental Đà Nẵng, JW Marriott Phú Quốc',
  Trades: 'Hòa Phát, Coteccons, Viglacera, Samsung Vietnam, Canon Vietnam',
  Creative: 'VNG Games, Gameloft Vietnam, Dentsu Vietnam, Leo Burnett Vietnam',
  Administrative: 'Vingroup, Masan Group, TH True Milk, Novaland, Sun Group',
  Sales: 'Thế Giới Di Động, FPT Shop, Bách Hóa Xanh, Điện Máy Xanh',
  Marketing: 'VNG, Lazada Vietnam, Shopee Vietnam, Grab Vietnam, VinID',
  HR: 'Navigos Group, ManpowerGroup Vietnam, Adecco Vietnam',
  'Customer Service': 'Viettel, VNPT, MobiFone, FPT Telecom, VinFast',
  Retail: 'Thế Giới Di Động, Bách Hóa Xanh, AEON Vietnam, Lotte Mart',
  Logistics: 'Viettel Post, Giao Hàng Nhanh, J&T Express, Gemadept',
  Government: 'các cơ quan nhà nước, UBND, Sở ban ngành',
  Legal: 'VILAF, Rajah & Tann LCT, Baker McKenzie Vietnam',
  default: 'các doanh nghiệp hàng đầu Việt Nam',
};

// ─── BODY GENERATOR ─────────────────────────────────────────────────────────

export function generateBody(jobTitle, category, keySkills, avgSalary, jobGrowth, slug) {
  const lower = jobTitle.toLowerCase();
  const skills = keySkills || [];
  const topSkills = skills.slice(0, 3).join(', ') || 'kỹ năng chuyên môn';
  const midSkills = skills.slice(3, 6).join(', ') || 'kỹ năng bổ trợ';
  const softSkills = skills.slice(6, 8).join(', ') || 'làm việc nhóm, giao tiếp';

  const norm = normalizeCategory(category);
  const opener = (CATEGORY_OPENERS[norm] || CATEGORY_OPENERS.default)(jobTitle);
  const companies = CATEGORY_COMPANIES[norm] || CATEGORY_COMPANIES.default;

  const relatedSlug1 = slug.includes('-') ? slug.split('-')[0] : slug;

  return `
## Cách Tạo CV ${jobTitle} Ấn Tượng

${opener}

Nhà tuyển dụng trung bình chỉ dành sáu đến bảy giây để đọc lướt CV lần đầu tiên. Đối với vị trí ${lower}, điều này có nghĩa là những kỹ năng quan trọng nhất và thành tích nổi bật của bạn phải được nhìn thấy ngay lập tức. Một CV được trình bày tốt không chỉ liệt kê kinh nghiệm — nó kể câu chuyện về hành trình nghề nghiệp của bạn và chứng minh giá trị bạn mang đến cho nhà tuyển dụng.

## Các Mẫu Tóm Tắt Nghề Nghiệp

### Mới Vào Nghề

${lower} nhiệt huyết với nền tảng đào tạo vững chắc về ${topSkills || 'các kỹ năng chuyên ngành'}. Mong muốn đóng góp cho một đội nhóm năng động và áp dụng kiến thức đã học vào môi trường làm việc chuyên nghiệp. Được ghi nhận về khả năng học hỏi nhanh, tinh thần tổ chức và quyết tâm đạt được mục tiêu.

### Trung Cấp

${jobTitle} với hơn 5 năm kinh nghiệm trong lĩnh vực ${topSkills}. Có thành tích được chứng minh trong việc cải tiến quy trình và hoàn thành dự án đúng tiến độ và ngân sách. Thành thạo ${midSkills || 'kỹ năng nâng cao'}, với khả năng hướng dẫn nhân viên mới và dẫn dắt các sáng kiến cải tiến liên tục.

### Cấp Cao

${jobTitle} cấp cao với hơn 10 năm kinh nghiệm trong ngành, được công nhận về chuyên môn trong ${topSkills} và ${midSkills || 'quản lý chiến lược'}. Đã dẫn dắt các đội nhóm đa năng trên 15 người và quản lý các dự án chiến lược mang lại hiệu quả tiết kiệm trên 500 triệu đồng. Kỹ năng vượt trội trong ${softSkills || 'lãnh đạo và tầm nhìn chiến lược'}, với thành tích liên tục vượt chỉ tiêu.

## Mức Lương và Triển Vọng Nghề Nghiệp

Theo dữ liệu quốc tế, mức lương trung bình của ${lower} vào khoảng **${avgSalary || '$50,000'}** mỗi năm tại thị trường Hoa Kỳ. Tại Việt Nam, mức lương thay đổi đáng kể tùy theo kinh nghiệm, thành phố và quy mô doanh nghiệp. Triển vọng tăng trưởng việc làm cho vị trí này là **${jobGrowth || '+5%'}** trong những năm tới.

Tại Việt Nam, người mới vào nghề ${lower} có thể kỳ vọng mức lương khởi điểm từ 8-15 triệu VND/tháng, trong khi cấp trung đạt 15-30 triệu VND/tháng. Các chuyên gia cấp cao hoặc làm việc tại tập đoàn đa quốc gia có thể nhận 40-80 triệu VND/tháng hoặc cao hơn. TP. Hồ Chí Minh và Hà Nội thường có mức lương cao hơn 20-30% so với các tỉnh thành khác. Các doanh nghiệp tuyển dụng phổ biến cho vị trí này gồm ${companies}.

**Nguồn tham khảo mức lương tại Việt Nam:**
- [TopCV](https://www.topcv.vn/) — Báo cáo lương và xu hướng tuyển dụng cập nhật hàng quý tại Việt Nam
- [VietnamWorks](https://www.vietnamworks.com/) — Nền tảng tuyển dụng hàng đầu Việt Nam với dữ liệu lương theo ngành
- [ITviec](https://itviec.com/blog/bao-cao-luong-it/) — Báo cáo lương chuyên sâu cho ngành công nghệ tại Việt Nam
- [Glassdoor](https://www.glassdoor.com/Salaries/) — Mức lương do nhân viên báo cáo, bao gồm thị trường Việt Nam
- [CareerLink](https://www.careerlink.vn/) — Thông tin lương và tuyển dụng tại các tỉnh thành Việt Nam

*Mức lương thực tế thay đổi tùy theo kinh nghiệm, địa điểm, ngành nghề, quy mô doanh nghiệp và loại hình công ty (nội địa hay đa quốc gia).*

## Kỹ Năng Cần Thiết Cần Nổi Bật

### Kỹ Năng Chuyên Môn
${skills.slice(0, 3).map(s => `- **${s}** — Kỹ năng cốt lõi cho mọi ${lower}, được nhà tuyển dụng và hệ thống ATS ưu tiên tìm kiếm`).join('\n') || '- Thành thạo các công cụ và công nghệ chuyên ngành\n- Hiểu biết sâu về phương pháp và quy trình trong lĩnh vực\n- Khả năng sử dụng thành thạo phần mềm chuyên dụng'}

### Kỹ Năng Tổ Chức
${skills.slice(3, 6).map(s => `- **${s}** — Kỹ năng được đánh giá cao trong công việc hàng ngày của ${lower}`).join('\n') || '- Quản lý thời gian và xác định ưu tiên công việc\n- Tổ chức và lập kế hoạch dự án\n- Nghiêm túc trong tuân thủ quy trình'}

### Kỹ Năng Giao Tiếp
${skills.slice(6, 8).map(s => `- **${s}** — Phẩm chất giao tiếp thiết yếu để thành công trong vai trò ${lower}`).join('\n') || '- Giao tiếp bằng văn bản và lời nói\n- Làm việc nhóm và hợp tác'}
- Thích ứng và làm việc hiệu quả dưới áp lực
- Giải quyết xung đột và đàm phán

## Thành Tích Nổi Bật Với Con Số Cụ Thể

Hãy sử dụng các ví dụ này làm tham khảo để trình bày thành tích của bạn với dữ liệu cụ thể:

- Cải thiện **25%** hiệu suất vận hành thông qua tối ưu hóa quy trình trong ${topSkills || 'kỹ năng cốt lõi'}, tạo ra khoản tiết kiệm đáng kể hàng năm
- Quản lý đồng thời **12+ dự án** với tỷ lệ hoàn thành đúng hạn 98%, vượt chỉ tiêu của đội nhóm
- Đào tạo và hướng dẫn **8 nhân viên mới**, giúp giảm thời gian hòa nhập 40%
- Triển khai hệ thống ${skills[0] || 'quản lý'} mới giúp giảm sai sót **35%** và nâng cao mức độ hài lòng của khách hàng
- Tăng doanh thu **20%** trong một quý nhờ các chiến lược sáng tạo trong ${skills[1] || 'phát triển'}
- Đạt tỷ lệ hài lòng khách hàng **95%** bằng cách áp dụng cải tiến liên tục dựa trên phản hồi của người dùng

## Định Dạng và Mẹo Tạo Mẫu CV ${jobTitle}

1. **Sử dụng định dạng thời gian ngược** — Đặt kinh nghiệm gần nhất lên đầu. Đây là định dạng được nhà tuyển dụng Việt Nam và hệ thống ATS ưu tiên cho vị trí ${lower}.
2. **Đính kèm ảnh thẻ chuyên nghiệp** — Khác với thị trường phương Tây, CV tại Việt Nam thường yêu cầu ảnh thẻ 3x4 hoặc 4x6. Chọn ảnh chuyên nghiệp, nền trắng hoặc xanh nhạt, mặc trang phục phù hợp ngành nghề.
3. **Phân biệt CV và Sơ yếu lý lịch (SYLL)** — Nhiều doanh nghiệp Việt Nam, đặc biệt khu vực công, yêu cầu SYLL có xác nhận của chính quyền địa phương. CV chuyên nghiệp dành cho khu vực tư nhân và công ty đa quốc gia.
4. **Lượng hóa thành tích bằng VND** — Con số thu hút sự chú ý. Ưu tiên "tăng doanh thu 500 triệu đồng/quý" hơn "cải thiện kết quả kinh doanh". Nhà tuyển dụng Việt Nam quen với đơn vị triệu/tỷ VND.
5. **Ghi rõ chứng chỉ và bằng cấp** — Tại Việt Nam, bằng cấp rất được coi trọng. Đối với vị trí ${lower}, liệt kê rõ trường đào tạo, năm tốt nghiệp và các chứng chỉ quốc tế (nếu có).
6. **Cân nhắc CV song ngữ** — Nếu ứng tuyển vào công ty đa quốc gia hoặc vị trí yêu cầu tiếng Anh, chuẩn bị CV cả tiếng Việt và tiếng Anh. Nhiều công ty FDI tại Việt Nam yêu cầu CV tiếng Anh.

## Lời Khuyên Từ Nhà Tuyển Dụng Việt Nam

> **Sai lầm phổ biến nhất mà tôi thấy trong CV ${lower} tại Việt Nam là sao chép mô tả công việc thay vì trình bày thành tích cụ thể.** Ứng viên thường liệt kê trách nhiệm hàng ngày nhưng thiếu con số chứng minh tác động thực tế.

Khi tuyển ${lower} tại ${companies}, tôi đặc biệt chú ý đến: thứ nhất, thành tích lượng hóa bằng số liệu cụ thể (phần trăm, VND, số lượng); thứ hai, sự phù hợp văn hóa doanh nghiệp; thứ ba, khả năng phát triển lâu dài. Một CV ${lower} xuất sắc trả lời được câu hỏi: "Ứng viên này sẽ mang lại giá trị gì cho đội nhóm trong 6 tháng đầu?"

Đặc biệt tại thị trường Việt Nam, nhà tuyển dụng chuyên về ${category.toLowerCase()} cũng đánh giá cao thái độ cầu thị, khả năng làm việc nhóm và sự ổn định nghề nghiệp. Nhảy việc quá nhiều (trên 3 công ty trong 2 năm) là tín hiệu tiêu cực.

## Câu Hỏi Phỏng Vấn Thường Gặp Cho ${jobTitle} Tại Việt Nam

### Bạn có thể giới thiệu về bản thân và lý do ứng tuyển vị trí ${lower}?

Đây là câu hỏi mở đầu gần như bắt buộc tại mọi buổi phỏng vấn ở Việt Nam. Trình bày ngắn gọn trong 2-3 phút: học vấn, kinh nghiệm liên quan, thành tích nổi bật và lý do chọn công ty. Tránh đọc lại CV — hãy kể câu chuyện nghề nghiệp có điểm nhấn.

### Mức lương bạn mong muốn là bao nhiêu?

Nhà tuyển dụng Việt Nam thường hỏi trực tiếp về lương ngay từ vòng đầu. Nghiên cứu mức lương thị trường cho vị trí ${lower} trên TopCV hoặc VietnamWorks trước khi phỏng vấn. Đưa ra khoảng lương (ví dụ: 15-20 triệu VND/tháng) thay vì con số cố định, và nhấn mạnh sự linh hoạt tùy theo phúc lợi tổng thể.

### Bạn xử lý áp lực công việc và deadline gấp như thế nào trong vai trò ${lower}?

Hãy chứng minh bằng ví dụ cụ thể từ kinh nghiệm thực tế. Mô tả tình huống, cách bạn sắp xếp ưu tiên, hành động cụ thể và kết quả đạt được. Nhà tuyển dụng đánh giá cao ứng viên biết cách phối hợp với đồng nghiệp và chủ động báo cáo tiến độ.

### Tại sao bạn rời công ty cũ?

Câu hỏi nhạy cảm nhưng rất phổ biến tại Việt Nam. Trả lời tích cực: tập trung vào mong muốn phát triển, học hỏi thêm hoặc tìm kiếm thách thức mới phù hợp với ${lower}. Tuyệt đối không nói xấu công ty hoặc quản lý cũ — thị trường tuyển dụng Việt Nam nhỏ và thông tin lan truyền nhanh.

### Bạn có câu hỏi gì cho chúng tôi không?

Luôn chuẩn bị 2-3 câu hỏi thông minh: về lộ trình phát triển của vị trí ${lower}, văn hóa đội nhóm, hoặc dự án sắp tới. Tại Việt Nam, câu hỏi về đào tạo nội bộ và cơ hội thăng tiến được đánh giá rất tích cực vì thể hiện cam kết lâu dài.

## Những Sai Lầm Cần Tránh Khi Viết CV Tại Việt Nam

### 1. Gửi CV chung không tùy chỉnh cho từng công ty

Gửi cùng một CV cho mọi lần ứng tuyển là sai lầm lớn nhất. Mỗi công ty Việt Nam có văn hóa và yêu cầu riêng — CV ứng tuyển vào ${companies.split(',')[0]} khác hẳn CV vào công ty khác. Hãy tùy chỉnh tóm tắt nghề nghiệp và từ khóa cho mỗi vị trí ${lower} cụ thể.

### 2. Liệt kê nhiệm vụ thay vì thành tích có con số

Liệt kê nhiệm vụ hàng ngày không gây ấn tượng với nhà tuyển dụng. Chuyển mỗi điểm thành kết quả đo lường được. "Phụ trách bán hàng khu vực" nên thành "Quản lý 15 đại lý khu vực miền Nam, đạt 120% chỉ tiêu doanh thu quý (8,5 tỷ VND)".

### 3. Bỏ qua tối ưu hóa ATS

Nhiều công ty lớn tại Việt Nam như ${companies.split(',').slice(0, 2).join(',')} đã sử dụng hệ thống ATS để lọc CV. Ứng viên cho vị trí ${lower} bỏ lỡ cơ hội vì CV không vượt qua bộ lọc tự động. Tránh bảng biểu phức tạp, header/footer và đồ họa.

### 4. Nhảy việc nhiều mà không giải thích

Tại Việt Nam, nhà tuyển dụng rất chú ý đến tính ổn định. Nếu bạn thay đổi 3-4 công ty trong thời gian ngắn, hãy giải thích ngắn gọn lý do hợp lý trong CV (sáp nhập, cắt giảm, cơ hội phát triển). Không giải thích sẽ khiến hồ sơ bị loại sớm.

### 5. Không liệt kê chứng chỉ và bằng cấp rõ ràng

Thị trường Việt Nam rất coi trọng bằng cấp. Đối với vị trí ${lower}, thiếu thông tin về trường đào tạo, loại bằng, chứng chỉ nghề nghiệp và chứng chỉ ngoại ngữ (TOEIC, IELTS) là thiếu sót đáng kể, đặc biệt khi ứng tuyển công ty đa quốc gia.

## Tối Ưu ATS Cho CV ${jobTitle}

Hệ thống theo dõi ứng tuyển (ATS) ngày càng phổ biến tại Việt Nam, đặc biệt ở các tập đoàn lớn và công ty đa quốc gia. Để tăng cơ hội cho vị trí ${lower}:

- **Dùng chính xác từ khóa từ mô tả công việc** — Nếu tin tuyển dụng trên TopCV hoặc VietnamWorks nhắc đến "${skills[0] || 'kỹ năng cụ thể'}", hãy sử dụng cách diễn đạt chính xác này trong CV
- **Sử dụng định dạng đơn giản, dễ đọc** — Tránh nhiều cột, bảng và hộp văn bản gây rối parser ATS
- **Đặt kỹ năng chính ở nhiều phần** — Nhắc đến ${topSkills || 'kỹ năng chính'} trong tóm tắt nghề nghiệp, kinh nghiệm VÀ phần kỹ năng
- **Ưu tiên định dạng PDF** — Hầu hết các nền tảng tuyển dụng Việt Nam (TopCV, VietnamWorks, ITviec) hỗ trợ tải CV dạng PDF
- **Ghi cả tiếng Việt và thuật ngữ tiếng Anh** — Ví dụ: "Quản lý Dự án (Project Management)" để phủ cả hai biến thể tìm kiếm
- **Tránh header và footer** — Một số hệ thống ATS không đọc nội dung đặt ở những khu vực này

## Nền Tảng Tuyển Dụng Hàng Đầu Tại Việt Nam

Đăng CV trên nhiều nền tảng để tăng khả năng hiển thị cho vị trí ${lower}:

- [TopCV.vn](https://www.topcv.vn/) — Nền tảng tuyển dụng lớn nhất Việt Nam với 5 triệu+ ứng viên
- [VietnamWorks](https://www.vietnamworks.com/) — Chuyên vị trí trung-cao cấp, phổ biến với công ty đa quốc gia
- [ITviec](https://itviec.com/) — Chuyên ngành công nghệ thông tin, lương cạnh tranh
- [CareerLink](https://www.careerlink.vn/) — Phủ rộng các tỉnh thành, đa ngành nghề
- [ViecLam24h](https://vieclam24h.vn/) — Đa dạng ngành nghề, phổ biến tại các tỉnh

## Tài Nguyên Bổ Sung

Tham khảo các tài nguyên này để hoàn thiện hồ sơ ứng tuyển ${lower}:

- [Kiểm tra độ tương thích ATS của CV](/vi/tools/ats-checker) — Kiểm tra miễn phí CV của bạn với công cụ phân tích ATS
- [Các mẫu CV chuyên nghiệp](/vi/resume-examples) — Tham khảo hàng trăm mẫu CV theo ngành nghề
- [Mẫu CV tương thích ATS](/vi/templates) — Chọn mẫu CV được tối ưu để vượt qua bộ lọc tự động

Sẵn sàng tạo CV ${lower} chuyên nghiệp và tối ưu ATS? Hãy sử dụng [công cụ tạo CV miễn phí của chúng tôi](/vi/builder) để tạo CV hiệu quả trong vài phút. Các mẫu của chúng tôi được tối ưu cho hệ thống ATS và hướng dẫn bạn từng bước.
`;
}
