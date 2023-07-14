-- AlterTable
ALTER TABLE "intellectualProperty" ALTER COLUMN "applicationNumber" DROP NOT NULL,
ALTER COLUMN "applicationDate" DROP NOT NULL,
ALTER COLUMN "addressForCorrespondence" DROP NOT NULL,
ALTER COLUMN "applicant" DROP NOT NULL,
ALTER COLUMN "classes" DROP NOT NULL,
ALTER COLUMN "copyRightHolder" DROP NOT NULL,
ALTER COLUMN "imageIdLocal" DROP NOT NULL,
ALTER COLUMN "langCode" DROP NOT NULL,
ALTER COLUMN "unprotectedTrademarkElements" DROP NOT NULL;
