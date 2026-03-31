/**
 * AI Resume Generator
 *
 * Generates professional resume content based on user's name and job title.
 * Currently uses smart templates with job-specific content.
 * Can be extended to use real AI APIs (OpenAI, Claude) in the future.
 */

import { ResumeData, Experience, Education, Skill, Language, Interest, Strength, IdDocumentType } from '../store/useResumeStore';
import {
    localeDataMap,
    summaryTemplatesMap,
    jobDescriptionsMap,
    masterDegreesMap,
    phoneFormatsMap,
    titlePrefixesMap,
    skillNamesMap,
    languagesMap,
    interestsMap,
    strengthsMap,
} from './resumeLocales';
import type { JobCategory, LocaleData } from './resumeLocales';

export interface OnboardingInput {
    fullName: string;
    jobTitle: string;
    experienceLevel: 'entry' | 'mid' | 'senior' | 'executive';
    locale?: string;
}

// Multilingual job category detection
function detectJobCategory(jobTitle: string): JobCategory {
    const title = jobTitle.toLowerCase();

    if (/developer|engineer|programmer|software|devops|data scientist|data analyst|architect|backend|frontend|fullstack|full.stack|machine learning|artificial intelligence|desarrollador|ingeniero|programador|informático|développeur|ingénieur|informaticien|Entwickler|Informatiker|مطور|مهندس|開発者|エンジニア|プログラマー|ソフトウェア|개발자|엔지니어|프로그래머|sviluppatore|ingegnere|programador|engenheiro|geliştirici|yazılımcı|mühendis|lập trình|kỹ sư|phần mềm|นักพัฒนา|วิศวกร|โปรแกรมเมอร์|开发|工程师|程序员|软件|pembangun|jurutera|pengembang|programista|inżynier|ontwikkelaar|ingenieur|programmeur/.test(title)) {
        return 'tech';
    }
    if (/designer|ux|ui|graphic|creative|artist|visual|diseñador|créateur|concepteur|Gestalter|Designer|مصمم|デザイナー|디자이너|그래픽|progettista|grafico|designer|tasarımcı|grafik|thiết kế|นักออกแบบ|กราฟิก|设计师|平面|pereka|projektant|grafisch|ontwerper/.test(title)) {
        return 'design';
    }
    if (/marketing|seo|content|social media|brand|growth|digital|mercadotecnia|comercialización|commercialisation|Vermarktung|تسويق|マーケティング|마케팅|pemasaran|pazarlama|tiếp thị|การตลาด|市场营销|营销/.test(title)) {
        return 'marketing';
    }
    if (/accountant|finance|analyst|investment|banking|cfo|controller|contador|contable|financiero|comptable|financier|Buchhalter|Finanz|محاسب|مالي|会計|財務|회계사|금융|contabile|finanziario|contador|financeiro|muhasebeci|finans|kế toán|tài chính|นักบัญชี|การเงิน|会计|财务|akauntan|kewangan|księgowy|finansowy|boekhouder|financieel/.test(title)) {
        return 'finance';
    }
    if (/nurse|doctor|medical|healthcare|physician|therapist|clinical|enfermero|médico|salud|infirmier|médecin|santé|Krankenpfleger|Arzt|Gesundheit|ممرض|طبيب|看護師|医師|간호사|의사|infermiere|medico|enfermeiro|saúde|hemşire|doktor|sağlık|y tá|bác sĩ|พยาบาล|แพทย์|护士|医生|医疗|jururawat|doktor|pielęgniarka|lekarz|verpleegkundige|arts/.test(title)) {
        return 'healthcare';
    }
    if (/teacher|professor|instructor|educator|tutor|academic|maestro|profesor|educador|enseignant|professeur|Lehrer|Dozent|معلم|أستاذ|教師|先生|교사|교수|insegnante|professore|professor|öğretmen|akademisyen|giáo viên|giảng viên|ครู|อาจารย์|教师|教授|guru|pensyarah|nauczyciel|wykładowca|leraar|docent/.test(title)) {
        return 'education';
    }
    if (/sales|account executive|business development|representative|ventas|vendedor|comercial|ventes|représentant|Vertrieb|Verkauf|مبيعات|営業|セールス|영업|판매|vendite|commerciale|vendas|satış|bán hàng|ฝ่ายขาย|นักขาย|销售|业务|jualan|sprzedaż|handlowiec|verkoop|verkoper/.test(title)) {
        return 'sales';
    }
    if (/waiter|waitress|server|bartender|barista|chef|cook|host|hostess|restaurant|food service|busser|dishwasher|catering|hospitality|camarero|mesero|cocinero|serveur|cuisinier|Kellner|Koch|Gastro|نادل|طباخ|ウェイター|シェフ|調理|웨이터|요리사|셰프|cameriere|cuoco|garçom|cozinheiro|garson|aşçı|phục vụ|đầu bếp|พนักงานเสิร์ฟ|เชฟ|พ่อครัว|服务员|厨师|餐饮|pelayan|tukang masak|kelner|kucharz|ober|kok/.test(title)) {
        return 'hospitality';
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

// Fallback English skill sets (used when locale data missing)
const skillsByCategory: Record<JobCategory, string[]> = {
    tech: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'SQL', 'Git', 'AWS', 'Docker', 'REST APIs'],
    design: ['Figma', 'Adobe XD', 'Sketch', 'Photoshop', 'Illustrator', 'Prototyping', 'User Research', 'Wireframing', 'Design Systems', 'Typography'],
    marketing: ['SEO', 'Google Analytics', 'Content Strategy', 'Social Media', 'Email Marketing', 'PPC', 'CRM', 'Copywriting', 'A/B Testing', 'HubSpot'],
    finance: ['Financial Analysis', 'Excel', 'QuickBooks', 'SAP', 'Budgeting', 'Forecasting', 'GAAP', 'Auditing', 'Risk Management', 'Financial Modeling'],
    healthcare: ['Patient Care', 'EMR Systems', 'HIPAA Compliance', 'Clinical Assessment', 'Care Planning', 'Medical Terminology', 'Patient Education', 'Team Collaboration', 'Documentation', 'Critical Thinking'],
    education: ['Curriculum Development', 'Classroom Management', 'Student Assessment', 'Differentiated Instruction', 'Educational Technology', 'Lesson Planning', 'Communication', 'Mentoring', 'Special Education', 'Parent Relations'],
    sales: ['CRM Software', 'Lead Generation', 'Negotiation', 'Cold Calling', 'Pipeline Management', 'Salesforce', 'Account Management', 'Presentation Skills', 'Closing Deals', 'Client Relations'],
    hospitality: ['Customer Service', 'POS Systems', 'Food Safety', 'Cash Handling', 'Menu Knowledge', 'Team Collaboration', 'Multitasking', 'Communication', 'Time Management', 'Conflict Resolution'],
    general: ['Project Management', 'Communication', 'Problem Solving', 'Team Leadership', 'Microsoft Office', 'Time Management', 'Critical Thinking', 'Adaptability', 'Collaboration', 'Organization'],
};

// Get locale data with fallback to English
function getLocaleData(locale?: string): LocaleData {
    return localeDataMap[locale || 'en'] || localeDataMap.en;
}

function pickRandom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

function pickN<T>(arr: T[], n: number): T[] {
    const shuffled = [...arr].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, n);
}

