/**
 * Subscription Purchase Flow Integration Tests
 *
 * These tests simulate the COMPLETE purchase flow:
 * 1. User initiates checkout
 * 2. Stripe processes payment (mocked)
 * 3. Webhook received → user tier updated
 * 4. User can now use features within their plan limits
 *
 * This tests the real business logic WITHOUT needing Stripe's UI.
 */
export {};
//# sourceMappingURL=subscription-purchase-flow.test.d.ts.map