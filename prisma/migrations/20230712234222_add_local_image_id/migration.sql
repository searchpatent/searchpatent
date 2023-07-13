-- AlterTable
ALTER TABLE "intellectualProperty" ADD COLUMN     "localImgId" TEXT,
ALTER COLUMN "registrationExpiryDate" DROP NOT NULL;
