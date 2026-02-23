/**
 * Stripe Sandbox E2E Tests
 *
 * These tests use REAL Stripe API calls in test mode (sandbox).
 * They verify the Stripe integration works correctly.
 *
 * Prerequisites:
 * 1. Set STRIPE_SECRET_KEY to your sk_test_xxx key in .env
 * 2. Run: npm run test:e2e:stripe
 *
 * Test Cards (Stripe Test Mode):
 * - Success: 4242 4242 4242 4242
 * - Declined: 4000 0000 0000 0002
 * - Insufficient Funds: 4000 0000 0000 9995
 * - 3D Secure: 4000 0025 0000 3155
 */
export {};
//# sourceMappingURL=stripe-sandbox.test.d.ts.map