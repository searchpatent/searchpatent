-- CreateEnum
CREATE TYPE "documentType" AS ENUM ('trademarkCertificate', 'trademarkApplication');

-- AlterTable
ALTER TABLE "intellectualProperty" ADD COLUMN     "documentType" "documentType";
