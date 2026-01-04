/**
 * AI Resume Generator
 *
 * Generates professional resume content based on user's name and job title.
 * Currently uses smart templates with job-specific content.
 * Can be extended to use real AI APIs (OpenAI, Claude) in the future.
 */

import { ResumeData, Experience, Education, Skill } from '../store/useResumeStore';

export interface OnboardingInput {
    fullName: string;
    jobTitle: string;
    experienceLevel: 'entry' | 'mid' | 'senior' | 'executive';
}

// Job category detection for generating relevant content
type JobCategory = 'tech' | 'design' | 'marketing' | 'finance' | 'healthcare' | 'education' | 'sales' | 'general';

function detectJobCategory(jobTitle: string): JobCategory {
    const title = jobTitle.toLowerCase();

    if (/developer|engineer|programmer|software|devops|data|architect|backend|frontend|fullstack|ml|ai/.test(title)) {
        return 'tech';
    }
    if (/designer|ux|ui|graphic|creative|artist|visual/.test(title)) {
        return 'design';
    }
    if (/marketing|seo|content|social media|brand|growth|digital/.test(title)) {
        return 'marketing';
    }
    if (/accountant|finance|analyst|investment|banking|cfo|controller/.test(title)) {
        return 'finance';
    }
    if (/nurse|doctor|medical|healthcare|physician|therapist|clinical/.test(title)) {
        return 'healthcare';
    }
    if (/teacher|professor|instructor|educator|tutor|academic/.test(title)) {
        return 'education';
    }
    if (/sales|account executive|business development|representative/.test(title)) {
        return 'sales';
    }
    return 'general';
}

// Experience years based on level
const experienceYears: Record<OnboardingInput['experienceLevel'], number> = {
    entry: 1,
    mid: 4,
    senior: 8,
    executive: 15,
};

// Job-specific skill sets
const skillsByCategory: Record<JobCategory, string[]> = {
    tech: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'SQL', 'Git', 'AWS', 'Docker', 'REST APIs'],
    design: ['Figma', 'Adobe XD', 'Sketch', 'Photoshop', 'Illustrator', 'Prototyping', 'User Research', 'Wireframing', 'Design Systems', 'Typography'],
    marketing: ['SEO', 'Google Analytics', 'Content Strategy', 'Social Media', 'Email Marketing', 'PPC', 'CRM', 'Copywriting', 'A/B Testing', 'HubSpot'],
    finance: ['Financial Analysis', 'Excel', 'QuickBooks', 'SAP', 'Budgeting', 'Forecasting', 'GAAP', 'Auditing', 'Risk Management', 'Financial Modeling'],
    healthcare: ['Patient Care', 'EMR Systems', 'HIPAA Compliance', 'Clinical Assessment', 'Care Planning', 'Medical Terminology', 'Patient Education', 'Team Collaboration', 'Documentation', 'Critical Thinking'],
    education: ['Curriculum Development', 'Classroom Management', 'Student Assessment', 'Differentiated Instruction', 'Educational Technology', 'Lesson Planning', 'Communication', 'Mentoring', 'Special Education', 'Parent Relations'],
    sales: ['CRM Software', 'Lead Generation', 'Negotiation', 'Cold Calling', 'Pipeline Management', 'Salesforce', 'Account Management', 'Presentation Skills', 'Closing Deals', 'Client Relations'],
    general: ['Project Management', 'Communication', 'Problem Solving', 'Team Leadership', 'Microsoft Office', 'Time Management', 'Critical Thinking', 'Adaptability', 'Collaboration', 'Organization'],
};

