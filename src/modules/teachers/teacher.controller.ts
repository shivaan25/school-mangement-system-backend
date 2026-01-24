import * as services from "./teacher.service";
import { Response, Request } from "express";

export const createTeacherController = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  const teacher = await services.createTeacherService({
    ...req.body,
    schoolId: req.user.school,
  });
  return res.status(201).json(teacher);
};

export const getTecherBySchoolIdController = async (
  req: Request,
  res: Response,
) => {
  const schoolId = req.user.school;
  const teacher = await services.getTeacherBySchoolService(schoolId);
  return res.status(201).json(teacher);
};
