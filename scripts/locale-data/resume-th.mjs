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
  'Thai Accountant': 'นักบัญชี',
  'Thai Administrative Staff': 'พนักงานธุรการ',
  'Thai Bank Employee': 'พนักงานธนาคาร',
  'Thai Civil Engineer': 'วิศวกรโยธา',
  'Thai Electrician': 'ช่างไฟฟ้า',
  'Thai Graphic Designer': 'นักออกแบบกราฟิก',
  'Thai HR Staff': 'พนักงานบุคคล',
  'Thai Logistics Staff': 'พนักงานขนส่ง',
  'Thai Manager': 'ผู้จัดการ',
  'Thai Marketing Professional': 'นักการตลาด',
  'Thai Receptionist': 'พนักงานต้อนรับ',
  'Thai Registered Nurse': 'พยาบาลวิชาชีพ',
  'Thai Sales Representative': 'พนักงานขาย',
  'Thai Software Engineer': 'วิศวกรซอฟต์แวร์',
  'Thai Teacher': 'ครู',
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
 * Returns 7 FAQ objects with Thai-market-specific question/answer pairs.
 */
export function generateFAQ(jobTitle) {
  return [
    {
      question: `เรซูเม่${jobTitle}ควรมีความยาวเท่าไหร่?`,
      answer: `เรซูเม่${jobTitle}ควรมีความยาว 1 หน้าสำหรับผู้จบใหม่และประสบการณ์น้อยกว่า 5 ปี หากเป็น${jobTitle}ระดับอาวุโสที่มีประสบการณ์มากกว่า 5 ปี สามารถใช้ 2 หน้าได้ ในตลาดงานไทย นายจ้างต้องการเห็นผลงานที่วัดผลได้มากกว่ารายละเอียดทุกตำแหน่ง ใช้ฟอนต์ Sarabun หรือ TH Sarabun New ขนาด 10-12pt เพื่อความเป็นมืออาชีพ`,
    },
    {
      question: `ควรใส่รูปถ่ายในเรซูเม่${jobTitle}หรือไม่?`,
      answer: `ในประเทศไทย การใส่รูปถ่ายในเรซูเม่เป็นเรื่องปกติและแนะนำ ต่างจากตลาดตะวันตก ใช้รูปถ่ายสุภาพขนาด 1-2 นิ้ว พื้นหลังสีขาวหรือฟ้าอ่อน สวมชุดสุภาพเหมาะสมกับตำแหน่ง${jobTitle} อย่างไรก็ตาม หากสมัครบริษัทข้ามชาติที่ใช้มาตรฐานสากล ควรตรวจสอบข้อกำหนดก่อน`,
    },
    {
      question: `เรซูเม่${jobTitle}ควรเขียนภาษาไทยหรือภาษาอังกฤษ?`,
      answer: `ขึ้นอยู่กับบริษัทที่สมัคร บริษัทไทยส่วนใหญ่ยอมรับเรซูเม่ภาษาไทย แต่บริษัทข้ามชาติ (MNC) และบริษัท BOI มักต้องการเรซูเม่ภาษาอังกฤษ สำหรับ${jobTitle}ที่ต้องใช้ภาษาอังกฤษในการทำงาน แนะนำให้เตรียมทั้ง 2 ภาษา เพราะจะเพิ่มโอกาสในการสมัครงานได้กว้างขึ้น`,
    },
    {
      question: `ควรใส่เงินเดือนที่คาดหวังในเรซูเม่${jobTitle}หรือไม่?`,
      answer: `ในประเทศไทย หลายบริษัทมีช่อง "เงินเดือนที่คาดหวัง" ในใบสมัคร ควรใส่เป็นช่วง (เช่น 30,000-40,000 บาท/เดือน) แทนตัวเลขเดียว ศึกษาข้อมูลเงินเดือนตลาดจาก JobThai หรือ JobsDB ก่อนระบุ หากไม่แน่ใจ สามารถเขียน "ตามโครงสร้างบริษัท" หรือ "สามารถเจรจาได้" แทน`,
    },
    {
      question: `ประกันสังคม สวัสดิการ ควรระบุในเรซูเม่${jobTitle}หรือไม่?`,
      answer: `ไม่จำเป็นต้องระบุสิทธิ์ประกันสังคม (Social Security) ในเรซูเม่ เพราะเป็นสิทธิ์ตามกฎหมายที่นายจ้างทุกแห่งต้องจ่ายสมทบ 5% อยู่แล้ว แต่หากคุณมีสิทธิ์พิเศษ เช่น ใบอนุญาตประกอบวิชาชีพ หรือสวัสดิการจากองค์กรวิชาชีพที่เกี่ยวข้องกับ${jobTitle} ควรระบุไว้เพื่อเพิ่มจุดแข็ง`,
    },
    {
      question: `เรซูเม่${jobTitle}ต่างจากใบสมัครงานอย่างไร?`,
      answer: `ในประเทศไทย "ใบสมัครงาน" (Application Form) คือแบบฟอร์มมาตรฐานของบริษัท ซึ่งมักใช้ในบริษัทไทยขนาดกลาง-ใหญ่ ขณะที่ "เรซูเม่" คือเอกสารที่คุณออกแบบเองเพื่อนำเสนอจุดแข็ง สำหรับ${jobTitle} ควรเตรียมทั้งสองอย่าง เรซูเม่ใช้สมัครผ่าน JobThai/JobsDB/LinkedIn ส่วนใบสมัครงานมักกรอกเมื่อได้รับเรียกสัมภาษณ์`,
    },
    {
      question: `ควรใส่ข้อมูลส่วนตัว (สัญชาติ ศาสนา สถานภาพสมรส) หรือไม่?`,
      answer: `ในตลาดงานไทย บางบริษัทยังคงถามข้อมูลเหล่านี้ในใบสมัครงาน แต่ในเรซูเม่${jobTitle}มืออาชีพ ไม่จำเป็นต้องระบุ ยกเว้นสัญชาติไทยซึ่งอาจช่วยยืนยัน work permit ไม่จำเป็น สิ่งที่ต้องระบุคือ: ชื่อ-นามสกุล เบอร์โทร อีเมล ที่อยู่ (จังหวัด) และ LinkedIn (ถ้ามี)`,
    },
  ];
}

