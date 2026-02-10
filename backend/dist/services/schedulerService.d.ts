export declare const getSettings: () => Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    enabled: boolean;
    postsPerDay: number;
    startHour: number;
    endHour: number;
    authorName: string;
}>;
export declare const updateSettings: (data: {
    postsPerDay?: number;
    startHour?: number;
    endHour?: number;
    enabled?: boolean;
    authorName?: string;
}) => Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    enabled: boolean;
    postsPerDay: number;
    startHour: number;
    endHour: number;
    authorName: string;
}>;
export declare const generateRandomPostTimes: (count: number, startHour: number, endHour: number, date?: Date) => Date[];
export declare const scheduleApprovedPosts: () => Promise<void>;
export declare const checkAndPublishDuePosts: () => Promise<void>;
export declare const startScheduler: () => void;
export declare const stopScheduler: () => void;
export declare const getSchedulerStatus: () => Promise<{
    enabled: boolean;
    postsPerDay: number;
    startHour: number;
    endHour: number;
    authorName: string;
    pendingReview: number;
    approvedQueue: number;
    publishedToday: number;
    isRunning: boolean;
}>;
//# sourceMappingURL=schedulerService.d.ts.map