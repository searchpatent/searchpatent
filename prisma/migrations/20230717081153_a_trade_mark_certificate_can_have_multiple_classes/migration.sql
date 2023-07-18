/*
  Warnings:

  - The `classes` column on the `intellectualProperty` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "intellectualProperty" DROP COLUMN "classes",
ADD COLUMN     "classes" TEXT[];
