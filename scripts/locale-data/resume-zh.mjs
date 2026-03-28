/**
 * Chinese Simplified (zh) locale data for resume example generation.
 * Imported by generate-locale-resume-examples.mjs via:
 *   await import('./locale-data/resume-zh.mjs')
 *
 * Keyword source: seo/chinese-top-100-keywords.csv
 * Top terms: 简历模板 (resume template), 简历范文 (resume sample),
 *            简历怎么写 (how to write resume), AI简历 (AI resume),
 *            个人简历 (personal resume), 简历制作 (resume creation),
 *            求职简历 (job-seeking resume), 简历模板免费 (free resume template)
 */

const LANG = 'zh';

// ─── CONFIG ─────────────────────────────────────────────────────────────────

export const CONFIG = {
  author: '李明辉',
  authorBio: '职业发展与简历撰写资深顾问，拥有10年以上中国就业市场经验。曾帮助数千名求职者成功通过简历筛选，获得心仪工作机会。',
  titlePattern: (job) => `${job} 简历模板 | 撰写指南 2026`,
  descriptionPattern: (job) => `${job} 简历模板与范文。掌握ATS优化简历怎么写的技巧与实例，助您2026年求职成功。免费AI简历制作工具。`,
  imageAltPattern: (job) => `${job} 简历模板`,
};

// ─── JOB TITLES (English → Simplified Chinese) ─────────────────────────────
// Uses natural Chinese job titles that people actually search for.

