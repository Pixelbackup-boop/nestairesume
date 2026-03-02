#!/usr/bin/env node
/**
 * Thai (th) locale data for resume example generation.
 * Used by: scripts/generate-locale-resume-examples.mjs --lang th
 *
 * Exports: CONFIG, JOB_TITLES, CATEGORIES, generateTags, generateFAQ, generateBody
 *
 * Keywords sourced from: seo/thai-top-keywords.csv
 * Top Thai search terms: เรซูเม่ (resume), ประวัติย่อ (CV), เทมเพลต (template),
 * ตัวอย่าง (example), สมัครงาน (job application), cv สมัครงาน
 */

// ─── CONFIG ──────────────────────────────────────────────────────────────────

export const CONFIG = {
  author: 'สมฤดี วงศ์สุวรรณ',
  authorBio: 'ที่ปรึกษาด้านการพัฒนาอาชีพและผู้เชี่ยวชาญด้านการเขียนเรซูเม่ มีประสบการณ์กว่า 10 ปีในการช่วยคนไทยพัฒนาเส้นทางอาชีพและสมัครงานสำเร็จ',
  titlePattern: (job) => `เรซูเม่${job}: ตัวอย่าง เทมเพลต และเคล็ดลับการเขียน 2026`,
  descriptionPattern: (job) => `ตัวอย่างเรซูเม่${job} พร้อมเทมเพลตที่เป็นมิตรกับระบบ ATS และเคล็ดลับจากผู้เชี่ยวชาญ รูปแบบมืออาชีพสำหรับการสมัครงาน 2026`,
  imageAltPattern: (job) => `ตัวอย่างเรซูเม่${job}`,
};

// ─── JOB TITLES (554 entries) ────────────────────────────────────────────────

