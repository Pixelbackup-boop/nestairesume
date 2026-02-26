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
            entry: 'Motivated {jobTitle} with {years} of hands-on experience in software development. Passionate about writing clean, efficient code and learning new technologies. Eager to contribute to innovative projects and grow as a developer.',
            mid: 'Results-driven {jobTitle} with {years} of experience building scalable applications and leading technical initiatives. Proven track record of delivering high-quality solutions that improve system performance by up to 40%. Strong collaborator with cross-functional teams.',
            senior: 'Experienced {jobTitle} with {years} of expertise in architecting and delivering enterprise-scale solutions. Led teams of 5+ developers, reducing deployment time by 60% through CI/CD implementation. Passionate about mentoring junior developers and driving technical excellence.',
            executive: 'Strategic technology leader with {years} of experience driving digital transformation and technical innovation. Managed budgets exceeding $2M and teams of 20+ engineers. Successfully delivered projects that generated $10M+ in revenue growth.',
        },
        design: {
            entry: 'Creative {jobTitle} with {years} of experience crafting user-centered designs. Skilled in modern design tools and passionate about creating intuitive, visually appealing interfaces.',
            mid: 'Innovative {jobTitle} with {years} of experience creating user-centered digital experiences. Delivered designs that increased user engagement by 35% and reduced bounce rates by 25%.',
            senior: 'Senior {jobTitle} with {years} of experience leading design teams and shaping product vision. Established design systems adopted across 10+ products, improving design consistency by 50%.',
            executive: 'Design executive with {years} of experience building and leading world-class design organizations. Transformed design culture at Fortune 500 companies, driving $5M+ in cost savings.',
        },
        marketing: {
            entry: 'Enthusiastic {jobTitle} with {years} of experience in digital marketing. Skilled in content creation, social media management, and data analysis.',
            mid: 'Data-driven {jobTitle} with {years} of experience executing campaigns that deliver measurable results. Increased organic traffic by 150% and improved conversion rates by 40%.',
            senior: 'Strategic {jobTitle} with {years} of experience leading high-performing marketing teams. Managed $1M+ marketing budgets and delivered campaigns generating 200% ROI.',
            executive: 'Marketing executive with {years} of experience driving revenue growth through innovative marketing strategies. Led global marketing teams and managed $10M+ budgets.',
        },
        finance: {
            entry: 'Detail-oriented {jobTitle} with {years} of experience in financial analysis and reporting. Strong foundation in accounting principles and financial software.',
            mid: 'Analytical {jobTitle} with {years} of experience in financial planning and analysis. Identified cost-saving opportunities resulting in $500K+ annual savings.',
            senior: 'Senior {jobTitle} with {years} of experience leading financial operations and strategy. Managed portfolios worth $50M+ and led teams through successful audits.',
            executive: 'Finance executive with {years} of experience driving financial strategy and operational excellence. Led M&A transactions totaling $100M+ and improved EBITDA margins by 15%.',
        },
        healthcare: {
            entry: 'Compassionate {jobTitle} with {years} of clinical experience providing patient-centered care. Committed to maintaining high standards of care.',
            mid: 'Dedicated {jobTitle} with {years} of experience delivering high-quality patient care. Improved patient satisfaction scores by 30% through enhanced communication protocols.',
            senior: 'Experienced {jobTitle} with {years} of clinical expertise and leadership experience. Led quality improvement initiatives reducing hospital readmissions by 20%.',
            executive: 'Healthcare executive with {years} of experience transforming clinical operations and patient outcomes. Led departments of 50+ staff and managed $5M+ budgets.',
        },
        education: {
            entry: 'Passionate {jobTitle} with {years} of teaching experience committed to student success. Skilled in creating engaging lesson plans and fostering inclusive learning environments.',
            mid: 'Innovative {jobTitle} with {years} of experience developing curriculum that engages diverse learners. Improved student test scores by 25% through differentiated instruction strategies.',
            senior: 'Veteran {jobTitle} with {years} of experience shaping educational outcomes and mentoring colleagues. Developed award-winning programs adopted district-wide.',
            executive: 'Education leader with {years} of experience driving institutional excellence. Secured $2M+ in grants and led accreditation processes.',
        },
        sales: {
            entry: 'Motivated {jobTitle} with {years} of experience in business development. Strong communication skills and customer focus. Eager to exceed targets.',
            mid: 'Results-oriented {jobTitle} with {years} of experience consistently exceeding quotas. Generated $2M+ in new business revenue and maintained 95% client retention rate.',
            senior: 'High-performing {jobTitle} with {years} of experience leading sales teams and driving revenue growth. Managed territories generating $10M+ annually.',
            executive: 'Sales executive with {years} of experience building and scaling high-performance sales organizations. Grew revenue from $5M to $50M and expanded into 3 new markets.',
        },
        hospitality: {
            entry: 'Friendly and energetic {jobTitle} with {years} of experience in fast-paced dining environments. Committed to delivering exceptional customer service.',
            mid: 'Dedicated {jobTitle} with {years} of experience providing outstanding service in high-volume restaurants. Maintained 98% customer satisfaction ratings.',
            senior: 'Experienced {jobTitle} with {years} of expertise in fine dining and high-volume establishments. Trained and mentored 15+ staff members.',
            executive: 'Hospitality professional with {years} of experience managing restaurant operations. Oversaw teams of 30+ staff and increased revenue by 40%.',
        },
        general: {
            entry: 'Motivated {jobTitle} with {years} of professional experience. Strong work ethic, excellent communication skills, and commitment to delivering quality results.',
            mid: 'Accomplished {jobTitle} with {years} of experience driving operational excellence. Improved team efficiency by 30% through process optimization.',
            senior: 'Seasoned {jobTitle} with {years} of experience leading teams and strategic initiatives. Successfully managed projects with budgets up to $1M.',
            executive: 'Executive leader with {years} of experience driving organizational transformation. Led teams of 50+ and managed P&L responsibility of $20M+.',
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
};

export default en;
