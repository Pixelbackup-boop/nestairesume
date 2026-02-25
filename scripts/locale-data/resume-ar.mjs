/**
 * Arabic (ar) locale data for resume example generation.
 * Imported by: scripts/generate-locale-resume-examples.mjs --lang ar
 *
 * Exports: CONFIG, JOB_TITLES, CATEGORIES, generateTags, generateFAQ, generateBody
 */

// ─── CONFIG ──────────────────────────────────────────────────────────────────

export const CONFIG = {
  author: 'أحمد الحسن',
  authorBio: 'خبير في التطوير المهني وكتابة السير الذاتية مع أكثر من 10 سنوات من الخبرة في مساعدة المهنيين العرب على تحقيق أهدافهم المهنية.',
  titlePattern: (job) => `سيرة ذاتية ${job}: أمثلة، قوالب ودليل الكتابة 2026`,
  descriptionPattern: (job) => `نموذج سيرة ذاتية لـ ${job} مع قوالب متوافقة مع ATS ونصائح الخبراء. تنسيق احترافي وأمثلة للحصول على مقابلات عمل في 2026.`,
  imageAltPattern: (job) => `نموذج سيرة ذاتية ${job}`,
};

// ─── JOB TITLES (554 entries) ────────────────────────────────────────────────

export const JOB_TITLES = {
  '3D Artist': 'فنان ثلاثي الأبعاد',
  'AI Engineer': 'مهندس ذكاء اصطناعي',
  'AWS Cloud Engineer': 'مهندس سحابة AWS',
  'AWS Solution Architect': 'مهندس حلول AWS',
  'Academic Advisor': 'مستشار أكاديمي',
  'Account Executive': 'مدير حسابات تنفيذي',
  'Account Manager': 'مدير حسابات',
  'Accountant': 'محاسب',
  'Accounting Assistant': 'مساعد محاسبة',
  'Accounting Clerk': 'كاتب محاسبة',
  'Accounting Intern': 'متدرب محاسبة',
  'Accounts Payable Specialist': 'أخصائي حسابات دائنة',
  'Accounts Receivable Specialist': 'أخصائي حسابات مدينة',
  'Administrative Assistant': 'مساعد إداري',
  'Android Developer': 'مطور أندرويد',
  'Animal Control Officer': 'ضابط مراقبة الحيوانات',
  'Animal Shelter Worker': 'عامل مأوى الحيوانات',
  'Animator': 'رسام رسوم متحركة',
  'Appliance Repair Technician': 'فني إصلاح الأجهزة المنزلية',
  'Aquarium Keeper': 'حارس أحواض السمك',
  'Arbitrator': 'محكّم',
  'Architect': 'مهندس معماري',
  'Art Director': 'مدير فني',
  'Assistant Director': 'مدير مساعد',
  'Assistant Manager': 'مدير مساعد',
  'Assistant Property Manager': 'مساعد مدير عقارات',
  'Assistant Store Manager': 'مساعد مدير متجر',
  'Athletic Trainer': 'مدرب رياضي',
  'Audio Engineer': 'مهندس صوت',
  'Auditor': 'مدقق حسابات',
  'Auto Mechanic': 'ميكانيكي سيارات',
  'Automation Engineer': 'مهندس أتمتة',
  'Automotive Technician': 'فني سيارات',
  'Backend Developer': 'مطور خلفية',
  'Baker': 'خباز',
  'Bank Manager': 'مدير بنك',
  'Bank Teller': 'صراف بنك',
  'Banquet Chef': 'شيف مآدب',
  'Barista': 'باريستا',
  'Bartender': 'نادل مشروبات',
  'Bellhop': 'حامل أمتعة فندق',
  'Billing Specialist': 'أخصائي فواتير',
  'Blockchain Developer': 'مطور بلوك تشين',
  'Branch Manager': 'مدير فرع',
  'Brand Designer': 'مصمم هوية بصرية',
  'Budget Analyst': 'محلل ميزانية',
  'Building Inspector': 'مفتش مباني',
  'Building Maintenance Technician': 'فني صيانة مباني',
  'Bus Driver': 'سائق حافلة',
  'Business Administration Professional': 'أخصائي إدارة أعمال',
  'Business Analyst': 'محلل أعمال',
  'Business Consultant': 'مستشار أعمال',
  'Business Development Executive': 'مدير تطوير أعمال تنفيذي',
  'Business Development Manager': 'مدير تطوير أعمال',
  'Business Intelligence Analyst': 'محلل ذكاء أعمال',
  'Business Intelligence Specialist': 'أخصائي ذكاء أعمال',
  'Business Manager': 'مدير أعمال',
  'Business Owner': 'صاحب عمل',
  'Busser': 'عامل تنظيف طاولات',
  'CNC Machinist': 'مشغل ماكينات CNC',
  'CNC Operator': 'مشغل CNC',
  'Cabin Crew': 'طاقم ضيافة جوية',
  'Cabinet Maker': 'نجار خزائن',
  'Cafeteria Worker': 'عامل كافيتريا',
  'Call Center Agent': 'موظف مركز اتصال',
  'Call Center Representative': 'ممثل مركز اتصال',
  'Car Sales Associate': 'مندوب مبيعات سيارات',
  'Caregiver': 'مقدم رعاية',
  'Carpenter': 'نجار',
  'Carpet Cleaner': 'منظف سجاد',
  'Case Manager': 'مدير حالات',
  'Cashier': 'أمين صندوق',
  'Casino Dealer': 'موزع ألعاب كازينو',
  'Caterer': 'متعهد طعام',
  'Catering Manager': 'مدير خدمات الطعام',
  'Certified Nursing Assistant': 'مساعد تمريض معتمد',
  'Certified Nursing Assistant (CNA)': 'مساعد تمريض معتمد (CNA)',
  'Change Management Specialist': 'أخصائي إدارة التغيير',
  'Chef': 'شيف',
  'Chemical Engineer': 'مهندس كيميائي',
  'Chemist': 'كيميائي',
  'Chief Information Officer (CIO)': 'مدير تقنية المعلومات (CIO)',
  'Chief of Staff': 'رئيس ديوان',
  'Chiropractor': 'معالج بتقويم العمود الفقري',
  'City Planner': 'مخطط مدن',
  'Civil Engineer': 'مهندس مدني',
  'Claims Adjuster': 'مقيّم مطالبات التأمين',
  'Client Relations Manager': 'مدير علاقات العملاء',
  'Clinical Research Associate': 'باحث سريري مشارك',
  'Clinical Research Coordinator': 'منسق أبحاث سريرية',
  'Cloud Architect': 'مهندس بنية سحابية',
  'Cloud Engineer': 'مهندس حوسبة سحابية',
  'Code Enforcement Officer': 'مفتش تطبيق الأنظمة',
  'College Admissions Counselor': 'مستشار قبول جامعي',
  'College Professor': 'أستاذ جامعي',
  'Commercial Cleaner': 'عامل تنظيف تجاري',
  'Commercial Real Estate Broker': 'وسيط عقارات تجارية',
  'Community Manager': 'مدير مجتمع',
  'Community Outreach Coordinator': 'منسق التواصل المجتمعي',
  'Complaints Handler': 'موظف معالجة الشكاوى',
  'Compliance Officer': 'مسؤول الامتثال',
  'Computer Operator': 'مشغل حاسوب',
  'Computer Science Professional': 'أخصائي علوم حاسوب',
  'Computer Technician': 'فني حاسوب',
  'Concierge': 'موظف استقبال فندقي',
  'Concrete Finisher': 'عامل تشطيب خرسانة',
  'Construction Manager': 'مدير إنشاءات',
  'Construction Superintendent': 'مشرف إنشاءات',
  'Construction Worker': 'عامل بناء',
  'Consultant': 'مستشار',
  'Content Creator': 'صانع محتوى',
  'Content Writer': 'كاتب محتوى',
  'Contract Specialist': 'أخصائي عقود',
  'Contracts Specialist': 'أخصائي عقود',
  'Controller': 'مراقب مالي',
  'Copywriter': 'كاتب إعلاني',
  'Corporate Security Manager': 'مدير أمن الشركات',
  'Correctional Officer': 'ضابط إصلاحية',
  'Court Clerk': 'كاتب محكمة',
  'Court Reporter': 'مسجل محكمة',
  'Creative Director': 'مدير إبداعي',
  'Crisis Counselor': 'مستشار أزمات',
  'Cruise Ship Worker': 'عامل سفينة سياحية',
  'Curriculum Developer': 'مطور مناهج',
  'Customer Experience Specialist': 'أخصائي تجربة العملاء',
  'Customer Service Representative': 'ممثل خدمة عملاء',
  'Customer Success Manager': 'مدير نجاح العملاء',
  'Customer Success Specialist': 'أخصائي نجاح العملاء',
  'Customer Support Specialist': 'أخصائي دعم العملاء',
  'Customs Officer': 'موظف جمارك',
  'Cybersecurity Analyst': 'محلل أمن سيبراني',
  'Data Analyst': 'محلل بيانات',
  'Data Architect': 'مهندس بنية بيانات',
  'Data Engineer': 'مهندس بيانات',
  'Data Entry Clerk': 'موظف إدخال بيانات',
  'Data Entry Operator': 'مشغل إدخال بيانات',
  'Data Entry Specialist': 'أخصائي إدخال بيانات',
  'Data Scientist': 'عالم بيانات',
  'Database Administrator': 'مدير قواعد بيانات',
  'Delivery Driver': 'سائق توصيل',
  'Dental Assistant': 'مساعد طبيب أسنان',
  'Dental Hygienist': 'أخصائي صحة أسنان',
  'Dental Office Manager': 'مدير عيادة أسنان',
  'Dentist': 'طبيب أسنان',
  'Design Engineer': 'مهندس تصميم',
  'Desktop Support Engineer': 'مهندس دعم فني',
  'Desktop Support Technician': 'فني دعم فني',
  'DevOps Engineer': 'مهندس DevOps',
  'Dialysis Technician': 'فني غسيل كلى',
  'Diesel Mechanic': 'ميكانيكي ديزل',
  'Dietary Aide': 'مساعد تغذية',
  'Dietitian': 'أخصائي تغذية',
  'Digital Marketer': 'مسوق رقمي',
  'Digital Marketing Manager': 'مدير تسويق رقمي',
  'Digital Marketing Specialist': 'أخصائي تسويق رقمي',
  'Dishwasher': 'غاسل أطباق',
  'Dispatcher': 'موزع رحلات',
  'District Manager': 'مدير منطقة',
  'Doctor': 'طبيب',
  'Dog Trainer': 'مدرب كلاب',
  'Driver': 'سائق',
  'Drywall Installer': 'فني تركيب جدران جافة',
  'EMT': 'فني طوارئ طبية',
  'ESL Teacher': 'معلم لغة إنجليزية كلغة ثانية',
  'Editor': 'محرر',
  'Education Consultant': 'مستشار تعليمي',
  'Educational Technologist': 'أخصائي تكنولوجيا التعليم',
  'Electrical Engineer': 'مهندس كهربائي',
  'Electrical Technician': 'فني كهرباء',
  'Electrician': 'كهربائي',
  'Elementary Teacher': 'معلم مرحلة ابتدائية',
  'Elevator Technician': 'فني مصاعد',
  'Embedded Systems Engineer': 'مهندس أنظمة مدمجة',
  'Emergency Management Coordinator': 'منسق إدارة الطوارئ',
  'Engineering Manager': 'مدير هندسة',
  'Environmental Compliance Officer': 'مسؤول الامتثال البيئي',
  'Epidemiologist': 'عالم أوبئة',
  'Escrow Officer': 'مسؤول حساب الضمان',
  'Ethical Hacker': 'مخترق أخلاقي',
  'Event Coordinator': 'منسق فعاليات',
  'Event Manager': 'مدير فعاليات',
  'Event Planner': 'مخطط فعاليات',
  'Executive Assistant': 'مساعد تنفيذي',
  'Executive Chef': 'شيف تنفيذي',
  'Executive Director': 'مدير تنفيذي',
  'Family Services Worker': 'عامل خدمات أسرية',
  'Fashion Designer': 'مصمم أزياء',
  'Fast Food Worker': 'عامل وجبات سريعة',
  'Fence Installer': 'فني تركيب أسوار',
  'Finance Manager': 'مدير مالي',
  'Financial Analyst': 'محلل مالي',
  'Firefighter': 'رجل إطفاء',
  'Fitness Center Manager': 'مدير مركز لياقة بدنية',
  'Fitness Instructor': 'مدرب لياقة بدنية',
  'Fitness Trainer': 'مدرب لياقة',
  'Flight Attendant': 'مضيف طيران',
  'Floor Installer': 'فني تركيب أرضيات',
  'Florist': 'بائع زهور',
  'Food Expeditor': 'منسق طلبات المطبخ',
  'Food Runner': 'ناقل أطباق',
  'Food Safety Manager': 'مدير سلامة الغذاء',
  'Food Scientist': 'عالم أغذية',
  'Food Server': 'نادل طعام',
  'Food Service Director': 'مدير خدمات الطعام',
  'Food Service Manager': 'مدير خدمة الطعام',
  'Food Service Worker': 'عامل خدمة طعام',
  'Food Stylist': 'مصمم تقديم طعام',
  'Food Truck Operator': 'مشغل عربة طعام',
  'Freelance Writer': 'كاتب مستقل',
  'Freight Broker': 'وسيط شحن',
  'Front Desk Agent': 'موظف مكتب استقبال',
  'Front Desk Receptionist': 'موظف استقبال',
  'Front End Developer': 'مطور واجهات أمامية',
  'Full Stack Developer': 'مطور متكامل',
  'Game Designer': 'مصمم ألعاب',
  'Game Developer': 'مطور ألعاب',
  'Glazier': 'فني زجاج',
  'Go Developer': 'مطور Go',
  'Grants Manager': 'مدير المنح',
  'Graphic Designer': 'مصمم جرافيك',
  'Group Fitness Instructor': 'مدرب لياقة جماعية',
  'Gym Trainer': 'مدرب صالة رياضية',
  'HR Assistant': 'مساعد موارد بشرية',
  'HR Business Partner': 'شريك أعمال الموارد البشرية',
  'HR Coordinator': 'منسق موارد بشرية',
  'HR Director': 'مدير الموارد البشرية',
  'HR Executive': 'مسؤول موارد بشرية تنفيذي',
  'HR Manager': 'مدير موارد بشرية',
  'HR Recruiter': 'مسؤول توظيف موارد بشرية',
  'HVAC Technician': 'فني تكييف وتبريد',
  'Head Cook': 'رئيس طهاة',
  'Health Coach': 'مدرب صحي',
  'Health Inspector': 'مفتش صحي',
  'Heavy Equipment Operator': 'مشغل معدات ثقيلة',
  'Help Desk Technician': 'فني مكتب المساعدة',
  'High School Teacher': 'معلم مرحلة ثانوية',
  'Home Health Aide': 'مساعد صحي منزلي',
  'Home Inspector': 'مفتش منازل',
  'Hospice Nurse': 'ممرض رعاية تلطيفية',
  'Hospital Housekeeper': 'عامل نظافة مستشفى',
  'Hotel Front Desk Agent': 'موظف استقبال فندق',
  'Hotel Manager': 'مدير فندق',
  'House Cleaner': 'عامل تنظيف منازل',
  'Housekeeper': 'مدبر منزل',
  'Housekeeping Supervisor': 'مشرف خدمات النظافة',
  'IT Director': 'مدير تقنية المعلومات',
  'IT Manager': 'مدير تكنولوجيا المعلومات',
  'IT Recruiter': 'مسؤول توظيف تقنية المعلومات',
  'IT Specialist': 'أخصائي تقنية معلومات',
  'IT Support Specialist': 'أخصائي دعم تقنية المعلومات',
  'IT Support Technician': 'فني دعم تقنية المعلومات',
  'IT Technician': 'فني تقنية معلومات',
  'Illustrator': 'رسام توضيحي',
  'Industrial Engineer': 'مهندس صناعي',
  'Industrial Maintenance Technician': 'فني صيانة صناعية',
  'Information Security Analyst': 'محلل أمن معلومات',
  'Inside Sales Representative': 'مندوب مبيعات داخلي',
  'Instructional Coach': 'مدرب تعليمي',
  'Instructional Designer': 'مصمم تعليمي',
  'Insulation Worker': 'عامل عزل',
  'Insurance Agent': 'وكيل تأمين',
  'Interior Designer': 'مصمم داخلي',
  'Intern': 'متدرب',
  'Iron Worker': 'عامل حديد',
  'Ironworker': 'حداد إنشائي',
  'Janitor': 'عامل نظافة',
  'Java Full Stack Developer': 'مطور جافا متكامل',
  'JavaScript Developer': 'مطور جافا سكريبت',
  'Junior Developer': 'مطور مبتدئ',
  'Kitchen Helper': 'مساعد مطبخ',
  'Kitchen Manager': 'مدير مطبخ',
  'Lab Assistant': 'مساعد مختبر',
  'Lab Technician': 'فني مختبر',
  'Landscaper': 'منسق حدائق',
  'Leasing Consultant': 'مستشار تأجير',
  'Legal Analyst': 'محلل قانوني',
  'Legal Assistant': 'مساعد قانوني',
  'Legal Secretary': 'سكرتير قانوني',
  'Legislative Aide': 'مساعد تشريعي',
  'Librarian': 'أمين مكتبة',
  'Library Assistant': 'مساعد مكتبة',
  'Licensed Practical Nurse (LPN)': 'ممرض عملي مرخص (LPN)',
  'Limousine Driver': 'سائق ليموزين',
  'Line Cook': 'طاهي خط إنتاج',
  'Litigation Support Specialist': 'أخصائي دعم التقاضي',
  'Loan Officer': 'مسؤول قروض',
  'Loan Processor': 'معالج قروض',
  'Locksmith': 'صانع أقفال',
  'Logistics Coordinator': 'منسق لوجستيات',
  'Logistics Manager': 'مدير لوجستيات',
  'Logistics Specialist': 'أخصائي لوجستيات',
  'Long Haul Truck Driver': 'سائق شاحنات مسافات طويلة',
  'Loss Prevention Specialist': 'أخصائي منع الخسائر',
  'MRI Technologist': 'فني تصوير بالرنين المغناطيسي',
  'Machine Learning Engineer': 'مهندس تعلم آلي',
  'Machine Learning Specialist': 'أخصائي تعلم آلي',
  'Machine Operator': 'مشغل آلات',
  'Maintenance Engineer': 'مهندس صيانة',
  'Maintenance Manager': 'مدير صيانة',
  'Maintenance Technician': 'فني صيانة',
  'Makeup Artist': 'فنان مكياج',
  'Management Consultant': 'مستشار إداري',
  'Manufacturing Engineer': 'مهندس تصنيع',
  'Manufacturing Worker': 'عامل تصنيع',
  'Marketing Analyst': 'محلل تسويق',
  'Marketing Assistant': 'مساعد تسويق',
  'Marketing Coordinator': 'منسق تسويق',
  'Marketing Director': 'مدير تسويق',
  'Marketing Executive': 'مسؤول تسويق تنفيذي',
  'Marketing Intern': 'متدرب تسويق',
  'Marketing Manager': 'مدير تسويق',
  'Marketing Specialist': 'أخصائي تسويق',
  'Mason': 'بنّاء',
  'Massage Therapist': 'معالج بالتدليك',
  'Material Handler': 'عامل مناولة مواد',
  'Mechanical Design Engineer': 'مهندس تصميم ميكانيكي',
  'Mechanical Engineer': 'مهندس ميكانيكي',
  'Mechanical Technician': 'فني ميكانيكي',
  'Mediator': 'وسيط',
  'Medical Assistant': 'مساعد طبي',
  'Medical Billing Specialist': 'أخصائي فواتير طبية',
  'Medical Coder': 'مبرمج طبي',
  'Medical Office Assistant': 'مساعد مكتب طبي',
  'Medical Receptionist': 'موظف استقبال طبي',
  'Medical Representative': 'مندوب طبي',
  'Medical Scribe': 'كاتب طبي',
  'Medical Technologist': 'تقني طبي',
  'Mental Health Counselor': 'مستشار صحة نفسية',
  'Millwright': 'فني تركيب آلات',
  'Mobile Developer': 'مطور تطبيقات الجوال',
  'Mortgage Loan Officer': 'مسؤول قروض عقارية',
  'Motion Graphics Designer': 'مصمم رسوم متحركة',
  'Moving Company Driver': 'سائق شركة نقل',
  'Music Producer': 'منتج موسيقي',
  'Nanny': 'مربية أطفال',
  'Network Administrator': 'مدير شبكات',
  'Network Engineer': 'مهندس شبكات',
  'Night Auditor': 'مدقق ليلي',
  'Node.js Developer': 'مطور Node.js',
  'Nurse Practitioner': 'ممرض ممارس',
  'Nursing Assistant': 'مساعد تمريض',
  'Nutritionist': 'أخصائي تغذية',
  'Occupational Therapist': 'أخصائي علاج وظيفي',
  'Occupational Therapy Assistant': 'مساعد علاج وظيفي',
  'Office Administrator': 'مدير مكتب',
  'Office Assistant': 'مساعد مكتب',
  'Office Clerk': 'كاتب مكتب',
  'Office Manager': 'مدير مكتب',
  'Operations Analyst': 'محلل عمليات',
  'Operations Manager': 'مدير عمليات',
  'Optician': 'أخصائي بصريات',
  'Optometrist': 'طبيب بصريات',
  'Painter': 'دهان',
  'Paralegal': 'مساعد قانوني',
  'Paramedic': 'مسعف',
  'Park Ranger': 'حارس حديقة وطنية',
  'Pastry Chef': 'شيف حلويات',
  'Payroll Specialist': 'أخصائي رواتب',
  'Penetration Tester': 'مختبر اختراق',
  'Personal Trainer': 'مدرب شخصي',
  'Pest Control Technician': 'فني مكافحة آفات',
  'Pet Groomer': 'مزين حيوانات أليفة',
  'Pet Sitter': 'جليس حيوانات أليفة',
  'Pharmacist': 'صيدلي',
  'Pharmacy Assistant': 'مساعد صيدلي',
  'Pharmacy Tech': 'فني صيدلة',
  'Pharmacy Technician': 'فني صيدلة',
  'Phlebotomist': 'فني سحب دم',
  'Photographer': 'مصور فوتوغرافي',
  'Physical Therapist': 'أخصائي علاج طبيعي',
  'Physical Therapy Assistant': 'مساعد علاج طبيعي',
  'Physician Assistant': 'مساعد طبيب',
  'Pilates Instructor': 'مدرب بيلاتس',
  'Pizza Maker': 'صانع بيتزا',
  'Platform Engineer': 'مهندس منصات',
  'Plumber': 'سباك',
  'Police Officer': 'ضابط شرطة',
  'Policy Analyst': 'محلل سياسات',
  'Pool Cleaner': 'منظف مسابح',
  'Pool Technician': 'فني مسابح',
  'Postal Worker': 'عامل بريد',
  'Power BI Developer': 'مطور Power BI',
  'Prep Cook': 'طاهي تحضيرات',
  'Preschool Teacher': 'معلم رياض أطفال',
  'Pressure Washer': 'فني غسيل بالضغط',
  'Probation Officer': 'ضابط مراقبة',
  'Process Engineer': 'مهندس عمليات',
  'Procurement Manager': 'مدير مشتريات',
  'Procurement Specialist': 'أخصائي مشتريات',
  'Product Analyst': 'محلل منتجات',
  'Product Designer': 'مصمم منتجات',
  'Product Manager': 'مدير منتجات',
  'Product Marketing Manager': 'مدير تسويق منتجات',
  'Product Owner': 'مالك منتج',
  'Production Assistant': 'مساعد إنتاج',
  'Production Engineer': 'مهندس إنتاج',
  'Production Manager': 'مدير إنتاج',
  'Production Worker': 'عامل إنتاج',
  'Program Coordinator': 'منسق برامج',
  'Project Coordinator': 'منسق مشاريع',
  'Project Engineer': 'مهندس مشاريع',
  'Project Manager': 'مدير مشاريع',
  'Prompt Engineer': 'مهندس أوامر ذكاء اصطناعي',
  'Property Manager': 'مدير عقارات',
  'Psychiatrist': 'طبيب نفسي',
  'Psychologist': 'أخصائي نفسي',
  'Public Affairs Specialist': 'أخصائي شؤون عامة',
  'Public Health Inspector': 'مفتش صحة عامة',
  'Python Developer': 'مطور بايثون',
  'QA Analyst': 'محلل ضمان الجودة',
  'QA Engineer': 'مهندس ضمان الجودة',
  'QA Manager': 'مدير ضمان الجودة',
  'QA Tester': 'مختبر ضمان الجودة',
  'Quality Analyst': 'محلل جودة',
  'Quality Assurance Specialist': 'أخصائي ضمان الجودة',
  'Quality Control Inspector': 'مفتش مراقبة الجودة',
  'Quality Engineer': 'مهندس جودة',
  'Quality Manager': 'مدير جودة',
  'Radiologic Technologist': 'فني أشعة',
  'React Developer': 'مطور React',
  'Reading Specialist': 'أخصائي قراءة',
  'Real Estate Agent': 'وكيل عقارات',
  'Real Estate Appraiser': 'مثمّن عقارات',
  'Real Estate Assistant': 'مساعد عقارات',
  'Real Estate Attorney': 'محامي عقارات',
  'Real Estate Investor': 'مستثمر عقاري',
  'Receptionist': 'موظف استقبال',
  'Recreation Coordinator': 'منسق ترفيه',
  'Recruiter': 'مسؤول توظيف',
  'Recruiting Coordinator': 'منسق توظيف',
  'Registered Nurse': 'ممرض مسجل',
  'Release Engineer': 'مهندس إصدارات',
  'Research Analyst': 'محلل أبحاث',
  'Research Assistant': 'مساعد باحث',
  'Reservation Agent': 'موظف حجوزات',
  'Resident Assistant': 'مساعد سكني',
  'Residential Cleaner': 'عامل تنظيف منازل',
  'Respiratory Therapist': 'أخصائي علاج تنفسي',
  'Restaurant Manager': 'مدير مطعم',
  'Retail Assistant': 'مساعد مبيعات تجزئة',
  'Retail Associate': 'موظف تجزئة',
  'Retail Manager': 'مدير تجزئة',
  'Retail Sales Associate': 'مندوب مبيعات تجزئة',
  'Retail Store Manager': 'مدير متجر تجزئة',
  'Risk Management Specialist': 'أخصائي إدارة المخاطر',
  'Roofer': 'عامل أسقف',
  'Rust Developer': 'مطور Rust',
  'SAP Consultant': 'مستشار SAP',
  'SOC Analyst': 'محلل مركز عمليات الأمن',
  'Sales Assistant': 'مساعد مبيعات',
  'Sales Associate': 'موظف مبيعات',
  'Sales Consultant': 'مستشار مبيعات',
  'Sales Coordinator': 'منسق مبيعات',
  'Sales Director': 'مدير مبيعات',
  'Sales Engineer': 'مهندس مبيعات',
  'Sales Executive': 'مسؤول مبيعات تنفيذي',
  'Sales Manager': 'مدير مبيعات',
  'Sales Representative': 'مندوب مبيعات',
  'Salesforce Administrator': 'مدير نظام Salesforce',
  'School Administrator': 'مدير مدرسة',
  'School Counselor': 'مرشد مدرسي',
  'Scrum Master': 'قائد سكرم',
  'Seaman': 'بحار',
  'Security Analyst': 'محلل أمني',
  'Security Engineer': 'مهندس أمن',
  'Security Guard': 'حارس أمن',
  'Security Officer': 'ضابط أمن',
  'Server': 'نادل',
  'Service Advisor': 'مستشار خدمة',
  'Service Crew': 'طاقم خدمة',
  'Set Designer': 'مصمم ديكور مسرحي',
  'Sheet Metal Worker': 'عامل صفائح معدنية',
  'Shipping & Receiving Clerk': 'موظف شحن واستلام',
  'Site Engineer': 'مهندس موقع',
  'Site Reliability Engineer': 'مهندس موثوقية الموقع',
  'Small Business Owner': 'صاحب مشروع صغير',
  'Social Media Coordinator': 'منسق وسائل التواصل الاجتماعي',
  'Social Media Manager': 'مدير وسائل التواصل الاجتماعي',
  'Social Media Specialist': 'أخصائي وسائل التواصل الاجتماعي',
  'Social Worker': 'أخصائي اجتماعي',
  'Software Architect': 'مهندس برمجيات',
  'Software Developer': 'مطور برمجيات',
  'Software Engineer': 'مهندس برمجيات',
  'Software Tester': 'مختبر برمجيات',
  'Solar Installer': 'فني تركيب طاقة شمسية',
  'Solution Architect': 'مهندس حلول',
  'Solutions Engineer': 'مهندس حلول',
  'Sommelier': 'ساقي نبيذ',
  'Sous Chef': 'شيف مساعد',
  'Spa Manager': 'مدير منتجع صحي',
  'Special Education Teacher': 'معلم تربية خاصة',
  'Speech-Language Pathologist': 'أخصائي أمراض النطق واللغة',
  'Sports Coach': 'مدرب رياضي',
  'Stage Manager': 'مدير مسرح',
  'Sterile Processing Technician': 'فني تعقيم',
  'Store Associate': 'موظف متجر',
  'Store Manager': 'مدير متجر',
  'Storyboard Artist': 'فنان لوحات مصورة',
  'Substance Abuse Counselor': 'مستشار علاج الإدمان',
  'Supply Chain Analyst': 'محلل سلسلة إمداد',
  'Supply Chain Manager': 'مدير سلسلة إمداد',
  'Support Worker': 'عامل دعم',
  'Surgical Technologist': 'فني جراحة',
  'Sushi Chef': 'شيف سوشي',
  'System Administrator': 'مدير أنظمة',
  'System Analyst': 'محلل أنظمة',
  'System Engineer': 'مهندس أنظمة',
  'TSA Agent': 'موظف أمن المطارات',
  'Talent Acquisition Specialist': 'أخصائي استقطاب المواهب',
  'Teacher': 'معلم',
  'Teaching Assistant': 'مساعد تدريس',
  'Team Leader': 'قائد فريق',
  'Tech Sales Representative': 'مندوب مبيعات تقنية',
  'Technical Program Manager': 'مدير برامج تقنية',
  'Technical Recruiter': 'مسؤول توظيف تقني',
  'Technical Support Specialist': 'أخصائي دعم تقني',
  'Technical Writer': 'كاتب تقني',
  'Therapist': 'معالج نفسي',
  'Title Examiner': 'فاحص ملكيات',
  'Tour Guide': 'مرشد سياحي',
  'Travel Agent': 'وكيل سفر',
  'Truck Driver': 'سائق شاحنة',
  'Tutor': 'مدرس خصوصي',
  'UI Designer': 'مصمم واجهة المستخدم',
  'UX Designer': 'مصمم تجربة المستخدم',
  'UX Researcher': 'باحث تجربة المستخدم',
  'Ultrasound Technician': 'فني أشعة فوق صوتية',
  'Valet Attendant': 'خادم صف سيارات',
  'Veterans Service Officer': 'مسؤول خدمات المحاربين القدامى',
  'Veterinary Assistant': 'مساعد بيطري',
  'Veterinary Technician': 'فني بيطري',
  'Video Editor': 'محرر فيديو',
  'Videographer': 'مصور فيديو',
  'Virtual Assistant': 'مساعد افتراضي',
  'Voice Actor': 'ممثل أداء صوتي',
  'Waiter/Waitress': 'نادل/نادلة',
  'Warehouse Associate': 'موظف مستودع',
  'Warehouse Manager': 'مدير مستودع',
  'Warehouse Worker': 'عامل مستودع',
  'Web Designer': 'مصمم مواقع',
  'Web Developer': 'مطور مواقع',
  'Welder': 'لحّام',
  'Wellness Coach': 'مدرب صحة وعافية',
  'Wildlife Biologist': 'عالم أحياء برية',
  'Wind Turbine Technician': 'فني توربينات رياح',
  'Window Cleaner': 'منظف نوافذ',
  'X-Ray Technician': 'فني أشعة سينية',
  'Yoga Instructor': 'مدرب يوغا',
  'Youth Counselor': 'مرشد شباب',
  'Zookeeper': 'حارس حديقة حيوان',
  'iOS Developer': 'مطور iOS',
};