export const JOB_TITLES = {
  '3D Artist': 'ศิลปิน 3D',
  'AI Engineer': 'วิศวกร AI',
  'AWS Cloud Engineer': 'วิศวกร AWS Cloud',
  'AWS Solution Architect': 'สถาปนิก AWS Solution',
  'Academic Advisor': 'ที่ปรึกษาทางวิชาการ',
  'Account Executive': 'ผู้บริหารลูกค้า',
  'Account Manager': 'ผู้จัดการบัญชีลูกค้า',
  'Accountant': 'นักบัญชี',
  'Accounting Assistant': 'ผู้ช่วยนักบัญชี',
  'Accounting Clerk': 'เสมียนบัญชี',
  'Accounting Intern': 'นักศึกษาฝึกงานบัญชี',
  'Accounts Payable Specialist': 'ผู้เชี่ยวชาญบัญชีเจ้าหนี้',
  'Accounts Receivable Specialist': 'ผู้เชี่ยวชาญบัญชีลูกหนี้',
  'Administrative Assistant': 'ผู้ช่วยธุรการ',
  'Android Developer': 'นักพัฒนา Android',
  'Animal Control Officer': 'เจ้าหน้าที่ควบคุมสัตว์',
  'Animal Shelter Worker': 'เจ้าหน้าที่สถานพักพิงสัตว์',
  'Animator': 'แอนิเมเตอร์',
  'Appliance Repair Technician': 'ช่างซ่อมเครื่องใช้ไฟฟ้า',
  'Aquarium Keeper': 'ผู้ดูแลพิพิธภัณฑ์สัตว์น้ำ',
  'Arbitrator': 'อนุญาโตตุลาการ',
  'Architect': 'สถาปนิก',
  'Art Director': 'ผู้อำนวยการฝ่ายศิลป์',
  'Assistant Director': 'ผู้ช่วยผู้อำนวยการ',
  'Assistant Manager': 'ผู้ช่วยผู้จัดการ',
  'Assistant Property Manager': 'ผู้ช่วยผู้จัดการอสังหาริมทรัพย์',
  'Assistant Store Manager': 'ผู้ช่วยผู้จัดการร้าน',
  'Athletic Trainer': 'เทรนเนอร์กีฬา',
  'Audio Engineer': 'วิศวกรเสียง',
  'Auditor': 'ผู้ตรวจสอบบัญชี',
  'Auto Mechanic': 'ช่างยนต์',
  'Automation Engineer': 'วิศวกรระบบอัตโนมัติ',
  'Automotive Technician': 'ช่างเทคนิคยานยนต์',
  'Backend Developer': 'นักพัฒนา Backend',
  'Baker': 'ช่างทำขนมปัง',
  'Bank Manager': 'ผู้จัดการธนาคาร',
  'Bank Teller': 'พนักงานธนาคาร',
  'Banquet Chef': 'เชฟจัดเลี้ยง',
  'Barista': 'บาริสต้า',
  'Bartender': 'บาร์เทนเดอร์',
  'Bellhop': 'พนักงานยกกระเป๋า',
  'Billing Specialist': 'ผู้เชี่ยวชาญด้านการเรียกเก็บเงิน',
  'Blockchain Developer': 'นักพัฒนา Blockchain',
  'Branch Manager': 'ผู้จัดการสาขา',
  'Brand Designer': 'นักออกแบบแบรนด์',
  'Budget Analyst': 'นักวิเคราะห์งบประมาณ',
  'Building Inspector': 'ผู้ตรวจสอบอาคาร',
  'Building Maintenance Technician': 'ช่างซ่อมบำรุงอาคาร',
  'Bus Driver': 'พนักงานขับรถโดยสาร',
  'Business Administration Professional': 'นักบริหารธุรกิจ',
  'Business Analyst': 'นักวิเคราะห์ธุรกิจ',
  'Business Consultant': 'ที่ปรึกษาธุรกิจ',
  'Business Development Executive': 'ผู้บริหารพัฒนาธุรกิจ',
  'Business Development Manager': 'ผู้จัดการพัฒนาธุรกิจ',
  'Business Intelligence Analyst': 'นักวิเคราะห์ Business Intelligence',
  'Business Intelligence Specialist': 'ผู้เชี่ยวชาญ Business Intelligence',
  'Business Manager': 'ผู้จัดการธุรกิจ',
  'Business Owner': 'เจ้าของธุรกิจ',
  'Busser': 'พนักงานเก็บจาน',
  'CNC Machinist': 'ช่างกลึง CNC',
  'CNC Operator': 'ผู้ควบคุมเครื่อง CNC',
  'Cabin Crew': 'ลูกเรือ',
  'Cabinet Maker': 'ช่างทำตู้',
  'Cafeteria Worker': 'พนักงานโรงอาหาร',
  'Call Center Agent': 'เจ้าหน้าที่คอลเซ็นเตอร์',
  'Call Center Representative': 'พนักงานคอลเซ็นเตอร์',
  'Car Sales Associate': 'พนักงานขายรถยนต์',
  'Caregiver': 'ผู้ดูแลผู้ป่วย',
  'Carpenter': 'ช่างไม้',
  'Carpet Cleaner': 'ช่างทำความสะอาดพรม',
  'Case Manager': 'ผู้จัดการกรณี',
  'Cashier': 'พนักงานแคชเชียร์',
  'Casino Dealer': 'ดีลเลอร์คาสิโน',
  'Caterer': 'ผู้จัดเลี้ยง',
  'Catering Manager': 'ผู้จัดการจัดเลี้ยง',
  'Certified Nursing Assistant': 'ผู้ช่วยพยาบาลที่ได้รับการรับรอง',
  'Certified Nursing Assistant (CNA)': 'ผู้ช่วยพยาบาลที่ได้รับการรับรอง (CNA)',
  'Change Management Specialist': 'ผู้เชี่ยวชาญการจัดการการเปลี่ยนแปลง',
  'Chef': 'เชฟ',
  'Chemical Engineer': 'วิศวกรเคมี',
  'Chemist': 'นักเคมี',
  'Chief Information Officer (CIO)': 'ประธานเจ้าหน้าที่สารสนเทศ (CIO)',
  'Chief of Staff': 'หัวหน้าเจ้าหน้าที่',
  'Chiropractor': 'นักจัดกระดูก',
  'City Planner': 'นักผังเมือง',
  'Civil Engineer': 'วิศวกรโยธา',
  'Claims Adjuster': 'ผู้ประเมินสินไหม',
  'Client Relations Manager': 'ผู้จัดการลูกค้าสัมพันธ์',
  'Clinical Research Associate': 'นักวิจัยทางคลินิก',
  'Clinical Research Coordinator': 'ผู้ประสานงานวิจัยทางคลินิก',
  'Cloud Architect': 'สถาปนิก Cloud',
  'Cloud Engineer': 'วิศวกร Cloud',
  'Code Enforcement Officer': 'เจ้าหน้าที่บังคับใช้กฎหมายอาคาร',
  'College Admissions Counselor': 'ที่ปรึกษาการรับเข้าศึกษา',
  'College Professor': 'อาจารย์มหาวิทยาลัย',
  'Commercial Cleaner': 'พนักงานทำความสะอาดอาคาร',
  'Commercial Real Estate Broker': 'นายหน้าอสังหาริมทรัพย์เชิงพาณิชย์',
  'Community Manager': 'ผู้จัดการชุมชน',
  'Community Outreach Coordinator': 'ผู้ประสานงานชุมชนสัมพันธ์',
  'Complaints Handler': 'เจ้าหน้าที่รับเรื่องร้องเรียน',
  'Compliance Officer': 'เจ้าหน้าที่ปฏิบัติตามกฎระเบียบ',
  'Computer Operator': 'ผู้ควบคุมคอมพิวเตอร์',
  'Computer Science Professional': 'นักวิทยาการคอมพิวเตอร์',
  'Computer Technician': 'ช่างคอมพิวเตอร์',
  'Concierge': 'พนักงานต้อนรับ',
  'Concrete Finisher': 'ช่างปูนคอนกรีต',
  'Construction Manager': 'ผู้จัดการก่อสร้าง',
  'Construction Superintendent': 'ผู้ควบคุมงานก่อสร้าง',
  'Construction Worker': 'คนงานก่อสร้าง',
  'Consultant': 'ที่ปรึกษา',
  'Content Creator': 'ครีเอเตอร์คอนเทนต์',
  'Content Writer': 'นักเขียนคอนเทนต์',
  'Contract Specialist': 'ผู้เชี่ยวชาญด้านสัญญา',
  'Contracts Specialist': 'ผู้เชี่ยวชาญบริหารสัญญา',
  'Controller': 'ผู้ควบคุมบัญชี',
  'Copywriter': 'นักเขียนโฆษณา',
  'Corporate Security Manager': 'ผู้จัดการรักษาความปลอดภัยองค์กร',
  'Correctional Officer': 'เจ้าหน้าที่ราชทัณฑ์',
  'Court Clerk': 'เจ้าหน้าที่ศาล',
  'Court Reporter': 'ผู้บันทึกการพิจารณาคดี',
  'Creative Director': 'ผู้อำนวยการฝ่ายสร้างสรรค์',
  'Crisis Counselor': 'ที่ปรึกษาภาวะวิกฤต',
  'Cruise Ship Worker': 'พนักงานเรือสำราญ',
  'Curriculum Developer': 'นักพัฒนาหลักสูตร',
  'Customer Experience Specialist': 'ผู้เชี่ยวชาญประสบการณ์ลูกค้า',
  'Customer Service Representative': 'พนักงานบริการลูกค้า',
  'Customer Success Manager': 'ผู้จัดการความสำเร็จของลูกค้า',
  'Customer Success Specialist': 'ผู้เชี่ยวชาญความสำเร็จของลูกค้า',
  'Customer Support Specialist': 'ผู้เชี่ยวชาญสนับสนุนลูกค้า',
  'Customs Officer': 'เจ้าหน้าที่ศุลกากร',
  'Cybersecurity Analyst': 'นักวิเคราะห์ความปลอดภัยไซเบอร์',
  'Data Analyst': 'นักวิเคราะห์ข้อมูล',
  'Data Architect': 'สถาปนิกข้อมูล',
  'Data Engineer': 'วิศวกรข้อมูล',
  'Data Entry Clerk': 'เจ้าหน้าที่บันทึกข้อมูล',
  'Data Entry Operator': 'ผู้ปฏิบัติงานบันทึกข้อมูล',
  'Data Entry Specialist': 'ผู้เชี่ยวชาญบันทึกข้อมูล',
  'Data Scientist': 'นักวิทยาศาสตร์ข้อมูล',
  'Database Administrator': 'ผู้ดูแลฐานข้อมูล',
  'Delivery Driver': 'พนักงานขับรถส่งของ',
  'Dental Assistant': 'ผู้ช่วยทันตแพทย์',
  'Dental Hygienist': 'นักอนามัยทันตกรรม',
  'Dental Office Manager': 'ผู้จัดการคลินิกทันตกรรม',
  'Dentist': 'ทันตแพทย์',
  'Design Engineer': 'วิศวกรออกแบบ',
  'Desktop Support Engineer': 'วิศวกรสนับสนุนเดสก์ท็อป',
  'Desktop Support Technician': 'ช่างเทคนิคสนับสนุนเดสก์ท็อป',
  'DevOps Engineer': 'วิศวกร DevOps',
  'Dialysis Technician': 'ช่างเทคนิคฟอกไต',
  'Diesel Mechanic': 'ช่างเครื่องยนต์ดีเซล',
  'Dietary Aide': 'ผู้ช่วยด้านโภชนาการ',
  'Dietitian': 'นักกำหนดอาหาร',
  'Digital Marketer': 'นักการตลาดดิจิทัล',
  'Digital Marketing Manager': 'ผู้จัดการการตลาดดิจิทัล',
  'Digital Marketing Specialist': 'ผู้เชี่ยวชาญการตลาดดิจิทัล',
  'Dishwasher': 'พนักงานล้างจาน',
  'Dispatcher': 'เจ้าหน้าที่สั่งการ',
  'District Manager': 'ผู้จัดการเขต',
  'Doctor': 'แพทย์',
  'Dog Trainer': 'ครูฝึกสุนัข',
  'Driver': 'พนักงานขับรถ',
  'Drywall Installer': 'ช่างติดตั้งผนังยิปซัม',
  'EMT': 'เจ้าหน้าที่กู้ชีพ',
  'ESL Teacher': 'ครูสอนภาษาอังกฤษ',
  'Editor': 'บรรณาธิการ',
  'Education Consultant': 'ที่ปรึกษาการศึกษา',
  'Educational Technologist': 'นักเทคโนโลยีการศึกษา',
  'Electrical Engineer': 'วิศวกรไฟฟ้า',
  'Electrical Technician': 'ช่างเทคนิคไฟฟ้า',
  'Electrician': 'ช่างไฟฟ้า',
  'Elementary Teacher': 'ครูประถมศึกษา',
  'Elevator Technician': 'ช่างลิฟต์',
  'Embedded Systems Engineer': 'วิศวกรระบบสมองกลฝังตัว',
  'Emergency Management Coordinator': 'ผู้ประสานงานจัดการภาวะฉุกเฉิน',
  'Engineering Manager': 'ผู้จัดการฝ่ายวิศวกรรม',
  'Environmental Compliance Officer': 'เจ้าหน้าที่ปฏิบัติตามกฎระเบียบสิ่งแวดล้อม',
  'Epidemiologist': 'นักระบาดวิทยา',
  'Escrow Officer': 'เจ้าหน้าที่ทรัสต์',
  'Ethical Hacker': 'แฮกเกอร์จริยธรรม',
  'Event Coordinator': 'ผู้ประสานงานจัดงาน',
  'Event Manager': 'ผู้จัดการจัดงาน',
  'Event Planner': 'นักวางแผนจัดงาน',
  'Executive Assistant': 'ผู้ช่วยผู้บริหาร',
  'Executive Chef': 'หัวหน้าเชฟ',
  'Executive Director': 'ผู้อำนวยการบริหาร',
  'Family Services Worker': 'เจ้าหน้าที่สวัสดิการครอบครัว',
  'Fashion Designer': 'นักออกแบบแฟชั่น',
  'Fast Food Worker': 'พนักงานร้านอาหารจานด่วน',
  'Fence Installer': 'ช่างติดตั้งรั้ว',
  'Finance Manager': 'ผู้จัดการการเงิน',
  'Financial Analyst': 'นักวิเคราะห์การเงิน',
  'Firefighter': 'พนักงานดับเพลิง',
  'Fitness Center Manager': 'ผู้จัดการฟิตเนส',
  'Fitness Instructor': 'ครูฝึกฟิตเนส',
  'Fitness Trainer': 'เทรนเนอร์ฟิตเนส',
  'Flight Attendant': 'พนักงานต้อนรับบนเครื่องบิน',
  'Floor Installer': 'ช่างปูพื้น',
  'Florist': 'ช่างจัดดอกไม้',
  'Food Expeditor': 'ผู้ประสานงานครัว',
  'Food Runner': 'พนักงานเสิร์ฟอาหาร',
  'Food Safety Manager': 'ผู้จัดการความปลอดภัยอาหาร',
  'Food Scientist': 'นักวิทยาศาสตร์อาหาร',
  'Food Server': 'พนักงานเสิร์ฟ',
  'Food Service Director': 'ผู้อำนวยการฝ่ายบริการอาหาร',
  'Food Service Manager': 'ผู้จัดการฝ่ายบริการอาหาร',
  'Food Service Worker': 'พนักงานบริการอาหาร',
  'Food Stylist': 'ฟู้ดสไตลิสต์',
  'Food Truck Operator': 'ผู้ประกอบการฟู้ดทรัค',
  'Freelance Writer': 'นักเขียนอิสระ',
  'Freight Broker': 'นายหน้าขนส่ง',
  'Front Desk Agent': 'พนักงานแผนกต้อนรับ',
  'Front Desk Receptionist': 'พนักงานต้อนรับส่วนหน้า',
  'Front End Developer': 'นักพัฒนา Frontend',
  'Full Stack Developer': 'นักพัฒนา Full Stack',
  'Game Designer': 'นักออกแบบเกม',
  'Game Developer': 'นักพัฒนาเกม',
  'Glazier': 'ช่างกระจก',
  'Go Developer': 'นักพัฒนา Go',
  'Grants Manager': 'ผู้จัดการทุนสนับสนุน',
  'Graphic Designer': 'นักออกแบบกราฟิก',
  'Group Fitness Instructor': 'ครูฝึกฟิตเนสกลุ่ม',
  'Gym Trainer': 'เทรนเนอร์ยิม',
  'HR Assistant': 'ผู้ช่วยฝ่ายบุคคล',
  'HR Business Partner': 'HR Business Partner',
  'HR Coordinator': 'ผู้ประสานงานฝ่ายบุคคล',
  'HR Director': 'ผู้อำนวยการฝ่ายบุคคล',
  'HR Executive': 'ผู้บริหารฝ่ายบุคคล',
  'HR Manager': 'ผู้จัดการฝ่ายบุคคล',
  'HR Recruiter': 'เจ้าหน้าที่สรรหาบุคลากร',
  'HVAC Technician': 'ช่างเทคนิคระบบปรับอากาศ',
  'Head Cook': 'หัวหน้าพ่อครัว',
  'Health Coach': 'โค้ชสุขภาพ',
  'Health Inspector': 'ผู้ตรวจสอบสุขอนามัย',
  'Heavy Equipment Operator': 'ผู้ควบคุมเครื่องจักรหนัก',
  'Help Desk Technician': 'ช่างเทคนิค Help Desk',
  'High School Teacher': 'ครูมัธยมศึกษา',
  'Home Health Aide': 'ผู้ดูแลสุขภาพที่บ้าน',
  'Home Inspector': 'ผู้ตรวจสอบบ้าน',
  'Hospice Nurse': 'พยาบาลดูแลผู้ป่วยระยะสุดท้าย',
  'Hospital Housekeeper': 'พนักงานทำความสะอาดโรงพยาบาล',
  'Hotel Front Desk Agent': 'พนักงานต้อนรับโรงแรม',
  'Hotel Manager': 'ผู้จัดการโรงแรม',
  'House Cleaner': 'แม่บ้าน',
  'Housekeeper': 'แม่บ้าน',
  'Housekeeping Supervisor': 'หัวหน้าแม่บ้าน',
  'IT Director': 'ผู้อำนวยการฝ่ายไอที',
  'IT Manager': 'ผู้จัดการฝ่ายไอที',
  'IT Recruiter': 'เจ้าหน้าที่สรรหาบุคลากรไอที',
  'IT Specialist': 'ผู้เชี่ยวชาญไอที',
  'IT Support Specialist': 'ผู้เชี่ยวชาญสนับสนุนไอที',
  'IT Support Technician': 'ช่างเทคนิคสนับสนุนไอที',
  'IT Technician': 'ช่างเทคนิคไอที',
  'Illustrator': 'นักวาดภาพประกอบ',
  'Industrial Engineer': 'วิศวกรอุตสาหการ',
  'Industrial Maintenance Technician': 'ช่างซ่อมบำรุงอุตสาหกรรม',
  'Information Security Analyst': 'นักวิเคราะห์ความปลอดภัยสารสนเทศ',
  'Inside Sales Representative': 'พนักงานขายภายใน',
  'Instructional Coach': 'โค้ชการสอน',
  'Instructional Designer': 'นักออกแบบการเรียนการสอน',
  'Insulation Worker': 'ช่างฉนวน',
  'Insurance Agent': 'ตัวแทนประกันภัย',
  'Interior Designer': 'นักออกแบบภายใน',
  'Intern': 'นักศึกษาฝึกงาน',
  'Iron Worker': 'ช่างเหล็ก',
  'Ironworker': 'ช่างโครงเหล็ก',
  'Janitor': 'ภารโรง',
  'Java Full Stack Developer': 'นักพัฒนา Java Full Stack',
  'JavaScript Developer': 'นักพัฒนา JavaScript',
  'Junior Developer': 'นักพัฒนาจูเนียร์',
  'Kitchen Helper': 'ผู้ช่วยครัว',
  'Kitchen Manager': 'ผู้จัดการครัว',
  'Lab Assistant': 'ผู้ช่วยห้องปฏิบัติการ',
  'Lab Technician': 'ช่างเทคนิคห้องปฏิบัติการ',
  'Landscaper': 'ช่างจัดสวน',
  'Leasing Consultant': 'ที่ปรึกษาเช่า',
  'Legal Analyst': 'นักวิเคราะห์กฎหมาย',
  'Legal Assistant': 'ผู้ช่วยทนายความ',
  'Legal Secretary': 'เลขานุการกฎหมาย',
  'Legislative Aide': 'ผู้ช่วยนิติบัญญัติ',
  'Librarian': 'บรรณารักษ์',
  'Library Assistant': 'ผู้ช่วยบรรณารักษ์',
  'Licensed Practical Nurse (LPN)': 'พยาบาลปฏิบัติการที่ได้รับใบอนุญาต (LPN)',
  'Limousine Driver': 'พนักงานขับรถลีมูซีน',
  'Line Cook': 'พ่อครัวประจำสาย',
  'Litigation Support Specialist': 'ผู้เชี่ยวชาญสนับสนุนการดำเนินคดี',
  'Loan Officer': 'เจ้าหน้าที่สินเชื่อ',
  'Loan Processor': 'ผู้ดำเนินการสินเชื่อ',
  'Locksmith': 'ช่างกุญแจ',
  'Logistics Coordinator': 'ผู้ประสานงานโลจิสติกส์',
  'Logistics Manager': 'ผู้จัดการโลจิสติกส์',
  'Logistics Specialist': 'ผู้เชี่ยวชาญโลจิสติกส์',
  'Long Haul Truck Driver': 'พนักงานขับรถบรรทุกทางไกล',
  'Loss Prevention Specialist': 'ผู้เชี่ยวชาญป้องกันการสูญเสีย',
  'MRI Technologist': 'นักเทคโนโลยี MRI',
  'Machine Learning Engineer': 'วิศวกร Machine Learning',
  'Machine Learning Specialist': 'ผู้เชี่ยวชาญ Machine Learning',
  'Machine Operator': 'ผู้ควบคุมเครื่องจักร',
  'Maintenance Engineer': 'วิศวกรซ่อมบำรุง',
  'Maintenance Manager': 'ผู้จัดการฝ่ายซ่อมบำรุง',
  'Maintenance Technician': 'ช่างซ่อมบำรุง',
  'Makeup Artist': 'ช่างแต่งหน้า',
  'Management Consultant': 'ที่ปรึกษาด้านการจัดการ',
  'Manufacturing Engineer': 'วิศวกรการผลิต',
  'Manufacturing Worker': 'พนักงานโรงงาน',
  'Marketing Analyst': 'นักวิเคราะห์การตลาด',
  'Marketing Assistant': 'ผู้ช่วยฝ่ายการตลาด',
  'Marketing Coordinator': 'ผู้ประสานงานการตลาด',
  'Marketing Director': 'ผู้อำนวยการฝ่ายการตลาด',
  'Marketing Executive': 'ผู้บริหารฝ่ายการตลาด',
  'Marketing Intern': 'นักศึกษาฝึกงานการตลาด',
  'Marketing Manager': 'ผู้จัดการฝ่ายการตลาด',
  'Marketing Specialist': 'ผู้เชี่ยวชาญการตลาด',
  'Mason': 'ช่างก่ออิฐ',
  'Massage Therapist': 'นักนวดบำบัด',
  'Material Handler': 'พนักงานจัดการวัสดุ',
  'Mechanical Design Engineer': 'วิศวกรออกแบบเครื่องกล',
  'Mechanical Engineer': 'วิศวกรเครื่องกล',
  'Mechanical Technician': 'ช่างเทคนิคเครื่องกล',
  'Mediator': 'ผู้ไกล่เกลี่ย',
  'Medical Assistant': 'ผู้ช่วยแพทย์',
  'Medical Billing Specialist': 'ผู้เชี่ยวชาญเรียกเก็บค่ารักษา',
  'Medical Coder': 'ผู้เชี่ยวชาญรหัสทางการแพทย์',
  'Medical Office Assistant': 'ผู้ช่วยสำนักงานแพทย์',
  'Medical Receptionist': 'พนักงานต้อนรับคลินิก',
  'Medical Representative': 'ผู้แทนยา',
  'Medical Scribe': 'ผู้บันทึกเวชระเบียน',
  'Medical Technologist': 'นักเทคนิคการแพทย์',
  'Mental Health Counselor': 'ที่ปรึกษาสุขภาพจิต',
  'Millwright': 'ช่างติดตั้งเครื่องจักร',
  'Mobile Developer': 'นักพัฒนาแอปมือถือ',
  'Mortgage Loan Officer': 'เจ้าหน้าที่สินเชื่อบ้าน',
  'Motion Graphics Designer': 'นักออกแบบ Motion Graphics',
  'Moving Company Driver': 'พนักงานขับรถขนย้าย',
  'Music Producer': 'โปรดิวเซอร์เพลง',
  'Nanny': 'พี่เลี้ยงเด็ก',
  'Network Administrator': 'ผู้ดูแลระบบเครือข่าย',
  'Network Engineer': 'วิศวกรเครือข่าย',
  'Night Auditor': 'ผู้ตรวจสอบกลางคืน',
  'Node.js Developer': 'นักพัฒนา Node.js',
  'Nurse Practitioner': 'พยาบาลเวชปฏิบัติ',
  'Nursing Assistant': 'ผู้ช่วยพยาบาล',
  'Nutritionist': 'นักโภชนาการ',
  'Occupational Therapist': 'นักกิจกรรมบำบัด',
  'Occupational Therapy Assistant': 'ผู้ช่วยนักกิจกรรมบำบัด',
  'Office Administrator': 'ผู้บริหารสำนักงาน',
  'Office Assistant': 'ผู้ช่วยสำนักงาน',
  'Office Clerk': 'เสมียนสำนักงาน',
  'Office Manager': 'ผู้จัดการสำนักงาน',
  'Operations Analyst': 'นักวิเคราะห์ปฏิบัติการ',
  'Operations Manager': 'ผู้จัดการฝ่ายปฏิบัติการ',
  'Optician': 'ช่างแว่นตา',
  'Optometrist': 'นักทัศนมาตร',
  'Painter': 'ช่างทาสี',
  'Paralegal': 'ผู้ช่วยนักกฎหมาย',
  'Paramedic': 'เจ้าหน้าที่ฉุกเฉินการแพทย์',
  'Park Ranger': 'เจ้าหน้าที่อุทยาน',
  'Pastry Chef': 'เชฟขนม',
  'Payroll Specialist': 'ผู้เชี่ยวชาญเงินเดือน',
  'Penetration Tester': 'ผู้ทดสอบเจาะระบบ',
  'Personal Trainer': 'เทรนเนอร์ส่วนตัว',
  'Pest Control Technician': 'ช่างกำจัดสัตว์รบกวน',
  'Pet Groomer': 'ช่างตัดขนสัตว์',
  'Pet Sitter': 'ผู้ดูแลสัตว์เลี้ยง',
  'Pharmacist': 'เภสัชกร',
  'Pharmacy Assistant': 'ผู้ช่วยเภสัชกร',
  'Pharmacy Tech': 'เจ้าพนักงานเภสัชกรรม',
  'Pharmacy Technician': 'เจ้าพนักงานเภสัชกรรม',
  'Phlebotomist': 'เจ้าหน้าที่เจาะเลือด',
  'Photographer': 'ช่างภาพ',
  'Physical Therapist': 'นักกายภาพบำบัด',
  'Physical Therapy Assistant': 'ผู้ช่วยนักกายภาพบำบัด',
  'Physician Assistant': 'ผู้ช่วยแพทย์',
  'Pilates Instructor': 'ครูสอนพิลาทิส',
  'Pizza Maker': 'ช่างทำพิซซ่า',
  'Platform Engineer': 'วิศวกร Platform',
  'Plumber': 'ช่างประปา',
  'Police Officer': 'เจ้าหน้าที่ตำรวจ',
  'Policy Analyst': 'นักวิเคราะห์นโยบาย',
  'Pool Cleaner': 'ช่างทำความสะอาดสระว่ายน้ำ',
  'Pool Technician': 'ช่างเทคนิคสระว่ายน้ำ',
  'Postal Worker': 'เจ้าหน้าที่ไปรษณีย์',
  'Power BI Developer': 'นักพัฒนา Power BI',
  'Prep Cook': 'พ่อครัวเตรียมอาหาร',
  'Preschool Teacher': 'ครูอนุบาล',
  'Pressure Washer': 'ช่างฉีดล้างแรงดันสูง',
  'Probation Officer': 'เจ้าหน้าที่คุมประพฤติ',
  'Process Engineer': 'วิศวกรกระบวนการ',
  'Procurement Manager': 'ผู้จัดการฝ่ายจัดซื้อ',
  'Procurement Specialist': 'ผู้เชี่ยวชาญจัดซื้อ',
  'Product Analyst': 'นักวิเคราะห์ผลิตภัณฑ์',
  'Product Designer': 'นักออกแบบผลิตภัณฑ์',
  'Product Manager': 'ผู้จัดการผลิตภัณฑ์',
  'Product Marketing Manager': 'ผู้จัดการการตลาดผลิตภัณฑ์',
  'Product Owner': 'Product Owner',
  'Production Assistant': 'ผู้ช่วยฝ่ายผลิต',
  'Production Engineer': 'วิศวกรการผลิต',
  'Production Manager': 'ผู้จัดการฝ่ายผลิต',
  'Production Worker': 'พนักงานฝ่ายผลิต',
  'Program Coordinator': 'ผู้ประสานงานโปรแกรม',
  'Project Coordinator': 'ผู้ประสานงานโครงการ',
  'Project Engineer': 'วิศวกรโครงการ',
  'Project Manager': 'ผู้จัดการโครงการ',
  'Prompt Engineer': 'วิศวกร Prompt',
  'Property Manager': 'ผู้จัดการอสังหาริมทรัพย์',
  'Psychiatrist': 'จิตแพทย์',
  'Psychologist': 'นักจิตวิทยา',
  'Public Affairs Specialist': 'ผู้เชี่ยวชาญกิจการสาธารณะ',
  'Public Health Inspector': 'ผู้ตรวจสอบสาธารณสุข',
  'Python Developer': 'นักพัฒนา Python',
  'QA Analyst': 'นักวิเคราะห์ QA',
  'QA Engineer': 'วิศวกร QA',
  'QA Manager': 'ผู้จัดการ QA',
  'QA Tester': 'นักทดสอบ QA',
  'Quality Analyst': 'นักวิเคราะห์คุณภาพ',
  'Quality Assurance Specialist': 'ผู้เชี่ยวชาญประกันคุณภาพ',
  'Quality Control Inspector': 'ผู้ตรวจสอบควบคุมคุณภาพ',
  'Quality Engineer': 'วิศวกรคุณภาพ',
  'Quality Manager': 'ผู้จัดการคุณภาพ',
  'Radiologic Technologist': 'นักเทคโนโลยีรังสี',
  'React Developer': 'นักพัฒนา React',
  'Reading Specialist': 'ผู้เชี่ยวชาญการอ่าน',
  'Real Estate Agent': 'ตัวแทนอสังหาริมทรัพย์',
  'Real Estate Appraiser': 'ผู้ประเมินอสังหาริมทรัพย์',
  'Real Estate Assistant': 'ผู้ช่วยอสังหาริมทรัพย์',
  'Real Estate Attorney': 'ทนายความอสังหาริมทรัพย์',
  'Real Estate Investor': 'นักลงทุนอสังหาริมทรัพย์',
  'Receptionist': 'พนักงานต้อนรับ',
  'Recreation Coordinator': 'ผู้ประสานงานนันทนาการ',
  'Recruiter': 'นักสรรหาบุคลากร',
  'Recruiting Coordinator': 'ผู้ประสานงานสรรหาบุคลากร',
  'Registered Nurse': 'พยาบาลวิชาชีพ',
  'Release Engineer': 'วิศวกร Release',
  'Research Analyst': 'นักวิเคราะห์วิจัย',
  'Research Assistant': 'ผู้ช่วยวิจัย',
  'Reservation Agent': 'เจ้าหน้าที่จองห้องพัก',
  'Resident Assistant': 'ผู้ช่วยดูแลหอพัก',
  'Residential Cleaner': 'พนักงานทำความสะอาดที่พัก',
  'Respiratory Therapist': 'นักบำบัดระบบทางเดินหายใจ',
  'Restaurant Manager': 'ผู้จัดการร้านอาหาร',
  'Retail Assistant': 'ผู้ช่วยค้าปลีก',
  'Retail Associate': 'พนักงานค้าปลีก',
  'Retail Manager': 'ผู้จัดการค้าปลีก',
  'Retail Sales Associate': 'พนักงานขายค้าปลีก',
  'Retail Store Manager': 'ผู้จัดการร้านค้าปลีก',
  'Risk Management Specialist': 'ผู้เชี่ยวชาญบริหารความเสี่ยง',
  'Roofer': 'ช่างหลังคา',
  'Rust Developer': 'นักพัฒนา Rust',
  'SAP Consultant': 'ที่ปรึกษา SAP',
  'SOC Analyst': 'นักวิเคราะห์ SOC',
  'Sales Assistant': 'ผู้ช่วยฝ่ายขาย',
  'Sales Associate': 'พนักงานขาย',
  'Sales Consultant': 'ที่ปรึกษาการขาย',
  'Sales Coordinator': 'ผู้ประสานงานขาย',
  'Sales Director': 'ผู้อำนวยการฝ่ายขาย',
  'Sales Engineer': 'วิศวกรฝ่ายขาย',
  'Sales Executive': 'ผู้บริหารฝ่ายขาย',
  'Sales Manager': 'ผู้จัดการฝ่ายขาย',
  'Sales Representative': 'ตัวแทนขาย',
  'Salesforce Administrator': 'ผู้ดูแลระบบ Salesforce',
  'School Administrator': 'ผู้บริหารโรงเรียน',
  'School Counselor': 'ครูแนะแนว',
  'Scrum Master': 'Scrum Master',
  'Seaman': 'กะลาสี',
  'Security Analyst': 'นักวิเคราะห์ความปลอดภัย',
  'Security Engineer': 'วิศวกรความปลอดภัย',
  'Security Guard': 'เจ้าหน้าที่รักษาความปลอดภัย',
  'Security Officer': 'เจ้าหน้าที่รักษาความปลอดภัย',
  'Server': 'พนักงานเสิร์ฟ',
  'Service Advisor': 'ที่ปรึกษาบริการ',
  'Service Crew': 'พนักงานบริการ',
  'Set Designer': 'นักออกแบบฉาก',
  'Sheet Metal Worker': 'ช่างโลหะแผ่น',
  'Shipping & Receiving Clerk': 'เจ้าหน้าที่จัดส่งและรับสินค้า',
  'Site Engineer': 'วิศวกรสนาม',
  'Site Reliability Engineer': 'วิศวกร Site Reliability',
  'Small Business Owner': 'เจ้าของธุรกิจขนาดเล็ก',
  'Social Media Coordinator': 'ผู้ประสานงานโซเชียลมีเดีย',
  'Social Media Manager': 'ผู้จัดการโซเชียลมีเดีย',
  'Social Media Specialist': 'ผู้เชี่ยวชาญโซเชียลมีเดีย',
  'Social Worker': 'นักสังคมสงเคราะห์',
  'Software Architect': 'สถาปนิกซอฟต์แวร์',
  'Software Developer': 'นักพัฒนาซอฟต์แวร์',
  'Software Engineer': 'วิศวกรซอฟต์แวร์',
  'Software Tester': 'นักทดสอบซอฟต์แวร์',
  'Solar Installer': 'ช่างติดตั้งโซลาร์เซลล์',
  'Solution Architect': 'สถาปนิกโซลูชัน',
  'Solutions Engineer': 'วิศวกรโซลูชัน',
  'Sommelier': 'ซอมเมอลิเอร์',
  'Sous Chef': 'ซูเชฟ',
  'Spa Manager': 'ผู้จัดการสปา',
  'Special Education Teacher': 'ครูการศึกษาพิเศษ',
  'Speech-Language Pathologist': 'นักแก้ไขการพูด',
  'Sports Coach': 'โค้ชกีฬา',
  'Stage Manager': 'ผู้จัดการเวที',
  'Sterile Processing Technician': 'ช่างเทคนิคฆ่าเชื้อ',
  'Store Associate': 'พนักงานร้านค้า',
  'Store Manager': 'ผู้จัดการร้านค้า',
  'Storyboard Artist': 'ศิลปินสตอรี่บอร์ด',
  'Substance Abuse Counselor': 'ที่ปรึกษาด้านสารเสพติด',
  'Supply Chain Analyst': 'นักวิเคราะห์ซัพพลายเชน',
  'Supply Chain Manager': 'ผู้จัดการซัพพลายเชน',
  'Support Worker': 'เจ้าหน้าที่สนับสนุน',
  'Surgical Technologist': 'นักเทคโนโลยีห้องผ่าตัด',
  'Sushi Chef': 'เชฟซูชิ',
  'System Administrator': 'ผู้ดูแลระบบ',
  'System Analyst': 'นักวิเคราะห์ระบบ',
  'System Engineer': 'วิศวกรระบบ',
  'TSA Agent': 'เจ้าหน้าที่ตรวจสอบความปลอดภัยสนามบิน',
  'Talent Acquisition Specialist': 'ผู้เชี่ยวชาญสรรหาบุคลากร',
  'Teacher': 'ครู',
  'Teaching Assistant': 'ผู้ช่วยสอน',
  'Team Leader': 'หัวหน้าทีม',
  'Tech Sales Representative': 'ตัวแทนขายเทคโนโลยี',
  'Technical Program Manager': 'ผู้จัดการโปรแกรมเทคนิค',
  'Technical Recruiter': 'เจ้าหน้าที่สรรหาบุคลากรเทคนิค',
  'Technical Support Specialist': 'ผู้เชี่ยวชาญสนับสนุนเทคนิค',
  'Technical Writer': 'นักเขียนเทคนิค',
  'Therapist': 'นักบำบัด',
  'Title Examiner': 'ผู้ตรวจสอบกรรมสิทธิ์',
  'Tour Guide': 'มัคคุเทศก์',
  'Travel Agent': 'ตัวแทนท่องเที่ยว',
  'Truck Driver': 'พนักงานขับรถบรรทุก',
  'Tutor': 'ครูสอนพิเศษ',
  'UI Designer': 'นักออกแบบ UI',
  'UX Designer': 'นักออกแบบ UX',
  'UX Researcher': 'นักวิจัย UX',
  'Ultrasound Technician': 'ช่างเทคนิคอัลตราซาวนด์',
  'Valet Attendant': 'พนักงานรับจอดรถ',
  'Veterans Service Officer': 'เจ้าหน้าที่สวัสดิการทหารผ่านศึก',
  'Veterinary Assistant': 'ผู้ช่วยสัตวแพทย์',
  'Veterinary Technician': 'ช่างเทคนิคสัตวแพทย์',
  'Video Editor': 'นักตัดต่อวิดีโอ',
  'Videographer': 'ช่างวิดีโอ',
  'Virtual Assistant': 'ผู้ช่วยเสมือน',
  'Voice Actor': 'นักพากย์',
  'Waiter/Waitress': 'พนักงานเสิร์ฟ',
  'Warehouse Associate': 'พนักงานคลังสินค้า',
  'Warehouse Manager': 'ผู้จัดการคลังสินค้า',
  'Warehouse Worker': 'คนงานคลังสินค้า',
  'Web Designer': 'นักออกแบบเว็บ',
  'Web Developer': 'นักพัฒนาเว็บ',
  'Welder': 'ช่างเชื่อม',
  'Wellness Coach': 'โค้ชสุขภาพองค์รวม',
  'Wildlife Biologist': 'นักชีววิทยาสัตว์ป่า',
  'Wind Turbine Technician': 'ช่างเทคนิคกังหันลม',
  'Window Cleaner': 'พนักงานทำความสะอาดกระจก',
  'X-Ray Technician': 'ช่างเทคนิคเอกซเรย์',
  'Yoga Instructor': 'ครูสอนโยคะ',
  'Youth Counselor': 'ที่ปรึกษาเยาวชน',
  'Zookeeper': 'ผู้ดูแลสัตว์ในสวนสัตว์',
  'iOS Developer': 'นักพัฒนา iOS',
};

