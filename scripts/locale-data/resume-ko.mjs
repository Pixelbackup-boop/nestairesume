/**
 * Korean (ko) locale data for resume example generation.
 * Imported by generate-locale-resume-examples.mjs via:
 *   await import('./locale-data/resume-ko.mjs')
 *
 * Keyword source: seo/korean-top-100-keywords.csv
 * Top terms: 커버 레터 (5K), 이력서 템플릿 (5K), 이력서 쓰는 법 (5K),
 *            이력서 작성 (500), 이력서 샘플 (500), AI 이력서 (500),
 *            영문 이력서 (500), 경력 기술서 (500)
 */

const LANG = 'ko';

// ─── CONFIG ─────────────────────────────────────────────────────────────────

export const CONFIG = {
  author: '김서연',
  authorBio: '경력 개발 및 이력서 작성 전문 컨설턴트로 10년 이상의 경험을 보유. 한국 취업 시장에 정통하며 수천 명의 구직자가 서류 전형을 통과할 수 있도록 지원.',
  titlePattern: (job) => `${job} 이력서 샘플 | 작성 가이드 2026`,
  descriptionPattern: (job) => `${job} 이력서 샘플과 템플릿. ATS 최적화 이력서 쓰는 법과 예시로 2026년 취업을 성공시키세요. 무료 이력서 작성 도구 제공.`,
  imageAltPattern: (job) => `${job} 이력서 샘플`,
};

// ─── JOB TITLES (English → Korean) ──────────────────────────────────────────
// Uses Korean terms people actually search for — loanwords where natural,
// native Korean terms where that is the standard usage.

