import { Types } from "mongoose";
import { Teacher } from "../../models/Teacher.model";

export const teacherRepo = {
  create: (data: {
    user: Types.ObjectId;
    school: Types.ObjectId;
    subject: string;
  }) => {
    return Teacher.create(data);
  },

  findBySchool: (schoolId: Types.ObjectId) => {
    return Teacher.find({ school: schoolId })
      .populate("user", "name email")
      .exec();
  },

  findByUserId: (userId: Types.ObjectId) => {
    return Teacher.findOne({ user: userId }).exec();
  },
};