export const JOB_TITLES = {
  '3D Artist': '3D美术师',
  'AI Engineer': 'AI工程师',
  'AWS Cloud Engineer': 'AWS云工程师',
  'AWS Solution Architect': 'AWS解决方案架构师',
  'Academic Advisor': '学业顾问',
  'Account Executive': '客户经理',
  'Account Manager': '客户主管',
  'Accountant': '会计',
  'Accounting Assistant': '会计助理',
  'Accounting Clerk': '会计文员',
  'Accounting Intern': '会计实习生',
  'Accounting Manager': '会计经理',
  'Accounts Payable Specialist': '应付账款专员',
  'Accounts Receivable Specialist': '应收账款专员',
  'Acupuncturist': '针灸师',
  'Administrative Assistant': '行政助理',
  'Administrative Coordinator': '行政协调员',
  'Admissions Counselor': '招生顾问',
  'Advertising Manager': '广告经理',
  'Aerospace Engineer': '航空航天工程师',
  'Agricultural Engineer': '农业工程师',
  'Air Traffic Controller': '空中交通管制员',
  'Aircraft Mechanic': '飞机维修技师',
  'Android Developer': '安卓开发工程师',
  'Anesthesiologist': '麻醉科医师',
  'Animal Caretaker': '动物饲养员',
  'Animal Control Officer': '动物管理员',
  'Animal Shelter Worker': '动物收容所工作人员',
  'Animator': '动画师',
  'Appliance Repair Technician': '家电维修技师',
  'Application Support Engineer': '应用支持工程师',
  'Appraiser': '评估师',
  'Apprentice Electrician': '电工学徒',
  'Aquarium Keeper': '水族馆饲养员',
  'Arbitrator': '仲裁员',
  'Arborist': '树艺师',
  'Architect': '建筑师',
  'Architectural Drafter': '建筑制图员',
  'Art Director': '艺术总监',
  'Art Teacher': '美术教师',
  'Assembler': '装配工',
  'Assistant Director': '副主任',
  'Assistant Manager': '副经理',
  'Assistant Principal': '副校长',
  'Assistant Property Manager': '物业管理助理',
  'Assistant Store Manager': '门店副经理',
  'Athletic Trainer': '运动训练师',
  'Audio Engineer': '音频工程师',
  'Audit Manager': '审计经理',
  'Auditor': '审计师',
  'Auto Body Technician': '汽车钣金技师',
  'Auto Mechanic': '汽车修理工',
  'Automation Engineer': '自动化工程师',
  'Automotive Engineer': '汽车工程师',
  'Automotive Technician': '汽车技术员',
  'Aviation Maintenance Technician': '航空维修技术员',
  'Back-End Developer': '后端开发工程师',
  'Backend Developer': '后端开发工程师',
  'Baker': '烘焙师',
  'Bank Manager': '银行经理',
  'Bank Teller': '银行柜员',
  'Banker': '银行职员',
  'Banquet Chef': '宴会厨师长',
  'Barber': '理发师',
  'Barista': '咖啡师',
  'Bartender': '调酒师',
  'Beauty Advisor': '美容顾问',
  'Behavioral Therapist': '行为治疗师',
  'Bellhop': '行李员',
  'Bicycle Mechanic': '自行车维修技师',
  'Billing Specialist': '计费专员',
  'Biomedical Engineer': '生物医学工程师',
  'Blockchain Developer': '区块链开发工程师',
  'Bookkeeper': '记账员',
  'Branch Manager': '分行经理',
  'Brand Designer': '品牌设计师',
  'Brand Manager': '品牌经理',
  'Budget Analyst': '预算分析师',
  'Building Engineer': '建筑工程师',
  'Building Inspector': '建筑检查员',
  'Building Maintenance Technician': '楼宇维护技术员',
  'Bus Driver': '公交车司机',
  'Business Administration Professional': '工商管理专业人员',
  'Business Analyst': '业务分析师',
  'Business Consultant': '企业咨询师',
  'Business Development Associate': '商务拓展专员',
  'Business Development Executive': '商务拓展经理',
  'Business Development Manager': '商务发展经理',
  'Business Intelligence Analyst': 'BI分析师',
  'Business Intelligence Specialist': 'BI专员',
  'Business Manager': '商务经理',
  'Business Owner': '企业主',
  'Busser': '餐厅清洁员',
  'Butcher': '屠宰师',
  'Buyer': '采购员',
  'CAD Designer': 'CAD设计师',
  'CNA (Certified Nursing Assistant)': '护理助理',
  'CNC Machinist': 'CNC机械师',
  'CNC Operator': 'CNC操作员',
  'COO (Chief Operating Officer)': 'COO（首席运营官）',
  'Cabin Crew': '客舱乘务员',
  'Cabinet Maker': '橱柜制造工',
  'Cable Technician': '电缆技术员',
  'Cafeteria Worker': '食堂工作人员',
  'Call Center Agent': '呼叫中心坐席',
  'Call Center Manager': '呼叫中心经理',
  'Call Center Representative': '呼叫中心客服代表',
  'Camp Counselor': '夏令营辅导员',
  'Car Detailer': '汽车美容师',
  'Car Sales Associate': '汽车销售顾问',
  'Car Salesperson': '汽车销售员',
  'Cardiac Sonographer': '心脏超声技师',
  'Cardiovascular Technologist': '心血管技术员',
  'Caregiver': '护工',
  'Carpenter': '木工',
  'Carpet Cleaner': '地毯清洁工',
  'Case Manager': '个案管理员',
  'Cashier': '收银员',
  'Casino Dealer': '赌场荷官',
  'Caterer': '餐饮服务商',
  'Catering Manager': '宴会经理',
  'Cement Mason': '水泥工',
  'Certified Nursing Assistant': '护理助理',
  'Certified Nursing Assistant (CNA)': '护理助理（CNA）',
  'Change Management Specialist': '变革管理专员',
  'Chef': '厨师长',
  'Chemical Engineer': '化学工程师',
  'Chemist': '化学家',
  'Chief Information Officer (CIO)': 'CIO（首席信息官）',
  'Chief of Staff': '办公室主任',
  'Chiropractor': '脊椎指压治疗师',
  'City Planner': '城市规划师',
  'Civil Engineer': '土木工程师',
  'Claims Adjuster': '理赔师',
  'Claims Analyst': '理赔分析师',
  'Cleaner': '清洁工',
  'Client Relations Manager': '客户关系经理',
  'Clinical Research Associate': '临床研究员',
  'Clinical Research Coordinator': '临床研究协调员',
  'Cloud Architect': '云架构师',
  'Cloud Engineer': '云工程师',
  'Coach': '教练',
  'Code Enforcement Officer': '建筑执法员',
  'Collections Specialist': '催收专员',
  'College Admissions Counselor': '大学招生顾问',
  'College Professor': '大学教授',
  'Commercial Cleaner': '商业保洁员',
  'Commercial Real Estate Broker': '商业房产经纪人',
  'Communications Director': '传播总监',
  'Communications Manager': '传播经理',
  'Community Health Worker': '社区卫生工作者',
  'Community Manager': '社区运营经理',
  'Community Outreach Coordinator': '社区外联协调员',
  'Complaints Handler': '投诉处理专员',
  'Compliance Analyst': '合规分析师',
  'Compliance Manager': '合规经理',
  'Compliance Officer': '合规官',
  'Computer Operator': '计算机操作员',
  'Computer Science Professional': '计算机科学专业人员',
  'Computer Technician': '计算机技术员',
  'Concierge': '礼宾员',
  'Concrete Finisher': '混凝土抹面工',
  'Construction Engineer': '建筑施工工程师',
  'Construction Manager': '施工项目经理',
  'Construction Superintendent': '施工监理',
  'Construction Worker': '建筑工人',
  'Consultant': '顾问',
  'Content Creator': '内容创作者',
  'Content Marketing Manager': '内容营销经理',
  'Content Strategist': '内容策略师',
  'Content Writer': '内容编辑',
  'Contract Specialist': '合同专员',
  'Contracts Specialist': '合同管理专员',
  'Controller': '财务总监',
  'Copywriter': '文案',
  'Corporate Recruiter': '企业招聘专员',
  'Corporate Security Manager': '企业安全经理',
  'Correctional Officer': '狱警',
  'Cosmetologist': '美容师',
  'Counselor': '咨询师',
  'Courier': '快递员',
  'Court Clerk': '法院书记员',
  'Court Reporter': '法庭速记员',
  'Crane Operator': '起重机操作员',
  'Creative Director': '创意总监',
  'Credit Analyst': '信用分析师',
  'Crisis Counselor': '危机咨询师',
  'Cruise Ship Worker': '邮轮工作人员',
  'Curriculum Designer': '课程设计师',
  'Curriculum Developer': '课程开发师',
  'Customer Experience Specialist': '客户体验专员',
  'Customer Service Manager': '客服经理',
  'Customer Service Representative': '客服代表',
  'Customer Success Manager': '客户成功经理',
  'Customer Success Specialist': '客户成功专员',
  'Customer Support Specialist': '客户支持专员',
  'Customs Broker': '报关员',
  'Customs Officer': '海关人员',
  'Cybersecurity Analyst': '网络安全分析师',
  'Data Analyst': '数据分析师',
  'Data Architect': '数据架构师',
  'Data Engineer': '数据工程师',
  'Data Entry Clerk': '数据录入员',
  'Data Entry Operator': '数据录入操作员',
  'Data Entry Specialist': '数据录入专员',
  'Data Scientist': '数据科学家',
  'Database Administrator': '数据库管理员',
  'Delivery Driver': '送货司机',
  'Dental Assistant': '牙科助理',
  'Dental Hygienist': '口腔卫生师',
  'Dental Office Manager': '牙科诊所经理',
  'Dentist': '牙科医生',
  'Deputy Sheriff': '副警长',
  'Design Engineer': '设计工程师',
  'Desktop Support Engineer': '桌面支持工程师',
  'Desktop Support Specialist': '桌面支持专员',
  'Desktop Support Technician': '桌面支持技术员',
  'Detailer': '汽车美容技师',
  'DevOps Engineer': 'DevOps工程师',
  'Dialysis Technician': '透析技术员',
  'Diesel Mechanic': '柴油机修理工',
  'Diesel Technician': '柴油机技术员',
  'Dietary Aide': '营养助理',
  'Dietitian': '营养师',
  'Digital Marketer': '数字营销师',
  'Digital Marketing Manager': '数字营销经理',
  'Digital Marketing Specialist': '数字营销专员',
  'Director of Operations': '运营总监',
  'Dishwasher': '洗碗工',
  'Dispatcher': '调度员',
  'District Manager': '区域经理',
  'Doctor': '医生',
  'Dog Groomer': '宠物美容师',
  'Dog Trainer': '犬类训练师',
  'Dog Walker': '遛狗师',
  'Drafter': '制图员',
  'Driver': '司机',
  'Drywall Installer': '石膏板安装工',
  'EMT': '急救技术员',
  'ESL Teacher': '英语教师',
  'Editor': '编辑',
  'Education Consultant': '教育咨询师',
  'Educational Technologist': '教育技术专员',
  'Electrical Engineer': '电气工程师',
  'Electrical Technician': '电气技术员',
  'Electrician': '电工',
  'Elementary Teacher': '小学教师',
  'Elevator Technician': '电梯技术员',
  'Embedded Software Engineer': '嵌入式软件工程师',
  'Embedded Systems Engineer': '嵌入式系统工程师',
  'Emergency Management Coordinator': '应急管理协调员',
  'Emergency Medical Technician (EMT)': '急救医疗技术员（EMT）',
  'Engineering Manager': '工程经理',
  'Entrepreneur': '创业者',
  'Environmental Compliance Officer': '环境合规专员',
  'Environmental Consultant': '环境咨询师',
  'Environmental Engineer': '环境工程师',
  'Environmental Scientist': '环境科学家',
  'Epidemiologist': '流行病学家',
  'Escrow Officer': '第三方托管专员',
  'Esthetician': '皮肤护理师',
  'Ethical Hacker': '白帽黑客',
  'Event Coordinator': '活动协调员',
  'Event Manager': '活动经理',
  'Event Planner': '活动策划师',
  'Executive Assistant': '行政秘书',
  'Executive Chef': '行政总厨',
  'Executive Director': '执行总监',
  'Executive Housekeeper': '客房部经理',
  'Exercise Physiologist': '运动生理学家',
  'Expeditor': '催货员',
  'Eyewear Sales Associate': '眼镜销售员',
  'Facilities Manager': '设施经理',
  'Factory Worker': '工厂工人',
  'Family Services Worker': '家庭服务工作者',
  'Fashion Designer': '时装设计师',
  'Fast Food Worker': '快餐店员工',
  'Fence Installer': '围栏安装工',
  'Field Engineer': '现场工程师',
  'Field Service Technician': '现场服务技术员',
  'Film Director': '电影导演',
  'Finance Manager': '财务经理',
  'Financial Advisor': '财务顾问',
  'Financial Analyst': '财务分析师',
  'Financial Controller': '财务主管',
  'Financial Manager': '财务经理',
  'Financial Planner': '理财规划师',
  'Fire Chief': '消防队长',
  'Fire Inspector': '消防检查员',
  'Firefighter': '消防员',
  'Fitness Center Manager': '健身中心经理',
  'Fitness Instructor': '健身教练',
  'Fitness Trainer': '健身训练师',
  'Fleet Manager': '车队经理',
  'Flight Attendant': '空乘人员',
  'Floor Installer': '地板安装工',
  'Floor Manager': '楼面经理',
  'Florist': '花艺师',
  'Food Expeditor': '出菜员',
  'Food Runner': '传菜员',
  'Food Safety Manager': '食品安全管理员',
  'Food Scientist': '食品科学家',
  'Food Server': '餐厅服务员',
  'Food Service Director': '餐饮总监',
  'Food Service Manager': '餐饮经理',
  'Food Service Worker': '餐饮服务员',
  'Food Stylist': '食物造型师',
  'Food Truck Operator': '餐车经营者',
  'Forklift Operator': '叉车司机',
  'Freelance Writer': '自由撰稿人',
  'Freight Broker': '货运经纪人',
  'Front Desk Agent': '前台接待员',
  'Front Desk Receptionist': '前台文员',
  'Front End Developer': '前端开发工程师',
  'Front-End Developer': '前端开发工程师',
  'Frontend Developer': '前端开发工程师',
  'Full Stack Developer': '全栈开发工程师',
  'Full-Stack Developer': '全栈开发工程师',
  'Fundraiser': '筹款专员',
  'Funeral Director': '殡葬师',
  'Game Designer': '游戏设计师',
  'Game Developer': '游戏开发工程师',
  'General Counsel': '总法律顾问',
  'General Manager': '总经理',
  'Genetic Counselor': '遗传咨询师',
  'Geologist': '地质学家',
  'GIS Analyst': 'GIS分析师',
  'Glazier': '玻璃工',
  'Go Developer': 'Go开发工程师',
  'Golf Course Superintendent': '高尔夫球场主管',
  'Google Ads Specialist': 'Google Ads专员',
  'Governance Risk Compliance': 'GRC专员',
  'Grants Manager': '拨款管理经理',
  'Graphic Designer': '平面设计师',
  'Grocery Store Clerk': '超市店员',
  'Group Fitness Instructor': '团体健身教练',
  'Guidance Counselor': '心理辅导员',
  'Gym Manager': '健身房经理',
  'Gym Trainer': '健身教练',
  'HVAC Technician': '暖通空调技术员',
  'HR Assistant': '人事助理',
  'HR Business Partner': 'HRBP',
  'HR Coordinator': '人事协调员',
  'HR Director': '人力资源总监',
  'HR Executive': '人力资源高管',
  'HR Manager': '人力资源经理',
  'HR Recruiter': '人力资源招聘专员',
  'Hair Stylist': '发型师',
  'Head Chef': '主厨',
  'Head Cook': '厨师长',
  'Health Coach': '健康教练',
  'Health Educator': '健康教育师',
  'Health Information Technician': '医疗信息技术员',
  'Health Inspector': '卫生检查员',
  'Healthcare Administrator': '医疗行政管理员',
  'Heavy Equipment Operator': '重型设备操作员',
  'Help Desk Technician': '技术支持员',
  'High School Teacher': '高中教师',
  'Home Health Aide': '家庭护理员',
  'Home Inspector': '房屋检查员',
  'Hospice Nurse': '临终关怀护士',
  'Hospital Administrator': '医院行政管理员',
  'Hospital Housekeeper': '医院保洁员',
  'Hospitality Manager': '酒店管理经理',
  'Host/Hostess': '迎宾员',
  'Hotel Front Desk Agent': '酒店前台接待',
  'Hotel Manager': '酒店经理',
  'House Cleaner': '家政清洁员',
  'House Painter': '油漆工',
  'Housekeeper': '客房服务员',
  'Housekeeping Manager': '客房经理',
  'Housekeeping Supervisor': '客房主管',
  'IT Auditor': 'IT审计师',
  'IT Consultant': 'IT顾问',
  'IT Coordinator': 'IT协调员',
  'IT Director': 'IT总监',
  'IT Manager': 'IT经理',
  'IT Project Manager': 'IT项目经理',
  'IT Recruiter': 'IT招聘专员',
  'IT Specialist': 'IT专员',
  'IT Support Specialist': 'IT支持专员',
  'IT Support Technician': 'IT支持技术员',
  'IT Technician': 'IT技术员',
  'Illustrator': '插画师',
  'Immigration Lawyer': '移民律师',
  'Immigration Paralegal': '移民法律助理',
  'Implementation Specialist': '实施专员',
  'Industrial Designer': '工业设计师',
  'Industrial Engineer': '工业工程师',
  'Industrial Maintenance Technician': '工业设备维护技术员',
  'Information Security Analyst': '信息安全分析师',
  'Information Technology Manager': '信息技术经理',
  'Inside Sales Representative': '电话销售代表',
  'Instructional Coach': '教学教练',
  'Instructional Designer': '教学设计师',
  'Insulation Worker': '隔热工',
  'Insurance Agent': '保险代理人',
  'Insurance Underwriter': '保险核保员',
  'Interior Designer': '室内设计师',
  'Internal Auditor': '内部审计师',
  'Intern': '实习生',
  'Interpreter': '口译员',
  'Inventory Manager': '库存管理经理',
  'Investment Analyst': '投资分析师',
  'Investment Banker': '投资银行家',
  'Iron Worker': '铁工',
  'Ironworker': '钢筋工',
  'Janitor': '清洁工',
  'Java Developer': 'Java开发工程师',
  'Java Full Stack Developer': 'Java全栈开发工程师',
  'JavaScript Developer': 'JavaScript开发工程师',
  'Jeweler': '珠宝匠',
  'Journalist': '记者',
  'Junior Accountant': '初级会计',
  'Junior Developer': '初级开发工程师',
  'Juvenile Probation Officer': '少年缓刑官',
  'Kindergarten Teacher': '幼儿园教师',
  'Kitchen Helper': '厨房帮工',
  'Kitchen Manager': '厨房经理',
  'Lab Assistant': '实验室助理',
  'Lab Technician': '实验室技术员',
  'Landscape Architect': '景观设计师',
  'Landscaper': '园艺工',
  'Law Clerk': '法律助理',
  'Lawyer': '律师',
  'Lead Teacher': '首席教师',
  'Leasing Consultant': '租赁顾问',
  'Legal Analyst': '法律分析师',
  'Legal Assistant': '法务助理',
  'Legal Secretary': '法律秘书',
  'Legislative Aide': '立法助理',
  'Librarian': '图书馆员',
  'Library Assistant': '图书馆助理',
  'Licensed Practical Nurse': '执业实习护士',
  'Licensed Practical Nurse (LPN)': '执业实习护士（LPN）',
  'Limousine Driver': '豪华轿车司机',
  'Line Cook': '流水线厨师',
  'Litigation Support Specialist': '诉讼支持专员',
  'Loan Officer': '信贷员',
  'Loan Processor': '贷款审核员',
  'Locksmith': '锁匠',
  'Logistics Coordinator': '物流协调员',
  'Logistics Manager': '物流经理',
  'Logistics Specialist': '物流专员',
  'Long Haul Truck Driver': '长途货车司机',
  'Loss Prevention Specialist': '防损专员',
  'MRI Technologist': 'MRI技术员',
  'Machine Learning Engineer': '机器学习工程师',
  'Machine Learning Specialist': '机器学习专员',
  'Machine Operator': '机器操作工',
  'Maintenance Engineer': '维护工程师',
  'Maintenance Manager': '维护经理',
  'Maintenance Technician': '维修技术员',
  'Maintenance Worker': '维修工',
  'Makeup Artist': '化妆师',
  'Management Consultant': '管理咨询师',
  'Manufacturing Engineer': '制造工程师',
  'Manufacturing Worker': '制造业工人',
  'Marine Biologist': '海洋生物学家',
  'Marine Engineer': '船舶工程师',
  'Market Research Analyst': '市场调研分析师',
  'Marketing Analyst': '市场分析师',
  'Marketing Assistant': '市场助理',
  'Marketing Coordinator': '市场协调员',
  'Marketing Director': '市场总监',
  'Marketing Executive': '市场高管',
  'Marketing Intern': '市场实习生',
  'Marketing Manager': '市场经理',
  'Marketing Specialist': '市场专员',
  'Mason': '石匠',
  'Massage Therapist': '按摩治疗师',
  'Material Handler': '物料搬运工',
  'Materials Manager': '物料经理',
  'Mechanical Design Engineer': '机械设计工程师',
  'Mechanical Engineer': '机械工程师',
  'Mechanical Technician': '机械技术员',
  'Media Buyer': '媒介购买员',
  'Mediator': '调解员',
  'Medical Assistant': '医疗助理',
  'Medical Billing Specialist': '医疗计费专员',
  'Medical Coder': '医疗编码员',
  'Medical Device Sales Representative': '医疗器械销售代表',
  'Medical Lab Technician': '医学检验技师',
  'Medical Office Assistant': '医务室助理',
  'Medical Office Manager': '诊所经理',
  'Medical Receptionist': '医院前台接待',
  'Medical Records Clerk': '病历管理员',
  'Medical Representative': '医药代表',
  'Medical Scribe': '医疗记录员',
  'Medical Technologist': '医学技术员',
  'Mental Health Counselor': '心理健康咨询师',
  'Merchandise Planner': '商品企划师',
  'Microbiologist': '微生物学家',
  'Middle School Teacher': '初中教师',
  'Midwife': '助产士',
  'Military Officer': '军官',
  'Millwright': '机修工',
  'Mobile Developer': '移动端开发工程师',
  'Mortgage Loan Officer': '房贷专员',
  'Mortgage Loan Processor': '房贷审核员',
  'Motion Graphics Designer': '动态图形设计师',
  'Moving Company Driver': '搬家公司司机',
  'Museum Curator': '博物馆馆长',
  'Music Producer': '音乐制作人',
  'Music Teacher': '音乐教师',
  'Nanny': '保姆',
  'Natural Language Processing Engineer': 'NLP工程师',
  'Network Administrator': '网络管理员',
  'Network Engineer': '网络工程师',
  'Night Auditor': '夜审',
  'Node.js Developer': 'Node.js开发工程师',
  'Nuclear Engineer': '核工程师',
  'Nurse': '护士',
  'Nurse Manager': '护士长',
  'Nurse Practitioner': '执业护师',
  'Nursing Assistant': '护理助理',
  'Nutritionist': '营养师',
  'Occupational Health Specialist': '职业健康专员',
  'Occupational Therapist': '职业治疗师',
  'Occupational Therapy Assistant': '职业治疗助理',
  'Office Administrator': '办公室管理员',
  'Office Assistant': '办公室助理',
  'Office Clerk': '办公室文员',
  'Office Manager': '办公室主管',
  'Operations Analyst': '运营分析师',
  'Operations Coordinator': '运营协调员',
  'Operations Director': '运营总监',
  'Operations Manager': '运营经理',
  'Optician': '验光师',
  'Optometrist': '眼科医生',
  'Oracle Database Administrator': 'Oracle数据库管理员',
  'Orthodontist': '正畸医生',
  'Outside Sales Representative': '外勤销售代表',
  'Painter': '画家',
  'Paralegal': '律师助理',
  'Paramedic': '急救医护人员',
  'Park Ranger': '公园管理员',
  'Parking Lot Attendant': '停车场管理员',
  'Parts Manager': '零配件经理',
  'Pastry Chef': '糕点师',
  'Patient Access Representative': '患者接待员',
  'Patient Care Technician': '患者护理技术员',
  'Payroll Specialist': '薪资专员',
  'Pediatrician': '儿科医生',
  'Penetration Tester': '渗透测试工程师',
  'Personal Banker': '个人银行客户经理',
  'Personal Trainer': '私人教练',
  'Pest Control Technician': '害虫防治技术员',
  'Pet Groomer': '宠物美容师',
  'Pet Sitter': '宠物看护员',
  'Petroleum Engineer': '石油工程师',
  'Pharmaceutical Sales Representative': '医药销售代表',
  'Pharmacist': '药剂师',
  'Pharmacy Assistant': '药房助理',
  'Pharmacy Tech': '药房技术员',
  'Pharmacy Technician': '药房技术员',
  'Phlebotomist': '采血员',
  'Photographer': '摄影师',
  'Physical Therapist': '物理治疗师',
  'Physical Therapy Aide': '物理治疗助手',
  'Physical Therapy Assistant': '物理治疗助理',
  'Physician Assistant': '医师助理',
  'Pilates Instructor': '普拉提教练',
  'Pilot': '飞行员',
  'Pipefitter': '管道安装工',
  'Pizza Maker': '比萨制作师',
  'Plant Manager': '工厂厂长',
  'Plasterer': '抹灰工',
  'Platform Engineer': '平台工程师',
  'Plumber': '水管工',
  'Plumbing Engineer': '给排水工程师',
  'Podcast Host': '播客主持人',
  'Police Officer': '警察',
  'Policy Analyst': '政策分析师',
  'Pool Cleaner': '泳池清洁工',
  'Pool Technician': '泳池技术员',
  'Porter': '搬运工',
  'Postal Worker': '邮递员',
  'Power BI Developer': 'Power BI开发工程师',
  'Prep Cook': '备菜厨师',
  'Preschool Teacher': '幼儿教师',
  'Pressure Washer': '高压清洗工',
  'Principal': '校长',
  'Private Investigator': '私人侦探',
  'Probation Officer': '缓刑官',
  'Process Engineer': '工艺工程师',
  'Procurement Manager': '采购经理',
  'Procurement Specialist': '采购专员',
  'Producer': '制片人',
  'Product Analyst': '产品分析师',
  'Product Designer': '产品设计师',
  'Product Manager': '产品经理',
  'Product Marketing Manager': '产品市场经理',
  'Product Owner': '产品负责人',
  'Production Assistant': '制作助理',
  'Production Engineer': '生产工程师',
  'Production Manager': '生产经理',
  'Production Planner': '生产计划员',
  'Production Worker': '生产工人',
  'Program Coordinator': '项目协调员',
  'Program Manager': '项目总监',
  'Programmer': '程序员',
  'Project Coordinator': '项目协调员',
  'Project Engineer': '项目工程师',
  'Project Manager': '项目经理',
  'Prompt Engineer': '提示词工程师',
  'Property Manager': '物业经理',
  'Prosthetist': '假肢矫形师',
  'Psychiatric Nurse': '精神科护士',
  'Psychiatrist': '精神科医生',
  'Psychologist': '心理学家',
  'Public Affairs Specialist': '公共事务专员',
  'Public Health Inspector': '公共卫生检查员',
  'Public Health Specialist': '公共卫生专员',
  'Public Relations Coordinator': '公关协调员',
  'Public Relations Specialist': '公关专员',
  'Purchasing Agent': '采购代理',
  'Purchasing Manager': '采购经理',
  'Python Developer': 'Python开发工程师',
  'QA Analyst': 'QA分析师',
  'QA Engineer': 'QA工程师',
  'QA Manager': 'QA经理',
  'QA Tester': 'QA测试员',
  'Quality Analyst': '质量分析师',
  'Quality Assurance Inspector': '质量保证检查员',
  'Quality Assurance Specialist': '质量保证专员',
  'Quality Control Inspector': '质量控制检查员',
  'Quality Engineer': '质量工程师',
  'Quality Manager': '质量经理',
  'Radiologic Technologist': '放射技师',
  'React Developer': 'React开发工程师',
  'Reading Specialist': '阅读指导专员',
  'Real Estate Agent': '房产经纪人',
  'Real Estate Appraiser': '房产评估师',
  'Real Estate Assistant': '房产助理',
  'Real Estate Attorney': '房产律师',
  'Real Estate Investor': '房产投资人',
  'Receiving Clerk': '收货员',
  'Receptionist': '前台接待',
  'Records Manager': '档案管理员',
  'Recreation Coordinator': '休闲活动协调员',
  'Recreation Director': '休闲活动总监',
  'Recruiter': '招聘专员',
  'Recruiting Coordinator': '招聘协调员',
  'Registered Nurse': '注册护士',
  'Rehabilitation Counselor': '康复咨询师',
  'Reliability Engineer': '可靠性工程师',
  'Release Engineer': '发布工程师',
  'Reporter': '记者',
  'Research Analyst': '研究分析师',
  'Research Assistant': '研究助理',
  'Research Scientist': '研究员',
  'Reservation Agent': '预订专员',
  'Resident Assistant': '宿舍管理员',
  'Residential Cleaner': '家庭保洁员',
  'Residential Counselor': '住宿辅导员',
  'Resort Manager': '度假村经理',
  'Respiratory Therapist': '呼吸治疗师',
  'Restaurant General Manager': '餐厅总经理',
  'Restaurant Manager': '餐厅经理',
  'Retail Assistant': '零售助理',
  'Retail Associate': '零售店员',
  'Retail Manager': '零售经理',
  'Retail Sales Associate': '零售销售员',
  'Retail Store Manager': '零售门店经理',
  'Revenue Manager': '收入管理经理',
  'Risk Analyst': '风险分析师',
  'Risk Management Specialist': '风险管理专员',
  'Risk Manager': '风险经理',
  'Robotics Engineer': '机器人工程师',
  'Roofer': '屋顶工',
  'Room Attendant': '客房服务员',
  'Rust Developer': 'Rust开发工程师',
  'SAP Consultant': 'SAP顾问',
  'SEO Specialist': 'SEO专员',
  'SOC Analyst': 'SOC分析师',
  'Safety Coordinator': '安全协调员',
  'Safety Manager': '安全经理',
  'Sales Assistant': '销售助理',
  'Sales Associate': '销售员',
  'Sales Consultant': '销售顾问',
  'Sales Coordinator': '销售协调员',
  'Sales Director': '销售总监',
  'Sales Engineer': '售前工程师',
  'Sales Executive': '销售主管',
  'Sales Manager': '销售经理',
  'Sales Representative': '销售代表',
  'Salesforce Administrator': 'Salesforce管理员',
  'Sanitation Worker': '环卫工人',
  'School Administrator': '学校行政管理员',
  'School Counselor': '学校心理咨询师',
  'School Nurse': '校医',
  'School Principal': '校长',
  'School Psychologist': '学校心理学家',
  'Scrum Master': 'Scrum Master',
  'Seaman': '船员',
  'Security Analyst': '安全分析师',
  'Security Engineer': '安全工程师',
  'Security Guard': '保安',
  'Security Manager': '安保经理',
  'Security Officer': '安保主管',
  'Senior Accountant': '高级会计',
  'Server': '服务员',
  'Service Advisor': '服务顾问',
  'Service Crew': '服务人员',
  'Set Designer': '布景设计师',
  'Sheet Metal Worker': '钣金工',
  'Shipping & Receiving Clerk': '出入库管理员',
  'Shipping Clerk': '发货员',
  'Site Engineer': '现场工程师',
  'Site Reliability Engineer': 'SRE（站点可靠性工程师）',
  'Small Business Owner': '小微企业主',
  'Social Media Coordinator': '社交媒体协调员',
  'Social Media Manager': '社交媒体经理',
  'Social Media Specialist': '社交媒体专员',
  'Social Worker': '社会工作者',
  'Software Architect': '软件架构师',
  'Software Developer': '软件开发工程师',
  'Software Engineer': '软件工程师',
  'Software Engineering Manager': '软件工程经理',
  'Software Test Engineer': '软件测试工程师',
  'Software Tester': '软件测试员',
  'Solar Installer': '太阳能安装工',
  'Solution Architect': '解决方案架构师',
  'Solutions Architect': '解决方案架构师',
  'Solutions Engineer': '解决方案工程师',
  'Sommelier': '侍酒师',
  'Sonographer': '超声技师',
  'Sound Engineer': '音响工程师',
  'Sous Chef': '副厨师长',
  'Spa Manager': 'SPA经理',
  'Special Education Teacher': '特殊教育教师',
  'Speech Language Pathologist': '言语治疗师',
  'Speech-Language Pathologist': '言语治疗师',
  'Sports Coach': '体育教练',
  'Stage Manager': '舞台监督',
  'Sterile Processing Technician': '灭菌处理技术员',
  'Store Associate': '门店店员',
  'Store Manager': '门店经理',
  'Storyboard Artist': '分镜画师',
  'Structural Engineer': '结构工程师',
  'Substance Abuse Counselor': '成瘾康复咨询师',
  'Substitute Teacher': '代课教师',
  'Supply Chain Analyst': '供应链分析师',
  'Supply Chain Manager': '供应链经理',
  'Support Worker': '支援工作者',
  'Surgeon': '外科医生',
  'Surgical Technologist': '手术室技术员',
  'Survey Researcher': '调查研究员',
  'Surveyor': '测量员',
  'Sushi Chef': '寿司厨师',
  'Sustainability Coordinator': '可持续发展协调员',
  'System Administrator': '系统管理员',
  'System Analyst': '系统分析师',
  'System Engineer': '系统工程师',
  'Systems Administrator': '系统管理员',
  'Systems Analyst': '系统分析师',
  'Systems Engineer': '系统工程师',
  'TSA Agent': '机场安检员',
  'Talent Acquisition Specialist': '人才招聘专员',
  'Teacher': '教师',
  'Teaching Assistant': '助教',
  'Team Leader': '团队负责人',
  'Tech Sales Representative': 'IT销售代表',
  'Technical Program Manager': '技术项目经理',
  'Technical Recruiter': '技术招聘专员',
  'Technical Support Specialist': '技术支持专员',
  'Technical Writer': '技术文档工程师',
  'Therapist': '治疗师',
  'Title Examiner': '产权审查员',
  'Tour Guide': '导游',
  'Travel Agent': '旅行社顾问',
  'Truck Driver': '货车司机',
  'Tutor': '家教',
  'UI Designer': 'UI设计师',
  'UX Designer': 'UX设计师',
  'UX Researcher': 'UX研究员',
  'Ultrasound Technician': '超声检查技师',
  'Valet Attendant': '代客泊车员',
  'Veterans Service Officer': '退役军人服务官',
  'Veterinary Assistant': '兽医助理',
  'Veterinary Technician': '兽医技术员',
  'Video Editor': '视频编辑',
  'Videographer': '摄像师',
  'Virtual Assistant': '虚拟助理',
  'Voice Actor': '配音演员',
  'Waiter/Waitress': '服务员',
  'Warehouse Associate': '仓库员工',
  'Warehouse Manager': '仓库经理',
  'Warehouse Worker': '仓库工人',
  'Web Designer': '网页设计师',
  'Web Developer': '网站开发工程师',
  'Welder': '焊工',
  'Wellness Coach': '健康管理师',
  'Wildlife Biologist': '野生动物学家',
  'Wind Turbine Technician': '风力发电技术员',
  'Window Cleaner': '玻璃清洁工',
  'X-Ray Technician': 'X光技师',
  'Yoga Instructor': '瑜伽教练',
  'Youth Counselor': '青少年咨询师',
  'Zookeeper': '动物园饲养员',
  'iOS Developer': 'iOS开发工程师',
};

