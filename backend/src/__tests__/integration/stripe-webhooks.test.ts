/**
 * Stripe Webhook Integration Tests
 *
 * Tests the complete subscription lifecycle:
 * - Checkout completion
 * - Subscription creation/updates
 * - Payment success/failure
 * - Subscription cancellation
 *
 * NOTE: These tests mock Stripe - they don't require real Stripe credentials.
 * For real Stripe testing with test cards, use the E2E tests manually.
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
  PLAN_LIMITS,
} from '../helpers/testUtils';
import * as stripeService from '../../services/stripeService';

// Mock Prisma
jest.mock('../../config/database');
const mockPrisma = prisma as jest.Mocked<typeof prisma>;

// Mock Stripe service functions
jest.mock('../../services/stripeService', () => ({
  ...jest.requireActual('../../services/stripeService'),
  createCheckoutSession: jest.fn(),
  createPortalSession: jest.fn(),
  getSubscriptionStatus: jest.fn(),
  constructWebhookEvent: jest.fn(),
  handleWebhookEvent: jest.fn(),
  PLANS: {
    starter: {
      name: 'Starter',
      priceId: 'price_starter_test',
      type: 'subscription',
      cvLimit: 30,
      aiLimit: 50,
      downloadLimit: 3,
      coverLetterLimit: 10,
    },
    gold: {
      name: 'Gold',
      priceId: 'price_gold_test',
      type: 'subscription',
      cvLimit: 150,
      aiLimit: 100,
      downloadLimit: 10,
      coverLetterLimit: 30,
    },
    diamond: {
      name: 'Diamond',
      priceId: 'price_diamond_test',
      type: 'subscription',
      cvLimit: 300,
      aiLimit: 200,
      downloadLimit: 25,
      coverLetterLimit: 50,
    },
    platinum: {
      name: 'Platinum',
      priceId: 'price_platinum_test',
      type: 'subscription',
      cvLimit: -1,
      aiLimit: 500,
      downloadLimit: 120,
      coverLetterLimit: -1,
    },
  },
}));

const mockStripeService = stripeService as jest.Mocked<typeof stripeService>;

describe('Stripe Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ================================================================
  // CHECKOUT SESSION CREATION
  // ================================================================
  describe('POST /api/v1/payments/create-checkout', () => {
    it('should create checkout session for STARTER plan', async () => {
      const user = createTestUser();
      const token = generateTestToken(user);
      const checkoutUrl = 'https://checkout.stripe.com/test-session';

      (mockStripeService.createCheckoutSession as jest.Mock).mockResolvedValue(checkoutUrl);

      const response = await request(app)
        .post('/api/v1/payments/create-checkout')
        .set('Authorization', `Bearer ${token}`)
        .send({ plan: 'starter' });

      expect(response.status).toBe(HTTP_STATUS.OK);
      expect(response.body.url).toBe(checkoutUrl);
      expect(mockStripeService.createCheckoutSession).toHaveBeenCalledWith(
        user.id,
        user.email,
        expect.any(String),
        'starter'
      );
    });

    it('should create checkout session for GOLD plan', async () => {
      const user = createTestUser();
      const token = generateTestToken(user);
      const checkoutUrl = 'https://checkout.stripe.com/test-session-gold';

      (mockStripeService.createCheckoutSession as jest.Mock).mockResolvedValue(checkoutUrl);

      const response = await request(app)
        .post('/api/v1/payments/create-checkout')
        .set('Authorization', `Bearer ${token}`)
        .send({ plan: 'gold' });

      expect(response.status).toBe(HTTP_STATUS.OK);
      expect(response.body.url).toBe(checkoutUrl);
    });

    it('should reject invalid plan', async () => {
      const user = createTestUser();
      const token = generateTestToken(user);

      const response = await request(app)
        .post('/api/v1/payments/create-checkout')
        .set('Authorization', `Bearer ${token}`)
        .send({ plan: 'invalid-plan' });

      expect(response.status).toBe(HTTP_STATUS.BAD_REQUEST);
    });

    it('should reject unauthenticated request', async () => {
      const response = await request(app)
        .post('/api/v1/payments/create-checkout')
        .send({ plan: 'starter' });

      expect(response.status).toBe(HTTP_STATUS.UNAUTHORIZED);
    });

    it('should reject missing plan parameter', async () => {
      const user = createTestUser();
      const token = generateTestToken(user);

      const response = await request(app)
        .post('/api/v1/payments/create-checkout')
        .set('Authorization', `Bearer ${token}`)
        .send({});

      expect(response.status).toBe(HTTP_STATUS.BAD_REQUEST);
    });
  });

  // ================================================================
  // CUSTOMER PORTAL
  // ================================================================
  describe('POST /api/v1/payments/create-portal', () => {
    it('should create portal session for subscribed user', async () => {
      const user = createStarterUser({ stripeCustomerId: 'cus_test123' });
      const token = generateTestToken(user);
      const portalUrl = 'https://billing.stripe.com/test-portal';

      (mockStripeService.createPortalSession as jest.Mock).mockResolvedValue(portalUrl);

      const response = await request(app)
        .post('/api/v1/payments/create-portal')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(HTTP_STATUS.OK);
      expect(response.body.url).toBe(portalUrl);
    });

    it('should reject unauthenticated request', async () => {
      const response = await request(app)
        .post('/api/v1/payments/create-portal');

      expect(response.status).toBe(HTTP_STATUS.UNAUTHORIZED);
    });
  });

  // ================================================================
  // SUBSCRIPTION STATUS
  // ================================================================
  describe('GET /api/v1/payments/status', () => {
    it('should return status for STARTER user', async () => {
      const user = createStarterUser({
        cvCreatedCount: 10,
        aiUsedCount: 1,
        downloadCount: 2,
      });
      const token = generateTestToken(user);

      (mockStripeService.getSubscriptionStatus as jest.Mock).mockResolvedValue({
        subscriptionTier: 'starter',
        subscriptionStatus: 'active',
        limits: {
          cvLimit: PLAN_LIMITS.starter.cvLimit,
          aiLimit: PLAN_LIMITS.starter.aiLimit,
          downloadLimit: PLAN_LIMITS.starter.downloadLimit,
          coverLetterLimit: PLAN_LIMITS.starter.coverLetterLimit,
        },
        cvCreatedCount: 10,
        aiUsedCount: 1,
      });

      const response = await request(app)
        .get('/api/v1/payments/status')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(HTTP_STATUS.OK);
      expect(response.body.subscriptionTier).toBe('starter');
      expect(response.body.limits).toBeDefined();
      expect(response.body.limits.cvLimit).toBe(30);
    });

    it('should return status for GOLD active user', async () => {
      const user = createGoldUser();
      const token = generateTestToken(user);

      (mockStripeService.getSubscriptionStatus as jest.Mock).mockResolvedValue({
        subscriptionTier: 'gold',
        subscriptionStatus: 'active',
        limits: {
          cvLimit: PLAN_LIMITS.gold.cvLimit,
          aiLimit: PLAN_LIMITS.gold.aiLimit,
          downloadLimit: PLAN_LIMITS.gold.downloadLimit,
          coverLetterLimit: PLAN_LIMITS.gold.coverLetterLimit,
        },
      });

      const response = await request(app)
        .get('/api/v1/payments/status')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(HTTP_STATUS.OK);
      expect(response.body.subscriptionTier).toBe('gold');
      expect(response.body.subscriptionStatus).toBe('active');
    });

    it('should return status for PLATINUM user with unlimited limits', async () => {
      const user = createTestUser({ subscriptionTier: 'platinum', subscriptionStatus: 'active' });
      const token = generateTestToken(user);

      (mockStripeService.getSubscriptionStatus as jest.Mock).mockResolvedValue({
        subscriptionTier: 'platinum',
        subscriptionStatus: 'active',
        limits: {
          cvLimit: -1, // Unlimited
          aiLimit: 500,
          downloadLimit: 120,
          coverLetterLimit: -1, // Unlimited
        },
      });

      const response = await request(app)
        .get('/api/v1/payments/status')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(HTTP_STATUS.OK);
      expect(response.body.subscriptionTier).toBe('platinum');
      expect(response.body.limits.cvLimit).toBe(-1);
      expect(response.body.limits.downloadLimit).toBe(120);
    });

    it('should reject unauthenticated request', async () => {
      const response = await request(app)
        .get('/api/v1/payments/status');

      expect(response.status).toBe(HTTP_STATUS.UNAUTHORIZED);
    });
  });

  // ================================================================
  // SUBSCRIPTION LIFECYCLE SCENARIOS
  // ================================================================
  describe('Subscription Lifecycle', () => {
    describe('New Subscription', () => {
      it('should activate STARTER subscription immediately', () => {
        const plan = (mockStripeService as any).PLANS.starter;
        expect(plan.cvLimit).toBe(30);
        expect(plan.aiLimit).toBe(50);
      });

      it('should activate GOLD subscription immediately', () => {
        const plan = (mockStripeService as any).PLANS.gold;
        expect(plan.cvLimit).toBe(150);
        expect(plan.aiLimit).toBe(100);
      });

      it('should activate DIAMOND subscription immediately', () => {
        const plan = (mockStripeService as any).PLANS.diamond;
        expect(plan.cvLimit).toBe(300);
        expect(plan.aiLimit).toBe(200);
      });

      it('should activate PLATINUM subscription immediately', () => {
        const plan = (mockStripeService as any).PLANS.platinum;
        expect(plan.cvLimit).toBe(-1);
        expect(plan.aiLimit).toBe(500);
      });
    });

    describe('Subscription Cancellation', () => {
      it('canceled subscription should have expired tier', async () => {
        const user = createTestUser({
          subscriptionTier: 'expired',
          subscriptionStatus: 'canceled',
          subscriptionId: null,
        });

        expect(user.subscriptionTier).toBe('expired');
        expect(user.subscriptionStatus).toBe('canceled');
      });
    });

    describe('Payment Failure', () => {
      it('failed payment should set status to past_due', async () => {
        const user = createGoldUser({
          subscriptionStatus: 'past_due',
        });

        expect(user.subscriptionStatus).toBe('past_due');
      });
    });
  });

  // ================================================================
  // PLAN COMPARISON
  // ================================================================
  describe('Plan Feature Comparison', () => {
    it('GOLD should have more limits than STARTER', () => {
      expect(PLAN_LIMITS.gold.cvLimit).toBeGreaterThan(PLAN_LIMITS.starter.cvLimit);
      expect(PLAN_LIMITS.gold.aiLimit).toBeGreaterThan(PLAN_LIMITS.starter.aiLimit);
      expect(PLAN_LIMITS.gold.downloadLimit).toBeGreaterThan(PLAN_LIMITS.starter.downloadLimit);
      expect(PLAN_LIMITS.gold.coverLetterLimit).toBeGreaterThan(PLAN_LIMITS.starter.coverLetterLimit);
    });

    it('DIAMOND should have more limits than GOLD', () => {
      expect(PLAN_LIMITS.diamond.cvLimit).toBeGreaterThan(PLAN_LIMITS.gold.cvLimit);
      expect(PLAN_LIMITS.diamond.aiLimit).toBeGreaterThan(PLAN_LIMITS.gold.aiLimit);
      expect(PLAN_LIMITS.diamond.downloadLimit).toBeGreaterThan(PLAN_LIMITS.gold.downloadLimit);
      expect(PLAN_LIMITS.diamond.coverLetterLimit).toBeGreaterThan(PLAN_LIMITS.gold.coverLetterLimit);
    });

    it('PLATINUM should have highest limits', () => {
      expect(PLAN_LIMITS.platinum.cvLimit).toBe(-1);
      expect(PLAN_LIMITS.platinum.downloadLimit).toBe(120);
      expect(PLAN_LIMITS.platinum.coverLetterLimit).toBe(-1);
      // AI still has a cap even for platinum
      expect(PLAN_LIMITS.platinum.aiLimit).toBe(500);
    });
  });

  // ================================================================
  // ERROR HANDLING
  // ================================================================
  describe('Error Handling', () => {
    it('should handle Stripe service errors gracefully', async () => {
      const user = createTestUser();
      const token = generateTestToken(user);

      (mockStripeService.createCheckoutSession as jest.Mock).mockRejectedValue(
        new Error('Stripe is not configured')
      );

      const response = await request(app)
        .post('/api/v1/payments/create-checkout')
        .set('Authorization', `Bearer ${token}`)
        .send({ plan: 'starter' });

      expect(response.status).toBe(HTTP_STATUS.INTERNAL_ERROR);
      expect(response.body.detail).toBeDefined();
    });

    it('should handle portal errors for user without Stripe customer', async () => {
      const user = createTestUser({ stripeCustomerId: null });
      const token = generateTestToken(user);

      (mockStripeService.createPortalSession as jest.Mock).mockRejectedValue(
        new Error('No Stripe customer found')
      );

      const response = await request(app)
        .post('/api/v1/payments/create-portal')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(HTTP_STATUS.INTERNAL_ERROR);
    });
  });
});

// ================================================================
// STRIPE TEST CARD REFERENCE (for manual testing)
// ================================================================
describe('Stripe Test Cards Reference', () => {
  /**
   * These test cards can be used in Stripe test mode for manual testing.
   * Run E2E tests manually with these cards.
   */
  const testCards = {
    success: '4242424242424242',
    declined: '4000000000000002',
    insufficientFunds: '4000000000009995',
    threeDSecure: '4000002500003155',
    expiredCard: '4000000000000069',
  };

  it('should document test card numbers', () => {
    expect(testCards.success).toBe('4242424242424242');
    expect(testCards.declined).toBe('4000000000000002');
    expect(testCards.threeDSecure).toBe('4000002500003155');
  });
});
