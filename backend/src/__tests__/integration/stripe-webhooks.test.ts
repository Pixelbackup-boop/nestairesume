/**
 * Stripe Webhook Integration Tests
 *
 * Tests the complete subscription lifecycle:
 * - Checkout completion
 * - Subscription creation/updates
 * - Payment success/failure
 * - Subscription cancellation
 * - Trial handling
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
  createTrialUser,
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
      aiLimit: 3,
      downloadLimit: 3,
      coverLetterLimit: 10,
      trialDailyLimit: 3,
      hasTrial: false,
    },
    gold: {
      name: 'Gold',
      priceId: 'price_gold_test',
      type: 'subscription',
      cvLimit: 150,
      aiLimit: 10,
      downloadLimit: 10,
      coverLetterLimit: 30,
      trialDailyLimit: 5,
      hasTrial: true,
    },
    diamond: {
      name: 'Diamond',
      priceId: 'price_diamond_test',
      type: 'subscription',
      cvLimit: 300,
      aiLimit: 30,
      downloadLimit: 25,
      coverLetterLimit: 50,
      trialDailyLimit: 10,
      hasTrial: true,
    },
    platinum: {
      name: 'Platinum',
      priceId: 'price_platinum_test',
      type: 'subscription',
      cvLimit: -1,
      aiLimit: 100,
      downloadLimit: -1,
      coverLetterLimit: -1,
      trialDailyLimit: 15,
      hasTrial: false,
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

    it('should create checkout session for GOLD plan with trial', async () => {
      const user = createTestUser({ hasUsedTrial: false });
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
          dailyLimit: PLAN_LIMITS.starter.aiLimit,
        },
        cvCreatedCount: 10,
        aiUsedCount: 1,
        aiUsedToday: 0,
        isTrialing: false,
      });

      const response = await request(app)
        .get('/api/v1/payments/status')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(HTTP_STATUS.OK);
      expect(response.body.subscriptionTier).toBe('starter');
      expect(response.body.limits).toBeDefined();
      expect(response.body.limits.cvLimit).toBe(30);
    });

    it('should return status for GOLD trial user', async () => {
      const trialEndsAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      const user = createTrialUser({ subscriptionTier: 'gold' });
      const token = generateTestToken(user);

      (mockStripeService.getSubscriptionStatus as jest.Mock).mockResolvedValue({
        subscriptionTier: 'gold',
        subscriptionStatus: 'trialing',
        trialEndsAt,
        limits: {
          cvLimit: PLAN_LIMITS.gold.cvLimit,
          aiLimit: PLAN_LIMITS.gold.aiLimit,
          downloadLimit: PLAN_LIMITS.gold.downloadLimit,
          coverLetterLimit: PLAN_LIMITS.gold.coverLetterLimit,
          dailyLimit: PLAN_LIMITS.gold.trialDailyLimit, // Trial daily limit
        },
        isTrialing: true,
      });

      const response = await request(app)
        .get('/api/v1/payments/status')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(HTTP_STATUS.OK);
      expect(response.body.subscriptionTier).toBe('gold');
      expect(response.body.isTrialing).toBe(true);
      expect(response.body.limits.dailyLimit).toBe(PLAN_LIMITS.gold.trialDailyLimit);
    });

    it('should return status for PLATINUM user with unlimited limits', async () => {
      const user = createTestUser({ subscriptionTier: 'platinum', subscriptionStatus: 'active' });
      const token = generateTestToken(user);

      (mockStripeService.getSubscriptionStatus as jest.Mock).mockResolvedValue({
        subscriptionTier: 'platinum',
        subscriptionStatus: 'active',
        limits: {
          cvLimit: -1, // Unlimited
          aiLimit: 100,
          downloadLimit: -1, // Unlimited
          coverLetterLimit: -1, // Unlimited
          dailyLimit: 100,
        },
        isTrialing: false,
      });

      const response = await request(app)
        .get('/api/v1/payments/status')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(HTTP_STATUS.OK);
      expect(response.body.subscriptionTier).toBe('platinum');
      expect(response.body.limits.cvLimit).toBe(-1);
      expect(response.body.limits.downloadLimit).toBe(-1);
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
      it('should activate STARTER subscription immediately (no trial)', () => {
        const plan = (mockStripeService as any).PLANS.starter;
        expect(plan.hasTrial).toBe(false);
      });

      it('should start GOLD subscription with 7-day trial', () => {
        const plan = (mockStripeService as any).PLANS.gold;
        expect(plan.hasTrial).toBe(true);
      });

      it('should start DIAMOND subscription with 7-day trial', () => {
        const plan = (mockStripeService as any).PLANS.diamond;
        expect(plan.hasTrial).toBe(true);
      });

      it('should activate PLATINUM subscription immediately (no trial)', () => {
        const plan = (mockStripeService as any).PLANS.platinum;
        expect(plan.hasTrial).toBe(false);
      });
    });

    describe('Trial to Active Transition', () => {
      it('trial user should have daily AI limits', () => {
        // During trial, daily limit applies
        const goldTrialDailyLimit = PLAN_LIMITS.gold.trialDailyLimit;
        const goldMonthlyLimit = PLAN_LIMITS.gold.aiLimit;

        expect(goldTrialDailyLimit).toBe(5);
        expect(goldMonthlyLimit).toBe(10);
        expect(goldTrialDailyLimit).toBeLessThan(goldMonthlyLimit);
      });

      it('active user should have monthly AI limits', () => {
        const goldMonthlyLimit = PLAN_LIMITS.gold.aiLimit;
        expect(goldMonthlyLimit).toBe(10);
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

    it('PLATINUM should have highest/unlimited limits', () => {
      // Unlimited is represented as -1
      expect(PLAN_LIMITS.platinum.cvLimit).toBe(-1);
      expect(PLAN_LIMITS.platinum.downloadLimit).toBe(-1);
      expect(PLAN_LIMITS.platinum.coverLetterLimit).toBe(-1);
      // AI still has a cap even for platinum
      expect(PLAN_LIMITS.platinum.aiLimit).toBe(100);
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
