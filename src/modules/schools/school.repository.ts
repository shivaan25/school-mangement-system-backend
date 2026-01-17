import { School } from "../../models/School.model";
export const createSchool = async (data: { name: string }) => {
  return School.create(data);
};

export const getSchool = async () => {
  return School.find();
};