// ─── CATEGORIES (46 entries) ─────────────────────────────────────────────────

export const CATEGORIES = {
  'Technology': 'เทคโนโลยี',
  'Healthcare': 'สาธารณสุข',
  'Trades': 'ช่างฝีมือ',
  'Hospitality': 'การโรงแรม',
  'Food Service': 'บริการอาหาร',
  'Creative': 'สร้างสรรค์',
  'Education': 'การศึกษา',
  'Government': 'ราชการ',
  'Finance': 'การเงิน',
  'Marketing': 'การตลาด',
  'Business': 'ธุรกิจ',
  'Engineering': 'วิศวกรรม',
  'Sales': 'การขาย',
  'Legal': 'กฎหมาย',
  'Real Estate': 'อสังหาริมทรัพย์',
  'HR': 'ทรัพยากรบุคคล',
  'Fitness': 'ฟิตเนส',
  'Management': 'การจัดการ',
  'Animal Care': 'การดูแลสัตว์',
  'Logistics': 'โลจิสติกส์',
  'Customer Service': 'บริการลูกค้า',
  'Administrative': 'ธุรการ',
  'Transportation': 'การขนส่ง',
  'Retail': 'ค้าปลีก',
  'Cleaning': 'ทำความสะอาด',
  'Social Services': 'สังคมสงเคราะห์',
  'Manufacturing': 'การผลิต',
  'Construction': 'ก่อสร้าง',
  'Security': 'รักษาความปลอดภัย',
  'Science': 'วิทยาศาสตร์',
  'Events': 'การจัดงาน',
  'Writing & Content': 'การเขียนและคอนเทนต์',
  'Supply Chain': 'ซัพพลายเชน',
  'Research': 'การวิจัย',
  'Insurance': 'ประกันภัย',
  'Consulting': 'การให้คำปรึกษา',
  'Aviation': 'การบิน',
  'Automotive': 'ยานยนต์',
  'Media': 'สื่อ',
  'Maritime': 'การเดินเรือ',
  'Law Enforcement': 'การบังคับใช้กฎหมาย',
  'Entry-Level': 'เริ่มต้นอาชีพ',
  'Entertainment': 'บันเทิง',
  'Childcare': 'การดูแลเด็ก',
  'Beauty': 'ความงาม',
  'Architecture': 'สถาปัตยกรรม',
};

