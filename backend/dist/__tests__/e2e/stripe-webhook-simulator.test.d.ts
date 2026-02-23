/**
 * Stripe Webhook Simulator Tests
 *
 * These tests simulate webhook events to verify the complete
 * subscription lifecycle without needing real Stripe payments.
 *
 * Use this to test:
 * - checkout.session.completed → User tier updates
 * - invoice.paid → Usage counters reset
 * - customer.subscription.deleted → User becomes expired
 * - invoice.payment_failed → Status becomes past_due
 */
export {};
//# sourceMappingURL=stripe-webhook-simulator.test.d.ts.map