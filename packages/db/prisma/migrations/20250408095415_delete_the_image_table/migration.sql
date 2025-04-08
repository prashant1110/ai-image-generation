/*
  Warnings:

  - You are about to drop the `TraningImages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TraningImages" DROP CONSTRAINT "TraningImages_modelId_fkey";

-- DropTable
DROP TABLE "TraningImages";
