/**
 * Grant a subscription tier to an existing user.
 *
 * Usage:
 *   npx tsx scripts/grant-subscription.ts --email user@example.com
 *   npx tsx scripts/grant-subscription.ts --email user@example.com --tier gold
 *
 * Defaults to platinum tier if --tier is not specified.
 * Resets downloadCount to 0 so the user gets the full allowance.
 *
 * To run against the live database:
 *   DATABASE_URL="postgresql://..." npx tsx scripts/grant-subscription.ts --email user@example.com
 */

import { PrismaClient } from "@prisma/client";

const VALID_TIERS = ["starter", "gold", "diamond", "platinum"] as const;
type Tier = (typeof VALID_TIERS)[number];

const TIER_LIMITS: Record<Tier, number> = {
  starter: 3,
  gold: 10,
  diamond: 25,
  platinum: 120,
};

function parseArgs(): { email: string; tier: Tier } {
  const args = process.argv.slice(2);
  let email = "";
  let tier: Tier = "platinum";

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--email" && args[i + 1]) email = args[++i];
    if (args[i] === "--tier" && args[i + 1]) {
      const t = args[++i];
      if (!VALID_TIERS.includes(t as Tier)) {
        console.error(`Invalid tier "${t}". Valid tiers: ${VALID_TIERS.join(", ")}`);
        process.exit(1);
      }
      tier = t as Tier;
    }
  }

  if (!email) {
    console.error("Usage: npx tsx scripts/grant-subscription.ts --email <email> [--tier <tier>]");
    console.error(`Valid tiers: ${VALID_TIERS.join(", ")} (default: platinum)`);
    process.exit(1);
  }

  return { email, tier };
}

async function main() {
  const { email, tier } = parseArgs();
  const prisma = new PrismaClient();

  try {
    // Check user exists
    const existing = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, name: true, subscriptionTier: true, downloadCount: true },
    });

    if (!existing) {
      console.error(`User not found: ${email}`);
      process.exit(1);
    }

    console.log(`\nCurrent state:`);
    console.log(`  Email: ${existing.email}`);
    console.log(`  Name:  ${existing.name || "(none)"}`);
    console.log(`  Tier:  ${existing.subscriptionTier}`);
    console.log(`  Downloads used: ${existing.downloadCount}`);

    // Update subscription
    const updated = await prisma.user.update({
      where: { email },
      data: {
        subscriptionTier: tier,
        subscriptionStatus: "active",
        downloadCount: 0,
      },
      select: {
        id: true,
        email: true,
        name: true,
        subscriptionTier: true,
        subscriptionStatus: true,
        downloadCount: true,
      },
    });

    console.log(`\nUpdated:`);
    console.log(`  Tier:   ${updated.subscriptionTier}`);
    console.log(`  Status: ${updated.subscriptionStatus}`);
    console.log(`  Downloads: 0 / ${TIER_LIMITS[tier]} available`);
    console.log(`  ID:     ${updated.id}`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error("Failed:", e.message);
  process.exit(1);
});
