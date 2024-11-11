import { prisma } from "../libs/prisma";
import bcrypt from "bcrypt";
import { genereateToken } from "../libs/jwt";
import { registerDto, loginDto } from "../dto/authDto";

export const register = async (data: registerDto) => {
  const { email, password, fullname } = data;
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      fullname,
    },
  });
  return user;
};

export const login = async (data: loginDto) => {
  const { email, password } = data;
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    throw new Error("User not found");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }
  const token = genereateToken(user.id, user.role,user.email);
  return { token };
} 

export const getUserById = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}

