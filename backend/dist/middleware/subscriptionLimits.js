"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsageStatus = exports.incrementCoverLetterCount = exports.incrementDownloadCount = exports.incrementAiCount = exports.incrementCvCount = exports.checkCoverLetterLimit = exports.checkDownloadLimit = exports.checkAiLimit = exports.checkCvLimit = void 0;
const database_1 = __importDefault(require("../config/database"));
const stripeService_1 = require("../services/stripeService");
// Check if user has reached their CV creation limit
const checkCvLimit = async (req, res, next) => {
    try {
        const userId = req.user?.userId || req.user?.id;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const user = await database_1.default.user.findUnique({
            where: { id: userId },
            select: {
                subscriptionTier: true,
                cvCreatedCount: true,
                isSuspended: true,
            },
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (user.isSuspended) {
            return res.status(403).json({ error: "Account suspended" });
        }
        const plan = stripeService_1.PLANS[user.subscriptionTier];
        if (!plan) {
            return res.status(403).json({
                error: "No active subscription",
                code: "SUBSCRIPTION_REQUIRED"
            });
        }
        // -1 means unlimited
        if (plan.cvLimit !== -1 && user.cvCreatedCount >= plan.cvLimit) {
            return res.status(429).json({
                error: "CV creation limit reached",
                code: "CV_LIMIT_REACHED",
                limit: plan.cvLimit,
                used: user.cvCreatedCount,
            });
        }
        next();
    }
    catch (error) {
        console.error("CV limit check error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.checkCvLimit = checkCvLimit;
// Check if user has reached their AI generation limit
const checkAiLimit = async (req, res, next) => {
    try {
        const userId = req.user?.userId || req.user?.id;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const user = await database_1.default.user.findUnique({
            where: { id: userId },
            select: {
                subscriptionTier: true,
                aiUsedCount: true,
                isSuspended: true,
            },
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (user.isSuspended) {
            return res.status(403).json({ error: "Account suspended" });
        }
        const plan = stripeService_1.PLANS[user.subscriptionTier];
        if (!plan) {
            return res.status(403).json({
                error: "No active subscription",
                code: "SUBSCRIPTION_REQUIRED"
            });
        }
        // Check monthly limit
        if (user.aiUsedCount >= plan.aiLimit) {
            return res.status(429).json({
                error: "Monthly AI generation limit reached",
                code: "AI_LIMIT_REACHED",
                limit: plan.aiLimit,
                used: user.aiUsedCount,
            });
        }
        next();
    }
    catch (error) {
        console.error("AI limit check error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.checkAiLimit = checkAiLimit;
// Check if user has reached their download limit
// Authentication is now required for downloads
const checkDownloadLimit = async (req, res, next) => {
    try {
        const userId = req.user?.userId || req.user?.id;
        // Require authentication for downloads
        if (!userId) {
            return res.status(401).json({ error: "Please sign in to download", code: "AUTH_REQUIRED" });
        }
        const user = await database_1.default.user.findUnique({
            where: { id: userId },
            select: {
                subscriptionTier: true,
                downloadCount: true,
                isSuspended: true,
            },
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (user.isSuspended) {
            return res.status(403).json({ error: "Account suspended" });
        }
        const plan = stripeService_1.PLANS[user.subscriptionTier];
        if (!plan) {
            return res.status(403).json({
                error: "No active subscription",
                code: "SUBSCRIPTION_REQUIRED"
            });
        }
        // -1 means unlimited
        if (plan.downloadLimit !== -1 && user.downloadCount >= plan.downloadLimit) {
            return res.status(429).json({
                error: "Download limit reached",
                code: "DOWNLOAD_LIMIT_REACHED",
                limit: plan.downloadLimit,
                used: user.downloadCount,
            });
        }
        next();
    }
    catch (error) {
        console.error("Download limit check error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.checkDownloadLimit = checkDownloadLimit;
// Check if user has reached their cover letter limit
const checkCoverLetterLimit = async (req, res, next) => {
    try {
        const userId = req.user?.userId || req.user?.id;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const user = await database_1.default.user.findUnique({
            where: { id: userId },
            select: {
                subscriptionTier: true,
                coverLetterCount: true,
                isSuspended: true,
            },
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (user.isSuspended) {
            return res.status(403).json({ error: "Account suspended" });
        }
        const plan = stripeService_1.PLANS[user.subscriptionTier];
        if (!plan) {
            return res.status(403).json({
                error: "No active subscription",
                code: "SUBSCRIPTION_REQUIRED"
            });
        }
        // -1 means unlimited
        if (plan.coverLetterLimit !== -1 && user.coverLetterCount >= plan.coverLetterLimit) {
            return res.status(429).json({
                error: "Cover letter limit reached",
                code: "COVER_LETTER_LIMIT_REACHED",
                limit: plan.coverLetterLimit,
                used: user.coverLetterCount,
            });
        }
        next();
    }
    catch (error) {
        console.error("Cover letter limit check error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.checkCoverLetterLimit = checkCoverLetterLimit;
// Increment usage counters after successful operations
const incrementCvCount = async (userId) => {
    await database_1.default.user.update({
        where: { id: userId },
        data: { cvCreatedCount: { increment: 1 } },
    });
};
exports.incrementCvCount = incrementCvCount;
const incrementAiCount = async (userId) => {
    await database_1.default.user.update({
        where: { id: userId },
        data: {
            aiUsedCount: { increment: 1 },
            aiUsedToday: { increment: 1 },
        },
    });
};
exports.incrementAiCount = incrementAiCount;
const incrementDownloadCount = async (userId) => {
    await database_1.default.user.update({
        where: { id: userId },
        data: { downloadCount: { increment: 1 } },
    });
};
exports.incrementDownloadCount = incrementDownloadCount;
const incrementCoverLetterCount = async (userId) => {
    await database_1.default.user.update({
        where: { id: userId },
        data: { coverLetterCount: { increment: 1 } },
    });
};
exports.incrementCoverLetterCount = incrementCoverLetterCount;
// Get current usage for a user
const getUsageStatus = async (userId) => {
    const user = await database_1.default.user.findUnique({
        where: { id: userId },
        select: {
            subscriptionTier: true,
            cvCreatedCount: true,
            aiUsedCount: true,
            aiUsedToday: true,
            downloadCount: true,
            coverLetterCount: true,
        },
    });
    if (!user)
        return null;
    const plan = stripeService_1.PLANS[user.subscriptionTier];
    return {
        tier: user.subscriptionTier,
        usage: {
            cv: { used: user.cvCreatedCount, limit: plan?.cvLimit ?? 0 },
            ai: { used: user.aiUsedCount, limit: plan?.aiLimit ?? 0 },
            aiToday: { used: user.aiUsedToday, limit: plan?.aiLimit ?? 0 },
            download: { used: user.downloadCount, limit: plan?.downloadLimit ?? 0 },
            coverLetter: { used: user.coverLetterCount, limit: plan?.coverLetterLimit ?? 0 },
        },
    };
};
exports.getUsageStatus = getUsageStatus;
//# sourceMappingURL=subscriptionLimits.js.map