// ─── CATEGORIES (English → Chinese) ─────────────────────────────────────────

export const CATEGORIES = {
  Technology: '科技',
  Healthcare: '医疗健康',
  Trades: '技术工种',
  Hospitality: '酒店服务',
  'Food Service': '餐饮服务',
  Creative: '创意设计',
  Education: '教育',
  Government: '政府机关',
  Finance: '金融财务',
  Marketing: '市场营销',
  Business: '商务',
  Engineering: '工程',
  Sales: '销售',
  Legal: '法律',
  'Real Estate': '房地产',
  HR: '人力资源',
  Fitness: '健身',
  Management: '管理',
  'Animal Care': '动物护理',
  Logistics: '物流',
  'Customer Service': '客户服务',
  Administrative: '行政办公',
  Transportation: '交通运输',
  Retail: '零售',
  Cleaning: '保洁',
  'Social Services': '社会服务',
  Manufacturing: '制造业',
  Construction: '建筑施工',
  Security: '安保',
  Science: '科学',
  Events: '活动策划',
  'Writing & Content': '写作与内容',
  'Supply Chain': '供应链',
  Research: '研究',
  Insurance: '保险',
  Consulting: '咨询',
  Aviation: '航空',
  Automotive: '汽车',
  Media: '传媒',
  Maritime: '海运',
  'Law Enforcement': '执法',
  'Entry-Level': '应届生与转行',
  Entertainment: '娱乐',
  Childcare: '幼儿保育',
  Beauty: '美容美发',
  Architecture: '建筑设计',
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
  Technology: (job) => `${job}的简历不能仅仅罗列技术栈，更要展示具体的问题解决能力和业务贡献。技术实力结合项目成果的量化呈现，才能让招聘方一眼看到您与岗位的高度契合。`,
  Healthcare: (job) => `医疗行业的招聘负责人既看重临床能力，也看重对患者的真诚关怀。${job}的简历需要在专业技能和人文素养之间取得平衡，这是通过简历筛选的关键。`,
  Finance: (job) => `金融行业招聘方需要能够将复杂数据转化为战略决策的人才。${job}简历应通过实际业绩展现分析能力、细致入微的工作态度和准确的财务判断力。`,
  Education: (job) => `教育机构的招聘方在寻找能激发学习热情、满足不同学生需求的人才。${job}简历需要具体呈现教育专业知识和对学生成长的实质性贡献。`,
  'Food Service': (job) => `餐饮行业招聘方重视可靠性、团队合作和工作热情。${job}简历应在展示烹饪技术或服务能力的同时，体现在高压环境下稳定输出的能力。`,
  Hospitality: (job) => `酒店行业要求热情的服务态度、细致的关怀以及在压力下从容应对的能力。${job}简历应突出服务意识和为客人创造难忘体验的能力。`,
  Trades: (job) => `技术工种招聘方重视能独立完成高质量工作的技术人才。${job}简历应以实操经验、安全意识和现场问题解决能力为核心亮点。`,
  Creative: (job) => `优秀的创意人才需要同时满足艺术追求和客户需求。${job}简历在展示创意视野的同时，也要体现商业敏感度和按时交付的能力。`,
  Administrative: (job) => `行政岗位招聘方寻找能提前预判需求、主动解决问题、严守机密的人才。${job}简历应展示组织协调能力和提升工作效率的具体成果。`,
  Sales: (job) => `简历就是您的第一份销售提案，招聘方正是这样评估的。${job}简历最有效的方式是展示您理解企业的业务痛点，并能为达成销售目标贡献力量。`,
  Marketing: (job) => `市场营销是快速变化的领域，招聘方需要策略与执行兼备的人才。${job}简历应展现创造可量化成果的能力和策略性创意思维。`,
  HR: (job) => `人力资源岗位要求深刻理解组织动态，同时创造切实的业务成果。${job}简历需要在人才管理和组织贡献两个维度展示实绩。`,
  'Customer Service': (job) => `客户服务岗位需要出色的沟通能力和真诚的共情能力。${job}简历应展示在有效解决问题的同时维护良好客户关系的能力。`,
  Retail: (job) => `零售业招聘方看重可靠性、商品知识和真诚的服务热情。${job}简历应展示销售业绩和在快节奏环境中发挥能力的实例。`,
  Logistics: (job) => `物流行业招聘方看重效率、准确性和时间敏感型任务的管理能力。${job}简历应具体展示在库存管理、计划制定和流程优化方面的经验。`,
  Government: (job) => `政府机关的招聘与民营企业不同，需要针对性的准备。${job}简历应直接回应岗位要求，同时体现公共服务意识。`,
  Legal: (job) => `法律领域要求绝对的准确性和对细节的高度关注。${job}简历应反映严谨的逻辑思维、对法律法规的深入理解以及处理复杂案件的能力。`,
  default: (job) => `高效的${job}简历聚焦于能证明您入职即可创造价值的具体业绩。将相关经验和对岗位的真诚热情有机结合来呈现。`,
};

