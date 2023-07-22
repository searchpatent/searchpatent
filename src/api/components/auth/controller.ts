import { PrismaClient } from "@prisma/client";
import bycrypt from "bcrypt";

const prisma = new PrismaClient();

export function createUser(username: string, password: string, email: string) {
  return prisma.searchPatentUser.create({
    data: {
      username,
      password: bycrypt.hashSync(password, 10),
      email,
    },
  });
}

export function getUser(username: string) {
  return prisma.searchPatentUser.findUnique({
    where: {
      username,
    },
  });
}

export function matchPassword(password: string, username: string) {
  return prisma.searchPatentUser
    .findUnique({
      where: {
        username,
      },
    })
    .then((user) => {
      if (!user) return false;
      return bycrypt.compareSync(password, user.password);
    });
}

export function isUsernameTaken(username: string) {
  return prisma.searchPatentUser
    .findUnique({
      where: {
        username,
      },
    })
    .then((user) => {
      if (!user) return false;
      return true;
    });
}

export function getUserById(id: string) {
  return prisma.searchPatentUser.findUnique({
    where: {
      id,
    },
  });
}