// ─── CATEGORIES (46 entries) ─────────────────────────────────────────────────

export const CATEGORIES = {
  'Technology': 'التكنولوجيا',
  'Healthcare': 'الرعاية الصحية',
  'Trades': 'الحرف والمهن',
  'Hospitality': 'الضيافة',
  'Food Service': 'خدمات الطعام',
  'Creative': 'الإبداع والفنون',
  'Education': 'التعليم',
  'Government': 'الحكومة',
  'Finance': 'المالية',
  'Marketing': 'التسويق',
  'Business': 'الأعمال',
  'Engineering': 'الهندسة',
  'Sales': 'المبيعات',
  'Legal': 'القانون',
  'Real Estate': 'العقارات',
  'HR': 'الموارد البشرية',
  'Fitness': 'اللياقة البدنية',
  'Management': 'الإدارة',
  'Animal Care': 'رعاية الحيوانات',
  'Logistics': 'اللوجستيات',
  'Customer Service': 'خدمة العملاء',
  'Administrative': 'الإدارة المكتبية',
  'Transportation': 'النقل',
  'Retail': 'التجزئة',
  'Cleaning': 'التنظيف',
  'Social Services': 'الخدمات الاجتماعية',
  'Manufacturing': 'التصنيع',
  'Construction': 'البناء والتشييد',
  'Security': 'الأمن',
  'Science': 'العلوم',
  'Events': 'الفعاليات',
  'Writing & Content': 'الكتابة والمحتوى',
  'Supply Chain': 'سلسلة الإمداد',
  'Research': 'البحث العلمي',
  'Insurance': 'التأمين',
  'Consulting': 'الاستشارات',
  'Aviation': 'الطيران',
  'Automotive': 'السيارات',
  'Media': 'الإعلام',
  'Maritime': 'القطاع البحري',
  'Law Enforcement': 'تطبيق القانون',
  'Entry-Level': 'المبتدئين',
  'Entertainment': 'الترفيه',
  'Childcare': 'رعاية الأطفال',
  'Beauty': 'التجميل',
  'Architecture': 'العمارة',
};

