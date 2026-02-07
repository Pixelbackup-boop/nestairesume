const Stripe = require("stripe");
const { PrismaClient } = require("@prisma/client");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const prisma = new PrismaClient();

const priceToplan = {
  [process.env.STRIPE_PRICE_STARTER]: "starter",
  [process.env.STRIPE_PRICE_GOLD]: "gold",
  [process.env.STRIPE_PRICE_DIAMOND]: "diamond",
  [process.env.STRIPE_PRICE_PLATINUM]: "platinum",
};

async function syncPayments() {
  const charges = await stripe.charges.list({ limit: 50 });
  const users = await prisma.user.findMany();
  const subs = await stripe.subscriptions.list({ limit: 50 });

  console.log("Local users:", users.map(u => `${u.email} (stripe: ${u.stripeCustomerId})`));
  console.log(`Found ${charges.data.length} charges on Stripe\n`);

  let synced = 0;

  for (const charge of charges.data) {
    if (charge.status !== "succeeded") continue;

    const customerId = typeof charge.customer === "string" ? charge.customer : charge.customer?.id;
    const user = users.find(u => u.stripeCustomerId === customerId);

    if (!user) {
      console.log(`No local user for Stripe customer: ${customerId} (charge: ${charge.id})`);
      continue;
    }

    const stripePaymentId = charge.payment_intent || charge.id;
    const existing = await prisma.payment.findUnique({ where: { stripePaymentId } });
    if (existing) {
      console.log(`Already synced: ${charge.id}`);
      continue;
    }

    const sub = subs.data.find(s => s.customer === customerId);
    const planPriceId = sub?.items?.data?.[0]?.price?.id;
    const plan = planPriceId ? priceToplan[planPriceId] : null;

    const payment = await prisma.payment.create({
      data: {
        userId: user.id,
        stripePaymentId,
        amount: charge.amount,
        currency: charge.currency,
        status: "succeeded",
        type: "subscription",
        plan,
        createdAt: new Date(charge.created * 1000),
      },
    });
    console.log(`Synced: $${(charge.amount / 100).toFixed(2)} (${plan}) -> ${user.email}`);
    synced++;
  }

  const total = await prisma.payment.count();
  console.log(`\nDone. Synced ${synced} new payments. Total in DB: ${total}`);
  await prisma.$disconnect();
}

syncPayments().catch(console.error);
