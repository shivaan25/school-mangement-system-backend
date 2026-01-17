import { Student } from "../../models/Student.model";
export const createStudent = async (data: {
  user: string;
  school: string;
  class: string;
  rollNumber: number;
}) => {
  return Student.create(data);
};

export const getStudent = async () => {
  return Student.find();
};
