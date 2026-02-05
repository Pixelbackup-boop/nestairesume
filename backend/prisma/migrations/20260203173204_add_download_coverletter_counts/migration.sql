-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "emailVerified" DATETIME,
    "hashedPassword" TEXT,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user',
    "verificationCode" TEXT,
    "verificationCodeExpires" DATETIME,
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
    "downloadCount" INTEGER NOT NULL DEFAULT 0,
    "coverLetterCount" INTEGER NOT NULL DEFAULT 0,
    "lastAiResetDate" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("aiUsedCount", "aiUsedToday", "createdAt", "creditsRemaining", "cvCreatedCount", "email", "emailVerified", "hasUsedTrial", "hashedPassword", "id", "image", "isSuspended", "lastAiResetDate", "name", "role", "stripeCustomerId", "subscriptionId", "subscriptionStatus", "subscriptionTier", "trialEndsAt", "updatedAt", "verificationCode", "verificationCodeExpires") SELECT "aiUsedCount", "aiUsedToday", "createdAt", "creditsRemaining", "cvCreatedCount", "email", "emailVerified", "hasUsedTrial", "hashedPassword", "id", "image", "isSuspended", "lastAiResetDate", "name", "role", "stripeCustomerId", "subscriptionId", "subscriptionStatus", "subscriptionTier", "trialEndsAt", "updatedAt", "verificationCode", "verificationCodeExpires" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