// Compositional summary parts per category — openers, achievements, and closers
// Combined: 6×8×6 = 288 unique summaries per category/level
const summaryParts: Record<JobCategory, {
    openers: Record<OnboardingInput['experienceLevel'], string[]>;
    achievements: Record<OnboardingInput['experienceLevel'], string[]>;
    closers: Record<OnboardingInput['experienceLevel'], string[]>;
}> = {
    tech: {
        openers: {
            entry: [
                'Motivated {jobTitle} with {years} of hands-on experience in software development.',
                'Aspiring {jobTitle} with {years} of experience building web and mobile applications.',
                'Detail-oriented {jobTitle} with {years} of experience writing clean, maintainable code.',
                'Curious and driven {jobTitle} with {years} of experience in full-stack development.',
                'Proactive {jobTitle} with {years} of experience collaborating in agile development teams.',
                'Tech-savvy {jobTitle} with {years} of experience developing production-ready applications.',
            ],
            mid: [
                'Results-driven {jobTitle} with {years} of experience building scalable applications.',
                'Versatile {jobTitle} with {years} of experience designing cloud-native solutions.',
                'Innovative {jobTitle} with {years} of experience delivering full-stack products from concept to launch.',
                'Performance-focused {jobTitle} with {years} of experience optimizing complex systems.',
                'Collaborative {jobTitle} with {years} of experience leading technical initiatives across teams.',
                'Solution-oriented {jobTitle} with {years} of experience in microservices architecture and DevOps.',
            ],
            senior: [
                'Senior {jobTitle} with {years} of expertise in architecting enterprise-scale solutions.',
                'Technical leader and {jobTitle} with {years} of experience bridging business strategy and engineering.',
                'Experienced {jobTitle} with {years} of expertise designing distributed systems at scale.',
                'Seasoned {jobTitle} with {years} of experience driving platform reliability and performance.',
                'Senior {jobTitle} with {years} of experience leading engineering teams through complex deliveries.',
                'Accomplished {jobTitle} with {years} of expertise in system design and technical mentorship.',
            ],
            executive: [
                'Strategic technology leader with {years} of experience driving digital transformation.',
                'Visionary technology executive with {years} of experience aligning engineering with business goals.',
                'Transformative CTO-level leader with {years} of experience modernizing technology platforms.',
                'Forward-thinking technology executive with {years} of experience building world-class engineering teams.',
                'Executive technology strategist with {years} of experience scaling organizations through innovation.',
                'Influential engineering leader with {years} of experience delivering enterprise-wide digital initiatives.',
            ],
        },
        achievements: {
            entry: [
                'Contributed to projects that improved application load times by 25%.',
                'Built responsive features used by 5,000+ active users.',
                'Resolved 50+ production bugs and improved test coverage by 30%.',
                'Developed RESTful APIs serving 10K+ daily requests.',
                'Implemented automated testing that caught 40% more bugs pre-deployment.',
                'Collaborated on a feature launch that increased user engagement by 20%.',
                'Migrated legacy components to modern frameworks, reducing bundle size by 35%.',
                'Delivered 3 major feature releases ahead of schedule using agile methodologies.',
            ],
            mid: [
                'Delivered solutions that improved system performance by up to 40%.',
                'Reduced infrastructure costs by 35% through architecture optimization while maintaining 99.9% uptime.',
                'Streamlined CI/CD pipelines that cut release cycles by 50%.',
                'Led migration to cloud services that reduced operational costs by $200K annually.',
                'Built APIs handling 1M+ daily requests with sub-100ms response times.',
                'Mentored 4 junior developers and established code review standards across the team.',
                'Designed database schemas supporting 10x data growth without performance degradation.',
                'Implemented monitoring solutions that reduced incident response time by 60%.',
            ],
            senior: [
                'Led teams of 5+ developers, reducing deployment time by 60% through CI/CD implementation.',
                'Architected distributed systems handling millions of daily requests with 99.99% uptime.',
                'Spearheaded platform migrations that improved performance by 70% and saved $500K annually.',
                'Established engineering standards that reduced production incidents by 45%.',
                'Designed event-driven architectures processing 50M+ messages per day.',
                'Led technical due diligence for 2 acquisitions valued at $10M+.',
                'Built and scaled microservices infrastructure serving 5M+ monthly active users.',
                'Drove adoption of observability tools that cut mean time to recovery by 75%.',
            ],
            executive: [
                'Managed budgets exceeding $2M and teams of 20+ engineers.',
                'Built engineering organizations from 10 to 60+ engineers while delivering products capturing 25% market share.',
                'Drove $15M+ in cost savings through strategic technology investments.',
                'Led platform modernization generating $10M+ in new revenue streams.',
                'Established engineering centers of excellence across 3 global offices.',
                'Oversaw delivery of 12+ enterprise products with combined ARR of $50M.',
                'Implemented company-wide security frameworks achieving SOC 2 Type II and ISO 27001 compliance.',
                'Negotiated $8M+ in technology vendor contracts, achieving 30% cost reduction.',
            ],
        },
        closers: {
            entry: [
                'Passionate about writing efficient code and learning new technologies.',
                'Eager to contribute to innovative projects and grow professionally.',
                'Strong collaborator who thrives in fast-paced team environments.',
                'Committed to continuous learning through open-source contributions and certifications.',
                'Excited to tackle complex challenges and deliver user-focused solutions.',
                'Dedicated to best practices including clean code, testing, and documentation.',
            ],
            mid: [
                'Strong collaborator with cross-functional teams and excellent communication skills.',
                'Skilled at translating business requirements into scalable technical solutions.',
                'Known for mentoring team members and championing engineering best practices.',
                'Adept at balancing technical debt reduction with rapid feature delivery.',
                'Experienced in agile leadership and stakeholder-facing technical communication.',
                'Passionate about building performant, accessible, and maintainable software.',
            ],
            senior: [
                'Passionate about mentoring junior developers and driving technical excellence.',
                'Known for building high-trust engineering cultures and retaining top talent.',
                'Skilled at communicating complex technical concepts to executive stakeholders.',
                'Adept at navigating ambiguity and delivering clarity through architecture decisions.',
                'Committed to fostering diverse, inclusive engineering teams.',
                'Expert at balancing innovation with reliability in production environments.',
            ],
            executive: [
                'Proven ability to align technology strategy with long-term business vision.',
                'Track record of building diverse, high-performing engineering cultures.',
                'Skilled at board-level communication and technology-driven business transformation.',
                'Known for attracting top engineering talent and building lasting organizations.',
                'Experienced in M&A technology integration and post-merger optimization.',
                'Passionate about leveraging technology to create sustainable competitive advantages.',
            ],
        },
    },
    design: {
        openers: {
            entry: [
                'Creative {jobTitle} with {years} of experience crafting user-centered designs.',
                'Imaginative {jobTitle} with {years} of experience translating user research into compelling visuals.',
                'Detail-driven {jobTitle} with {years} of experience building responsive designs and prototypes.',
                'Visual storyteller and {jobTitle} with {years} of experience in UI/UX design.',
                'Curious {jobTitle} with {years} of experience bringing ideas to life through thoughtful design.',
                'Design-thinking {jobTitle} with {years} of experience creating accessible digital experiences.',
            ],
            mid: [
                'Innovative {jobTitle} with {years} of experience creating user-centered digital experiences.',
                'Strategic {jobTitle} with {years} of experience leading end-to-end design processes.',
                'Collaborative {jobTitle} with {years} of experience partnering with product and engineering teams.',
                'Human-centered {jobTitle} with {years} of experience shaping product experiences through research.',
                'Versatile {jobTitle} with {years} of experience across mobile, web, and design systems.',
                'Impact-driven {jobTitle} with {years} of experience connecting business goals with great UX.',
            ],
            senior: [
                'Senior {jobTitle} with {years} of experience leading design teams and shaping product vision.',
                'Design leader with {years} of experience mentoring designers and defining brand identity.',
                'Experienced {jobTitle} with {years} of expertise in strategic design thinking and leadership.',
                'Senior {jobTitle} with {years} of experience building and scaling design operations.',
                'Visionary {jobTitle} with {years} of experience establishing design culture at growing companies.',
                'Accomplished {jobTitle} with {years} of experience elevating product quality through design excellence.',
            ],
            executive: [
                'Design executive with {years} of experience building world-class design organizations.',
                'Chief Design Officer-level leader with {years} of experience elevating design as a strategic function.',
                'Visionary design leader with {years} of experience driving brand transformation.',
                'Executive design strategist with {years} of experience unifying product and brand design.',
                'Transformative design leader with {years} of experience building design-led organizations.',
                'Industry-recognized design executive with {years} of experience at Fortune 500 companies.',
            ],
        },
        achievements: {
            entry: [
                'Designed interfaces for 3+ client projects receiving positive stakeholder feedback.',
                'Created wireframes and prototypes that reduced development rework by 20%.',
                'Built a reusable component library of 30+ elements in Figma.',
                'Contributed to a redesign that improved user task completion by 15%.',
                'Conducted usability tests with 20+ participants to validate design decisions.',
                'Designed responsive layouts achieving 100% WCAG AA compliance.',
                'Delivered pixel-perfect designs across iOS, Android, and web platforms.',
                'Reduced design iteration cycles by 25% through structured feedback sessions.',
            ],
            mid: [
                'Delivered designs that increased user engagement by 35% and reduced bounce rates by 25%.',
                'Redesigned core product flows boosting conversion rates by 40%.',
                'Built component libraries that reduced design-to-dev handoff time by 60%.',
                'Led a product redesign serving 500K+ users, improving NPS by 20 points.',
                'Established design tokens and style guides adopted by 3 product teams.',
                'Conducted 50+ user interviews that shaped a $2M product investment.',
                'Improved onboarding completion by 45% through redesigned user flows.',
                'Created data visualization dashboards used by 1,000+ enterprise clients.',
            ],
            senior: [
                'Established design systems adopted across 10+ products, improving consistency by 50%.',
                'Led flagship product redesign serving 2M+ users, achieving 45% improvement in task completion.',
                'Built user research practices that informed $3M+ in product decisions.',
                'Grew and managed a design team of 8, maintaining 95% retention rate.',
                'Drove accessibility initiative achieving WCAG AAA compliance across all products.',
                'Designed experiences that contributed to 35% reduction in customer support tickets.',
                'Mentored 12+ junior designers, with 4 promoted to senior roles.',
                'Led design workshops for 50+ stakeholders aligning product vision across departments.',
            ],
            executive: [
                'Built design teams of 30+ across multiple product lines and geographies.',
                'Drove 60% improvement in Net Promoter Score through design-led initiatives.',
                'Transformed design culture at organizations driving $5M+ in cost savings.',
                'Established design ops function reducing time-to-market by 40% across all product lines.',
                'Led brand refresh generating 25% increase in brand recognition metrics.',
                'Presented design strategy to board of directors, securing $10M investment in UX.',
                'Built cross-functional design thinking programs adopted by 500+ employees.',
                'Drove design-led product launches generating $20M+ in first-year revenue.',
            ],
        },
        closers: {
            entry: [
                'Skilled in modern design tools and passionate about intuitive, appealing interfaces.',
                'Proficient in Figma, Adobe Creative Suite, and rapid prototyping tools.',
                'Passionate about accessibility and creating inclusive digital products.',
                'Eager to grow design skills through mentorship and collaborative projects.',
                'Strong foundation in typography, color theory, and visual hierarchy.',
                'Excited to contribute to teams that value human-centered design.',
            ],
            mid: [
                'Known for turning complex problems into simple, elegant solutions.',
                'Skilled at facilitating design sprints and cross-functional workshops.',
                'Adept at using data and user research to drive design decisions.',
                'Experienced in design systems, motion design, and brand consistency.',
                'Strong communicator who bridges design, engineering, and product teams.',
                'Passionate about pushing creative boundaries while meeting business objectives.',
            ],
            senior: [
                'Passionate about building inclusive design cultures and developing design talent.',
                'Expert at aligning design vision with product strategy and business outcomes.',
                'Known for fostering innovation through structured design thinking processes.',
                'Skilled at communicating design impact in business terms to executive leadership.',
                'Committed to advancing the design profession through mentorship and community.',
                'Adept at scaling design operations while maintaining creative excellence.',
            ],
            executive: [
                'Track record of making design a core competitive advantage.',
                'Known for building design organizations that attract world-class talent.',
                'Proven ability to drive revenue growth through design-led product strategy.',
                'Experienced in transforming company culture to embrace design thinking at all levels.',
                'Skilled at board-level advocacy for design investment and UX excellence.',
                'Passionate about the intersection of design, technology, and business growth.',
            ],
        },
    },
    marketing: {
        openers: {
            entry: [
                'Enthusiastic {jobTitle} with {years} of experience in digital marketing.',
                'Driven {jobTitle} with {years} of experience managing campaigns across channels.',
                'Analytical {jobTitle} with {years} of experience supporting growth initiatives.',
                'Creative {jobTitle} with {years} of experience in content and social media marketing.',
                'Growth-minded {jobTitle} with {years} of experience in digital acquisition strategies.',
                'Data-curious {jobTitle} with {years} of experience optimizing marketing funnels.',
            ],
            mid: [
                'Data-driven {jobTitle} with {years} of experience executing campaigns that deliver results.',
                'Growth-focused {jobTitle} with {years} of experience optimizing acquisition channels.',
                'Creative {jobTitle} with {years} of experience building brand awareness at scale.',
                'Strategic {jobTitle} with {years} of experience in B2B and B2C marketing.',
                'Performance-oriented {jobTitle} with {years} of experience managing multi-channel campaigns.',
                'Versatile {jobTitle} with {years} of experience across paid, organic, and lifecycle marketing.',
            ],
            senior: [
                'Strategic {jobTitle} with {years} of experience leading high-performing marketing teams.',
                'Senior {jobTitle} with {years} of experience developing go-to-market strategies.',
                'Results-driven {jobTitle} with {years} of experience aligning marketing with revenue goals.',
                'Seasoned {jobTitle} with {years} of experience scaling demand generation programs.',
                'Marketing leader with {years} of experience building full-funnel growth engines.',
                'Accomplished {jobTitle} with {years} of experience in brand strategy and team leadership.',
            ],
            executive: [
                'Marketing executive with {years} of experience driving revenue through innovative strategies.',
                'CMO-level leader with {years} of experience scaling marketing organizations.',
                'Transformative marketing leader with {years} of experience unifying brand and growth teams.',
                'Visionary marketing executive with {years} of experience in global brand building.',
                'Strategic marketing leader with {years} of experience driving market expansion.',
                'Executive marketing strategist with {years} of experience building iconic brands.',
            ],
        },
        achievements: {
            entry: [
                'Grew social media following by 45% through creative content strategies.',
                'Supported email campaigns with 28% average open rate and 5% click-through.',
                'Managed content calendar producing 20+ blog posts per month.',
                'Assisted in campaigns that generated 500+ qualified leads per quarter.',
                'Improved SEO rankings for 15+ target keywords through on-page optimization.',
                'Analyzed campaign data and delivered weekly reports to stakeholders.',
                'Created ad copy variants that improved click-through rates by 30%.',
                'Coordinated 5+ webinars with average attendance of 200 participants.',
            ],
            mid: [
                'Increased organic traffic by 150% and improved conversion rates by 40%.',
                'Managed $200K+ monthly ad spend with consistent ROAS above 4x.',
                'Launched campaigns generating 10K+ qualified leads per quarter.',
                'Built email automation flows achieving 35% open rate and 12% conversion.',
                'Grew content program from 0 to 100K monthly organic visitors.',
                'Executed product launch campaigns that exceeded pipeline targets by 60%.',
                'Reduced customer acquisition cost by 30% through channel mix optimization.',
                'Developed influencer partnerships that drove $500K+ in attributed revenue.',
            ],
            senior: [
                'Managed $1M+ budgets delivering campaigns generating 200% ROI.',
                'Led teams of 8+ marketers driving 60% year-over-year lead growth.',
                'Built attribution models optimizing $3M+ annual investment across channels.',
                'Launched international campaigns in 5+ markets, expanding addressable audience by 300%.',
                'Developed partner marketing programs contributing 25% of total pipeline.',
                'Led brand repositioning that increased aided awareness by 40%.',
                'Built and scaled content marketing function from 2 to 12 team members.',
                'Established ABM program generating $5M+ in enterprise pipeline.',
            ],
            executive: [
                'Led global marketing teams and managed $10M+ budgets across markets.',
                'Drove 80% revenue growth through data-driven demand generation.',
                'Scaled pipeline from $2M to $25M annually through marketing transformation.',
                'Built marketing teams of 40+ across brand, product, growth, and operations.',
                'Led successful company rebrand resulting in 50% increase in brand equity scores.',
                'Established marketing analytics practice that improved ROI visibility by 90%.',
                'Drove IPO marketing strategy contributing to 3x oversubscribed offering.',
                'Expanded into 8 new international markets through localized marketing strategies.',
            ],
        },
        closers: {
            entry: [
                'Skilled in content creation, social media management, and data analysis.',
                'Proficient in Google Analytics, HubSpot, and modern marketing tools.',
                'Passionate about storytelling and data-informed creative strategies.',
                'Quick learner excited to grow skills in marketing automation and CRO.',
                'Strong writer and communicator with an eye for compelling visuals.',
                'Eager to contribute creative ideas in a collaborative marketing environment.',
            ],
            mid: [
                'Skilled at translating data insights into actionable marketing strategies.',
                'Experienced across Google Ads, Meta, LinkedIn, and programmatic platforms.',
                'Strong collaborator who bridges creative vision with business objectives.',
                'Known for building scalable processes that drive repeatable growth.',
                'Adept at A/B testing, audience segmentation, and conversion optimization.',
                'Passionate about building brands that resonate with target audiences.',
            ],
            senior: [
                'Known for building and mentoring high-performing marketing teams.',
                'Expert at aligning marketing KPIs with business revenue targets.',
                'Skilled at presenting marketing strategy and results to C-suite leadership.',
                'Adept at navigating complex, multi-stakeholder marketing initiatives.',
                'Passionate about leveraging emerging channels and marketing technology.',
                'Committed to building marketing functions that scale with business growth.',
            ],
            executive: [
                'Proven ability to build marketing as a strategic revenue driver.',
                'Track record of attracting and retaining top marketing talent.',
                'Experienced in investor relations, analyst briefings, and executive communications.',
                'Known for building cross-functional alignment between marketing, sales, and product.',
                'Skilled at board-level communication of marketing impact and investment cases.',
                'Passionate about building brands that create lasting competitive advantages.',
            ],
        },
    },
    finance: {
        openers: {
            entry: [
                'Detail-oriented {jobTitle} with {years} of experience in financial analysis and reporting.',
                'Diligent {jobTitle} with {years} of experience supporting budgeting and forecasting processes.',
                'Analytical {jobTitle} with {years} of experience in accounts reconciliation and compliance.',
                'Precise {jobTitle} with {years} of experience ensuring accuracy in financial operations.',
                'Numbers-driven {jobTitle} with {years} of experience in accounting and financial systems.',
                'Methodical {jobTitle} with {years} of experience delivering timely financial reports.',
            ],
            mid: [
                'Analytical {jobTitle} with {years} of experience in financial planning and analysis.',
                'Results-oriented {jobTitle} with {years} of experience building financial models for strategic decisions.',
                'Strategic {jobTitle} with {years} of experience managing P&L and capital allocation.',
                'Performance-minded {jobTitle} with {years} of experience optimizing financial operations.',
                'Data-savvy {jobTitle} with {years} of experience in corporate finance and business intelligence.',
                'Insightful {jobTitle} with {years} of experience translating financial data into business strategy.',
            ],
            senior: [
                'Senior {jobTitle} with {years} of experience leading financial operations and strategy.',
                'Accomplished {jobTitle} with {years} of experience overseeing finance, treasury, and compliance.',
                'Strategic {jobTitle} with {years} of experience driving profitability through financial analysis.',
                'Seasoned {jobTitle} with {years} of experience in multi-entity financial management.',
                'Senior {jobTitle} with {years} of experience in audit, controls, and regulatory compliance.',
                'Experienced {jobTitle} with {years} of expertise in M&A financial due diligence.',
            ],
            executive: [
                'Finance executive with {years} of experience driving financial strategy and operational excellence.',
                'CFO-level leader with {years} of experience steering financial strategy through growth phases.',
                'Transformative finance leader with {years} of experience building world-class finance organizations.',
                'Visionary finance executive with {years} of experience in capital markets and corporate governance.',
                'Strategic CFO with {years} of experience guiding organizations through expansion and transformation.',
                'Executive finance leader with {years} of experience optimizing global financial operations.',
            ],
        },
        achievements: {
            entry: [
                'Prepared monthly financial statements for a $5M+ revenue organization.',
                'Assisted in annual audit preparation achieving zero findings.',
                'Reconciled 200+ accounts monthly with 99.8% accuracy rate.',
                'Streamlined invoice processing workflow reducing turnaround time by 20%.',
                'Built Excel models for budget tracking used by 3 department heads.',
                'Processed 500+ transactions monthly while maintaining error-free records.',
                'Supported quarterly forecasting process for a 50-person organization.',
                'Identified and resolved $15K in billing discrepancies during account review.',
            ],
            mid: [
                'Identified cost-saving opportunities resulting in $500K+ annual savings.',
                'Streamlined reporting processes reducing month-end close by 3 days.',
                'Partnered with department heads to optimize $5M+ operating budgets.',
                'Built financial models supporting $10M+ in investment decisions.',
                'Implemented automated reporting saving 20+ hours per month.',
                'Improved forecast accuracy by 20% through enhanced modeling techniques.',
                'Led ERP system migration improving data integrity and reporting speed.',
                'Managed treasury operations optimizing $8M+ in cash positions.',
            ],
            senior: [
                'Managed portfolios worth $50M+ and led teams through successful audits.',
                'Achieved zero material findings across 4 consecutive annual audits.',
                'Led cross-functional initiatives improving gross margins by 8 percentage points.',
                'Built and led a finance team of 12 across accounting, FP&A, and treasury.',
                'Implemented internal controls framework reducing financial risk exposure by 40%.',
                'Negotiated banking relationships saving $200K+ annually in fees and interest.',
                'Led budgeting process for $100M+ organization across 5 business units.',
                'Developed executive dashboards adopted by CEO and board for monthly reviews.',
            ],
            executive: [
                'Led M&A transactions totaling $100M+ and improved EBITDA margins by 15%.',
                'Raised $50M+ in capital and guided organizations through IPO preparation.',
                'Drove 40% improvement in working capital efficiency across 5 international markets.',
                'Built finance organizations of 30+ professionals across 4 countries.',
                'Led debt restructuring saving $3M+ annually in interest payments.',
                'Established investor relations function supporting $500M+ market cap.',
                'Implemented ERP transformation across 8 entities in 12 months.',
                'Drove pricing strategy overhaul increasing average revenue per customer by 25%.',
            ],
        },
        closers: {
            entry: [
                'Strong foundation in accounting principles and financial software.',
                'Proficient in Excel, QuickBooks, and ERP systems with a commitment to accuracy.',
                'Eager to develop expertise in financial modeling and strategic analysis.',
                'Known for meticulous attention to detail and meeting tight deadlines.',
                'Quick learner with strong analytical skills and professional certification in progress.',
                'Committed to accuracy, compliance, and continuous professional development.',
            ],
            mid: [
                'Known for turning complex financial data into actionable business insights.',
                'Skilled at building cross-functional relationships with non-finance stakeholders.',
                'Experienced in ERP systems, BI tools, and advanced financial modeling.',
                'Strong communicator who presents financial insights clearly to leadership.',
                'Adept at balancing strategic vision with operational financial management.',
                'Passionate about leveraging technology to improve financial processes.',
            ],
            senior: [
                'Expert at translating financial analysis into strategic business recommendations.',
                'Known for building high-performing finance teams and developing future leaders.',
                'Skilled at communicating financial strategy to board-level audiences.',
                'Committed to maintaining the highest standards of financial governance.',
                'Adept at navigating regulatory complexity across multiple jurisdictions.',
                'Passionate about using financial insight to drive sustainable business growth.',
            ],
            executive: [
                'Proven ability to serve as a strategic business partner to the CEO and board.',
                'Track record of building investor confidence through transparent financial stewardship.',
                'Experienced in public company reporting, SOX compliance, and capital markets.',
                'Known for building finance functions that scale with rapid business growth.',
                'Skilled at crisis navigation and financial restructuring under pressure.',
                'Passionate about leveraging financial strategy to create long-term shareholder value.',
            ],
        },
    },
    healthcare: {
        openers: {
            entry: [
                'Compassionate {jobTitle} with {years} of clinical experience providing patient-centered care.',
                'Dedicated {jobTitle} with {years} of experience delivering care in fast-paced clinical settings.',
                'Caring {jobTitle} with {years} of hands-on experience in acute care environments.',
                'Patient-focused {jobTitle} with {years} of experience in clinical assessment and documentation.',
                'Empathetic {jobTitle} with {years} of experience supporting patients and healthcare teams.',
                'Committed {jobTitle} with {years} of experience upholding clinical excellence and patient safety.',
            ],
            mid: [
                'Dedicated {jobTitle} with {years} of experience delivering high-quality patient care.',
                'Skilled {jobTitle} with {years} of experience managing complex patient caseloads.',
                'Patient-focused {jobTitle} with {years} of experience across multiple clinical departments.',
                'Evidence-based {jobTitle} with {years} of experience implementing care improvement protocols.',
                'Reliable {jobTitle} with {years} of experience in high-acuity and emergency settings.',
                'Clinical {jobTitle} with {years} of experience in interdisciplinary care coordination.',
            ],
            senior: [
                'Experienced {jobTitle} with {years} of clinical expertise and leadership experience.',
                'Senior {jobTitle} with {years} of experience supervising teams and implementing care standards.',
                'Clinical leader and {jobTitle} with {years} of experience bridging bedside care and administration.',
                'Seasoned {jobTitle} with {years} of experience in quality assurance and clinical education.',
                'Accomplished {jobTitle} with {years} of experience driving department-wide care improvements.',
                'Senior {jobTitle} with {years} of expertise in evidence-based practice and staff development.',
            ],
            executive: [
                'Healthcare executive with {years} of experience transforming clinical operations.',
                'Visionary healthcare leader with {years} of experience in operational transformation.',
                'Strategic healthcare executive with {years} of experience launching service lines.',
                'Transformative healthcare leader with {years} of experience scaling clinical programs.',
                'Executive healthcare strategist with {years} of experience in system-wide improvement.',
                'Innovative healthcare leader with {years} of experience driving value-based care.',
            ],
        },
        achievements: {
            entry: [
                'Provided direct care to 8-12 patients per shift in a 200-bed facility.',
                'Maintained 100% compliance with medication administration protocols.',
                'Received positive feedback from 95% of patient satisfaction surveys.',
                'Assisted in 50+ surgical procedures while maintaining sterile technique standards.',
                'Documented patient records with 99% accuracy using EHR systems.',
                'Supported discharge planning for 20+ patients weekly, reducing readmission risk.',
                'Completed advanced certifications in BLS, ACLS, and patient safety.',
                'Collaborated with interdisciplinary teams to develop individualized care plans.',
            ],
            mid: [
                'Improved patient satisfaction scores by 30% through enhanced communication protocols.',
                'Reduced medication errors by 25% through implementation of safety protocols.',
                'Trained 8+ new staff members and contributed to quality improvement initiatives.',
                'Managed caseload of 15+ complex patients while maintaining zero adverse events.',
                'Implemented evidence-based fall prevention program reducing incidents by 40%.',
                'Led infection control initiative achieving 6 months of zero hospital-acquired infections.',
                'Developed patient education materials adopted across 3 clinical departments.',
                'Coordinated care transitions reducing 30-day readmission rates by 18%.',
            ],
            senior: [
                'Led quality improvement initiatives reducing hospital readmissions by 20%.',
                'Achieved top 10% patient satisfaction rankings across the health system.',
                'Developed staff training programs improving retention by 25% and reducing onboarding by 40%.',
                'Managed clinical teams of 20+ staff across multiple shifts and departments.',
                'Implemented EHR optimization that saved 45 minutes per nurse per shift.',
                'Led accreditation preparation achieving Joint Commission certification with zero deficiencies.',
                'Designed preceptorship program that graduated 30+ new nurses with 90% retention.',
                'Reduced falls by 35% through proactive safety assessment protocols.',
            ],
            executive: [
                'Led departments of 50+ staff and managed $5M+ operational budgets.',
                'Achieved Magnet designation and improved CMS quality scores by 30%.',
                'Grew department revenue by $8M while maintaining top-quartile outcomes.',
                'Led expansion of telehealth services serving 10,000+ patients annually.',
                'Implemented value-based care models achieving $3M+ in shared savings.',
                'Built partnerships with 5 community organizations expanding access to underserved populations.',
                'Led organizational response during pandemic achieving lowest mortality rate in the region.',
                'Established residency programs in 3 specialties attracting top-tier medical talent.',
            ],
        },
        closers: {
            entry: [
                'Committed to maintaining high standards of care and continuous learning.',
                'Skilled in patient assessment, vital signs monitoring, and EHR documentation.',
                'Known for building strong rapport with patients and interdisciplinary teams.',
                'Passionate about evidence-based care and professional development.',
                'Dedicated to patient safety, compassionate care, and clinical excellence.',
                'Eager to grow clinical expertise through mentorship and advanced certifications.',
            ],
            mid: [
                'Known for calm leadership under pressure and empathetic patient interactions.',
                'Skilled at mentoring new clinicians and promoting evidence-based practice.',
                'Experienced in quality metrics, root cause analysis, and process improvement.',
                'Strong advocate for patient safety and equitable healthcare delivery.',
                'Adept at balancing clinical excellence with operational efficiency.',
                'Passionate about advancing clinical standards through research and education.',
            ],
            senior: [
                'Passionate about developing the next generation of clinical leaders.',
                'Expert at aligning clinical outcomes with organizational strategic goals.',
                'Known for building collaborative relationships across clinical and administrative teams.',
                'Committed to advancing health equity and evidence-based practice.',
                'Skilled at navigating regulatory requirements and accreditation standards.',
                'Adept at translating clinical data into actionable improvement strategies.',
            ],
            executive: [
                'Proven ability to drive clinical excellence while managing complex operations.',
                'Track record of building high-performing healthcare organizations.',
                'Known for fostering cultures of safety, innovation, and continuous improvement.',
                'Experienced in health system mergers, service line integration, and growth.',
                'Skilled at engaging physicians, nurses, and staff around a shared clinical vision.',
                'Passionate about transforming healthcare delivery to improve community outcomes.',
            ],
        },
    },
    education: {
        openers: {
            entry: [
                'Passionate {jobTitle} with {years} of teaching experience committed to student success.',
                'Enthusiastic {jobTitle} with {years} of experience developing engaging, standards-aligned curriculum.',
                'Dedicated {jobTitle} with {years} of experience supporting diverse learners.',
                'Inspiring {jobTitle} with {years} of experience creating inclusive classroom environments.',
                'Student-centered {jobTitle} with {years} of experience in differentiated instruction.',
                'Energetic {jobTitle} with {years} of experience integrating technology into learning.',
            ],
            mid: [
                'Innovative {jobTitle} with {years} of experience developing curriculum for diverse learners.',
                'Resourceful {jobTitle} with {years} of experience blending project-based and data-driven instruction.',
                'Dynamic {jobTitle} with {years} of experience integrating STEM and social-emotional learning.',
                'Collaborative {jobTitle} with {years} of experience leading grade-level and department teams.',
                'Impact-focused {jobTitle} with {years} of experience closing achievement gaps.',
                'Creative {jobTitle} with {years} of experience designing engaging learning experiences.',
            ],
            senior: [
                'Veteran {jobTitle} with {years} of experience shaping educational outcomes and mentoring colleagues.',
                'Senior {jobTitle} with {years} of experience in curriculum leadership and instructional coaching.',
                'Experienced {jobTitle} with {years} of expertise in program development and assessment.',
                'Accomplished {jobTitle} with {years} of experience leading school-wide improvement initiatives.',
                'Seasoned {jobTitle} with {years} of experience in educational leadership and policy.',
                'Distinguished {jobTitle} with {years} of experience transforming academic programs.',
            ],
            executive: [
                'Education leader with {years} of experience driving institutional excellence.',
                'Strategic education executive with {years} of experience overseeing K-12 operations.',
                'Transformative education leader with {years} of experience building community partnerships.',
                'Visionary education executive with {years} of experience in district-wide improvement.',
                'Innovative education leader with {years} of experience scaling successful programs.',
                'Executive education strategist with {years} of experience in policy and operations.',
            ],
        },
        achievements: {
            entry: [
                'Designed lesson plans receiving outstanding ratings in classroom evaluations.',
                'Achieved 90% student proficiency rate in standardized assessments.',
                'Implemented classroom management strategies reducing disruptions by 40%.',
                'Integrated technology tools increasing student engagement scores by 25%.',
                'Built positive relationships with 100+ students and their families.',
                'Created differentiated materials serving students across 3 reading levels.',
                'Organized extracurricular activities with 30+ student participants.',
                'Received commendation from administration for innovative teaching methods.',
            ],
            mid: [
                'Improved student test scores by 25% through differentiated instruction strategies.',
                'Led grade-level teams piloting programs that closed achievement gaps by 15%.',
                'Mentored 5+ student teachers and contributed to school-wide improvement plans.',
                'Developed after-school tutoring program serving 40+ at-risk students.',
                'Created curriculum units adopted by 8 teachers across the department.',
                'Led professional development workshops for 25+ colleagues on instructional technology.',
                'Improved parent engagement by 35% through communication platform implementation.',
                'Designed and launched STEM program receiving $20K in community funding.',
            ],
            senior: [
                'Developed award-winning programs adopted district-wide.',
                'Trained 40+ educators on evidence-based practices raising school ratings from C to A.',
                'Secured grants totaling $500K+ for innovative educational initiatives.',
                'Led accreditation process achieving highest rating in school history.',
                'Established mentorship program pairing 50+ new teachers with experienced educators.',
                'Developed assessment frameworks adopted by 12 schools in the district.',
                'Led curriculum overhaul improving student outcomes across 4 core subject areas.',
                'Built community partnerships with 15+ organizations supporting student programs.',
            ],
            executive: [
                'Secured $2M+ in grants and led accreditation processes.',
                'Managed budgets of $15M+ and improved graduation rates by 12%.',
                'Expanded access programs serving 5,000+ students in underserved communities.',
                'Led implementation of district-wide technology initiative across 20+ schools.',
                'Negotiated partnerships with 3 universities for dual-enrollment programs.',
                'Oversaw hiring and development of 200+ educators and support staff.',
                'Launched early childhood education program serving 1,000+ families.',
                'Achieved 15% improvement in district-wide standardized test scores over 3 years.',
            ],
        },
        closers: {
            entry: [
                'Skilled in creating engaging lesson plans and fostering inclusive learning environments.',
                'Proficient in educational technology, classroom management, and formative assessment.',
                'Passionate about helping every student reach their full potential.',
                'Known for building strong relationships with students, families, and colleagues.',
                'Committed to professional growth and reflective teaching practices.',
                'Eager to contribute to a school community that values innovation and equity.',
            ],
            mid: [
                'Known for inspiring students and colleagues through creative instructional approaches.',
                'Skilled at using assessment data to inform instruction and track student growth.',
                'Strong collaborator who builds effective grade-level and cross-curricular teams.',
                'Passionate about equity in education and reaching underserved student populations.',
                'Experienced in IEP development, 504 accommodations, and inclusive instruction.',
                'Adept at integrating technology to enhance learning outcomes.',
            ],
            senior: [
                'Passionate about developing the next generation of effective educators.',
                'Expert at aligning curriculum with state standards and assessment requirements.',
                'Known for building school cultures of academic excellence and continuous improvement.',
                'Committed to advancing education through research-informed practice.',
                'Skilled at grant writing, program evaluation, and strategic planning.',
                'Adept at navigating education policy and advocating for student-centered initiatives.',
            ],
            executive: [
                'Proven ability to lead large-scale educational transformation initiatives.',
                'Track record of improving outcomes while maintaining fiscal responsibility.',
                'Known for building coalitions among educators, families, and community leaders.',
                'Experienced in education policy, legislative advocacy, and board relations.',
                'Skilled at managing complex stakeholder environments with competing priorities.',
                'Passionate about creating equitable educational opportunities for all students.',
            ],
        },
    },
    sales: {
        openers: {
            entry: [
                'Motivated {jobTitle} with {years} of experience in business development.',
                'Energetic {jobTitle} with {years} of experience building client relationships.',
                'Goal-oriented {jobTitle} with {years} of experience in pipeline management.',
                'Ambitious {jobTitle} with {years} of experience in outbound prospecting and lead qualification.',
                'Customer-focused {jobTitle} with {years} of experience in consultative selling.',
                'Driven {jobTitle} with {years} of experience exceeding activity targets consistently.',
            ],
            mid: [
                'Results-oriented {jobTitle} with {years} of experience consistently exceeding quotas.',
                'Consultative {jobTitle} with {years} of experience in enterprise sales cycles.',
                'Driven {jobTitle} with {years} of experience in SaaS and solution selling.',
                'Strategic {jobTitle} with {years} of experience expanding key accounts.',
                'Performance-focused {jobTitle} with {years} of experience in complex B2B sales.',
                'Relationship-driven {jobTitle} with {years} of experience building long-term client partnerships.',
            ],
            senior: [
                'High-performing {jobTitle} with {years} of experience leading sales teams.',
                'Senior {jobTitle} with {years} of experience coaching teams and building go-to-market strategies.',
                'Strategic {jobTitle} with {years} of experience in enterprise account management.',
                'Seasoned {jobTitle} with {years} of experience scaling revenue organizations.',
                'Dynamic {jobTitle} with {years} of experience in territory management and channel sales.',
                'Accomplished {jobTitle} with {years} of experience transforming underperforming sales regions.',
            ],
            executive: [
                'Sales executive with {years} of experience building high-performance organizations.',
                'VP-level sales leader with {years} of experience transforming global sales operations.',
                'Transformative sales executive with {years} of experience aligning strategy with growth.',
                'Visionary sales leader with {years} of experience building partner ecosystems.',
                'Strategic revenue officer with {years} of experience in multi-channel go-to-market.',
                'Executive sales leader with {years} of experience driving international expansion.',
            ],
        },
        achievements: {
            entry: [
                'Closed $300K+ in new business within the first year.',
                'Consistently met or exceeded monthly activity targets by 20%.',
                'Built a pipeline of 50+ qualified leads through cold outreach and networking.',
                'Achieved 110% of quota in first 6 months through consultative selling.',
                'Onboarded 25+ new clients with a 90% retention rate through first year.',
                'Generated $150K in upsell revenue from existing customer base.',
                'Reduced prospect-to-close time by 15% through improved qualification process.',
                'Won "Rookie of the Quarter" recognition for exceeding sales targets.',
            ],
            mid: [
                'Generated $2M+ in new business revenue with 95% client retention.',
                'Expanded key accounts by 60% and shortened sales cycles by 20%.',
                'Built a $3M pipeline from scratch, ranking in top 15% of the organization.',
                'Negotiated enterprise contracts worth $500K+ with 18-month average deal length.',
                'Grew territory revenue by 45% year-over-year through strategic account planning.',
                'Maintained 120%+ quota attainment for 8 consecutive quarters.',
                'Developed referral program generating 30% of new qualified pipeline.',
                'Led cross-sell initiative increasing average deal size by 35%.',
            ],
            senior: [
                'Managed territories generating $10M+ annually.',
                'Grew regional revenue by 45% while building a team of 12 high-performing reps.',
                'Negotiated multi-year contracts worth $5M+ and expanded into 4 new verticals.',
                'Reduced sales cycle by 25% through implementation of sales methodology framework.',
                'Built and trained a sales team of 15, with 8 promoted to senior roles.',
                'Established channel partner program contributing 20% of total revenue.',
                'Led RFP response process winning $8M+ in competitive enterprise deals.',
                'Improved team quota attainment from 72% to 95% through coaching and process.',
            ],
            executive: [
                'Grew revenue from $5M to $50M and expanded into 3 new markets.',
                'Managed 50+ person teams across 4 regions achieving 120%+ of annual targets.',
                'Led organizations through $100M+ in cumulative bookings.',
                'Built partner ecosystems generating 30% of total revenue.',
                'Established sales enablement function improving ramp time by 50%.',
                'Led pricing transformation increasing average contract value by 40%.',
                'Expanded from domestic to international sales across 8 countries.',
                'Drove acquisition integration combining 2 sales organizations without revenue disruption.',
            ],
        },
        closers: {
            entry: [
                'Strong communication skills and customer focus, eager to exceed targets.',
                'Skilled in CRM tools, prospecting techniques, and relationship building.',
                'Passionate about understanding customer needs and delivering tailored solutions.',
                'Quick learner who thrives in competitive, target-driven environments.',
                'Known for persistence, coachability, and positive team energy.',
                'Excited to grow in a sales organization that values mentorship and development.',
            ],
            mid: [
                'Skilled at building relationships that lead to long-term customer partnerships.',
                'Expert in CRM optimization, pipeline management, and sales forecasting.',
                'Known for consultative approach that uncovers customer pain points effectively.',
                'Strong presenter who excels at executive-level demonstrations and negotiations.',
                'Adept at cross-functional collaboration with marketing, product, and success teams.',
                'Passionate about building repeatable sales processes that scale.',
            ],
            senior: [
                'Expert at building, coaching, and retaining high-performing sales teams.',
                'Skilled at developing comp plans and incentive structures that drive results.',
                'Known for creating a culture of accountability, transparency, and winning.',
                'Adept at strategic territory planning and resource allocation.',
                'Strong executive presence with proven ability to close C-suite deals.',
                'Passionate about sales excellence and developing the next generation of leaders.',
            ],
            executive: [
                'Proven ability to scale sales organizations through market transitions.',
                'Track record of building sales cultures that consistently outperform targets.',
                'Experienced in board-level revenue reporting and strategic planning.',
                'Known for building diverse, high-integrity sales organizations.',
                'Skilled at M&A sales integration and post-merger revenue optimization.',
                'Passionate about building world-class go-to-market organizations.',
            ],
        },
    },
    hospitality: {
        openers: {
            entry: [
                'Friendly and energetic {jobTitle} with {years} of experience in fast-paced dining.',
                'Reliable {jobTitle} with {years} of experience serving guests in high-volume restaurants.',
                'Customer-focused {jobTitle} with {years} of experience in food service and guest relations.',
                'Enthusiastic {jobTitle} with {years} of experience creating memorable dining experiences.',
                'Personable {jobTitle} with {years} of experience delivering warm, attentive service.',
                'Hardworking {jobTitle} with {years} of experience thriving in busy hospitality environments.',
            ],
            mid: [
                'Dedicated {jobTitle} with {years} of experience providing outstanding service.',
                'Experienced {jobTitle} with {years} of expertise in fine dining and event coordination.',
                'Versatile {jobTitle} with {years} of experience across dining, catering, and bar operations.',
                'Service-driven {jobTitle} with {years} of experience elevating guest experiences.',
                'Skilled {jobTitle} with {years} of experience in hospitality operations and team training.',
                'Detail-oriented {jobTitle} with {years} of experience managing front-of-house excellence.',
            ],
            senior: [
                'Experienced {jobTitle} with {years} of expertise in fine dining and high-volume establishments.',
                'Senior {jobTitle} with {years} of experience managing front-of-house operations.',
                'Seasoned {jobTitle} with {years} of experience in restaurant management and beverage programs.',
                'Accomplished {jobTitle} with {years} of experience leading hospitality teams.',
                'Veteran {jobTitle} with {years} of experience in luxury and boutique hospitality.',
                'Dynamic {jobTitle} with {years} of experience transforming dining operations.',
            ],
            executive: [
                'Hospitality professional with {years} of experience managing restaurant operations.',
                'Hospitality executive with {years} of experience launching multi-unit concepts.',
                'Strategic hospitality leader with {years} of experience in brand development.',
                'Visionary hospitality executive with {years} of experience scaling food & beverage brands.',
                'Executive hospitality leader with {years} of experience in franchise operations.',
                'Industry-recognized hospitality leader with {years} of experience in concept development.',
            ],
        },
        achievements: {
            entry: [
                'Served 20+ tables per shift while maintaining 95%+ customer satisfaction.',
                'Achieved highest upselling numbers among team of 10 servers.',
                'Memorized 40+ menu items and wine pairings within first month.',
                'Received 15+ five-star guest reviews on third-party platforms.',
                'Maintained POS accuracy of 99%+ across 300+ transactions per shift.',
                'Supported event setups for parties of 50-100 guests.',
                'Earned "Employee of the Month" recognition within first quarter.',
                'Trained in food safety, alcohol service, and allergen management.',
            ],
            mid: [
                'Maintained 98% customer satisfaction ratings in high-volume environment.',
                'Increased average check size by 20% through menu recommendations.',
                'Trained 10+ new team members and improved table turnover by 15%.',
                'Managed private dining events for groups of 20-80, generating $50K+ monthly.',
                'Reduced food waste by 25% through improved ordering and prep processes.',
                'Developed wine pairing program that increased beverage sales by 30%.',
                'Implemented reservation system reducing wait times by 40%.',
                'Led team of 8 servers achieving highest revenue per seat in the restaurant.',
            ],
            senior: [
                'Trained and mentored 15+ staff members achieving high retention rates.',
                'Reduced staff turnover by 30% through mentorship and improved scheduling.',
                'Designed seasonal menus increasing food revenue by 25%.',
                'Managed $200K+ monthly revenue with consistent profit margin improvement.',
                'Implemented health and safety protocols achieving perfect inspection scores.',
                'Built catering program from scratch generating $300K+ in annual revenue.',
                'Reduced operational costs by 20% through vendor negotiation and waste reduction.',
                'Earned local dining awards and media recognition for service excellence.',
            ],
            executive: [
                'Oversaw teams of 30+ staff and increased revenue by 40%.',
                'Managed P&L for 5+ locations with combined revenue of $12M.',
                'Grew portfolio from 2 to 8 locations maintaining 4.5+ star ratings.',
                'Launched 3 new restaurant concepts from ideation through profitability.',
                'Developed franchise operations manual and expanded to 5 franchise locations.',
                'Built centralized procurement saving $500K+ annually across all locations.',
                'Led digital transformation including online ordering and delivery partnerships.',
                'Achieved "Best Restaurant Group" recognition from regional hospitality association.',
            ],
        },
        closers: {
            entry: [
                'Committed to delivering exceptional customer service with a positive attitude.',
                'Skilled in POS systems, upselling, and maintaining welcoming dining spaces.',
                'Known for energy, reliability, and going above and beyond for guests.',
                'Passionate about food, hospitality, and creating memorable experiences.',
                'Strong team player who thrives in fast-paced service environments.',
                'Eager to grow in hospitality and develop leadership skills.',
            ],
            mid: [
                'Known for anticipating guest needs and exceeding service expectations.',
                'Skilled at managing high-pressure situations with grace and professionalism.',
                'Strong leader who motivates teams to deliver consistent service excellence.',
                'Experienced in inventory management, scheduling, and vendor relations.',
                'Adept at handling VIP guests and creating personalized dining experiences.',
                'Passionate about elevating hospitality standards and developing team talent.',
            ],
            senior: [
                'Passionate about developing hospitality talent and building winning teams.',
                'Expert at balancing service quality with operational efficiency.',
                'Known for creating positive work environments that reduce turnover.',
                'Skilled at budget management, cost control, and revenue optimization.',
                'Adept at managing relationships with suppliers, media, and community partners.',
                'Committed to excellence in food quality, service standards, and guest experience.',
            ],
            executive: [
                'Proven ability to scale hospitality operations while maintaining brand quality.',
                'Track record of building hospitality brands that attract loyal customers.',
                'Known for innovative concepts that differentiate in competitive markets.',
                'Experienced in real estate selection, lease negotiation, and buildout management.',
                'Skilled at investor relations and hospitality business development.',
                'Passionate about building hospitality brands that enrich communities.',
            ],
        },
    },
    general: {
        openers: {
            entry: [
                'Motivated {jobTitle} with {years} of professional experience.',
                'Dependable {jobTitle} with {years} of experience contributing to team objectives.',
                'Adaptable {jobTitle} with {years} of experience across diverse responsibilities.',
                'Eager {jobTitle} with {years} of experience in fast-paced work environments.',
                'Proactive {jobTitle} with {years} of experience delivering quality results.',
                'Reliable {jobTitle} with {years} of experience supporting organizational goals.',
            ],
            mid: [
                'Accomplished {jobTitle} with {years} of experience driving operational excellence.',
                'Resourceful {jobTitle} with {years} of experience managing projects and improving workflows.',
                'Proactive {jobTitle} with {years} of experience collaborating across departments.',
                'Effective {jobTitle} with {years} of experience streamlining processes and solving problems.',
                'Versatile {jobTitle} with {years} of experience balancing multiple priorities.',
                'Impact-driven {jobTitle} with {years} of experience delivering measurable results.',
            ],
            senior: [
                'Seasoned {jobTitle} with {years} of experience leading teams and strategic initiatives.',
                'Senior {jobTitle} with {years} of experience driving organizational improvement.',
                'Experienced {jobTitle} with {years} of expertise in strategic planning and execution.',
                'Accomplished {jobTitle} with {years} of experience managing complex projects.',
                'Strategic {jobTitle} with {years} of experience building high-performing teams.',
                'Proven {jobTitle} with {years} of experience delivering results in dynamic environments.',
            ],
            executive: [
                'Executive leader with {years} of experience driving organizational transformation.',
                'C-suite professional with {years} of experience building scalable operations.',
                'Visionary executive with {years} of experience aligning strategy with execution.',
                'Transformative leader with {years} of experience in growth and operational excellence.',
                'Strategic executive with {years} of experience managing enterprise-level operations.',
                'Experienced executive with {years} of proven success in business leadership.',
            ],
        },
        achievements: {
            entry: [
                'Completed projects on time, receiving recognition from management.',
                'Improved team workflows reducing task completion time by 15%.',
                'Supported 3+ departments through cross-functional collaboration.',
                'Maintained 98% accuracy rate in day-to-day operational tasks.',
                'Contributed to initiatives that increased team productivity by 20%.',
                'Organized training materials and onboarding processes for 5+ new hires.',
                'Received positive performance reviews for exceeding expectations.',
                'Identified process improvements that saved 10+ hours per week.',
            ],
            mid: [
                'Improved team efficiency by 30% through process optimization.',
                'Delivered initiatives on time and under budget, saving $200K+ annually.',
                'Led cross-functional projects increasing stakeholder satisfaction by 35%.',
                'Managed vendor relationships resulting in 20% cost reduction.',
                'Implemented project management tools improving visibility across 5 teams.',
                'Developed SOPs adopted by 20+ team members across departments.',
                'Spearheaded office relocation project completed 2 weeks ahead of schedule.',
                'Built reporting dashboards used by leadership for weekly decision-making.',
            ],
            senior: [
                'Managed projects with budgets up to $1M with on-time delivery.',
                'Implemented changes reducing costs by 20% while increasing output quality.',
                'Led 15+ cross-departmental projects with 95% on-time delivery rate.',
                'Built and led teams of 10+ through organizational transitions.',
                'Established governance frameworks adopted across 3 business units.',
                'Negotiated contracts saving $300K+ annually in operational costs.',
                'Developed succession planning program for 8 critical roles.',
                'Led change management initiative achieving 90% employee adoption rate.',
            ],
            executive: [
                'Led teams of 50+ and managed P&L responsibility of $20M+.',
                'Grew organizations through multiple expansion phases maintaining 85%+ satisfaction.',
                'Delivered $30M+ in cumulative revenue growth across business units.',
                'Built operational frameworks that scaled from startup to 500+ employees.',
                'Led digital transformation initiatives improving operational efficiency by 40%.',
                'Established ESG and corporate responsibility programs.',
                'Navigated organizations through economic downturns with zero layoffs.',
                'Built strategic advisory boards that improved decision-making and governance.',
            ],
        },
        closers: {
            entry: [
                'Strong work ethic, excellent communication skills, and commitment to quality.',
                'Known for reliability, problem-solving ability, and willingness to take initiative.',
                'Quick learner with strong organizational skills and attention to detail.',
                'Passionate about contributing to team success and professional growth.',
                'Adaptable and focused, ready to take on new challenges.',
                'Eager to bring energy and fresh perspectives to a growing organization.',
            ],
            mid: [
                'Known for bringing structure and clarity to complex operational challenges.',
                'Skilled at building productive relationships across all organizational levels.',
                'Strong communicator who translates strategy into actionable team plans.',
                'Adept at managing competing priorities without sacrificing quality.',
                'Experienced in stakeholder management, reporting, and process improvement.',
                'Passionate about creating efficient operations that support business growth.',
            ],
            senior: [
                'Expert at building cohesive teams that deliver exceptional results.',
                'Known for calm, decisive leadership during periods of change.',
                'Skilled at mentoring future leaders and building organizational resilience.',
                'Committed to operational excellence and continuous improvement.',
                'Adept at balancing strategic vision with hands-on execution.',
                'Passionate about building organizations where people and performance thrive.',
            ],
            executive: [
                'Proven ability to lead through complexity and drive sustainable growth.',
                'Track record of building high-performance cultures and lasting organizations.',
                'Known for integrity, transparency, and results-driven leadership.',
                'Experienced in board governance, investor relations, and strategic communications.',
                'Skilled at building diverse leadership teams that drive innovation.',
                'Passionate about creating organizations that deliver value to all stakeholders.',
            ],
        },
    },
};

