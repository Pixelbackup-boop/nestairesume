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
exports.publishPost = exports.deleteScheduledPost = exports.approvePost = exports.updateScheduledPost = exports.getScheduledPostById = exports.getScheduledPosts = exports.savePostsToQueue = exports.generatePostsFromContent = void 0;
const openai_1 = __importDefault(require("openai"));
const env_1 = require("../config/env");
const database_1 = __importDefault(require("../config/database"));
const pdfService = __importStar(require("./pdfContentService"));
// Initialize OpenAI client
const openai = env_1.config.openaiApiKey
    ? new openai_1.default({ apiKey: env_1.config.openaiApiKey })
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
// Generate a URL-friendly slug
const generateSlug = (title) => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .substring(0, 80);
};
// Generate blog posts from content source
const generatePostsFromContent = async (sourceId, count = 5) => {
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
    const response = await openai.chat.completions.create({
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
    });
    const responseText = response.choices[0]?.message?.content || "[]";
    // Parse JSON response
    let posts;
    try {
        // Extract JSON from response (handle potential markdown code blocks)
        const jsonMatch = responseText.match(/\[[\s\S]*\]/);
        if (!jsonMatch) {
            throw new Error("No JSON array found in response");
        }
        posts = JSON.parse(jsonMatch[0]);
    }
    catch (error) {
        console.error("Failed to parse AI response:", responseText);
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
exports.generatePostsFromContent = generatePostsFromContent;
// Save generated posts to queue
const savePostsToQueue = async (posts, sourceId) => {
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
    const result = await database_1.default.scheduledPost.createMany({
        data: scheduledPosts,
    });
    return result.count;
};
exports.savePostsToQueue = savePostsToQueue;
// Get all scheduled posts
const getScheduledPosts = async (status) => {
    const where = status ? { status } : {};
    return database_1.default.scheduledPost.findMany({
        where,
        orderBy: { scheduledFor: "asc" },
        include: {
            source: {
                select: { name: true },
            },
        },
    });
};
exports.getScheduledPosts = getScheduledPosts;
// Get single scheduled post
const getScheduledPostById = async (id) => {
    return database_1.default.scheduledPost.findUnique({
        where: { id },
        include: {
            source: {
                select: { name: true },
            },
        },
    });
};
exports.getScheduledPostById = getScheduledPostById;
// Update scheduled post
const updateScheduledPost = async (id, data) => {
    return database_1.default.scheduledPost.update({
        where: { id },
        data,
    });
};
exports.updateScheduledPost = updateScheduledPost;
// Approve a scheduled post
const approvePost = async (id) => {
    return database_1.default.scheduledPost.update({
        where: { id },
        data: { status: "approved" },
    });
};
exports.approvePost = approvePost;
// Delete scheduled post
const deleteScheduledPost = async (id) => {
    return database_1.default.scheduledPost.delete({
        where: { id },
    });
};
exports.deleteScheduledPost = deleteScheduledPost;
// Publish a scheduled post to the blog
const publishPost = async (id, authorName) => {
    const scheduledPost = await database_1.default.scheduledPost.findUnique({
        where: { id },
    });
    if (!scheduledPost) {
        throw new Error("Scheduled post not found");
    }
    // Create actual blog post
    const blogPost = await database_1.default.blogPost.create({
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
    await database_1.default.scheduledPost.update({
        where: { id },
        data: {
            status: "published",
            blogPostId: blogPost.id,
        },
    });
    return blogPost;
};
exports.publishPost = publishPost;
//# sourceMappingURL=aiBlogService.js.map