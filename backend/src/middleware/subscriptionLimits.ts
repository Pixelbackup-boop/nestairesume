import { Request, Response, NextFunction } from "express";
import prisma from "../config/database";
import { PLANS, PlanType } from "../services/stripeService";

// Extend Express Request to include user info
interface AuthenticatedRequest extends Request {
  user?: {
    id?: string;     // Set by auth middleware
    userId?: string; // Alias for compatibility
    email: string;
    role: string;
    subscriptionTier?: string;
  };
}

// Check if user has reached their CV creation limit
export const checkCvLimit = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId || req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await prisma.user.findUnique({
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

    const plan = PLANS[user.subscriptionTier as PlanType];
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
  } catch (error) {
    console.error("CV limit check error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Check if user has reached their AI generation limit
export const checkAiLimit = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId || req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        subscriptionTier: true,
        subscriptionStatus: true,
        aiUsedCount: true,
        aiUsedToday: true,
        lastAiResetDate: true,
        trialEndsAt: true,
        isSuspended: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.isSuspended) {
      return res.status(403).json({ error: "Account suspended" });
    }

    const plan = PLANS[user.subscriptionTier as PlanType];
    if (!plan) {
      return res.status(403).json({
        error: "No active subscription",
        code: "SUBSCRIPTION_REQUIRED"
      });
    }

    const isTrialing = user.subscriptionStatus === "trialing";

    // Check trial daily limit
    if (isTrialing) {
      // Reset daily counter if new day
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const lastReset = user.lastAiResetDate ? new Date(user.lastAiResetDate) : null;

      if (!lastReset || lastReset < today) {
        // Reset daily counter
        await prisma.user.update({
          where: { id: userId },
          data: { aiUsedToday: 0, lastAiResetDate: new Date() },
        });
      } else if (user.aiUsedToday >= plan.trialDailyLimit) {
        return res.status(429).json({
          error: "Daily AI limit reached during trial",
          code: "TRIAL_DAILY_LIMIT_REACHED",
          limit: plan.trialDailyLimit,
          used: user.aiUsedToday,
        });
      }
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
  } catch (error) {
    console.error("AI limit check error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Check if user has reached their download limit
// For anonymous users with optionalAuthenticate, skip the check
export const checkDownloadLimit = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId || req.user?.id;

    // If no user (anonymous), skip limit check - allow limited anonymous downloads
    // or require auth depending on your business model
    if (!userId) {
      // Option 1: Allow anonymous downloads (no tracking)
      return next();
      // Option 2: Require authentication
      // return res.status(401).json({ error: "Please sign in to download" });
    }

    const user = await prisma.user.findUnique({
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

    const plan = PLANS[user.subscriptionTier as PlanType];
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
  } catch (error) {
    console.error("Download limit check error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Check if user has reached their cover letter limit
export const checkCoverLetterLimit = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId || req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await prisma.user.findUnique({
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

    const plan = PLANS[user.subscriptionTier as PlanType];
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
  } catch (error) {
    console.error("Cover letter limit check error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Increment usage counters after successful operations
export const incrementCvCount = async (userId: string) => {
  await prisma.user.update({
    where: { id: userId },
    data: { cvCreatedCount: { increment: 1 } },
  });
};

export const incrementAiCount = async (userId: string) => {
  await prisma.user.update({
    where: { id: userId },
    data: {
      aiUsedCount: { increment: 1 },
      aiUsedToday: { increment: 1 },
    },
  });
};

export const incrementDownloadCount = async (userId: string) => {
  await prisma.user.update({
    where: { id: userId },
    data: { downloadCount: { increment: 1 } },
  });
};

export const incrementCoverLetterCount = async (userId: string) => {
  await prisma.user.update({
    where: { id: userId },
    data: { coverLetterCount: { increment: 1 } },
  });
};

// Get current usage for a user
export const getUsageStatus = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      subscriptionTier: true,
      subscriptionStatus: true,
      cvCreatedCount: true,
      aiUsedCount: true,
      aiUsedToday: true,
      downloadCount: true,
      coverLetterCount: true,
      trialEndsAt: true,
    },
  });

  if (!user) return null;

  const plan = PLANS[user.subscriptionTier as PlanType];
  const isTrialing = user.subscriptionStatus === "trialing";

  return {
    tier: user.subscriptionTier,
    isTrialing,
    trialEndsAt: user.trialEndsAt,
    usage: {
      cv: { used: user.cvCreatedCount, limit: plan?.cvLimit ?? 0 },
      ai: { used: user.aiUsedCount, limit: plan?.aiLimit ?? 0 },
      aiToday: { used: user.aiUsedToday, limit: isTrialing ? plan?.trialDailyLimit ?? 0 : plan?.aiLimit ?? 0 },
      download: { used: user.downloadCount, limit: plan?.downloadLimit ?? 0 },
      coverLetter: { used: user.coverLetterCount, limit: plan?.coverLetterLimit ?? 0 },
    },
  };
};
