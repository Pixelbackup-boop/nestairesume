/**
 * Admin API Integration Tests
 * Tests the /api/v1/admin endpoints
 */

import request from 'supertest';
import app from '../../app';
import prisma from '../../config/database';
import {
  createTestUser,
  createAdminUser,
  generateTestToken,
  HTTP_STATUS,
} from '../helpers/testUtils';

// Mock Prisma
jest.mock('../../config/database');

// Mock admin service
jest.mock('../../services/adminService', () => ({
  getDashboardStats: jest.fn(),
  getAllUsers: jest.fn(),
  getUserWithResumes: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
  getAllBlogPosts: jest.fn(),
  getBlogPostById: jest.fn(),
  createBlogPost: jest.fn(),
  updateBlogPost: jest.fn(),
  deleteBlogPost: jest.fn(),
  getPaymentStats: jest.fn(),
  getAllPayments: jest.fn(),
}));

const mockPrisma = prisma as jest.Mocked<typeof prisma>;
const mockAdminService = jest.requireMock('../../services/adminService');

describe('Admin API Integration Tests', () => {
  let adminUser: ReturnType<typeof createAdminUser>;
  let regularUser: ReturnType<typeof createTestUser>;
  let adminToken: string;
  let userToken: string;

  beforeEach(() => {
    jest.clearAllMocks();
    adminUser = createAdminUser({ id: 'admin-id-123' });
    regularUser = createTestUser({ id: 'user-id-456', role: 'user' });
    adminToken = generateTestToken(adminUser);
    userToken = generateTestToken(regularUser);
  });

  // ==================== Authorization Tests ====================
  describe('Authorization', () => {
    const adminEndpoints = [
      { method: 'get', path: '/api/v1/admin/dashboard' },
      { method: 'get', path: '/api/v1/admin/users' },
      { method: 'get', path: '/api/v1/admin/users/some-id' },
      { method: 'put', path: '/api/v1/admin/users/some-id' },
      { method: 'delete', path: '/api/v1/admin/users/some-id' },
      { method: 'get', path: '/api/v1/admin/blog' },
      { method: 'post', path: '/api/v1/admin/blog' },
      { method: 'get', path: '/api/v1/admin/payments/stats' },
      { method: 'get', path: '/api/v1/admin/payments' },
    ];

    it('should reject unauthenticated requests', async () => {
      for (const endpoint of adminEndpoints) {
        const response = await (request(app) as any)[endpoint.method](endpoint.path);
        expect(response.status).toBe(HTTP_STATUS.UNAUTHORIZED);
      }
    });

    it('should reject non-admin users', async () => {
      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(regularUser);

      for (const endpoint of adminEndpoints) {
        const response = await (request(app) as any)[endpoint.method](endpoint.path)
          .set('Authorization', `Bearer ${userToken}`);
        expect(response.status).toBe(HTTP_STATUS.FORBIDDEN);
      }
    });

    it('should allow admin users', async () => {
      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(adminUser);
      mockAdminService.getDashboardStats.mockResolvedValue({ totalUsers: 100 });

      const response = await request(app)
        .get('/api/v1/admin/dashboard')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).not.toBe(HTTP_STATUS.FORBIDDEN);
      expect(response.status).not.toBe(HTTP_STATUS.UNAUTHORIZED);
    });
  });

  // ==================== GET /api/v1/admin/dashboard ====================
  describe('GET /api/v1/admin/dashboard', () => {
    beforeEach(() => {
      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(adminUser);
    });

    it('should return dashboard stats', async () => {
      const mockStats = {
        totalUsers: 1000,
        activeSubscriptions: 250,
        totalResumes: 5000,
        revenueThisMonth: 12500,
        newUsersThisWeek: 50,
      };
      mockAdminService.getDashboardStats.mockResolvedValue(mockStats);

      const response = await request(app)
        .get('/api/v1/admin/dashboard')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(HTTP_STATUS.OK);
      expect(response.body.totalUsers).toBe(1000);
      expect(response.body.activeSubscriptions).toBe(250);
    });

    it('should handle service errors', async () => {
      mockAdminService.getDashboardStats.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .get('/api/v1/admin/dashboard')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(HTTP_STATUS.INTERNAL_ERROR);
    });
  });

  // ==================== User Management ====================
  describe('User Management', () => {
    beforeEach(() => {
      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(adminUser);
    });

    describe('GET /api/v1/admin/users', () => {
      it('should list users with pagination', async () => {
        const mockResult = {
          users: [createTestUser(), createTestUser({ id: 'user-2' })],
          total: 100,
        };
        mockAdminService.getAllUsers.mockResolvedValue(mockResult);

        const response = await request(app)
          .get('/api/v1/admin/users')
          .query({ skip: 0, limit: 20 })
          .set('Authorization', `Bearer ${adminToken}`);

        expect(response.status).toBe(HTTP_STATUS.OK);
        expect(response.body.users).toHaveLength(2);
        expect(response.body.total).toBe(100);
        expect(mockAdminService.getAllUsers).toHaveBeenCalledWith(0, 20, undefined);
      });

      it('should support search query', async () => {
        mockAdminService.getAllUsers.mockResolvedValue({ users: [], total: 0 });

        await request(app)
          .get('/api/v1/admin/users')
          .query({ search: 'john@example.com' })
          .set('Authorization', `Bearer ${adminToken}`);

        expect(mockAdminService.getAllUsers).toHaveBeenCalledWith(0, 20, 'john@example.com');
      });

      it('should use default pagination values', async () => {
        mockAdminService.getAllUsers.mockResolvedValue({ users: [], total: 0 });

        await request(app)
          .get('/api/v1/admin/users')
          .set('Authorization', `Bearer ${adminToken}`);

        expect(mockAdminService.getAllUsers).toHaveBeenCalledWith(0, 20, undefined);
      });
    });

    describe('GET /api/v1/admin/users/:id', () => {
      it('should get user with resumes', async () => {
        const userWithResumes = {
          ...createTestUser({ id: 'target-user' }),
          resumes: [{ id: 'resume-1', title: 'My Resume' }],
        };
        mockAdminService.getUserWithResumes.mockResolvedValue(userWithResumes);

        const response = await request(app)
          .get('/api/v1/admin/users/target-user')
          .set('Authorization', `Bearer ${adminToken}`);

        expect(response.status).toBe(HTTP_STATUS.OK);
        expect(response.body.id).toBe('target-user');
        expect(response.body.resumes).toHaveLength(1);
      });

      it('should return 404 for non-existent user', async () => {
        mockAdminService.getUserWithResumes.mockResolvedValue(null);

        const response = await request(app)
          .get('/api/v1/admin/users/nonexistent')
          .set('Authorization', `Bearer ${adminToken}`);

        expect(response.status).toBe(HTTP_STATUS.NOT_FOUND);
      });
    });

    describe('PUT /api/v1/admin/users/:id', () => {
      it('should update user', async () => {
        const updatedUser = createTestUser({
          id: 'target-user',
          name: 'Updated Name',
          subscriptionTier: 'gold',
        });
        mockAdminService.updateUser.mockResolvedValue(updatedUser);

        const response = await request(app)
          .put('/api/v1/admin/users/target-user')
          .set('Authorization', `Bearer ${adminToken}`)
          .send({
            name: 'Updated Name',
            subscriptionTier: 'gold',
          });

        expect(response.status).toBe(HTTP_STATUS.OK);
        expect(response.body.name).toBe('Updated Name');
        expect(mockAdminService.updateUser).toHaveBeenCalledWith('target-user', {
          name: 'Updated Name',
          role: undefined,
          subscriptionTier: 'gold',
          isSuspended: undefined,
        });
      });

      it('should prevent admin from demoting themselves', async () => {
        const response = await request(app)
          .put('/api/v1/admin/users/admin-id-123')
          .set('Authorization', `Bearer ${adminToken}`)
          .send({ role: 'user' });

        expect(response.status).toBe(HTTP_STATUS.BAD_REQUEST);
        expect(response.body.detail).toContain('Cannot demote');
      });

      it('should allow admin to update other users role', async () => {
        const updatedUser = createTestUser({ id: 'other-user', role: 'admin' });
        mockAdminService.updateUser.mockResolvedValue(updatedUser);

        const response = await request(app)
          .put('/api/v1/admin/users/other-user')
          .set('Authorization', `Bearer ${adminToken}`)
          .send({ role: 'admin' });

        expect(response.status).toBe(HTTP_STATUS.OK);
      });

      it('should allow admin to suspend users', async () => {
        const suspendedUser = createTestUser({ id: 'bad-user', isSuspended: true });
        mockAdminService.updateUser.mockResolvedValue(suspendedUser);

        const response = await request(app)
          .put('/api/v1/admin/users/bad-user')
          .set('Authorization', `Bearer ${adminToken}`)
          .send({ isSuspended: true });

        expect(response.status).toBe(HTTP_STATUS.OK);
        expect(response.body.isSuspended).toBe(true);
      });
    });

    describe('DELETE /api/v1/admin/users/:id', () => {
      it('should delete user', async () => {
        mockAdminService.deleteUser.mockResolvedValue(undefined);

        const response = await request(app)
          .delete('/api/v1/admin/users/target-user')
          .set('Authorization', `Bearer ${adminToken}`);

        expect(response.status).toBe(204);
        expect(mockAdminService.deleteUser).toHaveBeenCalledWith('target-user');
      });

      it('should prevent admin from deleting themselves', async () => {
        const response = await request(app)
          .delete('/api/v1/admin/users/admin-id-123')
          .set('Authorization', `Bearer ${adminToken}`);

        expect(response.status).toBe(HTTP_STATUS.BAD_REQUEST);
        expect(response.body.detail).toContain('Cannot delete');
      });
    });
  });

  // ==================== Blog Management ====================
  describe('Blog Management', () => {
    beforeEach(() => {
      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(adminUser);
    });

    const mockBlogPost = {
      id: 'blog-1',
      slug: 'test-post',
      title: 'Test Blog Post',
      description: 'A test blog post',
      content: 'Full content here',
      category: 'career-tips',
      author: 'John Doe',
      published: true,
      createdAt: new Date(),
    };

    describe('GET /api/v1/admin/blog', () => {
      it('should list blog posts', async () => {
        mockAdminService.getAllBlogPosts.mockResolvedValue({
          posts: [mockBlogPost],
          total: 1,
        });

        const response = await request(app)
          .get('/api/v1/admin/blog')
          .set('Authorization', `Bearer ${adminToken}`);

        expect(response.status).toBe(HTTP_STATUS.OK);
        expect(response.body.posts).toHaveLength(1);
      });
    });

    describe('GET /api/v1/admin/blog/:id', () => {
      it('should get blog post by id', async () => {
        mockAdminService.getBlogPostById.mockResolvedValue(mockBlogPost);

        const response = await request(app)
          .get('/api/v1/admin/blog/blog-1')
          .set('Authorization', `Bearer ${adminToken}`);

        expect(response.status).toBe(HTTP_STATUS.OK);
        expect(response.body.slug).toBe('test-post');
      });

      it('should return 404 for non-existent post', async () => {
        mockAdminService.getBlogPostById.mockResolvedValue(null);

        const response = await request(app)
          .get('/api/v1/admin/blog/nonexistent')
          .set('Authorization', `Bearer ${adminToken}`);

        expect(response.status).toBe(HTTP_STATUS.NOT_FOUND);
      });
    });

    describe('POST /api/v1/admin/blog', () => {
      const validPostData = {
        slug: 'new-post',
        title: 'New Blog Post',
        description: 'Description',
        content: 'Content',
        category: 'resume-tips',
        author: 'Jane Doe',
      };

      it('should create blog post', async () => {
        mockAdminService.createBlogPost.mockResolvedValue({
          id: 'new-blog-id',
          ...validPostData,
        });

        const response = await request(app)
          .post('/api/v1/admin/blog')
          .set('Authorization', `Bearer ${adminToken}`)
          .send(validPostData);

        expect(response.status).toBe(HTTP_STATUS.CREATED);
        expect(response.body.slug).toBe('new-post');
      });

      it('should return 400 for missing required fields', async () => {
        const response = await request(app)
          .post('/api/v1/admin/blog')
          .set('Authorization', `Bearer ${adminToken}`)
          .send({ slug: 'incomplete' });

        expect(response.status).toBe(HTTP_STATUS.BAD_REQUEST);
        expect(response.body.detail).toContain('Missing required fields');
      });

      it('should return 400 for duplicate slug', async () => {
        mockAdminService.createBlogPost.mockRejectedValue(
          new Error('Unique constraint failed')
        );

        const response = await request(app)
          .post('/api/v1/admin/blog')
          .set('Authorization', `Bearer ${adminToken}`)
          .send(validPostData);

        expect(response.status).toBe(HTTP_STATUS.BAD_REQUEST);
        expect(response.body.detail).toContain('slug already exists');
      });
    });

    describe('PUT /api/v1/admin/blog/:id', () => {
      it('should update blog post', async () => {
        mockAdminService.updateBlogPost.mockResolvedValue({
          ...mockBlogPost,
          title: 'Updated Title',
        });

        const response = await request(app)
          .put('/api/v1/admin/blog/blog-1')
          .set('Authorization', `Bearer ${adminToken}`)
          .send({ title: 'Updated Title' });

        expect(response.status).toBe(HTTP_STATUS.OK);
        expect(response.body.title).toBe('Updated Title');
      });
    });

    describe('DELETE /api/v1/admin/blog/:id', () => {
      it('should delete blog post', async () => {
        mockAdminService.deleteBlogPost.mockResolvedValue(undefined);

        const response = await request(app)
          .delete('/api/v1/admin/blog/blog-1')
          .set('Authorization', `Bearer ${adminToken}`);

        expect(response.status).toBe(204);
      });
    });
  });

  // ==================== Payment Management ====================
  describe('Payment Management', () => {
    beforeEach(() => {
      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(adminUser);
    });

    describe('GET /api/v1/admin/payments/stats', () => {
      it('should return payment stats', async () => {
        const mockStats = {
          totalRevenue: 50000,
          revenueThisMonth: 5000,
          totalPayments: 500,
          activeSubscriptions: 200,
          churnRate: 0.05,
        };
        mockAdminService.getPaymentStats.mockResolvedValue(mockStats);

        const response = await request(app)
          .get('/api/v1/admin/payments/stats')
          .set('Authorization', `Bearer ${adminToken}`);

        expect(response.status).toBe(HTTP_STATUS.OK);
        expect(response.body.totalRevenue).toBe(50000);
        expect(response.body.activeSubscriptions).toBe(200);
      });
    });

    describe('GET /api/v1/admin/payments', () => {
      it('should list payments with pagination', async () => {
        const mockPayments = {
          payments: [
            { id: 'pay-1', amount: 999, userId: 'user-1', createdAt: new Date() },
            { id: 'pay-2', amount: 1999, userId: 'user-2', createdAt: new Date() },
          ],
          total: 50,
          page: 1,
          limit: 20,
        };
        mockAdminService.getAllPayments.mockResolvedValue(mockPayments);

        const response = await request(app)
          .get('/api/v1/admin/payments')
          .query({ page: 1, limit: 20 })
          .set('Authorization', `Bearer ${adminToken}`);

        expect(response.status).toBe(HTTP_STATUS.OK);
        expect(response.body.payments).toHaveLength(2);
        expect(response.body.total).toBe(50);
      });
    });
  });
});