// Professional summaries by category and level
function generateSummary(input: OnboardingInput, category: JobCategory): string {
    const years = experienceYears[input.experienceLevel];
    const yearsText = years === 1 ? '1 year' : `${years}+ years`;

    const summaries: Record<JobCategory, Record<OnboardingInput['experienceLevel'], string>> = {
        tech: {
            entry: `Motivated ${input.jobTitle} with ${yearsText} of hands-on experience in software development. Passionate about writing clean, efficient code and learning new technologies. Eager to contribute to innovative projects and grow as a developer.`,
            mid: `Results-driven ${input.jobTitle} with ${yearsText} of experience building scalable applications and leading technical initiatives. Proven track record of delivering high-quality solutions that improve system performance by up to 40%. Strong collaborator with cross-functional teams.`,
            senior: `Experienced ${input.jobTitle} with ${yearsText} of expertise in architecting and delivering enterprise-scale solutions. Led teams of 5+ developers, reducing deployment time by 60% through CI/CD implementation. Passionate about mentoring junior developers and driving technical excellence.`,
            executive: `Strategic technology leader with ${yearsText} of experience driving digital transformation and technical innovation. Managed budgets exceeding $2M and teams of 20+ engineers. Successfully delivered projects that generated $10M+ in revenue growth.`,
        },
        design: {
            entry: `Creative ${input.jobTitle} with ${yearsText} of experience crafting user-centered designs. Skilled in modern design tools and passionate about creating intuitive, visually appealing interfaces. Eager to contribute fresh perspectives to design challenges.`,
            mid: `Innovative ${input.jobTitle} with ${yearsText} of experience creating user-centered digital experiences. Delivered designs that increased user engagement by 35% and reduced bounce rates by 25%. Proficient in design systems and collaborative design processes.`,
            senior: `Senior ${input.jobTitle} with ${yearsText} of experience leading design teams and shaping product vision. Established design systems adopted across 10+ products, improving design consistency by 50%. Expert in translating business goals into compelling user experiences.`,
            executive: `Design executive with ${yearsText} of experience building and leading world-class design organizations. Transformed design culture at Fortune 500 companies, driving $5M+ in cost savings through design optimization. Champion of user-centered innovation.`,
        },
        marketing: {
            entry: `Enthusiastic ${input.jobTitle} with ${yearsText} of experience in digital marketing. Skilled in content creation, social media management, and data analysis. Eager to drive brand growth and engage target audiences.`,
            mid: `Data-driven ${input.jobTitle} with ${yearsText} of experience executing campaigns that deliver measurable results. Increased organic traffic by 150% and improved conversion rates by 40%. Skilled in SEO, content strategy, and marketing automation.`,
            senior: `Strategic ${input.jobTitle} with ${yearsText} of experience leading high-performing marketing teams. Managed $1M+ marketing budgets and delivered campaigns generating 200% ROI. Expert in brand building and go-to-market strategies.`,
            executive: `Marketing executive with ${yearsText} of experience driving revenue growth through innovative marketing strategies. Led global marketing teams and managed $10M+ budgets. Delivered campaigns that increased market share by 25%.`,
        },
        finance: {
            entry: `Detail-oriented ${input.jobTitle} with ${yearsText} of experience in financial analysis and reporting. Strong foundation in accounting principles and financial software. Committed to accuracy and continuous learning.`,
            mid: `Analytical ${input.jobTitle} with ${yearsText} of experience in financial planning and analysis. Identified cost-saving opportunities resulting in $500K+ annual savings. Skilled in financial modeling and strategic forecasting.`,
            senior: `Senior ${input.jobTitle} with ${yearsText} of experience leading financial operations and strategy. Managed portfolios worth $50M+ and led teams through successful audits. Expert in regulatory compliance and risk management.`,
            executive: `Finance executive with ${yearsText} of experience driving financial strategy and operational excellence. Led M&A transactions totaling $100M+ and improved EBITDA margins by 15%. Strategic partner to C-suite leadership.`,
        },
        healthcare: {
            entry: `Compassionate ${input.jobTitle} with ${yearsText} of clinical experience providing patient-centered care. Committed to maintaining high standards of care and continuous professional development.`,
            mid: `Dedicated ${input.jobTitle} with ${yearsText} of experience delivering high-quality patient care. Improved patient satisfaction scores by 30% through enhanced communication protocols. Skilled in EMR systems and care coordination.`,
            senior: `Experienced ${input.jobTitle} with ${yearsText} of clinical expertise and leadership experience. Led quality improvement initiatives reducing hospital readmissions by 20%. Mentor to junior staff and champion of evidence-based practice.`,
            executive: `Healthcare executive with ${yearsText} of experience transforming clinical operations and patient outcomes. Led departments of 50+ staff and managed $5M+ budgets. Pioneered telehealth programs serving 10,000+ patients.`,
        },
        education: {
            entry: `Passionate ${input.jobTitle} with ${yearsText} of teaching experience committed to student success. Skilled in creating engaging lesson plans and fostering inclusive learning environments.`,
            mid: `Innovative ${input.jobTitle} with ${yearsText} of experience developing curriculum that engages diverse learners. Improved student test scores by 25% through differentiated instruction strategies. Active contributor to professional learning communities.`,
            senior: `Veteran ${input.jobTitle} with ${yearsText} of experience shaping educational outcomes and mentoring colleagues. Developed award-winning programs adopted district-wide. Expert in educational technology integration.`,
            executive: `Education leader with ${yearsText} of experience driving institutional excellence. Secured $2M+ in grants and led accreditation processes. Transformed educational programs serving 5,000+ students.`,
        },
        sales: {
            entry: `Motivated ${input.jobTitle} with ${yearsText} of experience in business development. Strong communication skills and customer focus. Eager to exceed targets and build lasting client relationships.`,
            mid: `Results-oriented ${input.jobTitle} with ${yearsText} of experience consistently exceeding quotas. Generated $2M+ in new business revenue and maintained 95% client retention rate. Skilled in consultative selling and CRM tools.`,
            senior: `High-performing ${input.jobTitle} with ${yearsText} of experience leading sales teams and driving revenue growth. Managed territories generating $10M+ annually and mentored 10+ sales representatives. Expert in complex B2B sales cycles.`,
            executive: `Sales executive with ${yearsText} of experience building and scaling high-performance sales organizations. Grew revenue from $5M to $50M and expanded into 3 new markets. Strategic partner development and enterprise account management.`,
        },
        general: {
            entry: `Motivated ${input.jobTitle} with ${yearsText} of professional experience. Strong work ethic, excellent communication skills, and commitment to delivering quality results. Eager to contribute and grow professionally.`,
            mid: `Accomplished ${input.jobTitle} with ${yearsText} of experience driving operational excellence. Improved team efficiency by 30% through process optimization. Strong collaborator with cross-functional teams.`,
            senior: `Seasoned ${input.jobTitle} with ${yearsText} of experience leading teams and strategic initiatives. Successfully managed projects with budgets up to $1M. Proven track record of exceeding organizational goals.`,
            executive: `Executive leader with ${yearsText} of experience driving organizational transformation. Led teams of 50+ and managed P&L responsibility of $20M+. Strategic thinker with strong execution capabilities.`,
        },
    };

    return summaries[category][input.experienceLevel];
}

