/**
 * Create or reset an admin account.
 *
 * Usage:
 *   npx tsx scripts/create-admin.ts --email admin@example.com --password MySecret123
 *
 * If the email already exists, the password and role are updated.
 * If it doesn't exist, a new admin user is created.
 */

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

function parseArgs(): { email: string; password: string } {
  const args = process.argv.slice(2);
  let email = process.env.ADMIN_EMAIL || "";
  let password = process.env.ADMIN_PASSWORD || "";

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--email" && args[i + 1]) email = args[++i];
    if (args[i] === "--password" && args[i + 1]) password = args[++i];
  }

  if (!email || !password) {
    console.error("Usage: npx tsx scripts/create-admin.ts --email <email> --password <password>");
    process.exit(1);
  }

  return { email, password };
}

async function main() {
  const { email, password } = parseArgs();
  const prisma = new PrismaClient();

  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await prisma.user.upsert({
      where: { email },
      update: {
        hashedPassword,
        role: "admin",
      },
      create: {
        email,
        hashedPassword,
        name: "Admin",
        role: "admin",
        subscriptionTier: "diamond",
      },
    });

    console.log(`Admin account ready:`);
    console.log(`  Email: ${user.email}`);
    console.log(`  Role:  ${user.role}`);
    console.log(`  ID:    ${user.id}`);
    console.log(`  Action: ${user.createdAt.getTime() === user.updatedAt.getTime() ? "created" : "updated"}`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error("Failed:", e.message);
  process.exit(1);
});