// ─── TAGS GENERATOR ─────────────────────────────────────────────────────────

export function generateTags(jobTitle, slug) {
  return [
    `${jobTitle} 简历`,
    `${jobTitle} 简历模板`,
    `${jobTitle} 简历范文`,
    `${jobTitle} 求职信`,
    `简历制作`,
    `ATS简历`,
    `简历怎么写`,
    `求职简历`,
  ];
}

// ─── FAQ GENERATOR ──────────────────────────────────────────────────────────

export function generateFAQ(jobTitle) {
  return [
    {
      question: `${jobTitle}简历应该写哪些技能？`,
      answer: `${jobTitle}简历应包含与岗位直接相关的专业技能，以及沟通、团队协作等通用能力。建议参考招聘信息中的关键词，并用具体业绩来支撑每项技能。`,
    },
    {
      question: `${jobTitle}简历的理想长度是多少？`,
      answer: `${jobTitle}简历建议经验较少者控制在1-2页，10年以上经验者可写2-3页。内容质量优先，确保每一项内容都有实际价值。`,
    },
    {
      question: `${jobTitle}简历应该用什么格式？`,
      answer: `${jobTitle}简历推荐使用简洁的ATS友好型标准格式。逆序排列（最新经历在前）最为有效，联系方式、个人简介、工作经历、教育背景、证书等板块要清晰分明。`,
    },
    {
      question: `${jobTitle}的薪资水平是多少？`,
      answer: `${jobTitle}的薪资因经验、工作地区和企业规模而有较大差异。建议通过智联招聘、Boss直聘、猎聘等平台查看最新薪资数据。简历中写明量化业绩有助于薪资谈判。`,
    },
    {
      question: `${jobTitle}简历应包含哪些内容？`,
      answer: `${jobTitle}简历应包含联系方式、个人简介、含量化业绩的工作经历、教育背景、相关证书和核心技能。针对投递的每个岗位，都应对各板块进行针对性调整。`,
    },
  ];
}