// ─── TAG GENERATOR ───────────────────────────────────────────────────────────

/**
 * Returns 8 Thai SEO tags for a given job title and slug.
 * Keywords sourced from: seo/thai-top-keywords.csv
 * Top keywords: เรซูเม่, ประวัติย่อ, เทมเพลต, ตัวอย่าง, cv สมัครงาน
 */
export function generateTags(jobTitle, slug) {
  const lower = jobTitle.toLowerCase();
  return [
    `เรซูเม่${lower}`,
    `ประวัติย่อ${lower}`,
    `ตัวอย่างเรซูเม่${lower}`,
    `เทมเพลตเรซูเม่${lower}`,
    `cv สมัครงาน ${lower}`,
    `แบบฟอร์มเรซูเม่${lower}`,
    `วิธีเขียนเรซูเม่${lower}`,
    `เรซูเม่สมัครงาน ${lower}`,
  ];
}

// ─── FAQ GENERATOR ───────────────────────────────────────────────────────────

/**
 * Returns 5 FAQ objects with Thai question/answer pairs.
 */
export function generateFAQ(jobTitle) {
  return [
    {
      question: `ทักษะอะไรบ้างที่ควรใส่ในเรซูเม่${jobTitle}?`,
      answer: `สำหรับเรซูเม่${jobTitle} คุณควรเน้นทักษะที่ตรงกับรายละเอียดงานที่สมัคร ระบุทั้งทักษะเฉพาะทางและทักษะด้านบุคลิกภาพที่เกี่ยวข้องกับตำแหน่ง${jobTitle} ตรวจสอบประกาศรับสมัครงานอย่างละเอียด เพราะระบบ ATS จะค้นหาคำสำคัญที่ตรงกัน`,
    },
    {
      question: `เรซูเม่${jobTitle}ควรมีความยาวเท่าไหร่?`,
      answer: `เรซูเม่${jobTitle}ควรมีความยาว 1 หน้าสำหรับผู้มีประสบการณ์น้อยกว่า 5 ปี หากคุณเป็น${jobTitle}ระดับอาวุโสที่มีประสบการณ์มากกว่า 5 ปี สามารถใช้ 2 หน้าได้ เน้นประสบการณ์ที่เกี่ยวข้องและผลงานที่วัดผลได้ แทนการระบุรายละเอียดทุกตำแหน่งที่เคยทำ`,
    },
    {
      question: `รูปแบบเรซูเม่แบบไหนเหมาะกับ${jobTitle}ที่สุด?`,
      answer: `เรซูเม่${jobTitle}ที่ดีควรใช้รูปแบบเรียงลำดับเวลาย้อนกลับ โดยเริ่มจากตำแหน่งล่าสุด ใช้หัวข้อที่ชัดเจนและเลย์เอาต์คอลัมน์เดียวเพื่อให้ระบบ ATS อ่านได้ง่าย เพิ่มส่วนทักษะเฉพาะที่เน้นความสามารถของ${jobTitle}`,
    },
    {
      question: `${jobTitle}มีเงินเดือนเฉลี่ยเท่าไหร่?`,
      answer: `เงินเดือน${jobTitle}แตกต่างกันตามภูมิภาค ประสบการณ์ และขนาดองค์กร ค้นหาข้อมูลเงินเดือนปัจจุบันจากเว็บไซต์อย่าง JobThai, Glassdoor หรือ PayScale เพื่อวางแผนการเจรจาเงินเดือนอย่างมีข้อมูล นอกจากเงินเดือนพื้นฐาน ควรพิจารณาสวัสดิการเพิ่มเติมด้วย`,
    },
    {
      question: `ควรใส่อะไรบ้างในเรซูเม่${jobTitle}?`,
      answer: `เรซูเม่${jobTitle}ที่น่าสนใจควรมี ข้อมูลติดต่อ สรุปประสบการณ์มืออาชีพ ประสบการณ์ทำงานพร้อมผลงานที่วัดผลได้ การศึกษาและใบรับรองที่เกี่ยวข้อง ปรับเรซูเม่ให้ตรงกับตำแหน่ง${jobTitle}ที่สมัครและใช้คำสำคัญจากประกาศรับสมัครงานเพื่อผ่านระบบ ATS`,
    },
  ];
}

