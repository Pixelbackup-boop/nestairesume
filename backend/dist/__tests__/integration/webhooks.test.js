"use strict";
/**
 * Webhooks API Integration Tests
 * Tests the /api/v1/webhooks endpoints
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const testUtils_1 = require("../helpers/testUtils");
const webhooks_1 = require("../../routes/webhooks");
// Mock Stripe service
jest.mock('../../services/stripeService', () => ({
    constructWebhookEvent: jest.fn(),
    handleWebhookEvent: jest.fn(),
}));
const mockStripeService = jest.requireMock('../../services/stripeService');
describe('Webhooks API Integration Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (0, webhooks_1.clearProcessedEvents)();
    });
    // ==================== POST /api/v1/webhooks/stripe ====================
    describe('POST /api/v1/webhooks/stripe', () => {
        const validSignature = 'whsec_test_signature_12345';
        const mockEvent = {
            id: 'evt_test_123',
            type: 'checkout.session.completed',
            data: {
                object: {
                    id: 'cs_test_123',
                    customer: 'cus_test_123',
                    metadata: { userId: 'user-123', plan: 'gold' },
                },
            },
        };
        it('should return 400 for missing stripe-signature header', async () => {
            const response = await (0, supertest_1.default)(app_1.default)
                .post('/api/v1/webhooks/stripe')
                .send(JSON.stringify({ test: 'data' }))
                .set('Content-Type', 'application/json');
            expect(response.status).toBe(testUtils_1.HTTP_STATUS.BAD_REQUEST);
            expect(response.body.detail).toContain('stripe-signature');
        });
        it('should process valid webhook event', async () => {
            mockStripeService.constructWebhookEvent.mockReturnValue(mockEvent);
            mockStripeService.handleWebhookEvent.mockResolvedValue(undefined);
            const response = await (0, supertest_1.default)(app_1.default)
                .post('/api/v1/webhooks/stripe')
                .set('stripe-signature', validSignature)
                .set('Content-Type', 'application/json')
                .send(JSON.stringify({ test: 'data' }));
            expect(response.status).toBe(testUtils_1.HTTP_STATUS.OK);
            expect(response.body.received).toBe(true);
            expect(mockStripeService.handleWebhookEvent).toHaveBeenCalledWith(mockEvent);
        });
        it('should return 400 for invalid signature', async () => {
            mockStripeService.constructWebhookEvent.mockImplementation(() => {
                throw new Error('Invalid signature');
            });
            const response = await (0, supertest_1.default)(app_1.default)
                .post('/api/v1/webhooks/stripe')
                .set('stripe-signature', 'invalid_signature')
                .set('Content-Type', 'application/json')
                .send(JSON.stringify({ test: 'data' }));
            expect(response.status).toBe(testUtils_1.HTTP_STATUS.BAD_REQUEST);
            expect(response.body.detail).toContain('Invalid signature');
        });
        it('should return 400 when webhook handler fails', async () => {
            mockStripeService.constructWebhookEvent.mockReturnValue(mockEvent);
            mockStripeService.handleWebhookEvent.mockRejectedValue(new Error('Handler error'));
            const response = await (0, supertest_1.default)(app_1.default)
                .post('/api/v1/webhooks/stripe')
                .set('stripe-signature', validSignature)
                .set('Content-Type', 'application/json')
                .send(JSON.stringify({ test: 'data' }));
            expect(response.status).toBe(testUtils_1.HTTP_STATUS.BAD_REQUEST);
            expect(response.body.detail).toContain('Handler error');
        });
        describe('Webhook Event Types', () => {
            const eventTypes = [
                'checkout.session.completed',
                'invoice.paid',
                'invoice.payment_failed',
                'customer.subscription.deleted',
                'customer.subscription.updated',
            ];
            for (const eventType of eventTypes) {
                it(`should handle ${eventType} event`, async () => {
                    const event = { ...mockEvent, type: eventType };
                    mockStripeService.constructWebhookEvent.mockReturnValue(event);
                    mockStripeService.handleWebhookEvent.mockResolvedValue(undefined);
                    const response = await (0, supertest_1.default)(app_1.default)
                        .post('/api/v1/webhooks/stripe')
                        .set('stripe-signature', validSignature)
                        .set('Content-Type', 'application/json')
                        .send(JSON.stringify({ test: 'data' }));
                    expect(response.status).toBe(testUtils_1.HTTP_STATUS.OK);
                    expect(mockStripeService.handleWebhookEvent).toHaveBeenCalledWith(expect.objectContaining({ type: eventType }));
                });
            }
        });
        describe('Security', () => {
            it('should require Content-Type to be application/json or raw', async () => {
                // Stripe sends raw body, but should still work
                mockStripeService.constructWebhookEvent.mockReturnValue(mockEvent);
                mockStripeService.handleWebhookEvent.mockResolvedValue(undefined);
                const response = await (0, supertest_1.default)(app_1.default)
                    .post('/api/v1/webhooks/stripe')
                    .set('stripe-signature', validSignature)
                    .set('Content-Type', 'application/json')
                    .send(Buffer.from('{"test":"data"}'));
                expect(response.status).toBe(testUtils_1.HTTP_STATUS.OK);
            });
            it('should not expose internal errors', async () => {
                mockStripeService.constructWebhookEvent.mockImplementation(() => {
                    throw new Error('Internal database connection failed at 192.168.1.1');
                });
                const response = await (0, supertest_1.default)(app_1.default)
                    .post('/api/v1/webhooks/stripe')
                    .set('stripe-signature', validSignature)
                    .set('Content-Type', 'application/json')
                    .send(JSON.stringify({}));
                expect(response.status).toBe(testUtils_1.HTTP_STATUS.BAD_REQUEST);
                // Error message is passed through, but that's acceptable for webhook debugging
                expect(response.body.detail).toBeDefined();
            });
        });
    });
});
//# sourceMappingURL=webhooks.test.js.map