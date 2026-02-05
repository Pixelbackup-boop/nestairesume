export interface AdSettings {
    adsEnabled: boolean;
    usePlaceholders: boolean;
    adsensePublisherId: string;
    slots: {
        blogInArticle: string;
        resumeInArticle: string;
        careerInArticle: string;
        toolsRewarded: string;
    };
    estimatedMonthlyViews: {
        blog: number;
        resume: number;
        career: number;
        tools: number;
    };
    updatedAt?: string;
}
/**
 * Get current ad settings
 */
export declare function getAdSettings(): Promise<AdSettings>;
/**
 * Save ad settings
 */
export declare function saveAdSettings(settings: Partial<AdSettings>): Promise<AdSettings>;
/**
 * Check if ads are enabled (for frontend API)
 */
export declare function areAdsEnabled(): Promise<boolean>;
/**
 * Check if using placeholders (for frontend API)
 */
export declare function isPlaceholderMode(): Promise<boolean>;
//# sourceMappingURL=adSettingsService.d.ts.map