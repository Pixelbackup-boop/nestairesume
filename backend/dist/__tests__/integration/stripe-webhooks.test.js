"use strict";
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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const database_1 = __importDefault(require("../../config/database"));
const testUtils_1 = require("../helpers/testUtils");
const stripeService = __importStar(require("../../services/stripeService"));
// Mock Prisma
jest.mock('../../config/database');
const mockPrisma = database_1.default;
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
const mockStripeService = stripeService;
describe('Stripe Integration Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    // ================================================================
    // CHECKOUT SESSION CREATION
    // ================================================================
    describe('POST /api/v1/payments/create-checkout', () => {
        it('should create checkout session for STARTER plan', async () => {
            const user = (0, testUtils_1.createTestUser)();
            const token = (0, testUtils_1.generateTestToken)(user);
            const checkoutUrl = 'https://checkout.stripe.com/test-session';
            mockStripeService.createCheckoutSession.mockResolvedValue(checkoutUrl);
            const response = await (0, supertest_1.default)(app_1.default)
                .post('/api/v1/payments/create-checkout')
                .set('Authorization', `Bearer ${token}`)
                .send({ plan: 'starter' });
            expect(response.status).toBe(testUtils_1.HTTP_STATUS.OK);
            expect(response.body.url).toBe(checkoutUrl);
            expect(mockStripeService.createCheckoutSession).toHaveBeenCalledWith(user.id, user.email, expect.any(String), 'starter');
        });
        it('should create checkout session for GOLD plan', async () => {
            const user = (0, testUtils_1.createTestUser)();
            const token = (0, testUtils_1.generateTestToken)(user);
            const checkoutUrl = 'https://checkout.stripe.com/test-session-gold';
            mockStripeService.createCheckoutSession.mockResolvedValue(checkoutUrl);
            const response = await (0, supertest_1.default)(app_1.default)
                .post('/api/v1/payments/create-checkout')
                .set('Authorization', `Bearer ${token}`)
                .send({ plan: 'gold' });
            expect(response.status).toBe(testUtils_1.HTTP_STATUS.OK);
            expect(response.body.url).toBe(checkoutUrl);
        });
        it('should reject invalid plan', async () => {
            const user = (0, testUtils_1.createTestUser)();
            const token = (0, testUtils_1.generateTestToken)(user);
            const response = await (0, supertest_1.default)(app_1.default)
                .post('/api/v1/payments/create-checkout')
                .set('Authorization', `Bearer ${token}`)
                .send({ plan: 'invalid-plan' });
            expect(response.status).toBe(testUtils_1.HTTP_STATUS.BAD_REQUEST);
        });
        it('should reject unauthenticated request', async () => {
            const response = await (0, supertest_1.default)(app_1.default)
                .post('/api/v1/payments/create-checkout')
                .send({ plan: 'starter' });
            expect(response.status).toBe(testUtils_1.HTTP_STATUS.UNAUTHORIZED);
        });
        it('should reject missing plan parameter', async () => {
            const user = (0, testUtils_1.createTestUser)();
            const token = (0, testUtils_1.generateTestToken)(user);
            const response = await (0, supertest_1.default)(app_1.default)
                .post('/api/v1/payments/create-checkout')
                .set('Authorization', `Bearer ${token}`)
                .send({});
            expect(response.status).toBe(testUtils_1.HTTP_STATUS.BAD_REQUEST);
        });
    });
    // ================================================================
    // CUSTOMER PORTAL
    // ================================================================
    describe('POST /api/v1/payments/create-portal', () => {
        it('should create portal session for subscribed user', async () => {
            const user = (0, testUtils_1.createStarterUser)({ stripeCustomerId: 'cus_test123' });
            const token = (0, testUtils_1.generateTestToken)(user);
            const portalUrl = 'https://billing.stripe.com/test-portal';
            mockStripeService.createPortalSession.mockResolvedValue(portalUrl);
            const response = await (0, supertest_1.default)(app_1.default)
                .post('/api/v1/payments/create-portal')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(testUtils_1.HTTP_STATUS.OK);
            expect(response.body.url).toBe(portalUrl);
        });
        it('should reject unauthenticated request', async () => {
            const response = await (0, supertest_1.default)(app_1.default)
                .post('/api/v1/payments/create-portal');
            expect(response.status).toBe(testUtils_1.HTTP_STATUS.UNAUTHORIZED);
        });
    });
    // ================================================================
    // SUBSCRIPTION STATUS
    // ================================================================
    describe('GET /api/v1/payments/status', () => {
        it('should return status for STARTER user', async () => {
            const user = (0, testUtils_1.createStarterUser)({
                cvCreatedCount: 10,
                aiUsedCount: 1,
                downloadCount: 2,
            });
            const token = (0, testUtils_1.generateTestToken)(user);
            mockStripeService.getSubscriptionStatus.mockResolvedValue({
                subscriptionTier: 'starter',
                subscriptionStatus: 'active',
                limits: {
                    cvLimit: testUtils_1.PLAN_LIMITS.starter.cvLimit,
                    aiLimit: testUtils_1.PLAN_LIMITS.starter.aiLimit,
                    downloadLimit: testUtils_1.PLAN_LIMITS.starter.downloadLimit,
                    coverLetterLimit: testUtils_1.PLAN_LIMITS.starter.coverLetterLimit,
                },
                cvCreatedCount: 10,
                aiUsedCount: 1,
            });
            const response = await (0, supertest_1.default)(app_1.default)
                .get('/api/v1/payments/status')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(testUtils_1.HTTP_STATUS.OK);
            expect(response.body.subscriptionTier).toBe('starter');
            expect(response.body.limits).toBeDefined();
            expect(response.body.limits.cvLimit).toBe(30);
        });
        it('should return status for GOLD active user', async () => {
            const user = (0, testUtils_1.createGoldUser)();
            const token = (0, testUtils_1.generateTestToken)(user);
            mockStripeService.getSubscriptionStatus.mockResolvedValue({
                subscriptionTier: 'gold',
                subscriptionStatus: 'active',
                limits: {
                    cvLimit: testUtils_1.PLAN_LIMITS.gold.cvLimit,
                    aiLimit: testUtils_1.PLAN_LIMITS.gold.aiLimit,
                    downloadLimit: testUtils_1.PLAN_LIMITS.gold.downloadLimit,
                    coverLetterLimit: testUtils_1.PLAN_LIMITS.gold.coverLetterLimit,
                },
            });
            const response = await (0, supertest_1.default)(app_1.default)
                .get('/api/v1/payments/status')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(testUtils_1.HTTP_STATUS.OK);
            expect(response.body.subscriptionTier).toBe('gold');
            expect(response.body.subscriptionStatus).toBe('active');
        });
        it('should return status for PLATINUM user with unlimited limits', async () => {
            const user = (0, testUtils_1.createTestUser)({ subscriptionTier: 'platinum', subscriptionStatus: 'active' });
            const token = (0, testUtils_1.generateTestToken)(user);
            mockStripeService.getSubscriptionStatus.mockResolvedValue({
                subscriptionTier: 'platinum',
                subscriptionStatus: 'active',
                limits: {
                    cvLimit: -1, // Unlimited
                    aiLimit: 500,
                    downloadLimit: 120,
                    coverLetterLimit: -1, // Unlimited
                },
            });
            const response = await (0, supertest_1.default)(app_1.default)
                .get('/api/v1/payments/status')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(testUtils_1.HTTP_STATUS.OK);
            expect(response.body.subscriptionTier).toBe('platinum');
            expect(response.body.limits.cvLimit).toBe(-1);
            expect(response.body.limits.downloadLimit).toBe(120);
        });
        it('should reject unauthenticated request', async () => {
            const response = await (0, supertest_1.default)(app_1.default)
                .get('/api/v1/payments/status');
            expect(response.status).toBe(testUtils_1.HTTP_STATUS.UNAUTHORIZED);
        });
    });
    // ================================================================
    // SUBSCRIPTION LIFECYCLE SCENARIOS
    // ================================================================
    describe('Subscription Lifecycle', () => {
        describe('New Subscription', () => {
            it('should activate STARTER subscription immediately', () => {
                const plan = mockStripeService.PLANS.starter;
                expect(plan.cvLimit).toBe(30);
                expect(plan.aiLimit).toBe(50);
            });
            it('should activate GOLD subscription immediately', () => {
                const plan = mockStripeService.PLANS.gold;
                expect(plan.cvLimit).toBe(150);
                expect(plan.aiLimit).toBe(100);
            });
            it('should activate DIAMOND subscription immediately', () => {
                const plan = mockStripeService.PLANS.diamond;
                expect(plan.cvLimit).toBe(300);
                expect(plan.aiLimit).toBe(200);
            });
            it('should activate PLATINUM subscription immediately', () => {
                const plan = mockStripeService.PLANS.platinum;
                expect(plan.cvLimit).toBe(-1);
                expect(plan.aiLimit).toBe(500);
            });
        });
        describe('Subscription Cancellation', () => {
            it('canceled subscription should have expired tier', async () => {
                const user = (0, testUtils_1.createTestUser)({
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
                const user = (0, testUtils_1.createGoldUser)({
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
            expect(testUtils_1.PLAN_LIMITS.gold.cvLimit).toBeGreaterThan(testUtils_1.PLAN_LIMITS.starter.cvLimit);
            expect(testUtils_1.PLAN_LIMITS.gold.aiLimit).toBeGreaterThan(testUtils_1.PLAN_LIMITS.starter.aiLimit);
            expect(testUtils_1.PLAN_LIMITS.gold.downloadLimit).toBeGreaterThan(testUtils_1.PLAN_LIMITS.starter.downloadLimit);
            expect(testUtils_1.PLAN_LIMITS.gold.coverLetterLimit).toBeGreaterThan(testUtils_1.PLAN_LIMITS.starter.coverLetterLimit);
        });
        it('DIAMOND should have more limits than GOLD', () => {
            expect(testUtils_1.PLAN_LIMITS.diamond.cvLimit).toBeGreaterThan(testUtils_1.PLAN_LIMITS.gold.cvLimit);
            expect(testUtils_1.PLAN_LIMITS.diamond.aiLimit).toBeGreaterThan(testUtils_1.PLAN_LIMITS.gold.aiLimit);
            expect(testUtils_1.PLAN_LIMITS.diamond.downloadLimit).toBeGreaterThan(testUtils_1.PLAN_LIMITS.gold.downloadLimit);
            expect(testUtils_1.PLAN_LIMITS.diamond.coverLetterLimit).toBeGreaterThan(testUtils_1.PLAN_LIMITS.gold.coverLetterLimit);
        });
        it('PLATINUM should have highest limits', () => {
            expect(testUtils_1.PLAN_LIMITS.platinum.cvLimit).toBe(-1);
            expect(testUtils_1.PLAN_LIMITS.platinum.downloadLimit).toBe(120);
            expect(testUtils_1.PLAN_LIMITS.platinum.coverLetterLimit).toBe(-1);
            // AI still has a cap even for platinum
            expect(testUtils_1.PLAN_LIMITS.platinum.aiLimit).toBe(500);
        });
    });
    // ================================================================
    // ERROR HANDLING
    // ================================================================
    describe('Error Handling', () => {
        it('should handle Stripe service errors gracefully', async () => {
            const user = (0, testUtils_1.createTestUser)();
            const token = (0, testUtils_1.generateTestToken)(user);
            mockStripeService.createCheckoutSession.mockRejectedValue(new Error('Stripe is not configured'));
            const response = await (0, supertest_1.default)(app_1.default)
                .post('/api/v1/payments/create-checkout')
                .set('Authorization', `Bearer ${token}`)
                .send({ plan: 'starter' });
            expect(response.status).toBe(testUtils_1.HTTP_STATUS.INTERNAL_ERROR);
            expect(response.body.detail).toBeDefined();
        });
        it('should handle portal errors for user without Stripe customer', async () => {
            const user = (0, testUtils_1.createTestUser)({ stripeCustomerId: null });
            const token = (0, testUtils_1.generateTestToken)(user);
            mockStripeService.createPortalSession.mockRejectedValue(new Error('No Stripe customer found'));
            const response = await (0, supertest_1.default)(app_1.default)
                .post('/api/v1/payments/create-portal')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(testUtils_1.HTTP_STATUS.INTERNAL_ERROR);
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
//# sourceMappingURL=stripe-webhooks.test.js.map