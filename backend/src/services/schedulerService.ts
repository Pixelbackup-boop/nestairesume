import * as cron from "node-cron";
import prisma from "../config/database";
import * as aiBlogService from "./aiBlogService";
import logger from "../lib/logger";

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
    logger.info({ component: 'scheduler' }, 'Auto-posting is disabled');
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
    logger.info({ component: 'scheduler' }, 'No approved posts to schedule');
    return;
  }

  // Generate random times for today
  const postTimes = generateRandomPostTimes(
    approvedPosts.length,
    settings.startHour,
    settings.endHour
  );

  // Update posts with scheduled times (batched in a single transaction)
  await prisma.$transaction(
    approvedPosts.map((post, i) =>
      prisma.scheduledPost.update({
        where: { id: post.id },
        data: { scheduledFor: postTimes[i] },
      })
    )
  );

  logger.info({ component: 'scheduler', count: approvedPosts.length }, 'Scheduled posts for today');
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
      logger.info({ component: 'scheduler', postId: post.id, title: post.title }, 'Published post');
    } catch (error) {
      logger.error({ err: error, component: 'scheduler', postId: post.id }, 'Failed to publish post');

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
    logger.info({ component: 'scheduler' }, 'Scheduler already running');
    return;
  }

  // Run every minute to check for posts to publish
  schedulerTask = cron.schedule("* * * * *", async () => {
    try {
      await checkAndPublishDuePosts();
    } catch (error) {
      logger.error({ err: error, component: 'scheduler' }, 'Error checking due posts');
    }
  });

  // Schedule posts for today at midnight and on startup
  cron.schedule("0 0 * * *", async () => {
    try {
      await scheduleApprovedPosts();
    } catch (error) {
      logger.error({ err: error, component: 'scheduler' }, 'Error scheduling posts');
    }
  });

  logger.info({ component: 'scheduler' }, 'Started - checking every minute for posts to publish');
};

// Stop the scheduler
export const stopScheduler = () => {
  if (schedulerTask) {
    schedulerTask.stop();
    schedulerTask = null;
    logger.info({ component: 'scheduler' }, 'Scheduler stopped');
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
