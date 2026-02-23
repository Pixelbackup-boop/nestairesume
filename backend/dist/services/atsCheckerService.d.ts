export interface AtsCategory {
    name: string;
    score: number;
    maxScore: number;
    status: "pass" | "warning" | "fail";
    details: string[];
}
export interface AtsCheckResult {
    score: number;
    categories: AtsCategory[];
    recommendations: string[];
    pageCount?: number;
}
export declare function checkAtsCompatibility(buffer: Buffer, mimeType: string): Promise<AtsCheckResult>;
//# sourceMappingURL=atsCheckerService.d.ts.map