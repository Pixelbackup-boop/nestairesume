PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
    "id"                    TEXT PRIMARY KEY NOT NULL,
    "checksum"              TEXT NOT NULL,
    "finished_at"           DATETIME,
    "migration_name"        TEXT NOT NULL,
    "logs"                  TEXT,
    "rolled_back_at"        DATETIME,
    "started_at"            DATETIME NOT NULL DEFAULT current_timestamp,
    "applied_steps_count"   INTEGER UNSIGNED NOT NULL DEFAULT 0
);
INSERT INTO _prisma_migrations VALUES('0c5ed735-ea23-44a4-96e3-433ce4156997','e0fc00ec990dbbf65c79c9eaa77e15f53b8e1270bac5c868f080729b1f5c8e60',1767212603157,'20251231202323_init',NULL,NULL,1767212603154,1);
INSERT INTO _prisma_migrations VALUES('bdc4c46d-8f1f-4fb4-bfa8-de6f1606cd02','51934b085df816a202da7e4579aed9df9740d1ceba1f6d3b4e26af718cdaa5db',1767615955973,'20260105122555_add_admin_blog_payment',NULL,NULL,1767615955968,1);
INSERT INTO _prisma_migrations VALUES('995e9bfa-02e1-4baf-8bb8-e6258ad8362d','854499312b491d6817c641dcd1ee6c49dfd49c4ae88c92f17e454d9dbe4790c8',1767647229269,'20260105210709_add_auto_blog_models',NULL,NULL,1767647229266,1);
INSERT INTO _prisma_migrations VALUES('320d1fc8-8ebd-41c6-8240-8405cfecc771','396986099ee081a944b282928629f35c287adfa4b74f3e0df628f537c25bc2fd',1769256398553,'20260124120638_add_trial_and_limit_fields',NULL,NULL,1769256398548,1);
CREATE TABLE IF NOT EXISTS "Resume" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "targetRole" TEXT,
    "targetCompany" TEXT,
    "fullName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "location" TEXT,
    "linkedinUrl" TEXT,
    "portfolioUrl" TEXT,
    "summary" TEXT,
    "experiences" TEXT,
    "education" TEXT,
    "skills" TEXT,
    "certifications" TEXT,
    "projects" TEXT,
    "languages" TEXT,
    "templateLayout" TEXT NOT NULL DEFAULT 'CLASSIC',
    "templateTheme" TEXT NOT NULL DEFAULT 'NAVY',
    "customThemeColor" TEXT,
    "atsScore" INTEGER,
    "isMaster" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Resume_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO Resume VALUES('a0963cdc-e54c-4d8d-bd6a-4059442f424f','e15c7d32-1831-40ea-9446-2f0da2f35fd8','My Resume',NULL,NULL,'John Doe','john@example.com','555-1234',NULL,NULL,NULL,'Experienced software engineer','[{"company":"Tech Corp","position":"Senior Dev","startDate":"2020-01","isCurrent":true,"bullets":["Led team of 5"]}]',NULL,'["JavaScript","React","Node.js"]',NULL,NULL,NULL,'CLASSIC','NAVY',NULL,NULL,0,1767212710927,1767212710927);
INSERT INTO Resume VALUES('f4680b01-1521-4123-b705-ccdb6c01cbd2','51177389-34a6-40cc-91ee-cdbdaf8f5501','My First Resume',NULL,NULL,'John Doe','john@example.com','555-1234','New York, NY',NULL,NULL,'Experienced developer',NULL,NULL,NULL,NULL,NULL,NULL,'CLASSIC','NAVY',NULL,NULL,0,1767258759668,1767258759668);
CREATE TABLE IF NOT EXISTS "BlogPost" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "image" TEXT,
    "imageAlt" TEXT,
    "category" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
CREATE TABLE IF NOT EXISTS "Payment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "stripePaymentId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'usd',
    "status" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "plan" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "ContentSource" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'pdf',
    "content" TEXT NOT NULL,
    "pageCount" INTEGER,
    "metadata" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS "ScheduledPost" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "scheduledFor" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "sourceId" TEXT,
    "blogPostId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ScheduledPost_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "ContentSource" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "AutoBlogSettings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "postsPerDay" INTEGER NOT NULL DEFAULT 5,
    "startHour" INTEGER NOT NULL DEFAULT 8,
    "endHour" INTEGER NOT NULL DEFAULT 20,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "authorName" TEXT NOT NULL DEFAULT 'ResumeAI Team',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO AutoBlogSettings VALUES('6d3658e7-31e9-4766-bbd2-6570b96f886a',5,8,20,0,'ResumeAI Team',1767647760040,1767647760040);
CREATE TABLE IF NOT EXISTS "User" (
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
INSERT INTO User VALUES('e15c7d32-1831-40ea-9446-2f0da2f35fd8','test@example.com','$2b$10$vGwWr4YsXcvddQvNMK/gbu.1464UZD5zWLlP29Km26QOOnU9Dx3KS','Test User','user','free',3,NULL,NULL,NULL,0,NULL,0,0,0,0,NULL,1767212683661,1767212683661);
INSERT INTO User VALUES('51177389-34a6-40cc-91ee-cdbdaf8f5501','newuser@example.com','$2b$10$zh9tVh83QffT71O70gh4j.YbYkWZ/hJIgNxDRX1uf4Gue.HdsQu9W','New User','user','free',3,NULL,NULL,NULL,0,NULL,0,0,0,0,NULL,1767254401233,1767254401233);
INSERT INTO User VALUES('ec304faf-ed5d-4ab4-a42f-36c9f3924d57','kayes@gmail.com','$2b$10$YlVJRkNKmZOwl3868AiD2ee.nvA0sjkY1mshhPi2JnHWLyGNh0EQ.','kayes','user','free',3,NULL,NULL,NULL,0,NULL,0,0,0,0,NULL,1767259105829,1767259105829);
INSERT INTO User VALUES('a77806a3-97e3-4ce7-8279-34acbe0abe72','admin@resumeai.com','$2b$10$44/honNtk0/JhcWBB.PB6OcBkU5y7U.184q4MKC2H635tBm68OUWi','Admin User','admin','diamond',999999,NULL,NULL,NULL,0,NULL,0,0,0,0,NULL,1767642455702,1767642455702);
INSERT INTO User VALUES('4cc28742-013c-480d-91ad-b0aa512381bf','dezvault@gmail.com','$2b$10$r/md6oAssvAN1M1wLpedPOV4nNhWs9Lc8IIgGG5tMFkwCEgsMvTuS','Kayes Mahmud','admin','free',3,NULL,NULL,NULL,0,NULL,0,0,0,0,NULL,1769710718893,1769710718893);
CREATE UNIQUE INDEX "BlogPost_slug_key" ON "BlogPost"("slug");
CREATE UNIQUE INDEX "Payment_stripePaymentId_key" ON "Payment"("stripePaymentId");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
COMMIT;
