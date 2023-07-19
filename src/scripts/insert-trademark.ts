import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function addTradeMark(data: any) {
  return await prisma.intellectualProperty.create({
    data: {
      ...data,
    },
  });
}
