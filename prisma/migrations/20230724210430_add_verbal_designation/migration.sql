/*
  Warnings:

  - You are about to drop the column `password` on the `searchPatentUser` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "intellectualProperty" ADD COLUMN     "verbalDesignation" TEXT;

-- AlterTable
ALTER TABLE "searchPatentUser" DROP COLUMN "password",
ADD COLUMN     "hashedPassword" TEXT NOT NULL DEFAULT '';