// ─── TAG GENERATION ──────────────────────────────────────────────────────────

export function generateTags(jobTitle, slug) {
  return [
    `سيرة ذاتية ${jobTitle}`,
    `نموذج سيرة ذاتية ${jobTitle}`,
    `CV ${jobTitle}`,
    `قالب سيرة ذاتية ${jobTitle}`,
    `سيرة ذاتية احترافية ${jobTitle}`,
    'سيرة ذاتية جاهزة',
    'قالب سيرة ذاتية ATS',
    'كتابة سيرة ذاتية احترافية',
  ];
}

// ─── FAQ GENERATION ──────────────────────────────────────────────────────────

export function generateFAQ(jobTitle) {
  return [
    {
      question: `ما أهم المهارات التي يجب تضمينها في السيرة الذاتية لـ ${jobTitle}؟`,
      answer: `ركّز على المهارات التقنية والعملية المطلوبة في مجال ${jobTitle}، مثل الأدوات والبرامج المستخدمة يوميًا والشهادات المهنية ذات الصلة. أضف أيضًا المهارات الشخصية كالتواصل والعمل الجماعي وحل المشكلات التي يبحث عنها أصحاب العمل. تأكد من مطابقة المهارات المذكورة مع متطلبات الوظيفة المحددة في إعلان التوظيف.`,
    },
    {
      question: `ما الطول المثالي للسيرة الذاتية لـ ${jobTitle}؟`,
      answer: `بالنسبة لمعظم وظائف ${jobTitle}، تكون صفحة واحدة كافية إذا كانت خبرتك أقل من 10 سنوات. إذا كنت تمتلك خبرة واسعة مع إنجازات متعددة وشهادات متخصصة، يمكنك استخدام صفحتين بحد أقصى. الأهم هو التركيز على المعلومات ذات الصلة المباشرة بالوظيفة المستهدفة وتجنب الحشو.`,
    },
    {
      question: `ما أفضل تنسيق للسيرة الذاتية لوظيفة ${jobTitle}؟`,
      answer: `التنسيق الزمني العكسي هو الأكثر شيوعًا وفعالية لمعظم وظائف ${jobTitle}، حيث يبدأ بأحدث خبرة عملية. إذا كنت تغير مسارك المهني، يمكنك استخدام التنسيق المختلط الذي يركز على المهارات أولًا. احرص على استخدام تنسيق متوافق مع أنظمة تتبع المتقدمين (ATS) لضمان وصول سيرتك الذاتية إلى مسؤول التوظيف.`,
    },
    {
      question: `كم يبلغ متوسط راتب ${jobTitle} في 2026؟`,
      answer: `يختلف راتب ${jobTitle} حسب الموقع الجغرافي وسنوات الخبرة وحجم المؤسسة. يمكنك الاطلاع على بيانات الراتب المفصلة في قسم الراتب وتوقعات سوق العمل أعلاه. تُعد مصادر مثل مكتب إحصاءات العمل الأمريكي و Glassdoor و PayScale من أفضل المراجع للحصول على بيانات رواتب محدّثة.`,
    },
    {
      question: `ما الذي يجب تضمينه في السيرة الذاتية لوظيفة ${jobTitle}؟`,
      answer: `يجب أن تتضمن سيرتك الذاتية ملخصًا مهنيًا مقنعًا، وخبراتك العملية مع إنجازات قابلة للقياس، ومؤهلاتك التعليمية، والمهارات التقنية والشخصية المتعلقة بمجال ${jobTitle}. لا تنسَ إضافة الشهادات المهنية والدورات التدريبية ذات الصلة، وأي مشاريع أو إنجازات بارزة تميزك عن باقي المتقدمين.`,
    },
  ];
}

