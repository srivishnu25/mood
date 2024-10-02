/*
  Warnings:

  - A unique constraint covering the columns `[userId,id]` on the table `JournalEntry` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `subject` to the `Analysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Analysis` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "JournalEntry_userId_idx";

-- AlterTable
ALTER TABLE "Analysis" ADD COLUMN     "sentimentScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "subject" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Analysis_userId_idx" ON "Analysis"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "JournalEntry_userId_id_key" ON "JournalEntry"("userId", "id");