// ─── BODY GENERATOR ─────────────────────────────────────────────────────────

export function generateBody(jobTitle, category, keySkills, avgSalary, jobGrowth, slug) {
  const skills = keySkills || [];
  const topSkills = skills.slice(0, 3).join('、') || '专业技能';
  const midSkills = skills.slice(3, 6).join('、') || '应用技能';
  const softSkills = skills.slice(6, 8).join('、') || '团队协作、沟通能力';

  const norm = normalizeCategory(category);
  const opener = (CATEGORY_OPENERS[norm] || CATEGORY_OPENERS.default)(jobTitle);

  return `
## ${jobTitle}简历的核心差异化要点

${opener}

招聘负责人审阅一份简历的平均时间仅为6-7秒。${jobTitle}岗位要求最相关的技能和核心成果能一眼就被看到。优秀的简历不是简单的经历罗列，而是讲述您的职业故事，清晰展示您能为企业带来的价值。

## 个人简介范文

### 应届/初级

具备扎实的${topSkills || '专业领域'}基础知识，积极进取的${jobTitle}求职者。期望在充满活力的团队中贡献力量，将学业中积累的知识应用于实际工作中。学习能力强、条理清晰、目标导向明确是我的核心优势。

### 3-7年经验（中级）

拥有5年以上${topSkills}实战经验的${jobTitle}。在流程优化和按期按预算完成项目方面有经过验证的业绩。精通${midSkills || '高阶技能'}，具有丰富的团队指导和持续改进推动经验。

### 资深/管理层

拥有10年以上行业经验的资深${jobTitle}。在${topSkills}及${midSkills || '战略管理'}领域获得业界认可。曾带领15人以上跨部门团队，主导节省超过500万元成本的战略项目。${softSkills || '领导力与战略眼光'}突出，持续超额完成目标。

## 薪资与就业前景

${jobTitle}的平均薪资约为**${avgSalary || '$50,000'}**，实际收入因经验、工作地区和行业而有较大差异。该职业未来数年的就业增长率预计为**${jobGrowth || '+5%'}**。

应届生的起薪通常为中位数的70-80%，资深及专业岗位的薪资可高出中位数40-60%以上。一线城市和高需求行业通常提供更高的薪酬待遇。

**参考资料：**
- [美国劳工统计局 (BLS)](https://www.bls.gov/ooh/) — 官方就业与薪资数据
- [Glassdoor](https://www.glassdoor.com/Salaries/) — 员工报告薪资数据与薪资范围
- [PayScale](https://www.payscale.com/research/US/) — 职业薪资调查与对比

*实际薪资因经验、地区、行业和企业规模而异。*

## 需要重点展示的核心技能

### 专业技术技能
${skills.slice(0, 3).map(s => `- **${s}** — ${jobTitle}必备技能，招聘方和ATS系统最关注的要点`).join('\n') || '- 岗位相关工具和技术的熟练程度\n- 对行业方法论和流程的深入理解\n- 专业软件的使用能力'}

### 业务组织技能
${skills.slice(3, 6).map(s => `- **${s}** — ${jobTitle}日常工作中频繁运用的重要技能`).join('\n') || '- 时间管理与工作优先级排序\n- 项目规划与组织协调\n- 流程执行的准确性'}

### 人际沟通技能
${skills.slice(6, 8).map(s => `- **${s}** — ${jobTitle}取得成功不可或缺的人际能力`).join('\n') || '- 口头与书面沟通\n- 团队协作能力'}
- 适应能力与抗压能力
- 冲突解决与谈判技巧

## 以成果为导向的业绩写法

参考以下示例，用具体数据展示您的业绩：

- 通过优化${topSkills || '核心技能'}相关流程，工作效率提升**25%**，实现显著成本节约
- 同时管理**12个以上项目**，交付准时率达98%，超额完成团队目标
- 负责**8名新员工**的培训与辅导，新人上手周期缩短40%
- 引入${skills[0] || '管理'}相关新系统，错误率降低**35%**，客户满意度提升
- 通过创新的${skills[1] || '开发'}策略，季度营收增长**20%**
- 基于用户反馈持续改进，客户满意度达到**95%**

## ${jobTitle}简历格式与模板建议

1. **使用逆序排列格式** — 最新经历排在最前面。这是${jobTitle}招聘方和ATS系统最偏好的格式。
2. **每次投递都要定制个人简介** — 融入招聘信息中的关键词，展示您了解该岗位的独特要求。
3. **业绩要量化** — 数字能吸引招聘方的注意力，具体展示您的贡献。"提升了销售额"不如"销售额增长30%"有说服力。
4. **排版整洁规范** — 边距2.5厘米，字号10-12pt，用加粗标题清晰区分各板块。
5. **列出相关证书与培训** — ${jobTitle}岗位中，专业资格证书和持续学习是展示进取心的重要加分项。

## 招聘经理建议

> **${jobTitle}简历中最常见的问题是缺少量化的成果。** 很多求职者只是描述了工作职责，却没有展示工作的具体成效。

招聘${jobTitle}时，我会寻找业绩的具体证据。比起写"管理5人团队"，写"带领5人团队连续4个季度完成目标115%"的候选人评价要高得多。工作经历中的每一条都应该回答"取得了什么可衡量的成果？"这个问题。

此外，使用目标行业的专业术语也很重要。${category.toLowerCase()}领域的招聘方能一眼看出没有针对性调整的通用简历。

## ${jobTitle}常见面试题

### 请介绍一个您作为${jobTitle}处理过的复杂项目

招聘方借此评估您处理复杂情况的能力。建议用STAR法则（情境、任务、行动、结果）组织回答，说明背景、您的具体角色、采取的行动和可量化的结果。

### 作为${jobTitle}，您如何应对压力或紧迫的截止日期？

展示您的优先级排序能力和在压力下保持高效的能力。举一个优先级冲突的具体案例，分享您的系统化方法和取得的积极成果。

### 您与${jobTitle}岗位最相关的技术优势是什么？

这是展示${topSkills || '核心技能'}专长的绝佳机会。不要只罗列技能，用具体的应用案例和该技能带来的成果来支撑。

### 您如何保持对行业最新动态的了解？

招聘方希望看到您对持续专业发展的投入。可以谈谈最近参加的培训、获得的证书、参加的行业会议、订阅的专业刊物和活跃参与的社区。

### 5年后您作为${jobTitle}有怎样的职业规划？

展示您有清晰的职业愿景。提出与企业发展机会相匹配的现实目标，体现您对行业的长期投入。

## 常见错误及应对方法

### 1. 一份简历投遍所有岗位

用同一份简历投递所有岗位是最减分的做法。ATS和招聘方能一眼识别未经定制的简历。${jobTitle}每次投递都必须调整个人简介和关键词。

### 2. 只写工作职责不写业绩

罗列日常工作内容无法打动招聘方。每一条都要转化为可量化的成果。"负责客户接待"不如"日均接待85位客户，首次解决率达92%"。

### 3. 忽视ATS优化

很多${jobTitle}求职者因为通不过自动筛选而错失机会。复杂的表格、页眉页脚和图形元素往往无法被ATS正确解析，应当避免使用。

### 4. 包含过时或无关的信息

15年以上前的经历或与${jobTitle}岗位无关的工作经历只会让简历显得冗长。聚焦于最近10年内的相关经验。

### 5. 遗漏行业关键词

每个行业都有专业术语。${jobTitle}岗位中如果缺少${topSkills || '专业术语'}等行业特定用语，会给招聘方留下不够专业的印象。

## ${jobTitle}简历的ATS优化

ATS（申请人追踪系统）是招聘方在人工审阅前使用的自动筛选系统。作为${jobTitle}求职者，要通过简历筛选需要注意：

- **使用招聘信息中的精确关键词** — 如果招聘信息写了"${skills[0] || '特定技能'}"，简历中就要包含完全一致的表述
- **使用简洁易读的格式** — 多栏排版、表格、文本框会干扰ATS解析，应当避免
- **核心技能分散在多个板块** — ${topSkills || '关键技能'}应在个人简介、工作经历和技能板块中都有体现
- **提交PDF或DOCX格式** — 这是主流ATS支持最好的文件格式
- **缩写和全称都要写** — 例如："客户关系管理（CRM）"，覆盖不同的搜索变体
- **不要使用页眉和页脚** — 部分ATS无法读取这些区域的内容

## 相关资源

让您的${jobTitle}求职材料更加完善：

- [用ATS检测工具验证您的简历](/zh/tools/ats-checker) — 免费ATS分析工具检测简历
- [专业简历范文大全](/zh/resume-examples) — 按行业分类的数百个简历模板
- [ATS优化简历模板](/zh/templates) — 专为通过自动筛选优化的模板

想制作专业的ATS优化${jobTitle}简历吗？[使用免费简历制作工具](/zh/builder)，几分钟内即可创建出色的简历。模板已针对ATS优化，并会逐步引导您完成每个板块的撰写。
`;
}
