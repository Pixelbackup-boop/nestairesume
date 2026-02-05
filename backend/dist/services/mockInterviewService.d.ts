export interface InterviewQuestion {
    id: string;
    text: string;
    category: 'behavioral' | 'situational' | 'technical' | 'general';
    difficulty: 'entry' | 'mid' | 'senior';
}
export interface AnswerFeedback {
    score: number;
    strengths: string[];
    improvements: string[];
    sampleAnswer: string;
}
export interface InterviewSession {
    id: string;
    jobTitle: string;
    level: 'entry' | 'mid' | 'senior';
    questions: InterviewQuestion[];
    createdAt: Date;
}
/**
 * Generate interview questions based on job title and level
 */
export declare function generateInterviewQuestions(jobTitle: string, level: 'entry' | 'mid' | 'senior', questionCount?: number, locale?: string): Promise<InterviewQuestion[]>;
/**
 * Evaluate a user's answer to an interview question
 */
export declare function evaluateAnswer(question: string, userAnswer: string, jobTitle: string, locale?: string): Promise<AnswerFeedback>;
/**
 * Get suggested questions for common job titles (fallback if AI fails)
 */
export declare function getFallbackQuestions(jobTitle: string, level: string): InterviewQuestion[];
//# sourceMappingURL=mockInterviewService.d.ts.map