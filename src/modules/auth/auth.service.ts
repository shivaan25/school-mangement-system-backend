import * as authRepo from "./auth.repository";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { env } from "../../config/env";

export const register = async (data: any) => {
  const existingUser = await authRepo.findUserByEmail(data.email);
  if (existingUser) {
    throw new Error("User ALready Exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  return authRepo.createUser({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    role: data.role || "student",
  });
};

export const login = async (email: string, password: string) => {
  const user = await authRepo.findUserByEmail(email);
  if (!user) {
    throw new Error("Please SignUP to register");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Password is Incorrect");
  }

  const token = jwt.sign(
    {
      userId: user._id,
      role: user.role,
      school: user.school,
    },
    env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );
  return { token };
};
