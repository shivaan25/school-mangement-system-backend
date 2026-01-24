import { Schema, model, Document, Types } from "mongoose";

export type UserRole = "admin" | "teacher" | "student";

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  isActive: Boolean;
  school: Types.ObjectId;
}

const userSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 7,
    },
    role: {
      type: String,
      enum: ["admin", "teacher", "student"],
      default: "student",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    school: {
      types: Schema.Types.ObjectId,
      ref: "School",
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

export const User = model<UserDocument>("User", userSchema);
