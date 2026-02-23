/**
 * AI Content Service
 * Handles content improvement and cover letter generation using DeepSeek API
 */
export interface CoverLetterInput {
    fullName: string;
    email?: string;
    phone?: string;
    jobTitle: string;
    companyName: string;
    hiringManagerName?: string;
    skills?: string;
    experience?: string;
    tone: "professional" | "friendly" | "confident" | "enthusiastic";
}
/**
 * Improve resume experience/description content using AI
 */
export declare function improveContent(content: string): Promise<string>;
/**
 * Generate a personalized cover letter using AI
 */
export declare function generateCoverLetter(input: CoverLetterInput): Promise<string>;
//# sourceMappingURL=aiContentService.d.ts.map