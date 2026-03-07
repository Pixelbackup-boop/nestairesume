/**
 * PDF Generation Types
 * Mirror of frontend ResumeData types for server-side PDF generation
 */

export interface PdfExperience {
    id: string;
    title: string;
    company: string;
    city: string;
    country: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
}

export interface PdfEducation {
    id: string;
    school: string;
    degree: string;
    city: string;
    country: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
    gpa?: string;
    honors?: string;
    clubs?: string;
}

export interface PdfSkill {
    id: string;
    name: string;
    level: number;
}

export interface PdfLanguage {
    id: string;
    name: string;
    proficiency: 'native' | 'fluent' | 'advanced' | 'intermediate' | 'basic';
    level: number;
}

export interface PdfInterest {
    id: string;
    name: string;
    icon?: string;
}

export interface PdfStrength {
    id: string;
    name: string;
    level: number;
}

export interface PdfCertification {
    id: string;
    name: string;
    issuer: string;
    date: string;
    url?: string;
}

export interface PdfAward {
    id: string;
    title: string;
    issuer: string;
    date: string;
    description?: string;
}

export interface PdfCustomField {
    id: string;
    label: string;
    content: string;
}

export type ImageShape = 'circle' | 'rounded' | 'square';
export type IdDocumentType = 'id' | 'passport' | 'driving_license' | '';
export type BackgroundType = 'solid' | 'gradient' | 'pattern';
export type BackgroundPattern = 'none' | 'dots' | 'lines' | 'grid' | 'diagonal' | 'crosshatch' | 'chevron' | 'hexagon' | 'waves' | 'diamond';

export interface PdfBackgroundSettings {
    type: BackgroundType;
    color: string;
    gradientEnd?: string;
    gradientDirection?: string;
    pattern: BackgroundPattern;
    patternOpacity: number;
}

export interface PdfFontSettings {
    heading: string;
    body: string;
    size: 'small' | 'medium' | 'large';
}

export interface PdfPersonalInfo {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    linkedin: string;
    summary: string;
    jobTitle: string;
    profileImage: string;
    imageShape: ImageShape;
    nationality: string;
    idType: IdDocumentType;
    idNumber: string;
    x?: string;  // X (formerly Twitter)
    github?: string;
    dribbble?: string;
    behance?: string;
    instagram?: string;
    // Custom field for additional info
    customField?: string;
    customFieldLabel?: string;
}

export interface PdfResumeData {
    personalInfo: PdfPersonalInfo;
    experience: PdfExperience[];
    education: PdfEducation[];
    skills: PdfSkill[];
    languages: PdfLanguage[];
    interests: PdfInterest[];
    strengths: PdfStrength[];
    certifications: PdfCertification[];
    awards: PdfAward[];
    customFields: PdfCustomField[];
    background: PdfBackgroundSettings;
    fonts: PdfFontSettings;
    customThemeColor?: string;
}

export interface PdfTheme {
    name: string;
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    background: string;
    heading: string;
}

/**
 * Translations for PDF template section headers and labels
 * Passed from frontend to enable localized PDF generation
 */
export interface PdfTranslations {
    sections: {
        experience: string;
        workExperience: string;
        education: string;
        skills: string;
        languages: string;
        interests: string;
        strengths: string;
        certifications: string;
        awards: string;
        summary: string;
        profile: string;
        contact: string;
        additionalInfo: string;
        socialLinks: string;
        personalDetails: string;
        credentials: string;
    };
    labels: {
        present: string;
        nationality?: string;
        id?: string;
        passport?: string;
        drivingLicense?: string;
    };
}

export interface PdfGenerateRequest {
    data: PdfResumeData;
    templateId: string;
    theme: PdfTheme;
    translations?: PdfTranslations;
    locale?: string;
}
