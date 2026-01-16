import { Schema, Types, Document, model } from "mongoose";

export interface TeacherDocument extends Document {
  user: Types.ObjectId;
  school: Types.ObjectId;
  subject: string;
}

const teacherSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    school: {
      type: Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Teacher = model<TeacherDocument>("Teacher", teacherSchema);