// ─── BODY GENERATION ─────────────────────────────────────────────────────────

/**
 * Normalize English category name into ~15 groups for category-specific intro.
 */
function normalizeCategory(category) {
  const map = {
    'Technology': 'Technology',
    'Healthcare': 'Healthcare',
    'Finance': 'Finance',
    'Education': 'Education',
    'Food Service': 'Food Service',
    'Hospitality': 'Hospitality',
    'Trades': 'Trades',
    'Creative': 'Creative',
    'Administrative': 'Administrative',
    'Sales': 'Sales',
    'HR': 'HR',
    'Customer Service': 'Customer Service',
    'Retail': 'Retail',
    'Logistics': 'Logistics',
    'Government': 'Government',
    'Legal': 'Legal',
    'Engineering': 'Engineering',
    'Marketing': 'Marketing',
    'Business': 'Business',
    'Management': 'Management',
    'Fitness': 'Fitness',
    'Animal Care': 'Animal Care',
    'Transportation': 'Transportation',
    'Cleaning': 'Cleaning',
    'Social Services': 'Social Services',
    'Manufacturing': 'Manufacturing',
    'Construction': 'Construction',
    'Security': 'Security',
    'Science': 'Science',
    'Events': 'Events',
    'Writing & Content': 'Creative',
    'Supply Chain': 'Logistics',
    'Research': 'Science',
    'Insurance': 'Finance',
    'Consulting': 'Business',
    'Aviation': 'Transportation',
    'Automotive': 'Trades',
    'Media': 'Creative',
    'Maritime': 'Transportation',
    'Law Enforcement': 'Government',
    'Entry-Level': 'default',
    'Entertainment': 'Creative',
    'Childcare': 'Education',
    'Beauty': 'Creative',
    'Architecture': 'Engineering',
  };
  return map[category] || 'default';
}

