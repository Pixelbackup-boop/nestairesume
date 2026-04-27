-- CreateTable
CREATE TABLE "TemplateFeedback" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'feedback',
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "adminNote" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TemplateFeedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TemplateFeedback_templateId_idx" ON "TemplateFeedback"("templateId");

-- CreateIndex
CREATE INDEX "TemplateFeedback_userId_idx" ON "TemplateFeedback"("userId");

-- CreateIndex
CREATE INDEX "TemplateFeedback_status_idx" ON "TemplateFeedback"("status");

-- CreateIndex
CREATE INDEX "TemplateFeedback_createdAt_idx" ON "TemplateFeedback"("createdAt");

-- AddForeignKey
ALTER TABLE "TemplateFeedback" ADD CONSTRAINT "TemplateFeedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