export const JOB_TITLES = {
  '3D Artist': '3D 아티스트',
  'AI Engineer': 'AI 엔지니어',
  'AWS Cloud Engineer': 'AWS 클라우드 엔지니어',
  'AWS Solution Architect': 'AWS 솔루션 아키텍트',
  'Academic Advisor': '학사 상담사',
  'Account Executive': '어카운트 이그제큐티브',
  'Account Manager': '어카운트 매니저',
  'Accountant': '회계사',
  'Accounting Assistant': '회계 보조',
  'Accounting Clerk': '회계 사무원',
  'Accounting Intern': '회계 인턴',
  'Accounting Manager': '회계 매니저',
  'Accounts Payable Specialist': '매입채무 담당자',
  'Accounts Receivable Specialist': '매출채권 담당자',
  'Acupuncturist': '한의사',
  'Administrative Assistant': '행정 보조',
  'Administrative Coordinator': '행정 코디네이터',
  'Admissions Counselor': '입학 상담사',
  'Advertising Manager': '광고 매니저',
  'Aerospace Engineer': '항공우주 엔지니어',
  'Agricultural Engineer': '농업 엔지니어',
  'Air Traffic Controller': '항공 교통 관제사',
  'Aircraft Mechanic': '항공기 정비사',
  'Android Developer': '안드로이드 개발자',
  'Anesthesiologist': '마취과 전문의',
  'Animal Caretaker': '동물 사육사',
  'Animal Control Officer': '동물 관리 담당관',
  'Animal Shelter Worker': '동물 보호소 직원',
  'Animator': '애니메이터',
  'Appliance Repair Technician': '가전제품 수리 기사',
  'Application Support Engineer': '애플리케이션 지원 엔지니어',
  'Appraiser': '감정평가사',
  'Apprentice Electrician': '전기 기사 수습',
  'Aquarium Keeper': '수족관 사육사',
  'Arbitrator': '중재인',
  'Arborist': '수목 관리사',
  'Architect': '건축사',
  'Architectural Drafter': '건축 설계사',
  'Art Director': '아트 디렉터',
  'Art Teacher': '미술 교사',
  'Assembler': '조립공',
  'Assistant Director': '부국장',
  'Assistant Manager': '부매니저',
  'Assistant Principal': '교감',
  'Assistant Property Manager': '부동산 관리 보조',
  'Assistant Store Manager': '부점장',
  'Athletic Trainer': '운동 트레이너',
  'Audio Engineer': '음향 엔지니어',
  'Audit Manager': '감사 매니저',
  'Auditor': '감사인',
  'Auto Body Technician': '자동차 판금 기사',
  'Auto Mechanic': '자동차 정비사',
  'Automation Engineer': '자동화 엔지니어',
  'Automotive Engineer': '자동차 엔지니어',
  'Automotive Technician': '자동차 기술자',
  'Aviation Maintenance Technician': '항공 정비 기술자',
  'Back-End Developer': '백엔드 개발자',
  'Backend Developer': '백엔드 개발자',
  'Baker': '제빵사',
  'Bank Manager': '은행 지점장',
  'Bank Teller': '은행 창구 직원',
  'Banker': '은행원',
  'Banquet Chef': '연회 셰프',
  'Barber': '이발사',
  'Barista': '바리스타',
  'Bartender': '바텐더',
  'Beauty Advisor': '뷰티 어드바이저',
  'Behavioral Therapist': '행동 치료사',
  'Bellhop': '벨보이',
  'Bicycle Mechanic': '자전거 수리 기사',
  'Billing Specialist': '청구 전문가',
  'Biomedical Engineer': '생체의공학 엔지니어',
  'Blockchain Developer': '블록체인 개발자',
  'Bookkeeper': '경리 담당자',
  'Branch Manager': '지점장',
  'Brand Designer': '브랜드 디자이너',
  'Brand Manager': '브랜드 매니저',
  'Budget Analyst': '예산 분석가',
  'Building Engineer': '건축 엔지니어',
  'Building Inspector': '건축 검사관',
  'Building Maintenance Technician': '빌딩 관리 기술자',
  'Bus Driver': '버스 기사',
  'Business Administration Professional': '경영관리 전문가',
  'Business Analyst': '비즈니스 분석가',
  'Business Consultant': '경영 컨설턴트',
  'Business Development Associate': '사업 개발 담당자',
  'Business Development Executive': '사업 개발 임원',
  'Business Development Manager': '사업 개발 매니저',
  'Business Intelligence Analyst': 'BI 분석가',
  'Business Intelligence Specialist': 'BI 전문가',
  'Business Manager': '비즈니스 매니저',
  'Business Owner': '사업주',
  'Busser': '버서',
  'Butcher': '정육사',
  'Buyer': '구매 담당자',
  'CAD Designer': 'CAD 설계사',
  'CNA (Certified Nursing Assistant)': '간호 조무사',
  'CNC Machinist': 'CNC 기계공',
  'CNC Operator': 'CNC 오퍼레이터',
  'COO (Chief Operating Officer)': 'COO (최고운영책임자)',
  'Cabin Crew': '객실 승무원',
  'Cabinet Maker': '가구 제작자',
  'Cable Technician': '케이블 기사',
  'Cafeteria Worker': '구내식당 직원',
  'Call Center Agent': '콜센터 상담원',
  'Call Center Manager': '콜센터 매니저',
  'Call Center Representative': '콜센터 대표 상담원',
  'Camp Counselor': '캠프 상담사',
  'Car Detailer': '자동차 디테일링 기사',
  'Car Sales Associate': '자동차 영업 사원',
  'Car Salesperson': '자동차 판매원',
  'Cardiac Sonographer': '심장 초음파 기사',
  'Cardiovascular Technologist': '심혈관 기술자',
  'Caregiver': '간병인',
  'Carpenter': '목수',
  'Carpet Cleaner': '카펫 청소 기사',
  'Case Manager': '사례 관리자',
  'Cashier': '캐셔',
  'Casino Dealer': '카지노 딜러',
  'Caterer': '케이터링 업자',
  'Catering Manager': '케이터링 매니저',
  'Cement Mason': '시멘트 미장공',
  'Certified Nursing Assistant': '간호 조무사',
  'Certified Nursing Assistant (CNA)': '간호 조무사 (CNA)',
  'Change Management Specialist': '변화 관리 전문가',
  'Chef': '셰프',
  'Chemical Engineer': '화학 엔지니어',
  'Chemist': '화학자',
  'Chief Information Officer (CIO)': 'CIO (최고정보책임자)',
  'Chief of Staff': '비서실장',
  'Chiropractor': '카이로프랙터',
  'City Planner': '도시 계획가',
  'Civil Engineer': '토목 엔지니어',
  'Claims Adjuster': '보험 손해사정사',
  'Claims Analyst': '보상 분석가',
  'Cleaner': '청소원',
  'Client Relations Manager': '고객 관계 매니저',
  'Clinical Research Associate': '임상 연구원',
  'Clinical Research Coordinator': '임상 연구 코디네이터',
  'Cloud Architect': '클라우드 아키텍트',
  'Cloud Engineer': '클라우드 엔지니어',
  'Coach': '코치',
  'Code Enforcement Officer': '건축법 시행 담당관',
  'Collections Specialist': '채권 추심 전문가',
  'College Admissions Counselor': '대학 입학 상담사',
  'College Professor': '대학 교수',
  'Commercial Cleaner': '빌딩 청소업자',
  'Commercial Real Estate Broker': '상업용 부동산 중개사',
  'Communications Director': '커뮤니케이션 디렉터',
  'Communications Manager': '커뮤니케이션 매니저',
  'Community Health Worker': '지역사회 보건 종사자',
  'Community Manager': '커뮤니티 매니저',
  'Community Outreach Coordinator': '지역사회 연계 코디네이터',
  'Complaints Handler': '고객 불만 처리 담당',
  'Compliance Analyst': '준법 분석가',
  'Compliance Manager': '준법감시 매니저',
  'Compliance Officer': '준법감시인',
  'Computer Operator': '컴퓨터 오퍼레이터',
  'Computer Science Professional': '컴퓨터 공학 전문가',
  'Computer Technician': '컴퓨터 기술자',
  'Concierge': '컨시어지',
  'Concrete Finisher': '콘크리트 마감공',
  'Construction Engineer': '건설 엔지니어',
  'Construction Manager': '건설 현장 소장',
  'Construction Superintendent': '건설 공사 감독',
  'Construction Worker': '건설 노동자',
  'Consultant': '컨설턴트',
  'Content Creator': '콘텐츠 크리에이터',
  'Content Marketing Manager': '콘텐츠 마케팅 매니저',
  'Content Strategist': '콘텐츠 전략가',
  'Content Writer': '콘텐츠 라이터',
  'Contract Specialist': '계약 전문가',
  'Contracts Specialist': '계약 전문가',
  'Controller': '재무 관리 책임자',
  'Copywriter': '카피라이터',
  'Corporate Recruiter': '기업 채용 담당자',
  'Corporate Security Manager': '기업 보안 매니저',
  'Correctional Officer': '교도관',
  'Cosmetologist': '미용사',
  'Counselor': '상담사',
  'Courier': '배송 기사',
  'Court Clerk': '법원 사무관',
  'Court Reporter': '법정 속기사',
  'Crane Operator': '크레인 운전사',
  'Creative Director': '크리에이티브 디렉터',
  'Credit Analyst': '신용 분석가',
  'Crisis Counselor': '위기 상담사',
  'Cruise Ship Worker': '크루즈선 직원',
  'Curriculum Designer': '교육과정 설계자',
  'Curriculum Developer': '교육과정 개발자',
  'Customer Experience Specialist': '고객 경험 전문가',
  'Customer Service Manager': '고객 서비스 매니저',
  'Customer Service Representative': '고객 서비스 담당자',
  'Customer Success Manager': '고객 성공 매니저',
  'Customer Success Specialist': '고객 성공 전문가',
  'Customer Support Specialist': '고객 지원 전문가',
  'Customs Broker': '관세사',
  'Customs Officer': '세관 직원',
  'Cybersecurity Analyst': '사이버보안 분석가',
  'Data Analyst': '데이터 분석가',
  'Data Architect': '데이터 아키텍트',
  'Data Engineer': '데이터 엔지니어',
  'Data Entry Clerk': '데이터 입력 사무원',
  'Data Entry Operator': '데이터 입력 오퍼레이터',
  'Data Entry Specialist': '데이터 입력 전문가',
  'Data Scientist': '데이터 사이언티스트',
  'Database Administrator': '데이터베이스 관리자',
  'Delivery Driver': '배달 기사',
  'Dental Assistant': '치과 보조',
  'Dental Hygienist': '치과 위생사',
  'Dental Office Manager': '치과 병원 매니저',
  'Dentist': '치과의사',
  'Deputy Sheriff': '부보안관',
  'Design Engineer': '설계 엔지니어',
  'Desktop Support Engineer': '데스크톱 지원 엔지니어',
  'Desktop Support Specialist': '데스크톱 지원 전문가',
  'Desktop Support Technician': '데스크톱 지원 기술자',
  'Detailer': '디테일링 기사',
  'DevOps Engineer': 'DevOps 엔지니어',
  'Dialysis Technician': '투석 기술자',
  'Diesel Mechanic': '디젤 정비사',
  'Diesel Technician': '디젤 기술자',
  'Dietary Aide': '영양 보조원',
  'Dietitian': '영양사',
  'Digital Marketer': '디지털 마케터',
  'Digital Marketing Manager': '디지털 마케팅 매니저',
  'Digital Marketing Specialist': '디지털 마케팅 전문가',
  'Director of Operations': '운영 이사',
  'Dishwasher': '설거지 담당',
  'Dispatcher': '배차 담당자',
  'District Manager': '지역 매니저',
  'Doctor': '의사',
  'Dog Groomer': '반려견 미용사',
  'Dog Trainer': '반려견 훈련사',
  'Dog Walker': '반려견 산책 도우미',
  'Drafter': '설계 기사',
  'Driver': '운전기사',
  'Drywall Installer': '건식벽체 설치공',
  'EMT': '응급구조사',
  'ESL Teacher': '영어 강사',
  'Editor': '편집자',
  'Education Consultant': '교육 컨설턴트',
  'Educational Technologist': '교육 기술 전문가',
  'Electrical Engineer': '전기 엔지니어',
  'Electrical Technician': '전기 기술자',
  'Electrician': '전기 기사',
  'Elementary Teacher': '초등학교 교사',
  'Elevator Technician': '엘리베이터 기술자',
  'Embedded Software Engineer': '임베디드 소프트웨어 엔지니어',
  'Embedded Systems Engineer': '임베디드 시스템 엔지니어',
  'Emergency Management Coordinator': '재난 관리 코디네이터',
  'Emergency Medical Technician (EMT)': '응급구조사 (EMT)',
  'Engineering Manager': '엔지니어링 매니저',
  'Entrepreneur': '기업가',
  'Environmental Compliance Officer': '환경 준법 담당관',
  'Environmental Consultant': '환경 컨설턴트',
  'Environmental Engineer': '환경 엔지니어',
  'Environmental Scientist': '환경 과학자',
  'Epidemiologist': '역학자',
  'Escrow Officer': '에스크로 담당자',
  'Esthetician': '피부 관리사',
  'Ethical Hacker': '화이트해커',
  'Event Coordinator': '이벤트 코디네이터',
  'Event Manager': '이벤트 매니저',
  'Event Planner': '이벤트 기획자',
  'Executive Assistant': '비서',
  'Executive Chef': '총주방장',
  'Executive Director': '전무이사',
  'Executive Housekeeper': '객실 관리 책임자',
  'Exercise Physiologist': '운동 생리학자',
  'Expeditor': '출하 담당자',
  'Eyewear Sales Associate': '안경 판매원',
  'Facilities Manager': '시설 관리 매니저',
  'Factory Worker': '공장 노동자',
  'Family Services Worker': '가족 복지 상담원',
  'Fashion Designer': '패션 디자이너',
  'Fast Food Worker': '패스트푸드점 직원',
  'Fence Installer': '울타리 설치공',
  'Field Engineer': '필드 엔지니어',
  'Field Service Technician': '현장 서비스 기술자',
  'Film Director': '영화 감독',
  'Finance Manager': '재무 매니저',
  'Financial Advisor': '재무 상담사',
  'Financial Analyst': '재무 분석가',
  'Financial Controller': '재무 컨트롤러',
  'Financial Manager': '재무 매니저',
  'Financial Planner': '재무 설계사',
  'Fire Chief': '소방서장',
  'Fire Inspector': '소방 검사관',
  'Firefighter': '소방관',
  'Fitness Center Manager': '피트니스센터 매니저',
  'Fitness Instructor': '피트니스 강사',
  'Fitness Trainer': '피트니스 트레이너',
  'Fleet Manager': '차량 관리 매니저',
  'Flight Attendant': '승무원',
  'Floor Installer': '바닥재 시공사',
  'Floor Manager': '플로어 매니저',
  'Florist': '플로리스트',
  'Food Expeditor': '주방 출납 담당',
  'Food Runner': '음식 서빙 담당',
  'Food Safety Manager': '식품 안전 관리자',
  'Food Scientist': '식품 과학자',
  'Food Server': '서빙 담당',
  'Food Service Director': '급식 책임자',
  'Food Service Manager': '급식 매니저',
  'Food Service Worker': '급식 직원',
  'Food Stylist': '푸드 스타일리스트',
  'Food Truck Operator': '푸드트럭 운영자',
  'Forklift Operator': '지게차 운전사',
  'Freelance Writer': '프리랜서 작가',
  'Freight Broker': '화물 중개인',
  'Front Desk Agent': '프론트 데스크 직원',
  'Front Desk Receptionist': '안내 데스크 직원',
  'Front End Developer': '프론트엔드 개발자',
  'Front-End Developer': '프론트엔드 개발자',
  'Frontend Developer': '프론트엔드 개발자',
  'Full Stack Developer': '풀스택 개발자',
  'Full-Stack Developer': '풀스택 개발자',
  'Fundraiser': '모금 활동가',
  'Funeral Director': '장례 지도사',
  'Game Designer': '게임 디자이너',
  'Game Developer': '게임 개발자',
  'General Counsel': '법무 책임자',
  'General Manager': '총지배인',
  'Genetic Counselor': '유전 상담사',
  'Geologist': '지질학자',
  'GIS Analyst': 'GIS 분석가',
  'Glazier': '유리공',
  'Go Developer': 'Go 개발자',
  'Golf Course Superintendent': '골프장 관리 책임자',
  'Google Ads Specialist': 'Google Ads 전문가',
  'Governance Risk Compliance': 'GRC 전문가',
  'Grants Manager': '보조금 관리 매니저',
  'Graphic Designer': '그래픽 디자이너',
  'Grocery Store Clerk': '마트 직원',
  'Group Fitness Instructor': '그룹 피트니스 강사',
  'Guidance Counselor': '진로 상담사',
  'Gym Manager': '헬스장 매니저',
  'Gym Trainer': '헬스 트레이너',
  'HVAC Technician': 'HVAC 기술자',
  'HR Assistant': '인사 보조',
  'HR Business Partner': 'HR 비즈니스 파트너',
  'HR Coordinator': '인사 코디네이터',
  'HR Director': '인사 이사',
  'HR Executive': '인사 임원',
  'HR Manager': '인사 매니저',
  'HR Recruiter': '인사 채용 담당자',
  'Hair Stylist': '헤어 스타일리스트',
  'Head Chef': '수석 셰프',
  'Head Cook': '주방장',
  'Health Coach': '건강 코치',
  'Health Educator': '보건 교육사',
  'Health Information Technician': '의료 정보 기술자',
  'Health Inspector': '보건 검사관',
  'Healthcare Administrator': '의료 행정관',
  'Heavy Equipment Operator': '중장비 운전사',
  'Help Desk Technician': '헬프데스크 기술자',
  'High School Teacher': '고등학교 교사',
  'Home Health Aide': '가정 간호 보조',
  'Home Inspector': '주택 검사관',
  'Hospice Nurse': '호스피스 간호사',
  'Hospital Administrator': '병원 행정관',
  'Hospital Housekeeper': '병원 청소원',
  'Hospitality Manager': '호텔 경영 매니저',
  'Host/Hostess': '안내원',
  'Hotel Front Desk Agent': '호텔 프론트 직원',
  'Hotel Manager': '호텔 매니저',
  'House Cleaner': '가사 도우미',
  'House Painter': '도장공',
  'Housekeeper': '하우스키퍼',
  'Housekeeping Manager': '객실 관리 매니저',
  'Housekeeping Supervisor': '객실 관리 주임',
  'IT Auditor': 'IT 감사인',
  'IT Consultant': 'IT 컨설턴트',
  'IT Coordinator': 'IT 코디네이터',
  'IT Director': 'IT 이사',
  'IT Manager': 'IT 매니저',
  'IT Project Manager': 'IT 프로젝트 매니저',
  'IT Recruiter': 'IT 채용 담당자',
  'IT Specialist': 'IT 전문가',
  'IT Support Specialist': 'IT 지원 전문가',
  'IT Support Technician': 'IT 지원 기술자',
  'IT Technician': 'IT 기술자',
  'Illustrator': '일러스트레이터',
  'Immigration Lawyer': '이민 전문 변호사',
  'Immigration Paralegal': '이민 법률 보조',
  'Implementation Specialist': '도입 전문가',
  'Industrial Designer': '산업 디자이너',
  'Industrial Engineer': '산업 엔지니어',
  'Industrial Maintenance Technician': '산업 설비 정비 기술자',
  'Information Security Analyst': '정보 보안 분석가',
  'Information Technology Manager': '정보기술 매니저',
  'Inside Sales Representative': '내근 영업 사원',
  'Instructional Coach': '교수법 코치',
  'Instructional Designer': '교수 설계자',
  'Insulation Worker': '단열 시공사',
  'Insurance Agent': '보험 설계사',
  'Insurance Underwriter': '보험 심사역',
  'Interior Designer': '인테리어 디자이너',
  'Internal Auditor': '내부 감사인',
  'Intern': '인턴',
  'Interpreter': '통역사',
  'Inventory Manager': '재고 관리 매니저',
  'Investment Analyst': '투자 분석가',
  'Investment Banker': '투자은행가',
  'Iron Worker': '철골공',
  'Ironworker': '철근공',
  'Janitor': '청소원',
  'Java Developer': 'Java 개발자',
  'Java Full Stack Developer': 'Java 풀스택 개발자',
  'JavaScript Developer': 'JavaScript 개발자',
  'Jeweler': '보석 세공사',
  'Journalist': '기자',
  'Junior Accountant': '주니어 회계사',
  'Junior Developer': '주니어 개발자',
  'Juvenile Probation Officer': '소년 보호 관찰관',
  'Kindergarten Teacher': '유치원 교사',
  'Kitchen Helper': '주방 보조',
  'Kitchen Manager': '주방 매니저',
  'Lab Assistant': '연구실 보조',
  'Lab Technician': '실험실 기술자',
  'Landscape Architect': '조경 건축사',
  'Landscaper': '조경사',
  'Law Clerk': '법률 서기',
  'Lawyer': '변호사',
  'Lead Teacher': '수석 교사',
  'Leasing Consultant': '임대 컨설턴트',
  'Legal Analyst': '법률 분석가',
  'Legal Assistant': '법률 보조',
  'Legal Secretary': '법률 비서',
  'Legislative Aide': '입법 보좌관',
  'Librarian': '사서',
  'Library Assistant': '도서관 보조',
  'Licensed Practical Nurse': '준간호사',
  'Licensed Practical Nurse (LPN)': '준간호사 (LPN)',
  'Limousine Driver': '리무진 운전사',
  'Line Cook': '라인 쿡',
  'Litigation Support Specialist': '소송 지원 전문가',
  'Loan Officer': '대출 담당자',
  'Loan Processor': '대출 심사원',
  'Locksmith': '자물쇠 전문가',
  'Logistics Coordinator': '물류 코디네이터',
  'Logistics Manager': '물류 매니저',
  'Logistics Specialist': '물류 전문가',
  'Long Haul Truck Driver': '장거리 트럭 운전사',
  'Loss Prevention Specialist': '손실 방지 전문가',
  'MRI Technologist': 'MRI 기술자',
  'Machine Learning Engineer': '머신러닝 엔지니어',
  'Machine Learning Specialist': '머신러닝 전문가',
  'Machine Operator': '기계 오퍼레이터',
  'Maintenance Engineer': '보전 엔지니어',
  'Maintenance Manager': '보전 매니저',
  'Maintenance Technician': '보전 기술자',
  'Maintenance Worker': '시설 관리원',
  'Makeup Artist': '메이크업 아티스트',
  'Management Consultant': '경영 컨설턴트',
  'Manufacturing Engineer': '제조 엔지니어',
  'Manufacturing Worker': '제조 근로자',
  'Marine Biologist': '해양 생물학자',
  'Marine Engineer': '선박 엔지니어',
  'Market Research Analyst': '시장 조사 분석가',
  'Marketing Analyst': '마케팅 분석가',
  'Marketing Assistant': '마케팅 보조',
  'Marketing Coordinator': '마케팅 코디네이터',
  'Marketing Director': '마케팅 이사',
  'Marketing Executive': '마케팅 임원',
  'Marketing Intern': '마케팅 인턴',
  'Marketing Manager': '마케팅 매니저',
  'Marketing Specialist': '마케팅 전문가',
  'Mason': '석공',
  'Massage Therapist': '마사지 치료사',
  'Material Handler': '자재 관리원',
  'Materials Manager': '자재 매니저',
  'Mechanical Design Engineer': '기계 설계 엔지니어',
  'Mechanical Engineer': '기계 엔지니어',
  'Mechanical Technician': '기계 기술자',
  'Media Buyer': '미디어 바이어',
  'Mediator': '조정인',
  'Medical Assistant': '의료 보조',
  'Medical Billing Specialist': '의료 청구 전문가',
  'Medical Coder': '의료 코더',
  'Medical Device Sales Representative': '의료기기 영업 사원',
  'Medical Lab Technician': '임상 병리 기사',
  'Medical Office Assistant': '의료 사무 보조',
  'Medical Office Manager': '의원 관리 매니저',
  'Medical Receptionist': '의료 접수 담당',
  'Medical Records Clerk': '의무 기록 사무원',
  'Medical Representative': '의약품 영업 사원',
  'Medical Scribe': '의료 기록원',
  'Medical Technologist': '의료 기술자',
  'Mental Health Counselor': '정신건강 상담사',
  'Merchandise Planner': '머천다이즈 플래너',
  'Microbiologist': '미생물학자',
  'Middle School Teacher': '중학교 교사',
  'Midwife': '조산사',
  'Military Officer': '군 장교',
  'Millwright': '산업 기계공',
  'Mobile Developer': '모바일 개발자',
  'Mortgage Loan Officer': '주택담보대출 담당자',
  'Mortgage Loan Processor': '주택담보대출 심사원',
  'Motion Graphics Designer': '모션 그래픽 디자이너',
  'Moving Company Driver': '이사 기사',
  'Museum Curator': '학예사',
  'Music Producer': '음악 프로듀서',
  'Music Teacher': '음악 교사',
  'Nanny': '베이비시터',
  'Natural Language Processing Engineer': 'NLP 엔지니어',
  'Network Administrator': '네트워크 관리자',
  'Network Engineer': '네트워크 엔지니어',
  'Night Auditor': '나이트 오디터',
  'Node.js Developer': 'Node.js 개발자',
  'Nuclear Engineer': '원자력 엔지니어',
  'Nurse': '간호사',
  'Nurse Manager': '수간호사',
  'Nurse Practitioner': '전문간호사',
  'Nursing Assistant': '간호 보조',
  'Nutritionist': '영양사',
  'Occupational Health Specialist': '산업 보건 전문가',
  'Occupational Therapist': '작업 치료사',
  'Occupational Therapy Assistant': '작업 치료 보조',
  'Office Administrator': '사무 관리자',
  'Office Assistant': '사무 보조',
  'Office Clerk': '사무원',
  'Office Manager': '오피스 매니저',
  'Operations Analyst': '운영 분석가',
  'Operations Coordinator': '운영 코디네이터',
  'Operations Director': '운영 이사',
  'Operations Manager': '운영 매니저',
  'Optician': '안경사',
  'Optometrist': '검안사',
  'Oracle Database Administrator': 'Oracle DB 관리자',
  'Orthodontist': '교정 치과의사',
  'Outside Sales Representative': '외근 영업 사원',
  'Painter': '화가',
  'Paralegal': '법률 보조원',
  'Paramedic': '응급구조사',
  'Park Ranger': '공원 관리원',
  'Parking Lot Attendant': '주차 관리원',
  'Parts Manager': '부품 매니저',
  'Pastry Chef': '파티시에',
  'Patient Access Representative': '환자 접수 담당',
  'Patient Care Technician': '환자 케어 기술자',
  'Payroll Specialist': '급여 전문가',
  'Pediatrician': '소아과 전문의',
  'Penetration Tester': '모의 해킹 전문가',
  'Personal Banker': '개인 금융 상담사',
  'Personal Trainer': '퍼스널 트레이너',
  'Pest Control Technician': '방역 기술자',
  'Pet Groomer': '반려동물 미용사',
  'Pet Sitter': '반려동물 돌봄사',
  'Petroleum Engineer': '석유 엔지니어',
  'Pharmaceutical Sales Representative': '제약 영업 사원',
  'Pharmacist': '약사',
  'Pharmacy Assistant': '약국 보조',
  'Pharmacy Tech': '약국 기술자',
  'Pharmacy Technician': '약국 기술자',
  'Phlebotomist': '채혈 기사',
  'Photographer': '사진작가',
  'Physical Therapist': '물리 치료사',
  'Physical Therapy Aide': '물리 치료 보조',
  'Physical Therapy Assistant': '물리 치료 보조',
  'Physician Assistant': '진료 보조',
  'Pilates Instructor': '필라테스 강사',
  'Pilot': '파일럿',
  'Pipefitter': '배관공',
  'Pizza Maker': '피자 메이커',
  'Plant Manager': '공장장',
  'Plasterer': '미장공',
  'Platform Engineer': '플랫폼 엔지니어',
  'Plumber': '배관공',
  'Plumbing Engineer': '배관 엔지니어',
  'Podcast Host': '팟캐스트 진행자',
  'Police Officer': '경찰관',
  'Policy Analyst': '정책 분석가',
  'Pool Cleaner': '수영장 관리원',
  'Pool Technician': '수영장 기술자',
  'Porter': '포터',
  'Postal Worker': '우체국 직원',
  'Power BI Developer': 'Power BI 개발자',
  'Prep Cook': '조리 보조',
  'Preschool Teacher': '유아 교사',
  'Pressure Washer': '고압 세척 기사',
  'Principal': '교장',
  'Private Investigator': '사설 탐정',
  'Probation Officer': '보호 관찰관',
  'Process Engineer': '공정 엔지니어',
  'Procurement Manager': '구매 매니저',
  'Procurement Specialist': '구매 전문가',
  'Producer': '프로듀서',
  'Product Analyst': '프로덕트 분석가',
  'Product Designer': '프로덕트 디자이너',
  'Product Manager': '프로덕트 매니저',
  'Product Marketing Manager': '프로덕트 마케팅 매니저',
  'Product Owner': '프로덕트 오너',
  'Production Assistant': '제작 보조',
  'Production Engineer': '생산 기술 엔지니어',
  'Production Manager': '생산 관리 매니저',
  'Production Planner': '생산 계획 담당',
  'Production Worker': '생산직 근로자',
  'Program Coordinator': '프로그램 코디네이터',
  'Program Manager': '프로그램 매니저',
  'Programmer': '프로그래머',
  'Project Coordinator': '프로젝트 코디네이터',
  'Project Engineer': '프로젝트 엔지니어',
  'Project Manager': '프로젝트 매니저',
  'Prompt Engineer': '프롬프트 엔지니어',
  'Property Manager': '부동산 관리 매니저',
  'Prosthetist': '의지보조기 기사',
  'Psychiatric Nurse': '정신과 간호사',
  'Psychiatrist': '정신과 전문의',
  'Psychologist': '심리학자',
  'Public Affairs Specialist': '공보 전문가',
  'Public Health Inspector': '공중보건 검사관',
  'Public Health Specialist': '공중보건 전문가',
  'Public Relations Coordinator': 'PR 코디네이터',
  'Public Relations Specialist': 'PR 전문가',
  'Purchasing Agent': '구매 담당자',
  'Purchasing Manager': '구매 매니저',
  'Python Developer': 'Python 개발자',
  'QA Analyst': 'QA 분석가',
  'QA Engineer': 'QA 엔지니어',
  'QA Manager': 'QA 매니저',
  'QA Tester': 'QA 테스터',
  'Quality Analyst': '품질 분석가',
  'Quality Assurance Inspector': '품질보증 검사원',
  'Quality Assurance Specialist': '품질보증 전문가',
  'Quality Control Inspector': '품질관리 검사원',
  'Quality Engineer': '품질 엔지니어',
  'Quality Manager': '품질 매니저',
  'Radiologic Technologist': '방사선 기사',
  'React Developer': 'React 개발자',
  'Reading Specialist': '독서 지도 전문가',
  'Real Estate Agent': '부동산 중개사',
  'Real Estate Appraiser': '부동산 감정사',
  'Real Estate Assistant': '부동산 보조',
  'Real Estate Attorney': '부동산 전문 변호사',
  'Real Estate Investor': '부동산 투자자',
  'Receiving Clerk': '입고 담당 사무원',
  'Receptionist': '접수 담당',
  'Records Manager': '기록 관리 매니저',
  'Recreation Coordinator': '레크리에이션 코디네이터',
  'Recreation Director': '레크리에이션 디렉터',
  'Recruiter': '채용 담당자',
  'Recruiting Coordinator': '채용 코디네이터',
  'Registered Nurse': '정간호사',
  'Rehabilitation Counselor': '재활 상담사',
  'Reliability Engineer': '신뢰성 엔지니어',
  'Release Engineer': '릴리스 엔지니어',
  'Reporter': '기자',
  'Research Analyst': '리서치 분석가',
  'Research Assistant': '연구 보조',
  'Research Scientist': '연구원',
  'Reservation Agent': '예약 담당',
  'Resident Assistant': '기숙사 보조',
  'Residential Cleaner': '주거 청소원',
  'Residential Counselor': '거주 상담사',
  'Resort Manager': '리조트 매니저',
  'Respiratory Therapist': '호흡 치료사',
  'Restaurant General Manager': '레스토랑 총지배인',
  'Restaurant Manager': '레스토랑 매니저',
  'Retail Assistant': '소매 보조',
  'Retail Associate': '소매 직원',
  'Retail Manager': '소매점 매니저',
  'Retail Sales Associate': '소매 판매원',
  'Retail Store Manager': '소매점 점장',
  'Revenue Manager': '수익 관리 매니저',
  'Risk Analyst': '리스크 분석가',
  'Risk Management Specialist': '리스크 관리 전문가',
  'Risk Manager': '리스크 매니저',
  'Robotics Engineer': '로봇공학 엔지니어',
  'Roofer': '지붕 시공사',
  'Room Attendant': '객실 담당',
  'Rust Developer': 'Rust 개발자',
  'SAP Consultant': 'SAP 컨설턴트',
  'SEO Specialist': 'SEO 전문가',
  'SOC Analyst': 'SOC 분석가',
  'Safety Coordinator': '안전 관리 코디네이터',
  'Safety Manager': '안전 관리 매니저',
  'Sales Assistant': '영업 보조',
  'Sales Associate': '판매 사원',
  'Sales Consultant': '영업 컨설턴트',
  'Sales Coordinator': '영업 코디네이터',
  'Sales Director': '영업 이사',
  'Sales Engineer': '세일즈 엔지니어',
  'Sales Executive': '영업 임원',
  'Sales Manager': '영업 매니저',
  'Sales Representative': '영업 사원',
  'Salesforce Administrator': 'Salesforce 관리자',
  'Sanitation Worker': '환경미화원',
  'School Administrator': '학교 행정관',
  'School Counselor': '학교 상담사',
  'School Nurse': '보건 교사',
  'School Principal': '교장',
  'School Psychologist': '학교 심리학자',
  'Scrum Master': '스크럼 마스터',
  'Seaman': '선원',
  'Security Analyst': '보안 분석가',
  'Security Engineer': '보안 엔지니어',
  'Security Guard': '경비원',
  'Security Manager': '보안 매니저',
  'Security Officer': '보안 담당관',
  'Senior Accountant': '시니어 회계사',
  'Server': '서버 (웨이터)',
  'Service Advisor': '서비스 어드바이저',
  'Service Crew': '서비스 크루',
  'Set Designer': '세트 디자이너',
  'Sheet Metal Worker': '판금공',
  'Shipping & Receiving Clerk': '출하·입고 담당',
  'Shipping Clerk': '출하 담당',
  'Site Engineer': '현장 엔지니어',
  'Site Reliability Engineer': 'SRE (사이트 신뢰성 엔지니어)',
  'Small Business Owner': '소상공인',
  'Social Media Coordinator': '소셜미디어 코디네이터',
  'Social Media Manager': '소셜미디어 매니저',
  'Social Media Specialist': '소셜미디어 전문가',
  'Social Worker': '사회복지사',
  'Software Architect': '소프트웨어 아키텍트',
  'Software Developer': '소프트웨어 개발자',
  'Software Engineer': '소프트웨어 엔지니어',
  'Software Engineering Manager': '소프트웨어 엔지니어링 매니저',
  'Software Test Engineer': '소프트웨어 테스트 엔지니어',
  'Software Tester': '소프트웨어 테스터',
  'Solar Installer': '태양광 설치 기사',
  'Solution Architect': '솔루션 아키텍트',
  'Solutions Architect': '솔루션 아키텍트',
  'Solutions Engineer': '솔루션 엔지니어',
  'Sommelier': '소믈리에',
  'Sonographer': '초음파 검사 기사',
  'Sound Engineer': '사운드 엔지니어',
  'Sous Chef': '부주방장',
  'Spa Manager': '스파 매니저',
  'Special Education Teacher': '특수교육 교사',
  'Speech Language Pathologist': '언어 치료사',
  'Speech-Language Pathologist': '언어 치료사',
  'Sports Coach': '스포츠 코치',
  'Stage Manager': '무대 감독',
  'Sterile Processing Technician': '멸균 처리 기술자',
  'Store Associate': '매장 직원',
  'Store Manager': '매장 점장',
  'Storyboard Artist': '스토리보드 아티스트',
  'Structural Engineer': '구조 엔지니어',
  'Substance Abuse Counselor': '중독 상담사',
  'Substitute Teacher': '보조 교사',
  'Supply Chain Analyst': '공급망 분석가',
  'Supply Chain Manager': '공급망 매니저',
  'Support Worker': '지원 근로자',
  'Surgeon': '외과 전문의',
  'Surgical Technologist': '수술실 기술자',
  'Survey Researcher': '조사 연구원',
  'Surveyor': '측량사',
  'Sushi Chef': '초밥 셰프',
  'Sustainability Coordinator': '지속가능성 코디네이터',
  'System Administrator': '시스템 관리자',
  'System Analyst': '시스템 분석가',
  'System Engineer': '시스템 엔지니어',
  'Systems Administrator': '시스템 관리자',
  'Systems Analyst': '시스템 분석가',
  'Systems Engineer': '시스템 엔지니어',
  'TSA Agent': '공항 보안 검색원',
  'Talent Acquisition Specialist': '인재 확보 전문가',
  'Teacher': '교사',
  'Teaching Assistant': '교육 보조',
  'Team Leader': '팀 리더',
  'Tech Sales Representative': 'IT 영업 사원',
  'Technical Program Manager': '테크니컬 프로그램 매니저',
  'Technical Recruiter': '기술 채용 담당자',
  'Technical Support Specialist': '기술 지원 전문가',
  'Technical Writer': '테크니컬 라이터',
  'Therapist': '치료사',
  'Title Examiner': '권원 조사원',
  'Tour Guide': '투어 가이드',
  'Travel Agent': '여행사 직원',
  'Truck Driver': '트럭 운전사',
  'Tutor': '과외 교사',
  'UI Designer': 'UI 디자이너',
  'UX Designer': 'UX 디자이너',
  'UX Researcher': 'UX 리서처',
  'Ultrasound Technician': '초음파 검사 기사',
  'Valet Attendant': '발렛파킹 직원',
  'Veterans Service Officer': '보훈 담당관',
  'Veterinary Assistant': '수의 보조',
  'Veterinary Technician': '수의 기술자',
  'Video Editor': '영상 편집자',
  'Videographer': '영상 촬영 기사',
  'Virtual Assistant': '가상 비서',
  'Voice Actor': '성우',
  'Waiter/Waitress': '웨이터/웨이트리스',
  'Warehouse Associate': '물류 창고 직원',
  'Warehouse Manager': '물류 창고 매니저',
  'Warehouse Worker': '물류 창고 근로자',
  'Web Designer': '웹 디자이너',
  'Web Developer': '웹 개발자',
  'Welder': '용접공',
  'Wellness Coach': '웰니스 코치',
  'Wildlife Biologist': '야생동물 생물학자',
  'Wind Turbine Technician': '풍력 발전 기술자',
  'Window Cleaner': '유리 청소원',
  'X-Ray Technician': 'X선 기사',
  'Yoga Instructor': '요가 강사',
  'Youth Counselor': '청소년 상담사',
  'Zookeeper': '동물원 사육사',
  'iOS Developer': 'iOS 개발자',
};

