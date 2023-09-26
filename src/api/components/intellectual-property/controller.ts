import { PrismaClient } from "@prisma/client";
import { addDocument } from "../search/controller";

const prisma = new PrismaClient();

export function getIPs() {
  return prisma.intellectualProperty.findMany({
    where: {},
    select: {
      applicationNumber: true,
      url: true,
      registrationNumber: true,
    },
  });
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

export async function insert(data: any) {
  console.log(data.registrationNumber);
  try {
    const result = prisma.intellectualProperty.create({
      data: {
        ...data,
        registrationNumber: parseInt(data.registrationNumber),
        applicationNumber: Number.isNaN(parseInt(data.applicationNumber))
          ? null
          : parseInt(data.applicationNumber),
      },
    });
    addDocument("trademarks", result);
    return result;
  } catch (error) {}
}

export async function mapUnprotectedElsToVerbalDesignation() {
  // get all the ips
  const ips = await prisma.intellectualProperty.findMany();
  // loop over them
  for (const ip of ips) {
    console.log(ip.registrationNumber);
    // if verbal aggrement is "" then update as null
    if (ip.verbalDesignation === "") {
      await prisma.intellectualProperty.update({
        where: {
          id: ip.id,
        },
        data: {
          verbalDesignation: null,
        },
      });
    }
  }
  return true;
}

function getWordBetweenDoubleQuotes(str: string | undefined | null) {
  if (!str) {
    return null;
  }
  const re = /"(.*?)"/;
  const found = str.match(re);
  if (found) {
    return found[1];
  }
  return "";
}
