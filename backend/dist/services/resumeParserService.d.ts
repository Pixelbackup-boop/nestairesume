interface Experience {
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
interface Education {
    id: string;
    school: string;
    degree: string;
    city: string;
    country: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
}
interface Skill {
    id: string;
    name: string;
    level: number;
}
interface Language {
    id: string;
    name: string;
    proficiency: 'native' | 'fluent' | 'advanced' | 'intermediate' | 'basic';
    level: number;
}
interface Certification {
    id: string;
    name: string;
    issuer: string;
    date: string;
    url?: string;
}
interface ParsedResumeData {
    personalInfo: {
        fullName: string;
        email: string;
        phone: string;
        location: string;
        website: string;
        linkedin: string;
        summary: string;
        jobTitle: string;
    };
    experience: Experience[];
    education: Education[];
    skills: Skill[];
    languages: Language[];
    certifications: Certification[];
}
export interface ParseResult {
    success: boolean;
    data?: Partial<ParsedResumeData>;
    warnings?: string[];
    rawText?: string;
    isLinkedIn?: boolean;
    error?: string;
}
export declare const extractTextFromPdf: (buffer: Buffer) => Promise<string>;
export declare const extractTextFromDocx: (buffer: Buffer) => Promise<string>;
export declare const detectLinkedInPdf: (text: string) => boolean;
export declare const generateEnhancedResume: (extractedText: string, locale?: string) => Promise<ParseResult>;
export declare const parseResume: (buffer: Buffer, mimeType: string, locale?: string) => Promise<ParseResult>;
export {};
//# sourceMappingURL=resumeParserService.d.ts.map