function generateSummary(input: OnboardingInput, category: JobCategory): string {
    const locale = input.locale || 'en';
    const locData = getLocaleData(locale);
    const years = experienceYears[input.experienceLevel];
    const yearsText = locData.yearsText(years);

    // For English: use compositional approach (6×8×6 = 288 combos per category/level)
    if (locale === 'en') {
        const parts = summaryParts[category];
        const opener = pickRandom(parts.openers[input.experienceLevel]);
        const achievements = pickN(parts.achievements[input.experienceLevel], 2);
        const closer = pickRandom(parts.closers[input.experienceLevel]);
        const result = `${opener} ${achievements.join(' ')} ${closer}`;
        return result.replace(/\{jobTitle\}/g, input.jobTitle).replace(/\{years\}/g, yearsText);
    }

    // For other locales: use template system (supports string or string[])
    const templates = summaryTemplatesMap[locale] || summaryTemplatesMap.en;
    const templateOrArray = templates[category][input.experienceLevel];
    const template = Array.isArray(templateOrArray)
        ? templateOrArray[Math.floor(Math.random() * templateOrArray.length)]
        : templateOrArray;

    return template.replace('{jobTitle}', input.jobTitle).replace('{years}', yearsText);
}

// Generate experience entries (locale-aware)
function generateExperience(input: OnboardingInput, category: JobCategory): Experience[] {
    const locale = input.locale || 'en';
    const locData = getLocaleData(locale);
    const companies = locData.companies[category];
    const cities = locData.cities;
    const country = locData.country;
    const years = experienceYears[input.experienceLevel];
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    const experiences: Experience[] = [];
    let yearOffset = 0;

    const positionCount = input.experienceLevel === 'entry' ? 1 : input.experienceLevel === 'mid' ? 2 : 3;

    // Locale-aware title prefixes
    const prefixes = titlePrefixesMap[locale] || titlePrefixesMap.en;

    const levelTitles: Record<OnboardingInput['experienceLevel'], string[]> = {
        entry: [input.jobTitle],
        mid: [`${prefixes.senior} ${input.jobTitle}`, input.jobTitle],
        senior: [`${prefixes.lead} ${input.jobTitle}`, `${prefixes.senior} ${input.jobTitle}`, input.jobTitle],
        executive: [`${prefixes.director} ${input.jobTitle.replace(/Senior|Lead|Junior/gi, '').trim()}`, `${prefixes.senior} ${input.jobTitle}`, input.jobTitle],
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
            city: cities[i % cities.length],
            country: country,
            startDate: `${startYear}-${String(Math.max(1, Math.min(12, startMonth))).padStart(2, '0')}`,
            endDate: i === 0 ? '' : `${endYear}-${String(Math.max(1, Math.min(12, endMonth))).padStart(2, '0')}`,
            current: i === 0,
            description: generateJobDescription(category, i, input.experienceLevel, locale),
        });

        yearOffset += duration;
    }

    return experiences;
}