function getCategoryIntro(normalized, jobTitle) {
  const intros = {
    Technology: `يتميز قطاع التكنولوجيا بتطوره المستمر ومتطلباته المتجددة، مما يجعل السيرة الذاتية لـ ${jobTitle} وثيقة حاسمة في عملية التوظيف. يبحث مديرو التوظيف في هذا القطاع عن مزيج من المهارات التقنية المتقدمة والقدرة على التعلم السريع والتكيف مع التقنيات الناشئة. يجب أن تعكس سيرتك الذاتية إتقانك للأدوات والتقنيات المطلوبة مع إبراز مشاريعك العملية ونتائجها القابلة للقياس.`,
    Healthcare: `يُعد قطاع الرعاية الصحية من أكثر القطاعات تنظيمًا وحساسية، لذا فإن السيرة الذاتية لـ ${jobTitle} يجب أن تعكس الالتزام بأعلى معايير الجودة والسلامة. يهتم أصحاب العمل في المجال الصحي بالتراخيص المهنية والشهادات السارية والخبرة السريرية الموثقة. احرص على إبراز قدرتك على التعامل مع المرضى والعمل ضمن فرق متعددة التخصصات والالتزام بمعايير الرعاية الصحية.`,
    Finance: `في القطاع المالي، تحتاج السيرة الذاتية لـ ${jobTitle} إلى إظهار الدقة والمهنية العالية التي يتوقعها أصحاب العمل. يبحث مديرو التوظيف عن خبرة مثبتة في التحليل المالي وإدارة المخاطر والامتثال التنظيمي. أبرز شهاداتك المهنية مثل CPA أو CFA أو CMA، واعرض إنجازاتك بأرقام ونسب مئوية توضح تأثيرك الفعلي على الأداء المالي للمؤسسات التي عملت بها.`,
    Education: `يتطلب قطاع التعليم سيرة ذاتية لـ ${jobTitle} تعكس الشغف بالتدريس والقدرة على إلهام الطلاب وتحقيق نتائج تعليمية ملموسة. يبحث مديرو المدارس والمؤسسات التعليمية عن مؤهلات أكاديمية متينة وخبرة عملية في تطوير المناهج وتطبيق أساليب التدريس الحديثة. أبرز نتائج طلابك وأساليبك المبتكرة في التعليم والتقنيات التي تستخدمها في الفصل الدراسي.`,
    'Food Service': `يتميز قطاع خدمات الطعام بطبيعته السريعة ومتطلباته العالية، مما يجعل السيرة الذاتية لـ ${jobTitle} بحاجة إلى إبراز مهاراتك العملية وقدرتك على العمل تحت الضغط. يهتم أصحاب المطاعم بخبرتك في التعامل مع أنظمة سلامة الغذاء والعمل في بيئات سريعة الإيقاع وتقديم خدمة عملاء متميزة. ركّز على الشهادات المتعلقة بسلامة الغذاء وإنجازاتك في تحسين جودة الخدمة أو تقليل الهدر.`,
    Hospitality: `في قطاع الضيافة، تُعد السيرة الذاتية لـ ${jobTitle} انعكاسًا مباشرًا لقدرتك على تقديم تجربة استثنائية للضيوف. يبحث مديرو الفنادق والمنتجعات عن مهارات التواصل الممتازة والقدرة على حل المشكلات بسرعة وإدارة توقعات العملاء. أبرز خبرتك في أنظمة إدارة الضيافة ومهاراتك اللغوية وأي تقييمات إيجابية حصلت عليها من الضيوف أو الإدارة.`,
    Trades: `تحتاج السيرة الذاتية لـ ${jobTitle} في قطاع الحرف والمهن إلى التركيز على المهارات العملية والشهادات المهنية والتدريب المتخصص. يبحث أصحاب العمل عن خبرة ميدانية مثبتة والتزام بمعايير السلامة المهنية والقدرة على قراءة المخططات والمواصفات الفنية. أبرز تراخيصك المهنية وسجلك في السلامة وقدرتك على إنجاز المشاريع في الوقت المحدد وضمن الميزانية.`,
    Creative: `في المجال الإبداعي، تحتاج السيرة الذاتية لـ ${jobTitle} إلى أن تكون بحد ذاتها عملًا إبداعيًا يعكس مهاراتك وذوقك الفني. يبحث المديرون الفنيون عن محفظة أعمال قوية ومهارات تقنية في الأدوات الإبداعية المعاصرة والقدرة على ترجمة رؤية العميل إلى واقع. أضف رابطًا لمحفظة أعمالك الرقمية واعرض مشاريعك الأكثر تأثيرًا مع توضيح دورك المحدد في كل منها.`,
    Administrative: `تتطلب السيرة الذاتية لـ ${jobTitle} في المجال الإداري إبراز مهاراتك التنظيمية وقدرتك على إدارة المهام المتعددة بكفاءة عالية. يبحث أصحاب العمل عن إتقان برامج المكتب والقدرة على التواصل الفعال وإدارة الوقت والأولويات. ركّز على إنجازاتك في تحسين العمليات الإدارية وتوفير الوقت والتكاليف مع الحفاظ على مستوى عالٍ من الدقة والاحترافية.`,
    Sales: `في مجال المبيعات، تُعد السيرة الذاتية لـ ${jobTitle} أداة بيع بحد ذاتها يجب أن تقنع مدير التوظيف بقدرتك على تحقيق النتائج. يبحث أصحاب العمل عن سجل مبيعات مثبت بالأرقام ومهارات التفاوض وبناء العلاقات والقدرة على تحقيق الأهداف وتجاوزها. أبرز نسب تحقيق الأهداف وحجم الصفقات المغلقة ومعدلات الاحتفاظ بالعملاء وأي جوائز أو تكريمات حصلت عليها.`,
    HR: `تتطلب السيرة الذاتية لـ ${jobTitle} في مجال الموارد البشرية أن تكون نموذجًا للاحترافية، فأنت بصفتك متخصصًا في التوظيف تُقيَّم من خلال سيرتك الذاتية نفسها. يبحث أصحاب العمل عن خبرة في أنظمة الموارد البشرية والتوظيف وتطوير الموظفين والامتثال لقوانين العمل. أبرز مقاييس التوظيف ومعدلات الاحتفاظ بالموظفين وبرامج التطوير التي أطلقتها ومبادرات تحسين بيئة العمل.`,
    'Customer Service': `تحتاج السيرة الذاتية لـ ${jobTitle} في مجال خدمة العملاء إلى إظهار مهاراتك في التواصل وحل المشكلات والتعامل مع مختلف أنماط العملاء. يبحث أصحاب العمل عن قدرتك على الحفاظ على رضا العملاء حتى في المواقف الصعبة وإتقانك لأنظمة إدارة علاقات العملاء (CRM). ركّز على معدلات رضا العملاء ومتوسط وقت حل المشكلات وأي تحسينات أدخلتها على عمليات خدمة العملاء.`,
    Retail: `في قطاع التجزئة، تحتاج السيرة الذاتية لـ ${jobTitle} إلى إبراز مهاراتك في خدمة العملاء وتحقيق أهداف المبيعات وإدارة المخزون. يبحث مديرو المتاجر عن موظفين يتمتعون بمهارات التواصل والقدرة على العمل في بيئة سريعة الإيقاع والاهتمام بالتفاصيل. أبرز إنجازاتك في زيادة المبيعات وتحسين تجربة العملاء وأي مبادرات قدتها لتحسين عمليات المتجر.`,
    Logistics: `تتطلب السيرة الذاتية لـ ${jobTitle} في مجال اللوجستيات إبراز مهاراتك في التخطيط والتنظيم وإدارة سلاسل الإمداد بكفاءة. يبحث أصحاب العمل عن خبرة في أنظمة إدارة المستودعات والنقل والقدرة على تحسين العمليات وتقليل التكاليف. ركّز على إنجازاتك في تحسين كفاءة التوصيل وتقليل أوقات الانتظار وتحقيق وفورات في التكاليف التشغيلية.`,
    Government: `تتميز الوظائف الحكومية بمتطلبات محددة وعمليات توظيف منظمة، لذا فإن السيرة الذاتية لـ ${jobTitle} يجب أن تلتزم بمعايير القطاع العام. يبحث أصحاب العمل الحكوميون عن الخبرة في السياسات العامة والامتثال التنظيمي وخدمة المواطنين. أبرز فهمك للأنظمة الحكومية وقدرتك على العمل ضمن الأطر القانونية والتنظيمية وإنجازاتك في تحسين الخدمات العامة.`,
    Legal: `في القطاع القانوني، تحتاج السيرة الذاتية لـ ${jobTitle} إلى إظهار مستوى عالٍ من الدقة والمهنية والاهتمام بالتفاصيل. يبحث مكاتب المحاماة والمؤسسات القانونية عن خبرة في البحث القانوني وصياغة المستندات والإلمام بالقوانين واللوائح ذات الصلة. أبرز قضاياك الناجحة وشهاداتك المهنية ومهاراتك في التحليل القانوني والتفاوض.`,
    Engineering: `تتطلب السيرة الذاتية لـ ${jobTitle} في مجال الهندسة إبراز مهاراتك التقنية المتقدمة وخبرتك في المشاريع الهندسية المعقدة. يبحث أصحاب العمل عن إتقان برامج التصميم والمحاكاة والقدرة على حل المشكلات التقنية وإدارة المشاريع. ركّز على مشاريعك البارزة والتقنيات التي استخدمتها والنتائج القابلة للقياس التي حققتها.`,
    Marketing: `في مجال التسويق، تحتاج السيرة الذاتية لـ ${jobTitle} إلى إبراز قدرتك على تحقيق النتائج وقياس العائد على الاستثمار التسويقي. يبحث أصحاب العمل عن خبرة في التسويق الرقمي وتحليل البيانات وإدارة الحملات متعددة القنوات. أبرز مقاييس أداء حملاتك السابقة ومعدلات التحويل ونمو قاعدة العملاء وأي استراتيجيات مبتكرة نفذتها.`,
    Business: `تتطلب السيرة الذاتية لـ ${jobTitle} في مجال الأعمال إبراز رؤيتك الاستراتيجية وقدرتك على تحقيق النمو والربحية. يبحث أصحاب العمل عن مهارات القيادة والتخطيط الاستراتيجي وتحليل السوق واتخاذ القرارات المبنية على البيانات. ركّز على إنجازاتك في تطوير الأعمال وزيادة الإيرادات وتحسين العمليات وبناء شراكات استراتيجية.`,
    Management: `في مجال الإدارة، تحتاج السيرة الذاتية لـ ${jobTitle} إلى إبراز مهاراتك القيادية وقدرتك على تحقيق الأهداف من خلال فرق العمل. يبحث أصحاب العمل عن خبرة مثبتة في إدارة الفرق وتطوير الأداء وتحقيق الأهداف الاستراتيجية. أبرز حجم الفرق التي قدتها والميزانيات التي أدرتها والنتائج القابلة للقياس التي حققتها.`,
    Fitness: `تتطلب السيرة الذاتية لـ ${jobTitle} في مجال اللياقة البدنية إبراز شهاداتك المهنية وخبرتك العملية في تدريب مختلف الفئات. يبحث أصحاب العمل عن شهادات معتمدة دوليًا وقدرة على تصميم برامج تدريبية فردية وجماعية وتحفيز العملاء. ركّز على قصص نجاح عملائك ومعدلات الاحتفاظ وأي تخصصات فريدة تميزك.`,
    'Animal Care': `تحتاج السيرة الذاتية لـ ${jobTitle} في مجال رعاية الحيوانات إلى إظهار شغفك بالحيوانات ومعرفتك التخصصية وقدرتك على التعامل مع مختلف أنواعها. يبحث أصحاب العمل عن خبرة عملية في التعامل مع الحيوانات والالتزام بمعايير الرعاية والسلامة. أبرز شهاداتك المتخصصة وخبرتك في إجراءات الرعاية وأي إنجازات في تحسين صحة الحيوانات.`,
    Transportation: `تتطلب السيرة الذاتية لـ ${jobTitle} في مجال النقل إبراز رخصك المهنية وسجلك في السلامة والتزامك بالأنظمة والقوانين. يبحث أصحاب العمل عن سجل قيادة نظيف والقدرة على الالتزام بالجداول الزمنية وإدارة المسارات بكفاءة. ركّز على سنوات خبرتك في القيادة ومعدلات التسليم في الوقت المحدد وسجلك الخالي من الحوادث.`,
    Cleaning: `في مجال التنظيف، تحتاج السيرة الذاتية لـ ${jobTitle} إلى إبراز مهاراتك العملية والتزامك بمعايير النظافة والسلامة العالية. يبحث أصحاب العمل عن خبرة في استخدام معدات التنظيف المتخصصة ومواد التعقيم والقدرة على العمل بكفاءة وسرعة. ركّز على خبرتك في بيئات العمل المختلفة وقدرتك على الالتزام بالمعايير والجداول الزمنية.`,
    'Social Services': `تتطلب السيرة الذاتية لـ ${jobTitle} في مجال الخدمات الاجتماعية إبراز التزامك بمساعدة المجتمع ومهاراتك في التعامل مع الفئات المستضعفة. يبحث أصحاب العمل عن خبرة في تقييم الاحتياجات وتطوير خطط الرعاية والتنسيق مع الجهات المعنية. أبرز قدرتك على التعاطف المهني وإدارة الحالات والتعامل مع الأزمات.`,
    Manufacturing: `في قطاع التصنيع، تحتاج السيرة الذاتية لـ ${jobTitle} إلى إبراز مهاراتك التقنية والتزامك بمعايير الجودة والسلامة. يبحث أصحاب العمل عن خبرة في تشغيل الآلات وضبط الجودة وإجراءات السلامة المهنية. ركّز على إنجازاتك في تحسين كفاءة الإنتاج وتقليل العيوب والالتزام بمعايير الجودة.`,
    Construction: `تتطلب السيرة الذاتية لـ ${jobTitle} في قطاع البناء والتشييد إبراز خبرتك الميدانية وشهاداتك المهنية والتزامك الصارم بمعايير السلامة. يبحث أصحاب العمل عن قدرتك على قراءة المخططات والعمل مع فرق متعددة التخصصات وإنجاز المشاريع في الوقت المحدد. أبرز المشاريع التي شاركت فيها وحجمها وسجلك في السلامة المهنية.`,
    Security: `في مجال الأمن، تحتاج السيرة الذاتية لـ ${jobTitle} إلى إبراز يقظتك ومهاراتك في تقييم المخاطر والاستجابة للحوادث. يبحث أصحاب العمل عن تراخيص أمنية سارية وخبرة في إجراءات الأمن والسلامة والقدرة على التعامل مع المواقف الحرجة. ركّز على تدريبك المتخصص وسجلك في الحفاظ على أمن المنشآت والأشخاص.`,
    Science: `تتطلب السيرة الذاتية لـ ${jobTitle} في المجال العلمي إبراز مؤهلاتك الأكاديمية وخبرتك البحثية وإسهاماتك في مجال تخصصك. يبحث أصحاب العمل عن منشورات علمية ومشاريع بحثية وإتقان لأدوات التحليل والمختبرات المتخصصة. أبرز أبحاثك المنشورة ومنحك البحثية وأي اكتشافات أو ابتكارات ساهمت فيها.`,
    Events: `في مجال تنظيم الفعاليات، تحتاج السيرة الذاتية لـ ${jobTitle} إلى إبراز مهاراتك التنظيمية الاستثنائية وقدرتك على إدارة مشاريع معقدة بموارد ومواعيد محددة. يبحث أصحاب العمل عن خبرة في تنسيق الفعاليات من التخطيط إلى التنفيذ والقدرة على التعامل مع الموردين والعملاء. أبرز أبرز الفعاليات التي نظمتها وحجمها وميزانياتها ومعدلات رضا الحضور.`,
    default: `تُعد السيرة الذاتية لـ ${jobTitle} أداتك الأولى لترك انطباع إيجابي لدى أصحاب العمل وتمييز نفسك عن باقي المتقدمين. في سوق العمل التنافسي اليوم، يقضي مدير التوظيف في المتوسط 6-7 ثوانٍ فقط في مسح السيرة الذاتية الأولي. لذلك يجب أن تكون سيرتك الذاتية واضحة ومنظمة وتبرز أهم مؤهلاتك وإنجازاتك بشكل فوري.`,
  };
  return intros[normalized] || intros.default;
}

