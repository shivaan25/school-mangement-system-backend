import dotenv from "dotenv";

dotenv.config();

const EnvRequired = ["MONGO_URI", "PORT", "JWT_SECRET"] as const;

EnvRequired.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing Environment Variable ${key}`);
  }
});

export const env = {
  PORT: process.env.PORT as string,
  MONGO_URI: process.env.MONGO_URI as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
};