// ─── BODY GENERATOR ──────────────────────────────────────────────────────────

/**
 * Normalizes English category to one of ~15 category groups.
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
    'Construction': 'Construction',
    'Security': 'Security',
    'Science': 'Science',
    'Manufacturing': 'Manufacturing',
    'Social Services': 'Social Services',
    'Fitness': 'Fitness',
    'Cleaning': 'Cleaning',
    'Animal Care': 'Animal Care',
    'Transportation': 'Transportation',
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
    'Real Estate': 'Sales',
  };
  return map[category] || 'default';
}

/**
 * Returns a category-specific opening paragraph in Thai.
 */
function getCategoryIntro(jobTitle, normalizedCategory) {
  const intros = {
    Technology: `อุตสาหกรรมเทคโนโลยีเปลี่ยนแปลงอย่างรวดเร็ว และเรซูเม่${jobTitle}ต้องสะท้อนให้เห็นถึงความเชี่ยวชาญในเทคโนโลยีล่าสุด ฝ่ายบุคคลในสาย IT มองหาผู้สมัครที่ไม่เพียงมีทักษะทางเทคนิคปัจจุบัน แต่ยังแสดงให้เห็นความสามารถในการเรียนรู้เทคโนโลยีใหม่ได้อย่างรวดเร็ว เรซูเม่ที่มีโครงสร้างดีคือกุญแจสำคัญในการแข่งขันในตลาดงานเทคโนโลยีของประเทศไทย`,

    Healthcare: `ในสายงานสาธารณสุข ความแม่นยำคือสิ่งสำคัญที่สุด — และนั่นรวมถึงเรซูเม่${jobTitle}ของคุณด้วย ฝ่ายบุคคลในสถานพยาบาลให้ความสำคัญกับใบรับรอง ประสบการณ์ทางคลินิก และการปฏิบัติตามมาตรฐานคุณภาพ เรซูเม่ที่เน้นการดูแลผู้ป่วยและความเชี่ยวชาญเฉพาะทางคือบัตรผ่านสู่สายงานสาธารณสุขในประเทศไทย`,

    Finance: `สายงานการเงินต้องการความแม่นยำ การคิดวิเคราะห์ และความน่าเชื่อถือ — คุณสมบัติที่ควรสะท้อนอยู่ในเรซูเม่${jobTitle}ของคุณ นายจ้างในภาคการเงินประเมินไม่เพียงคุณสมบัติทางวิชาชีพ แต่ยังรวมถึงความสามารถในการวิเคราะห์ข้อมูลซับซ้อนและตัดสินใจอย่างมีหลักการ`,

    Education: `เรซูเม่${jobTitle}ในสายการศึกษาต้องแสดงให้เห็นทั้งความเชี่ยวชาญทางวิชาการ ทักษะการสอน และความมุ่งมั่นในการพัฒนาผู้เรียน สถาบันการศึกษาในประเทศไทยมองหาผู้สมัครที่ไม่เพียงถ่ายทอดความรู้ แต่ยังสามารถสร้างบรรยากาศการเรียนรู้เชิงบวกและใช้วิธีการสอนที่ทันสมัย`,

    'Food Service': `ในอุตสาหกรรมอาหาร ประสบการณ์จริง ความทนทาน และการทำงานเป็นทีมคือสิ่งสำคัญ เรซูเม่${jobTitle}ที่น่าสนใจแสดงให้เห็นว่าคุณทั้งมีทักษะทางเทคนิคและสามารถรับมือกับสถานการณ์กดดันในครัวได้ อุตสาหกรรมอาหารในประเทศไทยเติบโตอย่างต่อเนื่อง สร้างโอกาสมากมายสำหรับผู้เชี่ยวชาญ`,

    Hospitality: `อุตสาหกรรมการโรงแรมอยู่บนพื้นฐานของการบริการที่เป็นเลิศ เรซูเม่${jobTitle}ของคุณควรเน้นทักษะด้านการสื่อสาร การดูแลแขก และประสบการณ์ในการให้บริการระดับสากล ประเทศไทยเป็นจุดหมายปลายทางด้านการท่องเที่ยวชั้นนำ ทำให้สายงานโรงแรมมีความต้องการบุคลากรคุณภาพสูง`,

    Trades: `ในสายงานช่างฝีมือ ประสบการณ์จริง ความชำนาญ และความน่าเชื่อถือคือข้อได้เปรียบหลัก เรซูเม่${jobTitle}ต้องแสดงทักษะเฉพาะทาง ใบรับรอง และความรู้ด้านความปลอดภัยอย่างชัดเจน นายจ้างในสายนี้ให้ความสำคัญกับประสบการณ์ภาคปฏิบัติและความสามารถในการทำงานให้เสร็จตรงเวลาและมีคุณภาพ`,

    Creative: `ในอุตสาหกรรมสร้างสรรค์ เรซูเม่${jobTitle}เป็นมากกว่าเอกสาร — มันคือนามบัตรแสดงพรสวรรค์ของคุณ นอกจากพอร์ตโฟลิโอ เรซูเม่ต้องแสดงทักษะศิลปะ เครื่องมือที่ใช้ และความสามารถในการแปลงวิสัยทัศน์เชิงสร้างสรรค์ให้เป็นผลงานจริง`,

    Administrative: `ผู้เชี่ยวชาญด้านธุรการคือกระดูกสันหลังขององค์กร เรซูเม่${jobTitle}ที่แข็งแกร่งแสดงทักษะการจัดการ ความน่าเชื่อถือ และความสามารถในการใช้ซอฟต์แวร์สำนักงานสมัยใหม่ นายจ้างมองหาผู้สมัครที่สามารถจัดการงานหลายอย่างพร้อมกันได้อย่างมีประสิทธิภาพ`,

    Sales: `ในสายงานขาย ผลลัพธ์คือสิ่งที่สำคัญที่สุด — และเรซูเม่${jobTitle}ต้องสะท้อนสิ่งนั้น ฝ่ายบุคคลมองหายอดขายที่วัดผลได้ การบริหารความสัมพันธ์ลูกค้า และความสามารถในการบรรลุเป้าหมายอย่างสม่ำเสมอ แสดงผลงานด้วยตัวเลขและเปอร์เซ็นต์ที่ชัดเจน`,

    HR: `ในฐานะ${jobTitle}ด้านทรัพยากรบุคคล คุณต้องแสดงให้เห็นว่าเข้าใจกระบวนการบริหารบุคลากรอย่างครบวงจร เรซูเม่ควรเน้นประสบการณ์ด้านการสรรหา พัฒนาบุคลากร และกฎหมายแรงงาน ฝ่ายบุคคลให้ความสำคัญกับทักษะการสื่อสารและการสร้างวัฒนธรรมองค์กร`,

    'Customer Service': `เรซูเม่${jobTitle}ที่โดดเด่นแสดงความสามารถในการเข้าใจความต้องการลูกค้าและแก้ปัญหาอย่างมีประสิทธิภาพ นายจ้างในสายนี้ชื่นชมผลลัพธ์ที่วัดได้ เช่น คะแนนความพึงพอใจลูกค้า จำนวนเรื่องร้องเรียนที่แก้ไข และเวลาตอบสนอง`,

    Retail: `ในค้าปลีก เรซูเม่${jobTitle}คือโอกาสในการแสดงทักษะการขายและความมุ่งเน้นลูกค้า นายจ้างมองหาผู้สมัครที่บรรลุเป้ายอดขาย สร้างแรงจูงใจให้ทีม และมอบประสบการณ์ช้อปปิ้งที่ดีแก่ลูกค้า`,

    Logistics: `สายงานโลจิสติกส์ต้องการความแม่นยำ ทักษะการจัดการ และความสามารถในการประสานงานห่วงโซ่อุปทานที่ซับซ้อน เรซูเม่${jobTitle}ที่น่าสนใจแสดงประสบการณ์ด้านการบริหารจัดการขนส่ง ความชำนาญในซอฟต์แวร์โลจิสติกส์ และความสามารถในการปรับปรุงกระบวนการ`,

    Government: `ในสายราชการ เรซูเม่${jobTitle}มีข้อกำหนดพิเศษ นอกจากคุณสมบัติทางวิชาชีพ หน่วยงานราชการให้ความสำคัญกับความน่าเชื่อถือ ความซื่อสัตย์ และความรู้กฎระเบียบที่เกี่ยวข้อง จัดโครงสร้างเรซูเม่ให้ชัดเจนและตรงตามข้อกำหนดของตำแหน่ง`,

    Legal: `ในสายกฎหมาย เรซูเม่${jobTitle}ต้องแสดงความแม่นยำและความเป็นมืออาชีพสูงสุด สำนักงานกฎหมายประเมินการศึกษา ประสบการณ์ทำงาน และความสามารถในการอธิบายประเด็นกฎหมายซับซ้อนได้อย่างเข้าใจง่าย`,

    Engineering: `ในฐานะ${jobTitle}ด้านวิศวกรรม คุณต้องแสดงทักษะทางเทคนิค ความสามารถในการแก้ปัญหา และประสบการณ์การบริหารโครงการ นายจ้างมองหาผู้สมัครที่สามารถรับมือกับความท้าทายทางเทคนิคที่ซับซ้อนและทำงานร่วมกับทีมได้อย่างมีประสิทธิภาพ`,

    Marketing: `เรซูเม่${jobTitle}ในสายการตลาดต้องน่าสนใจเท่ากับแคมเปญที่คุณสร้าง นายจ้างคาดหวังผลลัพธ์ที่ขับเคลื่อนด้วยข้อมูล กลยุทธ์สร้างสรรค์ และประสบการณ์กับเครื่องมือการตลาดสมัยใหม่ แสดงผลลัพธ์เชิงตัวเลข เช่น การเพิ่มยอดเข้าถึง อัตราแปลงลูกค้า และ ROI`,

    Business: `ในสายธุรกิจ ทักษะการคิดวิเคราะห์ วางแผนเชิงกลยุทธ์ และภาวะผู้นำคือสิ่งสำคัญ เรซูเม่${jobTitle}ควรแสดงความสามารถในการมองเห็นปัญหาทางธุรกิจและพัฒนาโซลูชันที่สร้างกำไร สนับสนุนผลงานด้วยตัวเลขผลลัพธ์ทางธุรกิจที่ชัดเจน`,

    Management: `ในฐานะ${jobTitle}ระดับบริหาร คุณต้องแสดงความสามารถในการนำทีม บรรลุเป้าหมาย และขับเคลื่อนความสำเร็จขององค์กร เรซูเม่ควรแสดงพัฒนาการทางอาชีพที่ชัดเจน ผลลัพธ์ด้านการบริหารที่วัดได้ และวิสัยทัศน์เชิงกลยุทธ์`,

    Construction: `ในสายก่อสร้าง ประสบการณ์ภาคปฏิบัติ ความตระหนักด้านความปลอดภัย และทักษะการบริหารโครงการคือสิ่งสำคัญ เรซูเม่${jobTitle}ควรแสดงประสบการณ์โครงการ ใบรับรองที่เกี่ยวข้อง และความสามารถในการทำงานให้เสร็จตามงบประมาณและกำหนดเวลา`,

    Security: `ในสายรักษาความปลอดภัย ความน่าเชื่อถือ ความตื่นตัว และความเป็นมืออาชีพคือสิ่งสำคัญ เรซูเม่${jobTitle}ควรเน้นใบรับรองด้านความปลอดภัย ประสบการณ์กับระบบเฝ้าระวัง และความสามารถในการรับมือสถานการณ์วิกฤตอย่างใจเย็น`,

    Science: `ในสายวิทยาศาสตร์ เรซูเม่${jobTitle}เป็นหลักฐานแสดงความเชี่ยวชาญด้านการวิจัยและทักษะเชิงวิเคราะห์ นายจ้างประเมินผลงานตีพิมพ์ โครงการวิจัย ประสบการณ์ห้องปฏิบัติการ และความสามารถในการวิเคราะห์และสื่อสารข้อมูลที่ซับซ้อน`,

    Manufacturing: `ในอุตสาหกรรมการผลิต ความเข้าใจทางเทคนิค การควบคุมคุณภาพ และความรู้เรื่องกระบวนการคือสิ่งจำเป็น เรซูเม่${jobTitle}ที่น่าสนใจเน้นประสบการณ์ด้านการผลิต การประกันคุณภาพ และวิธีการจัดการแบบ Lean`,

    'Social Services': `ในสายสังคมสงเคราะห์ เรซูเม่${jobTitle}เป็นหลักฐานของความเห็นอกเห็นใจ ความเชี่ยวชาญ และความมุ่งมั่นในการช่วยเหลือสังคม นายจ้างประเมินประสบการณ์ในการดูแลผู้รับบริการ ความรู้ด้านระบบสวัสดิการ และความสามารถในการช่วยเหลือผู้คนในสถานการณ์ยากลำบาก`,

    Fitness: `ในสายฟิตเนส เรซูเม่${jobTitle}ผสมผสานความเชี่ยวชาญด้านกีฬากับทักษะการสอน แสดงใบรับรอง ผลลัพธ์ที่ลูกค้าได้รับ และความสามารถในการออกแบบโปรแกรมฟิตเนสและสุขภาพเฉพาะบุคคล`,

    Cleaning: `ในสายทำความสะอาด ความน่าเชื่อถือ ความละเอียดรอบคอบ และประสิทธิภาพคือข้อได้เปรียบหลัก เรซูเม่${jobTitle}ควรแสดงประสบการณ์กับวิธีทำความสะอาดต่างๆ ความรู้มาตรฐานสุขอนามัย และความสามารถในการทำงานด้วยตัวเองอย่างตรงเวลา`,

    'Animal Care': `ในสายดูแลสัตว์ เรซูเม่${jobTitle}ผสมผสานความรู้เฉพาะทางกับความรักสัตว์อย่างแท้จริง แสดงประสบการณ์การดูแลสัตว์ การฝึกอบรมที่เกี่ยวข้อง และความสามารถในการจัดการกับสัตว์หลากหลายชนิดอย่างรับผิดชอบ`,

    Transportation: `ในสายขนส่ง ความปลอดภัย ความน่าเชื่อถือ และคุณสมบัติที่ถูกต้องคือสิ่งสำคัญ เรซูเม่${jobTitle}ควรระบุใบอนุญาตขับขี่ ประวัติการขับที่ปลอดภัย และประสบการณ์กับยานพาหนะประเภทต่างๆ อย่างชัดเจน`,

    Events: `ในสายจัดงาน ทักษะการจัดการ ความคิดสร้างสรรค์ และความสามารถรับมือแรงกดดันคือสิ่งจำเป็น เรซูเม่${jobTitle}ควรเน้นงานที่จัดสำเร็จ การบริหารงบประมาณ และความสามารถในการส่งมอบผลงานที่ยอดเยี่ยมภายใต้เงื่อนไขเวลาจำกัด`,

    default: `เรซูเม่${jobTitle}ที่น่าสนใจคือก้าวแรกสู่งานในฝันของคุณ ในตลาดงานที่มีการแข่งขันสูงในปัจจุบัน เรซูเม่ที่ออกแบบอย่างมืออาชีพสามารถสร้างความแตกต่างได้อย่างชัดเจน เรียนรู้วิธีนำเสนอคุณสมบัติ ประสบการณ์ และทักษะของคุณอย่างมีประสิทธิภาพเพื่อสร้างความประทับใจแก่ผู้สรรหาบุคลากร`,
  };

  return intros[normalizedCategory] || intros.default;
}

