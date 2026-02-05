import { ResumeData, TemplateInfo } from "../types";
export declare const getTemplates: () => TemplateInfo[];
export declare const transformDbToResume: (dbResume: {
    id: string;
    userId: string;
    title: string;
    targetRole: string | null;
    targetCompany: string | null;
    fullName: string;
    email: string | null;
    phone: string | null;
    location: string | null;
    linkedinUrl: string | null;
    portfolioUrl: string | null;
    summary: string | null;
    experiences: string | null;
    education: string | null;
    skills: string | null;
    certifications: string | null;
    projects: string | null;
    languages: string | null;
    templateLayout: string;
    templateTheme: string;
    customThemeColor: string | null;
    atsScore: number | null;
    isMaster: boolean;
    createdAt: Date;
    updatedAt: Date;
}) => ResumeData & {
    createdAt: Date;
    updatedAt: Date;
};
export declare const createResume: (userId: string, data: ResumeData) => Promise<ResumeData & {
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const getResumes: (userId: string, skip?: number, limit?: number) => Promise<(ResumeData & {
    createdAt: Date;
    updatedAt: Date;
})[]>;
export declare const getResumeById: (resumeId: string, userId: string) => Promise<(ResumeData & {
    createdAt: Date;
    updatedAt: Date;
}) | null>;
export declare const updateResume: (resumeId: string, userId: string, data: Partial<ResumeData>) => Promise<(ResumeData & {
    createdAt: Date;
    updatedAt: Date;
}) | null>;
export declare const deleteResume: (resumeId: string, userId: string) => Promise<boolean>;
//# sourceMappingURL=resumeService.d.ts.map