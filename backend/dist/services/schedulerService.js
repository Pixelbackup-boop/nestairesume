"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchedulerStatus = exports.stopScheduler = exports.startScheduler = exports.checkAndPublishDuePosts = exports.scheduleApprovedPosts = exports.generateRandomPostTimes = exports.updateSettings = exports.getSettings = void 0;
const cron = __importStar(require("node-cron"));
const database_1 = __importDefault(require("../config/database"));
const aiBlogService = __importStar(require("./aiBlogService"));
let schedulerTask = null;
// Get or create settings
const getSettings = async () => {
    let settings = await database_1.default.autoBlogSettings.findFirst();
    if (!settings) {
        settings = await database_1.default.autoBlogSettings.create({
            data: {},
        });
    }
    return settings;
};
exports.getSettings = getSettings;
// Update settings
const updateSettings = async (data) => {
    const settings = await (0, exports.getSettings)();
    return database_1.default.autoBlogSettings.update({
        where: { id: settings.id },
        data,
    });
};
exports.updateSettings = updateSettings;
// Generate random times for posting within the configured window
const generateRandomPostTimes = (count, startHour, endHour, date = new Date()) => {
    const times = [];
    const totalMinutes = (endHour - startHour) * 60;
    for (let i = 0; i < count; i++) {
        const randomMinutes = Math.floor(Math.random() * totalMinutes);
        const hour = startHour + Math.floor(randomMinutes / 60);
        const minute = randomMinutes % 60;
        const postTime = new Date(date);
        postTime.setHours(hour, minute, 0, 0);
        // If time is in the past, schedule for tomorrow
        if (postTime < new Date()) {
            postTime.setDate(postTime.getDate() + 1);
        }
        times.push(postTime);
    }
    // Sort by time
    return times.sort((a, b) => a.getTime() - b.getTime());
};
exports.generateRandomPostTimes = generateRandomPostTimes;
// Schedule approved posts for random times today
const scheduleApprovedPosts = async () => {
    const settings = await (0, exports.getSettings)();
    if (!settings.enabled) {
        console.log("[Scheduler] Auto-posting is disabled");
        return;
    }
    // Get approved posts without a scheduled time set for today
    const approvedPosts = await database_1.default.scheduledPost.findMany({
        where: {
            status: "approved",
            scheduledFor: {
                gte: new Date(new Date().setHours(0, 0, 0, 0)),
                lt: new Date(new Date().setHours(23, 59, 59, 999)),
            },
        },
        take: settings.postsPerDay,
    });
    if (approvedPosts.length === 0) {
        console.log("[Scheduler] No approved posts to schedule");
        return;
    }
    // Generate random times for today
    const postTimes = (0, exports.generateRandomPostTimes)(approvedPosts.length, settings.startHour, settings.endHour);
    // Update posts with scheduled times
    for (let i = 0; i < approvedPosts.length; i++) {
        await database_1.default.scheduledPost.update({
            where: { id: approvedPosts[i].id },
            data: { scheduledFor: postTimes[i] },
        });
    }
    console.log(`[Scheduler] Scheduled ${approvedPosts.length} posts for today`);
};
exports.scheduleApprovedPosts = scheduleApprovedPosts;
// Check and publish posts that are due
const checkAndPublishDuePosts = async () => {
    const settings = await (0, exports.getSettings)();
    if (!settings.enabled) {
        return;
    }
    const now = new Date();
    // Find approved posts scheduled for now or earlier
    const duePosts = await database_1.default.scheduledPost.findMany({
        where: {
            status: "approved",
            scheduledFor: {
                lte: now,
            },
        },
    });
    for (const post of duePosts) {
        try {
            await aiBlogService.publishPost(post.id, settings.authorName);
            console.log(`[Scheduler] Published: ${post.title}`);
        }
        catch (error) {
            console.error(`[Scheduler] Failed to publish ${post.id}:`, error);
            // Mark as failed
            await database_1.default.scheduledPost.update({
                where: { id: post.id },
                data: { status: "failed" },
            });
        }
    }
};
exports.checkAndPublishDuePosts = checkAndPublishDuePosts;
// Start the scheduler
const startScheduler = () => {
    if (schedulerTask) {
        console.log("[Scheduler] Already running");
        return;
    }
    // Run every minute to check for posts to publish
    schedulerTask = cron.schedule("* * * * *", async () => {
        try {
            await (0, exports.checkAndPublishDuePosts)();
        }
        catch (error) {
            console.error("[Scheduler] Error:", error);
        }
    });
    // Schedule posts for today at midnight and on startup
    cron.schedule("0 0 * * *", async () => {
        try {
            await (0, exports.scheduleApprovedPosts)();
        }
        catch (error) {
            console.error("[Scheduler] Error scheduling posts:", error);
        }
    });
    console.log("[Scheduler] Started - checking every minute for posts to publish");
};
exports.startScheduler = startScheduler;
// Stop the scheduler
const stopScheduler = () => {
    if (schedulerTask) {
        schedulerTask.stop();
        schedulerTask = null;
        console.log("[Scheduler] Stopped");
    }
};
exports.stopScheduler = stopScheduler;
// Get scheduler status
const getSchedulerStatus = async () => {
    const settings = await (0, exports.getSettings)();
    const pendingCount = await database_1.default.scheduledPost.count({
        where: { status: "pending" },
    });
    const approvedCount = await database_1.default.scheduledPost.count({
        where: { status: "approved" },
    });
    const todayPublished = await database_1.default.scheduledPost.count({
        where: {
            status: "published",
            updatedAt: {
                gte: new Date(new Date().setHours(0, 0, 0, 0)),
            },
        },
    });
    return {
        enabled: settings.enabled,
        postsPerDay: settings.postsPerDay,
        startHour: settings.startHour,
        endHour: settings.endHour,
        authorName: settings.authorName,
        pendingReview: pendingCount,
        approvedQueue: approvedCount,
        publishedToday: todayPublished,
        isRunning: schedulerTask !== null,
    };
};
exports.getSchedulerStatus = getSchedulerStatus;
//# sourceMappingURL=schedulerService.js.map