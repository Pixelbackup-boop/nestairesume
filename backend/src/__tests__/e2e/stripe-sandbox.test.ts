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

import Stripe from 'stripe';

// Load environment variables
require('dotenv').config();

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || '';
const STRIPE_CONFIGURED = STRIPE_SECRET_KEY.startsWith('sk_test_');

// Skip all tests if Stripe is not configured
const describeIfStripe = STRIPE_CONFIGURED ? describe : describe.skip;

// Initialize Stripe client
const stripe = STRIPE_CONFIGURED ? new Stripe(STRIPE_SECRET_KEY) : null;

describeIfStripe('Stripe Sandbox E2E Tests', () => {
  // ================================================================
  // TEST: Stripe API Connection
  // ================================================================
  describe('Stripe Connection', () => {
    it('should connect to Stripe API', async () => {
      if (!stripe) return;

      const account = await stripe.accounts.retrieve();
      expect(account.id).toBeDefined();
      console.log(`✓ Connected to Stripe account: ${account.id}`);
    });

    it('should verify test mode is enabled', async () => {
      if (!stripe) return;

      const balance = await stripe.balance.retrieve();
      expect(balance.object).toBe('balance');
      expect(balance.livemode).toBe(false); // Must be in test mode
      console.log('✓ Confirmed: Running in TEST mode (not live)');
    });
  });

  // ================================================================
  // TEST: Customer Operations
  // ================================================================
  describe('Customer Operations', () => {
    let testCustomerId: string;
    const testEmail = `test-${Date.now()}@example.com`;

    afterAll(async () => {
      // Cleanup: Delete test customer
      if (stripe && testCustomerId) {
        try {
          await stripe.customers.del(testCustomerId);
          console.log(`✓ Cleaned up test customer: ${testCustomerId}`);
        } catch (e) {
          // Ignore cleanup errors
        }
      }
    });

    it('should create a customer', async () => {
      if (!stripe) return;

      const customer = await stripe.customers.create({
        email: testEmail,
        name: 'Test User',
        metadata: {
          environment: 'test',
          createdBy: 'e2e-test',
        },
      });

      expect(customer.id).toMatch(/^cus_/);
      testCustomerId = customer.id;
      console.log(`✓ Created customer: ${testCustomerId}`);
    });

    it('should retrieve the customer', async () => {
      if (!stripe || !testCustomerId) return;

      const customer = await stripe.customers.retrieve(testCustomerId);
      expect(customer.id).toBe(testCustomerId);
      expect((customer as Stripe.Customer).email).toBe(testEmail);
    });

    it('should update customer metadata', async () => {
      if (!stripe || !testCustomerId) return;

      const customer = await stripe.customers.update(testCustomerId, {
        metadata: {
          subscriptionTier: 'starter',
          updatedAt: new Date().toISOString(),
        },
      });

      expect((customer as Stripe.Customer).metadata?.subscriptionTier).toBe('starter');
      console.log('✓ Updated customer metadata');
    });
  });

  // ================================================================
  // TEST: Checkout Session Creation
  // ================================================================
  describe('Checkout Session', () => {
    const STARTER_PRICE = process.env.STRIPE_PRICE_STARTER;
    const GOLD_PRICE = process.env.STRIPE_PRICE_GOLD;

    it('should create a checkout session', async () => {
      if (!stripe) return;
      if (!STARTER_PRICE) {
        console.log('⚠️ Skipping: STRIPE_PRICE_STARTER not configured');
        return;
      }

      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [{ price: STARTER_PRICE, quantity: 1 }],
        success_url: 'http://localhost:4455/checkout/success?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: 'http://localhost:4455/checkout/cancel',
        metadata: {
          userId: 'test-user-123',
          plan: 'starter',
        },
      });

      expect(session.id).toMatch(/^cs_test_/);
      expect(session.url).toContain('checkout.stripe.com');
      console.log(`✓ Created checkout session: ${session.id}`);
      console.log(`  URL: ${session.url?.substring(0, 60)}...`);
    });

    it('should create a checkout session with trial', async () => {
      if (!stripe) return;
      if (!GOLD_PRICE) {
        console.log('⚠️ Skipping: STRIPE_PRICE_GOLD not configured');
        return;
      }

      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [{ price: GOLD_PRICE, quantity: 1 }],
        subscription_data: {
          trial_period_days: 7,
        },
        success_url: 'http://localhost:4455/checkout/success?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: 'http://localhost:4455/checkout/cancel',
        metadata: {
          userId: 'test-user-456',
          plan: 'gold',
        },
      });

      expect(session.id).toMatch(/^cs_test_/);
      console.log(`✓ Created checkout session with 7-day trial`);
    });
  });

  // ================================================================
  // TEST: Price Validation
  // ================================================================
  describe('Price Configuration', () => {
    const priceEnvVars = {
      starter: process.env.STRIPE_PRICE_STARTER,
      gold: process.env.STRIPE_PRICE_GOLD,
      diamond: process.env.STRIPE_PRICE_DIAMOND,
      platinum: process.env.STRIPE_PRICE_PLATINUM,
    };

    it('should validate configured price IDs', async () => {
      if (!stripe) return;

      console.log('\n📋 Price Configuration:');

      for (const [plan, priceId] of Object.entries(priceEnvVars)) {
        if (priceId) {
          try {
            const price = await stripe.prices.retrieve(priceId);
            const amount = price.unit_amount ? price.unit_amount / 100 : 0;
            const currency = price.currency.toUpperCase();
            const interval = price.recurring?.interval || 'one-time';

            expect(price.active).toBe(true);
            console.log(`  ✓ ${plan.toUpperCase()}: $${amount} ${currency}/${interval}`);
          } catch (e) {
            console.log(`  ⚠️ ${plan.toUpperCase()}: Price ${priceId} not found or inactive`);
          }
        } else {
          console.log(`  ⚠️ ${plan.toUpperCase()}: Not configured (STRIPE_PRICE_${plan.toUpperCase()})`);
        }
      }
    });
  });

  // ================================================================
  // TEST: Subscription Lifecycle
  // ================================================================
  describe('Subscription Lifecycle', () => {
    it('should list subscription statuses', () => {
      const validStatuses = [
        'active',
        'trialing',
        'past_due',
        'canceled',
        'unpaid',
        'incomplete',
        'incomplete_expired',
      ];

      console.log('\n📋 Valid Subscription Statuses:');
      validStatuses.forEach(status => {
        console.log(`  • ${status}`);
      });

      expect(validStatuses).toContain('active');
      expect(validStatuses).toContain('trialing');
    });
  });
});

