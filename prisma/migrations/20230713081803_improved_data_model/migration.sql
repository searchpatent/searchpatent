/*
  Warnings:

  - You are about to drop the column `copyRightOwner` on the `intellectualProperty` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `intellectualProperty` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrlOrigin` on the `intellectualProperty` table. All the data in the column will be lost.
  - You are about to drop the column `localImgId` on the `intellectualProperty` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `intellectualProperty` table. All the data in the column will be lost.
  - You are about to drop the column `stateRegisterationNumber` on the `intellectualProperty` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[registrationNumber]` on the table `intellectualProperty` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[applicationNumber]` on the table `intellectualProperty` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `addressForCorrespondence` to the `intellectualProperty` table without a default value. This is not possible if the table is not empty.
  - Added the required column `applicant` to the `intellectualProperty` table without a default value. This is not possible if the table is not empty.
  - Added the required column `classes` to the `intellectualProperty` table without a default value. This is not possible if the table is not empty.
  - Added the required column `copyRightHolder` to the `intellectualProperty` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageIdLocal` to the `intellectualProperty` table without a default value. This is not possible if the table is not empty.
  - Added the required column `langCode` to the `intellectualProperty` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unprotectedTrademarkElements` to the `intellectualProperty` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "intellectualProperty" DROP COLUMN "copyRightOwner",
DROP COLUMN "description",
DROP COLUMN "imageUrlOrigin",
DROP COLUMN "localImgId",
DROP COLUMN "name",
DROP COLUMN "stateRegisterationNumber",
ADD COLUMN     "addressForCorrespondence" TEXT NOT NULL,
ADD COLUMN     "applicant" TEXT NOT NULL,
ADD COLUMN     "classes" TEXT NOT NULL,
ADD COLUMN     "colorCombination" TEXT[],
ADD COLUMN     "copyRightHolder" TEXT NOT NULL,
ADD COLUMN     "imageIdLocal" TEXT NOT NULL,
ADD COLUMN     "langCode" TEXT NOT NULL,
ADD COLUMN     "publicationDate" TIMESTAMP(3),
ADD COLUMN     "registrationExtendedTill" TIMESTAMP(3),
ADD COLUMN     "registrationNumber" INTEGER,
ADD COLUMN     "unprotectedTrademarkElements" TEXT NOT NULL,
ALTER COLUMN "registrationDate" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "intellectualProperty_registrationNumber_key" ON "intellectualProperty"("registrationNumber");

-- CreateIndex
CREATE UNIQUE INDEX "intellectualProperty_applicationNumber_key" ON "intellectualProperty"("applicationNumber");