// ─── CATEGORIES (English → Korean) ──────────────────────────────────────────

export const CATEGORIES = {
  Technology: '기술',
  Healthcare: '의료·헬스케어',
  Trades: '기능직',
  Hospitality: '호스피탈리티',
  'Food Service': '식음료 서비스',
  Creative: '크리에이티브',
  Education: '교육',
  Government: '공무원',
  Finance: '금융',
  Marketing: '마케팅',
  Business: '비즈니스',
  Engineering: '엔지니어링',
  Sales: '영업',
  Legal: '법률',
  'Real Estate': '부동산',
  HR: '인사',
  Fitness: '피트니스',
  Management: '경영관리',
  'Animal Care': '동물 돌봄',
  Logistics: '물류',
  'Customer Service': '고객 서비스',
  Administrative: '사무·행정',
  Transportation: '운송',
  Retail: '소매',
  Cleaning: '청소',
  'Social Services': '사회복지',
  Manufacturing: '제조',
  Construction: '건설',
  Security: '보안',
  Science: '과학',
  Events: '이벤트',
  'Writing & Content': '글쓰기·콘텐츠',
  'Supply Chain': '공급망',
  Research: '연구',
  Insurance: '보험',
  Consulting: '컨설팅',
  Aviation: '항공',
  Automotive: '자동차',
  Media: '미디어',
  Maritime: '해양',
  'Law Enforcement': '법집행',
  'Entry-Level': '신입·경력전환',
  Entertainment: '엔터테인먼트',
  Childcare: '보육',
  Beauty: '뷰티',
  Architecture: '건축',
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
  Technology: (job) => `${job}의 이력서는 단순한 기술 스킬 나열이 아닌, 구체적인 문제 해결 능력과 비즈니스 기여도를 보여줘야 합니다. 기술력과 함께 프로젝트 성과를 수치로 제시하여, 기업이 원하는 인재상에 부합함을 명확히 전달하세요.`,
  Healthcare: (job) => `의료 분야 채용 담당자는 임상 능력과 환자 케어에 대한 진정성을 모두 갖춘 인재를 찾습니다. ${job} 이력서에서는 전문적 역량과 인간적 면모를 균형 있게 보여주는 것이 서류 통과의 핵심입니다.`,
  Finance: (job) => `금융 업계의 채용 담당자는 복잡한 데이터를 전략적 의사결정으로 전환할 수 있는 인재를 원합니다. ${job} 이력서에서는 분석력, 주의력, 그리고 정확한 재무 판단력을 실적으로 보여주는 것이 중요합니다.`,
  Education: (job) => `교육 기관의 채용 담당자는 학습 의욕을 이끌어내고 다양한 학습자의 요구에 대응할 수 있는 인재를 찾습니다. ${job} 이력서에서는 교육 전문 지식과 학생 성공에 대한 기여를 구체적으로 제시하세요.`,
  'Food Service': (job) => `식음료 업계의 채용 담당자는 신뢰성, 팀워크, 그리고 업무에 대한 열정을 중시합니다. ${job} 이력서에서는 조리 기술이나 서비스 역량과 함께, 바쁜 환경에서도 안정적인 성과를 낼 수 있음을 보여주세요.`,
  Hospitality: (job) => `호텔·관광 업계에서는 따뜻한 성품, 세심한 배려, 압박 속에서도 우아한 대응이 요구됩니다. ${job} 이력서에서는 서비스 정신과 고객에게 기억에 남는 경험을 제공하는 능력을 강조하세요.`,
  Trades: (job) => `기능직 채용 담당자는 독립적으로 높은 품질의 작업을 수행할 수 있는 기술자를 중시합니다. ${job} 이력서에서는 실무 경험, 안전 의식, 그리고 현장 문제 해결 능력을 중심으로 어필하세요.`,
  Creative: (job) => `우수한 크리에이티브 인재는 예술적 탁월함과 클라이언트 요구 이해를 동시에 충족합니다. ${job} 이력서에서는 창의적 비전을 보여주면서도 비즈니스 감각과 납기 준수 능력도 어필하세요.`,
  Administrative: (job) => `사무·행정직 채용 담당자는 필요를 미리 파악하고, 주도적으로 문제를 해결하며, 기밀을 유지할 수 있는 인재를 찾습니다. ${job} 이력서에서는 조직력과 업무 효율화에 기여한 성과를 보여주세요.`,
  Sales: (job) => `이력서는 당신의 첫 번째 영업 프레젠테이션이며, 채용 담당자는 그렇게 평가합니다. ${job} 이력서에서 가장 효과적인 것은 기업의 비즈니스 과제를 이해하고, 매출 목표 달성에 기여할 수 있음을 보여주는 접근법입니다.`,
  Marketing: (job) => `마케팅은 빠르게 변화하는 분야이며, 채용 담당자는 전략과 실행 모두에 능숙한 인재를 찾습니다. ${job} 이력서에서는 측정 가능한 성과를 만들어내는 능력과 전략적 창의성을 보여주세요.`,
  HR: (job) => `인사 역할은 조직의 역학을 잘 파악하면서 구체적인 비즈니스 성과를 만들어내는 능력이 요구됩니다. ${job} 이력서에서는 인재 관리와 조직 기여 양면에서의 실적을 보여주세요.`,
  'Customer Service': (job) => `고객 서비스직에는 뛰어난 커뮤니케이션 능력과 진정한 공감 능력이 요구됩니다. ${job} 이력서에서는 문제를 효과적으로 해결하면서도 고객과의 좋은 관계를 유지하는 능력을 보여주세요.`,
  Retail: (job) => `소매업 채용 담당자는 신뢰성, 상품 지식, 그리고 고객 서비스에 대한 진정한 열의를 중시합니다. ${job} 이력서에서는 판매 실적과 활기찬 환경에서 역량을 발휘할 수 있음을 어필하세요.`,
  Logistics: (job) => `물류 업계의 채용 담당자는 효율성, 정확성, 그리고 시간에 민감한 업무 관리 능력을 중시합니다. ${job} 이력서에서는 재고 관리, 계획 수립, 프로세스 최적화 경험을 구체적으로 보여주세요.`,
  Government: (job) => `공무원 채용은 민간 기업과 다른 접근이 필요합니다. ${job} 이력서에서는 직무 요건에 직접 대응하면서 공공 서비스에 대한 기여 의식을 보여주는 것이 중요합니다.`,
  Legal: (job) => `법률 분야에서는 절대적인 정확성과 세부 사항에 대한 세심한 주의가 요구됩니다. ${job} 이력서에서는 지적 엄밀함, 법규에 대한 깊은 이해, 그리고 복잡한 사안을 처리하는 능력을 반영하세요.`,
  default: (job) => `효과적인 ${job} 이력서는 입사 첫날부터 성과를 낼 수 있음을 보여주는 구체적인 실적에 초점을 맞춥니다. 관련 경험과 직무에 대한 진정한 열정을 조합하여 표현하세요.`,
};