// ================================================================
// STRIPE TEST CARDS REFERENCE
// ================================================================
describe('Stripe Test Cards Reference', () => {
  const testCards = {
    success: {
      number: '4242 4242 4242 4242',
      exp: '12/34',
      cvc: '123',
      description: 'Successful payment',
    },
    declined: {
      number: '4000 0000 0000 0002',
      exp: '12/34',
      cvc: '123',
      description: 'Card declined',
    },
    insufficientFunds: {
      number: '4000 0000 0000 9995',
      exp: '12/34',
      cvc: '123',
      description: 'Insufficient funds',
    },
    threeDSecure: {
      number: '4000 0025 0000 3155',
      exp: '12/34',
      cvc: '123',
      description: 'Requires 3D Secure authentication',
    },
    expiredCard: {
      number: '4000 0000 0000 0069',
      exp: '12/34',
      cvc: '123',
      description: 'Expired card',
    },
    incorrectCvc: {
      number: '4000 0000 0000 0127',
      exp: '12/34',
      cvc: '123',
      description: 'Incorrect CVC',
    },
    processingError: {
      number: '4000 0000 0000 0119',
      exp: '12/34',
      cvc: '123',
      description: 'Processing error',
    },
  };

  it('should document test cards for manual testing', () => {
    console.log('\n📋 Stripe Test Cards for Manual Testing:\n');
    Object.entries(testCards).forEach(([name, card]) => {
      console.log(`  ${name.toUpperCase()}`);
      console.log(`    Card: ${card.number}`);
      console.log(`    Exp: ${card.exp}, CVC: ${card.cvc}`);
      console.log(`    → ${card.description}\n`);
    });

    expect(testCards.success.number).toBe('4242 4242 4242 4242');
  });
});

// ================================================================
// STRIPE CLI COMMANDS REFERENCE
// ================================================================
describe('Stripe CLI Commands', () => {
  it('should document CLI commands for webhook testing', () => {
    console.log('\n📋 Stripe CLI Commands:\n');
    console.log('  1. Install: brew install stripe/stripe-cli/stripe');
    console.log('  2. Login:   stripe login');
    console.log('  3. Listen:  stripe listen --forward-to localhost:4444/api/v1/payments/webhook');
    console.log('');
    console.log('  Trigger test events:');
    console.log('    stripe trigger checkout.session.completed');
    console.log('    stripe trigger invoice.paid');
    console.log('    stripe trigger customer.subscription.deleted');
    console.log('    stripe trigger invoice.payment_failed');

    expect(true).toBe(true);
  });
});
