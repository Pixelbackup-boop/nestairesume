/**
 * POST /api/v1/webhooks/stripe — Stripe webhook receiver.
 * Ported from backend POST /webhooks/stripe (backend/src/routes/webhooks.ts:
 * constructWebhookEvent() + handleWebhookEvent()).
 *
 * Server-to-server endpoint: no CORS, no OPTIONS, no bearer auth — authenticity
 * comes from verifying the Stripe signature over the RAW request body. Workers
 * has no synchronous crypto, so verification uses constructEventAsync with the
 * WebCrypto (SubtleCrypto) provider.
 *
 * Handled events (same as backend): checkout.session.completed,
 * customer.subscription.created/updated/deleted, invoice.paid,
 * invoice.payment_failed.
 */
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getDb } from '@/lib/server/db';
import { getStripe, getWebhookSecret, handleWebhookEvent } from '@/lib/server/stripeService';

// Track processed event IDs to prevent duplicate processing on retries.
// Stripe retries webhooks up to 3 times — without this, duplicate payments can occur.
// NOTE: module state is per-Worker-isolate, so this dedupe is best-effort (a retry
// can land on a fresh isolate); Payment inserts are additionally deduplicated in
// stripeService via the unique Payment.stripePaymentId column.
const processedEvents = new Map<string, number>();
const MAX_PROCESSED_EVENTS = 1000;

function isAlreadyProcessed(eventId: string): boolean {
  if (processedEvents.has(eventId)) return true;

  // Evict old entries if map gets too large
  if (processedEvents.size >= MAX_PROCESSED_EVENTS) {
    const oldestKey = processedEvents.keys().next().value;
    if (oldestKey) processedEvents.delete(oldestKey);
  }

  processedEvents.set(eventId, Date.now());
  return false;
}

const webhookCryptoProvider = Stripe.createSubtleCryptoProvider();

export async function POST(request: Request): Promise<Response> {
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ detail: 'Missing stripe-signature header' }, { status: 400 });
  }

  try {
    // The raw body text must be used for signature verification — do not parse first
    const rawBody = await request.text();

    const event = await getStripe().webhooks.constructEventAsync(
      rawBody,
      signature,
      getWebhookSecret(),
      undefined,
      webhookCryptoProvider
    );

    // Skip if already processed (Stripe retry)
    if (isAlreadyProcessed(event.id)) {
      return NextResponse.json({ received: true, duplicate: true });
    }

    await handleWebhookEvent(getDb(), event);

    return NextResponse.json({ received: true });
  } catch (error: unknown) {
    console.error('Webhook error', error);
    const message = error instanceof Error ? error.message : 'Webhook handler failed';
    return NextResponse.json({ detail: message }, { status: 400 });
  }
}