// Generate job descriptions with bullet points (locale-aware)
function generateJobDescription(category: JobCategory, positionIndex: number, level: OnboardingInput['experienceLevel'], locale?: string): string {
    const descriptions = jobDescriptionsMap[locale || 'en'] || jobDescriptionsMap.en;
    const categoryDescriptions = descriptions[category];
    const descriptionSet = categoryDescriptions[Math.min(positionIndex, categoryDescriptions.length - 1)];

    return descriptionSet.join('\n');
}

// Generate education (locale-aware)
function generateEducation(input: OnboardingInput, category: JobCategory): Education[] {
    const locData = getLocaleData(input.locale);
    const locale = input.locale || 'en';
    const years = experienceYears[input.experienceLevel];
    const currentYear = new Date().getFullYear();
    const gradYear = currentYear - years - 4;

    const degreeInfo = locData.degrees[category];
    const city = locData.cities[0];
    const country = locData.country;

    const education: Education[] = [
        {
            id: 'edu-1',
            school: degreeInfo.school,
            degree: degreeInfo.degree,
            city: city,
            country: country,
            startDate: `${gradYear - 4}-09`,
            endDate: `${gradYear}-05`,
            current: false,
            description: locData.educationDescription,
        },
    ];

    if (input.experienceLevel === 'senior' || input.experienceLevel === 'executive') {
        const masterData = masterDegreesMap[locale] || masterDegreesMap.en;
        education.unshift({
            id: 'edu-0',
            school: masterData.school,
            degree: category === 'tech' ? masterData.tech : masterData.business,
            city: locData.cities[1] || locData.cities[0],
            country: country,
            startDate: `${gradYear + 2}-09`,
            endDate: `${gradYear + 4}-05`,
            current: false,
            description: '',
        });
    }

    return education;
}

