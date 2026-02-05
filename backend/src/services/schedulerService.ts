import * as cron from "node-cron";
import prisma from "../config/database";
import * as aiBlogService from "./aiBlogService";

let schedulerTask: ReturnType<typeof cron.schedule> | null = null;

// Get or create settings
export const getSettings = async () => {
  let settings = await prisma.autoBlogSettings.findFirst();

  if (!settings) {
    settings = await prisma.autoBlogSettings.create({
      data: {},
    });
  }

  return settings;
};

// Update settings
export const updateSettings = async (data: {
  postsPerDay?: number;
  startHour?: number;
  endHour?: number;
  enabled?: boolean;
  authorName?: string;
}) => {
  const settings = await getSettings();

  return prisma.autoBlogSettings.update({
    where: { id: settings.id },
    data,
  });
};

// Generate random times for posting within the configured window
export const generateRandomPostTimes = (
  count: number,
  startHour: number,
  endHour: number,
  date: Date = new Date()
): Date[] => {
  const times: Date[] = [];
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

// Schedule approved posts for random times today
export const scheduleApprovedPosts = async () => {
  const settings = await getSettings();

  if (!settings.enabled) {
    console.log("[Scheduler] Auto-posting is disabled");
    return;
  }

  // Get approved posts without a scheduled time set for today
  const approvedPosts = await prisma.scheduledPost.findMany({
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
  const postTimes = generateRandomPostTimes(
    approvedPosts.length,
    settings.startHour,
    settings.endHour
  );

  // Update posts with scheduled times
  for (let i = 0; i < approvedPosts.length; i++) {
    await prisma.scheduledPost.update({
      where: { id: approvedPosts[i].id },
      data: { scheduledFor: postTimes[i] },
    });
  }

  console.log(`[Scheduler] Scheduled ${approvedPosts.length} posts for today`);
};

// Check and publish posts that are due
export const checkAndPublishDuePosts = async () => {
  const settings = await getSettings();

  if (!settings.enabled) {
    return;
  }

  const now = new Date();

  // Find approved posts scheduled for now or earlier
  const duePosts = await prisma.scheduledPost.findMany({
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
    } catch (error) {
      console.error(`[Scheduler] Failed to publish ${post.id}:`, error);

      // Mark as failed
      await prisma.scheduledPost.update({
        where: { id: post.id },
        data: { status: "failed" },
      });
    }
  }
};

// Start the scheduler
export const startScheduler = () => {
  if (schedulerTask) {
    console.log("[Scheduler] Already running");
    return;
  }

  // Run every minute to check for posts to publish
  schedulerTask = cron.schedule("* * * * *", async () => {
    try {
      await checkAndPublishDuePosts();
    } catch (error) {
      console.error("[Scheduler] Error:", error);
    }
  });

  // Schedule posts for today at midnight and on startup
  cron.schedule("0 0 * * *", async () => {
    try {
      await scheduleApprovedPosts();
    } catch (error) {
      console.error("[Scheduler] Error scheduling posts:", error);
    }
  });

  console.log("[Scheduler] Started - checking every minute for posts to publish");
};

// Stop the scheduler
export const stopScheduler = () => {
  if (schedulerTask) {
    schedulerTask.stop();
    schedulerTask = null;
    console.log("[Scheduler] Stopped");
  }
};

// Get scheduler status
export const getSchedulerStatus = async () => {
  const settings = await getSettings();

  const pendingCount = await prisma.scheduledPost.count({
    where: { status: "pending" },
  });

  const approvedCount = await prisma.scheduledPost.count({
    where: { status: "approved" },
  });

  const todayPublished = await prisma.scheduledPost.count({
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
