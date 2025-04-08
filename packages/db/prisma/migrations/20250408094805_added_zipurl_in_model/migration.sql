/*
  Warnings:

  - Added the required column `zipUrl` to the `Model` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Model_falAiRequestedId_idx";

-- DropIndex
DROP INDEX "OutputImages_falAiRequestedId_idx";

-- AlterTable
ALTER TABLE "Model" ADD COLUMN     "zipUrl" TEXT NOT NULL,
ALTER COLUMN "falAiRequestedId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "OutputImages" ALTER COLUMN "falAiRequestedId" DROP NOT NULL;
