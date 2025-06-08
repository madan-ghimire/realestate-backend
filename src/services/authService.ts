import { db } from "../../prisma/db";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";
import { RegisterDto } from "../dtos/registerDto";
import { UserDto } from "../dtos/userDto";
import { RoleType } from "@prisma/client";

export const register = async (userData: RegisterDto) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = await db.user.create({
    data: {
      email: userData.email,
      password: hashedPassword,
      username: userData.username,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role: userData.role as RoleType,
      displayName:
        userData.firstName && userData.lastName
          ? `${userData.firstName} ${userData.lastName}`
          : null,
      tenantId: userData.tenantId,
    },
  });
  return generateToken(user.id, user.role, user.username);
};

export const login = async (userData: UserDto) => {
  const user = await db.user.findUnique({ where: { email: userData.email } });

  if (user && (await bcrypt.compare(userData.password, user.password))) {
    return generateToken(user.id, user.role, user.username);
  }
  throw new Error("Invalid Credentials");
};
