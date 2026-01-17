import { Request, Response } from "express";
import * as schoolServices from "./school.service";

export const createSchool = async (req: Request, res: Response) => {
  const { name } = req.body;
  const school = await schoolServices.createSchool(name);

  res.status(201).json(school);
};

export const getSchool = async (req: Request, res: Response) => {
  const schools = await schoolServices.getSchool();
  res.status(201).json(schools);
};