// ─── TAGS GENERATOR ─────────────────────────────────────────────────────────

export function generateTags(jobTitle, slug) {
  return [
    `${jobTitle} 이력서`,
    `${jobTitle} 이력서 샘플`,
    `${jobTitle} 이력서 템플릿`,
    `${jobTitle} 자기소개서`,
    `이력서 작성`,
    `ATS 이력서`,
    `이력서 쓰는 법`,
    `취업 이력서`,
  ];
}

// ─── FAQ GENERATOR ──────────────────────────────────────────────────────────

export function generateFAQ(jobTitle) {
  return [
    {
      question: `${jobTitle} 이력서에는 어떤 스킬을 기재해야 하나요?`,
      answer: `${jobTitle} 직무에 직접 관련된 기술 스킬과 커뮤니케이션, 팀워크 등의 범용 스킬을 기재하세요. 채용 공고의 키워드를 활용하고, 각 스킬을 구체적인 실적으로 뒷받침하는 것이 중요합니다.`,
    },
    {
      question: `${jobTitle} 이력서의 이상적인 길이는 어느 정도인가요?`,
      answer: `${jobTitle} 이력서는 경력이 적은 분은 1~2페이지, 10년 이상 경력자는 2~3페이지가 적당합니다. 내용의 질을 우선시하고, 모든 기재 사항이 가치를 제공하도록 하세요.`,
    },
    {
      question: `${jobTitle} 이력서에는 어떤 양식을 사용해야 하나요?`,
      answer: `${jobTitle} 이력서에는 깔끔하고 ATS 호환이 되는 표준 양식이 추천됩니다. 역연대순(최신 경력 먼저)이 가장 효과적이며, 연락처, 자기소개, 경력사항, 학력, 자격증 섹션을 명확히 구분하세요.`,
    },
    {
      question: `${jobTitle}의 연봉은 얼마 정도인가요?`,
      answer: `${jobTitle}의 연봉은 경력, 근무 지역, 기업 규모에 따라 크게 다릅니다. Glassdoor, PayScale 등의 사이트에서 최신 연봉 데이터를 확인하세요. 이력서에 수치화된 실적을 기재하면 연봉 협상에서 유리합니다.`,
    },
    {
      question: `${jobTitle} 이력서에는 무엇을 포함해야 하나요?`,
      answer: `${jobTitle} 이력서에는 연락처, 자기소개, 수치화된 실적이 포함된 경력사항, 학력, 관련 자격증, 핵심 스킬을 포함하세요. 지원하는 직무의 요건에 맞춰 각 섹션을 맞춤화하는 것이 중요합니다.`,
    },
  ];
}