// ─── THAI COMPANY EXAMPLES PER CATEGORY ──────────────────────────────────────

const CATEGORY_COMPANIES = {
  Technology: 'Agoda, LINE MAN Wongnai, True Digital, SCBX, AIS, Kasikorn Business Technology (KBTG)',
  Healthcare: 'Bumrungrad, BDMS, Samitivej, Bangkok Hospital, รพ.ศิริราช, รพ.จุฬาลงกรณ์',
  Finance: 'SCB, KBank, Bangkok Bank, Krungthai, Krungsri, Muang Thai Life, Kiatnakin Phatra',
  Education: 'จุฬาลงกรณ์มหาวิทยาลัย, มหิดล, ธรรมศาสตร์, NIST, Harrow, โรงเรียนสาธิต',
  'Food Service': 'Minor Food, The Pizza Company, MK Restaurant, S&P, Café Amazon, Bar B Q Plaza',
  Hospitality: 'Centara, Dusit Thani, Anantara, Banyan Tree, Mandarin Oriental Bangkok, Four Seasons',
  Trades: 'SCG, PTTGC, Thai Summit, Delta Electronics, Hana Microelectronics, Thai Union',
  Creative: 'Yell Advertising, CJ WORX, Ogilvy Thailand, Dentsu Thailand, BBDO Bangkok',
  Administrative: 'CP Group, PTT, Siam Cement, ThaiBev, Central Group, Charoen Pokphand',
  Sales: 'CP ALL (7-Eleven), The Mall Group, Central Retail, HomePro, Lotus\'s, Big C',
  Marketing: 'Lazada Thailand, Shopee Thailand, Grab Thailand, LINE Thailand, TikTok Thailand',
  HR: 'Adecco Thailand, ManpowerGroup Thailand, Robert Walters, Michael Page, Hays Thailand',
  'Customer Service': 'AIS, TRUE, DTAC (TRUE), SCB, KBank, Shopee Thailand',
  Retail: 'Central Retail, The Mall Group, CP ALL, HomePro, Siam Piwat, King Power',
  Logistics: 'Kerry Express, Flash Express, SCG Logistics, DHL Thailand, J&T Express',
  Government: 'หน่วยราชการ กระทรวง กรม อบจ./อบต.',
  Legal: 'Baker McKenzie Bangkok, Tilleke & Gibbins, Weerawong C&P, Chandler MHM',
  Engineering: 'SCG, IRPC, Banpu, Italian-Thai Development, Ch. Karnchang, PTT Engineering',
  Construction: 'Italian-Thai Development, Ch. Karnchang, Sino-Thai Engineering, Pruksa, Sansiri',
  Science: 'NSTDA, สวทช., PTT Research, SCG Chemicals, มหาวิทยาลัยมหิดล',
  Manufacturing: 'SCG, Thai Union, Charoen Pokphand Foods, Delta Electronics, Hana Microelectronics',
  default: 'องค์กรชั้นนำในประเทศไทย',
};

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
    Technology: `อุตสาหกรรมเทคโนโลยีในประเทศไทยเติบโตอย่างรวดเร็ว ขับเคลื่อนโดยบริษัทอย่าง Agoda, LINE MAN Wongnai, SCBX (SCB 10X) และ True Digital นโยบาย Thailand 4.0 และการส่งเสริมจาก BOI ทำให้ตลาดงาน IT ในกรุงเทพฯ และ EEC เติบโตต่อเนื่อง เรซูเม่${jobTitle}ต้องสะท้อนทักษะเทคนิคล่าสุดและความสามารถในการเรียนรู้เทคโนโลยีใหม่ได้อย่างรวดเร็ว`,

    Healthcare: `ประเทศไทยเป็นศูนย์กลางการท่องเที่ยวเชิงสุขภาพ (Medical Tourism Hub) ระดับโลก มีโรงพยาบาลชั้นนำอย่าง Bumrungrad, BDMS และ Samitivej ที่ให้บริการผู้ป่วยจากทั่วโลก เรซูเม่${jobTitle}ในสายสาธารณสุขต้องแสดงใบอนุญาตประกอบวิชาชีพจากสภาวิชาชีพที่เกี่ยวข้อง ประสบการณ์ทางคลินิก และการปฏิบัติตามมาตรฐาน HA/JCI`,

    Finance: `ภาคการเงินไทยอยู่ภายใต้กำกับดูแลของธนาคารแห่งประเทศไทย (BOT) และ ก.ล.ต. มีธนาคารพาณิชย์ชั้นนำอย่าง KBank, SCB, Bangkok Bank และ Krungthai พร้อมด้วย FinTech สตาร์ทอัพที่เติบโตเร็ว เรซูเม่${jobTitle}ในสายการเงินต้องแสดงทั้งคุณสมบัติทางวิชาชีพ ความรู้ด้านกฎระเบียบ และความสามารถในการวิเคราะห์ข้อมูลซับซ้อน`,

    Education: `ระบบการศึกษาไทยมีทั้งโรงเรียนรัฐ (สพฐ./OBEC) โรงเรียนเอกชน และโรงเรียนนานาชาติ (NIST, Harrow, ISB) เรซูเม่${jobTitle}ต้องแสดงใบอนุญาตประกอบวิชาชีพจากคุรุสภา (สำหรับข้าราชการครู) ทักษะการสอน และวิธีการศึกษาที่ทันสมัย สถาบันในไทยให้ความสำคัญกับทั้งวุฒิการศึกษาและประสบการณ์สอนจริง`,

    'Food Service': `อุตสาหกรรมอาหารเป็นหนึ่งในเสาหลักเศรษฐกิจไทย จากร้านอาหาร street food ระดับ Michelin Guide ถึงเครือข่ายขนาดใหญ่อย่าง Minor Food, MK Restaurant และ S&P เรซูเม่${jobTitle}ที่น่าสนใจต้องแสดงทักษะเฉพาะทาง มาตรฐาน HACCP/GMP และความสามารถรับมือกับปริมาณงานสูง`,

    Hospitality: `ประเทศไทยเป็นจุดหมายปลายทางด้านการท่องเที่ยวอันดับต้นๆ ของโลก มีโรงแรมระดับ 5 ดาวอย่าง Centara, Dusit Thani, Anantara และ Mandarin Oriental กว่า 40 ล้านนักท่องเที่ยวต่อปี (สถิติ TAT) ทำให้สายงานโรงแรมมีความต้องการบุคลากรคุณภาพสูง เรซูเม่${jobTitle}ต้องเน้นทักษะบริการ ภาษาต่างประเทศ และประสบการณ์ระดับสากล`,

    Trades: `อุตสาหกรรมการผลิตและช่างฝีมือในประเทศไทยขับเคลื่อนโดยบริษัทขนาดใหญ่อย่าง SCG, PTTGC, Thai Summit และโรงงานญี่ปุ่น/เกาหลีในนิคมอุตสาหกรรม EEC เรซูเม่${jobTitle}ต้องแสดงทักษะเฉพาะทาง ใบรับรองความปลอดภัย (จป./Safety Officer) และประสบการณ์ภาคปฏิบัติ นายจ้างให้ค่าความชำนาญจริงและการทำงานเป็นระบบ`,

    Creative: `อุตสาหกรรมสร้างสรรค์ในไทยเติบโตเร็ว จาก agency อย่าง Ogilvy, Dentsu Thailand, CJ WORX ถึง in-house ที่ Shopee, Lazada, LINE Thailand เรซูเม่${jobTitle}ต้องมาพร้อมพอร์ตโฟลิโอที่แสดงทักษะศิลปะ เครื่องมือที่ใช้ และความสามารถในการแปลงวิสัยทัศน์สร้างสรรค์ให้เป็นผลงานจริงที่ตอบโจทย์ธุรกิจ`,

    Administrative: `ผู้เชี่ยวชาญด้านธุรการคือกระดูกสันหลังขององค์กรไทย ตั้งแต่กลุ่ม CP, PTT, ThaiBev ถึง SME เรซูเม่${jobTitle}ที่แข็งแกร่งแสดงทักษะ MS Office, ระบบ ERP, การจัดการเอกสาร และความสามารถในการประสานงานหลายแผนก นายจ้างมองหาคนที่เชื่อถือได้และจัดการงานหลายอย่างพร้อมกัน`,

    Sales: `ในสายงานขายในไทย ผลลัพธ์คือสิ่งที่สำคัญที่สุด ไม่ว่าจะเป็น retail (CP ALL, Central), FMCG หรือ B2B เรซูเม่${jobTitle}ต้องแสดงยอดขายเป็นตัวเลข (บาท/%) ความสามารถในการบรรลุ KPI และทักษะการบริหารลูกค้า แสดงผลงานชัดเจน เช่น "ทำยอด 120% ของเป้าหมาย 5 ล้านบาท/ไตรมาส"`,

    HR: `สายงาน HR ในไทยต้องเข้าใจพ.ร.บ.คุ้มครองแรงงาน พ.ศ. 2541 (แก้ไขเพิ่มเติม) พ.ร.บ.ประกันสังคม และกฎหมายแรงงานที่เกี่ยวข้อง เรซูเม่${jobTitle}ต้องเน้นประสบการณ์ด้านสรรหา (recruitment), C&B, พัฒนาบุคลากร และการบริหารแรงงานสัมพันธ์ บริษัทไทยให้ค่าทักษะการสื่อสารและความเข้าใจวัฒนธรรมองค์กร`,

    'Customer Service': `สายบริการลูกค้าในไทยเติบโตเร็วทั้งในโทรคมนาคม (AIS, TRUE, DTAC), ธนาคาร และ e-commerce เรซูเม่${jobTitle}ต้องแสดงคะแนนความพึงพอใจลูกค้า (CSAT), เวลาตอบสนอง และจำนวนเรื่องที่แก้ไขได้ต่อวัน ทักษะภาษาอังกฤษเป็นข้อได้เปรียบสำคัญในบริษัทข้ามชาติ`,

    Retail: `อุตสาหกรรมค้าปลีกไทยแข่งขันดุเดือด จาก Central Retail, The Mall Group, CP ALL (7-Eleven) ถึง e-commerce อย่าง Lazada/Shopee เรซูเม่${jobTitle}ต้องแสดงยอดขาย ทักษะบริหารทีม และความเข้าใจพฤติกรรมผู้บริโภคไทย ผลลัพธ์ที่วัดได้เป็นตัวเลข (บาท/%) ทำให้โดดเด่น`,

    Logistics: `ประเทศไทยเป็นศูนย์กลางโลจิสติกส์ของอาเซียน มีบริษัทขนส่งอย่าง Kerry Express, Flash Express, SCG Logistics และ DHL Thailand เรซูเม่${jobTitle}ต้องแสดงประสบการณ์บริหารคลังสินค้า การจัดการขนส่ง และความชำนาญใน WMS/TMS ความรู้เรื่องพิธีการศุลกากรและ FTA เป็นจุดแข็ง`,

    Government: `การสมัครงานราชการไทย (สอบ ก.พ., สอบท้องถิ่น) มีข้อกำหนดเฉพาะ ต้องผ่านการสอบแข่งขัน มีวุฒิตรงตามคุณสมบัติ เรซูเม่${jobTitle}สำหรับราชการต้องเน้นวุฒิการศึกษา ประสบการณ์ราชการ ผลงานวิจัย/โครงการ และการอบรมที่เกี่ยวข้อง ข้าราชการสามัญมีระบบซี (C) หรือแท่งเงินเดือน`,

    Legal: `สายกฎหมายในไทยมีทั้งสำนักงานกฎหมายไทยและต่างชาติ (Baker McKenzie, Tilleke & Gibbins, Weerawong C&P) เรซูเม่${jobTitle}ต้องแสดงใบอนุญาตว่าความ (ทนายความ), ความรู้กฎหมายแพ่งและพาณิชย์, พ.ร.บ.ที่เกี่ยวข้อง และทักษะภาษาอังกฤษระดับดีมาก สำหรับ corporate law ต้องเข้าใจ BOI และกฎหมายต่างด้าว`,

    Engineering: `อุตสาหกรรมวิศวกรรมในไทยมีทั้งโครงสร้างพื้นฐานขนาดใหญ่ (รถไฟฟ้า BTS/MRT, EEC) และโรงงานอุตสาหกรรม เรซูเม่${jobTitle}ต้องแสดงใบอนุญาตประกอบวิชาชีพวิศวกรรม (กว.) จากสภาวิศวกร ทักษะทางเทคนิค และประสบการณ์บริหารโครงการ บริษัทอย่าง Italian-Thai Development, Ch. Karnchang และ SCG เป็นนายจ้างหลัก`,

    Marketing: `การตลาดในไทยเปลี่ยนเร็วมาก — LINE OA เป็นช่องทางหลัก, TikTok Shop โตระเบิด, Shopee/Lazada Ads เป็นสนามรบ performance marketing เรซูเม่${jobTitle}ต้องแสดงผลลัพธ์ที่ขับเคลื่อนด้วยข้อมูล: ROAS, CPA, engagement rate และ conversion เครื่องมือที่ต้องระบุ ได้แก่ Meta Ads, Google Ads, LINE Ads Platform`,

    Business: `ในสายธุรกิจไทย ทั้งกลุ่ม CP, ThaiBev, Central และ SME เรซูเม่${jobTitle}ต้องแสดงทักษะวิเคราะห์ วางแผนกลยุทธ์ และภาวะผู้นำ สนับสนุนผลงานด้วยตัวเลขธุรกิจชัดเจน (รายได้, ต้นทุน, margin) ความเข้าใจตลาดไทยและอาเซียนเป็นจุดแข็งสำคัญ`,

    Management: `ตำแหน่งบริหารในไทยต้องแสดงพัฒนาการอาชีพที่ชัดเจนจากระดับปฏิบัติการสู่ระดับจัดการ เรซูเม่${jobTitle}ต้องมีผลลัพธ์ด้านการบริหารที่วัดได้ (ขนาดทีม, งบประมาณ, KPI) และวิสัยทัศน์เชิงกลยุทธ์ บริษัทไทยให้ค่าทั้งความสามารถและความเป็นผู้นำแบบ "เข้าถึงได้" (approachable leadership)`,

    Construction: `อุตสาหกรรมก่อสร้างไทยเติบโตจากโครงการรถไฟฟ้า (BTS/MRT), EEC, และอสังหาริมทรัพย์ (Pruksa, Sansiri, AP Thailand) เรซูเม่${jobTitle}ต้องแสดงใบอนุญาตวิศวกร (กว.) หรือใบรับรองที่เกี่ยวข้อง ประสบการณ์โครงการ มูลค่าโครงการ (ล้านบาท) และมาตรฐานความปลอดภัย`,

    Security: `สายรักษาความปลอดภัยในไทยครอบคลุมทั้ง physical security (อาคาร/โรงงาน) และ cybersecurity (ธนาคาร/IT) เรซูเม่${jobTitle}ควรเน้นใบรับรองที่เกี่ยวข้อง (จป./CISSP/CEH) ประสบการณ์กับระบบ CCTV/Access Control และความสามารถรับมือสถานการณ์วิกฤต`,

    Science: `งานวิทยาศาสตร์และวิจัยในไทยมีทั้งที่ NSTDA (สวทช.), มหาวิทยาลัย และ R&D ของภาคเอกชน (SCG, PTT) เรซูเม่${jobTitle}ต้องแสดงผลงานตีพิมพ์ โครงการวิจัย ทุนวิจัย ประสบการณ์ห้องปฏิบัติการ และความสามารถในการวิเคราะห์และสื่อสารข้อมูลซับซ้อน`,

    Manufacturing: `ประเทศไทยเป็นฐานการผลิตสำคัญของอาเซียน มีโรงงานอิเล็กทรอนิกส์ (Delta, Hana) ยานยนต์ (Toyota, Honda) และอาหาร (Thai Union, CPF) เรซูเม่${jobTitle}ต้องเน้นประสบการณ์ด้านการผลิต ความรู้ QC/QA, ISO 9001 และวิธีการจัดการ Lean/Kaizen ในนิคมอุตสาหกรรม`,

    'Social Services': `สายสังคมสงเคราะห์ในไทยทำงานร่วมกับกระทรวง พม. มูลนิธิ และ NGO เรซูเม่${jobTitle}ต้องแสดงประสบการณ์ดูแลผู้รับบริการ ความรู้ด้านระบบสวัสดิการสังคม (บัตรคนจน, สวัสดิการแห่งรัฐ) และความสามารถช่วยเหลือผู้คนในสถานการณ์ยากลำบาก`,

    Fitness: `อุตสาหกรรมฟิตเนสในไทยเติบโตเร็ว ทั้ง Fitness First, Jetts, Virgin Active และสตูดิโอเฉพาะทาง เรซูเม่${jobTitle}ต้องแสดงใบรับรอง (ACE, NASM, NSCA) ผลลัพธ์ที่ลูกค้าได้รับ และความสามารถออกแบบโปรแกรมเฉพาะบุคคล ทักษะภาษาอังกฤษเป็นข้อได้เปรียบสำหรับลูกค้าต่างชาติ`,

    Cleaning: `ในสายทำความสะอาดและบริหารอาคาร ความน่าเชื่อถือ ความละเอียด และประสิทธิภาพคือข้อได้เปรียบหลัก เรซูเม่${jobTitle}ควรแสดงประสบการณ์กับมาตรฐานสุขอนามัย ความรู้เรื่องน้ำยาและอุปกรณ์ทำความสะอาด และความสามารถทำงานตามกำหนดเวลา`,

    'Animal Care': `ในสายดูแลสัตว์ในไทย ทั้งคลินิกสัตวแพทย์ สวนสัตว์ (เขาเขียว, ซาฟารีเวิลด์) และ pet care เรซูเม่${jobTitle}ต้องแสดงความรู้เฉพาะทาง ประสบการณ์ดูแลสัตว์ และการฝึกอบรมที่เกี่ยวข้อง สำหรับสัตวแพทย์ต้องมีใบอนุญาตจากสัตวแพทยสภา`,

    Transportation: `สายขนส่งในไทยครอบคลุมทั้งทางบก (ขนส่งสินค้า, แท็กซี่/Grab) ทางน้ำ และทางอากาศ (การบินไทย, Bangkok Airways) เรซูเม่${jobTitle}ต้องระบุใบอนุญาตขับขี่ที่เกี่ยวข้อง ประวัติขับปลอดภัย และประสบการณ์กับเส้นทาง/ยานพาหนะที่เกี่ยวข้อง`,

    Events: `อุตสาหกรรมจัดงานในไทยมีทั้ง MICE (ศูนย์สิริกิติ์, IMPACT) งานแต่ง คอนเสิร์ต และอีเวนต์แบรนด์ เรซูเม่${jobTitle}ต้องแสดงงานที่จัดสำเร็จ มูลค่างบประมาณ จำนวนผู้เข้าร่วม และความสามารถประสานงานหลายฝ่ายภายใต้ deadline ที่เข้มงวด`,

    default: `เรซูเม่${jobTitle}ที่น่าสนใจคือก้าวแรกสู่งานในฝันของคุณ ในตลาดงานประเทศไทยที่มีการแข่งขันสูง เรซูเม่ที่ออกแบบอย่างมืออาชีพสร้างความแตกต่างได้ชัดเจน โดยเฉพาะเมื่อสมัครผ่าน JobThai, JobsDB หรือ LinkedIn เรียนรู้วิธีนำเสนอคุณสมบัติและผลงานอย่างมีประสิทธิภาพ`,
  };

  return intros[normalizedCategory] || intros.default;
}

