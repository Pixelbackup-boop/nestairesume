import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const SALT_ROUNDS = 10;

async function main() {
  const adminEmail = "admin@resumeai.com";
  const adminPassword = "Admin123!";
  const adminName = "Admin User";

  // Check if admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log("Admin user already exists:", adminEmail);
    // Update to admin role if not already
    if (existingAdmin.role !== "admin") {
      await prisma.user.update({
        where: { email: adminEmail },
        data: { role: "admin" },
      });
      console.log("Updated user role to admin");
    }
    return;
  }

  // Create admin user
  const hashedPassword = await bcrypt.hash(adminPassword, SALT_ROUNDS);

  const admin = await prisma.user.create({
    data: {
      email: adminEmail,
      hashedPassword,
      name: adminName,
      role: "admin",
      subscriptionTier: "diamond",
      creditsRemaining: 999999,
    },
  });

  console.log("Admin user created successfully!");
  console.log("Email:", admin.email);
  console.log("Password: Admin123!");
  console.log("Role:", admin.role);
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
