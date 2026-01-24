import { Types } from "mongoose";

declare global {
  namespace Express {
    interface User {
      id: Types.ObjectId;
      role: "ADMIN" | "TEACHER" | "STUDENT";
      school: Types.ObjectId;
    }

    interface Request {
      user?: User;
    }
  }
}
