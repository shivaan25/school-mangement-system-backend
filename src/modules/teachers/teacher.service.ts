import { Types } from "mongoose";
import { User } from "../../models/User.model";
import { teacherRepo } from "./teacher.repository";

interface createTeacherInput {
  name: string;
  email: string;
  password: string;
  subject: string;
  school: Types.ObjectId;
}

export const createTeacherService = async (data: createTeacherInput) => {
  const { name, email, password, subject, school } = data;

  const alreadyExists = await User.findOne({ email });
  if (alreadyExists) {
    throw new Error("Already Exist please Enter Valid Input");
  }

  const user = await User.create({
    name,
    email,
    password,
    role: "teacher",
    school,
  });

  const teacher = await teacherRepo.create({
    user: user._id,
    school: school,
    subject,
  });
  return teacher;
};

export const getTeacherBySchoolService = async (schoolId: Types.ObjectId) => {
  return teacherRepo.findBySchool(schoolId);
};
