"use strict";
/**
 * Blog API Integration Tests
 * Tests the /api/v1/blog endpoints (public routes)
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const database_1 = __importDefault(require("../../config/database"));
const testUtils_1 = require("../helpers/testUtils");
// Mock Prisma with blogPost model
jest.mock('../../config/database', () => ({
    blogPost: {
        findMany: jest.fn(),
        findFirst: jest.fn(),
        count: jest.fn(),
    },
}));
const mockPrisma = database_1.default;
describe('Blog API Integration Tests', () => {
    const mockBlogPost = {
        id: 'blog-1',
        slug: 'how-to-write-resume',
        title: 'How to Write a Resume',
        description: 'A comprehensive guide to writing resumes',
        content: 'Full blog content here...',
        image: '/images/blog/resume-guide.jpg',
        imageAlt: 'Resume writing guide',
        category: 'career-tips',
        tags: JSON.stringify(['resume', 'career', 'tips']),
        author: 'John Doe',
        featured: true,
        published: true,
        publishedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    // ==================== GET /api/v1/blog ====================
    describe('GET /api/v1/blog', () => {
        it('should return published blog posts', async () => {
            mockPrisma.blogPost.findMany.mockResolvedValue([mockBlogPost]);
            mockPrisma.blogPost.count.mockResolvedValue(1);
            const response = await (0, supertest_1.default)(app_1.default).get('/api/v1/blog');
            expect(response.status).toBe(testUtils_1.HTTP_STATUS.OK);
            expect(response.body.posts).toHaveLength(1);
            expect(response.body.posts[0].slug).toBe('how-to-write-resume');
            expect(response.body.posts[0].tags).toEqual(['resume', 'career', 'tips']);
        });
        it('should support pagination', async () => {
            mockPrisma.blogPost.findMany.mockResolvedValue([]);
            mockPrisma.blogPost.count.mockResolvedValue(50);
            await (0, supertest_1.default)(app_1.default)
                .get('/api/v1/blog')
                .query({ skip: 20, limit: 10 });
            expect(mockPrisma.blogPost.findMany).toHaveBeenCalledWith(expect.objectContaining({
                skip: 20,
                take: 10,
            }));
        });
        it('should filter by category', async () => {
            mockPrisma.blogPost.findMany.mockResolvedValue([mockBlogPost]);
            mockPrisma.blogPost.count.mockResolvedValue(1);
            await (0, supertest_1.default)(app_1.default)
                .get('/api/v1/blog')
                .query({ category: 'career-tips' });
            expect(mockPrisma.blogPost.findMany).toHaveBeenCalledWith(expect.objectContaining({
                where: expect.objectContaining({
                    category: { equals: 'career-tips', mode: 'insensitive' },
                }),
            }));
        });
        it('should filter featured posts', async () => {
            mockPrisma.blogPost.findMany.mockResolvedValue([mockBlogPost]);
            mockPrisma.blogPost.count.mockResolvedValue(1);
            await (0, supertest_1.default)(app_1.default)
                .get('/api/v1/blog')
                .query({ featured: 'true' });
            expect(mockPrisma.blogPost.findMany).toHaveBeenCalledWith(expect.objectContaining({
                where: expect.objectContaining({
                    featured: true,
                }),
            }));
        });
        it('should filter by tag', async () => {
            const postWithTags = {
                ...mockBlogPost,
                tags: JSON.stringify(['resume', 'career']),
            };
            mockPrisma.blogPost.findMany.mockResolvedValue([postWithTags]);
            mockPrisma.blogPost.count.mockResolvedValue(1);
            const response = await (0, supertest_1.default)(app_1.default)
                .get('/api/v1/blog')
                .query({ tag: 'resume' });
            expect(response.status).toBe(testUtils_1.HTTP_STATUS.OK);
            expect(response.body.posts).toHaveLength(1);
        });
        it('should exclude posts not matching tag filter', async () => {
            const postWithTags = {
                ...mockBlogPost,
                tags: JSON.stringify(['interview', 'jobs']),
            };
            mockPrisma.blogPost.findMany.mockResolvedValue([postWithTags]);
            mockPrisma.blogPost.count.mockResolvedValue(1);
            const response = await (0, supertest_1.default)(app_1.default)
                .get('/api/v1/blog')
                .query({ tag: 'resume' });
            expect(response.status).toBe(testUtils_1.HTTP_STATUS.OK);
            expect(response.body.posts).toHaveLength(0);
        });
        it('should return pagination info', async () => {
            mockPrisma.blogPost.findMany.mockResolvedValue([mockBlogPost]);
            mockPrisma.blogPost.count.mockResolvedValue(50);
            const response = await (0, supertest_1.default)(app_1.default)
                .get('/api/v1/blog')
                .query({ limit: 10 });
            expect(response.body.total).toBe(50);
            expect(response.body.pages).toBe(5);
        });
        it('should handle database errors', async () => {
            mockPrisma.blogPost.findMany.mockRejectedValue(new Error('DB error'));
            const response = await (0, supertest_1.default)(app_1.default).get('/api/v1/blog');
            expect(response.status).toBe(testUtils_1.HTTP_STATUS.INTERNAL_ERROR);
        });
    });
    // ==================== GET /api/v1/blog/:slug ====================
    describe('GET /api/v1/blog/:slug', () => {
        it('should return single blog post by slug', async () => {
            mockPrisma.blogPost.findFirst.mockResolvedValue(mockBlogPost);
            const response = await (0, supertest_1.default)(app_1.default).get('/api/v1/blog/how-to-write-resume');
            expect(response.status).toBe(testUtils_1.HTTP_STATUS.OK);
            expect(response.body.slug).toBe('how-to-write-resume');
            expect(response.body.title).toBe('How to Write a Resume');
            expect(response.body.tags).toEqual(['resume', 'career', 'tips']);
        });
        it('should return 404 for non-existent post', async () => {
            mockPrisma.blogPost.findFirst.mockResolvedValue(null);
            const response = await (0, supertest_1.default)(app_1.default).get('/api/v1/blog/non-existent-post');
            expect(response.status).toBe(testUtils_1.HTTP_STATUS.NOT_FOUND);
            expect(response.body.detail).toContain('not found');
        });
        it('should only return published posts', async () => {
            mockPrisma.blogPost.findFirst.mockResolvedValue(null);
            await (0, supertest_1.default)(app_1.default).get('/api/v1/blog/unpublished-post');
            expect(mockPrisma.blogPost.findFirst).toHaveBeenCalledWith({
                where: {
                    slug: 'unpublished-post',
                    published: true,
                },
            });
        });
    });
    // ==================== GET /api/v1/blog/meta/categories ====================
    describe('GET /api/v1/blog/meta/categories', () => {
        it('should return unique categories', async () => {
            mockPrisma.blogPost.findMany.mockResolvedValue([
                { category: 'career-tips' },
                { category: 'resume-writing' },
                { category: 'interview-prep' },
            ]);
            const response = await (0, supertest_1.default)(app_1.default).get('/api/v1/blog/meta/categories');
            expect(response.status).toBe(testUtils_1.HTTP_STATUS.OK);
            expect(response.body).toEqual(['career-tips', 'resume-writing', 'interview-prep']);
        });
        it('should handle empty categories', async () => {
            mockPrisma.blogPost.findMany.mockResolvedValue([]);
            const response = await (0, supertest_1.default)(app_1.default).get('/api/v1/blog/meta/categories');
            expect(response.status).toBe(testUtils_1.HTTP_STATUS.OK);
            expect(response.body).toEqual([]);
        });
    });
    // ==================== Public Access ====================
    describe('Public Access', () => {
        it('blog listing should not require authentication', async () => {
            mockPrisma.blogPost.findMany.mockResolvedValue([]);
            mockPrisma.blogPost.count.mockResolvedValue(0);
            const response = await (0, supertest_1.default)(app_1.default).get('/api/v1/blog');
            expect(response.status).not.toBe(testUtils_1.HTTP_STATUS.UNAUTHORIZED);
        });
        it('single post should not require authentication', async () => {
            mockPrisma.blogPost.findFirst.mockResolvedValue(mockBlogPost);
            const response = await (0, supertest_1.default)(app_1.default).get('/api/v1/blog/any-slug');
            expect(response.status).not.toBe(testUtils_1.HTTP_STATUS.UNAUTHORIZED);
        });
        it('categories should not require authentication', async () => {
            mockPrisma.blogPost.findMany.mockResolvedValue([]);
            const response = await (0, supertest_1.default)(app_1.default).get('/api/v1/blog/meta/categories');
            expect(response.status).not.toBe(testUtils_1.HTTP_STATUS.UNAUTHORIZED);
        });
    });
});
//# sourceMappingURL=blog.test.js.map