export function generateBody(jobTitle, category, keySkills, avgSalary, jobGrowth, slug) {
  const normalized = normalizeCategory(category);
  const intro = getCategoryIntro(normalized, jobTitle);
  const skills = keySkills.length > 0 ? keySkills : ['التواصل', 'العمل الجماعي', 'حل المشكلات', 'إدارة الوقت', 'التنظيم', 'القيادة'];
  const s = (i) => skills[i % skills.length];

  return `
## ما الذي يميز السيرة الذاتية لـ ${jobTitle}

${intro}

عند كتابة سيرتك الذاتية لوظيفة ${jobTitle}، من المهم أن تفهم ما يبحث عنه مسؤولو التوظيف تحديدًا في هذا المجال. ليس كافيًا أن تسرد مسؤولياتك السابقة؛ بل يجب أن تُظهر كيف أضفت قيمة حقيقية في كل منصب شغلته. استخدم أرقامًا ونسبًا مئوية ومؤشرات أداء واضحة لتوثيق إنجازاتك وجعل سيرتك الذاتية أكثر إقناعًا.

## أمثلة على الملخص المهني

### مبتدئ

${jobTitle} متحمس حديث التخرج يمتلك معرفة أكاديمية قوية في ${s(0)} و${s(1)} مع خبرة عملية من خلال التدريب والمشاريع الجامعية. يتميز بالقدرة على التعلم السريع والتكيف مع بيئات العمل الجديدة والرغبة القوية في تطوير المهارات المهنية. يسعى للانضمام إلى فريق عمل ديناميكي يتيح فرصة تطبيق المعرفة النظرية واكتساب خبرة عملية قيّمة.

### متوسط الخبرة

${jobTitle} محترف يمتلك أكثر من 5 سنوات من الخبرة المتخصصة في ${s(0)} و${s(1)} و${s(2)} مع سجل مثبت في تحقيق النتائج وتجاوز الأهداف. أدار مشاريع متعددة بنجاح وساهم في تحسين العمليات وزيادة الكفاءة التشغيلية بنسبة ملموسة. يبحث عن فرصة لتولي مسؤوليات أكبر والمساهمة في نمو المؤسسة بخبرته ورؤيته الاستراتيجية.

### خبير

${jobTitle} ذو خبرة تتجاوز 10 سنوات في القيادة الاستراتيجية وإدارة الفرق عالية الأداء مع تخصص عميق في ${s(0)} و${s(1)} و${s(2)}. قاد مبادرات تحويلية حققت نتائج استثنائية في تحسين الأداء وتقليل التكاليف وزيادة رضا العملاء. معروف بالقدرة على بناء فرق عمل متميزة وتطوير استراتيجيات مبتكرة تدفع النمو المستدام وتحقق الميزة التنافسية.

## الراتب وتوقعات سوق العمل

يبلغ متوسط الراتب السنوي لوظيفة ${jobTitle} حوالي ${avgSalary}، وقد يختلف بشكل كبير حسب الموقع الجغرافي ومستوى الخبرة وحجم المؤسسة والقطاع الصناعي. يُظهر سوق العمل نموًا بنسبة ${jobGrowth} لهذا الدور، مما يشير إلى فرص وظيفية واعدة في السنوات القادمة.

### مصادر بيانات الرواتب

- [مكتب إحصاءات العمل الأمريكي (BLS)](https://www.bls.gov/ooh/) — بيانات الرواتب الرسمية وتوقعات النمو الوظيفي
- [Glassdoor](https://www.glassdoor.com/Salaries/) — رواتب فعلية أفاد بها الموظفون مع تقييمات الشركات
- [PayScale](https://www.payscale.com/research/US/) — بيانات تعويضات مفصلة حسب الخبرة والموقع

> **ملاحظة:** تختلف الرواتب الفعلية بشكل كبير حسب الدولة والمدينة ومستوى الخبرة وحجم الشركة والقطاع الصناعي. الأرقام المذكورة أعلاه تعتمد على بيانات السوق الأمريكي وتُستخدم كمرجع استرشادي.

## المهارات الأساسية التي يجب إبرازها

### المهارات التقنية والمتخصصة

- **${s(0)}** — إتقان هذه المهارة ضروري لأداء المهام اليومية بكفاءة وفعالية
- **${s(1)}** — مهارة أساسية يبحث عنها أصحاب العمل في كل إعلان وظيفي لهذا الدور
- **${s(2 % skills.length)}** — تمنحك ميزة تنافسية وتعكس عمق خبرتك في المجال

### مهارات التواصل والتعاون

- **التواصل الفعال** — القدرة على إيصال الأفكار والمعلومات بوضوح شفهيًا وكتابيًا
- **العمل الجماعي** — التعاون بفعالية مع الزملاء من مختلف الأقسام والتخصصات
- **خدمة العملاء** — فهم احتياجات العملاء الداخليين والخارجيين وتلبية توقعاتهم

### مهارات القيادة والإدارة

- **إدارة الوقت** — تحديد الأولويات وإنجاز المهام المتعددة ضمن المواعيد النهائية
- **حل المشكلات** — التحليل المنهجي للتحديات وتطوير حلول مبتكرة وعملية
- **التفكير النقدي** — تقييم المعلومات واتخاذ قرارات مدروسة تخدم أهداف المؤسسة

## نقاط الإنجازات المركزة على النتائج

استخدم نقاطًا محددة وقابلة للقياس لإبراز تأثيرك الفعلي:

- حققت زيادة بنسبة 25% في ${s(0)} من خلال تطبيق استراتيجية جديدة أدت إلى تحسين الأداء العام للفريق
- أدرت مشروعًا بميزانية 500,000 دولار وأنجزته قبل الموعد المحدد بـ 3 أسابيع مع توفير 15% من التكاليف المخططة
- طورت إجراءات عمل محسّنة باستخدام ${s(1)} أدت إلى تقليل وقت المعالجة بنسبة 40% وزيادة الإنتاجية
- درّبت وأشرفت على فريق من 12 موظفًا، مما ساهم في رفع معدل رضا العملاء من 78% إلى 94%
- نفّذت مبادرة تحسين باستخدام ${s(2 % skills.length)} حققت وفورات سنوية تزيد عن 200,000 دولار
- قدت عملية انتقال ناجحة إلى نظام جديد أدى إلى تحسين كفاءة العمليات بنسبة 35% وتقليل الأخطاء بنسبة 60%

## نصائح تنسيق ونموذج السيرة الذاتية لـ ${jobTitle}

1. **ابدأ بملخص مهني قوي** — اكتب 3-4 جمل تلخص خبرتك وأبرز إنجازاتك ومهاراتك الرئيسية المتعلقة بوظيفة ${jobTitle}. هذا القسم هو أول ما يقرأه مدير التوظيف، فاجعله مقنعًا
2. **استخدم تنسيقًا زمنيًا عكسيًا** — رتّب خبراتك من الأحدث إلى الأقدم مع التركيز على آخر 10-15 سنة. أبرز الإنجازات بدلًا من مجرد سرد المسؤوليات
3. **أدرج الشهادات والتراخيص بشكل بارز** — بالنسبة لوظيفة ${jobTitle}، ضع شهاداتك المهنية في مكان واضح يسهل على المُراجع العثور عليه بسرعة
4. **خصّص سيرتك لكل وظيفة** — عدّل الكلمات المفتاحية والمهارات لتتوافق مع متطلبات الوظيفة المحددة المعلن عنها، مما يرفع نسبة مطابقتك مع أنظمة ATS
5. **حافظ على الوضوح والاتساق** — استخدم خطًا واحدًا وحجمًا موحدًا وتنسيقًا متسقًا. تجنب الألوان الكثيرة والرسومات التي قد لا تقرأها أنظمة تتبع المتقدمين

## نصيحة مدير التوظيف

> **عندما أراجع سير ذاتية المتقدمين لوظيفة ${jobTitle}، أبحث أولًا عن الإنجازات القابلة للقياس وليس فقط قائمة المسؤوليات.**

كمسؤول توظيف متمرس في هذا المجال، أؤكد أن أكثر ما يلفت انتباهي هو وجود أرقام ونتائج ملموسة توضح القيمة التي أضافها المتقدم في مناصبه السابقة. لا يكفي أن تقول "مسؤول عن إدارة المشاريع"؛ بل يجب أن تقول "أدرت 15 مشروعًا بميزانية إجمالية 2 مليون دولار بنسبة نجاح 95%".

أنصح المتقدمين أيضًا بتخصيص سيرتهم الذاتية لكل وظيفة يتقدمون إليها. عندما أرى أن المتقدم قد أخذ الوقت لمطابقة مهاراته مع متطلبات الوظيفة المحددة، يدل ذلك على الجدية والاحترافية. تجنب إرسال سيرة ذاتية عامة لكل الوظائف — هذا أسرع طريق لسلة المهملات.

## أسئلة المقابلة الشائعة لـ ${jobTitle}

### 1. ما أبرز إنجازاتك في مجال ${jobTitle}؟

يهدف هذا السؤال إلى تقييم قدرتك على تحقيق نتائج ملموسة. استعد بـ 2-3 إنجازات محددة مع أرقام واضحة توضح تأثيرك. اربط كل إنجاز بمهارة أو كفاءة مطلوبة في الوصف الوظيفي واشرح التحديات التي واجهتها والخطوات التي اتخذتها لتحقيق النتيجة.

### 2. كيف تتعامل مع التحديات والمواقف الصعبة في بيئة العمل؟

يريد المحاور فهم أسلوبك في حل المشكلات وإدارة الضغوط. استخدم طريقة STAR (الموقف، المهمة، الإجراء، النتيجة) لتقديم مثال واقعي يُظهر هدوءك تحت الضغط وقدرتك على التحليل المنهجي والتوصل إلى حلول فعالة.

### 3. ما مهاراتك الأساسية في ${s(0)} و${s(1)} وكيف طورتها؟

يقيّم هذا السؤال عمق خبرتك التقنية. اشرح مسار تطورك المهني في هذه المهارات مع أمثلة عملية على تطبيقها في مشاريع حقيقية. اذكر أي دورات تدريبية أو شهادات حصلت عليها وكيف أثرت في أدائك المهني.

### 4. كيف تحافظ على تطورك المهني ومواكبة المستجدات في مجال ${jobTitle}؟

يبحث المحاور عن التزامك بالتعلم المستمر. تحدث عن المصادر التي تتابعها والمؤتمرات التي تحضرها والشهادات التي تسعى للحصول عليها. أظهر أنك شخص استباقي يبادر بتطوير مهاراته ولا ينتظر أن يُطلب منه ذلك.

### 5. أين ترى نفسك بعد 5 سنوات في مسار ${jobTitle}؟

يهدف هذا السؤال إلى تقييم طموحك ومدى توافق أهدافك مع رؤية المؤسسة. قدم خطة واقعية تُظهر رغبتك في النمو داخل المؤسسة وتطوير مهاراتك القيادية والمساهمة في تحقيق أهداف الفريق والشركة على المدى الطويل.

## الأخطاء الشائعة التي يجب تجنبها

### 1. إهمال تخصيص السيرة الذاتية لكل وظيفة

الكثير من المتقدمين لوظيفة ${jobTitle} يرسلون نفس السيرة الذاتية لكل الوظائف. هذا خطأ جسيم لأن أنظمة ATS تبحث عن كلمات مفتاحية محددة من الوصف الوظيفي. خصّص ملخصك المهني ومهاراتك لتتطابق مع كل إعلان وظيفي.

### 2. التركيز على المسؤوليات بدلًا من الإنجازات

سرد المسؤوليات الوظيفية لا يميزك عن أي شخص شغل نفس المنصب. بدلًا من "مسؤول عن..." اكتب "حققت..." أو "طورت..." مع أرقام ونسب مئوية توثق تأثيرك الفعلي في كل دور.

### 3. عدم إدراج الكلمات المفتاحية المناسبة

في مجال ${jobTitle}، هناك مصطلحات ومهارات محددة تبحث عنها أنظمة تتبع المتقدمين. تأكد من تضمين الكلمات المفتاحية من ${s(0)} و${s(1)} والمصطلحات المتخصصة في مجالك بشكل طبيعي ضمن سيرتك الذاتية.

### 4. تجاهل التنسيق المتوافق مع ATS

استخدام قوالب مزخرفة بالصور والجداول المعقدة والأعمدة المتعددة قد يبدو جميلًا لكنه يُربك أنظمة ATS ويؤدي إلى استبعاد سيرتك الذاتية قبل أن يراها إنسان. استخدم تنسيقًا بسيطًا ونظيفًا.

### 5. عدم تحديث المهارات والشهادات

سوق العمل في مجال ${jobTitle} يتطور باستمرار. عدم تحديث مهاراتك وشهاداتك يُعطي انطباعًا بأنك متأخر عن التطورات في مجالك. تأكد من إدراج أحدث التقنيات والأدوات والشهادات ذات الصلة.

## تحسين ATS للسيرة الذاتية لـ ${jobTitle}

أنظمة تتبع المتقدمين (ATS) هي البوابة الأولى التي يجب أن تتجاوزها سيرتك الذاتية قبل أن يراها مدير التوظيف. إليك كيفية تحسين سيرتك الذاتية لهذه الأنظمة:

- **استخدم كلمات مفتاحية من الوصف الوظيفي** — انسخ المصطلحات والمهارات المذكورة في إعلان الوظيفة وأدرجها بشكل طبيعي في سيرتك الذاتية
- **اكتب المصطلحات بالشكل الكامل والمختصر** — مثلًا: "أنظمة تتبع المتقدمين (ATS)" لضمان التقاط كلا الشكلين
- **استخدم عناوين أقسام قياسية** — مثل "الخبرة العملية" و"التعليم" و"المهارات" بدلًا من عناوين إبداعية غير معروفة
- **تجنب الجداول والأعمدة المعقدة** — استخدم تنسيقًا خطيًا بسيطًا يسهل على الأنظمة قراءته وتحليله
- **احفظ الملف بصيغة PDF أو DOCX** — هاتان الصيغتان الأكثر توافقًا مع معظم أنظمة ATS المستخدمة
- **أدرج المهارات المتخصصة في ${jobTitle}** — مثل ${skills.slice(0, 3).join(' و')} كمهارات منفصلة في قسم المهارات

## موارد إضافية

هل تحتاج إلى مساعدة إضافية في تحسين سيرتك الذاتية لوظيفة ${jobTitle}؟ اطلع على هذه الموارد المفيدة:

- [منشئ السيرة الذاتية الذكي](/ar/builder) — أنشئ سيرة ذاتية احترافية متوافقة مع ATS في دقائق
- [قوالب السيرة الذاتية](/ar/templates) — اختر من بين مجموعة متنوعة من القوالب الاحترافية
- [فاحص ATS](/ar/tools/ats-checker) — تحقق من توافق سيرتك الذاتية مع أنظمة تتبع المتقدمين
- [أمثلة السيرة الذاتية](/ar/resume-examples) — تصفح المزيد من أمثلة السير الذاتية لمختلف المهن

---

**هل أنت مستعد لإنشاء سيرة ذاتية احترافية لوظيفة ${jobTitle}؟** استخدم [منشئ السيرة الذاتية المجاني](/ar/builder) لإنشاء سيرة ذاتية مخصصة ومتوافقة مع ATS في دقائق معدودة. ابدأ الآن واحصل على مقابلات عمل أكثر!
`;
}