// Generate skills (locale-aware)
function generateSkills(category: JobCategory, locale?: string): Skill[] {
    const loc = locale || 'en';
    const localeSkills = skillNamesMap[loc]?.[category];
    const categorySkills = localeSkills || skillsByCategory[category];

    return categorySkills.slice(0, 8).map((name, index) => ({
        id: `skill-${index + 1}`,
        name,
        level: Math.max(3, 5 - Math.floor(index / 3)),
    }));
}

// Generate languages (locale-aware)
function generateLanguages(locale?: string): Language[] {
    const loc = locale || 'en';
    const localeLanguages = languagesMap[loc] || languagesMap.en;

    return localeLanguages.map((lang, index) => ({
        id: `lang-${index + 1}`,
        name: lang.name,
        proficiency: lang.proficiency,
        level: lang.level,
    }));
}

// Generate interests (locale-aware)
function generateInterests(locale?: string): Interest[] {
    const loc = locale || 'en';
    const localeInterests = interestsMap[loc] || interestsMap.en;

    return localeInterests.map((name, index) => ({
        id: `int-${index + 1}`,
        name,
    }));
}

// Generate strengths (locale-aware)
function generateStrengths(locale?: string): Strength[] {
    const loc = locale || 'en';
    const localeStrengths = strengthsMap[loc] || strengthsMap.en;

    return localeStrengths.map((name, index) => ({
        id: `str-${index + 1}`,
        name,
        level: 90 - index * 5,
    }));
}

