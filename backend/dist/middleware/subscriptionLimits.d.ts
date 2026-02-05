import { Request, Response, NextFunction } from "express";
interface AuthenticatedRequest extends Request {
    user?: {
        id?: string;
        userId?: string;
        email: string;
        role: string;
        subscriptionTier?: string;
    };
}
export declare const checkCvLimit: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const checkAiLimit: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const checkDownloadLimit: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
export declare const checkCoverLetterLimit: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const incrementCvCount: (userId: string) => Promise<void>;
export declare const incrementAiCount: (userId: string) => Promise<void>;
export declare const incrementDownloadCount: (userId: string) => Promise<void>;
export declare const incrementCoverLetterCount: (userId: string) => Promise<void>;
export declare const getUsageStatus: (userId: string) => Promise<{
    tier: string;
    isTrialing: boolean;
    trialEndsAt: Date | null;
    usage: {
        cv: {
            used: number;
            limit: number;
        };
        ai: {
            used: number;
            limit: number;
        };
        aiToday: {
            used: number;
            limit: number;
        };
        download: {
            used: number;
            limit: number;
        };
        coverLetter: {
            used: number;
            limit: number;
        };
    };
} | null>;
export {};
//# sourceMappingURL=subscriptionLimits.d.ts.map