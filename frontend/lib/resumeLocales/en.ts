import { LocaleBundle } from './types';

const en: LocaleBundle = {
    localeData: {
        cities: ['New York', 'San Francisco', 'Chicago', 'Austin', 'Seattle'],
        country: 'USA',
        nationality: 'American',
        companies: {
            tech: ['TechCorp Solutions', 'InnovateTech Inc.', 'CloudWorks Systems', 'DataDriven Labs', 'AppForge Digital'],
            design: ['DesignHub Agency', 'CreativeStudio Pro', 'Pixel Perfect Design', 'UX Collective', 'Visual Arts Inc.'],
            marketing: ['GrowthMatrix Agency', 'Brand Elevate Co.', 'Digital Reach Marketing', 'Engage Media Group', 'Impact Marketing Solutions'],
            finance: ['Capital Advisors LLC', 'Sterling Financial Group', 'Apex Accounting Services', 'Investment Partners Inc.', 'Fiscal Solutions Corp'],
            healthcare: ['Metro General Hospital', 'Community Health Center', 'CarePlus Medical Group', 'Wellness Partners Clinic', 'Regional Medical Center'],
            education: ['Lincoln High School', 'Riverside Academy', 'State University', 'Community College District', 'Excellence Learning Center'],
            sales: ['Enterprise Solutions Inc.', 'Global Trade Partners', 'TechSales Pro', 'Business Growth Associates', 'Premier Sales Group'],
            hospitality: ['The Grand Hotel Restaurant', 'Bistro Elegance', 'Riverside Grill & Bar', 'Downtown Dining Co.', 'Coastal Kitchen'],
            general: ['Acme Corporation', 'Global Enterprises', 'Premier Solutions LLC', 'Innovative Industries', 'Excellence Partners'],
        },
        degrees: {
            tech: { degree: 'Bachelor of Science in Computer Science', school: 'University of Technology' },
            design: { degree: 'Bachelor of Fine Arts in Graphic Design', school: 'School of Design' },
            marketing: { degree: 'Bachelor of Business Administration in Marketing', school: 'State Business School' },
            finance: { degree: 'Bachelor of Science in Finance', school: 'College of Business' },
            healthcare: { degree: 'Bachelor of Science in Nursing', school: 'College of Health Sciences' },
            education: { degree: 'Bachelor of Arts in Education', school: 'State Teachers College' },
            sales: { degree: 'Bachelor of Business Administration', school: 'School of Business' },
            hospitality: { degree: 'Certificate in Hospitality Management', school: 'Culinary Institute' },
            general: { degree: 'Bachelor of Arts', school: 'State University' },
        },
        educationDescription: 'Graduated with honors. Active member of professional associations.',
        yearsText: (years) => years === 1 ? '1 year' : `${years}+ years`,
    },
    summaryTemplates: {
        tech: {
            entry: [
                'Motivated {jobTitle} with {years} of hands-on experience in software development. Passionate about writing clean, efficient code and learning new technologies. Eager to contribute to innovative projects and grow as a developer.',
                'Aspiring {jobTitle} with {years} of experience developing web applications and collaborating in agile environments. Quick learner who thrives on solving complex problems and writing maintainable, well-tested code.',
                'Detail-oriented {jobTitle} with {years} of experience in full-stack development. Skilled in modern frameworks and committed to continuous improvement through code reviews and best practices.',
            ],
            mid: [
                'Results-driven {jobTitle} with {years} of experience building scalable applications and leading technical initiatives. Proven track record of delivering high-quality solutions that improve system performance by up to 40%. Strong collaborator with cross-functional teams.',
                'Versatile {jobTitle} with {years} of experience designing and deploying cloud-native applications. Reduced infrastructure costs by 35% through architecture optimization while maintaining 99.9% uptime across production systems.',
                'Proactive {jobTitle} with {years} of experience delivering full-stack solutions from concept to production. Streamlined development workflows that cut release cycles by 50% and improved code quality metrics across the team.',
            ],
            senior: [
                'Experienced {jobTitle} with {years} of expertise in architecting and delivering enterprise-scale solutions. Led teams of 5+ developers, reducing deployment time by 60% through CI/CD implementation. Passionate about mentoring junior developers and driving technical excellence.',
                'Senior {jobTitle} with {years} of experience designing distributed systems handling millions of daily requests. Established engineering standards and mentored 10+ developers, resulting in a 45% reduction in production incidents.',
                'Technical leader and {jobTitle} with {years} of experience bridging business strategy and software architecture. Spearheaded platform migrations that improved performance by 70% and reduced operational costs by $500K annually.',
            ],
            executive: [
                'Strategic technology leader with {years} of experience driving digital transformation and technical innovation. Managed budgets exceeding $2M and teams of 20+ engineers. Successfully delivered projects that generated $10M+ in revenue growth.',
                'Visionary technology executive with {years} of experience aligning engineering roadmaps with business objectives. Built and scaled engineering organizations from 10 to 60+ engineers while delivering products that captured 25% market share.',
                'Transformative CTO-level leader with {years} of experience modernizing legacy platforms and establishing engineering excellence. Drove $15M+ in cost savings through strategic technology investments and process automation.',
            ],
        },
        design: {
            entry: [
                'Creative {jobTitle} with {years} of experience crafting user-centered designs. Skilled in modern design tools and passionate about creating intuitive, visually appealing interfaces.',
                'Imaginative {jobTitle} with {years} of experience translating user research into compelling visual designs. Proficient in Figma and Adobe Creative Suite with a strong eye for typography and color theory.',
                'Detail-driven {jobTitle} with {years} of experience building responsive designs and interactive prototypes. Passionate about accessibility and creating inclusive digital experiences for diverse audiences.',
            ],
            mid: [
                'Innovative {jobTitle} with {years} of experience creating user-centered digital experiences. Delivered designs that increased user engagement by 35% and reduced bounce rates by 25%.',
                'Strategic {jobTitle} with {years} of experience leading end-to-end design processes from research to pixel-perfect delivery. Redesigned core product flows that boosted conversion rates by 40% and earned industry recognition.',
                'Collaborative {jobTitle} with {years} of experience partnering with product and engineering teams to ship delightful user experiences. Built and maintained component libraries that reduced design-to-dev handoff time by 60%.',
            ],
            senior: [
                'Senior {jobTitle} with {years} of experience leading design teams and shaping product vision. Established design systems adopted across 10+ products, improving design consistency by 50%.',
                'Design leader with {years} of experience mentoring designers and defining brand identity across digital platforms. Led the redesign of flagship products serving 2M+ users, achieving a 45% improvement in task completion rates.',
                'Experienced {jobTitle} with {years} of expertise in strategic design thinking and cross-functional leadership. Established user research practices that informed $3M+ in product investment decisions.',
            ],
            executive: [
                'Design executive with {years} of experience building and leading world-class design organizations. Transformed design culture at Fortune 500 companies, driving $5M+ in cost savings.',
                'Chief Design Officer-level leader with {years} of experience elevating design as a strategic business function. Built design teams of 30+ across multiple product lines and geographies.',
                'Visionary design leader with {years} of experience driving brand transformation and product innovation. Established design-led culture that contributed to 60% improvement in Net Promoter Score.',
            ],
        },
        marketing: {
            entry: [
                'Enthusiastic {jobTitle} with {years} of experience in digital marketing. Skilled in content creation, social media management, and data analysis.',
                'Driven {jobTitle} with {years} of experience managing social media channels and email campaigns. Grew follower engagement by 45% through creative content strategies and A/B testing.',
                'Analytical {jobTitle} with {years} of experience supporting multi-channel marketing campaigns. Proficient in Google Analytics, SEO fundamentals, and marketing automation platforms.',
            ],
            mid: [
                'Data-driven {jobTitle} with {years} of experience executing campaigns that deliver measurable results. Increased organic traffic by 150% and improved conversion rates by 40%.',
                'Growth-focused {jobTitle} with {years} of experience optimizing paid and organic acquisition channels. Managed $200K+ monthly ad spend with consistent ROAS above 4x across Google and Meta platforms.',
                'Creative {jobTitle} with {years} of experience building brand awareness through integrated marketing campaigns. Launched product campaigns that generated 10K+ qualified leads per quarter.',
            ],
            senior: [
                'Strategic {jobTitle} with {years} of experience leading high-performing marketing teams. Managed $1M+ marketing budgets and delivered campaigns generating 200% ROI.',
                'Senior {jobTitle} with {years} of experience developing go-to-market strategies for product launches. Led teams of 8+ marketers and drove 60% year-over-year growth in marketing-qualified leads.',
                'Results-driven {jobTitle} with {years} of experience aligning marketing strategy with revenue goals. Built attribution models that optimized $3M+ annual marketing investment across channels.',
            ],
            executive: [
                'Marketing executive with {years} of experience driving revenue growth through innovative marketing strategies. Led global marketing teams and managed $10M+ budgets.',
                'CMO-level leader with {years} of experience scaling marketing organizations and building iconic brands. Drove 80% revenue growth through data-driven demand generation and brand positioning.',
                'Transformative marketing leader with {years} of experience unifying brand, product marketing, and growth teams. Built marketing functions from the ground up, scaling pipeline from $2M to $25M annually.',
            ],
        },
        finance: {
            entry: [
                'Detail-oriented {jobTitle} with {years} of experience in financial analysis and reporting. Strong foundation in accounting principles and financial software.',
                'Diligent {jobTitle} with {years} of experience supporting budgeting, forecasting, and variance analysis. Proficient in Excel modeling, QuickBooks, and ERP systems with a commitment to accuracy.',
                'Analytical {jobTitle} with {years} of experience in accounts reconciliation and financial reporting. Prepared monthly close deliverables and assisted in audit preparation for a $10M+ organization.',
            ],
            mid: [
                'Analytical {jobTitle} with {years} of experience in financial planning and analysis. Identified cost-saving opportunities resulting in $500K+ annual savings.',
                'Results-oriented {jobTitle} with {years} of experience building financial models that drive strategic decision-making. Streamlined reporting processes that reduced month-end close by 3 days and improved forecast accuracy by 20%.',
                'Strategic {jobTitle} with {years} of experience managing P&L analysis and capital allocation recommendations. Partnered with department heads to optimize $5M+ operating budgets across multiple cost centers.',
            ],
            senior: [
                'Senior {jobTitle} with {years} of experience leading financial operations and strategy. Managed portfolios worth $50M+ and led teams through successful audits.',
                'Accomplished {jobTitle} with {years} of experience overseeing financial planning, treasury, and compliance functions. Implemented controls and processes that achieved zero material findings across 4 consecutive annual audits.',
                'Senior {jobTitle} with {years} of experience driving profitability through data-driven financial strategy. Led cross-functional initiatives that improved gross margins by 8 percentage points.',
            ],
            executive: [
                'Finance executive with {years} of experience driving financial strategy and operational excellence. Led M&A transactions totaling $100M+ and improved EBITDA margins by 15%.',
                'CFO-level leader with {years} of experience steering financial strategy through growth phases and market disruptions. Raised $50M+ in capital and guided organizations through successful IPO preparation.',
                'Transformative finance leader with {years} of experience building world-class finance organizations. Drove 40% improvement in working capital efficiency while scaling operations across 5 international markets.',
            ],
        },
        healthcare: {
            entry: [
                'Compassionate {jobTitle} with {years} of clinical experience providing patient-centered care. Committed to maintaining high standards of care.',
                'Dedicated {jobTitle} with {years} of experience delivering quality care in fast-paced clinical settings. Skilled in patient assessment, vital signs monitoring, and electronic health record documentation.',
                'Caring {jobTitle} with {years} of hands-on clinical experience in acute care environments. Known for building strong patient rapport and collaborating effectively with interdisciplinary care teams.',
            ],
            mid: [
                'Dedicated {jobTitle} with {years} of experience delivering high-quality patient care. Improved patient satisfaction scores by 30% through enhanced communication protocols.',
                'Skilled {jobTitle} with {years} of experience managing complex patient caseloads in high-acuity settings. Reduced medication errors by 25% through implementation of evidence-based safety protocols.',
                'Patient-focused {jobTitle} with {years} of clinical experience across emergency, surgical, and outpatient departments. Trained 8+ new staff members and contributed to quality improvement initiatives.',
            ],
            senior: [
                'Experienced {jobTitle} with {years} of clinical expertise and leadership experience. Led quality improvement initiatives reducing hospital readmissions by 20%.',
                'Senior {jobTitle} with {years} of experience supervising clinical teams and implementing evidence-based care standards. Achieved top 10% patient satisfaction rankings and reduced falls by 35% through proactive safety protocols.',
                'Clinical leader and {jobTitle} with {years} of experience bridging bedside care with administrative excellence. Developed staff training programs that improved retention by 25% and reduced onboarding time by 40%.',
            ],
            executive: [
                'Healthcare executive with {years} of experience transforming clinical operations and patient outcomes. Led departments of 50+ staff and managed $5M+ budgets.',
                'Visionary healthcare leader with {years} of experience driving operational transformation and regulatory compliance. Achieved Magnet designation and improved CMS quality scores by 30% across service lines.',
                'Strategic healthcare executive with {years} of experience launching new service lines and expanding community health programs. Grew department revenue by $8M while maintaining top-quartile patient outcomes.',
            ],
        },
        education: {
            entry: [
                'Passionate {jobTitle} with {years} of teaching experience committed to student success. Skilled in creating engaging lesson plans and fostering inclusive learning environments.',
                'Enthusiastic {jobTitle} with {years} of experience developing standards-aligned curriculum and integrating technology in the classroom. Recognized for building strong relationships with students and families.',
                'Dedicated {jobTitle} with {years} of experience supporting diverse learners through differentiated instruction. Proficient in classroom management strategies and formative assessment techniques.',
            ],
            mid: [
                'Innovative {jobTitle} with {years} of experience developing curriculum that engages diverse learners. Improved student test scores by 25% through differentiated instruction strategies.',
                'Resourceful {jobTitle} with {years} of experience blending project-based learning with data-driven instruction. Led grade-level teams and piloted programs that closed achievement gaps by 15% among underserved students.',
                'Dynamic {jobTitle} with {years} of experience integrating STEM initiatives and social-emotional learning into core curriculum. Mentored 5+ student teachers and contributed to school-wide improvement plans.',
            ],
            senior: [
                'Veteran {jobTitle} with {years} of experience shaping educational outcomes and mentoring colleagues. Developed award-winning programs adopted district-wide.',
                'Senior {jobTitle} with {years} of experience in curriculum leadership and instructional coaching. Trained 40+ educators on evidence-based practices that raised school performance ratings from C to A.',
                'Experienced {jobTitle} with {years} of expertise in program development and academic assessment. Led accreditation processes and secured grants totaling $500K+ for innovative educational initiatives.',
            ],
            executive: [
                'Education leader with {years} of experience driving institutional excellence. Secured $2M+ in grants and led accreditation processes.',
                'Strategic education executive with {years} of experience overseeing K-12 operations and policy implementation. Managed budgets of $15M+ and led district-wide initiatives that improved graduation rates by 12%.',
                'Transformative education leader with {years} of experience building partnerships between schools, families, and community organizations. Expanded access programs serving 5,000+ students across underserved communities.',
            ],
        },
        sales: {
            entry: [
                'Motivated {jobTitle} with {years} of experience in business development. Strong communication skills and customer focus. Eager to exceed targets.',
                'Energetic {jobTitle} with {years} of experience building client relationships and qualifying leads. Consistently met or exceeded monthly activity targets in competitive B2B environments.',
                'Goal-oriented {jobTitle} with {years} of experience in outbound prospecting and pipeline management. Closed $300K+ in new business within the first year through consultative selling techniques.',
            ],
            mid: [
                'Results-oriented {jobTitle} with {years} of experience consistently exceeding quotas. Generated $2M+ in new business revenue and maintained 95% client retention rate.',
                'Consultative {jobTitle} with {years} of experience managing full-cycle enterprise sales. Expanded key accounts by 60% and shortened sales cycles by 20% through strategic relationship building.',
                'Driven {jobTitle} with {years} of experience in SaaS and solution selling. Built a $3M pipeline from scratch and consistently ranked in the top 15% of the sales organization.',
            ],
            senior: [
                'High-performing {jobTitle} with {years} of experience leading sales teams and driving revenue growth. Managed territories generating $10M+ annually.',
                'Senior {jobTitle} with {years} of experience coaching sales teams and developing go-to-market strategies. Grew regional revenue by 45% year-over-year while building a team of 12 high-performing reps.',
                'Strategic {jobTitle} with {years} of experience in enterprise account management and channel partnerships. Negotiated multi-year contracts worth $5M+ and expanded into 4 new vertical markets.',
            ],
            executive: [
                'Sales executive with {years} of experience building and scaling high-performance sales organizations. Grew revenue from $5M to $50M and expanded into 3 new markets.',
                'VP-level sales leader with {years} of experience transforming sales operations and building global revenue engines. Managed 50+ person teams across 4 regions and consistently achieved 120%+ of annual targets.',
                'Transformative sales executive with {years} of experience aligning sales strategy with corporate growth objectives. Led organizations through $100M+ in cumulative bookings and established partner ecosystems generating 30% of total revenue.',
            ],
        },
        hospitality: {
            entry: [
                'Friendly and energetic {jobTitle} with {years} of experience in fast-paced dining environments. Committed to delivering exceptional customer service.',
                'Reliable {jobTitle} with {years} of experience serving guests in high-volume restaurants. Known for positive attitude, strong menu knowledge, and ability to handle 20+ tables per shift.',
                'Customer-focused {jobTitle} with {years} of experience in food service and guest relations. Skilled in POS systems, upselling techniques, and maintaining clean, welcoming dining spaces.',
            ],
            mid: [
                'Dedicated {jobTitle} with {years} of experience providing outstanding service in high-volume restaurants. Maintained 98% customer satisfaction ratings.',
                'Experienced {jobTitle} with {years} of expertise in high-end dining and event coordination. Increased average check size by 20% through menu recommendations and upselling, consistently earning top performer recognition.',
                'Versatile {jobTitle} with {years} of experience across fine dining, catering, and bar operations. Trained 10+ new team members and contributed to a 15% improvement in table turnover rates.',
            ],
            senior: [
                'Experienced {jobTitle} with {years} of expertise in fine dining and high-volume establishments. Trained and mentored 15+ staff members.',
                'Senior {jobTitle} with {years} of experience managing front-of-house operations and delivering five-star guest experiences. Reduced staff turnover by 30% through mentorship and improved scheduling practices.',
                'Seasoned {jobTitle} with {years} of experience in restaurant management and beverage program development. Designed seasonal menus that increased food revenue by 25% and earned local dining awards.',
            ],
            executive: [
                'Hospitality professional with {years} of experience managing restaurant operations. Oversaw teams of 30+ staff and increased revenue by 40%.',
                'Hospitality executive with {years} of experience launching and scaling multi-unit restaurant concepts. Managed P&L for 5+ locations with combined revenue of $12M and achieved 15% profit margin growth.',
                'Strategic hospitality leader with {years} of experience in brand development, franchise operations, and guest experience innovation. Grew portfolio from 2 to 8 locations while maintaining 4.5+ star average ratings.',
            ],
        },
        general: {
            entry: [
                'Motivated {jobTitle} with {years} of professional experience. Strong work ethic, excellent communication skills, and commitment to delivering quality results.',
                'Dependable {jobTitle} with {years} of experience contributing to team objectives in fast-paced environments. Quick learner with strong organizational skills and attention to detail.',
                'Adaptable {jobTitle} with {years} of experience across multiple projects and responsibilities. Recognized for reliability, problem-solving ability, and willingness to take initiative.',
            ],
            mid: [
                'Accomplished {jobTitle} with {years} of experience driving operational excellence. Improved team efficiency by 30% through process optimization.',
                'Resourceful {jobTitle} with {years} of experience managing projects and improving workflows. Delivered initiatives on time and under budget, saving the organization $200K+ annually through process improvements.',
                'Proactive {jobTitle} with {years} of experience collaborating across departments to achieve business goals. Led cross-functional projects that increased stakeholder satisfaction by 35%.',
            ],
            senior: [
                'Seasoned {jobTitle} with {years} of experience leading teams and strategic initiatives. Successfully managed projects with budgets up to $1M.',
                'Senior {jobTitle} with {years} of experience driving organizational improvement and mentoring high-performing teams. Implemented operational changes that reduced costs by 20% while increasing output quality.',
                'Experienced {jobTitle} with {years} of expertise in strategic planning and stakeholder management. Led 15+ cross-departmental projects with a 95% on-time delivery rate.',
            ],
            executive: [
                'Executive leader with {years} of experience driving organizational transformation. Led teams of 50+ and managed P&L responsibility of $20M+.',
                'C-suite professional with {years} of experience building scalable operations and high-performance cultures. Grew organizations through multiple phases of expansion while maintaining employee satisfaction above 85%.',
                'Visionary executive with {years} of experience aligning organizational strategy with market opportunities. Delivered $30M+ in cumulative revenue growth and established governance frameworks across 3 business units.',
            ],
        },
    },
    jobDescriptions: {
        tech: [
            [
                '• Led development of microservices architecture, improving system scalability by 300%',
                '• Implemented CI/CD pipelines reducing deployment time from 2 hours to 15 minutes',
                '• Mentored team of 5 junior developers, conducting code reviews and technical training',
                '• Collaborated with product managers to define technical requirements and sprint planning',
                '• Reduced application load time by 40% through performance optimization',
            ],
            [
                '• Developed RESTful APIs serving 1M+ daily requests with 99.9% uptime',
                '• Built responsive web applications using React and TypeScript',
                '• Integrated third-party services and payment gateways',
                '• Participated in agile ceremonies and contributed to sprint planning',
            ],
            [
                '• Contributed to codebase maintenance and bug fixes',
                '• Assisted senior developers with feature implementation',
                '• Wrote unit tests improving code coverage by 25%',
            ],
        ],
        design: [
            [
                '• Led design team of 5 designers in creating user-centered digital products',
                '• Established design system and component library used across 10+ projects',
                '• Increased user engagement by 40% through UX improvements',
                '• Conducted user research and usability testing with 100+ participants',
                '• Presented design concepts to stakeholders and incorporated feedback',
            ],
            [
                '• Designed mobile and web applications for iOS and Android platforms',
                '• Created wireframes, prototypes, and high-fidelity mockups',
                '• Collaborated with developers to ensure design implementation accuracy',
                '• Improved conversion rates by 35% through A/B testing',
            ],
            [
                '• Assisted in creating visual designs for marketing campaigns',
                '• Maintained brand consistency across all design deliverables',
                '• Supported senior designers with asset creation',
            ],
        ],
        marketing: [
            [
                '• Developed and executed marketing strategies resulting in 200% ROI',
                '• Managed $500K+ annual marketing budget across digital channels',
                '• Led team of 4 marketers in campaign planning and execution',
                '• Increased organic traffic by 150% through SEO optimization',
                '• Built partnerships with influencers reaching 2M+ audience',
            ],
            [
                '• Created content strategy driving 100K+ monthly blog visitors',
                '• Managed social media accounts growing followers by 300%',
                '• Executed email campaigns with 35% open rate and 15% CTR',
                '• Analyzed campaign performance and optimized based on data',
            ],
            [
                '• Assisted in social media content creation and scheduling',
                '• Supported team with market research and competitive analysis',
                '• Helped organize marketing events and webinars',
            ],
        ],
        finance: [
            [
                '• Managed financial planning and analysis for $50M+ business unit',
                '• Led annual budgeting process and quarterly forecasting',
                '• Identified cost-saving opportunities resulting in $1M+ savings',
                '• Presented financial reports to executive leadership',
                '• Supervised team of 3 analysts and coordinated audit processes',
            ],
            [
                '• Prepared monthly financial statements and variance analysis',
                '• Developed financial models for business planning',
                '• Streamlined reporting processes reducing close time by 30%',
                '• Supported M&A due diligence and integration',
            ],
            [
                '• Assisted with accounts payable and receivable processing',
                '• Reconciled bank statements and general ledger accounts',
                '• Supported senior accountants with month-end close',
            ],
        ],
        healthcare: [
            [
                '• Supervised nursing staff of 15+ in providing patient care',
                '• Implemented quality improvement initiatives reducing errors by 40%',
                '• Coordinated patient care plans with interdisciplinary team',
                '• Maintained compliance with HIPAA and regulatory requirements',
                '• Trained new staff on protocols and best practices',
            ],
            [
                '• Provided direct patient care for 10+ patients daily',
                '• Administered medications and monitored patient conditions',
                '• Documented patient information in EMR systems accurately',
                '• Collaborated with physicians on treatment plans',
            ],
            [
                '• Assisted with patient intake and vital sign monitoring',
                '• Supported nursing staff with daily care activities',
                '• Maintained clean and organized patient environments',
            ],
        ],
        education: [
            [
                '• Developed curriculum adopted across district serving 5,000+ students',
                '• Mentored 10+ teachers in implementing new instructional strategies',
                '• Improved student achievement scores by 25% over 3 years',
                '• Led professional development workshops and training sessions',
                '• Secured $100K+ in grants for educational programs',
            ],
            [
                '• Taught classes of 25+ students across multiple grade levels',
                '• Created engaging lesson plans aligned with state standards',
                '• Implemented differentiated instruction for diverse learners',
                '• Communicated regularly with parents on student progress',
            ],
            [
                '• Assisted lead teachers with classroom instruction',
                '• Supported students with individual and small group tutoring',
                '• Helped maintain classroom organization and materials',
            ],
        ],
        sales: [
            [
                '• Exceeded annual quota by 150%, generating $5M+ in revenue',
                '• Built and managed team of 8 sales representatives',
                '• Developed strategic account plans for enterprise clients',
                '• Negotiated contracts valued at $500K+ with C-level executives',
                '• Implemented CRM processes improving forecast accuracy by 40%',
            ],
            [
                '• Achieved 120% of quota consistently for 8 consecutive quarters',
                '• Managed pipeline of 50+ opportunities worth $2M+',
                '• Conducted product demonstrations and presentations',
                '• Maintained 95% client retention rate through relationship management',
            ],
            [
                '• Generated leads through cold calling and networking',
                '• Assisted senior representatives with client meetings',
                '• Maintained accurate records in CRM system',
            ],
        ],
        hospitality: [
            [
                '• Supervised team of 10+ servers ensuring consistent service quality',
                '• Trained new staff on menu items, POS systems, and service standards',
                '• Resolved customer complaints professionally, maintaining 95% satisfaction rate',
                '• Coordinated with kitchen staff to ensure timely food delivery',
                '• Managed section of 8+ tables during peak hours serving 100+ guests daily',
            ],
            [
                '• Provided excellent table service in fast-paced 200-seat restaurant',
                '• Increased average check size by 20% through effective upselling',
                '• Memorized extensive menu including daily specials and wine pairings',
                '• Processed payments accurately handling $500+ in daily transactions',
            ],
            [
                '• Greeted and seated guests ensuring positive first impressions',
                '• Took accurate food and beverage orders using POS system',
                '• Maintained clean and organized dining area throughout shifts',
            ],
        ],
        general: [
            [
                '• Led cross-functional team of 10+ members on strategic initiatives',
                '• Managed projects with budgets up to $500K and delivered on time',
                '• Improved operational efficiency by 30% through process optimization',
                '• Developed and implemented departmental policies and procedures',
                '• Presented quarterly reports to senior leadership',
            ],
            [
                '• Coordinated daily operations and workflow management',
                '• Collaborated with stakeholders to meet project deadlines',
                '• Analyzed data to identify trends and improvement opportunities',
                '• Trained new team members on processes and systems',
            ],
            [
                '• Supported team with administrative and operational tasks',
                '• Assisted with data entry and report preparation',
                '• Helped organize team meetings and events',
            ],
        ],
    },
    masterDegree: { tech: 'Master of Science in Computer Science', business: 'Master of Business Administration', school: 'Graduate School of Business' },
    phoneFormat: '+1 (555) 000-0000',
    titlePrefixes: { senior: 'Senior', lead: 'Lead', director: 'Director of' },
    skillNames: {
        tech: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'SQL', 'Git', 'AWS', 'Docker', 'REST APIs'],
        design: ['Figma', 'Adobe XD', 'Sketch', 'Photoshop', 'Illustrator', 'Prototyping', 'User Research', 'Wireframing', 'Design Systems', 'Typography'],
        marketing: ['SEO', 'Google Analytics', 'Content Strategy', 'Social Media', 'Email Marketing', 'PPC', 'CRM', 'Copywriting', 'A/B Testing', 'HubSpot'],
        finance: ['Financial Analysis', 'Excel', 'QuickBooks', 'SAP', 'Budgeting', 'Forecasting', 'GAAP', 'Auditing', 'Risk Management', 'Financial Modeling'],
        healthcare: ['Patient Care', 'EMR Systems', 'HIPAA Compliance', 'Clinical Assessment', 'Care Planning', 'Medical Terminology', 'Patient Education', 'Team Collaboration', 'Documentation', 'Critical Thinking'],
        education: ['Curriculum Development', 'Classroom Management', 'Student Assessment', 'Differentiated Instruction', 'Educational Technology', 'Lesson Planning', 'Communication', 'Mentoring', 'Special Education', 'Parent Relations'],
        sales: ['CRM Software', 'Lead Generation', 'Negotiation', 'Cold Calling', 'Pipeline Management', 'Salesforce', 'Account Management', 'Presentation Skills', 'Closing Deals', 'Client Relations'],
        hospitality: ['Customer Service', 'POS Systems', 'Food Safety', 'Cash Handling', 'Menu Knowledge', 'Team Collaboration', 'Multitasking', 'Communication', 'Time Management', 'Conflict Resolution'],
        general: ['Project Management', 'Communication', 'Problem Solving', 'Team Leadership', 'Microsoft Office', 'Time Management', 'Critical Thinking', 'Adaptability', 'Collaboration', 'Organization'],
    },
    languages: [
        { name: 'English', proficiency: 'native', level: 100 },
        { name: 'Spanish', proficiency: 'fluent', level: 80 },
        { name: 'French', proficiency: 'intermediate', level: 55 },
    ],
    interests: ['Photography', 'Travel', 'Reading', 'Cooking', 'Hiking', 'Music'],
    strengths: ['Leadership', 'Communication', 'Problem Solving', 'Teamwork'],
    proficiencyLabels: { native: 'Native', fluent: 'Fluent', intermediate: 'Intermediate' },
};

export default en;
