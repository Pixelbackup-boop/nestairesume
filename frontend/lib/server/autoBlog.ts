/**
 * Shared helpers for the /api/v1/admin/auto-blog routes.
 * Ported from backend schedulerService.getSettings and aiBlogService queue shapes.
 */
import type { PrismaClient } from '@/lib/generated/prisma/client';

/** Find-or-create the AutoBlogSettings singleton (backend schedulerService.getSettings). */
export async function getAutoBlogSettings(db: PrismaClient) {
  const existing = await db.autoBlogSettings.findFirst();
  if (existing) return existing;
  // Schema defaults fill every field (postsPerDay 5, 8-20h, disabled, "ResumeAI Team")
  return db.autoBlogSettings.create({ data: {} });
}

/**
 * All ScheduledPost scalars plus source name — same shape the backend produced
 * with include:{source:{select:{name:true}}}, expressed as a pure select so
 * include and select are never mixed at one level.
 */
export const SCHEDULED_POST_SELECT = {
  id: true,
  title: true,
  slug: true,
  description: true,
  content: true,
  category: true,
  tags: true,
  scheduledFor: true,
  status: true,
  sourceId: true,
  blogPostId: true,
  createdAt: true,
  updatedAt: true,
  source: { select: { name: true } },
} as const;