// Company names by category
const companiesByCategory: Record<JobCategory, string[]> = {
    tech: ['TechCorp Solutions', 'InnovateTech Inc.', 'CloudWorks Systems', 'DataDriven Labs', 'AppForge Digital'],
    design: ['DesignHub Agency', 'CreativeStudio Pro', 'Pixel Perfect Design', 'UX Collective', 'Visual Arts Inc.'],
    marketing: ['GrowthMatrix Agency', 'Brand Elevate Co.', 'Digital Reach Marketing', 'Engage Media Group', 'Impact Marketing Solutions'],
    finance: ['Capital Advisors LLC', 'Sterling Financial Group', 'Apex Accounting Services', 'Investment Partners Inc.', 'Fiscal Solutions Corp'],
    healthcare: ['Metro General Hospital', 'Community Health Center', 'CarePlus Medical Group', 'Wellness Partners Clinic', 'Regional Medical Center'],
    education: ['Lincoln High School', 'Riverside Academy', 'State University', 'Community College District', 'Excellence Learning Center'],
    sales: ['Enterprise Solutions Inc.', 'Global Trade Partners', 'TechSales Pro', 'Business Growth Associates', 'Premier Sales Group'],
    general: ['Acme Corporation', 'Global Enterprises', 'Premier Solutions LLC', 'Innovative Industries', 'Excellence Partners'],
};

// Generate experience entries
function generateExperience(input: OnboardingInput, category: JobCategory): Experience[] {
    const companies = companiesByCategory[category];
    const years = experienceYears[input.experienceLevel];
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    const experiences: Experience[] = [];
    let yearOffset = 0;

    // Generate 2-3 positions based on experience level
    const positionCount = input.experienceLevel === 'entry' ? 1 : input.experienceLevel === 'mid' ? 2 : 3;

    const levelTitles: Record<OnboardingInput['experienceLevel'], string[]> = {
        entry: [input.jobTitle],
        mid: [`Senior ${input.jobTitle}`, input.jobTitle],
        senior: [`Lead ${input.jobTitle}`, `Senior ${input.jobTitle}`, input.jobTitle],
        executive: [`Director of ${input.jobTitle.replace(/Senior|Lead|Junior/gi, '').trim()}`, `Senior ${input.jobTitle}`, input.jobTitle],
    };

    const titles = levelTitles[input.experienceLevel];

    for (let i = 0; i < positionCount; i++) {
        const duration = i === 0 ? Math.ceil(years / positionCount) + 1 : Math.floor(years / positionCount);
        const startYear = currentYear - yearOffset - duration;
        const startMonth = i === 0 ? currentMonth - 2 : Math.floor(Math.random() * 12) + 1;
        const endYear = i === 0 ? currentYear : currentYear - yearOffset;
        const endMonth = i === 0 ? currentMonth : startMonth + Math.floor(Math.random() * 3);

        experiences.push({
            id: `exp-${i + 1}`,
            title: titles[i] || input.jobTitle,
            company: companies[i % companies.length],
            location: ['New York, NY', 'San Francisco, CA', 'Chicago, IL', 'Austin, TX', 'Seattle, WA'][i % 5],
            startDate: `${startYear}-${String(Math.max(1, Math.min(12, startMonth))).padStart(2, '0')}`,
            endDate: i === 0 ? '' : `${endYear}-${String(Math.max(1, Math.min(12, endMonth))).padStart(2, '0')}`,
            current: i === 0,
            description: generateJobDescription(category, i, input.experienceLevel),
        });

        yearOffset += duration;
    }

    return experiences;
}

