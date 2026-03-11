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

function generateSummary(input: OnboardingInput, category: JobCategory): string {
    const locale = input.locale || 'en';
    const locData = getLocaleData(locale);
    const years = experienceYears[input.experienceLevel];
    const yearsText = locData.yearsText(years);

    const templates = summaryTemplatesMap[locale] || summaryTemplatesMap.en;
    const template = templates[category][input.experienceLevel];

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