// ─── BODY GENERATOR ─────────────────────────────────────────────────────────

export function generateBody(jobTitle, category, keySkills, avgSalary, jobGrowth, slug) {
  const skills = keySkills || [];
  const topSkills = skills.slice(0, 3).join(', ') || '전문 스킬';
  const midSkills = skills.slice(3, 6).join(', ') || '응용 스킬';
  const softSkills = skills.slice(6, 8).join(', ') || '팀워크, 커뮤니케이션';

  const norm = normalizeCategory(category);
  const opener = (CATEGORY_OPENERS[norm] || CATEGORY_OPENERS.default)(jobTitle);

  return `
## ${jobTitle} 이력서에서 차별화하는 핵심 포인트

${opener}

채용 담당자가 이력서를 검토하는 시간은 평균 6~7초입니다. ${jobTitle} 직무에서는 가장 관련성 높은 스킬과 주요 성과가 즉시 눈에 들어오도록 해야 합니다. 좋은 이력서는 단순한 경력 나열이 아니라 당신의 커리어 스토리를 전달하고, 기업에 가져다줄 가치를 명확히 보여줍니다.

## 자기소개서 예문

### 신입·주니어

${topSkills || '전문 분야'}에 대한 탄탄한 기초 지식을 갖춘 의욕적인 ${jobTitle} 지원자. 역동적인 팀에 기여하며 학업에서 쌓은 지식을 실무 환경에서 발휘하고자 합니다. 빠른 학습 능력, 뛰어난 조직력, 목표 달성에 대한 강한 의지가 장점입니다.

### 경력 3~7년 (중견)

5년 이상의 ${topSkills} 실무 경험을 보유한 ${jobTitle}. 프로세스 개선 및 기한·예산 내 프로젝트 수행에서 검증된 실적을 보유하고 있습니다. ${midSkills || '고급 스킬'}에 능숙하며, 주니어 멤버 지도 및 지속적 개선 시책 추진 경험이 풍부합니다.

### 시니어·관리직

10년 이상의 업계 경험을 보유한 시니어 ${jobTitle}. ${topSkills} 및 ${midSkills || '전략적 매니지먼트'} 분야의 전문가로 인정받고 있습니다. 15명 이상의 다부서 팀을 이끌며, 5억 원 이상의 비용 절감을 실현한 전략 프로젝트를 지휘했습니다. ${softSkills || '리더십과 전략적 비전'}에 탁월하며, 목표를 지속적으로 초과 달성한 실적이 있습니다.

## 연봉 및 채용 전망

${jobTitle}의 평균 연봉은 약 **${avgSalary || '$50,000'}**이며, 경력, 근무 지역, 산업에 따라 크게 달라집니다. 이 직종의 고용 성장률은 향후 수년간 **${jobGrowth || '+5%'}**로 전망됩니다.

신입의 초봉은 중간값의 70~80% 수준, 시니어 및 전문직은 중간값보다 40~60% 이상의 보수가 기대됩니다. 대도시 및 수요가 높은 산업에서는 더 높은 보상이 일반적입니다.

**참고 자료:**
- [미국 노동통계국 (BLS)](https://www.bls.gov/ooh/) — 고용 및 연봉 공식 데이터
- [Glassdoor](https://www.glassdoor.com/Salaries/) — 직원 보고 연봉 데이터 및 연봉 범위
- [PayScale](https://www.payscale.com/research/US/) — 직종별 연봉 조사 및 비교

*실제 보수는 경력, 근무 지역, 산업, 기업 규모에 따라 다릅니다.*

## 어필해야 할 핵심 스킬

### 전문·기술 스킬
${skills.slice(0, 3).map(s => `- **${s}** — ${jobTitle}에게 필수적인 스킬이며, 채용 담당자와 ATS가 가장 주목하는 포인트`).join('\n') || '- 직무별 도구 및 기술의 숙련도\n- 업계 방법론과 프로세스에 대한 깊은 이해\n- 전문 소프트웨어 활용 능력'}

### 업무·조직 스킬
${skills.slice(3, 6).map(s => `- **${s}** — ${jobTitle}의 일상 업무에서 활용되는 중요한 스킬`).join('\n') || '- 시간 관리와 업무 우선순위 설정\n- 프로젝트 계획 및 조직화\n- 절차 준수에서의 정확성'}

### 대인 관계 스킬
${skills.slice(6, 8).map(s => `- **${s}** — ${jobTitle}로서 성공하기 위해 필수적인 대인 능력`).join('\n') || '- 구두 및 서면 커뮤니케이션\n- 팀워크와 협업'}
- 적응력과 압박 속에서의 업무 수행
- 갈등 해결 및 협상력

## 성과 중심 실적 작성법

아래 예시를 참고하여, 구체적인 수치를 활용한 자신의 실적을 기재하세요:

- ${topSkills || '주요 스킬'} 프로세스 최적화로 업무 효율 **25%** 개선, 상당한 비용 절감 실현
- **12개 이상의 프로젝트**를 동시 관리, 납기 준수율 98% 달성으로 팀 목표 초과 달성
- **8명의 신입 사원** 연수·멘토링 담당, 온보딩 기간 40% 단축
- ${skills[0] || '매니지먼트'} 관련 신규 시스템 도입으로 에러율 **35%** 감소, 고객 만족도 향상
- 혁신적인 ${skills[1] || '개발'} 전략으로 분기 매출 **20%** 증가
- 사용자 피드백 기반 지속적 개선으로 고객 만족도 **95%** 달성

## ${jobTitle} 이력서 양식 및 템플릿 팁

1. **역연대순 양식 사용** — 최신 경력을 먼저 기재합니다. ${jobTitle} 채용 담당자와 ATS에 가장 선호되는 양식입니다.
2. **지원 시마다 자기소개 맞춤화** — 채용 공고의 키워드를 반영하고, 해당 직무 고유의 과제를 이해하고 있음을 보여주세요.
3. **실적을 수치화** — 숫자는 채용 담당자의 눈길을 끌고, 당신의 기여를 구체적으로 보여줍니다. "매출 향상에 기여"보다 "매출 30% 증가"가 효과적입니다.
4. **레이아웃 정돈** — 여백 2.5cm, 폰트 크기 10~12pt, 굵은 제목으로 섹션을 명확히 구분하세요.
5. **관련 자격증·교육 기재** — ${jobTitle} 직무에서는 전문 자격증이나 지속적인 교육이 스킬 향상 의지를 보여주는 중요한 어필 포인트입니다.

## 채용 담당자의 조언

> **${jobTitle} 이력서에서 가장 흔한 실수는 수치화된 성과가 없는 것입니다.** 많은 지원자가 직무 내용만 설명하고, 업무의 구체적인 성과를 보여주지 않습니다.

${jobTitle}를 채용할 때, 저는 실적의 구체적인 증거를 찾습니다. "5명 팀 관리"보다 "5명 팀을 리드하여 4분기 연속 목표의 115% 달성"이라고 쓰는 후보자가 훨씬 높은 평가를 받습니다. 경력 사항의 각 항목은 "어떤 측정 가능한 성과를 냈는가?"라는 질문에 답해야 합니다.

또한, 지원하는 업계에 맞는 용어를 사용하는 것도 중요합니다. ${category.toLowerCase()} 분야에 정통한 채용 담당자는 범용적인 표현으로 작성된 맞춤화되지 않은 이력서를 바로 알아차립니다.

## ${jobTitle}의 대표적인 면접 질문

### ${jobTitle}로서 처리한 복잡한 프로젝트에 대해 말씀해 주세요

채용 담당자는 복잡한 상황에 대한 대처 능력을 평가합니다. STAR 기법(상황, 과제, 행동, 결과)으로 답변을 구성하고, 배경, 본인의 구체적인 역할, 실행한 행동, 측정 가능한 결과를 설명하세요.

### ${jobTitle}로서 압박이나 촉박한 마감에 어떻게 대처하시나요?

우선순위 설정과 압박 속에서의 성과 유지 능력을 보여주세요. 우선순위가 충돌한 구체적 사례를 들고, 체계적인 접근법과 달성한 긍정적 결과를 공유하세요.

### ${jobTitle}에 가장 관련된 기술적 강점은 무엇인가요?

${topSkills || '주요 스킬'} 전문성을 어필하는 절호의 기회입니다. 스킬을 나열하기만 하지 말고, 구체적인 적용 사례와 그 스킬로 달성한 성과로 뒷받침하세요.

### 업계 최신 동향을 어떻게 파악하고 계시나요?

채용 담당자는 지속적인 전문 역량 개발에 대한 투자를 확인하고 싶어합니다. 최근 수강한 교육, 취득한 자격증, 참가한 컨퍼런스, 구독하는 전문지, 적극 참여하는 커뮤니티에 대해 언급하세요.

### 5년 후 ${jobTitle}로서 어떤 커리어를 그리고 계시나요?

명확한 커리어 비전이 있음을 보여주세요. 기업의 성장 기회와 부합하는 현실적인 목표를 제시하고, 업계에서의 장기적인 헌신을 보여주는 것이 중요합니다.

## 흔한 실수와 대처법

### 1. 동일한 이력서를 그대로 돌려쓰기

같은 이력서를 모든 채용 공고에 보내는 것은 가장 부정적인 인상을 줍니다. ATS와 채용 담당자는 맞춤화되지 않은 이력서를 바로 알아차립니다. ${jobTitle} 각 공고에 맞춰 자기소개와 키워드를 반드시 조정하세요.

### 2. 업무 내용 설명에 그치고 실적을 보여주지 않음

일상 업무 나열은 채용 담당자에게 어필되지 않습니다. 모든 항목을 측정 가능한 실적으로 전환하세요. "고객 응대 담당" 대신 "일 평균 85건 고객 응대, 첫 해결률 92% 달성"으로 작성하세요.

### 3. ATS 최적화를 소홀히 함

많은 ${jobTitle} 지원자가 자동 필터링을 통과하지 못해 기회를 놓칩니다. 복잡한 표, 머리글·바닥글, 그래픽은 ATS에서 제대로 읽히지 않으므로 피하세요.

### 4. 오래된 정보나 무관한 정보 포함

15년 이상 전의 경험이나 ${jobTitle} 직무와 무관한 경력은 이력서를 불필요하게 길게 만들 뿐입니다. 최근 10년간의 관련 경험에 집중하세요.

### 5. 업계 고유 키워드 생략

모든 업계에는 전문 용어가 있습니다. ${jobTitle} 직무에서 ${topSkills || '전문 용어'} 같은 업계 고유 용어가 없으면, 채용 담당자에게 전문성 부족으로 비춰집니다.

## ${jobTitle} 이력서의 ATS 최적화

ATS(지원자 추적 시스템)는 채용 담당자가 검토하기 전에 걸러내는 필터링 시스템입니다. ${jobTitle}로서 서류 전형을 통과하기 위해:

- **채용 공고의 정확한 키워드 사용** — 공고에 "${skills[0] || '특정 스킬'}"이라고 되어 있으면, 그 정확한 표현을 이력서에 포함하세요
- **단순하고 읽기 쉬운 양식 사용** — 다단 레이아웃, 표, 텍스트 박스는 ATS 파서를 혼란시키므로 피하세요
- **중요한 스킬을 여러 섹션에 배치** — ${topSkills || '주요 스킬'}을 자기소개, 경력사항, 스킬 섹션 모두에 포함하세요
- **PDF 또는 DOCX 형식으로 제출** — 최신 ATS에서 가장 잘 지원되는 형식입니다
- **약어와 정식 명칭 모두 기재** — 예: "고객관계관리(CRM)"처럼 양쪽 검색 변형을 커버하세요
- **머리글과 바닥글 사용 금지** — 일부 ATS는 이 영역의 콘텐츠를 읽지 못합니다

## 관련 리소스

${jobTitle}의 지원 서류를 더욱 완성도 높게 만드세요:

- [ATS 적합성 검사기로 이력서 검증](/ko/tools/ats-checker) — 무료 ATS 분석 도구로 이력서 테스트
- [전문 이력서 샘플 모음](/ko/resume-examples) — 업계별 수백 개의 이력서 템플릿 열람
- [ATS 최적화 이력서 템플릿](/ko/templates) — 자동 필터를 통과하기 위한 최적화된 템플릿

${jobTitle}의 전문적이고 ATS 최적화된 이력서를 만드시겠습니까? [무료 이력서 작성 도구](/ko/builder)를 사용하여 몇 분 만에 인상적인 이력서를 만들어 보세요. 템플릿은 ATS에 최적화되어 있으며, 각 섹션 작성을 단계별로 안내합니다.
`;
}