// Generate job descriptions with bullet points
function generateJobDescription(category: JobCategory, positionIndex: number, level: OnboardingInput['experienceLevel']): string {
    const descriptions: Record<JobCategory, string[][]> = {
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
    };

    const categoryDescriptions = descriptions[category];
    const descriptionSet = categoryDescriptions[Math.min(positionIndex, categoryDescriptions.length - 1)];

    return descriptionSet.join('\n');
}

// Generate education
function generateEducation(input: OnboardingInput, category: JobCategory): Education[] {
    const years = experienceYears[input.experienceLevel];
    const currentYear = new Date().getFullYear();
    const gradYear = currentYear - years - 4; // Assume 4 years of college

    const degreesByCategory: Record<JobCategory, { degree: string; school: string }> = {
        tech: { degree: 'Bachelor of Science in Computer Science', school: 'University of Technology' },
        design: { degree: 'Bachelor of Fine Arts in Graphic Design', school: 'School of Design' },
        marketing: { degree: 'Bachelor of Business Administration in Marketing', school: 'State Business School' },
        finance: { degree: 'Bachelor of Science in Finance', school: 'College of Business' },
        healthcare: { degree: 'Bachelor of Science in Nursing', school: 'College of Health Sciences' },
        education: { degree: 'Bachelor of Arts in Education', school: 'State Teachers College' },
        sales: { degree: 'Bachelor of Business Administration', school: 'School of Business' },
        general: { degree: 'Bachelor of Arts', school: 'State University' },
    };

    const education: Education[] = [
        {
            id: 'edu-1',
            school: degreesByCategory[category].school,
            degree: degreesByCategory[category].degree,
            location: 'Boston, MA',
            startDate: `${gradYear - 4}-09`,
            endDate: `${gradYear}-05`,
            current: false,
            description: 'Graduated with honors. Active member of professional associations.',
        },
    ];

    // Add master's degree for senior/executive
    if (input.experienceLevel === 'senior' || input.experienceLevel === 'executive') {
        education.unshift({
            id: 'edu-0',
            school: 'Graduate School of Business',
            degree: category === 'tech' ? 'Master of Science in Computer Science' : 'Master of Business Administration',
            location: 'New York, NY',
            startDate: `${gradYear + 2}-09`,
            endDate: `${gradYear + 4}-05`,
            current: false,
            description: '',
        });
    }

    return education;
}

// Generate skills
function generateSkills(category: JobCategory): Skill[] {
    const categorySkills = skillsByCategory[category];

    return categorySkills.slice(0, 8).map((name, index) => ({
        id: `skill-${index + 1}`,
        name,
        level: Math.max(3, 5 - Math.floor(index / 3)), // Top skills get higher ratings
    }));
}

/**
 * Main AI Resume Generator function
 * Takes onboarding input and generates complete resume data
 */
export function generateAIResume(input: OnboardingInput): Partial<ResumeData> {
    const category = detectJobCategory(input.jobTitle);

    return {
        personalInfo: {
            fullName: input.fullName,
            jobTitle: input.jobTitle,
            email: `${input.fullName.toLowerCase().replace(/\s+/g, '.')}@email.com`,
            phone: '+1 (555) 000-0000',
            location: 'New York, NY',
            website: '',
            linkedin: `linkedin.com/in/${input.fullName.toLowerCase().replace(/\s+/g, '')}`,
            summary: generateSummary(input, category),
            profileImage: '',
            imageShape: 'circle',
        },
        experience: generateExperience(input, category),
        education: generateEducation(input, category),
        skills: generateSkills(category),
    };
}

/**
 * Async version for future AI API integration
 * Currently wraps the synchronous function, but can be modified
 * to call OpenAI/Claude APIs
 */
export async function generateAIResumeAsync(input: OnboardingInput): Promise<Partial<ResumeData>> {
    // Simulate API delay for realistic UX
    await new Promise(resolve => setTimeout(resolve, 2000));

    // TODO: Replace with actual AI API call
    // const response = await fetch('/api/generate-resume', {
    //     method: 'POST',
    //     body: JSON.stringify(input),
    // });
    // return response.json();

    return generateAIResume(input);
}
