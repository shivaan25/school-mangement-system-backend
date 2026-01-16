import { Schema, model, Document, Types } from "mongoose";

export interface StudentDocument extends Document {
  user: Types.ObjectId;
  school: Types.ObjectId;
  class: string;
  rollNumber: number;
}

const studentSchema = new Schema<StudentDocument>(
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
    class: {
      type: String,
      required: true,
    },
    rollNumber: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Student = model<StudentDocument>("Student", studentSchema);
