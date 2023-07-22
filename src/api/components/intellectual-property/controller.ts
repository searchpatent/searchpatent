import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export function getIPs() {
  return prisma.intellectualProperty.findMany();
}

export function getIPById(id: string) {
  return prisma.intellectualProperty.findUnique({
    where: {
      id,
    },
  });
}

export function getIPByHolder(copyRightHolder: string) {
  return prisma.intellectualProperty.findMany({
    where: {
      copyRightHolder,
    },
  });
}

export function updateIP(id: string, data: any) {
  return prisma.intellectualProperty.update({
    where: {
      id,
    },

    data: {
      ...data,
    },
  });
}

export function deleteIPById(id: string) {
  return prisma.intellectualProperty.delete({
    where: {
      id,
    },
  });
}
