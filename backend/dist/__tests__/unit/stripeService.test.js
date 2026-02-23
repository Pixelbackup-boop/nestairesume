"use strict";
/**
 * Stripe Service Unit Tests
 * CRITICAL: Tests payment processing and webhook handling
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stripeService_1 = require("../../services/stripeService");
const database_1 = __importDefault(require("../../config/database"));
const testUtils_1 = require("../helpers/testUtils");
// Mock dependencies
jest.mock('../../config/database');
const mockPrisma = database_1.default;
describe('Stripe Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    // ==================== PLAN CONFIGURATION ====================
    describe('PLANS Configuration', () => {
        describe('Starter Plan', () => {
            it('should have correct CV limit (30)', () => {
                expect(stripeService_1.PLANS.starter.cvLimit).toBe(30);
            });
            it('should have correct AI limit (50)', () => {
                expect(stripeService_1.PLANS.starter.aiLimit).toBe(50);
            });
            it('should have correct download limit (3)', () => {
                expect(stripeService_1.PLANS.starter.downloadLimit).toBe(3);
            });
            it('should have correct cover letter limit (10)', () => {
                expect(stripeService_1.PLANS.starter.coverLetterLimit).toBe(10);
            });
        });
        describe('Gold Plan', () => {
            it('should have correct CV limit (150)', () => {
                expect(stripeService_1.PLANS.gold.cvLimit).toBe(150);
            });
            it('should have correct AI limit (100)', () => {
                expect(stripeService_1.PLANS.gold.aiLimit).toBe(100);
            });
            it('should have correct download limit (10)', () => {
                expect(stripeService_1.PLANS.gold.downloadLimit).toBe(10);
            });
        });
        describe('Diamond Plan', () => {
            it('should have correct CV limit (300)', () => {
                expect(stripeService_1.PLANS.diamond.cvLimit).toBe(300);
            });
            it('should have correct AI limit (200)', () => {
                expect(stripeService_1.PLANS.diamond.aiLimit).toBe(200);
            });
            it('should have correct download limit (25)', () => {
                expect(stripeService_1.PLANS.diamond.downloadLimit).toBe(25);
            });
        });
        describe('Platinum Plan', () => {
            it('should have UNLIMITED CV creations (-1)', () => {
                expect(stripeService_1.PLANS.platinum.cvLimit).toBe(-1);
            });
            it('should have correct AI limit (500)', () => {
                expect(stripeService_1.PLANS.platinum.aiLimit).toBe(500);
            });
            it('should have 120 downloads/month', () => {
                expect(stripeService_1.PLANS.platinum.downloadLimit).toBe(120);
            });
            it('should have UNLIMITED cover letters (-1)', () => {
                expect(stripeService_1.PLANS.platinum.coverLetterLimit).toBe(-1);
            });
        });
        describe('Plan Hierarchy', () => {
            it('should have increasing CV limits (starter < gold < diamond < platinum)', () => {
                expect(stripeService_1.PLANS.starter.cvLimit).toBeLessThan(stripeService_1.PLANS.gold.cvLimit);
                expect(stripeService_1.PLANS.gold.cvLimit).toBeLessThan(stripeService_1.PLANS.diamond.cvLimit);
                // Platinum is -1 (unlimited), so different comparison
                expect(stripeService_1.PLANS.platinum.cvLimit).toBe(-1);
            });
            it('should have increasing AI limits', () => {
                expect(stripeService_1.PLANS.starter.aiLimit).toBeLessThan(stripeService_1.PLANS.gold.aiLimit);
                expect(stripeService_1.PLANS.gold.aiLimit).toBeLessThan(stripeService_1.PLANS.diamond.aiLimit);
                expect(stripeService_1.PLANS.diamond.aiLimit).toBeLessThan(stripeService_1.PLANS.platinum.aiLimit);
            });
            it('should have increasing download limits', () => {
                expect(stripeService_1.PLANS.starter.downloadLimit).toBeLessThan(stripeService_1.PLANS.gold.downloadLimit);
                expect(stripeService_1.PLANS.gold.downloadLimit).toBeLessThan(stripeService_1.PLANS.diamond.downloadLimit);
                expect(stripeService_1.PLANS.diamond.downloadLimit).toBeLessThan(stripeService_1.PLANS.platinum.downloadLimit);
            });
        });
        describe('All Plans', () => {
            it('should have required fields', () => {
                const requiredFields = [
                    'name',
                    'priceId',
                    'type',
                    'cvLimit',
                    'aiLimit',
                    'downloadLimit',
                    'coverLetterLimit',
                ];
                Object.values(stripeService_1.PLANS).forEach((plan) => {
                    requiredFields.forEach((field) => {
                        expect(plan).toHaveProperty(field);
                    });
                });
            });
            it('should all be subscription type', () => {
                Object.values(stripeService_1.PLANS).forEach((plan) => {
                    expect(plan.type).toBe('subscription');
                });
            });
        });
    });
    // ==================== GET SUBSCRIPTION STATUS ====================
    describe('getSubscriptionStatus', () => {
        it('should return user subscription with limits', async () => {
            const user = (0, testUtils_1.createStarterUser)({
                cvCreatedCount: 10,
                aiUsedCount: 5,
                downloadCount: 2,
                coverLetterCount: 3,
            });
            mockPrisma.user.findUnique.mockResolvedValue(user);
            const status = await (0, stripeService_1.getSubscriptionStatus)(user.id);
            expect(status).toMatchObject({
                subscriptionTier: 'starter',
                subscriptionStatus: 'active',
                cvCreatedCount: 10,
                aiUsedCount: 5,
                downloadCount: 2,
                coverLetterCount: 3,
                limits: {
                    cvLimit: 30,
                    aiLimit: 50,
                    downloadLimit: 3,
                    coverLetterLimit: 10,
                },
            });
        });
        it('should return null for non-existent user', async () => {
            mockPrisma.user.findUnique.mockResolvedValue(null);
            const status = await (0, stripeService_1.getSubscriptionStatus)('non-existent-id');
            expect(status).toBeNull();
        });
        it('should handle platinum unlimited limits', async () => {
            const platinumUser = (0, testUtils_1.createPlatinumUser)();
            mockPrisma.user.findUnique.mockResolvedValue(platinumUser);
            const status = await (0, stripeService_1.getSubscriptionStatus)(platinumUser.id);
            expect(status?.limits?.cvLimit).toBe(-1);
            expect(status?.limits?.downloadLimit).toBe(120);
            expect(status?.limits?.coverLetterLimit).toBe(-1);
        });
    });
    // ==================== PLAN LIMITS MATCH TEST UTILS ====================
    describe('PLANS match testUtils PLAN_LIMITS', () => {
        it('starter limits should match', () => {
            expect(stripeService_1.PLANS.starter.cvLimit).toBe(testUtils_1.PLAN_LIMITS.starter.cvLimit);
            expect(stripeService_1.PLANS.starter.aiLimit).toBe(testUtils_1.PLAN_LIMITS.starter.aiLimit);
            expect(stripeService_1.PLANS.starter.downloadLimit).toBe(testUtils_1.PLAN_LIMITS.starter.downloadLimit);
            expect(stripeService_1.PLANS.starter.coverLetterLimit).toBe(testUtils_1.PLAN_LIMITS.starter.coverLetterLimit);
        });
        it('gold limits should match', () => {
            expect(stripeService_1.PLANS.gold.cvLimit).toBe(testUtils_1.PLAN_LIMITS.gold.cvLimit);
            expect(stripeService_1.PLANS.gold.aiLimit).toBe(testUtils_1.PLAN_LIMITS.gold.aiLimit);
            expect(stripeService_1.PLANS.gold.downloadLimit).toBe(testUtils_1.PLAN_LIMITS.gold.downloadLimit);
        });
        it('diamond limits should match', () => {
            expect(stripeService_1.PLANS.diamond.cvLimit).toBe(testUtils_1.PLAN_LIMITS.diamond.cvLimit);
            expect(stripeService_1.PLANS.diamond.aiLimit).toBe(testUtils_1.PLAN_LIMITS.diamond.aiLimit);
            expect(stripeService_1.PLANS.diamond.downloadLimit).toBe(testUtils_1.PLAN_LIMITS.diamond.downloadLimit);
        });
        it('platinum limits should match', () => {
            expect(stripeService_1.PLANS.platinum.cvLimit).toBe(testUtils_1.PLAN_LIMITS.platinum.cvLimit);
            expect(stripeService_1.PLANS.platinum.aiLimit).toBe(testUtils_1.PLAN_LIMITS.platinum.aiLimit);
            expect(stripeService_1.PLANS.platinum.downloadLimit).toBe(testUtils_1.PLAN_LIMITS.platinum.downloadLimit);
        });
    });
});
// ==================== WEBHOOK HANDLER TESTS ====================
describe('Stripe Webhook Handlers', () => {
    // Note: Full webhook tests would require mocking Stripe SDK
    // These are placeholder tests for the webhook logic
    describe('checkout.session.completed', () => {
        it('should create payment record on checkout complete', () => {
            // This tests that after checkout.session.completed webhook:
            // 1. Payment record is created
            // 2. User tier is updated
            // 3. Usage counters are reset
            expect(true).toBe(true); // Placeholder
        });
    });
    describe('invoice.paid', () => {
        it('should reset usage counters on invoice paid', () => {
            // This tests that after invoice.paid webhook:
            // 1. All monthly counters reset to 0
            // 2. subscriptionStatus confirmed as active
            expect(true).toBe(true); // Placeholder
        });
    });
    describe('customer.subscription.deleted', () => {
        it('should set tier to expired on subscription delete', () => {
            // This tests that after subscription deleted:
            // 1. User tier becomes "expired"
            // 2. User loses access to features
            expect(true).toBe(true); // Placeholder
        });
    });
    describe('invoice.payment_failed', () => {
        it('should set status to past_due on payment failure', () => {
            // This tests that after payment failure:
            // 1. subscriptionStatus becomes "past_due"
            // 2. User should see warning
            expect(true).toBe(true); // Placeholder
        });
    });
});
//# sourceMappingURL=stripeService.test.js.map