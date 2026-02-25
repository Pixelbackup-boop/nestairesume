import OpenAI from "openai";
import { config } from "../config/env";
import prisma from "../config/database";
import logger from "../lib/logger";
import * as pdfService from "./pdfContentService";
import { openaiCircuit } from "./aiContentService";
import { withRetry } from "../lib/retry";

// Initialize OpenAI client
const openai = config.openaiApiKey
  ? new OpenAI({ apiKey: config.openaiApiKey })
  : null;

// Available categories for resume/career blog
const CATEGORIES = [
  "Resume Tips",
  "Career Advice",
  "Job Search",
  "Interview Tips",
  "Industry Insights",
  "Success Stories",
];

interface GeneratedPost {
  title: string;
  slug: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
}

// Generate a URL-friendly slug
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 80);
};

// Generate blog posts from content source
export const generatePostsFromContent = async (
  sourceId: string,
  count: number = 5
): Promise<GeneratedPost[]> => {
  if (!openai) {
    throw new Error("OpenAI API key not configured");
  }

  // Get content excerpt
  const content = await pdfService.getContentExcerpt(sourceId, 40000);
  if (!content) {
    throw new Error("Content source not found");
  }

  const prompt = `You are a professional blog writer specializing in career advice and resume tips.

Based on the following source content, generate ${count} unique blog post ideas. Each post should be informative, actionable, and optimized for SEO.

SOURCE CONTENT:
${content.substring(0, 35000)}

Generate ${count} blog posts in JSON format. Each post should have:
- title: Catchy, SEO-friendly title (50-70 characters)
- description: Meta description for SEO (150-160 characters)
- content: Full blog post in Markdown format (800-1200 words)
- category: One of: ${CATEGORIES.join(", ")}
- tags: 3-5 relevant tags as array

The content should:
1. Be original and not copy directly from the source
2. Include practical tips and actionable advice
3. Use headers (##, ###) to structure the content
4. Include bullet points or numbered lists where appropriate
5. End with a call-to-action

Respond ONLY with valid JSON array of posts, no additional text:
[{"title": "...", "description": "...", "content": "...", "category": "...", "tags": ["...", "..."]}]`;

  const response = await openaiCircuit.execute(() =>
    withRetry(() =>
      openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a professional blog content generator. Output only valid JSON.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 16000,
      })
    )
  );

  const responseText = response.choices[0]?.message?.content || "[]";

  // Parse JSON response
  let posts: GeneratedPost[];
  try {
    // Extract JSON from response (handle potential markdown code blocks)
    const jsonMatch = responseText.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error("No JSON array found in response");
    }
    posts = JSON.parse(jsonMatch[0]);
  } catch (error) {
    logger.error({ responseText }, 'Failed to parse AI response for blog posts');
    throw new Error("Failed to parse AI-generated content");
  }

  // Add slugs and validate
  return posts.map((post) => ({
    ...post,
    slug: generateSlug(post.title) + "-" + Date.now().toString(36),
    category: CATEGORIES.includes(post.category) ? post.category : "Career Advice",
    tags: Array.isArray(post.tags) ? post.tags : [],
  }));
};

// Save generated posts to queue
export const savePostsToQueue = async (
  posts: GeneratedPost[],
  sourceId: string
): Promise<number> => {
  const scheduledPosts = posts.map((post, index) => ({
    title: post.title,
    slug: post.slug,
    description: post.description,
    content: post.content,
    category: post.category,
    tags: JSON.stringify(post.tags),
    scheduledFor: new Date(Date.now() + (index + 1) * 24 * 60 * 60 * 1000), // Spread across days
    status: "pending",
    sourceId,
  }));

  const result = await prisma.scheduledPost.createMany({
    data: scheduledPosts,
  });

  return result.count;
};

// Get all scheduled posts
export const getScheduledPosts = async (status?: string) => {
  const where = status ? { status } : {};

  return prisma.scheduledPost.findMany({
    where,
    orderBy: { scheduledFor: "asc" },
    include: {
      source: {
        select: { name: true },
      },
    },
  });
};

// Get single scheduled post
export const getScheduledPostById = async (id: string) => {
  return prisma.scheduledPost.findUnique({
    where: { id },
    include: {
      source: {
        select: { name: true },
      },
    },
  });
};

// Update scheduled post
export const updateScheduledPost = async (
  id: string,
  data: Partial<{
    title: string;
    slug: string;
    description: string;
    content: string;
    category: string;
    tags: string;
    scheduledFor: Date;
    status: string;
  }>
) => {
  return prisma.scheduledPost.update({
    where: { id },
    data,
  });
};

// Approve a scheduled post
export const approvePost = async (id: string) => {
  return prisma.scheduledPost.update({
    where: { id },
    data: { status: "approved" },
  });
};

// Delete scheduled post
export const deleteScheduledPost = async (id: string) => {
  return prisma.scheduledPost.delete({
    where: { id },
  });
};

// Publish a scheduled post to the blog
export const publishPost = async (id: string, authorName: string) => {
  const scheduledPost = await prisma.scheduledPost.findUnique({
    where: { id },
  });

  if (!scheduledPost) {
    throw new Error("Scheduled post not found");
  }

  // Create actual blog post
  const blogPost = await prisma.blogPost.create({
    data: {
      slug: scheduledPost.slug,
      title: scheduledPost.title,
      description: scheduledPost.description,
      content: scheduledPost.content,
      category: scheduledPost.category,
      tags: scheduledPost.tags,
      author: authorName,
      published: true,
      publishedAt: new Date(),
    },
  });

  // Update scheduled post status
  await prisma.scheduledPost.update({
    where: { id },
    data: {
      status: "published",
      blogPostId: blogPost.id,
    },
  });

  return blogPost;
};