/**
 * Generates full MDX body content in Thai.
 */
export function generateBody(jobTitle, category, keySkills, avgSalary, jobGrowth, slug) {
  const norm = normalizeCategory(category);
  const intro = getCategoryIntro(jobTitle, norm);
  const skills = keySkills.length > 0 ? keySkills : ['การสื่อสาร', 'การทำงานเป็นทีม', 'การแก้ปัญหา', 'การจัดการ', 'การบริหารเวลา', 'MS Office'];
  const skillGroup1 = skills.slice(0, 2);
  const skillGroup2 = skills.slice(2, 4);
  const skillGroup3 = skills.slice(4, 6);

  return `
## อะไรทำให้เรซูเม่${jobTitle}โดดเด่น

${intro}

เรซูเม่${jobTitle}ที่มืออาชีพแตกต่างจากเรซูเม่ทั่วไปตรงที่การนำเสนอทักษะเฉพาะอุตสาหกรรมอย่างตรงจุด ผู้สรรหาบุคลากรใช้เวลาเฉลี่ยเพียง 7 วินาทีในการดูเรซูเม่ครั้งแรก — ใช้เวลานี้ให้คุ้มค่าโดยแสดงคุณสมบัติสำคัญที่สุดให้เห็นชัดเจน

## ตัวอย่างสรุปประสบการณ์มืออาชีพ

### ระดับเริ่มต้นอาชีพ

> ${jobTitle}จบใหม่ที่มีการศึกษาที่ดีและประสบการณ์จากการฝึกงาน มีทักษะด้าน ${skills.slice(0, 3).join(', ')} และพร้อมเรียนรู้สิ่งใหม่อย่างรวดเร็ว กำลังมองหาตำแหน่งเริ่มต้นเพื่อพัฒนาทักษะในสภาพแวดล้อมมืออาชีพ

### ระดับกลาง

> ${jobTitle}ที่มีประสบการณ์มากกว่า 5 ปีและผลงานที่พิสูจน์ได้ใน ${skills.slice(0, 2).join(' และ ')} ในตำแหน่งปัจจุบันได้เพิ่มประสิทธิภาพการทำงาน 25% และมีความชำนาญใน ${skills.slice(2, 4).join(', ')} กำลังมองหาความท้าทายใหม่พร้อมโอกาสในการเติบโต

### ระดับอาวุโส

> ${jobTitle}อาวุโสที่มีประสบการณ์กว่า 10 ปีและความเชี่ยวชาญครอบคลุม ${skills.slice(0, 4).join(', ')} เคยบริหารทีมมากถึง 15 คน รับผิดชอบงบประมาณกว่า 5 ล้านบาท และนำโครงการเชิงกลยุทธ์ที่สร้างรายได้เพิ่มขึ้น 30% กำลังมองหาตำแหน่งผู้นำที่มีอำนาจตัดสินใจเชิงกลยุทธ์

## เงินเดือนและแนวโน้มตลาดงาน

เงินเดือนเฉลี่ยสำหรับ${jobTitle}อยู่ที่ประมาณ **${avgSalary}** ต่อปี โดยค่าตอบแทนจริงแตกต่างกันตามภูมิภาค ประสบการณ์ และขนาดองค์กร แนวโน้มตลาดงานแสดงการเติบโต **${jobGrowth}** ทำให้สายอาชีพนี้เป็นตัวเลือกที่น่าสนใจ

**แหล่งข้อมูล:**
- [U.S. Bureau of Labor Statistics (BLS)](https://www.bls.gov/ooh/) — สถิติตลาดแรงงานและข้อมูลเงินเดือน
- [Glassdoor](https://www.glassdoor.com/Salaries/) — รีวิวและเปรียบเทียบเงินเดือน
- [PayScale](https://www.payscale.com/research/US/) — วิเคราะห์ค่าตอบแทนตามระดับประสบการณ์

*หมายเหตุ: ค่าตอบแทนจริงอาจแตกต่างกันมากตามที่ตั้ง อุตสาหกรรม ขนาดองค์กร และคุณสมบัติส่วนบุคคล ข้อมูลเงินเดือนในประเทศไทยสามารถอ้างอิงจาก [JobThai](https://www.jobthai.com/th/salary) เพิ่มเติม*

## ทักษะสำคัญที่ควรระบุ

### ทักษะเฉพาะทาง
${skillGroup1.map(s => `- **${s}** — ความรู้และประสบการณ์จริงที่จำเป็นสำหรับการทำงานในตำแหน่ง${jobTitle}`).join('\n')}

### ทักษะด้านระเบียบวิธี
${skillGroup2.map(s => `- **${s}** — ทักษะด้านระเบียบวิธีที่ใช้ในตำแหน่ง${jobTitle}อยู่เป็นประจำ`).join('\n')}

### ทักษะข้ามสายงาน
${skillGroup3.map(s => `- **${s}** — ทักษะเสริมที่เพิ่มคุณค่าให้${jobTitle}และส่งเสริมการทำงานร่วมกับทีม`).join('\n')}

## ผลงานเชิงตัวเลขที่น่าสนใจ

ใช้ตัวเลขและผลลัพธ์ที่เป็นรูปธรรมเพื่อสนับสนุนผลงานในตำแหน่ง${jobTitle}:

- ปรับปรุงกระบวนการทำงานจนเพิ่มประสิทธิภาพ 20% และลดค่าใช้จ่ายประจำปี 500,000 บาท
- ประสานงานทีม 8 คนสำเร็จและเพิ่มอัตราสำเร็จโครงการ 35%
- แนะนำวิธีทำงานใหม่ที่ลดเวลาดำเนินการ 40% และเพิ่มความพึงพอใจลูกค้าถึง 95%
- ใช้ความเชี่ยวชาญด้าน ${skills[0]} ในการนำโครงการสำคัญที่สร้างผลลัพธ์ที่วัดผลได้ภายใน 6 เดือน
- พัฒนาและดำเนินโปรแกรมฝึกอบรมสำหรับพนักงานใหม่ 12 คน ลดเวลาปรับตัว 30%
- กำหนดมาตรฐานคุณภาพใหม่ที่ลดอัตราข้อผิดพลาด 45%

## เคล็ดลับรูปแบบและเทมเพลตเรซูเม่${jobTitle}

1. **รูปแบบเรียงตามเวลาย้อนกลับ** — เริ่มจากตำแหน่งล่าสุดและไล่ย้อนกลับ รูปแบบนี้ได้รับความนิยมจากผู้สรรหาบุคลากร 90% และเหมาะสมที่สุดกับระบบ ATS

2. **โครงสร้างชัดเจนพร้อมหัวข้อ** — ใช้หัวข้อที่อ่านง่าย เช่น "ประสบการณ์ทำงาน" "การศึกษา" "ทักษะ" และ "ใบรับรอง" การจัดโครงสร้างอย่างเป็นระบบช่วยให้สแกนได้รวดเร็ว

3. **ปรับให้ตรงกับประกาศรับสมัครงาน** — ปรับเรซูเม่${jobTitle}ให้ตรงกับแต่ละตำแหน่งที่สมัคร ใช้คำสำคัญจากรายละเอียดงานและเน้นทักษะที่ตรงกับความต้องการ

4. **เลย์เอาต์มืออาชีพ** — เลือกฟอนต์ที่อ่านง่าย (เช่น Sarabun, TH Sarabun New ขนาด 10-12pt สำหรับภาษาไทย) เว้นที่ว่างเพียงพอ และจัดรูปแบบให้สม่ำเสมอ หลีกเลี่ยงสีสันมากเกินไป

5. **ผลงานที่วัดได้แทนรายการหน้าที่** — อธิบายประสบการณ์ด้วยผลลัพธ์และตัวเลขที่ชัดเจน "เพิ่มยอดขาย 25%" ทรงพลังกว่า "รับผิดชอบงานขาย" อย่างมาก

## เคล็ดลับจากผู้จัดการฝ่ายบุคคล

> **สาเหตุอันดับหนึ่งที่ใบสมัคร${jobTitle}ถูกปฏิเสธ: ไม่ปรับเรซูเม่ให้ตรงกับตำแหน่งที่สมัคร** ผู้สมัครจำนวนมากใช้เรซูเม่แบบเดียวกันส่งทุกที่ — และถูกคัดออกทันที

ในฐานะผู้จัดการฝ่ายบุคคลที่ดูเรซูเม่${jobTitle}หลายสิบฉบับต่อวัน ผู้สมัครที่ได้รับเรียกสัมภาษณ์มีสิ่งหนึ่งที่เหมือนกัน: พวกเขาปรับเรซูเม่ให้ตรงกับตำแหน่งที่ประกาศรับ นั่นหมายถึงไม่ใช่แค่คำสำคัญที่ถูกต้อง แต่ยังรวมถึงผลงานและประสบการณ์ที่ตรงกับข้อกำหนดของตำแหน่ง

ลงทุนเวลา 15 นาทีเพื่อปรับเรซูเม่สำหรับแต่ละตำแหน่ง${jobTitle}ที่สมัคร — เป็นการลงทุนเวลาที่คุ้มค่าที่สุดในกระบวนการสมัครงาน

## คำถามสัมภาษณ์ที่พบบ่อยสำหรับ${jobTitle}

### ประสบการณ์อะไรที่ทำให้คุณเหมาะกับตำแหน่ง${jobTitle}นี้?

อธิบายโครงการและงานจากอาชีพที่ผ่านมาที่ตรงกับข้อกำหนดของตำแหน่ง ระบุผลลัพธ์ที่วัดได้และอธิบายว่าประสบการณ์ของคุณจะสร้างคุณค่าให้องค์กรได้อย่างไร

### คุณรับมือกับความท้าทายในงาน${jobTitle}อย่างไร?

ใช้วิธี STAR (Situation, Task, Action, Result) ในการเล่าประสบการณ์เฉพาะ แสดงให้เห็นว่าคุณวิเคราะห์ปัญหาอย่างเป็นระบบและมุ่งเน้นหาทางออก

### คุณเห็นตัวเองในตำแหน่ง${jobTitle}อย่างไรในอีก 3-5 ปี?

แสดงแรงจูงใจระยะยาวและความพร้อมที่จะเติบโตในสาย${jobTitle} เชื่อมโยงเป้าหมายอาชีพส่วนตัวกับโอกาสการเติบโตในองค์กร

### คุณมีความรู้ด้าน ${skills[0]} อย่างไร และนำไปใช้อย่างไร?

อธิบายประสบการณ์จริงกับ ${skills[0]} โดยยกตัวอย่างที่เป็นรูปธรรม อธิบายบริบทที่ใช้ทักษะนี้และผลลัพธ์ที่ได้

### คุณทำงานเป็นทีมอย่างไร และแก้ความขัดแย้งอย่างไร?

ยกตัวอย่างการทำงานร่วมกับทีมในฐานะ${jobTitle}ที่ประสบความสำเร็จ อธิบายวิธีที่คุณทำงานร่วมกับบุคลิกภาพที่หลากหลายและแก้ไขความขัดแย้งอย่างสร้างสรรค์

## ข้อผิดพลาดที่ควรหลีกเลี่ยง

1. **ใช้เรซูเม่แบบเดียวกันส่งทุกตำแหน่ง** — ห้ามใช้เรซูเม่เดียวกันสำหรับตำแหน่ง${jobTitle}ต่างกัน ทุกประกาศรับสมัครมีข้อกำหนดเฉพาะที่ต้องตอบสนองเป็นรายตำแหน่ง

2. **ระบุหน้าที่แทนผลงาน** — "รับผิดชอบ..." บอกอะไรน้อยมากเกี่ยวกับผลงานของคุณ ใช้ผลลัพธ์ที่วัดได้พร้อมตัวเลขและเปอร์เซ็นต์แทน

3. **ข้อมูลล้าสมัยหรือไม่เกี่ยวข้อง** — ตัดประสบการณ์ที่เก่ากว่า 10-15 ปีและไม่เกี่ยวข้องกับตำแหน่ง${jobTitle}ออก มุ่งเน้นประสบการณ์ที่ทันสมัยและตรงประเด็น

4. **ขาดคำสำคัญจากประกาศรับสมัคร** — ระบบ ATS กรองเรซูเม่ด้วยคำสำคัญเฉพาะ หากคุณไม่ใช้คำสำคัญจากประกาศรับสมัคร${jobTitle} เรซูเม่ของคุณอาจไม่ถึงมือผู้สรรหา

5. **เลย์เอาต์ไม่เป็นมืออาชีพหรือมีข้อผิดพลาด** — การพิมพ์ผิด รูปแบบไม่สม่ำเสมอ หรือดีไซน์รกเกินไปสร้างความประทับใจที่ไม่ดี — โดยเฉพาะในสาย${jobTitle}ที่ให้ความสำคัญกับความละเอียดรอบคอบ

## การปรับแต่งเรซูเม่สำหรับระบบ ATS ของ${jobTitle}

ระบบ Applicant Tracking System (ATS) จะสแกนเรซูเม่ของคุณเพื่อค้นหาคำสำคัญก่อนที่ผู้สรรหาจะได้เห็น วิธีปรับแต่งเรซูเม่${jobTitle}สำหรับ ATS:

- **ใช้คำที่ตรงกับประกาศรับสมัครงาน** — หากตำแหน่งต้องการ "${skills[0]}" ให้เขียน "${skills[0]}" ไม่ใช่คำพ้องความหมาย
- **ใช้หัวข้อมาตรฐาน** เช่น "ประสบการณ์ทำงาน" "การศึกษา" "ทักษะ" — หัวข้อแปลกอาจทำให้ระบบ ATS สับสน
- **หลีกเลี่ยงตาราง กล่องข้อความ และกราฟิก** — ระบบ ATS มักอ่านรูปแบบเหล่านี้ไม่ถูกต้อง
- **บันทึกเป็น PDF หรือ DOCX** — ทั้งสองรูปแบบรองรับโดยระบบ ATS สมัยใหม่
- **วางทักษะเฉพาะ${jobTitle}** (${skills.slice(0, 4).join(', ')}) ทั้งในส่วนทักษะและในบริบทของประสบการณ์ทำงาน
- **ใช้ทั้งตัวย่อและชื่อเต็ม** — เช่น "ATS (Applicant Tracking System)" เพื่อครอบคลุมทุกรูปแบบการค้นหา

## แหล่งข้อมูลเพิ่มเติม

ใช้แหล่งข้อมูลเพิ่มเติมเพื่อปรับปรุงการสมัครงาน${jobTitle}:

- [สร้างเรซูเม่ด้วย AI Resume Builder](/th/builder) — สร้างเรซูเม่${jobTitle}ในไม่กี่นาที
- [เทมเพลตที่เป็นมิตรกับ ATS](/th/ats-friendly-templates) — เทมเพลตมืออาชีพสำหรับความเข้ากันได้กับ ATS
- [ตัวอย่างเรซูเม่](/th/resume-examples) — ตัวอย่างเรซูเม่จากหลากหลายอุตสาหกรรม
- [ตรวจสอบเรซูเม่ด้วย AI ATS Checker](/th/tools/ats-checker) — ตรวจสอบความเข้ากันได้กับ ATS

---

สร้างเรซูเม่${jobTitle}มืออาชีพของคุณวันนี้ด้วย [เครื่องมือสร้างเรซูเม่ AI](/th/builder) และเริ่มต้นการสมัครงานอย่างมั่นใจ
`;
}
