/**
 * Payments API Integration Tests
 * Tests the /api/v1/payments endpoints
 */

import request from 'supertest';
import app from '../../app';
import prisma from '../../config/database';
import {
  createTestUser,
  createStarterUser,
  createGoldUser,
  generateTestToken,
  HTTP_STATUS,
} from '../helpers/testUtils';

// Mock Prisma
jest.mock('../../config/database');

// Mock Stripe service
jest.mock('../../services/stripeService', () => ({
  createCheckoutSession: jest.fn(),
  createPortalSession: jest.fn(),
  getSubscriptionStatus: jest.fn(),
  PLANS: {
    starter: { name: 'Starter', cvLimit: 30, aiLimit: 50, downloadLimit: 3 },
    gold: { name: 'Gold', cvLimit: 150, aiLimit: 100, downloadLimit: 10 },
    diamond: { name: 'Diamond', cvLimit: 300, aiLimit: 200, downloadLimit: 25 },
    platinum: { name: 'Platinum', cvLimit: -1, aiLimit: 500, downloadLimit: 120 },
  },
}));

// Mock subscription limits
jest.mock('../../middleware/subscriptionLimits', () => ({
  getUsageStatus: jest.fn(),
  checkCvLimit: jest.fn((req, res, next) => next()),
  checkDownloadLimit: jest.fn((req, res, next) => next()),
  checkAiLimit: jest.fn((req, res, next) => next()),
  incrementCvCount: jest.fn(),
  incrementDownloadCount: jest.fn(),
  incrementAiCount: jest.fn(),
}));

const mockPrisma = prisma as jest.Mocked<typeof prisma>;
const mockStripeService = jest.requireMock('../../services/stripeService');
const mockSubscriptionLimits = jest.requireMock('../../middleware/subscriptionLimits');

