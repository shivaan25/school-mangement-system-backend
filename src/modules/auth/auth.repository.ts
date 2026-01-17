import { User } from "../../models/User.model";

export const createUser = (data: any) => {
  return User.create(data);
};

export const findUserByEmail = (email: string) => {
  return User.findOne({ email });
};