/**
 * Generates full MDX body content in Thai with Thai market-specific content.
 */
export function generateBody(jobTitle, category, keySkills, avgSalary, jobGrowth, slug) {
  const norm = normalizeCategory(category);
  const intro = getCategoryIntro(jobTitle, norm);
  const skills = keySkills.length > 0 ? keySkills : ['การสื่อสาร', 'การทำงานเป็นทีม', 'การแก้ปัญหา', 'การจัดการ', 'การบริหารเวลา', 'MS Office'];
  const topSkills = skills.slice(0, 3).join(', ') || 'ทักษะเฉพาะทาง';
  const midSkills = skills.slice(3, 6).join(', ') || 'ทักษะเสริม';
  const softSkills = skills.slice(6, 8).join(', ') || 'การทำงานเป็นทีม, การสื่อสาร';
  const companies = CATEGORY_COMPANIES[norm] || CATEGORY_COMPANIES.default;

  return `
## อะไรทำให้เรซูเม่${jobTitle}โดดเด่น

${intro}

เรซูเม่${jobTitle}ที่มืออาชีพแตกต่างจากเรซูเม่ทั่วไปตรงที่การนำเสนอทักษะเฉพาะอุตสาหกรรมอย่างตรงจุด ผู้สรรหาบุคลากรใช้เวลาเฉลี่ยเพียง 7 วินาทีในการดูเรซูเม่ครั้งแรก — ใช้เวลานี้ให้คุ้มค่าโดยแสดงคุณสมบัติสำคัญที่สุดให้เห็นชัดเจน ในตลาดงานประเทศไทยที่มีการแข่งขันสูง โดยเฉพาะในกรุงเทพฯ และเขตเศรษฐกิจพิเศษ (EEC) เรซูเม่ที่ออกแบบอย่างดีคือกุญแจสำคัญในการแข่งขัน

## ตัวอย่างสรุปประสบการณ์มืออาชีพ

### ระดับจบใหม่ / เริ่มต้นอาชีพ

${jobTitle}จบใหม่จากมหาวิทยาลัยชั้นนำของไทย มีทักษะด้าน ${topSkills} จากการฝึกงานและโปรเจกต์ในมหาวิทยาลัย มีความกระตือรือร้นในการเรียนรู้และพร้อมพัฒนาตัวเองในสภาพแวดล้อมมืออาชีพ กำลังมองหาตำแหน่งเริ่มต้นใน${companies.split(',')[0].trim()} หรือองค์กรที่เปิดโอกาสให้เติบโต

### ระดับกลาง (3-7 ปี)

${jobTitle}ที่มีประสบการณ์มากกว่า 5 ปีใน ${topSkills} ในตำแหน่งปัจจุบันได้เพิ่มประสิทธิภาพการทำงาน 25% และบริหารงบประมาณกว่า 2 ล้านบาท/ปี มีความชำนาญใน ${midSkills || 'ทักษะเฉพาะทาง'} กำลังมองหาโอกาสในการเติบโตสู่ระดับ Senior หรือ Lead ในบริษัทที่มีวัฒนธรรมองค์กรดี

### ระดับอาวุโส / ผู้บริหาร

${jobTitle}อาวุโสที่มีประสบการณ์กว่า 10 ปีในสายงาน ${topSkills} และ ${midSkills || 'การบริหารกลยุทธ์'} เคยบริหารทีม 15-20 คน รับผิดชอบงบประมาณกว่า 10 ล้านบาท/ปี และนำโครงการเชิงกลยุทธ์ที่สร้างรายได้เพิ่มขึ้น 30% ที่ ${companies.split(',').slice(0, 2).join(', ').trim()} กำลังมองหาตำแหน่งผู้นำที่มีอำนาจตัดสินใจเชิงกลยุทธ์

## เงินเดือนและแนวโน้มตลาดงาน

ตลาดงาน${jobTitle}ในประเทศไทยมีแนวโน้มการเติบโต **${jobGrowth}** สะท้อนความต้องการที่เพิ่มขึ้นในอุตสาหกรรม ข้อมูลเงินเดือนในประเทศไทยแตกต่างตามประสบการณ์ ที่ตั้ง และขนาดองค์กร:

| ระดับประสบการณ์ | เงินเดือน (บาท/เดือน) | หมายเหตุ |
|---|---|---|
| จบใหม่ (0-2 ปี) | 15,000 - 25,000 | ตามวุฒิ ป.ตรี; ป.โท +20-30% |
| กลาง (3-7 ปี) | 30,000 - 60,000 | ขึ้นกับอุตสาหกรรมและทักษะเฉพาะทาง |
| อาวุโส (8+ ปี) | 60,000 - 120,000+ | ผู้จัดการ/หัวหน้าทีมในบริษัทขนาดใหญ่ |
| บริษัทข้ามชาติ (MNC) | สูงกว่า 20-50% | บริษัท BOI, บริษัทต่างชาติ |

*กรุงเทพฯ มีเงินเดือนสูงกว่าต่างจังหวัดเฉลี่ย 20-30% โดยเฉพาะในเขตสาทร สีลม และย่านธุรกิจ ดูข้อมูลเงินเดือนสากลอ้างอิงจาก **${avgSalary}** ต่อปี (ตลาดสหรัฐฯ)*

องค์กรชั้นนำที่รับ${jobTitle}ในประเทศไทย ได้แก่ ${companies}

**แหล่งข้อมูลเงินเดือนในประเทศไทย:**
- [JobThai](https://www.jobthai.com/th/salary) — แพลตฟอร์มหางานอันดับ 1 ของไทย ข้อมูลเงินเดือนอัปเดตทุกไตรมาส
- [JobsDB Thailand](https://th.jobsdb.com/) — ข้อมูลเงินเดือนตามอุตสาหกรรมและตำแหน่ง เน้นระดับกลาง-สูง
- [JobBKK](https://www.jobbkk.com/) — ข้อมูลตลาดงานทั่วประเทศ ครอบคลุมทุกระดับ
- [Glassdoor](https://www.glassdoor.com/Salaries/) — เงินเดือนจากการรายงานของพนักงานจริง รวมถึงตลาดไทย

*หมายเหตุ: ค่าตอบแทนจริงแตกต่างกันมากตามที่ตั้ง อุตสาหกรรม ขนาดองค์กร และประเภทบริษัท (ไทย/ข้ามชาติ/สตาร์ทอัพ) สวัสดิการอื่นเช่น โบนัส ค่ารักษาพยาบาล ประกันสังคม (5% จากนายจ้าง) และค่าเดินทาง ควรพิจารณาร่วมกับเงินเดือนพื้นฐาน*

## ทักษะสำคัญที่ควรระบุ

### ทักษะเฉพาะทาง
${skills.slice(0, 3).map(s => `- **${s}** — ทักษะหลักที่นายจ้างและระบบ ATS ค้นหาสำหรับตำแหน่ง${jobTitle}ในประเทศไทย`).join('\n') || '- ทักษะเฉพาะทางที่เกี่ยวข้องกับตำแหน่ง\n- ความรู้ด้านเครื่องมือและซอฟต์แวร์เฉพาะสาย\n- ใบรับรอง/วุฒิบัตรที่เกี่ยวข้อง'}

### ทักษะองค์กรและระเบียบวิธี
${skills.slice(3, 6).map(s => `- **${s}** — ทักษะที่ใช้ประจำในงาน${jobTitle} แสดงถึงความเชี่ยวชาญเฉพาะด้าน`).join('\n') || '- การจัดการโครงการและวางแผนงาน\n- การวิเคราะห์และแก้ปัญหา\n- ความละเอียดรอบคอบในการทำงาน'}

### ทักษะด้านการสื่อสารและทีม
${skills.slice(6, 8).map(s => `- **${s}** — ทักษะเสริมที่เพิ่มคุณค่าให้${jobTitle}ในองค์กรไทย`).join('\n') || '- การสื่อสารทั้งภาษาไทยและอังกฤษ\n- การทำงานเป็นทีมและการประสานงาน'}
- ทักษะภาษาอังกฤษ (TOEIC/IELTS) — หลายบริษัทในไทยต้องการคะแนนภาษาอังกฤษ โดยเฉพาะ MNC
- ความสามารถในการปรับตัวและทำงานภายใต้แรงกดดัน

## ผลงานเชิงตัวเลขที่น่าสนใจ

ใช้ตัวเลขและผลลัพธ์เป็นบาท/เปอร์เซ็นต์เพื่อสนับสนุนผลงานในตำแหน่ง${jobTitle}:

- เพิ่มประสิทธิภาพกระบวนการทำงาน 25% ส่งผลให้ลดค่าใช้จ่ายประจำปี 800,000 บาท ที่ ${companies.split(',')[0].trim()}
- บริหารโครงการมูลค่า 5 ล้านบาท เสร็จก่อนกำหนด 2 สัปดาห์ ภายในงบประมาณ 98%
- ประสานงานทีม 10 คน ข้ามแผนก 3 ฝ่าย เพิ่มอัตราสำเร็จโครงการจาก 75% เป็น 95%
- ใช้ความเชี่ยวชาญด้าน ${skills[0]} นำโครงการที่สร้างรายได้เพิ่ม 3.2 ล้านบาท/ปี ภายใน 6 เดือน
- พัฒนาโปรแกรมฝึกอบรมพนักงานใหม่ 15 คน ลดระยะเวลา onboarding จาก 3 เดือนเหลือ 6 สัปดาห์
- ได้รับรางวัล "พนักงานดีเด่นประจำปี" จากผลงานยอดขายสูงสุด ทำยอดได้ 120% ของเป้าหมาย

## เคล็ดลับรูปแบบและเทมเพลตเรซูเม่${jobTitle}

1. **รูปแบบเรียงตามเวลาย้อนกลับ** — เริ่มจากตำแหน่งล่าสุดและไล่ย้อนกลับ รูปแบบนี้ได้รับความนิยม 90% จากผู้สรรหาในไทย และเป็นรูปแบบที่ระบบ ATS อ่านได้ดีที่สุด

2. **ใส่รูปถ่ายมืออาชีพ** — ในประเทศไทย การใส่รูปถ่ายในเรซูเม่เป็นมาตรฐาน ใช้รูปสุภาพ พื้นหลังสีขาวหรือฟ้าอ่อน สวมชุดเหมาะสมกับสายงาน${jobTitle} หลีกเลี่ยงรูปเซลฟี่หรือรูปท่องเที่ยว

3. **ฟอนต์ภาษาไทยมืออาชีพ** — ใช้ Sarabun, TH Sarabun New หรือ Angsana New ขนาด 10-12pt ฟอนต์เหล่านี้อ่านง่ายทั้งบนจอและพิมพ์ หลีกเลี่ยงฟอนต์แฟนซีที่ ATS อาจอ่านไม่ได้

4. **ลำดับหัวข้อตามมาตรฐานไทย** — ข้อมูลส่วนตัว → สรุปประสบการณ์ → ประสบการณ์ทำงาน → การศึกษา → ทักษะ → ใบรับรอง/อบรม → ภาษา หลายบริษัทไทยยังให้ความสำคัญกับวุฒิการศึกษาและสถาบันที่จบ

5. **ผลงานที่วัดได้เป็นบาท/เปอร์เซ็นต์** — "เพิ่มยอดขาย 2.5 ล้านบาท/ไตรมาส" ทรงพลังกว่า "รับผิดชอบงานขาย" อย่างมาก นายจ้างไทยให้ค่าผลลัพธ์ที่เป็นตัวเลข

6. **เตรียม CV สองภาษา** — หากสมัครบริษัทข้ามชาติหรือ BOI เตรียมเรซูเม่ทั้งภาษาไทยและอังกฤษ ระบุคะแนน TOEIC/IELTS/TOEFL ด้วย เพราะบริษัทต่างชาติในไทยมักใช้เป็นเกณฑ์คัดเลือก

## เคล็ดลับจากผู้จัดการฝ่ายบุคคลในประเทศไทย

> **สิ่งที่ทำให้ใบสมัคร${jobTitle}ถูกคัดออกทันที: เรซูเม่ที่เขียนหน้าที่งาน (job description) แทนผลงาน (achievements)** ผู้สมัครส่วนใหญ่คัดลอกรายละเอียดงานมาใส่ — แต่ผู้สรรหาต้องการเห็นว่าคุณทำอะไรได้จริง

ในฐานะผู้จัดการฝ่ายทรัพยากรบุคคลที่ ${companies.split(',')[0].trim()} ที่ดูเรซูเม่${jobTitle}หลายสิบฉบับต่อวัน สิ่งที่ทำให้ผู้สมัครโดดเด่นคือ: ผลงานที่วัดได้เป็นตัวเลข (บาท/เปอร์เซ็นต์), ความเข้ากันได้กับวัฒนธรรมองค์กร, และศักยภาพในการเติบโตระยะยาว นายจ้างไทยให้ความสำคัญกับความจงรักภักดีต่อองค์กร — หากเปลี่ยนงานบ่อย (3+ ที่ภายใน 2 ปี) ต้องอธิบายเหตุผลอย่างชัดเจน

ลงทุนเวลา 15-20 นาทีปรับเรซูเม่สำหรับแต่ละตำแหน่ง${jobTitle}ที่สมัคร — ใช้คำสำคัญจากประกาศรับสมัคร และเน้นประสบการณ์ที่ตรงกับข้อกำหนด

## คำถามสัมภาษณ์ที่พบบ่อยสำหรับ${jobTitle}ในประเทศไทย

### ช่วยแนะนำตัวเอง ทำไมสนใจตำแหน่ง${jobTitle}นี้?

คำถามเปิดมาตรฐานในทุกการสัมภาษณ์งานในไทย เตรียมตอบภายใน 2-3 นาที: พื้นหลังการศึกษา ประสบการณ์ที่เกี่ยวข้อง ผลงานเด่น 1-2 อย่าง และเหตุผลที่สนใจบริษัท อย่าอ่านจากเรซูเม่ — เล่าเรื่องราวอาชีพให้น่าสนใจ

### เงินเดือนที่คาดหวังเท่าไหร่?

นายจ้างไทยมักถามเรื่องเงินเดือนตั้งแต่รอบแรก ศึกษาข้อมูลเงินเดือน${jobTitle}จาก JobThai หรือ JobsDB ก่อนสัมภาษณ์ ตอบเป็นช่วง (เช่น 35,000-45,000 บาท/เดือน) แทนตัวเลขตายตัว และเสริมว่าพร้อมพิจารณาตามแพ็คเกจสวัสดิการรวม (โบนัส, ประกันสุขภาพ, ค่าเดินทาง)

### รับมือกับความกดดันและ deadline ในงาน${jobTitle}อย่างไร?

ยกตัวอย่างสถานการณ์จริง ใช้โครงสร้าง STAR: สถานการณ์ → หน้าที่ → การกระทำ → ผลลัพธ์ แสดงให้เห็นว่าคุณจัดลำดับความสำคัญ ประสานงานกับทีม และรายงานความคืบหน้าอย่างสม่ำเสมอ วัฒนธรรมการทำงานในไทยให้ค่าการสื่อสารและการทำงานเป็นทีม

### ทำไมลาออกจากบริษัทเดิม?

คำถามที่ต้องระวังมาก — ตลาดงานไทยค่อนข้างเล็ก ข่าวกระจายเร็ว ตอบเชิงบวกเสมอ: ต้องการเติบโต เรียนรู้สิ่งใหม่ หรือหาความท้าทาย ห้ามพูดร้ายเจ้านายหรือบริษัทเดิมเด็ดขาด แม้ว่าจะมีประสบการณ์ไม่ดีก็ตาม

### มีคำถามอะไรจะถามเราบ้าง?

เตรียม 2-3 คำถามที่แสดงความสนใจจริง: ถามเรื่องโครงสร้างทีม${jobTitle} ลักษณะงานวันต่อวัน เส้นทางการเติบโต หรือวัฒนธรรมองค์กร ในประเทศไทย คำถามเกี่ยวกับโอกาสฝึกอบรมและพัฒนาตัวเองถือเป็นสัญญาณบวก เพราะแสดงว่าคุณมองระยะยาว

## ข้อผิดพลาดที่ควรหลีกเลี่ยงเมื่อเขียนเรซูเม่ในประเทศไทย

### 1. ส่งเรซูเม่เดียวกันทุกที่ ไม่ปรับตามตำแหน่ง

ทุกบริษัทมีวัฒนธรรมและข้อกำหนดต่างกัน เรซูเม่สมัครตำแหน่ง${jobTitle}ที่ ${companies.split(',')[0].trim()} ต้องเน้นจุดต่างจากบริษัทอื่น ปรับสรุปประสบการณ์และคำสำคัญให้ตรงกับแต่ละประกาศรับสมัคร

### 2. เขียนหน้าที่งาน (responsibilities) แทนผลงาน (achievements)

"รับผิดชอบงานขาย" ไม่บอกอะไร → เปลี่ยนเป็น "บริหารลูกค้า 50 ราย ทำยอดขาย 8.5 ล้านบาท/ไตรมาส คิดเป็น 125% ของเป้าหมาย" นายจ้างไทยให้ค่าตัวเลขและผลลัพธ์ที่พิสูจน์ได้

### 3. ไม่เพิ่มประสิทธิภาพสำหรับระบบ ATS

บริษัทใหญ่ในไทยเช่น ${companies.split(',').slice(0, 2).join(', ').trim()} ใช้ระบบ ATS กรอง CV แล้ว หลีกเลี่ยงตาราง กล่องข้อความ header/footer และกราฟิกที่ ATS อ่านไม่ได้ ใช้คำสำคัญจากประกาศรับสมัครตรงๆ

### 4. เปลี่ยนงานบ่อยไม่มีคำอธิบาย

นายจ้างไทยให้ความสำคัญกับความจงรักภักดี หากเปลี่ยน 3-4 ที่ภายในเวลาสั้น ให้อธิบายเหตุผลสั้นๆ (บริษัทปิดตัว ย้ายสำนักงาน โอกาสที่ดีกว่า) เรซูเม่ที่ไม่อธิบายมีโอกาสถูกคัดออกสูง

### 5. ไม่ระบุวุฒิการศึกษาและใบรับรองอย่างชัดเจน

ตลาดงานไทยให้ค่าวุฒิการศึกษาสูง สำหรับ${jobTitle} ระบุชื่อมหาวิทยาลัย คณะ ปีที่จบ เกียรตินิยม (ถ้ามี) และใบรับรองวิชาชีพ คะแนนภาษาอังกฤษ (TOEIC 700+, IELTS 6.0+) เป็นจุดแข็งสำคัญสำหรับบริษัทข้ามชาติ

## การปรับแต่งเรซูเม่${jobTitle}สำหรับระบบ ATS

ระบบ Applicant Tracking System (ATS) ใช้แพร่หลายในบริษัทขนาดใหญ่และบริษัทข้ามชาติในประเทศไทย ATS จะสแกนเรซูเม่เพื่อค้นหาคำสำคัญก่อนที่ผู้สรรหาจะเห็น วิธีเพิ่มโอกาสผ่านระบบ:

- **ใช้คำที่ตรงกับประกาศรับสมัคร** — หากตำแหน่ง${jobTitle}บน JobThai ระบุ "${skills[0]}" ให้เขียนตรงๆ ไม่ใช่คำพ้องความหมาย
- **ใช้หัวข้อมาตรฐาน** เช่น "ประสบการณ์ทำงาน" "การศึกษา" "ทักษะ" — หัวข้อแปลกอาจทำให้ ATS สับสน
- **เขียนทั้งภาษาไทยและอังกฤษ** — เช่น "การจัดการโครงการ (Project Management)" เพื่อครอบคลุมทั้ง 2 ภาษาที่ ATS อาจค้นหา
- **วางทักษะ${jobTitle}ไว้หลายส่วน** — ระบุ ${topSkills} ทั้งในสรุปประสบการณ์ ประสบการณ์ทำงาน และส่วนทักษะ
- **หลีกเลี่ยงตาราง กล่องข้อความ กราฟิก** — ATS มักอ่านเนื้อหาในรูปแบบเหล่านี้ไม่ถูกต้อง
- **บันทึกเป็น PDF** — แพลตฟอร์มหางานไทย (JobThai, JobsDB, LinkedIn) รองรับ PDF ดีที่สุด

## แพลตฟอร์มหางานชั้นนำในประเทศไทย

เพิ่มโอกาสการมองเห็นเรซูเม่${jobTitle}ด้วยการลงทะเบียนหลายแพลตฟอร์ม:

- [JobThai](https://www.jobthai.com/) — แพลตฟอร์มหางานอันดับ 1 ของไทย มีตำแหน่งงานกว่า 100,000 ตำแหน่ง ครอบคลุมทุกอุตสาหกรรม
- [JobsDB Thailand](https://th.jobsdb.com/) — เน้นตำแหน่งระดับกลาง-สูง เป็นที่นิยมในบริษัทข้ามชาติ
- [JobBKK](https://www.jobbkk.com/) — ครอบคลุมทั่วประเทศ ทุกระดับ มีข้อมูลตลาดงานต่างจังหวัดที่ดี
- [LinkedIn Thailand](https://www.linkedin.com/) — จำเป็นสำหรับตำแหน่ง MNC และระดับผู้บริหาร
- [Indeed Thailand](https://th.indeed.com/) — รวบรวมตำแหน่งงานจากหลายแหล่ง เหมาะสำหรับค้นหาแบบกว้าง

## แหล่งข้อมูลเพิ่มเติม

ใช้เครื่องมือเหล่านี้เพื่อเพิ่มประสิทธิภาพการสมัครงาน${jobTitle}:

- [สร้างเรซูเม่ด้วย AI Resume Builder](/th/builder) — สร้างเรซูเม่${jobTitle}มืออาชีพในไม่กี่นาที
- [เทมเพลตที่เป็นมิตรกับ ATS](/th/templates) — เทมเพลตมืออาชีพที่ผ่านการทดสอบ ATS
- [ตัวอย่างเรซูเม่](/th/resume-examples) — ตัวอย่างเรซูเม่จากหลากหลายอุตสาหกรรม
- [ตรวจสอบเรซูเม่ด้วย AI ATS Checker](/th/tools/ats-checker) — ตรวจสอบว่าเรซูเม่คุณผ่าน ATS หรือไม่

---

สร้างเรซูเม่${jobTitle}มืออาชีพของคุณวันนี้ด้วย [เครื่องมือสร้างเรซูเม่ AI ฟรี](/th/builder) และเริ่มต้นสมัครงานกับ ${companies.split(',')[0].trim()} และองค์กรชั้นนำในประเทศไทยอย่างมั่นใจ
`;
}