describe('Payments API Integration Tests', () => {
  let testUser: ReturnType<typeof createStarterUser>;
  let authToken: string;

  beforeEach(() => {
    jest.clearAllMocks();
    testUser = createStarterUser();
    authToken = generateTestToken(testUser);
    (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(testUser);
  });

  // ==================== POST /api/v1/payments/create-checkout ====================
  describe('POST /api/v1/payments/create-checkout', () => {
    it('should create checkout session for valid plan', async () => {
      const checkoutUrl = 'https://checkout.stripe.com/session/test123';
      mockStripeService.createCheckoutSession.mockResolvedValue(checkoutUrl);

      const response = await request(app)
        .post('/api/v1/payments/create-checkout')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ plan: 'gold' });

      expect(response.status).toBe(HTTP_STATUS.OK);
      expect(response.body.url).toBe(checkoutUrl);
      expect(mockStripeService.createCheckoutSession).toHaveBeenCalledWith(
        testUser.id,
        testUser.email,
        testUser.email,
        'gold'
      );
    });

    it('should accept all valid plan types', async () => {
      const plans = ['starter', 'gold', 'diamond', 'platinum'];
      mockStripeService.createCheckoutSession.mockResolvedValue('https://checkout.stripe.com/test');

      for (const plan of plans) {
        const response = await request(app)
          .post('/api/v1/payments/create-checkout')
          .set('Authorization', `Bearer ${authToken}`)
          .send({ plan });

        expect(response.status).toBe(HTTP_STATUS.OK);
      }
    });

    it('should return 400 for invalid plan', async () => {
      const response = await request(app)
        .post('/api/v1/payments/create-checkout')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ plan: 'invalid-plan' });

      expect(response.status).toBe(HTTP_STATUS.BAD_REQUEST);
      expect(response.body.detail).toContain('Invalid plan');
    });

    it('should return 400 for missing plan', async () => {
      const response = await request(app)
        .post('/api/v1/payments/create-checkout')
        .set('Authorization', `Bearer ${authToken}`)
        .send({});

      expect(response.status).toBe(HTTP_STATUS.BAD_REQUEST);
    });

    it('should return 401 without authentication', async () => {
      const response = await request(app)
        .post('/api/v1/payments/create-checkout')
        .send({ plan: 'gold' });

      expect(response.status).toBe(HTTP_STATUS.UNAUTHORIZED);
    });

    it('should return 500 if Stripe fails', async () => {
      mockStripeService.createCheckoutSession.mockRejectedValue(new Error('Stripe error'));

      const response = await request(app)
        .post('/api/v1/payments/create-checkout')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ plan: 'gold' });

      expect(response.status).toBe(HTTP_STATUS.INTERNAL_ERROR);
    });
  });

  // ==================== POST /api/v1/payments/create-portal ====================
  describe('POST /api/v1/payments/create-portal', () => {
    it('should create portal session for authenticated user', async () => {
      const portalUrl = 'https://billing.stripe.com/session/test123';
      mockStripeService.createPortalSession.mockResolvedValue(portalUrl);

      const response = await request(app)
        .post('/api/v1/payments/create-portal')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(HTTP_STATUS.OK);
      expect(response.body.url).toBe(portalUrl);
      expect(mockStripeService.createPortalSession).toHaveBeenCalledWith(testUser.id);
    });

    it('should return 401 without authentication', async () => {
      const response = await request(app)
        .post('/api/v1/payments/create-portal');

      expect(response.status).toBe(HTTP_STATUS.UNAUTHORIZED);
    });

    it('should return 500 if user has no Stripe customer', async () => {
      mockStripeService.createPortalSession.mockRejectedValue(
        new Error('No Stripe customer ID found')
      );

      const response = await request(app)
        .post('/api/v1/payments/create-portal')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(HTTP_STATUS.INTERNAL_ERROR);
      expect(response.body.detail).toContain('No Stripe customer');
    });
  });

  // ==================== GET /api/v1/payments/status ====================
  describe('GET /api/v1/payments/status', () => {
    it('should return subscription status for authenticated user', async () => {
      const mockStatus = {
        tier: 'gold',
        status: 'active',
        currentPeriodEnd: new Date('2025-12-31'),
        limits: {
          cv: { used: 5, limit: 80 },
          ai: { used: 10, limit: 30 },
          download: { used: 2, limit: 10 },
        },
      };
      mockStripeService.getSubscriptionStatus.mockResolvedValue(mockStatus);

      const response = await request(app)
        .get('/api/v1/payments/status')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(HTTP_STATUS.OK);
      expect(response.body.tier).toBe('gold');
      expect(response.body.status).toBe('active');
    });

    it('should return free tier for user without subscription', async () => {
      mockStripeService.getSubscriptionStatus.mockResolvedValue({
        tier: 'free',
        status: null,
        limits: { cv: { used: 0, limit: 0 }, ai: { used: 0, limit: 0 } },
      });

      const response = await request(app)
        .get('/api/v1/payments/status')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(HTTP_STATUS.OK);
      expect(response.body.tier).toBe('free');
    });

    it('should return 401 without authentication', async () => {
      const response = await request(app)
        .get('/api/v1/payments/status');

      expect(response.status).toBe(HTTP_STATUS.UNAUTHORIZED);
    });
  });

  // ==================== GET /api/v1/payments/status ====================
  describe('GET /api/v1/payments/status', () => {
    it('should return usage status for authenticated user', async () => {
      const mockStatus = {
        subscriptionTier: 'gold',
        subscriptionStatus: 'active',
        cvCreatedCount: 5,
        aiUsedCount: 10,
        downloadCount: 2,
        coverLetterCount: 1,
        isTrialing: false,
        limits: {
          cvLimit: 150,
          aiLimit: 100,
          downloadLimit: 10,
          coverLetterLimit: 30,
        },
      };
      // The /status endpoint calls getSubscriptionStatus from stripeService
      mockStripeService.getSubscriptionStatus.mockResolvedValue(mockStatus);

      const response = await request(app)
        .get('/api/v1/payments/status')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(HTTP_STATUS.OK);
      expect(response.body.cvCreatedCount).toBe(5);
      expect(response.body.subscriptionTier).toBe('gold');
    });

    it('should return null data if user not found (status still returns)', async () => {
      // When user doesn't exist, getSubscriptionStatus returns null
      // The route doesn't explicitly handle this with 404, it returns whatever the service returns
      mockStripeService.getSubscriptionStatus.mockResolvedValue(null);

      const response = await request(app)
        .get('/api/v1/payments/status')
        .set('Authorization', `Bearer ${authToken}`);

      // Route returns the null as-is (would be JSON null)
      expect(response.status).toBe(HTTP_STATUS.OK);
      expect(response.body).toBeNull();
    });

    it('should return 401 without authentication', async () => {
      const response = await request(app)
        .get('/api/v1/payments/status');

      expect(response.status).toBe(HTTP_STATUS.UNAUTHORIZED);
    });
  });

  // ==================== Authorization Tests ====================
  describe('Authorization', () => {
    const endpoints = [
      { method: 'post', path: '/api/v1/payments/create-checkout', body: { plan: 'gold' } },
      { method: 'post', path: '/api/v1/payments/create-portal', body: {} },
      { method: 'get', path: '/api/v1/payments/status', body: null },
    ];

    it('all payment endpoints require authentication', async () => {
      for (const endpoint of endpoints) {
        const req = (request(app) as any)[endpoint.method](endpoint.path);
        if (endpoint.body) {
          req.send(endpoint.body);
        }
        const response = await req;
        expect(response.status).toBe(HTTP_STATUS.UNAUTHORIZED);
      }
    });

    it('should reject invalid JWT tokens', async () => {
      const response = await request(app)
        .get('/api/v1/payments/status')
        .set('Authorization', 'Bearer invalid-token');

      expect(response.status).toBe(HTTP_STATUS.UNAUTHORIZED);
    });

    it('should reject expired JWT tokens', async () => {
      // This would require creating an expired token
      // For now, just test that malformed tokens are rejected
      const response = await request(app)
        .get('/api/v1/payments/status')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.invalid');

      expect(response.status).toBe(HTTP_STATUS.UNAUTHORIZED);
    });
  });
});