// Check if name contains only Latin characters (plus common accents)
function isLatinName(name: string): boolean {
    return /^[\u0000-\u024F\u1E00-\u1EFF\s\-'.]+$/.test(name);
}

// Generate URL-safe slug from name
function generateUrlSlug(fullName: string): string {
    if (isLatinName(fullName)) {
        return fullName.toLowerCase().replace(/\s+/g, '');
    }
    // For non-Latin names, use a generic placeholder
    return 'yourname';
}

/**
 * Main AI Resume Generator function
 * Takes onboarding input and generates complete resume data
 */
export function generateAIResume(input: OnboardingInput): Partial<ResumeData> {
    const category = detectJobCategory(input.jobTitle);
    const locData = getLocaleData(input.locale);
    const locale = input.locale || 'en';

    const location = `${locData.cities[0]}, ${locData.country}`;
    const phone = phoneFormatsMap[locale] || phoneFormatsMap.en;
    const slug = generateUrlSlug(input.fullName);
    const emailSlug = isLatinName(input.fullName)
        ? input.fullName.toLowerCase().replace(/\s+/g, '.')
        : 'yourname';

    return {
        personalInfo: {
            fullName: input.fullName,
            jobTitle: input.jobTitle,
            email: `${emailSlug}@email.com`,
            phone: phone,
            location: location,
            website: `www.${slug}.com`,
            linkedin: `linkedin.com/in/${slug}`,
            summary: generateSummary(input, category),
            profileImage: '',
            imageShape: 'circle',
            nationality: locData.nationality,
            idType: 'driving_license' as IdDocumentType,
            idNumber: `DL-${Math.floor(100000000 + Math.random() * 900000000)}`,
        },
        experience: generateExperience(input, category),
        education: generateEducation(input, category),
        skills: generateSkills(category, locale),
        languages: generateLanguages(locale),
        interests: generateInterests(locale),
        strengths: generateStrengths(locale),
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

    return generateAIResume(input);
}

/**
 * Generate only the professional summary based on job title and experience level.
 * Used by the "Generate with AI" button in the builder.
 */
export function generateSummaryOnly(
    jobTitle: string,
    experienceLevel: OnboardingInput['experienceLevel'] = 'mid',
    locale?: string
): string {
    const category = detectJobCategory(jobTitle);
    const input: OnboardingInput = {
        fullName: '',
        jobTitle,
        experienceLevel,
        locale,
    };
    return generateSummary(input, category);
}
