import { Student } from "../../models/Student.model";
export const createStudent = async (data: any) => {
  return Student.create(data);
};

export const getStudent = async () => {
  return Student.find();
};
