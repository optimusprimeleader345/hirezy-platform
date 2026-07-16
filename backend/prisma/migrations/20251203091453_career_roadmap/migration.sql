-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "role" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "CareerRoadmap" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "studentId" TEXT NOT NULL,
    "currentStage" TEXT NOT NULL DEFAULT 'Beginner',
    "completedSteps" TEXT NOT NULL DEFAULT '[]',
    "nextSteps" TEXT NOT NULL DEFAULT '[]',
    "notes" TEXT,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CareerRoadmap_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "CareerRoadmap_studentId_key" ON "CareerRoadmap"("studentId");
