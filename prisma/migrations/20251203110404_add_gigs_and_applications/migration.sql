-- CreateTable
CREATE TABLE "Gig" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "recruiterId" TEXT NOT NULL,
    "budgetMin" INTEGER,
    "budgetMax" INTEGER,
    "currency" TEXT DEFAULT 'USD',
    "deadline" DATETIME,
    "skills" TEXT NOT NULL DEFAULT '[]',
    "status" TEXT NOT NULL DEFAULT 'open',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Gig_recruiterId_fkey" FOREIGN KEY ("recruiterId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gigId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "coverLetter" TEXT,
    "proposalUrl" TEXT,
    "aiScore" REAL,
    "status" TEXT NOT NULL DEFAULT 'received',
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Application_gigId_fkey" FOREIGN KEY ("gigId") REFERENCES "Gig" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Application_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "read" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Message_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Interview" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "applicationId" TEXT,
    "gigId" TEXT,
    "recruiterId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "scheduledAt" DATETIME NOT NULL,
    "mode" TEXT NOT NULL DEFAULT 'zoom',
    "location" TEXT,
    "status" TEXT NOT NULL DEFAULT 'scheduled',
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "Gig_recruiterId_idx" ON "Gig"("recruiterId");

-- CreateIndex
CREATE INDEX "Gig_status_idx" ON "Gig"("status");

-- CreateIndex
CREATE INDEX "Application_gigId_idx" ON "Application"("gigId");

-- CreateIndex
CREATE INDEX "Application_studentId_idx" ON "Application"("studentId");

-- CreateIndex
CREATE INDEX "Application_status_idx" ON "Application"("status");

-- CreateIndex
CREATE INDEX "Message_senderId_idx" ON "Message"("senderId");

-- CreateIndex
CREATE INDEX "Message_receiverId_idx" ON "Message"("receiverId");

-- CreateIndex
CREATE INDEX "Interview_recruiterId_idx" ON "Interview"("recruiterId");

-- CreateIndex
CREATE INDEX "Interview_studentId_idx" ON "Interview"("studentId");

-- CreateIndex
CREATE INDEX "Interview_status_idx" ON "Interview"("status");
