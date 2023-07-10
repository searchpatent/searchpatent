import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function addTradeMark(
  name: string,
  description: string,
  stateRegisterationNumber: number,
  applicationNumber: number,
  applicationDate: string,
  registrationDate: string,
  registrationExpiryDate: string,
  imageUrlOrigin: string,
  copyRightOwner: string
) {
  return await prisma.intellectualProperty.create({
    data: {
      name,
      description,
      stateRegisterationNumber,
      applicationNumber,
      applicationDate,
      registrationDate,
      registrationExpiryDate,
      imageUrlOrigin,
      copyRightOwner,
    },
  });
}
