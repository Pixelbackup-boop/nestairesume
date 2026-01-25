-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "subscriptionTier" TEXT NOT NULL DEFAULT 'free',
    "creditsRemaining" INTEGER NOT NULL DEFAULT 3,
    "stripeCustomerId" TEXT,
    "subscriptionId" TEXT,
    "subscriptionStatus" TEXT,
    "isSuspended" BOOLEAN NOT NULL DEFAULT false,
    "trialEndsAt" DATETIME,
    "hasUsedTrial" BOOLEAN NOT NULL DEFAULT false,
    "cvCreatedCount" INTEGER NOT NULL DEFAULT 0,
    "aiUsedCount" INTEGER NOT NULL DEFAULT 0,
    "aiUsedToday" INTEGER NOT NULL DEFAULT 0,
    "lastAiResetDate" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("createdAt", "creditsRemaining", "email", "hashedPassword", "id", "isSuspended", "name", "role", "stripeCustomerId", "subscriptionId", "subscriptionStatus", "subscriptionTier", "updatedAt") SELECT "createdAt", "creditsRemaining", "email", "hashedPassword", "id", "isSuspended", "name", "role", "stripeCustomerId", "subscriptionId", "subscriptionStatus", "subscriptionTier", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
